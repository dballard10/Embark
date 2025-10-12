# Complete Supabase Database Setup Guide

This guide walks you through setting up your Supabase database, connecting it to your backend, and populating it with sample data.

---

## Part 1: SQL Schema Query

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click **"New Project"**
4. Fill in project details:
   - **Name**: `embark-mvp` (or your preferred name)
   - **Database Password**: Choose a strong password (save it securely!)
   - **Region**: Select the region closest to you
5. Click **"Create new project"**
6. Wait 1-2 minutes for the project to initialize

### Step 2: Run the Database Schema

1. In your Supabase dashboard, navigate to the **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy the entire contents of `embark-backend/database/schema.sql` and paste it
4. Click **"Run"** (or press Cmd/Ctrl + Enter)

**What this does:**

- Creates 5 tables: `users`, `rewards`, `quests`, `user_completed_quests`, `user_items`
- Sets up proper relationships with foreign keys
- Adds indexes for query performance
- Enforces constraint: only 1 active quest per user at a time

5. Verify the tables were created:
   - Go to **Table Editor** in the left sidebar
   - You should see all 5 tables listed

---

## Part 2: Connect Backend to Supabase

### Step 1: Get Your Supabase Credentials

1. In your Supabase dashboard, click the **Settings** icon (gear icon) in the bottom left
2. Navigate to **API** in the settings menu
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (a long JWT token)
4. Keep this page open, you'll need these values

### Step 2: Configure Backend Environment

1. In your terminal, navigate to the backend directory:

   ```bash
   cd embark-backend
   ```

2. Create a `.env` file:

   ```bash
   touch .env
   ```

3. Open `.env` in your editor and add your credentials:

   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

   **Important:** Replace the placeholder values with your actual credentials from Step 1!

4. Save the file

### Step 3: Verify Connection Setup

Your backend is already configured to use Supabase:

- ✅ **Dependencies installed**: `supabase`, `python-dotenv` in `pyproject.toml`
- ✅ **Client configured**: `database/supabase_client.py` handles connection
- ✅ **Health check endpoint**: Tests database connection at startup

---

## Part 3: Populate Database with Sample Data

You have two options for seed data:

### Option A: Basic Sample Data (6 quests, 6 rewards, 1 user)

Use this for minimal testing:

```bash
# In Supabase SQL Editor
# Copy and paste contents of: database/seed_data.sql
# Click "Run"
```

**What you get:**

- 1 test user (TestHero, Level 2)
- 6 rewards (one per tier)
- 6 quests (one per tier)
- 1 completed quest
- 1 item in inventory

### Option B: Enhanced Sample Data (26 quests, 18 rewards, 3 users) ⭐ **RECOMMENDED**

Use this for comprehensive testing and development:

```bash
# In Supabase SQL Editor
# Copy and paste contents of: database/seed_data_enhanced.sql
# Click "Run"
```

**What you get:**

- **3 test users** with different levels and progress:
  - `TestHero` (Level 2) - Beginner
  - `DevChampion` (Level 4) - Intermediate
  - `QuestMaster` (Level 8) - Advanced
- **18 rewards** (3 per tier) with diverse themes:
  - Weapons, tools, artifacts, armor, and mystical items
  - Each tier has items for different playstyles
- **26 quests** across all tiers covering:
  - 🏃 Health & Fitness (workouts, meditation, sleep)
  - 📚 Learning & Growth (reading, courses, skills)
  - 🎨 Creativity (writing, art, music, coding)
  - 🤝 Social (connections, mentoring, community)
  - ⚡ Productivity (deep work, projects, tasks)
  - 🌟 Adventure (new experiences, challenges)
- **Sample user progress**:
  - Completed quests history
  - Item inventories with featured items
  - Active quest for TestHero

---

## Part 4: Testing & Verification

### Step 1: Start the Backend Server

```bash
cd embark-backend
uv run fastapi dev main.py
```

You should see output like:

```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### Step 2: Test the Health Endpoint

Open your browser or use curl:

**Browser:**

```
http://localhost:8000/api/health
```

**Or with curl:**

```bash
curl http://localhost:8000/api/health
```

**Expected response (success):**

```json
{
  "status": "healthy",
  "api": "online",
  "database": "connected",
  "message": "All systems operational"
}
```

If you see this, your database is properly connected! 🎉

### Step 3: Verify Data in Supabase Dashboard

1. Go to **Table Editor** in your Supabase dashboard
2. Check each table:
   - **users**: Should see 3 users (or 1 if using basic seed data)
   - **quests**: Should see 26 quests (or 6 if using basic seed data)
   - **rewards**: Should see 18 rewards (or 6 if using basic seed data)
   - **user_items**: Should see various items owned by users
   - **user_completed_quests**: Should see quest history

### Step 4: Test API Endpoints (Coming Soon)

Once your API endpoints are implemented, you can test them:

```bash
# Get all quests
curl http://localhost:8000/api/quests

# Get user profile
curl http://localhost:8000/api/users/{user-id}

# Get user's active quest
curl http://localhost:8000/api/users/{user-id}/active-quest
```

---

## Troubleshooting

### ❌ "SUPABASE_URL and SUPABASE_ANON_KEY must be set"

**Problem:** Environment variables not found

**Solutions:**

1. Make sure `.env` file exists in `embark-backend/` directory
2. Verify the variable names are exactly: `SUPABASE_URL` and `SUPABASE_ANON_KEY`
3. Check for typos in your credentials
4. Make sure there are no quotes around the values in `.env`
5. Restart your backend server after creating/editing `.env`

### ❌ "relation 'users' does not exist"

**Problem:** Database schema not created

**Solutions:**

1. Make sure you ran `schema.sql` in the SQL Editor
2. Check the SQL Editor output for any errors
3. Verify you're in the correct Supabase project
4. Try running the schema script again (it's safe to run multiple times)

### ❌ Connection timeout or "Failed to connect to database"

**Problem:** Network or credentials issue

**Solutions:**

1. Check your internet connection
2. Verify your `SUPABASE_URL` is correct (should end in `.supabase.co`)
3. Verify your `SUPABASE_ANON_KEY` is the full JWT token (very long string)
4. Make sure your Supabase project is active (not paused due to inactivity)
5. Check Supabase status: [https://status.supabase.com](https://status.supabase.com)

### ❌ "duplicate key value violates unique constraint"

**Problem:** Trying to run seed data twice

**Solutions:**

- The seed data inserts will fail if you run them multiple times
- To reset your data:
  1. Go to SQL Editor in Supabase
  2. Run: `TRUNCATE users, rewards, quests, user_completed_quests, user_items CASCADE;`
  3. Re-run your seed data script

### ❌ Backend won't start or crashes

**Problem:** Dependency or configuration issue

**Solutions:**

```bash
# Reinstall dependencies
cd embark-backend
uv sync

# Check Python version (should be 3.12+)
python --version

# Run with verbose output
uv run fastapi dev main.py --reload
```

---

## Adding Your Own Data

### Adding Custom Quests

You can add your own quests directly in Supabase:

1. Go to **Table Editor** → **quests**
2. Click **"Insert row"**
3. Fill in the fields:
   - `title`: Quest name
   - `description`: What the quest entails
   - `tier`: 1-6 (difficulty level)
   - `glory_reward`: Glory points awarded
   - `xp_reward`: XP points awarded
   - `time_limit_hours`: How long to complete (24, 48, 72, etc.)
   - `reward_item_id`: Optional - select a reward from rewards table
4. Click **"Save"**

### Adding Custom Rewards

1. Go to **Table Editor** → **rewards**
2. Click **"Insert row"**
3. Fill in the fields:
   - `name`: Item name
   - `description`: Item description
   - `rarity_tier`: 1-6 (matches tier system)
   - `rarity_stars`: 1-6 (visual indicator in UI)
   - `image_url`: Optional - URL to item image
4. Click **"Save"**

### Creating New Users

1. Go to **Table Editor** → **users**
2. Click **"Insert row"**
3. Fill in:
   - `username`: Unique username
   - `total_glory`: Starting glory (default: 0)
   - `total_xp`: Starting XP (default: 0)
   - `level`: Starting level (default: 1)
4. Click **"Save"**

---

## Database Schema Reference

### Users Table

- `id` (UUID) - Primary key
- `username` (TEXT) - Unique username
- `total_glory` (INTEGER) - Total glory earned
- `total_xp` (INTEGER) - Total experience points
- `level` (INTEGER) - Current level
- `created_at` (TIMESTAMP) - Account creation date

### Rewards Table

- `id` (UUID) - Primary key
- `name` (TEXT) - Item name
- `description` (TEXT) - Item description
- `rarity_tier` (INTEGER) - Tier level (1-6)
- `rarity_stars` (INTEGER) - Star rating (1-6)
- `image_url` (TEXT) - Optional image URL
- `created_at` (TIMESTAMP) - Creation date

### Quests Table

- `id` (UUID) - Primary key
- `title` (TEXT) - Quest title
- `description` (TEXT) - Quest description
- `tier` (INTEGER) - Difficulty tier (1-6)
- `glory_reward` (INTEGER) - Glory points awarded
- `xp_reward` (INTEGER) - XP points awarded
- `time_limit_hours` (INTEGER) - Time limit in hours
- `reward_item_id` (UUID) - Foreign key to rewards
- `created_at` (TIMESTAMP) - Creation date

### User Completed Quests Table

- `id` (UUID) - Primary key
- `user_id` (UUID) - Foreign key to users
- `quest_id` (UUID) - Foreign key to quests
- `started_at` (TIMESTAMP) - When quest was accepted
- `completed_at` (TIMESTAMP) - When quest was completed (NULL if active)
- `deadline_at` (TIMESTAMP) - Quest deadline
- `is_active` (BOOLEAN) - Whether quest is currently active
- `created_at` (TIMESTAMP) - Record creation date

**Note:** Users can only have 1 active quest at a time (enforced by unique index)

### User Items Table

- `id` (UUID) - Primary key
- `user_id` (UUID) - Foreign key to users
- `item_id` (UUID) - Foreign key to rewards
- `acquired_at` (TIMESTAMP) - When item was obtained
- `is_featured` (BOOLEAN) - Whether item is featured on profile

---

## Next Steps

Now that your database is set up and connected:

1. ✅ **Test your connection** - Verify the health endpoint works
2. 🔨 **Build API endpoints** - Create routes for quests, users, items
3. 🎮 **Connect frontend** - Wire up your React app to the backend
4. 🚀 **Start developing** - Add your own quests and test the full flow!

For API endpoint development, refer to: `project-plan/api-endpoints.md`

---

## Quick Reference Commands

```bash
# Start backend server
cd embark-backend
uv run fastapi dev main.py

# Test health endpoint
curl http://localhost:8000/api/health

# View backend logs
# (Just run the server in foreground to see logs)

# Reset database (in Supabase SQL Editor)
TRUNCATE users, rewards, quests, user_completed_quests, user_items CASCADE;
```

---

## Security Notes

- ✅ `.env` file is in `.gitignore` (your credentials won't be committed)
- ✅ Using `SUPABASE_ANON_KEY` (appropriate for client-side apps)
- ⚠️ For production, implement Row Level Security (RLS) in Supabase
- ⚠️ For production, add authentication and authorization
- ⚠️ Never expose your database password or service role key

---

**You're all set!** 🎉 Your Supabase database is configured and ready for development.
