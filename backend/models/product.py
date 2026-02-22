from sqlalchemy import Column, Integer, String, Text
from database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    product_name = Column(String)
    company_name = Column(String)
    batch_number = Column(String)
    manufacture_date = Column(String)
    expiry_date = Column(String)
    origin = Column(String)
    ingredients = Column(Text)

    # AI Analysis Fields
    status = Column(String)           # safe / hazardous
    safe = Column(Text)               # store as JSON string
    hazardous = Column(Text)          # store as JSON string
    allergens = Column(Text)          # store as JSON string
    explanation = Column(Text)

    qr_code = Column(String)          # path to QR image

# from sqlalchemy import Column, Integer, String
# from database import Base

# class Product(Base):
#     __tablename__ = "products"

#     id = Column(Integer, primary_key=True, index=True)
#     product_name = Column(String)
#     company_name = Column(String)
#     batch_number = Column(String)
#     manufacture_date = Column(String)
#     expiry_date = Column(String)
#     origin = Column(String)
#     ingredients = Column(String)

#     is_safe = Column(String)      # ADD THIS
#     analysis = Column(String)     # ADD THIS
