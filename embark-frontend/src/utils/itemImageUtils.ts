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

  // === NEW ELEMENTAL ITEMS (37-72) ===

  // Tier 1 (Common) - Elemental Basics
  "Stone Hammer": "stone-hammer.png",
  "Ember Charm": "ember-charm.png",
  "Stream Crystal": "stream-crystal.png",
  "Wind-Woven Bracers": "wind-woven-bracers.png",
  "Magma Pebble": "magma-pebble.png",
  "Gale Feather Quill": "gale-feather-quill.png",

  // Tier 2 (Uncommon) - Quality Elemental Gear
  "Salamander Scale Gloves": "salamander-scale-gloves.png",
  "Zephyr Cloak": "zephyr-cloak.png",
  "Coral Branch Trident": "coral-branch-trident.png",
  "Ash Wood Shield": "ash-wood-shield.png",
  "Granite Gauntlets": "granite-gauntlets.png",
  "Storm Petrel Feather Charm": "storm-petrel-feather-charm.png",

  // Tier 3 (Rare) - Magical Elemental Items
  "Phoenix Feather Mantle": "phoenix-feather-mantle.png",
  "Undine Pearl Staff": "undine-pearl-staff.png",
  "Gargoyle Stone Shield": "gargoyle-stone-shield.png",
  "Djinn Scimitar": "djinn-scimitar.png",
  "Volcanic Fury Axe": "volcanic-fury-axe.png",
  "Tempest Rider Boots": "tempest-rider-boots.png",

  // Tier 4 (Epic) - Powerful Elemental Artifacts
  "Ifrit Flame Sword": "ifrit-flame-sword.png",
  "Leviathan Tide Armor": "leviathan-tide-armor.png",
  "Roc Talon Gauntlets": "roc-talon-gauntlets.png",
  "Earth Golem Fists": "earth-golem-fists.png",
  "Wildfire Phoenix Crown": "wildfire-phoenix-crown.png",
  "Maelstrom Trident": "maelstrom-trident.png",

  // Tier 5 (Legendary) - Elemental Mastery
  "World Storm Avatar Wings": "world-storm-avatar-wings.png",
  "Tidal Leviathan Crown": "tidal-leviathan-crown.png",
  "Tempest Elemental Core": "tempest-elemental-core.png",
  "Primordial Earth Titan Armor": "primordial-earth-titan-armor.png",
  "Searing Solar Wings": "searing-solar-wings.png",
  "Abyssal Pressure Gauntlets": "abyssal-pressure-gauntlets.png",

  // Tier 6 (Mythic) - Elemental Transcendence
  "Primordial Flame Mace": "primordial-flame-mace.png",
  "Volcanic Dragon Skull": "volcanic-dragon-skull.png",
  "Planetary Core Hammer": "planetary-core-hammer.png",
  "Infinite Ocean Amulet": "infinite-ocean-amulet.png",
  "Cosmic Wind Scepter": "cosmic-wind-scepter.png",
  "Elemental Chaos Throne": "elemental-chaos-throne.png",

  // === NEW MYTHOLOGY ITEMS (73-102) ===

  // Tier 1 (Common) - Mythological Basics
  "Bronze Spartan Dagger": "bronze-spartan-dagger.png",
  "Wooden Druid's Charm": "wooden-druids-charm.png",
  "Clay Ra Scarab": "clay-ra-scarab.png",
  "Jade Dragon Pendant": "jade-dragon-pendant.png",
  "Iron Viking Armband": "iron-viking-armband.png",

  // Tier 2 (Uncommon) - Quality Mythological Gear
  "Athena's Owl Wing Cape": "athenas-owl-wing-cape.png",
  "Anubis Jackal Mask": "anubis-jackal-mask.png",
  "Yggdrasil Branch Staff": "yggdrasil-branch-staff.png",
  "Kitsune Tail Sash": "kitsune-tail-sash.png",
  "Celtic Torc Necklace": "celtic-torc-necklace.png",

  // Tier 3 (Rare) - Magical Mythological Items
  "Poseidon's Coral Trident": "poseidons-coral-trident.png",
  "Thor's Hammer Pendant": "thors-hammer-pendant.png",
  "Isis Wings Cloak": "isis-wings-cloak.png",
  "Fenrir Fang Blade": "fenrir-fang-blade.png",
  "Jade Emperor Crown": "jade-emperor-crown.png",

  // Tier 4 (Epic) - Powerful Mythological Artifacts
  "Medusa's Petrifying Gaze Shield": "medusas-petrifying-gaze-shield.png",
  "Valkyrie's Soul Reaping Spear": "valkyries-soul-reaping-spear.png",
  "Ra's Solar Disc Crown": "ras-solar-disc-crown.png",
  "Susanoo Storm Blade": "susanoo-storm-blade.png",
  "Excalibur's Divine Scabbard": "excaliburs-divine-scabbard.png",

  // Tier 5 (Legendary) - Mythological Mastery
  "Zeus Lightning Bolt Spear": "zeus-lightning-bolt-spear.png",
  "Odin's All-Seeing Eye": "odins-all-seeing-eye.png",
  "Osiris Resurrection Ankh": "osiris-resurrection-ankh.png",
  "Amaterasu Sun Mirror": "amaterasu-sun-mirror.png",
  "Loki's Reality-Bending Mask": "lokis-reality-bending-mask.png",

  // Tier 6 (Mythic) - Ultimate Mythological Power
  "Kronos Time-Devouring Scythe": "kronos-time-devouring-scythe.png",
  "Yggdrasil World Tree Heart": "yggdrasil-world-tree-heart.png",
  "Jörmungandr World Serpent": "jormungandr-world-serpent.png",
  "Brahma's Creation Lotus": "brahmas-creation-lotus.png",
  "Ragnarok Twilight Sword": "ragnarok-twilight-sword.png",
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
