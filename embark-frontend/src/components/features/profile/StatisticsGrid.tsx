import {
  IconTarget,
  IconFlame,
  IconStar,
  IconCalendar,
} from "@tabler/icons-react";
import { StatCard } from "./StatCard";

interface StatisticsGridProps {
  questsCompletedCount: number;
  activeQuestsCount: number;
  achievementsCount: number;
  daysActive: number;
  onNavigateToQuests: () => void;
}

export function StatisticsGrid({
  questsCompletedCount,
  activeQuestsCount,
  achievementsCount,
  daysActive,
  onNavigateToQuests,
}: StatisticsGridProps) {
  return (
    <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-black text-white tracking-tight">
          Statistics
        </h2>
        <div className="h-1 flex-1 ml-6 bg-gradient-to-r from-purple-500/50 to-transparent rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Quests Completed */}
        <StatCard
          icon={IconTarget}
          value={questsCompletedCount}
          label="Quests Done"
          color="green"
          onClick={onNavigateToQuests}
        />

        {/* Active Quests */}
        <StatCard
          icon={IconFlame}
          value={activeQuestsCount}
          label="Active Quests"
          color="blue"
          animated
          onClick={onNavigateToQuests}
        />

        {/* Achievements */}
        <StatCard
          icon={IconStar}
          value={achievementsCount}
          label="Achievements"
          color="amber"
          filled
        />

        {/* Days Active */}
        <StatCard
          icon={IconCalendar}
          value={daysActive}
          label="Days Active"
          color="purple"
        />
      </div>
    </div>
  );
}
