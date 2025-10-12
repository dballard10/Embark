# Quest & Item Tier System - Quick Reference

This document provides a quick reference for the 6-tier system used for both Quests and Items in Embark.

---

## Quest Tiers

| Tier | Stars      | Name           | Glory   | XP     | Time Est  | Color            | Item Reward |
| ---- | ---------- | -------------- | ------- | ------ | --------- | ---------------- | ----------- |
| 1    | ⭐         | **Novice**     | 1,000   | 100    | Hours     | White #FFFFFF    | Common      |
| 2    | ⭐⭐       | **Adventurer** | 5,000   | 500    | 1-2 Days  | Green #4CAF50    | Uncommon    |
| 3    | ⭐⭐⭐     | **Warrior**    | 15,000  | 1,500  | 3-7 Days  | Blue #2196F3     | Rare        |
| 4    | ⭐⭐⭐⭐   | **Champion**   | 50,000  | 5,000  | 1-2 Weeks | Purple #9C27B0   | Epic        |
| 5    | ⭐⭐⭐⭐⭐ | **Master**     | 100,000 | 10,000 | 2-4 Weeks | Gold #FF9800     | Legendary   |
| 6    | 🔥⭐       | **Conqueror**  | 500,000 | 50,000 | Months    | Red #F44336 + 🔥 | Godly       |

---

## Item Rarities

| Tier | Stars      | Rarity        | Color                         | Quest Source      |
| ---- | ---------- | ------------- | ----------------------------- | ----------------- |
| 1    | ⭐         | **Common**    | White #FFFFFF                 | Novice quests     |
| 2    | ⭐⭐       | **Uncommon**  | Green #4CAF50                 | Adventurer quests |
| 3    | ⭐⭐⭐     | **Rare**      | Blue #2196F3                  | Warrior quests    |
| 4    | ⭐⭐⭐⭐   | **Epic**      | Purple #9C27B0                | Champion quests   |
| 5    | ⭐⭐⭐⭐⭐ | **Legendary** | Gold #FF9800                  | Master quests     |
| 6    | 🔥⭐       | **Godly**     | Red #F44336 + Flame Animation | Conqueror quests  |

---

## Dual Currency System

### Glory (Currency)

- **Earned**: From completing quests (1,000 - 500,000 per quest)
- **Purpose**: Spendable currency
- **Uses**:
  - Purchase items from shop
  - Trade with other users (future)
  - Buy quest refreshes (future)
  - Marketplace transactions (future)

### XP (Experience Points)

- **Earned**: From completing quests (100 - 50,000 per quest)
- **Purpose**: Character leveling only
- **Uses**:
  - Level up your character
  - **Cannot be spent or traded**
- **Level Formula**: `Level = floor(totalXP / 10,000)` (capped at 100)
- **Starting Level**: Level 1 (0 XP)
- **Max Level**: Level 100 (1,000,000 XP)
- **XP to Next Level**: `(currentLevel + 1) * 10,000 - currentXP`

---

## Example Quest Progression

### Week 1: Starting Out

- Complete **Novice** quest: "Take a 30-minute walk"
- Earn: 1,000 Glory + 100 XP
- Receive: Common item (White ⭐)

### Week 2: Building Confidence

- Complete **Adventurer** quest: "Cook a new recipe"
- Earn: 5,000 Glory + 500 XP
- Receive: Uncommon item (Green ⭐⭐)

### Month 1: Gaining Skills

- Complete **Warrior** quest: "Complete a 5K run"
- Earn: 15,000 Glory + 1,500 XP
- Receive: Rare item (Blue ⭐⭐⭐)

### Month 2: Proving Yourself

- Complete **Champion** quest: "Build a 500-piece Lego set"
- Earn: 50,000 Glory + 5,000 XP
- Receive: Epic item (Purple ⭐⭐⭐⭐)
- **Level Up!** (Reach Level 5 with 50,000 total XP)

### Month 3-4: Mastery

- Complete **Master** quest: "Solve Rubik's cube in under 2 minutes"
- Earn: 100,000 Glory + 10,000 XP
- Receive: Legendary item (Gold ⭐⭐⭐⭐⭐)
- **Level Up!** (Reach Level 10+ with 100,000+ total XP)

### Year 1: Legendary Status

- Complete **Conqueror** quest: "Travel to new country + 3 activities"
- Earn: 500,000 Glory + 50,000 XP
- Receive: Godly item (Red Flame 🔥⭐)
- **Major Level Up!** (Gain 5 levels)

---

## Leveling Examples

| Total XP  | Level | Quests Completed Example  |
| --------- | ----- | ------------------------- |
| 0 - 9,999 | 1     | Starting out              |
| 10,000    | 2     | 10 Novice OR 1 Master     |
| 20,000    | 3     | 20 Novice OR 4 Adventurer |
| 50,000    | 5     | 1 Champion                |
| 100,000   | 10    | 1 Master OR 2 Champion    |
| 200,000   | 20    | 10 Warrior + 4 Champion   |
| 500,000   | 50    | 1 Conqueror OR 5 Master   |
| 1,000,000 | 100   | 2 Conqueror (MAX LEVEL)   |

**Note**: Level 100 is the current maximum level cap.

---

## UI Visual Guide

### Quest Card Display

```
┌────────────────────────────────────────┐
│  🏆  [CHAMPION ⭐⭐⭐⭐]                   │
│                                        │
│  Build a 500-Piece Lego Set           │
│                                        │
│  Complete a full Lego set with at     │
│  least 500 pieces...                  │
│                                        │
│  ⏱️  2 weeks  │  🏆 50,000 Glory       │
│  ⚡ 5,000 XP  │  🎁 Epic Item          │
│                                        │
│  [View Details]  [Accept Quest]       │
└────────────────────────────────────────┘
```

### Item Card Display

```
┌──────────────────────┐
│                      │
│   [Item Image/Icon]  │
│   [Flame animation]  │ ← For Godly only
│                      │
├──────────────────────┤
│ Golden Brick         │
│ ⭐⭐⭐⭐⭐ Legendary    │
│                      │
│ [⭐ Featured]        │
└──────────────────────┘
```

### Character Stats Display

```
Level 4 Warrior
━━━━━━━━━━━░░ 85% to Level 5

🏆 Glory: 78,500
⚡ XP: 38,500 / 50,000
📦 Items: 12
🗺️ Quests Completed: 15
```

---

## Database Field Names

### Quest Table

- `tier`: INTEGER (1-6)
- `tier_name`: VARCHAR ('novice', 'adventurer', 'warrior', 'champion', 'master', 'conqueror')
- `glory_reward`: INTEGER
- `xp_reward`: INTEGER

### User Table

- `total_glory`: INTEGER
- `total_xp`: INTEGER
- `level`: INTEGER

### Rewards Table

- `rarity_tier`: VARCHAR ('common', 'uncommon', 'rare', 'epic', 'legendary', 'godly')
- `rarity_stars`: INTEGER (1-6)

---

## Design Implementation Notes

### Colors in CSS

```css
:root {
  /* Quest/Item Tiers */
  --tier-1-novice: #ffffff; /* White */
  --tier-2-adventurer: #4caf50; /* Green */
  --tier-3-warrior: #2196f3; /* Blue */
  --tier-4-champion: #9c27b0; /* Purple */
  --tier-5-master: #ff9800; /* Gold */
  --tier-6-conqueror: #f44336; /* Red */

  /* Special Effects */
  --flame-animation: /* keyframe for godly items */ ;
}
```

### Star Display Component

```typescript
function renderStars(tier: number): JSX.Element {
  if (tier === 6) {
    return <span className="flame-star">🔥⭐</span>;
  }
  return <span>{"⭐".repeat(tier)}</span>;
}
```

---

## 🚀 Future: Custom Tier Icons

### Vision

Replace generic stars with unique, thematic icons for each quest/item tier to enhance visual identity and user experience.

### Planned Tier Icons

| Tier | Current    | Future Icon Concept        | Theme                      |
| ---- | ---------- | -------------------------- | -------------------------- |
| 1    | ⭐         | 🌱 Seedling or 📖 Book     | Beginner, learning, growth |
| 2    | ⭐⭐       | 🗺️ Map or 🎒 Backpack      | Exploration, adventure     |
| 3    | ⭐⭐⭐     | ⚔️ Sword or 🛡️ Shield      | Combat, warrior spirit     |
| 4    | ⭐⭐⭐⭐   | 👑 Crown or 🏆 Trophy      | Victory, championship      |
| 5    | ⭐⭐⭐⭐⭐ | 💎 Diamond or ⚡ Lightning | Mastery, excellence        |
| 6    | 🔥⭐       | 🔥 Flame or 💀 Skull       | Epic, legendary, godly     |

### Design Considerations

**Visual Consistency**

- Icons should be instantly recognizable at small sizes
- Clear visual hierarchy (tier 1 should feel "lesser" than tier 6)
- Consistent style (outline vs filled, color vs monochrome)

**Implementation Approach**

- Custom SVG icons designed in Figma/Illustrator
- Icon system with animated variants for special states
- Responsive sizing for different UI contexts

**Animation Ideas**

- **Novice (Tier 1)**: Simple fade-in
- **Adventurer (Tier 2)**: Subtle bounce
- **Warrior (Tier 3)**: Metallic shine sweep
- **Champion (Tier 4)**: Golden glow pulse
- **Master (Tier 5)**: Sparkle particles
- **Conqueror (Tier 6)**: Flame animation + particle effects

### Color Palette Integration

Each tier icon will use its associated tier color:

- Tier 1: White/Light Gray (#FFFFFF)
- Tier 2: Green (#4CAF50)
- Tier 3: Blue (#2196F3)
- Tier 4: Purple (#9C27B0)
- Tier 5: Gold (#FF9800)
- Tier 6: Red (#F44336) with flame animation

### Alternative Icon Sets (Future Exploration)

**Option A: Elemental Theme**

- Tier 1: 🌿 Earth (grounding, basics)
- Tier 2: 💧 Water (flow, exploration)
- Tier 3: 🌪️ Wind (swift, skilled)
- Tier 4: ⚡ Lightning (powerful, elite)
- Tier 5: ✨ Starlight (mastery, brilliance)
- Tier 6: 🔥 Fire (legendary, consuming)

**Option B: Progression Symbols**

- Tier 1: Footprint (first steps)
- Tier 2: Compass (finding direction)
- Tier 3: Hammer (forging skill)
- Tier 4: Banner (claiming victory)
- Tier 5: Gem (rare achievement)
- Tier 6: Phoenix (rebirth, legend)

**Option C: Medieval/Fantasy**

- Tier 1: Wooden Shield
- Tier 2: Iron Sword
- Tier 3: Steel Armor
- Tier 4: Royal Crown
- Tier 5: Dragon Egg
- Tier 6: Legendary Artifact

### Implementation Timeline

- **Phase 2** (Weeks 9-16): Design icon concepts, user testing
- **Phase 3** (Weeks 17+): Full icon system rollout with animations

### Technical Requirements

- SVG format for scalability
- Sprite sheet for performance
- CSS animations for hover/active states
- Accessibility: Each icon needs descriptive alt text
- Fallback to emoji if SVG fails to load

---

**Last Updated**: October 8, 2025
