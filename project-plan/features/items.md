# Item & Reward System Specification 🎁

## Overview

The Item System provides collectible rewards for completing quests. Items serve as tangible proof of achievement, status symbols, and cosmetic equipment for Champions. Each item has a rarity tier matching the quest difficulty, creating a perfect reward progression system.

---

## Item Rarity Tiers

### 6-Tier Rarity System

| Tier | Stars      | Rarity        | Color               | Source Quests | Visual Style       |
| ---- | ---------- | ------------- | ------------------- | ------------- | ------------------ |
| 1    | ⭐         | **Common**    | White #FFFFFF       | Novice        | Simple, plain      |
| 2    | ⭐⭐       | **Uncommon**  | Green #4CAF50       | Adventurer    | Slight detail      |
| 3    | ⭐⭐⭐     | **Rare**      | Blue #2196F3        | Warrior       | Detailed, polished |
| 4    | ⭐⭐⭐⭐   | **Epic**      | Purple #9C27B0      | Master        | Ornate, glowing    |
| 5    | ⭐⭐⭐⭐⭐ | **Legendary** | Gold #FF9800        | Champion      | Radiant, animated  |
| 6    | 🔥⭐       | **Godly**     | Red #F44336 + Flame | Conqueror     | Epic, fire effects |

---

## Item Structure

### Core Item Properties

```typescript
interface Item {
  id: string;
  name: string;
  description: string;
  rarityTier: RarityTier;
  rarityStars: number; // 1-6
  equipmentSlot: EquipmentSlot; // Which champion slot it fits
  category: ItemCategory;
  imageUrl: string;
  iconUrl: string; // Smaller version for UI
  isEquippable: boolean; // Can be equipped to champion
  isStackable: boolean; // Can have multiple copies
  sourceTier: QuestTier; // Which quest tier drops this
  effectDescription?: string; // Visual effect when equipped
  loreText?: string; // Story/flavor text
  tags: string[];
  animationId?: string; // For animated items
  seasonalExclusive?: boolean;
  limitedEdition?: boolean;
  createdAt: Date;
}

type RarityTier =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary"
  | "godly";

type EquipmentSlot =
  | "head"
  | "chest"
  | "legs"
  | "feet"
  | "right_hand"
  | "left_hand"
  | "back"
  | "pet"
  | "aura";

type ItemCategory =
  | "weapon"
  | "armor"
  | "accessory"
  | "pet"
  | "effect"
  | "consumable"; // Future
```

---

## Item Categories

### 1. Weapons (Right Hand)

Items that represent tools, weapons, or instruments

**Common (Novice)**

- Wooden Training Sword
- Worn Hammer
- Simple Staff
- Rusty Dagger

**Uncommon (Adventurer)**

- Traveler's Walking Stick
- Steel Dagger
- Hunter's Bow
- Explorer's Pickaxe

**Rare (Warrior)**

- Battle Sword
- War Hammer
- Iron Spear
- Combat Axe

**Epic (Champion)**

- Enchanted Longsword
- Royal Scepter
- Crystal Staff
- Champion's Blade

**Legendary (Master)**

- Legendary Blade of Glory
- Master's Warhammer (glowing)
- Starlight Staff
- Divine Weapon

**Godly (Conqueror)**

- Godslayer Sword (flaming)
- Inferno Hammer
- Dragon's Fang Blade
- Legendary Artifact Weapon

---

### 2. Armor (Chest)

Protective gear and clothing

**Common (Novice)**

- Simple Cloth Tunic
- Worn Leather Vest
- Basic Shirt
- Peasant's Garb

**Uncommon (Adventurer)**

- Traveler's Leather Jacket
- Explorer's Vest
- Sturdy Tunic
- Ranger's Cloak

**Rare (Warrior)**

- Chain Mail Armor
- Iron Breastplate
- Battle Armor
- Warrior's Plate

**Epic (Champion)**

- Polished Plate Armor
- Royal Guard Armor
- Champion's Cuirass
- Enchanted Breastplate

**Legendary (Master)**

- Legendary Hero's Armor
- Golden Plate Armor (glowing)
- Masterwork Battle Armor
- Divine Protection

**Godly (Conqueror)**

- Inferno Plate (flames flickering)
- Dragon Scale Armor
- Godly Battle Armor
- Eternal Champion's Plate

---

### 3. Helmets/Headgear (Head)

Protective and decorative headwear

**Common (Novice)**

- Cloth Hood
- Simple Cap
- Leather Headband
- Worn Hat

**Uncommon (Adventurer)**

- Explorer's Hat
- Ranger's Hood
- Traveler's Cap
- Adventurer's Bandana

**Rare (Warrior)**

- Iron Helmet
- Battle Helm
- Warrior's Headguard
- Steel War Helm

**Epic (Champion)**

- Royal Crown
- Champion's Helmet
- Purple Plumed Helm
- Ornate Headpiece

**Legendary (Master)**

- Golden Winged Helm
- Master's Crown
- Legendary Circlet (glowing)
- Hero's Diadem

**Godly (Conqueror)**

- Flaming Crown of Conquest
- Dragon Horn Helmet
- Godly Helm (fire aura)
- Eternal Flame Crown

---

### 4. Leg Armor (Legs)

Lower body protection

**Common (Novice)**

- Worn Pants
- Simple Trousers
- Cloth Leggings
- Peasant's Bottoms

**Uncommon (Adventurer)**

- Traveler's Pants
- Reinforced Trousers
- Explorer's Leggings
- Sturdy Breeches

**Rare (Warrior)**

- Iron Greaves
- Plated Leg Guards
- Battle Leggings
- Warrior's Cuisses

**Epic (Champion)**

- Ornate Leg Plates
- Royal Leg Guards
- Champion's Greaves
- Enchanted Leg Armor

**Legendary (Master)**

- Blessed Legplates
- Golden Greaves (glowing)
- Master's Leg Armor
- Hero's Leg Guards

**Godly (Conqueror)**

- Burning Battle Greaves
- Dragon Scale Leggings
- Godly Leg Plates (flames)
- Eternal Leg Armor

---

### 5. Boots/Footwear (Feet)

Shoes and foot protection

**Common (Novice)**

- Leather Sandals
- Worn Boots
- Simple Shoes
- Cloth Slippers

**Uncommon (Adventurer)**

- Hiking Boots
- Traveler's Shoes
- Explorer's Boots
- Sturdy Footwear

**Rare (Warrior)**

- Steel Boots
- Battle Sabatons
- Warrior's Footguards
- Iron-Toed Boots

**Epic (Champion)**

- Knight's Sabatons
- Royal Boots
- Champion's Footwear
- Enchanted Boots

**Legendary (Master)**

- Boots of Swiftness (glowing)
- Golden Sabatons
- Master's Footguards
- Legendary Stride

**Godly (Conqueror)**

- Boots of Eternal Flame
- Dragon Claw Boots
- Godly Sabatons (fire trail)
- Conqueror's Footwear

---

### 6. Shields & Off-hand (Left Hand)

Defensive items and utility objects

**Common (Novice)**

- Small Wooden Buckler
- Worn Shield
- Simple Lantern
- Old Book

**Uncommon (Adventurer)**

- Compass
- Traveler's Map
- Sturdy Shield
- Explorer's Torch

**Rare (Warrior)**

- Kite Shield
- Iron Round Shield
- Battle Shield
- Warrior's Defender

**Epic (Champion)**

- Tower Shield
- Royal Aegis
- Champion's Shield
- Enchanted Buckler

**Legendary (Master)**

- Shield of the Ancients
- Golden Defender (glowing)
- Master's Aegis
- Legendary Protection

**Godly (Conqueror)**

- Shield of Ultimate Defense (molten)
- Dragon Scale Shield
- Godly Aegis (flame aura)
- Eternal Guardian Shield

---

### 7. Capes & Wings (Back)

Back-mounted cosmetics

**Common (Novice)**

- Torn Cloak
- Simple Cape
- Cloth Wrap
- Worn Blanket

**Uncommon (Adventurer)**

- Adventurer's Cape
- Traveler's Cloak
- Backpack with Gear
- Explorer's Mantle

**Rare (Warrior)**

- Battle-Worn Cape
- Warrior's Cloak
- Blue War Banner
- Iron-Backed Cape

**Epic (Champion)**

- Royal Purple Cape
- Champion's Banner
- Ornate Cloak
- Purple Wing Mantle

**Legendary (Master)**

- Wings of Glory
- Golden Hero's Cape
- Legendary Cloak (flowing)
- Angel Wings

**Godly (Conqueror)**

- Demon Wings (fire trail)
- Dragon Wings
- Godly Cape (flame aura)
- Eternal Flame Banner

---

### 8. Pets/Companions (Pet Slot)

Creature companions

**Common (Novice)**

- Stray Dog
- Common Cat
- Small Bird
- Friendly Mouse

**Uncommon (Adventurer)**

- Clever Raven
- Travel Companion Dog
- Wise Owl
- Loyal Hound

**Rare (Warrior)**

- Loyal Wolf
- Battle Dog
- Hawk Companion
- War Horse

**Epic (Champion)**

- Majestic Eagle
- Royal Lion
- Champion's Tiger
- Purple Phoenix Chick

**Legendary (Master)**

- Phoenix Companion (glowing)
- Golden Lion
- Master's Dragon Hatchling
- Legendary Griffin

**Godly (Conqueror)**

- Ancient Dragon
- Demon Wolf (flame eyes)
- Godly Phoenix (fire aura)
- Eternal Beast

---

### 9. Auras & Effects (Aura Slot)

Visual particle effects and abilities

**Common (Novice)**

- None / Basic Glow
- Faint White Shimmer
- Subtle Sparkle
- Beginner's Light

**Uncommon (Adventurer)**

- Green Nature Wisps
- Leaf Particles
- Explorer's Aura
- Gentle Wind Effect

**Rare (Warrior)**

- Blue Battle Aura
- Warrior's Glow
- Steel Shine
- Combat Particles

**Epic (Champion)**

- Purple Lightning Sparks
- Royal Aura
- Champion's Glow
- Regal Particles

**Legendary (Master)**

- Golden Divine Light
- Star Sparkles
- Master's Radiance
- Legendary Halo

**Godly (Conqueror)**

- Flame Tornado
- Lightning Storm
- Inferno Aura
- Godly Presence (flame + lightning)

---

## The Vault

### Purpose

The Vault is where users store and view their collected items. It serves as:

- **Trophy Case**: Display achievements
- **Collection Manager**: Organize and track items
- **Cosmetic Arsenal**: Source for Champion customization
- **Progress Tracker**: See completion toward full sets

### Vault Features

#### 🧩 MVP Features

**Basic Display**

- Grid view of all collected items
- Item card showing image, name, rarity
- Total item count
- Sort by: Newest, Rarity, Name, Type

**Filtering**

- Filter by rarity tier
- Filter by equipment slot
- Filter by source (which quest tier)

**Item Details**

- Click item to view full details
- Show acquisition date
- Show source quest
- Description and lore text

**Featured Items**

- Mark up to 5 items as "Featured"
- Featured items show on profile page
- Special showcase display

#### 🚀 Future Features

**Advanced Organization**

- Custom folders/collections
- Tagging system
- Search functionality
- Multiple view modes (grid, list, gallery)

**Set Collections**

- Track themed item sets
- Show completion progress (4/6 Warrior Set)
- Special effects for complete sets
- Set showcase pages

**Item Management**

- Duplicate tracking
- Trade/gift items to friends
- Convert duplicates to Glory
- Item fusion/crafting

**Statistics**

- Most rare item
- Collection value (total Glory worth)
- Rarity distribution chart
- Completion percentage

**Showcase Features**

- Create custom displays
- Share vault screenshot
- Compare with friends
- Vault tours (slideshow)

---

## Item Acquisition

### Primary Source: Quest Rewards

**One Item Per Quest**

- Every quest completion grants one item
- Item rarity matches quest tier
- Item type is predetermined per quest
- Some randomization possible (future)

**Reward Assignment**

```javascript
Quest: "Morning Walk" (Novice)
  → Reward: "Simple Cloth Tunic" (Common, Chest Slot)

Quest: "Cook New Recipe" (Adventurer)
  → Reward: "Explorer's Hat" (Uncommon, Head Slot)

Quest: "5K Run" (Warrior)
  → Reward: "Battle Sword" (Rare, Right Hand)
```

### Secondary Sources (Future)

**Shop Purchases**

- Buy Common/Uncommon items with Glory
- Special limited-time items
- Seasonal cosmetics

**Achievement Unlocks**

- Complete 50 quests → Special cape
- Reach Level 100 → Unique aura
- First Conqueror quest → Exclusive item

**Event Rewards**

- Seasonal events (Halloween, Winter, Summer)
- Limited-time quests
- Community challenges

**Trading**

- Trade items with friends
- Marketplace for rare items
- Gift system

**Daily Login Rewards**

- Small items for consecutive logins
- Accessories and minor cosmetics

---

## Item Duplicates

### 🧩 MVP: Allow Duplicates

**Why Allow**:

- User may complete same quest multiple times
- Items feel earned, not gated
- Collection grows organically

**Display**:

- Show quantity (x3 Battle Sword)
- Stack identical items
- Total unique items vs total items count

### 🚀 Future: Duplicate Management

**Options for Duplicates**:

1. **Convert to Glory**: Dismantle for currency
2. **Crafting Material**: Use for fusions
3. **Trading**: Exchange with other players
4. **Gifting**: Give to friends
5. **Collection Points**: Special currency for duplicates

---

## Item Database Schema

```sql
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  rarity_tier VARCHAR(20) NOT NULL,
  rarity_stars INTEGER NOT NULL CHECK (rarity_stars BETWEEN 1 AND 6),
  equipment_slot VARCHAR(20),
  category VARCHAR(50),
  image_url TEXT,
  icon_url TEXT,
  is_equippable BOOLEAN DEFAULT true,
  is_stackable BOOLEAN DEFAULT true,
  source_tier INTEGER CHECK (source_tier BETWEEN 1 AND 6),
  effect_description TEXT,
  lore_text TEXT,
  tags TEXT[],
  animation_id VARCHAR(100),
  seasonal_exclusive BOOLEAN DEFAULT false,
  limited_edition BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT valid_rarity CHECK (
    rarity_tier IN ('common', 'uncommon', 'rare', 'epic', 'legendary', 'godly')
  ),
  CONSTRAINT valid_slot CHECK (
    equipment_slot IN ('head', 'chest', 'legs', 'feet', 'right_hand', 'left_hand', 'back', 'pet', 'aura')
  )
);

CREATE TABLE user_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES rewards(id),
  acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  acquired_from_quest_id UUID REFERENCES quests(id),
  is_featured BOOLEAN DEFAULT false,
  quantity INTEGER DEFAULT 1,
  is_equipped BOOLEAN DEFAULT false,
  equipped_slot VARCHAR(20)
);

CREATE INDEX idx_rewards_rarity ON rewards(rarity_tier);
CREATE INDEX idx_rewards_stars ON rewards(rarity_stars);
CREATE INDEX idx_rewards_slot ON rewards(equipment_slot);
CREATE INDEX idx_user_items_user_id ON user_items(user_id);
CREATE INDEX idx_user_items_featured ON user_items(user_id, is_featured);
```

---

## Visual Design Guidelines

### Rarity Visual Indicators

**Common (White)**

- Plain, simple design
- No special effects
- Basic color palette
- Minimal detail

**Uncommon (Green)**

- Added detail and texture
- Slight color variation
- Small embellishments
- Better quality appearance

**Rare (Blue)**

- Polished, refined design
- Multiple colors
- Detailed texture work
- Professional appearance

**Epic (Purple)**

- Ornate, decorative elements
- Glowing accents
- Multiple materials visible
- Impressive appearance

**Legendary (Gold)**

- Radiant, glowing
- Particle effects (sparkles)
- Intricate details
- Animated elements
- Awe-inspiring appearance

**Godly (Red + Flame)**

- Epic, overwhelming design
- Flame animations
- Multiple particle effects
- Dramatic appearance
- Screen-filling presence

### Item Card Design

```
┌──────────────────────────┐
│                          │
│    [ITEM IMAGE]          │
│    [FLAME ANIM]          │ ← Godly only
│                          │
├──────────────────────────┤
│ Golden Brick             │
│ ⭐⭐⭐⭐⭐ Legendary       │
│                          │
│ [Acquired: Oct 8, 2025]  │
│ [⭐ Feature] [Equip]     │
└──────────────────────────┘
```

---

## Item Naming Conventions

### Format: [Material/Style] [Item Type] [of Qualifier]

**Examples**:

- Iron Helmet
- Golden Crown of Victory
- Legendary Blade of Glory
- Simple Cloth Tunic
- Battle-Worn Cape
- Enchanted Longsword

### Naming Guidelines

**Common**: Simple, descriptive

- "Worn X", "Simple X", "Basic X"

**Uncommon**: Material or purpose

- "Steel X", "Traveler's X", "Explorer's X"

**Rare**: Quality or theme

- "Battle X", "War X", "Warrior's X"

**Epic**: Prestigious or magical

- "Royal X", "Enchanted X", "Champion's X"

**Legendary**: Heroic or mythical

- "Legendary X", "Divine X", "Master's X"

**Godly**: Epic, powerful

- "Godly X", "Inferno X", "Eternal X", "X of the Gods"

---

## Item Lore & Storytelling

### Purpose

- Add depth and meaning to items
- Create emotional connection
- Reward achievement with narrative
- Build world/universe

### Example Lore Texts

**Common**: Simple description

> "A worn leather tunic, showing signs of many adventures. Perfect for a beginner on their journey."

**Uncommon**: Bit of history

> "This explorer's hat has traveled many roads and seen countless horizons. It bears the mark of the Adventurer's Guild."

**Rare**: Story element

> "Forged in the fires of battle, this sword has defended warriors for generations. Its blue steel never dulls."

**Epic**: Legendary tale

> "Worn only by those who have proven themselves in the Champion's Trials. The purple cloak flows with an otherworldly grace."

**Legendary**: Epic narrative

> "The legendary blade of ancient heroes. It is said that only those of pure heart can wield its golden light."

**Godly**: Mythical story

> "A crown worn by gods themselves. Flames dance eternally around it, never burning, never fading. Only a Conqueror may wear it."

---

## Set Collections (Future)

### Complete Themed Sets

**Warrior Set** (6 pieces)

- Iron Helmet
- Chain Mail Armor
- Plated Greaves
- Steel Boots
- Battle Sword
- Kite Shield

**Champion Set** (6 pieces)

- Royal Crown
- Polished Plate Armor
- Ornate Leg Plates
- Knight's Sabatons
- Enchanted Longsword
- Tower Shield

**Conqueror Set** (9 pieces)

- Flaming Crown
- Inferno Plate Armor
- Burning Battle Greaves
- Boots of Eternal Flame
- Godslayer Sword
- Shield of Ultimate Defense
- Demon Wings
- Ancient Dragon
- Flame Tornado Aura

### Set Bonuses (Visual Only)

**2 pieces**: Small matching aura
**4 pieces**: Glowing outline in set color
**6 pieces**: Full particle effect
**Complete set**: Special animation + pose unlock

---

## Item Generation Tools

### For Developers/Admins

**Item Creator UI**

- Form to input item properties
- Preview generator
- Batch creation from CSV
- Template system
- AI description generator

**Item Validator**

- Check for duplicate names
- Verify rarity consistency
- Balance validation
- Image requirements check

---

## Success Metrics

### Collection Metrics

- Average items per user
- % of users who collect 10+ items
- % of users who complete a set
- Most/least popular items

### Engagement

- Time spent in Vault
- Featured item change frequency
- Social shares of items
- Item comparison activity

### Economy (Future)

- Trade volume
- Most valuable items
- Shop purchase rate
- Duplicate conversion rate

---

**Last Updated**: October 8, 2025
