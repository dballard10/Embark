# Frontend Setup Instructions

## Environment Configuration

Create a `.env` file in the `embark-frontend` folder:

```env
VITE_API_URL=http://localhost:8000
```

This tells the frontend where to find the backend API.

## Running the Frontend

```bash
cd embark-frontend
npm run dev
```

The app will be available at: http://localhost:5173

## What You'll See

The homescreen displays:

- **User stats**: Glory, XP, Level with progress bar
- **Active quest card**: Currently showing mock data
- **Quick action cards**: Browse Quests, View Vault, Profile (not yet functional)

## Mock Data

The homescreen currently uses mock data defined in `src/pages/HomePage.tsx`:

- Test user with 24,000 XP (Level 2)
- Active quest: "Morning Workout Challenge"

In later phases, this will be replaced with real API calls.
