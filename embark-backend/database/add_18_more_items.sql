-- Add 18 More Creature-Themed Items to Embark
-- Run this in your Supabase SQL Editor

-- Tier 1 Items (Common) - 3 creature-themed items
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('11111111-1111-1111-1111-111111111117', 'Bat Wing Bracers', 'Leather bracers reinforced with flexible bat wing membrane', 1, 1, 0),
('11111111-1111-1111-1111-111111111118', 'Bear Claw Gloves', 'Simple leather gloves with embedded bear claws for combat', 1, 1, 0),
('11111111-1111-1111-1111-111111111119', 'Scorpion Tail Whip', 'A flexible leather whip tipped with a venomous scorpion stinger', 1, 1, 0);

-- Tier 2 Items (Uncommon) - 3 creature-themed items
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('22222222-2222-2222-2222-222222222227', 'Serpent Scale Mail', 'Chainmail armor reinforced with shimmering serpent scales', 2, 2, 0),
('22222222-2222-2222-2222-222222222228', 'Dire Wolf Pelt Coat', 'A heavy fur coat crafted from the pelt of a fearsome dire wolf', 2, 2, 0),
('22222222-2222-2222-2222-222222222229', 'Wyvern Spine Bow', 'A powerful recurve bow crafted from flexible wyvern spine', 2, 2, 0);

-- Tier 3 Items (Rare) - 3 creature-themed items
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('33333333-3333-3333-3333-333333333337', 'Sphinx Riddle Ring', 'A mystical gold ring imbued with ancient sphinx wisdom and riddles', 3, 3, 0),
('33333333-3333-3333-3333-333333333338', 'Cockatrice Feather Helm', 'A warrior''s helm adorned with petrifying cockatrice feathers', 3, 3, 0),
('33333333-3333-3333-3333-333333333339', 'Beholder Eye Staff', 'An arcane staff crowned with a preserved beholder''s all-seeing eye', 3, 3, 0);

-- Tier 4 Items (Epic) - 3 creature-themed items
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('44444444-4444-4444-4444-444444444447', 'Lich Bone Scepter', 'A powerful scepter forged from the cursed bones of an ancient lich', 4, 4, 0),
('44444444-4444-4444-4444-444444444448', 'Ancient Drake Scale Greaves', 'Leg armor forged from the impenetrable scales of an ancient drake', 4, 4, 0),
('44444444-4444-4444-4444-444444444449', 'Demon Horn Warglaives', 'Twin curved blades forged from the twisted horns of a pit demon', 4, 4, 0);

-- Tier 5 Items (Legendary) - 3 creature-themed items
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('55555555-5555-5555-5555-555555555557', 'Elder Wyrm Heart Core', 'A crystallized dragon heart pulsing with ancient draconic power', 5, 5, 0),
('55555555-5555-5555-5555-555555555558', 'Behemoth Skull Pauldrons', 'Massive shoulder armor carved from the skull of a legendary behemoth', 5, 5, 0),
('55555555-5555-5555-5555-555555555559', 'Primordial Serpent Fang Daggers', 'Twin daggers carved from the fangs of the world serpent', 5, 5, 0);

-- Tier 6 Items (Mythic) - 3 creature-themed items
INSERT INTO items (id, name, description, rarity_tier, rarity_stars, price) VALUES
('66666666-6666-6666-6666-666666666667', 'Titan''s Crushing Gauntlets', 'Immense gauntlets recovered from a fallen primordial titan', 6, 6, 1000000),
('66666666-6666-6666-6666-666666666668', 'Eldritch Horror Tentacles', 'Living otherworldly tentacles bound from an entity beyond reality', 6, 6, 1000000),
('66666666-6666-6666-6666-666666666669', 'World Eater Dragon Tooth', 'A colossal fang from the legendary reality-devouring dragon', 6, 6, 1000000);


