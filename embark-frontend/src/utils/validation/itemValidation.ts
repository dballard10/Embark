import type { Item, UserItem } from "../../types/item.types";

/**
 * Check if user can afford an item
 */
export function canAffordItem(
  userGlory: number,
  itemPrice: number
): {
  canAfford: boolean;
  shortfall?: number;
} {
  if (userGlory >= itemPrice) {
    return { canAfford: true };
  }

  return {
    canAfford: false,
    shortfall: itemPrice - userGlory,
  };
}

/**
 * Check if user already owns an item
 */
export function ownsItem(itemId: string, userItems: UserItem[]): boolean {
  return userItems.some((ui) => ui.item_id === itemId);
}

/**
 * Validate item purchase
 */
export function canPurchaseItem(
  item: Item,
  userGlory: number,
  userItems: UserItem[]
): {
  canPurchase: boolean;
  reason?: string;
} {
  // Check if already owned
  if (ownsItem(item.id, userItems)) {
    return {
      canPurchase: false,
      reason: "You already own this item",
    };
  }

  // Check if can afford
  const affordResult = canAffordItem(userGlory, item.price);
  if (!affordResult.canAfford) {
    return {
      canPurchase: false,
      reason: `Insufficient glory. Need ${affordResult.shortfall} more glory.`,
    };
  }

  return { canPurchase: true };
}

/**
 * Get items user can afford
 */
export function getAffordableItems(items: Item[], userGlory: number): Item[] {
  return items.filter((item) => item.price <= userGlory);
}

/**
 * Get recommended items based on user's tier
 */
export function getRecommendedItems(
  items: Item[],
  userLevel: number,
  maxTier?: number
): Item[] {
  const recommendedTier = Math.min(
    Math.floor(userLevel / 10) + 1,
    maxTier || 6
  );

  return items.filter((item) => item.rarity_tier <= recommendedTier + 1);
}
