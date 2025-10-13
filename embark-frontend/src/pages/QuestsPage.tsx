import { useState, useEffect } from "react";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import QuestCard from "../components/common/QuestCard";
import CardSkeleton from "../components/common/CardSkeleton";
import QuestSelectionModal from "../components/common/QuestSelectionModal";
import type { UserCompletedQuest } from "../types/quest.types";
import type { Item } from "../types/item.types";
import { useUser } from "../contexts/UserContext";
import {
  fetchActiveQuests,
  fetchCompletedQuests,
  fetchUserItems,
} from "../services/api";

function QuestsPage() {
  const { selectedUser, isLoading: userLoading } = useUser();
  const [userItemCount, setUserItemCount] = useState(0);
  const [activeQuests, setActiveQuests] = useState<UserCompletedQuest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<UserCompletedQuest[]>(
    []
  );
  const [completedQuestItems, setCompletedQuestItems] = useState<
    Record<string, Item>
  >({});
  const [loading, setLoading] = useState(true);
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);

  useEffect(() => {
    if (selectedUser?.id) {
      loadQuests();
    }
  }, [selectedUser?.id]);

  const loadQuests = async () => {
    if (!selectedUser?.id) return;

    try {
      setLoading(true);

      // Fetch active quests (now returns array)
      const activeQuestData = await fetchActiveQuests(selectedUser.id);
      setActiveQuests(activeQuestData);

      // Fetch completed quests
      const completed = await fetchCompletedQuests(selectedUser.id, 50);
      setCompletedQuests(completed);

      // Fetch user items for count
      const items = await fetchUserItems(selectedUser.id);
      setUserItemCount(items.length);

      // Load items for completed quests
      const itemsMap: Record<string, Item> = {};

      setCompletedQuestItems(itemsMap);
    } catch (error) {
      console.error("Error loading quests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuest = () => {
    setIsQuestModalOpen(true);
  };

  const handleQuestAdded = () => {
    // Reload quests after a quest is added
    loadQuests();
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
        {/* Active Quests Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            Active Quests
            <span className="text-sm font-normal text-gray-400">
              ({activeQuests.length}/4)
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? [...Array(4)].map((_, index) => (
                  <CardSkeleton
                    key={`skeleton-active-${index}`}
                    variant="quest"
                  />
                ))
              : [...Array(4)].map((_, index) => {
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

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <CardSkeleton
                  key={`skeleton-completed-${index}`}
                  variant="quest"
                />
              ))}
            </div>
          ) : completedQuests.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <p className="text-gray-400">
                No completed quests yet. Complete a quest to see it here!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="quests" />

      {/* Quest Selection Modal */}
      <QuestSelectionModal
        isOpen={isQuestModalOpen}
        onClose={() => setIsQuestModalOpen(false)}
        onQuestSelected={handleQuestAdded}
        userId={selectedUser.id}
        activeQuests={activeQuests}
        completedQuests={completedQuests}
      />
    </div>
  );
}

export default QuestsPage;
