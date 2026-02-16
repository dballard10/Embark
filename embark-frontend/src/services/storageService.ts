import type { GachaState, GachaStats } from '../types/gacha.types';

const STORAGE_KEY = 'embark_gacha_state';

const DEFAULT_STATS: GachaStats = {
  totalPulls: 0,
  totalSinglePulls: 0,
  totalMultiPulls: 0,
  highestTierPulled: 1,
  pullsByTier: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
  totalGloryEarned: 0,
  totalGlorySpent: 0,
  totalItemsSold: 0,
};

const DEFAULT_STATE: GachaState = {
  glory: 5000,
  inventory: [],
  pullHistory: [],
  stats: { ...DEFAULT_STATS },
};

const MAX_PULL_HISTORY = 500;

export function loadState(): GachaState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE, stats: { ...DEFAULT_STATS } };

    const parsed = JSON.parse(raw) as GachaState;

    // Ensure all expected fields exist (handles schema migration)
    return {
      glory: parsed.glory ?? DEFAULT_STATE.glory,
      inventory: parsed.inventory ?? [],
      pullHistory: parsed.pullHistory ?? [],
      stats: {
        ...DEFAULT_STATS,
        ...parsed.stats,
        pullsByTier: {
          ...DEFAULT_STATS.pullsByTier,
          ...parsed.stats?.pullsByTier,
        },
      },
    };
  } catch {
    return { ...DEFAULT_STATE, stats: { ...DEFAULT_STATS } };
  }
}

export function saveState(state: GachaState): void {
  try {
    // Cap pull history to prevent unbounded localStorage growth
    const trimmedState: GachaState = {
      ...state,
      pullHistory: state.pullHistory.slice(0, MAX_PULL_HISTORY),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedState));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

export function resetState(): GachaState {
  const fresh = { ...DEFAULT_STATE, stats: { ...DEFAULT_STATS } };
  localStorage.removeItem(STORAGE_KEY);
  return fresh;
}
