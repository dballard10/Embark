import { IconLock, IconCheck } from "@tabler/icons-react";
import { getTierColor } from "../../utils/tierUtils";
import type {
  Achievement,
  UserAchievement,
} from "../../types/achievement.types";
import type { QuestTier } from "../../types/quest.types";

interface AchievementCardProps {
  achievement: Achievement;
  userAchievement?: UserAchievement;
  isActive?: boolean;
  onClick?: () => void;
}

function AchievementCard({
  achievement,
  userAchievement,
  isActive = false,
  onClick,
}: AchievementCardProps) {
  const isUnlocked = !!userAchievement;

  // Tier 6 and questline achievements get special styling
  const isSpecial =
    achievement.tier === 6 || achievement.achievement_type === "questline";

  // Special achievements get tier 6 conqueror color
  const gradientClass = isSpecial
    ? "from-red-600 to-pink-600"
    : `${getTierColor(achievement.color_tier as QuestTier)}`;

  const borderClass = isActive
    ? "border-cyan-400 border-2 shadow-[0_0_20px_rgba(34,211,238,0.6)]"
    : isUnlocked
    ? "border-white/30"
    : "border-gray-700";

  return (
    <button
      onClick={isUnlocked ? onClick : undefined}
      disabled={!isUnlocked}
      className={`relative p-4 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border ${borderClass} transition-all duration-200 ${
        isUnlocked
          ? "hover:scale-105 cursor-pointer"
          : "opacity-50 cursor-not-allowed"
      } text-left w-full`}
    >
      {/* Active indicator */}
      {isActive && (
        <div className="absolute top-2 right-2">
          <IconCheck size={20} className="text-cyan-400" />
        </div>
      )}

      {/* Lock indicator for locked achievements */}
      {!isUnlocked && (
        <div className="absolute top-2 right-2">
          <IconLock size={20} className="text-gray-500" />
        </div>
      )}

      {/* Title */}
      <div
        className={`inline-block text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r ${gradientClass} text-white mb-2 shadow-lg ${
          isSpecial ? "relative overflow-hidden" : ""
        }`}
      >
        {isSpecial && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        )}
        <span className="relative z-10">{achievement.title}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 mb-2">{achievement.description}</p>

      {/* Achievement type badge */}
      <div className="flex items-center gap-2 mt-2">
        {achievement.achievement_type === "tier" && (
          <span className="text-xs text-gray-400 bg-slate-700/50 px-2 py-0.5 rounded">
            Tier {achievement.tier}
          </span>
        )}
        {achievement.achievement_type === "questline" && (
          <span className="text-xs text-yellow-400 bg-yellow-900/30 px-2 py-0.5 rounded">
            Quest Line: {achievement.topic}
          </span>
        )}
        {achievement.achievement_type === "quest" && (
          <span className="text-xs text-blue-400 bg-blue-900/30 px-2 py-0.5 rounded">
            Quest: {achievement.topic} (T{achievement.tier})
          </span>
        )}
        {achievement.achievement_type === "default" && (
          <span className="text-xs text-gray-400 bg-slate-700/50 px-2 py-0.5 rounded">
            Default
          </span>
        )}
      </div>

      {/* Unlocked date */}
      {userAchievement && (
        <div className="text-xs text-gray-500 mt-2">
          Unlocked: {new Date(userAchievement.unlocked_at).toLocaleDateString()}
        </div>
      )}
    </button>
  );
}

export default AchievementCard;
