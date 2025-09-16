"""
User Models

Database models for user management and authentication.
"""

from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

Base = declarative_base()


class User(Base):
    """User database model"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login = Column(DateTime(timezone=True), nullable=True)
    
    # Profile information
    company_name = Column(String(255), nullable=True)
    industry = Column(String(100), nullable=True)
    position = Column(String(100), nullable=True)
    phone = Column(String(20), nullable=True)
    bio = Column(Text, nullable=True)


# Pydantic models for API serialization
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    company_name: Optional[str] = None
    industry: Optional[str] = None
    position: Optional[str] = None
    phone: Optional[str] = None
    bio: Optional[str] = None


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    company_name: Optional[str] = None
    industry: Optional[str] = None
    position: Optional[str] = None
    phone: Optional[str] = None
    bio: Optional[str] = None


class UserResponse(UserBase):
    id: int
    is_active: bool
    is_verified: bool
    created_at: datetime
    last_login: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class TokenData(BaseModel):
    email: Optional[str] = None