from pydantic import BaseModel, Field
from datetime import datetime
from uuid import UUID
from typing import Optional


class UserBase(BaseModel):
    """Base user model with common attributes"""
    username: str = Field(..., min_length=3, max_length=50)


class UserCreate(UserBase):
    """Model for creating a new user"""
    pass


class UserUpdate(BaseModel):
    """Model for updating user attributes"""
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    total_glory: Optional[int] = Field(None, ge=0)
    total_xp: Optional[int] = Field(None, ge=0)
    level: Optional[int] = Field(None, ge=1)


class UserResponse(UserBase):
    """Model for user response"""
    id: UUID
    total_glory: int
    total_xp: int
    level: int
    created_at: datetime

    class Config:
        from_attributes = True


class UserStatsUpdate(BaseModel):
    """Model for updating user stats after quest completion"""
    glory_delta: int = 0
    xp_delta: int = 0

