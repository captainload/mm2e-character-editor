const EQUIPMENT_GEAR_LIST = [
  { name: "Binoculars", cost: 1, fullText: "Grants a +2 bonus on Notice checks to see at a distance." },
  { name: "Caltrops", cost: 1, fullText: "Scattered to slow pursuit, causes damage to tires and feet." },
  { name: "Camera", cost: 1, fullText: "Captures visual and audio evidence." },
  { name: "Cell Phone", cost: 1, fullText: "Allows for voice and text communication." },
  { name: "Commlink", cost: 1, fullText: "A tiny earpiece that acts as a two-way radio (Communication 1)." },
  { name: "Computer", cost: 1, fullText: "A laptop or PDA. Required for some Computers skill checks." },
  { name: "Concealable Microphone", cost: 1, fullText: "A bug used for recording or transmitting audio." },
  { name: "Flashlight", cost: 1, fullText: "Pierces normal darkness with a beam of light." },
  { name: "Fire Extinguisher", cost: 1, fullText: "Can extinguish small fires or be used as an impromptu weapon." },
  { name: "Gas Mask", cost: 1, fullText: "Provides Immunity to eye and lung irritants (like tear gas)." },
  { name: "GPS", cost: 1, fullText: "Grants a +2 bonus on Survival and Navigation checks to avoid getting lost." },
  { name: "Handcuffs", cost: 1, fullText: "Requires a DC 30 Escape Artist or DC 25 Strength check to break." },
  { name: "Lock Release Gun", cost: 1, fullText: "Allows the user to make Disable Device checks to open mechanical locks without the standard penalties." },
  { name: "Mini-Tracer", cost: 1, fullText: "A tracking bug. Allows the user to track the target with a receiver (up to 2 miles)." },
  { name: "Multi-tool", cost: 1, fullText: "Contains various tools. Avoids the -4 penalty for not having the proper tools for Craft or Disable Device." },
  { name: "Night Vision Goggles", cost: 1, fullText: "Grants Super-Senses 1 (Darkvision) when worn." },
  { name: "Parabolic Microphone", cost: 1, fullText: "Grants Super-Senses 1 (Extended Hearing)." },
  { name: "PDA", cost: 1, fullText: "Combines a cell phone, computer, and camera." },
  { name: "Restraints", cost: 1, fullText: "Heavy-duty zip ties or similar bindings." },
  { name: "Rebreather", cost: 1, fullText: "Provides 2 hours of oxygen, granting Immunity to suffocation." },
  { name: "Video Camera", cost: 1, fullText: "Records video and audio." }
];

const EQUIPMENT_WEAPONS_LIST = [
  { name: "Brass Knuckles", cost: 1, damage: "+1", type: "Melee", fullText: "Bludgeoning damage, +1 to unarmed damage.", effect: "Damage +1" },
  { name: "Knife", cost: 3, damage: "+1", type: "Melee", fullText: "Piercing damage, improved critical (19-20), thrown.", effect: "Damage +1 (Crit 19-20, Thrown)" },
  { name: "Sword", cost: 5, damage: "+3", type: "Melee", fullText: "Slashing damage, improved critical (19-20).", effect: "Damage +3 (Crit 19-20)" },
  { name: "Club", cost: 2, damage: "+2", type: "Melee", fullText: "Bludgeoning damage.", effect: "Damage +2" },
  { name: "Holdout Pistol", cost: 4, damage: "+2", type: "Ranged", fullText: "Ballistic damage, range 20 ft.", effect: "Blast 2" },
  { name: "Light Pistol", cost: 6, damage: "+3", type: "Ranged", fullText: "Ballistic damage, range 30 ft.", effect: "Blast 3" },
  { name: "Heavy Pistol", cost: 8, damage: "+4", type: "Ranged", fullText: "Ballistic damage, range 40 ft.", effect: "Blast 4" },
  { name: "Submachine Gun", cost: 12, damage: "+4", type: "Ranged", fullText: "Ballistic damage, range 40 ft, Autofire.", effect: "Blast 4 (Autofire)" },
  { name: "Assault Rifle", cost: 16, damage: "+5", type: "Ranged", fullText: "Ballistic damage, range 50 ft, Autofire.", effect: "Blast 5 (Autofire)" },
  { name: "Sniper Rifle", cost: 11, damage: "+5", type: "Ranged", fullText: "Ballistic damage, range 50 ft, Improved Critical (19-20), Improved Aim.", effect: "Blast 5 (Crit 19-20)" },
  { name: "Shotgun", cost: 11, damage: "+5", type: "Ranged", fullText: "Ballistic damage, range 50 ft.", effect: "Blast 5" },
  { name: "Taser", cost: 15, damage: "Stun 5", type: "Ranged", fullText: "Stun 5 (electricity).", effect: "Stun 5" },
  { name: "Bow", cost: 9, damage: "+3", type: "Ranged", fullText: "Piercing damage, range 30 ft. Might have trick arrows.", effect: "Blast 3" },
  { name: "Stun Ammo", cost: 1, fullText: "Can switch firearms to deal non-lethal (Stun) damage instead of lethal.", effect: "Feature" },
  { name: "Stun Gun", cost: 1, fullText: "A melee device inflicting a Stun 5 effect on a successful hit.", effect: "Stun 5" }
];

const EQUIPMENT_GRENADES_LIST = [
  { name: "Frag Grenade", cost: 15, damage: "Blast 5", type: "Area", fullText: "Explosion area, ballistic/fire damage.", effect: "Blast 5 (Explosion Area)" },
  { name: "Smoke Grenade", cost: 12, damage: "Obscure 4", type: "Area", fullText: "Visual obscure, cloud area.", effect: "Obscure 4 (Visual, Cloud Area)" },
  { name: "Tear Gas Grenade", cost: 15, damage: "Dazzle/Nausea 4", type: "Area", fullText: "Cloud area, visual dazzle and nausea (Fortitude).", effect: "Dazzle/Nausea 4 (Cloud Area)" }
];

const EQUIPMENT_ARMOR_LIST = [
  { name: "Leather Armor", cost: 1, toughness: "+1", fullText: "Thick leather, grants +1 Toughness.", effect: "Protection 1" },
  { name: "Undercover Shirt", cost: 2, toughness: "+2", fullText: "Light Kevlar weave, grants +2 Toughness. Subtle.", effect: "Protection 2 (Subtle)" },
  { name: "Chain-mail", cost: 3, toughness: "+3", fullText: "Interlocking metal rings, grants +3 Toughness.", effect: "Protection 3" },
  { name: "Bulletproof Vest", cost: 4, toughness: "+4", fullText: "Heavy ballistic vest, grants +4 Toughness against ballistic attacks.", effect: "Protection 4 (Limited: Ballistic)" },
  { name: "Tactical Vest", cost: 4, toughness: "+4", fullText: "Kevlar tactical armor with pouches, grants +4 Toughness.", effect: "Protection 4" },
  { name: "Plate-mail", cost: 5, toughness: "+5", fullText: "Heavy metal plates, grants +5 Toughness.", effect: "Protection 5" },
  { name: "Riot Armor", cost: 6, toughness: "+6", fullText: "Heavy body armor with helmet, grants +6 Toughness.", effect: "Protection 6" }
];

const VEHICLES_LIST = [
  { name: "Sports Car", cost: 8, size: 0, strength: 25, speed: 5, defense: 9, toughness: 8, category: "Ground" },
  { name: "Motorcycle", cost: 9, size: -1, strength: 15, speed: 5, defense: 10, toughness: 8, category: "Ground" },
  { name: "Truck", cost: 8, size: 1, strength: 35, speed: 5, defense: 8, toughness: 9, category: "Ground" },
  { name: "Helicopter", cost: 12, size: 1, strength: 30, speed: 6, defense: 8, toughness: 7, category: "Air" },
  { name: "Fighter Jet", cost: 21, size: 2, strength: 40, speed: 8, defense: 6, toughness: 11, category: "Air" },
  { name: "Submarine", cost: 14, size: 1, strength: 35, speed: 5, defense: 8, toughness: 9, category: "Water" }
];

const STOCK_INSTALLATIONS = [
  { name: "Abandoned Warehouse", cost: 10, size: 0, toughness: 10, features: "Communications, Computer, Concealed" },
  { name: "Stately Manor", cost: 15, size: 0, toughness: 10, features: "Communications, Computer, Concealed, Garage, Gym, Library, Living Space, Power System" },
  { name: "Sanctum Sanctorum", cost: 14, size: -1, toughness: 15, features: "Concealed, Laboratory, Library, Living Space, Security System, Workshop" },
  { name: "Sea Base", cost: 20, size: 2, toughness: 15, features: "Communications, Computer, Concealed, Dock, Holding Cells, Infirmary, Isolated, Living Space, Power System, Security System" },
  { name: "Moonbase", cost: 22, size: 2, toughness: 15, features: "Communications, Computer, Defense System, Fire Prevention, Hangar, Holding Cells, Infirmary, Isolated, Laboratory, Living Space, Power System, Security System" }
];

const VEHICLE_FEATURES = [
  "Alarm", "Armor", "Caltrops", "Communications", "Hidden Compartments", "Navigation System", "Oil Slick", "Remote Control", "Smokescreen"
];

const INSTALLATION_FEATURES = [
  "Alarm", "Combat Simulator", "Communications", "Computer", "Concealed", "Defense System", "Dock", "Fire Prevention System", 
  "Garage", "Gym", "Hangar", "Holding Cells", "Infirmary", "Isolated", "Laboratory", "Library", "Living Space", "Pool", 
  "Power System", "Security System", "Workshop"
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    EQUIPMENT_GEAR_LIST, EQUIPMENT_WEAPONS_LIST, EQUIPMENT_GRENADES_LIST, EQUIPMENT_ARMOR_LIST, 
    VEHICLES_LIST, STOCK_INSTALLATIONS, VEHICLE_FEATURES, INSTALLATION_FEATURES
  };
} else {
  window.EQUIPMENT_GEAR_LIST = EQUIPMENT_GEAR_LIST;
  window.EQUIPMENT_WEAPONS_LIST = EQUIPMENT_WEAPONS_LIST;
  window.EQUIPMENT_GRENADES_LIST = EQUIPMENT_GRENADES_LIST;
  window.EQUIPMENT_ARMOR_LIST = EQUIPMENT_ARMOR_LIST;
  window.VEHICLES_LIST = VEHICLES_LIST;
  window.STOCK_INSTALLATIONS = STOCK_INSTALLATIONS;
  window.VEHICLE_FEATURES = VEHICLE_FEATURES;
  window.INSTALLATION_FEATURES = INSTALLATION_FEATURES;
}