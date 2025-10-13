from fastapi import APIRouter, HTTPException, Query
from uuid import UUID
from typing import Optional

from database.supabase_client import get_supabase_client
from models.quest import (
    QuestCreate,
    QuestUpdate,
    QuestResponse,
    UserQuestCreate,
    UserQuestResponse,
    ActiveQuestResponse,
    CompletedQuestResponse,
)
from services.quest_service import QuestService
from services.user_service import UserService
from services.item_service import ItemService

router = APIRouter()


def get_quest_service() -> QuestService:
    """Dependency to get quest service instance"""
    return QuestService(get_supabase_client())


def get_user_service() -> UserService:
    """Dependency to get user service instance"""
    return UserService(get_supabase_client())


def get_item_service() -> ItemService:
    """Dependency to get item service instance"""
    return ItemService(get_supabase_client())


@router.post("/quests", response_model=QuestResponse, status_code=201)
async def create_quest(quest_data: QuestCreate):
    """
    Create a new quest
    
    - **title**: Quest title
    - **description**: Quest description
    - **tier**: Quest tier (1-6)
    - **glory_reward**: Glory points reward
    - **xp_reward**: XP reward
    - **time_limit_hours**: Time limit in hours
    - **reward_item_id**: Optional item reward ID
    """
    try:
        service = get_quest_service()
        return await service.create_quest(quest_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/quests/{quest_id}", response_model=QuestResponse)
async def get_quest(quest_id: UUID):
    """
    Get a quest by ID
    
    - **quest_id**: UUID of the quest
    """
    try:
        service = get_quest_service()
        quest = await service.get_quest(quest_id)
        
        if not quest:
            raise HTTPException(status_code=404, detail="Quest not found")
        
        return quest
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/quests", response_model=list[QuestResponse])
async def list_quests(
    tier: Optional[int] = Query(default=None, ge=1, le=6),
    limit: int = Query(default=100, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
):
    """
    List quests with optional tier filter
    
    - **tier**: Filter by tier (1-6)
    - **limit**: Maximum number of quests to return (1-100)
    - **offset**: Number of quests to skip
    """
    try:
        service = get_quest_service()
        return await service.list_quests(tier=tier, limit=limit, offset=offset)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.patch("/quests/{quest_id}", response_model=QuestResponse)
async def update_quest(quest_id: UUID, quest_data: QuestUpdate):
    """
    Update a quest
    
    - **quest_id**: UUID of the quest
    - **quest_data**: Fields to update (all optional)
    """
    try:
        service = get_quest_service()
        return await service.update_quest(quest_id, quest_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/quests/{quest_id}", status_code=204)
async def delete_quest(quest_id: UUID):
    """
    Delete a quest
    
    - **quest_id**: UUID of the quest
    """
    try:
        service = get_quest_service()
        success = await service.delete_quest(quest_id)
        
        if not success:
            raise HTTPException(status_code=404, detail="Quest not found")
        
        return None
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/users/{user_id}/quests/start", response_model=UserQuestResponse, status_code=201)
async def start_quest(user_id: UUID, quest_data: UserQuestCreate):
    """
    Start a quest for a user
    
    - **user_id**: UUID of the user
    - **quest_id**: UUID of the quest to start
    """
    try:
        service = get_quest_service()
        return await service.start_quest(user_id, quest_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/users/{user_id}/quests/active", response_model=list[ActiveQuestResponse])
async def get_active_quests(user_id: UUID):
    """
    Get user's active quests (up to 4)
    
    - **user_id**: UUID of the user
    """
    try:
        service = get_quest_service()
        return await service.get_active_quests(user_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/users/{user_id}/quests/{user_quest_id}/complete", response_model=UserQuestResponse)
async def complete_quest(user_id: UUID, user_quest_id: UUID):
    """
    Complete a specific user quest and award rewards
    
    - **user_id**: UUID of the user
    - **user_quest_id**: UUID of the user_completed_quest entry to complete
    """
    try:
        quest_service = get_quest_service()
        user_service = get_user_service()
        item_service = get_item_service()
        
        # Complete the quest and get full details
        completed_quest = await quest_service.complete_quest(user_id, user_quest_id)
        
        # Award glory and XP
        from models.user import UserStatsUpdate
        stats_update = UserStatsUpdate(
            glory_delta=completed_quest.quest.glory_reward,
            xp_delta=completed_quest.quest.xp_reward,
        )
        await user_service.update_user_stats(user_id, stats_update)
        
        # Award item if quest has item reward
        if completed_quest.quest.reward_item_id:
            await item_service.award_item_to_user(
                user_id, completed_quest.quest.reward_item_id
            )
        
        # Return just the user quest response (without nested quest details for consistency)
        return UserQuestResponse(
            id=completed_quest.id,
            user_id=completed_quest.user_id,
            quest_id=completed_quest.quest_id,
            started_at=completed_quest.started_at,
            completed_at=completed_quest.completed_at,
            deadline_at=completed_quest.deadline_at,
            is_active=completed_quest.is_active,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/users/{user_id}/quests/active", status_code=204)
async def abandon_quest(user_id: UUID):
    """
    Abandon user's active quest
    
    - **user_id**: UUID of the user
    """
    try:
        service = get_quest_service()
        success = await service.abandon_quest(user_id)
        
        if not success:
            raise HTTPException(status_code=404, detail="No active quest found")
        
        return None
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/users/{user_id}/quests/history", response_model=list[CompletedQuestResponse])
async def get_quest_history(
    user_id: UUID,
    limit: int = Query(default=50, ge=1, le=100),
):
    """
    Get user's completed quest history with full quest details
    
    - **user_id**: UUID of the user
    - **limit**: Maximum number of quests to return (1-100)
    """
    try:
        service = get_quest_service()
        return await service.get_user_quest_history(user_id, limit=limit)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

