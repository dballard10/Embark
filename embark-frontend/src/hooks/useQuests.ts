import { useState, useEffect, useCallback } from "react";
import { fetchActiveQuests, fetchCompletedQuests } from "../services/api";
import type { UserCompletedQuest } from "../types/quest.types";

export interface UseQuestsReturn {
  activeQuests: UserCompletedQuest[];
  completedQuests: UserCompletedQuest[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

/**
 * Hook for fetching and managing quest data
 * @param userId - The user ID to fetch quests for
 * @param completedLimit - Maximum number of completed quests to fetch (default: 50)
 * @returns Active quests, completed quests, loading state, error, and refresh function
 */
export function useQuests(
  userId: string | undefined,
  completedLimit = 50
): UseQuestsReturn {
  const [activeQuests, setActiveQuests] = useState<UserCompletedQuest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<UserCompletedQuest[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadQuests = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch active and completed quests in parallel
      const [active, completed] = await Promise.all([
        fetchActiveQuests(userId),
        fetchCompletedQuests(userId, completedLimit),
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
  }, [userId, completedLimit]);

  useEffect(() => {
    loadQuests();
  }, [loadQuests]);

  return {
    activeQuests,
    completedQuests,
    loading,
    error,
    refresh: loadQuests,
  };
}
