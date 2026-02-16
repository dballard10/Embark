import type { PullResult } from '../../types/gacha.types';
import { TIER_NAMES } from '../../data/itemCatalog';
import type { RarityTier } from '../../types/item.types';

const TIER_BG: Record<RarityTier, string> = {
  1: 'from-gray-700 to-gray-800 border-gray-500/60',
  2: 'from-green-800 to-green-900 border-green-500/60',
  3: 'from-blue-800 to-blue-900 border-blue-500/60',
  4: 'from-purple-800 to-purple-900 border-purple-500/60',
  5: 'from-orange-800 to-orange-900 border-orange-500/60',
  6: 'from-red-800 to-red-900 border-red-500/60',
};

const TIER_GLOW: Record<RarityTier, string> = {
  1: '',
  2: '',
  3: 'shadow-blue-500/20',
  4: 'shadow-purple-500/30',
  5: 'shadow-orange-500/40 shadow-2xl',
  6: 'shadow-red-500/50 shadow-2xl',
};

const TIER_TEXT_COLOR: Record<RarityTier, string> = {
  1: 'text-gray-300',
  2: 'text-green-300',
  3: 'text-blue-300',
  4: 'text-purple-300',
  5: 'text-orange-300',
  6: 'text-red-300',
};

interface PullResultCardProps {
  result: PullResult;
  compact?: boolean;
}

export function PullResultCard({ result, compact = false }: PullResultCardProps) {
  const { item, isNew } = result;
  const stars = '★'.repeat(item.tier);

  if (compact) {
    return (
      <div
        className={`bg-gradient-to-b ${TIER_BG[item.tier]} border rounded-xl p-2 flex flex-col items-center gap-1 relative ${TIER_GLOW[item.tier]}`}
      >
        {isNew && (
          <div className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[8px] font-black px-1.5 py-0.5 rounded-full animate-bounce z-10">
            NEW
          </div>
        )}
        <img
          src={`/items/${item.imageFilename}`}
          alt={item.name}
          className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
        />
        <div className="text-[10px] font-bold text-white truncate w-full text-center">
          {item.name}
        </div>
        <div className={`text-[9px] tracking-widest ${TIER_TEXT_COLOR[item.tier]}`}>
          {stars}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 animate-fade-in">
      {/* Item Image */}
      <div className="relative">
        {isNew && (
          <div className="absolute -top-3 -right-3 bg-yellow-500 text-black text-sm font-black px-3 py-1 rounded-full animate-bounce z-10 shadow-lg shadow-yellow-500/50">
            NEW!
          </div>
        )}
        <div
          className={`w-40 h-40 sm:w-48 sm:h-48 rounded-2xl bg-gradient-to-b ${TIER_BG[item.tier]} border-2 p-4 ${TIER_GLOW[item.tier]} ${
            item.tier >= 5 ? 'animate-pulse-subtle' : ''
          }`}
        >
          <img
            src={`/items/${item.imageFilename}`}
            alt={item.name}
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Item Info */}
      <div className="text-center space-y-1">
        <div className={`text-lg tracking-[0.3em] font-bold ${TIER_TEXT_COLOR[item.tier]}`}>
          {stars}
        </div>
        <h2 className="text-2xl sm:text-3xl font-title font-bold text-white">
          {item.name}
        </h2>
        <p className={`text-sm font-semibold ${TIER_TEXT_COLOR[item.tier]}`}>
          {TIER_NAMES[item.tier]}
        </p>
        <p className="text-xs text-gray-400 max-w-xs mx-auto">
          {item.description}
        </p>
      </div>
    </div>
  );
}
