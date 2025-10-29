from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from routers import health, users, quests, items, auth, achievements
from config.settings import settings
from middleware import (
    LoggingMiddleware,
    setup_logging,
    http_exception_handler,
    validation_exception_handler,
    general_exception_handler,
    api_exception_handler,
    APIException,
)

# Setup logging
setup_logging(settings.LOG_LEVEL)

# Initialize FastAPI app
app = FastAPI(
    title=settings.API_TITLE,
    description=settings.API_DESCRIPTION,
    version=settings.API_VERSION,
)

# Add logging middleware
app.add_middleware(LoggingMiddleware)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=settings.CORS_ALLOW_CREDENTIALS,
    allow_methods=settings.CORS_ALLOW_METHODS,
    allow_headers=settings.CORS_ALLOW_HEADERS,
    expose_headers=["*"],
)

# Register exception handlers
app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(APIException, api_exception_handler)
app.add_exception_handler(Exception, general_exception_handler)

# Include routers
app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api", tags=["users"])
app.include_router(quests.router, prefix="/api", tags=["quests"])
app.include_router(items.router, prefix="/api", tags=["items"])
app.include_router(achievements.router, prefix="/api", tags=["achievements"])


@app.get("/")
async def root():
    return {
        "message": "Welcome to Embark API",
        "version": "0.1.0",
        "status": "online",
    }
