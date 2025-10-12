# Embark - Life Gamification MVP

Transform your real-world activities into epic quests. Complete challenges, earn Glory, level up, and collect legendary items!

## 🎯 Project Status

**Phase 1: COMPLETE ✅**

A beautiful, modern homescreen with:

- User stats dashboard (Glory, XP, Level with progress bar)
- Active quest display with rewards
- FastAPI backend with health check
- Supabase database integration
- Full TypeScript type system

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.12+
- [uv](https://github.com/astral-sh/uv) (Python package manager)
- Supabase account

### 1. Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL scripts in order:
   - `embark-backend/database/schema.sql`
   - `embark-backend/database/seed_data.sql`
3. Get your Project URL and anon key from Project Settings → API

See `embark-backend/DATABASE_SETUP.md` for detailed instructions.

### 2. Configure Environment

Create `embark-backend/.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

Create `embark-frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
```

### 3. Install Dependencies

```bash
# Install root dependencies (first time only)
npm install

# Install frontend dependencies (first time only)
cd embark-frontend && npm install && cd ..
```

### 4. Start Both Servers

**Easy way (recommended):**

```bash
npm run dev
```

This starts both backend and frontend servers concurrently!

- Backend: http://localhost:8000 (test at http://localhost:8000/api/health)
- Frontend: http://localhost:5173

**Manual way (two terminals):**

Terminal 1:

```bash
cd embark-backend
uv run fastapi dev main.py
```

Terminal 2:

```bash
cd embark-frontend
npm run dev
```

## 📁 Project Structure

```
Embark/
├── embark-frontend/        # React + TypeScript + Tailwind
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components (HomePage)
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   └── package.json
│
├── embark-backend/         # FastAPI + Supabase
│   ├── routers/            # API route handlers
│   ├── services/           # Business logic
│   ├── models/             # Pydantic models
│   ├── database/           # DB client and SQL scripts
│   ├── main.py             # FastAPI app
│   └── pyproject.toml      # Dependencies
│
└── project-plan/           # Documentation and specs
```

## 🎮 Features (Phase 1)

### Current Features ✅

- Beautiful glassmorphism UI with gradient effects
- User stats display (Glory, XP, Level)
- XP progress bar with percentage
- Active quest card with tier badges
- Responsive design with smooth animations
- FastAPI backend with CORS
- Supabase database integration
- Health check endpoint

### Coming Soon 🚧

- Quest browsing and acceptance
- Quest completion with rewards
- Vault/inventory system
- Character profile page
- Navigation between pages
- Real-time quest timer

## 🛠️ Tech Stack

**Frontend:**

- React 19
- TypeScript
- Vite
- Tailwind CSS v3
- React Router
- Axios
- date-fns

**Backend:**

- FastAPI
- Python 3.12+
- uv (package manager)
- Ruff (linter)
- Supabase Python SDK

**Database:**

- Supabase (PostgreSQL)
- 5 core tables: users, quests, rewards, user_completed_quests, user_items

## 🧪 Testing

### Build Test

```bash
# Frontend
cd embark-frontend && npm run build

# Backend linting
cd embark-backend && uv run ruff check .
```

### Manual Testing

1. ✅ Backend starts: `cd embark-backend && uv run fastapi dev main.py`
2. ✅ Health check works: http://localhost:8000/api/health
3. ✅ Frontend starts: `cd embark-frontend && npm run dev`
4. ✅ Homescreen displays at http://localhost:5173
5. ✅ User stats show correctly (Level 2, 24k XP, 40% progress)
6. ✅ Styling renders properly (gradients, glass effects, animations)

## 📖 Documentation

- `PHASE_1_COMPLETE.md` - Phase 1 implementation summary
- `embark-backend/DATABASE_SETUP.md` - Database setup guide
- `embark-backend/FRONTEND_SETUP.md` - Frontend setup guide
- `project-plan/embark-mvp-implementation.md` - Full implementation plan

## 🎨 Design Philosophy

**Lovable AI-Inspired:**

- Modern glassmorphism with backdrop blur
- Vibrant gradient backgrounds and text
- Smooth animations (fade-in, slide-up, hover effects)
- Dark theme with bright accent colors
- Clean, minimalist layout

**Gamification Elements:**

- Tier system (Novice → Conqueror) with stars ⭐
- Glory currency 🏆 for achievements
- XP system ⚡ with level progression
- Visual feedback and celebration

## 🐛 Troubleshooting

### Backend Issues

- **Import errors**: Run `cd embark-backend && uv sync`
- **Database connection fails**: Check `.env` credentials and Supabase project status
- **Port already in use**: Kill process on port 8000

### Frontend Issues

- **Styling broken**: Restart dev server with `npm run dev`
- **Build fails**: Ensure Tailwind v3 is installed: `npm ls tailwindcss`
- **Missing dependencies**: Run `npm install`

## 🚀 Next Steps

**Phase 2 Goals:**

1. Build Quest API endpoints (available, accept, complete)
2. Build User API endpoints (profile, stats)
3. Create frontend API service layer
4. Connect homescreen to real data
5. Implement quest acceptance flow
6. Build quest completion with reward celebration

## 📝 License

This is a personal project for learning and portfolio purposes.

## 👤 Author

Built with ❤️ using Cursor AI

---

**Ready to embark on your journey? Level up your life! 🎮✨**
