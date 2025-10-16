-- Update Item Prices Based on Rarity Tiers
-- Run this in your Supabase SQL Editor
-- Simple uniform pricing:
-- 6-star: 1,000,000
-- 5-star: 100,000
-- 4-star: 50,000
-- 3-star: 15,000
-- 2-star: 5,000
-- 1-star: 1,000

-- Update all items by tier (simpler approach)
UPDATE items SET price = 1000 WHERE rarity_tier = 1;
UPDATE items SET price = 5000 WHERE rarity_tier = 2;
UPDATE items SET price = 15000 WHERE rarity_tier = 3;
UPDATE items SET price = 50000 WHERE rarity_tier = 4;
UPDATE items SET price = 100000 WHERE rarity_tier = 5;
UPDATE items SET price = 1000000 WHERE rarity_tier = 6;

-- Verify the updates
SELECT 
    rarity_tier, 
    rarity_stars, 
    name, 
    price,
    CASE 
        WHEN rarity_tier = 1 THEN '1,000'
        WHEN rarity_tier = 2 THEN '5,000'
        WHEN rarity_tier = 3 THEN '15,000'
        WHEN rarity_tier = 4 THEN '50,000'
        WHEN rarity_tier = 5 THEN '100,000'
        WHEN rarity_tier = 6 THEN '1,000,000'
    END as expected_price
FROM items 
ORDER BY rarity_tier, name;
