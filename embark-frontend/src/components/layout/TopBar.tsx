import {
  calculateLevel,
  getLevelProgress,
  getCurrentLevelXP,
} from "../../utils/levelCalculator";
import { IconTrophy, IconSettings, IconBox } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../common/LoadingIcon";
import TitleBadge from "../common/TitleBadge";
import { useAchievements } from "../../contexts/AchievementsContext";

interface TopBarProps {
  username: string;
  totalXP: number;
  totalGlory: number;
  totalItems: number;
  isLoadingItems?: boolean;
}

export function TopBar({
  username,
  totalXP,
  totalGlory,
  totalItems,
  isLoadingItems = false,
}: TopBarProps) {
  const navigate = useNavigate();
  const { activeTitle } = useAchievements();
  const level = calculateLevel(totalXP);
  const levelProgress = getLevelProgress(totalXP);
  const currentLevelXP = getCurrentLevelXP(totalXP);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-900/95 to-slate-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2">
          {/* Level & XP - Left */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <button
              onClick={() => navigate("/")}
              className="relative cursor-pointer transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 flex items-center justify-center shadow-lg border-2 border-cyan-300/50">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800 flex items-center justify-center">
                  <span className="text-lg sm:text-xl font-bold text-cyan-300">
                    {level}
                  </span>
                </div>
              </div>
              {/* XP Ring Progress */}
              <svg className="absolute top-0 left-0 w-12 h-12 sm:w-14 sm:h-14 -rotate-90">
                {/* Background track - very subtle */}
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  className="sm:hidden"
                  fill="none"
                  stroke="rgba(34, 211, 238, 0.15)"
                  strokeWidth="2"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  className="hidden sm:block"
                  fill="none"
                  stroke="rgba(34, 211, 238, 0.15)"
                  strokeWidth="2"
                />
                {/* Progress ring - only shows completed portion */}
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  className="sm:hidden"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2.5"
                  strokeDasharray={`${2 * Math.PI * 22}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 22 * (1 - levelProgress / 100)
                  }`}
                  strokeLinecap="round"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  className="hidden sm:block transition-all duration-500 drop-shadow-[0_0_4px_rgba(34,211,238,0.8)]"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2.5"
                  strokeDasharray={`${2 * Math.PI * 26}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 26 * (1 - levelProgress / 100)
                  }`}
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className="min-w-0 flex-1">
              <div className="text-base sm:text-xl font-bold text-white truncate">{username}</div>
              {activeTitle && (
                <div className="mt-0.5 mb-1 hidden sm:block">
                  <TitleBadge 
                    achievement={activeTitle} 
                    size="sm" 
                    onClick={() => navigate('/achievements')}
                  />
                </div>
              )}
              {/* XP Progress Text */}
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-gray-400">
                  {currentLevelXP.toLocaleString()} / 10,000
                </div>
              </div>
            </div>
          </div>

          {/* Currency Display - Right */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Glory */}
            <button
              onClick={() => navigate("/shop")}
              className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-yellow-900/40 to-yellow-800/40 border border-yellow-600/50 rounded-full px-2 sm:px-4 py-2 min-h-[44px] shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <IconTrophy size={20} className="sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" stroke={2} />
              <span className="font-bold text-yellow-300 text-sm sm:text-lg whitespace-nowrap">
                {totalGlory.toLocaleString()}
              </span>
            </button>

            {/* Items/Gems */}
            <button
              onClick={() => navigate("/vault")}
              className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-green-900/40 to-green-800/40 border border-green-600/50 rounded-full px-2 sm:px-4 py-2 min-h-[44px] shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <IconBox size={20} className="sm:w-6 sm:h-6 text-green-400 flex-shrink-0" stroke={2} />
              {isLoadingItems ? (
                <span className="font-bold text-green-300 text-sm sm:text-lg">
                  <LoadingIcon size="small" />
                </span>
              ) : (
                <span className="font-bold text-green-300 text-sm sm:text-lg whitespace-nowrap">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Settings */}
            <button className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-800/80 border border-white/20 flex items-center justify-center hover:bg-slate-700/80 active:bg-slate-600/80 transition-colors shadow-lg min-h-[44px]">
              <IconSettings size={20} className="sm:w-6 sm:h-6 text-gray-300" stroke={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
