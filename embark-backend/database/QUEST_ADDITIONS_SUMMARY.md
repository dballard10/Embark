# Quest Additions Summary

This document summarizes the new quests added to the Embark database to support the new items.

## Overview

- **Goal**: Create 9 quests per tier (tiers 1-6)
- **Previous state**: Varying quest counts per tier (3-5 quests)
- **New state**: Exactly 9 quests per tier
- **Total quests added**: 27 new quests

## File Structure

### 1. Fixed Item Files

- **`add_18_new_items.sql`**: Fixed to use `rewards` table instead of `items`
- **`add_18_more_items.sql`**: Fixed to use `rewards` table instead of `items`

### 2. New Quest File

- **`add_quests_for_new_items.sql`**: Adds 27 new quests to reach 9 quests per tier

## Quest Distribution

### Before Changes (from seed_data_enhanced.sql)

- **Tier 1**: 5 quests
- **Tier 2**: 5 quests
- **Tier 3**: 5 quests
- **Tier 4**: 5 quests
- **Tier 5**: 4 quests
- **Tier 6**: 3 quests
- **Total**: 27 existing quests

### New Quests Added (add_quests_for_new_items.sql)

- **Tier 1**: +4 quests
- **Tier 2**: +4 quests
- **Tier 3**: +4 quests
- **Tier 4**: +4 quests
- **Tier 5**: +5 quests
- **Tier 6**: +6 quests
- **Total**: +27 new quests

### After Changes

- **Tier 1**: 9 quests ✓
- **Tier 2**: 9 quests ✓
- **Tier 3**: 9 quests ✓
- **Tier 4**: 9 quests ✓
- **Tier 5**: 9 quests ✓
- **Tier 6**: 9 quests ✓
- **Total**: 54 quests

## Item Distribution

Each tier now has 9 items total:

- 3 items from `seed_data_enhanced.sql`
- 3 items from `add_18_new_items.sql`
- 3 items from `add_18_more_items.sql`

## New Quests by Tier

### Tier 1 (Common) - 4 new quests

1. **Daily Journal** - Write down your thoughts and reflections for today (850 glory/xp, 24h)
2. **Clean Workspace** - Organize and tidy your workspace for maximum productivity (800 glory/xp, 24h)
3. **Mindful Walk** - Take a 20-minute walk outside and practice mindfulness (900 glory/xp, 24h)
4. **Gratitude Practice** - Write down 3 things you are grateful for today (850 glory/xp, 24h)

### Tier 2 (Uncommon) - 4 new quests

1. **Strength Training** - Complete a 45-minute strength training workout (2800 glory/xp, 48h)
2. **Language Practice** - Practice a new language for 1 hour (2700 glory/xp, 48h)
3. **Meal Prep Master** - Prepare healthy meals for the next 3 days (3000 glory/xp, 48h)
4. **Digital Detox** - Spend 4 hours away from all screens and digital devices (2900 glory/xp, 48h)

### Tier 3 (Rare) - 4 new quests

1. **Portfolio Project** - Add a new project to your portfolio or resume (5200 glory/xp, 96h)
2. **Public Speaking** - Give a presentation or speak publicly about a topic you know (5500 glory/xp, 72h)
3. **Nature Adventure** - Spend a full day exploring nature (4800 glory/xp, 72h)
4. **Skill Mastery Session** - Practice a skill intensively for 6 hours (5300 glory/xp, 72h)

### Tier 4 (Epic) - 4 new quests

1. **Networking Champion** - Attend a professional event and make 5 meaningful connections (8000 glory/xp, 96h)
2. **Innovation Sprint** - Develop and prototype a new idea or solution (9000 glory/xp, 120h)
3. **Volunteer Leader** - Lead a volunteer project or charity event (8500 glory/xp, 168h)
4. **Financial Goal** - Achieve a significant financial milestone or savings goal (9000 glory/xp, 168h)

### Tier 5 (Legendary) - 5 new quests

1. **Competition Victor** - Win or place in a competitive event in your field (17000 glory/xp, 336h)
2. **Professional Certification** - Earn a professional certification or advanced degree (18000 glory/xp, 720h)
3. **Community Impact Project** - Launch a project that positively impacts your community (16500 glory/xp, 336h)
4. **Breakthrough Achievement** - Achieve a personal breakthrough that seemed impossible (17500 glory/xp, 336h)
5. **Mentor Program Leader** - Create and run a mentorship program for others (16000 glory/xp, 336h)

### Tier 6 (Mythic) - 6 new quests

1. **World Record Attempt** - Attempt to break or set a world record in your domain (35000 glory/xp, 720h)
2. **Industry Disruptor** - Create an innovation that disrupts or transforms your industry (40000 glory/xp, 1440h)
3. **Global Impact** - Launch an initiative that impacts people worldwide (45000 glory/xp, 2160h)
4. **Mastery Achieved** - Reach the pinnacle of mastery in your chosen field (38000 glory/xp, 4380h)
5. **Legendary Contribution** - Make a contribution that will be remembered for generations (42000 glory/xp, 4380h)
6. **Impossible Dream** - Accomplish a lifelong dream that others thought impossible (50000 glory/xp, 8760h)

## Installation Order

To properly set up the database with all items and quests:

1. Run `schema.sql` (if not already done)
2. Run `seed_data_enhanced.sql` (base items and quests)
3. Run `add_18_new_items.sql` (18 additional items)
4. Run `add_18_more_items.sql` (18 more additional items)
5. Run `add_quests_for_new_items.sql` (27 new quests)

## Reward Balance

### Glory/XP Rewards by Tier

- **Tier 1**: 800-1000 glory/xp, 24h time limit
- **Tier 2**: 2500-3000 glory/xp, 48-72h time limit
- **Tier 3**: 4800-5500 glory/xp, 48-96h time limit
- **Tier 4**: 7500-9000 glory/xp, 72-168h time limit
- **Tier 5**: 15000-18000 glory/xp, 168-720h time limit
- **Tier 6**: 30000-50000 glory/xp, 336-8760h time limit

## Quest Themes

The new quests cover diverse categories:

- **Health & Fitness**: Workouts, meditation, nutrition
- **Learning & Growth**: Skills, education, personal development
- **Creativity**: Projects, content creation, artistic work
- **Social**: Networking, mentorship, community building
- **Productivity**: Work, organization, goal achievement
- **Adventure**: New experiences, exploration, challenges
- **Impact**: Leadership, legacy, global influence
