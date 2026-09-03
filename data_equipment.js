const EQUIPMENT_LIST = {
  weapons: [
    { name: "Brass Knuckles", cost: 1, damage: "+1", type: "Melee", fullText: "Bludgeoning damage, +1 to unarmed damage." },
    { name: "Knife", cost: 3, damage: "+1", type: "Melee", fullText: "Piercing damage, improved critical (19-20), thrown." },
    { name: "Sword", cost: 5, damage: "+3", type: "Melee", fullText: "Slashing damage, improved critical (19-20)." },
    { name: "Club", cost: 2, damage: "+2", type: "Melee", fullText: "Bludgeoning damage." },
    { name: "Holdout Pistol", cost: 4, damage: "+2", type: "Ranged", fullText: "Ballistic damage, range 20 ft." },
    { name: "Light Pistol", cost: 6, damage: "+3", type: "Ranged", fullText: "Ballistic damage, range 30 ft." },
    { name: "Heavy Pistol", cost: 8, damage: "+4", type: "Ranged", fullText: "Ballistic damage, range 40 ft." },
    { name: "Submachine Gun", cost: 12, damage: "+4", type: "Ranged", fullText: "Ballistic damage, range 40 ft, Autofire." },
    { name: "Assault Rifle", cost: 16, damage: "+5", type: "Ranged", fullText: "Ballistic damage, range 50 ft, Autofire." },
    { name: "Sniper Rifle", cost: 11, damage: "+5", type: "Ranged", fullText: "Ballistic damage, range 50 ft, Improved Critical (19-20), Improved Aim." },
    { name: "Shotgun", cost: 11, damage: "+5", type: "Ranged", fullText: "Ballistic damage, range 50 ft." },
    { name: "Taser", cost: 15, damage: "Stun 5", type: "Ranged", fullText: "Stun 5 (electricity)." },
    { name: "Frag Grenade", cost: 15, damage: "Blast 5", type: "Area", fullText: "Explosion area, ballistic/fire damage." },
    { name: "Smoke Grenade", cost: 12, damage: "Obscure 4", type: "Area", fullText: "Visual obscure, cloud area." },
    { name: "Tear Gas Grenade", cost: 15, damage: "Dazzle/Nausea 4", type: "Area", fullText: "Cloud area, visual dazzle and nausea (Fortitude)." },
    { name: "Bow", cost: 9, damage: "+3", type: "Ranged", fullText: "Piercing damage, range 30 ft. Might have trick arrows." }
  ],
  armor: [
    { name: "Leather Armor", cost: 1, toughness: "+1", fullText: "Thick leather, grants +1 Toughness." },
    { name: "Undercover Shirt", cost: 2, toughness: "+2", fullText: "Light Kevlar weave, grants +2 Toughness. Subtle." },
    { name: "Chain-mail", cost: 3, toughness: "+3", fullText: "Interlocking metal rings, grants +3 Toughness." },
    { name: "Bulletproof Vest", cost: 4, toughness: "+4", fullText: "Heavy ballistic vest, grants +4 Toughness against ballistic attacks." },
    { name: "Tactical Vest", cost: 4, toughness: "+4", fullText: "Kevlar tactical armor with pouches, grants +4 Toughness." },
    { name: "Plate-mail", cost: 5, toughness: "+5", fullText: "Heavy metal plates, grants +5 Toughness." },
    { name: "Riot Armor", cost: 6, toughness: "+6", fullText: "Heavy body armor with helmet, grants +6 Toughness." }
  ],
  general: [
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
    { name: "Stun Ammo", cost: 1, fullText: "Can switch firearms to deal non-lethal (Stun) damage instead of lethal." },
    { name: "Stun Gun", cost: 1, fullText: "A melee device inflicting a Stun 5 effect on a successful hit." },
    { name: "Video Camera", cost: 1, fullText: "Records video and audio." }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EQUIPMENT_LIST };
} else {
  window.EQUIPMENT_LIST = EQUIPMENT_LIST;
}