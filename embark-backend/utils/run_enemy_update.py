#!/usr/bin/env python3
"""
Run the enemy name update SQL script against Supabase
This will update all quest enemy names to match the lineage-based progression
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client, Client

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY", "")

def run_enemy_name_updates():
    """Execute all enemy name updates"""
    try:
        if not SUPABASE_URL or not SUPABASE_KEY:
            print("❌ Error: SUPABASE_URL and SUPABASE_ANON_KEY must be set")
            sys.exit(1)
            
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        print("=" * 80)
        print("🔄 Updating Enemy Names to Lineage-Based Progression")
        print("=" * 80)
        print()
        
        # Read the SQL file
        sql_file = Path(__file__).parent.parent / "database" / "update_enemy_names_to_lineage.sql"
        if not sql_file.exists():
            print(f"❌ SQL file not found: {sql_file}")
            sys.exit(1)
        
        with open(sql_file, 'r') as f:
            sql_content = f.read()
        
        # Split into individual UPDATE statements
        statements = []
        for line in sql_content.split('\n'):
            line = line.strip()
            # Skip comments and empty lines
            if line and not line.startswith('--') and line.startswith('UPDATE'):
                statements.append(line)
        
        print(f"Found {len(statements)} UPDATE statements to execute")
        print()
        
        # Execute each update
        updated_count = 0
        for i, statement in enumerate(statements, 1):
            try:
                # Execute using raw SQL via RPC (if available) or table updates
                # Since Supabase Python client doesn't directly support raw SQL,
                # we'll use the table API with filters
                
                # Parse the UPDATE statement
                # Format: UPDATE quests SET enemy_name = 'NAME' WHERE topic = 'TOPIC' AND tier = N;
                if "WHERE topic" in statement:
                    # Extract values
                    enemy_name = statement.split("enemy_name = '")[1].split("'")[0]
                    
                    if "topic IN" in statement:
                        # Handle IN clause: topic IN ('Reading', 'Knowledge')
                        topics_part = statement.split("topic IN (")[1].split(")")[0]
                        topics = [t.strip("' ") for t in topics_part.split(",")]
                        tier = int(statement.split("tier = ")[1].split(";")[0])
                        
                        # Update for each topic
                        for topic in topics:
                            response = supabase.table("quests").update({
                                "enemy_name": enemy_name
                            }).eq("topic", topic).eq("tier", tier).execute()
                            
                            if response.data:
                                count = len(response.data)
                                updated_count += count
                                print(f"  ✅ Updated {count} quest(s): {topic} T{tier} → {enemy_name}")
                    else:
                        # Single topic
                        topic = statement.split("topic = '")[1].split("'")[0]
                        tier = int(statement.split("tier = ")[1].split(";")[0])
                        
                        response = supabase.table("quests").update({
                            "enemy_name": enemy_name
                        }).eq("topic", topic).eq("tier", tier).execute()
                        
                        if response.data:
                            count = len(response.data)
                            updated_count += count
                            print(f"  ✅ Updated {count} quest(s): {topic} T{tier} → {enemy_name}")
                
            except Exception as e:
                print(f"  ⚠️  Warning: Failed to execute statement {i}: {e}")
                continue
        
        print()
        print("=" * 80)
        print(f"✅ Update Complete!")
        print(f"   Total quests updated: {updated_count}")
        print("=" * 80)
        print()
        
        # Verify the results
        print("🔍 Verifying results...")
        print()
        
        # Check for remaining "Unknown Enemy" entries
        response = supabase.table("quests").select("id").eq("enemy_name", "Unknown Enemy").execute()
        unknown_count = len(response.data) if response.data else 0
        
        if unknown_count > 0:
            print(f"⚠️  Warning: {unknown_count} quest(s) still have 'Unknown Enemy'")
        else:
            print("✅ No 'Unknown Enemy' entries remaining!")
        
        # Show sample of updated enemies
        print()
        print("Sample of updated enemies:")
        response = supabase.table("quests").select("topic, tier, enemy_name").limit(10).order("tier").execute()
        
        if response.data:
            for quest in response.data:
                print(f"  • {quest['topic']} T{quest['tier']}: {quest['enemy_name']}")
        
        print()
        print("🎉 Enemy image mapping should now work in the frontend!")
        print("   Refresh your browser to see the images.")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_enemy_name_updates()


