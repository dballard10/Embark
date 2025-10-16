import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import QuestDetailsView from "../components/common/QuestDetailsView";
import LoadingIcon from "../components/common/LoadingIcon";
import { useUser } from "../contexts/UserContext";
import { useItems } from "../contexts/ItemsContext";
import { useQuestsContext } from "../contexts/QuestsContext";
import type { UserCompletedQuest } from "../types/quest.types";
import { completeQuest, type QuestCompletionResponse } from "../services/api";
import { IconArrowLeft } from "@tabler/icons-react";

function QuestDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedUser, isLoading: userLoading, refreshUser } = useUser();
  const {
    itemCount: userItemCount,
    loading: itemsLoading,
    refreshItems,
  } = useItems();
  const {
    activeQuests,
    loading: questsLoading,
    refreshQuests,
  } = useQuestsContext();
  const [userQuest, setUserQuest] = useState<UserCompletedQuest | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completionMessage, setCompletionMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    loadQuestData();
  }, [id, activeQuests]);

  const loadQuestData = async () => {
    try {
      // Find the quest by ID from context
      const quest = activeQuests.find((q) => q.id === id);

      if (quest) {
        setUserQuest(quest);
      } else {
        setUserQuest(null);
      }
    } catch (error) {
      console.error("Error loading quest data:", error);
    }
  };

  if (userLoading || questsLoading) {
    return (
      <div className="game-container flex items-center justify-center min-h-screen">
        <LoadingIcon size="large" />
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className="game-container flex items-center justify-center min-h-screen">
        <div className="text-gray-400 text-lg">No user selected</div>
      </div>
    );
  }

  if (!userQuest?.quest) {
    return (
      <div className="game-container flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Quest not found</div>
      </div>
    );
  }

  const handleComplete = async () => {
    console.log("Complete button clicked");

    if (!selectedUser || !userQuest) {
      console.error("Missing selectedUser or userQuest", {
        selectedUser,
        userQuest,
      });
      setError("Unable to complete quest: Missing user or quest data");
      return;
    }

    try {
      setIsCompleting(true);
      setError(null);

      console.log("Completing quest:", {
        userId: selectedUser.id,
        userQuestId: userQuest.id,
      });

      // Complete the quest
      const response: QuestCompletionResponse = await completeQuest(
        selectedUser.id,
        userQuest.id
      );

      console.log("Quest completed successfully");

      // Set completion message based on whether item was awarded
      if (response.awarded_item) {
        setCompletionMessage(
          `Quest completed! You received: ${response.awarded_item.item.name}`
        );
      } else {
        setCompletionMessage(
          "Quest completed! (You already own all items from this tier)"
        );
      }

      // Refresh user data to show updated glory, XP, items, and quests
      await refreshUser();
      await refreshItems();
      await refreshQuests();

      // Navigate back to quests page after brief delay
      setTimeout(() => {
        navigate("/quests");
      }, 2000);
    } catch (err) {
      console.error("Error completing quest:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to complete quest";
      setError(errorMessage);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleAbandon = () => {
    console.log("Abandon quest:", userQuest?.id);
    // TODO: Make API call to abandon quest
  };

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

      {/* Back button header */}
      <div className="bg-gradient-to-r from-slate-800/95 to-slate-900/95 border-b-2 border-purple-500/30 sticky top-[72px] z-10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <button
            onClick={() => navigate("/quests")}
            className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors duration-200"
          >
            <IconArrowLeft size={24} stroke={2} />
            <span className="font-semibold">Back to Quests</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-red-300 text-sm mb-6">
            {error}
          </div>
        )}

        {/* Completion Message */}
        {completionMessage && (
          <div className="bg-green-900/30 border border-green-500 rounded-lg p-4 text-green-300 text-center mb-6">
            {completionMessage}
          </div>
        )}

        <QuestDetailsView userQuest={userQuest} showStartedInfo={true} />
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="quests" />
    </div>
  );
}

export default QuestDetailsPage;
