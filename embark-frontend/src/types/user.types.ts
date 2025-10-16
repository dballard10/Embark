export interface User {
  id: string;
  username: string;
  total_glory: number;
  total_xp: number;
  level: number;
  created_at: string;
}

export interface UserStats {
  level: number;
  totalGlory: number;
  totalXP: number;
  xpToNextLevel: number;
  levelProgress: number;
  totalItems: number;
  questsCompleted: number;
}
