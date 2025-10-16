"""
Base service class with common database operations
"""
from typing import Optional, List, Any, Dict
from uuid import UUID
from supabase import Client


class BaseService:
    """Base service class with common CRUD operations"""

    def __init__(self, supabase: Client):
        self.supabase = supabase

    async def get_by_id(
        self, table: str, id: UUID, select: str = "*"
    ) -> Optional[Dict[str, Any]]:
        """
        Get a single record by ID

        Args:
            table: Table name
            id: Record ID
            select: Columns to select (default: "*")

        Returns:
            Record dict or None if not found
        """
        try:
            response = (
                self.supabase.table(table)
                .select(select)
                .eq("id", str(id))
                .execute()
            )

            if not response.data:
                return None

            return response.data[0]
        except Exception as e:
            raise ValueError(f"Error fetching record from {table}: {str(e)}")

    async def list_all(
        self,
        table: str,
        select: str = "*",
        filters: Optional[Dict[str, Any]] = None,
        order_by: Optional[str] = None,
        limit: int = 100,
        offset: int = 0,
        desc: bool = False,
    ) -> List[Dict[str, Any]]:
        """
        List all records with optional filtering

        Args:
            table: Table name
            select: Columns to select (default: "*")
            filters: Dict of column:value filters
            order_by: Column to order by
            limit: Maximum number of records to return
            offset: Number of records to skip
            desc: Order descending if True

        Returns:
            List of record dicts
        """
        try:
            query = self.supabase.table(table).select(select)

            # Apply filters
            if filters:
                for column, value in filters.items():
                    query = query.eq(column, value)

            # Apply ordering
            if order_by:
                query = query.order(order_by, desc=desc)

            # Apply pagination
            response = query.range(offset, offset + limit - 1).execute()

            return response.data
        except Exception as e:
            raise ValueError(f"Error listing records from {table}: {str(e)}")

    async def create(
        self, table: str, data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Create a new record

        Args:
            table: Table name
            data: Record data

        Returns:
            Created record dict
        """
        try:
            response = self.supabase.table(table).insert(data).execute()

            if not response.data:
                raise ValueError(f"Failed to create record in {table}")

            return response.data[0]
        except Exception as e:
            raise ValueError(f"Error creating record in {table}: {str(e)}")

    async def update(
        self, table: str, id: UUID, data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Update a record by ID

        Args:
            table: Table name
            id: Record ID
            data: Updated data

        Returns:
            Updated record dict
        """
        try:
            response = (
                self.supabase.table(table)
                .update(data)
                .eq("id", str(id))
                .execute()
            )

            if not response.data:
                raise ValueError(f"Record not found in {table}")

            return response.data[0]
        except Exception as e:
            raise ValueError(f"Error updating record in {table}: {str(e)}")

    async def delete(self, table: str, id: UUID) -> bool:
        """
        Delete a record by ID

        Args:
            table: Table name
            id: Record ID

        Returns:
            True if deleted, False if not found
        """
        try:
            response = (
                self.supabase.table(table).delete().eq("id", str(id)).execute()
            )

            return len(response.data) > 0
        except Exception as e:
            raise ValueError(f"Error deleting record from {table}: {str(e)}")

    async def count(
        self, table: str, filters: Optional[Dict[str, Any]] = None
    ) -> int:
        """
        Count records with optional filtering

        Args:
            table: Table name
            filters: Dict of column:value filters

        Returns:
            Count of records
        """
        try:
            query = self.supabase.table(table).select("id", count="exact")

            # Apply filters
            if filters:
                for column, value in filters.items():
                    query = query.eq(column, value)

            response = query.execute()

            return response.count or 0
        except Exception as e:
            raise ValueError(f"Error counting records in {table}: {str(e)}")

    async def exists(self, table: str, id: UUID) -> bool:
        """
        Check if a record exists

        Args:
            table: Table name
            id: Record ID

        Returns:
            True if exists, False otherwise
        """
        record = await self.get_by_id(table, id, select="id")
        return record is not None

    def _convert_uuid_fields(self, data: Dict[str, Any], fields: List[str]) -> Dict[str, Any]:
        """
        Convert UUID fields to strings for database insertion

        Args:
            data: Data dict
            fields: List of field names to convert

        Returns:
            Data dict with converted UUID fields
        """
        converted = data.copy()
        for field in fields:
            if field in converted and converted[field] is not None:
                converted[field] = str(converted[field])
        return converted

