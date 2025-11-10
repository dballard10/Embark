import { useState } from "react";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import AchievementCard from "../components/common/AchievementCard";
import LoadingIcon from "../components/common/LoadingIcon";
import { useUser } from "../contexts/UserContext";
import { useItems } from "../contexts/ItemsContext";
import { useAchievements } from "../contexts/AchievementsContext";
import { IconTrophy } from "@tabler/icons-react";

function AchievementsPage() {
  const { selectedUser, isLoading: userLoading } = useUser();
  const { itemCount: userItemCount, loading: itemsLoading } = useItems();
  const {
    allAchievements,
    userAchievements,
    activeTitle,
    updateActiveTitle,
    isLoading,
  } = useAchievements();

  const [tierFilter, setTierFilter] = useState<number | "all">("all");
  const [isUpdating, setIsUpdating] = useState(false);

  if (userLoading || !selectedUser) {
    return (
      <div className="game-container flex items-center justify-center min-h-screen">
        <LoadingIcon size="large" />
      </div>
    );
  }

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

  // Apply filters
  const filterAchievement = (achievement: any) => {
    if (tierFilter !== "all" && achievement.tier !== tierFilter) {
      return false;
    }
    return true;
  };

  // Separate achievements into categories
  const defaultAchievement = allAchievements.find(
    (a) => a.achievement_type === "default"
  );
  const tierAchievements = allAchievements
    .filter((a) => a.achievement_type === "tier")
    .filter(filterAchievement);
  const questlineAchievements = allAchievements
    .filter((a) => a.achievement_type === "questline")
    .filter(filterAchievement);
  const questAchievements = allAchievements
    .filter((a) => a.achievement_type === "quest")
    .filter(filterAchievement);

  // Group quest achievements by tier
  const questAchievementsByTier: { [key: number]: any[] } = {};
  for (let tier = 1; tier <= 6; tier++) {
    questAchievementsByTier[tier] = questAchievements.filter(
      (a) => a.tier === tier
    );
  }

  // Count unlocked achievements
  const unlockedCount = userAchievements.length;
  const totalCount = allAchievements.length;

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

      {/* Achievements Header */}
      <div className="bg-gradient-to-r from-yellow-900/90 via-amber-900/90 to-yellow-900/90 border-b-2 border-yellow-600 fixed top-[64px] sm:top-[72px] md:top-[80px] left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Title */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-yellow-600 to-amber-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <IconTrophy size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" stroke={2} />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-100">
                  Achievements
                </h1>
                <p className="text-xs sm:text-sm text-yellow-300/80">
                  {unlockedCount} / {totalCount} Unlocked
                </p>
              </div>
            </div>

            {/* Tier Filter */}
            <div className="flex justify-center sm:justify-start">
              <div className="flex flex-wrap gap-1 items-center bg-yellow-950/50 backdrop-blur-sm rounded-lg p-1 border border-yellow-700/30 w-full sm:w-auto">
                <button
                  onClick={() => setTierFilter("all")}
                  className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded font-medium text-xs sm:text-sm transition-all active:scale-95 ${
                    tierFilter === "all"
                      ? "bg-yellow-600 text-white shadow-md"
                      : "text-yellow-300 hover:text-yellow-100 hover:bg-yellow-800/30 active:bg-yellow-800/50"
                  }`}
                >
                  All Tiers
                </button>
                {[1, 2, 3, 4, 5, 6].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setTierFilter(tier)}
                    className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded font-medium text-xs sm:text-sm transition-all active:scale-95 ${
                      tierFilter === tier
                        ? "bg-yellow-600 text-white shadow-md"
                        : "text-yellow-300 hover:text-yellow-100 hover:bg-yellow-800/30 active:bg-yellow-800/50"
                    }`}
                  >
                    T{tier}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-[140px] sm:pt-[150px] md:pt-[132px] pb-20 sm:pb-24 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingIcon size="large" />
            </div>
          ) : (
            <div className="space-y-8">
              {/* Updating Indicator */}
              {isUpdating && (
                <div className="bg-blue-600/20 border border-blue-400 rounded-lg p-4 text-center">
                  <p className="text-blue-300 font-semibold">
                    Updating title...
                  </p>
                </div>
              )}

              {/* Default Achievement */}
              {defaultAchievement && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                    <span className="text-gray-400">Starter Title</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              {tierAchievements.length > 0 && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex flex-wrap items-center gap-2">
                    <span className="text-blue-400">Tier Achievements</span>
                    <span className="text-sm text-gray-400 font-normal">
                      (Complete all quests of a tier to unlock)
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tierAchievements.map((achievement) => (
                      <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        userAchievement={userAchievementsMap.get(
                          achievement.id
                        )}
                        isActive={activeTitle?.id === achievement.id}
                        onClick={() => handleSelectTitle(achievement.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quest Line Achievements */}
              {questlineAchievements.length > 0 && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex flex-wrap items-center gap-2">
                    <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                      Quest Line Achievements
                    </span>
                    <span className="text-sm text-gray-400 font-normal">
                      (Complete all quests in a topic to unlock)
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {questlineAchievements.map((achievement) => (
                      <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        userAchievement={userAchievementsMap.get(
                          achievement.id
                        )}
                        isActive={activeTitle?.id === achievement.id}
                        onClick={() => handleSelectTitle(achievement.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quest Achievements - Grouped by Tier */}
              {questAchievements.length > 0 && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex flex-wrap items-center gap-2">
                    <span className="text-purple-400">Quest Achievements</span>
                    <span className="text-sm text-gray-400 font-normal">
                      (Complete individual quests to unlock)
                    </span>
                  </h3>

                  {[6, 5, 4, 3, 2, 1].map((tier) => {
                    const tierQuests = questAchievementsByTier[tier];
                    if (!tierQuests || tierQuests.length === 0) return null;

                    return (
                      <div key={tier} className="mb-4 sm:mb-6">
                        <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 flex flex-wrap items-center gap-2">
                          <span className="text-purple-300">
                            Tier {tier} Quests
                          </span>
                          <span className="text-sm text-gray-400 font-normal">
                            ({tierQuests.length} quests)
                          </span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                          {tierQuests.map((achievement) => (
                            <AchievementCard
                              key={achievement.id}
                              achievement={achievement}
                              userAchievement={userAchievementsMap.get(
                                achievement.id
                              )}
                              isActive={activeTitle?.id === achievement.id}
                              onClick={() => handleSelectTitle(achievement.id)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* No Results Message */}
              {tierAchievements.length === 0 &&
                questlineAchievements.length === 0 &&
                questAchievements.length === 0 &&
                !defaultAchievement && (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">
                      No achievements match your filters.
                    </p>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default AchievementsPage;
