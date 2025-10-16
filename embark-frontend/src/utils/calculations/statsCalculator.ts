import type { UserItem } from "../../types/item.types";

/**
 * Sort items by rarity (tier, stars, price)
 */
export function sortItemsByRarity(items: UserItem[]): UserItem[] {
  return [...items].sort((a, b) => {
    // First by rarity_tier (higher is better)
    if (a.item && b.item && a.item.rarity_tier !== b.item.rarity_tier) {
      return b.item.rarity_tier - a.item.rarity_tier;
    }
    // Then by rarity_stars (higher is better)
    if (a.item && b.item && a.item.rarity_stars !== b.item.rarity_stars) {
      return b.item.rarity_stars - a.item.rarity_stars;
    }
    // Finally by price/glory cost (higher is better)
    if (a.item && b.item && a.item.price !== b.item.price) {
      return b.item.price - a.item.price;
    }
    return 0;
  });
}

/**
 * Calculate total value of items
 */
export function calculateTotalItemValue(items: UserItem[]): number {
  return items.reduce((total, userItem) => {
    return total + (userItem.item?.price || 0);
  }, 0);
}

/**
 * Group items by tier
 */
export function groupItemsByTier(
  items: UserItem[]
): Record<number, UserItem[]> {
  const grouped: Record<number, UserItem[]> = {};

  items.forEach((item) => {
    const tier = item.item?.rarity_tier || 1;
    if (!grouped[tier]) {
      grouped[tier] = [];
    }
    grouped[tier].push(item);
  });

  return grouped;
}

/**
 * Calculate average item tier
 */
export function calculateAverageItemTier(items: UserItem[]): number {
  if (items.length === 0) return 0;

  const totalTier = items.reduce((sum, item) => {
    return sum + (item.item?.rarity_tier || 0);
  }, 0);

  return totalTier / items.length;
}
