import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import QuestDetailsView from "../components/common/QuestDetailsView";
import { useUser } from "../contexts/UserContext";
import type { UserCompletedQuest } from "../types/quest.types";
import type { Item } from "../types/item.types";
import {
  fetchActiveQuests,
  fetchItemById,
  fetchUserItems,
  completeQuest,
} from "../services/api";
import { IconArrowLeft } from "@tabler/icons-react";

function QuestDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedUser, isLoading: userLoading, refreshUser } = useUser();
  const [userItemCount, setUserItemCount] = useState(0);
  const [userQuest, setUserQuest] = useState<UserCompletedQuest | null>(null);
  const [rewardItem, setRewardItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedUser?.id) {
      loadQuestData();
    }
  }, [id, selectedUser?.id]);

  const loadQuestData = async () => {
    if (!selectedUser?.id) return;

    try {
      setLoading(true);

      // Fetch active quests
      const activeQuests = await fetchActiveQuests(selectedUser.id);

      // Find the quest by ID
      const quest = activeQuests.find((q) => q.id === id);

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
      }

      // Fetch user items for count
      const items = await fetchUserItems(selectedUser.id);
      setUserItemCount(items.length);
    } catch (error) {
      console.error("Error loading quest data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading || loading) {
    return (
      <div className="game-container flex items-center justify-center min-h-screen">
        <div className="text-gray-400 text-lg">Loading...</div>
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
      await completeQuest(selectedUser.id, userQuest.id);

      console.log("Quest completed successfully");

      // Refresh user data to show updated glory, XP, and items
      await refreshUser();

      // Navigate back to quests page
      navigate("/quests");
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

      {/* Bottom Navigation */}
      <BottomNav currentPage="quests" />
    </div>
  );
}

export default QuestDetailsPage;
