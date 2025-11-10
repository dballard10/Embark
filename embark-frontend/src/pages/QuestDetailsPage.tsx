import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import QuestDetailsView from "../components/common/QuestDetailsView";
import LoadingIcon from "../components/common/LoadingIcon";
import { useUser } from "../contexts/UserContext";
import { useItems } from "../contexts/ItemsContext";
import { useQuestsContext } from "../contexts/QuestsContext";
import { useAchievements } from "../contexts/AchievementsContext";
import type { UserCompletedQuest } from "../types/quest.types";
import type { UserItem } from "../types/item.types";
import { completeQuest, type QuestCompletionResponse } from "../services/api";
import { IconArrowLeft, IconStar, IconSparkles } from "@tabler/icons-react";
import {
  getTierColor,
  getTierStars,
  getTierGradientColor,
} from "../utils/tierUtils";
import { getItemImage } from "../utils/itemImageUtils";
import { useCelebrationOverlay } from "../contexts/CelebrationOverlayContext";

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
  const { refetchUserAchievements } = useAchievements();
  const { showSpecial, showStandard, showItemThenMaybeSpecial } = useCelebrationOverlay();
  const [userQuest, setUserQuest] = useState<UserCompletedQuest | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completionMessage, setCompletionMessage] = useState<string | null>(
    null
  );
  const [awardedItem, setAwardedItem] = useState<UserItem | null>(null);
  const [awardedAchievements, setAwardedAchievements] = useState<any[]>([]);

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

      // Refresh user data to show updated glory, XP, items, quests, and achievements
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

      await refreshUser();
      await refreshItems();
      await refreshQuests();
      await refetchUserAchievements();

      // Decide celebration type and navigate away before showing
      const achievements = response.awarded_achievements || [];
      const hasSpecial = achievements.some(
        (a: any) => a.achievement_type === "questline" || a.achievement_type === "tier"
      );

      // Navigate away to close details page
      navigate("/quests");

      if (response.awarded_item) {
        showItemThenMaybeSpecial(achievements, response.awarded_item, hasSpecial);
      } else if (achievements.length > 0) {
        if (hasSpecial) {
          showSpecial(achievements, null);
        } else {
          showStandard(achievements, null);
        }
      }
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
      <div className="bg-gradient-to-r from-slate-800/95 to-slate-900/95 border-b-2 border-purple-500/30 sticky top-[64px] sm:top-[72px] z-10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <button
            onClick={() => navigate("/quests")}
            className="flex items-center gap-2 text-white hover:text-purple-400 active:text-purple-300 transition-colors duration-200 min-h-[44px]"
          >
            <IconArrowLeft size={20} className="sm:w-6 sm:h-6" stroke={2} />
            <span className="font-semibold text-sm sm:text-base">Back to Quests</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-3 sm:p-4 text-red-300 text-sm mb-4 sm:mb-6">
            {error}
          </div>
        )}

        {/* Completion Message with Item Card */}
        {completionMessage && (
          <div className="space-y-4 mb-6">
            {/* Awarded Achievements - moved to top */}
            {awardedAchievements.length > 0 && (
              <div className="animate-fade-in">
                <p className="text-center text-white text-lg font-semibold mb-3">
                  {awardedAchievements.length === 1
                    ? "Achievement Unlocked!"
                    : "Achievements Unlocked!"}
                </p>
                <div className="space-y-3">
                  {awardedAchievements.map((achievement, index) => {
                    const isSpecial =
                      achievement.tier === 6 ||
                      achievement.achievement_type === "questline";
                    const gradientClass = isSpecial
                      ? "from-red-600 to-pink-600"
                      : `${getTierColor(achievement.color_tier)}`;
                    return (
                      <div
                        key={index}
                        className={`bg-gradient-to-r ${gradientClass} border-2 border-white/30 rounded-xl p-4 animate-pulse-subtle`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0">
                            <IconSparkles
                              size={32}
                              className="text-yellow-400"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-xl text-white mb-1">
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-gray-200">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Only show quest completed notification if there are no achievements */}
            {completionMessage !== "completed" && (
              <div className="bg-green-900/30 border border-green-500 rounded-lg p-4 text-green-300 text-center">
                <div className="flex items-center justify-center gap-2 text-xl font-bold">
                  <IconSparkles size={24} className="text-yellow-400" />
                  {completionMessage}
                  <IconSparkles size={24} className="text-yellow-400" />
                </div>
              </div>
            )}

            {/* Awarded Item Card */}
            {awardedItem?.item && (
              <div className="animate-fade-in">
                <p className="text-center text-white text-base sm:text-lg font-semibold mb-3">
                  You received:
                </p>
                <div className="flex justify-center">
                  <div
                    className={`relative w-full max-w-[320px] sm:w-80 flex flex-col bg-gradient-to-br ${getTierGradientColor(
                      awardedItem.item.rarity_tier
                    )} border-2 rounded-xl overflow-hidden shadow-2xl animate-pulse-subtle`}
                  >
                    {/* Rarity Stars Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <div
                        className={`flex items-center gap-0.5 px-3 py-1.5 rounded-lg bg-gradient-to-r ${getTierColor(
                          awardedItem.item.rarity_tier
                        )} border border-white/30 text-sm font-bold text-white shadow-lg`}
                      >
                        {getTierStars(awardedItem.item.rarity_tier)}
                      </div>
                    </div>

                    {/* Item Image */}
                    <div className="h-48 bg-gradient-to-br from-slate-700/30 to-slate-800/30 flex items-center justify-center relative overflow-hidden">
                      {getItemImage(
                        awardedItem.item.name,
                        awardedItem.item.image_url
                      ) ? (
                        <img
                          src={
                            getItemImage(
                              awardedItem.item.name,
                              awardedItem.item.image_url
                            ) || ""
                          }
                          alt={awardedItem.item.name}
                          className="h-full w-full object-contain p-6"
                        />
                      ) : (
                        <IconStar size={80} className="text-white/20" />
                      )}
                    </div>

                    {/* Item Info */}
                    <div className="p-4 sm:p-5 flex flex-col">
                      <h3 className="font-bold text-xl sm:text-2xl text-white text-center mb-2">
                        {awardedItem.item.name}
                      </h3>
                      <p className="text-sm text-gray-300 text-center line-clamp-2">
                        {awardedItem.item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* (Achievements are now displayed at the top of this section) */}

            {/* Continue Button */}
            <div className="flex justify-center mt-4 sm:mt-6">
              <button
                onClick={() => navigate("/quests")}
                className="px-6 sm:px-8 py-3 min-h-[44px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 active:from-blue-700 active:to-blue-800 text-white rounded-lg font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
              >
                <span>Continue</span>
              </button>
            </div>
          </div>
        )}

        {!completionMessage && (
          <QuestDetailsView
            userQuest={userQuest}
            userId={selectedUser.id}
            showStartedInfo={true}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="quests" />
    </div>
  );
}

export default QuestDetailsPage;
