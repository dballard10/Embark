-- Migration: Add enemy/boss fields to quests table
-- This adds video game-like enemy encounters to every quest

-- Add enemy fields to quests table
ALTER TABLE quests ADD COLUMN IF NOT EXISTS enemy_name VARCHAR(100) NOT NULL DEFAULT 'Unknown Enemy';
ALTER TABLE quests ADD COLUMN IF NOT EXISTS enemy_type VARCHAR(50) NOT NULL DEFAULT 'Enemy';
ALTER TABLE quests ADD COLUMN IF NOT EXISTS enemy_description TEXT NOT NULL DEFAULT 'A formidable foe stands in your way.';
ALTER TABLE quests ADD COLUMN IF NOT EXISTS enemy_image_url TEXT;

-- Remove defaults after adding columns (so future inserts must provide values)
ALTER TABLE quests ALTER COLUMN enemy_name DROP DEFAULT;
ALTER TABLE quests ALTER COLUMN enemy_type DROP DEFAULT;
ALTER TABLE quests ALTER COLUMN enemy_description DROP DEFAULT;

-- Create index on enemy_type for potential filtering
CREATE INDEX IF NOT EXISTS idx_quests_enemy_type ON quests(enemy_type);

