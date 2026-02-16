import type { RarityTier, GachaItem } from '../types/item.types';

// ---------------------------------------------------------------------------
// Full 120-item gacha catalog
// ---------------------------------------------------------------------------

export const ITEM_CATALOG: GachaItem[] = [
  // =======================================================================
  // WARRIOR (18 items) -- the original starter set
  // =======================================================================

  // --- Tier 1 (Common) ---
  {
    id: 'item-001',
    name: 'Bronze Compass',
    description: 'A reliable navigator\'s tool that always points true north.',
    tier: 1,
    category: 'warrior',
    imageFilename: 'bronze-compass.png',
  },
  {
    id: 'item-002',
    name: 'Wooden Training Sword',
    description: 'A practice blade for aspiring warriors, surprisingly sturdy.',
    tier: 1,
    category: 'warrior',
    imageFilename: 'wooden-sword.png',
  },
  {
    id: 'item-003',
    name: 'Leather Journal',
    description: 'A worn tome for recording adventures and arcane notes.',
    tier: 1,
    category: 'warrior',
    imageFilename: 'leather-journal.png',
  },

  // --- Tier 2 (Uncommon) ---
  {
    id: 'item-004',
    name: 'Silver Blade',
    description: 'A finely forged blade that gleams with moonlit sharpness.',
    tier: 2,
    category: 'warrior',
    imageFilename: 'silver-blade.png',
  },
  {
    id: 'item-005',
    name: 'Enchanted Quill',
    description: 'A quill that writes with magical ink that never fades.',
    tier: 2,
    category: 'warrior',
    imageFilename: 'enchanted-quill.png',
  },
  {
    id: 'item-006',
    name: 'Crystal Hourglass',
    description: 'An hourglass filled with shimmering time-touched sand.',
    tier: 2,
    category: 'warrior',
    imageFilename: 'crystal-hourglass.png',
  },

  // --- Tier 3 (Rare) ---
  {
    id: 'item-007',
    name: 'Golden Shield',
    description: 'A radiant shield blessed by ancient paladins.',
    tier: 3,
    category: 'warrior',
    imageFilename: 'golden-shield.png',
  },
  {
    id: 'item-008',
    name: 'Spellbound Lute',
    description: 'A lute whose melodies weave minor enchantments.',
    tier: 3,
    category: 'warrior',
    imageFilename: 'spellbound-lute.png',
  },
  {
    id: 'item-009',
    name: 'Sage Robes',
    description: 'Robes worn by the wise, imbued with arcane knowledge.',
    tier: 3,
    category: 'warrior',
    imageFilename: 'sage-robes.png',
  },

  // --- Tier 4 (Epic) ---
  {
    id: 'item-010',
    name: 'Diamond Amulet',
    description: 'A flawless diamond pendant radiating protective energy.',
    tier: 4,
    category: 'warrior',
    imageFilename: 'diamond-amulet.png',
  },
  {
    id: 'item-011',
    name: 'Starlight Bow',
    description: 'A bow that fires arrows of condensed starlight.',
    tier: 4,
    category: 'warrior',
    imageFilename: 'starlight-bow.png',
  },
  {
    id: 'item-012',
    name: 'Wisdom Tome',
    description: 'An ancient tome containing the secrets of forgotten civilizations.',
    tier: 4,
    category: 'warrior',
    imageFilename: 'wisdom-tome.png',
  },

  // --- Tier 5 (Legendary) ---
  {
    id: 'item-013',
    name: 'Obsidian Crown',
    description: 'A crown forged from volcanic glass, pulsing with dark authority.',
    tier: 5,
    category: 'warrior',
    imageFilename: 'obsidian-crown.png',
  },
  {
    id: 'item-014',
    name: 'Dragonscale Armor',
    description: 'Armor forged from the scales of an elder dragon, nearly impervious.',
    tier: 5,
    category: 'warrior',
    imageFilename: 'dragonscale-armor.png',
  },
  {
    id: 'item-015',
    name: 'Eternal Flame Blade',
    description: 'A sword wreathed in flames that never die.',
    tier: 5,
    category: 'warrior',
    imageFilename: 'eternal-flame-blade.png',
  },

  // --- Tier 6 (Mythic) ---
  {
    id: 'item-016',
    name: 'Phoenix Essence',
    description: 'The crystallized life force of a phoenix, granting rebirth.',
    tier: 6,
    category: 'warrior',
    imageFilename: 'phoenix-essence.png',
  },
  {
    id: 'item-017',
    name: 'Titan Heart Stone',
    description: 'The petrified heart of a primordial titan, still beating.',
    tier: 6,
    category: 'warrior',
    imageFilename: 'titan-heart-stone.png',
  },
  {
    id: 'item-018',
    name: 'Crown of Infinity',
    description: 'A crown that grants its wearer dominion over space and time.',
    tier: 6,
    category: 'warrior',
    imageFilename: 'crown-of-infiniti.png',
  },

  // =======================================================================
  // CREATURE (36 items)
  // =======================================================================

  // --- Tier 1 (Common) ---
  {
    id: 'item-019',
    name: 'Iron Dagger',
    description: 'A basic adventurer\'s blade with a simple crossguard design.',
    tier: 1,
    category: 'creature',
    imageFilename: 'iron-dagger.png',
  },
  {
    id: 'item-020',
    name: 'Traveler\'s Cloak',
    description: 'A road-worn explorer\'s garment offering practical protection.',
    tier: 1,
    category: 'creature',
    imageFilename: 'travelers-cloak.png',
  },
  {
    id: 'item-021',
    name: 'Wolf Tooth Necklace',
    description: 'Gleaming wolf fangs strung on weathered leather cord.',
    tier: 1,
    category: 'creature',
    imageFilename: 'wolf-tooth-necklace.png',
  },
  {
    id: 'item-022',
    name: 'Bat Wing Bracers',
    description: 'Leather bracers reinforced with dark bat wing membrane.',
    tier: 1,
    category: 'creature',
    imageFilename: 'bat-wing-bracers.png',
  },
  {
    id: 'item-023',
    name: 'Bear Claw Gloves',
    description: 'Thick combat gloves with sharp bear claws at the knuckles.',
    tier: 1,
    category: 'creature',
    imageFilename: 'bear-claw-gloves.png',
  },
  {
    id: 'item-024',
    name: 'Scorpion Tail Whip',
    description: 'A flexible whip tipped with a genuine scorpion stinger.',
    tier: 1,
    category: 'creature',
    imageFilename: 'scorpion-tail-whip.png',
  },

  // --- Tier 2 (Uncommon) ---
  {
    id: 'item-025',
    name: 'Falcon Feather Cape',
    description: 'An elegant cape woven from iridescent falcon feathers.',
    tier: 2,
    category: 'creature',
    imageFilename: 'falcon-feather-cloak.png',
  },
  {
    id: 'item-026',
    name: 'Steel Warhammer',
    description: 'A massive steel hammer built for devastating crushing blows.',
    tier: 2,
    category: 'creature',
    imageFilename: 'steel-warhammer.png',
  },
  {
    id: 'item-027',
    name: 'Basilisk Scale Boots',
    description: 'Boots covered in overlapping basilisk scales, resistant to venom.',
    tier: 2,
    category: 'creature',
    imageFilename: 'basilisk-scale-boots.png',
  },
  {
    id: 'item-028',
    name: 'Serpent Scale Mail',
    description: 'Chainmail reinforced with emerald serpent scales.',
    tier: 2,
    category: 'creature',
    imageFilename: 'serpent-scale-mail.png',
  },
  {
    id: 'item-029',
    name: 'Dire Wolf Pelt Coat',
    description: 'A heavy coat crafted from thick silver-grey dire wolf fur.',
    tier: 2,
    category: 'creature',
    imageFilename: 'dire-wolf-pelt-coat.png',
  },
  {
    id: 'item-030',
    name: 'Wyvern Spine Bow',
    description: 'A recurve bow crafted from flexible wyvern spine bone.',
    tier: 2,
    category: 'creature',
    imageFilename: 'wyvern-spine-bow.png',
  },

  // --- Tier 3 (Rare) ---
  {
    id: 'item-031',
    name: 'Griffin Talon Gauntlets',
    description: 'Metal gauntlets with razor-sharp griffin talons, glowing with wind magic.',
    tier: 3,
    category: 'creature',
    imageFilename: 'griffin-talon-gauntlets.png',
  },
  {
    id: 'item-032',
    name: 'Moonstone Staff',
    description: 'An ancient staff crowned with a luminous moonstone orb.',
    tier: 3,
    category: 'creature',
    imageFilename: 'moonstone-staff.png',
  },
  {
    id: 'item-033',
    name: 'Crimson Battle Axe',
    description: 'A double-bladed axe permanently stained crimson from countless victories.',
    tier: 3,
    category: 'creature',
    imageFilename: 'crimson-battle-axe.png',
  },
  {
    id: 'item-034',
    name: 'Sphinx Riddle Ring',
    description: 'A gold ring with sphinx face design, glowing with ancient wisdom.',
    tier: 3,
    category: 'creature',
    imageFilename: 'sphinx-riddle-ring.png',
  },
  {
    id: 'item-035',
    name: 'Cockatrice Feather Helm',
    description: 'A steel helmet adorned with iridescent cockatrice feathers.',
    tier: 3,
    category: 'creature',
    imageFilename: 'cockatrice-feather-helm.png',
  },
  {
    id: 'item-036',
    name: 'Beholder Eye Staff',
    description: 'A twisted staff crowned with a preserved beholder eyeball.',
    tier: 3,
    category: 'creature',
    imageFilename: 'beholder-eye-staff.png',
  },

  // --- Tier 4 (Epic) ---
  {
    id: 'item-037',
    name: 'Hydra Fang Spear',
    description: 'A polearm with a massive curved hydra fang as its spearhead, dripping venom.',
    tier: 4,
    category: 'creature',
    imageFilename: 'hyrda-fang-spear.png',
  },
  {
    id: 'item-038',
    name: 'Celestial Plate Armor',
    description: 'Radiant armor blazing with holy light and celestial star patterns.',
    tier: 4,
    category: 'creature',
    imageFilename: 'celestial-plate-armor.png',
  },
  {
    id: 'item-039',
    name: 'Manticore Spine Blade',
    description: 'A cursed scimitar forged from a manticore\'s venomous tail spine.',
    tier: 4,
    category: 'creature',
    imageFilename: 'manticore-spine-blade.png',
  },
  {
    id: 'item-040',
    name: 'Lich Bone Scepter',
    description: 'A scepter of ancient lich bones, blazing with necromantic energy.',
    tier: 4,
    category: 'creature',
    imageFilename: 'lich-bone-scepter.png',
  },
  {
    id: 'item-041',
    name: 'Ancient Drake Scale Greaves',
    description: 'Leg armor covered in impenetrable crimson drake scales.',
    tier: 4,
    category: 'creature',
    imageFilename: 'ancient-drake-scale-greaves.png',
  },
  {
    id: 'item-042',
    name: 'Demon Horn Warglaives',
    description: 'Twin curved blades forged from twisted obsidian demon horns.',
    tier: 4,
    category: 'creature',
    imageFilename: 'demon-horn-warglaves.png',
  },

  // --- Tier 5 (Legendary) ---
  {
    id: 'item-043',
    name: 'Leviathan Scale Shield',
    description: 'A shield of deep blue leviathan scales, rippling with ocean magic.',
    tier: 5,
    category: 'creature',
    imageFilename: 'leviathan-scale-shield.png',
  },
  {
    id: 'item-044',
    name: 'Stormbreaker Greatsword',
    description: 'An enormous greatsword crackling violently with explosive lightning.',
    tier: 5,
    category: 'creature',
    imageFilename: 'stormbreaker-greatsword.png',
  },
  {
    id: 'item-045',
    name: 'Chimera Heart Amulet',
    description: 'An amulet containing a crystallized chimera heart, blazing with three elements.',
    tier: 5,
    category: 'creature',
    imageFilename: 'chimera-heart-amulet.png',
  },
  {
    id: 'item-046',
    name: 'Elder Wyrm Heart Core',
    description: 'A crystallized dragon heart pulsing with immense fiery energy.',
    tier: 5,
    category: 'creature',
    imageFilename: 'elder-wyrm-heart-core.png',
  },
  {
    id: 'item-047',
    name: 'Behemoth Skull Pauldrons',
    description: 'Massive shoulder armor carved from colossal behemoth skull.',
    tier: 5,
    category: 'creature',
    imageFilename: 'behemoth-skull-pauldrons.png',
  },
  {
    id: 'item-048',
    name: 'Primordial Serpent Fang Daggers',
    description: 'Twin daggers carved from a world serpent\'s fangs, dripping primordial venom.',
    tier: 5,
    category: 'creature',
    imageFilename: 'primordial-serpent-fang-daggers.png',
  },

  // --- Tier 6 (Mythic) ---
  {
    id: 'item-049',
    name: 'Void Dragon Wings',
    description: 'Ethereal wings torn from a void realm dragon, with galaxies swirling within.',
    tier: 6,
    category: 'creature',
    imageFilename: 'void-dragon-wings.png',
  },
  {
    id: 'item-050',
    name: 'Godslayer Halberd',
    description: 'A divine-slaying polearm that cuts through reality itself.',
    tier: 6,
    category: 'creature',
    imageFilename: 'godslayer-halberd.png',
  },
  {
    id: 'item-051',
    name: 'Kraken Eye Orb',
    description: 'A sphere containing a kraken\'s all-seeing eye, gazing across timelines.',
    tier: 6,
    category: 'creature',
    imageFilename: 'kraken-eye-orb.png',
  },
  {
    id: 'item-052',
    name: 'Titan\'s Crushing Gauntlets',
    description: 'Stone gauntlets from a fallen titan, crackling with cosmic power.',
    tier: 6,
    category: 'creature',
    imageFilename: 'titans-crushing-gauntlets.png',
  },
  {
    id: 'item-053',
    name: 'Eldritch Horror Tentacles',
    description: 'Living tentacles from a being beyond reality, warping space around them.',
    tier: 6,
    category: 'creature',
    imageFilename: 'eldritch-horror-tentacles.png',
  },
  {
    id: 'item-054',
    name: 'World Eater Dragon Tooth',
    description: 'A colossal fang from an apocalypse dragon, devouring reality itself.',
    tier: 6,
    category: 'creature',
    imageFilename: 'world-eater-dragon-tooth.png',
  },

  // =======================================================================
  // ELEMENTAL (36 items)
  // =======================================================================

  // --- Tier 1 (Common) ---
  {
    id: 'item-055',
    name: 'Stone Hammer',
    description: 'A simple granite hammer, heavy and reliable.',
    tier: 1,
    category: 'elemental',
    imageFilename: 'stone-hammer.png',
  },
  {
    id: 'item-056',
    name: 'Ember Charm',
    description: 'A small clay amulet with a faintly glowing ember at its center.',
    tier: 1,
    category: 'elemental',
    imageFilename: 'ember-charm.png',
  },
  {
    id: 'item-057',
    name: 'Stream Crystal',
    description: 'A river-polished quartz crystal with a gentle blue tint.',
    tier: 1,
    category: 'elemental',
    imageFilename: 'stream-crystal.png',
  },
  {
    id: 'item-058',
    name: 'Wind-Woven Bracers',
    description: 'Lightweight cloth arm wraps woven for maximum airflow.',
    tier: 1,
    category: 'elemental',
    imageFilename: 'wind-woven-bracers.png',
  },
  {
    id: 'item-059',
    name: 'Magma Pebble',
    description: 'A small volcanic obsidian pebble, still warm from its origin.',
    tier: 1,
    category: 'elemental',
    imageFilename: 'magma-pebble.png',
  },
  {
    id: 'item-060',
    name: 'Gale Feather Quill',
    description: 'A writing quill from a wind bird, light as air itself.',
    tier: 1,
    category: 'elemental',
    imageFilename: 'gale-feather-quill.png',
  },

  // --- Tier 2 (Uncommon) ---
  {
    id: 'item-061',
    name: 'Salamander Scale Gloves',
    description: 'Leather gloves reinforced with heat-resistant salamander scales.',
    tier: 2,
    category: 'elemental',
    imageFilename: 'salamander-scale-gloves.png',
  },
  {
    id: 'item-062',
    name: 'Zephyr Cloak',
    description: 'A silk-light cape that billows in a perpetual unseen breeze.',
    tier: 2,
    category: 'elemental',
    imageFilename: 'zephyr-cloak.png',
  },
  {
    id: 'item-063',
    name: 'Coral Branch Trident',
    description: 'A three-pronged spear crafted from living red and white coral.',
    tier: 2,
    category: 'elemental',
    imageFilename: 'coral-branch-trident.png',
  },
  {
    id: 'item-064',
    name: 'Ash Wood Shield',
    description: 'A fire-hardened shield with glowing ember patterns in its grain.',
    tier: 2,
    category: 'elemental',
    imageFilename: 'ash-wood-shield.png',
  },
  {
    id: 'item-065',
    name: 'Granite Gauntlets',
    description: 'Heavy stone gauntlets carved from solid grey granite.',
    tier: 2,
    category: 'elemental',
    imageFilename: 'granite-gauntlets.png',
  },
  {
    id: 'item-066',
    name: 'Storm Petrel Feather Charm',
    description: 'A necklace of storm bird feathers that crackles with static.',
    tier: 2,
    category: 'elemental',
    imageFilename: 'storm-petrel-feather-charm.png',
  },

  // --- Tier 3 (Rare) ---
  {
    id: 'item-067',
    name: 'Phoenix Feather Mantle',
    description: 'A cape of phoenix feathers that glows with regenerative fire magic.',
    tier: 3,
    category: 'elemental',
    imageFilename: 'phoenix-feather-mantle.png',
  },
  {
    id: 'item-068',
    name: 'Undine Pearl Staff',
    description: 'A coral staff crowned with a pearl orb swirling with water magic.',
    tier: 3,
    category: 'elemental',
    imageFilename: 'undine-pearl-staff.png',
  },
  {
    id: 'item-069',
    name: 'Gargoyle Stone Shield',
    description: 'A granite shield carved as a menacing gargoyle face with glowing red eyes.',
    tier: 3,
    category: 'elemental',
    imageFilename: 'gargoyle-stone-shield.png',
  },
  {
    id: 'item-070',
    name: 'Djinn Scimitar',
    description: 'A curved blade forged from compressed air and silver, humming with wind.',
    tier: 3,
    category: 'elemental',
    imageFilename: 'djinn-scimitar.png',
  },
  {
    id: 'item-071',
    name: 'Volcanic Fury Axe',
    description: 'An obsidian battle axe with glowing lava veins pulsing through its blades.',
    tier: 3,
    category: 'elemental',
    imageFilename: 'volcanic-fury-axe.png',
  },
  {
    id: 'item-072',
    name: 'Tempest Rider Boots',
    description: 'Storm-walking boots with lightning engravings and clouds forming underfoot.',
    tier: 3,
    category: 'elemental',
    imageFilename: 'tempest-rider-boots.png',
  },

  // --- Tier 4 (Epic) ---
  {
    id: 'item-073',
    name: 'Ifrit Flame Sword',
    description: 'A scimitar composed of solidified eternal flames from a fire djinn.',
    tier: 4,
    category: 'elemental',
    imageFilename: 'ifrit-flame-sword.png',
  },
  {
    id: 'item-074',
    name: 'Leviathan Tide Armor',
    description: 'Scale mail of massive leviathan scales with bioluminescent patterns.',
    tier: 4,
    category: 'elemental',
    imageFilename: 'leviathan-tide-armor.png',
  },
  {
    id: 'item-075',
    name: 'Roc Talon Gauntlets',
    description: 'Gauntlets fitted with massive curved talons from a legendary giant eagle.',
    tier: 4,
    category: 'elemental',
    imageFilename: 'roc-talon-gauntlets.png',
  },
  {
    id: 'item-076',
    name: 'Earth Golem Fists',
    description: 'Oversized gauntlets of living rock, causing seismic tremors with every strike.',
    tier: 4,
    category: 'elemental',
    imageFilename: 'earth-golem-fists.png',
  },
  {
    id: 'item-077',
    name: 'Wildfire Phoenix Crown',
    description: 'A golden crown shaped like phoenix wings, erupting with eternal flames.',
    tier: 4,
    category: 'elemental',
    imageFilename: 'wildfire-phoenix-crown.png',
  },
  {
    id: 'item-078',
    name: 'Maelstrom Trident',
    description: 'A trident of spiraling water and lightning, creating vortexes in its wake.',
    tier: 4,
    category: 'elemental',
    imageFilename: 'maelstrom-trident.png',
  },

  // --- Tier 5 (Legendary) ---
  {
    id: 'item-079',
    name: 'World Storm Avatar Wings',
    description: 'Colossal wings composed of entire weather systems and atmospheric storms.',
    tier: 5,
    category: 'elemental',
    imageFilename: 'world-storm-avatar-wings.png',
  },
  {
    id: 'item-080',
    name: 'Tidal Leviathan Crown',
    description: 'A crown of leviathan scales and pearls commanding the ocean itself.',
    tier: 5,
    category: 'elemental',
    imageFilename: 'tidal-leviathan-crown.png',
  },
  {
    id: 'item-081',
    name: 'Tempest Elemental Core',
    description: 'A sphere of pure storm energy with violent lightning trapped within crystal.',
    tier: 5,
    category: 'elemental',
    imageFilename: 'tempest-elemental-core.png',
  },
  {
    id: 'item-082',
    name: 'Primordial Earth Titan Armor',
    description: 'Breastplate of living continental rock with mountain ranges compressed within.',
    tier: 5,
    category: 'elemental',
    imageFilename: 'primordial-earth-titan-armor.png',
  },
  {
    id: 'item-083',
    name: 'Searing Solar Wings',
    description: 'Wings of concentrated sunlight and pure fire, blazing with solar fury.',
    tier: 5,
    category: 'elemental',
    imageFilename: 'searing-solar-wings.png',
  },
  {
    id: 'item-084',
    name: 'Abyssal Pressure Gauntlets',
    description: 'Deep-sea gauntlets that compress air into crushing force on impact.',
    tier: 5,
    category: 'elemental',
    imageFilename: 'abyssal-pressure-gauntlets.png',
  },

  // --- Tier 6 (Mythic) ---
  {
    id: 'item-085',
    name: 'Primordial Flame Mace',
    description: 'A sphere containing the first fire that existed before the universe.',
    tier: 6,
    category: 'elemental',
    imageFilename: 'primordial-flame-mace.png',
  },
  {
    id: 'item-086',
    name: 'Volcanic Dragon Skull',
    description: 'A crystallized dragon skull blazing with volcanic fire and molten earth.',
    tier: 6,
    category: 'elemental',
    imageFilename: 'volcanic-dragon-skull.png',
  },
  {
    id: 'item-087',
    name: 'Planetary Core Hammer',
    description: 'A warhammer containing actual planetary core material under continental pressure.',
    tier: 6,
    category: 'elemental',
    imageFilename: 'planetary-core-hammer.png',
  },
  {
    id: 'item-088',
    name: 'Infinite Ocean Amulet',
    description: 'A sphere containing infinite ocean water from all dimensions compressed impossibly.',
    tier: 6,
    category: 'elemental',
    imageFilename: 'infinite-ocean-amulet.png',
  },
  {
    id: 'item-089',
    name: 'Cosmic Wind Scepter',
    description: 'A scepter channeling solar winds and cosmic gales from between stars.',
    tier: 6,
    category: 'elemental',
    imageFilename: 'cosmic-wind-scepter.png',
  },
  {
    id: 'item-090',
    name: 'Elemental Chaos Throne',
    description: 'A throne of all four elements in violent harmony, breaking physics itself.',
    tier: 6,
    category: 'elemental',
    imageFilename: 'elemental-chaos-throne.png',
  },

  // =======================================================================
  // MYTHOLOGY (30 items)
  // =======================================================================

  // --- Tier 1 (Common) ---
  {
    id: 'item-091',
    name: 'Bronze Spartan Dagger',
    description: 'An ancient Greek warrior\'s blade with classical design.',
    tier: 1,
    category: 'mythology',
    imageFilename: 'bronze-spartan-dagger.png',
  },
  {
    id: 'item-092',
    name: 'Wooden Druid\'s Charm',
    description: 'A hand-carved oak leaf amulet with Celtic knotwork.',
    tier: 1,
    category: 'mythology',
    imageFilename: 'wooden-druids-charm.png',
  },
  {
    id: 'item-093',
    name: 'Clay Ra Scarab',
    description: 'A clay scarab amulet with faded hieroglyphic engravings.',
    tier: 1,
    category: 'mythology',
    imageFilename: 'clay-ra-scarab.png',
  },
  {
    id: 'item-094',
    name: 'Jade Dragon Pendant',
    description: 'A small carved jade stone shaped like a coiled Eastern dragon.',
    tier: 1,
    category: 'mythology',
    imageFilename: 'jade-dragon-pendant.png',
  },
  {
    id: 'item-095',
    name: 'Iron Viking Armband',
    description: 'A forged iron band with Thor\'s hammer pattern engravings.',
    tier: 1,
    category: 'mythology',
    imageFilename: 'iron-viking-armband.png',
  },

  // --- Tier 2 (Uncommon) ---
  {
    id: 'item-096',
    name: 'Athena\'s Owl Wing Cape',
    description: 'A cape of grey owl feathers blessed with a hint of divine wisdom.',
    tier: 2,
    category: 'mythology',
    imageFilename: 'athenas-owl-wing-cape.png',
  },
  {
    id: 'item-097',
    name: 'Anubis Jackal Mask',
    description: 'A ceremonial black and gold mask in the visage of the death god.',
    tier: 2,
    category: 'mythology',
    imageFilename: 'anubis-jackal-mask.png',
  },
  {
    id: 'item-098',
    name: 'Yggdrasil Branch Staff',
    description: 'A staff carved from the World Tree, still growing green leaves.',
    tier: 2,
    category: 'mythology',
    imageFilename: 'yggdrasil-branch-staff.png',
  },
  {
    id: 'item-099',
    name: 'Kitsune Tail Sash',
    description: 'An elegant silk sash with fox spirit embroidery and faint illusion magic.',
    tier: 2,
    category: 'mythology',
    imageFilename: 'kitsune-tail-sash.png',
  },
  {
    id: 'item-100',
    name: 'Celtic Torc Necklace',
    description: 'A twisted bronze neck ring with ornate animal head terminals.',
    tier: 2,
    category: 'mythology',
    imageFilename: 'celtic-torc-necklace.png',
  },

  // --- Tier 3 (Rare) ---
  {
    id: 'item-101',
    name: 'Poseidon\'s Coral Trident',
    description: 'A three-pronged spear of enchanted coral, swirling with ocean magic.',
    tier: 3,
    category: 'mythology',
    imageFilename: 'poseidons-coral-trident.png',
  },
  {
    id: 'item-102',
    name: 'Thor\'s Hammer Pendant',
    description: 'A silver Mjolnir pendant crackling with visible electrical energy.',
    tier: 3,
    category: 'mythology',
    imageFilename: 'thors-hammer-pendant.png',
  },
  {
    id: 'item-103',
    name: 'Isis Wings Cloak',
    description: 'A golden-winged cape radiating the Egyptian goddess\'s divine protection.',
    tier: 3,
    category: 'mythology',
    imageFilename: 'isis-wings-cloak.png',
  },
  {
    id: 'item-104',
    name: 'Fenrir Fang Blade',
    description: 'A curved sword forged from the doom wolf\'s fang, pulsing with dark chaos.',
    tier: 3,
    category: 'mythology',
    imageFilename: 'fenrir-fang-blade.png',
  },
  {
    id: 'item-105',
    name: 'Jade Emperor Crown',
    description: 'An imperial jade crown with phoenix and dragon motifs blazing with divine light.',
    tier: 3,
    category: 'mythology',
    imageFilename: 'jade-emperor-crown.png',
  },

  // --- Tier 4 (Epic) ---
  {
    id: 'item-106',
    name: 'Medusa\'s Petrifying Gaze Shield',
    description: 'A bronze shield with Medusa\'s head, its eyes still blazing with petrification power.',
    tier: 4,
    category: 'mythology',
    imageFilename: 'medusas-petrifying-gaze-shield.png',
  },
  {
    id: 'item-107',
    name: 'Valkyrie\'s Soul Reaping Spear',
    description: 'A Norse spear that harvests warrior souls for Valhalla.',
    tier: 4,
    category: 'mythology',
    imageFilename: 'valkyries-soul-reaping-spear.png',
  },
  {
    id: 'item-108',
    name: 'Ra\'s Solar Disc Crown',
    description: 'An Egyptian crown with a blazing golden sun disc of divine solar fire.',
    tier: 4,
    category: 'mythology',
    imageFilename: 'ras-solar-disc-crown.png',
  },
  {
    id: 'item-109',
    name: 'Susanoo Storm Blade',
    description: 'A legendary katana crackling with the Japanese storm god\'s typhoon power.',
    tier: 4,
    category: 'mythology',
    imageFilename: 'susanoo-storm-blade.png',
  },
  {
    id: 'item-110',
    name: 'Excalibur\'s Divine Scabbard',
    description: 'The legendary scabbard blazing with Avalon\'s healing and protection magic.',
    tier: 4,
    category: 'mythology',
    imageFilename: 'excaliburs-divine-scabbard.png',
  },

  // --- Tier 5 (Legendary) ---
  {
    id: 'item-111',
    name: 'Zeus Lightning Bolt Spear',
    description: 'The king of gods\' weapon, forged from solidified lightning bolts.',
    tier: 5,
    category: 'mythology',
    imageFilename: 'zeus-lightning-bolt-spear.png',
  },
  {
    id: 'item-112',
    name: 'Odin\'s All-Seeing Eye',
    description: 'A crystalline orb containing the Allfather\'s sacrificed eye, seeing all nine realms.',
    tier: 5,
    category: 'mythology',
    imageFilename: 'odins-all-seeing-eye.png',
  },
  {
    id: 'item-113',
    name: 'Osiris Resurrection Ankh',
    description: 'A golden ankh blazing with the power to reverse death itself.',
    tier: 5,
    category: 'mythology',
    imageFilename: 'osiris-resurrection-ankh.png',
  },
  {
    id: 'item-114',
    name: 'Amaterasu Sun Mirror',
    description: 'A sacred mirror blazing with the Japanese sun goddess\'s blinding radiance.',
    tier: 5,
    category: 'mythology',
    imageFilename: 'amaterasu-sun-mirror.png',
  },
  {
    id: 'item-115',
    name: 'Loki\'s Reality-Bending Mask',
    description: 'A shape-shifting mask warping reality with the trickster god\'s chaos.',
    tier: 5,
    category: 'mythology',
    imageFilename: 'lokis-reality-bending-mask.png',
  },

  // --- Tier 6 (Mythic) ---
  {
    id: 'item-116',
    name: 'Kronos Time-Devouring Scythe',
    description: 'A titan\'s scythe that cuts through time itself, unraveling causality.',
    tier: 6,
    category: 'mythology',
    imageFilename: 'kronos-time-devouring-scythe.png',
  },
  {
    id: 'item-117',
    name: 'Yggdrasil World Tree Heart',
    description: 'The crystallized heart of the cosmic tree, containing all nine realms.',
    tier: 6,
    category: 'mythology',
    imageFilename: 'yggdrasil-world-tree-heart.png',
  },
  {
    id: 'item-118',
    name: 'J\u00F6rmungandr World Serpent',
    description: 'Scales from the Midgard serpent, radiating world-constricting venom.',
    tier: 6,
    category: 'mythology',
    imageFilename: 'jormungandr-world-serpent.png',
  },
  {
    id: 'item-119',
    name: 'Brahma\'s Creation Lotus',
    description: 'A golden lotus from which entire universes bloom into existence.',
    tier: 6,
    category: 'mythology',
    imageFilename: 'brahmas-creation-lotus.png',
  },
  {
    id: 'item-120',
    name: 'Ragnarok Twilight Sword',
    description: 'Surtr\'s apocalyptic blade, burning with the fire that ends all worlds.',
    tier: 6,
    category: 'mythology',
    imageFilename: 'ragnarok-twilight-sword.png',
  },
];

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const DROP_RATES: Record<RarityTier, number> = {
  1: 0.40,
  2: 0.25,
  3: 0.18,
  4: 0.10,
  5: 0.05,
  6: 0.02,
};

export const SELL_PRICES: Record<RarityTier, number> = {
  1: 500,
  2: 1500,
  3: 5000,
  4: 15000,
  5: 50000,
  6: 150000,
};

export const BUY_PRICES: Record<RarityTier, number> = {
  1: 1000,
  2: 3000,
  3: 10000,
  4: 30000,
  5: 100000,
  6: 300000,
};

export const TIER_NAMES: Record<RarityTier, string> = {
  1: 'Common',
  2: 'Uncommon',
  3: 'Rare',
  4: 'Epic',
  5: 'Legendary',
  6: 'Mythic',
};

// ---------------------------------------------------------------------------
// Indexed lookups
// ---------------------------------------------------------------------------

export const ITEM_BY_ID: Record<string, GachaItem> = Object.fromEntries(
  ITEM_CATALOG.map(item => [item.id, item])
);

export const ITEMS_BY_TIER: Record<RarityTier, GachaItem[]> = {
  1: ITEM_CATALOG.filter(i => i.tier === 1),
  2: ITEM_CATALOG.filter(i => i.tier === 2),
  3: ITEM_CATALOG.filter(i => i.tier === 3),
  4: ITEM_CATALOG.filter(i => i.tier === 4),
  5: ITEM_CATALOG.filter(i => i.tier === 5),
  6: ITEM_CATALOG.filter(i => i.tier === 6),
};

export const TOTAL_ITEMS = ITEM_CATALOG.length;
