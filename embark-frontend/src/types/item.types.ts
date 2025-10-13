export type RarityTier = 1 | 2 | 3 | 4 | 5 | 6;

export interface Item {
  id: string;
  name: string;
  description: string;
  rarity_tier: RarityTier;
  rarity_stars: number;
  image_url: string | null;
  price: number;
  created_at: string;
}

// Legacy alias for backwards compatibility
export type Reward = Item;

export interface UserItem {
  id: string;
  user_id: string;
  item_id: string;
  item?: Item;
  acquired_at: string;
  is_featured: boolean;
}
