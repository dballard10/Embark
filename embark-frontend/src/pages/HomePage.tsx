import { useState, useEffect } from "react";
import TopBar from "../components/common/TopBar";
import ActiveQuestsGrid from "../components/common/ActiveQuestsGrid";
import QuestSelectionModal from "../components/common/QuestSelectionModal";
import QuestDetailsModal from "../components/common/QuestDetailsModal";
import BottomNav from "../components/common/BottomNav";
import type { UserCompletedQuest } from "../types/quest.types";
import {
  IconTrophy,
  IconBolt,
  IconBox,
  IconCalendar,
  IconTarget,
  IconStar,
  IconShield,
} from "@tabler/icons-react";
import { formatDateFriendly } from "../utils/dateUtils";
import {
  calculateLevel,
  xpToNextLevel,
  getLevelProgress,
  getCurrentLevelXP,
} from "../utils/levelCalculator";
import { useUser } from "../contexts/UserContext";
import {
  fetchActiveQuests,
  fetchCompletedQuests,
  fetchUserItems,
} from "../services/api";

function HomePage() {
  const { selectedUser, isLoading: userLoading } = useUser();
  const [activeQuests, setActiveQuests] = useState<UserCompletedQuest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<UserCompletedQuest[]>(
    []
  );
  const [questsCompletedCount, setQuestsCompletedCount] = useState(0);
  const [userItemCount, setUserItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [isQuestDetailsModalOpen, setIsQuestDetailsModalOpen] = useState(false);

  useEffect(() => {
    if (selectedUser?.id) {
      loadData();
    }
  }, [selectedUser?.id]);

  const loadData = async () => {
    if (!selectedUser?.id) return;

    try {
      setLoading(true);
      // Fetch active quest
      const activeQuestData = await fetchActiveQuests(selectedUser.id);
      setActiveQuests(activeQuestData || []);

      // Fetch completed quests
      const completedQuestsData = await fetchCompletedQuests(
        selectedUser.id,
        1000
      );
      setCompletedQuests(completedQuestsData);
      setQuestsCompletedCount(completedQuestsData.length);

      // Fetch user items for count
      const items = await fetchUserItems(selectedUser.id);
      setUserItemCount(items.length);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuest = () => {
    setIsQuestModalOpen(true);
  };

  const handleQuestAdded = () => {
    // Reload data after a quest is added
    loadData();
  };

  if (userLoading || !selectedUser) {
    return (
      <div className="game-container flex items-center justify-center min-h-screen">
        <div className="text-gray-400 text-lg">Loading...</div>
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

  // Get level color based on level (using tier-like colors)
  const getLevelColor = (level: number): string => {
    if (level >= 50) return "from-red-600 to-pink-600";
    if (level >= 40) return "from-orange-500 to-red-600";
    if (level >= 30) return "from-purple-500 to-purple-600";
    if (level >= 20) return "from-blue-500 to-blue-600";
    if (level >= 10) return "from-green-500 to-green-600";
    return "from-gray-500 to-gray-600";
  };

  const levelColor = getLevelColor(currentLevel);

  return (
    <div className="game-container">
      {/* Top Stats Bar */}
      <TopBar
        username={selectedUser.username}
        totalXP={selectedUser.total_xp}
        totalGlory={selectedUser.total_glory}
        totalItems={userItemCount}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
        {/* Profile Header */}
        <div className="mb-6">
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="h-24 bg-gradient-to-r from-purple-600/20 to-blue-600/20 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
            </div>

            {/* Profile Info */}
            <div className="px-6 pb-6 -mt-12 relative">
              {/* Avatar */}
              <div className="inline-block p-1.5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-4 border-purple-500/50 shadow-xl mb-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <IconShield size={40} className="text-white" stroke={2} />
                </div>
              </div>

              {/* Username and Level */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {selectedUser.username}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <IconCalendar size={16} stroke={2} />
                    <span>
                      Member since {formatDateFriendly(selectedUser.created_at)}
                    </span>
                  </div>
                </div>

                {/* Level Badge */}
                <div
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r ${levelColor} border border-white/30 shadow-lg`}
                >
                  <IconStar
                    size={20}
                    className="text-white"
                    fill="currentColor"
                    stroke={1.5}
                  />
                  <div className="text-center">
                    <div className="text-xs text-white/80 font-semibold">
                      Level
                    </div>
                    <div className="text-xl font-bold text-white">
                      {currentLevel}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                {/* Total Glory */}
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-yellow-900/30 rounded-lg">
                      <IconTrophy
                        size={28}
                        className="text-yellow-400"
                        stroke={2}
                      />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-semibold">
                        Total Glory
                      </div>
                      <div className="text-xl font-bold text-yellow-300">
                        {selectedUser.total_glory.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Items */}
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-purple-900/30 rounded-lg">
                      <IconBox
                        size={28}
                        className="text-purple-400"
                        stroke={2}
                      />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-semibold">
                        Total Items
                      </div>
                      <div className="text-xl font-bold text-purple-300">
                        {userItemCount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level Progress */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <IconBolt size={18} className="text-blue-400" stroke={2} />
                  Level Progress
                </h3>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">
                      Level {currentLevel}
                    </span>
                    <span className="text-sm text-gray-400">
                      Level {currentLevel + 1}
                    </span>
                  </div>
                  <div className="w-full h-6 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 flex items-center justify-end pr-2"
                      style={{ width: `${levelProgressPercent}%` }}
                    >
                      {levelProgressPercent > 10 && (
                        <span className="text-xs font-bold text-white">
                          {Math.round(levelProgressPercent)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* XP Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                    <div className="text-xs text-gray-400 mb-1">
                      XP in Current Level
                    </div>
                    <div className="text-lg font-bold text-white">
                      {currentLevelXP.toLocaleString()} / 10,000
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                    <div className="text-xs text-gray-400 mb-1">
                      XP to Next Level
                    </div>
                    <div className="text-lg font-bold text-white">
                      {xpToNext.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Quests Section */}
        <ActiveQuestsGrid
          activeQuests={activeQuests}
          loading={loading}
          onAddQuest={handleAddQuest}
          onQuestClick={(questId) => {
            setSelectedQuestId(questId);
            setIsQuestDetailsModalOpen(true);
          }}
        />

        {/* Quick Stats Grid */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Statistics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Quests Completed */}
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-4 text-center hover:border-purple-400/50 transition-all duration-200">
              <IconTarget
                size={28}
                className="text-green-400 mx-auto mb-1.5"
                stroke={2}
              />
              <div className="text-xl font-bold text-white mb-0.5">
                {questsCompletedCount}
              </div>
              <div className="text-xs text-gray-400 font-semibold">
                Quests Done
              </div>
            </div>

            {/* Active Quests */}
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-4 text-center hover:border-purple-400/50 transition-all duration-200">
              <IconTarget
                size={28}
                className="text-blue-400 mx-auto mb-1.5"
                stroke={2}
              />
              <div className="text-xl font-bold text-white mb-0.5">
                {activeQuests.length}
              </div>
              <div className="text-xs text-gray-400 font-semibold">Active</div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-4 text-center hover:border-purple-400/50 transition-all duration-200">
              <IconStar
                size={28}
                className="text-yellow-400 mx-auto mb-1.5"
                fill="currentColor"
                stroke={1.5}
              />
              <div className="text-xl font-bold text-white mb-0.5">0</div>
              <div className="text-xs text-gray-400 font-semibold">
                Achievements
              </div>
            </div>

            {/* Days Active */}
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-4 text-center hover:border-purple-400/50 transition-all duration-200">
              <IconCalendar
                size={28}
                className="text-purple-400 mx-auto mb-1.5"
                stroke={2}
              />
              <div className="text-xl font-bold text-white mb-0.5">
                {daysActive}
              </div>
              <div className="text-xs text-gray-400 font-semibold">
                Days Active
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
            // Reload data after completing quest
            loadData();
          }}
          questId={selectedQuestId}
        />
      )}
    </div>
  );
}

export default HomePage;
