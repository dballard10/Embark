/**
 * Type guards for runtime type checking
 */

import type { Quest, UserCompletedQuest } from "./quest.types";
import type { Item, UserItem } from "./item.types";
import type { User } from "./user.types";

// ============================================================================
// Quest Type Guards
// ============================================================================

/**
 * Check if quest is active
 */
export function isActiveQuest(quest: UserCompletedQuest): boolean {
  return quest.is_active === true;
}

/**
 * Check if quest is completed
 */
export function isCompletedQuest(quest: UserCompletedQuest): boolean {
  return quest.is_active === false && quest.completed_at !== null;
}

/**
 * Check if quest has expired (deadline passed but not completed)
 */
export function isExpiredQuest(quest: UserCompletedQuest): boolean {
  if (!quest.is_active) return false;
  const deadline = new Date(quest.deadline_at);
  const now = new Date();
  return now > deadline;
}

/**
 * Check if object is a Quest
 */
export function isQuest(obj: any): obj is Quest {
  return (
    obj &&
    typeof obj === "object" &&
    "id" in obj &&
    "title" in obj &&
    "tier" in obj &&
    "glory_reward" in obj &&
    "xp_reward" in obj
  );
}

/**
 * Check if object is a UserCompletedQuest
 */
export function isUserCompletedQuest(obj: any): obj is UserCompletedQuest {
  return (
    obj &&
    typeof obj === "object" &&
    "id" in obj &&
    "user_id" in obj &&
    "quest_id" in obj &&
    "started_at" in obj &&
    "is_active" in obj
  );
}

// ============================================================================
// Item Type Guards
// ============================================================================

/**
 * Check if object is an Item
 */
export function isItem(obj: any): obj is Item {
  return (
    obj &&
    typeof obj === "object" &&
    "id" in obj &&
    "name" in obj &&
    "price" in obj &&
    "rarity_tier" in obj &&
    "rarity_stars" in obj
  );
}

/**
 * Check if object is a UserItem
 */
export function isUserItem(obj: any): obj is UserItem {
  return (
    obj &&
    typeof obj === "object" &&
    "id" in obj &&
    "user_id" in obj &&
    "item_id" in obj &&
    "acquired_at" in obj
  );
}

/**
 * Check if item is of specific tier
 */
export function isItemOfTier(item: Item | UserItem, tier: number): boolean {
  if ("item" in item && item.item) {
    return item.item.rarity_tier === tier;
  }
  if ("rarity_tier" in item) {
    return item.rarity_tier === tier;
  }
  return false;
}

/**
 * Check if item is legendary or higher (tier 5+)
 */
export function isLegendaryItem(item: Item | UserItem): boolean {
  const tier =
    "item" in item && item.item
      ? item.item.rarity_tier
      : (item as Item).rarity_tier;
  return tier >= 5;
}

// ============================================================================
// User Type Guards
// ============================================================================

/**
 * Check if object is a User
 */
export function isUser(obj: any): obj is User {
  return (
    obj &&
    typeof obj === "object" &&
    "id" in obj &&
    "username" in obj &&
    "total_xp" in obj &&
    "total_glory" in obj
  );
}

/**
 * Check if user has enough glory for purchase
 */
export function hasEnoughGlory(user: User, price: number): boolean {
  return user.total_glory >= price;
}

// ============================================================================
// Array Type Guards
// ============================================================================

/**
 * Check if all elements in array are Quests
 */
export function isQuestArray(arr: any[]): arr is Quest[] {
  return arr.every(isQuest);
}

/**
 * Check if all elements in array are Items
 */
export function isItemArray(arr: any[]): arr is Item[] {
  return arr.every(isItem);
}

/**
 * Check if all elements in array are UserItems
 */
export function isUserItemArray(arr: any[]): arr is UserItem[] {
  return arr.every(isUserItem);
}

// ============================================================================
// Validation Helpers
// ============================================================================

/**
 * Validate quest tier is within valid range
 */
export function isValidTier(tier: number): boolean {
  return tier >= 1 && tier <= 6;
}

/**
 * Validate rarity stars is within valid range
 */
export function isValidStars(stars: number): boolean {
  return stars >= 1 && stars <= 6;
}

/**
 * Check if value is a valid UUID
 */
export function isValidUUID(value: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

/**
 * Check if date string is valid
 */
export function isValidDateString(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
