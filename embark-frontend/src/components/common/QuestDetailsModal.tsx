import { useState, useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import QuestDetailsView from "./QuestDetailsView";
import { useUser } from "../../contexts/UserContext";
import type { UserCompletedQuest } from "../../types/quest.types";
import type { Item } from "../../types/item.types";
import { getTierBorderColor } from "../../utils/tierUtils";
import {
  fetchActiveQuests,
  fetchItemById,
  completeQuest,
} from "../../services/api";

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
  const [userQuest, setUserQuest] = useState<UserCompletedQuest | null>(null);
  const [rewardItem, setRewardItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && selectedUser?.id && questId) {
      loadQuestData();
    }
  }, [isOpen, questId, selectedUser?.id]);

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
    if (!selectedUser?.id) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch active quests
      const activeQuests = await fetchActiveQuests(selectedUser.id);

      // Find the quest by ID
      const quest = activeQuests.find((q) => q.id === questId);

      if (quest) {
        setUserQuest(quest);

        // Fetch reward item if exists
        if (quest.quest?.reward_item_id) {
          try {
            const item = await fetchItemById(quest.quest.reward_item_id);
            setRewardItem(item);
          } catch (error) {
            console.error("Error loading reward item:", error);
          }
        }
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

      await completeQuest(selectedUser.id, userQuest.id);

      // Refresh user data
      await refreshUser();

      // Close modal on success
      onClose();
    } catch (error: any) {
      console.error("Error completing quest:", error);
      setError(error.message || "Failed to complete quest");
    } finally {
      setIsCompleting(false);
    }
  };

  const handleAbandon = () => {
    // TODO: Implement abandon quest functionality
    console.log("Abandon quest");
  };

  if (!isOpen) return null;

  const tierBorderColor = userQuest?.quest?.tier
    ? getTierBorderColor(userQuest.quest.tier)
    : "border-purple-500/50";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`bg-gradient-to-br from-slate-800/95 to-slate-900/95 rounded-2xl border-2 ${tierBorderColor} shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-modal-scale`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quest-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-slate-700/80 hover:bg-slate-600/80 text-white transition-colors"
          aria-label="Close modal"
        >
          <IconX size={24} stroke={2} />
        </button>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-400 text-lg">Loading quest...</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-8">
            <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-red-300 text-center">
              {error}
            </div>
          </div>
        )}

        {/* Quest Details */}
        {!loading && !error && userQuest && (
          <div className="p-6">
            <QuestDetailsView
              userQuest={userQuest}
              rewardItem={rewardItem}
              showActionButtons={true}
              onComplete={handleComplete}
              onAbandon={handleAbandon}
              isCompleting={isCompleting}
              showStartedInfo={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestDetailsModal;
