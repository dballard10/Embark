import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTierColor, getTierName, getTierStars } from "../utils/tierUtils";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import type { UserItem } from "../types/item.types";
import {
  IconArrowLeft,
  IconBox,
  IconCalendar,
  IconStarFilled,
} from "@tabler/icons-react";
import { formatDateFriendly } from "../utils/dateUtils";
import { useUser } from "../contexts/UserContext";
import { fetchUserItems } from "../services/api";

function ItemDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedUser, isLoading: userLoading } = useUser();
  const [userItem, setUserItem] = useState<UserItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedUser?.id && id) {
      loadItem();
    }
  }, [id, selectedUser?.id]);

  const loadItem = async () => {
    if (!selectedUser?.id || !id) return;

    try {
      setLoading(true);

      // Fetch all user items and find the specific one
      const userItems = await fetchUserItems(selectedUser.id);
      const foundItem = userItems.find((item) => item.id === id);

      if (foundItem) {
        setUserItem(foundItem);
      } else {
        setUserItem(null);
      }
    } catch (error) {
      console.error("Error loading item:", error);
      setUserItem(null);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading || !selectedUser) {
    return (
      <div className="game-container flex items-center justify-center min-h-screen">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="game-container flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading item...</div>
      </div>
    );
  }

  if (!userItem?.item) {
    return (
      <div className="game-container flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Item not found</div>
          <button
            onClick={() => navigate("/vault")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Back to Vault
          </button>
        </div>
      </div>
    );
  }

  const item = userItem.item;
  const tier = item.rarity_tier;
  const tierName = getTierName(tier);
  const tierColor = getTierColor(tier);

  return (
    <div className="game-container">
      {/* Top Stats Bar */}
      <TopBar
        username={selectedUser.username}
        totalXP={selectedUser.total_xp}
        totalGlory={selectedUser.total_glory}
        totalItems={0}
      />

      {/* Back button header */}
      <div className="bg-gradient-to-r from-slate-800/95 to-slate-900/95 border-b-2 border-purple-500/30 sticky top-[72px] z-10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <button
            onClick={() => navigate("/vault")}
            className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors duration-200"
          >
            <IconArrowLeft size={24} stroke={2} />
            <span className="font-semibold">Back to Vault</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 pb-24 space-y-6">
        {/* Item Image and Title Section */}
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl overflow-hidden shadow-2xl">
          {/* Item Image */}
          <div className="flex items-center justify-center h-64 bg-gradient-to-br from-purple-600/20 to-blue-600/20 relative">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <IconBox size={120} className="text-purple-400" stroke={1.5} />
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
          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold text-white">{item.name}</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>

        {/* Item Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Rarity Tier */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-5">
            <div className="text-sm text-gray-400 font-semibold mb-2">
              Rarity Tier
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r ${tierColor} border border-white/30 text-lg font-bold text-white`}
              >
                Tier {tier}
              </div>
              <span className="text-xl font-bold text-white">{tierName}</span>
            </div>
          </div>

          {/* Rarity Stars */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-5">
            <div className="text-sm text-gray-400 font-semibold mb-2">
              Rarity Stars
            </div>
            <div className="flex items-center gap-1">
              {getTierStars(tier)}
              <span className="text-xl font-bold text-yellow-400 ml-2">
                {item.rarity_stars}
              </span>
            </div>
          </div>

          {/* Date Obtained */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-5 md:col-span-2">
            <div className="flex items-center gap-3">
              <IconCalendar size={28} className="text-purple-400" stroke={2} />
              <div>
                <div className="text-sm text-gray-400 font-semibold">
                  Obtained
                </div>
                <div className="text-xl font-bold text-white">
                  {formatDateFriendly(userItem.acquired_at)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Item Details</h2>
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

      {/* Bottom Navigation */}
      <BottomNav currentPage="vault" />
    </div>
  );
}

export default ItemDetailsPage;
