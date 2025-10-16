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
import { IconArrowLeft } from "@tabler/icons-react";

function QuestDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedUser, isLoading: userLoading } = useUser();
  const { itemCount: userItemCount, loading: itemsLoading } = useItems();
  const { activeQuests, loading: questsLoading } = useQuestsContext();
  const [userQuest, setUserQuest] = useState<UserCompletedQuest | null>(null);

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
        <QuestDetailsView userQuest={userQuest} showStartedInfo={true} />
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="quests" />
    </div>
  );
}

export default QuestDetailsPage;
