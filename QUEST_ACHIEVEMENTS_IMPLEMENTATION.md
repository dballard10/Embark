# Quest Achievement System Implementation

## Overview

Successfully implemented a unique achievement for each of the 90 quests in the system, while maintaining tier achievements (awarded for completing ALL quests of a tier) and questline achievements (awarded for completing all quests in a topic).

## What Was Changed

### 1. Database Schema (`embark-backend/database/migration_achievements.sql`)

#### Schema Updates

- Added `quest_id` column to achievements table (nullable UUID foreign key to quests table)
- Updated `achievement_type` CHECK constraint to include 'quest' type
- Added index on `quest_id` for better query performance

#### Updated Functions

**`check_tier_achievement()`**

- Modified to only award tier achievements when ALL quests of that tier are completed (15 quests per tier)
- Previously awarded on completing any single quest of that tier
- Now counts total quests in tier vs completed quests by user

**`check_quest_achievement()` (NEW)**

- New database function to award quest-specific achievements
- Awards achievement immediately upon quest completion
- Links achievements to quests via quest_id

#### Achievement Inserts

**Tier Achievements (Updated Descriptions)**

- All 6 tier achievement descriptions updated to reflect "Completed all Tier X quests"
- Tier achievements are now significantly harder to earn

**Quest-Specific Achievements (90 NEW)**
All 90 quests now have unique thematic achievement titles:

**Running (6)**

- First Steps, Wind Runner, Storm Chaser, Tempest Strider, Hurricane Heart, Celestial Sprinter

**Weight Lifting (6)**

- Iron Initiate, Battle-Forged, Steel Commander, Warchief's Might, Throne of Power, Immortal Strength

**Knowledge (6)**

- Page Turner, Bookbound, Library Sage, Ancient Scholar, Archlich Wisdom, Eternal Mind

**Meditation (6)**

- Still Mind, Demon Queller, Ego Transcendent, Thought Master, Zen Ascendant, Void Walker

**Finance (6)**

- Copper Collector, Silver Saver, Gold Hoarder, Ancient Fortune, Platinum Dynasty, Primordial Wealth

**Cooking (6)**

- Kitchen Apprentice, Flame Dancer, Blaze Artist, Inferno Host, Volcanic Chef, Eternal Flame Chef

**Language Learning (6)**

- Word Builder, Phrase Weaver, Grammar Guardian, Polyglot Mind, Translation Sovereign, Babel Transcendent

**Puzzles (6)**

- Riddle Novice, Mind Sharpener, Enigma Solver, Sphinx's Equal, Ancient Riddler, Eternal Enigma

**Travel (6)**

- City Explorer, Territorial Roamer, Border Crosser, Five Nations Wanderer, Global Pathfinder, Eternal Explorer

**Swimming (6)**

- Aquatic Initiate, Serpent Swimmer, Ocean Glider, Abyssal Endurance, Leviathan's Path, Primordial Waters

**Nutrition (6)**

- Nutrition Aware, Garden Spirit, Harvest Keeper, Vitality Guardian, Life Eternal, Primordial Nurturer

**Dating/Relationships (6)**

- First Connection, Heart Explorer, Soul Seeker, Bond Builder, Eternal Companion, Sacred Union

**Writing (6)**

- Ink Novice, Story Weaver, Tale Crafter, Epic Scribe, Legend Writer, Eternal Wordsmith

**Public Speaking (6)**

- Voice Found, Stage Presence, Conference Voice, Idea Shaper, Keynote Master, Voice Eternal

**Music (6)**

- First Note, Harmony Seeker, Melody Master, Stage Siren, Studio Sovereign, Eternal Symphony

### 2. Achievement Service (`embark-backend/services/achievement_service.py`)

Added new method:

```python
async def check_and_award_quest_achievement(
    self, user_id: UUID, quest_id: UUID
) -> Optional[AchievementResponse]:
```

This method:

- Calls the database function `check_quest_achievement()`
- Returns the achievement if awarded
- Handles errors gracefully with logging

### 3. Quest Service (`embark-backend/services/quest_service.py`)

Updated the `complete_quest()` method to award achievements in this order:

1. **Quest-specific achievement** (instant, always awarded)
2. **Tier achievement** (only if ALL 15 quests of that tier are completed)
3. **Questline achievement** (only if ALL 6 quests in that topic are completed)

## Achievement Breakdown

**Total Achievements: 112**

- 1 Default achievement ("Newcomer")
- 6 Tier achievements (requires completing ALL 15 quests of each tier)
- 90 Quest-specific achievements (one per quest, instant)
- 15 Questline achievements (requires completing all 6 quests in each topic)

## Achievement Characteristics

### Quest Achievements

- **achievement_type**: 'quest'
- **color_tier**: Matches the quest tier (1-6)
- **is_rare**: TRUE for tier 6 quests, FALSE for tiers 1-5
- **quest_id**: Links to the specific quest
- **Awarding**: Instant upon quest completion

### Tier Achievements

- **achievement_type**: 'tier'
- **Requirement**: Complete ALL 15 quests of that tier (across all topics)
- **Much harder to earn** than before

### Questline Achievements

- **achievement_type**: 'questline'
- **Requirement**: Complete all 6 quests in a specific topic
- **Unchanged** from previous implementation

## How to Apply

To apply this migration to your Supabase database:

1. Open your Supabase SQL Editor
2. Run the updated `/embark-backend/database/migration_achievements.sql` file
3. The migration will:
   - Add the quest_id column to existing achievements table
   - Update the achievement_type constraint
   - Create/update database functions
   - Insert all 90 quest-specific achievements
   - Update tier achievement descriptions

**Note**: The migration uses `SELECT` queries with quest titles to link achievements to quests, so it must be run after the quests are seeded.

## Backend Integration

The backend services are already updated to:

- Award quest-specific achievements immediately on quest completion
- Check and award tier achievements when all tier quests are complete
- Check and award questline achievements when all topic quests are complete

No frontend changes are required - the existing achievement display system will automatically show all new achievements.

## Thematic Design

Each achievement title is thematically consistent with:

- The quest's topic (e.g., wind/speed themes for Running)
- The enemy lineage for that topic (e.g., orc-themed for Weight Lifting)
- The progression difficulty (tier 1 = novice, tier 6 = eternal/primordial)

All tier 6 quest achievements are marked as "rare" to highlight their special status.
