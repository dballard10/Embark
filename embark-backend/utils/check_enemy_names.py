#!/usr/bin/env python3
"""
Utility script to check all enemy names in the database
Run this to see which enemy names are in use and compare with frontend mapping
"""

import os
import sys
from dotenv import load_dotenv
from supabase import create_client, Client

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY", "")

def get_all_enemy_names():
    """Query database for all unique enemy names"""
    try:
        if not SUPABASE_URL or not SUPABASE_KEY:
            print("❌ Error: SUPABASE_URL and SUPABASE_ANON_KEY must be set")
            sys.exit(1)
            
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Get all quests
        response = supabase.table("quests").select("enemy_name, tier, topic, title").order("tier").execute()
        
        if not response.data:
            print("❌ No quests found in database")
            return
        
        # Group by enemy name
        enemy_info = {}
        for quest in response.data:
            enemy_name = quest['enemy_name']
            if enemy_name not in enemy_info:
                enemy_info[enemy_name] = {
                    'tier': quest['tier'],
                    'topic': quest['topic'],
                    'quest_titles': []
                }
            enemy_info[enemy_name]['quest_titles'].append(quest['title'])
        
        # Print results
        print("=" * 80)
        print(f"Found {len(enemy_info)} unique enemy names in the database")
        print("=" * 80)
        print()
        
        # Sort by tier
        sorted_enemies = sorted(enemy_info.items(), key=lambda x: x[1]['tier'])
        
        for enemy_name, info in sorted_enemies:
            tier = info['tier']
            topic = info['topic']
            quest_count = len(info['quest_titles'])
            
            print(f"Tier {tier} | {topic:20s} | \"{enemy_name}\"")
            print(f"        ({quest_count} quest{'s' if quest_count > 1 else ''})")
        
        print()
        print("=" * 80)
        print("\nCopy-paste friendly list for verification:")
        print("=" * 80)
        for enemy_name, _ in sorted_enemies:
            print(f'  "{enemy_name}": "{enemy_name.lower().replace(" ", "-")}.png",')
        
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    get_all_enemy_names()

