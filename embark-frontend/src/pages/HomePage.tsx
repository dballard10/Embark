import { useState } from "react";
import TopBar from "../components/common/TopBar";
import QuestDisplay from "../components/common/QuestDisplay";
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

// Mock data for now
const mockUser = {
  id: "1",
  username: "GeneralJF",
  total_glory: 3445,
  total_xp: 3095,
  level: 9,
  created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(), // 180 days ago
  total_items: 103,
};

// Mock stats
const mockStats = {
  questsCompleted: 24,
  activeQuests: 2,
  achievementCount: 12,
};

// Mock active quests - can have multiple
const mockActiveQuests: UserCompletedQuest[] = [
  {
    id: "1",
    user_id: "1",
    quest_id: "1",
    quest: {
      id: "1",
      title: "Morning Workout Challenge",
      description: "Complete a 30-minute workout session",
      tier: 2 as const,
      glory_reward: 5000,
      xp_reward: 5000,
      time_limit_hours: 24,
      reward_item_id: "1",
      created_at: new Date().toISOString(),
    },
    started_at: new Date().toISOString(),
    completed_at: null,
    deadline_at: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours from now
    is_active: true,
  },
  {
    id: "2",
    user_id: "1",
    quest_id: "2",
    quest: {
      id: "2",
      title: "Read for 1 Hour",
      description: "Spend quality time reading a book",
      tier: 1 as const,
      glory_reward: 2000,
      xp_reward: 2000,
      time_limit_hours: 48,
      reward_item_id: "2",
      created_at: new Date().toISOString(),
    },
    started_at: new Date().toISOString(),
    completed_at: null,
    deadline_at: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(), // 36 hours from now
    is_active: true,
  },
];

function HomePage() {
  const [user] = useState(mockUser);
  const [activeQuests] = useState(mockActiveQuests);
  const [stats] = useState(mockStats);

  const handleFindQuest = () => {
    console.log("Navigate to quest browser");
    // TODO: Navigate to quest browser page
  };

  // Calculate level info
  const currentLevel = calculateLevel(user.total_xp);
  const xpToNext = xpToNextLevel(user.total_xp);
  const levelProgressPercent = getLevelProgress(user.total_xp);
  const currentLevelXP = getCurrentLevelXP(user.total_xp);

  // Calculate days active
  const createdDate = new Date(user.created_at);
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
        username={user.username}
        totalXP={user.total_xp}
        totalGlory={user.total_glory}
        totalItems={user.total_items}
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
            <div className="px-6 pb-4 -mt-12 relative">
              {/* Avatar */}
              <div className="inline-block p-1.5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-4 border-purple-500/50 shadow-xl mb-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <IconShield size={40} className="text-white" stroke={2} />
                </div>
              </div>

              {/* Username and Level */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {user.username}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <IconCalendar size={16} stroke={2} />
                    <span>
                      Member since {formatDateFriendly(user.created_at)}
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
            </div>
          </div>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Total Glory */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-4 hover:border-purple-400/50 transition-all duration-200 hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-yellow-900/30 rounded-lg">
                <IconTrophy size={28} className="text-yellow-400" stroke={2} />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-semibold">
                  Total Glory
                </div>
                <div className="text-xl font-bold text-yellow-300">
                  {user.total_glory.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Total XP */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-4 hover:border-purple-400/50 transition-all duration-200 hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-900/30 rounded-lg">
                <IconBolt size={28} className="text-blue-400" stroke={2} />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-semibold">
                  Total XP
                </div>
                <div className="text-xl font-bold text-blue-300">
                  {user.total_xp.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Total Items */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-4 hover:border-purple-400/50 transition-all duration-200 hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-900/30 rounded-lg">
                <IconBox size={28} className="text-purple-400" stroke={2} />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-semibold">
                  Total Items
                </div>
                <div className="text-xl font-bold text-purple-300">
                  {user.total_items}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Level Progress Section */}
        <div className="mb-6">
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-5">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <IconBolt size={22} className="text-blue-400" stroke={2} />
              Level Progress
            </h2>

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

        {/* Active Quest Slots */}
        <div className="mb-6">
          <QuestDisplay
            activeQuests={activeQuests}
            availableQuestSlots={4}
            onAddQuest={handleFindQuest}
          />
        </div>

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
                {stats.questsCompleted}
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
                {stats.activeQuests}
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
              <div className="text-xl font-bold text-white mb-0.5">
                {stats.achievementCount}
              </div>
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
    </div>
  );
}

export default HomePage;
