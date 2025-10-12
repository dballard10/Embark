# Embark Backend API

Life Gamification API for the Embark MVP - Built with FastAPI and Supabase.

## Quick Start

### 1. Environment Setup

Create a `.env` file in the `embark-backend` directory with your Supabase credentials:

```bash
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

**Important:** Use `SUPABASE_URL` and `SUPABASE_ANON_KEY` (without the `VITE_` prefix). The `VITE_` prefix is only for frontend environment variables.

You can find your credentials in the Supabase dashboard:

- Go to your project
- Click **Settings** → **API**
- Copy the **Project URL** (for `SUPABASE_URL`)
- Copy the **anon/public key** (for `SUPABASE_ANON_KEY`)

### 2. Install Dependencies

```bash
cd embark-backend
uv sync
```

### 3. Run the Development Server

```bash
uv run fastapi dev main.py
```

The API will be available at:

- API: http://127.0.0.1:8000
- Interactive Docs: http://127.0.0.1:8000/docs
- Alternative Docs: http://127.0.0.1:8000/redoc

## API Endpoints

### Health Check

- `GET /api/health` - Check API and database connectivity

### Users

- `POST /api/users` - Create a new user
- `GET /api/users/{user_id}` - Get user by ID
- `GET /api/users/username/{username}` - Get user by username
- `GET /api/users` - List all users
- `PATCH /api/users/{user_id}` - Update user
- `POST /api/users/{user_id}/stats` - Update user stats (glory/XP)
- `DELETE /api/users/{user_id}` - Delete user

### Quests

- `POST /api/quests` - Create a new quest
- `GET /api/quests/{quest_id}` - Get quest by ID
- `GET /api/quests` - List quests (optional tier filter)
- `PATCH /api/quests/{quest_id}` - Update quest
- `DELETE /api/quests/{quest_id}` - Delete quest

### User Quests

- `POST /api/users/{user_id}/quests/start` - Start a quest
- `GET /api/users/{user_id}/quests/active` - Get active quest
- `POST /api/users/{user_id}/quests/complete` - Complete quest and get items
- `DELETE /api/users/{user_id}/quests/active` - Abandon active quest
- `GET /api/users/{user_id}/quests/history` - Get completed quests

### Items

- `POST /api/items` - Create a new item
- `GET /api/items/{item_id}` - Get item by ID
- `GET /api/items` - List items (optional rarity filter)
- `PATCH /api/items/{item_id}` - Update item
- `DELETE /api/items/{item_id}` - Delete item

### User Items

- `POST /api/users/{user_id}/items/{item_id}` - Award item to user
- `GET /api/users/{user_id}/items` - Get user's items
- `PATCH /api/users/{user_id}/items/{user_item_id}/feature` - Set featured item

## Architecture

```
embark-backend/
├── database/
│   ├── supabase_client.py   # Supabase connection
│   └── schema.sql            # Database schema
├── models/
│   ├── user.py               # User Pydantic models
│   ├── quest.py              # Quest Pydantic models
│   └── item.py               # Item Pydantic models
├── services/
│   ├── user_service.py       # User business logic
│   ├── quest_service.py      # Quest business logic
│   └── item_service.py       # Item business logic
├── routers/
│   ├── health.py             # Health check endpoints
│   ├── users.py              # User endpoints
│   ├── quests.py             # Quest endpoints
│   └── items.py              # Item endpoints
└── main.py                   # FastAPI application
```

## Development

The API uses:

- **FastAPI** for the web framework
- **Supabase** for database (PostgreSQL)
- **Pydantic** for data validation
- **UV** for dependency management

## Testing

Test the health endpoint:

```bash
curl http://localhost:8000/api/health
```

Expected response:

```json
{
  "status": "healthy",
  "api": "online",
  "database": "connected",
  "message": "All systems operational"
}
```

## Interactive API Documentation

FastAPI automatically generates interactive API documentation. Once the server is running, visit:

- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

You can test all endpoints directly from the browser!
