import { useState, useEffect } from "react";
import { IconX, IconStar, IconSparkles } from "@tabler/icons-react";
import QuestDetailsView from "./QuestDetailsView";
import LoadingIcon from "./LoadingIcon";
import { useUser } from "../../contexts/UserContext";
import { useItems } from "../../contexts/ItemsContext";
import { useQuestsContext } from "../../contexts/QuestsContext";
import { useAchievements } from "../../contexts/AchievementsContext";
import { useCelebrationOverlay } from "../../contexts/CelebrationOverlayContext";
import type { UserCompletedQuest } from "../../types/quest.types";
import type { UserItem } from "../../types/item.types";
import {
  completeQuest,
  abandonQuest,
  type QuestCompletionResponse,
} from "../../services/api";
import QuestDetailsModalSkeleton from "./QuestDetailsModalSkeleton";
import {
  getTierColor,
  getTierStars,
  getTierGradientColor,
} from "../../utils/tierUtils";
import { getItemImage } from "../../utils/itemImageUtils";

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
  const { refetchUserAchievements } = useAchievements();
  const { showSpecial, showStandard, showItemThenMaybeSpecial } = useCelebrationOverlay();
  const [userQuest, setUserQuest] = useState<UserCompletedQuest | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isAbandoning, setIsAbandoning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completionMessage, setCompletionMessage] = useState<string | null>(
    null
  );
  const [awardedItem, setAwardedItem] = useState<UserItem | null>(null);
  const [awardedAchievements, setAwardedAchievements] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen && questId && !completionMessage) {
      loadQuestData();
    }
  }, [isOpen, questId, activeQuests]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCompletionMessage(null);
      setAwardedItem(null);
      setAwardedAchievements([]);
      setError(null);
    }
  }, [isOpen]);

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
        // Don't show error if we just completed the quest
        // (quest is removed from activeQuests after completion)
        if (!completionMessage) {
          setError("Quest not found");
        }
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

      // Store awarded achievements and item
      setAwardedAchievements(response.awarded_achievements || []);
      setAwardedItem(response.awarded_item);

      // Only show completion message if there are no achievements to display
      if ((response.awarded_achievements || []).length === 0) {
        if (response.awarded_item) {
          setCompletionMessage("Quest completed!");
        } else {
          setCompletionMessage(
            "Quest completed! (You already own all items from this tier)"
          );
        }
      } else {
        // Show completion state without the notification message
        setCompletionMessage("completed");
      }

      // Begin preloading awarded item image while refreshing state
      if (response.awarded_item?.item) {
        const preUrl = getItemImage(
          response.awarded_item.item.name,
          response.awarded_item.item.image_url
        );
        if (preUrl) {
          const img = new Image();
          (img as any).decoding = "async";
          (img as any).loading = "eager";
          (img as any).fetchPriority = "high";
          img.src = preUrl;
        }
      }

      // Refresh user data, items, quests, and achievements
      await refreshUser();
      await refreshItems();
      await refreshQuests();
      await refetchUserAchievements();

      // After state refresh, close this modal and trigger celebrations
      const achievements = response.awarded_achievements || [];
      const hasSpecial = achievements.some(
        (a: any) => a.achievement_type === "questline" || a.achievement_type === "tier"
      );

      // Close modal first to avoid stacked UIs
      onClose();

      if (response.awarded_item) {
        // Item-first, then special if needed; always shows toast at bottom
        showItemThenMaybeSpecial(achievements, response.awarded_item, hasSpecial);
      } else if (achievements.length > 0) {
        if (hasSpecial) {
          showSpecial(achievements, null);
        } else {
          showStandard(achievements, null);
        }
      }
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
          <div className="flex-1 pr-4">
            <h2
              id="quest-modal-title"
              className="text-2xl font-bold text-white"
            >
              {userQuest?.quest?.title || "Quest Details"}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {userQuest?.quest?.description ||
                "Review quest progress and manage completion"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors flex-shrink-0"
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
          {/* Quest Details */}
          {!loading && !error && userQuest && selectedUser && (
            <QuestDetailsView
              userQuest={userQuest}
              userId={selectedUser.id}
              showStartedInfo={true}
            />
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
