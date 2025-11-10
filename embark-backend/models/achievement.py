from pydantic import BaseModel, Field
from datetime import datetime
from uuid import UUID
from typing import Optional


class AchievementBase(BaseModel):
    """Base achievement model with common attributes"""
    title: str = Field(..., min_length=1, max_length=100)
    description: str = Field(..., min_length=1, max_length=500)
    achievement_type: str = Field(..., pattern="^(default|tier|questline|quest|collection)$")
    tier: Optional[int] = Field(None, ge=1, le=6)
    topic: Optional[str] = Field(None, min_length=1, max_length=100)
    color_tier: int = Field(..., ge=1, le=6)
    is_rare: bool = False
    quest_id: Optional[UUID] = None


class AchievementResponse(AchievementBase):
    """Model for achievement response"""
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


class UserAchievementResponse(BaseModel):
    """Model for user achievement response with full achievement details"""
    id: UUID
    user_id: UUID
    achievement_id: UUID
    unlocked_at: datetime
    achievement: AchievementResponse

    class Config:
        from_attributes = True


class UpdateActiveTitleRequest(BaseModel):
    """Model for updating user's active title"""
    achievement_id: Optional[UUID] = None

