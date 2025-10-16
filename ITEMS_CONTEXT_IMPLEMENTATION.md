# Items Context Caching Implementation

## Summary

Successfully implemented an `ItemsContext` to cache user items globally across the application. This eliminates redundant API calls when navigating between pages. Items are now fetched once when the user changes and remain cached until explicitly refreshed (e.g., after item purchase or quest completion).

## Problem Solved

Previously, every page (HomePage, VaultPage, ShopPage, QuestsPage, QuestDetailsPage) was independently fetching user items via `fetchUserItems()` on mount. This caused:

- Unnecessary network requests when navigating between pages
- Slower page loads
- Inefficient use of API resources
- Poor user experience with repeated loading states

## Solution Implemented

Created a centralized `ItemsContext` that:

1. **Manages items globally** - Single source of truth for user items
2. **Caches across navigation** - Items persist when moving between pages
3. **Smart refresh** - Only refetches when explicitly requested
4. **Provides computed values** - Automatically calculates `itemCount`, `topItems`, and `isOwnedItem()`

## Files Created

### `/embark-frontend/src/contexts/ItemsContext.tsx`

New context provider that:

- Stores `items: UserItem[]` in state
- Automatically loads items when `selectedUser` changes
- Provides `refreshItems()` function for manual refresh
- Exposes computed values: `itemCount`, `topItems` (top 4 by rarity), `isOwnedItem(itemId)`
- Tracks `loading` and `error` states

## Files Modified

### 1. `/embark-frontend/src/main.tsx`

- Added `ItemsProvider` wrapper inside `UserProvider`
- Ensures items context has access to user context

### 2. `/embark-frontend/src/pages/HomePage.tsx`

**Changes:**

- Imported `useItems` from `ItemsContext`
- Removed `fetchUserItems` import
- Removed local state: `userItemCount`, `topItems`
- Removed item fetching logic from `loadData()`
- Uses context values: `itemCount`, `topItems`, `itemsLoading`

**Result:** Page now displays cached items without API call on mount

### 3. `/embark-frontend/src/pages/VaultPage.tsx`

**Changes:**

- Imported `useItems` from `ItemsContext`
- Removed `fetchUserItems` import and local `userItems` state
- Removed `loadItems()` function entirely
- Uses context values: `items`, `itemCount`, `loading`

**Result:** Vault instantly displays items from cache

### 4. `/embark-frontend/src/pages/ShopPage.tsx`

**Changes:**

- Imported `useItems` from `ItemsContext`
- Removed `fetchUserItems` import
- Removed local state: `ownedItemIds`, `userItemCount`
- Uses context values: `itemCount`, `isOwnedItem()`, `refreshItems()`
- Simplified `loadShopData()` to only fetch shop items
- Updated `handlePurchase()` to call `refreshItems()` after purchase

**Result:** Shop instantly shows owned items and refreshes only after purchase

### 5. `/embark-frontend/src/pages/QuestsPage.tsx`

**Changes:**

- Imported `useItems` from `ItemsContext`
- Removed `fetchUserItems` import and local `userItemCount` state
- Removed item fetching logic from `loadQuests()`
- Uses context values: `itemCount`, `itemsLoading`
- Added `onViewAll` prop to `ActiveQuestsGrid` (no-op function)

**Result:** Quests page displays item count without API call

### 6. `/embark-frontend/src/pages/QuestDetailsPage.tsx`

**Changes:**

- Imported `useItems` from `ItemsContext`
- Removed `fetchUserItems` import and local `userItemCount` state
- Removed item fetching logic from `loadQuestData()`
- Uses context values: `itemCount`, `itemsLoading`, `refreshItems()`
- Added `refreshItems()` call after completing quest

**Result:** Quest details page shows item count and refreshes items after completion

### 7. `/embark-frontend/src/components/common/ItemDetailsModal.tsx`

**Changes:**

- Imported `useItems` from `ItemsContext`
- Removed `fetchUserItems` import
- Updated `loadItemData()` to find item from context instead of fetching
- Added `items` as dependency to `useEffect`

**Result:** Modal displays item instantly from cache without API call

### 8. `/embark-frontend/src/components/common/QuestDetailsModal.tsx`

**Changes:**

- Imported `useItems` from `ItemsContext`
- Uses `refreshItems()` from context
- Added `refreshItems()` call after completing quest

**Result:** Items refresh after quest completion from modal

## Key Benefits

### 1. **Performance Improvement**

- Eliminated 6-8 redundant API calls per user session
- Pages load instantly when navigating (no loading spinners for items)
- Cached data provides immediate UI feedback

### 2. **Better User Experience**

- Seamless navigation without repeated loading states
- Consistent item counts across all pages
- Instant display of owned items in shop

### 3. **Maintainability**

- Single source of truth for items
- Centralized refresh logic
- Easier to debug item-related issues
- Consistent pattern with existing `UserContext`

### 4. **Correctness**

- Items automatically refresh after mutations:
  - After item purchase in shop
  - After quest completion (with item rewards)
- No stale data issues

## Refresh Triggers

Items are refreshed in these scenarios:

1. **User change** - Automatic (via `useEffect` in context)
2. **Item purchase** - Manual (via `refreshItems()` in ShopPage)
3. **Quest completion** - Manual (via `refreshItems()` in QuestDetailsPage and QuestDetailsModal)

## Testing Recommendations

1. **Navigation test**: Navigate between HomePage → VaultPage → ShopPage and verify no API calls to `/users/:id/items`
2. **Purchase test**: Purchase an item in shop and verify items refresh
3. **Quest completion test**: Complete a quest and verify items refresh
4. **User switch test**: Switch users and verify items refresh
5. **Loading states**: Verify loading indicators show only on initial load or after explicit refresh

## Future Enhancements

Potential improvements:

1. Add timestamp-based cache invalidation (e.g., refetch after 5 minutes)
2. Implement optimistic updates for purchases/completions
3. Add WebSocket support for real-time item updates
4. Consider using React Query for more advanced caching features

## Related Files

- `/embark-frontend/src/contexts/UserContext.tsx` - Similar pattern for user data
- `/embark-frontend/src/hooks/useItems.ts` - Original hook (kept for reference)
- `/embark-frontend/src/services/api.ts` - API functions for fetching items
