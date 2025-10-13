# Database Update Required

## Remove Single Active Quest Constraint

To support up to 4 concurrent active quests per user, you need to manually remove the database constraint in Supabase.

### Steps:

1. Open your Supabase project
2. Go to the SQL Editor
3. Run the following SQL command:

```sql
DROP INDEX IF EXISTS idx_user_active_quest;
```

### What this does:

This removes the unique index constraint that was preventing users from having more than one active quest at a time. After removing this constraint, users will be able to have up to 4 active quests simultaneously.

### Verification:

After running the command, you can verify it was successful by trying to start multiple quests for the same user. The application code already limits users to 4 active quests maximum.

---

**Note:** This is a one-time manual operation that must be performed on your Supabase database.
