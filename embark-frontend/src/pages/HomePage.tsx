import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import ActiveQuestsGrid from "../components/common/ActiveQuestsGrid";
import TopItemsGrid from "../components/common/TopItemsGrid";
import QuestSelectionModal from "../components/common/QuestSelectionModal";
import QuestDetailsModal from "../components/common/QuestDetailsModal";
import ItemDetailsModal from "../components/common/ItemDetailsModal";
import BottomNav from "../components/common/BottomNav";
import LoadingIcon from "../components/common/LoadingIcon";
import {
  IconTrophy,
  IconBox,
  IconStar,
  IconShield,
  IconSparkles,
} from "@tabler/icons-react";
import {
  calculateLevel,
  xpToNextLevel,
  getLevelProgress,
  getCurrentLevelXP,
} from "../utils/levelCalculator";
import { useUser } from "../contexts/UserContext";
import { useItems } from "../contexts/ItemsContext";
import { useQuestsContext } from "../contexts/QuestsContext";
import { useAchievements } from "../contexts/AchievementsContext";
import TitleBadge from "../components/common/TitleBadge";

function HomePage() {
  const { selectedUser, isLoading: userLoading } = useUser();
  const {
    itemCount: userItemCount,
    topItems,
    loading: itemsLoading,
  } = useItems();
  const {
    activeQuests,
    completedQuests,
    loading: questsLoading,
    refreshQuests,
  } = useQuestsContext();
  const { activeTitle } = useAchievements();
  const navigate = useNavigate();
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [isQuestDetailsModalOpen, setIsQuestDetailsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  const handleAddQuest = () => {
    setIsQuestModalOpen(true);
  };

  const handleQuestAdded = () => {
    // Reload quests after a quest is added
    refreshQuests();
  };

  if (userLoading || !selectedUser) {
    return (
      <div className="game-container flex items-center justify-center min-h-screen">
        <LoadingIcon size="large" />
      </div>
    );
  }

  // Calculate level info
  const currentLevel = calculateLevel(selectedUser.total_xp);
  const xpToNext = xpToNextLevel(selectedUser.total_xp);
  const levelProgressPercent = getLevelProgress(selectedUser.total_xp);
  const currentLevelXP = getCurrentLevelXP(selectedUser.total_xp);

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

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-900/90 via-teal-900/90 to-purple-900/90 border-b-2 border-purple-600 fixed top-[64px] sm:top-[72px] md:top-[80px] left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              {/* Avatar Container */}
              <div className="relative p-1.5 sm:p-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-2 sm:border-4 border-purple-500/60 shadow-2xl flex-shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 flex items-center justify-center shadow-inner">
                  <IconShield
                    size={28}
                    className="sm:w-8 sm:h-8 md:w-10 md:h-10 text-white drop-shadow-lg"
                    stroke={2.5}
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-100 truncate">
                  {selectedUser.username}
                </h1>
                {activeTitle && (
                  <div className="mt-1 hidden sm:block">
                    <TitleBadge
                      achievement={activeTitle}
                      size="md"
                      onClick={() => navigate("/achievements")}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-br from-purple-600/30 to-teal-600/30 border-2 border-purple-500/40 flex-shrink-0 w-full sm:w-auto justify-center sm:justify-start">
              <IconStar
                size={20}
                className="sm:w-7 sm:h-7 text-purple-300"
                fill="currentColor"
                stroke={2}
              />
              <div>
                <div className="text-xs text-purple-300/80 font-semibold">
                  Current Level
                </div>
                <div className="text-xl sm:text-2xl font-bold text-purple-100">
                  {currentLevel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 pt-[140px] sm:pt-[150px] md:pt-[160px]">
        {/* Profile Header - Enhanced Hero Section */}
        <div className="mb-10 animate-slide-up">
          <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-purple-500/40 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
            {/* Enhanced Background Pattern with Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-cyan-500/30 overflow-hidden z-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.2),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.15),transparent_50%)]"></div>
              {/* Animated Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-subtle"></div>
            </div>

            {/* Profile Info */}
            <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 pt-4 sm:pt-6 relative z-10">
              {/* Enhanced Stats Grid - 3 columns on larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {/* Total Glory */}
                <div
                  className="group bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur rounded-xl p-4 sm:p-5 border border-yellow-500/30 hover:border-yellow-400/60 shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer min-h-[80px]"
                  onClick={() => navigate("/shop")}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 rounded-xl shadow-inner group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <IconTrophy
                        size={24}
                        className="sm:w-8 sm:h-8 text-yellow-400 drop-shadow-glow"
                        stroke={2.5}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                        Total Glory
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-yellow-300 drop-shadow truncate">
                        {selectedUser.total_glory.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Items */}
                <div
                  className="group bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur rounded-xl p-4 sm:p-5 border border-green-500/30 hover:border-green-400/60 shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer min-h-[80px]"
                  onClick={() => navigate("/vault")}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-xl shadow-inner group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <IconBox
                        size={24}
                        className="sm:w-8 sm:h-8 text-green-400 drop-shadow-glow"
                        stroke={2.5}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                        Total Items
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-green-300 drop-shadow">
                        {itemsLoading ? (
                          <LoadingIcon size="small" />
                        ) : (
                          userItemCount
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total XP */}
                <div className="group bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur rounded-xl p-4 sm:p-5 border border-cyan-500/30 hover:border-cyan-400/60 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] sm:col-span-2 lg:col-span-1 min-h-[80px]">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-cyan-900/50 to-cyan-800/50 rounded-xl shadow-inner group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <IconSparkles
                        size={24}
                        className="sm:w-8 sm:h-8 text-cyan-400 drop-shadow-glow"
                        stroke={2.5}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                        Total XP
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-cyan-300 drop-shadow truncate">
                        {selectedUser.total_xp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Level Progress Section */}
              <div className="bg-slate-900/50 backdrop-blur rounded-xl p-4 sm:p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <IconSparkles
                      size={18}
                      className="sm:w-5 sm:h-5 text-cyan-400 animate-pulse-subtle"
                      stroke={2.5}
                    />
                    <span>Level Progress</span>
                  </h3>
                  <div className="px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg">
                    <span className="text-xs sm:text-sm font-bold text-blue-300">
                      {Math.round(levelProgressPercent)}%
                    </span>
                  </div>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-sm font-semibold text-gray-300">
                      Level {currentLevel}
                    </span>
                    <span className="text-sm font-semibold text-gray-300">
                      Level {currentLevel + 1}
                    </span>
                  </div>
                  <div className="relative w-full h-8 bg-slate-800/80 rounded-full overflow-hidden border-2 border-slate-700/50 shadow-inner">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                    {/* Progress Fill with Animation */}
                    <div
                      className="relative h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 transition-all duration-700 ease-out flex items-center justify-end px-3 shadow-lg"
                      style={{ width: `${levelProgressPercent}%` }}
                    >
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-subtle"></div>
                      {levelProgressPercent > 15 && (
                        <span className="relative text-sm font-black text-white drop-shadow-lg z-10">
                          {Math.round(levelProgressPercent)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* XP Details - Enhanced */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-lg p-3 sm:p-4 border border-slate-700/50">
                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1.5">
                      Current Level XP
                    </div>
                    <div className="text-lg sm:text-xl font-black text-white">
                      {currentLevelXP.toLocaleString()}
                      <span className="text-xs sm:text-sm text-gray-400 font-semibold">
                        {" "}
                        / 10,000
                      </span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-lg p-3 sm:p-4 border border-slate-700/50">
                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1.5">
                      XP to Next Level
                    </div>
                    <div className="text-lg sm:text-xl font-black text-white">
                      {xpToNext.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Quests Section with Animation */}
        <div
          className="mb-10 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <ActiveQuestsGrid
            activeQuests={activeQuests}
            loading={questsLoading}
            onAddQuest={handleAddQuest}
            onQuestClick={(questId) => {
              setSelectedQuestId(questId);
              setIsQuestDetailsModalOpen(true);
            }}
            onViewAll={() => navigate("/quests")}
          />
        </div>

        {/* Top Items Section with Animation */}
        <div
          className="mb-[-24px] animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <TopItemsGrid
            topItems={topItems}
            loading={itemsLoading}
            onViewAll={() => navigate("/vault")}
            onItemClick={(userItemId) => {
              setSelectedItemId(userItemId);
              setIsItemModalOpen(true);
            }}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="home" />

      {/* Quest Selection Modal */}
      <QuestSelectionModal
        isOpen={isQuestModalOpen}
        onClose={() => setIsQuestModalOpen(false)}
        onQuestSelected={handleQuestAdded}
        userId={selectedUser.id}
        activeQuests={activeQuests}
        completedQuests={completedQuests}
      />

      {/* Quest Details Modal */}
      {selectedQuestId && (
        <QuestDetailsModal
          isOpen={isQuestDetailsModalOpen}
          onClose={() => {
            setIsQuestDetailsModalOpen(false);
            setSelectedQuestId(null);
            // Reload quests after completing quest
            refreshQuests();
          }}
          questId={selectedQuestId}
        />
      )}

      {/* Item Details Modal */}
      {selectedItemId && (
        <ItemDetailsModal
          isOpen={isItemModalOpen}
          onClose={() => {
            setIsItemModalOpen(false);
            setSelectedItemId(null);
          }}
          userItemId={selectedItemId}
        />
      )}
    </div>
  );
}

export default HomePage;
