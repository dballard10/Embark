-- Embark MVP Seed Data
-- Run this after creating the schema

-- Insert test user
INSERT INTO users (username, total_glory, total_xp, level) VALUES
('TestHero', 15000, 24000, 2);

-- Store user ID for reference
DO $$
DECLARE
    test_user_id UUID;
BEGIN
    SELECT id INTO test_user_id FROM users WHERE username = 'TestHero';

    -- Insert items (one for each tier)
    INSERT INTO items (id, name, description, rarity_tier, rarity_stars, image_url, price) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Bronze Compass', 'A simple compass for new adventurers', 1, 1, NULL, 0),
    ('22222222-2222-2222-2222-222222222222', 'Silver Blade', 'A well-crafted sword for seasoned warriors', 2, 2, NULL, 0),
    ('33333333-3333-3333-3333-333333333333', 'Golden Shield', 'An enchanted shield that deflects harm', 3, 3, NULL, 0),
    ('44444444-4444-4444-4444-444444444444', 'Diamond Amulet', 'A precious amulet radiating power', 4, 4, NULL, 0),
    ('55555555-5555-5555-5555-555555555555', 'Obsidian Crown', 'A legendary crown worn by masters', 5, 5, NULL, 0),
    ('66666666-6666-6666-6666-666666666666', 'Phoenix Essence', 'The mythical essence of a phoenix', 6, 6, NULL, 1000000);

    -- Insert quests (one for each tier)
    INSERT INTO quests (title, description, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id) VALUES
    (
        'Morning Workout',
        'Complete a 30-minute workout session to start your day strong.',
        1,
        1000,
        1000,
        24,
        '11111111-1111-1111-1111-111111111111'
    ),
    (
        'Learn Something New',
        'Spend 1 hour learning a new skill or studying a topic of interest.',
        2,
        3000,
        3000,
        48,
        '22222222-2222-2222-2222-222222222222'
    ),
    (
        'Creative Project',
        'Work on a creative project for 2 hours (art, music, writing, coding).',
        3,
        5000,
        5000,
        72,
        '33333333-3333-3333-3333-333333333333'
    ),
    (
        'Social Connection',
        'Have a meaningful conversation or spend quality time with friends/family.',
        4,
        8000,
        8000,
        48,
        '44444444-4444-4444-4444-444444444444'
    ),
    (
        'Major Milestone',
        'Complete a significant milestone in a long-term project or goal.',
        5,
        15000,
        15000,
        168,
        '55555555-5555-5555-5555-555555555555'
    ),
    (
        'Epic Achievement',
        'Accomplish something truly extraordinary that pushes your limits.',
        6,
        30000,
        30000,
        336,
        '66666666-6666-6666-6666-666666666666'
    );

    -- Add a sample completed quest and item for the test user
    INSERT INTO user_items (user_id, item_id, is_featured) 
    SELECT test_user_id, '11111111-1111-1111-1111-111111111111', TRUE;

    INSERT INTO user_completed_quests (user_id, quest_id, started_at, completed_at, deadline_at, is_active)
    SELECT 
        test_user_id,
        id,
        NOW() - INTERVAL '2 days',
        NOW() - INTERVAL '1 day',
        NOW() - INTERVAL '1 day',
        FALSE
    FROM quests WHERE title = 'Morning Workout';

END $$;

