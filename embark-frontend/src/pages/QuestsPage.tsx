import { useState, useEffect } from "react";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import QuestCard from "../components/common/QuestCard";
import {
  fetchActiveQuests,
  fetchCompletedQuests,
  fetchItemById,
} from "../services/api";
import type { UserCompletedQuest, QuestTier } from "../types/quest.types";
import type { Item } from "../types/item.types";
import { IconPlus, IconFilter, IconSortAscending } from "@tabler/icons-react";

type FilterTier = "all" | QuestTier;
type SortOption =
  | "date-newest"
  | "date-oldest"
  | "tier-highest"
  | "tier-lowest";

// Mock user data for now (same as HomePage)
const mockUser = {
  id: "1",
  username: "GeneralJF",
  total_glory: 3445,
  total_xp: 3095,
  level: 9,
  created_at: new Date().toISOString(),
  total_items: 103,
};

// Mock active quests (until API is properly connected)
const mockActiveQuests: UserCompletedQuest[] = [
  {
    id: "1",
    user_id: "1",
    quest_id: "1",
    quest: {
      id: "1",
      title: "Morning Workout Challenge",
      description: "Complete a 30-minute workout session",
      tier: 2 as const,
      glory_reward: 5000,
      xp_reward: 5000,
      time_limit_hours: 24,
      reward_item_id: "1",
      created_at: new Date().toISOString(),
    },
    started_at: new Date().toISOString(),
    completed_at: null,
    deadline_at: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours from now
    is_active: true,
  },
  {
    id: "2",
    user_id: "1",
    quest_id: "2",
    quest: {
      id: "2",
      title: "Read for 1 Hour",
      description: "Spend quality time reading a book",
      tier: 1 as const,
      glory_reward: 2000,
      xp_reward: 2000,
      time_limit_hours: 48,
      reward_item_id: "2",
      created_at: new Date().toISOString(),
    },
    started_at: new Date().toISOString(),
    completed_at: null,
    deadline_at: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(), // 36 hours from now
    is_active: true,
  },
];

// Mock completed quests
const mockCompletedQuests: UserCompletedQuest[] = [
  {
    id: "3",
    user_id: "1",
    quest_id: "3",
    quest: {
      id: "3",
      title: "Daily Meditation",
      description: "Meditate for 20 minutes",
      tier: 1 as const,
      glory_reward: 1500,
      xp_reward: 1500,
      time_limit_hours: 24,
      reward_item_id: "1",
      created_at: new Date().toISOString(),
    },
    started_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    completed_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    deadline_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    is_active: false,
  },
  {
    id: "4",
    user_id: "1",
    quest_id: "4",
    quest: {
      id: "4",
      title: "Complete 3 Tasks",
      description: "Finish three important tasks from your to-do list",
      tier: 3 as const,
      glory_reward: 7500,
      xp_reward: 7500,
      time_limit_hours: 24,
      reward_item_id: "2",
      created_at: new Date().toISOString(),
    },
    started_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    completed_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    deadline_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    is_active: false,
  },
];

// Mock items for completed quests
const mockItems: Record<string, Item> = {
  "1": {
    id: "1",
    name: "Bronze Medal",
    description: "A shiny bronze medal for your achievement",
    rarity_tier: 1 as const,
    rarity_stars: 1,
    image_url: null,
    created_at: new Date().toISOString(),
  },
  "2": {
    id: "2",
    name: "Silver Trophy",
    description: "A prestigious silver trophy",
    rarity_tier: 2 as const,
    rarity_stars: 2,
    image_url: null,
    created_at: new Date().toISOString(),
  },
};

function QuestsPage() {
  const [user] = useState(mockUser);
  const [activeQuests, setActiveQuests] = useState<UserCompletedQuest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<UserCompletedQuest[]>(
    []
  );
  const [completedQuestItems, setCompletedQuestItems] = useState<
    Record<string, Item>
  >({});
  const [loading, setLoading] = useState(true);
  const [filterTier, setFilterTier] = useState<FilterTier>("all");
  const [sortOption, setSortOption] = useState<SortOption>("date-newest");

  useEffect(() => {
    loadQuests();
  }, []);

  const loadQuests = async () => {
    try {
      setLoading(true);

      // For now, use mock data since the backend returns single active quest
      // In production, you might want to handle this differently
      setActiveQuests(mockActiveQuests);
      setCompletedQuests(mockCompletedQuests);

      // Load items for completed quests
      const itemsMap: Record<string, Item> = { ...mockItems };

      // Uncomment when API is ready:
      // const activeData = await fetchActiveQuests(user.id);
      // const completedData = await fetchCompletedQuests(user.id, 20);
      // setActiveQuests(activeData ? [activeData] : []);
      // setCompletedQuests(completedData);

      // Load items for completed quests
      // for (const quest of completedData) {
      //   if (quest.quest?.reward_item_id) {
      //     try {
      //       const item = await fetchItemById(quest.quest.reward_item_id);
      //       itemsMap[quest.quest.reward_item_id] = item;
      //     } catch (error) {
      //       console.error("Error loading item:", error);
      //     }
      //   }
      // }

      setCompletedQuestItems(itemsMap);
    } catch (error) {
      console.error("Error loading quests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuest = () => {
    console.log(
      "Add new quest clicked - functionality to be implemented later"
    );
  };

  // Apply filters and sorting to completed quests
  const filteredAndSortedCompletedQuests = completedQuests
    .filter((quest) => {
      if (filterTier === "all") return true;
      return quest.quest?.tier === filterTier;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "date-newest":
          return (
            new Date(b.completed_at || 0).getTime() -
            new Date(a.completed_at || 0).getTime()
          );
        case "date-oldest":
          return (
            new Date(a.completed_at || 0).getTime() -
            new Date(b.completed_at || 0).getTime()
          );
        case "tier-highest":
          return (b.quest?.tier || 0) - (a.quest?.tier || 0);
        case "tier-lowest":
          return (a.quest?.tier || 0) - (b.quest?.tier || 0);
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Quests</h1>
          <p className="text-gray-400">
            Track your active and completed quests
          </p>
        </div>

        {/* Add Quest Button */}
        <div className="mb-8">
          <button
            onClick={handleAddQuest}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <IconPlus size={24} stroke={2.5} />
            Add New Quest
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-400 text-lg">Loading quests...</div>
          </div>
        ) : (
          <>
            {/* Active Quests Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                Active Quests
                <span className="text-sm font-normal text-gray-400">
                  ({activeQuests.length})
                </span>
              </h2>
              {activeQuests.length === 0 ? (
                <div className="text-center py-12 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                  <p className="text-gray-400">
                    No active quests. Start a new quest to begin!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeQuests.map((quest) => (
                    <QuestCard
                      key={quest.id}
                      userQuest={quest}
                      variant="active"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Completed Quests Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                Completed Quests
                <span className="text-sm font-normal text-gray-400">
                  ({completedQuests.length})
                </span>
              </h2>

              {completedQuests.length > 0 && (
                <>
                  {/* Filter and Sort Controls */}
                  <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    {/* Filter Dropdown */}
                    <div className="flex-1">
                      <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <IconFilter size={18} stroke={2} />
                        Filter by Tier
                      </label>
                      <select
                        value={filterTier}
                        onChange={(e) =>
                          setFilterTier(e.target.value as FilterTier)
                        }
                        className="w-full px-4 py-3 bg-slate-800 border-2 border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:outline-none transition-colors"
                      >
                        <option value="all">All Tiers</option>
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
                        onChange={(e) =>
                          setSortOption(e.target.value as SortOption)
                        }
                        className="w-full px-4 py-3 bg-slate-800 border-2 border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:outline-none transition-colors"
                      >
                        <option value="date-newest">
                          Date Completed - Newest First
                        </option>
                        <option value="date-oldest">
                          Date Completed - Oldest First
                        </option>
                        <option value="tier-highest">
                          Tier - Highest First
                        </option>
                        <option value="tier-lowest">Tier - Lowest First</option>
                      </select>
                    </div>
                  </div>

                  {/* Quest Count */}
                  <div className="mb-4 text-sm text-gray-400">
                    Showing {filteredAndSortedCompletedQuests.length} of{" "}
                    {completedQuests.length} completed quests
                  </div>
                </>
              )}

              {completedQuests.length === 0 ? (
                <div className="text-center py-12 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                  <p className="text-gray-400">
                    No completed quests yet. Complete a quest to see it here!
                  </p>
                </div>
              ) : filteredAndSortedCompletedQuests.length === 0 ? (
                <div className="text-center py-12 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                  <p className="text-gray-400">
                    No completed quests found with the selected filters.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedCompletedQuests.map((quest) => (
                    <QuestCard
                      key={quest.id}
                      userQuest={quest}
                      variant="completed"
                      rewardItem={
                        quest.quest?.reward_item_id
                          ? completedQuestItems[quest.quest.reward_item_id]
                          : undefined
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="quests" />
    </div>
  );
}

export default QuestsPage;
