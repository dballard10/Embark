-- Seed Data: Topic-Based Quest Progressions with Enemy Lineages
-- 90 quests organized into 15 topics with 6 progressive difficulty tiers each
-- Each topic has a consistent enemy lineage that evolves across all tiers

-- ========================================
-- RUNNING (Wind Elemental Lineage)
-- ========================================

INSERT INTO quests (title, description, topic, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id, enemy_name, enemy_type, enemy_description, enemy_image_url) VALUES
(
    'First Mile',
    'Run your first mile without stopping. Start your running journey today.',
    'Running', 1, 1000, 1000, 24,
    '11111111-1111-1111-1111-111111111111',
    'Wind Sprite', 'Elemental Spirit', 'A playful spirit of wind that dances around you, testing your speed with gentle gusts.', NULL
),
(
    '5K Runner',
    'Complete a 5K run (3.1 miles). Build your endurance and confidence.',
    'Running', 2, 2500, 2500, 48,
    '22222222-2222-2222-2222-222222222221',
    'Gale Spirit', 'Wind Spirit', 'A swift wind spirit that pushes against you with growing force, demanding greater endurance.', NULL
),
(
    '10K Champion',
    'Run a full 10K (6.2 miles). Double your distance and push your limits.',
    'Running', 3, 5000, 5000, 72,
    '33333333-3333-3333-3333-333333333331',
    'Storm Elemental', 'Storm Being', 'A powerful elemental of churning winds and rain, challenging your determination to run through any weather.', NULL
),
(
    'Half Marathon Hero',
    'Complete a half marathon (13.1 miles). Join the elite distance runners.',
    'Running', 4, 8000, 8000, 120,
    '44444444-4444-4444-4444-444444444441',
    'Tempest Lord', 'Storm Lord', 'A commanding lord of tempests who races alongside legendary runners, testing ultimate stamina.', NULL
),
(
    'Marathon Master',
    'Run a full marathon (26.2 miles). Prove your legendary endurance.',
    'Running', 5, 15000, 15000, 168,
    '55555555-5555-5555-5555-555555555551',
    'Hurricane Primordial', 'Primordial Storm', 'An ancient primordial force of endless hurricanes, the embodiment of relentless motion.', NULL
),
(
    'Ultramarathon Legend',
    'Complete a 50-mile ultramarathon. Transcend human limits.',
    'Running', 6, 30000, 30000, 336,
    '66666666-6666-6666-6666-666666666661',
    'Celestial Windstorm', 'Cosmic Wind Entity', 'A cosmic entity of eternal winds that circle the world without rest, the ultimate test of endurance.', NULL
);

-- ========================================
-- WEIGHT LIFTING (Orc Lineage)
-- ========================================

INSERT INTO quests (title, description, topic, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id, enemy_name, enemy_type, enemy_description, enemy_image_url) VALUES
(
    'First Workout',
    'Complete your first strength training session. Begin building power.',
    'Weight Lifting', 1, 950, 950, 24,
    '11111111-1111-1111-1111-111111111112',
    'Grunt Orc', 'Orc Warrior', 'A young orc grunt learning the ways of strength, eager to prove himself through combat.', NULL
),
(
    'Weekly Warrior',
    'Train consistently for one week (3+ sessions). Establish the habit.',
    'Weight Lifting', 2, 2600, 2600, 168,
    '22222222-2222-2222-2222-222222222222',
    'Battle Orc', 'Orc Fighter', 'A battle-hardened orc who has survived countless fights through raw power and discipline.', NULL
),
(
    'Monthly Grind',
    'Complete a full month of strength training (12+ sessions). Show dedication.',
    'Weight Lifting', 3, 5200, 5200, 720,
    '33333333-3333-3333-3333-333333333332',
    'Orc Captain', 'Orc Commander', 'A commanding orc captain who leads through superior strength and tactical prowess.', NULL
),
(
    'Advanced Athlete',
    'Master advanced exercises: pull-ups, pistol squats, or heavy compounds.',
    'Weight Lifting', 4, 8200, 8200, 168,
    '44444444-4444-4444-4444-444444444442',
    'Orc Warchief', 'Orc Leader', 'A fearsome warchief whose legendary strength has never been matched in single combat.', NULL
),
(
    'Six-Month Transformation',
    'Train consistently for 6 months (70+ sessions). Transform your body.',
    'Weight Lifting', 5, 15500, 15500, 4320,
    '55555555-5555-5555-5555-555555555552',
    'Orc King', 'Orc Monarch', 'The mighty king of all orcs, whose power has been perfected through decades of relentless training.', NULL
),
(
    'Competition Ready',
    'Compete in a strength competition or achieve elite strength standards.',
    'Weight Lifting', 6, 31000, 31000, 336,
    '66666666-6666-6666-6666-666666666662',
    'Immortal Orc Emperor', 'Eternal Orc', 'An immortal emperor who has transcended normal limits, achieving strength beyond mortal comprehension.', NULL
);

-- ========================================
-- KNOWLEDGE (Scholar Undead Lineage)
-- ========================================

INSERT INTO quests (title, description, topic, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id, enemy_name, enemy_type, enemy_description, enemy_image_url) VALUES
(
    'First Chapter',
    'Read one complete book. Open your mind to new ideas.',
    'Knowledge', 1, 1000, 1000, 168,
    '11111111-1111-1111-1111-111111111113',
    'Dusty Skeleton', 'Scholarly Undead', 'A skeletal scholar who hoards dusty tomes, jealously guarding the first steps of knowledge.', NULL
),
(
    'Bookworm Beginner',
    'Read 5 books. Develop a consistent reading habit.',
    'Knowledge', 2, 2500, 2500, 720,
    '22222222-2222-2222-2222-222222222223',
    'Book Wraith', 'Library Wraith', 'A spectral wraith that haunts ancient libraries, challenging those who seek deeper wisdom.', NULL
),
(
    'Monthly Reader',
    'Read 12 books (one per month for a year). Make reading a lifestyle.',
    'Knowledge', 3, 5000, 5000, 8760,
    '33333333-3333-3333-3333-333333333333',
    'Scholar Specter', 'Academic Spirit', 'An ethereal scholar who has read countless volumes, testing your dedication to learning.', NULL
),
(
    'Voracious Reader',
    'Read 25 books. Become deeply knowledgeable.',
    'Knowledge', 4, 8000, 8000, 8760,
    '44444444-4444-4444-4444-444444444443',
    'Ancient Lich', 'Undead Sage', 'An ancient lich who has studied for centuries, guarding advanced knowledge jealously.', NULL
),
(
    'Literary Master',
    'Read 52 books (one per week for a year). Join the reading elite.',
    'Knowledge', 5, 15000, 15000, 8760,
    '55555555-5555-5555-5555-555555555553',
    'Archlich Sage', 'Master Lich', 'A powerful archlich whose millennia of study have granted unfathomable wisdom.', NULL
),
(
    'Century Scholar',
    'Read 100 books. Achieve legendary knowledge through literature.',
    'Knowledge', 6, 30000, 30000, 17520,
    '66666666-6666-6666-6666-666666666663',
    'Eternal Knowledge Lich', 'Primordial Lich', 'An eternal being who has absorbed all written knowledge, the final guardian of ultimate wisdom.', NULL
);

-- ========================================
-- MEDITATION (Shadow Demon Lineage)
-- ========================================

INSERT INTO quests (title, description, topic, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id, enemy_name, enemy_type, enemy_description, enemy_image_url) VALUES
(
    'Mindful Moments',
    'Meditate for 5 minutes. Begin your journey to inner peace.',
    'Meditation', 1, 900, 900, 24,
    '11111111-1111-1111-1111-111111111111',
    'Chaos Imp', 'Shadow Imp', 'A chaotic imp born from mental noise and distraction, opposing your first steps toward stillness.', NULL
),
(
    'Ten-Day Practice',
    'Meditate daily for 10 consecutive days. Build the foundation.',
    'Meditation', 2, 2400, 2400, 240,
    '22222222-2222-2222-2222-222222222221',
    'Mind Demon', 'Lesser Demon', 'A demon that feeds on anxiety and wandering thoughts, testing your growing discipline.', NULL
),
(
    'Monthly Mindfulness',
    'Meditate every day for 30 days. Cultivate lasting calm.',
    'Meditation', 3, 4800, 4800, 720,
    '33333333-3333-3333-3333-333333333331',
    'Ego Fiend', 'Pride Demon', 'A powerful fiend embodying ego and pride, challenging your path toward humility and peace.', NULL
),
(
    'Hundred-Day Journey',
    'Maintain a 100-day meditation streak. Master your mind.',
    'Meditation', 4, 7800, 7800, 2400,
    '44444444-4444-4444-4444-444444444441',
    'Thought Demon', 'Greater Demon', 'A greater demon of pure mental chaos, the ultimate test of inner stillness and control.', NULL
),
(
    'Year of Zen',
    'Meditate daily for 365 days. Achieve profound transformation.',
    'Meditation', 5, 16000, 16000, 8760,
    '55555555-5555-5555-5555-555555555551',
    'Enlightenment Archfiend', 'Demon Lord', 'An archfiend that preys on those approaching enlightenment, the final barrier to transcendence.', NULL
),
(
    'Vipassana Master',
    'Complete a 10-day silent Vipassana meditation retreat.',
    'Meditation', 6, 32000, 32000, 720,
    '66666666-6666-6666-6666-666666666661',
    'Void Demon Lord', 'Primordial Demon', 'The primordial lord of all demons, guardian of the threshold between consciousness and void.', NULL
);

-- ========================================
-- FINANCE (Dragon Lineage)
-- ========================================

INSERT INTO quests (title, description, topic, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id, enemy_name, enemy_type, enemy_description, enemy_image_url) VALUES
(
    'First $500',
    'Save your first $500. Start building your financial foundation.',
    'Finance', 1, 1000, 1000, 720,
    '11111111-1111-1111-1111-111111111112',
    'Wyrmling Hoarder', 'Young Dragon', 'A small dragon wyrmling just beginning its first hoard, representing the start of wealth accumulation.', NULL
),
(
    '$2,500 Milestone',
    'Reach $2,500 in savings or net worth. Gain financial momentum.',
    'Finance', 2, 2500, 2500, 2160,
    '22222222-2222-2222-2222-222222222222',
    'Young Gold Dragon', 'Adolescent Dragon', 'A young dragon whose growing hoard reflects increasing financial wisdom and discipline.', NULL
),
(
    '$10K Club',
    'Achieve $10,000 in savings or net worth. Enter serious wealth building.',
    'Finance', 3, 5000, 5000, 4320,
    '33333333-3333-3333-3333-333333333332',
    'Adult Treasure Dragon', 'Adult Dragon', 'A mature dragon sitting atop a substantial hoard, guardian of significant wealth.', NULL
),
(
    '$25K Warrior',
    'Reach $25,000 in net worth. Build substantial financial security.',
    'Finance', 4, 8000, 8000, 8760,
    '44444444-4444-4444-4444-444444444442',
    'Ancient Gold Dragon', 'Ancient Dragon', 'An ancient dragon whose centuries-old hoard represents true financial mastery.', NULL
),
(
    'Six-Figure Net Worth',
    'Achieve $100,000 in net worth. Join the financially successful.',
    'Finance', 5, 15000, 15000, 17520,
    '55555555-5555-5555-5555-555555555552',
    'Legendary Platinum Dragon', 'Legendary Dragon', 'A legendary dragon of incredible wealth, its hoard the envy of kingdoms.', NULL
),
(
    'Quarter-Million Master',
    'Reach $250,000 in net worth. Achieve legendary financial status.',
    'Finance', 6, 30000, 30000, 26280,
    '66666666-6666-6666-6666-666666666662',
    'Primordial Wealth Dragon', 'Primordial Dragon', 'The first dragon ever to exist, whose eternal hoard dwarfs the treasuries of empires.', NULL
);

-- ========================================
-- COOKING (Fire Elemental Lineage)
-- ========================================

INSERT INTO quests (title, description, topic, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id, enemy_name, enemy_type, enemy_description, enemy_image_url) VALUES
(
    'Kitchen Novice',
    'Successfully cook 5 different recipes. Begin your culinary journey.',
    'Cooking', 1, 1000, 1000, 168,
    '11111111-1111-1111-1111-111111111113',
    'Flame Sprite', 'Fire Spirit', 'A mischievous sprite of cooking flames that tests your control over heat and timing.', NULL
),
(
    'Home Chef',
    'Master 20 different recipes. Become confident in the kitchen.',
    'Cooking', 2, 2500, 2500, 720,
    '22222222-2222-2222-2222-222222222223',
    'Fire Spirit', 'Culinary Flame', 'A dancing spirit of kitchen fire that demands respect and skill to harness properly.', NULL
),
(
    'Complex Cuisine',
    'Create a complex multi-course meal or difficult recipe.',
    'Cooking', 3, 5000, 5000, 168,
    '33333333-3333-3333-3333-333333333333',
    'Blaze Elemental', 'Fire Elemental', 'A powerful elemental of cooking flames, challenging you to master complex techniques.', NULL
),
(
    'Dinner Party Host',
    'Successfully host a dinner party for 6+ people with a full menu.',
    'Cooking', 4, 8000, 8000, 240,
    '44444444-4444-4444-4444-444444444443',
    'Inferno Guardian', 'Flame Guardian', 'A guardian of culinary perfection, wielding intense heat to forge master chefs.', NULL
),
(
    'Catering Champion',
    'Cater an event or cook professionally for multiple clients.',
    'Cooking', 5, 15000, 15000, 720,
    '55555555-5555-5555-5555-555555555553',
    'Volcanic Titan', 'Lava Titan', 'A massive titan of volcanic heat whose forge creates the world''s greatest cuisine.', NULL
),
(
    'Pop-Up Restaurant',
    'Run your own pop-up restaurant or food event. Become a culinary legend.',
    'Cooking', 6, 30000, 30000, 2160,
    '66666666-6666-6666-6666-666666666663',
    'Eternal Flame Primordial', 'Primordial Fire', 'The primordial flame that first taught mortals to cook, guardian of all culinary arts.', NULL
);

-- ========================================
-- LANGUAGE LEARNING (Babel Construct Lineage)
-- ========================================

INSERT INTO quests (title, description, topic, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id, enemy_name, enemy_type, enemy_description, enemy_image_url) VALUES
(
    'First 100 Words',
    'Learn 100 words in a new language. Start your linguistic journey.',
    'Language Learning', 1, 1000, 1000, 168,
    '11111111-1111-1111-1111-111111111111',
    'Word Golem', 'Stone Construct', 'A simple construct made of scattered words, representing the basic building blocks of language.', NULL
),
(
    'Basic Conversation',
    'Hold a 5-minute conversation in your target language.',
    'Language Learning', 2, 2500, 2500, 720,
    '22222222-2222-2222-2222-222222222221',
    'Phrase Construct', 'Language Golem', 'A more complex construct that speaks in full phrases, testing your conversational ability.', NULL
),
(
    'Travel Fluency',
    'Reach travel fluency - navigate a foreign country independently.',
    'Language Learning', 3, 5000, 5000, 2160,
    '33333333-3333-3333-3333-333333333331',
    'Grammar Sentinel', 'Linguistic Guardian', 'A sentinel that enforces perfect grammar and proper syntax with unwavering precision.', NULL
),
(
    'B2 Level Proficiency',
    'Achieve B2 level (upper intermediate) certification.',
    'Language Learning', 4, 8000, 8000, 4320,
    '44444444-4444-4444-4444-444444444441',
    'Polyglot Automaton', 'Multi-Language Construct', 'An advanced automaton fluent in dozens of languages, testing true linguistic mastery.', NULL
),
(
    'C1 Advanced Mastery',
    'Reach C1 level (advanced) - near-native proficiency.',
    'Language Learning', 5, 15000, 15000, 8760,
    '55555555-5555-5555-5555-555555555551',
    'Translation Colossus', 'Grand Construct', 'A colossal being that translates between all known tongues with perfect accuracy.', NULL
),
(
    'Certified Translator',
    'Become a certified translator or interpreter in your language.',
    'Language Learning', 6, 30000, 30000, 17520,
    '66666666-6666-6666-6666-666666666661',
    'Omnilingual Oracle', 'Primordial Construct', 'The first construct of Babel, speaking every language ever created or yet to be.', NULL
);

-- ========================================
-- PUZZLES (Sphinx Lineage)
-- ========================================

INSERT INTO quests (title, description, topic, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id, enemy_name, enemy_type, enemy_description, enemy_image_url) VALUES
(
    'Puzzle Beginner',
    'Complete 5 puzzles (crosswords, sudoku, chess puzzles, etc.).',
    'Puzzles', 1, 900, 900, 168,
    '11111111-1111-1111-1111-111111111112',
    'Riddle Cat', 'Feline Trickster', 'A clever cat that poses simple riddles, purring with delight at mental challenges.', NULL
),
(
    'Mind Sharpener',
    'Solve 25 increasingly difficult puzzles. Train your brain.',
    'Puzzles', 2, 2400, 2400, 720,
    '22222222-2222-2222-2222-222222222222',
    'Puzzle Lynx', 'Cunning Beast', 'A lynx whose sharp mind creates increasingly complex mental puzzles.', NULL
),
(
    'Expert Puzzler',
    'Complete expert-level puzzles or achieve high difficulty ratings.',
    'Puzzles', 3, 4900, 4900, 720,
    '33333333-3333-3333-3333-333333333332',
    'Enigma Sphinx', 'Mystical Sphinx', 'A true sphinx whose riddles have stumped travelers for generations.', NULL
),
(
    'Local Competition',
    'Compete in a local puzzle or strategy game competition.',
    'Puzzles', 4, 7900, 7900, 336,
    '44444444-4444-4444-4444-444444444442',
    'Grand Sphinx', 'Great Sphinx', 'A grand sphinx of legendary wisdom, guardian of advanced mysteries.', NULL
),
(
    'Championship Contender',
    'Place in a regional or advanced puzzle competition.',
    'Puzzles', 5, 15500, 15500, 720,
    '55555555-5555-5555-5555-555555555552',
    'Ancient Sphinx Lord', 'Sphinx Sovereign', 'An ancient sphinx lord who has witnessed civilizations rise and fall through riddles.', NULL
),
(
    'Master Puzzler',
    'Achieve master rating or win a major puzzle competition.',
    'Puzzles', 6, 31000, 31000, 1440,
    '66666666-6666-6666-6666-666666666662',
    'Eternal Riddlemaster', 'Primordial Sphinx', 'The first sphinx, whose eternal riddle has never been truly solved by any mortal.', NULL
);

-- ========================================
-- TRAVEL (Beast Lineage)
-- ========================================

INSERT INTO quests (title, description, topic, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id, enemy_name, enemy_type, enemy_description, enemy_image_url) VALUES
(
    'New City Explorer',
    'Visit a new city you have never been to before.',
    'Travel', 1, 1000, 1000, 720,
    '11111111-1111-1111-1111-111111111113',
    'Travel Wolf', 'Wild Wolf', 'A lone wolf that roams between territories, representing the call of exploration.', NULL
),
(
    'Three City Journey',
    'Explore 3 different cities. Expand your horizons.',
    'Travel', 2, 2500, 2500, 2160,
    '22222222-2222-2222-2222-222222222223',
    'Journey Dire Wolf', 'Dire Wolf', 'A powerful dire wolf that ranges far and wide, never settling in one place.', NULL
),
(
    'International Traveler',
    'Visit a foreign country. Experience a different culture.',
    'Travel', 3, 5000, 5000, 2160,
    '33333333-3333-3333-3333-333333333333',
    'Wanderlust Worg', 'Mystical Worg', 'A mystical worg driven by insatiable wanderlust to cross all borders.', NULL
),
(
    'Five Nation Explorer',
    'Visit 5 different countries. Become a seasoned traveler.',
    'Travel', 4, 8000, 8000, 8760,
    '44444444-4444-4444-4444-444444444443',
    'Expedition Beast', 'Legendary Beast', 'A legendary beast that has crossed every mountain and desert in endless exploration.', NULL
),
(
    'Global Wanderer',
    'Travel to 10 different countries. Master the art of exploration.',
    'Travel', 5, 15000, 15000, 17520,
    '55555555-5555-5555-5555-555555555553',
    'Legendary Pathfinder', 'Mythic Beast', 'A mythic creature whose paws have touched every corner of the world.', NULL
),
(
    'All Continents',
    'Visit all 7 continents. Become a legendary world explorer.',
    'Travel', 6, 30000, 30000, 43800,
    '66666666-6666-6666-6666-666666666663',
    'Primordial Wanderer', 'Eternal Beast', 'The eternal wanderer who has roamed since the dawn of time, knowing all paths.', NULL
);

-- ========================================
-- SWIMMING (Sea Serpent Lineage)
-- ========================================

INSERT INTO quests (title, description, topic, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id, enemy_name, enemy_type, enemy_description, enemy_image_url) VALUES
(
    'First Laps',
    'Swim 10 laps in a pool. Start your aquatic journey.',
    'Swimming', 1, 950, 950, 48,
    '11111111-1111-1111-1111-111111111111',
    'Water Snake', 'Aquatic Serpent', 'A small water snake that glides through pools, testing your comfort in water.', NULL
),
(
    'Fifty Lap Challenge',
    'Complete 50 laps in a single session. Build endurance.',
    'Swimming', 2, 2600, 2600, 72,
    '22222222-2222-2222-2222-222222222221',
    'Sea Serpent', 'Ocean Serpent', 'A serpent of coastal waters that challenges swimmers with currents and waves.', NULL
),
(
    'Mile Swimmer',
    'Swim a full mile (1,650 yards/1,500 meters). Prove your stamina.',
    'Swimming', 3, 5100, 5100, 96,
    '33333333-3333-3333-3333-333333333331',
    'Ocean Wyrm', 'Deep Wyrm', 'A powerful wyrm of the deep ocean, testing endurance swimmers in dark waters.', NULL
),
(
    'Five Mile Endurance',
    'Complete a 5-mile swim. Join the distance swimmers.',
    'Swimming', 4, 8100, 8100, 168,
    '44444444-4444-4444-4444-444444444441',
    'Deep Sea Serpent', 'Abyssal Serpent', 'An abyssal serpent from the ocean depths, challenging elite distance swimmers.', NULL
),
(
    'Open Water Swimmer',
    'Complete an open water swim (ocean, lake, or river distance event).',
    'Swimming', 5, 15500, 15500, 336,
    '55555555-5555-5555-5555-555555555551',
    'Leviathan', 'Sea Monster', 'The legendary leviathan that rules all open waters, ultimate aquatic challenge.', NULL
),
(
    'Triathlon Finisher',
    'Complete a triathlon with the swimming portion. Become a multi-sport legend.',
    'Swimming', 6, 31000, 31000, 720,
    '66666666-6666-6666-6666-666666666661',
    'Primordial Sea Dragon', 'Ancient Sea Dragon', 'The primordial dragon of all oceans, first serpent to swim the world''s waters.', NULL
);

-- ========================================
-- NUTRITION (Nature Spirit Lineage)
-- ========================================

INSERT INTO quests (title, description, topic, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id, enemy_name, enemy_type, enemy_description, enemy_image_url) VALUES
(
    'Nutrition Tracking',
    'Track your food intake for 7 consecutive days. Build awareness.',
    'Nutrition', 1, 900, 900, 168,
    '11111111-1111-1111-1111-111111111112',
    'Herb Sprite', 'Plant Spirit', 'A tiny sprite of garden herbs, representing the first steps toward nutritional awareness.', NULL
),
(
    'Clean Eating Month',
    'Eat clean, whole foods for 30 consecutive days. Transform your diet.',
    'Nutrition', 2, 2500, 2500, 720,
    '22222222-2222-2222-2222-222222222222',
    'Garden Spirit', 'Nature Spirit', 'A spirit of growing gardens who nurtures those seeking whole food nutrition.', NULL
),
(
    'Macro Mastery',
    'Master macro tracking and hit your targets for 30 days.',
    'Nutrition', 3, 5000, 5000, 720,
    '33333333-3333-3333-3333-333333333332',
    'Harvest Guardian', 'Nature Guardian', 'A guardian of bountiful harvests, teaching balance and proper nutrition.', NULL
),
(
    'Ninety Days Strong',
    'Maintain optimal nutrition for 90 consecutive days. Prove consistency.',
    'Nutrition', 4, 8000, 8000, 2160,
    '44444444-4444-4444-4444-444444444442',
    'Vitality Dryad', 'Forest Dryad', 'An ancient dryad whose vitality springs from perfect natural nutrition.', NULL
),
(
    'Lifestyle Transformation',
    'Live the nutrition lifestyle for 6 months. Make it permanent.',
    'Nutrition', 5, 15000, 15000, 4320,
    '55555555-5555-5555-5555-555555555552',
    'Ancient Life Treant', 'Elder Treant', 'A massive treant who has lived for millennia through perfect nutritional harmony.', NULL
),
(
    'Nutrition Coach',
    'Help others transform their nutrition. Become a legendary guide.',
    'Nutrition', 6, 30000, 30000, 2160,
    '66666666-6666-6666-6666-666666666662',
    'Primordial Nature Titan', 'Nature Primordial', 'The first titan of nature, embodiment of perfect health and nutrition since time began.', NULL
);

-- ========================================
-- DATING/RELATIONSHIPS (Cupid/Angel Lineage)
-- ========================================

INSERT INTO quests (title, description, topic, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id, enemy_name, enemy_type, enemy_description, enemy_image_url) VALUES
(
    'First Date',
    'Go on your first date (or first date in a while). Take the leap.',
    'Dating/Relationships', 1, 1000, 1000, 168,
    '11111111-1111-1111-1111-111111111113',
    'Anxious Cherub', 'Lesser Angel', 'A nervous cherub whose arrows sometimes miss, representing first-date anxiety and fear.', NULL
),
(
    'Five Dates Challenge',
    'Go on 5 different dates. Explore connections.',
    'Dating/Relationships', 2, 2500, 2500, 720,
    '22222222-2222-2222-2222-222222222223',
    'Heartbreak Cupid', 'Cupid', 'A cupid scarred by past romantic failures, testing your resilience through rejection.', NULL
),
(
    'Ten Dates Journey',
    'Complete 10 dates. Learn what you truly want.',
    'Dating/Relationships', 3, 5000, 5000, 1440,
    '33333333-3333-3333-3333-333333333333',
    'Solitude Angel', 'Guardian Angel', 'An angel who chose solitude, challenging your commitment to connection.', NULL
),
(
    'Three-Month Connection',
    'Maintain a relationship for 3 months. Build something real.',
    'Dating/Relationships', 4, 8000, 8000, 2160,
    '44444444-4444-4444-4444-444444444443',
    'Discord Seraph', 'Greater Angel', 'A seraph who sows discord to test if relationships can survive conflict.', NULL
),
(
    'One-Year Anniversary',
    'Celebrate a one-year relationship milestone. Prove your commitment.',
    'Dating/Relationships', 5, 15000, 15000, 8760,
    '55555555-5555-5555-5555-555555555553',
    'Isolation Archangel', 'Archangel', 'A powerful archangel that tempts couples apart with loneliness and doubt.', NULL
),
(
    'Life Partnership',
    'Get engaged, married, or make a major life commitment together.',
    'Dating/Relationships', 6, 30000, 30000, 17520,
    '66666666-6666-6666-6666-666666666663',
    'Eternal Bond Celestial', 'Celestial Being', 'The first celestial of love, guardian of eternal bonds and sacred partnerships.', NULL
);

-- ========================================
-- WRITING (Muse Fey Lineage)
-- ========================================

INSERT INTO quests (title, description, topic, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id, enemy_name, enemy_type, enemy_description, enemy_image_url) VALUES
(
    'First Thousand Words',
    'Write 1,000 words of creative content. Begin your writing journey.',
    'Writing', 1, 1000, 1000, 72,
    '11111111-1111-1111-1111-111111111111',
    'Blank Page Pixie', 'Fey Trickster', 'A mischievous pixie that erases words and creates writer''s block for beginners.', NULL
),
(
    'Ten Thousand Words',
    'Write 10,000 words. Build your writing stamina.',
    'Writing', 2, 2500, 2500, 336,
    '22222222-2222-2222-2222-222222222221',
    'Critic Fairy', 'Fey Critic', 'A harsh fairy who finds fault in every sentence, representing inner doubt.', NULL
),
(
    'Short Story Complete',
    'Complete a full short story (3,000-7,500 words).',
    'Writing', 3, 5000, 5000, 336,
    '33333333-3333-3333-3333-333333333331',
    'Plot Fey', 'Story Fey', 'A fey being that demands proper story structure and satisfying narrative arcs.', NULL
),
(
    'Novella Author',
    'Write a novella (20,000-50,000 words). Become a serious writer.',
    'Writing', 4, 8000, 8000, 2160,
    '44444444-4444-4444-4444-444444444441',
    'Inspiration Nymph', 'Muse Nymph', 'A capricious nymph who both inspires and challenges writers to greatness.', NULL
),
(
    'Novel Complete',
    'Finish a full novel (50,000+ words). Join the ranks of authors.',
    'Writing', 5, 15000, 15000, 4320,
    '55555555-5555-5555-5555-555555555551',
    'Muse Queen', 'Fey Queen', 'The queen of all muses, whose favor creates legendary works of literature.', NULL
),
(
    'Published Author',
    'Publish your work (self-published or traditional). Achieve literary legend status.',
    'Writing', 6, 30000, 30000, 8760,
    '66666666-6666-6666-6666-666666666661',
    'Eternal Story Archfey', 'Archfey Primordial', 'The primordial archfey who birthed all stories, guardian of eternal narrative.', NULL
);

-- ========================================
-- PUBLIC SPEAKING (Gargoyle Lineage)
-- ========================================

INSERT INTO quests (title, description, topic, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id, enemy_name, enemy_type, enemy_description, enemy_image_url) VALUES
(
    'First Toast',
    'Give your first toast or short speech (1-2 minutes).',
    'Public Speaking', 1, 950, 950, 168,
    '11111111-1111-1111-1111-111111111112',
    'Timid Gargoyle', 'Stone Guardian', 'A shy gargoyle that amplifies stage fright and nervousness in new speakers.', NULL
),
(
    'Presentation Pro',
    'Deliver a 10-minute presentation to a group.',
    'Public Speaking', 2, 2600, 2600, 336,
    '22222222-2222-2222-2222-222222222222',
    'Heckler Gargoyle', 'Mocking Guardian', 'A gargoyle that jeers and interrupts, testing composure under pressure.', NULL
),
(
    'Conference Speaker',
    'Speak at a conference or professional event.',
    'Public Speaking', 3, 5100, 5100, 720,
    '33333333-3333-3333-3333-333333333332',
    'Judge Gargoyle', 'Critical Guardian', 'A stern gargoyle judge who critiques every word and gesture for perfection.', NULL
),
(
    'TEDx Speaker',
    'Give a TEDx talk or equivalent high-profile speaking engagement.',
    'Public Speaking', 4, 8100, 8100, 2160,
    '44444444-4444-4444-4444-444444444442',
    'Critic Gargoyle Lord', 'Gargoyle Lord', 'A powerful gargoyle lord embodying the weight of high expectations and scrutiny.', NULL
),
(
    'Keynote Speaker',
    'Deliver a keynote speech at a major event.',
    'Public Speaking', 5, 15500, 15500, 4320,
    '55555555-5555-5555-5555-555555555552',
    'Eloquence Gargoyle King', 'Gargoyle Monarch', 'The gargoyle king who has heard every great speech, demanding legendary eloquence.', NULL
),
(
    'Speaker Series',
    'Create and deliver a workshop series or speaking tour.',
    'Public Speaking', 6, 31000, 31000, 8760,
    '66666666-6666-6666-6666-666666666662',
    'Voice Gargoyle Emperor', 'Eternal Gargoyle', 'The eternal emperor whose stone voice shaped nations through perfect oratory.', NULL
);

-- ========================================
-- MUSIC (Siren Lineage)
-- ========================================

INSERT INTO quests (title, description, topic, tier, glory_reward, xp_reward, time_limit_hours, reward_item_id, enemy_name, enemy_type, enemy_description, enemy_image_url) VALUES
(
    'First Song',
    'Learn to play or create your first complete song.',
    'Music', 1, 1000, 1000, 336,
    '11111111-1111-1111-1111-111111111113',
    'Discordant Songbird', 'Musical Bird', 'A songbird whose off-key notes represent the struggle of learning music.', NULL
),
(
    'Ten Song Repertoire',
    'Learn or create 10 different songs. Build your skills.',
    'Music', 2, 2500, 2500, 1440,
    '22222222-2222-2222-2222-222222222223',
    'Harmony Harpy', 'Winged Singer', 'A harpy whose haunting harmonies challenge musicians to match her skill.', NULL
),
(
    'Hundred Hour Musician',
    'Practice music for 100 total hours. Develop true competence.',
    'Music', 3, 5000, 5000, 2160,
    '33333333-3333-3333-3333-333333333333',
    'Melody Siren', 'Ocean Siren', 'A siren whose enchanting melodies lure sailors, testing musical mastery.', NULL
),
(
    'Public Performance',
    'Perform live in front of an audience (open mic, recital, etc.).',
    'Music', 4, 8000, 8000, 2160,
    '44444444-4444-4444-4444-444444444443',
    'Symphony Banshee', 'Greater Siren', 'A banshee whose wail creates symphonies, demanding perfection in performance.', NULL
),
(
    'Studio Recording',
    'Record a professional track or song in a studio.',
    'Music', 5, 15000, 15000, 4320,
    '55555555-5555-5555-5555-555555555553',
    'Orchestra Siren Queen', 'Siren Monarch', 'The queen of all sirens, conductor of legendary orchestras beneath the waves.', NULL
),
(
    'Album Release',
    'Create and release a full album (5+ tracks). Become a music legend.',
    'Music', 6, 30000, 30000, 8760,
    '66666666-6666-6666-6666-666666666663',
    'Eternal Song Primordial', 'Primordial Siren', 'The first siren whose voice created all music, guardian of eternal song.', NULL
);
