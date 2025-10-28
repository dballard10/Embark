-- Migration: Add topic field to quests and reset quest data
-- This migration adds topic-based organization to quests

-- Step 1: Clear existing quest-related data (fresh start as requested)
DELETE FROM user_completed_quests;
DELETE FROM quests;

-- Step 2: Add topic column to quests table
ALTER TABLE quests ADD COLUMN IF NOT EXISTS topic VARCHAR(100) NOT NULL DEFAULT 'General';

-- Step 3: Remove default after adding column
ALTER TABLE quests ALTER COLUMN topic DROP DEFAULT;

-- Step 4: Create index on topic for efficient filtering
CREATE INDEX IF NOT EXISTS idx_quests_topic ON quests(topic);

-- Step 5: Create composite index for topic and tier queries
CREATE INDEX IF NOT EXISTS idx_quests_topic_tier ON quests(topic, tier);

