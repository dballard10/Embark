"""
Level calculation utilities for the progressive XP system.
Uses cumulative XP requirements from the XP_Requirements_by_Level CSV.
"""

# Cumulative XP required to reach each level (index = level - 1)
# Level 1 = 0 XP, Level 2 = 300 XP, Level 3 = 621 XP, etc.
CUMULATIVE_XP_REQUIREMENTS = [
    0, 300, 621, 964, 1331, 1724, 2145, 2595, 3077, 3593,
    4145, 4736, 5368, 6044, 6767, 7541, 8369, 9255, 10203, 11217,
    12302, 13463, 14705, 16034, 17456, 18978, 20607, 22350, 24215, 26211,
    28347, 30633, 33079, 35696, 38496, 41492, 44698, 48128, 51798, 55725,
    59927, 64423, 69234, 74382, 79890, 85784, 92091, 98839, 106059, 113784,
    122050, 130895, 140359, 150485, 161320, 172913, 185318, 198591, 212793, 227989,
    244249, 261647, 280263, 300182, 321495, 344300, 368701, 394810, 422747, 452640,
    484626, 518851, 555472, 594656, 636583, 681445, 729447, 780809, 835766, 894570,
    957490, 1024814, 1096851, 1173931, 1256407, 1344656, 1439082, 1540118, 1648227, 1763904,
    1887678, 2020116, 2161825, 2313454, 2475697, 2649297, 2835049, 3033804, 3246472, 3474027
]

# XP needed from previous level (index = level - 1)
# Level 1 needs 0, Level 2 needs 300, Level 3 needs 321, etc.
XP_PER_LEVEL = [
    0, 300, 321, 343, 367, 393, 421, 450, 482, 516,
    552, 591, 632, 676, 723, 774, 828, 886, 948, 1014,
    1085, 1161, 1242, 1329, 1422, 1522, 1629, 1743, 1865, 1996,
    2136, 2286, 2446, 2617, 2800, 2996, 3206, 3430, 3670, 3927,
    4202, 4496, 4811, 5148, 5508, 5894, 6307, 6748, 7220, 7725,
    8266, 8845, 9464, 10126, 10835, 11593, 12405, 13273, 14202, 15196,
    16260, 17398, 18616, 19919, 21313, 22805, 24401, 26109, 27937, 29893,
    31986, 34225, 36621, 39184, 41927, 44862, 48002, 51362, 54957, 58804,
    62920, 67324, 72037, 77080, 82476, 88249, 94426, 101036, 108109, 115677,
    123774, 132438, 141709, 151629, 162243, 173600, 185752, 198755, 212668, 227555
]

MAX_LEVEL = 100


def calculate_level(total_xp: int) -> int:
    """
    Calculate the current level based on total XP using progressive system.
    
    Args:
        total_xp: Total accumulated XP
        
    Returns:
        Current level (1-100)
        
    Examples:
        calculate_level(0) -> 1
        calculate_level(300) -> 2
        calculate_level(621) -> 3
        calculate_level(3474027) -> 100
    """
    if total_xp < 0:
        return 1
    
    if total_xp >= CUMULATIVE_XP_REQUIREMENTS[-1]:
        return MAX_LEVEL
    
    # Binary search for efficiency
    left, right = 0, len(CUMULATIVE_XP_REQUIREMENTS) - 1
    level = 1
    
    while left <= right:
        mid = (left + right) // 2
        if CUMULATIVE_XP_REQUIREMENTS[mid] <= total_xp:
            level = mid + 1
            left = mid + 1
        else:
            right = mid - 1
    
    return level


def xp_to_next_level(total_xp: int) -> int:
    """
    Calculate XP needed to reach the next level.
    
    Args:
        total_xp: Total accumulated XP
        
    Returns:
        XP needed for next level (0 if max level)
        
    Examples:
        xp_to_next_level(0) -> 300
        xp_to_next_level(150) -> 150
        xp_to_next_level(300) -> 321
    """
    current_level = calculate_level(total_xp)
    
    if current_level >= MAX_LEVEL:
        return 0
    
    next_level_xp = CUMULATIVE_XP_REQUIREMENTS[current_level]
    return next_level_xp - total_xp


def get_current_level_xp(total_xp: int) -> int:
    """
    Get the XP earned in the current level.
    
    Args:
        total_xp: Total accumulated XP
        
    Returns:
        XP earned in current level
        
    Examples:
        get_current_level_xp(0) -> 0
        get_current_level_xp(450) -> 150 (300 for level 2, 150 into level 3)
    """
    current_level = calculate_level(total_xp)
    
    if current_level >= MAX_LEVEL:
        return total_xp - CUMULATIVE_XP_REQUIREMENTS[MAX_LEVEL - 1]
    
    current_level_start_xp = CUMULATIVE_XP_REQUIREMENTS[current_level - 1]
    return total_xp - current_level_start_xp


def get_level_progress_percentage(total_xp: int) -> float:
    """
    Get progress to next level as a percentage (0-100).
    
    Args:
        total_xp: Total accumulated XP
        
    Returns:
        Progress percentage (0.0 - 100.0)
    """
    current_level = calculate_level(total_xp)
    
    if current_level >= MAX_LEVEL:
        return 100.0
    
    current_level_xp = get_current_level_xp(total_xp)
    xp_needed_for_level = XP_PER_LEVEL[current_level]
    
    if xp_needed_for_level == 0:
        return 100.0
    
    return (current_level_xp / xp_needed_for_level) * 100.0


def get_xp_for_level(level: int) -> int:
    """
    Get the total cumulative XP required to reach a specific level.
    
    Args:
        level: Target level (1-100)
        
    Returns:
        Cumulative XP required
        
    Examples:
        get_xp_for_level(1) -> 0
        get_xp_for_level(2) -> 300
        get_xp_for_level(100) -> 3474027
    """
    if level < 1:
        return 0
    if level > MAX_LEVEL:
        level = MAX_LEVEL
    
    return CUMULATIVE_XP_REQUIREMENTS[level - 1]

