import { useState, useCallback, useMemo } from 'react';
import { BottomNav } from '../components/layout/BottomNav';
import { TopBar } from '../components/layout/TopBar';
import { PullAnimationOverlay } from '../components/pull/PullAnimationOverlay';
import { useGacha } from '../contexts/GachaContext';
import { ITEM_BY_ID, TIER_NAMES } from '../data/itemCatalog';
import type { PullResult } from '../types/gacha.types';
import type { RarityTier } from '../types/item.types';

const TIER_RING_COLORS: Record<RarityTier, string> = {
  1: 'border-gray-500/60',
  2: 'border-green-500/60',
  3: 'border-blue-500/60',
  4: 'border-purple-500/60',
  5: 'border-orange-500/60',
  6: 'border-red-500/60',
};

export default function PullPage() {
  const { doPull, pullHistory } = useGacha();
  const [animResults, setAnimResults] = useState<PullResult[] | null>(null);

  const recentPulls = useMemo(() => {
    return pullHistory.slice(0, 10).map((record) => ({
      ...record,
      item: ITEM_BY_ID[record.itemId],
    })).filter((r) => r.item);
  }, [pullHistory]);

  const handlePull = useCallback(
    (type: 'single' | 'multi') => {
      const results = doPull(type);
      setAnimResults(results);
    },
    [doPull]
  );

  const handleAnimComplete = useCallback(() => {
    setAnimResults(null);
  }, []);

  return (
    <div id="shake-container" className="game-container min-h-screen pb-20 pt-16">
      <TopBar />

      <div className="px-4 py-6 flex flex-col items-center gap-8">
        {/* Summoning Circle */}
        <div className="relative flex items-center justify-center mt-4">
          {/* Outer rotating ring */}
          <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-purple-500/30 animate-spin-slow" />
          {/* Middle pulsing ring */}
          <div className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-purple-400/20 animate-pulse" />
          {/* Inner glow */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-800/30 border border-purple-500/40 flex items-center justify-center shadow-[0_0_60px_rgba(147,51,234,0.3)]">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-title font-bold bg-gradient-to-b from-purple-300 to-purple-100 bg-clip-text text-transparent">
                ✦
              </div>
              <p className="text-purple-300/80 text-xs font-semibold mt-1 tracking-wider">
                SUMMON
              </p>
            </div>
          </div>
          {/* Floating particles around circle */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <div
              key={deg}
              className="absolute w-1.5 h-1.5 rounded-full bg-purple-400/60 animate-float-particle"
              style={{
                transform: `rotate(${deg}deg) translateY(-120px)`,
                animationDelay: `${deg / 360 * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Pull Buttons */}
        <div className="flex gap-4 w-full max-w-sm">
          <button
            onClick={() => handlePull('single')}
            className="flex-1 relative group overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 p-[1px]"
          >
            <div className="bg-slate-900/80 rounded-xl px-4 py-4 flex flex-col items-center gap-1 group-hover:bg-slate-900/60 transition-colors">
              <span className="text-lg font-bold text-white">Summon ×1</span>
              <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                FREE
              </span>
            </div>
          </button>

          <button
            onClick={() => handlePull('multi')}
            className="flex-1 relative group overflow-hidden rounded-xl bg-gradient-to-br from-orange-500 to-red-600 p-[1px]"
          >
            <div className="bg-slate-900/80 rounded-xl px-4 py-4 flex flex-col items-center gap-1 group-hover:bg-slate-900/60 transition-colors">
              <span className="text-lg font-bold text-white">Summon ×10</span>
              <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                FREE
              </span>
            </div>
          </button>
        </div>

        {/* Recent Pulls */}
        {recentPulls.length > 0 && (
          <div className="w-full max-w-sm">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 tracking-wider uppercase">
              Recent Summons
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {recentPulls.map((pull) => (
                <div
                  key={pull.id}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg border-2 ${TIER_RING_COLORS[pull.tier]} bg-slate-800/60 p-1 flex items-center justify-center`}
                  title={`${pull.item.name} — ${TIER_NAMES[pull.tier]}`}
                >
                  <img
                    src={`/items/${pull.item.imageFilename}`}
                    alt={pull.item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drop Rate Info */}
        <div className="w-full max-w-sm">
          <details className="group">
            <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400 transition-colors text-center">
              Drop Rates
            </summary>
            <div className="mt-2 grid grid-cols-3 gap-1.5 text-center text-xs">
              {([1, 2, 3, 4, 5, 6] as RarityTier[]).map((tier) => {
                const rates = [40, 25, 18, 10, 5, 2];
                return (
                  <div key={tier} className="bg-white/5 rounded-lg px-2 py-1.5">
                    <div className="text-gray-400 text-[10px]">{TIER_NAMES[tier]}</div>
                    <div className="text-white font-semibold">{rates[tier - 1]}%</div>
                  </div>
                );
              })}
            </div>
          </details>
        </div>
      </div>

      <BottomNav />

      {/* Pull Animation Overlay */}
      {animResults && (
        <PullAnimationOverlay
          results={animResults}
          onComplete={handleAnimComplete}
        />
      )}
    </div>
  );
}
