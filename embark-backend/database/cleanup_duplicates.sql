-- ============================================
-- Cleanup Duplicate Quests and Items
-- ============================================
-- This script removes duplicate entries from the database
-- Keeps the oldest entry (earliest created_at) when duplicates are found
-- IMPORTANT: Run check_duplicates.sql first to see what will be affected

-- ============================================
-- BACKUP REMINDER
-- ============================================
-- IMPORTANT: Backup your database before running this script!
-- This operation cannot be easily undone.

BEGIN;

-- ============================================
-- 1. DELETE DUPLICATE QUESTS
-- ============================================
-- Keep the oldest quest (lowest id) for each (title, topic, tier) combination

SELECT '=== REMOVING DUPLICATE QUESTS ===' as action;

DELETE FROM quests a
USING quests b
WHERE a.id > b.id 
  AND a.title = b.title 
  AND a.topic = b.topic 
  AND a.tier = b.tier;

SELECT 'Duplicate quests removed' as status;

-- ============================================
-- 2. DELETE DUPLICATE ITEMS
-- ============================================
-- Keep the oldest item (lowest id) for each (name, rarity_tier) combination

SELECT '=== REMOVING DUPLICATE ITEMS ===' as action;

DELETE FROM items a
USING items b
WHERE a.id > b.id 
  AND a.name = b.name 
  AND a.rarity_tier = b.rarity_tier;

SELECT 'Duplicate items removed' as status;

-- ============================================
-- 3. CLEANUP ORPHANED USER DATA
-- ============================================
-- Remove user_completed_quests entries pointing to deleted quests

SELECT '=== CLEANING ORPHANED USER QUESTS ===' as action;

DELETE FROM user_completed_quests ucq
WHERE NOT EXISTS (
    SELECT 1 FROM quests q WHERE q.id = ucq.quest_id
);

SELECT 'Orphaned user quest entries removed' as status;

-- Remove user_items entries pointing to deleted items

SELECT '=== CLEANING ORPHANED USER ITEMS ===' as action;

DELETE FROM user_items ui
WHERE NOT EXISTS (
    SELECT 1 FROM items i WHERE i.id = ui.item_id
);

SELECT 'Orphaned user item entries removed' as status;

-- ============================================
-- 4. SHOW RESULTS
-- ============================================

SELECT '=== CLEANUP COMPLETE - CURRENT STATE ===' as summary;

SELECT 'Quests per tier:' as info;
SELECT tier, COUNT(*) as count 
FROM quests 
GROUP BY tier 
ORDER BY tier;

SELECT 'Items per tier:' as info;
SELECT rarity_tier as tier, COUNT(*) as count 
FROM items 
GROUP BY rarity_tier 
ORDER BY rarity_tier;

SELECT 'Total counts:' as info;
SELECT 
    (SELECT COUNT(*) FROM quests) as total_quests,
    (SELECT COUNT(*) FROM items) as total_items,
    (SELECT COUNT(*) FROM user_completed_quests) as active_user_quests,
    (SELECT COUNT(*) FROM user_items) as user_owned_items;

-- ============================================
-- COMMIT OR ROLLBACK
-- ============================================
-- If everything looks good, commit the transaction
-- If there are issues, you can ROLLBACK instead

-- COMMIT;
-- Uncomment the line above to apply changes
-- Or run: ROLLBACK; to undo everything

SELECT 'Transaction ready. Run COMMIT; to apply changes or ROLLBACK; to undo.' as notice;

