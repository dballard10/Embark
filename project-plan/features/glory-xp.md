# Glory & XP System Specification 💰⚡

## Overview

Embark uses a dual currency system: **Glory** (spendable currency) and **XP** (experience points for leveling). This separation creates clear progression paths—Glory for purchases and trading, XP for character advancement.

---

## Dual Currency Philosophy

### Why Two Currencies?

**Prevents Confusion**

- Clear distinction between "money" (Glory) and "progress" (XP)
- Users can't accidentally "spend" their level progress
- Separate progression and economy systems

**Creates Multiple Reward Paths**

- Glory = economic power (buy items, trade, shop)
- XP = character progression (unlock features, prestige)
- Both are valuable but serve different purposes

**Psychological Benefits**

- Always feel progression (even if saving Glory)
- Level ups feel earned, not bought
- Can't "pay to win" by spending XP

---

## Glory (Currency) 🏆

### Purpose

Glory is the primary spendable currency earned from completing quests.

**Uses**:

- Purchase items from shop
- Trade with other players (future)
- Buy quest refreshes (future)
- Marketplace transactions (future)
- Unlock cosmetic options (future)
- Convert duplicates (future)

### Glory Rewards by Quest Tier

| Tier | Quest Name | Glory Earned | Ratio to Next Tier |
| ---- | ---------- | ------------ | ------------------ |
| 1    | Novice     | 1,000        | Base               |
| 2    | Adventurer | 5,000        | 5x                 |
| 3    | Warrior    | 15,000       | 3x                 |
| 4    | Champion   | 50,000       | 3.33x              |
| 5    | Master     | 100,000      | 2x                 |
| 6    | Conqueror  | 500,000      | 5x                 |

### Glory Scaling Logic

**Why This Curve?**

- **Novice (1,000)**: Accessible starting point, feels achievable
- **Adventurer (5,000)**: 5x jump encourages tier progression
- **Warrior (15,000)**: Meaningful increase without overwhelming
- **Champion (50,000)**: Major milestone, feels prestigious
- **Master (100,000)**: Legendary amount, serious achievement
- **Conqueror (500,000)**: Epic reward for life-changing quests

**Time-to-Glory Ratio**:

- Novice: ~1,000 Glory/hour
- Adventurer: ~2,500-5,000 Glory/hour
- Warrior: ~2,000-5,000 Glory/hour
- Champion: ~3,000-6,000 Glory/hour
- Master: ~4,000-8,000 Glory/hour
- Conqueror: Variable (but always impressive)

### Glory Accumulation Examples

**Week 1** (Starting out)

```
Complete 5 Novice quests: 5,000 Glory
Complete 1 Adventurer quest: 5,000 Glory
Total: 10,000 Glory
```

**Month 1** (Building momentum)

```
10 Novice quests: 10,000 Glory
5 Adventurer quests: 25,000 Glory
2 Warrior quests: 30,000 Glory
Total: 65,000 Glory
```

**Month 3** (Experienced player)

```
3 Warrior quests: 45,000 Glory
2 Champion quests: 100,000 Glory
1 Master quest: 100,000 Glory
Total: 245,000 Glory
```

**Year 1** (Dedicated player)

```
Multiple quests across all tiers
Total: 1,000,000+ Glory
```

### Glory Display

**Format Options**:

- Comma separated: `45,000`
- Abbreviated: `45K`, `1.5M`
- Icon + Number: `🏆 45,000`

**UI Placement**:

- Home Base dashboard (prominently)
- Profile page
- Quest completion screen
- Shop interface
- Top navigation bar (always visible)

---

## XP (Experience Points) ⚡

### Purpose

XP is used exclusively for character leveling and cannot be spent or traded.

**Uses**:

- Level up your character
- Unlock level-based features (future)
- Prestige system (future)
- **Cannot be spent, traded, or lost**

### XP Rewards by Quest Tier

| Tier | Quest Name | XP Earned | Glory:XP Ratio |
| ---- | ---------- | --------- | -------------- |
| 1    | Novice     | 100       | 10:1           |
| 2    | Adventurer | 500       | 10:1           |
| 3    | Warrior    | 1,500     | 10:1           |
| 4    | Champion   | 5,000     | 10:1           |
| 5    | Master     | 10,000    | 10:1           |
| 6    | Conqueror  | 50,000    | 10:1           |

### Glory:XP Ratio

**Consistent 10:1 Ratio**

- For every 10 Glory earned, gain 1 XP
- Easy mental math for players
- Consistent across all tiers
- Simple to balance

### XP and Leveling

**Level Formula**

```typescript
Level = floor(totalXP / 10, 000);
```

**Level Requirements**:

- Level 1: 0 XP (starting level)
- Level 2: 10,000 XP
- Level 3: 20,000 XP
- Level 10: 100,000 XP
- Level 50: 500,000 XP
- Level 100: 1,000,000 XP (MAX LEVEL)

**XP to Next Level**

```typescript
(xpToNextLevel = (currentLevel + 1) * 10), 000 - currentXP;
```

**Level Progress Percentage**

```typescript
(levelProgress = (currentXP % 10, 000) / 10), 000 * 100;
```

### Leveling Examples

**Reaching Level 2** (10,000 XP)

- 100 Novice quests
- 20 Adventurer quests
- 7 Warrior quests
- 2 Champion quests
- 1 Master quest

**Reaching Level 10** (100,000 XP)

- 1,000 Novice quests
- 200 Adventurer quests
- 67 Warrior quests
- 20 Champion quests
- 10 Master quests
- 2 Conqueror quests

**Reaching Level 100** (1,000,000 XP - MAX)

- 10,000 Novice quests
- 2,000 Adventurer quests
- 667 Warrior quests
- 200 Champion quests
- 100 Master quests
- 20 Conqueror quests

**Realistic Mixed Path to Level 100**:

```
50 Novice: 5,000 XP
100 Adventurer: 50,000 XP
150 Warrior: 225,000 XP
100 Champion: 500,000 XP
20 Master: 200,000 XP
1 Conqueror: 50,000 XP
Total: 1,030,000 XP = Level 100+
```

### XP Display

**Always Show**:

- Current level
- Current XP
- XP to next level
- Progress bar

**Example Display**:

```
Level 5 Warrior
⚡ 48,500 / 60,000 XP (81%)
━━━━━━━━░░ 1,500 XP to Level 6
```

**UI Placement**:

- Character page (detailed)
- Home Base (progress bar)
- Profile page
- Post-quest completion screen

---

## Quest Reward Flow

### Complete Quest → Receive Rewards

```
User completes quest:
  "5K Run Challenge" (Warrior, Tier 3)

↓

Backend calculates rewards:
  Glory: 15,000
  XP: 1,500
  Item: "Battle Sword" (Rare)

↓

Update user record:
  total_glory += 15,000
  total_xp += 1,500
  Recalculate level

↓

Check level up:
  oldLevel = floor(oldXP / 10,000)
  newLevel = floor(newXP / 10,000)
  leveledUp = newLevel > oldLevel

↓

Display celebration screen:
  "Quest Complete! 🎉"
  "Earned: 15,000 Glory 🏆"
  "Gained: 1,500 XP ⚡"
  "Received: Battle Sword (Rare) ⚔️"
  [If leveledUp: "LEVEL UP! You are now Level 6!"]
```

---

## User Database Schema

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,

  -- Currency & Progression
  total_glory INTEGER DEFAULT 0 CHECK (total_glory >= 0),
  total_xp INTEGER DEFAULT 0 CHECK (total_xp >= 0),
  level INTEGER DEFAULT 1 CHECK (level >= 1 AND level <= 100),

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_level ON users(level);
CREATE INDEX idx_users_glory ON users(total_glory);
CREATE INDEX idx_users_xp ON users(total_xp);
```

---

## Calculation Functions

### TypeScript/JavaScript

```typescript
// Level calculation
function calculateLevel(totalXP: number): number {
  const level = Math.floor(totalXP / 10000);
  return Math.min(level, 100); // Cap at level 100
}

// XP needed for next level
function xpToNextLevel(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  if (currentLevel >= 100) return 0; // Max level
  const nextLevelXP = (currentLevel + 1) * 10000;
  return nextLevelXP - totalXP;
}

// Progress percentage to next level
function getLevelProgress(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  if (currentLevel >= 100) return 100; // Max level
  const xpInCurrentLevel = totalXP % 10000;
  return (xpInCurrentLevel / 10000) * 100;
}

// Check if max level reached
function isMaxLevel(totalXP: number): boolean {
  return totalXP >= 1000000; // Level 100
}

// Check if level up occurred
function didLevelUp(oldXP: number, newXP: number): boolean {
  const oldLevel = calculateLevel(oldXP);
  const newLevel = calculateLevel(newXP);
  return newLevel > oldLevel;
}

// Calculate levels gained
function levelsGained(oldXP: number, newXP: number): number {
  const oldLevel = calculateLevel(oldXP);
  const newLevel = calculateLevel(newXP);
  return Math.max(0, newLevel - oldLevel);
}
```

---

## Glory Economy (Future)

### Shop Pricing Guidelines

**Common Items** (Tier 1)

- Price range: 500 - 2,000 Glory
- Accessible to all players
- Equivalent to 1 Novice quest

**Uncommon Items** (Tier 2)

- Price range: 3,000 - 8,000 Glory
- Require some progression
- Equivalent to 1-2 Adventurer quests

**Rare Items** (Tier 3)

- Price range: 10,000 - 25,000 Glory
- Mid-tier commitment
- Equivalent to 1-2 Warrior quests

**Epic Items** (Tier 4)

- Price range: 30,000 - 75,000 Glory
- Significant investment
- Equivalent to 1-2 Champion quests

**Legendary Items** (Tier 5)

- Price range: 80,000 - 150,000 Glory
- Major purchase decision
- Equivalent to 1-2 Master quests

**Godly Items** (Tier 6)

- NOT available for purchase
- Only from Conqueror quests
- Maintains prestige and exclusivity

### Glory Sinks (Future)

Ways to spend Glory:

1. **Shop purchases**: Buy cosmetic items
2. **Quest refreshes**: Reroll quest options (1,000 Glory)
3. **Vault expansion**: More storage space
4. **Loadout slots**: Save more champion loadouts (5,000 Glory each)
5. **Color dyes**: Recolor items (2,000-10,000 Glory)
6. **Marketplace fees**: Trading tax (5% of trade value)
7. **Premium features**: Unlock QoL improvements
8. **Gifting**: Send Glory to friends

### Inflation Control

**Preventing Glory Devaluation**:

- Limited shop inventory (scarcity)
- Rotating items (FOMO)
- Glory sinks for convenience features
- No Glory generation without quests
- Trading taxes
- Level-based shop unlocks

---

## Level-Based Unlocks (Future)

### Features Unlocked by Level

**Level 5**:

- Friend system unlocked
- Social features available

**Level 10**:

- Shop unlocked
- Can purchase items with Glory

**Level 20**:

- Trading unlocked
- Can trade items with friends

**Level 30**:

- Multiple active quests (2)
- Champion customization unlocked

**Level 50**:

- Marketplace unlocked
- Advanced features
- Prestige system available

**Level 75**:

- Multiple active quests (3)
- Elite features

**Level 100** (MAX):

- Prestige option
- Max level badge
- Exclusive cosmetics
- "Ascended" title

---

## Prestige System (Future)

### Concept

After reaching Level 100, users can "Prestige" (reset to Level 1) for permanent bonuses.

**What Resets**:

- Level → back to 1
- XP → back to 0

**What Keeps**:

- All Glory (currency remains)
- All items (Vault stays)
- All unlocked features
- All quest history

**What Gains**:

- Prestige level (P1, P2, P3...)
- +5% Glory bonus per prestige level
- +5% XP bonus per prestige level
- Exclusive prestige cosmetics
- Special prestige titles
- Unique prestige auras

**Example**:

```
User reaches Level 100 (1,000,000 XP)
Chooses to Prestige
Becomes Prestige 1, Level 1 (0 XP)
Now earns 105% Glory and XP
Can display "Prestige 1" badge
Unlocks special P1 cosmetics
```

---

## Daily/Weekly Bonuses (Future)

### Daily First Quest Bonus

- +50% Glory on first quest each day
- +50% XP on first quest each day
- Encourages daily engagement

### Weekly Challenges

- Complete 10 quests this week: Bonus 10,000 Glory
- Complete 1 quest per day for 7 days: Bonus 5,000 XP
- Complete a Champion or higher quest: Bonus item

### Streak Bonuses

- 7-day streak: +20% Glory/XP
- 30-day streak: +50% Glory/XP
- 100-day streak: Exclusive badge + cosmetic

---

## Leaderboards

### Glory Leaderboards

- Top Glory earners (all-time)
- Top Glory earners (this month)
- Glory earned this week

### XP/Level Leaderboards

- Highest level players
- Fastest levelers (time to 100)
- Most XP gained this month

### Quest Completion Leaderboards

- Most quests completed
- Most Conqueror quests completed
- Highest completion rate

---

## UI/UX Guidelines

### Always Display

**Home Base**:

- Current Glory (prominent)
- Current Level with XP bar
- Both should be always visible

**Profile Page**:

- Total Glory earned (lifetime)
- Current Glory (spendable)
- Total XP earned
- Current level
- Progress to next level
- XP needed for next level

**Quest Completion**:

- Glory earned (animated count-up)
- XP earned (animated count-up)
- Level up notification (if applicable)
- Item received

### Celebration Animations

**Quest Complete**:

- Glory icon animates in with +value
- XP bar fills with gained XP
- Item appears with rarity glow

**Level Up**:

- Full screen celebration
- "LEVEL UP!" text with animation
- New level badge
- Fanfare sound
- Confetti particles
- Option to share achievement

**Max Level (100)**:

- Special golden animation
- "MAX LEVEL REACHED!" banner
- Prestige option presented
- Extra celebration effects

---

## Balance Considerations

### Glory to Time Ratio

**Target**: 2,000-5,000 Glory per hour of real-world effort

**Why This Matters**:

- Players should feel adequately rewarded
- Time investment should feel worthwhile
- Shop prices should align with earning rate
- Prevents burnout or frustration

### XP to Level Curve

**Linear Progression**: Each level requires same XP (10,000)

**Benefits**:

- Easy to understand
- Predictable progression
- No "grind wall" at high levels
- Consistent sense of progress

**Alternative**: Could do exponential (future consideration)

### Reward Tuning

**Monitor**:

- Average Glory per user per week
- Average level reached
- Time to hit major milestones (Level 10, 50, 100)
- Quest completion rates by tier
- Glory economy inflation/deflation

**Adjust if needed**:

- Increase/decrease Glory rewards
- Adjust XP requirements per level
- Modify shop prices
- Add/remove Glory sinks

---

## Success Metrics

### Engagement

- Average Glory earned per user per day
- Average XP earned per user per day
- Level distribution (how many at each level)
- Time to reach Level 10, 50, 100

### Economy Health

- Glory inflation/deflation rate
- Average Glory balance per user
- Shop purchase frequency
- Glory sink effectiveness

### Progression

- % of users at each level bracket
- Level up frequency
- Prestige adoption rate (future)
- Retention by level

---

**Last Updated**: October 8, 2025
