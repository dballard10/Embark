-- ============================================
-- NUCLEAR OPTION: Complete Database Reset
-- ============================================
-- ⚠️  WARNING: This script deletes ALL quest and item data!
-- ⚠️  User accounts are preserved, but all progress is lost
-- 
-- Use this when:
-- - You want a completely fresh start
-- - Duplicates are too complex to clean up
-- - You want to re-seed from scratch
--
-- IMPORTANT: Backup your database before running this!

-- ============================================
-- SAFETY CHECK
-- ============================================
-- This script is deliberately verbose to prevent accidental execution
-- You must understand what you're doing before proceeding

SELECT '⚠️  WARNING: YOU ARE ABOUT TO DELETE ALL GAME DATA ⚠️' as warning;
SELECT 'This will remove all quests, items, and user progress' as impact;
SELECT 'User accounts will be preserved' as note;
SELECT 'Press Ctrl+C now if this was a mistake!' as action;

-- Wait a moment... (you should read the above)

-- ============================================
-- BEGIN RESET
-- ============================================

BEGIN;

-- ============================================
-- 1. DELETE USER PROGRESS DATA
-- ============================================

SELECT '=== STEP 1: Removing user quest progress ===' as status;
TRUNCATE TABLE user_completed_quests CASCADE;

SELECT '=== STEP 2: Removing user items ===' as status;
TRUNCATE TABLE user_items CASCADE;

-- ============================================
-- 2. DELETE GAME CONTENT
-- ============================================

SELECT '=== STEP 3: Removing all quests ===' as status;
TRUNCATE TABLE quests CASCADE;

SELECT '=== STEP 4: Removing all items ===' as status;
TRUNCATE TABLE items CASCADE;

-- ============================================
-- 3. VERIFY CLEAN STATE
-- ============================================

SELECT '=== RESET COMPLETE - VERIFICATION ===' as summary;

SELECT 
    (SELECT COUNT(*) FROM quests) as remaining_quests,
    (SELECT COUNT(*) FROM items) as remaining_items,
    (SELECT COUNT(*) FROM user_completed_quests) as remaining_user_quests,
    (SELECT COUNT(*) FROM user_items) as remaining_user_items,
    (SELECT COUNT(*) FROM users) as users_preserved;

-- ============================================
-- NEXT STEPS
-- ============================================

SELECT '=== NEXT STEPS ===' as guide;
SELECT 'Database is now empty and ready for fresh seeding' as step_1;
SELECT 'Run seed scripts in this order:' as step_2;
SELECT '  1. seed_data_enhanced.sql (for items)' as step_2a;
SELECT '  2. add_18_new_items.sql' as step_2b;
SELECT '  3. add_18_more_items.sql' as step_2c;
SELECT '  4. add_36_elemental_items.sql' as step_2d;
SELECT '  5. seed_topic_quests.sql (for quests)' as step_2e;
SELECT 'See SEEDING_GUIDE.md for detailed instructions' as step_3;

-- ============================================
-- COMMIT OR ROLLBACK
-- ============================================

-- COMMIT;
-- Uncomment the line above to permanently delete all data
-- Or run: ROLLBACK; to cancel the reset

SELECT 'Transaction ready. Run COMMIT; to apply reset or ROLLBACK; to cancel.' as notice;

