# Quest & Item Details Modal Conversion Plan

## Overview

Convert Quest Details and Item Details pages to modal popups and update badge styling to match the new tier-colored gradient system.

## Goals

1. Convert full pages to modal overlays
2. Update all badges to use tier-specific gradient colors
3. Maintain URL routing for direct access
4. Add accessibility features (ESC key, backdrop click)
5. Improve UX with seamless transitions

---

## Part 1: Update Badge Styling

### Quest Details Page Badges

**File**: `/embark-frontend/src/components/common/QuestDetailsView.tsx`

Currently uses old badge style. Update to:

- Use `getTierColor()` for tier badge
- Apply gradient background with `bg-gradient-to-r`
- Add shadow-lg and border-white/30
- Match styling from quest cards

### Item Details Page Badges

**File**: `/embark-frontend/src/pages/ItemDetailsPage.tsx`

Already uses `getTierColor()` but verify:

- Tier badge uses tier-specific gradient ✅
- Border and shadow match new style ✅
- Featured badge styling is consistent

---

## Part 2: Create Modal Components

### 1. Create QuestDetailsModal Component

**File**: `/embark-frontend/src/components/common/QuestDetailsModal.tsx` (NEW)

Props:

```tsx
interface QuestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  questId: string;
}
```

Features:

- Full-screen overlay with backdrop
- ESC key to close
- Click backdrop to close
- Scroll within modal
- Reuses QuestDetailsView component
- Loading states
- Error handling

### 2. Create ItemDetailsModal Component

**File**: `/embark-frontend/src/components/common/ItemDetailsModal.tsx` (NEW)

Props:

```tsx
interface ItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userItemId: string;
}
```

Features:

- Full-screen overlay with backdrop
- ESC key to close
- Click backdrop to close
- Scroll within modal
- Reuses item display logic
- Loading states
- Error handling

---

## Part 3: Update Navigation

### Update QuestCard Component

**File**: `/embark-frontend/src/components/common/QuestCard.tsx`

Change from:

```tsx
navigate(`/quest/${userQuest.id}`);
```

To:

```tsx
// Call onClick prop that opens modal
onClick?.();
```

Parent component manages modal state.

### Update ItemCard Component

**File**: `/embark-frontend/src/components/common/ItemCard.tsx`

Change from:

```tsx
navigate(`/item/${userItem.id}`);
```

To:

```tsx
// Call onClick prop that opens modal
onClick?.();
```

Parent component manages modal state.

### Update VaultPage

**File**: `/embark-frontend/src/pages/VaultPage.tsx`

Add:

- State for selected item
- State for modal open/close
- ItemDetailsModal component
- Pass onClick to ItemCard components

### Update HomePage

**File**: `/embark-frontend/src/pages/HomePage.tsx`

Add:

- State for selected quest
- State for modal open/close
- QuestDetailsModal component
- Pass onClick to QuestCard components

### Update QuestsPage

**File**: `/embark-frontend/src/pages/QuestsPage.tsx`

Add:

- State for selected quest
- State for modal open/close
- QuestDetailsModal component
- Pass onClick to QuestCard components

---

## Part 4: Maintain Route Access

Keep existing routes but render in modal:

**File**: `/embark-frontend/src/pages/QuestDetailsPage.tsx`

Option 1: Redirect to parent page with modal
Option 2: Render full page (fallback for direct links)
Option 3: Auto-open modal on mount if accessed via route

**File**: `/embark-frontend/src/pages/ItemDetailsPage.tsx`

Same options as quest details.

---

## Part 5: Modal Styling

### Base Modal Structure

```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
  <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 rounded-2xl border-2 border-purple-500/50 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
    {/* Close Button */}
    <button className="absolute top-4 right-4 z-10">
      <IconX />
    </button>

    {/* Content */}
    {/* ... */}
  </div>
</div>
```

### Animation

Add fade-in animation:

```css
@keyframes modal-fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## Part 6: Accessibility

### Features to Implement

1. **Focus trap**: Keep focus within modal
2. **ESC key**: Close on ESC press
3. **Initial focus**: Focus close button on open
4. **Return focus**: Return to trigger element on close
5. **ARIA attributes**:
   - `role="dialog"`
   - `aria-modal="true"`
   - `aria-labelledby="modal-title"`

---

## Implementation Order

1. ✅ Update QuestDetailsView badge styling
2. ✅ Update ItemDetailsPage badge styling
3. Create QuestDetailsModal component
4. Create ItemDetailsModal component
5. Update VaultPage with item modal
6. Update HomePage with quest modal
7. Update QuestsPage with quest modal
8. Update QuestCard onClick behavior
9. Update ItemCard onClick behavior
10. Test all flows and accessibility
11. Update routes (optional: keep for direct access)

---

## Files to Modify

### New Files (2)

1. `/embark-frontend/src/components/common/QuestDetailsModal.tsx`
2. `/embark-frontend/src/components/common/ItemDetailsModal.tsx`

### Update Files (8)

3. `/embark-frontend/src/components/common/QuestDetailsView.tsx` - Badge styling
4. `/embark-frontend/src/pages/ItemDetailsPage.tsx` - Verify badge styling
5. `/embark-frontend/src/components/common/QuestCard.tsx` - onClick behavior
6. `/embark-frontend/src/components/common/ItemCard.tsx` - onClick behavior
7. `/embark-frontend/src/pages/VaultPage.tsx` - Add modal
8. `/embark-frontend/src/pages/HomePage.tsx` - Add modal
9. `/embark-frontend/src/pages/QuestsPage.tsx` - Add modal
10. `/embark-frontend/src/index.css` - Modal animations

### Optional (2)

11. `/embark-frontend/src/pages/QuestDetailsPage.tsx` - Make modal-aware
12. `/embark-frontend/src/App.tsx` - Update routing strategy

---

## Expected Results

✅ Quest details open in modal overlay  
✅ Item details open in modal overlay  
✅ All badges use tier-colored gradients  
✅ ESC key closes modals  
✅ Backdrop click closes modals  
✅ Smooth animations  
✅ Accessible focus management  
✅ Direct URL access still works  
✅ No page navigation required  
✅ Better UX with overlay pattern
