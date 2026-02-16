import type { RarityTier, OwnedItem, PullRecord, GachaItem } from './item.types';

export interface GachaStats {
  totalPulls: number;
  totalSinglePulls: number;
  totalMultiPulls: number;
  highestTierPulled: RarityTier;
  pullsByTier: Record<RarityTier, number>;
  totalGloryEarned: number;
  totalGlorySpent: number;
  totalItemsSold: number;
}

export interface GachaState {
  glory: number;
  inventory: OwnedItem[];
  pullHistory: PullRecord[];
  stats: GachaStats;
}

export type PullAnimationPhase =
  | 'idle'
  | 'buildup'
  | 'flash'
  | 'reveal'
  | 'result'
  | 'complete';

export interface PullResult {
  item: GachaItem;
  isNew: boolean;
}
