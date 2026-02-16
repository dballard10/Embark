# Technology Stack

This document outlines the technologies, frameworks, and tools used in the Embark project.

---

## Frontend Stack

### 🧩 Core (MVP)

- **Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**:
  - CSS Modules or Styled Components (TBD)
  - Consider: Tailwind CSS for rapid development
- **State Management**:
  - React Context API (MVP)
  - Consider: Zustand for larger state needs
- **Routing**: React Router v6
- **HTTP Client**: Axios or Fetch API
- **Form Handling**: React Hook Form
- **Date/Time**: date-fns or Day.js

### 🚀 Future Additions

- **Animations**: Framer Motion
- **Charts/Visualizations**: Recharts or Victory
- **UI Component Library**: Consider Radix UI or Headless UI
- **Progressive Web App**: Service workers, manifest
- **Image Handling**: React Image Gallery, lazy loading

---

## Backend Stack

### 🧩 Core (MVP)

- **Framework**: FastAPI (Python)
- **Language**: Python 3.11+
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **ORM/Database Client**:
  - Supabase Python Client
  - SQLAlchemy (if needed for complex queries)
- **Environment Variables**: python-dotenv
- **API Documentation**: FastAPI built-in (Swagger/OpenAPI)
- **CORS**: FastAPI CORS middleware
- **Validation**: Pydantic models

### 🚀 Future Additions

- **AI/ML**:
  - OpenAI API (GPT-4 for quest generation)
  - LangChain for prompt management
  - Vector database for semantic search (Pinecone/Weaviate)
- **Background Tasks**: Celery + Redis
- **Caching**: Redis
- **File Storage**: Supabase Storage or AWS S3
- **Email Service**: SendGrid or AWS SES
- **Push Notifications**: Firebase Cloud Messaging
- **WebSockets**: FastAPI WebSocket support
- **Rate Limiting**: SlowAPI

---

## Database & Storage

### 🧩 Core (MVP)

- **Primary Database**: Supabase PostgreSQL
  - User authentication
  - Relational data (users, quests, items)
  - Row-level security
  - Real-time subscriptions
- **Schema Management**: Supabase migrations or Alembic

### 🚀 Future Additions

- **Caching Layer**: Redis for session storage, leaderboards
- **Search Engine**: ElasticSearch or Algolia for advanced search
- **Analytics DB**: Separate analytics data warehouse
- **CDN**: Cloudflare or AWS CloudFront for static assets

---

## DevOps & Infrastructure

### 🧩 Core (MVP)

- **Version Control**: Git + GitHub
- **Frontend Hosting**:
  - Vercel (recommended for React + Vite)
  - Alternative: Netlify
- **Backend Hosting**:
  - Railway or Render (easy Python deployment)
  - Alternative: Fly.io, AWS Elastic Beanstalk
- **Database Hosting**: Supabase (managed PostgreSQL)
- **Environment Management**: .env files (never committed)

### 🚀 Future Additions

- **CI/CD**: GitHub Actions
  - Automated testing
  - Deployment pipelines
  - Code quality checks
- **Monitoring**:
  - Sentry (error tracking)
  - LogRocket (session replay)
- **Performance**:
  - Lighthouse CI
  - Web Vitals monitoring
- **Container Orchestration**: Docker + Kubernetes (if scaling needed)
- **Load Balancing**: AWS ELB or Nginx

---

## Development Tools

### 🧩 Core (MVP)

- **Code Editor**: VS Code (recommended)
- **Package Managers**:
  - npm or pnpm (frontend)
  - pip + venv (backend)
- **Code Formatting**:
  - Prettier (frontend)
  - Black (backend Python)
- **Linting**:
  - ESLint (frontend)
  - Pylint or Flake8 (backend)
- **API Testing**: Postman or Insomnia
- **Database GUI**: Supabase dashboard or DBeaver

### 🚀 Future Additions

- **Testing Frameworks**:
  - Vitest (unit tests for React)
  - React Testing Library (component tests)
  - Playwright or Cypress (E2E tests)
  - pytest (backend tests)
- **Documentation**: Storybook for component library
- **Design Tools**: Figma for UI/UX mockups
- **Performance Profiling**: React DevTools, Chrome DevTools

---

## Mobile (iOS) - Phase 3

### 🚀 Future Implementation

- **Language**: Swift
- **Framework**: SwiftUI
- **State Management**: Combine or SwiftUI State
- **Networking**: URLSession or Alamofire
- **Local Storage**: Core Data or Realm
- **Push Notifications**: APNs (Apple Push Notification service)
- **Analytics**: Firebase Analytics
- **Crash Reporting**: Crashlytics

---

## Third-Party Services

### 🧩 Core (MVP)

- **Authentication**: Supabase Auth
- **Database**: Supabase
- **Image Generation**:
  - DALL-E API (AI-generated item images)
  - Alternative: Stable Diffusion API

### 🚀 Future Additions

- **AI/LLM**: OpenAI API (GPT-4, GPT-4 Turbo)
- **Email**: SendGrid, AWS SES, or Resend
- **SMS**: Twilio (for notifications)
- **Payment Processing**: Stripe (for premium features)
- **Analytics**: Google Analytics or Mixpanel
- **Maps**: Google Maps API or Mapbox (location features)
- **CDN**: Cloudflare
- **Error Tracking**: Sentry
- **A/B Testing**: PostHog or Optimizely

---

## AI & Machine Learning

### 🚀 Future Implementation

- **LLM Provider**: OpenAI API
  - Model: GPT-4 or GPT-4 Turbo
  - Use cases: Quest generation, personalization
- **Prompt Management**: LangChain
- **Vector Database**: Pinecone or Weaviate
  - Store quest embeddings for similarity search
  - Personalization engine
- **Image Recognition**: OpenAI Vision API
  - Quest completion verification
- **Content Moderation**: OpenAI Moderation API

---

## Security Considerations

### 🧩 Core (MVP)

- **Authentication**: Supabase Auth (JWT tokens)
- **HTTPS**: Enforced on all endpoints
- **CORS**: Properly configured
- **Input Validation**: Pydantic models (backend)
- **SQL Injection Protection**: Parameterized queries via Supabase
- **Environment Variables**: Never commit secrets

### 🚀 Future Additions

- **Rate Limiting**: Prevent API abuse
- **WAF**: Web Application Firewall (Cloudflare)
- **DDoS Protection**: Cloudflare
- **Penetration Testing**: Regular security audits
- **GDPR Compliance**: Data privacy measures
- **2FA**: Two-factor authentication option

---

## Development Environment Setup

### Frontend

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn main:app --reload

# Run with auto-reload
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## Recommended VS Code Extensions

### Frontend

- ESLint
- Prettier
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Path Intellisense
- Tailwind CSS IntelliSense (if using Tailwind)

### Backend

- Python
- Pylance
- Python Docstring Generator
- autoDocstring
- Better Comments

### General

- GitLens
- Error Lens
- DotENV
- REST Client (for API testing)

---

## Alternative Technology Considerations

### If Different Requirements Emerge

**Alternative Frontend Frameworks**:

- **Next.js**: If SEO is critical, or need SSR
- **SvelteKit**: Lighter weight, simpler state management
- **Vue 3**: If team prefers Vue ecosystem

**Alternative Backend Frameworks**:

- **Node.js + Express**: JavaScript full-stack
- **Django**: If need more batteries-included Python framework
- **NestJS**: TypeScript backend for full TS stack

**Alternative Databases**:

- **Firebase**: If want all-in-one solution
- **MongoDB**: If document-based data model is preferred
- **PlanetScale**: Serverless MySQL

**Alternative State Management**:

- **Redux Toolkit**: For complex global state
- **Recoil**: Facebook's state management
- **Jotai**: Atomic state management
- **Zustand**: Minimal, lightweight option

---

## Technology Decision Log

| Date     | Decision           | Rationale                                        |
| -------- | ------------------ | ------------------------------------------------ |
| Oct 2025 | React + TypeScript | Modern, type-safe, great ecosystem               |
| Oct 2025 | FastAPI backend    | Fast, async, excellent docs, Python AI libraries |
| Oct 2025 | Supabase           | PostgreSQL with auth, real-time, easy setup      |
| Oct 2025 | Vite build tool    | Faster than CRA, better DX                       |

---

**Last Updated**: October 8, 2025
