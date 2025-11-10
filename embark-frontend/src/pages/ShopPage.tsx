import { useState, useEffect, useMemo, useCallback, memo } from "react";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import LoadingIcon from "../components/common/LoadingIcon";
import {
  getTierStars,
  getTierGradientColor,
  getTierColor,
} from "../utils/tierUtils";
import { useUser } from "../contexts/UserContext";
import { useItems } from "../contexts/ItemsContext";
import { useCelebrationOverlay } from "../contexts/CelebrationOverlayContext";
import { useAchievements } from "../contexts/AchievementsContext";
import type { Item } from "../types/item.types";
import { fetchAllItems, purchaseItem } from "../services/api";
import { IconTrophy, IconX, IconCheck } from "@tabler/icons-react";
import { IoStorefrontOutline } from "react-icons/io5";
import { getItemImage } from "../utils/itemImageUtils";
import ItemIcon from "../components/common/ItemIcon";
import CardSkeleton from "../components/common/CardSkeleton";
import ShopItemDetailsModal from "../components/common/ShopItemDetailsModal";

// Memoized item card component to prevent unnecessary re-renders
interface ShopItemCardProps {
  item: Item;
  isOwned: boolean;
  canAfford: boolean;
  isPurchasing: boolean;
  onPurchase: (item: Item) => void;
  onCardClick: (item: Item) => void;
  totalGlory: number;
}

const ShopItemCard = memo(function ShopItemCard({
  item,
  isOwned,
  canAfford,
  isPurchasing,
  onPurchase,
  onCardClick,
}: ShopItemCardProps) {
  const itemImage = getItemImage(item.name, item.image_url);
  const tierGradient = getTierGradientColor(item.rarity_tier);
  const tierColor = getTierColor(item.rarity_tier);
  const tierStars = getTierStars(item.rarity_tier);

  return (
    <div
      onClick={() => {
        // Only open modal if clicking card (not button)
        if (!isOwned && canAfford) {
          onCardClick(item);
        }
      }}
      className={`relative flex flex-col bg-gradient-to-br ${tierGradient} border-2 rounded-xl overflow-hidden shadow-lg transition-all duration-200 will-change-transform ${
        !isOwned && canAfford
          ? "hover:scale-105 active:scale-95 hover:shadow-2xl cursor-pointer"
          : ""
      }`}
      style={{ contain: "layout style paint" }}
    >
      {/* Rarity Stars Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div
          className={`flex items-center gap-0.5 px-2 py-1 rounded-lg bg-gradient-to-r ${tierColor} border border-white/30 text-xs font-bold text-white shadow-lg`}
        >
          {tierStars}
        </div>
      </div>

      {/* Owned Badge */}
      {isOwned && (
        <div className="absolute top-3 left-3 z-10">
          <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-green-600/90 border border-green-400/50 text-xs font-bold text-white shadow-lg">
            <IconCheck size={16} stroke={2.5} />
            Owned
          </div>
        </div>
      )}

      {/* Item Icon Area */}
      <div className="h-32 bg-gradient-to-br from-slate-700/30 to-slate-800/30 flex items-center justify-center relative overflow-hidden">
        {itemImage ? (
          <img
            src={itemImage}
            alt={item.name}
            className="h-full w-full object-contain p-4"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
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

        <div className="gap-2 flex flex-col mt-3">
          {/* Price */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-900/70 border border-yellow-600/90">
            <IconTrophy size={20} className="text-yellow-400" stroke={2} />
            <div className="flex-1">
              <div className="text-xs text-yellow-300/80 font-semibold">
                Price
              </div>
              <div className="text-lg font-bold text-yellow-200">
                {item.price.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Action Button */}
          {isOwned ? (
            <button
              disabled
              className="w-full min-h-[44px] py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 font-bold rounded-lg cursor-not-allowed opacity-60"
            >
              Already Owned
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                onPurchase(item);
              }}
              disabled={!canAfford || isPurchasing}
              className={`w-full min-h-[44px] py-3 font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 will-change-transform ${
                canAfford && !isPurchasing
                  ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 active:scale-95 text-white shadow-lg hover:shadow-xl"
                  : "bg-gradient-to-r from-gray-600 to-gray-700 text-gray-400 cursor-not-allowed opacity-60"
              }`}
            >
              {isPurchasing ? (
                <>
                  <LoadingIcon size="small" />
                  <span>Purchasing...</span>
                </>
              ) : canAfford ? (
                "Purchase"
              ) : (
                "Cannot Afford"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

function ShopPage() {
  const { selectedUser, isLoading: userLoading, refreshUser } = useUser();
  const {
    itemCount: userItemCount,
    isOwnedItem,
    refreshItems,
    loading: itemsLoading,
  } = useItems();
  const { showItemThenMaybeSpecial } = useCelebrationOverlay();
  const { refetchUserAchievements } = useAchievements();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [purchasingItemId, setPurchasingItemId] = useState<string | null>(null);
  const [tierFilter, setTierFilter] = useState<number | "all">("all");
  const [selectedItemForModal, setSelectedItemForModal] = useState<Item | null>(
    null
  );
  const [isShopItemModalOpen, setIsShopItemModalOpen] = useState(false);

  // Memoized notification handler to prevent unnecessary re-renders
  const showNotification = useCallback(
    (message: string, type: "success" | "error") => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 4000);
    },
    []
  );

  // Memoized data loader to prevent unnecessary re-renders
  const loadShopData = useCallback(async () => {
    if (!selectedUser?.id) return;

    try {
      setLoading(true);

      // Fetch all items
      const allItems = await fetchAllItems();
      setItems(allItems);
    } catch (error) {
      console.error("Error loading shop data:", error);
      showNotification("Failed to load shop", "error");
    } finally {
      setLoading(false);
    }
  }, [selectedUser?.id, showNotification]);

  useEffect(() => {
    if (selectedUser?.id) {
      loadShopData();
    }
  }, [selectedUser?.id, loadShopData]);

  // Memoized purchase handler to prevent unnecessary re-renders
  const handlePurchase = useCallback(
    async (item: Item) => {
      if (!selectedUser || purchasingItemId) return;

      // Check if user has enough glory
      if (selectedUser.total_glory < item.price) {
        showNotification(
          `Not enough glory! You need ${item.price.toLocaleString()} but only have ${selectedUser.total_glory.toLocaleString()}`,
          "error"
        );
        return;
      }

      try {
        setPurchasingItemId(item.id);

        // Purchase the item
        const purchaseResult = await purchaseItem(selectedUser.id, item.id);

        // Refresh user data to update glory
        await refreshUser();

        // Refresh items to update owned items
        await refreshItems();

        // Refresh achievements
        await refetchUserAchievements();

        // Handle celebration overlay
        const achievements = purchaseResult.awarded_achievements || [];
        const purchasedItem = purchaseResult.user_item;

        // Check if any achievement is special (tier 6, questline, or tier)
        const hasSpecialAchievement = achievements.some(
          (ach) =>
            ach.tier === 6 ||
            ach.achievement_type === "questline" ||
            ach.achievement_type === "tier"
        );

        // Always show item viewer modal for purchased items, with special overlay if applicable
        showItemThenMaybeSpecial(
          achievements,
          purchasedItem,
          hasSpecialAchievement
        );
      } catch (error: any) {
        console.error("Error purchasing item:", error);
        showNotification(error.message || "Failed to purchase item", "error");
      } finally {
        setPurchasingItemId(null);
      }
    },
    [
      selectedUser,
      purchasingItemId,
      showNotification,
      refreshUser,
      refreshItems,
      refetchUserAchievements,
      showItemThenMaybeSpecial,
    ]
  );

  // Memoized filtered items to prevent recalculation on every render
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => tierFilter === "all" || item.rarity_tier === tierFilter)
      .sort((a, b) => b.rarity_tier - a.rarity_tier);
  }, [items, tierFilter]);

  // Memoized modal close handler
  const handleModalClose = useCallback(() => {
    setIsShopItemModalOpen(false);
    setSelectedItemForModal(null);
  }, []);

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
        totalItems={userItemCount}
        isLoadingItems={itemsLoading}
      />

      {/* Notification Banner - Error only */}
      {notification && notification.type === "error" && (
        <div className="fixed top-[64px] sm:top-[72px] left-0 right-0 z-40 mx-2 sm:mx-4 mt-2 sm:mt-4 p-3 sm:p-4 rounded-lg border-2 backdrop-blur-sm shadow-lg animate-slide-down bg-red-900/90 border-red-500/50 text-red-100">
          <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3">
            <IconX size={20} className="sm:w-6 sm:h-6" stroke={2.5} />
            <span className="font-semibold text-sm sm:text-base">
              {notification.message}
            </span>
          </div>
        </div>
      )}

      {/* Shop Header */}
      <div className="bg-gradient-to-r from-amber-900/90 via-orange-900/90 to-amber-900/90 border-b-2 border-amber-600 fixed top-[64px] sm:top-[72px] md:top-[80px] left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-row items-center gap-3 sm:gap-4 py-2">
            {/* Title Section - Left Aligned */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <IoStorefrontOutline
                  size={24}
                  className="sm:w-7 sm:h-7 md:w-8 md:h-8 text-white"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-100 truncate">
                  Glory Shop
                </h1>
                <p className="text-xs sm:text-sm text-amber-300/80">
                  {filteredItems.length} / {items.length} items
                  {tierFilter !== "all" && ` (Tier ${tierFilter})`}
                </p>
              </div>
            </div>

            {/* Tier Filter - Centered */}
            <div className="flex items-center justify-center flex-1">
              {items.length > 0 && (
                <div className="flex items-center justify-center">
                  <div className="flex flex-wrap gap-1 items-center bg-amber-950/50 backdrop-blur-sm rounded-lg p-1 border border-amber-700/30">
                    <button
                      onClick={() => setTierFilter("all")}
                      className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded font-medium text-xs sm:text-sm transition-all active:scale-95 ${
                        tierFilter === "all"
                          ? "bg-amber-600 text-white shadow-md"
                          : "text-amber-300 hover:text-amber-100 hover:bg-amber-800/30 active:bg-amber-800/50"
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
                            ? "bg-amber-600 text-white shadow-md"
                            : "text-amber-300 hover:text-amber-100 hover:bg-amber-800/30 active:bg-amber-800/50"
                        }`}
                      >
                        T{tier}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Your Glory - Right Aligned */}
            <div className="flex items-center justify-end flex-1">
              <div className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-br from-yellow-600/30 to-amber-600/30 border-2 border-yellow-500/40 flex-shrink-0">
                <IconTrophy
                  size={20}
                  className="sm:w-7 sm:h-7 text-yellow-400"
                  stroke={2}
                />
                <div>
                  <div className="text-xs text-yellow-300/80 font-semibold">
                    Your Glory
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-yellow-200">
                    {selectedUser.total_glory.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Responsive padding and spacing */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-4 pt-[150px] sm:pt-[140px] md:pt-[132px]">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <CardSkeleton key={index} variant="item" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-slate-800/30 border border-slate-700/50 rounded-xl">
            <p className="text-gray-400 text-sm sm:text-base">
              No items available in the shop yet!
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-slate-800/30 border border-slate-700/50 rounded-xl">
            <p className="text-gray-400 text-sm sm:text-base">
              No items found for Tier {tierFilter}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {filteredItems.map((item) => {
              const isOwned = isOwnedItem(item.id);
              const canAfford = selectedUser.total_glory >= item.price;
              const isPurchasing = purchasingItemId === item.id;

              return (
                <ShopItemCard
                  key={item.id}
                  item={item}
                  isOwned={isOwned}
                  canAfford={canAfford}
                  isPurchasing={isPurchasing}
                  onPurchase={handlePurchase}
                  onCardClick={(item) => {
                    setSelectedItemForModal(item);
                    setIsShopItemModalOpen(true);
                  }}
                  totalGlory={selectedUser.total_glory}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="shop" />

      {/* Shop Item Details Modal */}
      <ShopItemDetailsModal
        isOpen={isShopItemModalOpen}
        onClose={handleModalClose}
        item={selectedItemForModal}
        onPurchase={handlePurchase}
      />
    </div>
  );
}

export default ShopPage;
