# Database Setup Instructions

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - **Name**: embark-mvp (or your preferred name)
   - **Database Password**: Choose a strong password
   - **Region**: Select closest to you
5. Wait for project to finish setting up (1-2 minutes)

## Step 2: Get Your Credentials

1. In your Supabase dashboard, go to **Project Settings** (gear icon)
2. Navigate to **API** section
3. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (the long JWT token)

## Step 3: Configure Backend Environment

1. In the `embark-backend` folder, create a `.env` file
2. Add your credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Copy and paste the entire contents of `database/schema.sql`
4. Click **Run** to execute
5. Verify all tables were created (check the **Table Editor**)

## Step 5: Add Seed Data

1. In SQL Editor, create a new query
2. Copy and paste the entire contents of `database/seed_data.sql`
3. Click **Run** to execute
4. Verify data was inserted:
   - Check `users` table for TestHero
   - Check `quests` table for 6 quests
   - Check `rewards` table for 6 items

## Step 6: Test Connection

Run the backend server and test the health endpoint:

```bash
cd embark-backend
uv run fastapi dev main.py
```

Visit: http://localhost:8000/api/health

You should see:

```json
{
  "status": "healthy",
  "api": "online",
  "database": "connected",
  "message": "All systems operational"
}
```

## Troubleshooting

### "SUPABASE_URL and SUPABASE_ANON_KEY must be set"

- Make sure your `.env` file exists in the `embark-backend` folder
- Verify the variable names match exactly

### "relation 'users' does not exist"

- Run the schema.sql script first
- Check for any errors in the SQL Editor

### Connection timeout

- Check your internet connection
- Verify the Supabase project URL is correct
- Make sure your Supabase project is active (not paused)
