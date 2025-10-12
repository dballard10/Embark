#!/bin/bash

# Simple test script for Embark API
# Make sure the server is running: uv run fastapi dev main.py

API_URL="http://localhost:8000/api"

echo "========================================="
echo "Testing Embark API"
echo "========================================="
echo ""

# Test 1: Health Check
echo "1. Testing Health Check..."
curl -s "${API_URL}/health" | python3 -m json.tool
echo ""
echo ""

# Test 2: Create a User
echo "2. Creating a test user..."
USER_RESPONSE=$(curl -s -X POST "${API_URL}/users" \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser1"}')
echo "$USER_RESPONSE" | python3 -m json.tool
USER_ID=$(echo "$USER_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin).get('id', ''))" 2>/dev/null)
echo ""
echo ""

if [ -n "$USER_ID" ]; then
  # Test 3: Get User
  echo "3. Getting user by ID..."
  curl -s "${API_URL}/users/${USER_ID}" | python3 -m json.tool
  echo ""
  echo ""

  # Test 4: List Users
  echo "4. Listing all users..."
  curl -s "${API_URL}/users" | python3 -m json.tool
  echo ""
  echo ""

  # Test 5: Update User Stats
  echo "5. Updating user stats..."
  curl -s -X POST "${API_URL}/users/${USER_ID}/stats" \
    -H "Content-Type: application/json" \
    -d '{"glory_delta": 100, "xp_delta": 500}' | python3 -m json.tool
  echo ""
  echo ""

  # Test 6: List Quests
  echo "6. Listing all quests..."
  curl -s "${API_URL}/quests" | python3 -m json.tool
  echo ""
  echo ""

  # Test 7: Get User Items
  echo "7. Getting user items..."
  curl -s "${API_URL}/users/${USER_ID}/items" | python3 -m json.tool
  echo ""
  echo ""

  echo "========================================="
  echo "Tests Complete! User ID: ${USER_ID}"
  echo "========================================="
else
  echo "Failed to create user. Check if:"
  echo "1. The server is running"
  echo "2. The .env file has correct credentials"
  echo "3. The database is set up"
fi

