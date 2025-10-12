# UI Components & Design System

This document outlines the frontend component architecture and design system.

---

## Design Principles

1. **Playful yet Professional**: Gamified but not childish
2. **Clear Hierarchy**: Important information stands out
3. **Responsive**: Mobile-first design
4. **Accessible**: WCAG AA compliant
5. **Performance**: Fast loading, smooth animations
6. **Motivational**: Encourage user progression

---

## Color Palette

### Primary Colors

```css
--primary-dark: #1e3a8a; /* Deep blue */
--primary: #3b82f6; /* Bright blue */
--primary-light: #93c5fd; /* Light blue */
```

### Secondary Colors

```css
--secondary: #8b5cf6; /* Purple */
--accent: #f59e0b; /* Gold/Orange */
--success: #10b981; /* Green */
--warning: #f59e0b; /* Orange */
--error: #ef4444; /* Red */
```

### Rarity Colors (Quest & Item Tiers)

```css
--rarity-common: #ffffff; /* White (1⭐ Novice/Common) */
--rarity-uncommon: #4caf50; /* Green (2⭐ Adventurer/Uncommon) */
--rarity-rare: #2196f3; /* Blue (3⭐ Warrior/Rare) */
--rarity-epic: #9c27b0; /* Purple (4⭐ Champion/Epic) */
--rarity-legendary: #ff9800; /* Gold (5⭐ Master/Legendary) */
--rarity-godly: #f44336; /* Red + flame animation (6🔥⭐ Conqueror/Godly) */
```

### Neutral Colors

```css
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
```

### Background & Text

```css
--bg-primary: #ffffff;
--bg-secondary: #f9fafb;
--bg-dark: #111827;
--text-primary: #111827;
--text-secondary: #6b7280;
--text-inverse: #ffffff;
```

---

## Typography

### Font Stack

```css
--font-primary: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-display: "Poppins", sans-serif; /* For headings */
--font-mono: "Fira Code", "Consolas", monospace;
```

### Type Scale

```css
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */
```

### Font Weights

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## Spacing System

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
```

---

## Border Radius

```css
--radius-sm: 0.25rem; /* 4px */
--radius-md: 0.5rem; /* 8px */
--radius-lg: 0.75rem; /* 12px */
--radius-xl: 1rem; /* 16px */
--radius-full: 9999px; /* Circle */
```

---

## Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-glow: 0 0 20px rgba(59, 130, 246, 0.5); /* Blue glow */
```

---

## 🧩 Core Components (MVP)

## 1. Button Component

### Variants

```typescript
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  children: ReactNode;
}
```

### Examples

```jsx
<Button variant="primary" size="lg">
  Accept Quest
</Button>

<Button variant="outline" icon={<PlusIcon />}>
  Add Friend
</Button>

<Button variant="danger" loading={true}>
  Deleting...
</Button>
```

### Styles

- **Primary**: Blue background, white text
- **Secondary**: Purple background, white text
- **Outline**: Transparent background, border, colored text
- **Ghost**: Transparent, no border, hover effect
- **Danger**: Red background, white text

---

## 2. Card Component

```typescript
interface CardProps {
  variant?: "default" | "elevated" | "bordered";
  padding?: "sm" | "md" | "lg";
  hoverable?: boolean;
  onClick?: () => void;
  children: ReactNode;
}
```

### Usage

```jsx
<Card variant="elevated" hoverable onClick={handleClick}>
  <CardHeader>
    <CardTitle>Quest Title</CardTitle>
    <CardSubtitle>Difficulty: Medium</CardSubtitle>
  </CardHeader>
  <CardBody>
    <p>Quest description...</p>
  </CardBody>
  <CardFooter>
    <Button>View Details</Button>
  </CardFooter>
</Card>
```

---

## 3. Badge Component

```typescript
type BadgeVariant = "default" | "success" | "warning" | "error" | "info";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  children: ReactNode;
}
```

### Examples

```jsx
{/* Quest Tiers */}
<Badge variant="default">Novice</Badge>
<Badge variant="success">Adventurer</Badge>
<Badge variant="info">Warrior</Badge>
<Badge variant="warning">Champion</Badge>
<Badge variant="error">Master</Badge>
<Badge variant="error" icon={<FlameIcon />}>Conqueror</Badge>

{/* Item Rarities */}
<Badge variant="default">Common</Badge>
<Badge variant="success">Uncommon</Badge>
<Badge variant="info">Rare</Badge>
<Badge variant="warning">Epic</Badge>
<Badge variant="error">Legendary</Badge>
<Badge variant="error" icon={<FlameIcon />}>Godly</Badge>
```

---

## 4. Quest Card Component

```typescript
interface QuestCardProps {
  quest: Quest;
  onAccept?: (questId: string) => void;
  onViewDetails?: (questId: string) => void;
}
```

### Design

```
┌────────────────────────────────────────┐
│  🏆  [CHAMPION ⭐⭐⭐⭐]                   │
│                                        │
│  Build a 500-Piece Lego Set           │
│                                        │
│  Complete a full Lego set with at     │
│  least 500 pieces...                  │
│                                        │
│  ⏱️  2 weeks  │  🏆 50,000 Glory       │
│  ⚡ 5,000 XP  │  🎁 Epic Item          │
│                                        │
│  [View Details]  [Accept Quest]       │
└────────────────────────────────────────┘
```

---

## 5. Item Card Component

```typescript
interface ItemCardProps {
  item: VaultItem;
  showActions?: boolean;
  onFeatureToggle?: (itemId: string) => void;
}
```

### Design

```
┌──────────────────────┐
│                      │
│   [Item Image/Icon]  │
│   [Flame animation]  │ ← For Godly items
│                      │
├──────────────────────┤
│ Golden Brick         │
│ ⭐⭐⭐⭐⭐ Legendary    │
│                      │
│ [⭐ Featured]        │ ← Toggle button
└──────────────────────┘
```

### Rarity Glow Effect

- Add colored border/glow based on rarity tier (1-6 stars)
- Animate shimmer effect for Legendary (5⭐)
- Flame animation for Godly (6🔥⭐) items

---

## 6. Progress Bar Component

```typescript
interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  color?: string;
  animated?: boolean;
}
```

### Usage

```jsx
<ProgressBar
  current={45000}
  max={50000}
  label="Level 4 Progress"
  showPercentage
  animated
/>
```

### Design

```
Level 4 Progress                    90%
[████████████████████░░░░]
```

---

## 7. Modal Component

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "full";
  children: ReactNode;
}
```

### Usage

```jsx
<Modal isOpen={showModal} onClose={handleClose} title="Quest Details" size="lg">
  <ModalBody>{/* Content */}</ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={handleClose}>
      Cancel
    </Button>
    <Button onClick={handleAccept}>Accept</Button>
  </ModalFooter>
</Modal>
```

---

## 8. Countdown Timer Component

```typescript
interface CountdownTimerProps {
  deadline: Date;
  onExpire?: () => void;
  variant?: "default" | "compact" | "circular";
}
```

### Display Formats

- **Days remaining**: "5 days, 3 hours"
- **Hours remaining**: "12 hours, 30 minutes"
- **Minutes remaining**: "45 minutes" (with warning color)
- **Expired**: "Expired" (red)

---

## 9. Stats Display Component

```typescript
interface StatsDisplayProps {
  stats: {
    label: string;
    value: string | number;
    icon?: ReactNode;
    trend?: "up" | "down" | "neutral";
  }[];
  layout?: "horizontal" | "vertical" | "grid";
}
```

### Example

```jsx
<StatsDisplay
  layout="grid"
  stats={[
    { label: "Level", value: 4, icon: <TrophyIcon /> },
    { label: "Glory", value: "45,000", icon: <CoinsIcon /> },
    { label: "XP", value: "38,500 / 50,000", icon: <StarIcon /> },
    { label: "Items", value: 12, icon: <BoxIcon /> },
    { label: "Quests", value: 15, icon: <MapIcon />, trend: "up" },
  ]}
/>
```

---

## 10. Empty State Component

```typescript
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

### Usage

```jsx
<EmptyState
  icon={<BoxIcon />}
  title="No Items Yet"
  description="Complete your first quest to start collecting items!"
  action={{
    label: "Browse Quests",
    onClick: () => navigate("/quests"),
  }}
/>
```

---

## 11. Notification/Toast Component

```typescript
type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  type: ToastType;
  message: string;
  duration?: number;
  onClose?: () => void;
}
```

### Design

```
┌─────────────────────────────────┐
│ ✓ Quest completed successfully! │ ← Success (green)
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ ⚠ Quest deadline approaching!   │ ← Warning (orange)
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ ✗ Failed to load quests         │ ← Error (red)
└─────────────────────────────────┘
```

---

## 12. Navigation Component

### Desktop Navigation

```typescript
interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
  badge?: number;
}
```

### Design

```
┌────────────────────────────────────────────────────────┐
│ [Logo] Home Base  Quests  Vault  Character  [Profile] │
└────────────────────────────────────────────────────────┘
```

### Mobile Navigation (Bottom Bar)

```
┌────────────────────────────────────────────┐
│  [🏠]    [🗺️]    [📦]    [👤]              │
│  Home   Quests  Vault  Character           │
└────────────────────────────────────────────┘
```

---

## 13. Loading States

### Skeleton Loader

```jsx
<QuestCardSkeleton />
<ItemCardSkeleton />
<ProfileSkeleton />
```

### Spinner

```jsx
<Spinner size="sm" />
<Spinner size="lg" color="primary" />
```

---

## 14. Form Components

### Input Field

```typescript
interface InputProps {
  label?: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  error?: string;
  icon?: ReactNode;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
}
```

### Select Dropdown

```typescript
interface SelectProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}
```

---

## 🚀 Future Components (Phase 2+)

### AI Quest Generator UI

- Multi-step form
- Preference sliders
- Loading animation with creative messages
- Generated quest cards with "Regenerate" option

### Friend Card

- Avatar + username
- Level + stats preview
- "Challenge" button
- Activity status

### Achievement Badge

- Unlocked vs locked state
- Progress ring for partial achievements
- Rarity tiers
- Celebration animation on unlock

### Leaderboard

- Ranked list with user highlighting
- Filter by friends/global/category
- Time period selector

### Shop Item Card

- Item preview
- Price in points
- "Purchase" button
- Stock indicator
- Limited-time badge

---

## Animation Guidelines

### Transitions

```css
--transition-fast: 150ms ease-in-out;
--transition-base: 250ms ease-in-out;
--transition-slow: 350ms ease-in-out;
```

### Common Animations

- **Hover**: Scale up 1.02x, add shadow
- **Button Click**: Scale down 0.98x
- **Card Enter**: Fade in + slide up
- **Success**: Confetti or sparkle effect
- **Level Up**: Badge grow + glow pulse
- **Max Level (100)**: Special golden animation with fanfare

### Tier Icon Animations (Future)

- **Novice**: Simple fade-in
- **Adventurer**: Subtle bounce
- **Warrior**: Metallic shine sweep
- **Champion**: Golden glow pulse
- **Master**: Sparkle particles
- **Conqueror**: Flame animation + particle burst

---

## Responsive Breakpoints

```css
--breakpoint-sm: 640px; /* Mobile */
--breakpoint-md: 768px; /* Tablet */
--breakpoint-lg: 1024px; /* Desktop */
--breakpoint-xl: 1280px; /* Large Desktop */
```

### Layout Rules

- **Mobile (< 768px)**: Single column, bottom nav
- **Tablet (768-1024px)**: Two-column grid where appropriate
- **Desktop (> 1024px)**: Full layout, side-by-side content

---

## Accessibility Features

### Keyboard Navigation

- All interactive elements focusable
- Visible focus indicators
- Logical tab order
- Escape key closes modals

### Screen Readers

- Semantic HTML (`<nav>`, `<main>`, `<article>`)
- ARIA labels for icons
- Alt text for images
- Live regions for dynamic updates

### Color Contrast

- Text on background: Minimum 4.5:1 ratio
- Large text: Minimum 3:1 ratio
- Test with tools like axe DevTools

---

## Component Library Structure

```
src/components/
├── common/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   └── Button.test.tsx
│   ├── Card/
│   ├── Badge/
│   ├── Modal/
│   └── ...
├── quest/
│   ├── QuestCard/
│   ├── QuestDetail/
│   ├── QuestBrowser/
│   └── ActiveQuestDisplay/
├── vault/
│   ├── ItemCard/
│   ├── ItemGrid/
│   ├── ItemDetail/
│   └── VaultFilters/
├── character/
│   ├── CharacterStats/
│   ├── FeaturedItems/
│   └── LevelProgress/
└── layout/
    ├── Navigation/
    ├── Header/
    └── Footer/
```

---

## Design Tools & Resources

### Recommended Tools

- **Figma**: For design mockups
- **Storybook**: Component documentation
- **Iconoir** or **Heroicons**: Icon library
- **Framer Motion**: Animation library

### Design Inspiration

- Game UIs (RPGs, achievement systems)
- Duolingo (gamification done right)
- Habitica (quest-based habit tracker)
- Discord (modern, playful UI)

---

**Last Updated**: October 8, 2025
