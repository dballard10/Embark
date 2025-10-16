import { IconTrophy, IconBox, IconSparkles } from "@tabler/icons-react";
import LoadingIcon from "../../common/LoadingIcon";

interface ProfileStatsProps {
  totalGlory: number;
  totalXP: number;
  itemCount: number;
  isLoadingItems: boolean;
  onNavigateToShop: () => void;
  onNavigateToVault: () => void;
}

export function ProfileStats({
  totalGlory,
  totalXP,
  itemCount,
  isLoadingItems,
  onNavigateToShop,
  onNavigateToVault,
}: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {/* Total Glory */}
      <div
        className="group bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur rounded-xl p-5 border border-yellow-500/30 hover:border-yellow-400/60 shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
        onClick={onNavigateToShop}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 rounded-xl shadow-inner group-hover:scale-110 transition-transform duration-300">
            <IconTrophy
              size={32}
              className="text-yellow-400 drop-shadow-glow"
              stroke={2.5}
            />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
              Total Glory
            </div>
            <div className="text-2xl font-black text-yellow-300 drop-shadow">
              {totalGlory.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Total Items */}
      <div
        className="group bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur rounded-xl p-5 border border-green-500/30 hover:border-green-400/60 shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
        onClick={onNavigateToVault}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-xl shadow-inner group-hover:scale-110 transition-transform duration-300">
            <IconBox
              size={32}
              className="text-green-400 drop-shadow-glow"
              stroke={2.5}
            />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
              Total Items
            </div>
            <div className="text-2xl font-black text-green-300 drop-shadow">
              {isLoadingItems ? <LoadingIcon size="small" /> : itemCount}
            </div>
          </div>
        </div>
      </div>

      {/* Total XP */}
      <div className="group bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur rounded-xl p-5 border border-cyan-500/30 hover:border-cyan-400/60 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02] sm:col-span-2 lg:col-span-1">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-cyan-900/50 to-cyan-800/50 rounded-xl shadow-inner group-hover:scale-110 transition-transform duration-300">
            <IconSparkles
              size={32}
              className="text-cyan-400 drop-shadow-glow"
              stroke={2.5}
            />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
              Total XP
            </div>
            <div className="text-2xl font-black text-cyan-300 drop-shadow">
              {totalXP.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
