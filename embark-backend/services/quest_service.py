from uuid import UUID
from typing import Optional
from datetime import datetime, timedelta, timezone
from supabase import Client
from models.quest import (
    QuestCreate,
    QuestUpdate,
    QuestResponse,
    UserQuestCreate,
    UserQuestResponse,
    ActiveQuestResponse,
)


class QuestService:
    """Service for quest-related operations"""

    def __init__(self, supabase: Client):
        self.supabase = supabase

    async def create_quest(self, quest_data: QuestCreate) -> QuestResponse:
        """Create a new quest"""
        try:
            insert_data = quest_data.model_dump()
            if insert_data.get("reward_item_id"):
                insert_data["reward_item_id"] = str(insert_data["reward_item_id"])

            response = self.supabase.table("quests").insert(insert_data).execute()

            if not response.data:
                raise ValueError("Failed to create quest")

            return QuestResponse(**response.data[0])
        except Exception as e:
            raise ValueError(f"Error creating quest: {str(e)}")

    async def get_quest(self, quest_id: UUID) -> Optional[QuestResponse]:
        """Get a quest by ID"""
        try:
            response = (
                self.supabase.table("quests")
                .select("*")
                .eq("id", str(quest_id))
                .execute()
            )

            if not response.data:
                return None

            return QuestResponse(**response.data[0])
        except Exception as e:
            raise ValueError(f"Error fetching quest: {str(e)}")

    async def list_quests(
        self, tier: Optional[int] = None, limit: int = 100, offset: int = 0
    ) -> list[QuestResponse]:
        """List quests with optional tier filter"""
        try:
            query = self.supabase.table("quests").select("*")

            if tier:
                query = query.eq("tier", tier)

            response = (
                query.order("tier", desc=False)
                .order("created_at", desc=True)
                .range(offset, offset + limit - 1)
                .execute()
            )

            return [QuestResponse(**quest) for quest in response.data]
        except Exception as e:
            raise ValueError(f"Error listing quests: {str(e)}")

    async def update_quest(self, quest_id: UUID, quest_data: QuestUpdate) -> QuestResponse:
        """Update a quest"""
        try:
            update_data = quest_data.model_dump(exclude_unset=True)

            if not update_data:
                raise ValueError("No data to update")

            if "reward_item_id" in update_data and update_data["reward_item_id"]:
                update_data["reward_item_id"] = str(update_data["reward_item_id"])

            response = (
                self.supabase.table("quests")
                .update(update_data)
                .eq("id", str(quest_id))
                .execute()
            )

            if not response.data:
                raise ValueError("Quest not found")

            return QuestResponse(**response.data[0])
        except Exception as e:
            raise ValueError(f"Error updating quest: {str(e)}")

    async def delete_quest(self, quest_id: UUID) -> bool:
        """Delete a quest"""
        try:
            response = (
                self.supabase.table("quests").delete().eq("id", str(quest_id)).execute()
            )

            return len(response.data) > 0
        except Exception as e:
            raise ValueError(f"Error deleting quest: {str(e)}")

    async def start_quest(self, user_id: UUID, quest_data: UserQuestCreate) -> UserQuestResponse:
        """Start a quest for a user"""
        try:
            # Check if user already has an active quest
            active_quest = await self.get_active_quest(user_id)
            if active_quest:
                raise ValueError("User already has an active quest")

            # Get quest to determine time limit
            quest = await self.get_quest(quest_data.quest_id)
            if not quest:
                raise ValueError("Quest not found")

            # Calculate deadline
            started_at = datetime.now(timezone.utc)
            deadline_at = started_at + timedelta(hours=quest.time_limit_hours)

            # Create user quest entry
            insert_data = {
                "user_id": str(user_id),
                "quest_id": str(quest_data.quest_id),
                "started_at": started_at.isoformat(),
                "deadline_at": deadline_at.isoformat(),
                "is_active": True,
            }

            response = (
                self.supabase.table("user_completed_quests").insert(insert_data).execute()
            )

            if not response.data:
                raise ValueError("Failed to start quest")

            return UserQuestResponse(**response.data[0])
        except Exception as e:
            raise ValueError(f"Error starting quest: {str(e)}")

    async def get_active_quest(self, user_id: UUID) -> Optional[ActiveQuestResponse]:
        """Get user's active quest with full quest details"""
        try:
            response = (
                self.supabase.table("user_completed_quests")
                .select("*")
                .eq("user_id", str(user_id))
                .eq("is_active", True)
                .execute()
            )

            if not response.data:
                return None

            user_quest = response.data[0]
            # Fetch quest details separately
            quest = await self.get_quest(UUID(user_quest["quest_id"]))
            
            if not quest:
                raise ValueError("Quest not found")

            return ActiveQuestResponse(**user_quest, quest=quest)
        except Exception as e:
            raise ValueError(f"Error fetching active quest: {str(e)}")

    async def complete_quest(self, user_id: UUID) -> UserQuestResponse:
        """Complete user's active quest"""
        try:
            # Get active quest
            active_quest = await self.get_active_quest(user_id)
            if not active_quest:
                raise ValueError("No active quest found")

            # Check if deadline has passed
            if datetime.now(timezone.utc) > active_quest.deadline_at:
                raise ValueError("Quest deadline has passed")

            # Mark quest as completed
            completed_at = datetime.now(timezone.utc)
            response = (
                self.supabase.table("user_completed_quests")
                .update(
                    {"is_active": False, "completed_at": completed_at.isoformat()}
                )
                .eq("id", str(active_quest.id))
                .execute()
            )

            if not response.data:
                raise ValueError("Failed to complete quest")

            return UserQuestResponse(**response.data[0])
        except Exception as e:
            raise ValueError(f"Error completing quest: {str(e)}")

    async def abandon_quest(self, user_id: UUID) -> bool:
        """Abandon user's active quest"""
        try:
            # Get active quest
            active_quest = await self.get_active_quest(user_id)
            if not active_quest:
                raise ValueError("No active quest found")

            # Delete the quest entry
            response = (
                self.supabase.table("user_completed_quests")
                .delete()
                .eq("id", str(active_quest.id))
                .execute()
            )

            return len(response.data) > 0
        except Exception as e:
            raise ValueError(f"Error abandoning quest: {str(e)}")

    async def get_user_quest_history(
        self, user_id: UUID, limit: int = 50
    ) -> list[UserQuestResponse]:
        """Get user's completed quest history"""
        try:
            response = (
                self.supabase.table("user_completed_quests")
                .select("*")
                .eq("user_id", str(user_id))
                .eq("is_active", False)
                .order("completed_at", desc=True)
                .limit(limit)
                .execute()
            )

            return [UserQuestResponse(**quest) for quest in response.data]
        except Exception as e:
            raise ValueError(f"Error fetching quest history: {str(e)}")

