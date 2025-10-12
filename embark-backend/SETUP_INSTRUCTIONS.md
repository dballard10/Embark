# Backend Setup Instructions

## ⚠️ Important: Environment Variables

You mentioned using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your environment file. **These are frontend variables!**

For the backend to work, you need to create a `.env` file in the `embark-backend` directory with these exact variable names (without the `VITE_` prefix):

```bash
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

### Steps to Fix:

1. **Navigate to the backend directory:**

   ```bash
   cd /Users/dylanballard/Projects/Embark/embark-backend
   ```

2. **Create the `.env` file:**

   ```bash
   touch .env
   ```

3. **Edit the `.env` file and add your credentials:**

   ```bash
   SUPABASE_URL=your_actual_supabase_url
   SUPABASE_ANON_KEY=your_actual_anon_key
   ```

4. **Restart the backend server:**
   The FastAPI dev server should auto-reload, but if not, restart it:

   ```bash
   # Stop the current server (Ctrl+C)
   # Then start it again:
   uv run fastapi dev main.py
   ```

5. **Test the connection:**

   ```bash
   curl http://localhost:8000/api/health
   ```

   You should see:

   ```json
   {
     "status": "healthy",
     "api": "online",
     "database": "connected",
     "message": "All systems operational"
   }
   ```

## What's Been Built

I've created a complete backend API with the following structure:

### 📁 Models (`models/`)

- **user.py** - User data models (create, update, response)
- **quest.py** - Quest and user-quest data models
- **reward.py** - Reward/item data models

### 🔧 Services (`services/`)

Business logic layer that handles all database operations:

- **user_service.py** - User management (CRUD, stats updates)
- **quest_service.py** - Quest management (CRUD, start/complete/abandon quests)
- **reward_service.py** - Reward management (CRUD, award items to users)

### 🛣️ Routers (`routers/`)

API endpoint definitions:

- **health.py** - Health check endpoint
- **users.py** - User endpoints (13 endpoints)
- **quests.py** - Quest endpoints (13 endpoints)
- **rewards.py** - Reward endpoints (9 endpoints)

### Total: **35+ API Endpoints**

## Testing the API

### Option 1: Interactive Documentation (Recommended)

Once the server is running with correct credentials:

1. Open http://localhost:8000/docs
2. You'll see a beautiful Swagger UI with all endpoints
3. Click "Try it out" on any endpoint to test it directly!

### Option 2: Command Line Script

Run the test script:

```bash
cd /Users/dylanballard/Projects/Embark/embark-backend
./test_api.sh
```

### Option 3: Manual Testing

```bash
# Test health
curl http://localhost:8000/api/health

# Create a user
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser"}'

# List all quests
curl http://localhost:8000/api/quests

# List all rewards
curl http://localhost:8000/api/rewards
```

## Next Steps

1. ✅ Fix the `.env` file with correct variable names
2. ✅ Test the health endpoint
3. ✅ Explore the interactive API docs at http://localhost:8000/docs
4. ✅ Test creating users, starting quests, and awarding rewards
5. ✅ Connect the frontend to the backend API

## Common Issues

### Issue: "SUPABASE_URL and SUPABASE_ANON_KEY must be set"

**Solution:** Make sure your `.env` file is in the `embark-backend` directory and uses the correct variable names (without `VITE_` prefix).

### Issue: "Connection test failed"

**Solution:**

- Verify your Supabase credentials are correct
- Make sure your Supabase project is active
- Check your internet connection

### Issue: Server won't start

**Solution:**

- Make sure you're in the correct directory
- Run `uv sync` to install dependencies
- Check for port conflicts (port 8000)

## API Features

✅ **User Management**

- Create, read, update, delete users
- Track glory, XP, and level
- Automatic level calculation based on XP

✅ **Quest System**

- Create quests with tiers (1-6)
- Start quests for users
- Time-limited quests with deadlines
- Complete quests to earn rewards
- Abandon active quests
- Quest history tracking

✅ **Reward System**

- Create items with rarity tiers and stars
- Award items to users automatically when completing quests
- Track user inventories
- Feature items for display

✅ **Complete Quest Flow**

- User starts a quest
- Quest tracks deadline
- User completes quest before deadline
- Automatically awards glory, XP, and items
- Updates user level based on new XP
- Adds item to user's inventory

## Database Schema

The backend works with the following tables:

- `users` - User accounts
- `quests` - Quest templates
- `rewards` - Item/reward templates
- `user_completed_quests` - User quest instances
- `user_items` - User inventory

All tables were set up using the `schema.sql` file.

---

**Ready to test?** Just fix the `.env` file and you're good to go! 🚀
