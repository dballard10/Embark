"""Router for achievement-related endpoints"""

from fastapi import APIRouter, HTTPException, status
from typing import List
from uuid import UUID

from models.achievement import (
    AchievementResponse,
    UserAchievementResponse,
    UpdateActiveTitleRequest,
)
from services.achievement_service import AchievementService

router = APIRouter(prefix="/achievements", tags=["achievements"])
achievement_service = AchievementService()


@router.get("", response_model=List[AchievementResponse])
async def get_all_achievements():
    """Get all available achievements"""
    try:
        achievements = await achievement_service.get_all_achievements()
        return achievements
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch achievements: {str(e)}",
        )


@router.get("/users/{user_id}", response_model=List[UserAchievementResponse])
async def get_user_achievements(user_id: UUID):
    """Get all achievements unlocked by a specific user"""
    try:
        user_achievements = await achievement_service.get_user_achievements(user_id)
        return user_achievements
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch user achievements: {str(e)}",
        )


@router.patch("/users/{user_id}/active-title", response_model=dict)
async def set_active_title(user_id: UUID, request: UpdateActiveTitleRequest):
    """Set user's active title"""
    try:
        success = await achievement_service.set_active_title(
            user_id, request.achievement_id
        )
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot set achievement as active title - achievement not unlocked",
            )
        
        return {
            "message": "Active title updated successfully",
            "active_title_id": str(request.achievement_id) if request.achievement_id else None,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update active title: {str(e)}",
        )


@router.get("/users/{user_id}/active-title", response_model=AchievementResponse | None)
async def get_active_title(user_id: UUID):
    """Get user's currently active title"""
    try:
        active_title = await achievement_service.get_active_title(user_id)
        return active_title
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch active title: {str(e)}",
        )

