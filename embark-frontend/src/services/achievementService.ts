import api from "./api";
import type {
  Achievement,
  UserAchievement,
  UpdateActiveTitleRequest,
} from "../types/achievement.types";

/**
 * Fetch all available achievements
 */
export async function fetchAllAchievements(): Promise<Achievement[]> {
  const response = await api.get<Achievement[]>("/achievements");
  return response.data;
}

/**
 * Fetch achievements unlocked by a specific user
 */
export async function fetchUserAchievements(
  userId: string
): Promise<UserAchievement[]> {
  const response = await api.get<UserAchievement[]>(
    `/achievements/users/${userId}`
  );
  return response.data;
}

/**
 * Set user's active title
 */
export async function setActiveTitle(
  userId: string,
  achievementId: string | null
): Promise<{ message: string; active_title_id: string | null }> {
  const response = await api.patch<{
    message: string;
    active_title_id: string | null;
  }>(`/achievements/users/${userId}/active-title`, {
    achievement_id: achievementId,
  } as UpdateActiveTitleRequest);
  return response.data;
}

/**
 * Get user's currently active title
 */
export async function getActiveTitle(
  userId: string
): Promise<Achievement | null> {
  const response = await api.get<Achievement | null>(
    `/achievements/users/${userId}/active-title`
  );
  return response.data;
}
