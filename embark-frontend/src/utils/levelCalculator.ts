/**
 * Calculate level from total XP
 * Formula: floor(total_xp / 10000) + 1
 * Level 1 is the starting level (0-9999 XP)
 */
export function calculateLevel(totalXP: number): number {
  return Math.floor(totalXP / 10000) + 1;
}

/**
 * Calculate XP needed to reach next level
 */
export function xpToNextLevel(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  const nextLevelXP = currentLevel * 10000;
  return nextLevelXP - totalXP;
}

/**
 * Get level progress as percentage (0-100)
 */
export function getLevelProgress(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  const currentLevelXP = (currentLevel - 1) * 10000;
  const xpInCurrentLevel = totalXP - currentLevelXP;
  const xpForNextLevel = 10000;
  return (xpInCurrentLevel / xpForNextLevel) * 100;
}

/**
 * Get XP in current level
 */
export function getCurrentLevelXP(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  return totalXP - (currentLevel - 1) * 10000;
}
