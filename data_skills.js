const SKILLS_LIST = [
  {
    "name": "Acrobatics",
    "ability": "DEX",
    "untrained": false,
    "action": "Move or None",
    "specializations": [],
    "relatedFeats": [
      "Acrobatic Bluff",
      "Evasion",
      "Instant Up"
    ],
    "fullText": "<p>You can flip, dive, roll, tumble, and perform other acrobatic maneuvers, and you’re also adept at keeping your balance under difficult circumstances.</p><p><strong>Check:</strong> Make an Acrobatics check (DC 25) to move through a space occupied by an opponent or obstacle (moving over, under, or around). A failed roll means you don’t get past the obstacle.</p><ul><li><strong>Balancing:</strong> You can walk on a precarious surface. A successful check lets you move at half your speed along the surface as a move action. A failure indicates you spend your move action just keeping your balance and do not move. A failure by 5 or more means you fall. The difficulty varies with the conditions of the surface:<br>• More than 12 in. wide: DC 5<br>• 7–12 in. wide: DC 10<br>• 2–6 in. wide: DC 15<br>• Less than 2 in. wide: DC 20<br>• Uneven or angled: +5 DC<br>• Slippery: +5 DC<br>While balancing, you lose your dodge bonus to Defense unless you have 5 or more ranks in Acrobatics. If you take damage while balancing, make an immediate Acrobatics check to avoid falling.</li><li><strong>Accelerated Movement:</strong> You can try to move faster than normal while balancing. You can move your full speed, but take a –5 penalty on your Acrobatics check. Moving twice your speed requires two checks, one for each move action.</li><li><strong>Jumping:</strong> You can make an Acrobatics check to extend the distance you can jump by 1 foot per point your check exceeds DC 15.</li><li><strong>Falling:</strong> You can make an Acrobatics check (DC 5) to lessen damage from a fall. Subtract the amount your roll exceeds the DC from the distance of a fall in feet before determining damage. A fall reduced to 0 distance does no damage and you land on your feet. You can reduce knockback damage in the same way.</li><li><strong>Avoiding Being Tripped:</strong> You can make an Acrobatics check in place of the Strength or Dexterity check to avoid a trip attack. You cannot use Acrobatics to make trip attacks, however.</li><li><strong>Instant Up:</strong> You can make an Acrobatics check (DC 20) to stand from a prone position as a free action rather than a move action.</li></ul>"
  },
  {
    "name": "Bluff",
    "ability": "CHA",
    "untrained": true,
    "action": "Standard or Round",
    "specializations": [],
    "relatedFeats": [
      "Acrobatic Bluff",
      "Attractive",
      "Distract",
      "Fascinate",
      "Taunt"
    ],
    "fullText": "<p>You can make the outrageous or untrue seem plausible and make other people do what you want with subtle deception and misdirection. Bluff encompasses conning, fast-talking, misdirection, prevarication, lying, and deception in general.</p><p><strong>Check:</strong> A Bluff check is opposed by the target’s Sense Motive check. Favorable and unfavorable circumstances weigh heavily on the outcome:</p><ul><li>The target wants to believe you: +5 bonus to your check</li><li>The bluff is believable and doesn’t affect the target much: +0</li><li>The bluff is a little hard to believe or asks for something with little risk: –5 penalty</li><li>The bluff is hard to believe or asks for something with significant risk: –10 penalty</li><li>The bluff is almost totally unbelievable: –20 penalty</li></ul><p><strong>Special Applications:</strong></p><ul><li><strong>Feinting:</strong> You can use Bluff in combat to mislead an opponent. As a standard action, make a Bluff check opposed by your opponent’s Sense Motive or Bluff check (whichever is greater). If you succeed, your opponent loses their dodge bonus to Defense against your next attack (which must occur on or before your next turn). Feinting against a non-humanoid takes a –4 penalty; against an animal (Int 1–2) it takes a –8 penalty; against mindless creatures it is impossible.</li><li><strong>Tricking:</strong> You can trick an opponent into doing something foolish. As a standard action, make a Bluff check opposed by Sense Motive or Bluff. If successful, the target is tricked into taking an action that leaves him vulnerable (losing his dodge bonus until the end of his next turn, or granting you a +2 bonus on an action against him).</li><li><strong>Passing Hidden Messages (Innuendo):</strong> You can pass a hidden message through simple speech and gestures. The DC to pass a simple message is 15; a complex message is DC 20. The recipient must make a Sense Motive check against your Bluff check result to understand it.</li><li><strong>Creating a Diversion to Hide:</strong> A successful Bluff check can give you the momentary diversion needed to make a Stealth check while people are aware of you.</li></ul><p><strong>Try Again:</strong> Generally no. If a bluff fails, the target is suspicious and further bluffs are at a –10 penalty or fail automatically.</p><p><strong>Action:</strong> A bluff takes at least 1 round (and often much longer). In combat, feinting or tricking is a standard action.</p>"
  },
  {
    "name": "Climb",
    "ability": "STR",
    "untrained": true,
    "action": "Move or Full-Round",
    "specializations": [],
    "relatedFeats": [],
    "fullText": "<p>You can scale slopes, cliffs, walls, and other vertical inclines.</p><p><strong>Check:</strong> A successful Climb check allows you to advance up, down, or across a slope, wall, or other steep incline. A slope is an incline of less than 60 degrees; a wall is an incline of 60 degrees or more. A failed check means you make no progress. A check that fails by 5 or more means you fall from whatever height you’ve reached.</p><ul><li>Slope with handholds or rough surface: DC 0</li><li>Steep slope with handholds, or knotted rope with a wall to brace against: DC 5</li><li>Rough surface with handholds (brick wall, rough stone wall): DC 10</li><li>Surface with few handholds (smooth rock, scaffolding): DC 15</li><li>Fairly smooth surface with small handholds: DC 20</li><li>Smooth vertical wall: DC 25</li><li>Overhang or ceiling with handholds: DC 30</li></ul><ul><li><strong>Fighting While Climbing:</strong> Since you can’t easily move to avoid an attack, you lose your dodge bonus while climbing. Any time you take damage while climbing, make an immediate Climb check against the DC of the slope or wall. Failure means you fall and sustain the appropriate falling damage.</li><li><strong>Accelerated Movement:</strong> You can try to climb faster than normal. You can move your full speed, but take a –5 penalty on your Climb check. Moving twice your speed requires two checks at –5, one for each move action.</li><li><strong>Catching Yourself:</strong> If you fall, you can make a Climb check (DC = wall's DC + 20) to catch yourself on a ledge or handhold.</li></ul><p><strong>Action:</strong> Climbing one-half your speed is a full-round action. Moving half that fast (one-fourth your speed) is a move action. Accelerated climbing, allowing you to climb at full speed, is a full-round action.</p><p><strong>Special:</strong> At the GM’s discretion, certain kinds of climbing attempts might require tools like ropes, pitons, harness, and so forth. Attempting such a climb without tools incurs a –4 penalty.</p>"
  },
  {
    "name": "Computers",
    "ability": "INT",
    "untrained": false,
    "action": "Full-Round or Extended",
    "specializations": [],
    "relatedFeats": [
      "Inventor",
      "Online Research"
    ],
    "fullText": "<p>You’re trained in the operation of computers and modifying or creating software.</p><p><strong>Check:</strong> Most normal computer operations—using software, getting your e-mail—don’t require a Computers check and can be done untrained. However, searching an unfamiliar network for a particular file, writing programs, altering existing programs to perform differently, and breaking computer security all require skill checks (and training).</p><ul><li><strong>Find File:</strong> The DC and time required to locate a particular file on an unfamiliar computer system are determined by the size of the site:<br>• Personal computer: DC 10 (1 round)<br>• Small office network: DC 15 (2 rounds)<br>• Large office network: DC 20 (1 minute)<br>• Massive network: DC 25 (10 minutes)</li><li><strong>Defeat Computer Security:</strong> The DC is determined by the quality of security installed:<br>• Minimum: DC 20<br>• Average: DC 25<br>• Exceptional: DC 35<br>• Maximum: DC 40<br>If the check fails by 5 or more, the system immediately alerts its administrator. If you beat the DC by 10 or more, you automatically succeed at all subsequent security checks at that site until the end of your session.</li><li><strong>Defend Security:</strong> If the site alerts you to an intruder, you can make an opposed Computers check to cut off the intruder's access (1 full round) or identify the intruder's operating site (1 minute).</li><li><strong>Degrade Programming:</strong> You can crash a computer (DC 10, 1 min), destroy programming (DC 15, 10 min), or damage programming (DC 20, 10 min; imposes –4 penalty on all checks made with computer). Each additional computer adds +2 to the DC.</li><li><strong>Write Program:</strong> Create a program to assist with a specific task (+2 bonus to the task). DC 20, time required is 1 hour.</li><li><strong>Operate Remote Device:</strong> Shut down passive remote (cameras, door locks: DC 20, 1 round/remote), active remote (motion detectors, alarms: DC 25, 1 round/remote), reset parameters (DC 30, 1 min/remote), change passcodes (DC 25, 1 min), hide evidence of alteration (+10 DC, 1 min).</li></ul><p><strong>Action:</strong> Computers requires at least a full-round action. The GM may determine some tasks require several rounds, a few minutes, or longer.</p><p><strong>Special:</strong> You can take 10 when using Computers. You can take 20 in some cases, but not those involving a penalty for failure (such as defeating or defending security).</p>"
  },
  {
    "name": "Concentration",
    "ability": "WIS",
    "untrained": true,
    "action": "Reaction or Free",
    "specializations": [],
    "relatedFeats": [
      "Trance"
    ],
    "fullText": "<p>You can focus your mind and concentrate despite difficult conditions, including taking damage.</p><p><strong>Check:</strong> Make a Concentration check whenever you might be distracted (by taking damage, by harsh weather, and so on) while engaged in some action requiring your full attention, or maintaining powers with a Concentration or Sustained duration. If the check succeeds, you may continue with the action. If the check fails, the action fails. The DC depends on the distraction:</p><ul><li>Damaged during the action: DC 10 + damage bonus</li><li>Taking continuous damage during the action: DC 10 + half of continuous damage bonus last dealt</li><li>Maintain a Concentration power as a move action: DC 10 + power rank</li><li>Maintain a Sustained power as a reaction: DC 10 + power rank</li><li>Vigorous motion (bouncy vehicle ride, riding a horse): DC 10</li><li>Violent motion (very rough vehicle ride, galloping horse, boat in rapids): DC 15</li><li>Extraordinarily violent motion (earthquake): DC 20</li><li>Entangled (such as by a snare): DC 15</li><li>Bound, grappling, or pinned: DC 20</li><li>Weather is a high wind carrying blinding rain or sleet: DC 5</li><li>Weather is wind-driven hail, dust, or debris: DC 10</li></ul><p><strong>Try Again:</strong> Yes, although a success doesn’t cancel the effects of a previous failure.</p><p><strong>Action:</strong> Making a Concentration check doesn’t require an action; it is either a reaction (when attempted in response to a distraction) or a free action (when attempted actively).</p>"
  },
  {
    "name": "Craft",
    "ability": "INT",
    "untrained": false,
    "action": "Extended",
    "specializations": [
      "Artistic",
      "Chemical",
      "Electronic",
      "Mechanical",
      "Structural"
    ],
    "relatedFeats": [
      "Artificer",
      "Improvised Tools",
      "Inventor"
    ],
    "fullText": "<p>Craft covers a number of skills for making things. The different Craft specialties are: Artistic, Chemical, Electronic, Mechanical, and Structural.</p><p><strong>Check:</strong> Craft skills are specifically focused on making things. To use Craft effectively, you must have an appropriate set of tools.</p><ul><li><strong>Making Items:</strong> The difficulty and time required depend on complexity:<br>• Simple (timer, detonator, tripwire, bookcase): DC 15, 1 hour<br>• Moderate (radio direction finder, lock, engine component, shed): DC 20, 12 hours<br>• Complex (cell phone, combustion engine, bunker): DC 25, 24 hours<br>• Advanced (computer, jet engine, building): DC 30, 60 hours</li><li><strong>Repairing Items:</strong> Simple repair (tool, simple weapon: DC 10, 1 min); Moderate (mechanical/electronic component: DC 15, 10 min); Complex (device: DC 20, 1 hr); Advanced (cutting-edge device: DC 25, 10 hr).</li><li><strong>Jury-Rigging:</strong> Attempt temporary repairs at –5 to DC as a full-round action. Lasts until the end of the encounter. Also used to hot-wire a car or jump-start an engine (DC 15+).</li><li><strong>Demolitions:</strong> Craft (chemical) to make explosives. Connecting a detonator requires Craft (mechanical) DC 10. Placing an explosive against a fixed structure with Craft (structural) deals +5 damage on DC 15+, +10 damage on DC 25+. Disarming explosives requires Craft (mechanical) or Disable Device (DC 10 or set DC; failing by 5+ detonates it).</li><li><strong>Forgery:</strong> Produce forgeries of any item you can normally make. The check result becomes the DC for a Notice check to detect the forgery.</li><li><strong>Inventing:</strong> If you have the Inventor feat, you can use Craft to build inventions (temporary devices).</li></ul><p><strong>Action:</strong> The time varies with complexity. You can cut the time for making or repairing an item in half by taking a –5 penalty.</p><p><strong>Special:</strong> You can take 10 when using Craft, but can’t take 20 when making items (you use up raw materials). You can take 10 or 20 on repair checks. Lacking proper tools incurs a –4 penalty.</p>"
  },
  {
    "name": "Diplomacy",
    "ability": "CHA",
    "untrained": true,
    "action": "Full-Round or Extended",
    "specializations": [],
    "relatedFeats": [
      "Attractive",
      "Connected",
      "Fascinate"
    ],
    "fullText": "<p>You’re skilled in dealing with people, from etiquette and social graces to a way with words and public speaking. Use this skill to make a good impression, negotiate, and win people over.</p><p><strong>Check:</strong> You can change others’ attitudes with a successful Diplomacy check. In negotiations, all participants roll Diplomacy checks to see who gains the advantage. Opposed checks also resolve cases where two advocates plead opposing cases before a third party.</p><ul><li><strong>Attitude Adjustments:</strong><br>• Hostile to Unfriendly: DC 20 | to Indifferent: DC 25 | to Friendly: DC 35 | to Helpful: DC 45 | to Fanatic: DC 150<br>• Unfriendly to Indifferent: DC 15 | to Friendly: DC 25 | to Helpful: DC 35 | to Fanatic: DC 120<br>• Indifferent to Friendly: DC 15 | to Helpful: DC 25 | to Fanatic: DC 90<br>• Friendly to Helpful: DC 15 | to Fanatic: DC 60<br>• Helpful to Fanatic: DC 50</li><li><strong>Fanatic NPCs:</strong> A fanatical NPC is willing to do anything the character wants (fighting to the death under overwhelming odds). Lasts 1 day + 1 day per Cha bonus. Fanatics cannot have attitudes adjusted by interaction skills and have +20 to resist Intimidate.</li></ul><p><strong>Try Again:</strong> Generally no. If the initial check fails, the other character has probably become more firmly committed to his position, and trying again is futile unless the situation changes.</p><p><strong>Action:</strong> Diplomacy is at least a full-round action. Negotiations may require much longer.</p>"
  },
  {
    "name": "Disable Device",
    "ability": "INT",
    "untrained": false,
    "action": "Full-Round or Extended",
    "specializations": [],
    "relatedFeats": [
      "Improvised Tools"
    ],
    "fullText": "<p>You can disarm or sabotage various devices, both mechanical and electronic.</p><p><strong>Check:</strong> The GM makes Disable Device checks secretly so you don’t necessarily know if you have succeeded.</p><ul><li><strong>Open Lock:</strong> Pick conventional locks, combination locks, or bypass electronic locks (requires lockpick set or electronics tool kit):<br>• Cheap (briefcase lock): DC 20<br>• Average (home deadbolt): DC 25<br>• High quality (business deadbolt): DC 30<br>• High security (branch bank vault): DC 40<br>• Ultra-high security (bank headquarters vault): DC 50</li><li><strong>Disable Security Device:</strong> Disarm electric fences, motion sensors, cameras. Cheap: DC 20; Average: DC 25; High quality: DC 30; High security: DC 35; Ultra-high security: DC 40. Preventing tampering from being noticed takes 10 minutes and adds +10 to the DC.</li><li><strong>Traps and Sabotage:</strong> Disabling a simple mechanical device is DC 10; intricate devices have higher DCs. Defusing explosives is DC 10 or set DC. If the check fails by 4 or less, you can try again. If you fail by 5 or more, you set off the trap/explosive or sabotage fails secretly.</li><li><strong>Disable Technology:</strong> At the GM’s discretion, you can disable technological devices or helpless technological creatures (robots/androids) with a DC 30 check.</li></ul><p><strong>Action:</strong> Disabling a simple device is a full-round action. Intricate or complex devices require multiple rounds. Reducing a multi-round task to one round increases the DC by +20.</p><p><strong>Special:</strong> You can take 10. You can take 20 to open a lock or disable a security device unless trying to prevent tampering from being noticed. Lacking tools incurs a –4 penalty.</p>"
  },
  {
    "name": "Disguise",
    "ability": "CHA",
    "untrained": true,
    "action": "Extended (10 min)",
    "specializations": [],
    "relatedFeats": [
      "Quick Change"
    ],
    "fullText": "<p>You can use makeup, costumes, and other props to change your appearance.</p><p><strong>Check:</strong> Your check result determines the effectiveness of the disguise. It is opposed by others’ Notice check results. The GM makes the Disguise check secretly so you are not sure how well your disguise will hold up under scrutiny.</p><ul><li><strong>Modifiers:</strong><br>• Minor details only: +5 bonus<br>• Appropriate uniform or costume: +2 bonus<br>• Disguised as different sex: –2 penalty<br>• Disguised as a different race: –2 penalty<br>• Disguised as different age category: –2 penalty</li><li><strong>Impersonating an Individual:</strong> Those who know the subject get an automatic Notice check with a familiarity bonus: Recognizes on sight (+4), Friend or associate (+6), Close friend (+8), Intimate (+10).</li><li>Acting like who you appear to be may require a Bluff or Perform (acting) check opposed by the observer’s Sense Motive check.</li></ul><p><strong>Try Again:</strong> No, though you can assume the same disguise again at a later time (with suspicion if previously spotted).</p><p><strong>Action:</strong> A Disguise check requires at least 10 minutes of preparation.</p><p><strong>Special:</strong> You can take 10 or 20 when assuming a disguise. Lacking a disguise kit incurs a –4 penalty.</p>"
  },
  {
    "name": "Drive",
    "ability": "DEX",
    "untrained": false,
    "action": "Move",
    "specializations": [],
    "relatedFeats": [],
    "fullText": "<p>Use this skill to operate any ground or water vehicle.</p><p><strong>Check:</strong> Routine tasks, such as ordinary movement, don’t require a skill check and may be done untrained. Make a check only when some unusual circumstance exists or when driving in a dramatic situation (being chased, attacked, or trying to reach a destination in a limited time):</p><ul><li>Easy (low-speed turn): DC 5</li><li>Average (sudden reverse, dodging obstacles): DC 10</li><li>Difficult (tight turns): DC 15</li><li>Challenging (bootlegger reverse): DC 20</li><li>Formidable (high-speed maneuvers, jumping obstacles): DC 25</li></ul><p><strong>Try Again:</strong> Most Drive checks have consequences for failure that make trying again impossible.</p><p><strong>Action:</strong> A Drive check is a move action.</p><p><strong>Special:</strong> At the Gamemaster’s option, Drive may require specialization, such as ground vehicles or water vehicles.</p>"
  },
  {
    "name": "Escape Artist",
    "ability": "DEX",
    "untrained": true,
    "action": "Standard or 1 min",
    "specializations": [],
    "relatedFeats": [],
    "fullText": "<p>You’re trained in escaping bonds and other restraints.</p><p><strong>Check:</strong> Make a check to escape from restraints or to squeeze through a tight space:</p><ul><li>Ropes: Opponent’s Dex bonus + 20</li><li>Snare: Snare’s rank + 20</li><li>Tight space: DC 30</li><li>Grapple: Opponent’s grapple check</li></ul><ul><li><strong>Tight Spaces:</strong> A check is only called for if your head fits but your shoulders don’t. If the space is longer than your height (such as an airshaft), the GM may call for multiple checks. You can also reach through a tight space your hand fits through by making an Escape Artist check.</li><li><strong>Escaping Grapples:</strong> Opposed check against opponent’s grapple check as a standard action. If you escape being pinned, you are still grappled. If you escape the grapple, you can move in the same round.</li></ul><p><strong>Try Again:</strong> Yes.</p><p><strong>Action:</strong> Escaping ropes/restraints takes 1 minute. Escaping a grapple is a standard action. Escaping a snare is a full-round action. Squeezing through tight spaces takes at least 1 minute.</p><p><strong>Special:</strong> You can take 10. You can take 20 if not actively opposed.</p>"
  },
  {
    "name": "Gather Information",
    "ability": "CHA",
    "untrained": true,
    "action": "Extended (1 hr+)",
    "specializations": [],
    "relatedFeats": [
      "Contacts",
      "Well-Informed"
    ],
    "fullText": "<p>You know how to make contacts, collect gossip and rumors, question informants, and otherwise get information from people.</p><p><strong>Check:</strong> By succeeding at a skill check (DC 10) you get a feel for the major news and rumors in an area:</p><ul><li>General information: DC 10 (local happenings, rumors, gossip)</li><li>Specific information: DC 15 (relates to a particular question)</li><li>Restricted information: DC 20 (not generally known, requires locating someone with access)</li><li>Protected information: DC 25 (difficult to come by, involves danger)</li></ul><p>Inquiries regarding restricted or protected information may be noticed. Accepting a –20 penalty on your check avoids any notice.</p><ul><li><strong>Finding People:</strong> Track down someone in a community with repeated checks:<br>• Village: DC 5 (1 check)<br>• Town: DC 10 (2 checks)<br>• City: DC 15 (3 checks)<br>• Metropolis: DC 20 (4 checks)<br>Every 5 points exceeding the DC reduces the required checks by 1 (minimum 1). Subjects keeping a low profile add their Knowledge (streetwise) or Stealth bonus to the DC.</li></ul><p><strong>Try Again:</strong> Yes, but takes additional time and may draw unwanted attention.</p><p><strong>Action:</strong> A Gather Information check takes at least an hour, possibly several. You can cut the time in half by taking a –5 penalty.</p><p><strong>Special:</strong> You can take 10, but cannot take 20.</p>"
  },
  {
    "name": "Handle Animal",
    "ability": "CHA",
    "untrained": true,
    "action": "Move or Full-Round",
    "specializations": [],
    "relatedFeats": [
      "Animal Empathy",
      "Minion"
    ],
    "fullText": "<p>You know how to handle, care for, and train various types of animals.</p><p><strong>Check:</strong> The time required and DC depend on what you are trying to do:</p><ul><li><strong>Handle an animal:</strong> Move action, DC 10. Command an animal to perform a trick it knows (+5 DC if animal is injured/distressed).</li><li><strong>Push an animal:</strong> Full-round action, DC 25. Get an animal to perform a trick it doesn't know, but is capable of doing.</li><li><strong>Teach an animal a trick:</strong> 1 week of work, DC 15 (simple) or DC 20+ (complex). An animal with Int 1 can learn 3 tricks; Int 2 can learn 6 tricks.</li><li><strong>Train an animal for a purpose:</strong> 4 weeks, DC 20. Trains animal for a general purpose (combat, guarding, riding, etc.).</li></ul><p><strong>Special:</strong> Untrained characters can handle and push animals using Charisma checks, but cannot teach or train them. Animal minions know maximum tricks automatically.</p>"
  },
  {
    "name": "Intimidate",
    "ability": "CHA",
    "untrained": true,
    "action": "Full-Round or Standard",
    "specializations": [],
    "relatedFeats": [
      "Distract",
      "Fearsome Presence",
      "Startle"
    ],
    "fullText": "<p>You know how to use threats (real or implied) to get others to cooperate.</p><p><strong>Check:</strong> Make an Intimidate check, opposed by the target’s Intimidate or Sense Motive check or Will saving throw (whichever has the highest bonus). If your check succeeds, you may treat the target as friendly, but only for actions taken in your presence. The target cooperates, but won’t necessarily obey your every command or do anything that would directly endanger him. If your check fails by 5 or more, the target may do the opposite of what you want.</p><ul><li><strong>Demoralizing in Combat:</strong> Standard action. If successful, your target is shaken (–2 on all attack rolls, saving throws, and checks) for one round. You can demoralize as a move action by taking a –5 penalty on your check. Each time you demoralize an opponent, he gains a +1 bonus to resist additional attempts in that encounter.</li><li><strong>Interrogation:</strong> Use Intimidate to force people to disclose information.</li><li><strong>Intimidating Groups:</strong> Intimidate a group with a single check. Each member rolls separately. (Cannot demoralize a group).</li><li><strong>Modifiers:</strong> +2 bonus if imposing; –2 penalty if target has superior position. Fanatics get +20 to resist. Size modifier adds +2 per size category larger than target, or –2 per size category smaller.</li></ul><p><strong>Try Again:</strong> No. If the initial check fails, trying again is futile.</p><p><strong>Action:</strong> Full-round action out of combat; standard action to demoralize in combat.</p>"
  },
  {
    "name": "Investigate",
    "ability": "INT",
    "untrained": false,
    "action": "Full-Round or 1 min",
    "specializations": [],
    "relatedFeats": [
      "Track"
    ],
    "fullText": "<p>You know how to prepare evidence for analysis and study clues.</p><p><strong>Check:</strong> You generally use Search to find clues and Investigate to analyze them. If you have access to a crime lab, use Investigate to collect and prepare samples for the lab.</p><ul><li><strong>Analyze Clue:</strong> Apply forensic knowledge to a clue (does not create clues where none exist). Base DC is 15:<br>• Every day since event (max +10): +2 DC<br>• Scene is outdoors: +5 DC<br>• Scene slightly disturbed: +2 DC<br>• Scene moderately disturbed: +4 DC<br>• Scene extremely disturbed: +6 DC</li><li><strong>Collect Evidence:</strong> Requires an evidence kit. DC 15 check. Success means evidence is usable by a crime lab. Failure imposes a –5 penalty on lab analysis; failure by 5+ means analysis cannot be done. Exceeding DC by 10+ grants lab a +2 bonus on analysis checks.</li></ul><p><strong>Try Again:</strong> Analyzing a clue again doesn’t add new insight unless another clue is introduced. Evidence cannot be recollected unless more exists.</p><p><strong>Action:</strong> Analyzing a clue is a full-round action. Collecting evidence takes at least 1 minute.</p>"
  },
  {
    "name": "Knowledge",
    "ability": "INT",
    "untrained": false,
    "action": "Reaction or Full-Round",
    "specializations": [
      "Arcane Lore",
      "Art",
      "Behavioral Sciences",
      "Business",
      "Civics",
      "Current Events",
      "Earth Sciences",
      "History",
      "Life Sciences",
      "Physical Sciences",
      "Popular Culture",
      "Streetwise",
      "Tactics",
      "Technology",
      "Theology and Philosophy"
    ],
    "relatedFeats": [
      "Eidetic Memory",
      "Jack-of-all-Trades",
      "Well-Informed"
    ],
    "fullText": "<p>This skill encompasses several specialties, each treated as a separate skill. Topics include:</p><ul><li><strong>Arcane Lore:</strong> The occult, magic, supernatural, astrology, numerology.</li><li><strong>Art:</strong> Fine arts, graphic arts, art history, antiques, photography, dance, music.</li><li><strong>Behavioral Sciences:</strong> Psychology, sociology, and criminology.</li><li><strong>Business:</strong> Business procedures, investment strategies, corporate structures.</li><li><strong>Civics:</strong> Law, legislation, litigation, legal rights, government institutions.</li><li><strong>Current Events:</strong> Recent happenings in news, sports, politics, foreign affairs.</li><li><strong>Earth Sciences:</strong> Geology, geography, oceanography, paleontology.</li><li><strong>History:</strong> Past events, personalities, cultures, archaeology.</li><li><strong>Life Sciences:</strong> Biology, botany, genetics, medicine, forensics.</li><li><strong>Physical Sciences:</strong> Astronomy, chemistry, mathematics, physics, engineering.</li><li><strong>Popular Culture:</strong> Music, genre films, urban legends, comics, sci-fi, trivia.</li><li><strong>Streetwise:</strong> Street and urban culture, underworld personalities and events.</li><li><strong>Tactics:</strong> Techniques and strategies for maneuvering forces in combat.</li><li><strong>Technology:</strong> Cutting-edge devices, identifying technology.</li><li><strong>Theology and Philosophy:</strong> Ethics, philosophical concepts, religious faith.</li></ul><p><strong>Check:</strong> DC 10 for easy questions, 15 for basic questions, 20 to 30 for difficult questions. Untrained checks can only answer easy or basic questions.</p><p><strong>Action:</strong> Reaction (for spontaneous recall) or full-round action. Taking 20 requires at least 1 hour with research materials.</p>"
  },
  {
    "name": "Language",
    "ability": "None",
    "untrained": false,
    "action": "None",
    "specializations": [],
    "relatedFeats": [],
    "fullText": "<p>Languages are unusual skills. They are not based on an ability score and do not require checks. Instead, your rank in Language measures how many languages you can speak, read, and write.</p><p>Unskilled characters can speak, read, and write their native language. For each rank in Language, you are fluent in an additional language.</p><ul><li><strong>Literacy:</strong> Characters are assumed to be literate in their native language and any other language they know. At the GM’s discretion, characters may have to spend an additional rank to be literate in a language with an entirely different alphabet or writing style (such as Japanese kanji or Greek for an English speaker). Completely illiterate characters have a drawback.</li></ul>"
  },
  {
    "name": "Medicine",
    "ability": "WIS",
    "untrained": false,
    "action": "Standard, Full-Round, or Extended",
    "specializations": [],
    "relatedFeats": [],
    "fullText": "<p>You’re trained in treating injuries and illness.</p><p><strong>Check:</strong> The DC and effect depend on the task:</p><ul><li><strong>Diagnosis (DC 10):</strong> Diagnose injuries and ailments. A successful diagnosis provides a +2 bonus on Medicine checks for treatment.</li><li><strong>Provide Care (DC 15):</strong> Treat a wounded person for a day or more. If successful, the patient adds your Medicine rank to any recovery checks. You can tend up to your skill rank in patients at one time.</li><li><strong>Revive (DC 15):</strong> Remove dazed, stunned, or unconscious conditions from a character (full-round action). A successful check removes one condition. You cannot revive a dying character without stabilizing him first.</li><li><strong>Stabilize (DC 15):</strong> Standard action. A successful Medicine check stabilizes a dying character.</li><li><strong>Treat Disease (DC 15):</strong> Every time the diseased character makes a saving throw against disease effects, make a Medicine check (10 minutes). Success adds your Medicine rank to the saving throw.</li><li><strong>Treat Poison (DC 15):</strong> Standard action when a poisoned character saves against secondary effects. Success adds your Medicine rank to the saving throw.</li><li><strong>Surgery (DC 15–30):</strong> Perform surgical operations. DC 15 for routine procedures, up to DC 30+ for delicate heart or brain surgery.</li></ul><p><strong>Try Again:</strong> Yes for reviving and stabilizing. No for all other uses.</p><p><strong>Special:</strong> You can take 10. You can take 20 only when giving long-term care or reviving. Lacking medical equipment incurs a –4 penalty. Treating yourself incurs a –5 penalty (and is limited to diagnosis, care, or disease/poison).</p>"
  },
  {
    "name": "Notice",
    "ability": "WIS",
    "untrained": true,
    "action": "Reaction or Move",
    "specializations": [],
    "relatedFeats": [
      "Assessment",
      "Uncanny Dodge"
    ],
    "fullText": "<p>Use this skill to notice things.</p><p><strong>Check:</strong> Make a skill check to notice something. Notice checks generally suffer a penalty of –1 per 10 feet between you and the thing you’re trying to notice. If you’re distracted, you take a –5 penalty on Notice checks. Making out details—such as clearly hearing conversation or reading text—requires you to exceed the DC by 10 or more. The GM may make Notice checks secretly so you don’t know whether there was nothing to notice or you just failed to notice it. The most common sorts of Notice checks are:</p><ul><li><strong>Listen (auditory):</strong> Make a check against a DC based on how loud the noise is or against an opposed Stealth check. A normal conversation is DC 0, a quiet noise DC 10. Listening through a door is +5 DC, +15 for a solid wall. While you’re asleep, hearing something well enough to wake up is +10 DC.</li><li><strong>Spot (visual):</strong> Make a check against a DC based on how visible the object is or against an opposed Stealth check. Spot is also used to detect someone in disguise, or to notice a concealed object.</li><li><strong>Other Senses:</strong> You can make Notice checks involving other sense types as well as various special senses. Noticing something obvious to a sense is DC 0. Less obvious things are DC 10 or so, hidden things DC 20 or more, and making out details requires you to exceed the DC by 10 or more.</li></ul><p><strong>Try Again:</strong> You can make a Notice check every time you have the opportunity to notice something new. As a move action, you can attempt to notice something you failed (or believe you failed) to notice previously.</p><p><strong>Action:</strong> A Notice check is either a reaction (if called for by the GM) or a move action (if you take the time to try and notice something).</p><p><strong>Special:</strong> When several characters try to notice the same thing, the GM can make a single d20 roll and use it for all the characters’ skill checks. Various sensory effects provide modifiers on Notice checks. Taking 20 on a Notice check means you spend 1 minute attempting to notice something that may or may not be there.</p>"
  },
  {
    "name": "Perform",
    "ability": "CHA",
    "untrained": false,
    "action": "Extended",
    "specializations": [
      "Acting",
      "Comedy",
      "Dance",
      "Keyboards",
      "Oratory",
      "Percussion Instruments",
      "Singing",
      "Stringed Instruments",
      "Wind Instruments"
    ],
    "relatedFeats": [
      "Fascinate"
    ],
    "fullText": "<p>This skill encompasses several types of performance, each treated as a separate skill. The Perform specialties are: Acting, Comedy, Dance, Keyboards, Oratory, Percussion Instruments, Singing, Stringed Instruments, and Wind Instruments.</p><p><strong>Check:</strong> The quality of your performance depends on your check result:</p><table><thead><tr><th>Check Result</th><th>Performance</th></tr></thead><tbody><tr><td>10</td><td>Amateur performance. Audience appreciates your performance, but isn’t impressed.</td></tr><tr><td>15</td><td>Routine performance. Audience enjoys your performance, but it isn’t exceptional.</td></tr><tr><td>20</td><td>Great performance. Audience impressed.</td></tr><tr><td>25</td><td>Memorable performance. Audience enthusiastic.</td></tr><tr><td>30</td><td>Masterful performance. Audience awed.</td></tr></tbody></table><p><strong>Try Again:</strong> Not for the same performance and audience.</p><p><strong>Action:</strong> A Perform check usually requires at least several minutes to an hour or more.</p><p><strong>Special:</strong> You can take 10 when making a Perform check, but can’t take 20. Perform skills requiring musical instruments are manipulation skills. If you don’t have an appropriate instrument you automatically fail any Perform check requiring it. At the GM’s discretion, impromptu instruments may be employed, but you take a –4 penalty on the check.</p>"
  },
  {
    "name": "Pilot",
    "ability": "DEX",
    "untrained": false,
    "action": "Move",
    "specializations": [],
    "relatedFeats": [],
    "fullText": "<p>Use this skill to pilot any vehicle that travels through the air or space, such as planes, helicopters, or spacecraft.</p><p><strong>Check:</strong> Routine tasks, such as ordinary movement, don’t require a skill check. Make a check only when piloting in a dramatic situation (being chased or attacked, for example, or trying to reach a destination in time). While piloting, you can attempt simple maneuvers or stunts.</p><table><thead><tr><th>Maneuver</th><th>DC</th></tr></thead><tbody><tr><td>Easy (low-speed turn)</td><td>5</td></tr><tr><td>Average (sudden reverse, dodging obstacles)</td><td>10</td></tr><tr><td>Difficult (tight turns)</td><td>15</td></tr><tr><td>Challenging (loop, barrel roll)</td><td>20</td></tr><tr><td>Formidable (high-speed maneuvers, dodging obstacles)</td><td>25</td></tr></tbody></table><p><strong>Try Again:</strong> Most Pilot checks have consequences for failure that make trying again impossible.</p><p><strong>Action:</strong> A Pilot check is a move action.</p><p><strong>Special:</strong> At the Gamemaster’s option, Pilot may be further broken down into more detailed categories requiring specialization, such as airplanes, jet-planes, helicopters, starfighters, space transports, or space cruisers.</p>"
  },
  {
    "name": "Profession",
    "ability": "WIS",
    "untrained": false,
    "action": "Extended",
    "specializations": [],
    "relatedFeats": [
      "Connected"
    ],
    "fullText": "<p>You’re trained in a profession such as accountant, doctor, engineer, game designer, lawyer, police officer, reporter, teacher, writer, and so forth. Like Craft, Profession is actually a number of specialties. You can have multiple Profession skills; each acquired as a separate skill.</p><p>While a Craft skill represents skill in making things, a Profession skill represents training in a job requiring a broader range of less specific knowledge. Generally speaking, if an occupation is a service industry, it’s a Profession skill. If it’s in the manufacturing sector, it’s a Craft skill.</p><p><strong>Check:</strong> You can practice a profession and make a living at it. You know how to use the tools of the trade, perform the profession’s daily tasks, supervise untrained helpers, and handle common problems. For example, a sailor knows how to tie basic knots, tend and repair sails, and stand a deck watch at sea. The GM sets DCs for job-related tasks.</p><p><strong>Action:</strong> A Profession check usually requires a minute or more, depending on the task.</p><p><strong>Special:</strong> Every 5 full points of bonus in Profession give you a +1 bonus to Wealth.</p>"
  },
  {
    "name": "Ride",
    "ability": "DEX",
    "untrained": false,
    "action": "Move",
    "specializations": [],
    "relatedFeats": [
      "Animal Empathy"
    ],
    "fullText": "<p>Use this skill to ride a mount, such as a horse or more exotic creatures like dolphins, griffins, or even dragons.</p><p><strong>Check:</strong> Routine tasks, such as ordinary movement, don’t require a skill check. Make a check only when riding in a dramatic situation (being chased or attacked, for example, or trying to reach a destination in time). While riding, you can attempt simple maneuvers or stunts.</p><p>Easy riding maneuvers, like staying in the saddle in a fight or guiding a mount with your knees, are DC 5. An average maneuver, like a full gallop or dodging around an obstacle, is DC 10. Difficult maneuvers, like using your mount as cover, jumping, or suffering no harm in a fall, are DC 15. Challenging maneuvers, like a fast mount or dismount (as a free action) or controlling a panicking mount, are DC 20 or more.</p><p><strong>Try Again:</strong> Most Ride checks have consequences for failure that make trying again impossible.</p><p><strong>Action:</strong> A Ride check is a move action.</p><p><strong>Special:</strong> At the Gamemaster’s option, Ride may be further broken down into more detailed categories requiring specialization, such as running, swimming, and flying mounts, or even by specific mount type (horse, camel, dolphin, giant eagle, etc.).</p>"
  },
  {
    "name": "Search",
    "ability": "INT",
    "untrained": true,
    "action": "Full-Round",
    "specializations": [],
    "relatedFeats": [
      "Well-Informed"
    ],
    "fullText": "<p>You can search an area for clues, hidden items, traps, and other details. Notice allows you to immediately notice things, Search allows you to pick up on details with some effort. Search works in conjunction with all accurate senses. Sight is the only accurate sense for normal humans.</p><p><strong>Check:</strong> You must be within 10 feet (one Notice range increment) of the area. You can examine a 5-foot-by-5-foot area or a volume of goods 5 feet on a side with a single check. A Search check can turn up things like footprints, but does not allow you to follow tracks.</p><table><thead><tr><th>Task</th><th>DC</th></tr></thead><tbody><tr><td>Ransack an area to find a certain object.</td><td>10</td></tr><tr><td>Notice a secret compartment, a simple trap, or an obscure clue.</td><td>20</td></tr><tr><td>Find a well-hidden secret compartment or trap, or an extremely obscure clue.</td><td>25+</td></tr></tbody></table><ul><li><strong>Finding Concealed Objects:</strong> The DC for a Search check to find a concealed object is usually based on the Stealth or Sleight of Hand check of the character who hid it. The GM can assume characters with the time take 20 on their check to conceal an object.</li><li><strong>Surveillance:</strong> You can use Search to set up surveillance of a particular area, watching from a stationary location. The DC of the subject’s Stealth check to evade your notice is equal to the result of your Search check.</li><li><strong>Extended Searches:</strong> Certain powers—notably ESP, Quickness, Super-Senses, and Super-Speed—greatly extend the area you can search at once. Determine the area’s approximate diameter. For each step up the Extended Range Table (starting at 10 feet for twice the normal Search area), move the time required to search the area one step up the Time and Value Progression Table (starting at one minute). You can reduce the time by increasing the DC (+5 DC per step down the table, min. full round). Taking 20 requires 20 times the base time and cannot be speeded up.</li></ul><p><strong>Action:</strong> A Search check is a full-round action.</p>"
  },
  {
    "name": "Sense Motive",
    "ability": "WIS",
    "untrained": true,
    "action": "Reaction or 1 Minute",
    "specializations": [],
    "relatedFeats": [
      "Assessment"
    ],
    "fullText": "<p>You can tell someone’s true intentions by paying attention to body language, inflection, and intuition.</p><p><strong>Check:</strong> A successful Sense Motive check allows you to avoid the effects of some interaction skills. You can also use the skill to tell when someone is behaving oddly or to assess their trustworthiness.</p><ul><li><strong>Evaluate:</strong> You can use this skill to make an assessment of a social situation. With a successful check (DC 20), you can get a feeling when something is wrong. You can also tell if someone is trustworthy and honorable (or not) with an opposed Sense Motive and Bluff check.</li><li><strong>Notice Influence:</strong> You can make a Sense Motive check to notice someone acting under the influence of a mental power. The DC is 10 + the power’s rank.</li><li><strong>Notice Innuendo:</strong> You can use Sense Motive to detect a hidden message transmitted via the Bluff skill (DC equal to the Bluff check result). If your check result beats the DC, you understand the secret message. If your check fails by 5 or more, you misinterpret the message in some fashion. If you are not the intended recipient of the message, your DC increases by 5.</li><li><strong>Resist Interaction:</strong> Make a Sense Motive check to resist or ignore the effects of certain interaction skills, such as Bluff or Intimidate. If the result of your check exceeds your opponent’s check result, you are unaffected.</li></ul><p><strong>Try Again:</strong> No, though you can make a Sense Motive check for each interaction attempt against you.</p><p><strong>Action:</strong> A Sense Motive check may be made as a reaction to notice or resist something. Using Sense Motive to evaluate a person or situation takes at least 1 minute.</p>"
  },
  {
    "name": "Sleight of Hand",
    "ability": "DEX",
    "untrained": false,
    "action": "Standard",
    "specializations": [],
    "relatedFeats": [],
    "fullText": "<p>You can perform feats of legerdemain such as picking pockets, palming small objects (making them seem to disappear), and so forth.</p><p><strong>Check:</strong> A check against DC 10 lets you palm a coin-sized object. Minor feats of sleight of hand, such as making a coin disappear, also have a DC of 10 unless an observer is concentrating on noticing what you are doing. When you perform this skill under close observation, your check is opposed by the observer’s Notice check. The observer’s check doesn’t prevent you from performing the action, just from doing it unnoticed.</p><ul><li><strong>Thievery:</strong> When you try to take something from another person, your opponent makes a Notice check. To obtain the object, you must get a result of 20 or higher, regardless of the opponent’s check result. The opponent noticed the attempt if his check result beats your check result, whether you take the object or not.</li><li><strong>Planting:</strong> You can make a Sleight of Hand check to plant a small object on someone, slip something into their pocket, drop something into their drink, and so forth. To plant the object, you must get a result of 20 or higher, regardless of the opponent’s check result. The opponent noticed the attempt if his check result beats your check result, whether you plant the object or not.</li><li><strong>Concealment:</strong> You can use Sleight of Hand to conceal a small item, making your check result the DC of a Search check to find it.</li></ul><p><strong>Try Again:</strong> A second Sleight of Hand attempt against the same target, or when being watched by the same observer, has a DC 10 higher than the first check if the first check failed or was noticed.</p><p><strong>Action:</strong> A Sleight of Hand check is a standard action.</p><p><strong>Special:</strong> You can make an untrained Sleight of Hand check to conceal something, but must always take 10 when doing so, so you can’t do it while under stress.</p>"
  },
  {
    "name": "Stealth",
    "ability": "DEX",
    "untrained": true,
    "action": "Move",
    "specializations": [],
    "relatedFeats": [
      "Hide in Plain Sight"
    ],
    "fullText": "<p>You’re skilled at going unnoticed.</p><p><strong>Check:</strong> Your Stealth check is opposed by the Notice check of anyone who might detect you. While using Stealth, you can move up to half your normal speed at no penalty. At more than half and up to your full speed, you take a –5 penalty. It’s practically impossible (–20 penalty) to use Stealth while attacking, moving all out, or charging.</p><ul><li><strong>Size Modifiers:</strong> Apply the modifier from your size category to your Stealth checks to represent the relative ease of noticing smaller and larger targets.</li><li><strong>Hiding:</strong> If others have spotted you, you can’t use Stealth to remain unseen. You can run around a corner so you are out of sight and then use Stealth to hide, but others then know which way you went. You can’t hide at all if you have absolutely no cover or concealment, since that means you’re standing out in plain sight. Of course, if someone isn’t looking directly at you (you’re sneaking up from behind, for example), then you have concealment relative to that person. Characters with the Hide in Plain Sight feat can make Stealth checks without the need for cover or concealment.</li><li><strong>Creating a Diversion to Hide:</strong> A successful Bluff or Intimidate check can give you the momentary diversion needed to make a Stealth check while people are aware of you. When others turn their attention from you, you can make a Stealth check if you can reach cover or concealment of some kind (within 1 foot for every rank in Stealth). This check is at a –5 penalty because you have to move quickly.</li><li><strong>Sniping:</strong> If you’re successfully hidden at least one Notice range increment away from a subject (usually 10 feet), then you can make a ranged attack and immediately hide again, but you suffer a –20 penalty to your Stealth check.</li><li><strong>Tailing:</strong> You can use Stealth to tail someone at your normal speed assuming some cover or concealment. If the subject is worried about being followed, he can make a Notice check (opposed by your Stealth check) every time he changes course. If unsuspecting, he only gets a Notice check after each hour of being tailed. If the subject notices you, you can make a Bluff check opposed by Sense Motive to pass off your presence as coincidence.</li></ul><p><strong>Action:</strong> Stealth is a move action.</p>"
  },
  {
    "name": "Survival",
    "ability": "WIS",
    "untrained": true,
    "action": "Extended",
    "specializations": [],
    "relatedFeats": [
      "Track"
    ],
    "fullText": "<p>You use this skill to survive in the wilderness, including finding food and shelter, and safely guiding others.</p><p><strong>Check:</strong> Make a check to determine the conditions you can handle:</p><table><thead><tr><th>Task</th><th>DC</th></tr></thead><tbody><tr><td>Get along in the wild. Move up to half your overland speed while hunting and foraging (no food or water supplies needed). You can provide food and water for one other person for every 2 points your check result exceeds 10.</td><td>10</td></tr><tr><td>Gain a +2 bonus on Fortitude saves against severe weather while moving up to half your speed, or a +4 bonus if stationary. You may grant the same bonus to one other character for every point your check result exceeds 15.</td><td>15</td></tr><tr><td>Avoid getting lost and avoid natural hazards, such as quicksand.</td><td>18</td></tr></tbody></table><p><strong>Navigation:</strong> You can use Survival to navigate outdoors. The DC is 10 if you have the proper tools, 14 if you have no tools, and 18 if you are also avoiding natural hazards (quicksand, gullies, reefs, etc.).</p><p><strong>Try Again:</strong> No.</p><p><strong>Action:</strong> Survival checks occur each day in the wilderness or whenever a hazard presents itself.</p><p><strong>Special:</strong> You can take 10 when making a Survival check, but can’t take 20.</p>"
  },
  {
    "name": "Swim",
    "ability": "STR",
    "untrained": true,
    "action": "Move or Full-Round",
    "specializations": [],
    "relatedFeats": [
      "Environmental Adaptation"
    ],
    "fullText": "<p>You can swim and maneuver underwater.</p><p><strong>Check:</strong> A successful Swim check allows you to swim one-quarter your speed as a move action or half your speed as a full-round action. If the check fails, you make no progress through the water. If the check fails by 5 or more, you go underwater. If you are underwater you must hold your breath to avoid drowning.</p><table><thead><tr><th>Condition</th><th>DC</th></tr></thead><tbody><tr><td>Calm water</td><td>10</td></tr><tr><td>Rough water</td><td>15</td></tr><tr><td>Stormy water</td><td>20</td></tr></tbody></table><p>Each hour you swim, make a Swim check (DC 20). If the check fails, you suffer from fatigue. Unconscious characters go underwater and immediately begin to drown.</p><p><strong>Rescuing:</strong> Rescuing another character who cannot swim (for whatever reason) increases the DC of your Swim checks by +5.</p><p><strong>Action:</strong> A Swim check is either a move action or a full-round action, as described above.</p>"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { SKILLS_LIST };
}
