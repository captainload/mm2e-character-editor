const POWER_EFFECTS_LIST = [
  {
    "name": "Additional Limbs",
    "type": "Alteration",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Permanent",
    "baseCost": 1,
    "fullText": "<p>You have one or more additional limbs, such as arms, legs, tentacles, or a prehensile tail. You have one extra limb at rank 1. Each additional rank moves the number of extra limbs one step up the Time and Value Progression Table. Additional Limbs do not allow you to take extra actions in a round, although they do provide the benefits of the Improved Grapple feat (see page 62) and may make you more resistant to trip attacks (if they make your stance more stable, see Trip, page 159). All limbs except your dominant limb are considered your “off-hand.” If you have the Ambidexterity feat, you have no off-hand penalties with any of your limbs.</p><p>(ALTERNATE) FORM</p>",
    "profiles": [
      {
        "name": "Additional Limbs",
        "type": "Alteration",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Permanent",
        "baseCost": 1,
        "fullText": "<p>You have one or more additional limbs, such as arms, legs, tentacles, or a prehensile tail. You have one extra limb at rank 1. Each additional rank moves the number of extra limbs one step up the Time and Value Progression Table. Additional Limbs do not allow you to take extra actions in a round, although they do provide the benefits of the Improved Grapple feat (see page 62) and may make you more resistant to trip attacks (if they make your stance more stable, see Trip, page 159). All limbs except your dominant limb are considered your “off-hand.” If you have the Ambidexterity feat, you have no off-hand penalties with any of your limbs. (ALTERNATE) FORM Effect: Alteration\tAction: Free Range: Personal\tDuration: Varies Cost: 5 points per rank You can exist in a form other than mere flesh and blood, giving you additional traits. It requires a free action to change into or out of your Alternate Form and you can do so once per round. You have 5 power points per Alternate Form rank to apply to powers related to your form. Once you choose your Alternate Form’s traits, they are fixed and do not change. No Alternate Form power can have a rank greater than your Alternate Form rank. Your non-Instant Alternate Form powers must all have the same duration, which determines your Alternate Form’s duration. •\tEnergy: You are made up of energy, such as fire or electricity. Apply your points to Blast, Flight, Immunity, Insubstantial 3, Strike (Aura), and Teleport (Medium –1). •\tGaseous: You are a cloud of gas, like fog or mist. Apply your points to Concealment, Flight, Immunity, Insubstantial 2, and Suffocate. •\tGhost: You are incorporeal and invisible, largely unaffected by the physical world. Apply your points to Concealment, Flight, Immunity, and Insubstantial 4. •\tLiquid: You are made up of liquid (such as water) apply your points to Blast, Concealment (Limited to underwater –1), Elongation, Immunity, Insubstantial 1, Suffocate, and Swimming. •\tParticulate: Your body is composed of a granular or particulate substance like sand, dust, salt, and so forth. Apply your points to Blast, Elongation, Immunity, Insubstantial 1, Strike, and Super-Movement (slithering). •\tShadow: You transform into a living shadow. Apply your points to Concealment (visual, Limited to areas of shadow –1), Fatigue (chilling touch), Immunity, Insubstantial 4, and Super-Movement (slithering, wall-crawling). •\tSolid: You are made up of a hard substance like stone or metal. Apply your points to Density, Immunity, and Protection. •\tSwarm: Your “body” is actually thousands of other tiny creatures: insects, worms, even little robots. Apply your points to Blast, Flight, Immunity, Insubstantial 2, Strike, and Super-Movement (slithering, wall-crawling). •\tTwo-Dimensional: You can flatten yourself to become almost infinitely thin. Apply your points to Concealment (visual, Limited to one side –1), Insubstantial 1 (for slipping through narrow spaces), Strike (Penetrating), and Super-Movement (slithering). Example: Kate is playing Nereid, who has the power to transform into water. She has Alternate Form 6. Kate assigns the 30 power points from Nereid’s Alternate Form as follows: Insubstantial 1 (5 points), Concealment 4 (visual, Limited to underwater –1, 4 points), Immunity 9 (life support, Sustained +0, 9 points), Swimming 3 (3 points), and Suffocate 4 (8 points). She puts the remaining point into the Environmental Adaptation (underwater) feat with the GM’s permission. Since all her non-Instant powers are Sustained, her Alternate Form has a Sustained duration as well.</p>",
        "effectName": "Additional Limbs"
      }
    ]
  },
  {
    "name": "Anatomic Separation",
    "type": "Alteration",
    "action": "Move (active)",
    "range": "Personal",
    "duration": "Continuous",
    "baseCost": 2,
    "fullText": "<p>You can split off parts of your body and keep all of the parts functioning relatively normally. The process of separation causes you no harm, although it can be disconcerting to watch. You can split off a number of segments equal to your power rank; so rank 1 might allow you to detach a hand, arm, or foot (or even your head). Rank 5 could allow you to detach all your limbs (including your head), and so forth. You choose how you separate when you acquire the power and it cannot be changed. Separating your segments, or reassembling them, requires a move action.</p><p>Your separate parts remain fully functional, so you can see out of a separated eye, manipulate things with a separated hand, and so forth. Separated parts are limited to whatever movement their form allows, so a hand can crawl and a leg can hop, for example, an eyeball can even roll, but a separated head or torso isn’t capable of much movement. You can use movement powers (such as Flight) in conjunction with your separated parts. Separate parts have modifiers based on their size (see Size, page 34).</p><p>Each segment gets a move action each round, but you can only take one standard action among them, regardless of how many segments you</p><p>break into. The GM assesses any suitable modifiers to your actions based on your current state of disassembly.</p><p>Separated parts have your normal Toughness save, but any failed save renders a separated part staggered or disabled. A second failed save renders the separate part immobile. When the damaged part is reattached, remove its damage and add a bruised or injured condition to your character’s damage track. Your recover from this damage normally.</p>",
    "specificExtras": [
      {
        "name": "Variable Split",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Variable Split (+1): You can choose how you separate each time you use your power. For example, at rank 1 you can choose to detach any one body part."
      }
    ],
    "profiles": [
      {
        "name": "Anatomic Separation",
        "type": "Alteration",
        "action": "Move",
        "range": "Personal",
        "duration": "Continuous",
        "baseCost": 2,
        "fullText": "<p>You can split off parts of your body and keep all of the parts functioning relatively normally. The process of separation causes you no harm, although it can be disconcerting to watch. You can split off a number of segments equal to your power rank; so rank 1 might allow you to detach a hand, arm, or foot (or even your head). Rank 5 could allow you to detach all your limbs (including your head), and so forth. You choose how you separate when you acquire the power and it cannot be changed. Separating your segments, or reassembling them, requires a move action. Your separate parts remain fully functional, so you can see out of a separated eye, manipulate things with a separated hand, and so forth. Separated parts are limited to whatever movement their form allows, so a hand can crawl and a leg can hop, for example, an eyeball can even roll, but a separated head or torso isn’t capable of much movement. You can use movement powers (such as Flight) in conjunction with your separated parts. Separate parts have modifiers based on their size (see Size, page 34). Each segment gets a move action each round, but you can only take one standard action among them, regardless of how many segments you break into. The GM assesses any suitable modifiers to your actions based on your current state of disassembly. Separated parts have your normal Toughness save, but any failed save renders a separated part staggered or disabled. A second failed save renders the separate part immobile. When the damaged part is reattached, remove its damage and add a bruised or injured condition to your character’s damage track. Your recover from this damage normally.</p>",
        "effectName": "Anatomic Separation"
      }
    ]
  },
  {
    "name": "Array",
    "type": "—",
    "action": "—",
    "range": "—",
    "duration": "—",
    "baseCost": 0,
    "fullText": "<p>The Array power structure is located in the Power Structures section.</p>"
  },
  {
    "name": "Boost",
    "type": "—",
    "action": "—",
    "range": "Touch",
    "duration": "Instant",
    "baseCost": 1,
    "fullText": "<p>You can improve a trait or traits temporarily. You can boost yourself or other characters by touch.</p><p>Take a standard action to use Boost. Each rank improves the targeted trait by 1 power point. These temporary points fade at a rate of 1 per round until they are gone (this rate can be slowed using the Slow Fade power feat, page 110).</p><hr style='border: 1px dashed var(--border-color); margin: 10px 0;'/><strong>ASIDE: <p><strong>UNDER THE HOOD: BOOST</strong></p><p>Boost poses two primary concerns in play. The first is the campaign’s power level limits. Generally, the GM shouldn’t allow Boost to improve the heroes’ traits beyond these limits. The second is using Boost to improve all of the hero’s traits at once for a bargain price. Gamemasters should be cautious about allowing this type of Boost. Heroes who rely on some outside source of power, occasionally losing their powers rather than having them fade, should consider the Power Loss drawback (see Drawbacks, page 127).</p><p>You can boost the trait again before the temporary power points have faded, but boosts are not cumulative; only the highest-ranked one applies to any given trait. So combining Boost 3 and Boost 8 results in an increase of 8 power points, not 11, and applying Boost 10 to a trait after 5 power points have faded raises the temporary power points back to 10, not 15. The cost per rank determines the effects of Boost:</p><p>•\t1 point: Boost affects a single trait, chosen when the power is</p><p>acquired (such as Strength, the Blast power, etc.). If the subject does not have the targeted trait they may gain it temporarily, at the GM’s discretion. To affect a list of specific traits, one at a time, acquire different Boosts as Alternate Power feats.</p><p>•\t2 points: Boost can affect any trait suiting your descriptors, one at a</p><p>time. If the subject does not have the targeted trait they may gain it temporarily, at the GM’s discretion.</p><p>•\t3 points: Boost affects all of a narrow group of traits at once (ability scores, skills, feats, or one type of power such as attack effects, movement effects, or powers of a specific descriptor). Each affected trait gains the benefits of the Boost. The subject must have the targeted trait(s).</p><p>•\t4 points: Boost affects all of the subject’s powers at once.</p><p>•\t5 points: Boost affects all of the subject’s traits at once.</p><p>You cannot Boost Permanent powers. Boosted traits must remain within the campaign’s power level limits, although the GM should feel free to waive or modify this requirement as best suits the needs of the game.</p></strong>",
    "specificFlaws": [
      {
        "name": "Others Only (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Others Only (–1): You can Boost other characters, but not yourself."
      },
      {
        "name": "Personal (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Personal (–1): Your Boost is personal range and affects only you."
      }
    ],
    "profiles": [
      {
        "name": "Boost",
        "type": "Trait",
        "action": "Standard",
        "range": "Touch",
        "duration": "Instant",
        "baseCost": 1,
        "fullText": "<p>You can improve a trait or traits temporarily. You can boost yourself or other characters by touch. Take a standard action to use Boost. Each rank improves the targeted trait by 1 power point. These temporary points fade at a rate of 1 per round until they are gone (this rate can be slowed using the Slow Fade power feat, page 110). UNDER THE HOOD: BOOST Boost poses two primary concerns in play. The first is the campaign’s power level limits. Generally, the GM shouldn’t allow Boost to improve the heroes’ traits beyond these limits. The second is using Boost to improve all of the hero’s traits at once for a bargain price. Gamemasters should be cautious about allowing this type of Boost. Heroes who rely on some outside source of power, occasionally losing their powers rather than having them fade, should consider the Power Loss drawback (see Drawbacks, page 127). You can boost the trait again before the temporary power points have faded, but boosts are not cumulative; only the highest-ranked one applies to any given trait. So combining Boost 3 and Boost 8 results in an increase of 8 power points, not 11, and applying Boost 10 to a trait after 5 power points have faded raises the temporary power points back to 10, not 15. The cost per rank determines the effects of Boost: •\t1 point: Boost affects a single trait, chosen when the power is acquired (such as Strength, the Blast power, etc.). If the subject does not have the targeted trait they may gain it temporarily, at the GM’s discretion. To affect a list of specific traits, one at a time, acquire different Boosts as Alternate Power feats. •\t2 points: Boost can affect any trait suiting your descriptors, one at a time. If the subject does not have the targeted trait they may gain it temporarily, at the GM’s discretion. •\t3 points: Boost affects all of a narrow group of traits at once (ability scores, skills, feats, or one type of power such as attack effects, movement effects, or powers of a specific descriptor). Each affected trait gains the benefits of the Boost. The subject must have the targeted trait(s). •\t4 points: Boost affects all of the subject’s powers at once. •\t5 points: Boost affects all of the subject’s traits at once. You cannot Boost Permanent powers. Boosted traits must remain within the campaign’s power level limits, although the GM should feel free to waive or modify this requirement as best suits the needs of the game.</p>",
        "effectName": "Boost"
      }
    ]
  },
  {
    "name": "Burrowing",
    "type": "Movement",
    "action": "Move (active)",
    "range": "Personal",
    "duration": "Sustained",
    "baseCost": 1,
    "fullText": "<p>You can burrow through the ground, leaving a tunnel behind you. You move at a speed of 1 MPH at rank 1. Each additional rank moves your speed one step up the Time and Value Progression Table, to a speed of around 5,000 miles per round at rank 20, allowing you to dig straight through the Earth! (Provided you can survive the conditions near the Earth’s molten core.) You burrow through soil and sand at your normal speed. Burrowing through hard clay and packed earth reduces your speed one rank. Burrowing through solid rock reduces it by two ranks. The tunnel you leave behind is either permanent or collapses behind you immediately (your choice when you begin burrowing each new tunnel).</p>",
    "profiles": [
      {
        "name": "Burrowing",
        "type": "Movement",
        "action": "Move",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 1,
        "fullText": "<p>You can burrow through the ground, leaving a tunnel behind you. You move at a speed of 1 MPH at rank 1. Each additional rank moves your speed one step up the Time and Value Progression Table, to a speed of around 5,000 miles per round at rank 20, allowing you to dig straight through the Earth! (Provided you can survive the conditions near the Earth’s molten core.) You burrow through soil and sand at your normal speed. Burrowing through hard clay and packed earth reduces your speed one rank. Burrowing through solid rock reduces it by two ranks. The tunnel you leave behind is either permanent or collapses behind you immediately (your choice when you begin burrowing each new tunnel).</p>",
        "effectName": "Burrowing"
      }
    ]
  },
  {
    "name": "Communication",
    "type": "Sensory",
    "action": "Free (active)",
    "range": "Extended",
    "duration": "Sustained",
    "baseCost": 1,
    "fullText": "<p>You can communicate over a distance using a medium other than your voice. Choose a sense type as the medium for your communication (infrared, ultrasonic, radio, or mental communication, for example). You may also use a special sense type (neutrinos, gravitons, magical sendings, and so forth) noticeable only to the appropriate form of Detect (see page 103).</p><p>Base range for Communication is 10 feet at rank 1. Each additional rank increases range as shown on the Extended Range Table. It can extend even further with the Dimensional power feat (see page 108). Communication is instantaneous with any subject within your range.</p><p>The recipient of your communication must be within range and have a means of perceiving your transmission (a receiver of some sort; a score of 1 or more in all mental abilities is all that’s needed to receive Mental Communication). You can receive Communication of the same medium as your own. Receivers can choose to ignore your Communication, if they wish. Communication is language-dependent; you and the subject must share a common language (see Comprehend to communicate across language barriers). Your Communication is point-to-point (sent to a single receiver within your range).</p><p>Others with an acute sense able to detect your Communication medium can “listen in” on your transmissions with a Notice check (DC 15 + your power rank). The eavesdropper must be within normal sensory range of you or the receiver. Your transmissions can be blocked or “jammed” by powers such as Dazzle or Obscure affecting your medium.</p>",
    "specificExtras": [
      {
        "name": "Area",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Area (+1): You can broadcast omni-directionally to every receiver within your maximum Communication range."
      }
    ],
    "profiles": [
      {
        "name": "Communication",
        "type": "Sensory",
        "action": "Free",
        "range": "Extended",
        "duration": "Sustained",
        "baseCost": 1,
        "fullText": "<p>You can communicate over a distance using a medium other than your voice. Choose a sense type as the medium for your communication (infrared, ultrasonic, radio, or mental communication, for example). You may also use a special sense type (neutrinos, gravitons, magical sendings, and so forth) noticeable only to the appropriate form of Detect (see page 103). Base range for Communication is 10 feet at rank 1. Each additional rank increases range as shown on the Extended Range Table. It can extend even further with the Dimensional power feat (see page 108). Communication is instantaneous with any subject within your range. The recipient of your communication must be within range and have a means of perceiving your transmission (a receiver of some sort; a score of 1 or more in all mental abilities is all that’s needed to receive Mental Communication). You can receive Communication of the same medium as your own. Receivers can choose to ignore your Communication, if they wish. Communication is language-dependent; you and the subject must share a common language (see Comprehend to communicate across language barriers). Your Communication is point-to-point (sent to a single receiver within your range). Others with an acute sense able to detect your Communication medium can “listen in” on your transmissions with a Notice check (DC 15 + your power rank). The eavesdropper must be within normal sensory range of you or the receiver. Your transmissions can be blocked or “jammed” by powers such as Dazzle or Obscure affecting your medium.</p>",
        "effectName": "Communication"
      }
    ]
  },
  {
    "name": "Comprehend",
    "type": "Sensory",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Continuous",
    "baseCost": 2,
    "fullText": "<p>You can comprehend different sorts of communication. Each rank allows you to choose one of the following options:</p><p>•\tLanguages: You can either speak or understand the language of any intelligent creature. You can speak only one language at a time, although you can understand several languages at once. This effect does not enable you to speak with creatures that don’t possess a language. For two ranks you can both speak and understand all languages. For an additional rank anyone able to hear you can understand what you’re saying, regardless of language. Being able to read any language requires one more rank.</p><p>•\tAnimals: You can either speak to or comprehend animals (creatures with Int 1 or 2). You can ask questions and receive answers, although animals are not any more friendly or cooperative than normal. Furthermore, wary and cunning animals are likely to be terse and evasive, while especially stupid ones make inane comments. If an animal is friendly toward you, it may do some favor or service for you. For two ranks you can both speak to and understand animals.</p><p>•\tPlants: You can either comprehend or communicate with plants, both normal plants and plant creatures. You can ask questions of and receive answers from plants. A plant’s sense of its surroundings is limited, so it won’t be able to give (or recognize) detailed descriptions or answer questions about events outside its immediate vicinity. For two ranks you can both speak to and understand plants.</p><p>•\tMachines: You can verbally communicate with electronic devices. Most are limited by their programming and peripherals in terms of what they know, and may not be able to answer some inquiries. Machines tend to be cold and mechanical, and may not be cooperative. At the GM’s discretion, you can use the Computers and Disable Device skills in place of Diplomacy and Bluff when speaking with machines. For two ranks you can both speak to machines and understand their replies.</p><p>•\tObjects: You can communicate with inanimate objects, granting them the ability to speak to you or simply “reading” impressions from them. This requires two Comprehend ranks. Objects only “know” about events directly affecting them or occurring in their immediate area. Gamemasters can apply the guidelines for Postcognition (see page 103) to this effect.</p>",
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
    ],
    "profiles": [
      {
        "name": "Comprehend",
        "type": "Sensory",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Continuous",
        "baseCost": 2,
        "fullText": "<p>You can comprehend different sorts of communication. Each rank allows you to choose one of the following options: •\tLanguages: You can either speak or understand the language of any intelligent creature. You can speak only one language at a time, although you can understand several languages at once. This effect does not enable you to speak with creatures that don’t possess a language. For two ranks you can both speak and understand all languages. For an additional rank anyone able to hear you can understand what you’re saying, regardless of language. Being able to read any language requires one more rank. •\tAnimals: You can either speak to or comprehend animals (creatures with Int 1 or 2). You can ask questions and receive answers, although animals are not any more friendly or cooperative than normal. Furthermore, wary and cunning animals are likely to be terse and evasive, while especially stupid ones make inane comments. If an animal is friendly toward you, it may do some favor or service for you. For two ranks you can both speak to and understand animals. •\tPlants: You can either comprehend or communicate with plants, both normal plants and plant creatures. You can ask questions of and receive answers from plants. A plant’s sense of its surroundings is limited, so it won’t be able to give (or recognize) detailed descriptions or answer questions about events outside its immediate vicinity. For two ranks you can both speak to and understand plants. •\tMachines: You can verbally communicate with electronic devices. Most are limited by their programming and peripherals in terms of what they know, and may not be able to answer some inquiries. Machines tend to be cold and mechanical, and may not be cooperative. At the GM’s discretion, you can use the Computers and Disable Device skills in place of Diplomacy and Bluff when speaking with machines. For two ranks you can both speak to machines and understand their replies. •\tObjects: You can communicate with inanimate objects, granting them the ability to speak to you or simply “reading” impressions from them. This requires two Comprehend ranks. Objects only “know” about events directly affecting them or occurring in their immediate area. Gamemasters can apply the guidelines for Postcognition (see page 103) to this effect.</p>",
        "effectName": "Comprehend"
      }
    ],
    "options": [
      {
        "name": "Languages (Speak/Understand 1 at a time)",
        "cost": 1,
        "costType": "flat"
      },
      {
        "name": "Languages (Speak/Understand all)",
        "cost": 2,
        "costType": "flat"
      },
      {
        "name": "Languages (Anyone can understand you)",
        "cost": 3,
        "costType": "flat"
      },
      {
        "name": "Languages (Read any)",
        "cost": 1,
        "costType": "flat"
      },
      {
        "name": "Animals (Speak or Understand)",
        "cost": 1,
        "costType": "flat"
      },
      {
        "name": "Animals (Speak and Understand)",
        "cost": 2,
        "costType": "flat"
      },
      {
        "name": "Plants (Speak or Understand)",
        "cost": 1,
        "costType": "flat"
      },
      {
        "name": "Plants (Speak and Understand)",
        "cost": 2,
        "costType": "flat"
      },
      {
        "name": "Machines (Speak or Understand)",
        "cost": 1,
        "costType": "flat"
      },
      {
        "name": "Machines (Speak and Understand)",
        "cost": 2,
        "costType": "flat"
      },
      {
        "name": "Objects",
        "cost": 2,
        "costType": "flat"
      }
    ]
  },
  {
    "name": "Concealment",
    "type": "Sensory",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "baseCost": 2,
    "fullText": "<p>Using this effect, you gain total concealment from a particular sense—usu-ally sight or hearing—although you are still detectable to other senses</p><p>(even other senses of the same sense type). Each additional rank gives you concealment from another sense; two ranks give you concealment for an entire sense type. Concealment from visual senses costs double (2 ranks for normal sight, 4 ranks for all visual senses). You cannot have concealment from tactile senses, for that, see Insubstantial (see page 89). So at rank 5, you can have total concealment from all visual senses (4 ranks) and normal hearing (1 rank), for example. At rank 10 you have total concealment from all sense types, except tactile.</p><p>While concealed, you can make surprise attacks against targets unaware of your presence (see Surprise Attack, page 163). Attackers have a 50% miss chance against you (a roll of 11 or better on d20). Attackers able to perceive you with an accurate sense suffer no penalties, and combat is resolved normally.</p><p>Someone can sense the presence of a concealed character at close range (30 feet) with an acute sense (see Super-Senses, page 102) and a DC 20 Notice check (for example using hearing to detect a character concealed from sight). The observer gains a hunch “something’s there” but can’t perceive or target it accurately. A concealed character holding still is harder to notice (DC 30). An inanimate object or a completely immobile creature is very hard to notice at close range (DC 40). It’s practically impossible (+20 DC) to accurately pinpoint a concealed character’s location using an acute sense, and even if the searcher succeeds on such a check, the character still benefits from total concealment.</p>",
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
    "profiles": [
      {
        "name": "Concealment",
        "type": "Sensory",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 2,
        "fullText": "<p>Using this effect, you gain total concealment from a particular sense—usu-ally sight or hearing—although you are still detectable to other senses (even other senses of the same sense type). Each additional rank gives you concealment from another sense; two ranks give you concealment for an entire sense type. Concealment from visual senses costs double (2 ranks for normal sight, 4 ranks for all visual senses). You cannot have concealment from tactile senses, for that, see Insubstantial (see page 89). So at rank 5, you can have total concealment from all visual senses (4 ranks) and normal hearing (1 rank), for example. At rank 10 you have total concealment from all sense types, except tactile. While concealed, you can make surprise attacks against targets unaware of your presence (see Surprise Attack, page 163). Attackers have a 50% miss chance against you (a roll of 11 or better on d20). Attackers able to perceive you with an accurate sense suffer no penalties, and combat is resolved normally. Someone can sense the presence of a concealed character at close range (30 feet) with an acute sense (see Super-Senses, page 102) and a DC 20 Notice check (for example using hearing to detect a character concealed from sight). The observer gains a hunch “something’s there” but can’t perceive or target it accurately. A concealed character holding still is harder to notice (DC 30). An inanimate object or a completely immobile creature is very hard to notice at close range (DC 40). It’s practically impossible (+20 DC) to accurately pinpoint a concealed character’s location using an acute sense, and even if the searcher succeeds on such a check, the character still benefits from total concealment.</p>",
        "effectName": "Concealment"
      },
      {
        "name": "Invisibility",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 4,
        "type": "Alteration",
        "fullText": "<p>You can become invisible at will. This gives you total concealment from normal vision.</p>",
        "effectName": "Concealment"
      }
    ]
  },
  {
    "name": "Confuse",
    "type": "Sensory (mental)",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Instant (lasting)",
    "baseCost": 1,
    "fullText": "<p>The target of this power becomes confused, unable to independently determine their actions. If the target’s Will save fails, roll on the following table at the beginning of the subject’s turn each round to see what the subject does that round.</p><p>d20 Behavior</p><p>1-2\tAttack the user of the Confuse effect.</p><p>3-5\tAct normally.</p><p>6-10\tDo nothing but babble incoherently.</p><p>11-14\tFlee at top possible speed.</p><p>15-20\tAttack nearest creature.</p><p>A confused character unable to carry out the indicated action does nothing but babble incoherently. Attackers are not at any special advantage when attacking a confused character. Any confused character who is</p><p>attacked automatically attacks its attackers on its next turn, as long as it is still confused. The target gets a new Will save each round to shake off the Confuse effect, with a +1 bonus each round.</p>",
    "profiles": [
      {
        "name": "Confuse",
        "type": "Mental",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant (Lasting)",
        "baseCost": 1,
        "fullText": "<p>The target of this power becomes confused, unable to independently determine their actions. If the target’s Will save fails, roll on the following table at the beginning of the subject’s turn each round to see what the subject does that round. d20 Behavior 1-2\tAttack the user of the Confuse effect. 3-5\tAct normally. 6-10\tDo nothing but babble incoherently. 11-14\tFlee at top possible speed. 15-20\tAttack nearest creature. A confused character unable to carry out the indicated action does nothing but babble incoherently. Attackers are not at any special advantage when attacking a confused character. Any confused character who is attacked automatically attacks its attackers on its next turn, as long as it is still confused. The target gets a new Will save each round to shake off the Confuse effect, with a +1 bonus each round.</p>",
        "effectName": "Confuse"
      }
    ]
  },
  {
    "name": "Container",
    "type": "—",
    "action": "—",
    "range": "—",
    "duration": "—",
    "baseCost": 0,
    "fullText": "<p>The Container power structure is located in the Power Structures section.</p>"
  },
  {
    "name": "Create Object",
    "type": "General",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Sustained",
    "baseCost": 2,
    "fullText": "<p>You can form solid objects out of nowhere. They may be solidified energy, transmuted matter, ice, stone, or something else entirely, depending on your descriptors. You can create any simple geometric shape or common object (such as a cube, sphere, dome, hammer, lens, disk, etc.). The GM has final say on whether or not a particular object is too complex. Your objects can’t have any moving parts more complex than a hinge. They can be solid or hollow, opaque or transparent, as you choose when you use the power.</p><p>You can create an object up to one 5-foot cube in size per power rank with Toughness up to your power rank. Created objects can be damaged or broken like ordinary objects (see Damaging Objects, page 166). They also vanish if you stop sustaining them. You can repair all damage to a created object at will as a standard action.</p><p>A created object can provide cover or concealment (if the object is opaque) just like a normal object. Cover provided by a created object can</p><p>block incoming attacks, but blocks outgoing attacks as well. Attacks hitting the covering object damage it normally. Indirect effects (see page 109) can bypass the cover a created object provides just like any other cover.</p><p>You can trap a target inside a large enough hollow object (a cage or bubble, for example). The target gets a Reflex saving throw to avoid being trapped. A trapped character can break out of the object normally. Limiting the target’s mobility in addition to trapping them requires Snare (see page 99), which you may acquire as an Alternate Power feat of Create Object.</p><p>Dropping a created object on a target is treated like an Area Attack (see page 159) equal to the object’s size. The object inflicts damage equal to its Toughness, and targets get a Reflex saving throw. A successful save results in no damage.</p>",
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
    "profiles": [
      {
        "name": "Create Object",
        "type": "General",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 2,
        "fullText": "<p>You can form solid objects out of nowhere. They may be solidified energy, transmuted matter, ice, stone, or something else entirely, depending on your descriptors. You can create any simple geometric shape or common object (such as a cube, sphere, dome, hammer, lens, disk, etc.). The GM has final say on whether or not a particular object is too complex. Your objects can’t have any moving parts more complex than a hinge. They can be solid or hollow, opaque or transparent, as you choose when you use the power. You can create an object up to one 5-foot cube in size per power rank with Toughness up to your power rank. Created objects can be damaged or broken like ordinary objects (see Damaging Objects, page 166). They also vanish if you stop sustaining them. You can repair all damage to a created object at will as a standard action. A created object can provide cover or concealment (if the object is opaque) just like a normal object. Cover provided by a created object can block incoming attacks, but blocks outgoing attacks as well. Attacks hitting the covering object damage it normally. Indirect effects (see page 109) can bypass the cover a created object provides just like any other cover. You can trap a target inside a large enough hollow object (a cage or bubble, for example). The target gets a Reflex saving throw to avoid being trapped. A trapped character can break out of the object normally. Limiting the target’s mobility in addition to trapping them requires Snare (see page 99), which you may acquire as an Alternate Power feat of Create Object. Dropping a created object on a target is treated like an Area Attack (see page 159) equal to the object’s size. The object inflicts damage equal to its Toughness, and targets get a Reflex saving throw. A successful save results in no damage.</p>",
        "effectName": "Create Object"
      }
    ]
  },
  {
    "name": "Damage",
    "type": "Attack",
    "action": "Standard (active)",
    "range": "Touch",
    "duration": "Instant",
    "baseCost": 1,
    "fullText": "<p>This power inflicts damage in melee combat. It might be claws, energy fields, focused striking strength, and so forth, depending on your descriptors. Melee weapons are devices or equipment with this power (see Chapter 7).</p><p>Your Strike rank substitutes for your Strength modifier to determine your melee damage. This means there’s no reason to take Strike at a rank less than your Strength bonus without the Mighty power feat (see the following). Your maximum damage is limited by the campaign’s power level (see page 24).</p>",
    "specificExtras": [
      {
        "name": "Ranged",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Ranged: Strike cannot have a range greater than touch (except using the Thrown power feat). A “ranged Strike” is actually the Blast power, the ability to inflict damage at normal range (see page 77)."
      }
    ]
  },
  {
    "name": "Dazzle",
    "type": "Sensory",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Instant (lasting)",
    "baseCost": 1,
    "fullText": "<p>You can overload all of a target’s senses of a particular type—usually visual or auditory—rendering them temporarily useless. Make a ranged attack roll against the target. If the attack hits, the target must make a Reflex save to avoid the effect. If the save fails, that sense type is rendered useless. A successful save means no effect.</p><p>Each round thereafter the target makes a Fortitude save to recover from the Dazzle attack. The target gains a +1 bonus to the save each round after the first. A successful save allows the target to use the dazzled sense(s) again, but at –1 on all rolls involving them. The following round, the target’s senses return to normal. Targets immune to Fortitude effects cannot be dazzled.</p><p>Dazzle costs 1 point per rank if it affects one sense type, 2 points per rank if it affects two sense types, 3 points per rank if it affects three sense types, and 4 points per rank if it affects all sense types. Visual senses count as two sense types, so a 3-point per rank Dazzle effect could affect visual and one other sense type, for example.</p>",
    "profiles": [
      {
        "name": "Dazzle",
        "type": "Sensory",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant (Lasting)",
        "baseCost": 1,
        "fullText": "<p>You can overload all of a target’s senses of a particular type—usually visual or auditory—rendering them temporarily useless. Make a ranged attack roll against the target. If the attack hits, the target must make a Reflex save to avoid the effect. If the save fails, that sense type is rendered useless. A successful save means no effect. Each round thereafter the target makes a Fortitude save to recover from the Dazzle attack. The target gains a +1 bonus to the save each round after the first. A successful save allows the target to use the dazzled sense(s) again, but at –1 on all rolls involving them. The following round, the target’s senses return to normal. Targets immune to Fortitude effects cannot be dazzled. Dazzle costs 1 point per rank if it affects one sense type, 2 points per rank if it affects two sense types, 3 points per rank if it affects three sense types, and 4 points per rank if it affects all sense types. Visual senses count as two sense types, so a 3-point per rank Dazzle effect could affect visual and one other sense type, for example.</p>",
        "effectName": "Dazzle"
      }
    ]
  },
  {
    "name": "Deflect",
    "type": "Defense",
    "action": "Standard (active)",
    "range": "Touch",
    "duration": "Instant",
    "baseCost": 1,
    "fullText": "<p>You can block ranged attacks as well as melee attacks. This is like a normal melee block (see Block, page 155) using your Deflect rank in place of your normal attack bonus. You can attempt to deflect any number of attacks in a round, but each attempt after the first imposes a cumulative –2 modifier on the block check. Once you fail a block roll you cannot deflect again until your next round.</p><p>The types of attacks you can deflect determine the effect’s cost per rank. For 1 point per rank you can choose one of the following: slow projectiles (including thrown weapons and arrows), fast projectiles (like bullets), energy attacks, and mental attacks. For 2 points per rank, you can deflect all ranged attacks. For 3 points per rank, you can deflect ranged and mental attacks. Deflecting mental attacks requires a Deflect roll against the attack’s Will save DC (since mental attacks do not require attack rolls). Deflect does not work against area attacks (see Area Attack, page 159).</p>",
    "specificExtras": [
      {
        "name": "Action",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Action (+1): You can reduce the action needed to block attacks. If you can deflect as a free action and you take a standard action to block that round, you take no penalty for blocking multiple attacks, otherwise you have the normal penalty. If you can use Deflect as a reaction, you take no penalty for blocking any number of attacks as a free action."
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
        "desc": "Ranged (+1): You can deflect attacks made against any target within range (power rank × 100 feet). You suffer a –2 penalty on your block check per range increment of (rank × 10 feet) between you and the target."
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
        "desc": "Redirection (+1): You can redirect blocked attacks at any target within the attack’s normal range, as Reflection, above. You must have the Reflection extra to take Redirection."
      }
    ],
    "profiles": [
      {
        "name": "Deflect",
        "type": "Defense",
        "action": "Standard",
        "range": "Touch",
        "duration": "Instant",
        "baseCost": 1,
        "fullText": "<p>You can block ranged attacks as well as melee attacks. This is like a normal melee block (see Block, page 155) using your Deflect rank in place of your normal attack bonus. You can attempt to deflect any number of attacks in a round, but each attempt after the first imposes a cumulative –2 modifier on the block check. Once you fail a block roll you cannot deflect again until your next round. The types of attacks you can deflect determine the effect’s cost per rank. For 1 point per rank you can choose one of the following: slow projectiles (including thrown weapons and arrows), fast projectiles (like bullets), energy attacks, and mental attacks. For 2 points per rank, you can deflect all ranged attacks. For 3 points per rank, you can deflect ranged and mental attacks. Deflecting mental attacks requires a Deflect roll against the attack’s Will save DC (since mental attacks do not require attack rolls). Deflect does not work against area attacks (see Area Attack, page 159).</p>",
        "effectName": "Deflect"
      }
    ]
  },
  {
    "name": "Density",
    "type": "Alteration",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "baseCost": 3,
    "fullText": "<p>Action: Free</p><p>Duration: Sustained</p><p>You can increase your mass, and therefore your Strength and durability. Every rank of Density activated enhances your Strength by 2 points. Every two ranks give you a rank of Protection with the Impervious extra (see page 96). Every three ranks give you a rank of Immovable (see page 89) and Super-Strength (see page 104) and move your mass one step up the Time and Value Progression Table. Your additional Strength does not improve your Climb or Swim skills or the distance you can jump (since your mass also increases). In fact, you automatically fail Swim checks while Density is active at 3 ranks or more because of your negative buoyancy.</p>",
    "profiles": [
      {
        "name": "Density",
        "type": "Alteration",
        "action": "—",
        "range": "Personal",
        "duration": "—",
        "baseCost": 3,
        "fullText": "<p>Action: Free Duration: Sustained You can increase your mass, and therefore your Strength and durability. Every rank of Density activated enhances your Strength by 2 points. Every two ranks give you a rank of Protection with the Impervious extra (see page 96). Every three ranks give you a rank of Immovable (see page 89) and Super-Strength (see page 104) and move your mass one step up the Time and Value Progression Table. Your additional Strength does not improve your Climb or Swim skills or the distance you can jump (since your mass also increases). In fact, you automatically fail Swim checks while Density is active at 3 ranks or more because of your negative buoyancy.</p>",
        "effectName": "Density"
      }
    ]
  },
  {
    "name": "Drain (trait)",
    "type": "Trait",
    "action": "Standard (active)",
    "range": "Touch",
    "duration": "Instant",
    "baseCost": 1,
    "fullText": "<p>You can temporarily lower one of a target’s traits: an ability, skill, feat, or power, chosen when you acquire this power. You must touch the target, making a normal melee attack roll, and the target makes a Fortitude save. If the save fails, each rank of Drain removes 1 power point from the affected trait. The lost points return at a rate of 1 per round, except for inanimate objects, which do not recover drained Toughness and must be repaired. This rate can be reduced with the Slow Fade power feat (see page 110). Drain’s cost per rank determines the affected traits:</p><p>•\t1 point: Drain affects a single trait (such as Strength score or Will</p><p>save bonus), chosen when the power is acquired. (To affect a list of traits, one at a time, take Alternate Powers; see page 108.)</p><p>•\t2 points: Drain affects any one trait, one at a time.</p><p>•\t3 points: Drain affects all traits of a single type (ability scores, skills,</p><p>feats, one type of power effect, or all powers of a particular descriptor) all at once (subtracting its rank in power points from each).</p><p>•\t4 points: Drain reduces all powers at once.</p><p>•\t5 points: Drain reduces all traits at once.</p>"
  },
  {
    "name": "Elongation",
    "type": "Alteration",
    "action": "Move (active)",
    "range": "Personal",
    "duration": "Sustained",
    "baseCost": 1,
    "fullText": "<p>You can elongate your body and limbs to extend your reach. This allows you to make melee attacks at a greater distance and move your Elongation distance as a move action by stretching out to a spot and pulling the rest of your body after you, or extending your limbs to give you a longer stride. “Snapping back” to your normal shape is a free action. You can elongate 5 feet at rank 1, each additional rank moves your range (in feet) one step up the Time and Value Progression Table.</p><p>You can use Elongation to make melee attacks at a greater distance by elongating your limbs. It requires a full action to both elongate (move action) and attack (standard action). Once elongated, you can make melee attacks within your new reach as a standard action.</p><p>Your attacks have a “range increment” of (power rank × 10 feet), each increment beyond the first applies a –2 penalty to your attack rolls and checks, since it’s harder for you to coordinate your limbs at that distance. If you can’t accurately sense your target at all, apply the rules for concealment (see page 161). The range increment is the distance between your target and your head, so if you elongate your neck so your head is within one increment of your target, you suffer no range penalties.</p><p>You gain a bonus to Defense against attacks on your elongated limbs as if you were one size category smaller than usual (see Size, page 34). So the elongated limb of a Medium character has a +1 Defense bonus (like a Small character).</p><p>Elongation gives you a bonus on Escape Artist checks and grapple checks equal to your power rank.</p>",
    "profiles": [
      {
        "name": "Elongation",
        "type": "Alteration",
        "action": "Move",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 1,
        "fullText": "<p>You can elongate your body and limbs to extend your reach. This allows you to make melee attacks at a greater distance and move your Elongation distance as a move action by stretching out to a spot and pulling the rest of your body after you, or extending your limbs to give you a longer stride. “Snapping back” to your normal shape is a free action. You can elongate 5 feet at rank 1, each additional rank moves your range (in feet) one step up the Time and Value Progression Table. You can use Elongation to make melee attacks at a greater distance by elongating your limbs. It requires a full action to both elongate (move action) and attack (standard action). Once elongated, you can make melee attacks within your new reach as a standard action. Your attacks have a “range increment” of (power rank × 10 feet), each increment beyond the first applies a –2 penalty to your attack rolls and checks, since it’s harder for you to coordinate your limbs at that distance. If you can’t accurately sense your target at all, apply the rules for concealment (see page 161). The range increment is the distance between your target and your head, so if you elongate your neck so your head is within one increment of your target, you suffer no range penalties. You gain a bonus to Defense against attacks on your elongated limbs as if you were one size category smaller than usual (see Size, page 34). So the elongated limb of a Medium character has a +1 Defense bonus (like a Small character). Elongation gives you a bonus on Escape Artist checks and grapple checks equal to your power rank.</p>",
        "effectName": "Elongation"
      }
    ]
  },
  {
    "name": "Emotion Control",
    "type": "Sensory (mental)",
    "action": "Standard (active)",
    "range": "Perception",
    "duration": "Sustained (lasting)",
    "baseCost": 2,
    "fullText": "<p>You can instill different emotions in your target, who makes a Will save to resist. You choose the object of the emotion and decide what the target loves, hates, fears, and so forth. You can produce the following emotional effects:</p><p>Calm: The subject adopts an indifferent attitude and does not feel any strong emotion. Calm can counter any of the other emotion effects, and they may also counter Calm (see Countering Powers, page 70).</p><p>Despair: The subject is shaken, suffering a –2 on attack rolls, defense, and checks. Failure by 10 or more means the target is overcome with hopelessness, helpless and unable to take any actions.</p><p>Fear: The subject is shaken, suffering a –2 on attack rolls, defense, and checks. Failure by 5 or more means the subject is frightened and flees from the source of the fear (specified by the user) as quickly as possible. Failure by 10 or more means the subject is panicked, dropping any held items and fleeing blindly from the source of the fear. A panicked subject unable to flee cowers and does not attack (most likely using total defense instead, see page 159).</p><p>•\tHate: The subject immediately becomes unfriendly. If the save fails by 5 or more, the subject’s attitude becomes hostile. Hate counters and is countered by love.</p><p>•\tHope: The subject feels no fear or despair. Hope counters those emotions and similar effects and is countered by them in return.</p><p>•\tLove: The subject’s attitude becomes friendly. If the save fails by 5 or more, the subject’s attitude becomes helpful. If it fails by 10 or more, the subject becomes fanatical. Love can counter despair, fear, and hate and they may counter it.</p>",
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
        "desc": "Sense-Dependent (–1): Your Emotion Control works through a target’s senses. Examples include eye contact (visual), music (auditory), or pheromones (olfactory). See the Sense-Dependent flaw, page 115, for details."
      }
    ],
    "profiles": [
      {
        "name": "Emotion Control",
        "type": "Mental",
        "action": "Standard",
        "range": "Will",
        "duration": "Sustained (Lasting)",
        "baseCost": 2,
        "fullText": "<p>You can instill different emotions in your target, who makes a Will save to resist. You choose the object of the emotion and decide what the target loves, hates, fears, and so forth. You can produce the following emotional effects: Calm: The subject adopts an indifferent attitude and does not feel any strong emotion. Calm can counter any of the other emotion effects, and they may also counter Calm (see Countering Powers, page 70). Despair: The subject is shaken, suffering a –2 on attack rolls, defense, and checks. Failure by 10 or more means the target is overcome with hopelessness, helpless and unable to take any actions. Fear: The subject is shaken, suffering a –2 on attack rolls, defense, and checks. Failure by 5 or more means the subject is frightened and flees from the source of the fear (specified by the user) as quickly as possible. Failure by 10 or more means the subject is panicked, dropping any held items and fleeing blindly from the source of the fear. A panicked subject unable to flee cowers and does not attack (most likely using total defense instead, see page 159). •\tHate: The subject immediately becomes unfriendly. If the save fails by 5 or more, the subject’s attitude becomes hostile. Hate counters and is countered by love. •\tHope: The subject feels no fear or despair. Hope counters those emotions and similar effects and is countered by them in return. •\tLove: The subject’s attitude becomes friendly. If the save fails by 5 or more, the subject’s attitude becomes helpful. If it fails by 10 or more, the subject becomes fanatical. Love can counter despair, fear, and hate and they may counter it.</p>",
        "effectName": "Emotion Control"
      }
    ]
  },
  {
    "name": "Enhanced Trait",
    "type": "Trait",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Continuous",
    "baseCost": 0,
    "fullText": "<p>One of your basic ability scores is enhanced (see Chapter 2); each rank in Enhanced Ability gives you +1 to the ability score, just like a normal ability. An Enhanced Ability can be nullified, unlike a normal ability score, but you can also apply extra effort to it (see Extra Effort, page 120). The GM approves any extra effort use in conjunction with your Enhanced Abilities. An Enhanced Ability may also have appropriate descriptors applied to it, differentiating it from a normal ability score. You can freely mix normal and enhanced ability scores.</p>"
  },
  {
    "name": "Environmental Control",
    "type": "General",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Sustained",
    "baseCost": 1,
    "fullText": "<p>You can change the environmental conditions in an area: altering the temperature, creating light, causing rain, and so forth (see The Environment, page 167, for the effects of different environmental conditions). For obscuring senses (via darkness, fog, etc.) use Obscure (see page 95). Each of the following is a separate Environmental Control power. If you have one, you can acquire others as Alternate Power feats (see page 108), but you can then only use and maintain one at a time. To use or maintain multiple Environmental Control effects simultaneously, add their costs together for the total power cost per rank.</p><p>•\tCold: You can lower the temperature in the area. For 1 point per rank, you can create intense cold, for 2 points per rank, you can create extreme cold.</p><p>•\tDistraction: You can create conditions to distract anyone attempting to concentrate, such as driving rain, hail, dust storms, and so forth. For 1 point per rank the distraction is DC 5, for 2 points per rank it’s DC 10. See Concentration, page 44, for details.</p><p>•\tHamper Movement: You can hamper movement through the area with high winds, icy surfaces, or similar effects. For 1 point per rank, you halve movement speed through the area, for 2 points per rank, you reduce it to one-quarter.</p><p>•\tHeat: You can raise the temperature in the area. For 1 point per rank, you create intense heat, for 2 points per rank, you create extreme heat.</p><p>•\tLight: You can raise the light level in the area, countering the concealment of darkness, but not other forms of concealment. For 1 point per rank, you can shed enough light to reduce total concealment to partial and partial concealment to none. For 2 points per rank, you can shed light as bright as a sunlit day, eliminating all concealment provided by natural darkness. Obscure effects with the darkness descriptor may be countered with a successful power check (see Countering Powers, page 70).</p><p>Your Environmental Control has a 5 ft. radius at rank 1. Each additional rank moves the maximum radius one step up the Time and Value Progression Table (with a radius of approximately 2,000 miles at rank 20, sufficient to alter the environment of an entire continent!).</p>",
    "profiles": [
      {
        "name": "Environmental Control",
        "type": "General",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 1,
        "fullText": "<p>You can change the environmental conditions in an area: altering the temperature, creating light, causing rain, and so forth (see The Environment, page 167, for the effects of different environmental conditions). For obscuring senses (via darkness, fog, etc.) use Obscure (see page 95). Each of the following is a separate Environmental Control power. If you have one, you can acquire others as Alternate Power feats (see page 108), but you can then only use and maintain one at a time. To use or maintain multiple Environmental Control effects simultaneously, add their costs together for the total power cost per rank. •\tCold: You can lower the temperature in the area. For 1 point per rank, you can create intense cold, for 2 points per rank, you can create extreme cold. •\tDistraction: You can create conditions to distract anyone attempting to concentrate, such as driving rain, hail, dust storms, and so forth. For 1 point per rank the distraction is DC 5, for 2 points per rank it’s DC 10. See Concentration, page 44, for details. •\tHamper Movement: You can hamper movement through the area with high winds, icy surfaces, or similar effects. For 1 point per rank, you halve movement speed through the area, for 2 points per rank, you reduce it to one-quarter. •\tHeat: You can raise the temperature in the area. For 1 point per rank, you create intense heat, for 2 points per rank, you create extreme heat. •\tLight: You can raise the light level in the area, countering the concealment of darkness, but not other forms of concealment. For 1 point per rank, you can shed enough light to reduce total concealment to partial and partial concealment to none. For 2 points per rank, you can shed light as bright as a sunlit day, eliminating all concealment provided by natural darkness. Obscure effects with the darkness descriptor may be countered with a successful power check (see Countering Powers, page 70). Your Environmental Control has a 5 ft. radius at rank 1. Each additional rank moves the maximum radius one step up the Time and Value Progression Table (with a radius of approximately 2,000 miles at rank 20, sufficient to alter the environment of an entire continent!).</p>",
        "effectName": "Environmental Control"
      }
    ]
  },
  {
    "name": "Esp",
    "type": "Sensory",
    "action": "Move (active)",
    "range": "Extended",
    "duration": "Concentration",
    "baseCost": 1,
    "fullText": "<p>You can displace one or more of your senses over a distance, perceiving as if you were at that location, up to 10 feet away. Each additional power rank increases your range, as shown on the Extended Range Table. It can extend further with the Dimensional power feat (see page 108). ESP overrides your normal sense(s) while you are using it. Subjects observed via ESP can sense it with a Notice check (DC 10 + rank), unless you have the Subtle power feat (see page 110).</p><p>You can make Notice and Search checks normally using your displaced senses. To search a large area for someone or something, use the extended search guidelines under Search (see page 53).</p><p>Sensory effects targeted on the spot where you have displaced your senses affect you normally (this includes mental effects with the Sense-Dependent modifier; see page 115). If ESP applies to your mental senses, then mental effects targeted on the spot you’re perceiving affect you normally as well.</p><p>ESP costs 1 point per rank for one sense type, 2 points per rank for two sense types, 3 points per rank for three, and 4 points per rank for all of your senses. Visual senses count as two sense types (so visual ESP is 2</p><p>points per rank). You can use sensory powers via ESP if your ESP applies to their sense type. If you can use mental senses and an accurate sense (such as sight) via ESP, you can use it to target mental powers as well.</p>",
    "specificFlaws": [
      {
        "name": "Medium (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Medium (–1): You require a medium for your ESP, such as shadows, flames, mirrors, open water, television screens, and so forth. You can only perceive locations where your medium exists."
      }
    ],
    "profiles": [
      {
        "name": "Esp",
        "type": "Sensory",
        "action": "Move",
        "range": "Extended",
        "duration": "Concentration",
        "baseCost": 1,
        "fullText": "<p>You can displace one or more of your senses over a distance, perceiving as if you were at that location, up to 10 feet away. Each additional power rank increases your range, as shown on the Extended Range Table. It can extend further with the Dimensional power feat (see page 108). ESP overrides your normal sense(s) while you are using it. Subjects observed via ESP can sense it with a Notice check (DC 10 + rank), unless you have the Subtle power feat (see page 110). You can make Notice and Search checks normally using your displaced senses. To search a large area for someone or something, use the extended search guidelines under Search (see page 53). Sensory effects targeted on the spot where you have displaced your senses affect you normally (this includes mental effects with the Sense-Dependent modifier; see page 115). If ESP applies to your mental senses, then mental effects targeted on the spot you’re perceiving affect you normally as well. ESP costs 1 point per rank for one sense type, 2 points per rank for two sense types, 3 points per rank for three, and 4 points per rank for all of your senses. Visual senses count as two sense types (so visual ESP is 2 points per rank). You can use sensory powers via ESP if your ESP applies to their sense type. If you can use mental senses and an accurate sense (such as sight) via ESP, you can use it to target mental powers as well.</p>",
        "effectName": "Esp"
      }
    ]
  },
  {
    "name": "Fatigue",
    "type": "Attack",
    "action": "Standard (active)",
    "range": "Touch",
    "duration": "Instant",
    "baseCost": 2,
    "fullText": "<p>You can inflict fatigue on a target. Make a melee attack roll. The target makes a Fortitude save (DC 10 + power rank). A failed save means the target is fatigued: –2 to Str and Dex, –1 to attack and defense, and cannot move all out. If the save fails by 5 or more, the target is exhausted: –6 to Str and Dex, –3 to attack and defense, and unable to move faster than normal pace. If the save fails by 10 or more, the target becomes unconscious. Targets immune to fatigue are unaffected. Already fatigued characters who suffer another fatigue result become exhausted, while exhausted characters who suffer another fatigue result become unconscious. The target recovers normally (see Fatigue, page 167).</p>",
    "profiles": [
      {
        "name": "Fatigue",
        "type": "Attack",
        "action": "Standard",
        "range": "Touch",
        "duration": "Instant",
        "baseCost": 2,
        "fullText": "<p>You can inflict fatigue on a target. Make a melee attack roll. The target makes a Fortitude save (DC 10 + power rank). A failed save means the target is fatigued: –2 to Str and Dex, –1 to attack and defense, and cannot move all out. If the save fails by 5 or more, the target is exhausted: –6 to Str and Dex, –3 to attack and defense, and unable to move faster than normal pace. If the save fails by 10 or more, the target becomes unconscious. Targets immune to fatigue are unaffected. Already fatigued characters who suffer another fatigue result become exhausted, while exhausted characters who suffer another fatigue result become unconscious. The target recovers normally (see Fatigue, page 167).</p>",
        "effectName": "Fatigue"
      }
    ]
  },
  {
    "name": "Features",
    "type": "General",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Permanent",
    "baseCost": 1,
    "fullText": "<p>You have one or more minor features or effects.</p>"
  },
  {
    "name": "Flight",
    "type": "Movement",
    "action": "Move (active)",
    "range": "Personal",
    "duration": "Sustained",
    "baseCost": 2,
    "fullText": "<p>You can fly through the air, including hovering in place. You have a flying speed of 10 MPH at rank 1. Each additional rank moves your speed one step up the Time and Value Progression Table: 25 MPH at rank 2, 50 MPH at rank 3, and so forth. At rank 19, you can reach anywhere on Earth in a single move action. At rank 20, you can accelerate to near the speed of light!</p>",
    "profiles": [
      {
        "name": "Flight",
        "type": "Movement",
        "action": "Move",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 2,
        "fullText": "<p>You can fly through the air, including hovering in place. You have a flying speed of 10 MPH at rank 1. Each additional rank moves your speed one step up the Time and Value Progression Table: 25 MPH at rank 2, 50 MPH at rank 3, and so forth. At rank 19, you can reach anywhere on Earth in a single move action. At rank 20, you can accelerate to near the speed of light!</p>",
        "effectName": "Flight"
      }
    ]
  },
  {
    "name": "Growth",
    "type": "Alteration",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "baseCost": 3,
    "fullText": "<p>You can increase your size, and therefore your strength and durability. Every rank of Growth increases your Strength by 2 points and Constitution by 1 point. The additional Strength does not improve your Climb or Swim skills (since your mass also increases).</p><p>Every four ranks of Growth increase your size category by one. So a Medium creature with Growth at 4 ranks is Large, at 8 ranks is Huge, at 12 ranks is Gargantuan, at 16 ranks is Colossal, and at 20 ranks is Awesomesized. You gain all the benefits and drawbacks of your new size category. See Size, page 34 for information on the effects of different sizes. Your base movement speed increases by 5 ft. per size category you enlarge.</p>",
    "profiles": [
      {
        "name": "Growth",
        "type": "Alteration",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 4,
        "fullText": "<p>You can increase your size, and therefore your strength and durability. Every rank of Growth increases your Strength by 2 points and Constitution by 1 point. The additional Strength does not improve your Climb or Swim skills (since your mass also increases). Every four ranks of Growth increase your size category by one. So a Medium creature with Growth at 4 ranks is Large, at 8 ranks is Huge, at 12 ranks is Gargantuan, at 16 ranks is Colossal, and at 20 ranks is Awesomesized. You gain all the benefits and drawbacks of your new size category. See Size, page 34 for information on the effects of different sizes. Your base movement speed increases by 5 ft. per size category you enlarge.</p>",
        "effectName": "Growth"
      }
    ]
  },
  {
    "name": "Healing",
    "type": "Alteration",
    "action": "Full (active)",
    "range": "Touch",
    "duration": "Instant",
    "baseCost": 2,
    "fullText": "<p>You can heal injuries by touch. With a full-round action, you can do any one of the following:</p><p>•\tGrant a character an immediate recovery check for the subject’s worst damage condition, with a bonus equal to your Healing rank. If the check fails, you must wait the normal recovery time for that condition or use extra effort to try again. If successful, you can use Healing again normally.</p><p>•\tGrant a bonus on saving throws equal to your Healing rank against effects with disease or poison descriptors. The bonus applies to the subject’s next save against the effect.</p><p>•\tStabilize a dying character with a DC 10 Healing check.</p><p>You must maintain contact with the target for a full round for the power to take effect.</p><p>You can use Healing on yourself. You can’t cure your own stunned, staggered, or unconscious conditions or stabilize yourself (since you have to be able to take a full action to use your Healing effect). You can use Healing to cure your own disabled condition, but doing so is a strenuous action. If your recovery check is successful, you suffer no ill effects. If it is not, however, your condition worsens to dying. If you can use Healing as a free action, it can cure any of your conditions and is not considered strenuous.</p>",
    "specificExtras": [
      {
        "name": "Energizing",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Energizing (+1): You can grant an immediate recovery check for fatigued and exhausted conditions as well as damage conditions. However, you automatically take on the subject’s fatigue condition and you cannot use Healing to eliminate your own fatigue conditions (although you can still use hero points to recover from them). If the subject’s recovery check fails, you must wait the normal recovery time or use extra effort to try again."
      },
      {
        "name": "Resurrection",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Resurrection (+1): You can restore life to the dead! If the subject has been dead for fewer minutes than your power rank, make a DC 20 Con check for the subject with a bonus equal to your power rank. If successful, the patient’s condition becomes disabled and unconscious. If the check fails, you can’t try again. If you apply the Progression feat, move the amount of time a subject can be dead one step up the Time and Value Progression Table (from power rank minutes to power rank × 5 minutes, then power rank × 20 minutes, power rank hours, and so forth)."
      },
      {
        "name": "Total",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Total (+1): You can completely heal multiple damage conditions at once. For every 5 points the recovery check (including your Healing bonus) exceeds the DC, the subject’s next worst damage condition heals as well."
      }
    ],
    "specificFlaws": [
      {
        "name": "Empathic (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Empathic (–1): When you cure someone else of a condition, you acquire the condition and must recover from it normally. You can use your Healing and Regeneration powers to cure conditions you acquire in this way. You can have the Resurrection modifier, but if you use it, you die!"
      }
    ],
    "profiles": [
      {
        "name": "Healing",
        "type": "Alteration",
        "action": "Full",
        "range": "Touch",
        "duration": "Instant",
        "baseCost": 2,
        "fullText": "<p>You can heal injuries by touch. With a full-round action, you can do any one of the following: •\tGrant a character an immediate recovery check for the subject’s worst damage condition, with a bonus equal to your Healing rank. If the check fails, you must wait the normal recovery time for that condition or use extra effort to try again. If successful, you can use Healing again normally. •\tGrant a bonus on saving throws equal to your Healing rank against effects with disease or poison descriptors. The bonus applies to the subject’s next save against the effect. •\tStabilize a dying character with a DC 10 Healing check. You must maintain contact with the target for a full round for the power to take effect. You can use Healing on yourself. You can’t cure your own stunned, staggered, or unconscious conditions or stabilize yourself (since you have to be able to take a full action to use your Healing effect). You can use Healing to cure your own disabled condition, but doing so is a strenuous action. If your recovery check is successful, you suffer no ill effects. If it is not, however, your condition worsens to dying. If you can use Healing as a free action, it can cure any of your conditions and is not considered strenuous.</p>",
        "effectName": "Healing"
      }
    ]
  },
  {
    "name": "Illusion",
    "type": "Sensory",
    "action": "Standard (active)",
    "range": "Perception",
    "duration": "Concentration",
    "baseCost": 1,
    "fullText": "<p>You can create false sensory impressions. This ranges from visual images to phantom sounds, smells, or even radar or mental images. For 1 point per rank, you can create an illusion affecting a single sense type. For 2 points per rank, you can affect two sense types. For 3 points per rank, you can affect three sense types. At 4 points per rank, you can affect all sense types. Visual senses count as two sense types. Your illusion occupies an area 5 feet in radius.</p><p>Illusions have no substance and cannot have any real-world effect. Illusions cannot provide illumination, nutrition, warmth, or the like (although they can provide the sensations of these things). Likewise, an illusory wall only prevents people from moving through an area so long as they believe it’s real, and an illusory bridge or floor is revealed as false as soon as someone tries to walk across it and falls through!</p><p>Characters encountering an illusion do not receive saving throws to recognize it as illusory until they interact with it in some fashion. A successful Will save against an illusion reveals it to be false. A failed saving throw means the character fails to notice anything amiss. A character faced with proof an illusion isn’t real needs no saving throw. If any viewer successfully uncovers an illusion and communicates this fact to others, they gain another saving throw with a +4 bonus. Circumstances may grant additional modifiers to the Will save to uncover an illusion, depending on how convincing it is.</p><p>Maintaining a static illusion (one that doesn’t move or interact) is a free action. Maintaining an active illusion (such as a fighting creature) requires concentration.</p>",
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
        "desc": "Phantasms (–1): Your illusion are a mental as well as a sensory effect. Only creatures with Int 1 or more can perceive them. They are undetectable to machines like cameras and microphones."
      }
    ],
    "profiles": [
      {
        "name": "Illusion",
        "type": "Sensory",
        "action": "Standard",
        "range": "Perception",
        "duration": "Concentration",
        "baseCost": 1,
        "fullText": "<p>You can create false sensory impressions. This ranges from visual images to phantom sounds, smells, or even radar or mental images. For 1 point per rank, you can create an illusion affecting a single sense type. For 2 points per rank, you can affect two sense types. For 3 points per rank, you can affect three sense types. At 4 points per rank, you can affect all sense types. Visual senses count as two sense types. Your illusion occupies an area 5 feet in radius. Illusions have no substance and cannot have any real-world effect. Illusions cannot provide illumination, nutrition, warmth, or the like (although they can provide the sensations of these things). Likewise, an illusory wall only prevents people from moving through an area so long as they believe it’s real, and an illusory bridge or floor is revealed as false as soon as someone tries to walk across it and falls through! Characters encountering an illusion do not receive saving throws to recognize it as illusory until they interact with it in some fashion. A successful Will save against an illusion reveals it to be false. A failed saving throw means the character fails to notice anything amiss. A character faced with proof an illusion isn’t real needs no saving throw. If any viewer successfully uncovers an illusion and communicates this fact to others, they gain another saving throw with a +4 bonus. Circumstances may grant additional modifiers to the Will save to uncover an illusion, depending on how convincing it is. Maintaining a static illusion (one that doesn’t move or interact) is a free action. Maintaining an active illusion (such as a fighting creature) requires concentration.</p>",
        "effectName": "Illusion"
      }
    ]
  },
  {
    "name": "Immovable",
    "type": "Defense",
    "action": "Reaction (passive)",
    "range": "Personal",
    "duration": "Permanent",
    "baseCost": 1,
    "fullText": "<p>You’re especially resistant to being moved by attacks. You gain a +4 bonus per rank against all attempts to push, rush, trip, or throw you, and reduce the distance you are knocked back by an attack, adding your Immovable rank to your knockback modifier (see Knockback, page 165).</p><p>Additionally, when you’re struck with a slam attack (see Slam, page 158), you suffer less damage while your attacker suffers more! For each rank of Immovable, 1 point of damage bonus from the slam attack is shifted from you to your attacker, up to half the attack’s total damage bonus. So a +12 slam attack against a target with Immovable 8 shifts 6 points of damage (or half) back to the attacker; the target suffers +6 damage, while the attacker suffers +12! Slamming into an Immovable target can be even worse than hitting a brick wall.</p><p>To gain the benefits of this power, you cannot move more than your normal speed in a round. If you move at accelerated speed (two move actions), your Immovable rank is halved. If you move all out, you lose the benefit of Immovable for the round.</p>",
    "specificExtras": [
      {
        "name": "Unstoppable",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Unstoppable (+1): Your speed has no effect on your immovability; you can move all out while retaining your full effect rank. You also subtract your Immovable rank from an opponent’s Immovable rank before determining its effect, including the damage from a slam attack, allowing you to slam Immovable opponents for more damage than usual. You cannot reduce an opponent’s effective Immovable rank below 0."
      }
    ],
    "profiles": [
      {
        "name": "Immovable",
        "type": "Defense",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Permanent",
        "baseCost": 1,
        "fullText": "<p>You’re especially resistant to being moved by attacks. You gain a +4 bonus per rank against all attempts to push, rush, trip, or throw you, and reduce the distance you are knocked back by an attack, adding your Immovable rank to your knockback modifier (see Knockback, page 165). Additionally, when you’re struck with a slam attack (see Slam, page 158), you suffer less damage while your attacker suffers more! For each rank of Immovable, 1 point of damage bonus from the slam attack is shifted from you to your attacker, up to half the attack’s total damage bonus. So a +12 slam attack against a target with Immovable 8 shifts 6 points of damage (or half) back to the attacker; the target suffers +6 damage, while the attacker suffers +12! Slamming into an Immovable target can be even worse than hitting a brick wall. To gain the benefits of this power, you cannot move more than your normal speed in a round. If you move at accelerated speed (two move actions), your Immovable rank is halved. If you move all out, you lose the benefit of Immovable for the round.</p>",
        "effectName": "Immovable"
      }
    ]
  },
  {
    "name": "Immunity",
    "type": "Defense",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Permanent",
    "baseCost": 1,
    "fullText": "<p>You are immune to certain effects, automatically succeeding on any saving throws or ability checks against them. You assign ranks of Immunity to various effects (with more extensive effects requiring more ranks). These assignments are permanent:</p><p>•\t1 rank: aging, disease, poison, one environmental condition (cold,</p><p>heat, high pressure, radiation, or vacuum), one type of suffocation (breathe normally underwater or in an alien atmosphere, for example), starvation and thirst, need for sleep, or a rare power descriptor (such as your own powers, a close sibling’s powers, etc.).</p><p>•\t2 ranks: critical hits, suffocation (no need to breathe at all), or an uncom-</p><p>mon power descriptor (such as chemical, gravitic, necromantic, etc.).</p><p>•\t5 ranks: alteration effects, dazzle effects, emotion effects, entrap-</p><p>ment (grappling, snares, or bonds), fatigue effects, interaction skills, trait effects, or a particular type of damage (such as bullets, cold, electricity, falling, fire, magic, radiation, sonic, etc.).</p><p>•\t9 ranks: life support (includes immunity to disease, poison, all environmental conditions, and suffocation).</p><p>•\t10 ranks: mental effects, a very common power descriptor (such as</p><p>cutting, elemental, impact, metal, magic, technological, etc.).</p><p>•\t20 ranks: all nonlethal physical damage, all lethal physical damage,</p><p>all nonlethal energy damage, or all lethal energy damage.</p><p>•\t30 ranks: Any effect calling for a particular saving throw: Fortitude, Reflex, or Will.</p><p>For example, at Immunity 11 you could have life support (9 ranks) plus Immunity to critical hits (2 more ranks), or life support plus Immunity to aging (1 rank) and a rare power descriptor (1 rank), or any other combination adding up to 11 ranks.</p>",
    "specificFlaws": [
      {
        "name": "Limited (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Limited (–1): You suffer half the normal effect rather than being entirely immune to it. For environmental effects, you only make checks half as often. For other effects, halve the effect’s rank before determining its saving throw DC. Alternately, if your immunity is to an effect causing lethal damage, it can cause nonlethal damage instead."
      }
    ],
    "profiles": [
      {
        "name": "Immunity",
        "type": "Defense",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Permanent",
        "baseCost": 1,
        "fullText": "<p>You are immune to certain effects, automatically succeeding on any saving throws or ability checks against them. You assign ranks of Immunity to various effects (with more extensive effects requiring more ranks). These assignments are permanent: •\t1 rank: aging, disease, poison, one environmental condition (cold, heat, high pressure, radiation, or vacuum), one type of suffocation (breathe normally underwater or in an alien atmosphere, for example), starvation and thirst, need for sleep, or a rare power descriptor (such as your own powers, a close sibling’s powers, etc.). •\t2 ranks: critical hits, suffocation (no need to breathe at all), or an uncom- mon power descriptor (such as chemical, gravitic, necromantic, etc.). •\t5 ranks: alteration effects, dazzle effects, emotion effects, entrap- ment (grappling, snares, or bonds), fatigue effects, interaction skills, trait effects, or a particular type of damage (such as bullets, cold, electricity, falling, fire, magic, radiation, sonic, etc.). •\t9 ranks: life support (includes immunity to disease, poison, all environmental conditions, and suffocation). •\t10 ranks: mental effects, a very common power descriptor (such as cutting, elemental, impact, metal, magic, technological, etc.). •\t20 ranks: all nonlethal physical damage, all lethal physical damage, all nonlethal energy damage, or all lethal energy damage. •\t30 ranks: Any effect calling for a particular saving throw: Fortitude, Reflex, or Will. For example, at Immunity 11 you could have life support (9 ranks) plus Immunity to critical hits (2 more ranks), or life support plus Immunity to aging (1 rank) and a rare power descriptor (1 rank), or any other combination adding up to 11 ranks.</p>",
        "effectName": "Immunity"
      }
    ],
    "options": [
      {
        "name": "Aging",
        "cost": 1,
        "costType": "flat"
      },
      {
        "name": "Disease",
        "cost": 1,
        "costType": "flat"
      },
      {
        "name": "Poison",
        "cost": 1,
        "costType": "flat"
      },
      {
        "name": "Environmental Condition (Cold)",
        "cost": 1,
        "costType": "flat"
      },
      {
        "name": "Environmental Condition (Heat)",
        "cost": 1,
        "costType": "flat"
      },
      {
        "name": "Environmental Condition (High Pressure)",
        "cost": 1,
        "costType": "flat"
      },
      {
        "name": "Environmental Condition (Radiation)",
        "cost": 1,
        "costType": "flat"
      },
      {
        "name": "Environmental Condition (Vacuum)",
        "cost": 1,
        "costType": "flat"
      },
      {
        "name": "Suffocation (1 type)",
        "cost": 1,
        "costType": "flat"
      },
      {
        "name": "Suffocation (All)",
        "cost": 2,
        "costType": "flat"
      },
      {
        "name": "Starvation and Thirst",
        "cost": 1,
        "costType": "flat"
      },
      {
        "name": "Need for Sleep",
        "cost": 1,
        "costType": "flat"
      },
      {
        "name": "Rare Descriptor",
        "cost": 1,
        "costType": "flat"
      },
      {
        "name": "Critical Hits",
        "cost": 2,
        "costType": "flat"
      },
      {
        "name": "Uncommon Descriptor",
        "cost": 2,
        "costType": "flat"
      },
      {
        "name": "Alteration Effects",
        "cost": 5,
        "costType": "flat"
      },
      {
        "name": "Dazzle Effects",
        "cost": 5,
        "costType": "flat"
      },
      {
        "name": "Emotion Effects",
        "cost": 5,
        "costType": "flat"
      },
      {
        "name": "Entrapment",
        "cost": 5,
        "costType": "flat"
      },
      {
        "name": "Fatigue Effects",
        "cost": 5,
        "costType": "flat"
      },
      {
        "name": "Interaction Skills",
        "cost": 5,
        "costType": "flat"
      },
      {
        "name": "Trait Effects",
        "cost": 5,
        "costType": "flat"
      },
      {
        "name": "Specific Damage Type (e.g., Fire, Cold)",
        "cost": 5,
        "costType": "flat"
      },
      {
        "name": "Life Support",
        "cost": 9,
        "costType": "flat"
      },
      {
        "name": "Mental Effects",
        "cost": 10,
        "costType": "flat"
      },
      {
        "name": "Very Common Descriptor (e.g., Magic, Metal)",
        "cost": 10,
        "costType": "flat"
      },
      {
        "name": "All Nonlethal Physical Damage",
        "cost": 20,
        "costType": "flat"
      },
      {
        "name": "All Lethal Physical Damage",
        "cost": 20,
        "costType": "flat"
      },
      {
        "name": "All Nonlethal Energy Damage",
        "cost": 20,
        "costType": "flat"
      },
      {
        "name": "All Lethal Energy Damage",
        "cost": 20,
        "costType": "flat"
      },
      {
        "name": "Fortitude Effects",
        "cost": 30,
        "costType": "flat"
      },
      {
        "name": "Reflex Effects",
        "cost": 30,
        "costType": "flat"
      },
      {
        "name": "Will Effects",
        "cost": 30,
        "costType": "flat"
      }
    ]
  },
  {
    "name": "Insubstantial",
    "type": "Alteration",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "baseCost": 5,
    "fullText": "<p>You can assume a less solid form, with each Insubstantial rank becoming progressively less solid. You do not gain the ability to assume lowerranked Insubstantial forms, but you can acquire a lower-ranked form as an Alternate Power feat of a higher-ranked one (see page 108). You can switch between normal and an Insubstantial form at will as a free action once per round.</p><p>•\tRank 1: You become fluid. You can flow or squeeze through any sort of opening, under (or around) doors, through keyholes and pipes, and so forth. You cannot pass through watertight seals. You can automatically flow out of any restraint—such as a snare or grapple—that is not watertight (you automatically succeed on Escape Artist checks). You cannot flow out of a bubble completely enclosing you, for example, but anything less cannot hold you. You can exert your normal Strength and can still carry objects, although your manual dexterity may be limited (at the GM’s discretion).</p><hr style='border: 1px dashed var(--border-color); margin: 10px 0;'/><strong>ASIDE: <p><strong>UNDER THE HOOD: IMMUNITY</strong></p><p>There are characters in the comics just plain immune to certain things. Immunity is intended to provide this option in Mutants & Masterminds. It’s just simpler at some point to say a character is immune to something than it is to bother rolling dice. Immunity also encourages creativity. If you can’t overcome a foe just by hitting him, what then? Encourage players to use tactics, cleverness, power stunts, and hero points to deal with foes immune to their more conventional attacks.</p><p>If you find Immunity—especially at higher ranks—is a problem in your game or ruining everyone’s fun, feel free to restrict it (perhaps to no more than 10 ranks) or eliminate it altogether, replacing it with Protection and saving throw bonuses with appropriate power modifiers.</p><p>•\tRank 2: You become a cloud of gas or fine particles. You have no Strength in gaseous form, but you are immune to physical damage. Energy attacks still affect you normally, as do area effects (see page 159). You can flow through any opening that is not airtight.</p><p>•\tRank 3: You become coherent energy. You have no Strength, but you are immune to physical damage. Energy attacks (other than the energy making up your form) damage you normally. You can pass through solid objects, but energy resistant barriers, like heavy shielding or force fields, block your movement.</p><p>•\tRank 4: You become incorporeal. You can pass through solid matter at your normal speed and you are unaffected by physical and energy attacks. Mental and sensory effects still work on you, as do powers with the Affects Insubstantial power feat. Choose one other reasonably common effect that works on you while you are incorporeal. You have no Strength and cannot affect the physical world unless you purchase the Affects Corporeal modifier on one or more of your abilities or powers. Your mental and sensory effects still work normally.</p></strong>",
    "profiles": [
      {
        "name": "Insubstantial",
        "type": "Alteration",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 5,
        "fullText": "<p>You can assume a less solid form, with each Insubstantial rank becoming progressively less solid. You do not gain the ability to assume lowerranked Insubstantial forms, but you can acquire a lower-ranked form as an Alternate Power feat of a higher-ranked one (see page 108). You can switch between normal and an Insubstantial form at will as a free action once per round. •\tRank 1: You become fluid. You can flow or squeeze through any sort of opening, under (or around) doors, through keyholes and pipes, and so forth. You cannot pass through watertight seals. You can automatically flow out of any restraint—such as a snare or grapple—that is not watertight (you automatically succeed on Escape Artist checks). You cannot flow out of a bubble completely enclosing you, for example, but anything less cannot hold you. You can exert your normal Strength and can still carry objects, although your manual dexterity may be limited (at the GM’s discretion). UNDER THE HOOD: IMMUNITY There are characters in the comics just plain immune to certain things. Immunity is intended to provide this option in Mutants & Masterminds. It’s just simpler at some point to say a character is immune to something than it is to bother rolling dice. Immunity also encourages creativity. If you can’t overcome a foe just by hitting him, what then? Encourage players to use tactics, cleverness, power stunts, and hero points to deal with foes immune to their more conventional attacks. If you find Immunity—especially at higher ranks—is a problem in your game or ruining everyone’s fun, feel free to restrict it (perhaps to no more than 10 ranks) or eliminate it altogether, replacing it with Protection and saving throw bonuses with appropriate power modifiers. •\tRank 2: You become a cloud of gas or fine particles. You have no Strength in gaseous form, but you are immune to physical damage. Energy attacks still affect you normally, as do area effects (see page 159). You can flow through any opening that is not airtight. •\tRank 3: You become coherent energy. You have no Strength, but you are immune to physical damage. Energy attacks (other than the energy making up your form) damage you normally. You can pass through solid objects, but energy resistant barriers, like heavy shielding or force fields, block your movement. •\tRank 4: You become incorporeal. You can pass through solid matter at your normal speed and you are unaffected by physical and energy attacks. Mental and sensory effects still work on you, as do powers with the Affects Insubstantial power feat. Choose one other reasonably common effect that works on you while you are incorporeal. You have no Strength and cannot affect the physical world unless you purchase the Affects Corporeal modifier on one or more of your abilities or powers. Your mental and sensory effects still work normally.</p>",
        "effectName": "Insubstantial"
      }
    ]
  },
  {
    "name": "Leaping",
    "type": "Movement",
    "action": "Move (active)",
    "range": "Personal",
    "duration": "Instant",
    "baseCost": 1,
    "fullText": "<p>You can make prodigious leaps. Rank 1 Leaping doubles your jumping distances. Each additional rank moves the multiple one step up the Time and Value Progression Table. So at rank 9, you leap 1,000 times your normal distance. At rank 20, you can make leaps of up to 5 million times your normal distance! (each foot becomes approximately 1,000 miles!) You do not suffer any damage from landing after a jump, so long as it is within your maximum jumping distance.</p><p>At rank 5 (50 times normal distance), you are in the air for at least a full round before you land. Each additional rank adds another full round</p><p>in the air. So a rank 10 leap (×1,000 your normal distance) lasts for six full rounds before you land. You can act normally during this time, as if you were flying, but you can’t change your speed or direction without using some other power.</p>",
    "profiles": [
      {
        "name": "Leaping",
        "type": "Movement",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "baseCost": 1,
        "fullText": "<p>You can make prodigious leaps. Rank 1 Leaping doubles your jumping distances. Each additional rank moves the multiple one step up the Time and Value Progression Table. So at rank 9, you leap 1,000 times your normal distance. At rank 20, you can make leaps of up to 5 million times your normal distance! (each foot becomes approximately 1,000 miles!) You do not suffer any damage from landing after a jump, so long as it is within your maximum jumping distance. At rank 5 (50 times normal distance), you are in the air for at least a full round before you land. Each additional rank adds another full round in the air. So a rank 10 leap (×1,000 your normal distance) lasts for six full rounds before you land. You can act normally during this time, as if you were flying, but you can’t change your speed or direction without using some other power.</p>",
        "effectName": "Leaping"
      }
    ]
  },
  {
    "name": "Luck Control",
    "type": "General",
    "action": "Reaction (passive)",
    "range": "Perception",
    "duration": "Instant",
    "baseCost": 3,
    "fullText": "<p>You can use your hero points to affect others in various ways (see Hero Points, page 121). Each rank, choose one of the following capabilities:</p><p>•\tYou can spend a hero point on another character’s behalf, with the normal benefits.</p><p>•\tYou can spend one of your own hero points to negate a use of Gamemaster fiat (see page 124). This also eliminates the setback of the fiat, so no hero points are awarded for it.</p><p>•\tYou can spend a hero point to force someone else to re-roll a d20 roll and take the worse of the two rolls. The target of this last effect may spend a hero point to avoid having to re-roll.</p><p>Modifiers—such as Area—allowing you to affect multiple targets at once require you to spend one hero point to affect all targets in the area. You need the Selective Attack extra (see page 113) to choose which targets are affected, otherwise, your power affects everyone in the area.</p>",
    "profiles": [
      {
        "name": "Luck Control",
        "type": "General",
        "action": "Reaction",
        "range": "Perception",
        "duration": "Instant",
        "baseCost": 3,
        "fullText": "<p>You can use your hero points to affect others in various ways (see Hero Points, page 121). Each rank, choose one of the following capabilities: •\tYou can spend a hero point on another character’s behalf, with the normal benefits. •\tYou can spend one of your own hero points to negate a use of Gamemaster fiat (see page 124). This also eliminates the setback of the fiat, so no hero points are awarded for it. •\tYou can spend a hero point to force someone else to re-roll a d20 roll and take the worse of the two rolls. The target of this last effect may spend a hero point to avoid having to re-roll. Modifiers—such as Area—allowing you to affect multiple targets at once require you to spend one hero point to affect all targets in the area. You need the Selective Attack extra (see page 113) to choose which targets are affected, otherwise, your power affects everyone in the area.</p>",
        "effectName": "Luck Control"
      }
    ]
  },
  {
    "name": "Mind Control",
    "type": "Sensory (mental)",
    "action": "Standard (active)",
    "range": "Perception",
    "duration": "Concentration (lasting)",
    "baseCost": 2,
    "fullText": "<hr style='border: 1px dashed var(--border-color); margin: 10px 0;'/><strong>ASIDE: <p><strong>UNDER THE HOOD: MIMIC</strong></p><p>Mimic, especially with the right modifiers, can be very powerful. Gamemasters may want to restrict players to certain levels, possibly prohibiting the 5-point level (all traits at once), as well as the Continuous, Perception, and Ranged modifiers, or limiting the power to a certain type of target.</p><p>Y\tou can control another character’s mind, and therefore actions. To use Mind Control, make a power check against the result of the target’s Will saving throw. If you succeed, you control the target’s actions as long as you concentrate. If you fail, there is no effect. You can try again, but the target gets a cumulative +1 on Will saves for each successive attempt in the same encounter.</p><p>Issuing a command is a move action, separate from the standard action needed to establish control. If the target has no means of understanding</p><p>you, you can only issue simple commands that can be conveyed with gestures (like “go there” or “stop”).</p><p>Targets of Mind Control get a new Will saving throw for each interval on the Time and Value Progression Table, starting at one minute, with a cumulative +1 bonus per save. Targets commanded to carry out an action strongly against their nature get a new Will save immediately with a +1 to +4 bonus, depending on the type of command. Success breaks your control. Obviously self-destructive commands are automatically ignored, but do not break your control.</p><p>The subject’s consciousness is suppressed while controlled, meaning the target cannot say or do anything without direction, and has no memory of being controlled.</p></strong>",
    "specificExtras": [
      {
        "name": "Conscious",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Conscious (+1): Your controlled subject is conscious and aware, but completely obedient to your commands. This means the subject can be commanded to relate knowledge or use skills based on mental abilities. Subjects are aware of being controlled once the Mind Control ends unless the power is Subtle, in which case subjects have no explanation for their unusual behavior or simply no memory of it (your choice when you end the control)."
      },
      {
        "name": "Sensory Link",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Sensory Link (+1): You can perceive everything one of your controlled subjects does. Your own senses are inactive while you are using your sensory link."
      }
    ],
    "specificFlaws": [
      {
        "name": "One Command (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "One Command (–1): You can only give targets one command, like “don’t move” or “live out your repressed desires.” This command is chosen when you acquire the power and can’t be changed."
      },
      {
        "name": "Sense-Dependent (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Sense-Dependent (–1): Your Mind Control works through a target’s senses. Examples include eye contact (visual), hypnotic music (auditory), pheromones (olfactory), etc. See the Sense-Dependent flaw, page 115, for details."
      }
    ],
    "profiles": [
      {
        "name": "Mind Control",
        "type": "Mental",
        "action": "Standard",
        "range": "Perception",
        "duration": "Concentration (Lasting)",
        "baseCost": 2,
        "fullText": "<p>UNDER THE HOOD: MIMIC Mimic, especially with the right modifiers, can be very powerful. Gamemasters may want to restrict players to certain levels, possibly prohibiting the 5-point level (all traits at once), as well as the Continuous, Perception, and Ranged modifiers, or limiting the power to a certain type of target. Y\tou can control another character’s mind, and therefore actions. To use Mind Control, make a power check against the result of the target’s Will saving throw. If you succeed, you control the target’s actions as long as you concentrate. If you fail, there is no effect. You can try again, but the target gets a cumulative +1 on Will saves for each successive attempt in the same encounter. Issuing a command is a move action, separate from the standard action needed to establish control. If the target has no means of understanding you, you can only issue simple commands that can be conveyed with gestures (like “go there” or “stop”). Targets of Mind Control get a new Will saving throw for each interval on the Time and Value Progression Table, starting at one minute, with a cumulative +1 bonus per save. Targets commanded to carry out an action strongly against their nature get a new Will save immediately with a +1 to +4 bonus, depending on the type of command. Success breaks your control. Obviously self-destructive commands are automatically ignored, but do not break your control. The subject’s consciousness is suppressed while controlled, meaning the target cannot say or do anything without direction, and has no memory of being controlled.</p>",
        "effectName": "Mind Control"
      }
    ]
  },
  {
    "name": "Mind Reading",
    "type": "Sensory (mental)",
    "action": "Standard/Full (active)",
    "range": "Perception",
    "duration": "Concentration (lasting)",
    "baseCost": 1,
    "fullText": "<p>You can read another character’s thoughts. To use Mind Reading, make a power check against the result of the target’s Will save.</p><p>If successful, you can read the target’s surface thoughts (whatever the target is presently thinking). Mind Reading transcends language; you comprehend the target’s thoughts whether or not you share a common language.</p><p>If you can interact with your subject, a successful Bluff check against the target’s Sense Motive check causes the subject to think about a particular piece of information you’re looking for, such as a password or name, allowing you to pluck it from the subject’s surface thoughts. The target gets an additional Will save for each interval that passes on the Time and Value Progression Table, with a cumulative +1 bonus per save.</p><p>If you fail your power check, you cannot read the target’s thoughts. You can try again the following round, but the target gets a cumulative +1 bonus on the Will save per attempt in that encounter.</p><p>You can also mentally probe a target’s mind for information. Take a full-round action and make a power check against the result of the target’s Will save. If successful, you can essentially ask any one question and receive the answer from the target’s mind. If the target doesn’t know the answer, then you know that. Especially personal or guarded information grants the target a +1 to +5 bonus on the Will save, while information the subject doesn’t consciously know (subconscious or forgotten due to amnesia, for example) grants a +5 to +10 bonus on the Will save and the target can’t forgo the save.</p><p>You can continue to ask questions, one per round, for as long as you maintain your mind probe, requiring a full-round action each round. The target gets an additional Will save for each interval on the Time and Value Progression Table, with a cumulative +1 bonus per save.</p><p>If you fail your power check, you cannot probe the target’s mind. You can try again the following round, but the target gets a cumulative +1 bonus on the Will save per attempt.</p>",
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
        "desc": "Limited (–1): Mind Reading can be limited to surface thoughts only or probing only, either being a –1 power modifier."
      }
    ],
    "profiles": [
      {
        "name": "Mind Reading",
        "type": "Mental",
        "action": "Standard/Full",
        "range": "Perception",
        "duration": "Concentration (Lasting)",
        "baseCost": 1,
        "fullText": "<p>You can read another character’s thoughts. To use Mind Reading, make a power check against the result of the target’s Will save. If successful, you can read the target’s surface thoughts (whatever the target is presently thinking). Mind Reading transcends language; you comprehend the target’s thoughts whether or not you share a common language. If you can interact with your subject, a successful Bluff check against the target’s Sense Motive check causes the subject to think about a particular piece of information you’re looking for, such as a password or name, allowing you to pluck it from the subject’s surface thoughts. The target gets an additional Will save for each interval that passes on the Time and Value Progression Table, with a cumulative +1 bonus per save. If you fail your power check, you cannot read the target’s thoughts. You can try again the following round, but the target gets a cumulative +1 bonus on the Will save per attempt in that encounter. You can also mentally probe a target’s mind for information. Take a full-round action and make a power check against the result of the target’s Will save. If successful, you can essentially ask any one question and receive the answer from the target’s mind. If the target doesn’t know the answer, then you know that. Especially personal or guarded information grants the target a +1 to +5 bonus on the Will save, while information the subject doesn’t consciously know (subconscious or forgotten due to amnesia, for example) grants a +5 to +10 bonus on the Will save and the target can’t forgo the save. You can continue to ask questions, one per round, for as long as you maintain your mind probe, requiring a full-round action each round. The target gets an additional Will save for each interval on the Time and Value Progression Table, with a cumulative +1 bonus per save. If you fail your power check, you cannot probe the target’s mind. You can try again the following round, but the target gets a cumulative +1 bonus on the Will save per attempt.</p>",
        "effectName": "Mind Reading"
      }
    ]
  },
  {
    "name": "Morph",
    "type": "Alteration",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "baseCost": 1,
    "fullText": "<p>You can alter your appearance to that of other creatures or even objects of the same mass. Your traits do not change; your new form is merely a cosmetic change. You gain a +5 bonus to Disguise checks per rank when using Morph to assume a different form. For 1 point per rank you can assume a single other appearance. For 2 points per rank you can assume any form from a broad group like humanoids, animals, machines, and so forth. For 3 points per rank you can assume any form of the same mass. For the ability to change your size as well as appearance see Growth (see page 87) and Shrinking (see page 98). To take on the other traits of forms you assume, see Shapeshift (see page 98).</p>",
    "profiles": [
      {
        "name": "Morph",
        "type": "Alteration",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 1,
        "fullText": "<p>You can alter your appearance to that of other creatures or even objects of the same mass. Your traits do not change; your new form is merely a cosmetic change. You gain a +5 bonus to Disguise checks per rank when using Morph to assume a different form. For 1 point per rank you can assume a single other appearance. For 2 points per rank you can assume any form from a broad group like humanoids, animals, machines, and so forth. For 3 points per rank you can assume any form of the same mass. For the ability to change your size as well as appearance see Growth (see page 87) and Shrinking (see page 98). To take on the other traits of forms you assume, see Shapeshift (see page 98).</p>",
        "effectName": "Morph"
      }
    ]
  },
  {
    "name": "Move Object",
    "type": "General",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Sustained",
    "baseCost": 2,
    "fullText": "<p>You can move objects at a distance without touching them. Telekinesis has no action/reaction; a moving object cannot drag the character “holding” it, for example. Telekinesis is also not considered “physical contact” or “touch” for effects requiring it.</p><p>Your effective Strength for lifting and moving objects is 5 times your power rank (see Carrying Capacity, page 35). By taking a full action and concentrating you can increase this by +5 Str for as long as you concentrate. This is in addition to using extra effort to further double your carrying capacity (see page 120).</p><p>Telekinesis can move objects, but cannot perform tasks of fine manipulation (like untying knots, typing, or manipulating controls) without the Precise power feat (see page 109). Objects move as if thrown with your effective Strength (see page 36). Objects massing a heavy load or more move at a rate of 5 feet per round. Objects thrown as weapons base their damage off your Telekinesis rank as if it were your Strength bonus.</p><p>Telekinesis cannot inflict damage directly; you can’t “punch” or “crush” objects with it. You can use it to make disarm and trip attacks. Using Telekinesis to “grab” a creature is an attack similar to a grapple with a Strength bonus equal to your Telekinesis rank (see Grapple, page 156). The target cannot grapple you and you cannot inflict damage, only pin and hold the target immobile. You can move a pinned target like you would any other object, so long as the target remains pinned. Using Telekinesis to grapple requires a standard action.</p>",
    "specificExtras": [
      {
        "name": "Damaging",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Damaging (+1): Your Telekinesis can inflict damage equal to its rank, like an application of normal Strength. This includes damaging targets in grapples and making ranged telekinetic “punch” attacks."
      },
      {
        "name": "Perception",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Perception (+1): Your Telekinesis affects any target you can accurately perceive, with no need for an attack roll. This power is sometimes called psychokinesis and assigned a psionic or psychic descriptor."
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
    "baseCost": 2,
    "fullText": "<p>You can inflict weakness on a target. You may do so through nausea, momentary illness, pain, or even extreme pleasure. You must touch the target, who makes a Fortitude saving throw. If the save fails, the target is sickened, suffering a –2 penalty on all attack rolls and checks. If the save fails by 5 or more, or on a second successful use of the power, the target is nauseated, unable to do anything other than take a single move action each round. If the save fails by 10 or more, or on a third successful use of the power, the target is helpless. The victim gets a new saving throw each round to recover from the effects, with a +1 bonus for each previous save.</p>",
    "specificFlaws": [
      {
        "name": "Sicken (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Sicken (–1): Your power cannot inflict more than a sickened result."
      }
    ],
    "profiles": [
      {
        "name": "Nauseate",
        "type": "Attack",
        "action": "Standard",
        "range": "Touch",
        "duration": "Instant (Lasting)",
        "baseCost": 2,
        "fullText": "<p>You can inflict weakness on a target. You may do so through nausea, momentary illness, pain, or even extreme pleasure. You must touch the target, who makes a Fortitude saving throw. If the save fails, the target is sickened, suffering a –2 penalty on all attack rolls and checks. If the save fails by 5 or more, or on a second successful use of the power, the target is nauseated, unable to do anything other than take a single move action each round. If the save fails by 10 or more, or on a third successful use of the power, the target is helpless. The victim gets a new saving throw each round to recover from the effects, with a +1 bonus for each previous save.</p>",
        "effectName": "Nauseate"
      }
    ]
  },
  {
    "name": "Nullify (effect)",
    "type": "Trait",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Instant",
    "baseCost": 1,
    "fullText": "<p>You can counter a target’s powers (see Countering Powers, page 70). Make a ranged attack roll to hit the target. Then, make an opposed power check of your Nullify rank and the target power’s rank or the target’s Will save, whichever is higher. If you are targeting the subject of the power rather than the power’s user, make an opposed power check against the user (Will save is not a factor). If you win, the targeted power turns off, although the user can re-activate it normally. You can’t nullify Innate powers (see Innate, page 109). The cost per rank determines what you can counter:</p><p>•\t1 point: Counter any one power of a particular descriptor at a time</p><p>(fire powers, magical powers, mental powers, etc.).</p><p>•\t2 points: Counter all powers of a particular descriptor (such as fire</p><p>or magic) or type (like attack or sensory effects) at once. Choose the affected descriptor or type when you acquire the power.</p><p>•\t3 points: Counter all powers at once.</p>",
    "specificExtras": [
      {
        "name": "Duration (+1 per duration step)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Duration (+1 per duration step): If Nullify’s duration is increased above Instant, any countered effect cannot be re-activated until the duration expires. The user of the countered effect may use extra effort (see page 120) to gain another opposed check. If successful, the effect can be re-activated."
      },
      {
        "name": "Nullifying Field",
        "cost": 0,
        "costType": "per_rank",
        "desc": "Nullifying Field (+0): Rather than targeting a specific individual, you can Nullify any affected powers in a radius of (rank × 5) feet around you as a standard action. This is a combination of the Touch range (–1) and burst Area (+1) modifiers. Some characters have a Nullifying Field as an Alternate Power of Nullify."
      },
      {
        "name": "Power Resistance",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Power Resistance (+1): You can use Nullify to counter powers used on you (and only you) as a reaction. You cannot nullify other powers. This essentially changes the power’s action to Reaction (+3) and its range to Personal (–2)."
      }
    ]
  },
  {
    "name": "Obscure",
    "type": "Sensory",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Sustained",
    "baseCost": 1,
    "fullText": "<p>You can create total concealment in an area (see Concealment, page 161). Obscure costs 1 point per rank if it affects one sense type, 2 points per rank if it affects two sense types, 3 points per rank if it affects three sense types, and 4 points per rank if it affects all sense types. Visual senses count as two, so a 3 points per rank Obscure power could affect visual and one other sense type, for example. An Obscure effect can be centered on you or created at a distance as a standard action. It does not move once created, although you can reposition it as a move action. Characters suffer the effects of total concealment when unable to perceive an opponent and may suffer other hindrances as the GM sees fit. Your Obscure covers an area 5 feet in radius at rank 1. Each additional rank moves the radius one step up the Time and Value Progression Table.</p>",
    "specificFlaws": [
      {
        "name": "Partial (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Partial (–1): Your Obscure effect provides partial rather than total concealment."
      }
    ],
    "profiles": [
      {
        "name": "Obscure",
        "type": "Sensory",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 1,
        "fullText": "<p>You can create total concealment in an area (see Concealment, page 161). Obscure costs 1 point per rank if it affects one sense type, 2 points per rank if it affects two sense types, 3 points per rank if it affects three sense types, and 4 points per rank if it affects all sense types. Visual senses count as two, so a 3 points per rank Obscure power could affect visual and one other sense type, for example. An Obscure effect can be centered on you or created at a distance as a standard action. It does not move once created, although you can reposition it as a move action. Characters suffer the effects of total concealment when unable to perceive an opponent and may suffer other hindrances as the GM sees fit. Your Obscure covers an area 5 feet in radius at rank 1. Each additional rank moves the radius one step up the Time and Value Progression Table.</p>",
        "effectName": "Obscure"
      }
    ]
  },
  {
    "name": "Paralyze",
    "type": "Attack",
    "action": "Standard (active)",
    "range": "Touch",
    "duration": "Instant (lasting)",
    "baseCost": 2,
    "fullText": "<p>You can reduce a target’s speed and reaction time. Make an attack roll; if successful, the target makes a Will saving throw. If the save fails, the target is slowed and can only take a standard or move action each round (not both). The target takes a –1 penalty on attack rolls, Defense, and Reflex saves. A slowed target moves at half normal speed. If the save fails by 5 or more, or on a second successful attack, the target is paralyzed: helpless and unable to move or take any actions. The target gets a new Will save each round to overcome the effect, with a +1 bonus per previous save.</p>",
    "specificFlaws": [
      {
        "name": "Slow (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Slow (–1): Your power cannot inflict more than a slow result."
      }
    ],
    "profiles": [
      {
        "name": "Paralyze",
        "type": "Attack",
        "action": "Standard",
        "range": "Touch",
        "duration": "Instant (Lasting)",
        "baseCost": 2,
        "fullText": "<p>You can reduce a target’s speed and reaction time. Make an attack roll; if successful, the target makes a Will saving throw. If the save fails, the target is slowed and can only take a standard or move action each round (not both). The target takes a –1 penalty on attack rolls, Defense, and Reflex saves. A slowed target moves at half normal speed. If the save fails by 5 or more, or on a second successful attack, the target is paralyzed: helpless and unable to move or take any actions. The target gets a new Will save each round to overcome the effect, with a +1 bonus per previous save.</p>",
        "effectName": "Paralyze"
      }
    ]
  },
  {
    "name": "Probability Control",
    "type": "Alteration",
    "action": "Reaction (passive)",
    "range": "Personal",
    "duration": "Instant",
    "baseCost": 4,
    "fullText": "<p>You can use your hero points to affect others in various ways (see Hero Points, page 121). Each rank, choose one of the following capabilities:</p><p>•\tYou can spend a hero point on another character’s behalf, with the normal benefits.</p><p>•\tYou can spend one of your own hero points to negate a use of Gamemaster fiat (see page 124). This also eliminates the setback of the fiat, so no hero points are awarded for it.</p><p>•\tYou can spend a hero point to force someone else to re-roll a d20 roll and take the worse of the two rolls. The target of this last effect may spend a hero point to avoid having to re-roll.</p><p>Modifiers—such as Area—allowing you to affect multiple targets at once require you to spend one hero point to affect all targets in the area. You need the Selective Attack extra (see page 113) to choose which targets are affected, otherwise, your power affects everyone in the area.</p>"
  },
  {
    "name": "Protection",
    "type": "Defense",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Permanent",
    "baseCost": 1,
    "fullText": "<p>You’re particularly resistant to harm. You gain a bonus on your Toughness saving throws equal to your Protection rank.</p>",
    "specificExtras": [
      {
        "name": "Impervious",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Impervious (+1): Your Protection stops some damage completely. If an attack has a damage bonus less than your Protection rank, it inflicts no damage (you automatically succeed on your Toughness saving throw). Penetrating damage (see page 112) ignores this modifier; you must save against it normally. This modifier can also be applied to the Toughness save bonus from Constitution (costing 1 point per +1 save bonus made Impervious)."
      }
    ],
    "specificFlaws": [
      {
        "name": "Ablative (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Ablative (–1): Damage chips away at your Protection. Each time it provides its bonus, it loses 1 power point of effectiveness. When reduced to 0 power points, it no longer protects you at all. This is the same as the Fades flaw (see page 114)."
      },
      {
        "name": "Limited (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Limited (–1): Your Protection applies to only one of a broad type of damage (physical or energy). If your Protection applies to only one of a narrow type of damage (edged weapons, blunt weapons, electricity, fire, magic, etc.) it has a –3 modifier."
      }
    ],
    "profiles": [
      {
        "name": "Protection",
        "type": "Defense",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Permanent",
        "baseCost": 1,
        "fullText": "<p>You’re particularly resistant to harm. You gain a bonus on your Toughness saving throws equal to your Protection rank.</p>",
        "effectName": "Protection"
      }
    ]
  },
  {
    "name": "Quickness",
    "type": "General",
    "action": "Free (passive)",
    "range": "Personal",
    "duration": "Continuous",
    "baseCost": 1,
    "fullText": "<p>You can perform routine tasks quickly. For purposes of this power a “routine task” is one where you can take 20 on the check. At rank 1 you perform such tasks at twice normal speed (x2). Each additional rank moves your speed one step up the Time and Value Progression Table (x5, x10, x25, and so forth). At rank 20, you perform routine tasks at 5 million times normal speed! Tasks where you cannot take 20 (including combat actions) are unaffected by Quickness, nor is movement speed.</p><p>You can take 20 normally using Quickness and, if your power rank is high enough, you may be able to take 20 on a task in a single standard action (3 seconds) or less. If you can perform a task in less than a second, the GM may choose to treat that task as a free action for you (although the GM can still limit the number of free actions you can accomplish in a round as usual). Among other things, this allows you to do things like take 20 on a Disable Device check by trying all possible combinations of a lock at great speed, or take 20 on a Knowledge check by reading all available research materials in an instant.</p>",
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
    ],
    "profiles": [
      {
        "name": "Quickness",
        "type": "General",
        "action": "Free",
        "range": "Personal",
        "duration": "Continuous",
        "baseCost": 1,
        "fullText": "<p>You can perform routine tasks quickly. For purposes of this power a “routine task” is one where you can take 20 on the check. At rank 1 you perform such tasks at twice normal speed (x2). Each additional rank moves your speed one step up the Time and Value Progression Table (x5, x10, x25, and so forth). At rank 20, you perform routine tasks at 5 million times normal speed! Tasks where you cannot take 20 (including combat actions) are unaffected by Quickness, nor is movement speed. You can take 20 normally using Quickness and, if your power rank is high enough, you may be able to take 20 on a task in a single standard action (3 seconds) or less. If you can perform a task in less than a second, the GM may choose to treat that task as a free action for you (although the GM can still limit the number of free actions you can accomplish in a round as usual). Among other things, this allows you to do things like take 20 on a Disable Device check by trying all possible combinations of a lock at great speed, or take 20 on a Knowledge check by reading all available research materials in an instant.</p>",
        "effectName": "Quickness"
      }
    ]
  },
  {
    "name": "Regeneration",
    "type": "Alteration",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Permanent",
    "baseCost": 1,
    "fullText": "<p>You recover from damage more easily. For each rank of Regeneration, choose one of the following benefits:</p><p>•\tRecovery Bonus: You gain a +1 bonus on your Constitution checks to recover from damage. If you have no Constitution score, one rank allows you to make recovery checks at –4, with each additional rank improving your bonus normally (–3 at rank 2, +0 at rank 5, then increasing from there). At a +9 or better bonus, you automatically succeed on recovery checks (since they are DC 10).</p><p>•\tRecovery Rate: You make checks to recover from a particular damage condition faster. Each rank moves the rest time required to make a recovery check for that condition one step down the Time and Value Progression Table (see page 70). So, for example, characters normally get one check per hour of rest to recover from being injured. One Regeneration rank reduces that time to 20 minutes, two to 5 minutes, three to 1 minute, and so forth. If the time is brought below one action (3 seconds), the character gets a recovery check for that condition once per round with no need for rest. Each damage condition (Bruised, Injured, Unconscious, Staggered, and Disabled) requires a separate application of Regeneration ranks, as follows:</p><p>Bruised or Unconscious: One rank allows a recovery check after one round, two ranks per standard action, three ranks once per round with no rest. Bruised conditions recover automatically after the required time, with no check necessary.</p><p>Injured or Staggered: One rank allows a recovery check once per 20 minutes, two ranks per 5 minutes, three ranks per minute, and four ranks per round, five ranks per standard action, and six ranks per round with no rest. Injured conditions recover automatically after the required time, with no check necessary.</p><p>Disabled: One rank allows a recovery check per 5 hours, two ranks per hour, three ranks per 20 minutes, four ranks per 5 minutes, five ranks per minute, and six ranks per round, seven ranks per standard action, and eight ranks per round with no rest.</p><p>•\tAbility Damage: One Regeneration rank allows you to recover a point of ability damage (see page 166) per 5 hours, two ranks per hour, three ranks per 20 minutes, four ranks per 5 minutes, five ranks</p><hr style='border: 1px dashed var(--border-color); margin: 10px 0;'/><strong>ASIDE: <p><strong>UNDER THE HOOD: QUICKNESS</strong></p><p>Quickness is obviously not realistic; it allows you to do things like disassemble an entire car in a single round at high enough ranks, but doesn’t have any effect at all on how many attacks you can make. Why? Two reasons: first because allowing any character potentially millions of attacks per round would slow down the game and be hugely unbalancing (to say the least). Second, and perhaps more important, it’s how superhuman quickness works in the comics: speedsters do routine things in the blink of an eye, but in fights they don’t really act more often than anyone else. See Super-Speed (see page 104) for some examples of the special attacks speedsters might have, in addition to their Quickness.</p><p>per minute, six ranks per round, seven ranks per standard action, and eight ranks per round without resting.</p><p>•\tResurrection: You can recover from death! If you die, make a DC 10 recovery check a week later. If successful, your condition becomes unconscious and disabled (from which you recover normally). If the check fails, you’re permanently dead. You must specify a reasonably common effect or set of effects that keep you from recovering from death (such as beheading, cremation, a stake through the heart, etc.). You can increase the rate you make recovery checks from death with additional ranks, seperately from your normal recovery rate. At nine ranks you can check to recover from death each round. At ten ranks, you get a recovery check instantly when your condition becomes dead. If successful, you don’t die.</p><p>Total Regeneration—the ability to make a damage recovery check, including resurrection, every round without rest—requires 35 ranks, not including ranks allocated to recovery check bonus. If you also recover ability damage once per round, increase to 43 ranks.</p></strong>",
    "specificFlaws": [
      {
        "name": "Source (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Source (–1): Your Regeneration only works when you have access to a particular source, such as blood, electricity, scrap metal, sunlight, and so forth. Without this source, your power doesn’t work and you recover at normal speed. At the GM’s discretion, a weaker form of the source means you recover slower (your effective Regeneration rank is lower, in other words)."
      }
    ],
    "profiles": [
      {
        "name": "Regeneration",
        "type": "Alteration",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Permanent",
        "baseCost": 1,
        "fullText": "<p>You recover from damage more easily. For each rank of Regeneration, choose one of the following benefits: •\tRecovery Bonus: You gain a +1 bonus on your Constitution checks to recover from damage. If you have no Constitution score, one rank allows you to make recovery checks at –4, with each additional rank improving your bonus normally (–3 at rank 2, +0 at rank 5, then increasing from there). At a +9 or better bonus, you automatically succeed on recovery checks (since they are DC 10). •\tRecovery Rate: You make checks to recover from a particular damage condition faster. Each rank moves the rest time required to make a recovery check for that condition one step down the Time and Value Progression Table (see page 70). So, for example, characters normally get one check per hour of rest to recover from being injured. One Regeneration rank reduces that time to 20 minutes, two to 5 minutes, three to 1 minute, and so forth. If the time is brought below one action (3 seconds), the character gets a recovery check for that condition once per round with no need for rest. Each damage condition (Bruised, Injured, Unconscious, Staggered, and Disabled) requires a separate application of Regeneration ranks, as follows: Bruised or Unconscious: One rank allows a recovery check after one round, two ranks per standard action, three ranks once per round with no rest. Bruised conditions recover automatically after the required time, with no check necessary. Injured or Staggered: One rank allows a recovery check once per 20 minutes, two ranks per 5 minutes, three ranks per minute, and four ranks per round, five ranks per standard action, and six ranks per round with no rest. Injured conditions recover automatically after the required time, with no check necessary. Disabled: One rank allows a recovery check per 5 hours, two ranks per hour, three ranks per 20 minutes, four ranks per 5 minutes, five ranks per minute, and six ranks per round, seven ranks per standard action, and eight ranks per round with no rest. •\tAbility Damage: One Regeneration rank allows you to recover a point of ability damage (see page 166) per 5 hours, two ranks per hour, three ranks per 20 minutes, four ranks per 5 minutes, five ranks UNDER THE HOOD: QUICKNESS Quickness is obviously not realistic; it allows you to do things like disassemble an entire car in a single round at high enough ranks, but doesn’t have any effect at all on how many attacks you can make. Why? Two reasons: first because allowing any character potentially millions of attacks per round would slow down the game and be hugely unbalancing (to say the least). Second, and perhaps more important, it’s how superhuman quickness works in the comics: speedsters do routine things in the blink of an eye, but in fights they don’t really act more often than anyone else. See Super-Speed (see page 104) for some examples of the special attacks speedsters might have, in addition to their Quickness. per minute, six ranks per round, seven ranks per standard action, and eight ranks per round without resting. •\tResurrection: You can recover from death! If you die, make a DC 10 recovery check a week later. If successful, your condition becomes unconscious and disabled (from which you recover normally). If the check fails, you’re permanently dead. You must specify a reasonably common effect or set of effects that keep you from recovering from death (such as beheading, cremation, a stake through the heart, etc.). You can increase the rate you make recovery checks from death with additional ranks, seperately from your normal recovery rate. At nine ranks you can check to recover from death each round. At ten ranks, you get a recovery check instantly when your condition becomes dead. If successful, you don’t die. Total Regeneration—the ability to make a damage recovery check, including resurrection, every round without rest—requires 35 ranks, not including ranks allocated to recovery check bonus. If you also recover ability damage once per round, increase to 43 ranks.</p>",
        "effectName": "Regeneration"
      }
    ]
  },
  {
    "name": "Shrinking",
    "type": "Alteration",
    "action": "Free (active)",
    "range": "Personal",
    "duration": "Sustained",
    "baseCost": 1,
    "fullText": "<p>You can reduce your size. Every rank of Shrinking reduces your Strength by 1 (with a minimum of Str 1). Additionally, every four ranks reduce your size category by one. So a Medium-sized creature is Small at rank 4, Tiny at rank 8, Diminutive at rank 12, Fine at rank 16, and Miniscule at rank 20. You gain all the benefits and drawbacks of your new size. For the effects of reduced size refer to the Size table (see page 34). You lose 5 feet of movement speed per size category you shrink, down to a minimum speed of 5 feet at Miniscule size.</p>",
    "specificExtras": [
      {
        "name": "Normal Strength",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Normal Strength (+1): You suffer no reduction in Strength, carrying capacity, or movement speed when you shrink."
      }
    ],
    "profiles": [
      {
        "name": "Shrinking",
        "type": "Alteration",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 1,
        "fullText": "<p>You can reduce your size. Every rank of Shrinking reduces your Strength by 1 (with a minimum of Str 1). Additionally, every four ranks reduce your size category by one. So a Medium-sized creature is Small at rank 4, Tiny at rank 8, Diminutive at rank 12, Fine at rank 16, and Miniscule at rank 20. You gain all the benefits and drawbacks of your new size. For the effects of reduced size refer to the Size table (see page 34). You lose 5 feet of movement speed per size category you shrink, down to a minimum speed of 5 feet at Miniscule size.</p>",
        "effectName": "Shrinking"
      }
    ]
  },
  {
    "name": "Snare",
    "type": "Attack",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Instant",
    "baseCost": 2,
    "fullText": "<p>You can restrain a target with bonds of ice, glue, webbing, bands of energy, and so forth (whatever suits your descriptors). Make a ranged attack roll. If successful, the target makes a Reflex saving throw. On a failed save, the target is entangled, suffering a –2 penalty to attack rolls and Defense, and a –4 penalty to Dexterity. If the Snare is anchored to an immobile object (such as the ground), the entangled character cannot move from that spot. Otherwise, he can move at half speed, but can’t move all out.</p><p>If the Reflex save fails by 5 or more, or on a second successful Snare attack, the target is bound and helpless. The target is unable to move, loses his defense bonus, and suffers a further –5 modifier to Defense. Each additional Snare “layered” onto a helpless target increases the Snare’s Toughness by +1, to a maximum of double its normal Toughness. A bound target gains cover from the Snare (see Cover, page 160). Entangled characters do not gain this benefit.</p><p>Targets can break out of a Snare using Strength or an effect that doesn’t require freedom of movement (this may restrict the use of some powers and devices, for example). The Snare makes Toughness saves like an inanimate object with Toughness equal to its rank. If the trapped character has an attack with a damage bonus 5 or more greater than the Snare’s Toughness, he can break the Snare automatically as a standard action. If the trapped character has an attack with a damage bonus greater than the Snare’s Toughness +10, he can break the snare automatically as a free action. Alternately, a Snare victim can attempt an Escape Artist check to slip free as a full-round action, with a DC of 20 + the Snare’s rank.</p>",
    "specificExtras": [
      {
        "name": "Backlash",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Backlash (+1): Your snare reflects any internal attack that fails to destroy it back on the ensnared character (who saves against it normally). Attacks that destroy the snare are not reflected."
      },
      {
        "name": "Blocks Sense",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Blocks Sense (+1): The snare blocks one of a bound target’s senses of a particular type. It may cover the eyes or ears, for example. This has no effect on targets that are only entangled. Each additional sense blocked increases the modifier by +1, for a +4 modifier, the snare blocks all of a bound target’s senses."
      },
      {
        "name": "Engulf",
        "cost": 0,
        "costType": "per_rank",
        "desc": "Engulf (+0): You “snare” targets by grappling them. This includes creatures that swallow opponents whole or heroes able to engulf targets in an animated cloak. Your snare has no range and requires a melee attack roll. However, your target is rendered bound and helpless on a failed save, rather than entangled. Once you have engulfed the target, the snare has a Sustained duration. You suffer Feedback (see page 115) from any attacks against the snare, since you are the snare! If you are stunned, any engulfed victims are freed."
      },
      {
        "name": "Regenerating",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Regenerating (+1): Any damage that does not break the snare disappears on the start of each of your rounds, making it difficult to wear it down."
      },
      {
        "name": "Transparent",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Transparent (+1): The snare can’t be broken from the outside, only the inside. Attacks on the snared target do not affect the snare in any way, and it offers the target no cover."
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
    "profiles": [
      {
        "name": "Snare",
        "type": "Attack",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "baseCost": 2,
        "fullText": "<p>You can restrain a target with bonds of ice, glue, webbing, bands of energy, and so forth (whatever suits your descriptors). Make a ranged attack roll. If successful, the target makes a Reflex saving throw. On a failed save, the target is entangled, suffering a –2 penalty to attack rolls and Defense, and a –4 penalty to Dexterity. If the Snare is anchored to an immobile object (such as the ground), the entangled character cannot move from that spot. Otherwise, he can move at half speed, but can’t move all out. If the Reflex save fails by 5 or more, or on a second successful Snare attack, the target is bound and helpless. The target is unable to move, loses his defense bonus, and suffers a further –5 modifier to Defense. Each additional Snare “layered” onto a helpless target increases the Snare’s Toughness by +1, to a maximum of double its normal Toughness. A bound target gains cover from the Snare (see Cover, page 160). Entangled characters do not gain this benefit. Targets can break out of a Snare using Strength or an effect that doesn’t require freedom of movement (this may restrict the use of some powers and devices, for example). The Snare makes Toughness saves like an inanimate object with Toughness equal to its rank. If the trapped character has an attack with a damage bonus 5 or more greater than the Snare’s Toughness, he can break the Snare automatically as a standard action. If the trapped character has an attack with a damage bonus greater than the Snare’s Toughness +10, he can break the snare automatically as a free action. Alternately, a Snare victim can attempt an Escape Artist check to slip free as a full-round action, with a DC of 20 + the Snare’s rank.</p>",
        "effectName": "Snare"
      }
    ]
  },
  {
    "name": "Space Travel",
    "type": "Movement",
    "action": "Move",
    "range": "Personal",
    "duration": "Sustained",
    "baseCost": 1,
    "fullText": "<p>You can travel faster than the speed of light through the vacuum of space (but not in a planetary atmosphere). You can fly at light speed at rank 1, crossing one light year per year. Each additional rank moves you one step up the Time and Value Progression Table. So rank 2 allows you to travel twice the speed of light, then five times, and so forth. This effect does not provide protection from the rigors of outer space (for that, see Immunity, page 89).</p>",
    "profiles": [
      {
        "name": "Space Travel",
        "type": "Movement",
        "action": "Move",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 1,
        "fullText": "<p>You can travel faster than the speed of light through the vacuum of space (but not in a planetary atmosphere). You can fly at light speed at rank 1, crossing one light year per year. Each additional rank moves you one step up the Time and Value Progression Table. So rank 2 allows you to travel twice the speed of light, then five times, and so forth. This effect does not provide protection from the rigors of outer space (for that, see Immunity, page 89).</p>",
        "effectName": "Space Travel"
      }
    ]
  },
  {
    "name": "Speed",
    "type": "Movement",
    "action": "Move",
    "range": "Personal",
    "duration": "Sustained",
    "baseCost": 1,
    "fullText": "<p>You can move faster than normal. You have a ground speed of 10 MPH at rank 1. Each additional rank moves your speed one step up the Time and Value Progression Table. At rank 19, you can reach anywhere on Earth in a single move action. At rank 20, you can accelerate to near the speed of light!</p>",
    "profiles": [
      {
        "name": "Speed",
        "type": "Movement",
        "action": "Move",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 1,
        "fullText": "<p>You can move faster than normal. You have a ground speed of 10 MPH at rank 1. Each additional rank moves your speed one step up the Time and Value Progression Table. At rank 19, you can reach anywhere on Earth in a single move action. At rank 20, you can accelerate to near the speed of light!</p>",
        "effectName": "Speed"
      },
      {
        "name": "Super-Speed",
        "action": "Move",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 5,
        "type": "Movement",
        "fullText": "<p>You have Quickness and Speed effects equal to your power rank and a +4 bonus to initiative checks.</p>",
        "effectName": "Speed"
      }
    ]
  },
  {
    "name": "Stun",
    "type": "Attack",
    "action": "Standard (active)",
    "range": "Touch",
    "duration": "Instant (lasting)",
    "baseCost": 2,
    "fullText": "<p>You can stun a target. Make a melee attack roll. If successful, the target must make a Fortitude saving throw (DC 10 + power rank). A failed</p><hr style='border: 1px dashed var(--border-color); margin: 10px 0;'/><strong>ASIDE: <p><strong>UNDER THE HOOD: STRENGTH AND STRIKE</strong></p><p>The primary reason why Mighty Strike pays a premium on extras is to prevent a strong character from taking a rank 1 Strike with a lot of extras,</p><p>adding Strength bonus on top of it, and getting all the benefits with almost none of the cost.</p><p>If you want a kind of halfway point between requiring an additional cost on Mighty Strike extras and not having one at all, you can allow unmodified Strength to add to the Strike at a lesser bonus, based on the Strike’s total cost.</p><p>Essentially, each point of Strength bonus provides an extra “power point” for adding to the Strike. For an unmodified Strike—with a cost of 1 point per rank—this is a 1-to-1 increase; 1 point of Str bonus equals +1 Strike damage. For a Strike costing more, divide Str bonus accordingly. For example a Strike with +2 in modifiers (costing 3 points per rank), divides Str bonus by 3 before stacking it, a +6 Str bonus would add only +2 damage to this Strike.</p><p>This option involves a bit more complexity, but also offers a little more flexibility in terms of applying power modifiers to Mighty Strikes.</p><p>save means the target is dazed. A save that fails by 5 or more means the target is stunned. Targets failing the Fortitude save by 10 or more are unconscious and recover normally. The target gets a new save each round to recover from being dazed or stunned, with a +1 bonus per previous save.</p></strong>",
    "specificFlaws": [
      {
        "name": "Daze (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Daze (–1): Your power cannot inflict more than a dazed result."
      }
    ],
    "profiles": [
      {
        "name": "Stun",
        "type": "Attack",
        "action": "Standard",
        "range": "Touch",
        "duration": "Instant (Lasting)",
        "baseCost": 2,
        "fullText": "<p>You can stun a target. Make a melee attack roll. If successful, the target must make a Fortitude saving throw (DC 10 + power rank). A failed UNDER THE HOOD: STRENGTH AND STRIKE The primary reason why Mighty Strike pays a premium on extras is to prevent a strong character from taking a rank 1 Strike with a lot of extras, adding Strength bonus on top of it, and getting all the benefits with almost none of the cost. If you want a kind of halfway point between requiring an additional cost on Mighty Strike extras and not having one at all, you can allow unmodified Strength to add to the Strike at a lesser bonus, based on the Strike’s total cost. Essentially, each point of Strength bonus provides an extra “power point” for adding to the Strike. For an unmodified Strike—with a cost of 1 point per rank—this is a 1-to-1 increase; 1 point of Str bonus equals +1 Strike damage. For a Strike costing more, divide Str bonus accordingly. For example a Strike with +2 in modifiers (costing 3 points per rank), divides Str bonus by 3 before stacking it, a +6 Str bonus would add only +2 damage to this Strike. This option involves a bit more complexity, but also offers a little more flexibility in terms of applying power modifiers to Mighty Strikes. save means the target is dazed. A save that fails by 5 or more means the target is stunned. Targets failing the Fortitude save by 10 or more are unconscious and recover normally. The target gets a new save each round to recover from being dazed or stunned, with a +1 bonus per previous save.</p>",
        "effectName": "Stun"
      }
    ]
  },
  {
    "name": "Suffocate",
    "type": "Attack",
    "action": "Standard (active)",
    "range": "Touch",
    "duration": "Concentration",
    "baseCost": 2,
    "fullText": "<p>You can cause a target to suffocate (see Suffocation, page 168). Make a melee attack roll. If successful, the target must make a Fortitude saving throw (DC 10 + power rank). If the save fails, the target takes a –1 penalty on attack rolls, Defense, and Reflex saves, can only take a standard or move action each round (not both), and moves at half normal speed. The target must make a Constitution check each round (DC 10, +1 DC per round), starting the round the Fortitude save fails. A failed check means the character becomes unconscious. If the power is maintained after that point, the character’s condition is dying on the following round and dead the round after that. A successful initial Fortitude save negates the Suffocate effect. Targets with Immunity to Suffocation are also unaffected.</p>",
    "profiles": [
      {
        "name": "Suffocate",
        "type": "Attack",
        "action": "Standard",
        "range": "Touch",
        "duration": "Concentration",
        "baseCost": 2,
        "fullText": "<p>You can cause a target to suffocate (see Suffocation, page 168). Make a melee attack roll. If successful, the target must make a Fortitude saving throw (DC 10 + power rank). If the save fails, the target takes a –1 penalty on attack rolls, Defense, and Reflex saves, can only take a standard or move action each round (not both), and moves at half normal speed. The target must make a Constitution check each round (DC 10, +1 DC per round), starting the round the Fortitude save fails. A failed check means the character becomes unconscious. If the power is maintained after that point, the character’s condition is dying on the following round and dead the round after that. A successful initial Fortitude save negates the Suffocate effect. Targets with Immunity to Suffocation are also unaffected.</p>",
        "effectName": "Suffocate"
      }
    ]
  },
  {
    "name": "Summon (minion)",
    "type": "General",
    "action": "Standard (active)",
    "range": "Touch",
    "duration": "Sustained",
    "baseCost": 2,
    "fullText": "<p>You can call upon another creature—a minion (see page 63)—to aid you. This creature is created as an independent character with (rank × 15) power points. Summoned minions are subject to the normal power level limits, and cannot have minions themselves.</p><p>You can summon your minion to you automatically as a standard action; it appears in the nearest open space beside you. You always have the same minion unless you apply power modifiers allowing you to sum-</p><p>mon different minions. Your minion automatically has a helpful attitude and does its best to aid you and obey your commands (see page 175 for descriptions of NPC attitudes).</p><p>Unconscious and dead minions disappear. Defeated minions recover normally except they recover from death as if they were disabled. You cannot summon a defeated minion until it has completely recovered. Your summoned minions also vanish if your power is turned off, countered, or nullified.</p><hr style='border: 1px dashed var(--border-color); margin: 10px 0;'/><strong>ASIDE: <p><strong>UNDER THE HOOD: SUMMON</strong></p><p>Summon is a useful power; it doesn’t cost much to summon up a horde of minions, giving you a lot of effective actions per round! Gamemasters may wish to limit large numbers of minions (summoned or otherwise) to villains and non-player characters. Player character minions are subject to the campaign’s power level limits (see Power Level, page 24). There are also practical matters limiting just how much minions can do at any one time.</p><p>First, directing your minions to do something is a move action. If you want to issue different commands to different groups of minions, then it’s one move action per command. So it’s easier to tell all of your minions “attack!” than it is to issue complex commands to each one in the midst of combat.</p><p>Second, Gamemasters may wish to have groups of minions use aid actions rather than rolling their actions separately. For example, instead of rolling eight attacks for eight different minions, the GM has seven minions aid the eighth, giving that minion a +14 bonus from their aid actions. This makes groups of minions more effective and efficient overall. GMs should keep in mind the limits on the number of opponents that can gang up on a character at once (see page 161).</p><p>Also, Gamemasters should keep in mind that lower power level minions have limits. For example, while a group of eight minions may easily be able to hit an opponent (especially if they use teamwork to give themselves one attack roll with a +14 bonus), they may not be able to hurt their target quite so easily.</p><p>In particular, Gamemasters may wish to limit the use of the Heroic extra. Treating minions as normal characters can greatly slow down combat, since it becomes that much harder to take them out of a fight.</p></strong>",
    "specificExtras": [
      {
        "name": "Fanatical",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Fanatical (+1): Your summoned minions have a fanatical attitude and devotion to you (see page 175)."
      },
      {
        "name": "Heroic",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Heroic (+1): Your minions are not subject to the minion rules (see page 163), but treated like normal non-player characters."
      },
      {
        "name": "Horde",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Horde (+1): You can summon up to your maximum number of minions with one standard action. You must have the Progression power feat to take this extra."
      },
      {
        "name": "Type (+1/+2)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Type (+1/+2): Minions are normally identical in terms of traits. It’s a +1 modifier to summon minions of a general type (elementals, birds, fish, etc.), +2 to summon minions of a broad type (animals, demons, humanoids, etc.)."
      }
    ],
    "specificFlaws": [
      {
        "name": "Attitude (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Attitude (–1): Your summoned minions are less than cooperative. For a –1 modifier, they are indifferent. They are unfriendly for a –2 modifier, and hostile for a –3 modifier."
      }
    ]
  },
  {
    "name": "Super-Movement",
    "type": "Movement",
    "action": "Move (active)",
    "range": "Personal",
    "duration": "Sustained",
    "baseCost": 2,
    "fullText": "<p>You have a special form of movement. For each rank in this effect, choose one of the following:</p><p>•\tAir Walking: You can “walk” on air at half your normal ground movement speed as if it were solid ground, and move up or down at a 45 degree angle at half speed (one-quarter your ground movement speed). For two ranks, you move at your normal ground movement speed (half speed when ascending or descending).</p><p>•\tDimensional Movement: You can move from one dimension to another. Dimensional Movement is Instant duration. For one rank, you can move between your home dimension and one other. For two ranks you can move between any of a related group of dimensions (mystical dimensions, alien dimensions, etc). For three ranks you can travel to any dimension. You can carry up to 100 lbs. with you when you move. Each</p><p>Progression power feat moves this amount one step up the Time and Value Progression Table (250 lbs., 500 lbs., etc.). Since this effect can be extremely useful in some situations, the GM should carefully regulate its use, possibly requiring modifiers like Limited or Unreliable or even disallowing it for player characters altogether.</p><p>Permeate: You can pass through solid objects as if they weren’t there. For one rank, you can move at one-quarter your speed through any physical object as a move action and half your speed as a full action. For two ranks, you can move at half your speed as a move action and your full speed as a full action. For three ranks, you can move at your normal speed through any obstacles. You cannot breathe while inside a solid object, so you need Immunity to Suffocation or you have to hold your breath. You may also need a Super-Sense (such as X-Ray Vision) to see where you’re going. Permeate is often Limited to a particular substance (like earth, ice, or metal, for example) as a –1 modifier. Permeate provides no protection against attacks, although you do gain total cover while inside an object (see Cover, page 160).</p><p>Slithering: You can move along the ground at your normal speed while prone instead of crawling at a rate of 5 feet per move action. You suffer no penalties for making attacks while prone.</p><p>Slow Fall: As long as you are capable of action, you can fall any distance without harm. You can also stop your fall at any point along a distance so long as there is a handhold or projection for you to grab (such as a ledge, flagpole, branch, etc.). If you have the Wall-Crawling Super-Movement power, then any surface provides you with a handhold.</p><p>Swinging: You can swing through the air at your normal ground movement speed, using a swing-line you provide or available lines and projections (tree limbs, flagpoles, vines, telephone- and power-lines, etc.).</p><p>Sure-Footed: You’re better able to deal with obstacles and obstructions to movement. Reduce the speed penalty for hampered movement (see page 34) by one-quarter for each application of this effect. For example, heavy obstructions or a bad surface only reduce your speed by one-quarter rather than one-half, for example. If you reduce the movement penalty to 0 or less, you are unaffected by that condition and move at full normal speed.</p><p>Temporal Movement: You can move through time. Temporal Movement is Instant duration. For one rank, you can move between the present and another fixed point in time (such as 100 years into the past, or 1,000 years into the future). For two ranks you can move to any point in either the past or the future. For three ranks, you can travel to any point in time. You can carry up to 100 lbs. with you when you move. Each Progression power feat moves this amount one step up the Time and Value Progression Table (250 lbs., 500 lbs., etc.). Temporal mechanics and the effects of time travel are left up to the GM. Since this is an extremely powerful ability, the GM should carefully regulate its use, possibly requiring modifiers like Limited or Unreliable or even disallowing it for player characters altogether.</p><p>Trackless: You leave no trail and cannot be tracked using visual senses (although you can still be tracked using scent or other means). You step so lightly you can walk across the surface of soft sand or even snow without leaving tracks and you have total concealment from tremorsense (see Concealment, page 161).</p><p>Wall-Crawling: You can climb walls and ceilings at half your normal speed with no chance of falling and no need for a Climb skill check. You’re still flat-footed while climbing unless you have 5 or more ranks of Climb (see page 42). An additional rank of Super-Movement applied to this effect means you climb at your full speed and are not flat-footed while climbing.</p><p>•\tWater Walking: You can move or stand on the surface of water, quicksand, and other liquids without sinking.</p>",
    "profiles": [
      {
        "name": "Super-Movement",
        "type": "Movement",
        "action": "Move",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 2,
        "fullText": "<p>You have a special form of movement. For each rank in this effect, choose one of the following: •\tAir Walking: You can “walk” on air at half your normal ground movement speed as if it were solid ground, and move up or down at a 45 degree angle at half speed (one-quarter your ground movement speed). For two ranks, you move at your normal ground movement speed (half speed when ascending or descending). •\tDimensional Movement: You can move from one dimension to another. Dimensional Movement is Instant duration. For one rank, you can move between your home dimension and one other. For two ranks you can move between any of a related group of dimensions (mystical dimensions, alien dimensions, etc). For three ranks you can travel to any dimension. You can carry up to 100 lbs. with you when you move. Each Progression power feat moves this amount one step up the Time and Value Progression Table (250 lbs., 500 lbs., etc.). Since this effect can be extremely useful in some situations, the GM should carefully regulate its use, possibly requiring modifiers like Limited or Unreliable or even disallowing it for player characters altogether. Permeate: You can pass through solid objects as if they weren’t there. For one rank, you can move at one-quarter your speed through any physical object as a move action and half your speed as a full action. For two ranks, you can move at half your speed as a move action and your full speed as a full action. For three ranks, you can move at your normal speed through any obstacles. You cannot breathe while inside a solid object, so you need Immunity to Suffocation or you have to hold your breath. You may also need a Super-Sense (such as X-Ray Vision) to see where you’re going. Permeate is often Limited to a particular substance (like earth, ice, or metal, for example) as a –1 modifier. Permeate provides no protection against attacks, although you do gain total cover while inside an object (see Cover, page 160). Slithering: You can move along the ground at your normal speed while prone instead of crawling at a rate of 5 feet per move action. You suffer no penalties for making attacks while prone. Slow Fall: As long as you are capable of action, you can fall any distance without harm. You can also stop your fall at any point along a distance so long as there is a handhold or projection for you to grab (such as a ledge, flagpole, branch, etc.). If you have the Wall-Crawling Super-Movement power, then any surface provides you with a handhold. Swinging: You can swing through the air at your normal ground movement speed, using a swing-line you provide or available lines and projections (tree limbs, flagpoles, vines, telephone- and power-lines, etc.). Sure-Footed: You’re better able to deal with obstacles and obstructions to movement. Reduce the speed penalty for hampered movement (see page 34) by one-quarter for each application of this effect. For example, heavy obstructions or a bad surface only reduce your speed by one-quarter rather than one-half, for example. If you reduce the movement penalty to 0 or less, you are unaffected by that condition and move at full normal speed. Temporal Movement: You can move through time. Temporal Movement is Instant duration. For one rank, you can move between the present and another fixed point in time (such as 100 years into the past, or 1,000 years into the future). For two ranks you can move to any point in either the past or the future. For three ranks, you can travel to any point in time. You can carry up to 100 lbs. with you when you move. Each Progression power feat moves this amount one step up the Time and Value Progression Table (250 lbs., 500 lbs., etc.). Temporal mechanics and the effects of time travel are left up to the GM. Since this is an extremely powerful ability, the GM should carefully regulate its use, possibly requiring modifiers like Limited or Unreliable or even disallowing it for player characters altogether. Trackless: You leave no trail and cannot be tracked using visual senses (although you can still be tracked using scent or other means). You step so lightly you can walk across the surface of soft sand or even snow without leaving tracks and you have total concealment from tremorsense (see Concealment, page 161). Wall-Crawling: You can climb walls and ceilings at half your normal speed with no chance of falling and no need for a Climb skill check. You’re still flat-footed while climbing unless you have 5 or more ranks of Climb (see page 42). An additional rank of Super-Movement applied to this effect means you climb at your full speed and are not flat-footed while climbing. •\tWater Walking: You can move or stand on the surface of water, quicksand, and other liquids without sinking.</p>",
        "effectName": "Super-Movement"
      }
    ]
  },
  {
    "name": "Super-Senses",
    "type": "Sensory",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Continuous",
    "baseCost": 1,
    "fullText": "<p>One or more of your senses are enhanced. Each rank gives you one of the following effects. Some options require more than one rank, noted in their descriptions.</p><p>ENHANCED SENSES</p><p>The following effects enhance or improve existing senses, whether one of the five normal senses or the additional senses listed in the following section.</p><p>•\tAccurate (2 or 4 ranks): You can use a sense to pinpoint something’s exact location. You can use an accurate sense to target something in combat. Visual senses are accurate for humans. 2 ranks for one sense, 4 for an entire sense type.</p><p>•\tAcute (1 or 2 ranks): You can sense fine details about anything you can detect with a particular sense. Visual and auditory senses are acute for humans. 1 rank for one sense, 2 for an entire sense type.</p><p>•\tExtended (1 rank): You have a sense that operates at greater than normal range. Your range increment with the sense is increased by a factor of 10. Each additional time you apply this option, your range increment increases by an additional factor of 10, so one increase makes the range increment 100, two makes it 1000, and so on.</p><p>•\tRadius (1–5 ranks): You can make Notice checks with a Ranged sense against any point around you. Subjects behind you cannot use Stealth to hide from you without some other concealment. Cost:1 rank for use with one sense, 2 ranks for one sense type, 5 ranks for all your senses.</p><p>•\tRanged (1 rank): You can use a sense that normally has no range (taste or touch in humans) to make Notice checks at a normal range increment (–1 per 10 feet).</p><p>ADDITIONAL SENSES</p><p>The effects here grant additional sensory capabilities or senses beyond the normal five senses.</p><p>•\tAwareness (1 rank): You can sense the use of powers or effects with a particular descriptor with a successful Notice check (DC 10, modified by range). Examples include Cosmic Awareness, Divine Awareness, Magical Awareness, Mental Awareness, and so forth. You can apply other Super-Senses to your Awareness to increase its range and scope. Choose the sense type of your Awareness; usually, it is a mental sense.</p><p>•\tBlindsight (4 ranks): Using a non-visual sense type (chosen when you take this effect), you can maneuver as well as a sighted character. Obscure effects are irrelevant to you unless they specifically affect the sense type you use (such as Obscure Radio against a radar sense). You can make Notice checks using Blindsight, but you cannot distinguish fine detail or colors (Blindsight is accurate, but not acute.)</p><p>•\tCommunication Link (1 rank): You have a link with a particular individual, chosen when you acquire this option, who must also have this power. The two of you can communicate over any distance like</p><p>a use of the Communication power (see page 78). Choose a communication medium when you select this option.</p><p>•\tDanger Sense (1 rank): When you would normally be surprised in combat (see Surprise, page 153), make a Notice check (DC 15). Success means you are not surprised and may act during the surprise round (if any). Failure means you are surprised (although, if you have the Uncanny Dodge feat, you retain your dodge bonus to Defense). The GM may raise the DC of the Danger Sense check in some circumstances. Your Danger Sense must belong to a particular sense type (see Sense Types, page 68). Sensory effects targeting that sense also affect your Danger Sense ability and may “blind” it.</p><p>•\tDarkvision (2 ranks): You can see normally in the dark, even darkness created by an Obscure effect (although other Obscure descriptors, such as fog or blinding light, affect you normally).</p><p>•\tDetect (1 rank): You can detect a particular item or effect with a move action and a Notice check. Detect has no range and only indicates the presence or absence of something. Choose what sense type your Detect falls under. +1 rank allows you to use Detect as a free action (making it a Sense). A seperate +1 rank can permit you to detect at range.</p><p>•\tDirection Sense (1 rank): You always know what direction north lies in and can retrace your steps through any place you’ve been.</p><p>•\tDistance Sense (1 rank): You can accurately and automatically judge distances.</p><p>•\tInfravision (1 rank): You can see in the infrared portion of the spectrum, allowing you to see heat patterns. Darkness does not provide concealment for objects differing in temperature from their surroundings. If you have the Track option, you can track warm creatures by the faint heat trails they leave behind.</p><p>•\tLow-Light Vision (1 rank): You can see twice as far in low-light conditions as normal.</p><p>•\tMicroscopic Vision (1–4 ranks): You can view extremely small things. You can make Search checks to see tiny things in your own area. This costs 1 rank for dust-sized objects, 2 ranks for cellular-sized, 3 ranks for DNA and complex molecules, 4 ranks for atomic-sized. The GM may require a Knowledge skill check, particularly Knowledge (physical sciences) to interpret what you see.</p><p>•\tPostcognition (4 ranks): You can perceive events that took place in the past. You can make Notice and Search checks to pick up on past information in an area or from a subject. The Gamemaster sets the DC for these checks based on how obscure and distant in the past the information is, from 15 (for a vague vision that may or may not be accurate) to 30 (for near complete knowledge of a particular past event as if you were actually present). Your normal (present-day) senses don’t work while you’re using Postcognition; your awareness is focused on the past. Your postcogntive visions last for as long as you concentrate. Postcognition does not apply to mental powers like Mind Reading or any other ability requiring interaction with the past.</p><p>•\tPrecognition (4 ranks): You can perceive events that may happen in the future. Your precognitive visions represent possible futures. If circumstances change, then the vision may not come to pass. When you use this ability, the Gamemaster chooses what information to impart. Your visions may be obscure and cryptic, open to interpretation. The Gamemaster may require appropriate Notice skill checks for you to pick up on particularly detailed information, with a DC ranging from 15 to 30 or more. The GM can also activate your Precognition</p><hr style='border: 1px dashed var(--border-color); margin: 10px 0;'/><strong>ASIDE: <p><strong>UNDER THE HOOD: PRECOGNITION AND POSTCOGNITION</strong></p><p>Precognition and Postcognition can be problematic, since they provide players with considerable information. Keep in mind precognitive and postcognitive information is often cryptic or unclear, and changes in circumstances may lead to changes in visions of the future. If players use either too often, feel free to have their visions become less and less clear as the timelines become tangled by so much constant surveillance and intervention. Generally, Precognition is best treated as a plot device for the GM to provide information to the player as suits the adventure, similar to a free use of the inspiration ability of hero points (see page 122). In fact, GMs looking to limit Precognition and Postcognition may wish to require extra effort or hero points to use them, or require the Uncontrolled flaw (see page 115).</p><p>to impart specific information to you as an adventure hook or plot device. Your normal (present-day) senses don’t work while you’re using Precognition; your awareness is focused on the future. Your precognitive visions last as long as you concentrate. Precognition does not apply to mental powers like Mind Reading or any other ability requiring interaction with the future.</p><p>•\tRadio (1 rank): You can “hear” radio frequencies including AM, FM, television, cellular, police bands, and so forth. This allows you to pick up on Radio Communication (see page 78).</p><p>•\tScent (1 rank): You can detect and identify individuals by scent alone, although you cannot determine things like exact location, only their presence or absence (your sense of smell is acute, but not accurate).</p><p>•\tTime Sense (1 rank): You always know what time it is and can time events as if you had an accurate stopwatch.</p><p>•\tTracking (1 rank): You can follow trails and track using a particular sense. The basic DC to follow a trail is 10, modified by circumstances, as the GM sees fit. You only move at half normal speed while tracking. For 2 ranks, you can move at full normal speed while tracking, for 3 ranks you can move all-out while tracking.</p><p>•\tTremorsense (3 ranks): You can accurately feel the location of moving objects in contact with the same surface as you (such as the ground). If used underwater, you can feel objects moving through the water all around you, like a Radius sense.</p><p>•\tUltra-Hearing (1 rank): You can hear very high and low frequency sounds, like dog whistles or ultrasonic signals.</p><p>•\tUltravision (1 rank): You can see ultraviolet light, allowing you to see normally at night by the light of the stars or other UV light sources.</p><p>•\tX-Ray Vision (4 ranks): You can see through solid objects as if they weren’t there (such objects provide no concealment to you). You have to define one reasonably common substance you can’t see through (such as lead, gold, iron, wood, etc.). A subject with no cover or concealment relative to you cannot use Stealth to hide from you.</p></strong>",
    "profiles": [
      {
        "name": "Super-Senses",
        "type": "Sensory",
        "action": "Free",
        "range": "Personal",
        "duration": "Permanent",
        "baseCost": 1,
        "fullText": "<p>One or more of your senses are enhanced. Each rank gives you one of the following effects. Some options require more than one rank, noted in their descriptions.</p>",
        "effectName": "Super-Senses"
      }
    ],
    "options": [
      { "name": "Normal Vision", "cost": 0, "costType": "flat" },
      { "name": "Normal Hearing", "cost": 0, "costType": "flat" },
      { "name": "Normal Scent", "cost": 0, "costType": "flat" },
      { "name": "Normal Taste", "cost": 0, "costType": "flat" },
      { "name": "Normal Touch", "cost": 0, "costType": "flat" },
      { "name": "Mental Awareness", "cost": 0, "costType": "flat" },
      { "name": "Sense Type - Visual", "cost": 0, "costType": "flat" },
      { "name": "Sense Type - Auditory", "cost": 0, "costType": "flat" },
      { "name": "Sense Type - Olfactory", "cost": 0, "costType": "flat" },
      { "name": "Sense Type - Tactile", "cost": 0, "costType": "flat" },
      { "name": "Sense Type - Mental", "cost": 0, "costType": "flat" },
      { "name": "Sense Type - Radio", "cost": 0, "costType": "flat" },
      { "name": "Sense Type - Special", "cost": 0, "costType": "flat" },
      { "name": "Awareness", "cost": 1, "costType": "flat" },
      { "name": "Blindsight", "cost": 4, "costType": "flat" },
      { "name": "Communication Link", "cost": 1, "costType": "flat" },
      { "name": "Danger Sense", "cost": 1, "costType": "flat" },
      { "name": "Darkvision", "cost": 2, "costType": "flat" },
      { "name": "Detect", "cost": 1, "costType": "flat" },
      { "name": "Direction Sense", "cost": 1, "costType": "flat" },
      { "name": "Distance Sense", "cost": 1, "costType": "flat" },
      { "name": "Infravision", "cost": 1, "costType": "flat" },
      { "name": "Low-Light Vision", "cost": 1, "costType": "flat" },
      { "name": "Microscopic Vision", "cost": 1, "costType": "per_rank" },
      { "name": "Postcognition", "cost": 4, "costType": "flat" },
      { "name": "Precognition", "cost": 4, "costType": "flat" },
      { "name": "Radio", "cost": 1, "costType": "flat" },
      { "name": "Scent", "cost": 1, "costType": "flat" },
      { "name": "Time Sense", "cost": 1, "costType": "flat" },
      { "name": "Tracking", "cost": 1, "costType": "flat" },
      { "name": "Tremorsense", "cost": 3, "costType": "flat" },
      { "name": "Ultra-Hearing", "cost": 1, "costType": "flat" },
      { "name": "Ultravision", "cost": 1, "costType": "flat" },
      { "name": "X-Ray Vision", "cost": 4, "costType": "flat" }
    ]
  },
  {
    "name": "Super-Strength",
    "type": "Trait",
    "action": "None (passive)",
    "range": "Personal",
    "duration": "Continuous",
    "baseCost": 2,
    "fullText": "<p>You’re capable of lifting and carrying more than normal for your Strength score, maybe much more. Each rank of Super-Strength grants you a +5 bonus to your Strength score when figuring carrying capacity (see Carrying Capacity, page 35). Your Super-Strength also gives you a +1 bonus per rank on Strength checks involving sustained application of strength or pressure, including grapple checks and breaking objects (see page 166), but not Strength-based skills or melee or grappling damage.</p>",
    "profiles": [
      {
        "name": "Super-Strength",
        "type": "General",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Continuous",
        "baseCost": 2,
        "fullText": "<p>You’re capable of lifting and carrying more than normal for your Strength score, maybe much more. Each rank of Super-Strength grants you a +5 bonus to your Strength score when figuring carrying capacity (see Carrying Capacity, page 35). Your Super-Strength also gives you a +1 bonus per rank on Strength checks involving sustained application of strength or pressure, including grapple checks and breaking objects (see page 166), but not Strength-based skills or melee or grappling damage.</p>",
        "effectName": "Super-Strength"
      }
    ]
  },
  {
    "name": "Swimming",
    "type": "Movement",
    "action": "Move (active)",
    "range": "Personal",
    "duration": "Sustained",
    "baseCost": 1,
    "fullText": "<p>You can swim faster than normal. You have a water speed of 2.5 MPH (25 ft.) at rank 1. Each additional rank moves your speed one step up the Time and Value Progression Table. You can always take 10 on Swim skill checks. This power does not allow you to survive underwater (for that, see Immunity, page 89).</p>",
    "profiles": [
      {
        "name": "Swimming",
        "type": "Movement",
        "action": "Move",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 1,
        "fullText": "<p>You can swim faster than normal. You have a water speed of 2.5 MPH (25 ft.) at rank 1. Each additional rank moves your speed one step up the Time and Value Progression Table. You can always take 10 on Swim skill checks. This power does not allow you to survive underwater (for that, see Immunity, page 89).</p>",
        "effectName": "Swimming"
      }
    ]
  },
  {
    "name": "Teleport",
    "type": "Movement",
    "action": "Move (active)",
    "range": "Personal",
    "duration": "Instant",
    "baseCost": 2,
    "fullText": "<p>You can move instantly from place to place without crossing the distance in between. You can teleport yourself and up to 100 lbs. of additional mass a distance of (power rank × 100) feet as a move action. Unwilling passengers get a Reflex save (DC 10 + power rank) to avoid being taken along.</p><p>At rank 3 and above, you can also take a full action and teleport the distance shown on the Extended Range Table (see page 69) instead, but you lose your dodge bonus for one round after you arrive at your destination due to disorientation. You can only teleport to places you can accurately sense or know especially well (in the GM’s judgment). You retain your facing and relative velocity when you teleport. So if you are falling, for example, when you teleport, you are still falling at the same speed when you arrive at your destination.</p>",
    "specificExtras": [
      {
        "name": "Accurate",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Accurate (+1): You don’t need to be able to accurately sense your destination to teleport there, just be able to generally describe it, such as “inside the capitol building lobby” or “atop the Goodman Building’s roof.”"
      },
      {
        "name": "Portal",
        "cost": 2,
        "costType": "per_rank",
        "desc": "Portal (+2): You open a portal or gateway between two points as a free action. The portal is 5-ft.-by-5.ft. in size. Anyone stepping through (a move action) is transported. The portal remains open as long as you concentrate. You can apply Progression feats to increase the size of your portal."
      }
    ],
    "specificFlaws": [
      {
        "name": "Long-Range (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Long-Range (–1): You can only teleport your extended range distance as a full-round action. You can’t make ranged teleports as a move action."
      },
      {
        "name": "Medium (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Medium (–1): You require a medium for your teleportation, such as electrical or telephone wires, root structures, waterways, shadows, flames, mirrors, and so forth. You can only teleport from and to locations where your medium exists."
      },
      {
        "name": "Short-Range (–1)",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Short-Range (–1): You can’t make extended range teleports."
      }
    ],
    "profiles": [
      {
        "name": "Teleport",
        "type": "Movement",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "baseCost": 2,
        "fullText": "<p>You can move instantly from place to place without crossing the distance in between. You can teleport yourself and up to 100 lbs. of additional mass a distance of (power rank × 100) feet as a move action. Unwilling passengers get a Reflex save (DC 10 + power rank) to avoid being taken along. At rank 3 and above, you can also take a full action and teleport the distance shown on the Extended Range Table (see page 69) instead, but you lose your dodge bonus for one round after you arrive at your destination due to disorientation. You can only teleport to places you can accurately sense or know especially well (in the GM’s judgment). You retain your facing and relative velocity when you teleport. So if you are falling, for example, when you teleport, you are still falling at the same speed when you arrive at your destination.</p>",
        "effectName": "Teleport"
      }
    ],
    "uniqueModifiers": [
      {
        "name": "Accurate (Teleport)",
        "cost": 1,
        "costType": "per_rank",
        "category": "extra",
        "hasRanks": false,
        "fullText": "<p>You do not need to accurately sense your destination.</p>"
      },
      {
        "name": "Castling",
        "cost": 0,
        "costType": "flat",
        "category": "extra",
        "hasRanks": false,
        "fullText": "<p>You and a willing subject trade places.</p>"
      },
      {
        "name": "Portal",
        "cost": 2,
        "costType": "per_rank",
        "category": "extra",
        "hasRanks": false,
        "fullText": "<p>Creates a portal others can pass through.</p>"
      },
      {
        "name": "Turnabout",
        "cost": 1,
        "costType": "flat",
        "category": "feat",
        "hasRanks": false,
        "fullText": "<p>Teleport, take an action, and teleport back.</p>"
      },
      {
        "name": "Change Direction",
        "cost": 1,
        "costType": "flat",
        "category": "feat",
        "hasRanks": false,
        "fullText": "<p>Change orientation upon arrival.</p>"
      },
      {
        "name": "Change Velocity",
        "cost": 1,
        "costType": "flat",
        "category": "feat",
        "hasRanks": false,
        "fullText": "<p>Arrive at rest.</p>"
      },
      {
        "name": "Easy",
        "cost": 1,
        "costType": "per_rank",
        "category": "extra",
        "hasRanks": false,
        "fullText": "<p>You are not dazed after an extended teleport.</p>"
      },
      {
        "name": "Extended",
        "cost": 1,
        "costType": "per_rank",
        "category": "extra",
        "hasRanks": false,
        "fullText": "<p>You can make extended teleports.</p>"
      },
      {
        "name": "Long-Range",
        "cost": 1,
        "costType": "per_rank",
        "category": "extra",
        "hasRanks": false,
        "fullText": "<p>Base range is multiplied by 10.</p>"
      },
      {
        "name": "Short-Range",
        "cost": -1,
        "costType": "per_rank",
        "category": "flaw",
        "hasRanks": false,
        "fullText": "<p>You can only teleport short distances.</p>"
      },
      {
        "name": "Medium",
        "cost": -1,
        "costType": "per_rank",
        "category": "flaw",
        "hasRanks": false,
        "fullText": "<p>You require a medium to teleport.</p>"
      }
    ]
  },
  {
    "name": "Transform",
    "type": "Alteration",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Sustained (lasting)",
    "baseCost": 3,
    "fullText": "<p>You can change a target into something else. Make an attack roll to hit your target, who makes a Fortitude save (DC 10 + power rank). If the save fails, the target transforms. Inanimate targets transform automatically, so long as you can affect their mass. Characters can make a Reflex saving throw for any worn or held object. You can transform 1 pound of inanimate mass at rank 1. Each additional rank moves this one step up the Time and Value Progression Table. The transformation lasts as long as you continue sustaining it. When you stop, the target reverts to normal. What you can transform affects cost per rank:</p><p>•\t3 points: Transform one thing into one other thing (flesh into stone, people into frogs, metal into wood, broken objects into repaired ones, etc.).</p><p>•\t4 points: Transform a narrow group of targets into one of a narrow group of results (animals into humanoids, or vice versa, one type of metal into any other, etc.). Transform targets of a broad group into one result or vice versa.</p><p>•\t5 points: Transform targets of a broad group into one of a broad group of results (inanimate objects or living creatures).</p><p>•\t6 points: Transform anything into anything else.</p><p>You can change around a transformed target’s physical traits, so long as their point total remains the same or less. Adding new traits (such as giving a target wings) can be paid for by adding drawbacks or reducing other traits to compensate.</p><p>MENTAL TRANSFORM</p><p>Transformed targets retain their mental traits and their normal personality, although animate targets made inanimate are unconscious. Transform with the Alternate Save (Will) modifier can change targets mentally as well as physically. A mental transformation is considered a seperate power; apply modifiers and power stunts to it seperately. To transform a target both mentally and physically at once, add the cost of the two Transforms together. The type of mental transformation determines cost per rank:</p><p>•\t1 point: Change the target’s memories or recollections, making the</p><p>target forget something, or remember things differently.</p><p>•\t2 point: Change the target’s personality, causing the target to behave differently.</p><p>•\t3 points: Completely alter the target’s mind, effectively creating an entirely new one. You can change around their mental traits as desired, so long as their point value remains the same or less.</p>",
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
        "desc": "Touch (–1): You must touch your target (with a successful melee attack roll) in order to transform it. Example—Petrifying Gaze: Your baleful gaze can turn living creatures to stone! Take a standard action; the opponent must meet your gaze (see Sense-Dependent, page 115). Targets get a Reflex saving throw to glance away at the last moment. If it fails, they make a Fortitude save. On a failure, they turn to immobile stone. They remain so until you choose to restore them, your power is nullified, or they are restored by another Transform effect. This is a singular Transform (flesh to stone, 3 points per rank) with the Range (Perception) and Duration (Continuous) extras and the Sense-Dependent flaw. It costs 4 points per rank. Example—Memory Alteration: You can mentally alter a person’s memories. Choose a target you can accurately perceive. The target makes a Will save. If it fails, the target’s memories are altered as you wish. This is a Mental Transform (memories, 1 point per rank) with the Range (Perception) extra. It costs 2 points per rank."
      }
    ],
    "profiles": [
      {
        "name": "Transform",
        "type": "Alteration",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained (Lasting)",
        "baseCost": 3,
        "fullText": "<p>You can change a target into something else. Make an attack roll to hit your target, who makes a Fortitude save (DC 10 + power rank). If the save fails, the target transforms. Inanimate targets transform automatically, so long as you can affect their mass. Characters can make a Reflex saving throw for any worn or held object. You can transform 1 pound of inanimate mass at rank 1. Each additional rank moves this one step up the Time and Value Progression Table. The transformation lasts as long as you continue sustaining it. When you stop, the target reverts to normal. What you can transform affects cost per rank: •\t3 points: Transform one thing into one other thing (flesh into stone, people into frogs, metal into wood, broken objects into repaired ones, etc.). •\t4 points: Transform a narrow group of targets into one of a narrow group of results (animals into humanoids, or vice versa, one type of metal into any other, etc.). Transform targets of a broad group into one result or vice versa. •\t5 points: Transform targets of a broad group into one of a broad group of results (inanimate objects or living creatures). •\t6 points: Transform anything into anything else. You can change around a transformed target’s physical traits, so long as their point total remains the same or less. Adding new traits (such as giving a target wings) can be paid for by adding drawbacks or reducing other traits to compensate.</p>",
        "effectName": "Transform"
      }
    ]
  },
  {
    "name": "Trip",
    "type": "Attack",
    "action": "Standard (active)",
    "range": "Ranged",
    "duration": "Instant",
    "baseCost": 1,
    "fullText": "<p>You can make a trip attack (see Trip, page 159) at normal range, with no modifier for size category. The target makes a Strength or Dexterity</p><hr style='border: 1px dashed var(--border-color); margin: 10px 0;'/><strong>ASIDE: <p><strong>UNDER THE HOOD: TRANSFORM</strong></p><p>Transform is a powerful effect, particularly in the hands of a cunning player. To a degree, Transform can duplicate certain other powers, such as trapping a target by transforming air into a solid material (Snare) or turning oxygen into an unbreathable gas (Suffocate). This is perfectly allowable; use the rules for those other effects as guidelines.</p><p>Keep in mind, however, that Transform has a Sustained duration (not Instant like Snare, or Concentration like Suffocate). This may affect how such “tricks” work (e.g., the snare disappears if the character is stunned, the suffocating gas quickly dissipates unless the character concentrates each round to continue transforming it, etc.). As always, the GM should use common sense and good judgment, following Rule Number One (see page 7).</p><p>Gamemasters may wish to limit the higher levels of Transform and Mental Transform, especially the “anything into anything” level, to NPCs only. The 5-point level of any inanimate object into any other works well for “transmuter” characters, however.</p><p>check, whichever is better, against the results of your power check. If you win, the target falls prone. The target does not get the opportunity to trip you.</p></strong>",
    "specificExtras": [
      {
        "name": "Knockback",
        "cost": 1,
        "costType": "per_rank",
        "desc": "Knockback (+1): If you successfully trip the target, you also knock the target back with an effective “damage bonus” equal to your Trip power rank. See Knockback, page 165, for details."
      }
    ],
    "profiles": [
      {
        "name": "Trip",
        "type": "Attack",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "baseCost": 1,
        "fullText": "<p>You can make a trip attack (see Trip, page 159) at normal range, with no modifier for size category. The target makes a Strength or Dexterity UNDER THE HOOD: TRANSFORM Transform is a powerful effect, particularly in the hands of a cunning player. To a degree, Transform can duplicate certain other powers, such as trapping a target by transforming air into a solid material (Snare) or turning oxygen into an unbreathable gas (Suffocate). This is perfectly allowable; use the rules for those other effects as guidelines. Keep in mind, however, that Transform has a Sustained duration (not Instant like Snare, or Concentration like Suffocate). This may affect how such “tricks” work (e.g., the snare disappears if the character is stunned, the suffocating gas quickly dissipates unless the character concentrates each round to continue transforming it, etc.). As always, the GM should use common sense and good judgment, following Rule Number One (see page 7). Gamemasters may wish to limit the higher levels of Transform and Mental Transform, especially the “anything into anything” level, to NPCs only. The 5-point level of any inanimate object into any other works well for “transmuter” characters, however. check, whichever is better, against the results of your power check. If you win, the target falls prone. The target does not get the opportunity to trip you.</p>",
        "effectName": "Trip"
      }
    ]
  },
  {
    "name": "Variable",
    "type": "—",
    "action": "—",
    "range": "—",
    "duration": "—",
    "baseCost": 0,
    "fullText": "<p>The Variable power structure is located in the Power Structures section.</p>"
  },
  {
    "name": "Pre-built Powers",
    "type": "General",
    "action": "—",
    "range": "—",
    "duration": "—",
    "baseCost": 0,
    "fullText": "<p>Select a pre-built power profile from the Profiles dropdown.</p>",
    "shortDesc": "Container for pre-built powers from Core and Ultimate Power.",
    "profiles": [
      {
        "name": "Alternate Form - M&M 2E UP",
        "type": "Alteration",
        "action": "Free",
        "range": "Personal",
        "duration": "Varies",
        "baseCost": 5,
        "fullText": "<p>You can exist in a form other than mere flesh and blood, giving you additional traits. It requires a free action to change into or out of your Alternate Form and you can do so once per round. You have 5 power points per Alternate Form rank to apply to powers related to your form. Once you choose your Alternate Form’s traits, they are fixed and do not change. No Alternate Form power can have a rank greater than your Alternate Form rank. Your non-Instant Alternate Form powers must all have the same duration, which determines your Alternate Form’s duration. •\tEnergy: You are made up of energy, such as fire or electricity. Apply your points to Blast, Flight, Immunity, Insubstantial 3, Strike (Aura), and Teleport (Medium –1). •\tGaseous: You are a cloud of gas, like fog or mist. Apply your points to Concealment, Flight, Immunity, Insubstantial 2, and Suffocate. •\tGhost: You are incorporeal and invisible, largely unaffected by the physical world. Apply your points to Concealment, Flight, Immunity, and Insubstantial 4. •\tLiquid: You are made up of liquid (such as water) apply your points to Blast, Concealment (Limited to underwater –1), Elongation, Immunity, Insubstantial 1, Suffocate, and Swimming. •\tParticulate: Your body is composed of a granular or particulate substance like sand, dust, salt, and so forth. Apply your points to Blast, Elongation, Immunity, Insubstantial 1, Strike, and Super-Movement (slithering). •\tShadow: You transform into a living shadow. Apply your points to Concealment (visual, Limited to areas of shadow –1), Fatigue (chilling touch), Immunity, Insubstantial 4, and Super-Movement (slithering, wall-crawling). •\tSolid: You are made up of a hard substance like stone or metal. Apply your points to Density, Immunity, and Protection. •\tSwarm: Your “body” is actually thousands of other tiny creatures: insects, worms, even little robots. Apply your points to Blast, Flight, Immunity, Insubstantial 2, Strike, and Super-Movement (slithering, wall-crawling). •\tTwo-Dimensional: You can flatten yourself to become almost infinitely thin. Apply your points to Concealment (visual, Limited to one side –1), Insubstantial 1 (for slipping through narrow spaces), Strike (Penetrating), and Super-Movement (slithering). Example: Kate is playing Nereid, who has the power to transform into water. She has Alternate Form 6. Kate assigns the 30 power points from Nereid’s Alternate Form as follows: Insubstantial 1 (5 points), Concealment 4 (visual, Limited to underwater –1, 4 points), Immunity 9 (life support, Sustained +0, 9 points), Swimming 3 (3 points), and Suffocate 4 (8 points). She puts the remaining point into the Environmental Adaptation (underwater) feat with the GM’s permission. Since all her non-Instant powers are Sustained, her Alternate Form has a Sustained duration as well.</p>",
        "effectName": "Container"
      },
      {
        "name": "Element Control - M&M 2E UP",
        "type": "General",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "baseCost": 2,
        "fullText": "<p>You have the ability to shape and direct a particular element—air, earth, fire, or water—like a use of Telekinesis (see page 105) at your Element Control rank. Choose one element from the list given here; you can acquire the other elements as Alternate Powers.</p>",
        "effectName": "Move Object"
      },
      {
        "name": "Absorption",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Continuous",
        "type": "Defense",
        "fullText": "<p>You can absorb a particular type of damage, and use its energy to improve a trait or heal yourself.</p>",
        "effectName": "Boost",
        "options": {
          "Trait to Boost": "- Select -"
        },
        "modifiers": [
          { "name": "Action (Reaction)", "ranks": 1, "cost": 3, "costType": "per_rank", "hasRanks": false, "category": "extra", "isMeta": false },
          { "name": "Personal", "ranks": 1, "cost": 0, "costType": "flat", "hasRanks": false, "category": "flaw", "isMeta": false }
        ]
      },
      {
        "name": "Acid",
        "action": "Standard",
        "range": "Touch",
        "duration": "Instant",
        "baseCost": 3,
        "type": "Attack",
        "fullText": "<p>You can generate or exude acid from your hands, affecting anything you can touch.</p>",
        "effectName": "Damage"
      },
      {
        "name": "Adaptation",
        "action": "Full",
        "range": "Personal",
        "duration": "Continuous",
        "baseCost": 6,
        "type": "Alteration",
        "fullText": "<p>You can adapt to changing conditions. When you encounter a hostile environment, you acquire the powers you need to function in that environment.</p>",
        "effectName": "Variable"
      },
      {
        "name": "Adrenal Surge",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 1,
        "type": "Alteration",
        "fullText": "<p>You can will a powerful surge of adrenalin to temporarily enhance your physical abilities.</p>",
        "effectName": "Boost"
      },
      {
        "name": "Age Shift",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 8,
        "type": "Alteration",
        "fullText": "<p>You can change your apparent physical age at will, growing 'younger' or 'older' in an instant.</p>",
        "effectName": "Morph"
      },
      {
        "name": "Air Control",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You have the ability to shape and direct masses of air. You can create powerful winds, moving objects.</p>",
        "effectName": "Move Object"
      },
      {
        "name": "Alternate Form",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 5,
        "type": "Alteration",
        "fullText": "<p>You can exist in a form other than mere flesh and blood, giving you additional traits.</p>",
        "effectName": "Container"
      },
      {
        "name": "Animal Control",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can exert mental control over animals.</p>",
        "effectName": "Mind Control"
      },
      {
        "name": "Animal Mimicry",
        "action": "Free",
        "range": "Personal",
        "duration": "Continuous",
        "baseCost": 9,
        "type": "Alteration",
        "fullText": "<p>You can gain the traits of any animal.</p>",
        "effectName": "Variable",
        "options": {
          "Variable Type": "Multiple traits of a specific animal"
        }
      },
      {
        "name": "Animate Objects",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 3,
        "type": "Control",
        "fullText": "<p>You can imbue objects with animation and a semblance of life, making them constructs under your control.</p>",
        "effectName": "Summon"
      },
      {
        "name": "Astral Form",
        "action": "Standard",
        "range": "Extended",
        "duration": "Continuous",
        "baseCost": 5,
        "type": "Alteration",
        "fullText": "<p>You can separate your astral form—your mind, spirit, or life force—from your physical body.</p>",
        "effectName": "ESP"
      },
      {
        "name": "Blast",
        "type": "Attack",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "fullText": "<p>You can make a damaging ranged attack. It might be a blast of energy, a projectile (arrow, bullet, throwing blade, etc.), or some similar effect. You make a ranged attack roll to hit the target. The attack’s damage equals your power rank.</p>",
        "effectName": "Damage",
        "modifiers": [
          { "name": "Ranged", "ranks": 1, "cost": 1, "costType": "per_rank", "hasRanks": false, "category": "extra", "isMeta": false }
        ]
      },
      {
        "name": "Blending",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Alteration",
        "fullText": "<p>You can 'blend' into the background, like a super-chameleon matching its surroundings.</p>",
        "effectName": "Concealment"
      },
      {
        "name": "Blur",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 4,
        "type": "Alteration",
        "fullText": "<p>You can blur or obscure your outline and form at will, making you difficult to see.</p>",
        "effectName": "Concealment"
      },
      {
        "name": "Bouncing",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Permanent",
        "baseCost": 2,
        "type": "Movement",
        "fullText": "<p>Rather than hitting a solid surface with a resounding 'thud,' you bounce!</p>",
        "effectName": "Leaping"
      },
      {
        "name": "Chi",
        "action": "Standard",
        "range": "Personal",
        "duration": "Instant",
        "baseCost": 1,
        "type": "General",
        "fullText": "<p>You can control and channel your chi or life force.</p>",
        "effectName": "Boost"
      },
      {
        "name": "Clairaudience",
        "action": "Move",
        "range": "Extended",
        "duration": "Concentration",
        "baseCost": 1,
        "type": "Sensory",
        "fullText": "<p>You can hear things at a distant point as if you were actually present.</p>",
        "effectName": "ESP"
      },
      {
        "name": "Clairvoyance",
        "action": "Move",
        "range": "Extended",
        "duration": "Concentration",
        "baseCost": 2,
        "type": "Sensory",
        "fullText": "<p>You can see things at a distant point as if you were actually present.</p>",
        "effectName": "ESP"
      },
      {
        "name": "Cold Control",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can create an area of extreme cold.</p>",
        "effectName": "Environmental Control"
      },
      {
        "name": "Color Control",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can change the colors of things.</p>",
        "effectName": "Environmental Control"
      },
      {
        "name": "Corrosion",
        "type": "Attack",
        "action": "Standard",
        "range": "Touch",
        "duration": "Instant",
        "baseCost": 2,
        "fullText": "<p>Your touch causes matter to weaken and corrode. Living targets make a Fortitude save. If the save fails, subtract your rank from the target’s Toughness save bonus before inflicting damage equal to your power rank. Nonliving objects lose Toughness automatically and suffer damage according to their lowered Toughness score. Damage is inflicted whether the target loses Toughness or not. A living target’s Toughness save cannot drop below –5, an object’s can drop to as low as –10. Living targets recover lost Toughness at a rate of 1 point per round. Objects must be repaired.</p>",
        "effectName": "Damage, Drain"
      },
      {
        "name": "Cosmic Energy Control",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You wield primal cosmic power. You can project Blasts of cosmic force.</p>",
        "effectName": "Damage"
      },
      {
        "name": "Darkness Control",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can blanket an area in darkness, creating total Visual Concealment.</p>",
        "effectName": "Obscure"
      },
      {
        "name": "Datalink",
        "action": "Free",
        "range": "Extended",
        "duration": "Sustained",
        "baseCost": 1,
        "type": "Sensory",
        "fullText": "<p>You can interface with computers over a distance.</p>",
        "effectName": "Communication"
      },
      {
        "name": "Death Touch",
        "action": "Standard",
        "range": "Touch",
        "duration": "Instant",
        "baseCost": 1,
        "type": "Attack",
        "fullText": "<p>You can inflict death with a mere touch! Drains Constitution.</p>",
        "effectName": "Drain"
      },
      {
        "name": "Device",
        "action": "None",
        "range": "Personal",
        "duration": "Continuous",
        "baseCost": 4,
        "type": "General",
        "fullText": "<p>An item granting you the use of certain traits.</p>",
        "effectName": "Device"
      },
      {
        "name": "Dimensional Control",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Alteration",
        "fullText": "<p>You can change the physical dimensions of your body.</p>",
        "effectName": "Teleport"
      },
      {
        "name": "Dimensional Pocket",
        "action": "Standard",
        "range": "Touch",
        "duration": "Instant",
        "baseCost": 2,
        "type": "Movement",
        "fullText": "<p>You have a 'pocket' dimension capable of holding an amount of material, or even creatures.</p>",
        "effectName": "Super-Movement"
      },
      {
        "name": "Disease",
        "action": "Standard",
        "range": "Touch",
        "duration": "Sustained",
        "baseCost": 3,
        "type": "Attack",
        "fullText": "<p>You can infect others with disease pathogens by touch.</p>",
        "effectName": "Drain"
      },
      {
        "name": "Disintegration",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "baseCost": 5,
        "type": "Attack",
        "fullText": "<p>You can project an attack weakening and destroying the structure of objects.</p>",
        "effectName": "Damage, Drain"
      },
      {
        "name": "Displacement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 4,
        "type": "Alteration",
        "fullText": "<p>You can create a visual distortion that causes you to appear in an area adjacent to where you actually are.</p>",
        "effectName": "Concealment"
      },
      {
        "name": "Drain",
        "type": "Trait",
        "action": "Standard",
        "range": "Touch",
        "duration": "Instant",
        "baseCost": 1,
        "fullText": "<p>You can temporarily lower one of a target’s traits: an ability, skill, feat, or power, chosen when you acquire this power. You must touch the target, making a normal melee attack roll, and the target makes a Fortitude save. If the save fails, each rank of Drain removes 1 power point from the affected trait. The lost points return at a rate of 1 per round, except for inanimate objects, which do not recover drained Toughness and must be repaired. This rate can be reduced with the Slow Fade power feat (see page 110). Drain’s cost per rank determines the affected traits: •\t1 point: Drain affects a single trait (such as Strength score or Will save bonus), chosen when the power is acquired. (To affect a list of traits, one at a time, take Alternate Powers; see page 108.) •\t2 points: Drain affects any one trait, one at a time. •\t3 points: Drain affects all traits of a single type (ability scores, skills, feats, one type of power effect, or all powers of a particular descriptor) all at once (subtracting its rank in power points from each). •\t4 points: Drain reduces all powers at once. •\t5 points: Drain reduces all traits at once.</p>",
        "effectName": "Drain"
      },
      {
        "name": "Dream Control",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "baseCost": 3,
        "type": "Control",
        "fullText": "<p>You can project dreams into a subject's mind while they sleep.</p>",
        "effectName": "Illusion"
      },
      {
        "name": "Dream Travel",
        "action": "Move",
        "range": "Perception",
        "duration": "Sustained",
        "baseCost": 1,
        "type": "Movement",
        "fullText": "<p>You can mentally enter the dreams of a sleeping subject.</p>",
        "effectName": "Super-Movement"
      },
      {
        "name": "Duplication",
        "action": "Standard",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can create a duplicate of yourself.</p>",
        "effectName": "Summon"
      },
      {
        "name": "Earth Control",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can control and move a mass of soil, rock, or minerals.</p>",
        "effectName": "Move Object"
      },
      {
        "name": "Elasticity",
        "action": "Move",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 1,
        "type": "Alteration",
        "fullText": "<p>Your body is elastic, allowing you to stretch over greater than normal distances.</p>",
        "effectName": "Elongation"
      },
      {
        "name": "Electrical Control",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can generate electricity, projecting a blast of lightning.</p>",
        "effectName": "Damage"
      },
      {
        "name": "Empowerment",
        "action": "Full",
        "range": "Touch",
        "duration": "Sustained",
        "baseCost": 6,
        "type": "General",
        "fullText": "<p>You can bestow powers to others temporarily by touch.</p>",
        "effectName": "Boost"
      },
      {
        "name": "Energy Aura",
        "action": "Free",
        "range": "Touch",
        "duration": "Sustained",
        "baseCost": 4,
        "type": "Attack",
        "fullText": "<p>You can surround your body with an aura of energy that inflicts damage on anyone coming into contact with you.</p>",
        "effectName": "Damage"
      },
      {
        "name": "Enhanced Ability",
        "type": "Ability",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Continuous",
        "baseCost": 1,
        "fullText": "<p>One of your basic ability scores is enhanced (see Chapter 2); each rank in Enhanced Ability gives you +1 to the ability score, just like a normal ability. An Enhanced Ability can be nullified, unlike a normal ability score, but you can also apply extra effort to it (see Extra Effort, page 120). The GM approves any extra effort use in conjunction with your Enhanced Abilities. An Enhanced Ability may also have appropriate descriptors applied to it, differentiating it from a normal ability score. You can freely mix normal and enhanced ability scores.</p>",
        "effectName": "Enhanced Trait"
      },
      {
        "name": "Evolutionary Shift",
        "action": "Free",
        "range": "Personal",
        "duration": "Continuous",
        "baseCost": 10,
        "type": "Alteration",
        "fullText": "<p>You can transform yourself by shifting 'up' or 'down' the evolutionary scale.</p>",
        "effectName": "Morph"
      },
      {
        "name": "Exorcism",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can banish certain summoned creatures back where they came from and end certain mental influences.</p>",
        "effectName": "Nullify"
      },
      {
        "name": "Fire Control",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can control the movement and spread of flames.</p>",
        "effectName": "Damage"
      },
      {
        "name": "Force Constructs",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can generate and project a solid force field, forming simple geometric shapes.</p>",
        "effectName": "Create Object"
      },
      {
        "name": "Force Field",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 1,
        "type": "Defense",
        "fullText": "<p>You can surround yourself with a protective field of force.</p>",
        "effectName": "Protection"
      },
      {
        "name": "Friction Control",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "baseCost": 3,
        "type": "Control",
        "fullText": "<p>You can affect the friction of an area, increasing or decreasing it.</p>",
        "effectName": "Environmental Control"
      },
      {
        "name": "Gadgets",
        "action": "Standard",
        "range": "Personal",
        "duration": "Continuous",
        "baseCost": 6,
        "type": "General",
        "fullText": "<p>You can produce a wide variety of Devices essentially at will.</p>",
        "effectName": "Variable"
      },
      {
        "name": "Gestalt",
        "action": "Full",
        "range": "Personal",
        "duration": "Continuous",
        "baseCost": 1,
        "type": "Alteration",
        "fullText": "<p>A Gestalt is made up of two (or more) component creatures joining together to form a single entity.</p>",
        "effectName": "Summon"
      },
      {
        "name": "Grafting",
        "action": "Standard",
        "range": "Touch",
        "duration": "Sustained",
        "baseCost": 11,
        "type": "Attack",
        "fullText": "<p>This bizarre power allows you to 'steal' parts of a target's body and replace your own with them.</p>",
        "effectName": "Healing"
      },
      {
        "name": "Gravity Control",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can control the intensity of gravity in a radius.</p>",
        "effectName": "Move Object"
      },
      {
        "name": "Hellfire Control",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can generate and project a mystical energy called 'hellfire.'</p>",
        "effectName": "Damage"
      },
      {
        "name": "Hypnosis",
        "action": "Standard",
        "range": "Sensory",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can place subjects into a powerful hypnotic trance with nothing more than the sound of your voice.</p>",
        "effectName": "Mind Control"
      },
      {
        "name": "Ignite",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "baseCost": 3,
        "type": "Attack",
        "fullText": "<p>You can cause objects in your line of sight to spontaneously combust.</p>",
        "effectName": "Damage"
      },
      {
        "name": "Immortality",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "baseCost": 5,
        "type": "Defense",
        "fullText": "<p>You cannot die! You are immune to aging, disease, and poisons.</p>",
        "effectName": "Regeneration"
      },
      {
        "name": "Immutable",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "baseCost": 10,
        "type": "Defense",
        "fullText": "<p>You are completely immune to any effect that alters your traits.</p>",
        "effectName": "Immunity"
      },
      {
        "name": "Kinetic Control",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can generate and project kinetic energy as a blast of force.</p>",
        "effectName": "Move Object"
      },
      {
        "name": "Life Control",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "baseCost": 4,
        "type": "Control",
        "fullText": "<p>You can exert control over the processes of life and organic matter itself.</p>",
        "effectName": "Drain, Nauseate"
      },
      {
        "name": "Light Control",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can generate light as bright as daylight.</p>",
        "effectName": "Environmental Control"
      },
      {
        "name": "Machine Animation",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can imbue machines with a semblance of life, animating them as constructs under your control.</p>",
        "effectName": "Summon"
      },
      {
        "name": "Magic",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You are a sorcerer, witch, or wizard, able to cast a variety of magical spells.</p>",
        "effectName": "Variable"
      },
      {
        "name": "Magnetic Control",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can move objects of ferrous metal.</p>",
        "effectName": "Move Object"
      },
      {
        "name": "Matter-Eater",
        "action": "Standard",
        "range": "Touch",
        "duration": "Instant",
        "baseCost": 6,
        "type": "General",
        "fullText": "<p>You have the power to eat (and safely digest) essentially anything you can fit into your mouth.</p>",
        "effectName": "Drain"
      },
      {
        "name": "Mental Blast",
        "type": "Attack/Mental",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "fullText": "<p>You can strike any target you can accurately perceive with a blast of mental force. The target makes a Will saving throw against a DC of 15 + power rank and suffers damage on a failed save. Mental blasts have no effect on inanimate objects or mindless creatures (those lacking one or more mental ability scores).</p>",
        "effectName": "Damage",
        "modifiers": [
          { "name": "Perception Range", "ranks": 1, "cost": 2, "costType": "per_rank", "hasRanks": false, "category": "extra", "isMeta": false },
          { "name": "Alternate Save (Will)", "ranks": 1, "cost": 1, "costType": "per_rank", "hasRanks": false, "category": "extra", "isMeta": false }
        ]
      },
      {
        "name": "Mental Duplication",
        "action": "Standard",
        "range": "Touch",
        "duration": "Continuous",
        "baseCost": 3,
        "type": "Control",
        "fullText": "<p>You can 'duplicate' the qualities of another character's mind.</p>",
        "effectName": "Mind Reading"
      },
      {
        "name": "Microwave Control",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can emit and control microwaves (and radio waves).</p>",
        "effectName": "Damage"
      },
      {
        "name": "Mimic",
        "action": "Standard",
        "range": "Touch",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Alteration",
        "fullText": "<p>You can imitate one (or more) of another character's traits.</p>",
        "effectName": "Variable"
      },
      {
        "name": "Mind Shield",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 1,
        "type": "Defense",
        "fullText": "<p>This power protects you from mental effects.</p>",
        "effectName": "Mind Shield"
      },
      {
        "name": "Mind Switch",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can switch your mind into the body of another creature, putting its mind into your body.</p>",
        "effectName": "Mind Control"
      },
      {
        "name": "Mirror Image",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 4,
        "type": "Alteration",
        "fullText": "<p>You can create multiple, shifting mirror images of yourself.</p>",
        "effectName": "Illusion"
      },
      {
        "name": "Mutation",
        "action": "Standard",
        "range": "Touch",
        "duration": "Sustained",
        "baseCost": 4,
        "type": "Attack",
        "fullText": "<p>You can mutate living beings by touch, changing around their physical traits and appearance.</p>",
        "effectName": "Morph"
      },
      {
        "name": "Nemesis",
        "action": "Free",
        "range": "Perception",
        "duration": "Continuous",
        "baseCost": 8,
        "type": "Alteration",
        "fullText": "<p>You can adapt the powers you need to confront a particular opponent.</p>",
        "effectName": "Variable"
      },
      {
        "name": "Nullify",
        "type": "Trait",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "baseCost": 1,
        "fullText": "<p>You can counter a target’s powers (see Countering Powers, page 70). Make a ranged attack roll to hit the target. Then, make an opposed power check of your Nullify rank and the target power’s rank or the target’s Will save, whichever is higher. If you are targeting the subject of the power rather than the power’s user, make an opposed power check against the user (Will save is not a factor). If you win, the targeted power turns off, although the user can re-activate it normally. You can’t nullify Innate powers (see Innate, page 109). The cost per rank determines what you can counter: •\t1 point: Counter any one power of a particular descriptor at a time (fire powers, magical powers, mental powers, etc.). •\t2 points: Counter all powers of a particular descriptor (such as fire or magic) or type (like attack or sensory effects) at once. Choose the affected descriptor or type when you acquire the power. •\t3 points: Counter all powers at once.</p>",
        "effectName": "Nullify"
      },
      {
        "name": "Object Mimicry",
        "action": "Move",
        "range": "Touch",
        "duration": "Sustained",
        "baseCost": 6,
        "type": "Alteration",
        "fullText": "<p>You can copy the properties of objects you touch, giving you various powers.</p>",
        "effectName": "Variable"
      },
      {
        "name": "Pain",
        "action": "Standard",
        "range": "Perception",
        "duration": "Concentration",
        "baseCost": 5,
        "type": "Attack",
        "fullText": "<p>You can mentally inflict debilitating pain on a target you can accurately perceive.</p>",
        "effectName": "Nauseate"
      },
      {
        "name": "Petrification",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 3,
        "type": "Attack",
        "fullText": "<p>You can project an effect out to normal range that turns creatures it strikes into stone.</p>",
        "effectName": "Transform"
      },
      {
        "name": "Pheromones",
        "action": "Reaction",
        "range": "Sensory",
        "duration": "Sustained",
        "baseCost": 4,
        "type": "Control",
        "fullText": "<p>Your body emits exceptionally strong pheromones, bio-chemical cues that affect attraction.</p>",
        "effectName": "Emotion Control"
      },
      {
        "name": "Plant Control",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can control the growth and movement of plants.</p>",
        "effectName": "Move Object"
      },
      {
        "name": "Plant Mimicry",
        "action": "Free",
        "range": "Personal",
        "duration": "Continuous",
        "baseCost": 9,
        "type": "Alteration",
        "fullText": "<p>You can gain the traits of various plants, transforming to become more plant-like.</p>",
        "effectName": "Variable"
      },
      {
        "name": "Plasma Control",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can generate and project high-energy plasma.</p>",
        "effectName": "Damage"
      },
      {
        "name": "Possession",
        "action": "Standard",
        "range": "Touch",
        "duration": "Sustained",
        "baseCost": 3,
        "type": "Control",
        "fullText": "<p>You can merge with and assume control of a target's body.</p>",
        "effectName": "Mind Control"
      },
      {
        "name": "Power Control",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can exert influence over the powers of others, overriding the victim's control.</p>",
        "effectName": "Mind Control"
      },
      {
        "name": "Power Reserve",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "General",
        "fullText": "<p>You have a 'reserve' of power points you can assign to improve your various powers.</p>",
        "effectName": "Boost"
      },
      {
        "name": "Power Resistance",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Instant",
        "baseCost": 2,
        "type": "Defense",
        "fullText": "<p>You are especially resistant to powers of a particular descriptor.</p>",
        "effectName": "Nullify"
      },
      {
        "name": "Prehensile Hair",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 1,
        "type": "Alteration",
        "fullText": "<p>Your hair can animate and grasp objects as if it were one or more fine tentacles.</p>",
        "effectName": "Additional Limbs"
      },
      {
        "name": "Radiation Control",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can generate and project blasts of radiation.</p>",
        "effectName": "Damage"
      },
      {
        "name": "Reflection Field",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Instant",
        "baseCost": 8,
        "type": "Defense",
        "fullText": "<p>You are surrounded by an effect that causes attacks against you to be reflected back against the attacker.</p>",
        "effectName": "Deflect"
      },
      {
        "name": "Reflex Memory",
        "action": "Free",
        "range": "Personal",
        "duration": "Continuous",
        "baseCost": 9,
        "type": "Alteration",
        "fullText": "<p>You can learn and memorize the physical skills of others just by seeing them performed.</p>",
        "effectName": "Variable"
      },
      {
        "name": "Sensory Link",
        "action": "Move",
        "range": "Extended",
        "duration": "Concentration",
        "baseCost": 2,
        "type": "Sensory",
        "fullText": "<p>You have the power to perceive through the senses of others as if they were your own.</p>",
        "effectName": "ESP"
      },
      {
        "name": "Sensory Shield",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Permanent",
        "baseCost": 1,
        "type": "Defense",
        "fullText": "<p>One of your senses is protected against sensory effects.</p>",
        "effectName": "Sensory Shield"
      },
      {
        "name": "Shape Matter",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 4,
        "type": "Control",
        "fullText": "<p>You can shape and mold non-living matter to your will as if it were soft clay.</p>",
        "effectName": "Transform"
      },
      {
        "name": "Shapeshift",
        "action": "Move",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 8,
        "type": "Alteration",
        "fullText": "<p>You can transform into different forms, gaining the physical traits of the assumed form.</p>",
        "effectName": "Variable"
      },
      {
        "name": "Shield",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 1,
        "type": "Defense",
        "fullText": "<p>You have a shield able to deflect the brunt of attacks.</p>",
        "effectName": "Shield"
      },
      {
        "name": "Silence",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 1,
        "type": "Alteration",
        "fullText": "<p>You move with complete silence and do not give off noise unless you wish to.</p>",
        "effectName": "Obscure"
      },
      {
        "name": "Sleep",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "baseCost": 3,
        "type": "Attack",
        "fullText": "<p>You can cause targets to fall into a deep sleep.</p>",
        "effectName": "Fatigue"
      },
      {
        "name": "Sonic Control",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can generate a deafening blast of sound.</p>",
        "effectName": "Damage"
      },
      {
        "name": "Spatial Control",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "baseCost": 2,
        "type": "Movement",
        "fullText": "<p>You can twist and distort space, including distances and topography.</p>",
        "effectName": "Teleport"
      },
      {
        "name": "Spinning",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Defense",
        "fullText": "<p>You can spin rapidly along your vertical axis at tremendous speed.</p>",
        "effectName": "Deflect"
      },
      {
        "name": "Spirit Control",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can exert control over spirits and spiritual creatures.</p>",
        "effectName": "Mind Control"
      },
      {
        "name": "Strike",
        "type": "Attack",
        "action": "Standard",
        "range": "Touch",
        "duration": "Instant",
        "baseCost": 1,
        "fullText": "<p>This power inflicts damage in melee combat. It might be claws, energy fields, focused striking strength, and so forth, depending on your descriptors. Melee weapons are devices or equipment with this power (see Chapter 7). Your Strike rank substitutes for your Strength modifier to determine your melee damage. This means there’s no reason to take Strike at a rank less than your Strength bonus without the Mighty power feat (see the following). Your maximum damage is limited by the campaign’s power level (see page 24).</p>",
        "effectName": "Damage"
      },
      {
        "name": "Summon",
        "type": "General",
        "action": "Standard",
        "range": "Touch",
        "duration": "Sustained",
        "baseCost": 2,
        "fullText": "<p>You can call upon another creature—a minion (see page 63)—to aid you. This creature is created as an independent character with (rank × 15) power points. Summoned minions are subject to the normal power level limits, and cannot have minions themselves. You can summon your minion to you automatically as a standard action; it appears in the nearest open space beside you. You always have the same minion unless you apply power modifiers allowing you to sum- mon different minions. Your minion automatically has a helpful attitude and does its best to aid you and obey your commands (see page 175 for descriptions of NPC attitudes). Unconscious and dead minions disappear. Defeated minions recover normally except they recover from death as if they were disabled. You cannot summon a defeated minion until it has completely recovered. Your summoned minions also vanish if your power is turned off, countered, or nullified.</p>",
        "effectName": "Summon"
      },
      {
        "name": "Super-Ventriloquism",
        "action": "Free",
        "range": "Extended",
        "duration": "Sustained",
        "baseCost": 1,
        "type": "Sensory",
        "fullText": "<p>You can 'throw' your voice over a distance, making it seem to originate from somewhere else.</p>",
        "effectName": "Communication"
      },
      {
        "name": "Suspended Animation",
        "action": "Full",
        "range": "Personal",
        "duration": "Continuous",
        "baseCost": 2,
        "type": "Defense",
        "fullText": "<p>You can enter a deep death-like trance that largely suspends your bodily functions.</p>",
        "effectName": "Immunity"
      },
      {
        "name": "Telekinesis",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can move objects at a distance just by willing it.</p>",
        "effectName": "Move Object"
      },
      {
        "name": "Telelocation",
        "action": "Full",
        "range": "Extended",
        "duration": "Concentration",
        "baseCost": 1,
        "type": "Sensory",
        "fullText": "<p>You can mentally 'search' an area for an intelligent creature.</p>",
        "effectName": "ESP"
      },
      {
        "name": "Telepathy",
        "action": "Standard",
        "range": "Perception",
        "duration": "Concentration",
        "baseCost": 2,
        "type": "Sensory",
        "fullText": "<p>You can read minds and project your thoughts into the minds of others.</p>",
        "effectName": "Communication, Mind Reading"
      },
      {
        "name": "Thermal Control",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You have the ability to affect the temperature in an area, either raising or lowering it.</p>",
        "effectName": "Environmental Control"
      },
      {
        "name": "Time Control",
        "action": "Move",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 7,
        "type": "Control",
        "fullText": "<p>You can control the flow of time.</p>",
        "effectName": "Paralyze, Super-Speed"
      },
      {
        "name": "Time Stop",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 7,
        "type": "Control",
        "fullText": "<p>You can 'freeze' time in an area.</p>",
        "effectName": "Paralyze"
      },
      {
        "name": "Transfer",
        "action": "Standard",
        "range": "Touch",
        "duration": "Instant",
        "baseCost": 2,
        "type": "Attack",
        "fullText": "<p>You can take power points from a target's traits and add them to your own.</p>",
        "effectName": "Boost, Drain"
      },
      {
        "name": "Transmit",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "baseCost": 1,
        "type": "Movement",
        "fullText": "<p>You can move instantly from place to place through a particular medium.</p>",
        "effectName": "Teleport"
      },
      {
        "name": "Transmutation",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 5,
        "type": "Control",
        "fullText": "<p>You can transform the elemental composition of non-living matter, turning one sort of matter into another.</p>",
        "effectName": "Transform"
      },
      {
        "name": "Troubleseeker",
        "action": "Full",
        "range": "Personal",
        "duration": "Instant",
        "baseCost": 2,
        "type": "Movement",
        "fullText": "<p>You have a true talent for finding trouble, automatically teleporting to danger.</p>",
        "effectName": "Super-Senses"
      },
      {
        "name": "Universal Translator",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Continuous",
        "baseCost": 8,
        "type": "Sensory",
        "fullText": "<p>You can understand any spoken or written language, and anyone who hears you speak hears your words in their native tongue.</p>",
        "effectName": "Comprehend"
      },
      {
        "name": "Vibration Control",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can generate and project vibrations, creating a blast of vibratory energy.</p>",
        "effectName": "Damage"
      },
      {
        "name": "Ward",
        "action": "Standard",
        "range": "Touch",
        "duration": "Sustained",
        "baseCost": 1,
        "type": "Defense",
        "fullText": "<p>You can hedge out creatures of a particular type from an area.</p>",
        "effectName": "Nullify"
      },
      {
        "name": "Water Control",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can control a mass of water (fresh or salt water, but not other liquids).</p>",
        "effectName": "Move Object"
      },
      {
        "name": "Weapon Summoning",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Attack",
        "fullText": "<p>You can summon weapons out of nowhere.</p>",
        "effectName": "Summon"
      },
      {
        "name": "Weather Control",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "baseCost": 2,
        "type": "Control",
        "fullText": "<p>You can control and alter the weather.</p>",
        "effectName": "Environmental Control"
      }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { POWER_EFFECTS_LIST };
}