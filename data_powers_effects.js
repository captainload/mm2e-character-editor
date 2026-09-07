// Mutants & Masterminds 2nd Edition - Base Effects List
// Contains canonical Base Effects from Ultimate Power Chapter Two and official supplements (Mecha & Manga, Book of Magic, Warriors & Warlocks).
// Pre-built Powers / Profiles are defined in data_powers_profiles.js and attached via hook.

const POWER_EFFECTS_LIST = [
  {
    "name": "(Martial Arts) Stance",
    "type": "Alteration",
    "action": "Free",
    "range": "Personal",
    "duration": "Varies",
    "savingThrow": "None",
    "baseCost": 5,
    "book": "Mecha & Manga",
    "fullText": "<p>You have learned the secrets of a form of martial arts, which teaches you how to stand, how to breathe, and how to move in order to exploit your potential to its fullest.</p>\n<p>You have 5 power points per (Martial Arts) Stance rank to apply to powers and feats related to your stance. Once you choose your (Martial Arts) Stance’s traits, they are fixed and do not change. Powers included in the stance that are not Instant or Permanent must all have the same duration, which determines how long you’re able to maintain your stance. Instant powers are only usable while you maintain the stance, unless they are meant to increase the ranks of powers you already have outside the stance. Instant powers can add features to powers you already have outside the stance, via the Linked extra. If your stance includes feats, you only enjoy their benefits while maintaining the stance. See Chapter 4: Martial Arts for more details about Martial Arts Stances and examples of different stances.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Weapon-Dependent (–1): Choose a single type of weapon, such as straight swords, staves, nunchaku, spears, etc. Your style’s balance and form depend on how this weapon complements your body, so you can only assume your Martial Arts Stance when wielding the chosen weapon. For the purpose of this flaw, “unarmed” doesn’t count as a weapon.</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Alternate Powers: You can only maintain a single stance at a time, but you can learn any other stance with an equal or lesser cost as an Alternate Power feat of the first (switching between stances is a free action once per round). Switching or abandoning a stance cancels the bonuses accrued by an opponent using the Break the Style feat. You cannot create an alternate stance with the same powers as the original stance for the sole purpose of foiling the Break the Style feat.</p>\n<p>• Unreadable: Your stance flows like water to adapt to your enemies’ attempts to read you. When you buy this power feat, the Assessment and Break the Style feats don’t work on you while you’re in this stance.</p>\n<p><strong>POWER DRAWBACKS</strong></p>\n<p>• Fixed Stance: If your Martial Arts Stance includes a feat that allows you to shift your combat bonuses dynamically (Accurate Attack, All-Out Attack, Defensive Attack, Power Attack, or the new Withstand Damage), choosing this drawback forces you to decide upon a single fixed bonus and penalty for all of them. Whenever you adopt this stance, the fixed bonus and penalty come into effect automatically, and you cannot use the feat to shift them dynamically, even if you have the feat outside your Martial Arts Stance (you can use it normally when you’re not in your Martial Arts Stance).</p>",
    "specificFlaws": [
      {
        "name": "Weapon-Dependent (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Weapon-Dependent (–1): Choose a single type of weapon. You can only assume your Martial Arts Stance when wielding the chosen weapon."
      }
    ],
    "specificFeats": [
      {
        "name": "Alternate Powers",
        "cost": 1,
        "costType": "flat",
        "desc": "Alternate Powers: You can learn any other stance with equal or lesser cost as an Alternate Power feat (switching is a free action once per round)."
      },
      {
        "name": "Unreadable",
        "cost": 1,
        "costType": "flat",
        "desc": "Unreadable: The Assessment and Break the Style feats don't work on you while you're in this stance."
      }
    ]
  },
  {
    "name": "Additional Limbs",
    "type": "Alteration",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Permanent",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You have one or more additional limbs, such as arms, legs, tentacles, or a prehensile tail. You have one extra limb at rank 1. Each additional rank moves the number of extra limbs one step up the Time and Value Progression Table. Additional Limbs do not allow you to take extra actions in a round, although they do provide the benefits of the Improved Grapple feat (see page 62) and may make you more resistant to trip attacks (if they make your stance more stable, see Trip, page 159). All limbs except your dominant limb are considered your “off-hand.” If you have the Ambidexterity feat, you have no off-hand penalties with any of your limbs.</p>"
  },
  {
    "name": "Anatomic Separation",
    "type": "Alteration",
    "action": "Move (active)",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 2,
    "fullText": "<p>You can split off parts of your body and keep all of the parts functioning relatively normally. The process of separation causes you no harm, although it can be disconcerting to watch. You can split off a number of segments equal to your power rank; so rank 1 might allow you to detach a hand, arm, or foot (or even your head). Rank 5 could allow you to detach all your limbs (including your head), and so forth. You choose how you separate when you acquire the power and it cannot be changed. Separating your segments, or reassembling them, requires a move action.</p>\n<p>Your separate parts remain fully functional, so you can see out of a separated eye, manipulate things with a separated hand, and so forth. Separated parts are limited to whatever movement their form allows, so a hand can crawl and a leg can hop, for example, an eyeball can even roll, but a separated head or torso isn’t capable of much movement. You can use movement powers (such as Flight) in conjunction with your separated parts. Separate parts have modifiers based on their size (see Size, page 34).</p>\n<p>Each segment gets a move action each round, but you can only take one standard action among them, regardless of how many segments you break into. The GM assesses any suitable modifiers to your actions based on your current state of disassembly.</p>\n<p>Separated parts have your normal Toughness save, but any failed save renders a separated part staggered or disabled. A second failed save renders the separate part immobile. When the damaged part is reattached, remove its damage and add a bruised or injured condition to your character’s damage track. Your recover from this damage normally.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Variable Split (+1): You can choose how you separate each time you use your power. For example, at rank 1 you can choose to detach any one body part.</p>",
    "specificExtras": [
      {
        "name": "Variable Split",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Variable Split (+1): You can choose how you separate each time you use your power. For example, at rank 1 you can choose to detach any one body part."
      }
    ]
  },
  {
    "name": "Array",
    "type": "Power Structure",
    "action": "—",
    "range": "—",
    "duration": "—",
    "savingThrow": "None",
    "baseCost": 0,
    "fullText": "<p>An Array represents a collection of alternate powers or power settings. You pay the full cost of the most expensive power in the array, plus 1 or 2 power points per Alternate Power feat to acquire other powers of equal or lesser cost.</p>"
  },
  {
    "name": "Battle Form",
    "type": "Alteration",
    "action": "Standard",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 4,
    "book": "Mecha & Manga",
    "fullText": "<p>You can assume a much more powerful battle form. This can be a bioarmor that resides within your body, allowing yourself to be possessed by the ghost of a powerful warrior, or unlocking some latent potential. Whatever the case, this power is blatant and changes your appearance dramatically (you grow chitinous armor plates, your hair grows yellow and spiky, you become the possessing spirit, etc.). All your powers manifest with very noticeable special effects corresponding to the nature of your battle form. Each rank gives you 5 power points you can use to purchase the new form’s traits, which stack with your normal traits. You can purchase extra ranks for traits you already have or entirely new traits. You can maintain the form for one round per rank, after which all the purchased traits vanish (as per the Total Fade extra); you could take the Slow Fade power feat to extend this duration. You cannot assume your battle form again until you rest for at least one hour or enter into a trance for 10 minutes (as per the Trance feat).</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Second Stage: You gain a number of power points equal to rank x3 to purchase more traits, representing a “second stage” combat form. The augmented traits from the second stage combat form stack with those of the first, and they last until the original battle form would expire without the Slow Fade power fate (at which point the hero returns to his first-stage Battle Form, if Battle Form does have the Slow Fade feat). Activating the second stage combat form is a full action, and it has a sustained duration, so if you become unable to perform free actions, you come out of the second stage form unless you succeed at a Concentration check.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Tiring: Applying this flaw means that your combat form somehow drains you of your usual reserves of energy. It affects you when you return to your normal form.</p>\n<p><strong>POWER DRAWBACKS</strong></p>\n<p>• Activation: You may have to make a power check to enter the Battle Form (see Drawbacks, page 53). Because a second-stage Battle Form is a sustained effect, a Battle Form with this drawback would require a power check each round for you to maintain it; failure forces the hero to return to his first-stage Battle Form.</p>",
    "specificExtras": [
      {
        "name": "Second Stage",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Second Stage: You gain power points equal to rank x 3 to purchase more traits representing a 'second stage' combat form."
      }
    ],
    "specificFlaws": [
      {
        "name": "Tiring",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Tiring: Applying this flaw means that your combat form somehow drains you of your usual reserves of energy when you return to normal form."
      }
    ]
  },
  {
    "name": "Burrowing",
    "type": "Movement",
    "action": "Move (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You can burrow through the ground, leaving a tunnel behind you. You move at a speed of 1 MPH at rank 1. Each additional rank moves your speed one step up the Time and Value Progression Table, to a speed of around 5,000 miles per round at rank 20, allowing you to dig straight through the Earth! (Provided you can survive the conditions near the Earth’s molten core.) You burrow through soil and sand at your normal speed. Burrowing through hard clay and packed earth reduces your speed one rank. Burrowing through solid rock reduces it by two ranks. The tunnel you leave behind is either permanent or collapses behind you immediately (your choice when you begin burrowing each new tunnel).</p>"
  },
  {
    "name": "Combo Finish",
    "type": "General",
    "action": "Standard",
    "range": "Touch",
    "duration": "Varies",
    "savingThrow": "Varies",
    "baseCost": 3,
    "book": "Mecha & Manga",
    "fullText": "<p>You can build up a devastating consequence for a series of successful attacks. Each rank of this power awards you 5 power points to purchase a Combo Finish move (see Combos earlier in this section). The Combo Finish move cannot purchase ranks in another Combo Finish, Device, Summon (Minions), Area powers, or any other power that the GM determines is inappropriate for a Combo Finish move. Also, a Combo Finish cannot be part of an array. You can only unleash your Combo Finish when you have gained a number of combo points equal to twice your Combo Finish ranks. You can use your Combo Finish power on the first available standard action after you meet the combo point price, and you must use it on the same target as all the combo actions. You can have different Combo Finish powers with different costs; you decide which one to unleash if you have the necessary combo points (you lose any leftover combo points if you accumulate enough points for the most expensive power but choose to unleash the cheaper one.)</p>"
  },
  {
    "name": "Communication",
    "type": "Sensory",
    "action": "Free (active)",
    "range": "Extended",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You can communicate over a distance using a medium other than your voice. Choose a sense type as the medium for your communication (infrared, ultrasonic, radio, or mental communication, for example). You may also use a special sense type (neutrinos, gravitons, magical sendings, and so forth) noticeable only to the appropriate form of Detect (see page 103).</p>\n<p>Base range for Communication is 10 feet at rank 1. Each additional rank increases range as shown on the Extended Range Table. It can extend even further with the Dimensional power feat (see page 108). Communication is instantaneous with any subject within your range.</p>\n<p>The recipient of your communication must be within range and have a means of perceiving your transmission (a receiver of some sort; a score of 1 or more in all mental abilities is all that’s needed to receive Mental Communication). You can receive Communication of the same medium as your own. Receivers can choose to ignore your Communication, if they wish. Communication is language-dependent; you and the subject must share a common language (see Comprehend to communicate across language barriers). Your Communication is point-to-point (sent to a single receiver within your range).</p>\n<p>Others with an acute sense able to detect your Communication medium can “listen in” on your transmissions with a Notice check (DC 15 + your power rank). The eavesdropper must be within normal sensory range of you or the receiver. Your transmissions can be blocked or “jammed” by powers such as Dazzle or Obscure affecting your medium.</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Selective: If you have the Area extra, you can choose which receiver(s) within range get your Communication, excluding everyone else.</p>\n<p>• Subtle: Your Communication cannot be “overheard” (it is encrypted, scrambled, or otherwise protected). If you apply the feat twice, your Communication cannot even be detected.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Area (+1): You can broadcast omni-directionally to every receiver within your maximum Communication range.</p>",
    "specificExtras": [
      {
        "name": "Area",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Area (+1): You can broadcast omni-directionally to every receiver within your maximum Communication range."
      }
    ]
  },
  {
    "name": "Comprehend",
    "type": "Sensory",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 2,
    "fullText": "<p>You can comprehend different sorts of communication. Each rank allows you to choose one of the following options:</p>\n<p>• Languages: You can either speak or understand the language of any intelligent creature. You can speak only one language at a time, although you can understand several languages at once. For two ranks you can both speak and understand all languages. For an additional rank anyone able to hear you can understand what you’re saying, regardless of language. Being able to read any language requires one more rank.</p>\n<p>• Animals: You can either speak to or comprehend animals (creatures with Int 1 or 2). For two ranks you can both speak to and understand animals.</p>\n<p>• Plants: You can either comprehend or communicate with plants. For two ranks you can both speak to and understand plants.</p>\n<p>• Machines: You can verbally communicate with electronic devices. For two ranks you can both speak to machines and understand their replies.</p>\n<p>• Objects: You can communicate with inanimate objects, granting them the ability to speak to you or simply “reading” impressions from them. This requires two Comprehend ranks.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Broad Type (–1): You can only comprehend a general type of subject (only elves, canines, avians, or sea creatures, for example).</p>\n<p>• Narrow Type (–2): You can only comprehend a particular type of subject (dogs, falcons, or dolphins, for example).</p>",
    "specificFlaws": [
      {
        "name": "Broad Type (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Broad Type (–1): You can only comprehend a general type of subject (only elves, canines, avians, or sea creatures, for example)."
      },
      {
        "name": "Narrow Type (–2)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Narrow Type (–2): You can only comprehend a particular type of subject (dogs, falcons, or dolphins, for example)."
      }
    ]
  },
  {
    "name": "Concealment",
    "type": "Sensory",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "fullText": "<p>Using this effect, you gain total concealment from a particular sense—usually sight or hearing—although you are still detectable to other senses. Each additional rank gives you concealment from another sense; two ranks give you concealment for an entire sense type. Concealment from visual senses costs double (2 ranks for normal sight, 4 ranks for all visual senses). You cannot have concealment from tactile senses, for that, see Insubstantial.</p>\n<p>While concealed, you can make surprise attacks against targets unaware of your presence. Attackers have a 50% miss chance against you (a roll of 11 or better on d20).</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Close Range: The “close range” where someone can sense your presence with an acute sense is 5 feet rather than 30 feet.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Blending (–1): You “blend” into the background. Your Concealment only functions as long as you move no faster than 30 feet per round.</p>\n<p>• Limited (–1): Your Concealment only works under certain conditions, such as in fog, shadows, or in urban locales.</p>\n<p>• Partial (–1): Your power only provides partial concealment.</p>\n<p>• Passive (–1): Your Concealment only lasts until you make an attack, at which point it stops working until you reactivate it.</p>",
    "specificFlaws": [
      {
        "name": "Blending (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Blending (–1): You “blend” into the background. Your Concealment only functions as long as you move no faster than 30 feet per round."
      },
      {
        "name": "Limited (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Limited (–1): Your Concealment only works under certain conditions, such as in fog, shadows, or in urban locales."
      },
      {
        "name": "Partial (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Partial (–1): Your power only provides partial concealment (see Concealment, page 161)."
      },
      {
        "name": "Passive (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Passive (–1): Your Concealment only lasts until you make an attack, at which point it stops working until you reactivate it, which you may do as a free action on the round after you attack."
      }
    ],
    "specificFeats": [
      {
        "name": "Close Range",
        "cost": 1,
        "costType": "flat",
        "desc": "Close Range: The “close range” where someone can sense your presence with an acute sense is 5 feet (adjacent) rather than 30 feet."
      }
    ]
  },
  {
    "name": "Curse of (Flaw or Drawback)",
    "type": "Trait",
    "action": "Standard",
    "range": "Touch",
    "duration": "Instant (lasting)",
    "savingThrow": "Will",
    "baseCost": 3,
    "book": "Mecha & Manga",
    "fullText": "<p>You are able to impose a heinous impairment upon your enemies. When you purchase this feat, select a particular flaw or drawback that you impose on a single trait of your target. Whenever the target wants to use the cursed trait, the Curse takes effect. Targets that already suffer from the chosen flaw or drawback effect in some way are not affected (you cannot make a blind martial artist any more blind). If the flaw or drawback is open to definition, you must define it before making it a Curse. Thus, a Curse of Muteness or a Curse of Limited to cats is possible, but a Curse of Disability or a Curse of Limited is not. A target who successfully saves against a Curse power cannot be the target of the same Curse for one day.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Improved Curse (+2): The effect of the curse affects all of the target’s applicable traits.</p>",
    "specificExtras": [
      {
        "name": "Improved Curse (+2)",
        "cost": 2,
        "costType": "per_rank",
        "desc": "Improved Curse (+2): The effect of the curse affects all of the target’s applicable traits."
      }
    ]
  },
  {
    "name": "Confuse",
    "type": "Sensory (mental)",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Instant (lasting)",
    "savingThrow": "Will",
    "baseCost": 1,
    "fullText": "<p>The target of this power becomes confused, unable to independently determine their actions. If the target’s Will save fails, roll on the behavior table at the beginning of the subject’s turn each round: 1-2 Attack user; 3-5 Act normally; 6-10 Babble incoherently; 11-14 Flee at top speed; 15-20 Attack nearest creature. The target gets a new Will save each round to shake off the Confuse effect, with a +1 bonus each round.</p>"
  },
  {
    "name": "Container",
    "type": "Power Structure",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 5,
    "fullText": "<p>A Container is a power structure that groups together several related powers or traits under a single theme or descriptor (such as Alternate Form, Battle Form, Device, etc.). Each rank in Container provides 5 power points to spend on the contained powers.</p>",
    "specificExtras": [
      {
        "name": "Continuous",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Continuous: The container's effects remain continuous until voluntarily dismissed or altered."
      },
      {
        "name": "Action (Move)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Action: Changing forms or activating the container is a move action."
      },
      {
        "name": "Action (Free)",
        "cost": 2,
        "costType": "per_rank",
        "desc": "Action: Changing forms or activating the container is a free action."
      }
    ],
    "specificFlaws": [
      {
        "name": "Action (Full)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Action: Changing forms or activating the container is a full-round action."
      }
    ]
  },
  {
    "name": "Create Object",
    "type": "General",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Sustained",
    "savingThrow": "Reflex",
    "baseCost": 2,
    "fullText": "<p>You can form solid objects out of nowhere. They may be solidified energy, transmuted matter, ice, stone, or something else entirely, depending on your descriptors. You can create an object up to one 5-foot cube in size per power rank with Toughness up to your power rank. Created objects can be damaged or broken like ordinary objects. They also vanish if you stop sustaining them. You can repair all damage to a created object at will as a standard action.</p>\n<p>You can trap a target inside a large enough hollow object. The target gets a Reflex saving throw to avoid being trapped.</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Innate: Your created objects can’t be nullified.</p>\n<p>• Precise: You can create more precise and detailed objects.</p>\n<p>• Progression: Base size increases one step on the Time and Value Progression Table.</p>\n<p>• Stationary: Created objects hang immobile in the air.</p>\n<p>• Subtle: Created objects are invisible or look real.</p>\n<p>• Tether: Created objects move along with you.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Duration: Continuous modifier creates objects that remain until destroyed or dismissed.</p>\n<p>• Movable: You can move your created objects around as if you possessed Telekinesis at your power rank.</p>",
    "specificExtras": [
      {
        "name": "Duration",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Duration: Create Object with the Continuous modifier creates objects that remain until they are destroyed, nullified, or you choose to dismiss them."
      },
      {
        "name": "Movable",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Movable: You can move your created objects around as if you possessed Telekinesis (see page 105) at your power rank."
      }
    ],
    "specificFeats": [
      {
        "name": "Progression",
        "cost": 1,
        "costType": "flat",
        "hasRanks": true,
        "maxRanks": 20,
        "desc": "Progression: Each time you apply this power feat, the base size of your objects per power rank increases one step on the Progression Table (10-foot cube per rank, then 25-feet, etc)."
      },
      {
        "name": "Stationary",
        "cost": 1,
        "costType": "flat",
        "desc": "Stationary: Your created objects can hang immobile in the air. They resist being moved with a Strength bonus equal to your power rank."
      },
      {
        "name": "Tether",
        "cost": 1,
        "costType": "flat",
        "desc": "Tether: Your created objects can move along with you at your normal movement speed, maintaining their position relative to yours."
      }
    ]
  },
  {
    "name": "Damage",
    "type": "Attack",
    "action": "Standard (active)",
    "range": "Touch",
    "duration": "Instant",
    "savingThrow": "Toughness",
    "baseCost": 1,
    "fullText": "<p>This power inflicts damage in combat. It might be claws, energy fields, focused striking strength, or ranged energy blasts, depending on your descriptors.</p>\n<p>In melee, Damage substitutes for your Strength modifier to determine melee damage (or adds to Strength with the Mighty feat). With the Range (Ranged) extra (+1), Damage functions as a ranged attack (equivalent to the Blast power).</p>\n<p>Targets hit make a Toughness saving throw against DC 15 + damage rank.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Ranged (+1): Damage inflicts damage at normal range (rank x 25 feet increments).</p>",
    "specificExtras": [
      {
        "name": "Ranged",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Ranged (+1): Damage can be used as a ranged attack with range increments of rank x 25 feet (Blast)."
      }
    ]
  },
  {
    "name": "Dazzle",
    "type": "Sensory",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Instant (lasting)",
    "savingThrow": "Reflex",
    "baseCost": 1,
    "fullText": "<p>You can overload all of a target’s senses of a particular type—usually visual or auditory—rendering them temporarily useless. Make a ranged attack roll against the target. If the attack hits, the target must make a Reflex save to avoid the effect. If the save fails, that sense type is rendered useless. A successful save means no effect.</p>\n<p>Each round thereafter the target makes a Fortitude save to recover from the Dazzle attack. The target gains a +1 bonus to the save each round after the first. A successful save allows the target to use the dazzled sense(s) again, but at –1 on all rolls involving them. The following round, the target’s senses return to normal. Targets immune to Fortitude effects cannot be dazzled.</p>\n<p>Dazzle costs 1 point per rank if it affects one sense type, 2 points per rank if it affects two sense types, 3 points per rank if it affects three sense types, and 4 points per rank if it affects all sense types. Visual senses count as two sense types.</p>"
  },
  {
    "name": "Deflect",
    "type": "Defense",
    "action": "Standard (active)",
    "range": "Touch",
    "duration": "Instant",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You can block ranged attacks as well as melee attacks. This is like a normal melee block using your Deflect rank in place of your normal attack bonus. You can attempt to deflect any number of attacks in a round, but each attempt after the first imposes a cumulative –2 modifier on the block check. Once you fail a block roll you cannot deflect again until your next round.</p>\n<p>For 1 point per rank you can choose one of the following: slow projectiles, fast projectiles, energy attacks, or mental attacks. For 2 points per rank, you can deflect all ranged attacks. For 3 points per rank, you can deflect ranged and mental attacks.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Action (+1): Reduce the action needed to block attacks.</p>\n<p>• Automatic (+1): You can deflect even surprise attacks.</p>\n<p>• Ranged (+1): You can deflect attacks made against any target within range (power rank × 100 feet).</p>\n<p>• Reflection (+1): You can reflect blocked attacks back at the attacker as a free action.</p>\n<p>• Redirection (+1): You can redirect blocked attacks at any target within the attack’s normal range.</p>",
    "specificExtras": [
      {
        "name": "Action",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Action (+1): You can reduce the action needed to block attacks. If you can deflect as a free action and you take a standard action to block that round, you take no penalty for blocking multiple attacks."
      },
      {
        "name": "Automatic",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Automatic (+1): You can deflect even surprise attacks, but you must still be able to take the normal action required to use your Deflect power."
      },
      {
        "name": "Ranged",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Ranged (+1): You can deflect attacks made against any target within range (power rank × 100 feet)."
      },
      {
        "name": "Reflection",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Reflection (+1): You can reflect blocked attacks back at the attacker as a free action. Make a normal attack roll to hit with the reflected attack."
      },
      {
        "name": "Redirection",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Redirection (+1): You can redirect blocked attacks at any target within the attack’s normal range. You must have the Reflection extra to take Redirection."
      }
    ]
  },
  {
    "name": "Density",
    "type": "Alteration",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 3,
    "fullText": "<p>You can increase your mass, and therefore your Strength and durability. Every rank of Density activated enhances your Strength by 2 points. Every two ranks give you a rank of Protection with the Impervious extra. Every three ranks give you a rank of Immovable and Super-Strength and move your mass one step up the Time and Value Progression Table. Your additional Strength does not improve your Climb or Swim skills or the distance you can jump (since your mass also increases). You automatically fail Swim checks while Density is active at 3 ranks or more because of your negative buoyancy.</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Alternate Power: To increase or decrease your density, take Insubstantial as an Alternate Power of Density.</p>\n<p>• Buoyant: You can still swim with Density activated without automatically failing Swim skill checks.</p>",
    "specificFeats": [
      {
        "name": "Buoyant",
        "cost": 1,
        "costType": "flat",
        "desc": "Buoyant: Your Density is such that you can still swim with Density activated. You do not automatically fail Swim skill checks, although additional Strength from your Density still does not add to your Swim bonus."
      }
    ]
  },
  {
    "name": "Drain",
    "type": "Trait",
    "action": "Standard",
    "range": "Touch",
    "duration": "Instant",
    "savingThrow": "Fortitude",
    "baseCost": 1,
    "fullText": "<p>You can temporarily lower one of a target’s traits: an ability, skill, feat, or power, chosen when you acquire this power. You must touch the target, making a normal melee attack roll, and the target makes a Fortitude save. If the save fails, each rank of Drain removes 1 power point from the affected trait. The lost points return at a rate of 1 per round, except for inanimate objects, which do not recover drained Toughness and must be repaired. This rate can be reduced with the Slow Fade power feat.</p>\n<p>Drain’s cost per rank determines the affected traits:</p>\n<p>• 1 point: Drain affects a single trait (such as Strength score or Will save bonus).</p>\n<p>• 2 points: Drain affects any one trait, one at a time.</p>\n<p>• 3 points: Drain affects all traits of a single type (ability scores, skills, feats, one type of power effect, or all powers of a particular descriptor) all at once.</p>\n<p>• 4 points: Drain reduces all powers at once.</p>\n<p>• 5 points: Drain reduces all traits at once.</p>"
  },
  {
    "name": "Elongation",
    "type": "Alteration",
    "action": "Move (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You can elongate your body and limbs to extend your reach. This allows you to make melee attacks at a greater distance and move your Elongation distance as a move action by stretching out to a spot and pulling the rest of your body after you, or extending your limbs to give you a longer stride. “Snapping back” to your normal shape is a free action. You can elongate 5 feet at rank 1, each additional rank moves your range (in feet) one step up the Time and Value Progression Table.</p>\n<p>Elongation gives you a bonus on Escape Artist checks and grapple checks equal to your power rank.</p>"
  },
  {
    "name": "Emotion Control",
    "type": "Sensory (mental)",
    "action": "Standard (active)",
    "range": "Perception",
    "duration": "Sustained (lasting)",
    "savingThrow": "Will",
    "baseCost": 2,
    "fullText": "<p>You can instill different emotions in your target, who makes a Will save to resist. You choose the object of the emotion and decide what the target loves, hates, fears, and so forth. You can produce the following emotional effects: Calm, Despair, Fear, Hate, Hope, or Love.</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Mind Blank: Targets don’t remember time under your Emotion Control.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Limited—one emotion (–1): You can only cause one of the listed emotional effects, not any of them.</p>\n<p>• Sense-Dependent (–1): Your Emotion Control works through a target’s senses (eye contact, music, pheromones).</p>",
    "specificFlaws": [
      {
        "name": "Limited—one emotion (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Limited—one emotion (–1): You can only cause one of the listed emotional effects, not any of them."
      },
      {
        "name": "Sense-Dependent (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Sense-Dependent (–1): Your Emotion Control works through a target’s senses. Examples include eye contact (visual), music (auditory), or pheromones (olfactory)."
      }
    ],
    "specificFeats": [
      {
        "name": "Mind Blank",
        "cost": 1,
        "costType": "flat",
        "desc": "Mind Blank: Targets don’t remember time spent under your Emotion Control; their memory of that time is blank."
      }
    ]
  },
  {
    "name": "Enhanced Trait",
    "type": "Trait",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 0,
    "fullText": "<p>One of your basic ability scores or traits is enhanced; each rank in Enhanced Ability gives you +1 to the ability score, just like a normal ability. An Enhanced Ability can be nullified, unlike a normal ability score, but you can also apply extra effort to it. Enhanced traits may also apply to attack bonuses, defense, saving throws, or feats.</p>"
  },
  {
    "name": "Environmental Control",
    "type": "General",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Sustained",
    "savingThrow": "Fortitude",
    "baseCost": 1,
    "fullText": "<p>You can change the environmental conditions in an area: altering the temperature, creating light, causing rain, and so forth. Each of the following is a separate Environmental Control power (or combined for additional cost per rank):</p>\n<p>• Cold (1 pt intense, 2 pts extreme)</p>\n<p>• Distraction (1 pt DC 5, 2 pts DC 10)</p>\n<p>• Hamper Movement (1 pt half speed, 2 pts 1/4 speed)</p>\n<p>• Heat (1 pt intense, 2 pts extreme)</p>\n<p>• Light (1 pt reduce concealment, 2 pts bright daylight)</p>\n<p>Your Environmental Control has a 5 ft. radius at rank 1, progressing per rank on the Time and Value Progression Table.</p>"
  },
  {
    "name": "ESP",
    "type": "Sensory",
    "action": "Move (active)",
    "range": "Extended",
    "duration": "Concentration",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You can displace one or more of your senses over a distance, perceiving as if you were at that location, up to 10 feet away. Each additional power rank increases your range, as shown on the Extended Range Table. ESP overrides your normal sense(s) while you are using it.</p>\n<p>ESP costs 1 point per rank for one sense type, 2 points per rank for two sense types, 3 points per rank for three, and 4 points per rank for all of your senses. Visual senses count as two sense types.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Medium (–1): You require a medium for your ESP, such as shadows, flames, mirrors, open water, television screens, and so forth.</p>",
    "specificFlaws": [
      {
        "name": "Medium (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Medium (–1): You require a medium for your ESP, such as shadows, flames, mirrors, open water, television screens, and so forth. You can only perceive locations where your medium exists."
      }
    ]
  },
  {
    "name": "Expel (Creature)",
    "type": "Attack",
    "action": "Standard",
    "range": "Area (Burst)",
    "duration": "Instant (Lasting)",
    "savingThrow": "Will",
    "baseCost": 2,
    "book": "Mecha & Manga",
    "fullText": "<p>The hero can perform rituals, cast spells, or chant charms that can expel supernatural entities from her immediate vicinity. Choose the type of supernatural being that this power affects, depending on the setting, such as undead, spirits, demons, fey, shadow illusions, virtual computer viruses, etc. It can also target the effects of certain powers such as Summon (Minion), Create Object, Duplication, Illusion, Shadow Clone, Plant Control, or other effects that create additional combatants or combat conditions. The Gamemaster can refuse a type that is too general or irrelevant in the setting. Only creatures that are somehow unnatural are eligible to be affected by this power.</p>\n<p>When you use this power, all affected targets within 5 feet per rank from the hero must make a Will saving throw. If they fail, they are forcefully pushed back to the edge of the power’s range and may not move any closer until they succeed at a Will save, made once per round at a +1 cumulative bonus each consecutive round. A creature that is possessing another’s body counts as present in the area and has the option to flee in the possessed body or abandon it (which is why exorcists tie up their patients, to take away this option).</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Damaging (+2): In addition to driving them away, your exorcism can also harm affected creatures. This power’s damage bonus equals its rank.</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Affect Insubstantial/Dimensional: You can add these feats to push back targets that are incorporeal or in a different dimension.</p>\n<p>• Expel Possessor: The hero can expel a creature possessing another, even if it does not belong to the type normally affected by the hero’s choice. Outside a possessed body, the creature is unaffected.</p>",
    "specificExtras": [
      {
        "name": "Damaging (+2)",
        "cost": 2,
        "costType": "per_rank",
        "desc": "Damaging (+2): In addition to driving them away, your exorcism can also harm affected creatures (damage bonus equals rank)."
      }
    ],
    "specificFeats": [
      {
        "name": "Expel Possessor",
        "cost": 1,
        "costType": "flat",
        "desc": "Expel Possessor: Expel a creature possessing another even if it does not belong to the chosen affected type."
      }
    ]
  },
  {
    "name": "Fatigue",
    "type": "Attack",
    "action": "Standard (active)",
    "range": "Touch",
    "duration": "Instant",
    "savingThrow": "Fortitude",
    "baseCost": 2,
    "fullText": "<p>You can inflict fatigue on a target. Make a melee attack roll. The target makes a Fortitude save (DC 10 + power rank). A failed save means the target is fatigued: –2 to Str and Dex, –1 to attack and defense, and cannot move all out. If the save fails by 5 or more, the target is exhausted: –6 to Str and Dex, –3 to attack and defense, and unable to move faster than normal pace. If the save fails by 10 or more, the target becomes unconscious.</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Reversible: You can remove fatigue conditions caused by your power at will as a free action.</p>"
  },
  {
    "name": "Features",
    "type": "General",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Permanent",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You have one or more minor features or effects. Features are minor traits that provide small, useful benefits, such as an internal clock, compass, flashlight, fur coat providing warmth, or unusual cosmetic alterations.</p>"
  },
  {
    "name": "Flight",
    "type": "Movement",
    "action": "Move (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "fullText": "<p>You can fly through the air, including hovering in place. You have a flying speed of 10 MPH at rank 1. Each additional rank moves your speed one step up the Time and Value Progression Table: 25 MPH at rank 2, 50 MPH at rank 3, and so forth. At rank 19, you can reach anywhere on Earth in a single move action. At rank 20, you can accelerate to near the speed of light!</p>\n<p><strong>FLAWS</strong></p>\n<p>• Gliding (–1): You lose altitude equal to half the distance you travel.</p>\n<p>• Levitation (–1): You can only move straight up and down, not side to side.</p>"
  },
  {
    "name": "Growth",
    "type": "Alteration",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 3,
    "fullText": "<p>You can increase your size, and therefore your strength and durability. Every rank of Growth increases your Strength by 2 points and Constitution by 1 point. The additional Strength does not improve your Climb or Swim skills (since your mass also increases).</p>\n<p>Every four ranks of Growth increase your size category by one (Medium at 0, Large at 4, Huge at 8, Gargantuan at 12, Colossal at 16, Awesome at 20). You gain all the benefits and drawbacks of your new size category. Your base movement speed increases by 5 ft. per size category you enlarge.</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Alternate Power: If you have Growth, you can acquire Shrinking as an Alternate Power feat.</p>\n<p>• Growth Strike: Add the momentum of increasing size to your melee attacks (+1 damage bonus per size category you enlarge until reaching opponent's size).</p>\n<p>• Macroverse: Enlarge past awesome size into a macroverse (requires Growth 20).</p>",
    "specificFeats": [
      {
        "name": "Growth Strike",
        "cost": 1,
        "costType": "flat",
        "desc": "Growth Strike: You can add the momentum of increasing size to your melee attacks, giving you a +1 damage bonus per size category you enlarge until you reach your opponent’s size and only works on opponents at least one size category larger than you."
      },
      {
        "name": "Macroverse",
        "cost": 1,
        "costType": "flat",
        "desc": "Macroverse: If you have Growth 20, you can enlarge past awesome size to enter a “macroverse”. Entering or leaving a macroverse is a move action. In the macroverse, you lose your Growth effect, but gain Shrinking equal to your Growth rank."
      }
    ]
  },
  {
    "name": "Healing",
    "type": "Alteration",
    "action": "Full (active)",
    "range": "Touch",
    "duration": "Instant",
    "savingThrow": "None",
    "baseCost": 2,
    "fullText": "<p>You can heal injuries by touch. With a full-round action, you can do any one of the following:</p>\n<p>• Grant a character an immediate recovery check for the subject’s worst damage condition, with a bonus equal to your Healing rank.</p>\n<p>• Grant a bonus on saving throws equal to your Healing rank against effects with disease or poison descriptors.</p>\n<p>• Stabilize a dying character with a DC 10 Healing check.</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Persistent: You can heal Incurable damage.</p>\n<p>• Regrowth: When healing a disabled condition, you can cause lost or destroyed organs and limbs to regenerate.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Energizing (+1): Grant recovery checks for fatigued and exhausted conditions.</p>\n<p>• Resurrection (+1): Restore life to the dead if deceased fewer minutes than rank.</p>\n<p>• Total (+1): Completely heal multiple damage conditions at once.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Empathic (–1): When you cure someone else of a condition, you acquire the condition and must recover from it normally.</p>",
    "specificExtras": [
      {
        "name": "Energizing",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Energizing (+1): You can grant an immediate recovery check for fatigued and exhausted conditions as well as damage conditions."
      },
      {
        "name": "Resurrection",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Resurrection (+1): You can restore life to the dead! If the subject has been dead for fewer minutes than your power rank, make a DC 20 Con check with a bonus equal to power rank."
      },
      {
        "name": "Total",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Total (+1): You can completely heal multiple damage conditions at once. For every 5 points the recovery check exceeds the DC, the subject’s next worst condition heals."
      }
    ],
    "specificFlaws": [
      {
        "name": "Empathic (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Empathic (–1): When you cure someone else of a condition, you acquire the condition and must recover from it normally."
      }
    ],
    "specificFeats": [
      {
        "name": "Persistent",
        "cost": 1,
        "costType": "flat",
        "desc": "Persistent: You can heal Incurable damage."
      },
      {
        "name": "Regrowth",
        "cost": 1,
        "costType": "flat",
        "desc": "Regrowth: When healing a disabled condition, you cause any lost or destroyed organs and limbs to regenerate as well."
      },
      {
        "name": "Stabilize",
        "cost": 1,
        "costType": "flat",
        "desc": "Stabilize: You don’t need to make a Healing power check to stabilize a dying character; your Healing effect does so automatically."
      }
    ]
  },
  {
    "name": "Illusion",
    "type": "Sensory",
    "action": "Standard (active)",
    "range": "Perception",
    "duration": "Concentration",
    "savingThrow": "Will",
    "baseCost": 1,
    "fullText": "<p>You can create false sensory impressions. For 1 point per rank, you can create an illusion affecting a single sense type. For 2 points per rank, two sense types. For 3 points per rank, three sense types. At 4 points per rank, all sense types. Visual senses count as two sense types. Your illusion occupies an area 5 feet in radius at rank 1, progressing per rank.</p>\n<p>Characters encountering an illusion do not receive saving throws until they interact with it. A successful Will save reveals it to be false.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Action (+1): Maintain an interactive illusion as a free action.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Limited: one subject (–1): Only a single subject can perceive your illusions.</p>\n<p>• Phantasms (–1): Illusion is mental as well as sensory (requires Int 1+).</p>",
    "specificExtras": [
      {
        "name": "Action",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Action (+1): You can maintain an interactive illusion as a free action."
      }
    ],
    "specificFlaws": [
      {
        "name": "Limited",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Limited: one subject (–1): Only a single subject can perceive your illusions."
      },
      {
        "name": "Phantasms (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Phantasms (–1): Your illusion are a mental as well as a sensory effect. Only creatures with Int 1 or more can perceive them."
      }
    ]
  },
  {
    "name": "Immovable",
    "type": "Defense",
    "action": "Reaction (passive)",
    "range": "Personal",
    "duration": "Permanent",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You’re especially resistant to being moved by attacks. You gain a +4 bonus per rank against all attempts to push, rush, trip, or throw you, and reduce the distance you are knocked back by an attack. When struck with a slam attack, you suffer less damage while your attacker suffers more (1 point of damage bonus shifted per rank, up to half).</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Unstoppable (+1): Your speed has no effect on immovability; move all out while retaining full effect rank.</p>",
    "specificExtras": [
      {
        "name": "Unstoppable",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Unstoppable (+1): Your speed has no effect on your immovability; you can move all out while retaining your full effect rank."
      }
    ]
  },
  {
    "name": "Immunity",
    "type": "Defense",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Permanent",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You are immune to certain effects, automatically succeeding on any saving throws or ability checks against them:</p>\n<p>• 1 rank: aging, disease, poison, one environmental condition, one type of suffocation, starvation and thirst, need for sleep, rare descriptor.</p>\n<p>• 2 ranks: critical hits, suffocation (no need to breathe), uncommon descriptor.</p>\n<p>• 5 ranks: alteration effects, dazzle effects, emotion effects, entrapment, fatigue effects, interaction skills, trait effects, or a particular damage type.</p>\n<p>• 9 ranks: life support (disease, poison, all environments, suffocation).</p>\n<p>• 10 ranks: mental effects, common descriptor.</p>\n<p>• 20 ranks: all nonlethal/lethal physical damage or all nonlethal/lethal energy damage.</p>\n<p>• 30 ranks: any effect calling for a particular saving throw (Fortitude, Reflex, or Will).</p>\n<p><strong>FLAWS</strong></p>\n<p>• Limited (–1): Half effect rather than total immunity.</p>",
    "specificFlaws": [
      {
        "name": "Limited (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Limited (–1): You suffer half the normal effect rather than being entirely immune to it."
      }
    ]
  },
  {
    "name": "Insubstantial",
    "type": "Alteration",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 5,
    "fullText": "<p>You can assume a less solid form:</p>\n<p>• Rank 1 (Fluid): Flow through openings, escape restraints automatically. Normal Strength.</p>\n<p>• Rank 2 (Gaseous): Cloud of gas/particles. Immune to physical damage, flow through non-airtight openings. No Strength.</p>\n<p>• Rank 3 (Energy): Coherent energy. Immune to physical damage, energy attacks damage normally. Pass through solid objects except energy barriers. No Strength.</p>\n<p>• Rank 4 (Incorporeal): Pass through solid matter at normal speed. Unaffected by physical and energy attacks. Mental and sensory effects still work. No Strength.</p>"
  },
  {
    "name": "Leaping",
    "type": "Movement",
    "action": "Move (active)",
    "range": "Personal",
    "duration": "Instant",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You can make prodigious leaps. Rank 1 doubles jumping distances. Each additional rank moves the multiple one step up the Time and Value Progression Table (rank 9 = x1,000; rank 20 = x5 million). You do not suffer damage from landing within your jumping distance.</p>"
  },
  {
    "name": "Luck Control",
    "type": "General",
    "action": "Reaction (passive)",
    "range": "Perception",
    "duration": "Instant",
    "savingThrow": "None",
    "baseCost": 3,
    "fullText": "<p>You can use your hero points to affect others in various ways. Each rank, choose one capability:</p>\n<p>• Spend a hero point on another character’s behalf.</p>\n<p>• Spend a hero point to negate a use of Gamemaster fiat.</p>\n<p>• Spend a hero point to force someone else to re-roll a d20 roll and take the worse roll.</p>"
  },
  {
    "name": "Magical Mastery",
    "type": "Power Structure",
    "action": "Standard",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 6,
    "book": "Book of Magic",
    "fullText": "<p>The Magic power, in conjunction with the standard M&M rules for power stunts and Alternate Powers, is already quite broad and flexible. With extra effort, a magician can do virtually anything within the base power points available to the Magic array. However, for an extra level of mastery above and beyond just additional ranks in Magic, you can choose to implement the Variable power structure from Ultimate Power (page 113) to create a “Magical Mastery” power.</p>\n<p>In essence, Magical Mastery, which costs 6 points per rank, gives the magician 5 power points per rank to allocate to any power desired. All it takes is a standard action to re-allocate the points, and then the mystic can use the power or powers normally and as often as desired until the Magical Mastery points are changed again. If stunned or knocked out, the magician’s Mastery points “reset” to their neutral state and must be re-allocated. Such a character essentially has every power stunt available all the time, requiring just time to focus her power.</p>\n<p>The main modifiers applied to Magical Mastery are the Action extra and the Check Required flaw. The Action extra can reduce the time required to re-allocate power points; a move action for a +1 extra, a free action for a +2 extra. The Check Required flaw doesn’t apply to using the powers, but to changing them: the magician must make a skill check (DC 10 + half the affected power points) in order to re-allocate them successfully. A failed check means nothing happens, and the action is wasted. The skills used are typically either Concentration or Knowledge (arcane lore), although other skills, such as different Knowledge or Perform specialties, may be appropriate to other magical styles.</p>\n<p>Magical Mastery is a very powerful ability, best reserved for Master Mages and similarly mighty adepts. It borders on an X-trait, limited solely by the available power points and the player’s imagination.</p>"
  },
  {
    "name": "Mind Control",
    "type": "Sensory (mental)",
    "action": "Standard (active)",
    "range": "Perception",
    "duration": "Concentration (lasting)",
    "savingThrow": "Will",
    "baseCost": 2,
    "fullText": "<p>You can control another character’s mind, and therefore actions. To use Mind Control, make a power check against the result of the target’s Will saving throw. If you succeed, you control the target’s actions as long as you concentrate.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Conscious (+1): Target is conscious and aware, but obedient, allowing access to skills and knowledge.</p>\n<p>• Sensory Link (+1): Perceive everything controlled subject does.</p>\n<p><strong>FLAWS</strong></p>\n<p>• One Command (–1): You can only give targets one predetermined command.</p>\n<p>• Sense-Dependent (–1): Works through target's senses.</p>",
    "specificExtras": [
      {
        "name": "Conscious",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Conscious (+1): Your controlled subject is conscious and aware, but completely obedient to your commands."
      },
      {
        "name": "Sensory Link",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Sensory Link (+1): You can perceive everything one of your controlled subjects does."
      }
    ],
    "specificFlaws": [
      {
        "name": "One Command (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "One Command (–1): You can only give targets one command, chosen when you acquire the power."
      },
      {
        "name": "Sense-Dependent (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Sense-Dependent (–1): Your Mind Control works through a target’s senses."
      }
    ],
    "specificFeats": [
      {
        "name": "Mental Link",
        "cost": 1,
        "costType": "flat",
        "desc": "Mental Link: You can give commands to your thralls mentally over any distance (with no need to speak). Issuing a command is still a move action, however."
      }
    ]
  },
  {
    "name": "Mind Reading",
    "type": "Sensory (mental)",
    "action": "Standard/Full (active)",
    "range": "Perception",
    "duration": "Concentration (lasting)",
    "savingThrow": "Will",
    "baseCost": 1,
    "fullText": "<p>You can read another character’s thoughts. Make a power check against the result of the target’s Will save to read surface thoughts. With a full-round action, you can mentally probe a target’s mind to ask questions and extract deep memories.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Sensory Link (+1): Tap into the senses of your subjects.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Limited (–1): Surface thoughts only or probing only.</p>",
    "specificExtras": [
      {
        "name": "Sensory Link",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Sensory Link (+1): You can “tap into” the senses of your subjects, perceiving what they perceive while reading them."
      }
    ],
    "specificFlaws": [
      {
        "name": "Limited (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Limited (–1): Mind Reading can be limited to surface thoughts only or probing only."
      }
    ]
  },
  {
    "name": "Morph",
    "type": "Alteration",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You can alter your appearance to that of other creatures or even objects of the same mass (+5 bonus to Disguise checks per rank):</p>\n<p>• 1 pt/r: Single other appearance.</p>\n<p>• 2 pts/r: Any form from a broad group (humanoids, animals, machines).</p>\n<p>• 3 pts/r: Any form of the same mass.</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Metamorph: Provides an alternate set of character traits for your assumed form.</p>",
    "specificFeats": [
      {
        "name": "Metamorph",
        "cost": 1,
        "costType": "flat",
        "hasRanks": true,
        "maxRanks": 20,
        "desc": "Metamorph: You have an alternate set of traits—essentially a complete alternate character you can change into as a free action once per round. Each rank grants an additional alternate form."
      }
    ]
  },
  {
    "name": "Move Object",
    "type": "General",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "fullText": "<p>You can move objects at a distance without touching them (Telekinesis). Effective Strength for lifting and moving objects is 5 times your power rank. Objects move as if thrown with your effective Strength. Can make disarm, trip, and grapple checks at range.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Damaging (+1): Inflict damage equal to rank, including ranged telekinetic punch attacks.</p>\n<p>• Perception (+1): Affects any target you can accurately perceive without an attack roll.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Limited (–1): Move only a particular type of object (metals, water, rock).</p>",
    "specificExtras": [
      {
        "name": "Damaging",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Damaging (+1): Your Telekinesis can inflict damage equal to its rank, like an application of normal Strength."
      },
      {
        "name": "Perception",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Perception (+1): Your Telekinesis affects any target you can accurately perceive, with no need for an attack roll."
      }
    ],
    "specificFlaws": [
      {
        "name": "Limited (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Limited (–1): You can only move a particular type of object or material, such as only metals, water, rock, and so forth."
      }
    ]
  },
  {
    "name": "Nauseate",
    "type": "Attack",
    "action": "Standard (active)",
    "range": "Touch",
    "duration": "Instant (lasting)",
    "savingThrow": "Fortitude",
    "baseCost": 2,
    "fullText": "<p>You can inflict weakness on a target through nausea, illness, or pain. Touch the target; on a failed Fortitude save, the target is sickened (–2 on attacks/checks). Failing by 5+ causes nauseated (single move action only). Failing by 10+ leaves target helpless. Recovers with a new save each round (+1 cumulative).</p>\n<p><strong>FLAWS</strong></p>\n<p>• Sicken (–1): Cannot inflict more than sickened result.</p>",
    "specificFlaws": [
      {
        "name": "Sicken (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Sicken (–1): Your power cannot inflict more than a sickened result."
      }
    ]
  },
  {
    "name": "Nullify",
    "type": "Trait",
    "action": "Standard",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Will",
    "baseCost": 1,
    "fullText": "<p>You can counter a target’s powers. Make a ranged attack roll, followed by an opposed check of your Nullify rank vs target power rank or Will save:</p>\n<p>• 1 pt/r: Counter one power of a particular descriptor at a time.</p>\n<p>• 2 pts/r: Counter all powers of a particular descriptor or type at once.</p>\n<p>• 3 pts/r: Counter all powers at once.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Duration: Countered effect cannot be reactivated until duration expires.</p>\n<p>• Nullifying Field (+0): Nullify affected powers in a radius around you.</p>\n<p>• Power Resistance (+1): Reaction defense countering powers used on you.</p>",
    "specificExtras": [
      {
        "name": "Duration (+1 per duration step)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Duration (+1 per duration step): Countered effect cannot be re-activated until the duration expires."
      },
      {
        "name": "Nullifying Field",
        "cost": 0,
        "costType": "per_rank",
        "desc": "Nullifying Field (+0): Touch range (–1) and burst Area (+1) modifier."
      },
      {
        "name": "Power Resistance",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Power Resistance (+1): Reaction defense countering powers targeting you."
      }
    ]
  },
  {
    "name": "Obscure",
    "type": "Sensory",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Sustained",
    "savingThrow": "Reflex",
    "baseCost": 1,
    "fullText": "<p>You can create total concealment in an area. 1 pt/r per sense type (visual counts as two). Obscure covers an area 5 feet in radius at rank 1, progressing per rank.</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Selective: Choose who is and isn't affected.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Partial (–1): Provides partial rather than total concealment.</p>",
    "specificFlaws": [
      {
        "name": "Partial (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Partial (–1): Your Obscure effect provides partial rather than total concealment."
      }
    ]
  },
  {
    "name": "Paralyze",
    "type": "Attack",
    "action": "Standard (active)",
    "range": "Touch",
    "duration": "Instant (lasting)",
    "savingThrow": "Will",
    "baseCost": 2,
    "fullText": "<p>You can reduce a target’s speed and reaction time. Make a touch attack roll; on a failed Will save, the target is slowed (standard or move action only, –1 attack/defense/Reflex, half speed). Failing by 5+ leaves target paralyzed (helpless). New Will save each round (+1 cumulative).</p>\n<p><strong>FLAWS</strong></p>\n<p>• Slow (–1): Cannot inflict more than a slow result.</p>",
    "specificFlaws": [
      {
        "name": "Slow (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Slow (–1): Your power cannot inflict more than a slow result."
      }
    ]
  },
  {
    "name": "Probability Control",
    "type": "Alteration",
    "action": "Reaction (passive)",
    "range": "Personal",
    "duration": "Instant",
    "savingThrow": "None",
    "baseCost": 4,
    "fullText": "<p>You can alter probability in your favor. Once per round as a reaction, you can treat a d20 roll you just made as if it were a minimum roll equal to your power rank (up to 20), or force an attacker targeting you to treat their attack roll as having a maximum result.</p>"
  },
  {
    "name": "Protection",
    "type": "Defense",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Permanent",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You’re particularly resistant to harm. You gain a bonus on your Toughness saving throws equal to your Protection rank.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Impervious (+1): Attacks with damage bonus less than your rank inflict no damage.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Ablative (–1): Loses 1 point of effectiveness each time it provides a bonus until repaired or rested.</p>\n<p>• Limited (–1): Applies to only one broad type of damage (physical or energy).</p>",
    "specificExtras": [
      {
        "name": "Impervious",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Impervious (+1): Your Protection stops some damage completely. If an attack has a damage bonus less than your Protection rank, it inflicts no damage."
      }
    ],
    "specificFlaws": [
      {
        "name": "Ablative (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Ablative (–1): Damage chips away at your Protection. Each time it provides its bonus, it loses 1 power point of effectiveness."
      },
      {
        "name": "Limited (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Limited (–1): Your Protection applies to only one of a broad type of damage (physical or energy)."
      }
    ]
  },
  {
    "name": "Quickness",
    "type": "General",
    "action": "Free (passive)",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You can perform routine tasks quickly (tasks where you can take 20). At rank 1 you perform routine tasks at x2 speed, progressing up the Time and Value Progression Table up to x5 million at rank 20.</p>\n<p><strong>FLAWS</strong></p>\n<p>• One Type (–1): Applies to only physical or mental tasks, not both.</p>\n<p>• One Task (–2): Applies to only one specific task (reading, calculations).</p>",
    "specificFlaws": [
      {
        "name": "One Type (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "One Type (–1): Your Quickness applies to only physical or mental tasks, not both."
      },
      {
        "name": "One Task (–2)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "One Task (–2): Your Quickness applies to only one particular task, such as reading, mathematical calculations, and so forth."
      }
    ]
  },
  {
    "name": "Regeneration",
    "type": "Alteration",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Permanent",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You recover from damage more easily. Allocate ranks among:</p>\n<p>• Recovery Bonus (+1 on Con recovery checks per rank)</p>\n<p>• Bruised / Unconscious recovery rate</p>\n<p>• Injured / Staggered recovery rate</p>\n<p>• Disabled recovery rate</p>\n<p>• Ability Damage recovery rate</p>\n<p>• Resurrection (recover from death)</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Diehard: Automatically stabilize on the round after becoming dying.</p>\n<p>• Persistent: Regenerate Incurable damage.</p>\n<p>• Regrowth: Regrow lost limbs and organs.</p>\n<p>• Reincarnation: Redistribute power points upon recovering from death.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Source (–1): Only works in the presence of a specific source (sunlight, blood, electricity).</p>",
    "specificFlaws": [
      {
        "name": "Source (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Source (–1): Your Regeneration only works when you have access to a particular source, such as blood, electricity, scrap metal, sunlight, and so forth."
      }
    ],
    "specificFeats": [
      {
        "name": "Diehard",
        "cost": 1,
        "costType": "flat",
        "desc": "Diehard: When your condition becomes dying you automatically stabilize on the following round, your condition shifting to disabled and unconscious, from which you can recover normally."
      },
      {
        "name": "Persistent",
        "cost": 1,
        "costType": "flat",
        "desc": "Persistent: You can regenerate Incurable damage."
      },
      {
        "name": "Regrowth",
        "cost": 1,
        "costType": "flat",
        "desc": "Regrowth: When you recover from being disabled, you re-grow any severed or crippled limbs and organs as well."
      },
      {
        "name": "Reincarnation",
        "cost": 1,
        "costType": "flat",
        "desc": "Reincarnation: When you make a successful check to recover from death via Resurrection, you can re-allocate your power points to different traits in a completely different form."
      }
    ]
  },
  {
    "name": "Shadow Clone",
    "type": "General",
    "action": "Standard",
    "range": "Touch",
    "duration": "Sustained",
    "savingThrow": "Will",
    "baseCost": 3,
    "book": "Mecha & Manga",
    "fullText": "<p>You can create an illusory double of yourself next to you. This double looks, sounds, smells, and feels like you in every sense (except to Super-Senses that can detect such illusions), but it can act independently as if it had a mind of its own. The shadow clone can reproduce all that you can do, including the use of skills, feats, and powers, but it cannot produce any real effect with them except those that involve its “physical” state (such as using your Acrobatics skill bonus and your Up the Wall feat to climb up a wall, but not using your Knowledge (local) skill to give you an idea you may have missed). Its attacks don’t damage, harm, or impede targets, but the target believes that he evaded or resisted such powers before thinking that the attacks are not actually real. The clone may perform physical tasks as per the Telekinesis power, using your Strength, and it vanishes instantly when subjected to an effect that would deal require a Toughness, Fortitude, or Reflex save. The shadow clone can pretend to be you while you hide, and it can perform aid actions.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Horde (+1): As per the Duplication power.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Feedback: Each time a shadow clone is destroyed, you must make a Toughness save (DC 15 + rank of the attack that made it vanish). For each clone that was destroyed by the same attack (in the case of area attacks), the damage bonus increases by 1. The damage is non-lethal, even if the attack was lethal.</p>\n<p><strong>POWER FEATS</strong></p>\n<p>You can choose the following Power Feats from the Duplicate power: Mental Link, Progression, and Sacrifice.</p>\n<p>• Independent Appearance: If you have any power that alters your appearance, such as (Alternate) Form, Morph, Illusion (visual), or Shapechange, you can make each of your shadow clones have a different appearance than you (or each other) when they manifest. The alternate appearance must be one you can attain with your powers.</p>\n<p>• Interpose: If you apply this feat to the Shadow Clone power, any clone you create is able to sacrifice itself whenever you would be hit, if it’s adjacent to you.</p>\n<p>• Subtle: With this power feat, your shadow clones are completely indistinguishable from the real thing, even to Super-Senses.</p>\n<p><strong>POWER DRAWBACKS</strong></p>\n<p>• Telltale: Your shadow clones are actually made of your own shadow with this drawback. While any shadow clone is manifested, you don’t have a shadow (but your clones do), which enables your enemies to distinguish which one is the real you. You cannot use the Interpose power feat on a power with this flaw.</p>",
    "specificExtras": [
      {
        "name": "Horde",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Horde (+1): You can create all of your shadow clones in a single standard action, as per Duplication."
      }
    ],
    "specificFlaws": [
      {
        "name": "Feedback",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Feedback (-1): Each time a shadow clone is destroyed, you must make a Toughness save (DC 15 + rank of attack)."
      }
    ],
    "specificFeats": [
      {
        "name": "Independent Appearance",
        "cost": 1,
        "costType": "flat",
        "desc": "Independent Appearance: Each shadow clone can have a different appearance attainable with your powers."
      },
      {
        "name": "Interpose",
        "cost": 1,
        "costType": "flat",
        "desc": "Interpose: Any clone you create is able to sacrifice itself whenever you would be hit if adjacent to you."
      }
    ]
  },
  {
    "name": "Shrinking",
    "type": "Alteration",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You can reduce your size. Every rank of Shrinking reduces your Strength by 1 (minimum Str 1). Every four ranks reduce your size category by one (Small at 4, Tiny at 8, Diminutive at 12, Fine at 16, Miniscule at 20). Gain attack/defense bonuses and stealth bonuses from smaller size.</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Alternate Power: Growth.</p>\n<p>• Atomic Size / Microverse (rank 20).</p>\n<p>• Growth Strike: Gain damage bonus enlarging as part of an attack.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Normal Strength (+1): Suffer no reduction in Strength, carrying capacity, or speed.</p>",
    "specificExtras": [
      {
        "name": "Normal Strength",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Normal Strength (+1): You suffer no reduction in Strength, carrying capacity, or movement speed when you shrink."
      }
    ],
    "specificFeats": [
      {
        "name": "Atomic Size",
        "cost": 1,
        "costType": "flat",
        "desc": "Atomic Size: If you have Shrinking 20, you can shrink past miniscule size to the atomic scale, allowing you to pass through solid objects by slipping between their atoms. You’re effectively immune to attacks at a higher scale."
      },
      {
        "name": "Growth Strike",
        "cost": 1,
        "costType": "flat",
        "desc": "Growth Strike: You can add the momentum of increasing size to your melee attacks, giving you a +1 damage bonus per size category you enlarge until you reach your opponent’s size and only works on opponents larger than you are."
      },
      {
        "name": "Microverse",
        "cost": 1,
        "costType": "flat",
        "desc": "Microverse: If you have Shrinking 20, you can shrink past miniscule size to cross into a “microverse”. Entering or leaving a microverse is a move action. In the microverse, you lose Shrinking, but gain Growth equal to your Shrinking rank."
      }
    ]
  },
  {
    "name": "Snare",
    "type": "Attack",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Reflex",
    "baseCost": 2,
    "fullText": "<p>You can restrain a target with bonds of ice, glue, webbing, bands of energy, etc. Make a ranged attack roll; on a failed Reflex save, target is entangled (–2 attacks/defense, –4 Dex). Failing by 5+ leaves target bound and helpless. Targets can break out with Strength or Escape Artist (DC 20 + rank).</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Chokehold: Available with Tether to choke targets.</p>\n<p>• Obscures Sense: The snare obscures one or more of a bound target's senses.</p>\n<p>• Tether: Attached line to hold or reel in target.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Backlash (+1): Snare reflects internal attacks failing to break it back at the target.</p>\n<p>• Blocks Sense (+1): Covers eyes, ears, or other senses.</p>\n<p>• Engulf (+0): Melee grapple rendering target bound and helpless.</p>\n<p>• Regenerating (+1): Snare heals damage each round.</p>\n<p>• Transparent (+1): Offers target no cover, attacks hit target directly.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Entangle (–1): Cannot inflict more than entangled result.</p>",
    "specificExtras": [
      {
        "name": "Backlash",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Backlash (+1): Your snare reflects any internal attack that fails to destroy it back on the ensnared character."
      },
      {
        "name": "Blocks Sense",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Blocks Sense (+1): The snare blocks one of a bound target’s senses of a particular type."
      },
      {
        "name": "Engulf",
        "cost": 0,
        "costType": "per_rank",
        "desc": "Engulf (+0): You “snare” targets by grappling them in melee."
      },
      {
        "name": "Regenerating",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Regenerating (+1): Any damage that does not break the snare disappears on the start of each round."
      },
      {
        "name": "Transparent",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Transparent (+1): The snare can’t be broken from the outside, only the inside."
      }
    ],
    "specificFlaws": [
      {
        "name": "Entangle (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Entangle (–1): Your snare cannot inflict more than an entangle result and cannot be layered."
      }
    ],
    "specificFeats": [
      {
        "name": "Chokehold",
        "cost": 1,
        "costType": "flat",
        "desc": "Chokehold: Available to a snare with a Tether, allowing the user to choke the target by exerting force on the tether."
      },
      {
        "name": "Obscures Sense",
        "cost": 1,
        "costType": "flat",
        "hasRanks": true,
        "maxRanks": 5,
        "desc": "Obscures Sense: The snare obscures one of a bound target’s senses (e.g. covers the eyes or ears). Each additional sense obscured requires another rank of this feat; for 5 ranks, the snare obscures all of a bound target’s senses."
      },
      {
        "name": "Tether",
        "cost": 1,
        "costType": "flat",
        "desc": "Tether: You have a tether attached to your snare, allowing you to reel in or otherwise exert your strength against the target. Its maximum length is rank x 100 feet."
      }
    ]
  },
  {
    "name": "Sorcery",
    "type": "Power Structure",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Varies",
    "baseCost": 0.5,
    "book": "Warriors & Warlocks",
    "fullText": "<p>Through birthright, bargained gift, or other means, you are a sorcerer, capable of tapping external sources of magical energy and channeling them for directed effect. Choose a single power with a total cost of (power rank x 2) points. You can acquire others as Alternate Power feats.</p>\n<p>Use of Sorcery is strenuous. Every time this power is used, the sorcerer must make a Will save against a difficulty equal to (10 + rank used). Success results in no negative effects on the user; failure is treated as failing a save against the Fatigue power with the resulting effect determined by comparison to the margins of failure listed under that power’s description.</p>\n<p>All effects obtained using this power carry the magic descriptor. Sorcery can counter other Sorcery effects or, with Gamemaster permission, any magical effect (see Countering Powers, M&M, page 70).</p>\n<p>Sorcery is essentially the Magic power with the Flaw: Side Effect (Fatigue, Always Occurs) –2. Characters with Immunity to Fatigue should either be disallowed from taking this power or have its effect act as an exception to the character’s immunity. Though there are no designated restrictions in Array choices, Sorcery tends to lean toward destructive (such as Blast and Nausea) and aggressive (such as Mind Control and Transform) powers, as well as the Summoning power (which is very common).</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Affects Insubstantial and Dimensional are common power feats applied to Sorcery in general as “floating” power feats applicable to any of the Alternate Powers associated with the array. At the Gamemaster’s discretion, Subtle may also be available.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Learned Caster: Through great experience and practice, you have learned how to apply the meditative or other secrets of your occult knowledge to assist you in dealing with the deleterious costs of your power. Substitute your bonus for Knowledge (arcane lore) [or other associated control skill chosen when this extra is selected] when making the required save against Fatigue.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Corrupting: Using Sorcery opens a caster to outside influences that change, warp, and corrupt his very soul. Each use threatens to darken the sorcerer until such time as they succumb entirely to such baleful forces. Each time a natural “1” or natural “20” is rolled, either case, to resist the Fatigue effect of their casting efforts, the character earns a villain point.</p>\n<p>• Physically Demanding: Instead of channeling power through force of will, the caster instead draws the energy to power his spells through raw physical stamina instead. Instead of a Will save, casters with this flaw on their Sorcery power use a Fortitude Save. This is a net –0 to the cost.</p>"
  },
  {
    "name": "Space Travel",
    "type": "Movement",
    "action": "Move",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You can travel faster than the speed of light through the vacuum of space (1 light year per year at rank 1, progressing per rank on the Time and Value Progression Table: rank 2 = 2c, rank 3 = 5c, etc.). Does not provide life support in space (see Immunity).</p>"
  },
  {
    "name": "Speed",
    "type": "Movement",
    "action": "Move",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You can run faster than normal. Ground speed of 10 MPH at rank 1, progressing per rank on the Time and Value Progression Table (rank 19 reaches anywhere on Earth in a single move action; rank 20 near speed of light).</p>"
  },
  {
    "name": "Stun",
    "type": "Attack",
    "action": "Standard (active)",
    "range": "Touch",
    "duration": "Instant (lasting)",
    "savingThrow": "Fortitude",
    "baseCost": 2,
    "fullText": "<p>You can stun a target. Make a melee attack roll; on a failed Fortitude save (DC 10 + rank), target is dazed. Failing by 5+ leaves target stunned. Failing by 10+ renders target unconscious. Recovers with a new save each round (+1 cumulative).</p>\n<p><strong>FLAWS</strong></p>\n<p>• Daze (–1): Cannot inflict more than dazed result.</p>",
    "specificFlaws": [
      {
        "name": "Daze (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Daze (–1): Your power cannot inflict more than a dazed result."
      }
    ]
  },
  {
    "name": "Substitution",
    "type": "Defense",
    "action": "Reaction",
    "range": "Personal",
    "duration": "Instant",
    "savingThrow": "None",
    "baseCost": 2,
    "book": "Mecha & Manga",
    "fullText": "<p>You have the frustrating ability to avoid attacks that would hit you, by tricking your attackers into hitting an illusory decoy. When you are hit by an attack that targets you specifically, you can make a power check as a reaction. If the result is greater than the attack or Reflex save DC, you disappear from the spot and appear at any location within (power rank x10) feet, leaving behind a purely narrative replacement (traditionally a sawn-off log). You cannot buy more ranks in this power than the setting’s PL. You can make an immediate Stealth check when you reappear. Each time you use this power in the same encounter, you suffer a –2 penalty to your power check, as your attackers grow wary of your little trick. This is not a mode of teleportation; this power assumes that the target that an attacker struck or imprisoned was always a substitute and you were really hiding or following from somewhere else. The Gamemaster may disallow the use of this power if you could not possibly be somewhere else when your substitute was attacked.</p>"
  },
  {
    "name": "Suffocate",
    "type": "Attack",
    "action": "Standard (active)",
    "range": "Touch",
    "duration": "Concentration",
    "savingThrow": "Fortitude",
    "baseCost": 2,
    "fullText": "<p>You can cause a target to suffocate. Touch attack roll; on a failed Fortitude save, target suffers –1 on attacks/defense/Reflex, single action per round, and half speed. Target makes a Con check each round (DC 10, +1 per round); failure causes unconsciousness, followed by dying on next round, and dead the round after.</p>"
  },
  {
    "name": "Summon",
    "type": "General",
    "action": "Standard",
    "range": "Touch",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "fullText": "<p>You can call upon another creature—a minion—to aid you. Created with (rank × 15) power points. Subject to power level limits.</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Progression: Summon multiple minions (2, 5, 10, etc.).</p>\n<p>• Mental Link: Telepathic link with minions over any distance.</p>\n<p>• Sacrifice: Shift harmful effects to a minion.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Fanatical (+1): Minions have fanatical devotion.</p>\n<p>• Heroic (+1): Minions not subject to minion rules.</p>\n<p>• Horde (+1): Summon all minions in a single standard action.</p>\n<p>• Type (+1/+2): Summon minions of a general (+1) or broad (+2) type.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Attitude (–1): Less cooperative (indifferent –1, unfriendly –2, hostile –3).</p>",
    "specificExtras": [
      {
        "name": "Fanatical",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Fanatical (+1): Your summoned minions have a fanatical attitude and devotion to you."
      },
      {
        "name": "Heroic",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Heroic (+1): Your minions are not subject to the minion rules, but treated like normal non-player characters."
      },
      {
        "name": "Horde",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Horde (+1): You can summon up to your maximum number of minions with one standard action."
      },
      {
        "name": "Type (+1/+2)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Type (+1/+2): Minions of a general type (+1) or broad type (+2)."
      }
    ],
    "specificFlaws": [
      {
        "name": "Attitude (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Attitude (–1): Your summoned minions are less than cooperative (indifferent –1, unfriendly –2, hostile –3)."
      }
    ],
    "specificFeats": [
      {
        "name": "Mental Link",
        "cost": 1,
        "costType": "flat",
        "desc": "Mental Link: You have a mental link with your minions, allowing you to communicate with them over any distance."
      },
      {
        "name": "Progression",
        "cost": 1,
        "costType": "flat",
        "hasRanks": true,
        "maxRanks": 20,
        "desc": "Progression: Each time you apply this feat, move your total number of minions one step up the Progression Table (2, 5, 10, etc.). Each minion is created with (rank x 15) power points. You can still only summon one minion per standard action."
      },
      {
        "name": "Sacrifice",
        "cost": 1,
        "costType": "flat",
        "desc": "Sacrifice: When you are hit with an effect requiring a saving throw, you can spend a hero point to shift it to one of your minions instead. The minion must be within range of the attack and a viable target."
      }
    ]
  },
  {
    "name": "Super-Movement",
    "type": "Movement",
    "action": "Move (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 2,
    "fullText": "<p>You have a special form of movement. Each rank grants one of the following:</p>\n<p>• Air Walking (1 rank half speed, 2 ranks full speed)</p>\n<p>• Dimensional Movement (1 rank home+1, 2 ranks related group, 3 ranks any dimension)</p>\n<p>• Permeate (pass through solid objects: 1 rank 1/4 speed, 2 ranks 1/2 speed, 3 ranks full speed)</p>\n<p>• Slithering (full speed while prone)</p>\n<p>• Slow Fall (fall any distance without harm)</p>\n<p>• Swinging (swing through air at ground speed)</p>\n<p>• Sure-Footed (reduce speed penalty for hampered terrain)</p>\n<p>• Temporal Movement (1 rank fixed point, 2 ranks past or future, 3 ranks any time)</p>\n<p>• Trackless (leave no trail)</p>\n<p>• Wall-Crawling (1 rank half speed, 2 ranks full speed)</p>\n<p>• Water Walking (move or stand on liquid surfaces)</p>"
  },
  {
    "name": "Super-Senses",
    "type": "Sensory",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>One or more of your senses are enhanced. Each rank gives one effect:</p>\n<p>• Accurate (2 or 4 ranks): Pinpoint exact location for combat targeting.</p>\n<p>• Acute (1 or 2 ranks): Sense fine details.</p>\n<p>• Extended (1 rank per factor of 10 range increment).</p>\n<p>• Radius (1–5 ranks): Perceive all around you (360 degrees).</p>\n<p>• Ranged (1 rank): Use taste or touch at range.</p>\n<p>• Awareness (1 rank): Sense powers of a particular descriptor.</p>\n<p>• Blindsight (4 ranks): Maneuver using non-visual accurate sense.</p>\n<p>• Communication Link (1 rank): Mental link with specific individual.</p>\n<p>• Danger Sense (1 rank): Notice check to avoid being surprised.</p>\n<p>• Darkvision (2 ranks): See normally in total darkness.</p>\n<p>• Detect (1 rank): Sense presence or absence of a trait/object.</p>\n<p>• Direction Sense / Distance Sense / Time Sense (1 rank each).</p>\n<p>• Infravision (1 rank): See heat patterns and infrared spectrum.</p>\n<p>• Low-Light Vision (1 rank): See twice as far in dim light.</p>\n<p>• Microscopic Vision (1–4 ranks): View tiny objects down to atomic scale.</p>\n<p>• Postcognition / Precognition (4 ranks each): Perceive past or future.</p>\n<p>• Radio (1 rank): Hear radio frequencies.</p>\n<p>• Scent (1 rank): Acute sense of smell.</p>\n<p>• Tracking (1–3 ranks): Follow trails using a sense.</p>\n<p>• Tremorsense (3 ranks): Feel location of ground vibrations.</p>\n<p>• Ultra-Hearing / Ultravision (1 rank each).</p>\n<p>• X-Ray Vision (4 ranks): See through solid objects.</p>"
  },
  {
    "name": "Super-Strength",
    "type": "Trait",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Continuous",
    "savingThrow": "None",
    "baseCost": 2,
    "fullText": "<p>You’re capable of lifting and carrying more than normal for your Strength score. Each rank grants +5 bonus to Strength for carrying capacity, and +1 bonus per rank on sustained Strength checks (grapples, breaking objects).</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Bracing: Gain Sustained Immovability equal to Strength bonus to brace against impacts.</p>\n<p>• Countering Punch: Punch incoming ranged attacks out of the air.</p>\n<p>• Groundstrike: Strike ground to trip targets in area.</p>\n<p>• Shockwave: Clap hands to inflict cone-shaped air pressure damage.</p>\n<p>• Super-Breath: Exhale powerful blast to trip targets and extinguish fires.</p>\n<p>• Thunderclap: Clap hands for auditory Dazzle burst.</p>",
    "specificFeats": [
      {
        "name": "Bracing",
        "cost": 1,
        "costType": "flat",
        "desc": "Bracing: You can use your tremendous strength to brace against the force of an impact, gaining Immovability with a rank equal to your Strength bonus (as a Sustained Alternate Power)."
      },
      {
        "name": "Countering Punch",
        "cost": 1,
        "costType": "flat",
        "desc": "Countering Punch: Counter ranged attacks by punching them out of the air using a Strength check."
      },
      {
        "name": "Groundstrike",
        "cost": 1,
        "costType": "flat",
        "desc": "Groundstrike: Strike the ground to create a powerful tremor radiating out in a radius of (Strength bonus x 10) feet, forcing anyone in the area to make a check to resist a trip attack."
      },
      {
        "name": "Shockwave",
        "cost": 1,
        "costType": "flat",
        "desc": "Shockwave: Slam your hands together to create a cone-shaped blast of air pressure (length and width: Strength bonus x 10 feet), inflicting physical damage equal to your Strength bonus (Reflex DC 10 + Str bonus halves)."
      },
      {
        "name": "Super-Breath",
        "cost": 1,
        "costType": "flat",
        "desc": "Super-Breath: Exhale a powerful blast of air in a cone-shaped area (Strength bonus x 10 feet) to trip targets and blow out flames."
      },
      {
        "name": "Thunderclap",
        "cost": 1,
        "costType": "flat",
        "desc": "Thunderclap: Clap hands together to create a thunderous blast of deafening noise in an area of (Strength bonus x 5) feet, inflicting an auditory Dazzle effect."
      }
    ]
  },
  {
    "name": "Swimming",
    "type": "Movement",
    "action": "Move (active)",
    "range": "Personal",
    "duration": "Sustained",
    "savingThrow": "None",
    "baseCost": 1,
    "fullText": "<p>You can swim faster than normal. Water speed of 2.5 MPH (25 ft.) at rank 1, progressing per rank on the Time and Value Progression Table. Always take 10 on Swim skill checks. Does not provide underwater breathing (see Immunity).</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Environmental Adaptation (aquatic): Move through water as easily as air.</p>",
    "specificFeats": [
      {
        "name": "Environmental Adaptation (aquatic)",
        "cost": 1,
        "costType": "flat",
        "desc": "Environmental Adaptation (aquatic): This feat may also be a power feat of Swimming, allowing you to move and fight through water as easily as you do air."
      }
    ]
  },
  {
    "name": "Teleport",
    "type": "Movement",
    "action": "Move (active)",
    "range": "Personal",
    "duration": "Instant",
    "savingThrow": "Reflex",
    "baseCost": 2,
    "fullText": "<p>You can move instantly from place to place without crossing the distance in between. Teleport yourself and up to 100 lbs a distance of (rank × 100) feet as a move action. At rank 3+, take a full action to teleport extended range distances.</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Change Direction, Change Velocity, Easy, Progression, Turnabout.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Accurate (+1): Teleport without accurately sensing destination.</p>\n<p>• Portal (+2): Open 5x5 ft gateway between points.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Long-Range (–1): Extended range only (full action).</p>\n<p>• Medium (–1): Requires physical medium (cables, shadows, mirrors).</p>\n<p>• Short-Range (–1): No extended range teleports.</p>",
    "specificExtras": [
      {
        "name": "Accurate",
        "cost": 1,
        "costType": "per_rank",
        "category": "extra",
        "desc": "Accurate (+1): You don’t need to be able to accurately sense your destination to teleport there."
      },
      {
        "name": "Castling",
        "cost": 0,
        "costType": "per_rank",
        "category": "extra",
        "desc": "Castling (+0): You and a willing subject within your teleport range instantly trade places when you activate this power."
      },
      {
        "name": "Portal",
        "cost": 2,
        "costType": "per_rank",
        "category": "extra",
        "desc": "Portal (+2): You open a portal or gateway between two points as a free action."
      }
    ],
    "specificFeats": [
      {
        "name": "Change Direction",
        "cost": 1,
        "costType": "flat",
        "desc": "Change Direction: You can change your facing or orientation after teleporting, allowing you to face any direction when arriving at your destination."
      },
      {
        "name": "Change Velocity",
        "cost": 1,
        "costType": "flat",
        "desc": "Change Velocity: You arrive “at rest” when you teleport, allowing you to teleport out of a free fall with no impact damage."
      },
      {
        "name": "Easy",
        "cost": 1,
        "costType": "flat",
        "desc": "Easy: You are not disoriented when making full-round extended teleports; you retain your dodge bonus to Defense."
      },
      {
        "name": "Progression",
        "cost": 1,
        "costType": "flat",
        "hasRanks": true,
        "maxRanks": 20,
        "desc": "Progression: Increase the mass you can carry with you when you teleport, moving your maximum cargo one step up the Progression Table per rank (x2, x5, x10, etc.)."
      },
      {
        "name": "Turnabout",
        "cost": 1,
        "costType": "flat",
        "desc": "Turnabout: You can teleport, take a standard action (such as an attack), and teleport back to your starting point in a single round."
      }
    ],
    "specificFlaws": [
      {
        "name": "Long-Range (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Long-Range (–1): You can only teleport your extended range distance as a full-round action."
      },
      {
        "name": "Medium (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Medium (–1): You require a medium for your teleportation (wires, shadows, water)."
      },
      {
        "name": "Short-Range (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Short-Range (–1): You can’t make extended range teleports."
      }
    ]
  },
  {
    "name": "Transform",
    "type": "Alteration",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Sustained (lasting)",
    "savingThrow": "Fortitude",
    "baseCost": 3,
    "fullText": "<p>You can change a target into something else. Make an attack roll; target makes Fortitude save (DC 10 + rank). 1 lb inanimate mass at rank 1, progressing per rank on Time and Value Progression Table:</p>\n<p>• 3 pts/r: One specific thing into one other specific thing.</p>\n<p>• 4 pts/r: Narrow group into narrow group.</p>\n<p>• 5 pts/r: Broad group into broad group.</p>\n<p>• 6 pts/r: Anything into anything else.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Continuous (+1): Transformations last until reversed or nullified.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Touch (–1): Must touch target in melee.</p>",
    "specificExtras": [
      {
        "name": "Continuous",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Continuous (+1): Your transformations last until you choose to reverse them (or they are nullified)."
      }
    ],
    "specificFlaws": [
      {
        "name": "Touch (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Touch (–1): You must touch your target (with a successful melee attack roll) in order to transform it."
      }
    ]
  },
  {
    "name": "Trip",
    "type": "Attack",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Reflex/Strength",
    "baseCost": 1,
    "fullText": "<p>You can make a trip attack at normal range, with no modifier for size category. The target makes a Strength or Dexterity check against your power check; if you win, the target falls prone. Target cannot trip you in return.</p>\n<p><strong>POWER FEATS</strong></p>\n<p>• Improved Trip: Targets use the worse of Strength or Dexterity to resist it.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Knockback (+1): Trip also knocks target back with damage bonus equal to rank.</p>",
    "specificExtras": [
      {
        "name": "Knockback",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Knockback (+1): If you successfully trip the target, you also knock the target back with an effective “damage bonus” equal to your Trip power rank."
      }
    ],
    "specificFeats": [
      {
        "name": "Improved Trip",
        "cost": 1,
        "costType": "flat",
        "desc": "Improved Trip: Targets of your Trip effect use the worse of Strength or Dexterity to resist it. This is just like the regular Improved Trip feat, but as a power feat."
      }
    ]
  },
  {
    "name": "Variable",
    "type": "Power Structure",
    "action": "—",
    "range": "—",
    "duration": "—",
    "savingThrow": "None",
    "baseCost": 0,
    "fullText": "<p>A Variable power structure grants a pool of power points you can reassign to acquire different traits or powers matching a specific theme or descriptor (such as Nemesis, Shapeshift, Mimic, Adaptation, etc.). Cost per rank depends on how broad the pool is and the action required to reconfigure it.</p>"
  },
  {
    "name": "Ward Undead",
    "type": "Mental",
    "action": "Standard (active)",
    "range": "Touch",
    "duration": "Sustained",
    "savingThrow": "Will",
    "baseCost": 3,
    "book": "Warriors & Warlocks",
    "fullText": "<p>You can hedge out undead creatures from an area up to (rank x 5) feet in radius around you. Undead must make a Will saving throw against the result of your Ward power check. A failed save means the creature must leave the area of your ward immediately and as quickly as possible and cannot enter the affected area so long as the ward is maintained. A successful save means the creature is unaffected. Although affected creatures cannot enter the area of your Ward, they can still launch attacks from outside of it, interact and observe from a distance, and so forth.</p>\n<p>In addition to driving out undead creatures, your Ward may damage them; any creature failing the Will save against your Ward also suffers damage read on the Toughness Saving Throw table (see Toughness Saving Throws, M&M, page 163) in addition to the Ward’s normal effect. Thus a creature failing the Will save suffers a bruised result, failure by 5 results in a bruise plus a stun, and so forth. The Ward can inflict lethal or non-lethal damage, as you choose, when you use it.</p>"
  },
  {
    "name": "Wizardry",
    "type": "Power Structure",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Instant",
    "savingThrow": "Varies",
    "baseCost": 0.5,
    "book": "Warriors & Warlocks",
    "fullText": "<p>You are a wizard, a practitioner of the fabled arts arcane. Your learning and training grant you the ability to harness the powers of the universe through carefully prepared and executed spell constructs. Choose a single power with a total cost of (power rank x 2) points. You can acquire others as Alternate Power feats.</p>\n<p>Even the most relatively “simple” of spell constructs is still a massively complex thing, requiring great knowledge and practice to use correctly. Any spell cast involves concentration on the part of the caster, costing him the use of his Dodge bonus. Further, any Wizardry effect requires a Knowledge (arcane lore) check with a Difficulty of (10 + power rank used) in order to work normally. If the check fails, the effect doesn’t work, although the standard action required to use it is expended. The check occurs as part of the action to use the effect and provides no benefit other than helping to activate it. Normal modifiers apply to the skill check, however, and if you are unable to make the required check for any reason, then the effect doesn’t work. This check must be in addition to any check(s) normally required for the effect.</p>\n<p>All effects obtained using this power carry the magic descriptor. Wizardry can counter other Wizardry effects or, with Gamemaster permission, any magical effect (see Countering Powers, M&M, page 70).</p>\n<p>Wizardry is essentially the Magic power with the flaws Distracting and Check Required (Ultimate Power, page 102) already added.</p>\n<p><strong>EXTRAS</strong></p>\n<p>• Veteran Caster: You are a highly experienced caster. Through intensive practice, you have made even the massively complex workings of your chosen spell constructs practically reflexive. You do not lose your Dodge bonus during the round in which you cast.</p>\n<p><strong>FLAWS</strong></p>\n<p>• Requires Constant Study: Your spellcrafting tradition is even more complicated than most. You must carefully study your spells before casting them, and your formulae are too complex to maintain more than a small number in memory at once. In terms of game mechanics, you can’t power stunt off of your Wizardry array. Whatever Alternate power choices you already have listed are all that are available to you during play.</p>"
  }
];

// Automatically attach profiles from POWER_PROFILES_LIST if loaded
if (typeof POWER_PROFILES_LIST !== 'undefined') {
  POWER_PROFILES_LIST.forEach(profile => {
    const baseEff = POWER_EFFECTS_LIST.find(e => e.name === profile.effectName);
    if (baseEff) {
      if (!baseEff.profiles) baseEff.profiles = [];
      if (!baseEff.profiles.some(p => p.name === profile.name)) {
        baseEff.profiles.push(profile);
      }
    }
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { POWER_EFFECTS_LIST };
}
