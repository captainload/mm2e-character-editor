const POWER_MODIFIERS_LIST = [
  {
    "name": "Accurate",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 10,
    "fullText": "<p>An effect with this feat is especially accurate; you get +2 on attack rolls made with it per rank of this feat. The campaign’s power level limits maximum attack bonus with any given effect. The GM may choose to waive this limit for Accurate feats acquired via extra effort (given their temporary nature).</p>"
  },
  {
    "name": "Action (Extra)",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "hasRanks": true,
    "maxRanks": 3,
    "tiers": [
      "Rank 1: Standard to Move",
      "Rank 2: Move to Free",
      "Rank 3: Free to Reaction"
    ],
    "fullText": "<p>Decreases the action required to use a power.</p>"
  },
  {
    "name": "Action (Flaw)",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "hasRanks": true,
    "maxRanks": 3,
    "tiers": [
      "Rank 1: Standard to Full-Round",
      "Rank 2: Move to Standard",
      "Rank 3: Free to Move"
    ],
    "fullText": "<p>Increases the action required to use a power.</p>"
  },
  {
    "name": "Action (Free)",
    "cost": 2,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>Decreases the action required to activate or use the power to a Free action.</p>"
  },
  {
    "name": "Action (Move)",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>Decreases the action required to activate or use the power to a Move action.</p>"
  },
  {
    "name": "Action (Reaction)",
    "cost": 3,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>Decreases the action required to activate or use the power to a Reaction in response to a specified trigger.</p>"
  },
  {
    "name": "Action (Standard)",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>Increases the action required to activate or use the power to a Standard action.</p>"
  },
  {
    "name": "Activation (Move)",
    "cost": -1,
    "costType": "flat",
    "category": "flaw",
    "fullText": "<p>Requires a Move action to activate before the power can be used.</p>"
  },
  {
    "name": "Activation (Standard)",
    "cost": -2,
    "costType": "flat",
    "category": "flaw",
    "fullText": "<p>Requires a Standard action to activate before the power can be used.</p>"
  },
  {
    "name": "Affects Corporeal",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>An incorporeal character can use this power on the physical world.</p>"
  },
  {
    "name": "Affects Insubstantial",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 2,
    "tiers": [
      "Rank 1: Half effect",
      "Rank 2: Full effect"
    ],
    "fullText": "<p>An effect with this feat works on insubstantial targets, in addition to having its normal effect on corporeal targets.</p><ul><li><strong>Rank 1:</strong> The power works at half its normal rank against insubstantial targets.</li><li><strong>Rank 2:</strong> The power functions at its full rank against insubstantial targets.</li></ul><p>Sensory effects do not require this feat, since they already affect insubstantial targets.</p>"
  },
  {
    "name": "Alternate Power",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 20,
    "fullText": "<p>This feat provides an additional Alternate Power for an Array or power, a different way in which it can be used (see the Array power structure description for details). You pay 1 power point per Alternate Power feat to acquire an effect or combination of effects with a total cost equal to or less than the primary power. You can only use one alternate power from a container at a time, switching between them as a free action once per round.</p><p>Alternate Power is also usable via extra effort, temporarily reconfiguring an existing power into a stunt.</p>"
  },
  {
    "name": "Alternate Power (Dynamic)",
    "cost": 2,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 20,
    "fullText": "<p>A Dynamic Alternate Power allows you to share and allocate power points between it and any other dynamic powers in the container or array. You can distribute the pool of available power points among your dynamic powers as a free action once per round, adjusting their respective ranks proportionally according to their point costs.</p>"
  },
  {
    "name": "Affects Objects",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>Powers that normally only affect living creatures can affect objects.</p>"
  },
  {
    "name": "Affects Others",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>You can grant a personal power to someone else by touching them.</p>"
  },
  {
    "name": "Alternate Save",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>The power requires a different saving throw than usual.</p>"
  },
  {
    "name": "Area",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>The power affects an area rather than a single target.</p>"
  },
  {
    "name": "Aura",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>The power surrounds your body. Anyone touching you or striking you in melee suffers the effect.</p>"
  },
  {
    "name": "Autofire",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "hasRanks": true,
    "maxRanks": 3,
    "tiers": [
      "Rank 1: Max +5 bonus",
      "Rank 2: Max +10 bonus",
      "Rank 3: Unlimited bonus"
    ],
    "fullText": "<p>You can hit the target multiple times, increasing the damage if you aim well.</p>"
  },
  {
    "name": "Castling",
    "cost": 1,
    "costType": "flat",
    "category": "extra",
    "fullText": "<p>You and a willing subject within your teleport range instantly trade places when you activate this power.</p>"
  },
  {
    "name": "Chained",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>Your power depends on the success of another action to manifest. You cannot use the Chained power if you did not succeed in using the prerequisite in your previous turn.</p>",
    "book": "Mecha & Manga"
  },
  {
    "name": "Change Direction",
    "cost": 1,
    "costType": "flat",
    "category": "extra",
    "fullText": "<p>You can change your facing or orientation after a movement or teleportation action, allowing you to face any direction when arriving at your destination.</p>"
  },
  {
    "name": "Change Velocity",
    "cost": 1,
    "costType": "flat",
    "category": "extra",
    "fullText": "<p>You arrive “at rest” when you teleport or move. Among other things, this allows you to teleport out of a free fall and suffer no impact or falling damage.</p>"
  },
  {
    "name": "Charge Power",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>A power with this flaw needs time to charge, and it may activate only partially if the charge is not complete. You must spend subsequent actions charging up to the power's total ranks.</p>",
    "book": "Mecha & Manga"
  },
  {
    "name": "Check Required",
    "cost": -1,
    "costType": "flat",
    "category": "flaw",
    "hasRanks": true,
    "maxRanks": 10,
    "fullText": "<p>You must make a skill or ability check to use the power successfully.</p>"
  },
  {
    "name": "Close",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>Reduces a ranged power to close (touch) range, requiring you to touch or enter melee combat with the target to affect them.</p>"
  },
  {
    "name": "Combo Element",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "book": "Mecha & Manga",
    "fullText": "<p>You can use a power as a step towards a devastating final result. If the power works successfully against its target, you are granted a certain number of combo points. These combo points can only be used to activate a Combo Finish power. You cannot assign this power feat to powers with a Personal range.</p>"
  },
  {
    "name": "Concentration",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>Decreases duration to Concentration.</p>"
  },
  {
    "name": "Conductor",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>Designate a medium through which the power can be transmitted. The power can travel in any direction and through any obstacle up to a range of (power rank x5) feet.</p>",
    "book": "Mecha & Manga"
  },
  {
    "name": "Conduit",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>You need to synch with another individual who has a requisite but not the knowledge to manifest a power. Conduit must be within Ranged distance (-1) or Touch (-2).</p>",
    "book": "Mecha & Manga"
  },
  {
    "name": "Contagious",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>The power spreads to others who touch the target.</p>"
  },
  {
    "name": "Corrupting",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "book": "Warriors & Warlocks",
    "fullText": "<p>Using Sorcery opens a caster to outside influences that change, warp, and corrupt his very soul. Each use threatens to darken the sorcerer until such time as they succumb entirely to such baleful forces. Each time a natural “1” or natural “20” is rolled, either case, to resist the Fatigue effect of their casting efforts, the character earns a villain point. A player may spend a hero point to get rid of villain points on a one-to-one basis. A character that accumulates a number of villain points equal to his Power Level is taken out of play and is considered an NPC under control of the Gamemaster thereafter.</p>"
  },
  {
    "name": "Continuous",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>Increases a sustained power's duration to continuous (+1 PP/rank); it remains in effect even when you are stunned or unconscious. This is the Core Rulebook's standalone version of the Ultimate Power <strong>Duration</strong> extra (1 step for Sustained &rarr; Continuous at +1 PP/rank).</p>"
  },
  {
    "name": "Decreased Duration (Concentration)",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>Decreases the power’s duration to Concentration, requiring a standard action each round to maintain.</p>"
  },
  {
    "name": "Decreased Duration (Instant)",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>Decreases the power’s duration to Instant.</p>"
  },
  {
    "name": "Decreased Duration (Sustained)",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>Decreases the power’s duration from Continuous to Sustained.</p>"
  },
  {
    "name": "Dimensional",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 3,
    "tiers": [
      "Rank 1: Single other dimension",
      "Rank 2: Related group of dimensions",
      "Rank 3: Any dimension"
    ],
    "fullText": "<p>This feat allows an effect to work on targets in another dimension (if any exist in the campaign). You affect your proximate location in the other dimension as if you were actually there, figuring range modifiers from that point.</p><ul><li><strong>Rank 1:</strong> You can affect a single specific other dimension (such as the Astral Plane or the Netherworld).</li><li><strong>Rank 2:</strong> You can affect any of a related group of dimensions (such as mystic dimensions, elemental planes, or parallel timelines).</li><li><strong>Rank 3:</strong> You can affect any dimension in the setting.</li></ul>"
  },
  {
    "name": "Diminished Range",
    "cost": -1,
    "costType": "flat",
    "category": "flaw",
    "hasRanks": true,
    "maxRanks": 3,
    "fullText": "<p>Each rank of Diminished Range reduces your power’s range increments by one step down the range progression (e.g. standard 25/50/100 ft. becomes 10/25/50 ft. at rank 1, 5/10/25 ft. at rank 2, and 2/5/10 ft. at rank 3). You cannot reduce a power's range below rank 3.</p>"
  },
  {
    "name": "Disease",
    "cost": 2,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>The power's effect is treated as a disease.</p>"
  },
  {
    "name": "Disruption",
    "cost": -1,
    "costType": "flat",
    "category": "flaw",
    "book": "Book of Magic",
    "fullText": "<p>This power drawback represents less than perfect control over the affected power. If you fail a Concentration check to use or maintain the power, something goes wrong. The power doesn’t just fail to work or stop working, it “misfires” in some way (a Blast hits a random target, a Summon calls something unexpected). The exact effect is up to the GM, based on the original power and the nature of the disruption.</p>"
  },
  {
    "name": "Distracting",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>You lose your dodge bonus to Defense when using this power.</p>"
  },
  {
    "name": "Duration (Extra)",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "hasRanks": true,
    "maxRanks": 3,
    "tiers": [
      "Rank 1 (+1/r): Increases duration by 1 step (e.g. Sustained to Continuous, Concentration to Sustained, Instant to Concentration)",
      "Rank 2 (+2/r): Increases duration by 2 steps (e.g. Concentration to Continuous, Instant to Sustained)",
      "Rank 3 (+3/r): Increases duration by 3 steps (Instant to Continuous)"
    ],
    "fullText": "<p>Increases the duration of an effect by one step along the progression track (Instant &rarr; Concentration &rarr; Sustained &rarr; Continuous) per rank of this extra (+1 PP/rank per rank).</p><p><em>Rule Note: For a <strong>Sustained</strong> power, upgrading to Continuous is exactly <strong>1 step</strong> (Rank 1 = +1 PP/rank). It is functionally and mathematically identical to the Core Rulebook's standalone <strong>Continuous</strong> extra (+1 PP/rank).</em></p>"
  },
  {
    "name": "Duration (Flaw)",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "hasRanks": true,
    "maxRanks": 3,
    "tiers": [
      "Rank 1: Continuous to Sustained",
      "Rank 2: Sustained to Concentration",
      "Rank 3: Concentration to Instant"
    ],
    "fullText": "<p>Decreases the duration of a power.</p>"
  },
  {
    "name": "Easy",
    "cost": 1,
    "costType": "flat",
    "category": "extra",
    "fullText": "<p>You are not disoriented when making full-round extended movements or teleports; you retain your dodge bonus to Defense for the round after arriving at your destination.</p>"
  },
  {
    "name": "Extended",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 20,
    "fullText": "<p>For sensory effects, each rank increases the range increment of the sense by a factor of 10. For example, a sense that normally suffers a –1 Notice penalty per 10 feet has a –1 penalty per 100 feet at rank 1, per 1,000 feet at rank 2, and so forth.</p><p>For movement effects (such as Teleport), each rank allows you to move massive distances along the Extended Range Table as a full-round action.</p>"
  },
  {
    "name": "Extended Range",
    "cost": 1,
    "costType": "flat",
    "category": "extra",
    "hasRanks": true,
    "maxRanks": 10,
    "fullText": "<p>Each rank of Extended Range doubles your power’s range increments (moving the short, medium, and long range distances one step up the range progression). For example, a power with base range 25/50/100 ft. becomes 50/100/250 ft. with 1 rank, 100/250/500 ft. with 2 ranks, and so forth.</p>"
  },
  {
    "name": "Fades",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>The power loses effectiveness each time you use it.</p>"
  },
  {
    "name": "Feedback",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>You suffer damage when your power's manifestation is attacked.</p>"
  },
  {
    "name": "Full Power",
    "cost": -1,
    "costType": "flat",
    "category": "flaw",
    "fullText": "<p>You cannot voluntarily use the power at less than its maximum rank.</p>"
  },
  {
    "name": "Grab-Based",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>You must successfully grapple a target before you can use this power on them.</p>"
  },
  {
    "name": "Homing",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 10,
    "fullText": "<p>This power feat gives a ranged attack effect the ability to home in on its target. If your attack roll with the effect misses, it gets another attack roll against the target on the following round, at the start of your turn. You make this second attack roll with your normal attack bonus, but with no modifiers for action or range. You do not need to take any action to guide the homing attack, and can take your normal turn while it homes in on the target. If the attack hits, it inflicts its normal effect. If it misses, it is spent and has no further effect. Each additional rank of Homing grants one additional attack roll on a subsequent round (up to a maximum of rank rounds).</p>"
  },
  {
    "name": "Impassable Counter",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>Even if your power proves too weak to counter another power completely, it still provides a small degree of protection by sapping the energy from the attack it failed to counter.</p>",
    "book": "Mecha & Manga"
  },
  {
    "name": "Improved Critical",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 4,
    "fullText": "<p>Increase the threat range for a critical hit with the effect by 1 per rank of this feat (a threat range of 19–20 with one rank, 18–20 with two ranks, and so on, up to a maximum threat range of 16–20 at rank 4). A critical hit inflicts +5 damage or +5 to the save DC.</p>"
  },
  {
    "name": "Improved Range",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 3,
    "fullText": "<p>Each rank of this feat increases the range increments of a ranged effect by 50%. One rank increases the increment to ×37.5 ft. (short), ×75 ft. (medium), and ×150 ft. (long). Two ranks increase the increments to ×50 ft., ×100 ft., and ×200 ft. (doubling the effect’s normal range increments). Three ranks increase them to ×62.5 ft., ×125 ft., and ×250 ft.</p>"
  },
  {
    "name": "Inaccurate",
    "cost": -1,
    "costType": "flat",
    "category": "flaw",
    "hasRanks": true,
    "maxRanks": 10,
    "fullText": "<p>The power is wildly inaccurate.</p>"
  },
  {
    "name": "Increased Duration (Concentration)",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>Increases the power’s duration from Instant to Concentration.</p>"
  },
  {
    "name": "Increased Duration (Continuous)",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>Increases the power’s duration to Continuous (+1 PP/rank per step of increase; e.g. +1/r from Sustained, +2/r from Concentration, +3/r from Instant). The effect remains active even if you are stunned or rendered unconscious.</p>"
  },
  {
    "name": "Increased Duration (Sustained)",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>Increases the power’s duration to Sustained, requiring only a free action each round to maintain.</p>"
  },
  {
    "name": "Increased Range",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "hasRanks": true,
    "maxRanks": 2,
    "tiers": [
      "Rank 1: Close to Ranged",
      "Rank 2: Ranged to Perception"
    ],
    "fullText": "<p>Increases the operational range of a power by one step per rank: from Personal to Touch/Close, from Touch/Close to Ranged, or from Ranged to Perception range.</p>"
  },
  {
    "name": "Incurable",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "fullText": "<p>Damage or other effects caused by an effect with this feat cannot be treated or healed with the Healing or Regeneration effects; they must recover on their own through normal rest and medical treatment. Effects with the Persistent feat can still heal damage caused by an Incurable effect.</p>"
  },
  {
    "name": "Independent",
    "cost": 0,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>The power maintains itself once activated but fades.</p>"
  },
  {
    "name": "Impassable Counter",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "book": "Mecha & Manga",
    "fullText": "<p>Even if your power proves too weak to counter another power completely, it still provides a small degree of protection by sapping the energy from the attack it failed to counter. When you fail to counter a power, the amount by which your attacker’s power check result exceeded yours is the attacking power’s maximum rank limit. If this limit is lower than the attacking power's rank, its effect is reduced accordingly. This extra can apply to the Nullify power.</p>"
  },
  {
    "name": "Indirect",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 3,
    "tiers": [
      "Rank 1: Fixed point away from you, fixed direction",
      "Rank 2: Any point away from you, any direction",
      "Rank 3: Any point, any direction, can change direction in flight"
    ],
    "fullText": "<p>A ranged effect with this feat can originate from a point other than the user, bypassing cover and concealment and potentially catching targets off-guard (striking from behind, above, etc.).</p><ul><li><strong>Rank 1:</strong> The effect can originate from any point away from you, traveling in a fixed direction (such as straight up from the ground or down from above).</li><li><strong>Rank 2:</strong> The effect can originate from any point away from you and travel in any direction.</li><li><strong>Rank 3:</strong> The effect can originate from any point, travel in any direction, and change direction in flight (such as curving around corners or barriers).</li></ul>"
  },
  {
    "name": "Innate",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "fullText": "<p>An effect with this feat is an inborn or inherent trait, such as an alien species’ natural abilities or an automaton’s physical construction. An Innate effect cannot be nullified or countered by any outside force, power, or device. It can still be drained or affected by other traits.</p>"
  },
  {
    "name": "Learned Caster",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "book": "Warriors & Warlocks",
    "fullText": "<p>Through great experience and practice, you have learned how to apply the meditative or other secrets of your occult knowledge to assist you in dealing with the deleterious costs of your power. Substitute your bonus for Knowledge (arcane lore) [or other associated control skill chosen when this extra is selected] when making the required save against Fatigue for Sorcery.</p>"
  },
  {
    "name": "Limited",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>The power only works under specific conditions, against specific targets, or has half its normal utility.</p>"
  },
  {
    "name": "Linked",
    "cost": 0,
    "costType": "flat",
    "category": "extra",
    "fullText": "<p>Two or more powers are linked and always operate together as a single action.</p>"
  },
  {
    "name": "Long-Range",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>You can only use your movement or teleportation effect across your extended range distance as a full-round action. You cannot make short-range tactical teleports or movements as a move action.</p>"
  },
  {
    "name": "Medium",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>You require a specific medium to use your power (such as electrical or telephone wires, root structures, waterways, shadows, flames, mirrors, etc.). You can only project from and to locations where your medium exists.</p>"
  },
  {
    "name": "Mighty",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "fullText": "<p>You apply your Strength bonus to the effect’s damage or save DC, just like a normal melee attack. This applies only to touch range damage effects (such as Strike) or effects that specifically allow it. Your total damage bonus (effect rank plus Strength bonus) cannot exceed the campaign’s power level limit.</p>"
  },
  {
    "name": "No Attack Roll",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "hasRanks": false,
    "book": "House Rule",
    "fullText": "<p>The attack power does not require an attack roll to hit its target (the target only receives a saving throw to resist), while keeping the power within its normal operational range (such as standard Ranged distance increments). This replaces the attack-roll-bypassing aspect of Perception range without granting infinite perception distance.</p>"
  },
  {
    "name": "No Saving Throw",
    "cost": 2,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>The power does not allow a saving throw.</p>"
  },
  {
    "name": "Noticeable",
    "cost": -1,
    "costType": "flat",
    "category": "flaw",
    "fullText": "<p>A continuous or sustained power that is normally subtle is instead highly noticeable.</p>"
  },
  {
    "name": "Overwhelming Counter",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>When you successfully counter a power, the excess energy surges towards the attacker. For every two points by which your power check exceeds your attacker’s, one rank of the power you used to counter targets your attacker.</p>",
    "book": "Mecha & Manga"
  },
  {
    "name": "Penetrating",
    "cost": 1,
    "costType": "flat",
    "category": "extra",
    "hasRanks": true,
    "maxRanks": 20,
    "fullText": "<p>The power ignores Impervious Toughness.</p>"
  },
  {
    "name": "Perception Range",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>The power operates at Perception range: anywhere you can accurately perceive the target with an accurate sense (such as normal sight), with no range penalties and no attack roll required for attack powers.</p>"
  },
  {
    "name": "Physically Demanding",
    "cost": 0,
    "costType": "per_rank",
    "category": "flaw",
    "book": "Warriors & Warlocks",
    "fullText": "<p>Instead of channeling power through force of will, the caster draws the energy to power spells through raw physical stamina. Instead of a Will save, casters with this flaw on their Sorcery power make a Fortitude save to resist fatigue. This is a net -0 modifier.</p>"
  },
  {
    "name": "Permanent",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>A continuous power is permanently active and cannot be deactivated, nor can you use Extra Effort with it.</p>"
  },
  {
    "name": "Personal",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>Reduces a touch power's range to personal only.</p>"
  },
  {
    "name": "Poison",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>The power requires a secondary save 1 minute later.</p>"
  },
  {
    "name": "Precise",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "fullText": "<p>You can use an effect with this feat to perform tasks requiring fine manipulation or control. This can include picking locks, typing on a keyboard, performing delicate surgical incisions, or doing artistic calligraphy. It allows effects that normally only affect whole targets to affect small parts, such as carving a small hole in a wall or trimming someone’s hair.</p>"
  },
  {
    "name": "Progression",
    "cost": 1,
    "costType": "flat",
    "category": "extra",
    "hasRanks": true,
    "maxRanks": 20,
    "fullText": "<p>Moves one step up the progression table for the power's effect (mass, area, range, targets, duration, etc.).</p>"
  },
  {
    "name": "Progression (Area)",
    "cost": 1,
    "costType": "flat",
    "category": "extra",
    "hasRanks": true,
    "maxRanks": 20,
    "fullText": "<p>Each rank moves the area of your power one step up the Time and Value Progression Table.</p>"
  },
  {
    "name": "Progression (Duration)",
    "cost": 1,
    "costType": "flat",
    "category": "extra",
    "hasRanks": true,
    "maxRanks": 20,
    "fullText": "<p>Each rank moves the duration of your power one step up the Time and Value Progression Table.</p>"
  },
  {
    "name": "Progression (Mass)",
    "cost": 1,
    "costType": "flat",
    "category": "extra",
    "hasRanks": true,
    "maxRanks": 20,
    "fullText": "<p>Each rank moves the mass or weight you can affect or carry one step up the Time and Value Progression Table.</p>"
  },
  {
    "name": "Progression (Range)",
    "cost": 1,
    "costType": "flat",
    "category": "extra",
    "hasRanks": true,
    "maxRanks": 20,
    "fullText": "<p>Each rank moves the range of your power one step up the Time and Value Progression Table.</p>"
  },
  {
    "name": "Progression (Targets)",
    "cost": 1,
    "costType": "flat",
    "category": "extra",
    "hasRanks": true,
    "maxRanks": 20,
    "fullText": "<p>Each rank increases the number of subjects or targets you can affect along the progression table.</p>"
  },
  {
    "name": "Range (Extra)",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "hasRanks": true,
    "maxRanks": 2,
    "tiers": [
      "Rank 1: Touch to Ranged",
      "Rank 2: Ranged to Perception"
    ],
    "fullText": "<p>Increases the range of a power.</p>"
  },
  {
    "name": "Range (Flaw)",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "hasRanks": true,
    "maxRanks": 2,
    "tiers": [
      "Rank 1: Perception to Ranged",
      "Rank 2: Ranged to Touch"
    ],
    "fullText": "<p>Decreases the range of a power.</p>"
  },
  {
    "name": "Ranged",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>Converts a touch or close range power into a ranged power (with standard range increments of rank × 25 ft. / rank × 50 ft. / rank × 100 ft.).</p>"
  },
  {
    "name": "Reach",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 20,
    "fullText": "<p>Each rank of this power feat extends your reach with a touch range effect by 5 feet. So Reach 1 allows you to affect a target 10 feet away without having to move into their space, Reach 2 allows you to affect a target 15 feet away, and so on. This feat can be acquired multiple times.</p>"
  },
  {
    "name": "Reaction",
    "cost": 3,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>The power functions automatically as a reaction in response to a specified trigger.</p>"
  },
  {
    "name": "Reduced Range",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "hasRanks": true,
    "maxRanks": 2,
    "tiers": [
      "Rank 1: Perception to Ranged",
      "Rank 2: Ranged to Touch"
    ],
    "fullText": "<p>Decreases the operational range of a power by one step per rank: from Perception to Ranged, or from Ranged to Touch/Close range.</p>"
  },
  {
    "name": "Require Material",
    "cost": -1,
    "costType": "flat",
    "category": "flaw",
    "fullText": "<p>You require a specific material component to use this power.</p>"
  },
  {
    "name": "Requires Constant Study",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "book": "Warriors & Warlocks",
    "fullText": "<p>Your spellcrafting tradition is even more complicated than most. You must carefully study your spells before casting them, and your formulae are too complex to maintain more than a small number in memory at once. In terms of game mechanics, you cannot power stunt off of your Wizardry array. Whatever Alternate Power choices you already have listed are all that are available to you during play.</p>"
  },
  {
    "name": "Resistible",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>A power that normally doesn't allow a saving throw now allows one.</p>"
  },
  {
    "name": "Reversible",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "fullText": "<p>You can remove the effects of your power at will as a free action, restoring the target to its normal state, so long as the target is within your normal range. For example, a character who petrifies a target into stone or transforms someone into a frog can restore the target back to flesh and blood, or a character who blinds a target with Dazzle can restore their sight before the duration expires.</p>"
  },
  {
    "name": "Ricochet",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 10,
    "fullText": "<p>You can bounce a ranged attack off one or more solid surfaces to change its direction, allowing you to hit a target around a corner or behind cover. Each rank in this feat allows you to bounce the attack off one surface. You must still have a line of sight to the surface you are bouncing off of, but you do not need line of sight to the target, only an awareness of where they are. The bouncing attack does not suffer a penalty for cover, but normal concealment modifiers apply.</p>"
  },
  {
    "name": "Secondary Effect",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>The target suffers the full effect of the power again on the round following the initial attack.</p>"
  },
  {
    "name": "Sedation",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "fullText": "<p>When you render a target unconscious with an attack having this feat, you can choose to keep the target sedated and unconscious for an extended period. The target remains unconscious for an hour per rank in the effect, rather than waking up in a few minutes or rounds. The target can still be awakened by loud noises, physical shaking, or taking damage.</p>"
  },
  {
    "name": "Selective Attack",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>You can choose who in an Area is affected by your power.</p>"
  },
  {
    "name": "Sense-Dependent",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>The target must be able to perceive the effect with a specific sense to be affected.</p>"
  },
  {
    "name": "Short-Range",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>You can only make short-range tactical movements or teleports as a move action; you cannot make extended-range movements or teleports.</p>"
  },
  {
    "name": "Side-Effect",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "hasRanks": true,
    "maxRanks": 2,
    "tiers": [
      "Rank 1: Happens on failure",
      "Rank 2: Happens always"
    ],
    "fullText": "<p>Using the power triggers a detrimental effect on you.</p>"
  },
  {
    "name": "Sleep",
    "cost": 0,
    "costType": "flat",
    "category": "extra",
    "fullText": "<p>An effect that normally causes unconsciousness causes the target to fall asleep.</p>"
  },
  {
    "name": "Slow Fade",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 10,
    "fullText": "<p>Effects that fade over time (such as those with the Fades flaw or effects like Drain or Transfer) normally recover or fade at a rate of 1 point per round. Each rank of this feat moves the fade rate one step down the Time and Value Progression Table: 1 point every 20 seconds (2 rounds) at rank 1, 1 point per minute (10 rounds) at rank 2, 1 point every 5 minutes at rank 3, 1 point every 20 minutes at rank 4, 1 point per hour at rank 5, 1 point per 5 hours at rank 6, 1 point per day at rank 7, and so on.</p>"
  },
  {
    "name": "Split Attack",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 5,
    "fullText": "<p>You can split a single attack effect among two or more targets within your normal range. Each rank of this feat allows you to split the attack once, adding one additional target (up to a maximum number of targets equal to the effect’s rank). You divide the effect’s ranks between the targets however you wish, making a separate attack roll for each target. No single target can receive less than 1 rank of the effect. For example, a rank 10 Blast with Split Attack 1 can be used as two rank 5 Blasts, or one rank 7 and one rank 3 Blast.</p>"
  },
  {
    "name": "Subtle",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 2,
    "tiers": [
      "Rank 1: Notice DC 20 to detect",
      "Rank 2: Completely undetectable"
    ],
    "fullText": "<p>An effect with this feat is difficult or impossible to detect with sensory effects.</p><ul><li><strong>Rank 1:</strong> The effect is subtle enough to require a Notice check (DC 20) for someone to detect that it is being used or has been used.</li><li><strong>Rank 2:</strong> The effect is completely undetectable by normal senses; only characters with the appropriate sensory Super-Senses (such as Magic Awareness, Mental Awareness, or Power Awareness) can detect it.</li></ul>"
  },
  {
    "name": "Sustained",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>Increases a concentration power's duration to sustained.</p>"
  },
  {
    "name": "Targeted",
    "cost": 0,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>An Area effect requires an attack roll against a specific target to originate the area on them.</p>"
  },
  {
    "name": "Tether",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "fullText": "<p>An effect with this feat creates an elastic tether or line connecting you to the target or object. You can use the tether to pull yourself towards the target or pull the target towards you (requiring an opposed Strength check for unwilling targets), or reel in or swing from the object. The tether has a Toughness save bonus equal to the effect rank and can be broken with an attack that overcomes its Toughness.</p>"
  },
  {
    "name": "Thrown",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "fullText": "<p>You can throw a touch range effect (such as Strike) as a ranged attack. The effect has a range increment equal to (rank × 10 feet) plus your Strength bonus × 5 feet. You make a normal ranged attack roll. Once thrown, the effect is expended until you retrieve the weapon or re-manifest the power.</p>"
  },
  {
    "name": "Tiring",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>You suffer a level of fatigue every time you use this power.</p>"
  },
  {
    "name": "Total Fade",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>Used with the Fades flaw or Independent extra.</p>"
  },
  {
    "name": "Touch",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>Reduces a ranged power's range to touch/close.</p>"
  },
  {
    "name": "Triggered",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 5,
    "fullText": "<p>You can prepare the effect to activate under a particular triggering condition (such as a word, movement, proximity, or specific event) rather than taking effect immediately. Setting the trigger is a standard action (or the effect’s normal action, whichever is greater). When the specified condition occurs, the effect activates automatically with no action required from you. The effect can be noticed with a Search or Notice check (DC 10 + effect rank) before it goes off, and can be disarmed with a Disable Device check against the same DC. Each additional rank in this feat allows you to set one additional triggered application or choose an additional triggering condition.</p>"
  },
  {
    "name": "Turnabout",
    "cost": 1,
    "costType": "flat",
    "category": "extra",
    "fullText": "<p>You can teleport or move, take a standard action (such as an attack or skill check), and teleport or move back to your starting point in a single round, so long as the total distance traveled does not exceed your maximum range.</p>"
  },
  {
    "name": "Unreliable",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>The power only works part of the time.</p>"
  },
  {
    "name": "Vampiric",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>When you damage a target with this power, you heal a damage condition yourself.</p>"
  },
  {
    "name": "Variable Descriptor",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 2,
    "tiers": [
      "Rank 1: Narrow group of descriptors",
      "Rank 2: Any descriptor"
    ],
    "fullText": "<p>You can change the descriptor of an effect on the fly as a free action when you use it.</p><ul><li><strong>Rank 1:</strong> You can change the descriptor among a narrow group of related descriptors (such as different energy types like fire, cold, and electricity, or different elemental types like earth, air, fire, and water).</li><li><strong>Rank 2:</strong> You can change the descriptor to any descriptor of a broad type (such as any energy descriptor, any physical descriptor, or any biological descriptor).</li></ul>"
  },
  {
    "name": "Veteran Caster",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "book": "Warriors & Warlocks",
    "fullText": "<p>You are a highly experienced caster. Through intensive practice, you have made even the massively complex workings of your chosen spell constructs practically reflexive. You do not lose your Dodge bonus during the round in which you cast a Wizardry spell.</p>"
  },
  {
    "name": "Action (Full-Round)",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>Increases the action required to activate or use the power from a standard action to a full-round action.</p>"
  },
  {
    "name": "Area (Burst)",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>The power affects an entire area in a burst expanding out in all directions from the target point with a radius of (rank × 5) feet. Targets caught in the burst make a Reflex save for half effect (or to avoid the effect).</p>"
  },
  {
    "name": "Attack",
    "cost": 0,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>This modifier applies only to personal range effects. It turns the effect into a melee attack requiring a standard action and a successful melee attack roll. The target gets a saving throw against the effect as if it were an attack power of the same type. With the Ranged extra, the attack can be used at range.</p>"
  },
  {
    "name": "Blending",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>You “blend” into the background like a chameleon. Your Concealment only functions as long as you move no faster than normal pace (up to 30 feet per round).</p>"
  },
  {
    "name": "Conscious",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>Your controlled subject remains conscious and aware, but is completely obedient to your commands. This allows the subject to use their own skills, knowledge, and abilities in carrying out your orders.</p>"
  },
  {
    "name": "Duration (Continuous)",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>Increases a sustained power's duration to continuous; it remains in effect even when you are stunned or unconscious.</p>"
  },
  {
    "name": "Duration (Sustained)",
    "cost": 0,
    "costType": "flat",
    "category": "extra",
    "fullText": "<p>Modifies the duration of a permanent or concentration power to sustained, requiring only a free action each round to maintain. When applied to permanent effects (such as Protection for Force Field), this is a net +0 modifier.</p>"
  },
  {
    "name": "Easy to Lose",
    "cost": -2,
    "costType": "removable",
    "category": "flaw",
    "fullText": "<p>The power is contained within an item or device that is easy to lose or disarm in combat, such as a handheld weapon, wand, or gadget. Provides a discount of 2 power points per 5 points of device traits.</p>"
  },
  {
    "name": "Entangle",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>Your power cannot inflict more than an entangled result (–2 attack, –4 Dex, half speed) and cannot render targets bound or helpless.</p>"
  },
  {
    "name": "Hard to Lose",
    "cost": -1,
    "costType": "removable",
    "category": "flaw",
    "fullText": "<p>The power is contained within an item or device that is hard to lose or remove in combat, such as armor, a battlesuit, worn harness, or cybernetics. Provides a discount of 1 power point per 5 points of device traits.</p>"
  },
  {
    "name": "Impervious",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>Your defense stops some attacks completely. If an incoming attack has a damage bonus (or effect rank) less than or equal to your Impervious rank, it inflicts no harm and you make no saving throw.</p>"
  },
  {
    "name": "Improved Initiative",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 20,
    "fullText": "<p>You get a +4 bonus on initiative checks per rank of this feat.</p>"
  },
  {
    "name": "Limited to Objects",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>The power affects only inanimate objects, having no effect on living creatures or characters.</p>"
  },
  {
    "name": "Metamorph",
    "cost": 1,
    "costType": "flat",
    "category": "feat",
    "hasRanks": true,
    "maxRanks": 10,
    "fullText": "<p>You have an alternate set of character traits for an assumed form. You can switch between your true form and your alternate form(s) as a free action once per round.</p>"
  },
  {
    "name": "Others Only",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>The power can only be used on or granted to others; you cannot use it to benefit or affect yourself.</p>"
  },
  {
    "name": "Partial",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>Your power provides only partial effect (for example, partial concealment providing a 20% miss chance rather than total concealment's 50% miss chance).</p>"
  },
  {
    "name": "Range (Touch)",
    "cost": -1,
    "costType": "per_rank",
    "category": "flaw",
    "fullText": "<p>Reduces a ranged power to touch (melee) range, requiring you to touch the target to affect them.</p>"
  },
  {
    "name": "Redirection",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>You can redirect blocked attacks at any target within the attack’s normal range. You must have the Reflection extra to take Redirection.</p>"
  },
  {
    "name": "Reflection",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>You can reflect blocked attacks back at the attacker as a free action. Make a normal attack roll to hit with the reflected attack.</p>"
  },
  {
    "name": "Sensory Link",
    "cost": 1,
    "costType": "per_rank",
    "category": "extra",
    "fullText": "<p>You can perceive everything one of your subjects perceives while the power is in effect.</p>"
  },
  {
    "name": "True Resurrection",
    "cost": 1,
    "costType": "flat",
    "category": "extra",
    "fullText": "<p>Your Resurrection power does not require a body or remains in order to restore life to the deceased.</p>"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { POWER_MODIFIERS_LIST };
}
