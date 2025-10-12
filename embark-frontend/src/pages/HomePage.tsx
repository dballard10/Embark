import { useState } from "react";
import TopBar from "../components/common/TopBar";
import QuestDisplay from "../components/common/QuestDisplay";
import FindQuestButton from "../components/common/FindQuestButton";
import BottomNav from "../components/common/BottomNav";
import type { UserCompletedQuest } from "../types/quest.types";

// Mock data for now
const mockUser = {
  id: "1",
  username: "GeneralJF",
  total_glory: 3445,
  total_xp: 3095,
  level: 9,
  created_at: new Date().toISOString(),
  total_items: 103,
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
  const [currentPage, setCurrentPage] = useState("home");

  const hasActiveQuests = activeQuests.length > 0;

  const handleFindQuest = () => {
    console.log("Navigate to quest browser");
    // TODO: Navigate to quest browser page
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    console.log(`Navigate to ${page}`);
    // TODO: Implement actual navigation
  };

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
      <div className="max-w-7xl mx-auto animate-fade-in">
        {/* Quest Display Area */}
        <div
          className="px-4 py-8 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <QuestDisplay activeQuests={activeQuests} availableQuestSlots={4} />
        </div>

        {/* Find Quest Button */}
        <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <FindQuestButton
            hasActiveQuests={hasActiveQuests}
            onClick={handleFindQuest}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage={currentPage} onNavigate={handleNavigation} />
    </div>
  );
}

export default HomePage;
