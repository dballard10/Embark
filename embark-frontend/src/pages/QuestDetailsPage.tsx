import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTierStars, getTierName, getTierColor } from "../utils/tierUtils";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import { useUser } from "../contexts/UserContext";
import type { UserCompletedQuest } from "../types/quest.types";
import type { Item } from "../types/item.types";
import {
  fetchActiveQuests,
  fetchItemById,
  fetchUserItems,
  completeQuest,
} from "../services/api";
import {
  IconArrowLeft,
  IconTarget,
  IconTrophy,
  IconBolt,
  IconClock,
  IconStarFilled,
  IconAlertTriangle,
  IconCalendar,
  IconHourglass,
  IconStar,
} from "@tabler/icons-react";

function QuestDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedUser, isLoading: userLoading, refreshUser } = useUser();
  const [userItemCount, setUserItemCount] = useState(0);
  const [userQuest, setUserQuest] = useState<UserCompletedQuest | null>(null);
  const [rewardItem, setRewardItem] = useState<Item | null>(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);
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

  useEffect(() => {
    if (userQuest?.deadline_at) {
      const updateTimer = () => {
        const deadline = new Date(userQuest.deadline_at);
        const now = new Date();
        const diff = deadline.getTime() - now.getTime();

        if (diff <= 0) {
          setTimeRemaining("Expired");
          return;
        }

        const hours = diff / (1000 * 60 * 60);
        setIsExpiringSoon(hours < 2);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hrs = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (days > 0) {
          setTimeRemaining(`${days}d ${hrs}h ${minutes}m`);
        } else if (hrs > 0) {
          setTimeRemaining(`${hrs}h ${minutes}m ${seconds}s`);
        } else {
          setTimeRemaining(`${minutes}m ${seconds}s`);
        }
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);

      return () => clearInterval(interval);
    }
  }, [userQuest?.deadline_at]);

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

  const quest = userQuest.quest;
  const tier = quest.tier;
  const tierName = getTierName(tier);
  const tierColor = getTierColor(tier);

  const getChallengeRating = () => {
    if (tier <= 2) return { text: "Easy", color: "text-green-400" };
    if (tier <= 4) return { text: "Medium", color: "text-yellow-400" };
    return { text: "Hard", color: "text-red-400" };
  };

  const challengeRating = getChallengeRating();

  const getTimerColor = () => {
    const deadline = new Date(userQuest.deadline_at);
    const now = new Date();
    const hoursRemaining =
      (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursRemaining < 2) return "from-red-600 to-red-700";
    if (hoursRemaining < 6) return "from-yellow-600 to-orange-600";
    return "from-green-600 to-emerald-600";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

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
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Quest Icon and Title Section */}
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl overflow-hidden shadow-2xl">
          {/* Quest Icon */}
          <div className="flex items-center justify-center h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/20 relative">
            <IconTarget size={96} className="text-blue-400" stroke={1.5} />

            {/* Tier Badge */}
            <div className="absolute top-4 right-4">
              <div
                className={`flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r ${tierColor} border border-white/30 text-sm font-bold text-white shadow-lg`}
              >
                {getTierStars(tier)}
                <span className="ml-1">{tierName}</span>
              </div>
            </div>

            {/* Status Badge */}
            {isExpiringSoon && (
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-red-600/90 to-red-700/90 border border-red-400/50 text-sm font-bold text-white shadow-lg animate-pulse">
                  <IconAlertTriangle size={18} stroke={2.5} />
                  Expiring Soon!
                </div>
              </div>
            )}
          </div>

          {/* Title and Description */}
          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold text-white">{quest.title}</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              {quest.description}
            </p>
          </div>
        </div>

        {/* Timer Display */}
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconClock size={32} className="text-purple-400" stroke={2} />
              <div>
                <div className="text-sm text-gray-400 font-semibold">
                  Time Remaining
                </div>
                <div
                  className={`text-2xl font-bold bg-gradient-to-r ${getTimerColor()} bg-clip-text text-transparent`}
                >
                  {timeRemaining}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quest Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Challenge Rating */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <IconAlertTriangle
                size={28}
                className={challengeRating.color}
                stroke={2}
              />
              <div>
                <div className="text-sm text-gray-400 font-semibold">
                  Challenge Rating
                </div>
                <div className={`text-xl font-bold ${challengeRating.color}`}>
                  {challengeRating.text}
                </div>
              </div>
            </div>
          </div>

          {/* Started At */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <IconCalendar size={28} className="text-blue-400" stroke={2} />
              <div>
                <div className="text-sm text-gray-400 font-semibold">
                  Started At
                </div>
                <div className="text-xl font-bold text-white">
                  {formatDate(userQuest.started_at)}
                </div>
              </div>
            </div>
          </div>

          {/* Time Commitment */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-5 md:col-span-2">
            <div className="flex items-center gap-3">
              <IconHourglass size={28} className="text-purple-400" stroke={2} />
              <div>
                <div className="text-sm text-gray-400 font-semibold">
                  Time Commitment
                </div>
                <div className="text-xl font-bold text-white">
                  {quest.time_limit_hours} hours
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Rewards</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Glory Reward */}
            <div className="bg-yellow-900/20 border-2 border-yellow-600/40 rounded-lg p-6 text-center">
              <IconTrophy
                size={48}
                className="text-yellow-400 mx-auto mb-3"
                stroke={2}
              />
              <div className="text-sm text-gray-400 font-semibold mb-1">
                Glory
              </div>
              <div className="text-3xl font-bold text-yellow-300">
                {quest.glory_reward.toLocaleString()}
              </div>
            </div>

            {/* XP Reward */}
            <div className="bg-blue-900/20 border-2 border-blue-600/40 rounded-lg p-6 text-center">
              <IconBolt
                size={48}
                className="text-blue-400 mx-auto mb-3"
                stroke={2}
              />
              <div className="text-sm text-gray-400 font-semibold mb-1">
                Experience
              </div>
              <div className="text-3xl font-bold text-blue-300">
                {quest.xp_reward.toLocaleString()}
              </div>
            </div>

            {/* Item Reward */}
            <div className="bg-purple-900/20 border-2 border-purple-600/40 rounded-lg p-6">
              <IconStarFilled
                size={48}
                className="text-purple-400 mx-auto mb-3"
                stroke={2}
              />
              <div className="text-sm text-gray-400 font-semibold mb-2 text-center">
                Reward Item
              </div>
              {rewardItem ? (
                <div className="space-y-2">
                  <div className="text-lg font-bold text-purple-300 text-center">
                    {rewardItem.name}
                  </div>
                  <div className="flex justify-center gap-0.5 mb-2">
                    {Array.from({ length: rewardItem.rarity_stars }, (_, i) => (
                      <IconStar
                        key={i}
                        size={16}
                        className="text-yellow-400"
                        fill="currentColor"
                        stroke={1.5}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-400 text-center">
                    {rewardItem.description}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400">Loading...</div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pb-6">
          <button
            onClick={handleAbandon}
            disabled={isCompleting}
            className="py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Abandon Quest
          </button>
          <button
            onClick={handleComplete}
            disabled={isCompleting}
            className="py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isCompleting ? "Completing..." : "Complete Quest"}
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="quests" />
    </div>
  );
}

export default QuestDetailsPage;
