from config.database import Base
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_name = Column(String, nullable=False)
    user_mail = Column(String, nullable=False)
    password = Column(String, nullable=False)
    rol = Column(String, nullable=False)