const FEATS_LIST = [
  // COMBAT FEATS
  {
    name: "Accurate Attack",
    category: "Combat",
    ranked: false,
    fullText: "<p>When you make an attack, you can take a penalty of up to –5 on your damage bonus and add the same number (up to +5) to your attack bonus.</p><p><strong>Mechanics:</strong> Your damage bonus cannot be reduced below +0. The changes to attack and damage bonuses last until your next action. This feat is particularly useful when fighting opponents with a high Defense but low Toughness.</p>"
  },
  {
    name: "All-Out Attack",
    category: "Combat",
    ranked: false,
    fullText: "<p>When you make an attack, you can take a penalty of up to –5 on your Defense and add the same number (up to +5) to your attack bonus.</p><p><strong>Mechanics:</strong> Your Defense cannot be reduced below +0. The changes to attack and Defense bonuses last until your next action. This maneuver leaves you vulnerable but greatly increases your chance to hit.</p>"
  },
  {
    name: "Ambidexterity",
    category: "Combat",
    ranked: false,
    fullText: "<p>You are equally adept using either hand.</p><p><strong>Mechanics:</strong> You ignore the normal –4 penalty for using your off-hand. This does not grant you extra attacks, but it removes the penalty if you are disarmed of your primary weapon or choose to fight with a weapon in your off-hand.</p>"
  },
  {
    name: "Assessment",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can quickly gauge an opponent's combat capabilities.</p><p><strong>Mechanics:</strong> As a move action, make a Sense Motive check opposed by the target's Bluff check. If you succeed, you learn the target's relative Attack bonus, Defense, or Toughness save (your choice) compared to yours (higher, lower, or equal). For every 5 points your check exceeds the target's, you learn another piece of information.</p>"
  },
  {
    name: "Blind-Fight",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can fight in melee without being able to see your foes.</p><p><strong>Mechanics:</strong> In melee, every time you miss because of concealment, you can reroll your miss chance percentile roll one time to see if you actually hit. Furthermore, an invisible attacker gets no bonus to hit you in melee, and you do not lose your dodge bonus to Defense when attacked in melee by an unseen opponent.</p>"
  },
  {
    name: "Chokehold",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can strangle an opponent you have grappled.</p><p><strong>Mechanics:</strong> If you successfully pin an opponent, you can apply a chokehold. The opponent begins suffocating on the following round and must make Constitution checks to avoid falling unconscious.</p>"
  },
  {
    name: "Close Quarters",
    category: "Combat",
    ranked: false,
    fullText: "<p>You are adept at fighting in tight spaces and resisting grapples.</p><p><strong>Mechanics:</strong> You do not lose your dodge bonus to Defense when grappling. Furthermore, you gain a +2 bonus on checks made to resist being pinned in a grapple.</p>"
  },
  {
    name: "Critical Strike",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can strike the weak points of opponents normally immune to critical hits.</p><p><strong>Mechanics:</strong> When using your Favored Environment or Favored Opponent bonuses, you can score critical hits against opponents that are normally immune to them (such as constructs or undead), provided your attack roll is a critical threat and hits the target's Defense.</p>"
  },
  {
    name: "Defensive Attack",
    category: "Combat",
    ranked: false,
    fullText: "<p>When you make an attack, you can take a penalty of up to –5 on your attack bonus and add the same number (up to +5) to your Defense.</p><p><strong>Mechanics:</strong> Your attack bonus cannot be reduced below +0. The changes to attack and Defense bonuses last until your next action. This feat is excellent for buying time or surviving against heavy hitters.</p>"
  },
  {
    name: "Defensive Roll",
    category: "Combat",
    ranked: true,
    fullText: "<p>You can roll with a physical blow to reduce its impact.</p><p><strong>Mechanics:</strong> Each rank of this feat grants you a +1 bonus to your Toughness save. This bonus applies only when you are aware of the attack and not flat-footed. You lose this bonus whenever you lose your dodge bonus to Defense.</p>"
  },
  {
    name: "Elusive Target",
    category: "Combat",
    ranked: false,
    fullText: "<p>You are difficult to hit in melee combat when engaged with multiple opponents.</p><p><strong>Mechanics:</strong> If you are engaged in melee with more than one opponent, you double your dodge bonus to Defense against all attackers except one (your choice). Additionally, if an opponent fires a ranged weapon into a melee you are in, they take a –4 penalty to hit you.</p>"
  },
  {
    name: "Evasion",
    category: "Combat",
    ranked: true,
    maxRanks: 2,
    conditionalSummary: "Area Effect Saves",
    fullText: "<p>You can avoid damage from area effects.</p><p><strong>Mechanics:</strong> <ul><li><strong>Rank 1:</strong> If you make a successful Reflex save against an area effect, you suffer no damage (instead of half damage).</li><li><strong>Rank 2:</strong> Even if you fail the Reflex save, you only suffer half damage. You must have room to move in order to use this feat.</li></ul></p>"
  },
  {
    name: "Favored Environment",
    category: "Combat",
    ranked: true,
    conditionalSummary: "Attack/Defense Bonus",
    fullText: "<p>You are exceptionally skilled at fighting in a specific environment.</p><p><strong>Mechanics:</strong> Choose a specific environment (e.g., Airborne, Underwater, Urban, Forest). While in that environment, you gain a +1 bonus on attack rolls or a +1 dodge bonus to Defense per rank of this feat. You can divide the bonus between attack and Defense however you wish at the start of your turn.</p>"
  },
  {
    name: "Favored Opponent",
    category: "Combat",
    ranked: true,
    conditionalSummary: "Damage Bonus",
    fullText: "<p>You have extensively studied a specific type of opponent.</p><p><strong>Mechanics:</strong> Choose a specific type of opponent (e.g., Mutants, Undead, Demons). You gain a +1 bonus on damage rolls against opponents of that type per rank of this feat. You also gain a +1 bonus per rank on Bluff, Intimidate, Notice, Sense Motive, and Survival checks against them.</p>"
  },
  {
    name: "Grapple Finesse",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can use your agility instead of brute strength to grapple.</p><p><strong>Mechanics:</strong> You use your Dexterity modifier instead of your Strength modifier when making grapple checks. You still use your Strength modifier for damage in a grapple.</p>"
  },
  {
    name: "Improved Aim",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can quickly take careful aim at a target.</p><p><strong>Mechanics:</strong> If you take a full-round action to aim, you gain a +5 bonus on your attack roll (instead of the normal +2). If you take a standard action to aim, you gain a +2 bonus (instead of +1).</p>"
  },
  {
    name: "Improved Block",
    category: "Combat",
    ranked: true,
    fullText: "<p>You are exceptionally skilled at parrying incoming melee attacks.</p><p><strong>Mechanics:</strong> Each rank gives you a +2 bonus on your opposed attack roll when attempting to block a melee attack.</p>"
  },
  {
    name: "Improved Critical",
    category: "Combat",
    ranked: true,
    fullText: "<p>You have a better chance of scoring a critical hit with a specific attack.</p><p><strong>Mechanics:</strong> Choose a specific attack (e.g., Unarmed, Swords, Blast). Your critical threat range for that attack increases by 1 (e.g., from 20 to 19-20). Each additional rank applied to the same attack increases the threat range by 1 again, to a maximum threat range of 16-20 (5 ranks).</p>"
  },
  {
    name: "Improved Defense",
    category: "Combat",
    ranked: true,
    fullText: "<p>You can focus entirely on defending yourself to great effect.</p><p><strong>Mechanics:</strong> When you take the total defense standard action, you gain a +4 dodge bonus to your Defense, plus an additional +2 bonus per rank of this feat.</p>"
  },
  {
    name: "Improved Disarm",
    category: "Combat",
    ranked: true,
    fullText: "<p>You are skilled at disarming opponents.</p><p><strong>Mechanics:</strong> You gain a +2 bonus on opposed attack rolls to disarm an opponent per rank of this feat. Furthermore, the opponent does not get an opportunity to disarm you if your attempt fails.</p>"
  },
  {
    name: "Improved Grab",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can grapple with one hand.</p><p><strong>Mechanics:</strong> If you hit an opponent with a melee attack, you can immediately initiate a grapple as a free action without provoking an attack of opportunity. You can maintain the grapple with only one hand, suffering a –4 penalty to grapple checks, but leaving your other hand free.</p>"
  },
  {
    name: "Improved Grapple",
    category: "Combat",
    ranked: false,
    fullText: "<p>You are highly skilled at wrestling.</p><p><strong>Mechanics:</strong> You can make a grapple attempt with one hand without taking the normal –4 penalty. You also do not lose your dodge bonus to Defense while grappling.</p>"
  },
  {
    name: "Improved Initiative",
    category: "Combat",
    ranked: true,
    fullText: "<p>You react quickly to danger.</p><p><strong>Mechanics:</strong> Each rank of this feat gives you a +4 bonus on your initiative checks.</p>"
  },
  {
    name: "Improved Overrun",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can skillfully knock opponents down while charging past them.</p><p><strong>Mechanics:</strong> When you attempt an overrun, the target cannot choose to avoid you. You also gain a +4 bonus on your Strength check to knock the target prone.</p>"
  },
  {
    name: "Improved Pin",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can lock opponents in inescapable holds.</p><p><strong>Mechanics:</strong> If you successfully pin an opponent in a grapple, they take a –4 penalty on grapple or Escape Artist checks to break the pin.</p>"
  },
  {
    name: "Improved Sunder",
    category: "Combat",
    ranked: false,
    fullText: "<p>You are skilled at breaking objects and weapons.</p><p><strong>Mechanics:</strong> You gain a +4 bonus on attack rolls to strike an object held or carried by an opponent. You also do not provoke an attack of opportunity when making a sunder attempt.</p>"
  },
  {
    name: "Improved Throw",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can use an opponent's momentum to throw them.</p><p><strong>Mechanics:</strong> If an opponent charges you and their attack misses, you can immediately make a trip attempt against them as a reaction. This trip attempt does not provoke an attack of opportunity, and the opponent cannot attempt to trip you if you fail.</p>"
  },
  {
    name: "Improved Trip",
    category: "Combat",
    ranked: false,
    fullText: "<p>You are skilled at knocking opponents off their feet.</p><p><strong>Mechanics:</strong> You gain a +4 bonus on your opposed Strength or Dexterity check when attempting to trip an opponent. If you successfully trip an opponent in melee, you can immediately make a melee attack against them as a free action.</p>"
  },
  {
    name: "Power Attack",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can strike with immense force at the cost of accuracy.</p><p><strong>Mechanics:</strong> When you make an attack, you can take a penalty of up to –5 on your attack bonus and add the same number (up to +5) to your damage bonus. The changes last until your next action. You cannot reduce your attack bonus below +0.</p>"
  },
  {
    name: "Precise Shot",
    category: "Combat",
    ranked: true,
    maxRanks: 2,
    fullText: "<p>You can shoot into melee combat with pinpoint accuracy.</p><p><strong>Mechanics:</strong> <ul><li><strong>Rank 1:</strong> You do not take the normal –4 penalty for firing a ranged attack at an opponent engaged in melee.</li><li><strong>Rank 2:</strong> Your ranged attacks ignore cover and concealment penalties (except total cover and total concealment).</li></ul></p>"
  },
  {
    name: "Prone Fighter",
    category: "Combat",
    ranked: false,
    fullText: "<p>You are adept at fighting from the ground.</p><p><strong>Mechanics:</strong> You do not take the normal –4 penalty on melee attack rolls when prone. Opponents do not gain the normal +4 bonus on melee attack rolls against you when you are prone.</p>"
  },
  {
    name: "Quick Draw",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can draw weapons with lightning speed.</p><p><strong>Mechanics:</strong> You can draw a weapon as a free action instead of a move action. You can draw a hidden weapon (see Sleight of Hand skill) as a move action instead of a standard action.</p>"
  },
  {
    name: "Sneak Attack",
    category: "Combat",
    ranked: true,
    maxRanks: 4,
    conditionalSummary: "Damage Bonus",
    fullText: "<p>You can strike for extra damage when an opponent is off-balance or unaware.</p><p><strong>Mechanics:</strong> Anytime your target loses their dodge bonus to Defense (e.g., flat-footed, surprised, or successfully feinted), your attack deals +2 extra damage per rank of this feat. Ranged attacks must be within 30 feet to gain this bonus.</p>"
  },
  {
    name: "Startle",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can use intimidation to leave opponents vulnerable.</p><p><strong>Mechanics:</strong> You can use the Intimidate skill instead of Bluff to feint in combat. You roll an opposed Intimidate check against the target's Sense Motive or Intimidate. If successful, the target loses their dodge bonus to Defense against your next attack.</p>"
  },
  {
    name: "Stunning Attack",
    category: "Combat",
    ranked: false,
    fullText: "<p>You know how to strike nerve clusters and pressure points.</p><p><strong>Mechanics:</strong> Declare you are using this feat before making an unarmed attack. If you hit and deal damage, the target must also make a Fortitude save (DC 10 + your damage bonus). If they fail, they are stunned for 1 round.</p>"
  },
  {
    name: "Takedown Attack",
    category: "Combat",
    ranked: true,
    maxRanks: 2,
    fullText: "<p>You can rapidly dispatch multiple weak opponents.</p><p><strong>Mechanics:</strong> <ul><li><strong>Rank 1:</strong> If you drop an opponent (render them unconscious or dying) with a melee attack, you can immediately make an extra melee attack against another opponent within reach as a free action.</li><li><strong>Rank 2:</strong> You can take a 5-foot step between your extra attacks, allowing you to sweep through crowds of minions.</li></ul></p>"
  },
  {
    name: "Weapon Bind",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can trap an opponent's weapon with your own.</p><p><strong>Mechanics:</strong> If you successfully block an opponent's melee attack, you can immediately make a disarm attempt against them as a free action. This attempt does not provoke an attack of opportunity.</p>"
  },
  {
    name: "Weapon Break",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can shatter an opponent's weapon.</p><p><strong>Mechanics:</strong> If you successfully block an opponent's melee attack, you can immediately make a sunder attempt against their weapon as a free action. This attempt does not provoke an attack of opportunity.</p>"
  },

  // FORTUNE FEATS
  {
    name: "Beginner's Luck",
    category: "Fortune",
    ranked: false,
    fullText: "<p>You have a knack for succeeding even when you have no idea what you're doing.</p><p><strong>Mechanics:</strong> You can spend a hero point to gain 5 temporary ranks in a skill you do not possess, or to increase an existing skill by 5 ranks (up to your Power Level limit). These temporary ranks last for the duration of the scene.</p>"
  },
  {
    name: "Inspire",
    category: "Fortune",
    ranked: true,
    maxRanks: 5,
    fullText: "<p>Your presence inspires your allies to greatness.</p><p><strong>Mechanics:</strong> You can spend a hero point as a standard action to grant your allies a +1 bonus per rank of this feat (max +5) on all attack rolls, saving throws, and checks. This bonus lasts for 1 round. You do not gain the bonus yourself.</p>"
  },
  {
    name: "Leadership",
    category: "Fortune",
    ranked: false,
    fullText: "<p>You can rally your allies and push them past their limits.</p><p><strong>Mechanics:</strong> You can spend a hero point to remove a dazed, fatigued, or stunned condition from an ally within sight and hearing. Doing so is a free action.</p>"
  },
  {
    name: "Luck",
    category: "Fortune",
    ranked: true,
    fullText: "<p>You are remarkably lucky, seemingly protected by fate.</p><p><strong>Mechanics:</strong> Each rank of this feat grants you one additional hero point at the start of each game session. You cannot have more ranks in Luck than half your Power Level.</p>"
  },
  {
    name: "Seize Initiative",
    category: "Fortune",
    ranked: false,
    fullText: "<p>You can act first in combat through sheer willpower and fortune.</p><p><strong>Mechanics:</strong> You can spend a hero point to automatically go first in the initiative order, regardless of your initiative roll. If multiple characters use this feat, they act in order of their original initiative rolls, before all other characters.</p>"
  },
  {
    name: "Ultimate Effort",
    category: "Fortune",
    ranked: true,
    fullText: "<p>You can summon incredible resolve to succeed at a specific task.</p><p><strong>Mechanics:</strong> Choose a specific check or save (e.g., Ultimate Aim, Ultimate Toughness save, Ultimate Computers check). When you spend a hero point on that specific check, you treat the die roll as an automatic 20 (you do not roll). You must purchase this feat separately for each different check.</p>"
  },

  // GENERAL FEATS
  {
    name: "Animal Empathy",
    category: "General",
    ranked: false,
    fullText: "<p>You have a special connection with animals.</p><p><strong>Mechanics:</strong> You can use the Diplomacy skill on animals to change their attitude toward you. You can also use Handle Animal to soothe or command wild animals. Normal penalties for attempting to influence animals do not apply.</p>"
  },
  {
    name: "Artificer",
    category: "General",
    ranked: false,
    fullText: "<p>You can create temporary magical items.</p><p><strong>Mechanics:</strong> You can use Knowledge (Arcane Lore) and Craft to design and build temporary magical devices (acting as the Inventor feat, but for magic). Creating an artifact takes time based on its power point cost.</p>"
  },
  {
    name: "Attractive",
    category: "General",
    ranked: true,
    conditionalSummary: "Bluff/Diplomacy Bonus",
    fullText: "<p>You are exceptionally attractive, charming, and charismatic.</p><p><strong>Mechanics:</strong> You gain a +4 bonus per rank on Bluff and Diplomacy checks to deceive, seduce, or change the attitude of anyone who would be attracted to you.</p>"
  },
  {
    name: "Benefit",
    category: "General",
    ranked: true,
    fullText: "<p>You have a specific social, financial, or political advantage.</p><p><strong>Mechanics:</strong> Each rank provides a specific benefit. Examples include: Wealth (increases your starting wealth), Security Clearance, Status (nobility or fame), Alternate Identity, or Diplomatic Immunity. You can take this feat multiple times for different benefits.</p>"
  },
  {
    name: "Connected",
    category: "General",
    ranked: false,
    fullText: "<p>You have contacts and connections in useful places.</p><p><strong>Mechanics:</strong> You can use the Diplomacy skill to call in favors from your contacts. The GM determines the DC based on the scope of the favor (DC 10 for simple, DC 25+ for dangerous or highly classified favors). Calling in a favor takes at least 10 minutes.</p>"
  },
  {
    name: "Contacts",
    category: "General",
    ranked: false,
    fullText: "<p>You have a vast network of informants.</p><p><strong>Mechanics:</strong> You can make Gather Information checks in 1 minute instead of the usual 1d4+1 hours. You essentially know a guy who knows a guy for almost any situation.</p>"
  },
  {
    name: "Eidetic Memory",
    category: "General",
    ranked: false,
    fullText: "<p>You possess perfect recall.</p><p><strong>Mechanics:</strong> You automatically remember anything you have experienced. You gain a +4 bonus on checks made to recall specific details, and you can make Knowledge checks to answer questions even if you have no ranks in the specific Knowledge skill.</p>"
  },
  {
    name: "Equipment",
    category: "General",
    ranked: true,
    fullText: "<p>You possess a variety of mundane gear, vehicles, or a headquarters.</p><p><strong>Mechanics:</strong> Each rank of this feat grants you 5 Equipment Points (EP). You use EP to purchase mundane weapons, armor, vehicles, and headquarters. Equipment is considered mundane and can be lost, broken, or stolen, but it can be replaced between adventures.</p>"
  },
  {
    name: "Fascinate",
    category: "General",
    ranked: true,
    fullText: "<p>You can capture the attention of a crowd with a performance.</p><p><strong>Mechanics:</strong> Choose a skill: Bluff, Diplomacy, or Perform. You can use this skill to entrance a target. Make a skill check opposed by the target's Sense Motive or Will save. If you succeed, the target is fascinated (dazed and unable to take actions) as long as you maintain the performance. Any hostile action breaks the effect.</p>"
  },
  {
    name: "Fearless",
    category: "General",
    ranked: false,
    fullText: "<p>You are virtually immune to fear.</p><p><strong>Mechanics:</strong> You automatically succeed on all Will saving throws against fear effects, and you cannot be intimidated.</p>"
  },
  {
    name: "Hide in Plain Sight",
    category: "General",
    ranked: false,
    fullText: "<p>You can disappear right in front of someone's eyes.</p><p><strong>Mechanics:</strong> You can use the Stealth skill to hide even while being observed, and you do not require cover or concealment to hide.</p>"
  },
  {
    name: "Inventor",
    category: "General",
    ranked: false,
    fullText: "<p>You can design and build temporary technological devices.</p><p><strong>Mechanics:</strong> You can use Knowledge (Technology) and Craft to build temporary devices (acting as temporary powers). First, make a Knowledge check (DC 10 + power point cost) to design the invention. Then, make a Craft check (DC 10 + PP cost) to build it. Building takes 1 hour per PP of the device.</p>"
  },
  {
    name: "Jack-of-all-Trades",
    category: "General",
    ranked: false,
    fullText: "<p>You have a passing knowledge of almost everything.</p><p><strong>Mechanics:</strong> You can use any skill untrained, even skills that normally require training (such as Computers, Disable Device, or specific Knowledge skills).</p>"
  },
  {
    name: "Minion",
    category: "General",
    ranked: true,
    fullText: "<p>You have a loyal follower or sidekick.</p><p><strong>Mechanics:</strong> You gain a loyal minion. The minion's Power Level is 15 points per rank of this feat. Minions are subject to the normal minion rules (they suffer the worst effects of failed saves and cannot score critical hits). If your minion is killed, you can recruit a replacement between adventures.</p>"
  },
  {
    name: "Ritualist",
    category: "General",
    ranked: false,
    fullText: "<p>You can perform magical rituals to create temporary effects.</p><p><strong>Mechanics:</strong> You can use Knowledge (Arcane Lore) to design and cast magical rituals (acting as temporary powers). Design requires a Knowledge check (DC 10 + PP cost). Casting requires another Knowledge check (DC 10 + PP cost) and takes 10 minutes per PP.</p>"
  },
  {
    name: "Sidekick",
    category: "General",
    ranked: true,
    fullText: "<p>You have a highly competent partner.</p><p><strong>Mechanics:</strong> You gain a sidekick built with 5 power points per rank of this feat. Unlike minions, sidekicks are treated as full characters (they are not subject to minion rules). Your sidekick's Power Level cannot exceed your own.</p>"
  },
  {
    name: "Skill Mastery",
    category: "General",
    ranked: true,
    fullText: "<p>You perform flawlessly under pressure with certain skills.</p><p><strong>Mechanics:</strong> Choose four skills. You can routinely take 10 on checks with these skills even when distracted, threatened, or under pressure.</p>"
  },
  {
    name: "Taunt",
    category: "General",
    ranked: false,
    fullText: "<p>You can enrage opponents, throwing them off balance.</p><p><strong>Mechanics:</strong> You can use the Bluff skill instead of Intimidate to demoralize opponents in combat. You roll an opposed Bluff check against the target's Sense Motive or Will save. If successful, the target is shaken for 1 round.</p>"
  },
  {
    name: "Well-Informed",
    category: "General",
    ranked: false,
    fullText: "<p>You stay completely up to date on local and global affairs.</p><p><strong>Mechanics:</strong> When encountering a notable person, group, or location for the first time, you can make an immediate Gather Information or Knowledge check to recall relevant information about them, as if you had spent hours researching.</p>"
  },
  
  // SKILL FEATS (M&M 2E groups these with General, but we separate them for clarity if needed, though they are General)
  {
    name: "Acrobatic Bluff",
    category: "General",
    ranked: false,
    fullText: "<p>You can use your agility to confound opponents.</p><p><strong>Mechanics:</strong> You can use Acrobatics instead of Bluff to feint in combat. You roll an opposed Acrobatics check against the target's Sense Motive or Acrobatics. If successful, the target loses their dodge bonus to Defense against your next attack.</p>"
  },
  {
    name: "Track",
    category: "General",
    ranked: false,
    fullText: "<p>You can follow the trails left by creatures.</p><p><strong>Mechanics:</strong> You can use the Survival skill (or Investigate skill in urban settings) to follow tracks. The DC is based on the ground surface (e.g., DC 5 for soft mud, DC 15 for hard ground) and increases based on time passed and weather conditions.</p>"
  },
  {
    name: "Dodge Focus",
    category: "Combat",
    ranked: true,
    maxRanks: 20,
    fullText: "<p>You are particularly adept at dodging attacks.</p><p><strong>Mechanics:</strong> You gain a +1 dodge bonus to your Defense for each rank in this feat. Your dodge bonus is lost whenever you are flat-footed or denied your dodge bonus in combat. Your maximum total Defense (Base Defense + Dodge Focus + other modifiers) is limited by the campaign Power Level limits.</p>"
  },
  {
    name: "Attack Focus",
    category: "Combat",
    ranked: true,
    maxRanks: 20,
    fullText: "<p>You are especially accurate with a particular style of attack.</p><p><strong>Mechanics:</strong> Choose either melee or ranged attacks when you select this feat. You gain a +1 bonus on attack rolls with that type of attack per rank. You can take this feat multiple times, applying it to melee, ranged, or both. Your total attack bonus is limited by the campaign Power Level.</p>"
  },
  {
    name: "Attack Focus (Melee)",
    category: "Combat",
    ranked: true,
    maxRanks: 20,
    fullText: "<p>You are especially accurate with close combat and melee attacks.</p><p><strong>Mechanics:</strong> You gain a +1 bonus on melee attack rolls per rank in this feat, up to campaign Power Level limits.</p>"
  },
  {
    name: "Attack Focus (Ranged)",
    category: "Combat",
    ranked: true,
    maxRanks: 20,
    fullText: "<p>You are especially accurate with ranged attacks.</p><p><strong>Mechanics:</strong> You gain a +1 bonus on ranged attack rolls per rank in this feat, up to campaign Power Level limits.</p>"
  },
  {
    name: "Attack Specialization",
    category: "Combat",
    ranked: true,
    maxRanks: 20,
    fullText: "<p>You are exceptionally skilled with a specific weapon or attack power.</p><p><strong>Mechanics:</strong> Choose a specific attack (a particular weapon like unarmed strike, swords, or a specific attack power like Blast). You gain a +2 bonus on attack rolls with that attack per rank in this feat, up to campaign Power Level limits.</p>"
  },
  {
    name: "Diehard",
    category: "General",
    ranked: false,
    fullText: "<p>You can remain conscious and active even when grievously wounded.</p><p><strong>Mechanics:</strong> When your condition becomes dying, you immediately stabilize and do not risk losing further condition unless you suffer additional damage. You can choose to remain conscious while disabled rather than falling unconscious, though taking standard actions may cause further injury.</p>"
  },
  {
    name: "Endurance",
    category: "General",
    ranked: true,
    maxRanks: 5,
    fullText: "<p>You have extraordinary stamina and staying power.</p><p><strong>Mechanics:</strong> You gain a +4 bonus per rank on Constitution checks made to resist hazards like holding your breath, starvation, thirst, extreme heat or cold, and exhaustion from forced marches or continuous physical exertion.</p>"
  },
  {
    name: "Environmental Adaptation",
    category: "General",
    ranked: false,
    fullText: "<p>You are adapted to a particular hostile environment.</p><p><strong>Mechanics:</strong> Choose an environment such as underwater, zero gravity, low gravity, high gravity, etc. You suffer no penalties on attack rolls or movement checks resulting from that environment.</p>"
  },
  {
    name: "Fast Overrun",
    category: "Combat",
    ranked: false,
    fullText: "<p>You are skilled at knocking past opponents while moving.</p><p><strong>Mechanics:</strong> When making an overrun maneuver, the defender cannot choose to avoid you. If you knock down the defender, you can make a free melee attack against them.</p>"
  },
  {
    name: "Fearsome Presence",
    category: "General",
    ranked: true,
    maxRanks: 20,
    fullText: "<p>Your mere presence strikes terror into those around you.</p><p><strong>Mechanics:</strong> As a standard action, you can unsettle opponents within 5 feet per rank. Opponents must make a Will save (DC 10 + ranks) or become shaken. A shaken character suffers a -2 penalty on attack rolls, saving throws, and checks.</p>"
  },
  {
    name: "Instant Up",
    category: "General",
    ranked: false,
    fullText: "<p>You can regain your footing instantly.</p><p><strong>Mechanics:</strong> You can stand up from a prone position as a free action rather than a move action with a successful DC 20 Acrobatics check, or automatically if you have at least 5 ranks in Acrobatics.</p>"
  },
  {
    name: "Interpose",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can shield an ally from incoming attacks.</p><p><strong>Mechanics:</strong> Once per round, when an ally within your normal move distance is targeted by an attack, you can use a reaction to move between the attacker and your ally. The attack is resolved against you instead, using your Defense and Toughness.</p>"
  },
  {
    name: "Master Plan",
    category: "General",
    ranked: false,
    fullText: "<p>You are a master strategist who plans battles ahead of time.</p><p><strong>Mechanics:</strong> Given at least a few minutes to prepare and assess a situation, make an Intelligence check. A result of 10 gives you and your allies a +1 bonus on all attack rolls and skill checks for 3 rounds. A result of 15 gives +2, and 25 gives +3.</p>"
  },
  {
    name: "Quick Change",
    category: "General",
    ranked: true,
    maxRanks: 2,
    fullText: "<p>You can change into your costume or clothing in the blink of an eye.</p><p><strong>Mechanics:</strong> With 1 rank, you can change your clothes or costume as a move action. With 2 ranks, you can change as a free action.</p>"
  },
  {
    name: "Rage",
    category: "Combat",
    ranked: true,
    maxRanks: 5,
    fullText: "<p>You can channel wild fury to temporarily enhance your physical power.</p><p><strong>Mechanics:</strong> As a free action on your turn, you enter a rage lasting 5 rounds. You gain a +2 bonus to Strength and a +1 bonus to Fortitude and Will saves per rank in this feat, but suffer a -2 Defense penalty. When the rage ends, you are fatigued.</p>"
  },
  {
    name: "Ranged Pin",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can pin a target using a ranged projectile.</p><p><strong>Mechanics:</strong> You can use a ranged attack with a piercing or entangling projectile (arrows, throwing knives, bolas) to pin a target to a surface or pin their clothing, rendering them immobilized until they break free.</p>"
  },
  {
    name: "Redirect",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can turn an opponent's momentum or attack against another foe.</p><p><strong>Mechanics:</strong> When an opponent misses you with a melee attack while you are using Total Defense or taking the Defend action, you can make an opposed Bluff or Acrobatics check against the attacker to redirect the attack to another target within the attacker's reach.</p>"
  },
  {
    name: "Second Chance",
    category: "General",
    ranked: true,
    maxRanks: 10,
    fullText: "<p>You have a knack for bouncing back from specific hazards.</p><p><strong>Mechanics:</strong> Choose a specific hazard or check (such as mind control, falling damage, trip checks, radiation, etc.). When you fail a check or saving throw against that hazard, you can immediately reroll it and take the better of the two results.</p>"
  },
  {
    name: "Set-Up",
    category: "Combat",
    ranked: false,
    fullText: "<p>You can set up an opponent so an ally can exploit their vulnerability.</p><p><strong>Mechanics:</strong> When you successfully feint or trick an opponent in combat, you can choose to transfer the benefits (such as the target losing their dodge bonus) to an ally instead of yourself, allowing that ally to strike on their next turn.</p>"
  },
  {
    name: "Teamwork",
    category: "General",
    ranked: true,
    maxRanks: 3,
    fullText: "<p>You are exceptionally effective when fighting in coordination with allies.</p><p><strong>Mechanics:</strong> When you use the Aid action to help an ally, you grant them a +3 bonus (+1 additional per rank above 1) instead of the normal +2 bonus. When allies aid you, their bonus is similarly increased.</p>"
  },
  {
    name: "Throwing Mastery",
    category: "Combat",
    ranked: true,
    maxRanks: 5,
    fullText: "<p>You can turn any thrown object into a deadly projectile.</p><p><strong>Mechanics:</strong> You gain a +1 damage bonus per rank when throwing weapons or improvised thrown objects.</p>"
  },
  {
    name: "Trance",
    category: "General",
    ranked: false,
    fullText: "<p>You can place yourself in a deep trance state.</p><p><strong>Mechanics:</strong> With a DC 15 Concentration check, you enter a state of suspended animation, breathing one-tenth the normal amount of air and appearing dead to superficial examinations. You can awaken at a predetermined time or upon a specific sensory trigger.</p>"
  },
  {
    name: "Uncanny Dodge",
    category: "Combat",
    ranked: true,
    maxRanks: 2,
    fullText: "<p>Your sensory awareness allows you to react to danger before your senses can process it.</p><p><strong>Mechanics:</strong> With rank 1, you retain your dodge bonus to Defense even when flat-footed or surprised. With rank 2, you cannot be flanked, denying opponents any flanking attack bonuses against you.</p>"
  },
  {
    name: "Distract",
    category: "General",
    ranked: false,
    fullText: "<p>You can distract opponents using Bluff or Intimidate.</p><p><strong>Mechanics:</strong> As a standard action, make a Bluff or Intimidate check opposed by the target's Sense Motive or Concentration. If you succeed, the target is dazed (unable to take actions, -2 Defense) until the start of your next turn.</p>"
  },
  {
    name: "Lightning Reflexes",
    category: "General",
    ranked: false,
    fullText: "<p>You have exceptionally fast physical reactions.</p><p><strong>Mechanics:</strong> You gain a +2 bonus on all Reflex saving throws.</p>"
  },
  {
    name: "Great Fortitude",
    category: "General",
    ranked: false,
    fullText: "<p>You are exceptionally tough and resilient against physical hazards.</p><p><strong>Mechanics:</strong> You gain a +2 bonus on all Fortitude saving throws.</p>"
  },
  {
    name: "Iron Will",
    category: "General",
    ranked: false,
    fullText: "<p>You have tremendous mental resolve and psychic resistance.</p><p><strong>Mechanics:</strong> You gain a +2 bonus on all Will saving throws.</p>"
  }
];

const ADVANTAGES_LIST = FEATS_LIST;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FEATS_LIST, ADVANTAGES_LIST };
} else {
  window.FEATS_LIST = FEATS_LIST;
  window.ADVANTAGES_LIST = FEATS_LIST;
}