"""
FastAPI dependency injection setup
"""
from typing import Annotated
from fastapi import Depends
from supabase import Client

from database.supabase_client import get_supabase_client
from services.quest_service import QuestService
from services.user_service import UserService
from services.item_service import ItemService


def get_db() -> Client:
    """Get Supabase client instance"""
    return get_supabase_client()


def get_quest_service(db: Annotated[Client, Depends(get_db)]) -> QuestService:
    """Get QuestService instance with injected dependencies"""
    return QuestService(db)


def get_user_service(db: Annotated[Client, Depends(get_db)]) -> UserService:
    """Get UserService instance with injected dependencies"""
    return UserService(db)


def get_item_service(db: Annotated[Client, Depends(get_db)]) -> ItemService:
    """Get ItemService instance with injected dependencies"""
    return ItemService(db)


# Type aliases for cleaner dependency injection
QuestServiceDep = Annotated[QuestService, Depends(get_quest_service)]
UserServiceDep = Annotated[UserService, Depends(get_user_service)]
ItemServiceDep = Annotated[ItemService, Depends(get_item_service)]

