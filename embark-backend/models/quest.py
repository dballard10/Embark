from pydantic import BaseModel, Field
from datetime import datetime
from uuid import UUID
from typing import Optional


class QuestBase(BaseModel):
    """Base quest model with common attributes"""
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1, max_length=1000)
    tier: int = Field(..., ge=1, le=6)
    glory_reward: int = Field(default=0, ge=0)
    xp_reward: int = Field(default=0, ge=0)
    time_limit_hours: int = Field(default=24, ge=1)
    reward_item_id: Optional[UUID] = None


class QuestCreate(QuestBase):
    """Model for creating a new quest"""
    pass


class QuestUpdate(BaseModel):
    """Model for updating quest attributes"""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=1, max_length=1000)
    tier: Optional[int] = Field(None, ge=1, le=6)
    glory_reward: Optional[int] = Field(None, ge=0)
    xp_reward: Optional[int] = Field(None, ge=0)
    time_limit_hours: Optional[int] = Field(None, ge=1)
    reward_item_id: Optional[UUID] = None


class QuestResponse(QuestBase):
    """Model for quest response"""
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


class UserQuestBase(BaseModel):
    """Base model for user-quest relationship"""
    user_id: UUID
    quest_id: UUID


class UserQuestCreate(BaseModel):
    """Model for starting a quest"""
    quest_id: UUID


class UserQuestResponse(BaseModel):
    """Model for user quest response"""
    id: UUID
    user_id: UUID
    quest_id: UUID
    started_at: datetime
    deadline_at: datetime
    completed_at: Optional[datetime] = None
    is_active: bool

    class Config:
        from_attributes = True


class ActiveQuestResponse(BaseModel):
    """Model for active quest with full quest details"""
    id: UUID
    user_id: UUID
    quest_id: UUID
    started_at: datetime
    deadline_at: datetime
    is_active: bool
    quest: QuestResponse

    class Config:
        from_attributes = True


class CompletedQuestResponse(BaseModel):
    """Model for completed quest with full quest details"""
    id: UUID
    user_id: UUID
    quest_id: UUID
    started_at: datetime
    deadline_at: datetime
    completed_at: Optional[datetime] = None
    is_active: bool
    quest: QuestResponse

    class Config:
        from_attributes = True

