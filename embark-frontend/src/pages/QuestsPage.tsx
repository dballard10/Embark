import { useState, useEffect } from "react";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import QuestCard from "../components/common/QuestCard";
import type { UserCompletedQuest } from "../types/quest.types";
import type { Item } from "../types/item.types";

// Mock user data for now (same as HomePage)
const mockUser = {
  id: "1",
  username: "TestUser",
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
                  ({activeQuests.length}/4)
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => {
                  const quest = activeQuests[index];
                  return quest ? (
                    <QuestCard
                      key={quest.id}
                      userQuest={quest}
                      variant="active"
                    />
                  ) : (
                    <QuestCard
                      key={`add-${index}`}
                      variant="add"
                      onClick={handleAddQuest}
                    />
                  );
                })}
              </div>
            </div>

            {/* Completed Quests Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                Completed Quests
                <span className="text-sm font-normal text-gray-400">
                  ({completedQuests.length})
                </span>
              </h2>

              {completedQuests.length === 0 ? (
                <div className="text-center py-12 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                  <p className="text-gray-400">
                    No completed quests yet. Complete a quest to see it here!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedQuests.map((quest) => (
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
