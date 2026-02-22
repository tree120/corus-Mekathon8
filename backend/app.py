from fastapi import FastAPI, Depends
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

app = FastAPI()


app.mount("/qr_codes", StaticFiles(directory="qr_codes"), name="qr_codes")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



Base.metadata.create_all(bind=engine)


# Request model (rename this!)
class UserCreate(BaseModel):
    email: str
    password: str



class ProductCreate(BaseModel):
    product_name: str
    company_name: str
    batch_number: str
    manufacture_date: str
    expiry_date: str
    origin: str
    ingredients: str

    analysis: Dict
    #qr_code: str


class IngredientRequest(BaseModel):
    ingredients: str


class QRRequest(BaseModel):
    product_name: str
    company_name: str
    batch_number: str
    manufacture_date: str
    expiry_date: str
    origin: str
    ingredients: str
    analysis: dict
# DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    new_user = User(email=user.email, password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Signup successful"}


@app.post("/login")
def login(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(
        User.email == user.email,
        User.password == user.password
    ).first()

    if existing_user:
        return {"message": "Login successful"}

    return {"message": "Invalid credentials"}



@app.post("/analyze")
def analyze(data: IngredientRequest):
    result = analyze_ingredients(data.ingredients)
    return result



@app.post("/generate-qr")
def generate_qr_code(data: QRRequest):

    # You can store temporary info in QR
    qr_path = generate_qr(data.product_name)

    return {
        "message": "QR generated",
        "qr": qr_path
    }

import json


@app.post("/products")
def create_product(product: ProductCreate, db: Session = Depends(get_db)):

    analysis = product.analysis

    # Step 1: Save product first
    new_product = Product(
        product_name=product.product_name,
        company_name=product.company_name,
        batch_number=product.batch_number,
        manufacture_date=product.manufacture_date,
        expiry_date=product.expiry_date,
        origin=product.origin,
        ingredients=product.ingredients,

        status=analysis.get("status"),
        safe=json.dumps(analysis.get("safe", [])),
        hazardous=json.dumps(analysis.get("hazardous", [])),
        allergens=json.dumps(analysis.get("allergens", [])),
        explanation=analysis.get("explanation")
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    # Step 2: Generate QR AFTER saving (now we have ID)
    qr_path = generate_qr(new_product.id)

    # Step 3: Save QR path into DB
    new_product.qr_code = qr_path
    db.commit()

    # Step 4: Return response
    return {
        "message": "Product saved successfully",
        "product_id": new_product.id,
        "qr_code": qr_path
    }


@app.get("/product/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):

    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        return {"error": "Product not found"}

    return {
        "product_name": product.product_name,
        "company_name": product.company_name,
        "origin": product.origin,
        "ingredients": product.ingredients,
        "is_safe": product.is_safe,
        "analysis": product.analysis
    }
