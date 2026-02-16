# Embark - Life Gamifier

## Project
Life gamification web app that turns real-world activities into RPG-style quests. Users complete challenges, earn Glory currency and XP, level up, and collect items with rarity tiers. The app features a 6-tier quest difficulty system, dual progression (Glory + XP), an achievement system, and a shop where users can purchase items with earned Glory.

## Tech Stack
- Framework: React 19, TypeScript 5.9, Vite 7
- Routing: React Router DOM 7
- Styling: Tailwind CSS 3.4
- Icons: Tabler Icons, React Icons
- Dates: date-fns
- Deployment: Vercel (auto-deploy from main)

## Architecture
- **Workspaces** (`workspaces/`): SOPs for workflows. Read before multi-step work.
- **Agents** (`.claude/agents/`): researcher, page-builder, style-reviewer.
- **Commands** (`.claude/commands/`): `/handoff` for end-of-session state save.
- **Docs** (`docs/`): Project documentation. Create if missing at session start.

## Session Continuity
- **Start**: Read `.scratchpad/status.md`.
- **During**: Log decisions in `.scratchpad/decisions.md`.
- **End**: Run `/handoff` to save state.
- **Blockers**: Log in `.scratchpad/blockers.md`.

## Conventions
- Client-side React SPA. No backend or server components.
- Tailwind CSS for all styling. Theme config in `tailwind.config.js`, base styles in `index.css`.
- Never commit `.env` files or API keys.

## Rules
1. Read `.scratchpad/status.md` at the start of every session.
2. Read the relevant workspace before multi-step work.
3. Spawn subagents for focused tasks (research, building, reviewing).
4. Ask before running tools that use paid API calls or credits.
5. When something fails: fix it, verify, update the workspace if needed.
6. Do not create or overwrite workspaces without asking.
7. UX must be dead simple — Mom is the user, not a developer.
