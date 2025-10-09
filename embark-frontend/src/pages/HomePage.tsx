import { useState } from "react";
import {
  calculateLevel,
  getLevelProgress,
  getCurrentLevelXP,
} from "../utils/levelCalculator";
import { getTierName, getTierStars } from "../utils/tierUtils";

// Mock data for now
const mockUser = {
  id: "1",
  username: "TestHero",
  total_glory: 15000,
  total_xp: 24000,
  level: 2,
  created_at: new Date().toISOString(),
};

const mockActiveQuest = {
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
  },
  started_at: new Date().toISOString(),
  completed_at: null,
  deadline_at: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours from now
  is_active: true,
};

function HomePage() {
  const [user] = useState(mockUser);
  const [activeQuest] = useState(mockActiveQuest);

  const level = calculateLevel(user.total_xp);
  const levelProgress = getLevelProgress(user.total_xp);
  const currentLevelXP = getCurrentLevelXP(user.total_xp);
  const tierName = getTierName(level as 1 | 2 | 3 | 4 | 5 | 6);

  return (
    <div className="min-h-screen p-6 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 animate-slide-up">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            EMBARK
          </h1>
          <p className="text-xl text-blue-200">Your Life, Gamified</p>
        </header>

        {/* User Stats Card */}
        <div
          className="card p-8 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold">{user.username}</h2>
              <p className="text-blue-300 text-lg">
                Level {level} {tierName}{" "}
                {getTierStars(level as 1 | 2 | 3 | 4 | 5 | 6)}
              </p>
            </div>
            <div className="text-right space-y-1">
              <div className="text-2xl font-bold">
                🏆 {user.total_glory.toLocaleString()}
              </div>
              <div className="text-sm text-gray-300">Glory</div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>⚡ XP Progress</span>
              <span>
                {currentLevelXP.toLocaleString()} / 10,000 (
                {Math.floor(levelProgress)}%)
              </span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 rounded-full"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Active Quest Card */}
        {activeQuest && (
          <div
            className="card p-8 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm text-blue-300 mb-2">ACTIVE QUEST</div>
                <h3 className="text-2xl font-bold mb-2">
                  {activeQuest.quest.title}
                </h3>
                <p className="text-gray-300">{activeQuest.quest.description}</p>
              </div>
              <div className="text-right">
                <div className="inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/40 text-green-300 text-sm font-semibold">
                  {getTierStars(activeQuest.quest.tier)}{" "}
                  {getTierName(activeQuest.quest.tier)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  🏆 {activeQuest.quest.glory_reward.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Glory Reward</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">
                  ⚡ {activeQuest.quest.xp_reward.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">XP Reward</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">⏰ 8h</div>
                <div className="text-sm text-gray-400">Time Remaining</div>
              </div>
            </div>

            <button className="btn-primary w-full">Complete Quest</button>
          </div>
        )}

        {/* No Active Quest State */}
        {!activeQuest && (
          <div
            className="card p-12 text-center animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-2xl font-bold mb-2">No Active Quest</h3>
            <p className="text-gray-300 mb-6">
              Ready for your next adventure? Browse available quests and start
              earning rewards!
            </p>
            <button className="btn-primary">Browse Quests</button>
          </div>
        )}

        {/* Quick Stats */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="card p-6 text-center hover:scale-105 transition-transform cursor-pointer">
            <div className="text-4xl mb-2">🗺️</div>
            <div className="text-2xl font-bold">Browse</div>
            <div className="text-gray-400">Available Quests</div>
          </div>
          <div className="card p-6 text-center hover:scale-105 transition-transform cursor-pointer">
            <div className="text-4xl mb-2">📦</div>
            <div className="text-2xl font-bold">View</div>
            <div className="text-gray-400">Your Vault</div>
          </div>
          <div className="card p-6 text-center hover:scale-105 transition-transform cursor-pointer">
            <div className="text-4xl mb-2">👤</div>
            <div className="text-2xl font-bold">Profile</div>
            <div className="text-gray-400">Character Stats</div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8">
          <p>Level up your life, one quest at a time ✨</p>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
