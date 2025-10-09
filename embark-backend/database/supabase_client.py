import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY", "")

# Global client instance
_supabase_client: Client | None = None


def get_supabase_client() -> Client:
    """
    Get or create Supabase client instance
    """
    global _supabase_client
    
    if _supabase_client is None:
        if not SUPABASE_URL or not SUPABASE_KEY:
            raise ValueError(
                "SUPABASE_URL and SUPABASE_ANON_KEY must be set in environment variables"
            )
        
        _supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    return _supabase_client


def test_connection() -> bool:
    """
    Test the Supabase connection
    """
    try:
        client = get_supabase_client()
        # Simple query to test connection
        client.table("users").select("count", count="exact").limit(0).execute()
        return True
    except Exception as e:
        print(f"Connection test failed: {e}")
        return False

