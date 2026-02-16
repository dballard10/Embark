export type RarityTier = 1 | 2 | 3 | 4 | 5 | 6;

export type ItemCategory = 'warrior' | 'creature' | 'elemental' | 'mythology';

export interface GachaItem {
  id: string;
  name: string;
  description: string;
  tier: RarityTier;
  category: ItemCategory;
  imageFilename: string;
}

export interface OwnedItem {
  instanceId: string;
  itemId: string;
  acquiredAt: string;
  source: 'pull' | 'shop';
}

export interface PullRecord {
  id: string;
  itemId: string;
  tier: RarityTier;
  timestamp: string;
  pullType: 'single' | 'multi';
}
