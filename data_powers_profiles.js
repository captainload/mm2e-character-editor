// Mutants & Masterminds 2nd Edition - Pre-built Powers (Profiles)
// Based on Ultimate Power Chapter Three, Mecha & Manga, and Supplemental Rulebooks.
// Profiles configure power containers with their base effect, modifiers, options, and subpowers.

const POWER_PROFILES_LIST = [
  {
    "name": "Absorption",
    "effectName": "Protection",
    "type": "Trait/Defense",
    "action": "Reaction",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 4,
    "modifiers": [],
    "options": {
      "Absorption Type": "Energy",
      "Boost Trait": "Blast"
    },
    "linkedEffects": [
      {
        "name": "Absorption Boost",
        "effectName": "Enhanced Trait",
        "rank": 1,
        "baseCost": 3,
        "modifiers": [
          { "name": "Action (Reaction)", "ranks": 1, "cost": 3, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
          { "name": "Personal", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
        ],
        "subPowers": [
          { "name": "Temporary Power Points (Boost/Heal)", "rank": 1, "cost": 1, "costType": "per_rank" }
        ],
        "notes": "Gains 2 temporary power points per +1 damage absorbed to Boost trait or Heal as a reaction. Fades at 1 PP/round."
      }
    ],
    "descriptors": "Energy or Physical",
    "notes": "Absorbs damage equal to rank; converts absorbed energy to Boost or Healing (4 PP/rank).",
    "fullText": "<p>You can absorb a particular type of damage and use its energy to improve a trait or heal yourself. Choose physical or energy damage. Subtract your Absorption rank from the damage bonus of the affected attack. If the remaining bonus is +0 or greater, make a normal Toughness save against the remaining damage bonus, otherwise ignore damage completely. You gain 2 temporary power points per +1 damage bonus absorbed to Boost or Heal as a reaction.</p>"
  },
  {
    "name": "Acid",
    "effectName": "Damage",
    "type": "Attack",
    "action": "Standard",
    "range": "Touch",
    "duration": "Instant",
    "savingThrow": "Toughness",
    "baseCost": 3,
    "modifiers": [
      { "name": "Secondary Effect", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Penetrating", "ranks": 1, "cost": 1, "costType": "flat", "category": "extra", "hasRanks": true, "isMeta": false }
    ],
    "descriptors": "Acid, Chemical",
    "notes": "Inflicts damage on round of attack and subsequent round. Penetrating against Impervious.",
    "fullText": "<p>You can generate or exude acid from your hands, affecting anything you can touch. Your acid inflicts damage equal to your power rank on the round of the attack and the round following the attack.</p>"
  },
  {
    "name": "Adaptation",
    "effectName": "Variable",
    "type": "Alteration",
    "action": "Full",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 6,
    "modifiers": [
      { "name": "Action (Full-Round)", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Variable Type": "Environmental Adaptations"
    },
    "notes": "Acquires powers needed to function in hostile environments, up to rank x 5 power points.",
    "fullText": "<p>You can adapt to changing conditions. When you encounter a hostile environment, you acquire the powers you need to function in that environment, up to (rank × 5) power points worth.</p>"
  },
  {
    "name": "Adrenal Surge",
    "effectName": "Enhanced Trait",
    "type": "Alteration",
    "action": "Free",
    "range": "Personal",
    "duration": "Varies",
    "savingThrow": "None",
    "baseCost": 1,
    "modifiers": [
      { "name": "Personal", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false },
      { "name": "Action (Free)", "ranks": 1, "cost": 2, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Tiring", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Boost Trait": "Strength and Constitution"
    },
    "notes": "Temporarily enhances physical ability scores; user is fatigued after bonus fades.",
    "fullText": "<p>You can will a powerful surge of adrenalin to temporarily enhance your physical abilities. You gain a bonus to your Strength and Constitution scores equal to your power rank, which fades at 1 point per round. Fatigued after bonus fades.</p>"
  },
  {
    "name": "Age Shift",
    "effectName": "Morph",
    "type": "Alteration",
    "action": "Free",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 8,
    "rank": 4,
    "options": {
      "Morph Type": "Age alteration"
    },
    "notes": "Allows growing younger or older instantly (+20 to Disguise checks to portray assumed age).",
    "fullText": "<p>You can change your apparent physical age at will, growing 'younger' or 'older' in an instant. Provides +20 bonus to Disguise checks to portray your assumed age.</p>"
  },
  {
    "name": "Air Control",
    "effectName": "Move Object",
    "type": "Control",
    "action": "Standard",
    "range": "Perception",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "modifiers": [
      { "name": "Perception Range", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Medium": "Air/Wind"
    },
    "descriptors": "Air, Wind",
    "notes": "Moves air/wind with effective Strength of rank x 5. Can knock targets prone or deflect attacks.",
    "fullText": "<p>You have the ability to shape and direct masses of air. You can create powerful winds, moving objects with an effective Strength of (rank × 5).</p>"
  },
  {
    "name": "Alternate Form",
    "effectName": "Container",
    "type": "Power Structure",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 5,
    "options": {
      "Form Type": "Energy, Gaseous, Liquid, Particulate, Solid, etc."
    },
    "notes": "Container: Provides (rank x 5) power points to spend on the traits and powers of the assumed form.",
    "fullText": "<p>You can transform into a form other than normal flesh and blood. Choose the form you assume and spend its (rank × 5) power points on the traits of the form. Common alternate forms include: Energy Form, Gaseous Form, Liquid Form, Particulate Form, Semisolid Form, and Solid Form.</p>"
  },
  {
    "name": "Animal Control",
    "effectName": "Mind Control",
    "type": "Mental",
    "action": "Standard",
    "range": "Perception",
    "duration": "Sustained (lasting)",
    "savingThrow": "Will",
    "baseCost": 2,
    "modifiers": [
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false },
      { "name": "Sensory Link", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Target": "Animals only"
    },
    "descriptors": "Mental, Animal",
    "notes": "Mental control over animals (creatures with Int 1 or 2).",
    "fullText": "<p>You can exert mental control over animals (creatures with Int 1 or 2). Make a power check against the animal's Will save to control its actions.</p>"
  },
  {
    "name": "Animal Mimicry",
    "effectName": "Variable",
    "type": "Trait",
    "action": "Free",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 9,
    "modifiers": [
      { "name": "Action (Free)", "ranks": 1, "cost": 2, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Variable Type": "Traits of any animal"
    },
    "notes": "Grants physical ability scores, skill bonuses, feats, and powers of any animal up to rank x 5 PP.",
    "fullText": "<p>You can gain the traits of any animal. You get the animal's physical ability scores and skill bonuses, feats, and powers, up to a total of (rank × 5) power points.</p>"
  },
  {
    "name": "Alternate Form (Energy Form)",
    "effectName": "Container",
    "type": "Power Structure",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 5,
    "modifiers": [],
    "options": {
      "Form Theme": "Energy Form"
    },
    "containedPowers": [
      { "type": "power", "name": "Blast", "effectName": "Damage", "rank": 1, "modifiers": [{ "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra" }] },
      { "type": "power", "name": "Flight", "effectName": "Flight", "rank": 1, "modifiers": [] },
      { "type": "power", "name": "Insubstantial (Energy)", "effectName": "Insubstantial", "rank": 3, "modifiers": [] },
      { "type": "power", "name": "Protection", "effectName": "Protection", "rank": 1, "modifiers": [] }
    ],
    "descriptors": "Energy",
    "notes": "Provides rank x 5 PP of energy form traits (Insubstantial 3, Flight, Energy Blast, Protection).",
    "fullText": "<p>You become a being of coherent energy: fire, electricity, light, or radiation. In addition to Insubstantial 3 (energy), you gain Flight, an Energy Blast attack, and Protection.</p>"
  },
  {
    "name": "Alternate Form (Gaseous Form)",
    "effectName": "Container",
    "type": "Power Structure",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 5,
    "modifiers": [],
    "options": {
      "Form Theme": "Gaseous Form"
    },
    "containedPowers": [
      { "type": "power", "name": "Insubstantial (Gas)", "effectName": "Insubstantial", "rank": 2, "modifiers": [] },
      { "type": "power", "name": "Flight", "effectName": "Flight", "rank": 1, "modifiers": [] },
      { "type": "power", "name": "Suffocate", "effectName": "Suffocate", "rank": 1, "modifiers": [] }
    ],
    "descriptors": "Gas, Vapor, Smoke",
    "notes": "Provides rank x 5 PP of gaseous form traits (Insubstantial 2, Flight, Suffocate / Concealment).",
    "fullText": "<p>You become a cloud of gas, vapor, or smoke. You possess Insubstantial 2 (gaseous), Flight, and either Suffocate or Concealment (Cloud).</p>"
  },
  {
    "name": "Alternate Form (Liquid Form)",
    "effectName": "Container",
    "type": "Power Structure",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 5,
    "modifiers": [],
    "options": {
      "Form Theme": "Liquid Form"
    },
    "containedPowers": [
      { "type": "power", "name": "Insubstantial (Liquid)", "effectName": "Insubstantial", "rank": 1, "modifiers": [] },
      { "type": "power", "name": "Elongation", "effectName": "Elongation", "rank": 1, "modifiers": [] },
      { "type": "power", "name": "Swimming", "effectName": "Swimming", "rank": 2, "modifiers": [] },
      { "type": "power", "name": "Suffocate", "effectName": "Suffocate", "rank": 1, "modifiers": [] }
    ],
    "descriptors": "Liquid, Water",
    "notes": "Provides rank x 5 PP of liquid form traits (Insubstantial 1, Elongation, Swimming, Suffocate).",
    "fullText": "<p>You become a flowing liquid. You possess Insubstantial 1 (liquid), Elongation, Swimming, and can engulf opponents to Suffocate them.</p>"
  },
  {
    "name": "Alternate Form (Particulate Form)",
    "effectName": "Container",
    "type": "Power Structure",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 5,
    "modifiers": [],
    "options": {
      "Form Theme": "Particulate Form"
    },
    "containedPowers": [
      { "type": "power", "name": "Insubstantial (Particulate)", "effectName": "Insubstantial", "rank": 1, "modifiers": [] },
      { "type": "power", "name": "Elongation", "effectName": "Elongation", "rank": 1, "modifiers": [] },
      { "type": "power", "name": "Blast (Sand/Dust)", "effectName": "Damage", "rank": 1, "modifiers": [{ "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra" }] }
    ],
    "descriptors": "Sand, Dust, Particulate",
    "notes": "Provides rank x 5 PP of particulate form traits (Insubstantial 1, Elongation, Sand Blast).",
    "fullText": "<p>You become a cloud of particles such as sand, dust, or ash. You possess Insubstantial 1 (particulate), Elongation, and a particulate Blast.</p>"
  },
  {
    "name": "Alternate Form (Solid Form)",
    "effectName": "Container",
    "type": "Power Structure",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 5,
    "modifiers": [],
    "options": {
      "Form Theme": "Solid Form"
    },
    "containedPowers": [
      { "type": "power", "name": "Density", "effectName": "Density", "rank": 1, "modifiers": [] },
      { "type": "power", "name": "Protection", "effectName": "Protection", "rank": 1, "modifiers": [{ "name": "Impervious", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra" }] },
      { "type": "power", "name": "Super-Strength", "effectName": "Super-Strength", "rank": 1, "modifiers": [] },
      { "type": "power", "name": "Immovable", "effectName": "Immovable", "rank": 1, "modifiers": [] }
    ],
    "descriptors": "Rock, Metal, Ice, Solid",
    "notes": "Provides rank x 5 PP of solid form traits (Density, Impervious Protection, Super-Strength, Immovable).",
    "fullText": "<p>You become dense and solid, such as stone, metal, or dense ice. You gain Density, Impervious Protection, Super-Strength, and Immovable.</p>"
  },
  {
    "name": "Animate Objects",
    "effectName": "Summon",
    "type": "General",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 3,
    "modifiers": [
      { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Minion Type": "Animated Objects"
    },
    "notes": "Imbues inanimate objects with animation and life as constructs under your control.",
    "fullText": "<p>You can imbue objects with animation and a semblance of life, making them constructs under your control with (rank × 15) total power points.</p>"
  },
  {
    "name": "Astral Form",
    "effectName": "ESP",
    "type": "Sensory",
    "action": "Standard",
    "range": "Extended",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 5,
    "modifiers": [
      { "name": "Duration (Continuous)", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "ESP Senses": "Visual, Auditory, Mental"
    },
    "linkedEffects": [
      {
        "name": "Astral Communication",
        "effectName": "Communication",
        "rank": 1,
        "modifiers": [
          { "name": "Subtle", "ranks": 1, "cost": 1, "costType": "flat", "category": "feat", "hasRanks": true, "maxRanks": 2 }
        ],
        "options": { "Medium": "Mental" }
      }
    ],
    "descriptors": "Mental, Astral",
    "notes": "Separates astral mind/spirit from physical body. Incorporeal and invisible.",
    "fullText": "<p>You can separate your astral form—your mind, spirit, or life force—from your physical body. Your body sinks into a coma while your astral form is free to move about on its own. Your astral form is invisible and incorporeal, immune to physical effects, and able to pass freely through material objects.</p>"
  },
  {
    "name": "Banish",
    "effectName": "Super-Movement",
    "type": "Attack",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Will",
    "baseCost": 2,
    "book": "Mecha & Manga",
    "modifiers": [
      { "name": "Attack", "ranks": 1, "cost": 0, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Alternate Save", "ranks": 1, "cost": 0, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "subPowers": [
      { "name": "Dimensional Movement (home dimension)", "rank": 1, "cost": 2, "costType": "per_rank", "type": "Dimensional Movement" }
    ],
    "notes": "Sends specific extradimensional beings back to their home dimension on failed Will save.",
    "fullText": "<p>You can force creatures that do not belong back to where they do. This is Super-Movement (dimensional) with Attack, Range (Ranged) extra, and Limited (specific extradimensional species) flaw.</p>"
  },
  {
    "name": "Blast",
    "effectName": "Damage",
    "type": "Attack",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Toughness",
    "baseCost": 2,
    "modifiers": [
      { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "notes": "Damaging ranged attack roll with range increment of rank x 25 ft.",
    "fullText": "<p>You can make a damaging ranged attack. It might be a blast of energy, a projectile (arrow, bullet, throwing blade), or some similar effect.</p>"
  },
  {
    "name": "Blending",
    "effectName": "Concealment",
    "type": "Alteration",
    "action": "Free",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "modifiers": [
      { "name": "Blending", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Sense Type": "Normal Vision"
    },
    "notes": "Chameleon concealment that functions while moving no faster than normal pace.",
    "fullText": "<p>You can 'blend' into the background, like a super-chameleon matching its surroundings. You gain total concealment from normal vision while moving no faster than normal pace.</p>"
  },
  {
    "name": "Blur",
    "effectName": "Concealment",
    "type": "Alteration",
    "action": "Free",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 4,
    "modifiers": [
      { "name": "Partial", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Sense Type": "All Visual Senses"
    },
    "notes": "Partial concealment from all visual senses (attackers suffer 20% miss chance).",
    "fullText": "<p>You can blur or obscure your outline and form at will, making you difficult to see. You gain partial concealment from all visual senses.</p>"
  },
  {
    "name": "Bouncing",
    "effectName": "Protection",
    "type": "Movement",
    "action": "Reaction",
    "range": "Personal",
    "duration": "Permanent",
    "savingThrow": "None",
    "baseCost": 2,
    "modifiers": [
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "linkedEffects": [
      {
        "name": "Bouncing Rebound",
        "effectName": "Leaping",
        "rank": 1,
        "modifiers": [
          { "name": "Reaction", "ranks": 1, "cost": 3, "costType": "per_rank", "category": "extra" },
          { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw" }
        ]
      }
    ],
    "notes": "Reduces falling and knockback damage; allows rebounding in opposite direction.",
    "fullText": "<p>Rather than hitting a solid surface with a resounding 'thud,' you bounce! Falling or knockback damage up to twice your rank has no effect on you, and you may rebound after impact.</p>"
  },
  {
    "name": "Chi",
    "effectName": "Enhanced Trait",
    "type": "General",
    "action": "Standard/Full",
    "range": "Personal",
    "duration": "Instant",
    "savingThrow": "None",
    "baseCost": 1,
    "modifiers": [
      { "name": "Personal", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Boost Trait": "Physical Ability Scores (Str, Dex, Con)"
    },
    "notes": "Temporarily improves physical ability scores or heals oneself.",
    "fullText": "<p>You can control and channel your chi or life force. Boost physical ability scores (Strength, Dexterity, or Constitution) as a standard action, or heal yourself as a full action.</p>"
  },
  {
    "name": "Clairaudience",
    "effectName": "ESP",
    "type": "Sensory",
    "action": "Move",
    "range": "Extended",
    "duration": "Concentration",
    "savingThrow": "None",
    "baseCost": 1,
    "options": {
      "ESP Senses": "Auditory"
    },
    "notes": "Displaces auditory senses to a distant location.",
    "fullText": "<p>You can hear things at a distant point as if you were actually present. Your rank determines distance on the Extended Range Table.</p>"
  },
  {
    "name": "Clairvoyance",
    "effectName": "ESP",
    "type": "Sensory",
    "action": "Move",
    "range": "Extended",
    "duration": "Concentration",
    "savingThrow": "None",
    "baseCost": 2,
    "options": {
      "ESP Senses": "Visual"
    },
    "notes": "Displaces visual senses to a distant location.",
    "fullText": "<p>You can see things at a distant point as if you were actually present. Your rank determines distance on the Extended Range Table.</p>"
  },
  {
    "name": "Cold Control",
    "effectName": "Environmental Control",
    "type": "General",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Sustained",
    "savingThrow": "Fortitude",
    "baseCost": 2,
    "options": {
      "Environment Type": "Extreme Cold"
    },
    "descriptors": "Cold, Ice",
    "notes": "Creates an area of extreme cold (5 ft radius at rank 1, progressing per rank).",
    "fullText": "<p>You can create an area of extreme cold with a radius of 5 feet at rank 1, expanding on the Progression Table with additional ranks.</p>"
  },
  {
    "name": "Color Control",
    "effectName": "Transform",
    "type": "Control",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Sustained (lasting)",
    "savingThrow": "Reflex",
    "baseCost": 2,
    "modifiers": [
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Transform Type": "Color only"
    },
    "notes": "Transforms colors of objects (5-ft cube per rank). Mobile targets receive Reflex save.",
    "fullText": "<p>You can change the colors of things: making an apple blue, altering costumes, or creating camouflage (+5 to Disguise or Stealth).</p>"
  },
  {
    "name": "Corrosion",
    "effectName": "Damage",
    "type": "Attack",
    "action": "Standard",
    "range": "Touch",
    "duration": "Instant",
    "savingThrow": "Fortitude/Toughness",
    "baseCost": 3,
    "linkedEffects": [
      {
        "name": "Corrosive Drain",
        "effectName": "Drain",
        "rank": 1,
        "modifiers": [
          { "name": "Affects Objects", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra" }
        ],
        "options": { "Drain Trait": "Toughness" }
      }
    ],
    "descriptors": "Acid, Corrosion",
    "notes": "Weaking touch reduces Toughness bonus before applying damage.",
    "fullText": "<p>Your touch causes matter to weaken and corrode. Living targets make a Fortitude save to avoid Toughness reduction, then take damage.</p>"
  },
  {
    "name": "Cosmic Energy Control",
    "effectName": "Damage",
    "type": "Attack",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Toughness",
    "baseCost": 2,
    "modifiers": [
      { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "descriptors": "Cosmic",
    "notes": "Projects blasts of cosmic force; common base for cosmic energy arrays.",
    "fullText": "<p>You wield primal cosmic power. You can project Blasts of cosmic force doing power rank Ranged Damage.</p>"
  },
  {
    "name": "Darkness Control",
    "effectName": "Obscure",
    "type": "Sensory",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "options": {
      "Obscure Senses": "Visual (Normal Sight & Darkvision)"
    },
    "descriptors": "Darkness, Shadow",
    "notes": "Blankets area in darkness, creating total visual concealment.",
    "fullText": "<p>You can blanket an area in darkness, creating total Visual Concealment in a 5-foot radius at rank 1, progressing per rank.</p>"
  },
  {
    "name": "Datalink",
    "effectName": "Communication",
    "type": "Sensory",
    "action": "Free",
    "range": "Extended",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 1,
    "modifiers": [
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Medium": "Radio/Mental (Computers only)"
    },
    "notes": "Interfaces with computer networks and electronic systems over a distance.",
    "fullText": "<p>You can interface with computers over a distance. Choose a sensory medium (typically radio or mental). Allows remote computer skill checks.</p>"
  },
  {
    "name": "Death Touch",
    "effectName": "Drain",
    "type": "Attack",
    "action": "Standard",
    "range": "Touch",
    "duration": "Instant",
    "savingThrow": "Fortitude",
    "baseCost": 1,
    "options": {
      "Drain Trait": "Constitution"
    },
    "descriptors": "Necromantic",
    "notes": "Drains Constitution by touch. Targets reduced to Con 0 are dying.",
    "fullText": "<p>You can inflict death with a mere touch! Melee attack roll drains 1 point of Constitution per point the Fortitude save fails.</p>"
  },
  {
    "name": "Device",
    "effectName": "Container",
    "type": "General",
    "action": "None",
    "range": "Touch",
    "duration": "Special",
    "savingThrow": "None",
    "baseCost": 4,
    "modifiers": [
      { "name": "Hard to Lose", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "notes": "Item granting 5 PP of powers per rank. Hard to lose (4 PP/r) or Easy to lose (3 PP/r).",
    "fullText": "<p>A Device is a container granting you traits (armor, weapons, gadget). 5 power points per rank.</p>"
  },
  {
    "name": "Dimensional Control",
    "effectName": "Teleport",
    "type": "Alteration",
    "action": "Free",
    "range": "Personal",
    "duration": "Special",
    "savingThrow": "None",
    "baseCost": 2,
    "descriptors": "Dimensional",
    "notes": "Alters bodily dimensions: 1-D (line), 2-D (flat), 4-D (sidestep barriers), or 6-D (cross dimensions).",
    "fullText": "<p>You can change the physical dimensions of your body, contracting to fewer than three dimensions or expanding to more.</p>"
  },
  {
    "name": "Dimensional Pocket",
    "effectName": "Super-Movement",
    "type": "Movement",
    "action": "Standard/Move",
    "range": "Touch",
    "duration": "Instant (lasting)",
    "savingThrow": "Reflex/Will",
    "baseCost": 2,
    "descriptors": "Dimensional",
    "modifiers": [
      { "name": "Attack", "ranks": 1, "cost": 0, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "subPowers": [
      { "name": "Dimensional Movement (Pocket Dimension)", "rank": 1, "cost": 2, "costType": "per_rank", "type": "Dimensional Movement" }
    ],
    "notes": "Pocket dimension holds 100 lbs per rank. Can trap opponents with melee touch attack.",
    "fullText": "<p>You have a 'pocket' dimension capable of holding material or creatures (100 lb capacity at rank 1, progressing per rank).</p>"
  },
  {
    "name": "Disease",
    "effectName": "Drain",
    "type": "Attack",
    "action": "Standard",
    "range": "Touch",
    "duration": "See description",
    "savingThrow": "Fortitude",
    "baseCost": 3,
    "modifiers": [
      { "name": "Disease", "ranks": 1, "cost": 2, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Drain Trait": "Constitution"
    },
    "descriptors": "Biological, Disease",
    "notes": "Infects target by touch with disease pathogens requiring daily saves.",
    "fullText": "<p>You can infect others with disease pathogens by touch. Victims make Fortitude saves daily until cured or two saves succeed.</p>"
  },
  {
    "name": "Disintegration",
    "effectName": "Damage",
    "type": "Attack",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Fortitude/Toughness",
    "baseCost": 5,
    "modifiers": [
      { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "linkedEffects": [
      {
        "name": "Disintegrating Drain",
        "effectName": "Drain",
        "rank": 1,
        "modifiers": [
          { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra" },
          { "name": "Affects Objects", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra" }
        ],
        "options": { "Drain Trait": "Toughness" }
      }
    ],
    "descriptors": "Disintegration, Energy",
    "notes": "Ranged attack weakens Toughness before inflicting damage. Atoms atomized on failure by 20+.",
    "fullText": "<p>You can project an attack weakening and destroying the structure of objects. Inflicts Toughness drain followed by damage.</p>"
  },
  {
    "name": "Displacement",
    "effectName": "Concealment",
    "type": "Alteration",
    "action": "Free",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 4,
    "modifiers": [
      { "name": "Partial", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Sense Type": "All Visual Senses"
    },
    "notes": "Visual distortion makes image appear 5 feet away from true position (50% miss chance).",
    "fullText": "<p>You can create a visual distortion that causes you to appear in an area adjacent (about 5 feet away) from where you actually are.</p>"
  },
  {
    "name": "Dream Control",
    "effectName": "Illusion",
    "type": "Control",
    "action": "Standard",
    "range": "Perception",
    "duration": "Sustained",
    "savingThrow": "Will",
    "baseCost": 3,
    "modifiers": [
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Illusion Senses": "All Senses (Sleeping targets only)"
    },
    "descriptors": "Mental, Dream",
    "notes": "Projects vivid, realistic dreams into a sleeping subject's mind.",
    "fullText": "<p>You can project dreams into a subject's mind while they sleep, causing them to experience whatever you want while they dream.</p>"
  },
  {
    "name": "Dream Travel",
    "effectName": "Mind Reading",
    "type": "Movement",
    "action": "Move",
    "range": "Perception",
    "duration": "Sustained",
    "savingThrow": "Will",
    "baseCost": 1,
    "modifiers": [
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Target": "Sleeping Minds only"
    },
    "descriptors": "Mental, Dream",
    "notes": "Mentally enters the dreamscape of a sleeping subject.",
    "fullText": "<p>You can mentally enter the dreams of a sleeping subject, experiencing them as if you were a character within the dream.</p>"
  },
  {
    "name": "Duplication",
    "effectName": "Summon",
    "type": "Alteration",
    "action": "Standard",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "options": {
      "Minion Type": "Duplicate of Self"
    },
    "notes": "Creates a duplicate minion possessing your capabilities (PL equal to power rank).",
    "fullText": "<p>You can create a duplicate of yourself. Your duplicate is a minion with the same capabilities as you, except for this power.</p>"
  },
  {
    "name": "Earth Control",
    "effectName": "Move Object",
    "type": "Control",
    "action": "Standard",
    "range": "Perception",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "modifiers": [
      { "name": "Perception Range", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Limited", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Medium": "Earth, Stone, Minerals"
    },
    "descriptors": "Earth",
    "notes": "Controls and moves earth, soil, rock, and minerals with effective Str of rank x 5.",
    "fullText": "<p>You can control and move a mass of soil, rock, or minerals as a Move Object effect at your power rank.</p>"
  },
  {
    "name": "Elasticity",
    "effectName": "Elongation",
    "type": "Alteration",
    "action": "Move",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 1,
    "notes": "Body stretches over distances; extends reach for melee attacks and checks.",
    "fullText": "<p>Your body is elastic, allowing you to stretch over greater than normal distances, an Elongation effect at your Elasticity power level.</p>"
  },
  {
    "name": "Electrical Control",
    "effectName": "Damage",
    "type": "Attack",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Toughness",
    "baseCost": 2,
    "modifiers": [
      { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "descriptors": "Electricity",
    "notes": "Projects lightning bolts doing Ranged Damage; primary power for electrical arrays.",
    "fullText": "<p>You can generate electricity, projecting a blast of lightning as a Ranged Damage effect at your power rank.</p>"
  },
  {
    "name": "Empowerment",
    "effectName": "Variable",
    "type": "Alteration",
    "action": "Full",
    "range": "Touch",
    "duration": "Sustained",
    "savingThrow": "Will (harmless)",
    "baseCost": 6,
    "modifiers": [
      { "name": "Affects Others", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Others Only", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false },
      { "name": "Action (Full-Round)", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Variable Type": "Bestow powers to others"
    },
    "notes": "Bestows powers to other characters temporarily by touch up to rank x 5 PP.",
    "fullText": "<p>You can bestow powers to others temporarily by touch. You have a pool of (rank × 5) power points you can use to grant powers.</p>"
  },
  {
    "name": "Energy Aura",
    "effectName": "Damage",
    "type": "Attack",
    "action": "Free",
    "range": "Touch",
    "duration": "Sustained",
    "savingThrow": "Toughness",
    "baseCost": 4,
    "modifiers": [
      { "name": "Aura", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Action (Free)", "ranks": 1, "cost": 2, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "descriptors": "Energy",
    "notes": "Damaging energy field surrounds body; damages anyone touching you or striking in melee.",
    "fullText": "<p>You can surround your body with an aura of energy that inflicts damage on anyone coming into contact with you.</p>"
  },
  {
    "name": "Evolutionary Shift",
    "effectName": "Morph",
    "type": "Alteration",
    "action": "Free",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 10,
    "rank": 6,
    "modifiers": [
      { "name": "Metamorph", "ranks": 4, "cost": 1, "costType": "flat", "category": "feat", "hasRanks": true, "maxRanks": 10, "isMeta": false }
    ],
    "options": {
      "Morph Type": "Evolutionary Forms (Primordial, Primitive, Evolved, Transcendent)"
    },
    "notes": "Transforms between 4 distinct evolutionary forms with completely different traits.",
    "fullText": "<p>You can transform yourself by shifting 'up' or 'down' the evolutionary scale, from protoplasmic blob to Cro-Magnon to super-intellect.</p>"
  },
  {
    "name": "Exorcism",
    "effectName": "Nullify",
    "type": "Mental",
    "action": "Standard",
    "range": "Perception",
    "duration": "Instant",
    "savingThrow": "Will",
    "baseCost": 2,
    "modifiers": [
      { "name": "Perception Range", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Nullify Type": "Supernatural entities and mental possessions"
    },
    "descriptors": "Divine, Magic, Holy",
    "notes": "Banishes summoned supernatural creatures and terminates mental control/possession.",
    "fullText": "<p>You can banish summoned creatures back where they came from and end mental influences by creatures opposed to your allegiance.</p>"
  },
  {
    "name": "Fire Control",
    "effectName": "Move Object",
    "type": "Control",
    "action": "Standard",
    "range": "Perception",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "modifiers": [
      { "name": "Perception Range", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Medium": "Fire"
    },
    "descriptors": "Fire",
    "notes": "Controls flame spread and movement (makes fire leap up to rank x 5 feet).",
    "fullText": "<p>You can control the movement and spread of flames with a damage bonus less than or equal to your power rank.</p>"
  },
  {
    "name": "Force Constructs",
    "effectName": "Create Object",
    "type": "General",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "descriptors": "Force",
    "notes": "Forms solid, protective objects and barriers of kinetic/psionic force.",
    "fullText": "<p>You can generate and project a solid force field, forming simple geometric shapes with it like Create Object.</p>"
  },
  {
    "name": "Force Field",
    "effectName": "Protection",
    "type": "Defense",
    "action": "Free",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 1,
    "modifiers": [],
    "descriptors": "Force",
    "notes": "Sustained Protection field. Can be improved with extra effort and power stunts.",
    "fullText": "<p>You can surround yourself with a protective field of force, granting a Toughness saving throw bonus with sustained duration.</p>"
  },
  {
    "name": "Friction Control",
    "effectName": "Snare",
    "type": "Control",
    "action": "Standard",
    "range": "Perception",
    "duration": "Instant",
    "savingThrow": "Reflex",
    "baseCost": 3,
    "modifiers": [
      { "name": "Perception Range", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Entangle", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false },
      { "name": "Area (Burst)", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "notes": "Increases friction to entangle targets or decreases friction to trip (area of rank x 5 ft radius).",
    "fullText": "<p>You can affect the friction of an area of (rank × 5) feet in radius within range: increasing friction (Snare) or decreasing friction (Trip).</p>"
  },
  {
    "name": "Gadgets",
    "effectName": "Variable",
    "type": "General",
    "action": "Standard",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 6,
    "modifiers": [
      { "name": "Easy to Lose", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Variable Type": "Technological Devices / Gadgets"
    },
    "notes": "Produces a wide variety of Devices at will (5 PP per rank).",
    "fullText": "<p>You can produce a wide variety of Devices essentially at will (5 power points per rank to create items).</p>"
  },
  {
    "name": "Gestalt",
    "effectName": "Summon",
    "type": "General",
    "action": "Full",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 1,
    "modifiers": [
      { "name": "Action (Full-Round)", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Minion Type": "Gestalt Component Characters"
    },
    "notes": "Combines two or more component creatures into a single, more powerful entity.",
    "fullText": "<p>A Gestalt is made up of two or more component creatures joining together to form a single, more powerful entity.</p>"
  },
  {
    "name": "Grafting",
    "effectName": "Variable",
    "type": "Alteration",
    "action": "Standard",
    "range": "Touch",
    "duration": "Sustained",
    "savingThrow": "Fortitude",
    "baseCost": 11,
    "linkedEffects": [
      {
        "name": "Graft Separation",
        "effectName": "Anatomic Separation",
        "rank": 1,
        "modifiers": [
          { "name": "Attack", "ranks": 1, "cost": 0, "costType": "per_rank", "category": "extra" }
        ]
      }
    ],
    "notes": "Steals target's body parts and attaches them to yourself to gain their traits.",
    "fullText": "<p>This bizarre power allows you to 'steal' parts of a target's body and replace your own with them, gaining some of their traits.</p>"
  },
  {
    "name": "Gravity Control",
    "effectName": "Move Object",
    "type": "Control",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "modifiers": [
      { "name": "Area (Burst)", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Direction": "Increase or Decrease Gravity"
    },
    "descriptors": "Gravity",
    "notes": "Increases or decreases gravity in radius of rank x 5 feet. Heavy loads pin targets.",
    "fullText": "<p>You can control the intensity of gravity in a radius of (rank × 5) feet within range: increasing or decreasing gravity.</p>"
  },
  {
    "name": "Hellfire Control",
    "effectName": "Damage",
    "type": "Attack",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Toughness",
    "baseCost": 2,
    "modifiers": [
      { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "descriptors": "Hellfire, Mystic",
    "notes": "Generates and projects mystical hellfire blasts (Damage at range).",
    "fullText": "<p>You can generate and project a mystical energy called 'hellfire,' which appears flame-like, although it is not actual fire.</p>"
  },
  {
    "name": "Hypnosis",
    "effectName": "Mind Control",
    "type": "Mental",
    "action": "Standard",
    "range": "Sensory (hearing)",
    "duration": "Sustained",
    "savingThrow": "Will",
    "baseCost": 2,
    "modifiers": [
      { "name": "Sense-Dependent (Auditory)", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false },
      { "name": "Conscious", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "notes": "Places subjects into a hypnotic trance with voice commands (hearing-dependent).",
    "fullText": "<p>You can place subjects into a powerful hypnotic trance with nothing more than the sound of your voice.</p>"
  },
  {
    "name": "Ignite",
    "effectName": "Damage",
    "type": "Attack",
    "action": "Standard",
    "range": "Perception",
    "duration": "Instant",
    "savingThrow": "Toughness",
    "baseCost": 3,
    "modifiers": [
      { "name": "Perception Range", "ranks": 1, "cost": 2, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "descriptors": "Fire",
    "notes": "Causes objects or targets in line of sight to spontaneously combust.",
    "fullText": "<p>You can cause objects in your line of sight to spontaneously combust. Inflicts power rank fire damage at perception range.</p>"
  },
  {
    "name": "Immortality",
    "effectName": "Immunity",
    "type": "Defense",
    "action": "None",
    "range": "Personal",
    "duration": "Permanent",
    "savingThrow": "None",
    "baseCost": 5,
    "rank": 3,
    "subPowers": [
      { "name": "Immunity: Aging", "rank": 1, "cost": 1, "costType": "flat", "type": "Aging" },
      { "name": "Immunity: Disease", "rank": 1, "cost": 1, "costType": "flat", "type": "Disease" },
      { "name": "Immunity: Poison", "rank": 1, "cost": 1, "costType": "flat", "type": "Poison" }
    ],
    "linkedEffects": [
      {
        "name": "Resurrection",
        "effectName": "Regeneration",
        "rank": 1,
        "modifiers": [
          { "name": "True Resurrection", "ranks": 1, "cost": 1, "costType": "flat", "category": "extra" }
        ],
        "options": { "Resurrection": "1 week" }
      }
    ],
    "notes": "Immune to aging, disease, and poison; recovers from death via Resurrection check.",
    "fullText": "<p>You cannot die! Immune to aging, disease, and poison. When killed, make a recovery check after 1 week to revive.</p>"
  },
  {
    "name": "Immutable",
    "effectName": "Immunity",
    "type": "Defense",
    "action": "None",
    "range": "Personal",
    "duration": "Permanent",
    "savingThrow": "None",
    "baseCost": 10,
    "rank": 10,
    "options": {
      "Immunity Category": "Alteration and Trait Effects"
    },
    "notes": "Complete immunity to any effect altering traits (Boost, Drain, Transform, etc.).",
    "fullText": "<p>You are completely immune to any effect that alters your traits, including Boost, Drain, Transform, and other alteration attacks.</p>"
  },
  {
    "name": "Invisibility",
    "effectName": "Concealment",
    "type": "Sensory",
    "action": "Free",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 4,
    "rank": 4,
    "options": {
      "Sense Type": "Normal Vision"
    },
    "notes": "Total concealment from normal visual senses (or all visual for 8 pts).",
    "fullText": "<p>You can become invisible at will. Grants total concealment from normal vision (4 pts) or all visual senses (8 pts).</p>"
  },
  {
    "name": "Kinetic Control",
    "effectName": "Damage",
    "type": "Attack",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Toughness",
    "baseCost": 2,
    "modifiers": [
      { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "descriptors": "Kinetic, Force",
    "notes": "Projects blasts of kinetic force doing Ranged Damage.",
    "fullText": "<p>You can generate and project kinetic energy as a blast of force, a Ranged Damage effect equal to your Kinetic Control power rank.</p>"
  },
  {
    "name": "Life Control",
    "effectName": "Nauseate",
    "type": "General",
    "action": "Standard",
    "range": "Perception",
    "duration": "Instant (lasting)",
    "savingThrow": "Fortitude",
    "baseCost": 4,
    "modifiers": [
      { "name": "Perception Range", "ranks": 1, "cost": 2, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "descriptors": "Biological",
    "notes": "Disrupts biological functions of living targets at perception range.",
    "fullText": "<p>You can exert control over the processes of life and organic matter. Disrupts biological functions at perception range (Nauseate).</p>"
  },
  {
    "name": "Light Control",
    "effectName": "Environmental Control",
    "type": "General",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "options": {
      "Environment Type": "Bright Light"
    },
    "descriptors": "Light",
    "notes": "Generates daylight illumination in radius determined by power rank.",
    "fullText": "<p>You can generate light as bright as daylight, illuminating a radius determined by your power rank.</p>"
  },
  {
    "name": "Machine Animation",
    "effectName": "Summon",
    "type": "Control",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "modifiers": [
      { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Minion Type": "Animated Machines only"
    },
    "notes": "Imbues machines with life and movement as constructs under your command.",
    "fullText": "<p>You can imbue machines with a semblance of life, animating them as constructs under your control.</p>"
  },
  {
    "name": "Magic",
    "effectName": "Array",
    "type": "General",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "None",
    "baseCost": 2,
    "descriptors": "Magic",
    "notes": "Sorcerous spellcasting array with 2 PP per rank for spells and alternate powers.",
    "fullText": "<p>You are a sorcerer, witch, or wizard, able to cast a variety of magical spells (2 points per rank in Array).</p>"
  },
  {
    "name": "Magnetic Control",
    "effectName": "Move Object",
    "type": "General",
    "action": "Standard",
    "range": "Perception",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "modifiers": [
      { "name": "Perception Range", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Medium": "Ferrous Metals only"
    },
    "descriptors": "Magnetic",
    "notes": "Moves and manipulates ferrous metal objects with effective Strength of rank x 5.",
    "fullText": "<p>You can move objects of ferrous metal (iron, steel, nickel, cobalt) like Move Object at your power rank.</p>"
  },
  {
    "name": "Matter-Eater",
    "effectName": "Drain",
    "type": "General",
    "action": "Standard",
    "range": "Touch",
    "duration": "Instant",
    "savingThrow": "None",
    "baseCost": 1,
    "modifiers": [
      { "name": "Affects Objects", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Limited to Objects", "ranks": 1, "cost": -1, "costType": "flaw", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Drain Trait": "Toughness"
    },
    "linkedEffects": [
      {
        "name": "Ingestion Immunity",
        "effectName": "Immunity",
        "rank": 5,
        "options": { "Immunity Category": "Swallowed poisons, toxins, radiation" }
      }
    ],
    "notes": "Can eat and digest virtually anything. Destroys inanimate object Toughness.",
    "fullText": "<p>You have the power to eat (and safely digest) essentially anything you can fit into your mouth.</p>"
  },
  {
    "name": "Mental Blast",
    "effectName": "Damage",
    "type": "Attack",
    "action": "Standard",
    "range": "Perception",
    "duration": "Instant",
    "savingThrow": "Will",
    "baseCost": 4,
    "modifiers": [
      { "name": "Range (Extra)", "ranks": 2, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": true, "maxRanks": 2, "isMeta": false },
      { "name": "Alternate Save", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Alternate Save": "Will"
    },
    "descriptors": "Mental, Psionic",
    "notes": "Strikes target with sheer mental force at perception range (resisted by Will DC 15 + rank).",
    "fullText": "<p>You can strike any target you can accurately perceive with a blast of mental force. Target makes a Will save against damage.</p>"
  },
  {
    "name": "Mental Duplication",
    "effectName": "Variable",
    "type": "Trait",
    "action": "Standard",
    "range": "Touch",
    "duration": "Continuous",
    "savingThrow": "Will",
    "baseCost": 3,
    "modifiers": [
      { "name": "Action (Standard)", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Variable Type": "Target's Mental Skills and Knowledge"
    },
    "descriptors": "Mental, Psionic",
    "notes": "Duplicates target's mental skills and knowledge by touch up to rank x 5 PP.",
    "fullText": "<p>You can 'duplicate' the qualities of another character's mind. Touch target to gain their mental skills and knowledge.</p>"
  },
  {
    "name": "Microwave Control",
    "effectName": "Damage",
    "type": "Attack",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Toughness",
    "baseCost": 2,
    "modifiers": [
      { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "descriptors": "Microwave, Heat",
    "notes": "Emits and controls microwaves and radio waves; Ranged Damage.",
    "fullText": "<p>You can emit and control microwaves (and radio waves), allowing you to project a blast of microwaves as Ranged Damage.</p>"
  },
  {
    "name": "Mimic",
    "effectName": "Variable",
    "type": "Trait",
    "action": "Standard",
    "range": "Touch",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 4,
    "modifiers": [
      { "name": "Action (Standard)", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Mimic Scope": "All powers of a target (4 PP/r)"
    },
    "notes": "Copies traits or powers of a touched subject up to rank x 5 PP.",
    "fullText": "<p>You can imitate one (or more) of another character's traits: abilities, skills, feats, or powers.</p>"
  },
  {
    "name": "Mind Shield",
    "effectName": "Enhanced Trait",
    "type": "Defense",
    "action": "Free",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 1,
    "modifiers": [
      { "name": "Impervious", "ranks": 1, "cost": 1, "costType": "flat", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Trait": "Will Save"
    },
    "descriptors": "Mental, Defense",
    "notes": "Protects against mental effects: auto-succeed on Will saves below rank; +1 to Will vs mental.",
    "fullText": "<p>This power protects you from mental effects. You automatically succeed on Will saves against mental effects with save DC below rank.</p>"
  },
  {
    "name": "Mind Switch",
    "effectName": "Mind Control",
    "type": "Mental",
    "action": "Standard",
    "range": "Perception",
    "duration": "Sustained (lasting)",
    "savingThrow": "Will",
    "baseCost": 2,
    "notes": "Swaps minds with target upon successful opposed Will check.",
    "fullText": "<p>You can switch your mind into the body of another creature, putting its mind into your body.</p>"
  },
  {
    "name": "Mirror Image",
    "effectName": "Concealment",
    "type": "Sensory",
    "action": "Free",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 4,
    "rank": 4,
    "options": {
      "Sense Type": "Visual"
    },
    "notes": "Shifting mirror images grant 50% miss chance against attacks.",
    "fullText": "<p>You can create multiple, shifting mirror images of yourself that appear in areas adjacent to you (50% miss chance).</p>"
  },
  {
    "name": "Mutation",
    "effectName": "Transform",
    "type": "Alteration",
    "action": "Standard",
    "range": "Touch",
    "duration": "Sustained (lasting)",
    "savingThrow": "Fortitude",
    "baseCost": 4,
    "modifiers": [
      { "name": "Range (Touch)", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Transform Type": "Living beings physical traits"
    },
    "notes": "Mutates living beings by touch, changing physical traits and appearance.",
    "fullText": "<p>You can mutate living beings by touch, changing around their physical traits and appearance on failed Fortitude save.</p>"
  },
  {
    "name": "Nemesis",
    "effectName": "Variable",
    "type": "Trait",
    "action": "Free",
    "range": "Perception",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 8,
    "modifiers": [
      { "name": "Action (Free)", "ranks": 1, "cost": 2, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Perception Range", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Variable Type": "Adaptation powers against designated opponent"
    },
    "notes": "Adapts powers suited to fighting a designated opponent up to rank x 5 PP.",
    "fullText": "<p>You can adapt the powers you need to confront a particular opponent. Designate one opponent in perception range as a free action.</p>"
  },
  {
    "name": "Object Mimicry",
    "effectName": "Variable",
    "type": "Alteration",
    "action": "Move",
    "range": "Touch",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 6,
    "modifiers": [
      { "name": "Action (Move)", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Variable Type": "Properties of touched objects"
    },
    "notes": "Copies properties of touched objects (steel, stone, fire, etc.) up to rank x 5 PP.",
    "fullText": "<p>You can copy the properties of objects you touch, giving you various powers (assuming alternate forms of matter/energy).</p>"
  },
  {
    "name": "Pain",
    "effectName": "Stun",
    "type": "Attack",
    "action": "Standard",
    "range": "Perception",
    "duration": "Concentration (lasting)",
    "savingThrow": "Will",
    "baseCost": 5,
    "modifiers": [
      { "name": "Perception Range", "ranks": 1, "cost": 2, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Alternate Save", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Alternate Save": "Will"
    },
    "descriptors": "Mental, Pain",
    "notes": "Inflicts debilitating mental pain at perception range (dazes, stuns, or renders unconscious).",
    "fullText": "<p>You can mentally inflict debilitating pain on a target you can accurately perceive. Resisted by Will save.</p>"
  },
  {
    "name": "Petrification",
    "effectName": "Transform",
    "type": "Alteration",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Sustained (lasting)",
    "savingThrow": "Fortitude",
    "baseCost": 3,
    "options": {
      "Transform Type": "Flesh into Stone"
    },
    "notes": "Turns creatures struck at range into immobile stone on failed Fortitude save.",
    "fullText": "<p>You can project an effect out to normal range that turns creatures it strikes into stone.</p>"
  },
  {
    "name": "Pheromones",
    "effectName": "Emotion Control",
    "type": "Mental",
    "action": "Reaction",
    "range": "Sensory (scent)",
    "duration": "Sustained (lasting)",
    "savingThrow": "Will",
    "baseCost": 4,
    "modifiers": [
      { "name": "Area (Burst)", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Reaction", "ranks": 1, "cost": 3, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Sense-Dependent (Scent)", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false },
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Emotion": "Love / Attraction"
    },
    "descriptors": "Chemical, Pheromone",
    "notes": "Emits biochemical cues that automatically make nearby individuals friendly or devoted.",
    "fullText": "<p>Your body emits exceptionally strong pheromones affecting attraction in a (rank x 5) ft radius.</p>"
  },
  {
    "name": "Plant Control",
    "effectName": "Snare",
    "type": "Control",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Reflex",
    "baseCost": 2,
    "modifiers": [
      { "name": "Medium", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false },
      { "name": "Area (Burst)", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "descriptors": "Plant",
    "notes": "Causes plants in radius of rank x 5 feet to rapidly grow and entangle targets.",
    "fullText": "<p>You can control the growth and movement of plants. Causes plants in an area to rapidly grow and entangle opponents.</p>"
  },
  {
    "name": "Plant Mimicry",
    "effectName": "Variable",
    "type": "Trait",
    "action": "Free",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 9,
    "modifiers": [
      { "name": "Action (Free)", "ranks": 1, "cost": 2, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Variable Type": "Traits of plants"
    },
    "notes": "Gains physical traits of various plants (bark armor, thorns, vines, photosynthesis).",
    "fullText": "<p>You can gain the traits of various plants, transforming to become more plant-like (up to rank x 5 PP).</p>"
  },
  {
    "name": "Plasma Control",
    "effectName": "Damage",
    "type": "Attack",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Toughness",
    "baseCost": 2,
    "modifiers": [
      { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "descriptors": "Plasma, Heat",
    "notes": "Generates and projects high-energy ionized plasma as Ranged Damage.",
    "fullText": "<p>You can generate and project high-energy plasma as a Ranged Damage effect at your Plasma Control rank.</p>"
  },
  {
    "name": "Possession",
    "effectName": "Mind Control",
    "type": "Mental",
    "action": "Standard",
    "range": "Touch",
    "duration": "Sustained (lasting)",
    "savingThrow": "Will",
    "baseCost": 3,
    "modifiers": [
      { "name": "Conscious", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "descriptors": "Mental, Spiritual",
    "notes": "Body merges with target to assume physical and mental control.",
    "fullText": "<p>You can merge with and assume control of a target's body by touch on an opposed check against target's Will save.</p>"
  },
  {
    "name": "Power Control",
    "effectName": "Mind Control",
    "type": "Mental",
    "action": "Standard",
    "range": "Perception",
    "duration": "Sustained (lasting)",
    "savingThrow": "Will",
    "baseCost": 2,
    "modifiers": [
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Control Type": "Powers only"
    },
    "notes": "Overrides target's control over their powers, directing when and how they operate.",
    "fullText": "<p>You can exert influence over the powers of others, overriding the victim's control and controlling when and how their powers operate.</p>"
  },
  {
    "name": "Power Reserve",
    "effectName": "Enhanced Trait",
    "type": "Array",
    "action": "Free",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "modifiers": [
      { "name": "Personal", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false },
      { "name": "Action (Free)", "ranks": 1, "cost": 2, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "notes": "Provides twice power rank in points to re-allocate among chosen powers from round to round.",
    "fullText": "<p>You have a 'reserve' of power points you can assign to improve your various powers, re-allocating them from round to round.</p>"
  },
  {
    "name": "Power Resistance",
    "effectName": "Nullify",
    "type": "Defense",
    "action": "Reaction",
    "range": "Personal",
    "duration": "Instant",
    "savingThrow": "None",
    "baseCost": 2,
    "modifiers": [
      { "name": "Personal", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false },
      { "name": "Reaction", "ranks": 1, "cost": 3, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "notes": "Reaction Nullify opposes incoming powers of a specified descriptor.",
    "fullText": "<p>You are especially resistant to powers of a particular descriptor: when targeted, make an opposed check to negate the power.</p>"
  },
  {
    "name": "Prehensile Hair",
    "effectName": "Additional Limbs",
    "type": "Alteration",
    "action": "None",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 1,
    "modifiers": [
      { "name": "Duration (Sustained)", "ranks": 1, "cost": 0, "costType": "flat", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "linkedEffects": [
      {
        "name": "Hair Extension",
        "effectName": "Elongation",
        "rank": 1
      }
    ],
    "notes": "Hair animates and stretches to grasp objects like fine tentacles.",
    "fullText": "<p>Your hair can animate and grasp objects as if it were one or more fine tentacles.</p>"
  },
  {
    "name": "Radiation Control",
    "effectName": "Damage",
    "type": "Attack",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Toughness",
    "baseCost": 2,
    "modifiers": [
      { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "descriptors": "Radiation",
    "notes": "Projects blasts of glowing radiation as Ranged Damage.",
    "fullText": "<p>You can generate and project blasts of radiation as a Ranged Damage effect at your power rank.</p>"
  },
  {
    "name": "Reflection Field",
    "effectName": "Deflect",
    "type": "Defense",
    "action": "Reaction",
    "range": "Personal",
    "duration": "Instant",
    "savingThrow": "None",
    "baseCost": 8,
    "modifiers": [
      { "name": "Reaction", "ranks": 1, "cost": 3, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Reflection", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Redirection", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "notes": "Reflects and redirects incoming attacks back at attackers as an automatic reaction.",
    "fullText": "<p>You are surrounded by an effect that causes attacks against you to be reflected back against the attacker as a reaction.</p>"
  },
  {
    "name": "Reflex Memory",
    "effectName": "Variable",
    "type": "Trait",
    "action": "Free",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 9,
    "modifiers": [
      { "name": "Action (Free)", "ranks": 1, "cost": 2, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Variable Type": "Observed physical skills and feats"
    },
    "notes": "Memorizes physical skills and combat feats of others just by seeing them performed.",
    "fullText": "<p>You can learn and memorize the physical skills of others just by seeing them performed (5 PP per rank pool).</p>"
  },
  {
    "name": "Seal",
    "effectName": "Super-Movement",
    "type": "Attack",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Sustained (Lasting)",
    "savingThrow": "Will",
    "baseCost": 3,
    "book": "Mecha & Manga",
    "modifiers": [
      { "name": "Attack", "ranks": 1, "cost": 0, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Duration (Sustained)", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "subPowers": [
      { "name": "Dimensional Movement (Prison Dimension)", "rank": 1, "cost": 2, "costType": "per_rank", "type": "Dimensional Movement" }
    ],
    "notes": "Imprisons target inside an object or site keyed as an extradimensional seal.",
    "fullText": "<p>This power attempts to seal a target inside an object or location for imprisonment (Super-Movement dimensional attack).</p>"
  },
  {
    "name": "Sensory Link",
    "effectName": "ESP",
    "type": "Sensory",
    "action": "Move",
    "range": "Extended",
    "duration": "Concentration (lasting)",
    "savingThrow": "Will",
    "baseCost": 2,
    "modifiers": [
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "ESP Senses": "All Senses (via subject's point of view)"
    },
    "descriptors": "Mental, Sensory",
    "notes": "Perceives through the senses of another subject within extended range.",
    "fullText": "<p>You have the power to perceive through the senses of others as if they were your own.</p>"
  },
  {
    "name": "Sensory Shield",
    "effectName": "Enhanced Trait",
    "type": "Defense",
    "action": "Reaction",
    "range": "Personal",
    "duration": "Permanent",
    "savingThrow": "None",
    "baseCost": 2,
    "options": {
      "Protected Senses": "All sensory saves (+2 bonus/r)"
    },
    "notes": "+2 bonus per rank on saves against sensory effects (Dazzle, Obscure). Auto-succeeds against lower ranks.",
    "fullText": "<p>One or more senses are protected against sensory effects, giving +2 bonus per rank on saves against them.</p>"
  },
  {
    "name": "Shape Matter",
    "effectName": "Transform",
    "type": "Control",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Sustained (lasting)",
    "savingThrow": "None",
    "baseCost": 4,
    "options": {
      "Transform Type": "Non-living matter shaping"
    },
    "notes": "Shapes and molds non-living matter like soft clay (1 lb at rank 1, progressing per rank).",
    "fullText": "<p>You can shape and mold non-living matter to your will as if it were soft clay.</p>"
  },
  {
    "name": "Shapeshift",
    "effectName": "Variable",
    "type": "Alteration",
    "action": "Move",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 8,
    "modifiers": [
      { "name": "Action (Move)", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Variable Type": "Physical forms, traits, and powers"
    },
    "notes": "Transforms into different creatures/forms, gaining physical traits and powers up to rank x 5 PP.",
    "fullText": "<p>You can transform into different forms, gaining the physical traits (abilities, skills, feats, powers) of the assumed form.</p>"
  },
  {
    "name": "Shield",
    "effectName": "Enhanced Trait",
    "type": "Defense",
    "action": "Free",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 1,
    "modifiers": [
      { "name": "Duration (Sustained)", "ranks": 1, "cost": 0, "costType": "flat", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Trait": "Dodge Defense Bonus"
    },
    "notes": "Grants dodge bonus to Defense equal to rank with sustained duration.",
    "fullText": "<p>You have a shield able to deflect the brunt of attacks. You gain a dodge bonus to Defense equal to your Shield rank.</p>"
  },
  {
    "name": "Silence",
    "effectName": "Concealment",
    "type": "Sensory",
    "action": "Free",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 1,
    "options": {
      "Sense Type": "Normal Hearing (1 pt) or All Audio (2 pts)"
    },
    "notes": "Moves with complete silence; inaudible at distances greater than 30 feet.",
    "fullText": "<p>You move with complete silence and do not give off noise unless you wish to. Inaudible past 30 feet.</p>"
  },
  {
    "name": "Sleep",
    "effectName": "Fatigue",
    "type": "Attack",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Instant (lasting)",
    "savingThrow": "Fortitude",
    "baseCost": 3,
    "modifiers": [
      { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Sleep", "ranks": 1, "cost": 0, "costType": "flat", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "descriptors": "Biological, Sleep",
    "notes": "Ranged attack causes targets to fall into a deep sleep on failed Fortitude save.",
    "fullText": "<p>You can cause targets to fall into a deep sleep. Ranged attack roll requires Fortitude save vs sleep.</p>"
  },
  {
    "name": "Sonic Control",
    "effectName": "Dazzle",
    "type": "Attack",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Reflex/Fortitude",
    "baseCost": 2,
    "options": {
      "Sense Type": "Auditory (Area Burst)"
    },
    "descriptors": "Sonic, Sound",
    "notes": "Generates deafening blast of sound in radius of rank x 5 feet (Auditory Dazzle).",
    "fullText": "<p>You can generate a deafening blast of sound in a radius of (rank × 5) feet at normal range as an Auditory Dazzle effect.</p>"
  },
  {
    "name": "Spatial Control",
    "effectName": "Teleport",
    "type": "Movement",
    "action": "Move",
    "range": "Personal",
    "duration": "Instant",
    "savingThrow": "None",
    "baseCost": 2,
    "descriptors": "Spatial",
    "notes": "Warps space to teleport and bend topography; base power for spatial manipulation arrays.",
    "fullText": "<p>You can twist and distort space, including distances and topography. Jump across distances instantly like Teleport.</p>"
  },
  {
    "name": "Spinning",
    "effectName": "Enhanced Trait",
    "type": "Defense",
    "action": "Free",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "modifiers": [
      { "name": "Duration (Sustained)", "ranks": 1, "cost": 0, "costType": "flat", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Trait": "Toughness & Grapple/Snare Defense"
    },
    "notes": "Rapid vertical spinning grants bonus to avoid grapples/snares and Toughness bonus.",
    "fullText": "<p>You can spin rapidly along your vertical axis at tremendous speed without becoming disoriented (+rank to avoid grapples/snares and Toughness).</p>"
  },
  {
    "name": "Spirit Control",
    "effectName": "Mind Control",
    "type": "Control",
    "action": "Standard",
    "range": "Perception",
    "duration": "Sustained",
    "savingThrow": "Will",
    "baseCost": 2,
    "modifiers": [
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Target": "Spirits and spiritual creatures only"
    },
    "descriptors": "Spiritual, Mental",
    "notes": "Exerts mental control over incorporeal spirits and ghosts.",
    "fullText": "<p>You can exert control over spirits and spiritual creatures—usually incorporeal supernatural beings.</p>"
  },
  {
    "name": "Strike",
    "effectName": "Damage",
    "type": "Attack",
    "action": "Standard",
    "range": "Touch",
    "duration": "Instant",
    "savingThrow": "Toughness",
    "baseCost": 1,
    "modifiers": [
      { "name": "Mighty", "ranks": 1, "cost": 1, "costType": "flat", "category": "feat", "hasRanks": true, "maxRanks": 10, "isMeta": false }
    ],
    "notes": "Inflicts damage in melee combat; Mighty feat allows Strength damage to stack.",
    "fullText": "<p>This power inflicts damage in melee combat (claws, energy field, horns, martial arts). Mighty feat allows Strength bonus to add.</p>"
  },
  {
    "name": "Super-Speed",
    "effectName": "Speed",
    "type": "Movement",
    "action": "Move",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 5,
    "modifiers": [
      { "name": "Improved Initiative", "ranks": 1, "cost": 1, "costType": "flat", "category": "feat", "hasRanks": true, "maxRanks": 20, "isMeta": false }
    ],
    "linkedEffects": [
      {
        "name": "Super-Quickness",
        "effectName": "Quickness",
        "rank": 1
      }
    ],
    "notes": "Bundles Speed, Quickness, +4 Initiative per rank, and a 2 PP/rank Super-Speed Array.",
    "fullText": "<p>You have Quickness and Speed effects equal to your power rank and a +4 bonus to initiative checks per rank, plus a Super-Speed Array (2 pts/r).</p>"
  },
  {
    "name": "Super-Ventriloquism",
    "effectName": "Communication",
    "type": "Sensory",
    "action": "Free",
    "range": "Extended",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 1,
    "options": {
      "Medium": "Auditory (throw voice)"
    },
    "notes": "Throws voice over extended distances (10 ft at rank 1, progressing per rank).",
    "fullText": "<p>You can 'throw' your voice over a distance, making it seem to originate from somewhere else.</p>"
  },
  {
    "name": "Suspended Animation",
    "effectName": "Immunity",
    "type": "Defense",
    "action": "Full",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 2,
    "rank": 2,
    "options": {
      "Immunity Category": "Life Support (suspended state)"
    },
    "notes": "Enters death-like trance suspending bodily functions with full life support.",
    "fullText": "<p>You can enter a deep death-like trance that largely suspends bodily functions and provides Immunity (life support).</p>"
  },
  {
    "name": "Telekinesis",
    "effectName": "Move Object",
    "type": "General",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "descriptors": "Telekinetic, Psionic",
    "notes": "Moves objects at range by mental will with effective Strength of rank x 5.",
    "fullText": "<p>You can move objects at a distance just by willing it (Move Object at power rank).</p>"
  },
  {
    "name": "Telelocation",
    "effectName": "ESP",
    "type": "Sensory",
    "action": "Full",
    "range": "Extended",
    "duration": "Concentration (lasting)",
    "savingThrow": "Will",
    "baseCost": 1,
    "modifiers": [
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Search": "Mental search for intelligent minds"
    },
    "descriptors": "Mental, Psionic",
    "notes": "Mentally searches for and tracks an intelligent creature within extended range.",
    "fullText": "<p>You can mentally 'search' an area for an intelligent creature and track its location.</p>"
  },
  {
    "name": "Telepathy",
    "effectName": "Mind Reading",
    "type": "Mental",
    "action": "Standard",
    "range": "Perception/Extended",
    "duration": "Concentration (lasting)",
    "savingThrow": "Will",
    "baseCost": 2,
    "linkedEffects": [
      {
        "name": "Mental Communication",
        "effectName": "Communication",
        "rank": 1,
        "options": { "Medium": "Mental" }
      }
    ],
    "descriptors": "Telepathic, Mental",
    "notes": "Reads minds and mentally communicates thoughts over distance.",
    "fullText": "<p>You can read minds and project your thoughts into the minds of others (Mental Communication and Mind Reading).</p>"
  },
  {
    "name": "Thermal Control",
    "effectName": "Environmental Control",
    "type": "General",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Sustained",
    "savingThrow": "Fortitude",
    "baseCost": 2,
    "options": {
      "Environment Type": "Intense Heat or Cold"
    },
    "descriptors": "Temperature, Thermal",
    "notes": "Controls ambient temperature, raising or lowering it in an area.",
    "fullText": "<p>You have the ability to affect the temperature in an area, either raising or lowering it.</p>"
  },
  {
    "name": "Time Control",
    "effectName": "Speed",
    "type": "Movement",
    "action": "Move",
    "range": "Ranged",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 7,
    "modifiers": [
      { "name": "Affects Others", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "linkedEffects": [
      {
        "name": "Time Quickness",
        "effectName": "Quickness",
        "rank": 1,
        "modifiers": [
          { "name": "Affects Others", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra" },
          { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra" }
        ]
      }
    ],
    "descriptors": "Temporal",
    "notes": "Controls time flow; confers Super-Speed traits to yourself and others at range.",
    "fullText": "<p>You can control the flow of time. Grants all benefits of Super-Speed and can share them with another character at range.</p>"
  },
  {
    "name": "Time Stop",
    "effectName": "Paralyze",
    "type": "Attack",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Sustained",
    "savingThrow": "Reflex",
    "baseCost": 7,
    "modifiers": [
      { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Area (Burst)", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Duration (Sustained)", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Alternate Save", "ranks": 1, "cost": 0, "costType": "flat", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Alternate Save": "Reflex"
    },
    "descriptors": "Temporal",
    "notes": "Freezes time in area of rank x 5 ft radius; targets are helpless and frozen.",
    "fullText": "<p>You can 'freeze' time in an area of (rank × 5) feet in radius. Targets failing Reflex save are frozen and helpless.</p>"
  },
  {
    "name": "Transfer",
    "effectName": "Drain",
    "type": "Attack",
    "action": "Standard",
    "range": "Touch",
    "duration": "Instant",
    "savingThrow": "Fortitude",
    "baseCost": 2,
    "linkedEffects": [
      {
        "name": "Transferred Boost",
        "effectName": "Enhanced Trait",
        "rank": 1,
        "modifiers": [
          { "name": "Personal", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw" }
        ]
      }
    ],
    "notes": "Drains points from target's traits and transfers them into your own.",
    "fullText": "<p>You can take power points from a target's traits and add them to your own by touch on a failed Fortitude save.</p>"
  },
  {
    "name": "Transmit",
    "effectName": "Teleport",
    "type": "Movement",
    "action": "Move/Full",
    "range": "Personal",
    "duration": "Instant",
    "savingThrow": "None",
    "baseCost": 1,
    "modifiers": [
      { "name": "Medium", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Medium": "Electricity/Data/Mirrors/Water/Shadows"
    },
    "notes": "Teleports through a specific medium (wires, water, mirrors, shadows, plants).",
    "fullText": "<p>You can move instantly from place to place through a particular medium without crossing the distance in between.</p>"
  },
  {
    "name": "Transmutation",
    "effectName": "Transform",
    "type": "Control",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Sustained (lasting)",
    "savingThrow": "None",
    "baseCost": 5,
    "options": {
      "Transform Type": "Non-living matter elements (5 pts/r)"
    },
    "notes": "Transforms elemental composition of non-living matter into any other material.",
    "fullText": "<p>You can transform the elemental composition of non-living matter, turning one sort of matter into another.</p>"
  },
  {
    "name": "Troubleseeker",
    "effectName": "Teleport",
    "type": "Movement",
    "action": "Full",
    "range": "Personal",
    "duration": "Instant",
    "savingThrow": "None",
    "baseCost": 2,
    "modifiers": [
      { "name": "Action (Full-Round)", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "notes": "Automatically teleports you to the site of trouble or danger within extended range.",
    "fullText": "<p>You have a true talent for finding trouble, automatically teleporting to danger within your extended range.</p>"
  },
  {
    "name": "Universal Translator",
    "effectName": "Comprehend",
    "type": "Sensory",
    "action": "Reaction",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 8,
    "rank": 4,
    "subPowers": [
      { "name": "Languages (Speak all)", "rank": 2, "cost": 2, "costType": "per_rank", "type": "Languages" },
      { "name": "Languages (Understand all)", "rank": 1, "cost": 2, "costType": "per_rank", "type": "Languages" },
      { "name": "Languages (Read all)", "rank": 1, "cost": 2, "costType": "per_rank", "type": "Languages" }
    ],
    "notes": "Understands any spoken/written language and speaks in listeners' native tongues.",
    "fullText": "<p>You can understand any spoken or written language, and anyone who hears you speak hears your words in their native tongue.</p>"
  },
  {
    "name": "Vibration Control",
    "effectName": "Damage",
    "type": "Attack",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Toughness",
    "baseCost": 2,
    "modifiers": [
      { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false }
    ],
    "descriptors": "Vibration, Sonic",
    "notes": "Generates vibratory energy blasts as Ranged Bludgeoning Damage.",
    "fullText": "<p>You can generate and project vibrations, creating a blast of vibratory energy as Ranged Bludgeoning Damage.</p>"
  },
  {
    "name": "Ward",
    "effectName": "Mind Control",
    "type": "Defense",
    "action": "Standard",
    "range": "Touch",
    "duration": "Sustained",
    "savingThrow": "Will",
    "baseCost": 1,
    "modifiers": [
      { "name": "Area (Burst)", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Target": "Specific creature type (e.g. supernatural, demons)"
    },
    "descriptors": "Mystic, Holy",
    "notes": "Hedges out specific creatures from an area up to rank x 5 ft in radius.",
    "fullText": "<p>You can hedge out creatures of a particular type from an area up to (rank × 5) feet in radius around you on a failed Will save.</p>"
  },
  {
    "name": "Water Control",
    "effectName": "Move Object",
    "type": "Control",
    "action": "Standard",
    "range": "Perception",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "modifiers": [
      { "name": "Perception Range", "ranks": 1, "cost": 1, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Limited", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "options": {
      "Medium": "Water"
    },
    "descriptors": "Water",
    "notes": "Controls and moves masses of water with effective Strength of rank x 5.",
    "fullText": "<p>You can control a mass of water (fresh or salt water) like Move Object at your power rank.</p>"
  },
  {
    "name": "Weapon Summoning",
    "effectName": "Damage",
    "type": "Attack",
    "action": "Free",
    "range": "Personal",
    "duration": "See description",
    "savingThrow": "Toughness",
    "baseCost": 2,
    "modifiers": [
      { "name": "Action (Free)", "ranks": 1, "cost": 2, "costType": "per_rank", "category": "extra", "hasRanks": false, "isMeta": false },
      { "name": "Personal", "ranks": 1, "cost": -1, "costType": "per_rank", "category": "flaw", "hasRanks": false, "isMeta": false }
    ],
    "notes": "Summons weapons out of nowhere into your hands, ready for combat.",
    "fullText": "<p>You can summon weapons out of nowhere into your hands, ready to use as a Damage effect.</p>"
  },
  {
    "name": "Weather Control",
    "effectName": "Environmental Control",
    "type": "General",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Sustained",
    "savingThrow": "Fortitude",
    "baseCost": 2,
    "options": {
      "Environment Type": "Cold, Distraction, Hamper Movement, Heat, or Rain"
    },
    "descriptors": "Weather",
    "notes": "Controls and alters atmospheric weather: precipitation, winds, fog, temperature.",
    "fullText": "<p>You can control and alter the weather: cold, distraction (precipitation), hamper movement (icy/wet surfaces), heat, or reduced visibility.</p>"
  }
];

// Automatically attach profiles to their corresponding base effect in POWER_EFFECTS_LIST
if (typeof POWER_EFFECTS_LIST !== 'undefined') {
  POWER_PROFILES_LIST.forEach(profile => {
    const baseEff = POWER_EFFECTS_LIST.find(e => e.name === profile.effectName);
    if (baseEff) {
      if (!baseEff.profiles) baseEff.profiles = [];
      // Avoid duplicate profiles
      if (!baseEff.profiles.some(p => p.name === profile.name)) {
        baseEff.profiles.push(profile);
      }
    }
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { POWER_PROFILES_LIST };
}
