# Frontend Conventions

## File Organization

```
embark-frontend/src/
├── components/
│   ├── common/       # Shared UI components (cards, modals, badges)
│   ├── features/     # Feature-specific components (profile/, etc.)
│   ├── layout/       # Layout shells (TopBar, BottomNav, PageContainer)
│   ├── ui/           # Primitives (Button, Card, Modal, Badge)
│   ├── admin/        # Admin-only components
│   └── settings/     # Settings-specific components
├── contexts/         # React Context providers
├── hooks/            # Custom hooks
├── pages/            # Route-level page components
├── services/         # API clients and service modules
├── styles/           # Design tokens
├── types/            # TypeScript type definitions
└── utils/            # Helpers (calculations, formatting, validation, constants)
```

## Naming

- **Components**: PascalCase (`QuestCard.tsx`, `ItemDetailsModal.tsx`)
- **Hooks**: camelCase with `use` prefix (`useQuests.ts`, `useModal.ts`)
- **Services**: camelCase (`questService.ts`, `itemService.ts`)
- **Utils**: camelCase grouped by concern (`numberUtils.ts`, `textUtils.ts`)
- **Types**: camelCase with `.types.ts` suffix (`quest.types.ts`, `item.types.ts`)
- **Constants**: camelCase files, UPPER_SNAKE for values (`gameConfig.ts`, `routes.ts`)

## Components

- Functional components only (no class components).
- One component per file. File name matches component name.
- Props typed inline or with a `Props` suffix type (`QuestCardProps`).
- Barrel exports via `index.ts` in component directories.

## State Management

- React Context API for global state (Auth, User, Items, Quests, Achievements, CelebrationOverlay).
- Context providers composed in `main.tsx`.
- `localStorage` for persistence (auth email, selected user).
- Custom hooks to encapsulate context consumption and logic.

## Styling

- Tailwind CSS for all styling. No CSS-in-JS.
- Theme config in `tailwind.config.js` (custom colors, fonts, animations).
- Base styles and component layers in `src/index.css`.
- Design tokens in `src/styles/tokens.ts`.
- Dark-themed UI with glassmorphism card patterns.

## Routing

- React Router DOM v7 for client-side routing.
- Route definitions in `App.tsx`.
- Protected routes wrapped with auth check component.

## TypeScript

- Strict mode enabled (`strict: true`, `noUnusedLocals`, `noUnusedParameters`).
- Shared types in `src/types/` with barrel export.
- Type guards in `src/types/guards.ts`.
- Discriminated unions in `src/types/discriminated.ts`.
