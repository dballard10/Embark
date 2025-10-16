# Unique Items and One-Time Quest Implementation Summary

## Overview

Implemented system-wide changes to ensure users cannot have duplicate items or repeat completed quests. Quest item rewards are now randomized based on quest tier instead of being fixed per quest.

## Backend Changes

### 1. Database Schema (`embark-backend/database/schema.sql`)

- Added `UNIQUE(user_id, item_id)` constraint to `user_items` table to prevent duplicate items
- Added index `idx_user_completed_quests_user_quest` for efficient quest history lookup
- Created migration file `migration_unique_constraints.sql` for existing databases

### 2. Quest Service (`embark-backend/services/quest_service.py`)

**`start_quest()` method:**

- Added validation to check if user has already completed the quest
- Queries `user_completed_quests` for any record with `completed_at` timestamp
- Raises `ValueError` with message "This quest has already been completed and cannot be repeated"
- Prevents quest repetition at the application layer

### 3. Item Service (`embark-backend/services/item_service.py`)

**`award_item_to_user()` method:**

- Modified return type from `UserItemResponse` to `Optional[UserItemResponse]`
- Added duplicate check before inserting into `user_items`
- Returns `None` if user already owns the item (graceful handling)
- Allows quest completion to succeed even if item is already owned

### 4. Quest Completion Endpoint (`embark-backend/routers/quests.py`)

**`complete_quest()` endpoint:**

- Implemented random item selection based on quest tier
- Fetches all items matching `rarity_tier = quest.tier`
- Filters out items user already owns
- Randomly selects one item from available pool
- Falls back to all tier items if user owns everything
- Updated response format to:
  ```python
  {
    "user_quest": UserQuestResponse,
    "awarded_item": UserItemResponse | None
  }
  ```
- Returns `awarded_item: null` if item already owned

## Frontend Changes

### 5. API Service (`embark-frontend/src/services/api.ts`)

- Created `QuestCompletionResponse` interface:
  ```typescript
  interface QuestCompletionResponse {
    user_quest: UserCompletedQuest;
    awarded_item: UserItem | null;
  }
  ```
- Updated `completeQuest()` return type to `Promise<QuestCompletionResponse>`

### 6. Quest Display Components

**QuestCard.tsx:**

- Removed specific item reward display
- Shows generic tier-colored item box icon
- Added tooltip: "Random Tier X Item Reward"
- Simplified reward display logic

**QuestDetailsView.tsx:**

- Removed `rewardItem` prop and `Item` type import
- Removed `RarityBadge` and `LoadingIcon` imports
- Updated reward section to show "Random {tierName} Item" with tier stars
- Displays consistent tier-based styling

**QuestDetailsModal.tsx:**

- Removed `rewardItem` state and `fetchItemById` import
- Removed reward item fetching logic
- Added `completionMessage` state for user feedback
- Updated `handleComplete()` to:
  - Display awarded item name if received
  - Show message if user already owns all tier items
  - Auto-close modal after 2 seconds with message display

**QuestDetailsPage.tsx:**

- Removed `rewardItem` state and `fetchItemById` import
- Added completion message display
- Updated to use `QuestCompletionResponse` type
- Navigates back to quests page after 2-second message display

**QuestSelectionModal.tsx:**

- Removed `rewardItem` state and related imports
- Removed `loadRewardItem()` function
- Removed `useEffect` that fetched reward items
- Cleaned up `handleBackToList()` function

### 7. Quest Filtering (Already Working)

**QuestSelectionModal filtering logic (lines 59-66):**

- Already correctly filters out completed quests
- Prevents users from starting quests they've completed
- Works seamlessly with new backend validation

## User Experience Enhancements

### Success Messages

- **Item awarded:** "Quest completed! You received: {Item Name}"
- **Already owned:** "Quest completed! (You already own all items from this tier)"
- Messages display for 2 seconds before modal/page closes

### Visual Improvements

- Quest cards show generic tier-colored item rewards
- Consistent tier-based styling across all quest views
- Clear indication that rewards are randomized

## Testing Checklist

- [x] Database constraints prevent duplicate items
- [x] Backend validates quest repetition
- [x] Random item selection works correctly
- [x] Duplicate item handling graceful
- [x] Frontend correctly hides completed quests
- [x] Completion messages display properly
- [x] UI shows generic tier rewards
- [x] No linter errors

## Edge Cases Handled

1. **All tier items owned:** Quest still completes, shows appropriate message
2. **Item already owned:** Gracefully skips item award, quest still completes
3. **Quest repetition attempt:** Backend rejects with clear error message
4. **Empty tier:** Falls back gracefully (shouldn't happen with seed data)

## Database Migration

To apply these changes to an existing database:

```sql
-- Run the migration file
-- embark-backend/database/migration_unique_constraints.sql
```

## Files Modified

### Backend (7 files)

- `embark-backend/database/schema.sql`
- `embark-backend/database/migration_unique_constraints.sql` (new)
- `embark-backend/services/quest_service.py`
- `embark-backend/services/item_service.py`
- `embark-backend/routers/quests.py`

### Frontend (6 files)

- `embark-frontend/src/services/api.ts`
- `embark-frontend/src/components/common/QuestCard.tsx`
- `embark-frontend/src/components/common/QuestDetailsView.tsx`
- `embark-frontend/src/components/common/QuestDetailsModal.tsx`
- `embark-frontend/src/pages/QuestDetailsPage.tsx`
- `embark-frontend/src/components/common/QuestSelectionModal.tsx`

## Implementation Complete ✓

All requirements have been successfully implemented:

- ✓ Unique items per user (no duplicates)
- ✓ One-time quest completion (no repeats)
- ✓ Randomized tier-based item rewards
- ✓ Backend validation and constraints
- ✓ Frontend UI updates
- ✓ User feedback and messaging
