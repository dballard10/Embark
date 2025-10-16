import { useState, useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import QuestDetailsView from "./QuestDetailsView";
import LoadingIcon from "./LoadingIcon";
import { useUser } from "../../contexts/UserContext";
import { useItems } from "../../contexts/ItemsContext";
import { useQuestsContext } from "../../contexts/QuestsContext";
import type { UserCompletedQuest } from "../../types/quest.types";
import {
  completeQuest,
  abandonQuest,
  type QuestCompletionResponse,
} from "../../services/api";
import QuestDetailsModalSkeleton from "./QuestDetailsModalSkeleton";

interface QuestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  questId: string;
}

function QuestDetailsModal({
  isOpen,
  onClose,
  questId,
}: QuestDetailsModalProps) {
  const { selectedUser, refreshUser } = useUser();
  const { refreshItems } = useItems();
  const { activeQuests, refreshQuests } = useQuestsContext();
  const [userQuest, setUserQuest] = useState<UserCompletedQuest | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isAbandoning, setIsAbandoning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completionMessage, setCompletionMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (isOpen && questId) {
      loadQuestData();
    }
  }, [isOpen, questId, activeQuests]);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const loadQuestData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Find the quest by ID from context
      const quest = activeQuests.find((q) => q.id === questId);

      if (quest) {
        setUserQuest(quest);
      } else {
        setError("Quest not found");
      }
    } catch (error) {
      console.error("Error loading quest data:", error);
      setError("Failed to load quest details");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!selectedUser || !userQuest) return;

    try {
      setIsCompleting(true);
      setError(null);

      const response: QuestCompletionResponse = await completeQuest(
        selectedUser.id,
        userQuest.id
      );

      // Set completion message based on whether item was awarded
      if (response.awarded_item?.item) {
        setCompletionMessage(
          `Quest completed! You received: ${response.awarded_item.item.name}`
        );
      } else {
        setCompletionMessage(
          "Quest completed! (You already own all items from this tier)"
        );
      }

      // Refresh user data, items, and quests
      await refreshUser();
      await refreshItems();
      await refreshQuests();

      // Close modal after a brief delay to show the message
      setTimeout(() => {
        onClose();
        setCompletionMessage(null);
      }, 2000);
    } catch (error: any) {
      console.error("Error completing quest:", error);
      setError(error.message || "Failed to complete quest");
    } finally {
      setIsCompleting(false);
    }
  };

  const handleAbandon = async () => {
    if (!selectedUser || !userQuest) return;

    try {
      setIsAbandoning(true);
      setError(null);

      await abandonQuest(selectedUser.id, userQuest.id);

      // Refresh user data and quests
      await refreshUser();
      await refreshQuests();

      // Close modal on success
      onClose();
    } catch (error: any) {
      console.error("Error abandoning quest:", error);
      setError(error.message || "Failed to abandon quest");
    } finally {
      setIsAbandoning(false);
    }
  };

  if (!isOpen) return null;

  const baseColor = "#0a2847";
  const tierBorderColor = "border-blue-500/50";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`rounded-2xl border-2 ${tierBorderColor} shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col relative animate-modal-scale`}
        style={{
          backgroundColor: baseColor,
          backgroundImage: `radial-gradient(ellipse at center, #0a2847 0%, #003d5c 100%)`,
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quest-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2
              id="quest-modal-title"
              className="text-2xl font-bold text-white"
            >
              Quest Details
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Review quest progress and manage completion
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <IconX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Loading State */}
          {loading && (
            <QuestDetailsModalSkeleton tierBorderColor={tierBorderColor} />
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-red-300 text-center">
              {error}
            </div>
          )}

          {/* Completion Message */}
          {completionMessage && (
            <div className="bg-green-900/30 border border-green-500 rounded-lg p-4 text-green-300 text-center mb-4">
              {completionMessage}
            </div>
          )}

          {/* Quest Details */}
          {!loading && !error && userQuest && (
            <QuestDetailsView userQuest={userQuest} showStartedInfo={true} />
          )}
        </div>

        {/* Footer */}
        {!loading && !error && userQuest && (
          <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
            <button
              onClick={handleAbandon}
              disabled={isCompleting || isAbandoning}
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-lg font-bold transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
            >
              {isAbandoning && <LoadingIcon size="small" />}
              <span>{isAbandoning ? "Abandoning..." : "Abandon Quest"}</span>
            </button>
            <button
              onClick={handleComplete}
              disabled={isCompleting || isAbandoning}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg font-bold transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
            >
              {isCompleting && <LoadingIcon size="small" />}
              <span>{isCompleting ? "Completing..." : "Complete Quest"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestDetailsModal;
