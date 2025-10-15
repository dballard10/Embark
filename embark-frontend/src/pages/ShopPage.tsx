import { useState, useEffect } from "react";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import {
  getTierStars,
  getTierGradientColor,
  getTierColor,
} from "../utils/tierUtils";
import { useUser } from "../contexts/UserContext";
import type { Item } from "../types/item.types";
import { fetchAllItems, fetchUserItems, purchaseItem } from "../services/api";
import { IconTrophy, IconCheck, IconX } from "@tabler/icons-react";
import { IoStorefrontOutline } from "react-icons/io5";
import { getItemImage } from "../utils/itemImageUtils";
import ItemIcon from "../components/common/ItemIcon";
import CardSkeleton from "../components/common/CardSkeleton";

function ShopPage() {
  const { selectedUser, isLoading: userLoading, refreshUser } = useUser();
  const [items, setItems] = useState<Item[]>([]);
  const [ownedItemIds, setOwnedItemIds] = useState<Set<string>>(new Set());
  const [userItemCount, setUserItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [purchasingItemId, setPurchasingItemId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedUser?.id) {
      loadShopData();
    }
  }, [selectedUser?.id]);

  const loadShopData = async () => {
    if (!selectedUser?.id) return;

    try {
      setLoading(true);

      // Fetch all items
      const allItems = await fetchAllItems();
      setItems(allItems);

      // Fetch user's owned items
      const userItems = await fetchUserItems(selectedUser.id);
      setUserItemCount(userItems.length);

      // Create set of owned item IDs for quick lookup
      const ownedIds = new Set(userItems.map((ui) => ui.item_id));
      setOwnedItemIds(ownedIds);
    } catch (error) {
      console.error("Error loading shop data:", error);
      showNotification("Failed to load shop", "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handlePurchase = async (item: Item) => {
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
      await purchaseItem(selectedUser.id, item.id);

      // Refresh user data to update glory
      await refreshUser();

      // Reload shop data to update owned items
      await loadShopData();

      showNotification(`Successfully purchased ${item.name}!`, "success");
    } catch (error: any) {
      console.error("Error purchasing item:", error);
      showNotification(error.message || "Failed to purchase item", "error");
    } finally {
      setPurchasingItemId(null);
    }
  };

  if (userLoading || !selectedUser) {
    return (
      <div className="game-container flex items-center justify-center min-h-screen">
        <div className="text-gray-400 text-lg">Loading...</div>
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
      />

      {/* Notification Banner */}
      {notification && (
        <div
          className={`fixed top-[72px] left-0 right-0 z-40 mx-4 mt-4 p-4 rounded-lg border-2 backdrop-blur-sm shadow-lg animate-slide-down ${
            notification.type === "success"
              ? "bg-green-900/90 border-green-500/50 text-green-100"
              : "bg-red-900/90 border-red-500/50 text-red-100"
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            {notification.type === "success" ? (
              <IconCheck size={24} stroke={2.5} />
            ) : (
              <IconX size={24} stroke={2.5} />
            )}
            <span className="font-semibold">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Shop Header */}
      <div className="bg-gradient-to-r from-amber-900/90 via-orange-900/90 to-amber-900/90 border-b-2 border-amber-600 sticky top-[72px] z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center shadow-lg">
                <IoStorefrontOutline size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-amber-100">
                  Glory Shop
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-yellow-600/30 to-amber-600/30 border-2 border-yellow-500/40">
              <IconTrophy size={28} className="text-yellow-400" stroke={2} />
              <div>
                <div className="text-xs text-yellow-300/80 font-semibold">
                  Your Glory
                </div>
                <div className="text-2xl font-bold text-yellow-200">
                  {selectedUser.total_glory.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <CardSkeleton key={index} variant="item" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/30 border border-slate-700/50 rounded-xl">
            <p className="text-gray-400">No items available in the shop yet!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => {
              const isOwned = ownedItemIds.has(item.id);
              const canAfford = selectedUser.total_glory >= item.price;
              const isPurchasing = purchasingItemId === item.id;

              const itemImage = getItemImage(item.name, item.image_url);

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col bg-gradient-to-br ${getTierGradientColor(
                    item.rarity_tier
                  )} border-2 rounded-xl overflow-hidden shadow-lg transition-all duration-200 ${
                    !isOwned && canAfford
                      ? "hover:scale-105 hover:shadow-2xl cursor-pointer"
                      : ""
                  }`}
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
                        <IconTrophy
                          size={20}
                          className="text-yellow-400"
                          stroke={2}
                        />
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
                          className="w-full py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 font-bold rounded-lg cursor-not-allowed opacity-60"
                        >
                          Already Owned
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePurchase(item)}
                          disabled={!canAfford || isPurchasing}
                          className={`w-full py-3 font-bold rounded-lg transition-all duration-200 ${
                            canAfford && !isPurchasing
                              ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg hover:shadow-xl"
                              : "bg-gradient-to-r from-gray-600 to-gray-700 text-gray-400 cursor-not-allowed opacity-60"
                          }`}
                        >
                          {isPurchasing
                            ? "Purchasing..."
                            : canAfford
                            ? "Purchase"
                            : "Cannot Afford"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="shop" />
    </div>
  );
}

export default ShopPage;
