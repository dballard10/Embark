import { useState, useEffect, useCallback, useRef } from 'react';
import type { PullResult } from '../../types/gacha.types';
import type { RarityTier } from '../../types/item.types';
import { PullResultCard } from './PullResultCard';
import { useScreenShake } from './useScreenShake';

type Phase = 'buildup' | 'flash' | 'reveal' | 'result';

interface PullAnimationOverlayProps {
  results: PullResult[];
  onComplete: () => void;
}

// Tier-based timing configs
const TIER_CONFIG: Record<RarityTier, { buildup: number; flash: number; reveal: number; shakeIntensity: number; shakeDuration: number }> = {
  1: { buildup: 600,  flash: 200, reveal: 400, shakeIntensity: 0,   shakeDuration: 0 },
  2: { buildup: 700,  flash: 250, reveal: 450, shakeIntensity: 0,   shakeDuration: 0 },
  3: { buildup: 1000, flash: 300, reveal: 500, shakeIntensity: 0.2, shakeDuration: 200 },
  4: { buildup: 1300, flash: 400, reveal: 600, shakeIntensity: 0.4, shakeDuration: 400 },
  5: { buildup: 1800, flash: 500, reveal: 700, shakeIntensity: 0.6, shakeDuration: 600 },
  6: { buildup: 2200, flash: 600, reveal: 800, shakeIntensity: 0.8, shakeDuration: 800 },
};

const TIER_COLORS: Record<RarityTier, { orb: string; flash: string; particles: string }> = {
  1: { orb: 'bg-gray-400',    flash: 'bg-gray-300/80',    particles: '#9ca3af' },
  2: { orb: 'bg-green-400',   flash: 'bg-green-300/80',   particles: '#4ade80' },
  3: { orb: 'bg-blue-400',    flash: 'bg-blue-300/80',    particles: '#60a5fa' },
  4: { orb: 'bg-purple-400',  flash: 'bg-purple-300/80',  particles: '#c084fc' },
  5: { orb: 'bg-orange-400',  flash: 'bg-yellow-200/90',  particles: '#fbbf24' },
  6: { orb: 'bg-red-400',     flash: 'bg-white/95',       particles: '#f87171' },
};

// Particle element for CSS-based particle effects
function Particles({ tier, phase }: { tier: RarityTier; phase: Phase }) {
  const count = tier <= 2 ? 12 : tier <= 4 ? 20 : 30;
  const color = TIER_COLORS[tier].particles;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * 360;
        const delay = Math.random() * 0.5;
        const size = 2 + Math.random() * (tier > 4 ? 6 : 3);
        const distance = phase === 'buildup' ? 0 : 40 + Math.random() * 60;

        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              boxShadow: tier >= 5 ? `0 0 ${size * 2}px ${color}` : undefined,
              transform: phase === 'flash' || phase === 'reveal'
                ? `translate(-50%, -50%) rotate(${angle}deg) translateY(-${distance}vh)`
                : `translate(-50%, -50%) rotate(${angle}deg) translateY(-${10 + Math.random() * 20}px)`,
              opacity: phase === 'result' ? 0.3 : phase === 'buildup' ? 0.6 : 1,
              transition: `all ${0.3 + delay}s cubic-bezier(0.34, 1.56, 0.64, 1)`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export function PullAnimationOverlay({ results, onComplete }: PullAnimationOverlayProps) {
  const isMulti = results.length > 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('buildup');
  const [showMultiGrid, setShowMultiGrid] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const { shake } = useScreenShake();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentResult = results[currentIndex];
  const tier = currentResult.item.tier;
  const config = TIER_CONFIG[tier];
  const colors = TIER_COLORS[tier];

  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  // Animate a single pull through phases
  const animatePull = useCallback((index: number) => {
    const result = results[index];
    const t = result.item.tier;
    const cfg = TIER_CONFIG[t];

    setCurrentIndex(index);
    setPhase('buildup');

    timeoutRef.current = setTimeout(() => {
      setPhase('flash');
      if (cfg.shakeIntensity > 0) {
        shake(cfg.shakeIntensity, cfg.shakeDuration);
      }

      timeoutRef.current = setTimeout(() => {
        setPhase('reveal');

        timeoutRef.current = setTimeout(() => {
          setPhase('result');
        }, cfg.reveal);
      }, cfg.flash);
    }, cfg.buildup);
  }, [results, shake]);

  // Start animation
  useEffect(() => {
    animatePull(0);
    return clearTimeouts;
  }, [animatePull, clearTimeouts]);

  const handleTap = useCallback(() => {
    if (phase !== 'result') return;

    if (isMulti) {
      const nextIndex = currentIndex + 1;
      if (nextIndex < results.length) {
        animatePull(nextIndex);
      } else {
        setShowMultiGrid(true);
      }
    } else {
      onComplete();
    }
  }, [phase, isMulti, currentIndex, results.length, animatePull, onComplete]);

  const handleSkip = useCallback(() => {
    clearTimeouts();
    setSkipped(true);
    if (isMulti) {
      setShowMultiGrid(true);
    } else {
      setPhase('result');
      setCurrentIndex(0);
    }
  }, [clearTimeouts, isMulti]);

  // Multi-pull grid result
  if (showMultiGrid) {
    const sortedResults = [...results].sort((a, b) => b.item.tier - a.item.tier);

    return (
      <div
        className="fixed inset-0 z-[90] bg-black/95 flex flex-col items-center justify-center p-4"
        onClick={onComplete}
      >
        <h2 className="text-2xl font-title font-bold text-white mb-4">
          Summon Results
        </h2>
        <div className="grid grid-cols-5 gap-2 sm:gap-3 max-w-lg w-full mb-6">
          {sortedResults.map((result, i) => (
            <PullResultCard key={i} result={result} compact />
          ))}
        </div>
        <p className="text-gray-500 text-sm animate-pulse">Tap anywhere to continue</p>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
      onClick={phase === 'result' ? handleTap : undefined}
    >
      {/* Background */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          phase === 'buildup' ? 'bg-black/90' :
          phase === 'flash' ? 'bg-black/50' :
          'bg-black/85'
        }`}
      />

      {/* Particles */}
      <Particles tier={tier} phase={phase} />

      {/* Orb (buildup phase) */}
      {(phase === 'buildup' || phase === 'flash') && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`rounded-full ${colors.orb} transition-all ${
              phase === 'buildup'
                ? 'w-8 h-8 sm:w-12 sm:h-12 opacity-80 animate-pulse'
                : 'w-[200vw] h-[200vh] opacity-0'
            }`}
            style={{
              boxShadow: `0 0 ${tier * 15}px ${tier * 8}px ${TIER_COLORS[tier].particles}`,
              transitionDuration: phase === 'flash' ? `${config.flash}ms` : `${config.buildup}ms`,
              transitionTimingFunction: phase === 'flash' ? 'ease-out' : 'ease-in',
            }}
          />
        </div>
      )}

      {/* Flash overlay */}
      {phase === 'flash' && (
        <div
          className={`absolute inset-0 ${colors.flash} animate-pulse`}
          style={{
            animation: `fadeOut ${config.flash}ms ease-out forwards`,
          }}
        />
      )}

      {/* Item reveal */}
      {(phase === 'reveal' || phase === 'result') && (
        <div
          className={`relative z-10 transition-all duration-500 ${
            phase === 'reveal'
              ? 'scale-0 opacity-0'
              : 'scale-100 opacity-100'
          }`}
          style={{
            animation: phase === 'reveal'
              ? `itemReveal ${config.reveal}ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards`
              : undefined,
          }}
        >
          <PullResultCard result={currentResult} />
        </div>
      )}

      {/* Tap prompt */}
      {phase === 'result' && (
        <div className="absolute bottom-20 left-0 right-0 text-center">
          <p className="text-gray-500 text-sm animate-pulse">
            {isMulti && currentIndex < results.length - 1
              ? `Tap to continue (${currentIndex + 1}/${results.length})`
              : 'Tap to continue'}
          </p>
        </div>
      )}

      {/* Skip button */}
      {!skipped && phase !== 'result' && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="absolute top-6 right-6 z-20 px-4 py-2 rounded-full bg-white/10 text-gray-400 text-sm font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm"
        >
          Skip
        </button>
      )}

      {/* Multi progress indicator */}
      {isMulti && !showMultiGrid && (
        <div className="absolute top-6 left-6 z-20 px-3 py-1.5 rounded-full bg-white/10 text-gray-400 text-xs font-semibold backdrop-blur-sm">
          {currentIndex + 1} / {results.length}
        </div>
      )}
    </div>
  );
}
