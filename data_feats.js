const FEATS_LIST = [
  {
    "name": "(Attack) Flurry",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>Your fists, legs, or weapons move with lightning speed, overwhelming your target with a melee barrage. Choose one type of melee attack when acquiring this feat (unarmed, swords, staff, a particular Strike power, etc.). As a full action, you can launch multiple attacks at a target with the chosen attack form. Make a normal attack roll with a –2 modifier. For every 5 points by which you exceed your target’s Defense, add +1 to your attack’s damage bonus, up to +5. Each additional rank in this feat reduces the interval to apply the extra damage by one, to a minimum of 2, increases the maximum damage bonus to +10, or designates another form of melee combat. The bonus granted by (Attack) Flurry does not count against power level limits. You cannot use this feat with powers with the Action drawback or the Autofire extra.</p>"
  },
  {
    "name": "Accurate Attack",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When you make an attack you can take a penalty of up to –5 on your save DC modifier and add the same number (up to +5) to your attack bonus. Your save DC modifier cannot be reduced below +0 and your attack bonus cannot more than double. The changes to attack and save DC modifier are declared before you make the attack roll and last until your next round.</p>"
  },
  {
    "name": "Acrobatic Bluff",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>You can use your Acrobatics skill instead of your Bluff skill to feint and trick in combat (see page 42). Your opponent opposes the attempt with Sense Motive or Acrobatics (whichever is better).</p>"
  },
  {
    "name": "All-out Attack",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When you make an attack you can take a penalty of up to –5 on your defense bonus and add the same number (up to +5) to your attack bonus. Your defense bonus cannot be reduced below +0 and your attack bonus cannot more than double. The changes to attack and defense bonus are declared before you make the attack roll and last until your next round.</p>"
  },
  {
    "name": "Ambidexterity",
    "category": "General",
    "ranked": false,
    "fullText": "<p>You are equally adept at using either hand. You ignore off-hand penalties to checks and attack rolls. Without this feat, characters suffer a –4 penalty when using their off-hand. Note this does not give you any additional attacks, it merely allows you to use either hand equally well. If you have more than two hands, this feat applies to all of them (see Additional Limbs, page 75).</p>"
  },
  {
    "name": "Animal Empathy",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>You have a special connection with animals. You can use the Handle Animal skill (see page 49) like Diplomacy (see page 46) to change the attitude of an animal by interacting with it. Unlike a normal use of Diplomacy, you do not have to speak a language the animal understands, and Animal Empathy affects creatures with an Intelligence of 1 or 2 (but still greater than 0). You can also use the Bluff and Gather Information skills normally on animals. You don’t actually need to speak to the animals; you communicate your intent through gestures and body language and learn things by studying animal behavior.</p>"
  },
  {
    "name": "Artificer",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>You can use the Knowledge (arcane lore) and Craft skills to create temporary magical devices. See Magical Inventions, page 132, for details.</p>"
  },
  {
    "name": "Assessment",
    "category": "General",
    "ranked": false,
    "fullText": "<p>You’re able to size up someone’s combat capabilities. As a move action, choose a target you can accurately perceive and make a Sense Motive check opposed by the target’s Bluff check result. If you succeed, the GM tells you the target’s attack and defense bonus relative to yours (lower, higher, or equal). You don’t know the target’s exact bonus unless it equals your own, only a rough estimate of relative ability. In cases of a 5-point or greater difference, the GM may choose to tell you the target’s bonus is considerably more or less than yours. If you lose the opposed roll, the GM should over- or under-estimate the target’s bonus.</p>"
  },
  {
    "name": "Attack Focus",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You have a +1 bonus to melee or ranged attacks rolls per rank in this feat. Choose which type of roll the bonus applies to when you acquire the feat. Your total attack bonus is limited by the campaign’s power level.</p>"
  },
  {
    "name": "Attack Specialization",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You have a +2 bonus with a specific attack or weapon per rank in this feat. Choose the attack when you acquire the feat. Your total attack bonus is limited by the campaign’s power level.</p>"
  },
  {
    "name": "Attractive",
    "category": "Skill",
    "ranked": true,
    "fullText": "<p>You’re particularly attractive, giving you a +4 bonus per rank on Bluff and Diplomacy checks to deceive, seduce, or change the attitude of anyone who might find you appealing. This bonus cannot increase your total effective skill rank higher than the campaign’s power level limit.</p>"
  },
  {
    "name": "Beautiful Voice",
    "category": "Skill",
    "ranked": true,
    "fullText": "<p>Your voice has a soothing quality that puts others at ease. Choose Diplomacy or a vocal Perform skill when acquiring this feat. You are subject to the normal guidelines for interaction skills, but you can use this feat during combat. Take a standard action and make an interaction skill check against your target’s opposing check (the same skill, Sense Motive, or Will save, whichever has the highest bonus). If you succeed, the target becomes amenable to talk things out rather than fight. Her attitude towards you doesn’t change, but at least she will hear you out if neither you nor any of your allies perform any hostile actions that round. The GM decides whether the target does listen, but she may resume combat whenever she wishes or whenever any of your allies performs any hostile action, and she may not be affected by your voice again in this encounter. You may take this feat more than once. Each time, it applies to a different applicable skill. Like all interaction skills, you can use Beautiful Voice on a group, but you must affect everyone in the group equally.</p>"
  },
  {
    "name": "Beginner’s Luck",
    "category": "Fortune",
    "ranked": false,
    "fullText": "<p>By spending a hero point, you gain 5 ranks in any skill in which you currently have 4 or fewer ranks, including skills you have no ranks in, even if they can’t be used untrained. These temporary skill ranks last for the duration of the encounter and grant you their normal benefits.</p>"
  },
  {
    "name": "Benefit",
    "category": "General",
    "ranked": true,
    "fullText": "<p>You have some significant perquisite or fringe benefit. The exact nature of the benefit is for you and the Gamemaster to determine. As a rule of thumb it should not exceed the benefits of any other feat, or a power costing 1 point. It should also be significant enough to cost at least 1 point. An example is Diplomatic Immunity (see Sample Benefits). A license to practice law or medicine, on the other hand, should not be considered a benefit; it’s simply a part of having enough ranks in the appropriate Profession skill and has no significant game effect. Benefits may come in ranks for improved levels of the same benefit. The GM is the final arbiter as to what does and does not constitute a Benefit in the campaign. Keep in mind some qualities may constitute Benefits in some campaigns, but not in others, depending on whether or not they have any real impact on the game.</p>"
  },
  {
    "name": "Bishonen/bishoujo",
    "category": "General",
    "ranked": true,
    "fullText": "<p>You are an extremely attractive member of your chosen gender, stunning others with your looks. When you use an interaction skill against a character controlled by the GM, success brings said character’s attitude towards you one step closer to Helpful, in addition to the normal effects of the interaction task you attempted (see Diplomacy, page 46 in Mutants & Masterminds), because she just feels good that such a good-looking person is talking to her. If you are using the Diplomacy skill precisely to improve NPCs’ attitudes, a success would actually improve their attitude by two steps. Once you enjoy this effect, you cannot use it again during the same interaction with the same person. You can only affect a single target up to 10 feet away from you; with each additional rank, the range of this effect and the number of targets increase by one step on the Time and Value Progression table. The attitude gains from this feat are temporary. After a few minutes out of your sight, the target’s or targets’ attitudes return to normal (unless you successfully improved them with regular interaction).</p>"
  },
  {
    "name": "Blind-fight",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>In melee combat, you suffer half the usual miss chance due to concealment (see Concealment, page 161). If you spend a hero point before rolling the miss chance, you automatically ignore it for that attack. You take only half the usual penalty to speed for being unable to see; darkness and poor visibility reduce your speed to three-quarters rather than half.</p>"
  },
  {
    "name": "Break The Style",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You can adapt your fighting style to your opponent’s. If you successfully use the Assessment feat on an opponent with the (Martial Arts) Stance power, you can make a Knowledge (martial arts or tactics) check (DC 10 + opponent’s (Martial Arts) Stance ranks). If successful, you gain a bonus to either your Defense or your attack rolls equal to the number of ranks in this feat, chosen at the beginning of each round. You lose this bonus when your opponent changes to a different stance or drops his stance altogether. Your total Defense or attack bonus cannot exceed the setting’s power level when you use this feat.</p>"
  },
  {
    "name": "Challenge",
    "category": "General",
    "ranked": true,
    "fullText": "<p>The Challenge feat (from Mastermind’s Manual, page 43) allows you to choose a specific task you can perform better than normal. Usually, challenges incur a –5 penalty or a +5 DC to the task, but purchasing the challenge feat for a given task allows you to perform it at no additional modifier. Below are examples of specific challenges. You can take this feat multiple times. Each time, it applies to a different challenge or reduces the penalty with an existing challenge by an additional +/–5. •\t Improved Demoralize: You can make yourself particularly frightening or impressive. You may attempt to demoralize using your Intimidate skill (see Intimidate, M&M, page 49) as a move action. •\t Improved Distract: Your presence is very disconcerting, especially in combat. When you use the Distract feat (see Distract, M&M, page 60), you may attempt to distract as a move action. •\t Improved Feint: Your style of combat is confusing to your opponents, making it easier for you to strike them from unexpected directions or before they expect it. You may attempt to feint as a move action (see Feint, M&M, page 156). •\t Improved Taunt: There’s something about you that makes people want to punch you in the face… a lot. Using the Taunt feat and your Bluff skill (see the demoralize section of Intimidate, M&M, page 60), you may attempt to demoralize someone as a move action. •\t Mass Intimidation: You can attempt to intimidate more than one subject at a time. You suffer a –2 penalty to your check per opponent beyond the first (instead of the usual –5 penalty for a skill challenge). A quick glance back through the discussion of skills earlier in this chapter should also provide a few more potential challenge feats to choose from, such as Combat Clarity from Sense Motive or Perfect Balance from Acrobatics.</p>"
  },
  {
    "name": "Chokehold",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>If you pin an opponent (see Grappling, page 156), you can apply a chokehold, causing your opponent to begin suffocating for as long as you maintain the pin (see Suffocation, page 168).</p>"
  },
  {
    "name": "Combo (action)",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You can weave an attack into a complex sequence with devastating results. When you acquire this feat, choose a specific action you can make during combat. The designated action is considered a combo action. If the designated action is successful, you gain a certain number of combo points you can use towards paying to activate a Combo Finish power (see Powers in the next section). Each rank in this feat allows you to select a different combo action. You can only assign this feat to actions that entail rolls against a target’s Defense, opposed checks, or rolls that the target can resist with a successful save.</p>"
  },
  {
    "name": "Connected",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>You know people who can help you out from time to time. You can call in favors by making a Diplomacy check. It might be advice, information, help with a legal matter, or access to resources. The GM sets the DC of the Diplomacy check, based on the aid required. A simple favor is DC 10, ranging up to DC 25 or higher for especially difficult, dangerous, or expensive favors. You can spend a hero point to automatically secure the favor. The GM has the right to veto any request if it is too involved or likely to spoil the plot of the adventure. Use of this feat always requires at least a few minutes (and often much longer) and the means to contact your allies.</p>"
  },
  {
    "name": "Conspiracy Theorist",
    "category": "Skill",
    "ranked": true,
    "fullText": "<p>You are adept at reading between the lines and making connections between two apparently unrelated facts. This is not so much intuition as the ability to process and compare information on the fly. If you roll a natural 20 on any Gather Information, Investigate, or Knowledge check, you gain an insight that appears unrelated to the subject at hand. You can then make a new check for any one of the skills mentioned without needing to have any tools or reference material readily available. The subject of the second roll doesn’t need to be related to the first one, so a hero could suddenly deduce the answer to a scientific problem that had been plaguing her for weeks after talking about the latest baseball game while searching local bars for information on weapon shipments. Each additional rank in this feat moves the die roll threshold that allows a second check by one, up to a natural roll of 16 to 20.</p>"
  },
  {
    "name": "Contacts",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>You have such extensive and well-informed contacts you can make a Gather Information check in only one minute, assuming you have some means of getting in touch with your contacts. You can take 10 or take 20 on this check (taking 20 requires 20 minutes rather than 1). Further Gather Information checks on the same subject require the normal length of time.</p>"
  },
  {
    "name": "Critical Strike",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>You can score critical hits normally on favored opponents with Immunity (critical hits) (see Immunity, page 89). You must have the Favored Opponent feat (see page 61) in order to make a critical strike against that type of opponent.</p>"
  },
  {
    "name": "Crushing Pin",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>While grappling, if you pin an opponent, you can also inflict your normal unarmed damage against that opponent each round for as long as you maintain the pin. You hold your opponent immobile as normal, but must remain immobile yourself to continue the crushing pin. You suffer a –4 defense penalty while maintaining a Crushing Pin, in addition to losing your dodge bonus against anyone you aren’t grappling, as normal.</p>"
  },
  {
    "name": "Cunning Fighter",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>You are particularly skilled in using every little trick of movement, weapon placement, etc., at your disposal to fool the eyes and reflexes of your targets in fight. When using the feint maneuver in combat, you may use your attack bonus instead of your Bluff skill for the check.</p>"
  },
  {
    "name": "Damaging Escape",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When you escape from a grapple, you get an unarmed attack against the grappler as a free action. You still have to roll to hit. This feat works with the Takedown Attack feat (see Takedown Attack, M&M, page 64), making it very effective against minions grappling you in large numbers.</p>"
  },
  {
    "name": "Dedicated Dodge",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When two or more attackers target you, you can increase your dodge bonus by up to +5 against one opponent and subtract the same amount from your dodge bonus versus all other attackers. Your dodge bonus against the single opponent cannot more than double, and your dodge bonus against all other attacker cannot be reduced below +0. The changes to your dodge bonus are decided before the first attack roll is made against you each round and last until your next round.</p>"
  },
  {
    "name": "Dedication",
    "category": "General",
    "ranked": false,
    "fullText": "<p>Your dedication to your allegiance makes it very difficult to sway you. You receive a +4 bonus on Will saving throws and Sense Motive checks for any effect causing you to act against your allegiance. (See p. 118 of Mutants & Masterminds for more on allegiances.)</p>"
  },
  {
    "name": "Deep Ties",
    "category": "Fortune",
    "ranked": true,
    "fullText": "<p>Your emotions run deep when it comes to a particular situation. Choose one of your complications. When you encounter the complication, it awards two hero points instead of one. If you don’t use the extra hero point by the end of the encounter when you gained it, it is lost. A complication with Deep Ties is an integral part of the hero, and resolving it should be a major character plot point in any series. You can only take up to three ranks of this feat. Each rank allows you to choose a new complication.</p>"
  },
  {
    "name": "Defensive Attack",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When you make an attack you can take a penalty of up to –5 on your attack bonus and add the same number (up to +5) as a dodge bonus to your defense. Your attack bonus cannot be reduced below +0 and your dodge bonus cannot more than double. The changes to attack and dodge bonus last until your next action.</p>"
  },
  {
    "name": "Defensive Roll",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You can evade damage through agility and “rolling” with an attack. You receive a bonus to your Toughness saving throws equal to your rank, but lose your Defensive Roll bonus whenever you are denied your dodge bonus or unable to take a free action unless you are able to succeed on a Concentration check (DC based on circumstances, see Concentration in Chapter 3).. Your total Toughness save bonus, including Defensive Roll, is limited by the campaign’s power level. You can add your Defensive Roll rank as a bonus to Reflex saves against area attacks (see Chapter 8) or as a bonus to your Toughness save against the resulting damage, but not both.</p>"
  },
  {
    "name": "Defensive Strike",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>If an opponent attacks you in melee combat and misses, your next melee attack against that opponent has a +4 bonus to hit. You gain no bonus against opponents who do not attack you or who attack and hit you successfully (whether or not the attack has any effect).</p>"
  },
  {
    "name": "Defensive Throw",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>If an opponent attacks you in melee combat and misses, you can make an immediate trip attack against him as a free action at your full attack bonus.</p>"
  },
  {
    "name": "Demonic Glare",
    "category": "Skill",
    "ranked": true,
    "fullText": "<p>During social interaction, you have the option to express your anger and annoyance in subtle yet very effective ways. Choose a target, preferably one who just said or did something supremely stupid or insensitive. As a move action, you can make an Intimidate check against your target’s Will save. If you win, in his mind, you’re wreathed in hellfire and your eyes are giant, blank pits of white-hot flame (or choose your favorite imagery). You just have to stare at him (he must be able to see you), and he becomes unable to speak for that round. You can maintain the effect (requiring a move action each round). The effect ends when you stop. Each additional rank moves the number of targets you can affect one step up the Time and Value Progression Table. If combat begins, the effect ends. This feat works better in light-hearted or outright comedic series.</p>"
  },
  {
    "name": "Diehard",
    "category": "General",
    "ranked": false,
    "fullText": "<p>When your condition is reduced to dying you automatically stabilize on the following round without any need for a Constitution check, although further damage can still kill you.</p>"
  },
  {
    "name": "Dirty Fighting",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You gain an edge when fighting in close quarters: adjacent to a foe and with cover, concealment, or a movement penalty applied to your opponent. Each rank in this feat gives you a +1 damage bonus with melee attacks, including hand-held weapons. Your maximum damage bonus is limited by power level.</p>"
  },
  {
    "name": "Distract",
    "category": "Skill",
    "ranked": true,
    "fullText": "<p>You can make a Bluff or Intimidate check (choose one when you acquire the feat) to cause an opponent to hesitate in combat. Take a standard action and make a skill check against your target’s opposing check (the same skill, Sense Motive, or Will save, whichever has the highest bonus). If you succeed, your target is dazed for one round (defending normally, but taking no action). Targets gain a +1 bonus on checks to resist Distract per attempt against them in the same encounter. You can take this feat twice (gaining the ability to use it with either Bluff or Intimidate).</p>"
  },
  {
    "name": "Distracting Looks",
    "category": "General",
    "ranked": true,
    "fullText": "<p>You may not have a charming personality or a cute appearance, but you have the physical assets that make people drool and stare in dumbstruck admiration. When meeting people for the first time who would normally be attracted to you, they must succeed at a Will save (DC 10 + rank + Charisma bonus, up to the PL’s limits for save DCs) or become smitten. While smitten, your DCs for interaction skill checks against them are reduced by 2 per rank, or your targets suffer a –1 penalty to opposed skill checks or Will saving throws per rank, whichever applies. This condition lasts until they lose sight of you or a third party sways their attention away from you by doing something as simple as standing between you two or slapping her around. At that point, they regain their senses, but any effect you achieved through your interaction with them remains. This feat usually carries a complication: people who would not be attracted to you will generally despise you for stealing the spotlight.</p>"
  },
  {
    "name": "Dodge Focus",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You have a +1 dodge bonus for each rank in this feat. You lose this bonus whenever you are denied your dodge bonus. Your total defense bonus (including your dodge bonus) is limited by the campaign’s power level.</p>"
  },
  {
    "name": "Eidetic Memory",
    "category": "General",
    "ranked": false,
    "fullText": "<p>You have perfect recall of everything you’ve experienced. You have a +4 bonus on checks to remember things, including saving throws against effects that alter or erase memories. You can make any Knowledge skill check untrained, meaning you can answer questions involving difficult or obscure knowledge without ranks in the skill.</p>"
  },
  {
    "name": "Elusive Target",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>While you are fighting an opponent in melee combat, others attempting to target you with ranged attacks are at a –8 penalty rather than the usual –4 penalty for shooting into melee combat.</p>"
  },
  {
    "name": "Endurance",
    "category": "General",
    "ranked": true,
    "fullText": "<p>You gain a +4 bonus per rank on Swim checks to avoid becoming fatigued and Constitution checks or Fortitude saves to hold your breath, avoid damage from starvation or thirst, avoid damage from hot or cold environments, and to resist suffocation and drowning.</p>"
  },
  {
    "name": "Environmental Adaptation",
    "category": "General",
    "ranked": false,
    "fullText": "<p>You’re adapted to a particular environment, such as underwater, zero gravity, and so forth. You suffer none of the normal die roll or movement penalties associated with that environment, moving and acting normally. You are still affected by environmental hazards like suffocation, exposure, and so forth. You need Immunity (see page 89) for resistance to these effects.</p>"
  },
  {
    "name": "Equipment",
    "category": "General",
    "ranked": true,
    "fullText": "<p>You have 5 points to spend on equipment per rank in this feat. See Chapter 7 for details on equipment.</p>"
  },
  {
    "name": "Evasion",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>If you make your Reflex save against an area effect (see page 111), you suffer no damage. If you have two ranks in this feat, you only take half damage from an area effect even if you fail the Reflex save, and no damage if you succeed.</p>"
  },
  {
    "name": "Fake Expert",
    "category": "Skill",
    "ranked": true,
    "fullText": "<p>You may have no idea what you’re doing, but other people don’t need to know that. Choose two skills upon gaining this feat. You can make a Bluff check instead of using the chosen skill to fool fate itself that you know what you’re doing. For a number of rounds equal to your Charisma modifier, the check seems to work as intended (if successful); you plug the leak in the cooling pipes, you get the malfunctioning spaceship moving again, or you activate the ancient relic that only descendants of Lord Badass can use. Even if you fail, if your check beat the Sense Motive check of any onlooker, they are convinced that you tried your best but the problem was out of your ability. You don’t actually achieve anything useful related to the skill you’re faking; the information you gain is not true, you only buy time to hopefully get out of the situation or for a real expert to solve the problem. Once the duration ends, the real situation reasserts itself, sometimes with calamitous consequences. This is more useful when applied to specialty and interaction skills. You cannot make a second fake expertise roll for the same task, whether you succeed or fail—reality is on to you. Each additional rank allows you to choose two other skills to affect.</p>"
  },
  {
    "name": "Fascinate",
    "category": "Skill",
    "ranked": true,
    "fullText": "<p>One of your interaction skills is so effective you can capture and hold someone’s attention with it. Choose Bluff, Diplomacy, Intimidate, or Perform when you acquire this feat. You are subject to the normal guidelines for interaction skills, and combat or other immediate danger makes this feat ineffective. Take a standard action and make an interaction skill check against your target’s opposing check (the same skill, Sense Motive, or Will save, whichever has the highest bonus). If you succeed, the target becomes fascinated (see Condition Summary, page 170). You can maintain the effect (requiring a standard action each round). The fascination ends when you stop or the target overcomes it. You may take this feat more than once. Each time, it applies to a different interaction skill. Like all interaction skills, you can use Fascinate on a group, but you must affect everyone in the group equally.</p>"
  },
  {
    "name": "Fast Overrun",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>If you make a successful overrun attempt (see Overrun, page 157) you can make another overrun, so long as you have sufficient movement to reach another target. You can continue making overrun attempts until you either run out of movement or miss an attempt. You can change the direction of your movement between overrun attempts, but you must still move at least 10 feet in a straight line before each attempt.</p>"
  },
  {
    "name": "Favored Conditions",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You have set of circumstances you’re especially suited for fighting under. Examples include when outnumbered, when drunk, when cornered, and so forth. While operating under you favored conditions, you gain either a +1 attack bonus or +1 dodge bonus. Choose at the start of each round whether your bonus applies to attack or dodge. Your maximum attack and defense bonus is limited by the series’ power level.</p>"
  },
  {
    "name": "Favored Environment",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You have an environment you’re especially suited for fighting in. Examples include in the air, underwater, in space, in extreme heat or cold, in jungles or woodlands, and so forth. While in your favored environment, you gain either a +1 attack bonus or +1 dodge bonus. Choose at the start of each round whether your bonus applies to attack or dodge. Your maximum attack and defense bonus is limited by the campaign’s power level.</p>"
  },
  {
    "name": "Favored Opponent",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You have a particular type of opponent you’ve studied or are especially effective against. It may be a type of creature (aliens, animals, constructs, mutants, undead, etc.), a profession (soldiers, police officers, Yakuza, etc.) or any other category the GM approves. Especially broad categories like “humans” or “villains” are not permitted. You gain a +1 bonus on Bluff, Intimidate, Notice, Sense Motive, and Survival checks dealing with your Favored Opponent as well as +1 damage on all attacks against them. You may take this feat multiple times, either choosing a different opponent or increasing your existing bonus by +1, to a maximum of +5. Your maximum damage bonus is limited by the campaign’s power level.</p>"
  },
  {
    "name": "Fearless",
    "category": "General",
    "ranked": false,
    "fullText": "<p>You are immune to fear effects of all sorts. You automatically succeed on any saving throw against a fear effect. This is the equivalent of the power Immunity 1 (fear effects) (see page 89).</p>"
  },
  {
    "name": "Fearsome Presence",
    "category": "General",
    "ranked": true,
    "fullText": "<p>You can inspire fear in others. Take a standard action to strike a suitably fearsome pose or utter an intimidating threat; anyone within (feat rank × 5) feet able to interact with you must make a Will save (DC 10 + rank) or become shaken. If the save fails by 5 or more, the subject flees from you. If the save fails by 10 or more, the subject panics, dropping any held items and fleeing from you as quickly as possible. Your Fearsome Presence rank cannot exceed your Intimidate skill bonus.</p>"
  },
  {
    "name": "Finishing Blow",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>You can perform a coup de grace as a standard rather than a full-round action. (See Helpless Defenders in the Combat chapter of M&M.)</p>"
  },
  {
    "name": "First Strike",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When you make an attack against a flat-footed opponent (someone who hasn’t yet acted in combat) whose initiative is lower than yours, increase your attack’s damage bonus by +2. Opponents immune to critical hits suffer no additional damage. Additional ranks increase your First Strike damage bonus by +1, to a maximum of +5. First Strike damage stacks with the Sneak Attack feat. Your total damage bonus is limited by the series’ power level.</p>"
  },
  {
    "name": "Follow-up Strike",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>If you score a critical hit with a melee attack, you can make an additional melee attack against the same opponent immediately as a free action, with the same attack bonus as the attack that scored the critical hit.</p>"
  },
  {
    "name": "Grappling Block",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When you successfully block a melee attack while unarmed, you can initiate a grapple against your attacker as a free action without an initial attack roll.</p>"
  },
  {
    "name": "Grappling Finesse",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>You can use your Dexterity bonus, rather than your Strength bonus, to make grapple checks. You retain your dodge bonus to Defense against all opponents while grappling.</p>"
  },
  {
    "name": "Hide In Plain Sight",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>You can make Stealth checks even while being observed and even if you do not have cover or concealment. Characters normally must have cover or concealment to hide and cannot make Stealth checks while being observed.</p>"
  },
  {
    "name": "Improved Aim",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When you take a full-round action to aim (see Aim, page 154), you gain double the normal bonus: +10 for a melee attack or a ranged attack adjacent to the target, +4 for a ranged attack at a greater distance.</p>"
  },
  {
    "name": "Improved Block",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You have a +2 bonus on attack rolls to block melee attacks (see Block, page 155). If you can block ranged attacks (using the Deflect power, page 81), your Improved Block bonus does not apply to those block rolls, which are improved seperately by adding power ranks.</p>"
  },
  {
    "name": "Improved Concealment",
    "category": "General",
    "ranked": false,
    "fullText": "<p>When you have concealment, the miss chance for attacks against you is improved by 2 (from 17 to 15 in the case of normal concealment). The miss chance cannot be lower than an 11 (on d20), so this feat does not improve total concealment.</p>"
  },
  {
    "name": "Improved Critical",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>Your critical threat range with a particular attack (chosen when you acquire this feat) is increased, allowing you to score a critical hit on a roll of 19 or 20. Only a natural 20 is an automatic hit, however, and an attack that misses is not a critical. Each additional rank applies to a different attack or increases your threat range with an existing attack by one more.</p>"
  },
  {
    "name": "Improved Defense",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>When you take the total defense action in combat you gain an additional +2 dodge bonus (+6 rather than the usual +4 dodge bonus, see Total Defense, page 159). You can take a second rank in this feat, giving you a +8 total dodge bonus with the total defense action.</p>"
  },
  {
    "name": "Improved Disarm",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You have a +2 bonus per rank on attack rolls when attempting to disarm an opponent and they do not get the opportunity to disarm you (see Disarm, page 156).</p>"
  },
  {
    "name": "Improved Grab",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When you hit with an unarmed attack you can immediately start a grapple against that opponent as a free action. The opponent must be no larger than your size. Your unarmed attack inflicts normal damage and counts as the initial attack roll required to start grappling.</p>"
  },
  {
    "name": "Improved Grapple",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>You can make grappling attacks with only one hand, leaving the other free. If you pin your opponent, you can maintain the pin while still using your other hand to perform actions.</p>"
  },
  {
    "name": "Improved Initiative",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You have a +4 bonus to your initiative checks per rank in this feat.</p>"
  },
  {
    "name": "Improved Overrun",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When you make an overrun attempt, your opponent cannot choose to avoid you, and you have a +4 bonus on the trip check (see Overrun, page 157).</p>"
  },
  {
    "name": "Improved Pin",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>Your grappling attacks are particularly difficult to escape. Opponents suffer a –4 penalty on grappling checks against you to escape a grapple or pin.</p>"
  },
  {
    "name": "Improved Ranged Disarm",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>You have no penalty to your attack roll when making a disarm attempt at range.</p>"
  },
  {
    "name": "Improved Sunder",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>You have a +4 bonus to attack rolls to hit an object held by another character.</p>"
  },
  {
    "name": "Improved Throw",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>You’re skilled at throwing opponents off-balance. When making a trip attack (normally or using a power), choose which ability bonus your opponent uses to defend, Strength or Dexterity.</p>"
  },
  {
    "name": "Improved Trick",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>You can use Bluff to trick an opponent in combat as a move action rather than a standard action without the usual –5 penalty.</p>"
  },
  {
    "name": "Improved Trip",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>You have a +4 bonus on checks to trip an opponent (normally or using a power) and they do not get the opportunity to trip you. If you use this feat with a ranged trip attack it’s only half as effective (a +2 bonus).</p>"
  },
  {
    "name": "Improvised Tools",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>You ignore the –4 penalty for using skills without proper tools, since you can improvise sufficient tools with whatever is at hand.</p>"
  },
  {
    "name": "Improvised Weapons",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You have +1 damage bonus with improvised weapons per rank in this feat. You can use normal objects as weapons more effectively than usual. You must follow all the rules for using improvised weapons (see Improvised Weapons, M&M, page 162) except your damage bonus may be greater than +2 and, at the Gamemaster’s discretion, your weapon may grant you extended reach appropriate to the weapon you’re using. Your power level limits your maximum damage bonus with this feat.</p>"
  },
  {
    "name": "Inspire",
    "category": "Fortune",
    "ranked": true,
    "fullText": "<p>You can inspire your allies to greatness. You must be able to interact and you can affect a number of allies equal to your Charisma bonus. By taking a full-round action and spending a hero point, your allies gain a +1 bonus on all attack rolls, saving throws, and checks for the following round. Each additional time you take this feat increases the bonus by +1, to a maximum of +5. You do not gain the inspiration bonus, only your allies do. The inspiration bonus can exceed power level limits, like other uses of hero points. Multiple uses of inspiration do not stack, only the highest bonus applies.</p>"
  },
  {
    "name": "Instant Up",
    "category": "General",
    "ranked": false,
    "fullText": "<p>You can stand up from a prone position as a free action.</p>"
  },
  {
    "name": "Interface",
    "category": "Skill",
    "ranked": true,
    "fullText": "<p>You make tools an extension of your body and your will. Choose a skill that requires tools when you acquire this feat (this includes Drive and Pilot, which use vehicles as “tools,” as well as Computers). You gain a +4 bonus to the skill check if you use tools to perform it, not limited by the setting’s power level. This bonus stacks with any other bonus gained from using superior tools, but it does not apply if you do not use tools (such as with the Improvised Tools feat or the Datalink power). Each additional rank allows you to apply this effect to a different skill.</p>"
  },
  {
    "name": "Interpose",
    "category": "General",
    "ranked": false,
    "fullText": "<p>Once per round, when an ally adjacent to you is targeted by an attack, you can choose to trade places with that ally as a reaction, making you the target of the attack instead. If the attack hits, you suffer the effects normally. If the attack misses you, it also misses your ally. You must declare your intention to trade places with an ally before the attack roll is made. You cannot use Interpose if you are stunned or otherwise incapable of taking free actions.</p>"
  },
  {
    "name": "Inventor",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>You can use the Knowledge (technology) and Craft skills to create inventions and temporary devices. See Inventing, page 131, for details.</p>"
  },
  {
    "name": "Iron Stomach",
    "category": "General",
    "ranked": false,
    "fullText": "<p>You can eat anything that’s not toxic – spoiled or unpleasant food, for example – without ill effects. . You get a +4 bonus on Survival checks involving keeping yourself nourished.</p>"
  },
  {
    "name": "Jack-of-all-trades",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>You can use any skill untrained, even skills that normally cannot be used untrained, although you must still have proper tools if the skill requires them.</p>"
  },
  {
    "name": "Kawaii",
    "category": "Skill",
    "ranked": true,
    "fullText": "<p>You are so cute it’s unsettling. Choose Bluff, Diplomacy, or Perform when you acquire this feat. You are subject to the normal guidelines for interaction skills. Take a move action and make an interaction skill check against your target’s Will save. If you win, he thinks you’re just too adorable (even if disgustingly so), and the opponent is considered shaken (–2 to all attacks and checks) when acting against you for one round. You can maintain the effect (requiring a move action each round). The effect ends when you stop or when any of your targets suffers damage from your actions, and you cannot resume it during the same encounter. Each additional rank moves the number of targets you can affect one step up the Time and Value Progression Table or allows you to choose a different interaction.</p>"
  },
  {
    "name": "Last Stand",
    "category": "General",
    "ranked": false,
    "fullText": "<p>You can be a bloody mess, but you still find that one last ounce of strength needed to prevail. You can use extra effort to ignore all penalties from damage conditions during a single round.</p>"
  },
  {
    "name": "Leadership",
    "category": "Fortune",
    "ranked": false,
    "fullText": "<p>Your presence can reassure and lend courage to allies. As a standard action, you can spend a hero point to remove one of the following conditions from an ally with whom you can interact (see Interaction Skills, page 38): dazed, fascinated, fatigued, panicked, shaken, or stunned. Your Leadership cannot remove damage (although it may alleviate some of its effects) nor can it remove other conditions, including exhausted, disabled, or unconscious.</p>"
  },
  {
    "name": "Light Sleeper",
    "category": "General",
    "ranked": false,
    "fullText": "<p>You do not suffer the +10 DC modifier to Notice checks for being asleep. This means you’re much less likely to be caught by surprise while sleeping. You can also act immediately upon waking (characters are normally dazed for one round after waking).</p>"
  },
  {
    "name": "Lionheart",
    "category": "General",
    "ranked": true,
    "fullText": "<p>You gain a +4 bonus per rank on Will Saves versus fear and related effects. This bonus cannot increase your total effective Will save bonus higher than the series’ power level limit.</p>"
  },
  {
    "name": "Low Profile",
    "category": "General",
    "ranked": true,
    "fullText": "<p>You’re a cipher, falling through the cracks of society so that people just don’t remember you well. All Computer, Gather Information, and Knowledge checks made to retrieve information about you suffer a penalty equal to –2 per rank. If you’re using the Reputation rules from the Mastermind’s Manual, use the feat by the same name included there.</p>"
  },
  {
    "name": "Luck",
    "category": "Fortune",
    "ranked": true,
    "fullText": "<p>You have an extra hero point, over the normal starting amount, per rank in this feat (see Hero Points, page 121). You cannot have more ranks in luck than half the campaign’s power level. The GM may choose to set a lower limit on this feat, depending on the campaign.</p>"
  },
  {
    "name": "Master Plan",
    "category": "General",
    "ranked": false,
    "fullText": "<p>If you have the opportunity to prepare for an encounter you can formulate a plan. This requires at least a few minutes, longer at the Gamemaster’s discretion. Make an Intelligence check (DC 10). If successful, you and your allies gain a bonus on all skill checks and attack rolls in the encounter depending on the result of your roll: +1 for a roll of 10-14, +2 for 15-25, and +3 for 25 or higher. This bonus is not subject to power level limits. You choose when during the encounter to initiate your master plan. The bonus lasts for 3 rounds, then begins decreasing at a rate of 1 per round until it is gone. You can only use this feat when you have the opportunity to prepare for an encounter in advance, not when dealing with sudden or unexpected encounters.</p>"
  },
  {
    "name": "Mastery Skill",
    "category": "Skill",
    "ranked": true,
    "fullText": "<p>Choose four skills. When making checks with those skills, you can take 10 even when distracted or under pressure. This feat does not allow you to take 10 with skills that do not normally allow you to do so. Each additional rank applies Skill Mastery to four more skills.</p>"
  },
  {
    "name": "Mechanical Genius",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>You are so familiar with machines that you can fix and break them in your sleep. Choose a type of technology or type of technological item available in the setting (such as steam engines, computers, alchemical transmutation circles, weapons, etc.). You gain a +4 bonus to Craft and Disable Device checks used to fix or sabotage items of the chosen technology, not subject to the setting’s PL.</p>"
  },
  {
    "name": "Minions",
    "category": "General",
    "ranked": true,
    "fullText": "<p>You have a follower or minion. This minion is an independent character with a power point total of (rank × 15). Minions are subject to the normal power level limits, and cannot have minions themselves. Your minions automatically have a helpful attitude toward you. If you double the cost of this feat (2 points per rank) your minions are fanatical. They are subject to the normal rules for minions (see page 163). Rather than increasing the power points available to create your minion, a rank in this feat can move your total number of minions of the same type one step up the Time and Value Progression Table (see page 70). So Minions 5 can give you one 75-point minion, or two 60-point minions, or five 45-point minions, or ten 30-point minions, and so forth. Your minions don’t have to be identical, but should be generally of the same type (human agents, infernal demons, zombies, etc.). Any lost minions are replaced in between adventures with other followers with similar abilities at the Gamemaster’s discretion.</p>"
  },
  {
    "name": "Monkey Climber",
    "category": "General",
    "ranked": false,
    "fullText": "<p>You scale walls and other obstacles with fluid ease. You can use your Acrobatics skill in place of Climb to ascend steep inclines so long as there are at least some narrow handholds or parallel walls or even well-positioned other characters to use as jumping positions during the climb.</p>"
  },
  {
    "name": "Move-by Action",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When taking a standard action and a move action you can move both before and after the standard action, provided the total distance isn’t greater than your movement speed.</p>"
  },
  {
    "name": "Niche Protection (trait)",
    "category": "General",
    "ranked": false,
    "fullText": "<p>You are extremely good at what you do. Pick a single trait (ability or non-combat skill) at which the Gamemaster is willing to allow you to declare you are going to have niche protection. That one trait (and only that one) can be increased beyond the series level’s normal limits by +1 for an ability bonus or +2 for a skill rank.</p>"
  },
  {
    "name": "Ninja Run",
    "category": "General",
    "ranked": true,
    "fullText": "<p>By leaning your body forward and running with your arms stretched backwards, you can cover great distances without fail. When you move at your all-out pace, you can move for one full minute without tiring. After that, the normal rules for all-out movement apply (you can move a number of rounds equal to your Constitution score before needing to make Constitution checks each round). While using this feat, you do not lose any speed for moving through natural difficult terrain (does not apply to terrain made difficult by powers such as Environmental Control). For each additional rank in this feat, you move the amount of time you can run unimpeded up one step on the Time and Value Progression Table. You can interrupt your ninja run at any time, but if you suffer any damage while you run like this, you become fatigued. You cannot use this feat when fatigued, since you cannot move all out while fatigued.</p>"
  },
  {
    "name": "Oathbound",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>Your strong devotion to your allegiance gives you an additional +1 modifier on aiding another actions for allies who share your allegiance (providing a +3 bonus rather than a +2 bonus). You also gain a +1 bonus on attack rolls against opponents with an allegiance opposed to your own. (See p. 118 of M&M for more on allegiances.)</p>"
  },
  {
    "name": "Online Research",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>People are icky, and you don’t need to talk to them to find things out. You can use your Computers skill instead of Gather Information when looking for information that would normally be acquired by talking to people and buying them drinks. You can use this feat together with feats like Well-Informed, which normally require a Gather Information check.</p>"
  },
  {
    "name": "Perfect Timing",
    "category": "Fortune",
    "ranked": false,
    "fullText": "<p>You are always there when needed. You can spend a hero point to arrive at the scene, unless you’re actively engaged doing something somewhere else. If you arrive to the middle of combat, you roll initiative as normal. The Gamemaster can determine that you are just too far away to arrive.</p>"
  },
  {
    "name": "Power Attack",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When you make an attack you can take a penalty of up to –5 on your attack bonus and add the same number (up to +5) to your attack’s saving throw DC. Your attack bonus cannot be reduced below +0 and your save DC modifier cannot more than double. The changes to attack and saving throw DC are decided before you make your attack roll and last until your next round. This feat does not apply to effects requiring no attack roll or allowing no saving throw.</p>"
  },
  {
    "name": "Power Proxy",
    "category": "General",
    "ranked": true,
    "fullText": "<p>You may not be able to manifest powers, but you are a natural conduit for the powers of others. As a full action, you can synchronize with a willing ally within 50 feet per rank. From that moment onward, your ally can use you as the point of origin for any of her powers, as long as you are in range of each other. If you are in different dimensions, you can only channel those powers with the Dimensional power feat. You both act on the same Initiative (the lower of the two), and you spend a move action while she uses the normal action for her power. She must be able to see or perceive the intended target, so she cannot use you to circumvent cover or concealment, unless she can somehow use your own senses as well. She cannot use powers with a personal range through you, but you can channel her powers with a touch range, with you doing the touching. Your synchronization ends when you synchronize with another ally or when either you or your synchronized ally fall unconscious (which includes just falling asleep).</p>"
  },
  {
    "name": "Precise Shot",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>When you make ranged attacks on an opponent engaged in melee with your allies, you reduce the attack roll penalty by 4. This eliminates the normal –4 penalty, and reduces the penalty for Elusive Target (see page 60) to –4. A second rank ignores the defense bonus for anything less than total cover and the miss chance from anything less than total concealment. It also completely negates the penalty for the Elusive Target feat.</p>"
  },
  {
    "name": "Precise Strike",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When making a melee attack, you ignore the defense bonus from any cover that is less than total.</p>"
  },
  {
    "name": "Prone Fighting",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>You suffer no penalties on attack rolls for being prone, and adjacent opponents do not gain any bonus to hit you while you are prone (although opponents making ranged attacks are still at –4 on their attack rolls). You can crawl at half your speed rather than the usual 5-feet per move action.</p>"
  },
  {
    "name": "Quick Change",
    "category": "General",
    "ranked": true,
    "fullText": "<p>You can change clothes—such as changing into your costume or your secret identity—as a free action. Normally, changing clothes requires at least a minute (10 rounds). If you take this feat a second time, you can change into any outfit at will. This allows you to use the Disguise skill (see page 47) as a move action rather than taking the usual time.</p>"
  },
  {
    "name": "Quick Draw",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You can draw or load a weapon as a free action, rather than a move action. You can only do one of these things as a free action each round; the others remain move actions as normal. So you could draw a weapon as a free action, then load it as a move action, for example, but not draw and load it as a free action. Quick Draw 2 allows you to both draw and load a weapon in the same round as free actions.</p>"
  },
  {
    "name": "Rage",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You can fly into a berserk rage as a free action, gaining +4 Strength, +2 to your Fortitude and Will saves, and a –2 penalty to Defense. While raging you can’t use skills or powers requiring concentration (with a duration of Concentration or Sustained), and you can’t take 10 or 20 on checks. Your rage lasts for five rounds, after which you are fatigued for five rounds. Each additional rank gives you +2 Strength and a +1 Fortitude and Will save bonus to a maximum of +10 Strength and +5 to saves total at 4 ranks (the –2 penalty to Defense and other effects remain the same). Your maximum Strength and save bonuses are limited by the campaign’s power level. Instead of increasing your Rage benefits, a rank in this feat can extend the duration by 5 rounds. This extends the duration of your post-rage fatigue by the same amount.</p>"
  },
  {
    "name": "Rallying Cry",
    "category": "Fortune",
    "ranked": false,
    "fullText": "<p>Your signature call reminds your friends they’re not alone in the fight. As a standard action, you can spend a hero point to grant your allies within auditory perception range a new Will save to overcome fear and lasting mental effects.</p>"
  },
  {
    "name": "Ranged Pin",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>You can use a ranged weapon to pin an opponent to a nearby surface. The target must be within 5 feet of a wall, tree, or similar surface. Make a normal attack roll against the target. If your attack is successful, the target makes a Reflex saving throw against your attack roll result. Failure means the target is entangled and unable to move. To break free, the victim must take a move action and make a successful Strength or Escape Artist check (DC 15). A Strength or skill bonus greater than the DC allows the target to escape as a free action.</p>"
  },
  {
    "name": "Reaction Combat",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You have trained to react quickly to particular surprises. Define a specific action that can be performed with a move or free action, and assign it to a particular event, such as “jump to cover when people start shooting,” “use the Interpose feat on the nearest ally as soon as combat starts,” or “become Invisible when I hear a strange noise.” When the event you assigned comes to pass, you can perform the defined action as a reaction, before the event’s results are adjudicated. Additional ranks let you choose another combination of action and event.</p>"
  },
  {
    "name": "Redirect",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>If you successfully trick an opponent (see Bluff, page 42), you can redirect a missed attack against you from that opponent at another target as a reaction. The new target must be adjacent to you and within range of the attack. The attacker makes a new attack roll with the same modifiers as the first against the new target.</p>"
  },
  {
    "name": "Reversal",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When you escape from being grappled, you may immediately make a grapple check against the attacker from whom you escaped. If you escaped from multiple grapplers, you must choose one to be the target of your grapple check.</p>"
  },
  {
    "name": "Rhythm Of  Skill",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>Your tactical knowledge lets you know how well you and your friends are doing in battle. As a move action, you can make a Knowledge (tactics) check (DC 15). If you succeed, you are aware of the number and nature of any injury and harmful conditions affecting all allies in line of sight. You also receive this information about enemies in line of sight, if your Knowledge (tactics) check meets a DC equal to 10 + the enemy’s Fortitude save bonus. You can make this check as a free action, by increasing the DC by +5.</p>"
  },
  {
    "name": "Ritualist",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>You can use the Knowledge (arcane lore) skill to create and cast arcane rituals (see page 131).</p>"
  },
  {
    "name": "Rousing Speech",
    "category": "Skill",
    "ranked": true,
    "fullText": "<p>Whether by inspiration, deception, or intimidation, you can motivate others to try their best. Choose Bluff, Diplomacy, Intimidate, or Perform when you acquire this feat. You are subject to the normal guidelines for interaction skills. Take a standard action and make the chosen interaction skill check (DC 15). If you succeed, you are considered to be aiding a number of allies equal to your Charisma modifier. You grant your affected allies a +2 bonus to a particular check or save you choose when you use this skill (Strength checks, Toughness saves, etc.). If they haven’t used the bonus at the beginning of your next turn, it is lost. You may take this feat more than once. Each time, it applies to a different interaction skill.</p>"
  },
  {
    "name": "Salvage",
    "category": "General",
    "ranked": false,
    "fullText": "<p>You can cannibalize a machine for its parts, so that you can use them later. When faced with a machine, you can make a Craft check (DC 15) to “borrow” some parts. You can also apply this feat as part of a Disable Device check to sabotage a machine, at the appropriate DC. If you succeed, you can “store away” a +1 bonus to a Craft check to build something with a similar technology (including the checks for inventions). If you’re using the Wealth bonus option, this bonus can apply to the Wealth check to buy the parts instead. For every 5 points by which you exceed the task’s DC, you gain an additional +1 worth of parts. You can apply up to a +5 bonus from salvaged parts to a construction check, and once you use a bonus, it’s gone, now a part of the new creation. You cannot salvage temporary inventions; their parts are used up and too unstable to grant a lasting bonus.</p>"
  },
  {
    "name": "Sea Legs",
    "category": "General",
    "ranked": true,
    "fullText": "<p>You’re better able to deal with the pitch and yaw of a rolling deck. Reduce the speed penalty for hampered movement by one-quarter for each rank of this feat. Moderate pitch is generally a 3/4 movement penalty, while severe (such as a storm) is a 1/2 movement penalty. If you reduce the movement penalty to 0 or less, you are unaffected by that condition and move at your full normal speed.</p>"
  },
  {
    "name": "Second Chance",
    "category": "General",
    "ranked": true,
    "fullText": "<p>Choose a particular hazard, such as falling, being tripped, triggering traps, being mind controlled (or affected by another specific power, such as Blast with the fire descriptor) or a particular skill with consequences for failure. If you fail a saving throw against that hazard or a check with that skill, you can make another roll immediately and use the better of the two results. You only get one second chance for any given save or task, and the GM decides if a particular hazard or skill is an appropriate focus for this feat. Each additional rank in this feat applies to a different hazard or skill.</p>"
  },
  {
    "name": "Seize Initiative",
    "category": "Fortune",
    "ranked": false,
    "fullText": "<p>You can spend a hero point to go first in the initiative order, without having to roll for initiative. You may only do so when you would normally roll initiative. If more than one character uses this feat, they roll for initiative normally and act in order of their initiative result, followed by all the other characters involved in the combat.</p>"
  },
  {
    "name": "Sense Murderous Intent",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>Enemies who wish you ill have a hard time hiding from you. You can use your Sense Motive skill instead of Notice to pinpoint a target that is actively hostile against you and enjoying any form of cover or concealment. The target must be within 60 feet for his murderous intent to be noticeable by you.</p>"
  },
  {
    "name": "Set-up",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>You can transfer the benefits of a successful combat use of an interaction skill to a teammate. For example, you can feint and allow your ally to make the surprise attack against that opponent. The interaction skill requires its normal time and skill check.</p>"
  },
  {
    "name": "Sidekick",
    "category": "General",
    "ranked": true,
    "fullText": "<p>You have another character serving as your partner and aide. Create your sidekick as an independent character with (rank × 5) power points, and subject to the campaign’s power level limits. A sidekick’s power point total must be less than yours. Your sidekick is an NPC, but automatically fanatically loyal to you (provided you treat your sidekick fairly and well). Gamemasters should generally allow you to control your sidekick, although sidekicks remain NPCs and the GM has final say in their actions. Sidekicks do not earn power points. Instead, you must spend earned power points to increase your rank in Sidekick to improve the sidekick’s power point total and traits; each point you spend to increase your rank in Sidekick grants the sidekick 5 additional power points. Sidekicks also do not have hero points, but you can spend your own hero points on the sidekick’s behalf with the usual benefits. Sidekicks are not minions, but full-fledged characters, so they are not subject to the minion rules. Rather than increasing the power points available to create your sidekick, a rank in this feat can move your total number of sidekicks of the same point total one step up the Time and Value Progression Table (see page 70), so one additional rank gives you two sidekicks, two additional ranks give you five, and so forth. The GM may limit the number of sidekicks a character can have to keep things from becoming unmanageable during play.</p>"
  },
  {
    "name": "Slap Silly",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You can react before he succeeds and slap any perv who tries to grab you. If you are hit by a grapple attack, make a normal attack roll with any attack that takes at most a standard action and that you can use readily. Instead of dealing damage, the grapple fails, and the attacker must make a Fortitude save (DC 10 + rank) or be dazed for one round. If you are grappled by a ranged power, you can only react with a ranged power that can reach the offending party. Male heroes might want to change this feat’s name to something more manly, to avoid embarrassment.</p>"
  },
  {
    "name": "Sneak Attack",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>When you make a surprise attack (see Surprise Attack, page 163), increase your attack’s damage bonus by +2. You cannot sneak attack an opponent you cannot accurately perceive (due to concealment) and opponents immune to critical hits suffer no additional damage. Additional ranks increase your Sneak Attack damage bonus by +1, to a maximum of +5. Your total damage bonus is limited by the campaign’s power level.</p>"
  },
  {
    "name": "Startle",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>You can make an Intimidate check rather than a Bluff check to feint in combat (see Feint on page 42). Targets resist with Intimidate, Sense Motive, or Will (whichever is best) and gain a +1 bonus on their resistance check per startle attempt against them in the same encounter.</p>"
  },
  {
    "name": "Stunning Attack",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When you make a damaging melee attack, you can choose not to inflict normal damage. Instead, the target makes a Fortitude save against a DC of 10 plus your damage bonus. A successful save results in no effect, a failed save means the target is dazed for one round. Failure by 5 or more means the target is stunned for one round, and failure by 10 or more means the target is unconscious.</p>"
  },
  {
    "name": "Sweeping Strike",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When you make a successful unarmed attack against an opponent, you can split your damage bonus between damaging your opponent and a free and immediate trip attack. So, for example, if you have a+4 unarmed damage bonus, you can inflict +1 damage and make a trip attack with a +3 bonus in place of your normal Str bonus, or +2 damage and +2 trip, or any such combination. You must assign at least a +1 bonus each to damage and trip to use Sweeping Strike. The trip attack is resolved normally, including your opponent potentially having the opportunity to trip you.</p>"
  },
  {
    "name": "Swift",
    "category": "General",
    "ranked": true,
    "fullText": "<p>You can move unusually fast; each rank in this feat counts as a rank of the Speed power (M&M, page 100) for ground movement. You’re limited to no more than 2 ranks in this feat, which allows you to move all-out at speeds rivaling the fastest land animals!</p>"
  },
  {
    "name": "Takedown Attack",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>If you knock out or disable an opponent with a melee attack, you get an immediate extra attack against another opponent within range and within 5 feet of where the previous target was when attacked. You can’t move before making this extra attack. The extra attack is with the same attack and attack bonus as the first. You can use this feat once per round, except when fighting minions, where you can use it an unlimited number of times, until you miss or there are no more opponents within range of your attack or your last target. You can take this feat a second time, allowing you to move up to 5 feet between each attack you make, but you still cannot move more than your total speed, regardless of the number of attacks you make.</p>"
  },
  {
    "name": "Task Focus",
    "category": "Skill",
    "ranked": true,
    "fullText": "<p>Choose a specific task or situation that can be performed with a skill check. When making checks that involve your chosen specialization, you gain a bonus equal to one-half your ranks in that skill. Additional ranks allow you to choose a new task in the same or a different skill.</p>"
  },
  {
    "name": "Taunt",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>You can demoralize an opponent with a Bluff check rather than an Intimidate check. Use the normal rules for demoralizing (see page 49), substituting Bluff for Intimidate. Targets resist using Bluff, Sense Motive, or Will (whichever is best) and gain a +1 bonus on their resistance check per taunt attempt against them in the same encounter.</p>"
  },
  {
    "name": "Teamwork",
    "category": "General",
    "ranked": true,
    "fullText": "<p>You’re more effective at helping out friends. When you use the aid action (see page 154), you grant a bonus 1 higher than usual for each rank in this feat, up to a maximum of 3 ranks (for an additional +3 bonus).</p>"
  },
  {
    "name": "Tech Familiarity",
    "category": "General",
    "ranked": false,
    "fullText": "<p>Even if you grew up with a particular type of technology, you understand other types. Choose one technology base existent in the setting that is different from the one you’re used to handling. You no longer suffer a –4 penalty from working with such technology.</p>"
  },
  {
    "name": "Throwing Mastery",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You have a +1 damage bonus with thrown weapons per rank in this feat. You can also throw normally harmless objects—playing cards, pens, paper clips, and so forth—as weapons with a damage bonus equal to your rank, a range increment of 10 feet, and a maximum range of 50 feet. Your maximum damage bonus with this feat is limited by power level.</p>"
  },
  {
    "name": "Tough",
    "category": "General",
    "ranked": true,
    "fullText": "<p>You are unusually tough; add your rank in this feat as a bonus to your Toughness saving throws. Your maximum Toughness save bonus is limited by power level as normal. The Gamemaster may choose to set a limit on how many ranks you can have in this feat; Tough is an innate talent or knack, as opposed to the Protection power, which is a superhuman trait. A maximum of three ranks of Tough is usually a fair limit for semi-realistic games.</p>"
  },
  {
    "name": "Track",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>You can use the Survival skill to visually follow tracks like the Tracking Super-Sense (see page 104).</p>"
  },
  {
    "name": "Trance",
    "category": "General",
    "ranked": false,
    "fullText": "<p>Through breathing and bodily control, you can slip into a deep trance. It takes a minute of uninterrupted meditation and a DC 15 Concentration check. While in the trance you add your Concentration bonus (not rank) to your Constitution score to determine how long you can hold your breath and you make Concentration checks rather than Constitution checks to avoid suffocation (see Suffocation, page 168). Poison and disease effects are suspended for the duration of the trance. It requires a Notice check with a DC equal to your Concentration check result to determine you’re not dead. You are aware of your surroundings while in trance and can come out of the trance at any time at will. You cannot take any actions while in the trance.</p>"
  },
  {
    "name": "Trap Sense",
    "category": "General",
    "ranked": true,
    "fullText": "<p>You’re acutely attuned to the hazards posed by traps. Each rank of this feat grants you a +1 bonus to Reflex saving throws and Defense against traps, although you lose this bonus if you are helpless (but not merely flat-footed). Your maximum Reflex and Defense bonuses are limited by power level, although the Gamemaster may choose to waive the limit in the case of this feat, or treat the bonus from Trap Sense as worth half (or less) its actual bonus due to its limited nature.</p>"
  },
  {
    "name": "Truth Sense",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>You can make an automatic Sense Motive check when you hear someone telling a lie or hiding the truth, whether you suspect them of duplicity or not. This is basically an application of the Super-Senses (detect) power.</p>"
  },
  {
    "name": "Ultimate Effort",
    "category": "General",
    "ranked": true,
    "fullText": "<p>When spending a hero point on a particular task, you treat the roll as a 20 (meaning you don’t need to roll the die at all, just apply a result of 20 to your modifier). This is not a natural 20, but is treated as a roll of 20 in all other respects. You choose the particular action the feat applies to when you acquire it and the GM must approve it. You can take Ultimate Effort multiple times, each time, it applies to a different action.</p>"
  },
  {
    "name": "Unbalancing Strike",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When you hit an opponent with a melee attack, you can choose to throw him off balance rather than inflicting damage. Your opponent makes a Reflex saving throw (DC 10 + your attack’s damage bonus). A failure means he loses his dodge bonus to defense for the next round.</p>"
  },
  {
    "name": "Uncanny Dodge",
    "category": "Combat",
    "ranked": true,
    "fullText": "<p>You are especially attuned to danger. You retain your dodge bonus when surprised or flat-footed. You cannot be surprise attacked (see Surprise Attack, page 163). Uncanny Dodge does not prevent loss of your dodge bonus from anything other than being surprised or flat-footed, such as if you are immobilized, pinned, or helpless, or when you move all out, and so forth. It also does not protect against feints and other combat maneuvers. Uncanny Dodge must belong to a particular sense type (see page 68). Opponents with total concealment from that sense type can surprise attack you normally. You can apply additional ranks of Uncanny Dodge to different sense types, if you wish (making it harder to overcome).</p>"
  },
  {
    "name": "Up The Wall",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>You can jump your way over walls and other high obstacles. You can use your Acrobatics skill instead of Climb to scale an incline, provided you have places to jump from separated by at most half of your normal speed.</p>"
  },
  {
    "name": "Veteran Fighter",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>Your long years in harsh combat have taught you how to exploit your deadliest blows for lasting and sometimes unexpected effect. When you score a critical hit with a particular attack, you may spend a hero point and choose for the hit to have a different additional effect of up to 10 power points in value (in place of the normal +5 bonus to saving throw DC). This includes any power effect the Gamemaster judges suitable for the attack. Particular effects most likely to be associated with critical hits include Dazzle, Drain, Fatigue, Nauseate, or Stun, but others may be appropriate at the GM’s discretion.</p>"
  },
  {
    "name": "Weapon Bind",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>If you successfully block an armed melee attack (see Block, page 155), you can make a disarm attempt immediately as a free action. The disarm attempt is carried out normally, including the attacker getting the opportunity to disarm you.</p>"
  },
  {
    "name": "Weapon Break",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>If you successfully block an armed melee attack (see Block, page 155), you can make an attack against the blocked weapon immediately as a free action. This requires an attack roll and inflicts normal damage to the weapon if it hits (see Attacking Objects, page 155, for details).</p>"
  },
  {
    "name": "Well-informed",
    "category": "Skill",
    "ranked": false,
    "fullText": "<p>You are exceptionally well-informed. When encountering an individual, group, or organization for the first time, you can make an immediate Gather Information check as a reaction to see if your character has heard something about the subject. This takes the place of a normal Knowledge check (if any). Use the guidelines for Gather Information checks (see page 48) to determine the level of information you gain, and the guidelines for Knowledge checks (see page 50) for the sorts of questions you can answer. You receive only one check per subject, although the GM may allow another upon encountering the subject again once significant time has passed.</p>"
  },
  {
    "name": "Well-known",
    "category": "General",
    "ranked": true,
    "fullText": "<p>People can’t help but recognize you. This feat works in reverse from Well-Informed: whenever you meet another character, the Gamemaster rolls a Gather Information check on that character’s behalf. You gain a bonus to interaction checks with that person equal to twice the ranks in this feat.</p>"
  },
  {
    "name": "Withstand Damage",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>When you are the target of an attack, you can take a penalty of up to –5 on your dodge defense bonus and add the same number (up to +5) to your Toughness save bonus. Your Defense bonus cannot be reduced below +0, and your Toughness bonus cannot more than double. If you reduce your dodge bonus to +0, you are considered flat-footed.</p>"
  },
  {
    "name": "Zen Strike",
    "category": "Combat",
    "ranked": false,
    "fullText": "<p>You can strike at your target’s pressure points to cause more pain. You add your Wisdom bonus instead of your Strength bonus to your melee damage bonus, limited by PL. You still use Strength for things like grappling, the Climb skill, etc.</p>"
  },
  // --- MECHA PILOT FEATS (Mecha & Manga, p. 74-75) ---
  {
    "name": "Improved Outmaneuver",
    "category": "Mecha",
    "types": ["Mecha", "Combat"],
    "ranked": false,
    "fullText": "<p>You can perform the outmaneuver action (see Mecha Combat) as a free action instead of a move action. This only works inside a mecha or a vehicle, but the GM may allow you to use it while riding a creature, using Ride as the maneuvering skill. You can only outmaneuver a single opponent in your turn.</p>"
  },
  {
    "name": "Mecha Attunement",
    "category": "Mecha",
    "types": ["Mecha", "General"],
    "ranked": true,
    "fullText": "<p>You can synchronize with your mecha to the extent that it truly feels like an extension of your own self. Each rank of this feat allows you to use one of your powers with the mecha, as if it were your own body. Powers with a Personal range can affect you or your mecha (not both at the same time), and those with a Touch range can be triggered by the mecha’s hands. Perception range includes the mecha’s sensor systems, and line of sight and cover is calculated as if you were the mecha. You are still limited by the setting’s power level. If you select a power that is part of an array, you can use all the powers in the array.</p>"
  },
  {
    "name": "Mecha Dogfighter",
    "category": "Mecha",
    "types": ["Mecha", "Combat"],
    "ranked": true,
    "fullText": "<p>Whenever you would be hit by an attack while piloting a mecha, you can try to avoid the successful attack as a reaction by making a Pilot (or other maneuvering skill) check. If your result is greater than the attack, you avoid it completely. This Pilot check is limited by Defense PL. Each additional rank allows you to avoid an additional attack as a reaction, but your Pilot check suffers a cumulative –2 penalty for each attack you tried to avoid in this round.</p>"
  },
  {
    "name": "Mecha Pilot Proficiency",
    "category": "Mecha",
    "types": ["Mecha", "General"],
    "ranked": false,
    "fullText": "<p>You are formally trained in piloting mecha. This feat allows you to use your Pilot skill bonus towards controlling a mecha without the –4 penalty that nonproficient use imposes on related rolls.</p>"
  },
  {
    "name": "Mecha Weapon Proficiency",
    "category": "Mecha",
    "types": ["Mecha", "General"],
    "ranked": false,
    "fullText": "<p>You are trained in the use of super-heavy weapons meant for mecha. Eliminates the –4 penalty to attack rolls when wielding or firing mounted or handheld mecha weapons.</p>"
  },
  {
    "name": "Need for Speed",
    "category": "Mecha",
    "types": ["Mecha", "General"],
    "ranked": false,
    "fullText": "<p>You have nerves of steel and lightning reflexes when piloting a mecha at high speeds. When engaging in a special movement mode like Flight Systems, Ground Speed, Underground Speed, or Water Speed, your high-speed modifier is halved.</p>"
  },
  {
    "name": "Quick Transformation",
    "category": "Mecha",
    "types": ["Mecha", "General"],
    "ranked": true,
    "focused": true,
    "fullText": "<p>You can activate the reconfiguration systems of a transformable mecha while still performing amazing stunts with it. Choose one of the following features when gaining this feat: Mechamorph, Composite, or all movement modes. For each rank in this feat, reduce the action required to activate the feature by one step (full to standard, standard to move, move to free, and free to reaction).</p>"
  },
  {
    "name": "Top Gun",
    "category": "Mecha",
    "types": ["Mecha", "Skill"],
    "ranked": true,
    "focused": true,
    "fullText": "<p>Choose two maneuvers from the maneuvering skills list (e.g. avoid collision, shake lock, drop prone/stand up, high speed turns). When performing a skill check on board a mecha to perform these maneuvers, you gain a +4 bonus to the roll. An additional rank allows you to choose two more maneuvers or eliminate the need to make a skill check for previously chosen maneuvers.</p>"
  },

  // --- COCKPIT & CONTROLS MECHA FEATURES (Mecha & Manga, p. 63-64) ---
  {
    "name": "Ejector Seat",
    "category": "Mecha",
    "types": ["Mecha", "Cockpit and Controls"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 2 (Complementary)<br>If the mecha is in danger of being destroyed, you can escape from it safely as a reaction. When you eject, you are launched in a random direction away from the mecha as if you had 5 ranks in Leaping. Purchasing this feature equips an ejection system on all seats. Additional ranks increase launch distance (+1 rank Leaping) or add Flight Systems, Environmental Seal, or Electromagnetic Seal for the seat.</p>"
  },
  {
    "name": "Electromagnetic Seal",
    "category": "Mecha",
    "types": ["Mecha", "Cockpit and Controls"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 3 (Complementary)<br>Expands an Environmental Seal to protect the pilot from extreme, energy-based environmental conditions like radiation, cosmic rays, and others found in space or alien dimensions. Each extra rank protects the crew from one rank of Insubstantial (up to 4) or a specific Perception-range effect.</p>"
  },
  {
    "name": "Environmental Seal",
    "category": "Mecha",
    "types": ["Mecha", "Cockpit and Controls"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 3 (Base System)<br>Hermetically seals the cockpit to protect the crew from suffocation and all environmental conditions found in an atmosphere (even alien atmospheres) for 5 hours. Each additional rank increases the time the cockpit can remain sealed one step on the Time and Value Progression Table. At 10 ranks, it becomes a perpetual autonomous life support system.</p>"
  },
  {
    "name": "Extra Seat",
    "category": "Mecha",
    "types": ["Mecha", "Cockpit and Controls"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 1 (Complementary)<br>The mecha has room for extra crew, limited by its size category. Each rank in this feature increases the number of extra crew seats one step up on the Time and Value Progression Table.</p>"
  },
  {
    "name": "Improved Control Interface",
    "category": "Mecha",
    "types": ["Mecha", "Cockpit and Controls"],
    "ranked": false,
    "fullText": "<p><strong>Cost:</strong> 1 MP | <strong>Tech Level:</strong> TL 1 (Complementary)<br>Makes the mecha responsive to sudden maneuvers, granting a +4 bonus to initiative checks. Stacks with all of the pilot's initiative bonuses.</p>"
  },
  {
    "name": "Improved Limb Control",
    "category": "Mecha",
    "types": ["Mecha", "Cockpit and Controls"],
    "ranked": false,
    "fullText": "<p><strong>Cost:</strong> 1 MP | <strong>Tech Level:</strong> TL 1 (Complementary)<br>Links the controls of the mecha's off-hand to the main control interface, granting the Ambidexterity feat when wielding weapons or equipment in the mecha's off-hand.</p>"
  },
  {
    "name": "Neural/Spirit Interface",
    "category": "Mecha",
    "types": ["Mecha", "Cockpit and Controls"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 2 MP per rank | <strong>Tech Level:</strong> TL 5 (Complementary)<br>Direct neural or mystical spirit link making the mecha feel like your own body. Instead of Pilot, you can use Acrobatics or any other maneuvering skill to control the mecha. Also enables channeling physical movement powers (Leaping, Speed, Flight) through the chassis.</p>"
  },
  {
    "name": "Precise Handling",
    "category": "Mecha",
    "types": ["Mecha", "Cockpit and Controls"],
    "ranked": false,
    "fullText": "<p><strong>Cost:</strong> 1 MP | <strong>Tech Level:</strong> TL 1 (Base System)<br>Enhances response from hand servos, allowing the mecha to perform fine manipulations without crushing objects (applies the Precise power feat to the mecha's hands).</p>"
  },

  // --- MOVEMENT MODES MECHA FEATURES (Mecha & Manga, p. 64-66) ---
  {
    "name": "All-Terrain",
    "category": "Mecha",
    "types": ["Mecha", "Movement Modes"],
    "ranked": true,
    "focused": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 2 (Complementary)<br>The mecha’s legs and soles are built with a particular terrain in mind (ski-like feet for snow, crampons for steep hills, etc.). Eliminates the penalties for moving in a chosen difficult terrain (acts as Environmental Adaptation). Each rank adds a different terrain.</p>"
  },
  {
    "name": "Escape Thrusters",
    "category": "Mecha",
    "types": ["Mecha", "Movement Modes"],
    "ranked": false,
    "fullText": "<p><strong>Cost:</strong> 5 MP | <strong>Tech Level:</strong> TL 3 (Complementary)<br>Disposable booster thruster pack capable of reaching escape velocity to launch a mecha into space from a planetary atmosphere.</p>"
  },
  {
    "name": "Flight Systems",
    "category": "Mecha",
    "types": ["Mecha", "Movement Modes"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 2 MP per rank | <strong>Tech Level:</strong> TL 4 (Base System)<br>Rocket thruster packs and wings allowing the mecha to fly as per the Flight power (50 mph at rank 1, doubling each rank).</p>"
  },
  {
    "name": "Free-bearing Hip Joint",
    "category": "Mecha",
    "types": ["Mecha", "Movement Modes"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 2 MP per rank | <strong>Tech Level:</strong> TL 2 (Complementary)<br>The mecha can rotate its hip joints 360 degrees. Negates aid bonuses from flanking enemies and allows the mecha to stand up from prone without a check (or as a free action at rank 2).</p>"
  },
  {
    "name": "Ground Speed",
    "category": "Mecha",
    "types": ["Mecha", "Movement Modes"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 1 (Base System)<br>Locks legs into speed mode or deploys roller treads/wheels, granting alternate ground velocity as per the Speed power.</p>"
  },
  {
    "name": "Improved Leg Actuators",
    "category": "Mecha",
    "types": ["Mecha", "Movement Modes"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 2 (Complementary)<br>Increases the mecha's base walking speed by +10 feet per round for every rank in this feature.</p>"
  },
  {
    "name": "Jump Rockets",
    "category": "Mecha",
    "types": ["Mecha", "Movement Modes"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 3 (Base System)<br>Short-burst thrusters mounted on back, legs, or feet allowing high-altitude leaps as per the Leaping power.</p>"
  },
  {
    "name": "Multipede",
    "category": "Mecha",
    "types": ["Mecha", "Movement Modes"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 1 (Base System)<br>Multi-legged configuration (4, 6, or 8 legs). Grants +4 bonus to resist trip and bull rush attacks, and +1 per extra leg to balance and climb checks.</p>"
  },
  {
    "name": "Underground Speed",
    "category": "Mecha",
    "types": ["Mecha", "Movement Modes"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 2 (Base System)<br>Excavation drills or thermal cutters allowing subterranean tunneling as per the Burrowing power.</p>"
  },
  {
    "name": "Water Speed",
    "category": "Mecha",
    "types": ["Mecha", "Movement Modes"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 2 (Base System)<br>Hydrojets or buoyancy seals granting water surface or submersible movement as per the Swimming power.</p>"
  },
  {
    "name": "Zero-G Thrusters",
    "category": "Mecha",
    "types": ["Mecha", "Movement Modes"],
    "ranked": false,
    "fullText": "<p><strong>Cost:</strong> 1 MP | <strong>Tech Level:</strong> TL 4 (Complementary)<br>Attaches to Flight Systems to cancel the –4 penalty to attack rolls and skill checks in zero-gravity space.</p>"
  },

  // --- SENSORS & COMMUNICATIONS MECHA FEATURES (Mecha & Manga, p. 65-67) ---
  {
    "name": "Advanced Onboard Computer System",
    "category": "Mecha",
    "types": ["Mecha", "Sensors and Communications"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 3 (Base System)<br>Provides tactical processing, telemetry management, and maintenance analysis. Each rank grants +2 to Computers checks to operate mecha systems, or Quickness 1 for computer tasks.</p>"
  },
  {
    "name": "Base Comms",
    "category": "Mecha",
    "types": ["Mecha", "Sensors and Communications"],
    "ranked": true,
    "focused": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 2-3 (Complementary)<br>Radio, laser, microwave, or quantum communications array operating as per the Communication power.</p>"
  },
  {
    "name": "Base Sensors",
    "category": "Mecha",
    "types": ["Mecha", "Sensors and Communications"],
    "ranked": true,
    "focused": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 2-3 (Complementary)<br>Radar, infrared, night vision visors, ladar, or life scanner arrays operating as per the Super-Senses power.</p>"
  },
  {
    "name": "Datalink (Mecha)",
    "category": "Mecha",
    "types": ["Mecha", "Sensors and Communications"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 3 (Complementary)<br>Electronic warfare and tactical hacking system allowing remote access into enemy vehicles, databases, and IFF transponders as per Datalink.</p>"
  },
  {
    "name": "Profile Database",
    "category": "Mecha",
    "types": ["Mecha", "Sensors and Communications"],
    "ranked": false,
    "fullText": "<p><strong>Cost:</strong> 1 MP | <strong>Tech Level:</strong> TL 3 (Complementary)<br>Target recognition database granting the Assessment feat via Computers or Knowledge (technology) instead of Sense Motive.</p>"
  },
  {
    "name": "Profile Entry",
    "category": "Mecha",
    "types": ["Mecha", "Sensors and Communications"],
    "ranked": true,
    "focused": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 3 (Complementary)<br>Detailed tactical profile against a specific enemy mecha model, vehicle, or alien monster, granting the benefits of Favored Opponent (+1 attack and damage bonus).</p>"
  },
  {
    "name": "Recording Equipment",
    "category": "Mecha",
    "types": ["Mecha", "Sensors and Communications"],
    "ranked": false,
    "fullText": "<p><strong>Cost:</strong> 1 MP | <strong>Tech Level:</strong> TL 2 (Complementary)<br>Records all video, audio, and sensor telemetry logs for tactical playback and debriefing.</p>"
  },

  // --- DEFENSE & COUNTERMEASURES MECHA FEATURES (Mecha & Manga, p. 66-68) ---
  {
    "name": "Armor Plating",
    "category": "Mecha",
    "types": ["Mecha", "Defense and Countermeasures"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 1 (Base System)<br>Structural armor reinforcement granting additional Toughness save bonus as per the Protection power.</p>"
  },
  {
    "name": "Autonomous Defensive Actuators",
    "category": "Mecha",
    "types": ["Mecha", "Defense and Countermeasures"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 2 (Complementary)<br>Automated micro-actuators granting a +2 bonus per rank to attack rolls for blocking melee attacks (up to +10).</p>"
  },
  {
    "name": "Cloak System",
    "category": "Mecha",
    "types": ["Mecha", "Defense and Countermeasures"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 2 MP per rank | <strong>Tech Level:</strong> TL 4 (Base System)<br>Active stealth fields, radar dampeners, or holographic bending fields hiding the mecha from detection as per Concealment.</p>"
  },
  {
    "name": "Countermeasures",
    "category": "Mecha",
    "types": ["Mecha", "Defense and Countermeasures"],
    "ranked": true,
    "focused": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 3 (Complementary)<br>Chaff, flare, or aerosol dispensers granting a +2 bonus to block rolls against guided attacks with matching descriptors (heat-seeking, radar, laser).</p>"
  },
  {
    "name": "Decoy Projection Module",
    "category": "Mecha",
    "types": ["Mecha", "Defense and Countermeasures"],
    "ranked": false,
    "fullText": "<p><strong>Cost:</strong> 1 MP | <strong>Tech Level:</strong> TL 3 (Complementary)<br>When an attack is deflected via Countermeasures, you can make a Computers check to redirect the attack to an adjacent enemy (acts as Redirect feat).</p>"
  },
  {
    "name": "Emergency System Shutdown",
    "category": "Mecha",
    "types": ["Mecha", "Defense and Countermeasures"],
    "ranked": false,
    "fullText": "<p><strong>Cost:</strong> 1 MP | <strong>Tech Level:</strong> TL 3 (Base System)<br>When the mecha is Disabled, shut down systems as a reaction to ignore Toughness save penalties from accumulated damage conditions.</p>"
  },
  {
    "name": "Improved Plating",
    "category": "Mecha",
    "types": ["Mecha", "Defense and Countermeasures"],
    "ranked": true,
    "focused": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 3 (Base System)<br>Reinforced metallurgy granting specific Immunities (such as Critical Hits [2 ranks], fire, or radiation) as per Immunity.</p>"
  },
  {
    "name": "Jamming",
    "category": "Mecha",
    "types": ["Mecha", "Defense and Countermeasures"],
    "ranked": true,
    "focused": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 3 (Complementary)<br>Electronic disruption suite creating an area of sensory concealment (radio, radar, infrared) with a 5 ft radius per rank as per Obscure.</p>"
  },
  {
    "name": "Reactive Armor",
    "category": "Mecha",
    "types": ["Mecha", "Defense and Countermeasures"],
    "ranked": true,
    "focused": true,
    "fullText": "<p><strong>Cost:</strong> 3 MP per rank | <strong>Tech Level:</strong> TL 3 (Complementary)<br>Ablative or explosive reactive tiles that reduce incoming damage bonus by 1 per rank against a specified descriptor (ballistic, laser, etc.) before Impervious comparison.</p>"
  },
  {
    "name": "Reactive Camouflage",
    "category": "Mecha",
    "types": ["Mecha", "Defense and Countermeasures"],
    "ranked": false,
    "fullText": "<p><strong>Cost:</strong> 1 MP | <strong>Tech Level:</strong> TL 4 (Base System)<br>Visual deception patterns and geometric disruption that present a harder target, granting the Elusive Target feat.</p>"
  },
  {
    "name": "Shield Generator",
    "category": "Mecha",
    "types": ["Mecha", "Defense and Countermeasures"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 4 (Base System)<br>Electromagnetic or energy deflection shields providing defensive force field protection as per Force Field.</p>"
  },

  // --- TARGETING SYSTEMS MECHA FEATURES (Mecha & Manga, p. 67-68) ---
  {
    "name": "Identify-Friend-or-Foe (IFF) Transponder",
    "category": "Mecha",
    "types": ["Mecha", "Targeting System"],
    "ranked": false,
    "fullText": "<p><strong>Cost:</strong> 1 MP | <strong>Tech Level:</strong> TL 3 (Complementary)<br>Interlocks fire controls with friendly transponders to allow firing into melee without the –4 penalty (acts as Precise Shot feat).</p>"
  },
  {
    "name": "Optical Tracking",
    "category": "Mecha",
    "types": ["Mecha", "Targeting System"],
    "ranked": false,
    "fullText": "<p><strong>Cost:</strong> 1 MP | <strong>Tech Level:</strong> TL 4 (Base System)<br>Tracks pilot eye movements to stabilize aiming reticles, doubling aiming bonuses as per Improved Aim (+4 attack bonus when aiming).</p>"
  },
  {
    "name": "Pinpoint Accuracy System",
    "category": "Mecha",
    "types": ["Mecha", "Targeting System"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 4 (Complementary)<br>Targets structural weak points from database profiles, allowing critical strikes against targets normally immune (Critical Strike feat) and +2 to confirm criticals against target-locked enemies.</p>"
  },
  {
    "name": "Target Tracking Interface",
    "category": "Mecha",
    "types": ["Mecha", "Targeting System"],
    "ranked": true,
    "focused": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 3 (Base System)<br>Fire control system providing a +2 bonus per rank to attack rolls and target-lock checks with a chosen weapon system (acts as Accurate power feat).</p>"
  },

  // --- MISCELLANEOUS MECHA FEATURES (Mecha & Manga, p. 68-70) ---
  {
    "name": "Cargo Space",
    "category": "Mecha",
    "types": ["Mecha", "Miscellaneous"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 1 (Complementary)<br>Internal cargo bay holding one-fourth of the mecha's carrying capacity per rank (each rank holds items 1 size category smaller than the mecha).</p>"
  },
  {
    "name": "Channel (Trait)",
    "category": "Mecha",
    "types": ["Mecha", "Miscellaneous"],
    "ranked": true,
    "focused": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 1 (Base System)<br>Allows the pilot to channel a specific personal feat or power (such as Fascinate or Blast) through the mecha chassis as if the mecha were their own body.</p>"
  },
  {
    "name": "Composite (Gestalt)",
    "category": "Mecha",
    "types": ["Mecha", "Miscellaneous"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 5 (Base System)<br>Docking mechanisms allowing multiple semi-autonomous mecha to combine into a larger composite gestalt robot (as per Gestalt).</p>"
  },
  {
    "name": "Environmental Optimization",
    "category": "Mecha",
    "types": ["Mecha", "Miscellaneous"],
    "ranked": true,
    "focused": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 2 (Complementary)<br>Chassis tuning granting the Favored Environment feat (+1 attack or +1 dodge bonus in a specified environment like urban, space, or desert).</p>"
  },
  {
    "name": "Equipment Mount",
    "category": "Mecha",
    "types": ["Mecha", "Miscellaneous"],
    "ranked": true,
    "focused": true,
    "fullText": "<p><strong>Cost:</strong> 1-3 MP per rank | <strong>Tech Level:</strong> TL 1-3 (Complementary)<br>External hardpoint mounting acting as an extra hand to hold weapons or detachable pods. Rank 1 holds specific item; Rank 2 holds any same-size item; Rank 3 links interface controls.</p>"
  },
  {
    "name": "Hidden Mount",
    "category": "Mecha",
    "types": ["Mecha", "Miscellaneous"],
    "ranked": false,
    "fullText": "<p><strong>Cost:</strong> 1 MP | <strong>Tech Level:</strong> TL 2 (Complementary)<br>Retractable equipment mount that keeps weapons or sensor pods concealed beneath armor plating until deployed.</p>"
  },
  {
    "name": "Improved System Processor",
    "category": "Mecha",
    "types": ["Mecha", "Miscellaneous"],
    "ranked": false,
    "focused": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP | <strong>Tech Level:</strong> TL 3 (Complementary)<br>Assign to any mecha feature that requires a skill check. Grants a re-roll on failed checks for that feature (acts as Second Chance feat).</p>"
  },
  {
    "name": "Mechamorph",
    "category": "Mecha",
    "types": ["Mecha", "Miscellaneous"],
    "ranked": true,
    "focused": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 4 (Base System)<br>Transformation mechanism allowing the mecha to transform into an alternate configuration (space fighter, walker, beast, tank) built with the same point budget.</p>"
  },
  {
    "name": "Passenger/Crew Quarters",
    "category": "Mecha",
    "types": ["Mecha", "Miscellaneous"],
    "ranked": false,
    "fullText": "<p><strong>Cost:</strong> 1 MP | <strong>Tech Level:</strong> TL 1 (Complementary)<br>Internal crew cabins and life accommodations for non-pilot passengers or crew.</p>"
  },
  {
    "name": "Plug-In Interface",
    "category": "Mecha",
    "types": ["Mecha", "Miscellaneous"],
    "ranked": false,
    "fullText": "<p><strong>Cost:</strong> 1 MP | <strong>Tech Level:</strong> TL 3 (Base System)<br>Power and control bus allowing handheld mecha weapons or devices to attach to an Equipment Mount and operate hands-free.</p>"
  },
  {
    "name": "Support Units",
    "category": "Mecha",
    "types": ["Mecha", "Miscellaneous"],
    "ranked": true,
    "fullText": "<p><strong>Cost:</strong> 1 MP per rank | <strong>Tech Level:</strong> TL 3 (Base System)<br>Autonomous satellite drones, bits, or escort automatons deployed under the pilot's control (grants 15 points per rank to build minions as per Summon/Minions).</p>"
  }
];


const ADVANTAGES_LIST = FEATS_LIST;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FEATS_LIST, ADVANTAGES_LIST };
} else {
  window.FEATS_LIST = FEATS_LIST;
  window.ADVANTAGES_LIST = FEATS_LIST;
}
