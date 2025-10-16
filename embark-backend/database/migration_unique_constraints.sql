-- Migration: Add unique constraints for items and quest tracking
-- Run this in your Supabase SQL Editor to update existing databases
-- This ensures users cannot have duplicate items or repeat completed quests

-- Add unique constraint to user_items to prevent duplicate items
-- Note: This will fail if there are existing duplicates. Clean those up first if needed.
ALTER TABLE user_items ADD CONSTRAINT unique_user_item UNIQUE (user_id, item_id);

-- Add index for efficient quest history lookup
CREATE INDEX IF NOT EXISTS idx_user_completed_quests_user_quest ON user_completed_quests(user_id, quest_id);

-- Note: We don't add a unique constraint on user_completed_quests(user_id, quest_id)
-- because users can have multiple records (active and completed) for the same quest.
-- The application logic will prevent starting a quest that's already been completed.

