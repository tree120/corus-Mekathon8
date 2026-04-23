# from sqlalchemy import Column, Integer, String
# from database import Base

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     email = Column(String, unique=True, index=True)
#     password = Column(String)

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    # Auth
    email = Column(String, unique=True, index=True)
    password = Column(String)

    # Company Details
    company_name = Column(String)
    location = Column(String)
    description = Column(String)
    popular_products = Column(String)
    usp = Column(String)

    # File paths (VERY IMPORTANT → store path, not file)
    company_image = Column(String)
    fssai = Column(String)
    npop = Column(String)
    iso = Column(String)

    products = relationship("Product", back_populates="owner")

# from sqlalchemy import Column, Integer, String
# from database import Base

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     email = Column(String, unique=True, index=True)
#     password = Column(String)
#     role = Column(String)   # ✅ ADD THIS