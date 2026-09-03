// Complete Reference Lookup Data for Mutants & Masterminds 4th Edition
// Contains: Measurements, Size, PL Limits, Skills, Advantages, and Power Effects

const MEASUREMENT_TABLE = {
  "-5": { mass_imp: "12 oz.", mass_met: "750 g", time: "1/8 second", dist_imp: "1 inch", dist_met: "6 cm", vol_imp: "1/32 cft.", vol_met: ".0008 m3", benchmark: "" },
  "-4": { mass_imp: "1.5 lbs.", mass_met: "1.5 kg", time: "1/4 second", dist_imp: "3 inches", dist_met: "12 cm", vol_imp: "1/16 cft.", vol_met: ".0017 m3", benchmark: "A soccer ball or football" },
  "-3": { mass_imp: "3 lbs.", mass_met: "3 kg", time: "1/2 second", dist_imp: "6 inches", dist_met: "25 cm", vol_imp: "1/8 cft.", vol_met: ".0035 m3", benchmark: "Average party balloon" },
  "-2": { mass_imp: "6 lbs.", mass_met: "6 kg", time: "1 second", dist_imp: "1 foot", dist_met: "50 cm", vol_imp: "1/4 cft.", vol_met: ".007 m3", benchmark: "Brick / Basketball (vol)" },
  "-1": { mass_imp: "12 lbs.", mass_met: "12 kg", time: "3 seconds", dist_imp: "3 feet", dist_met: "1 m", vol_imp: "1/2 cft.", vol_met: ".014 m3", benchmark: "" },
  "0":  { mass_imp: "25 lbs.", mass_met: "24 kg", time: "6 seconds", dist_imp: "6 feet", dist_met: "2 m", vol_imp: "1 cft.", vol_met: ".025 m3", benchmark: "A person's height / Crawling speed" },
  "1":  { mass_imp: "50 lbs.", mass_met: "50 kg", time: "12 seconds", dist_imp: "15 feet", dist_met: "4 m", vol_imp: "3 cft.", vol_met: ".05 m3", benchmark: "Walking speed" },
  "2":  { mass_imp: "100 lbs.", mass_met: "100 kg", time: "30 seconds", dist_imp: "30 feet", dist_met: "8 m", vol_imp: "6 cft.", vol_met: ".1 m3", benchmark: "Dashing speed / Average bathtub (vol)" },
  "3":  { mass_imp: "200 lbs.", mass_met: "200 kg", time: "1 minute", dist_imp: "60 feet", dist_met: "16 m", vol_imp: "15 cft.", vol_met: ".2 m3", benchmark: "Adult human / Running speed / 55 gal drum" },
  "4":  { mass_imp: "400 lbs.", mass_met: "400 kg", time: "2 minutes", dist_imp: "120 feet", dist_met: "32 m", vol_imp: "30 cft.", vol_met: ".4 m3", benchmark: "Motorcycle / Refrigerator (vol)" },
  "5":  { mass_imp: "800 lbs.", mass_met: "800 kg", time: "4 minutes", dist_imp: "250 feet", dist_met: "64 m", vol_imp: "60 cft.", vol_met: ".8 m3", benchmark: "Adult grizzly bear" },
  "6":  { mass_imp: "1,600 lbs.", mass_met: "1,600 kg", time: "8 minutes", dist_imp: "500 feet", dist_met: "125 m", vol_imp: "120 cft.", vol_met: "1.7 m3", benchmark: "Football field length / Human land-speed record" },
  "7":  { mass_imp: "3,200 lbs.", mass_met: "3.2 tons", time: "15 minutes", dist_imp: "900 feet", dist_met: "250 m", vol_imp: "250 cft.", vol_met: "3.5 m3", benchmark: "30-ft oak tree / Highway speed" },
  "8":  { mass_imp: "3 tons", mass_met: "6 tons", time: "30 minutes", dist_imp: "1,800 feet", dist_met: "500 m", vol_imp: "500 cft.", vol_met: "7 m3", benchmark: "Car, Jersey barrier / Empire State Building height / Cement mixer" },
  "9":  { mass_imp: "6 tons", mass_met: "12 tons", time: "1 hour", dist_imp: "1/2 mile", dist_met: "1 km", vol_imp: "1,000 cft.", vol_met: "15 m3", benchmark: "Ambulance / Earth wind-speed record / School bus (vol)" },
  "10": { mass_imp: "12 tons", mass_met: "25 tons", time: "2 hours", dist_imp: "1 mile", dist_met: "2 km", vol_imp: "2,000 cft.", vol_met: "30 m3", benchmark: "Small fire engine / Bullet, commercial airliner" },
  "11": { mass_imp: "25 tons", mass_met: "50 tons", time: "4 hours", dist_imp: "2 miles", dist_met: "4 km", vol_imp: "4,000 cft.", vol_met: "60 m3", benchmark: "Full school bus, large fire engine / Titanic depth / Speed of sound / 40ft container" },
  "12": { mass_imp: "50 tons", mass_met: "100 tons", time: "8 hours", dist_imp: "4 miles", dist_met: "8 km", vol_imp: "8,000 cft.", vol_met: "120 m3", benchmark: "20-ft container / Distance to horizon / Rifle bullet, jet fighter" },
  "13": { mass_imp: "100 tons", mass_met: "200 tons", time: "16 hours", dist_imp: "8 miles", dist_met: "16 km", vol_imp: "16,000 cft.", vol_met: "250 m3", benchmark: "Main battle tank / Mach 4" },
  "14": { mass_imp: "200 tons", mass_met: "400 tons", time: "1 day", dist_imp: "16 miles", dist_met: "32 km", vol_imp: "30,000 cft.", vol_met: "500 m3", benchmark: "Two-story house / Length of Manhattan / Mach 8" },
  "15": { mass_imp: "400 tons", mass_met: "800 tons", time: "2 days", dist_imp: "30 miles", dist_met: "64 km", vol_imp: "60,000 cft.", vol_met: "1,000 m3", benchmark: "Statue of Liberty / Escape velocity on Earth" },
  "16": { mass_imp: "800 tons", mass_met: "1.6 ktons", time: "4 days", dist_imp: "60 miles", dist_met: "125 km", vol_imp: "120,000 cft.", vol_met: "2,000 m3", benchmark: "Loaded Boeing 747 / Hot air balloon" },
  "17": { mass_imp: "1,600 tons", mass_met: "3.2 ktons", time: "1 week", dist_imp: "120 miles", dist_met: "250 km", vol_imp: "250,000 cft.", vol_met: "4,000 m3", benchmark: "Loaded passenger train / Olympic pool" },
  "18": { mass_imp: "3,200 tons", mass_met: "6 ktons", time: "2 weeks", dist_imp: "250 miles", dist_met: "500 km", vol_imp: "500,000 cft.", vol_met: "8,000 m3", benchmark: "" },
  "19": { mass_imp: "6,000 tons", mass_met: "12 ktons", time: "1 month", dist_imp: "500 miles", dist_met: "1,000 km", vol_imp: "1M cft.", vol_met: "15,000 m3", benchmark: "Boston to Washington DC" },
  "20": { mass_imp: "12,000 tons", mass_met: "25 ktons", time: "2 months", dist_imp: "1,000 miles", dist_met: "2,000 km", vol_imp: "2M cft.", vol_met: "30,000 m3", benchmark: "Eiffel Tower / Isle of Great Britain length / Large commercial building (vol)" },
  "21": { mass_imp: "25,000 tons", mass_met: "50 ktons", time: "4 months", dist_imp: "2,000 miles", dist_met: "4,000 km", vol_imp: "4M cft.", vol_met: "60,000 m3", benchmark: "" },
  "22": { mass_imp: "50,000 tons", mass_met: "100 ktons", time: "8 months", dist_imp: "4,000 miles", dist_met: "8,000 km", vol_imp: "8M cft.", vol_met: "125,000 m3", benchmark: "Battleship / Width of North America" },
  "23": { mass_imp: "100,000 tons", mass_met: "200 ktons", time: "1.5 years", dist_imp: "8,000 miles", dist_met: "16,000 km", vol_imp: "16M cft.", vol_met: "500,000 m3", benchmark: "Aircraft carrier" },
  "24": { mass_imp: "200,000 tons", mass_met: "400 ktons", time: "3 years", dist_imp: "16,000 miles", dist_met: "32,000 km", vol_imp: "32M cft.", vol_met: "1M m3", benchmark: "" },
  "25": { mass_imp: "400,000 tons", mass_met: "800 ktons", time: "6 years", dist_imp: "32,000 miles", dist_met: "64,000 km", vol_imp: "64M cft.", vol_met: "2M m3", benchmark: "Empire State Building / Earth circumference / Empire State Building (vol)" },
  "26": { mass_imp: "800,000 tons", mass_met: "1,600 ktons", time: "12 years", dist_imp: "64,000 miles", dist_met: "124,000 km", vol_imp: "120M cft.", vol_met: "4M m3", benchmark: "" },
  "27": { mass_imp: "1,600,000 tons", mass_met: "3,200 ktons", time: "25 years", dist_imp: "125,000 miles", dist_met: "250,000 km", vol_imp: "250M cft.", vol_met: "8M m3", benchmark: "Golden Gate Bridge" },
  "28": { mass_imp: "3,200,000 tons", mass_met: "6,400 ktons", time: "50 years", dist_imp: "250,000 miles", dist_met: "500,000 km", vol_imp: "500M cft.", vol_met: "16M m3", benchmark: "Earth to the Moon" },
  "29": { mass_imp: "6,400,000 tons", mass_met: "12,500 ktons", time: "100 years", dist_imp: "500,000 miles", dist_met: "1M km", vol_imp: "1B cft.", vol_met: "32M m3", benchmark: "The Great Pyramid of Giza" },
  "30": { mass_imp: "12,500,000 tons", mass_met: "25,000 ktons", time: "200 years", dist_imp: "1,000,000 miles", dist_met: "2M km", vol_imp: "2B cft.", vol_met: "64M m3", benchmark: "The speed of light" }
};

const SIZE_TABLE = {
  "Awesome":    { rank: 5,  spaces: "8",    reach: "6", defense: -5, damage: 5,  toughness: 5,  speed: 5,  intimidation: 10,  stealth: -10 },
  "Colossal":   { rank: 4,  spaces: "6",    reach: "4", defense: -4, damage: 4,  toughness: 4,  speed: 4,  intimidation: 8,   stealth: -8 },
  "Gargantuan": { rank: 3,  spaces: "4",    reach: "3", defense: -3, damage: 3,  toughness: 3,  speed: 3,  intimidation: 6,   stealth: -6 },
  "Huge":       { rank: 2,  spaces: "3",    reach: "2", defense: -2, damage: 2,  toughness: 2,  speed: 2,  intimidation: 4,   stealth: -4 },
  "Large":      { rank: 1,  spaces: "2",    reach: "1", defense: -1, damage: 1,  toughness: 1,  speed: 1,  intimidation: 2,   stealth: -2 },
  "Medium":     { rank: 0,  spaces: "1",    reach: "1", defense: 0,  damage: 0,  toughness: 0,  speed: 0,  intimidation: 0,   stealth: 0 },
  "Small":      { rank: -1, spaces: "1",    reach: "1", defense: 1,  damage: -1, toughness: -1, speed: -1, intimidation: -2,  stealth: 2 },
  "Tiny":       { rank: -2, spaces: "1/2",  reach: "0", defense: 2,  damage: -2, toughness: -2, speed: -2, intimidation: -4,  stealth: 4 },
  "Diminutive": { rank: -3, spaces: "1/4",  reach: "0", defense: 3,  damage: -3, toughness: -3, speed: -3, intimidation: -6,  stealth: 6 },
  "Fine":       { rank: -4, spaces: "1/8",  reach: "0", defense: 4,  damage: -4, toughness: -4, speed: -4, intimidation: -8,  stealth: 8 },
  "Minuscule":  { rank: -5, spaces: "1/16", reach: "0", defense: 5,  damage: -5, toughness: -5, speed: -5, intimidation: -10, stealth: 10 }
};

const PL_LIMITS = {
  1:  { maxSkill: 11, maxAttackEffect: 2,  maxDefTough: 2,  maxFortWill: 2,  maxHeroicAdv: 0 },
  2:  { maxSkill: 12, maxAttackEffect: 4,  maxDefTough: 4,  maxFortWill: 4,  maxHeroicAdv: 1 },
  3:  { maxSkill: 13, maxAttackEffect: 6,  maxDefTough: 6,  maxFortWill: 6,  maxHeroicAdv: 1 },
  4:  { maxSkill: 14, maxAttackEffect: 8,  maxDefTough: 8,  maxFortWill: 8,  maxHeroicAdv: 2 },
  5:  { maxSkill: 15, maxAttackEffect: 10, maxDefTough: 10, maxFortWill: 10, maxHeroicAdv: 2 },
  6:  { maxSkill: 16, maxAttackEffect: 12, maxDefTough: 12, maxFortWill: 12, maxHeroicAdv: 3 },
  7:  { maxSkill: 17, maxAttackEffect: 14, maxDefTough: 14, maxFortWill: 14, maxHeroicAdv: 3 },
  8:  { maxSkill: 18, maxAttackEffect: 16, maxDefTough: 16, maxFortWill: 16, maxHeroicAdv: 4 },
  9:  { maxSkill: 19, maxAttackEffect: 18, maxDefTough: 18, maxFortWill: 18, maxHeroicAdv: 4 },
  10: { maxSkill: 20, maxAttackEffect: 20, maxDefTough: 20, maxFortWill: 20, maxHeroicAdv: 5 },
  11: { maxSkill: 21, maxAttackEffect: 22, maxDefTough: 22, maxFortWill: 22, maxHeroicAdv: 5 },
  12: { maxSkill: 22, maxAttackEffect: 24, maxDefTough: 24, maxFortWill: 24, maxHeroicAdv: 6 },
  13: { maxSkill: 23, maxAttackEffect: 26, maxDefTough: 26, maxFortWill: 26, maxHeroicAdv: 6 },
  14: { maxSkill: 24, maxAttackEffect: 28, maxDefTough: 28, maxFortWill: 28, maxHeroicAdv: 7 },
  15: { maxSkill: 25, maxAttackEffect: 30, maxDefTough: 30, maxFortWill: 30, maxHeroicAdv: 7 },
  16: { maxSkill: 26, maxAttackEffect: 32, maxDefTough: 32, maxFortWill: 32, maxHeroicAdv: 8 },
  17: { maxSkill: 27, maxAttackEffect: 34, maxDefTough: 34, maxFortWill: 34, maxHeroicAdv: 8 },
  18: { maxSkill: 28, maxAttackEffect: 36, maxDefTough: 36, maxFortWill: 36, maxHeroicAdv: 9 },
  19: { maxSkill: 29, maxAttackEffect: 38, maxDefTough: 38, maxFortWill: 38, maxHeroicAdv: 9 },
  20: { maxSkill: 30, maxAttackEffect: 40, maxDefTough: 40, maxFortWill: 40, maxHeroicAdv: 10 }
};

const SKILLS_LIST = [
  {
    name: "Acrobatics",
    ability: "AGL",
    untrained: true,
    action: "Simple or Free",
    specializations: ["Balancing", "Contorting", "Maneuvering", "Standing", "Tumbling"],
    relatedAdvantages: ["Instant Up", "Skill Expertise", "Skill Mastery"],
    fullText: `ACROBATICS
AGILITY
SPECIALIZATIONS: Balancing, Contorting, Maneuvering, Standing, Tumbling
Use Acrobatics to flip, dive, roll, tumble, and perform other acrobatic maneuvers, as well as keep your balance under difficult circumstances.

BALANCING
You can make an Acrobatics check to keep your balance during hazardous movement. A degree of failure means you spend your Move action just maintaining your balance and do not actually move, while two or more degrees of failure means you lose your balance and fall.
You are both Hindered and Vulnerable while balancing. You can ignore either condition for a +5 increase to your Acrobatics DC, +10 for both. If you fail a resistance check while balancing, make an immediate Acrobatics check against the original DC to avoid falling.

CONTORTING
Make a DC 25 Acrobatics check as part of a Move action to fit through a tight space wide enough for your head but too narrow for the width of your shoulders, or to reach through an opening wide enough for your hand, but too narrow for your arm. Failure means you make no progress that turn and don't actually move, while two or more degrees of failure mean you can't try again without Extra Effort and might actually become stuck and Immobilized.

MANEUVERING
A DC 15 Acrobatics check may allow you to ignore the Hindered condition imposed by certain kinds of terrain, if you can flip, tumble, or otherwise acrobatically maneuver around or through it.

STANDING
A DC 20 Acrobatics check lets you take the Stand action, removing the Prone Condition, without becoming Hindered that round.

TUMBLING
You can make a DC 5 Acrobatics check to lessen damage from a fall, reducing the damage by 1 rank per degree of success. A fall reduced to rank 0 damage does no damage and you quickly roll to or land on your feet as a free action.`
  },
  {
    name: "Athletics",
    ability: "STR",
    untrained: true,
    action: "Simple",
    specializations: ["Climbing", "Jumping", "Running", "Swimming"],
    relatedAdvantages: ["Great Endurance", "Skill Expertise", "Skill Mastery"],
    fullText: `ATHLETICS
STRENGTH
SPECIALIZATIONS: Climbing, Jumping, Running, Swimming
Use Athletics for physical feats like climbing, jumping, and swimming.

CLIMBING
With a successful Athletics check, you can climb along a slope, wall, or other steep incline. A failed Athletics check indicates you make no progress, and two or more degrees of failure means you fall from whatever height you attained. You are Vulnerable while climbing unless you accept a +5 increase in the DC.

JUMPING
You can jump distance rank 0 as a running long-jump, essentially moving Speed 1 and then jumping the distance as one Move action. You can jump distance rank -1 as a standing long-jump with no initial movement and make a vertical jump of distance rank -2. Every degree of success on a DC 15 Athletics skill check increases jumping distance ranks by 1, to a maximum of +3.

RUNNING
You can make a DC 15 Athletics check as part of your Move action to run faster: success increases your ground speed rank by +1 until the start of your next turn.

SWIMMING
You can make a DC 10 Athletics check to swim at speed rank 0 (higher DC for rough waters). Each degree of success after the first increases swim speed rank by +1 for one round, to a maximum of your ground speed rank (normally 2).`
  },
  {
    name: "Close Combat",
    ability: "ATK",
    untrained: true,
    action: "Standard",
    focused: true,
    focuses: ["Array", "Blades", "Bludgeons", "Disarming", "Grabbing", "Tripping", "Unarmed"],
    specializations: ["Hammers", "Knives", "Swords", "Specific Weapon"],
    relatedAdvantages: ["Close Attack", "Improved Critical", "Improvised Weapons", "Skill Expertise"],
    fullText: `CLOSE COMBAT
ATTACK FOCUSED COMBAT
FOCUSES: Array, Blades, Bludgeons, Disarming, Grabbing, Tripping, Unarmed
SPECIALIZATIONS: by specific weapon or attack, such as Hammers, Knives, Swords, and so forth.

You're trained with a particular type of close attack, giving you a bonus to your attack checks with it equal to your skill rank. Each type of close attack is a separate Close Combat skill with its own rank, and encompasses a single type of attack, effect, or weapon.

The Unarmed focus applies to unarmed strikes like punches and kicks, but does not apply to other forms of unarmed combat maneuvers like grabbing or tripping, which have their own focuses.`
  },
  {
    name: "Deception",
    ability: "PRE",
    untrained: true,
    action: "Standard",
    specializations: ["Bluffing", "Disguise", "Distracting", "Innuendo", "Tricking"],
    relatedAdvantages: ["Alternate Feint", "Dazing Interaction", "Fascinating Interaction", "Fast Feint", "Taunting Interaction", "Tactical Training", "Team Code"],
    fullText: `DECEPTION
PRESENCE INTERACTION
SPECIALIZATIONS: Bluffing, Disguise, Distracting, Innuendo, Tricking
Deception is the skill of getting others to believe what you want them to believe. It covers things like acting, bluffing, fast-talk, trickery, and subterfuge.

BLUFFING
Make a Deception check to tell a believable lie, opposed by the target's Deception or Insight check.

DISTRACTING
You can use Deception for an impress check to distract an opponent in combat. If your check succeeds, your target is Vulnerable to your attacks, Defenseless with two or more degrees of success.

INNUENDO
You can use Deception to send covert messages using word-play and double-meanings in conversation (DC 10 for basic message, DC 15 for complex, DC 20 for new/detailed).

TRICKING
You can use Deception in combat for a Trick maneuver to mislead an opponent into taking a potentially unwise action.`
  },
  {
    name: "Disguise",
    ability: "AWE",
    untrained: true,
    action: "None",
    specializations: ["By disguise type"],
    relatedAdvantages: ["Skill Expertise", "Skill Mastery"],
    fullText: `DISGUISE
AWARENESS MANIPULATION TECHNICAL
SPECIALIZATIONS: By disguise type.
You can use makeup, costumes, and other props to alter your appearance. Your Disguise check result determines the effectiveness of the disguise, opposed by others' Perception check results.

A disguise normally requires at least time rank 6 (8 minutes) of preparation and can be done as a routine check. You can speed up the process by 1 time rank for every -5 penalty you take to the check.`
  },
  {
    name: "Expertise",
    ability: "INT",
    untrained: false,
    action: "None",
    focused: true,
    focuses: ["Art", "Business", "Carpentry", "Cooking", "Criminal", "Current Events", "History", "Journalism", "Law", "Law Enforcement", "Medicine", "Military", "Music", "Philosophy", "Politics", "Popular Culture", "Psychiatry", "Science", "Sociology", "Streetwise", "Survival", "Theology"],
    specializations: ["By area of expertise"],
    relatedAdvantages: ["Know-It-All", "Jack-of-All-Trades", "Skill Expertise", "Skill Mastery"],
    fullText: `EXPERTISE
INTELLECT FOCUSED TRAINED ONLY
FOCUSES: Specialization required (see description)
SPECIALIZATIONS: By area of expertise.

Expertise is a broad area of skills encompassing knowledge and training in a variety of specialized fields. Each is considered a separate skill and training in each is acquired separately.

SPECIALIZATION: Because Expertise is so broad, specialization is required for it: 1 Power Point buys 4 ranks in Expertise Skills, rather than just 2.
KNOWLEDGE: Make Expertise checks to answer questions related to your field (DC 10 easy, DC 15 basic, DC 20+ difficult).
PROFESSION: Practice your field professionally, using tools of the trade and supervising helpers.`
  },
  {
    name: "Insight",
    ability: "AWE",
    untrained: true,
    action: "Free",
    specializations: ["Avoid Influence", "Detect Falsehood", "Detect Influence", "Evaluate", "Innuendo"],
    relatedAdvantages: ["Assessment", "Skill Expertise", "Skill Mastery", "Team Code"],
    fullText: `INSIGHT
AWARENESS INTERACTION
SPECIALIZATIONS: Avoid Influence, Detect Falsehood, Detect Influence, Evaluate, Innuendo
You can tell someone's true intentions and feelings, and if they are trying to influence or manipulate you.

AVOID INFLUENCE: Make resistance checks to avoid or overcome interaction skills.
DETECT FALSEHOOD: Sense whether statements, disguises, or illusions are deceptive.
DETECT INFLUENCE: Notice when someone is acting under outside mental control (DC 10 + effect rank).
EVALUATE: Tell if someone is trustworthy upon meeting them, or assess social atmospheres (DC 20).`
  },
  {
    name: "Intimidation",
    ability: "PRE",
    untrained: true,
    action: "Standard",
    specializations: ["Coercing", "Demoralizing"],
    relatedAdvantages: ["Fearsome Presence", "Menacing Attack", "Startling Intimidation", "Taunting Interaction", "Tactical Training"],
    fullText: `INTIMIDATION
PRESENCE INTERACTION
SPECIALIZATION: Coercing, Demoralizing
You know how to use threats, both real and implied, to get others to do what you want.

COERCING: Impress check to force cooperation; on success target acts Favorable (Helpful on 2+ degrees) while in your presence.
DEMORALIZING: Impress check in combat to undermine confidence; success inflicts Impaired (Frightened on 2+ degrees of failure).
RESISTING: Use Intimidation to resist opposed Intimidation attempts.`
  },
  {
    name: "Investigation",
    ability: "INT",
    untrained: false,
    action: "None",
    specializations: ["Analyzing Evidence", "Gathering Evidence", "Gathering Information", "Searching", "Surveillance"],
    relatedAdvantages: ["Contacts", "Well-Informed", "Skill Expertise", "Skill Mastery"],
    fullText: `INVESTIGATION
INTELLECT TRAINED ONLY TECHNICAL
SPECIALIZATIONS: Analyzing Evidence, Gathering Evidence, Gathering Information, Searching, Surveillance
You know how to search for and study clues, gather information through interviews and surveillance, and analyze forensic evidence.

SEARCHING: Search areas for clues, hidden items, and traps.
GATHERING EVIDENCE: DC 15 check to collect evidence without contaminating it.
ANALYZING EVIDENCE: DC 15 check to extract forensic clues and facts.
GATHERING INFORMATION: Collect rumors, news, and protected intelligence (DC 10 General, DC 15 Specific, DC 20 Restricted, DC 25 Protected).`
  },
  {
    name: "Languages",
    ability: "INT",
    untrained: false,
    action: "None",
    focused: true,
    focuses: ["By specific language"],
    specializations: ["Dialects", "Ancient Languages"],
    relatedAdvantages: ["Jack-of-All-Trades"],
    fullText: `LANGUAGES
INTELLECT FOCUSED TRAINED ONLY
FOCUSES: By language
You are fluent in languages other than your native language. With 1 rank, you are fluent in 1 additional language. Each additional rank doubles the number of languages known: 2 at rank 2, 4 at rank 3, 8 at rank 4, 16 at rank 5, etc.

LANGUAGES LIMITS: Languages is not limited by Power Level.`
  },
  {
    name: "Magic",
    ability: "INT",
    untrained: false,
    action: "None",
    specializations: ["Constructing", "Disabling", "Lore", "Repairing", "Technique"],
    relatedAdvantages: ["Improvised Effect", "Skill Expertise", "Skill Mastery"],
    fullText: `MAGIC
INTELLECT TRAINED ONLY TECHNICAL
SPECIALIZATIONS: Constructing, Disabling, Lore, Repairing, Technique
You are trained in arcane arts and practical magical technique.

LORE: Answer questions regarding magical lore, creatures, or occult phenomena.
TECHNIQUE: Study, construct, repair, and disable magical devices and items.
IMPROVISED EFFECTS: Use with the Improvised Effects advantage to prepare and cast ritual spells.`
  },
  {
    name: "Perception",
    ability: "AWE",
    untrained: true,
    action: "Free",
    specializations: ["Sight", "Hearing", "Smell", "Touch", "Radio", "Mental"],
    relatedAdvantages: ["Tracking", "Skill Expertise", "Skill Mastery"],
    fullText: `PERCEPTION
AWARENESS
SPECIALIZATIONS: Specific sense type.
Use this skill to notice and pick up on things using your senses. In general, you suffer a -1 penalty to Perception checks for every two Spaces of distance between you and the target.

SIGHT: Notice subtle visual details or detect stealthy targets.
HEARING: Hear quiet sounds, listening through doors (+5 DC) or walls (+15 DC).
NOTICING VS. OBSERVING: Passive noticing is automatic (non-action); active searching/observing is a simple action.`
  },
  {
    name: "Performance",
    ability: "PRE",
    untrained: false,
    action: "Standard",
    focused: true,
    focuses: ["Acting", "Comedy", "Dance", "Keyboards", "Oratory", "Percussion Instruments", "Poetry", "Singing", "Stringed Instruments", "Wind Instruments"],
    specializations: ["By style or medium"],
    relatedAdvantages: ["Dazing Interaction", "Fascinating Interaction", "Taunting Interaction", "Skill Expertise", "Skill Mastery"],
    fullText: `PERFORMANCE
PRESENCE TRAINED ONLY FOCUSED INTERACTION
FOCUSES: Specific type of performance such as Acting, Comedy, Dance, Keyboards, Oratory, Singing, etc.

IMPRESSING: Perform before an audience (DC 15 competent, higher for masterful shows), granting +2 to +5 on future interaction checks.
SWAYING: Change audience Attitudes like the Persuasion skill.`
  },
  {
    name: "Persuasion",
    ability: "PRE",
    untrained: true,
    action: "None",
    specializations: ["Negotiating", "Swaying", "Specific Social Group"],
    relatedAdvantages: ["Connections", "Dazing Interaction", "Fascinating Interaction", "Taunting Interaction", "Well-Informed"],
    fullText: `PERSUASION
PRESENCE INTERACTION
SPECIALIZATIONS: Negotiating, Swaying, a particular social group or environment
You're skilled in dealing with people, etiquette, social graces, and public speaking to win others over.

SWAYING: Change others' Attitudes: Helpful (DC 10), Favorable (DC 15), Indifferent (DC 20), Unfavorable (DC 25), Hostile (DC 30).
NEGOTIATING: Opposed Persuasion checks when advocating opposing positions or bargaining.`
  },
  {
    name: "Ranged Combat",
    ability: "ATK",
    untrained: true,
    action: "Standard",
    focused: true,
    focuses: ["Array", "Guns", "Throwing"],
    specializations: ["Energy Blast", "Pistols", "Rifles", "Bows", "Specific Weapon"],
    relatedAdvantages: ["Ranged Attack", "Improved Critical", "Ricochet", "Split Attack", "Skill Expertise"],
    fullText: `RANGED COMBAT
ATTACK FOCUSED COMBAT
FOCUSES: Array, Guns, Throwing
SPECIALIZATIONS: By specific attack or weapon such as Energy Blast, Pistols, Spears, and so forth.

You're trained with a particular type of ranged attack, giving you a bonus to your attack checks with it equal to your skill rank. Each ranged attack focus is a separate Ranged Combat skill with its own rank.`
  },
  {
    name: "Sleight of Hand",
    ability: "AGL",
    untrained: false,
    action: "Standard",
    specializations: ["Concealing", "Escaping", "Legerdemain", "Planting", "Stealing"],
    relatedAdvantages: ["Skill Expertise", "Skill Mastery"],
    fullText: `SLEIGHT OF HAND
AGILITY TRAINED ONLY MANIPULATION
SPECIALIZATIONS: Concealing, Escaping, Legerdemain, Planting, Stealing
Perform dexterous feats of legerdemain, pickpocketing, and palming.

CONCEALING: Conceal small items on your person.
ESCAPING: Slip out of ropes (DC 10), handcuffs (DC 15), straight-jackets (DC 20), or power grabs.
PLANTING & STEALING: Plant items on targets (DC 20) or lift items covertly (DC 15), opposed by target's Perception.`
  },
  {
    name: "Stealth",
    ability: "AGL",
    untrained: true,
    action: "Simple",
    specializations: ["Hiding", "Sneaking", "Tailing", "Specific Terrain"],
    relatedAdvantages: ["Hide in Plain Sight", "Skill Expertise", "Skill Mastery"],
    fullText: `STEALTH
AGILITY
SPECIALIZATIONS: Hiding, Sneaking, Tailing, specific environment or terrain
You're skilled in going unnoticed. While using Stealth, you are Hindered (-1 movement speed rank). You can remove Hindered by taking a -5 penalty on Stealth checks.

HIDING: Opposed check against observer's Perception while having Cover or Concealment.
SNEAKING: Mask sounds and evidence of your movement against observers' Perception.
TAILING: Follow a subject without being spotted.`
  },
  {
    name: "Survival",
    ability: "AWE",
    untrained: false,
    action: "None",
    specializations: ["Avoid Hazards", "Construction", "Foraging", "Navigation", "Specific Environment"],
    relatedAdvantages: ["Tracking", "Skill Expertise", "Skill Mastery"],
    fullText: `SURVIVAL
AWARENESS TRAINED ONLY TECHNICAL
SPECIALIZATIONS: Avoid Hazards, Construction, Foraging, Navigation, specific environment or terrain
Trained to survive in the wilderness, find food/water, and guide others.

AVOID HAZARDS: DC 15 check grants +2 bonus to environmental resistance checks (+5 if stationary and sheltered).
FORAGING: DC 10 check lets you forage food and water for yourself and allies while moving.
NAVIGATION: DC 10 check (DC 15 avoiding hazards) to navigate outdoors.`
  },
  {
    name: "Technology",
    ability: "INT",
    untrained: false,
    action: "None",
    specializations: ["Computers", "Constructing", "Disabling", "Electronics", "Operating", "Mechanics", "Repairing", "Security"],
    relatedAdvantages: ["Improvised Effect", "Improvised Tools", "Skill Expertise", "Skill Mastery"],
    fullText: `TECHNOLOGY
INTELLECT TRAINED ONLY MANIPULATION TECHNICAL
SPECIALIZATIONS: Computers, Constructing, Disabling, Electronics, Operating, Mechanics, Repairing, Security
You are skilled in operating, constructing, repairing, hacking, and disabling technological devices.

Lacking necessary tools imposes a -5 penalty on checks other than routine operation. Use with the Improvised Effects advantage to create temporary tech devices.`
  },
  {
    name: "Treatment",
    ability: "INT",
    untrained: false,
    action: "Standard",
    specializations: ["Diagnosis", "Disease and Toxins", "Provide Care", "Revive", "Stabilize"],
    relatedAdvantages: ["Improved Treatment", "Skill Expertise", "Skill Mastery"],
    fullText: `TREATMENT
INTELLECT TRAINED ONLY MANIPULATION TECHNICAL
SPECIALIZATIONS: Diagnosis, Disease and Toxins, Provide Care, Revive, Stabilize
Trained in treating injuries, toxins, and medical ailments.

DIAGNOSIS (DC 10): Identify conditions and grant +2 to +5 on further Treatment checks.
REVIVE: Standard action to remove conditions (DC 10 Dazed, DC 15 Stunned, DC 20 Incapacitated). You are Vulnerable while reviving.
STABILIZE (DC 15): Standard action to stabilize a Dying patient.
TREAT AILMENTS: Assist patient's resistance checks against diseases/poisons with +2 to +5 bonuses.`
  },
  {
    name: "Vehicles",
    ability: "AGL",
    untrained: false,
    action: "Standard",
    specializations: ["Driving", "Sailing", "Piloting"],
    relatedAdvantages: ["Skill Expertise", "Skill Mastery"],
    fullText: `VEHICLES
AGILITY MANIPULATION
SPECIALIZATIONS: Driving, Sailing, Piloting
Operate ground, water, air, and space vehicles in stressful, high-speed, or combat situations.`
  }
];

const ADVANTAGES_LIST = [
  {
    name: "Agile Grab",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "You are not Vulnerable while Grabbing",
    conditionalSummary: "Retain Defense while Grabbing opponents.",
    fullText: `AGILE GRAB\nCOMBAT\nYou are not Vulnerable while grabbing. See Grab in the Actions section of Chapter 8.`
  },
  {
    name: "Alternate Feint",
    types: ["Combat", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "You can Feint using a different trait",
    conditionalSummary: "Feint using chosen alternate trait (Acrobatics, Deception, Intimidation, etc.).",
    fullText: `ALTERNATE FEINT\nCOMBAT, FOCUSED\nWhen you take the Feint action you can make the check using a trait other than your attack bonus, chosen when you configure this advantage. Examples include Acrobatics, Deception, Expertise, Intimidation, or a particular power effect rank. See Feint in the Actions section of Chapter 8.\n\nNORMAL: The Feint action is normally an attack bonus check.\n\nFOCUSED: Each alternate trait you can use to make Feint checks is a separate advantage.`
  },
  {
    name: "Alternate Initiative",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Your Initiative is based on a mental ability",
    conditionalSummary: "Initiative uses INT, AWE, or PRE instead of AGL.",
    fullText: `ALTERNATE INITIATIVE\nCOMBAT\nYour Initiative bonus is based on your Intellect, Awareness, or Presence. Choose which ability when configuring this advantage; the choice is permanent for as long as you have the advantage.\n\nNORMAL: Initiative bonus is normally based on Agility.`
  },
  {
    name: "Animal Empathy",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "You can use interaction skills on animals",
    fullText: `ANIMAL EMPATHY\nSKILL\nYou can use interaction skills on animals normally, and do not have to speak a language the animal understands; you communicate your intent through tone, gestures, and body language and learn things by studying animal behavior. You can use Expertise: Animal Handling or another suitable Expertise skill at the GM's discretion in place of any interaction skill with animals.\n\nNORMAL: Characters normally have a -10 penalty to use Interaction Skills on animals.`
  },
  {
    name: "Assessment",
    types: ["General"],
    ranked: true,
    maxRanks: 10,
    description: "You can use Insight to learn an opponent's combat capabilities",
    fullText: `ASSESSMENT\nGENERAL, RANKED\nYou can size-up an opponent's combat capabilities. Once per turn as a free action, choose a subject you can accurately perceive and have the GM make a secret Insight check for you, opposed by the subject's Deception check result (or 10 + their Deception, if they don't know you're assessing them).\n\nSUCCESS: The GM tells you the subject's attack and Defense bonuses relative to yours (lower, higher, or equal). With each degree of success after the first, you learn one of the target's bonuses of your choice exactly.\n\nFAILURE: You don't learn anything and cannot try again during that scene without Extra Effort for a Renewed Attempt. With more than one degree of failure, the GM may lie or otherwise exaggerate the subject's bonuses.\n\nQUICK ASSESSMENT: You can choose to assess multiple opponents on the same turn, but this imposes a penalty to your Insight check equal to the total number of opponents assessed. A group of minions with the same traits counts as a single opponent for this purpose. So assessing four opponents in one turn is a single Insight check with a -4 penalty, compared against each of their Deception check results.\n\nRANKED: For each additional rank in this advantage, you can assess an additional opponent per turn with no penalty.`
  },
  {
    name: "Beginner's Luck",
    types: ["Fortune"],
    ranked: false,
    maxRanks: 1,
    description: "Gain a +5 bonus with a rank 4 or less skill",
    fullText: `BEGINNER'S LUCK\nFORTUNE\nBy spending a Hero Point, you gain a +5 bonus for the duration of the scene with checks for one skill of your choice for which you currently have 4 or fewer ranks, including skills you have no ranks in, even if they can't be used untrained.`
  },
  {
    name: "Benefit",
    types: ["General", "Focused"],
    ranked: true,
    maxRanks: 5,
    focused: true,
    description: "Gain a significant perquisite or benefit",
    fullText: `BENEFIT\nGENERAL, FOCUSED, RANKED\nYou have some significant benefit. The exact nature of the benefit is for you and the Game Master to determine. As a general guideline, it should not exceed the benefits of any other advantage, but should be significant enough to still be considered an advantage. The larger or more influential the benefit, the more ranks in this advantage are needed to reflect it. Here are a few examples of Benefits:\n\n• ALTERNATE IDENTITY: You have an alternate identity, complete with legal paperwork (driver's license, birth certificate, etc.) per Benefit rank. This is different from a costumed identity, which doesn't necessarily have any special legal status.\n• DIPLOMATIC IMMUNITY: You can't be punished for crimes outside your native country. The more ranks you have, the more severe the crimes you can escape.\n• SECURITY CLEARANCE: You have access to restricted information and secure facilities.\n• STATUS: You have significant status or position within an organization, giving you influence and access to resources.\n• WEALTH: You have enough money to enjoy luxuries and solve many mundane problems. Wealth 1 means you're comfortable, while Wealth 5 means you're a billionaire.\n\nFOCUSED: Each particular Benefit is a separate advantage.\n\nRANKED: Additional Benefit ranks mean a greater or more effective Benefit.`
  },
  {
    name: "Blind Shot",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Ignore Concealment penalties for ranged attacks",
    conditionalSummary: "Ignore Concealment penalties on ranged attacks.",
    fullText: `BLIND SHOT\nCOMBAT\nYour ranged attack checks ignore penalties for Concealment.\n\nNORMAL: See Concealment in the Range section of Chapter 8.`
  },
  {
    name: "Blind Strike",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Ignore Concealment penalties for close attacks",
    conditionalSummary: "Ignore Concealment penalties on close attacks.",
    fullText: `BLIND STRIKE\nCOMBAT\nYour close attack checks ignore penalties for Concealment.\n\nNORMAL: See Concealment in the Range section of Chapter 8.`
  },
  {
    name: "Close Attack",
    types: ["Combat"],
    ranked: true,
    maxRanks: 20,
    description: "+1 to close attack checks per rank",
    fullText: `CLOSE ATTACK\nCOMBAT, RANKED\nYou gain a +1 bonus to all close attack checks. For bonuses with a specific type of close attack, use the Close Combat skill from the Skills chapter.\n\nRANKED: Each additional rank increases your close attack bonus by +1, up to the Power Level limit.`
  },
  {
    name: "Close Defense",
    types: ["Combat"],
    ranked: true,
    maxRanks: 20,
    description: "+1 to Defense against close attacks per rank",
    fullText: `CLOSE DEFENSE\nCOMBAT, RANKED\nYou gain a +1 bonus to your Defense against close range attacks.\n\nRANKED: Each additional rank increases your Defense against close range attacks by +1, up to the Power Level limit.`
  },
  {
    name: "Connections",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Call in assistance or favors with a Persuasion check",
    fullText: `CONNECTIONS\nSKILL\nYou know people who can help you out sometimes, offering expert advice, information, legal help, or access to resources, among other things.\n\nYou can use your Connections by making a Persuasion check. A simple favor is DC 10, ranging up to DC 25 or higher for especially difficult, dangerous, or expensive favors, as set by the Game Master. The GM has the right to veto any request of your Connections if it is too dangerous, expensive, or may spoil the plot of the adventure.\n\nIt takes at least a few minutes, and sometimes much longer, to call on your Connections, and you must have some means of contacting them.`
  },
  {
    name: "Contacts",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Make an initial Investigation check in one minute",
    fullText: `CONTACTS\nSKILL\nYou have a sufficiently extensive network of informants that you can make an initial Investigation check to gather information in only one minute, so long as you have some way of getting in touch with your contacts. Additional Investigation checks to gather information on the same subject require the normal amount of time, since you must search beyond your usual network.`
  },
  {
    name: "Counterattack",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction to attack an opponent who just hit you",
    conditionalSummary: "Reaction: Make an immediate close attack when hit by a close attack.",
    fullText: `COUNTERATTACK\nCOMBAT, REACTION\nIf an opponent hits you with a close attack, you can use your reaction to make an immediate attack against them, before your resistance check against their attack's effect, if any.`
  },
  {
    name: "Critical Volley",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "On a critical hit, make a second ranged attack",
    conditionalSummary: "Reaction: Make a second ranged attack against the same target on a Critical Hit.",
    fullText: `CRITICAL VOLLEY\nCOMBAT, REACTION\nIf you score a critical hit with a ranged attack, you can use your reaction to make another immediate ranged attack against the same target. Resolve the results of the attacks separately.`
  },
  {
    name: "Damaging Escape",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Follow an Escape with an Attack action",
    conditionalSummary: "Reaction: Make an immediate unarmed attack upon escaping a Grab.",
    fullText: `DAMAGING ESCAPE\nCOMBAT, REACTION\nWhen you succeed on an Escape action against a hold from a Grab, you can use your reaction to make an immediate unarmed Attack action against the opponent who was holding you. If you escaped multiple opponents, choose one to attack.`
  },
  {
    name: "Damaging Grab",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Inflict Damage with a successful Grab check",
    conditionalSummary: "Inflict Strength Damage as part of a successful Grab or hold increase.",
    fullText: `DAMAGING GRAB\nCOMBAT\nWhen you Grab and successfully hold a target, or increase the degree of your hold on a target, you can also inflict your Strength Damage on the target as part of the Grab action.\n\nNORMAL: Squeezing a target in a hold to damage them requires an Attack action. See Grab in the Action & Adventure chapter.`
  },
  {
    name: "Dazing Interaction",
    types: ["Skill", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Make an impress check to Daze or Stun",
    fullText: `DAZING INTERACTION\nSKILL, FOCUSED\nYou can make an impress check using an interaction skill, chosen when you configure this advantage, to cause an opponent to hesitate in combat. See Impress Check in the Action & Adventure chapter for details. If the impress check is successful, the target is Dazed, Stunned with two or more degrees of success. The target repeats their resistance check at the end of each of their turns, with success removing the condition.\n\nFOCUSED: The ability to Daze with each interaction skill is a separate advantage: Dazing Performance, or Dazing Persuasion.`
  },
  {
    name: "Defensive Grab",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction to Grab an opponent who just missed you",
    conditionalSummary: "Reaction: Immediate Grab against a close attacker who misses you.",
    fullText: `DEFENSIVE GRAB\nCOMBAT, REACTION\nIf an opponent attacks you in close combat and misses, you can use your reaction for an immediate Grab action against them. See Grab in the Actions section of Chapter 8.`
  },
  {
    name: "Defensive Roll",
    types: ["Combat"],
    ranked: true,
    maxRanks: 20,
    description: "+1 to Toughness checks per rank",
    conditionalSummary: "+1 Toughness per rank. Take no damage conditions on 2+ degrees of success while not Vulnerable/Defenseless.",
    fullText: `DEFENSIVE ROLL\nCOMBAT, RANKED\nYou can avoid damage through agility, mobility, and "rolling" with a hit, giving you a +1 bonus to your Toughness. Additionally, if you get two or more degrees of success on a resistance check using your Defensive Roll bonus, you take no damage conditions, the same as Hardened Toughness (see the Protection effect in the Powers chapter).\n\nYou lose the ability to avoid all damage conditions while you are Vulnerable or Defenseless, but retain your Toughness bonus. You lose all benefits of this advantage while you are Stunned. Defensive Roll is common for those who lack high toughness, relying instead on their agility or speed to avoid harm.\n\nRANKED: Each additional rank in this advantage increases your Toughness rank by +1, up to the Power Level limit.`
  },
  {
    name: "Defensive Throw",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction to Trip an opponent who just missed you",
    conditionalSummary: "Reaction: Immediate Trip action against a close attacker who misses you.",
    fullText: `DEFENSIVE THROW\nCOMBAT, REACTION\nIf an opponent attacks you in close combat and misses, you can use your reaction for an immediate Trip action against them.`
  },
  {
    name: "Determination",
    types: ["Heroic"],
    ranked: true,
    maxRanks: "heroicLimit",
    description: "Remove Dazed, Fatigued, or Stunned, or new resistance check",
    fullText: `DETERMINATION\nHEROIC, RANKED\nOnce per adventure, you can immediately remove one of the Dazed, Fatigued, or Stunned conditions from your character or immediately give your character a new resistance check against an ongoing effect. Using Determination to immediately remove the Fatigued condition effectively lets you perform one use of Extra Effort without becoming Fatigued. See Extra Effort in The Basics chapter.\n\nRANKED: You can use Determination an additional time per adventure per additional rank in this advantage. Your maximum Determination rank is limited by your total ranks in heroic advantages. All of your uses of Determination reset at the start of the next adventure.`
  },
  {
    name: "Diehard",
    types: ["General"],
    ranked: false,
    maxRanks: 1,
    description: "Stabilize while Dying",
    fullText: `DIEHARD\nGENERAL\nWhen you gain the Dying condition, you automatically stabilize without any need for a Stamina check, although further damage—such as a finishing attack—can still kill you. See the Dying condition in The Basics chapter and Finishing Attack in the Action and Adventure chapter for details.`
  },
  {
    name: "Dive for Cover",
    types: ["Command", "Reaction"],
    ranked: true,
    maxRanks: 2,
    description: "Command action for allies to drop Prone",
    fullText: `DIVE FOR COVER\nCOMMAND, REACTION, RANKED 2\nWhen an ally is targeted with an Area Effect or a ranged attack, you can use your reaction for a Command action that allows any allies able to hear you to immediately drop Prone, if they wish. This gives them the benefits of the Prone condition and may change the amount of Concealment or Cover they have against the attack. See the Prone condition in The Basics chapter and Cover and Concealment in the Action & Adventure chapter for more.\n\nRANKED: With 2 ranks in this advantage, allies can also immediately move up their movement speed -2 ranks before dropping Prone, possibly allowing them to move out of an area or to reach cover, for example.`
  },
  {
    name: "Edit Scene",
    types: ["Heroic"],
    ranked: true,
    maxRanks: "heroicLimit",
    description: "Make a small change to the description of the scene",
    fullText: `EDIT SCENE\nHEROIC, RANKED\nOnce per adventure, you can make a small change to the description of the scene, adding some new detail that helps you or your allies. The Game Master has to approve any edits, and generally edits can only help you, not automatically allow you to succeed.\n\nFor example, while you're fighting a plant-based foe, you could use Edit Scene for there to be some weed-killer or defoliant close at hand, provided that would make sense for the locale. Similarly, you could use Edit Scene to say a thunderstorm just happens to knock out the power and the lights during a tense conflict, or that a stray attack allows sunlight to pour into an enclosed area, or punches a hole in a boat's hull and causes it to start sinking.\n\nRANKED: You can use Edit Scene an additional time per adventure per additional rank in this advantage. Your maximum Edit Scene rank is limited by your total ranks in heroic advantages. All of your uses of Edit Scene reset at the start of the next adventure.`
  },
  {
    name: "Eidetic Memory",
    types: ["General"],
    ranked: false,
    maxRanks: 1,
    description: "Perfect recall, +5 to memory-related checks",
    fullText: `EIDETIC MEMORY\nGENERAL\nYou have perfect recall of everything you notice or observe. You have a +5 bonus on resistance checks against effects that alter or erase memories. The GM can also provide you with the benefits of the Guidance advantage whenever they feel it involves information your character would remember, although the GM does not need to provide any additional details or hints without an actual use of Guidance.`
  },
  {
    name: "Elusive Target",
    types: ["Combat"],
    ranked: true,
    maxRanks: 2,
    description: "Gain Cover while in close combat",
    conditionalSummary: "Gain +2 Defense (Rank 1) or +5 Defense (Rank 2) against ranged attacks while engaged in close combat.",
    fullText: `ELUSIVE TARGET\nCOMBAT, RANKED\nWhen you are in close combat with one or more opponents, you gain the benefit of partial cover against ranged attacks: +2 to your Defense. See Cover in Chapter 8 for details.\n\nRANKED: With 2 ranks in this advantage, you gain full cover while in close combat: A +5 bonus to your Defense against ranged attacks.`
  },
  {
    name: "Encouragement",
    types: ["Command", "Fortune", "Heroic"],
    ranked: false,
    maxRanks: 1,
    description: "Command action and a Hero Point to grant an ally Extra Effort",
    fullText: `ENCOURAGEMENT\nCOMMAND, FORTUNE, HEROIC\nBy taking the Command action and spending a Hero Point, you grant an ally able to see or hear you one of the benefits of Extra Effort at no cost in Fatigue for either of you. This can stack with the benefit of that character using Extra Effort themselves, or even the Extraordinary Effort advantage (following).\n\nEncouragement counts towards your total rank limit in command and heroic advantages.`
  },
  {
    name: "Equipment",
    types: ["General"],
    ranked: true,
    maxRanks: 20,
    description: "Configure 5 points worth of equipment per rank",
    fullText: `EQUIPMENT\nGENERAL, RANKED\nYou have access to equipment you regularly have on-hand. For each rank in this advantage, choose or configure up to 5 Equipment Points worth of equipment from the Equipment chapter.\n\nYou can reconfigure your Equipment Points at the start of each adventure, or when you have appropriate access to your headquarters or other cache of equipment between scenes, at the GM's discretion, possibly including a use of the Edit Scene advantage (previously).\n\nRANKED: Each additional rank in Equipment gives you 5 more Equipment Points to configure.`
  },
  {
    name: "Evasion",
    types: ["Combat"],
    ranked: true,
    maxRanks: 2,
    description: "+5 for Dodge resistance checks vs. Area Affects per rank",
    conditionalSummary: "+5 Dodge resistance vs Area Effects (Rank 1). Successful Dodge completely negates Area Effect damage (Rank 2).",
    fullText: `EVASION\nCOMBAT, RANKED 2\nYou have a +5 bonus for Dodge resistance checks to avoid Area Effects. See the Area Effect extra in the Powers chapter.\n\nRANKED: With 2 ranks in this advantage, if you succeed on your Dodge resistance check against an Area Effect, it has no effect on you.`
  },
  {
    name: "Extraordinary Effort",
    types: ["General"],
    ranked: false,
    maxRanks: 1,
    description: "Gain two benefits while using Extra Effort",
    fullText: `EXTRAORDINARY EFFORT\nGENERAL\nWhen using Extra Effort, you can gain two of the listed benefits, even stacking two of the same benefit. However, you also double the cost of the effort, acquiring two instances of the Fatigued condition, likely leaving you Exhausted. See Extra Effort in The Basics chapter.`
  },
  {
    name: "Fallen Inspiration",
    types: ["Combat", "Fortune"],
    ranked: false,
    maxRanks: 1,
    description: "Grant all of your allies a Hero Point when you are Incapacitated",
    conditionalSummary: "When Incapacitated, all aware allies in the scene gain a bonus Hero Point.",
    fullText: `FALLEN INSPIRATION\nCOMBAT, FORTUNE\nYour loss is keenly felt. When you are Incapacitated, including Dying or Dead, each of your allies in the scene aware of this gains a Hero Point. Allies lose this bonus Hero Point if they do not use it before you recover from the Incapacitated condition.`
  },
  {
    name: "Fascinating Interaction",
    types: ["Skill", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Use an interaction skill to Stun a target while out of combat",
    fullText: `FASCINATING INTERACTION\nSKILL, FOCUSED\nOne of your interaction skills, chosen when you configure this advantage, is so effective you can use it for an impress check to capture and hold someone's attention with it, keeping them from taking other actions. See Impress Checks in the Action & Adventure chapter for details.\n\nMake an impress check with your chosen skill. If you succeed, the target is Stunned and cannot take actions other than paying attention to your performance. You can maintain the effect with a Concentrate action on your turn, continuing your performance and giving the target a new resistance check at the end of their turn. The Stunned condition ends when you stop performing, can no longer interact, the target successfully resists, or any immediate danger presents itself, such as a conflict breaking out.\n\nYou can use Fascinating Interaction on a group, but must affect everyone in the group in the same way. You can't use this advantage during a conflict.\n\nFOCUSED: Fascinating with each different interaction skill is a separate advantage: Fascinating Deception, Fascinating Intimidation, Fascinating Performance, and Fascinating Persuasion.`
  },
  {
    name: "Fast Feint",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Feint as a simple action with no penalty",
    conditionalSummary: "Perform Feints as a Simple Action with no -5 check penalty.",
    fullText: `FAST FEINT\nCOMBAT\nYou can perform a Feint as a simple action without a penalty on your check. See Feint in the Action and Adventure chapter.\n\nNORMAL: Performing a Feint as a simple action imposes a -5 penalty on the check.`
  },
  {
    name: "Favored Environment",
    types: ["Combat", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "+2 to Attack or Defense in a particular environment",
    conditionalSummary: "Choose +2 Attack or +2 Defense each turn while operating in your chosen environment.",
    fullText: `FAVORED ENVIRONMENT\nCOMBAT, FOCUSED\nYou have an environment you're especially at home in, chosen when you configure this advantage. While you are in your favored environment, you gain a +2 bonus to your Attack or your Defense. Choose at the start of your turn whether the bonus applies to one or the other. The choice remains until the start of your next turn. This bonus is not limited by Power Level.\n\nFavored Environment is meant to be at least somewhat limited, such as a particular kind of terrain (arctic, desert, jungle, etc.) or situation like aerial or underwater combat. If a character has traits allowing them to always be in their Favored Environment, the GM should consider limiting or disallowing this advantage, including its use as a Heroic Feat for "the environment I'm currently in."\n\nFOCUSED: Each type of Favored Environment is a separate advantage.`
  },
  {
    name: "Favored Foe",
    types: ["Skill", "Focused"],
    ranked: true,
    maxRanks: 2,
    focused: true,
    description: "Bonus to skill checks with a particular type of opponent",
    fullText: `FAVORED FOE\nSKILL, FOCUSED, RANKED 2\nYou have a particular type of opponent you've studied or are especially effective against, chosen when you configure this advantage. You gain a +2 bonus on Deception, Intimidation, Insight, and Perception checks dealing with your Favored Foe. This includes impress checks and other actions based on those skills. This bonus is not limited by Power Level.\n\nYour Favored Foe may be a type of creature, such as aliens, animals, constructs, or undead, a profession like ninja, soldiers, police officers, Yakuza, and such, or any other category the Game Master approves. Some categories like "humans" or "villains" are too broad and should be disallowed. Favored Foe is likewise disallowed as a Heroic Feat for "the foe I am currently fighting."\n\nRANKED: If you have 2 ranks in Favored Foe, you gain a +5 bonus on Deception, Intimidation, Insight, and Perception checks dealing with your Favored Foe.\n\nFOCUSED: Each type of Favored Foe is a separate advantage.`
  },
  {
    name: "Fearless",
    types: ["General"],
    ranked: true,
    maxRanks: 2,
    description: "Resistance to Fear effects, Immunity at rank 2",
    fullText: `FEARLESS\nGENERAL, RANKED 2\nYou have Resistance to Fear effects, including any effect imposing the Frightened condition, gaining a bonus to resistance checks against them equal to half the effect's rank, rounded up.\n\nRANKED: With 2 ranks of this advantage, you have Immunity to Fear effects, automatically succeeding on any resistance checks against them.`
  },
  {
    name: "Fearsome Presence",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Free Intimidation impress check when you first appear or act",
    fullText: `FEARSOME PRESENCE\nSKILL\nWhen you first appear in a scene or at the start of your first turn during a conflict, you can make an immediate Intimidation impress check to demoralize as a free action. See Impress Checks in the Action and Adventure chapter and the Intimidation skill description in the Skills chapter.`
  },
  {
    name: "Follow-Up Strike",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "On a critical hit, make a second close attack",
    conditionalSummary: "Reaction: Make an immediate extra close attack upon scoring a close Critical Hit.",
    fullText: `FOLLOW-UP STRIKE\nCOMBAT, REACTION\nIf you score a critical hit with a close attack, you can use your reaction to make another immediate close attack against the same or a different target within range.`
  },
  {
    name: "Grabbing Block",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "With a successful Block make an immediate Grab",
    conditionalSummary: "Immediate Grab attempt against a close attacker upon a successful Block.",
    fullText: `GRABBING BLOCK\nCOMBAT\nWith a successful Block action against a close attack, you can immediately perform a Grab action against the attacker. See Block and Grab in the Action & Adventure chapter.`
  },
  {
    name: "Grabbing Finesse",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Use Attack in place of Strength for Grabs",
    conditionalSummary: "Use Attack bonus instead of Strength for opposed Grab checks.",
    fullText: `GRABBING FINESSE\nCOMBAT\nYou can use your Attack bonus for grabbing in place of your Strength for opposed Grab checks. See Grab in the Action and Adventure chapter.`
  },
  {
    name: "Great Endurance",
    types: ["General"],
    ranked: false,
    maxRanks: 1,
    description: "+5 for particular Fortitude and Stamina checks",
    fullText: `GREAT ENDURANCE\nGENERAL\nYou have a +5 bonus on checks to avoid becoming Fatigued, to hold your breath, avoid the effects of starvation or thirst, avoid the effects of cold or hot environments, and to resist suffocation and drowning. See Hazardous Environments in Chapter 8 for details.`
  },
  {
    name: "Guidance",
    types: ["Heroic"],
    ranked: true,
    maxRanks: "heroicLimit",
    description: "Gain a flash of insight or a key piece of information",
    fullText: `GUIDANCE\nHEROIC, RANKED\nOnce per adventure, when you choose, you gain a flash of insight, some helpful guidance, or otherwise stumble across an important clue. You might figure out the trick to escaping a villain's deathtrap, or find important evidence at a crime scene. The Game Master decides exactly what you find or what you learn, but it should help move the adventure along in the right direction.\n\nRANKED: You can receive Guidance an additional time per adventure per additional rank in this advantage. Your maximum Guidance rank is limited by your total ranks in heroic advantages. Your uses of Guidance reset at the start of the next adventure.`
  },
  {
    name: "Hide in Plain Sight",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Use Stealth to hide while being observed",
    fullText: `HIDE IN PLAIN SIGHT\nSKILL\nYou can use the Stealth skill to hide while others are aware of you without any sort of diversion, and without penalty to your Stealth check for doing so (see the Stealth description in the Skills chapter). You're literally there one moment, and gone the next. You must still have some form of Cover or Concealment within range of your movement speed and be able to reach it in order to hide.\n\nNORMAL: You cannot make a Stealth check to hide from someone able to accurately perceive you.`
  },
  {
    name: "Holding Back",
    types: ["Fortune", "Heroic"],
    ranked: true,
    maxRanks: "heroicLimit",
    description: "Temporarily increase your Power Level and traits at a cost",
    fullText: `HOLDING BACK\nFORTUNE, HEROIC\nYou're more powerful than you seem, capable of wielding power greater than the series power level at times, but you're Holding Back that extra power for a reason.\n\nTo tap into your extra power, you need to spend a Hero Point and the situation has to be appropriately dramatic, dire, or needful: You and the Game Master should agree on this. Generally, you can't stop Holding Back more than once per adventure.\n\nIf the conditions are met, you gain a +1 increase in Power Level and an additional 15 Power Points worth of traits, chosen and configured when you configure this advantage, but this also triggers your drawback.\n\nDRAWBACK\nWhen you stop Holding Back, you trigger a particular drawback, which is usually the reason why you are Holding Back most of the time. Choose one of the following or create a suitable drawback with the approval of the Game Master. Note that while these drawbacks are often like complications, you do not earn Hero Points for triggering them.\n\n• BERSERK: You fly into a berserker rage, attacking whatever provoked you to stop Holding Back, followed by any other perceived threat.\n• CONTROLLED: You lose your free will to the control of some outside force or entity, which might possess your body or direct your actions, gaining the Controlled condition.\n• HUNTED: When you stop Holding Back, you essentially send up a flare for someone (or something) that is hunting you. If you're lucky, you'll recover and slip away before they show up. Maybe.\n• INERT: You crash, hard, after using your added power. You are Incapacitated for an hour per Holding Back rank thereafter, then can make a DC 10 Stamina check to recover each hour thereafter.\n• MONSTROSITY: Your added power transforms you into something terrible and terrifying. For a week per Holding Back rank after your transformation, you have a -5 penalty on interaction skill checks other than Intimidation with anyone who knows that you are that... thing.\n• UNLEASHED: No longer contained, your added power lashes out. At the end of the scene, your largest offensive power attacks random targets each turn until you are Incapacitated or spend a Hero Point (which automatically incapacitates you).\n\nYour added power lasts for the remainder of the scene. You can spend an additional Hero Point to prevent your drawback from causing you to cross a line you really don't want to cross, such as killing someone, or setting off a truly terrible disaster, pulling yourself back from the brink. Doing so immediately ends both the drawback and the benefits of this advantage.\n\nRANKED: Each additional rank you have in Holding Back gives you an additional 15 Power Points worth of traits and +1 Power Level when you stop Holding Back. Your rank in Holding Back is limited by your total ranks in heroic advantages, and may be additionally limited by the GM as best suits the series.`
  },
  {
    name: "Impressive Superiority",
    types: ["Combat", "Reaction", "Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction for an impress check against a foe who fails",
    conditionalSummary: "Reaction: Immediate Impress check against an opponent who misses you or fails a check against you.",
    fullText: `IMPRESSIVE SUPERIORITY\nCOMBAT, REACTION, SKILL\nIf an opponent misses you with an attack or fails a skill check against you, you can use your reaction for an immediate Impress action against that opponent. See Impress Checks in the Action & Adventure chapter.`
  },
  {
    name: "Improved Aim",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "When Aiming, gain Luck with your second die",
    conditionalSummary: "When Aiming, if either d20 rolls 10 or less, add +10 to the result.",
    fullText: `IMPROVED AIM\nCOMBAT\nWhen you take the Aim action (see Aim under Actions in Chapter 8) if one of your two dice roll a 10 or less, you can add 10 to it, like a use of the Luck advantage. If both dice roll 10 or less, choose one and add 10 to it.\n\nNORMAL: When you Aim you can roll two dice and take the better of the two rolls for your attack check.`
  },
  {
    name: "Improved Block",
    types: ["Combat"],
    ranked: true,
    maxRanks: 2,
    description: "+2 to attack checks to Block (+5 at rank 2)",
    conditionalSummary: "+2 bonus on attack checks to Block (+5 bonus at Rank 2).",
    fullText: `IMPROVED BLOCK\nCOMBAT, RANKED 2\nWhen you perform a Block action (see Block under Actions in Chapter 8) you gain a +2 bonus to your attack check.\n\nRANKED: With 2 ranks of this advantage, you gain a +5 bonus on your attack checks to Block.`
  },
  {
    name: "Improved Critical",
    types: ["Combat", "Focused"],
    ranked: true,
    maxRanks: 4,
    focused: true,
    description: "+1 critical threat range per rank with an attack (16-20 max)",
    conditionalSummary: "+1 Critical threat range per rank for chosen attack (19-20 at Rank 1 down to 16-20 at Rank 4).",
    fullText: `IMPROVED CRITICAL\nCOMBAT, FOCUSED, RANKED 4\nOne of your attacks is especially dangerous. Choose the attack when you configure this advantage. You score a Critical Hit with the chosen attack on a die roll of 19 or 20. Only a natural 20 is an Added Success, however, and an attack that misses is not a Critical Hit, regardless of the die roll. See Critical Hits under Attack in the Action and Adventure chapter.\n\nFOCUSED: Each specific attack requires a separate Improved Critical advantage. Improved Critical can apply to an array of related attacks, but only benefits those that share a common theme and require an attack check.\n\nRANKED: Each additional rank increases your chance of a Critical Hit with that attack by one more, to a maximum range of 16-20 with 4 ranks.`
  },
  {
    name: "Improved Defense",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "+5 to Defense with the Defend action",
    conditionalSummary: "Taking the Defend action grants +5 Defense (instead of +2).",
    fullText: `IMPROVED DEFENSE\nCOMBAT\nWhen you take the Defend action, you gain a +5 bonus to your Defense until the start of your next turn.\n\nNORMAL: When you take the Defend action, you gain a +2 bonus to your Defense until the start of your next turn.`
  },
  {
    name: "Improved Disarm",
    types: ["Combat"],
    ranked: true,
    maxRanks: 2,
    description: "+2 to attack checks to Disarm (+5 at rank 2)",
    conditionalSummary: "+2 bonus on attack checks to Disarm (+5 bonus at Rank 2).",
    fullText: `IMPROVED DISARM\nCOMBAT, RANKED 2\nWhen you attempt a Disarm action, you gain a +2 bonus to your attack check.\n\nNORMAL: With 2 ranks of this advantage, you gain a +5 bonus on your attack checks to Disarm.`
  },
  {
    name: "Improved Grab",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Only need one arm to Grab",
    conditionalSummary: "Initiate and maintain Grabs using only one arm.",
    fullText: `IMPROVED GRAB\nCOMBAT\nWhen you take the Grab action you only need to use one arm. You can also maintain a Grab using only one arm. See Grab under Actions in Chapter 8.\n\nNORMAL: Taking or maintaining the Grab action normally requires at least two arms.`
  },
  {
    name: "Improved Hold",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "-5 for opponents to Escape from your Grab",
    conditionalSummary: "Opponents suffer a -5 penalty on Escape checks against your Grabs.",
    fullText: `IMPROVED HOLD\nCOMBAT\nOpponents you successfully Grab have a -5 penalty on their Escape action attempts. See Escape under Actions in Chapter 8.`
  },
  {
    name: "Improved Initiative",
    types: ["Combat"],
    ranked: true,
    maxRanks: "plHalf",
    description: "+4 to your Initiative per rank (max PL / 2)",
    conditionalSummary: "+4 to Initiative per rank.",
    fullText: `IMPROVED INITIATIVE\nCOMBAT, RANKED\nYou have a +4 to your Initiative rank. See Initiative in the Action & Adventure chapter.\n\nRANKED: Each additional rank in Improved Initiative adds another +4 to your Initiative. You can have no more ranks in Improved Initiative than half the Power Level, rounded up.`
  },
  {
    name: "Improved Smash",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "No attack penalty with Smash action",
    conditionalSummary: "Ignore standard attack penalties when using the Smash action on held objects.",
    fullText: `IMPROVED SMASH\nCOMBAT\nWhen taking the Smash action against an object held by another character, you have no penalty on your attack check. See Smash under Actions in Chapter 8.\n\nNORMAL: You have up to a -5 penalty on your attack check with a Smash action.`
  },
  {
    name: "Improved Strike",
    types: ["Combat"],
    ranked: true,
    maxRanks: 20,
    description: "+1 close damage rank with Strength per rank",
    conditionalSummary: "+1 close Strength-based damage rank per rank.",
    fullText: `IMPROVED STRIKE\nCOMBAT\nYour Damage rank with close combat attacks based on your Strength increases by +1, up to the Power Level limit.\n\nRANKED: Each additional rank in Improved Strike increases your close attack Damage by +1.`
  },
  {
    name: "Improved Team Attack",
    types: ["Combat"],
    ranked: true,
    maxRanks: 2,
    description: "Contribute to Team Attacks beyond standard restrictions",
    conditionalSummary: "Contribute to Team Attacks even if not within 5 ranks (Rank 1) or with different effects (Rank 2).",
    fullText: `IMPROVED TEAM ATTACK\nCOMBAT, RANKED\nYou can contribute to a team attack even if your attack's effect rank is not within 5 of the other attacks.\n\nNORMAL: You can only contribute to a team attack if your attack is the same effect as the other attacks and its rank is within 5 ranks of the other contributing attacks.\n\nRANKED: If you have 2 ranks in this advantage, your attack does not even have to be the same effect as the other attacks, although the combined team attack still has the effect of the main attack.`
  },
  {
    name: "Improved Treatment",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Provide additional benefits using Treatment to revive",
    fullText: `IMPROVED TREATMENT\nSKILL\nWhen you use the Treatment skill to revive a subject, you can provide additional benefits. See Treatment in the Skills chapter for details. With a successful revive effort against the following Difficulty Classes, you can:\n\n• DC 10: Remove one of the Dazed, Hit, or Impaired conditions. For each additional degree of success, you can remove an additional Hit condition. You can also choose to eliminate the effects of the Fatigued condition, but the condition itself remains until the character has rested.\n• DC 15: Remove one of the Disabled or Stunned conditions. You can also choose to eliminate the effects of the Exhausted condition, but the condition itself remains until the character has rested.`
  },
  {
    name: "Improved Trip",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Choose which trait targets use to resist your Trip action",
    conditionalSummary: "You choose whether targets resist your Trip with Dodge or Strength.",
    fullText: `IMPROVED TRIP\nCOMBAT\nWhen performing the Trip action you choose the trait your target uses to resist—Dodge or Strength—rather than the target choosing.\n\nNORMAL: When performing the Trip action your target chooses the trait they use to resist being tripped. See Trip under Actions in Chapter 8.`
  },
  {
    name: "Improvised Effect",
    types: ["Heroic", "Skill", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Use a technical skill to prepare and use an effect",
    fullText: `IMPROVISED EFFECT\nHEROIC, SKILL, FOCUSED\nYou can use a technical skill to prepare and use Improvised Effects. See Technical Skills in Chapter 4 and Improvised Effects in Chapter 6. Magic and Technology are the most common technical skills used with this advantage, but others may be available with the Game Master's approval, particularly Expertise skills.\n\nFOCUSED: Each different skill you can use for Improvised Effects is a separate advantage. Your Improvised Effect advantages count towards your rank limit in heroic advantages.`
  },
  {
    name: "Improvised Tools",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "No penalty for using technical skills without tools",
    fullText: `IMPROVISED TOOLS\nSKILL\nYou ignore penalties for using technical skills without proper tools, since you can improvise sufficient ones with whatever you have at hand. If you're forced to work without any tools for some reason, you still suffer only a -2 penalty.\n\nNORMAL: You have a -5 penalty while attempting technical skill checks without proper tools.`
  },
  {
    name: "Improvised Weapons",
    types: ["Combat"],
    ranked: true,
    maxRanks: 20,
    description: "Use Close Combat: Unarmed skill and +1 damage per rank",
    conditionalSummary: "Use Close Combat: Unarmed for improvised weapons, plus +1 Damage rank per rank.",
    fullText: `IMPROVISED WEAPONS\nCOMBAT, RANKED\nWhen wielding an improvised weapon in close combat, you can use your Close Combat: Unarmed skill bonus for attack checks with it.\n\nRANKED: Each additional rank in this advantage gives you a +1 to Damage rank with improvised weapons. Your maximum Damage rank is limited by Power Level.\n\nNORMAL: Improvised weapons use the Close Combat: Improvised Weapons skill, rather than the Unarmed focus.`
  },
  {
    name: "Inspiration",
    types: ["Command", "Fortune"],
    ranked: true,
    maxRanks: 5,
    description: "Use Command to give allies a +1 bonus per rank for one round",
    fullText: `INSPIRATION\nCOMMAND, FORTUNE, RANKED 5\nYou can inspire allies to greatness. Once per scene you can take a Command action and spend a Hero Point to grant every ally able to see or hear you a +1 bonus on all checks until the start of your next turn. This bonus is not limited by Power Level. You do not gain the bonus, only your allies do. Multiple uses of Inspire from different characters do not stack, only the highest bonus applies.\n\nRANKED: The bonus granted to your allies improves by +1 for every additional Inspire rank you have to a maximum of 5 ranks.`
  },
  {
    name: "Instant Counter",
    types: ["General", "Reaction", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Use your reaction to counter an effect",
    fullText: `INSTANT COUNTER\nGENERAL, REACTION, FOCUSED\nYou can use your reaction to counter a particular type of opposing effect with one of your own as if you had a Ready action to do so. The chosen effect must be limited to a particular type, such as a type of attack, a magical spell, a psionic power, and so forth. The Game Master approves if the effect is sufficiently defined for this advantage and should disallow any that are too broadly defined, such as all Damage effects, Afflictions, or all attacks, for examples. You also need to choose an effect you are using to counter, as usual, and its descriptors must suit the opposing effect you wish to counter. See Countering Effects in the Powers chapter for details.\n\nFOCUSED: Each additional particular type of effect you can Instant Counter is a separate advantage.`
  },
  {
    name: "Instant Up",
    types: ["General"],
    ranked: false,
    maxRanks: 1,
    description: "Take the Stand action with no requirements",
    fullText: `INSTANT UP\nGENERAL\nWhen you take the Stand action you are not Hindered and can move at your full Speed Rank. See Stand under Actions in Chapter 8.`
  },
  {
    name: "Interpose",
    types: ["General", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction to interpose yourself in front of an attack",
    fullText: `INTERPOSE\nGENERAL, REACTION\nWhen an ally within range of your normal movement speed would be hit by an attack or affected by a hazard allowing a Dodge resistance check, you can use your reaction to move between the attack and your ally, making you the target instead.\n\nYou effectively grant your ally total cover against the attack or hazard, while it affects you normally. See Cover in the Action and Adventure chapter for details. For attacks, compare the attack check result against your Defense Class. For effects allowing a Dodge resistance check, you make the Dodge resistance check against the effect normally.`
  },
  {
    name: "Jack-of-All-Trades",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Use any skill other than Expertise or Languages untrained",
    fullText: `JACK-OF-ALL-TRADES\nSKILL\nYou can use any skill other than Expertise or Languages untrained, even skills that normally cannot be used untrained, but you do not gain the benefits of having ranks in a skill in which you are untrained. See Untrained Skills in the Skills chapter.`
  },
  {
    name: "Know-It-All",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Use any Intellect-based Expertise untrained",
    fullText: `KNOW-IT-ALL\nSKILL\nYou can use any Intellect-based Expertise skill untrained, including answering difficult questions, but you do not gain the benefits of having ranks in a skill in which you are untrained. See Untrained Skills and Expertise in the Skills chapter.`
  },
  {
    name: "Leadership",
    types: ["Command", "Fortune"],
    ranked: true,
    maxRanks: 10,
    description: "Command action and a Hero Point to grant an ally an advantage",
    fullText: `LEADERSHIP\nCOMMAND, FORTUNE, RANKED\nYour leadership helps others try harder and achieve more. As a Command action, you can spend a Hero Point to immediately grant an ally able to see or hear you the benefits of a single advantage until the end of their next turn. For ranked advantages, they gain 1 rank, and you cannot grant fortune advantages in this way. Determination, Inspiration, and Luck are commonly-granted advantages, but you can grant any non-fortune advantage.\n\nRANKED: For each additional rank, you can affect another ally with the same Command action by spending an additional Hero Point. You can grant different advantages to different allies when you do so.`
  },
  {
    name: "Luck",
    types: ["Heroic"],
    ranked: true,
    maxRanks: "heroicLimit",
    description: "Re-roll a die once per rank, adding +10 on a 1-10 roll",
    fullText: `LUCK\nHEROIC, RANKED\nOnce per adventure, you can re-roll a d20 result you just rolled. If the die on your re-roll shows a 1-10, add +10 to the result, so the re-roll is always an 11-20.\n\nRANKED: You can use Luck an additional time per adventure per additional rank in this advantage. Your maximum Luck rank is limited by your total ranks in heroic advantages. Your uses of Luck reset at the start of the next adventure.`
  },
  {
    name: "Menacing Attack",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction for Intimidation after incapacitating a foe",
    conditionalSummary: "Reaction: Immediate free-action Intimidation Impress check upon Incapacitating an opponent.",
    fullText: `MENACING ATTACK\nCOMBAT, REACTION\nIf you render an opponent Incapacitated—including Dying or Dead, at the GM's discretion—you can use your reaction for an immediate Impress action using Intimidation to Demoralize. See Impress Checks in the Action & Adventure chapter.`
  },
  {
    name: "Minion",
    types: ["General", "Focused"],
    ranked: true,
    maxRanks: 20,
    focused: true,
    description: "Gain a follower with (rank x 15) Power Points",
    fullText: `MINION\nGENERAL, FOCUSED, RANKED\nYou have a non-player character minion who assists you. This minion has a Power Point total of (Minion advantage rank x 15) and the Minion traits given in the Minions section at the end of the Abilities chapter. Minions are subject to the normal series Power Level limits, and cannot have minions themselves, either through this advantage or otherwise.\n\nYour minion automatically has a Helpful Attitude toward you and is considered your ally. Minions do not have or gain Hero Points, although you can use command advantages to benefit them, particularly Leadership. Any lost minions are replaced in between adventures with other followers with similar abilities at the Game Master's discretion. Game Masters may limit or even prohibit player characters from having this advantage.\n\nMULTIPLE MINIONS: Rather than increasing Power Points available, you can allocate additional ranks of this advantage to double your number of minions per rank: 2, 4, 8, 16, and so forth. Your minions should be all of the same general type, such as human agents, infernal demons, undead, and so forth.\n\nRANKED: Minions do not earn Power Points. Instead, you must spend your own earned Power Points to increase your rank in this advantage to improve the Minion's Power Point total and traits.\n\nFOCUSED: Each type of Minion you have is a separate instance of this advantage.`
  },
  {
    name: "Partner Bond",
    types: ["Fortune", "Heroic", "Focused"],
    ranked: true,
    maxRanks: "heroicLimit",
    focused: true,
    description: "Grant a partner an advantage/Hero Point once per rank",
    fullText: `PARTNER BOND\nFORTUNE, HEROIC, FOCUSED, RANKED\nWhen you configure this advantage, choose one other character as your partner or teammate. Once per adventure, you can use your Partner Bond to grant that character the benefit of a Hero Point, with the additional ability to grant the benefits of fortune advantages (other than this one). To do so, you must be able to see your partner and they must be able to see or hear you. Characters often have reciprocal Partner Bond advantages with each other, but this is not required.\n\nRANKED: You can use your Partner Bond an additional time per adventure per additional rank in this advantage. Your maximum Partner Bond rank is limited by your total ranks in heroic advantages. Your uses of Partner Bond reset at the start of the next adventure.\n\nFOCUSED: You can have a Partner Bond with more than one character. Each Partner Bond is a separate advantage.`
  },
  {
    name: "Precise Shot",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Ignore penalties for Cover for ranged attacks",
    conditionalSummary: "Ignore penalties for less than total cover on ranged attacks.",
    fullText: `PRECISE SHOT\nCOMBAT\nYour ranged attack checks ignore penalties for less than total cover.`
  },
  {
    name: "Precise Strike",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Ignore penalties for Cover for close attacks",
    conditionalSummary: "Ignore penalties for less than total cover on close attacks.",
    fullText: `PRECISE STRIKE\nCOMBAT\nYour close attack checks ignore penalties for less than total cover.`
  },
  {
    name: "Prepared Effect",
    types: ["Heroic"],
    ranked: true,
    maxRanks: "heroicLimit",
    description: "One prepared Improvised Effect per rank per adventure",
    fullText: `PREPARED EFFECT\nHEROIC, RANKED\nAt the start of each adventure, you have an already-prepared improvised effect (see Improvised Effects in Chapter 6) you can define and use during the adventure, but you are limited to effects you could have prepared with a routine check (see Routine Checks in Chapter 1). The improvised effect lasts for a scene, as usual, and then stops working. Your use of Prepared Effect renews at the start of each adventure.\n\nRANKED: For each additional rank in this advantage, you have another already-prepared improvised effect, all of which renew at the start of each adventure. Your maximum Prepared Effect rank is limited by your total ranks in heroic advantages.`
  },
  {
    name: "Prone Fighting",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "No penalties for fighting while Prone",
    conditionalSummary: "No -5 attack penalty while Prone, and close attackers gain no bonus against you.",
    fullText: `PRONE FIGHTING\nCOMBAT\nYou do not have a -5 penalty to your close attack checks while Prone, and opponents do not gain a bonus on close attack checks against you. See the Prone condition in Chapter 1.\n\nNORMAL: While Prone you have a -5 penalty to close attack checks and opponents gain a +5 bonus to close attack checks against you.`
  },
  {
    name: "Ranged Attack",
    types: ["Combat"],
    ranked: true,
    maxRanks: 20,
    description: "+1 to ranged attack checks per rank",
    fullText: `RANGED ATTACK\nCOMBAT, RANKED\nYou have a +1 bonus to all ranged attack checks. For bonuses with a single type of ranged attack, use the Ranged Combat Skill.\n\nRANKED: Each additional rank increases your ranged attack check bonus by +1, up to the Power Level limit.`
  },
  {
    name: "Ranged Defense",
    types: ["Combat"],
    ranked: true,
    maxRanks: 20,
    description: "+1 to Defense against ranged attacks per rank",
    fullText: `RANGED DEFENSE\nCOMBAT, RANKED\nYou gain a +1 bonus to your Defense against ranged attacks.\n\nRANKED: Each additional rank increases your Defense against ranged attacks by +1, up to the Power Level limit.`
  },
  {
    name: "Ranged Pin",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Use a ranged attack to pin and Restrain a target",
    conditionalSummary: "Target adjacent to a surface hit by a ranged attack is Restrained (DC 15 Escape).",
    fullText: `RANGED PIN\nCOMBAT\nYou can use a ranged weapon to pin an opponent to a nearby surface. The target must be adjacent to a suitable surface like a wall, tree trunk, or the like. Make an attack check against the target's Dodge DC. If the attack succeeds, the target is Restrained (Immobile and Vulnerable). To break free, the target must take an Escape action against a DC of 15, which removes the Restrained condition.`
  },
  {
    name: "Redirect",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction to redirect a missed attack at another target",
    conditionalSummary: "Reaction: Redirect a missed attack targeting you toward another visible target in range.",
    fullText: `REDIRECT\nCOMBAT, REACTION\nIf an attack check against you results in a miss, you can use your reaction to direct the missed attack at another target you can accurately perceive. The new target must be within range of the original attack. The Game Master rolls a new attack check using the attacker's check modifier against the new target.`
  },
  {
    name: "Reflexive Block",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction to Block",
    conditionalSummary: "Reaction: Perform a Block action that lasts until your next turn.",
    fullText: `REFLEXIVE BLOCK\nCOMBAT, REACTION\nYou can use your reaction to perform the Block action, which lasts until the start of your next turn.`
  },
  {
    name: "Reverse Hold",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "When you succeed on an Escape, you can Grab your opponent",
    conditionalSummary: "Reaction: Immediate opposed Grab check to hold your opponent upon successfully Escaping a Grab.",
    fullText: `REVERSE HOLD\nCOMBAT, REACTION\nWhen you succeed on an Escape action against a Grab, you can use your reaction for an opposed Grab check against the opponent from whom you just escaped in order to try and put them into a hold. If you escaped from multiple opponents, choose one to attempt to Grab.`
  },
  {
    name: "Reviving Team Attack",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "When you participate in a Team Attack, remove a condition",
    conditionalSummary: "Remove Dazed or Stunned from an ally in a Team Attack instead of adding damage bonus.",
    fullText: `REVIVING TEAM ATTACK\nCOMBAT\nYour teamwork lends support and inspires your allies. When you successfully contribute to a team attack, rather than adding a bonus to the attack's rank, you can choose to remove one of the Dazed or Stunned conditions from another character contributing to the team attack. You can remove one condition per degree of success on your team attack check, and can choose a different character or condition for each.`
  },
  {
    name: "Ricochet",
    types: ["Combat", "Focused"],
    ranked: true,
    maxRanks: 10,
    focused: true,
    description: "Bounce a ranged attack off surfaces (+1 bounce per rank)",
    conditionalSummary: "Bounce a chosen ranged attack off surfaces (+1 bounce per rank) to bypass cover.",
    fullText: `RICOCHET\nCOMBAT, FOCUSED, RANKED\nYou can "bounce" a ranged attack, chosen when this advantage is configured, off of surfaces, even other characters, to make trick shots, avoid cover, or change its direction. Your attack can bounce once before hitting your target. Determine cover from the last bounce to the target. The bounce doesn't harm the surface it hits, and an attack with Ricochet can't damage multiple targets at once.\n\nFOCUSED: Each different ranged attack you can Ricochet is a separate advantage.\n\nRANKED: For each additional rank in this advantage, you can bounce your attack an additional time before it hits its target.`
  },
  {
    name: "Riposte",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction to make a close attack when missed",
    conditionalSummary: "Reaction: Immediate close attack against an opponent who misses you with a close attack.",
    fullText: `RIPOSTE\nCOMBAT, REACTION\nIf an opponent misses you with a Close Attack, you can use your reaction to make an immediate Close Attack against them.`
  },
  {
    name: "Rush of Victory",
    types: ["Combat", "Command", "Fortune", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Spend a Hero Point for allies to Recover when you Incapacitate a foe",
    conditionalSummary: "Spend a Hero Point when Incapacitating a foe to allow all visible allies to take a free Recover action.",
    fullText: `RUSH OF VICTORY\nCOMBAT, COMMAND, FORTUNE, REACTION\nIf you render a non-Minion opponent Incapacitated—including Dying or Dead, at the GM's discretion—you can spend a Hero Point to allow all allies able to see or hear you to use their reaction to Recover, even if they have already taken the Recover action in this Scene.`
  },
  {
    name: "Seize Initiative",
    types: ["Fortune"],
    ranked: false,
    maxRanks: 1,
    description: "Spend a Hero Point to go first in the Initiative Order",
    fullText: `SEIZE INITIATIVE\nFORTUNE\nWhen making an Initiative check, you can spend a Hero Point to automatically go first in the Initiative Order (see Initiative in the Action and Adventure chapter). You may only do so at the start of combat, when you would normally make your Initiative check. If more than one character uses Seize Initiative at the same time, everyone who used it makes Initiative checks normally and acts in Initiative Order before everyone else, then all the remaining characters who did not use this advantage act in Initiative Order.`
  },
  {
    name: "Set-Up",
    types: ["Combat"],
    ranked: true,
    maxRanks: 10,
    description: "Transfer Feint/Impress combat benefits to allies",
    conditionalSummary: "Transfer the combat benefits of a successful Feint or Impress check to one or more allies (+1 ally per rank).",
    fullText: `SET-UP\nCOMBAT, RANKED\nYou can transfer the benefits of a successful Feint or Impress check to one of your allies able to see or hear you. See those actions in the Action and Adventure chapter, for details. For example, you can Feint and have your target Vulnerable to your ally's next attack, rather than yours.\n\nRANKED: Each additional Rank in Set-Up lets you simultaneously transfer the benefit to an additional ally, including yourself, meaning both you and one or more allies gain the benefit of the Feint or Impress action.`
  },
  {
    name: "Sidekick",
    types: ["General", "Focused"],
    ranked: true,
    maxRanks: 20,
    focused: true,
    description: "Gain a sidekick with (5 x rank) Power Points",
    fullText: `SIDEKICK\nGENERAL, FOCUSED, RANKED\nYou have a Sidekick, a non-player character serving as your ally, partner, or aide. Create your Sidekick as an independent character with (Sidekick advantage rank x 5) Power Points, and subject to the series Power Level. Your Sidekick's Attitude is automatically Helpful towards you. Game Masters should generally allow you to control your Sidekick, although Sidekicks remain NPCs and the GM has final say in their actions.\n\nSidekicks do not have Hero Points, but you can spend your own Hero Points on the Sidekick's behalf as if you had the Leadership advantage solely for them. Sidekicks are not minions, but full-fledged characters, so they are not subject to the Minion guidelines in Chapter 1.\n\nRANKED: Sidekicks do not earn Power Points. Instead, you must spend earned Power Points to increase your rank in this advantage to improve the Sidekick's Power Point total and traits; each additional rank grants the Sidekick 5 additional power points.`
  },
  {
    name: "Skill Expertise",
    types: ["Skill", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Roll two dice for a skill specialization, taking the better",
    fullText: `SKILL EXPERTISE\nSKILL, FOCUSED\nChoose a skill specialization for one of your trained skills. You may roll two dice when making skill checks with that specialization, taking the better of the two rolls for your check result.\n\nFOCUSED: Skill Expertise with each skill specialization is a separate advantage, including the different specializations of the same skill.`
  },
  {
    name: "Skill Mastery",
    types: ["Skill", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Make routine checks with a chosen skill under pressure",
    fullText: `SKILL MASTERY\nSKILL, FOCUSED\nChoose one of your trained skills. You can make routine checks with that skill even while under pressure (see Routine Checks in The Basics chapter). This advantage does not allow you to make routine checks with skills that do not normally allow them.\n\nFOCUSED: Skill Mastery with each skill is a separate advantage.`
  },
  {
    name: "Sleeper Hold",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Use a Grab to Incapacitate a target",
    conditionalSummary: "Maintain a Grab with Concentrate to force Fortitude checks vs (10 + STR): Dazed, Stunned, Asleep.",
    fullText: `SLEEPER HOLD\nCOMBAT\nWith a successful Grab action, you can put a target into a hold designed to knock them out. After winning an opposed Grab check, you can take the Concentrate action on your next turn to maintain the grab and force the held target to make a Fortitude resistance check against a DC of (10 + your Strength rank):\n\n• SUCCESS: No effect.\n• FAILURE (ONE DEGREE): The target is Dazed.\n• FAILURE (TWO DEGREES): The target is Stunned.\n• FAILURE (THREE DEGREES): The target is Asleep.\n\nOn subsequent turns, you can continue to take the Concentrate action to maintain the sleeper hold, requiring a new resistance check from the target: Success means no additional effect. Failure means the effect increases by one degree. When the sleeper hold ends, targets can roll a new Fortitude resistance check at the end of each of their turns to remove the Dazed or Stunned condition. Sleeping targets get a Fortitude resistance check each minute to wake up unless they're deliberately awakened.\n\nSleeper Hold has no effect on targets with Fortitude Immunity or with Hardened or Impervious Toughness equal to or greater than your Strength rank.`
  },
  {
    name: "Snap Shot",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction for a ranged attack at -5",
    conditionalSummary: "Reaction: Make a ranged attack at -5 when a target moves within range.",
    fullText: `SNAP SHOT\nCOMBAT, REACTION\nWhen a target moves and is within range of your ranged attack, you can use your reaction to make a ranged attack against the target, with a -5 penalty on the attack check.`
  },
  {
    name: "Split Attack",
    types: ["Combat", "Ranked", "Focused"],
    ranked: true,
    maxRanks: 5,
    focused: true,
    description: "Split an attack into multiple smaller attacks",
    conditionalSummary: "Divide a chosen attack's rank between 2 targets (+1 target per additional rank).",
    fullText: `SPLIT ATTACK\nCOMBAT, RANKED, FOCUSED\nChoose a specific attack that you have. When you take the Attack action, you can divide that attack between two different targets. This usually represents rapid, but less forceful, attacks in order to hit more than one target. Divide the attack's effect rank between the two targets as you wish and make an attack check for each target. The attack works on each target normally at its reduced rank. An attack's effect cannot split to less than 1 rank per target, and cannot attack the same target more than once per Attack action.\n\nRANKED: Each additional rank of this advantage allows you to split an attack an additional time, so rank 2 lets you split an attack among three targets, then four, and so forth.\n\nFOCUSED: Each specific attack you can use Split Attack with is a separate advantage.`
  },
  {
    name: "Startling Intimidation",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Use Intimidation in place of Deception for an impress check",
    fullText: `STARTLING INTIMIDATION\nSKILL\nYou can use your Intimidation skill in place of Deception for an Impress action to Distract a target. See the Deception skill description and Impress Checks in the Action and Adventure chapter.`
  },
  {
    name: "Stunning Strike",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Close unarmed attack can stun instead of damage",
    conditionalSummary: "Close unarmed hit forces Fortitude check vs (10 + STR): Dazed, Stunned, Incapacitated.",
    fullText: `STUNNING STRIKE\nCOMBAT\nWhen you make an unarmed attack in close combat, instead of inflicting damage, you can choose to have your target make a Fortitude resistance check against a DC of (10 + your Strength rank):\n\n• SUCCESS: No effect.\n• FAILURE (ONE DEGREE): The target is Dazed.\n• FAILURE (TWO DEGREES): The target is Stunned.\n• FAILURE (THREE DEGREES): The target is Incapacitated.\n\nTargets can roll a new Fortitude resistance check at the end of each of their turns to remove the Dazed or Stunned condition. Incapacitated targets get a Fortitude resistance check each minute to recover and remove the condition. Stunning Strike has no effect on targets with Fortitude Immunity.`
  },
  {
    name: "Surprise Attack",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Greater effect when attacking a Surprised or Defenseless target",
    conditionalSummary: "+5 to the resistance DC of attacks made against Surprised or Defenseless targets.",
    fullText: `SURPRISE ATTACK\nCOMBAT\nIf you successfully attack a Surprised or Defenseless target and do not have any penalties on your attack check, you increase the resistance DC of your attack by +5.`
  },
  {
    name: "Swift Strike",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction for a close attack at -5",
    conditionalSummary: "Reaction: Make a close attack at -5 when a target moves into reach.",
    fullText: `SWIFT STRIKE\nCOMBAT, REACTION\nWhen a target moves into range of your close attack, you can use your reaction to make an immediate close attack against them with a -5 penalty on your check.`
  },
  {
    name: "Tactical Advance",
    types: ["Combat", "Command", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "When you Daze or Stun, allies can move towards the target",
    conditionalSummary: "Reaction: When you Daze or Stun a target, aware allies can use reactions to Move toward it.",
    fullText: `TACTICAL ADVANCE\nCOMBAT, COMMAND, REACTION\nWhen you impose the Dazed or Stunned condition on an opponent, allies able to see or hear you can use their reaction for a Move action to move towards that opponent.`
  },
  {
    name: "Tactical Genius",
    types: ["General"],
    ranked: false,
    maxRanks: 1,
    description: "Use Intellect instead of Presence for Command advantages",
    fullText: `TACTICAL GENIUS\nGENERAL\nYour limit for command advantages is your Intellect rank rather than your Presence rank. See Command Advantages under Ranked Advantages at the start of this chapter.`
  },
  {
    name: "Tactical Training",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Perform deception/intimidation actions with Expertise: Tactics",
    conditionalSummary: "Perform Distract, Innuendo, Trick, and Demoralize checks using Expertise: Tactics.",
    fullText: `TACTICAL TRAINING\nCOMBAT\nHaving trained alongside teammates, you work together in combat like a well-oiled machine. You may perform the Distracting, Innuendo, and Tricking actions of the Deception skill and the Demoralizing action of the Intimidation skill using the Expertise: Tactics skill instead. You may only share the benefits of these actions with other characters—sending coded messages with Innuendo or transferring the benefits of a Distracting Impress action using the Set-up advantage—if those characters also have this advantage and have trained with you previously.`
  },
  {
    name: "Takedown",
    types: ["Combat"],
    ranked: true,
    maxRanks: 2,
    description: "Free extra attack when you Incapacitate a minion",
    conditionalSummary: "Free extra attack against adjacent minion when incapacitating a minion. Rank 2 allows moving between attacks.",
    fullText: `TAKEDOWN\nCOMBAT, RANKED 2\nIf you Incapacitate a Minion with an attack, you can make an immediate extra Attack action against another Minion within range and adjacent to the previous target as a free action. The extra attack uses the same attack and check modifier as the first. If you continue to Incapacitate Minions, you can continue making extra attacks as free actions until you fail to Incapacitate a target or there are no more valid targets you can attack.\n\nRANKED: A second rank in this advantage allows you to attack non-adjacent Minion targets, including moving between attacks if necessary to do so. You cannot move more than your total movement speed in the round, regardless of the number of attacks you make. You stop attacking once you miss or there are no more valid targets you can attack.`
  },
  {
    name: "Taunting Interaction",
    types: ["Skill", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Make an impress check to Impair or Disable an opponent",
    fullText: `TAUNTING INTERACTION\nSKILL, FOCUSED\nYou can use an interaction skill for an Impress action to inflame an opponent's emotions so they make mistakes and are less effective. See Impress Checks in the Action & Adventure chapter. If you succeed on your impress check, the target is Impaired, Disabled with two or more degrees of failure. The target makes a new resistance check at the end of each of their Turns, with success removing the condition.\n\nFOCUSED: Taunting with each interaction skill is a separate advantage: Taunting Deception, Taunting Intimidation, Taunting Performance, Taunting Persuasion.`
  },
  {
    name: "Team Code",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Tactical communication with teammates",
    fullText: `TEAM CODE\nSKILL\nYou and any other members of a team with this advantage share a knowledge of various code words, pre-planned maneuvers, and so forth, allowing you to quickly and easily communicate tactical plans without being overheard. In play, you can make tactical plans with other players as a free action and sum up those plans as a code word or phrase like "Maneuver 14" or "Orbital Strike." You also gain a +5 bonus for Deception and Insight checks to use Innuendo to communicate tactical information with other members of your team.`
  },
  {
    name: "Teamwork",
    types: ["General"],
    ranked: false,
    maxRanks: 1,
    description: "+5 on Team Checks",
    fullText: `TEAMWORK\nGENERAL\nYou're especially effective at helping your teammates. When you support a team check you have a +5 bonus on your check. This bonus also applies to the Aid action and to team attacks. See Team Checks in The Basics chapter and Aid and Team Attack under Actions in the Action & Adventure chapter for details.`
  },
  {
    name: "Throwing Mastery",
    types: ["Combat"],
    ranked: true,
    maxRanks: 20,
    description: "+1 damage with thrown weapons per rank",
    conditionalSummary: "+1 Damage rank with thrown weapons per rank. Throw tiny objects as Damage 1 weapons.",
    fullText: `THROWING MASTERY\nCOMBAT, RANKED\nYou have a +1 bonus to Damage rank with thrown weapons. You can also throw normally harmless small objects—playing cards, pens, paper clips, and so forth—as Damage 1 throwing weapons. Your maximum Damage bonus with any given weapon or attack is still limited by Power Level.\n\nRANKED: Each additional rank in Throwing Mastery increases your Damage bonus by +1.`
  },
  {
    name: "Tough",
    types: ["General"],
    ranked: true,
    maxRanks: 20,
    description: "+1 Toughness per rank",
    fullText: `TOUGH\nGENERAL, RANKED\nIncrease your Toughness rank by +1, to a maximum of your Power Level limit.\n\nRANKED: Each additional rank in Tough increases your Toughness rank by +1, to a maximum of your Power Level limit. The Game Master may set a reasonable rank limit on this advantage, usually 2-4, depending on the series style.`
  },
  {
    name: "Tracking",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Use Perception or Survival for tracking",
    fullText: `TRACKING\nSKILL\nYou're a skilled tracker. You can use the Perception or Survival skills to follow tracks with an acute sense like the Tracking effect of Enhanced Senses in the Powers chapter.`
  },
  {
    name: "Trance",
    types: ["General"],
    ranked: false,
    maxRanks: 1,
    description: "Go into a deathlike trance and slow body functions",
    fullText: `TRANCE\nGENERAL\nWith a minute of meditation and a DC 15 Awareness check, you can slip into a deep trance. While in the trance add your Awareness rank to your Stamina rank to determine how long you can hold your breath and you use the higher of your Fortitude or Will Defenses for resistance checks against suffocation, disease, poison, and other biological hazards. Poison and disease effects can also be suspended for the duration of the trance.\n\nIt requires a Perception check opposed by your Awareness check result to determine you're not actually dead. You are aware of your surroundings while in trance and can come out of it at any time at will as a simple action. You cannot take any actions while in the trance, but your GM may allow conversation via Mental Communication or a Communication Link. See the Communication and Enhanced Senses effects in the Powers chapter.`
  },
  {
    name: "Ultimate Effort",
    types: ["Fortune", "Heroic", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Spend a Hero Point to gain a 20 roll on a check",
    fullText: `ULTIMATE EFFORT\nFORTUNE, HEROIC, FOCUSED\nYou can always do your best at some particular task when it really matters. Pick a specific type of check: attack checks with a specific attack, resistance checks with one Defense, or skill checks with one non-combat Skill, approved by the GM. You can spend a Hero Point on your chosen check to skip rolling the die and just treat the result as a 20 plus your check modifier. This is not a natural 20, and so does not count as an added success. This advantage must be used before you choose to roll the die for a check.\n\nThe following are some example Ultimate Efforts. Your Game Master may approve others:\n\n• ULTIMATE AIM: When you take the Aim action with any attack, you can spend a Hero Point to apply a 20 result to the attack check. Since the Ultimate Aim bonus is not a natural 20, it does not qualify as a Critical Hit.\n• ULTIMATE ATTACK: When you make an attack check with a specific attack, you can spend a Hero Point to apply a 20 result to the attack check. Since the Ultimate Attack bonus is not a natural 20, it does not qualify as a Critical Hit.\n• ULTIMATE RESISTANCE: You can spend a Hero Point to apply a 20 result to a resistance check with one Defense, such as Ultimate Toughness or Ultimate Will.\n• ULTIMATE SKILL: You can spend a Hero Point to apply a 20 result to checks with one particular Skill, such as Ultimate Investigation or Ultimate Stealth.\n\nFOCUSED: You can take Ultimate Effort multiple times to apply its benefits to different specific checks, choosing a different check each time. Your maximum Ultimate Effort advantages are limited by your total ranks in heroic advantages.`
  },
  {
    name: "Uncanny Dodge",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Not Vulnerable when Surprised",
    conditionalSummary: "Retain full Defense when Surprised or caught off-guard.",
    fullText: `UNCANNY DODGE\nCOMBAT\nYou are especially attuned to danger. You are not Vulnerable when Surprised or otherwise caught off-guard. You can still be made Vulnerable by effects or situations that limit your mobility.`
  },
  {
    name: "Untapped Potential",
    types: ["Heroic"],
    ranked: true,
    maxRanks: "heroicLimit",
    description: "Gain +2 ranks (or +1 per additional rank) from Extra Effort",
    fullText: `UNTAPPED POTENTIAL\nHEROIC\nWhen you use Extra Effort to increase an effect's rank, you gain 2 ranks rather than just 1. As with other uses of Extra Effort, this rank increase is not subject to Power Level limits. See Extra Effort in The Basics chapter.\n\nRANKED: Each additional rank adds 1 to the increase in power rank you gain from Extra Effort. Your maximum Untapped Potential rank is limited by your total ranks in heroic advantages.`
  },
  {
    name: "Up and At 'Em",
    types: ["Combat", "Command"],
    ranked: false,
    maxRanks: 1,
    description: "Command action to allow allies to Stand with Instant Up",
    conditionalSummary: "Command action allows all aware allies to Stand immediately without being Hindered.",
    fullText: `UP AND AT 'EM\nCOMBAT, COMMAND\nYou can take a Command action to allow all allies able to see or hear you to immediately Stand as if they had the Instant Up advantage. See the Stand action in the Action and Adventure chapter and Instant Up in this chapter.`
  },
  {
    name: "Variable Team Attack",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Apply a Variable Descriptor to a Team Attack",
    conditionalSummary: "Apply a 1-point (or 2-point on 3+ degrees) Variable Descriptor to a Team Attack.",
    fullText: `VARIABLE TEAM ATTACK\nCOMBAT\nWhen you successfully contribute to a Team Attack, rather than adding a bonus to the attack's rank, you can apply a 1-point Variable Descriptor to the attack's effect. If your team attack check has three or more degrees of success, you can apply a 2-point Variable Descriptor instead. See Variable Descriptor in the Extras section of the Powers chapter.`
  },
  {
    name: "Weapon Bind",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Reaction Disarm when missed with a weapon attack",
    conditionalSummary: "Reaction: Immediate Disarm check against an attacker who misses you with a weapon attack.",
    fullText: `WEAPON BIND\nCOMBAT, REACTION\nIf a close attack with a weapon misses you, you can use your reaction for an immediate Disarm action against the attacker. See Disarm in the Action & Adventure chapter.`
  },
  {
    name: "Weapon Break",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Reaction Smash when missed with a weapon attack",
    conditionalSummary: "Reaction: Immediate Smash check against the attacker's weapon when missed in close combat.",
    fullText: `WEAPON BREAK\nCOMBAT, REACTION\nIf a close attack with a weapon misses you, you can use your reaction for an immediate Smash action against the attacker's weapon. See Smash in the Action & Adventure chapter.`
  },
  {
    name: "Well-Equipped",
    types: ["Heroic"],
    ranked: true,
    maxRanks: "heroicLimit",
    description: "Produce one item or 5 points of Equipment per adventure",
    fullText: `WELL-EQUIPPED\nHEROIC, RANKED\nYou are well-equipped and prepared for every situation. Once per adventure, you can have a single piece of Equipment "on-hand" so long as it is within your allotment of Equipment Points, or worth 5 Equipment Points or less, if you do not have the Equipment advantage. See On-Hand Equipment in the Equipment chapter for more details.\n\nRANKED: For each additional rank in this advantage, you can use it an additional time per adventure. Your maximum Well-Equipped rank is limited by your total ranks in heroic advantages. Your uses of Well-Equipped reset at the start of the next adventure.`
  },
  {
    name: "Well-Informed",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Immediate skill check for available information",
    fullText: `WELL-INFORMED\nSKILL\nYou are exceptionally well-informed. When encountering an individual, group, or organization for the first time, you can make an immediate Investigation or Persuasion check to see if your character has already heard something about them. You can do this as a routine check, if you wish. Use the guidelines for gathering information from the Investigation skill in the Skills chapter to determine the level of information you gain. You receive only one check per subject when you first encounter them. Your Game Master may allow another check if you encounter the subject again after a significant amount of time has passed, or if you choose to spend a Hero Point to gain an additional check.`
  }
];

// Complete M&M 2E Power Effects Master Table
const POWER_EFFECTS_LIST = [
  {
    name: "Affliction",
    type: "Attack",
    action: "Standard",
    range: "Close",
    duration: "Instant",
    check: "Attack vs. Defense",
    resistance: "Resistance vs. Effect",
    baseCost: 1,
    costType: "per_rank",
    caution: true,
    fullText: `AFFLICTION\nEFFECT TYPE: Attack | ACTION: Standard | RANGE: Close | DURATION: Instant\nCHECK: Attack vs. Defense | RESISTANCE: Resistance vs. Effect | BASE COST: 1 per rank\n\nAfflictions can impose various conditions on a target. Minor condition at 1 DoF (Dazed, Fatigued, Hindered, Impaired, Vulnerable, etc.), moderate at 2 DoF (Compelled, Defenseless, Disabled, Exhausted, Stunned, etc.), and major at 3 DoF (Asleep, Controlled, Incapacitated, Paralyzed, Transformed, etc.).`
  },
  {
    name: "Burrowing",
    type: "Movement",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `BURROWING\nEFFECT TYPE: Movement | ACTION: Free | RANGE: Personal | DURATION: Sustained\nBASE COST: 1 per rank\n\nYou can burrow through soil and sand at a speed rank equal to your Burrowing rank (packed earth reduces speed by 1, rock reduces speed by 2).`
  },
  {
    name: "Communication",
    type: "Sensory",
    action: "Free",
    range: "Rank",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 2,
    costType: "per_rank",
    caution: false,
    fullText: `COMMUNICATION\nEFFECT TYPE: Sensory | ACTION: Free | RANGE: Rank | DURATION: Sustained\nBASE COST: 2 per rank\n\nYou can communicate at a distance using a chosen sense medium (Sight, Hearing, Smell, Touch, Radio, Mental, Special). Rank 1: city, Rank 2: region, Rank 3: continent, Rank 4: worldwide, Rank 5: unlimited.`
  },
  {
    name: "Comprehend",
    type: "Sensory",
    action: "Free",
    range: "Personal",
    duration: "Permanent",
    check: "None",
    resistance: "None",
    baseCost: 2,
    costType: "per_rank",
    caution: false,
    fullText: `COMPREHEND\nEFFECT TYPE: Sensory | ACTION: Free | RANGE: Personal | DURATION: Permanent\nBASE COST: 2 per rank\n\nUnderstand or communicate with different entities: Animals (1-2 ranks), Computers (1-2 ranks), Languages (1-4 ranks), Objects (2 ranks), Plants (2 ranks), Spirits (1-2 ranks).`
  },
  {
    name: "Concealment",
    type: "Sensory",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 2,
    costType: "per_rank",
    caution: false,
    fullText: `CONCEALMENT\nEFFECT TYPE: Sensory | ACTION: Free | RANGE: Personal | DURATION: Sustained\nBASE COST: 2 per rank\n\nGain Full Concealment from a chosen sense (1 rank per sense, 2 ranks per sense type; sight senses cost 2 ranks for one sense, 4 ranks for all sight senses).`
  },
  {
    name: "Create",
    type: "Control",
    action: "Standard",
    range: "Ranged",
    duration: "Sustained",
    check: "Attack vs. Defense",
    resistance: "Dodge vs. Effect",
    baseCost: 2,
    costType: "per_rank",
    caution: true,
    fullText: `CREATE\nEFFECT TYPE: Control | ACTION: Standard | RANGE: Ranged | DURATION: Sustained\nCHECK: Attack vs. Defense | RESISTANCE: Dodge vs. Effect | BASE COST: 2 per rank\n\nForm solid objects with volume rank and Toughness rank up to your effect rank.`
  },
  {
    name: "Damage",
    type: "Attack",
    action: "Standard",
    range: "Close",
    duration: "Instant",
    check: "Attack vs. Defense",
    resistance: "Toughness vs. Effect",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `DAMAGE\nEFFECT TYPE: Attack | ACTION: Standard | RANGE: Close | DURATION: Instant\nCHECK: Attack vs. Defense | RESISTANCE: Toughness vs. Effect | BASE COST: 1 per rank\n\nInflict Damage conditions (Hit, Dazed, Stunned, Staggered, Incapacitated, Dying, Dead) against a target's Toughness resistance.`
  },
  {
    name: "Deflect",
    type: "Defense",
    action: "Standard",
    range: "Personal",
    duration: "Instant",
    check: "Deflect vs. Attack",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `DEFLECT\nEFFECT TYPE: Defense | ACTION: Standard | RANGE: Personal | DURATION: Instant\nCHECK: Deflect vs. Attack | BASE COST: 1 per rank\n\nBlock ranged attacks as well as close attacks using your Deflect rank in place of your attack bonus.`
  },
  {
    name: "Elongation",
    type: "Alteration",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `ELONGATION\nEFFECT TYPE: Alteration | ACTION: Free | RANGE: Personal | DURATION: Sustained\nBASE COST: 1 per rank\n\nElongate your body and limbs up to (rank x distance value 3) to extend reach, climbing, and grabbing.`
  },
  {
    name: "Enhanced Movement",
    type: "Movement",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `ENHANCED MOVEMENT\nEFFECT TYPE: Movement | ACTION: Free | RANGE: Personal | DURATION: Sustained\nBASE COST: 1 per rank\n\nAllocate ranks to special movement modes: Dimensional Travel (2-6 ranks), Environmental Adaptation (1 rank), Permeate (2-6 ranks), Safe Fall (1 rank), Slithering (1 rank), Space Travel (2-6 ranks), Stable (1 rank), Swinging (2 ranks), Trackless (1 rank), Wall-Crawling (2-4 ranks), Water-Walking (1-2 ranks).`
  },
  {
    name: "Enhanced Senses",
    type: "Sensory",
    action: "None",
    range: "Personal",
    duration: "Permanent",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `ENHANCED SENSES\nEFFECT TYPE: Sensory | ACTION: None | RANGE: Personal | DURATION: Permanent\nBASE COST: 1 per rank\n\nAllocate ranks to sensory enhancements: Accurate (2-4), Acute (1-2), Analytical (1-2), Awareness (1), Counters Concealment (2-5), Counters Illusion (2), Danger Sense (2), Dark-Vision (2), Detect (1), Direction Sense (1), Distance Sense (1), Extended Sense (1-2), Infra-Vision (1), Low-Light Vision (1), Microscopic Vision (1-4), Penetrates Concealment (2-4), Radio (1), Radius (1-2), Ranged (1-2), Rapid (1+), Time Sense (1), Tracking (1-2), Ultra-Hearing (1), Ultra-Vision (1).`
  },
  {
    name: "Enhanced Trait",
    type: "General",
    action: "None",
    range: "Personal",
    duration: "Permanent",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "as_trait",
    caution: false,
    fullText: `ENHANCED TRAIT\nEFFECT TYPE: General | ACTION: None | RANGE: Personal | DURATION: Permanent\nBASE COST: Same cost as improved trait\n\nImprove an ability, skill, advantage, or defense as an active power effect.`
  },
  {
    name: "Environment",
    type: "Control",
    action: "Free",
    range: "Rank",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `ENVIRONMENT\nEFFECT TYPE: Control | ACTION: Free | RANGE: Rank | DURATION: Sustained\nBASE COST: 1+ per rank\n\nAlter the environment in a sphere (radius equal to rank): Cold (1-2), Hazardous Movement (1-2), Heat (1-2), High Gravity (1-2), Hindered Movement (1-2), Illumination (1-2), Low Gravity (1-2), Visibility (1-2).`
  },
  {
    name: "Extra Limbs",
    type: "Alteration",
    action: "None",
    range: "Personal",
    duration: "Permanent",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `EXTRA LIMBS\nEFFECT TYPE: Alteration | ACTION: None | RANGE: Personal | DURATION: Permanent\nBASE COST: 1 per rank\n\nGain extra manipulative limbs (1 limb at rank 1, 2 at rank 2, 4 at rank 3, 8 at rank 4, etc.) providing bonuses to Grabbing or Stability up to +5.`
  },
  {
    name: "Feature",
    type: "General",
    action: "None",
    range: "Personal",
    duration: "Permanent",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `FEATURE\nEFFECT TYPE: General | ACTION: None | RANGE: Personal | DURATION: Permanent\nBASE COST: 1 per rank\n\nMinor useful inherent capability or body feature (e.g. Animal Harmony, Battery, Built-in Equipment, Charmed Life, Chill, Dimensional Pocket, Insulating Fur, Internal Compartment, Iron Stomach, Light Sleeper, Mimicry, Quick Change, etc.).`
  },
  {
    name: "Flight",
    type: "Movement",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 2,
    costType: "per_rank",
    caution: false,
    fullText: `FLIGHT\nEFFECT TYPE: Movement | ACTION: Free | RANGE: Personal | DURATION: Sustained\nBASE COST: 2 per rank\n\nMove through the air and hover with flight speed rank equal to effect rank.`
  },
  {
    name: "Fortune Control",
    type: "Control",
    action: "None",
    range: "Perception",
    duration: "Instant",
    check: "None",
    resistance: "None",
    baseCost: 3,
    costType: "per_rank",
    caution: true,
    fullText: `FORTUNE CONTROL\nEFFECT TYPE: Control | ACTION: None | RANGE: Perception | DURATION: Instant\nBASE COST: 3 per rank\n\nSpend Hero Points on behalf of others, bestow Hero Points, negate others' Hero Points, avoid complications, or force re-rolls.`
  },
  {
    name: "Growth",
    type: "Alteration",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `GROWTH\nEFFECT TYPE: Alteration | ACTION: Free | RANGE: Personal | DURATION: Sustained\nBASE COST: 1 per rank\n\nTemporarily increase size category by 1 rank per Growth rank, gaining all modifiers of that size.`
  },
  {
    name: "Healing",
    type: "General",
    action: "Standard",
    range: "Close",
    duration: "Instant",
    check: "Effect vs. DC 10",
    resistance: "None",
    baseCost: 2,
    costType: "per_rank",
    caution: false,
    fullText: `HEALING\nEFFECT TYPE: General | ACTION: Standard | RANGE: Close | DURATION: Instant\nCHECK: Effect vs. DC 10 | BASE COST: 2 per rank\n\nHeal Damage conditions from a subject (Hits, Dazed, Stunned, Staggered, Incapacitated, Dying) with a DC 10 check.`
  },
  {
    name: "Illusion",
    type: "Sensory",
    action: "Standard",
    range: "Ranged",
    duration: "Concentration",
    check: "None",
    resistance: "Perception vs. Effect",
    baseCost: 1,
    costType: "per_rank",
    caution: true,
    fullText: `ILLUSION\nEFFECT TYPE: Sensory | ACTION: Standard | RANGE: Ranged | DURATION: Concentration\nRESISTANCE: Perception vs. Effect | BASE COST: 1+ per rank\n\nCreate realistic sensory impressions in an area up to size rank equal to effect rank (1 pt/rank per sense type, sight counts as 2).`
  },
  {
    name: "Immunity",
    type: "Defense",
    action: "None",
    range: "Personal",
    duration: "Permanent",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `IMMUNITY\nEFFECT TYPE: Defense | ACTION: None | RANGE: Personal | DURATION: Permanent\nBASE COST: 1 per rank\n\nComplete immunity to specified effects: 1 rank (Environmental Hazard, Aging, Disease, Poison, Suffocation type), 2 ranks (Critical Hits, rare descriptor), 5 ranks (uncommon descriptor, damage type), 10 ranks (common descriptor, all Life Support), 20 ranks (very common descriptor), 30 ranks (all Fortitude or all Will effects).`
  },
  {
    name: "Insubstantial",
    type: "Alteration",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 10,
    costType: "per_rank",
    caution: true,
    fullText: `INSUBSTANTIAL\nEFFECT TYPE: Alteration | ACTION: Free | RANGE: Personal | DURATION: Sustained\nBASE COST: 10 per rank\n\nAssume a progressively less solid form: Rank 1: Fluid, Rank 2: Gaseous, Rank 3: Energy, Rank 4: Incorporeal.`
  },
  {
    name: "Leaping",
    type: "Movement",
    action: "Free",
    range: "Personal",
    duration: "Instant",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `LEAPING\nEFFECT TYPE: Movement | ACTION: Free | RANGE: Personal | DURATION: Instant\nBASE COST: 1 per rank\n\nCross a distance rank equal to your Leaping rank in a single standing jump without suffering falling damage.`
  },
  {
    name: "Lifting",
    type: "General",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `LIFTING\nEFFECT TYPE: General | ACTION: Free | RANGE: Personal | DURATION: Sustained\nBASE COST: 1 per rank\n\nIncreases effective Strength by +1 rank per Lifting rank for lifting, carrying, and throwing objects.`
  },
  {
    name: "Mind Reading",
    type: "Sensory",
    action: "Standard",
    range: "Perception",
    duration: "Sustained",
    check: "Effect vs. Will",
    resistance: "Will vs. Effect",
    baseCost: 2,
    costType: "per_rank",
    caution: false,
    fullText: `MIND READING\nEFFECT TYPE: Sensory | ACTION: Standard | RANGE: Perception | DURATION: Sustained\nCHECK: Effect vs. Will | RESISTANCE: Will vs. Effect | BASE COST: 2 per rank\n\nRead thoughts: 1 DoS (Surface thoughts), 2 DoS (Personal thoughts), 3 DoS (Memories), 4 DoS (Subconscious).`
  },
  {
    name: "Morph",
    type: "Alteration",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 5,
    costType: "per_rank",
    caution: false,
    fullText: `MORPH\nEFFECT TYPE: Alteration | ACTION: Free | RANGE: Personal | DURATION: Sustained\nBASE COST: 5 per rank\n\nAlter physical appearance (+20 Deception disguise bonus): Rank 1: Single other form, Rank 2: Narrow group, Rank 3: Broad group, Rank 4: Any form of same mass.`
  },
  {
    name: "Move Object",
    type: "Control",
    action: "Standard",
    range: "Ranged",
    duration: "Sustained",
    check: "Attack vs. Defense",
    resistance: "Strength vs. Effect",
    baseCost: 2,
    costType: "per_rank",
    caution: false,
    fullText: `MOVE OBJECT\nEFFECT TYPE: Control | ACTION: Standard | RANGE: Ranged | DURATION: Sustained\nCHECK: Attack vs. Defense | RESISTANCE: Strength vs. Effect | BASE COST: 2 per rank\n\nLift, move, grab, disarm, or trip objects and targets at range with effective Strength equal to effect rank.`
  },
  {
    name: "Nullify",
    type: "Control",
    action: "Standard",
    range: "Ranged",
    duration: "Instant",
    check: "Attack vs. Defense",
    resistance: "Effect vs. Will or Rank",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `NULLIFY\nEFFECT TYPE: Control | ACTION: Standard | RANGE: Ranged | DURATION: Instant\nCHECK: Attack vs. Defense | RESISTANCE: Effect vs. Will or Rank | BASE COST: 1 per rank\n\nCounter and turn off effects of a chosen descriptor with an opposed check against effect rank or Will.`
  },
  {
    name: "Obscure",
    type: "Sensory",
    action: "Standard",
    range: "Ranged",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `OBSCURE\nEFFECT TYPE: Sensory | ACTION: Standard | RANGE: Ranged | DURATION: Sustained\nBASE COST: 1+ per rank\n\nBlock senses in an area, creating Full Concealment (1 pt/rank per sense, 2 pts/rank per sense type; sight costs 2 for one sense, 4 for all sight senses).`
  },
  {
    name: "Postcognition",
    type: "Sensory",
    action: "Standard",
    range: "Personal",
    duration: "Concentration",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `POSTCOGNITION\nEFFECT TYPE: Sensory | ACTION: Standard | RANGE: Personal | DURATION: Concentration\nBASE COST: 1 per rank\n\nGain visions of past events at your current location (1 use per rank per adventure; counts toward heroic advantage limit).`
  },
  {
    name: "Precognition",
    type: "Sensory",
    action: "None",
    range: "Personal",
    duration: "Permanent",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `PRECOGNITION\nEFFECT TYPE: Sensory | ACTION: None | RANGE: Personal | DURATION: Permanent\nBASE COST: 1 per rank\n\nGain glimpses of the future for guidance or rewind an immediate dangerous event as a precognitive warning (1 use per rank per adventure).`
  },
  {
    name: "Protection",
    type: "Defense",
    action: "None",
    range: "Personal",
    duration: "Permanent",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `PROTECTION\nEFFECT TYPE: Defense | ACTION: None | RANGE: Personal | DURATION: Permanent\nBASE COST: 1 per rank\n\nProvides +1 to Toughness resistance per rank.`
  },
  {
    name: "Quickness",
    type: "General",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `QUICKNESS\nEFFECT TYPE: General | ACTION: Free | RANGE: Personal | DURATION: Sustained\nBASE COST: 1 per rank\n\nPerform non-combat and routine tasks at hyper-speed (subtract Quickness rank from required time rank).`
  },
  {
    name: "Regeneration",
    type: "Defense",
    action: "None",
    range: "Personal",
    duration: "Permanent",
    check: "None",
    resistance: "None",
    baseCost: 3,
    costType: "per_rank",
    caution: false,
    fullText: `REGENERATION\nEFFECT TYPE: Defense | ACTION: None | RANGE: Personal | DURATION: Permanent\nBASE COST: 3 per rank\n\nAutomatically recover from Damage conditions (recover least severe condition every [11 - rank] rounds; at rank 10 every round; at rank 15+ recover from Dead).`
  },
  {
    name: "Remote Sensing",
    type: "Sensory",
    action: "Free",
    range: "Rank",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 5,
    costType: "per_rank",
    caution: true,
    fullText: `REMOTE SENSING\nEFFECT TYPE: Sensory | ACTION: Free | RANGE: Rank | DURATION: Sustained\nBASE COST: 5 per rank\n\nDisplace senses over distance (5 pts/rank for one sense, +1 per extra sense, 6 for sight, 10 for all senses). Range: Rank 1 city to Rank 5 unlimited.`
  },
  {
    name: "Shrinking",
    type: "Alteration",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `SHRINKING\nEFFECT TYPE: Alteration | ACTION: Free | RANGE: Personal | DURATION: Sustained\nBASE COST: 1 per rank\n\nTemporarily decrease size category by 1 rank per Shrinking rank down to Minuscule (-5 size), gaining all modifiers of that size.`
  },
  {
    name: "Speed",
    type: "Movement",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `SPEED\nEFFECT TYPE: Movement | ACTION: Free | RANGE: Personal | DURATION: Sustained\nBASE COST: 1 per rank\n\nAdd Speed rank to ground speed and climbing speed ranks.`
  },
  {
    name: "Summon",
    type: "Control",
    action: "Standard",
    range: "Close",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 2,
    costType: "per_rank",
    caution: true,
    fullText: `SUMMON\nEFFECT TYPE: Control | ACTION: Standard | RANGE: Close | DURATION: Sustained\nBASE COST: 2 per rank\n\nCall an NPC minion built with (rank x 15) Power Points to appear and assist you.`
  },
  {
    name: "Swimming",
    type: "Movement",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 1,
    costType: "per_rank",
    caution: false,
    fullText: `SWIMMING\nEFFECT TYPE: Movement | ACTION: Free | RANGE: Personal | DURATION: Sustained\nBASE COST: 1 per rank\n\nAdd Swimming rank to base water speed rank, swimming at effect rank speed.`
  },
  {
    name: "Teleport",
    type: "Movement",
    action: "Simple",
    range: "Rank",
    duration: "Instant",
    check: "None",
    resistance: "None",
    baseCost: 2,
    costType: "per_rank",
    caution: false,
    fullText: `TELEPORT\nEFFECT TYPE: Movement | ACTION: Simple | RANGE: Rank | DURATION: Instant\nBASE COST: 2 per rank\n\nMove instantly from place to place a distance rank equal to effect rank without crossing the space in between.`
  },
  {
    name: "Transmute",
    type: "Control",
    action: "Standard",
    range: "Close",
    duration: "Sustained",
    check: "Attack vs. Defense",
    resistance: "None",
    baseCost: 2,
    costType: "per_rank",
    caution: true,
    fullText: `TRANSMUTE\nEFFECT TYPE: Control | ACTION: Standard | RANGE: Close | DURATION: Sustained\nCHECK: Attack vs. Defense | BASE COST: 2+ per rank\n\nAlter object composition and shape: 2 pts (one substance to one other), 3 pts (group to one or one to group), 4 pts (group to group), 5 pts (any material to anything else). Affects (rank - 6) mass rank.`
  },
  {
    name: "Variable",
    type: "General",
    action: "Standard",
    range: "Personal",
    duration: "Sustained",
    check: "None",
    resistance: "None",
    baseCost: 7,
    costType: "per_rank",
    caution: true,
    fullText: `VARIABLE\nEFFECT TYPE: General | ACTION: Standard | RANGE: Personal | DURATION: Sustained\nBASE COST: 7 per rank\n\nGrants (rank x 5) Variable Power Points to allocate to any appropriate effect fitting your power descriptors.`
  }
];