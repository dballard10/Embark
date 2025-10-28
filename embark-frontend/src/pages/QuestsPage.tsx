import { useState } from "react";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import ActiveQuestsGrid from "../components/common/ActiveQuestsGrid";
import QuestCard from "../components/common/QuestCard";
import CardSkeleton from "../components/common/CardSkeleton";
import QuestSelectionModal from "../components/common/QuestSelectionModal";
import QuestDetailsModal from "../components/common/QuestDetailsModal";
import LoadingIcon from "../components/common/LoadingIcon";
import { useUser } from "../contexts/UserContext";
import { useItems } from "../contexts/ItemsContext";
import { useQuestsContext } from "../contexts/QuestsContext";
import { IconTarget, IconCheck } from "@tabler/icons-react";

function QuestsPage() {
  const { selectedUser, isLoading: userLoading } = useUser();
  const { itemCount: userItemCount, loading: itemsLoading } = useItems();
  const { activeQuests, completedQuests, loading, refreshQuests } =
    useQuestsContext();
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [isQuestDetailsModalOpen, setIsQuestDetailsModalOpen] = useState(false);
  const [tierFilter, setTierFilter] = useState<number | "all">("all");

  const handleAddQuest = () => {
    setIsQuestModalOpen(true);
  };

  const handleQuestAdded = () => {
    // Reload quests after a quest is added
    refreshQuests();
  };

  // Filter and sort completed quests by tier
  const filteredCompletedQuests = completedQuests
    .filter((quest) => {
      if (!quest.quest) return false;
      return tierFilter === "all" || quest.quest.tier === tierFilter;
    })
    .sort((a, b) => {
      if (!a.quest || !b.quest) return 0;
      return a.quest.tier - b.quest.tier;
    });

  if (userLoading || !selectedUser) {
    return (
      <div className="game-container flex items-center justify-center min-h-screen">
        <LoadingIcon size="large" />
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
        isLoadingItems={itemsLoading}
      />

      {/* Quest Board Header */}
      <div className="bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-blue-900/90 border-b-2 border-blue-600 fixed top-[72px] left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <IconTarget size={32} className="text-white" stroke={2} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-blue-100">
                  Quest Board
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-blue-600/30 to-indigo-600/30 border-2 border-blue-500/40">
              <IconCheck size={28} className="text-blue-400" stroke={2} />
              <div>
                <div className="text-xs text-blue-300/80 font-semibold">
                  Active Quests
                </div>
                <div className="text-2xl font-bold text-blue-200">
                  {activeQuests.length} / 4
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 pb-24 pt-[168px]">
        {/* Active Quests Section */}
        <ActiveQuestsGrid
          activeQuests={activeQuests}
          loading={loading}
          onAddQuest={handleAddQuest}
          onQuestClick={(questId) => {
            setSelectedQuestId(questId);
            setIsQuestDetailsModalOpen(true);
          }}
          showHeader={false}
        />

        {/* Completed Quests Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Completed Quests
              <span className="text-sm font-normal text-gray-400">
                ({filteredCompletedQuests.length} / {completedQuests.length}
                {tierFilter !== "all" && ` - Tier ${tierFilter}`})
              </span>
            </h2>

            {/* Tier Filter */}
            {completedQuests.length > 0 && (
              <div className="flex gap-1 items-center bg-slate-900 rounded-lg p-1">
                <button
                  onClick={() => setTierFilter("all")}
                  className={`px-3 py-1 rounded font-medium text-sm transition-all ${
                    tierFilter === "all"
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  All
                </button>
                {[1, 2, 3, 4, 5, 6].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setTierFilter(tier)}
                    className={`px-3 py-1 rounded font-medium text-sm transition-all ${
                      tierFilter === tier
                        ? "bg-blue-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    T{tier}
                  </button>
                ))}
              </div>
            )}
          </div>

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
          ) : filteredCompletedQuests.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <p className="text-gray-400">
                No completed quests found for Tier {tierFilter}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCompletedQuests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  userQuest={quest}
                  variant="completed"
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

      {/* Quest Details Modal */}
      {selectedQuestId && (
        <QuestDetailsModal
          isOpen={isQuestDetailsModalOpen}
          onClose={() => {
            setIsQuestDetailsModalOpen(false);
            setSelectedQuestId(null);
            // Reload quests after completing
            refreshQuests();
          }}
          questId={selectedQuestId}
        />
      )}
    </div>
  );
}

export default QuestsPage;
