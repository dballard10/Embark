# Embark - Project Plan Documentation

Welcome to the comprehensive project plan for **Embark**, a gamified activity platform that transforms real-world hobbies and challenges into an engaging RPG-style experience.

---

## 📚 Documentation Structure

This project plan is organized into modular documents, each focusing on a specific aspect of the project:

### 1. **[overview.md](./overview.md)**

High-level project vision, goals, and success metrics.

- Vision statement
- Core concept
- Target platform
- Project phases

### 2. **[core-features.md](./core-features.md)** 🧩

Essential MVP features required for launch.

- User authentication
- Quest system
- Points & rewards
- Item collection
- Character progression
- **Everything marked with 🧩 is MVP-critical**

### 3. **[future-features.md](./future-features.md)** 🚀

Post-MVP enhancements and expansions.

- AI-generated quests
- Social features (friends, groups)
- Shop & marketplace
- Location-based quests
- Premium features
- **Everything marked with 🚀 is for future phases**

### 4. **[architecture.md](./architecture.md)**

Technical architecture and system design.

- High-level architecture diagrams
- Frontend/backend structure
- Data flow patterns
- Security architecture
- Deployment architecture

### 5. **[tech-stack.md](./tech-stack.md)**

Technologies, frameworks, and tools.

- Frontend: React + TypeScript + Vite
- Backend: FastAPI + Python
- Database: Supabase (PostgreSQL)
- Third-party services
- Development tools

### 6. **[data-models.md](./data-models.md)**

Database schema and data structures.

- Complete table definitions
- Type definitions (TypeScript)
- Relationships and constraints
- Sample data
- Validation rules

### 7. **[user-flow.md](./user-flow.md)**

User journeys and interaction patterns.

- Onboarding flow
- Quest selection & completion
- Vault management
- Character profile
- User journey maps

### 8. **[milestones.md](./milestones.md)**

Development timeline and roadmap.

- **Phase 1 (Weeks 1-8)**: MVP Development
- **Phase 2 (Weeks 9-16)**: Enhancement
- **Phase 3 (Weeks 17-24+)**: Scale & Expansion
- Success metrics
- Go/no-go checkpoints

### 9. **[api-endpoints.md](./api-endpoints.md)**

Complete REST API documentation.

- Authentication endpoints
- Quest/challenge endpoints
- User/profile endpoints
- Item/vault endpoints
- Request/response formats

### 10. **[ui-components.md](./ui-components.md)**

Frontend component library and design system.

- Design principles
- Color palette & typography
- Core components
- Animation guidelines
- Accessibility features

### 11. **[tier-system-reference.md](./tier-system-reference.md)** ⭐

Quick reference for quest and item tier system.

- 6-tier quest difficulty table (Novice → Conqueror)
- Glory & XP rewards by tier
- Item rarity colors and tiers
- Level calculation formulas
- UI examples and database field names
- **Future**: Custom tier icon concepts

### 12. **[features/](./features/)** 📦

Detailed specifications for major system components.

- **[quests.md](./features/quests.md)**: Complete quest system spec (categories, mechanics, AI generation)
- **[items.md](./features/items.md)**: Item rewards, equipment slots, vault system
- **[glory-xp.md](./features/glory-xp.md)**: Dual currency system, leveling, prestige
- **[champion-customization.md](./features/champion-customization.md)**: Equipment system, 9 slots, wardrobe

---

## 🎯 Quick Start Guide

### For Developers

1. **Start here**: Read [overview.md](./overview.md) to understand the vision
2. **Technical setup**: Review [tech-stack.md](./tech-stack.md) and [architecture.md](./architecture.md)
3. **MVP scope**: Reference [core-features.md](./core-features.md) for what to build first
4. **System details**: Dive into [features/](./features/) for detailed specs on quests, items, Glory/XP
5. **Quick reference**: Keep [tier-system-reference.md](./tier-system-reference.md) handy for tier values
6. **Data models**: Use [data-models.md](./data-models.md) for database schema
7. **API integration**: Use [api-endpoints.md](./api-endpoints.md) for endpoint specs
8. **UI development**: Consult [ui-components.md](./ui-components.md) for design system
9. **Timeline**: Follow [milestones.md](./milestones.md) for week-by-week tasks

### For Designers

1. **Understand the product**: [overview.md](./overview.md) + [user-flow.md](./user-flow.md)
2. **Design system**: [ui-components.md](./ui-components.md) for colors, typography, components
3. **Tier visuals**: [tier-system-reference.md](./tier-system-reference.md) for colors, stars, and future icon concepts
4. **User flows**: [user-flow.md](./user-flow.md) for all user journeys
5. **Feature details**: [features/](./features/) folder for item designs, equipment slots, etc.
6. **Future vision**: [future-features.md](./future-features.md) for long-term direction

### For Product Managers

1. **Vision & strategy**: [overview.md](./overview.md)
2. **Roadmap**: [milestones.md](./milestones.md)
3. **MVP vs. Future**: [core-features.md](./core-features.md) vs [future-features.md](./future-features.md)
4. **System design**: [features/](./features/) for detailed feature specifications
5. **User experience**: [user-flow.md](./user-flow.md)
6. **Success metrics**: Check each document for KPIs

---

## 🧩 vs 🚀 Symbol Guide

Throughout this documentation, you'll see two emoji indicators:

- **🧩 Core Component (MVP)**: Essential for the initial launch. Must be built in Phase 1 (Weeks 1-8).
- **🚀 Future Implementation**: Post-MVP features for Phase 2+ (Weeks 9+). Important but not blocking launch.

This helps prioritize what to build first and what can wait.

---

## Project Phases at a Glance

### Phase 1: MVP (Weeks 1-8) 🧩

**Goal**: Launch a functional web app with core gamification features.

**Key Features**:

- User authentication & profiles
- Quest browsing, selection, and completion (6 tiers)
- Glory (currency) & XP (leveling) system
- Item rewards with 6 rarity tiers
- Vault (item collection)
- Character page (Level 1-100)

**Success Criteria**: 50+ users, 60%+ quest completion rate

---

### Phase 2: Enhancement (Weeks 9-16) 🚀

**Goal**: Add AI features, social elements, and advanced mechanics.

**Key Features**:

- AI-generated quests (LLM integration)
- Friend system & social feed
- Advanced quest mechanics (multiple active, refreshes)
- Shop & marketplace
- Enhanced notifications

**Success Criteria**: 500+ users, AI adoption > 80%, friends feature > 40%

---

### Phase 3: Scale (Weeks 17-24+) 🚀

**Goal**: Mobile app, premium features, and platform scaling.

**Key Features**:

- iOS native app
- Champion customization (9 equipment slots)
- Custom tier icons & animations
- Premium subscription tier
- Platform optimization (caching, CDN)
- Analytics dashboard
- Advanced AI features

**Success Criteria**: 10,000+ users, sustainable monetization

---

## Technology Summary

| Layer                | Technology                                  |
| -------------------- | ------------------------------------------- |
| **Frontend**         | React 18+ with TypeScript, Vite             |
| **Backend**          | FastAPI (Python 3.11+)                      |
| **Database**         | Supabase (PostgreSQL)                       |
| **Auth**             | Supabase Auth (JWT)                         |
| **Hosting**          | Vercel (frontend), Railway/Render (backend) |
| **AI (Phase 2)**     | OpenAI GPT-4, LangChain                     |
| **Mobile (Phase 3)** | Swift + SwiftUI                             |

See [tech-stack.md](./tech-stack.md) for complete details.

---

## Core User Journey (MVP)

1. **Sign Up** → Create account with email/username
2. **Onboarding** → Brief tutorial explaining mechanics
3. **Browse Quests** → View available quests by 6 tiers (Novice → Conqueror)
4. **Accept Quest** → Choose one quest to complete
5. **Complete in Real World** → User does the activity (e.g., builds Lego set)
6. **Mark Complete** → Self-report completion in app
7. **Receive Rewards** → Get Glory + XP + item matching quest tier
8. **Level Up** → Progress toward next level (Level 1 → 100)
9. **View Vault** → See collected items by rarity
10. **Repeat** → Start new quest

See [user-flow.md](./user-flow.md) for detailed flows.

---

## Data Model Summary

### Core Tables (MVP)

1. **users**: User accounts, Glory, XP, level
2. **quests**: Quest definitions with tier, Glory/XP rewards
3. **user_completed_quests**: Quest completion tracking
4. **rewards**: Collectible item definitions with rarity tiers
5. **user_items**: User's item inventory

### Key Relationships

```
users ←─→ user_completed_quests ←─→ quests
users ←─→ user_items ←─→ rewards
```

See [data-models.md](./data-models.md) for complete schema.

---

## Design Principles

1. **Playful yet Professional**: Gamified without being childish
2. **Clear Hierarchy**: Important information stands out
3. **Responsive**: Mobile-first design approach
4. **Accessible**: WCAG AA compliant
5. **Motivational**: Celebrate progress and encourage continuation

---

## API Overview

**Base URL**: `https://api.lifegamifier.com/v1`

### Key Endpoints (MVP)

- `POST /auth/register` - Register new user
- `POST /auth/login` - Authenticate user
- `GET /quests/available` - Browse available quests
- `POST /quests/:id/accept` - Accept a quest
- `POST /quests/:id/complete` - Complete a quest
- `GET /items/vault` - View item collection
- `GET /users/me` - Get user profile

See [api-endpoints.md](./api-endpoints.md) for complete API documentation.

---

## Development Workflow

### Initial Setup (Week 1)

1. Clone repository
2. Set up development environment
3. Configure Supabase project
4. Install dependencies
5. Run local development servers

### Weekly Cycle

1. Review milestone goals (see [milestones.md](./milestones.md))
2. Implement features from [core-features.md](./core-features.md)
3. Test functionality
4. Document any changes
5. Deploy to staging
6. Review progress with team

### Testing Strategy

- Unit tests for business logic
- Component tests for React components
- Integration tests for API endpoints
- E2E tests for critical user flows
- Manual testing before each release

---

## Success Metrics

### User Engagement

- Daily Active Users (DAU)
- Quest completion rate
- Average session duration
- Return rate (Day 7, Day 30)

### Product Metrics

- Item collection growth
- Level progression distribution
- Quest difficulty preference
- Feature adoption rates

### Technical Metrics

- API response times
- Error rates
- Page load times
- Core Web Vitals

---

## Contribution Guidelines

### Making Changes to This Plan

1. **Update relevant documents**: Don't just change one file; ensure consistency
2. **Mark changes**: Add date and reason for significant changes
3. **Maintain structure**: Keep the hierarchical organization
4. **Update this README**: If you add/remove documents

### Document Maintenance

- Review and update quarterly
- Version control all changes
- Archive old versions if major pivots occur
- Keep "Last Updated" dates current

---

## Frequently Asked Questions

### Why separate MVP from future features?

To maintain focus and ship quickly. Phase 1 is about validating the core concept, not building everything at once.

### Can we add features not in this plan?

Yes, but evaluate against these criteria:

1. Does it serve the core value proposition?
2. Is it blocking user value?
3. What's the implementation cost?
4. Does it fit the current phase?

### How do we decide what's MVP vs future?

**MVP criteria**: Is it absolutely necessary to demonstrate the core value? Can users get value without it?

### What if technology choices change?

Update [tech-stack.md](./tech-stack.md) with the decision log. Document why the change was made.

### How do we handle scope creep?

Refer back to this plan. If something isn't in Phase 1 docs, it waits until Phase 2+.

---

## Resources & Links

### Project Management

- GitHub Repository: [Link TBD]
- Project Board: [Link TBD]
- Design Files (Figma): [Link TBD]

### Development

- Staging Environment: [Link TBD]
- Production App: [Link TBD]
- API Documentation: [Link TBD]

### Team Communication

- Slack/Discord: [Link TBD]
- Weekly Standup: [Schedule TBD]

---

## 📍 Where to Find Information

| I need to know...            | Look in...                                                                 |
| ---------------------------- | -------------------------------------------------------------------------- |
| Glory/XP rewards by tier     | [tier-system-reference.md](./tier-system-reference.md) (tables)            |
| How the quest system works   | [features/quests.md](./features/quests.md)                                 |
| Item rarity colors           | [tier-system-reference.md](./tier-system-reference.md)                     |
| What items exist             | [features/items.md](./features/items.md)                                   |
| Level calculation formula    | [tier-system-reference.md](./tier-system-reference.md)                     |
| How Glory/XP works           | [features/glory-xp.md](./features/glory-xp.md)                             |
| Equipment slots for Champion | [features/champion-customization.md](./features/champion-customization.md) |
| Database schema              | [data-models.md](./data-models.md)                                         |
| API endpoints                | [api-endpoints.md](./api-endpoints.md)                                     |
| Design system & colors       | [ui-components.md](./ui-components.md)                                     |
| MVP features                 | [core-features.md](./core-features.md)                                     |
| Future features roadmap      | [future-features.md](./future-features.md)                                 |
| Development timeline         | [milestones.md](./milestones.md)                                           |

---

## Version History

| Version | Date        | Changes                                             |
| ------- | ----------- | --------------------------------------------------- |
| 1.1.0   | Oct 8, 2025 | Added tier-system-reference.md and features/ folder |
| 1.0.0   | Oct 8, 2025 | Initial comprehensive project plan created          |

---

## Contact & Maintainers

**Project Lead**: [Name TBD]  
**Technical Lead**: [Name TBD]  
**Design Lead**: [Name TBD]

---

## Next Steps

### Immediate Actions (This Week)

1. Review and approve this project plan
2. Set up development environment
3. Initialize Git repository
4. Create Supabase project
5. Begin Week 1 tasks from [milestones.md](./milestones.md)

### Short-term (This Month)

1. Complete Phase 1, Weeks 1-4 (Foundation + Quest System)
2. Conduct first user testing session
3. Iterate based on feedback
4. Prepare for MVP launch sprint

### Long-term (This Quarter)

1. Launch MVP (End of Week 8)
2. Gather user feedback
3. Begin Phase 2 planning (AI integration)
4. Build user community

---

**Let's build something amazing! 🚀**

---

_Last Updated: October 8, 2025_
