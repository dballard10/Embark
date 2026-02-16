import { BottomNav } from "../components/layout/BottomNav";
import { TopBar } from "../components/layout/TopBar";
import { useGacha } from "../contexts/GachaContext";
import {
  ITEM_CATALOG,
  BUY_PRICES,
  TIER_NAMES,
} from "../data/itemCatalog";
import type { RarityTier } from "../types/item.types";
import { useState } from "react";
import { IconTrophy } from "@tabler/icons-react";

const TIER_COLORS: Record<RarityTier, string> = {
  1: "border-gray-500/50",
  2: "border-green-500/50",
  3: "border-blue-500/50",
  4: "border-purple-500/50",
  5: "border-orange-500/50",
  6: "border-red-500/50",
};

const TIER_TEXT: Record<RarityTier, string> = {
  1: "text-gray-400",
  2: "text-green-400",
  3: "text-blue-400",
  4: "text-purple-400",
  5: "text-orange-400",
  6: "text-red-400",
};

export default function ShopPage() {
  const { glory, buyItem, getOwnedCount } = useGacha();
  const [filterTier, setFilterTier] = useState<RarityTier | null>(null);
  const [buyingId, setBuyingId] = useState<string | null>(null);

  const filteredItems = filterTier
    ? ITEM_CATALOG.filter((i) => i.tier === filterTier)
    : ITEM_CATALOG;

  const handleBuy = (itemId: string) => {
    if (buyingId) return;
    setBuyingId(itemId);
    buyItem(itemId);
    setTimeout(() => setBuyingId(null), 300);
  };

  return (
    <div className="game-container min-h-screen pb-20 pt-16">
      <TopBar />

      <div className="px-4 py-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-title font-bold text-white">
            Glory Shop
          </h1>
          <div className="flex items-center gap-1.5 bg-yellow-900/40 border border-yellow-600/50 rounded-full px-3 py-1.5">
            <IconTrophy size={16} className="text-yellow-400" stroke={2} />
            <span className="font-bold text-yellow-300 text-sm">
              {glory.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Tier Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setFilterTier(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filterTier === null
                ? "bg-white/20 text-white"
                : "bg-slate-800/60 text-gray-400 hover:text-white"
            }`}
          >
            All
          </button>
          {([1, 2, 3, 4, 5, 6] as RarityTier[]).map((tier) => (
            <button
              key={tier}
              onClick={() => setFilterTier(tier)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                filterTier === tier
                  ? "bg-white/20 text-white"
                  : "bg-slate-800/60 text-gray-400 hover:text-white"
              }`}
            >
              {TIER_NAMES[tier]}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filteredItems.map((item) => {
            const price = BUY_PRICES[item.tier];
            const canAfford = glory >= price;
            const ownedCount = getOwnedCount(item.id);

            return (
              <div
                key={item.id}
                className={`bg-slate-800/60 border ${TIER_COLORS[item.tier]} rounded-xl p-3 flex flex-col items-center gap-2 relative`}
              >
                {ownedCount > 0 && (
                  <div className="absolute top-2 left-2 bg-green-600/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    x{ownedCount}
                  </div>
                )}
                <img
                  src={`/items/${item.imageFilename}`}
                  alt={item.name}
                  className="w-16 h-16 object-contain"
                />
                <div className="text-center min-w-0 w-full">
                  <div className="text-xs font-bold text-white truncate">
                    {item.name}
                  </div>
                  <div
                    className={`text-[10px] font-semibold ${TIER_TEXT[item.tier]}`}
                  >
                    {TIER_NAMES[item.tier]}
                  </div>
                </div>
                <button
                  onClick={() => handleBuy(item.id)}
                  disabled={!canAfford || buyingId === item.id}
                  className={`w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95 ${
                    canAfford
                      ? "bg-yellow-600/80 text-white hover:bg-yellow-500/80"
                      : "bg-slate-700/50 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <IconTrophy size={14} stroke={2} />
                  {price.toLocaleString()}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
