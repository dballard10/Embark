/**
 * Utility functions for handling item images
 */

/**
 * Maps item names to their corresponding image filenames in /public/items/
 */
const itemImageMap: Record<string, string> = {
  // Tier 1 (Common)
  "Bronze Compass": "bronze-compass.png",
  "Wooden Training Sword": "wooden-sword.png",
  "Leather Journal": "leather-journal.png",
  "Iron Dagger": "iron-dagger.png",
  "Traveler's Cloak": "travelers-cloak.png",
  "Wolf Tooth Necklace": "wolf-tooth-necklace.png",
  "Bat Wing Bracers": "bat-wing-bracers.png",
  "Bear Claw Gloves": "bear-claw-gloves.png",
  "Scorpion Tail Whip": "scorpion-tail-whip.png",

  // Tier 2 (Uncommon)
  "Silver Blade": "silver-blade.png",
  "Enchanted Quill": "enchanted-quill.png",
  "Crystal Hourglass": "crystal-hourglass.png",
  "Falcon Feather Cape": "falcon-feather-cloak.png",
  "Steel Warhammer": "steel-warhammer.png",
  "Basilisk Scale Boots": "basilisk-scale-boots.png",
  "Serpent Scale Mail": "serpent-scale-mail.png",
  "Dire Wolf Pelt Coat": "dire-wolf-pelt-coat.png",
  "Wyvern Spine Bow": "wyvern-spine-bow.png",

  // Tier 3 (Rare)
  "Golden Shield": "golden-shield.png",
  "Spellbound Lute": "spellbound-lute.png",
  "Sage Robes": "sage-robes.png",
  "Griffin Talon Gauntlets": "griffin-talon-gauntlets.png",
  "Moonstone Staff": "moonstone-staff.png",
  "Crimson Battle Axe": "crimson-battle-axe.png",
  "Sphinx Riddle Ring": "sphinx-riddle-ring.png",
  "Cockatrice Feather Helm": "cockatrice-feather-helm.png",
  "Beholder Eye Staff": "beholder-eye-staff.png",

  // Tier 4 (Epic)
  "Diamond Amulet": "diamond-amulet.png",
  "Starlight Bow": "starlight-bow.png",
  "Wisdom Tome": "wisdom-tome.png",
  "Hydra Fang Spear": "hyrda-fang-spear.png", // Note: typo in filename "hyrda"
  "Celestial Plate Armor": "celestial-plate-armor.png",
  "Manticore Spine Blade": "manticore-spine-blade.png",
  "Lich Bone Scepter": "lich-bone-scepter.png",
  "Ancient Drake Scale Greaves": "ancient-drake-scale-greaves.png",
  "Demon Horn Warglaives": "demon-horn-warglaves.png", // Note: filename is "warglaves" not "warglaives"

  // Tier 5 (Legendary)
  "Obsidian Crown": "obsidian-crown.png",
  "Dragonscale Armor": "dragonscale-armor.png",
  "Eternal Flame Blade": "eternal-flame-blade.png",
  "Leviathan Scale Shield": "leviathan-scale-shield.png",
  "Stormbreaker Greatsword": "stormbreaker-greatsword.png",
  "Chimera Heart Amulet": "chimera-heart-amulet.png",
  "Elder Wyrm Heart Core": "elder-wyrm-heart-core.png",
  "Behemoth Skull Pauldrons": "behemoth-skull-pauldrons.png",
  "Primordial Serpent Fang Daggers": "primordial-serpent-fang-daggers.png",

  // Tier 6 (Mythic)
  "Phoenix Essence": "phoenix-essence.png",
  "Titan Heart Stone": "titan-heart-stone.png",
  "Crown of Infinity": "crown-of-infiniti.png", // Note: filename is "infiniti" not "infinity"
  "Void Dragon Wings": "void-dragon-wings.png",
  "Godslayer Halberd": "godslayer-halberd.png",
  "Kraken Eye Orb": "kraken-eye-orb.png",
  "Titan's Crushing Gauntlets": "titans-crushing-gauntlets.png",
  "Eldritch Horror Tentacles": "eldritch-horror-tentacles.png",
  "World Eater Dragon Tooth": "world-eater-dragon-tooth.png",
};

/**
 * Gets the local image path for an item
 * @param itemName - The name of the item
 * @returns The path to the image in /items/ directory, or null if not found
 */
export function getItemImagePath(itemName: string): string | null {
  const filename = itemImageMap[itemName];
  if (!filename) {
    return null;
  }
  return `/items/${filename}`;
}

/**
 * Gets the image URL for an item, preferring the database URL if available,
 * otherwise falling back to the local image
 * @param itemName - The name of the item
 * @param databaseImageUrl - The image URL from the database (optional)
 * @returns The image URL to use, or null if no image is available
 */
export function getItemImage(
  itemName: string,
  databaseImageUrl?: string | null
): string | null {
  // Prefer database URL if it exists
  if (databaseImageUrl) {
    return databaseImageUrl;
  }

  // Fall back to local image
  return getItemImagePath(itemName);
}
