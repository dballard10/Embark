import { BottomNav } from "../components/layout/BottomNav";
import { TopBar } from "../components/layout/TopBar";
import { useGacha } from "../contexts/GachaContext";
import { useNavigate } from "react-router-dom";
import { TOTAL_ITEMS, ITEM_BY_ID, TIER_NAMES } from "../data/itemCatalog";
import { IconSparkles, IconTrophy, IconBox } from "@tabler/icons-react";

export default function HomePage() {
  const navigate = useNavigate();
  const { glory, uniqueItemCount, stats, pullHistory, inventory } = useGacha();

  // Get top 4 rarest owned items
  const topItems = [...new Set(inventory.map((o) => o.itemId))]
    .map((id) => ITEM_BY_ID[id])
    .filter(Boolean)
    .sort((a, b) => b.tier - a.tier)
    .slice(0, 4);

  const recentPulls = pullHistory.slice(0, 8);

  return (
    <div className="game-container min-h-screen pb-20 pt-16">
      <TopBar />

      <div className="px-4 py-6 space-y-6">
        {/* Hero */}
        <div className="text-center py-6">
          <h1 className="text-4xl sm:text-5xl font-title font-bold bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            EMBARK
          </h1>
          <p className="text-gray-400 text-sm">
            Collect legendary items from across the realms
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-800/60 border border-yellow-600/30 rounded-xl p-3 text-center">
            <IconTrophy
              size={24}
              className="text-yellow-400 mx-auto mb-1"
              stroke={2}
            />
            <div className="text-lg font-bold text-yellow-300">
              {glory.toLocaleString()}
            </div>
            <div className="text-[10px] text-gray-400">Glory</div>
          </div>
          <div className="bg-slate-800/60 border border-green-600/30 rounded-xl p-3 text-center">
            <IconBox
              size={24}
              className="text-green-400 mx-auto mb-1"
              stroke={2}
            />
            <div className="text-lg font-bold text-green-300">
              {uniqueItemCount}/{TOTAL_ITEMS}
            </div>
            <div className="text-[10px] text-gray-400">Collected</div>
          </div>
          <div className="bg-slate-800/60 border border-purple-600/30 rounded-xl p-3 text-center">
            <IconSparkles
              size={24}
              className="text-purple-400 mx-auto mb-1"
              stroke={2}
            />
            <div className="text-lg font-bold text-purple-300">
              {stats.totalPulls.toLocaleString()}
            </div>
            <div className="text-[10px] text-gray-400">Total Pulls</div>
          </div>
        </div>

        {/* Quick Summon Button */}
        <button
          onClick={() => navigate("/pull")}
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
        >
          <IconSparkles size={28} stroke={2} />
          <span>SUMMON</span>
        </button>

        {/* Recent Pulls */}
        {recentPulls.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-white mb-3">Recent Pulls</h2>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {recentPulls.map((pull) => {
                const item = ITEM_BY_ID[pull.itemId];
                if (!item) return null;
                return (
                  <div
                    key={pull.id}
                    className="flex-shrink-0 w-16 h-16 rounded-xl border-2 overflow-hidden bg-slate-800/60"
                    style={{
                      borderColor:
                        item.tier === 6
                          ? "#ef4444"
                          : item.tier === 5
                          ? "#f97316"
                          : item.tier === 4
                          ? "#a855f7"
                          : item.tier === 3
                          ? "#3b82f6"
                          : item.tier === 2
                          ? "#22c55e"
                          : "#6b7280",
                    }}
                  >
                    <img
                      src={`/items/${item.imageFilename}`}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Top Items */}
        {topItems.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-white mb-3">Rarest Items</h2>
            <div className="grid grid-cols-2 gap-3">
              {topItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800/60 border border-white/10 rounded-xl p-3 flex items-center gap-3"
                >
                  <img
                    src={`/items/${item.imageFilename}`}
                    alt={item.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white truncate">
                      {item.name}
                    </div>
                    <div
                      className="text-[10px] font-semibold"
                      style={{
                        color:
                          item.tier === 6
                            ? "#ef4444"
                            : item.tier === 5
                            ? "#f97316"
                            : item.tier === 4
                            ? "#a855f7"
                            : item.tier === 3
                            ? "#3b82f6"
                            : item.tier === 2
                            ? "#22c55e"
                            : "#9ca3af",
                      }}
                    >
                      {TIER_NAMES[item.tier]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {stats.totalPulls === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">
              No items yet. Hit the Summon button to start collecting!
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
