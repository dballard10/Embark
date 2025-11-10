export type AchievementType = "default" | "tier" | "questline" | "quest" | "collection";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  achievement_type: AchievementType;
  tier: number | null;
  topic: string | null;
  color_tier: number;
  is_rare: boolean;
  quest_id: string | null;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
  achievement: Achievement;
}

export interface UpdateActiveTitleRequest {
  achievement_id: string | null;
}
