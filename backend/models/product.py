from config.database import Base
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    product_name = Column(String, nullable=False)
    product_price = Column(Integer, nullable=False)
    category = Column(String, nullable=False)