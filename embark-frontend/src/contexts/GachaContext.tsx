import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import type { ReactNode } from 'react';
import type { RarityTier, OwnedItem, PullRecord } from '../types/item.types';
import type { GachaState, GachaStats, PullResult } from '../types/gacha.types';
import { SELL_PRICES, BUY_PRICES, ITEM_BY_ID, TOTAL_ITEMS } from '../data/itemCatalog';
import { performSinglePull, performMultiPull, generateId } from '../services/gachaEngine';
import { loadState, saveState, resetState } from '../services/storageService';

interface GachaContextType {
  // State
  glory: number;
  inventory: OwnedItem[];
  pullHistory: PullRecord[];
  stats: GachaStats;

  // Computed
  uniqueItemCount: number;
  totalItemCount: number;
  collectionProgress: number;

  // Actions
  doPull: (type: 'single' | 'multi') => PullResult[];
  sellItem: (instanceId: string) => void;
  buyItem: (itemId: string) => boolean;
  resetAll: () => void;

  // Lookups
  getOwnedCount: (itemId: string) => number;
  isOwned: (itemId: string) => boolean;
}

const GachaContext = createContext<GachaContextType | null>(null);

export function GachaProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GachaState>(loadState);

  // Persist to localStorage on every state change
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Memoize the set of owned item IDs for pull lookups
  const ownedItemIds = useMemo(
    () => new Set(state.inventory.map((o) => o.itemId)),
    [state.inventory]
  );

  const uniqueItemCount = ownedItemIds.size;
  const totalItemCount = state.inventory.length;
  const collectionProgress = uniqueItemCount / TOTAL_ITEMS;

  const doPull = useCallback(
    (type: 'single' | 'multi'): PullResult[] => {
      const results =
        type === 'single'
          ? [performSinglePull(ownedItemIds)]
          : performMultiPull(ownedItemIds);

      const now = new Date().toISOString();

      // Create inventory entries and pull records
      const newInventory: OwnedItem[] = results.map((r) => ({
        instanceId: generateId(),
        itemId: r.item.id,
        acquiredAt: now,
        source: 'pull' as const,
      }));

      const newRecords: PullRecord[] = results.map((r) => ({
        id: generateId(),
        itemId: r.item.id,
        tier: r.item.tier,
        timestamp: now,
        pullType: type,
      }));

      setState((prev) => {
        const pullCount = results.length;
        const highestTier = Math.max(
          prev.stats.highestTierPulled,
          ...results.map((r) => r.item.tier)
        ) as RarityTier;

        const pullsByTier = { ...prev.stats.pullsByTier };
        for (const r of results) {
          pullsByTier[r.item.tier] = (pullsByTier[r.item.tier] || 0) + 1;
        }

        return {
          ...prev,
          inventory: [...prev.inventory, ...newInventory],
          pullHistory: [...newRecords, ...prev.pullHistory],
          stats: {
            ...prev.stats,
            totalPulls: prev.stats.totalPulls + pullCount,
            totalSinglePulls:
              prev.stats.totalSinglePulls + (type === 'single' ? 1 : 0),
            totalMultiPulls:
              prev.stats.totalMultiPulls + (type === 'multi' ? 1 : 0),
            highestTierPulled: highestTier,
            pullsByTier,
          },
        };
      });

      return results;
    },
    [ownedItemIds]
  );

  const sellItem = useCallback((instanceId: string) => {
    setState((prev) => {
      const item = prev.inventory.find((o) => o.instanceId === instanceId);
      if (!item) return prev;

      const catalogItem = ITEM_BY_ID[item.itemId];
      if (!catalogItem) return prev;

      const sellPrice = SELL_PRICES[catalogItem.tier];

      return {
        ...prev,
        glory: prev.glory + sellPrice,
        inventory: prev.inventory.filter((o) => o.instanceId !== instanceId),
        stats: {
          ...prev.stats,
          totalGloryEarned: prev.stats.totalGloryEarned + sellPrice,
          totalItemsSold: prev.stats.totalItemsSold + 1,
        },
      };
    });
  }, []);

  const buyItem = useCallback((itemId: string): boolean => {
    const catalogItem = ITEM_BY_ID[itemId];
    if (!catalogItem) return false;

    const price = BUY_PRICES[catalogItem.tier];
    let success = false;

    setState((prev) => {
      if (prev.glory < price) return prev;

      success = true;
      const newOwnedItem: OwnedItem = {
        instanceId: generateId(),
        itemId,
        acquiredAt: new Date().toISOString(),
        source: 'shop',
      };

      return {
        ...prev,
        glory: prev.glory - price,
        inventory: [...prev.inventory, newOwnedItem],
        stats: {
          ...prev.stats,
          totalGlorySpent: prev.stats.totalGlorySpent + price,
        },
      };
    });

    return success;
  }, []);

  const resetAllFn = useCallback(() => {
    setState(resetState());
  }, []);

  const getOwnedCount = useCallback(
    (itemId: string) =>
      state.inventory.filter((o) => o.itemId === itemId).length,
    [state.inventory]
  );

  const isOwned = useCallback(
    (itemId: string) => ownedItemIds.has(itemId),
    [ownedItemIds]
  );

  const value: GachaContextType = useMemo(
    () => ({
      glory: state.glory,
      inventory: state.inventory,
      pullHistory: state.pullHistory,
      stats: state.stats,
      uniqueItemCount,
      totalItemCount,
      collectionProgress,
      doPull,
      sellItem,
      buyItem,
      resetAll: resetAllFn,
      getOwnedCount,
      isOwned,
    }),
    [
      state,
      uniqueItemCount,
      totalItemCount,
      collectionProgress,
      doPull,
      sellItem,
      buyItem,
      resetAllFn,
      getOwnedCount,
      isOwned,
    ]
  );

  return (
    <GachaContext.Provider value={value}>{children}</GachaContext.Provider>
  );
}

export function useGacha(): GachaContextType {
  const ctx = useContext(GachaContext);
  if (!ctx) {
    throw new Error('useGacha must be used within a GachaProvider');
  }
  return ctx;
}
