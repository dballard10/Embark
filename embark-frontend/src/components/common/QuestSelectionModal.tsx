import { useState, useEffect } from "react";
import { IconX, IconLoader } from "@tabler/icons-react";
import QuestCard from "./QuestCard";
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
  const [allQuests, setAllQuests] = useState<Quest[]>([]);
  const [availableQuests, setAvailableQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startingQuestId, setStartingQuestId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadQuests();
    }
  }, [isOpen, activeQuests, completedQuests]);

  const loadQuests = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all quests from database
      const quests = await fetchAllQuests();
      setAllQuests(quests);

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

  const handleStartQuest = async (questId: string) => {
    try {
      setStartingQuestId(questId);
      setError(null);

      await startQuest(userId, questId);

      // Success! Close modal and notify parent
      onQuestSelected();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start quest");
    } finally {
      setStartingQuestId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-800 rounded-xl shadow-2xl border-2 border-slate-600 max-w-6xl w-full my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Select a Quest</h2>
            <p className="text-sm text-gray-400 mt-1">
              Choose a quest to add to your active quests
            </p>
          </div>
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

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <CardSkeleton key={`skeleton-quest-${index}`} variant="quest" />
              ))}
            </div>
          ) : availableQuests.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <p className="text-gray-400 text-lg">
                No available quests found. You've either completed or are
                currently doing all available quests!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {availableQuests.map((quest) => {
                const isStarting = startingQuestId === quest.id;

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
                  <div key={quest.id} className="relative">
                    {isStarting && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 rounded-xl">
                        <IconLoader
                          size={48}
                          className="text-blue-400 animate-spin"
                        />
                      </div>
                    )}
                    <div
                      onClick={() => !isStarting && handleStartQuest(quest.id)}
                      className={`cursor-pointer ${
                        isStarting ? "pointer-events-none" : ""
                      }`}
                    >
                      <QuestCard
                        userQuest={mockUserQuest}
                        variant="available"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            disabled={!!startingQuestId}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestSelectionModal;
