import { useState } from "react";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import ActiveQuestsGrid from "../components/common/ActiveQuestsGrid";
import QuestCard from "../components/common/QuestCard";
import CardSkeleton from "../components/common/CardSkeleton";
import QuestSelectionModal from "../components/common/QuestSelectionModal";
import QuestDetailsModal from "../components/common/QuestDetailsModal";
import CompletedQuestDetailsModal from "../components/common/CompletedQuestDetailsModal";
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
  const [selectedCompletedQuestId, setSelectedCompletedQuestId] = useState<
    string | null
  >(null);
  const [isCompletedQuestModalOpen, setIsCompletedQuestModalOpen] =
    useState(false);
  const [tierFilter, setTierFilter] = useState<number | "all">("all");

  const handleAddQuest = () => {
    setIsQuestModalOpen(true);
  };

  const handleQuestAdded = () => {
    // Reload quests after a quest is added
    refreshQuests();
  };

  // Filter and sort completed quests by tier (T6 first)
  const filteredCompletedQuests = completedQuests
    .filter((quest) => {
      if (!quest.quest) return false;
      return tierFilter === "all" || quest.quest.tier === tierFilter;
    })
    .sort((a, b) => {
      if (!a.quest || !b.quest) return 0;
      return b.quest.tier - a.quest.tier; // Descending order: T6, T5, T4, T3, T2, T1
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
      <div className="bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-blue-900/90 border-b-2 border-blue-600 fixed top-[64px] sm:top-[72px] md:top-[80px] left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-row items-center gap-3 sm:gap-4 py-2">
            {/* Title Section - Left Aligned */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <IconTarget
                  size={24}
                  className="sm:w-7 sm:h-7 md:w-8 md:h-8 text-white"
                  stroke={2}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-100 truncate">
                  Quest Board
                </h1>
                <p className="text-xs sm:text-sm text-blue-300/80">
                  {filteredCompletedQuests.length} / {completedQuests.length}{" "}
                  completed
                  {tierFilter !== "all" && ` (Tier ${tierFilter})`}
                </p>
              </div>
            </div>

            {/* Tier Filter - Centered */}
            <div className="flex items-center justify-center flex-1">
              {completedQuests.length > 0 && (
                <div className="flex items-center justify-center">
                  <div className="flex flex-wrap gap-1 items-center bg-blue-950/50 backdrop-blur-sm rounded-lg p-1 border border-blue-700/30">
                    <button
                      onClick={() => setTierFilter("all")}
                      className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded font-medium text-xs sm:text-sm transition-all active:scale-95 ${
                        tierFilter === "all"
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-blue-300 hover:text-blue-100 hover:bg-blue-800/30 active:bg-blue-800/50"
                      }`}
                    >
                      All
                    </button>
                    {[1, 2, 3, 4, 5, 6].map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setTierFilter(tier)}
                        className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded font-medium text-xs sm:text-sm transition-all active:scale-95 ${
                          tierFilter === tier
                            ? "bg-blue-600 text-white shadow-md"
                            : "text-blue-300 hover:text-blue-100 hover:bg-blue-800/30 active:bg-blue-800/50"
                        }`}
                      >
                        T{tier}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Active Quests - Right Aligned */}
            <div className="flex items-center justify-end flex-1">
              <div className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-br from-blue-600/30 to-indigo-600/30 border-2 border-blue-500/40 flex-shrink-0">
                <IconCheck
                  size={20}
                  className="sm:w-7 sm:h-7 text-blue-400"
                  stroke={2}
                />
                <div>
                  <div className="text-xs text-blue-300/80 font-semibold">
                    Active Quests
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-200">
                    {activeQuests.length} / 4
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 pt-[140px] sm:pt-[150px] md:pt-[132px]">
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
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
            Completed Quests
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredCompletedQuests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  userQuest={quest}
                  variant="completed"
                  onClick={() => {
                    setSelectedCompletedQuestId(quest.id);
                    setIsCompletedQuestModalOpen(true);
                  }}
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

      {/* Completed Quest Details Modal */}
      {selectedCompletedQuestId && (
        <CompletedQuestDetailsModal
          isOpen={isCompletedQuestModalOpen}
          onClose={() => {
            setIsCompletedQuestModalOpen(false);
            setSelectedCompletedQuestId(null);
          }}
          completedQuestId={selectedCompletedQuestId}
        />
      )}
    </div>
  );
}

export default QuestsPage;
