"""
Business logic constants for the Embark application
"""

# Quest constants
MAX_ACTIVE_QUESTS = 4
QUEST_TIERS = [1, 2, 3, 4, 5, 6]

# Item constants
ITEM_TIERS = [1, 2, 3, 4, 5, 6]
ITEM_STARS = [1, 2, 3, 4, 5, 6]

# Level system
XP_PER_LEVEL = 10000
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

