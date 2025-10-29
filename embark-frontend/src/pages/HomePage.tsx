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
  IconCalendar,
  IconTarget,
  IconStar,
  IconShield,
  IconSparkles,
  IconFlame,
} from "@tabler/icons-react";
import { formatDateFriendly } from "../utils/dateUtils";
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
    completedQuestCount,
    loading: questsLoading,
    refreshQuests,
  } = useQuestsContext();
  const { activeTitle, userAchievements } = useAchievements();
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

  // Calculate days active
  const createdDate = new Date(selectedUser.created_at);
  const now = new Date();
  const daysActive = Math.floor(
    (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
  );

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
      <div className="bg-gradient-to-r from-purple-900/90 via-teal-900/90 to-purple-900/90 border-b-2 border-purple-600 fixed top-[80px] left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar Container */}
              <div className="relative p-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-4 border-purple-500/60 shadow-2xl">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 flex items-center justify-center shadow-inner">
                  <IconShield
                    size={40}
                    className="text-white drop-shadow-lg"
                    stroke={2.5}
                  />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-purple-100">
                  {selectedUser.username}
                </h1>
                {activeTitle && (
                  <div className="mt-1 mb-2">
                    <TitleBadge
                      achievement={activeTitle}
                      size="md"
                      onClick={() => navigate("/achievements")}
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-teal-300/80">
                  <IconCalendar size={16} stroke={2} />
                  <span>
                    Member since {formatDateFriendly(selectedUser.created_at)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-purple-600/30 to-teal-600/30 border-2 border-purple-500/40">
              <IconStar
                size={28}
                className="text-purple-300"
                fill="currentColor"
                stroke={2}
              />
              <div>
                <div className="text-xs text-purple-300/80 font-semibold">
                  Current Level
                </div>
                <div className="text-2xl font-bold text-purple-100">
                  {currentLevel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-28 pt-[160px]">
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
            <div className="px-6 sm:px-8 pb-8 pt-6 relative z-10">
              {/* Enhanced Stats Grid - 3 columns on larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Total Glory */}
                <div
                  className="group bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur rounded-xl p-5 border border-yellow-500/30 hover:border-yellow-400/60 shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  onClick={() => navigate("/shop")}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 rounded-xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <IconTrophy
                        size={32}
                        className="text-yellow-400 drop-shadow-glow"
                        stroke={2.5}
                      />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                        Total Glory
                      </div>
                      <div className="text-2xl font-black text-yellow-300 drop-shadow">
                        {selectedUser.total_glory.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Items */}
                <div
                  className="group bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur rounded-xl p-5 border border-green-500/30 hover:border-green-400/60 shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  onClick={() => navigate("/vault")}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <IconBox
                        size={32}
                        className="text-green-400 drop-shadow-glow"
                        stroke={2.5}
                      />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                        Total Items
                      </div>
                      <div className="text-2xl font-black text-green-300 drop-shadow">
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
                <div className="group bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur rounded-xl p-5 border border-cyan-500/30 hover:border-cyan-400/60 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02] sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-900/50 to-cyan-800/50 rounded-xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <IconSparkles
                        size={32}
                        className="text-cyan-400 drop-shadow-glow"
                        stroke={2.5}
                      />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                        Total XP
                      </div>
                      <div className="text-2xl font-black text-cyan-300 drop-shadow">
                        {selectedUser.total_xp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Level Progress Section */}
              <div className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <IconSparkles
                      size={20}
                      className="text-cyan-400 animate-pulse-subtle"
                      stroke={2.5}
                    />
                    <span>Level Progress</span>
                  </h3>
                  <div className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg">
                    <span className="text-sm font-bold text-blue-300">
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-lg p-4 border border-slate-700/50">
                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1.5">
                      Current Level XP
                    </div>
                    <div className="text-xl font-black text-white">
                      {currentLevelXP.toLocaleString()}
                      <span className="text-sm text-gray-400 font-semibold">
                        {" "}
                        / 10,000
                      </span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-lg p-4 border border-slate-700/50">
                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1.5">
                      XP to Next Level
                    </div>
                    <div className="text-xl font-black text-white">
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
          className="mb-10 animate-slide-up"
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

        {/* Enhanced Statistics Section */}
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-black text-white tracking-tight">
              Statistics
            </h2>
            <div className="h-1 flex-1 ml-6 bg-gradient-to-r from-purple-500/50 to-transparent rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Quests Completed */}
            <div
              className="group relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-green-500/30 rounded-2xl p-6 text-center hover:border-green-400/60 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
              onClick={() => navigate("/quests")}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative">
                <div className="inline-flex p-3 bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  <IconTarget
                    size={32}
                    className="text-green-400 drop-shadow-glow"
                    stroke={2.5}
                  />
                </div>
                <div className="text-3xl font-black text-white mb-2 drop-shadow">
                  {completedQuestCount}
                </div>
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                  Quests Done
                </div>
              </div>
            </div>

            {/* Active Quests */}
            <div
              className="group relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl p-6 text-center hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
              onClick={() => navigate("/quests")}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative">
                <div className="inline-flex p-3 bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  <IconFlame
                    size={32}
                    className="text-blue-400 drop-shadow-glow animate-pulse-subtle"
                    stroke={2.5}
                  />
                </div>
                <div className="text-3xl font-black text-white mb-2 drop-shadow">
                  {activeQuests.length}
                </div>
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                  Active Quests
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div
              onClick={() => navigate("/achievements")}
              className="group relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-amber-500/30 rounded-2xl p-6 text-center hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative">
                <div className="inline-flex p-3 bg-gradient-to-br from-amber-900/40 to-amber-800/40 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  <IconStar
                    size={32}
                    className="text-amber-400 drop-shadow-glow"
                    fill="currentColor"
                    stroke={2}
                  />
                </div>
                <div className="text-3xl font-black text-white mb-2 drop-shadow">
                  {userAchievements.length}
                </div>
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                  Achievements
                </div>
              </div>
            </div>

            {/* Days Active */}
            <div className="group relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-purple-500/30 rounded-2xl p-6 text-center hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.03]">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative">
                <div className="inline-flex p-3 bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  <IconCalendar
                    size={32}
                    className="text-purple-400 drop-shadow-glow"
                    stroke={2.5}
                  />
                </div>
                <div className="text-3xl font-black text-white mb-2 drop-shadow">
                  {daysActive}
                </div>
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                  Days Active
                </div>
              </div>
            </div>
          </div>
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
