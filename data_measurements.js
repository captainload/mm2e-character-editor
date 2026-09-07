// M&M 2nd Edition Reference Data

// Extended to Rank 30 based on user patterns and rules progression
const MEASUREMENT_TABLE = {
  "1": { mass_imp: "50 lbs.", time: "3 seconds (1 action)", dist_imp: "10 feet", ext_range: "x10" },
  "2": { mass_imp: "100 lbs.", time: "6 seconds (1 round)", dist_imp: "25 feet", ext_range: "x100" },
  "3": { mass_imp: "200 lbs.", time: "1 minute (10 rounds)", dist_imp: "50 feet", ext_range: "x1,000" },
  "4": { mass_imp: "400 lbs.", time: "5 minutes", dist_imp: "100 feet", ext_range: "x10,000" },
  "5": { mass_imp: "800 lbs.", time: "20 minutes", dist_imp: "250 feet", ext_range: "x100,000" },
  "6": { mass_imp: "1,600 lbs.", time: "1 hour", dist_imp: "500 feet", ext_range: "x1 million" },
  "7": { mass_imp: "3,200 lbs.", time: "5 hours", dist_imp: "1,000 feet", ext_range: "x10 million" },
  "8": { mass_imp: "3 tons", time: "1 day", dist_imp: "1/2 mile", ext_range: "x100 million" },
  "9": { mass_imp: "6 tons", time: "1 week", dist_imp: "1 mile", ext_range: "x1 billion" },
  "10": { mass_imp: "12 tons", time: "1 month", dist_imp: "2.5 miles", ext_range: "x10 billion" },
  "11": { mass_imp: "25 tons", time: "3 months", dist_imp: "5 miles", ext_range: "x100 billion" },
  "12": { mass_imp: "50 tons", time: "1 year", dist_imp: "10 miles", ext_range: "x1 trillion" },
  "13": { mass_imp: "100 tons", time: "5 years", dist_imp: "25 miles", ext_range: "x10 trillion" },
  "14": { mass_imp: "200 tons", time: "10 years (decade)", dist_imp: "50 miles", ext_range: "x100 trillion" },
  "15": { mass_imp: "400 tons", time: "50 years", dist_imp: "100 miles", ext_range: "x1 quadrillion" },
  "16": { mass_imp: "800 tons", time: "100 years (century)", dist_imp: "250 miles", ext_range: "x10 quadrillion" },
  "17": { mass_imp: "1,600 tons", time: "500 years", dist_imp: "500 miles", ext_range: "x100 quadrillion" },
  "18": { mass_imp: "3,200 tons", time: "1,000 years (millennium)", dist_imp: "1,000 miles", ext_range: "x1 quintillion" },
  "19": { mass_imp: "6,000 tons", time: "5,000 years", dist_imp: "2,500 miles", ext_range: "x10 quintillion" },
  "20": { mass_imp: "12,000 tons", time: "10,000 years", dist_imp: "5,000 miles", ext_range: "x100 quintillion" },
  "21": { mass_imp: "25,000 tons", time: "50,000 years", dist_imp: "10,000 miles", ext_range: "x1 sextillion" },
  "22": { mass_imp: "50,000 tons", time: "100,000 years", dist_imp: "25,000 miles", ext_range: "x10 sextillion" },
  "23": { mass_imp: "100,000 tons", time: "500,000 years", dist_imp: "50,000 miles", ext_range: "x100 sextillion" },
  "24": { mass_imp: "200,000 tons", time: "1,000,000 years", dist_imp: "100,000 miles", ext_range: "x1 septillion" },
  "25": { mass_imp: "400,000 tons", time: "5,000,000 years", dist_imp: "250,000 miles", ext_range: "x10 septillion" },
  "26": { mass_imp: "800,000 tons", time: "10,000,000 years", dist_imp: "500,000 miles", ext_range: "x100 septillion" },
  "27": { mass_imp: "1,600,000 tons", time: "50,000,000 years", dist_imp: "1,000,000 miles", ext_range: "x1 octillion" },
  "28": { mass_imp: "3,200,000 tons", time: "100,000,000 years", dist_imp: "2,500,000 miles", ext_range: "x10 octillion" },
  "29": { mass_imp: "6,400,000 tons", time: "500,000,000 years", dist_imp: "5,000,000 miles", ext_range: "x100 octillion" },
  "30": { mass_imp: "12,500,000 tons", time: "1,000,000,000 years", dist_imp: "10,000,000 miles", ext_range: "x1 nonillion" }
};

// Size Categories & Modifiers (pg 34)
const SIZE_TABLE = {
  "Colossal": { rank: 16, spaces: "8x8", reach: "15 ft", defense: -8, damage: -8, toughness: 8, speed: 0, intimidation: 8, stealth: -16 },
  "Gargantuan": { rank: 12, spaces: "4x4", reach: "15 ft", defense: -4, damage: -4, toughness: 4, speed: 0, intimidation: 4, stealth: -12 },
  "Huge": { rank: 8, spaces: "3x3", reach: "10 ft", defense: -2, damage: -2, toughness: 2, speed: 0, intimidation: 2, stealth: -8 },
  "Large": { rank: 4, spaces: "2x2", reach: "10 ft", defense: -1, damage: -1, toughness: 1, speed: 0, intimidation: 1, stealth: -4 },
  "Medium": { rank: 0, spaces: "1x1", reach: "5 ft", defense: 0, damage: 0, toughness: 0, speed: 0, intimidation: 0, stealth: 0 },
  "Small": { rank: -4, spaces: "1x1", reach: "5 ft", defense: 1, damage: 1, toughness: -1, speed: 0, intimidation: -1, stealth: 4 },
  "Tiny": { rank: -8, spaces: "1/2x1/2", reach: "0 ft", defense: 2, damage: 2, toughness: -2, speed: 0, intimidation: -2, stealth: 8 },
  "Diminutive": { rank: -12, spaces: "1/4x1/4", reach: "0 ft", defense: 4, damage: 4, toughness: -4, speed: 0, intimidation: -4, stealth: 12 },
  "Fine": { rank: -16, spaces: "1/8x1/8", reach: "0 ft", defense: 8, damage: 8, toughness: -8, speed: 0, intimidation: -8, stealth: 16 }
};

// Power Level Limits 2E
const PL_LIMITS = {
  "5": { maxSkill: 10, maxAttackEffect: 10, maxDefTough: 10, maxFortWill: 10 },
  "6": { maxSkill: 11, maxAttackEffect: 12, maxDefTough: 12, maxFortWill: 12 },
  "7": { maxSkill: 12, maxAttackEffect: 14, maxDefTough: 14, maxFortWill: 14 },
  "8": { maxSkill: 13, maxAttackEffect: 16, maxDefTough: 16, maxFortWill: 16 },
  "9": { maxSkill: 14, maxAttackEffect: 18, maxDefTough: 18, maxFortWill: 18 },
  "10": { maxSkill: 15, maxAttackEffect: 20, maxDefTough: 20, maxFortWill: 20 },
  "11": { maxSkill: 16, maxAttackEffect: 22, maxDefTough: 22, maxFortWill: 22 },
  "12": { maxSkill: 17, maxAttackEffect: 24, maxDefTough: 24, maxFortWill: 24 },
  "13": { maxSkill: 18, maxAttackEffect: 26, maxDefTough: 26, maxFortWill: 26 },
  "14": { maxSkill: 19, maxAttackEffect: 28, maxDefTough: 28, maxFortWill: 28 },
  "15": { maxSkill: 20, maxAttackEffect: 30, maxDefTough: 30, maxFortWill: 30 },
  "20": { maxSkill: 25, maxAttackEffect: 40, maxDefTough: 40, maxFortWill: 40 }
};

const ACTIONS_TABLE = [
  { name: "Aid", type: "Standard", check: "DC 10 Attack", effect: "Grant ally +2 attack or Defense bonus." },
  { name: "Aim", type: "Standard", check: "None", effect: "+1 bonus for ranged attack, +2 if taking full-round action." },
  { name: "Block", type: "Standard", check: "Attack", effect: "Oppose a melee attack with your own attack roll." },
  { name: "Charge", type: "Standard", check: "Attack", effect: "Move up to speed and attack with a -2 Defense penalty." },
  { name: "Concentrate", type: "Standard", check: "None", effect: "Maintain a sustained duration effect." },
  { name: "Defend", type: "Standard", check: "None", effect: "Gain +2 Dodge bonus to Defense, can abort to Block/Dodge." },
  { name: "Disarm", type: "Standard", check: "Attack", effect: "Opposed attack roll to knock item from opponent's hand." },
  { name: "Drop an Item", type: "Free", check: "None", effect: "Drop a held item in your square." },
  { name: "Drop Prone", type: "Free", check: "None", effect: "Character gains the Prone condition." },
  { name: "Escape", type: "Standard", check: "Escape Artist / Grapple", effect: "Escape a grapple or restraints." },
  { name: "Feint", type: "Standard", check: "Bluff", effect: "Target loses dodge bonus against your next attack." },
  { name: "Grapple", type: "Standard", check: "Melee Attack", effect: "Initiate a grapple to pin or damage target." },
  { name: "Move", type: "Move", check: "None", effect: "Move up to your speed." },
  { name: "Stand Up", type: "Move", check: "None", effect: "Remove Prone condition." },
  { name: "Total Defense", type: "Standard", check: "None", effect: "+4 Dodge bonus to Defense." },
  { name: "Trip", type: "Standard", check: "Melee Attack", effect: "Opposed check to knock opponent Prone." },
  { name: "Use Skill", type: "Varies", check: "Skill", effect: "Perform a task utilizing a specific skill." }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MEASUREMENT_TABLE, SIZE_TABLE, PL_LIMITS, ACTIONS_TABLE };
} else {
  window.MEASUREMENT_TABLE = MEASUREMENT_TABLE;
  window.SIZE_TABLE = SIZE_TABLE;
  window.PL_LIMITS = PL_LIMITS;
  window.ACTIONS_TABLE = ACTIONS_TABLE;
}