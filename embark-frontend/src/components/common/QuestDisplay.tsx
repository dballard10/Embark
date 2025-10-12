import QuestCard from "./QuestCard";
import type { UserCompletedQuest } from "../../types/quest.types";
import { IconMap, IconSwords } from "@tabler/icons-react";

interface QuestDisplayProps {
  activeQuests: UserCompletedQuest[];
  availableQuestSlots?: number;
}

function QuestDisplay({
  activeQuests,
  availableQuestSlots = 4,
}: QuestDisplayProps) {
  const hasActiveQuests = activeQuests.length > 0;

  // Create array of quest slots
  const questSlots = [];
  for (let i = 0; i < availableQuestSlots; i++) {
    if (i < activeQuests.length) {
      questSlots.push({ type: "active", quest: activeQuests[i] });
    } else {
      questSlots.push({ type: "locked", quest: null });
    }
  }

  if (!hasActiveQuests) {
    return (
      <div className="quest-display-empty">
        <IconMap
          size={96}
          className="text-blue-400 mb-4 animate-bounce"
          stroke={1.5}
        />
        <h3 className="text-3xl font-bold mb-3 text-white">No Active Quests</h3>
        <p className="text-gray-300 text-lg mb-6 max-w-md">
          Ready for your next adventure? Start a quest and earn glory, XP, and
          legendary items!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <IconSwords size={28} className="text-cyan-400" stroke={2} />
          <h2 className="text-2xl font-bold text-white">Active Quests</h2>
          <IconSwords size={28} className="text-cyan-400" stroke={2} />
        </div>
        <p className="text-gray-300">Complete quests to earn rewards</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {questSlots.map((slot, index) => (
          <div
            key={index}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {slot.type === "active" && slot.quest ? (
              <QuestCard userQuest={slot.quest} variant="active" />
            ) : (
              <QuestCard variant="locked" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestDisplay;
