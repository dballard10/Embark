from pydantic import BaseModel, Field
from datetime import datetime
from uuid import UUID
from typing import Optional


class ItemBase(BaseModel):
    """Base item model with common attributes"""
    name: str = Field(..., min_length=1, max_length=100)
    description: str = Field(..., min_length=1, max_length=500)
    rarity_tier: int = Field(..., ge=1, le=6)
    rarity_stars: int = Field(..., ge=1, le=6)
    image_url: Optional[str] = None


class ItemCreate(ItemBase):
    """Model for creating a new item"""
    pass


class ItemUpdate(BaseModel):
    """Model for updating item attributes"""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, min_length=1, max_length=500)
    rarity_tier: Optional[int] = Field(None, ge=1, le=6)
    rarity_stars: Optional[int] = Field(None, ge=1, le=6)
    image_url: Optional[str] = None


class ItemResponse(ItemBase):
    """Model for item response"""
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


class UserItemResponse(BaseModel):
    """Model for user's acquired item"""
    id: UUID
    user_id: UUID
    item_id: UUID
    acquired_at: datetime
    is_featured: bool
    item: ItemResponse

    class Config:
        from_attributes = True

