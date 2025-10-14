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

  // Tier 2 (Uncommon)
  "Silver Blade": "silver-blade.png",
  "Enchanted Quill": "enchanted-quill.png",
  "Crystal Hourglass": "crystal-hourglass.png",

  // Tier 3 (Rare)
  "Golden Shield": "golden-shield.png",
  "Spellbound Lute": "spellbound-lute.png",
  "Sage Robes": "sage-robes.png",

  // Tier 4 (Epic)
  "Diamond Amulet": "diamond-amulet.png",
  "Starlight Bow": "starlight-bow.png",
  "Wisdom Tome": "wisdom-tome.png",

  // Tier 5 (Legendary)
  "Obsidian Crown": "obsidian-crown.png",
  "Dragonscale Armor": "dragonscale-armor.png",
  "Eternal Flame Blade": "eternal-flame-blade.png",

  // Tier 6 (Mythic)
  "Phoenix Essence": "phoenix-essence.png",
  "Titan Heart Stone": "titan-heart-stone.png",
  "Crown of Infinity": "infiniti-crown.png", // Note: filename is "infiniti" not "infinity"
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
