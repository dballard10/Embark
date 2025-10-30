-- Update Economy System: Quest Rewards and Shop Prices
-- This script updates all existing quests and items to match the new economy values

-- ============================================================================
-- QUEST REWARDS UPDATE
-- ============================================================================
-- Update quest glory_reward and xp_reward based on tier
-- New values:
-- T1: 3,000 glory, 300 XP
-- T2: 10,000 glory, 1,000 XP
-- T3: 30,000 glory, 3,000 XP
-- T4: 100,000 glory, 10,000 XP
-- T5: 300,000 glory, 30,000 XP
-- T6: 1,000,000 glory, 100,000 XP

UPDATE quests
SET 
    glory_reward = CASE tier
        WHEN 1 THEN 3000
        WHEN 2 THEN 10000
        WHEN 3 THEN 30000
        WHEN 4 THEN 100000
        WHEN 5 THEN 300000
        WHEN 6 THEN 1000000
        ELSE glory_reward
    END,
    xp_reward = CASE tier
        WHEN 1 THEN 300
        WHEN 2 THEN 1000
        WHEN 3 THEN 3000
        WHEN 4 THEN 10000
        WHEN 5 THEN 30000
        WHEN 6 THEN 100000
        ELSE xp_reward
    END
WHERE tier BETWEEN 1 AND 6;

-- ============================================================================
-- SHOP PRICES UPDATE
-- ============================================================================
-- Update item prices based on rarity_tier
-- New values:
-- T1: 9,000 glory
-- T2: 30,000 glory
-- T3: 90,000 glory
-- T4: 300,000 glory
-- T5: 900,000 glory
-- T6: 3,000,000 glory

UPDATE items
SET 
    price = CASE rarity_tier
        WHEN 1 THEN 9000
        WHEN 2 THEN 30000
        WHEN 3 THEN 90000
        WHEN 4 THEN 300000
        WHEN 5 THEN 900000
        WHEN 6 THEN 3000000
        ELSE price
    END
WHERE rarity_tier BETWEEN 1 AND 6;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Uncomment these to verify the updates

-- Check quest rewards by tier
-- SELECT tier, COUNT(*) as quest_count, MIN(glory_reward) as min_glory, MAX(glory_reward) as max_glory, 
--        MIN(xp_reward) as min_xp, MAX(xp_reward) as max_xp
-- FROM quests
-- GROUP BY tier
-- ORDER BY tier;

-- Check item prices by rarity tier
-- SELECT rarity_tier, COUNT(*) as item_count, MIN(price) as min_price, MAX(price) as max_price
-- FROM items
-- GROUP BY rarity_tier
-- ORDER BY rarity_tier;

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================
SELECT 'Economy system update complete!' as message,
       (SELECT COUNT(*) FROM quests WHERE tier BETWEEN 1 AND 6) as quests_updated,
       (SELECT COUNT(*) FROM items WHERE rarity_tier BETWEEN 1 AND 6) as items_updated;

