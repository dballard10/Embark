/**
 * Utility functions for handling quest enemy images
 */

/**
 * Maps enemy names to their corresponding image filenames in /public/enemies/
 * Updated for lineage-based enemy progression
 */
const enemyImageMap: Record<string, string> = {
  // RUNNING - Wind Elemental Lineage
  "Wind Sprite": "wind-sprite.png",
  "Gale Spirit": "gale-spirit.png",
  "Storm Elemental": "storm-elemental.png",
  "Tempest Lord": "tempest-lord.png",
  "Hurricane Primordial": "hurricane-primordial.png",
  "Celestial Windstorm": "celestial-windstorm.png",

  // STRENGTH TRAINING - Orc Lineage
  "Grunt Orc": "grunt-orc.png",
  "Battle Orc": "battle-orc.png",
  "Orc Captain": "orc-captain.png",
  "Orc Warchief": "orc-warchief.png",
  "Orc King": "orc-king.png",
  "Immortal Orc Emperor": "immortal-orc-emperor.png",

  // READING - Scholar Undead Lineage
  "Dusty Skeleton": "dusty-skeleton.png",
  "Book Wraith": "book-wraith.png",
  "Scholar Specter": "scholar-specter.png",
  "Ancient Lich": "ancient-lich.png",
  "Archlich Sage": "archlich-sage.png",
  "Eternal Knowledge Lich": "eternal-knowledge-lich.png",

  // MEDITATION - Shadow Demon Lineage
  "Chaos Imp": "chaos-imp.png",
  "Mind Demon": "mind-demon.png",
  "Ego Fiend": "ego-fiend.png",
  "Thought Demon": "thought-demon.png",
  "Enlightenment Archfiend": "enlightenment-archfiend.png",
  "Void Demon Lord": "void-demon-lord.png",

  // FINANCE - Dragon Lineage
  "Wyrmling Hoarder": "wyrmling-hoarder.png",
  "Young Gold Dragon": "young-gold-dragon.png",
  "Adult Treasure Dragon": "adult-treasure-dragon.png",
  "Ancient Gold Dragon": "ancient-gold-dragon.png",
  "Legendary Platinum Dragon": "legendary-platinum-dragon.png",
  "Primordial Wealth Dragon": "primordial-wealth-dragon.png",

  // COOKING - Fire Elemental Lineage
  "Flame Sprite": "flame-sprite.png",
  "Fire Spirit": "fire-spirit.png",
  "Blaze Elemental": "blaze-elemental.png",
  "Inferno Guardian": "inferno-guardian.png",
  "Volcanic Titan": "volcanic-titan.png",
  "Eternal Flame Primordial": "eternal-flame-primordial.png",

  // LANGUAGE LEARNING - Babel Construct Lineage
  "Word Golem": "word-golem.png",
  "Phrase Construct": "phrase-construct.png",
  "Grammar Sentinel": "grammar-sentinel.png",
  "Polyglot Automaton": "polyglot-automaton.png",
  "Translation Colossus": "translation-colossus.png",
  "Omnilingual Oracle": "omnilingual-oracle.png",

  // PUZZLES - Sphinx Lineage
  "Riddle Cat": "riddle-cat.png",
  "Puzzle Lynx": "puzzle-lynx.png",
  "Enigma Sphinx": "enigma-sphinx.png",
  "Grand Sphinx": "grand-sphinx.png",
  "Ancient Sphinx Lord": "ancient-sphinx-lord.png",
  "Eternal Riddlemaster": "eternal-riddlemaster.png",

  // TRAVEL - Beast Lineage
  "Travel Wolf": "travel-wolf.png",
  "Journey Dire Wolf": "journey-dire-wolf.png",
  "Wanderlust Worg": "wanderlust-worg.png",
  "Expedition Beast": "expedition-beast.png",
  "Legendary Pathfinder": "legendary-pathfinder.png",
  "Galactic Wanderer": "galactic-wanderer.png",

  // SWIMMING - Sea Serpent Lineage
  "Water Snake": "water-snake.png",
  "Sea Serpent": "sea-serpent.png",
  "Ocean Wyrm": "ocean-wyrm.png",
  "Deep Sea Serpent": "deep-sea-serpent.png",
  Leviathan: "leviathan.png",
  "Abyssal Sea Dragon": "abyssal-sea-dragon.png",

  // NUTRITION - Nature Spirit Lineage
  "Herb Sprite": "herb-sprite.png",
  "Garden Spirit": "garden-spirit.png",
  "Harvest Guardian": "harvest-guardian.png",
  "Vitality Dryad": "vitality-dryad.png",
  "Ancient Life Treant": "ancient-life-treant.png",
  "Elder Nature Titan": "elder-nature-titan.png",

  // DATING/RELATIONSHIPS - Cupid/Angel Lineage
  "Anxious Cherub": "anxious-cherub.png",
  "Heartbreak Cupid": "heartbreak-cupid.png",
  "Solitude Angel": "solitude-angel.png",
  "Discord Seraph": "discord-seraph.png",
  "Isolation Archangel": "isolation-archangel.png",
  "Eternal Bond Celestial": "eternal-bond-celestial.png",

  // CREATIVE WRITING - Muse Fey Lineage
  "Blank Page Pixie": "blank-page-pixie.png",
  "Critic Fairy": "critic-fairy.png",
  "Plot Fey": "plot-fey.png",
  "Inspiration Nymph": "inspiration-nymph.png",
  "Muse Queen": "muse-queen.png",
  "Eternal Story Archfey": "eternal-story-archfey.png",

  // PUBLIC SPEAKING - Gargoyle Lineage
  "Timid Gargoyle": "timid-gargoyle.png",
  "Heckler Gargoyle": "heckler-gargoyle.png",
  "Judge Gargoyle": "judge-gargoyle.png",
  "Critic Gargoyle Lord": "critic-gargoyle-lord.png",
  "Eloquence Gargoyle King": "eloquence-gargoyle-king.png",
  "Voice Gargoyle Emperor": "voice-gargoyle-emperor.png",

  // MUSIC - Siren Lineage
  "Discordant Songbird": "discordant-songbird.png",
  "Harmony Harpy": "harmony-harpy.png",
  "Melody Siren": "melody-siren.png",
  "Symphony Banshee": "symphony-banshee.png",
  "Orchestra Siren Queen": "orchestra-siren-queen.png",
  "Eternal Song Primordial": "eternal-song-primordial.png",
};

/**
 * Gets the local image path for an enemy
 * @param enemyName - The name of the enemy
 * @returns The path to the image in /enemies/ directory, or null if not found
 */
export function getEnemyImagePath(enemyName: string): string | null {
  const filename = enemyImageMap[enemyName];
  if (!filename) {
    return null;
  }
  return `/enemies/${filename}`;
}

/**
 * Gets the image URL for an enemy, preferring the database URL if available,
 * otherwise falling back to the local image
 * @param enemyName - The name of the enemy
 * @param databaseImageUrl - The image URL from the database (optional)
 * @returns The image URL to use, or null if no image is available
 */
export function getEnemyImage(
  enemyName: string,
  databaseImageUrl?: string | null
): string | null {
  // Prefer database URL if it exists
  if (databaseImageUrl) {
    return databaseImageUrl;
  }

  // Fall back to local image
  return getEnemyImagePath(enemyName);
}
