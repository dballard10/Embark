# System Architecture

This document outlines the technical architecture of the Embark platform.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
├─────────────────────────────────────────────────────────────┤
│  React Web App (TypeScript + Vite)                          │
│  - Home Base Dashboard                                       │
│  - Quest Browser & Selection                                 │
│  - Vault (Item Collection)                                   │
│  - Character Profile                                         │
│  - [Future] Friends & Social                                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTPS/REST API
                     │
┌────────────────────▼────────────────────────────────────────┐
│                      API GATEWAY LAYER                       │
├─────────────────────────────────────────────────────────────┤
│  FastAPI Backend (Python)                                    │
│  - Authentication Middleware                                 │
│  - Request Validation                                        │
│  - Business Logic                                            │
│  - [Future] Rate Limiting                                    │
└────────┬──────────────────────┬─────────────────────────────┘
         │                      │
         │                      │
┌────────▼──────────┐  ┌────────▼──────────────────────────────┐
│  SUPABASE LAYER   │  │   EXTERNAL SERVICES [Future]          │
├───────────────────┤  ├───────────────────────────────────────┤
│  - PostgreSQL DB  │  │  - OpenAI API (Quest Generation)      │
│  - Auth Service   │  │  - DALL-E (Item Images)               │
│  - Storage        │  │  - Redis (Caching)                    │
│  - Real-time      │  │  - SendGrid (Email)                   │
└───────────────────┘  └───────────────────────────────────────┘
```

---

## 🧩 MVP Architecture

### Frontend Architecture

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Buttons, cards, modals
│   ├── quest/           # Quest-related components
│   ├── character/       # Character display components
│   └── vault/           # Item display components
├── pages/               # Route pages
│   ├── HomePage.tsx     # Home Base dashboard
│   ├── QuestsPage.tsx   # Quest browser
│   ├── VaultPage.tsx    # Item collection
│   └── CharacterPage.tsx
├── services/            # API communication
│   ├── api.ts           # Axios instance & config
│   ├── authService.ts   # Authentication
│   ├── questService.ts  # Quest operations
│   └── userService.ts   # User data operations
├── hooks/               # Custom React hooks
│   ├── useAuth.ts
│   ├── useQuests.ts
│   └── useUser.ts
├── context/             # React context providers
│   ├── AuthContext.tsx
│   └── UserContext.tsx
├── types/               # TypeScript type definitions
│   ├── user.types.ts
│   ├── quest.types.ts
│   └── item.types.ts
├── utils/               # Helper functions
│   ├── dateUtils.ts
│   ├── rarityUtils.ts
│   └── levelCalculator.ts
├── assets/              # Images, icons, fonts
└── App.tsx              # Main app component
```

### Backend Architecture

```
backend/
├── main.py              # FastAPI app entry point
├── config.py            # Configuration & environment
├── dependencies.py      # Dependency injection
├── models/              # Pydantic models
│   ├── user.py
│   ├── quest.py
│   ├── item.py
│   └── response.py
├── routers/             # API route handlers
│   ├── auth.py          # Authentication endpoints
│   ├── users.py         # User management
│   ├── quests.py        # Quest operations
│   ├── items.py         # Item management
│   └── health.py        # Health check
├── services/            # Business logic
│   ├── auth_service.py
│   ├── quest_service.py
│   ├── reward_service.py
│   └── user_service.py
├── database/            # Database operations
│   ├── supabase_client.py
│   └── queries.py
├── utils/               # Helper functions
│   ├── validators.py
│   └── generators.py
└── requirements.txt     # Python dependencies
```

---

## Data Flow Patterns

### 1. User Authentication Flow

```
1. User submits login credentials
   → Frontend validates input
   → POST /api/auth/login

2. Backend validates credentials with Supabase Auth
   → Returns JWT token

3. Frontend stores token (localStorage/sessionStorage)
   → Sets Authorization header for future requests

4. Protected routes check token validity
   → Redirect to login if invalid/expired
```

### 2. Quest Completion Flow

```
1. User clicks "Complete Quest" on active quest
   → Frontend shows confirmation modal

2. User confirms completion
   → POST /api/quests/{quest_id}/complete

3. Backend validates:
   - User authentication
   - Quest belongs to user
   - Quest not already completed

4. Backend transaction:
   - Mark quest as completed (user_completed_challenges)
   - Award points to user (update users.points)
   - Grant item reward (insert into user_items)
   - Update user level if threshold reached

5. Backend returns updated user data + new item

6. Frontend updates UI:
   - Show success animation
   - Display new item
   - Update points/level
   - Clear active quest
```

### 3. Quest Selection Flow

```
1. User navigates to Quests page
   → GET /api/quests/available

2. Backend queries available quests
   - Filter by difficulty
   - Exclude completed quests
   - Return random selection (3 per tier)

3. User selects a quest
   → POST /api/quests/{quest_id}/accept

4. Backend validates and creates user-quest association
   - Check no active quest exists
   - Create record in user_active_quests
   - Set start time and deadline

5. Frontend redirects to Home Base
   - Show active quest
   - Display countdown timer
```

---

## 🚀 Future Architecture Enhancements

### Caching Layer

```
┌──────────────┐
│ React Client │
└──────┬───────┘
       │
┌──────▼────────┐     ┌──────────────┐
│ FastAPI       │────►│ Redis Cache  │
│ Backend       │     │ - Leaderboards│
└──────┬────────┘     │ - Quest Pool │
       │              └──────────────┘
┌──────▼────────┐
│ Supabase DB   │
└───────────────┘
```

### Background Job Processing

```
                    ┌─────────────────┐
                    │  Celery Workers │
                    ├─────────────────┤
                    │ - Daily Quests  │
┌──────────────┐    │ - Emails        │
│ Redis Queue  │◄───┤ - AI Generation │
└──────▲───────┘    │ - Notifications │
       │            └─────────────────┘
┌──────┴────────┐
│ FastAPI       │
│ (Task Queue)  │
└───────────────┘
```

### AI Integration

```
┌──────────────┐
│ User Request │
└──────┬───────┘
       │
┌──────▼────────────┐
│ Quest Generation  │
│ Service           │
└──────┬────────────┘
       │
┌──────▼────────────┐     ┌────────────────┐
│ LangChain         │────►│ OpenAI GPT-4   │
│ Prompt Templates  │     └────────────────┘
└──────┬────────────┘
       │
┌──────▼────────────┐
│ Quest Validation  │
│ & Formatting      │
└──────┬────────────┘
       │
┌──────▼────────────┐
│ Store in DB       │
└───────────────────┘
```

### Real-Time Features

```
┌──────────────┐
│ User A       │────┐
└──────────────┘    │
                    │
┌──────────────┐    │   ┌─────────────────────┐
│ User B       │────┼──►│ Supabase Real-time  │
└──────────────┘    │   │ WebSocket           │
                    │   └─────────────────────┘
┌──────────────┐    │
│ User C       │────┘
└──────────────┘

Use Cases:
- Live friend activity feed
- Group challenge coordination
- Marketplace item listings
- Notifications
```

---

## Security Architecture

### 🧩 MVP Security

```
┌──────────────────────────────────────────────────────────┐
│ CLIENT                                                    │
│ - HTTPS only                                             │
│ - Token stored in httpOnly cookie (preferred) or         │
│   localStorage with XSS protection                       │
└────────────────┬─────────────────────────────────────────┘
                 │
                 │ JWT Token in Authorization Header
                 │
┌────────────────▼─────────────────────────────────────────┐
│ API GATEWAY                                               │
│ - Verify JWT signature                                   │
│ - Check token expiration                                 │
│ - Extract user ID from token                             │
│ - CORS validation                                        │
└────────────────┬─────────────────────────────────────────┘
                 │
┌────────────────▼─────────────────────────────────────────┐
│ BUSINESS LOGIC                                            │
│ - Verify user owns resource                              │
│ - Validate input with Pydantic                           │
│ - Sanitize data                                          │
└────────────────┬─────────────────────────────────────────┘
                 │
┌────────────────▼─────────────────────────────────────────┐
│ DATABASE                                                  │
│ - Row-level security (Supabase)                          │
│ - Parameterized queries                                  │
│ - Encrypted at rest                                      │
└──────────────────────────────────────────────────────────┘
```

### 🚀 Future Security Enhancements

- Rate limiting per user/IP
- API key rotation
- 2FA for user accounts
- WAF (Web Application Firewall)
- DDoS protection
- Regular security audits
- Input sanitization for user-generated content
- Content Security Policy (CSP) headers

---

## Database Architecture

### Entity Relationship Diagram (MVP)

```
┌─────────────────┐
│     users       │
├─────────────────┤
│ id (PK)         │◄─────────┐
│ email           │          │
│ username        │          │
│ location        │          │
│ total_points    │          │
│ level           │          │
│ created_at      │          │
└─────────────────┘          │
                             │
                ┌────────────┴──────────────┐
                │                           │
   ┌────────────▼────────────┐  ┌───────────▼─────────────┐
   │ user_completed_         │  │  user_items             │
   │ challenges              │  ├─────────────────────────┤
   ├─────────────────────────┤  │ id (PK)                 │
   │ id (PK)                 │  │ user_id (FK)            │
   │ user_id (FK)            │  │ item_id (FK)            │
   │ challenge_id (FK)       │  │ acquired_at             │
   │ completed_at            │  │ is_featured             │
   │ points_earned           │  └───────────┬─────────────┘
   └────────────┬────────────┘              │
                │                           │
                │                           │
   ┌────────────▼────────────┐  ┌───────────▼─────────────┐
   │   challenges            │  │  rewards (items)        │
   ├─────────────────────────┤  ├─────────────────────────┤
   │ id (PK)                 │  │ id (PK)                 │
   │ title                   │  │ name                    │
   │ description             │  │ description             │
   │ difficulty              │  │ rarity_tier             │
   │ points_reward           │  │ rarity_stars            │
   │ time_limit_hours        │  │ image_url               │
   │ category                │  │ category                │
   │ is_active               │  └─────────────────────────┘
   └─────────────────────────┘
```

---

## API Architecture

### RESTful API Design Principles

```
Base URL: https://api.lifegamifier.com/v1

Authentication:
  Headers: Authorization: Bearer <JWT_TOKEN>

Response Format:
{
  "success": true,
  "data": {...},
  "message": "Success message",
  "timestamp": "2025-10-08T12:00:00Z"
}

Error Format:
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Detailed error message",
    "details": {...}
  },
  "timestamp": "2025-10-08T12:00:00Z"
}
```

### API Versioning Strategy

- Version in URL path: `/v1/`, `/v2/`
- Maintain backward compatibility
- Deprecation warnings in headers
- Minimum 6-month deprecation notice

---

## Performance Optimization

### 🧩 MVP Optimizations

- Lazy loading for routes
- Image optimization (WebP format)
- Minimize bundle size (code splitting)
- Database indexing on foreign keys
- Efficient SQL queries (no N+1 problems)

### 🚀 Future Optimizations

- Redis caching for frequent queries
- CDN for static assets
- Database query caching
- Pagination for large datasets
- Infinite scroll for item lists
- Service worker for offline capability
- Image CDN with transformations
- Database read replicas
- Horizontal scaling (load balancing)

---

## Monitoring & Observability

### 🚀 Future Implementation

```
┌─────────────────────────────────────────────────────┐
│ Logging                                             │
├─────────────────────────────────────────────────────┤
│ - Structured JSON logs                              │
│ - Log levels (DEBUG, INFO, WARNING, ERROR)          │
│ - Request/response logging                          │
│ - User action tracking                              │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Error Tracking (Sentry)                             │
├─────────────────────────────────────────────────────┤
│ - Automatic error capture                           │
│ - Stack traces                                      │
│ - User context                                      │
│ - Release tracking                                  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Performance Monitoring                              │
├─────────────────────────────────────────────────────┤
│ - API response times                                │
│ - Database query performance                        │
│ - Frontend page load times                          │
│ - Core Web Vitals                                   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Analytics                                           │
├─────────────────────────────────────────────────────┤
│ - User behavior tracking                            │
│ - Feature usage statistics                          │
│ - Conversion funnels                                │
│ - Retention metrics                                 │
└─────────────────────────────────────────────────────┘
```

---

## Deployment Architecture

### 🧩 MVP Deployment

```
┌──────────────────┐
│ GitHub Repo      │
└────────┬─────────┘
         │
         │ Git Push
         │
┌────────▼──────────────────────┐
│ Vercel (Frontend)             │
│ - Automatic deployments       │
│ - Preview deployments for PRs │
│ - Edge network CDN            │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Railway/Render (Backend)      │
│ - Python FastAPI              │
│ - Auto-deploy from main       │
│ - Environment variables       │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Supabase (Database + Auth)    │
│ - Managed PostgreSQL          │
│ - Automatic backups           │
│ - Connection pooling          │
└───────────────────────────────┘
```

### 🚀 Future Production Architecture

```
┌─────────────────────────────────────────────────┐
│ Cloudflare CDN                                  │
│ - Global edge caching                           │
│ - DDoS protection                               │
│ - SSL/TLS termination                           │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│ Load Balancer                                   │
│ - Health checks                                 │
│ - Traffic distribution                          │
└───────┬──────────────────┬──────────────────────┘
        │                  │
┌───────▼────────┐  ┌──────▼──────────┐
│ Backend        │  │ Backend         │
│ Instance 1     │  │ Instance 2      │
└───────┬────────┘  └──────┬──────────┘
        │                  │
        └────────┬─────────┘
                 │
┌────────────────▼─────────────────────────────────┐
│ Database Cluster                                 │
│ - Primary (write)                                │
│ - Replicas (read)                                │
│ - Automatic failover                             │
└──────────────────────────────────────────────────┘
```

---

## Scalability Considerations

### Vertical Scaling (MVP)

- Increase server resources as needed
- Supabase auto-scales within plan limits

### Horizontal Scaling (Future)

- **Stateless backend**: No server-side sessions
- **Database read replicas**: Distribute read load
- **Caching layer**: Reduce database queries
- **CDN**: Distribute static assets globally
- **Microservices**: Split into smaller services if needed
  - Quest service
  - User service
  - Reward service
  - AI service

---

**Last Updated**: October 8, 2025
