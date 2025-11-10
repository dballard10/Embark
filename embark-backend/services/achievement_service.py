"""Service layer for achievements business logic"""

from typing import List, Optional
from uuid import UUID
import logging
from database.supabase_client import get_supabase_client
from models.achievement import (
    AchievementResponse,
    UserAchievementResponse,
)


class AchievementService:
    """Service for managing achievements"""

    def __init__(self):
        self.table = "achievements"
        self.user_achievements_table = "user_achievements"
        self.logger = logging.getLogger(__name__)

    async def get_all_achievements(self) -> List[AchievementResponse]:
        """Get all available achievements"""
        try:
            supabase = get_supabase_client()
            response = (
                supabase.table(self.table)
                .select("*")
                .order("achievement_type", desc=False)
                .order("tier", desc=False)
                .execute()
            )

            return [AchievementResponse(**achievement) for achievement in response.data]
        except Exception as e:
            self.logger.error(f"Error fetching all achievements: {str(e)}")
            raise

    async def get_user_achievements(
        self, user_id: UUID
    ) -> List[UserAchievementResponse]:
        """Get all achievements unlocked by a specific user"""
        try:
            supabase = get_supabase_client()
            response = (
                supabase.table(self.user_achievements_table)
                .select("*, achievement:achievements(*)")
                .eq("user_id", str(user_id))
                .order("unlocked_at", desc=True)
                .execute()
            )

            # Parse the nested structure
            user_achievements = []
            for item in response.data:
                achievement_data = item.pop("achievement")
                user_achievement = {
                    **item,
                    "achievement": AchievementResponse(**achievement_data),
                }
                user_achievements.append(UserAchievementResponse(**user_achievement))

            return user_achievements
        except Exception as e:
            self.logger.error(
                f"Error fetching achievements for user {user_id}: {str(e)}"
            )
            raise

    async def check_and_award_tier_achievement(
        self, user_id: UUID, quest_tier: int
    ) -> Optional[AchievementResponse]:
        """Check and award tier achievement for completing a quest
        
        Returns the achievement if newly awarded, None otherwise
        """
        try:
            supabase = get_supabase_client()
            
            # Call the database function to check and award tier achievement
            supabase.rpc("check_tier_achievement", {
                "p_user_id": str(user_id),
                "p_quest_tier": quest_tier
            }).execute()
            
            # Check if user just got this achievement (fetch their tier achievements)
            tier_achievement_response = (
                supabase.table(self.table)
                .select("*")
                .eq("achievement_type", "tier")
                .eq("tier", quest_tier)
                .single()
                .execute()
            )
            
            if not tier_achievement_response.data:
                return None
                
            achievement = AchievementResponse(**tier_achievement_response.data)
            
            # Check if user has this achievement
            user_achievement_response = (
                supabase.table(self.user_achievements_table)
                .select("*")
                .eq("user_id", str(user_id))
                .eq("achievement_id", str(achievement.id))
                .execute()
            )
            
            # Return achievement only if it exists (was just awarded or already had it)
            if user_achievement_response.data:
                return achievement
                
            return None
        except Exception as e:
            self.logger.error(
                f"Error checking tier achievement for user {user_id}, tier {quest_tier}: {str(e)}"
            )
            raise

    async def check_and_award_quest_achievement(
        self, user_id: UUID, quest_id: UUID
    ) -> Optional[AchievementResponse]:
        """Check and award quest-specific achievement for completing a quest
        
        Returns the achievement if newly awarded, None otherwise
        """
        try:
            supabase = get_supabase_client()
            
            # Call the database function to check and award quest achievement
            supabase.rpc("check_quest_achievement", {
                "p_user_id": str(user_id),
                "p_quest_id": str(quest_id)
            }).execute()
            
            # Fetch the quest achievement
            achievement_response = (
                supabase.table(self.table)
                .select("*")
                .eq("achievement_type", "quest")
                .eq("quest_id", str(quest_id))
                .single()
                .execute()
            )
            
            if achievement_response.data:
                return AchievementResponse(**achievement_response.data)
                
            return None
        except Exception as e:
            self.logger.error(
                f"Error checking quest achievement for user {user_id}, quest {quest_id}: {str(e)}"
            )
            raise

    async def check_and_award_questline_achievement(
        self, user_id: UUID, topic: str
    ) -> Optional[AchievementResponse]:
        """Check and award questline achievement if user completed all quests in topic
        
        Returns the achievement if newly awarded, None otherwise
        """
        try:
            supabase = get_supabase_client()
            
            # Call the database function to check and award questline achievement
            result = supabase.rpc("check_questline_achievement", {
                "p_user_id": str(user_id),
                "p_topic": topic
            }).execute()
            
            # The function returns TRUE if achievement was awarded
            if not result.data:
                return None
                
            # Fetch the questline achievement for this topic
            achievement_response = (
                supabase.table(self.table)
                .select("*")
                .eq("achievement_type", "questline")
                .eq("topic", topic)
                .single()
                .execute()
            )
            
            if achievement_response.data:
                return AchievementResponse(**achievement_response.data)
                
            return None
        except Exception as e:
            self.logger.error(
                f"Error checking questline achievement for user {user_id}, topic {topic}: {str(e)}"
            )
            raise

    async def check_and_award_collection_achievement(
        self, user_id: UUID
    ) -> Optional[AchievementResponse]:
        """Check and award collection achievement based on user's item count
        
        Returns the achievement if newly awarded, None otherwise
        """
        try:
            supabase = get_supabase_client()
            
            # Count user's total items
            user_items_response = (
                supabase.table("user_items")
                .select("id", count="exact")
                .eq("user_id", str(user_id))
                .execute()
            )
            
            item_count = user_items_response.count or 0
            
            # Get all collection achievements, ordered by tier
            collection_achievements_response = (
                supabase.table(self.table)
                .select("*")
                .eq("achievement_type", "collection")
                .order("tier")
                .execute()
            )
            
            if not collection_achievements_response.data:
                return None
            
            # Find the highest tier achievement that matches the item count
            matching_achievement = None
            for ach in collection_achievements_response.data:
                ach_tier = ach.get("tier")
                if ach_tier is not None and ach_tier <= item_count:
                    matching_achievement = ach
            
            if not matching_achievement:
                return None
            
            achievement = AchievementResponse(**matching_achievement)
            
            # Check if user already has this achievement
            user_achievement_response = (
                supabase.table(self.user_achievements_table)
                .select("*")
                .eq("user_id", str(user_id))
                .eq("achievement_id", str(achievement.id))
                .execute()
            )
            
            if user_achievement_response.data:
                # User already has this achievement
                return None
            
            # Award the achievement
            from datetime import datetime, timezone
            supabase.table(self.user_achievements_table).insert({
                "user_id": str(user_id),
                "achievement_id": str(achievement.id),
                "unlocked_at": datetime.now(timezone.utc).isoformat()
            }).execute()
            
            self.logger.info(
                f"Awarded collection achievement {achievement.id} to user {user_id} for {item_count} items"
            )
            
            return achievement
        except Exception as e:
            self.logger.error(
                f"Error checking collection achievement for user {user_id}: {str(e)}"
            )
            raise

    async def set_active_title(
        self, user_id: UUID, achievement_id: Optional[UUID]
    ) -> bool:
        """Set user's active title
        
        Returns True if successful, False otherwise
        """
        try:
            supabase = get_supabase_client()
            
            # If achievement_id is provided, verify user has unlocked it
            if achievement_id is not None:
                user_achievement_response = (
                    supabase.table(self.user_achievements_table)
                    .select("*")
                    .eq("user_id", str(user_id))
                    .eq("achievement_id", str(achievement_id))
                    .execute()
                )
                
                if not user_achievement_response.data:
                    self.logger.warning(
                        f"User {user_id} tried to set unearned achievement {achievement_id} as active title"
                    )
                    return False
            
            # Update user's active title
            supabase.table("users").update(
                {"active_title_id": str(achievement_id) if achievement_id else None}
            ).eq("id", str(user_id)).execute()
            
            self.logger.info(f"Updated active title for user {user_id} to {achievement_id}")
            return True
        except Exception as e:
            self.logger.error(
                f"Error setting active title for user {user_id}: {str(e)}"
            )
            raise

    async def get_active_title(self, user_id: UUID) -> Optional[AchievementResponse]:
        """Get user's currently active title achievement"""
        try:
            supabase = get_supabase_client()
            
            # Get user's active_title_id
            user_response = (
                supabase.table("users")
                .select("active_title_id")
                .eq("id", str(user_id))
                .single()
                .execute()
            )
            
            if not user_response.data or not user_response.data.get("active_title_id"):
                return None
            
            # Fetch the achievement
            achievement_response = (
                supabase.table(self.table)
                .select("*")
                .eq("id", user_response.data["active_title_id"])
                .single()
                .execute()
            )
            
            if achievement_response.data:
                return AchievementResponse(**achievement_response.data)
                
            return None
        except Exception as e:
            self.logger.error(
                f"Error fetching active title for user {user_id}: {str(e)}"
            )
            raise

