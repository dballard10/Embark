import { useState } from "react";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import CardSkeleton from "../components/common/CardSkeleton";
import ItemDetailsModal from "../components/common/ItemDetailsModal";
import LoadingIcon from "../components/common/LoadingIcon";
import {
  getTierStars,
  getTierGradientColor,
  getTierColor,
} from "../utils/tierUtils";
import { useUser } from "../contexts/UserContext";
import { useItems } from "../contexts/ItemsContext";
import { getItemImage } from "../utils/itemImageUtils";
import ItemIcon from "../components/common/ItemIcon";
import { IconBox } from "@tabler/icons-react";

function VaultPage() {
  const { selectedUser, isLoading: userLoading } = useUser();
  const { items: userItems, itemCount, loading } = useItems();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tierFilter, setTierFilter] = useState<number | "all">("all");

  // Filter and sort items by tier (descending - T6 first)
  const filteredItems = userItems
    .filter((userItem) => {
      if (!userItem.item) return false;
      return tierFilter === "all" || userItem.item.rarity_tier === tierFilter;
    })
    .sort((a, b) => {
      if (!a.item || !b.item) return 0;
      return b.item.rarity_tier - a.item.rarity_tier;
    });

  if (userLoading || !selectedUser) {
    return (
      <div className="game-container flex items-center justify-center min-h-screen">
        <LoadingIcon size="large" />
      </div>
    );
  }

  return (
    <div className="game-container">
      {/* Top Stats Bar */}
      <TopBar
        username={selectedUser.username}
        totalXP={selectedUser.total_xp}
        totalGlory={selectedUser.total_glory}
        totalItems={itemCount}
        isLoadingItems={loading}
      />

      {/* Vault Header */}
      <div className="bg-gradient-to-r from-green-900/90 via-emerald-900/90 to-green-900/90 border-b-2 border-green-600 fixed top-[64px] sm:top-[72px] md:top-[80px] left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Top Row: Title and Total Items */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-lg flex-shrink-0">
                  <IconBox size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" stroke={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-100 truncate">
                    Item Vault
                  </h1>
                  <p className="text-xs sm:text-sm text-green-300/80">
                    {filteredItems.length} / {userItems.length} items
                    {tierFilter !== "all" && ` (Tier ${tierFilter})`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-br from-green-600/30 to-emerald-600/30 border-2 border-green-500/40 flex-shrink-0">
                <IconBox size={20} className="sm:w-7 sm:h-7 text-green-400" stroke={2} />
                <div>
                  <div className="text-xs text-green-300/80 font-semibold">
                    Total Items
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-green-200">
                    {loading ? <LoadingIcon size="small" /> : itemCount}
                  </div>
                </div>
              </div>
            </div>

            {/* Tier Filter - Full width on mobile */}
            {userItems.length > 0 && (
              <div className="flex justify-center sm:justify-start">
                <div className="flex flex-wrap gap-1 items-center bg-green-950/50 backdrop-blur-sm rounded-lg p-1 border border-green-700/30 w-full sm:w-auto">
                  <button
                    onClick={() => setTierFilter("all")}
                    className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded font-medium text-xs sm:text-sm transition-all active:scale-95 ${
                      tierFilter === "all"
                        ? "bg-green-600 text-white shadow-md"
                        : "text-green-300 hover:text-green-100 hover:bg-green-800/30 active:bg-green-800/50"
                    }`}
                  >
                    All
                  </button>
                  {[1, 2, 3, 4, 5, 6].map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setTierFilter(tier)}
                      className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded font-medium text-xs sm:text-sm transition-all active:scale-95 ${
                        tierFilter === tier
                          ? "bg-green-600 text-white shadow-md"
                          : "text-green-300 hover:text-green-100 hover:bg-green-800/30 active:bg-green-800/50"
                      }`}
                    >
                      T{tier}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 pt-[140px] sm:pt-[150px] md:pt-[132px]">
        {/* Item Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, index) => (
              <CardSkeleton key={`skeleton-${index}`} variant="item" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/30 border border-slate-700/50 rounded-xl">
            <p className="text-gray-400">
              No items found for Tier {tierFilter}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((userItem) => {
              const item = userItem.item;
              if (!item) return null;

              const itemImage = getItemImage(item.name, item.image_url);

              return (
                <div
                  key={userItem.id}
                  onClick={() => {
                    setSelectedItemId(userItem.id);
                    setIsModalOpen(true);
                  }}
                  className={`relative flex flex-col bg-gradient-to-br ${getTierGradientColor(
                    item.rarity_tier
                  )} border-2 rounded-xl overflow-hidden shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer`}
                >
                  {/* Rarity Stars Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <div
                      className={`flex items-center gap-0.5 px-2 py-1 rounded-lg bg-gradient-to-r ${getTierColor(
                        item.rarity_tier
                      )} border border-white/30 text-xs font-bold text-white shadow-lg`}
                    >
                      {getTierStars(item.rarity_tier)}
                    </div>
                  </div>

                  {/* Item Icon Area */}
                  <div className="h-32 bg-gradient-to-br from-slate-700/30 to-slate-800/30 flex items-center justify-center relative overflow-hidden">
                    {itemImage ? (
                      <img
                        src={itemImage}
                        alt={item.name}
                        className="h-full w-full object-contain p-4"
                      />
                    ) : (
                      <ItemIcon size={64} className="text-white/20" />
                    )}
                  </div>

                  {/* Item Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-white line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-300 line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="vault" />

      {/* Item Details Modal */}
      {selectedItemId && (
        <ItemDetailsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItemId(null);
          }}
          userItemId={selectedItemId}
        />
      )}
    </div>
  );
}

export default VaultPage;
