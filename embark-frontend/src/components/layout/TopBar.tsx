import {
  calculateLevel,
  getLevelProgress,
  getCurrentLevelXP,
} from "../../utils/levelCalculator";
import { IconTrophy, IconSettings, IconBox } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../common/LoadingIcon";

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
  const level = calculateLevel(totalXP);
  const levelProgress = getLevelProgress(totalXP);
  const currentLevelXP = getCurrentLevelXP(totalXP);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-900/95 to-slate-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Level & XP - Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="relative cursor-pointer transition-transform hover:scale-105"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 flex items-center justify-center shadow-lg border-2 border-cyan-300/50">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                  <span className="text-xl font-bold text-cyan-300">
                    {level}
                  </span>
                </div>
              </div>
              {/* XP Ring Progress */}
              <svg className="absolute top-0 left-0 w-14 h-14 -rotate-90">
                {/* Background track - very subtle */}
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  fill="none"
                  stroke="rgba(34, 211, 238, 0.15)"
                  strokeWidth="2"
                />
                {/* Progress ring - only shows completed portion */}
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2.5"
                  strokeDasharray={`${2 * Math.PI * 26}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 26 * (1 - levelProgress / 100)
                  }`}
                  strokeLinecap="round"
                  className="transition-all duration-500 drop-shadow-[0_0_4px_rgba(34,211,238,0.8)]"
                />
              </svg>
            </button>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-white mb-1">
                {username}
              </div>
              {/* XP Progress Text */}
              <div>
                <div className="text-sm font-semibold text-gray-400">
                  {currentLevelXP.toLocaleString()} / 10,000
                </div>
              </div>
            </div>
          </div>

          {/* Currency Display - Right */}
          <div className="flex items-center gap-3">
            {/* Glory */}
            <button
              onClick={() => navigate("/shop")}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-900/40 to-yellow-800/40 border border-yellow-600/50 rounded-full px-4 py-2 shadow-lg cursor-pointer transition-transform hover:scale-105"
            >
              <IconTrophy size={24} className="text-yellow-400" stroke={2} />
              <span className="font-bold text-yellow-300 text-lg">
                {totalGlory.toLocaleString()}
              </span>
            </button>

            {/* Items/Gems */}
            <button
              onClick={() => navigate("/vault")}
              className="flex items-center gap-2 bg-gradient-to-r from-green-900/40 to-green-800/40 border border-green-600/50 rounded-full px-4 py-2 shadow-lg cursor-pointer transition-transform hover:scale-105"
            >
              <IconBox size={24} className="text-green-400" stroke={2} />
              {isLoadingItems ? (
                <span className="font-bold text-green-300 text-lg">
                  <LoadingIcon size="small" />
                </span>
              ) : (
                <span className="font-bold text-green-300 text-lg">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Settings */}
            <button className="w-12 h-12 rounded-full bg-slate-800/80 border border-white/20 flex items-center justify-center hover:bg-slate-700/80 transition-colors shadow-lg">
              <IconSettings size={24} className="text-gray-300" stroke={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
