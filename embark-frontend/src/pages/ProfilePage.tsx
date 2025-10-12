import { useState } from "react";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import {
  IconUser,
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

// Mock user data (consistent with other pages)
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

function ProfilePage() {
  const [user] = useState(mockUser);
  const [stats] = useState(mockStats);

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
      <div className="max-w-5xl mx-auto px-4 py-8 pb-24">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="h-32 bg-gradient-to-r from-purple-600/20 to-blue-600/20 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
            </div>

            {/* Profile Info */}
            <div className="px-6 pb-6 -mt-16 relative">
              {/* Avatar */}
              <div className="inline-block p-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-4 border-purple-500/50 shadow-xl mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <IconShield size={48} className="text-white" stroke={2} />
                </div>
              </div>

              {/* Username and Level */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {user.username}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-400">
                    <IconCalendar size={18} stroke={2} />
                    <span>
                      Member since {formatDateFriendly(user.created_at)}
                    </span>
                  </div>
                </div>

                {/* Level Badge */}
                <div
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r ${levelColor} border border-white/30 shadow-lg`}
                >
                  <IconStar
                    size={24}
                    className="text-white"
                    fill="currentColor"
                    stroke={1.5}
                  />
                  <div className="text-center">
                    <div className="text-xs text-white/80 font-semibold">
                      Level
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {currentLevel}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Glory */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-200 hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-900/30 rounded-lg">
                <IconTrophy size={32} className="text-yellow-400" stroke={2} />
              </div>
              <div>
                <div className="text-sm text-gray-400 font-semibold">
                  Total Glory
                </div>
                <div className="text-2xl font-bold text-yellow-300">
                  {user.total_glory.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Total XP */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-200 hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-900/30 rounded-lg">
                <IconBolt size={32} className="text-blue-400" stroke={2} />
              </div>
              <div>
                <div className="text-sm text-gray-400 font-semibold">
                  Total XP
                </div>
                <div className="text-2xl font-bold text-blue-300">
                  {user.total_xp.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Total Items */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-200 hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-900/30 rounded-lg">
                <IconBox size={32} className="text-purple-400" stroke={2} />
              </div>
              <div>
                <div className="text-sm text-gray-400 font-semibold">
                  Total Items
                </div>
                <div className="text-2xl font-bold text-purple-300">
                  {user.total_items}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Level Progress Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <IconBolt size={24} className="text-blue-400" stroke={2} />
              Level Progress
            </h2>

            {/* Progress Bar */}
            <div className="mb-4">
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
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="text-xs text-gray-400 mb-1">
                  XP in Current Level
                </div>
                <div className="text-xl font-bold text-white">
                  {currentLevelXP.toLocaleString()} / 10,000
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="text-xs text-gray-400 mb-1">
                  XP to Next Level
                </div>
                <div className="text-xl font-bold text-white">
                  {xpToNext.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Statistics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Quests Completed */}
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-5 text-center hover:border-purple-400/50 transition-all duration-200">
              <IconTarget
                size={32}
                className="text-green-400 mx-auto mb-2"
                stroke={2}
              />
              <div className="text-2xl font-bold text-white mb-1">
                {stats.questsCompleted}
              </div>
              <div className="text-xs text-gray-400 font-semibold">
                Quests Completed
              </div>
            </div>

            {/* Active Quests */}
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-5 text-center hover:border-purple-400/50 transition-all duration-200">
              <IconTarget
                size={32}
                className="text-blue-400 mx-auto mb-2"
                stroke={2}
              />
              <div className="text-2xl font-bold text-white mb-1">
                {stats.activeQuests}
              </div>
              <div className="text-xs text-gray-400 font-semibold">
                Active Quests
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-5 text-center hover:border-purple-400/50 transition-all duration-200">
              <IconStar
                size={32}
                className="text-yellow-400 mx-auto mb-2"
                fill="currentColor"
                stroke={1.5}
              />
              <div className="text-2xl font-bold text-white mb-1">
                {stats.achievementCount}
              </div>
              <div className="text-xs text-gray-400 font-semibold">
                Achievements
              </div>
            </div>

            {/* Days Active */}
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-5 text-center hover:border-purple-400/50 transition-all duration-200">
              <IconCalendar
                size={32}
                className="text-purple-400 mx-auto mb-2"
                stroke={2}
              />
              <div className="text-2xl font-bold text-white mb-1">
                {daysActive}
              </div>
              <div className="text-xs text-gray-400 font-semibold">
                Days Active
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <IconUser size={24} className="text-purple-400" stroke={2} />
            Account Information
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between py-3 border-b border-slate-700">
              <span className="text-gray-400">User ID</span>
              <span className="font-mono text-sm text-gray-300">{user.id}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-slate-700">
              <span className="text-gray-400">Username</span>
              <span className="text-white font-semibold">{user.username}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-slate-700">
              <span className="text-gray-400">Account Created</span>
              <span className="text-white">
                {formatDateFriendly(user.created_at)}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-gray-400">Member Status</span>
              <span className="text-green-400 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="profile" />
    </div>
  );
}

export default ProfilePage;
