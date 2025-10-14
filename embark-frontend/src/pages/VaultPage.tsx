import { useState, useEffect } from "react";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import CardSkeleton from "../components/common/CardSkeleton";
import ItemDetailsModal from "../components/common/ItemDetailsModal";
import type { UserItem, RarityTier } from "../types/item.types";
import { IconFilter, IconSortAscending } from "@tabler/icons-react";
import {
  getTierStars,
  getTierGradientColor,
  getTierColor,
} from "../utils/tierUtils";
import { useUser } from "../contexts/UserContext";
import { fetchUserItems } from "../services/api";
import { getItemImage } from "../utils/itemImageUtils";
import ItemIcon from "../components/common/ItemIcon";

type FilterTier = "all" | RarityTier;
type SortOption =
  | "date-newest"
  | "date-oldest"
  | "rarity-highest"
  | "rarity-lowest";

function VaultPage() {
  const { selectedUser, isLoading: userLoading } = useUser();
  const [userItems, setUserItems] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTier, setFilterTier] = useState<FilterTier>("all");
  const [sortOption, setSortOption] = useState<SortOption>("date-newest");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (selectedUser?.id) {
      loadItems();
    }
  }, [selectedUser?.id]);

  const loadItems = async () => {
    if (!selectedUser?.id) return;

    try {
      setLoading(true);
      const items = await fetchUserItems(selectedUser.id);
      setUserItems(items);
    } catch (error) {
      console.error("Error loading items:", error);
      setUserItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and sorting
  const filteredAndSortedItems = userItems
    .filter((userItem) => {
      if (filterTier === "all") return true;
      return userItem.item?.rarity_tier === filterTier;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "date-newest":
          return (
            new Date(b.acquired_at).getTime() -
            new Date(a.acquired_at).getTime()
          );
        case "date-oldest":
          return (
            new Date(a.acquired_at).getTime() -
            new Date(b.acquired_at).getTime()
          );
        case "rarity-highest":
          return (b.item?.rarity_tier || 0) - (a.item?.rarity_tier || 0);
        case "rarity-lowest":
          return (a.item?.rarity_tier || 0) - (b.item?.rarity_tier || 0);
        default:
          return 0;
      }
    });

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
        totalItems={userItems.length}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Item Vault</h1>
          {/* Filter and Sort Controls */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            {/* Filter Dropdown */}
            <div className="flex-1">
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <IconFilter size={18} stroke={2} />
                Filter by Rarity
              </label>
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value as FilterTier)}
                className="w-full px-4 py-3 bg-slate-800 border-2 border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:outline-none transition-colors"
              >
                <option value="all">All Rarities</option>
                <option value={1}>Tier 1 - Novice</option>
                <option value={2}>Tier 2 - Adventurer</option>
                <option value={3}>Tier 3 - Warrior</option>
                <option value={4}>Tier 4 - Champion</option>
                <option value={5}>Tier 5 - Master</option>
                <option value={6}>Tier 6 - Conqueror</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex-1">
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <IconSortAscending size={18} stroke={2} />
                Sort By
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full px-4 py-3 bg-slate-800 border-2 border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:outline-none transition-colors"
              >
                <option value="date-newest">
                  Date Obtained - Newest First
                </option>
                <option value="date-oldest">
                  Date Obtained - Oldest First
                </option>
                <option value="rarity-highest">Rarity - Highest First</option>
                <option value="rarity-lowest">Rarity - Lowest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Item Count */}
        <div className="mb-6 text-sm text-gray-400">
          Showing {filteredAndSortedItems.length} of {userItems.length} items
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <CardSkeleton key={`skeleton-${index}`} variant="item" />
            ))}
          </div>
        ) : filteredAndSortedItems.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/30 border border-slate-700/50 rounded-xl">
            <p className="text-gray-400">
              {filterTier === "all"
                ? "No items yet. Complete quests to earn rewards!"
                : "No items found with the selected filters."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedItems.map((userItem) => {
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
