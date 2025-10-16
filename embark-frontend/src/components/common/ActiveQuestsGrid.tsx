import QuestCard from "./QuestCard";
import CardSkeleton from "./CardSkeleton";
import type { UserCompletedQuest } from "../../types/quest.types";
import { IconTarget, IconArrowRight } from "@tabler/icons-react";

interface ActiveQuestsGridProps {
  activeQuests: UserCompletedQuest[];
  loading: boolean;
  onAddQuest: () => void;
  onQuestClick?: (questId: string) => void;
  onViewAll?: () => void;
  showHeader?: boolean;
}

function ActiveQuestsGrid({
  activeQuests,
  loading,
  onAddQuest,
  onQuestClick,
  onViewAll,
  showHeader = true,
}: ActiveQuestsGridProps) {
  return (
    <div className="mb-6">
      {/* Section Header */}
      {showHeader && (
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border-2 border-blue-400/30 font-bold">
            <IconTarget size={20} className="text-blue-400" stroke={2} />
            <span className="text-lg">Active Quests</span>
          </div>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              View All Quests
              <IconArrowRight size={18} stroke={2} />
            </button>
          )}
        </div>
      )}

      {/* Quests Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? [...Array(4)].map((_, index) => (
              <CardSkeleton key={`skeleton-${index}`} variant="quest" />
            ))
          : [...Array(4)].map((_, index) => {
              const quest = activeQuests[index];
              return quest ? (
                <QuestCard
                  key={quest.id}
                  userQuest={quest}
                  variant="active"
                  onClick={() => onQuestClick?.(quest.id)}
                />
              ) : (
                <QuestCard
                  key={`add-${index}`}
                  variant="add"
                  onClick={onAddQuest}
                />
              );
            })}
      </div>
    </div>
  );
}

export default ActiveQuestsGrid;
