import { useState, useEffect } from "react";
import {
  getTierStars,
  getTierColor,
  getTierGradientColor,
  getTierTextColor,
} from "../../utils/tierUtils";
import { getEnemyImage } from "../../utils/enemyImageUtils";
import type { UserCompletedQuest } from "../../types/quest.types";
import type { Item } from "../../types/item.types";
import {
  IconTarget,
  IconClock,
  IconLock,
  IconGift,
  IconPlus,
  IconBox,
} from "@tabler/icons-react";

interface QuestCardProps {
  userQuest?: UserCompletedQuest;
  variant?: "active" | "available" | "locked" | "completed" | "add";
  rewardItem?: Item;
  onClick?: () => void;
}

function QuestCard({
  userQuest,
  variant = "active",
  rewardItem,
  onClick,
}: QuestCardProps) {
  const [timeRemaining, setTimeRemaining] = useState("");
  const [enemyImageLoading, setEnemyImageLoading] = useState(true);

  useEffect(() => {
    if (variant === "active" && userQuest?.deadline_at) {
      const updateTimer = () => {
        const deadline = new Date(userQuest.deadline_at);
        const now = new Date();
        const diff = deadline.getTime() - now.getTime();

        if (diff <= 0) {
          setTimeRemaining("Expired");
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (days > 0) {
          setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
        } else if (hours > 0) {
          setTimeRemaining(`${hours}h ${minutes}m`);
        } else {
          setTimeRemaining(`${minutes}m ${seconds}s`);
        }
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000); // Update every second

      return () => clearInterval(interval);
    }
  }, [userQuest?.deadline_at, variant]);

  if (variant === "locked") {
    return (
      <div className="quest-card-locked">
        <div className="flex flex-col items-center justify-center h-full">
          <IconLock size={48} className="text-gray-500 mb-2" stroke={1.5} />
          <div className="text-sm text-gray-400 font-semibold">Locked</div>
        </div>
      </div>
    );
  }

  if (variant === "add") {
    return (
      <div
        className="quest-card-locked border-2 border-dashed border-blue-500/50 hover:border-blue-400 hover:bg-blue-950/30 cursor-pointer transition-all duration-200 hover:scale-105"
        onClick={onClick}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-3 shadow-lg shadow-blue-500/20">
            <IconPlus size={32} className="text-blue-400" stroke={2.5} />
          </div>
          <div className="text-sm text-blue-300 font-semibold">Add Quest</div>
        </div>
      </div>
    );
  }

  if (!userQuest?.quest) {
    return (
      <div className="quest-card-locked">
        <div className="flex flex-col items-center justify-center h-full">
          <IconLock size={48} className="text-gray-500 mb-2" stroke={1.5} />
          <div className="text-sm text-gray-400 font-semibold">Locked</div>
        </div>
      </div>
    );
  }

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const questTier = userQuest.quest.tier;
  const tierGradient = getTierGradientColor(questTier);
  const tierBadgeColor = getTierColor(questTier);

  // Format time limit for non-active quests
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

  // Get enemy image
  const enemyImage = getEnemyImage(
    userQuest.quest.enemy_name,
    userQuest.quest.enemy_image_url
  );

  return (
    <div
      onClick={handleCardClick}
      className={`relative flex flex-col bg-gradient-to-br ${tierGradient} border-2 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${
        variant === "active" ? "quest-card-active" : ""
      } ${
        variant === "active" ||
        variant === "available" ||
        variant === "completed"
          ? "cursor-pointer hover:scale-105 hover:shadow-2xl"
          : ""
      }`}
    >
      {/* Tier Badge - Top Right */}
      <div className="absolute top-2 right-2 z-10">
        <div
          className={`flex items-center gap-0.5 px-2 py-1 rounded-lg bg-gradient-to-r ${tierBadgeColor} border border-white/30 text-xs font-bold text-white shadow-lg`}
        >
          {getTierStars(questTier)}
        </div>
      </div>

      {/* Time Limit Badge - Top Left (Only for non-active quests) */}
      {variant !== "active" && (
        <div className="absolute top-2 left-2 z-10">
          <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-slate-700/90 to-slate-800/90 border border-slate-500/50 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
            <IconClock size={14} stroke={2.5} />
            {formatTimeLimit(userQuest.quest.time_limit_hours)}
          </div>
        </div>
      )}

      {/* Active Quest Countdown Timer - Top Left (Only for active quests) */}
      {variant === "active" && timeRemaining && (
        <div className="absolute top-2 left-2 z-10">
          <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-green-600/80 to-emerald-600/80 border border-green-400/50 text-xs font-bold text-white shadow-lg">
            <IconClock size={14} stroke={2.5} />
            {timeRemaining}
          </div>
        </div>
      )}

      {/* Enemy Image */}
      <div className="relative flex items-center justify-center h-40 bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-t-xl overflow-hidden">
        {enemyImage ? (
          <>
            {enemyImageLoading && (
              <IconTarget
                size={80}
                className="text-white/40 animate-pulse"
                stroke={1.5}
              />
            )}
            <img
              src={enemyImage}
              alt={userQuest.quest.enemy_name}
              className="h-full w-full object-contain p-4"
              onLoad={() => setEnemyImageLoading(false)}
              style={{ opacity: enemyImageLoading ? 0 : 1 }}
            />
          </>
        ) : (
          <IconTarget size={80} className="text-white/40" stroke={1.5} />
        )}

        {/* Topic Badge - Bottom Left */}
        <div className="absolute bottom-2 left-2 z-10 max-w-[45%]">
          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r ${tierBadgeColor} border border-white/30 text-xs font-bold text-white shadow-lg`}
          >
            <span className="truncate">{userQuest.quest.topic}</span>
          </div>
        </div>

        {/* Enemy Name Badge - Bottom Right */}
        <div className="absolute bottom-2 right-2 z-10 max-w-[45%]">
          <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-red-700/90 to-red-800/90 border border-red-500/50 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
            <span className="truncate">{userQuest.quest.enemy_name}</span>
          </div>
        </div>
      </div>

      {/* Quest Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-white line-clamp-2 mb-2">
            {userQuest.quest.title}
          </h3>

          {/* Item Earned - Only show for completed quests */}
          {variant === "completed" && rewardItem && (
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/50 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
                  <IconGift
                    size={28}
                    className="text-purple-300"
                    stroke={1.5}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white line-clamp-1">
                    {rewardItem.name}
                  </div>
                  <div className="flex items-center gap-0.5 mt-1">
                    {getTierStars(rewardItem.rarity_tier)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rewards - Only show for active and available quests */}
        {variant !== "completed" && (
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 border-yellow-600/40 rounded-lg p-2 pt-3 text-center">
              <div className="text-lg font-bold text-yellow-300">
                {userQuest.quest.glory_reward.toLocaleString()}
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 border-blue-600/40 rounded-lg p-2 pt-3 text-center">
              <div className="text-lg font-bold text-blue-300">
                {userQuest.quest.xp_reward.toLocaleString()}
              </div>
            </div>
            <div
              className={`bg-gradient-to-r ${tierBadgeColor} border-2 border-white/30 rounded-lg p-2 text-center shadow-lg`}
              title={`Random Tier ${questTier} Item Reward`}
            >
              <IconBox
                size={36}
                className={`${getTierTextColor(questTier)} mx-auto`}
                stroke={2}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestCard;
