from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    product_name = Column(String)
    batch_number = Column(String)
    manufacture_date = Column(String)
    expiry_date = Column(String)
    origin = Column(String)
    ingredients = Column(Text)

    # 🔗 Relationship (IMPORTANT)
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="products")

    # AI Analysis Fields
    status = Column(String)
    safe = Column(Text)
    hazardous = Column(Text)
    allergens = Column(Text)
    explanation = Column(Text)
    qr_code = Column(String)