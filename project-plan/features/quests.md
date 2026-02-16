# Quest System Specification 🗺️

## Overview

The Quest System is the core gameplay loop of Embark. Users complete real-world activities (quests) to earn Glory, XP, and item rewards. Quests are organized into 6 difficulty tiers, each with themed rewards and time commitments.

---

## Quest Tiers

### 6-Tier Difficulty System

| Tier | Stars      | Name           | Glory   | XP     | Time Estimate | Theme               |
| ---- | ---------- | -------------- | ------- | ------ | ------------- | ------------------- |
| 1    | ⭐         | **Novice**     | 1,000   | 100    | Hours         | Beginner, simple    |
| 2    | ⭐⭐       | **Adventurer** | 5,000   | 500    | 1-2 Days      | Exploration, trying |
| 3    | ⭐⭐⭐     | **Warrior**    | 15,000  | 1,500  | 3-7 Days      | Challenge, effort   |
| 4    | ⭐⭐⭐⭐   | **Master**     | 50,000  | 5,000  | 1-2 Weeks     | Dedication, skill   |
| 5    | ⭐⭐⭐⭐⭐ | **Champion**   | 100,000 | 10,000 | 2-4 Weeks     | Mastery, commitment |
| 6    | 🔥⭐       | **Conqueror**  | 500,000 | 50,000 | Months        | Epic, life-changing |

---

## Quest Structure

### Core Quest Properties

```typescript
interface Quest {
  id: string;
  title: string;
  description: string;
  tier: QuestTier; // 1-6
  tierName: QuestTierName; // 'novice' | 'adventurer' | 'warrior' | 'champion' | 'master' | 'conqueror'
  gloryReward: number;
  xpReward: number;
  timeLimitHours: number;
  category: QuestCategory;
  rewardItemId: string;
  isActive: boolean;
  difficulty: string; // User-friendly description
  requiresProof?: boolean; // Future: photo/verification
  prerequisites?: string[]; // Future: quest chains
  tags?: string[]; // e.g., ['outdoor', 'social', 'creative']
  estimatedCost?: number; // Optional cost estimate in dollars
  locationBased?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Quest Categories

### Primary Categories

1. **Fitness & Health**

   - Exercise, running, sports, yoga, meditation
   - Examples: "Run 5K", "30-day yoga challenge"

2. **Learning & Education**

   - Reading, courses, languages, skills
   - Examples: "Read 3 books this month", "Complete online course"

3. **Creativity & Arts**

   - Drawing, music, writing, crafting
   - Examples: "Write a short story", "Paint a landscape"

4. **Building & Making**

   - Construction, DIY, crafts, models
   - Examples: "Build a Lego set", "Create a piece of furniture"

5. **Social & Community**

   - Volunteering, social events, helping others
   - Examples: "Volunteer 10 hours", "Host a dinner party"

6. **Adventure & Travel**

   - Exploring, hiking, visiting new places
   - Examples: "Visit 5 new restaurants", "Hike to mountain peak"

7. **Professional & Career**

   - Work projects, networking, skill building
   - Examples: "Complete major project", "Attend 3 networking events"

8. **Hobbies & Leisure**

   - Gaming, puzzles, collections, relaxation
   - Examples: "Complete 1000-piece puzzle", "Beat challenging video game"

9. **Home & Organization**

   - Cleaning, organizing, home improvement
   - Examples: "Organize entire closet", "Deep clean house"

10. **Personal Growth**
    - Meditation, journaling, habit building
    - Examples: "30-day journaling streak", "Break a bad habit"

---

## Quest Examples by Tier

### Tier 1: Novice (1⭐)

**Theme**: Quick, accessible activities anyone can do today

```javascript
{
  title: "Morning Walk",
  description: "Take a 30-minute walk outside and enjoy nature",
  tier: 1,
  gloryReward: 1000,
  xpReward: 100,
  timeLimitHours: 24,
  category: "Fitness & Health"
}

{
  title: "Gratitude Journal",
  description: "Write down 5 things you're grateful for today",
  tier: 1,
  gloryReward: 1000,
  xpReward: 100,
  timeLimitHours: 24,
  category: "Personal Growth"
}

{
  title: "Organize Desk",
  description: "Clean and organize your workspace completely",
  tier: 1,
  gloryReward: 1000,
  xpReward: 100,
  timeLimitHours: 24,
  category: "Home & Organization"
}
```

### Tier 2: Adventurer (2⭐)

**Theme**: Try something new, step outside comfort zone

```javascript
{
  title: "Cook New Recipe",
  description: "Find and cook a recipe you've never tried before",
  tier: 2,
  gloryReward: 5000,
  xpReward: 500,
  timeLimitHours: 48,
  category: "Creativity & Arts"
}

{
  title: "Visit Museum",
  description: "Spend 2+ hours exploring a museum in your area",
  tier: 2,
  gloryReward: 5000,
  xpReward: 500,
  timeLimitHours: 72,
  category: "Adventure & Travel"
}

{
  title: "Learn 20 Words",
  description: "Learn 20 new words in a foreign language and use them",
  tier: 2,
  gloryReward: 5000,
  xpReward: 500,
  timeLimitHours: 48,
  category: "Learning & Education"
}
```

### Tier 3: Warrior (3⭐)

**Theme**: Sustained effort, building discipline

```javascript
{
  title: "5K Run Challenge",
  description: "Complete a full 5K run (3.1 miles) without stopping",
  tier: 3,
  gloryReward: 15000,
  xpReward: 1500,
  timeLimitHours: 168, // 1 week
  category: "Fitness & Health"
}

{
  title: "Read Complete Book",
  description: "Read an entire book from cover to cover (200+ pages)",
  tier: 3,
  gloryReward: 15000,
  xpReward: 1500,
  timeLimitHours: 168,
  category: "Learning & Education"
}

{
  title: "7-Day Meditation",
  description: "Meditate for 15 minutes every day for 7 consecutive days",
  tier: 3,
  gloryReward: 15000,
  xpReward: 1500,
  timeLimitHours: 168,
  category: "Personal Growth"
}
```

### Tier 4: Champion (4⭐)

**Theme**: Significant achievement, dedication required

```javascript
{
  title: "Master Builder",
  description: "Complete a 500+ piece Lego or model set with perfect assembly",
  tier: 4,
  gloryReward: 50000,
  xpReward: 5000,
  timeLimitHours: 336, // 2 weeks
  category: "Building & Making"
}

{
  title: "Fitness Transformation",
  description: "Complete a 30-day fitness program with documented progress",
  tier: 4,
  gloryReward: 50000,
  xpReward: 5000,
  timeLimitHours: 720, // 30 days
  category: "Fitness & Health"
}

{
  title: "Major Project",
  description: "Complete a major work or personal project you've been delaying",
  tier: 4,
  gloryReward: 50000,
  xpReward: 5000,
  timeLimitHours: 336,
  category: "Professional & Career"
}
```

### Tier 5: Master (5⭐)

**Theme**: Mastery, significant time investment

```javascript
{
  title: "Rubik's Cube Master",
  description: "Learn to solve a Rubik's cube in under 2 minutes consistently",
  tier: 5,
  gloryReward: 100000,
  xpReward: 10000,
  timeLimitHours: 672, // 4 weeks
  category: "Hobbies & Leisure"
}

{
  title: "Creative Masterpiece",
  description: "Create and complete a significant art project (painting, novel chapter, music composition)",
  tier: 5,
  gloryReward: 100000,
  xpReward: 10000,
  timeLimitHours: 720,
  category: "Creativity & Arts"
}

{
  title: "Language Milestone",
  description: "Reach conversational level in a new language (100+ hours study)",
  tier: 5,
  gloryReward: 100000,
  xpReward: 10000,
  timeLimitHours: 1440, // 60 days
  category: "Learning & Education"
}
```

### Tier 6: Conqueror (6🔥⭐)

**Theme**: Life-changing, epic achievements

```javascript
{
  title: "World Explorer",
  description: "Travel to a new country and complete 3 unique local experiences",
  tier: 6,
  gloryReward: 500000,
  xpReward: 50000,
  timeLimitHours: 4320, // 6 months
  category: "Adventure & Travel"
}

{
  title: "Marathon Finisher",
  description: "Train for and complete a full marathon (26.2 miles)",
  tier: 6,
  gloryReward: 500000,
  xpReward: 50000,
  timeLimitHours: 4320,
  category: "Fitness & Health"
}

{
  title: "Publish Your Work",
  description: "Write and publish a book, album, or major creative work",
  tier: 6,
  gloryReward: 500000,
  xpReward: 50000,
  timeLimitHours: 8760, // 1 year
  category: "Creativity & Arts"
}
```

---

## Quest Selection Flow

### 🧩 MVP Implementation

**Single Active Quest**

- User can only have 1 active quest at a time
- Must complete or abandon before accepting new quest
- Keeps focus, prevents overwhelm

**Quest Pool**

- 2-3 quests available per tier (18 total displayed)
- Rotates daily or weekly
- Mix of categories to provide variety

**Selection Process**

1. User navigates to Quest Browser
2. Views quests grouped by tier
3. Clicks quest to see full details
4. Accepts quest (creates user_completed_quests record)
5. Quest timer starts, deadline calculated
6. Quest displayed on Home Base dashboard

### 🚀 Future Enhancements

**Multiple Active Quests**

- Allow 2-3 simultaneous quests (Phase 2)
- One per tier level (e.g., 1 easy + 1 medium + 1 hard)
- Helps users balance different types of activities

**Quest Refresh System**

- Limited "refreshes" to regenerate quest options
- Earn refreshes through achievements or purchase with Glory
- Prevents endless rerolling

**Quest Preferences**

- Set preferred categories
- AI learns from completion patterns
- Personalized quest recommendations

---

## Quest Completion

### 🧩 MVP: Self-Reported (Honor System)

**Flow**:

1. User completes real-world activity
2. Returns to app, clicks "Complete Quest"
3. Confirmation modal: "Did you complete [Quest Title]?"
4. User confirms
5. Backend validates:
   - Quest belongs to user
   - Quest is active
   - Not already completed
6. Award Glory + XP + Item
7. Update user totals and level
8. Display celebration screen

**Business Rules**:

- One-time completion per quest per user
- Must complete before deadline
- No partial credit (all or nothing)

### 🚀 Future: Verification System

**Proof Options**:

- Photo upload (for visual quests)
- GPS check (for location quests)
- Third-party integration (Strava, Goodreads, etc.)
- Friend verification (witness)
- Time tracking (for duration quests)

**Moderation**:

- Community reporting
- AI image analysis
- Manual review for high-tier quests
- Reputation system

---

## Quest Generation

### 🧩 MVP: Pre-Defined Templates

**Approach**:

- 100-200 hand-crafted quests
- Cover all tiers and categories
- Ensure quality and safety
- Regular rotation

**Quest Bank Structure**:

```
Tier 1 (Novice): 30 quests
Tier 2 (Adventurer): 25 quests
Tier 3 (Warrior): 20 quests
Tier 4 (Champion): 15 quests
Tier 5 (Master): 10 quests
Tier 6 (Conqueror): 5 quests
```

### 🚀 Phase 2: AI-Generated Quests

**LLM Integration**:

- OpenAI GPT-4 or similar
- Generate quests based on:
  - User location
  - Past completions
  - Preferred categories
  - Difficulty preferences
  - Current season/events

**Prompt Template**:

```
Generate a [TIER] difficulty quest for a user interested in [CATEGORIES].
The quest should:
- Be completable in [TIME_ESTIMATE]
- Match the theme: [TIER_THEME]
- Be safe and achievable
- Provide clear success criteria
- Be located near [USER_LOCATION] if applicable

Output format: {title, description, category, estimated_time}
```

**Safety & Quality**:

- AI output validation
- Profanity filter
- Dangerous activity detection
- Manual review for first-time generation
- User reporting system

---

## Quest States

### State Machine

```
┌─────────────┐
│  AVAILABLE  │ ← Quest in pool, not started
└──────┬──────┘
       │ (User accepts)
       ▼
┌─────────────┐
│   ACTIVE    │ ← User working on quest
└──────┬──────┘
       │
       ├──→ (Completes) → COMPLETED → Rewards granted
       ├──→ (Expires) → EXPIRED → No rewards
       └──→ (Abandons) → ABANDONED → Quest returns to pool
```

### Status Indicators

**Available** 🟢

- Shown in Quest Browser
- Can be accepted

**Active** 🔵

- One per user (MVP)
- Timer counting down
- Displayed on Home Base

**Completed** ✅

- Quest finished successfully
- Rewards granted
- Added to history

**Expired** ⏰

- Deadline passed without completion
- Quest removed from active
- Small penalty (future: -10% Glory from next quest)

**Abandoned** 🚫

- User voluntarily quits quest
- Quest returns to available pool
- Cooldown before re-acceptance (24 hours)

---

## Quest Chains (Future)

### Sequential Quests

**Concept**: Complete one quest to unlock the next

**Example Chain**: "Fitness Journey"

1. Novice: "Walk 10,000 steps"
2. Adventurer: "Run 1 mile without stopping"
3. Warrior: "Complete a 5K"
4. Champion: "Run 10K"
5. Master: "Half Marathon"
6. Conqueror: "Full Marathon"

**Benefits**:

- Guided progression
- Story-like narrative
- Increased engagement
- Clear path to improvement

---

## Special Quest Types (Future)

### Daily Quests

- Simple, quick activities (15-30 min)
- Reset every 24 hours
- Small rewards but consistent
- Build daily login habit

### Weekly Quests

- Medium difficulty (1-2 hours)
- Reset every 7 days
- Better rewards than daily
- Encourage weekly engagement

### Seasonal/Event Quests

- Time-limited (1-4 weeks)
- Themed (Halloween, New Year, Summer)
- Exclusive rewards
- Unique cosmetics

### Mystery Quests

- Hidden reward until completion
- Higher risk/reward
- Could be any tier
- Adds excitement and surprise

### Group Quests

- Complete with friends
- Shared progress
- Bonus rewards for all participants
- Social bonding

### Location-Based Quests

- GPS-verified activities
- Explore local area
- Visit specific landmarks
- Check-in system

---

## Quest Difficulty Balancing

### Factors to Consider

**Time Commitment**

- Novice: < 1 hour
- Adventurer: 1-3 hours
- Warrior: 3-10 hours
- Champion: 10-30 hours
- Master: 30-100 hours
- Conqueror: 100+ hours

**Skill Requirement**

- Can a beginner complete this?
- Does it require prior knowledge/practice?
- What's the learning curve?

**Financial Cost**

- Free or minimal cost for lower tiers
- Higher tiers may require investment
- Always transparent about costs

**Physical Demand**

- Accessible to most fitness levels
- Clear warnings for intensive activities
- Options for modifications

**Mental/Emotional Challenge**

- Stepping outside comfort zone
- Dealing with fear or anxiety
- Personal growth aspect

---

## Quest Safety Guidelines

### Prohibited Quest Types

❌ Dangerous activities (extreme sports without training)
❌ Illegal activities
❌ Self-harm or unhealthy behaviors
❌ Activities that could harm others
❌ Unethical challenges
❌ Activities requiring excessive spending

### Safety Requirements

✅ Clear instructions and expectations
✅ Appropriate difficulty warnings
✅ Cost transparency
✅ Safe alternatives suggested
✅ Emergency disclaimers
✅ "Attempt at your own risk" notice

---

## Quest Database Schema

```sql
CREATE TABLE quests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tier INTEGER NOT NULL CHECK (tier BETWEEN 1 AND 6),
  tier_name VARCHAR(20) NOT NULL,
  glory_reward INTEGER NOT NULL CHECK (glory_reward > 0),
  xp_reward INTEGER NOT NULL CHECK (xp_reward > 0),
  time_limit_hours INTEGER NOT NULL,
  category VARCHAR(50),
  reward_item_id UUID REFERENCES rewards(id),
  is_active BOOLEAN DEFAULT true,
  requires_proof BOOLEAN DEFAULT false,
  location_based BOOLEAN DEFAULT false,
  estimated_cost INTEGER,
  tags TEXT[],
  ai_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_quests_tier ON quests(tier);
CREATE INDEX idx_quests_category ON quests(category);
CREATE INDEX idx_quests_active ON quests(is_active);
```

---

## Success Metrics

### Engagement Metrics

- **Quest Acceptance Rate**: % of users who accept quests
- **Quest Completion Rate**: % of accepted quests completed
- **Average Time to Complete**: How long quests actually take
- **Abandonment Rate**: % of quests abandoned

### Category Popularity

- Most/least popular categories
- Completion rate by category
- Time investment by category

### Tier Distribution

- Which tiers are most completed
- Where users plateau
- Progression through tiers over time

### Quality Indicators

- User ratings/feedback on quests
- Report rate (for inappropriate quests)
- Repeat acceptance rate

---

## Future Enhancements

### Quest Designer Tool

- Allow admins to create quests via UI
- Template system for common quest types
- Preview and test before publishing
- A/B testing for quest variations

### Quest Marketplace

- User-generated quests (with moderation)
- Community voting on best quests
- Featured creator quests
- Rewards for popular quest creators

### Dynamic Difficulty

- AI adjusts quest difficulty based on user performance
- Personal challenge rating
- Adaptive time limits
- Skill-based matchmaking

### Quest Journal

- Track progress within long quests
- Sub-tasks and checkpoints
- Notes and reflections
- Photo diary

---

**Last Updated**: October 8, 2025
