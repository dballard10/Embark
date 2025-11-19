"""
Application configuration using Pydantic Settings
"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings"""
    
    # API Settings
    API_TITLE: str = "Embark API"
    API_DESCRIPTION: str = "Life Gamification API for the Embark MVP"
    API_VERSION: str = "0.1.0"
    
    # CORS Settings
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://embark-theta.vercel.app",
        "https://embark-production.up.railway.app"
    ]
    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: List[str] = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    CORS_ALLOW_HEADERS: List[str] = ["*"]
    
    # Database Settings (Supabase)
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    
    # OpenAI Settings
    OPENAI_API_KEY: str = ""
    
    # Logging
    LOG_LEVEL: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"


# Create singleton instance
settings = Settings()

