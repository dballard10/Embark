import QuestCard from "./QuestCard";
import CardSkeleton from "./CardSkeleton";
import type { UserCompletedQuest } from "../../types/quest.types";

interface ActiveQuestsGridProps {
  activeQuests: UserCompletedQuest[];
  loading: boolean;
  onAddQuest: () => void;
  onQuestClick?: (questId: string) => void;
}

function ActiveQuestsGrid({
  activeQuests,
  loading,
  onAddQuest,
  onQuestClick,
}: ActiveQuestsGridProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        Active Quests
        <span className="text-sm font-normal text-gray-400">
          ({activeQuests.length}/4)
        </span>
      </h2>
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
