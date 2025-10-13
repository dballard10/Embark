from fastapi import APIRouter, HTTPException, Query
from uuid import UUID
from typing import Optional

from database.supabase_client import get_supabase_client
from models.item import ItemCreate, ItemUpdate, ItemResponse, UserItemResponse
from services.item_service import ItemService

router = APIRouter()


def get_item_service() -> ItemService:
    """Dependency to get item service instance"""
    return ItemService(get_supabase_client())


@router.post("/items", response_model=ItemResponse, status_code=201)
async def create_item(item_data: ItemCreate):
    """
    Create a new item
    
    - **name**: Item name
    - **description**: Item description
    - **rarity_tier**: Rarity tier (1-6)
    - **rarity_stars**: Rarity stars (1-6)
    - **image_url**: Optional image URL
    """
    try:
        service = get_item_service()
        return await service.create_item(item_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/items/{item_id}", response_model=ItemResponse)
async def get_item(item_id: UUID):
    """
    Get an item by ID
    
    - **item_id**: UUID of the item
    """
    try:
        service = get_item_service()
        item = await service.get_item(item_id)
        
        if not item:
            raise HTTPException(status_code=404, detail="Item not found")
        
        return item
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/items", response_model=list[ItemResponse])
async def list_items(
    rarity_tier: Optional[int] = Query(default=None, ge=1, le=6),
    limit: int = Query(default=100, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
):
    """
    List items with optional rarity filter
    
    - **rarity_tier**: Filter by rarity tier (1-6)
    - **limit**: Maximum number of items to return (1-100)
    - **offset**: Number of items to skip
    """
    try:
        service = get_item_service()
        return await service.list_items(
            rarity_tier=rarity_tier, limit=limit, offset=offset
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.patch("/items/{item_id}", response_model=ItemResponse)
async def update_item(item_id: UUID, item_data: ItemUpdate):
    """
    Update an item
    
    - **item_id**: UUID of the item
    - **item_data**: Fields to update (all optional)
    """
    try:
        service = get_item_service()
        return await service.update_item(item_id, item_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/items/{item_id}", status_code=204)
async def delete_item(item_id: UUID):
    """
    Delete an item
    
    - **item_id**: UUID of the item
    """
    try:
        service = get_item_service()
        success = await service.delete_item(item_id)
        
        if not success:
            raise HTTPException(status_code=404, detail="Item not found")
        
        return None
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/users/{user_id}/items/{item_id}", response_model=UserItemResponse, status_code=201)
async def award_item_to_user(user_id: UUID, item_id: UUID):
    """
    Award an item to a user
    
    - **user_id**: UUID of the user
    - **item_id**: UUID of the item to award
    """
    try:
        service = get_item_service()
        return await service.award_item_to_user(user_id, item_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/users/{user_id}/items/{item_id}/purchase")
async def purchase_item(user_id: UUID, item_id: UUID):
    """
    Purchase an item for a user with glory
    
    - **user_id**: UUID of the user
    - **item_id**: UUID of the item to purchase
    
    Returns the purchased item, new glory balance, and item price
    """
    try:
        service = get_item_service()
        return await service.purchase_item(user_id, item_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/users/{user_id}/items", response_model=list[UserItemResponse])
async def get_user_items(user_id: UUID):
    """
    Get all items owned by a user
    
    - **user_id**: UUID of the user
    """
    try:
        service = get_item_service()
        return await service.get_user_items(user_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.patch("/users/{user_id}/items/{user_item_id}/feature", response_model=UserItemResponse)
async def set_featured_item(user_id: UUID, user_item_id: UUID):
    """
    Set an item as featured for a user
    
    - **user_id**: UUID of the user
    - **user_item_id**: UUID of the user_item to feature
    """
    try:
        service = get_item_service()
        return await service.set_featured_item(user_id, user_item_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

