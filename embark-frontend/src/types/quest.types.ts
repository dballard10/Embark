export type QuestTier = 1 | 2 | 3 | 4 | 5 | 6;

export type QuestTierName =
  | "Novice"
  | "Adventurer"
  | "Warrior"
  | "Champion"
  | "Master"
  | "Conqueror";

export interface Quest {
  id: string;
  title: string;
  description: string;
  tier: QuestTier;
  glory_reward: number;
  xp_reward: number;
  time_limit_hours: number;
  reward_item_id: string;
}

export interface UserCompletedQuest {
  id: string;
  user_id: string;
  quest_id: string;
  quest?: Quest;
  started_at: string;
  completed_at: string | null;
  deadline_at: string;
  is_active: boolean;
}
