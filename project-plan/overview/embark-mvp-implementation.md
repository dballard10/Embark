<!-- ba13055d-eec7-4746-ab11-18fa04507bb0 bb509e18-af9c-4aa2-b7d4-b85f3078106a -->
# Life Gamifier MVP Implementation Plan

## Project Overview

Build a real-world quest gamification system where users complete activities to earn Glory (currency), XP (experience), and collectible items. Implementation follows a phased approach starting with project setup and core features, deferring authentication and advanced features to later phases.

## Phase 1: Project Foundation (Weeks 1-2)

### 1.1 Project Scaffolding

**Frontend Setup:**

- Initialize React + TypeScript + Vite project
- Configure Tailwind CSS for styling
- Set up folder structure: `src/components/`, `src/pages/`, `src/services/`, `src/types/`, `src/utils/`
- Install key dependencies: `react-router-dom`, `axios`, `date-fns`
- Configure environment variables for API endpoints

**Backend Setup:**

- Initialize FastAPI Python project
- Create `backend/` structure: `routers/`, `services/`, `models/`, `database/`
- Install dependencies: `fastapi`, `uvicorn`, `supabase`, `pydantic`, `python-dotenv`
- Configure CORS for local development
- Set up Supabase client connection

**Database Setup:**

- Create Supabase project
- Implement database schema (5 core tables):
  - `users` (id, username, total_glory, total_xp, level)
  - `quests` (id, title, description, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id)
  - `user_completed_quests` (id, user_id, quest_id, started_at, completed_at, deadline_at, is_active)
  - `rewards` (id, name, description, rarity_tier, rarity_stars, image_url)
  - `user_items` (id, user_id, item_id, acquired_at, is_featured)
- Create minimal seed data:
  - 1 test user
  - 12 quests (2 per tier: Novice through Conqueror)
  - 12 items (matching quest rewards)

### 1.2 Core TypeScript Types & Utilities

**Type Definitions** (`src/types/`):

```typescript
// user.types.ts, quest.types.ts, item.types.ts
- QuestTier (1-6), QuestTierName, RarityTier
- User, Quest, UserCompletedQuest, Reward, UserItem interfaces
```

**Utility Functions** (`src/utils/`):

```typescript
// levelCalculator.ts
- calculateLevel(totalXP): number
- xpToNextLevel(totalXP): number
- getLevelProgress(totalXP): number

// tierUtils.ts
- getTierColor(tier): string
- getTierName(tier): string
- getTierStars(tier): string

// dateUtils.ts
- formatTimeRemaining(deadline): string
- isQuestExpired(deadline): boolean
```

## Phase 2: Core Backend API (Weeks 2-3)

### 2.1 FastAPI Endpoints

**Quest Routes** (`/api/quests/`):

- `GET /available` - Get quests grouped by tier
- `GET /active` - Get user's active quest
- `POST /{quest_id}/accept` - Accept a quest
- `POST /{quest_id}/complete` - Complete active quest, award rewards

**User Routes** (`/api/users/`):

- `GET /{user_id}` - Get user profile with stats
- `GET /{user_id}/stats` - Get computed stats (level progress, total items, etc.)

**Item Routes** (`/api/items/`):

- `GET /vault/{user_id}` - Get user's item collection
- `PUT /vault/{item_id}/featured` - Toggle featured status

**Health Check** (`/api/health/`):

- `GET /` - API health status

### 2.2 Business Logic Services

**Quest Service** (`services/quest_service.py`):

- Validate only one active quest per user
- Calculate deadline from time_limit_hours
- Award Glory + XP + Item on completion
- Update user's total_glory, total_xp, level

**Reward Service** (`services/reward_service.py`):

- Grant item to user inventory
- Handle featured item logic (max 5 per user)

**User Service** (`services/user_service.py`):

- Calculate level from XP: `floor(total_xp / 10000)`
- Calculate XP to next level
- Compute completion statistics

## Phase 3: Frontend Core Components (Weeks 3-4)

### 3.1 Reusable UI Components (`src/components/common/`)

**TierBadge Component:**

- Display tier stars (⭐ × tier or 🔥⭐ for Conqueror)
- Color-coded background

**StatDisplay Component:**

- Show Glory (🏆), XP (⚡), Level with icons
- Reusable across pages

**ProgressBar Component:**

- Visual XP progress to next level
- Percentage display

**ItemCard Component:**

- Item image with rarity border color
- Rarity stars, item name
- Featured toggle button
- Flame animation for Godly items

**QuestCard Component:**

- Quest title, description
- Tier badge, time estimate
- Glory/XP rewards display
- "Accept Quest" or "View Details" button

### 3.2 Quest Components (`src/components/quest/`)

**QuestList Component:**

- Group quests by tier (Novice → Conqueror)
- Collapsible tier sections
- Filter by category (future)

**ActiveQuestDisplay Component:**

- Show current quest details
- Countdown timer
- "Complete Quest" button
- Progress indicators

**QuestCompletionModal Component:**

- Confirmation dialog
- Display rewards preview
- Celebration animation on success

### 3.3 Vault Components (`src/components/vault/`)

**VaultGrid Component:**

- Grid layout of ItemCard components
- Sort by: Newest, Rarity, Name
- Filter by rarity tier

**ItemDetailModal Component:**

- Full item details (description, lore)
- Acquisition date
- Featured toggle
- Full-size image

## Phase 4: Main Pages (Weeks 4-5)

### 4.1 Home Base Dashboard (`src/pages/HomePage.tsx`)

**Layout:**

```
┌────────────────────────────────────────┐
│ LIFE GAMIFIER                    Stats │
│                                        │
│ Active Quest (if any):                │
│ ┌────────────────────────────────────┐ │
│ │ [Quest Card with Timer]            │ │
│ │ [Complete Quest Button]            │ │
│ └────────────────────────────────────┘ │
│                                        │
│ Your Progress:                         │
│ Level 3 Adventurer                     │
│ ━━━━━━░░░░ 60% to Level 4              │
│ 🏆 Glory: 25,000                       │
│ ⚡ XP: 24,000 / 40,000                 │
│ 📦 Items: 8                            │
│                                        │
│ [Browse Quests] [View Vault]          │
└────────────────────────────────────────┘
```

**Features:**

- Display active quest with countdown timer
- Quick stats overview (Glory, XP, Level, Items)
- XP progress bar to next level
- Navigation to other pages
- Call-to-action if no active quest

### 4.2 Quest Browser (`src/pages/QuestsPage.tsx`)

**Layout:**

```
┌────────────────────────────────────────┐
│ AVAILABLE QUESTS                       │
│                                        │
│ ▼ Novice (⭐)                          │
│   ┌───────┐ ┌───────┐                 │
│   │Quest 1│ │Quest 2│                 │
│   └───────┘ └───────┘                 │
│                                        │
│ ▼ Adventurer (⭐⭐)                    │
│   ┌───────┐ ┌───────┐                 │
│   │Quest 3│ │Quest 4│                 │
│   └───────┘ └───────┘                 │
│                                        │
│ ... (Warrior, Champion, Master,       │
│      Conqueror)                        │
└────────────────────────────────────────┘
```

**Features:**

- Quests grouped and sorted by tier
- Expandable/collapsible tier sections
- Quest cards show: title, description preview, rewards
- "Accept Quest" button (disabled if active quest exists)
- Quest detail modal on click

### 4.3 Vault/Inventory (`src/pages/VaultPage.tsx`)

**Layout:**

```
┌────────────────────────────────────────┐
│ YOUR VAULT                    Total: 8 │
│                                        │
│ Sort: [Rarity ▼] Filter: [All ▼]      │
│                                        │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐          │
│ │Item│ │Item│ │Item│ │Item│          │
│ │ 1  │ │ 2  │ │ 3  │ │ 4  │          │
│ └────┘ └────┘ └────┘ └────┘          │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐          │
│ │Item│ │Item│ │Item│ │Item│          │
│ │ 5  │ │ 6  │ │ 7  │ │ 8  │          │
│ └────┘ └────┘ └────┘ └────┘          │
│                                        │
│ Featured Items: [5 showcase slots]    │
└────────────────────────────────────────┘
```

**Features:**

- Grid display of all collected items
- Color-coded by rarity
- Sort options: Newest, Rarity, Name
- Filter by rarity tier
- Featured items showcase section
- Click item for full details modal

### 4.4 Character Profile (`src/pages/CharacterPage.tsx`)

**Layout:**

```
┌────────────────────────────────────────┐
│ [Username]                             │
│ Level 5 Warrior                        │
│                                        │
│ ━━━━━━━░░░ 70% to Level 6              │
│                                        │
│ 🏆 Glory: 45,000 (spendable)           │
│ ⚡ Total XP: 54,000                     │
│ 📦 Items Collected: 12                 │
│ ✅ Quests Completed: 15                │
│                                        │
│ Featured Items:                        │
│ ┌────┐ ┌────┐ ┌────┐                  │
│ │ 1  │ │ 2  │ │ 3  │                  │
│ └────┘ └────┘ └────┘                  │
│                                        │
│ Member Since: Oct 8, 2025              │
└────────────────────────────────────────┘
```

**Features:**

- User stats summary
- Current level with title (Novice/Adventurer/etc.)
- XP progress bar with percentage
- Total Glory (emphasize it's spendable)
- Total items and quests completed
- Featured items showcase (3-5 slots)
- Simple avatar placeholder

### 4.5 Navigation Component

**Simple Tab/Menu Bar:**

- Home Base (🏠)
- Quests (🗺️)
- Vault (📦)
- Character (👤)

Mobile-responsive, always visible.

## Phase 5: Integration & Core Gameplay Loop (Week 5-6)

### 5.1 API Service Layer (`src/services/`)

**questService.ts:**

```typescript
- getAvailableQuests(): Promise<QuestListDTO>
- getActiveQuest(userId): Promise<UserCompletedQuest | null>
- acceptQuest(questId, userId): Promise<UserCompletedQuest>
- completeQuest(questId, userId): Promise<QuestCompletionDTO>
```

**userService.ts:**

```typescript
- getUserProfile(userId): Promise<UserProfileDTO>
- getUserStats(userId): Promise<UserStats>
```

**itemService.ts:**

```typescript
- getUserVault(userId): Promise<VaultItem[]>
- toggleFeaturedItem(itemId, userId): Promise<void>
```

### 5.2 React Context for Global State

**UserContext:**

- Current user data (hardcoded userId for MVP without auth)
- Global Glory, XP, Level
- Refresh methods after quest completion

**QuestContext:**

- Active quest state
- Refresh active quest status

### 5.3 Complete Quest Flow Implementation

1. User navigates to Quests page
2. Views available quests grouped by tier
3. Clicks "Accept Quest" on desired quest
4. System creates `user_completed_quests` record with deadline
5. Redirects to Home Base showing active quest with timer
6. When ready, user clicks "Complete Quest"
7. Confirmation modal appears
8. On confirm, backend:

   - Validates quest ownership and active status
   - Awards Glory + XP to user
   - Recalculates level if threshold crossed
   - Grants item reward to vault
   - Marks quest as completed

9. Frontend shows celebration screen:

   - Animated count-up for Glory/XP
   - Item reveal with rarity glow
   - Level up notification if applicable

10. User returns to Home Base (no active quest)

## Phase 6: Polish & Testing (Week 6-7)

### 6.1 Visual Polish

- Implement tier color scheme across all components
- Add hover/active states to buttons and cards
- Implement smooth transitions and animations
- Responsive design for mobile, tablet, desktop
- Loading states for API calls
- Error boundaries and error handling

### 6.2 Data Validation

**Frontend:**

- Quest acceptance validation (no duplicate active)
- Form validation for any user inputs
- Display meaningful error messages

**Backend:**

- Pydantic models for request/response validation
- Business rule enforcement (one active quest, positive rewards, etc.)
- Database constraint validation

### 6.3 Testing & Bug Fixes

- Manual testing of complete user journey
- Test edge cases (expired quests, concurrent requests)
- Cross-browser testing
- Performance optimization (lazy loading, code splitting)

### 6.4 Deployment Setup

**Frontend (Vercel):**

- Connect GitHub repository
- Configure environment variables
- Set up automatic deployments

**Backend (Railway/Render):**

- Deploy FastAPI application
- Configure environment variables
- Set up database connection

**Database (Supabase):**

- Production database setup
- Enable connection pooling
- Configure RLS policies (prepare for auth phase)

## Phase 7: Extended Seed Data (Week 7-8)

### 7.1 Expand Quest Library

Create comprehensive quest templates:

- **Novice (Tier 1)**: 30 quests across all categories
- **Adventurer (Tier 2)**: 25 quests
- **Warrior (Tier 3)**: 20 quests
- **Champion (Tier 4)**: 15 quests
- **Master (Tier 5)**: 10 quests
- **Conqueror (Tier 6)**: 5 quests

Categories: Fitness, Learning, Creativity, Building, Social, Adventure, Professional, Hobbies, Home, Personal Growth

### 7.2 Expand Item Library

Create matching item rewards:

- Each quest tier has corresponding item rarity
- Equipment slots: Head, Chest, Legs, Feet, Right Hand, Left Hand, Back, Pet, Aura
- Themed names matching tier (Common → Godly)
- Placeholder images or AI-generated images

### 7.3 Database Migration Script

Create SQL script to populate production database with full quest and item catalog.

## Future Phases (Post-MVP)

**Phase 8: Authentication System**

- Supabase Auth integration
- Login/Signup flows
- Protected routes
- User registration

**Phase 9: Champion Customization**

- Equipment slots (9 total)
- Item equipping system
- Character display page
- Loadout presets

**Phase 10: Social Features**

- Friends system
- Leaderboards
- Activity feed
- Quest sharing

**Phase 11: Economy & Shop**

- Glory spending system
- Shop for purchasing items
- Item trading/marketplace

**Phase 12: Advanced Features**

- AI quest generation (OpenAI API)
- Multiple active quests
- Quest chains and achievements
- Daily/weekly challenges
- Mobile app (iOS/Android)

## Key Implementation Notes

### Database Considerations

- Use UUIDs for all primary keys
- Index foreign keys and frequently queried fields
- Implement database migrations properly
- Keep seed data separate from schema

### API Design

- RESTful principles with clear resource naming
- Consistent response format (success/data/message)
- Proper HTTP status codes
- Error handling with meaningful messages

### State Management

- React Context for global state (user, active quest)
- Local component state for UI-only data
- Consider Zustand if state complexity grows

### Performance

- Lazy load routes with React.lazy()
- Optimize images (WebP format, appropriate sizes)
- Implement pagination for large lists (future)
- Use database indexes effectively

### Code Quality

- TypeScript strict mode enabled
- ESLint + Prettier for code formatting
- Consistent naming conventions
- Component documentation

### Development Workflow

- Feature branches for major features
- Test locally before deployment
- Environment-specific configurations
- Version control best practices

## Success Criteria

✅ User can view available quests grouped by tier

✅ User can accept a quest (one at a time)

✅ Active quest displays with countdown timer

✅ User can complete quest and receive rewards

✅ Glory and XP are awarded correctly

✅ Level calculation is accurate (floor(XP / 10000))

✅ Item is added to vault

✅ Vault displays all collected items with sorting/filtering

✅ Character page shows accurate stats and level progress

✅ UI is responsive and visually appealing

✅ App deployed and accessible online

### To-dos

- [ ] Initialize React + TypeScript + Vite project with folder structure, dependencies, and Tailwind CSS
- [ ] Initialize FastAPI backend with folder structure, Supabase client, and CORS configuration
- [ ] Create Supabase project, implement database schema (5 tables), and add minimal seed data
- [ ] Create TypeScript types and utility functions (level calculator, tier utils, date utils)
- [ ] Implement Quest API endpoints (available, active, accept, complete) with business logic
- [ ] Implement User API endpoints (profile, stats) with level calculation logic
- [ ] Implement Item API endpoints (vault, featured toggle)
- [ ] Create reusable UI components (TierBadge, StatDisplay, ProgressBar, ItemCard, QuestCard)
- [ ] Build quest-specific components (QuestList, ActiveQuestDisplay, CompletionModal)
- [ ] Build vault components (VaultGrid, ItemDetailModal)
- [ ] Create Home Base dashboard with active quest display and stats overview
- [ ] Create Quest Browser page with tier grouping and quest acceptance
- [ ] Create Vault page with item grid, sorting, filtering, and featured items
- [ ] Create Character Profile page with stats, level progress, and featured items
- [ ] Implement navigation component and routing between pages
- [ ] Create frontend API service layer (questService, userService, itemService)
- [ ] Implement React Context for global state (UserContext, QuestContext)
- [ ] Connect full quest flow: browse → accept → display active → complete → rewards
- [ ] Add animations, transitions, loading states, responsive design, and tier color schemes
- [ ] Implement frontend/backend validation, error handling, and user feedback
- [ ] Manual testing of user journey, edge cases, and cross-browser compatibility
- [ ] Deploy frontend (Vercel), backend (Railway/Render), and configure production database
- [ ] Create comprehensive quest library (100+ quests) and item library across all tiers