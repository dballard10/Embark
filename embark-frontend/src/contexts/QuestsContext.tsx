import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { UserCompletedQuest } from "../types/quest.types";
import { fetchActiveQuests, fetchCompletedQuests } from "../services/api";
import { useUser } from "./UserContext";

interface QuestsContextType {
  activeQuests: UserCompletedQuest[];
  completedQuests: UserCompletedQuest[];
  activeQuestCount: number;
  completedQuestCount: number;
  loading: boolean;
  error: Error | null;
  refreshQuests: () => Promise<void>;
  isActiveQuest: (questId: string) => boolean;
}

const QuestsContext = createContext<QuestsContextType | undefined>(undefined);

export function QuestsProvider({ children }: { children: ReactNode }) {
  const { selectedUser } = useUser();
  const [activeQuests, setActiveQuests] = useState<UserCompletedQuest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<UserCompletedQuest[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadQuests = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch active and completed quests in parallel
      const [active, completed] = await Promise.all([
        fetchActiveQuests(userId),
        fetchCompletedQuests(userId, 50),
      ]);

      setActiveQuests(active);
      setCompletedQuests(completed);
    } catch (err) {
      console.error("Error loading quests:", err);
      setError(err instanceof Error ? err : new Error("Failed to load quests"));
      setActiveQuests([]);
      setCompletedQuests([]);
    } finally {
      setLoading(false);
    }
  };

  // Load quests when selected user changes
  useEffect(() => {
    if (selectedUser?.id) {
      loadQuests(selectedUser.id);
    } else {
      setActiveQuests([]);
      setCompletedQuests([]);
      setLoading(false);
    }
  }, [selectedUser?.id]);

  const refreshQuests = async () => {
    if (selectedUser?.id) {
      await loadQuests(selectedUser.id);
    }
  };

  // Computed values
  const activeQuestCount = activeQuests.length;
  const completedQuestCount = completedQuests.length;

  const isActiveQuest = (questId: string): boolean => {
    return activeQuests.some((quest) => quest.quest_id === questId);
  };

  return (
    <QuestsContext.Provider
      value={{
        activeQuests,
        completedQuests,
        activeQuestCount,
        completedQuestCount,
        loading,
        error,
        refreshQuests,
        isActiveQuest,
      }}
    >
      {children}
    </QuestsContext.Provider>
  );
}

export function useQuestsContext() {
  const context = useContext(QuestsContext);
  if (context === undefined) {
    throw new Error("useQuestsContext must be used within a QuestsProvider");
  }
  return context;
}
