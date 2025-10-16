import { useState, useEffect } from "react";
import {
  getTierStars,
  getTierName,
  getTierColor,
  getTierTextColor,
} from "../../utils/tierUtils";
import type { UserCompletedQuest } from "../../types/quest.types";
import {
  IconTarget,
  IconTrophy,
  IconBolt,
  IconClock,
  IconAlertTriangle,
  IconCalendar,
  IconHourglass,
  IconBox,
} from "@tabler/icons-react";

interface QuestDetailsViewProps {
  userQuest: UserCompletedQuest;
  showStartedInfo?: boolean;
}

function QuestDetailsView({
  userQuest,
  showStartedInfo = true,
}: QuestDetailsViewProps) {
  const [timeRemaining, setTimeRemaining] = useState("");
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);

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

  if (!userQuest?.quest) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Quest not found</div>
      </div>
    );
  }

  const quest = userQuest.quest;
  const tier = quest.tier;
  const tierName = getTierName(tier);
  const tierColor = getTierColor(tier);
  const tierBorderColor = "border-blue-500/50";

  const getChallengeRating = () => {
    if (tier <= 2) return { text: "Easy", color: "text-green-400" };
    if (tier <= 4) return { text: "Medium", color: "text-yellow-400" };
    return { text: "Hard", color: "text-red-400" };
  };

  const challengeRating = getChallengeRating();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Quest Icon and Title Section */}
      <div
        className={`bg-black/10 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl overflow-hidden shadow-2xl`}
      >
        {/* Quest Icon */}
        <div className="h-48 relative bg-transparent">
          <div className="w-full h-full flex items-center justify-center p-8 backdrop-blur-md">
            <IconTarget size={96} className="text-blue-400" stroke={1.5} />
          </div>

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
          {isExpiringSoon && showStartedInfo && (
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-red-600/90 to-red-700/90 border border-red-400/50 text-sm font-bold text-white shadow-lg animate-pulse">
                <IconAlertTriangle size={18} stroke={2.5} />
                Expiring Soon!
              </div>
            </div>
          )}
        </div>

        {/* Title and Description */}
        <div className="p-6 space-y-4 bg-black/20">
          <h1 className="text-3xl font-bold text-white">{quest.title}</h1>
          <p className="text-gray-100 text-lg leading-relaxed">
            {quest.description}
          </p>
        </div>
      </div>
      {/* Timer Display - Only show if quest has started */}
      {showStartedInfo && userQuest.deadline_at && (
        <div
          className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-6`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconClock size={32} className="" stroke={2} />
              <div>
                <div className="text-sm font-semibold">Time Remaining</div>
                <div className="text-2xl font-bold text-white">
                  {timeRemaining}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Quest Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Challenge Rating */}
        <div
          className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-5`}
        >
          <div className="flex items-center gap-3">
            <IconAlertTriangle
              size={28}
              className={challengeRating.color}
              stroke={2}
            />
            <div>
              <div className="text-sm font-semibold">Challenge Rating</div>
              <div className={`text-xl font-bold ${challengeRating.color}`}>
                {challengeRating.text}
              </div>
            </div>
          </div>
        </div>

        {/* Started At - Only show if quest has started */}
        {showStartedInfo && userQuest.started_at && (
          <div
            className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-5`}
          >
            <div className="flex items-center gap-3">
              <IconCalendar size={28} className="" stroke={2} />
              <div>
                <div className="text-sm font-semibold">Started At</div>
                <div className="text-xl font-bold text-white">
                  {formatDate(userQuest.started_at)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Time Commitment */}
        <div
          className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-5 ${
            !showStartedInfo ? "md:col-span-2" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <IconHourglass size={28} className="" stroke={2} />
            <div>
              <div className="text-sm font-semibold">Time Commitment</div>
              <div className="text-xl font-bold text-white">
                {quest.time_limit_hours} hours
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Rewards Section */}
      <div
        className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-6`}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Rewards</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Glory Reward */}
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 border-2 border-yellow-600/40 rounded-lg p-6 text-center">
            <IconTrophy
              size={48}
              className="text-yellow-400 mx-auto mb-3"
              stroke={2}
            />
            <div className="text-3xl font-bold text-yellow-300">
              {quest.glory_reward.toLocaleString()}
            </div>
          </div>

          {/* XP Reward */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 border-2 border-blue-600/40 rounded-lg p-6 text-center">
            <IconBolt
              size={48}
              className="text-blue-400 mx-auto mb-3"
              stroke={2}
            />
            <div className="text-3xl font-bold text-blue-300">
              {quest.xp_reward.toLocaleString()}
            </div>
          </div>

          {/* Item Reward */}
          <div
            className={`bg-gradient-to-r ${tierColor} border-2 ${tierBorderColor} rounded-lg p-6 relative`}
          >
            <div className="space-y-2">
              <div>
                <IconBox
                  size={48}
                  className={`${getTierTextColor(tier)} mx-auto mb-3`}
                  stroke={2}
                />
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-white/90">
                  Random {tierName} Item
                </div>
                <div className="flex justify-center gap-0.5 mt-2">
                  {getTierStars(tier)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestDetailsView;
