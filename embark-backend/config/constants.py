"""
Business logic constants for the Embark application
"""

# Quest constants
MAX_ACTIVE_QUESTS = 4
QUEST_TIERS = [1, 2, 3, 4, 5, 6]

# Quest rewards by tier (glory, xp)
QUEST_REWARDS = {
    1: {"glory": 3000, "xp": 300},
    2: {"glory": 10000, "xp": 1000},
    3: {"glory": 30000, "xp": 3000},
    4: {"glory": 100000, "xp": 10000},
    5: {"glory": 300000, "xp": 30000},
    6: {"glory": 1000000, "xp": 100000},
}

# Item constants
ITEM_TIERS = [1, 2, 3, 4, 5, 6]
ITEM_STARS = [1, 2, 3, 4, 5, 6]

# Item shop prices by rarity tier
ITEM_PRICES = {
    1: 9000,
    2: 30000,
    3: 90000,
    4: 300000,
    5: 900000,
    6: 3000000,
}

# Level system (now uses progressive XP requirements - see utils/level_calculator.py)
MAX_LEVEL = 100

# Tier names for display
TIER_NAMES = {
    1: "Common",
    2: "Uncommon",
    3: "Rare",
    4: "Epic",
    5: "Legendary",
    6: "Mythic",
}

# Default values
DEFAULT_USER_GLORY = 0
DEFAULT_USER_XP = 0

# Pagination
DEFAULT_LIMIT = 50
MAX_LIMIT = 100

# Time constants (hours)
DEFAULT_QUEST_TIME_LIMIT = 24
MIN_QUEST_TIME_LIMIT = 1
MAX_QUEST_TIME_LIMIT = 168  # 1 week

