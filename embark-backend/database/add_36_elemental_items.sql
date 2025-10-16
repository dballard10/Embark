-- Add 36 Elemental & Mythical Creature Items to Embark
-- Run this in your Supabase SQL Editor

-- Tier 1 Items (Common) - 6 elemental basic items
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('11111111-1111-1111-1111-111111111120', 'Stone Hammer', 'A simple weapon crafted from granite stone bound to wooden handle', 1, 1, 1000),
('11111111-1111-1111-1111-111111111121', 'Ember Charm', 'A small clay amulet shaped like a flame with faintly glowing center', 1, 1, 1000),
('11111111-1111-1111-1111-111111111122', 'Stream Crystal', 'A clear quartz crystal naturally formed in stream beds with water inclusions', 1, 1, 1000),
('11111111-1111-1111-1111-111111111123', 'Wind-Woven Bracers', 'Simple cloth arm wraps woven from lightweight linen in pale grey and white', 1, 1, 1000),
('11111111-1111-1111-1111-111111111124', 'Magma Pebble', 'A small rough obsidian pebble with volcanic rock texture, naturally warm', 1, 1, 1000),
('11111111-1111-1111-1111-111111111125', 'Gale Feather Quill', 'A simple writing quill crafted from large white bird feather', 1, 1, 1000);

-- Tier 2 Items (Uncommon) - 6 quality elemental items
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('22222222-2222-2222-2222-222222222230', 'Salamander Scale Gloves', 'Leather gloves reinforced with heat-resistant salamander scales', 2, 2, 5000),
('22222222-2222-2222-2222-222222222231', 'Zephyr Cloak', 'A flowing short cape woven from silk-light fabric, constantly billowing gently', 2, 2, 5000),
('22222222-2222-2222-2222-222222222232', 'Coral Branch Trident', 'A three-pronged spear crafted from living red and white coral formation', 2, 2, 5000),
('22222222-2222-2222-2222-222222222233', 'Ash Wood Shield', 'A round wooden shield crafted from fire-hardened ash timber with ember patterns', 2, 2, 5000),
('22222222-2222-2222-2222-222222222234', 'Granite Gauntlets', 'Heavy stone gauntlets carved from solid grey granite with quartz veins', 2, 2, 5000),
('22222222-2222-2222-2222-222222222235', 'Storm Petrel Feather Charm', 'An elegant necklace featuring storm petrel feathers bound with silver wire', 2, 2, 5000);

-- Tier 3 Items (Rare) - 6 magical elemental items
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('33333333-3333-3333-3333-333333333340', 'Phoenix Feather Mantle', 'A magnificent shoulder cape woven from brilliant phoenix feathers that self-repair', 3, 3, 15000),
('33333333-3333-3333-3333-333333333341', 'Undine Pearl Staff', 'An elegant staff carved from blue coral with massive iridescent pearl orb', 3, 3, 15000),
('33333333-3333-3333-3333-333333333342', 'Gargoyle Stone Shield', 'A heavy tower shield carved from dark granite in menacing gargoyle face shape', 3, 3, 15000),
('33333333-3333-3333-3333-333333333343', 'Djinn Scimitar', 'A curved scimitar with blade forged from compressed air and silver', 3, 3, 15000),
('33333333-3333-3333-3333-333333333344', 'Volcanic Fury Axe', 'A double-bladed battle axe with obsidian blades and glowing lava veins', 3, 3, 15000),
('33333333-3333-3333-3333-333333333345', 'Tempest Rider Boots', 'Tall leather boots with lightning engravings and sky-walking enchantment', 3, 3, 15000);

-- Tier 4 Items (Epic) - 6 powerful elemental artifacts
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('44444444-4444-4444-4444-444444444450', 'Ifrit Flame Sword', 'A magnificent scimitar with blade composed of solidified flames burning eternally', 4, 4, 50000),
('44444444-4444-4444-4444-444444444451', 'Leviathan Tide Armor', 'A scale mail chestpiece constructed from massive blue-green leviathan scales', 4, 4, 50000),
('44444444-4444-4444-4444-444444444452', 'Roc Talon Gauntlets', 'Enormous gauntlets fitted with massive curved roc talons from legendary giant eagle', 4, 4, 50000),
('44444444-4444-4444-4444-444444444453', 'Earth Golem Fists', 'Massive oversized gauntlets constructed from animated living rock and clay', 4, 4, 50000),
('44444444-4444-4444-4444-444444444454', 'Wildfire Phoenix Crown', 'An ornate golden crown shaped like phoenix wings with eternal flames erupting', 4, 4, 50000),
('44444444-4444-4444-4444-444444444455', 'Maelstrom Trident', 'A massive spear with prongs of spiraling water and lightning constantly rotating', 4, 4, 50000);

-- Tier 5 Items (Legendary) - 6 elemental mastery items
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('55555555-5555-5555-5555-555555555560', 'World Storm Avatar Wings', 'Colossal ethereal wings composed of entire weather systems and atmospheric phenomena', 5, 5, 100000),
('55555555-5555-5555-5555-555555555561', 'Tidal Leviathan Crown', 'A magnificent crown crafted from deep blue leviathan scales and bones', 5, 5, 100000),
('55555555-5555-5555-5555-555555555562', 'Tempest Elemental Core', 'A spherical core of pure storm energy with violent lightning and wind swirling within', 5, 5, 100000),
('55555555-5555-5555-5555-555555555563', 'Primordial Earth Titan Armor', 'A massive breastplate constructed from living continental rock and ancient crystal formations', 5, 5, 100000),
('55555555-5555-5555-5555-555555555564', 'Searing Solar Wings', 'Magnificent ethereal wings made of concentrated sunlight and pure fire energy', 5, 5, 100000),
('55555555-5555-5555-5555-555555555565', 'Abyssal Pressure Gauntlets', 'Heavy gauntlets from deep-sea metal containing swirling dark water under impossible pressure', 5, 5, 100000);

-- Tier 6 Items (Mythic) - 6 elemental transcendence items
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('66666666-6666-6666-6666-666666666670', 'Primordial Flame Mace', 'A mace containing the first fire that existed before the universe with reality-bending flames', 6, 6, 1000000),
('66666666-6666-6666-6666-666666666671', 'Volcanic Dragon Skull', 'A crystallized dragon skull blazing with volcanic fire and molten earth power', 6, 6, 1000000),
('66666666-6666-6666-6666-666666666672', 'Planetary Core Hammer', 'An absolutely massive warhammer containing actual planetary core material', 6, 6, 1000000),
('66666666-6666-6666-6666-666666666673', 'Infinite Ocean Amulet', 'A perfect sphere amulet containing infinite ocean water compressed impossibly', 6, 6, 1000000),
('66666666-6666-6666-6666-666666666674', 'Cosmic Wind Scepter', 'An elegant scepter containing swirling solar winds and cosmic gales from between stars', 6, 6, 1000000),
('66666666-6666-6666-6666-666666666675', 'Elemental Chaos Throne', 'A magnificent throne of all four prime elements in perfect violent harmony', 6, 6, 1000000);

