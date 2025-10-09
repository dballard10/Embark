from fastapi import APIRouter, HTTPException
from database.supabase_client import get_supabase_client

router = APIRouter()


@router.get("/health")
async def health_check():
    """
    Health check endpoint that verifies API and database connectivity
    """
    try:
        # Test Supabase connection
        supabase = get_supabase_client()
        
        # Simple query to verify database connectivity
        response = supabase.table("users").select("count", count="exact").limit(0).execute()
        
        return {
            "status": "healthy",
            "api": "online",
            "database": "connected",
            "message": "All systems operational",
        }
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail={
                "status": "unhealthy",
                "api": "online",
                "database": "disconnected",
                "error": str(e),
            },
        )

