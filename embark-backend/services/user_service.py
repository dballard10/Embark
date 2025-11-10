from uuid import UUID
from typing import Optional
from supabase import Client
from models.user import UserCreate, UserUpdate, UserResponse, UserStatsUpdate
from utils.level_calculator import calculate_level


class UserService:
    """Service for user-related operations"""

    def __init__(self, supabase: Client):
        self.supabase = supabase

    async def create_user(self, user_data: UserCreate) -> UserResponse:
        """Create a new user"""
        try:
            response = (
                self.supabase.table("users")
                .insert({
                    "username": user_data.username,
                    "email": user_data.email
                })
                .execute()
            )

            if not response.data:
                raise ValueError("Failed to create user")

            return UserResponse(**response.data[0])
        except Exception as e:
            raise ValueError(f"Error creating user: {str(e)}")

    async def get_user(self, user_id: UUID) -> Optional[UserResponse]:
        """Get a user by ID"""
        try:
            response = (
                self.supabase.table("users")
                .select("*")
                .eq("id", str(user_id))
                .execute()
            )

            if not response.data:
                return None

            return UserResponse(**response.data[0])
        except Exception as e:
            raise ValueError(f"Error fetching user: {str(e)}")

    async def get_user_by_username(self, username: str) -> Optional[UserResponse]:
        """Get a user by username"""
        try:
            response = (
                self.supabase.table("users")
                .select("*")
                .eq("username", username)
                .execute()
            )

            if not response.data:
                return None

            return UserResponse(**response.data[0])
        except Exception as e:
            raise ValueError(f"Error fetching user: {str(e)}")

    async def get_user_by_email(self, email: str) -> Optional[UserResponse]:
        """Get a user by email"""
        try:
            response = (
                self.supabase.table("users")
                .select("*")
                .eq("email", email)
                .execute()
            )

            if not response.data:
                return None

            return UserResponse(**response.data[0])
        except Exception as e:
            raise ValueError(f"Error fetching user: {str(e)}")

    async def list_users(self, limit: int = 100, offset: int = 0) -> list[UserResponse]:
        """List all users with pagination"""
        try:
            response = (
                self.supabase.table("users")
                .select("*")
                .order("created_at", desc=True)
                .range(offset, offset + limit - 1)
                .execute()
            )

            return [UserResponse(**user) for user in response.data]
        except Exception as e:
            raise ValueError(f"Error listing users: {str(e)}")

    async def update_user(self, user_id: UUID, user_data: UserUpdate) -> UserResponse:
        """Update a user's information"""
        try:
            # Only include fields that are set
            update_data = user_data.model_dump(exclude_unset=True)

            if not update_data:
                raise ValueError("No data to update")

            response = (
                self.supabase.table("users")
                .update(update_data)
                .eq("id", str(user_id))
                .execute()
            )

            if not response.data:
                raise ValueError("User not found")

            return UserResponse(**response.data[0])
        except Exception as e:
            raise ValueError(f"Error updating user: {str(e)}")

    async def update_user_stats(
        self, user_id: UUID, stats_update: UserStatsUpdate
    ) -> UserResponse:
        """Update user's glory and XP, and recalculate level"""
        try:
            # Get current user
            user = await self.get_user(user_id)
            if not user:
                raise ValueError("User not found")

            # Calculate new stats
            new_glory = user.total_glory + stats_update.glory_delta
            new_xp = user.total_xp + stats_update.xp_delta

            # Calculate new level using progressive XP system
            new_level = calculate_level(new_xp)

            # Update data dictionary
            update_data = {
                "total_glory": new_glory,
                "total_xp": new_xp,
                "level": new_level,
            }

            # Track lifetime glory gained (only when earning, not spending)
            # glory_delta > 0 means earning, < 0 means spending
            if stats_update.glory_delta > 0:
                current_lifetime = getattr(user, 'lifetime_glory_gained', 0)
                update_data["lifetime_glory_gained"] = current_lifetime + stats_update.glory_delta

            # Update user
            response = (
                self.supabase.table("users")
                .update(update_data)
                .eq("id", str(user_id))
                .execute()
            )

            if not response.data:
                raise ValueError("Failed to update user stats")

            return UserResponse(**response.data[0])
        except Exception as e:
            raise ValueError(f"Error updating user stats: {str(e)}")

    async def delete_user(self, user_id: UUID) -> bool:
        """Delete a user"""
        try:
            response = (
                self.supabase.table("users").delete().eq("id", str(user_id)).execute()
            )

            return len(response.data) > 0
        except Exception as e:
            raise ValueError(f"Error deleting user: {str(e)}")

