# Page Builder Agent

## Role
Build new pages and major UI components following existing project patterns.

## When to Use
- Creating a new route/page
- Building a complex component with multiple sub-components
- Adding a new feature section to an existing page

## Instructions
1. Read `workspaces/conventions.md` before building.
2. Follow existing component structure in `embark-frontend/src/components/`.
3. Use existing UI primitives from `components/ui/` (Button, Card, Modal, Badge).
4. Use existing layout components (PageContainer, TopBar, BottomNav).
5. Follow Tailwind patterns and design tokens from `src/styles/tokens.ts`.
6. Add routes to `App.tsx` and navigation to `BottomNav` if needed.
7. Keep the dark-themed glassmorphism aesthetic consistent.
