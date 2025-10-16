/**
 * Core game configuration constants
 */

export const GAME_CONFIG = {
  // Quest limits
  MAX_ACTIVE_QUESTS: 4,
  DEFAULT_QUEST_LIMIT: 50,

  // Level system
  XP_PER_LEVEL: 10000,
  MAX_LEVEL: 100,

  // Tiers
  MIN_TIER: 1,
  MAX_TIER: 6,

  // Rarity
  MIN_STARS: 1,
  MAX_STARS: 6,

  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,

  // Time
  HOURS_PER_DAY: 24,
  MINUTES_PER_HOUR: 60,
  SECONDS_PER_MINUTE: 60,

  // Animation durations (ms)
  ANIMATION_FAST: 150,
  ANIMATION_NORMAL: 300,
  ANIMATION_SLOW: 500,
  ANIMATION_SLOWER: 700,

  // Modal close delay (ms)
  MODAL_CLOSE_DELAY: 300,

  // API
  API_TIMEOUT: 10000, // 10 seconds
  API_RETRY_ATTEMPTS: 3,
  API_RETRY_DELAY: 1000, // 1 second
} as const;

/**
 * Feature flags
 */
export const FEATURES = {
  ENABLE_ACHIEVEMENTS: false,
  ENABLE_SOCIAL: false,
  ENABLE_LEADERBOARDS: false,
  ENABLE_DAILY_QUESTS: false,
  ENABLE_SEASONAL_EVENTS: false,
} as const;

/**
 * UI Configuration
 */
export const UI_CONFIG = {
  // Top items to display on homepage
  TOP_ITEMS_COUNT: 4,

  // Active quests grid size
  ACTIVE_QUESTS_GRID_SIZE: 4,

  // Items per row in grid
  ITEMS_PER_ROW: {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  },

  // Skeleton loaders count
  SKELETON_COUNT: {
    quests: 8,
    items: 8,
  },
} as const;

/**
 * Currency display names
 */
export const CURRENCY = {
  GLORY: "Glory",
  XP: "XP",
  LEVEL: "Level",
} as const;

/**
 * Tier names
 */
export const TIER_NAMES: Record<number, string> = {
  1: "Common",
  2: "Uncommon",
  3: "Rare",
  4: "Epic",
  5: "Legendary",
  6: "Mythic",
};

/**
 * Quest difficulty names (based on tier)
 */
export const DIFFICULTY_NAMES: Record<number, string> = {
  1: "Trivial",
  2: "Easy",
  3: "Moderate",
  4: "Challenging",
  5: "Hard",
  6: "Extreme",
};
