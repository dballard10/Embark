# Data Models & Database Schema

This document defines the database schema, data types, and relationships for the Embark platform.

---

## Database Schema Overview

### 🧩 MVP Tables

1. `users` - User accounts and profile data
2. `quests` - Available quests
3. `user_completed_quests` - Quest completion history
4. `rewards` - Item definitions
5. `user_items` - User's item inventory

### 🚀 Future Tables

6. `friendships` - Friend connections
7. `user_achievements` - Achievement tracking
8. `shop_items` - Shop inventory
9. `marketplace_listings` - User-to-user trades
10. `group_challenges` - Multi-user quests
11. `notifications` - User notifications
12. `quest_categories` - Challenge categorization

---

## 🧩 MVP Table Definitions

### 1. users

Stores user account information and profile data.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  location VARCHAR(255),
  total_glory INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_level ON users(level);
CREATE INDEX idx_users_glory ON users(total_glory);
```

**TypeScript Interface**:

```typescript
interface User {
  id: string;
  email: string;
  username: string;
  location?: string;
  totalGlory: number;
  totalXP: number;
  level: number;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}
```

**Business Rules**:

- Username must be 3-50 characters, alphanumeric + underscores
- Email must be valid format
- Level calculated: `level = floor(totalXP / 10000)`
- Users start at **Level 1** (0 XP)
- **Level cap: 100** (requires 1,000,000 XP)
- Total Glory and XP cannot be negative
- Glory is spendable currency (shop, trading)
- XP is only for character leveling (non-spendable)

---

### 2. quests

Stores quest definitions.

```sql
CREATE TABLE quests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tier INTEGER NOT NULL, -- 1-6 (Novice to Conqueror)
  tier_name VARCHAR(20) NOT NULL, -- 'novice', 'adventurer', 'warrior', 'champion', 'master', 'conqueror'
  glory_reward INTEGER NOT NULL,
  xp_reward INTEGER NOT NULL,
  time_limit_hours INTEGER NOT NULL,
  category VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  reward_item_id UUID REFERENCES rewards(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT valid_tier CHECK (tier BETWEEN 1 AND 6),
  CONSTRAINT valid_tier_name CHECK (tier_name IN ('novice', 'adventurer', 'warrior', 'champion', 'master', 'conqueror')),
  CONSTRAINT positive_glory CHECK (glory_reward > 0),
  CONSTRAINT positive_xp CHECK (xp_reward > 0),
  CONSTRAINT positive_time CHECK (time_limit_hours > 0)
);

-- Indexes
CREATE INDEX idx_quests_tier ON quests(tier);
CREATE INDEX idx_quests_active ON quests(is_active);
CREATE INDEX idx_quests_category ON quests(category);
```

**TypeScript Interface**:

```typescript
type QuestTier = 1 | 2 | 3 | 4 | 5 | 6;
type QuestTierName =
  | "novice"
  | "adventurer"
  | "warrior"
  | "champion"
  | "master"
  | "conqueror";

interface Quest {
  id: string;
  title: string;
  description: string;
  tier: QuestTier;
  tierName: QuestTierName;
  gloryReward: number;
  xpReward: number;
  timeLimitHours: number;
  category?: string;
  isActive: boolean;
  rewardItemId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Sample Data**:

```typescript
// Novice (Tier 1: 1⭐)
{
  title: "Morning Walk",
  description: "Take a 30-minute walk",
  tier: 1,
  tierName: "novice",
  gloryReward: 1000,
  xpReward: 100,
  timeLimitHours: 24,
  category: "Fitness"
}

// Adventurer (Tier 2: 2⭐)
{
  title: "Culinary Explorer",
  description: "Cook a new recipe you've never tried before",
  tier: 2,
  tierName: "adventurer",
  gloryReward: 5000,
  xpReward: 500,
  timeLimitHours: 48,
  category: "Cooking"
}

// Warrior (Tier 3: 3⭐)
{
  title: "5K Challenge",
  description: "Complete a 5K run",
  tier: 3,
  tierName: "warrior",
  gloryReward: 15000,
  xpReward: 1500,
  timeLimitHours: 168,
  category: "Fitness"
}

// Champion (Tier 4: 4⭐)
{
  title: "Master Builder",
  description: "Complete a 500+ piece Lego set",
  tier: 4,
  tierName: "champion",
  gloryReward: 50000,
  xpReward: 5000,
  timeLimitHours: 336,
  category: "Building"
}

// Master (Tier 5: 5⭐)
{
  title: "Cube Master",
  description: "Learn to solve a Rubik's cube in under 2 minutes",
  tier: 5,
  tierName: "master",
  gloryReward: 100000,
  xpReward: 10000,
  timeLimitHours: 672,
  category: "Skill"
}

// Conqueror (Tier 6: 6🔥⭐)
{
  title: "World Explorer",
  description: "Travel to a new country and complete 3 local activities",
  tier: 6,
  tierName: "conqueror",
  gloryReward: 500000,
  xpReward: 50000,
  timeLimitHours: 4320,
  category: "Travel"
}
```

---

### 3. user_completed_quests

Tracks user's quest completion history.

```sql
CREATE TABLE user_completed_quests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quest_id UUID NOT NULL REFERENCES quests(id),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  deadline_at TIMESTAMP WITH TIME ZONE NOT NULL,
  glory_earned INTEGER NOT NULL,
  xp_earned INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,

  UNIQUE(user_id, quest_id, started_at)
);

-- Indexes
CREATE INDEX idx_ucq_user_id ON user_completed_quests(user_id);
CREATE INDEX idx_ucq_quest_id ON user_completed_quests(quest_id);
CREATE INDEX idx_ucq_active ON user_completed_quests(is_active);
CREATE INDEX idx_ucq_completed_at ON user_completed_quests(completed_at);
```

**TypeScript Interface**:

```typescript
interface UserCompletedQuest {
  id: string;
  userId: string;
  questId: string;
  startedAt: Date;
  completedAt?: Date;
  deadlineAt: Date;
  gloryEarned: number;
  xpEarned: number;
  isActive: boolean;
}
```

**Business Rules**:

- `deadline_at = started_at + quest.time_limit_hours`
- User can only have one active quest at a time (MVP)
- Completing a quest sets `is_active = false` and updates `completed_at`
- Glory and XP are awarded only upon completion
- Glory is added to `users.total_glory` (spendable)
- XP is added to `users.total_xp` (leveling only)
- Level recalculated: `level = floor(total_xp / 10000)`

---

### 4. rewards

Defines collectible items.

```sql
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  rarity_tier VARCHAR(20) NOT NULL,
  rarity_stars INTEGER NOT NULL,
  image_url TEXT,
  category VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT valid_rarity CHECK (
    rarity_tier IN ('common', 'uncommon', 'rare', 'epic', 'legendary', 'godly')
  ),
  CONSTRAINT valid_stars CHECK (rarity_stars BETWEEN 1 AND 6)
);

-- Indexes
CREATE INDEX idx_rewards_rarity ON rewards(rarity_tier);
CREATE INDEX idx_rewards_stars ON rewards(rarity_stars);
CREATE INDEX idx_rewards_category ON rewards(category);
```

**TypeScript Interface**:

```typescript
type RarityTier =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary"
  | "godly";

interface Reward {
  id: string;
  name: string;
  description?: string;
  rarityTier: RarityTier;
  rarityStars: number; // 1-6
  imageUrl?: string;
  category?: string;
  createdAt: Date;
}

// Rarity color mapping (matches quest tiers)
const RARITY_COLORS: Record<RarityTier, string> = {
  common: "#FFFFFF", // White (1⭐)
  uncommon: "#4CAF50", // Green (2⭐)
  rare: "#2196F3", // Blue (3⭐)
  epic: "#9C27B0", // Purple (4⭐)
  legendary: "#FF9800", // Gold (5⭐)
  godly: "#F44336", // Red + Flame animation (6🔥⭐)
};
```

**Rarity Distribution** (matches quest tiers):

- Common (1⭐): Novice quests
- Uncommon (2⭐): Adventurer quests
- Rare (3⭐): Warrior quests
- Epic (4⭐): Champion quests
- Legendary (5⭐): Master quests
- Godly (6🔥⭐): Conqueror quests (red with flame animation)

---

### 5. user_items

Tracks items in user's inventory.

```sql
CREATE TABLE user_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES rewards(id),
  acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT false,

  -- Allow duplicate items
  -- UNIQUE constraint removed to allow multiple copies
);

-- Indexes
CREATE INDEX idx_user_items_user_id ON user_items(user_id);
CREATE INDEX idx_user_items_item_id ON user_items(item_id);
CREATE INDEX idx_user_items_featured ON user_items(user_id, is_featured);
```

**TypeScript Interface**:

```typescript
interface UserItem {
  id: string;
  userId: string;
  itemId: string;
  acquiredAt: Date;
  isFeatured: boolean;
  // Populated via join
  item?: Reward;
}

// Vault display interface
interface VaultItem extends UserItem {
  item: Reward;
  count: number; // If grouping duplicates
}
```

**Business Rules**:

- User can have multiple copies of the same item
- Maximum 5 featured items per user (displayed on profile)
- Featured items sorted by rarity, then acquisition date

---

## Computed Fields & Calculations

### User Level Calculation

```typescript
function calculateLevel(totalXP: number): number {
  const level = Math.floor(totalXP / 10000);
  return Math.min(level, 100); // Cap at level 100
}

function xpToNextLevel(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  if (currentLevel >= 100) return 0; // Max level reached
  const nextLevelXP = (currentLevel + 1) * 10000;
  return nextLevelXP - totalXP;
}

function getLevelProgress(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  if (currentLevel >= 100) return 100; // Max level
  const xpInCurrentLevel = totalXP % 10000;
  return (xpInCurrentLevel / 10000) * 100; // percentage
}

function isMaxLevel(totalXP: number): boolean {
  return totalXP >= 1000000; // Level 100 cap
}
```

### Quest Progress

```typescript
function getQuestTimeRemaining(quest: UserCompletedQuest): number {
  const now = new Date();
  const timeRemaining = quest.deadlineAt.getTime() - now.getTime();
  return Math.max(0, timeRemaining); // milliseconds
}

function isQuestExpired(quest: UserCompletedQuest): boolean {
  return new Date() > quest.deadlineAt;
}

function getQuestTierName(tier: number): string {
  const tierNames = [
    "novice",
    "adventurer",
    "warrior",
    "champion",
    "master",
    "conqueror",
  ];
  return tierNames[tier - 1] || "unknown";
}
```

---

## 🚀 Future Table Definitions

### 6. friendships

```sql
CREATE TABLE friendships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  friend_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,

  CONSTRAINT valid_friendship CHECK (user_id != friend_id),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'accepted', 'blocked')),
  UNIQUE(user_id, friend_id)
);

CREATE INDEX idx_friendships_user ON friendships(user_id);
CREATE INDEX idx_friendships_status ON friendships(user_id, status);
```

---

### 7. user_achievements

```sql
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_code VARCHAR(50) NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, achievement_code)
);

CREATE INDEX idx_achievements_user ON user_achievements(user_id);
```

**Achievement Examples**:

- `FIRST_QUEST`: Complete your first quest
- `LEVEL_10`: Reach level 10
- `COLLECTOR_50`: Collect 50 items
- `RARE_HUNTER`: Collect 10 rare items
- `STREAK_7`: Complete quests for 7 days in a row

---

### 8. shop_items

```sql
CREATE TABLE shop_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID NOT NULL REFERENCES rewards(id),
  price_points INTEGER NOT NULL,
  stock_quantity INTEGER,
  is_available BOOLEAN DEFAULT true,
  available_from TIMESTAMP WITH TIME ZONE,
  available_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT positive_price CHECK (price_points > 0)
);

CREATE INDEX idx_shop_available ON shop_items(is_available);
```

---

### 9. marketplace_listings

```sql
CREATE TABLE marketplace_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL REFERENCES users(id),
  user_item_id UUID NOT NULL REFERENCES user_items(id),
  price_points INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sold_at TIMESTAMP WITH TIME ZONE,
  buyer_id UUID REFERENCES users(id),

  CONSTRAINT valid_listing_status CHECK (
    status IN ('active', 'sold', 'cancelled')
  )
);

CREATE INDEX idx_marketplace_status ON marketplace_listings(status);
```

---

### 10. group_challenges

```sql
CREATE TABLE group_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenge_id UUID NOT NULL REFERENCES challenges(id),
  creator_id UUID NOT NULL REFERENCES users(id),
  max_participants INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'recruiting',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,

  CONSTRAINT valid_group_status CHECK (
    status IN ('recruiting', 'active', 'completed', 'failed')
  )
);

CREATE TABLE group_challenge_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_challenge_id UUID NOT NULL REFERENCES group_challenges(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,

  UNIQUE(group_challenge_id, user_id)
);
```

---

### 11. notifications

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  data JSONB,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read);
```

---

## API Response DTOs

### User Profile Response

```typescript
interface UserProfileDTO {
  user: {
    id: string;
    username: string;
    level: number;
    totalGlory: number;
    totalXP: number;
    xpToNextLevel: number;
    levelProgress: number; // percentage
    location?: string;
    avatarUrl?: string;
    memberSince: Date;
  };
  stats: {
    totalItems: number;
    totalQuestsCompleted: number;
    currentStreak: number;
  };
  featuredItems: VaultItem[];
}
```

### Quest List Response

```typescript
interface QuestListDTO {
  questsByTier: {
    novice: Quest[];
    adventurer: Quest[];
    warrior: Quest[];
    champion: Quest[];
    master: Quest[];
    conqueror: Quest[];
  };
  userActiveQuest?: {
    quest: Quest;
    progress: UserCompletedQuest;
    timeRemaining: number;
  };
}
```

### Quest Completion Response

```typescript
interface QuestCompletionDTO {
  success: true;
  reward: {
    glory: number;
    xp: number;
    item: Reward;
    leveledUp: boolean;
    newLevel?: number; // If leveled up
    previousLevel?: number; // If leveled up
  };
  updatedUser: {
    totalGlory: number;
    totalXP: number;
    level: number;
    xpToNextLevel: number;
  };
}
```

---

## Data Validation Rules

### Username

- 3-50 characters
- Alphanumeric, underscores, hyphens only
- Case-insensitive uniqueness
- No offensive words (check against blocklist)

### Quest Title/Description

- Title: 5-255 characters
- Description: 10-2000 characters
- No HTML tags allowed
- Basic profanity filter

### Item Names

- 3-100 characters
- Can include special characters (emojis)
- Unique per category

### Glory & XP

- Always positive integers
- Maximum single Glory reward: 500,000 (Conqueror tier)
- Maximum single XP reward: 50,000 (Conqueror tier)
- Maximum user Glory: 2^31 - 1 (INT max)
- Maximum user XP: 2^31 - 1 (INT max)
- Glory is spendable; XP is not

---

## Database Migrations Strategy

### Initial Migration (MVP)

```bash
migrations/
├── 001_create_users.sql
├── 002_create_quests.sql
├── 003_create_rewards.sql
├── 004_create_user_items.sql
├── 005_create_user_completed_quests.sql
└── 006_seed_initial_data.sql
```

### Migration Best Practices

- Never modify existing migrations
- Always add new migrations for schema changes
- Use transactions for data migrations
- Test migrations on staging before production
- Keep rollback scripts for each migration

---

## Database Optimization

### 🧩 MVP Indexes

```sql
-- Users
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_level ON users(level);

-- Quests
CREATE INDEX idx_quests_tier ON quests(tier);
CREATE INDEX idx_quests_active ON quests(is_active);

-- User Completed Quests
CREATE INDEX idx_ucq_user_id ON user_completed_quests(user_id);
CREATE INDEX idx_ucq_active ON user_completed_quests(is_active);

-- User Items
CREATE INDEX idx_user_items_user_id ON user_items(user_id);
CREATE INDEX idx_user_items_featured ON user_items(user_id, is_featured);
```

### 🚀 Future Optimizations

- Materialized views for leaderboards
- Partitioning for user_completed_quests (by date)
- Full-text search indexes for quest descriptions
- BRIN indexes for timestamp columns
- Partial indexes for frequently filtered data

---

## Supabase-Specific Features

### Row Level Security (RLS)

```sql
-- Users can only read their own data
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- User items are private
ALTER TABLE user_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own items"
  ON user_items FOR SELECT
  USING (auth.uid() = user_id);
```

### Real-Time Subscriptions

```typescript
// Subscribe to user's active quest updates
const subscription = supabase
  .from("user_completed_quests")
  .on("UPDATE", (payload) => {
    // Handle real-time updates
  })
  .subscribe();
```

---

**Last Updated**: October 8, 2025
