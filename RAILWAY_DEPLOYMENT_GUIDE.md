# Railway Deployment Fix Guide

## Problem Identified

Your backend is failing with "connection dial timeout" errors because it's not configured to run on Railway. Railway requires specific host/port bindings that weren't set up.

## What I've Fixed

✅ Created `Procfile` - tells Railway how to start your app
✅ Created `railway.toml` - Railway-specific configuration  
✅ Generated `requirements.txt` - for Railway's build process

## Required Steps to Deploy

### 1. Verify Environment Variables in Railway

Go to your Railway project dashboard and make sure these variables are set:

**Required:**
- `SUPABASE_URL` - Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)
- `SUPABASE_ANON_KEY` - Your Supabase anon/public key
- `PORT` - Railway sets this automatically, **DO NOT** manually set it

**Optional but recommended:**
- `LOG_LEVEL` - Set to `INFO` or `DEBUG`
- `OPENAI_API_KEY` - If you're using OpenAI features

### 2. Push These Changes to Git

```bash
git add Procfile railway.toml embark-backend/requirements.txt embark-backend/Procfile
git commit -m "Fix Railway deployment configuration"
git push origin main
```

### 3. Railway Will Auto-Deploy

Once you push, Railway will automatically:
1. Detect the new configuration
2. Build with the correct Python dependencies
3. Start the server on `0.0.0.0:$PORT` (Railway's requirements)

### 4. Verify Deployment

After deployment completes, check:

1. **Railway Logs** - Look for:
   ```
   INFO:     Started server process
   INFO:     Waiting for application startup.
   INFO:     Application startup complete.
   INFO:     Uvicorn running on http://0.0.0.0:XXXX
   ```

2. **Health Check** - Visit your Railway URL:
   ```
   https://embark-production.up.railway.app/api/health
   ```
   
   Should return:
   ```json
   {
     "status": "healthy",
     "api": "online",
     "database": "connected",
     "message": "All systems operational"
   }
   ```

## Common Issues & Solutions

### Issue: "SUPABASE_URL must be set"
**Solution:** Add the environment variable in Railway dashboard

### Issue: Still getting connection timeouts
**Solution:** 
- Check Railway build logs for errors
- Ensure your Railway project is using the main branch
- Verify the start command is being used (check Railway settings)

### Issue: Database connection fails
**Solution:**
- Verify your Supabase URL and key are correct
- Check if your Supabase project is active
- Test the connection from your local environment first

## Testing Locally with Production Settings

To test the Railway configuration locally:

```bash
cd embark-backend
PORT=8000 uvicorn main:app --host 0.0.0.0 --port 8000
```

Then visit: `http://localhost:8000/api/health`

## Next Steps After Deploy

Once the backend is working:

1. Update your frontend `VITE_API_URL` to point to Railway
2. Test the `/api/auth/login` endpoint
3. Monitor Railway logs for any errors

## Need Help?

If you're still seeing errors after deploying:
1. Share the Railway build logs
2. Share the Railway runtime logs
3. Verify environment variables are set correctly

