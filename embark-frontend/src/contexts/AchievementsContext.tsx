import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Achievement, UserAchievement } from "../types/achievement.types";
import * as achievementService from "../services/achievementService";
import { useUser } from "./UserContext";

interface AchievementsContextType {
  allAchievements: Achievement[];
  userAchievements: UserAchievement[];
  activeTitle: Achievement | null;
  isLoading: boolean;
  error: string | null;
  refetchUserAchievements: () => Promise<void>;
  updateActiveTitle: (achievementId: string | null) => Promise<void>;
}

const AchievementsContext = createContext<AchievementsContextType | undefined>(
  undefined
);

export function AchievementsProvider({ children }: { children: ReactNode }) {
  const { selectedUser } = useUser();
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>(
    []
  );
  const [activeTitle, setActiveTitle] = useState<Achievement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all achievements (only once, they don't change)
  useEffect(() => {
    const loadAllAchievements = async () => {
      try {
        const achievements = await achievementService.fetchAllAchievements();
        setAllAchievements(achievements);
      } catch (err) {
        console.error("Failed to fetch all achievements:", err);
        setError("Failed to load achievements");
      }
    };

    loadAllAchievements();
  }, []);

  // Fetch user's achievements when user changes
  useEffect(() => {
    if (!selectedUser) {
      setUserAchievements([]);
      setActiveTitle(null);
      setIsLoading(false);
      return;
    }

    const loadUserData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch user achievements
        const userAchs = await achievementService.fetchUserAchievements(
          selectedUser.id
        );
        setUserAchievements(userAchs);

        // Fetch active title
        const active = await achievementService.getActiveTitle(selectedUser.id);
        setActiveTitle(active);
      } catch (err) {
        console.error("Failed to fetch user achievements:", err);
        setError("Failed to load your achievements");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [selectedUser?.id]);

  const refetchUserAchievements = async () => {
    if (!selectedUser) return;

    try {
      const userAchs = await achievementService.fetchUserAchievements(selectedUser.id);
      setUserAchievements(userAchs);
    } catch (err) {
      console.error("Failed to refetch user achievements:", err);
      throw err;
    }
  };

  const updateActiveTitle = async (achievementId: string | null) => {
    if (!selectedUser) return;

    try {
      await achievementService.setActiveTitle(selectedUser.id, achievementId);

      // Update local state
      if (achievementId) {
        const achievement = allAchievements.find((a) => a.id === achievementId);
        setActiveTitle(achievement || null);
      } else {
        setActiveTitle(null);
      }
    } catch (err) {
      console.error("Failed to update active title:", err);
      throw err;
    }
  };

  return (
    <AchievementsContext.Provider
      value={{
        allAchievements,
        userAchievements,
        activeTitle,
        isLoading,
        error,
        refetchUserAchievements,
        updateActiveTitle,
      }}
    >
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  const context = useContext(AchievementsContext);
  if (context === undefined) {
    throw new Error(
      "useAchievements must be used within an AchievementsProvider"
    );
  }
  return context;
}
