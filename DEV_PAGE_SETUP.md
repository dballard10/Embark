# Dev Test Page Setup Complete

## Overview

A comprehensive development test page has been created at `/dev` that allows you to view all database entities (Quests, Items, Users) with advanced filtering and inspection capabilities.

## Features Implemented

### 1. Tabbed Interface

- **Quests Tab**: View all quests with tier indicators
- **Items Tab**: View all items with rarity information
- **Users Tab**: View all users with stats

### 2. Card-Based Display

- Beautiful card UI with tier/rarity color coding
- Key information displayed prominently
- Hover effects and smooth transitions

### 3. Raw JSON Viewer

- Each card has a collapsible JSON section
- Click the chevron to expand/collapse
- Fully formatted JSON with proper indentation

### 4. Interactive Features

- **Refresh Button**: Reload current tab data
- **Search/Filter**: Real-time filtering across all fields
- **Item Count**: Shows filtered count vs total count
- **Loading States**: Animated spinner during data fetch
- **Error Handling**: Clear error messages if API calls fail

### 5. Responsive Design

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Sticky header with controls

## Access

### Via URL

Navigate directly to: `http://localhost:5173/dev`

### Via Bottom Navigation

- A "Dev" button appears in the bottom navigation (5th button)
- **Only visible in development mode** (`npm run dev`)
- Will not appear in production builds
- Highlighted in amber/orange when active

## Environment Configuration

**IMPORTANT**: Create a `.env.local` file in the `embark-frontend` directory:

```bash
# embark-frontend/.env.local
VITE_API_URL=http://localhost:8000/api
```

This tells the frontend where to find your backend API.

## Files Created

### Core Files

- `src/services/api.ts` - API service with axios configuration
- `src/pages/DevTestPage.tsx` - Main dev page component

### Display Components

- `src/components/dev/JsonViewer.tsx` - Collapsible JSON display
- `src/components/dev/QuestCard.tsx` - Quest display card
- `src/components/dev/ItemCard.tsx` - Item display card
- `src/components/dev/UserCard.tsx` - User display card
- `src/components/dev/TabPanel.tsx` - Tab content container

### Modified Files

- `src/main.tsx` - Added React Router
- `src/App.tsx` - Added routing configuration
- `src/types/item.types.ts` - Renamed Reward to Item, added created_at
- `src/types/quest.types.ts` - Added created_at field
- `src/components/common/BottomNav.tsx` - Added dev button
- `src/pages/HomePage.tsx` - Fixed mock data types

## Usage Guide

### Viewing Quests

1. Click "Quests" tab
2. See all quests from database with tier colors
3. Filter by typing quest name, description, or tier number
4. Click chevron on any card to see full JSON

### Viewing Items

1. Click "Items" tab
2. See all items with rarity information
3. Rarity stars displayed visually (⭐)
4. Filter by name, description, or tier

### Viewing Users

1. Click "Users" tab
2. See username, level, glory, XP
3. Account creation time shown as relative time
4. Filter by username or level

### Refreshing Data

- Click the "Refresh" button in the header
- Reloads data for the current active tab
- Shows loading spinner during fetch

### Filtering

- Type in the search box at top
- Filters in real-time as you type
- Searches across multiple fields (name, description, tier, etc.)
- Filtered count shown in header

## Technical Details

### API Integration

- Uses axios for HTTP requests
- 10-second timeout on requests
- Automatic error handling
- Loads up to 100 items per entity type

### State Management

- React hooks for state (useState, useEffect)
- Separate loading states per tab
- Filter state persists during tab session
- Auto-loads data on tab change

### Styling

- Tailwind CSS utility classes
- Consistent color scheme with main app
- Tier colors from `tierUtils.tsx`
- Smooth animations and transitions

### Performance

- Only loads data for active tab
- Efficient filtering with JavaScript array methods
- Responsive grid layout with CSS Grid

## Troubleshooting

### "Failed to fetch" Error

- Ensure backend is running on port 8000
- Check `.env.local` has correct VITE_API_URL
- Verify CORS is enabled in backend

### Dev button not showing

- Ensure you're running `npm run dev` (not production build)
- Dev button only appears in development mode

### No data showing

- Check backend has seed data loaded
- Verify database connection in backend
- Check browser console for errors

## Next Steps

This dev page can be extended with:

- CRUD operations (Create, Update, Delete)
- More advanced filtering (by date, range, etc.)
- Sorting options
- Export data to JSON/CSV
- Dark/Light theme toggle
- Pagination for large datasets

---

**Development Page Ready!** 🎉

Access it at http://localhost:5173/dev or click the Dev button in the bottom navigation.
