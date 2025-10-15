import { useState, useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import QuestDetailsView from "./QuestDetailsView";
import { useUser } from "../../contexts/UserContext";
import type { UserCompletedQuest } from "../../types/quest.types";
import type { Item } from "../../types/item.types";
import type { QuestTier } from "../../types/quest.types";
import { getTierBorderColor } from "../../utils/tierUtils";
import {
  fetchActiveQuests,
  fetchItemById,
  completeQuest,
} from "../../services/api";
import QuestDetailsModalSkeleton from "./QuestDetailsModalSkeleton";

// Helper function to get base color for tier diagonal pattern
function getTierBaseColor(tier: QuestTier): string {
  const colors: Record<QuestTier, string> = {
    1: "#6b7280", // gray-500
    2: "#22c55e", // green-500
    3: "#3b82f6", // blue-500
    4: "#a855f7", // purple-500
    5: "#f97316", // orange-500
    6: "#dc2626", // red-600
  };
  return colors[tier];
}

// Helper function to get darker shade for diagonal pattern
function getTierDarkerColor(tier: QuestTier): string {
  const colors: Record<QuestTier, string> = {
    1: "#4b5563", // gray-600
    2: "#16a34a", // green-600
    3: "#2563eb", // blue-600
    4: "#9333ea", // purple-600
    5: "#ea580c", // orange-600
    6: "#be123c", // red-700
  };
  return colors[tier];
}

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

  const tier = userQuest?.quest?.tier;
  const tierBorderColor = tier
    ? getTierBorderColor(tier)
    : "border-purple-500/50";

  // Get tier-specific colors for diagonal pattern
  const baseColor = tier ? getTierBaseColor(tier) : "#3b82f6";
  const darkerColor = tier ? getTierDarkerColor(tier) : "#2563eb";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`rounded-2xl border-2 ${tierBorderColor} shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-modal-scale`}
        style={{
          backgroundColor: baseColor,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 69px,
            ${darkerColor}E6 69px,
            transparent 71px,
            transparent 141px
          ),
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 69px,
            ${darkerColor}E6 69px,
            transparent 71px,
            transparent 141px
          )`,
        }}
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
          <QuestDetailsModalSkeleton tierBorderColor={tierBorderColor} />
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
