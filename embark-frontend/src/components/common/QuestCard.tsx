import { useState, useEffect } from "react";
import { getTierStars } from "../../utils/tierUtils";
import type { UserCompletedQuest } from "../../types/quest.types";
import {
  IconTarget,
  IconTrophy,
  IconBolt,
  IconClock,
  IconLock,
  IconGift,
  IconStarFilled,
} from "@tabler/icons-react";

interface QuestCardProps {
  userQuest?: UserCompletedQuest;
  variant?: "active" | "available" | "locked";
}

function QuestCard({ userQuest, variant = "active" }: QuestCardProps) {
  const [timeRemaining, setTimeRemaining] = useState("");

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

  if (variant === "locked" || !userQuest?.quest) {
    return (
      <div className="quest-card-locked">
        <div className="flex flex-col items-center justify-center h-full">
          <IconLock size={48} className="text-gray-500 mb-2" stroke={1.5} />
          <div className="text-sm text-gray-400 font-semibold">Locked</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`quest-card ${
        variant === "active" ? "quest-card-active" : ""
      }`}
    >
      {/* Tier Badge */}
      <div className="absolute top-2 right-2 z-10">
        <div className="flex items-center gap-0.5 px-2 py-1 rounded-lg bg-gradient-to-r from-purple-600/80 to-pink-600/80 border border-purple-400/50 text-xs font-bold text-white shadow-lg">
          {getTierStars(userQuest.quest.tier)}
        </div>
      </div>

      {/* Timer */}
      {variant === "active" && timeRemaining && (
        <div className="absolute top-2 left-2 z-10">
          <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-green-600/80 to-emerald-600/80 border border-green-400/50 text-sm font-bold text-white shadow-lg">
            <IconClock size={16} stroke={2.5} />
            {timeRemaining}
          </div>
        </div>
      )}

      {/* Quest Icon/Image */}
      <div className="flex items-center justify-center h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-t-xl">
        <IconTarget size={64} className="text-blue-400" stroke={1.5} />
      </div>

      {/* Quest Info */}
      <div className="p-4 space-y-3">
        <h3 className="font-bold text-lg text-white line-clamp-2 min-h-[3.5rem]">
          {userQuest.quest.title}
        </h3>

        {/* Rewards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-yellow-900/30 border border-yellow-600/40 rounded-lg p-2 text-center">
            <div className="flex items-center justify-center gap-1 font-bold text-yellow-300">
              <IconTrophy size={18} stroke={2} />
              {userQuest.quest.glory_reward.toLocaleString()}
            </div>
          </div>
          <div className="bg-blue-900/30 border border-blue-600/40 rounded-lg p-2 text-center">
            <div className="flex items-center justify-center gap-1 font-bold text-blue-300">
              <IconBolt size={18} stroke={2} />
              {userQuest.quest.xp_reward.toLocaleString()}
            </div>
          </div>
          <div className="bg-purple-900/30 border border-purple-600/40 rounded-lg p-2 text-center">
            <div className="flex items-center justify-center gap-1 font-bold text-purple-300">
              <IconStarFilled />
            </div>
          </div>
        </div>

        {/* Action Button */}
        {variant === "active" && (
          <button className="w-full py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
            Complete
          </button>
        )}

        {variant === "available" && (
          <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
            Start Quest
          </button>
        )}
      </div>
    </div>
  );
}

export default QuestCard;
