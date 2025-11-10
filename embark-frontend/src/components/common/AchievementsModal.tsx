import { useState } from "react";
import { IconX, IconTrophy } from "@tabler/icons-react";
import { useAchievements } from "../../contexts/AchievementsContext";
import AchievementCard from "./AchievementCard";
import LoadingIcon from "./LoadingIcon";

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AchievementsModal({ isOpen, onClose }: AchievementsModalProps) {
  const {
    allAchievements,
    userAchievements,
    activeTitle,
    updateActiveTitle,
    isLoading,
  } = useAchievements();

  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen) return null;

  const handleSelectTitle = async (achievementId: string) => {
    try {
      setIsUpdating(true);
      // If clicking the already active title, deselect it
      if (activeTitle?.id === achievementId) {
        await updateActiveTitle(null);
      } else {
        await updateActiveTitle(achievementId);
      }
    } catch (error) {
      console.error("Failed to update title:", error);
      alert("Failed to update title. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Create a map of user achievements for quick lookup
  const userAchievementsMap = new Map(
    userAchievements.map((ua) => [ua.achievement_id, ua])
  );

  // Separate achievements into categories
  const defaultAchievement = allAchievements.find(
    (a) => a.achievement_type === "default"
  );
  const tierAchievements = allAchievements.filter(
    (a) => a.achievement_type === "tier"
  );
  const questlineAchievements = allAchievements.filter(
    (a) => a.achievement_type === "questline"
  );

  // Count unlocked achievements
  const unlockedCount = userAchievements.length;
  const totalCount = allAchievements.length;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-white/20 shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <IconTrophy size={32} className="text-yellow-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Achievements</h2>
              <p className="text-sm text-gray-400">
                {unlockedCount} / {totalCount} Unlocked
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <IconX size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingIcon size="large" />
            </div>
          ) : (
            <div className="space-y-8">
              {/* Default Achievement */}
              {defaultAchievement && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-gray-400">Starter Title</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <AchievementCard
                      achievement={defaultAchievement}
                      userAchievement={userAchievementsMap.get(
                        defaultAchievement.id
                      )}
                      isActive={activeTitle?.id === defaultAchievement.id}
                      onClick={() => handleSelectTitle(defaultAchievement.id)}
                    />
                  </div>
                </div>
              )}

              {/* Tier Achievements */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-400">Tier Achievements</span>
                  <span className="text-sm text-gray-400 font-normal">
                    (Complete all quests of a tier to unlock)
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {tierAchievements.map((achievement) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                      userAchievement={userAchievementsMap.get(achievement.id)}
                      isActive={activeTitle?.id === achievement.id}
                      onClick={() => handleSelectTitle(achievement.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Quest Line Achievements */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    ✨ Quest Line Achievements
                  </span>
                  <span className="text-sm text-gray-400 font-normal">
                    (Complete all quests in a topic to unlock)
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {questlineAchievements.map((achievement) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                      userAchievement={userAchievementsMap.get(achievement.id)}
                      isActive={activeTitle?.id === achievement.id}
                      onClick={() => handleSelectTitle(achievement.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-900/50">
          <p className="text-sm text-gray-400 text-center">
            {isUpdating
              ? "Updating title..."
              : "Click on an unlocked achievement to set it as your active title"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AchievementsModal;
