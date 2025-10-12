# Quick Setup - Copy & Paste Guide

This is your **quick reference** for setting up Supabase. For detailed instructions, see `SUPABASE_SETUP_GUIDE.md`.

---

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create new project
3. Save your password!

---

## 2. Run This SQL (Schema)

Go to **SQL Editor** → **New query** → Copy/paste this:

**File:** `database/schema.sql`

```sql
-- Embark MVP Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL UNIQUE,
    total_glory INTEGER NOT NULL DEFAULT 0,
    total_xp INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rewards/Items table
CREATE TABLE IF NOT EXISTS rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    rarity_tier INTEGER NOT NULL CHECK (rarity_tier >= 1 AND rarity_tier <= 6),
    rarity_stars INTEGER NOT NULL CHECK (rarity_stars >= 1 AND rarity_stars <= 6),
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quests table
CREATE TABLE IF NOT EXISTS quests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tier INTEGER NOT NULL CHECK (tier >= 1 AND tier <= 6),
    glory_reward INTEGER NOT NULL DEFAULT 0,
    xp_reward INTEGER NOT NULL DEFAULT 0,
    time_limit_hours INTEGER NOT NULL DEFAULT 24,
    reward_item_id UUID REFERENCES rewards(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User completed quests table
CREATE TABLE IF NOT EXISTS user_completed_quests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quest_id UUID NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    deadline_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User items table
CREATE TABLE IF NOT EXISTS user_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES rewards(id) ON DELETE CASCADE,
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_featured BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_completed_quests_user_id ON user_completed_quests(user_id);
CREATE INDEX IF NOT EXISTS idx_user_completed_quests_is_active ON user_completed_quests(is_active);
CREATE INDEX IF NOT EXISTS idx_user_items_user_id ON user_items(user_id);
CREATE INDEX IF NOT EXISTS idx_quests_tier ON quests(tier);

-- Add constraint to ensure only one active quest per user
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_active_quest
ON user_completed_quests(user_id)
WHERE is_active = TRUE;
```

Click **RUN** ✅

---

## 3. Run This SQL (Sample Data)

**New query** → Copy/paste contents of: `database/seed_data_enhanced.sql`

This gives you:

- 3 test users (Level 2, 4, 8)
- 18 diverse rewards
- 26 quests across all tiers
- Sample completed quests and items

Click **RUN** ✅

---

## 4. Get Your Credentials

**Settings** → **API** → Copy:

- Project URL
- anon/public key

---

## 5. Create Backend .env File

```bash
cd embark-backend
touch .env
```

Add to `.env`:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-actual-anon-key-here
```

---

## 6. Test It!

```bash
cd embark-backend
uv run fastapi dev main.py
```

Visit: http://localhost:8000/api/health

Should see:

```json
{
  "status": "healthy",
  "api": "online",
  "database": "connected",
  "message": "All systems operational"
}
```

✅ **Done!** Your database is ready.

---

## Test User Credentials

Use these users for testing:

| Username    | Level | Glory   | XP      | Status                       |
| ----------- | ----- | ------- | ------- | ---------------------------- |
| TestHero    | 2     | 15,000  | 24,000  | Has 1 active quest           |
| DevChampion | 4     | 45,000  | 78,000  | Completed 5 quests           |
| QuestMaster | 8     | 180,000 | 320,000 | Completed 5 legendary quests |

---

## Need Help?

See `SUPABASE_SETUP_GUIDE.md` for:

- Detailed explanations
- Troubleshooting
- Adding custom data
- Database schema reference
