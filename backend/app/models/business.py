"""
Business Models

Database models for business information and metrics.
"""

from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

Base = declarative_base()


class Business(Base):
    """Business profile database model"""
    __tablename__ = "businesses"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Basic business information
    name = Column(String(255), nullable=False)
    industry = Column(String(100), nullable=False)
    business_type = Column(String(50), nullable=False)  # startup, small_business, enterprise
    description = Column(Text, nullable=True)
    website = Column(String(255), nullable=True)
    
    # Business metrics
    annual_revenue = Column(Float, nullable=True)
    employee_count = Column(Integer, nullable=True)
    years_operating = Column(Integer, nullable=True)
    location = Column(String(255), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    # user = relationship("User", back_populates="businesses")
    # growth_plans = relationship("GrowthPlan", back_populates="business")
    # analyses = relationship("Analysis", back_populates="business")


class BusinessMetrics(Base):
    """Business metrics tracking model"""
    __tablename__ = "business_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, ForeignKey("businesses.id"), nullable=False)
    
    # Financial metrics
    monthly_revenue = Column(Float, nullable=True)
    monthly_expenses = Column(Float, nullable=True)
    profit_margin = Column(Float, nullable=True)
    
    # Operational metrics
    customer_count = Column(Integer, nullable=True)
    customer_acquisition_cost = Column(Float, nullable=True)
    customer_lifetime_value = Column(Float, nullable=True)
    churn_rate = Column(Float, nullable=True)
    
    # Growth metrics
    revenue_growth_rate = Column(Float, nullable=True)
    customer_growth_rate = Column(Float, nullable=True)
    
    # Custom metrics (JSON field for flexibility)
    custom_metrics = Column(JSON, nullable=True)
    
    # Timestamps
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())
    period_start = Column(DateTime(timezone=True), nullable=False)
    period_end = Column(DateTime(timezone=True), nullable=False)
    
    # Relationships
    # business = relationship("Business", back_populates="metrics")


# Pydantic models for API serialization
class BusinessBase(BaseModel):
    name: str
    industry: str
    business_type: str
    description: Optional[str] = None
    website: Optional[str] = None
    annual_revenue: Optional[float] = None
    employee_count: Optional[int] = None
    years_operating: Optional[int] = None
    location: Optional[str] = None


class BusinessCreate(BusinessBase):
    pass


class BusinessUpdate(BaseModel):
    name: Optional[str] = None
    industry: Optional[str] = None
    business_type: Optional[str] = None
    description: Optional[str] = None
    website: Optional[str] = None
    annual_revenue: Optional[float] = None
    employee_count: Optional[int] = None
    years_operating: Optional[int] = None
    location: Optional[str] = None


class BusinessResponse(BusinessBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class BusinessMetricsBase(BaseModel):
    monthly_revenue: Optional[float] = None
    monthly_expenses: Optional[float] = None
    profit_margin: Optional[float] = None
    customer_count: Optional[int] = None
    customer_acquisition_cost: Optional[float] = None
    customer_lifetime_value: Optional[float] = None
    churn_rate: Optional[float] = None
    revenue_growth_rate: Optional[float] = None
    customer_growth_rate: Optional[float] = None
    custom_metrics: Optional[Dict[str, Any]] = None
    period_start: datetime
    period_end: datetime


class BusinessMetricsCreate(BusinessMetricsBase):
    business_id: int


class BusinessMetricsResponse(BusinessMetricsBase):
    id: int
    business_id: int
    recorded_at: datetime
    
    class Config:
        from_attributes = True