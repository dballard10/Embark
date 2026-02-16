export interface User {
  id: string;
  username: string;
  email: string;
  total_glory: number;
  total_xp: number;
  level: number;
  lifetime_glory_gained?: number;
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
