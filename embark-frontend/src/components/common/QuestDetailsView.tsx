import { useState, useEffect } from "react";
import {
  getTierStars,
  getTierName,
  getTierColor,
  getTierTextColor,
} from "../../utils/tierUtils";
import { getEnemyImage } from "../../utils/enemyImageUtils";
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
  IconSword,
  // IconHelp,
} from "@tabler/icons-react";
// import QuestHelperChatModal from "./QuestHelperChatModal";
import ImageViewer from "./ImageViewer";

interface QuestDetailsViewProps {
  userQuest: UserCompletedQuest;
  userId: string;
  showStartedInfo?: boolean;
}

function QuestDetailsView({
  userQuest,
  userId,
  showStartedInfo = true,
}: QuestDetailsViewProps) {
  const [timeRemaining, setTimeRemaining] = useState("");
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);
  const [enemyImageLoading, setEnemyImageLoading] = useState(true);
  // const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

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

  // Get enemy image
  const enemyImage = getEnemyImage(quest.enemy_name, quest.enemy_image_url);

  // Debug logging
  if (!enemyImage) {
    console.warn(
      `[QuestDetailsView] No image found for enemy: "${quest.enemy_name}"`,
      {
        questTitle: quest.title,
        enemyName: quest.enemy_name,
        databaseImageUrl: quest.enemy_image_url,
      }
    );
  }

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

  // Format time limit for display
  const formatTimeLimit = (hours: number): string => {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    if (days > 0 && remainingHours > 0) {
      return `${days}d ${remainingHours}h`;
    } else if (days > 0) {
      return days === 1 ? "1 day" : `${days} days`;
    } else {
      return `${hours}h`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Enemy Battle Section */}
      <div
        className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl overflow-hidden shadow-2xl`}
      >
        {/* Enemy Image with Badges */}
        <div className="relative h-96 bg-gradient-to-br from-slate-700/30 to-slate-800/30">
          {enemyImage ? (
            <>
              {enemyImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <IconTarget
                    size={80}
                    className="text-white/40 animate-pulse"
                    stroke={1.5}
                  />
                </div>
              )}
              <img
                src={enemyImage}
                alt={quest.enemy_name}
                className="h-full w-full object-contain p-4 cursor-pointer hover:scale-105 transition-transform duration-200"
                onLoad={() => setEnemyImageLoading(false)}
                onClick={() => setIsImageViewerOpen(true)}
                style={{ opacity: enemyImageLoading ? 0 : 1 }}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <IconTarget size={80} className="text-white/40" stroke={1.5} />
            </div>
          )}

          {/* Quest Topic Badge - Top Left */}
          <div className="absolute top-4 left-4 max-w-[45%]">
            <div
              className={`flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r ${tierColor} border border-white/30 text-sm font-bold text-white shadow-lg`}
            >
              <span className="truncate">{quest.topic}</span>
            </div>
          </div>

          {/* Tier Badge - Top Right */}
          <div className="absolute top-4 right-4">
            <div
              className={`flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r ${tierColor} border border-white/30 text-sm font-bold text-white shadow-lg`}
            >
              {getTierStars(tier)}
              <span className="ml-1">{tierName}</span>
            </div>
          </div>

          {/* Expiring Soon Status Badge - Below Topic */}
          {isExpiringSoon && showStartedInfo && (
            <div className="absolute top-16 left-4">
              <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-red-600/90 to-red-700/90 border border-red-400/50 text-sm font-bold text-white shadow-lg animate-pulse">
                <IconAlertTriangle size={18} stroke={2.5} />
                Expiring Soon!
              </div>
            </div>
          )}
        </div>

        {/* Enemy Encounter Header */}
        <div className="p-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 border-b border-red-500/30">
          <div className="flex items-center gap-2">
            <IconSword size={24} className="text-red-400" stroke={2} />
            <h2 className="text-xl font-bold text-white">Enemy Encounter</h2>
          </div>
        </div>

        {/* Enemy Details */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-red-400 mb-1">
              {quest.enemy_name}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold text-gray-300 bg-red-900/30 px-3 py-1 rounded-full border border-red-500/30">
                {quest.enemy_type}
              </span>
              <span
                className={`text-sm font-semibold ${challengeRating.color} bg-black/30 px-3 py-1 rounded-full border border-current/30`}
              >
                {challengeRating.text}
              </span>
            </div>
          </div>

          <p className="text-gray-100 text-lg leading-relaxed">
            {quest.enemy_description}
          </p>

          <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-lg p-4 mt-4">
            <p className="text-sm text-gray-300 italic">
              "Defeat this foe to complete your quest and claim victory!"
            </p>
          </div>
        </div>
      </div>

      {/* Timer Display - Only show if quest has started */}
      {showStartedInfo && userQuest.deadline_at && (
        <div
          className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-6`}
        >
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

        {/* Time Commitment
        <div
          className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-5`}
        >
          <div className="flex items-center gap-3">
            <IconHourglass size={28} className="" stroke={2} />
            <div>
              <div className="text-sm font-semibold">Time Commitment</div>
              <div className="text-xl font-bold text-white">
                {formatTimeLimit(quest.time_limit_hours)}
              </div>
            </div>
          </div>
        </div> */}

        {/* Quest Helper - Only show if quest has started */}
        {/* {showStartedInfo && (
          <button
            onClick={() => setIsChatModalOpen(true)}
            className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-5 hover:bg-purple-900/20 hover:border-purple-500/50 transition-all duration-200 cursor-pointer group`}
          >
            <div className="flex items-center gap-3">
              <IconHelp
                size={28}
                className="text-purple-400 group-hover:text-purple-300"
                stroke={2}
              />
              <div>
                <div className="text-sm font-semibold">Need Help?</div>
                <div className="text-xl font-bold text-white group-hover:text-purple-200">
                  Get Quest Guidance
                </div>
              </div>
            </div>
          </button>
        )} */}
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

      {/* Quest Helper Chat Modal */}
      {/* <QuestHelperChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        quest={quest}
        userId={userId}
        userQuestId={userQuest.id}
      /> */}

      {/* Image Viewer */}
      {enemyImage && (
        <ImageViewer
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
          imageUrl={enemyImage}
          altText={quest.enemy_name}
        />
      )}
    </div>
  );
}

export default QuestDetailsView;
