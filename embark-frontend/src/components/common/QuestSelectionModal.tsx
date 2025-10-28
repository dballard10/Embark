import { useState, useEffect } from "react";
import { IconX, IconLoader, IconArrowLeft } from "@tabler/icons-react";
import QuestCard from "./QuestCard";
import QuestDetailsView from "./QuestDetailsView";
import CardSkeleton from "./CardSkeleton";
import type { Quest, UserCompletedQuest } from "../../types/quest.types";
import { fetchAllQuests, startQuest } from "../../services/api";

interface QuestSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestSelected: () => void;
  userId: string;
  activeQuests: UserCompletedQuest[];
  completedQuests: UserCompletedQuest[];
}

function QuestSelectionModal({
  isOpen,
  onClose,
  onQuestSelected,
  userId,
  activeQuests,
  completedQuests,
}: QuestSelectionModalProps) {
  const [availableQuests, setAvailableQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startingQuestId, setStartingQuestId] = useState<string | null>(null);
  const [selectedQuestForDetails, setSelectedQuestForDetails] =
    useState<Quest | null>(null);
  const [tierFilter, setTierFilter] = useState<number | "all">("all");

  useEffect(() => {
    if (isOpen) {
      loadQuests();
      setSelectedQuestForDetails(null);
    }
  }, [isOpen, activeQuests, completedQuests]);

  const loadQuests = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all quests from database
      const quests = await fetchAllQuests();

      // Filter out active and completed quests
      const activeQuestIds = new Set(activeQuests.map((q) => q.quest_id));
      const completedQuestIds = new Set(completedQuests.map((q) => q.quest_id));

      const available = quests.filter(
        (quest) =>
          !activeQuestIds.has(quest.id) && !completedQuestIds.has(quest.id)
      );

      setAvailableQuests(available);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load quests");
    } finally {
      setLoading(false);
    }
  };

  const handleQuestClick = (quest: Quest) => {
    setSelectedQuestForDetails(quest);
  };

  const handleBackToList = () => {
    setSelectedQuestForDetails(null);
  };

  const handleStartQuest = async () => {
    if (!selectedQuestForDetails) return;

    try {
      setStartingQuestId(selectedQuestForDetails.id);
      setError(null);

      await startQuest(userId, selectedQuestForDetails.id);

      // Success! Close modal and notify parent
      onQuestSelected();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start quest");
    } finally {
      setStartingQuestId(null);
    }
  };

  // Filter and sort quests by tier
  const filteredQuests = availableQuests
    .filter((quest) => tierFilter === "all" || quest.tier === tierFilter)
    .sort((a, b) => a.tier - b.tier);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div
        className="rounded-xl shadow-2xl border-2 border-slate-600 max-w-6xl w-full my-8 max-h-[90vh] flex flex-col"
        style={{
          backgroundColor: "#0a2847",
          backgroundImage: `radial-gradient(ellipse at center, #0a2847 0%, #003d5c 100%)`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            {selectedQuestForDetails && (
              <button
                onClick={handleBackToList}
                className="text-slate-400 hover:text-white transition-colors"
                disabled={!!startingQuestId}
              >
                <IconArrowLeft size={24} />
              </button>
            )}
            <div>
              <h2 className="text-2xl font-bold text-white">
                {selectedQuestForDetails ? "Quest Details" : "Select a Quest"}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {selectedQuestForDetails
                  ? "Review quest details and start when ready"
                  : !loading && availableQuests.length > 0
                  ? `${filteredQuests.length} / ${
                      availableQuests.length
                    } quests${
                      tierFilter !== "all" ? ` (Tier ${tierFilter})` : ""
                    }`
                  : "Choose a quest to add to your active quests"}
              </p>
            </div>
          </div>

          {/* Tier Filter - Only show when not viewing quest details */}
          {!selectedQuestForDetails &&
            !loading &&
            availableQuests.length > 0 && (
              <div className="flex gap-1 items-center bg-slate-900/70 backdrop-blur-sm rounded-lg p-1 border border-slate-700/50">
                <button
                  onClick={() => setTierFilter("all")}
                  className={`px-3 py-1 rounded font-medium text-sm transition-all ${
                    tierFilter === "all"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
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
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }`}
                  >
                    T{tier}
                  </button>
                ))}
              </div>
            )}

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
            disabled={!!startingQuestId}
          >
            <IconX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-red-300 text-sm mb-6">
              {error}
            </div>
          )}

          {selectedQuestForDetails ? (
            // Quest Details View
            <QuestDetailsView
              userQuest={{
                id: "",
                user_id: userId,
                quest_id: selectedQuestForDetails.id,
                quest: selectedQuestForDetails,
                started_at: "",
                completed_at: null,
                deadline_at: "",
                is_active: false,
              }}
              userId={userId}
              showStartedInfo={false}
            />
          ) : loading ? (
            // Loading State
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <CardSkeleton key={`skeleton-quest-${index}`} variant="quest" />
              ))}
            </div>
          ) : availableQuests.length === 0 ? (
            // Empty State
            <div className="text-center py-12 bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <p className="text-gray-400 text-lg">
                No available quests found. You've either completed or are
                currently doing all available quests!
              </p>
            </div>
          ) : filteredQuests.length === 0 ? (
            // No quests match filter
            <div className="text-center py-12 bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <p className="text-gray-400 text-lg">
                No quests found for Tier {tierFilter}
              </p>
            </div>
          ) : (
            // Quest List
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredQuests.map((quest) => {
                // Create a mock UserCompletedQuest for display purposes
                const mockUserQuest: UserCompletedQuest = {
                  id: "",
                  user_id: userId,
                  quest_id: quest.id,
                  quest: quest,
                  started_at: "",
                  completed_at: null,
                  deadline_at: "",
                  is_active: false,
                };

                return (
                  <QuestCard
                    key={quest.id}
                    userQuest={mockUserQuest}
                    variant="available"
                    onClick={() => handleQuestClick(quest)}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
          {selectedQuestForDetails ? (
            <>
              <button
                onClick={handleBackToList}
                disabled={!!startingQuestId}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              <button
                onClick={handleStartQuest}
                disabled={!!startingQuestId}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-bold transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {startingQuestId ? (
                  <span className="flex items-center gap-2">
                    <IconLoader size={20} className="animate-spin" />
                    Starting...
                  </span>
                ) : (
                  "Start Quest"
                )}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              disabled={!!startingQuestId}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestSelectionModal;
