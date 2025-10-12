import { useState, useEffect } from "react";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import ItemCard from "../components/common/ItemCard";
import type { UserItem, RarityTier } from "../types/item.types";
import { IconFilter, IconSortAscending } from "@tabler/icons-react";

// Mock user data (same as other pages)
const mockUser = {
  id: "1",
  username: "GeneralJF",
  total_glory: 3445,
  total_xp: 3095,
  level: 9,
  created_at: new Date().toISOString(),
  total_items: 103,
};

// Mock user items
const mockUserItems: UserItem[] = [
  {
    id: "ui-1",
    user_id: "1",
    item_id: "1",
    item: {
      id: "1",
      name: "Champion's Medallion",
      description: "A prestigious award for completing physical challenges",
      rarity_tier: 2,
      rarity_stars: 3,
      image_url: null,
      created_at: new Date().toISOString(),
    },
    acquired_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: false,
  },
  {
    id: "ui-2",
    user_id: "1",
    item_id: "2",
    item: {
      id: "2",
      name: "Scholar's Bookmark",
      description: "A beautiful bookmark for dedicated readers",
      rarity_tier: 1,
      rarity_stars: 2,
      image_url: null,
      created_at: new Date().toISOString(),
    },
    acquired_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: false,
  },
  {
    id: "ui-3",
    user_id: "1",
    item_id: "3",
    item: {
      id: "3",
      name: "Warrior's Blade",
      description: "A legendary sword forged in the fires of Mount Doom",
      rarity_tier: 4,
      rarity_stars: 5,
      image_url: null,
      created_at: new Date().toISOString(),
    },
    acquired_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: true,
  },
  {
    id: "ui-4",
    user_id: "1",
    item_id: "4",
    item: {
      id: "4",
      name: "Mystic Amulet",
      description: "An ancient amulet with mysterious powers",
      rarity_tier: 3,
      rarity_stars: 4,
      image_url: null,
      created_at: new Date().toISOString(),
    },
    acquired_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: false,
  },
  {
    id: "ui-5",
    user_id: "1",
    item_id: "5",
    item: {
      id: "5",
      name: "Dragon Scale Shield",
      description: "A shield crafted from real dragon scales",
      rarity_tier: 5,
      rarity_stars: 6,
      image_url: null,
      created_at: new Date().toISOString(),
    },
    acquired_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: false,
  },
  {
    id: "ui-6",
    user_id: "1",
    item_id: "6",
    item: {
      id: "6",
      name: "Bronze Coin",
      description: "A simple bronze coin from a novice quest",
      rarity_tier: 1,
      rarity_stars: 1,
      image_url: null,
      created_at: new Date().toISOString(),
    },
    acquired_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: false,
  },
];

type FilterTier = "all" | RarityTier;
type SortOption =
  | "date-newest"
  | "date-oldest"
  | "rarity-highest"
  | "rarity-lowest";

function VaultPage() {
  const [user] = useState(mockUser);
  const [userItems, setUserItems] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTier, setFilterTier] = useState<FilterTier>("all");
  const [sortOption, setSortOption] = useState<SortOption>("date-newest");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);

      // Use mock data for now
      setUserItems(mockUserItems);

      // Uncomment when API is ready:
      // const items = await fetchUserItems(user.id);
      // setUserItems(items);
    } catch (error) {
      console.error("Error loading items:", error);
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

  return (
    <div className="game-container">
      {/* Top Stats Bar */}
      <TopBar
        username={user.username}
        totalXP={user.total_xp}
        totalGlory={user.total_glory}
        totalItems={user.total_items}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Item Vault</h1>
          <p className="text-gray-400">
            Your collection of earned items and rewards
          </p>
        </div>

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
              <option value="date-newest">Date Obtained - Newest First</option>
              <option value="date-oldest">Date Obtained - Oldest First</option>
              <option value="rarity-highest">Rarity - Highest First</option>
              <option value="rarity-lowest">Rarity - Lowest First</option>
            </select>
          </div>
        </div>

        {/* Item Count */}
        <div className="mb-6 text-sm text-gray-400">
          Showing {filteredAndSortedItems.length} of {userItems.length} items
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-400 text-lg">Loading items...</div>
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
            {filteredAndSortedItems.map((userItem) => (
              <ItemCard key={userItem.id} userItem={userItem} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="vault" />
    </div>
  );
}

export default VaultPage;
