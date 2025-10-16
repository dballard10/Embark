import { useMemo } from "react";
import {
  calculateLevel,
  xpToNextLevel,
  getLevelProgress,
  getCurrentLevelXP,
} from "../utils/levelCalculator";

export interface ProfileData {
  currentLevel: number;
  xpToNext: number;
  levelProgressPercent: number;
  currentLevelXP: number;
  levelColor: string;
  daysActive: number;
}

/**
 * Get level color gradient based on level
 */
export function getLevelColor(level: number): string {
  if (level >= 50) return "from-red-600 to-pink-600";
  if (level >= 40) return "from-orange-500 to-red-600";
  if (level >= 30) return "from-purple-500 to-purple-600";
  if (level >= 20) return "from-blue-500 to-blue-600";
  if (level >= 10) return "from-green-500 to-green-600";
  return "from-gray-500 to-gray-600";
}

/**
 * Calculate days active since account creation
 */
export function calculateDaysActive(createdAt: string): number {
  const createdDate = new Date(createdAt);
  const now = new Date();
  return Math.floor(
    (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
  );
}

/**
 * Hook for calculating profile-related data
 * @param totalXP - User's total XP
 * @param createdAt - User's account creation date
 * @returns Calculated profile data (level, progress, colors, etc.)
 */
export function useProfileData(
  totalXP: number,
  createdAt: string
): ProfileData {
  return useMemo(() => {
    const currentLevel = calculateLevel(totalXP);
    const xpToNext = xpToNextLevel(totalXP);
    const levelProgressPercent = getLevelProgress(totalXP);
    const currentLevelXP = getCurrentLevelXP(totalXP);
    const levelColor = getLevelColor(currentLevel);
    const daysActive = calculateDaysActive(createdAt);

    return {
      currentLevel,
      xpToNext,
      levelProgressPercent,
      currentLevelXP,
      levelColor,
      daysActive,
    };
  }, [totalXP, createdAt]);
}
