/**
 * Level calculation utilities for the progressive XP system.
 * Uses cumulative XP requirements from the XP_Requirements_by_Level CSV.
 */

// Cumulative XP required to reach each level (index = level - 1)
// Level 1 = 0 XP, Level 2 = 300 XP, Level 3 = 621 XP, etc.
const CUMULATIVE_XP_REQUIREMENTS = [
  0, 300, 621, 964, 1331, 1724, 2145, 2595, 3077, 3593,
  4145, 4736, 5368, 6044, 6767, 7541, 8369, 9255, 10203, 11217,
  12302, 13463, 14705, 16034, 17456, 18978, 20607, 22350, 24215, 26211,
  28347, 30633, 33079, 35696, 38496, 41492, 44698, 48128, 51798, 55725,
  59927, 64423, 69234, 74382, 79890, 85784, 92091, 98839, 106059, 113784,
  122050, 130895, 140359, 150485, 161320, 172913, 185318, 198591, 212793, 227989,
  244249, 261647, 280263, 300182, 321495, 344300, 368701, 394810, 422747, 452640,
  484626, 518851, 555472, 594656, 636583, 681445, 729447, 780809, 835766, 894570,
  957490, 1024814, 1096851, 1173931, 1256407, 1344656, 1439082, 1540118, 1648227, 1763904,
  1887678, 2020116, 2161825, 2313454, 2475697, 2649297, 2835049, 3033804, 3246472, 3474027
];

// XP needed from previous level (index = level - 1)
// Level 1 needs 0, Level 2 needs 300, Level 3 needs 321, etc.
const XP_PER_LEVEL = [
  0, 300, 321, 343, 367, 393, 421, 450, 482, 516,
  552, 591, 632, 676, 723, 774, 828, 886, 948, 1014,
  1085, 1161, 1242, 1329, 1422, 1522, 1629, 1743, 1865, 1996,
  2136, 2286, 2446, 2617, 2800, 2996, 3206, 3430, 3670, 3927,
  4202, 4496, 4811, 5148, 5508, 5894, 6307, 6748, 7220, 7725,
  8266, 8845, 9464, 10126, 10835, 11593, 12405, 13273, 14202, 15196,
  16260, 17398, 18616, 19919, 21313, 22805, 24401, 26109, 27937, 29893,
  31986, 34225, 36621, 39184, 41927, 44862, 48002, 51362, 54957, 58804,
  62920, 67324, 72037, 77080, 82476, 88249, 94426, 101036, 108109, 115677,
  123774, 132438, 141709, 151629, 162243, 173600, 185752, 198755, 212668, 227555
];

const MAX_LEVEL = 100;

/**
 * Calculate the current level based on total XP using progressive system.
 * 
 * @param totalXP - Total accumulated XP
 * @returns Current level (1-100)
 * 
 * @example
 * calculateLevel(0) // 1
 * calculateLevel(300) // 2
 * calculateLevel(621) // 3
 * calculateLevel(3474027) // 100
 */
export function calculateLevel(totalXP: number): number {
  if (totalXP < 0) {
    return 1;
  }

  if (totalXP >= CUMULATIVE_XP_REQUIREMENTS[MAX_LEVEL - 1]) {
    return MAX_LEVEL;
  }

  // Binary search for efficiency
  let left = 0;
  let right = CUMULATIVE_XP_REQUIREMENTS.length - 1;
  let level = 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (CUMULATIVE_XP_REQUIREMENTS[mid] <= totalXP) {
      level = mid + 1;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return level;
}

/**
 * Calculate XP needed to reach the next level.
 * 
 * @param totalXP - Total accumulated XP
 * @returns XP needed for next level (0 if max level)
 * 
 * @example
 * xpToNextLevel(0) // 300
 * xpToNextLevel(150) // 150
 * xpToNextLevel(300) // 321
 */
export function xpToNextLevel(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);

  if (currentLevel >= MAX_LEVEL) {
    return 0;
  }

  const nextLevelXP = CUMULATIVE_XP_REQUIREMENTS[currentLevel];
  return nextLevelXP - totalXP;
}

/**
 * Get the XP earned in the current level.
 * 
 * @param totalXP - Total accumulated XP
 * @returns XP earned in current level
 * 
 * @example
 * getCurrentLevelXP(0) // 0
 * getCurrentLevelXP(450) // 150 (300 for level 2, 150 into level 3)
 */
export function getCurrentLevelXP(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);

  if (currentLevel >= MAX_LEVEL) {
    return totalXP - CUMULATIVE_XP_REQUIREMENTS[MAX_LEVEL - 1];
  }

  const currentLevelStartXP = CUMULATIVE_XP_REQUIREMENTS[currentLevel - 1];
  return totalXP - currentLevelStartXP;
}

/**
 * Get progress to next level as a percentage (0-100).
 * 
 * @param totalXP - Total accumulated XP
 * @returns Progress percentage (0.0 - 100.0)
 */
export function getLevelProgress(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);

  if (currentLevel >= MAX_LEVEL) {
    return 100.0;
  }

  const currentLevelXP = getCurrentLevelXP(totalXP);
  const xpNeededForLevel = XP_PER_LEVEL[currentLevel];

  if (xpNeededForLevel === 0) {
    return 100.0;
  }

  return (currentLevelXP / xpNeededForLevel) * 100.0;
}

/**
 * Get the total cumulative XP required to reach a specific level.
 * 
 * @param level - Target level (1-100)
 * @returns Cumulative XP required
 * 
 * @example
 * getXPForLevel(1) // 0
 * getXPForLevel(2) // 300
 * getXPForLevel(100) // 3474027
 */
export function getXPForLevel(level: number): number {
  if (level < 1) {
    return 0;
  }
  if (level > MAX_LEVEL) {
    return CUMULATIVE_XP_REQUIREMENTS[MAX_LEVEL - 1];
  }

  return CUMULATIVE_XP_REQUIREMENTS[level - 1];
}
