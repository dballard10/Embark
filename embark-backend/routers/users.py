from fastapi import APIRouter, HTTPException, Query
from uuid import UUID
from typing import Optional

from database.supabase_client import get_supabase_client
from models.user import UserCreate, UserUpdate, UserResponse, UserStatsUpdate
from services.user_service import UserService

router = APIRouter()


def get_user_service() -> UserService:
    """Dependency to get user service instance"""
    return UserService(get_supabase_client())


@router.post("/users", response_model=UserResponse, status_code=201)
async def create_user(user_data: UserCreate):
    """
    Create a new user
    
    - **username**: Unique username (3-50 characters)
    """
    try:
        service = get_user_service()
        return await service.create_user(user_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: UUID):
    """
    Get a user by ID
    
    - **user_id**: UUID of the user
    """
    try:
        service = get_user_service()
        user = await service.get_user(user_id)
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/users/username/{username}", response_model=UserResponse)
async def get_user_by_username(username: str):
    """
    Get a user by username
    
    - **username**: Username to search for
    """
    try:
        service = get_user_service()
        user = await service.get_user_by_username(username)
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/users", response_model=list[UserResponse])
async def list_users(
    limit: int = Query(default=100, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
):
    """
    List all users with pagination
    
    - **limit**: Maximum number of users to return (1-100)
    - **offset**: Number of users to skip
    """
    try:
        service = get_user_service()
        return await service.list_users(limit=limit, offset=offset)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.patch("/users/{user_id}", response_model=UserResponse)
async def update_user(user_id: UUID, user_data: UserUpdate):
    """
    Update a user's information
    
    - **user_id**: UUID of the user
    - **user_data**: Fields to update (all optional)
    """
    try:
        service = get_user_service()
        return await service.update_user(user_id, user_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/users/{user_id}/stats", response_model=UserResponse)
async def update_user_stats(user_id: UUID, stats_update: UserStatsUpdate):
    """
    Update user's glory and XP (typically after completing a quest)
    
    - **user_id**: UUID of the user
    - **glory_delta**: Amount of glory to add (can be negative)
    - **xp_delta**: Amount of XP to add (can be negative)
    """
    try:
        service = get_user_service()
        return await service.update_user_stats(user_id, stats_update)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/users/{user_id}", status_code=204)
async def delete_user(user_id: UUID):
    """
    Delete a user
    
    - **user_id**: UUID of the user
    """
    try:
        service = get_user_service()
        success = await service.delete_user(user_id)
        
        if not success:
            raise HTTPException(status_code=404, detail="User not found")
        
        return None
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

