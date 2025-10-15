-- Add Quests for New Items
-- This brings the total to 9 quests per tier (matching the 9 items per tier)
-- Run this in your Supabase SQL Editor after adding the new items

-- ========================================
-- TIER 1 QUESTS (Need 4 more for 9 total)
-- ========================================

INSERT INTO quests (title, description, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id) VALUES
(
    'Daily Journal',
    'Write down your thoughts and reflections for today.',
    1, 850, 850, 24,
    '11111111-1111-1111-1111-111111111113'
),
(
    'Clean Workspace',
    'Organize and tidy your workspace for maximum productivity.',
    1, 800, 800, 24,
    '11111111-1111-1111-1111-111111111114'
),
(
    'Mindful Walk',
    'Take a 20-minute walk outside and practice mindfulness.',
    1, 900, 900, 24,
    '11111111-1111-1111-1111-111111111115'
),
(
    'Gratitude Practice',
    'Write down 3 things you are grateful for today.',
    1, 850, 850, 24,
    '11111111-1111-1111-1111-111111111116'
);

-- ========================================
-- TIER 2 QUESTS (Need 4 more for 9 total)
-- ========================================

INSERT INTO quests (title, description, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id) VALUES
(
    'Strength Training',
    'Complete a 45-minute strength training workout.',
    2, 2800, 2800, 48,
    '22222222-2222-2222-2222-222222222223'
),
(
    'Language Practice',
    'Practice a new language for 1 hour.',
    2, 2700, 2700, 48,
    '22222222-2222-2222-2222-222222222224'
),
(
    'Meal Prep Master',
    'Prepare healthy meals for the next 3 days.',
    2, 3000, 3000, 48,
    '22222222-2222-2222-2222-222222222225'
),
(
    'Digital Detox',
    'Spend 4 hours away from all screens and digital devices.',
    2, 2900, 2900, 48,
    '22222222-2222-2222-2222-222222222226'
);

-- ========================================
-- TIER 3 QUESTS (Need 4 more for 9 total)
-- ========================================

INSERT INTO quests (title, description, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id) VALUES
(
    'Portfolio Project',
    'Add a new project to your portfolio or resume.',
    3, 5200, 5200, 96,
    '33333333-3333-3333-3333-333333333333'
),
(
    'Public Speaking',
    'Give a presentation or speak publicly about a topic you know.',
    3, 5500, 5500, 72,
    '33333333-3333-3333-3333-333333333334'
),
(
    'Nature Adventure',
    'Spend a full day exploring nature (hiking, camping, etc.).',
    3, 4800, 4800, 72,
    '33333333-3333-3333-3333-333333333335'
),
(
    'Skill Mastery Session',
    'Practice a skill intensively for 6 hours to push past a plateau.',
    3, 5300, 5300, 72,
    '33333333-3333-3333-3333-333333333336'
);

-- ========================================
-- TIER 4 QUESTS (Need 4 more for 9 total)
-- ========================================

INSERT INTO quests (title, description, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id) VALUES
(
    'Networking Champion',
    'Attend a professional event and make 5 meaningful connections.',
    4, 8000, 8000, 96,
    '44444444-4444-4444-4444-444444444443'
),
(
    'Innovation Sprint',
    'Develop and prototype a new idea or solution.',
    4, 9000, 9000, 120,
    '44444444-4444-4444-4444-444444444444'
),
(
    'Volunteer Leader',
    'Lead a volunteer project or charity event.',
    4, 8500, 8500, 168,
    '44444444-4444-4444-4444-444444444445'
),
(
    'Financial Goal',
    'Achieve a significant financial milestone or savings goal.',
    4, 9000, 9000, 168,
    '44444444-4444-4444-4444-444444444446'
);

-- ========================================
-- TIER 5 QUESTS (Need 5 more for 9 total)
-- ========================================

INSERT INTO quests (title, description, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id) VALUES
(
    'Competition Victor',
    'Win or place in a competitive event in your field.',
    5, 17000, 17000, 336,
    '55555555-5555-5555-5555-555555555553'
),
(
    'Professional Certification',
    'Earn a professional certification or advanced degree.',
    5, 18000, 18000, 720,
    '55555555-5555-5555-5555-555555555554'
),
(
    'Community Impact Project',
    'Launch a project that positively impacts your community.',
    5, 16500, 16500, 336,
    '55555555-5555-5555-5555-555555555555'
),
(
    'Breakthrough Achievement',
    'Achieve a personal breakthrough that seemed impossible.',
    5, 17500, 17500, 336,
    '55555555-5555-5555-5555-555555555556'
),
(
    'Mentor Program Leader',
    'Create and run a mentorship program for others.',
    5, 16000, 16000, 336,
    '55555555-5555-5555-5555-555555555557'
);

-- ========================================
-- TIER 6 QUESTS (Need 6 more for 9 total)
-- ========================================

INSERT INTO quests (title, description, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id) VALUES
(
    'World Record Attempt',
    'Attempt to break or set a world record in your domain.',
    6, 35000, 35000, 720,
    '66666666-6666-6666-6666-666666666663'
),
(
    'Industry Disruptor',
    'Create an innovation that disrupts or transforms your industry.',
    6, 40000, 40000, 1440,
    '66666666-6666-6666-6666-666666666664'
),
(
    'Global Impact',
    'Launch an initiative that impacts people worldwide.',
    6, 45000, 45000, 2160,
    '66666666-6666-6666-6666-666666666665'
),
(
    'Mastery Achieved',
    'Reach the pinnacle of mastery in your chosen field.',
    6, 38000, 38000, 4380,
    '66666666-6666-6666-6666-666666666666'
),
(
    'Legendary Contribution',
    'Make a contribution that will be remembered for generations.',
    6, 42000, 42000, 4380,
    '66666666-6666-6666-6666-666666666667'
),
(
    'Impossible Dream',
    'Accomplish a lifelong dream that others thought impossible.',
    6, 50000, 50000, 8760,
    '66666666-6666-6666-6666-666666666668'
);

