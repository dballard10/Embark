import { useState, useEffect } from "react";
import {
  IconX,
  IconCalendar,
  IconTrophy,
  IconSparkles,
  IconTarget,
  IconSword,
  IconBox,
} from "@tabler/icons-react";
import {
  getTierColor,
  getTierName,
  getTierStars,
  getTierGradientColor,
} from "../../utils/tierUtils";
import type { UserCompletedQuest } from "../../types/quest.types";
import { getEnemyImage } from "../../utils/enemyImageUtils";
import { formatDateFriendly } from "../../utils/dateUtils";
import { useQuestsContext } from "../../contexts/QuestsContext";
import CompletedQuestDetailsModalSkeleton from "./CompletedQuestDetailsModalSkeleton";
import LoadingIcon from "./LoadingIcon";
import { getItemImage } from "../../utils/itemImageUtils";

interface CompletedQuestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedQuestId: string;
}

function CompletedQuestDetailsModal({
  isOpen,
  onClose,
  completedQuestId,
}: CompletedQuestDetailsModalProps) {
  const { completedQuests } = useQuestsContext();
  const [completedQuest, setCompletedQuest] =
    useState<UserCompletedQuest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enemyImageLoading, setEnemyImageLoading] = useState(true);

  useEffect(() => {
    if (isOpen && completedQuestId) {
      loadQuestData();
    }
  }, [isOpen, completedQuestId, completedQuests]);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const loadQuestData = async () => {
    try {
      setLoading(true);
      setError(null);
      setEnemyImageLoading(true);

      // Find the completed quest from context
      const foundQuest = completedQuests.find((q) => q.id === completedQuestId);

      if (foundQuest) {
        setCompletedQuest(foundQuest);
      } else {
        setError("Completed quest not found");
      }
    } catch (error) {
      console.error("Error loading completed quest:", error);
      setError("Failed to load quest details");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const baseColor = "#0a2847";
  const quest = completedQuest?.quest;
  const tier = quest?.tier;
  const tierName = tier ? getTierName(tier) : "";
  const tierColor = tier ? getTierColor(tier) : "";
  const tierBorderColor = "border-blue-500/50";
  const enemyImage = quest
    ? getEnemyImage(quest.enemy_name, quest.enemy_image_url)
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`rounded-2xl border-2 ${tierBorderColor} shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col relative animate-modal-scale`}
        style={{
          backgroundColor: baseColor,
          backgroundImage: `radial-gradient(ellipse at center, #0a2847 0%, #003d5c 100%)`,
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="completed-quest-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2
              id="completed-quest-modal-title"
              className="text-2xl font-bold text-white"
            >
              Defeated Enemy
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              View your victory and rewards
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <IconX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Loading State */}
          {loading && (
            <CompletedQuestDetailsModalSkeleton
              tierBorderColor={tierBorderColor}
            />
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-red-300 text-center">
              {error}
            </div>
          )}

          {/* Completed Quest Details */}
          {!loading && !error && completedQuest && quest && tier && (
            <div className="space-y-6">
              {/* Enemy Image and Info Section */}
              <div
                className={`bg-black/10 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl overflow-hidden shadow-2xl`}
              >
                {/* Enemy Image - Transparent Gallery View */}
                <div className="h-64 relative bg-transparent">
                  {enemyImage ? (
                    <div className="w-full h-full flex items-center justify-center p-8 backdrop-blur-md relative">
                      {enemyImageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <LoadingIcon size="large" />
                        </div>
                      )}
                      <img
                        src={enemyImage}
                        alt={quest.enemy_name}
                        className="max-h-full max-w-full object-contain"
                        onLoad={() => setEnemyImageLoading(false)}
                        style={{ opacity: enemyImageLoading ? 0 : 1 }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black/10 backdrop-blur-md">
                      <IconSword size={120} className="text-red-400" />
                    </div>
                  )}

                  {/* Tier Badge */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r ${tierColor} border border-white/30 text-sm font-bold text-white shadow-lg`}
                    >
                      {getTierStars(tier)}
                      <span className="ml-1">{tierName}</span>
                    </div>
                  </div>

                  {/* Topic Badge */}
                  <div className="absolute top-4 left-4">
                    <div
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r ${tierColor} border border-white/30 text-sm font-bold text-white shadow-lg`}
                    >
                      {quest.topic}
                    </div>
                  </div>
                </div>

                {/* Enemy Name, Type, and Description */}
                <div className="p-6 space-y-4 bg-black/20">
                  <h1 className="text-3xl font-bold text-white">
                    {quest.enemy_name}
                  </h1>
                  <p className="text-lg text-red-300 font-semibold">
                    {quest.enemy_type}
                  </p>
                  <p className="text-gray-100 text-base leading-relaxed">
                    {quest.enemy_description}
                  </p>
                </div>
              </div>

              {/* Quest Information Section */}
              <div
                className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-6`}
              >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <IconTarget size={24} className="text-blue-400" stroke={2} />
                  Quest Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-400 font-semibold mb-1">
                      Quest Title
                    </div>
                    <div className="text-lg font-bold text-white">
                      {quest.title}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-semibold mb-1">
                      Description
                    </div>
                    <div className="text-gray-200 leading-relaxed">
                      {quest.description}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rewards and Completion Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Completion Date */}
                <div
                  className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-5`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-xl shadow-inner">
                      <IconCalendar
                        size={28}
                        className="text-green-400"
                        stroke={2}
                      />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 font-semibold">
                        Completed On
                      </div>
                      <div className="text-xl font-bold text-white">
                        {completedQuest.completed_at
                          ? new Date(
                              completedQuest.completed_at
                            ).toLocaleDateString("en-US")
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glory Reward */}
                <div
                  className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-5`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 rounded-xl shadow-inner">
                      <IconTrophy
                        size={28}
                        className="text-yellow-400"
                        stroke={2}
                      />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 font-semibold">
                        Glory Earned
                      </div>
                      <div className="text-xl font-bold text-yellow-300">
                        {quest.glory_reward.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* XP Reward */}
                <div
                  className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-5`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-cyan-900/50 to-cyan-800/50 rounded-xl shadow-inner">
                      <IconSparkles
                        size={28}
                        className="text-cyan-400"
                        stroke={2}
                      />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 font-semibold">
                        XP Earned
                      </div>
                      <div className="text-xl font-bold text-cyan-300">
                        {quest.xp_reward.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item Reward - Placeholder for now */}
                <div
                  className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-5`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 bg-gradient-to-br ${getTierGradientColor(
                        tier
                      )} rounded-xl shadow-inner`}
                    >
                      <IconBox size={28} stroke={2} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 font-semibold">
                        Item Reward
                      </div>
                      <div className="text-lg font-bold">Tier {tier} Item</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info Section */}
              <div
                className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-6`}
              >
                <h2 className="text-xl font-bold text-white mb-4">
                  Quest Details
                </h2>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-gray-400">Quest ID</span>
                    <span className="font-mono text-sm">{quest.id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-gray-400">Started</span>
                    <span>
                      {new Date(completedQuest.started_at).toLocaleDateString(
                        "en-US"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-gray-400">Time Limit</span>
                    <span>
                      {quest.time_limit_hours < 24
                        ? `${quest.time_limit_hours} hours`
                        : `${quest.time_limit_hours / 24} days`}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Status</span>
                    <span className="text-green-400 font-semibold">
                      Victorious!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompletedQuestDetailsModal;
