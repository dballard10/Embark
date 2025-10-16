-- Embark MVP Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL UNIQUE,
    total_glory INTEGER NOT NULL DEFAULT 0,
    total_xp INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- items/Items table
CREATE TABLE IF NOT EXISTS items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    rarity_tier INTEGER NOT NULL CHECK (rarity_tier >= 1 AND rarity_tier <= 6),
    rarity_stars INTEGER NOT NULL CHECK (rarity_stars >= 1 AND rarity_stars <= 6),
    image_url TEXT,
    price INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quests table
CREATE TABLE IF NOT EXISTS quests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tier INTEGER NOT NULL CHECK (tier >= 1 AND tier <= 6),
    glory_reward INTEGER NOT NULL DEFAULT 0,
    xp_reward INTEGER NOT NULL DEFAULT 0,
    time_limit_hours INTEGER NOT NULL DEFAULT 24,
    reward_item_id UUID REFERENCES items(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User completed quests table
CREATE TABLE IF NOT EXISTS user_completed_quests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quest_id UUID NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    deadline_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User items table
CREATE TABLE IF NOT EXISTS user_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE(user_id, item_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_completed_quests_user_id ON user_completed_quests(user_id);
CREATE INDEX IF NOT EXISTS idx_user_completed_quests_is_active ON user_completed_quests(is_active);
CREATE INDEX IF NOT EXISTS idx_user_completed_quests_user_quest ON user_completed_quests(user_id, quest_id);
CREATE INDEX IF NOT EXISTS idx_user_items_user_id ON user_items(user_id);
CREATE INDEX IF NOT EXISTS idx_quests_tier ON quests(tier);

-- Note: Users can have up to 4 active quests simultaneously
-- No constraint needed as this is enforced in application logic

