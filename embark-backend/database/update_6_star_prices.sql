-- Update 6-star item prices to 1,000,000
-- Run this in your Supabase SQL Editor to update existing 6-star items

UPDATE rewards 
SET price = 1000000 
WHERE rarity_tier = 6;

-- Verify the update
SELECT id, name, rarity_tier, price 
FROM rewards 
WHERE rarity_tier = 6;

