export type RarityTier = 1 | 2 | 3 | 4 | 5 | 6;

export interface Reward {
  id: string;
  name: string;
  description: string;
  rarity_tier: RarityTier;
  rarity_stars: number;
  image_url: string | null;
}

export interface UserItem {
  id: string;
  user_id: string;
  item_id: string;
  item?: Reward;
  acquired_at: string;
  is_featured: boolean;
}
