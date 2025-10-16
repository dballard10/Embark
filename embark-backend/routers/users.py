from fastapi import APIRouter, HTTPException, Query
from uuid import UUID

from models.user import UserCreate, UserUpdate, UserResponse, UserStatsUpdate
from dependencies import UserServiceDep
from middleware.error_handler import NotFoundException, BadRequestException

router = APIRouter()


@router.post("/users", response_model=UserResponse, status_code=201)
async def create_user(user_data: UserCreate, service: UserServiceDep):
    """
    Create a new user
    
    - **username**: Unique username (3-50 characters)
    """
    try:
        return await service.create_user(user_data)
    except ValueError as e:
        raise BadRequestException(str(e))


@router.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: UUID, service: UserServiceDep):
    """
    Get a user by ID
    
    - **user_id**: UUID of the user
    """
    try:
        user = await service.get_user(user_id)
        
        if not user:
            raise NotFoundException("User not found")
        
        return user
    except ValueError as e:
        raise BadRequestException(str(e))


@router.get("/users/username/{username}", response_model=UserResponse)
async def get_user_by_username(username: str, service: UserServiceDep):
    """
    Get a user by username
    
    - **username**: Username to search for
    """
    try:
        user = await service.get_user_by_username(username)
        
        if not user:
            raise NotFoundException("User not found")
        
        return user
    except ValueError as e:
        raise BadRequestException(str(e))


@router.get("/users", response_model=list[UserResponse])
async def list_users(
    service: UserServiceDep,
    limit: int = Query(default=100, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
):
    """
    List all users with pagination
    
    - **limit**: Maximum number of users to return (1-100)
    - **offset**: Number of users to skip
    """
    try:
        return await service.list_users(limit=limit, offset=offset)
    except ValueError as e:
        raise BadRequestException(str(e))


@router.patch("/users/{user_id}", response_model=UserResponse)
async def update_user(user_id: UUID, user_data: UserUpdate, service: UserServiceDep):
    """
    Update a user's information
    
    - **user_id**: UUID of the user
    - **user_data**: Fields to update (all optional)
    """
    try:
        return await service.update_user(user_id, user_data)
    except ValueError as e:
        raise BadRequestException(str(e))


@router.post("/users/{user_id}/stats", response_model=UserResponse)
async def update_user_stats(user_id: UUID, stats_update: UserStatsUpdate, service: UserServiceDep):
    """
    Update user's glory and XP (typically after completing a quest)
    
    - **user_id**: UUID of the user
    - **glory_delta**: Amount of glory to add (can be negative)
    - **xp_delta**: Amount of XP to add (can be negative)
    """
    try:
        return await service.update_user_stats(user_id, stats_update)
    except ValueError as e:
        raise BadRequestException(str(e))


@router.delete("/users/{user_id}", status_code=204)
async def delete_user(user_id: UUID, service: UserServiceDep):
    """
    Delete a user
    
    - **user_id**: UUID of the user
    """
    try:
        success = await service.delete_user(user_id)
        
        if not success:
            raise NotFoundException("User not found")
        
        return None
    except ValueError as e:
        raise BadRequestException(str(e))

