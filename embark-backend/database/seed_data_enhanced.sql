-- Embark MVP Enhanced Seed Data
-- Run this after creating the schema for diverse test data

-- Insert test users with varying levels
INSERT INTO users (username, total_glory, total_xp, level) VALUES
('TestHero', 15000, 24000, 2),
('DevChampion', 45000, 78000, 4),
('QuestMaster', 180000, 320000, 8);

-- Store user IDs for reference
DO $$
DECLARE
    test_user_id UUID;
    dev_user_id UUID;
    quest_master_id UUID;
BEGIN
    SELECT id INTO test_user_id FROM users WHERE username = 'TestHero';
    SELECT id INTO dev_user_id FROM users WHERE username = 'DevChampion';
    SELECT id INTO quest_master_id FROM users WHERE username = 'QuestMaster';

    -- ========================================
    -- items (3 per tier, diverse themes)
    -- ========================================
    
    -- Tier 1 items (Common)
    INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Bronze Compass', 'A simple compass for new adventurers', 1, 1, 0),
    ('11111111-1111-1111-1111-111111111112', 'Wooden Training Sword', 'Perfect for beginners learning the basics', 1, 1, 0),
    ('11111111-1111-1111-1111-111111111113', 'Leather Journal', 'Record your early victories and lessons', 1, 1, 0);

    -- Tier 2 items (Uncommon)
    INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
    ('22222222-2222-2222-2222-222222222221', 'Silver Blade', 'A well-crafted sword for seasoned warriors', 2, 2, 0),
    ('22222222-2222-2222-2222-222222222222', 'Enchanted Quill', 'Write with creativity and precision', 2, 2, 0),
    ('22222222-2222-2222-2222-222222222223', 'Crystal Hourglass', 'Master the flow of time itself', 2, 2, 0);

    -- Tier 3 items (Rare)
    INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
    ('33333333-3333-3333-3333-333333333331', 'Golden Shield', 'An enchanted shield that deflects harm', 3, 3, 0),
    ('33333333-3333-3333-3333-333333333332', 'Spellbound Lute', 'Create music that moves hearts and minds', 3, 3, 0),
    ('33333333-3333-3333-3333-333333333333', 'Sage Robes', 'Garments worn by masters of knowledge', 3, 3, 0);

    -- Tier 4 items (Epic)
    INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
    ('44444444-4444-4444-4444-444444444441', 'Diamond Amulet', 'A precious amulet radiating power', 4, 4, 0),
    ('44444444-4444-4444-4444-444444444442', 'Starlight Bow', 'Arrows guided by celestial precision', 4, 4, 0),
    ('44444444-4444-4444-4444-444444444443', 'Wisdom Tome', 'Ancient knowledge bound in mystic pages', 4, 4, 0);

    -- Tier 5 items (Legendary)
    INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
    ('55555555-5555-5555-5555-555555555551', 'Obsidian Crown', 'A legendary crown worn by masters', 5, 5, 0),
    ('55555555-5555-5555-5555-555555555552', 'Dragonscale Armor', 'Impenetrable defense forged from dragon hide', 5, 5, 0),
    ('55555555-5555-5555-5555-555555555553', 'Eternal Flame Blade', 'A sword burning with undying fire', 5, 5, 0);

    -- Tier 6 items (Mythic)
    INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
    ('66666666-6666-6666-6666-666666666661', 'Phoenix Essence', 'The mythical essence of a phoenix', 6, 6, 1000000),
    ('66666666-6666-6666-6666-666666666662', 'Titan Heart Stone', 'A crystallized heart of an ancient titan', 6, 6, 1000000),
    ('66666666-6666-6666-6666-666666666663', 'Crown of Infinity', 'Transcend the limits of mortal achievement', 6, 6, 1000000);

    -- ========================================
    -- QUESTS - Tier 1 (Common)
    -- ========================================
    
    INSERT INTO quests (title, description, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id) VALUES
    -- Health & Fitness
    (
        'Morning Workout',
        'Complete a 30-minute workout session to start your day strong.',
        1, 1000, 1000, 24,
        '11111111-1111-1111-1111-111111111111'
    ),
    (
        'Hydration Hero',
        'Drink 8 glasses of water throughout the day.',
        1, 800, 800, 24,
        '11111111-1111-1111-1111-111111111112'
    ),
    (
        'Early Bird',
        'Wake up before 7 AM and start your day with intention.',
        1, 900, 900, 24,
        '11111111-1111-1111-1111-111111111113'
    ),
    
    -- Learning & Growth
    (
        'Quick Study',
        'Spend 30 minutes learning something new.',
        1, 1000, 1000, 24,
        '11111111-1111-1111-1111-111111111111'
    ),
    
    -- Productivity
    (
        'Task Master',
        'Complete 5 items on your to-do list.',
        1, 950, 950, 24,
        '11111111-1111-1111-1111-111111111112'
    );

    -- ========================================
    -- QUESTS - Tier 2 (Uncommon)
    -- ========================================
    
    INSERT INTO quests (title, description, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id) VALUES
    -- Health & Fitness
    (
        'Meditation Master',
        'Practice mindfulness meditation for 20 minutes.',
        2, 2500, 2500, 48,
        '22222222-2222-2222-2222-222222222221'
    ),
    (
        'Fitness Streak',
        'Exercise for 3 consecutive days.',
        2, 3000, 3000, 72,
        '22222222-2222-2222-2222-222222222222'
    ),
    
    -- Learning & Growth
    (
        'Knowledge Seeker',
        'Read 50 pages of a non-fiction book.',
        2, 2800, 2800, 48,
        '22222222-2222-2222-2222-222222222223'
    ),
    (
        'Skill Builder',
        'Spend 2 hours practicing a new skill.',
        2, 3000, 3000, 48,
        '22222222-2222-2222-2222-222222222221'
    ),
    
    -- Social
    (
        'Connection Quest',
        'Have a meaningful 30-minute conversation with someone.',
        2, 2500, 2500, 48,
        '22222222-2222-2222-2222-222222222222'
    );

    -- ========================================
    -- QUESTS - Tier 3 (Rare)
    -- ========================================
    
    INSERT INTO quests (title, description, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id) VALUES
    -- Creativity
    (
        'Creative Expression',
        'Work on a creative project for 2 hours (art, music, writing, coding).',
        3, 5000, 5000, 72,
        '33333333-3333-3333-3333-333333333331'
    ),
    (
        'Content Creator',
        'Create and publish original content online.',
        3, 5500, 5500, 96,
        '33333333-3333-3333-3333-333333333332'
    ),
    
    -- Learning & Growth
    (
        'Course Completion',
        'Complete a full module or chapter of an online course.',
        3, 5000, 5000, 72,
        '33333333-3333-3333-3333-333333333333'
    ),
    
    -- Productivity
    (
        'Deep Work Session',
        'Complete 4 hours of focused, distraction-free work.',
        3, 5500, 5500, 48,
        '33333333-3333-3333-3333-333333333331'
    ),
    
    -- Adventure
    (
        'New Experience',
        'Try something you have never done before.',
        3, 4800, 4800, 72,
        '33333333-3333-3333-3333-333333333332'
    );

    -- ========================================
    -- QUESTS - Tier 4 (Epic)
    -- ========================================
    
    INSERT INTO quests (title, description, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id) VALUES
    -- Social
    (
        'Community Builder',
        'Organize or participate in a community event.',
        4, 8000, 8000, 96,
        '44444444-4444-4444-4444-444444444441'
    ),
    (
        'Mentor Session',
        'Help someone learn a skill or solve a problem.',
        4, 7500, 7500, 72,
        '44444444-4444-4444-4444-444444444442'
    ),
    
    -- Learning & Growth
    (
        'Master Class',
        'Complete a comprehensive course or certification.',
        4, 9000, 9000, 168,
        '44444444-4444-4444-4444-444444444443'
    ),
    
    -- Health & Fitness
    (
        'Endurance Challenge',
        'Complete a challenging physical feat (run 10K, climb a mountain, etc.).',
        4, 8500, 8500, 120,
        '44444444-4444-4444-4444-444444444441'
    ),
    
    -- Productivity
    (
        'Project Launch',
        'Complete and launch a side project or feature.',
        4, 9000, 9000, 168,
        '44444444-4444-4444-4444-444444444442'
    );

    -- ========================================
    -- QUESTS - Tier 5 (Legendary)
    -- ========================================
    
    INSERT INTO quests (title, description, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id) VALUES
    -- Major Achievements
    (
        'Major Milestone',
        'Complete a significant milestone in a long-term project or goal.',
        5, 15000, 15000, 168,
        '55555555-5555-5555-5555-555555555551'
    ),
    (
        'Transformation Journey',
        'Complete a 30-day challenge that transforms a habit or skill.',
        5, 16000, 16000, 720,
        '55555555-5555-5555-5555-555555555552'
    ),
    
    -- Creative
    (
        'Masterpiece Creation',
        'Create a substantial creative work (book chapter, album, game, app).',
        5, 17000, 17000, 336,
        '55555555-5555-5555-5555-555555555553'
    ),
    
    -- Social Impact
    (
        'Life Changer',
        'Make a significant positive impact on someone''s life.',
        5, 15500, 15500, 168,
        '55555555-5555-5555-5555-555555555551'
    );

    -- ========================================
    -- QUESTS - Tier 6 (Mythic)
    -- ========================================
    
    INSERT INTO quests (title, description, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id) VALUES
    -- Ultimate Challenges
    (
        'Epic Achievement',
        'Accomplish something truly extraordinary that pushes your limits.',
        6, 30000, 30000, 336,
        '66666666-6666-6666-6666-666666666661'
    ),
    (
        'Legacy Builder',
        'Create something that will impact others for years to come.',
        6, 35000, 35000, 720,
        '66666666-6666-6666-6666-666666666662'
    ),
    (
        'Ultimate Transformation',
        'Complete a year-long journey that fundamentally changes your life.',
        6, 40000, 40000, 8760,
        '66666666-6666-6666-6666-666666666663'
    );

    -- ========================================
    -- USER DATA - Give users some items and completed quests
    -- ========================================
    
    -- TestHero (Level 2) - Has completed a few Tier 1 quests
    INSERT INTO user_items (user_id, item_id, is_featured) VALUES
    (test_user_id, '11111111-1111-1111-1111-111111111111', TRUE),
    (test_user_id, '11111111-1111-1111-1111-111111111112', FALSE);

    INSERT INTO user_completed_quests (user_id, quest_id, started_at, completed_at, deadline_at, is_active)
    SELECT 
        test_user_id,
        id,
        NOW() - INTERVAL '2 days',
        NOW() - INTERVAL '1 day',
        NOW() + INTERVAL '1 day',
        FALSE
    FROM quests WHERE title IN ('Morning Workout', 'Hydration Hero');

    -- DevChampion (Level 4) - Has completed various quests up to Tier 3
    INSERT INTO user_items (user_id, item_id, is_featured) VALUES
    (dev_user_id, '11111111-1111-1111-1111-111111111111', FALSE),
    (dev_user_id, '22222222-2222-2222-2222-222222222221', FALSE),
    (dev_user_id, '22222222-2222-2222-2222-222222222222', FALSE),
    (dev_user_id, '33333333-3333-3333-3333-333333333331', TRUE),
    (dev_user_id, '33333333-3333-3333-3333-333333333332', FALSE);

    INSERT INTO user_completed_quests (user_id, quest_id, started_at, completed_at, deadline_at, is_active)
    SELECT 
        dev_user_id,
        id,
        NOW() - INTERVAL '7 days',
        NOW() - INTERVAL '5 days',
        NOW() - INTERVAL '3 days',
        FALSE
    FROM quests WHERE title IN ('Task Master', 'Meditation Master', 'Skill Builder', 'Creative Expression', 'Deep Work Session');

    -- QuestMaster (Level 8) - Has a rich history with high-tier items
    INSERT INTO user_items (user_id, item_id, is_featured) VALUES
    (quest_master_id, '33333333-3333-3333-3333-333333333331', FALSE),
    (quest_master_id, '44444444-4444-4444-4444-444444444441', FALSE),
    (quest_master_id, '44444444-4444-4444-4444-444444444442', FALSE),
    (quest_master_id, '55555555-5555-5555-5555-555555555551', TRUE),
    (quest_master_id, '55555555-5555-5555-5555-555555555552', FALSE),
    (quest_master_id, '55555555-5555-5555-5555-555555555553', FALSE);

    INSERT INTO user_completed_quests (user_id, quest_id, started_at, completed_at, deadline_at, is_active)
    SELECT 
        quest_master_id,
        id,
        NOW() - INTERVAL '30 days',
        NOW() - INTERVAL '25 days',
        NOW() - INTERVAL '20 days',
        FALSE
    FROM quests WHERE title IN ('Community Builder', 'Master Class', 'Project Launch', 'Major Milestone', 'Masterpiece Creation');

    -- Give TestHero an active quest
    INSERT INTO user_completed_quests (user_id, quest_id, started_at, completed_at, deadline_at, is_active)
    SELECT 
        test_user_id,
        id,
        NOW(),
        NULL,
        NOW() + INTERVAL '24 hours',
        TRUE
    FROM quests WHERE title = 'Quick Study' LIMIT 1;

END $$;

