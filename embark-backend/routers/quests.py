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
    QuestChatRequest,
    QuestChatResponse,
)
from services.quest_service import QuestService
from services.user_service import UserService
from services.item_service import ItemService
from services.quest_helper_service import QuestHelperService

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
    limit: int = Query(default=500, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
):
    """
    List quests with optional tier filter
    
    - **tier**: Filter by tier (1-6)
    - **limit**: Maximum number of quests to return (1-500, default 500)
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


@router.post("/users/{user_id}/quests/{user_quest_id}/complete")
async def complete_quest(user_id: UUID, user_quest_id: UUID):
    """
    Complete a specific user quest and award rewards
    
    - **user_id**: UUID of the user
    - **user_quest_id**: UUID of the user_completed_quest entry to complete
    
    Returns: { user_quest, awarded_item (or null if already owned) }
    """
    try:
        import random
        
        quest_service = get_quest_service()
        user_service = get_user_service()
        item_service = get_item_service()
        
        # Verify user exists before completing quest
        user = await user_service.get_user(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Complete the quest and get full details
        completed_quest = await quest_service.complete_quest(user_id, user_quest_id)
        
        # Award glory and XP
        from models.user import UserStatsUpdate
        stats_update = UserStatsUpdate(
            glory_delta=completed_quest.quest.glory_reward,
            xp_delta=completed_quest.quest.xp_reward,
        )
        try:
            await user_service.update_user_stats(user_id, stats_update)
        except Exception as stats_error:
            print(f"Error updating user stats: {stats_error}")
            # If stats update fails, log but continue (quest is still completed)
            # This prevents the "User not found" error from breaking the flow
        
        # Award a random item from the quest's tier
        awarded_item = None
        try:
            # Get all items from the quest's tier
            tier_items = await item_service.list_items(
                rarity_tier=completed_quest.quest.tier,
                limit=100
            )
            
            if tier_items:
                # Get user's current items to filter out owned ones
                user_items = await item_service.get_user_items(user_id)
                owned_item_ids = {str(ui.item_id) for ui in user_items}
                
                # Filter to items user doesn't own
                available_items = [
                    item for item in tier_items 
                    if str(item.id) not in owned_item_ids
                ]
                
                # Select a random item (from available or all tier items if all owned)
                items_to_choose_from = available_items if available_items else tier_items
                random_item = random.choice(items_to_choose_from)
                
                # Try to award the item (returns None if already owned)
                awarded_item = await item_service.award_item_to_user(
                    user_id, random_item.id
                )
                
        except Exception as item_error:
            # Log the error but don't fail the quest completion
            print(f"Warning: Failed to award item: {item_error}")
        
        # Return quest completion info with awarded item and achievements
        return {
            "user_quest": UserQuestResponse(
                id=completed_quest.id,
                user_id=completed_quest.user_id,
                quest_id=completed_quest.quest_id,
                started_at=completed_quest.started_at,
                completed_at=completed_quest.completed_at,
                deadline_at=completed_quest.deadline_at,
                is_active=completed_quest.is_active,
            ),
            "awarded_item": awarded_item,
            "awarded_achievements": completed_quest.awarded_achievements
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Catch any other unexpected errors
        print(f"Error completing quest: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.post("/users/{user_id}/quests/{user_quest_id}/chat", response_model=QuestChatResponse)
async def quest_chat(user_id: UUID, user_quest_id: UUID, chat_request: QuestChatRequest):
    """
    Chat with AI assistant about completing a quest
    
    - **user_id**: UUID of the user
    - **user_quest_id**: UUID of the user_completed_quest entry
    - **chat_request**: Contains message and chat history
    
    Returns: AI assistant's response
    """
    try:
        quest_service = get_quest_service()
        
        # Get the active quest details
        active_quests = await quest_service.get_active_quests(user_id)
        user_quest = next(
            (q for q in active_quests if str(q.id) == str(user_quest_id)),
            None
        )
        
        if not user_quest:
            raise HTTPException(
                status_code=404,
                detail="Active quest not found"
            )
        
        # Initialize quest helper service
        helper_service = QuestHelperService()
        
        # Get chat response
        response = await helper_service.get_chat_response(
            quest=user_quest.quest,
            user_message=chat_request.message,
            chat_history=chat_request.chat_history
        )
        
        return QuestChatResponse(response=response)
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in quest chat: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to get chat response. Please try again."
        )


@router.delete("/users/{user_id}/quests/{user_quest_id}/abandon", status_code=204)
async def abandon_quest(user_id: UUID, user_quest_id: UUID):
    """
    Abandon a specific user quest
    
    - **user_id**: UUID of the user
    - **user_quest_id**: UUID of the user_completed_quest entry to abandon
    """
    try:
        service = get_quest_service()
        success = await service.abandon_quest(user_id, user_quest_id)
        
        if not success:
            raise HTTPException(status_code=404, detail="Active quest not found")
        
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

