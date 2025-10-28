-- ============================================
-- Duplicate Detection & Database Diagnostics
-- ============================================
-- This script helps identify duplicate quests and items in the database
-- Run this to diagnose the current state before cleanup

-- ============================================
-- 1. CHECK FOR DUPLICATE QUESTS
-- ============================================

SELECT '=== DUPLICATE QUESTS ===' as section;

SELECT 
    title, 
    topic, 
    tier, 
    COUNT(*) as duplicate_count,
    STRING_AGG(id::text, ', ') as duplicate_ids
FROM quests
GROUP BY title, topic, tier
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, tier;

-- ============================================
-- 2. CHECK FOR DUPLICATE ITEMS
-- ============================================

SELECT '=== DUPLICATE ITEMS ===' as section;

SELECT 
    name, 
    rarity_tier, 
    COUNT(*) as duplicate_count,
    STRING_AGG(id::text, ', ') as duplicate_ids
FROM items
GROUP BY name, rarity_tier
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, rarity_tier;

-- ============================================
-- 3. QUEST COUNT BY TIER
-- ============================================

SELECT '=== QUEST COUNT BY TIER ===' as section;

SELECT 
    tier, 
    COUNT(*) as quest_count
FROM quests
GROUP BY tier
ORDER BY tier;

-- ============================================
-- 4. ITEM COUNT BY TIER
-- ============================================

SELECT '=== ITEM COUNT BY TIER ===' as section;

SELECT 
    rarity_tier as tier, 
    COUNT(*) as item_count
FROM items
GROUP BY rarity_tier
ORDER BY rarity_tier;

-- ============================================
-- 5. TOTAL COUNTS
-- ============================================

SELECT '=== TOTAL COUNTS ===' as section;

SELECT 
    (SELECT COUNT(*) FROM quests) as total_quests,
    (SELECT COUNT(*) FROM items) as total_items,
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM user_completed_quests) as total_user_quests,
    (SELECT COUNT(*) FROM user_items) as total_user_items;

-- ============================================
-- 6. QUEST TOPICS SUMMARY
-- ============================================

SELECT '=== QUESTS BY TOPIC ===' as section;

SELECT 
    topic,
    COUNT(*) as quest_count,
    MIN(tier) as min_tier,
    MAX(tier) as max_tier
FROM quests
GROUP BY topic
ORDER BY topic;

-- ============================================
-- 7. CHECK FOR ORPHANED USER DATA
-- ============================================

SELECT '=== ORPHANED USER QUEST DATA ===' as section;

SELECT COUNT(*) as orphaned_user_quests
FROM user_completed_quests ucq
LEFT JOIN quests q ON ucq.quest_id = q.id
WHERE q.id IS NULL;

SELECT '=== ORPHANED USER ITEM DATA ===' as section;

SELECT COUNT(*) as orphaned_user_items
FROM user_items ui
LEFT JOIN items i ON ui.item_id = i.id
WHERE i.id IS NULL;

