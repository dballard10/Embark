-- Update Enemy Names to Match Lineage-Based Progression
-- This script updates all quest enemy names to match the new lineage system
-- Run this against your Supabase database

-- ============================================================================
-- RUNNING - Wind Elemental Lineage
-- ============================================================================
UPDATE quests SET enemy_name = 'Wind Sprite' WHERE topic = 'Running' AND tier = 1;
UPDATE quests SET enemy_name = 'Gale Spirit' WHERE topic = 'Running' AND tier = 2;
UPDATE quests SET enemy_name = 'Storm Elemental' WHERE topic = 'Running' AND tier = 3;
UPDATE quests SET enemy_name = 'Tempest Lord' WHERE topic = 'Running' AND tier = 4;
UPDATE quests SET enemy_name = 'Hurricane Primordial' WHERE topic = 'Running' AND tier = 5;
UPDATE quests SET enemy_name = 'Celestial Windstorm' WHERE topic = 'Running' AND tier = 6;

-- ============================================================================
-- STRENGTH TRAINING / WEIGHT LIFTING - Orc Lineage
-- ============================================================================
UPDATE quests SET enemy_name = 'Grunt Orc' WHERE topic = 'Weight Lifting' AND tier = 1;
UPDATE quests SET enemy_name = 'Battle Orc' WHERE topic = 'Weight Lifting' AND tier = 2;
UPDATE quests SET enemy_name = 'Orc Captain' WHERE topic = 'Weight Lifting' AND tier = 3;
UPDATE quests SET enemy_name = 'Orc Warchief' WHERE topic = 'Weight Lifting' AND tier = 4;
UPDATE quests SET enemy_name = 'Orc King' WHERE topic = 'Weight Lifting' AND tier = 5;
UPDATE quests SET enemy_name = 'Immortal Orc Emperor' WHERE topic = 'Weight Lifting' AND tier = 6;

-- ============================================================================
-- READING / KNOWLEDGE - Scholar Undead Lineage
-- ============================================================================
UPDATE quests SET enemy_name = 'Dusty Skeleton' WHERE topic IN ('Reading', 'Knowledge') AND tier = 1;
UPDATE quests SET enemy_name = 'Book Wraith' WHERE topic IN ('Reading', 'Knowledge') AND tier = 2;
UPDATE quests SET enemy_name = 'Scholar Specter' WHERE topic IN ('Reading', 'Knowledge') AND tier = 3;
UPDATE quests SET enemy_name = 'Ancient Lich' WHERE topic IN ('Reading', 'Knowledge') AND tier = 4;
UPDATE quests SET enemy_name = 'Archlich Sage' WHERE topic IN ('Reading', 'Knowledge') AND tier = 5;
UPDATE quests SET enemy_name = 'Eternal Knowledge Lich' WHERE topic IN ('Reading', 'Knowledge') AND tier = 6;

-- ============================================================================
-- MEDITATION - Shadow Demon Lineage
-- ============================================================================
UPDATE quests SET enemy_name = 'Chaos Imp' WHERE topic = 'Meditation' AND tier = 1;
UPDATE quests SET enemy_name = 'Mind Demon' WHERE topic = 'Meditation' AND tier = 2;
UPDATE quests SET enemy_name = 'Ego Fiend' WHERE topic = 'Meditation' AND tier = 3;
UPDATE quests SET enemy_name = 'Thought Demon' WHERE topic = 'Meditation' AND tier = 4;
UPDATE quests SET enemy_name = 'Enlightenment Archfiend' WHERE topic = 'Meditation' AND tier = 5;
UPDATE quests SET enemy_name = 'Void Demon Lord' WHERE topic = 'Meditation' AND tier = 6;

-- ============================================================================
-- FINANCE - Dragon Lineage
-- ============================================================================
UPDATE quests SET enemy_name = 'Wyrmling Hoarder' WHERE topic = 'Finance' AND tier = 1;
UPDATE quests SET enemy_name = 'Young Gold Dragon' WHERE topic = 'Finance' AND tier = 2;
UPDATE quests SET enemy_name = 'Adult Treasure Dragon' WHERE topic = 'Finance' AND tier = 3;
UPDATE quests SET enemy_name = 'Ancient Gold Dragon' WHERE topic = 'Finance' AND tier = 4;
UPDATE quests SET enemy_name = 'Legendary Platinum Dragon' WHERE topic = 'Finance' AND tier = 5;
UPDATE quests SET enemy_name = 'Primordial Wealth Dragon' WHERE topic = 'Finance' AND tier = 6;

-- ============================================================================
-- COOKING - Fire Elemental Lineage
-- ============================================================================
UPDATE quests SET enemy_name = 'Flame Sprite' WHERE topic = 'Cooking' AND tier = 1;
UPDATE quests SET enemy_name = 'Fire Spirit' WHERE topic = 'Cooking' AND tier = 2;
UPDATE quests SET enemy_name = 'Blaze Elemental' WHERE topic = 'Cooking' AND tier = 3;
UPDATE quests SET enemy_name = 'Inferno Guardian' WHERE topic = 'Cooking' AND tier = 4;
UPDATE quests SET enemy_name = 'Volcanic Titan' WHERE topic = 'Cooking' AND tier = 5;
UPDATE quests SET enemy_name = 'Eternal Flame Primordial' WHERE topic = 'Cooking' AND tier = 6;

-- ============================================================================
-- LANGUAGE LEARNING - Babel Construct Lineage
-- ============================================================================
UPDATE quests SET enemy_name = 'Word Golem' WHERE topic = 'Language Learning' AND tier = 1;
UPDATE quests SET enemy_name = 'Phrase Construct' WHERE topic = 'Language Learning' AND tier = 2;
UPDATE quests SET enemy_name = 'Grammar Sentinel' WHERE topic = 'Language Learning' AND tier = 3;
UPDATE quests SET enemy_name = 'Polyglot Automaton' WHERE topic = 'Language Learning' AND tier = 4;
UPDATE quests SET enemy_name = 'Translation Colossus' WHERE topic = 'Language Learning' AND tier = 5;
UPDATE quests SET enemy_name = 'Omnilingual Oracle' WHERE topic = 'Language Learning' AND tier = 6;

-- ============================================================================
-- PUZZLES - Sphinx Lineage
-- ============================================================================
UPDATE quests SET enemy_name = 'Riddle Cat' WHERE topic = 'Puzzles' AND tier = 1;
UPDATE quests SET enemy_name = 'Puzzle Lynx' WHERE topic = 'Puzzles' AND tier = 2;
UPDATE quests SET enemy_name = 'Enigma Sphinx' WHERE topic = 'Puzzles' AND tier = 3;
UPDATE quests SET enemy_name = 'Grand Sphinx' WHERE topic = 'Puzzles' AND tier = 4;
UPDATE quests SET enemy_name = 'Ancient Sphinx Lord' WHERE topic = 'Puzzles' AND tier = 5;
UPDATE quests SET enemy_name = 'Eternal Riddlemaster' WHERE topic = 'Puzzles' AND tier = 6;

-- ============================================================================
-- TRAVEL - Beast Lineage
-- ============================================================================
UPDATE quests SET enemy_name = 'Travel Wolf' WHERE topic = 'Travel' AND tier = 1;
UPDATE quests SET enemy_name = 'Journey Dire Wolf' WHERE topic = 'Travel' AND tier = 2;
UPDATE quests SET enemy_name = 'Wanderlust Worg' WHERE topic = 'Travel' AND tier = 3;
UPDATE quests SET enemy_name = 'Expedition Beast' WHERE topic = 'Travel' AND tier = 4;
UPDATE quests SET enemy_name = 'Legendary Pathfinder' WHERE topic = 'Travel' AND tier = 5;
UPDATE quests SET enemy_name = 'Galactic Wanderer' WHERE topic = 'Travel' AND tier = 6;

-- ============================================================================
-- SWIMMING - Sea Serpent Lineage
-- ============================================================================
UPDATE quests SET enemy_name = 'Water Snake' WHERE topic = 'Swimming' AND tier = 1;
UPDATE quests SET enemy_name = 'Sea Serpent' WHERE topic = 'Swimming' AND tier = 2;
UPDATE quests SET enemy_name = 'Ocean Wyrm' WHERE topic = 'Swimming' AND tier = 3;
UPDATE quests SET enemy_name = 'Deep Sea Serpent' WHERE topic = 'Swimming' AND tier = 4;
UPDATE quests SET enemy_name = 'Leviathan Prime' WHERE topic = 'Swimming' AND tier = 5;
UPDATE quests SET enemy_name = 'Abyssal Sea Dragon' WHERE topic = 'Swimming' AND tier = 6;

-- ============================================================================
-- NUTRITION - Nature Spirit Lineage
-- ============================================================================
UPDATE quests SET enemy_name = 'Herb Sprite' WHERE topic = 'Nutrition' AND tier = 1;
UPDATE quests SET enemy_name = 'Garden Spirit' WHERE topic = 'Nutrition' AND tier = 2;
UPDATE quests SET enemy_name = 'Harvest Guardian' WHERE topic = 'Nutrition' AND tier = 3;
UPDATE quests SET enemy_name = 'Vitality Dryad' WHERE topic = 'Nutrition' AND tier = 4;
UPDATE quests SET enemy_name = 'Ancient Life Treant' WHERE topic = 'Nutrition' AND tier = 5;
UPDATE quests SET enemy_name = 'Elder Nature Titan' WHERE topic = 'Nutrition' AND tier = 6;

-- ============================================================================
-- DATING/RELATIONSHIPS - Cupid/Angel Lineage
-- ============================================================================
UPDATE quests SET enemy_name = 'Anxious Cherub' WHERE topic = 'Dating/Relationships' AND tier = 1;
UPDATE quests SET enemy_name = 'Heartbreak Cupid' WHERE topic = 'Dating/Relationships' AND tier = 2;
UPDATE quests SET enemy_name = 'Solitude Angel' WHERE topic = 'Dating/Relationships' AND tier = 3;
UPDATE quests SET enemy_name = 'Discord Seraph' WHERE topic = 'Dating/Relationships' AND tier = 4;
UPDATE quests SET enemy_name = 'Isolation Archangel' WHERE topic = 'Dating/Relationships' AND tier = 5;
UPDATE quests SET enemy_name = 'Eternal Bond Celestial' WHERE topic = 'Dating/Relationships' AND tier = 6;

-- ============================================================================
-- CREATIVE WRITING - Muse Fey Lineage
-- ============================================================================
UPDATE quests SET enemy_name = 'Blank Page Pixie' WHERE topic = 'Creative Writing' AND tier = 1;
UPDATE quests SET enemy_name = 'Critic Fairy' WHERE topic = 'Creative Writing' AND tier = 2;
UPDATE quests SET enemy_name = 'Plot Fey' WHERE topic = 'Creative Writing' AND tier = 3;
UPDATE quests SET enemy_name = 'Inspiration Nymph' WHERE topic = 'Creative Writing' AND tier = 4;
UPDATE quests SET enemy_name = 'Muse Queen' WHERE topic = 'Creative Writing' AND tier = 5;
UPDATE quests SET enemy_name = 'Eternal Story Archfey' WHERE topic = 'Creative Writing' AND tier = 6;

-- ============================================================================
-- PUBLIC SPEAKING - Gargoyle Lineage
-- ============================================================================
UPDATE quests SET enemy_name = 'Timid Gargoyle' WHERE topic = 'Public Speaking' AND tier = 1;
UPDATE quests SET enemy_name = 'Heckler Gargoyle' WHERE topic = 'Public Speaking' AND tier = 2;
UPDATE quests SET enemy_name = 'Judge Gargoyle' WHERE topic = 'Public Speaking' AND tier = 3;
UPDATE quests SET enemy_name = 'Critic Gargoyle Lord' WHERE topic = 'Public Speaking' AND tier = 4;
UPDATE quests SET enemy_name = 'Eloquence Gargoyle King' WHERE topic = 'Public Speaking' AND tier = 5;
UPDATE quests SET enemy_name = 'Voice Gargoyle Emperor' WHERE topic = 'Public Speaking' AND tier = 6;

-- ============================================================================
-- MUSIC - Siren Lineage
-- ============================================================================
UPDATE quests SET enemy_name = 'Discordant Songbird' WHERE topic = 'Music' AND tier = 1;
UPDATE quests SET enemy_name = 'Harmony Harpy' WHERE topic = 'Music' AND tier = 2;
UPDATE quests SET enemy_name = 'Melody Siren' WHERE topic = 'Music' AND tier = 3;
UPDATE quests SET enemy_name = 'Symphony Banshee' WHERE topic = 'Music' AND tier = 4;
UPDATE quests SET enemy_name = 'Orchestra Siren Princess' WHERE topic = 'Music' AND tier = 5;
UPDATE quests SET enemy_name = 'Brilliant Song Queen' WHERE topic = 'Music' AND tier = 6;

-- ============================================================================
-- VERIFICATION QUERY
-- ============================================================================
-- Uncomment to verify the updates
-- SELECT topic, tier, enemy_name, COUNT(*) as quest_count
-- FROM quests
-- GROUP BY topic, tier, enemy_name
-- ORDER BY topic, tier;

-- Check for any remaining "Unknown Enemy" entries
SELECT COUNT(*) as unknown_enemy_count
FROM quests
WHERE enemy_name = 'Unknown Enemy';

-- Show all unique enemy names after update
SELECT DISTINCT topic, tier, enemy_name
FROM quests
ORDER BY topic, tier;

