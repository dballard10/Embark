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

// Mock user data
const mockUser = {
  id: "1",
  username: "GeneralJF",
  total_glory: 3445,
  total_xp: 3095,
  level: 9,
  created_at: new Date().toISOString(),
  total_items: 103,
};

// Mock user items (same as VaultPage)
const mockUserItems: UserItem[] = [
  {
    id: "ui-1",
    user_id: "1",
    item_id: "1",
    item: {
      id: "1",
      name: "Champion's Medallion",
      description:
        "A prestigious award for completing physical challenges. This medallion is forged from the finest metals and inscribed with ancient runes of strength. It has been awarded to only the most dedicated warriors throughout history.",
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
      description:
        "A beautiful bookmark for dedicated readers. Crafted from aged parchment and adorned with wisdom symbols, this bookmark marks not just pages, but the journey of knowledge itself.",
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
      description:
        "A legendary sword forged in the fires of Mount Doom. This blade has been passed down through generations of champions, each adding their own mark to its storied history. The steel never dulls, and its edge remains eternally sharp.",
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
      description:
        "An ancient amulet with mysterious powers. Legend says it was created by the first mages to walk the earth, imbuing it with arcane energies that still pulse within its crystal core.",
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
      description:
        "A shield crafted from real dragon scales. Each scale is harder than diamond and lighter than feather, providing unmatched protection. The shield still carries the ancient magic of the dragon that once wore these scales.",
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
      description:
        "A simple bronze coin from a novice quest. While modest in appearance, this coin represents your first steps on the path to greatness. Every champion started with their first coin.",
      rarity_tier: 1,
      rarity_stars: 1,
      image_url: null,
      created_at: new Date().toISOString(),
    },
    acquired_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: false,
  },
];

function ItemDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user] = useState(mockUser);
  const [userItem, setUserItem] = useState<UserItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    try {
      setLoading(true);

      // Use mock data for now
      const foundItem = mockUserItems.find((item) => item.id === id);
      if (foundItem) {
        setUserItem(foundItem);
      }

      // Uncomment when API is ready:
      // const item = await fetchItemById(id);
      // const userItems = await fetchUserItems(user.id);
      // const userItem = userItems.find(ui => ui.item_id === item.id);
      // setUserItem(userItem || null);
    } catch (error) {
      console.error("Error loading item:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="game-container flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!userItem?.item) {
    return (
      <div className="game-container flex items-center justify-center">
        <div className="text-white text-xl">Item not found</div>
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
        username={user.username}
        totalXP={user.total_xp}
        totalGlory={user.total_glory}
        totalItems={user.total_items}
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
