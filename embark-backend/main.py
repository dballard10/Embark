from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import health, users, quests, items

app = FastAPI(
    title="Embark API",
    description="Life Gamification API for the Embark MVP",
    version="0.1.0",
)

# CORS Configuration for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(users.router, prefix="/api", tags=["users"])
app.include_router(quests.router, prefix="/api", tags=["quests"])
app.include_router(items.router, prefix="/api", tags=["items"])


@app.get("/")
async def root():
    return {
        "message": "Welcome to Embark API",
        "version": "0.1.0",
        "status": "online",
    }
