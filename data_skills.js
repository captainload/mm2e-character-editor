const SKILLS_LIST = [
  {
    name: "Acrobatics",
    ability: "DEX",
    untrained: false,
    action: "Move or None",
    specializations: [],
    relatedFeats: ["Acrobatic Bluff", "Evasion"],
    fullText: "<p>You can flip, dive, roll, tumble, and perform other acrobatic maneuvers, as well as keep your balance under difficult circumstances.</p><ul><li><strong>Balance:</strong> You can keep your balance on a precarious surface. A successful check lets you move at half speed. Failure by 4 or less means you can’t move. Failure by 5 or more means you fall.</li><li><strong>Tumble:</strong> You can tumble past an opponent to avoid an attack of opportunity, or move through an occupied square (DC 15 or opposed by attack roll).</li><li><strong>Stand:</strong> You can stand up from a prone position as a free action with a DC 20 check.</li><li><strong>Reduce Falling Damage:</strong> With a DC 15 Acrobatics check, you can treat a fall as if it were 10 feet shorter when determining damage.</li></ul>"
  },
  {
    name: "Bluff",
    ability: "CHA",
    untrained: true,
    action: "Standard",
    specializations: [],
    relatedFeats: ["Attractive", "Fascinate", "Taunt"],
    fullText: "<p>You can make the outlandish seem credible, using acting, fast-talk, trickery, or subterfuge.</p><ul><li><strong>Deceive:</strong> Opposed check against the target's Sense Motive. Modifiers apply based on how believable the lie is.</li><li><strong>Feint:</strong> Standard action in combat. Opposed by Sense Motive or Bluff. If successful, the target loses their dodge bonus to Defense against your next attack.</li><li><strong>Trick:</strong> Convince an opponent to take a specific action that leaves them heedless of danger. Opposed by Sense Motive.</li><li><strong>Innuendo:</strong> Pass hidden messages. The DC for a basic message is 15.</li></ul>"
  },
  {
    name: "Climb",
    ability: "STR",
    untrained: true,
    action: "Move",
    specializations: [],
    relatedFeats: [],
    fullText: "<p>You are skilled at scaling vertical surfaces.</p><p>A successful check allows you to move up, down, or across a slope or wall at one-quarter your normal speed. A failure by 4 or less means you make no progress. A failure by 5 or more means you fall.</p><ul><li><strong>Accelerated Climbing:</strong> You can move at half your speed with a –5 penalty on the check.</li><li><strong>Catch Yourself:</strong> If you fall, you can try to catch yourself with a successful check (DC = wall's DC + 20).</li><li><strong>Synergy:</strong> If you have 5 or more ranks in Use Rope, you get a +2 bonus on Climb checks involving climbing ropes.</li></ul>"
  },
  {
    name: "Computers",
    ability: "INT",
    untrained: false,
    action: "Standard or Extended",
    specializations: [],
    relatedFeats: ["Online Research", "Inventor"],
    fullText: "<p>You can operate, repair, and even compromise computer systems and networks.</p><ul><li><strong>Find Information:</strong> Requires 1 minute to 1 hour depending on the data. DC varies from 10 (public) to 30 (highly classified).</li><li><strong>Defeat Security:</strong> Hack into a secure system. DC is based on the security level. Takes a standard action or up to 10 minutes per check.</li><li><strong>Write Program:</strong> Create custom software. Takes hours to months. DC 15 to 30+.</li></ul>"
  },
  {
    name: "Concentration",
    ability: "WIS",
    untrained: true,
    action: "None",
    specializations: [],
    relatedFeats: ["Trance"],
    fullText: "<p>You are adept at maintaining your focus when distracted or injured.</p><ul><li><strong>Maintain Effect:</strong> If you suffer damage while maintaining a sustained or concentration duration effect, you must make a check (DC = 10 + damage dealt). If you fail, the effect ends.</li><li><strong>Distractions:</strong> Weather, vigorous motion, or chaotic environments may require a DC 15 to 20 check to maintain an effect.</li></ul>"
  },
  {
    name: "Craft",
    ability: "INT",
    untrained: false,
    action: "Extended",
    specializations: ["Artistic", "Chemical", "Electronic", "Mechanical", "Structural"],
    relatedFeats: ["Inventor", "Artificer", "Improvised Tools"],
    fullText: "<p>You are trained in a specific craft or trade. This skill must be purchased with a specific specialization (e.g., Mechanical, Electronic, Structural, Chemical).</p><ul><li><strong>Build Item:</strong> Craft an item from scratch. You must have raw materials. DC varies by complexity (Simple DC 10, Complex DC 20+). Building takes time based on the value of the item.</li><li><strong>Repair Item:</strong> Repair a damaged item. Requires a standard action (in combat) or minutes (out of combat). DC is typically 10 to 20.</li><li><strong>Inventing:</strong> Combined with the Inventor feat, Craft (Electronic or Mechanical) is used to create temporary devices.</li></ul>"
  },
  {
    name: "Diplomacy",
    ability: "CHA",
    untrained: true,
    action: "Full-Round or Extended",
    specializations: [],
    relatedFeats: ["Attractive", "Connected", "Fascinate"],
    fullText: "<p>You can use diplomacy and negotiation to resolve differences and persuade others.</p><ul><li><strong>Change Attitudes:</strong> You can change the attitude of a nonplayer character (NPC) with a successful check. The DC depends on the target's starting attitude (Hostile DC 25, Unfriendly DC 20, Indifferent DC 15).</li><li><strong>Negotiate:</strong> Reach an agreement or compromise. Opposed check against the target's Diplomacy or Sense Motive.</li><li><strong>Time:</strong> Diplomacy generally takes at least 1 minute of continuous interaction. You can attempt it as a full-round action with a –10 penalty.</li></ul>"
  },
  {
    name: "Disable Device",
    ability: "INT",
    untrained: false,
    action: "Standard or Extended",
    specializations: [],
    relatedFeats: ["Improvised Tools"],
    fullText: "<p>You can disarm traps, open locks, and sabotage complex mechanical or electronic devices.</p><ul><li><strong>Open Locks:</strong> Requires thieves' tools (or taking a –4 penalty). DC ranges from 20 (simple lock) to 40 (high-security safe). Takes a full-round action.</li><li><strong>Sabotage:</strong> Disable a device or vehicle. Simple devices (jam a lock) take 1 round (DC 10). Complex devices (disarm a bomb) take 1d4 rounds or minutes (DC 20-30+).</li><li><strong>Failure:</strong> If you fail by 4 or less, you can try again. If you fail by 5 or more, something goes wrong (the bomb goes off, the lock jams).</li></ul>"
  },
  {
    name: "Disguise",
    ability: "CHA",
    untrained: true,
    action: "Extended",
    specializations: [],
    relatedFeats: ["Quick Change"],
    fullText: "<p>You can change your appearance or the appearance of someone else.</p><p>Creating a disguise takes 1d3 × 10 minutes. The check result determines the DC for someone trying to spot the disguise with an opposed Spot check.</p><ul><li><strong>Modifiers:</strong> Minor details (+5), different gender (–2), different race (–2), different age category (–2), different size category (–10).</li><li><strong>Magic/Powers:</strong> Powers like Morph grant a massive bonus to Disguise checks (usually +20).</li></ul>"
  },
  {
    name: "Drive",
    ability: "DEX",
    untrained: true,
    action: "Move",
    specializations: [],
    relatedFeats: [],
    fullText: "<p>You can drive terrestrial vehicles, such as cars, motorcycles, and trucks.</p><p>Routine driving doesn't require a check. Checks are only needed for hazardous conditions, stunts, or combat maneuvers.</p><ul><li><strong>Stunts:</strong> Bootlegger reverse (DC 20), jumps, or weaving through traffic requires a move action and a successful check.</li><li><strong>Control:</strong> If you take damage while driving, or drive over hazardous terrain, you must make a check (DC 15-20) to maintain control. Failure means you skid, spin out, or crash.</li></ul>"
  },
  {
    name: "Escape Artist",
    ability: "DEX",
    untrained: true,
    action: "Standard",
    specializations: [],
    relatedFeats: [],
    fullText: "<p>You can slip out of restraints, grapple holds, and tight spaces.</p><ul><li><strong>Escape Grapple:</strong> Standard action. Opposed check against the opponent's Grapple check.</li><li><strong>Escape Restraints:</strong> DC depends on the restraint (Ropes = opponent's Use Rope check + 10, Handcuffs DC 30). Takes 1 minute.</li><li><strong>Tight Spaces:</strong> DC 30 to squeeze through a space where your head fits but your shoulders don't. Takes 1 minute.</li></ul>"
  },
  {
    name: "Gather Information",
    ability: "CHA",
    untrained: true,
    action: "Extended",
    specializations: [],
    relatedFeats: ["Contacts", "Well-Informed"],
    fullText: "<p>You can navigate social networks and rumors to find specific information.</p><p>A check takes 1d4+1 hours of asking around, buying drinks, and greasing palms.</p><ul><li><strong>General Info:</strong> DC 10. Local rumors, common knowledge.</li><li><strong>Specific Info:</strong> DC 15. Details about specific people, locations of safe houses.</li><li><strong>Restricted Info:</strong> DC 20+. Passwords, secret identities, criminal operations.</li></ul>"
  },
  {
    name: "Handle Animal",
    ability: "CHA",
    untrained: false,
    action: "Move or Standard",
    specializations: [],
    relatedFeats: ["Animal Empathy", "Minion"],
    fullText: "<p>You can train and direct animals.</p><ul><li><strong>Handle:</strong> Direct an animal to perform a trick it knows (DC 10). Move action.</li><li><strong>Push:</strong> Direct an animal to perform a trick it doesn't know (DC 25). Standard action.</li><li><strong>Train:</strong> Teach an animal a specific trick. Takes 1 week and a DC 15-20 check.</li></ul>"
  },
  {
    name: "Intimidate",
    ability: "CHA",
    untrained: true,
    action: "Standard",
    specializations: [],
    relatedFeats: ["Fearsome Presence", "Startle"],
    fullText: "<p>You can use threats, body language, or displays of power to frighten opponents.</p><ul><li><strong>Coerce:</strong> Force an opponent to act friendly toward you. Opposed by Sense Motive or Intimidate. Lasts 1d6 × 10 minutes.</li><li><strong>Demoralize:</strong> Standard action in combat. Opposed by Sense Motive, Intimidate, or Will save. If successful, the target is shaken (–2 to attack rolls, saving throws, and checks) for 1 round.</li><li><strong>Startle:</strong> Combined with the Startle feat, use Intimidate instead of Bluff to feint in combat.</li></ul>"
  },
  {
    name: "Investigate",
    ability: "INT",
    untrained: false,
    action: "Extended",
    specializations: [],
    relatedFeats: ["Track"],
    fullText: "<p>You are trained in forensic science, crime scene analysis, and finding hidden clues.</p><ul><li><strong>Search a Scene:</strong> Takes 10 minutes per 10-foot square. DC varies by how well a clue is hidden (DC 15 for obvious, DC 25+ for microscopic).</li><li><strong>Analyze Evidence:</strong> Requires access to a lab. DC 15 to 25 depending on the complexity of the substance or print.</li><li><strong>Synergy:</strong> If you have 5 or more ranks in Search, you get a +2 bonus on Investigate checks.</li></ul>"
  },
  {
    name: "Knowledge",
    ability: "INT",
    untrained: false,
    action: "None",
    specializations: ["Arcane Lore", "Art", "Behavioral Sciences", "Business", "Civics", "Current Events", "Earth Sciences", "History", "Life Sciences", "Physical Sciences", "Popular Culture", "Streetwise", "Tactics", "Technology", "Theology and Philosophy"],
    relatedFeats: ["Eidetic Memory", "Jack-of-all-Trades", "Well-Informed"],
    fullText: "<p>You are educated in a specific field of study. This skill must be purchased with a specific specialization (e.g., Arcane Lore, Technology, Tactics, Streetwise).</p><ul><li><strong>Recall Information:</strong> Answering a question within your field. Easy questions are DC 10, difficult questions are DC 20, and obscure mysteries are DC 30. Making a check is usually a free action or reaction.</li><li><strong>Synergy:</strong> Ranks in specific Knowledge skills can grant +2 bonuses to other skill checks (e.g., Knowledge [Technology] grants a bonus to Computers).</li></ul>"
  },
  {
    name: "Language",
    ability: "None",
    untrained: false,
    action: "None",
    specializations: [],
    relatedFeats: [],
    fullText: "<p>You can speak, read, and write additional languages. Unlike other skills, Language does not use an ability modifier and you do not make checks.</p><p><strong>Mechanics:</strong> Each rank you place in this skill grants you fluency in one additional language. Base fluency in your native tongue is free. You can choose any language, including dead languages, alien dialects, or computer languages.</p>"
  },
  {
    name: "Medicine",
    ability: "WIS",
    untrained: true,
    action: "Standard or Extended",
    specializations: [],
    relatedFeats: [],
    fullText: "<p>You can treat wounds, diseases, and poisons.</p><ul><li><strong>First Aid:</strong> Standard action. A DC 15 check stabilizes a dying character.</li><li><strong>Treat Disease/Poison:</strong> Takes 10 minutes. The patient uses your Medicine check result instead of their Fortitude save if your result is higher.</li><li><strong>Revive:</strong> A DC 20 check removes the dazed or stunned condition from a character. A DC 25 check awakens an unconscious character.</li></ul>"
  },
  {
    name: "Notice",
    ability: "WIS",
    untrained: true,
    action: "Reaction",
    specializations: [],
    relatedFeats: ["Assessment", "Uncanny Dodge"],
    fullText: "<p>You are highly observant. Notice combines the functions of Spot and Listen from other d20 games.</p><ul><li><strong>Perceive:</strong> Opposed by the target's Stealth check to notice a hiding creature, or a DC based on the environment (DC 0 to hear a conversation, DC 20 to hear whispering).</li><li><strong>Find Hidden Doors/Traps:</strong> DC 20 or higher. Usually requires actively looking (a move action) unless you have specific feats.</li><li><strong>Modifiers:</strong> Distance imposes a –1 penalty to Notice checks for every 10 feet.</li></ul>"
  },
  {
    name: "Perform",
    ability: "CHA",
    untrained: true,
    action: "Standard or Extended",
    specializations: ["Acting", "Comedy", "Dance", "Keyboards", "Oratory", "Percussion", "Singing", "String Instruments", "Wind Instruments"],
    relatedFeats: ["Fascinate"],
    fullText: "<p>You are trained in a specific form of artistic expression. This skill must be purchased with a specific specialization (e.g., Acting, Singing, Dance).</p><ul><li><strong>Entertain:</strong> A successful check (DC 15+) can sway a crowd, earn money, or draw attention.</li><li><strong>Fascinate:</strong> Combined with the Fascinate feat, you can use Perform to captivate an audience, leaving them entranced and distracted from their surroundings.</li></ul>"
  },
  {
    name: "Pilot",
    ability: "DEX",
    untrained: true,
    action: "Move",
    specializations: [],
    relatedFeats: [],
    fullText: "<p>You can operate air and space vehicles, including helicopters, jets, and starships.</p><p>Routine flight doesn't require a check. Checks are only needed for hazardous conditions, stunts, or dogfights.</p><ul><li><strong>Stunts:</strong> Evasive maneuvers or stunts require a move action and a successful check (DC 15-20+).</li><li><strong>Control:</strong> If the vehicle takes damage, you must make a Pilot check to avoid a crash.</li></ul>"
  },
  {
    name: "Profession",
    ability: "WIS",
    untrained: false,
    action: "Extended",
    specializations: [],
    relatedFeats: ["Connected"],
    fullText: "<p>You are trained in a specific livelihood or career (e.g., Lawyer, Doctor, Police Officer, Reporter). This skill must be purchased with a specific specialization.</p><ul><li><strong>Earn a Living:</strong> A Profession check determines how much money you can earn during downtime.</li><li><strong>Job Knowledge:</strong> You can answer questions related to your field as if using a Knowledge skill. For example, Profession (Lawyer) allows you to answer legal questions.</li></ul>"
  },
  {
    name: "Ride",
    ability: "DEX",
    untrained: true,
    action: "Move",
    specializations: [],
    relatedFeats: ["Animal Empathy"],
    fullText: "<p>You can ride mounts, typically horses, but potentially exotic beasts like griffons or dinosaurs.</p><ul><li><strong>Guide with Knees:</strong> DC 5 check. Frees up both hands for combat.</li><li><strong>Stay in Saddle:</strong> DC 15 check if the mount rears or you take damage.</li><li><strong>Fight with Mount:</strong> DC 10 check to direct a war-trained mount to attack in combat.</li><li><strong>Cover:</strong> DC 15 check to drop down and hang alongside the mount, using it as cover.</li></ul>"
  },
  {
    name: "Search",
    ability: "INT",
    untrained: true,
    action: "Full-Round",
    specializations: [],
    relatedFeats: ["Well-Informed"],
    fullText: "<p>You can find hidden objects, secret doors, and clues. While Notice lets you spot things casually, Search requires a deliberate, active effort.</p><ul><li><strong>Area:</strong> Searching a 5-foot by 5-foot area takes a full-round action.</li><li><strong>Find Secret Doors:</strong> DC 20 (or higher).</li><li><strong>Find Compartments:</strong> DC 20 to find a hidden compartment in a chest or vehicle.</li><li><strong>Synergy:</strong> 5 or more ranks in Search gives a +2 bonus on Investigate and Survival (tracking) checks.</li></ul>"
  },
  {
    name: "Sense Motive",
    ability: "WIS",
    untrained: true,
    action: "Reaction",
    specializations: [],
    relatedFeats: ["Assessment"],
    fullText: "<p>You can read body language, catch bluffs, and sense emotional states.</p><ul><li><strong>Hunch:</strong> Sense if someone is trustworthy or if a situation feels wrong (DC 20).</li><li><strong>Detect Lie:</strong> Opposed by the target's Bluff check. A success reveals they are lying or holding something back.</li><li><strong>Resist Feint/Intimidation:</strong> Sense Motive is used to oppose Bluff (feinting in combat) and Intimidate (demoralize) attempts.</li></ul>"
  },
  {
    name: "Sleight of Hand",
    ability: "DEX",
    untrained: false,
    action: "Standard",
    specializations: [],
    relatedFeats: ["Concealable"],
    fullText: "<p>You can palm objects, pick pockets, and perform feats of legerdemain.</p><ul><li><strong>Palm Object:</strong> DC 10 to palm a coin-sized object. Opposed by Notice if someone is watching you.</li><li><strong>Pick Pocket:</strong> DC 20 to take something from a target without them noticing. Opposed by the target's Notice check.</li><li><strong>Conceal Weapon:</strong> Opposed by a pat-down (Search) or visual inspection (Notice). Daggers get a +2 bonus, heavy pistols take a –4 penalty.</li></ul>"
  },
  {
    name: "Stealth",
    ability: "DEX",
    untrained: true,
    action: "Move",
    specializations: [],
    relatedFeats: ["Hide in Plain Sight"],
    fullText: "<p>You can hide in shadows, move silently, and avoid detection. Stealth combines the functions of Hide and Move Silently.</p><ul><li><strong>Hide/Sneak:</strong> Opposed by the target's Notice check. You must have cover or concealment to hide, unless you have specific feats (like Hide in Plain Sight).</li><li><strong>Movement:</strong> You can move up to half your normal speed at no penalty. Moving faster takes a –5 penalty. Running imposes a –20 penalty.</li><li><strong>Sniping:</strong> If you have already successfully hidden, you can make a ranged attack and immediately hide again as a move action with a –20 penalty on the Stealth check.</li></ul>"
  },
  {
    name: "Survival",
    ability: "WIS",
    untrained: true,
    action: "Extended",
    specializations: [],
    relatedFeats: ["Track"],
    fullText: "<p>You can survive in the wilderness, navigate without tools, and track creatures.</p><ul><li><strong>Survive:</strong> Provide food and water for yourself. DC 15 check. Takes 1 day.</li><li><strong>Navigate:</strong> Avoid getting lost in the wild. DC 15 check.</li><li><strong>Track:</strong> Combined with the Track feat, you can follow footprints and trails. The DC depends on the surface (Soft ground DC 5, Hard ground DC 15) and time passed.</li></ul>"
  },
  {
    name: "Swim",
    ability: "STR",
    untrained: true,
    action: "Move",
    specializations: [],
    relatedFeats: ["Environmental Adaptation"],
    fullText: "<p>You can swim and navigate liquids.</p><ul><li><strong>Swim:</strong> A successful check lets you move at one-quarter your speed as a move action, or half your speed as a full-round action.</li><li><strong>Hazards:</strong> Calm water is DC 10. Rough water is DC 15. Stormy water is DC 20.</li><li><strong>Failure:</strong> If you fail by 4 or less, you make no progress. If you fail by 5 or more, you go underwater and must hold your breath to avoid drowning.</li></ul>"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SKILLS_LIST };
} else {
  window.SKILLS_LIST = SKILLS_LIST;
}