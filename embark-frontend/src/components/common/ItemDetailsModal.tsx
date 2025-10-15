import { useState, useEffect } from "react";
import { IconX, IconCalendar, IconStarFilled } from "@tabler/icons-react";
import {
  getTierColor,
  getTierName,
  getTierStars,
  getTierBorderColor,
} from "../../utils/tierUtils";
import type { UserItem } from "../../types/item.types";
import type { QuestTier } from "../../types/quest.types";
import { getItemImage } from "../../utils/itemImageUtils";
import ItemIcon from "./ItemIcon";
import { formatDateFriendly } from "../../utils/dateUtils";
import { useUser } from "../../contexts/UserContext";
import { fetchUserItems } from "../../services/api";
import ItemDetailsModalSkeleton from "./ItemDetailsModalSkeleton";

// Helper function to get base color for tier diagonal pattern
function getTierBaseColor(tier: QuestTier): string {
  const colors: Record<QuestTier, string> = {
    1: "#6b7280", // gray-500
    2: "#22c55e", // green-500
    3: "#3b82f6", // blue-500
    4: "#a855f7", // purple-500
    5: "#f97316", // orange-500
    6: "#dc2626", // red-600
  };
  return colors[tier];
}

// Helper function to get darker shade for diagonal pattern
function getTierDarkerColor(tier: QuestTier): string {
  const colors: Record<QuestTier, string> = {
    1: "#4b5563", // gray-600
    2: "#16a34a", // green-600
    3: "#2563eb", // blue-600
    4: "#9333ea", // purple-600
    5: "#ea580c", // orange-600
    6: "#be123c", // red-700
  };
  return colors[tier];
}

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
  const [userItem, setUserItem] = useState<UserItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && selectedUser?.id && userItemId) {
      loadItemData();
    }
  }, [isOpen, userItemId, selectedUser?.id]);

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

      // Fetch all user items and find the specific one
      const userItems = await fetchUserItems(selectedUser.id);
      const foundItem = userItems.find((item) => item.id === userItemId);

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

  const item = userItem?.item;
  const tier = item?.rarity_tier;
  const tierName = tier ? getTierName(tier) : "";
  const tierColor = tier ? getTierColor(tier) : "";
  const tierBorderColor = tier
    ? getTierBorderColor(tier)
    : "border-purple-500/50";
  const itemImage = item ? getItemImage(item.name, item.image_url) : null;

  // Get tier-specific colors for diagonal pattern
  const baseColor = tier ? getTierBaseColor(tier) : "#3b82f6";
  const darkerColor = tier ? getTierDarkerColor(tier) : "#2563eb";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`rounded-2xl border-2 ${tierBorderColor} shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-modal-scale`}
        style={{
          backgroundColor: baseColor,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 69px,
            ${darkerColor}E6 69px,
            transparent 71px,
            transparent 141px
          ),
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 69px,
            ${darkerColor}E6 69px,
            transparent 71px,
            transparent 141px
          )`,
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="item-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-slate-700/80 hover:bg-slate-600/80 text-white transition-colors"
          aria-label="Close modal"
        >
          <IconX size={24} stroke={2} />
        </button>

        {/* Loading State */}
        {loading && (
          <ItemDetailsModalSkeleton tierBorderColor={tierBorderColor} />
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-8">
            <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-red-300 text-center">
              {error}
            </div>
          </div>
        )}

        {/* Item Details */}
        {!loading && !error && userItem && item && tier && (
          <div className="p-6 space-y-6">
            {/* Item Image and Title Section */}
            <div
              className={`bg-black/10 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl overflow-hidden shadow-2xl`}
            >
              {/* Item Image - Transparent Gallery View */}
              <div className="h-64 relative bg-transparent">
                {itemImage ? (
                  <div className="w-full h-full flex items-center justify-center p-8 backdrop-blur-md">
                    <img
                      src={itemImage}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
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
                  className="text-3xl font-bold text-white font-title"
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
              <h2 className="text-xl font-bold text-white font-title mb-4">
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
                  <span className="text-green-400 font-semibold">In Vault</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemDetailsModal;
