import { useState, useEffect, useCallback } from "react";
import { fetchUserById, fetchUserItems } from "../services/api";
import type { User } from "../types/user.types";

export interface UseUserDataReturn {
  user: User | null;
  itemCount: number;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

/**
 * Hook for fetching and managing user data including item count
 * @param userId - The user ID to fetch data for
 * @returns User data, item count, loading state, error, and refresh function
 */
export function useUserData(userId: string | undefined): UseUserDataReturn {
  const [user, setUser] = useState<User | null>(null);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch user data and items in parallel
      const [userData, items] = await Promise.all([
        fetchUserById(userId),
        fetchUserItems(userId),
      ]);

      setUser(userData);
      setItemCount(items.length);
    } catch (err) {
      console.error("Error loading user data:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to load user data")
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    user,
    itemCount,
    loading,
    error,
    refresh: loadData,
  };
}
