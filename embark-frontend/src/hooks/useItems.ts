import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchUserItems, fetchAllItems } from "../services/api";
import type { UserItem, Item } from "../types/item.types";

export interface UseItemsReturn {
  items: UserItem[];
  topItems: UserItem[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export interface UseAllItemsReturn {
  items: Item[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

/**
 * Sort items by rarity tier, stars, and price
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
 * Hook for fetching and managing user's items
 * @param userId - The user ID to fetch items for
 * @param topItemsCount - Number of top items to return (default: 4)
 * @returns User's items, top items, loading state, error, and refresh function
 */
export function useItems(
  userId: string | undefined,
  topItemsCount = 4
): UseItemsReturn {
  const [items, setItems] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadItems = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const userItems = await fetchUserItems(userId);
      setItems(userItems);
    } catch (err) {
      console.error("Error loading items:", err);
      setError(err instanceof Error ? err : new Error("Failed to load items"));
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // Calculate top items
  const topItems = useMemo(() => {
    const sorted = sortItemsByRarity(items);
    return sorted.slice(0, topItemsCount);
  }, [items, topItemsCount]);

  return {
    items,
    topItems,
    loading,
    error,
    refresh: loadItems,
  };
}

/**
 * Hook for fetching all available items (for shop)
 * @returns All items, loading state, error, and refresh function
 */
export function useAllItems(): UseAllItemsReturn {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const allItems = await fetchAllItems();
      setItems(allItems);
    } catch (err) {
      console.error("Error loading all items:", err);
      setError(err instanceof Error ? err : new Error("Failed to load items"));
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return {
    items,
    loading,
    error,
    refresh: loadItems,
  };
}
