import { IconSparkles } from "@tabler/icons-react";
import type { ProfileData } from "../../../hooks/useProfileData";

interface LevelProgressCardProps {
  profileData: ProfileData;
}

export function LevelProgressCard({ profileData }: LevelProgressCardProps) {
  const { currentLevel, xpToNext, levelProgressPercent, currentLevelXP } =
    profileData;

  return (
    <div className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <IconSparkles
            size={20}
            className="text-cyan-400 animate-pulse-subtle"
            stroke={2.5}
          />
          <span>Level Progress</span>
        </h3>
        <div className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg">
          <span className="text-sm font-bold text-blue-300">
            {Math.round(levelProgressPercent)}%
          </span>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-sm font-semibold text-gray-300">
            Level {currentLevel}
          </span>
          <span className="text-sm font-semibold text-gray-300">
            Level {currentLevel + 1}
          </span>
        </div>
        <div className="relative w-full h-8 bg-slate-800/80 rounded-full overflow-hidden border-2 border-slate-700/50 shadow-inner">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
          {/* Progress Fill with Animation */}
          <div
            className="relative h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 transition-all duration-700 ease-out flex items-center justify-end px-3 shadow-lg"
            style={{ width: `${levelProgressPercent}%` }}
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-subtle"></div>
            {levelProgressPercent > 15 && (
              <span className="relative text-sm font-black text-white drop-shadow-lg z-10">
                {Math.round(levelProgressPercent)}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* XP Details - Enhanced */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-lg p-4 border border-slate-700/50">
          <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1.5">
            Current Level XP
          </div>
          <div className="text-xl font-black text-white">
            {currentLevelXP.toLocaleString()}
            <span className="text-sm text-gray-400 font-semibold">
              {" "}
              / 10,000
            </span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-lg p-4 border border-slate-700/50">
          <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1.5">
            XP to Next Level
          </div>
          <div className="text-xl font-black text-white">
            {xpToNext.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
