-- Add 18 New Items to Embark
-- Run this in your Supabase SQL Editor

-- Tier 1 Items (Common) - 3 new items
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('11111111-1111-1111-1111-111111111114', 'Iron Dagger', 'A basic but reliable iron dagger for close combat', 1, 1, 0),
('11111111-1111-1111-1111-111111111115', 'Traveler''s Cloak', 'A sturdy cloak for protection against the elements', 1, 1, 0),
('11111111-1111-1111-1111-111111111116', 'Wolf Tooth Necklace', 'A necklace crafted from wolf fangs, symbol of a hunter', 1, 1, 0);

-- Tier 2 Items (Uncommon) - 3 new items
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('22222222-2222-2222-2222-222222222224', 'Falcon Feather Cape', 'A light cape adorned with falcon feathers for agility', 2, 2, 0),
('22222222-2222-2222-2222-222222222225', 'Steel Warhammer', 'A heavy warhammer forged from solid steel', 2, 2, 0),
('22222222-2222-2222-2222-222222222226', 'Basilisk Scale Boots', 'Boots crafted from basilisk scales, resistant to venom', 2, 2, 0);

-- Tier 3 Items (Rare) - 3 new items
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('33333333-3333-3333-3333-333333333334', 'Griffin Talon Gauntlets', 'Gauntlets enhanced with griffin talons for devastating strikes', 3, 3, 0),
('33333333-3333-3333-3333-333333333335', 'Moonstone Staff', 'A mystical staff crowned with a glowing moonstone', 3, 3, 0),
('33333333-3333-3333-3333-333333333336', 'Crimson Battle Axe', 'A battle axe stained red from countless victories', 3, 3, 0);

-- Tier 4 Items (Epic) - 3 new items
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('44444444-4444-4444-4444-444444444444', 'Hydra Fang Spear', 'A spear tipped with a venomous hydra fang', 4, 4, 0),
('44444444-4444-4444-4444-444444444445', 'Celestial Plate Armor', 'Radiant armor blessed by celestial beings', 4, 4, 0),
('44444444-4444-4444-4444-444444444446', 'Manticore Spine Blade', 'A curved blade forged from a manticore''s tail spine', 4, 4, 0);

-- Tier 5 Items (Legendary) - 3 new items
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('55555555-5555-5555-5555-555555555554', 'Leviathan Scale Shield', 'An impenetrable shield made from leviathan scales', 5, 5, 0),
('55555555-5555-5555-5555-555555555555', 'Stormbreaker Greatsword', 'A massive sword crackling with storm energy', 5, 5, 0),
('55555555-5555-5555-5555-555555555556', 'Chimera Heart Amulet', 'An amulet containing the tri-elemental heart of a chimera', 5, 5, 0);

-- Tier 6 Items (Mythic) - 3 new items
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('66666666-6666-6666-6666-666666666664', 'Void Dragon Wings', 'Ethereal wings torn from a dragon of the void realm', 6, 6, 1000000),
('66666666-6666-6666-6666-666666666665', 'Godslayer Halberd', 'A legendary polearm capable of felling immortals', 6, 6, 1000000),
('66666666-6666-6666-6666-666666666666', 'Kraken Eye Orb', 'A mystical orb containing the all-seeing eye of a kraken', 6, 6, 1000000);

