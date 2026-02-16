import type { RarityTier, GachaItem } from '../types/item.types';
import type { PullResult } from '../types/gacha.types';
import { DROP_RATES, ITEMS_BY_TIER } from '../data/itemCatalog';

/**
 * Select a random tier using weighted drop rates.
 * Uses the cumulative distribution method.
 */
export function rollTier(): RarityTier {
  const roll = Math.random();
  let cumulative = 0;

  for (const tier of [1, 2, 3, 4, 5, 6] as RarityTier[]) {
    cumulative += DROP_RATES[tier];
    if (roll < cumulative) return tier;
  }

  // Fallback (should never reach due to rates summing to 1.0)
  return 1;
}

/**
 * Select a random item from a given tier.
 */
function rollItemFromTier(tier: RarityTier): GachaItem {
  const pool = ITEMS_BY_TIER[tier];
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

/**
 * Perform a single pull: roll a tier, then pick a random item from that tier.
 */
export function rollItem(): GachaItem {
  const tier = rollTier();
  return rollItemFromTier(tier);
}

/**
 * Generate a single pull result.
 * `ownedItemIds` is a Set of item IDs the user already owns (for "NEW" badge).
 */
export function performSinglePull(ownedItemIds: Set<string>): PullResult {
  const item = rollItem();
  return {
    item,
    isNew: !ownedItemIds.has(item.id),
  };
}

/**
 * Generate 10 pull results (multi-pull).
 */
export function performMultiPull(ownedItemIds: Set<string>): PullResult[] {
  const results: PullResult[] = [];
  // Track newly pulled items within this batch for accurate "isNew"
  const seenInBatch = new Set<string>();

  for (let i = 0; i < 10; i++) {
    const item = rollItem();
    const isNew = !ownedItemIds.has(item.id) && !seenInBatch.has(item.id);
    seenInBatch.add(item.id);
    results.push({ item, isNew });
  }

  return results;
}

/**
 * Generate a v4-style UUID for instance IDs.
 */
export function generateId(): string {
  return crypto.randomUUID();
}
