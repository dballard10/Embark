# Core Features (MVP) 🧩

This document outlines the essential features required for a functional Minimum Viable Product.

---

## 1. User Authentication & Profile

**Priority**: Critical  
**Complexity**: Low

### Requirements

- User registration and login
- Basic profile information (username, email, location)
- Simple character display (level, total points, total items)

### Implementation Notes

- Use Supabase Auth for authentication
- Store user data in `users` table
- Location can be manually entered by user

---

## 2. Quest System (Basic)

**Priority**: Critical  
**Complexity**: Medium  
**📄 Detailed Spec**: See [features/quests.md](./features/quests.md)  
**📊 Tier Reference**: See [tier-system-reference.md](./tier-system-reference.md)

### Requirements

- Display available quests to user
- Six difficulty tiers: Novice (1⭐) → Conqueror (6🔥⭐)
- User can accept one active quest at a time
- Quest includes: title, description, tier, Glory/XP rewards, time limit
- Self-reported completion (honor system)

### Implementation Notes

- Start with 100-200 pre-defined quest templates (no AI in MVP)
- Use `quests` table to store quest data
- Use `user_completed_quests` table to track progress
- Simple confirmation modal for completion

---

## 3. Glory & XP System

**Priority**: Critical  
**Complexity**: Low  
**📄 Detailed Spec**: See [features/glory-xp.md](./features/glory-xp.md)  
**📊 Tier Reference**: See [tier-system-reference.md](./tier-system-reference.md)

### Requirements

- Award Glory (spendable currency) and XP (character progression) upon quest completion
- Display total Glory and current level on profile
- Dual currency system: Glory can be spent, XP cannot
- Starting level: 1 (0 XP)
- Level cap: 100 (1,000,000 XP)

### Implementation Notes

- Store `total_glory`, `total_xp`, and `level` in `users` table
- Level calculation: `Level = floor(totalXP / 10,000)`
- Glory rewards range from 1,000 (Novice) to 500,000 (Conqueror)
- No Glory/XP decay or expiration in MVP

---

## 4. Item Rewards

**Priority**: Critical  
**Complexity**: Medium  
**📄 Detailed Spec**: See [features/items.md](./features/items.md)  
**📊 Tier Reference**: See [tier-system-reference.md](./tier-system-reference.md)

### Requirements

- Award one item per completed quest
- Item rarity system: 6 tiers from Common (White) to Godly (Red Flame)
- Quest tier determines item rarity (Novice → Common, Conqueror → Godly)
- Items have: name, description, rarity tier, equipment slot, icon/image
- Store items in user's Vault
- Items can be equipped to Champion for customization (future)

### Implementation Notes

- `rewards` table for item definitions
- `user_items` table to track user inventory
- Color-coded rarity system (see tier-system-reference.md)
- Start with AI-generated images or simple icon library
- Godly items have flame animation effect

---

## 5. Vault (Inventory)

**Priority**: Critical  
**Complexity**: Low

### Requirements

- Display all items user has collected
- Filter/sort by rarity
- Show item details on click
- Display total item count

### Implementation Notes

- Simple grid or list view
- Query `user_items` joined with `rewards`
- No item actions required in MVP (view only)

---

## 6. Character Page

**Priority**: High  
**Complexity**: Low  
**📊 Level System**: See [tier-system-reference.md](./tier-system-reference.md)

### Requirements

- Display user's character stats:
  - Username
  - Current level (1-100)
  - Total Glory (spendable)
  - Total XP with progress bar to next level
  - Total items collected
  - Featured items showcase (3-5 slots)
- Simple avatar or placeholder

### Implementation Notes

- Level formula in tier-system-reference.md
- Display both Glory and XP separately with clear labels
- Featured items: User selects which to display
- No complex character customization in MVP (Phase 2 feature)

---

## 7. Quest Selection Flow

**Priority**: Critical  
**Complexity**: Medium

### Requirements

- User views available quests grouped by tier (Novice through Conqueror)
- Display 2-3 options per tier
- User selects one quest to accept
- Active quest displayed prominently on home page
- Timer shows time remaining
- User can mark quest as complete
- System validates completion and awards Glory + XP + Item

### Implementation Notes

- Quest pool rotates daily/weekly
- Only one active quest at a time in MVP
- Self-reported completion (honor system)
- Simple confirmation modal for completion
- Show Glory and XP rewards prominently in quest cards

---

## 8. Home Base (Dashboard)

**Priority**: High  
**Complexity**: Medium

### Requirements

- Display active quest (if any)
- Quick stats overview (Glory, XP, level, items)
- XP progress bar toward next level
- Navigation to other pages
- Call-to-action to start new quest if none active

### Implementation Notes

- Clean, motivating UI
- Progress indicators for both active quest and level progression
- Recent achievements/completions
- Prominent display of both Glory (currency) and Level (XP-based)

---

## 9. Basic Navigation

**Priority**: Critical  
**Complexity**: Low

### Pages Required

1. **Home Base**: Dashboard
2. **Quests**: Browse and accept quests
3. **Vault**: View collected items
4. **Character**: View profile and stats

### Implementation Notes

- Simple navigation bar or tab bar
- Mobile-responsive design
- Clear page transitions

---

## MVP Feature Summary

| Feature         | Priority | Complexity | Status         |
| --------------- | -------- | ---------- | -------------- |
| Authentication  | Critical | Low        | 🔲 Not Started |
| Quest System    | Critical | Medium     | 🔲 Not Started |
| Points System   | Critical | Low        | 🔲 Not Started |
| Item Rewards    | Critical | Medium     | 🔲 Not Started |
| Vault           | Critical | Low        | 🔲 Not Started |
| Character Page  | High     | Low        | 🔲 Not Started |
| Quest Selection | Critical | Medium     | 🔲 Not Started |
| Home Base       | High     | Medium     | 🔲 Not Started |
| Navigation      | Critical | Low        | 🔲 Not Started |

---

## Out of Scope for MVP

- AI-generated quests (use templates)
- Friends/social features
- Shop/marketplace (spending Glory)
- Item trading
- Quest refreshes/regeneration
- Location-based quests
- Group challenges
- Advanced character customization
- Multiple active quests
- Quest abandonment/extensions
- Variable Glory/XP rewards (fixed per tier in MVP)
