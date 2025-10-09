# User Flow & Journey

This document maps out user interactions and journeys through the Embark platform.

---

## 🧩 MVP User Flows

### 1. Onboarding Flow

```
[Landing Page]
     │
     ├─ User clicks "Get Started"
     ▼
[Registration Page]
     │
     ├─ Enter: Email, Username, Password
     ├─ Optional: Location
     ▼
[Email Verification] (Supabase Auth)
     │
     ├─ Verify email link
     ▼
[Welcome Tutorial]
     │
     ├─ Explain quest system
     ├─ Show points & items
     ├─ Explain character progression
     ▼
[Home Base Dashboard]
```

**Key Screens**:

1. **Landing Page**: Value proposition, call-to-action
2. **Registration**: Simple form, clear validation
3. **Welcome Tutorial**: 3-step walkthrough
4. **Home Base**: First quest selection prompt

**Success Criteria**:

- User completes registration
- User understands basic mechanics
- User accepts first quest

---

### 2. Quest Selection Flow

```
[Home Base] - No Active Quest
     │
     ├─ User clicks "Start New Quest"
     ▼
[Quest Browser]
     │
     ├─ View available quests by difficulty
     ├─ Easy (3 options)
     ├─ Medium (3 options)
     ├─ Hard (3 options)
     │
     ├─ User clicks on a quest
     ▼
[Quest Detail View]
     │
     ├─ See full description
     ├─ View reward (points + item rarity)
     ├─ See time limit
     │
     ├─ User clicks "Accept Quest"
     ▼
[Confirmation Modal]
     │
     ├─ Confirm selection
     ├─ Show deadline
     ▼
[Home Base] - Active Quest
     │
     ├─ Quest card displayed prominently
     ├─ Countdown timer shown
     └─ "Complete Quest" button visible
```

**UI Elements**:

- **Quest Card**: Title, difficulty badge, time limit, reward preview
- **Difficulty Filters**: Easy / Medium / Hard tabs
- **Quest Detail**: Expandable modal with full info
- **Accept Button**: Clear call-to-action

**User Decisions**:

- Which difficulty to choose
- Which specific quest appeals to them
- Commit to quest or browse more

---

### 3. Quest Completion Flow

```
[Home Base] - Active Quest
     │
     ├─ User completes real-world activity
     ├─ User clicks "Mark Complete"
     ▼
[Completion Confirmation]
     │
     ├─ "Did you complete: [Quest Title]?"
     ├─ Reminder: Honor system
     │
     ├─ User confirms "Yes, I Completed It"
     ▼
[Processing]
     │
     ├─ Backend validates
     ├─ Award points
     ├─ Grant item
     ├─ Update level if threshold reached
     ▼
[Celebration Screen]
     │
     ├─ 🎉 Congratulations animation
     ├─ Show points earned (+5,000)
     ├─ Reveal new item (with rarity glow)
     ├─ Show level up if applicable
     │
     ├─ User clicks "View Item" or "Continue"
     ▼
[Options]
     │
     ├─ View in Vault
     ├─ Start new quest
     └─ Return to Home Base
```

**Feedback & Rewards**:

- **Immediate gratification**: Success animation
- **Clear rewards**: Points and item displayed
- **Progress**: Level bar fills up
- **Encouragement**: "Ready for your next adventure?"

---

### 4. Vault (Inventory) Flow

```
[Navigation] → Vault
     │
     ▼
[Vault Page]
     │
     ├─ View all collected items
     ├─ Grid layout with item cards
     │
     ├─ Filters & Sorting
     │   ├─ Filter by rarity
     │   ├─ Sort by: Newest, Rarest, Name
     │
     ├─ User clicks an item
     ▼
[Item Detail Modal]
     │
     ├─ Item name & description
     ├─ Rarity tier (stars + color)
     ├─ Acquired date
     ├─ "Feature on Profile" toggle
     │
     ├─ User clicks "Feature"
     ▼
[Update Featured Items]
     │
     ├─ Add to featured slots (max 5)
     ├─ Success message
     └─ Reflects on Character page
```

**UI Components**:

- **Item Card**: Image, name, rarity indicator
- **Filter Bar**: Rarity chips, sort dropdown
- **Detail Modal**: Full item information
- **Featured Toggle**: Star icon to mark as featured

---

### 5. Character Profile Flow

```
[Navigation] → Character
     │
     ▼
[Character Page]
     │
     ├─ Header Section
     │   ├─ Username
     │   ├─ Level badge
     │   ├─ Avatar (placeholder or custom)
     │
     ├─ Stats Section
     │   ├─ Total Points
     │   ├─ Level Progress Bar
     │   ├─ Points to Next Level
     │   ├─ Total Items Collected
     │   ├─ Quests Completed
     │
     ├─ Featured Items Section
     │   ├─ Showcase grid (5 items)
     │   ├─ "Manage Featured Items" button
     │
     └─ [Future] Achievement Badges
```

**User Actions**:

- View personal stats
- See progression toward next level
- Showcase favorite items
- [Future] Edit profile, change avatar

---

## 🚀 Future User Flows

### 6. Friend System Flow

```
[Character/Profile]
     │
     ├─ User clicks "Add Friends"
     ▼
[Friend Search]
     │
     ├─ Search by username
     ├─ Share friend code
     │
     ├─ Found friend → Send request
     ▼
[Friend Request Sent]
     │
     ├─ Notification to recipient
     │
[Recipient Accepts]
     ▼
[Friends List]
     │
     ├─ View friend profiles
     ├─ See friend activity
     ├─ Challenge friend to quest
     └─ Start group challenge
```

---

### 7. Shop Purchase Flow

```
[Navigation] → Shop
     │
     ▼
[Shop Page]
     │
     ├─ Browse items for sale
     ├─ Daily featured items
     ├─ Limited-time offers
     │
     ├─ User clicks item
     ▼
[Item Preview]
     │
     ├─ Item details
     ├─ Price in points
     ├─ "Purchase" button
     │
     ├─ User confirms purchase
     ▼
[Deduct Points & Grant Item]
     │
     ├─ Success animation
     ├─ "View in Vault" option
     └─ Return to shop
```

---

### 8. AI Quest Generation Flow

```
[Quest Browser]
     │
     ├─ User clicks "Generate Custom Quest"
     ▼
[Quest Preferences]
     │
     ├─ Select difficulty
     ├─ Choose category (optional)
     ├─ Set time preference
     ├─ Location-based? (toggle)
     │
     ├─ User clicks "Generate"
     ▼
[AI Processing]
     │
     ├─ Show loading state
     ├─ "Crafting your adventure..."
     ▼
[Generated Quest Options]
     │
     ├─ 3 AI-generated quests
     ├─ User previews each
     │
     ├─ Option: "Regenerate" (limited uses)
     ├─ User selects one
     ▼
[Accept Quest]
     │
     └─ Same as standard quest flow
```

---

### 9. Group Challenge Flow

```
[Friends List]
     │
     ├─ User clicks "Create Group Challenge"
     ▼
[Create Group Challenge]
     │
     ├─ Select challenge
     ├─ Set max participants (2-10)
     ├─ Invite friends (checkboxes)
     │
     ├─ User creates challenge
     ▼
[Invitations Sent]
     │
     ├─ Friends receive notifications
     │
[Friends Accept]
     ▼
[Group Challenge Active]
     │
     ├─ Shared challenge page
     ├─ See who's joined
     ├─ Progress tracking
     ├─ Group chat (optional)
     │
     ├─ All members complete
     ▼
[Group Completion Celebration]
     │
     ├─ Bonus rewards for all
     ├─ Achievement unlocked
     └─ Share results
```

---

## User Journey Maps

### New User Journey (First 30 Minutes)

| Time      | Action                        | Goal                    | Success Indicator       |
| --------- | ----------------------------- | ----------------------- | ----------------------- |
| 0-2 min   | Land on site, view value prop | Understand concept      | Clicks "Sign Up"        |
| 2-5 min   | Register account              | Create profile          | Email verified          |
| 5-8 min   | Complete tutorial             | Learn mechanics         | Reaches Home Base       |
| 8-12 min  | Browse quests                 | Find appealing quest    | Views 3+ quests         |
| 12-15 min | Accept first quest            | Commit to activity      | Quest accepted          |
| 15-30 min | Complete quest                | Feel accomplishment     | Marks complete          |
| 30 min    | Receive rewards               | Experience gamification | Views new item in Vault |

**Drop-off Risks**:

- Tutorial too long → Keep to 3 screens max
- No appealing quests → Ensure variety
- Quest too hard → Emphasize easy quests for beginners

---

### Returning User Journey (Daily Engagement)

| Time    | Action                 | Goal                   |
| ------- | ---------------------- | ---------------------- |
| Day 1   | Complete first quest   | Initial success        |
| Day 2   | Return, check progress | Build habit            |
| Day 3-7 | Complete daily quests  | Establish routine      |
| Week 2  | Try medium difficulty  | Increase challenge     |
| Week 3  | Collect 10+ items      | Feel collection growth |
| Week 4  | Level up to 5+         | See progression        |
| Month 2 | Invite friends         | Social engagement      |
| Month 3 | Complete hard quest    | Mastery feeling        |

---

## Interaction Patterns

### Navigation Pattern (MVP)

```
┌─────────────────────────────────────────┐
│  [Logo]  Home  Quests  Vault  Character │ ← Top Nav
└─────────────────────────────────────────┘
│                                         │
│           Page Content                  │
│                                         │
└─────────────────────────────────────────┘
```

**Mobile**: Bottom tab bar
**Desktop**: Top navigation bar

---

### Card Design Pattern

**Quest Card**:

```
┌─────────────────────────────────────┐
│  🏔️  [Difficulty Badge]             │
│  Build a 500-Piece Lego Set        │
│                                     │
│  ⏱️  7 days  |  💰 35,000 pts      │
│  ⭐ Legendary Item                  │
│                                     │
│  [View Details] [Accept Quest]     │
└─────────────────────────────────────┘
```

**Item Card (Vault)**:

```
┌───────────────────┐
│                   │
│   [Item Image]    │
│                   │
├───────────────────┤
│ Golden Brick      │
│ ★★★★☆ Legendary   │
└───────────────────┘
```

---

## Error States & Edge Cases

### No Active Quest

- **State**: User has no active quest
- **UI**: Empty state with call-to-action
- **Message**: "Ready for a new adventure? Start a quest!"
- **Action**: Button to Quest Browser

### Quest Expired

- **State**: Deadline passed, quest incomplete
- **UI**: Gray out quest card, show "Expired" badge
- **Action**: "View Quests" button
- **[Future]**: Apply penalty or warning

### Empty Vault

- **State**: No items collected yet
- **UI**: Empty state illustration
- **Message**: "Complete your first quest to start collecting items!"
- **Action**: Link to Quest Browser

### Network Error

- **State**: API request fails
- **UI**: Error message with retry button
- **Message**: "Couldn't load data. Check your connection."
- **Action**: "Retry" button

---

## Accessibility Considerations

### 🧩 MVP Accessibility

- Keyboard navigation support
- Alt text for all images
- Sufficient color contrast (WCAG AA)
- Focus indicators
- Semantic HTML structure

### 🚀 Future Enhancements

- Screen reader optimization
- Reduced motion option
- High contrast mode
- Font size controls
- Voice input for quest completion

---

## Mobile Responsiveness

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile-Specific Patterns

- Bottom navigation bar
- Full-screen modals instead of popovers
- Swipe gestures for navigation
- Larger touch targets (min 44x44px)
- Simplified layouts (single column)

---

**Last Updated**: October 8, 2025
