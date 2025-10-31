-- Add lifetime_glory_gained column to users table
-- This tracks all glory ever earned, regardless of spending

-- Add the column with default value 0
ALTER TABLE users
ADD COLUMN IF NOT EXISTS lifetime_glory_gained INTEGER NOT NULL DEFAULT 0;

-- Backfill lifetime_glory_gained from completed quests
-- Sum all glory_reward from quests joined with user_completed_quests
-- where quests are completed (is_active = false and completed_at IS NOT NULL)
UPDATE users
SET lifetime_glory_gained = COALESCE(
  (
    SELECT SUM(quests.glory_reward)
    FROM user_completed_quests
    INNER JOIN quests ON user_completed_quests.quest_id = quests.id
    WHERE user_completed_quests.user_id = users.id
      AND user_completed_quests.is_active = false
      AND user_completed_quests.completed_at IS NOT NULL
  ),
  0
);

-- For users with current glory but no completed quests (legacy data),
-- set lifetime_glory_gained to at least their current total_glory
-- This handles cases where glory was manually added or from old system
UPDATE users
SET lifetime_glory_gained = GREATEST(lifetime_glory_gained, total_glory)
WHERE lifetime_glory_gained < total_glory;

-- Add index for potential queries/filtering
CREATE INDEX IF NOT EXISTS idx_users_lifetime_glory ON users(lifetime_glory_gained);

