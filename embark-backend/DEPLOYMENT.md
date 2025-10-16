# Backend Deployment Guide

This guide will help you deploy the Embark backend API to production.

## Required Environment Variables

Before deploying, you'll need:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `CORS_ORIGINS` - (Optional) Override default CORS origins if needed

## Recommended Platforms

### Option 1: Railway (Recommended - Easiest)

Railway provides a simple deployment experience with a generous free tier.

1. **Sign up at [railway.app](https://railway.app)**

2. **Create a new project:**

   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account if not already connected
   - Select your Embark repository

3. **Configure the service:**

   - Railway should auto-detect Python
   - Set the root directory: `embark-backend`
   - Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Add environment variables:**

   - Go to Variables tab
   - Add `SUPABASE_URL` with your Supabase project URL
   - Add `SUPABASE_ANON_KEY` with your Supabase key

5. **Deploy:**
   - Railway will automatically deploy
   - Get your deployment URL (e.g., `https://embark-backend-production.up.railway.app`)
   - Copy this URL for frontend configuration

### Option 2: Render

Render offers a free tier for web services.

1. **Sign up at [render.com](https://render.com)**

2. **Create a new Web Service:**

   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your Embark repo

3. **Configure the service:**

   - Name: `embark-backend`
   - Root Directory: `embark-backend`
   - Build Command: `pip install -r requirements.txt` (if you have one) or `pip install fastapi uvicorn supabase pydantic pydantic-settings`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Instance Type: Free

4. **Add environment variables:**

   - In the Environment section, add:
     - `SUPABASE_URL`
     - `SUPABASE_ANON_KEY`

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your deployment URL (e.g., `https://embark-backend.onrender.com`)

### Option 3: Fly.io

Fly.io is great for Python apps with global distribution.

1. **Install Fly CLI:**

   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Sign up and authenticate:**

   ```bash
   fly auth signup
   # or if you have an account:
   fly auth login
   ```

3. **Create a Dockerfile in `embark-backend/`:**

   ```dockerfile
   FROM python:3.11-slim

   WORKDIR /app

   COPY . .

   RUN pip install fastapi uvicorn supabase pydantic pydantic-settings

   EXPOSE 8080

   CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
   ```

4. **Initialize Fly app:**

   ```bash
   cd embark-backend
   fly launch
   ```

   - Choose app name (e.g., `embark-backend`)
   - Choose region closest to your users
   - Don't deploy yet

5. **Set environment variables:**

   ```bash
   fly secrets set SUPABASE_URL=your_supabase_url
   fly secrets set SUPABASE_ANON_KEY=your_supabase_key
   ```

6. **Deploy:**

   ```bash
   fly deploy
   ```

7. **Get your URL:**
   ```bash
   fly status
   ```
   - Your app will be at `https://embark-backend.fly.dev`

## After Deployment

### 1. Test Your Backend

Visit your deployment URL and check the health endpoint:

```
https://your-backend-url.com/api/health
```

You should see:

```json
{
  "status": "healthy",
  "database": "connected"
}
```

### 2. Update Frontend Environment Variable

Go to your Vercel dashboard:

1. Navigate to your Embark project
2. Go to Settings → Environment Variables
3. Add a new variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-backend-url.com/api`
   - **Environment:** Production (and Preview if needed)
4. Redeploy your frontend

### 3. Update CORS Settings (if needed)

If you use a custom domain for your frontend, update `embark-backend/config/settings.py`:

```python
CORS_ORIGINS: List[str] = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://embark-theta.vercel.app",
    "https://your-custom-domain.com"  # Add custom domain
]
```

Then redeploy your backend.

## Troubleshooting

### Backend won't start

- Check logs on your platform dashboard
- Verify all environment variables are set correctly
- Ensure SUPABASE_URL and SUPABASE_ANON_KEY are valid

### CORS errors in frontend

- Verify your frontend URL is in CORS_ORIGINS
- Check that the backend is running
- Try adding `http://` and `https://` versions of your domain

### Database connection errors

- Verify SUPABASE_URL is correct
- Verify SUPABASE_ANON_KEY is correct
- Check Supabase dashboard to ensure database is active

### 502/503 errors

- Check if the backend is binding to the correct port
- Most platforms use the `PORT` environment variable
- Ensure your start command uses `--port $PORT`

## Monitoring

Each platform provides logs and monitoring:

- **Railway:** Metrics tab in your service
- **Render:** Logs tab in your service
- **Fly.io:** Run `fly logs` in terminal

## Scaling

All platforms support easy scaling:

- **Railway:** Adjust resources in Settings
- **Render:** Upgrade instance type in Settings
- **Fly.io:** Adjust in fly.toml or dashboard

## Cost Estimates

- **Railway:** Free tier includes $5/month credit (~550 hours)
- **Render:** Free tier includes 750 hours/month
- **Fly.io:** Free tier includes 3 VMs with 256MB RAM

For a small API like Embark, the free tier should be sufficient for development and testing.
