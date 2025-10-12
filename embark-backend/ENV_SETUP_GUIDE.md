# 🔧 Environment Variables Setup Guide

## The Problem

Your backend needs these environment variables:

```bash
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

But you mentioned using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

**The `VITE_` prefix is only for frontend!** The backend won't recognize them.

## The Solution

### Step 1: Navigate to the backend directory

```bash
cd /Users/dylanballard/Projects/Embark/embark-backend
```

### Step 2: Check if .env exists

```bash
ls -la .env
```

### Step 3: Create or edit the .env file

#### Option A: Create from scratch

```bash
cat > .env << EOF
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-actual-anon-key-here
EOF
```

#### Option B: Edit manually

```bash
nano .env
# or
vim .env
# or
code .env
```

Then paste:

```bash
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-actual-anon-key-here
```

**Replace with your actual values from Supabase!**

### Step 4: Verify the file

```bash
cat .env
```

You should see your credentials (without VITE\_ prefix).

### Step 5: The server should auto-reload

Watch your terminal where the server is running. You should see:

```
INFO:     Will watch for changes in these directories: ['/Users/dylanballard/Projects/Embark/embark-backend']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

### Step 6: Test the connection

```bash
curl http://localhost:8000/api/health
```

**Success looks like:**

```json
{
  "status": "healthy",
  "api": "online",
  "database": "connected",
  "message": "All systems operational"
}
```

**Failure looks like:**

```json
{
  "detail": {
    "status": "unhealthy",
    "api": "online",
    "database": "disconnected",
    "error": "SUPABASE_URL and SUPABASE_ANON_KEY must be set in environment variables"
  }
}
```

## Quick Reference

### Backend Environment (.env in embark-backend/)

```bash
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

### Frontend Environment (.env in embark-frontend/)

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_API_URL=http://localhost:8000/api
```

## Where to Find Your Credentials

1. Go to https://supabase.com
2. Open your project
3. Click **Settings** (⚙️ icon in sidebar)
4. Click **API**
5. You'll see:
   - **Project URL** → Use this for `SUPABASE_URL`
   - **Project API keys** → Copy the `anon` `public` key for `SUPABASE_ANON_KEY`

## Common Mistakes

❌ Using `VITE_SUPABASE_URL` in backend `.env`
✅ Use `SUPABASE_URL` (no prefix)

❌ Putting `.env` file in the project root
✅ Put it in `embark-backend/.env`

❌ Forgetting to save the file
✅ Save and check with `cat .env`

❌ Using service_role key
✅ Use the `anon` public key

## Still Not Working?

### Check 1: File location

```bash
ls -la /Users/dylanballard/Projects/Embark/embark-backend/.env
```

Should exist and not be empty.

### Check 2: Variable names

```bash
cat /Users/dylanballard/Projects/Embark/embark-backend/.env | grep SUPABASE
```

Should show `SUPABASE_URL` and `SUPABASE_ANON_KEY` (no VITE\_ prefix).

### Check 3: Restart server manually

```bash
# Stop server (Ctrl+C in the terminal where it's running)
cd /Users/dylanballard/Projects/Embark/embark-backend
uv run fastapi dev main.py
```

### Check 4: Test health endpoint

```bash
curl http://localhost:8000/api/health
```

---

Once you see `"database": "connected"`, you're ready to use all 35+ API endpoints! 🎉
