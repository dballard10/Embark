# Database Seeding Guide

## Overview

This guide explains how to properly seed the Embark database to avoid duplicates and ensure all tiers (1-6) are properly populated with quests and items.

## ⚠️ Important: Prevent Duplicates

**NEVER run the same seed script twice** unless you've reset the database first. Running seed scripts multiple times will create duplicate entries, which can cause:

- Duplicate quests/items in the UI
- Slower database queries
- Confusion for users
- Wasted database storage

## Database Management Scripts

### Diagnostic Scripts

#### 1. `check_duplicates.sql`

**Purpose**: Check for duplicate quests and items in your database

**When to use**:

- Before cleaning up
- After seeding to verify no duplicates
- When investigating UI issues

**How to run**:

```bash
# Using psql
psql -U your_username -d your_database -f check_duplicates.sql

# Or using Supabase SQL Editor:
# Copy and paste the contents into the SQL Editor and run
```

**What it shows**:

- List of duplicate quests (if any)
- List of duplicate items (if any)
- Count of quests per tier (should be ~15 per tier)
- Count of items per tier (should be ~12 per tier)
- Total counts across the database

### Cleanup Scripts

#### 2. `cleanup_duplicates.sql`

**Purpose**: Remove duplicate entries while keeping the oldest version

**When to use**:

- When you have duplicates but want to preserve user progress
- After accidentally re-running seed scripts
- As a safer alternative to full reset

**How to run**:

```bash
psql -U your_username -d your_database -f cleanup_duplicates.sql
```

**What it does**:

- Deletes duplicate quests (keeps oldest by ID)
- Deletes duplicate items (keeps oldest by ID)
- Removes orphaned user_completed_quests entries
- Removes orphaned user_items entries
- Shows before/after counts

**⚠️ IMPORTANT**:

- Backup your database first!
- The script runs in a transaction - review results before committing
- To apply: Run `COMMIT;` after reviewing
- To cancel: Run `ROLLBACK;`

#### 3. `reset_database.sql` (Nuclear Option)

**Purpose**: Complete database wipe and fresh start

**When to use**:

- Starting completely fresh
- Duplicates are too complex to clean
- Testing seed scripts
- Development only (never in production!)

**⚠️ WARNING**: This deletes ALL quest/item data and user progress!

**What it preserves**:

- User accounts (username, total_glory, total_xp)

**What it deletes**:

- All quests
- All items
- All user_completed_quests
- All user_items

**How to run**:

```bash
psql -U your_username -d your_database -f reset_database.sql
```

Then follow the seeding order below.

## Seeding Order

### Fresh Database Setup

If you're setting up a fresh database (schema already created), follow this exact order:

#### Step 1: Seed Items (72 total items)

Run in this order:

1. **`seed_data_enhanced.sql`**

   - Contains: 18 items (tiers 1-6, 3 items per tier)
   - First batch of core items

2. **`add_18_new_items.sql`**

   - Contains: 18 additional items
   - Second batch expanding item variety

3. **`add_18_more_items.sql`**

   - Contains: 18 more items
   - Third batch for more variety

4. **`add_36_elemental_items.sql`**
   - Contains: 36 elemental-themed items
   - Final batch with elemental theme
   - Completes the full item roster

**Total: 90 items across all 6 tiers**

```bash
# Run items in order
psql -U your_username -d your_database -f seed_data_enhanced.sql
psql -U your_username -d your_database -f add_18_new_items.sql
psql -U your_username -d your_database -f add_18_more_items.sql
psql -U your_username -d your_database -f add_36_elemental_items.sql
```

#### Step 2: Seed Quests (90 total quests)

5. **`seed_topic_quests.sql`**
   - Contains: 90 quests (15 topics × 6 tiers each)
   - Topic-based quest progressions
   - Each topic has a themed enemy lineage

**Total: 90 quests across all 6 tiers**

```bash
# Run quests
psql -U your_username -d your_database -f seed_topic_quests.sql
```

#### Step 3: Optional - Add More Quests

6. **`add_quests_for_new_items.sql`** (optional)
   - Additional quests for variety
   - Can be run after main quest seeding

```bash
# Optional: Add more quests
psql -U your_username -d your_database -f add_quests_for_new_items.sql
```

### Using Supabase SQL Editor

If using Supabase dashboard:

1. Go to **SQL Editor** in your Supabase project
2. Create a new query
3. Copy contents of seed file
4. Run the query
5. Repeat for each file in order

## Verification

After seeding, run `check_duplicates.sql` to verify:

**Expected Results**:

```
=== DUPLICATE QUESTS ===
(no rows - this is good!)

=== DUPLICATE ITEMS ===
(no rows - this is good!)

=== QUEST COUNT BY TIER ===
tier | quest_count
-----|------------
  1  |    15
  2  |    15
  3  |    15
  4  |    15
  5  |    15
  6  |    15

=== ITEM COUNT BY TIER ===
tier | item_count
-----|-----------
  1  |    15
  2  |    15
  3  |    15
  4  |    15
  5  |    15
  6  |    15

=== TOTAL COUNTS ===
total_quests | total_items
-------------|------------
     90      |     90
```

## Troubleshooting

### Problem: Duplicates Detected

**Solution 1 (Recommended)**: Run cleanup script

```bash
psql -U your_username -d your_database -f cleanup_duplicates.sql
# Review results, then run: COMMIT;
```

**Solution 2 (Nuclear)**: Full reset and re-seed

```bash
psql -U your_username -d your_database -f reset_database.sql
# Then follow seeding order above
```

### Problem: Items/Quests Missing from UI

**Possible Causes**:

1. API limit too low (fixed - now 500)
2. Seed scripts not all run
3. Database connection issues

**Solution**:

```bash
# Check what's in database
psql -U your_username -d your_database -f check_duplicates.sql

# If counts are low, run missing seed scripts
# If no items/quests at all, run full seeding order
```

### Problem: Only Seeing Tiers 1-3

**Cause**: Old API limit was 100, which cut off after ~tier 3

**Solution**:

1. Update to latest code (limits now 500)
2. Restart backend server
3. Refresh frontend
4. All tiers 1-6 should now be visible

## Best Practices

1. **Always backup before modifying database**
2. **Run diagnostic script before and after changes**
3. **Never run seed scripts twice** (unless after reset)
4. **Keep this guide updated** when adding new seed files
5. **Document any custom seed scripts** you create

## Quick Reference

### Common Commands

```bash
# Supabase connection (if using local)
psql postgresql://postgres:your-password@localhost:54322/postgres

# Check for duplicates
psql -U user -d db -f check_duplicates.sql

# Clean duplicates
psql -U user -d db -f cleanup_duplicates.sql
# Then: COMMIT; or ROLLBACK;

# Full reset (⚠️ destroys data)
psql -U user -d db -f reset_database.sql
# Then: COMMIT; or ROLLBACK;

# Full fresh seed
psql -U user -d db -f seed_data_enhanced.sql
psql -U user -d db -f add_18_new_items.sql
psql -U user -d db -f add_18_more_items.sql
psql -U user -d db -f add_36_elemental_items.sql
psql -U user -d db -f seed_topic_quests.sql
```

## Seed File Reference

| File                           | Purpose         | Contains  | Run Order    |
| ------------------------------ | --------------- | --------- | ------------ |
| `seed_data_enhanced.sql`       | Core items      | 18 items  | 1            |
| `add_18_new_items.sql`         | More items      | 18 items  | 2            |
| `add_18_more_items.sql`        | Even more items | 18 items  | 3            |
| `add_36_elemental_items.sql`   | Elemental items | 36 items  | 4            |
| `seed_topic_quests.sql`        | Main quests     | 90 quests | 5            |
| `add_quests_for_new_items.sql` | Extra quests    | Variable  | 6 (optional) |

## Need Help?

If you encounter issues not covered here:

1. Run `check_duplicates.sql` and share results
2. Check backend logs for errors
3. Verify database connection settings
4. Ensure all seed files are present

## Version History

- **v1.0** (Oct 2024): Initial seeding guide
- **v1.1** (Oct 2024): Added limit increase (100→500) documentation
- **v1.2** (Oct 2024): Added diagnostic and cleanup scripts
