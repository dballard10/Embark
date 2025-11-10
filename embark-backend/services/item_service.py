from uuid import UUID
from typing import Optional, List
from datetime import datetime, timezone
from supabase import Client
from models.item import ItemCreate, ItemUpdate, ItemResponse, UserItemResponse
from services.achievement_service import AchievementService


class ItemService:
    """Service for item-related operations"""

    def __init__(self, supabase: Client):
        self.supabase = supabase
        self.achievement_service = AchievementService()

    async def create_item(self, item_data: ItemCreate) -> ItemResponse:
        """Create a new item"""
        try:
            response = (
                self.supabase.table("items")
                .insert(item_data.model_dump())
                .execute()
            )

            if not response.data:
                raise ValueError("Failed to create item")

            return ItemResponse(**response.data[0])
        except Exception as e:
            raise ValueError(f"Error creating item: {str(e)}")

    async def get_item(self, item_id: UUID) -> Optional[ItemResponse]:
        """Get an item by ID"""
        try:
            response = (
                self.supabase.table("items")
                .select("*")
                .eq("id", str(item_id))
                .execute()
            )

            if not response.data:
                return None

            return ItemResponse(**response.data[0])
        except Exception as e:
            raise ValueError(f"Error fetching item: {str(e)}")

    async def list_items(
        self,
        rarity_tier: Optional[int] = None,
        limit: int = 500,
        offset: int = 0,
    ) -> list[ItemResponse]:
        """List items with optional rarity filter"""
        try:
            # Validate limit to prevent excessive queries
            if limit > 500:
                limit = 500
            if limit < 1:
                limit = 1
                
            query = self.supabase.table("items").select("*")

            if rarity_tier:
                query = query.eq("rarity_tier", rarity_tier)

            response = (
                query.order("rarity_tier", desc=True)
                .order("rarity_stars", desc=True)
                .range(offset, offset + limit - 1)
                .execute()
            )

            return [ItemResponse(**item) for item in response.data]
        except Exception as e:
            raise ValueError(f"Error listing items: {str(e)}")

    async def update_item(
        self, item_id: UUID, item_data: ItemUpdate
    ) -> ItemResponse:
        """Update an item"""
        try:
            update_data = item_data.model_dump(exclude_unset=True)

            if not update_data:
                raise ValueError("No data to update")

            response = (
                self.supabase.table("items")
                .update(update_data)
                .eq("id", str(item_id))
                .execute()
            )

            if not response.data:
                raise ValueError("Item not found")

            return ItemResponse(**response.data[0])
        except Exception as e:
            raise ValueError(f"Error updating item: {str(e)}")

    async def delete_item(self, item_id: UUID) -> bool:
        """Delete an item"""
        try:
            response = (
                self.supabase.table("items")
                .delete()
                .eq("id", str(item_id))
                .execute()
            )

            return len(response.data) > 0
        except Exception as e:
            raise ValueError(f"Error deleting item: {str(e)}")

    async def award_item_to_user(
        self, user_id: UUID, item_id: UUID
    ) -> Optional[UserItemResponse]:
        """
        Award an item to a user.
        Returns the UserItemResponse if item was awarded, or None if user already owns the item.
        """
        try:
            # Verify item exists
            item = await self.get_item(item_id)
            if not item:
                raise ValueError("Item not found")

            # Check if user already owns this item
            existing_item = (
                self.supabase.table("user_items")
                .select("id")
                .eq("user_id", str(user_id))
                .eq("item_id", str(item_id))
                .execute()
            )
            
            if existing_item.data:
                # User already owns this item, return None to indicate it wasn't awarded
                return None

            # Create user item entry
            insert_data = {
                "user_id": str(user_id),
                "item_id": str(item_id),
                "acquired_at": datetime.now(timezone.utc).isoformat(),
                "is_featured": False,
            }

            response = (
                self.supabase.table("user_items").insert(insert_data).execute()
            )

            if not response.data:
                raise ValueError("Failed to award item")

            user_item = response.data[0]
            return UserItemResponse(**user_item, item=item)
        except Exception as e:
            raise ValueError(f"Error awarding item: {str(e)}")

    async def get_user_items(self, user_id: UUID) -> list[UserItemResponse]:
        """Get all items owned by a user"""
        try:
            response = (
                self.supabase.table("user_items")
                .select("*")
                .eq("user_id", str(user_id))
                .order("acquired_at", desc=True)
                .execute()
            )

            result = []
            for user_item in response.data:
                # Fetch the item details separately
                item = await self.get_item(UUID(user_item["item_id"]))
                if item:
                    result.append(
                        UserItemResponse(**user_item, item=item)
                    )

            return result
        except Exception as e:
            raise ValueError(f"Error fetching user items: {str(e)}")

    async def set_featured_item(
        self, user_id: UUID, user_item_id: UUID
    ) -> UserItemResponse:
        """Set an item as featured for a user"""
        try:
            # First, unfeatured all items for this user
            self.supabase.table("user_items").update({"is_featured": False}).eq(
                "user_id", str(user_id)
            ).execute()

            # Then feature the selected item
            response = (
                self.supabase.table("user_items")
                .update({"is_featured": True})
                .eq("id", str(user_item_id))
                .eq("user_id", str(user_id))
                .execute()
            )

            if not response.data:
                raise ValueError("User item not found")

            # Get the item details
            user_item = response.data[0]
            item = await self.get_item(UUID(user_item["item_id"]))
            
            if not item:
                raise ValueError("Item not found")

            return UserItemResponse(**user_item, item=item)
        except Exception as e:
            raise ValueError(f"Error setting featured item: {str(e)}")

    async def purchase_item(
        self, user_id: UUID, item_id: UUID
    ) -> dict:
        """Purchase an item for a user"""
        try:
            # 1. Check if item exists
            item = await self.get_item(item_id)
            if not item:
                raise ValueError("Item not found")

            # 2. Check if user already owns the item
            user_items_response = (
                self.supabase.table("user_items")
                .select("id")
                .eq("user_id", str(user_id))
                .eq("item_id", str(item_id))
                .execute()
            )
            
            if user_items_response.data:
                raise ValueError("You already own this item")

            # 3. Get user's current glory
            user_response = (
                self.supabase.table("users")
                .select("total_glory")
                .eq("id", str(user_id))
                .execute()
            )

            if not user_response.data:
                raise ValueError("User not found")

            user_glory = user_response.data[0]["total_glory"]

            # 4. Check if user has enough glory
            if user_glory < item.price:
                raise ValueError(f"Insufficient glory. You need {item.price} glory but only have {user_glory}")

            # 5. Deduct glory from user
            new_glory = user_glory - item.price
            update_response = (
                self.supabase.table("users")
                .update({"total_glory": new_glory})
                .eq("id", str(user_id))
                .execute()
            )

            if not update_response.data:
                raise ValueError("Failed to update user glory")

            # 6. Award item to user
            user_item = await self.award_item_to_user(user_id, item_id)

            # 7. Check and award achievements
            awarded_achievements = []
            try:
                # Check for collection achievement
                collection_achievement = await self.achievement_service.check_and_award_collection_achievement(
                    user_id
                )
                if collection_achievement:
                    awarded_achievements.append(collection_achievement)
            except Exception as achievement_error:
                # Log the error but don't fail the purchase
                print(f"Warning: Failed to check achievements: {achievement_error}")

            return {
                "user_item": user_item,
                "new_glory": new_glory,
                "item_price": item.price,
                "awarded_achievements": awarded_achievements
            }
        except Exception as e:
            raise ValueError(f"Error purchasing item: {str(e)}")

