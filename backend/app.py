from fastapi import FastAPI, Depends, UploadFile, File, Form
from pydantic import BaseModel
from sqlalchemy.orm import Session

from typing import Dict

from database import SessionLocal, engine, Base
from models.user import User  # database model
from models.product import Product
from database import Base, engine
from ai.ingredient_analyzer import analyze_ingredients
from utils.qr_generator import generate_qr
from fastapi.staticfiles import StaticFiles
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File, Form, Depends
from sqlalchemy.orm import Session
import shutil
import os
import uuid
import hashlib
from fastapi.staticfiles import StaticFiles


app = FastAPI()

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.mount("/qr_codes", StaticFiles(directory="qr_codes"), name="qr_codes")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



Base.metadata.create_all(bind=engine)

# class UserCreate(BaseModel):
#     email: str
#     password: str
#     role: str   # ✅ ADD THIS
# Request model (rename this!)
#14-04-26
class UserCreate(BaseModel):
    companyName: str
    location: str
    description: str
    popular_products: str
    usp: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class ProductCreate(BaseModel):
    product_name: str
    batch_number: str
    manufacture_date: str
    expiry_date: str
    origin: str
    ingredients: str
    user_id: int




class IngredientRequest(BaseModel):
    ingredients: str

from typing import Optional

class ProductUpdate(BaseModel):
    product_name: Optional[str]
    batch_number: Optional[str]
    manufacture_date: Optional[str]
    expiry_date: Optional[str]
    origin: Optional[str]
    ingredients: Optional[str]


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()




import hashlib

# @app.post("/login")
# def login(user: UserLogin, db: Session = Depends(get_db)):

#     hashed_password = hashlib.sha256(user.password.encode()).hexdigest()

#     existing_user = db.query(User).filter(
#         User.email == user.email,
#         User.password == hashed_password
#     ).first()

#     if existing_user:
#         return {
#             "message": "Login successful",
#             "user_id": existing_user.id
#         }

#     return {"message": "Invalid credentials"}

from fastapi import HTTPException

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    hashed_password = hashlib.sha256(user.password.encode()).hexdigest()

    existing_user = db.query(User).filter(
        User.email == user.email,
        User.password == hashed_password
    ).first()

    if not existing_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "user_id": existing_user.id
    }

@app.get("/profile/{user_id}")
def get_profile(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return {"message": "User not found"}

    return {
        "companyName": user.company_name,
        "description": user.description,
        "popular_products": user.popular_products,
        "usp": user.usp,
        "companyImage": user.company_image,
        "fssai": user.fssai,
        "iso": user.iso,
        "npop": user.npop
    }

@app.post("/analyze")
def analyze(data: IngredientRequest):
    result = analyze_ingredients(data.ingredients)
    return result


@app.post("/register-company")
async def register_company(
    email: str = Form(...),
    password: str = Form(...),
    companyName: str = Form(...),
    location: str = Form(...),
    description: str = Form(...),
    popular_products: str = Form(...),
    usp: str = Form(...),

    companyImage: UploadFile = File(None),
    fssai: UploadFile = File(None),
    npop: UploadFile = File(None),
    iso: UploadFile = File(None),

    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
     return {"message": "Email already exists"}
    # ✅ Create uploads folder if not exists
    os.makedirs("uploads", exist_ok=True)

    # ✅ File saving with unique name
    def save_file(file):
        if file:
            unique_name = f"{uuid.uuid4()}_{file.filename}"
            path = f"uploads/{unique_name}"
            with open(path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            return path
        return None

    # ✅ Hash password
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
   

    # ✅ Save to DB
    user = User(
        email=email,
        password=hashed_password,
        company_name=companyName,
        location=location,
        description=description,
        popular_products=popular_products,
        usp=usp,
        company_image=save_file(companyImage),
        fssai=save_file(fssai),
        npop=save_file(npop),
        iso=save_file(iso)
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "Saved successfully"}



@app.get("/user/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return {"message": "User not found"}

    return {
        "id": user.id,
        "company_name": user.company_name,
        "location": user.location,
        "description": user.description,
        "popular_products": user.popular_products,
        "usp": user.usp,
        "company_image": user.company_image
    }

@app.put("/user/{user_id}")
async def update_user(
    user_id: int,
    companyName: str = Form(...),
    location: str = Form(...),
    description: str = Form(...),
    popular_products: str = Form(...),   # 👈 from frontend
    usp: str = Form(...),

    companyImage: UploadFile = File(None),

    db: Session = Depends(get_db)
):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return {"message": "User not found"}

    # 🔥 File save function
    def save_file(file):
        if file:
            filename = f"{uuid.uuid4()}_{file.filename}"
            path = f"uploads/{filename}"

            with open(path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)

            return path
        return None

    # 🔥 Update fields
    user.company_name = companyName
    user.location = location
    user.description = description
    user.popular_products = popular_products   # 👈 map correctly
    user.usp = usp

    # 🔥 Update image only if new uploaded
    image_path = save_file(companyImage)
    if image_path:
        user.company_image = image_path

    db.commit()
    db.refresh(user)

    return {"message": "Profile updated successfully"}
# @app.post("/generate-qr")
# def generate_qr_code(data: QRRequest):

#     # You can store temporary info in QR
#     qr_path = generate_qr(data.product_name)

#     return {
#         "message": "QR generated",
#         "qr": qr_path
#     }

import json


     

@app.post("/products")
def create_product(product: ProductCreate, db: Session = Depends(get_db)):

    # 1. AI Analysis
    analysis_result = analyze_ingredients(product.ingredients)

    # 2. Save product FIRST (without QR)
    new_product = Product(
        product_name=product.product_name,
        batch_number=product.batch_number,
        manufacture_date=product.manufacture_date,
        expiry_date=product.expiry_date,
        origin=product.origin,
        ingredients=product.ingredients,

        user_id=product.user_id,

        # AI fields
        status=analysis_result.get("status"),
        safe=json.dumps(analysis_result.get("safe", [])),
        hazardous=json.dumps(analysis_result.get("hazardous", [])),
        allergens=json.dumps(analysis_result.get("allergens", [])),
        explanation=analysis_result.get("explanation")
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    # 3. Generate QR using ID
    qr_path = generate_qr(new_product.id)

    # 4. Save QR path
    new_product.qr_code = qr_path
    db.commit()

    # 5. Return response
    return {
        "message": "Product saved successfully",
        "product_id": new_product.id,
        "qr_code": qr_path,
        "status": new_product.status
    }

@app.get("/product/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):

    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        return {"error": "Product not found"}

    return {
        "product_name": product.product_name,
        "origin": product.origin,
        "ingredients": product.ingredients,
        "is_safe": product.is_safe,
        "analysis": product.analysis
    }
@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products

@app.get("/products/{user_id}")
def get_products(user_id: int, db: Session = Depends(get_db)):
    return db.query(Product).filter(Product.user_id == user_id).all()

@app.put("/product/{product_id}")
def update_product(product_id: int, product: ProductUpdate, db: Session = Depends(get_db)):

    db_product = db.query(Product).filter(Product.id == product_id).first()

    if not db_product:
        return {"message": "Product not found"}

    update_data = product.dict(exclude_unset=True)

    # 🔥 Check if ingredients changed
    if "ingredients" in update_data and update_data["ingredients"] != db_product.ingredients:
        
        # Run AI again
        analysis_result = analyze_ingredients(update_data["ingredients"])

        db_product.status = analysis_result.get("status")
        db_product.safe = json.dumps(analysis_result.get("safe", []))
        db_product.hazardous = json.dumps(analysis_result.get("hazardous", []))
        db_product.allergens = json.dumps(analysis_result.get("allergens", []))
        db_product.explanation = analysis_result.get("explanation")

    # 🔥 Update other fields
    for key, value in update_data.items():
        setattr(db_product, key, value)

    db.commit()

    return {
    "message": "Product updated successfully",
    "status": db_product.status,
    "safe": json.loads(db_product.safe),
    "hazardous": json.loads(db_product.hazardous),
    "allergens": json.loads(db_product.allergens),
    "explanation": db_product.explanation
    }


@app.delete("/delete-product/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        return {"message": "Product not found"}

    db.delete(product)
    db.commit()

    return {"message": "Deleted successfully"}
