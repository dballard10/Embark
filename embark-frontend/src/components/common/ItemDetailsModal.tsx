import { useState, useEffect } from "react";
import { IconX, IconCalendar, IconStarFilled } from "@tabler/icons-react";
import { getTierColor, getTierName, getTierStars } from "../../utils/tierUtils";
import type { UserItem } from "../../types/item.types";
import { getItemImage } from "../../utils/itemImageUtils";
import ItemIcon from "./ItemIcon";
import { formatDateFriendly } from "../../utils/dateUtils";
import { useUser } from "../../contexts/UserContext";
import { useItems } from "../../contexts/ItemsContext";
import ItemDetailsModalSkeleton from "./ItemDetailsModalSkeleton";
import LoadingIcon from "./LoadingIcon";

interface ItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userItemId: string;
}

function ItemDetailsModal({
  isOpen,
  onClose,
  userItemId,
}: ItemDetailsModalProps) {
  const { selectedUser } = useUser();
  const { items } = useItems();
  const [userItem, setUserItem] = useState<UserItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (isOpen && selectedUser?.id && userItemId) {
      loadItemData();
    }
  }, [isOpen, userItemId, selectedUser?.id, items]);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
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
  }, [isOpen, onClose]);

  const loadItemData = async () => {
    if (!selectedUser?.id) return;

    try {
      setLoading(true);
      setError(null);
      setImageLoading(true);

      // Find the item from context
      const foundItem = items.find((item) => item.id === userItemId);

      if (foundItem) {
        setUserItem(foundItem);
      } else {
        setError("Item not found");
      }
    } catch (error) {
      console.error("Error loading item:", error);
      setError("Failed to load item details");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const baseColor = "#0a2847";
  const item = userItem?.item;
  const tier = item?.rarity_tier;
  const tierName = tier ? getTierName(tier) : "";
  const tierColor = tier ? getTierColor(tier) : "";
  const tierBorderColor = "border-blue-500/50";
  const itemImage = item ? getItemImage(item.name, item.image_url) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
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
        aria-labelledby="item-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Item Details</h2>
            <p className="text-sm text-gray-400 mt-1">
              View your collected item information
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <IconX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Loading State */}
          {loading && (
            <ItemDetailsModalSkeleton tierBorderColor={tierBorderColor} />
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-red-300 text-center">
              {error}
            </div>
          )}

          {/* Item Details */}
          {!loading && !error && userItem && item && tier && (
            <div className="space-y-6">
              {/* Item Image and Title Section */}
              <div
                className={`bg-black/10 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl overflow-hidden shadow-2xl`}
              >
                {/* Item Image - Transparent Gallery View */}
                <div className="h-64 relative bg-transparent">
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

                  {/* Featured Badge */}
                  {userItem.is_featured && (
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 border border-yellow-400/50 text-sm font-bold text-white shadow-lg">
                        <IconStarFilled size={18} stroke={2} />
                        Featured
                      </div>
                    </div>
                  )}
                </div>

                {/* Title and Description */}
                <div className="p-6 space-y-4 bg-black/20">
                  <h1
                    id="item-modal-title"
                    className="text-3xl font-bold text-white"
                  >
                    {item.name}
                  </h1>
                  <p className="text-gray-100 text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Item Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date Obtained */}
                <div
                  className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-5 md:col-span-2`}
                >
                  <div className="flex items-center gap-3">
                    <IconCalendar
                      size={28}
                      className="text-purple-400"
                      stroke={2}
                    />
                    <div>
                      <div className="text-sm text-gray-400 font-semibold">
                        Date Obtained
                      </div>
                      <div className="text-xl font-bold text-white">
                        {new Date(userItem.acquired_at).toLocaleDateString(
                          "en-US"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
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
                    <span className="text-gray-400">Created</span>
                    <span>{formatDateFriendly(item.created_at)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Status</span>
                    <span className="text-green-400 font-semibold">
                      In Vault
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailsModal;
