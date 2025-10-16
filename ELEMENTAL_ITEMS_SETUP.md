# Elemental Items Setup Guide

## Database Setup

### SQL File

Run the SQL file in your Supabase SQL Editor:

```
embark-backend/database/add_36_elemental_items.sql
```

This adds 36 new elemental/mythical creature items (items 37-72) to your database.

## Frontend Setup

### 1. Image Mapping (CRITICAL!)

✅ **Already Updated!** The 36 new items have been added to the image mapping in:

```
embark-frontend/src/utils/itemImageUtils.ts
```

This file maps item names to their image filenames. Without this mapping, images won't load even if they're in the correct directory.

### 2. Image Placement

Place all 36 PNG images in the following directory:

```
embark-frontend/public/items/
```

### Image Files to Add (Kebab-Case Naming)

**Tier 1 (Common)**

1. `stone-hammer.png`
2. `ember-charm.png`
3. `stream-crystal.png`
4. `wind-woven-bracers.png`
5. `magma-pebble.png`
6. `gale-feather-quill.png`

**Tier 2 (Uncommon)** 7. `salamander-scale-gloves.png` 8. `zephyr-cloak.png` 9. `coral-branch-trident.png` 10. `ash-wood-shield.png` 11. `granite-gauntlets.png` 12. `storm-petrel-feather-charm.png`

**Tier 3 (Rare)** 13. `phoenix-feather-mantle.png` 14. `undine-pearl-staff.png` 15. `gargoyle-stone-shield.png` 16. `djinn-scimitar.png` 17. `volcanic-fury-axe.png` 18. `tempest-rider-boots.png`

**Tier 4 (Epic)** 19. `ifrit-flame-sword.png` 20. `leviathan-tide-armor.png` 21. `roc-talon-gauntlets.png` 22. `earth-golem-fists.png` 23. `wildfire-phoenix-crown.png` 24. `maelstrom-trident.png`

**Tier 5 (Legendary)** 25. `world-storm-avatar-wings.png` ⭐ (moved from Tier 6) 26. `tidal-leviathan-crown.png` 27. `tempest-elemental-core.png` 28. `primordial-earth-titan-armor.png` 29. `searing-solar-wings.png` 30. `abyssal-pressure-gauntlets.png`

**Tier 6 (Mythic)** 31. `primordial-flame-mace.png` (renamed from primordial-flame-seed) 32. `volcanic-dragon-skull.png` ⭐ (moved from Tier 5) 33. `planetary-core-hammer.png` 34. `infinite-ocean-amulet.png` (renamed from infinite-ocean-orb) 35. `cosmic-wind-scepter.png` 36. `elemental-chaos-throne.png`

## Notes

- ✅ **Code updated!** The image mapping has been added to `itemImageUtils.ts`
- Images must be **1024x1024 PNG** with **transparent backgrounds**
- The existing directory already has 54 items, these 36 will bring the total to 90 items
- Image names must match the mapping in `itemImageUtils.ts` (kebab-case format)

## Items Summary

- **Total Items Added**: 36
- **Tier Distribution**: 6 items per tier (Tiers 1-6)
- **Theme**: Elemental powers (Fire, Water, Earth, Wind) + Mythical Creatures
- **Item Numbers**: 37-72

## Special Changes Made

- Item 61: World Storm Avatar Wings (5 stars, Legendary)
- Item 68: Volcanic Dragon Skull (6 stars, Mythic)
- Item 67: Renamed to Primordial Flame Mace
- Item 70: Renamed to Infinite Ocean Amulet
