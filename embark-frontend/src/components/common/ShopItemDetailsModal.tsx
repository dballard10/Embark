import { useState, useEffect } from "react";
import { IconX, IconTrophy, IconCheck } from "@tabler/icons-react";
import { getTierColor, getTierName, getTierStars } from "../../utils/tierUtils";
import type { Item } from "../../types/item.types";
import { getItemImage } from "../../utils/itemImageUtils";
import ItemIcon from "./ItemIcon";
import { formatDateFriendly } from "../../utils/dateUtils";
import { useUser } from "../../contexts/UserContext";
import { useItems } from "../../contexts/ItemsContext";
import LoadingIcon from "./LoadingIcon";

interface ShopItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item | null;
  onPurchase: (item: Item) => Promise<void>;
}

function ShopItemDetailsModal({
  isOpen,
  onClose,
  item,
  onPurchase,
}: ShopItemDetailsModalProps) {
  const { selectedUser } = useUser();
  const { isOwnedItem } = useItems();
  const [imageLoading, setImageLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    if (isOpen && item) {
      setImageLoading(true);
    }
  }, [isOpen, item]);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isPurchasing) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, isPurchasing]);

  const handlePurchaseClick = async () => {
    if (!item || isPurchasing) return;

    try {
      setIsPurchasing(true);
      await onPurchase(item);
      // Close modal on success (parent will show notification)
      onClose();
    } catch (error) {
      // Error handling is done in parent
      console.error("Purchase error in modal:", error);
    } finally {
      setIsPurchasing(false);
    }
  };

  if (!isOpen || !item) return null;

  const baseColor = "#0a2847";
  const tier = item.rarity_tier;
  const tierName = getTierName(tier);
  const tierColor = getTierColor(tier);
  const tierBorderColor = "border-blue-500/50";
  const itemImage = getItemImage(item.name, item.image_url);
  const isOwned = isOwnedItem(item.id);
  const canAfford = selectedUser
    ? selectedUser.total_glory >= item.price
    : false;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (!isPurchasing) {
          onClose();
        }
      }}
    >
      <div
        className={`rounded-2xl border-2 ${tierBorderColor} shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col relative animate-modal-scale`}
        style={{
          backgroundColor: baseColor,
          backgroundImage: `radial-gradient(ellipse at center, #0a2847 0%, #003d5c 100%)`,
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shop-item-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Item Details</h2>
            <p className="text-sm text-gray-400 mt-1">
              {isOwned
                ? "You already own this item"
                : "Review before purchasing"}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isPurchasing}
            className="text-slate-400 hover:text-white transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <IconX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="space-y-6">
            {/* Item Image and Title Section */}
            <div
              className={`bg-black/10 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl overflow-hidden shadow-2xl`}
            >
              {/* Item Image - Transparent Gallery View */}
              <div className="h-96 relative bg-transparent">
                {itemImage ? (
                  <div className="w-full h-full flex items-center justify-center p-8 backdrop-blur-md relative">
                    {imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <LoadingIcon size="large" />
                      </div>
                    )}
                    <img
                      src={itemImage}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                      onLoad={() => setImageLoading(false)}
                      style={{ opacity: imageLoading ? 0 : 1 }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black/10 backdrop-blur-md">
                    <ItemIcon size={120} className="text-purple-400" />
                  </div>
                )}

                {/* Tier Badge */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r ${tierColor} border border-white/30 text-sm font-bold text-white shadow-lg`}
                  >
                    {getTierStars(tier)}
                    <span className="ml-1">{tierName}</span>
                  </div>
                </div>

                {/* Owned Badge */}
                {isOwned && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-green-600/90 border border-green-400/50 text-sm font-bold text-white shadow-lg">
                      <IconCheck size={18} stroke={2.5} />
                      Already Owned
                    </div>
                  </div>
                )}
              </div>

              {/* Title and Description */}
              <div className="p-6 space-y-4 bg-black/20">
                <h1
                  id="shop-item-modal-title"
                  className="text-3xl font-bold text-white"
                >
                  {item.name}
                </h1>
                <p className="text-gray-100 text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Price Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Glory Price */}
              <div
                className={`bg-black/20 backdrop-blur-sm border-2 ${
                  canAfford ? "border-yellow-500/50" : "border-red-500/50"
                } rounded-xl p-5`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 bg-gradient-to-br ${
                      canAfford
                        ? "from-yellow-900/50 to-yellow-800/50"
                        : "from-red-900/50 to-red-800/50"
                    } rounded-xl shadow-inner`}
                  >
                    <IconTrophy
                      size={28}
                      className={canAfford ? "text-yellow-400" : "text-red-400"}
                      stroke={2}
                    />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-semibold">
                      Glory Price
                    </div>
                    <div
                      className={`text-xl font-bold ${
                        canAfford ? "text-yellow-300" : "text-red-300"
                      }`}
                    >
                      {item.price.toLocaleString()}
                    </div>
                    {!canAfford && selectedUser && (
                      <div className="text-xs text-red-400 mt-1">
                        Need{" "}
                        {(
                          item.price - selectedUser.total_glory
                        ).toLocaleString()}{" "}
                        more
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Your Glory */}
              {selectedUser && (
                <div
                  className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-5`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-cyan-900/50 to-cyan-800/50 rounded-xl shadow-inner">
                      <IconTrophy
                        size={28}
                        className="text-cyan-400"
                        stroke={2}
                      />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 font-semibold">
                        Your Glory
                      </div>
                      <div className="text-xl font-bold text-cyan-300">
                        {selectedUser.total_glory.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info Section */}
            <div
              className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-6`}
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Item Details
              </h2>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span className="text-gray-400">Item ID</span>
                  <span className="font-mono text-sm">{item.id}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span className="text-gray-400">Rarity Tier</span>
                  <span className="font-semibold">Tier {tier}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span className="text-gray-400">Created</span>
                  <span>{formatDateFriendly(item.created_at)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Status</span>
                  <span
                    className={`font-semibold ${
                      isOwned ? "text-green-400" : "text-blue-400"
                    }`}
                  >
                    {isOwned ? "Owned" : "Available for Purchase"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            disabled={isPurchasing}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Close
          </button>
          {!isOwned && (
            <button
              onClick={handlePurchaseClick}
              disabled={!canAfford || isPurchasing}
              className={`px-8 py-2 font-bold rounded-lg transition-all duration-200 flex items-center gap-2 ${
                canAfford && !isPurchasing
                  ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105"
                  : "bg-gradient-to-r from-gray-600 to-gray-700 text-gray-400 cursor-not-allowed opacity-60"
              }`}
            >
              {isPurchasing ? (
                <>
                  <LoadingIcon size="small" />
                  <span>Purchasing...</span>
                </>
              ) : canAfford ? (
                <>
                  <IconTrophy size={20} stroke={2} />
                  <span>Purchase</span>
                </>
              ) : (
                "Cannot Afford"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopItemDetailsModal;
