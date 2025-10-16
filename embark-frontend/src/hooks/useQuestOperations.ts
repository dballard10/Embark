import { useState, useCallback } from "react";
import { startQuest, completeQuest, abandonQuest } from "../services/api";

export interface UseQuestOperationsReturn {
  starting: boolean;
  completing: boolean;
  abandoning: boolean;
  error: Error | null;
  handleStartQuest: (userId: string, questId: string) => Promise<boolean>;
  handleCompleteQuest: (
    userId: string,
    userQuestId: string
  ) => Promise<boolean>;
  handleAbandonQuest: (userId: string, userQuestId: string) => Promise<boolean>;
  clearError: () => void;
}

/**
 * Hook for managing quest operations (start, complete, abandon)
 * @returns Quest operation handlers and loading states
 */
export function useQuestOperations(): UseQuestOperationsReturn {
  const [starting, setStarting] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [abandoning, setAbandoning] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleStartQuest = useCallback(
    async (userId: string, questId: string): Promise<boolean> => {
      try {
        setStarting(true);
        setError(null);
        await startQuest(userId, questId);
        return true;
      } catch (err) {
        console.error("Error starting quest:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to start quest")
        );
        return false;
      } finally {
        setStarting(false);
      }
    },
    []
  );

  const handleCompleteQuest = useCallback(
    async (userId: string, userQuestId: string): Promise<boolean> => {
      try {
        setCompleting(true);
        setError(null);
        await completeQuest(userId, userQuestId);
        return true;
      } catch (err) {
        console.error("Error completing quest:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to complete quest")
        );
        return false;
      } finally {
        setCompleting(false);
      }
    },
    []
  );

  const handleAbandonQuest = useCallback(
    async (userId: string, userQuestId: string): Promise<boolean> => {
      try {
        setAbandoning(true);
        setError(null);
        await abandonQuest(userId, userQuestId);
        return true;
      } catch (err) {
        console.error("Error abandoning quest:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to abandon quest")
        );
        return false;
      } finally {
        setAbandoning(false);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    starting,
    completing,
    abandoning,
    error,
    handleStartQuest,
    handleCompleteQuest,
    handleAbandonQuest,
    clearError,
  };
}
