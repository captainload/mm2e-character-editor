let char = new CharacterModel();
window.char = char;
window.primaryHero = null;
window.activeCompanionId = null;
char.powers = [];

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
window.escapeHtml = escapeHtml;

let skillSort = { col: "name", asc: true };
let advSort = { col: "name", asc: true };

let skillsDisplayList = typeof SKILLS_LIST !== 'undefined' ? [...SKILLS_LIST] : [];
let advantagesDisplayList = typeof ADVANTAGES_LIST !== 'undefined' ? [...ADVANTAGES_LIST] : [];


// --- EFFECT TYPE TO ALLOWED MODIFIERS FILTER ---
const PROGRESSION_EXTRAS = [
  "Progression", "Progression (Area)", "Progression (Duration)", "Progression (Mass)", "Progression (Range)", "Progression (Targets)"
];

const UNIVERSAL_EXTRAS = [
  ...PROGRESSION_EXTRAS
];

const UNIVERSAL_FEATS = [
  "Innate", "Precise", "Reversible", "Slow Fade", "Subtle", "Transmutation", "Triggered", "Variable Descriptor"
];

const MODIFIER_CATEGORY_MAP = {
  Attack: [
    "Action (Extra)", "Action (Flaw)", "Affects Corporeal", "Affects Insubstantial", "Affects Objects", "Alternate Save", "Area", "Aura", "Autofire", "Contagious", "Disease", "Duration (Extra)", "Duration (Flaw)", "Extended Range", "Linked", "No Saving Throw", "Penetrating", "Poison", "Range (Extra)", "Range (Flaw)", "Reaction", "Secondary Effect", "Selective Attack", "Sleep", "Targeted", "Vampiric", "Continuous", "Sustained",
    "Check Required", "Concentration", "Distracting", "Fades", "Feedback", "Full Power", "Grab-Based", "Inaccurate", "Limited", "Noticeable", "Permanent", "Personal", "Require Material", "Resistible", "Sense-Dependent", "Side-Effect", "Tiring", "Touch", "Unreliable",
    "Accurate", "Dimensional", "Reach", "Homing", "Improved Critical", "Improved Range", "Incurable", "Indirect", "Mighty", "Ricochet", "Sedation", "Split Attack", "Tether", "Thrown",
    ...UNIVERSAL_EXTRAS,
    ...UNIVERSAL_FEATS
  ],
  Defense: [
    "Action (Extra)", "Action (Flaw)", "Affects Others", "Area", "Continuous", "Duration (Extra)", "Duration (Flaw)", "Independent", "Linked", "Reaction", "Sustained", "Total Fade",
    "Check Required", "Concentration", "Distracting", "Fades", "Limited", "Noticeable", "Permanent", "Personal", "Require Material", "Sense-Dependent", "Side-Effect", "Tiring", "Unreliable",
    "Affects Insubstantial", "Dimensional",
    ...UNIVERSAL_EXTRAS,
    ...UNIVERSAL_FEATS
  ],
  Movement: [
    "Action (Extra)", "Action (Flaw)", "Affects Others", "Area", "Continuous", "Duration (Extra)", "Duration (Flaw)", "Independent", "Linked", "Reaction", "Sustained", "Targeted", "Total Fade",
    "Check Required", "Concentration", "Distracting", "Fades", "Limited", "Noticeable", "Permanent", "Require Material", "Sense-Dependent", "Side-Effect", "Tiring", "Unreliable",
    "Dimensional", "Extended", "Reach",
    ...UNIVERSAL_EXTRAS,
    ...UNIVERSAL_FEATS
  ],
  Sensory: [
    "Action (Extra)", "Action (Flaw)", "Affects Others", "Area", "Continuous", "Duration (Extra)", "Duration (Flaw)", "Independent", "Linked", "Range (Extra)", "Range (Flaw)", "Reaction", "Sustained", "Targeted", "Total Fade",
    "Check Required", "Concentration", "Distracting", "Fades", "Limited", "Noticeable", "Permanent", "Require Material", "Sense-Dependent", "Side-Effect", "Tiring", "Unreliable",
    "Dimensional", "Extended", "Reach",
    ...UNIVERSAL_EXTRAS,
    ...UNIVERSAL_FEATS
  ],
  Control: [
    "Action (Extra)", "Action (Flaw)", "Affects Corporeal", "Affects Insubstantial", "Affects Objects", "Area", "Continuous", "Duration (Extra)", "Duration (Flaw)", "Extended Range", "Independent", "Linked", "Range (Extra)", "Range (Flaw)", "Reaction", "Secondary Effect", "Selective Attack", "Sustained", "Targeted", "Total Fade",
    "Check Required", "Concentration", "Distracting", "Fades", "Feedback", "Limited", "Noticeable", "Permanent", "Require Material", "Resistible", "Sense-Dependent", "Side-Effect", "Tiring", "Touch", "Unreliable",
    "Accurate", "Dimensional", "Reach", "Homing", "Improved Range", "Indirect", "Ricochet", "Split Attack", "Tether",
    ...UNIVERSAL_EXTRAS,
    ...UNIVERSAL_FEATS
  ],
  Alteration: [
    "Action (Extra)", "Action (Flaw)", "Affects Corporeal", "Affects Others", "Area", "Continuous", "Duration (Extra)", "Duration (Flaw)", "Independent", "Linked", "Reaction", "Sustained", "Total Fade",
    "Check Required", "Concentration", "Distracting", "Fades", "Feedback", "Limited", "Noticeable", "Permanent", "Personal", "Require Material", "Resistible", "Sense-Dependent", "Side-Effect", "Tiring", "Touch", "Unreliable",
    "Affects Insubstantial", "Dimensional", "Reach", "Incurable", "Mighty",
    ...UNIVERSAL_EXTRAS,
    ...UNIVERSAL_FEATS
  ],
  General: [
    "Action (Extra)", "Action (Flaw)", "Check Required", "Continuous", "Distracting", "Duration (Extra)", "Duration (Flaw)", "Extended Range", "Fades", "Independent", "Linked", "Noticeable", "Permanent", "Personal", "Reaction", "Require Material", "Sense-Dependent", "Side-Effect", "Sustained", "Tiring", "Total Fade", "Touch", "Unreliable", "Limited",
    "Affects Insubstantial", "Dimensional", "Extended", "Reach", "Homing", "Improved Critical", "Improved Range", "Incurable", "Indirect", "Mighty", "Ricochet", "Sedation", "Split Attack", "Tether", "Thrown",
    ...UNIVERSAL_EXTRAS,
    ...UNIVERSAL_FEATS
  ]
};


const SENSE_TYPE_MAP = {
  "Visual Sense Type": "Visual", "Normal Sight": "Visual", "Normal Vision": "Visual", "Darkvision": "Visual", "Dark-Vision": "Visual", "Infravision": "Visual", "Infra-Vision": "Visual", 
  "Low-Light Vision": "Visual", "Microscopic Vision": "Visual", "Ultravision": "Visual", "Ultra-Vision": "Visual", "X-Ray Vision": "Visual", "Penetrates Concealment (X-Ray)": "Visual",
  "Auditory Sense Type": "Auditory", "Normal Hearing": "Auditory", "Ultra-Hearing": "Auditory", "Sonar / Ultrasonic": "Auditory",
  "Olfactory Sense Type": "Olfactory", "Normal Smell": "Olfactory", "Normal Scent": "Olfactory", "Normal Taste": "Olfactory", "Scent": "Olfactory", "Tracking Scent": "Olfactory", "Tracking": "Olfactory",
  "Tactile Sense Type": "Tactile", "Normal Touch": "Tactile", "Tremorsense": "Tactile", "Blindsight": "Tactile",
  "Radio Sense Type": "Radio", "Normal Radio": "Radio", "Radio": "Radio", "Radar": "Radio",
  "Mental Sense Type": "Mental", "Mental Sense": "Mental", "Normal Mental": "Mental", "Awareness": "Mental", "Danger Sense": "Mental", "Postcognition": "Mental", "Precognition": "Mental", "Time Sense": "Mental", "Communication Link": "Mental", "Direction Sense": "Mental", "Distance Sense": "Mental", "Detect": "Mental",
  "Custom Sense": "Special"
};

const INHERENT_SENSE_TRAITS = {
  "Visual Sense Type": ["Accurate", "Acute", "Ranged"],
  "Normal Sight": ["Accurate", "Acute", "Ranged"],
  "Darkvision": ["Accurate", "Acute", "Ranged", "Counters Concealment (Darkness)"],
  "Infravision": ["Accurate", "Acute", "Ranged"],
  "Low-Light Vision": ["Accurate", "Acute", "Ranged"],
  "Microscopic Vision": ["Accurate", "Acute", "Ranged"],
  "Ultravision": ["Accurate", "Acute", "Ranged"],
  "X-Ray Vision": ["Accurate", "Acute", "Ranged", "Penetrates Concealment"],
  "Auditory Sense Type": ["Acute", "Radius", "Ranged"],
  "Normal Hearing": ["Acute", "Radius", "Ranged"],
  "Ultra-Hearing": ["Acute", "Radius", "Ranged"],
  "Sonar / Ultrasonic": ["Accurate", "Acute", "Radius", "Ranged"],
  "Olfactory Sense Type": ["Radius"],
  "Normal Smell": ["Radius"],
  "Scent": ["Acute", "Radius"],
  "Tracking Scent": ["Acute", "Radius", "Tracking"],
  "Tactile Sense Type": ["Accurate", "Acute", "Radius"],
  "Normal Touch": ["Accurate", "Acute", "Radius"],
  "Tremorsense": ["Accurate", "Radius", "Ranged"],
  "Blindsight": ["Accurate", "Radius", "Ranged"],
  "Radio Sense Type": ["Ranged"],
  "Radio": ["Ranged"],
  "Radar": ["Accurate", "Radius", "Ranged"],
  "Mental Sense Type": [],
  "Mental Sense": [],
  "Awareness": ["Ranged"],
  "Detect": ["Ranged"],
  "Danger Sense": [],
  "Direction Sense": [],
  "Distance Sense": [],
  "Time Sense": [],
  "Communication Link": [],
  "Postcognition": [],
  "Precognition": [],
  "Custom Sense": []
};

const ALL_POSSIBLE_MODIFIERS_BY_CATEGORY = {
  "Visual": ["Analytical", "Counters Concealment", "Counters Illusion", "Counters Obscure", "Extended", "Penetrates Concealment", "Radius", "Rapid", "Tracking"],
  "Auditory": ["Accurate", "Analytical", "Counters Concealment", "Counters Illusion", "Counters Obscure", "Extended", "Penetrates Concealment", "Rapid", "Tracking"],
  "Olfactory": ["Accurate", "Acute", "Analytical", "Counters Concealment", "Counters Illusion", "Counters Obscure", "Extended", "Penetrates Concealment", "Ranged", "Rapid", "Tracking"],
  "Tactile": ["Analytical", "Counters Concealment", "Counters Illusion", "Counters Obscure", "Extended", "Penetrates Concealment", "Ranged", "Rapid", "Tracking"],
  "Radio": ["Accurate", "Acute", "Analytical", "Counters Concealment", "Counters Illusion", "Counters Obscure", "Extended", "Penetrates Concealment", "Radius", "Rapid", "Tracking"],
  "Mental": ["Accurate", "Acute", "Analytical", "Counters Concealment", "Counters Illusion", "Counters Obscure", "Extended", "Penetrates Concealment", "Radius", "Ranged", "Rapid", "Tracking"]
};

function isSenseCategoryMaxed(cat, effect) {
  if (!effect || !effect.subPowers) return false;
  const possibleMods = ALL_POSSIBLE_MODIFIERS_BY_CATEGORY[cat];
  if (!possibleMods || possibleMods.length === 0) return false;
  const typeSub = effect.subPowers.find(sp => {
    let tName = sp.name || sp.type || "";
    return tName.includes("Sense Type") && (sp.senseCategory === cat || tName.includes(cat));
  });
  if (!typeSub || !typeSub.modifiers || typeSub.modifiers.length === 0) return false;
  const assigned = typeSub.modifiers.map(m => m.name.split(" (")[0].trim());
  return possibleMods.every(pm => assigned.some(am => am.startsWith(pm)));
}

const EFFECT_OPTION_SUBSETS = {
  "Immunity": {
    "Suffocation (All / No need to breathe)": [
      "Suffocation (One Type)"
    ],
    "Life Support": [
      "Disease",
      "Poison",
      "Environmental Condition (Cold)",
      "Environmental Condition (Heat)",
      "Environmental Condition (High Pressure)",
      "Environmental Condition (Radiation)",
      "Environmental Condition (Vacuum)",
      "Suffocation (All / No need to breathe)",
      "Suffocation (One Type)"
    ],
    "All Fortitude Effects": [
      "Life Support",
      "Disease",
      "Poison",
      "Environmental Condition (Cold)",
      "Environmental Condition (Heat)",
      "Environmental Condition (High Pressure)",
      "Environmental Condition (Radiation)",
      "Environmental Condition (Vacuum)",
      "Suffocation (All / No need to breathe)",
      "Suffocation (One Type)",
      "Aging",
      "Starvation and Thirst",
      "Need for Sleep",
      "Fatigue Effects"
    ],
    "All Will Effects": [
      "Mental Effects",
      "Emotion Effects",
      "Interaction Skills"
    ],
    "All Reflex Effects": [
      "Entrapment",
      "Dazzle Effects"
    ]
  },
  "Super-Senses": {
    "Visual Sense Type": [
      "Normal Sight", "Darkvision", "Infravision", "Low-Light Vision", "Microscopic Vision", "Ultravision", "X-Ray Vision"
    ],
    "Auditory Sense Type": [
      "Normal Hearing", "Ultra-Hearing", "Sonar / Ultrasonic"
    ],
    "Olfactory Sense Type": [
      "Normal Smell", "Scent", "Tracking Scent"
    ],
    "Tactile Sense Type": [
      "Normal Touch", "Tremorsense", "Blindsight"
    ],
    "Radio Sense Type": [
      "Radio", "Radar"
    ],
    "Mental Sense Type": [
      "Mental Sense", "Awareness", "Communication Link", "Danger Sense", "Detect", "Direction Sense", "Distance Sense", "Time Sense", "Postcognition", "Precognition"
    ]
  }
};

function getSubsetsForOption(effectName, optionName) {
  const map = EFFECT_OPTION_SUBSETS[effectName];
  if (!map) return [];
  const clean = (optionName || "").split(" [")[0].trim();
  const direct = map[clean] || [];
  let allSubsets = [...direct];
  direct.forEach(sub => {
    const deeper = getSubsetsForOption(effectName, sub);
    deeper.forEach(d => {
      if (!allSubsets.includes(d)) allSubsets.push(d);
    });
  });
  return allSubsets;
}

function getSupersetsForOption(effectName, optionName) {
  const map = EFFECT_OPTION_SUBSETS[effectName];
  if (!map) return [];
  const clean = (optionName || "").split(" [")[0].trim();
  let supersets = [];
  for (const [parentName, children] of Object.entries(map)) {
    if (children.includes(clean)) {
      if (!supersets.includes(parentName)) supersets.push(parentName);
      const higher = getSupersetsForOption(effectName, parentName);
      higher.forEach(h => {
        if (!supersets.includes(h)) supersets.push(h);
      });
    }
  }
  return supersets;
}

function isOptionCoveredByExisting(effect, optionName) {
  if (!effect || !effect.subPowers || effect.subPowers.length === 0) return false;
  const clean = (optionName || "").split(" [")[0].trim();
  const supersets = getSupersetsForOption(effect.effectName, clean);
  if (supersets.length === 0) return false;
  return effect.subPowers.some(sp => {
    const spClean = (sp.name || sp.type || "").split(" [")[0].trim();
    return supersets.includes(spClean);
  });
}

window.generateSmartModifiers = function(effect) {
    if (!effect || !effect.effectName) return { extras: [], flaws: [] };
    let effectData = typeof POWER_EFFECTS_LIST !== 'undefined' ? POWER_EFFECTS_LIST.find(e => e.name === effect.effectName) : null;
    if (!effectData) return { extras: [], flaws: [] };
    
    let extras = [];
    let flaws = [];
    
    let baseRange = effectData.range || "Close";
    let baseDur = effectData.duration || "Instant";
    let baseAct = effectData.action || "Standard";

    const profile = typeof POWER_PROFILES_LIST !== 'undefined' ? POWER_PROFILES_LIST.find(p => p.name === effect.name) : null;
    if (profile) {
      if (profile.range) baseRange = profile.range;
      if (profile.duration) baseDur = profile.duration;
      if (profile.action) baseAct = profile.action;
    }

    const DURATION_TIERS = { "Instant": 1, "Concentration": 2, "Sustained": 3, "Continuous": 4, "Permanent": 5 };
    const ACTION_TIERS = { "Full": 1, "Standard": 2, "Move": 3, "Free": 4, "Reaction": 5, "None": 6 };

    const isDisablePerception = (typeof char !== 'undefined' && char.houseRules && char.houseRules.disablePerceptionRange) || 
                                (typeof localStorage !== 'undefined' && localStorage.getItem("mm2e_houserule_disable_perception_range") === "true");

    // RANGE
    if (baseRange === "Personal") {
        extras.push({ name: "Increased Range", cost: 1, costType: "per_rank", hasRanks: true, maxRanks: isDisablePerception ? 1 : 2, category: "extra" });
    } else if (baseRange === "Close" || baseRange === "Touch") {
        extras.push({ name: "Increased Range", cost: 1, costType: "per_rank", hasRanks: true, maxRanks: isDisablePerception ? 1 : 2, category: "extra" });
        extras.push({ name: "Ranged", cost: 1, costType: "per_rank", hasRanks: false, category: "extra" });
        if (!isDisablePerception) {
            extras.push({ name: "Perception Range", cost: 2, costType: "per_rank", hasRanks: false, category: "extra" });
        }
    } else if (baseRange === "Ranged") {
        extras.push({ name: "Extended Range", cost: 1, costType: "flat", hasRanks: true, maxRanks: 10, category: "extra" });
        if (!isDisablePerception) {
            extras.push({ name: "Increased Range", cost: 1, costType: "per_rank", hasRanks: false, category: "extra" });
            extras.push({ name: "Perception Range", cost: 1, costType: "per_rank", hasRanks: false, category: "extra" });
        } else {
            extras.push({ name: "No Attack Roll", cost: 1, costType: "per_rank", hasRanks: false, category: "extra" });
        }
        flaws.push({ name: "Reduced Range", cost: 1, costType: "per_rank", hasRanks: false, category: "flaw" });
        flaws.push({ name: "Close", cost: 1, costType: "per_rank", hasRanks: false, category: "flaw" });
        flaws.push({ name: "Diminished Range", cost: 1, costType: "flat", hasRanks: true, maxRanks: 3, category: "flaw" });
    } else if (baseRange === "Perception") {
        flaws.push({ name: "Reduced Range", cost: 1, costType: "per_rank", hasRanks: true, maxRanks: 2, category: "flaw" });
        flaws.push({ name: "Close", cost: 2, costType: "per_rank", hasRanks: false, category: "flaw" });
    }

    if (typeof calculateEffectiveRange === 'function') {
        const curEffRange = calculateEffectiveRange(effect, baseRange);
        if (curEffRange === "Ranged") {
            if (!isDisablePerception) {
                if (!extras.some(e => e.name === "Perception Range")) {
                    extras.push({ name: "Perception Range", cost: 1, costType: "per_rank", hasRanks: false, category: "extra" });
                }
            } else {
                if (!extras.some(e => e.name === "No Attack Roll")) {
                    extras.push({ name: "No Attack Roll", cost: 1, costType: "per_rank", hasRanks: false, category: "extra" });
                }
            }
        }
    }

    // DURATION
    let dTier = DURATION_TIERS[baseDur];
    if (dTier !== undefined && dTier >= 1 && dTier <= 4) {
        if (dTier === 1) {
            extras.push({ name: "Increased Duration (Concentration)", cost: 1, costType: "per_rank", category: "extra" });
            extras.push({ name: "Increased Duration (Sustained)", cost: 2, costType: "per_rank", category: "extra" });
            extras.push({ name: "Increased Duration (Continuous)", cost: 3, costType: "per_rank", category: "extra" });
        } else if (dTier === 2) {
            extras.push({ name: "Increased Duration (Sustained)", cost: 1, costType: "per_rank", category: "extra" });
            extras.push({ name: "Increased Duration (Continuous)", cost: 2, costType: "per_rank", category: "extra" });
            flaws.push({ name: "Decreased Duration (Instant)", cost: 1, costType: "per_rank", category: "flaw" });
        } else if (dTier === 3) {
            extras.push({ name: "Increased Duration (Continuous)", cost: 1, costType: "per_rank", category: "extra" });
            flaws.push({ name: "Decreased Duration (Concentration)", cost: 1, costType: "per_rank", category: "flaw" });
            flaws.push({ name: "Decreased Duration (Instant)", cost: 2, costType: "per_rank", category: "flaw" });
        } else if (dTier === 4) {
            flaws.push({ name: "Decreased Duration (Sustained)", cost: 1, costType: "per_rank", category: "flaw" });
            flaws.push({ name: "Decreased Duration (Concentration)", cost: 2, costType: "per_rank", category: "flaw" });
            flaws.push({ name: "Decreased Duration (Instant)", cost: 3, costType: "per_rank", category: "flaw" });
        }
    }

    // ACTION
    let aTier = ACTION_TIERS[baseAct];
    if (aTier !== undefined && aTier >= 2 && aTier <= 5) {
        if (aTier === 2) {
            extras.push({ name: "Action (Move)", cost: 1, costType: "per_rank", category: "extra" });
            extras.push({ name: "Action (Free)", cost: 2, costType: "per_rank", category: "extra" });
            extras.push({ name: "Action (Reaction)", cost: 3, costType: "per_rank", category: "extra" });
            flaws.push({ name: "Activation (Move)", cost: 1, costType: "flat", category: "flaw" });
            flaws.push({ name: "Activation (Standard)", cost: 2, costType: "flat", category: "flaw" });
        } else if (aTier === 3) {
            extras.push({ name: "Action (Free)", cost: 1, costType: "per_rank", category: "extra" });
            extras.push({ name: "Action (Reaction)", cost: 2, costType: "per_rank", category: "extra" });
            flaws.push({ name: "Action (Standard)", cost: 1, costType: "per_rank", category: "flaw" });
        } else if (aTier === 4) {
            extras.push({ name: "Action (Reaction)", cost: 1, costType: "per_rank", category: "extra" });
            flaws.push({ name: "Action (Move)", cost: 1, costType: "per_rank", category: "flaw" });
            flaws.push({ name: "Action (Standard)", cost: 2, costType: "per_rank", category: "flaw" });
        } else if (aTier === 5) {
            flaws.push({ name: "Action (Free)", cost: 1, costType: "per_rank", category: "flaw" });
            flaws.push({ name: "Action (Move)", cost: 2, costType: "per_rank", category: "flaw" });
            flaws.push({ name: "Action (Standard)", cost: 3, costType: "per_rank", category: "flaw" });
        }
    }
    
    return { extras, flaws };
};

const LEGACY_CORE_MODIFIERS = [
  "Continuous",
  "Sustained",
  "Duration (Continuous)",
  "Duration (Sustained)",
  "Increased Duration (Continuous)",
  "Decreased Duration (Sustained)"
];

// --- GET FILTERED MODIFIERS FOR EFFECT ---
function getFilteredModifiersForEffect(effectType, effectOrSub) {
  const isLegacyOn = (typeof char !== 'undefined' && char.houseRules && char.houseRules.enableLegacyCoreModifiers) || 
                     (typeof localStorage !== 'undefined' && localStorage.getItem("mm2e_houserule_enable_legacy_modifiers") === "true");
  const isDisablePerception = (typeof char !== 'undefined' && char.houseRules && char.houseRules.disablePerceptionRange) || 
                              (typeof localStorage !== 'undefined' && localStorage.getItem("mm2e_houserule_disable_perception_range") === "true");

  const allowedNames = MODIFIER_CATEGORY_MAP[effectType] || MODIFIER_CATEGORY_MAP["General"];
  let available = [];

  if (typeof POWER_MODIFIERS_LIST !== 'undefined') {
    available = POWER_MODIFIERS_LIST.filter(m => {
      if (m.name.includes("Alternate Effect")) return false;
      if (!isLegacyOn && LEGACY_CORE_MODIFIERS.includes(m.name)) return false;
      if (isDisablePerception && (m.name === "Perception Range" || m.name === "Range (Perception)")) return false;
      if (!isDisablePerception && m.name === "No Attack Roll") return false;
      // Universal Extras and Feats always allowed
      if (m.name.startsWith("Progression")) return true;
      if (m.category === "feat" && (m.name === "Subtle" || m.name === "Innate" || m.name === "Precise" || m.name === "Reversible" || m.name === "Slow Fade" || m.name === "Variable Descriptor" || m.name === "Triggered" || m.name === "Transmutation")) {
        return true;
      }
      if (isDisablePerception && m.name === "No Attack Roll") return true;
      return allowedNames.includes(m.name);
    });
  }

  const effName = effectOrSub ? (effectOrSub.effectName || effectOrSub.name) : "";
  const effectData = effName ? ((typeof POWER_EFFECTS_LIST !== 'undefined') ? POWER_EFFECTS_LIST.find(e => e.name === effName) : null) : null;
  const isAttack = effectOrSub ? (
    effectType === "Attack" ||
    (effectData && (effectData.type === "Attack" || effectData.check === "Attack" || effectData.check === "Melee Attack" || effectData.check === "Ranged Attack")) ||
    ["Strike", "Blast", "Damage", "Snare", "Stun", "Nauseate", "Suffocate", "Trip", "Paralyze", "Corrosion", "Disintegrate", "Drain", "Dazzle", "Nullify"].includes(effName) ||
    (effectOrSub.modifiers && effectOrSub.modifiers.some(m => m.name === "Attack"))
  ) : (effectType === "Attack");

  if (!isAttack) {
    available = available.filter(m => m.name !== "Accurate" && m.name !== "No Attack Roll");
  }

  if (effectOrSub && (effectOrSub.effectName === "Super-Senses" || (effectOrSub.name && effectOrSub.name.includes("Senses")))) {
      available = available.filter(m => m.name !== "Sense-Dependent" && m.name !== "Selective");
  }

  return available;
}

// --- REAL-TIME COST CALCULATION ENGINE WITH ARRAY/LINKED ROLLUP ---
char.calculateEffectCost = function(effect) {
  const effectData = typeof POWER_EFFECTS_LIST !== 'undefined' ? POWER_EFFECTS_LIST.find(e => e.name === effect.effectName) : null;
  let pBaseCost = (effect.baseCost !== undefined) ? effect.baseCost : (effectData && effectData.baseCost !== undefined ? effectData.baseCost : 1);
  if (effectData && effectData.profiles && effect.name) {
    const profile = effectData.profiles.find(p => p.name === effect.name);
    if (profile && profile.baseCost !== undefined) {
      pBaseCost = profile.baseCost;
    }
  }
  const isComposite = ["Enhanced Senses", "Enhanced Movement", "Enhanced Trait", "Comprehend", "Feature", "Features", "Immunity", "Super-Senses", "Super-Movement", "Senses", "Movement"].includes(effect.effectName);

  if (isComposite) {
    let totalRank = 0;
    let totalSubCost = 0;

    if (effect.subPowers && effect.subPowers.length > 0) {
      effect.subPowers.forEach(sub => {
        let sRank = parseInt(sub.rank) || 1;

        let sBaseCost = sub.baseCost !== undefined ? sub.baseCost : pBaseCost;
        let cType = sub.costType || "per_rank";
        let sPerRankMod = 0;
        let sFlatMod = 0;
        let sRemovableTiers = 0;

        if (sub.modifiers && sub.modifiers.length > 0) {
          sub.modifiers.forEach(m => {
            let mult = (m.category === 'extra' || m.category === 'feat') ? 1 : -1;
            let mCost = m.cost || 1;
            let mRanks = parseInt(m.ranks) || 1;
            
            if (m.isMeta) {
               if (m.costType === 'per_rank') sFlatMod += mult * (mCost * mRanks);
               else sFlatMod += mult * mCost;
            } else if (m.costType === 'per_rank') {
               sPerRankMod += mult * mCost;
            } else if (m.costType === 'flat') {
               sFlatMod += mult * (mCost * mRanks);
            } else if (m.costType === 'removable') {
               sRemovableTiers += mRanks;
            }
          });
        }

        let netSubRate = sBaseCost + sPerRankMod;
        let sCost = 0;
        if (cType === "per_rank") {
            if (netSubRate >= 1 || effect.effectName === "Enhanced Trait") {
              sCost = (netSubRate * sRank) + sFlatMod;
            } else {
              const ranksPerPoint = 2 - netSubRate;
              sCost = Math.ceil(sRank / (ranksPerPoint > 1 ? ranksPerPoint : 2)) + sFlatMod;
            }
        } else {
            sCost = sBaseCost + (sPerRankMod * sRank) + sFlatMod;
        }

        if (sRemovableTiers > 0) {
            let discount = Math.floor(sCost / 5) * sRemovableTiers;
            sCost -= discount;
        }

        if (sCost < 1 && effect.effectName !== "Enhanced Trait" && !sub.isSenseType && sub.baseCost !== 0) sCost = 1;
        
        if (sub.isReduced) {
            sCost = -sCost;
        }
        
        totalSubCost += sCost;
        if (effect.effectName === "Super-Senses" || effect.effectName === "Senses" || effect.effectName === "Enhanced Senses") {
          totalRank += sCost;
        } else {
          totalRank += sRank;
        }
      });
      if (effect.effectName === "Enhanced Trait") {
        totalSubCost = Math.ceil(totalSubCost);
      }
      let subTotalRank = totalRank;
      if (["Super-Senses", "Senses", "Enhanced Senses", "Features", "Feature", "Super-Movement", "Comprehend", "Immunity"].includes(effect.effectName)) {
        totalRank = subTotalRank;
      } else {
        totalRank = Math.max(subTotalRank, parseInt(effect.rank) || 1);
        if (totalRank > subTotalRank) {
          totalSubCost += (totalRank - subTotalRank) * pBaseCost;
        }
      }
    } else {
      totalRank = parseInt(effect.rank) || 1; 
      totalSubCost = totalRank * pBaseCost;
    }
    
    effect.rank = totalRank || 1;

    let pPerRank = 0, pFlat = 0, pRemovable = 0;
    if(effect.modifiers && effect.modifiers.length > 0) {
        effect.modifiers.forEach(m => {
            let mult = (m.category === 'extra' || m.category === 'feat') ? 1 : -1;
            let mC = (m.cost || 1) * (parseInt(m.ranks)||1);
            if(m.costType === 'per_rank') pPerRank += mult * mC;
            else if(m.costType === 'flat') pFlat += mult * mC;
            else if(m.costType === 'removable') pRemovable += parseInt(m.ranks)||1;
        });
    }

    let parentBaseRate = effect.rank > 0 ? (totalSubCost / effect.rank) : 1;
    let netParentRate = parentBaseRate + pPerRank;
    let finalCost = 0;
    if (netParentRate >= 1 || effect.effectName === "Enhanced Trait") {
      finalCost = totalSubCost + (pPerRank * effect.rank) + pFlat;
    } else {
      const ranksPerPoint = 2 - Math.round(netParentRate);
      finalCost = Math.ceil(effect.rank / (ranksPerPoint > 1 ? ranksPerPoint : 2)) + pFlat;
    }
    if(pRemovable > 0) finalCost -= Math.floor(finalCost / 5) * pRemovable;
    return finalCost < 1 ? 1 : finalCost;

  } else {
    let pPerRank = 0, pFlat = 0, pRemovable = 0;
    if(effect.modifiers && effect.modifiers.length > 0) {
        effect.modifiers.forEach(m => {
            let mult = (m.category === 'extra' || m.category === 'feat') ? 1 : -1;
            let mC = (m.cost || 1) * (parseInt(m.ranks)||1);
            if(m.costType === 'per_rank') pPerRank += mult * mC;
            else if(m.costType === 'flat') pFlat += mult * mC;
            else if(m.costType === 'removable') pRemovable += parseInt(m.ranks)||1;
        });
    }
    let netRate = pBaseCost + pPerRank;
    let rank = parseInt(effect.rank) || 1;
    let baseCostTotal = 0;
    if (netRate >= 1) {
      baseCostTotal = netRate * rank;
    } else {
      const ranksPerPoint = 2 - netRate;
      baseCostTotal = Math.ceil(rank / (ranksPerPoint > 1 ? ranksPerPoint : 2));
    }
    let finalCost = baseCostTotal + pFlat;
    if(pRemovable > 0) finalCost -= Math.floor(finalCost / 5) * pRemovable;
    return finalCost < 1 ? 1 : finalCost;
  }
};

char.calculateTotalPowerCost = function(powerContainer) {
  return CharacterModel.prototype.calculateTotalPowerCost.call(char, powerContainer);
};
char.calculatePowerCost = char.calculateTotalPowerCost;

window.invalidateContainerDeclaredCost = function(pIdx) {
  if (typeof char !== 'undefined' && char.activePowers && char.activePowers[pIdx] && char.activePowers[pIdx].declaredCost !== undefined) {
    delete char.activePowers[pIdx].declaredCost;
  }
};

window.getMaxPowerRank = function(effect, subPower) {
  if (subPower) {
     let type = subPower.type || subPower.name || "";
     
     if (effect && effect.effectName === "Enhanced Trait") {
       if (typeof ADVANTAGES_LIST !== 'undefined') {
         let adv = ADVANTAGES_LIST.find(a => a.name === type);
         if (adv) {
           return (adv.hasRanks || adv.ranked) ? (adv.maxRanks || 10) : 1;
         }
       }
       return 20;
     }

     if (subPower.costType === "flat" && !type.includes("Sense Type") && effect.effectName !== "Immunity") return 1;

     if (effect && (effect.effectName === "Super-Movement" || effect.effectName === "Movement" || effect.effectName === "Enhanced Movement")) {
         if (type.includes("Air Walking") || type.includes("Wall-Crawling") || type.includes("Water Walking") || type.includes("Water-Walking")) return 2;
         if (type.includes("Dimensional Movement") || type.includes("Dimensional Travel") || type.includes("Space Travel") || type.includes("Temporal Movement") || type.includes("Trackless") || type.includes("Permeate")) return 3;
         if (type.includes("Sure-Footed")) return 4;
         if (type.includes("Slithering") || type.includes("Slow Fall") || type.includes("Swinging")) return 1;
         if (type.includes("Environmental Adaptation")) return 10;
         return 20;
     }

     if (effect && (effect.effectName === "Comprehend")) {
         if (type.includes("Languages")) return 4;
         if (type.includes("Animals") || type.includes("Plants") || type.includes("Machines") || type.includes("Computers") || type.includes("Spirits")) return 2;
         if (type.includes("Objects")) return 1;
         return 20;
     }

     if (effect && (effect.effectName === "Features" || effect.effectName === "Feature")) {
         if (type.includes("Custom")) return 20;
         return 1;
     }

     if (effect && (effect.effectName === "Super-Senses" || effect.effectName === "Senses" || effect.effectName === "Enhanced Senses")) {
         if (type.includes("Microscopic Vision")) return 4;
         if (type.includes("Sense Type")) return 1;
         if (type.includes("Custom Sense")) return 20;
         if (subPower.costType === "flat") return 1;
         return 20;
     }
     
     if (effect.effectName === "Immunity") {
         if (type.includes("Custom Immunity")) return 80;
         const rMatch = type.match(/\[(\d+)\s*ranks?\]/i) || (subPower.name && subPower.name.match(/\[(\d+)\s*ranks?\]/i));
         if (rMatch) return parseInt(rMatch[1]);
         return 80;
     }

     return 20;
  }

  if (!effect) return 20;

  let nameToCheck = effect.effectName;
  if (nameToCheck === "Comprehend") {
     let max = 4;
     if (effect.subPowers && effect.subPowers.length > 0) {
         let highest = 0;
         effect.subPowers.forEach(sub => {
             let t = sub.type || sub.name || "";
             if (t.includes("Languages")) highest = Math.max(highest, 4);
             else highest = Math.max(highest, 2);
         });
         return highest > 0 ? highest : 4;
     }
     return 4;
  }

  let subTotalRank = 0;
  if (effect.subPowers && effect.subPowers.length > 0) {
      effect.subPowers.forEach(sub => {
          subTotalRank += (parseInt(sub.rank) || 1);
      });
  }

  if (nameToCheck === "Immunity") {
      return Math.max(subTotalRank, 80);
  }

  if (effect.subPowers && effect.subPowers.length > 0) {
     let highest = 0;
     let hasUncapped = false;
     effect.subPowers.forEach(sub => {
         let cap = window.getMaxPowerRank(effect, sub);
         if (cap >= 20) hasUncapped = true;
         if (cap > highest) highest = cap;
     });
     if (hasUncapped) return Math.max(subTotalRank, 20);
     return Math.max(subTotalRank, highest > 0 ? highest : 20);
  }

  return 20;
};

function renderOptgroupChoices(choices, currentVal) {
    let html = '';
    let inGroup = false;
    choices.forEach(c => {
        if (c.startsWith("**") || c.startsWith("---")) {
            if (inGroup) html += '</optgroup>';
            html += `<optgroup label="${c.replace(/[*\-]/g, '').trim()}">`;
            inGroup = true;
        } else {
            html += `<option value="${c}" ${currentVal === c ? 'selected' : ''} style="color: var(--text-main); font-weight: normal;">${c}</option>`;
        }
    });
    if (inGroup) html += '</optgroup>';
    return html;
}

window.updateSubPowerDetails = function(pIdx, eIdx, subIdx, val) {
    if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx] && char.activePowers[pIdx].effects[eIdx].subPowers[subIdx]) {
        char.activePowers[pIdx].effects[eIdx].subPowers[subIdx].details = val;
    }
};

window.stepVal = function(elemId, delta, minVal, maxVal) {
  const input = document.getElementById(elemId);
  if (!input || input.disabled) return;
  let val = (parseInt(input.value) || 0) + delta;
  if (minVal !== undefined && val < minVal) val = minVal;
  if (maxVal !== undefined && val > maxVal) val = maxVal;
  input.value = val;
  input.dispatchEvent(new Event("input", { bubbles: true }));
};

window.isSessionRollAllowed = function() {
  const isLocalGM = (typeof CampaignManager !== 'undefined') ? CampaignManager.isDesignatedGM('local_player') : false;
  if (isLocalGM) return true; // GM can always roll

  const s = (typeof CampaignManager !== 'undefined') 
    ? CampaignManager.getSessionState() 
    : (window.__lastSyncedSessionState || null);

  if (s && s.status === 'paused') {
    if (typeof showToast === 'function') {
      showToast("⚠️ Game session is paused by the GM. Player rolls are currently on hold.", "warning");
    }
    return false;
  }
  return true;
};

window.performD20RollWithHP = function(baseMod, targetHero = null, rollType = 'general') {
  const activeChar = targetHero || (typeof char !== 'undefined' ? char : null);
  let hpBonus = 0;
  let isHPRerolled = false;

  if (activeChar) {
    if (activeChar._pendingHPOption) {
      const pending = activeChar._pendingHPOption;
      const req = (pending.requiredType || 'any').toLowerCase();
      const current = (rollType || 'general').toLowerCase();

      let isMatch = false;
      if (req === 'any' || req === current || current === 'check' || current === 'general') {
        isMatch = true;
      } else if (req === 'power' && (current === 'power' || current === 'power_attack')) {
        isMatch = true;
      } else if (req === 'attack' && (current === 'attack' || current === 'power_attack' || current === 'power')) {
        isMatch = true;
      } else if (req === 'save' && (current === 'save' || current === 'toughness')) {
        isMatch = true;
      } else if (req === 'ability' && current === 'ability') {
        isMatch = true;
      } else if (req === 'initiative' && current === 'initiative') {
        isMatch = true;
      } else if (req === 'skill' && current === 'skill') {
        isMatch = true;
      }

      if (isMatch) {
        if (!pending.spent) {
          const targetId = pending.targetCharId || (activeChar.name ? activeChar.name : 'local_hero');
          if (typeof window.sessionSpendHeroPoint === 'function') {
            window.sessionSpendHeroPoint(targetId, `Hero Point spent: ${pending.label || 'Improve Roll'}`);
          }
        }
        if (pending.isReroll) {
          isHPRerolled = true;
        } else {
          hpBonus = pending.bonus || 5;
        }
        activeChar._pendingHPOption = null;
        activeChar._pendingHPRollBonus = 0;
        if (typeof window.updateHeroPointsUseButtonState === 'function') {
          window.updateHeroPointsUseButtonState();
        }
      }
      // Note: On mismatch, do NOT clear _pendingHPOption so it remains available for the designated roll!
    } else {
      if (activeChar._pendingHPRollBonus > 0) {
        hpBonus = activeChar._pendingHPRollBonus;
        activeChar._pendingHPRollBonus = 0;
        if (typeof window.updateHeroPointsUseButtonState === 'function') {
          window.updateHeroPointsUseButtonState();
        }
      }
      if (activeChar._pendingHPReroll) {
        isHPRerolled = true;
        activeChar._pendingHPReroll = false;
        if (typeof window.updateHeroPointsUseButtonState === 'function') {
          window.updateHeroPointsUseButtonState();
        }
      }
    }
  }

  const rawD20 = Math.floor(Math.random() * 20) + 1;
  let d20 = rawD20;
  if (isHPRerolled && rawD20 <= 10) {
    d20 = rawD20 + 10;
  }

  const mod = (Number(baseMod) || 0) + hpBonus;
  const total = d20 + mod;
  const isNat20 = (!isHPRerolled && rawD20 === 20);
  const isNat1 = (!isHPRerolled && rawD20 === 1);

  let hpAnnouncement = '';
  if (hpBonus > 0) {
    hpAnnouncement = `+${hpBonus} (Improve Roll)`;
  } else if (isHPRerolled) {
    hpAnnouncement = `HP Reroll (min 11–20 floor)`;
  }

  return {
    rawD20,
    d20,
    baseMod: Number(baseMod) || 0,
    hpBonus,
    isHPRerolled,
    hpAnnouncement,
    mod,
    total,
    isNat20,
    isNat1
  };
};

window.showDiceRollModal = function(config) {
  if (typeof window.isSessionRollAllowed === 'function' && !window.isSessionRollAllowed()) return;
  const modal = document.getElementById("diceRollModal");
  const titleEl = document.getElementById("diceRollModalTitle");
  const bodyEl = document.getElementById("diceRollModalBody");
  if (!modal || !titleEl || !bodyEl) return;

  // Track the most recent roll so "Use Hero Point -> Reroll" can immediately act on it
  window.lastRollConfig = config;
  if (typeof window.updateSidebarLastRoll === 'function') {
    window.updateSidebarLastRoll(config);
  }

  titleEl.textContent = config.title || "🎲 Check Result";

  let resultColor = "var(--accent-primary)";
  let badgeHtml = "";
  if (config.isNat20) {
    resultColor = "#10b981";
    badgeHtml = `<span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #10b981; border: 1px solid #10b981; font-weight: bold; padding: 4px 10px; font-size: var(--font-size-secondary);">🎉 Natural 20! Critical Success!</span>`;
  } else if (config.isNat1) {
    resultColor = "#ef4444";
    badgeHtml = `<span class="badge" style="background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid #ef4444; font-weight: bold; padding: 4px 10px; font-size: var(--font-size-secondary);">⚠️ Natural 1! Automatic Failure!</span>`;
  } else if (config.isHPRerolled) {
    resultColor = "#b45309";
    badgeHtml = `<span class="badge" style="background: rgba(180, 83, 9, 0.15); color: #b45309; border: 1px solid #b45309; font-weight: bold; padding: 4px 10px; font-size: var(--font-size-secondary);">✨ HP Reroll (Min 11–20)</span>`;
  } else if (config.hpBonus > 0) {
    resultColor = "#b45309";
    badgeHtml = `<span class="badge" style="background: rgba(180, 83, 9, 0.15); color: #b45309; border: 1px solid #b45309; font-weight: bold; padding: 4px 10px; font-size: var(--font-size-secondary);">✨ +${config.hpBonus} HP Bonus Applied</span>`;
  }

  let currentHP = 0;
  if (typeof char !== 'undefined' && char) {
    if (typeof char.heroPoints === 'number' && !isNaN(char.heroPoints)) {
      currentHP = char.heroPoints;
    } else {
      const hpEl = document.getElementById("heroPointsInput");
      const defaultHP = 1 + (char.effectiveFeats?.["Luck"] || char.feats?.["Luck"] || 0);
      const rawVal = hpEl ? parseInt(hpEl.value) : NaN;
      currentHP = !isNaN(rawVal) ? Math.max(0, rawVal) : defaultHP;
      char.heroPoints = currentHP;
    }
  }
  const canHPReroll = currentHP > 0 && !config.isNat1 && !config.isNat20 && !config.isHPRerolled;

  const baseModVal = (config.baseMod !== undefined) ? config.baseMod : (config.mod - (config.hpBonus || 0));
  const mathFormula = (config.hpBonus > 0)
    ? `1d20 (${config.d20}) ${baseModVal >= 0 ? '+ ' + baseModVal : '- ' + Math.abs(baseModVal)} [Base] + ${config.hpBonus} [✨ HP] = <strong>${config.total}</strong>`
    : (config.isHPRerolled && config.rawD20 && config.rawD20 <= 10
       ? `1d20 (${config.rawD20} + 10 floor = ${config.d20}) ${config.mod >= 0 ? '+ ' + config.mod : '- ' + Math.abs(config.mod)} [✨ HP Reroll] = <strong>${config.total}</strong>`
       : (config.isHPRerolled
          ? `1d20 (${config.d20}) ${config.mod >= 0 ? '+ ' + config.mod : '- ' + Math.abs(config.mod)} [✨ HP Reroll] = <strong>${config.total}</strong>`
          : `1d20 (${config.d20}) ${config.mod >= 0 ? '+ ' + config.mod : '- ' + Math.abs(config.mod)} = <strong>${config.total}</strong>`));

  bodyEl.innerHTML = `
    <div style="text-align: center; padding: 8px 0;">
      <div style="font-size: calc(var(--font-size-labels) * 2.2); font-weight: bold; color: ${resultColor}; line-height: 1.2;">
        ${config.total}
      </div>
      <div style="font-size: var(--font-size-secondary); color: var(--text-muted); margin-top: 4px;">
        ${mathFormula}
      </div>
      ${badgeHtml ? `<div style="margin-top: 8px;">${badgeHtml}</div>` : ''}
    </div>

    ${config.detailsHtml ? `
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 10px 12px; font-size: var(--font-size-secondary);">
        ${config.detailsHtml}
      </div>
    ` : ''}

    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px; padding-top: 8px; border-top: 1px solid var(--border-color); flex-wrap: wrap; gap: 6px;">
      <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
        ${canHPReroll ? `
          <button type="button" class="btn btn-primary" id="btnHPReroll" style="padding: 6px 14px; font-weight: bold; font-size: var(--font-size-controls); display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, #f59e0b, #d97706); border-color: #d97706; color: #fff;">
            ✨ Reroll (1 HP)
          </button>
        ` : ''}
        ${config.rerollCode ? `
          <button type="button" class="btn btn-secondary" onclick="${config.rerollCode}" style="padding: 6px 14px; font-size: var(--font-size-controls); display: inline-flex; align-items: center; gap: 6px;">
            🎲 Re-roll Check
          </button>
        ` : ''}
      </div>
      <button type="button" class="btn btn-secondary" onclick="document.getElementById('diceRollModal').classList.remove('active')" style="padding: 6px 16px; font-size: var(--font-size-controls);">
        Close
      </button>
    </div>
  `;

  // Attach Hero Point Reroll click handler
  const btnHPReroll = document.getElementById("btnHPReroll");
  if (btnHPReroll) {
    btnHPReroll.onclick = function() {
      // 1. Spend 1 Hero Point explicitly for Reroll (do not queue +5 Improve Roll bonus)
      if (typeof window.sessionSpendHeroPoint === 'function') {
        window.sessionSpendHeroPoint('local_hero', 'Hero Point spent for Reroll');
      } else if (typeof char !== 'undefined' && char) {
        char.heroPoints = Math.max(0, (char.heroPoints || 0) - 1);
        const hpInput = document.getElementById("heroPointsInput");
        if (hpInput) hpInput.value = char.heroPoints;
        if (typeof window.updateHeroPointsUseButtonState === 'function') window.updateHeroPointsUseButtonState();
      }

      // 2. M&M 2E floor rule (p. 120): If new roll is 1-10, add 10 (giving 11-20). Take better of two results.
      const rawD20 = Math.floor(Math.random() * 20) + 1;
      const wasFloored = rawD20 <= 10;
      const flooredD20 = wasFloored ? rawD20 + 10 : rawD20;
      const baseMod = (config.baseMod !== undefined) ? config.baseMod : ((config.mod || 0) - (config.hpBonus || 0));
      const priorHpBonus = config.hpBonus || 0;
      const newTotal = flooredD20 + baseMod + priorHpBonus;
      const originalTotal = config.total;
      const finalTotal = Math.max(originalTotal, newTotal);
      const keptOriginal = originalTotal > newTotal;

      config.isHPRerolled = true;
      config.rawD20 = rawD20;
      config.d20 = flooredD20;
      config.baseMod = baseMod;
      config.mod = baseMod + priorHpBonus;
      config.total = finalTotal;
      config.isNat1 = false;
      config.isNat20 = (!wasFloored && rawD20 === 20);

      const rerollDesc = wasFloored 
        ? `Rolled ${rawD20} (+10 floor bonus = ${flooredD20})` 
        : `Rolled ${flooredD20}`;
      
      const outcomeDesc = keptOriginal
        ? `${rerollDesc} -> ${newTotal} (Original ${originalTotal} kept)`
        : `${rerollDesc} -> ${newTotal} (Kept)`;

      config.rerollInfo = outcomeDesc;
      config.hpAnnouncement = `HP Reroll: ${outcomeDesc}`;

      const cleanBaseTitle = (config.rollType || config.title || 'Check')
        .replace(/\s*\(\s*✨?\s*\+?\d*\s*HP\s*\)/gi, '')
        .replace(/\s*\(\s*✨?\s*HP\s*Reroll\s*\)/gi, '')
        .replace(/^🎲\s*/, '')
        .trim();
      const rerollTitle = `🎲 ${cleanBaseTitle} (✨ HP Reroll)`;
      config.rollType = rerollTitle;
      config.title = rerollTitle;

      if (!config.detailsHtml) config.detailsHtml = "";
      config.detailsHtml += `
        <div style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed var(--border-color); color: #b45309; font-size: var(--font-size-secondary);">
          <strong>✨ HP Reroll:</strong> ${outcomeDesc}
        </div>
      `;

      // Re-invoke showDiceRollModal to render the updated result and broadcast to session feed
      window.showDiceRollModal(config);

      if (typeof showToast === 'function') {
        showToast(`✨ HP Reroll: Kept result is ${finalTotal}!`, "info");
      }
    };
  }

  modal.classList.add("active");

  // Clean title: remove any previously stacked (✨ ... HP) or (✨ HP Reroll) tags
  const cleanTitle = (config.title || "Roll")
    .replace(/^🎲\s*/, '')
    .replace(/\s*\(\s*✨?\s*\+?\d*\s*HP\s*\)/gi, '')
    .replace(/\s*\(\s*✨?\s*HP\s*Reroll\s*\)/gi, '')
    .trim();

  // Broadcast roll event to Session Log & Multiplayer network
  const hpSuffix = (config.hpBonus > 0 ? ` (✨ +${config.hpBonus} HP)` : '') + (config.isHPRerolled ? ' (✨ HP Reroll)' : '');
  const rollTitle = cleanTitle + hpSuffix;
  const breakdownText = (config.hpBonus > 0)
    ? `1d20 (${config.d20}) ${baseModVal >= 0 ? '+' + baseModVal : baseModVal} [Base] + ${config.hpBonus} [✨ HP] = ${config.total}`
    : (config.isHPRerolled && config.rawD20 && config.rawD20 <= 10
       ? `1d20 (${config.rawD20} + 10 floor = ${config.d20}) ${config.mod >= 0 ? '+' + config.mod : config.mod} = ${config.total}${config.rerollInfo && config.rerollInfo.includes('Original') ? ' (Kept ' + config.total + ')' : ''}`
       : `1d20 (${config.d20}) ${config.mod >= 0 ? '+' + config.mod : config.mod} = ${config.total}`);

  let hpAnnouncementText = (config.hpAnnouncement || '').replace(/\bHero Point\b/g, 'HP');
  if (!hpAnnouncementText) {
    if (config.hpBonus > 0) {
      hpAnnouncementText = `HP: +${config.hpBonus} (Improve Roll)`;
    } else if (config.isHPRerolled) {
      if (config.rerollInfo) {
        hpAnnouncementText = `HP Reroll: ${config.rerollInfo.replace(/\bHero Point\b/g, 'HP')}`;
      } else {
        hpAnnouncementText = `HP Reroll (min 11–20 floor)`;
      }
    }
  }

  const rollEntry = {
    type: 'ROLL',
    characterName: char?.name || "Hero",
    playerName: char?.playerName || (typeof localStorage !== 'undefined' ? localStorage.getItem("mm2e_player_name") : "") || "Player",
    rollType: rollTitle,
    total: config.total,
    breakdown: breakdownText,
    isNat20: !!config.isNat20,
    isNat1: !!config.isNat1,
    hpBonus: config.hpBonus || 0,
    isHPRerolled: !!config.isHPRerolled,
    hpAnnouncement: hpAnnouncementText,
    rerollInfo: config.rerollInfo || "",
    result: config.resultOutcome || "",
    isLocal: true,
    timestamp: new Date().toISOString()
  };
  if (typeof SessionNetwork !== 'undefined' && typeof SessionNetwork.sendRoll === 'function') {
    SessionNetwork.sendRoll(rollEntry);
  } else if (typeof CampaignManager !== 'undefined' && typeof CampaignManager.addLogEntry === 'function') {
    CampaignManager.addLogEntry(rollEntry);
  }
  if (typeof window.updateSidebarLastRoll === 'function') {
    window.updateSidebarLastRoll(rollEntry);
  }
};

window.rollAbilityCheck = function(abilId) {
  const abilNames = {
    STR: "Strength",
    CON: "Constitution",
    DEX: "Dexterity",
    INT: "Intelligence",
    WIS: "Wisdom",
    CHA: "Charisma"
  };
  const name = abilNames[abilId] || abilId;
  const val = char.getAbilityRank(abilId);
  if (val === null) {
    showToast(`${name} is absent / disabled. Check cannot be made.`, "error");
    return;
  }
  const roll = window.performD20RollWithHP(val, char, 'ability');

  window.showDiceRollModal({
    title: `🎲 ${name} Check`,
    d20: roll.d20,
    rawD20: roll.rawD20,
    baseMod: roll.baseMod,
    hpBonus: roll.hpBonus,
    isHPRerolled: roll.isHPRerolled,
    mod: roll.mod,
    total: roll.total,
    isNat20: roll.isNat20,
    isNat1: roll.isNat1,
    detailsHtml: `
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <span style="color: var(--text-muted); font-weight: 600;">Ability:</span>
        <strong>${name} (${abilId})</strong>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--text-muted); font-weight: 600;">Effective Modifier:</span>
        <span class="badge" style="font-size: var(--font-size-tags);">${roll.mod >= 0 ? '+' : ''}${roll.mod}</span>
      </div>
      ${roll.hpBonus > 0 ? `
        <div style="display: flex; justify-content: space-between; margin-top: 4px; color: #b45309; font-weight: bold;">
          <span>✨ Hero Point Bonus:</span>
          <span>+${roll.hpBonus}</span>
        </div>
      ` : ''}
    `,
    rerollCode: `window.rollAbilityCheck('${abilId}')`
  });
};

window.rollEffectCheck = function(pIdx, eIdx) {
  const container = char.activePowers?.[pIdx];
  const effect = container?.effects?.[eIdx];
  if (!effect) return;

  const effName = (effect.name && effect.name !== "New Effect") ? effect.name : (effect.effectName || "Effect");
  const rank = parseInt(effect.rank !== undefined ? effect.rank : (effect.ranks || 1)) || 1;
  const effectiveTraits = window.getEffectiveEffectTraits ? window.getEffectiveEffectTraits(effect) : { range: "Close" };
  const range = (effectiveTraits && effectiveTraits.range) || "Close";

  // Calculate Boost bonus if applicable
  const boostSubsidiesData = (typeof char.getBoostSubsidies === 'function') ? char.getBoostSubsidies() : { subsidies: {}, rankBonuses: {} };
  const isAlteringRanks = !!((char && char.houseRules && char.houseRules.boostAltersRanks) || (typeof localStorage !== 'undefined' && localStorage.getItem("mm2e_houserule_boost_alters_ranks") === "true"));
  const effectCustomName = (effect.name && effect.name !== 'New Effect' && effect.name !== effect.effectName) ? effect.name : '';
  const possibleTargets = [effect.id, effect.name, effect.effectName, effectCustomName, container?.name].filter(Boolean);
  let boostRankBonus = 0;
  let boostPPBonus = 0;
  if (isAlteringRanks) {
    const rb = boostSubsidiesData.rankBonuses || {};
    for (const tgt of possibleTargets) {
      if (rb[tgt]) { boostRankBonus = rb[tgt]; break; }
    }
  } else {
    const sb = boostSubsidiesData.subsidies || {};
    for (const tgt of possibleTargets) {
      if (sb[tgt]) { boostPPBonus = sb[tgt]; break; }
    }
  }
  const rawCost = char.calculateEffectCost ? char.calculateEffectCost(effect) : rank;
  const perRankCost = (rawCost > 0 && rank > 0) ? Math.max(1, Math.round(rawCost / rank)) : 1;
  const effRank = isAlteringRanks ? (rank + boostRankBonus) : (rank + Math.floor(boostPPBonus / perRankCost));
  const boostDelta = effRank - rank;

  const saveDcDisplay = window.getEffectSaveDc ? window.getEffectSaveDc(effect, effRank > rank ? effRank : null) : "None";
  const hasNoAttack = Array.isArray(effect.modifiers) && effect.modifiers.some(m => m.name === "No Attack Roll" || m.name?.startsWith("Area") || m.name?.startsWith("Perception"));

  let checkType = "Attack Roll";
  let atkBonus = 0;
  let bonusDesc = "";

  if (hasNoAttack || range === "Perception" || range === "Personal") {
    checkType = "Power Check";
    atkBonus = effRank;
    bonusDesc = boostDelta > 0 ? `Power Rank + Boost (+${effRank})` : `Power Rank (+${rank})`;
  } else if (range === "Ranged") {
    checkType = "Ranged Attack Roll";
    atkBonus = char.derivedStats?.rangedAttack || 0;
    bonusDesc = `Ranged Attack (+${atkBonus})`;
  } else {
    checkType = "Melee Attack Roll";
    atkBonus = char.derivedStats?.meleeAttack || 0;
    bonusDesc = `Melee Attack (+${atkBonus})`;
  }

  const roll = window.performD20RollWithHP(atkBonus, char, (checkType === "Power Check" ? "power" : "power_attack"));

  let details = `
    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span style="color: var(--text-muted); font-weight: 600;">Power / Effect:</span>
      <strong>${effName} (${boostDelta > 0 ? `Rank ${rank} + ${boostDelta} Boost = Eff Rank ${effRank}` : `Rank ${rank}`})</strong>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span style="color: var(--text-muted); font-weight: 600;">Check Type:</span>
      <span>${checkType} (${bonusDesc})</span>
    </div>
    ${roll.hpBonus > 0 ? `
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px; color: #b45309; font-weight: bold;">
        <span>✨ Hero Point Bonus:</span>
        <span>+${roll.hpBonus}</span>
      </div>
    ` : ''}
  `;

  if (saveDcDisplay && saveDcDisplay !== "None" && saveDcDisplay !== "—") {
    details += `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px; padding-top: 6px; border-top: 1px dashed var(--border-color);">
        <span style="color: var(--text-muted); font-weight: 600;">Target Saving Throw:</span>
        <span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.35); font-weight: bold; font-size: var(--font-size-tags);">🎯 ${saveDcDisplay}</span>
      </div>
    `;
  }

  if (roll.isNat20 && checkType.includes("Attack")) {
    details += `
      <div style="margin-top: 6px; color: #10b981; font-weight: 600; font-size: var(--font-size-fine-print);">
        ✦ Critical Hit: +5 to the save DC or adds an additional degree of effect!
      </div>
    `;
  }

  window.showDiceRollModal({
    title: `🎲 ${effName} ${checkType}`,
    d20: roll.d20,
    rawD20: roll.rawD20,
    baseMod: roll.baseMod,
    hpBonus: roll.hpBonus,
    isHPRerolled: roll.isHPRerolled,
    mod: roll.mod,
    total: roll.total,
    isNat20: roll.isNat20,
    isNat1: roll.isNat1,
    detailsHtml: details,
    rerollCode: `window.rollEffectCheck(${pIdx}, ${eIdx})`
  });
};

window.rollSaveCheck = function(saveKey) {
  const key = saveKey.toLowerCase();
  let saveVal = (char.derivedStats && typeof char.derivedStats[key] === 'number') ? char.derivedStats[key] : null;

  if (char.isMecha && key === "fortitude") {
    showToast("Construct / Mecha is Immune to Fortitude effects.", "info");
    return;
  }
  if (char.isMecha && !char.hasAI && key === "will") {
    showToast("Mecha without AI is Immune to Will effects.", "info");
    return;
  }
  if (saveVal === null || saveVal === undefined) {
    showToast(`${saveKey} saving throw is absent or unavailable.`, "error");
    return;
  }

  const roll = window.performD20RollWithHP(saveVal, char, 'save');

  let baseAbil = "";
  if (key === "reflex") baseAbil = "DEX";
  else if (key === "fortitude") baseAbil = "CON";
  else if (key === "will") baseAbil = "WIS";
  else if (key === "toughness") baseAbil = "CON";

  const abilRank = char.getAbilityRank ? char.getAbilityRank(baseAbil) : (char.abilities?.[baseAbil] || 0);
  const bought = (char.purchasedResistances && char.purchasedResistances[saveKey]) || 0;
  const enhSave = (char.enhancedTraits?.saves?.[saveKey]) || 0;

  let details = `
    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span style="color: var(--text-muted); font-weight: 600;">Saving Throw:</span>
      <strong>${saveKey} Save</strong>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span style="color: var(--text-muted); font-weight: 600;">Base Ability (${baseAbil}):</span>
      <span>${abilRank !== null ? (abilRank >= 0 ? '+' : '') + abilRank : 'None'}</span>
    </div>
    ${bought > 0 ? `
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <span style="color: var(--text-muted); font-weight: 600;">Bought Ranks:</span>
        <span>+${bought}</span>
      </div>
    ` : ''}
    ${enhSave > 0 ? `
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <span style="color: var(--text-muted); font-weight: 600;">Enhanced Trait:</span>
        <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">+${enhSave}</span>
      </div>
    ` : ''}
    <div style="display: flex; justify-content: space-between;">
      <span style="color: var(--text-muted); font-weight: 600;">Total Save Bonus:</span>
      <span class="badge" style="font-size: var(--font-size-tags);">${roll.mod >= 0 ? '+' : ''}${roll.mod}</span>
    </div>
    ${roll.hpBonus > 0 ? `
      <div style="display: flex; justify-content: space-between; margin-top: 4px; color: #b45309; font-weight: bold;">
        <span>✨ Hero Point Bonus:</span>
        <span>+${roll.hpBonus}</span>
      </div>
    ` : ''}
  `;

  window.showDiceRollModal({
    title: `🎲 ${saveKey} Save`,
    d20: roll.d20,
    rawD20: roll.rawD20,
    baseMod: roll.baseMod,
    hpBonus: roll.hpBonus,
    isHPRerolled: roll.isHPRerolled,
    mod: roll.mod,
    total: roll.total,
    isNat20: roll.isNat20,
    isNat1: roll.isNat1,
    detailsHtml: details,
    rerollCode: `window.rollSaveCheck('${saveKey}')`
  });
};

window.rollInitiativeCheck = function() {
  if (typeof window.isSessionRollAllowed === 'function' && !window.isSessionRollAllowed()) return;
  const dexMod = (typeof char.getAbilityRank === 'function') 
    ? (char.getAbilityRank("DEX") !== null ? char.getAbilityRank("DEX") : -5) 
    : (char.abilities?.DEX || 0);
  const effFeats = char.effectiveFeats || char.feats || {};
  const initFeat = effFeats["Improved Initiative"] || 0;
  const totalMod = (char.derivedStats && typeof char.derivedStats.initiative === 'number')
    ? char.derivedStats.initiative
    : (dexMod + initFeat * 4);

  const roll = window.performD20RollWithHP(totalMod, char, 'initiative');

  if (char.trackerState) {
    char.trackerState.initiativeRoll = roll.total;
    const numInitResult = document.getElementById("numInitiativeResult");
    if (numInitResult) numInitResult.value = roll.total;
    const lblInitBreakdown = document.getElementById("lblInitiativeRollBreakdown");
    if (lblInitBreakdown) {
      const featStr = initFeat > 0 ? ` + Imp. Init (${initFeat * 4})` : "";
      const hpStr = roll.hpBonus > 0 ? ` + HP (${roll.hpBonus})` : (roll.isHPRerolled ? ` [✨ HP Reroll]` : '');
      lblInitBreakdown.textContent = `Rolled 1d20 (${roll.d20}) + DEX (${dexMod >= 0 ? "+" : ""}${dexMod})${featStr}${hpStr} = ${roll.total}`;
    }
    if (typeof syncPartyRosterUI === 'function') syncPartyRosterUI();
  }

  const details = `
    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span style="color: var(--text-muted); font-weight: 600;">Initiative Check:</span>
      <strong>1d20 + ${roll.mod}</strong>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span style="color: var(--text-muted); font-weight: 600;">DEX Modifier:</span>
      <span>${dexMod >= 0 ? '+' : ''}${dexMod}</span>
    </div>
    ${initFeat > 0 ? `
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <span style="color: var(--text-muted); font-weight: 600;">Improved Initiative (${initFeat}):</span>
        <span>+${initFeat * 4}</span>
      </div>
    ` : ''}
    ${roll.hpBonus > 0 ? `
      <div style="display: flex; justify-content: space-between; margin-top: 4px; color: #b45309; font-weight: bold;">
        <span>✨ Hero Point Bonus:</span>
        <span>+${roll.hpBonus}</span>
      </div>
    ` : ''}
    <div style="display: flex; justify-content: space-between;">
      <span style="color: var(--text-muted); font-weight: 600;">Total Modifier:</span>
      <span class="badge" style="font-size: var(--font-size-tags);">${roll.mod >= 0 ? '+' : ''}${roll.mod}</span>
    </div>
  `;

  window.showDiceRollModal({
    title: `🎲 Initiative Check`,
    d20: roll.d20,
    rawD20: roll.rawD20,
    baseMod: roll.baseMod,
    hpBonus: roll.hpBonus,
    isHPRerolled: roll.isHPRerolled,
    mod: roll.mod,
    total: roll.total,
    isNat20: roll.isNat20,
    isNat1: roll.isNat1,
    detailsHtml: details,
    rerollCode: `window.rollInitiativeCheck()`
  });
};

window.rollAttackCheck = function(attackMode) {
  const isRanged = attackMode === "Ranged Attack";
  const isUnarmed = attackMode === "Unarmed";
  const atkBonus = isRanged 
    ? ((char.derivedStats && typeof char.derivedStats.rangedAttack === 'number') ? char.derivedStats.rangedAttack : (char.combat?.baseAttack || 0))
    : ((char.derivedStats && typeof char.derivedStats.meleeAttack === 'number') ? char.derivedStats.meleeAttack : (char.combat?.baseAttack || 0));

  const roll = window.performD20RollWithHP(atkBonus, char, 'attack');

  let details = `
    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span style="color: var(--text-muted); font-weight: 600;">Attack Mode:</span>
      <strong>${attackMode}</strong>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span style="color: var(--text-muted); font-weight: 600;">Attack Bonus:</span>
      <span>${atkBonus >= 0 ? '+' : ''}${atkBonus}</span>
    </div>
    ${roll.hpBonus > 0 ? `
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px; color: #b45309; font-weight: bold;">
        <span>✨ Hero Point Bonus:</span>
        <span>+${roll.hpBonus}</span>
      </div>
    ` : ''}
  `;

  if (isUnarmed) {
    const strRank = char.getAbilityRank ? char.getAbilityRank("STR") : (char.abilities?.STR || 0);
    const unarmedDmg = strRank === null ? 0 : strRank;
    const unarmedDC = 15 + unarmedDmg;
    details += `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px; padding-top: 6px; border-top: 1px dashed var(--border-color);">
        <span style="color: var(--text-muted); font-weight: 600;">Target Save DC:</span>
        <span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.35); font-weight: bold; font-size: var(--font-size-tags);">🎯 Toughness DC ${unarmedDC} (Dmg Rank ${unarmedDmg})</span>
      </div>
    `;
  }

  if (roll.isNat20) {
    details += `
      <div style="margin-top: 6px; color: #10b981; font-weight: 600; font-size: var(--font-size-fine-print);">
        ✦ Critical Hit: +5 to the save DC or adds an additional degree of effect!
      </div>
    `;
  }

  window.showDiceRollModal({
    title: `🎲 ${attackMode} Roll`,
    d20: roll.d20,
    rawD20: roll.rawD20,
    baseMod: roll.baseMod,
    hpBonus: roll.hpBonus,
    isHPRerolled: roll.isHPRerolled,
    mod: roll.mod,
    total: roll.total,
    isNat20: roll.isNat20,
    isNat1: roll.isNat1,
    detailsHtml: details,
    rerollCode: `window.rollAttackCheck('${attackMode}')`
  });
};

window.rollSkillCheck = function(skillName) {
  const meta = (typeof getSkillMetadata === 'function') 
    ? getSkillMetadata(skillName) 
    : { ability: "None", untrained: true };
  const val = (char.getAbilityRank && meta.ability !== "None") ? char.getAbilityRank(meta.ability) : 0;
  let base = 0;
  if (meta.ability === "None") {
    base = 0;
  } else {
    base = val === null ? -5 : val;
  }
  const bought = (char.skills && char.skills[skillName]) || 0;
  const enhancedSkill = (char.enhancedTraits?.skills?.[skillName]) || 0;
  const totalSkillBonus = base + bought + enhancedSkill;
  const isTrainedOnly = !meta.untrained && (bought + enhancedSkill) === 0;

  const roll = window.performD20RollWithHP(totalSkillBonus, char, 'skill');

  let details = `
    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span style="color: var(--text-muted); font-weight: 600;">Skill:</span>
      <strong>${skillName} (${meta.ability})</strong>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span style="color: var(--text-muted); font-weight: 600;">Base Ability (${meta.ability}):</span>
      <span>${base >= 0 ? '+' : ''}${base}</span>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span style="color: var(--text-muted); font-weight: 600;">Bought Ranks:</span>
      <span>${bought >= 0 ? '+' : ''}${bought}</span>
    </div>
    ${enhancedSkill > 0 ? `
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <span style="color: var(--text-muted); font-weight: 600;">Enhanced Trait:</span>
        <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">+${enhancedSkill}</span>
      </div>
    ` : ''}
    ${roll.hpBonus > 0 ? `
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px; color: #b45309; font-weight: bold;">
        <span>✨ Hero Point Bonus:</span>
        <span>+${roll.hpBonus}</span>
      </div>
    ` : ''}
    <div style="display: flex; justify-content: space-between;">
      <span style="color: var(--text-muted); font-weight: 600;">Total Skill Bonus:</span>
      <span class="badge" style="font-size: var(--font-size-tags);">${roll.mod >= 0 ? '+' : ''}${roll.mod}</span>
    </div>
  `;

  if (isTrainedOnly) {
    details += `
      <div style="margin-top: 6px; padding-back: 4px 8px; border-radius: 4px; background: rgba(180, 83, 9, 0.12); color: #b45309; font-size: var(--font-size-fine-print); font-weight: 600;">
        ⚠️ Trained Only: Character has 0 ranks in this skill. Check requires GM permission.
      </div>
    `;
  }

  window.showDiceRollModal({
    title: `🎲 ${skillName} Check`,
    d20: roll.d20,
    rawD20: roll.rawD20,
    baseMod: roll.baseMod,
    hpBonus: roll.hpBonus,
    isHPRerolled: roll.isHPRerolled,
    mod: roll.mod,
    total: roll.total,
    isNat20: roll.isNat20,
    isNat1: roll.isNat1,
    detailsHtml: details,
    rerollCode: `window.rollSkillCheck('${skillName.replace(/'/g, "\\'")}')`
  });
};

window.rollFeatCheck = function(featName) {
  const listRef = (typeof FEATS_LIST !== 'undefined') ? FEATS_LIST : ((typeof ADVANTAGES_LIST !== 'undefined') ? ADVANTAGES_LIST : []);
  const baseName = featName.includes(" (") ? featName.split(" (")[0].trim() : featName.trim();
  const baseFeat = listRef.find(a => a.name.toLowerCase() === baseName.toLowerCase() || a.name.toLowerCase() === featName.toLowerCase()) || {
    name: featName,
    category: "General",
    ranked: true,
    description: "",
    fullText: ""
  };

  const val = (char.feats && char.feats[featName]) || 0;
  const enhFeat = (char.enhancedTraits?.feats?.[featName]) || 0;
  const effVal = val + enhFeat;

  const roll = window.performD20RollWithHP(effVal, char, 'feat');

  let desc = baseFeat.description || "";
  if (!desc && baseFeat.fullText) {
    desc = baseFeat.fullText.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (desc.length > 220) desc = desc.slice(0, 217) + "...";
  }

  let details = `
    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span style="color: var(--text-muted); font-weight: 600;">Feat:</span>
      <strong>${featName} [${baseFeat.category || (baseFeat.types ? baseFeat.types.join(", ") : "General")}]</strong>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span style="color: var(--text-muted); font-weight: 600;">Effective Rank / Bonus:</span>
      <span class="badge" style="font-size: var(--font-size-tags);">${effVal >= 0 ? '+' : ''}${effVal}</span>
    </div>
    ${roll.hpBonus > 0 ? `
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px; color: #b45309; font-weight: bold;">
        <span>✨ Hero Point Bonus:</span>
        <span>+${roll.hpBonus}</span>
      </div>
    ` : ''}
  `;

  if (desc) {
    details += `
      <div style="margin-top: 6px; padding-top: 6px; border-top: 1px dashed var(--border-color); font-size: var(--font-size-fine-print); color: var(--text-main); line-height: 1.4;">
        ${desc}
      </div>
    `;
  }

  window.showDiceRollModal({
    title: `🎲 ${featName} Check / Roll`,
    d20: roll.d20,
    rawD20: roll.rawD20,
    baseMod: roll.baseMod,
    hpBonus: roll.hpBonus,
    isHPRerolled: roll.isHPRerolled,
    mod: roll.mod,
    total: roll.total,
    isNat20: roll.isNat20,
    isNat1: roll.isNat1,
    detailsHtml: details,
    rerollCode: `window.rollFeatCheck('${featName.replace(/'/g, "\\'")}')`
  });
};

window.showAdvantageInfo = function(advName) {
  const listRef = (typeof FEATS_LIST !== 'undefined') ? FEATS_LIST : ((typeof ADVANTAGES_LIST !== 'undefined') ? ADVANTAGES_LIST : []);
  const baseName = advName.includes(" (") ? advName.split(" (")[0].trim() : advName.trim();
  const adv = listRef.find(a => a.name.toLowerCase() === advName.toLowerCase() || a.name.toLowerCase() === baseName.toLowerCase());
  if (!adv) return;
  document.getElementById("modalRuleTitle").textContent = adv.name + ` [${adv.category || (adv.types ? adv.types.join(", ") : "General")}]`;
  document.getElementById("modalRuleBody").innerHTML = adv.fullText || adv.description;
  document.getElementById("ruleInfoModal").classList.add("active");
};

window.showSkillInfo = function(skillName) {
  const baseName = skillName.includes(" (") ? skillName.split(" (")[0].trim() : skillName.trim();
  const skill = typeof SKILLS_LIST !== 'undefined' ? SKILLS_LIST.find(s => s.name.toLowerCase() === skillName.toLowerCase() || s.name.toLowerCase() === baseName.toLowerCase()) : null;
  if (!skill) return;
  document.getElementById("modalRuleTitle").textContent = (skillName !== skill.name ? `${skillName} [${skill.name}]` : skill.name) + ` (${skill.ability})`;
  document.getElementById("modalRuleBody").innerHTML = skill.fullText;
  document.getElementById("ruleInfoModal").classList.add("active");
};

let COMPLETE_FULL_TEXT_MAP = {};

window.showPowerEffectInfo = function(effectName, profileName) {
  let effect = null;
  if (profileName) {
    if (typeof POWER_PROFILES_LIST !== 'undefined') {
      effect = POWER_PROFILES_LIST.find(p => p.name === profileName);
    }
    if (!effect && typeof POWER_EFFECTS_LIST !== 'undefined') {
      for (const eff of POWER_EFFECTS_LIST) {
        if (eff.profiles) {
          const prof = eff.profiles.find(p => p.name === profileName);
          if (prof) {
            effect = prof;
            break;
          }
        }
      }
    }
  }
  if (!effect && typeof POWER_EFFECTS_LIST !== 'undefined') {
    effect = POWER_EFFECTS_LIST.find(e => e.name === effectName);
  }
  if (!effect) return;
  
  document.getElementById("modalRuleTitle").textContent = `${effect.name} [${effect.type || 'Power'}]`;
  const textToDisplay = effect.fullText || effect.shortDesc || effect.description || "No description available.";

  const modalBody = document.getElementById("modalRuleBody");
  if (modalBody) {
      modalBody.innerHTML = textToDisplay.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
  }
  
  const modalElement = document.getElementById("ruleInfoModal");
  if (modalElement) {
      modalElement.classList.add("active");
  }
};

window.showModifierInfo = function(modName, effectContextName) {
  if (!modName) return;
  let mod = null;
  const clean = modName.replace(/\s*\[.*?\]/g, '').trim();
  const baseName = clean.replace(/\s*\([+–-]?\d+[^)]*\)/g, '').trim();
  const normalize = (s) => (s || "").toLowerCase().replace(/[–—]/g, '-').replace(/[^a-z0-9]/g, '');
  const normTarget = normalize(baseName);
  const cleanMod = (s) => (s || "").replace(/\s*\[.*?\]/g, '').replace(/\s*\([+–-]?\d+[^)]*\)/g, '').trim();
  const matchMod = (m) => m && (m.name === modName || m.name === baseName || m.name === clean || cleanMod(m.name) === baseName || normalize(m.name) === normTarget || normalize(cleanMod(m.name)) === normTarget);

  if (effectContextName && typeof POWER_EFFECTS_LIST !== 'undefined') {
    const ctxEff = POWER_EFFECTS_LIST.find(e => e.name === effectContextName);
    if (ctxEff) {
      if (ctxEff.specificFeats) mod = ctxEff.specificFeats.find(matchMod);
      if (!mod && ctxEff.specificExtras) mod = ctxEff.specificExtras.find(matchMod);
      if (!mod && ctxEff.specificFlaws) mod = ctxEff.specificFlaws.find(matchMod);
      if (!mod && ctxEff.uniqueModifiers) mod = ctxEff.uniqueModifiers.find(matchMod);
    }
  }

  if (!mod && typeof POWER_MODIFIERS_LIST !== 'undefined') {
    mod = POWER_MODIFIERS_LIST.find(matchMod);
  }
  if (!mod && typeof POWER_EFFECTS_LIST !== 'undefined') {
    for (const eff of POWER_EFFECTS_LIST) {
      if (eff.uniqueModifiers) {
        mod = eff.uniqueModifiers.find(matchMod);
        if (mod) break;
      }
      if (eff.specificExtras) {
        mod = eff.specificExtras.find(matchMod);
        if (mod) break;
      }
      if (eff.specificFlaws) {
        mod = eff.specificFlaws.find(matchMod);
        if (mod) break;
      }
      if (eff.specificFeats) {
        mod = eff.specificFeats.find(matchMod);
        if (mod) break;
      }
    }
  }

  const titleEl = document.getElementById("modalRuleTitle");
  const bodyEl = document.getElementById("modalRuleBody");
  
  if (mod) {
    let tierHtml = '';
    if (mod.tiers && mod.tiers.length > 0) {
      tierHtml = `<ul style="margin-top: 8px; padding-left: 16px;">${mod.tiers.map(t => `<li style="margin-bottom: 4px;"><strong>${t}</strong></li>`).join('')}</ul>`;
    }
    titleEl.textContent = `Modifier: ${mod.name || modName}`;
    const descText = mod.fullText || (mod.desc ? `<p>${mod.desc}</p>` : '<p>No detailed rules text available for this modifier.</p>');
    bodyEl.innerHTML = `${descText}${tierHtml}`;
  } else {
    titleEl.textContent = `Modifier: ${modName}`;
    bodyEl.innerHTML = "<p>Modifier rules not found.</p>";
  }
  
  document.getElementById("ruleInfoModal").classList.add("active");
};

window.showOptionInfo = function(optName, optDesc) {
  const titleEl = document.getElementById("modalRuleTitle");
  const bodyEl = document.getElementById("modalRuleBody");
  titleEl.textContent = optName || "Option Details";
  bodyEl.innerHTML = optDesc || "No additional information.";
  document.getElementById("ruleInfoModal").classList.add("active");
};

window.showConditionInfo = function(condName) {
  let cond = null;
  if (typeof CONDITIONS_LIST !== 'undefined') {
    cond = CONDITIONS_LIST.find(c => c.name.toLowerCase() === condName.toLowerCase());
  }
  if (!cond) {
      document.getElementById("modalRuleTitle").textContent = condName + " [Condition]";
      document.getElementById("modalRuleBody").innerHTML = "Rule text not found. The conditions list may not be loaded.";
      document.getElementById("ruleInfoModal").classList.add("active");
      return;
  }
  document.getElementById("modalRuleTitle").textContent = cond.name + " [Condition]";
  document.getElementById("modalRuleBody").innerHTML = cond.fullText || cond.description || "No specific rule text available.";
  document.getElementById("ruleInfoModal").classList.add("active");
};

window.checkScreenResolution = function() {
    if ((localStorage.getItem("mm2e_disable_res_warning") ?? localStorage.getItem("mm4e_disable_res_warning")) === "true") {
        const existingWarning = document.getElementById("resWarningBanner");
        if (existingWarning) existingWarning.remove();
        return;
    }
    if (window.innerWidth < 1080) {
        if (!document.getElementById("resWarningBanner")) {
            const banner = document.createElement("div");
            banner.id = "resWarningBanner";
            banner.style.position = "fixed";
            banner.style.top = "0";
            banner.style.left = "0";
            banner.style.width = "100%";
            banner.style.backgroundColor = "#ef4444";
            banner.style.color = "#ffffff";
            banner.style.textAlign = "center";
            banner.style.padding = "8px 16px";
            banner.style.zIndex = "9999";
            banner.style.fontSize = "var(--font-size-secondary)";
            banner.style.fontWeight = "bold";
            banner.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
            banner.innerHTML = `⚠️ Your screen width is less than 1080px. For the best builder experience, please use a wider screen or switch your device to landscape mode. <button id="dismissResWarning" style="margin-left:12px; background:rgba(0,0,0,0.2); border:1px solid #fff; color:white; padding:4px 8px; cursor:pointer; border-radius:4px; font-size:var(--font-size-minor-controls);">Dismiss</button>`;
            document.body.prepend(banner);
            
            document.getElementById("dismissResWarning").addEventListener("click", () => {
                banner.remove();
            });
        }
    } else {
        const existingWarning = document.getElementById("resWarningBanner");
        if (existingWarning) existingWarning.remove();
    }
};

document.addEventListener("DOMContentLoaded", () => {
  const injectedStyles = document.createElement('style');
  injectedStyles.id = 'injected-option-btn-styles';
  injectedStyles.innerHTML = `
    :root[data-theme="light"] .btn-add-option { background-color: #059669 !important; color: #ffffff !important; border-color: #047857 !important; font-weight: 600; }
    :root[data-theme="light"] .btn-add-option:hover { background-color: #047857 !important; }
    :root[data-theme="dark"] .btn-add-option { background-color: #4f46e5 !important; color: #ffffff !important; border-color: #4338ca !important; font-weight: 600; }
    :root[data-theme="dark"] .btn-add-option:hover { background-color: #4338ca !important; }
    :root[data-theme="parchment"] .btn-add-option { background-color: #8b5a2b !important; color: #ffffff !important; border-color: #6b4423 !important; font-weight: 600; }
    :root[data-theme="parchment"] .btn-add-option:hover { background-color: #6b4423 !important; }
    
    .power-card { border: 2px solid var(--border-power, #64748b) !important; }
    .power-card:not(.collapsed) .power-card-header { border-bottom: 2px solid var(--border-power, #64748b) !important; }
    
    #lblAbilPP, #lblCombatPP, #lblResistPP, #lblSkillPP, #lblAdvPP, #lblPowerPP, #lblTotalPP, #lblHeroicLimit, #lblCommandLimit, .power-card-header .badge, .effect-cost-badge {
        background-color: #333333 !important;
        color: #eeeeee !important;
        font-weight: normal !important;
        border: 1px solid #222 !important;
        box-shadow: none !important;
        border-radius: 4px !important;
        padding: 2px 6px !important;
    }
  `;
  document.head.appendChild(injectedStyles);

  const ppIds = ['lblAbilPP', 'lblCombatPP', 'lblResistPP', 'lblSkillPP', 'lblAdvPP', 'lblPowerPP', 'lblTotalPP'];
  ppIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.parentElement) {
          el.parentElement.style.fontWeight = 'normal';
          const strongs = el.parentElement.querySelectorAll('strong, b');
          strongs.forEach(s => s.style.fontWeight = 'normal');
      }
  });

  window.checkScreenResolution();
  window.addEventListener("resize", window.checkScreenResolution);

  window.isCharacterLoading = true;
  buildAbilitiesUI();
  setupHeroPointsSystem();
  buildSkillsUI();
  buildAdvantagesUI();
  buildPowersUI();
  buildAllReferenceTables();
  setupTabs();
  setupCollapsibles();
  setupOptionsModal();
  setupInfoModalHandlers();
  window.applyLoadedCharacter = applyLoadedCharacter;

  setupThemeAndFontControls();
  setupBackgroundHandlers();
  setupFileHandlers();
  setupCompanionModalHandlers();
  setupStatusTracker();
  setupSessionAndGMHub();
  setupSortingHeaders();
  setupDefenseSteppers();
  setupPowerHandlers();
  setupEquipmentHandlers();
  buildEquipmentUI();
  FileManager.init();
  refreshUI();
  window.isCharacterLoading = false;
  if (typeof FileManager !== 'undefined' && FileManager.clearDirty) {
    FileManager.clearDirty();
  }
  if (typeof window.updateGMEditorStateUI === 'function') {
    window.updateGMEditorStateUI();
  }
});

let previousActiveTab = "tab-basics";

function updatePersistentHeaderHeight() {
  const pHeader = document.querySelector('.persistent-header');
  if (pHeader) {
    const h = pHeader.offsetHeight;
    document.documentElement.style.setProperty('--persistent-header-height', h + 'px');
  }
}
window.updatePersistentHeaderHeight = updatePersistentHeaderHeight;

function showSpecialTabBackButton(label) {
  const btnBack = document.getElementById("btnBackFromTables");
  if (!btnBack) return;
  btnBack.style.visibility = "visible";
  btnBack.style.pointerEvents = "auto";
  btnBack.classList.add("visible");
  if (label) btnBack.title = `Return to ${label}`;
}
function hideSpecialTabBackButton() {
  const btnBack = document.getElementById("btnBackFromTables");
  if (!btnBack) return;
  btnBack.style.visibility = "hidden";
  btnBack.style.pointerEvents = "none";
  btnBack.classList.remove("visible");
}
window.showSpecialTabBackButton = showSpecialTabBackButton;
window.hideSpecialTabBackButton = hideSpecialTabBackButton;

function setupTabs() {
  window.addEventListener("resize", updatePersistentHeaderHeight);
  updatePersistentHeaderHeight();

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
      btn.classList.add("active");
      const targetContent = document.getElementById(btn.dataset.tab);
      if (targetContent) targetContent.classList.add("active");

      // Preserve previous tab if leaving a special tab
      const trackerContent = document.getElementById("tab-tracker");
      const tablesContent = document.getElementById("tab-tables");
      const gmContent = document.getElementById("tab-gm");

      if (trackerContent && trackerContent.classList.contains("active")) {
        previousActiveTab = "tab-tracker";
      } else if (tablesContent && tablesContent.classList.contains("active")) {
        previousActiveTab = "tab-tables";
      } else if (gmContent && gmContent.classList.contains("active")) {
        previousActiveTab = "tab-gm";
      }

      const btnTables = document.getElementById("btnOpenTables");
      const btnTracker = document.getElementById("btnOpenTracker");
      const btnGM = document.getElementById("btnOpenGM");

      if (btnTables) {
        btnTables.classList.remove("btn-primary");
        btnTables.classList.add("btn-secondary");
      }
      if (btnTracker) {
        btnTracker.classList.remove("btn-primary");
        btnTracker.classList.add("btn-secondary");
      }
      if (btnGM) {
        if (btn.dataset.tab === "tab-session" && typeof window.isGMPaneOpen === 'function' && window.isGMPaneOpen()) {
          btnGM.classList.add("btn-primary");
          btnGM.classList.remove("btn-secondary");
        } else {
          btnGM.classList.remove("btn-primary");
          btnGM.classList.add("btn-secondary");
        }
      }
      if (trackerContent) trackerContent.classList.remove("active");
      const trackerModal = document.getElementById("statusTrackerModal");
      if (trackerModal) trackerModal.classList.remove("active");
      if (tablesContent) tablesContent.classList.remove("active");
      if (gmContent) gmContent.classList.remove("active");
      if (typeof closeCampaignUsersModal === 'function') closeCampaignUsersModal();

      // If user came from a special tab (tracker, tables, or gm), keep the back button visible so they can return!
      if (previousActiveTab === "tab-tracker" || previousActiveTab === "tab-tables" || previousActiveTab === "tab-gm") {
        const label = previousActiveTab === "tab-tracker" ? "Tracker" : (previousActiveTab === "tab-tables" ? "Tables" : "GM Hub");
        showSpecialTabBackButton(label);
      } else {
        hideSpecialTabBackButton();
      }
      
      // Manage session-tab-active class for whole-window vertical fit (Session and GM tabs)
      if (btn.dataset.tab === "tab-session" || btn.dataset.tab === "tab-gm") {
        document.documentElement.classList.add("session-tab-active");
        document.body.classList.add("session-tab-active");
        updatePersistentHeaderHeight();
      } else {
        document.documentElement.classList.remove("session-tab-active");
        document.body.classList.remove("session-tab-active");
      }

      // Update power context or session UI
      if (btn.dataset.tab === "tab-blueprints") {
          window.activePowerContext = 'blueprints';
          buildPowersUI();
      } else if (btn.dataset.tab === "tab-powers") {
          window.activePowerContext = 'powers';
          buildPowersUI();
      } else if (btn.dataset.tab === "tab-companions") {
          window.activePowerContext = 'powers';
          buildCompanionsUI();
      } else if (btn.dataset.tab === "tab-session") {
          window.activePowerContext = 'powers';
          if (typeof window.syncSessionUI === 'function') window.syncSessionUI();
      } else {
          window.activePowerContext = 'powers';
      }
    });
  });

  const btnOpenTables = document.getElementById("btnOpenTables");
  const btnBackFromTables = document.getElementById("btnBackFromTables");

  if (btnOpenTables) {
    btnOpenTables.addEventListener("click", () => {
      const tablesContent = document.getElementById("tab-tables");
      // If tables are already active, toggle back to previous view
      if (tablesContent && tablesContent.classList.contains("active")) {
        if (btnBackFromTables) {
          btnBackFromTables.click();
        }
        return;
      }

      // Record which tab was active before opening tables
      const currentActiveBtn = document.querySelector(".tab-btn.active");
      if (currentActiveBtn && currentActiveBtn.dataset.tab) {
        previousActiveTab = currentActiveBtn.dataset.tab;
      }

      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
      document.documentElement.classList.remove("session-tab-active");
      document.body.classList.remove("session-tab-active");
      if (tablesContent) tablesContent.classList.add("active");

      // Reset tracker & GM state
      const trackerContent = document.getElementById("tab-tracker");
      if (trackerContent) trackerContent.classList.remove("active");
      const trackerModal = document.getElementById("statusTrackerModal");
      if (trackerModal) trackerModal.classList.remove("active");
      const gmContent = document.getElementById("tab-gm");
      if (gmContent) gmContent.classList.remove("active");

      // Style buttons
      btnOpenTables.classList.add("btn-primary");
      btnOpenTables.classList.remove("btn-secondary");
      const btnTracker = document.getElementById("btnOpenTracker");
      if (btnTracker) {
        btnTracker.classList.remove("btn-primary");
        btnTracker.classList.add("btn-secondary");
      }
      const btnGM = document.getElementById("btnOpenGM");
      if (btnGM) {
        btnGM.classList.remove("btn-primary");
        btnGM.classList.add("btn-secondary");
      }

      const prevBtn = document.querySelector(`.tab-btn[data-tab="${previousActiveTab}"]`);
      const prevName = prevBtn ? prevBtn.textContent.trim() : (previousActiveTab === "tab-tracker" ? "Tracker" : (previousActiveTab === "tab-gm" ? "GM Hub" : "Previous View"));
      showSpecialTabBackButton(prevName);
    });
  }

  if (btnBackFromTables) {
    btnBackFromTables.addEventListener("click", () => {
      const targetTab = previousActiveTab || "tab-basics";
      if (targetTab === "tab-tracker" && typeof window.openTrackerTab === 'function') {
        window.openTrackerTab();
        return;
      }
      if (targetTab === "tab-gm" && typeof window.openGMTab === 'function') {
        window.openGMTab();
        return;
      }
      if (targetTab === "tab-tables") {
        if (btnOpenTables) btnOpenTables.click();
        return;
      }

      const targetBtn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
      if (targetBtn) {
        targetBtn.click();
      } else {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
        const targetContent = document.getElementById(targetTab);
        if (targetContent) targetContent.classList.add("active");
        hideSpecialTabBackButton();
      }

      if (btnOpenTables) {
        btnOpenTables.classList.remove("btn-primary");
        btnOpenTables.classList.add("btn-secondary");
      }
      const btnTracker = document.getElementById("btnOpenTracker");
      if (btnTracker) {
        btnTracker.classList.remove("btn-primary");
        btnTracker.classList.add("btn-secondary");
      }
      const btnGM = document.getElementById("btnOpenGM");
      if (btnGM) {
        btnGM.classList.remove("btn-primary");
        btnGM.classList.add("btn-secondary");
      }
      const trackerContent = document.getElementById("tab-tracker");
      if (trackerContent) trackerContent.classList.remove("active");
      const trackerModal = document.getElementById("statusTrackerModal");
      if (trackerModal) trackerModal.classList.remove("active");
      const gmContent = document.getElementById("tab-gm");
      if (gmContent) gmContent.classList.remove("active");
    });
  }

  const btnReturn = document.getElementById("btnReturnToPrimaryHero");
  if (btnReturn) {
    btnReturn.addEventListener("click", () => {
      returnToPrimaryHero();
    });
  }

  const selChar = document.getElementById("selActiveCharacterContext");
  if (selChar) {
    selChar.addEventListener("change", (e) => {
      const val = e.target.value;
      const resetDropdown = () => {
        setTimeout(() => {
          if (selChar) selChar.value = window.activeCompanionId || "main";
        }, 50);
      };

      if (val === "__new_hero__") {
        resetDropdown();
        if (window.FileManager && typeof window.FileManager.newHero === 'function') {
          window.FileManager.newHero();
        }
      } else if (val && val.startsWith("__add_")) {
        resetDropdown();
        let type = "sidekick";
        if (val === "__add_alt_form__") type = "metamorph";
        else if (val === "__add_mecha__") type = "mecha";
        else if (val === "__add_minion__") type = "minion";
        else if (val === "__add_summon__") type = "summon";
        else if (val === "__add_duplicate__") type = "duplicate";
        else if (val === "__add_sidekick__" || val === "__add_companion__" || val === "__add_new__") type = "sidekick";
        createAndSwitchToCompanion(type);
      } else if (val === "main") {
        returnToPrimaryHero();
      } else if (val) {
        switchToCompanion(val);
      }
    });
  }
}
window.setupTabs = setupTabs;

function setupCollapsibles() {
  document.querySelectorAll(".panel-header").forEach(header => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("collapsed");
    });
  });
}

function setupOptionsModal() {
  const btn = document.getElementById("btnToggleOptions");
  const modal = document.getElementById("optionsModal");

  const chkWarn = document.getElementById("chkDisableWarnings");
  const chkDelWarn = document.getElementById("chkDisableDeleteWarning");
  const chkResWarn = document.getElementById("chkDisableResWarning");

  if (chkWarn) {
    chkWarn.checked = (localStorage.getItem("mm2e_disable_warnings") ?? localStorage.getItem("mm4e_disable_warnings")) === "true";
    chkWarn.addEventListener("change", (e) => {
      localStorage.setItem("mm2e_disable_warnings", e.target.checked);
    });
  }
  if (chkDelWarn) {
    chkDelWarn.checked = (localStorage.getItem("mm2e_disable_delete_warning") ?? localStorage.getItem("mm4e_disable_delete_warning")) === "true";
    chkDelWarn.addEventListener("change", (e) => {
      localStorage.setItem("mm2e_disable_delete_warning", e.target.checked);
    });
  }
  if (chkResWarn) {
    chkResWarn.checked = (localStorage.getItem("mm2e_disable_res_warning") ?? localStorage.getItem("mm4e_disable_res_warning")) === "true";
    chkResWarn.addEventListener("change", (e) => {
      localStorage.setItem("mm2e_disable_res_warning", e.target.checked);
      if (typeof window.checkScreenResolution === "function") {
        window.checkScreenResolution();
      }
    });
  }

  // House Rules
  const chkEnhTraitBoost = document.getElementById("toggleEnhancedTraitBoost");
  const chkAltFormPL = document.getElementById("toggleAltFormVariablePL");
  const chkBoostRanks = document.getElementById("toggleBoostAltersRanks");

  if (chkEnhTraitBoost) {
    chkEnhTraitBoost.checked = (char.houseRules && char.houseRules.enhancedTraitBoostsEffects) || (localStorage.getItem("mm2e_houserule_enhanced_trait_boost") === "true");
    chkEnhTraitBoost.addEventListener("change", (e) => {
      if (!char.houseRules) char.houseRules = {};
      char.houseRules.enhancedTraitBoostsEffects = e.target.checked;
      localStorage.setItem("mm2e_houserule_enhanced_trait_boost", e.target.checked);
      refreshUI();
    });
  }

  if (chkAltFormPL) {
    chkAltFormPL.checked = (char.houseRules && char.houseRules.allowAltFormVariablePL) || (localStorage.getItem("mm2e_houserule_alt_form_variable_pl") === "true");
    chkAltFormPL.addEventListener("change", (e) => {
      if (!char.houseRules) char.houseRules = {};
      char.houseRules.allowAltFormVariablePL = e.target.checked;
      localStorage.setItem("mm2e_houserule_alt_form_variable_pl", e.target.checked);
      if (typeof updateCompanionModalDefaults === 'function') {
        updateCompanionModalDefaults();
      }
    });
  }

  if (chkBoostRanks) {
    const isBoostAlters = (char.houseRules && char.houseRules.boostAltersRanks) || (localStorage.getItem("mm2e_houserule_boost_alters_ranks") === "true");
    chkBoostRanks.checked = isBoostAlters;
    if (!char.houseRules) char.houseRules = {};
    if (isBoostAlters) char.houseRules.boostAltersRanks = true;
    chkBoostRanks.addEventListener("change", (e) => {
      if (!char.houseRules) char.houseRules = {};
      char.houseRules.boostAltersRanks = e.target.checked;
      localStorage.setItem("mm2e_houserule_boost_alters_ranks", e.target.checked);
      refreshUI();
    });
  }

  const chkLegacyMods = document.getElementById("toggleEnableLegacyCoreModifiers");
  if (chkLegacyMods) {
    const isLegacyModsOn = (char.houseRules && char.houseRules.enableLegacyCoreModifiers) || (localStorage.getItem("mm2e_houserule_enable_legacy_modifiers") === "true");
    chkLegacyMods.checked = isLegacyModsOn;
    chkLegacyMods.addEventListener("change", (e) => {
      if (!char.houseRules) char.houseRules = {};
      char.houseRules.enableLegacyCoreModifiers = e.target.checked;
      localStorage.setItem("mm2e_houserule_enable_legacy_modifiers", e.target.checked);
      refreshUI();
    });
  }

  const chkDisablePerception = document.getElementById("toggleDisablePerceptionRange");
  if (chkDisablePerception) {
    const isDisablePerceptionOn = (char.houseRules && char.houseRules.disablePerceptionRange) || (localStorage.getItem("mm2e_houserule_disable_perception_range") === "true");
    chkDisablePerception.checked = isDisablePerceptionOn;
    chkDisablePerception.addEventListener("change", (e) => {
      if (!char.houseRules) char.houseRules = {};
      if (e.target.checked) {
        char.houseRules.disablePerceptionRange = true;
        localStorage.setItem("mm2e_houserule_disable_perception_range", "true");
        refreshUI();
      } else {
        // Scan for effects currently using "No Attack Roll"
        const matches = [];
        const scanContainer = (containerList, typeLabel) => {
          (containerList || []).forEach((c, cIdx) => {
            const cName = c.name || `${typeLabel} ${cIdx + 1}`;
            (c.effects || []).forEach((eff, eIdx) => {
              const effName = eff.name || eff.effectName || `Effect ${eIdx + 1}`;
              if (Array.isArray(eff.modifiers) && eff.modifiers.some(m => m.name === "No Attack Roll")) {
                matches.push({ effect: eff, label: `${cName} > ${effName}` });
              }
              if (Array.isArray(eff.containedPowers)) {
                eff.containedPowers.forEach((cp, cpIdx) => {
                  const cpName = cp.name || cp.effectName || `Power ${cpIdx + 1}`;
                  if (Array.isArray(cp.modifiers) && cp.modifiers.some(m => m.name === "No Attack Roll")) {
                    matches.push({ effect: cp, label: `${cName} > ${effName} [Contained] > ${cpName}` });
                  }
                });
              }
            });
          });
        };

        scanContainer(char.powers, "Power");
        scanContainer(char.blueprints, "Blueprint");

        if (matches.length > 0) {
          const promptMsg = "Disabling this house rule will remove the \"No Attack Roll\" extra from the following effect(s) and refund the spent Power Points:\n\n" +
            matches.map(m => `• ${m.label}`).join("\n") +
            "\n\nDo you want to continue?";
          if (!confirm(promptMsg)) {
            e.target.checked = true;
            return;
          }
          matches.forEach(item => {
            if (Array.isArray(item.effect.modifiers)) {
              item.effect.modifiers = item.effect.modifiers.filter(m => m.name !== "No Attack Roll");
            }
          });
        }

        char.houseRules.disablePerceptionRange = false;
        localStorage.setItem("mm2e_houserule_disable_perception_range", "false");
        refreshUI();
      }
    });
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const fileMenu = document.getElementById("fileDropdownMenu");
    if (fileMenu) fileMenu.style.display = "none";
    modal.classList.toggle("show");
  });

  modal.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    modal.classList.remove("show");
  });
}

function setupInfoModalHandlers() {
  const overlay = document.getElementById("ruleInfoModal");
  const closeBtn = document.getElementById("modalRuleClose");

  if (closeBtn && overlay) {
    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("active");
    });
  }

  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("active");
      }
    });
  }

  // Power Points Breakdown Modal
  const ppModal = document.getElementById("ppBreakdownModal");
  const ppCloseBtn = document.getElementById("modalPPBreakdownClose");
  const ppCloseBtn2 = document.getElementById("btnClosePPModal");
  const btnTogglePP = document.getElementById("btnTogglePPBreakdown");

  if (btnTogglePP && ppModal) {
    btnTogglePP.addEventListener("click", () => {
      ppModal.classList.toggle("active");
    });
  }

  if (ppCloseBtn && ppModal) {
    ppCloseBtn.addEventListener("click", () => {
      ppModal.classList.remove("active");
    });
  }

  if (ppCloseBtn2 && ppModal) {
    ppCloseBtn2.addEventListener("click", () => {
      ppModal.classList.remove("active");
    });
  }

  if (ppModal) {
    ppModal.addEventListener("click", (e) => {
      if (e.target === ppModal) {
        ppModal.classList.remove("active");
      }
    });
  }

  // Mecha Mode Toggle
  const btnToggleMecha = document.getElementById("btnToggleMechaMode");
  if (btnToggleMecha) {
    btnToggleMecha.addEventListener("click", () => {
      window.toggleMechaMode();
    });
  }

  // Mecha AI toggle checkbox
  const chkMechaAI = document.getElementById("chkMechaHasAI");
  if (chkMechaAI) {
    chkMechaAI.addEventListener("change", (e) => {
      if (typeof char !== 'undefined' && char.isMecha) {
        char.setMechaMode(true, e.target.checked);
        populateUIFromCharacter();
        refreshUI();
        showToast(e.target.checked ? "🤖 Onboard AI Equipped (Mental Abilities Enabled)" : "Onboard AI Unequipped (INT/WIS/CHA Disabled)", "info");
      }
    });
  }

  const featModal = document.getElementById("addFeatModal");
  if (featModal) {
    featModal.addEventListener("click", (e) => {
      if (e.target === featModal) window.closeAddFeatModal();
    });
  }

  const skillModal = document.getElementById("addSkillModal");
  if (skillModal) {
    skillModal.addEventListener("click", (e) => {
      if (e.target === skillModal) window.closeAddSkillModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (ppModal && ppModal.classList.contains("active")) {
        ppModal.classList.remove("active");
      }
      if (featModal && featModal.classList.contains("active")) {
        window.closeAddFeatModal();
      }
      if (skillModal && skillModal.classList.contains("active")) {
        window.closeAddSkillModal();
      }
      const trackerContent = document.getElementById("tab-tracker");
      if (trackerContent && trackerContent.classList.contains("active")) {
        const btnBack = document.getElementById("btnBackFromTables");
        if (btnBack) btnBack.click();
      }
      const trackerModal = document.getElementById("statusTrackerModal");
      if (trackerModal && trackerModal.classList.contains("active")) {
        trackerModal.classList.remove("active");
      }
      const ruleModal = document.getElementById("ruleInfoModal");
      if (ruleModal && ruleModal.classList.contains("active")) {
        ruleModal.classList.remove("active");
      }
      const compModal = document.getElementById("companionCreateModal");
      if (compModal && compModal.classList.contains("active")) {
        compModal.classList.remove("active");
      }
      const adjModal = document.getElementById("traitAdjustmentsModal");
      if (adjModal && adjModal.classList.contains("active")) {
        adjModal.classList.remove("active");
      }
      const hpModal = document.getElementById("useHeroPointModal");
      if (hpModal && hpModal.classList.contains("active")) {
        if (typeof window.closeUseHeroPointModal === 'function') {
          window.closeUseHeroPointModal();
        } else {
          hpModal.classList.remove("active");
        }
      }
      const printModal = document.getElementById("printPreviewModal");
      if (printModal && printModal.classList.contains("active")) {
        if (typeof window.closePrintPreview === 'function') {
          window.closePrintPreview();
        } else {
          printModal.classList.remove("active");
        }
      }
    }
  });
}

let poppedOutPartyWindow = null;
window.poppedOutPartyWindow = null;
let poppedOutTrackerWindow = null;
window.poppedOutTrackerWindow = null;

// ================= POPOUT WINDOW BOUNDS & CROSS-ORIGIN BRIDGE =================
function sanitizeWindowBounds(b, fallback = { width: 840, height: 480, left: 120, top: 120 }) {
  if (!b || typeof b !== 'object') return { ...fallback };
  const width = Math.round(Number(b.width) || fallback.width);
  const height = Math.round(Number(b.height) || fallback.height);
  const left = Math.round((b.left !== undefined && !isNaN(Number(b.left))) ? Number(b.left) : fallback.left);
  const top = Math.round((b.top !== undefined && !isNaN(Number(b.top))) ? Number(b.top) : fallback.top);

  return {
    width: Math.max(350, width),
    height: Math.max(250, height),
    left: left,
    top: top
  };
}
window.sanitizeWindowBounds = sanitizeWindowBounds;

function saveTrackerBoundsDirect(b) {
  const sanitized = sanitizeWindowBounds(b, { width: 880, height: 660, left: 140, top: 140 });
  try {
    localStorage.setItem("mm2e_tracker_bounds", JSON.stringify(sanitized));
  } catch (e) {}
}
window.saveTrackerBoundsDirect = saveTrackerBoundsDirect;

function savePartyDisplayBoundsDirect(b) {
  const sanitized = sanitizeWindowBounds(b, { width: 840, height: 480, left: 120, top: 120 });
  try {
    localStorage.setItem("mm2e_party_display_bounds", JSON.stringify(sanitized));
  } catch (e) {}
}
window.savePartyDisplayBoundsDirect = savePartyDisplayBoundsDirect;

// Cross-origin and file:/// safe message bridge between index.html and popouts
window.addEventListener('message', (event) => {
  if (!event.data || typeof event.data !== 'object') return;
  const { type, key, bounds, popupType, action, args } = event.data;

  // Window bounds reporting from popout
  if (type === 'MM2E_WINDOW_BOUNDS' && key && bounds) {
    if (key === 'mm2e_tracker_bounds') {
      saveTrackerBoundsDirect(bounds);
    } else if (key === 'mm2e_party_display_bounds') {
      savePartyDisplayBoundsDirect(bounds);
    } else {
      try {
        const sanitized = sanitizeWindowBounds(bounds);
        localStorage.setItem(key, JSON.stringify(sanitized));
      } catch (e) {}
    }
  }

  // Child requesting saved bounds
  if (type === 'MM2E_REQ_BOUNDS' && key && event.source) {
    try {
      const saved = localStorage.getItem(key);
      event.source.postMessage({ type: 'MM2E_RESP_BOUNDS', key, bounds: saved ? JSON.parse(saved) : null }, '*');
    } catch (e) {}
  }

  // Child notifying that it was closed / redocked
  if (type === 'MM2E_POPOUT_DOCKED' || type === 'POPOUT_DOCKED' || type === 'TRACKER_DOCKED' || type === 'PARTY_DISPLAY_DOCKED') {
    if (popupType === 'tracker' || type === 'TRACKER_DOCKED') {
      if (typeof window.redockTracker === 'function') window.redockTracker(false);
    } else if (popupType === 'party' || type === 'PARTY_DISPLAY_DOCKED') {
      if (typeof window.redockPartyDisplay === 'function') window.redockPartyDisplay(false);
    }
  }

  // Action forwarding from child
  if (type === 'TRACKER_ACTION' && action && typeof window[action] === 'function') {
    try { window[action](...(args || [])); } catch (e) {}
  }
  if (type === 'PARTY_ACTION' && action && typeof window[action] === 'function') {
    try { window[action](...(args || [])); } catch (e) {}
  }

  // Child requesting party roster HTML
  if (type === 'PARTY_REQ_ROSTER' && event.source) {
    try {
      const tbody = document.getElementById('tbodySessionPartyRoster');
      if (tbody && tbody.innerHTML) {
        event.source.postMessage({ type: 'PARTY_ROSTER_HTML', html: tbody.innerHTML }, '*');
      }
    } catch (e) {}
  }
});

// ================= STATUS & COMBAT TRACKER CONTROLLER =================
function setupStatusTracker() {
    const modal = document.getElementById("statusTrackerModal");
    const btnOpen = document.getElementById("btnOpenTracker");
    const btnClose = document.getElementById("modalStatusTrackerClose");
    const btnClearAllConds = document.getElementById("btnClearAllConditions");
    const btnPopoutTracker = document.getElementById("btnPopoutTracker");
    const btnRedockTrackerBtn = document.getElementById("btnRedockTracker");

    // Initiative elements
    const lblInitMod = document.getElementById("lblTrackerInitMod");
    const btnRollInit = document.getElementById("btnRollInitiative");
    const btnStepInitDown = document.getElementById("btnStepInitDown");
    const btnStepInitUp = document.getElementById("btnStepInitUp");
    const numInitResult = document.getElementById("numInitiativeResult");
    const btnClearInit = document.getElementById("btnClearInit");
    const lblInitBreakdown = document.getElementById("lblInitiativeRollBreakdown");

    // General d20 elements
    const btnRollD20 = document.getElementById("btnRollD20");
    const btnStepD20AdjDown = document.getElementById("btnStepD20AdjDown");
    const btnStepD20AdjUp = document.getElementById("btnStepD20AdjUp");
    const numD20Adj = document.getElementById("numD20Adj");
    const btnClearD20Adj = document.getElementById("btnClearD20Adj");
    const lblD20Result = document.getElementById("lblD20RollResult");
    const lblD20Breakdown = document.getElementById("lblD20RollBreakdown");

    // Custom Trackers elements
    const btnAddCustom = document.getElementById("btnAddCustomTracker");
    const listCustom = document.getElementById("listCustomTrackers");

    // Fades elements
    const listFades = document.getElementById("listFadesTrackers");
    const btnAdvanceAll = document.getElementById("btnAdvanceAllFades");

    // Popout & Docking Management
    function getSavedTrackerBounds() {
      const fallback = { width: 880, height: 660, left: 140, top: 140 };
      try {
        const saved = localStorage.getItem("mm2e_tracker_bounds");
        if (saved) {
          const parsed = JSON.parse(saved);
          return sanitizeWindowBounds(parsed, fallback);
        }
      } catch (e) {}
      return fallback;
    }
    window.getSavedTrackerBounds = getSavedTrackerBounds;

    function saveTrackerBoundsFromRef(win) {
      if (!win) return;
      try {
        const left = (win.screenX !== undefined) ? win.screenX : win.screenLeft;
        const top = (win.screenY !== undefined) ? win.screenY : win.screenTop;
        const width = win.innerWidth || win.outerWidth;
        const height = win.innerHeight || win.outerHeight;
        if (typeof left === 'number' && !isNaN(left) && typeof top === 'number' && !isNaN(top) && width >= 250 && height >= 200) {
          saveTrackerBoundsDirect({ left, top, width, height });
        }
      } catch (e) {}
    }
    window.saveTrackerBoundsFromRef = saveTrackerBoundsFromRef;

    function updateTrackerDockMode(isPoppedOut) {
      const boxNotice = document.getElementById("boxPoppedOutTrackerNotice");
      const dockBody = document.getElementById("trackerDockableBody");
      const btnPop = document.getElementById("btnPopoutTracker");

      if (boxNotice) boxNotice.style.display = isPoppedOut ? "flex" : "none";
      if (dockBody) dockBody.style.display = isPoppedOut ? "none" : "";
      if (btnPop) btnPop.style.display = isPoppedOut ? "none" : "";

      if (!isPoppedOut) {
        syncStatusTrackerUI();
      }
    }
    window.updateTrackerDockMode = updateTrackerDockMode;

    function openTrackerPopout() {
      const bounds = getSavedTrackerBounds();
      const openLeft = (typeof bounds.left === 'number' && !isNaN(bounds.left) && Math.abs(bounds.left) < 40000) ? bounds.left : 140;
      const openTop = (typeof bounds.top === 'number' && !isNaN(bounds.top) && Math.abs(bounds.top) < 40000) ? bounds.top : 140;
      const openWidth = Math.max(350, Math.min(bounds.width || 880, 5000));
      let openHeight = Math.max(250, Math.min(bounds.height || 660, 5000));
      if (window.screen && window.screen.availHeight && openHeight > (window.screen.availHeight - 30)) {
        openHeight = Math.max(250, window.screen.availHeight - 40);
      }
      const features = `width=${openWidth},height=${openHeight},left=${openLeft},top=${openTop},resizable=yes,scrollbars=yes`;
      const currentTheme = document.documentElement.getAttribute("data-theme") || localStorage.getItem("mm2e_theme") || "light";
      const activeHeroName = (char && char.name && char.name.trim()) ? char.name.trim() : "Hero";
      poppedOutTrackerWindow = window.open(`tracker_window.html?theme=${encodeURIComponent(currentTheme)}&heroName=${encodeURIComponent(activeHeroName)}&w=${openWidth}&h=${openHeight}&x=${openLeft}&y=${openTop}`, "MM2CG_TrackerWindow", features);
      window.poppedOutTrackerWindow = poppedOutTrackerWindow;
      updateTrackerDockMode(true);

      if (typeof SessionNetwork !== 'undefined' && typeof SessionNetwork.initBroadcastChannel === 'function') {
        SessionNetwork.initBroadcastChannel();
      }

      setTimeout(() => {
        try {
          if (poppedOutTrackerWindow && !poppedOutTrackerWindow.closed && poppedOutTrackerWindow.document) {
            poppedOutTrackerWindow.document.documentElement.setAttribute("data-theme", currentTheme);
            if (poppedOutTrackerWindow.document.body) poppedOutTrackerWindow.document.body.setAttribute("data-theme", currentTheme);
            if (typeof poppedOutTrackerWindow.__applySavedThemeAndFonts === 'function') {
              poppedOutTrackerWindow.__applySavedThemeAndFonts();
            }
            if (poppedOutTrackerWindow.localTracker) {
              poppedOutTrackerWindow.localTracker.heroName = activeHeroName;
            }
            const lblPop = poppedOutTrackerWindow.document.getElementById('lblTrackerHeroName');
            if (lblPop) lblPop.textContent = activeHeroName;
            if (typeof poppedOutTrackerWindow.renderAllTrackerUI === 'function') {
              poppedOutTrackerWindow.renderAllTrackerUI();
            }
          }
        } catch (e) {}
        syncStatusTrackerUI();
      }, 150);
      setTimeout(() => {
        try {
          if (poppedOutTrackerWindow && !poppedOutTrackerWindow.closed && poppedOutTrackerWindow.document) {
            if (poppedOutTrackerWindow.localTracker) {
              poppedOutTrackerWindow.localTracker.heroName = activeHeroName;
            }
            const lblPop = poppedOutTrackerWindow.document.getElementById('lblTrackerHeroName');
            if (lblPop) lblPop.textContent = activeHeroName;
            if (typeof poppedOutTrackerWindow.renderAllTrackerUI === 'function') {
              poppedOutTrackerWindow.renderAllTrackerUI();
            }
          }
        } catch (e) {}
        syncStatusTrackerUI();
      }, 350);
    }
    window.openTrackerPopout = openTrackerPopout;

    function redockTracker(closeRef = true) {
      if (poppedOutTrackerWindow && !poppedOutTrackerWindow.closed) {
        saveTrackerBoundsFromRef(poppedOutTrackerWindow);
        if (closeRef) {
          try { poppedOutTrackerWindow.close(); } catch (e) {}
        }
      }
      poppedOutTrackerWindow = null;
      window.poppedOutTrackerWindow = null;
      updateTrackerDockMode(false);
    }
    window.redockTracker = redockTracker;

    if (btnPopoutTracker) {
      btnPopoutTracker.addEventListener("click", openTrackerPopout);
    }
    if (btnRedockTrackerBtn) {
      btnRedockTrackerBtn.addEventListener("click", redockTracker);
    }

    window.addEventListener('focus', () => {
      if (poppedOutTrackerWindow && poppedOutTrackerWindow.closed) {
        redockTracker();
      }
    });

    window.addEventListener('storage', (e) => {
      if (e.key === 'mm2e_tracker_docked') {
        redockTracker();
      }
    });

    setInterval(() => {
      if (poppedOutTrackerWindow && poppedOutTrackerWindow.closed) {
        redockTracker();
      }
    }, 300);

    if (!modal || !btnOpen) return;

    function ensureTrackerState() {
      if (!char.trackerState) {
        char.trackerState = {
          initiativeRoll: null,
          initiativeAdjustment: 0,
          generalD20Roll: null,
          generalD20Adj: 0,
          conditions: {},
          customPoints: [],
          fadeStates: {}
        };
      }
      if (!char.trackerState.conditions) char.trackerState.conditions = {};
      if (!Array.isArray(char.trackerState.customPoints)) {
        char.trackerState.customPoints = [];
      } else {
        char.trackerState.customPoints.forEach(t => {
          if (t.max === 5 && !t.explicitMax) {
            t.max = null;
          }
        });
      }
      if (!char.trackerState.fadeStates) char.trackerState.fadeStates = {};
    }

    function getInitiativeModifier() {
      const dexMod = (typeof char.getAbilityRank === 'function') 
        ? (char.getAbilityRank("DEX") !== null ? char.getAbilityRank("DEX") : -5) 
        : (char.abilities?.DEX || 0);
      const effFeats = char.effectiveFeats || char.feats || {};
      const initFeat = effFeats["Improved Initiative"] || 0;
      const totalMod = (char.derivedStats && typeof char.derivedStats.initiative === 'number')
        ? char.derivedStats.initiative
        : (dexMod + (initFeat * 4));
      return { dexMod, initFeat, totalMod };
    }

    function syncInitiativeUI() {
      ensureTrackerState();
      const { dexMod, initFeat, totalMod } = getInitiativeModifier();
      if (lblInitMod) {
        lblInitMod.textContent = `Mod: ${totalMod >= 0 ? '+' + totalMod : totalMod} (DEX ${dexMod >= 0 ? '+' + dexMod : dexMod}${initFeat > 0 ? ', Imp Init ' + initFeat : ''})`;
      }
      if (numInitResult) {
        numInitResult.value = (char.trackerState.initiativeRoll !== null && char.trackerState.initiativeRoll !== undefined) ? char.trackerState.initiativeRoll : "";
      }
    }

    function syncGeneralD20UI() {
      ensureTrackerState();
      if (numD20Adj) {
        numD20Adj.value = char.trackerState.generalD20Adj || 0;
      }
      if (char.trackerState.generalD20Roll && lblD20Result && lblD20Breakdown) {
        const roll = char.trackerState.generalD20Roll;
        lblD20Result.textContent = `Result: ${roll.total}`;
        lblD20Breakdown.textContent = `1d20 roll: ${roll.d20}${roll.adj !== 0 ? (roll.adj > 0 ? ' + ' + roll.adj : ' - ' + Math.abs(roll.adj)) : ''} = ${roll.total}`;
      }
    }

    function updateTrackerConditionsSummary() {
      ensureTrackerState();
      const boxChips = document.getElementById("boxActiveConditionsChips");
      if (!boxChips) return;

      const conds = char.trackerState.conditions;
      const chips = [];

      const bruised = conds["Bruised"] || 0;
      const injured = conds["Injured"] || 0;
      if (bruised > 0) {
        chips.push(`<span class="badge" style="background: rgba(245, 158, 11, 0.18); color: #d97706; border: 1px solid #d97706; font-weight: bold;">💥 Bruised ×${bruised} (-${bruised} save)</span>`);
      }
      if (injured > 0) {
        chips.push(`<span class="badge" style="background: rgba(239, 68, 68, 0.18); color: #dc2626; border: 1px solid #dc2626; font-weight: bold;">🩸 Injured ×${injured} (-${injured} save)</span>`);
      }

      const valBruisedEl = document.getElementById("valBruisedCount");
      if (valBruisedEl) valBruisedEl.textContent = bruised;
      const valInjuredEl = document.getElementById("valInjuredCount");
      if (valInjuredEl) valInjuredEl.textContent = injured;

      for (const [cName, cVal] of Object.entries(conds)) {
        if (cName === "Bruised" || cName === "Injured") continue;
        if (cVal) {
          chips.push(`<span class="badge" style="background: rgba(239, 68, 68, 0.12); color: var(--text-main); border: 1px solid var(--accent-primary); font-weight: 600;">⚠️ ${cName}</span>`);
        }
      }

      // Sync checkboxes
      document.querySelectorAll("#statusTrackerModal input[type='checkbox'][data-cond]").forEach(cb => {
        const c = cb.dataset.cond;
        cb.checked = !!conds[c];
      });

      if (chips.length === 0) {
        boxChips.innerHTML = `
          <span style="font-size: var(--font-size-secondary); font-weight: 600; color: var(--text-muted);">Active Conditions:</span>
          <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid #10b981; font-weight: 600;">Normal / Unhindered</span>
        `;
      } else {
        boxChips.innerHTML = `
          <span style="font-size: var(--font-size-secondary); font-weight: 600; color: var(--text-muted);">Active Conditions:</span>
          ${chips.join(' ')}
        `;
      }
    }
    window.updateTrackerConditionsSummary = updateTrackerConditionsSummary;

    function renderCustomTrackers() {
      ensureTrackerState();
      if (!listCustom) return;
      const trackers = char.trackerState.customPoints;
      if (trackers.length === 0) {
        listCustom.innerHTML = `<span class="secondary-text" style="font-size: var(--font-size-fine-print); font-style: italic;">No custom counters configured. Click + Add Counter above.</span>`;
        return;
      }

      listCustom.innerHTML = trackers.map((t) => `
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; padding: 6px 8px;">
          <input type="text" value="${t.name || ''}" placeholder="Counter Name..." style="flex: 1; font-size: var(--font-size-secondary); font-weight: 600; border: 1px solid var(--border-color); background: var(--bg-panel); color: var(--text-main); padding: 4px 8px; border-radius: 3px; min-height: 28px;" oninput="window.updateCustomTrackerName('${t.id}', this.value)" onchange="window.updateCustomTrackerName('${t.id}', this.value)">
          <div style="display: flex; align-items: center; gap: 4px;" class="tracker-stepper">
            <button type="button" class="modifier-stepper-btn" onclick="window.stepCustomPoint('${t.id}', -1)" style="width: 28px; height: 28px;">−</button>
            <input type="number" min="0" value="${t.current || 0}" style="width: 44px; height: 28px; text-align: center; font-weight: bold; font-size: var(--font-size-secondary); border: 1px solid var(--border-color); background: var(--bg-app); color: var(--text-main);" onchange="window.updateCustomTrackerCurrent('${t.id}', this.value)">
            <button type="button" class="modifier-stepper-btn" onclick="window.stepCustomPoint('${t.id}', 1)" style="width: 28px; height: 28px;">+</button>
            <span style="font-size: var(--font-size-secondary); color: var(--text-muted); margin: 0 2px;">/</span>
            <input type="number" min="1" value="${t.max !== undefined && t.max !== null ? t.max : ''}" placeholder="Max" title="Maximum Capacity (Optional)" style="width: 44px; height: 28px; text-align: center; font-size: var(--font-size-minor-controls); border: 1px solid var(--border-color); background: var(--bg-app); color: var(--text-muted);" onchange="window.updateCustomTrackerMax('${t.id}', this.value)">
          </div>
          <button type="button" class="btn-delete-power" style="padding: 2px 8px; font-size: var(--font-size-minor-controls); height: 28px;" onclick="window.deleteCustomTracker('${t.id}')" title="Delete Counter">✕</button>
        </div>
      `).join('');
    }

    function renderFadesTrackers() {
      ensureTrackerState();
      if (!listFades) return;

      const detectedFades = [];
      const allPowers = char.activePowers || char.powers || [];
      allPowers.forEach((power, pIdx) => {
        (power.effects || []).forEach((eff, eIdx) => {
          const isBoost = eff.effectName === "Boost";
          const fadesMod = (eff.modifiers || []).find(m => m.name && (m.name === "Fades" || m.name.startsWith("Fades")));
          if (isBoost || fadesMod) {
            const effId = eff.id || `fade_${pIdx}_${eIdx}`;
            const effName = (eff.name && eff.name !== "New Effect") ? eff.name : (eff.effectName || "Unnamed Power");
            const containerName = power.name || "Power Container";

            const slowMod = (eff.modifiers || []).find(m => m.name && m.name.startsWith("Slow Fade"));
            const totalFadeMod = (eff.modifiers || []).find(m => m.name && m.name.startsWith("Total Fade"));
            const slowRanks = slowMod ? (parseInt(slowMod.ranks) || 1) : 0;

            let intervalDesc = "1 round (fades each round)";
            if (slowRanks === 1) intervalDesc = "1 minute / 10 rounds";
            else if (slowRanks === 2) intervalDesc = "5 minutes / 50 rounds";
            else if (slowRanks === 3) intervalDesc = "20 minutes / 200 rounds";
            else if (slowRanks >= 4) intervalDesc = `${slowRanks - 3} hour(s)`;

            const isRankAltered = isBoost && ((char.houseRules && char.houseRules.boostAltersRanks) || (localStorage.getItem("mm2e_houserule_boost_alters_ranks") === "true"));
            const maxVal = parseInt(eff.rank) || 1;
            const unit = isBoost ? (isRankAltered ? "Ranks" : "PP") : (fadesMod?.costType === "flat" ? "PP" : "Ranks");

            if (char.trackerState.fadeStates[effId] === undefined) {
              char.trackerState.fadeStates[effId] = maxVal;
            }
            const currentVal = char.trackerState.fadeStates[effId];

            const isDev = (typeof CharacterModel !== 'undefined' && CharacterModel.isDevicePower) ? CharacterModel.isDevicePower(power) : false;
            const icon = isDev ? '⚙️' : '⚡';

            detectedFades.push({
              effId,
              effName,
              containerName,
              isBoost,
              isRankAltered,
              unit,
              maxVal,
              currentVal,
              intervalDesc,
              hasTotalFade: !!totalFadeMod,
              icon,
              pIdx,
              eIdx
            });
          }
        });
      });

      if (detectedFades.length === 0) {
        listFades.innerHTML = `<span class="secondary-text" style="font-size: var(--font-size-fine-print); font-style: italic;">No active powers with Fades or Boost detected.</span>`;
        return;
      }

      listFades.innerHTML = detectedFades.map(f => `
        <div style="display: flex; flex-direction: column; gap: 4px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; padding: 8px 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
            <div>
              <strong style="font-size: var(--font-size-secondary); color: var(--accent-primary);"><span style="margin-right: 3px;">${f.icon}</span>${f.effName}</strong>
              <span class="secondary-text" style="font-size: var(--font-size-fine-print);"> (${f.containerName})</span>
            </div>
            <span class="badge" style="font-size: var(--font-size-tags); background: ${f.currentVal > 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; color: ${f.currentVal > 0 ? '#10b981' : '#ef4444'};">
              ${f.currentVal} / ${f.maxVal} ${f.unit}
            </span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
            <div style="font-size: var(--font-size-fine-print); color: var(--text-muted);">
              Rate: 1 ${f.unit} per ${f.intervalDesc}${f.hasTotalFade ? ' | <strong>Total Fade</strong>' : ''}
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <div class="tracker-stepper" style="display: inline-flex; align-items: center;">
                <button type="button" class="modifier-stepper-btn" onclick="window.stepFadeValue('${f.effId}', -1, ${f.maxVal}, ${f.pIdx}, ${f.eIdx})" style="width: 28px; height: 28px;">−</button>
                <span style="min-width: 28px; text-align: center; font-weight: bold; font-size: var(--font-size-secondary);">${f.currentVal}</span>
                <button type="button" class="modifier-stepper-btn" onclick="window.stepFadeValue('${f.effId}', 1, ${f.maxVal}, ${f.pIdx}, ${f.eIdx})" style="width: 28px; height: 28px;">+</button>
              </div>
              <button type="button" class="btn btn-secondary" style="font-size: var(--font-size-minor-controls); padding: 2px 8px; height: 28px;" onclick="window.resetFadeValue('${f.effId}', ${f.maxVal}, ${f.pIdx}, ${f.eIdx})" title="Reset to Full">↺ Reset</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Window helper bindings for tracker
    function broadcastTrackerSync() {
      const activeHeroName = (char && char.name && char.name.trim()) ? char.name.trim() : 'Hero';
      if (poppedOutTrackerWindow && !poppedOutTrackerWindow.closed) {
        try {
          if (poppedOutTrackerWindow.localTracker) {
            poppedOutTrackerWindow.localTracker.heroName = activeHeroName;
          }
          const lblPop = poppedOutTrackerWindow.document?.getElementById('lblTrackerHeroName');
          if (lblPop) lblPop.textContent = activeHeroName;
          if (typeof poppedOutTrackerWindow.syncTrackerFromOpener === 'function') {
            poppedOutTrackerWindow.syncTrackerFromOpener();
          } else if (typeof poppedOutTrackerWindow.renderAllTrackerUI === 'function') {
            poppedOutTrackerWindow.renderAllTrackerUI();
          }
        } catch (e) {}
      }
      try {
        if (typeof SessionNetwork !== 'undefined' && typeof SessionNetwork.sendLocalBroadcast === 'function') {
          SessionNetwork.sendLocalBroadcast({
            type: 'TRACKER_SYNC_STATE',
            state: window.getTrackerPopoutData ? window.getTrackerPopoutData() : null
          });
          SessionNetwork.sendLocalBroadcast({
            type: 'HERO_NAME_CHANGE',
            name: activeHeroName
          });
        }
      } catch (e) {}
    }
    window.broadcastTrackerSync = broadcastTrackerSync;

    window.getTrackerPopoutData = function() {
      ensureTrackerState();
      const dexMod = (typeof char.getAbilityRank === 'function') 
        ? (char.getAbilityRank("DEX") !== null ? char.getAbilityRank("DEX") : -5) 
        : (char.abilities?.DEX || 0);
      const effFeats = char.effectiveFeats || char.feats || {};
      const initFeat = effFeats["Improved Initiative"] || 0;
      const totalMod = (char.derivedStats && typeof char.derivedStats.initiative === 'number')
        ? char.derivedStats.initiative
        : (dexMod + (initFeat * 4));

      return {
        heroName: char.name || 'Hero',
        initiativeRoll: char.trackerState.initiativeRoll,
        initiativeModifier: { dexMod, initFeat, totalMod },
        generalD20Roll: char.trackerState.generalD20Roll,
        generalD20Adj: char.trackerState.generalD20Adj || 0,
        conditions: char.trackerState.conditions || {},
        customPoints: char.trackerState.customPoints || [],
        fadeStates: char.trackerState.fadeStates || {},
        powers: char.activePowers || char.powers || []
      };
    };

    window.stepConditionCount = function(condName, delta) {
      ensureTrackerState();
      const current = char.trackerState.conditions[condName] || 0;
      const nextVal = Math.max(0, current + delta);
      char.trackerState.conditions[condName] = nextVal;
      updateTrackerConditionsSummary();
      if (typeof syncPartyRosterUI === 'function') syncPartyRosterUI();
      broadcastTrackerSync();
    };

    window.toggleConditionDirect = function(condName, isChecked) {
      ensureTrackerState();
      char.trackerState.conditions[condName] = isChecked;
      updateTrackerConditionsSummary();
      if (typeof syncPartyRosterUI === 'function') syncPartyRosterUI();
      broadcastTrackerSync();
    };

    window.stepFadeValue = function(effId, delta, maxVal, pIdx, eIdx) {
      ensureTrackerState();
      const cur = char.trackerState.fadeStates[effId] !== undefined ? char.trackerState.fadeStates[effId] : maxVal;
      const nextVal = Math.max(0, Math.min(maxVal, cur + delta));
      char.trackerState.fadeStates[effId] = nextVal;

      if (pIdx !== undefined && eIdx !== undefined) {
        const eff = char.activePowers[pIdx]?.effects[eIdx];
        if (eff && eff.effectName === "Boost") {
          if (!eff.options) eff.options = {};
          if (nextVal === 0 && eff.options.boostActive !== false) {
            eff.options.boostActive = false;
            eff.boostActive = false;
            refreshUI();
          } else if (nextVal > 0 && eff.options.boostActive === false) {
            eff.options.boostActive = true;
            eff.boostActive = true;
            refreshUI();
          }
        }
      }

      renderFadesTrackers();
      broadcastTrackerSync();
    };

    window.resetFadeValue = function(effId, maxVal, pIdx, eIdx) {
      ensureTrackerState();
      char.trackerState.fadeStates[effId] = maxVal;
      if (pIdx !== undefined && eIdx !== undefined) {
        const eff = char.activePowers[pIdx]?.effects[eIdx];
        if (eff && eff.effectName === "Boost") {
          if (!eff.options) eff.options = {};
          eff.options.boostActive = true;
          eff.boostActive = true;
          refreshUI();
        }
      }
      renderFadesTrackers();
      broadcastTrackerSync();
    };

    window.stepCustomPoint = function(trackerId, delta) {
      ensureTrackerState();
      const t = char.trackerState.customPoints.find(x => x.id === trackerId);
      if (!t) return;
      const cur = Number(t.current) || 0;
      const maxVal = (t.max !== undefined && t.max !== null && t.max !== '' && !isNaN(Number(t.max))) ? Number(t.max) : Infinity;
      t.current = Math.max(0, Math.min(maxVal, cur + delta));
      renderCustomTrackers();
      broadcastTrackerSync();
    };

    window.updateCustomTrackerName = function(trackerId, newName) {
      ensureTrackerState();
      const t = char.trackerState.customPoints.find(x => x.id === trackerId);
      if (t) t.name = newName;
      broadcastTrackerSync();
    };

    window.updateCustomTrackerCurrent = function(trackerId, newVal) {
      ensureTrackerState();
      const t = char.trackerState.customPoints.find(x => x.id === trackerId);
      if (t) {
        const val = Number(newVal) || 0;
        const maxVal = (t.max !== undefined && t.max !== null && t.max !== '' && !isNaN(Number(t.max))) ? Number(t.max) : Infinity;
        t.current = Math.max(0, Math.min(maxVal, val));
        renderCustomTrackers();
        broadcastTrackerSync();
      }
    };

    window.updateCustomTrackerMax = function(trackerId, newMax) {
      ensureTrackerState();
      const t = char.trackerState.customPoints.find(x => x.id === trackerId);
      if (t) {
        const trimmed = (newMax !== null && newMax !== undefined) ? String(newMax).trim() : '';
        if (trimmed !== '' && !isNaN(Number(trimmed))) {
          t.max = Math.max(1, Number(trimmed));
          t.explicitMax = true;
        } else {
          t.max = null;
          t.explicitMax = false;
        }
        if (t.max !== null && t.current > t.max) {
          t.current = t.max;
        }
        renderCustomTrackers();
        broadcastTrackerSync();
      }
    };

    window.deleteCustomTracker = function(trackerId) {
      ensureTrackerState();
      char.trackerState.customPoints = char.trackerState.customPoints.filter(x => x.id !== trackerId);
      renderCustomTrackers();
      broadcastTrackerSync();
    };

    // Open & Close Handlers (Special Tab Controller)
    function syncStatusTrackerUI() {
      ensureTrackerState();
      const lblHero = document.getElementById("lblTrackerHeroName");
      if (lblHero) lblHero.textContent = char.name || "Hero";

      syncInitiativeUI();
      syncGeneralD20UI();
      updateTrackerConditionsSummary();
      renderCustomTrackers();
      renderFadesTrackers();
      broadcastTrackerSync();
    }
    window.syncStatusTrackerUI = syncStatusTrackerUI;

    function openTrackerTab() {
      const trackerContent = document.getElementById("tab-tracker");
      const btnBack = document.getElementById("btnBackFromTables");
      const btnTables = document.getElementById("btnOpenTables");

      if (poppedOutTrackerWindow && !poppedOutTrackerWindow.closed) {
        // When Tracker is popped out and the Tracker button is clicked, redock the Tracker!
        redockTracker();
        if (trackerContent && trackerContent.classList.contains("active")) {
          syncStatusTrackerUI();
          return;
        }
      } else {
        // If tracker tab is already active, toggle back to previous view
        if (trackerContent && trackerContent.classList.contains("active")) {
          if (btnBack) {
            btnBack.click();
          }
          return;
        }
      }

      // Record which tab was active before opening tracker (if not currently on tables)
      const currentActiveBtn = (typeof document.querySelector === 'function') ? document.querySelector(".tab-btn.active") : null;
      if (currentActiveBtn && currentActiveBtn.dataset.tab) {
        previousActiveTab = currentActiveBtn.dataset.tab;
      }

      if (typeof document.querySelectorAll === 'function') {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
      }
      if (document.documentElement) document.documentElement.classList.remove("session-tab-active");
      if (document.body) document.body.classList.remove("session-tab-active");
      if (trackerContent) trackerContent.classList.add("active");
      if (modal) modal.classList.add("active");

      // Deactivate tables and GM hub if open
      const tablesContent = document.getElementById("tab-tables");
      if (tablesContent) tablesContent.classList.remove("active");
      const gmContent = document.getElementById("tab-gm");
      if (gmContent) gmContent.classList.remove("active");

      // Style buttons for active tab feedback
      if (btnOpen) {
        btnOpen.classList.add("btn-primary");
        btnOpen.classList.remove("btn-secondary");
      }
      if (btnTables) {
        btnTables.classList.remove("btn-primary");
        btnTables.classList.add("btn-secondary");
      }
      const btnGM = document.getElementById("btnOpenGM");
      if (btnGM) {
        btnGM.classList.remove("btn-primary");
        btnGM.classList.add("btn-secondary");
      }

      // Populate tracker UI
      syncStatusTrackerUI();

      const targetTab = (typeof previousActiveTab !== 'undefined') ? previousActiveTab : "tab-basics";
      const prevBtn = (typeof document.querySelector === 'function') ? document.querySelector(`.tab-btn[data-tab="${targetTab}"]`) : null;
      const prevName = prevBtn ? prevBtn.textContent.trim() : "Previous View";
      showSpecialTabBackButton(prevName);
    }
    window.openTrackerTab = openTrackerTab;

    btnOpen.addEventListener("click", openTrackerTab);

    const btnTrackerReturn = document.getElementById("btnTrackerReturnToSheet");
    if (btnTrackerReturn) {
      btnTrackerReturn.addEventListener("click", () => {
        const btnBack = document.getElementById("btnBackFromTables");
        if (btnBack) btnBack.click();
      });
    }

    if (btnClose) {
      btnClose.addEventListener("click", () => {
        const btnBack = document.getElementById("btnBackFromTables");
        if (btnBack) btnBack.click();
        else if (modal) modal.classList.remove("active");
      });
    }

    window.clearAllTrackerConditions = function() {
      ensureTrackerState();
      char.trackerState.conditions = {};
      updateTrackerConditionsSummary();
      if (typeof syncPartyRosterUI === 'function') syncPartyRosterUI();
      broadcastTrackerSync();
    };

    if (btnClearAllConds) {
      btnClearAllConds.addEventListener("click", () => window.clearAllTrackerConditions());
    }

    // Initiative Actions
    window.rollTrackerInitiative = function() {
      ensureTrackerState();
      const { totalMod } = getInitiativeModifier();
      const roll = (typeof window.performD20RollWithHP === 'function')
        ? window.performD20RollWithHP(totalMod, char, 'initiative')
        : { d20: Math.floor(Math.random() * 20) + 1, total: Math.floor(Math.random() * 20) + 1 + totalMod, isNat20: false, isNat1: false, hpBonus: 0, isHPRerolled: false, baseMod: totalMod, mod: totalMod, rawD20: 10 };
      const total = roll.total;
      char.trackerState.initiativeRoll = total;
      if (numInitResult) numInitResult.value = total;
      const hpTag = (roll.hpBonus > 0 ? ` + ${roll.hpBonus} [✨ HP]` : '') + (roll.isHPRerolled ? ' [✨ Reroll]' : '');
      if (lblInitBreakdown) {
        lblInitBreakdown.textContent = `Rolled: 1d20 (${roll.d20}) + ${totalMod}${hpTag} = ${total}`;
      }
      if (typeof syncPartyRosterUI === 'function') syncPartyRosterUI();
      broadcastTrackerSync();

      const hpSuffix = (roll.hpBonus > 0 ? ` (✨ +${roll.hpBonus} HP)` : '') + (roll.isHPRerolled ? ' (✨ HP Reroll)' : '');
      const entry = {
        characterName: char?.name || "Hero",
        playerName: char?.playerName || (typeof localStorage !== 'undefined' ? localStorage.getItem("mm2e_player_name") : "") || "Player",
        rollType: `Initiative${hpSuffix}`,
        total: total,
        breakdown: `1d20 (${roll.d20}) + ${totalMod}${hpTag} = ${total}`,
        isNat20: !!roll.isNat20,
        isNat1: !!roll.isNat1,
        hpBonus: roll.hpBonus || 0,
        isHPRerolled: !!roll.isHPRerolled,
        hpAnnouncement: roll.hpAnnouncement || (roll.hpBonus > 0 ? `HP: +${roll.hpBonus} (Improve Roll)` : (roll.isHPRerolled ? 'HP Reroll (min 11–20 floor)' : ''))
      };

      window.lastRollConfig = {
        ...entry,
        d20: roll.d20,
        rawD20: roll.rawD20,
        mod: roll.mod,
        baseMod: roll.baseMod,
        title: "Initiative Check"
      };

      if (typeof SessionNetwork !== 'undefined' && typeof SessionNetwork.sendRoll === 'function') {
        SessionNetwork.sendRoll(entry);
      } else if (typeof CampaignManager !== 'undefined' && typeof CampaignManager.addLogEntry === 'function') {
        CampaignManager.addLogEntry(entry);
      }
      if (typeof window.updateSidebarLastRoll === 'function') {
        window.updateSidebarLastRoll(entry);
      }
      return total;
    };

    window.stepTrackerInit = function(delta) {
      ensureTrackerState();
      const cur = (char.trackerState.initiativeRoll !== null && char.trackerState.initiativeRoll !== undefined)
        ? parseInt(char.trackerState.initiativeRoll)
        : (parseInt(numInitResult?.value) || 0);
      const next = cur + delta;
      char.trackerState.initiativeRoll = next;
      if (numInitResult) numInitResult.value = next;
      if (lblInitBreakdown) lblInitBreakdown.textContent = `Adjusted initiative to ${next}`;
      if (typeof syncPartyRosterUI === 'function') syncPartyRosterUI();
      broadcastTrackerSync();
    };

    window.setTrackerInit = function(val) {
      ensureTrackerState();
      const n = parseInt(val);
      char.trackerState.initiativeRoll = isNaN(n) ? null : n;
      if (typeof syncPartyRosterUI === 'function') syncPartyRosterUI();
      broadcastTrackerSync();
    };

    window.clearTrackerInit = function() {
      ensureTrackerState();
      char.trackerState.initiativeRoll = null;
      if (numInitResult) numInitResult.value = "";
      if (lblInitBreakdown) lblInitBreakdown.textContent = "";
      if (typeof syncPartyRosterUI === 'function') syncPartyRosterUI();
      broadcastTrackerSync();
    };

    if (btnRollInit) {
      btnRollInit.addEventListener("click", () => window.rollTrackerInitiative());
    }

    if (btnStepInitDown) {
      btnStepInitDown.addEventListener("click", () => window.stepTrackerInit(-1));
    }

    if (btnStepInitUp) {
      btnStepInitUp.addEventListener("click", () => window.stepTrackerInit(1));
    }

    if (numInitResult) {
      numInitResult.addEventListener("change", (e) => window.setTrackerInit(e.target.value));
    }

    if (btnClearInit) {
      btnClearInit.addEventListener("click", () => window.clearTrackerInit());
    }

    // General d20 & Custom Notation Actions
    const txtTrackerDice = document.getElementById("txtTrackerDiceNotation");

    window.rollTrackerD20 = function(customNotation) {
      ensureTrackerState();
      const notation = (customNotation !== undefined && customNotation !== null && customNotation !== '')
        ? String(customNotation).trim()
        : (txtTrackerDice?.value?.trim() || '');
      let total, breakdown, isNat20, isNat1, rollType, hpBonus = 0, isHPRerolled = false;
      let rollObj = null;

      const d20Match = notation ? notation.match(/^1?d20(?:\s*([+-]\s*\d+))?$/i) : null;
      if (notation && !d20Match && typeof DiceNotation !== 'undefined') {
        const res = DiceNotation.roll(notation);
        total = res.total;
        breakdown = res.breakdown;
        isNat20 = res.isNat20;
        isNat1 = res.isNat1;
        rollType = `Dice (${res.expression})`;
      } else {
        const parsedMod = d20Match && d20Match[1] ? parseInt(d20Match[1].replace(/\s+/g, '')) : (parseInt(numD20Adj?.value) || char.trackerState.generalD20Adj || 0);
        const roll = (typeof window.performD20RollWithHP === 'function')
          ? window.performD20RollWithHP(parsedMod, char, 'check')
          : { d20: Math.floor(Math.random() * 20) + 1, total: Math.floor(Math.random() * 20) + 1 + parsedMod, isNat20: false, isNat1: false, hpBonus: 0, isHPRerolled: false, baseMod: parsedMod, mod: parsedMod, rawD20: 10 };
        rollObj = roll;
        total = roll.total;
        isNat20 = roll.isNat20;
        isNat1 = roll.isNat1;
        hpBonus = roll.hpBonus;
        isHPRerolled = roll.isHPRerolled;
        const hpSuffix = (hpBonus > 0 ? ` (✨ +${hpBonus} HP)` : '') + (isHPRerolled ? ' (✨ HP Reroll)' : '');
        rollType = notation ? `Dice (${notation})${hpSuffix}` : `General d20${hpSuffix}`;
        const hpTag = (hpBonus > 0 ? ` + ${hpBonus} [✨ HP]` : '') + (isHPRerolled ? ' [✨ Reroll]' : '');
        breakdown = `1d20 (${roll.d20})${parsedMod !== 0 ? (parsedMod > 0 ? ' + ' + parsedMod : ' - ' + Math.abs(parsedMod)) : ''}${hpTag} = ${total}`;
        char.trackerState.generalD20Roll = { d20: roll.d20, adj: parsedMod, total };
      }

      if (lblD20Result) {
        let color = "var(--accent-primary)";
        if (isNat20) color = "#10b981";
        else if (isNat1) color = "#ef4444";
        else if (hpBonus > 0 || isHPRerolled) color = "#b45309";
        lblD20Result.innerHTML = `<span style="color: ${color};">Result: ${total}</span> ${isNat20 ? '🎉 (Nat 20!)' : (isNat1 ? '⚠️ (Nat 1)' : '')} ${(hpBonus > 0 || isHPRerolled) ? '✨' : ''}`;
      }
      if (lblD20Breakdown) {
        lblD20Breakdown.textContent = breakdown;
      }

      // Broadcast to session log & network
      const entry = {
        characterName: char?.name || "Hero",
        playerName: char?.playerName || (typeof localStorage !== 'undefined' ? localStorage.getItem("mm2e_player_name") : "") || "Player",
        rollType: rollType,
        total: total,
        breakdown: breakdown,
        isNat20: !!isNat20,
        isNat1: !!isNat1,
        hpBonus: hpBonus || 0,
        isHPRerolled: !!isHPRerolled,
        hpAnnouncement: (hpBonus > 0 ? `HP: +${hpBonus} (Improve Roll)` : (isHPRerolled ? 'HP Reroll (min 11–20 floor)' : ''))
      };

      window.lastRollConfig = {
        ...entry,
        d20: rollObj ? rollObj.d20 : total,
        rawD20: rollObj ? rollObj.rawD20 : total,
        mod: rollObj ? rollObj.mod : 0,
        baseMod: rollObj ? rollObj.baseMod : 0,
        title: rollType.replace(/\s*\(\s*✨.*?\)/gi, '').trim()
      };

      if (typeof SessionNetwork !== 'undefined' && typeof SessionNetwork.sendRoll === 'function') {
        SessionNetwork.sendRoll(entry);
      } else if (typeof CampaignManager !== 'undefined' && typeof CampaignManager.addLogEntry === 'function') {
        CampaignManager.addLogEntry(entry);
      }
      if (typeof window.updateSidebarLastRoll === 'function') {
        window.updateSidebarLastRoll(entry);
      }

      broadcastTrackerSync();
      return { total, breakdown, isNat20, isNat1 };
    };

    window.stepTrackerD20Adj = function(delta) {
      ensureTrackerState();
      const cur = parseInt(numD20Adj?.value) || char.trackerState.generalD20Adj || 0;
      const next = cur + delta;
      char.trackerState.generalD20Adj = next;
      if (numD20Adj) numD20Adj.value = next;
      broadcastTrackerSync();
    };

    window.setTrackerD20Adj = function(val) {
      ensureTrackerState();
      const n = parseInt(val) || 0;
      char.trackerState.generalD20Adj = n;
      if (numD20Adj) numD20Adj.value = n;
      broadcastTrackerSync();
    };

    window.clearTrackerD20Adj = function() {
      ensureTrackerState();
      char.trackerState.generalD20Adj = 0;
      if (numD20Adj) numD20Adj.value = 0;
      broadcastTrackerSync();
    };

    if (btnRollD20) {
      btnRollD20.addEventListener("click", () => window.rollTrackerD20());
    }

    if (txtTrackerDice) {
      txtTrackerDice.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && btnRollD20) {
          btnRollD20.click();
        }
      });
    }

    if (btnStepD20AdjDown) {
      btnStepD20AdjDown.addEventListener("click", () => window.stepTrackerD20Adj(-1));
    }

    if (btnStepD20AdjUp) {
      btnStepD20AdjUp.addEventListener("click", () => window.stepTrackerD20Adj(1));
    }

    if (btnClearD20Adj) {
      btnClearD20Adj.addEventListener("click", () => window.clearTrackerD20Adj());
    }

    // Custom Points Add Action
    window.addTrackerCustomCounter = function() {
      ensureTrackerState();
      char.trackerState.customPoints.push({
        id: "pool_" + Math.random().toString(36).substr(2, 7),
        name: "",
        current: 0,
        max: null,
        explicitMax: false
      });
      renderCustomTrackers();
      broadcastTrackerSync();
    };

    if (btnAddCustom) {
      btnAddCustom.addEventListener("click", () => window.addTrackerCustomCounter());
    }

    // Advance All Fades
    window.advanceAllTrackerFades = function() {
      ensureTrackerState();
      const allPowers = char.activePowers || char.powers || [];
      allPowers.forEach((power, pIdx) => {
        (power.effects || []).forEach((eff, eIdx) => {
          const isBoost = eff.effectName === "Boost";
          const fadesMod = (eff.modifiers || []).find(m => m.name && (m.name === "Fades" || m.name.startsWith("Fades")));
          if (isBoost || fadesMod) {
            const effId = eff.id || `fade_${pIdx}_${eIdx}`;
            const maxVal = parseInt(eff.rank) || 1;
            window.stepFadeValue(effId, -1, maxVal, pIdx, eIdx);
          }
        });
      });
      broadcastTrackerSync();
    };

    if (btnAdvanceAll) {
      btnAdvanceAll.addEventListener("click", () => window.advanceAllTrackerFades());
    }

    // Draggable Resizing & Reset Size Handlers
    const trackerBox = (typeof modal.querySelector === 'function')
      ? modal.querySelector(".status-tracker-box")
      : (typeof document.querySelector === 'function' ? document.querySelector(".status-tracker-box") : modal);
    const handleTop = document.getElementById("trackerResizeTop");
    const handleBottom = document.getElementById("trackerResizeBottom");
    const btnResetSize = document.getElementById("btnResetTrackerSize");

    const defaultTrackerHeight = "82vh";
    const savedHeight = (typeof localStorage !== 'undefined') ? localStorage.getItem("mm2e_tracker_height") : null;
    if (savedHeight && trackerBox) {
      trackerBox.style.height = savedHeight;
    }

    if (btnResetSize && trackerBox) {
      btnResetSize.addEventListener("click", () => {
        trackerBox.style.height = defaultTrackerHeight;
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem("mm2e_tracker_height");
        }
        if (typeof showToast === 'function') {
          showToast("Tracker window size reset to default.", "info");
        }
      });
    }

    function initResizeHandle(handleEl, isTop) {
      if (!handleEl || !trackerBox) return;

      const onStart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const clientY = (e.clientY !== undefined) ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
        const startY = clientY;
        const startHeight = trackerBox.getBoundingClientRect ? trackerBox.getBoundingClientRect().height : (trackerBox.offsetHeight || 500);
        handleEl.classList.add("active-drag");
        if (typeof document !== 'undefined' && document.body) {
          document.body.style.cursor = "ns-resize";
          document.body.style.userSelect = "none";
        }

        const onMove = (moveEvt) => {
          const curY = (moveEvt.clientY !== undefined) ? moveEvt.clientY : (moveEvt.touches && moveEvt.touches[0] ? moveEvt.touches[0].clientY : 0);
          const dy = curY - startY;
          const delta = isTop ? -dy : dy;
          const minH = 380;
          const maxH = (typeof window !== 'undefined' && window.innerHeight) ? Math.round(window.innerHeight * 0.95) : 800;
          const newH = Math.min(maxH, Math.max(minH, Math.round(startHeight + delta)));
          trackerBox.style.height = `${newH}px`;
        };

        const onEnd = () => {
          handleEl.classList.remove("active-drag");
          if (typeof document !== 'undefined' && document.body) {
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
          }
          if (typeof window !== 'undefined') {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onEnd);
            window.removeEventListener("touchmove", onMove);
            window.removeEventListener("touchend", onEnd);
          }
          if (trackerBox.style.height && typeof localStorage !== 'undefined') {
            localStorage.setItem("mm2e_tracker_height", trackerBox.style.height);
          }
        };

        if (typeof window !== 'undefined') {
          window.addEventListener("mousemove", onMove);
          window.addEventListener("mouseup", onEnd);
          window.addEventListener("touchmove", onMove, { passive: false });
          window.addEventListener("touchend", onEnd);
        }
      };

      handleEl.addEventListener("mousedown", onStart);
      handleEl.addEventListener("touchstart", onStart, { passive: false });
    }

    initResizeHandle(handleTop, true);
    initResizeHandle(handleBottom, false);
}
window.setupStatusTracker = setupStatusTracker;

function setupSessionAndGMHub() {
  // Ensure default campaign exists if none
  if (typeof CampaignManager !== 'undefined') {
    const allCamps = CampaignManager.getCampaigns();
    if (allCamps.length === 0) {
      CampaignManager.createCampaign("Default Campaign", "campaign-1");
    }
  }

  // DOM Elements - Session Tab (Discord / Roll20-Style Tabletop Client)
  const btnConnect = document.getElementById("btnSessionConnect");
  const txtPlayerName = document.getElementById("txtSessionPlayerName");
  const txtCampCode = document.getElementById("txtSessionCampaignCode");
  const lblStatus = document.getElementById("lblSessionStatusBadge");
  const lblMsg = document.getElementById("lblSessionConnectMsg");
  const btnSilentToggle = document.getElementById("btnToggleSilentMode");
  const btnPopoutParty = document.getElementById("btnPopoutPartyDisplay");
  const btnRedockParty = document.getElementById("btnRedockPartyDisplay");
  const boxPoppedOutParty = document.getElementById("boxPoppedOutPartyNotice");
  const logFeed = document.getElementById("sessionLogFeedContainer");
  const txtSearch = document.getElementById("txtSessionSearch");
  const btnClearSearch = document.getElementById("btnSessionClearSearch");
  const filterChips = document.querySelectorAll("#sessionFilterChips .filter-chip");
  const sessionTabContainer = document.getElementById("sessionTabContainer");
  const tableSessionPartyRoster = document.getElementById("tbodySessionPartyRoster");
  const txtChatInput = document.getElementById("txtSessionChatInput");
  const btnSendChat = document.getElementById("btnSessionSendChat");
  const btnDiceShortcut = document.getElementById("btnSessionDiceShortcut");
  const popoverMention = document.getElementById("chatMentionPopover");
  const listMention = document.getElementById("chatMentionList");
  const lblLiveClock = document.getElementById("lblSessionLiveClock");
  const lblGameSessionStatusBadge = document.getElementById("lblGameSessionStatusBadge");
  const gmSessionActionButtons = document.getElementById("gmSessionActionButtons");
  const btnGMStartSession = document.getElementById("btnGMStartSession");
  const btnGMPauseSession = document.getElementById("btnGMPauseSession");
  const btnGMEndSession = document.getElementById("btnGMEndSession");
  const boxSessionPausedBanner = document.getElementById("boxSessionPausedBanner");
  const lblPausedBannerClock = document.getElementById("lblPausedBannerClock");
  const lblGMInfo = document.getElementById("lblSessionGMInfo");
  const lblPlayerInfo = document.getElementById("lblSessionPlayerInfo");
  const btnToggleLogin = document.getElementById("btnToggleLoginBar");
  const sessionLoginBar = document.getElementById("sessionLoginBar");
  const lblToggleGMIncludeChar = document.getElementById("lblToggleGMIncludeChar");
  const chkGMIncludeCharInParty = document.getElementById("chkGMIncludeCharInParty");

  // DOM Elements - Session Top Control Row
  const sessionTopControlRow = document.getElementById("sessionTopControlRow");
  const lblSessionUserRoleBadge = document.getElementById("lblSessionUserRoleBadge");
  const lblSessionCampaignName = document.getElementById("lblSessionCampaignName");
  const lblSessionNumberBadge = document.getElementById("lblSessionNumberBadge");
  const lblSessionDateTime = document.getElementById("lblSessionDateTime");
  const boxSessionGMCommandsDropdown = document.getElementById("boxSessionGMCommandsDropdown");
  const btnSessionGMCommands = document.getElementById("btnSessionGMCommands");
  const menuSessionGMCommands = document.getElementById("menuSessionGMCommands");
  const btnPlayerSubmitSheet = document.getElementById("btnPlayerSubmitSheet");
  const btnSessionCopyInviteLink = document.getElementById("btnSessionCopyInviteLink");
  const btnSessionOpenUsersFromMenu = document.getElementById("btnSessionOpenUsersFromMenu");
  const btnOpenUsers = document.getElementById("btnOpenUsers");
  const gmCampaignCharactersCard = document.getElementById("gmCampaignCharactersCard");
  const gmCampaignCharactersList = document.getElementById("gmCampaignCharactersList");
  const btnGMRefreshCharacters = document.getElementById("btnGMRefreshCharacters");

  // DOM Elements - Dedicated GM Tab Session Controls
  const lblGMCampaignSessionBadge = document.getElementById("lblGMCampaignSessionBadge");
  const lblGMCampaignSessionClock = document.getElementById("lblGMCampaignSessionClock");
  const btnGMCampTabStartSession = document.getElementById("btnGMCampTabStartSession");
  const btnGMCampTabPauseSession = document.getElementById("btnGMCampTabPauseSession");
  const btnGMCampTabEndSession = document.getElementById("btnGMCampTabEndSession");
  const btnGMCampTabCancelSession = document.getElementById("btnGMCampTabCancelSession");
  const btnGMCancelSession = document.getElementById("btnGMCancelSession");

  // DOM Elements - Dedicated GM Tab
  const btnOpenGM = document.getElementById("btnOpenGM");
  const btnGMReturn = document.getElementById("btnGMReturnToSheet");
  const selGMCamps = document.getElementById("selGMCampaigns");
  const btnGMNewCamp = document.getElementById("btnGMNewCampaign");
  const btnGMCopyLink = document.getElementById("btnGMCopyPlayerLink");
  const btnGMManageUsers = document.getElementById("btnGMManageUsers");
  const modalCampaignUsers = document.getElementById("campaignUsersModal");
  const txtNewUserName = document.getElementById("txtNewCampaignUserName");
  const btnAddNewUser = document.getElementById("btnAddNewCampaignUser");
  const txtGMName = document.getElementById("txtUsersModalGMName");
  const btnSaveGMName = document.getElementById("btnSaveUsersModalGMName");
  const lblActiveCampCode = document.getElementById("lblGMActiveCampCode");
  const btnGMExport = document.getElementById("btnGMExportCampaign");
  const btnGMImport = document.getElementById("btnGMImportCampaign");
  const fileGMImport = document.getElementById("fileGMImportCampaign");
  const btnGMDelete = document.getElementById("btnGMDeleteCampaign");
  const btnGMAttachNPC = document.getElementById("btnGMAttachNPC");
  const btnGMAttachNPCFile = document.getElementById("btnGMAttachNPCFile");
  const fileGMAttachNPC = document.getElementById("fileGMAttachNPC");
  const boxJoinReqs = document.getElementById("gmJoinRequestsBox");
  const listJoinReqs = document.getElementById("gmJoinRequestsList");
  const btnGMCreateSavePoint = document.getElementById("btnGMCreateSavePoint");
  const chkGMAutoBackupChars = document.getElementById("chkGMAutoBackupChars");
  const btnGMExtractCharacter = document.getElementById("btnGMExtractCharacter");
  const gmTimelineContainer = document.getElementById("gmTimelineContainer");
  const gmPartyNpcList = document.getElementById("gmPartyNpcList");
  const gmEncounterEnemyList = document.getElementById("gmEncounterEnemyList");
  const btnGMAddEnemy = document.getElementById("btnGMAddEnemy");
  const btnGMAddEnemyFile = document.getElementById("btnGMAddEnemyFile");
  const fileGMAddEnemy = document.getElementById("fileGMAddEnemy");
  const modalExtraction = document.getElementById("charExtractionModal");
  const bodyExtraction = document.getElementById("charExtractionModalBody");
  const modalPushAccept = document.getElementById("gmPushAcceptModal");
  const bodyPushAccept = document.getElementById("gmPushAcceptModalBody");
  const btnAcceptPush = document.getElementById("btnAcceptPushSheet");
  const btnRejectPush = document.getElementById("btnRejectPushSheet");

  // Local state for Session feed
  let sessionSearchQuery = "";
  let sessionCurrentFilter = "all";
  let sessionLocalLog = [];

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function updatePartyDisplayDockMode(isPoppedOut) {
    if (sessionTabContainer) {
      if (isPoppedOut) {
        sessionTabContainer.classList.add("party-popped-out");
      } else {
        sessionTabContainer.classList.remove("party-popped-out");
      }
    }
    if (boxPoppedOutParty) {
      boxPoppedOutParty.style.display = isPoppedOut ? "flex" : "none";
    }
    const container = document.getElementById("sessionPartyTableContainer");
    if (container) {
      container.style.display = isPoppedOut ? "none" : "";
    }
    if (btnPopoutParty) {
      btnPopoutParty.style.display = isPoppedOut ? "none" : "";
    }
    if (!isPoppedOut) {
      syncPartyRosterUI();
    }
  }
  window.updatePartyDisplayDockMode = updatePartyDisplayDockMode;
  window.updateSessionDockMode = updatePartyDisplayDockMode;

  // Toggle user login bar
  if (btnToggleLogin && sessionLoginBar) {
    btnToggleLogin.addEventListener("click", () => {
      const isHidden = sessionLoginBar.style.display === "none";
      sessionLoginBar.style.display = isHidden ? "flex" : "none";
      btnToggleLogin.textContent = isHidden ? "👤 Login / Room ▴" : "👤 Login / Room ▾";
    });
  }

  // Top Status Bar GM Info
  function updateSessionGMInfo() {
    if (lblGMInfo && typeof CampaignManager !== 'undefined') {
      const gmName = CampaignManager.getGMUserName() || 'GM';
      lblGMInfo.innerHTML = `👑 GM: <strong>${escapeHtml(gmName)}</strong>`;
    }
  }
  updateSessionGMInfo();
  setInterval(updateSessionGMInfo, 5000);

  // 1. Initialize Network Listeners
  if (typeof SessionNetwork !== 'undefined') {
    SessionNetwork.initBroadcastChannel();

    SessionNetwork.addEventListener("onRoll", (roll) => {
      if (!roll) return;
      if (roll.id && sessionLocalLog.some(x => x.id === roll.id)) return;
      sessionLocalLog.push(roll);
      renderSessionFeed();
      if (typeof CampaignManager !== 'undefined') {
        CampaignManager.addLogEntry(roll);
      }
      if (typeof window.updateSidebarLastRoll === 'function') {
        window.updateSidebarLastRoll(roll);
      }
    });

    SessionNetwork.addEventListener("onChat", (packet) => {
      if (!packet) return;
      if (packet.id && sessionLocalLog.some(x => x.id === packet.id)) return;
      if (sessionLocalLog.some(x => x.text === packet.text && x.author === packet.author && Math.abs(new Date(x.timestamp) - new Date(packet.timestamp)) < 1500)) return;
      sessionLocalLog.push(packet);
      renderSessionFeed();
      if (typeof CampaignManager !== 'undefined') {
        CampaignManager.addLogEntry(packet);
      }
    });

    SessionNetwork.addEventListener("onHeroPointSpent", (packet) => {
      if (!packet) return;
      // Note: Standalone "expended a Hero Point" messages are omitted per user request.
      // Roll effects are announced on the roll itself. We only sync HP state here.
      if (typeof CampaignManager !== 'undefined') {
        const camp = CampaignManager.getActiveCampaign();
        if (camp) {
          const player = (camp.acceptedPlayers || []).find(p => p.characterName === packet.characterName || (packet.senderPlayerId && p.id === packet.senderPlayerId));
          if (player && packet.remainingHP !== undefined) {
            CampaignManager.updatePlayerConditions(player.id, player.currentBruises, player.conditions, packet.remainingHP, player.currentInjured);
          }
          const npc = (camp.npcs || []).find(n => n.name === packet.characterName || n.characterName === packet.characterName);
          if (npc && packet.remainingHP !== undefined) {
            npc.heroPoints = Math.max(0, Number(packet.remainingHP) || 0);
            if (npc.characterData) {
              npc.characterData.heroPoints = npc.heroPoints;
            }
            if (typeof CampaignManager.saveToStorage === 'function') {
              CampaignManager.saveToStorage();
            }
          }
        }
      }
      if (typeof char !== 'undefined' && char && char.name && packet.characterName === char.name) {
        if (packet.remainingHP !== undefined) {
          char.heroPoints = Math.max(0, Number(packet.remainingHP) || 0);
          const hpInput = document.getElementById("heroPointsInput");
          if (hpInput) hpInput.value = char.heroPoints;
          const lblHP = document.getElementById("lblModalCurrentHP");
          if (lblHP) lblHP.textContent = char.heroPoints;
          if (typeof updateHeroPointsUseButtonState === 'function') updateHeroPointsUseButtonState();
        }
      }
      syncPartyRosterUI();
    });

    SessionNetwork.addEventListener("onConditionUpdate", (update) => {
      syncPartyRosterUI();
    });

    SessionNetwork.addEventListener("onPopoutDocked", () => {
      if (typeof redockPartyDisplay === 'function') redockPartyDisplay();
      if (typeof redockTracker === 'function') redockTracker();
    });

    SessionNetwork.addEventListener("onTrackerAction", (packet) => {
      if (packet && packet.action && typeof window[packet.action] === 'function') {
        try {
          window[packet.action](...(packet.args || []));
        } catch (e) {
          console.error("Error executing tracker action:", packet.action, e);
        }
      }
    });

    SessionNetwork.addEventListener("onPartyAction", (packet) => {
      if (packet && packet.action && typeof window[packet.action] === 'function') {
        try {
          window[packet.action](...(packet.args || []));
        } catch (e) {
          console.error("Error executing party action:", packet.action, e);
        }
      }
    });

    SessionNetwork.addEventListener("onPartyReqRoster", () => {
      syncPartyRosterUI();
    });

    SessionNetwork.addEventListener("onGMStatusOverride", (packet) => {
      if (typeof char !== 'undefined' && char) {
        if (!char.trackerState) char.trackerState = { conditions: {}, customPoints: [], fadesTrackers: [] };
        if (!char.trackerState.conditions) char.trackerState.conditions = {};

        if (packet.bruises !== undefined) char.trackerState.conditions.Bruised = packet.bruises;
        if (packet.injured !== undefined) char.trackerState.conditions.Injured = packet.injured;
        if (packet.conditions) {
          Object.assign(char.trackerState.conditions, packet.conditions);
        }
        if (packet.heroPoints !== undefined) {
          char.heroPoints = packet.heroPoints;
          const hpInput = document.getElementById("heroPointsInput");
          if (hpInput) hpInput.value = char.heroPoints;
          const lblHP = document.getElementById("lblModalCurrentHP");
          if (lblHP) lblHP.textContent = char.heroPoints;
          if (typeof updateHeroPointsUseButtonState === 'function') updateHeroPointsUseButtonState();
        }

        if (typeof updateTrackerConditionsSummary === 'function') updateTrackerConditionsSummary();
        syncPartyRosterUI();
        if (typeof showToast === 'function') showToast("GM updated your status/conditions.", "info");
      }
    });

    SessionNetwork.addEventListener("onJoinRequest", (req) => {
      if (typeof CampaignManager !== 'undefined') {
        const res = CampaignManager.addPlayerRequest(req);
        renderGMJoinRequests();
        syncPartyRosterUI();
        if (typeof renderCampaignUsersList === 'function') renderCampaignUsersList();
        if (res && res.status === 'already_accepted' && !res.tokenMismatch) {
          const activeCamp = CampaignManager.getActiveCampaign();
          SessionNetwork.acceptJoin(req.id, activeCamp);
          if (typeof showToast === 'function') {
            showToast(`Player "${req.playerName}" connected automatically.`, "info");
          }
        } else if (res && res.isNewDevice) {
          if (typeof showToast === 'function') {
            showToast(`📱 New device connection request from "${req.playerName}"!`, "warning");
          }
        } else if (res && res.tokenMismatch) {
          if (typeof showToast === 'function') {
            showToast(`⚠️ Auth Alert: "${req.playerName}" joined with an unrecognized account key!`, "warning");
          }
        } else if (typeof showToast === 'function') {
          showToast(`Incoming join request from ${req.playerName} (${req.characterName})`, "info");
        }
      }
    });

    SessionNetwork.addEventListener("onDuplicateLoginAttempt", (evt) => {
      const modal = document.getElementById("gmDuplicateLoginModal");
      const body = document.getElementById("gmDuplicateLoginModalBody");
      const btnReject = document.getElementById("btnRejectDuplicateLogin");
      const btnReplace = document.getElementById("btnAcceptReplaceDuplicateLogin");
      if (!modal || !body) {
        if (confirm(`⚠️ DUPLICATE USER LOGIN: A user claiming to be "${evt.playerName}" is attempting to connect while "${evt.playerName}" is already connected.\n\nDisconnect old session and accept incoming?`)) {
          SessionNetwork.disconnectClient(evt.existingPeerId, 'Replaced by incoming session');
          SessionNetwork.acceptJoin(evt.incomingPacket.id, (typeof CampaignManager !== 'undefined') ? CampaignManager.getActiveCampaign() : null);
        } else {
          SessionNetwork.rejectJoin(evt.incomingPacket.id, 'Duplicate user name already connected');
        }
        return;
      }

      body.innerHTML = `
        <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 6px; padding: 12px;">
          <div style="font-size: 14px; font-weight: bold; color: #ef4444; margin-bottom: 6px;">
            A user is attempting to connect with an active user name: "${escapeHtml(evt.playerName)}"
          </div>
          <div style="font-size: 12px; color: var(--text-main); display: flex; flex-direction: column; gap: 4px;">
            <div><strong>Incoming Connection ID:</strong> <code>${escapeHtml(evt.incomingPacket.id)}</code></div>
            <div><strong>Active Existing Connection:</strong> <code>${escapeHtml(evt.existingPeerId)}</code></div>
            <div>
              <strong>Account Token Match:</strong>
              ${evt.isSameToken 
                ? '<span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #10b981; font-weight: bold;">✓ Trusted Device Key (Legitimate reconnect / device switch)</span>' 
                : '<span class="badge" style="background: rgba(239, 68, 68, 0.2); color: #ef4444; font-weight: bold;">⚠️ Different Account Key (Potential imposter or name collision!)</span>'}
            </div>
          </div>
        </div>
        <div style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">
          If the player refreshed their page or reconnected from the same account, click <strong>Replace Stale Session</strong>. If this is an unauthorized connection or duplicate tab, click <strong>Reject Duplicate</strong>.
        </div>
      `;

      modal.classList.add("active");

      if (btnReject) {
        btnReject.onclick = () => {
          SessionNetwork.rejectJoin(evt.incomingPacket.id, 'Duplicate user name connection rejected by GM');
          modal.classList.remove("active");
          if (typeof showToast === 'function') showToast(`Rejected duplicate login for "${evt.playerName}".`, "info");
        };
      }

      if (btnReplace) {
        btnReplace.onclick = () => {
          SessionNetwork.disconnectClient(evt.existingPeerId, 'Stale session replaced by new login');
          const camp = (typeof CampaignManager !== 'undefined') ? CampaignManager.getActiveCampaign() : null;
          SessionNetwork.acceptJoin(evt.incomingPacket.id, camp);
          modal.classList.remove("active");
          if (typeof showToast === 'function') showToast(`Replaced stale session for "${evt.playerName}".`, "success");
        };
      }
    });

    SessionNetwork.addEventListener("onStatusChange", (info) => {
      updateSessionConnectionUI(info);
      if (typeof updateSessionRowUI === 'function') updateSessionRowUI();
      if (info && info.status === "connected") {
        const netStatus = (typeof SessionNetwork !== 'undefined') ? SessionNetwork.getStatus() : null;
        if (netStatus && netStatus.role === 'CLIENT') {
          // Auto-submit character sheet upon verified connection
          if (typeof char !== 'undefined' && char && char.name) {
            const hero = window.primaryHero || char;
            const serialized = (typeof hero.serialize === 'function') ? hero.serialize() : hero;
            SessionNetwork.sendCharacterSheetData(serialized);
            if (typeof showToast === 'function') {
              showToast(`Connected! Character sheet "${char.name}" submitted to GM.`, "success");
            }
          }
        }
      }
    });

    SessionNetwork.addEventListener("onForcedMode", (info) => {
      updateSilentModeUI();
      syncPartyRosterUI();
    });

    SessionNetwork.addEventListener("onRequestCharacterSheet", () => {
      if (typeof char !== 'undefined' && char) {
        const hero = window.primaryHero || char;
        const serialized = hero.serialize();
        SessionNetwork.sendCharacterSheetData(serialized);
      }
    });

    SessionNetwork.addEventListener("onCharacterSheetData", (packet) => {
      if (typeof CampaignManager !== 'undefined') {
        CampaignManager.saveCampaignCharacter(packet.sheet, packet.playerName, packet.playerId);
        CampaignManager.ingestCharacterSheet(packet.playerId, packet.sheet, packet.playerName, packet.characterName);
        syncPartyRosterUI();
        if (typeof renderGMCampaignCharacters === 'function') {
          renderGMCampaignCharacters();
        }
        if (typeof showToast === 'function') {
          showToast(`📥 Received and saved character sheet for "${packet.characterName}" (${packet.playerName})!`, "success");
        }
        if (typeof appendChatMessage === 'function') {
          appendChatMessage({
            sender: "System",
            text: `📥 GM received and saved character sheet for "${packet.characterName}" (${packet.playerName}).`,
            timestamp: new Date().toISOString(),
            isSystem: true
          });
        }
      }
    });

    SessionNetwork.addEventListener("onPlayerLeaveParty", (packet) => {
      if (typeof CampaignManager !== 'undefined') {
        if (packet.characterId) CampaignManager.removeCharacterFromParty(packet.characterId);
        if (packet.characterName) CampaignManager.removeCharacterFromParty(packet.characterName);
        syncPartyRosterUI();
        if (typeof renderGMCampaignCharacters === 'function') {
          renderGMCampaignCharacters();
        }
        const camp = CampaignManager.getActiveCampaign();
        if (camp && typeof SessionNetwork !== 'undefined' && SessionNetwork.getStatus().role === 'HOST') {
          SessionNetwork.broadcastStateSync(camp);
        }
      }
    });

    SessionNetwork.addEventListener("onGMPushCharacter", (packet) => {
      if (packet.sheet) {
        showGMPushAcceptModal(packet);
      }
    });

    SessionNetwork.addEventListener("onGMTransfer", (packet) => {
      if (typeof CampaignManager !== 'undefined') {
        const netStatus = (typeof SessionNetwork !== 'undefined' && SessionNetwork.getStatus) ? SessionNetwork.getStatus() : null;
        if (packet.newGmPlayerId === 'local_player' || (netStatus && packet.newGmPlayerId === netStatus.code)) {
          alert("👑 You have been designated as the GM for this campaign!");
        } else {
          if (typeof showToast === 'function') showToast("GM status was transferred to another player.", "info");
        }
        syncGMUI();
        syncPartyRosterUI();
      }
    });

    SessionNetwork.addEventListener("onSessionStatus", (sessionState) => {
      if (typeof updateGameSessionUI === 'function') {
        updateGameSessionUI(sessionState);
      }
    });

    SessionNetwork.addEventListener("onStateSync", (campState) => {
      if (campState && campState.sessionState && typeof updateGameSessionUI === 'function') {
        updateGameSessionUI(campState.sessionState);
      }
    });

    SessionNetwork.addEventListener("onSessionCancel", (packet) => {
      if (!packet) return;
      if (typeof CampaignManager !== 'undefined') {
        const camp = CampaignManager.getActiveCampaign();
        if (camp) {
          camp.sessionState = packet.sessionState;
          if (Array.isArray(camp.sessionLog) && packet.sessionStartedAt) {
            camp.sessionLog = camp.sessionLog.filter(entry => {
              if (!entry.timestamp) return false;
              const entryTime = new Date(entry.timestamp).getTime();
              return !isNaN(entryTime) && entryTime < packet.sessionStartedAt;
            });
          }
          if (Array.isArray(camp.log) && packet.sessionStartedAt) {
            camp.log = camp.log.filter(entry => {
              if (!entry.timestamp) return false;
              const entryTime = new Date(entry.timestamp).getTime();
              return !isNaN(entryTime) && entryTime < packet.sessionStartedAt;
            });
          }
          CampaignManager.updateActiveCampaign({ sessionState: camp.sessionState, sessionLog: camp.sessionLog, log: camp.log });
        }
      }
      sessionLocalLog.length = 0;
      renderSessionFeed();
      if (typeof updateGameSessionUI === 'function') {
        updateGameSessionUI(packet.sessionState);
      }
      if (typeof updateSessionRowUI === 'function') {
        updateSessionRowUI(packet.sessionState);
      }
      if (typeof showToast === 'function') {
        showToast(`Game Session #${packet.sessionNum || ''} was canceled by the GM.`, "warning");
      }
    });
  }

  // Interactive GM Push Character Sheet Modal Handshake
  function showGMPushAcceptModal(packet) {
    const modal = document.getElementById("gmPushAcceptModal");
    const body = document.getElementById("gmPushAcceptModalBody");
    const btnAccept = document.getElementById("btnAcceptPushSheet");
    const btnReject = document.getElementById("btnRejectPushSheet");
    if (!modal || !body) {
      if (confirm(`The GM has pushed a character sheet revision for "${packet.characterName}". Accept and make active?`)) {
        applyLoadedCharacter(packet.sheet);
      }
      return;
    }

    const timeStr = packet.versionTimestamp ? new Date(packet.versionTimestamp).toLocaleTimeString() : new Date().toLocaleTimeString();
    body.innerHTML = `
      <div>The GM has reviewed and pushed a character sheet revision for:</div>
      <div style="background: var(--bg-card); padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 6px;">
        <strong style="font-size: 15px; color: var(--accent-primary);">${escapeHtml(packet.characterName || 'Hero')}</strong><br>
        <span style="font-size: 12px; color: var(--text-muted);">Revision timestamp: ${timeStr}</span>
      </div>
      <div>Would you like to accept this sheet revision and make it your active editor character?</div>
    `;

    modal.classList.add("active");

    if (btnAccept) {
      btnAccept.onclick = () => {
        applyLoadedCharacter(packet.sheet);
        modal.classList.remove("active");
        if (typeof showToast === 'function') showToast("Accepted and loaded GM character update!", "success");
      };
    }

    if (btnReject) {
      btnReject.onclick = () => {
        modal.classList.remove("active");
        if (typeof showToast === 'function') showToast("Kept current sheet.", "info");
      };
    }
  }

  // 2. Session UI Helpers
  function updateSilentModeUI() {
    const isSilent = typeof SessionNetwork !== 'undefined' ? SessionNetwork.isSilent() : false;
    if (btnSilentToggle) {
      btnSilentToggle.textContent = isSilent ? "🔇 Silent: ON" : "📡 Broadcast: ON";
      btnSilentToggle.style.color = isSilent ? "#f59e0b" : "";
    }
  }

  function updateSessionConnectionUI(info) {
    const status = info?.status || (typeof SessionNetwork !== 'undefined' ? SessionNetwork.getStatus().status : "disconnected");
    if (!lblStatus) return;

    if (status === "connected") {
      lblStatus.textContent = "🟢 Logged In";
      lblStatus.style.borderColor = "#10b981";
      lblStatus.style.color = "#10b981";
      lblStatus.style.background = "rgba(16, 185, 129, 0.15)";
      if (btnConnect) {
        btnConnect.textContent = "🚪 Log Out";
        btnConnect.classList.remove("btn-primary");
        btnConnect.classList.add("btn-secondary");
      }
      if (lblMsg) lblMsg.textContent = info?.detail || "Logged into campaign.";
    } else if (status === "waiting_approval") {
      lblStatus.textContent = "🟡 Waiting Approval";
      lblStatus.style.borderColor = "#f59e0b";
      lblStatus.style.color = "#f59e0b";
      lblStatus.style.background = "rgba(245, 158, 11, 0.15)";
      if (btnConnect) btnConnect.textContent = "✕ Cancel Login";
      if (lblMsg) lblMsg.textContent = info?.detail || "Waiting for GM to approve...";
    } else if (status === "connecting") {
      lblStatus.textContent = "🔵 Logging In...";
      lblStatus.style.borderColor = "#0284c7";
      lblStatus.style.color = "#0284c7";
      lblStatus.style.background = "rgba(2, 132, 199, 0.15)";
      if (btnConnect) btnConnect.textContent = "✕ Cancel";
      if (lblMsg) lblMsg.textContent = info?.detail || "Connecting...";
    } else {
      lblStatus.textContent = "⚪ Logged Out / Standby";
      lblStatus.style.borderColor = "var(--border-color)";
      lblStatus.style.color = "var(--text-muted)";
      lblStatus.style.background = "var(--bg-panel)";
      if (btnConnect) {
        btnConnect.textContent = "🔑 Log In";
        btnConnect.classList.add("btn-primary");
        btnConnect.classList.remove("btn-secondary");
      }
      if (lblMsg) lblMsg.textContent = info?.detail || "";
    }
    if (typeof window.updateHeroPointsUseButtonState === 'function') {
      window.updateHeroPointsUseButtonState();
    }
  }

  // --- Search Engine Expression Parser ---
  function parseSearchExpression(query) {
    const raw = String(query || '').trim();
    if (!raw) return { phrases: [], excludes: [], tags: {}, terms: [] };

    const phrases = [];
    const excludes = [];
    const tags = {};
    const terms = [];

    // 1. Extract quoted phrases: "foo bar" or -"foo bar"
    const working = raw.replace(/(-?)"([^"]+)"/g, (match, neg, phrase) => {
      if (neg === '-') {
        excludes.push(phrase.toLowerCase().trim());
      } else {
        phrases.push(phrase.toLowerCase().trim());
      }
      return ' ';
    });

    // 2. Tokenize remaining words
    const tokens = working.split(/\s+/).filter(Boolean);
    tokens.forEach(tok => {
      if (tok.startsWith('-') && tok.length > 1) {
        excludes.push(tok.substring(1).toLowerCase());
      } else if (tok.includes(':')) {
        const idx = tok.indexOf(':');
        const key = tok.substring(0, idx).toLowerCase();
        const val = tok.substring(idx + 1).toLowerCase();
        if (key && val) {
          tags[key] = val;
        } else {
          terms.push(tok.toLowerCase());
        }
      } else {
        terms.push(tok.toLowerCase());
      }
    });

    return { phrases, excludes, tags, terms };
  }

  function matchesSearchExpression(item, expr) {
    const timeStr = item.timestamp ? new Date(item.timestamp).toLocaleTimeString() : '';
    const authorStr = `${item.characterName || ''} ${item.playerName || ''} ${item.author || ''}`.toLowerCase();
    const typeStr = `${item.rollType || item.type || ''}`.toLowerCase();
    const textStr = `${item.text || item.details || item.breakdown || item.expression || item.result || ''}`.toLowerCase();
    const fullHaystack = `${timeStr} ${authorStr} ${typeStr} ${textStr}`.toLowerCase();

    // Check tags
    if (expr.tags.from && !authorStr.includes(expr.tags.from)) return false;
    if (expr.tags.author && !authorStr.includes(expr.tags.author)) return false;
    if (expr.tags.type) {
      const tagT = expr.tags.type;
      if (tagT === 'attack' && !typeStr.includes('attack')) return false;
      if (tagT === 'save' && !typeStr.includes('save') && !typeStr.includes('toughness')) return false;
      if (tagT === 'check' && !typeStr.includes('check')) return false;
      if (tagT === 'chat' && item.type !== 'CHAT') return false;
      if (tagT === 'whisper' && (!item.isPrivate || item.type !== 'CHAT')) return false;
      if (tagT === 'hp') {
        const hasHp = (typeof item.hpBonus === 'number' && item.hpBonus > 0) ||
                      !!item.isHPRerolled ||
                      !!(item.hpAnnouncement && item.hpAnnouncement.trim()) ||
                      !!(item.rollType && (item.rollType.includes('+5 HP') || item.rollType.includes('HP Reroll') || item.rollType.includes('✨ HP'))) ||
                      item.type === 'HERO_POINT_SPENT';
        if (!hasHp) return false;
      }
    }

    // Check excludes
    for (const ex of expr.excludes) {
      if (fullHaystack.includes(ex)) return false;
    }

    // Check phrases
    for (const phr of expr.phrases) {
      if (!fullHaystack.includes(phr)) return false;
    }

    // Check plain terms
    for (const tm of expr.terms) {
      if (!fullHaystack.includes(tm)) return false;
    }

    return true;
  }

  window.parseSearchExpression = parseSearchExpression;
  window.matchesSearchExpression = matchesSearchExpression;
  window.formatLogLine = formatLogLine;

  // Format single-line Discord/Roll20-style entry
  function formatLogLine(item) {
    const time = item.timestamp ? new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '';
    const isLocalGM = (typeof CampaignManager !== 'undefined') ? CampaignManager.isDesignatedGM('local_player') : false;

    // 0. SYSTEM ANNOUNCEMENTS & GAME SESSION EVENTS
    if (item.type === 'SYSTEM' || item.type === 'SESSION_EVENT') {
      return `
        <div class="session-log-line log-type-system">
          <span class="log-time">[${time}]</span>
          <span class="badge" style="background: rgba(2, 132, 199, 0.2); color: var(--accent-primary); font-size: var(--font-size-fine-print, 12px); font-weight: bold;">📢 System</span>
          <span class="log-content">${escapeHtml(item.text || item.message || '')}</span>
        </div>
      `;
    }

    // 1. HERO POINT SPENT (Suppressed per user request: announced on rolls or not spent)
    if (item.type === 'HERO_POINT_SPENT') {
      return '';
    }

    // 2. CHAT & WHISPERS
    if (item.type === 'CHAT') {
      const author = item.author || item.authorCharacter || item.authorPlayer || 'User';
      const isWhisper = !!item.isPrivate;
      const recip = item.recipient || 'Someone';

      if (isWhisper) {
        const isMonitor = isLocalGM && item.authorPlayer !== 'GM' && recip.toLowerCase() !== 'gm';
        const prefix = isMonitor
          ? `🔒 <span class="badge log-whisper-badge">[GM Monitor]</span> (Whisper from ${escapeHtml(author)} to ${escapeHtml(recip)}):`
          : `🔒 <span class="badge log-whisper-badge">Whisper</span> (${escapeHtml(author)} ➔ ${escapeHtml(recip)}):`;

        return `
          <div class="session-log-line log-type-whisper">
            <span class="log-time">[${time}]</span>
            <span class="log-author" onclick="window.sessionInsertMention('${escapeHtml(author)}')">${prefix}</span>
            <span class="log-content">${escapeHtml(item.text)}</span>
          </div>
        `;
      }

      return `
        <div class="session-log-line">
          <span class="log-time">[${time}]</span>
          <span class="log-author" onclick="window.sessionInsertMention('${escapeHtml(author)}')">${escapeHtml(author)}:</span>
          <span class="log-content">${escapeHtml(item.text)}</span>
        </div>
      `;
    }

    // 3. DICE ROLLS & MECHANICS (Attacks, Checks, Saves)
    const author = item.characterName || 'Hero';
    const cleanSubPlayer = item.playerName ? item.playerName.replace(/\s*\(\s*PL\s*#?\d*\s*\)\*?/gi, '').trim() : '';
    const subPlayer = cleanSubPlayer ? ` (${cleanSubPlayer})` : '';
    const natClass = item.isNat20 ? 'log-nat20' : (item.isNat1 ? 'log-nat1' : '');
    const natBadge = item.isNat20 ? `<span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #10b981; font-weight: bold; font-size: var(--font-size-fine-print, 12px);">★ Nat 20</span>` : (item.isNat1 ? `<span class="badge" style="background: rgba(239, 68, 68, 0.2); color: #ef4444; font-weight: bold; font-size: var(--font-size-fine-print, 12px);">⚠️ Nat 1</span>` : '');
    const silentBadge = item.isSilent ? `<span class="badge log-silent-badge">🔇 Silent</span>` : '';

    const hasHpBonus = typeof item.hpBonus === 'number' && item.hpBonus > 0;
    const isHpReroll = !!item.isHPRerolled;
    const isHpType = !!(item.rollType && (item.rollType.includes('+5 HP') || item.rollType.includes('HP Reroll') || item.rollType.includes('✨ HP')));
    const isHpEnhanced = hasHpBonus || isHpReroll || isHpType;
    const hpClass = isHpEnhanced ? 'log-hp-enhanced' : '';
    let hpBadge = '';
    if (isHpReroll || (item.rollType && item.rollType.includes('HP Reroll'))) {
      hpBadge = `<span class="badge log-hp-roll-badge">✨ HP Reroll</span>`;
    }

    let resultHtml = '';
    if (item.result) {
      const isHit = item.result.toLowerCase().includes('hit') || item.result.toLowerCase().includes('success');
      const isFail = item.result.toLowerCase().includes('fail') || item.result.toLowerCase().includes('miss');
      const resClass = isHit ? 'log-result-hit' : (isFail ? 'log-result-fail' : '');
      resultHtml = ` — <span class="${resClass}">${escapeHtml(item.result)}</span>`;
    }

    // Clean rollType title (remove trailing "(+5 HP)" or "(HP Reroll)" so title isn't cluttered)
    const cleanRollType = (item.rollType || '')
      .replace(/\s*\(\s*✨?\s*\+?\d*\s*HP\s*\)/gi, '')
      .replace(/\s*\(\s*✨?\s*HP\s*Reroll\s*\)/gi, '')
      .trim();
    const rollLabel = cleanRollType ? `<strong>${escapeHtml(cleanRollType)}:</strong>` : '';

    // Shortened HP effect announcement appended directly after the roll message without "HP +" prefix
    let hpAnnouncementText = '';
    if (item.hpAnnouncement) {
      hpAnnouncementText = item.hpAnnouncement.replace(/\bHero Point\b/g, 'HP').replace(/^HP:\s*\+/i, '+').replace(/^HP\s*\+/i, '+');
    } else if (hasHpBonus) {
      hpAnnouncementText = `+${item.hpBonus} (Improve Roll)`;
    } else if (isHpReroll) {
      if (item.rerollInfo) {
        hpAnnouncementText = `HP Reroll: ${item.rerollInfo.replace(/\bHero Point\b/g, 'HP')}`;
      } else {
        hpAnnouncementText = `HP Reroll (min 11–20 floor)`;
      }
    } else if (item.rollType && item.rollType.includes('+5 HP')) {
      hpAnnouncementText = `+5 (Improve Roll)`;
    } else if (item.rollType && item.rollType.includes('HP Reroll')) {
      hpAnnouncementText = `HP Reroll (min 11–20 floor)`;
    }

    const hpAnnouncementHtml = hpAnnouncementText
      ? ` <span class="log-hp-announcement">[✨ ${escapeHtml(hpAnnouncementText)}]</span>`
      : '';

    let mathSnippet = '';
    if (item.breakdown) {
      const rawBreakdown = String(item.breakdown);
      const eqIdx = rawBreakdown.lastIndexOf('=');
      if (eqIdx !== -1) {
        const formulaPart = rawBreakdown.substring(0, eqIdx).trim();
        const totalPart = rawBreakdown.substring(eqIdx + 1).trim();
        mathSnippet = `<span class="log-roll-formula">${escapeHtml(formulaPart)}</span> <span style="font-weight: 600; color: var(--text-muted);">=</span> <strong class="log-total-result">${escapeHtml(totalPart)}</strong>`;
      } else {
        mathSnippet = `<span class="log-roll-formula">${escapeHtml(rawBreakdown)}</span>`;
      }
    } else {
      mathSnippet = `<strong class="log-total-result">${item.total !== undefined ? item.total : ''}</strong>`;
    }

    return `
      <div class="session-log-line ${natClass} ${hpClass}">
        <span class="log-time">[${time}]</span>
        ${silentBadge}
        ${natBadge}
        ${hpBadge}
        <span class="log-author" onclick="window.sessionInsertMention('${escapeHtml(author)}')">${escapeHtml(author)}${escapeHtml(subPlayer)}:</span>
        <span class="log-content">
          ${rollLabel} ${mathSnippet} ${hpAnnouncementHtml}${resultHtml}
        </span>
      </div>
    `;
  }

  function renderSessionFeed() {
    if (!logFeed) return;
    const items = sessionLocalLog;
    if (items.length === 0) {
      logFeed.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 12px; margin-top: 32px; font-style: italic;">No rolls or events recorded yet in this session. Type below or roll from your sheet!</div>`;
      return;
    }

    const parsedExpr = parseSearchExpression(sessionSearchQuery);

    const filtered = items.filter(item => {
      if (sessionCurrentFilter === "attack" && !item.rollType?.toLowerCase().includes("attack")) return false;
      if (sessionCurrentFilter === "save" && !item.rollType?.toLowerCase().includes("save") && !item.rollType?.toLowerCase().includes("toughness")) return false;
      if (sessionCurrentFilter === "check") {
        if (item.type !== "ROLL" && item.type !== "roll") return false;
        const rt = (item.rollType || "").toLowerCase();
        const tt = (item.title || "").toLowerCase();
        if (rt.includes("attack") || rt.includes("save") || rt.includes("toughness")) return false;
        const isCheck = rt.includes("check") || rt.includes("skill") || rt.includes("ability") || rt.includes("init") || tt.includes("check") || tt.includes("skill") || tt.includes("ability") || tt.includes("init") || rt.includes("dice") || (!rt && !tt);
        if (!isCheck) return false;
      }
      if (sessionCurrentFilter === "hp") {
        if (item.type !== "ROLL" && item.type !== "roll") return false;
        const hasHp = (typeof item.hpBonus === 'number' && item.hpBonus > 0) ||
                      !!item.isHPRerolled ||
                      !!(item.hpAnnouncement && item.hpAnnouncement.trim()) ||
                      !!(item.rollType && (item.rollType.includes('+5 HP') || item.rollType.includes('HP Reroll') || item.rollType.includes('✨ HP')));
        if (!hasHp) return false;
      }
      if (sessionCurrentFilter === "chat" && item.type !== "CHAT") return false;
      if (sessionCurrentFilter === "whisper" && (!item.isPrivate || item.type !== "CHAT")) return false;

      return matchesSearchExpression(item, parsedExpr);
    });

    if (filtered.length === 0) {
      logFeed.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 12px; margin-top: 32px; font-style: italic;">No rolls or messages match current search / filter.</div>`;
      return;
    }

    logFeed.innerHTML = filtered.map(formatLogLine).join('');

    // Auto-scroll to bottom of continuous feed
    logFeed.scrollTop = logFeed.scrollHeight;
  }

  // --- Spend Hero Point Handling ---
  window.sessionSpendHeroPoint = function(charId, details = '') {
    const spendDetail = details || 'Hero Point spent';

    // If spending for an NPC from campaign, automatically load into editor
    if (typeof CampaignManager !== 'undefined' && charId && charId !== 'local_hero' && charId !== 'local_player') {
      const camp = CampaignManager.getActiveCampaign();
      const npc = (camp?.npcs || []).find(n => n.id === charId || n.name === charId) ||
                  (camp?.encounterEnemies || []).find(e => e.id === charId || e.name === charId);
      if (npc && window.activeEditorNpcId !== npc.id && typeof window.gmLoadNpcToEditor === 'function') {
        window.gmLoadNpcToEditor(npc.id);
      }
    }
    const isRerollSpend = details && (details.toLowerCase().includes('reroll') || details.toLowerCase().includes('re-roll'));

    const isLocal = charId === 'local_hero' || charId === 'local_player' || !charId ||
      (typeof char !== 'undefined' && char && char.name && (
        (typeof charId === 'string' && charId.toLowerCase() === char.name.toLowerCase()) ||
        (char.id && charId === char.id)
      ));

    if (isLocal) {
      if (typeof char !== 'undefined' && char && (typeof char.heroPoints !== 'number' || isNaN(char.heroPoints))) {
        const hpInput = document.getElementById("heroPointsInput");
        const defaultHP = 1 + (char.effectiveFeats?.["Luck"] || char.feats?.["Luck"] || 0);
        const rawVal = hpInput ? parseInt(hpInput.value) : NaN;
        char.heroPoints = !isNaN(rawVal) ? Math.max(0, rawVal) : defaultHP;
      }
      const currentHP = (typeof char !== 'undefined' && char) ? (char.heroPoints || 0) : 0;
      if (currentHP <= 0) {
        if (typeof showToast === 'function') showToast("No Hero Points remaining to spend!", "warning");
        else alert("No Hero Points remaining to spend!");
        return;
      }
      char.heroPoints = Math.max(0, currentHP - 1);
      const hpInput = document.getElementById("heroPointsInput");
      if (hpInput) hpInput.value = char.heroPoints;
      const lblHP = document.getElementById("lblModalCurrentHP");
      if (lblHP) lblHP.textContent = char.heroPoints;
      if (typeof window.updateHeroPointsUseButtonState === 'function') {
        window.updateHeroPointsUseButtonState();
      }

      // If spending generically or for improve roll (and NOT for a reroll), queue +5 Improve Roll bonus for next check
      if (!isRerollSpend && !char._pendingHPReroll && (!char._pendingHPRollBonus || char._pendingHPRollBonus <= 0)) {
        if (!details || details === 'Hero Point spent' || details.includes('Improve Roll') || details.includes('+5')) {
          char._pendingHPRollBonus = 5;
        }
      }

      // Sync to active hero cache in localStorage
      try {
        const rawHero = localStorage.getItem('mm2e_active_editor_hero');
        const heroObj = rawHero ? JSON.parse(rawHero) : {};
        heroObj.name = char.name || 'Hero';
        heroObj.heroPoints = char.heroPoints;
        localStorage.setItem('mm2e_active_editor_hero', JSON.stringify(heroObj));
      } catch (e) {}

      // Sync to CampaignManager acceptedPlayers & savedCharacters
      if (typeof CampaignManager !== 'undefined') {
        const camp = CampaignManager.getActiveCampaign();
        if (camp) {
          if (Array.isArray(camp.acceptedPlayers)) {
            const p = camp.acceptedPlayers.find(pl => pl.id === 'local_hero' || pl.id === 'local_player' || (char && pl.characterName === char.name));
            if (p) {
              p.heroPoints = char.heroPoints;
              if (p.characterSummary) p.characterSummary.heroPoints = char.heroPoints;
              CampaignManager.updatePlayerConditions(p.id, p.currentBruises, p.conditions, char.heroPoints, p.currentInjured);
            }
          }
          if (Array.isArray(camp.savedCharacters)) {
            const sc = camp.savedCharacters.find(s => s.characterName === char.name || s.id === 'local_hero');
            if (sc) {
              sc.heroPoints = char.heroPoints;
              if (sc.characterData) sc.characterData.heroPoints = char.heroPoints;
              if (typeof CampaignManager.saveToStorage === 'function') CampaignManager.saveToStorage();
            }
          }
        }
      }

      const heroName = char.name || 'Hero';
      const isLocalGM = (typeof CampaignManager !== 'undefined') ? CampaignManager.isDesignatedGM('local_player') : false;
      const gmName = (typeof CampaignManager !== 'undefined' && CampaignManager.getGMUserName) ? CampaignManager.getGMUserName() : 'GM';
      const pName = isLocalGM && gmName !== 'GM' 
        ? gmName 
        : (char.playerName || (typeof localStorage !== 'undefined' ? localStorage.getItem("mm2e_player_name") : null) || (isLocalGM ? gmName : "Player"));
      const packetId = 'hp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
      const isConnected = (typeof SessionNetwork !== 'undefined' && SessionNetwork.getStatus().status === 'connected');

      if (isConnected) {
        SessionNetwork.sendHeroPointSpent(heroName, char.heroPoints, spendDetail, packetId, pName);
      }

      // If it's a non-roll action (Surge, Recovery, Escape, Inspiration, Avoid Death, etc.), announce in session log!
      const isRollSpend = spendDetail && (
        spendDetail.includes('Improve') || spendDetail.includes('+5') || spendDetail.includes('Roll') ||
        spendDetail.includes('Skill') || spendDetail.includes('Attack') || spendDetail.includes('Save') ||
        spendDetail.includes('Ability') || spendDetail.includes('Initiative')
      );
      if (!isRollSpend && !isRerollSpend) {
        const logItem = {
          type: 'SESSION_EVENT',
          timestamp: Date.now(),
          characterName: heroName,
          playerName: pName,
          message: `${heroName} expended 1 Hero Point: ${spendDetail} (${char.heroPoints} HP remaining)`
        };
        if (typeof CampaignManager !== 'undefined' && typeof CampaignManager.addLogEntry === 'function') {
          CampaignManager.addLogEntry(logItem);
        }
        if (typeof SessionNetwork !== 'undefined' && typeof SessionNetwork.sendLocalBroadcast === 'function') {
          SessionNetwork.sendLocalBroadcast({ type: 'SESSION_LOG_ENTRY', entry: logItem });
        }
      }

      if (typeof syncPartyRosterUI === 'function') syncPartyRosterUI();
      if (typeof showToast === 'function') {
        if (char._pendingHPRollBonus > 0) {
          showToast(`🎯 Expended 1 Hero Point! +5 bonus queued for your next check (${char.heroPoints} HP remaining)`, "info");
        } else if (isRerollSpend) {
          showToast(`Expended 1 Hero Point for Reroll! (${char.heroPoints} remaining)`, "info");
        } else {
          showToast(`Expended 1 Hero Point! (${char.heroPoints} remaining)`, "info");
        }
      }
    } else {
      // GM or Session spending on behalf of player, saved character, or NPC
      if (typeof CampaignManager === 'undefined') return;
      const camp = CampaignManager.getActiveCampaign();
      const player = (camp?.acceptedPlayers || []).find(p => p.id === charId || p.characterName === charId);
      const npc = (camp?.npcs || []).find(n => n.id === charId || n.name === charId);
      const savedChar = (camp?.savedCharacters || []).find(sc => sc.id === charId || sc.characterName === charId);
      const target = player || npc || savedChar;
      if (target) {
        const currentTargetHP = target.heroPoints !== undefined 
          ? target.heroPoints 
          : (target.characterData?.heroPoints !== undefined ? target.characterData.heroPoints : 1);
        if (currentTargetHP <= 0) {
          const cName = target.characterName || target.name || 'Character';
          if (typeof showToast === 'function') showToast(`No Hero Points remaining for ${cName}!`, "warning");
          return;
        }
        const hp = Math.max(0, currentTargetHP - 1);
        target.heroPoints = hp;

        if (player) {
          if (player.characterSummary) player.characterSummary.heroPoints = hp;
          CampaignManager.updatePlayerConditions(player.id, player.currentBruises, player.conditions, hp, player.currentInjured);
          if (typeof char !== 'undefined' && char && (char.name === player.characterName || player.id === 'local_player')) {
            char.heroPoints = hp;
            const hpInput = document.getElementById("heroPointsInput");
            if (hpInput) hpInput.value = hp;
            if (typeof window.updateHeroPointsUseButtonState === 'function') window.updateHeroPointsUseButtonState();
            if (!isRerollSpend && !char._pendingHPReroll && (!char._pendingHPRollBonus || char._pendingHPRollBonus <= 0)) {
              if (!details || details === 'Hero Point spent' || details.includes('Improve Roll') || details.includes('+5')) {
                char._pendingHPRollBonus = 5;
              }
            }
          }
        } else if (npc) {
          npc.heroPoints = hp;
          if (npc.characterData) {
            npc.characterData.heroPoints = hp;
          }
          if (window.activeEditorNpcId === npc.id && typeof char !== 'undefined' && char) {
            char.heroPoints = hp;
            const hpInput = document.getElementById("heroPointsInput");
            if (hpInput) hpInput.value = hp;
            if (typeof window.updateHeroPointsUseButtonState === 'function') window.updateHeroPointsUseButtonState();
          }
          if (!isRerollSpend && !npc._pendingHPReroll && (!npc._pendingHPRollBonus || npc._pendingHPRollBonus <= 0)) {
            if (!details || details === 'Hero Point spent' || details.includes('Improve Roll') || details.includes('+5')) {
              npc._pendingHPRollBonus = 5;
              if (npc.characterData) npc.characterData._pendingHPRollBonus = 5;
            }
          }
          if (typeof CampaignManager.saveToStorage === 'function') {
            CampaignManager.saveToStorage();
          }
        } else if (savedChar) {
          savedChar.heroPoints = hp;
          if (savedChar.characterData) {
            savedChar.characterData.heroPoints = hp;
          }
          if (typeof char !== 'undefined' && char && char.name === savedChar.characterName) {
            char.heroPoints = hp;
            const hpInput = document.getElementById("heroPointsInput");
            if (hpInput) hpInput.value = hp;
            if (typeof window.updateHeroPointsUseButtonState === 'function') window.updateHeroPointsUseButtonState();
          }
          if (typeof CampaignManager.saveToStorage === 'function') {
            CampaignManager.saveToStorage();
          }
        }

        const lblHP = document.getElementById("lblModalCurrentHP");
        if (lblHP && (window.activeHPTargetCharId === charId || !window.activeHPTargetCharId)) lblHP.textContent = hp;

        const charName = target.characterName || target.name || 'Character';
        const gmName = (typeof CampaignManager !== 'undefined' && CampaignManager.getGMUserName) ? CampaignManager.getGMUserName() : 'GM';
        const pName = target.playerName || (player ? 'Player' : gmName);
        const packetId = 'hp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
        const isConnected = (typeof SessionNetwork !== 'undefined' && SessionNetwork.getStatus().status === 'connected');

        if (isConnected) {
          SessionNetwork.sendHeroPointSpent(charName, hp, spendDetail, packetId, pName);
          if (player) {
            SessionNetwork.sendGMStatusOverride(player.id, {
              characterName: player.characterName,
              bruises: player.currentBruises,
              injured: player.currentInjured,
              conditions: player.conditions,
              heroPoints: hp
            });
          }
        }
        if (typeof syncPartyRosterUI === 'function') syncPartyRosterUI();
        if (typeof showToast === 'function') {
          showToast(`Expended 1 Hero Point for ${charName}! (${hp} remaining)`, "info");
        }
      }
    }
  };

  // --- Party & Character Tracker UI (Top section of Session Tab) ---
  function syncPartyRosterUI() {
    const tableRoster = document.getElementById("tbodySessionPartyRoster");
    if (!tableRoster || typeof CampaignManager === 'undefined') return;
    const camp = CampaignManager.getActiveCampaign();
    if (!camp) return;

    const roster = [];
    const designatedGMId = CampaignManager.getGMPlayerId();
    const isNetworkClient = (typeof SessionNetwork !== 'undefined') && SessionNetwork.getStatus().role === 'CLIENT';
    const isLocalGM = !isNetworkClient && CampaignManager.isDesignatedGM('local_player');

    const includeGmChar = (typeof CampaignManager.isGmCharIncludedInParty === 'function' && CampaignManager.isGmCharIncludedInParty())
      || ((typeof localStorage !== 'undefined') && localStorage.getItem("mm2e_include_gm_char_in_party") === "true");

    if (lblToggleGMIncludeChar) {
      lblToggleGMIncludeChar.style.display = isLocalGM ? "inline-flex" : "none";
    }
    if (chkGMIncludeCharInParty) {
      chkGMIncludeCharInParty.checked = includeGmChar;
    }

    const excludedIds = (typeof CampaignManager.getExcludedPartyIds === 'function')
      ? CampaignManager.getExcludedPartyIds()
      : ((camp && Array.isArray(camp.excludedPartyIds)) ? camp.excludedPartyIds : []);
    const partyIds = (typeof CampaignManager.getPartyCharacterIds === 'function') ? CampaignManager.getPartyCharacterIds() : [];
    const hasExplicitParty = partyIds && partyIds.length > 0;

    // Check if local hero is in party
    const isEditingNpc = !!window.activeEditorNpcId;
    const isLocalHeroExcluded = excludedIds.includes('local_hero')
      || (char && char.name && excludedIds.includes(char.name))
      || (camp.excludeLocalHero === true)
      || ((typeof localStorage !== 'undefined') && localStorage.getItem("mm2e_exclude_local_hero_from_party") === "true");

    let isLocalHeroInParty = false;
    if (!isLocalHeroExcluded) {
      if (hasExplicitParty) {
        isLocalHeroInParty = partyIds.includes('local_hero') || (char && partyIds.includes(char.name)) || (isLocalGM && includeGmChar);
      } else {
        if (isLocalGM) {
          isLocalHeroInParty = includeGmChar;
        } else {
          isLocalHeroInParty = true;
        }
      }
    }

    const shouldIncludeLocalHero = isLocalHeroInParty && !!(char && char.name);

    const configuredGM = (typeof CampaignManager !== 'undefined' && CampaignManager.getGMUserName) ? CampaignManager.getGMUserName() : null;
    const accountObj = (typeof CampaignManager !== 'undefined' && CampaignManager.getUserAccount) ? CampaignManager.getUserAccount() : null;
    const localSavedName = (typeof localStorage !== 'undefined') ? localStorage.getItem("mm2e_player_name") : null;
    const localCharPlayer = (typeof char !== 'undefined' && char && char.playerName) ? char.playerName : null;

    let resolvedGMName = 'GM';
    if (configuredGM && configuredGM.trim() && configuredGM.trim() !== 'GM') {
      resolvedGMName = configuredGM.trim();
    } else if (accountObj && accountObj.userName && accountObj.userName.trim() && accountObj.userName.trim() !== 'GM') {
      resolvedGMName = accountObj.userName.trim();
    } else if (localSavedName && localSavedName.trim() && localSavedName.trim() !== 'GM') {
      resolvedGMName = localSavedName.trim();
    } else if (localCharPlayer && localCharPlayer.trim() && localCharPlayer.trim() !== 'GM') {
      resolvedGMName = localCharPlayer.trim();
    }

    // 1. Current local hero
    if (shouldIncludeLocalHero) {
      if (isEditingNpc) {
        // When editing an NPC, never push that NPC as a local hero (prevents duplicate roster entries).
        // If the GM's primary sheet was stashed and includeGmChar is true, push the GM hero.
        if (includeGmChar && window.__gmPrimaryHeroSheet) {
          const gmSheet = window.__gmPrimaryHeroSheet.character || window.__gmPrimaryHeroSheet;
          if (gmSheet && gmSheet.name) {
            const effFeats = gmSheet.effectiveFeats || gmSheet.feats || {};
            const impInit = effFeats["Improved Initiative"] || 0;
            const dexMod = (gmSheet.abilities?.DEX || 0);
            const localInitMod = (gmSheet.derivedStats && typeof gmSheet.derivedStats.initiative === 'number')
              ? gmSheet.derivedStats.initiative
              : (dexMod + (impInit * 4));
            const localInitRoll = gmSheet.trackerState?.initiativeRoll ?? null;

            roster.push({
              id: "local_hero",
              isLocal: true,
              isNPC: false,
              isGM: isLocalGM,
              sheetHistoryCount: 1,
              playerName: `${resolvedGMName} (GM Hero)`,
              characterName: gmSheet.name,
              initiativeMod: localInitMod,
              initiativeRoll: localInitRoll,
              powerLevel: gmSheet.powerLevel || 10,
              defense: gmSheet.combat?.DEF || 0,
              toughness: (gmSheet.derivedStats && typeof gmSheet.derivedStats.toughness === 'number')
                ? gmSheet.derivedStats.toughness
                : ((gmSheet.purchasedResistances?.Toughness || 0) + (gmSheet.abilities?.CON || 0)),
              bruises: gmSheet.trackerState?.conditions?.Bruised || 0,
              injured: gmSheet.trackerState?.conditions?.Injured || 0,
              conditions: gmSheet.trackerState?.conditions || {},
              heroPoints: (typeof gmSheet.heroPoints === 'number' && !isNaN(gmSheet.heroPoints)) ? gmSheet.heroPoints : 1,
              isSilent: false
            });
          }
        }
      } else {
        let localUserName;
        if (isLocalGM) {
          localUserName = resolvedGMName;
        } else {
          localUserName = (char.playerName && char.playerName.trim())
            || accountObj?.userName
            || localStorage.getItem("mm2e_player_name")
            || "You";
        }
        const isSilenced = (typeof SessionNetwork !== 'undefined' ? SessionNetwork.isSilent() : (CampaignManager.isCharacterSilent("local_hero") || CampaignManager.isCharacterSilent(char.name)));
        const effFeats = char.effectiveFeats || char.feats || {};
        const impInit = effFeats["Improved Initiative"] || 0;
        const dexMod = (typeof char.getAbilityRank === 'function')
          ? (char.getAbilityRank("DEX") !== null ? char.getAbilityRank("DEX") : -5)
          : (char.abilities?.DEX || 0);
        const localInitMod = (char.derivedStats && typeof char.derivedStats.initiative === 'number')
          ? char.derivedStats.initiative
          : (dexMod + (impInit * 4));
        const localInitRoll = (char.trackerState && char.trackerState.initiativeRoll !== null && char.trackerState.initiativeRoll !== undefined)
          ? char.trackerState.initiativeRoll
          : null;

        roster.push({
          id: "local_hero",
          isLocal: true,
          isNPC: false,
          isGM: isLocalGM,
          sheetHistoryCount: 1,
          playerName: `${localUserName} (Local Sheet)`,
          characterName: char.name,
          initiativeMod: localInitMod,
          initiativeRoll: localInitRoll,
          powerLevel: char.powerLevel || 10,
          defense: char.combat?.DEF || 0,
          toughness: (char.derivedStats && typeof char.derivedStats.toughness === 'number')
            ? char.derivedStats.toughness
            : ((char.purchasedResistances?.Toughness || 0) + (typeof char.getAbilityRank === 'function' ? (char.getAbilityRank("CON") || 0) : 0)),
          bruises: char.trackerState?.conditions?.Bruised || 0,
          injured: char.trackerState?.conditions?.Injured || 0,
          conditions: char.trackerState?.conditions || {},
          heroPoints: (typeof char.heroPoints === 'number' && !isNaN(char.heroPoints)) ? char.heroPoints : (1 + (char.effectiveFeats?.["Luck"] || char.feats?.["Luck"] || 0)),
          isSilent: isSilenced
        });
      }
    }

    // 2. Connected/Approved Players
    (camp.acceptedPlayers || []).forEach(p => {
      const isAlreadyRepresentedByLocalHero = shouldIncludeLocalHero && !isLocalGM && (p.characterName === char?.name || p.id === 'local_hero');
      if (!isAlreadyRepresentedByLocalHero) {
        const isExcluded = excludedIds.includes(p.id) || (p.characterName && excludedIds.includes(p.characterName)) || (p.playerName && excludedIds.includes(p.playerName));
        const isPlayerInParty = !isExcluded && (hasExplicitParty
          ? (partyIds.includes(p.id) || partyIds.includes(p.characterName) || (p.playerName && partyIds.includes(p.playerName)))
          : true);

        if (isPlayerInParty) {
          const histCount = Array.isArray(p.sheetHistory) ? p.sheetHistory.length : (p.characterSheet ? 1 : 0);
          const isSilenced = CampaignManager.isCharacterSilent(p.id) || CampaignManager.isCharacterSilent(p.characterName);
          const pInitMod = p.characterSummary?.initiative !== undefined
            ? p.characterSummary.initiative
            : (p.characterSheet?.derivedStats?.initiative ?? ((p.characterSheet?.abilities?.DEX || 0) + ((p.characterSheet?.feats?.['Improved Initiative'] || 0) * 4)));
          const pInitRoll = p.characterSummary?.initiativeRoll !== undefined ? p.characterSummary.initiativeRoll : (p.initiativeRoll ?? null);

          roster.push({
            id: p.id,
            isLocal: false,
            isNPC: false,
            isGM: designatedGMId === p.id,
            sheetHistoryCount: histCount,
            playerName: (p.playerName && p.playerName !== 'GM' ? p.playerName : (designatedGMId === p.id ? resolvedGMName : (p.playerName || 'Player'))).replace(/\s*\(\s*PL\s*#?\d*\s*\)\*?/gi, '').trim(),
            characterName: p.characterName,
            initiativeMod: pInitMod,
            initiativeRoll: pInitRoll,
            powerLevel: p.characterSummary?.powerLevel || 10,
            defense: p.characterSummary?.defense || 10,
            toughness: p.characterSummary?.toughness || 10,
            bruises: p.currentBruises || 0,
            injured: p.currentInjured || 0,
            conditions: p.conditions || {},
            heroPoints: p.heroPoints !== undefined ? p.heroPoints : 1,
            isSilent: isSilenced
          });
        }
      }
    });

    // 3. Saved Campaign Characters in party (if not online)
    if (hasExplicitParty) {
      (camp.savedCharacters || []).forEach(sc => {
        const isExcluded = excludedIds.includes(sc.id) || (sc.characterName && excludedIds.includes(sc.characterName));
        const isInParty = !isExcluded && (partyIds.includes(sc.id) || partyIds.includes(sc.characterName));
        if (isInParty) {
          const alreadyInRoster = roster.some(r => r.characterName === sc.characterName || r.id === sc.id || (sc.ownerPlayerId && r.id === sc.ownerPlayerId));
          if (!alreadyInRoster) {
            const isSilenced = CampaignManager.isCharacterSilent(sc.id) || CampaignManager.isCharacterSilent(sc.characterName);
            const scInitMod = sc.characterData?.derivedStats?.initiative !== undefined
              ? sc.characterData.derivedStats.initiative
              : ((sc.characterData?.abilities?.DEX || 0) + ((sc.characterData?.feats?.['Improved Initiative'] || 0) * 4));
            
            roster.push({
              id: sc.id,
              isLocal: false,
              isNPC: false,
              isGM: false,
              isSavedOffline: true,
              sheetHistoryCount: 1,
              playerName: `${sc.playerName} (Offline)`,
              characterName: sc.characterName,
              initiativeMod: scInitMod,
              initiativeRoll: null,
              powerLevel: sc.powerLevel || sc.characterData?.powerLevel || 10,
              defense: sc.characterData?.combat?.DEF || 10,
              toughness: (sc.characterData?.purchasedResistances?.Toughness || 0) + (sc.characterData?.abilities?.CON || 0),
              bruises: sc.characterData?.trackerState?.conditions?.Bruised || 0,
              injured: sc.characterData?.trackerState?.conditions?.Injured || 0,
              conditions: sc.characterData?.trackerState?.conditions || {},
              heroPoints: (typeof sc.characterData?.heroPoints === 'number') ? sc.characterData.heroPoints : (sc.heroPoints !== undefined ? sc.heroPoints : 1),
              isSilent: isSilenced
            });
          }
        }
      });
    }

    // 4. Attached Party NPCs
    (camp.npcs || []).forEach(n => {
      const isExcluded = excludedIds.includes(n.id) || (n.name && excludedIds.includes(n.name));
      if (isExcluded) return;
      const isCurrentlyInEditor = isEditingNpc && (n.id === window.activeEditorNpcId);
      const liveChar = isCurrentlyInEditor ? char : null;

      const isSilenced = CampaignManager.isCharacterSilent(n.id);
      const nInitMod = liveChar
        ? ((liveChar.derivedStats && typeof liveChar.derivedStats.initiative === 'number')
            ? liveChar.derivedStats.initiative
            : (((typeof liveChar.getAbilityRank === 'function' ? liveChar.getAbilityRank("DEX") : liveChar.abilities?.DEX) || 0) + (((liveChar.effectiveFeats || liveChar.feats || {})["Improved Initiative"] || 0) * 4)))
        : (n.characterData?.derivedStats?.initiative !== undefined
            ? n.characterData.derivedStats.initiative
            : ((n.characterData?.abilities?.DEX || 0) + ((n.characterData?.feats?.['Improved Initiative'] || 0) * 4)));
      const nInitRoll = liveChar
        ? (liveChar.trackerState?.initiativeRoll ?? (n.characterData?.trackerState?.initiativeRoll ?? n.initiativeRoll ?? null))
        : (n.characterData?.trackerState?.initiativeRoll ?? (n.initiativeRoll ?? null));

      const npcOwner = resolvedGMName;

      roster.push({
        id: n.id,
        isLocal: false,
        isNPC: true,
        isGM: false,
        isInEditor: isCurrentlyInEditor,
        sheetHistoryCount: 1,
        playerName: `${npcOwner} (NPC)`,
        characterName: n.name,
        initiativeMod: nInitMod,
        initiativeRoll: nInitRoll,
        powerLevel: liveChar ? (liveChar.powerLevel || n.powerLevel || 10) : (n.powerLevel || 10),
        defense: liveChar ? (liveChar.combat?.DEF || 10) : (n.characterData?.combat?.DEF || 10),
        toughness: liveChar
          ? ((liveChar.derivedStats && typeof liveChar.derivedStats.toughness === 'number')
              ? liveChar.derivedStats.toughness
              : ((liveChar.purchasedResistances?.Toughness || 0) + (typeof liveChar.getAbilityRank === 'function' ? (liveChar.getAbilityRank("CON") || 0) : 0)))
          : ((n.characterData?.purchasedResistances?.Toughness || 0) + (n.characterData?.abilities?.CON || 0)),
        bruises: liveChar ? (liveChar.trackerState?.conditions?.Bruised || 0) : (n.currentBruises || 0),
        injured: liveChar ? (liveChar.trackerState?.conditions?.Injured || 0) : (n.currentInjured || 0),
        conditions: liveChar ? (liveChar.trackerState?.conditions || {}) : (n.conditions || {}),
        heroPoints: liveChar
          ? ((typeof liveChar.heroPoints === 'number' && !isNaN(liveChar.heroPoints)) ? liveChar.heroPoints : 0)
          : ((typeof n.heroPoints === 'number') ? n.heroPoints : (typeof n.characterData?.heroPoints === 'number' ? n.characterData.heroPoints : 0)),
        isSilent: isSilenced
      });
    });

    let rowsHtml = roster.map(item => {
      const activeCondKeys = Object.keys(item.conditions || {}).filter(k => {
        return !!item.conditions[k] && k !== 'Bruised' && k !== 'Injured';
      });

      const pillsHtml = activeCondKeys.length > 0
        ? activeCondKeys.map(c => `
            <span class="gm-active-cond-pill" onclick="window.gmToggleCondition('${item.id}', ${item.isNPC}, '${c}')" title="Click to remove ${c}">
              ${c} <span class="cond-remove-x">✕</span>
            </span>
          `).join('')
        : `<span class="gm-cond-normal">Normal</span>`;

      const condPickerHtml = `
        <select class="gm-add-cond-select" onchange="window.gmAddConditionSelect('${item.id}', ${item.isNPC}, this)" title="Add condition to ${item.characterName}">
          <option value="" selected disabled>+ Condition</option>
          <optgroup label="Damage &amp; Fatigue">
            <option value="Dazed">Dazed</option>
            <option value="Staggered">Staggered</option>
            <option value="Disabled">Disabled</option>
            <option value="Unconscious">Unconscious</option>
            <option value="Fatigued">Fatigued</option>
            <option value="Exhausted">Exhausted</option>
            <option value="Dying">Dying</option>
            <option value="Dead">Dead</option>
          </optgroup>
          <optgroup label="Tactical &amp; Impairment">
            <option value="Stunned">Stunned</option>
            <option value="Paralyzed">Paralyzed</option>
            <option value="Blind">Blind</option>
            <option value="Deaf">Deaf</option>
            <option value="Prone">Prone</option>
            <option value="Bound">Bound</option>
            <option value="Entangled">Entangled</option>
            <option value="Flat-Footed">Flat-Footed</option>
            <option value="Helpless">Helpless</option>
            <option value="Nauseated">Nauseated</option>
            <option value="Panicked">Panicked</option>
            <option value="Pinned">Pinned</option>
            <option value="Shaken">Shaken</option>
            <option value="Sickened">Sickened</option>
            <option value="Slowed">Slowed</option>
            <option value="Fascinated">Fascinated</option>
          </optgroup>
          <optgroup label="Combat States">
            <option value="Stable">Stable</option>
            <option value="Total Defense">Total Defense</option>
            <option value="Invisible">Invisible</option>
          </optgroup>
        </select>
      `;

      const clearAllHtml = activeCondKeys.length > 0
        ? `<button type="button" class="gm-cond-clear-btn" onclick="window.gmClearAllConditions('${item.id}', ${item.isNPC})" title="Clear all conditions for ${item.characterName}">↺</button>`
        : '';

      const silencedClass = item.isSilent ? 'char-silenced' : '';
      const muteIcon = item.isSilent ? `<span class="char-mute-icon" title="Logged roll output muted">🔇</span>` : '';

      const initModStr = item.initiativeMod >= 0 ? `+${item.initiativeMod}` : `${item.initiativeMod}`;
      const initRollDisplay = (item.initiativeRoll !== null && item.initiativeRoll !== undefined)
        ? `<strong style="font-size: 15px; color: var(--accent-primary); line-height: 1.1;">${item.initiativeRoll}</strong><div style="font-size: var(--font-size-fine-print); color: var(--text-muted);">${initModStr} mod</div>`
        : `<strong style="font-size: 13px;">${initModStr}</strong>`;
      const localRollBtn = item.isLocal
        ? `<button type="button" class="btn btn-secondary" onclick="window.rollInitiativeCheck()" title="Roll Initiative Check" style="padding: 1px 4px; font-size: 10px; margin-top: 2px; height: 18px; line-height: 1; max-width: 48px; width: 100%;">🎲 Roll</button>`
        : '';

      const canRemoveFromParty = isLocalGM || item.isLocal || (char && char.name === item.characterName);
      const isControlled = isLocalGM || item.isLocal || (char && char.name && char.name.trim().toLowerCase() === (item.characterName || '').trim().toLowerCase());
      const isMyCharacter = item.isLocal || (char && char.name && char.name.trim().toLowerCase() === (item.characterName || '').trim().toLowerCase());

      const removeBtnHtml = canRemoveFromParty
        ? `
          <div class="gm-char-menu-divider"></div>
          <button type="button" class="gm-char-menu-item" style="color: #ef4444;" onclick="window.gmCloseAllCharMenus(); window.confirmRemoveCharacterFromParty('${item.id}', '${escapeHtml(item.characterName).replace(/'/g, "\\'")}', ${item.isNPC});">
            🚫 Remove from Party
          </button>
        `
        : '';

      const charNameHighlightStyle = isMyCharacter
        ? 'background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.45); border-radius: 4px; padding: 2px 6px; box-shadow: 0 0 4px rgba(99, 102, 241, 0.2);'
        : '';
      const youBadge = isMyCharacter
        ? `<span class="badge" style="background: var(--accent-primary); color: #fff; font-size: 10px; font-weight: 700; padding: 1px 5px; border-radius: 3px; letter-spacing: 0.5px; margin-left: 2px;">YOU</span>`
        : '';

      const inEditorBadge = item.isInEditor
        ? `<span class="badge" style="background: rgba(2, 132, 199, 0.2); color: #0284c7; border: 1px solid #0284c7; font-size: 10px; font-weight: 700; padding: 1px 5px; border-radius: 3px; letter-spacing: 0.5px; margin-left: 2px;" title="Currently loaded in editor">IN EDITOR</span>`
        : '';

      let nameAndMenuHtml = '';
      if (isControlled) {
        nameAndMenuHtml = `
          <div class="gm-char-menu-wrapper" style="position: relative; display: inline-block;">
            <button type="button" class="gm-char-name-btn" onclick="window.gmToggleCharMenu(event, '${item.id}')" title="Click for actions, HP options, or sheet operations" style="${charNameHighlightStyle} border: ${isMyCharacter ? '1px solid rgba(99, 102, 241, 0.45)' : 'none'}; background: ${isMyCharacter ? 'rgba(99, 102, 241, 0.12)' : 'none'}; font-weight: 700; font-size: 13px; color: var(--accent-primary); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
              ${escapeHtml(item.characterName)} ${youBadge} ${inEditorBadge} ${muteIcon} <span style="font-size: var(--font-size-fine-print); opacity: 0.7;">▾</span>
            </button>
            <div id="gmCharMenu_${item.id}" class="gm-char-dropdown-menu" style="display: none;">
              <button type="button" class="gm-char-menu-item" onclick="${item.isNPC ? `if (window.gmLoadNpcToEditor && window.activeEditorNpcId !== '${item.id}') window.gmLoadNpcToEditor('${item.id}'); ` : ''}window.openUseHeroPointModal('${item.id}'); window.gmCloseAllCharMenus();">
                ✨ Hero Point Options...
              </button>
              <div class="gm-char-menu-divider"></div>
              ${isLocalGM && !item.isLocal && !item.isNPC ? `
                <button type="button" class="gm-char-menu-item" onclick="window.gmPullSheet('${item.id}'); window.gmCloseAllCharMenus();">
                  📥 Pull Sheet to GM Editor
                </button>
                <button type="button" class="gm-char-menu-item" onclick="window.gmPushCurrentSheet('${item.id}'); window.gmCloseAllCharMenus();">
                  📤 Push Editor Sheet to Player
                </button>
              ` : ''}
              ${item.isNPC ? `
                ${window.activeEditorNpcId === item.id ? `
                  <button type="button" class="gm-char-menu-item" style="color: #0284c7; font-weight: bold;" onclick="window.gmReturnToPrimarySheet(); window.gmCloseAllCharMenus();">
                    ↩ Return to GM Sheet
                  </button>
                ` : `
                  <button type="button" class="gm-char-menu-item" onclick="window.gmLoadNpcToEditor('${item.id}'); window.gmCloseAllCharMenus();">
                    👁️ Load into Editor
                  </button>
                `}
                ${isLocalGM ? `
                  <button type="button" class="gm-char-menu-item" onclick="window.duplicateNPC('${item.id}'); window.gmCloseAllCharMenus();">
                    📋 Duplicate NPC
                  </button>
                ` : ''}
                <button type="button" class="gm-char-menu-item" onclick="window.gmExportCharSheet('${item.id}'); window.gmCloseAllCharMenus();">
                  💾 Export NPC (.mm2e)
                </button>
              ` : `
                ${window.activeEditorNpcId && (item.isGM || item.isLocal) ? `
                  <button type="button" class="gm-char-menu-item" style="color: #10b981; font-weight: bold;" onclick="window.gmReturnToPrimarySheet(); window.gmCloseAllCharMenus();">
                    👤 Return to GM Sheet
                  </button>
                  <div class="gm-char-menu-divider"></div>
                ` : ''}
                <button type="button" class="gm-char-menu-item" onclick="window.gmOpenCharHistory('${item.id}'); window.gmCloseAllCharMenus();">
                  📜 Version History (${item.sheetHistoryCount || 0})
                </button>
                <button type="button" class="gm-char-menu-item" onclick="window.gmExportCharSheet('${item.id}'); window.gmCloseAllCharMenus();">
                  💾 Export Sheet (.mm2e)
                </button>
              `}
              <div class="gm-char-menu-divider"></div>
              <button type="button" class="gm-char-menu-item" onclick="window.gmTogglePlayerSilentBtn('${item.id}'); window.gmCloseAllCharMenus();">
                ${item.isSilent ? '📡 Unmute Roll Output' : '🔇 Mute Roll Output'}
              </button>
              ${removeBtnHtml}
              <div class="gm-char-menu-divider"></div>
              <button type="button" class="gm-char-menu-item" style="color: var(--text-muted);" onclick="window.gmCloseAllCharMenus()">✕ Close Menu</button>
            </div>
          </div>
        `;
      } else {
        nameAndMenuHtml = `
          <div style="font-weight: 700; font-size: 13px; color: var(--text-main); display: inline-flex; align-items: center; gap: 4px; padding: 2px 0;">
            ${escapeHtml(item.characterName)} ${inEditorBadge} ${muteIcon}
          </div>
        `;
      }

      return `
        <tr class="${silencedClass}" style="border-bottom: 1px solid var(--border-color); background: ${item.isNPC ? 'rgba(2, 132, 199, 0.04)' : 'transparent'};">
          <td style="padding: 6px 10px;">
            ${nameAndMenuHtml}
            <div style="font-size: var(--font-size-fine-print); color: var(--text-muted); margin-top: 2px;">
              ${item.isNPC ? '<span class="badge" style="background: rgba(2, 132, 199, 0.15); color: #0284c7; font-size: var(--font-size-fine-print);">NPC</span>' : '<span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; font-size: var(--font-size-fine-print);">PC</span>'}
              ${escapeHtml((item.playerName || '').replace(/\s*\(\s*PL\s*#?\d*\s*\)\*?/gi, '').trim())} ${item.isGM ? '<span class="badge" style="background: rgba(234, 179, 8, 0.2); color: #eab308; font-weight: bold; font-size: var(--font-size-fine-print);">👑 GM</span>' : ''}
            </div>
          </td>
          <td style="width: 55px; text-align: center; vertical-align: middle; padding: 2px 4px;">
            <div style="display: inline-flex; flex-direction: column; align-items: center; justify-content: center;">
              ${initRollDisplay}
              ${localRollBtn}
            </div>
          </td>
          <td style="text-align: center; font-size: 13px;">
            <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); letter-spacing: 0.5px;">Power Level ${item.powerLevel}</div>
            <div style="color: var(--text-muted); font-size: var(--font-size-fine-print);">Def ${item.defense} / Tgh ${item.toughness}</div>
            <div style="margin-top: 4px;">
              <button type="button" class="btn-hp-roster-badge" onclick="${item.isNPC ? `if (window.gmLoadNpcToEditor && window.activeEditorNpcId !== '${item.id}') window.gmLoadNpcToEditor('${item.id}'); ` : ''}window.sessionSpendHeroPoint('${item.id}', 'Hero Point spent');" title="Click to spend 1 Hero Point for ${escapeHtml(item.characterName)} (${typeof item.heroPoints === 'number' ? item.heroPoints : 0} HP remaining)" style="background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.5); color: #f59e0b; border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease;">
                ⭐ ${typeof item.heroPoints === 'number' ? item.heroPoints : 0} HP
              </button>
            </div>
          </td>
          <td style="text-align: center; padding: 4px;">
            <div style="display: inline-flex; flex-direction: column; gap: 2px; align-items: center;">
              <div class="tracker-stepper" style="display: inline-flex; align-items: center; gap: 3px;" title="Bruised (Non-Lethal, -1 to saves)">
                <span style="font-size: var(--font-size-fine-print); min-width: 44px; text-align: right; color: var(--text-muted);">Bruised:</span>
                <button type="button" class="modifier-stepper-btn" onclick="window.gmStepBruises('${item.id}', ${item.isNPC}, 'Bruised', -1)">−</button>
                <span style="min-width: 18px; text-align: center; font-weight: bold; font-size: 13px; color: ${item.bruises > 0 ? '#f59e0b' : 'var(--text-main)'};">${item.bruises}</span>
                <button type="button" class="modifier-stepper-btn" onclick="window.gmStepBruises('${item.id}', ${item.isNPC}, 'Bruised', 1)">+</button>
              </div>
              <div class="tracker-stepper" style="display: inline-flex; align-items: center; gap: 3px;" title="Injured (Lethal, -1 to saves)">
                <span style="font-size: var(--font-size-fine-print); min-width: 44px; text-align: right; color: var(--text-muted);">Injured:</span>
                <button type="button" class="modifier-stepper-btn" onclick="window.gmStepBruises('${item.id}', ${item.isNPC}, 'Injured', -1)">−</button>
                <span style="min-width: 18px; text-align: center; font-weight: bold; font-size: 13px; color: ${item.injured > 0 ? '#ef4444' : 'var(--text-main)'};">${item.injured}</span>
                <button type="button" class="modifier-stepper-btn" onclick="window.gmStepBruises('${item.id}', ${item.isNPC}, 'Injured', 1)">+</button>
              </div>
            </div>
          </td>
          <td style="padding: 4px 8px;">
            <div style="display: flex; align-items: center; gap: 4px; flex-wrap: wrap;">
              ${pillsHtml}
              ${condPickerHtml}
              ${clearAllHtml}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    if (roster.length === 0) {
      rowsHtml = `
        <tr style="border-bottom: 1px dashed var(--border-color); height: 44px; opacity: 0.5;">
          <td colspan="5" style="text-align: center; color: var(--text-muted); font-size: var(--font-size-fine-print); padding: 12px; font-style: italic;">
            ${isLocalGM
              ? 'No player characters connected or party NPCs attached yet. Connected players will appear here automatically.'
              : 'No characters in party. Enter your user name above to log in, or load a hero into the editor.'}
          </td>
        </tr>
      `;
    }

    tableRoster.innerHTML = rowsHtml;
    try {
      localStorage.setItem('mm2e_party_roster_html', rowsHtml);
      localStorage.setItem('mm2e_party_roster_data', JSON.stringify(roster));
      localStorage.setItem('mm2e_party_roster_ts', Date.now().toString());
      if (char && char.name) {
        localStorage.setItem('mm2e_active_editor_hero', JSON.stringify({
          name: char.name,
          playerName: (char.playerName && char.playerName.trim()) || localStorage.getItem("mm2e_player_name") || "",
          powerLevel: char.powerLevel || 10,
          combat: char.combat || {},
          abilities: char.abilities || {},
          derivedStats: char.derivedStats || {},
          purchasedResistances: char.purchasedResistances || {},
          effectiveFeats: char.effectiveFeats || char.feats || {},
          trackerState: char.trackerState || { conditions: {} },
          heroPoints: (typeof char.heroPoints === 'number' && !isNaN(char.heroPoints)) ? char.heroPoints : 1
        }));
      }
    } catch (e) {}

    try {
      if (poppedOutPartyWindow && !poppedOutPartyWindow.closed && poppedOutPartyWindow.document) {
        const activeTheme = document.documentElement.getAttribute("data-theme") || "light";
        if (poppedOutPartyWindow.document.documentElement.getAttribute("data-theme") !== activeTheme) {
          poppedOutPartyWindow.document.documentElement.setAttribute("data-theme", activeTheme);
          if (poppedOutPartyWindow.document.body) poppedOutPartyWindow.document.body.setAttribute("data-theme", activeTheme);
          if (typeof poppedOutPartyWindow.__applySavedThemeAndFonts === 'function') {
            poppedOutPartyWindow.__applySavedThemeAndFonts();
          }
        }
        const popTable = poppedOutPartyWindow.document.getElementById("tbodySessionPartyRoster");
        if (popTable) popTable.innerHTML = rowsHtml;
      }
    } catch (e) {}
    try {
      if (typeof SessionNetwork !== 'undefined' && typeof SessionNetwork.sendLocalBroadcast === 'function') {
        SessionNetwork.sendLocalBroadcast({ type: 'PARTY_ROSTER_HTML', html: rowsHtml });
      }
    } catch (e) {}

    if (typeof updateSessionRowUI === 'function') {
      updateSessionRowUI();
    }
  }
  window.syncPartyRosterUI = syncPartyRosterUI;
  window.syncGMRosterUI = syncPartyRosterUI; // Backwards compatible alias

  window.performRemoveCharacterFromParty = function(id, charName, isNPC) {
    if (typeof window.gmCloseAllCharMenus === 'function') {
      window.gmCloseAllCharMenus();
    }
    try {
      if (poppedOutPartyWindow && !poppedOutPartyWindow.closed && typeof poppedOutPartyWindow.gmCloseAllCharMenus === 'function') {
        poppedOutPartyWindow.gmCloseAllCharMenus();
      }
    } catch (e) {}

    const safeName = charName || 'this character';

    if (isNPC) {
      if (window.activeEditorNpcId === id) {
        window.gmReturnToPrimarySheet();
      }
      if (typeof CampaignManager !== 'undefined') {
        if (typeof CampaignManager.removeNPC === 'function') CampaignManager.removeNPC(id);
        else if (typeof CampaignManager.removeNpc === 'function') CampaignManager.removeNpc(id);
        CampaignManager.removeCharacterFromParty(id);
        if (charName) CampaignManager.removeCharacterFromParty(charName);
      }
    } else {
      const isThisLocalHero = (id === 'local_hero') || (char && char.name && char.name === charName);
      if (isThisLocalHero) {
        try { localStorage.setItem("mm2e_exclude_local_hero_from_party", "true"); } catch (e) {}
        try { localStorage.setItem("mm2e_include_gm_char_in_party", "false"); } catch (e) {}
        if (typeof CampaignManager !== 'undefined') {
          CampaignManager.removeCharacterFromParty('local_hero');
          CampaignManager.setGmCharIncludedInParty(false);
          if (charName) CampaignManager.removeCharacterFromParty(charName);
          if (char && char.name) CampaignManager.removeCharacterFromParty(char.name);
        }
        if (chkGMIncludeCharInParty) {
          chkGMIncludeCharInParty.checked = false;
        }
      } else {
        if (typeof CampaignManager !== 'undefined') {
          CampaignManager.removeCharacterFromParty(id);
          if (charName) CampaignManager.removeCharacterFromParty(charName);
          if (typeof CampaignManager.removePlayer === 'function') {
            CampaignManager.removePlayer(id);
          }
        }
      }
    }

    // Check if network client or host
    const netStatus = (typeof SessionNetwork !== 'undefined') ? SessionNetwork.getStatus() : null;
    if (netStatus && netStatus.role === 'CLIENT') {
      SessionNetwork.broadcastPacket({
        type: 'PLAYER_LEAVE_PARTY',
        characterId: id,
        characterName: charName
      }, true);
    } else if (netStatus && netStatus.role === 'HOST') {
      const camp = CampaignManager.getActiveCampaign();
      if (camp) SessionNetwork.broadcastStateSync(camp);
    }

    syncPartyRosterUI();
    if (typeof renderGMCampaignCharacters === 'function') {
      renderGMCampaignCharacters();
    }
    if (typeof showToast === 'function') {
      showToast(`Removed "${safeName}" from the party roster.`, "info");
    }
  };

  window.confirmRemoveCharacterFromParty = function(id, charName, isNPC) {
    if (typeof window.gmCloseAllCharMenus === 'function') {
      window.gmCloseAllCharMenus();
    }
    try {
      if (poppedOutPartyWindow && !poppedOutPartyWindow.closed && typeof poppedOutPartyWindow.gmCloseAllCharMenus === 'function') {
        poppedOutPartyWindow.gmCloseAllCharMenus();
      }
    } catch (e) {}
    const safeName = charName || 'this character';
    if (!confirm(`Remove "${safeName}" from the active party roster?`)) {
      return;
    }
    window.performRemoveCharacterFromParty(id, charName, isNPC);
  };

  function updateSessionRowUI(state) {
    const s = state || getCurrentSessionState();
    const isNetworkClient = (typeof SessionNetwork !== 'undefined') && SessionNetwork.getStatus().role === 'CLIENT';
    const isLocalGM = !isNetworkClient && (typeof CampaignManager !== 'undefined' ? CampaignManager.isDesignatedGM('local_player') : false);
    const netStatus = (typeof SessionNetwork !== 'undefined') ? SessionNetwork.getStatus() : { status: 'disconnected', role: 'STANDALONE' };
    const camp = (typeof CampaignManager !== 'undefined') ? CampaignManager.getActiveCampaign() : null;

    // 1. User Identity & Role Badge
    const lblUser = document.getElementById("lblSessionUserRoleBadge");
    if (lblUser) {
      const acc = (typeof CampaignManager !== 'undefined') ? CampaignManager.getUserAccount() : null;
      const currentUserName = acc?.userName || (char && char.playerName) || localStorage.getItem("mm2e_player_name") || "Player";
      if (isLocalGM) {
        const gmName = (typeof CampaignManager !== 'undefined') ? CampaignManager.getGMUserName() : "GM";
        lblUser.innerHTML = `👑 GM: <strong>${escapeHtml(gmName)}</strong>`;
        lblUser.style.color = "#eab308";
        lblUser.style.borderColor = "#eab308";
        lblUser.style.background = "rgba(234, 179, 8, 0.15)";
        lblUser.title = "You are hosting as the Game Master";
      } else {
        lblUser.innerHTML = `👤 <strong>${escapeHtml(currentUserName)}</strong>`;
        lblUser.style.color = "#10b981";
        lblUser.style.borderColor = "#10b981";
        lblUser.style.background = "rgba(16, 185, 129, 0.15)";
        lblUser.title = `Your player identity: ${currentUserName}`;
      }
    }

    // 2. Campaign Name
    const lblCamp = document.getElementById("lblSessionCampaignName");
    if (lblCamp) {
      lblCamp.textContent = camp ? camp.name : (netStatus.code ? `Campaign (${netStatus.code})` : "Campaign");
    }

    // 3. Session Number
    const lblNum = document.getElementById("lblSessionNumberBadge");
    if (lblNum) {
      lblNum.textContent = `Session #${s?.sessionNumber || 1}`;
    }

    // 4. Live Date/Time
    const lblDateTime = document.getElementById("lblSessionDateTime");
    if (lblDateTime) {
      const now = new Date();
      lblDateTime.textContent = now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) + ' ' + now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    // 5. GM Commands dropdown visibility
    const boxGMCommands = document.getElementById("boxSessionGMCommandsDropdown");
    if (boxGMCommands) {
      boxGMCommands.style.display = isLocalGM ? "inline-block" : "none";
    }

    // 6. Submit Sheet button visibility (only for players connected or ready)
    const btnSubmit = document.getElementById("btnPlayerSubmitSheet");
    if (btnSubmit) {
      btnSubmit.style.display = (!isLocalGM && (netStatus.status === 'connected' || netStatus.role === 'CLIENT')) ? "inline-flex" : "none";
    }

    // 7. Network Status Badge
    const lblNet = document.getElementById("lblSessionStatusBadge");
    if (lblNet) {
      if (netStatus.status === 'connected') {
        lblNet.textContent = netStatus.role === 'HOST' ? '🟢 Hosting' : '🟢 Connected';
        lblNet.style.color = '#10b981';
        lblNet.style.borderColor = '#10b981';
        lblNet.style.background = 'rgba(16, 185, 129, 0.15)';
      } else if (netStatus.status === 'connecting') {
        lblNet.textContent = '🔵 Connecting...';
        lblNet.style.color = '#0284c7';
        lblNet.style.borderColor = '#0284c7';
        lblNet.style.background = 'rgba(2, 132, 199, 0.15)';
      } else if (netStatus.status === 'waiting_approval') {
        lblNet.textContent = '🟡 Waiting Approval';
        lblNet.style.color = '#f59e0b';
        lblNet.style.borderColor = '#f59e0b';
        lblNet.style.background = 'rgba(245, 158, 11, 0.15)';
      } else {
        lblNet.textContent = '⚪ Standby';
        lblNet.style.color = 'var(--text-muted)';
        lblNet.style.borderColor = 'var(--border-color)';
        lblNet.style.background = 'var(--bg-panel)';
      }
    }
  }
  window.updateSessionRowUI = updateSessionRowUI;

  function syncSessionUI() {
    if (txtPlayerName && !txtPlayerName.value) {
      txtPlayerName.value = localStorage.getItem("mm2e_player_name") || char?.playerName || "";
    }
    if (txtCampCode && !txtCampCode.value) {
      const urlParams = new URLSearchParams(window.location.search);
      const urlCamp = urlParams.get("campaign") || urlParams.get("camp") || urlParams.get("room");
      txtCampCode.value = urlCamp || localStorage.getItem("mm2e_last_campaign_code") || "";
    }

    updateSilentModeUI();
    updateSessionConnectionUI();
    syncPartyRosterUI();
    renderSessionFeed();
    updateGameSessionUI();
    updateSessionRowUI();
  }
  window.syncSessionUI = syncSessionUI;

  // --- Game Session Management (Start, Pause, End) ---
  function formatSessionDuration(ms) {
    if (!ms || ms < 0) ms = 0;
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  }

  function formatSessionDurationReadable(ms) {
    if (!ms || ms < 0) ms = 0;
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  }

  let localSyncedSessionState = null;

  function getCurrentSessionState() {
    if (typeof CampaignManager !== 'undefined') {
      return CampaignManager.getSessionState();
    }
    return localSyncedSessionState || { status: 'ended', sessionNumber: 1, startedAt: null, pausedAt: null, totalElapsedMs: 0 };
  }

  function updateGameSessionUI(state) {
    if (state) {
      localSyncedSessionState = state;
      window.__lastSyncedSessionState = state;
    }
    const s = state || getCurrentSessionState();
    const isLocalGM = (typeof CampaignManager !== 'undefined') ? CampaignManager.isDesignatedGM('local_player') : false;

    // Session tab controls
    if (gmSessionActionButtons) gmSessionActionButtons.style.display = isLocalGM ? "inline-flex" : "none";

    let elapsed = s.totalElapsedMs || 0;
    if (s.status === 'active' && s.startedAt) {
      elapsed += (Date.now() - s.startedAt);
    }
    const formattedDuration = formatSessionDuration(elapsed);

    updateSessionRowUI(s);

    if (s.status === 'active') {
      const activeText = `🟢 Session #${s.sessionNumber || 1}: Active`;
      if (lblGameSessionStatusBadge) {
        lblGameSessionStatusBadge.textContent = activeText;
        lblGameSessionStatusBadge.style.color = "#10b981";
        lblGameSessionStatusBadge.style.borderColor = "#10b981";
        lblGameSessionStatusBadge.style.background = "rgba(16, 185, 129, 0.15)";
      }
      if (lblSessionLiveClock) {
        lblSessionLiveClock.textContent = formattedDuration;
        lblSessionLiveClock.style.display = "inline-block";
      }
      if (btnGMStartSession) btnGMStartSession.style.display = "none";
      if (btnGMPauseSession) {
        btnGMPauseSession.style.display = "inline-block";
        btnGMPauseSession.textContent = "⏸ Pause";
      }
      if (btnGMEndSession) btnGMEndSession.style.display = "inline-block";
      if (btnGMCancelSession) btnGMCancelSession.style.display = "flex";

      if (boxSessionPausedBanner) boxSessionPausedBanner.style.display = "none";

      // Campaign Tab UI
      if (lblGMCampaignSessionBadge) {
        lblGMCampaignSessionBadge.textContent = `🟢 Session #${s.sessionNumber || 1}: Active`;
        lblGMCampaignSessionBadge.style.color = "#10b981";
        lblGMCampaignSessionBadge.style.borderColor = "#10b981";
        lblGMCampaignSessionBadge.style.background = "rgba(16, 185, 129, 0.15)";
      }
      if (lblGMCampaignSessionClock) {
        lblGMCampaignSessionClock.textContent = formattedDuration;
        lblGMCampaignSessionClock.style.display = "inline-block";
      }
      if (btnGMCampTabStartSession) btnGMCampTabStartSession.style.display = "none";
      if (btnGMCampTabPauseSession) {
        btnGMCampTabPauseSession.style.display = "inline-block";
        btnGMCampTabPauseSession.textContent = "⏸ Pause";
      }
      if (btnGMCampTabEndSession) btnGMCampTabEndSession.style.display = "inline-block";
      if (btnGMCampTabCancelSession) btnGMCampTabCancelSession.style.display = "inline-block";

    } else if (s.status === 'paused') {
      const pausedText = `⏸️ Session #${s.sessionNumber || 1}: Paused`;
      const frozenDuration = formatSessionDuration(s.totalElapsedMs || 0);
      if (lblGameSessionStatusBadge) {
        lblGameSessionStatusBadge.textContent = pausedText;
        lblGameSessionStatusBadge.style.color = "#f59e0b";
        lblGameSessionStatusBadge.style.borderColor = "#f59e0b";
        lblGameSessionStatusBadge.style.background = "rgba(245, 158, 11, 0.15)";
      }
      if (lblSessionLiveClock) {
        lblSessionLiveClock.textContent = frozenDuration;
        lblSessionLiveClock.style.display = "inline-block";
      }
      if (btnGMStartSession) {
        btnGMStartSession.style.display = "inline-block";
        btnGMStartSession.textContent = "▶ Resume";
      }
      if (btnGMPauseSession) btnGMPauseSession.style.display = "none";
      if (btnGMEndSession) btnGMEndSession.style.display = "inline-block";
      if (btnGMCancelSession) btnGMCancelSession.style.display = "flex";

      if (boxSessionPausedBanner) boxSessionPausedBanner.style.display = "flex";
      if (lblPausedBannerClock) lblPausedBannerClock.textContent = frozenDuration;

      // Campaign Tab UI
      if (lblGMCampaignSessionBadge) {
        lblGMCampaignSessionBadge.textContent = `⏸️ Session #${s.sessionNumber || 1}: Paused`;
        lblGMCampaignSessionBadge.style.color = "#f59e0b";
        lblGMCampaignSessionBadge.style.borderColor = "#f59e0b";
        lblGMCampaignSessionBadge.style.background = "rgba(245, 158, 11, 0.15)";
      }
      if (lblGMCampaignSessionClock) {
        lblGMCampaignSessionClock.textContent = frozenDuration;
        lblGMCampaignSessionClock.style.display = "inline-block";
      }
      if (btnGMCampTabStartSession) {
        btnGMCampTabStartSession.style.display = "inline-block";
        btnGMCampTabStartSession.textContent = "▶ Resume";
      }
      if (btnGMCampTabPauseSession) btnGMCampTabPauseSession.style.display = "none";
      if (btnGMCampTabEndSession) btnGMCampTabEndSession.style.display = "inline-block";
      if (btnGMCampTabCancelSession) btnGMCampTabCancelSession.style.display = "inline-block";

    } else {
      // ended / standby
      const standbyText = "⏹️ Session Standby";
      if (lblGameSessionStatusBadge) {
        lblGameSessionStatusBadge.textContent = standbyText;
        lblGameSessionStatusBadge.style.color = "var(--text-muted)";
        lblGameSessionStatusBadge.style.borderColor = "var(--border-color)";
        lblGameSessionStatusBadge.style.background = "rgba(107, 114, 128, 0.15)";
      }
      if (lblSessionLiveClock) lblSessionLiveClock.style.display = "none";
      if (btnGMStartSession) {
        btnGMStartSession.style.display = "inline-block";
        btnGMStartSession.textContent = "▶ Start Session";
      }
      if (btnGMPauseSession) btnGMPauseSession.style.display = "none";
      if (btnGMEndSession) btnGMEndSession.style.display = "none";
      if (btnGMCancelSession) btnGMCancelSession.style.display = "none";

      if (boxSessionPausedBanner) boxSessionPausedBanner.style.display = "none";

      // Campaign Tab UI
      if (lblGMCampaignSessionBadge) {
        lblGMCampaignSessionBadge.textContent = "Standby";
        lblGMCampaignSessionBadge.style.color = "var(--text-muted)";
        lblGMCampaignSessionBadge.style.borderColor = "var(--border-color)";
        lblGMCampaignSessionBadge.style.background = "rgba(107, 114, 128, 0.15)";
      }
      if (lblGMCampaignSessionClock) lblGMCampaignSessionClock.style.display = "none";
      if (btnGMCampTabStartSession) {
        btnGMCampTabStartSession.style.display = "inline-block";
        btnGMCampTabStartSession.textContent = "▶ Start";
      }
      if (btnGMCampTabPauseSession) btnGMCampTabPauseSession.style.display = "none";
      if (btnGMCampTabEndSession) btnGMCampTabEndSession.style.display = "none";
      if (btnGMCampTabCancelSession) btnGMCampTabCancelSession.style.display = "none";
    }
    if (typeof window.updateHeroPointsUseButtonState === 'function') {
      window.updateHeroPointsUseButtonState();
    }
  }
  window.updateGameSessionUI = updateGameSessionUI;

  // Interval ticker for live clock and date/time
  setInterval(() => {
    const s = getCurrentSessionState();
    if (s && s.status === 'active') {
      let elapsed = s.totalElapsedMs || 0;
      if (s.startedAt) elapsed += (Date.now() - s.startedAt);
      const str = formatSessionDuration(elapsed);
      if (lblSessionLiveClock) lblSessionLiveClock.textContent = str;
      if (lblGMCampaignSessionClock) lblGMCampaignSessionClock.textContent = str;
    }
    const lblDate = document.getElementById("lblSessionDateTime");
    if (lblDate) {
      const now = new Date();
      lblDate.textContent = now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) + ' ' + now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  }, 1000);

  window.gmStartGameSession = function() {
    if (typeof CampaignManager === 'undefined') return;
    const sessionState = CampaignManager.startSession();
    if (!sessionState) return;

    const isResumed = sessionState.pausedAt === null && sessionState.totalElapsedMs > 0;
    if (!isResumed) {
      sessionLocalLog.length = 0;
    }
    const announcement = isResumed
      ? `📢 GM resumed Game Session #${sessionState.sessionNumber}.`
      : `📢 GM started Game Session #${sessionState.sessionNumber}!`;

    const sysEntry = {
      type: 'SYSTEM',
      id: 'sys_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      text: announcement
    };
    CampaignManager.addLogEntry(sysEntry);
    sessionLocalLog.push(sysEntry);
    renderSessionFeed();

    if (typeof SessionNetwork !== 'undefined') {
      SessionNetwork.sendSessionStatus(sessionState);
      SessionNetwork.sendSystemMessage(sysEntry);
    }

    updateGameSessionUI(sessionState);
    if (typeof showToast === 'function') {
      showToast(announcement.replace(/^📢\s*/, ''), "success");
    }
  };

  window.gmPauseGameSession = function() {
    if (typeof CampaignManager === 'undefined') return;
    const sessionState = CampaignManager.pauseSession();
    if (!sessionState) return;

    const announcement = `📢 GM paused Game Session #${sessionState.sessionNumber}. Player rolls are on hold.`;
    const sysEntry = {
      type: 'SYSTEM',
      id: 'sys_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      text: announcement
    };
    CampaignManager.addLogEntry(sysEntry);
    sessionLocalLog.push(sysEntry);
    renderSessionFeed();

    if (typeof SessionNetwork !== 'undefined') {
      SessionNetwork.sendSessionStatus(sessionState);
      SessionNetwork.sendSystemMessage(sysEntry);
    }

    updateGameSessionUI(sessionState);
    if (typeof showToast === 'function') {
      showToast(announcement.replace(/^📢\s*/, ''), "warning");
    }
  };

  window.gmEndGameSession = function() {
    if (typeof CampaignManager === 'undefined') return;
    const currentState = CampaignManager.getSessionState();
    const sessionNum = currentState.sessionNumber || 1;

    if (!confirm(`Are you sure you want to end Game Session #${sessionNum}?\n\nThis will freeze session duration, log the session completion, and automatically create a campaign save point.`)) {
      return;
    }

    const result = CampaignManager.endSession();
    if (!result) return;

    const durationStr = formatSessionDurationReadable(result.durationMs);
    const announcement = `📢 GM ended Game Session #${result.sessionNum}. Duration: ${durationStr}.${result.savePointId ? ' Automatic save point created.' : ''}`;

    const sysEntry = {
      type: 'SYSTEM',
      id: 'sys_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      text: announcement
    };
    CampaignManager.addLogEntry(sysEntry);
    sessionLocalLog.push(sysEntry);
    renderSessionFeed();

    if (typeof SessionNetwork !== 'undefined') {
      SessionNetwork.sendSessionStatus(result.sessionState);
      SessionNetwork.sendSystemMessage(sysEntry);
    }

    updateGameSessionUI(result.sessionState);
    if (typeof renderGMTimeline === 'function') {
      renderGMTimeline();
    }
    if (typeof showToast === 'function') {
      showToast(`Game Session #${result.sessionNum} ended (${durationStr}).`, "info");
    }
  };

  window.gmCancelGameSession = function() {
    if (typeof CampaignManager === 'undefined') return;
    const currentState = CampaignManager.getSessionState();
    if (!currentState || currentState.status === 'ended') {
      if (typeof showToast === 'function') showToast("No active or paused session to cancel.", "warning");
      return;
    }
    const sessionNum = currentState.sessionNumber || 1;

    if (!confirm(`Are you sure you want to cancel Game Session #${sessionNum}?\n\nThis will end the session without creating a save point, discard elapsed session time, and delete all chat messages and rolls posted during this session.`)) {
      return;
    }

    const result = CampaignManager.cancelSession();
    if (!result) return;

    // Clear active session chat feed completely - cancelling is like the session never happened
    sessionLocalLog.length = 0;
    renderSessionFeed();

    if (typeof SessionNetwork !== 'undefined') {
      SessionNetwork.sendSessionCancel({
        sessionState: result.sessionState,
        sessionStartedAt: result.sessionStartedAt,
        sessionNum: result.sessionNum
      });
      SessionNetwork.sendSessionStatus(result.sessionState);
    }

    updateGameSessionUI(result.sessionState);
    updateSessionRowUI(result.sessionState);
    if (typeof showToast === 'function') {
      showToast(`Game Session #${result.sessionNum} was canceled. All session messages cleared.`, "info");
    }
  };

  // Wire GM Session Buttons
  if (btnGMStartSession) {
    btnGMStartSession.addEventListener("click", () => {
      if (menuSessionGMCommands) menuSessionGMCommands.style.display = "none";
      window.gmStartGameSession();
    });
  }
  if (btnGMPauseSession) {
    btnGMPauseSession.addEventListener("click", () => {
      if (menuSessionGMCommands) menuSessionGMCommands.style.display = "none";
      window.gmPauseGameSession();
    });
  }
  if (btnGMEndSession) {
    btnGMEndSession.addEventListener("click", () => {
      if (menuSessionGMCommands) menuSessionGMCommands.style.display = "none";
      window.gmEndGameSession();
    });
  }
  if (btnGMCancelSession) {
    btnGMCancelSession.addEventListener("click", () => {
      if (menuSessionGMCommands) menuSessionGMCommands.style.display = "none";
      window.gmCancelGameSession();
    });
  }

  if (btnGMCampTabStartSession) btnGMCampTabStartSession.addEventListener("click", window.gmStartGameSession);
  if (btnGMCampTabPauseSession) btnGMCampTabPauseSession.addEventListener("click", window.gmPauseGameSession);
  if (btnGMCampTabEndSession) btnGMCampTabEndSession.addEventListener("click", window.gmEndGameSession);
  if (btnGMCampTabCancelSession) btnGMCampTabCancelSession.addEventListener("click", window.gmCancelGameSession);

  // Wire GM Commands Dropdown in Session Row
  if (btnSessionGMCommands && menuSessionGMCommands) {
    btnSessionGMCommands.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menuSessionGMCommands.style.display === "block";
      menuSessionGMCommands.style.display = isOpen ? "none" : "block";
    });
    document.addEventListener("click", (e) => {
      if (menuSessionGMCommands && menuSessionGMCommands.style.display === "block") {
        if (!btnSessionGMCommands.contains(e.target) && !menuSessionGMCommands.contains(e.target)) {
          menuSessionGMCommands.style.display = "none";
        }
      }
    });
  }

  if (btnSessionCopyInviteLink) {
    btnSessionCopyInviteLink.addEventListener("click", () => {
      if (menuSessionGMCommands) menuSessionGMCommands.style.display = "none";
      if (typeof CampaignManager === 'undefined') return;
      const camp = CampaignManager.getActiveCampaign();
      const campCode = camp?.code || "campaign-1";
      const inviteUrl = `${window.location.origin}${window.location.pathname}?campaign=${encodeURIComponent(campCode)}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(inviteUrl).then(() => {
          if (typeof showToast === 'function') showToast(`Copied campaign link: ${inviteUrl}`, "success");
        }).catch(() => prompt("Campaign Invite Link:", inviteUrl));
      } else {
        prompt("Campaign Invite Link:", inviteUrl);
      }
    });
  }

  if (btnSessionOpenUsersFromMenu) {
    btnSessionOpenUsersFromMenu.addEventListener("click", () => {
      if (menuSessionGMCommands) menuSessionGMCommands.style.display = "none";
      openCampaignUsersModal();
    });
  }

  if (btnPlayerSubmitSheet) {
    btnPlayerSubmitSheet.addEventListener("click", () => {
      if (typeof char !== 'undefined' && char && char.name) {
        const hero = window.primaryHero || char;
        const serialized = (typeof hero.serialize === 'function') ? hero.serialize() : hero;
        SessionNetwork.sendCharacterSheetData(serialized);
        if (typeof showToast === 'function') {
          showToast(`Character sheet "${char.name}" submitted to GM!`, "success");
        }
      } else {
        if (typeof showToast === 'function') {
          showToast("No active character sheet in editor to submit.", "warning");
        }
      }
    });
  }

  // --- Session Event Listeners & Chat Input Handlers ---
  if (btnConnect) {
    btnConnect.addEventListener("click", () => {
      const status = typeof SessionNetwork !== 'undefined' ? SessionNetwork.getStatus().status : "disconnected";
      if (status === "connected" || status === "connecting" || status === "waiting_approval") {
        SessionNetwork.disconnect();
        return;
      }

      const pName = txtPlayerName?.value?.trim() || "";
      if (!pName) {
        if (typeof showToast === 'function') {
          showToast("Please enter your user name to log into the campaign.", "warning");
        } else {
          alert("Please enter your user name to log into the campaign.");
        }
        if (txtPlayerName) txtPlayerName.focus();
        return;
      }

      const cCode = txtCampCode?.value?.trim() || "default";
      localStorage.setItem("mm2e_player_name", pName);
      localStorage.setItem("mm2e_last_campaign_code", cCode);
      if (typeof char !== 'undefined' && char) {
        char.playerName = pName;
      }
      const pInput = document.getElementById("playerNameInput");
      if (pInput && pInput.value !== pName) {
        pInput.value = pName;
      }

      const effFeats = char?.effectiveFeats || char?.feats || {};
      const impInit = effFeats["Improved Initiative"] || 0;
      const dexMod = (typeof char?.getAbilityRank === 'function')
        ? (char.getAbilityRank("DEX") !== null ? char.getAbilityRank("DEX") : -5)
        : (char?.abilities?.DEX || 0);
      const totalInit = (char?.derivedStats && typeof char.derivedStats.initiative === 'number')
        ? char.derivedStats.initiative
        : (dexMod + (impInit * 4));

      SessionNetwork.joinHost(cCode, {
        playerName: pName,
        characterName: char?.name || "Hero",
        characterSummary: {
          powerLevel: char?.powerLevel || 10,
          defense: char?.combat?.DEF || 0,
          initiative: totalInit,
          initiativeRoll: char?.trackerState?.initiativeRoll ?? null
        }
      });
    });
  }

  if (txtPlayerName) {
    txtPlayerName.addEventListener("input", (e) => {
      const val = e.target.value.slice(0, 45);
      localStorage.setItem("mm2e_player_name", val);
      if (typeof char !== 'undefined' && char) {
        char.playerName = val;
      }
      const pInput = document.getElementById("playerNameInput");
      if (pInput && pInput.value !== val) {
        pInput.value = val;
      }
      if (typeof CampaignManager !== 'undefined' && val.trim()) {
        CampaignManager.setUserAccount(val.trim());
        const isGM = CampaignManager.isDesignatedGM('local_player');
        const currGM = CampaignManager.getGMUserName();
        if (isGM || !currGM || currGM === 'GM') {
          CampaignManager.setGMUserName(val.trim());
        }
      }
      if (typeof syncGMRosterUI === 'function') {
        syncGMRosterUI();
      }
      syncPartyRosterUI();
    });
  }

  if (btnSilentToggle) {
    btnSilentToggle.addEventListener("click", () => {
      if (typeof SessionNetwork !== 'undefined') {
        const nextSilent = SessionNetwork.toggleSilentMode();
        if (typeof CampaignManager !== 'undefined') {
          CampaignManager.setPlayerForcedMode("local_hero", "silent", nextSilent);
          if (char && char.name) {
            CampaignManager.setPlayerForcedMode(char.name, "silent", nextSilent);
          }
        }
        updateSilentModeUI();
        syncPartyRosterUI();
      }
    });
  }

  if (chkGMIncludeCharInParty) {
    chkGMIncludeCharInParty.addEventListener("change", (e) => {
      const val = e.target.checked;
      if (typeof CampaignManager !== 'undefined' && typeof CampaignManager.setGmCharIncludedInParty === 'function') {
        CampaignManager.setGmCharIncludedInParty(val);
      } else {
        try {
          localStorage.setItem("mm2e_include_gm_char_in_party", val ? "true" : "false");
        } catch (err) {}
      }
      syncPartyRosterUI();
    });
  }

  poppedOutPartyWindow = null;

  function getSavedPartyDisplayBounds() {
    const fallback = { width: 840, height: 480, left: 120, top: 120 };
    try {
      const saved = localStorage.getItem("mm2e_party_display_bounds");
      if (saved) {
        const parsed = JSON.parse(saved);
        return sanitizeWindowBounds(parsed, fallback);
      }
    } catch (e) {}
    return fallback;
  }
  window.getSavedPartyDisplayBounds = getSavedPartyDisplayBounds;

  function savePartyDisplayBoundsFromRef(win) {
    if (!win) return;
    try {
      const left = (win.screenX !== undefined) ? win.screenX : win.screenLeft;
      const top = (win.screenY !== undefined) ? win.screenY : win.screenTop;
      const width = win.innerWidth || win.outerWidth;
      const height = win.innerHeight || win.outerHeight;
      if (typeof left === 'number' && !isNaN(left) && typeof top === 'number' && !isNaN(top) && width >= 250 && height >= 200) {
        savePartyDisplayBoundsDirect({ left, top, width, height });
      }
    } catch (e) {}
  }
  window.savePartyDisplayBoundsFromRef = savePartyDisplayBoundsFromRef;

  function openPartyDisplayPopout() {
    // 1. Immediately sync and persist party roster to DOM and localStorage before opening window
    syncPartyRosterUI();

    const bounds = getSavedPartyDisplayBounds();
    const openLeft = (typeof bounds.left === 'number' && !isNaN(bounds.left) && Math.abs(bounds.left) < 40000) ? bounds.left : 120;
    const openTop = (typeof bounds.top === 'number' && !isNaN(bounds.top) && Math.abs(bounds.top) < 40000) ? bounds.top : 120;
    const openWidth = Math.max(350, Math.min(bounds.width || 840, 5000));
    let openHeight = Math.max(250, Math.min(bounds.height || 480, 5000));
    if (window.screen && window.screen.availHeight && openHeight > (window.screen.availHeight - 30)) {
      openHeight = Math.max(250, window.screen.availHeight - 40);
    }
    const features = `width=${openWidth},height=${openHeight},left=${openLeft},top=${openTop},resizable=yes,scrollbars=yes`;
    const currentTheme = document.documentElement.getAttribute("data-theme") || localStorage.getItem("mm2e_theme") || "light";
    poppedOutPartyWindow = window.open(`party_window.html?theme=${encodeURIComponent(currentTheme)}&w=${openWidth}&h=${openHeight}&x=${openLeft}&y=${openTop}`, "MM2CG_PartyDisplay", features);
    window.poppedOutPartyWindow = poppedOutPartyWindow;
    updatePartyDisplayDockMode(true);
    if (typeof SessionNetwork !== 'undefined' && typeof SessionNetwork.initBroadcastChannel === 'function') {
      SessionNetwork.initBroadcastChannel();
    }
    setTimeout(() => {
      try {
        if (poppedOutPartyWindow && !poppedOutPartyWindow.closed && poppedOutPartyWindow.document) {
          poppedOutPartyWindow.document.documentElement.setAttribute("data-theme", currentTheme);
          if (poppedOutPartyWindow.document.body) poppedOutPartyWindow.document.body.setAttribute("data-theme", currentTheme);
          if (typeof poppedOutPartyWindow.__applySavedThemeAndFonts === 'function') {
            poppedOutPartyWindow.__applySavedThemeAndFonts();
          }
          if (typeof poppedOutPartyWindow.syncPartyFromOpenerOrLocal === 'function') {
            poppedOutPartyWindow.syncPartyFromOpenerOrLocal();
          }
        }
      } catch (e) {}
      syncPartyRosterUI();
    }, 150);
    setTimeout(() => {
      try {
        if (poppedOutPartyWindow && !poppedOutPartyWindow.closed && poppedOutPartyWindow.document) {
          if (typeof poppedOutPartyWindow.syncPartyFromOpenerOrLocal === 'function') {
            poppedOutPartyWindow.syncPartyFromOpenerOrLocal();
          }
        }
      } catch (e) {}
      syncPartyRosterUI();
    }, 350);
  }
  window.openPartyDisplayPopout = openPartyDisplayPopout;

  function redockPartyDisplay(closeRef = true) {
    if (poppedOutPartyWindow && !poppedOutPartyWindow.closed) {
      savePartyDisplayBoundsFromRef(poppedOutPartyWindow);
      if (closeRef) {
        try { poppedOutPartyWindow.close(); } catch (e) {}
      }
    }
    poppedOutPartyWindow = null;
    window.poppedOutPartyWindow = null;
    updatePartyDisplayDockMode(false);
  }
  window.redockPartyDisplay = redockPartyDisplay;

  if (btnPopoutParty) {
    btnPopoutParty.addEventListener("click", openPartyDisplayPopout);
  }

  if (btnRedockParty) {
    btnRedockParty.addEventListener("click", redockPartyDisplay);
  }

  window.addEventListener('focus', () => {
    if (poppedOutPartyWindow && poppedOutPartyWindow.closed) {
      redockPartyDisplay();
    }
  });

  window.addEventListener('storage', (e) => {
    if (e.key === 'mm2e_party_docked') {
      redockPartyDisplay();
    } else if (e.key === 'mm2e_party_action' && e.newValue) {
      try {
        const data = JSON.parse(e.newValue);
        if (data && data.action && typeof window[data.action] === 'function') {
          window[data.action](...(data.args || []));
        }
      } catch (err) {}
    } else if (e.key === 'mm2e_include_gm_char_in_party') {
      syncPartyRosterUI();
    }
  });

  setInterval(() => {
    if (poppedOutPartyWindow && poppedOutPartyWindow.closed) {
      redockPartyDisplay();
    }
  }, 300);

  if (txtSearch) {
    txtSearch.addEventListener("input", (e) => {
      sessionSearchQuery = e.target.value;
      renderSessionFeed();
    });
  }

  if (btnClearSearch) {
    btnClearSearch.addEventListener("click", () => {
      if (txtSearch) txtSearch.value = "";
      sessionSearchQuery = "";
      renderSessionFeed();
    });
  }

  filterChips.forEach(btn => {
    btn.addEventListener("click", () => {
      filterChips.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      sessionCurrentFilter = btn.dataset.filter || "all";
      renderSessionFeed();
    });
  });


  // --- Bottom Chat Bar & @ Mention Autocomplete ---
  function initChatMentionHandler() {
    const chatInput = document.getElementById("txtSessionChatInput");
    const popover = document.getElementById("chatMentionPopover");
    const list = document.getElementById("chatMentionList");
    if (!chatInput || !popover || !list) return;

    function getMentionCandidates() {
      const candidates = [];
      const camp = (typeof CampaignManager !== 'undefined') ? CampaignManager.getActiveCampaign() : null;
      const gmName = (typeof CampaignManager !== 'undefined') ? CampaignManager.getGMUserName() : 'GM';

      candidates.push({ label: `👑 ${gmName} (-GM-)`, value: gmName });

      if (camp && Array.isArray(camp.acceptedPlayers)) {
        camp.acceptedPlayers.forEach(p => {
          if (p.characterName && p.characterName !== char?.name) {
            candidates.push({ label: `👤 [${p.playerName}] / [${p.characterName}]`, value: p.characterName });
          }
        });
      }

      if (camp && Array.isArray(camp.npcs)) {
        camp.npcs.forEach(n => {
          candidates.push({ label: `🛡️ NPC: [${n.name}]`, value: n.name });
        });
      }

      if (char && char.name) {
        const localPlayer = char.playerName || 'You';
        candidates.push({ label: `🦸 [${localPlayer}] / [${char.name}]`, value: char.name });
      }

      return candidates;
    }

    let activeMentionIdx = 0;

    function updateMentionPopup() {
      const val = chatInput.value;
      const cursor = chatInput.selectionStart || val.length;
      const leftText = val.substring(0, cursor);
      const atIdx = leftText.lastIndexOf('@');

      if (atIdx === -1 || (atIdx > 0 && /\S/.test(leftText[atIdx - 1]))) {
        popover.style.display = 'none';
        return;
      }

      const query = leftText.substring(atIdx + 1).toLowerCase().trim();
      const allCandidates = getMentionCandidates();
      const filtered = query
        ? allCandidates.filter(c => c.label.toLowerCase().includes(query) || c.value.toLowerCase().includes(query))
        : allCandidates;

      if (filtered.length === 0) {
        popover.style.display = 'none';
        return;
      }

      activeMentionIdx = Math.min(activeMentionIdx, filtered.length - 1);

      list.innerHTML = filtered.map((c, idx) => `
        <div class="mention-item ${idx === activeMentionIdx ? 'active' : ''}" data-value="${escapeHtml(c.value)}" onclick="window.insertMentionCandidate('${escapeHtml(c.value)}')">
          <span>${c.label}</span>
          <span style="font-size: 10px; color: var(--text-muted); opacity: 0.8;">@${c.value}</span>
        </div>
      `).join('');

      popover.style.display = 'flex';
    }

    chatInput.addEventListener('input', updateMentionPopup);

    chatInput.addEventListener('keydown', (e) => {
      if (popover.style.display !== 'none') {
        const items = list.querySelectorAll('.mention-item');
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          activeMentionIdx = (activeMentionIdx + 1) % items.length;
          items.forEach((it, idx) => it.classList.toggle('active', idx === activeMentionIdx));
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          activeMentionIdx = (activeMentionIdx - 1 + items.length) % items.length;
          items.forEach((it, idx) => it.classList.toggle('active', idx === activeMentionIdx));
          return;
        }
        if (e.key === 'Enter' || e.key === 'Tab') {
          const activeItem = items[activeMentionIdx];
          if (activeItem) {
            e.preventDefault();
            window.insertMentionCandidate(activeItem.dataset.value);
            return;
          }
        }
        if (e.key === 'Escape') {
          popover.style.display = 'none';
          return;
        }
      }

      if (e.key === 'Enter' && !e.shiftKey && popover.style.display !== 'flex') {
        e.preventDefault();
        handleSendChatInput();
      }
    });

    window.insertMentionCandidate = function(val) {
      const input = document.getElementById("txtSessionChatInput");
      if (!input) return;
      const text = input.value;
      const cursor = input.selectionStart || text.length;
      const leftText = text.substring(0, cursor);
      const atIdx = leftText.lastIndexOf('@');
      if (atIdx !== -1) {
        const beforeAt = text.substring(0, atIdx);
        const afterCursor = text.substring(cursor);
        input.value = `${beforeAt}@${val} ${afterCursor}`;
        input.focus();
        const newCursor = atIdx + val.length + 2;
        input.setSelectionRange(newCursor, newCursor);
      }
      popover.style.display = 'none';
    };

    window.sessionInsertMention = function(name) {
      const input = document.getElementById("txtSessionChatInput");
      if (!input) return;
      input.value = `@${name} ` + input.value.replace(/^@[^\s]+\s*/, '');
      input.focus();
    };
  }
  initChatMentionHandler();

  function handleSendChatInput() {
    const chatInput = document.getElementById("txtSessionChatInput");
    if (!chatInput) return;
    const raw = chatInput.value.trim();
    if (!raw) return;

    // 1. Hero Point commands: /hp, /spend, /spend hp, /use hp, /reroll, /hero, etc.
    const hpCmdMatch = raw.match(/^\/(?:hp|spend\s*hp|spend|spendhp|hero\s*points?|heropoints?|hero|use\s*hp|usehp)(?:\s+(.*))?$/i);
    const rerollCmdMatch = raw.match(/^\/(?:reroll|re-roll)(?:\s+(.*))?$/i);

    if (hpCmdMatch || rerollCmdMatch) {
      const rawArg = rerollCmdMatch ? (rerollCmdMatch[1] || 'reroll') : (hpCmdMatch[1] || '').trim();
      const lowerArg = rawArg.toLowerCase();

      // Check current hero points
      let currentHP = 0;
      if (typeof char !== 'undefined' && char) {
        if (typeof char.heroPoints === 'number' && !isNaN(char.heroPoints)) {
          currentHP = char.heroPoints;
        } else {
          const hpInput = document.getElementById("heroPointsInput");
          const defaultHP = 1 + (char.effectiveFeats?.["Luck"] || char.feats?.["Luck"] || 0);
          const rawVal = hpInput ? parseInt(hpInput.value) : NaN;
          currentHP = !isNaN(rawVal) ? Math.max(0, rawVal) : defaultHP;
          char.heroPoints = currentHP;
        }
      }

      // Help command
      if (lowerArg === 'help' || lowerArg === '?') {
        if (typeof showToast === 'function') {
          showToast("Hero Point Commands: /hp (spend 1 HP for +5 to next roll), /reroll or /hp reroll (reroll previous roll), /hp modal (options menu), /hp <note>", "info");
        }
        chatInput.value = '';
        return;
      }

      // Explicit modal request
      if (lowerArg === 'modal' || lowerArg === 'menu' || lowerArg === 'open' || lowerArg === 'options') {
        window.openUseHeroPointModal('local_hero');
        chatInput.value = '';
        return;
      }

      if (currentHP <= 0) {
        if (typeof showToast === 'function') showToast("No Hero Points remaining to spend!", "warning");
        chatInput.value = '';
        return;
      }

      // Reroll command: /reroll or /hp reroll (M&M 2E floor rule: rolls 1-10 become 11-20, take better result)
      if (rerollCmdMatch || lowerArg.includes('reroll') || lowerArg.includes('re-roll') || lowerArg.includes('again')) {
        const lastConfig = window.lastRollConfig;
        const canRerollRecent = lastConfig && !lastConfig.isNat1 && !lastConfig.isNat20 && !lastConfig.isHPRerolled;

        if (canRerollRecent) {
          window.sessionSpendHeroPoint('local_hero', 'Hero Point spent');

          const rawD20 = Math.floor(Math.random() * 20) + 1;
          const wasFloored = rawD20 <= 10;
          const flooredD20 = wasFloored ? rawD20 + 10 : rawD20;
          const baseMod = (lastConfig.baseMod !== undefined) ? lastConfig.baseMod : (lastConfig.mod || 0);
          const newTotal = flooredD20 + baseMod;
          const originalTotal = lastConfig.total;
          const finalTotal = Math.max(originalTotal, newTotal);
          const keptOriginal = originalTotal > newTotal;

          lastConfig.isHPRerolled = true;
          lastConfig.rawD20 = rawD20;
          lastConfig.d20 = flooredD20;
          lastConfig.total = finalTotal;
          lastConfig.isNat1 = false;
          lastConfig.isNat20 = (!wasFloored && rawD20 === 20);

          const rerollDesc = wasFloored 
            ? `Rolled ${rawD20} (+10 floor = ${flooredD20})` 
            : `Rolled ${flooredD20}`;
          
          const outcomeDesc = keptOriginal
            ? `${rerollDesc} -> ${newTotal} (Original ${originalTotal} kept)`
            : `${rerollDesc} -> ${newTotal} (Kept)`;

          lastConfig.rerollInfo = outcomeDesc;
          lastConfig.hpAnnouncement = `HP Reroll: ${outcomeDesc}`;

          const cleanBaseTitle = (lastConfig.rollType || lastConfig.title || 'Check')
            .replace(/\s*\(\s*✨?\s*\+?\d*\s*HP\s*\)/gi, '')
            .replace(/\s*\(\s*✨?\s*HP\s*Reroll\s*\)/gi, '')
            .replace(/^🎲\s*/, '')
            .trim();

          const rerollTitle = `${cleanBaseTitle} (✨ HP Reroll)`;
          lastConfig.rollType = rerollTitle;
          lastConfig.title = rerollTitle;
          lastConfig.hpBonus = 0;

          const rollEntry = {
            type: 'ROLL',
            characterName: char?.name || "Hero",
            playerName: char?.playerName || (typeof localStorage !== 'undefined' ? localStorage.getItem("mm2e_player_name") : "") || "Player",
            rollType: rerollTitle,
            total: finalTotal,
            breakdown: `1d20 (${wasFloored ? rawD20 + '+10=' + flooredD20 : flooredD20}) ${baseMod >= 0 ? '+' + baseMod : baseMod} = ${newTotal} (Kept ${finalTotal})`,
            isNat20: lastConfig.isNat20,
            isNat1: false,
            hpBonus: 0,
            isHPRerolled: true,
            hpAnnouncement: `HP Reroll: ${outcomeDesc}`,
            rerollInfo: outcomeDesc,
            isLocal: true,
            timestamp: new Date().toISOString()
          };

          if (typeof SessionNetwork !== 'undefined') {
            SessionNetwork.sendRoll(rollEntry);
          } else {
            if (typeof CampaignManager !== 'undefined') CampaignManager.addLogEntry(rollEntry);
            sessionLocalLog.push(rollEntry);
            renderSessionFeed();
          }
          if (typeof window.updateSidebarLastRoll === 'function') {
            window.updateSidebarLastRoll(rollEntry);
          }

          // If diceRollModal is currently open, update it
          const modal = document.getElementById("diceRollModal");
          if (modal && modal.classList.contains("active")) {
            if (!lastConfig.detailsHtml) lastConfig.detailsHtml = "";
            lastConfig.detailsHtml += `
              <div style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed var(--border-color); color: #f59e0b; font-size: var(--font-size-secondary);">
                <strong>✨ HP Reroll:</strong> ${outcomeDesc}
              </div>
            `;
            window.showDiceRollModal(lastConfig);
          }

          if (typeof showToast === 'function') {
            showToast(`✨ HP Reroll: ${outcomeDesc} (${char.heroPoints} HP remaining)`, "info");
          }
        } else {
          char._pendingHPReroll = true;
          window.sessionSpendHeroPoint('local_hero', 'Hero Point spent');
          if (typeof showToast === 'function') {
            showToast(`🎲 Hero Point Reroll queued for your next roll! (Min 11–20) (${char.heroPoints} HP remaining)`, "info");
          }
        }
        chatInput.value = '';
        return;
      }

      // Default spend command: /hp, /spend, /spend hp, /use hp, /hp +5, /hp 1, etc.
      // Immediately spends 1 HP and queues +5 Improve Roll bonus for next check
      if (!rawArg || lowerArg === '1' || lowerArg === '1 hp' || lowerArg === 'hp' || lowerArg === 'point' || lowerArg === 'spend' || lowerArg === '+5' || lowerArg === '5' || lowerArg.includes('improve') || lowerArg.includes('bonus') || lowerArg.includes('add 5') || lowerArg.includes('+ 5')) {
        char._pendingHPRollBonus = 5;
        window.sessionSpendHeroPoint('local_hero', 'Hero Point spent');
        chatInput.value = '';
        return;
      }

      // Custom detail string (e.g. "/hp Surge", "/hp Escape", "/hp Recovery", "/hp Inspiration")
      window.sessionSpendHeroPoint('local_hero', rawArg);
      chatInput.value = '';
      return;
    }

    // 2. /r or /roll dice command
    if (/^\/(r|roll)\s+/i.test(raw)) {
      if (typeof window.isSessionRollAllowed === 'function' && !window.isSessionRollAllowed()) return;
      const expr = raw.replace(/^\/(r|roll)\s+/i, '').trim();

      const d20Match = expr.match(/^1?d20(?:\s*([+-]\s*\d+))?$/i);
      if (d20Match && typeof window.performD20RollWithHP === 'function') {
        const baseMod = d20Match[1] ? parseInt(d20Match[1].replace(/\s+/g, '')) : 0;
        const roll = window.performD20RollWithHP(baseMod, char, 'check');
        const hpSuffix = (roll.hpBonus > 0 ? ` (✨ +${roll.hpBonus} HP)` : '') + (roll.isHPRerolled ? ' (✨ HP Reroll)' : '');
        const breakdownText = (roll.hpBonus > 0)
          ? `1d20 (${roll.d20}) ${roll.baseMod >= 0 ? '+' + roll.baseMod : roll.baseMod} [Base] + ${roll.hpBonus} [✨ HP] = ${roll.total}`
          : (roll.isHPRerolled && roll.rawD20 <= 10
             ? `1d20 (${roll.rawD20} + 10 floor = ${roll.d20}) ${roll.mod >= 0 ? '+' + roll.mod : roll.mod} = ${roll.total}`
             : `1d20 (${roll.d20}) ${roll.mod >= 0 ? '+' + roll.mod : roll.mod} = ${roll.total}`);

        const rollEntry = {
          type: 'ROLL',
          characterName: char?.name || "Hero",
          playerName: char?.playerName || (typeof localStorage !== 'undefined' ? localStorage.getItem("mm2e_player_name") : "") || "Player",
          rollType: `Dice (${expr})${hpSuffix}`,
          total: roll.total,
          breakdown: breakdownText,
          isNat20: !!roll.isNat20,
          isNat1: !!roll.isNat1,
          hpBonus: roll.hpBonus,
          isHPRerolled: roll.isHPRerolled,
          hpAnnouncement: roll.hpAnnouncement,
          isLocal: true,
          timestamp: new Date().toISOString()
        };

        window.lastRollConfig = {
          ...rollEntry,
          d20: roll.d20,
          rawD20: roll.rawD20,
          mod: roll.mod,
          baseMod: roll.baseMod,
          title: `Dice (${expr})`
        };

        if (typeof SessionNetwork !== 'undefined') {
          SessionNetwork.sendRoll(rollEntry);
        } else {
          if (typeof CampaignManager !== 'undefined') CampaignManager.addLogEntry(rollEntry);
          sessionLocalLog.push(rollEntry);
          renderSessionFeed();
        }
        if (typeof window.updateSidebarLastRoll === 'function') {
          window.updateSidebarLastRoll(rollEntry);
        }
      } else {
        const res = (typeof DiceNotation !== 'undefined') ? DiceNotation.roll(expr) : { total: Math.floor(Math.random() * 20) + 1, breakdown: expr };
        const rollEntry = {
          type: 'ROLL',
          characterName: char?.name || "Hero",
          playerName: char?.playerName || localStorage.getItem("mm2e_player_name") || "Player",
          rollType: `Dice (${res.expression || expr})`,
          total: res.total,
          breakdown: res.breakdown || `${res.total}`,
          isNat20: !!res.isNat20,
          isNat1: !!res.isNat1,
          isLocal: true,
          timestamp: new Date().toISOString()
        };
        if (typeof SessionNetwork !== 'undefined') {
          SessionNetwork.sendRoll(rollEntry);
        } else {
          if (typeof CampaignManager !== 'undefined') CampaignManager.addLogEntry(rollEntry);
          sessionLocalLog.push(rollEntry);
          renderSessionFeed();
        }
        if (typeof window.updateSidebarLastRoll === 'function') {
          window.updateSidebarLastRoll(rollEntry);
        }
      }
      chatInput.value = '';
      return;
    }

    // 3. Whisper: @Recipient message OR /w Recipient message
    let recipient = null;
    let messageText = raw;

    const whisperMatch = raw.match(/^\/(?:w|whisper)\s+([^\s]+)\s+(.+)$/i) || raw.match(/^@([^\s]+)\s+(.+)$/);
    if (whisperMatch) {
      recipient = whisperMatch[1];
      messageText = whisperMatch[2];
    }

    if (recipient) {
      if (typeof SessionNetwork !== 'undefined') {
        SessionNetwork.sendChat(messageText, recipient, true);
      } else {
        const localPkt = {
          type: 'CHAT',
          id: 'chat_' + Date.now(),
          author: char?.name || 'You',
          recipient,
          isPrivate: true,
          text: messageText,
          timestamp: new Date().toISOString()
        };
        sessionLocalLog.push(localPkt);
        renderSessionFeed();
      }
    } else {
      if (typeof SessionNetwork !== 'undefined') {
        SessionNetwork.sendChat(messageText, null, false);
      } else {
        const localPkt = {
          type: 'CHAT',
          id: 'chat_' + Date.now(),
          author: char?.name || 'You',
          text: messageText,
          timestamp: new Date().toISOString()
        };
        sessionLocalLog.push(localPkt);
        renderSessionFeed();
      }
    }

    chatInput.value = '';
  }

  if (btnSendChat) {
    btnSendChat.addEventListener("click", handleSendChatInput);
  }

  // --- Interactive Session Dice Roller Sidebar: Recent Rolls (Last 3) ---
  function isPlayerRoll(rollData) {
    if (!rollData) return false;
    if (rollData.isLocal === true) return true;
    if (rollData.isLocal === false) return false;

    const netInfo = (typeof SessionNetwork !== 'undefined' && typeof SessionNetwork.getPlayerInfo === 'function') 
      ? SessionNetwork.getPlayerInfo() : null;
    const netPlayer = (netInfo?.playerName || '').trim().toLowerCase();
    const netChar = (netInfo?.characterName || '').trim().toLowerCase();

    const rollPlayer = (rollData.playerName || '').trim().toLowerCase();
    const rollChar = (rollData.characterName || '').trim().toLowerCase();

    const localSavedPlayer = (typeof localStorage !== 'undefined' ? (localStorage.getItem("mm2e_player_name") || '') : '').trim().toLowerCase();
    const localCharName = (typeof char !== 'undefined' && char && char.name ? char.name : '').trim().toLowerCase();
    const localCharPlayer = (typeof char !== 'undefined' && char && char.playerName ? char.playerName : '').trim().toLowerCase();

    if (rollPlayer && netPlayer && rollPlayer === netPlayer) return true;
    if (rollPlayer && localSavedPlayer && rollPlayer === localSavedPlayer) return true;
    if (rollPlayer && localCharPlayer && rollPlayer === localCharPlayer) return true;
    if (rollChar && netChar && rollChar === netChar) return true;
    if (rollChar && localCharName && rollChar === localCharName) return true;

    // If no remote network peers are connected, every roll recorded in the local session belongs to this user
    const hasRemotePeers = typeof SessionNetwork !== 'undefined' && typeof SessionNetwork.getConnectedPeers === 'function' && SessionNetwork.getConnectedPeers().length > 0;
    if (!hasRemotePeers) return true;

    return false;
  }

  function normalizePlayerRoll(rollData) {
    if (!rollData) return null;
    const totalVal = (rollData.total !== undefined) ? rollData.total : (rollData.result ?? rollData.d20 ?? 0);
    const titleText = rollData.title || rollData.rollType || "d20 Check";
    let breakdownText = rollData.breakdown;
    if (!breakdownText) {
      if (rollData.d20 !== undefined) {
        const modStr = (rollData.mod !== undefined && rollData.mod !== 0) 
          ? (rollData.mod > 0 ? ` + ${rollData.mod}` : ` - ${Math.abs(rollData.mod)}`) 
          : '';
        breakdownText = `1d20 (${rollData.d20})${modStr} = ${totalVal}`;
      } else {
        breakdownText = `${totalVal}`;
      }
    }

    const charName = rollData.characterName || (typeof char !== 'undefined' && char && char.name ? char.name : "Hero");

    return {
      id: rollData.id || ('r_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6)),
      title: titleText,
      characterName: charName,
      playerName: rollData.playerName || (typeof char !== 'undefined' && char && char.playerName ? char.playerName : "Player"),
      total: totalVal,
      breakdown: breakdownText,
      isNat20: !!rollData.isNat20 || rollData.d20 === 20 || (rollData.rawD20 === 20 && !rollData.isHPRerolled),
      isNat1: !!rollData.isNat1 || rollData.d20 === 1 || rollData.rawD20 === 1,
      hpBonus: rollData.hpBonus || 0,
      isHPRerolled: !!rollData.isHPRerolled,
      hpAnnouncement: rollData.hpAnnouncement || '',
      result: rollData.resultOutcome || rollData.result || '',
      timestamp: rollData.timestamp || new Date().toISOString(),
      isLocal: true
    };
  }

  function getPlayerRecentRolls() {
    let rolls = Array.isArray(window.lastPlayerRolls) ? [...window.lastPlayerRolls] : [];

    if (rolls.length === 0) {
      try {
        const saved = localStorage.getItem("mm2e_last_player_rolls");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            rolls = parsed.map(normalizePlayerRoll).filter(Boolean);
          }
        }
      } catch (e) {}
    }

    // Backfill from sessionLocalLog if fewer than 3
    if (rolls.length < 3 && Array.isArray(sessionLocalLog)) {
      for (let i = sessionLocalLog.length - 1; i >= 0 && rolls.length < 3; i--) {
        const item = sessionLocalLog[i];
        if (item && (item.type === 'ROLL' || item.type === 'roll') && isPlayerRoll(item)) {
          const norm = normalizePlayerRoll(item);
          if (norm && !rolls.some(r => (norm.id && r.id === norm.id) || (r.timestamp === norm.timestamp && r.total === norm.total && r.breakdown === norm.breakdown))) {
            rolls.push(norm);
          }
        }
      }
    }

    // Fallback to single roll if empty
    if (rolls.length === 0) {
      let legacy = window.lastPlayerRoll || window.lastRollConfig;
      if (!legacy) {
        try {
          const savedSingle = localStorage.getItem("mm2e_last_player_roll");
          if (savedSingle) legacy = JSON.parse(savedSingle);
        } catch (e) {}
      }
      if (legacy) {
        const norm = normalizePlayerRoll(legacy);
        if (norm) rolls.push(norm);
      }
    }

    return rolls.slice(0, 3);
  }

  function renderSidebarLastRoll() {
    const boxContainer = document.getElementById("boxDiceRollerLastResult");
    if (!boxContainer) return;

    const rolls = getPlayerRecentRolls();

    if (rolls.length === 0) {
      boxContainer.innerHTML = `
        <div style="background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 6px; padding: 10px 8px; font-size: 12px; text-align: center; color: var(--text-muted);">
          <div id="lblDiceRollerLastTitle" style="font-weight: 600; font-size: 13px; color: var(--text-main); margin-bottom: 2px;">No rolls yet</div>
          <div id="lblDiceRollerLastBreakdown" style="font-size: 12px; color: var(--text-muted); font-style: italic;">Roll from sheet, chat, or roller</div>
        </div>
      `;
      return;
    }

    boxContainer.innerHTML = rolls.map((roll, idx) => {
      const isLatest = (idx === 0);
      const totalVal = (roll.total !== undefined) ? roll.total : roll.d20;
      const cleanTitle = (roll.title || roll.rollType || "d20 Check")
        .replace(/^🎲\s*/, '')
        .replace(/\s*\(\s*✨?\s*\+?\d*\s*HP\s*\)/gi, '')
        .replace(/\s*\(\s*✨?\s*HP\s*Reroll\s*\)/gi, '')
        .trim();

      let totalColor = isLatest ? "var(--accent-primary)" : "var(--text-main)";
      let badgesHtml = "";
      if (roll.isNat20) {
        totalColor = "#10b981";
        badgesHtml += `<span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #10b981; border: 1px solid #10b981; font-size: 10.5px; padding: 1.5px 5px; font-weight: 700;">★ Nat 20</span>`;
      } else if (roll.isNat1) {
        totalColor = "#ef4444";
        badgesHtml += `<span class="badge" style="background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid #ef4444; font-size: 10.5px; padding: 1.5px 5px; font-weight: 700;">⚠️ Nat 1</span>`;
      }

      if (roll.hpBonus > 0) {
        badgesHtml += `<span class="badge" style="background: rgba(245, 158, 11, 0.2); color: #f59e0b; border: 1px solid #f59e0b; font-size: 10.5px; padding: 1.5px 5px; font-weight: 600;">✨ +${roll.hpBonus} HP</span>`;
      } else if (roll.isHPRerolled) {
        badgesHtml += `<span class="badge" style="background: rgba(245, 158, 11, 0.2); color: #f59e0b; border: 1px solid #f59e0b; font-size: 10.5px; padding: 1.5px 5px; font-weight: 600;">✨ HP Reroll</span>`;
      }

      const timeStr = roll.timestamp 
        ? new Date(roll.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
        : '';
      const rankBadge = isLatest
        ? `<span style="font-size: 10.5px; font-weight: 700; color: var(--accent-primary); text-transform: uppercase; letter-spacing: 0.3px;">Latest</span>`
        : `<span style="font-size: 10.5px; color: var(--text-muted); font-weight: 600;">#${idx + 1}</span>`;

      let resultHtml = '';
      if (roll.result) {
        const isHit = roll.result.toLowerCase().includes('hit') || roll.result.toLowerCase().includes('success');
        const isFail = roll.result.toLowerCase().includes('fail') || roll.result.toLowerCase().includes('miss');
        const resColor = isHit ? '#10b981' : (isFail ? '#ef4444' : 'var(--text-muted)');
        resultHtml = `<span style="font-size: 11.5px; font-weight: 600; color: ${resColor};">${escapeHtml(roll.result)}</span>`;
      }

      const cardStyle = isLatest
        ? "background: var(--bg-card); border: 1px solid var(--accent-primary); box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);"
        : "background: var(--bg-panel); border: 1px solid var(--border-color); opacity: 0.9;";

      return `
        <div class="dice-roller-recent-card ${isLatest ? 'is-latest' : ''}" style="${cardStyle} border-radius: 6px; padding: 7px 9px; font-size: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <div style="display: flex; align-items: center; gap: 5px; overflow: hidden;">
              ${rankBadge}
              <span style="font-weight: 600; font-size: 12px; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 115px;" title="${escapeHtml(cleanTitle)}">${escapeHtml(cleanTitle)}</span>
            </div>
            <span style="font-size: 10.5px; color: var(--text-muted); flex-shrink: 0;">${timeStr}</span>
          </div>
          <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 4px; margin: 2px 0;">
            <div style="display: flex; align-items: baseline; gap: 5px; flex-wrap: wrap;">
              <span style="font-size: ${isLatest ? '18px' : '15px'}; font-weight: 800; color: ${totalColor}; line-height: 1;">${totalVal}</span>
              ${badgesHtml}
            </div>
            ${resultHtml}
          </div>
          <div style="font-size: 11.5px; color: var(--text-muted); word-break: break-word; line-height: 1.3; margin-top: 1px;">
            ${escapeHtml(roll.breakdown || `${totalVal}`)}
          </div>
        </div>
      `;
    }).join('');
  }

  window.updateSidebarLastRoll = function(rollData) {
    if (!rollData) return;
    if (!isPlayerRoll(rollData)) return;

    const norm = normalizePlayerRoll(rollData);
    if (!norm) return;

    if (!Array.isArray(window.lastPlayerRolls)) {
      window.lastPlayerRolls = getPlayerRecentRolls();
    }

    // Filter out duplicates (matching id or matching timestamp + total + breakdown)
    window.lastPlayerRolls = window.lastPlayerRolls.filter(r => 
      !(norm.id && r.id === norm.id) &&
      !(r.timestamp === norm.timestamp && r.total === norm.total && r.breakdown === norm.breakdown)
    );

    window.lastPlayerRolls.unshift(norm);
    if (window.lastPlayerRolls.length > 3) {
      window.lastPlayerRolls = window.lastPlayerRolls.slice(0, 3);
    }
    window.lastPlayerRoll = window.lastPlayerRolls[0];

    try {
      localStorage.setItem("mm2e_last_player_rolls", JSON.stringify(window.lastPlayerRolls));
      localStorage.setItem("mm2e_last_player_roll", JSON.stringify(window.lastPlayerRoll));
    } catch (e) {}

    renderSidebarLastRoll();
  };
  window.renderSidebarLastRoll = renderSidebarLastRoll;
  window.getPlayerRecentRolls = getPlayerRecentRolls;

  function initSessionDiceRoller() {
    const sidebar = document.getElementById("sessionDiceRollerSidebar");
    const btnToggle = document.getElementById("btnSessionDiceShortcut");
    const btnClose = document.getElementById("btnCloseDiceSidebar");
    const txtAdj = document.getElementById("txtDiceNotationAdj");
    const btnRoll = document.getElementById("btnExecuteDiceRoll");

    if (!sidebar || !btnToggle) return;

    function getRollFormula() {
      const rawAdj = txtAdj ? txtAdj.value.trim() : '';

      // Check if user entered a full standalone dice expression (e.g. "2d6+2" or "1d100")
      if (/\d*d\d+/i.test(rawAdj)) {
        return rawAdj;
      }

      // Check if user entered an adjustment (e.g. "+5", "-2", "4", "+1d4")
      let adjPart = '';
      if (rawAdj) {
        if (/^[+-]/.test(rawAdj)) {
          adjPart = `${rawAdj[0]}${rawAdj.slice(1).trim()}`;
        } else if (/^\d+$/.test(rawAdj)) {
          adjPart = `+${rawAdj}`;
        } else {
          adjPart = `+${rawAdj}`;
        }
      }

      return `1d20${adjPart ? (adjPart.startsWith('+') || adjPart.startsWith('-') ? adjPart : '+' + adjPart) : ''}`;
    }

    function updatePreview() {
      const formula = getRollFormula();
      if (btnRoll) {
        btnRoll.textContent = `🎲 Roll ${formula}`;
      }
    }

    function toggleSidebar(forceOpen) {
      const isOpen = sidebar.style.display === 'flex';
      const shouldOpen = (typeof forceOpen === 'boolean') ? forceOpen : !isOpen;
      sidebar.style.display = shouldOpen ? 'flex' : 'none';
      if (btnToggle) {
        if (shouldOpen) {
          btnToggle.style.background = 'var(--accent-primary)';
          btnToggle.style.color = '#ffffff';
          btnToggle.style.borderColor = 'var(--accent-primary)';
          if (txtAdj) txtAdj.focus();
        } else {
          btnToggle.style.background = '';
          btnToggle.style.color = '';
          btnToggle.style.borderColor = '';
        }
      }
      if (shouldOpen) {
        renderSidebarLastRoll();
      }
    }

    function executeRoll() {
      if (typeof window.isSessionRollAllowed === 'function' && !window.isSessionRollAllowed()) return;

      const formula = getRollFormula();
      const cleanExpr = formula.replace(/\s+/g, '');

      let rolled = null;
      let isNat20 = false;
      let isNat1 = false;
      let hpBonus = 0;
      let isHPRerolled = false;
      let hpAnnouncement = '';

      // Check if this is a standard 1d20 check (with optional flat modifier) to integrate with HP mechanics
      const d20Match = cleanExpr.match(/^1?d20(?:\s*([+-]\s*\d+))?$/i);
      if (d20Match && typeof window.performD20RollWithHP === 'function') {
        const baseMod = d20Match[1] ? parseInt(d20Match[1].replace(/\s+/g, ''), 10) : 0;
        const r = window.performD20RollWithHP(baseMod, char, 'check');
        const hpTag = (r.hpBonus > 0 ? ` [✨ HP +${r.hpBonus}]` : '') + (r.isHPRerolled ? ' [✨ HP Reroll]' : '');
        const breakdownText = (r.hpBonus > 0)
          ? `1d20 (${r.d20}) ${r.baseMod >= 0 ? '+' + r.baseMod : r.baseMod} [Base] + ${r.hpBonus} [✨ HP] = ${r.total}`
          : (r.isHPRerolled && r.rawD20 <= 10
             ? `1d20 (${r.rawD20} + 10 floor = ${r.d20}) ${r.mod >= 0 ? '+' + r.mod : r.mod} = ${r.total}`
             : `1d20 (${r.d20}) ${r.mod >= 0 ? '+' + r.mod : r.mod} = ${r.total}`);

        rolled = {
          total: r.total,
          breakdown: breakdownText,
          expression: formula,
          isNat20: !!r.isNat20,
          isNat1: !!r.isNat1
        };
        isNat20 = r.isNat20;
        isNat1 = r.isNat1;
        hpBonus = r.hpBonus;
        isHPRerolled = r.isHPRerolled;
        hpAnnouncement = r.hpAnnouncement;
      } else {
        const r = (typeof DiceNotation !== 'undefined') ? DiceNotation.roll(cleanExpr, 20) : { total: Math.floor(Math.random() * 20) + 1, breakdown: cleanExpr };
        rolled = {
          total: r.total,
          breakdown: r.breakdown || `${r.total}`,
          expression: r.expression || formula,
          isNat20: !!r.isNat20,
          isNat1: !!r.isNat1
        };
        isNat20 = !!r.isNat20;
        isNat1 = !!r.isNat1;
      }

      const hpSuffix = (hpBonus > 0 ? ` (✨ +${hpBonus} HP)` : '') + (isHPRerolled ? ' (✨ HP Reroll)' : '');
      const rollEntry = {
        type: 'ROLL',
        characterName: char?.name || "Hero",
        playerName: char?.playerName || (typeof localStorage !== 'undefined' ? localStorage.getItem("mm2e_player_name") : "") || "Player",
        rollType: `Dice (${rolled.expression || formula})${hpSuffix}`,
        total: rolled.total,
        breakdown: rolled.breakdown,
        isNat20: !!isNat20,
        isNat1: !!isNat1,
        hpBonus: hpBonus || 0,
        isHPRerolled: !!isHPRerolled,
        hpAnnouncement: hpAnnouncement || '',
        timestamp: new Date().toISOString(),
        isLocal: true
      };

      window.lastRollConfig = {
        ...rollEntry,
        title: `Dice (${rolled.expression || formula})`
      };

      if (typeof SessionNetwork !== 'undefined') {
        SessionNetwork.sendRoll(rollEntry);
      } else {
        if (typeof CampaignManager !== 'undefined') CampaignManager.addLogEntry(rollEntry);
        sessionLocalLog.push(rollEntry);
        renderSessionFeed();
      }

      if (typeof window.updateSidebarLastRoll === 'function') {
        window.updateSidebarLastRoll(rollEntry);
      }
    }

    // Event Listeners
    btnToggle.addEventListener("click", () => toggleSidebar());
    if (btnClose) btnClose.addEventListener("click", () => toggleSidebar(false));

    // Quick adjustment chips
    document.querySelectorAll(".session-dice-sidebar .dice-quick-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const adjVal = chip.dataset.adj;
        if (adjVal === 'clear') {
          if (txtAdj) txtAdj.value = '';
        } else {
          if (txtAdj) {
            txtAdj.value = adjVal;
          }
        }
        updatePreview();
        if (txtAdj) txtAdj.focus();
      });
    });

    if (txtAdj) {
      txtAdj.addEventListener("input", updatePreview);
      txtAdj.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          executeRoll();
        }
      });
    }

    if (btnRoll) {
      btnRoll.addEventListener("click", executeRoll);
    }

    // Close on Escape key if sidebar is active
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sidebar.style.display === "flex") {
        toggleSidebar(false);
      }
    });

    // Initial preview setup & render last roll
    updatePreview();
    renderSidebarLastRoll();
  }
  initSessionDiceRoller();

  // 3. Standalone Dedicated GM Tab Operations
  function openGMTab() {
    const gmContent = document.getElementById("tab-gm");
    const btnBack = document.getElementById("btnBackFromTables");
    const btnTables = document.getElementById("btnOpenTables");
    const btnTracker = document.getElementById("btnOpenTracker");
    const btnGM = document.getElementById("btnOpenGM");

    // If GM tab is already active, return back to previous view
    if (gmContent && gmContent.classList.contains("active")) {
      if (btnBack) btnBack.click();
      return;
    }

    const currentActiveBtn = document.querySelector(".tab-btn.active");
    if (currentActiveBtn && currentActiveBtn.dataset.tab && currentActiveBtn.dataset.tab !== "tab-gm") {
      previousActiveTab = currentActiveBtn.dataset.tab;
    }

    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
    if (document.documentElement) document.documentElement.classList.remove("session-tab-active");
    if (document.body) document.body.classList.remove("session-tab-active");

    if (gmContent) gmContent.classList.add("active");

    const trackerContent = document.getElementById("tab-tracker");
    if (trackerContent) trackerContent.classList.remove("active");
    const tablesContent = document.getElementById("tab-tables");
    if (tablesContent) tablesContent.classList.remove("active");

    if (btnGM) {
      btnGM.classList.add("btn-primary");
      btnGM.classList.remove("btn-secondary");
    }
    if (btnTables) {
      btnTables.classList.remove("btn-primary");
      btnTables.classList.add("btn-secondary");
    }
    if (btnTracker) {
      btnTracker.classList.remove("btn-primary");
      btnTracker.classList.add("btn-secondary");
    }

    const targetTab = previousActiveTab || "tab-basics";
    const prevBtn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
    const prevName = prevBtn ? prevBtn.textContent.trim() : (previousActiveTab === "tab-session" ? "Session" : (previousActiveTab === "tab-tracker" ? "Tracker" : "Previous View"));
    showSpecialTabBackButton(prevName);

    syncGMUI();
  }
  window.openGMTab = openGMTab;

  if (btnOpenGM) {
    btnOpenGM.addEventListener("click", openGMTab);
  }

  if (btnOpenUsers) {
    btnOpenUsers.addEventListener("click", () => {
      if (modalCampaignUsers && modalCampaignUsers.classList.contains("active")) {
        closeCampaignUsersModal();
      } else {
        openCampaignUsersModal();
      }
    });
  }

  const btnMainUsers = document.getElementById("btnMainUsers");
  if (btnMainUsers) {
    btnMainUsers.addEventListener("click", () => {
      openCampaignUsersModal();
    });
  }

  if (btnGMReturn) {
    btnGMReturn.addEventListener("click", () => {
      const btnBack = document.getElementById("btnBackFromTables");
      if (btnBack) btnBack.click();
    });
  }

  if (btnGMRefreshCharacters) {
    btnGMRefreshCharacters.addEventListener("click", () => {
      renderGMCampaignCharacters();
      if (typeof showToast === 'function') showToast("Refreshed campaign characters.", "info");
    });
  }

  function syncGMUI() {
    if (typeof CampaignManager === 'undefined') return;
    const camps = CampaignManager.getCampaigns();
    const activeCamp = CampaignManager.getActiveCampaign();

    if (selGMCamps) {
      selGMCamps.innerHTML = camps.map(c => `
        <option value="${c.id}" ${activeCamp && activeCamp.id === c.id ? 'selected' : ''}>${escapeHtml(c.name)} (${escapeHtml(c.code)})</option>
      `).join('');
    }

    if (!activeCamp) return;

    if (typeof SessionNetwork !== 'undefined') {
      const netStatus = SessionNetwork.getStatus();
      if (netStatus.role !== 'HOST' || netStatus.code !== activeCamp.code) {
        SessionNetwork.startHost(activeCamp.code);
      }
    }

    if (lblActiveCampCode) {
      lblActiveCampCode.textContent = activeCamp.code || "campaign-1";
    }

    const lblGMUserCount = document.getElementById("lblGMUserCount");
    if (lblGMUserCount) {
      lblGMUserCount.textContent = CampaignManager.getAuthorizedUsers().length;
    }

    renderGMJoinRequests();
    renderGMTimeline();
    renderGMCampaignCharacters();
    renderGMPartyNpcList();
    renderGMEncounterEnemyList();
    renderCampaignUsersList();
    initUserIdentityAndAccount();
    syncPartyRosterUI();
    updateGameSessionUI();
  }
  window.syncGMUI = syncGMUI;

  function renderGMJoinRequests() {
    if (!boxJoinReqs || !listJoinReqs || typeof CampaignManager === 'undefined') return;
    const camp = CampaignManager.getActiveCampaign();
    const reqs = camp?.pendingRequests || [];

    if (reqs.length === 0) {
      boxJoinReqs.style.display = "none";
      listJoinReqs.innerHTML = "";
      return;
    }

    boxJoinReqs.style.display = "block";
    listJoinReqs.innerHTML = reqs.map(r => {
      const isNewDev = !!r.isNewDevice;
      const deviceBadge = isNewDev 
        ? `<span class="badge" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid #f59e0b; font-size: 11px; margin-left: 6px;" title="Authorized user connecting from a new device key">📱 New Device (${escapeHtml((r.userToken || '').substring(0, 8))}...)</span>` 
        : '';
      const actionBtn = isNewDev
        ? `<button type="button" class="btn btn-primary" style="height: 28px; padding: 0 10px; font-size: var(--font-size-controls, 13px); font-weight: 600;" onclick="window.gmTrustDeviceAndApprovePlayer('${r.id}')">✓ Trust Device &amp; Accept</button>`
        : `<button type="button" class="btn btn-primary" style="height: 28px; padding: 0 12px; font-size: var(--font-size-controls, 13px); font-weight: 600;" onclick="window.gmApprovePlayer('${r.id}')">✓ Accept</button>`;

      return `
        <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-card); padding: 8px 12px; border-radius: 4px; border: 1px solid var(--border-color); font-size: var(--font-size-controls, 14px); gap: 8px;">
          <div>
            <strong style="font-size: var(--font-size-controls, 14px);">${escapeHtml(r.playerName)}</strong> playing <span class="badge" style="color: var(--accent-primary); font-size: var(--font-size-fine-print, 12px);">${escapeHtml(r.characterName)}</span>
            ${deviceBadge}
          </div>
          <div style="display: flex; gap: 6px;">
            ${actionBtn}
            <button type="button" class="btn btn-secondary" style="height: 28px; padding: 0 12px; font-size: var(--font-size-controls, 13px);" onclick="window.gmRejectPlayer('${r.id}')">✕ Decline</button>
          </div>
        </div>
      `;
    }).join('');
  }

  window.gmTrustDeviceAndApprovePlayer = function(playerId) {
    if (typeof CampaignManager === 'undefined') return;
    const camp = CampaignManager.getActiveCampaign();
    if (!camp) return;
    const req = (camp.pendingRequests || []).find(r => r.id === playerId);
    if (!req) return;
    if (req.userToken && typeof CampaignManager.trustAuthorizedUserToken === 'function') {
      CampaignManager.trustAuthorizedUserToken(req.playerName, req.userToken);
    }
    CampaignManager.approvePlayer(playerId);
    if (typeof SessionNetwork !== 'undefined') {
      SessionNetwork.acceptJoin(playerId, camp);
    }
    renderGMJoinRequests();
    renderCampaignUsersList();
    syncPartyRosterUI();
    syncGMRosterUI();
    if (typeof showToast === 'function') showToast(`Trusted new device for "${req.playerName}" and accepted!`, "success");
  };

  window.gmApprovePlayer = function(playerId) {
    if (typeof CampaignManager === 'undefined') return;
    const camp = CampaignManager.getActiveCampaign();
    CampaignManager.approvePlayer(playerId);
    if (typeof SessionNetwork !== 'undefined') {
      SessionNetwork.acceptJoin(playerId, camp);
    }
    renderGMJoinRequests();
    renderCampaignUsersList();
    syncPartyRosterUI();
    syncGMRosterUI();
    if (typeof showToast === 'function') showToast("Player accepted into campaign!", "success");
  };

  window.gmRejectPlayer = function(playerId) {
    if (typeof CampaignManager === 'undefined') return;
    CampaignManager.rejectPlayer(playerId);
    if (typeof SessionNetwork !== 'undefined') {
      SessionNetwork.rejectJoin(playerId);
    }
    renderGMJoinRequests();
    if (typeof showToast === 'function') showToast("Join request declined.", "info");
  };

  // --- Save Point Timeline Operations ---
  function renderGMTimeline() {
    const container = document.getElementById("gmTimelineContainer");
    const chkAuto = document.getElementById("chkGMAutoBackupChars");
    if (!container || typeof CampaignManager === 'undefined') return;

    if (chkAuto) {
      chkAuto.checked = CampaignManager.isAutoBackupCharactersEnabled();
    }

    const timeline = CampaignManager.getSnapshotTimeline();
    if (timeline.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); font-size: var(--font-size-secondary, 14px); padding: 16px; font-style: italic;">
          No Save Points recorded yet. Click "📸 Create Save Point" above to create an instant snapshot checkpoint.
        </div>
      `;
      return;
    }

    container.innerHTML = timeline.map(s => {
      const dateStr = s.timestamp ? new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '';
      return `
        <div class="gm-timeline-item" style="display: flex; align-items: center; justify-content: space-between; padding: 2px 8px; min-height: 24px; line-height: 1.2; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 3px; gap: 6px;">
          <div style="display: flex; align-items: center; gap: 6px; flex: 1; flex-wrap: wrap;">
            <span style="font-family: monospace; font-size: 11px; color: var(--text-muted);">[${dateStr}]</span>
            <strong style="font-size: 12px; color: var(--text-main);">${escapeHtml(s.label)}</strong>
            <span class="badge" style="font-size: 11px; padding: 1px 6px; background: rgba(2, 132, 199, 0.15); color: #0284c7;">${s.characterCount || 0} chars</span>
          </div>
          <div style="display: flex; gap: 4px; align-items: center;">
            <button type="button" class="btn btn-primary" style="height: 22px; padding: 0 6px; font-size: 11px; font-weight: 600;" onclick="window.gmRollbackClick('${s.id}')" title="Roll back campaign to this save point">⏪ Roll Back</button>
            <button type="button" class="btn btn-secondary" style="height: 22px; padding: 0 6px; font-size: 11px;" onclick="window.openCharExtractionModal('${s.id}')" title="Extract individual character from this snapshot">📦 Extract</button>
            <button type="button" class="btn btn-secondary" style="height: 22px; padding: 0 6px; font-size: 11px; color: #ef4444;" onclick="window.gmDeleteSnapshotClick('${s.id}')" title="Delete snapshot">🗑</button>
          </div>
        </div>
      `;
    }).join('');
  }

  if (btnGMCreateSavePoint) {
    btnGMCreateSavePoint.addEventListener("click", () => {
      if (typeof CampaignManager === 'undefined') return;
      const defLabel = `Save Point - ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      const label = prompt("Enter Save Point label / description:", defLabel);
      if (label !== null) {
        CampaignManager.createSnapshot(label);
        renderGMTimeline();
        if (typeof showToast === 'function') showToast("Save Point created!", "success");
      }
    });
  }

  if (chkGMAutoBackupChars) {
    chkGMAutoBackupChars.addEventListener("change", (e) => {
      if (typeof CampaignManager !== 'undefined') {
        CampaignManager.setAutoBackupCharacters(e.target.checked);
      }
    });
  }

  window.gmRollbackClick = function(snapshotId) {
    if (typeof CampaignManager === 'undefined') return;
    const timeline = CampaignManager.getSnapshotTimeline();
    const snap = timeline.find(s => s.id === snapshotId);
    if (!snap) return;

    if (confirm(`Roll back campaign state to Save Point "${snap.label}"?\n\n(A pre-rollback checkpoint will be saved automatically so no current progress is lost)`)) {
      const res = CampaignManager.rollbackToSnapshot(snapshotId);
      if (res.success) {
        if (typeof showToast === 'function') showToast(`Rolled back to "${snap.label}"!`, "success");
        syncPartyRosterUI();
        syncGMUI();
      } else {
        alert(res.error || "Rollback failed");
      }
    }
  };

  window.gmDeleteSnapshotClick = function(snapshotId) {
    if (typeof CampaignManager === 'undefined') return;
    if (confirm("Delete this Save Point snapshot from the timeline?")) {
      CampaignManager.deleteSnapshot(snapshotId);
      renderGMTimeline();
    }
  };

  // --- Selective Character Extraction ---
  if (btnGMExtractCharacter) {
    btnGMExtractCharacter.addEventListener("click", () => {
      window.openCharExtractionModal(null);
    });
  }

  window.openCharExtractionModal = function(snapshotId = null) {
    const modal = document.getElementById("charExtractionModal");
    const body = document.getElementById("charExtractionModalBody");
    const title = document.getElementById("charExtractionModalTitle");
    if (!modal || !body || typeof CampaignManager === 'undefined') return;

    const camp = CampaignManager.getActiveCampaign();
    if (!camp) return;

    let snapLabel = "Live Campaign State";
    const characters = [];

    if (snapshotId) {
      const timeline = CampaignManager.getSnapshotTimeline();
      const snap = timeline.find(s => s.id === snapshotId);
      if (snap && snap.state) {
        snapLabel = snap.label;
        (snap.state.acceptedPlayers || []).forEach(p => {
          characters.push({ id: p.id, name: p.characterName, player: p.playerName, pl: p.characterSummary?.powerLevel || 10, type: 'PC', snapId: snapshotId, raw: p });
        });
        (snap.state.npcs || []).forEach(n => {
          characters.push({ id: n.id, name: n.name, player: 'GM (Party NPC)', pl: n.powerLevel || 10, type: 'NPC', snapId: snapshotId, raw: n });
        });
        (snap.state.encounterEnemies || []).forEach(e => {
          characters.push({ id: e.id, name: e.name, player: 'GM (Enemy)', pl: e.powerLevel || 10, type: 'Enemy', snapId: snapshotId, raw: e });
        });
      }
    } else {
      if (char && char.name) {
        characters.push({ id: 'local_hero', name: char.name, player: char.playerName || 'Local', pl: char.powerLevel || 10, type: 'Local Hero', snapId: null });
      }
      (camp.acceptedPlayers || []).forEach(p => {
        characters.push({ id: p.id, name: p.characterName, player: p.playerName, pl: p.characterSummary?.powerLevel || 10, type: 'PC', snapId: null, raw: p });
      });
      (camp.npcs || []).forEach(n => {
        characters.push({ id: n.id, name: n.name, player: 'GM (Party NPC)', pl: n.powerLevel || 10, type: 'NPC', snapId: null, raw: n });
      });
      (camp.encounterEnemies || []).forEach(e => {
        characters.push({ id: e.id, name: e.name, player: 'GM (Enemy)', pl: e.powerLevel || 10, type: 'Enemy', snapId: null, raw: e });
      });
    }

    if (title) title.textContent = `📦 Character Extraction: ${snapLabel}`;

    if (characters.length === 0) {
      body.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 24px;">No characters found in this save point.</div>`;
    } else {
      body.innerHTML = characters.map(c => `
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 8px 12px; gap: 10px;">
          <div>
            <strong style="font-size: 14px; color: var(--accent-primary);">${escapeHtml(c.name)}</strong>
            <span class="badge" style="font-size: 11px; margin-left: 6px;">PL ${c.pl}</span>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
              ${c.type} • ${escapeHtml((c.player || '').replace(/\s*\(\s*PL\s*#?\d*\s*\)\*?/gi, '').trim())}
            </div>
          </div>
          <div style="display: flex; gap: 6px;">
            <button type="button" class="btn btn-primary" style="font-size: 11px; padding: 3px 8px;" onclick="window.gmExtractAndLoad('${c.snapId || ''}', '${c.id}')">👁️ Load into Editor</button>
            <button type="button" class="btn btn-secondary" style="font-size: 11px; padding: 3px 8px;" onclick="window.gmExtractAndDownload('${c.snapId || ''}', '${c.id}')">💾 Download .mm2e</button>
          </div>
        </div>
      `).join('');
    }

    modal.classList.add("active");
  };

  window.gmExtractAndLoad = function(snapshotId, charId) {
    if (charId === 'local_hero') {
      if (typeof showToast === 'function') showToast("Local hero is already in editor.", "info");
      return;
    }
    const extracted = CampaignManager.extractCharacterFromSnapshot(snapshotId || null, charId);
    if (extracted && extracted.sheet) {
      if (confirm(`Load "${extracted.characterName}" into your character editor? (This will overwrite current editor sheet)`)) {
        applyLoadedCharacter(extracted.sheet);
        document.getElementById("charExtractionModal")?.classList.remove("active");
        if (typeof showToast === 'function') showToast(`Loaded "${extracted.characterName}" into editor!`, "success");
      }
    } else {
      alert("No character sheet data available for this character.");
    }
  };

  window.gmExtractAndDownload = function(snapshotId, charId) {
    if (charId === 'local_hero') {
      window.gmExportCharSheet('local_hero');
      return;
    }
    const extracted = CampaignManager.extractCharacterFromSnapshot(snapshotId || null, charId);
    if (extracted && extracted.sheet) {
      const payload = JSON.stringify(extracted.sheet, null, 2);
      downloadCharJson(payload, `${extracted.characterName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mm2e`);
      if (typeof showToast === 'function') showToast(`Downloaded "${extracted.characterName}" sheet!`, "success");
    } else {
      alert("No character sheet data available for this character.");
    }
  };

  // --- Campaign Characters & Party Membership in GM Tab ---
  function renderGMCampaignCharacters() {
    const list = document.getElementById("gmCampaignCharactersList");
    if (!list || typeof CampaignManager === 'undefined') return;
    const camp = CampaignManager.getActiveCampaign();
    if (!camp) return;

    const savedChars = CampaignManager.getSavedCharacters();
    const isLocalGmCharInParty = CampaignManager.isCharacterInParty('local_hero') || CampaignManager.isGmCharIncludedInParty();

    let html = '';

    // 1. GM's Active Editor Hero
    const gmCharName = (typeof char !== 'undefined' && char && char.name) ? char.name : 'Editor Hero';
    const gmPl = (typeof char !== 'undefined' && char) ? (char.powerLevel || 10) : 10;
    html += `
      <div class="campaign-character-row" style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; padding: 8px 12px; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <strong style="color: var(--accent-primary); font-size: 13px;">👑 ${escapeHtml(gmCharName)}</strong>
          <span class="badge" style="background: rgba(234, 179, 8, 0.2); color: #eab308; font-weight: bold; font-size: 11px;">GM Sheet</span>
          <span style="font-size: 12px; color: var(--text-muted);">PL ${gmPl}</span>
          ${isLocalGmCharInParty
            ? `<span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid #10b981; font-size: 11px;">✓ In Party</span>`
            : `<span class="badge" style="background: rgba(107, 114, 128, 0.15); color: var(--text-muted); border: 1px solid var(--border-color); font-size: 11px;">Not in Party</span>`}
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          ${isLocalGmCharInParty
            ? `<button type="button" class="btn btn-secondary" style="height: 24px; padding: 0 8px; font-size: 11px; color: #ef4444;" onclick="window.gmRemoveCampaignCharFromParty('local_hero')">🚫 Remove from Party</button>`
            : `<button type="button" class="btn btn-primary" style="height: 24px; padding: 0 8px; font-size: 11px;" onclick="window.gmAddCampaignCharToParty('local_hero')">+ Add to Party</button>`}
        </div>
      </div>
    `;

    // 2. Saved Campaign Characters
    if (savedChars.length === 0) {
      html += `
        <div style="text-align: center; color: var(--text-muted); font-size: 12px; padding: 12px; font-style: italic;">
          No player characters submitted or saved yet. When connected players submit their sheets, they will appear here.
        </div>
      `;
    } else {
      savedChars.forEach(sc => {
        const inParty = CampaignManager.isCharacterInParty(sc.id) || (sc.characterName && CampaignManager.isCharacterInParty(sc.characterName));
        const safeId = sc.id.replace(/'/g, "\\'");
        const safeName = (sc.characterName || 'Hero').replace(/'/g, "\\'");

        html += `
          <div class="campaign-character-row" style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; padding: 8px 12px; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <strong style="color: var(--text-main); font-size: 13px;">👤 ${escapeHtml(sc.characterName)}</strong>
              <span class="badge" style="background: rgba(2, 132, 199, 0.15); color: #0284c7; font-size: 11px;">${escapeHtml(sc.playerName)}</span>
              <span style="font-size: 12px; color: var(--text-muted);">PL ${sc.powerLevel || 10}</span>
              ${inParty
                ? `<span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid #10b981; font-size: 11px;">✓ In Party</span>`
                : `<span class="badge" style="background: rgba(107, 114, 128, 0.15); color: var(--text-muted); border: 1px solid var(--border-color); font-size: 11px;">Not in Party</span>`}
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              ${inParty
                ? `<button type="button" class="btn btn-secondary" style="height: 24px; padding: 0 8px; font-size: 11px; color: #ef4444;" onclick="window.gmRemoveCampaignCharFromParty('${safeId}')">🚫 Remove from Party</button>`
                : `<button type="button" class="btn btn-primary" style="height: 24px; padding: 0 8px; font-size: 11px;" onclick="window.gmAddCampaignCharToParty('${safeId}')">+ Add to Party</button>`}
              <button type="button" class="btn btn-secondary" style="height: 24px; padding: 0 8px; font-size: 11px;" title="Load into character editor" onclick="window.gmLoadSavedCharToEditor('${safeId}')">👁️ Load</button>
              <button type="button" class="btn btn-secondary" style="height: 24px; padding: 0 8px; font-size: 11px; color: #ef4444;" title="Delete saved character" onclick="window.gmDeleteSavedCharClick('${safeId}', '${safeName}')">🗑️</button>
            </div>
          </div>
        `;
      });
    }

    list.innerHTML = html;
  }
  window.renderGMCampaignCharacters = renderGMCampaignCharacters;

  window.gmAddCampaignCharToParty = function(charId) {
    if (typeof CampaignManager === 'undefined') return;
    if (charId === 'local_hero') {
      try { localStorage.removeItem("mm2e_exclude_local_hero_from_party"); } catch (e) {}
      try { localStorage.setItem("mm2e_include_gm_char_in_party", "true"); } catch (e) {}
      if (chkGMIncludeCharInParty) chkGMIncludeCharInParty.checked = true;
    }
    CampaignManager.addCharacterToParty(charId);
    renderGMCampaignCharacters();
    syncPartyRosterUI();
    if (typeof SessionNetwork !== 'undefined' && SessionNetwork.getStatus().role === 'HOST') {
      SessionNetwork.broadcastStateSync(CampaignManager.getActiveCampaign());
    }
    if (typeof showToast === 'function') showToast("Added character to party roster!", "success");
  };

  window.gmRemoveCampaignCharFromParty = function(charId) {
    if (typeof CampaignManager === 'undefined') return;
    if (charId === 'local_hero') {
      try { localStorage.setItem("mm2e_exclude_local_hero_from_party", "true"); } catch (e) {}
      try { localStorage.setItem("mm2e_include_gm_char_in_party", "false"); } catch (e) {}
      if (chkGMIncludeCharInParty) chkGMIncludeCharInParty.checked = false;
    }
    CampaignManager.removeCharacterFromParty(charId);
    renderGMCampaignCharacters();
    syncPartyRosterUI();
    if (typeof SessionNetwork !== 'undefined' && SessionNetwork.getStatus().role === 'HOST') {
      SessionNetwork.broadcastStateSync(CampaignManager.getActiveCampaign());
    }
    if (typeof showToast === 'function') showToast("Removed character from party roster.", "info");
  };

  window.gmDeleteSavedCharClick = function(charId, charName) {
    if (typeof CampaignManager === 'undefined') return;
    if (confirm(`Delete saved character "${charName}" from this campaign?`)) {
      CampaignManager.deleteSavedCharacter(charId);
      renderGMCampaignCharacters();
      syncPartyRosterUI();
      if (typeof showToast === 'function') showToast(`Deleted "${charName}".`, "info");
    }
  };

  window.gmLoadSavedCharToEditor = function(charId) {
    if (typeof CampaignManager === 'undefined') return;
    const savedChars = CampaignManager.getSavedCharacters();
    const found = savedChars.find(c => c.id === charId);
    if (!found || !found.characterData) {
      alert("Character data not found.");
      return;
    }
    if (confirm(`Load "${found.characterName}" into the active editor? Any unsaved changes on current sheet will be replaced.`)) {
      if (typeof char !== 'undefined' && typeof char.deserialize === 'function') {
        char.deserialize(found.characterData);
        if (typeof renderAll === 'function') renderAll();
        if (typeof updateTitleBar === 'function') updateTitleBar();
        if (typeof showToast === 'function') showToast(`Loaded "${found.characterName}" into editor!`, "success");
      }
    }
  };

  // --- Party NPCs & Encounter Adversaries in GM Tab ---
  // --- Party NPCs & Encounter Adversaries in GM Tab ---
  function renderGMPartyNpcList() {
    const list = document.getElementById("gmPartyNpcList");
    if (!list || typeof CampaignManager === 'undefined') return;
    const camp = CampaignManager.getActiveCampaign();
    const npcs = camp?.npcs || [];

    if (npcs.length === 0) {
      list.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 12px; padding: 8px; font-style: italic;">No friendly party NPCs attached.</div>`;
      return;
    }

    list.innerHTML = npcs.map(n => {
      const isCurrentlyEdited = window.activeEditorNpcId === n.id;
      return `
      <div style="display: flex; justify-content: space-between; align-items: center; background: ${isCurrentlyEdited ? 'rgba(2, 132, 199, 0.12)' : 'var(--bg-card)'}; border: 1px solid ${isCurrentlyEdited ? '#0284c7' : 'var(--border-color)'}; border-radius: 3px; padding: 3px 8px; min-height: 26px; line-height: 1.2; gap: 6px;">
        <div class="gm-char-menu-wrapper" style="position: relative; display: inline-flex; align-items: center; gap: 6px;">
          <button type="button" class="gm-char-name-btn" onclick="window.gmToggleCharMenu(event, 'gm_tab_${n.id}')" title="Click for NPC actions" style="background: none; border: none; font-weight: 700; font-size: 13px; color: #0284c7; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; padding: 0;">
            ${escapeHtml(n.name)} <span style="font-size: var(--font-size-fine-print); opacity: 0.7;">▾</span>
            ${isCurrentlyEdited ? '<span class="badge" style="background: #0284c7; color: #fff; font-size: 10px; padding: 1px 4px;">In Editor</span>' : ''}
          </button>
          <div id="gmCharMenu_gm_tab_${n.id}" class="gm-char-dropdown-menu" style="display: none;">
            ${isCurrentlyEdited ? `
              <button type="button" class="gm-char-menu-item" style="color: #0284c7; font-weight: bold;" onclick="window.gmReturnToPrimarySheet(); window.gmCloseAllCharMenus();">
                ↩ Return to GM Sheet
              </button>
            ` : `
              <button type="button" class="gm-char-menu-item" onclick="window.gmLoadNpcToEditor('${n.id}'); window.gmCloseAllCharMenus();">
                👁️ Load into Editor
              </button>
            `}
            <button type="button" class="gm-char-menu-item" onclick="window.duplicateNPC('${n.id}'); window.gmCloseAllCharMenus();">
              📋 Duplicate NPC
            </button>
            <button type="button" class="gm-char-menu-item" onclick="if (window.gmLoadNpcToEditor && window.activeEditorNpcId !== '${n.id}') window.gmLoadNpcToEditor('${n.id}'); window.sessionSpendHeroPoint('${n.id}', 'Hero Point spent'); window.gmCloseAllCharMenus();">
              ⭐ Spend Hero Point (${typeof n.heroPoints === 'number' ? n.heroPoints : 0} HP)
            </button>
            <button type="button" class="gm-char-menu-item" onclick="if (window.gmLoadNpcToEditor && window.activeEditorNpcId !== '${n.id}') window.gmLoadNpcToEditor('${n.id}'); window.openUseHeroPointModal('${n.id}'); window.gmCloseAllCharMenus();">
              ✨ Hero Point Options Menu...
            </button>
            <button type="button" class="gm-char-menu-item" onclick="window.gmExportCharSheet('${n.id}'); window.gmCloseAllCharMenus();">
              💾 Export NPC (.mm2e)
            </button>
            <div class="gm-char-menu-divider"></div>
            <button type="button" class="gm-char-menu-item" style="color: #ef4444;" onclick="window.gmRemoveNPC('${n.id}'); window.gmCloseAllCharMenus();">
              🚫 Remove NPC
            </button>
            <div class="gm-char-menu-divider"></div>
            <button type="button" class="gm-char-menu-item" style="color: var(--text-muted);" onclick="window.gmCloseAllCharMenus()">✕ Close Menu</button>
          </div>
          <span style="font-size: 11px; color: var(--text-muted);">PL ${n.powerLevel || 10}</span>
        </div>
        <div style="display: flex; gap: 4px;">
          ${isCurrentlyEdited ? `
            <button type="button" class="btn btn-secondary" style="height: 22px; padding: 0 6px; font-size: 11px; color: #0284c7; font-weight: bold;" onclick="window.gmReturnToPrimarySheet()" title="Stop editing and return to GM sheet">↩ Return</button>
          ` : `
            <button type="button" class="btn btn-secondary" style="height: 22px; padding: 0 6px; font-size: 11px;" onclick="window.gmLoadNpcToEditor('${n.id}')" title="Load into Editor">👁️ Load</button>
          `}
          <button type="button" class="btn btn-secondary" style="height: 22px; padding: 0 6px; font-size: 11px;" onclick="window.duplicateNPC('${n.id}')" title="Duplicate NPC">📋 Clone</button>
          <button type="button" class="btn btn-secondary" style="height: 22px; padding: 0 6px; font-size: 11px;" onclick="window.gmExportCharSheet('${n.id}')">💾</button>
          <button type="button" class="btn btn-secondary" style="height: 22px; padding: 0 6px; font-size: 11px; color: #ef4444;" onclick="window.gmRemoveNPC('${n.id}')">✕</button>
        </div>
      </div>
      `;
    }).join('');
  }

  function renderGMEncounterEnemyList() {
    const list = document.getElementById("gmEncounterEnemyList");
    if (!list || typeof CampaignManager === 'undefined') return;
    const enemies = CampaignManager.getEncounterEnemies();

    if (enemies.length === 0) {
      list.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 12px; padding: 8px; font-style: italic;">No encounter adversaries or enemies added.</div>`;
      return;
    }

    list.innerHTML = enemies.map(e => `
      <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 3px; padding: 3px 8px; min-height: 26px; line-height: 1.2; gap: 6px;">
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <strong style="font-size: 13px; color: #ef4444;">${escapeHtml(e.name)}</strong>
          <span style="font-size: 11px; color: var(--text-muted);">PL ${e.powerLevel || 10}</span>
          <span style="font-size: 11px; font-weight: 600; color: ${e.currentBruises > 0 ? '#f59e0b' : 'var(--text-muted)'};">B: ${e.currentBruises || 0}</span>
          <span style="font-size: 11px; font-weight: 600; color: ${e.currentInjured > 0 ? '#ef4444' : 'var(--text-muted)'};">I: ${e.currentInjured || 0}</span>
        </div>
        <div style="display: flex; gap: 4px;">
          <button type="button" class="btn btn-secondary" style="height: 22px; padding: 0 6px; font-size: 11px;" onclick="window.gmQuickRollEnemy('${e.id}')" title="Quick Roll 1d20 Attack">🎲 Roll</button>
          <button type="button" class="btn btn-secondary" style="height: 22px; padding: 0 6px; font-size: 11px;" onclick="window.duplicateNPC('${e.id}')" title="Duplicate Adversary">📋 Clone</button>
          <button type="button" class="btn btn-secondary" style="height: 22px; padding: 0 6px; font-size: 11px;" onclick="window.gmStepEnemyBruise('${e.id}', 1)" title="+1 Bruised">+B</button>
          <button type="button" class="btn btn-secondary" style="height: 22px; padding: 0 6px; font-size: 11px; color: #ef4444;" onclick="window.gmRemoveEnemy('${e.id}')">✕</button>
        </div>
      </div>
    `).join('');
  }

  window.gmQuickRollEnemy = function(enemyId) {
    if (typeof CampaignManager === 'undefined') return;
    const enemies = CampaignManager.getEncounterEnemies();
    const enemy = enemies.find(e => e.id === enemyId);
    if (!enemy) return;

    const d20 = Math.floor(Math.random() * 20) + 1;
    const atk = enemy.characterData?.combat?.ATK || Math.floor(enemy.powerLevel / 2);
    const total = d20 + atk;
    const rollEntry = {
      characterName: enemy.name,
      playerName: "Adversary",
      isNPC: true,
      rollType: "Attack Check",
      total,
      breakdown: `1d20 (${d20}) + ${atk} = ${total}`,
      isNat20: d20 === 20,
      isNat1: d20 === 1
    };

    if (typeof SessionNetwork !== 'undefined') {
      SessionNetwork.sendRoll(rollEntry);
    } else {
      if (typeof CampaignManager !== 'undefined') CampaignManager.addLogEntry(rollEntry);
      sessionLocalLog.push(rollEntry);
      renderSessionFeed();
    }
    if (typeof showToast === 'function') showToast(`Rolled attack for ${enemy.name}: ${total}`, "info");
  };

  window.gmStepEnemyBruise = function(enemyId, delta) {
    if (typeof CampaignManager === 'undefined') return;
    const enemies = CampaignManager.getEncounterEnemies();
    const enemy = enemies.find(e => e.id === enemyId);
    if (enemy) {
      const next = Math.max(0, (enemy.currentBruises || 0) + delta);
      CampaignManager.updateEncounterEnemyConditions(enemyId, next, enemy.conditions, enemy.currentInjured);
      renderGMEncounterEnemyList();
    }
  };

  window.gmRemoveEnemy = function(enemyId) {
    if (typeof CampaignManager === 'undefined') return;
    CampaignManager.removeEncounterEnemy(enemyId);
    renderGMEncounterEnemyList();
    if (typeof showToast === 'function') showToast("Removed encounter enemy.", "info");
  };

  if (btnGMAddEnemy) {
    btnGMAddEnemy.addEventListener("click", () => {
      if (typeof CampaignManager === 'undefined') return;
      const name = prompt("Enter Adversary / Enemy Name:", "Villain");
      if (!name) return;
      const plStr = prompt("Enter Power Level (PL):", "10");
      const pl = parseInt(plStr, 10) || 10;
      CampaignManager.addEncounterEnemy(null, name, pl);
      renderGMEncounterEnemyList();
      if (typeof showToast === 'function') showToast(`Added adversary "${name}"!`, "success");
    });
  }

  async function parseCharacterFileForCampaign(file) {
    if (!file) throw new Error("No file selected.");
    const lower = file.name.toLowerCase();

    if (lower.endsWith('.por')) {
      if (typeof window.loadCharacterDataFromPor !== 'function') {
        throw new Error("POR Importer library is not loaded.");
      }
      const res = await window.loadCharacterDataFromPor(file);
      return {
        character: res.character,
        name: res.name || res.character?.name || "Imported Character",
        powerLevel: res.powerLevel || res.character?.powerLevel || 10
      };
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          let text = evt.target.result;
          if (typeof text === 'string') {
            text = text.replace(/^\uFEFF/, '').trim();
          }
          const parsed = JSON.parse(text);
          const cData = parsed.character || parsed;
          const name = cData.name || (cData.identity && cData.identity.heroName) || "Imported Character";
          const pl = typeof cData.powerLevel === 'number' ? cData.powerLevel : (cData.pl || 10);
          resolve({ character: cData, name, powerLevel: pl });
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(reader.error || new Error("Failed to read file"));
      reader.readAsText(file);
    });
  }

  if (btnGMAddEnemyFile && fileGMAddEnemy) {
    btnGMAddEnemyFile.addEventListener("click", () => fileGMAddEnemy.click());
    fileGMAddEnemy.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file || typeof CampaignManager === 'undefined') return;
      try {
        const { character: cData, name, powerLevel } = await parseCharacterFileForCampaign(file);
        CampaignManager.addEncounterEnemy(cData, name, powerLevel);
        renderGMEncounterEnemyList();
        syncGMRosterUI();
        if (typeof showToast === 'function') showToast(`Added enemy "${name}" from file!`, "success");
      } catch (err) {
        console.error("Failed to load enemy file:", err);
        alert("Failed to parse character file: " + err.message);
      }
      e.target.value = "";
    });
  }

  if (btnGMAttachNPCFile && fileGMAttachNPC) {
    btnGMAttachNPCFile.addEventListener("click", () => fileGMAttachNPC.click());
    fileGMAttachNPC.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file || typeof CampaignManager === 'undefined') return;
      try {
        const { character: cData, name, powerLevel } = await parseCharacterFileForCampaign(file);
        CampaignManager.attachNPC(cData, name, powerLevel);
        renderGMPartyNpcList();
        syncPartyRosterUI();
        syncGMRosterUI();
        if (typeof showToast === 'function') showToast(`Attached party NPC "${name}" from file!`, "success");
      } catch (err) {
        console.error("Failed to load NPC file:", err);
        alert("Failed to parse character file: " + err.message);
      }
      e.target.value = "";
    });
  }

  // Master Roster / Party Damage & Condition Steppers
  window.gmStepBruises = function(charId, isNpc, type, delta) {
    if (typeof CampaignManager === 'undefined') return;
    if (isNpc) {
      const camp = CampaignManager.getActiveCampaign();
      const npc = (camp?.npcs || []).find(n => n.id === charId);
      if (npc) {
        if (type === 'Injured') {
          const next = Math.max(0, (npc.currentInjured || 0) + delta);
          CampaignManager.updateNPCConditions(charId, npc.currentBruises, npc.conditions, next);
        } else {
          const next = Math.max(0, (npc.currentBruises || 0) + delta);
          CampaignManager.updateNPCConditions(charId, next, npc.conditions, npc.currentInjured);
        }
        syncPartyRosterUI();
      }
    } else if (charId === "local_hero") {
      stepConditionCount(type, delta);
      syncPartyRosterUI();
    } else {
      const camp = CampaignManager.getActiveCampaign();
      const player = (camp?.acceptedPlayers || []).find(p => p.id === charId);
      if (player) {
        let b = player.currentBruises || 0;
        let inj = player.currentInjured || 0;
        if (type === 'Injured') inj = Math.max(0, inj + delta);
        else b = Math.max(0, b + delta);
        CampaignManager.updatePlayerConditions(charId, b, player.conditions, player.heroPoints, inj);
        if (typeof SessionNetwork !== 'undefined') {
          SessionNetwork.sendGMStatusOverride(charId, {
            characterName: player.characterName,
            bruises: b,
            injured: inj,
            conditions: player.conditions,
            heroPoints: player.heroPoints
          });
        }
        syncPartyRosterUI();
      }
    }
  };


  window.gmSetCondition = function(charId, isNpc, condName, val) {
    if (typeof CampaignManager === 'undefined') return;
    if (isNpc) {
      const camp = CampaignManager.getActiveCampaign();
      const npc = (camp?.npcs || []).find(n => n.id === charId);
      if (npc) {
        const conds = { ...(npc.conditions || {}) };
        if (val) conds[condName] = true;
        else delete conds[condName];
        CampaignManager.updateNPCConditions(charId, npc.currentBruises, conds, npc.currentInjured);
        syncGMRosterUI();
      }
    } else if (charId === "local_hero") {
      if (typeof toggleConditionDirect === 'function') {
        toggleConditionDirect(condName, !!val);
      } else if (char) {
        if (!char.trackerState) char.trackerState = { conditions: {} };
        if (!char.trackerState.conditions) char.trackerState.conditions = {};
        if (val) char.trackerState.conditions[condName] = true;
        else delete char.trackerState.conditions[condName];
      }
      syncGMRosterUI();
    } else {
      // Remote player
      const camp = CampaignManager.getActiveCampaign();
      const player = (camp?.acceptedPlayers || []).find(p => p.id === charId);
      if (player) {
        const conds = { ...(player.conditions || {}) };
        if (val) conds[condName] = true;
        else delete conds[condName];
        CampaignManager.updatePlayerConditions(charId, player.currentBruises, conds, player.heroPoints, player.currentInjured);
        if (typeof SessionNetwork !== 'undefined') {
          SessionNetwork.sendGMStatusOverride(charId, {
            characterName: player.characterName,
            bruises: player.currentBruises,
            injured: player.currentInjured,
            conditions: conds,
            heroPoints: player.heroPoints
          });
        }
        syncGMRosterUI();
      }
    }
  };

  window.gmToggleCondition = function(charId, isNpc, condName) {
    let currentlyActive = false;
    if (isNpc) {
      const camp = typeof CampaignManager !== 'undefined' ? CampaignManager.getActiveCampaign() : null;
      const npc = (camp?.npcs || []).find(n => n.id === charId);
      currentlyActive = !!npc?.conditions?.[condName];
    } else if (charId === "local_hero") {
      currentlyActive = !!char?.trackerState?.conditions?.[condName];
    } else {
      const camp = typeof CampaignManager !== 'undefined' ? CampaignManager.getActiveCampaign() : null;
      const player = (camp?.acceptedPlayers || []).find(p => p.id === charId);
      currentlyActive = !!player?.conditions?.[condName];
    }
    window.gmSetCondition(charId, isNpc, condName, !currentlyActive);
  };

  window.gmAddConditionSelect = function(charId, isNpc, selectElem) {
    if (!selectElem || !selectElem.value) return;
    const condName = selectElem.value;
    selectElem.value = "";
    window.gmSetCondition(charId, isNpc, condName, true);
  };

  window.gmClearAllConditions = function(charId, isNpc) {
    if (typeof CampaignManager === 'undefined') return;
    if (isNpc) {
      const camp = CampaignManager.getActiveCampaign();
      const npc = (camp?.npcs || []).find(n => n.id === charId);
      if (npc) {
        CampaignManager.updateNPCConditions(charId, npc.currentBruises, {}, npc.currentInjured);
        syncGMRosterUI();
      }
    } else if (charId === "local_hero") {
      if (char && char.trackerState && char.trackerState.conditions) {
        const b = char.trackerState.conditions.Bruised || 0;
        const inj = char.trackerState.conditions.Injured || 0;
        char.trackerState.conditions = { Bruised: b, Injured: inj };
        if (typeof updateTrackerConditionsSummary === 'function') updateTrackerConditionsSummary();
      }
      syncGMRosterUI();
    } else {
      const camp = CampaignManager.getActiveCampaign();
      const player = (camp?.acceptedPlayers || []).find(p => p.id === charId);
      if (player) {
        CampaignManager.updatePlayerConditions(charId, player.currentBruises, {}, player.heroPoints, player.currentInjured);
        if (typeof SessionNetwork !== 'undefined') {
          SessionNetwork.sendGMStatusOverride(charId, {
            characterName: player.characterName,
            bruises: player.currentBruises,
            injured: player.currentInjured,
            conditions: {},
            heroPoints: player.heroPoints
          });
        }
        syncGMRosterUI();
      }
    }
  };

  window.gmTogglePlayerSilent = function(charId, checked) {
    if (typeof CampaignManager === 'undefined') return;
    if (charId === "local_hero") {
      CampaignManager.setPlayerForcedMode("local_hero", "silent", checked);
      if (char && char.name) {
        CampaignManager.setPlayerForcedMode(char.name, "silent", checked);
      }
      if (typeof SessionNetwork !== 'undefined') {
        SessionNetwork.toggleSilentMode(checked);
        updateSilentModeUI();
      }
    } else {
      CampaignManager.setPlayerForcedMode(charId, "silent", checked);
      if (typeof SessionNetwork !== 'undefined') {
        SessionNetwork.sendGMForceMode("silent", charId, checked);
      }
    }
    syncGMRosterUI();
  };

  window.gmTogglePlayerSilentBtn = function(charId) {
    if (typeof CampaignManager === 'undefined') return;
    let isCurrentlySilent = false;
    if (charId === "local_hero") {
      isCurrentlySilent = (typeof SessionNetwork !== 'undefined' ? SessionNetwork.isSilent() : (CampaignManager.isCharacterSilent("local_hero") || CampaignManager.isCharacterSilent(char?.name)));
    } else {
      const camp = CampaignManager.getActiveCampaign();
      const player = (camp?.acceptedPlayers || []).find(p => p.id === charId);
      isCurrentlySilent = CampaignManager.isCharacterSilent(charId) || (player && CampaignManager.isCharacterSilent(player.characterName));
    }
    window.gmTogglePlayerSilent(charId, !isCurrentlySilent);
  };

  window.gmQuickRollNPC = function(npcId) {
    if (typeof CampaignManager === 'undefined') return;
    const camp = CampaignManager.getActiveCampaign();
    const npc = (camp?.npcs || []).find(n => n.id === npcId);
    if (!npc) return;

    const d20 = Math.floor(Math.random() * 20) + 1;
    const atkBonus = npc.characterData?.combat?.ATK || Math.floor(npc.powerLevel / 2);
    const total = d20 + atkBonus;
    const isNat20 = d20 === 20;
    const isNat1 = d20 === 1;
    const entry = {
      characterName: npc.name,
      isNPC: true,
      rollType: "Attack Check",
      total,
      breakdown: `1d20 (${d20}) + ${atkBonus} = ${total}`,
      isNat20,
      isNat1
    };

    if (typeof SessionNetwork !== 'undefined') {
      SessionNetwork.sendRoll(entry);
    } else {
      CampaignManager.addLogEntry(entry);
      sessionLocalLog.unshift(entry);
      renderSessionFeed();
    }
    if (typeof showToast === 'function') showToast(`Rolled attack for ${npc.name}: ${total}`, "info");
  };

  window.gmRemoveNPC = function(npcId) {
    if (typeof CampaignManager === 'undefined') return;
    if (window.activeEditorNpcId === npcId) {
      window.gmReturnToPrimarySheet();
    }
    CampaignManager.removeNPC(npcId);
    renderGMPartyNpcList();
    syncPartyRosterUI();
    syncGMRosterUI();
    if (typeof showToast === 'function') showToast("Removed NPC from campaign.", "info");
  };

  window.gmRemovePlayer = function(playerId) {
    if (typeof CampaignManager === 'undefined') return;
    CampaignManager.removePlayer(playerId);
    renderCampaignUsersList();
    syncPartyRosterUI();
    syncGMRosterUI();
    if (typeof showToast === 'function') showToast("Removed player from campaign.", "info");
  };

  // GM Campaign Controls
  if (selGMCamps) {
    selGMCamps.addEventListener("change", (e) => {
      if (typeof CampaignManager !== 'undefined') {
        CampaignManager.setActiveCampaign(e.target.value);
        syncGMUI();
      }
    });
  }

  if (btnGMNewCamp) {
    btnGMNewCamp.addEventListener("click", () => {
      if (typeof SessionNetwork !== 'undefined') {
        const netStatus = SessionNetwork.getStatus();
        if (netStatus.role === 'CLIENT' && netStatus.status !== 'disconnected') {
          alert("You cannot create a campaign while logged into or connected to an existing campaign session. Please disconnect from your current session first.");
          return;
        }
        if (netStatus.role === 'HOST' && SessionNetwork.getClientConnections().length > 0) {
          if (!confirm("You are currently hosting an active campaign with connected players. Creating a new campaign will switch your active campaign. Proceed?")) {
            return;
          }
        }
      }

      const name = prompt("Enter new campaign name:", "New Campaign");
      if (name && typeof CampaignManager !== 'undefined') {
        const gmDefaultName = (char && char.playerName) || localStorage.getItem("mm2e_player_name") || "GM";
        const c = CampaignManager.createCampaign(name, null, 'local_player', gmDefaultName);
        syncGMUI();
        if (typeof showToast === 'function') showToast(`Created campaign ${c.name}!`, "success");
      }
    });
  }

  if (btnGMCopyLink) {
    btnGMCopyLink.addEventListener("click", () => {
      const camp = typeof CampaignManager !== 'undefined' ? CampaignManager.getActiveCampaign() : null;
      if (!camp) return;

      const campCode = camp.code || "campaign-1";
      const isWeb = window.location.protocol === 'http:' || window.location.protocol === 'https:';

      if (isWeb) {
        const baseUrl = window.location.href.split('?')[0].split('#')[0];
        const fullUrl = `${baseUrl}?campaign=${encodeURIComponent(campCode)}`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(fullUrl).then(() => {
            if (typeof showToast === 'function') showToast(`Copied player invite link!`, "success");
          }).catch(() => prompt("Shareable Player Link:", fullUrl));
        } else {
          prompt("Shareable Player Link:", fullUrl);
        }
      } else {
        // Local file:// protocol
        if (navigator.clipboard) {
          navigator.clipboard.writeText(campCode).then(() => {
            if (typeof showToast === 'function') {
              showToast(`Copied Campaign Code: "${campCode}"! Share this with players to enter in their Session tab.`, "success");
            }
          }).catch(() => prompt("Campaign Code for Players to Join:", campCode));
        } else {
          prompt("Campaign Code for Players to Join:", campCode);
        }
      }
    });
  }

  // --- Campaign Authorized Users Management UI ---
  function closeCampaignUsersModal() {
    if (modalCampaignUsers) {
      modalCampaignUsers.classList.remove("active");
    }
    if (btnOpenUsers) {
      btnOpenUsers.classList.remove("btn-primary");
      btnOpenUsers.classList.add("btn-secondary");
    }
  }
  window.closeCampaignUsersModal = closeCampaignUsersModal;

  function openCampaignUsersModal() {
    if (!modalCampaignUsers || typeof CampaignManager === 'undefined') return;
    const camp = CampaignManager.getActiveCampaign();
    if (!camp) return;

    const lblCampName = document.getElementById("lblUsersModalCampName");
    const lblCampCode = document.getElementById("lblUsersModalCampCode");
    if (lblCampName) lblCampName.textContent = camp.name || "Campaign";
    if (lblCampCode) lblCampCode.textContent = camp.code || "code";
    if (txtGMName) txtGMName.value = CampaignManager.getGMUserName() || "";

    renderCampaignUsersList();
    modalCampaignUsers.classList.add("active");
    if (btnOpenUsers) {
      btnOpenUsers.classList.add("btn-primary");
      btnOpenUsers.classList.remove("btn-secondary");
    }
    if (txtNewUserName) {
      txtNewUserName.value = "";
      txtNewUserName.focus();
    }
  }
  window.openCampaignUsersModal = openCampaignUsersModal;

  if (modalCampaignUsers && btnOpenUsers) {
    const usersObserver = new MutationObserver(() => {
      const isActive = modalCampaignUsers.classList.contains("active");
      if (isActive) {
        btnOpenUsers.classList.add("btn-primary");
        btnOpenUsers.classList.remove("btn-secondary");
      } else {
        btnOpenUsers.classList.remove("btn-primary");
        btnOpenUsers.classList.add("btn-secondary");
      }
    });
    usersObserver.observe(modalCampaignUsers, { attributes: true, attributeFilter: ["class"] });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalCampaignUsers && modalCampaignUsers.classList.contains("active")) {
      closeCampaignUsersModal();
    }
  });

  function renderCampaignUsersList() {
    const modalBody = document.getElementById("campaignUsersModalBody");
    const inlineContainer = document.getElementById("campaignInlineUsersTableContainer");
    const lblSummary = document.getElementById("lblCampaignUsersSummary");
    const lblGMUserCount = document.getElementById("lblGMUserCount");
    const lblGMInlineUserCount = document.getElementById("lblGMInlineUserCount");
    if (typeof CampaignManager === 'undefined') return;

    const camp = CampaignManager.getActiveCampaign();
    if (!camp) return;

    const users = CampaignManager.getAuthorizedUsers();
    if (lblGMUserCount) lblGMUserCount.textContent = users.length;
    if (lblGMInlineUserCount) lblGMInlineUserCount.textContent = `${users.length} user${users.length === 1 ? '' : 's'}`;
    if (lblSummary) lblSummary.textContent = `${users.length} authorized user${users.length === 1 ? '' : 's'}`;

    const txtInlineGM = document.getElementById("txtInlineGMName");
    if (txtInlineGM && !txtInlineGM.value) {
      txtInlineGM.value = CampaignManager.getGMUserName() || "GM";
    }

    if (users.length === 0) {
      const emptyHtml = `
        <div style="text-align: center; color: var(--text-muted); font-size: var(--font-size-secondary, 14px); padding: 18px; font-style: italic;">
          No authorized user names added yet.<br>
          Enter player user names above to allow them to log into this campaign.
        </div>
      `;
      if (modalBody) modalBody.innerHTML = emptyHtml;
      if (inlineContainer) inlineContainer.innerHTML = emptyHtml;
      return;
    }

    const connectedClients = (typeof SessionNetwork !== 'undefined') ? SessionNetwork.getClientConnections() : [];

    const rowsHtml = users.map(u => {
      // Check if user is currently online/connected
      const matchingAccepted = (camp.acceptedPlayers || []).find(p => (p.playerName || '').toLowerCase() === (u.userName || '').toLowerCase());
      const isOnline = matchingAccepted && connectedClients.some(c => c.peerId === matchingAccepted.id);
      const isLocalUser = char && char.playerName && char.playerName.toLowerCase() === u.userName.toLowerCase();

      let statusBadge = `<span class="badge" style="background: rgba(148, 163, 184, 0.15); color: var(--text-muted); border: 1px solid var(--border-color); font-size: var(--font-size-fine-print, 12px);">⚪ Offline</span>`;
      if (isOnline || isLocalUser) {
        statusBadge = `<span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid #10b981; font-size: var(--font-size-fine-print, 12px);">🟢 Logged In</span>`;
      } else if (matchingAccepted) {
        statusBadge = `<span class="badge" style="background: rgba(2, 132, 199, 0.15); color: #0284c7; border: 1px solid #0284c7; font-size: var(--font-size-fine-print, 12px);">🟡 Known</span>`;
      }

      // Account Token status badge
      const tokens = Array.isArray(u.userTokens) ? u.userTokens : (u.userToken ? [u.userToken] : []);
      let tokenBadge = '';
      if (tokens.length > 1) {
        const preview = tokens.map(t => escapeHtml(t.substring(0, 8))).join(', ');
        tokenBadge = `<span class="token-badge token-bound" style="font-size: var(--font-size-fine-print, 12px);" title="Trusted Devices (${tokens.length}): ${escapeHtml(tokens.join(', '))}">🛡️ ${tokens.length} Devices Trusted (${preview})</span>`;
      } else if (tokens.length === 1) {
        const shortTok = escapeHtml(tokens[0].substring(0, 10)) + '...';
        tokenBadge = `<span class="token-badge token-bound" style="font-size: var(--font-size-fine-print, 12px);" title="Bound P2P Account Key: ${escapeHtml(tokens[0])}">🛡️ 1 Device (${shortTok})</span>`;
      } else {
        tokenBadge = `<span class="token-badge token-unclaimed" style="font-size: var(--font-size-fine-print, 12px);" title="Unclaimed: Player's first login will automatically bind their unique account token">⏳ Unclaimed Key</span>`;
      }

      const charName = u.lastCharacter || matchingAccepted?.characterName || '—';
      const safeUserName = u.userName.replace(/'/g, "\\'");

      return `
        <div class="campaign-user-row" style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-card); padding: 8px 12px; border-bottom: 1px solid var(--border-color); gap: 8px; font-size: var(--font-size-controls, 14px);">
          <div style="display: flex; align-items: center; gap: 8px; flex: 1; flex-wrap: wrap;">
            <strong style="color: var(--accent-primary); font-size: var(--font-size-controls, 14px); min-width: 90px;">
              👤 ${escapeHtml(u.userName)}
            </strong>
            ${tokenBadge}
            ${statusBadge}
            <span style="font-size: var(--font-size-secondary, 13px); color: var(--text-muted);">
              Character: <span style="color: var(--text-main); font-weight: 600;">${escapeHtml(charName)}</span>
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            ${tokens.length > 0 ? `
              <button type="button" class="btn btn-secondary" style="height: 26px; padding: 0 8px; font-size: var(--font-size-controls, 13px);" title="Reset all trusted device keys for this user" onclick="window.gmResetUserTokenClick('${safeUserName}')">🔄 Reset Keys</button>
            ` : ''}
            <button type="button" class="btn btn-secondary" style="height: 26px; padding: 0 8px; font-size: var(--font-size-controls, 13px); color: #ef4444;" title="Remove this authorized user" onclick="window.gmRemoveAuthorizedUserClick('${safeUserName}')">✕</button>
          </div>
        </div>
      `;
    }).join('');

    if (modalBody) modalBody.innerHTML = rowsHtml;
    if (inlineContainer) inlineContainer.innerHTML = rowsHtml;
  }
  window.renderCampaignUsersList = renderCampaignUsersList;

  window.gmResetUserTokenClick = function(userName) {
    if (typeof CampaignManager === 'undefined') return;
    if (confirm(`Reset all trusted P2P Account Keys for "${userName}"?\n\nThis will clear all registered devices (PC, phone, etc.) and allow the player to bind a new device on their next login.`)) {
      CampaignManager.resetAuthorizedUserToken(userName);
      renderCampaignUsersList();
      syncGMUI();
      if (typeof showToast === 'function') showToast(`Reset device keys for "${userName}".`, "info");
    }
  };

  window.gmRemoveAuthorizedUserClick = function(userName) {
    if (typeof CampaignManager === 'undefined') return;
    if (confirm(`Remove "${userName}" from the authorized users list?`)) {
      CampaignManager.removeAuthorizedUser(userName);
      renderCampaignUsersList();
      syncGMUI();
      if (typeof showToast === 'function') showToast(`Removed user "${userName}".`, "info");
    }
  };

  function initUserIdentityAndAccount() {
    if (typeof CampaignManager === 'undefined') return;
    const acc = CampaignManager.getUserAccount();

    const txtLocalUser = document.getElementById("txtLocalAccountUserName");
    const lblLocalToken = document.getElementById("lblLocalAccountToken");
    const btnSaveLocalUser = document.getElementById("btnSaveLocalAccountUserName");
    const btnCopyLocalToken = document.getElementById("btnCopyLocalAccountToken");
    const btnImportLocalToken = document.getElementById("btnImportLocalAccountToken");
    const btnSessionProfile = document.getElementById("btnSessionOpenProfile");

    if (txtLocalUser) {
      txtLocalUser.value = acc.userName || (char && char.playerName) || "";
    }
    if (lblLocalToken) {
      lblLocalToken.textContent = acc.userToken || "usr_none";
      lblLocalToken.title = `Full Account Key: ${acc.userToken}`;
    }

    if (btnSaveLocalUser && txtLocalUser) {
      btnSaveLocalUser.onclick = () => {
        const val = txtLocalUser.value.trim();
        if (!val) {
          if (typeof showToast === 'function') showToast("Please enter a user name.", "warning");
          txtLocalUser.focus();
          return;
        }
        const updated = CampaignManager.setUserAccount(val);
        if (typeof char !== 'undefined' && char) {
          char.playerName = val;
        }
        const isLocalGM = (typeof CampaignManager !== 'undefined') ? CampaignManager.isDesignatedGM('local_player') : false;
        if (isLocalGM || (typeof CampaignManager !== 'undefined' && CampaignManager.getGMUserName() === 'GM')) {
          CampaignManager.setGMUserName(val);
        }
        if (txtPlayerName) txtPlayerName.value = val;
        const mainPlayerInput = document.getElementById("playerNameInput");
        if (mainPlayerInput) mainPlayerInput.value = val;
        syncPartyRosterUI();
        updateSessionRowUI();
        syncGMUI();
        renderCampaignUsersList();
        if (typeof showToast === 'function') showToast(`User name set to "${val}"!`, "success");
      };
    }

    if (btnCopyLocalToken && lblLocalToken) {
      btnCopyLocalToken.onclick = () => {
        const token = acc.userToken || "";
        if (!token) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(token).then(() => {
            if (typeof showToast === 'function') showToast("Account Key copied to clipboard!", "success");
          }).catch(() => {
            prompt("Your P2P Account Key (copy below):", token);
          });
        } else {
          prompt("Your P2P Account Key (copy below):", token);
        }
      };
    }

    if (btnImportLocalToken) {
      btnImportLocalToken.onclick = () => {
        const input = prompt("Enter your P2P Account Key (e.g. from another device) or leave blank to generate a new key:", acc.userToken || "");
        if (input === null) return;
        const trimmed = input.trim();
        const updated = CampaignManager.setUserAccount(acc.userName, trimmed || null);
        if (updated) {
          acc.userToken = updated.userToken;
          if (lblLocalToken) {
            lblLocalToken.textContent = updated.userToken;
            lblLocalToken.title = `Full Account Key: ${updated.userToken}`;
          }
          if (typeof showToast === 'function') showToast("Updated P2P Account Key!", "success");
        }
      };
    }

    if (btnSessionProfile) {
      btnSessionProfile.onclick = () => {
        openGMTab();
        setTimeout(() => {
          if (txtLocalUser) txtLocalUser.focus();
        }, 150);
      };
    }

    // Inline GM Whitelist Controls
    const txtInlineNew = document.getElementById("txtInlineNewUserName");
    const btnInlineNew = document.getElementById("btnInlineAddNewUser");
    const txtInlineGM = document.getElementById("txtInlineGMName");
    const btnSaveInlineGM = document.getElementById("btnSaveInlineGMName");

    if (btnInlineNew && txtInlineNew) {
      const handleInlineAdd = () => {
        const val = txtInlineNew.value.trim();
        if (!val) {
          if (typeof showToast === 'function') showToast("Please enter a user name to authorize.", "warning");
          txtInlineNew.focus();
          return;
        }
        const res = CampaignManager.addAuthorizedUser(val);
        if (res.success) {
          txtInlineNew.value = "";
          renderCampaignUsersList();
          syncGMUI();
          if (typeof showToast === 'function') showToast(`Authorized user "${val}" for this campaign!`, "success");
          txtInlineNew.focus();
        } else {
          if (typeof showToast === 'function') showToast(res.error || "Could not add user.", "error");
          else alert(res.error);
        }
      };
      btnInlineNew.onclick = handleInlineAdd;
      txtInlineNew.onkeydown = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleInlineAdd();
        }
      };
    }

    if (btnSaveInlineGM && txtInlineGM) {
      btnSaveInlineGM.onclick = () => {
        const gmName = txtInlineGM.value.trim() || "GM";
        CampaignManager.setGMUserName(gmName);
        CampaignManager.setUserAccount(gmName);
        if (typeof char !== 'undefined' && char && (!char.playerName || char.playerName === 'GM')) {
          char.playerName = gmName;
        }
        if (typeof showToast === 'function') showToast(`GM user name set to "${gmName}".`, "success");
        syncGMUI();
        syncPartyRosterUI();
        updateSessionRowUI();
        renderCampaignUsersList();
        if (typeof SessionNetwork !== 'undefined' && SessionNetwork.isConnected()) {
          SessionNetwork.sendLocalBroadcast({ action: 'rosterUpdate' });
        }
      };
    }
  }

  if (btnGMManageUsers) {
    btnGMManageUsers.addEventListener("click", () => {
      openCampaignUsersModal();
    });
  }

  if (btnAddNewUser) {
    const handleAdd = () => {
      if (!txtNewUserName || typeof CampaignManager === 'undefined') return;
      const val = txtNewUserName.value.trim();
      if (!val) {
        if (typeof showToast === 'function') showToast("Please enter a user name to authorize.", "warning");
        txtNewUserName.focus();
        return;
      }
      const res = CampaignManager.addAuthorizedUser(val);
      if (res.success) {
        txtNewUserName.value = "";
        renderCampaignUsersList();
        syncGMUI();
        if (typeof showToast === 'function') showToast(`Authorized user "${val}" for this campaign!`, "success");
        txtNewUserName.focus();
      } else {
        if (typeof showToast === 'function') showToast(res.error || "Could not add user.", "error");
        else alert(res.error);
      }
    };
    btnAddNewUser.addEventListener("click", handleAdd);
    if (txtNewUserName) {
      txtNewUserName.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleAdd();
        }
      });
    }
  }

  if (btnSaveGMName && txtGMName) {
    btnSaveGMName.addEventListener("click", () => {
      if (typeof CampaignManager === 'undefined') return;
      const gmName = txtGMName.value.trim() || "GM";
      CampaignManager.setGMUserName(gmName);
      CampaignManager.setUserAccount(gmName);
      if (typeof char !== 'undefined' && char && (!char.playerName || char.playerName === 'GM')) {
        char.playerName = gmName;
      }
      if (typeof showToast === 'function') showToast(`GM user name set to "${gmName}".`, "success");
      syncGMUI();
      syncPartyRosterUI();
      updateSessionRowUI();
      renderCampaignUsersList();
      if (typeof SessionNetwork !== 'undefined' && SessionNetwork.isConnected()) {
        SessionNetwork.sendLocalBroadcast({ action: 'rosterUpdate' });
      }
    });
  }

  if (btnGMExport) {
    btnGMExport.addEventListener("click", () => {
      if (typeof CampaignManager === 'undefined') return;
      const camp = CampaignManager.getActiveCampaign();
      if (!camp) return;

      // 1. Check offline players and log explicit notices
      if (typeof SessionNetwork !== 'undefined') {
        const connectedClients = SessionNetwork.getClientConnections();
        (camp.acceptedPlayers || []).forEach(p => {
          const isOnline = connectedClients.some(c => c.peerId === p.id);
          if (!isOnline) {
            const lastVer = (p.sheetHistory && p.sheetHistory.length > 0)
              ? `v${p.sheetHistory[p.sheetHistory.length - 1].version}`
              : 'no cached';
            CampaignManager.addFileOperationLog(`Backup notice: Player "${p.playerName}" (${p.characterName}) is offline; backup contains ${lastVer} sheet history.`, 'offline_notice');
          }
        });

        // 2. Command connected remote clients to send their character sheets
        SessionNetwork.requestCharacterSheets();
      }

      if (typeof showToast === 'function') showToast("Requesting latest sheets & compiling backup...", "info");

      // Give a brief window (400ms) for local/fast peer sheet replies before packaging file
      setTimeout(() => {
        const json = CampaignManager.exportCampaign();
        if (!json) return;
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${camp.code || "campaign"}_backup.json`;
        a.click();
        URL.revokeObjectURL(url);
        if (typeof showToast === 'function') showToast("Campaign backup downloaded!", "success");
        syncGMUI();
      }, 400);
    });
  }

  if (btnGMImport && fileGMImport) {
    btnGMImport.addEventListener("click", () => fileGMImport.click());
    fileGMImport.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        const res = CampaignManager.importCampaign(evt.target.result);
        if (res.success) {
          syncGMUI();
          if (typeof showToast === 'function') showToast(`Imported campaign ${res.campaign.name}!`, "success");
        } else {
          alert(`Error importing campaign: ${res.error}`);
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    });
  }

  if (btnGMDelete) {
    btnGMDelete.addEventListener("click", () => {
      if (typeof CampaignManager === 'undefined') return;
      const camp = CampaignManager.getActiveCampaign();
      if (!camp) return;
      if (confirm(`Are you sure you want to delete campaign "${camp.name}"?`)) {
        CampaignManager.deleteCampaign(camp.id);
        syncGMUI();
        if (typeof showToast === 'function') showToast("Campaign deleted.", "info");
      }
    });
  }


  if (btnGMAttachNPC) {
    btnGMAttachNPC.addEventListener("click", () => {
      if (!char || !char.name) {
        alert("Please name the current character first before attaching as NPC.");
        return;
      }
      if (typeof CampaignManager === 'undefined') return;
      CampaignManager.attachNPC(char.serialize().character, char.name, char.powerLevel);
      renderGMPartyNpcList();
      syncPartyRosterUI();
      syncGMRosterUI();
      if (typeof showToast === 'function') showToast(`Attached ${char.name} as NPC to campaign!`, "success");
    });
  }

  // --- GM Character Operations & Menu Logic ---
  window.gmToggleCharMenu = function(event, charId) {
    if (event) event.stopPropagation();
    const menuId = `gmCharMenu_${charId}`;
    const allMenus = document.querySelectorAll(".gm-char-dropdown-menu");
    allMenus.forEach(m => {
      if (m.id !== menuId) m.style.display = "none";
    });

    const targetMenu = document.getElementById(menuId);
    if (targetMenu) {
      const willOpen = targetMenu.style.display === "none" || !targetMenu.style.display;
      if (willOpen) {
        targetMenu.style.display = "flex";
        const btn = (event && (event.currentTarget || (event.target && event.target.closest && event.target.closest(".gm-char-name-btn")))) || targetMenu.previousElementSibling;
        const btnRect = btn ? btn.getBoundingClientRect() : null;
        const menuRect = targetMenu.getBoundingClientRect();
        const menuHeight = menuRect.height || 220;
        const menuWidth = menuRect.width || 220;

        if (btnRect) {
          let left = btnRect.left;
          if (left + menuWidth > window.innerWidth - 12) {
            left = Math.max(10, window.innerWidth - menuWidth - 12);
          }
          targetMenu.style.left = `${left}px`;

          const spaceBelow = window.innerHeight - btnRect.bottom;
          const openUpward = spaceBelow < (menuHeight + 16) || btnRect.bottom > (window.innerHeight - 150);

          if (openUpward) {
            targetMenu.style.top = "auto";
            targetMenu.style.bottom = `${Math.max(10, window.innerHeight - btnRect.top + 4)}px`;
          } else {
            targetMenu.style.bottom = "auto";
            targetMenu.style.top = `${btnRect.bottom + 4}px`;
          }
        }
      } else {
        targetMenu.style.display = "none";
      }
    }
  };

  // Close menus when clicking outside or scrolling
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".gm-char-menu-wrapper") && !e.target.closest(".gm-char-dropdown-menu")) {
      document.querySelectorAll(".gm-char-dropdown-menu").forEach(m => m.style.display = "none");
    }
  });
  window.addEventListener("scroll", () => {
    document.querySelectorAll(".gm-char-dropdown-menu").forEach(m => m.style.display = "none");
  }, true);

  window.gmCloseAllCharMenus = function() {
    document.querySelectorAll(".gm-char-dropdown-menu").forEach(m => m.style.display = "none");
  };

  window.gmCloseLocalHero = function() {
    window.gmCloseAllCharMenus();
    const heroName = (char && char.name) ? char.name : "current character";
    if (confirm(`Close "${heroName}" and clear from editor?`)) {
      window.isCharacterLoading = true;
      if (window.primaryHero) {
        char = window.primaryHero;
        window.char = char;
        window.primaryHero = null;
        window.activeCompanionId = null;
      }
      char.reset();
      const btnAudit = document.getElementById("btnOpenImportAudit");
      if (btnAudit) btnAudit.style.display = "none";
      if (typeof FileManager !== 'undefined') {
        FileManager.currentFileHandle = null;
        FileManager.currentFileName = null;
        if (FileManager.clearDirty) FileManager.clearDirty();
      }
      populateUIFromCharacter();
      window.isCharacterLoading = false;
      if (typeof updateCharacterSelectorUI === 'function') updateCharacterSelectorUI();
      syncGMRosterUI();
      if (typeof showToast === 'function') showToast(`Closed "${heroName}" from editor.`, "info");
    }
  };

  function downloadCharJson(jsonString, filename) {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  window.gmExportCharSheet = function(charId) {
    if (charId === "local_hero") {
      if (typeof FileManager !== 'undefined' && FileManager.saveHeroAs) {
        FileManager.saveHeroAs();
      }
      return;
    }

    if (typeof CampaignManager === 'undefined') return;
    const camp = CampaignManager.getActiveCampaign();
    if (!camp) return;

    // NPC check
    const npc = (camp.npcs || []).find(n => n.id === charId);
    if (npc) {
      const payload = JSON.stringify({
        format: 'MM2E_CHARACTER',
        version: '1.0',
        character: npc.characterData || {}
      }, null, 2);
      downloadCharJson(payload, `${npc.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mm2e`);
      if (typeof showToast === 'function') showToast(`Exported ${npc.name} sheet!`, "success");
      return;
    }

    // Player check
    const player = (camp.acceptedPlayers || []).find(p => p.id === charId);
    if (player) {
      let sheetToExport = player.characterSheet;
      if (!sheetToExport && player.sheetHistory && player.sheetHistory.length > 0) {
        sheetToExport = player.sheetHistory[player.sheetHistory.length - 1].sheet;
      }
      if (!sheetToExport) {
        alert(`No character sheet archived yet for ${player.characterName}. Click "Request Fresh Sheet" first.`);
        return;
      }
      const payload = JSON.stringify(sheetToExport, null, 2);
      downloadCharJson(payload, `${player.characterName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mm2e`);
      if (typeof showToast === 'function') showToast(`Exported ${player.characterName} sheet!`, "success");
    }
  };

  window.activeEditorNpcId = null;
  window.__gmPrimaryHeroSheet = null;
  window.__gmPrimaryHeroName = null;

  window.gmLoadNpcToEditor = function(npcId) {
    if (typeof CampaignManager === 'undefined') return;
    const camp = CampaignManager.getActiveCampaign();
    const npc = (camp?.npcs || []).find(n => n.id === npcId) || (camp?.encounterEnemies || []).find(e => e.id === npcId);
    if (!npc) {
      if (typeof showToast === 'function') showToast("NPC not found in campaign.", "error");
      return;
    }

    // 1. If currently editing GM primary hero (not an NPC), stash it safely
    if (!window.activeEditorNpcId) {
      if (typeof char !== 'undefined' && char) {
        window.__gmPrimaryHeroSheet = char.serialize();
        window.__gmPrimaryHeroName = char.name || 'GM Hero';
      }
    } else {
      // Switching from one NPC to another NPC: auto-save current NPC edits back to campaign!
      if (typeof char !== 'undefined' && char && typeof CampaignManager.updateNPCCharacterData === 'function') {
        CampaignManager.updateNPCCharacterData(window.activeEditorNpcId, char.serialize().character);
      }
    }

    // 2. Set active NPC ID
    window.activeEditorNpcId = npcId;

    // 3. Load NPC character data into editor
    const sheetToLoad = (npc.characterData && Object.keys(npc.characterData).length > 0)
      ? npc.characterData
      : { name: npc.name, powerLevel: npc.powerLevel || 10 };

    applyLoadedCharacter(sheetToLoad, { isNpcLoad: true, preserveTab: true });

    // 4. Update UI indicators
    if (typeof window.updateGMEditorStateUI === 'function') {
      window.updateGMEditorStateUI();
    }
    if (typeof syncPartyRosterUI === 'function') syncPartyRosterUI();
    if (typeof renderGMPartyNpcList === 'function') renderGMPartyNpcList();

    if (typeof showToast === 'function') {
      showToast(`Loaded NPC "${npc.name}" into editor. Use character menu or header badge to return to your GM sheet.`, "success");
    }
  };

  window.gmReturnToPrimarySheet = function() {
    if (!window.activeEditorNpcId && !window.__gmPrimaryHeroSheet) {
      if (typeof showToast === 'function') showToast("Already on primary character sheet.", "info");
      return;
    }

    // 1. Save current NPC edits back to campaign
    if (window.activeEditorNpcId && typeof char !== 'undefined' && char && typeof CampaignManager !== 'undefined' && typeof CampaignManager.updateNPCCharacterData === 'function') {
      CampaignManager.updateNPCCharacterData(window.activeEditorNpcId, char.serialize().character);
    }

    // 2. Restore GM primary sheet
    if (window.__gmPrimaryHeroSheet) {
      applyLoadedCharacter(window.__gmPrimaryHeroSheet);
    }

    const prevNpcId = window.activeEditorNpcId;
    window.activeEditorNpcId = null;

    // 3. Update UI
    if (typeof window.updateGMEditorStateUI === 'function') {
      window.updateGMEditorStateUI();
    }
    if (typeof syncPartyRosterUI === 'function') syncPartyRosterUI();
    if (typeof renderGMPartyNpcList === 'function') renderGMPartyNpcList();

    if (typeof showToast === 'function') {
      showToast(`Returned to GM Character Sheet (${char.name || 'Hero'})!`, "success");
    }
  };

  window.updateGMEditorStateUI = function() {
    const btnReturn = document.getElementById("btnReturnToGMChar");
    const heroNPCTag = document.getElementById("lblHeroNPCTag");

    if (window.activeEditorNpcId) {
      if (btnReturn) btnReturn.style.display = "inline-flex";
      if (heroNPCTag) heroNPCTag.style.display = "inline-flex";
    } else {
      if (btnReturn) btnReturn.style.display = "none";
      if (heroNPCTag) heroNPCTag.style.display = "none";
    }

    if (typeof updateCharacterSelectorUI === 'function') {
      updateCharacterSelectorUI();
    }
  };

  window.duplicateNPC = function(npcId) {
    if (typeof CampaignManager === 'undefined') return;
    const newNpc = CampaignManager.duplicateNPC(npcId);
    if (newNpc) {
      if (typeof renderGMPartyNpcList === 'function') renderGMPartyNpcList();
      if (typeof renderGMEncounterEnemyList === 'function') renderGMEncounterEnemyList();
      if (typeof syncPartyRosterUI === 'function') syncPartyRosterUI();
      if (typeof syncGMRosterUI === 'function') syncGMRosterUI();
      if (typeof showToast === 'function') showToast(`Duplicated NPC as "${newNpc.name}"!`, "success");
    }
  };

  window.gmRequestSheet = function(playerId) {
    if (typeof SessionNetwork === 'undefined') return;
    SessionNetwork.requestCharacterSheets(playerId);
    if (typeof showToast === 'function') showToast("Requested character sheet from player...", "info");
  };

  window.gmPullSheet = function(playerId) {
    if (typeof CampaignManager === 'undefined') return;
    const camp = CampaignManager.getActiveCampaign();
    const player = (camp?.acceptedPlayers || []).find(p => p.id === playerId);
    if (!player) return;

    if (typeof SessionNetwork !== 'undefined' && SessionNetwork.requestCharacterSheets) {
      SessionNetwork.requestCharacterSheets(playerId);
    }

    if (player.characterSheet) {
      if (confirm(`Pull and load sheet for "${player.characterName}" (${player.playerName}) into your character editor?`)) {
        applyLoadedCharacter(player.characterSheet);
        if (typeof showToast === 'function') showToast(`Loaded sheet for "${player.characterName}" into editor!`, "success");
      }
    } else {
      if (typeof showToast === 'function') showToast(`Requested fresh character sheet from ${player.playerName}...`, "info");
    }
  };

  window.gmPushCurrentSheet = function(playerId) {
    if (typeof CampaignManager === 'undefined') return;
    const camp = CampaignManager.getActiveCampaign();
    const player = (camp?.acceptedPlayers || []).find(p => p.id === playerId);
    if (!player) return;

    if (typeof char === 'undefined' || !char) {
      alert("No character is currently loaded in the editor to push.");
      return;
    }

    const hero = window.primaryHero || char;
    const heroName = hero.name || player.characterName || "Hero";
    const warnMsg = `Push the current character in your editor ("${heroName}") to player ${player.playerName} (${player.characterName})?\n\nThe player will receive a prompt to review and activate your changes.`;
    if (!confirm(warnMsg)) return;

    const serialized = hero.serialize();
    const versionTimestamp = new Date().toISOString();
    const version = (player.sheetHistory ? player.sheetHistory.length + 1 : 1);

    // Save in GM's local campaign history for this player
    CampaignManager.ingestCharacterSheet(playerId, serialized, player.playerName, heroName);

    // Send push packet across network
    if (typeof SessionNetwork !== 'undefined' && SessionNetwork.sendPushCharacter) {
      const sent = SessionNetwork.sendPushCharacter(playerId, serialized, heroName, versionTimestamp, version);
      if (sent) {
        if (typeof showToast === 'function') showToast(`Pushed updated sheet for "${heroName}" to ${player.playerName}!`, "success");
      } else {
        if (typeof showToast === 'function') showToast(`Unable to send sheet to ${player.playerName} (not connected).`, "warning");
      }
    }
  };


  window.gmTransferGMClick = function(targetPlayerId, playerName, characterName) {
    if (typeof CampaignManager === 'undefined') return;
    const camp = CampaignManager.getActiveCampaign();
    if (!camp) return;

    const warnMsg = `⚠️ TRANSFER GM STATUS (ONE-WAY OPERATION)\n\n` +
      `Are you sure you want to transfer GM authority of campaign "${camp.name}" to:\n` +
      `Player: ${playerName} (${characterName})?\n\n` +
      `This is a permanent, ONE-WAY operation. You will surrender host controls and become a regular player in this campaign.`;

    if (confirm(warnMsg)) {
      const ok = CampaignManager.transferGM(targetPlayerId);
      if (ok) {
        if (typeof SessionNetwork !== 'undefined') {
          SessionNetwork.sendGMTransfer(targetPlayerId);
        }
        syncGMUI();
        if (typeof showToast === 'function') {
          showToast(`GM status transferred to ${playerName}!`, "warning");
        }
      }
    }
  };

  window.gmOpenCharHistory = function(charId) {
    const modal = document.getElementById("charHistoryModal");
    const modalTitle = document.getElementById("charHistoryModalTitle");
    const summaryBox = document.getElementById("charHistoryHeroSummary");
    const bodyBox = document.getElementById("charHistoryModalBody");
    const btnReq = document.getElementById("btnRequestSheetFromPlayer");
    if (!modal || !bodyBox) return;

    if (charId === "local_hero") {
      if (modalTitle) modalTitle.textContent = `📜 Version History: ${char?.name || 'Local Hero'}`;
      if (summaryBox) {
        summaryBox.innerHTML = `<strong>${char?.name || 'Hero'}</strong> — <em>Active Local Sheet (Current)</em>`;
      }
      if (btnReq) btnReq.style.display = "none";
      bodyBox.innerHTML = `
        <div class="gm-history-card">
          <div>
            <strong>Current Live Sheet</strong><br>
            <span style="font-size: 11px; color: var(--text-muted);">PL ${char?.powerLevel || 10} • Active in Editor</span>
          </div>
          <button type="button" class="btn btn-secondary" onclick="window.gmExportCharSheet('local_hero')">💾 Export .mm2e</button>
        </div>
      `;
      modal.classList.add("active");
      return;
    }

    if (typeof CampaignManager === 'undefined') return;
    const camp = CampaignManager.getActiveCampaign();
    const player = (camp?.acceptedPlayers || []).find(p => p.id === charId);
    if (!player) return;

    const isConnected = (typeof SessionNetwork !== 'undefined') ? SessionNetwork.isPeerConnected(player.id) : false;

    if (modalTitle) modalTitle.textContent = `📜 Version History: ${player.characterName}`;
    if (summaryBox) {
      summaryBox.innerHTML = `
        <strong>${player.characterName}</strong> (Player: ${player.playerName}) &nbsp;
        <span class="badge" style="background: ${isConnected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(107, 114, 128, 0.2)'}; color: ${isConnected ? '#10b981' : 'var(--text-muted)'}; font-weight: bold;">
          ${isConnected ? '● Connected / Online' : '○ Offline'}
        </span>
      `;
    }

    if (btnReq) {
      btnReq.style.display = isConnected ? "inline-block" : "none";
      btnReq.onclick = () => window.gmRequestSheet(player.id);
    }

    const history = player.sheetHistory || [];

    if (history.length === 0) {
      bodyBox.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 32px 16px;">
          <em>No character sheet revisions archived yet for ${player.characterName}.</em><br>
          <span style="font-size: 12px;">Sheets are automatically archived when backups are made or when requested.</span>
        </div>
      `;
    } else {
      bodyBox.innerHTML = [...history].reverse().map(rev => {
        const dateStr = new Date(rev.timestamp).toLocaleString();
        return `
          <div class="gm-history-card">
            <div>
              <strong style="font-size: var(--font-size-labels); color: var(--accent-primary);">Revision v${rev.version}</strong>
              <span style="margin-left: 8px; font-size: 11px; color: var(--text-muted);">${dateStr}</span>
              <div style="font-size: 12px; margin-top: 2px;">
                PL ${rev.powerLevel || 10} • Character: ${rev.characterName || player.characterName}
              </div>
            </div>
            <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
              <button type="button" class="btn btn-primary" style="font-size: 12px; padding: 4px 10px;" ${isConnected ? '' : 'disabled title="Player is currently offline"'} onclick="window.gmPushRevision('${player.id}', ${rev.version})">
                🚀 Push to Client
              </button>
              <button type="button" class="btn btn-secondary" style="font-size: 12px; padding: 4px 10px;" onclick="window.gmDownloadRevision('${player.id}', ${rev.version})">
                💾 Export .mm2e
              </button>
              <button type="button" class="btn btn-secondary" style="font-size: 12px; padding: 4px 10px;" onclick="window.gmLoadRevisionToEditor('${player.id}', ${rev.version})">
                👁️ Load to Editor
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    modal.classList.add("active");
  };

  window.gmPushRevision = function(playerId, version) {
    if (typeof CampaignManager === 'undefined' || typeof SessionNetwork === 'undefined') return;
    const camp = CampaignManager.getActiveCampaign();
    const player = (camp?.acceptedPlayers || []).find(p => p.id === playerId);
    if (!player) return;

    const rev = (player.sheetHistory || []).find(r => r.version === version);
    if (!rev || !rev.sheet) {
      alert("Revision data not found.");
      return;
    }

    if (confirm(`Push Revision v${rev.version} of "${player.characterName}" to player "${player.playerName}"? This will overwrite the player's current active character sheet.`)) {
      SessionNetwork.sendPushCharacter(player.id, rev.sheet, player.characterName, rev.timestamp, rev.version);
      CampaignManager.addFileOperationLog(`GM pushed character sheet revision v${rev.version} for "${player.characterName}" to player "${player.playerName}".`, 'sheet_push');
      if (typeof showToast === 'function') showToast(`Pushed Revision v${rev.version} to ${player.playerName}!`, "success");
    }
  };

  window.gmDownloadRevision = function(playerId, version) {
    if (typeof CampaignManager === 'undefined') return;
    const camp = CampaignManager.getActiveCampaign();
    const player = (camp?.acceptedPlayers || []).find(p => p.id === playerId);
    if (!player) return;
    const rev = (player.sheetHistory || []).find(r => r.version === version);
    if (!rev || !rev.sheet) return;

    const payload = JSON.stringify(rev.sheet, null, 2);
    downloadCharJson(payload, `${player.characterName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_v${version}.mm2e`);
  };

  window.gmLoadRevisionToEditor = function(playerId, version) {
    if (typeof CampaignManager === 'undefined') return;
    const camp = CampaignManager.getActiveCampaign();
    const player = (camp?.acceptedPlayers || []).find(p => p.id === playerId);
    if (!player) return;
    const rev = (player.sheetHistory || []).find(r => r.version === version);
    if (!rev || !rev.sheet) return;

    if (confirm(`Load Revision v${rev.version} of "${player.characterName}" into your character editor? (This will replace your current sheet)`)) {
      applyLoadedCharacter(rev.sheet);
      if (typeof showToast === 'function') showToast(`Loaded Revision v${version} into editor!`, "success");
    }
  };

  // --- Campaign File Operations Log UI Viewer ---
  const btnGMFileLog = document.getElementById("btnGMFileLog");
  const modalGMFileLog = document.getElementById("campaignFileLogModal");
  const bodyGMFileLog = document.getElementById("campaignFileLogBody");
  const txtGMFileLogSearch = document.getElementById("txtCampaignFileLogSearch");
  const btnExportFileLog = document.getElementById("btnExportCampaignFileLog");
  const btnClearFileLog = document.getElementById("btnClearCampaignFileLog");

  function renderCampaignFileLog() {
    if (!bodyGMFileLog || typeof CampaignManager === 'undefined') return;
    const logs = CampaignManager.getFileOperationsLog();
    const q = (txtGMFileLogSearch ? txtGMFileLogSearch.value.trim().toLowerCase() : "");

    const filtered = q ? logs.filter(l => l.message.toLowerCase().includes(q) || l.type.toLowerCase().includes(q) || l.timestamp.includes(q)) : logs;

    if (filtered.length === 0) {
      bodyGMFileLog.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 32px 16px;">
          <em>${q ? 'No file operations match your search.' : 'No file operations recorded yet.'}</em>
        </div>
      `;
      return;
    }

    bodyGMFileLog.innerHTML = [...filtered].reverse().map(l => {
      const timeStr = new Date(l.timestamp).toLocaleString();
      return `
        <div class="gm-log-entry">
          <span class="gm-log-badge ${l.type}">${l.type.replace('_', ' ')}</span>
          <div style="flex: 1;">
            <div>${l.message}</div>
            <div style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">${timeStr}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  if (btnGMFileLog && modalGMFileLog) {
    btnGMFileLog.addEventListener("click", () => {
      renderCampaignFileLog();
      modalGMFileLog.classList.add("active");
    });
  }

  if (txtGMFileLogSearch) {
    txtGMFileLogSearch.addEventListener("input", renderCampaignFileLog);
  }

  if (btnExportFileLog) {
    btnExportFileLog.addEventListener("click", () => {
      if (typeof CampaignManager === 'undefined') return;
      const logs = CampaignManager.getFileOperationsLog();
      const camp = CampaignManager.getActiveCampaign();
      const txt = logs.map(l => `[${l.timestamp}] [${l.type.toUpperCase()}] ${l.message}`).join('\n');
      const blob = new Blob([txt], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${camp?.code || "campaign"}_file_operations.txt`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  if (btnClearFileLog) {
    btnClearFileLog.addEventListener("click", () => {
      if (typeof CampaignManager === 'undefined') return;
      if (confirm("Are you sure you want to clear the Campaign File Operations Log?")) {
        CampaignManager.clearFileOperationsLog();
        renderCampaignFileLog();
        if (typeof showToast === 'function') showToast("File Operations Log cleared.", "info");
      }
    });
  }

  // --- Unsaved Campaign Recovery Check on Startup ---
  if (typeof CampaignManager !== 'undefined' && CampaignManager.isAutoBackupDirty()) {
    const meta = CampaignManager.getAutoBackupMeta();
    const modalRestore = document.getElementById("unsavedSessionRestoreModal");
    const metaBox = document.getElementById("boxUnsavedRestoreMeta");
    const btnRestore = document.getElementById("btnConfirmUnsavedRestore");
    const btnDiscard = document.getElementById("btnDismissUnsavedRestore");
    const btnCloseRestore = document.getElementById("btnCloseUnsavedRestoreModal");

    if (modalRestore && metaBox && meta) {
      metaBox.innerHTML = `
        <strong>Campaign:</strong> ${meta.campaignName || 'Campaign'} (Code: <code>${meta.code || 'code'}</code>)<br>
        <strong>Last Auto-Saved:</strong> ${new Date(meta.savedAt).toLocaleString()}
      `;
      modalRestore.classList.add("active");

      if (btnRestore) {
        btnRestore.onclick = () => {
          CampaignManager.restoreAutoBackup();
          modalRestore.classList.remove("active");
          syncGMUI();
          if (typeof showToast === 'function') showToast("Restored unsaved campaign session!", "success");
        };
      }

      if (btnDiscard) {
        btnDiscard.onclick = () => {
          CampaignManager.clearAutoBackupDirty();
          modalRestore.classList.remove("active");
          if (typeof showToast === 'function') showToast("Autosave dismissed.", "info");
        };
      }

      if (btnCloseRestore) {
        btnCloseRestore.onclick = () => {
          modalRestore.classList.remove("active");
        };
      }
    }
  }

  initUserIdentityAndAccount();

  // Auto-connect / invite check from URL query parameter (Automatic login without dialog)
  if (typeof window !== 'undefined' && window.location) {
    const urlParams = new URLSearchParams(window.location.search);
    const qCamp = urlParams.get("campaign") || urlParams.get("camp") || urlParams.get("room");
    if (qCamp) {
      let pName = localStorage.getItem("mm2e_player_name") || char?.playerName || "";
      if (!pName && typeof CampaignManager !== 'undefined') {
        const acc = CampaignManager.getUserAccount();
        if (acc && acc.userName) pName = acc.userName;
      }
      if (!pName) {
        pName = "Player-" + Math.floor(1000 + Math.random() * 9000);
        localStorage.setItem("mm2e_player_name", pName);
      }
      if (txtPlayerName) txtPlayerName.value = pName;
      if (txtCampCode) txtCampCode.value = qCamp;
      if (typeof char !== 'undefined' && char && !char.playerName) char.playerName = pName;

      // Switch to session tab and automatically connect
      setTimeout(() => {
        const sessionTabBtn = document.querySelector('.tab-btn[data-tab="tab-session"]');
        if (sessionTabBtn && !sessionTabBtn.classList.contains("active")) {
          sessionTabBtn.click();
        }

        const effFeats = char?.effectiveFeats || char?.feats || {};
        const impInit = effFeats["Improved Initiative"] || 0;
        const dexMod = (typeof char?.getAbilityRank === 'function')
          ? (char.getAbilityRank("DEX") !== null ? char.getAbilityRank("DEX") : -5)
          : (char?.abilities?.DEX || 0);
        const totalInit = (char?.derivedStats && typeof char.derivedStats.initiative === 'number')
          ? char.derivedStats.initiative
          : (dexMod + (impInit * 4));

        if (typeof SessionNetwork !== 'undefined') {
          SessionNetwork.joinHost(qCamp, {
            playerName: pName,
            characterName: char?.name || "Hero",
            characterSummary: {
              powerLevel: char?.powerLevel || 10,
              defense: char?.combat?.DEF || 0,
              initiative: totalInit,
              initiativeRoll: char?.trackerState?.initiativeRoll ?? null
            }
          });
          if (typeof showToast === 'function') {
            showToast(`Auto-connecting to campaign "${qCamp}" as "${pName}"...`, "info");
          }
        }
      }, 400);
    }
  }

  // Pre-populate party roster DOM and localStorage cache
  syncPartyRosterUI();
}
window.setupSessionAndGMHub = setupSessionAndGMHub;



function setupThemeAndFontControls() {
  const root = document.documentElement;
  const btnTheme = document.getElementById("btnThemeToggle");
  const sliderLabel = document.getElementById("sliderLabelFont");
  const sliderControl = document.getElementById("sliderControlFont");
  const sliderTag = document.getElementById("sliderTagFont") || document.getElementById("sliderLinkFont");
  const sliderSecondary = document.getElementById("sliderSecondaryFont");
  const sliderMinorControl = document.getElementById("sliderMinorControlFont");
  const sliderFinePrint = document.getElementById("sliderFinePrintFont");

  const themes = ["light", "dark", "kitty", "parchment"];
  const themeNames = { light: "Light", dark: "Dark", kitty: "Kitty", parchment: "Parchment" };

  const savedTheme = localStorage.getItem("mm2e_theme") || "light";
  const savedLabelFont = Math.max(14, parseInt(localStorage.getItem("mm2e_font_labels") || localStorage.getItem("mm4e_font_labels") || "16", 10));
  const savedControlFont = Math.max(12, parseInt(localStorage.getItem("mm2e_font_controls") || localStorage.getItem("mm4e_font_controls") || "14", 10));
  const savedTagFont = Math.max(10, parseInt(localStorage.getItem("mm2e_font_tags") || localStorage.getItem("mm2e_font_links") || localStorage.getItem("mm4e_font_links") || "13", 10));
  const savedSecondaryFont = Math.max(12, parseInt(localStorage.getItem("mm2e_font_secondary") || localStorage.getItem("mm4e_font_secondary") || "14", 10));
  const savedMinorControlFont = Math.max(11, parseInt(localStorage.getItem("mm2e_font_minor_controls") || localStorage.getItem("mm4e_font_minor_controls") || "15", 10));
  const savedFinePrintFont = Math.max(10, parseInt(localStorage.getItem("mm2e_font_fine_print") || "13", 10));
  
  root.setAttribute("data-theme", savedTheme);

  function updateThemeBtnUI(activeTheme) {
    const idx = themes.indexOf(activeTheme) > -1 ? themes.indexOf(activeTheme) : 0;
    let dotsHtml = '<span style="display: flex; gap: 4px; margin-left: 12px;">';
    for (let i = 0; i < 4; i++) {
      const isActive = (i === idx);
      const bg = isActive ? 'var(--accent-primary)' : 'var(--text-muted)';
      const op = isActive ? '1' : '0.4';
      dotsHtml += `<span style="width: 8px; height: 8px; border-radius: 50%; background-color: ${bg}; opacity: ${op}; transition: background-color 0.2s;"></span>`;
    }
    dotsHtml += '</span>';
    btnTheme.innerHTML = `<span>Theme: ${themeNames[themes[idx]]}</span>${dotsHtml}`;
  }

  updateThemeBtnUI(savedTheme);

  root.style.setProperty("--font-size-labels", savedLabelFont + "px");
  if (sliderLabel) sliderLabel.value = savedLabelFont;
  const valLabel = document.getElementById("valLabelFont");
  if (valLabel) valLabel.textContent = savedLabelFont + "px";

  root.style.setProperty("--font-size-controls", savedControlFont + "px");
  if (sliderControl) sliderControl.value = savedControlFont;
  const valControl = document.getElementById("valControlFont");
  if (valControl) valControl.textContent = savedControlFont + "px";

  root.style.setProperty("--font-size-tags", savedTagFont + "px");
  root.style.setProperty("--font-size-links", savedTagFont + "px");
  if (sliderTag) sliderTag.value = savedTagFont;
  const valTag = document.getElementById("valTagFont") || document.getElementById("valLinkFont");
  if (valTag) valTag.textContent = savedTagFont + "px";

  root.style.setProperty("--font-size-secondary", savedSecondaryFont + "px");
  if (sliderSecondary) sliderSecondary.value = savedSecondaryFont;
  const valSecondary = document.getElementById("valSecondaryFont");
  if (valSecondary) valSecondary.textContent = savedSecondaryFont + "px";

  root.style.setProperty("--font-size-minor-controls", savedMinorControlFont + "px");
  if (sliderMinorControl) sliderMinorControl.value = savedMinorControlFont;
  const valMinorControl = document.getElementById("valMinorControlFont");
  if (valMinorControl) valMinorControl.textContent = savedMinorControlFont + "px";

  if (sliderFinePrint) {
    root.style.setProperty("--font-size-fine-print", savedFinePrintFont + "px");
    sliderFinePrint.value = savedFinePrintFont;
    const valFinePrint = document.getElementById("valFinePrintFont");
    if (valFinePrint) valFinePrint.textContent = savedFinePrintFont + "px";
  }

  btnTheme.addEventListener("click", (e) => {
    e.stopPropagation();
    const currentTheme = root.getAttribute("data-theme");
    let currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    root.setAttribute("data-theme", nextTheme);
    updateThemeBtnUI(nextTheme);
    try { localStorage.setItem("mm2e_theme", nextTheme); } catch (e) {}

    // Direct synchronization to popped out party window if open
    try {
      if (poppedOutPartyWindow && !poppedOutPartyWindow.closed && poppedOutPartyWindow.document) {
        poppedOutPartyWindow.document.documentElement.setAttribute("data-theme", nextTheme);
        if (poppedOutPartyWindow.document.body) poppedOutPartyWindow.document.body.setAttribute("data-theme", nextTheme);
        if (typeof poppedOutPartyWindow.__applySavedThemeAndFonts === 'function') {
          poppedOutPartyWindow.__applySavedThemeAndFonts();
        }
      }
    } catch (e) {}

    // Direct synchronization to popped out tracker window if open
    try {
      if (poppedOutTrackerWindow && !poppedOutTrackerWindow.closed && poppedOutTrackerWindow.document) {
        poppedOutTrackerWindow.document.documentElement.setAttribute("data-theme", nextTheme);
        if (poppedOutTrackerWindow.document.body) poppedOutTrackerWindow.document.body.setAttribute("data-theme", nextTheme);
        if (typeof poppedOutTrackerWindow.__applySavedThemeAndFonts === 'function') {
          poppedOutTrackerWindow.__applySavedThemeAndFonts();
        }
      }
    } catch (e) {}

    // Direct broadcast over mm2e_session_channel
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('mm2e_session_channel');
        bc.postMessage({ type: 'THEME_CHANGE', theme: nextTheme });
      }
    } catch (e) {}

    if (typeof SessionNetwork !== 'undefined' && typeof SessionNetwork.sendLocalBroadcast === 'function') {
      SessionNetwork.sendLocalBroadcast({ type: 'THEME_CHANGE', theme: nextTheme });
    }
  });

  if (sliderLabel) {
    sliderLabel.addEventListener("input", (e) => {
      root.style.setProperty("--font-size-labels", e.target.value + "px");
      const valEl = document.getElementById("valLabelFont");
      if (valEl) valEl.textContent = e.target.value + "px";
      localStorage.setItem("mm2e_font_labels", e.target.value);
    });
  }
  if (sliderControl) {
    sliderControl.addEventListener("input", (e) => {
      root.style.setProperty("--font-size-controls", e.target.value + "px");
      const valEl = document.getElementById("valControlFont");
      if (valEl) valEl.textContent = e.target.value + "px";
      localStorage.setItem("mm2e_font_controls", e.target.value);
    });
  }
  if (sliderTag) {
    sliderTag.addEventListener("input", (e) => {
      root.style.setProperty("--font-size-tags", e.target.value + "px");
      root.style.setProperty("--font-size-links", e.target.value + "px");
      const valEl = document.getElementById("valTagFont") || document.getElementById("valLinkFont");
      if (valEl) valEl.textContent = e.target.value + "px";
      localStorage.setItem("mm2e_font_tags", e.target.value);
      localStorage.setItem("mm2e_font_links", e.target.value);
    });
  }
  if (sliderSecondary) {
    sliderSecondary.addEventListener("input", (e) => {
      root.style.setProperty("--font-size-secondary", e.target.value + "px");
      const valEl = document.getElementById("valSecondaryFont");
      if (valEl) valEl.textContent = e.target.value + "px";
      localStorage.setItem("mm2e_font_secondary", e.target.value);
    });
  }
  if (sliderMinorControl) {
    sliderMinorControl.addEventListener("input", (e) => {
      root.style.setProperty("--font-size-minor-controls", e.target.value + "px");
      const valEl = document.getElementById("valMinorControlFont");
      if (valEl) valEl.textContent = e.target.value + "px";
      localStorage.setItem("mm2e_font_minor_controls", e.target.value);
    });
  }
  if (sliderFinePrint) {
    sliderFinePrint.addEventListener("input", (e) => {
      root.style.setProperty("--font-size-fine-print", e.target.value + "px");
      const valFinePrint = document.getElementById("valFinePrintFont");
      if (valFinePrint) valFinePrint.textContent = e.target.value + "px";
      localStorage.setItem("mm2e_font_fine_print", e.target.value);
    });
  }

  // --- FREEZE OPTIONS DIALOG SIZE TOGGLE ---
  const chkFixedOptions = document.getElementById("toggleFixedOptionsDialog");
  const optionsModalEl = document.getElementById("optionsModal");

  function setFixedOptionsDialogState(enabled) {
    if (chkFixedOptions) chkFixedOptions.checked = enabled;
    if (optionsModalEl) {
      if (enabled) {
        optionsModalEl.classList.add("prevent-resize");
      } else {
        optionsModalEl.classList.remove("prevent-resize");
      }
    }
  }

  if (chkFixedOptions) {
    const isFixed = localStorage.getItem("mm2e_fixed_options_dialog") !== "false";
    setFixedOptionsDialogState(isFixed);
    chkFixedOptions.addEventListener("change", (e) => {
      const enabled = e.target.checked;
      localStorage.setItem("mm2e_fixed_options_dialog", enabled ? "true" : "false");
      setFixedOptionsDialogState(enabled);
    });
  }

  // --- PERSISTENT TOP BAR (HEADER, SUMMARY BAR, TABS) TOGGLE & SCROLL BEHAVIOR ---
  const chkPersistent = document.getElementById("togglePersistentHeader");
  const pHeader = document.getElementById("persistentHeader");

  function setPersistentHeaderState(enabled) {
    if (chkPersistent) chkPersistent.checked = enabled;
    if (pHeader) {
      if (enabled) {
        pHeader.classList.remove("disabled");
        if (typeof window !== 'undefined' && window.scrollY > 4) {
          pHeader.classList.add("scrolled");
        }
      } else {
        pHeader.classList.add("disabled");
        pHeader.classList.remove("scrolled");
      }
    }
  }

  if (chkPersistent) {
    const isPersistent = localStorage.getItem("mm2e_persistent_header") !== "false";
    setPersistentHeaderState(isPersistent);
    chkPersistent.addEventListener("change", (e) => {
      const enabled = e.target.checked;
      localStorage.setItem("mm2e_persistent_header", enabled ? "true" : "false");
      setPersistentHeaderState(enabled);
    });
  }

  window.addEventListener("scroll", () => {
    if (pHeader && !pHeader.classList.contains("disabled")) {
      if (window.scrollY > 4) {
        pHeader.classList.add("scrolled");
      } else {
        pHeader.classList.remove("scrolled");
      }
    }
  }, { passive: true });
}
window.resetFont = function(type, defaultSize) {
  const root = document.documentElement;
  let cssVars = [];
  let lsKeys = [];
  let sliderId = "slider" + type + "Font";
  let valId = "val" + type + "Font";

  if (type === 'Label') { cssVars = ["--font-size-labels"]; lsKeys = ["mm2e_font_labels"]; }
  else if (type === 'Control') { cssVars = ["--font-size-controls"]; lsKeys = ["mm2e_font_controls"]; }
  else if (type === 'Tags' || type === 'Tag' || type === 'Link') {
    cssVars = ["--font-size-tags", "--font-size-links"];
    lsKeys = ["mm2e_font_tags", "mm2e_font_links"];
    sliderId = document.getElementById("sliderTagFont") ? "sliderTagFont" : "sliderLinkFont";
    valId = document.getElementById("valTagFont") ? "valTagFont" : "valLinkFont";
  }
  else if (type === 'Secondary') { cssVars = ["--font-size-secondary"]; lsKeys = ["mm2e_font_secondary"]; }
  else if (type === 'MinorControl') { cssVars = ["--font-size-minor-controls"]; lsKeys = ["mm2e_font_minor_controls"]; }
  else if (type === 'FinePrint') { cssVars = ["--font-size-fine-print"]; lsKeys = ["mm2e_font_fine_print"]; }

  cssVars.forEach(v => root.style.setProperty(v, defaultSize + "px"));
  lsKeys.forEach(k => localStorage.setItem(k, defaultSize));

  const sEl = document.getElementById(sliderId);
  if (sEl) sEl.value = defaultSize;
  const vEl = document.getElementById(valId);
  if (vEl) vEl.textContent = defaultSize + "px";
};

function setupSortingHeaders() {
  document.querySelectorAll("th.sortable").forEach(th => {
    th.addEventListener("click", () => {
      const tableType = th.dataset.table;
      const col = th.dataset.col;

      if (tableType === "skills") {
        if (skillSort.col === col) {
          skillSort.asc = !skillSort.asc;
        } else {
          skillSort.col = col;
          skillSort.asc = true;
        }
        sortSkills();
        buildSkillsUI();
      } else if (tableType === "feats") {
        if (advSort.col === col) {
          advSort.asc = !advSort.asc;
        } else {
          advSort.col = col;
          advSort.asc = true;
        }
        sortAdvantages();
        buildAdvantagesUI();
      }
      updateSortHeaderClasses();
      refreshUI();
    });
  });
  updateSortHeaderClasses();
}

function updateSortHeaderClasses() {
  document.querySelectorAll("th.sortable").forEach(th => {
    th.classList.remove("sort-asc", "sort-desc");
    const tableType = th.dataset.table;
    const col = th.dataset.col;

    if (tableType === "skills" && skillSort.col === col) {
      th.classList.add(skillSort.asc ? "sort-asc" : "sort-desc");
    } else if (tableType === "feats" && advSort.col === col) {
      th.classList.add(advSort.asc ? "sort-asc" : "sort-desc");
    }
  });
}

function sortSkills() {
  skillsDisplayList.sort((a, b) => {
    let valA = a[skillSort.col];
    let valB = b[skillSort.col];

    if (typeof valA === "boolean") {
      valA = valA ? 1 : 0;
      valB = valB ? 1 : 0;
    }

    if (valA < valB) return skillSort.asc ? -1 : 1;
    if (valA > valB) return skillSort.asc ? 1 : -1;
    return 0;
  });
}

function sortAdvantages() {
  advantagesDisplayList.sort((a, b) => {
    let valA = a[advSort.col];
    let valB = b[advSort.col];

    if (Array.isArray(valA)) valA = valA.join(", ");
    if (Array.isArray(valB)) valB = valB.join(", ");

    if (valA < valB) return advSort.asc ? -1 : 1;
    if (valA > valB) return advSort.asc ? 1 : -1;
    return 0;
  });
}

function buildAbilitiesUI() {
  const container = document.getElementById("abilitiesContainer");
  const list = [
    { id: "STR", name: "Strength" },
    { id: "CON", name: "Constitution" },
    { id: "DEX", name: "Dexterity" },
    { id: "INT", name: "Intelligence" },
    { id: "WIS", name: "Wisdom" },
    { id: "CHA", name: "Charisma" }
  ];

  const headerHtml = `
    <div class="list-row" style="font-weight: 600; font-size: var(--font-size-fine-print); color: var(--text-muted); background: var(--bg-panel); border: none; border-bottom: 1px solid var(--border-color); padding: 4px 8px; margin-bottom: 4px; border-radius: 0;">
      <span style="width: calc(var(--font-size-controls) * 1.25); min-width: calc(var(--font-size-controls) * 1.25);"></span>
      <span style="width: calc(140px + 36px); min-width: calc(140px + 36px); padding-left: 6px; box-sizing: border-box;">Ability</span>
      <div style="width: calc(var(--font-size-controls) * 7.85); min-width: calc(var(--font-size-controls) * 7.85); text-align: center;">Base Score</div>
      <div class="row-adjustments" style="padding-left: 4px;">Adjustments &amp; Enhanced</div>
      <div class="ability-total-col" style="text-align: right;">Total (Mod)</div>
    </div>
  `;

  container.innerHTML = headerHtml + list.map(abil => `
    <div class="list-row">
      <input type="checkbox" class="row-enable-toggle" id="enable_${abil.id}" checked title="Enable / Disable Trait">
      <button type="button" class="row-title-btn" id="btnRollAbil_${abil.id}" onclick="window.rollAbilityCheck('${abil.id}')" title="Roll ${abil.name} Check (1d20 + ${abil.id} modifier)">
        <span style="font-size: var(--font-size-labels);">🎲</span>
        <span class="row-title">${abil.name} (${abil.id})</span>
      </button>
      
      <div class="stepper-group" id="stepper_group_${abil.id}" title="Base Ability Score (10 is average human, 1 PP per point over 10)">
        <button type="button" class="stepper-btn stepper-dec" id="dec_${abil.id}" onclick="stepVal('input_${abil.id}', -1, 0, 50)">−</button>
        <input type="number" id="input_${abil.id}" class="stepper-input" min="0" max="50" value="10">
        <button type="button" class="stepper-btn stepper-inc" id="inc_${abil.id}" onclick="stepVal('input_${abil.id}', 1, 0, 50)">+</button>
      </div>

      <div class="row-adjustments" id="adj_${abil.id}">
        <em>Base points only</em>
      </div>

      <div class="ability-total-col" id="total_rank_${abil.id}" title="Total Ability Score and Modifier">10 (+0)</div>
    </div>
  `).join("");

  list.forEach(abil => {
    document.getElementById(`input_${abil.id}`).addEventListener("input", (e) => {
      char.abilities[abil.id] = parseInt(e.target.value) || 0;
      refreshUI();
    });
    
    document.getElementById(`enable_${abil.id}`).addEventListener("change", (e) => {
      const isAbsent = !e.target.checked;
      char.absentAbilities[abil.id] = isAbsent;
      document.getElementById(`input_${abil.id}`).disabled = isAbsent;
      document.getElementById(`dec_${abil.id}`).disabled = isAbsent;
      document.getElementById(`inc_${abil.id}`).disabled = isAbsent;
      const btnRoll = document.getElementById(`btnRollAbil_${abil.id}`);
      if (btnRoll) btnRoll.disabled = isAbsent;
      refreshUI();
    });
  });

  const chkMechaAI = document.getElementById("chkMechaHasAI");
  if (chkMechaAI) {
    chkMechaAI.addEventListener("change", (e) => {
      char.setMechaMode(char.isMecha, e.target.checked);
      populateUIFromCharacter();
      refreshUI();
      showToast(e.target.checked ? "Onboard AI equipped: Mental abilities enabled." : "Onboard AI removed: Unconscious machine construct.", "info");
    });
  }

  document.getElementById("heroNameInput").addEventListener("input", (e) => {
    char.name = e.target.value.slice(0, 45);
    const activeHeroName = (char.name && char.name.trim()) ? char.name.trim() : "Hero";
    const lblTrackerHero = document.getElementById("lblTrackerHeroName");
    if (lblTrackerHero) lblTrackerHero.textContent = activeHeroName;
    try {
      localStorage.setItem('mm2e_active_editor_hero', JSON.stringify({ name: activeHeroName, heroPoints: char.heroPoints }));
    } catch (err) {}
    if (poppedOutTrackerWindow && !poppedOutTrackerWindow.closed) {
      try {
        if (poppedOutTrackerWindow.localTracker) {
          poppedOutTrackerWindow.localTracker.heroName = activeHeroName;
        }
        const lblPop = poppedOutTrackerWindow.document?.getElementById('lblTrackerHeroName');
        if (lblPop) lblPop.textContent = activeHeroName;
        if (typeof poppedOutTrackerWindow.renderAllTrackerUI === 'function') {
          poppedOutTrackerWindow.renderAllTrackerUI();
        }
      } catch (err) {}
    }
    syncActiveCompanionIfActive();
    refreshUI();
    if (typeof syncPartyRosterUI === 'function') syncPartyRosterUI();
    if (typeof broadcastTrackerSync === 'function') broadcastTrackerSync();
  });
  document.getElementById("playerNameInput").addEventListener("input", (e) => {
    char.playerName = e.target.value.slice(0, 45);
    localStorage.setItem("mm2e_player_name", char.playerName);
    const sessionNameInput = document.getElementById("txtSessionPlayerName");
    if (sessionNameInput && sessionNameInput.value !== char.playerName) {
      sessionNameInput.value = char.playerName;
    }
    if (typeof CampaignManager !== 'undefined' && char.playerName.trim()) {
      CampaignManager.setUserAccount(char.playerName.trim());
      const isGM = CampaignManager.isDesignatedGM('local_player');
      const currGM = CampaignManager.getGMUserName();
      if (isGM || !currGM || currGM === 'GM') {
        CampaignManager.setGMUserName(char.playerName.trim());
      }
    }
    if (typeof syncGMRosterUI === 'function') {
      syncGMRosterUI();
    }
    if (typeof syncPartyRosterUI === 'function') {
      syncPartyRosterUI();
    }
    if (!window.isCharacterLoading && typeof FileManager !== 'undefined' && FileManager.markDirty) {
      FileManager.markDirty();
    }
  });
  document.getElementById("heroPLInput").addEventListener("input", (e) => {
    char.powerLevel = parseInt(e.target.value) || 10;
    if (!window.activeCompanionId) {
      char.totalPointsAllowed = char.powerLevel * 15;
    }
    buildAdvantagesUI();
    refreshUI();
  });

  document.getElementById("heroSizeInput").addEventListener("change", (e) => {
    char.sizeCategory = e.target.value;
    refreshUI();
  });
  document.getElementById("heroMassInput").addEventListener("input", (e) => {
    char.massRank = parseInt(e.target.value) || 0;
    refreshUI();
  });
  document.getElementById("inputATK").addEventListener("input", (e) => {
    char.combat.ATK = parseInt(e.target.value) || 0;
    refreshUI();
  });
  document.getElementById("inputDEF").addEventListener("input", (e) => {
    char.combat.DEF = parseInt(e.target.value) || 0;
    refreshUI();
  });
}

// --- Hero Points System ---
window.toggleHeroPointsLock = function() {
  if (typeof char !== 'undefined' && char) {
    char.heroPointsLocked = !char.heroPointsLocked;
    window.updateHeroPointsLockUI();
  }
};

window.updateHeroPointsLockUI = function() {
  const isLocked = typeof char !== 'undefined' && char ? !!char.heroPointsLocked : false;
  const hpInput = document.getElementById("heroPointsInput");
  const btnDec = document.getElementById("btnDecHeroPoints");
  const btnInc = document.getElementById("btnIncHeroPoints");
  const icoLock = document.getElementById("icoLockHeroPoints");
  const btnLock = document.getElementById("btnLockHeroPoints");
  if (hpInput) hpInput.disabled = isLocked;
  if (btnDec) btnDec.disabled = isLocked;
  if (btnInc) btnInc.disabled = isLocked;
  if (icoLock) icoLock.textContent = isLocked ? "🔒" : "🔓";
  if (btnLock) {
    btnLock.title = isLocked ? "Unlock Hero Points Stepper" : "Lock Hero Points Stepper";
    btnLock.style.background = isLocked ? "rgba(239, 68, 68, 0.15)" : "";
    btnLock.style.borderColor = isLocked ? "#ef4444" : "";
  }
  if (typeof window.updateHeroPointsUseButtonState === 'function') {
    window.updateHeroPointsUseButtonState();
  }
};

const HERO_POINT_RULES = [
  // --- Category: Rolls & Actions ---
  {
    id: 'improve_skill',
    category: 'rolls_actions',
    categoryName: '🎲 Rolls & Actions (House Rules & Reroll)',
    name: '🎯 Improve Skill Check (+5)',
    rollType: 'skill',
    tab: 'tab-skills',
    tabLabel: 'Skills',
    isRollBonus: true,
    isHouseRule: true,
    description: 'House Rule: Spend 1 Hero Point BEFORE making a skill check to gain an immediate +5 bonus on the roll. Must be declared before rolling. When selected, you will automatically switch to the Skills tab. (In official M&M 2E rules, check bonuses require Extra Effort, which grants +2 and causes fatigue unless negated by a Hero Point).'
  },
  {
    id: 'improve_power',
    category: 'rolls_actions',
    categoryName: '🎲 Rolls & Actions (House Rules & Reroll)',
    name: '⚡ Improve Power Check / Attack (+5)',
    rollType: 'power',
    tab: 'tab-powers',
    tabLabel: 'Powers',
    isRollBonus: true,
    isHouseRule: true,
    description: 'House Rule: Spend 1 Hero Point BEFORE making a power check or power attack roll to gain an immediate +5 bonus on the roll. Must be declared before rolling. When selected, you will switch to the Powers tab. (In official M&M 2E rules, check bonuses require Extra Effort, which grants +2 and causes fatigue unless negated by a Hero Point).'
  },
  {
    id: 'improve_attack',
    category: 'rolls_actions',
    categoryName: '🎲 Rolls & Actions (House Rules & Reroll)',
    name: '⚔️ Improve Attack Roll (+5)',
    rollType: 'attack',
    tab: 'tab-basics',
    tabLabel: 'Main Stats',
    isRollBonus: true,
    isHouseRule: true,
    description: 'House Rule: Spend 1 Hero Point BEFORE making a melee, ranged, or unarmed attack roll to gain an immediate +5 bonus on the attack. Must be declared before rolling. (In official M&M 2E rules, check bonuses require Extra Effort, which grants +2 and causes fatigue unless negated by a Hero Point).'
  },
  {
    id: 'improve_save',
    category: 'rolls_actions',
    categoryName: '🎲 Rolls & Actions (House Rules & Reroll)',
    name: '🛡️ Improve Saving Throw (+5)',
    rollType: 'save',
    tab: 'tab-basics',
    tabLabel: 'Main Stats (Defenses)',
    isRollBonus: true,
    isHouseRule: true,
    description: 'House Rule: Spend 1 Hero Point BEFORE making a saving throw (Toughness, Fortitude, Reflex, or Will) to gain an immediate +5 bonus. Must be declared before rolling. (In official M&M 2E rules, check bonuses require Extra Effort, which grants +2 and causes fatigue unless negated by a Hero Point).'
  },
  {
    id: 'improve_ability',
    category: 'rolls_actions',
    categoryName: '🎲 Rolls & Actions (House Rules & Reroll)',
    name: '🧠 Improve Ability Check (+5)',
    rollType: 'ability',
    tab: 'tab-basics',
    tabLabel: 'Main Stats (Abilities)',
    isRollBonus: true,
    isHouseRule: true,
    description: 'House Rule: Spend 1 Hero Point BEFORE making an ability check (STR, DEX, CON, INT, WIS, CHA) to gain an immediate +5 bonus. Must be declared before rolling. (In official M&M 2E rules, check bonuses require Extra Effort, which grants +2 and causes fatigue unless negated by a Hero Point).'
  },
  {
    id: 'improve_initiative',
    category: 'rolls_actions',
    categoryName: '🎲 Rolls & Actions (House Rules & Reroll)',
    name: '⚡ Improve Initiative Check (+5)',
    rollType: 'initiative',
    tab: 'tab-basics',
    tabLabel: 'Main Stats / Combat',
    isRollBonus: true,
    isHouseRule: true,
    description: 'House Rule: Spend 1 Hero Point BEFORE rolling initiative to gain an immediate +5 bonus on your initiative check. Must be declared before rolling. (In official M&M 2E rules, check bonuses require Extra Effort, which grants +2 and causes fatigue unless negated by a Hero Point).'
  },
  {
    id: 'improve_any',
    category: 'rolls_actions',
    categoryName: '🎲 Rolls & Actions (House Rules & Reroll)',
    name: '🎲 Improve Any Next Roll (+5)',
    rollType: 'any',
    tab: null,
    tabLabel: 'Current Tab',
    isRollBonus: true,
    isHouseRule: true,
    description: 'House Rule: Spend 1 Hero Point BEFORE making your next d20 roll to gain an immediate +5 bonus on whatever roll you perform next. Must be declared before rolling. (In official M&M 2E rules, check bonuses require Extra Effort, which grants +2 and causes fatigue unless negated by a Hero Point).'
  },
  {
    id: 'reroll',
    category: 'rolls_actions',
    categoryName: '🎲 Rolls & Actions (House Rules & Reroll)',
    name: '🔄 Reroll Most Recent Check (Official 2E: Min 11–20)',
    tab: null,
    tabLabel: 'Session Log',
    isImmediate: true,
    description: 'Official M&M 2E Rule (p. 120): Reroll any die roll you just made and take the better of the two results. If the new roll is 1–10, add 10 to it (giving 11–20). You cannot reroll a natural 1, natural 20, or a reroll. If an eligible previous roll exists, this spends 1 HP immediately and executes the reroll.'
  },

  // --- Category: Extra Effort & Powers ---
  {
    id: 'surge',
    category: 'extra_effort',
    categoryName: '⚡ Extra Effort & Powers',
    name: '⚡ Surge (Extra Standard Action)',
    tab: null,
    isImmediate: true,
    description: 'Gain an immediate extra standard action this round without suffering fatigue from Extra Effort. Spends 1 Hero Point immediately.'
  },
  {
    id: 'power_boost',
    category: 'extra_effort',
    categoryName: '⚡ Extra Effort & Powers',
    name: '⚡ Power Boost (+2 Ranks for 1 Round)',
    tab: 'tab-powers',
    tabLabel: 'Powers',
    isImmediate: true,
    description: 'Increase the rank of one of your powers by +2 for one round without suffering fatigue. Switches to the Powers tab and spends 1 Hero Point immediately.'
  },
  {
    id: 'power_stunt',
    category: 'extra_effort',
    categoryName: '⚡ Extra Effort & Powers',
    name: '⚡ Power Stunt (Alternate Power for Scene)',
    tab: 'tab-powers',
    tabLabel: 'Powers',
    isImmediate: true,
    description: 'Temporarily acquire an Alternate Power effect derived from one of your existing powers for this scene without suffering fatigue. Switches to the Powers tab and spends 1 Hero Point immediately.'
  },
  {
    id: 'extreme_effort',
    category: 'extra_effort',
    categoryName: '⚡ Extra Effort & Powers',
    name: '💪 Extreme Effort (+5 Str/Con Feat)',
    tab: null,
    isImmediate: true,
    description: 'Gain a +5 bonus on a Strength or Constitution check or strength feat without suffering fatigue. Spends 1 Hero Point immediately.'
  },

  // --- Category: Health & Recovery ---
  {
    id: 'recover_stun',
    category: 'health_recovery',
    categoryName: '🛡️ Health & Recovery',
    name: '💫 Recover: Shake off Stunned / Dazed',
    tab: null,
    isImmediate: true,
    description: 'Immediately recover from being stunned or dazed at the start of your turn, allowing you to act normally. Spends 1 Hero Point immediately.'
  },
  {
    id: 'recover_fatigue',
    category: 'health_recovery',
    categoryName: '🛡️ Health & Recovery',
    name: '🏃 Recover: Remove Fatigue / Exhaustion',
    tab: null,
    isImmediate: true,
    description: 'Immediately remove the fatigued condition or reduce exhausted to fatigued. Spends 1 Hero Point immediately.'
  },
  {
    id: 'recover_bruise',
    category: 'health_recovery',
    categoryName: '🛡️ Health & Recovery',
    name: '🩹 Recover: Convert Staggered / Heal Bruise',
    tab: null,
    isImmediate: true,
    description: 'Immediately convert a staggered condition to bruised, or heal a lethal injury / bruise condition. Spends 1 Hero Point immediately.'
  },
  {
    id: 'avoid_death',
    category: 'health_recovery',
    categoryName: '🛡️ Health & Recovery',
    name: '❤️ Avoid Death: Stabilize Instantly',
    tab: null,
    isImmediate: true,
    description: 'Automatically stabilize when dying, or avoid an immediately fatal attack result. Spends 1 Hero Point immediately.'
  },
  {
    id: 'ignore_condition',
    category: 'health_recovery',
    categoryName: '🛡️ Health & Recovery',
    name: '🛡️ Overcome Condition (1 Round)',
    tab: null,
    isImmediate: true,
    description: 'Ignore the negative effects of a condition (such as blinded, deafened, nauseated, or impaired) for one round. Spends 1 Hero Point immediately.'
  },

  // --- Category: Tactics & Feats ---
  {
    id: 'dodge_bonus',
    category: 'tactics_feats',
    categoryName: '⚔️ Tactics & Feats',
    name: '🛡️ Dodge Defense (+5 Dodge for 1 Round)',
    tab: null,
    isImmediate: true,
    description: 'Spend a hero point to gain a +5 dodge bonus to Defense until the start of your next turn. Spends 1 Hero Point immediately.'
  },
  {
    id: 'counterattack',
    category: 'tactics_feats',
    categoryName: '⚔️ Tactics & Feats',
    name: '⚔️ Counterattack (Act Out of Turn)',
    tab: null,
    isImmediate: true,
    description: 'When an opponent attacks you, spend a hero point to immediately make a counterattack out of normal initiative order. Spends 1 Hero Point immediately.'
  },
  {
    id: 'escape',
    category: 'tactics_feats',
    categoryName: '⚔️ Tactics & Feats',
    name: '🔓 Escape Entanglement / Trap',
    tab: null,
    isImmediate: true,
    description: 'Automatically escape from a pin, grapple, snare, or similar entanglement. Spends 1 Hero Point immediately.'
  },
  {
    id: 'heroic_feat',
    category: 'tactics_feats',
    categoryName: '⚔️ Tactics & Feats',
    name: '⚔️ Heroic Feat (Temporary Feat for 1 Round)',
    tab: 'tab-feats',
    tabLabel: 'Feats',
    isImmediate: true,
    description: 'Temporarily gain the benefits of a Combat, General, or Skill feat you do not already possess for one round. Switches to the Feats tab and spends 1 Hero Point immediately.'
  },

  // --- Category: Narrative & Inspiration ---
  {
    id: 'inspiration',
    category: 'narrative',
    categoryName: '💡 Narrative & Edits',
    name: '💡 Inspiration (Clue / Hint from GM)',
    tab: null,
    isImmediate: true,
    description: 'The GM gives you a clue, flash of insight, or hint when you are stuck or seeking guidance. Spends 1 Hero Point immediately.'
  },
  {
    id: 'dramatic_edit',
    category: 'narrative',
    categoryName: '💡 Narrative & Edits',
    name: '🎬 Dramatic Edit (Minor Scene Edit)',
    tab: null,
    isImmediate: true,
    description: 'Make a minor, plausible edit to your surroundings (e.g., an unlatched window, loose pipe, convenient shadow, or fire extinguisher). Spends 1 Hero Point immediately.'
  },
  {
    id: 'custom',
    category: 'narrative',
    categoryName: '💡 Narrative & Edits',
    name: '✨ Other / Custom Heroic Maneuver',
    tab: null,
    isImmediate: true,
    description: 'Spend 1 Hero Point for a unique heroic maneuver or narrative effect negotiated with and approved by the GM. Spends 1 Hero Point immediately.'
  }
];

window.isGameSessionActiveForHP = function() {
  return true;
};

window.updateHeroPointsUseButtonState = function() {
  const btnUse = document.getElementById("btnUseHeroPoint");
  if (!btnUse) return;

  btnUse.innerHTML = '✨ Use HP';

  if (typeof char !== 'undefined' && char && (typeof char.heroPoints !== 'number' || isNaN(char.heroPoints))) {
    const hpInput = document.getElementById("heroPointsInput");
    const defaultHP = 1 + (char.effectiveFeats?.["Luck"] || char.feats?.["Luck"] || 0);
    const rawVal = hpInput ? parseInt(hpInput.value) : NaN;
    char.heroPoints = !isNaN(rawVal) ? Math.max(0, rawVal) : defaultHP;
  }

  const hasActiveQueue = typeof char !== 'undefined' && char && (
    (char._pendingHPRollBonus && char._pendingHPRollBonus > 0) ||
    char._pendingHPOption ||
    char._pendingHPReroll
  );

  if (hasActiveQueue) {
    btnUse.innerHTML = '✨ Active (+5)';
    btnUse.title = 'Active Hero Point: +5 bonus queued for your next roll!';
    btnUse.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
    btnUse.style.borderColor = '#d97706';
    btnUse.style.color = '#fff';
    btnUse.disabled = false;
    btnUse.style.opacity = "1";
    btnUse.style.cursor = "pointer";
    return;
  } else {
    btnUse.style.background = "";
    btnUse.style.borderColor = "";
    btnUse.style.color = "";
  }

  const currentHP = (typeof char !== 'undefined' && char) ? (char.heroPoints || 0) : 0;
  const allowed = currentHP > 0;
  btnUse.disabled = !allowed;

  if (currentHP <= 0) {
    btnUse.title = "No Hero Points remaining to spend!";
    btnUse.style.opacity = "0.5";
    btnUse.style.cursor = "not-allowed";
  } else {
    btnUse.title = `Spend 1 Hero Point (${currentHP} available)`;
    btnUse.style.opacity = "1";
    btnUse.style.cursor = "pointer";
  }
};

let activeHPTargetCharId = 'local_hero';
let selectedHPOptionId = 'improve_skill';
window.activeHPTargetCharId = activeHPTargetCharId;
window.selectedHPOptionId = selectedHPOptionId;

window.renderHeroPointOptionsModalBody = function() {
  const container = document.getElementById("hpOptionsListContainer");
  if (!container) return;

  const catFilter = document.getElementById("selHPCategoryFilter")?.value || 'all';
  const searchTxt = (document.getElementById("txtHPSearch")?.value || '').trim().toLowerCase();

  const filtered = HERO_POINT_RULES.filter(opt => {
    if (catFilter !== 'all' && opt.category !== catFilter) return false;
    if (searchTxt) {
      const matchName = opt.name.toLowerCase().includes(searchTxt);
      const matchDesc = opt.description.toLowerCase().includes(searchTxt);
      const matchCat = opt.categoryName.toLowerCase().includes(searchTxt);
      if (!matchName && !matchDesc && !matchCat) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 24px 0; font-size: 13px; font-style: italic;">No Hero Point options match "${escapeHtml(searchTxt)}".</div>`;
    return;
  }

  if (!filtered.some(o => o.id === selectedHPOptionId)) {
    selectedHPOptionId = filtered[0].id;
    window.selectedHPOptionId = selectedHPOptionId;
  }

  // Group by category
  const groups = {};
  filtered.forEach(opt => {
    if (!groups[opt.categoryName]) groups[opt.categoryName] = [];
    groups[opt.categoryName].push(opt);
  });

  let html = '';
  for (const [groupTitle, items] of Object.entries(groups)) {
    html += `
      <div class="hp-category-group">
        <div class="hp-category-title">${groupTitle}</div>
        ${items.map(opt => {
          const isSel = opt.id === selectedHPOptionId;
          const badgeHtml = opt.tabLabel 
            ? `<span class="badge hp-option-badge" style="background: rgba(99, 102, 241, 0.15); color: var(--accent-primary); border: 1px solid rgba(99, 102, 241, 0.3);">➔ ${escapeHtml(opt.tabLabel)}</span>`
            : (opt.isImmediate ? `<span class="badge hp-option-badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">Instant</span>` : '');
          const rollBadgeHtml = opt.isRollBonus
            ? `<span class="badge hp-option-badge" style="background: rgba(180, 83, 9, 0.15); color: #b45309; border: 1px solid rgba(180, 83, 9, 0.3);">+5 Before Roll</span>`
            : '';
          const houseRuleBadgeHtml = opt.isHouseRule
            ? `<span class="badge hp-option-badge" style="background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3);">House Rule</span>`
            : '';

          return `
            <div class="hp-option-card ${isSel ? 'selected' : ''}" onclick="window.selectHeroPointOption('${opt.id}')">
              <div class="hp-option-header">
                <div class="hp-option-main">
                  <input type="radio" name="hp_option_choice" value="${opt.id}" ${isSel ? 'checked' : ''} style="margin: 0; pointer-events: none;">
                  <span class="hp-option-title">${opt.name}</span>
                  ${badgeHtml}
                  ${rollBadgeHtml}
                  ${houseRuleBadgeHtml}
                </div>
                <button type="button" class="hp-help-btn" onclick="window.toggleHPOptionHelp(event, '${opt.id}')" title="Click for official M&M 2E rule details">?</button>
              </div>
              <div id="hpHelp_${opt.id}" class="hp-help-box" style="display: none;">
                ${escapeHtml(opt.description)}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  container.innerHTML = html;
  window.updateSelectedOptionNotice();
};
window.populateHeroPointOptions = window.renderHeroPointOptionsModalBody;

window.filterHeroPointOptions = function() {
  window.renderHeroPointOptionsModalBody();
};

window.selectHeroPointOption = function(optId) {
  selectedHPOptionId = optId;
  window.selectedHPOptionId = selectedHPOptionId;
  const cards = document.querySelectorAll('.hp-option-card');
  cards.forEach(card => card.classList.remove('selected'));
  const radios = document.querySelectorAll('input[name="hp_option_choice"]');
  radios.forEach(r => {
    if (r.value === optId) {
      r.checked = true;
      r.closest('.hp-option-card')?.classList.add('selected');
    } else {
      r.checked = false;
    }
  });
  window.updateSelectedOptionNotice();
};

window.toggleHPOptionHelp = function(e, optId) {
  if (e) e.stopPropagation();
  const box = document.getElementById('hpHelp_' + optId);
  if (!box) return;
  const isHidden = box.style.display === 'none' || !box.style.display;
  box.style.display = isHidden ? 'block' : 'none';
};

window.updateSelectedOptionNotice = function() {
  const lbl = document.getElementById("lblHPSelectedDestination");
  if (!lbl) return;
  const opt = HERO_POINT_RULES.find(o => o.id === selectedHPOptionId);
  if (!opt) {
    lbl.innerHTML = `<span>Select an option above to proceed.</span>`;
    return;
  }
  if (opt.isRollBonus) {
    const tabName = opt.tabLabel || 'applicable tab';
    lbl.innerHTML = `
      <span style="color: var(--accent-primary); font-weight: 600;">
        🎯 Selected: <strong>${escapeHtml(opt.name)}</strong>. Will switch to <strong>${escapeHtml(tabName)}</strong> tab.
        <span style="color: var(--text-muted); font-weight: normal;">(Spends 1 HP &amp; scrolls to pertinent roll section with +5 bonus)</span>
      </span>
    `;
  } else if (opt.id === 'reroll') {
    lbl.innerHTML = `
      <span style="color: #b45309; font-weight: 600;">
        🔄 Selected: <strong>Reroll Most Recent Check</strong> (M&M 2E 11–20 Floor Rule). Spends 1 HP immediately.
      </span>
    `;
  } else {
    lbl.innerHTML = `
      <span style="color: #10b981; font-weight: 600;">
        ⚡ Selected: <strong>${escapeHtml(opt.name)}</strong>. Spends 1 HP immediately upon confirmation.${opt.tabLabel ? ` (Switches to ${opt.tabLabel} tab)` : ''}
      </span>
    `;
  }
};

window.scrollToPertinentRollSection = function(optionId, tabId) {
  setTimeout(() => {
    let targetEl = null;

    if (optionId === 'improve_attack') {
      const attacksBox = document.getElementById("attacksListContainer");
      const meleeBtn = document.getElementById("btnRollMeleeAtk");
      targetEl = attacksBox?.closest('.collapsible-panel') || meleeBtn?.closest('.collapsible-panel') || attacksBox || meleeBtn;
    } else if (optionId === 'improve_save' || optionId === 'dodge_bonus') {
      const toughBtn = document.getElementById("btnRollSave_Toughness");
      const reflexBtn = document.getElementById("btnRollSave_Reflex");
      targetEl = toughBtn?.closest('.collapsible-panel') || reflexBtn?.closest('.collapsible-panel') || toughBtn || reflexBtn;
    } else if (optionId === 'improve_ability') {
      const abilBox = document.getElementById("abilitiesContainer");
      targetEl = abilBox?.closest('.collapsible-panel') || abilBox;
    } else if (optionId === 'improve_initiative') {
      const initBtn = document.getElementById("btnRollInitMisc") || document.getElementById("btnRollMeleeAtk");
      targetEl = initBtn?.closest('.collapsible-panel') || initBtn;
    } else if (optionId === 'improve_skill') {
      targetEl = document.getElementById("skillsContainer") || document.getElementById("txtSearchSkills");
    } else if (optionId === 'improve_power' || optionId === 'power_boost' || optionId === 'power_stunt') {
      targetEl = document.getElementById("powersContainer");
    } else if (optionId === 'heroic_feat') {
      targetEl = document.getElementById("featsContainer");
    }

    if (targetEl) {
      // If inside a collapsed panel, ensure it is expanded!
      const panel = targetEl.classList.contains('collapsible-panel') ? targetEl : targetEl.closest('.collapsible-panel');
      if (panel && panel.classList.contains('collapsed')) {
        panel.classList.remove('collapsed');
      }

      // Smooth scroll to the element
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Apply pulsing highlight animation to draw user's attention
      targetEl.classList.remove('hp-target-highlight');
      void targetEl.offsetWidth; // Trigger DOM reflow to restart animation
      targetEl.classList.add('hp-target-highlight');
      setTimeout(() => {
        targetEl.classList.remove('hp-target-highlight');
      }, 3600);
    }
  }, 120);
};

window.openUseHeroPointModal = function(charId = 'local_hero') {
  activeHPTargetCharId = charId || 'local_hero';
  window.activeHPTargetCharId = activeHPTargetCharId;

  // If targeting an NPC from campaign, automatically load into editor
  if (typeof CampaignManager !== 'undefined' && activeHPTargetCharId && activeHPTargetCharId !== 'local_hero' && activeHPTargetCharId !== 'local_player') {
    const camp = CampaignManager.getActiveCampaign();
    const npc = (camp?.npcs || []).find(n => n.id === activeHPTargetCharId || n.name === activeHPTargetCharId) ||
                (camp?.encounterEnemies || []).find(e => e.id === activeHPTargetCharId || e.name === activeHPTargetCharId);
    if (npc && window.activeEditorNpcId !== npc.id && typeof window.gmLoadNpcToEditor === 'function') {
      window.gmLoadNpcToEditor(npc.id);
    }
  }

  let targetHP = 0;
  let targetName = 'Hero';
  const isLocalTarget = activeHPTargetCharId === 'local_hero' || activeHPTargetCharId === 'local_player' ||
    (typeof char !== 'undefined' && char && char.name && (
      (typeof activeHPTargetCharId === 'string' && activeHPTargetCharId.toLowerCase() === char.name.toLowerCase()) ||
      (char.id && activeHPTargetCharId === char.id)
    ));

  if (isLocalTarget) {
    if (typeof char !== 'undefined' && char && (typeof char.heroPoints !== 'number' || isNaN(char.heroPoints))) {
      const hpInput = document.getElementById("heroPointsInput");
      const defaultHP = 1 + (char.effectiveFeats?.["Luck"] || char.feats?.["Luck"] || 0);
      const rawVal = hpInput ? parseInt(hpInput.value) : NaN;
      char.heroPoints = !isNaN(rawVal) ? Math.max(0, rawVal) : defaultHP;
    }
    targetHP = (typeof char !== 'undefined' && char) ? (char.heroPoints || 0) : 0;
    targetName = (typeof char !== 'undefined' && char && char.name) ? char.name : 'Hero';
  } else {
    const camp = (typeof CampaignManager !== 'undefined') ? CampaignManager.getActiveCampaign() : null;
    const player = (camp?.acceptedPlayers || []).find(p => p.id === activeHPTargetCharId || p.characterName === activeHPTargetCharId);
    const npc = (camp?.npcs || []).find(n => n.id === activeHPTargetCharId || n.name === activeHPTargetCharId);
    const target = player || npc;
    targetHP = target ? (target.heroPoints !== undefined ? target.heroPoints : 1) : 0;
    targetName = target ? (target.characterName || target.name || 'Character') : 'Character';
  }

  if (targetHP <= 0) {
    if (typeof showToast === 'function') showToast(`No Hero Points remaining for ${targetName}!`, "warning");
    return;
  }

  const modal = document.getElementById("useHeroPointModal");
  if (!modal) return;

  const titleEl = document.getElementById("useHeroPointModalTitle") || modal.querySelector("h3");
  if (titleEl) {
    titleEl.textContent = `✨ Hero Point Options — ${targetName}`;
  }

  const lblCurrentHP = document.getElementById("lblModalCurrentHP");
  if (lblCurrentHP) lblCurrentHP.textContent = targetHP;

  const txtDetails = document.getElementById("txtHPDetails");
  if (txtDetails) txtDetails.value = "";

  const txtSearch = document.getElementById("txtHPSearch");
  if (txtSearch) txtSearch.value = "";

  const selFilter = document.getElementById("selHPCategoryFilter");
  if (selFilter) selFilter.value = "all";

  window.renderHeroPointOptionsModalBody();
  modal.classList.add("active");
};

window.closeUseHeroPointModal = function() {
  const modal = document.getElementById("useHeroPointModal");
  if (modal) modal.classList.remove("active");
};

window.confirmUseHeroPoint = function() {
  const opt = HERO_POINT_RULES.find(o => o.id === selectedHPOptionId) || HERO_POINT_RULES[0];
  if (!opt) return;

  const targetCharId = activeHPTargetCharId || 'local_hero';
  let targetHP = 0;
  let targetChar = (typeof char !== 'undefined' && char) ? char : null;

  const isLocalTarget = targetCharId === 'local_hero' || targetCharId === 'local_player' ||
    (typeof char !== 'undefined' && char && char.name && (
      (typeof targetCharId === 'string' && targetCharId.toLowerCase() === char.name.toLowerCase()) ||
      (char.id && targetCharId === char.id)
    ));

  if (isLocalTarget) {
    if (char && (typeof char.heroPoints !== 'number' || isNaN(char.heroPoints))) {
      const hpInput = document.getElementById("heroPointsInput");
      const defaultHP = 1 + (char.effectiveFeats?.["Luck"] || char.feats?.["Luck"] || 0);
      const rawVal = hpInput ? parseInt(hpInput.value) : NaN;
      char.heroPoints = !isNaN(rawVal) ? Math.max(0, rawVal) : defaultHP;
    }
    targetHP = char ? (char.heroPoints || 0) : 0;
    targetChar = char;
  } else if (typeof CampaignManager !== 'undefined') {
    const camp = CampaignManager.getActiveCampaign();
    const player = (camp?.acceptedPlayers || []).find(p => p.id === targetCharId || p.characterName === targetCharId);
    const npc = (camp?.npcs || []).find(n => n.id === targetCharId || n.name === targetCharId);
    const target = player || npc;
    targetHP = target ? (target.heroPoints !== undefined ? target.heroPoints : 1) : 0;
    if (target) targetChar = target.characterSheet || target.characterData || target;
  }

  if (targetHP <= 0) {
    if (typeof showToast === 'function') showToast("No Hero Points remaining to spend!", "warning");
    window.closeUseHeroPointModal();
    return;
  }

  const txtDetails = document.getElementById("txtHPDetails");
  const extraNotes = txtDetails && txtDetails.value.trim() ? ` (${txtDetails.value.trim()})` : '';
  const detailString = `${opt.name}${extraNotes}`;

  // Case 1: Roll-influencing option (+5 bonus)
  if (opt.isRollBonus) {
    if (typeof window.sessionSpendHeroPoint === 'function') {
      window.sessionSpendHeroPoint(targetCharId, detailString);
    }
    if (targetChar) {
      targetChar._pendingHPRollBonus = 5;
      targetChar._pendingHPOption = {
        optionId: opt.id,
        requiredType: opt.rollType, // 'skill' | 'power' | 'attack' | 'save' | 'ability' | 'initiative' | 'any'
        bonus: 5,
        label: opt.name.replace(/^[^\w]+/, '').trim(),
        targetCharId: targetCharId,
        detailString: detailString,
        spent: true
      };
    }

    window.closeUseHeroPointModal();

    // Switch to the applicable tab and scroll to the pertinent roll section!
    if (opt.tab) {
      const tabBtn = document.querySelector(`.tab-btn[data-tab="${opt.tab}"]`);
      if (tabBtn) tabBtn.click();
      if (typeof window.scrollToPertinentRollSection === 'function') {
        window.scrollToPertinentRollSection(opt.id, opt.tab);
      }
    }

    if (typeof showToast === 'function') {
      showToast(`🎯 Expended 1 Hero Point! +5 bonus applied to your next ${opt.rollType.toUpperCase()} check.`, "info");
    }
    if (typeof window.updateHeroPointsUseButtonState === 'function') {
      window.updateHeroPointsUseButtonState();
    }
    return;
  }

  // Case 2: Reroll previous roll
  if (opt.id === 'reroll') {
    const lastConfig = window.lastRollConfig;
    const canRerollRecent = isLocalTarget &&
      lastConfig && !lastConfig.isNat1 && !lastConfig.isNat20 && !lastConfig.isHPRerolled;

    if (canRerollRecent) {
      // Spend the Hero Point immediately for Reroll
      if (typeof window.sessionSpendHeroPoint === 'function') {
        window.sessionSpendHeroPoint(targetCharId, 'Hero Point spent for Reroll');
      }
      // Execute M&M 2E floor rule (p. 120)
      const rawD20 = Math.floor(Math.random() * 20) + 1;
      const wasFloored = rawD20 <= 10;
      const flooredD20 = wasFloored ? rawD20 + 10 : rawD20;
      const baseMod = (lastConfig.baseMod !== undefined) ? lastConfig.baseMod : ((lastConfig.mod || 0) - (lastConfig.hpBonus || 0));
      const priorHpBonus = lastConfig.hpBonus || 0;
      const newTotal = flooredD20 + baseMod + priorHpBonus;
      const originalTotal = lastConfig.total;
      const finalTotal = Math.max(originalTotal, newTotal);
      const keptOriginal = originalTotal > newTotal;

      lastConfig.isHPRerolled = true;
      lastConfig.rawD20 = rawD20;
      lastConfig.d20 = flooredD20;
      lastConfig.baseMod = baseMod;
      lastConfig.mod = baseMod + priorHpBonus;
      lastConfig.total = finalTotal;
      lastConfig.isNat1 = false;
      lastConfig.isNat20 = (!wasFloored && rawD20 === 20);

      const rerollDesc = wasFloored 
        ? `Rolled ${rawD20} (+10 floor = ${flooredD20})` 
        : `Rolled ${flooredD20}`;
      
      const outcomeDesc = keptOriginal
        ? `${rerollDesc} -> ${newTotal} (Original ${originalTotal} kept)`
        : `${rerollDesc} -> ${newTotal} (Kept)`;

      lastConfig.rerollInfo = outcomeDesc;
      lastConfig.hpAnnouncement = `HP Reroll: ${outcomeDesc}`;

      const cleanBaseTitle = (lastConfig.rollType || lastConfig.title || 'Check')
        .replace(/\s*\(\s*✨?\s*\+?\d*\s*HP\s*\)/gi, '')
        .replace(/\s*\(\s*✨?\s*HP\s*Reroll\s*\)/gi, '')
        .replace(/^🎲\s*/, '')
        .trim();
      lastConfig.rollType = `${cleanBaseTitle} (✨ HP Reroll)`;
      lastConfig.title = lastConfig.rollType;

      if (!lastConfig.detailsHtml) lastConfig.detailsHtml = "";
      lastConfig.detailsHtml += `
        <div style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed var(--border-color); color: #b45309; font-size: var(--font-size-secondary);">
          <strong>✨ HP Reroll:</strong> ${outcomeDesc}
        </div>
      `;

      window.closeUseHeroPointModal();
      window.showDiceRollModal(lastConfig);
      if (typeof showToast === 'function') {
        showToast(`✨ HP Reroll applied! Kept result is ${finalTotal}`, "info");
      }
      return;
    } else {
      // Queue reroll for next roll
      if (typeof window.sessionSpendHeroPoint === 'function') {
        window.sessionSpendHeroPoint(targetCharId, detailString);
      }
      if (targetChar) {
        targetChar._pendingHPReroll = true;
        targetChar._pendingHPOption = {
          optionId: 'reroll',
          requiredType: 'any',
          isReroll: true,
          label: 'Reroll (Min 11–20)',
          targetCharId: targetCharId,
          detailString: detailString,
          spent: true
        };
      }
      window.closeUseHeroPointModal();
      if (typeof showToast === 'function') {
        showToast("🎲 Expended 1 Hero Point! Reroll queued for your next roll! (Min 11–20)", "info");
      }
      if (typeof window.updateHeroPointsUseButtonState === 'function') {
        window.updateHeroPointsUseButtonState();
      }
      return;
    }
  }

  // Case 3: Immediate effect (Surge, Recovery, Dodge Bonus, Escape, Inspiration, etc.)
  if (typeof window.sessionSpendHeroPoint === 'function') {
    window.sessionSpendHeroPoint(targetCharId, detailString);
  }
  window.closeUseHeroPointModal();

  // Switch tab and scroll to pertinent section if applicable
  if (opt.tab) {
    const tabBtn = document.querySelector(`.tab-btn[data-tab="${opt.tab}"]`);
    if (tabBtn) tabBtn.click();
    if (typeof window.scrollToPertinentRollSection === 'function') {
      window.scrollToPertinentRollSection(opt.id, opt.tab);
    }
  }

  if (typeof window.updateHeroPointsUseButtonState === 'function') {
    window.updateHeroPointsUseButtonState();
  }
};

function setupHeroPointsSystem() {
  const hpInput = document.getElementById("heroPointsInput");
  if (hpInput) {
    hpInput.addEventListener("input", (e) => {
      char.heroPoints = Math.max(0, parseInt(e.target.value) || 0);
      refreshUI();
    });
  }

  const btnLock = document.getElementById("btnLockHeroPoints");
  if (btnLock) {
    btnLock.onclick = (e) => {
      e.preventDefault();
      window.toggleHeroPointsLock();
    };
  }

  const btnUse = document.getElementById("btnUseHeroPoint");
  if (btnUse) {
    btnUse.onclick = (e) => {
      e.preventDefault();
      window.openUseHeroPointModal('local_hero');
    };
  }

  const selCategory = document.getElementById("selHPCategory");
  if (selCategory) {
    selCategory.onchange = () => window.populateHeroPointOptions();
  }

  const selOption = document.getElementById("selHPOption");
  if (selOption) {
    selOption.onchange = () => window.updateHeroPointDescription();
  }

  const txtSearch = document.getElementById("txtHPSearch");
  if (txtSearch) {
    txtSearch.addEventListener("input", () => {
      if (typeof window.filterHeroPointOptions === 'function') {
        window.filterHeroPointOptions();
      }
    });
  }

  const selCategoryFilter = document.getElementById("selHPCategoryFilter");
  if (selCategoryFilter) {
    selCategoryFilter.addEventListener("change", () => {
      if (typeof window.filterHeroPointOptions === 'function') {
        window.filterHeroPointOptions();
      }
    });
  }

  const btnConfirm = document.getElementById("btnConfirmUseHP");
  if (btnConfirm) {
    btnConfirm.onclick = (e) => {
      e.preventDefault();
      window.confirmUseHeroPoint();
    };
  }

  const btnCancel = document.getElementById("btnCancelUseHP");
  if (btnCancel) {
    btnCancel.onclick = (e) => {
      e.preventDefault();
      window.closeUseHeroPointModal();
    };
  }

  const btnClose = document.getElementById("btnCloseUseHeroPointModal");
  if (btnClose) {
    btnClose.onclick = (e) => {
      e.preventDefault();
      window.closeUseHeroPointModal();
    };
  }

  window.updateHeroPointsLockUI();
  window.updateHeroPointsUseButtonState();
}

function setupDefenseSteppers() {
  document.getElementById("inputReflex").addEventListener("input", (e) => {
    char.purchasedResistances.Reflex = parseInt(e.target.value) || 0;
    refreshUI();
  });
  document.getElementById("inputFort").addEventListener("input", (e) => {
    char.purchasedResistances.Fortitude = parseInt(e.target.value) || 0;
    refreshUI();
  });
  document.getElementById("inputWill").addEventListener("input", (e) => {
    char.purchasedResistances.Will = parseInt(e.target.value) || 0;
    refreshUI();
  });
}

function getSkillMetadata(skillName) {
  if (!skillName) return { baseName: "", ability: "INT", untrained: false, relatedFeats: [], fullText: "" };
  const baseName = skillName.includes(" (") ? skillName.split(" (")[0].trim() : skillName.trim();
  const found = typeof SKILLS_LIST !== 'undefined' ? SKILLS_LIST.find(s => s.name.toLowerCase() === baseName.toLowerCase()) : null;
  if (found) {
    return {
      baseName: found.name,
      ability: found.ability,
      untrained: found.untrained,
      relatedFeats: found.relatedFeats || [],
      fullText: found.fullText || ""
    };
  }
  let ability = "INT";
  if (/^(acrobatics|drive|escape artist|pilot|ride|sleight of hand|stealth)$/i.test(baseName)) ability = "DEX";
  else if (/^(bluff|diplomacy|disguise|gather information|handle animal|intimidate|perform)$/i.test(baseName)) ability = "CHA";
  else if (/^(climb|swim)$/i.test(baseName)) ability = "STR";
  else if (/^(concentration|medicine|notice|profession|sense motive|survival)$/i.test(baseName)) ability = "WIS";
  else if (/^(language)$/i.test(baseName)) ability = "None";
  return { baseName, ability, untrained: false, relatedFeats: [], fullText: "" };
}

function buildSkillsUI() {
  const tbody = document.querySelector("#skillsTable tbody");
  if (!tbody) return;

  const purchasedSkills = char.skills || {};
  const enhancedSkills = (char.enhancedTraits && char.enhancedTraits.skills) || {};
  const allSkillKeys = new Set();

  Object.keys(purchasedSkills).forEach(k => {
    if ((purchasedSkills[k] || 0) > 0) allSkillKeys.add(k);
  });
  Object.keys(enhancedSkills).forEach(k => {
    if ((enhancedSkills[k] || 0) > 0) allSkillKeys.add(k);
  });

  let activeList = Array.from(allSkillKeys).map(name => {
    const meta = getSkillMetadata(name);
    return {
      name,
      baseName: meta.baseName,
      ability: meta.ability,
      untrained: meta.untrained,
      relatedFeats: meta.relatedFeats
    };
  });

  activeList.sort((a, b) => {
    let valA = a[skillSort.col] || a.name;
    let valB = b[skillSort.col] || b.name;
    if (typeof valA === "boolean") { valA = valA ? 1 : 0; valB = valB ? 1 : 0; }
    if (valA < valB) return skillSort.asc ? -1 : 1;
    if (valA > valB) return skillSort.asc ? 1 : -1;
    return 0;
  });

  if (activeList.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 24px; color: var(--text-muted);">
          No skills added yet. Click <button type="button" class="btn btn-sm" onclick="window.openAddSkillModal()" style="margin: 0 4px; padding: 2px 8px;">+ Add Skill</button> to add skills or specializations.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = activeList.map(item => {
    const idSafe = item.name.replace(/[^a-zA-Z0-9]/g, "_");
    const val = char.skills[item.name] || 0;
    const enhSkill = enhancedSkills[item.name] || 0;
    const isEnhancedOnly = val === 0 && enhSkill > 0;
    const skillNameStyle = val > 0 ? 'color: #b45309;' : '';

    let featsArray = item.relatedFeats ? [...item.relatedFeats] : [];
    
    // Skill Mastery check
    const smRanks = char.feats["Skill Mastery"] || 0;
    if (smRanks > 0) {
      try {
        const mastered = JSON.parse(char.featDetails["Skill Mastery"] || "[]");
        if ((mastered.includes(item.name) || mastered.includes(item.baseName)) && !featsArray.includes("Skill Mastery")) {
          featsArray.push("Skill Mastery");
        }
      } catch(e) {}
    }

    if (item.name === "Sense Motive" && !featsArray.includes("Favored Opponent")) {
      featsArray.push("Favored Opponent");
    }

    let advTagsHtml = "";
    const effFeats = char.effectiveFeats || char.feats;
    const tagsList = [];
    if (enhSkill > 0) {
      tagsList.push(`<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;" title="Enhanced Trait">+${enhSkill} Enhanced</span>`);
    }
    if (featsArray.length > 0) {
      const activeFeats = featsArray.filter(advName => (effFeats[advName] || 0) > 0);
      activeFeats.forEach(advName => {
        const advRanks = effFeats[advName] || 0;
        const rankText = advRanks > 0 ? ` (${advRanks})` : "";
        tagsList.push(`
          <span class="skill-adv-tag active-adv-tag" style="cursor: pointer;" onclick="window.showAdvantageInfo('${advName}')" title="View description">
            ${advName}${rankText}
          </span>
        `);
      });
    }
    if (tagsList.length > 0) {
      advTagsHtml = tagsList.join(" ");
    } else {
      advTagsHtml = `<span class="secondary-text">—</span>`;
    }

    const removeBtnHtml = isEnhancedOnly 
      ? `<button type="button" class="btn btn-sm btn-secondary" style="padding: 2px 6px; opacity: 0.5; cursor: not-allowed;" title="Granted by active power or alternate form" disabled>✕</button>`
      : `<button type="button" class="btn btn-sm" style="padding: 2px 6px; color: #ef4444; border-color: rgba(239, 68, 68, 0.4);" onclick="window.removeSkill('${item.name.replace(/'/g, "\\'")}')" title="Remove this skill">✕</button>`;

    return `
      <tr>
        <td>
          <div style="display: inline-flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            <button type="button" class="row-title-btn" onclick="window.rollSkillCheck('${item.name.replace(/'/g, "\\'")}')" style="${skillNameStyle}; font-weight: bold; cursor: pointer; padding: 2px 6px;" title="Roll 1d20 + Skill Bonus">
              <span>🎲</span>
              <span>${item.name}</span>
            </button>
            <button type="button" class="btn-info-circle" onclick="window.showSkillInfo('${item.name.replace(/'/g, "\\'")}')" title="View Skill Rules">?</button>
          </div>
        </td>
        <td>${item.ability}</td>
        <td>${item.untrained ? `<span style="color:#10b981; font-weight:600;">Yes</span>` : `<span style="color:#b45309; font-weight:600;">Trained Only</span>`}</td>
        <td id="skill_base_${idSafe}">0</td>
        <td>
          <div class="stepper-group">
            <button type="button" class="stepper-btn stepper-dec" onclick="stepVal('skill_input_${idSafe}', -1, 0, 20)">−</button>
            <input type="number" id="skill_input_${idSafe}" class="stepper-input" min="0" max="20" value="${val}" data-skill="${item.name}">
            <button type="button" class="stepper-btn stepper-inc" onclick="stepVal('skill_input_${idSafe}', 1, 0, 20)">+</button>
          </div>
        </td>
        <td id="skill_total_${idSafe}"><strong>+0</strong></td>
        <td>${advTagsHtml}</td>
        <td style="text-align: center; white-space: nowrap;">
          ${removeBtnHtml}
        </td>
      </tr>
    `;
  }).join("");

  tbody.querySelectorAll("input.stepper-input").forEach(input => {
    input.addEventListener("input", (e) => {
      const sk = e.target.dataset.skill;
      const newV = parseInt(e.target.value) || 0;
      if (newV <= 0 && (!enhancedSkills[sk] || enhancedSkills[sk] <= 0)) {
        delete char.skills[sk];
        buildSkillsUI();
      } else {
        char.skills[sk] = newV;
      }
      refreshUI();
    });
  });
}

window.removeSkill = function(skillName) {
  if (confirm(`Remove "${skillName}" from your character sheet?`)) {
    if (char.removeSkill) {
      char.removeSkill(skillName);
    } else {
      delete char.skills[skillName];
      if (char.skillDetails) delete char.skillDetails[skillName];
    }
    buildSkillsUI();
    refreshUI();
    showToast(`Removed skill "${skillName}"`, "info");
  }
};

const FEAT_SUBOPTIONS_MAP = {
  // === GENERAL, COMBAT & SKILL FEAT SUB-OPTIONS ===
  "Uncanny Dodge": [
    { value: "Auditory (Hearing)" },
    { value: "Visual (Sight)" },
    { value: "Olfactory (Scent / Smell)" },
    { value: "Tactile (Touch / Vibration)" },
    { value: "Mental (Psionic / Mind Sense)" },
    { value: "Radio (Radar / Radio Waves)" },
    { value: "Spatial / Temporal Sense" }
  ],
  "Second Chance": [
    { value: "Falling Damage (Toughness save)" },
    { value: "Tripped / Knockdown checks" },
    { value: "Triggering Traps / Reflex save" },
    { value: "Mind Control & Mental Attacks (Will save)" },
    { value: "Fire & Heat Damage (Toughness save)" },
    { value: "Poison & Toxin Hazards (Fortitude save)" },
    { value: "Suffocation & Drowning Hazards" },
    { value: "Disarm Combat Maneuvers" },
    { value: "Feints & Bluff Tricks (Sense Motive check)" },
    { value: "Massive Damage Save Checks" }
  ],
  "Challenge": [
    { value: "Improved Demoralize (Intimidate as Move action)" },
    { value: "Improved Distract (Distract as Move action)" },
    { value: "Improved Feint (Feint as Move action)" },
    { value: "Improved Taunt (Taunt as Move action)" },
    { value: "Mass Intimidation (-2 check per target beyond 1st)" },
    { value: "Accelerated Stealth (Full-speed Stealth at -5)" },
    { value: "Combat Clarity (Oppose Feint as Free action)" },
    { value: "Perfect Balance (Balance as Free action)" }
  ],
  "Favored Conditions": [
    { value: "When Outnumbered (2+ opponents)" },
    { value: "When Cornered / Back to Wall" },
    { value: "In Darkness / Poor Visibility" },
    { value: "Underwater / Aquatic Combat" },
    { value: "When at Staggered or Disabled Injury" },
    { value: "In Tight Spaces / Close Quarters" },
    { value: "While Defending Allies / Innocents" }
  ],
  "Interface": [
    { value: "Computers (Hacking & Systems)" },
    { value: "Drive (Ground Vehicles)" },
    { value: "Pilot (Air & Spacecraft)" },
    { value: "Disable Device (Mechanisms & Locks)" },
    { value: "Craft: Electronic" },
    { value: "Craft: Mechanical" }
  ],
  "Fascinate": [
    { value: "Bluff (Captivate with deception / stories)" },
    { value: "Diplomacy (Captivate with charm / rhetoric)" },
    { value: "Intimidate (Captivate with awe / terror)" },
    { value: "Perform (Captivate with musical / stage performance)" }
  ],
  "Distract": [
    { value: "Bluff (Trick / feint distraction)" },
    { value: "Intimidate (Frighten / freeze distraction)" }
  ],

  // === MECHA & ROBOTIC SUB-OPTIONS ===
  "Electromagnetic Seal": [
    { value: "Base Seal (Radiation & Cosmic Rays)" },
    { value: "Insubstantial: Rank 1 (Gaseous / Vaporous)" },
    { value: "Insubstantial: Rank 2 (Liquid Forms)" },
    { value: "Insubstantial: Rank 3 (Energy & Plasma Forms)" },
    { value: "Insubstantial: Rank 4 (Incorporeal / Spirits)" },
    { value: "Perception: Visual Dazzle / Blinding Flashes" },
    { value: "Perception: Auditory Dazzle / Sonic Deafening" },
    { value: "Perception: Mental Attacks / Psionic Blast" },
    { value: "Perception: Sensory Overload" }
  ],
  "Environmental Seal": [
    { value: "Vacuum & Deep Space" },
    { value: "Oceanic Depths (High Pressure Aquatic)" },
    { value: "Corrosive Acid & Chemical Gas" },
    { value: "Toxic / Biological Alien Atmosphere" },
    { value: "Volcanic / Superheated Plasma" },
    { value: "Cryogenic / Sub-Zero Extreme" }
  ],
  "Ejector Seat": [
    { value: "Leaping 5 Launch Distance" },
    { value: "Parachute / Glider Thruster Flight Pack" },
    { value: "Survival Pod Environmental Seal" },
    { value: "Cockpit Capsule Electromagnetic Seal" },
    { value: "Extended Booster Rocket (+1 Rank Leaping)" }
  ],
  "Equipment Mount": [
    { value: "Right Shoulder Hardpoint" },
    { value: "Left Shoulder Hardpoint" },
    { value: "Dorsal / Backpack Rack" },
    { value: "Right Forearm Pylon" },
    { value: "Left Forearm Pylon" },
    { value: "Wing / Aerodynamic Pylon" },
    { value: "Hip / Waist Holster" },
    { value: "Chest / Torso Heavy Mount" }
  ],
  "All-Terrain": [
    { value: "Snow & Ice (Arctic / Glacial)" },
    { value: "Mountain & Steep Scree (Cliffs / Rock)" },
    { value: "Swamp & Marsh (Mud / Wetlands)" },
    { value: "Desert & Sand Dunes (Loose Sand)" },
    { value: "Urban Rubble & Collapsed Structures" },
    { value: "Dense Jungle & Forest Undergrowth" },
    { value: "Subterranean Caves & Loose Gravel" }
  ],
  "Countermeasures": [
    { value: "Thermal Flares (Heat-Seeking / Infrared)" },
    { value: "Chaff Dispensers (Radar / Radio Guided)" },
    { value: "Aerosol & Smoke Screen (Laser / Optical)" },
    { value: "Acoustic Decoy Pings (Sonar / Sonic)" },
    { value: "EMP / Static Pulse (Magnetic / Electronic)" }
  ],
  "Jamming": [
    { value: "Radar & Radio Frequency (Electronic Warfare)" },
    { value: "Infrared & Thermal Scanners (Thermal Cloaking)" },
    { value: "Optical & Visual Cameras (Holographic Distortion)" },
    { value: "Acoustic & Sonar (Noise Scrambler)" },
    { value: "Full Spectrum / Multi-Band Jamming" }
  ],
  "Reactive Armor": [
    { value: "Ballistic & Kinetic Projectiles (Explosive Reactive Tiles)" },
    { value: "Laser & Beam Weaponry (Reflective Ablative Tiles)" },
    { value: "Plasma & Thermal Heat (Thermal Dissipation Tiles)" },
    { value: "Concussive & Shockwave (Blast Venting Armor)" }
  ],
  "Improved Plating": [
    { value: "Critical Hits (2 ranks)" },
    { value: "Fire & Heat Damage (5 ranks)" },
    { value: "Cold & Freezing Damage (5 ranks)" },
    { value: "Electricity & Shock Damage (5 ranks)" },
    { value: "Radiation & Cosmic Rays (5 ranks)" },
    { value: "Corrosive Acid Damage (5 ranks)" },
    { value: "Magnetic & EMP Attacks (5 ranks)" }
  ],
  "Channel (Trait)": [
    { value: "Power Attack (Feat)" },
    { value: "All-Out Attack (Feat)" },
    { value: "Elusive Target (Feat)" },
    { value: "Fascinate (Feat)" },
    { value: "Takedown Attack (Feat)" },
    { value: "Blast (Power - Energy blast via chassis)" },
    { value: "Strike (Power - Melee channel)" },
    { value: "Force Field (Power - Protective aura)" },
    { value: "Teleport (Power - Tactical phase)" }
  ],
  "Target Tracking Interface": [
    { value: "Primary Ranged Cannon / Heavy Rifle" },
    { value: "Secondary Beam Guns / Head Vulcans" },
    { value: "Melee Saber / Blade Weapon" },
    { value: "Missile Pod / Micro-Rockets" },
    { value: "Heavy Siege Artillery" }
  ],
  "Profile Entry": [
    { value: "Enemy Mass-Production Grunt Mecha" },
    { value: "Enemy Elite Commander Mecha" },
    { value: "Kaiju & Giant Bio-Monsters" },
    { value: "Alien Starfighters & Drones" },
    { value: "Heavy Armored Ground Tanks" },
    { value: "Submersible Naval Warships" }
  ],
  "Environmental Optimization": [
    { value: "Space & Orbital Vacuum (Zero-G)" },
    { value: "Urban Megacity & Industrial Ruins" },
    { value: "Aerial & High Altitude Skies" },
    { value: "Desert Dunes & Arid Wasteland" },
    { value: "Deep Ocean & Submersible Aquatic" },
    { value: "Subterranean Caverns & Tunnels" },
    { value: "Arctic Tundra & Glacial Permafrost" }
  ],
  "Improved System Processor": [
    { value: "Piloting & High-Speed Maneuvers (Pilot checks)" },
    { value: "Countermeasures & Defense (Block checks)" },
    { value: "Decoy Projection Module (Redirect checks)" },
    { value: "Datalink & Electronic Warfare (Computers checks)" },
    { value: "Sensor Arrays & Telemetry (Search/Notice checks)" }
  ],
  "Mechamorph": [
    { value: "High-Speed Aero-Fighter Mode (Jet / Spacecraft)" },
    { value: "Heavy Ground Vehicle Mode (Tank / Cruiser)" },
    { value: "Cyber-Beast / Animal Form" },
    { value: "Submersible Naval Mode (Submarine)" },
    { value: "Mobile Artillery Fortress (Siege Emplacement)" },
    { value: "Gerwalk / Hybrid Semi-Walker Mode" }
  ],
  "Composite (Gestalt)": [
    { value: "Core Torso / Command Module" },
    { value: "Right Arm / Primary Weapon Assembly" },
    { value: "Left Arm / Shield Assembly" },
    { value: "Right Leg / Main Thruster Assembly" },
    { value: "Left Leg / Stabilizer Assembly" },
    { value: "Heavy Wings / Booster Pack Assembly" }
  ],
  "Support Units": [
    { value: "Remote Attack Bits / Funnels (Beam Turrets)" },
    { value: "Scout & Recon Sensor Probes" },
    { value: "Defensive Barrier Escort Pods" },
    { value: "In-Flight Maintenance & Repair Drones" },
    { value: "Decoy Automaton Drones" }
  ],
  "Base Sensors": [
    { value: "Long-Range Radar Array (Radio Sense)" },
    { value: "Thermal Infrared Imaging (Thermal Vision)" },
    { value: "Low-Light & Night Vision Visor" },
    { value: "Ladar / Laser Rangefinder" },
    { value: "Lifeform / Bioscan Telemetry" },
    { value: "Quantum / Subspace Telemetry Scanner" }
  ],
  "Base Comms": [
    { value: "Tactical Military Radio Transceiver" },
    { value: "Laser Burst / Directional Tightbeam" },
    { value: "Satellite Uplink / Microwave Relay" },
    { value: "Sub-Space / Quantum Entanglement Link" }
  ],
  "Top Gun": [
    { value: "Avoid Collision & Shake Lock" },
    { value: "High Speed Turn & Bootleg Reverse" },
    { value: "Drop Prone (Duck) & Quick Stand" },
    { value: "Jink & Barrel Roll" }
  ],
  "Quick Transformation": [
    { value: "Mechamorph (Alternate Form)" },
    { value: "Composite / Gestalt (Docking / Combining)" },
    { value: "Special Movement Modes (Flight / Treads / Thrusters)" }
  ],
  "Cloak System": [
    { value: "Visual Concealment (Active Camouflage)" },
    { value: "Radar & Radio Concealment (Stealth Coating)" },
    { value: "Thermal & Infrared Concealment (Cold Baffles)" },
    { value: "Full Spectrum Cloak (Visual, Radar, Thermal)" }
  ],
  "Neural/Spirit Interface": [
    { value: "Acrobatics (Substitute for Pilot checks)" },
    { value: "Leaping (Channel physical jump power)" },
    { value: "Speed (Channel physical sprint speed)" },
    { value: "Flight (Channel physical flight power)" }
  ],
  "Multipede": [
    { value: "Quadruped (4 Legs - Heavy Stability)" },
    { value: "Hexapod (6 Legs - All-Direction Walking)" },
    { value: "Octopod (8 Legs - Spider Mecha Chassis)" }
  ],
  "Extra Seat": [
    { value: "Co-Pilot / Navigator Station" },
    { value: "Gunner / Fire Control Station" },
    { value: "Sensor / Electronic Warfare Officer Station" },
    { value: "Passenger Cabin / Jump Seat" }
  ],
  "Mecha Attunement": [
    { value: "Personal Defensive Power (Shield / Armor)" },
    { value: "Touch-Range Melee Attack Power" },
    { value: "Perception-Range Sensor Power" },
    { value: "Movement Power (Flight / Teleport)" }
  ]
};

window.FEAT_SUBOPTIONS_MAP = FEAT_SUBOPTIONS_MAP;
const MECHA_SUBOPTIONS_MAP = FEAT_SUBOPTIONS_MAP;
window.MECHA_SUBOPTIONS_MAP = FEAT_SUBOPTIONS_MAP;

/* ==========================================================================
   (ATTACK) FLURRY ENGINE & OPTIONS
   ========================================================================== */

window.FLURRY_BASE_MELEE_FORMS = [
  "Unarmed Combat",
  "Swords / Blades",
  "Knives / Daggers",
  "Staff / Polearm",
  "Claws / Natural Weapons",
  "Blunt / Clubs / Hammers"
];

// Discovers all configured melee damage powers (aka Strike) on a character
window.getCharacterMeleeDamagePowers = function(character) {
  const c = character || (typeof char !== 'undefined' ? char : null);
  if (!c) return [];
  const powers = c.activePowers || c.powers || [];
  const strikePowers = [];

  const checkAndAdd = (eff, parentPowerName) => {
    if (!eff) return;
    const effName = (eff.effectName || "").trim();
    const profile = (eff.profileName || "").trim();
    const effRawName = (eff.name || "").trim();
    const range = (eff.range || "").toLowerCase();

    // Is it a melee damage power (aka Strike)?
    const isExplicitStrike = effName.toLowerCase() === "strike" || profile.toLowerCase() === "strike";
    const isMeleeDamage = (effName.toLowerCase() === "damage" || eff.isAttack) && (range === "touch" || range === "melee" || range === "personal" || (!range && range !== "ranged" && range !== "perception"));
    const isNamedStrike = effRawName.toLowerCase().startsWith("strike") && range !== "ranged" && range !== "perception";

    if (isExplicitStrike || isMeleeDamage || isNamedStrike) {
      let displayName = effRawName;
      if (!displayName || displayName === "New Effect" || displayName === "Damage") {
        displayName = parentPowerName || effName || profile || "Strike";
      }
      const label = displayName.toLowerCase().startsWith("strike") ? displayName : `Strike: ${displayName}`;
      if (!strikePowers.includes(label)) {
        strikePowers.push(label);
      }
    }

    if (eff.containedPowers && Array.isArray(eff.containedPowers)) {
      eff.containedPowers.forEach(cp => {
        checkAndAdd(cp, effRawName || parentPowerName);
      });
    }
  };

  powers.forEach(p => {
    const parentName = (p.name && p.name !== "New Power Container") ? p.name : "";
    if (Array.isArray(p.effects)) {
      p.effects.forEach(eff => checkAndAdd(eff, parentName));
    } else {
      checkAndAdd(p, parentName);
    }
  });

  return strikePowers;
};

// Discovers all configured ranged damage powers (aka Blast) on a character
window.getCharacterRangedDamagePowers = function(character) {
  const c = character || (typeof char !== 'undefined' ? char : null);
  if (!c) return [];
  const powers = c.activePowers || c.powers || [];
  const blastPowers = [];

  const checkAndAdd = (eff, parentPowerName) => {
    if (!eff) return;
    const effName = (eff.effectName || "").trim();
    const profile = (eff.profileName || "").trim();
    const effRawName = (eff.name || "").trim();
    const range = (eff.range || "").toLowerCase();

    const isExplicitBlast = effName.toLowerCase() === "blast" || profile.toLowerCase() === "blast";
    const isRangedDamage = (effName.toLowerCase() === "damage" || eff.isAttack) && range === "ranged";
    const isNamedBlast = effRawName.toLowerCase().startsWith("blast");

    if (isExplicitBlast || isRangedDamage || isNamedBlast) {
      let displayName = effRawName;
      if (!displayName || displayName === "New Effect" || displayName === "Damage") {
        displayName = parentPowerName || effName || profile || "Blast";
      }
      const label = displayName.toLowerCase().startsWith("blast") ? displayName : `Blast: ${displayName}`;
      if (!blastPowers.includes(label)) {
        blastPowers.push(label);
      }
    }

    if (eff.containedPowers && Array.isArray(eff.containedPowers)) {
      eff.containedPowers.forEach(cp => {
        checkAndAdd(cp, effRawName || parentPowerName);
      });
    }
  };

  powers.forEach(p => {
    const parentName = (p.name && p.name !== "New Power Container") ? p.name : "";
    if (Array.isArray(p.effects)) {
      p.effects.forEach(eff => checkAndAdd(eff, parentName));
    } else {
      checkAndAdd(p, parentName);
    }
  });

  return blastPowers;
};

// Returns available Flurry forms filtered by character powers and assigned slots across all Flurry instances
window.getAvailableFlurryForms = function(character, currentFeatKey, currentSlotIdx, currentSlotValue) {
  const c = character || (typeof char !== 'undefined' ? char : null);
  const baseForms = [...window.FLURRY_BASE_MELEE_FORMS];
  const strikePowers = c ? window.getCharacterMeleeDamagePowers(c) : [];
  const allCandidateForms = [...baseForms, ...strikePowers];

  const assignedForms = new Set();
  if (c && c.feats) {
    Object.keys(c.feats).forEach(fKey => {
      const baseKey = fKey.includes(" (") ? fKey.split(" (")[0].trim() : fKey.trim();
      if (baseKey === "(Attack) Flurry") {
        const raw = c.featDetails ? c.featDetails[fKey] : null;
        const rank = c.feats[fKey] || 1;
        const stats = window.calculateFlurryStats(rank, raw);
        const slots = [stats.primaryForm, ...stats.upgrades];
        slots.forEach((sVal, sIdx) => {
          if (fKey === currentFeatKey && sIdx === currentSlotIdx) return;
          if (!sVal) return;
          let formName = sVal.trim();
          if (formName.startsWith("Additional Form:") || formName.startsWith("Melee Form:")) {
            formName = formName.replace(/^(Additional Form:|Melee Form:)\s*/, "").trim();
          }
          if (!formName.startsWith("Reduce Interval") && !formName.startsWith("Increase Max Bonus") && !formName.startsWith("Custom Melee")) {
            assignedForms.add(formName.toLowerCase());
          }
        });
      }
    });
  }

  const curLower = currentSlotValue ? currentSlotValue.toLowerCase().replace(/^(additional form:|melee form:)\s*/, "").trim() : "";
  const result = allCandidateForms.filter(f => {
    const fLower = f.toLowerCase();
    if (curLower && fLower === curLower) return true;
    return !assignedForms.has(fLower);
  });

  // Preserve legacy or custom value if already configured on this slot
  if (currentSlotValue && !result.includes(currentSlotValue)) {
    const cleanCur = currentSlotValue.replace(/^(Additional Form:|Melee Form:)\s*/, "").trim();
    if (!cleanCur.startsWith("Reduce Interval") && !cleanCur.startsWith("Increase Max Bonus") && !cleanCur.startsWith("Custom Melee")) {
      result.push(cleanCur);
    }
  }

  return result;
};

window.calculateFlurryStats = function(rank, rawDetails, character, featKey) {
  const r = Math.max(1, parseInt(rank) || 1);
  let primaryForm = "Unarmed Combat";
  let rawUpgrades = [];

  if (Array.isArray(rawDetails)) {
    primaryForm = rawDetails[0] || "Unarmed Combat";
    rawUpgrades = rawDetails.slice(1);
  } else if (typeof rawDetails === 'string' && rawDetails.trim()) {
    if (rawDetails.startsWith("[") && rawDetails.endsWith("]")) {
      try {
        const parsed = JSON.parse(rawDetails);
        if (Array.isArray(parsed)) {
          primaryForm = parsed[0] || "Unarmed Combat";
          rawUpgrades = parsed.slice(1);
        }
      } catch (e) {
        primaryForm = rawDetails.trim();
      }
    } else if (rawDetails.includes("; ")) {
      const parts = rawDetails.split("; ").map(s => s.trim());
      primaryForm = parts[0] || "Unarmed Combat";
      rawUpgrades = parts.slice(1);
    } else {
      primaryForm = rawDetails.trim();
    }
  }

  let interval = 5;
  let maxBonus = 5;
  const forms = [primaryForm];
  let intervalReductions = 0;
  let capIncreases = 0;

  const neededUpgrades = Math.max(0, r - 1);
  const upgrades = [];

  for (let i = 0; i < neededUpgrades; i++) {
    let up = rawUpgrades[i];
    if (!up) {
      if (interval > 2) {
        up = `Reduce Interval by 1 (Interval ${interval - 1})`;
      } else if (maxBonus < 10) {
        up = "Increase Max Bonus to +10";
      } else {
        const availForms = (typeof window.getAvailableFlurryForms === 'function')
          ? window.getAvailableFlurryForms(character, featKey || "(Attack) Flurry", i + 1)
          : window.FLURRY_BASE_MELEE_FORMS;
        const unusedForm = availForms.find(f => !forms.some(assigned => assigned.toLowerCase() === f.toLowerCase()) && f !== primaryForm);
        up = unusedForm ? `Additional Form: ${unusedForm}` : "Reduce Interval by 1 (Interval 2)";
      }
    }

    if (up.startsWith("Reduce Interval") || up.includes("Interval")) {
      if (interval > 2) {
        interval = Math.max(2, interval - 1);
        intervalReductions++;
      }
    } else if (up.startsWith("Increase Max Bonus") || up.includes("+10")) {
      maxBonus = 10;
      capIncreases++;
    } else if (up.startsWith("Additional Form:") || up.startsWith("Melee Form:")) {
      const fName = up.replace(/^(Additional Form:|Melee Form:)\s*/, "").trim();
      if (fName && !forms.includes(fName)) {
        forms.push(fName);
      }
    } else if (up.trim()) {
      if (!forms.includes(up.trim())) {
        forms.push(up.trim());
      }
    }
    upgrades.push(up);
  }

  return {
    rank: r,
    primaryForm,
    upgrades,
    interval,
    maxBonus,
    forms,
    intervalReductions,
    capIncreases
  };
};

window.getFlurryUpgradeChoicesForSlot = function(stats, slotIdx, character, featKey) {
  let simInterval = 5;
  let simMaxBonus = 5;

  for (let i = 0; i < slotIdx; i++) {
    const prevUp = stats.upgrades[i] || "";
    if (prevUp.startsWith("Reduce Interval") || prevUp.includes("Interval")) {
      simInterval = Math.max(2, simInterval - 1);
    } else if (prevUp.startsWith("Increase Max Bonus") || prevUp.includes("+10")) {
      simMaxBonus = 10;
    }
  }

  const choices = [];
  if (simInterval > 2) {
    choices.push(`Reduce Interval by 1 (Interval ${simInterval - 1})`);
  }
  if (simMaxBonus < 10) {
    choices.push("Increase Max Bonus to +10");
  }

  const currentChoice = stats.upgrades[slotIdx] || "";
  const availForms = (typeof window.getAvailableFlurryForms === 'function')
    ? window.getAvailableFlurryForms(character, featKey || "(Attack) Flurry", slotIdx + 1, currentChoice)
    : window.FLURRY_BASE_MELEE_FORMS;

  availForms.forEach(f => {
    choices.push(`Additional Form: ${f}`);
  });
  choices.push("Additional Form: Custom Melee Attack...");
  return choices;
};

window.updateFlurrySlot = function(featKey, slotIdx, newChoice) {
  if (!char || !char.feats) return;
  const rank = char.feats[featKey] || 1;
  const stats = window.calculateFlurryStats(rank, char.featDetails ? char.featDetails[featKey] : null);

  let chosenVal = newChoice;
  if (newChoice === "Additional Form: Custom Melee Attack..." || newChoice === "Custom Melee Form...") {
    const custom = prompt("Enter melee attack name or power for Flurry:", "Claws / Strike");
    if (custom && custom.trim()) {
      chosenVal = slotIdx === 0 ? custom.trim() : `Additional Form: ${custom.trim()}`;
    } else {
      buildAdvantagesUI();
      return;
    }
  }

  const fullSlots = [stats.primaryForm, ...stats.upgrades];
  while (fullSlots.length < rank) {
    fullSlots.push("Reduce Interval by 1 (Interval 4)");
  }
  fullSlots[slotIdx] = chosenVal;

  if (!char.featDetails) char.featDetails = {};
  char.featDetails[featKey] = fullSlots;

  buildAdvantagesUI();
  buildSkillsUI();
  refreshUI();
  showToast(`Updated Flurry configuration`, "info");
};

/* ==========================================================================
   FEAT SUB-OPTIONS LIST & SLOTS HELPERS
   ========================================================================== */

window.getFeatSubOptionsList = function(featKey, expectedRank) {
  if (!char) return [];
  const baseKey = featKey.includes(" (") ? featKey.split(" (")[0].trim() : featKey.trim();
  const raw = char.featDetails ? char.featDetails[featKey] : null;
  let arr = [];
  if (Array.isArray(raw)) {
    arr = [...raw];
  } else if (typeof raw === 'string' && raw.trim()) {
    if (raw.startsWith("[") && raw.endsWith("]")) {
      try { arr = JSON.parse(raw); } catch(e) { arr = [raw]; }
    } else if (raw.includes("; ")) {
      arr = raw.split("; ").map(s => s.trim());
    } else if (raw.includes(" | ")) {
      arr = raw.split(" | ").map(s => s.trim());
    } else {
      arr = [raw.trim()];
    }
  } else if (featKey.includes(" (") && featKey.endsWith(")")) {
    const inside = featKey.substring(featKey.indexOf("(") + 1, featKey.lastIndexOf(")"));
    if (inside.includes("; ")) {
      arr = inside.split("; ").map(s => s.trim());
    } else if (inside.includes(", ")) {
      arr = inside.split(", ").map(s => s.trim());
    } else {
      arr = [inside.trim()];
    }
  }

  const r = parseInt(expectedRank) || (char.feats ? (char.feats[featKey] || 1) : 1);
  let neededSlots = 1;
  if (baseKey === "Electromagnetic Seal" || baseKey === "Ejector Seat") {
    neededSlots = Math.max(0, r - 1);
  } else if (baseKey === "Environmental Seal") {
    neededSlots = 1;
  } else if (typeof FEAT_SUBOPTIONS_MAP !== 'undefined' && FEAT_SUBOPTIONS_MAP[baseKey]) {
    neededSlots = Math.max(1, r);
  }

  let mapOpts = (typeof FEAT_SUBOPTIONS_MAP !== 'undefined' && FEAT_SUBOPTIONS_MAP[baseKey]) ? FEAT_SUBOPTIONS_MAP[baseKey] : [];
  if (baseKey === "Electromagnetic Seal") {
    mapOpts = mapOpts.filter(o => !o.value.startsWith("Base Seal"));
  } else if (baseKey === "Ejector Seat") {
    mapOpts = mapOpts.filter(o => o.value !== "Leaping 5 Launch Distance");
  }

  if (mapOpts.length > 0) {
    while (arr.length < neededSlots) {
      const unused = mapOpts.find(o => !arr.includes(o.value));
      if (unused) {
        arr.push(unused.value);
      } else {
        arr.push(mapOpts[arr.length % mapOpts.length].value);
      }
    }
    if (arr.length > neededSlots) {
      arr = arr.slice(0, neededSlots);
    }
  }

  return arr;
};

window.updateFeatSubOptionSlot = function(featKey, slotIdx, newSubOption) {
  if (!char || !char.feats) return;
  const rank = char.feats[featKey] || 1;
  const baseName = featKey.includes(" (") ? featKey.split(" (")[0].trim() : featKey.trim();
  const slots = window.getFeatSubOptionsList(featKey, rank);
  slots[slotIdx] = newSubOption;

  if (!char.featDetails) char.featDetails = {};
  char.featDetails[featKey] = slots;

  buildAdvantagesUI();
  refreshUI();
  showToast(`Updated "${baseName}" (#${slotIdx + 1}): ${newSubOption}`, "info");
};

window.updateMechaSubOptionSlot = window.updateFeatSubOptionSlot;

window.updateMechaSubOption = function(featKey, newSubOption) {
  window.updateFeatSubOptionSlot(featKey, 0, newSubOption);
};

window.getFeatAdjustingEffects = function(featName) {
  const list = [];
  if (typeof char === 'undefined' || !char) return list;
  const baseName = featName.includes(" (") ? featName.split(" (")[0].trim() : featName.trim();
  const cleanTarget = (s) => (s || "").replace(/\s*\[.*?\]/g, '').trim().toLowerCase();
  const targetMatches = (s) => {
    const c = cleanTarget(s);
    return c === featName.toLowerCase() || c === baseName.toLowerCase();
  };

  const powerContainers = char.powers || [];
  powerContainers.forEach(container => {
    if (container.active === false) return;
    const containerName = container.name || "Power";
    const effects = Array.isArray(container.effects) ? container.effects : [container];
    effects.forEach(eff => {
      const isEffActive = eff.active !== false;
      // 1. Enhanced Trait subpowers
      if ((eff.effectName === "Enhanced Trait" || eff.effectName === "Enhance Trait") && Array.isArray(eff.subPowers)) {
        eff.subPowers.forEach(sub => {
          const raw = (sub.type || sub.name || "").trim();
          if (targetMatches(raw)) {
            const r = (parseInt(sub.rank) || 0) * (sub.isReduced ? -1 : 1);
            list.push({
              source: containerName,
              effect: eff.name && eff.name !== containerName ? `${eff.name} (${eff.effectName})` : eff.effectName,
              type: "Enhanced Trait",
              rankChange: r,
              active: isEffActive
            });
          }
        });
      }

      // 2. Active Container / Battle Form contained traits
      if (typeof CharacterModel !== 'undefined' && CharacterModel.isContainerEffect && CharacterModel.isContainerEffect(eff) && Array.isArray(eff.containedPowers)) {
        const isContActive = isEffActive && eff.formActive !== false;
        eff.containedPowers.forEach(cp => {
          if (cp.effectName === "Enhanced Trait" && Array.isArray(cp.subPowers)) {
            cp.subPowers.forEach(sub => {
              const raw = (sub.type || sub.name || "").trim();
              if (targetMatches(raw)) {
                const r = (parseInt(sub.rank) || 0) * (sub.isReduced ? -1 : 1);
                list.push({
                  source: containerName,
                  effect: `Container: ${eff.name || eff.effectName}`,
                  type: "Enhanced Trait",
                  rankChange: r,
                  active: isContActive
                });
              }
            });
          } else if (cp.type === "trait" || cp.isTrait || (!cp.effectName && cp.name)) {
            if (targetMatches(cp.name)) {
              const r = parseInt(cp.rank) || 1;
              list.push({
                source: containerName,
                effect: `Container: ${eff.name || eff.effectName}`,
                type: "Contained Feat",
                rankChange: r,
                active: isContActive
              });
            }
          }
        });
      }

      // 3. Boost Effect targeting this feat
      if (eff.effectName === "Boost") {
        const target = (eff.options && eff.options.boostTarget) || eff.boostTarget;
        const isActive = (eff.options && eff.options.boostActive !== undefined) ? eff.options.boostActive : (eff.boostActive !== false);
        if (target && targetMatches(target)) {
          const r = parseInt(eff.rank) || 1;
          list.push({
            source: containerName,
            effect: eff.name && eff.name !== containerName ? `${eff.name} (Boost)` : "Boost",
            type: "Boost",
            rankChange: r,
            active: isActive
          });
        }
      }
    });
  });

  const enhFeats = (char.enhancedTraits && char.enhancedTraits.feats) || {};
  const modelEnh = enhFeats[featName] || enhFeats[baseName] || 0;
  if (modelEnh !== 0 && list.length === 0) {
    list.push({
      source: "Enhanced Trait",
      effect: "Active Power Enhancement",
      type: "Enhanced Trait",
      rankChange: modelEnh,
      active: true
    });
  }

  return list;
};

window.showFeatAdjustments = function(featName) {
  const modal = document.getElementById("traitAdjustmentsModal");
  const title = document.getElementById("modalAdjustmentsTitle");
  const body = document.getElementById("modalAdjustmentsBody");
  if (!modal || !title || !body) return;

  const baseName = featName.includes(" (") ? featName.split(" (")[0].trim() : featName.trim();
  const boughtRank = (char && char.feats) ? (char.feats[featName] || 0) : 0;
  const effects = window.getFeatAdjustingEffects(featName);
  const enhFeats = (char && char.enhancedTraits && char.enhancedTraits.feats) || {};
  const enhTotal = enhFeats[featName] || enhFeats[baseName] || 0;
  const effRank = boughtRank + enhTotal;

  title.innerHTML = `⚡ Adjusting Effects: <em>${featName}</em>`;

  let effectsHtml = "";
  if (effects.length === 0 && enhTotal === 0) {
    effectsHtml = `<div style="color: var(--text-muted); padding: 8px 0;">No active adjusting effects found for this feat.</div>`;
  } else {
    effectsHtml = `
      <div style="display: flex; flex-direction: column; gap: 8px; margin: 12px 0;">
        ${effects.map(eff => {
          const sign = eff.rankChange > 0 ? `+${eff.rankChange}` : `${eff.rankChange}`;
          const badgeColor = eff.type === "Boost" ? "#f59e0b" : "#10b981";
          const statusText = eff.active === false ? " <span style='font-size: var(--font-size-fine-print); color: var(--text-muted);'>(Inactive)</span>" : "";
          return `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px;">
              <div>
                <div style="font-weight: 700; color: var(--text-main);">${eff.source}</div>
                <div style="font-size: var(--font-size-secondary); color: var(--text-muted);">${eff.effect}${statusText}</div>
              </div>
              <span class="badge" style="background: ${badgeColor}; font-weight: 700; font-size: var(--font-size-tags); padding: 3px 8px; border-radius: 4px; color: #ffffff;">
                ${sign} Rank${Math.abs(eff.rankChange) === 1 ? '' : 's'}
              </span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  body.innerHTML = `
    <div style="font-size: var(--font-size-secondary); color: var(--text-main);">
      <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--border-color);">
        <span class="secondary-text">Purchased / Base Rank:</span>
        <strong>${boughtRank}</strong>
      </div>
      <div style="margin-top: 10px;">
        <label style="font-weight: 700; color: #10b981; font-size: var(--font-size-labels);">Modifying Power Effects:</label>
        ${effectsHtml}
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0; margin-top: 8px; border-top: 2px solid var(--border-color); font-size: 1.05em;">
        <strong>Effective Total Rank:</strong>
        <strong style="color: ${effRank !== boughtRank ? '#10b981' : 'inherit'}; font-size: 1.1em;">${effRank}</strong>
      </div>
    </div>
  `;

  modal.classList.add("active");
};

function buildAdvantagesUI() {
  const tbody = document.querySelector("#advantagesTable tbody");
  if (!tbody) return;

  const purchasedFeats = char.feats || {};
  const enhancedFeats = (char.enhancedTraits && char.enhancedTraits.feats) || {};
  const allFeatKeys = new Set();

  Object.keys(purchasedFeats).forEach(k => {
    if ((purchasedFeats[k] || 0) > 0) allFeatKeys.add(k);
  });
  Object.keys(enhancedFeats).forEach(k => {
    if ((enhancedFeats[k] || 0) > 0) allFeatKeys.add(k);
  });

  const listRef = (typeof FEATS_LIST !== 'undefined') ? FEATS_LIST : ((typeof ADVANTAGES_LIST !== 'undefined') ? ADVANTAGES_LIST : []);

  let activeList = Array.from(allFeatKeys).map(featName => {
    const baseName = featName.includes(" (") ? featName.split(" (")[0].trim() : featName.trim();
    const baseFeat = listRef.find(a => a.name.toLowerCase() === baseName.toLowerCase() || a.name.toLowerCase() === featName.toLowerCase()) || {
      name: featName,
      category: "General",
      ranked: true,
      description: "",
      fullText: ""
    };
    return {
      name: featName,
      baseName: baseFeat.name,
      category: baseFeat.category || (baseFeat.types ? baseFeat.types.join(", ") : "General"),
      ranked: baseFeat.ranked !== false,
      description: baseFeat.description || "",
      baseFeat: baseFeat
    };
  });

  activeList.sort((a, b) => {
    let valA = a[advSort.col] || a.name;
    let valB = b[advSort.col] || b.name;
    if (valA < valB) return advSort.asc ? -1 : 1;
    if (valA > valB) return advSort.asc ? 1 : -1;
    return 0;
  });

  if (activeList.length === 0) {
    const isMecha = typeof char !== 'undefined' && char.isMecha;
    const addLabel = isMecha ? "+ Add Mecha Option" : "+ Add Feat";
    const noun = isMecha ? "mecha options" : "feats";
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 24px; color: var(--text-muted);">
          No ${noun} added yet. Click <button type="button" class="btn btn-sm" onclick="window.openAddFeatModal()" style="margin: 0 4px; padding: 2px 8px;">${addLabel}</button> to select and add ${noun}.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = activeList.map(adv => {
    const idSafe = adv.name.replace(/[^a-zA-Z0-9]/g, "_");
    const val = char.feats[adv.name] || 0;
    const enhFeat = enhancedFeats[adv.name] || 0;
    const effVal = val + enhFeat;
    const isEnhancedOnly = val === 0 && enhFeat > 0;
    const maxRank = char.getAdvantageMaxRank ? char.getAdvantageMaxRank(adv.baseFeat) : (adv.ranked ? 20 : 1);
    const detailVal = char.featDetails ? (char.featDetails[adv.name] || "") : "";
    const baseKey = adv.baseName || (adv.name.includes(" (") ? adv.name.split(" (")[0].trim() : adv.name.trim());

    const advNameStyle = effVal > 0 ? 'color: #b45309;' : '';
    const enhBadge = enhFeat > 0 ? ` <span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600; font-size: var(--font-size-tags); padding: 1px 5px;" title="Enhanced Trait">[+${enhFeat} Enhanced]</span>` : '';

    let detailCellHTML = `<span class="secondary-text">—</span>`;
    if (adv.name === "Skill Mastery" && effVal > 0) {
      let selectedArr = [];
      try { selectedArr = JSON.parse(detailVal || "[]"); } catch(e) {}
      const selectedCount = selectedArr.length;
      const displayStr = selectedCount > 0 ? selectedArr.join(", ") : "<em>No skills</em>";
      detailCellHTML = `
        <div style="display:flex; flex-direction:column; gap:4px; width: 100%;">
          <span class="secondary-text" style="font-size: var(--font-size-secondary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${selectedCount > 0 ? selectedArr.join(", ") : ""}">
            ${displayStr}
          </span>
          <button type="button" class="btn btn-sm" onclick="window.configureSkillMastery()">Configure (${selectedCount} / ${effVal * 4})</button>
        </div>
      `;
    } else if (adv.name === "Sidekick" && effVal > 0) {
      const budget = effVal * 5;
      const rootHero = window.primaryHero || char;
      const comps = (rootHero.companions || []).filter(c => c.type === "sidekick");
      detailCellHTML = `
        <div style="display:flex; flex-direction:column; gap:4px; width: 100%;">
          <span class="secondary-text" style="font-size: var(--font-size-secondary);">Budget: <strong>${budget} PP</strong> (Max PL ${rootHero.powerLevel})</span>
          ${comps.map(c => `<button type="button" class="btn btn-sm" onclick="switchToCompanion('${c.id}')" title="Edit companion sheet">🤝 Edit "${c.name}"</button>`).join('')}
          <button type="button" class="btn btn-sm btn-secondary" onclick="buildOrEditCompanionForSource('sidekick')">+ Build Sidekick</button>
        </div>
      `;
    } else if (adv.name === "Minions" && effVal > 0) {
      const budget = effVal * 15;
      const rootHero = window.primaryHero || char;
      const comps = (rootHero.companions || []).filter(c => c.type === "minion");
      detailCellHTML = `
        <div style="display:flex; flex-direction:column; gap:4px; width: 100%;">
          <span class="secondary-text" style="font-size: var(--font-size-secondary);">Budget: <strong>${budget} PP</strong></span>
          ${comps.map(c => `<button type="button" class="btn btn-sm" onclick="switchToCompanion('${c.id}')" title="Edit minion sheet">👥 Edit "${c.name}"</button>`).join('')}
          <button type="button" class="btn btn-sm btn-secondary" onclick="buildOrEditCompanionForSource('minion')">+ Build Minion</button>
        </div>
      `;
    } else if (adv.name === "(Attack) Flurry" || baseKey === "(Attack) Flurry") {
      const stats = window.calculateFlurryStats(effVal, char.featDetails ? char.featDetails[adv.name] : null, char, adv.name);
      const primaryOptionsList = window.getAvailableFlurryForms(char, adv.name, 0, stats.primaryForm);

      detailCellHTML = `
        <div style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            <span style="font-size: var(--font-size-tags); padding: 1px 6px; border-radius: 4px; background: rgba(59, 130, 246, 0.12); color: var(--accent-primary); font-weight: 700;" title="For every ${stats.interval} beating Defense, +1 damage bonus">
              ⚡ Interval: ${stats.interval} (+1 / ${stats.interval} &gt; Def)
            </span>
            <span style="font-size: var(--font-size-tags); padding: 1px 6px; border-radius: 4px; background: rgba(139, 92, 246, 0.12); color: #8b5cf6; font-weight: 700;">
              💥 Max: +${stats.maxBonus}
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="font-size: var(--font-size-minor-controls); font-weight: 700; color: var(--accent-primary); min-width: 54px;">Primary:</span>
            <select class="adv-suboption-select" onchange="window.updateFlurrySlot('${adv.name.replace(/'/g, "\\'")}', 0, this.value)" style="font-size: var(--font-size-controls); padding: 2px 6px; width: 100%; border-radius: 4px; border: 1.5px solid var(--accent-primary); background: var(--bg-card); color: var(--text-main); font-weight: 500; cursor: pointer;">
              ${primaryOptionsList.map(opt => `<option value="${opt.replace(/"/g, '&quot;')}" ${opt === stats.primaryForm ? 'selected' : ''}>${opt}</option>`).join('')}
              <option value="Custom Melee Form...">Custom Melee Form...</option>
            </select>
          </div>
          ${Array.from({ length: Math.max(0, effVal - 1) }).map((_, uIdx) => {
            const slotIdx = uIdx + 1;
            const currentChoice = stats.upgrades[uIdx] || "Reduce Interval by 1 (Interval 4)";
            const availableChoices = window.getFlurryUpgradeChoicesForSlot(stats, uIdx, char, adv.name);
            if (!availableChoices.includes(currentChoice)) {
              availableChoices.unshift(currentChoice);
            }
            return `
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: var(--font-size-minor-controls); font-weight: 700; color: #8b5cf6; min-width: 54px;">Rank ${uIdx + 2}:</span>
                <select class="adv-suboption-select" onchange="window.updateFlurrySlot('${adv.name.replace(/'/g, "\\'")}', ${slotIdx}, this.value)" style="font-size: var(--font-size-controls); padding: 2px 6px; width: 100%; border-radius: 4px; border: 1.5px solid #8b5cf6; background: var(--bg-card); color: var(--text-main); font-weight: 500; cursor: pointer;">
                  ${availableChoices.map(c => `<option value="${c.replace(/"/g, '&quot;')}" ${c === currentChoice ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else if (typeof FEAT_SUBOPTIONS_MAP !== 'undefined' && (FEAT_SUBOPTIONS_MAP[baseKey] || baseKey === "Electromagnetic Seal" || baseKey === "Ejector Seat")) {
      const opts = FEAT_SUBOPTIONS_MAP[baseKey] || [];
      const slots = window.getFeatSubOptionsList(adv.name, effVal);

      const makeOptionsHTML = (currentVal, optionsList) => {
        const hasVal = currentVal && optionsList.some(o => o.value === currentVal);
        const listToRender = (currentVal && !hasVal) ? [...optionsList, { value: currentVal }] : optionsList;
        return listToRender.map(o => `<option value="${o.value.replace(/"/g, '&quot;')}" ${o.value === currentVal ? 'selected' : ''}>${o.value}</option>`).join('');
      };

      if (baseKey === "Electromagnetic Seal") {
        const upgradeOpts = opts.filter(o => !o.value.startsWith("Base Seal"));
        detailCellHTML = `
          <div style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
            <div style="font-size: var(--font-size-tags); padding: 2px 6px; background: rgba(2, 132, 199, 0.12); border-radius: 4px; color: #0284c7; font-weight: 600;">
              🛡️ Base Radiation &amp; Cosmic Ray Seal (Rank 1)
            </div>
            ${slots.map((slotVal, sIdx) => {
              const otherTaken = slots.filter((v, i) => i !== sIdx && v);
              const availOpts = upgradeOpts.filter(o => !otherTaken.includes(o.value));
              return `
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: var(--font-size-minor-controls); font-weight: 700; color: #0284c7; min-width: 72px;">Upgrade #${sIdx + 1}:</span>
                <select class="adv-suboption-select" onchange="window.updateMechaSubOptionSlot('${adv.name.replace(/'/g, "\\'")}', ${sIdx}, this.value)" style="font-size: var(--font-size-controls); padding: 2px 6px; width: 100%; border-radius: 4px; border: 1.5px solid #0284c7; background: var(--bg-card); color: var(--text-main); font-weight: 500; cursor: pointer;">
                  ${makeOptionsHTML(slotVal, availOpts.length > 0 ? availOpts : upgradeOpts)}
                </select>
              </div>
            `;}).join('')}
          </div>
        `;
      } else if (baseKey === "Ejector Seat") {
        const upgradeOpts = opts.filter(o => o.value !== "Leaping 5 Launch Distance");
        detailCellHTML = `
          <div style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
            <div style="font-size: var(--font-size-tags); padding: 2px 6px; background: rgba(2, 132, 199, 0.12); border-radius: 4px; color: #0284c7; font-weight: 600;">
              🚀 Base Leaping 5 Escape Launch (Rank 1)
            </div>
            ${slots.map((slotVal, sIdx) => {
              const otherTaken = slots.filter((v, i) => i !== sIdx && v);
              const availOpts = upgradeOpts.filter(o => !otherTaken.includes(o.value));
              return `
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: var(--font-size-minor-controls); font-weight: 700; color: #0284c7; min-width: 72px;">Upgrade #${sIdx + 1}:</span>
                <select class="adv-suboption-select" onchange="window.updateMechaSubOptionSlot('${adv.name.replace(/'/g, "\\'")}', ${sIdx}, this.value)" style="font-size: var(--font-size-controls); padding: 2px 6px; width: 100%; border-radius: 4px; border: 1.5px solid #0284c7; background: var(--bg-card); color: var(--text-main); font-weight: 500; cursor: pointer;">
                  ${makeOptionsHTML(slotVal, availOpts.length > 0 ? availOpts : upgradeOpts)}
                </select>
              </div>
            `;}).join('')}
          </div>
        `;
      } else if (baseKey === "Environmental Seal") {
        const dur = window.getEnvSealDuration(effVal);
        const currentDetail = slots[0] || (opts[0] ? opts[0].value : "Vacuum & Deep Space");
        detailCellHTML = `
          <div style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
            <div style="font-size: var(--font-size-tags); padding: 2px 6px; background: rgba(2, 132, 199, 0.12); border-radius: 4px; color: #0284c7; font-weight: 600;">
              ⏱️ Sealed Life Support Duration: ${dur}
            </div>
            <select class="adv-suboption-select" onchange="window.updateMechaSubOptionSlot('${adv.name.replace(/'/g, "\\'")}', 0, this.value)" style="font-size: var(--font-size-controls); padding: 3px 6px; width: 100%; border-radius: 4px; border: 1.5px solid #0284c7; background: var(--bg-card); color: var(--text-main); font-weight: 500; cursor: pointer;">
              ${makeOptionsHTML(currentDetail, opts)}
            </select>
          </div>
        `;
      } else if (baseKey === "Equipment Mount") {
        const grade = window.getMountGradeText(effVal);
        detailCellHTML = `
          <div style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
            <div style="font-size: var(--font-size-tags); padding: 2px 6px; background: rgba(2, 132, 199, 0.12); border-radius: 4px; color: #0284c7; font-weight: 600;">
              🔧 ${grade}
            </div>
            ${slots.map((slotVal, sIdx) => {
              const otherTaken = slots.filter((v, i) => i !== sIdx && v);
              const availOpts = opts.filter(o => !otherTaken.includes(o.value));
              return `
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: var(--font-size-minor-controls); font-weight: 700; color: #0284c7; min-width: 65px;">Mount #${sIdx + 1}:</span>
                <select class="adv-suboption-select" onchange="window.updateMechaSubOptionSlot('${adv.name.replace(/'/g, "\\'")}', ${sIdx}, this.value)" style="font-size: var(--font-size-controls); padding: 2px 6px; width: 100%; border-radius: 4px; border: 1.5px solid #0284c7; background: var(--bg-card); color: var(--text-main); font-weight: 500; cursor: pointer;">
                  ${makeOptionsHTML(slotVal, availOpts.length > 0 ? availOpts : opts)}
                </select>
              </div>
            `;}).join('')}
          </div>
        `;
      } else if (slots.length <= 1) {
        const currentDetail = slots[0] || (opts[0] ? opts[0].value : "");
        detailCellHTML = `
          <div style="display: flex; align-items: center; gap: 4px; width: 100%;">
            <select class="adv-suboption-select" onchange="window.updateMechaSubOptionSlot('${adv.name.replace(/'/g, "\\'")}', 0, this.value)" style="font-size: var(--font-size-controls); padding: 3px 6px; width: 100%; border-radius: 4px; border: 1.5px solid #0284c7; background: var(--bg-card); color: var(--text-main); font-weight: 500; cursor: pointer;">
              ${makeOptionsHTML(currentDetail, opts)}
            </select>
          </div>
        `;
      } else {
        detailCellHTML = `
          <div style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
            ${slots.map((slotVal, sIdx) => {
              const otherTaken = slots.filter((v, i) => i !== sIdx && v);
              const availOpts = opts.filter(o => !otherTaken.includes(o.value));
              return `
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: var(--font-size-minor-controls); font-weight: 700; color: #0284c7; min-width: 32px;">#${sIdx + 1}:</span>
                <select class="adv-suboption-select" onchange="window.updateMechaSubOptionSlot('${adv.name.replace(/'/g, "\\'")}', ${sIdx}, this.value)" style="font-size: var(--font-size-controls); padding: 2px 6px; width: 100%; border-radius: 4px; border: 1.5px solid #0284c7; background: var(--bg-card); color: var(--text-main); font-weight: 500; cursor: pointer;">
                  ${makeOptionsHTML(slotVal, availOpts.length > 0 ? availOpts : opts)}
                </select>
              </div>
            `;}).join('')}
          </div>
        `;
      }
    } else if (detailVal) {
      detailCellHTML = `<input type="text" class="adv-detail-input" data-adv="${adv.name}" value="${detailVal}" placeholder="Specification / detail..." style="width: 100%; min-width: 140px;">`;
    } else if (adv.name.includes(" (")) {
      const insideParen = adv.name.substring(adv.name.indexOf("(") + 1, adv.name.lastIndexOf(")"));
      detailCellHTML = `<span style="font-weight: 500; color: var(--accent-primary);">${insideParen}</span>`;
    } else if (adv.baseFeat && adv.baseFeat.focused) {
      detailCellHTML = `<input type="text" class="adv-detail-input" data-adv="${adv.name}" value="${detailVal}" placeholder="Specify detail..." style="width: 100%; min-width: 140px;">`;
    }

    const adjustingEffects = window.getFeatAdjustingEffects ? window.getFeatAdjustingEffects(adv.name) : [];
    const isAdjusted = enhFeat !== 0 || adjustingEffects.length > 0;
    const totalColorStyle = isAdjusted ? 'color: #10b981; font-weight: 700;' : '';
    const adjustBtnHtml = isAdjusted
      ? `<button type="button" class="btn-adjust-info" onclick="window.showFeatAdjustments('${adv.name.replace(/'/g, "\\'")}')" title="View Adjusting Effects">!</button>`
      : '';

    const removeBtnHtml = isEnhancedOnly 
      ? `<button type="button" class="btn btn-sm btn-secondary" style="padding: 2px 6px; opacity: 0.5; cursor: not-allowed;" title="Granted by active power or alternate form" disabled>✕</button>`
      : `<button type="button" class="btn btn-sm" style="padding: 2px 6px; color: #ef4444; border-color: rgba(239, 68, 68, 0.4);" onclick="window.removeFeat('${adv.name.replace(/'/g, "\\'")}')" title="Remove this feat">✕</button>`;

    const stepperHtml = isEnhancedOnly
      ? `<span class="secondary-text" style="font-size: var(--font-size-secondary);">0 (Power)</span>`
      : `<div class="stepper-group">
          <button type="button" class="stepper-btn stepper-dec" onclick="stepVal('adv_input_${idSafe}', -1, 0, ${maxRank})">−</button>
          <input type="number" id="adv_input_${idSafe}" class="stepper-input" min="0" max="${maxRank}" value="${val}" data-adv="${adv.name}">
          <button type="button" class="stepper-btn stepper-inc" onclick="stepVal('adv_input_${idSafe}', 1, 0, ${maxRank})">+</button>
        </div>`;

    return `
      <tr>
        <td>
          <div style="display: inline-flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            <strong style="${advNameStyle}">${adv.name}</strong>
            <button type="button" class="btn-info-circle" onclick="window.showAdvantageInfo('${adv.baseName.replace(/'/g, "\\'")}')" title="View Full Description" style="margin-left: 2px;">?</button>
            ${enhBadge}
          </div>
        </td>
        <td class="secondary-text">${adv.category}</td>
        <td class="rank-col">${stepperHtml}</td>
        <td class="total-col">
          <div style="display: inline-flex; align-items: center; justify-content: center; gap: 4px;">
            <strong style="${totalColorStyle}">${effVal}</strong>
            ${adjustBtnHtml}
          </div>
        </td>
        <td class="spec-col">${detailCellHTML}</td>
        <td class="actions-col" style="text-align: center; white-space: nowrap;">
          ${removeBtnHtml}
        </td>
      </tr>
    `;
  }).join("");

  tbody.querySelectorAll("input.stepper-input").forEach(input => {
    input.addEventListener("input", (e) => {
      const featName = e.target.dataset.adv;
      const val = parseInt(e.target.value) || 0;
      if (val <= 0 && (!enhancedFeats[featName] || enhancedFeats[featName] <= 0)) {
        delete char.feats[featName];
        if (char.featDetails) delete char.featDetails[featName];
        buildAdvantagesUI();
      } else {
        char.feats[featName] = val;
        const baseKey = featName.includes(" (") ? featName.split(" (")[0].trim() : featName.trim();
        if (featName === "(Attack) Flurry" || baseKey === "(Attack) Flurry") {
          const stats = window.calculateFlurryStats(val, char.featDetails ? char.featDetails[featName] : null);
          if (!char.featDetails) char.featDetails = {};
          char.featDetails[featName] = [stats.primaryForm, ...stats.upgrades];
        } else if (typeof FEAT_SUBOPTIONS_MAP !== 'undefined' && (FEAT_SUBOPTIONS_MAP[baseKey] || baseKey === "Electromagnetic Seal" || baseKey === "Ejector Seat")) {
          const updatedSlots = window.getFeatSubOptionsList(featName, val);
          if (!char.featDetails) char.featDetails = {};
          char.featDetails[featName] = updatedSlots;
        }
      }
      if (featName === "Skill Mastery") {
        let selected = [];
        try { selected = JSON.parse(char.featDetails["Skill Mastery"] || "[]"); } catch (ex) {}
        if (selected.length > val * 4) {
          window.configureSkillMastery();
        }
      }
      if (featName && featName.startsWith("Electromagnetic Seal") && val >= 2) {
        if (!char.featDetails[featName] || char.featDetails[featName].includes("Base Seal")) {
          showToast("Electromagnetic Seal is now Rank 2+: You can select Insubstantial or Perception protection in the dropdown!", "info");
        }
      }
      buildAdvantagesUI(); 
      buildSkillsUI();     
      buildEquipmentUI(); 
      refreshUI();
    });
  });

  tbody.querySelectorAll("input.adv-detail-input").forEach(input => {
    input.addEventListener("input", (e) => {
      if (!char.featDetails) char.featDetails = {};
      char.featDetails[e.target.dataset.adv] = e.target.value;
    });
  });
}
window.buildAdvantagesUI = buildAdvantagesUI;

window.removeFeat = function(featName) {
  if (confirm(`Remove "${featName}" from your character sheet?`)) {
    if (char.removeFeat) {
      char.removeFeat(featName);
    } else {
      delete char.feats[featName];
      if (char.featDetails) delete char.featDetails[featName];
    }
    buildAdvantagesUI();
    buildSkillsUI();
    buildEquipmentUI();
    refreshUI();
    showToast(`Removed feat "${featName}"`, "info");
  }
};

/* ==========================================================================
   ADD FEAT MODAL LOGIC & MULTI-FORM SPECIFICATIONS
   ========================================================================== */

window.updateTraitModalPosition = function() {
  const pHeader = document.getElementById("persistentHeader");
  let topPx = 130;
  if (pHeader && !pHeader.classList.contains("disabled")) {
    const rect = pHeader.getBoundingClientRect();
    topPx = Math.max(10, Math.round(rect.bottom + 4));
  } else {
    topPx = 12;
  }
  document.documentElement.style.setProperty("--trait-modal-top", topPx + "px");
};
window.addEventListener("resize", window.updateTraitModalPosition);

window.selectedFeatCheckboxes = new Set();
window.selectedSkillCheckboxes = new Set();

window.toggleFeatCheckbox = function(featName, isChecked, event) {
  if (!window.selectedFeatCheckboxes) window.selectedFeatCheckboxes = new Set();
  if (isChecked) {
    window.selectedFeatCheckboxes.add(featName);
    window.selectFeatTouchItem(featName);
  } else {
    window.selectedFeatCheckboxes.delete(featName);
  }
  window.updateFeatModalAddButtonText();
};

window.updateFeatModalAddButtonText = function() {
  const btn = document.getElementById("btnAddFeatConfirm");
  const count = window.selectedFeatCheckboxes ? window.selectedFeatCheckboxes.size : 0;
  if (btn) {
    btn.textContent = count > 1 ? `+ Add Checked (${count}) to Sheet` : "+ Add to Sheet";
  }
  const lbl = document.getElementById("lblFeatCheckedCount");
  if (lbl) {
    lbl.innerHTML = count > 0 ? `(${count} selected <a href="#" onclick="event.preventDefault(); window.clearFeatCheckboxes()" style="color: var(--accent-primary); margin-left: 4px; text-decoration: underline;">Clear</a>)` : "";
  }
};

window.clearFeatCheckboxes = function() {
  if (window.selectedFeatCheckboxes) window.selectedFeatCheckboxes.clear();
  const listEl = document.getElementById("listFeatChoice");
  if (listEl) {
    listEl.querySelectorAll(".touch-trait-checkbox").forEach(cb => cb.checked = false);
  }
  window.updateFeatModalAddButtonText();
};

window.handleFeatItemClick = function(featName, event) {
  const now = Date.now();
  window.selectFeatTouchItem(featName);
  if (window._lastFeatTap && window._lastFeatTap.name === featName && (now - window._lastFeatTap.time < 350)) {
    window._lastFeatTap = null;
    window.confirmAddFeat();
  } else {
    window._lastFeatTap = { name: featName, time: now };
  }
};

window.handleFeatDblClick = function(featName, event) {
  window.selectFeatTouchItem(featName);
  window.confirmAddFeat();
};

window.initModalSplitter = function(modalId, topPaneId, dividerId, bottomPaneId) {
  const modal = document.getElementById(modalId);
  const topPane = document.getElementById(topPaneId);
  const divider = document.getElementById(dividerId);
  const bottomPane = document.getElementById(bottomPaneId);
  if (!modal || !topPane || !divider || !bottomPane) return;
  if (divider._splitterInitialized) return;
  divider._splitterInitialized = true;

  let isDragging = false;
  let startY = 0;
  let startHeight = 0;
  let availableHeight = 0;
  let defaultHeight = 0;
  let maxHeight = 0;
  let minHeight = 80;

  function onPointerDown(e) {
    if (e.type === 'mousedown' && e.button !== 0) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const body = topPane.parentElement;
    if (!body) return;

    isDragging = true;
    divider.classList.add('dragging');
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'row-resize';

    startY = clientY;
    startHeight = topPane.offsetHeight;

    const bodyHeight = body.clientHeight;
    const dividerHeight = divider.offsetHeight || 10;
    availableHeight = Math.max(120, bodyHeight - dividerHeight - 12);

    // Default height is 50% of available space
    defaultHeight = availableHeight * 0.5;
    // Top pane can increase by up to 50% from default: default * 1.5 = 75% of available space
    maxHeight = Math.min(availableHeight - 60, defaultHeight * 1.5);
    minHeight = Math.max(70, defaultHeight * 0.4);

    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
    window.addEventListener('touchcancel', onPointerUp);
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    if (e.cancelable && e.type === 'touchmove') e.preventDefault();
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - startY;
    const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY));

    topPane.style.flex = `0 0 ${newHeight}px`;
    topPane.style.height = `${newHeight}px`;
    bottomPane.style.flex = '1 1 0';
    bottomPane.style.minHeight = '0';
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    divider.classList.remove('dragging');
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
    window.removeEventListener('mousemove', onPointerMove);
    window.removeEventListener('touchmove', onPointerMove);
    window.removeEventListener('mouseup', onPointerUp);
    window.removeEventListener('touchend', onPointerUp);
    window.removeEventListener('touchcancel', onPointerUp);
  }

  function onDblClick(e) {
    if (e) e.stopPropagation();
    // Reset top and bottom panes to default 50/50 flex
    topPane.style.flex = '1 1 0';
    topPane.style.height = '';
    bottomPane.style.flex = '1 1 0';
    bottomPane.style.height = '';
  }

  divider.addEventListener('mousedown', onPointerDown);
  divider.addEventListener('touchstart', onPointerDown, { passive: true });
  divider.addEventListener('dblclick', onDblClick);
};

window.openAddFeatModal = function(defaultCategory) {
  const modal = document.getElementById("addFeatModal");
  if (!modal) return;
  window.initModalSplitter('addFeatModal', 'boxFeatTopPane', 'divFeatModalDivider', 'boxFeatPreview');
  window.updateTraitModalPosition();
  if (window.selectedFeatCheckboxes) window.selectedFeatCheckboxes.clear();
  window.updateFeatModalAddButtonText();

  const isMecha = typeof char !== 'undefined' && !!char.isMecha;
  const showMechaCat = isMecha || defaultCategory === "Mecha";
  const titleEl = document.getElementById("addFeatModalTitle");
  if (titleEl) {
    titleEl.textContent = showMechaCat ? "Add Mecha Option" : "Add Feat";
  }

  const selFilter = document.getElementById("selFeatCategoryFilter");
  if (selFilter) {
    let optMecha = selFilter.querySelector('option[value="Mecha"]');
    if (showMechaCat) {
      if (!optMecha) {
        optMecha = document.createElement("option");
        optMecha.value = "Mecha";
        optMecha.textContent = "🤖 Mecha Options";
        const optAll = selFilter.querySelector('option[value="All"]');
        if (optAll && optAll.nextSibling) {
          selFilter.insertBefore(optMecha, optAll.nextSibling);
        } else {
          selFilter.appendChild(optMecha);
        }
      }
    } else {
      if (optMecha) {
        optMecha.remove();
      }
    }

    if (defaultCategory) {
      selFilter.value = defaultCategory;
    } else if (isMecha) {
      selFilter.value = "Mecha";
    } else {
      if (selFilter.value === "Mecha" || !selFilter.value) {
        selFilter.value = "All";
      }
    }
  }

  const txtSearch = document.getElementById("txtFeatSearch");
  if (txtSearch) txtSearch.value = "";

  const numRank = document.getElementById("numFeatInitialRank");
  if (numRank) numRank.value = 1;
  window._currentModalFeat = null;
  if (numRank && !numRank._hasMechaRankListener) {
    numRank._hasMechaRankListener = true;
    numRank.addEventListener("input", () => {
      const selChoice = document.getElementById("selFeatChoice");
      if (!selChoice) return;
      const isOptionFeat = typeof FEAT_SUBOPTIONS_MAP !== 'undefined' && !!FEAT_SUBOPTIONS_MAP[selChoice.value];
      const rankSensitive = ["Electromagnetic Seal", "Environmental Seal", "Ejector Seat", "Equipment Mount", "(Attack) Flurry"];
      if (rankSensitive.includes(selChoice.value) || isOptionFeat) {
        window.onFeatModalSelect();
      }
    });
  }

  window.filterFeatModalOptions();
  modal.classList.add("active");
};

window.openMechaOptions = function() {
  const featTabBtn = document.querySelector('.tab-btn[data-tab="tab-feats"]');
  if (featTabBtn) featTabBtn.click();
  window.openAddFeatModal("Mecha");
};

window.closeAddFeatModal = function() {
  const modal = document.getElementById("addFeatModal");
  if (modal) modal.classList.remove("active");
};

window.filterFeatModalOptions = function() {
  const txtSearch = document.getElementById("txtFeatSearch");
  const selFilter = document.getElementById("selFeatCategoryFilter");
  const listEl = document.getElementById("listFeatChoice");
  const selChoice = document.getElementById("selFeatChoice");
  if (!selChoice) return;

  const isMecha = typeof char !== 'undefined' && !!char.isMecha;
  const query = txtSearch ? txtSearch.value.trim().toLowerCase() : "";
  const cat = selFilter ? selFilter.value : (isMecha ? "Mecha" : "All");
  const listRef = (typeof FEATS_LIST !== 'undefined') ? FEATS_LIST : ((typeof ADVANTAGES_LIST !== 'undefined') ? ADVANTAGES_LIST : []);

  const filtered = listRef.filter(adv => {
    // If not in Mecha mode, mecha-specific options and feats are not available
    if (!isMecha && adv.category === "Mecha") {
      return false;
    }
    if (cat !== "All" && adv.category !== cat && (!adv.types || !adv.types.includes(cat))) {
      return false;
    }
    if (query) {
      const matchName = adv.name.toLowerCase().includes(query);
      const matchDesc = (adv.description || adv.fullText || "").toLowerCase().includes(query);
      return matchName || matchDesc;
    }
    return true;
  });

  filtered.sort((a, b) => a.name.localeCompare(b.name));

  if (filtered.length === 0) {
    if (listEl) {
      listEl.innerHTML = `<div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: var(--font-size-secondary);">No matching feats found.</div>`;
    }
    selChoice.value = "";
    window.onFeatModalSelect();
    return;
  }

  let currentVal = selChoice.value;
  if (!filtered.some(a => a.name === currentVal)) {
    currentVal = filtered[0].name;
    selChoice.value = currentVal;
  }

  if (listEl) {
    listEl.innerHTML = filtered.map(adv => {
      const isSelected = adv.name === currentVal;
      const isChecked = window.selectedFeatCheckboxes && window.selectedFeatCheckboxes.has(adv.name);
      const isRankedStr = adv.ranked ? " (Ranked)" : "";
      const catLabel = adv.category || "General";
      return `<div class="touch-trait-item ${isSelected ? 'selected' : ''}" data-feat="${adv.name.replace(/"/g, '&quot;')}" onclick="window.handleFeatItemClick('${adv.name.replace(/'/g, "\\'")}', event)" ondblclick="window.handleFeatDblClick('${adv.name.replace(/'/g, "\\'")}', event)">
        <input type="checkbox" class="touch-trait-checkbox" data-feat="${adv.name.replace(/"/g, '&quot;')}" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); window.toggleFeatCheckbox('${adv.name.replace(/'/g, "\\'")}', this.checked, event)">
        <span class="touch-trait-title">${adv.name}${isRankedStr}</span>
        <span class="touch-trait-badge">${catLabel}</span>
      </div>`;
    }).join("");
  } else {
    selChoice.innerHTML = filtered.map((adv, idx) => {
      const isRankedStr = adv.ranked ? " (Ranked)" : "";
      return `<option value="${adv.name}" ${idx === 0 ? "selected" : ""}>${adv.name} [${adv.category || "General"}]${isRankedStr}</option>`;
    }).join("");
  }

  window.onFeatModalSelect();
};

window.selectFeatTouchItem = function(featName) {
  const selChoice = document.getElementById("selFeatChoice");
  const listEl = document.getElementById("listFeatChoice");
  if (selChoice) selChoice.value = featName;
  if (listEl) {
    listEl.querySelectorAll(".touch-trait-item").forEach(item => {
      if (item.dataset.feat === featName) {
        item.classList.add("selected");
        item.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } else {
        item.classList.remove("selected");
      }
    });
  }
  window.onFeatModalSelect();
};

window.onFeatModalSelect = function() {
  const selChoice = document.getElementById("selFeatChoice");
  const boxPreview = document.getElementById("boxFeatPreview");
  const boxSpec = document.getElementById("boxFeatSpecContainer");
  const numRank = document.getElementById("numFeatInitialRank");
  const lblMaxRank = document.getElementById("lblFeatMaxRankNote");
  if (!selChoice) return;

  const featName = selChoice.value;
  const listRef = (typeof FEATS_LIST !== 'undefined') ? FEATS_LIST : ((typeof ADVANTAGES_LIST !== 'undefined') ? ADVANTAGES_LIST : []);
  const adv = listRef.find(a => a.name === featName);
  if (!adv) {
    if (boxPreview) boxPreview.innerHTML = "<em>No feat selected.</em>";
    if (boxSpec) boxSpec.style.display = "none";
    return;
  }

  // Preview rules text
  if (boxPreview) {
    boxPreview.innerHTML = `<strong>${adv.name} [${adv.category || "General"}]</strong>: ` + (adv.fullText || adv.description || "<em>No description available.</em>");
  }

  const isNewFeatSelected = window._currentModalFeat !== featName;
  window._currentModalFeat = featName;

  // Max ranks
  const maxRank = char.getAdvantageMaxRank ? char.getAdvantageMaxRank(adv) : (adv.ranked ? 20 : 1);
  if (numRank) {
    numRank.max = maxRank;
    if (isNewFeatSelected) {
      numRank.value = 1;
    }
  }
  if (lblMaxRank) {
    lblMaxRank.textContent = adv.ranked ? `(Ranked: max ${maxRank} ranks)` : `(Unranked: 1 rank maximum)`;
  }

  // Multi-Form / Specification Container
  if (!boxSpec) return;

  if (adv.name === "(Attack) Flurry") {
    boxSpec.style.display = "block";
    const r = numRank ? (parseInt(numRank.value) || 1) : 1;
    const prevSelects = boxSpec.querySelectorAll(".modal-flurry-slot-select");
    const prevValues = Array.from(prevSelects).map(s => s.value);
    const primaryVal = prevValues[0] || (document.getElementById("selFlurryPrimaryForm") ? document.getElementById("selFlurryPrimaryForm").value : "Unarmed Combat");

    const rawUpgrades = prevValues.slice(1);
    const stats = window.calculateFlurryStats(r, [primaryVal, ...rawUpgrades], char, "(Attack) Flurry");
    const primaryForms = window.getAvailableFlurryForms(char, "(Attack) Flurry", 0, stats.primaryForm);

    boxSpec.innerHTML = `
      <div style="display: flex; gap: 6px; flex-direction: column;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
          <label style="font-weight: 700; font-size: var(--font-size-labels); color: var(--accent-primary); margin: 0;">
            ⚡ Flurry Attack Configuration &amp; Rank Upgrades:
          </label>
          <span class="badge" id="lblFlurryBadge" style="background: var(--accent-primary); font-size: var(--font-size-tags);">Rank ${r}</span>
        </div>
        <div style="padding: 6px 10px; background: rgba(59, 130, 246, 0.08); border: 1px solid var(--border-color); border-radius: 4px; font-size: var(--font-size-secondary);">
          <div style="font-weight: 600; color: var(--text-main); margin-bottom: 4px;">
            Full action melee barrage at <strong>–2 attack penalty</strong>.
          </div>
          <div id="flurryLiveStats" style="display: flex; gap: 8px; flex-wrap: wrap;">
            <span style="font-weight: 700; color: var(--accent-primary);">⚡ Interval: ${stats.interval} (+1 dmg / ${stats.interval} over Def)</span>
            <span style="font-weight: 700; color: #8b5cf6;">💥 Max Bonus: +${stats.maxBonus}</span>
            <span style="font-weight: 700; color: #10b981;">⚔️ Forms: ${stats.forms.join(', ')}</span>
          </div>
        </div>

        <div style="margin-top: 4px;">
          <label style="font-weight: 600; font-size: var(--font-size-labels); display: block; margin-bottom: 2px;">Primary Melee Attack Form (Rank 1):</label>
          <select id="selFlurryPrimaryForm" class="modal-flurry-slot-select" data-slot="0" style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px;" onchange="window.onFeatSpecOptionChange()">
            ${primaryForms.map(f => `<option value="${f.replace(/"/g, '&quot;')}" ${f === stats.primaryForm ? 'selected' : ''}>${f}</option>`).join('')}
            <option value="__custom__" ${stats.primaryForm.startsWith("Custom") ? 'selected' : ''}>Custom Melee Form...</option>
          </select>
          <input type="text" id="txtFlurryCustomPrimary" placeholder="Enter melee attack or Strike power..." style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; margin-top: 4px; display: ${primaryVal === '__custom__' ? 'block' : 'none'};" oninput="window.onFeatSpecOptionChange()">
        </div>

        ${r > 1 ? `
          <div style="margin-top: 6px;">
            <label style="font-weight: 600; font-size: var(--font-size-labels); display: block; margin-bottom: 4px;">
              Additional Rank Upgrades (${r - 1} Choice${r - 1 > 1 ? 's' : ''}):
            </label>
            <div id="boxFlurryUpgrades" style="display: flex; flex-direction: column; gap: 6px; max-height: 160px; overflow-y: auto; padding-right: 4px;">
              ${Array.from({ length: r - 1 }).map((_, uIdx) => {
                const slotIdx = uIdx + 1;
                const slotVal = stats.upgrades[uIdx] || "Reduce Interval by 1";
                const choices = window.getFlurryUpgradeChoicesForSlot(stats, uIdx, char, "(Attack) Flurry");
                if (!choices.includes(slotVal)) choices.unshift(slotVal);
                return `
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span style="font-size: var(--font-size-minor-controls); font-weight: 700; color: #8b5cf6; min-width: 65px;">Rank ${uIdx + 2}:</span>
                    <select class="modal-flurry-slot-select" data-slot="${slotIdx}" style="flex: 1; font-size: var(--font-size-controls); padding: 3px 6px;" onchange="window.onFeatSpecOptionChange()">
                      ${choices.map(c => `<option value="${c.replace(/"/g, '&quot;')}" ${c === slotVal ? 'selected' : ''}>${c}</option>`).join('')}
                    </select>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  } else if (adv.name === "Attack Focus") {
    boxSpec.style.display = "block";
    boxSpec.innerHTML = `
      <label style="font-weight: 600; font-size: var(--font-size-labels); display: block; margin-bottom: 6px;">Choose Attack Focus Type:</label>
      <div style="display: flex; gap: 16px; font-size: var(--font-size-controls); flex-wrap: wrap;">
        <label style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
          <input type="radio" name="radAttackFocusType" value="Melee" checked> <strong>Melee Attacks</strong> (+1 close attack / rank)
        </label>
        <label style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
          <input type="radio" name="radAttackFocusType" value="Ranged"> <strong>Ranged Attacks</strong> (+1 ranged attack / rank)
        </label>
      </div>
      <div class="secondary-text" style="font-size: var(--font-size-secondary); margin-top: 6px;">
        <em>In M&amp;M 2E rules, Attack Focus can be taken multiple times for Melee and Ranged attacks.</em>
      </div>
    `;
  } else if (adv.name === "Attack Specialization") {
    boxSpec.style.display = "block";
    const baseWeapons = [
      { value: "Unarmed", label: "Unarmed Combat" },
      { value: "Swords", label: "Swords / Blades" },
      { value: "Bows", label: "Bows / Archery" },
      { value: "Pistols", label: "Pistols / Sidearms" },
      { value: "Rifles", label: "Rifles / Longarms" },
      { value: "Throwing", label: "Throwing Weapons" },
      { value: "Claws", label: "Claws / Natural Weapons" }
    ];

    const strikePowers = (typeof window.getCharacterMeleeDamagePowers === 'function')
      ? window.getCharacterMeleeDamagePowers(char).map(p => ({ value: p, label: `${p} (Melee Damage Power)` }))
      : [];
    const blastPowers = (typeof window.getCharacterRangedDamagePowers === 'function')
      ? window.getCharacterRangedDamagePowers(char).map(p => ({ value: p, label: `${p} (Ranged Damage Power)` }))
      : [];
    const allAttacks = [...baseWeapons, ...strikePowers, ...blastPowers];

    const takenSpecializations = new Set();
    if (char && char.feats) {
      Object.keys(char.feats).forEach(fKey => {
        if (fKey.startsWith("Attack Specialization (") && fKey.endsWith(")")) {
          const spec = fKey.replace(/^Attack Specialization \(/, "").replace(/\)$/, "").trim().toLowerCase();
          takenSpecializations.add(spec);
        }
      });
    }

    const availableAttacks = allAttacks.filter(atk => !takenSpecializations.has(atk.value.toLowerCase()));

    boxSpec.innerHTML = `
      <label style="font-weight: 600; font-size: var(--font-size-labels); display: block; margin-bottom: 4px;">Choose Specific Attack or Weapon (+2 attack bonus / rank):</label>
      <select id="selFeatSpecOption" style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; margin-bottom: 6px;" onchange="window.onFeatSpecOptionChange()">
        ${availableAttacks.map(atk => `<option value="${atk.value.replace(/"/g, '&quot;')}">${atk.label}</option>`).join('')}
        <option value="__custom__">Custom Weapon / Attack...</option>
      </select>
      <input type="text" id="txtFeatCustomSpec" placeholder="Enter weapon or attack power name..." style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; display: none;">
      <div class="secondary-text" style="font-size: var(--font-size-secondary);">
        <em>Can be taken multiple times for different weapons or attacks.</em>
      </div>
    `;
  } else if (adv.name === "Favored Environment") {
    boxSpec.style.display = "block";
    const envOptions = [
      { value: "Airborne", label: "Airborne / In Flight" },
      { value: "Aquatic", label: "Aquatic / Underwater" },
      { value: "Space / Zero-G", label: "Space / Zero-G" },
      { value: "Urban", label: "Urban / Rooftops" },
      { value: "Forest / Jungle", label: "Forest / Jungle" },
      { value: "Arctic", label: "Arctic / Extreme Cold" },
      { value: "Underground", label: "Underground / Caves" }
    ];
    const takenEnv = new Set();
    if (char && char.feats) {
      Object.keys(char.feats).forEach(fKey => {
        if (fKey.startsWith("Favored Environment (") && fKey.endsWith(")")) {
          takenEnv.add(fKey.replace(/^Favored Environment \(/, "").replace(/\)$/, "").trim().toLowerCase());
        }
      });
    }
    const availEnv = envOptions.filter(e => !takenEnv.has(e.value.toLowerCase()));

    boxSpec.innerHTML = `
      <label style="font-weight: 600; font-size: var(--font-size-labels); display: block; margin-bottom: 4px;">Choose Environment (+1 attack or dodge bonus in environment):</label>
      <select id="selFeatSpecOption" style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; margin-bottom: 6px;" onchange="window.onFeatSpecOptionChange()">
        ${availEnv.map(e => `<option value="${e.value.replace(/"/g, '&quot;')}">${e.label}</option>`).join('')}
        <option value="__custom__">Custom Environment...</option>
      </select>
      <input type="text" id="txtFeatCustomSpec" placeholder="Enter environment name..." style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; display: none;">
    `;
  } else if (adv.name === "Favored Opponent") {
    boxSpec.style.display = "block";
    const oppOptions = [
      { value: "Aliens", label: "Aliens / Extraterrestrials" },
      { value: "Animals", label: "Animals / Beasts" },
      { value: "Criminals", label: "Criminals / Underworld" },
      { value: "Demons / Fiends", label: "Demons / Fiends" },
      { value: "Mutants", label: "Mutants" },
      { value: "Psionics", label: "Psionics / Mentalists" },
      { value: "Robots / Machines", label: "Robots / Artificial Intelligences" },
      { value: "Spellcasters", label: "Spellcasters / Sorcerers" },
      { value: "Undead", label: "Undead / Vampires / Zombies" }
    ];
    const takenOpp = new Set();
    if (char && char.feats) {
      Object.keys(char.feats).forEach(fKey => {
        if (fKey.startsWith("Favored Opponent (") && fKey.endsWith(")")) {
          takenOpp.add(fKey.replace(/^Favored Opponent \(/, "").replace(/\)$/, "").trim().toLowerCase());
        }
      });
    }
    const availOpp = oppOptions.filter(o => !takenOpp.has(o.value.toLowerCase()));

    boxSpec.innerHTML = `
      <label style="font-weight: 600; font-size: var(--font-size-labels); display: block; margin-bottom: 4px;">Choose Opponent Type (+1 damage &amp; interaction bonus):</label>
      <select id="selFeatSpecOption" style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; margin-bottom: 6px;" onchange="window.onFeatSpecOptionChange()">
        ${availOpp.map(o => `<option value="${o.value.replace(/"/g, '&quot;')}">${o.label}</option>`).join('')}
        <option value="__custom__">Custom Opponent Type...</option>
      </select>
      <input type="text" id="txtFeatCustomSpec" placeholder="Enter opponent category..." style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; display: none;">
    `;
  } else if (adv.name === "Ultimate Effort") {
    boxSpec.style.display = "block";
    boxSpec.innerHTML = `
      <label style="font-weight: 600; font-size: var(--font-size-labels); display: block; margin-bottom: 4px;">Choose Task or Check (Treat roll as 20 for 1 Hero Point):</label>
      <select id="selFeatSpecOption" style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; margin-bottom: 6px;" onchange="window.onFeatSpecOptionChange()">
        <option value="Toughness Save">Toughness Saving Throw</option>
        <option value="Fortitude Save">Fortitude Saving Throw</option>
        <option value="Reflex Save">Reflex Saving Throw</option>
        <option value="Will Save">Will Saving Throw</option>
        <option value="Aim">Aim (Attack Roll)</option>
        <option value="Power Check">Power Check</option>
        <option value="Skill Check">Skill Check</option>
        <option value="__custom__">Custom Task...</option>
      </select>
      <input type="text" id="txtFeatCustomSpec" placeholder="Enter task or check name..." style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; display: none;">
    `;
  } else if (adv.name === "Benefit") {
    boxSpec.style.display = "block";
    boxSpec.innerHTML = `
      <label style="font-weight: 600; font-size: var(--font-size-labels); display: block; margin-bottom: 4px;">Choose Social or Legal Benefit:</label>
      <select id="selFeatSpecOption" style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; margin-bottom: 6px;" onchange="window.onFeatSpecOptionChange()">
        <option value="Wealth">Wealth (Significant wealth and assets)</option>
        <option value="Status">Status (High rank, aristocracy, fame)</option>
        <option value="Security Clearance">Security Clearance</option>
        <option value="Diplomatic Immunity">Diplomatic Immunity</option>
        <option value="Alternate Identity">Alternate Identity</option>
        <option value="__custom__">Custom Benefit...</option>
      </select>
      <input type="text" id="txtFeatCustomSpec" placeholder="Enter benefit description..." style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; display: none;">
    `;
  } else if (adv.name === "Environmental Adaptation") {
    boxSpec.style.display = "block";
    const adaOptions = [
      { value: "Underwater", label: "Underwater / Aquatic" },
      { value: "Zero-G", label: "Zero-G / Weightlessness" },
      { value: "Heavy Gravity", label: "Heavy Gravity" },
      { value: "High Altitude", label: "High Altitude / Thin Atmosphere" },
      { value: "Extreme Cold", label: "Extreme Cold" },
      { value: "Extreme Heat", label: "Extreme Heat" }
    ];
    const takenAda = new Set();
    if (char && char.feats) {
      Object.keys(char.feats).forEach(fKey => {
        if (fKey.startsWith("Environmental Adaptation (") && fKey.endsWith(")")) {
          takenAda.add(fKey.replace(/^Environmental Adaptation \(/, "").replace(/\)$/, "").trim().toLowerCase());
        }
      });
    }
    const availAda = adaOptions.filter(a => !takenAda.has(a.value.toLowerCase()));

    boxSpec.innerHTML = `
      <label style="font-weight: 600; font-size: var(--font-size-labels); display: block; margin-bottom: 4px;">Choose Environment (Ignore operating penalties):</label>
      <select id="selFeatSpecOption" style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; margin-bottom: 6px;" onchange="window.onFeatSpecOptionChange()">
        ${availAda.map(a => `<option value="${a.value.replace(/"/g, '&quot;')}">${a.label}</option>`).join('')}
        <option value="__custom__">Custom Environment...</option>
      </select>
      <input type="text" id="txtFeatCustomSpec" placeholder="Enter environment name..." style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; display: none;">
    `;
  } else if (adv.name === "Skill Mastery") {
    boxSpec.style.display = "block";
    boxSpec.innerHTML = `
      <div class="secondary-text" style="font-size: var(--font-size-secondary); line-height: 1.4;">
        <strong>Skill Mastery:</strong> Allows taking 10 on 4 chosen skills even when stressed or under pressure. You can configure the specific skills directly from the Feats tab after adding.
      </div>
    `;
  } else if (adv.name === "Sidekick" || adv.name === "Minions") {
    boxSpec.style.display = "block";
    boxSpec.innerHTML = `
      <div class="secondary-text" style="font-size: var(--font-size-secondary); line-height: 1.4;">
        <strong>${adv.name}:</strong> Grants a PP budget to build independent companions. You can create and edit their full character sheets directly from the Feats tab or Companions &amp; Forms tab after adding.
      </div>
    `;
  } else if (adv.name === "Electromagnetic Seal") {
    boxSpec.style.display = "block";
    const r = numRank ? (parseInt(numRank.value) || 1) : 1;
    const existingSealBadge = document.getElementById("lblEMSealBadge");
    if (!isNewFeatSelected && existingSealBadge) {
      existingSealBadge.textContent = `Rank ${r}`;
      const note = document.getElementById("emSealRankNote");
      const rad = document.querySelector('input[name="radEMSealType"]:checked');
      if (note) {
        if (rad && rad.value === "base") {
          note.textContent = "🛡️ Base Radiation & Cosmic Ray Seal selected (Rank 1 - 1 MP).";
        } else if (rad && rad.value === "insubstantial") {
          note.textContent = `⚡ Insubstantial Protection selected (Rank ${r} - ${r} MP).`;
        } else if (rad && rad.value === "perception") {
          note.textContent = `⚡ Perception Attack Protection selected (Rank ${r} - ${r} MP).`;
        }
      }
      return;
    }

    boxSpec.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
        <label style="font-weight: 700; font-size: var(--font-size-labels); color: #0284c7; margin: 0;">
          ⚙️ Electromagnetic Seal Protection Modes:
        </label>
        <span class="badge" id="lblEMSealBadge" style="background: var(--accent-primary); font-size: var(--font-size-tags);">Rank ${r}</span>
      </div>
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; padding: 8px 10px; margin-bottom: 6px; display: flex; flex-direction: column; gap: 6px;">
        <!-- Option 1: Base Seal -->
        <label style="display: flex; align-items: flex-start; gap: 8px; cursor: pointer; font-size: var(--font-size-controls);">
          <input type="radio" name="radEMSealType" value="base" ${r <= 1 ? "checked" : ""} onchange="window.toggleEMSealType();">
          <div>
            <strong>Rank 1: Base Radiation &amp; Cosmic Ray Seal</strong>
            <div class="secondary-text" style="font-size: var(--font-size-secondary); margin-top: 2px;">
              Protects cockpit and crew from radiation, cosmic rays, and extreme space energy conditions.
            </div>
          </div>
        </label>

        <!-- Option 2: Insubstantial Protection -->
        <label style="display: flex; align-items: flex-start; gap: 8px; cursor: pointer; font-size: var(--font-size-controls); border-top: 1px dashed var(--border-color); padding-top: 6px;">
          <input type="radio" name="radEMSealType" value="insubstantial" ${r >= 2 ? "checked" : ""} onchange="window.toggleEMSealType();">
          <div style="flex: 1;">
            <strong>Rank 2+: Insubstantial Protection</strong>
            <div class="secondary-text" style="font-size: var(--font-size-secondary); margin-top: 2px;">
              Hardens seal against permeable physical, gaseous, or energy forms.
            </div>
            <div id="boxEMSealInsub" style="margin-top: 6px; display: ${r >= 2 ? 'block' : 'none'};">
              <label style="font-size: var(--font-size-secondary); font-weight: 600; display: block; margin-bottom: 2px;">Form Protected Against:</label>
              <select id="selEMSealInsub" style="width: 100%; font-size: var(--font-size-controls); padding: 4px 6px;">
                <option value="Rank 1 (Gaseous / Vaporous)">Rank 1: Gaseous &amp; Vaporous Forms</option>
                <option value="Rank 2 (Liquid Forms)">Rank 2: Liquid Forms</option>
                <option value="Rank 3 (Energy &amp; Plasma Forms)">Rank 3: Energy &amp; Plasma Forms</option>
                <option value="Rank 4 (Incorporeal / Spirits)">Rank 4: Incorporeal &amp; Disembodied Spirits</option>
              </select>
            </div>
          </div>
        </label>

        <!-- Option 3: Perception Attack Protection -->
        <label style="display: flex; align-items: flex-start; gap: 8px; cursor: pointer; font-size: var(--font-size-controls); border-top: 1px dashed var(--border-color); padding-top: 6px;">
          <input type="radio" name="radEMSealType" value="perception" onchange="window.toggleEMSealType();">
          <div style="flex: 1;">
            <strong>Rank 2+: Perception Attack Protection</strong>
            <div class="secondary-text" style="font-size: var(--font-size-secondary); margin-top: 2px;">
              Frequency baffling protects against sensory overload and perception-range attacks.
            </div>
            <div id="boxEMSealPerception" style="margin-top: 6px; display: none;">
              <label style="font-size: var(--font-size-secondary); font-weight: 600; display: block; margin-bottom: 2px;">Perception-Range Effect Protected Against:</label>
              <select id="selEMSealPerception" style="width: 100%; font-size: var(--font-size-controls); padding: 4px 6px;" onchange="window.onEMSealPerceptionChange();">
                <option value="Visual Dazzle / Blinding Flashes">Visual Dazzle / Blinding Flashes</option>
                <option value="Auditory Dazzle / Sonic Deafening">Auditory Dazzle / Sonic Deafening</option>
                <option value="Mental Attacks / Psionic Blast">Mental Attacks / Psionic Blast</option>
                <option value="Sensory Overload">Sensory Overload</option>
                <option value="__custom__">Custom Perception Effect...</option>
              </select>
              <input type="text" id="txtEMSealPerceptionCustom" placeholder="Enter custom effect name..." style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; margin-top: 4px; display: none;">
            </div>
          </div>
        </label>
      </div>
      <div id="emSealRankNote" style="margin-top: 4px; font-size: var(--font-size-secondary); color: var(--accent-primary); font-weight: 500;">
        ${r <= 1 ? "💡 Choose Base Seal (Rank 1) or select an Insubstantial / Perception upgrade (Rank 2+)." : `✨ Configured for Rank ${r}.`}
      </div>
    `;
  } else if (adv.name === "Ejector Seat") {
    boxSpec.style.display = "block";
    const r = numRank ? (parseInt(numRank.value) || 1) : 1;
    const existingEjectorBadge = document.getElementById("lblEjectorBadge");
    if (!isNewFeatSelected && existingEjectorBadge) {
      existingEjectorBadge.textContent = `Rank ${r}`;
      return;
    }
    boxSpec.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
        <label style="font-weight: 700; font-size: var(--font-size-labels); color: #0284c7; margin: 0;">
          ⚙️ Ejector Seat Sub-Options &amp; Upgrades:
        </label>
        <span class="badge" id="lblEjectorBadge" style="background: var(--accent-primary); font-size: var(--font-size-tags);">Rank ${r}</span>
      </div>
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; padding: 8px 10px; margin-bottom: 6px; display: flex; flex-direction: column; gap: 6px;">
        <!-- Option 1: Base Launch -->
        <label style="display: flex; align-items: flex-start; gap: 8px; cursor: pointer; font-size: var(--font-size-controls);">
          <input type="radio" name="radEjectorType" value="base" ${r <= 1 ? "checked" : ""} onchange="window.toggleEjectorType();">
          <div>
            <strong>Rank 1: Base Ejection Launch</strong>
            <div class="secondary-text" style="font-size: var(--font-size-secondary); margin-top: 2px;">
              Launches pilot and crew safely as a reaction with Leaping 5 distance (250 ft).
            </div>
          </div>
        </label>

        <!-- Option 2: Seat Upgrade -->
        <label style="display: flex; align-items: flex-start; gap: 8px; cursor: pointer; font-size: var(--font-size-controls); border-top: 1px dashed var(--border-color); padding-top: 6px;">
          <input type="radio" name="radEjectorType" value="upgrade" ${r >= 2 ? "checked" : ""} onchange="window.toggleEjectorType();">
          <div style="flex: 1;">
            <strong>Rank 2+: Seat Upgrade Sub-Option</strong>
            <div class="secondary-text" style="font-size: var(--font-size-secondary); margin-top: 2px;">
              Equips the ejection pod with parachute/flight systems, life support, or booster rockets.
            </div>
            <div id="boxEjectorUpgrade" style="margin-top: 6px; display: ${r >= 2 ? 'block' : 'none'};">
              <label style="font-size: var(--font-size-secondary); font-weight: 600; display: block; margin-bottom: 2px;">Choose Seat Upgrade:</label>
              <select id="selFeatSpecOption" style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; margin-bottom: 4px;" onchange="window.onFeatSpecOptionChange();">
                <option value="Parachute / Glider Thruster Flight Pack">Parachute / Glider Thruster Flight Pack (Flight Systems)</option>
                <option value="Survival Pod Environmental Seal">Survival Pod Environmental Seal (Life Support)</option>
                <option value="Cockpit Capsule Electromagnetic Seal">Cockpit Capsule Electromagnetic Seal (Radiation &amp; Energy)</option>
                <option value="Extended Booster Rocket (+1 Rank Leaping)">Extended Booster Rocket (+1 Rank Leaping / 500 ft)</option>
                <option value="Emergency Beacon &amp; Auto-Inflatable Life Raft">Emergency Beacon &amp; Auto-Inflatable Life Raft</option>
                <option value="__custom__">Custom Seat Upgrade...</option>
              </select>
              <input type="text" id="txtFeatCustomSpec" placeholder="Enter upgrade specification..." style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; display: none;">
            </div>
          </div>
        </label>
      </div>
      <div id="ejectorRankNote" style="margin-top: 4px; font-size: var(--font-size-secondary); color: var(--accent-primary); font-weight: 500;">
        ${r <= 1 ? "💡 Choose Base Launch (Rank 1) or select a Seat Upgrade (Rank 2+)." : `✨ Configured for Rank ${r}.`}
      </div>
    `;
  } else if (adv.name === "Environmental Seal") {
    boxSpec.style.display = "block";
    const r = numRank ? (parseInt(numRank.value) || 1) : 1;
    const durText = window.getEnvSealDuration(r);
    const existingEnvBadge = document.getElementById("lblEnvSealBadge");
    if (!isNewFeatSelected && existingEnvBadge) {
      existingEnvBadge.textContent = `Rank ${r}`;
      const durEl = document.getElementById("lblEnvSealDuration");
      if (durEl) durEl.textContent = durText;
      return;
    }
    boxSpec.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
        <label style="font-weight: 700; font-size: var(--font-size-labels); color: #0284c7; margin: 0;">
          ⚙️ Environmental Seal Sub-Options:
        </label>
        <span class="badge" id="lblEnvSealBadge" style="background: var(--accent-primary); font-size: var(--font-size-tags);">Rank ${r}</span>
      </div>
      <label style="font-weight: 600; font-size: var(--font-size-labels); display: block; margin-bottom: 4px;">Primary Operating Medium / Atmosphere:</label>
      <select id="selFeatSpecOption" style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; margin-bottom: 6px;" onchange="window.onFeatSpecOptionChange()">
        <option value="Vacuum &amp; Deep Space">Vacuum &amp; Deep Space</option>
        <option value="Oceanic Depths (High Pressure Aquatic)">Oceanic Depths (High Pressure Aquatic)</option>
        <option value="Corrosive Acid &amp; Chemical Gas">Corrosive Acid &amp; Chemical Gas</option>
        <option value="Toxic / Biological Alien Atmosphere">Toxic / Biological Alien Atmosphere</option>
        <option value="Volcanic / Superheated Plasma">Volcanic / Superheated Plasma</option>
        <option value="Cryogenic / Sub-Zero Extreme">Cryogenic / Sub-Zero Extreme</option>
        <option value="__custom__">Custom Operating Environment...</option>
      </select>
      <input type="text" id="txtFeatCustomSpec" placeholder="Enter environment name..." style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; margin-bottom: 6px; display: none;">
      <div style="padding: 4px 8px; background: rgba(2, 132, 199, 0.1); border-radius: 4px; font-size: var(--font-size-secondary);">
        ⏱️ <strong>Sealed Life Support Duration:</strong> <span id="lblEnvSealDuration">${durText}</span>
      </div>
    `;
  } else if (adv.name === "Equipment Mount") {
    boxSpec.style.display = "block";
    const r = numRank ? (parseInt(numRank.value) || 1) : 1;
    const gradeText = window.getMountGradeText(r);
    const opts = (typeof MECHA_SUBOPTIONS_MAP !== 'undefined' && MECHA_SUBOPTIONS_MAP["Equipment Mount"]) ? MECHA_SUBOPTIONS_MAP["Equipment Mount"] : [];
    const prevSelects = boxSpec.querySelectorAll(".modal-mecha-slot-select");
    const prevValues = Array.from(prevSelects).map(s => s.value);

    if (r <= 1) {
      const selectedVal = prevValues[0] || (opts[0] ? opts[0].value : "Right Shoulder Hardpoint");
      boxSpec.innerHTML = `
        <div style="display: flex; gap: 6px; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
            <label style="font-weight: 700; font-size: var(--font-size-labels); color: #0284c7; margin: 0;">
              ⚙️ Equipment Mount Sub-Options:
            </label>
            <span class="badge" id="lblMountBadge" style="background: var(--accent-primary); font-size: var(--font-size-tags);">Rank 1</span>
          </div>
          <div style="margin-bottom: 4px;">
            <span style="font-weight: 600; font-size: var(--font-size-labels);">Mount Capability:</span>
            <span id="lblMountGrade" style="font-size: var(--font-size-secondary); color: var(--accent-primary); font-weight: 600;">${gradeText}</span>
          </div>
          <label style="font-weight: 600; font-size: var(--font-size-labels); display: block; margin-bottom: 2px;">Hardpoint Mounting Location:</label>
          <select id="selFeatSpecOption" class="modal-mecha-slot-select" data-slot="0" style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px;" onchange="window.onFeatSpecOptionChange()">
            ${opts.map(o => `<option value="${o.value.replace(/"/g, '&quot;')}" ${o.value === selectedVal ? 'selected' : ''}>${o.value}</option>`).join('')}
            <option value="__custom__">Custom Hardpoint Location...</option>
          </select>
          <input type="text" id="txtFeatCustomSpec" placeholder="Enter hardpoint location..." style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; display: none;">
        </div>
      `;
    } else {
      boxSpec.innerHTML = `
        <div style="display: flex; gap: 6px; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
            <label style="font-weight: 700; font-size: var(--font-size-labels); color: #0284c7; margin: 0;">
              ⚙️ Equipment Mount Sub-Options (${r} Ranks = ${r} Mounts):
            </label>
            <span class="badge" id="lblMountBadge" style="background: var(--accent-primary); font-size: var(--font-size-tags);">Rank ${r}</span>
          </div>
          <div style="margin-bottom: 4px;">
            <span style="font-weight: 600; font-size: var(--font-size-labels);">Mount Capability:</span>
            <span id="lblMountGrade" style="font-size: var(--font-size-secondary); color: var(--accent-primary); font-weight: 600;">${gradeText}</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px; max-height: 160px; overflow-y: auto; padding-right: 4px;">
            ${Array.from({ length: r }).map((_, idx) => {
              const otherTaken = prevValues.filter((v, i) => i !== idx && v);
              const availOpts = opts.filter(o => !otherTaken.includes(o.value));
              const optsToRender = availOpts.length > 0 ? availOpts : opts;
              const slotVal = prevValues[idx] || (optsToRender[0] ? optsToRender[0].value : opts[0].value);
              return `
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: var(--font-size-minor-controls); font-weight: 700; color: #0284c7; min-width: 65px;">Mount #${idx + 1}:</span>
                <select class="modal-mecha-slot-select" data-slot="${idx}" style="flex: 1; font-size: var(--font-size-controls); padding: 3px 6px;" onchange="window.onFeatSpecOptionChange()">
                  ${optsToRender.map(o => `<option value="${o.value.replace(/"/g, '&quot;')}" ${o.value === slotVal ? 'selected' : ''}>${o.value}</option>`).join('')}
                </select>
              </div>
            `;
            }).join('')}
          </div>
        </div>
      `;
    }
  } else if (typeof MECHA_SUBOPTIONS_MAP !== 'undefined' && MECHA_SUBOPTIONS_MAP[adv.name]) {
    boxSpec.style.display = "block";
    const opts = MECHA_SUBOPTIONS_MAP[adv.name];
    const r = numRank ? (parseInt(numRank.value) || 1) : 1;
    const prevSelects = boxSpec.querySelectorAll(".modal-mecha-slot-select");
    const prevValues = Array.from(prevSelects).map(s => s.value);

    if (r <= 1) {
      const selectedVal = prevValues[0] || (opts[0] ? opts[0].value : "");
      boxSpec.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <label style="font-weight: 700; font-size: var(--font-size-labels); color: #0284c7; margin: 0;">
            ⚙️ ${adv.name} Sub-Options:
          </label>
          <span class="badge" style="background: var(--accent-primary); font-size: var(--font-size-tags);">Rank 1</span>
        </div>
        <label style="font-weight: 600; font-size: var(--font-size-labels); display: block; margin-bottom: 4px;">Choose Sub-Option / Specification:</label>
        <select id="selFeatSpecOption" class="modal-mecha-slot-select" data-slot="0" style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; margin-bottom: 6px;" onchange="window.onFeatSpecOptionChange()">
          ${opts.map(o => `<option value="${o.value.replace(/"/g, '&quot;')}" ${o.value === selectedVal ? 'selected' : ''}>${o.value}</option>`).join('')}
          <option value="__custom__">Custom Sub-Option...</option>
        </select>
        <input type="text" id="txtFeatCustomSpec" placeholder="Enter custom specification..." style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; display: none;">
      `;
    } else {
      boxSpec.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <label style="font-weight: 700; font-size: var(--font-size-labels); color: #0284c7; margin: 0;">
            ⚙️ ${adv.name} Sub-Options (${r} Ranks = ${r} Choices):
          </label>
          <span class="badge" style="background: var(--accent-primary); font-size: var(--font-size-tags);">Rank ${r}</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px; max-height: 160px; overflow-y: auto; padding-right: 4px;">
          ${Array.from({ length: r }).map((_, idx) => {
            const otherTaken = prevValues.filter((v, i) => i !== idx && v);
            const availOpts = opts.filter(o => !otherTaken.includes(o.value));
            const optsToRender = availOpts.length > 0 ? availOpts : opts;
            const slotVal = prevValues[idx] || (optsToRender[0] ? optsToRender[0].value : opts[0].value);
            return `
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: var(--font-size-minor-controls); font-weight: 700; color: #0284c7; min-width: 50px;">Slot #${idx + 1}:</span>
              <select class="modal-mecha-slot-select" data-slot="${idx}" style="flex: 1; font-size: var(--font-size-controls); padding: 3px 6px;" onchange="window.onFeatSpecOptionChange()">
                ${optsToRender.map(o => `<option value="${o.value.replace(/"/g, '&quot;')}" ${o.value === slotVal ? 'selected' : ''}>${o.value}</option>`).join('')}
              </select>
            </div>
          `;
          }).join('')}
        </div>
      `;
    }
  } else if (adv.focused) {
    boxSpec.style.display = "block";
    boxSpec.innerHTML = `
      <label style="font-weight: 600; font-size: var(--font-size-labels); display: block; margin-bottom: 4px;">Specify Choice / Detail:</label>
      <input type="text" id="txtFeatCustomSpec" placeholder="Specify detail or application..." style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px;">
    `;
  } else {
    boxSpec.style.display = "none";
    boxSpec.innerHTML = "";
  }
};

window.getEnvSealDuration = function(rank) {
  const r = parseInt(rank) || 1;
  switch(r) {
    case 1: return "5 hours";
    case 2: return "24 hours (1 day)";
    case 3: return "5 days";
    case 4: return "2 weeks";
    case 5: return "1 month";
    case 6: return "2 months";
    case 7: return "6 months";
    case 8: return "1 year";
    case 9: return "5 years";
    default: return r >= 10 ? "Perpetual Autonomous Life Support (Unlimited)" : "5 hours";
  }
};

window.getMountGradeText = function(rank) {
  const r = parseInt(rank) || 1;
  if (r === 1) return "Rank 1: Dedicated Hardpoint (Specific Pod/Weapon)";
  if (r === 2) return "Rank 2: Universal Hardpoint (Any matching item)";
  return "Rank 3+: Smart-Linked Hardpoint (Full interface & bus)";
};

window.toggleEMSealType = function() {
  const rad = document.querySelector('input[name="radEMSealType"]:checked');
  const boxInsub = document.getElementById("boxEMSealInsub");
  const boxPercept = document.getElementById("boxEMSealPerception");
  const numRank = document.getElementById("numFeatInitialRank");
  const badge = document.getElementById("lblEMSealBadge");
  const note = document.getElementById("emSealRankNote");
  if (!rad) return;

  if (rad.value === "base") {
    if (boxInsub) boxInsub.style.display = "none";
    if (boxPercept) boxPercept.style.display = "none";
    if (numRank && parseInt(numRank.value) > 1) {
      numRank.value = 1;
    }
    if (badge) badge.textContent = `Rank ${numRank ? numRank.value : 1}`;
    if (note) note.textContent = "🛡️ Base Radiation & Cosmic Ray Seal selected (Rank 1 - 1 MP).";
  } else if (rad.value === "insubstantial") {
    if (boxInsub) boxInsub.style.display = "block";
    if (boxPercept) boxPercept.style.display = "none";
    if (numRank && parseInt(numRank.value) < 2) {
      numRank.value = 2;
    }
    if (badge) badge.textContent = `Rank ${numRank ? numRank.value : 2}`;
    if (note) note.textContent = `⚡ Insubstantial Protection selected (Rank ${numRank ? numRank.value : 2}+ - ${numRank ? numRank.value : 2} MP).`;
  } else if (rad.value === "perception") {
    if (boxInsub) boxInsub.style.display = "none";
    if (boxPercept) boxPercept.style.display = "block";
    if (numRank && parseInt(numRank.value) < 2) {
      numRank.value = 2;
    }
    if (badge) badge.textContent = `Rank ${numRank ? numRank.value : 2}`;
    if (note) note.textContent = `⚡ Perception Attack Protection selected (Rank ${numRank ? numRank.value : 2}+ - ${numRank ? numRank.value : 2} MP).`;
  }
};
window.onEMSealOptionPicked = function() { window.toggleEMSealType(); };

window.toggleEjectorType = function() {
  const rad = document.querySelector('input[name="radEjectorType"]:checked');
  const boxUpgrade = document.getElementById("boxEjectorUpgrade");
  const numRank = document.getElementById("numFeatInitialRank");
  const badge = document.getElementById("lblEjectorBadge");
  const note = document.getElementById("ejectorRankNote");
  if (!rad) return;

  if (rad.value === "base") {
    if (boxUpgrade) boxUpgrade.style.display = "none";
    if (numRank && parseInt(numRank.value) > 1) {
      numRank.value = 1;
    }
    if (badge) badge.textContent = `Rank ${numRank ? numRank.value : 1}`;
    if (note) note.textContent = "🚀 Base Launch System selected (Rank 1 - 1 MP).";
  } else {
    if (boxUpgrade) boxUpgrade.style.display = "block";
    if (numRank && parseInt(numRank.value) < 2) {
      numRank.value = 2;
    }
    if (badge) badge.textContent = `Rank ${numRank ? numRank.value : 2}`;
    if (note) note.textContent = `⚡ Seat Upgrade Sub-Option selected (Rank ${numRank ? numRank.value : 2}+ - ${numRank ? numRank.value : 2} MP).`;
  }
};
window.onEjectorOptionPicked = function() { window.toggleEjectorType(); };

window.onEMSealPerceptionChange = function() {
  const sel = document.getElementById("selEMSealPerception");
  const txt = document.getElementById("txtEMSealPerceptionCustom");
  if (!sel || !txt) return;
  if (sel.value === "__custom__") {
    txt.style.display = "block";
    txt.focus();
  } else {
    txt.style.display = "none";
  }
};

window.onFeatSpecOptionChange = function() {
  const sel = document.getElementById("selFeatSpecOption");
  const txt = document.getElementById("txtFeatCustomSpec");
  if (sel && txt) {
    if (sel.value === "__custom__") {
      txt.style.display = "block";
      txt.focus();
    } else {
      txt.style.display = "none";
    }
  }

  const selFlurry = document.getElementById("selFlurryPrimaryForm");
  const txtFlurry = document.getElementById("txtFlurryCustomPrimary");
  if (selFlurry && txtFlurry) {
    if (selFlurry.value === "__custom__") {
      txtFlurry.style.display = "block";
      txtFlurry.focus();
    } else {
      txtFlurry.style.display = "none";
    }
  }

  const selChoice = document.getElementById("selFeatChoice");
  if (selChoice && selChoice.value === "(Attack) Flurry") {
    const numRank = document.getElementById("numFeatInitialRank");
    const r = numRank ? (parseInt(numRank.value) || 1) : 1;
    const prevSelects = document.querySelectorAll(".modal-flurry-slot-select");
    const prevValues = Array.from(prevSelects).map(s => s.value);
    const pVal = prevValues[0] || (selFlurry ? selFlurry.value : "Unarmed Combat");
    const actualPrimary = (pVal === "__custom__" && txtFlurry && txtFlurry.value.trim()) ? txtFlurry.value.trim() : (pVal === "__custom__" ? "Custom Melee" : pVal);
    const stats = window.calculateFlurryStats(r, [actualPrimary, ...prevValues.slice(1)], char, "(Attack) Flurry");
    const badgeContainer = document.getElementById("flurryLiveStats");
    if (badgeContainer) {
      badgeContainer.innerHTML = `
        <span style="font-weight: 700; color: var(--accent-primary);">⚡ Interval: ${stats.interval} (+1 dmg / ${stats.interval} over Def)</span>
        <span style="font-weight: 700; color: #8b5cf6;">💥 Max Bonus: +${stats.maxBonus}</span>
        <span style="font-weight: 700; color: #10b981;">⚔️ Forms: ${stats.forms.join(', ')}</span>
      `;
    }

    // Refresh upgrade selects so forms assigned elsewhere are filtered out
    const upgradeSelects = document.querySelectorAll("#boxFlurryUpgrades .modal-flurry-slot-select");
    upgradeSelects.forEach((uSel, uIdx) => {
      const curVal = uSel.value;
      const choices = window.getFlurryUpgradeChoicesForSlot(stats, uIdx, char, "(Attack) Flurry");
      if (curVal && !choices.includes(curVal)) choices.unshift(curVal);
      uSel.innerHTML = choices.map(c => `<option value="${c.replace(/"/g, '&quot;')}" ${c === curVal ? 'selected' : ''}>${c}</option>`).join('');
    });
  }

  // Refresh multi-slot mecha/suboptions dropdowns so chosen options are excluded from other slots
  const mechaSelects = document.querySelectorAll(".modal-mecha-slot-select");
  if (mechaSelects.length > 1 && selChoice) {
    const advName = selChoice.value;
    const opts = (typeof MECHA_SUBOPTIONS_MAP !== 'undefined' && MECHA_SUBOPTIONS_MAP[advName]) ? MECHA_SUBOPTIONS_MAP[advName] : [];
    if (opts.length > 0) {
      const curVals = Array.from(mechaSelects).map(s => s.value);
      mechaSelects.forEach((mSel, idx) => {
        const currentVal = mSel.value;
        const otherTaken = curVals.filter((v, i) => i !== idx && v);
        const availOpts = opts.filter(o => !otherTaken.includes(o.value));
        const list = availOpts.length > 0 ? availOpts : opts;
        const hasVal = currentVal && list.some(o => o.value === currentVal);
        const listToRender = (currentVal && !hasVal) ? [{ value: currentVal }, ...list] : list;
        mSel.innerHTML = listToRender.map(o => `<option value="${o.value.replace(/"/g, '&quot;')}" ${o.value === currentVal ? 'selected' : ''}>${o.value}</option>`).join('');
      });
    }
  }
};

window.extractFeatSpecification = function(adv, ranksToAdd) {
  let finalName = adv.name;
  let specDetail = "";
  let finalRanks = ranksToAdd;

  if (adv.name === "(Attack) Flurry") {
    const selP = document.getElementById("selFlurryPrimaryForm");
    const txtP = document.getElementById("txtFlurryCustomPrimary");
    let primary = "Unarmed Combat";
    if (selP && selP.value === "__custom__") {
      primary = txtP ? txtP.value.trim() : "Custom Melee";
    } else if (selP) {
      primary = selP.value;
    }
    if (!primary) primary = "Unarmed Combat";

    const upgradeSelects = document.querySelectorAll("#boxFlurryUpgrades .modal-flurry-slot-select");
    const upgrades = Array.from(upgradeSelects).map(s => s.value);
    specDetail = [primary, ...upgrades];
    finalName = adv.name;
    return { finalName, specDetail, ranksToAdd: finalRanks };
  } else if (adv.name === "Attack Focus") {
    const rad = document.querySelector('input[name="radAttackFocusType"]:checked');
    const type = rad ? rad.value : "Melee";
    finalName = `Attack Focus (${type})`;
    specDetail = type;
  } else if (adv.name === "Electromagnetic Seal") {
    const rad = document.querySelector('input[name="radEMSealType"]:checked');
    const sealType = rad ? rad.value : (finalRanks >= 2 ? "insubstantial" : "base");
    if (sealType === "insubstantial") {
      const sel = document.getElementById("selEMSealInsub");
      const val = sel ? sel.value : "Rank 1 (Gaseous / Vaporous)";
      specDetail = [`Insubstantial: ${val}`];
      if (finalRanks < 2) finalRanks = 2;
    } else if (sealType === "perception") {
      const sel = document.getElementById("selEMSealPerception");
      const txt = document.getElementById("txtEMSealPerceptionCustom");
      const val = (sel && sel.value === "__custom__") ? (txt ? txt.value.trim() : "Custom") : (sel ? sel.value : "Visual Dazzle / Blinding Flashes");
      specDetail = [`Perception: ${val}`];
      if (finalRanks < 2) finalRanks = 2;
    } else {
      specDetail = ["Base Seal (Radiation & Cosmic Rays)"];
    }
    finalName = adv.name;
    return { finalName, specDetail, ranksToAdd: finalRanks };
  } else if (adv.name === "Ejector Seat") {
    const rad = document.querySelector('input[name="radEjectorType"]:checked');
    const ejectType = rad ? rad.value : (finalRanks >= 2 ? "upgrade" : "base");
    if (ejectType === "upgrade") {
      const sel = document.getElementById("selFeatSpecOption");
      const txt = document.getElementById("txtFeatCustomSpec");
      const upVal = (sel && sel.value === "__custom__") ? (txt ? txt.value.trim() : "Custom") : (sel ? sel.value : "Parachute / Glider Thruster Flight Pack");
      specDetail = [upVal];
      if (finalRanks < 2) finalRanks = 2;
    } else {
      specDetail = ["Leaping 5 Launch Distance"];
    }
    finalName = adv.name;
    return { finalName, specDetail, ranksToAdd: finalRanks };
  } else if (adv.name === "Environmental Seal") {
    const sel = document.getElementById("selFeatSpecOption");
    const txt = document.getElementById("txtFeatCustomSpec");
    const chosenEnv = (sel && sel.value === "__custom__") ? (txt ? txt.value.trim() : "Custom") : (sel ? sel.value : "Vacuum & Deep Space");
    specDetail = [chosenEnv];
    finalName = adv.name;
    return { finalName, specDetail, ranksToAdd: finalRanks };
  } else if (adv.name === "Equipment Mount") {
    const slotSelects = document.querySelectorAll(".modal-mecha-slot-select");
    if (slotSelects && slotSelects.length > 0) {
      const chosenSlots = Array.from(slotSelects).map(s => s.value);
      specDetail = chosenSlots;
      finalName = `Equipment Mount`;
      return { finalName, specDetail, ranksToAdd: finalRanks };
    }
    const sel = document.getElementById("selFeatSpecOption");
    const txt = document.getElementById("txtFeatCustomSpec");
    const loc = (sel && sel.value === "__custom__") ? (txt ? txt.value.trim() : "Custom") : (sel ? sel.value : "Right Shoulder Hardpoint");
    specDetail = [loc];
    finalName = `Equipment Mount`;
    return { finalName, specDetail, ranksToAdd: finalRanks };
  } else if (typeof FEAT_SUBOPTIONS_MAP !== 'undefined' && FEAT_SUBOPTIONS_MAP[adv.name]) {
    const slotSelects = document.querySelectorAll(".modal-mecha-slot-select");
    if (slotSelects && slotSelects.length > 0) {
      const chosenSlots = Array.from(slotSelects).map(s => s.value);
      specDetail = chosenSlots;
      finalName = adv.name;
      return { finalName, specDetail, ranksToAdd: finalRanks };
    }
    const sel = document.getElementById("selFeatSpecOption");
    const txt = document.getElementById("txtFeatCustomSpec");
    let chosen = "";
    if (sel && sel.value === "__custom__") {
      chosen = txt ? txt.value.trim() : "";
    } else if (sel) {
      chosen = sel.value;
    }
    if (!chosen && FEAT_SUBOPTIONS_MAP[adv.name][0]) {
      chosen = FEAT_SUBOPTIONS_MAP[adv.name][0].value;
    }
    specDetail = [chosen || "Standard"];
    finalName = adv.name;
    return { finalName, specDetail, ranksToAdd: finalRanks };
  } else if ([
    "Attack Specialization", "Favored Environment", "Favored Opponent", "Ultimate Effort", "Benefit", "Environmental Adaptation"
  ].includes(adv.name)) {
    const sel = document.getElementById("selFeatSpecOption");
    const txt = document.getElementById("txtFeatCustomSpec");
    let chosen = "";
    if (sel && sel.value === "__custom__") {
      chosen = txt ? txt.value.trim() : "";
    } else if (sel) {
      chosen = sel.value;
    }
    if (!chosen) chosen = "General";
    finalName = `${adv.name} (${chosen})`;
    specDetail = chosen;
  } else if (adv.focused) {
    const txt = document.getElementById("txtFeatCustomSpec");
    if (txt && txt.value.trim()) {
      specDetail = txt.value.trim();
      finalName = `${adv.name} (${specDetail})`;
    }
  }

  return { finalName, specDetail, ranksToAdd: finalRanks };
};

window.getDefaultFeatSpecification = function(adv) {
  const defaults = {
    "Attack Focus": "Melee",
    "Attack Specialization": "Unarmed",
    "Favored Environment": "Airborne",
    "Favored Opponent": "Criminals",
    "Ultimate Effort": "Toughness Save",
    "Benefit": "Wealth",
    "Environmental Adaptation": "Underwater",
    "Electromagnetic Seal": "Base Seal (Radiation & Cosmic Rays)",
    "Environmental Seal": "Vacuum & Deep Space",
    "Ejector Seat": "Leaping 5 Launch Distance",
    "Equipment Mount": "Right Shoulder Hardpoint",
    "(Attack) Flurry": ["Unarmed Combat"],
    "Uncanny Dodge": ["Auditory (Hearing)"],
    "Second Chance": ["Falling Damage (Toughness save)"],
    "Challenge": ["Improved Demoralize (Intimidate as Move action)"],
    "Favored Conditions": ["When Outnumbered (2+ opponents)"],
    "Interface": ["Computers (Hacking & Systems)"],
    "Fascinate": ["Bluff (Captivate with deception / stories)"],
    "Distract": ["Bluff (Trick / feint distraction)"]
  };
  let spec = defaults[adv.name];
  if (!spec && typeof FEAT_SUBOPTIONS_MAP !== 'undefined' && FEAT_SUBOPTIONS_MAP[adv.name] && FEAT_SUBOPTIONS_MAP[adv.name][0]) {
    spec = FEAT_SUBOPTIONS_MAP[adv.name][0].value;
  }
  const isOptionFeat = adv.name === "(Attack) Flurry" || (typeof FEAT_SUBOPTIONS_MAP !== 'undefined' && !!FEAT_SUBOPTIONS_MAP[adv.name]) || adv.category === "Mecha";
  if (isOptionFeat) {
    return {
      finalName: adv.name,
      specDetail: Array.isArray(spec) ? spec : (spec ? [spec] : []),
      ranksToAdd: 1
    };
  }
  if (!spec) spec = "";
  return {
    finalName: spec ? `${adv.name} (${spec})` : adv.name,
    specDetail: spec,
    ranksToAdd: 1
  };
};

window.confirmAddFeat = function() {
  const now = Date.now();
  if (window._lastConfirmFeatTime && (now - window._lastConfirmFeatTime < 350)) {
    return;
  }
  window._lastConfirmFeatTime = now;

  const selChoice = document.getElementById("selFeatChoice");
  const listRef = (typeof FEATS_LIST !== 'undefined') ? FEATS_LIST : ((typeof ADVANTAGES_LIST !== 'undefined') ? ADVANTAGES_LIST : []);

  // Multi-select batch adding if multiple checkboxes are checked
  if (window.selectedFeatCheckboxes && window.selectedFeatCheckboxes.size > 1) {
    let addedCount = 0;
    const activeFeat = selChoice ? selChoice.value : "";
    const numRank = document.getElementById("numFeatInitialRank");
    const activeRanks = numRank ? (parseInt(numRank.value) || 1) : 1;

    window.selectedFeatCheckboxes.forEach(featName => {
      const adv = listRef.find(a => a.name === featName);
      if (!adv) return;

      let finalName = adv.name;
      let specDetail = "";
      let ranksToAdd = 1;

      if (featName === activeFeat) {
        ranksToAdd = activeRanks;
        if (!adv.ranked) ranksToAdd = 1;
        const res = window.extractFeatSpecification(adv, ranksToAdd);
        finalName = res.finalName;
        specDetail = res.specDetail;
        if (res.ranksToAdd) ranksToAdd = res.ranksToAdd;
      } else {
        ranksToAdd = 1;
        const res = window.getDefaultFeatSpecification(adv);
        finalName = res.finalName;
        specDetail = res.specDetail;
        if (res.ranksToAdd) ranksToAdd = res.ranksToAdd;
      }

      const maxRank = char.getAdvantageMaxRank ? char.getAdvantageMaxRank(adv) : (adv.ranked ? 20 : 1);
      if (char.feats[finalName] !== undefined && char.feats[finalName] > 0) {
        char.feats[finalName] = Math.min(maxRank, (char.feats[finalName] || 0) + ranksToAdd);
      } else {
        char.feats[finalName] = Math.min(maxRank, ranksToAdd);
      }

      if (specDetail) {
        char.featDetails[finalName] = specDetail;
      }
      const bKey = finalName.includes(" (") ? finalName.split(" (")[0].trim() : finalName.trim();
      if (finalName === "(Attack) Flurry") {
        char.featDetails[finalName] = specDetail || ["Unarmed Combat"];
      } else if (typeof FEAT_SUBOPTIONS_MAP !== 'undefined' && (FEAT_SUBOPTIONS_MAP[bKey] || bKey === "Electromagnetic Seal" || bKey === "Ejector Seat")) {
        char.featDetails[finalName] = window.getFeatSubOptionsList(finalName, char.feats[finalName]);
      }
      addedCount++;
    });

    window.selectedFeatCheckboxes.clear();
    window.closeAddFeatModal();
    buildAdvantagesUI();
    buildSkillsUI();
    buildEquipmentUI();
    refreshUI();
    const isMecha = typeof char !== 'undefined' && char.isMecha;
    showToast(`Added ${addedCount} ${isMecha ? 'mecha options' : 'feats'} to sheet`, "success");
    return;
  }

  // Single feat addition (1 checked or currently highlighted)
  let featName = "";
  if (window.selectedFeatCheckboxes && window.selectedFeatCheckboxes.size === 1) {
    featName = Array.from(window.selectedFeatCheckboxes)[0];
  } else if (selChoice) {
    featName = selChoice.value;
  }
  if (!featName) return;

  const adv = listRef.find(a => a.name === featName);
  if (!adv) return;

  const numRank = document.getElementById("numFeatInitialRank");
  let ranksToAdd = numRank ? (parseInt(numRank.value) || 1) : 1;
  const maxRank = char.getAdvantageMaxRank ? char.getAdvantageMaxRank(adv) : (adv.ranked ? 20 : 1);
  if (!adv.ranked) ranksToAdd = 1;

  const res = window.extractFeatSpecification(adv, ranksToAdd);
  const finalName = res.finalName;
  const specDetail = res.specDetail;
  if (res.ranksToAdd) ranksToAdd = res.ranksToAdd;

  if (char.feats[finalName] !== undefined && char.feats[finalName] > 0) {
    char.feats[finalName] = Math.min(maxRank, (char.feats[finalName] || 0) + ranksToAdd);
  } else {
    char.feats[finalName] = Math.min(maxRank, ranksToAdd);
  }

  if (specDetail) {
    char.featDetails[finalName] = specDetail;
  }
  const baseKey = finalName.includes(" (") ? finalName.split(" (")[0].trim() : finalName.trim();
  if (finalName === "(Attack) Flurry") {
    char.featDetails[finalName] = specDetail || ["Unarmed Combat"];
  } else if (typeof FEAT_SUBOPTIONS_MAP !== 'undefined' && (FEAT_SUBOPTIONS_MAP[baseKey] || baseKey === "Electromagnetic Seal" || baseKey === "Ejector Seat")) {
    char.featDetails[finalName] = window.getFeatSubOptionsList(finalName, char.feats[finalName]);
  }

  if (window.selectedFeatCheckboxes) window.selectedFeatCheckboxes.clear();
  window.closeAddFeatModal();
  buildAdvantagesUI();
  buildSkillsUI();
  buildEquipmentUI();
  refreshUI();
  showToast(`Added "${finalName}" (Rank ${char.feats[finalName]})`, "success");
};

/* ==========================================================================
   ADD SKILL MODAL LOGIC & SPECIALIZATIONS
   ========================================================================== */

const SKILL_CANONICAL_SPECIALIZATIONS = {
  "Knowledge": [
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
  "Craft": [
    "Artistic",
    "Chemical",
    "Electronic",
    "Mechanical",
    "Structural"
  ],
  "Perform": [
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
  "Drive": [
    "Ground Vehicles",
    "Water Vehicles"
  ],
  "Pilot": [
    "Airplanes",
    "Jet Planes",
    "Helicopters",
    "Starfighters",
    "Space Transports",
    "Space Cruisers"
  ],
  "Profession": [
    "Accountant",
    "Doctor",
    "Engineer",
    "Game Designer",
    "Investigative Reporter",
    "Lawyer",
    "Military Officer",
    "Police Detective",
    "Sailor",
    "Scientist",
    "Teacher",
    "Writer"
  ],
  "Language": [
    "Arabic",
    "Ancient Greek",
    "Atlantean",
    "English",
    "French",
    "German",
    "Japanese",
    "Latin",
    "Mandarin Chinese",
    "Russian",
    "Spanish"
  ]
};

window.toggleSkillCheckbox = function(skillName, isChecked, event) {
  if (!window.selectedSkillCheckboxes) window.selectedSkillCheckboxes = new Set();
  if (isChecked) {
    window.selectedSkillCheckboxes.add(skillName);
    window.selectSkillTouchItem(skillName);
  } else {
    window.selectedSkillCheckboxes.delete(skillName);
  }
  window.updateSkillModalAddButtonText();
};

window.updateSkillModalAddButtonText = function() {
  const btn = document.getElementById("btnAddSkillConfirm");
  const count = window.selectedSkillCheckboxes ? window.selectedSkillCheckboxes.size : 0;
  if (btn) {
    btn.textContent = count > 1 ? `+ Add Checked (${count}) to Sheet` : "+ Add to Sheet";
  }
  const lbl = document.getElementById("lblSkillCheckedCount");
  if (lbl) {
    lbl.innerHTML = count > 0 ? `(${count} selected <a href="#" onclick="event.preventDefault(); window.clearSkillCheckboxes()" style="color: var(--accent-primary); margin-left: 4px; text-decoration: underline;">Clear</a>)` : "";
  }
};

window.clearSkillCheckboxes = function() {
  if (window.selectedSkillCheckboxes) window.selectedSkillCheckboxes.clear();
  const listEl = document.getElementById("listSkillChoice");
  if (listEl) {
    listEl.querySelectorAll(".touch-trait-checkbox").forEach(cb => cb.checked = false);
  }
  window.updateSkillModalAddButtonText();
};

window.handleSkillItemClick = function(skillName, event) {
  const now = Date.now();
  window.selectSkillTouchItem(skillName);
  if (window._lastSkillTap && window._lastSkillTap.name === skillName && (now - window._lastSkillTap.time < 350)) {
    window._lastSkillTap = null;
    window.confirmAddSkill();
  } else {
    window._lastSkillTap = { name: skillName, time: now };
  }
};

window.handleSkillDblClick = function(skillName, event) {
  window.selectSkillTouchItem(skillName);
  window.confirmAddSkill();
};

window.openAddSkillModal = function() {
  const modal = document.getElementById("addSkillModal");
  if (!modal) return;
  window.initModalSplitter('addSkillModal', 'boxSkillTopPane', 'divSkillModalDivider', 'boxSkillPreview');
  window.updateTraitModalPosition();
  if (window.selectedSkillCheckboxes) window.selectedSkillCheckboxes.clear();
  window.updateSkillModalAddButtonText();

  const listEl = document.getElementById("listSkillChoice");
  const selChoice = document.getElementById("selSkillChoice");

  if (typeof SKILLS_LIST !== 'undefined') {
    const firstSkill = SKILLS_LIST[0] ? SKILLS_LIST[0].name : "";
    if (selChoice) selChoice.value = firstSkill;

    if (listEl) {
      listEl.innerHTML = SKILLS_LIST.map((s, idx) => {
        const isSelected = idx === 0;
        const isChecked = window.selectedSkillCheckboxes && window.selectedSkillCheckboxes.has(s.name);
        const hasSpec = !!SKILL_CANONICAL_SPECIALIZATIONS[s.name];
        const specLabel = hasSpec ? " • Specialization" : "";
        return `<div class="touch-trait-item ${isSelected ? 'selected' : ''}" data-skill="${s.name.replace(/"/g, '&quot;')}" onclick="window.handleSkillItemClick('${s.name.replace(/'/g, "\\'")}', event)" ondblclick="window.handleSkillDblClick('${s.name.replace(/'/g, "\\'")}', event)">
          <input type="checkbox" class="touch-trait-checkbox" data-skill="${s.name.replace(/"/g, '&quot;')}" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); window.toggleSkillCheckbox('${s.name.replace(/'/g, "\\'")}', this.checked, event)">
          <span class="touch-trait-title">${s.name}</span>
          <span class="touch-trait-badge">${s.ability}${specLabel}</span>
        </div>`;
      }).join("");
    } else if (selChoice) {
      selChoice.innerHTML = SKILLS_LIST.map((s, idx) => {
        const hasSpec = !!SKILL_CANONICAL_SPECIALIZATIONS[s.name];
        const specLabel = hasSpec ? " (Specialization)" : "";
        return `<option value="${s.name}" ${idx === 0 ? "selected" : ""}>${s.name} [${s.ability}]${specLabel}</option>`;
      }).join("");
    }
  }
  window.onSkillModalSelect();
  modal.classList.add("active");
};

window.selectSkillTouchItem = function(skillName) {
  const selChoice = document.getElementById("selSkillChoice");
  const listEl = document.getElementById("listSkillChoice");
  if (selChoice) selChoice.value = skillName;
  if (listEl) {
    listEl.querySelectorAll(".touch-trait-item").forEach(item => {
      if (item.dataset.skill === skillName) {
        item.classList.add("selected");
        item.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } else {
        item.classList.remove("selected");
      }
    });
  }
  window.onSkillModalSelect();
};

window.closeAddSkillModal = function() {
  const modal = document.getElementById("addSkillModal");
  if (modal) {
    modal.classList.remove("active");
    modal.classList.remove("has-spec");
  }
};

window.onSkillModalSelect = function() {
  const selChoice = document.getElementById("selSkillChoice");
  const boxPreview = document.getElementById("boxSkillPreview");
  const boxSpec = document.getElementById("boxSkillSpecContainer");
  const listSpec = document.getElementById("listSkillSpecialization");
  const selSpec = document.getElementById("selSkillSpecialization");
  const txtCustomSpec = document.getElementById("txtSkillCustomSpec");
  const numRank = document.getElementById("numSkillInitialRank");
  if (!selChoice) return;

  const baseName = selChoice.value;
  const skill = typeof SKILLS_LIST !== 'undefined' ? SKILLS_LIST.find(s => s.name === baseName) : null;
  if (!skill) return;

  // Preview
  if (boxPreview) {
    boxPreview.innerHTML = `<strong>${skill.name} (${skill.ability})</strong>: ` + (skill.fullText || "<em>No description available.</em>");
  }

  // Initial rank default: 4 ranks (= 1 PP)
  if (numRank) {
    numRank.value = baseName === "Language" ? 1 : 4;
  }

  // Specializations
  const specList = SKILL_CANONICAL_SPECIALIZATIONS[baseName];
  const modal = document.getElementById("addSkillModal");
  if (specList && boxSpec && (listSpec || selSpec)) {
    if (modal) modal.classList.add("has-spec");
    boxSpec.style.display = "block";
    const defaultSpec = specList[0] || "__custom__";
    if (selSpec) selSpec.value = defaultSpec;

    if (listSpec) {
      listSpec.innerHTML = specList.map((sp, idx) => {
        const isSelected = idx === 0;
        return `<div class="touch-trait-item ${isSelected ? 'selected' : ''}" data-spec="${sp.replace(/"/g, '&quot;')}" onclick="window.selectSkillSpecTouchItem('${sp.replace(/'/g, "\\'")}')">
          <span class="touch-trait-title">${sp}</span>
        </div>`;
      }).join("") +
      `<div class="touch-trait-item" data-spec="__custom__" onclick="window.selectSkillSpecTouchItem('__custom__')">
        <span class="touch-trait-title"><em>Custom Specialization...</em></span>
        <span class="touch-trait-badge">✏ Custom</span>
      </div>`;
    } else if (selSpec) {
      selSpec.innerHTML = specList.map(sp => `<option value="${sp}">${sp}</option>`).join("") +
        `<option value="__custom__">Custom Specialization...</option>`;
    }

    if (txtCustomSpec) {
      txtCustomSpec.style.display = "none";
      txtCustomSpec.value = "";
    }
  } else if (boxSpec) {
    if (modal) modal.classList.remove("has-spec");
    boxSpec.style.display = "none";
  }
};

window.selectSkillSpecTouchItem = function(specVal) {
  const selSpec = document.getElementById("selSkillSpecialization");
  const listSpec = document.getElementById("listSkillSpecialization");
  const txtCustomSpec = document.getElementById("txtSkillCustomSpec");

  if (selSpec) selSpec.value = specVal;
  if (listSpec) {
    listSpec.querySelectorAll(".touch-trait-item").forEach(item => {
      if (item.dataset.spec === specVal) {
        item.classList.add("selected");
        item.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } else {
        item.classList.remove("selected");
      }
    });
  }

  if (txtCustomSpec) {
    if (specVal === "__custom__") {
      txtCustomSpec.style.display = "block";
      txtCustomSpec.focus();
    } else {
      txtCustomSpec.style.display = "none";
    }
  }
};

window.onSkillSpecializationChange = function() {
  const selSpec = document.getElementById("selSkillSpecialization");
  const txtCustomSpec = document.getElementById("txtSkillCustomSpec");
  if (!selSpec || !txtCustomSpec) return;
  if (selSpec.value === "__custom__") {
    txtCustomSpec.style.display = "block";
    txtCustomSpec.focus();
  } else {
    txtCustomSpec.style.display = "none";
  }
};

window.confirmAddSkill = function() {
  const now = Date.now();
  if (window._lastConfirmSkillTime && (now - window._lastConfirmSkillTime < 350)) {
    return;
  }
  window._lastConfirmSkillTime = now;

  const selChoice = document.getElementById("selSkillChoice");

  // Multi-select batch adding if multiple checkboxes are checked
  if (window.selectedSkillCheckboxes && window.selectedSkillCheckboxes.size > 1) {
    let addedCount = 0;
    const activeSkill = selChoice ? selChoice.value : "";
    const numRank = document.getElementById("numSkillInitialRank");
    const activeRanks = numRank ? (parseInt(numRank.value) || 1) : 4;

    window.selectedSkillCheckboxes.forEach(baseName => {
      let fullSkillName = baseName;
      let ranksToAdd = 4;

      if (baseName === activeSkill) {
        ranksToAdd = activeRanks;
        const specList = SKILL_CANONICAL_SPECIALIZATIONS[baseName];
        if (specList) {
          const selSpec = document.getElementById("selSkillSpecialization");
          const txtCustomSpec = document.getElementById("txtSkillCustomSpec");
          let chosenSpec = "";
          if (selSpec && selSpec.value === "__custom__") {
            chosenSpec = txtCustomSpec ? txtCustomSpec.value.trim() : "";
          } else if (selSpec) {
            chosenSpec = selSpec.value;
          }
          if (!chosenSpec) chosenSpec = "General";
          fullSkillName = `${baseName} (${chosenSpec})`;
        }
      } else {
        ranksToAdd = baseName === "Language" ? 1 : 4;
        const specList = SKILL_CANONICAL_SPECIALIZATIONS[baseName];
        if (specList && specList.length > 0) {
          fullSkillName = `${baseName} (${specList[0]})`;
        }
      }

      if (char.skills[fullSkillName] !== undefined && char.skills[fullSkillName] > 0) {
        char.skills[fullSkillName] = Math.min(20, (char.skills[fullSkillName] || 0) + ranksToAdd);
      } else {
        char.skills[fullSkillName] = Math.min(20, ranksToAdd);
      }
      addedCount++;
    });

    window.selectedSkillCheckboxes.clear();
    window.closeAddSkillModal();
    buildSkillsUI();
    refreshUI();
    showToast(`Added ${addedCount} skills to sheet`, "success");
    return;
  }

  // Single skill addition
  let baseName = "";
  if (window.selectedSkillCheckboxes && window.selectedSkillCheckboxes.size === 1) {
    baseName = Array.from(window.selectedSkillCheckboxes)[0];
  } else if (selChoice) {
    baseName = selChoice.value;
  }
  if (!baseName) return;

  let fullSkillName = baseName;
  const specList = SKILL_CANONICAL_SPECIALIZATIONS[baseName];
  if (specList) {
    const selSpec = document.getElementById("selSkillSpecialization");
    const txtCustomSpec = document.getElementById("txtSkillCustomSpec");
    let chosenSpec = "";
    if (selSpec && selSpec.value === "__custom__") {
      chosenSpec = txtCustomSpec ? txtCustomSpec.value.trim() : "";
    } else if (selSpec) {
      chosenSpec = selSpec.value;
    }
    if (!chosenSpec) chosenSpec = "General";
    fullSkillName = `${baseName} (${chosenSpec})`;
  }

  const numRank = document.getElementById("numSkillInitialRank");
  const ranksToAdd = numRank ? (parseInt(numRank.value) || 1) : (baseName === "Language" ? 1 : 4);

  if (char.skills[fullSkillName] !== undefined && char.skills[fullSkillName] > 0) {
    char.skills[fullSkillName] = Math.min(20, (char.skills[fullSkillName] || 0) + ranksToAdd);
  } else {
    char.skills[fullSkillName] = Math.min(20, ranksToAdd);
  }

  if (window.selectedSkillCheckboxes) window.selectedSkillCheckboxes.clear();
  window.closeAddSkillModal();
  buildSkillsUI();
  refreshUI();
  showToast(`Added "${fullSkillName}" (${char.skills[fullSkillName]} ranks)`, "success");
};

window.configureSkillMastery = function() {
  const allowed = (char.feats["Skill Mastery"] || 0) * 4;
  let selected = [];
  try {
    selected = JSON.parse(char.featDetails["Skill Mastery"] || "[]");
  } catch (e) {
    selected = [];
  }

  const allSkills = SKILLS_LIST.map(s => s.name).sort();
  let html = `
    <div style="margin-bottom: 10px;">Select up to ${allowed} skills to master:</div>
    <div style="max-height: 350px; overflow-y: auto; border: 1px solid var(--border-color); padding: 8px; margin-bottom: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
  `;
  allSkills.forEach(s => {
    const isChecked = selected.includes(s) ? "checked" : "";
    html += `<label style="display:flex; align-items:center; gap:10px; padding: 8px 4px; cursor: pointer; font-size: 1.05em;"><input type="checkbox" class="sm-checkbox" value="${s}" ${isChecked} style="width: 22px; height: 22px; cursor: pointer;"> ${s}</label>`;
  });
  html += `</div>`;
  html += `
    <div style="display:flex; justify-content:flex-end; gap:8px;">
      <button type="button" class="btn" onclick="document.body.removeChild(this.closest('.modal-overlay'))">Cancel</button>
      <button type="button" class="btn btn-primary" onclick="window.saveSkillMastery(this.closest('.modal-overlay'))">Accept</button>
    </div>
  `;

  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.style.display = "flex";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0,0,0,0.5)";
  modal.style.zIndex = "9999";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 450px; width: 100%; background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
      <div class="modal-header" style="display: flex; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid var(--border-color);">
        <h2 style="margin:0; font-size: 1.2rem; color: var(--accent-primary);">Configure Skill Mastery</h2>
        <span class="modal-close" style="cursor: pointer; font-size: 1.2rem;" onclick="document.body.removeChild(this.closest('.modal-overlay'))">×</span>
      </div>
      <div class="modal-body" style="padding: 16px;">
        ${html}
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelectorAll(".sm-checkbox").forEach(chk => {
    chk.addEventListener("change", (e) => {
      const checkedCount = modal.querySelectorAll(".sm-checkbox:checked").length;
      if (checkedCount > allowed) {
        e.target.checked = false;
        alert(`You can only select ${allowed} skills based on your Skill Mastery rank (${char.feats["Skill Mastery"]}).`);
      }
    });
  });
};

window.saveSkillMastery = function(modal) {
  const checked = Array.from(modal.querySelectorAll(".sm-checkbox:checked")).map(c => c.value);
  char.featDetails["Skill Mastery"] = JSON.stringify(checked);
  document.body.removeChild(modal);
  buildAdvantagesUI();
  buildSkillsUI();
  refreshUI();
};

window.isEffectCustomNameSet = function(eff) {
  if (!eff) return false;
  if (eff.hasCustomName !== undefined) return eff.hasCustomName;
  if (eff.customName && eff.customName.trim() !== "" && eff.customName !== eff.effectName) return true;
  if (eff.name && eff.name !== "New Effect" && eff.name !== eff.effectName && !eff.isProfileExplicitlySelected) return true;
  return false;
};

window.applyEffectProfile = function(pIdx, eIdx, profileName, skipHistory = false) {
  if (!char.activePowers[pIdx] || !char.activePowers[pIdx].effects[eIdx]) return;
  window.invalidateContainerDeclaredCost(pIdx);
  const effect = char.activePowers[pIdx].effects[eIdx];

  const targetProfile = profileName || "";

  if (!skipHistory) {
      if (!effect.profileHistory) { 
        effect.profileHistory = [effect.name && effect.name !== "New Effect" && effect.name !== effect.effectName ? effect.name : ""]; 
        effect.profileHistoryIdx = 0; 
      }
      if (effect.profileHistory[effect.profileHistoryIdx] !== targetProfile) {
          effect.profileHistory = effect.profileHistory.slice(0, effect.profileHistoryIdx + 1);
          effect.profileHistory.push(targetProfile);
          if (effect.profileHistory.length > 20) effect.profileHistory.shift();
          else effect.profileHistoryIdx++;
      }
  }

  // If reverting to "- Select Profile -" (empty / none)
  if (!targetProfile || targetProfile === "New Effect") {
      effect.name = effect.effectName || "New Effect";
      effect.isProfileExplicitlySelected = false;
      effect.options = {};
      effect.subPowers = [];
      effect.modifiers = [];
      effect.rank = 1;
      effect.descriptors = "";
      effect.notes = "";
      if (effect.effectName) {
          if (!effect.effectCache) effect.effectCache = {};
          effect.effectCache[effect.effectName] = {
              options: {},
              subPowers: [],
              modifiers: [],
              rank: 1,
              name: effect.effectName
          };
      }
      buildPowersUI();
      refreshUI();
      return;
  }
  
  let config = null;
  let targetEffectName = "";

  if (typeof POWER_PROFILES_LIST !== 'undefined') {
    config = POWER_PROFILES_LIST.find(c => c.name === targetProfile);
    if (config) {
      targetEffectName = config.effectName;
    }
  }

  if (!config && typeof POWER_EFFECTS_LIST !== 'undefined') {
    for (const eff of POWER_EFFECTS_LIST) {
      if (eff.profiles) {
        config = eff.profiles.find(c => c.name === targetProfile);
        if (config) {
          targetEffectName = eff.name;
          break;
        }
      }
    }
  }
  
  if (!config) return;

  effect.effectName = config.effectName || targetEffectName;
  if (!window.isEffectCustomNameSet(effect)) {
    effect.name = config.name;
    effect.hasCustomName = false;
    effect.customName = "";
  }
  effect.isProfileExplicitlySelected = true;
  effect.descriptors = config.descriptors || "";

  const powerContainer = char.activePowers[pIdx];
  const oldEffName = effect.effectName;
  if (powerContainer && !powerContainer.hasCustomName && (!powerContainer.name || powerContainer.name === "New Power Container" || powerContainer.name === oldEffName || powerContainer.name === targetEffectName || powerContainer.name === config.effectName)) {
    powerContainer.name = config.name;
    const containerId = (window.activePowerContext === 'blueprints') ? "blueprintsContainer" : "powersContainer";
    const container = document.getElementById(containerId);
    const headerTitle = container ? container.querySelector(`#powerContainerName_${pIdx}`) : document.getElementById(`powerContainerName_${pIdx}`);
    if (headerTitle) headerTitle.value = config.name;
  }
  
  if (config.rank !== undefined) {
    effect.rank = config.rank;
  } else {
    effect.rank = 1;
  }
  
  effect.options = config.options ? JSON.parse(JSON.stringify(config.options)) : {};
  effect.modifiers = config.modifiers ? JSON.parse(JSON.stringify(config.modifiers)) : [];
  effect.subPowers = config.subPowers ? JSON.parse(JSON.stringify(config.subPowers)) : [];
  effect.notes = config.notes ? config.notes : "";

  const isComposite = ["Enhanced Senses", "Enhanced Movement", "Enhanced Trait", "Comprehend", "Feature", "Features", "Immunity", "Super-Senses", "Super-Movement", "Senses", "Movement"].includes(effect.effectName);
  if (!isComposite) {
      let maxR = window.getMaxPowerRank(effect); 
      if (effect.rank > maxR) effect.rank = maxR;
  }
  
  if (!effect.id) {
    effect.id = "eff_" + Math.random().toString(36).substr(2, 9);
  }

  // If this configuration defines linked secondary effects, append and link them!
  if (config.linkedEffects && Array.isArray(config.linkedEffects) && config.linkedEffects.length > 0) {
    // Clean up any previous auto-linked children from this parent effect
    char.activePowers[pIdx].effects = char.activePowers[pIdx].effects.filter(otherEff => otherEff.linkedTo !== effect.id);

    config.linkedEffects.forEach((linkedCfg, lIdx) => {
      const linkedId = "eff_" + Math.random().toString(36).substr(2, 9);
      const newLinkedEff = {
        id: linkedId,
        name: linkedCfg.name || "Linked Effect",
        effectName: linkedCfg.effectName || "",
        association: effect.association || "primary",
        linkedTo: effect.id,
        rank: linkedCfg.rank !== undefined ? linkedCfg.rank : 1,
        descriptors: linkedCfg.descriptors || "",
        notes: linkedCfg.notes || "",
        modifiers: linkedCfg.modifiers ? JSON.parse(JSON.stringify(linkedCfg.modifiers)) : [],
        options: linkedCfg.options ? JSON.parse(JSON.stringify(linkedCfg.options)) : {},
        subPowers: linkedCfg.subPowers ? JSON.parse(JSON.stringify(linkedCfg.subPowers)) : [],
        effectCache: {},
        effectHistory: [linkedCfg.effectName || ""],
        effectHistoryIdx: 0,
        profileHistory: [linkedCfg.name || ""],
        profileHistoryIdx: 0
      };
      if (linkedCfg.action) newLinkedEff.action = linkedCfg.action;
      if (linkedCfg.range) newLinkedEff.range = linkedCfg.range;
      if (linkedCfg.duration) newLinkedEff.duration = linkedCfg.duration;
      
      char.activePowers[pIdx].effects.splice(eIdx + 1 + lIdx, 0, newLinkedEff);
    });
  }

  buildPowersUI();
  if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("apply_profile");
  refreshUI();
};

window.toggleAllProfiles = function(pIdx, eIdx, isChecked) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
    char.activePowers[pIdx].effects[eIdx].showAllProfiles = isChecked;
    buildPowersUI();
  }
};

window.updateEffectAssociation = function(pIdx, eIdx, val) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
      window.invalidateContainerDeclaredCost(pIdx);
      const container = char.activePowers[pIdx];
      
      if (val === 'primary') {
          // Clear other primaries
          container.effects.forEach((eff, idx) => {
              if (idx !== eIdx && eff.association === 'primary') {
                  eff.association = 'alternate';
              }
          });
      } else if (val === 'alternate' || val === 'dynamic') {
          // Ensure there is at least one primary remaining
          let otherPrimary = container.effects.find((eff, idx) => idx !== eIdx && eff.association === 'primary');
          if (!otherPrimary) {
             let firstAvailable = container.effects.find((eff, idx) => idx !== eIdx);
             if (firstAvailable) {
                 firstAvailable.association = 'primary';
             } else {
                 val = 'primary'; // If it's the only effect, it must be primary
             }
          }
      }
      container.effects[eIdx].association = val;
      buildPowersUI();
      if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("update_association");
      refreshUI();
  }
};

window.updateEffectLink = function(pIdx, eIdx, val) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
      if (val === "__unlink_children__") {
          const currentId = char.activePowers[pIdx].effects[eIdx].id;
          char.activePowers.forEach(cnt => {
              if (Array.isArray(cnt.effects)) {
                  cnt.effects.forEach(eff => {
                      if (eff.linkedTo === currentId || (cnt === char.activePowers[pIdx] && eff.linkedTo === "previous")) {
                          eff.linkedTo = null;
                      }
                  });
              }
          });
      } else {
          char.activePowers[pIdx].effects[eIdx].linkedTo = val || null;
      }
      buildPowersUI();
      if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("update_link");
      refreshUI();
  }
};

function calculateEffectiveRange(effect, baseRange) {
  let effectiveRange = baseRange || "Touch";
  if (effectiveRange === "Close") effectiveRange = "Touch"; // 3E to 2E compat
  
  if (!effect || !effect.modifiers || effect.modifiers.length === 0) {
    return effectiveRange;
  }

  // Preserve Extended or Rank ranges unless explicitly modified by Range extras/flaws
  const hasRangeMod = effect.modifiers.some(m => m.name === "Range (Extra)" || m.name === "Range (Flaw)" || m.name === "Increased Range" || m.name === "Reduced Range");
  if ((effectiveRange === "Extended" || effectiveRange === "Rank") && !hasRangeMod) {
    return effectiveRange;
  }

  const rangeSteps = ["Personal", "Touch", "Ranged", "Perception"];
  let currentIdx = rangeSteps.indexOf(effectiveRange);
  if (currentIdx === -1) currentIdx = 1;

  const isDisablePerception = (typeof char !== 'undefined' && char.houseRules && char.houseRules.disablePerceptionRange) || 
                              (typeof localStorage !== 'undefined' && localStorage.getItem("mm2e_houserule_disable_perception_range") === "true");
  const maxUpgradedIdx = isDisablePerception ? 2 : 3;

  effect.modifiers.forEach(m => {
    const ranks = parseInt(m.ranks) || 1;
    if (m.name === "Range (Extra)" || m.name === "Increased Range") {
      currentIdx = Math.min(maxUpgradedIdx, currentIdx + ranks);
    } else if (m.name === "Range (Flaw)" || m.name === "Reduced Range") {
      currentIdx = Math.max(1, currentIdx - ranks); // Can't reduce Personal below Touch usually
    } else if (m.name === "Ranged") {
      currentIdx = Math.max(currentIdx, 2);
    } else if (m.name === "Perception Range" || m.name === "Range (Perception)") {
      if (!isDisablePerception) {
        currentIdx = 3;
      } else {
        currentIdx = Math.min(currentIdx, 2);
      }
    } else if (m.name === "Attack" || m.name === "Affects Others" || m.name === "Affects Corporeal") {
      if (currentIdx === 0) currentIdx = 1;
    }
  });

  return rangeSteps[currentIdx];
}
window.calculateEffectiveRange = calculateEffectiveRange;

function getEffectiveEffectTraits(effect) {
  if (!effect || !effect.effectName) return { action: "Standard", range: "Touch", duration: "Instant", check: "None" };
  const baseData = typeof POWER_EFFECTS_LIST !== 'undefined' 
    ? POWER_EFFECTS_LIST.find(e => e.name === effect.effectName) 
    : null;
    
  let pAction = (effect.action) || baseData?.action || "Standard";
  let pRange = (effect.range) || baseData?.range || "Touch";
  let pDuration = (effect.duration) || baseData?.duration || "Instant";
  let pCheck = effect.savingThrow || baseData?.savingThrow || baseData?.check || "None";

  const profile = (baseData && baseData.profiles && baseData.profiles.find(p => p.name === effect.name)) ||
                  (typeof POWER_PROFILES_LIST !== 'undefined' && POWER_PROFILES_LIST.find(p => p.name === effect.name)) || null;
  if (profile) {
    if (profile.action) pAction = profile.action;
    if (profile.range) pRange = profile.range;
    if (profile.duration) pDuration = profile.duration;
    if (profile.check || profile.savingThrow) pCheck = profile.savingThrow || profile.check;
  }

  let range = calculateEffectiveRange(effect, pRange);
  let check = pCheck;

  // Action calculation
  const actionSteps = ["Reaction", "Free", "Move", "Standard", "Full-Round"];
  let cleanAction = (pAction || "Standard").replace(/\s*\(.*?\)/g, '').trim();
  if (cleanAction === "Full") cleanAction = "Full-Round";
  else if (cleanAction.startsWith("Standard/")) cleanAction = "Standard";
  else if (cleanAction.startsWith("Move/")) cleanAction = "Move";

  let isNoneAction = (cleanAction === "None" || cleanAction === "—");
  let actionIdx = actionSteps.indexOf(cleanAction);
  if (actionIdx === -1) {
    actionIdx = isNoneAction ? -1 : 3;
  }

  // Duration calculation
  const durationSteps = ["Instant", "Concentration", "Sustained", "Continuous", "Permanent"];
  let cleanDuration = (pDuration || "Instant").replace(/\s*\(.*?\)/g, '').trim();
  let isSpecialDuration = ["Varies", "Special", "See description", "—"].includes(cleanDuration);
  let durationIdx = durationSteps.indexOf(cleanDuration);
  if (durationIdx === -1) {
    if (cleanDuration.toLowerCase().includes("concentration")) durationIdx = 1;
    else if (cleanDuration.toLowerCase().includes("sustained")) durationIdx = 2;
    else if (cleanDuration.toLowerCase().includes("continuous")) durationIdx = 3;
    else if (cleanDuration.toLowerCase().includes("permanent")) durationIdx = 4;
    else durationIdx = isSpecialDuration ? -1 : 0;
  }

  if (Array.isArray(effect.modifiers)) {
    effect.modifiers.forEach(m => {
      const ranks = parseInt(m.ranks) || 1;
      const mName = m.name || "";

      // Action modifiers
      if (mName === "Reaction" || mName === "Action (Reaction)") {
        actionIdx = 0;
        isNoneAction = false;
      } else if (mName === "Action (Free)" || mName === "Free Action") {
        actionIdx = 1;
        isNoneAction = false;
      } else if (mName === "Action (Move)") {
        actionIdx = 2;
        isNoneAction = false;
      } else if (mName === "Action (Standard)" || mName === "Attack") {
        actionIdx = 3;
        isNoneAction = false;
      } else if (mName === "Action (Full-Round)" || mName === "Action (Full)") {
        actionIdx = 4;
        isNoneAction = false;
      } else if (mName === "Action (Extra)") {
        if (isNoneAction) {
          actionIdx = 1;
          isNoneAction = false;
        } else {
          actionIdx = Math.max(0, actionIdx - ranks);
        }
      } else if (mName === "Action (Flaw)") {
        if (isNoneAction) {
          actionIdx = 3;
          isNoneAction = false;
        } else {
          actionIdx = Math.min(4, actionIdx + ranks);
        }
      }

      // Duration modifiers
      if (mName === "Duration (Extra)") {
        durationIdx = Math.min(3, durationIdx + ranks);
        isSpecialDuration = false;
      } else if (mName === "Duration (Flaw)") {
        durationIdx = Math.max(0, durationIdx - ranks);
        isSpecialDuration = false;
      } else if (mName === "Continuous" || mName === "Duration (Continuous)" || mName === "Increased Duration (Continuous)") {
        durationIdx = 3;
        isSpecialDuration = false;
      } else if (mName === "Sustained" || mName === "Duration (Sustained)" || mName === "Increased Duration (Sustained)" || mName === "Decreased Duration (Sustained)" || mName === "Independent") {
        durationIdx = 2;
        isSpecialDuration = false;
      } else if (mName === "Concentration" || mName === "Increased Duration (Concentration)" || mName === "Decreased Duration (Concentration)") {
        durationIdx = 1;
        isSpecialDuration = false;
      } else if (mName === "Decreased Duration (Instant)") {
        durationIdx = 0;
        isSpecialDuration = false;
      } else if (mName === "Permanent") {
        durationIdx = 4;
        isSpecialDuration = false;
      }
    });
  }

  let action = isNoneAction ? (cleanAction || "None") : (actionSteps[actionIdx] || "Standard");
  let duration = (isSpecialDuration && durationIdx === -1) ? cleanDuration : (durationSteps[durationIdx] || cleanDuration || "Instant");

  return { action, range, duration, check };
}
window.getEffectiveEffectTraits = getEffectiveEffectTraits;

window.getEffectSaveDc = function(effect, effectiveRank = null) {
  if (!effect || !effect.effectName) return "None";
  const baseRank = parseInt(effect.rank !== undefined ? effect.rank : (effect.ranks || 1)) || 1;
  const rVal = (effectiveRank !== null && effectiveRank !== undefined) ? parseInt(effectiveRank) : baseRank;
  const rankNum = Math.max(1, rVal);
  const boostDelta = (effectiveRank !== null && effectiveRank !== undefined && rVal > baseRank) ? (rVal - baseRank) : 0;
  const effectiveTraits = getEffectiveEffectTraits(effect);
  const baseData = (typeof POWER_EFFECTS_LIST !== 'undefined') ? POWER_EFFECTS_LIST.find(e => e.name === effect.effectName) : null;
  const saveType = effectiveTraits?.check || effect.savingThrow || baseData?.savingThrow || baseData?.check || "None";

  // Check for Alternate Save modifier
  let altSave = null;
  if (Array.isArray(effect.modifiers)) {
    const altMod = effect.modifiers.find(m => m.name && m.name.includes("Alternate Save"));
    if (altMod) {
      const match = altMod.name.match(/Alternate Save\s*\(([^)]+)\)/i);
      if (match) altSave = match[1];
    }
  }

  let dc = "None";
  if (effect.effectName === "Teleport") {
    dc = `Reflex DC ${10 + rankNum} (unwilling)`;
  } else if (["Strike", "Blast", "Damage", "Corrosion", "Disintegrate"].includes(effect.effectName)) {
    dc = `${altSave || "Toughness"} DC ${15 + rankNum}`;
  } else if (["Snare", "Trip"].includes(effect.effectName)) {
    dc = `${altSave || "Reflex"} DC ${10 + rankNum}`;
  } else if (["Stun", "Nauseate", "Suffocate", "Drain", "Fatigue"].includes(effect.effectName)) {
    dc = `${altSave || "Fortitude"} DC ${10 + rankNum}`;
  } else if (["Paralyze", "Mind Control", "Mind Reading", "Emotion Control", "Illusion", "Confuse"].includes(effect.effectName)) {
    dc = `${altSave || "Will"} DC ${10 + rankNum}`;
  } else if (effect.effectName === "Nullify") {
    dc = `Opposed (+${rankNum}) vs Will/Power`;
  } else if (effect.effectName === "Transform") {
    dc = `${altSave || "Fortitude"} DC ${10 + rankNum}`;
  } else if (altSave) {
    dc = `${altSave} DC ${10 + rankNum}`;
  } else if (saveType === "Toughness") {
    dc = `Toughness DC ${15 + rankNum}`;
  } else if (["Will", "Fortitude", "Reflex"].includes(saveType)) {
    dc = `${saveType} DC ${10 + rankNum}`;
  } else if (saveType === "Reflex/Strength") {
    dc = `Reflex/Str DC ${10 + rankNum}`;
  } else if (saveType && saveType !== "None" && saveType !== "—") {
    dc = `${saveType} DC ${10 + rankNum}`;
  } else if (baseData && baseData.type === "Attack") {
    dc = `DC ${10 + rankNum} Save`;
  }

  if (boostDelta > 0 && dc !== "None" && dc !== "—") {
    dc += ` (+${boostDelta} Boost)`;
  }

  const hasNoAttackRollMod = Array.isArray(effect.modifiers) && effect.modifiers.some(m => m.name === "No Attack Roll");
  if (hasNoAttackRollMod) {
    if (dc && dc !== "None" && dc !== "—") {
      dc += " (No attack roll required)";
    } else {
      dc = "No attack roll required";
    }
  }

  return dc;
};

window.updatePowerContainerName = function(pIdx, val) {
  if (char.activePowers[pIdx]) {
      char.activePowers[pIdx].name = val;
      char.activePowers[pIdx].hasCustomName = !!(val && val.trim() !== "");
      const containerId = (window.activePowerContext === 'blueprints') ? "blueprintsContainer" : "powersContainer";
      const container = document.getElementById(containerId);
      const headerTitle = container ? container.querySelector(`#powerContainerName_${pIdx}`) : document.getElementById(`powerContainerName_${pIdx}`);
      if (headerTitle) headerTitle.value = val;
  }
};

window.updateBoostScopeDirect = function(pIdx, eIdx, val) {
  const eff = char.activePowers[pIdx]?.effects[eIdx];
  if (!eff) return;
  if (!eff.options) eff.options = {};
  eff.options.boostScope = val;
  const costMap = {
    "Single Trait": 1,
    "One Specific Trait (Fixed at purchase)": 1,
    "One Trait of Descriptor": 2,
    "Any One Trait of Descriptor (Flexible per use)": 2,
    "All Traits of Descriptor": 3,
    "All Traits of Descriptor (Simultaneous)": 3,
    "All Powers of Subject": 4,
    "All Powers of Subject (Simultaneous)": 4,
    "All Traits of Subject": 5,
    "All Traits of Subject (Simultaneous)": 5
  };
  eff.baseCost = costMap[val] || 1;
  refreshUI();
};

window.updateBoostTargetDirect = function(pIdx, eIdx, val) {
  const eff = char.activePowers[pIdx]?.effects[eIdx];
  if (!eff) return;
  if (!eff.options) eff.options = {};
  eff.options.boostTarget = val;
  eff.boostTarget = val;
  buildPowersUI();
  refreshUI();
};

window.updateBoostActiveDirect = function(pIdx, eIdx, val) {
  const eff = char.activePowers[pIdx]?.effects[eIdx];
  if (!eff) return;
  eff.active = val;
  if (!eff.options) eff.options = {};
  eff.options.boostActive = val;
  eff.boostActive = val;
  buildPowersUI();
  refreshUI();
};


window.navigateEffectHistory = function(pIdx, eIdx, dir) {
    const effect = char.activePowers[pIdx]?.effects[eIdx];
    if (!effect) return;
    if (!effect.effectHistory) {
        effect.effectHistory = [effect.effectName || ""];
        effect.effectHistoryIdx = 0;
    }
    
    let newIdx = effect.effectHistoryIdx + dir;
    if (dir === -1 && newIdx < 0) {
        if (effect.effectHistory.length === 20) {
            let warningsDisabled = (localStorage.getItem("mm2e_disable_warnings") ?? localStorage.getItem("mm4e_disable_warnings")) === "true";
            if (!warningsDisabled) alert("History limit reached (last 20 changes). Cannot go back further.");
        }
        return;
    }
    if (dir === 1 && newIdx >= effect.effectHistory.length) {
        return; 
    }
    
    effect.effectHistoryIdx = newIdx;
    window.updateEffectDirect(pIdx, eIdx, effect.effectHistory[newIdx], true);
};

window.navigateProfileHistory = function(pIdx, eIdx, dir) {
    const effect = char.activePowers[pIdx]?.effects[eIdx];
    if (!effect) return;
    if (!effect.profileHistory) {
        effect.profileHistory = [effect.name && effect.name !== "New Effect" && effect.name !== effect.effectName ? effect.name : ""];
        effect.profileHistoryIdx = 0;
    }
    
    let newIdx = effect.profileHistoryIdx + dir;
    if (dir === -1 && newIdx < 0) {
        if (effect.profileHistory.length === 20) {
            let warningsDisabled = (localStorage.getItem("mm2e_disable_warnings") ?? localStorage.getItem("mm4e_disable_warnings")) === "true";
            if (!warningsDisabled) alert("History limit reached (last 20 changes). Cannot go back further.");
        }
        return;
    }
    if (dir === 1 && newIdx >= effect.profileHistory.length) {
        return; 
    }
    
    effect.profileHistoryIdx = newIdx;
    window.applyEffectProfile(pIdx, eIdx, effect.profileHistory[newIdx], true);
};

function renderPowersContainer(containerId, powersList, isBlueprint) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!powersList || powersList.length === 0) {
    if (isBlueprint) {
      container.innerHTML = `<p class="secondary-text" style="padding: 12px 0;">No plans constructed yet. Click <strong>+ Add Plan</strong> above to create a plan.</p>`;
    } else {
      container.innerHTML = `<p class="secondary-text" style="padding: 12px 0;">No powers constructed yet. Click <strong>+ Add New Power Container</strong> above to build a power container.</p>`;
    }
    return;
  }

  const prevContext = typeof window !== 'undefined' ? window.activePowerContext : 'powers';
  if (typeof window !== 'undefined') {
    window.activePowerContext = isBlueprint ? 'blueprints' : 'powers';
  }

  try {
    const idPrefix = isBlueprint ? 'bp_' : 'pow_';
    container.innerHTML = powersList.map((powerContainer, pIdx) => {
    const isDeviceContainer = (typeof CharacterModel !== 'undefined' && CharacterModel.isDevicePower)
      ? CharacterModel.isDevicePower(powerContainer)
      : (powerContainer.containerType === "device_hard" || 
         powerContainer.containerType === "device_easy" || 
         powerContainer.planType === "device" ||
         (Array.isArray(powerContainer.effects) && powerContainer.effects.some(e => e.effectName === "Device" || e.name === "Device" || e.isDevice)));
    let deviceBadgeHtml = "";
    if (isDeviceContainer) {
      let deviceLabel = "⚙️ Device";
      if (powerContainer.containerType === "device_hard") {
        deviceLabel = "⚙️ Device (Hard to Lose)";
      } else if (powerContainer.containerType === "device_easy") {
        deviceLabel = "⚙️ Device (Easy to Lose)";
      }
      deviceBadgeHtml = `<span class="badge badge-device" title="Device Container: Independent traits and powers granted by an item or equipment">${deviceLabel}</span>`;
    }
    const containerCost = char.calculateTotalPowerCost(powerContainer);
    const isCollapsed = powerContainer.collapsed ? 'collapsed' : '';
    const summaryText = powerContainer.effects.map(e => {
      const r = e.rank !== undefined ? e.rank : (e.ranks || 1);
      const dc = window.getEffectSaveDc ? window.getEffectSaveDc(e) : "None";
      const dcBadge = (dc && dc !== "None" && dc !== "—" && !dc.startsWith("No attack")) ? ` [${dc}]` : "";
      return `${e.effectName || 'No Effect'} ${r}${dcBadge}`;
    }).join(" | ");
    const isContainerActive = powerContainer.active !== false && (!Array.isArray(powerContainer.effects) || powerContainer.effects.length === 0 || powerContainer.effects.some(e => e.active !== false));

    let effectsHtml = powerContainer.effects.map((effect, eIdx) => {
        const isComposite = ["Enhanced Senses", "Enhanced Movement", "Enhanced Trait", "Comprehend", "Feature", "Features", "Immunity", "Super-Senses", "Super-Movement", "Senses", "Movement"].includes(effect.effectName);
        
        let effectData = null;
        if (effect.effectName) {
            effectData = (typeof POWER_EFFECTS_LIST !== 'undefined') ? POWER_EFFECTS_LIST.find(e => e.name === effect.effectName) : null;
            if (effectData) {
                // deep copy so we can override without mutating global
                effectData = JSON.parse(JSON.stringify(effectData));
                if (effect.name && effectData.profiles) {
                    const profileData = effectData.profiles.find(p => p.name === effect.name);
                    if (profileData && profileData.fullText) {
                        effectData.fullText = profileData.fullText;
                    }
                }
            }
        }
        
        if (!effectData) {
            effectData = { name: "- Select Effect -", type: "—", action: "—", range: "—", duration: "—", check: "—", baseCost: 0, fullText: "Please select an effect from the dropdown list to configure your power.", shortDesc: "No effect selected." };
        }
        
        const effectiveTraits = getEffectiveEffectTraits(effect);
          
        if (!effect.options) effect.options = {};
        if (!effect.subPowers) effect.subPowers = [];
        if (typeof CharacterModel !== 'undefined' && CharacterModel.normalizeEffectSubPowers) {
          CharacterModel.normalizeEffectSubPowers(effect);
        }
        
        let maxPowerRank = window.getMaxPowerRank(effect);
        if (effect.rank > maxPowerRank) effect.rank = maxPowerRank;
        
        const rawEffectCost = char.calculateEffectCost(effect);
        let effectCostDisplay = `${rawEffectCost} PP`;
        if (effect.association === 'alternate') effectCostDisplay = `1 PP`;
        if (effect.association === 'dynamic') effectCostDisplay = `2 PP`;

        let shortDescText = "";
        if (effect.effectName === "Enhanced Movement") shortDescText = "Provides one or more specialized forms of movement.";
        else if (effect.effectName === "Super-Senses") shortDescText = "Improves existing senses or grants entirely new ones.";
        else if (effect.effectName === "Comprehend") shortDescText = "Understand and speak with specific subjects.";
        else if (effect.effectName === "Immunity") shortDescText = "Immunity to specific descriptors, conditions, or entire defense checks.";
        else if (effect.effectName === "Feature") shortDescText = "Grants minor, specific benefits or quirks.";
        else if (effect.effectName === "Variable") shortDescText = `Provides <strong style="color: var(--accent-primary);">${effect.rank * 5} Variable Power Points</strong> you can allocate to different effects.`;
        else {
          shortDescText = effectData.shortDesc || "";
          if (!shortDescText && effectData.fullText) {
            const cleanText = effectData.fullText.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
            shortDescText = (cleanText.length <= 280) ? cleanText : (cleanText.substring(0, 277) + "...");
          }
        }

        const baseRange = effectData ? (effectData.range || "Close") : "Close";
        const effectiveRange = calculateEffectiveRange(effect, baseRange);
        const rankNum = Math.max(1, parseInt(effect.rank) || 1);

        // Check if this effect is targeted by any active Boost on the sheet
        const boostSubsidiesData = (typeof char.getBoostSubsidies === 'function') ? char.getBoostSubsidies() : { subsidies: {}, rankBonuses: {} };
        const isAlteringRanks = !!((char && char.houseRules && char.houseRules.boostAltersRanks) || (typeof localStorage !== 'undefined' && localStorage.getItem("mm2e_houserule_boost_alters_ranks") === "true"));
        let boostRankBonus = 0;
        let boostPPBonus = 0;

        const effectCustomName = (effect.name && effect.name !== 'New Effect' && effect.name !== effect.effectName) ? effect.name : '';
        const possibleTargets = [effect.id, effect.name, effect.effectName, effectCustomName, powerContainer.name].filter(Boolean);

        if (isAlteringRanks) {
          const rb = boostSubsidiesData.rankBonuses || {};
          for (const target of possibleTargets) {
            if (rb[target]) {
              boostRankBonus = rb[target];
              break;
            }
          }
        } else {
          const sb = boostSubsidiesData.subsidies || {};
          for (const target of possibleTargets) {
            if (sb[target]) {
              boostPPBonus = sb[target];
              break;
            }
          }
        }

        const perRankCost = (rawEffectCost > 0 && rankNum > 0) ? Math.max(1, Math.round(rawEffectCost / rankNum)) : 1;
        const effRank = isAlteringRanks ? (rankNum + boostRankBonus) : (rankNum + Math.floor(boostPPBonus / perRankCost));
        const isBoosted = (boostRankBonus > 0 || boostPPBonus > 0);

        let boostBadgeHtml = '';
        if (boostRankBonus > 0) {
          const effRankTitle = `Effective Rank: ${effRank} (Base Rank: ${rankNum} + ${boostRankBonus} from active Boost)`;
          boostBadgeHtml = `<span class="badge badge-boost-active" title="${effRankTitle}" style="font-size: var(--font-size-tags); font-weight: bold; background: rgba(16, 185, 129, 0.18); color: #10b981; border: 1px solid #10b981; white-space: nowrap; display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 4px;">⚡ +${boostRankBonus} Boost (Eff: ${effRank})</span>`;
        } else if (boostPPBonus > 0) {
          const effRankTitle = `Boosted by +${boostPPBonus} PP pool from active Boost (Effective Rank: ${effRank})`;
          boostBadgeHtml = `<span class="badge badge-boost-active" title="${effRankTitle}" style="font-size: var(--font-size-tags); font-weight: bold; background: rgba(16, 185, 129, 0.18); color: #10b981; border: 1px solid #10b981; white-space: nowrap; display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 4px;">⚡ +${boostPPBonus} PP Boost (Eff: ${effRank})</span>`;
        }

        if (!isAlteringRanks && boostPPBonus > 0 && effect.association !== 'alternate' && effect.association !== 'dynamic') {
          effectCostDisplay = `${Math.max(0, rawEffectCost - boostPPBonus)} PP`;
        }

        const PROGRESSION_VALUES = [
          1, 2, 5, 10, 25, 50, 100, 250, 500, 1000,
          2500, 5000, 10000, 25000, 50000, 100000,
          250000, 500000, 1000000, 2500000, 5000000,
          10000000, 25000000, 50000000, 100000000
        ];
        const getProgMult = (r) => PROGRESSION_VALUES[Math.min(Math.max(0, r), PROGRESSION_VALUES.length - 1)] || 1;

        const hasAreaMod = effect.modifiers ? effect.modifiers.some(m => !m.name.startsWith("Progression") && ((m.category === "extra" && m.name.includes("Area")) || m.name === "Area" || m.name.startsWith("Area (") || m.name.includes("Area (") || m.name.startsWith("Targeted Area") || m.name.startsWith("General Area"))) : false;
        const hasPortalMod = effect.modifiers ? effect.modifiers.some(m => m.name === "Portal") : false;

        const isDimPocket = effect.name === "Dimensional Pocket" || 
                            effect.effectName === "Dimensional Pocket" || 
                            (effect.subPowers && effect.subPowers.some(s => s.name && s.name.includes("Pocket Dimension"))) || 
                            (effect.effectName === "Super-Movement" && ((effect.descriptors || "").includes("Dimensional") || (effect.notes || "").toLowerCase().includes("pocket") || (effect.name || "").toLowerCase().includes("pocket")));

        const isAnimateObjects = effect.name === "Animate Objects" || 
                                effect.effectName === "Animate Objects" || 
                                (effect.effectName === "Summon" && (effect.name || "").toLowerCase().includes("animate"));

        const progAreaMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Progression (Area)" || (m.name === "Progression" && (hasAreaMod || hasPortalMod || effect.effectName === "Environmental Control" || effect.effectName === "Obscure" || effect.effectName === "Illusion" || effect.effectName === "Create Object" || effect.name === "Create Object"))) : null;
        const progAreaRanks = progAreaMod ? (parseInt(progAreaMod.ranks) || 1) : 0;

        const progRangeMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Progression (Range)" || (m.name === "Progression" && (effectiveRange === "Ranged" || effectiveRange === "Extended" || effectiveRange === "Rank" || effect.effectName === "Teleport" || effect.effectName === "Elongation" || effect.name === "Elasticity" || (effectData && effectData.type === "Movement")))) : null;
        const progRangeRanks = progRangeMod ? (parseInt(progRangeMod.ranks) || 1) : 0;

        const progMassMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Progression (Mass)" || m.name.startsWith("Progression (Mass)") || (m.name === "Progression" && (["Teleport", "Super-Movement", "Move Object", "Super-Strength", "Transform"].includes(effect.effectName) || ["Dimensional Pocket", "Telekinesis", "Transform", "Shape Matter", "Transmutation", "Animate Objects"].includes(effect.name) || isDimPocket || isAnimateObjects))) : null;
        const progMassRanks = progMassMod ? (parseInt(progMassMod.ranks) || 1) : 0;

        const progTargetsMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Progression (Targets)" || m.name === "Progression (Minions)" || m.name === "Progression (Duplicates)" || (m.name === "Progression" && ((effect.modifiers && effect.modifiers.some(x => x.name === "Affects Others" || x.name === "Split Attack")) || ["Summon", "Duplication", "Animate Objects"].includes(effect.effectName)))) : null;
        const progTargetsRanks = progTargetsMod ? (parseInt(progTargetsMod.ranks) || 1) : 0;

        const progDurMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Progression (Duration)") : null;
        const progDurRanks = progDurMod ? (parseInt(progDurMod.ranks) || 1) : 0;

        let reachRanks = 0;
        const reachMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Reach" || m.name === "Extended Reach") : null;
        if (reachMod) reachRanks = parseInt(reachMod.ranks) || 1;

        let rangeShift = 0;
        const extRangeMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Extended Range") : null;
        if (extRangeMod) rangeShift += (parseInt(extRangeMod.ranks) || 1);

        const dimRangeMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Diminished Range") : null;
        if (dimRangeMod) rangeShift -= (parseInt(dimRangeMod.ranks) || 1);
        rangeShift += progRangeRanks;

        let rangeDisplay = effectiveRange;

        if (effectiveRange === "Close" || effectiveRange === "Touch") {
          if (reachRanks > 0) {
            let reachDist = (typeof MEASUREMENT_TABLE !== 'undefined' && MEASUREMENT_TABLE[reachRanks.toString()]) ? MEASUREMENT_TABLE[reachRanks.toString()].dist_imp : (5 + reachRanks * 5) + " ft.";
            rangeDisplay = `Close (Reach: Rank ${reachRanks} / ${reachDist})`;
          } else {
            rangeDisplay = `Close (Adjacent / 5 ft.)`;
          }
        } else if (effectiveRange === "Ranged") {
          const multipliers = [
            { s: 2, m: 5, l: 10 },      // Shift -3 (Diminished Range 3)
            { s: 5, m: 10, l: 25 },     // Shift -2 (Diminished Range 2)
            { s: 10, m: 25, l: 50 },    // Shift -1 (Diminished Range 1)
            { s: 25, m: 50, l: 100 },   // Shift  0 (Standard Ranged)
            { s: 50, m: 100, l: 250 },  // Shift +1 (Extended Range 1)
            { s: 100, m: 250, l: 500 }, // Shift +2 (Extended Range 2)
            { s: 250, m: 500, l: 1000 },// Shift +3 (Extended Range 3)
            { s: 500, m: 1000, l: 2500 },// Shift +4 (Extended Range 4)
            { s: 1000, m: 2500, l: 5000 },// Shift +5 (Extended Range 5)
            { s: 2500, m: 5000, l: 10000 } // Shift +6 (Extended Range 6)
          ];
          let shiftIndex = 3 + rangeShift; 
          if (shiftIndex < 0) shiftIndex = 0;
          if (shiftIndex >= multipliers.length) shiftIndex = multipliers.length - 1;
          let mults = multipliers[shiftIndex];
          rangeDisplay = `Ranged (Short: ${rankNum * mults.s} ft. / Med: ${rankNum * mults.m} ft. / Long: ${rankNum * mults.l} ft.)`;
        } else if (effectiveRange === "Perception") {
          rangeDisplay = "Perception (Line of sight / Accurate Sense)";
        } else if (effectiveRange === "Personal") {
          rangeDisplay = "Personal";
        } else if (effectiveRange === "Rank" || effectiveRange === "Extended") {
          let effRank = Math.max(1, rankNum + rangeShift);
          let dist = (typeof MEASUREMENT_TABLE !== 'undefined' && MEASUREMENT_TABLE[effRank.toString()]) ? MEASUREMENT_TABLE[effRank.toString()].dist_imp : "Special";
          rangeDisplay = `${effectiveRange} (Rank ${effRank} / ${dist})`;
        }

        // Distance & Speed
        let distanceDisplay = "";
        if (effect.effectName === "Teleport") {
          const moveMult = getProgMult(progRangeRanks);
          const moveDistFt = rankNum * 100 * moveMult;
          const moveDistStr = moveDistFt >= 5280 ? `${(moveDistFt / 5280).toFixed(1)} miles` : `${moveDistFt.toLocaleString()} ft.`;
          
          const extTable = [
            "None", "None", "50 miles", "100 miles", "250 miles", "500 miles",
            "1,000 miles", "2,500 miles", "5,000 miles", "10,000 miles", "25,000 miles", "50,000 miles",
            "100,000 miles", "250,000 miles", "500,000 miles", "1,000,000 miles", "2,500,000 miles",
            "5,000,000 miles", "10,000,000 miles", "25,000,000 miles", "50,000,000 miles"
          ];
          let extDistStr = "None";
          if (rankNum >= 3) {
            const extIdx = Math.min(extTable.length - 1, (rankNum - 1) + progRangeRanks);
            extDistStr = extTable[extIdx] || `${extTable[extTable.length - 1]}+`;
          }
          distanceDisplay = `Move: ${moveDistStr} | Extended (Rank 3+): ${extDistStr}`;
        } else if (effect.effectName === "Flight" || effect.effectName === "Speed") {
          const speedMphTable = [
            "10 MPH", "25 MPH", "50 MPH", "100 MPH", "250 MPH", "500 MPH",
            "1,000 MPH", "2,500 MPH", "5,000 MPH", "10,000 MPH", "25,000 MPH", "50,000 MPH",
            "100,000 MPH", "250,000 MPH", "500,000 MPH", "1,000,000 MPH", "2,500,000 MPH",
            "5,000,000 MPH", "Near Light Speed", "Light Speed"
          ];
          const sIdx = Math.min(speedMphTable.length - 1, (rankNum - 1) + progRangeRanks);
          distanceDisplay = speedMphTable[sIdx] || "Special";
        } else if (effect.effectName === "Burrowing") {
          const burrowTable = [
            "1 MPH", "2.5 MPH", "5 MPH", "10 MPH", "25 MPH", "50 MPH",
            "100 MPH", "250 MPH", "500 MPH", "1,000 MPH", "2,500 MPH", "5,000 MPH"
          ];
          const bIdx = Math.min(burrowTable.length - 1, (rankNum - 1) + progRangeRanks);
          distanceDisplay = burrowTable[bIdx] || "Special";
        } else if (effect.effectName === "Swimming") {
          const swimTable = [
            "2.5 MPH", "5 MPH", "10 MPH", "25 MPH", "50 MPH", "100 MPH",
            "250 MPH", "500 MPH", "1,000 MPH", "2,500 MPH", "5,000 MPH"
          ];
          const swIdx = Math.min(swimTable.length - 1, (rankNum - 1) + progRangeRanks);
          distanceDisplay = swimTable[swIdx] || "Special";
        } else if (effect.effectName === "Leaping") {
          const leapMult = getProgMult(rankNum - 1 + progRangeRanks);
          distanceDisplay = `×${leapMult.toLocaleString()} normal jumping distance`;
        } else if (effect.effectName === "Elongation" || effect.name === "Elongation" || effect.name === "Elasticity") {
          const elDistFt = 5 * getProgMult(rankNum - 1 + progRangeRanks);
          const elDistStr = elDistFt >= 5280 ? `${(elDistFt / 5280).toFixed(1)} miles` : `${elDistFt.toLocaleString()} ft.`;
          distanceDisplay = `Reach / Move: ${elDistStr}`;
        }

        // Area
        let areaDisplay = "";
        const areaProgMult = getProgMult(progAreaRanks);
        if (hasPortalMod) {
          const pSize = 5 * areaProgMult;
          areaDisplay = `${pSize.toLocaleString()} ft. × ${pSize.toLocaleString()} ft. gateway`;
        } else if (hasAreaMod) {
          const areaObj = effect.modifiers.find(m => m.name === "Area" || m.name.startsWith("Area (") || m.name.includes("Area"));
          const areaName = areaObj ? areaObj.name : "Area";
          if (areaName.includes("Line")) {
            const lLen = rankNum * 20 * areaProgMult;
            areaDisplay = `${lLen.toLocaleString()} ft. long × 5 ft. wide line`;
          } else if (areaName.includes("Cone")) {
            const cLen = rankNum * 10 * areaProgMult;
            areaDisplay = `${cLen.toLocaleString()} ft. cone`;
          } else if (areaName.includes("Shapeable")) {
            const cubes = rankNum * areaProgMult;
            areaDisplay = `${cubes.toLocaleString()} continuous 5-ft. cubes`;
          } else {
            const rad = rankNum * 5 * areaProgMult;
            areaDisplay = rad >= 5280 ? `${(rad / 5280).toFixed(1)} miles radius` : `${rad.toLocaleString()} ft. radius`;
          }
        } else if (effect.effectName === "Environmental Control" || effect.effectName === "Obscure") {
          const baseRadIdx = Math.max(0, (rankNum - 1) + progAreaRanks);
          const rad = 5 * getProgMult(baseRadIdx);
          areaDisplay = rad >= 5280 ? `${(rad / 5280).toFixed(1)} miles radius` : `${rad.toLocaleString()} ft. radius`;
        } else if (effect.effectName === "Illusion") {
          const rad = 5 * areaProgMult;
          areaDisplay = `${rad.toLocaleString()} ft. radius`;
        } else if (effect.effectName === "Create Object" || effect.name === "Create Object") {
          const cubes = rankNum * areaProgMult;
          areaDisplay = `${cubes.toLocaleString()} 5-ft. cube${cubes > 1 ? 's' : ''} (Toughness ${rankNum})`;
        }

        // Cargo / Mass
        let massDisplay = "";
        const MASS_STEPS = [
          "100 lbs.", "250 lbs.", "500 lbs.", "1,000 lbs. (1/2 ton)", "2,500 lbs. (1.25 tons)",
          "5,000 lbs. (2.5 tons)", "10,000 lbs. (5 tons)", "25,000 lbs. (12.5 tons)", "50,000 lbs. (25 tons)",
          "100,000 lbs. (50 tons)", "250,000 lbs. (125 tons)", "500,000 lbs. (250 tons)", "1,000,000 lbs. (500 tons)",
          "2,500,000 lbs. (1,250 tons)", "5,000,000 lbs. (2,500 tons)", "10,000,000 lbs. (5,000 tons)",
          "25,000,000 lbs. (12,500 tons)", "50,000,000 lbs. (25,000 tons)", "100,000,000 lbs. (50,000 tons)",
          "250,000,000 lbs. (125,000 tons)", "500,000,000 lbs. (250,000 tons)"
        ];

        if (isDimPocket || isAnimateObjects) {
          const stepIdx = Math.max(0, (rankNum - 1) + progMassRanks);
          massDisplay = MASS_STEPS[Math.min(stepIdx, MASS_STEPS.length - 1)] || `${MASS_STEPS[MASS_STEPS.length - 1]}+`;
        } else if (effect.effectName === "Teleport" || effect.name === "Teleport") {
          const stepIdx = Math.max(0, progMassRanks);
          massDisplay = MASS_STEPS[Math.min(stepIdx, MASS_STEPS.length - 1)] || `${MASS_STEPS[MASS_STEPS.length - 1]}+`;
        } else if (effect.effectName === "Transform" || effect.name === "Transform" || ["Transmutation", "Shape Matter", "Petrification", "Color Control", "Mutation"].includes(effect.name)) {
          const TRANSFORM_MASS_STEPS = [
            "1 lb.", "2 lbs.", "5 lbs.", "10 lbs.", "25 lbs.", "50 lbs.",
            ...MASS_STEPS
          ];
          const stepIdx = Math.max(0, (rankNum - 1) + progMassRanks);
          massDisplay = TRANSFORM_MASS_STEPS[Math.min(stepIdx, TRANSFORM_MASS_STEPS.length - 1)] || `${TRANSFORM_MASS_STEPS[TRANSFORM_MASS_STEPS.length - 1]}+`;
        } else if (effect.effectName === "Move Object" || effect.name === "Move Object" || ["Telekinesis", "Air Control", "Earth Control", "Magnetic Control", "Water Control"].includes(effect.name)) {
          const effStr = (rankNum * 5) + (progMassRanks * 5);
          const cap = (typeof CharacterModel !== 'undefined' && CharacterModel.getCarryingCapacity) 
            ? CharacterModel.getCarryingCapacity(effStr) 
            : `${Math.round(100 * Math.pow(2, (effStr - 10) / 5)).toLocaleString()} lbs.`;
          massDisplay = `Max Load: ${cap} (Str ${effStr})`;
        } else if (effect.effectName === "Super-Strength" || effect.name === "Super-Strength") {
          const effBonus = (rankNum + progMassRanks) * 5;
          massDisplay = `+${effBonus} Str to Carrying Capacity`;
        } else if (progMassRanks > 0 || (effect.modifiers && effect.modifiers.some(m => m.name.startsWith("Progression (Mass)")))) {
          massDisplay = MASS_STEPS[Math.min(progMassRanks, MASS_STEPS.length - 1)] || `${MASS_STEPS[MASS_STEPS.length - 1]}+`;
        }

        // Targets
        let targetsDisplay = "";
        if (progTargetsRanks > 0 || (effect.modifiers && effect.modifiers.some(m => m.name === "Affects Others" || m.name === "Split Attack")) || ["Summon", "Duplication", "Animate Objects"].includes(effect.effectName)) {
          const tCount = getProgMult(progTargetsRanks);
          const noun = (effect.effectName === "Summon" || effect.name === "Summon") ? "minion" : ((effect.effectName === "Duplication" || effect.name === "Duplication") ? "duplicate" : "subject");
          targetsDisplay = `${tCount.toLocaleString()} ${noun}${tCount > 1 ? 's' : ''}`;
        }

        // Save DC / Check
        let saveDcDisplay = window.getEffectSaveDc ? window.getEffectSaveDc(effect, (isBoosted && effRank > rankNum) ? effRank : null) : (effectiveTraits.check || "None");
        const hasNoAttackRollMod = Array.isArray(effect.modifiers) && effect.modifiers.some(m => m.name === "No Attack Roll");
        if (hasNoAttackRollMod) {
          if (saveDcDisplay && saveDcDisplay !== "None" && saveDcDisplay !== "—") {
            saveDcDisplay += " (No attack roll required)";
          } else {
            saveDcDisplay = "No attack roll required";
          }
        }

        let measurementHtml = "";
        if (typeof MEASUREMENT_TABLE !== 'undefined') {
          const effRankStr = Math.min(30, Math.max(1, rankNum + progDurRanks)).toString();
          const mData = MEASUREMENT_TABLE[effRankStr] || MEASUREMENT_TABLE["20"];
          
          let effMassRank = rankNum + progMassRanks;
          const massData = MEASUREMENT_TABLE[Math.min(30, Math.max(1, effMassRank)).toString()] || MEASUREMENT_TABLE["20"];

          let effDistRank = rankNum + progRangeRanks;
          if (effectiveRange === "Rank" || effectiveRange === "Extended") {
              effDistRank = Math.max(1, effDistRank + rangeShift);
          }
          if (hasAreaMod || hasPortalMod) {
             effDistRank = rankNum + progAreaRanks;
          }
          
          const distData = MEASUREMENT_TABLE[Math.min(30, Math.max(1, effDistRank)).toString()] || MEASUREMENT_TABLE["20"];

          if (mData && effect.effectName) {
            const showDist = Boolean(effectiveRange === "Rank" || effectiveRange === "Extended" || effect.effectName === "Elongation" || effect.name === "Elasticity");
            const showMass = Boolean(massDisplay !== "" || ["Move Object", "Super-Strength", "Transform"].includes(effect.effectName) || isDimPocket || isAnimateObjects || progMassRanks > 0 || (effect.modifiers && effect.modifiers.some(m => m.name.startsWith("Progression (Mass)"))));
            const showTime = Boolean(effect.effectName === "Quickness" || effect.name === "Quickness" || progDurRanks > 0 || (effect.modifiers && effect.modifiers.some(m => m.name.includes("Slow Fade") || m.name.includes("Progression (Duration)") || m.name.includes("Progression (Time)"))));
            const showTable = Boolean((showDist || showMass || showTime) && effect.effectName !== "Enhanced Movement");
            
            if (showTable) {
                measurementHtml = `
                  <div style="margin-top: 6px; padding-top: 6px; border-top: 1px dashed var(--border-color); display: flex; gap: 16px; flex-wrap: wrap; font-size: calc(var(--font-size-secondary) * 0.95); font-family: monospace;">
                    <strong style="color: var(--accent-primary);">Table 2-1 Benchmarks:</strong>
                    ${showDist ? `<span><strong>Dist:</strong> ${distData ? distData.dist_imp : 'Special'}</span>` : ''}
                    ${showMass ? `<span><strong>Mass:</strong> ${massData && massData.mass_imp ? massData.mass_imp : (massDisplay || 'Special')}</span>` : ''}
                    ${showTime ? `<span><strong>Time:</strong> ${mData ? mData.time : 'Special'}</span>` : ''}
                  </div>
                `;
            }
          }
        }

        let allTemplates = [];
        if (typeof POWER_PROFILES_LIST !== 'undefined') {
            allTemplates = [...POWER_PROFILES_LIST];
        } else if (typeof POWER_EFFECTS_LIST !== 'undefined') {
            POWER_EFFECTS_LIST.forEach(eff => {
              if (eff.profiles) {
                eff.profiles.forEach(cfg => {
                  allTemplates.push({ ...cfg, effectName: cfg.effectName || eff.name });
                });
              }
            });
        }
        allTemplates.sort((a, b) => a.name.localeCompare(b.name));

        const showAll = effect.showAllProfiles;
        const availableTemplates = (showAll || !effect.effectName) ? allTemplates : (effectData.profiles || []);
        const isCustomProfile = effect.isProfileExplicitlySelected || (effect.name && effect.name !== 'New Effect' && effect.name !== effect.effectName);

        let templateDropdownHtml = `
          <div style="display: flex; align-items: center; gap: 6px;">
            <select class="minor-control" style="width: 160px; ${isCustomProfile ? 'color: var(--accent-primary); font-weight: bold;' : ''}" onchange="applyEffectProfile(${pIdx}, ${eIdx}, this.value)">
              <option value="" ${!isCustomProfile ? 'selected' : ''} style="color: var(--text-main); font-weight: normal;">- Select Profile -</option>
              ${availableTemplates.map(cfg => {
                  let baseProfName = cfg.name.replace(" - M&M 2E UP", "").trim();
                  let isSameAsEffect = baseProfName === cfg.effectName;
                  let styleStr = isSameAsEffect ? 'color: var(--text-main); font-weight: bold;' : 'color: var(--text-main); font-weight: normal;';
                  let suffix = "";
                  if (!isSameAsEffect && cfg.effectName && cfg.effectName !== 'Pre-built Powers') {
                      suffix = ` (${cfg.effectName})`;
                  }
                  return `<option value="${cfg.name}" ${isCustomProfile && cfg.name === effect.name ? 'selected' : ''} style="${styleStr}">${cfg.name}${suffix}</option>`;
              }).join('')}
            </select>
            <label style="display: inline-flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; font-weight: normal; cursor: pointer; font-size: calc(var(--font-size-minor-controls) * 0.9); margin-left: 2px; line-height: 1;">
              <input type="checkbox" onchange="toggleAllProfiles(${pIdx}, ${eIdx}, this.checked)" ${showAll ? 'checked' : ''} style="margin: 0;">
              <span style="text-align: center;">Show<br>All</span>
            </label>
          </div>
        `;

        let subPowersHtml = "";
        if (effect.subPowers && effect.subPowers.length > 0) {
          subPowersHtml = effect.subPowers.map((sub, sIdx) => {
            let subMaxR = window.getMaxPowerRank(effect, sub);
            let sRank = sub.rank !== undefined ? sub.rank : 1;
            let dynDesc = "";
            let sType = sub.type || sub.name;
            
            let placeholderText = "Details, specifics, or configurations...";

            let mData = typeof MEASUREMENT_TABLE !== 'undefined' ? MEASUREMENT_TABLE[sRank.toString()] : null;
            let subMeasurementHtml = "";

            let isSenseTypeOpt = sType.includes("Sense Type");
            let mySenseType = sub.senseCategory || SENSE_TYPE_MAP[sType] || (isSenseTypeOpt ? sType.replace("Sense Type", "").trim() : "Unknown");

            let cleanSubName = (sub.type || sub.name || "").split(" [")[0].trim();
            let defaults = INHERENT_SENSE_TRAITS[cleanSubName] || INHERENT_SENSE_TRAITS[sType] || [];
            let defaultText = defaults.length > 0 ? `<div style="margin-top: 2px; color: var(--accent-primary);"><strong>Inherent Traits:</strong> ${defaults.join(", ")}</div>` : "";

            if (sType.includes("Air Walking")) {
                dynDesc = sRank >= 2 ? "Walk on air at full ground speed." : "Walk on air at half ground speed (tread air).";
            } else if (sType.includes("Dimensional Movement") || sType.includes("Dimensional Travel")) {
                let dest = "Home dimension and one other (Rank 1)";
                if (sRank >= 3) { dest = "Any dimension (Rank 3)"; }
                else if (sRank >= 2) { dest = "A related group of dimensions (Rank 2)"; }
                
                const incMassMod = sub.modifiers ? sub.modifiers.find(m => m.name.includes("Increased Mass") || m.name.includes("Progression (Mass)")) : null;
                let massIncrease = incMassMod ? (parseInt(incMassMod.ranks) || 1) : 0;
                let massStr = "50 lbs (Rank 0)";
                if (typeof CharacterModel !== 'undefined') {
                    massStr = CharacterModel.formatWeight(CharacterModel.getProgressionValue(massIncrease) * 5) + " (Rank " + massIncrease + ")";
                }
                dynDesc = `<strong>Destination Tier:</strong> ${dest}. <br><strong>Mass Capacity:</strong> ${massStr}.`;
            } else if (sType.includes("Space Travel")) {
                let dest = "Sub-light travel within a star system (Rank 1)";
                if (sRank >= 3) { dest = "Intergalactic / distant star systems (Rank 3)"; }
                else if (sRank >= 2) { dest = "Interstellar / other star systems (Rank 2)"; }
                dynDesc = `<strong>Destination Tier:</strong> ${dest}.`; 
            } else if (sType.includes("Temporal Movement")) {
                let dest = "Fixed point in time (Rank 1)";
                if (sRank >= 3) { dest = "Any point in time (Rank 3)"; }
                else if (sRank >= 2) { dest = "Related era of time (Rank 2)"; }
                dynDesc = `<strong>Temporal Range:</strong> ${dest}.`;
            } else if (sType.includes("Environmental Adaptation")) {
                placeholderText = "Specify adapted environment(s) (e.g. Underwater, Zero-G)...";
                dynDesc = `Provides normal movement and action in ${sRank} specific hazardous environment(s).`;
            } else if (sType.includes("Permeate")) {
                let spd = "1/4 normal speed (Rank 1)";
                if (sRank >= 3) { spd = "Full normal speed (Rank 3)"; }
                else if (sRank >= 2) { spd = "1/2 normal speed (Rank 2)"; }
                dynDesc = `<strong>Permeate Speed:</strong> ${spd} through solid obstacles.`;
            } else if (sType.includes("Wall-Crawling")) {
                dynDesc = sRank >= 2 ? "Climb walls and ceilings at full ground speed; not flat-footed." : "Climb walls and ceilings at half ground speed; flat-footed while climbing.";
            } else if (sType.includes("Water Walking") || sType.includes("Water-Walking")) {
                dynDesc = sRank >= 2 ? "Can walk, stand, run, or lie prone on liquid surfaces." : "Can walk, stand, and run across liquid surfaces (sinks if knocked prone).";
            } else if (sType.includes("Slow Fall") || sType.includes("Safe Fall")) {
                dynDesc = "Automatically fall at terminal speed of 25 mph, taking no falling damage.";
            } else if (sType.includes("Slithering")) {
                dynDesc = "Crawl at normal ground speed while prone.";
            } else if (sType.includes("Swinging")) {
                dynDesc = "Swing through the air using lines or webs at normal ground speed.";
            } else if (sType.includes("Sure-Footed") || sType.includes("Stable")) {
                placeholderText = "Notes or specifics...";
                dynDesc = `Reduce movement penalties for difficult movement by ${Math.min(100, sRank * 25)}%${sRank >= 4 ? ' (ignore all penalties)' : ''}.`;
            } else if (sType.includes("Trackless")) {
                placeholderText = "Specify sense type(s)...";
                dynDesc = sRank >= 3 ? "Leave no trail and cannot be tracked by any sense type." : `Leave no trail and cannot be tracked by ${sRank} sense type(s).`;
            } else if (sType.includes("Microscopic Vision")) {
                dynDesc = sRank >= 4 ? "Atomic scale" : (sRank >= 3 ? "DNA / Molecules" : (sRank >= 2 ? "Cellular scale" : "Dust-sized"));
            } else if (sType.includes("Sense Type")) {
              if (mySenseType === "Visual") dynDesc = "Includes: Normal Sight, Low-Light, Darkvision, Infra-Vision, Ultra-Vision, Microscopic, etc.";
              else if (mySenseType === "Auditory") dynDesc = "Includes: Normal Hearing, Ultra-Hearing, Ultrasonic, Sonar, etc.";
              else if (mySenseType === "Radio") dynDesc = "Includes: Radio, Radar, etc.";
              else if (mySenseType === "Mental") dynDesc = "Includes: Mental Awareness, Detect Minds, Danger Sense, etc.";
              else if (mySenseType === "Tactile") dynDesc = "Includes: Normal Touch, Ranged Touch, Tremorsense, etc.";
              else if (mySenseType === "Olfactory") dynDesc = "Includes: Normal Smell, Normal Taste, Tracking Scent, etc.";
              else dynDesc = `All senses within the ${mySenseType} sense type.`;
            } else if (effect.effectName === "Comprehend") {
              if (sType.includes("Animals")) dynDesc = sRank === 1 ? "Communicate to OR comprehend animals." : "Communicate to AND comprehend animals.";
              else if (sType.includes("Computers") || sType.includes("Machines")) dynDesc = sRank === 1 ? "Communicate to OR receive from digital devices / machines." : "Communicate to AND comprehend digital devices / machines.";
              else if (sType.includes("Languages")) {
                if (sRank === 1) dynDesc = "Understand OR speak any one language at a time (or read any).";
                else if (sRank === 2) dynDesc = "Speak and understand all languages.";
                else if (sRank === 3) dynDesc = "Read, write, speak, and understand all languages.";
                else dynDesc = "Speak, read, write, and understand all languages, and communicate across language barriers (anyone can understand you).";
              } else if (sType.includes("Objects")) dynDesc = "Read psychic impressions and past experiences from inanimate objects.";
              else if (sType.includes("Plants")) dynDesc = sRank === 1 ? "Communicate to OR comprehend plants." : "Communicate to AND comprehend plants.";
              else if (sType.includes("Spirits")) dynDesc = sRank === 1 ? "Communicate with spirits (ghosts, astral forms)." : "Communicate with spirits and they are compelled to understand you.";
            } else if (effect.effectName === "Features" || effect.effectName === "Feature") {
              dynDesc = sub.desc || "Grants a minor utility benefit or quirk.";
              placeholderText = "Details or description...";
            } else if (effect.effectName === "Enhanced Trait") {
              if (typeof ADVANTAGES_LIST !== 'undefined' && ADVANTAGES_LIST.some(a => a.name === sType)) {
                let adv = ADVANTAGES_LIST.find(a => a.name === sType);
                dynDesc = adv ? (adv.description || adv.conditionalSummary || "Enhanced feat.") : "Enhanced feat.";
              } else if (typeof SKILLS_LIST !== 'undefined' && SKILLS_LIST.some(s => s.name === sType)) {
                dynDesc = `Provides +${sRank} enhanced skill rank to ${sType} checks.`;
              } else {
                dynDesc = `Provides +${sRank} enhanced rank to ${sType}.`;
              }
              placeholderText = "Notes, descriptor specifics, or limits...";
            } else if (effect.effectName === "Affliction") {
              dynDesc = `Applies the '${sType}' condition on a target at this degree.`;
            } else if (effect.effectName === "Immunity") {
              if (sType.includes("Life Support")) dynDesc = "Immunity to all Environmental Hazards (Aging, Cold, Deprivation, Disease, Heat, Poison, Pressure, Radiation, Sleep, Suffocation, Vacuum).";
              else if (sType.includes("Very Common Descriptor")) dynDesc = "Immunity to a Very Common descriptor (e.g. Energy Damage, Bludgeoning Damage, Piercing Damage, Slashing Damage).";
              else if (sType.includes("Common Descriptor")) dynDesc = "Immunity to a Common descriptor (e.g. all effects of a type like Cold, Electricity, Fire, Radiation, Weather, or Ballistic Damage).";
              else if (sType.includes("Uncommon Descriptor")) dynDesc = "Immunity to an Uncommon descriptor (e.g. Fire Damage, Cold Damage, Electricity Damage, Radiation Damage, Falling Damage, Entrapment, Dazzle, Fatigue).";
              else if (sType.includes("Rare Descriptor")) dynDesc = "Immunity to a Rare descriptor (e.g. Chemical, Fear, Gravitic, Holy, or Critical Hits).";
              else if (sType.includes("Very Rare Descriptor")) dynDesc = "Immunity to a Very Rare descriptor (e.g. own powers, specific individual's powers).";
              else if (sType.includes("Custom Immunity")) dynDesc = "Specify custom immunity details below.";
              else dynDesc = `Immunity to ${sType}.`;
              if (sType.includes("Descriptor") || sType.includes("Custom") || sType.includes("One Type")) placeholderText = "Specify descriptor or details...";
            }

            if (effect.effectName === "Super-Senses") {
                if (!dynDesc && defaultText) {
                    dynDesc = defaultText;
                } else if (dynDesc) {
                    dynDesc += defaultText;
                }
            }

            let subModsHtml = "";
            let metaTagsHtml = "";
            if (!isSenseTypeOpt && mySenseType !== "Unknown" && sub.modifiers && sub.modifiers.length > 0) {
                let parentSenseTypeSub = effect.subPowers.find(sp => {
                    let t = sp.type || sp.name || "";
                    return t.includes("Sense Type") && (sp.senseCategory === mySenseType || t.includes(mySenseType));
                });
                if (parentSenseTypeSub && parentSenseTypeSub.modifiers) {
                    let parentMetaNames = parentSenseTypeSub.modifiers.map(pm => pm.name.split(" (")[0].trim());
                    sub.modifiers = sub.modifiers.filter(sm => {
                        let coreName = sm.name.split(" (")[0].trim();
                        return !parentMetaNames.includes(coreName);
                    });
                }
            }

            const supersetNamesForSub = getSupersetsForOption(effect.effectName, cleanSubName);
            if (supersetNamesForSub.length > 0 && sub.modifiers && sub.modifiers.length > 0 && effect.subPowers) {
                const parentSubs = effect.subPowers.filter(sp => {
                    const spClean = (sp.name || sp.type || "").split(" [")[0].trim();
                    return supersetNamesForSub.includes(spClean);
                });
                if (parentSubs.length > 0) {
                    const parentModifierCores = [];
                    parentSubs.forEach(ps => {
                        (ps.modifiers || []).forEach(pm => {
                            const core = pm.name.split(" (")[0].split(" [")[0].trim();
                            if (!parentModifierCores.includes(core)) parentModifierCores.push(core);
                        });
                    });
                    if (parentModifierCores.length > 0) {
                        sub.modifiers = sub.modifiers.filter(sm => {
                            const coreName = sm.name.split(" (")[0].split(" [")[0].trim();
                            if ((coreName === "Affects Others" || coreName === "Affects Others Only") &&
                                (parentModifierCores.includes("Affects Others") || parentModifierCores.includes("Affects Others Only"))) {
                                return false;
                            }
                            if (coreName === "Redirect" && parentModifierCores.includes("Redirect")) {
                                return false;
                            }
                            return !parentModifierCores.includes(coreName);
                        });
                    }
                }
            }

            if (sub.modifiers && sub.modifiers.length > 0) {
              sub.modifiers.forEach((sMod, smIdx) => {
                if (sMod.isMeta) {
                  let m = sMod.name;
                  let mClean = m.split(" [+")[0].trim();
                  let smRank = parseInt(sMod.ranks) || 1;
                  let mDescText = "";
                  
                  if (m.includes("Extended")) {
                      let mult = Math.pow(10, smRank).toLocaleString();
                      mDescText = `<p>Multiplies the range increment for the sense by 10 per rank.</p><p><strong>Rank ${smRank}:</strong> <strong>x${mult} distance</strong> (–1 Notice check penalty per ${mult}0 feet rather than every 10 feet).</p>`;
                  } else if (m.includes("Rapid")) {
                      let mult = Math.pow(10, smRank).toLocaleString();
                      mDescText = `<p>Decreases the time needed to use the sense by a factor of 10 per rank.</p><p><strong>Rank ${smRank}:</strong> <strong>x${mult} perception speed</strong> (read, assess, or process sensory information ${mult} times faster).</p>`;
                  } else if (m.includes("Accurate")) {
                      mDescText = "<p>Accurate senses can be used to target things in combat without penalty (like normal human sight). Attacks made relying solely on inaccurate senses suffer a 50% miss chance.</p>";
                  } else if (m.includes("Acute")) {
                      mDescText = "<p>Acute senses can perceive fine details and distinguish between specific individuals or items of the same general type (like normal human sight or hearing).</p>";
                  } else if (m.includes("Analytical")) {
                      mDescText = "<p>Analytical senses can perceive detailed composition, exact measurements, and qualitative properties (such as chemical breakdown, structural flaws, or exact energy signatures).</p>";
                  } else if (m.includes("Counters Concealment")) {
                      mDescText = m.includes("All") ? "<p>Ignores <strong>all</strong> concealment effects (darkness, smoke, invisibility, etc.), allowing normal perception and targeting.</p>" : "<p>Ignores concealment of a <strong>specific descriptor</strong> (such as darkness, smoke, or invisibility).</p>";
                  } else if (m.includes("Counters Illusion")) {
                      mDescText = "<p>Immediately recognizes and pierces illusions perceived by this sense as false, allowing you to ignore illusionary effects.</p>";
                  } else if (m.includes("Counters Obscure")) {
                      mDescText = m.includes("All") ? "<p>Ignores <strong>all</strong> Obscure effects, allowing normal perception regardless of obscuring fields.</p>" : "<p>Ignores Obscure effects of a <strong>specific descriptor</strong> (such as magical darkness, fog, or radio jamming).</p>";
                  } else if (m.includes("Penetrates Concealment")) {
                      mDescText = "<p>Perceives through solid barriers and obstacles as if they were transparent (like X-Ray vision), up to the sense's normal range increment.</p>";
                  } else if (m.includes("Radius")) {
                      mDescText = "<p>Can perceive in a full 360-degree radius all around you at once without turning or suffering blind spots.</p>";
                  } else if (m.includes("Ranged")) {
                      mDescText = "<p>Can perceive at a distance beyond personal touch or reach, with range increments based on the sense type.</p>";
                  } else if (m.includes("Tracking")) {
                      mDescText = m.includes("Full Speed") ? "<p>Can follow sensory trails left by subjects at <strong>full normal movement speed</strong> without penalty.</p>" : "<p>Can follow sensory trails left by subjects at <strong>half normal movement speed</strong> with Survival or Notice checks.</p>";
                  } else {
                      mDescText = `<p>${mClean} sense modifier.</p>`;
                  }
                  
                  let stepperHtml = "";
                  if (sMod.costType === "per_rank") {
                      stepperHtml = `
                        <div class="modifier-stepper-group" style="margin-left: 6px;">
                          <button type="button" class="modifier-stepper-btn" onclick="stepSubPowerModifierRank(${pIdx}, ${eIdx}, ${sIdx}, ${smIdx}, -1, 1, 10)">−</button>
                          <span class="modifier-stepper-val">${smRank}</span>
                          <button type="button" class="modifier-stepper-btn" onclick="stepSubPowerModifierRank(${pIdx}, ${eIdx}, ${sIdx}, ${smIdx}, 1, 1, 10)">+</button>
                        </div>
                      `;
                  }
                  
                  metaTagsHtml += `
                    <div class="modifier-chip" style="background: rgba(59, 130, 246, 0.1); border-color: var(--accent-primary); display: inline-flex; align-items: center;">
                      <span><strong>${mClean}</strong></span>
                      ${stepperHtml}
                      <button type="button" class="btn-info-circle" style="margin-left: 2px; vertical-align: middle;" onclick="showOptionInfo('${mClean.replace(/'/g, "\\'")}', '${mDescText.replace(/'/g, "\\'").replace(/"/g, "&quot;")}')" title="View Modifier Details">?</button>
                      <button type="button" style="background: none; border: none; color: #ef4444; font-weight: bold; cursor: pointer; padding: 0 4px; margin-left: 4px;" onclick="removeSubPowerModifier(${pIdx}, ${eIdx}, ${sIdx}, ${smIdx})" title="Remove Meta-Option">✕</button>
                    </div>
                  `;
                } else {
                  let mRanks = parseInt(sMod.ranks) || 1;
                  let mCostType = sMod.costType === "flat" ? " flat" : "/r";
                  let mCost = sMod.cost !== undefined ? sMod.cost : 1;
                  let isEx = sMod.category === 'extra' ? '+' : '-';
                  let modClean = sMod.name.split(" [")[0].trim();
                  
                  subModsHtml += `
                    <div class="modifier-chip" style="display: inline-flex; align-items: center;">
                      <span><strong>${modClean}</strong> (${isEx}${mCost}${mCostType})</span>
                      <div class="modifier-stepper-group" style="margin-left: 6px;">
                        <button type="button" class="modifier-stepper-btn" onclick="stepSubPowerModifierRank(${pIdx}, ${eIdx}, ${sIdx}, ${smIdx}, -1, 1, 20)">−</button>
                        <span class="modifier-stepper-val">${mRanks}</span>
                        <button type="button" class="modifier-stepper-btn" onclick="stepSubPowerModifierRank(${pIdx}, ${eIdx}, ${sIdx}, ${smIdx}, 1, 1, 20)">+</button>
                      </div>
                      <button type="button" class="btn-info-circle" style="margin-left: 2px; vertical-align: middle;" onclick="showModifierInfo('${modClean.replace(/'/g, "\\'")}', '${(effect.effectName || effect.name || '').replace(/'/g, "\\'")}')" title="View Modifier Rule">?</button>
                      <button type="button" style="background: none; border: none; color: #ef4444; font-weight: bold; cursor: pointer; padding: 0 4px; margin-left: 4px;" onclick="removeSubPowerModifier(${pIdx}, ${eIdx}, ${sIdx}, ${smIdx})" title="Remove Modifier">✕</button>
                    </div>
                  `;
                }
              });
            }

            let metaPickerHtml = "";
            if (effect.effectName === "Super-Senses") {
              let metaChoices = [
                "- Select Option Modifier -",
                "Accurate (Single Sense) [+2 pts]", "Accurate (Sense Type) [+4 pts]", 
                "Acute (Single Sense) [+1 pt]", "Acute (Sense Type) [+2 pts]", 
                "Analytical (Single Sense) [+1 pt]", "Analytical (Sense Type) [+2 pts]",
                "Counters Concealment (One Descriptor) [+2 pts]", "Counters Concealment (All) [+5 pts]", 
                "Counters Illusion [+2 pts]", 
                "Counters Obscure (One Descriptor) [+2 pts]", "Counters Obscure (All) [+5 pts]",
                "Extended (Single Sense) [+1 pt/r]", "Extended (Sense Type) [+2 pts/r]", 
                "Penetrates Concealment [+4 pts]",
                "Radius (Single Sense) [+1 pt]", "Radius (Sense Type) [+2 pts]", 
                "Ranged (Single Sense) [+1 pt]", "Ranged (Sense Type) [+2 pts]",
                "Rapid (Single Sense) [+1 pt/r]", "Rapid (Sense Type) [+2 pts/r]", 
                "Tracking (Half Speed) [+1 pt]", "Tracking (Full Speed) [+2 pts]"
              ];

              let isSenseType = sub.isSenseType || isSenseTypeOpt;

              if (isSenseType) {
                  metaChoices = metaChoices.filter(c => c.startsWith("- Select") || c.includes("(Sense Type)") || c.includes("Counters Concealment") || c.includes("Counters Illusion") || c.includes("Counters Obscure") || c.includes("Penetrates Concealment") || c.includes("Tracking"));
              } else {
                  metaChoices = metaChoices.filter(c => !c.includes("(Sense Type)"));
              }

              let inherentList = INHERENT_SENSE_TRAITS[cleanSubName] || INHERENT_SENSE_TRAITS[sub.type] || [];
              if (inherentList.length > 0) {
                  metaChoices = metaChoices.filter(c => {
                      if (c.startsWith("- Select")) return true;
                      let coreMeta = c.split(" (")[0].trim();
                      if (inherentList.includes(coreMeta)) return false;
                      if (coreMeta === "Counters Concealment" && inherentList.some(inh => inh.startsWith("Counters Concealment"))) return false;
                      return true;
                  });
              }

              if (!isSenseType && mySenseType && mySenseType !== "Unknown") {
                  let parentSenseTypeSub = effect.subPowers.find(sp => {
                      let t = sp.type || sp.name || "";
                      return t.includes("Sense Type") && (sp.senseCategory === mySenseType || t.includes(mySenseType));
                  });
                  if (parentSenseTypeSub && parentSenseTypeSub.modifiers && parentSenseTypeSub.modifiers.length > 0) {
                      let parentMetaNames = parentSenseTypeSub.modifiers.map(pm => pm.name.split(" (")[0].trim());
                      metaChoices = metaChoices.filter(c => {
                          if (c.startsWith("- Select")) return true;
                          let coreMeta = c.split(" (")[0].trim();
                          return !parentMetaNames.includes(coreMeta);
                      });
                  }
              }

              if (sub.modifiers && sub.modifiers.length > 0) {
                  let existingMeta = sub.modifiers.map(m => m.name.split(" (")[0].trim());
                  metaChoices = metaChoices.filter(c => {
                      if (c.startsWith("- Select")) return true;
                      let coreMeta = c.split(" (")[0].trim();
                      return !existingMeta.includes(coreMeta);
                  });
                  if (sub.modifiers.some(m => m.name.includes("Counters Concealment (All)"))) {
                      metaChoices = metaChoices.filter(c => !c.includes("Counters Concealment (One Descriptor)"));
                  }
                  if (sub.modifiers.some(m => m.name.includes("Counters Concealment (One Descriptor)"))) {
                      metaChoices = metaChoices.filter(c => !c.includes("Counters Concealment (All)"));
                  }
                  if (sub.modifiers.some(m => m.name.includes("Counters Obscure (All)"))) {
                      metaChoices = metaChoices.filter(c => !c.includes("Counters Obscure (One Descriptor)"));
                  }
                  if (sub.modifiers.some(m => m.name.includes("Counters Obscure (One Descriptor)"))) {
                      metaChoices = metaChoices.filter(c => !c.includes("Counters Obscure (All)"));
                  }
              }

              metaPickerHtml = `
                <select id="selSubMeta_${pIdx}_${eIdx}_${sIdx}" class="minor-control" style="font-size: var(--font-size-minor-controls); max-width: 200px;">
                  ${metaChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <button type="button" class="btn minor-control-btn" style="font-size: var(--font-size-minor-controls); padding: 2px 6px;" onclick="addSubPowerMeta(${pIdx}, ${eIdx}, ${sIdx}, 'selSubMeta_${pIdx}_${eIdx}_${sIdx}')">+ Add Modifier</button>
                <div style="display: inline-flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                  ${metaTagsHtml}
                </div>
              `;
            } else if (effect.effectName === "Immunity") {
              let metaChoices = [
                "- Select Option Modifier -",
                "Affects Others [+1 pt/r]", 
                "Affects Others Only [+0 pts/r]", 
                "Area Effect [+1 pt/r]", 
                "Sustained [+0 pts/r]",
                "Ranged [+1 pt/r]",
                "Redirect (Reaction) [+1 pt]",
                "Redirect (Sustained) [+1 pt/r]",
                "Redirect (Continuous) [+2 pts/r]",
                "Concentration [-1 pt/r]",
                "Resistance [-1 pt/r]"
              ];

              // 1. Superset Filtering: If this option is covered by any superset, exclude modifiers already present on that superset
              const supersetNames = getSupersetsForOption("Immunity", cleanSubName);
              if (supersetNames.length > 0 && effect.subPowers) {
                const parentSubs = effect.subPowers.filter(sp => {
                  const spClean = (sp.name || sp.type || "").split(" [")[0].trim();
                  return supersetNames.includes(spClean);
                });
                const parentModifierCores = [];
                parentSubs.forEach(ps => {
                  (ps.modifiers || []).forEach(pm => {
                    const core = pm.name.split(" (")[0].split(" [")[0].trim();
                    if (!parentModifierCores.includes(core)) parentModifierCores.push(core);
                  });
                });

                if (parentModifierCores.length > 0) {
                  metaChoices = metaChoices.filter(c => {
                    if (c.startsWith("- Select")) return true;
                    const choiceCore = c.split(" (")[0].split(" [")[0].trim();
                    if (parentModifierCores.includes(choiceCore)) return false;
                    if ((choiceCore === "Affects Others" || choiceCore === "Affects Others Only") &&
                        (parentModifierCores.includes("Affects Others") || parentModifierCores.includes("Affects Others Only"))) {
                      return false;
                    }
                    if (choiceCore === "Redirect" && parentModifierCores.includes("Redirect")) return false;
                    return true;
                  });
                }
              }

              // 2. Self-duplicate and Mutual Exclusion Filtering on this subpower
              if (sub.modifiers && sub.modifiers.length > 0) {
                const currentCores = sub.modifiers.map(m => m.name.split(" (")[0].split(" [")[0].trim());
                metaChoices = metaChoices.filter(c => {
                  if (c.startsWith("- Select")) return true;
                  const choiceCore = c.split(" (")[0].split(" [")[0].trim();
                  if (currentCores.includes(choiceCore)) return false;
                  if ((choiceCore === "Affects Others" || choiceCore === "Affects Others Only") &&
                      (currentCores.includes("Affects Others") || currentCores.includes("Affects Others Only"))) {
                    return false;
                  }
                  if (choiceCore === "Redirect" && currentCores.includes("Redirect")) return false;
                  if (choiceCore === "Sustained" && currentCores.includes("Concentration")) return false;
                  if (choiceCore === "Concentration" && currentCores.includes("Sustained")) return false;
                  return true;
                });
              }

              metaPickerHtml = `
                <select id="selSubMeta_${pIdx}_${eIdx}_${sIdx}" class="minor-control" style="font-size: var(--font-size-minor-controls); max-width: 200px;">
                  ${metaChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <button type="button" class="btn minor-control-btn" style="font-size: var(--font-size-minor-controls); padding: 2px 6px;" onclick="addSubPowerMeta(${pIdx}, ${eIdx}, ${sIdx}, 'selSubMeta_${pIdx}_${eIdx}_${sIdx}')" ${metaChoices.length <= 1 ? 'disabled' : ''}>+ Add Modifier</button>
                <div style="display: inline-flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                  ${subModsHtml}
                </div>
              `;
            }

            let isImmunityLocked = effect.effectName === "Immunity" && !sType.includes("Custom");
            const rankedSenses = ["Extended", "Rapid", "Tracking", "Microscopic Vision", "Radius", "Custom"];
            let isSenseLocked = effect.effectName === "Super-Senses" && !rankedSenses.some(rs => sType.includes(rs));
            let isSubRankLocked = isImmunityLocked || isSenseLocked;
            let isFlatAdvantage = effect.effectName === "Enhanced Trait" && typeof ADVANTAGES_LIST !== 'undefined' && ADVANTAGES_LIST.some(a => a.name === sType && !(a.hasRanks || a.ranked));
            let allowsRanks = (sub.costType === "per_rank") || (effect.effectName === "Enhanced Trait" && !isFlatAdvantage);

            let stepperControls = subMaxR > 1 && allowsRanks && !isSubRankLocked ? `
              <button type="button" class="stepper-btn stepper-dec" style="width: 26px !important; min-width: 26px !important;" onclick="stepSubPowerRank(${pIdx}, ${eIdx}, ${sIdx}, -1, 1, ${subMaxR})">−</button>
              <input type="number" class="stepper-input" style="width: 38px !important; min-width: 38px !important; font-size: var(--font-size-minor-controls);" value="${sRank}" min="1" max="${subMaxR}" readonly>
              <button type="button" class="stepper-btn stepper-inc" style="width: 26px !important; min-width: 26px !important;" onclick="stepSubPowerRank(${pIdx}, ${eIdx}, ${sIdx}, 1, 1, ${subMaxR})">+</button>
            ` : `
              <input type="number" class="stepper-input" style="width: 50px !important; min-width: 50px !important; font-size: var(--font-size-minor-controls); background: transparent; border: none;" value="${sRank}" readonly title="${isSubRankLocked ? 'Rank Locked by Tier' : (isFlatAdvantage ? 'Rank 1 (Standard Feat)' : 'Rank Locked')}">
            `;

            let cardStyle = "background: var(--bg-card); border: 1.5px solid var(--border-power, var(--border-color)); border-radius: 4px; padding: 8px 10px;";
            if (effect.effectName === "Enhanced Trait") {
                cardStyle += " flex: 1; min-width: calc(50% - 10px);";
            } else {
                cardStyle += " width: 100%;";
            }
            
            let arrowIcon = "";
            if (effect.effectName === "Enhanced Trait") {
                arrowIcon = sub.isReduced ? '<span style="color: #ef4444; font-size: var(--font-size-controls);" title="Reduced Trait">▼</span> ' : '<span style="color: #10b981; font-size: var(--font-size-controls);" title="Enhanced Trait">▲</span> ';
            }

            return `
              <div class="sub-power-card" style="${cardStyle}">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
                  <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
                    <strong style="font-size: var(--font-size-controls); color: var(--accent-primary); white-space: nowrap;">
                      ${arrowIcon}${sub.name.split(" [")[0] || sub.type}
                      ${dynDesc ? `<button type="button" class="btn-info-circle" style="min-width: 16px; min-height: 16px; font-size: var(--font-size-tags); margin-left: 2px; vertical-align: middle;" onclick="showOptionInfo('${(sub.name.split(" [")[0] || sub.type).replace(/'/g, "\\'")}', '${dynDesc.replace(/'/g, "\\'").replace(/"/g, "&quot;")}')" title="View Option Info">?</button>` : ''}
                    </strong>
                    <span class="badge effect-cost-badge" style="font-size: var(--font-size-tags); white-space: nowrap;">${sub.baseCost || 1} ${sub.costType === 'per_rank' ? 'PP/r' : 'PP'}</span>
                    ${effect.effectName !== "Enhanced Trait" && effect.effectName !== "Super-Senses" ? `
                        <input type="text" class="minor-control" placeholder="${placeholderText}" value="${sub.details || ''}" oninput="updateSubPowerDetails(${pIdx}, ${eIdx}, ${sIdx}, this.value)" style="flex: 1; min-width: 80px; border: 1px solid var(--border-color); background: var(--bg-panel); color: var(--text-main); font-size: var(--font-size-minor-controls); padding: 2px 6px; margin-left: 4px; height: 24px;">
                    ` : ''}
                    ${effect.effectName === "Super-Senses" && metaPickerHtml ? `
                        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-left: 8px; flex: 1;">
                            ${metaPickerHtml}
                        </div>
                    ` : ''}
                  </div>

                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <label style="font-size: var(--font-size-secondary);">Rank:</label>
                      <div class="stepper-group" style="height: 24px; width: 90px; min-width: 90px;">
                        ${stepperControls}
                      </div>
                    </div>
                    <button type="button" class="btn-delete-power" style="padding: 2px 6px; font-size: var(--font-size-minor-controls);" onclick="removeSubPower(${pIdx}, ${eIdx}, ${sIdx})" title="Delete Option">Delete</button>
                  </div>
                </div>
                
                ${effect.effectName !== "Super-Senses" && metaPickerHtml ? `
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 6px;">
                    ${metaPickerHtml}
                </div>` : ''}

                ${subMeasurementHtml}

              </div>
            `;
          }).join("");
        }

        let optionPickersHtml = "";
        if (effectData && effectData.options && effectData.options.length > 0) {
          let availableOptions = effectData.options;
          if (effect.effectName === "Super-Senses") {
            availableOptions = availableOptions.filter(opt => {
              let isAlreadyAdded = (effect.subPowers || []).some(sp => {
                let spClean = (sp.name || sp.type || "").split(" [")[0].trim();
                return spClean === opt.name;
              });
              if (isAlreadyAdded) return false;

              let cat = SENSE_TYPE_MAP[opt.name];
              if (!opt.name.includes("Sense Type") && cat && isSenseCategoryMaxed(cat, effect)) {
                return false;
              }
              return true;
            });
          } else if (["Immunity", "Super-Movement", "Movement", "Comprehend", "Features", "Feature"].includes(effect.effectName)) {
            availableOptions = availableOptions.filter(opt => {
              let isAlreadyAdded = (effect.subPowers || []).some(sp => {
                let spClean = (sp.name || sp.type || "").split(" [")[0].trim();
                return spClean === opt.name;
              });
              if (isAlreadyAdded) return false;
              if (effect.effectName === "Immunity" && isOptionCoveredByExisting(effect, opt.name)) {
                return false;
              }
              return true;
            });
          }

          optionPickersHtml = `
            <div class="power-options-row" style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end; background: var(--bg-panel); padding: 8px; border: 1px solid var(--border-color); border-radius: 4px; margin-top: 4px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">${effect.effectName} Option:</label>
                <select id="selOptionChoice_${pIdx}_${eIdx}" class="minor-control" style="width: 250px;">
                  <option value="">${availableOptions.length > 0 ? "- Select Option -" : "(All options added)"}</option>
                  ${availableOptions.map(opt => `<option value="${opt.name} [${opt.cost} ${opt.costType === 'flat' ? 'pts' : 'pts/r'}]">${opt.name} [${opt.cost} ${opt.costType === 'flat' ? 'pts' : 'pts/r'}]</option>`).join('')}
                </select>
                <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selOptionChoice_${pIdx}_${eIdx}')" ${availableOptions.length === 0 ? 'disabled' : ''}>+ Add Option</button>
              </div>
            </div>
          `;
        } else if (effectData && effectData.powerOptions && effectData.powerOptions.length > 0) {
          optionPickersHtml = `
            <div class="power-options-row" style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center; background: var(--bg-panel); padding: 8px; border: 1px solid var(--border-color); border-radius: 4px; margin-top: 4px;">
              ${effectData.powerOptions.map(opt => {
                const currentVal = effect.options && effect.options[opt.key] ? effect.options[opt.key] : "";
                const fullRowClass = opt.fullRow ? " flex: 1; min-width: 260px;" : "";
                
                if (opt.type === "dropdown") {
                  return `
                    <div class="power-option-item" style="display: flex; flex-direction: column; gap: 4px;${fullRowClass}">
                      <label style="font-size: var(--font-size-secondary); font-weight: 600;">${opt.label}</label>
                      <select class="minor-control" style="width: 100%; ${currentVal && currentVal !== '- None -' && !currentVal.startsWith('- Select') ? 'color: var(--accent-primary); font-weight: bold;' : ''}" onchange="updateEffectOptionSelect(${pIdx}, ${eIdx}, '${opt.key}', this.value)">
                        ${renderOptgroupChoices(opt.choices, currentVal)}
                      </select>
                    </div>
                  `;
                } else {
                  return `
                    <div class="power-option-item" style="display: flex; flex-direction: column; gap: 4px; width: 100%;${fullRowClass}">
                      <label style="font-size: var(--font-size-secondary); font-weight: 600;">${opt.label}</label>
                      <textarea rows="1" placeholder="${opt.placeholder || ''}" class="minor-control" style="width: 100%; min-height: 26px; padding: 4px 8px; font-family: inherit; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-panel); color: var(--text-main); resize: vertical; overflow-y: hidden;" oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'; updateEffectOptionText(${pIdx}, ${eIdx}, '${opt.key}', this.value)">${currentVal}</textarea>
                    </div>
                  `;
                }
              }).join("")}
            </div>
          `;
        } else if (effect.effectName === "Enhanced Trait") {
          let abilityChoices = [
            "- Select Ability / Defense -",
            "Strength (STR) [1 pt/r]",
            "Dexterity (DEX) [1 pt/r]",
            "Constitution (CON) [1 pt/r]",
            "Intelligence (INT) [1 pt/r]",
            "Wisdom (WIS) [1 pt/r]",
            "Charisma (CHA) [1 pt/r]",
            "Attack [2 pts/r]",
            "Defense [2 pts/r]",
            "Toughness [1 pt/r]",
            "Fortitude [1 pt/r]",
            "Reflex [1 pt/r]",
            "Will [1 pt/r]"
          ];
          let advChoices = ["- Select Feat -"];
          const featSource = (typeof FEATS_LIST !== 'undefined') ? FEATS_LIST : ((typeof ADVANTAGES_LIST !== 'undefined') ? ADVANTAGES_LIST : []);
          featSource.slice().sort((a, b) => a.name.localeCompare(b.name)).forEach(featData => {
            let hasRanks = featData ? (featData.hasRanks || featData.ranked) : false;
            advChoices.push(`${featData.name} [1 pt${hasRanks ? '/r' : ''}]`);
          });

          let skillChoices = ["- Select Skill -"];
          if (typeof SKILLS_LIST !== 'undefined') {
            SKILLS_LIST.slice().sort((a, b) => a.name.localeCompare(b.name)).forEach(sk => {
              skillChoices.push(`${sk.name} [1 pt/r]`);
            });
          }

          let effectChoices = ["- Select Effect -"];
          if (char.activePowers) {
            char.activePowers.forEach(power => {
              if (power.effects) {
                power.effects.forEach(eff => {
                  if (eff.rank > 0 && eff !== effect && eff.effectName && eff.effectName !== "Enhanced Trait") {
                    let eData = (typeof POWER_EFFECTS !== 'undefined') ? POWER_EFFECTS.find(e => e.name === eff.effectName || e.effectName === eff.effectName) : null;
                    let bCost = eData ? (eData.baseCost || 1) : 1;
                    let cType = eData ? (eData.costType || 'per_rank') : 'per_rank';
                    let label = `${eff.effectName} [${bCost} ${cType === 'flat' ? 'pts' : 'pts/r'}]`;
                    if (!effectChoices.includes(label)) {
                      effectChoices.push(label);
                    }
                  }
                });
              }
            });
          }

          const hasReducedTrait = effect.modifiers && effect.modifiers.some(m => m.name === 'Reduced Trait');

          optionPickersHtml = `
            <div class="power-options-row" style="display: flex; flex-direction: column; gap: 10px; background: var(--bg-panel); padding: 10px; border: 1px solid var(--border-color); border-radius: 4px; margin-top: 4px;">
              <div style="font-size: var(--font-size-secondary); font-weight: 600; color: var(--accent-primary); margin-bottom: -4px;"><span style="color: #10b981;">▲</span> Enhanced Traits</div>
              <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
                
                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Abils/Defs:</label>
                  <select id="selEnhAbility_${pIdx}_${eIdx}" class="minor-control" style="width: 175px;">
                    ${abilityChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                  </select>
                  <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selEnhAbility_${pIdx}_${eIdx}', false)">+ Ability</button>
                </div>

                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Feats:</label>
                  <select id="selEnhAdvantage_${pIdx}_${eIdx}" class="minor-control" style="width: 175px;">
                    ${advChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                  </select>
                  <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selEnhAdvantage_${pIdx}_${eIdx}', false)">+ Feat</button>
                </div>

                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Skills:</label>
                  <select id="selEnhSkill_${pIdx}_${eIdx}" class="minor-control" style="width: 175px;">
                    ${skillChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                  </select>
                  <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selEnhSkill_${pIdx}_${eIdx}', false)">+ Skill</button>
                </div>

                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Effects:</label>
                  <select id="selEnhEffect_${pIdx}_${eIdx}" class="minor-control" style="width: 175px;">
                    ${effectChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                  </select>
                  <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selEnhEffect_${pIdx}_${eIdx}', false)">+ Effect</button>
                </div>

              </div>
              
              ${hasReducedTrait ? `
              <div style="border-top: 1px dashed var(--border-color); margin-top: 4px; padding-top: 10px;">
                  <div style="font-size: var(--font-size-secondary); font-weight: 600; color: var(--accent-primary); margin-bottom: 6px;"><span style="color: #ef4444;">▼</span> Reduced Traits</div>
                  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                      <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Abils/Defs:</label>
                      <select id="selRedAbility_${pIdx}_${eIdx}" class="minor-control" style="width: 175px;">
                        ${abilityChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                      </select>
                      <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selRedAbility_${pIdx}_${eIdx}', true)">- Ability</button>
                    </div>

                    <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                      <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Feats:</label>
                      <select id="selRedAdvantage_${pIdx}_${eIdx}" class="minor-control" style="width: 175px;">
                        ${advChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                      </select>
                      <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selRedAdvantage_${pIdx}_${eIdx}', true)">- Feat</button>
                    </div>

                    <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                      <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Skills:</label>
                      <select id="selRedSkill_${pIdx}_${eIdx}" class="minor-control" style="width: 175px;">
                        ${skillChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                      </select>
                      <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selRedSkill_${pIdx}_${eIdx}', true)">- Skill</button>
                    </div>

                    <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                      <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Effects:</label>
                      <select id="selRedEffect_${pIdx}_${eIdx}" class="minor-control" style="width: 175px;">
                        ${effectChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                      </select>
                      <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selRedEffect_${pIdx}_${eIdx}', true)">- Effect</button>
                    </div>
                  </div>
              </div>
              ` : ''}
            </div>
          `;
        } else if (effect.effectName === "Boost") {
          const isAlteringRanks = (char.houseRules && char.houseRules.boostAltersRanks) || (localStorage.getItem("mm2e_houserule_boost_alters_ranks") === "true");
          const targetChoices = [
            { value: "", label: "- Select Target Trait / Power -" },
            { value: "Strength", label: "Ability: Strength" },
            { value: "Dexterity", label: "Ability: Dexterity" },
            { value: "Constitution", label: "Ability: Constitution" },
            { value: "Intelligence", label: "Ability: Intelligence" },
            { value: "Wisdom", label: "Ability: Wisdom" },
            { value: "Charisma", label: "Ability: Charisma" }
          ];

          if (char.activePowers) {
            char.activePowers.forEach((power, pi) => {
              (power.effects || []).forEach((eff, ei) => {
                if (eff !== effect && eff.effectName) {
                  const targetName = (eff.name && eff.name !== 'New Effect') ? eff.name : eff.effectName;
                  const label = `${power.name ? power.name + ': ' : ''}${targetName} (${eff.effectName})`;
                  targetChoices.push({ value: eff.id, label: label, name: targetName, effectName: eff.effectName });
                }
              });
            });
          }

          let currentTarget = (effect.options && effect.options.boostTarget) || effect.boostTarget || "";
          if (currentTarget) {
            const matchById = targetChoices.find(c => c.value === currentTarget);
            if (!matchById) {
              const matchByName = targetChoices.find(c => c.name === currentTarget || c.effectName === currentTarget);
              if (matchByName) {
                currentTarget = matchByName.value;
                effect.boostTarget = currentTarget;
                if (!effect.options) effect.options = {};
                effect.options.boostTarget = currentTarget;
              } else if (!currentTarget.startsWith("eff_") && !currentTarget.startsWith("imp_")) {
                targetChoices.push({ value: currentTarget, label: `${currentTarget} (Custom Target)` });
              } else {
                effect.boostTarget = "";
                if (effect.options) effect.options.boostTarget = "";
                currentTarget = "";
              }
            }
          }

          const isBoostActive = (powerContainer.active !== false) && (effect.active !== false);
          const boostRank = parseInt(effect.rank) || 1;

          let currentScope = (effect.options && effect.options.boostScope);
          if (!currentScope) {
            const costToScope = {
              1: "Single Trait",
              2: "One Trait of Descriptor",
              3: "All Traits of Descriptor",
              4: "All Powers of Subject",
              5: "All Traits of Subject"
            };
            currentScope = costToScope[effect.baseCost] || "Single Trait";
          }

          const scopes = [
            { value: "Single Trait", label: "One Specific Trait (Fixed at purchase) (1 PP/r)" },
            { value: "One Trait of Descriptor", label: "Any One Trait of Descriptor (Flexible per use) (2 PP/r)" },
            { value: "All Traits of Descriptor", label: "All Traits of Descriptor (Simultaneous) (3 PP/r)" },
            { value: "All Powers of Subject", label: "All Powers of Subject (Simultaneous) (4 PP/r)" },
            { value: "All Traits of Subject", label: "All Traits of Subject (Simultaneous) (5 PP/r)" }
          ];

          optionPickersHtml = `
            <div class="power-options-row" style="display: flex; flex-direction: column; gap: 8px; background: var(--bg-panel); padding: 10px; border: 1px solid var(--border-color); border-radius: 4px; margin-top: 4px;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <div style="font-size: var(--font-size-secondary); font-weight: 600; color: var(--accent-primary); display: flex; align-items: center; gap: 6px;">
                  <span>⚡</span> <strong>Boost Scope &amp; Target Allocation (Ultimate Power):</strong>
                </div>
                <span class="badge" style="font-size: var(--font-size-tags); background: ${isBoostActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; color: ${isBoostActive ? '#10b981' : '#ef4444'}; border: 1px solid ${isBoostActive ? '#10b981' : '#ef4444'};">
                  ${isBoostActive ? (isAlteringRanks ? `⚡ Active (+${boostRank} Ranks to target)` : `⚡ Active (+${boostRank} PP Subsidy)`) : 'Inactive (Turn On via effect toggle)'}
                </span>
              </div>

              <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 6px; flex: 1; min-width: 220px;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Scope:</label>
                  <select class="minor-control" style="flex: 1;" onchange="window.updateBoostScopeDirect(${pIdx}, ${eIdx}, this.value)">
                    ${scopes.map(s => `<option value="${s.value}" ${s.value === currentScope ? 'selected' : ''}>${s.label}</option>`).join('')}
                  </select>
                </div>

                <div style="display: flex; align-items: center; gap: 6px; flex: 1.2; min-width: 240px;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Target Trait:</label>
                  <select class="minor-control" style="flex: 1;" onchange="window.updateBoostTargetDirect(${pIdx}, ${eIdx}, this.value)">
                    ${targetChoices.map(c => `<option value="${c.value}" ${c.value === currentTarget ? 'selected' : ''}>${c.label}</option>`).join('')}
                  </select>
                </div>
              </div>
            </div>
          `;
        }

        const existingModNames = effect.modifiers ? effect.modifiers.map(m => m.name) : [];
        let allowedRootMods = getFilteredModifiersForEffect(effectData ? effectData.type : "General", effect);
        let uniqueModifiers = effectData && effectData.uniqueModifiers ? effectData.uniqueModifiers : [];
        let specificExtras = uniqueModifiers.filter(m => m.category === 'extra').concat(effectData && effectData.specificExtras ? effectData.specificExtras : []);
        let specificFlaws = uniqueModifiers.filter(m => m.category === 'flaw').concat(effectData && effectData.specificFlaws ? effectData.specificFlaws : []);
        let specificFeats = uniqueModifiers.filter(m => m.category === 'feat').concat(effectData && effectData.specificFeats ? effectData.specificFeats : []);
        
        const specificModNames = [...specificExtras.map(m=>m.name), ...specificFlaws.map(m=>m.name), ...specificFeats.map(m=>m.name)];
        
        const genericIsShadowed = (genericName, specificNames) => {
            return specificNames.some(sn => sn === genericName || sn.startsWith(genericName + " ("));
        };

        let availableRootExtras = allowedRootMods.filter(m => m.category === 'extra' && !genericIsShadowed(m.name, specificModNames) && !existingModNames.includes(m.name));
        let availableRootFlaws = allowedRootMods.filter(m => m.category === 'flaw' && !genericIsShadowed(m.name, specificModNames) && !existingModNames.includes(m.name));
        let availableRootFeats = allowedRootMods.filter(m => m.category === 'feat' && !genericIsShadowed(m.name, specificModNames) && !existingModNames.includes(m.name));

        const isLegacyOn = (char && char.houseRules && char.houseRules.enableLegacyCoreModifiers) || (localStorage.getItem("mm2e_houserule_enable_legacy_modifiers") === "true");
        let smartMods = window.generateSmartModifiers(effect);
        smartMods.extras.forEach(sm => {
            if (!isLegacyOn && typeof LEGACY_CORE_MODIFIERS !== 'undefined' && LEGACY_CORE_MODIFIERS.includes(sm.name)) return;
            if (!existingModNames.includes(sm.name) && !genericIsShadowed(sm.name, specificModNames) && !availableRootExtras.some(m => m.name === sm.name)) {
                availableRootExtras.push(sm);
            }
        });
        smartMods.flaws.forEach(sm => {
            if (!isLegacyOn && typeof LEGACY_CORE_MODIFIERS !== 'undefined' && LEGACY_CORE_MODIFIERS.includes(sm.name)) return;
            if (!existingModNames.includes(sm.name) && !genericIsShadowed(sm.name, specificModNames) && !availableRootFlaws.some(m => m.name === sm.name)) {
                availableRootFlaws.push(sm);
            }
        });
        
        const isDisablePerception = (typeof char !== 'undefined' && char.houseRules && char.houseRules.disablePerceptionRange) || 
                                    (typeof localStorage !== 'undefined' && localStorage.getItem("mm2e_houserule_disable_perception_range") === "true");
        if (isDisablePerception) {
          availableRootExtras.forEach(e => {
            if (e.name === "Range (Extra)" || e.name === "Increased Range") {
              e.maxRanks = 1;
            }
          });
        }

        availableRootExtras.sort((a, b) => a.name.localeCompare(b.name));
        availableRootFlaws.sort((a, b) => a.name.localeCompare(b.name));
        availableRootFeats.sort((a, b) => a.name.localeCompare(b.name));
        
        const seenSpecExtra = new Set();
        let availableSpecificExtras = [];
        for (const m of specificExtras) {
            if (!existingModNames.includes(m.name) && !seenSpecExtra.has(m.name)) {
                seenSpecExtra.add(m.name);
                availableSpecificExtras.push(m);
            }
        }
        availableSpecificExtras.sort((a, b) => a.name.localeCompare(b.name));

        const seenSpecFlaw = new Set();
        let availableSpecificFlaws = [];
        for (const m of specificFlaws) {
            if (!existingModNames.includes(m.name) && !seenSpecFlaw.has(m.name)) {
                seenSpecFlaw.add(m.name);
                availableSpecificFlaws.push(m);
            }
        }
        availableSpecificFlaws.sort((a, b) => a.name.localeCompare(b.name));

        const seenSpecFeat = new Set();
        let availableSpecificFeats = [];
        for (const m of specificFeats) {
            if (!existingModNames.includes(m.name) && !seenSpecFeat.has(m.name)) {
                seenSpecFeat.add(m.name);
                availableSpecificFeats.push(m);
            }
        }
        availableSpecificFeats.sort((a, b) => a.name.localeCompare(b.name));

        let rootModifiersHtml = "";
        if (effect.modifiers && effect.modifiers.length > 0) {
          rootModifiersHtml = effect.modifiers.map((mod, mIdx) => {
            let modData = null;
            const cleanMod = (s) => (s || "").replace(/\s*\[.*?\]/g, '').replace(/\s*\([+–-]?\d+[^)]*\)/g, '').trim();
            const matchMod = (m) => m && (m.name === mod.name || cleanMod(m.name) === cleanMod(mod.name));
            if (typeof POWER_MODIFIERS_LIST !== 'undefined') {
              modData = POWER_MODIFIERS_LIST.find(matchMod);
            }
            if (!modData && effectData && effectData.uniqueModifiers) modData = effectData.uniqueModifiers.find(matchMod);
            if (!modData && effectData && effectData.specificExtras) modData = effectData.specificExtras.find(matchMod);
            if (!modData && effectData && effectData.specificFlaws) modData = effectData.specificFlaws.find(matchMod);
            if (!modData && effectData && effectData.specificFeats) modData = effectData.specificFeats.find(matchMod);
            if (!modData) modData = { name: mod.name, cost: mod.cost !== undefined ? mod.cost : 1, costType: mod.costType || "flat", category: mod.category || "extra", hasRanks: false };

            modData = JSON.parse(JSON.stringify(modData));
            const isPositive = (modData.category === "extra" || modData.category === "feat" || (effectData && effectData.specificExtras && effectData.specificExtras.some(e => e.name === mod.name)) || (effectData && effectData.specificFeats && effectData.specificFeats.some(e => e.name === mod.name)));
            const rateStr = modData.costType === 'per_rank' ? '/r' : (modData.costType === 'removable' ? '/5 PP' : ' flat');
            const needsRanks = (modData.hasRanks === true || modData.costType === 'per_rank' || modData.costType === 'removable');
            let maxR = modData.maxRanks || Math.max(Number(effect.rank) || 1, 1);
            if (mod.name === "Penetrating") maxR = Math.max(Number(effect.rank) || 20, 20); // Penetrating can theoretically exceed, but let's cap at power rank or 20
            if (isDisablePerception && (mod.name === "Range (Extra)" || mod.name === "Increased Range")) maxR = 1;
            const currentRanks = Math.min(maxR, Math.max(1, Number(mod.ranks) || 1));
            return `
              <div class="modifier-chip">
                <span><strong>${mod.name}</strong> (${isPositive ? '+' : '-'}${modData.cost}${rateStr})</span>
                ${needsRanks ? `
                  <div class="modifier-stepper-group">
                    <button type="button" class="modifier-stepper-btn" onclick="stepModifierRank(${pIdx}, ${eIdx}, ${mIdx}, -1, 1, ${maxR}, ${isBlueprint})">−</button>
                    <span class="modifier-stepper-val">${currentRanks}</span>
                    <button type="button" class="modifier-stepper-btn" onclick="stepModifierRank(${pIdx}, ${eIdx}, ${mIdx}, 1, 1, ${maxR}, ${isBlueprint})">+</button>
                  </div>
                ` : ''}
                <button type="button" class="btn-info-circle" style="min-width: 18px; min-height: 18px; font-size: calc(var(--font-size-minor-controls) * 0.85);" onclick="showModifierInfo('${mod.name}', '${(effect.effectName || effect.name || '').replace(/'/g, "\\'")}')" title="View Modifier Rule">?</button>
                <button type="button" style="background: none; border: none; color: #ef4444; font-weight: bold; cursor: pointer; padding: 0 2px;" onclick="removeModifier(${pIdx}, ${eIdx}, ${mIdx}, ${isBlueprint})" title="Remove Modifier">✕</button>
              </div>
            `;
          }).join(" ");
        } else {
          rootModifiersHtml = `<span class="secondary-text minor-control">No modifiers attached.</span>`;
        }

        let rankStepperHtml = "";
        if (effect.effectName === "") {
            rankStepperHtml = `<span class="secondary-text">Select an effect first</span>`;
        } else if (effect.effectName === "Enhanced Trait") {
          rankStepperHtml = `
            <div class="stepper-group" style="background: var(--bg-app); width: 60px; min-width: 60px;">
              <input type="number" class="stepper-input" style="width: 100% !important; max-width: none !important; background: transparent !important; border: none !important; color: var(--text-muted);" value="${effect.rank}" readonly title="Auto-calculated from options">
            </div>
          `;
        } else {
          rankStepperHtml = `
            <div class="stepper-group">
              <button type="button" class="stepper-btn stepper-dec" onclick="stepEffectRank(${pIdx}, ${eIdx}, -1)">−</button>
              <input type="number" id="effectRankInput_${pIdx}_${eIdx}" class="stepper-input" min="1" max="${maxPowerRank}" value="${effect.rank}" onchange="updatePowerProp(${pIdx}, ${eIdx}, 'rank', this.value)">
              <button type="button" class="stepper-btn stepper-inc" onclick="stepEffectRank(${pIdx}, ${eIdx}, 1)">+</button>
            </div>
          `;
        }

        effect.id = effect.id || ("eff_" + pIdx + "_" + eIdx + "_" + Math.random().toString(36).substr(2, 6));
        if (effect.linkedTo === undefined) effect.linkedTo = null;
        if (effect.association === undefined) effect.association = "";

        const isLinked = effect.linkedTo === "previous" || (typeof effect.linkedTo === "string" && effect.linkedTo !== "") || effect.association === "linked";

        // Determine linked target effect (outgoing) and incoming links
        let targetEffect = null;
        let targetDesc = "";
        if (effect.linkedTo === "previous" && eIdx > 0) {
          targetEffect = powerContainer.effects[eIdx - 1];
          targetDesc = targetEffect.name || targetEffect.effectName || ("Effect " + eIdx);
        } else if (effect.linkedTo && effect.linkedTo !== "previous") {
          const found = char.findEffectById(effect.linkedTo);
          if (found) {
            targetEffect = found.effect;
            targetDesc = (found.container.name || "Power") + " > " + (found.effect.name || found.effect.effectName || "Effect");
          }
        }

        // Find all other effects linked TO this effect (incoming)
        let linkedChildren = [];
        char.activePowers.forEach((otherContainer, otherPIdx) => {
          if (Array.isArray(otherContainer.effects)) {
            otherContainer.effects.forEach((otherEff, otherEIdx) => {
              if (otherEff.id !== effect.id) {
                if (otherEff.linkedTo === effect.id) {
                  const childName = (otherContainer.name || 'Power') + ' > ' + (otherEff.name || otherEff.effectName || `Effect ${otherEIdx + 1}`);
                  linkedChildren.push({ effect: otherEff, name: childName });
                } else if (otherPIdx === pIdx && otherEIdx === eIdx + 1 && otherEff.linkedTo === "previous") {
                  const childName = otherEff.name || otherEff.effectName || `Effect ${otherEIdx + 1}`;
                  linkedChildren.push({ effect: otherEff, name: childName });
                }
              }
            });
          }
        });

        const isLinkedCard = isLinked || (linkedChildren.length > 0);

        // Build list of potential link targets (previous effect + other effects across containers)
        let linkOptions = `<option value="">🔗 Not Linked</option>`;
        if (linkedChildren.length > 0 && !isLinked) {
          const childNames = linkedChildren.map(c => (c.effect.name || c.effect.effectName || c.name.split(' > ').pop())).join(', ');
          linkOptions = `<option value="" selected>🔗 Linked with: ${childNames}</option><option value="__unlink_children__">🔗 Unlink Attached Effects</option>`;
        }
        if (eIdx > 0) {
          const prevEff = powerContainer.effects[eIdx - 1];
          const prevName = prevEff.name || prevEff.effectName || ("Effect " + eIdx);
          const isPrevSelected = (effect.linkedTo === 'previous') || (prevEff.id && effect.linkedTo === prevEff.id);
          const prevOptValue = prevEff.id || 'previous';
          linkOptions += `<option value="${prevOptValue}" ${isPrevSelected ? 'selected' : ''}>🔗 Link to Previous (${prevName})</option>`;
        }

        char.activePowers.forEach((otherContainer, otherPIdx) => {
          if (Array.isArray(otherContainer.effects)) {
            otherContainer.effects.forEach((otherEff, otherEIdx) => {
              if (otherEff.id && otherEff.id !== effect.id) {
                // If it's already previous, skip duplicate option
                if (otherPIdx === pIdx && otherEIdx === eIdx - 1) return;
                const optLabel = (otherContainer.name || 'Power') + ' > ' + (otherEff.name || otherEff.effectName || `Effect ${otherEIdx + 1}`);
                linkOptions += `<option value="${otherEff.id}" ${effect.linkedTo === otherEff.id ? 'selected' : ''}>🔗 Link to: ${optLabel}</option>`;
              }
            });
          }
        });

        // Build Two-Way Link Banners & Rule Checks
        let linkBannerHtml = "";
        const allConnected = [];
        if (targetEffect) {
          allConnected.push({ effect: targetEffect, desc: targetDesc, role: "parent" });
        }
        linkedChildren.forEach(child => {
          if (!allConnected.some(c => c.effect.id === child.effect.id)) {
            allConnected.push({ effect: child.effect, desc: child.name, role: "child" });
          }
        });

        if (allConnected.length > 0) {
          const currTraits = getEffectiveEffectTraits(effect);
          const banners = [];

          allConnected.forEach(conn => {
            const connTraits = getEffectiveEffectTraits(conn.effect);
            const warnings = [];
            const isActionCompatible = (currTraits.action === connTraits.action) ||
                                       (currTraits.action === "None" || connTraits.action === "None") ||
                                       (currTraits.action === "Free" || connTraits.action === "Free");
            if (!isActionCompatible) {
              warnings.push(`Action mismatch (${currTraits.action} vs ${connTraits.action}) — Linked effects must share the same action`);
            }
            if (currTraits.range !== connTraits.range) {
              warnings.push(`Range mismatch (${currTraits.range} vs ${connTraits.range}) — Apply 'Increased Range' extra to match`);
            }

            banners.push(`
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span class="link-badge">🔗 Linked with: <strong>${conn.desc}</strong></span>
                ${warnings.map(w => `<span class="link-warning-tag">⚠️ ${w}</span>`).join('')}
              </div>
            `);
          });

          linkBannerHtml = `
            <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px;">
              ${banners.join('')}
            </div>
          `;
        }

        // Container Powers (Battle Form, Alternate Form, Container)
        let containerPowersHtml = "";
        const isContainer = (typeof CharacterModel !== 'undefined' && CharacterModel.isContainerEffect) ? CharacterModel.isContainerEffect(effect) : (effect.effectName === "Battle Form" || effect.effectName === "Container" || effect.effectName === "Device");
        if (isContainer) {
          if (!effect.containedPowers) effect.containedPowers = [];
          const pool = (typeof CharacterModel !== 'undefined' && CharacterModel.getContainerPool) ? CharacterModel.getContainerPool(effect) : (rankNum * 5);
          const spent = (char.calculateContainedCost) ? char.calculateContainedCost(effect) : 0;
          const isOver = spent > pool;
          const isFormActive = effect.formActive !== false;

          const containedItemsHtml = effect.containedPowers.map((cp, cpIdx) => {
            const cpName = cp.name || cp.effectName || "Trait";
            const cpRank = parseInt(cp.rank) || 1;
            const cpCost = cp.cost !== undefined ? cp.cost : (cpRank * (cp.effectName ? 1 : 1));
            return `
              <div style="display: inline-flex; align-items: center; gap: 6px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; padding: 3px 8px; font-size: var(--font-size-secondary);">
                <strong>${cpName}</strong> <span class="badge" style="background: var(--bg-panel); color: var(--text-main); font-size: var(--font-size-tags);">Rank ${cpRank} (${cpCost} PP)</span>
                <button type="button" class="stepper-btn" style="width: 20px !important; height: 20px; font-size: var(--font-size-minor-controls); border-radius: 2px;" onclick="stepContainedPowerRank(${pIdx}, ${eIdx}, ${cpIdx}, -1)">−</button>
                <button type="button" class="stepper-btn" style="width: 20px !important; height: 20px; font-size: var(--font-size-minor-controls); border-radius: 2px;" onclick="stepContainedPowerRank(${pIdx}, ${eIdx}, ${cpIdx}, 1)">+</button>
                <button type="button" style="background: none; border: none; color: #ef4444; font-weight: bold; cursor: pointer; padding: 0 4px;" onclick="removeContainedPower(${pIdx}, ${eIdx}, ${cpIdx})" title="Remove from form">✕</button>
              </div>
            `;
          }).join('');

          containerPowersHtml = `
            <div style="margin-top: 8px; padding: 10px; background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 6px; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-weight: 600; font-size: var(--font-size-labels); color: var(--text-main);">Contained Traits &amp; Powers:</span>
                  <span class="badge" style="background: ${isOver ? '#ef4444' : 'rgba(16, 185, 129, 0.2)'}; color: ${isOver ? '#ffffff' : '#10b981'}; font-weight: bold; font-size: var(--font-size-tags); border: 1px solid ${isOver ? '#ef4444' : '#10b981'};">
                    Pool: ${spent} / ${pool} PP ${isOver ? '⚠️ (Over Budget)' : '✓'}
                  </span>
                </div>
              </div>

              <div style="display: flex; flex-wrap: wrap; gap: 6px; min-height: 28px; align-items: center;">
                ${containedItemsHtml || '<span class="secondary-text" style="font-style: italic;">No traits added to form yet. Select traits or powers below to spend pool points.</span>'}
              </div>

              <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; border-top: 1px dashed var(--border-color); padding-top: 8px; margin-top: 2px;">
                <label style="font-size: var(--font-size-secondary); font-weight: 600;">+ Add to Form:</label>
                <select id="selContainedPower_${pIdx}_${eIdx}" class="minor-control" style="width: 220px;">
                  <option value="">- Select Trait or Power -</option>
                  <optgroup label="Enhanced Abilities (1 PP/r)">
                    <option value="trait_Strength">Strength (STR)</option>
                    <option value="trait_Dexterity">Dexterity (DEX)</option>
                    <option value="trait_Constitution">Constitution (CON)</option>
                    <option value="trait_Intelligence">Intelligence (INT)</option>
                    <option value="trait_Wisdom">Wisdom (WIS)</option>
                    <option value="trait_Charisma">Charisma (CHA)</option>
                  </optgroup>
                  <optgroup label="Combat &amp; Saves">
                    <option value="trait_Attack">Attack (2 PP/r)</option>
                    <option value="trait_Defense">Defense (2 PP/r)</option>
                    <option value="trait_Toughness">Toughness Save (1 PP/r)</option>
                    <option value="trait_Fortitude">Fortitude Save (1 PP/r)</option>
                    <option value="trait_Reflex">Reflex Save (1 PP/r)</option>
                    <option value="trait_Will">Will Save (1 PP/r)</option>
                  </optgroup>
                  <optgroup label="Powers">
                    <option value="Protection">Protection (1 PP/r)</option>
                    <option value="Strike">Strike (1 PP/r)</option>
                    <option value="Damage">Damage / Blast (1 PP/r)</option>
                    <option value="Flight">Flight (2 PP/r)</option>
                    <option value="Speed">Speed (1 PP/r)</option>
                    <option value="Super-Strength">Super-Strength (2 PP/r)</option>
                    <option value="Insubstantial">Insubstantial (5 PP/r)</option>
                    <option value="Density">Density (3 PP/r)</option>
                    <option value="Immovable">Immovable (1 PP/r)</option>
                    <option value="Elongation">Elongation (1 PP/r)</option>
                    <option value="Swimming">Swimming (1 PP/r)</option>
                    <option value="Burrowing">Burrowing (1 PP/r)</option>
                    <option value="Leaping">Leaping (1 PP/r)</option>
                    <option value="Super-Senses">Super-Senses (1 PP/r)</option>
                    <option value="Enhanced Trait">Enhanced Trait (1 PP/r)</option>
                  </optgroup>
                </select>
                <button type="button" class="btn minor-control-btn" onclick="addContainedPowerToEffect(${pIdx}, ${eIdx}, 'selContainedPower_${pIdx}_${eIdx}')">+ Add</button>
              </div>
            </div>
          `;
        }

        // Companion In-Context Actions
        let companionButtonHtml = "";
        const isSummonEff = effect.effectName === "Summon";
        const isDupEff = effect.effectName === "Duplication" || effect.effectName === "Duplicate" || (effect.name && /duplicat/i.test(effect.name));
        const hasMetamorphEff = effect.effectName === "Morph" && effect.modifiers && effect.modifiers.some(m => m.name && m.name.includes("Metamorph"));

        if (isSummonEff) {
          const budget = rankNum * 15;
          const rootHero = window.primaryHero || char;
          const comps = (rootHero.companions || []).filter(c => c.type === "summon" || c.type === "minion");
          companionButtonHtml = `
            <div style="margin-top: 8px; padding: 8px 10px; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 4px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
              <span style="font-size: var(--font-size-secondary);">Summoned Creature (Rank ${rankNum}): <strong>${budget} PP Budget</strong> (Max PL ${rankNum})</span>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
                ${comps.map(c => `<button type="button" class="btn btn-sm" onclick="switchToCompanion('${c.id}')" title="Edit companion sheet">👥 Edit "${c.name}"</button>`).join('')}
                <button type="button" class="btn minor-control-btn" style="font-weight: bold;" onclick="buildOrEditCompanionForSource('summon', ${pIdx}, ${eIdx})">+ Build / Edit Summoned Creature</button>
              </div>
            </div>
          `;
        } else if (isDupEff) {
          const rootHero = window.primaryHero || char;
          const comps = (rootHero.companions || []).filter(c => c.type === "duplicate" || c.type === "minion");
          companionButtonHtml = `
            <div style="margin-top: 8px; padding: 8px 10px; background: rgba(2, 132, 199, 0.1); border: 1px solid rgba(2, 132, 199, 0.3); border-radius: 4px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
              <span style="font-size: var(--font-size-secondary);">Duplicate Minion: <strong>Full Hero Traits</strong></span>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
                ${comps.map(c => `<button type="button" class="btn btn-sm" onclick="switchToCompanion('${c.id}')" title="Edit duplicate sheet">👥 Edit "${c.name}"</button>`).join('')}
                <button type="button" class="btn minor-control-btn" style="font-weight: bold;" onclick="buildOrEditCompanionForSource('duplicate', ${pIdx}, ${eIdx})">+ Generate / Edit Duplicate Sheet</button>
              </div>
            </div>
          `;
        } else if (hasMetamorphEff) {
          const rootHero = window.primaryHero || char;
          const comps = (rootHero.companions || []).filter(c => c.type === "metamorph");
          companionButtonHtml = `
            <div style="margin-top: 8px; padding: 8px 10px; background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 4px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
              <span style="font-size: var(--font-size-secondary);">Alternate Form (Metamorph): <strong>${char.totalPointsAllowed} PP Budget</strong></span>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
                ${comps.map(c => `<button type="button" class="btn btn-sm" onclick="switchToCompanion('${c.id}')" title="Edit form sheet">🔄 Edit "${c.name}"</button>`).join('')}
                <button type="button" class="btn minor-control-btn" style="font-weight: bold;" onclick="buildOrEditCompanionForSource('metamorph', ${pIdx}, ${eIdx})">+ Build / Edit Alternate Form</button>
              </div>
            </div>
          `;
        }

        const isEffectActive = effect.active !== false;
        const isArrayContainer = powerContainer.containerType === "array" || (Array.isArray(powerContainer.effects) && powerContainer.effects.some(e => e.association === "alternate" || e.association === "dynamic"));
        const isMasterEffect = isArrayContainer && (effect.association === "primary" || (!effect.association && eIdx === 0));
        const masterBadgeHtml = isMasterEffect ? `<span class="badge badge-master-effect" title="Master Effect (Primary Array Slot)" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.4); font-size: var(--font-size-tags); font-weight: bold; padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 3px; cursor: default;">👑 Master</span>` : '';

        return `
          <div class="effect-card ${isLinkedCard ? 'is-linked' : ''}" style="margin-top: 12px; padding-top: 12px; border-top: ${eIdx > 0 ? '2.5px solid var(--accent-primary)' : '2px solid var(--border-power, #64748b)'};">
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: var(--font-size-tags); display: inline-flex; align-items: center;" title="${isDeviceContainer ? 'Device Trait' : 'Power Effect'}">${isDeviceContainer ? '⚙️' : '⚡'}</span>
                <span class="secondary-text" style="font-size: var(--font-size-fine-print); color: var(--text-muted);">Effect ${eIdx + 1}${powerContainer.effects.length > 1 ? ` of ${powerContainer.effects.length}` : ''}</span>
                ${masterBadgeHtml}
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <button type="button" class="btn btn-secondary" style="padding: 2px 8px; font-size: var(--font-size-minor-controls); height: 24px; display: inline-flex; align-items: center; gap: 4px;" onclick="resetEffect(${pIdx}, ${eIdx})" title="Reset Effect Profile">↺ Reset</button>
                <button type="button" class="btn-delete-power" style="padding: 2px 8px; font-size: var(--font-size-minor-controls); height: 24px; display: inline-flex; align-items: center; gap: 4px;" onclick="deleteEffect(${pIdx}, ${eIdx})" title="Delete Effect">✕ Delete</button>
              </div>
            </div>

            <!-- Row 1: Primary Effect Controls -->
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; width: 100%; margin-bottom: 6px;">
                <button type="button" class="btn minor-control-btn btn-effect-toggle" style="background: ${isEffectActive ? '#10b981' : 'var(--bg-app)'}; color: ${isEffectActive ? '#ffffff' : 'var(--text-muted)'}; border: 1px solid ${isEffectActive ? '#10b981' : 'var(--border-color)'};" onclick="toggleEffectActive(${pIdx}, ${eIdx})" title="${isEffectActive ? 'Effect is Active (click to turn Off)' : 'Effect is Inactive (click to turn On)'}">${isEffectActive ? 'On' : 'Off'}</button>
                <button type="button" class="btn minor-control-btn btn-effect-roll" onclick="window.rollEffectCheck(${pIdx}, ${eIdx})" title="Roll Attack or Power Check for this effect">🎲 Roll</button>

                <input type="text" class="minor-control" style="flex: 1; min-width: 135px; font-weight: 600;" value="${effect.customName || (effect.name && effect.name !== 'New Effect' && effect.name !== effect.effectName ? effect.name : '')}" placeholder="${effect.effectName || 'Effect Name'}" oninput="updateEffectCustomName(${pIdx}, ${eIdx}, this.value)" onblur="refreshUI();" title="Custom name for this effect">

                <select onchange="updateEffectDirect(${pIdx}, ${eIdx}, this.value)" class="minor-control" style="min-width: 160px; color: var(--accent-primary); font-weight: bold;">
                  <option value="" ${effect.effectName === "" ? "selected" : ""} style="color: var(--text-main); font-weight: normal;">- Select Effect -</option>
                  ${POWER_EFFECTS_LIST.filter(e => !e.effectName && e.name !== "Pre-built Powers").map(eff => `<option value="${eff.name}" ${eff.name === effect.effectName ? 'selected' : ''} style="color: var(--text-main); font-weight: normal;">${eff.name} (${eff.baseCost} PP/r)</option>`).join('')}
                </select>
                ${effectData && effect.effectName !== "" ? `<button type="button" class="btn-info-circle" onclick="showPowerEffectInfo('${effect.effectName}', '${(effect.name && effect.name !== 'New Effect' && effect.name !== effect.effectName) ? effect.name : ''}')" title="View Effect Rules">?</button>` : ''}

                <label style="font-size: var(--font-size-minor-controls); font-weight: 600;">Rank:</label>
                ${rankStepperHtml}
                ${(isBoosted && effRank > rankNum) ? `<span class="badge badge-boost-eff-rank" style="margin-left: 2px; font-size: var(--font-size-tags); background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid #10b981; font-weight: bold; padding: 2px 6px; border-radius: 4px;" title="Base Rank ${rankNum} + Boost = Effective Rank ${effRank}">(Eff: ${effRank})</span>` : ''}
                <span class="badge effect-cost-badge" style="margin-left: 4px; font-size: var(--font-size-tags);" title="Base Cost: ${rawEffectCost} PP${boostPPBonus > 0 ? ` (-${boostPPBonus} PP Boost Subsidy = ${Math.max(0, rawEffectCost - boostPPBonus)} PP)` : ''}">${effectCostDisplay}</span>
                ${(saveDcDisplay && saveDcDisplay !== "None" && saveDcDisplay !== "—" && !saveDcDisplay.startsWith("No attack")) ? `<span class="badge" style="margin-left: 4px; font-size: var(--font-size-tags); background: rgba(239, 68, 68, 0.12); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.35); font-weight: bold; padding: 2px 6px;" title="Saving Throw / Check DC">🎯 ${saveDcDisplay}</span>` : ''}
            </div>

            <!-- Row 2: Secondary Role, Profile, Link, Adjustment Tags, and Descriptors -->
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; width: 100%; margin-bottom: 8px;">
                <select onchange="updateEffectAssociation(${pIdx}, ${eIdx}, this.value)" class="minor-control" style="width: 135px; background: var(--bg-app);" title="Slot Role in Array">
                    <option value="" ${!effect.association || effect.association === '' ? 'selected' : ''}>${isDeviceContainer ? 'Device Trait' : '- Select Array Role -'}</option>
                    <option value="primary" ${effect.association === 'primary' ? 'selected' : ''}>Primary Slot</option>
                    <option value="alternate" ${effect.association === 'alternate' ? 'selected' : ''} ${powerContainer.effects.length === 1 ? 'disabled style="color: var(--text-muted);"' : ''}>Alternate (1 PP)</option>
                    <option value="dynamic" ${effect.association === 'dynamic' ? 'selected' : ''} ${powerContainer.effects.length === 1 ? 'disabled style="color: var(--text-muted);"' : ''}>Dynamic (2 PP)</option>
                </select>

                ${templateDropdownHtml}

                <select onchange="updateEffectLink(${pIdx}, ${eIdx}, this.value)" class="minor-control" style="max-width: 160px; background: var(--bg-app);" title="Link this effect to another effect">
                    ${linkOptions}
                </select>

                ${boostBadgeHtml}

                <div style="display: flex; align-items: center; gap: 6px; flex: 1; min-width: 140px;">
                  <label style="font-size: var(--font-size-secondary); color: var(--text-muted); font-weight: 600; white-space: nowrap;">Descriptors:</label>
                  <input type="text" value="${effect.descriptors || ''}" placeholder="e.g. Fire, Magic, Technology, Piercing" style="flex: 1; min-width: 100px; font-size: var(--font-size-secondary); padding: 3px 8px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-panel); color: var(--text-main);" oninput="updateEffectDescriptorsDirect(${pIdx}, ${eIdx}, this.value)" onblur="if(window.PowerHistoryManager) window.PowerHistoryManager.recordChange('descriptors');" title="${effect.descriptors ? `Descriptors: ${effect.descriptors}` : 'Descriptors (e.g. Fire, Magic, Technology)'}">
                </div>
            </div>

            ${linkBannerHtml}

            ${optionPickersHtml}

            ${containerPowersHtml}

            ${companionButtonHtml}

            ${subPowersHtml ? `<div style="margin-top: 8px;"><strong style="font-size: var(--font-size-secondary); color: var(--text-main);">${effect.effectName === "Enhanced Trait" ? "Enhanced Traits & Skills:" : "Profile Options:"}</strong><div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px;">${subPowersHtml}</div></div>` : ''}

            ${effect.effectName !== "" ? `
            <div class="power-modifiers-row" style="margin-top: 8px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <select id="selRootExtra_${idPrefix}${pIdx}_${eIdx}" class="minor-control" style="max-width: 170px;" onchange="if(this.value) addModifierToEffect(${pIdx}, ${eIdx}, this.id, ${isBlueprint});">
                  <option value="">+ Add Extra...</option>
                  ${availableSpecificExtras.length > 0 ? `<optgroup label="Effect-Specific Extras">${availableSpecificExtras.map(e => `<option value="${e.name}">${e.name} (+${e.cost || 1}${e.costType === 'flat' ? ' flat' : '/r'})${e.hasRanks && e.maxRanks && e.maxRanks < 20 ? ` (Max rank: ${e.maxRanks})` : ''}</option>`).join('')}</optgroup>` : ''}
                  <optgroup label="Universal Extras">
                    ${availableRootExtras.map(e => {
                      const legacyTag = (typeof LEGACY_CORE_MODIFIERS !== 'undefined' && LEGACY_CORE_MODIFIERS.includes(e.name)) ? ' [Legacy Core]' : '';
                      return `<option value="${e.name}">${e.name} (+${e.cost}${e.costType === 'flat' ? ' flat' : '/r'})${legacyTag}${e.hasRanks && e.maxRanks && e.maxRanks < 20 ? ` (Max rank: ${e.maxRanks})` : ''}</option>`;
                    }).join('')}
                  </optgroup>
                </select>
                <button type="button" class="btn-info-circle" style="min-width: 18px; min-height: 18px; font-size: calc(var(--font-size-minor-controls) * 0.85); margin-left: -2px; margin-right: 2px;" onclick="const val = document.getElementById('selRootExtra_${idPrefix}${pIdx}_${eIdx}').value; if(val) showModifierInfo(val, '${(effect.effectName || effect.name || '').replace(/'/g, "\\'")}');" title="View Info for Selected Extra">?</button>
                <button type="button" class="btn minor-control-btn" onclick="addModifierToEffect(${pIdx}, ${eIdx}, 'selRootExtra_${idPrefix}${pIdx}_${eIdx}', ${isBlueprint})">+ Extra</button>
              </div>

              <div style="display: flex; align-items: center; gap: 6px;">
                <select id="selRootFeat_${idPrefix}${pIdx}_${eIdx}" class="minor-control" style="max-width: 170px;" onchange="if(this.value) addModifierToEffect(${pIdx}, ${eIdx}, this.id, ${isBlueprint});">
                  <option value="">+ Add Power Feat...</option>
                  ${availableSpecificFeats.length > 0 ? `<optgroup label="Effect-Specific Feats">${availableSpecificFeats.map(f => `<option value="${f.name}">${f.name} (+${f.cost || 1}${f.costType === 'flat' ? ' flat' : '/r'})${f.hasRanks && f.maxRanks && f.maxRanks < 20 ? ` (Max rank: ${f.maxRanks})` : ''}</option>`).join('')}</optgroup>` : ''}
                  <optgroup label="Universal Feats">
                    ${availableRootFeats.map(f => `<option value="${f.name}">${f.name} (+${f.cost} flat)${f.hasRanks && f.maxRanks && f.maxRanks < 20 ? ` (Max rank: ${f.maxRanks})` : ''}</option>`).join('')}
                  </optgroup>
                </select>
                <button type="button" class="btn-info-circle" style="min-width: 18px; min-height: 18px; font-size: calc(var(--font-size-minor-controls) * 0.85); margin-left: -2px; margin-right: 2px;" onclick="const val = document.getElementById('selRootFeat_${idPrefix}${pIdx}_${eIdx}').value; if(val) showModifierInfo(val, '${(effect.effectName || effect.name || '').replace(/'/g, "\\'")}');" title="View Info for Selected Power Feat">?</button>
                <button type="button" class="btn minor-control-btn" onclick="addModifierToEffect(${pIdx}, ${eIdx}, 'selRootFeat_${idPrefix}${pIdx}_${eIdx}', ${isBlueprint})">+ Feat</button>
              </div>

              <div style="display: flex; align-items: center; gap: 6px;">
                <select id="selRootFlaw_${idPrefix}${pIdx}_${eIdx}" class="minor-control" style="max-width: 170px;" onchange="if(this.value) addModifierToEffect(${pIdx}, ${eIdx}, this.id, ${isBlueprint});">
                  <option value="">+ Add Flaw...</option>
                  ${availableSpecificFlaws.length > 0 ? `<optgroup label="Effect-Specific Flaws">${availableSpecificFlaws.map(f => `<option value="${f.name}">${f.name} (-${Math.abs(f.cost || -1)}${f.costType === 'flat' ? ' flat' : '/r'})${f.hasRanks && f.maxRanks && f.maxRanks < 20 ? ` (Max rank: ${f.maxRanks})` : ''}</option>`).join('')}</optgroup>` : ''}
                  <optgroup label="Universal Flaws">
                    ${availableRootFlaws.map(f => {
                      const legacyTag = (typeof LEGACY_CORE_MODIFIERS !== 'undefined' && LEGACY_CORE_MODIFIERS.includes(f.name)) ? ' [Legacy Core]' : '';
                      return `<option value="${f.name}">${f.name} (-${Math.abs(f.cost)}${f.costType === 'flat' ? ' flat' : '/r'})${legacyTag}${f.hasRanks && f.maxRanks && f.maxRanks < 20 ? ` (Max rank: ${f.maxRanks})` : ''}</option>`;
                    }).join('')}
                  </optgroup>
                </select>
                <button type="button" class="btn-info-circle" style="min-width: 18px; min-height: 18px; font-size: calc(var(--font-size-minor-controls) * 0.85); margin-left: -2px; margin-right: 2px;" onclick="const val = document.getElementById('selRootFlaw_${idPrefix}${pIdx}_${eIdx}').value; if(val) showModifierInfo(val, '${(effect.effectName || effect.name || '').replace(/'/g, "\\'")}');" title="View Info for Selected Flaw">?</button>
                <button type="button" class="btn btn-secondary minor-control-btn" onclick="addModifierToEffect(${pIdx}, ${eIdx}, 'selRootFlaw_${idPrefix}${pIdx}_${eIdx}', ${isBlueprint})">+ Flaw</button>
              </div>

              <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; width: 100%; flex-basis: 100%; margin-top: 6px;">
                ${rootModifiersHtml}
              </div>
            </div>
            ` : ''}

            <div class="power-short-desc">
              <div><strong>Effect Summary:</strong> ${shortDescText}</div>
              ${measurementHtml}
            </div>

            <div class="power-meta-row" style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; font-size: calc(var(--font-size-secondary) * 0.95);">
              <span><strong>Type:</strong> ${effectData ? effectData.type : '—'}</span>
              <span><strong>Action:</strong> ${effectiveTraits.action}</span>
              <span><strong>Range:</strong> ${rangeDisplay}</span>
              ${distanceDisplay ? `<span><strong>Distance/Speed:</strong> ${distanceDisplay}</span>` : ''}
              ${areaDisplay ? `<span style="color: var(--accent-primary); font-weight: 600;"><strong>Area:</strong> ${areaDisplay}</span>` : ''}
              ${massDisplay ? `<span><strong>Cargo / Mass:</strong> ${massDisplay}</span>` : ''}
              ${targetsDisplay ? `<span><strong>Targets:</strong> ${targetsDisplay}</span>` : ''}
              <span><strong>Duration:</strong> ${effectiveTraits.duration}</span>
              <span><strong>Save DC / Check:</strong> ${saveDcDisplay}</span>
              ${hasNoAttackRollMod ? `<span class="badge" style="font-size: var(--font-size-tags); background: rgba(59, 130, 246, 0.15); color: var(--accent-primary); border: 1px solid var(--accent-primary);">🎯 No Attack Roll</span>` : ''}
            </div>

            <div class="power-notes-row" style="margin-top: 8px;">
              <label style="min-width: 80px;">Notes:</label>
              <textarea rows="1" placeholder="Details, limits, or custom sense descriptions..." oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'; updateEffectNotesDirect(${pIdx}, ${eIdx}, this.value)" onblur="if(window.PowerHistoryManager) window.PowerHistoryManager.recordChange('notes');">${effect.notes || ''}</textarea>
            </div>
          </div>
        `;
    }).join("");

    return `
      ${pIdx > 0 ? '<div class="power-card-divider"></div>' : ''}
      <div class="power-card ${isCollapsed} ${isDeviceContainer ? 'is-device' : ''}" id="powerCard_${pIdx}" style="border: 2px solid var(--border-power, #64748b);">
        <div class="power-card-header" onclick="togglePowerCollapse(${pIdx})">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span id="powerCollapseIcon_${pIdx}" style="font-size: var(--font-size-secondary);">${powerContainer.collapsed ? '▶' : '▼'}</span>
            <button type="button" class="btn minor-control-btn btn-power-toggle" style="font-weight: bold; min-width: 44px; background: ${isContainerActive ? '#10b981' : 'var(--bg-app)'}; color: ${isContainerActive ? '#ffffff' : 'var(--text-muted)'}; border: 1px solid ${isContainerActive ? '#10b981' : 'var(--border-color)'};" onclick="event.stopPropagation(); togglePowerContainerActive(${pIdx})" title="${isContainerActive ? 'Power Container is Active (click to turn Off)' : 'Power Container is Inactive (click to turn On)'}">${isContainerActive ? 'On' : 'Off'}</button>
            ${isBlueprint ? `<span style="font-size: var(--font-size-labels); display: inline-flex; align-items: center;" title="Plan">📐</span>` : (isDeviceContainer ? `<span style="font-size: var(--font-size-labels); display: inline-flex; align-items: center;" title="Device Container">⚙️</span>` : `<span style="font-size: var(--font-size-labels); display: inline-flex; align-items: center;" title="Power Container">⚡</span>`)}
            ${deviceBadgeHtml}
            <input type="text" id="powerContainerName_${pIdx}" value="${powerContainer.name && powerContainer.name !== 'New Power Container' ? powerContainer.name : ''}" placeholder="${isBlueprint ? 'New Plan' : (isDeviceContainer ? 'New Device' : 'New Container')}" style="font-weight: bold; font-size: var(--font-size-labels); width: 200px; background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 6px; color: var(--text-main);" onclick="event.stopPropagation();" oninput="updatePowerContainerName(${pIdx}, this.value)" onblur="if(window.PowerHistoryManager) window.PowerHistoryManager.recordChange('container_name');">
            <span class="secondary-text" style="font-weight: normal; font-size: var(--font-size-secondary);">(${summaryText})</span>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;" onclick="event.stopPropagation();">
            ${isBlueprint ? `<label style="font-size: var(--font-size-labels); font-weight: 600; color: var(--text-muted); margin: 0; white-space: nowrap;">Plan cost:</label>` : ''}
            <span class="badge" id="powerCostBadge_${pIdx}" style="font-size: var(--font-size-labels); font-weight: normal;">${containerCost} PP</span>
            <button type="button" id="btnPowerCollapse_${pIdx}" class="btn" style="padding: 4px 8px;" onclick="togglePowerCollapse(${pIdx})" title="${powerContainer.collapsed ? 'Edit Power Container' : 'Save and Collapse'}">${powerContainer.collapsed ? 'Edit' : 'Save'}</button>
            <button type="button" class="btn-delete-power" onclick="deletePowerContainer(${pIdx})" title="${isBlueprint ? 'Delete Entire Plan' : 'Delete Entire Container'}">${isBlueprint ? 'Delete Plan' : 'Delete Container'}</button>
          </div>
        </div>

        <div class="power-card-body">
            ${isBlueprint ? `
              <div class="blueprint-details-banner">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 10px;">
                  <div class="blueprint-phase-card">
                    <span class="blueprint-phase-header" style="color: var(--text-muted);">Design Phase (Knowledge)</span>
                    <div class="blueprint-phase-dc" style="margin-top: 2px;"><strong>Check DC:</strong> <span style="color: var(--accent-primary); font-weight: bold;">DC ${10 + containerCost}</span></div>
                    <div class="blueprint-phase-time"><strong>Design Time:</strong> ${containerCost} hour${containerCost === 1 ? '' : 's'}</div>
                  </div>
                  <div class="blueprint-phase-card">
                    <span class="blueprint-phase-header" style="color: var(--accent-success);">Invention Construction (Craft)</span>
                    <div class="blueprint-phase-dc" style="margin-top: 2px;"><strong>Construction DC:</strong> <span style="color: var(--accent-success); font-weight: bold;">DC ${10 + containerCost}</span></div>
                    <div class="blueprint-phase-time"><strong>Construction Time:</strong> ${containerCost * 4} hours <span class="blueprint-phase-subtext">(Fast: ${containerCost * 10} min)</span></div>
                  </div>
                  <div class="blueprint-phase-card">
                    <span class="blueprint-phase-header" style="color: #8b5cf6;">Ritual Performance (Arcana)</span>
                    <div class="blueprint-phase-dc" style="margin-top: 2px;"><strong>Performance DC:</strong> <span style="color: #8b5cf6; font-weight: bold;">DC ${10 + containerCost}</span></div>
                    <div class="blueprint-phase-time"><strong>Performance Time:</strong> ${containerCost * 10} min <span class="blueprint-phase-subtext">(+${containerCost} rnds to cast)</span></div>
                  </div>
                </div>
              </div>
            ` : ''}
            ${effectsHtml}
            <div style="margin-top: 16px; padding-top: 8px; border-top: 2px solid var(--border-color); display: flex; justify-content: flex-end;">
                <button type="button" class="btn" onclick="addEffectToPower(${pIdx})">+ Add New Effect</button>
            </div>
        </div>
      </div>
    `;
  }).join("");
  } finally {
    if (typeof window !== 'undefined') {
      window.activePowerContext = prevContext;
    }
  }
}

function buildPowersUI() {
  const currentContext = (typeof window !== 'undefined' && window.activePowerContext === 'blueprints') ? 'blueprints' : 'powers';

  // Always populate both containers so neither tab is ever stale or unrendered
  renderPowersContainer("powersContainer", (typeof char !== 'undefined' && char.powers) ? char.powers : [], false);
  if (typeof document !== 'undefined' && document.getElementById("blueprintsContainer")) {
    renderPowersContainer("blueprintsContainer", (typeof char !== 'undefined' && char.blueprints) ? char.blueprints : [], true);
  }

  if (typeof window !== 'undefined') {
    window.activePowerContext = currentContext;
    if (window.PowerHistoryManager) {
      window.PowerHistoryManager.updateButtons();
    }
  }
}

window.addOptionSubPower = function(pIdx, eIdx, selectId, isReduced = false) {
  const sel = document.getElementById(selectId);
  if (!sel || !sel.value || sel.value.startsWith("- Select")) return;
  window.invalidateContainerDeclaredCost(pIdx);
  const optChoice = sel.value;
  const effect = char.activePowers[pIdx].effects[eIdx];

  if (!effect.subPowers) effect.subPowers = [];
  
  let bCost = 1;
  let cType = "per_rank";
  let r = 1;

  if (effect.effectName === "Flight" || effect.effectName === "Teleport" || effect.effectName === "Move Object" || effect.effectName === "Create") bCost = 2;
  else if (effect.effectName === "Insubstantial") bCost = 10;
  else if (effect.effectName === "Comprehend") bCost = 2;

  let cleanName = optChoice.split(" [")[0].trim();
  let coreName = cleanName.split(" (")[0].trim(); 
  
  if (["Immunity", "Super-Senses", "Enhanced Trait", "Super-Movement", "Movement", "Enhanced Movement", "Comprehend", "Features", "Feature"].includes(effect.effectName)) {
      coreName = cleanName;
  }

  if (effect.subPowers.some(sub => sub.type === coreName || sub.name === cleanName || (sub.name && sub.name.split(" [")[0].trim() === cleanName))) {
      let warningsDisabled = (localStorage.getItem("mm2e_disable_warnings") ?? localStorage.getItem("mm4e_disable_warnings")) === "true";
      if (!warningsDisabled) {
          alert(cleanName + " has already been added to this power. Increase its rank instead.");
      }
      return;
  }

  if (effect.effectName === "Immunity" && isOptionCoveredByExisting(effect, cleanName)) {
      let warningsDisabled = (localStorage.getItem("mm2e_disable_warnings") ?? localStorage.getItem("mm4e_disable_warnings")) === "true";
      if (!warningsDisabled) {
          alert(cleanName + " is already covered by a broader Immunity option.");
      }
      return;
  }

  let inheritedModifiers = [];
  if (effect.effectName === "Immunity") {
      const subsets = getSubsetsForOption("Immunity", cleanName);
      if (subsets.length > 0) {
          effect.subPowers.forEach(sp => {
              const spClean = (sp.name || sp.type || "").split(" [")[0].trim();
              if (subsets.includes(spClean) && sp.modifiers && sp.modifiers.length > 0) {
                  sp.modifiers.forEach(m => {
                      if (!inheritedModifiers.some(im => im.name === m.name)) {
                          inheritedModifiers.push(m);
                      }
                  });
              }
          });
          effect.subPowers = effect.subPowers.filter(sp => {
              const spClean = (sp.name || sp.type || "").split(" [")[0].trim();
              return !subsets.includes(spClean);
          });
      }
  }

  let isSenseType = cleanName.includes("Sense Type");
  let senseCat = SENSE_TYPE_MAP[cleanName] || (isSenseType ? cleanName.replace("Sense Type", "").trim() : "Special");

  if (optChoice.includes("[") && optChoice.includes("pt")) {
     const match = optChoice.match(/\[(\+?\d+)\+?\s*pts?(?:\/r)?\]/i) || optChoice.match(/\[(\+?\d+)\s*pt/i);
     if (match) {
         bCost = parseInt(match[1].replace('+', ''));
         if (optChoice.includes("/r") || optChoice.toLowerCase().includes("per rank") || optChoice.toLowerCase().includes("ranks")) {
             cType = "per_rank";
         } else {
             cType = "flat";
         }
     }
  }

  if (effect.effectName === "Immunity") {
      let ptsVal = 1;
      const match = optChoice.match(/\[(\+?\d+)\+?\s*pts?(?:\/r)?\]/i) || optChoice.match(/\[(\+?\d+)\s*pt/i) || optChoice.match(/\[(\d+)\s*ranks?\]/i);
      if (match) ptsVal = parseInt(match[1].replace('+', ''));
      bCost = 1;
      cType = "per_rank";
      r = optChoice.includes("/r") ? 1 : ptsVal;
  } else if (effect.effectName === "Super-Senses") {
      r = 1;
  } else if (effect.effectName === "Super-Movement" || effect.effectName === "Movement" || effect.effectName === "Enhanced Movement") {
      bCost = 2;
      cType = optChoice.includes("flat") ? "flat" : "per_rank";
      r = 1;
  } else if (effect.effectName === "Comprehend") {
      bCost = cleanName.includes("Objects") ? 4 : 2;
      cType = cleanName.includes("Objects") ? "flat" : "per_rank";
      r = 1;
  } else if (effect.effectName === "Features" || effect.effectName === "Feature") {
      bCost = 1;
      cType = "flat";
      r = 1;
  }

  effect.subPowers.push({
    name: optChoice,
    type: coreName,
    rank: r,
    baseCost: bCost,
    costType: cType,
    details: "",
    modifiers: inheritedModifiers,
    isReduced: isReduced,
    isSenseType: isSenseType,
    senseCategory: senseCat
  });

  let subTotalRank = effect.subPowers.reduce((sum, sp) => sum + (parseInt(sp.rank) || 1), 0);
  if (effect.effectName === "Super-Senses" || effect.effectName === "Senses" || effect.effectName === "Enhanced Senses") {
      subTotalRank = char.calculateEffectCost(effect);
  }
  if ((parseInt(effect.rank) || 1) < subTotalRank || effect.effectName === "Super-Senses" || effect.effectName === "Immunity") {
      effect.rank = subTotalRank || 1;
  }

  sel.selectedIndex = 0;
  buildPowersUI();
  refreshUI();
};

window.addSubPowerMeta = function(pIdx, eIdx, subIdx, selectId) {
  const sel = document.getElementById(selectId);
  if (!sel || !sel.value || sel.value.startsWith("- Select") || sel.value.startsWith("- None")) return;
  window.invalidateContainerDeclaredCost(pIdx);
  const metaName = sel.value;
  const effect = char.activePowers[pIdx].effects[eIdx];

    if (effect && effect.subPowers && effect.subPowers[subIdx]) {
    let sub = effect.subPowers[subIdx];
    if (!sub.modifiers) sub.modifiers = [];

    if (sub.modifiers.some(m => m.name === metaName)) {
        sel.selectedIndex = 0;
        return;
    }
    
    let mCost = 1;
    let mType = "flat";
    let mCategory = "extra";
    const mMatch = metaName.match(/\[([+-]?\d+)\s*pts?(?:\/r)?\]/i);
    if (mMatch) {
        mCost = parseInt(mMatch[1]);
        if (mCost < 0) {
            mCategory = "flaw";
            mCost = Math.abs(mCost);
        }
    }
    if (metaName.includes("/r") || metaName.includes("per rank")) mType = "per_rank";

    if (metaName.includes("Counters Concealment (All)")) {
        sub.modifiers = sub.modifiers.filter(m => !m.name.includes("Counters Concealment (One Descriptor)"));
    }
    if (metaName.includes("Counters Concealment (One Descriptor)")) {
        sub.modifiers = sub.modifiers.filter(m => !m.name.includes("Counters Concealment (All)"));
    }
    if (metaName.includes("Counters Obscure (All)")) {
        sub.modifiers = sub.modifiers.filter(m => !m.name.includes("Counters Obscure (One Descriptor)"));
    }
    if (metaName.includes("Counters Obscure (One Descriptor)")) {
        sub.modifiers = sub.modifiers.filter(m => !m.name.includes("Counters Obscure (All)"));
    }
    if (metaName.includes("Affects Others Only")) {
        sub.modifiers = sub.modifiers.filter(m => !m.name.includes("Affects Others") || m.name.includes("Affects Others Only"));
    } else if (metaName.includes("Affects Others")) {
        sub.modifiers = sub.modifiers.filter(m => !m.name.includes("Affects Others Only"));
    }
    if (metaName.includes("Redirect")) {
        sub.modifiers = sub.modifiers.filter(m => !m.name.includes("Redirect"));
    }
    if (metaName.includes("Sustained")) {
        sub.modifiers = sub.modifiers.filter(m => !m.name.includes("Concentration"));
    }
    if (metaName.includes("Concentration")) {
        sub.modifiers = sub.modifiers.filter(m => !m.name.includes("Sustained"));
    }

    const isSenseMeta = effect.effectName === "Super-Senses";

    sub.modifiers.push({
      name: metaName,
      ranks: 1,
      cost: mCost, 
      costType: mType,
      category: mCategory,
      isMeta: isSenseMeta
    });
    
    let addedMetaCore = metaName.split(" (")[0].split(" [")[0].trim();
    let subType = sub.type || sub.name;
    
    if (sub.isSenseType || subType.includes("Sense Type") || metaName.includes("(Sense Type)")) {
        let mySenseCategory = sub.senseCategory || SENSE_TYPE_MAP[subType] || subType.replace(" Sense Type", "").trim();
        effect.subPowers.forEach(otherSub => {
            let oType = otherSub.type || otherSub.name;
            let oCat = otherSub.senseCategory || SENSE_TYPE_MAP[oType];
            if (!otherSub.isSenseType && !oType.includes("Sense Type") && oCat === mySenseCategory) {
                if (otherSub.modifiers) {
                    otherSub.modifiers = otherSub.modifiers.filter(m => !m.name.startsWith(addedMetaCore));
                }
            }
        });
    }

    let cleanSubName = (sub.type || sub.name || "").split(" [")[0].trim();
    let subsetNames = getSubsetsForOption(effect.effectName, cleanSubName);
    if (subsetNames.length > 0) {
        effect.subPowers.forEach(otherSub => {
            let oClean = (otherSub.name || otherSub.type || "").split(" [")[0].trim();
            if (subsetNames.includes(oClean) && otherSub.modifiers && otherSub.modifiers.length > 0) {
                otherSub.modifiers = otherSub.modifiers.filter(m => {
                    let mCore = m.name.split(" (")[0].split(" [")[0].trim();
                    if (addedMetaCore === "Affects Others" || addedMetaCore === "Affects Others Only") {
                        return mCore !== "Affects Others" && mCore !== "Affects Others Only";
                    }
                    if (addedMetaCore === "Redirect") {
                        return mCore !== "Redirect";
                    }
                    return mCore !== addedMetaCore;
                });
            }
        });
    }

    if (effect.effectName === "Super-Senses" || effect.effectName === "Senses" || effect.effectName === "Enhanced Senses") {
        effect.rank = char.calculateEffectCost(effect);
    }

    sel.selectedIndex = 0;
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("add_submeta");
    buildPowersUI();
    refreshUI();
  }
};

window.removeSubPower = function(pIdx, eIdx, subIdx) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx] && char.activePowers[pIdx].effects[eIdx].subPowers) {
    window.invalidateContainerDeclaredCost(pIdx);
    char.activePowers[pIdx].effects[eIdx].subPowers.splice(subIdx, 1);
    
    if (char.activePowers[pIdx].effects[eIdx].effectName === "Immunity") {
        let subTotalRank = (char.activePowers[pIdx].effects[eIdx].subPowers || []).reduce((sum, sp) => sum + (parseInt(sp.rank) || 1), 0);
        char.activePowers[pIdx].effects[eIdx].rank = Math.max(1, subTotalRank);
    } else {
        let maxR = window.getMaxPowerRank(char.activePowers[pIdx].effects[eIdx]);
        if (char.activePowers[pIdx].effects[eIdx].rank > maxR) {
            char.activePowers[pIdx].effects[eIdx].rank = maxR;
        }
    }

    if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("remove_subpower");
    buildPowersUI();
    refreshUI();
  }
};

window.stepSubPowerRank = function(pIdx, eIdx, subIdx, delta, minVal, maxVal) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx] && char.activePowers[pIdx].effects[eIdx].subPowers && char.activePowers[pIdx].effects[eIdx].subPowers[subIdx]) {
    window.invalidateContainerDeclaredCost(pIdx);
    let sub = char.activePowers[pIdx].effects[eIdx].subPowers[subIdx];
    let val = (parseInt(sub.rank) || 1) + delta;
    if (minVal !== undefined && val < minVal) val = minVal;
    if (maxVal !== undefined && val > maxVal) val = maxVal;
    sub.rank = val;
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordStepperChange(`sub_rank_${pIdx}_${eIdx}_${subIdx}`);
    buildPowersUI();
    refreshUI();
  }
};

window.addSubPowerModifier = function(pIdx, eIdx, subIdx, selectId, category) {
  const sel = document.getElementById(selectId);
  if (!sel || !sel.value) return;
  window.invalidateContainerDeclaredCost(pIdx);
  const modName = sel.value;

  let modData = POWER_MODIFIERS_LIST.find(m => m.name === modName) || { name: modName, cost: 1, costType: "flat", category: category };
  const sub = char.activePowers[pIdx].effects[eIdx].subPowers[subIdx];
  if (!sub.modifiers) sub.modifiers = [];
  sub.modifiers.push({
    name: modName,
    ranks: 1,
    cost: modData.cost,
    costType: modData.costType,
    category: category,
    isMeta: false
  });

  sel.selectedIndex = 0;
  if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("add_submod");
  buildPowersUI();
  refreshUI();
};

window.stepSubPowerModifierRank = function(pIdx, eIdx, subIdx, modIdx, delta, minVal, maxVal) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx] && char.activePowers[pIdx].effects[eIdx].subPowers && char.activePowers[pIdx].effects[eIdx].subPowers[subIdx]) {
    window.invalidateContainerDeclaredCost(pIdx);
    let sMod = char.activePowers[pIdx].effects[eIdx].subPowers[subIdx].modifiers[modIdx];
    if (sMod) {
       let val = (parseInt(sMod.ranks) || 1) + delta;
       if (minVal !== undefined && val < minVal) val = minVal;
       if (maxVal !== undefined && val > maxVal) val = maxVal;
       sMod.ranks = val;
       if (window.PowerHistoryManager) window.PowerHistoryManager.recordStepperChange(`submod_rank_${pIdx}_${eIdx}_${subIdx}_${modIdx}`);
       buildPowersUI();
       refreshUI();
    }
  }
};

window.removeSubPowerModifier = function(pIdx, eIdx, subIdx, modIdx) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx] && char.activePowers[pIdx].effects[eIdx].subPowers && char.activePowers[pIdx].effects[eIdx].subPowers[subIdx]) {
    window.invalidateContainerDeclaredCost(pIdx);
    char.activePowers[pIdx].effects[eIdx].subPowers[subIdx].modifiers.splice(modIdx, 1);
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("remove_submod");
    buildPowersUI();
    refreshUI();
  }
};

window.addAfflictionCondition = function(pIdx, eIdx, degKey, selectId) {
    const sel = document.getElementById(selectId);
    if(!sel || !sel.value || sel.value.startsWith("-")) return;
    window.invalidateContainerDeclaredCost(pIdx);
    if(!char.activePowers[pIdx].effects[eIdx].options) char.activePowers[pIdx].effects[eIdx].options = {};
    char.activePowers[pIdx].effects[eIdx].options[degKey] = sel.value;
    sel.selectedIndex = 0;
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("add_affliction");
    buildPowersUI();
    refreshUI();
};

window.removeAfflictionCondition = function(pIdx, eIdx, degKey) {
    if(char.activePowers[pIdx].effects[eIdx].options) {
        window.invalidateContainerDeclaredCost(pIdx);
        char.activePowers[pIdx].effects[eIdx].options[degKey] = "";
        if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("remove_affliction");
        buildPowersUI();
        refreshUI();
    }
};

window.isDefaultPowerContainer = function(container) {
  if (!container) return true;
  const defNames = ["New Power Container", "New Improvised Effect", "Power Container", ""];
  const nameIsDefault = !container.name || defNames.includes(container.name.trim());
  if (!nameIsDefault) return false;

  const effects = container.effects || [];
  if (effects.length === 0) return true;
  if (effects.length > 1) return false;

  const eff = effects[0];
  const effectNameIsDefault = !eff.effectName || eff.effectName.trim() === "";
  const profileNameIsDefault = !eff.name || eff.name === "New Effect" || eff.name === eff.effectName;
  const rankIsDefault = (parseInt(eff.rank) || 1) === 1;
  const noModifiers = !eff.modifiers || eff.modifiers.length === 0;
  const noSubPowers = !eff.subPowers || eff.subPowers.length === 0;
  const noDescriptors = !eff.descriptors || eff.descriptors.trim() === "";
  const noNotes = !eff.notes || eff.notes.trim() === "";
  const noOptions = !eff.options || Object.keys(eff.options).length === 0;
  const notLinked = !eff.linkedTo && (eff.association === "primary" || !eff.association);

  return effectNameIsDefault && profileNameIsDefault && rankIsDefault && noModifiers && noSubPowers && noDescriptors && noNotes && noOptions && notLinked;
};

window.PowerHistoryManager = {
  maxHistory: 100,
  history: [],
  currentIndex: -1,
  activeStepperKey: null,
  stepperTimer: null,
  storageKey: "mm2e_powers_unified_history",

  init: function() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.history) && parsed.history.length > 0 && typeof parsed.index === "number") {
          this.history = parsed.history.slice(-this.maxHistory);
          this.currentIndex = Math.min(parsed.index, this.history.length - 1);
        }
      }
    } catch (e) {
      console.warn("Failed to load power history:", e);
    }
    if (this.history.length === 0 && typeof char !== 'undefined' && char.activePowers) {
      this.history = [JSON.stringify(char.activePowers)];
      this.currentIndex = 0;
    }
    this.updateButtons();
  },

  saveToStorage: function() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify({
        history: this.history,
        index: this.currentIndex
      }));
    } catch (e) {
      console.warn("Failed to persist power history:", e);
    }
  },

  commitPendingStepper: function() {
    if (this.stepperTimer) {
      clearTimeout(this.stepperTimer);
      this.stepperTimer = null;
    }
    if (this.activeStepperKey !== null) {
      this.activeStepperKey = null;
      this.pushSnapshot();
    }
  },

  recordStepperChange: function(stepperKey) {
    if (this.activeStepperKey !== stepperKey) {
      this.commitPendingStepper();
      this.activeStepperKey = stepperKey;
    }
    if (this.stepperTimer) clearTimeout(this.stepperTimer);
    this.stepperTimer = setTimeout(() => {
      this.commitPendingStepper();
    }, 800);
    this.updateButtons();
  },

  recordChange: function(reason) {
    this.commitPendingStepper();
    this.pushSnapshot();
  },

  pushSnapshot: function() {
    if (typeof char === 'undefined' || !char.activePowers) return;
    const snap = JSON.stringify(char.activePowers);

    if (this.currentIndex >= 0 && this.currentIndex < this.history.length && this.history[this.currentIndex] === snap) {
      return;
    }

    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    this.history.push(snap);
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
    this.currentIndex = this.history.length - 1;
    this.saveToStorage();
    this.updateButtons();
  },

  undo: function() {
    this.commitPendingStepper();
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const restored = JSON.parse(this.history[this.currentIndex]);
      if (typeof window !== 'undefined' && window.activePowerContext === 'blueprints') {
        char.blueprints = restored;
      } else {
        char.powers = restored;
      }
      this.saveToStorage();
      buildPowersUI();
      refreshUI();
      this.updateButtons();
    }
  },

  redo: function() {
    this.commitPendingStepper();
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      const restored = JSON.parse(this.history[this.currentIndex]);
      if (typeof window !== 'undefined' && window.activePowerContext === 'blueprints') {
        char.blueprints = restored;
      } else {
        char.powers = restored;
      }
      this.saveToStorage();
      buildPowersUI();
      refreshUI();
      this.updateButtons();
    }
  },

  clear: function() {
    this.commitPendingStepper();
    if (confirm("Are you sure you want to clear the power history?")) {
      const snap = JSON.stringify(char.activePowers);
      this.history = [snap];
      this.currentIndex = 0;
      this.saveToStorage();
      this.updateButtons();
    }
  },

  updateButtons: function() {
    const btnBack = document.getElementById("btnPowerHistoryBack");
    const btnForward = document.getElementById("btnPowerHistoryForward");
    const btnClear = document.getElementById("btnPowerHistoryClear");
    if (btnBack) btnBack.disabled = this.currentIndex <= 0;
    if (btnForward) btnForward.disabled = this.currentIndex >= this.history.length - 1;
    if (btnClear) btnClear.disabled = this.history.length <= 1;
  }
};

window.resetEffect = function(pIdx, eIdx) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
      let effect = char.activePowers[pIdx].effects[eIdx];
      
      effect.effectName = "";
      effect.options = {};
      effect.subPowers = [];
      effect.modifiers = [];
      effect.rank = 1;
      effect.descriptors = "";
      effect.name = "New Effect";
      effect.notes = "";
      effect.effectCache = {};
      if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("reset_effect");
      buildPowersUI();
      refreshUI();
  }
};

window.addEffectToPower = function(pIdx) {
    if (char.activePowers[pIdx]) {
        window.invalidateContainerDeclaredCost(pIdx);
        let assoc = "primary";
        if (char.activePowers[pIdx].effects.length > 0) {
            assoc = "alternate";
        }
        char.activePowers[pIdx].effects.push({
            id: "eff_" + Math.random().toString(36).substr(2, 9),
            name: "New Effect",
            effectName: "",
            association: assoc,
            linkedTo: null,
            rank: 1,
            descriptors: "",
            notes: "",
            modifiers: [],
            options: {},
            subPowers: [],
            effectCache: {}
        });
        if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("add_effect");
        buildPowersUI();
        refreshUI();
    }
};

function setupPowerHandlers() {
  if (window.PowerHistoryManager) {
    window.PowerHistoryManager.init();
  }

  const btnAdd = document.getElementById("btnAddPower");
  const btnAddBlueprint = document.getElementById("btnAddBlueprint");
  
  if (btnAddBlueprint) {
      btnAddBlueprint.addEventListener("click", () => {
          char.blueprints.push({
            name: "New Improvised Effect",
            collapsed: false,
            effects: [
                {
                  id: "imp_" + Math.random().toString(36).substr(2, 9),
                  name: "New Effect",
                  effectName: "",
                  association: "primary",
                  linkedTo: null,
                  rank: 1,
                  descriptors: "",
                  notes: "",
                  modifiers: [],
                  options: {},
                  subPowers: [],
                  effectCache: {}
                }
            ]
          });
          if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("add_blueprint");
          buildPowersUI();
          refreshUI();
      });
  }
  if (!btnAdd) return;
  btnAdd.textContent = "+ Add New Power Container"; 
  btnAdd.addEventListener("click", () => {
    char.activePowers.push({
      name: "",
      collapsed: false,
      effects: [
          {
            id: "eff_" + Math.random().toString(36).substr(2, 9),
            name: "New Effect",
            effectName: "",
            association: "primary",
            linkedTo: null,
            rank: 1,
            descriptors: "",
            notes: "",
            modifiers: [],
            options: {},
            subPowers: [],
            effectCache: {}
          }
      ]
    });
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("add_container");
    buildPowersUI();
    refreshUI();
  });
}

window.togglePowerCollapse = function(index) {
  if (char.activePowers[index]) {
    char.activePowers[index].collapsed = !char.activePowers[index].collapsed;
    const containerId = (window.activePowerContext === 'blueprints') ? "blueprintsContainer" : "powersContainer";
    const container = document.getElementById(containerId);
    const card = container ? container.querySelector(`#powerCard_${index}`) : document.getElementById(`powerCard_${index}`);
    const icon = container ? container.querySelector(`#powerCollapseIcon_${index}`) : document.getElementById(`powerCollapseIcon_${index}`);
    const btn = container ? container.querySelector(`#btnPowerCollapse_${index}`) : document.getElementById(`btnPowerCollapse_${index}`);
    if (card && icon) {
      if (char.activePowers[index].collapsed) {
        card.classList.add('collapsed');
        icon.textContent = '▶';
        if (btn) { btn.textContent = 'Edit'; btn.title = 'Edit Power Container'; }
      } else {
        card.classList.remove('collapsed');
        icon.textContent = '▼';
        if (btn) { btn.textContent = 'Save'; btn.title = 'Save and Collapse Container'; }
      }
    }
  }
};

window.updateEffectDescriptorsDirect = function(pIdx, eIdx, value) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
    char.activePowers[pIdx].effects[eIdx].descriptors = value;
  }
};

window.updateEffectNotesDirect = function(pIdx, eIdx, value) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
    char.activePowers[pIdx].effects[eIdx].notes = value;
  }
};

window.updateEffectOptionSelect = function(pIdx, eIdx, optionKey, value) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
    if (!char.activePowers[pIdx].effects[eIdx].options) char.activePowers[pIdx].effects[eIdx].options = {};
    char.activePowers[pIdx].effects[eIdx].options[optionKey] = value;
    buildPowersUI();
    refreshUI();
  }
};

window.updateEffectOptionText = function(pIdx, eIdx, optionKey, value) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
    if (!char.activePowers[pIdx].effects[eIdx].options) char.activePowers[pIdx].effects[eIdx].options = {};
    char.activePowers[pIdx].effects[eIdx].options[optionKey] = value;
  }
};

window.updateEffectDirect = function(pIdx, eIdx, value, skipHistory = false) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
    let effect = char.activePowers[pIdx].effects[eIdx];
    
    if (!skipHistory) {
        if (!effect.effectHistory) { effect.effectHistory = [effect.effectName || ""]; effect.effectHistoryIdx = 0; }
        if (effect.effectHistory[effect.effectHistoryIdx] !== (value || "")) {
            effect.effectHistory = effect.effectHistory.slice(0, effect.effectHistoryIdx + 1);
            effect.effectHistory.push(value || "");
            if (effect.effectHistory.length > 20) effect.effectHistory.shift();
            else effect.effectHistoryIdx++;
        }
    }
    
    if (!effect.effectCache) effect.effectCache = {};

    if (effect.effectName) {
        effect.effectCache[effect.effectName] = {
            options: JSON.parse(JSON.stringify(effect.options)),
            subPowers: JSON.parse(JSON.stringify(effect.subPowers)),
            modifiers: JSON.parse(JSON.stringify(effect.modifiers)),
            rank: effect.rank,
            name: effect.name 
        };
    }

    const oldEffectName = effect.effectName;
    const hasCustomName = window.isEffectCustomNameSet(effect);

    effect.effectName = value;
    effect.isProfileExplicitlySelected = false;

    if (value && effect.effectCache[value]) {
        let cache = effect.effectCache[value];
        effect.options = JSON.parse(JSON.stringify(cache.options));
        effect.subPowers = JSON.parse(JSON.stringify(cache.subPowers));
        effect.modifiers = JSON.parse(JSON.stringify(cache.modifiers));
        effect.rank = cache.rank;
        if (!hasCustomName) {
            effect.name = value || "New Effect";
            effect.hasCustomName = false;
            effect.customName = "";
        } else {
            effect.name = effect.customName || effect.name;
        }
    } else {
        effect.options = {}; 
        effect.subPowers = [];
        effect.modifiers = [];
        effect.rank = 1;
        if (!hasCustomName) {
            effect.name = value || "New Effect";
            effect.hasCustomName = false;
            effect.customName = "";
        } else {
            effect.name = effect.customName || effect.name;
        }
        if (value === "Boost") {
          effect.baseCost = 1;
          effect.options = { boostScope: "Single Trait", boostTarget: "" };
        } 
    }

    // Update power container name if it hasn't been given a custom name yet
    const powerContainer = char.activePowers[pIdx];
    if (powerContainer) {
      const containerHasCustom = powerContainer.hasCustomName || (powerContainer.name && powerContainer.name !== "New Power Container" && powerContainer.name !== oldEffectName && (powerContainer.effects.length > 1 || powerContainer.name !== (effect.customName || effect.name)));
      if (!containerHasCustom || !powerContainer.name || powerContainer.name === "New Power Container" || powerContainer.name === oldEffectName) {
        if (!hasCustomName) {
          powerContainer.name = value || "";
          powerContainer.hasCustomName = false;
          const containerId = (window.activePowerContext === 'blueprints') ? "blueprintsContainer" : "powersContainer";
          const container = document.getElementById(containerId);
          const headerTitle = container ? container.querySelector(`#powerContainerName_${pIdx}`) : document.getElementById(`powerContainerName_${pIdx}`);
          if (headerTitle) headerTitle.value = value || "";
        } else {
          powerContainer.name = effect.name;
          const containerId = (window.activePowerContext === 'blueprints') ? "blueprintsContainer" : "powersContainer";
          const container = document.getElementById(containerId);
          const headerTitle = container ? container.querySelector(`#powerContainerName_${pIdx}`) : document.getElementById(`powerContainerName_${pIdx}`);
          if (headerTitle) headerTitle.value = effect.name;
        }
      }
    }
    
    let maxR = window.getMaxPowerRank(effect);
    if (effect.rank > maxR) {
        effect.rank = maxR;
    }

    // Sync any Boost targeting this effect so it seamlessly tracks the change
    const allPowerContainers = char.activePowers || char.powers || [];
    allPowerContainers.forEach(p => {
      (p.effects || []).forEach(oe => {
        if (oe.effectName === "Boost") {
          const tgt = (oe.options && oe.options.boostTarget) || oe.boostTarget;
          if (tgt === effect.id || tgt === oldEffectName || (oldEffectName && tgt === oldEffectName)) {
            oe.boostTarget = effect.id;
            if (!oe.options) oe.options = {};
            oe.options.boostTarget = effect.id;
          }
        }
      });
    });

    buildPowersUI();
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("update_effect");
    refreshUI();
  }
};

window.updatePowerProp = function(pIdx, eIdx, prop, value) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
    window.invalidateContainerDeclaredCost(pIdx);
    if (prop === 'rank') {
      let val = parseInt(value) || 1;
      let effect = char.activePowers[pIdx].effects[eIdx];
      let maxRank = window.getMaxPowerRank(effect);
      let minRank = 1;
      if (effect.subPowers && effect.subPowers.length > 0) {
        minRank = effect.subPowers.reduce((sum, sp) => sum + (parseInt(sp.rank) || 1), 0);
      }
      if (val > maxRank) val = maxRank;
      if (val < minRank) val = minRank;
      char.activePowers[pIdx].effects[eIdx][prop] = val;
    } else {
      char.activePowers[pIdx].effects[eIdx][prop] = value;
    }
    buildPowersUI();
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("rank_prop");
    refreshUI();
  }
};

window.stepEffectRank = function(pIdx, eIdx, delta) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
    window.invalidateContainerDeclaredCost(pIdx);
    let effect = char.activePowers[pIdx].effects[eIdx];
    let maxRank = window.getMaxPowerRank(effect);
    let minRank = 1;
    if (effect.subPowers && effect.subPowers.length > 0) {
      minRank = effect.subPowers.reduce((sum, sp) => sum + (parseInt(sp.rank) || 1), 0);
    }
    
    let val = (parseInt(effect.rank) || 1) + delta;
    if (val < minRank) val = minRank;
    if (val > maxRank) val = maxRank;
    
    effect.rank = val;
    const rankInput = document.getElementById(`effectRankInput_${pIdx}_${eIdx}`);
    if (rankInput) rankInput.value = val;
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordStepperChange(`effect_rank_${pIdx}_${eIdx}`);
    buildPowersUI(); 
    refreshUI();
  }
};

window.deletePowerContainer = function(index) {
  const container = char.activePowers[index];
  if (container) {
    const isDefault = window.isDefaultPowerContainer(container);
    let warningsDisabled = (localStorage.getItem("mm2e_disable_delete_warning") ?? localStorage.getItem("mm4e_disable_delete_warning")) === "true";
    if (!isDefault && !warningsDisabled) {
        if (!confirm("Are you sure you want to delete this entire power container and all its effects?")) {
            return;
        }
    }
    const deletedEffs = container.effects || [];
    const allPowerContainers = char.activePowers || char.powers || [];
    allPowerContainers.forEach(p => {
      if (p !== container) {
        (p.effects || []).forEach(oe => {
          if (oe.effectName === "Boost") {
            const tgt = (oe.options && oe.options.boostTarget) || oe.boostTarget;
            if (tgt === container.name || deletedEffs.some(de => de.id === tgt || de.name === tgt || de.effectName === tgt)) {
              oe.boostTarget = "";
              if (!oe.options) oe.options = {};
              oe.options.boostTarget = "";
            }
          }
        });
      }
    });
    char.activePowers.splice(index, 1);
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("delete_container");
    buildPowersUI();
    refreshUI();
  }
};

window.deleteEffect = function(pIdx, eIdx) {
    if (char.activePowers[pIdx] && char.activePowers[pIdx].effects) {
        window.invalidateContainerDeclaredCost(pIdx);
        const deletedEff = char.activePowers[pIdx].effects[eIdx];
        if (deletedEff) {
          const allPowerContainers = char.activePowers || char.powers || [];
          allPowerContainers.forEach(p => {
            (p.effects || []).forEach(oe => {
              if (oe.effectName === "Boost") {
                const tgt = (oe.options && oe.options.boostTarget) || oe.boostTarget;
                if (tgt === deletedEff.id || tgt === deletedEff.name || tgt === deletedEff.effectName) {
                  oe.boostTarget = "";
                  if (!oe.options) oe.options = {};
                  oe.options.boostTarget = "";
                }
              }
            });
          });
        }
        char.activePowers[pIdx].effects.splice(eIdx, 1);
        if (char.activePowers[pIdx].effects.length === 0) {
            char.activePowers.splice(pIdx, 1);
        } else if (char.activePowers[pIdx].effects.length === 1) {
            char.activePowers[pIdx].effects[0].association = "primary";
        }
        if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("delete_effect");
        buildPowersUI();
        refreshUI();
    }
};

window.addModifierToEffect = function(pIdx, eIdx, selectElemId, isBlueprint) {
  const sel = (typeof selectElemId === 'string') ? document.getElementById(selectElemId) : selectElemId;
  if (!sel || !sel.value) {
    if (sel) {
      sel.focus();
      sel.style.outline = "2px solid #ef4444";
      setTimeout(() => { if (sel) sel.style.outline = ""; }, 1500);
    }
    return;
  }

  const isBp = (isBlueprint !== undefined) 
    ? Boolean(isBlueprint) 
    : ((typeof selectElemId === 'string' && selectElemId.includes('bp_')) || (typeof window !== 'undefined' && window.activePowerContext === 'blueprints'));

  const targetList = isBp ? (char.blueprints || []) : (char.powers || []);
  if (!targetList[pIdx] || !targetList[pIdx].effects || !targetList[pIdx].effects[eIdx]) {
    console.error("Target effect not found:", isBp ? "blueprints" : "powers", pIdx, eIdx);
    return;
  }

  window.invalidateContainerDeclaredCost(pIdx);
  const modName = sel.value;
  const effect = targetList[pIdx].effects[eIdx];

  let effName = effect.effectName;
  let effData = (typeof POWER_EFFECTS_LIST !== 'undefined') ? POWER_EFFECTS_LIST.find(e => e.name === effName) : null;
  let modData = null;

  if (typeof POWER_MODIFIERS_LIST !== 'undefined') {
      modData = POWER_MODIFIERS_LIST.find(m => m.name === modName);
  }
  if (!modData && effData) {
      if (effData.uniqueModifiers) modData = effData.uniqueModifiers.find(m => m.name === modName);
      if (!modData && effData.specificExtras) modData = effData.specificExtras.find(m => m.name === modName);
      if (!modData && effData.specificFlaws) modData = effData.specificFlaws.find(m => m.name === modName);
      if (!modData && effData.specificFeats) modData = effData.specificFeats.find(m => m.name === modName);
  }
  if (!modData && typeof window.generateSmartModifiers === 'function') {
      let smartMods = window.generateSmartModifiers(effect);
      modData = smartMods.extras.find(m => m.name === modName) || smartMods.flaws.find(m => m.name === modName);
  }
  if (!modData) modData = { name: modName, cost: 1, costType: "flat", category: "extra" };

  if (!effect.modifiers) effect.modifiers = [];
  const elemIdStr = (typeof selectElemId === 'string') ? selectElemId : (sel.id || '');
  const chosenCategory = elemIdStr.includes("Extra") ? "extra" : (elemIdStr.includes("Flaw") ? "flaw" : "feat");
  effect.modifiers.push({
    name: modName,
    ranks: 1,
    cost: modData.cost !== undefined ? modData.cost : 1,
    costType: modData.costType || "flat",
    category: chosenCategory
  });
  sel.value = "";
  if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("add_modifier");
  if (typeof window !== 'undefined') {
    window.activePowerContext = isBp ? 'blueprints' : 'powers';
  }
  buildPowersUI();
  refreshUI();
};

window.stepModifierRank = function(pIdx, eIdx, modIdx, delta, minVal, maxVal, isBlueprint) {
  const isBp = (isBlueprint !== undefined) 
    ? Boolean(isBlueprint) 
    : (typeof window !== 'undefined' && window.activePowerContext === 'blueprints');
  const targetList = isBp ? (char.blueprints || []) : (char.powers || []);
  if (targetList[pIdx] && targetList[pIdx].effects && targetList[pIdx].effects[eIdx] && targetList[pIdx].effects[eIdx].modifiers && targetList[pIdx].effects[eIdx].modifiers[modIdx]) {
    window.invalidateContainerDeclaredCost(pIdx);
    let val = (parseInt(targetList[pIdx].effects[eIdx].modifiers[modIdx].ranks) || 1) + delta;
    if (minVal !== undefined && val < minVal) val = minVal;
    if (maxVal !== undefined && val > maxVal) val = maxVal;
    targetList[pIdx].effects[eIdx].modifiers[modIdx].ranks = val;
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordStepperChange(`mod_rank_${pIdx}_${eIdx}_${modIdx}`);
    if (typeof window !== 'undefined') {
      window.activePowerContext = isBp ? 'blueprints' : 'powers';
    }
    buildPowersUI();
    refreshUI();
  }
};

window.removeModifier = function(pIdx, eIdx, modIdx, isBlueprint) {
  const isBp = (isBlueprint !== undefined) 
    ? Boolean(isBlueprint) 
    : (typeof window !== 'undefined' && window.activePowerContext === 'blueprints');
  const targetList = isBp ? (char.blueprints || []) : (char.powers || []);
  if (targetList[pIdx] && targetList[pIdx].effects && targetList[pIdx].effects[eIdx] && targetList[pIdx].effects[eIdx].modifiers) {
    window.invalidateContainerDeclaredCost(pIdx);
    targetList[pIdx].effects[eIdx].modifiers.splice(modIdx, 1);
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("remove_modifier");
    if (typeof window !== 'undefined') {
      window.activePowerContext = isBp ? 'blueprints' : 'powers';
    }
    buildPowersUI();
    refreshUI();
  }
};

/* ==========================================================================
   CONTAINER POWERS (BATTLE FORM / ALTERNATE FORM / CONTAINER)
   ========================================================================== */

window.getLinkedEffectChain = function(startEffect) {
  const visited = new Set();
  if (!startEffect || !char) return visited;

  const queue = [startEffect];
  visited.add(startEffect);

  const allEffects = [];
  const effectToContainer = new Map();
  const powerList = char.activePowers || char.powers || [];
  powerList.forEach((c, pi) => {
    (c.effects || []).forEach((e, ei) => {
      allEffects.push({ effect: e, pIdx: pi, eIdx: ei, container: c });
      effectToContainer.set(e, { pIdx: pi, eIdx: ei, container: c });
    });
  });

  while (queue.length > 0) {
    const current = queue.shift();
    const currMeta = effectToContainer.get(current);
    if (!currMeta) continue;

    if (current.linkedTo === "previous" && currMeta.eIdx > 0) {
      const prevEff = currMeta.container.effects[currMeta.eIdx - 1];
      if (prevEff && !visited.has(prevEff)) {
        visited.add(prevEff);
        queue.push(prevEff);
      }
    } else if (current.linkedTo && current.linkedTo !== "previous") {
      const targetFound = allEffects.find(item => item.effect.id === current.linkedTo);
      if (targetFound && !visited.has(targetFound.effect)) {
        visited.add(targetFound.effect);
        queue.push(targetFound.effect);
      }
    }

    allEffects.forEach(item => {
      if (visited.has(item.effect)) return;
      if (item.effect.linkedTo === current.id) {
        visited.add(item.effect);
        queue.push(item.effect);
      } else if (item.container === currMeta.container && item.eIdx === currMeta.eIdx + 1 && item.effect.linkedTo === "previous") {
        visited.add(item.effect);
        queue.push(item.effect);
      }
    });
  }

  return visited;
};

window.togglePowerContainerActive = function(pIdx) {
  const powerList = char.activePowers || char.powers;
  if (!powerList || !powerList[pIdx]) return;
  const container = powerList[pIdx];

  const isCurrentlyActive = container.active !== false && (Array.isArray(container.effects) && container.effects.some(e => e.active !== false));
  const newActive = !isCurrentlyActive;
  container.active = newActive;

  if (Array.isArray(container.effects)) {
    if (!newActive) {
      // Switching off a power container turns off all its contained effects!
      container.effects.forEach(eff => {
        eff.active = false;
        if (eff.formActive !== undefined) eff.formActive = false;
        const chain = window.getLinkedEffectChain(eff);
        chain.forEach(oe => {
          oe.active = false;
          if (oe.formActive !== undefined) oe.formActive = false;
        });
      });
    } else {
      // Switching on a power container restores its active effects
      if (container.containerType === "array") {
        const hasDummyRoot = container.effects[0] && (container.effects[0].effectName === "Array" || container.effects[0].effectName === "Container");
        let targetIdx = container.effects.findIndex((e, i) => i > 0 && e.isDefaultPower);
        if (targetIdx === -1 && hasDummyRoot && container.effects.length > 1) targetIdx = 1;
        container.effects.forEach((eff, i) => {
          if (hasDummyRoot) {
            eff.active = (i === 0 || i === targetIdx);
          } else {
            eff.active = (eff.association !== "alternate");
          }
          if (eff.formActive !== undefined) eff.formActive = eff.active;
        });
      } else {
        container.effects.forEach(eff => {
          eff.active = (eff.association !== "alternate");
          if (eff.formActive !== undefined) eff.formActive = true;
        });
      }
    }
  }

  if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("toggle_power_container_active");
  buildPowersUI();
  refreshUI();
  if (typeof showToast === 'function') {
    showToast(newActive ? `${container.name || 'Container'} is now On.` : `${container.name || 'Container'} is now Off.`, "info");
  }
};

window.toggleEffectActive = function(pIdx, eIdx) {
  const powerList = char.activePowers || char.powers;
  if (!powerList || !powerList[pIdx] || !powerList[pIdx].effects || !powerList[pIdx].effects[eIdx]) return;
  const container = powerList[pIdx];
  const effect = container.effects[eIdx];
  const newActive = effect.active === false ? true : false;

  // Check if this effect represents the container root (dummy Array or Container effect)
  const isContainerRoot = (effect.effectName === "Array" || effect.effectName === "Container");

  if (isContainerRoot && !newActive) {
    // Switching off the container root turns off all its contained effects!
    container.active = false;
    container.effects.forEach(eff => {
      eff.active = false;
      if (eff.formActive !== undefined) eff.formActive = false;
      if (eff.effectName === "Boost") {
        if (!eff.options) eff.options = {};
        eff.options.boostActive = false;
        eff.boostActive = false;
      }
      const chain = window.getLinkedEffectChain(eff);
      chain.forEach(oe => {
        oe.active = false;
        if (oe.formActive !== undefined) oe.formActive = false;
        if (oe.effectName === "Boost") {
          if (!oe.options) oe.options = {};
          oe.options.boostActive = false;
          oe.boostActive = false;
        }
      });
    });
  } else if (isContainerRoot && newActive) {
    // Switching on the container root turns on the container and its default/primary active power
    container.active = true;
    effect.active = true;
    if (effect.effectName === "Boost") {
      if (!effect.options) effect.options = {};
      effect.options.boostActive = true;
      effect.boostActive = true;
    }
    if (container.containerType === "array") {
      let targetIdx = container.effects.findIndex((e, i) => i > 0 && e.isDefaultPower);
      if (targetIdx === -1 && container.effects.length > 1) targetIdx = 1;
      if (targetIdx > 0) {
        container.effects[targetIdx].active = true;
        if (container.effects[targetIdx].effectName === "Boost") {
          if (!container.effects[targetIdx].options) container.effects[targetIdx].options = {};
          container.effects[targetIdx].options.boostActive = true;
          container.effects[targetIdx].boostActive = true;
        }
      }
    } else {
      container.effects.forEach(eff => {
        eff.active = (eff.association !== "alternate");
        if (eff.formActive !== undefined) eff.formActive = true;
        if (eff.effectName === "Boost") {
          if (!eff.options) eff.options = {};
          eff.options.boostActive = eff.active;
          eff.boostActive = eff.active;
        }
      });
    }
  } else {
    // Standard effect toggle
    const chain = window.getLinkedEffectChain(effect);
    chain.forEach(eff => {
      eff.active = newActive;
      if (eff.formActive !== undefined) {
        eff.formActive = newActive;
      }
      if (eff.effectName === "Boost") {
        if (!eff.options) eff.options = {};
        eff.options.boostActive = newActive;
        eff.boostActive = newActive;
      }
    });

    if (newActive) {
      container.active = true;
      if (container.effects[0] && (container.effects[0].effectName === "Array" || container.effects[0].effectName === "Container")) {
        container.effects[0].active = true;
      }
    } else {
      // If all actual effects in container are now off, mark container inactive and turn off container root
      const anyActive = container.effects.some((e, i) => i !== eIdx && e.active && e.effectName !== "Array" && e.effectName !== "Container");
      if (!anyActive) {
        container.active = false;
        if (container.effects[0] && (container.effects[0].effectName === "Array" || container.effects[0].effectName === "Container")) {
          container.effects[0].active = false;
        }
      }
    }

    // Array mutual exclusion rule
    if (newActive && effect.association === 'alternate') {
      container.effects.forEach((otherEff, otherIdx) => {
        if (otherIdx !== eIdx && !chain.has(otherEff) && otherEff.effectName !== "Array") {
          if (otherEff.association === 'alternate' || otherEff.association === 'primary') {
            const otherChain = window.getLinkedEffectChain(otherEff);
            otherChain.forEach(oe => {
              oe.active = false;
              if (oe.formActive !== undefined) oe.formActive = false;
              if (oe.effectName === "Boost") {
                if (!oe.options) oe.options = {};
                oe.options.boostActive = false;
                oe.boostActive = false;
              }
            });
          }
        }
      });
    } else if (newActive && effect.association === 'primary' && effect.effectName !== "Array") {
      container.effects.forEach((otherEff, otherIdx) => {
        if (otherIdx !== eIdx && !chain.has(otherEff)) {
          if (otherEff.association === 'alternate') {
            const otherChain = window.getLinkedEffectChain(otherEff);
            otherChain.forEach(oe => {
              oe.active = false;
              if (oe.formActive !== undefined) oe.formActive = false;
            });
          }
        }
      });
    }
  }

  if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("toggle_effect_active");
  buildPowersUI();
  refreshUI();
  if (typeof showToast === 'function') {
    const name = effect.name || effect.effectName || "Effect";
    showToast(newActive ? `${name} is now On.` : `${name} is now Off.`, "info");
  }
};

window.updateEffectCustomName = function(pIdx, eIdx, val) {
  const powerList = char.activePowers || char.powers;
  if (!powerList || !powerList[pIdx] || !powerList[pIdx].effects || !powerList[pIdx].effects[eIdx]) return;
  const eff = powerList[pIdx].effects[eIdx];
  const trimmed = (val || "").trim();
  if (trimmed === "" || trimmed === eff.effectName) {
    eff.hasCustomName = false;
    eff.customName = "";
    eff.name = eff.effectName || "New Effect";
  } else {
    eff.hasCustomName = true;
    eff.customName = trimmed;
    eff.name = trimmed;
  }
};

window.toggleContainerFormActive = function(pIdx, eIdx) {
  window.toggleEffectActive(pIdx, eIdx);
};

window.addContainedPowerToEffect = function(pIdx, eIdx, selectElemId) {
  const sel = document.getElementById(selectElemId);
  if (!sel || !sel.value) return;
  const val = sel.value;
  if (!char.activePowers || !char.activePowers[pIdx] || !char.activePowers[pIdx].effects || !char.activePowers[pIdx].effects[eIdx]) return;
  window.invalidateContainerDeclaredCost(pIdx);
  const effect = char.activePowers[pIdx].effects[eIdx];
  if (!effect.containedPowers) effect.containedPowers = [];

  if (val.startsWith("trait_")) {
    const traitName = val.replace("trait_", "");
    let costPerRank = 1;
    if (traitName === "Attack" || traitName === "Defense") {
      costPerRank = 2;
    }
    effect.containedPowers.push({
      name: traitName,
      traitName: traitName,
      isTrait: true,
      rank: 1,
      costPerRank: costPerRank,
      cost: costPerRank
    });
  } else {
    let effData = (typeof POWER_EFFECTS_LIST !== 'undefined') ? POWER_EFFECTS_LIST.find(e => e.name === val) : null;
    let costPerRank = effData ? effData.baseCost : 1;
    effect.containedPowers.push({
      name: val,
      effectName: val,
      rank: 1,
      costPerRank: costPerRank,
      cost: costPerRank
    });
  }

  sel.value = "";
  if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("add_contained_power");
  buildPowersUI();
  refreshUI();
};

window.stepContainedPowerRank = function(pIdx, eIdx, cpIdx, delta) {
  if (char.activePowers && char.activePowers[pIdx] && char.activePowers[pIdx].effects && char.activePowers[pIdx].effects[eIdx]) {
    window.invalidateContainerDeclaredCost(pIdx);
    const effect = char.activePowers[pIdx].effects[eIdx];
    if (effect.containedPowers && effect.containedPowers[cpIdx]) {
      const cp = effect.containedPowers[cpIdx];
      let newRank = (parseInt(cp.rank) || 1) + delta;
      if (newRank < 1) newRank = 1;
      cp.rank = newRank;
      cp.cost = newRank * (cp.costPerRank || 1);
      if (window.PowerHistoryManager) window.PowerHistoryManager.recordStepperChange(`contained_${pIdx}_${eIdx}_${cpIdx}`);
      buildPowersUI();
      refreshUI();
    }
  }
};

window.removeContainedPower = function(pIdx, eIdx, cpIdx) {
  if (char.activePowers && char.activePowers[pIdx] && char.activePowers[pIdx].effects && char.activePowers[pIdx].effects[eIdx]) {
    window.invalidateContainerDeclaredCost(pIdx);
    const effect = char.activePowers[pIdx].effects[eIdx];
    if (effect.containedPowers && effect.containedPowers[cpIdx]) {
      effect.containedPowers.splice(cpIdx, 1);
      if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("remove_contained_power");
      buildPowersUI();
      refreshUI();
    }
  }
};

function buildAllReferenceTables() {
  const aBody = document.querySelector("#actionsViewTable tbody");
  if (aBody && typeof ACTIONS_TABLE !== 'undefined') {
    let aHtml = "";
    for (const act of ACTIONS_TABLE) {
      aHtml += `
        <tr>
          <td><strong>${act.name}</strong></td>
          <td>${act.type}</td>
          <td>${act.check}</td>
          <td class="secondary-text">${act.effect}</td>
        </tr>
      `;
    }
    aBody.innerHTML = aHtml;
  }

  const plBody = document.querySelector("#plLimitsViewTable tbody");
  if (plBody && typeof PL_LIMITS !== 'undefined') {
    let plHtml = "";
    for (const [pl, limits] of Object.entries(PL_LIMITS)) {
      plHtml += `
        <tr>
          <td><strong>PL ${pl}</strong></td>
          <td>${limits.maxSkill}</td>
          <td>${limits.maxAttackEffect}</td>
          <td>${limits.maxDefTough}</td>
          <td>${limits.maxFortWill}</td>
          <td>${limits.maxHeroicAdv}</td>
        </tr>
      `;
    }
    plBody.innerHTML = plHtml;
  }

  const mBody = document.querySelector("#measurementsViewTable tbody");
  if (mBody && typeof MEASUREMENT_TABLE !== 'undefined') {
    let mHtml = "";
    for (let i = 1; i <= 30; i++) {
      const data = MEASUREMENT_TABLE[i.toString()];
      if (data) {
        mHtml += `
          <tr>
            <td style="padding: 4px; border-top: 1px solid var(--border-color);">${i}</td>
            <td style="padding: 4px; border-top: 1px solid var(--border-color);">${data.time}</td>
            <td style="padding: 4px; border-top: 1px solid var(--border-color);">${data.dist_imp}</td>
            <td style="padding: 4px; border-top: 1px solid var(--border-color);">${data.ext_range}</td>
          </tr>
        `;
      }
    }
    mBody.innerHTML = mHtml;
  }

  const ccBody = document.querySelector("#carryingCapacityViewTable tbody");
  if (ccBody && typeof CharacterModel !== 'undefined') {
    let ccHtml = "";
    for (let str = 1; str <= 30; str++) {
      const heavyLbs = CharacterModel.getProgressionValue(str) * 5;
      const heavyStr = CharacterModel.formatWeight(heavyLbs);
      const lightStr = CharacterModel.formatWeight(heavyLbs / 3);
      const medStr = CharacterModel.formatWeight((heavyLbs * 2) / 3);
      const maxStr = CharacterModel.formatWeight(heavyLbs * 2);
      const pushStr = CharacterModel.formatWeight(heavyLbs * 5);
      
      ccHtml += `
        <tr>
          <td style="padding: 4px; border-top: 1px solid var(--border-color);">${str}</td>
          <td style="padding: 4px; border-top: 1px solid var(--border-color);">${lightStr}</td>
          <td style="padding: 4px; border-top: 1px solid var(--border-color);">${medStr}</td>
          <td style="padding: 4px; border-top: 1px solid var(--border-color);"><strong>${heavyStr}</strong></td>
          <td style="padding: 4px; border-top: 1px solid var(--border-color);">${maxStr}</td>
          <td style="padding: 4px; border-top: 1px solid var(--border-color);">${pushStr}</td>
        </tr>
      `;
    }
    ccBody.innerHTML = ccHtml;
  }
}
// --- MODIFIER INJECTOR ---
if (typeof POWER_EFFECTS_LIST !== 'undefined') {
    if (typeof EXTRACTED_MODIFIERS !== 'undefined') {
        if (EXTRACTED_MODIFIERS["Create"] && !EXTRACTED_MODIFIERS["Create"].extras.some(e => e.name === "Self-Repairing")) {
            EXTRACTED_MODIFIERS["Create"].extras.push({name: "Self-Repairing", cost: 1, costType: "per_rank"});
            EXTRACTED_MODIFIERS["Create"].extras.push({name: "Variable Opacity", cost: 1, costType: "flat"});
        }
        if (EXTRACTED_MODIFIERS["Deflect"] && !EXTRACTED_MODIFIERS["Deflect"].extras.some(e => e.name === "Reflect")) {
            EXTRACTED_MODIFIERS["Deflect"].extras.push({name: "Reflect", cost: 1, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Environment"] && !EXTRACTED_MODIFIERS["Environment"].extras.some(e => e.name === "Shape")) {
            EXTRACTED_MODIFIERS["Environment"].extras.push({name: "Shape", cost: 0, costType: "flat"});
        }
        if (EXTRACTED_MODIFIERS["Extra Limbs"] && !EXTRACTED_MODIFIERS["Extra Limbs"].extras.some(e => e.name === "Projection")) {
            EXTRACTED_MODIFIERS["Extra Limbs"].extras.push({name: "Projection", cost: 1, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Flight"] && !EXTRACTED_MODIFIERS["Flight"].extras.some(e => e.name === "Safe Landing")) {
            EXTRACTED_MODIFIERS["Flight"].extras.push({name: "Safe Landing", cost: 1, costType: "flat"});
        }
        if (EXTRACTED_MODIFIERS["Healing"] && !EXTRACTED_MODIFIERS["Healing"].extras.some(e => e.name === "Energizing")) {
            EXTRACTED_MODIFIERS["Healing"].extras.push({name: "Energizing", cost: 1, costType: "per_rank"});
            EXTRACTED_MODIFIERS["Healing"].extras.push({name: "Persistent", cost: 1, costType: "flat"});
            EXTRACTED_MODIFIERS["Healing"].extras.push({name: "Resurrection", cost: 1, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Immunity"] && !EXTRACTED_MODIFIERS["Immunity"].extras.some(e => e.name.includes("Redirect"))) {
            EXTRACTED_MODIFIERS["Immunity"].extras.push({name: "Redirect (Reaction)", cost: 1, costType: "flat"});
            EXTRACTED_MODIFIERS["Immunity"].extras.push({name: "Redirect (Sustained)", cost: 1, costType: "per_rank"});
            EXTRACTED_MODIFIERS["Immunity"].extras.push({name: "Redirect (Continuous)", cost: 2, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Insubstantial"] && !EXTRACTED_MODIFIERS["Insubstantial"].extras.some(e => e.name === "Affects Corporeal")) {
            EXTRACTED_MODIFIERS["Insubstantial"].extras.push({name: "Affects Corporeal", cost: 1, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Move Object"] && !EXTRACTED_MODIFIERS["Move Object"].extras.some(e => e.name === "Damaging")) {
            EXTRACTED_MODIFIERS["Move Object"].extras.push({name: "Damaging", cost: 1, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Nullify"] && !EXTRACTED_MODIFIERS["Nullify"].extras.some(e => e.name === "Alternate Resistance")) {
            EXTRACTED_MODIFIERS["Nullify"].extras.push({name: "Alternate Resistance", cost: 0, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Remote Sensing"] && !EXTRACTED_MODIFIERS["Remote Sensing"].extras.some(e => e.name === "Protected")) {
            EXTRACTED_MODIFIERS["Remote Sensing"].extras.push({name: "Protected", cost: 1, costType: "per_rank"});
            EXTRACTED_MODIFIERS["Remote Sensing"].extras.push({name: "Targeting", cost: 1, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Shrinking"]) {
            if (!EXTRACTED_MODIFIERS["Shrinking"].feats) EXTRACTED_MODIFIERS["Shrinking"].feats = [];
            if (!EXTRACTED_MODIFIERS["Shrinking"].feats.some(e => e.name === "Atomic")) {
                EXTRACTED_MODIFIERS["Shrinking"].feats.push({name: "Atomic", cost: 1, costType: "flat"});
                EXTRACTED_MODIFIERS["Shrinking"].feats.push({name: "Microscopic", cost: 1, costType: "flat"});
                EXTRACTED_MODIFIERS["Shrinking"].extras.push({name: "Normal Speed", cost: 1, costType: "per_rank"});
            }
        }
        if (EXTRACTED_MODIFIERS["Summon"]) {
            if (!EXTRACTED_MODIFIERS["Summon"].feats) EXTRACTED_MODIFIERS["Summon"].feats = [];
            if (!EXTRACTED_MODIFIERS["Summon"].feats.some(e => e.name === "Memory Merge")) {
                EXTRACTED_MODIFIERS["Summon"].feats.push({name: "Memory Merge", cost: 1, costType: "flat"});
                EXTRACTED_MODIFIERS["Summon"].feats.push({name: "Sacrifice", cost: 1, costType: "flat"});
            }
        }
        if (EXTRACTED_MODIFIERS["Teleport"]) {
            if (!EXTRACTED_MODIFIERS["Teleport"].feats) EXTRACTED_MODIFIERS["Teleport"].feats = [];
            if (!EXTRACTED_MODIFIERS["Teleport"].feats.some(e => e.name === "Change Direction")) {
                EXTRACTED_MODIFIERS["Teleport"].feats.push({name: "Change Direction", cost: 1, costType: "flat"});
                EXTRACTED_MODIFIERS["Teleport"].feats.push({name: "Change Velocity", cost: 1, costType: "flat"});
                EXTRACTED_MODIFIERS["Teleport"].feats.push({name: "Easy", cost: 1, costType: "flat"});
                EXTRACTED_MODIFIERS["Teleport"].feats.push({name: "Known Location", cost: 1, costType: "flat"});
                EXTRACTED_MODIFIERS["Teleport"].feats.push({name: "Turnabout", cost: 1, costType: "flat"});
            }
        }
        if (EXTRACTED_MODIFIERS["Affliction"]) {
            EXTRACTED_MODIFIERS["Affliction"].extras = EXTRACTED_MODIFIERS["Affliction"].extras.filter(e => !e.name.includes("Variable Conditions"));
            EXTRACTED_MODIFIERS["Affliction"].extras.push({name: "Variable Conditions (1st Degree)", cost: 1, costType: "per_rank"});
            EXTRACTED_MODIFIERS["Affliction"].extras.push({name: "Variable Conditions (2nd Degree)", cost: 1, costType: "per_rank"});
            EXTRACTED_MODIFIERS["Affliction"].extras.push({name: "Variable Conditions (3rd Degree)", cost: 1, costType: "per_rank"});
            EXTRACTED_MODIFIERS["Affliction"].extras.push({name: "Variable Conditions (All Degrees)", cost: 2, costType: "per_rank"});
        }
    }
}

function setupEquipmentHandlers() {
  const btnGear = document.getElementById("btnAddGear");
  const btnVeh = document.getElementById("btnAddVehicle");
  const btnHQ = document.getElementById("btnAddHQ");
  
  if (btnGear) {
      btnGear.addEventListener("click", () => {
        char.gear = char.gear || [];
        char.gear.push({ name: "New Gear", cost: 1, type: "General", description: "" });
        buildEquipmentUI();
      });
  }
  
  if (btnVeh) {
      btnVeh.addEventListener("click", () => {
        char.vehicles = char.vehicles || [];
        char.vehicles.push({ name: "New Vehicle", cost: 10, size: 0, strength: 2, speed: 5, defense: 0, toughness: 5, category: "Ground" });
        buildEquipmentUI();
      });
  }
  
  if (btnHQ) {
      btnHQ.addEventListener("click", () => {
        char.installations = char.installations || [];
        char.installations.push({ name: "New HQ", size: 5, toughness: 6, cost: 0, features: "" });
        buildEquipmentUI();
      });
  }
}
window.setupEquipmentHandlers = setupEquipmentHandlers;

window.stepEquipVal = function(type, idx, key, delta, minVal) {
    let arr = type === 'gear' ? char.gear : (type === 'vehicle' ? char.vehicles : char.installations);
    if (!arr || !arr[idx]) return;
    let val = (parseInt(arr[idx][key]) || 0) + delta;
    if (minVal !== undefined && val < minVal) val = minVal;
    arr[idx][key] = val;
    buildEquipmentUI();
};

window.addHQFeature = function(idx, selectId) {
    const sel = document.getElementById(selectId);
    if (!sel || !sel.value) return;
    const featureName = sel.value;
    let hq = char.installations[idx];
    if (hq.features) {
        hq.features += (hq.features.trim().endsWith(",") ? " " : ", ") + featureName;
    } else {
        hq.features = featureName;
    }
    hq.cost = (parseInt(hq.cost) || 0) + 1;
    sel.selectedIndex = 0;
    buildEquipmentUI();
};

function buildEquipmentUI() {
    char.gear = char.gear || [];
    char.vehicles = char.vehicles || [];
    char.installations = char.installations || [];
    
    const equipAdvRanks = char.feats["Equipment"] || 0;
    const totalEP = equipAdvRanks * 5;
    
    let spentEP = 0;
    char.gear.forEach(g => spentEP += (parseInt(g.cost) || 0));
    char.vehicles.forEach(v => spentEP += (parseInt(v.cost) || 0));
    char.installations.forEach(h => spentEP += (parseInt(h.cost) || 0));
    
    const epBadge = document.getElementById("lblAvailableEP");
    if (epBadge) {
        epBadge.textContent = `${spentEP} / ${totalEP}`;
        epBadge.style.color = spentEP > totalEP ? "#ef4444" : "var(--text-main)";
    }

    const gearCont = document.getElementById("gearContainer");
    if (gearCont) {
        if (char.gear.length === 0) {
            gearCont.innerHTML = `<p class="secondary-text">No gear added.</p>`;
        } else {
            gearCont.innerHTML = char.gear.map((g, idx) => `
                <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; padding: 6px; border: 1px dashed var(--border-color); border-radius: 4px;">
                    <select class="minor-control" style="width: 180px;" onchange="applyEquipmentTemplate('gear', ${idx}, this.value)">
                        <option value="">- Select Template -</option>
                        <optgroup label="General Gear">${typeof EQUIPMENT_GEAR_LIST !== 'undefined' ? EQUIPMENT_GEAR_LIST.map(item => `<option value="${item.name}">${item.name}</option>`).join('') : ''}</optgroup>
                        <optgroup label="Weapons">${typeof EQUIPMENT_WEAPONS_LIST !== 'undefined' ? EQUIPMENT_WEAPONS_LIST.map(item => `<option value="${item.name}">${item.name}</option>`).join('') : ''}</optgroup>
                        <optgroup label="Grenades & Explosives">${typeof EQUIPMENT_GRENADES_LIST !== 'undefined' ? EQUIPMENT_GRENADES_LIST.map(item => `<option value="${item.name}">${item.name}</option>`).join('') : ''}</optgroup>
                        <optgroup label="Armor & Shields">${typeof EQUIPMENT_ARMOR_LIST !== 'undefined' ? EQUIPMENT_ARMOR_LIST.map(item => `<option value="${item.name}">${item.name}</option>`).join('') : ''}</optgroup>
                    </select>
                    <input type="text" class="minor-control" style="flex: 1; min-width: 150px;" value="${g.name}" placeholder="Item Name" oninput="updateEquipData('gear', ${idx}, 'name', this.value)">
                    <div style="display: flex; align-items: center; gap: 4px;">
                        <label style="font-size: var(--font-size-secondary); font-weight: 600;">Cost:</label>
                        <div class="stepper-group" style="height: 24px; min-width: 80px;">
                            <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('gear', ${idx}, 'cost', -1, 0)">−</button>
                            <input type="number" class="stepper-input" value="${g.cost}" onchange="updateEquipData('gear', ${idx}, 'cost', parseInt(this.value)||0)">
                            <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('gear', ${idx}, 'cost', 1)">+</button>
                        </div>
                    </div>
                    <input type="text" class="minor-control" style="flex: 2; min-width: 200px;" value="${g.description || g.effect || ''}" placeholder="Description / Effect" oninput="updateEquipData('gear', ${idx}, 'description', this.value)">
                    <button type="button" class="btn-delete-power" onclick="deleteEquipment('gear', ${idx})">✕</button>
                </div>
            `).join("");
        }
    }
    
    const vehCont = document.getElementById("vehiclesContainer");
    if (vehCont) {
        if (char.vehicles.length === 0) {
            vehCont.innerHTML = `<p class="secondary-text">No vehicles added.</p>`;
        } else {
            vehCont.innerHTML = char.vehicles.map((v, idx) => `
                <div style="display: flex; flex-direction: column; gap: 8px; padding: 8px; border: 1px dashed var(--border-color); margin-bottom: 8px; border-radius: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <select class="minor-control" style="width: 180px;" onchange="applyEquipmentTemplate('vehicle', ${idx}, this.value)">
                            <option value="">- Select Template -</option>
                            ${typeof VEHICLES_LIST !== 'undefined' ? VEHICLES_LIST.map(item => `<option value="${item.name}">${item.name}</option>`).join('') : ''}
                        </select>
                        <input type="text" class="minor-control" style="flex: 1; min-width: 150px;" value="${v.name}" placeholder="Vehicle Name" oninput="updateEquipData('vehicle', ${idx}, 'name', this.value)">
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <label style="font-size: var(--font-size-secondary); font-weight: 600;">Cost:</label>
                            <div class="stepper-group" style="height: 24px; min-width: 80px;">
                                <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('vehicle', ${idx}, 'cost', -1, 0)">−</button>
                                <input type="number" class="stepper-input" value="${v.cost}" onchange="updateEquipData('vehicle', ${idx}, 'cost', parseInt(this.value)||0)">
                                <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('vehicle', ${idx}, 'cost', 1)">+</button>
                            </div>
                        </div>
                        <button type="button" class="btn-delete-power" onclick="deleteEquipment('vehicle', ${idx})">✕</button>
                    </div>
                    <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap; font-size: var(--font-size-secondary); color: var(--text-muted);">
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span style="font-weight: 600;">Size:</span>
                            <div class="stepper-group" style="height: 24px; min-width: 70px;">
                                <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('vehicle', ${idx}, 'size', -1)">−</button>
                                <input type="number" class="stepper-input" value="${v.size}" onchange="updateEquipData('vehicle', ${idx}, 'size', parseInt(this.value)||0)">
                                <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('vehicle', ${idx}, 'size', 1)">+</button>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span style="font-weight: 600;">STR:</span>
                            <div class="stepper-group" style="height: 24px; min-width: 70px;">
                                <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('vehicle', ${idx}, 'strength', -1)">−</button>
                                <input type="number" class="stepper-input" value="${v.strength}" onchange="updateEquipData('vehicle', ${idx}, 'strength', parseInt(this.value)||0)">
                                <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('vehicle', ${idx}, 'strength', 1)">+</button>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span style="font-weight: 600;">Speed:</span>
                            <input type="text" class="minor-control" style="width: 80px; padding: 2px 4px;" value="${v.speed}" oninput="updateEquipData('vehicle', ${idx}, 'speed', this.value)">
                        </div>
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span style="font-weight: 600;">DEF:</span>
                            <div class="stepper-group" style="height: 24px; min-width: 70px;">
                                <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('vehicle', ${idx}, 'defense', -1)">−</button>
                                <input type="number" class="stepper-input" value="${v.defense}" onchange="updateEquipData('vehicle', ${idx}, 'defense', parseInt(this.value)||0)">
                                <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('vehicle', ${idx}, 'defense', 1)">+</button>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span style="font-weight: 600;">Tough:</span>
                            <div class="stepper-group" style="height: 24px; min-width: 70px;">
                                <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('vehicle', ${idx}, 'toughness', -1)">−</button>
                                <input type="number" class="stepper-input" value="${v.toughness}" onchange="updateEquipData('vehicle', ${idx}, 'toughness', parseInt(this.value)||0)">
                                <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('vehicle', ${idx}, 'toughness', 1)">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join("");
        }
    }
    
    const hqCont = document.getElementById("hqContainer");
    if (hqCont) {
        if (char.installations.length === 0) {
            hqCont.innerHTML = `<p class="secondary-text">No headquarters added.</p>`;
        } else {
            hqCont.innerHTML = char.installations.map((hq, idx) => `
                <div style="display: flex; flex-direction: column; gap: 8px; padding: 8px; border: 1px dashed var(--border-color); margin-bottom: 8px; border-radius: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <select class="minor-control" style="width: 180px;" onchange="applyEquipmentTemplate('hq', ${idx}, this.value)">
                            <option value="">- Select Template -</option>
                            ${typeof STOCK_INSTALLATIONS !== 'undefined' ? STOCK_INSTALLATIONS.map(item => `<option value="${item.name}">${item.name}</option>`).join('') : ''}
                        </select>
                        <input type="text" class="minor-control" style="flex: 1; min-width: 150px;" value="${hq.name}" placeholder="HQ Name" oninput="updateEquipData('hq', ${idx}, 'name', this.value)">
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <label style="font-size: var(--font-size-secondary); font-weight: 600;">Cost:</label>
                            <div class="stepper-group" style="height: 24px; min-width: 80px;">
                                <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('hq', ${idx}, 'cost', -1, 0)">−</button>
                                <input type="number" class="stepper-input" value="${hq.cost}" onchange="updateEquipData('hq', ${idx}, 'cost', parseInt(this.value)||0)">
                                <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('hq', ${idx}, 'cost', 1)">+</button>
                            </div>
                        </div>
                        <button type="button" class="btn-delete-power" onclick="deleteEquipment('hq', ${idx})">✕</button>
                    </div>
                    <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap; font-size: var(--font-size-secondary); color: var(--text-muted);">
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span style="font-weight: 600;">Size:</span>
                            <div class="stepper-group" style="height: 24px; min-width: 70px;">
                                <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('hq', ${idx}, 'size', -1)">−</button>
                                <input type="number" class="stepper-input" value="${hq.size}" onchange="updateEquipData('hq', ${idx}, 'size', parseInt(this.value)||0)">
                                <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('hq', ${idx}, 'size', 1)">+</button>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span style="font-weight: 600;">Tough:</span>
                            <div class="stepper-group" style="height: 24px; min-width: 70px;">
                                <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('hq', ${idx}, 'toughness', -1)">−</button>
                                <input type="number" class="stepper-input" value="${hq.toughness}" onchange="updateEquipData('hq', ${idx}, 'toughness', parseInt(this.value)||0)">
                                <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('hq', ${idx}, 'toughness', 1)">+</button>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <select id="selHQFeature_${idx}" class="minor-control" style="width: 180px;">
                            <option value="">+ Add Feature...</option>
                            ${typeof INSTALLATION_FEATURES !== 'undefined' ? INSTALLATION_FEATURES.map(f => `<option value="${f}">${f}</option>`).join('') : ''}
                        </select>
                        <button type="button" class="btn minor-control-btn" style="padding: 2px 6px;" onclick="addHQFeature(${idx}, 'selHQFeature_${idx}')">+ Add Feature</button>
                        <input type="text" class="minor-control" style="flex: 1; min-width: 200px;" value="${hq.features || ''}" placeholder="Features list..." oninput="updateEquipData('hq', ${idx}, 'features', this.value)">
                    </div>
                </div>
            `).join("");
        }
    }
}
window.buildEquipmentUI = buildEquipmentUI;

window.updateEquipData = function(type, idx, key, val) {
    if (type === 'gear') char.gear[idx][key] = val;
    else if (type === 'vehicle') char.vehicles[idx][key] = val;
    else if (type === 'hq') char.installations[idx][key] = val;
    buildEquipmentUI();
};

window.deleteEquipment = function(type, idx) {
    if (type === 'gear') char.gear.splice(idx, 1);
    else if (type === 'vehicle') char.vehicles.splice(idx, 1);
    else if (type === 'hq') char.installations.splice(idx, 1);
    buildEquipmentUI();
};

window.applyEquipmentTemplate = function(type, idx, templateName) {
    if (!templateName) return;
    
    if (type === 'gear') {
        const item = [...EQUIPMENT_GEAR_LIST, ...EQUIPMENT_WEAPONS_LIST, ...EQUIPMENT_GRENADES_LIST, ...EQUIPMENT_ARMOR_LIST].find(i => i.name === templateName);
        if (item) {
            char.gear[idx] = { ...item };
            char.gear[idx].description = item.description || item.effect;
        }
    } else if (type === 'vehicle') {
        const item = VEHICLES_LIST.find(i => i.name === templateName);
        if (item) {
            char.vehicles[idx] = { ...item };
        }
    } else if (type === 'hq') {
        const item = STOCK_INSTALLATIONS.find(i => i.name === templateName);
        if (item) {
            char.installations[idx] = { ...item };
        }
    }
    buildEquipmentUI();
};

function getGenericCompanionNameByType(type, idx = 1) {
  const t = (type || "").toLowerCase().replace(/[-\s]/g, "_");
  switch (t) {
    case "metamorph":
    case "alternate_form":
    case "alt_form":
    case "form":
      return `Alternate form #${idx}`;
    case "mecha":
      return `Mecha form #${idx}`;
    case "sidekick":
      return `Sidekick #${idx}`;
    case "minion":
      return `Minion #${idx}`;
    case "summon":
      return `Summoned creature #${idx}`;
    case "duplicate":
      return `Duplicate #${idx}`;
    case "vehicle":
      return `Vehicle #${idx}`;
    case "headquarters":
    case "base":
      return `Headquarters #${idx}`;
    case "equipment":
    case "device":
      return `Equipment #${idx}`;
    default:
      return `Companion #${idx}`;
  }
}
window.getGenericCompanionNameByType = getGenericCompanionNameByType;

function getGenericCompanionName(comp, rootHero) {
  if (!comp) return "Companion #1";
  const type = comp.type || "sidekick";
  const heroRoot = rootHero || window.primaryHero || char;
  const companions = heroRoot?.companions || [];
  const compsOfType = companions.filter(c => c.type === type);
  const idx = (compsOfType.indexOf(comp) + 1) || 1;
  return getGenericCompanionNameByType(type, idx);
}
window.getGenericCompanionName = getGenericCompanionName;

function populateUIFromCharacter() {
  if (document.getElementById("heroNameInput")) {
    const isComp = !!window.activeCompanionId && !!window.primaryHero;
    const nameEl = document.getElementById("heroNameInput");
    if (isComp) {
      const comp = (window.primaryHero.companions || []).find(c => c.id === window.activeCompanionId);
      const placeholderText = comp ? getGenericCompanionName(comp, window.primaryHero) : "Companion / Form Name";
      nameEl.placeholder = placeholderText;
      nameEl.value = (char.name && char.name !== placeholderText) ? char.name : "";
    } else {
      nameEl.placeholder = "New Hero";
      nameEl.value = (char.name && char.name !== "New Hero") ? char.name : "";
    }
  }
  if (document.getElementById("playerNameInput")) {
    document.getElementById("playerNameInput").value = char.playerName || "";
    const sessionNameInput = document.getElementById("txtSessionPlayerName");
    if (sessionNameInput && char.playerName && !sessionNameInput.value) {
      sessionNameInput.value = char.playerName;
    }
    if (char.playerName && char.playerName.trim() && char.playerName.trim() !== 'GM') {
      if (typeof CampaignManager !== 'undefined') {
        CampaignManager.setUserAccount(char.playerName.trim());
        const isGM = CampaignManager.isDesignatedGM('local_player');
        const currGM = CampaignManager.getGMUserName();
        if (isGM || !currGM || currGM === 'GM') {
          CampaignManager.setGMUserName(char.playerName.trim());
        }
      }
    }
  }
  if (document.getElementById("heroPLInput")) document.getElementById("heroPLInput").value = char.powerLevel || 10;
  if (document.getElementById("heroPointsInput")) {
    const defaultHP = 1 + (char.effectiveFeats?.["Luck"] || char.feats?.["Luck"] || 0);
    if (typeof char.heroPoints !== "number" || isNaN(char.heroPoints)) {
      char.heroPoints = defaultHP;
    }
    document.getElementById("heroPointsInput").value = char.heroPoints;
    if (typeof window.updateHeroPointsLockUI === "function") window.updateHeroPointsLockUI();
  }
  if (document.getElementById("heroSizeInput")) document.getElementById("heroSizeInput").value = char.sizeCategory || "Medium";
  if (document.getElementById("heroMassInput")) document.getElementById("heroMassInput").value = char.massRank !== undefined ? char.massRank : 3;
  if (document.getElementById("inputATK")) document.getElementById("inputATK").value = char.combat ? (char.combat.ATK || 0) : 0;
  if (document.getElementById("inputDEF")) document.getElementById("inputDEF").value = char.combat ? (char.combat.DEF || 0) : 0;
  if (document.getElementById("inputReflex")) document.getElementById("inputReflex").value = char.purchasedResistances ? (char.purchasedResistances.Reflex || 0) : 0;
  if (document.getElementById("inputFort")) document.getElementById("inputFort").value = char.purchasedResistances ? (char.purchasedResistances.Fortitude || 0) : 0;
  if (document.getElementById("inputWill")) document.getElementById("inputWill").value = char.purchasedResistances ? (char.purchasedResistances.Will || 0) : 0;

  if (char.abilities) {
    for (const [k, v] of Object.entries(char.abilities)) {
      const el = document.getElementById(`input_${k}`);
      if (el) el.value = (typeof char.getBaseAbilityScore === "function") ? (char.getBaseAbilityScore(k) ?? v) : v;
    }
  }
  if (char.absentAbilities) {
    for (const [k, v] of Object.entries(char.absentAbilities)) {
      const chk = document.getElementById(`enable_${k}`);
      const input = document.getElementById(`input_${k}`);
      const dec = document.getElementById(`dec_${k}`);
      const inc = document.getElementById(`inc_${k}`);
      const rollBtn = document.getElementById(`btnRollAbil_${k}`);
      if (chk) chk.checked = !v;
      if (input) input.disabled = v;
      if (dec) dec.disabled = v;
      if (inc) inc.disabled = v;
      if (rollBtn) rollBtn.disabled = v;
    }
  }

  const chkMechaAI = document.getElementById("chkMechaHasAI");
  if (chkMechaAI) chkMechaAI.checked = !!char.hasAI;

  if (document.getElementById("bgIdentity")) document.getElementById("bgIdentity").value = char.identity || "";
  if (document.getElementById("bgTitles")) document.getElementById("bgTitles").value = char.titles || "";
  if (document.getElementById("bgSex")) document.getElementById("bgSex").value = char.sex || "";
  if (document.getElementById("bgAppearance")) document.getElementById("bgAppearance").value = char.appearance || "";
  if (document.getElementById("bgMotivation")) document.getElementById("bgMotivation").value = char.motivation || "";
  if (document.getElementById("bgComplications")) document.getElementById("bgComplications").value = char.complications || "";
  if (document.getElementById("bgHistory")) document.getElementById("bgHistory").value = char.history || "";

  if (document.getElementById("toggleEnhancedTraitBoost")) {
    document.getElementById("toggleEnhancedTraitBoost").checked = (char.houseRules && char.houseRules.enhancedTraitBoostsEffects) || (localStorage.getItem("mm2e_houserule_enhanced_trait_boost") === "true");
  }
  if (document.getElementById("toggleAltFormVariablePL")) {
    document.getElementById("toggleAltFormVariablePL").checked = (char.houseRules && char.houseRules.allowAltFormVariablePL) || (localStorage.getItem("mm2e_houserule_alt_form_variable_pl") === "true");
  }
  if (document.getElementById("toggleBoostAltersRanks")) {
    const isBoostAlters = (char.houseRules && char.houseRules.boostAltersRanks) || (localStorage.getItem("mm2e_houserule_boost_alters_ranks") === "true");
    document.getElementById("toggleBoostAltersRanks").checked = isBoostAlters;
    if (!char.houseRules) char.houseRules = {};
    if (isBoostAlters) char.houseRules.boostAltersRanks = true;
  }
  if (document.getElementById("toggleEnableLegacyCoreModifiers")) {
    document.getElementById("toggleEnableLegacyCoreModifiers").checked = (char.houseRules && char.houseRules.enableLegacyCoreModifiers) || (localStorage.getItem("mm2e_houserule_enable_legacy_modifiers") === "true");
  }
  if (document.getElementById("toggleDisablePerceptionRange")) {
    document.getElementById("toggleDisablePerceptionRange").checked = (char.houseRules && char.houseRules.disablePerceptionRange) || (localStorage.getItem("mm2e_houserule_disable_perception_range") === "true");
  }

  buildSkillsUI();
  buildAdvantagesUI();
  buildPowersUI();
  buildEquipmentUI();
  refreshUI();
  if (typeof window.updateTrackerConditionsSummary === 'function') {
    window.updateTrackerConditionsSummary();
  }
  if (typeof syncGMRosterUI === 'function') {
    syncGMRosterUI();
  }
}

function applyLoadedCharacter(loaded, options = {}) {
  if (!loaded) return;
  window.isCharacterLoading = true;

  const isNpcLoad = !!(options && options.isNpcLoad);
  const preserveTab = !!(options && options.preserveTab);

  // Cleanly exit any companion editing mode
  if (window.primaryHero) {
    char = window.primaryHero;
    window.char = char;
    window.primaryHero = null;
    window.activeCompanionId = null;
  }
  if (!isNpcLoad) {
    window.activeEditorNpcId = null;
    window.__gmPrimaryHeroSheet = null;
    if (typeof window.updateGMEditorStateUI === 'function') {
      window.updateGMEditorStateUI();
    }
  }

  char.deserialize(loaded);
  window.activePowerContext = 'powers';

  // Switch to basics tab so the user begins on the loaded hero's main sheet unless preserveTab is set
  if (!preserveTab) {
    const basicsTabBtn = (typeof document !== 'undefined' && typeof document.querySelector === 'function')
      ? document.querySelector('.tab-btn[data-tab="tab-basics"]')
      : null;
    if (basicsTabBtn && typeof basicsTabBtn.click === 'function') {
      basicsTabBtn.click();
    }
  }

  populateUIFromCharacter();
  window.isCharacterLoading = false;
  if (typeof window.FileManager !== 'undefined' && window.FileManager.clearDirty) {
    window.FileManager.clearDirty();
  }
}

function refreshUI() {
  if (typeof char !== 'undefined' && char) {
    if (typeof char.heroPoints !== "number" || isNaN(char.heroPoints)) {
      const defaultHP = 1 + (char.effectiveFeats?.["Luck"] || char.feats?.["Luck"] || 0);
      const hpInput = document.getElementById("heroPointsInput");
      const rawVal = hpInput ? parseInt(hpInput.value) : NaN;
      char.heroPoints = !isNaN(rawVal) ? Math.max(0, rawVal) : defaultHP;
    }
    const hpInput = document.getElementById("heroPointsInput");
    if (hpInput && document.activeElement !== hpInput) {
      hpInput.value = char.heroPoints;
    }
  }

  if (!window.isCharacterLoading && typeof FileManager !== 'undefined' && FileManager.markDirty) {
    FileManager.markDirty();
  }

  if (typeof updateCharacterSelectorUI === 'function') updateCharacterSelectorUI();
  if (typeof window.updateHeroPointsLockUI === 'function') window.updateHeroPointsLockUI();
  if (typeof window.updateHeroPointsUseButtonState === 'function') window.updateHeroPointsUseButtonState();
  if (typeof window.updateGMEditorStateUI === 'function') window.updateGMEditorStateUI();

  const lblName = document.getElementById("lblHeroName");
  if (lblName) {
    const isComp = !!window.activeCompanionId && !!window.primaryHero;
    const comp = isComp ? (window.primaryHero.companions || []).find(c => c.id === window.activeCompanionId) : null;
    const placeholderText = comp ? getGenericCompanionName(comp, window.primaryHero) : (isComp ? "Companion" : "New Hero");
    lblName.textContent = (char.name && char.name.trim()) ? char.name : placeholderText;
  }
  const lblTrackerHero = document.getElementById("lblTrackerHeroName");
  const activeHeroName = (char.name && char.name.trim()) ? char.name.trim() : "Hero";
  if (lblTrackerHero) {
    lblTrackerHero.textContent = activeHeroName;
  }
  try {
    localStorage.setItem('mm2e_active_editor_hero', JSON.stringify({ name: activeHeroName, heroPoints: char.heroPoints }));
  } catch (err) {}
  if (poppedOutTrackerWindow && !poppedOutTrackerWindow.closed) {
    try {
      if (poppedOutTrackerWindow.localTracker) {
        poppedOutTrackerWindow.localTracker.heroName = activeHeroName;
      }
      const lblPop = poppedOutTrackerWindow.document?.getElementById('lblTrackerHeroName');
      if (lblPop) lblPop.textContent = activeHeroName;
      if (typeof poppedOutTrackerWindow.renderAllTrackerUI === 'function') {
        poppedOutTrackerWindow.renderAllTrackerUI();
      }
    } catch (err) {}
  }
  if (typeof broadcastTrackerSync === 'function') {
    broadcastTrackerSync();
  }
  const lblPL = document.getElementById("lblPL");
  if (lblPL) lblPL.textContent = char.powerLevel;

  const massRank = char.massRank !== null ? char.massRank : 3;
  const massLbs = typeof CharacterModel !== 'undefined' ? CharacterModel.getProgressionValue(massRank) * 5 : 200;
  const lblMass = document.getElementById("lblHeroMassVal");
  if (lblMass) lblMass.textContent = typeof CharacterModel !== 'undefined' ? `(${CharacterModel.formatWeight(massLbs)})` : "";

  const unit = char.pointUnit || (char.isMecha ? "MP" : "PP");

  // Mecha Mode button and status
  const btnMecha = document.getElementById("btnToggleMechaMode");
  const lblMechaStatus = document.getElementById("lblMechaModeStatus");
  if (btnMecha && lblMechaStatus) {
    const isMechaActive = !!char.isMecha;

    if (isMechaActive) {
      btnMecha.classList.add("mecha-active");
      lblMechaStatus.textContent = "Mecha: ON";
      btnMecha.title = "Mecha Mode is ON (Construct & Mecha Points rules active). Click to return to Pilot.";
    } else {
      btnMecha.classList.remove("mecha-active");
      lblMechaStatus.textContent = "Mecha: Off";
      btnMecha.title = "Toggle Mecha Mode (Construct / Vehicle Rules).";
    }
  }

  // Mecha AI options panel
  const boxAI = document.getElementById("boxMechaAIOptions");
  if (boxAI) {
    boxAI.style.display = char.isMecha ? "flex" : "none";
  }
  const chkAI = document.getElementById("chkMechaHasAI");
  if (chkAI) {
    chkAI.checked = !!char.hasAI;
  }

  // Point labels update
  const lblPrefix = document.getElementById("lblPointTypePrefix");
  if (lblPrefix) lblPrefix.textContent = `${unit}:`;

  const ppModalTitle = document.getElementById("ppModalTitle");
  if (ppModalTitle) ppModalTitle.textContent = `Character Point Breakdown (${unit})`;

  const abilPanelTitle = document.getElementById("lblAbilitiesPanelTitle");
  if (abilPanelTitle) {
    abilPanelTitle.textContent = char.isMecha ? `Core Abilities (Construct Chassis - Base 0 ${unit})` : `Abilities (1 PP per Score point over 10)`;
  }

  const navFeats = document.getElementById("lblNavFeats");
  if (navFeats) {
    navFeats.textContent = char.isMecha ? "Mecha Options" : "Feats";
  }

  const featsPanelTitle = document.getElementById("lblFeatsPanelTitle");
  if (featsPanelTitle) {
    featsPanelTitle.textContent = char.isMecha ? `Mecha Options (1 ${unit} per Rank)` : `Feats (1 PP per Rank)`;
  }

  const btnOpenFeat = document.getElementById("btnOpenAddFeatModal");
  if (btnOpenFeat) {
    btnOpenFeat.textContent = char.isMecha ? "+ Add Mecha Option" : "+ Add Feat";
  }

  const selFeatCat = document.getElementById("selFeatCategoryFilter");
  if (selFeatCat) {
    const optMecha = selFeatCat.querySelector('option[value="Mecha"]');
    if (char.isMecha) {
      if (!optMecha) {
        const opt = document.createElement("option");
        opt.value = "Mecha";
        opt.textContent = "🤖 Mecha Options";
        const optAll = selFeatCat.querySelector('option[value="All"]');
        if (optAll && optAll.nextSibling) {
          selFeatCat.insertBefore(opt, optAll.nextSibling);
        } else {
          selFeatCat.appendChild(opt);
        }
      }
    } else {
      if (optMecha) {
        optMecha.remove();
      }
      if (selFeatCat.value === "Mecha") {
        selFeatCat.value = "All";
      }
    }
  }

  const pp = char.powerPointsSummary;
  const isOverBudget = pp.totalSpent > char.totalPointsAllowed;

  const elAbil = document.getElementById("lblAbilPP"); if (elAbil) elAbil.textContent = `${pp.abilities} ${unit}`;
  const elCombat = document.getElementById("lblCombatPP"); if (elCombat) elCombat.textContent = `${pp.combat} ${unit}`;
  const elResist = document.getElementById("lblResistPP"); if (elResist) elResist.textContent = `${pp.resistances} ${unit}`;
  const elSkill = document.getElementById("lblSkillPP"); if (elSkill) elSkill.textContent = `${pp.skills} ${unit}`;
  const elAdv = document.getElementById("lblAdvPP"); if (elAdv) elAdv.textContent = `${pp.feats} ${unit}`;
  const elPower = document.getElementById("lblPowerPP"); if (elPower) elPower.textContent = `${pp.powers} ${unit}`;

  const elTotal = document.getElementById("lblTotalPP");
  if (elTotal) {
    elTotal.textContent = `${pp.totalSpent} / ${char.totalPointsAllowed} ${unit}`;
    elTotal.style.background = isOverBudget ? "#ef4444" : "var(--accent-primary)";
  }

  const elModalTotal = document.getElementById("lblModalTotalPP");
  if (elModalTotal) {
    elModalTotal.textContent = `${pp.totalSpent} / ${char.totalPointsAllowed} ${unit}`;
    elModalTotal.style.background = isOverBudget ? "#ef4444" : "var(--accent-primary)";
  }

  const elModalPL = document.getElementById("lblModalPL");
  if (elModalPL) elModalPL.textContent = char.powerLevel;

  const boxBudgetStatus = document.getElementById("boxModalPPBudgetStatus");
  if (boxBudgetStatus) {
    boxBudgetStatus.style.display = isOverBudget ? "block" : "none";
  }

  const limits = char.advantageLimitsCheck;
  const heroicElem = document.getElementById("lblHeroicLimit");
  if (heroicElem) {
    heroicElem.textContent = `${limits.heroicSpent} / ${limits.heroicMax}`;
    heroicElem.style.background = limits.heroicValid ? "var(--accent-primary)" : "#ef4444";
  }

  const commandElem = document.getElementById("lblCommandLimit");
  if (commandElem) {
    commandElem.textContent = `${limits.commandSpent} / ${limits.commandMax} (${limits.commandAbility})`;
    commandElem.style.background = limits.commandValid ? "var(--accent-primary)" : "#ef4444";
  }

  const derived = char.derivedStats;
  const atk = char.getCombatRank("ATK");
  const meleeAtkFeat = derived.meleeAtkFeat || 0;
  const rangedAtkFeat = derived.rangedAtkFeat || 0;
  
  const enhAtk = (char.enhancedTraits && char.enhancedTraits.combat) ? char.enhancedTraits.combat.ATK || 0 : 0;
  const enhDef = (char.enhancedTraits && char.enhancedTraits.combat) ? char.enhancedTraits.combat.DEF || 0 : 0;
  const enhTough = (char.enhancedTraits && char.enhancedTraits.saves) ? char.enhancedTraits.saves.Toughness || 0 : 0;
  const enhFort = (char.enhancedTraits && char.enhancedTraits.saves) ? char.enhancedTraits.saves.Fortitude || 0 : 0;
  const enhRef = (char.enhancedTraits && char.enhancedTraits.saves) ? char.enhancedTraits.saves.Reflex || 0 : 0;
  const enhWill = (char.enhancedTraits && char.enhancedTraits.saves) ? char.enhancedTraits.saves.Will || 0 : 0;
  const enhStr = (char.enhancedTraits && char.enhancedTraits.abilities) ? char.enhancedTraits.abilities.STR || 0 : 0;
  const enhDex = (char.enhancedTraits && char.enhancedTraits.abilities) ? char.enhancedTraits.abilities.DEX || 0 : 0;
  const enhCon = (char.enhancedTraits && char.enhancedTraits.abilities) ? char.enhancedTraits.abilities.CON || 0 : 0;
  const enhWis = (char.enhancedTraits && char.enhancedTraits.abilities) ? char.enhancedTraits.abilities.WIS || 0 : 0;

  const baseAtk = char.getBaseCombatRank ? char.getBaseCombatRank("ATK") : char.combat.ATK;
  const baseDef = char.getBaseCombatRank ? char.getBaseCombatRank("DEF") : char.combat.DEF;

  const generateCombatTags = (featList) => {
    if (!featList || featList.length === 0) return "";
    const listRef = (typeof FEATS_LIST !== 'undefined') ? FEATS_LIST : ((typeof ADVANTAGES_LIST !== 'undefined') ? ADVANTAGES_LIST : []);
    const effFeats = char.effectiveFeats || char.feats;
    
    const matched = [];
    featList.forEach(prefix => {
      if ((effFeats[prefix] || 0) > 0) {
        matched.push({ name: prefix, rank: effFeats[prefix] });
      }
      Object.keys(effFeats).forEach(k => {
        if (k !== prefix && k.startsWith(prefix) && (effFeats[k] || 0) > 0) {
          if (!matched.some(m => m.name === k)) {
            matched.push({ name: k, rank: effFeats[k] });
          }
        }
      });
    });

    if (matched.length === 0) return "";

    return "&nbsp;&nbsp;" + matched.map(item => {
      const featInfo = listRef.find(a => a.name === item.name || item.name.startsWith(a.name));
      const rankText = (item.rank > 0 && featInfo?.ranked) ? ` (${item.rank})` : "";
      const baseName = featInfo ? featInfo.name : item.name;
      const isEnhanced = (char.enhancedTraits && char.enhancedTraits.feats && char.enhancedTraits.feats[item.name]) > 0;
      const clickFn = window.showFeatInfo ? `window.showFeatInfo('${baseName}')` : `window.showAdvantageInfo('${baseName}')`;
      const enhBadge = isEnhanced ? `<span style="color:#10b981; font-weight: bold; margin-left: 2px;" title="Enhanced Trait">▲</span>` : '';
      return `<span class="skill-adv-tag active-adv-tag" style="cursor: pointer; display: inline-flex; align-items: center; gap: 4px; padding: 2px 6px;" onclick="${clickFn}" title="${isEnhanced ? 'Enhanced Feat' : 'View description'}">
          ${item.name}${rankText}${enhBadge}
        </span>`;
    }).join(" ");
  };

  const elCloseAtk = document.getElementById("lblCloseAttack");
  if (elCloseAtk) elCloseAtk.textContent = (derived.meleeAttack >= 0 ? "+" : "") + derived.meleeAttack;
  const elCloseBreakdown = document.getElementById("lblCloseAtkBreakdown");
  if (elCloseBreakdown) {
    const featBonusStr = meleeAtkFeat > 0 ? ` + Feat ${meleeAtkFeat}` : "";
    const enhAtkStr = enhAtk > 0 ? ` + Enhanced ${enhAtk}` : "";
    const enhTag = enhAtk > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced ATK +${enhAtk}]</span>` : "";
    elCloseBreakdown.innerHTML = `(ATK ${baseAtk}${enhAtkStr}${featBonusStr})` + enhTag + generateCombatTags(["Attack Focus", "Attack Focus (Melee)", "Attack Specialization", "Favored Environment", "Favored Opponent", "Accurate Attack", "All-Out Attack", "Power Attack", "Sneak Attack"]);
  }

  const elRangedAtk = document.getElementById("lblRangedAttack");
  if (elRangedAtk) elRangedAtk.textContent = (derived.rangedAttack >= 0 ? "+" : "") + derived.rangedAttack;
  const elRangedBreakdown = document.getElementById("lblRangedAtkBreakdown");
  if (elRangedBreakdown) {
    const featBonusStr = rangedAtkFeat > 0 ? ` + Feat ${rangedAtkFeat}` : "";
    const enhAtkStr = enhAtk > 0 ? ` + Enhanced ${enhAtk}` : "";
    const enhTag = enhAtk > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced ATK +${enhAtk}]</span>` : "";
    elRangedBreakdown.innerHTML = `(ATK ${baseAtk}${enhAtkStr}${featBonusStr})` + enhTag + generateCombatTags(["Attack Focus", "Attack Focus (Ranged)", "Attack Specialization", "Favored Environment", "Favored Opponent", "Accurate Attack", "All-Out Attack", "Power Attack", "Precise Shot", "Sneak Attack"]);
  }

  const attacksContainer = document.getElementById("attacksListContainer");
  if (attacksContainer) {
    const meleeBonus = derived.meleeAttack !== undefined ? derived.meleeAttack : atk;
    const rangedBonus = derived.rangedAttack !== undefined ? derived.rangedAttack : atk;
    const meleeBreakdownStr = `(ATK ${baseAtk}${enhAtk > 0 ? ` + Enh ${enhAtk}` : ''}${meleeAtkFeat > 0 ? ` + Feat ${meleeAtkFeat}` : ''})`;
    const rangedBreakdownStr = `(ATK ${baseAtk}${enhAtk > 0 ? ` + Enh ${enhAtk}` : ''}${rangedAtkFeat > 0 ? ` + Feat ${rangedAtkFeat}` : ''})`;
    const strRank = char.getAbilityRank("STR");
    const unarmedDamage = strRank === null ? 0 : strRank;
    const unarmedDC = 15 + unarmedDamage;

    const flurryFeatRank = (char.effectiveFeats && char.effectiveFeats["(Attack) Flurry"]) || (char.feats && char.feats["(Attack) Flurry"]) || 0;
    let flurryStats = null;
    if (flurryFeatRank > 0 && window.calculateFlurryStats) {
      flurryStats = window.calculateFlurryStats(flurryFeatRank, char.featDetails ? char.featDetails["(Attack) Flurry"] : null);
    }
    const makeFlurryTag = (modeName) => {
      if (!flurryStats) return "";
      const matches = flurryStats.forms.some(f => {
        const lowerF = f.toLowerCase();
        const lowerM = modeName.toLowerCase();
        return lowerM.includes(lowerF) || lowerF.includes(lowerM) || lowerF.includes("melee") || (lowerM === "unarmed" && lowerF.includes("unarmed"));
      });
      if (!matches) return "";
      return ` <span class="skill-adv-tag active-adv-tag" style="background: rgba(139, 92, 246, 0.15); border-color: #8b5cf6; color: #8b5cf6; font-weight: 600; padding: 1px 5px;" title="Flurry: -2 Atk, +1 dmg per ${flurryStats.interval} exceeding Defense (max +${flurryStats.maxBonus})">[Flurry: –2 Atk, +1/${flurryStats.interval}&gt;Def, max +${flurryStats.maxBonus}]</span>`;
    };

    let attacksHtml = `
      <div class="list-row">
        <button type="button" class="row-title-btn" onclick="window.rollAttackCheck('Unarmed')" title="Roll Unarmed Attack Check">
          <span style="font-size: var(--font-size-labels);">🎲</span>
          <span class="row-title">Unarmed</span>
        </button>
        <div style="width: 110px; min-width: 110px; text-align: center; font-weight: bold; font-size: var(--font-size-labels); color: var(--accent-primary);">${meleeBonus >= 0 ? '+' : ''}${meleeBonus}</div>
        <div class="row-adjustments">${meleeBreakdownStr}${makeFlurryTag("Unarmed")}</div>
        <div class="defense-total-col" style="width: 110px; min-width: 110px; text-align: right;">DC ${unarmedDC} / Staged</div>
      </div>
      <div class="list-row">
        <button type="button" class="row-title-btn" onclick="window.rollAttackCheck('Melee Attack')" title="Roll Melee Attack Check">
          <span style="font-size: var(--font-size-labels);">🎲</span>
          <span class="row-title">Melee Attack</span>
        </button>
        <div style="width: 110px; min-width: 110px; text-align: center; font-weight: bold; font-size: var(--font-size-labels); color: var(--accent-primary);">${meleeBonus >= 0 ? '+' : ''}${meleeBonus}</div>
        <div class="row-adjustments">${meleeBreakdownStr}${makeFlurryTag("Melee Attack")}</div>
        <div class="defense-total-col" style="width: 110px; min-width: 110px; text-align: right;">—</div>
      </div>
      <div class="list-row">
        <button type="button" class="row-title-btn" onclick="window.rollAttackCheck('Ranged Attack')" title="Roll Ranged Attack Check">
          <span style="font-size: var(--font-size-labels);">🎲</span>
          <span class="row-title">Ranged Attack</span>
        </button>
        <div style="width: 110px; min-width: 110px; text-align: center; font-weight: bold; font-size: var(--font-size-labels); color: var(--accent-primary);">${rangedBonus >= 0 ? '+' : ''}${rangedBonus}</div>
        <div class="row-adjustments">${rangedBreakdownStr}</div>
        <div class="defense-total-col" style="width: 110px; min-width: 110px; text-align: right;">—</div>
      </div>
    `;

    const allPowers = char.activePowers || char.powers || [];
    allPowers.forEach((power, pIdx) => {
      (power.effects || []).forEach((eff, eIdx) => {
        const effName = eff.effectName || "";
        const isDmgEffect = effName === "Damage" || effName === "Blast" || effName === "Strike" || effName === "Corrosion" || effName === "Disintegrate" || effName === "Hellfire" || effName === "Drain" || effName === "Snare" || effName === "Stun";
        if (isDmgEffect || eff.isAttack) {
          const isRanged = effName === "Blast" || effName === "Snare" || eff.range === "Ranged";
          const bonus = isRanged ? rangedBonus : meleeBonus;
          const rank = parseInt(eff.rank) || 0;
          const dc = 15 + rank;
          const name = (eff.name && eff.name !== "New Effect") ? eff.name : (power.name || effName);
          attacksHtml += `
            <div class="list-row">
              <button type="button" class="row-title-btn" onclick="window.rollEffectCheck(${pIdx}, ${eIdx})" title="Roll ${name}">
                <span style="font-size: var(--font-size-labels);">🎲</span>
                <span class="row-title" title="${effName}">${name}</span>
              </button>
              <div style="width: 110px; min-width: 110px; text-align: center; font-weight: bold; font-size: var(--font-size-labels); color: var(--accent-primary);">${bonus >= 0 ? '+' : ''}${bonus}</div>
              <div class="row-adjustments">${isRanged ? rangedBreakdownStr : meleeBreakdownStr} [Rank ${rank}]${!isRanged ? makeFlurryTag(name) : ''}</div>
              <div class="defense-total-col" style="width: 110px; min-width: 110px; text-align: right;">DC ${dc} / Staged</div>
            </div>
          `;
        }
      });
    });

    attacksContainer.innerHTML = attacksHtml;
  }

  const elDefClass = document.getElementById("resDefenseClass");
  if (elDefClass) elDefClass.textContent = derived.defenseClass;
  const elAdjDefClass = document.getElementById("adjDefenseClass");
  if (elAdjDefClass) {
    const enhDefTag = enhDef > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced DEF +${enhDef}]</span>` : "";
    elAdjDefClass.innerHTML = `Base (10 + Total Defense ${derived.totalDefense}) [Flat-Footed DC: ${derived.flatFootedDefenseClass}]` + enhDefTag + generateCombatTags(["Dodge Focus", "Uncanny Dodge", "Elusive Target", "Improved Defense", "Defensive Attack", "All-Out Attack"]);
  }

  const elReflex = document.getElementById("resReflex");
  if (elReflex) elReflex.textContent = derived.reflex === null ? "—" : derived.reflex;
  const elToughness = document.getElementById("resToughness");
  if (elToughness) elToughness.textContent = derived.toughness;
  const elFortitude = document.getElementById("resFortitude");
  if (elFortitude) elFortitude.textContent = char.isMecha ? "Immune" : (derived.fortitude === null ? "—" : derived.fortitude);
  const elWill = document.getElementById("resWill");
  if (elWill) {
    if (char.isMecha && !char.hasAI) {
      elWill.textContent = "Immune";
    } else {
      elWill.textContent = derived.will === null ? "—" : derived.will;
    }
  }

  const elTotalDef = document.getElementById("resTotalDef");
  if (elTotalDef) elTotalDef.textContent = derived.totalDefense;
  const elFlatFootedDef = document.getElementById("resFlatFootedDef");
  if (elFlatFootedDef) elFlatFootedDef.textContent = derived.flatFootedDefense;

  // Backward-compatibility elements
  const elCloseDef = document.getElementById("resCloseDef");
  if (elCloseDef) elCloseDef.textContent = derived.closeDefense;
  const elRangedDef = document.getElementById("resRangedDef");
  if (elRangedDef) elRangedDef.textContent = derived.rangedDefense;

  const sta = char.getAbilityRank("CON");
  const awe = char.getAbilityRank("WIS");
  const defRank = char.getCombatRank("DEF");
  const defRoll = (char.effectiveFeats || char.feats)["Defensive Roll"] || 0;
  const dodgeFocusRanks = derived.dodgeFocusRanks || ((char.effectiveFeats || char.feats)["Dodge Focus"] || 0);
  const impInit = (char.effectiveFeats || char.feats)["Improved Initiative"] || 0;
  const pMods = char.powerTraitModifiers;
  const dexRank = char.getAbilityRank("DEX") || 0;

  const elAdjReflex = document.getElementById("adjReflex");
  if (elAdjReflex) {
    const lrRanks = (char.effectiveFeats || char.feats)["Lightning Reflexes"] || 0;
    const lrStr = lrRanks > 0 ? ` + Lightning Reflexes (+${lrRanks * 2})` : "";
    const enhRefStr = enhRef > 0 ? ` + Enhanced (${enhRef})` : "";
    const enhRefTag = enhRef > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced Reflex +${enhRef}]</span>` : "";
    const enhDexTag = enhDex > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced DEX +${enhDex}]</span>` : "";
    elAdjReflex.innerHTML = `DEX (${dexRank}) + Bought (${char.purchasedResistances.Reflex || 0})${enhRefStr}${lrStr}` + enhRefTag + enhDexTag + generateCombatTags(["Evasion", "Lightning Reflexes", "Instant Up", "Acrobatic Bluff"]);
  }

  const elAdjToughness = document.getElementById("adjToughness");
  if (elAdjToughness) {
    let toughNote = "";
    if (defRoll > 0) {
      toughNote = derived.hasUncannyDodge ? ` [Def Roll retained via Uncanny Dodge]` : ` [Flat-Footed: ${derived.flatFootedToughness}]`;
    }
    const protOnly = Math.max(0, (pMods.protectionToughness || 0) - enhTough);
    const enhToughStr = enhTough > 0 ? ` + Enhanced (${enhTough})` : "";
    const enhToughTag = enhTough > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced Toughness +${enhTough}]</span>` : "";
    const enhConTag = enhCon > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced CON +${enhCon}]</span>` : "";

    if (char.isMecha || sta === null) {
      const boughtArmor = char.purchasedResistances.Toughness || 0;
      const sizeToughBonus = (typeof SIZE_TABLE !== 'undefined' && SIZE_TABLE[char.sizeCategory]) ? SIZE_TABLE[char.sizeCategory].toughness || 0 : 0;
      const sizeStr = sizeToughBonus ? ` + Size (${sizeToughBonus >= 0 ? '+' : ''}${sizeToughBonus})` : "";
      elAdjToughness.innerHTML = `Structural Armor (${boughtArmor}) + Protection (${protOnly})${enhToughStr}${sizeStr}` + enhToughTag + generateCombatTags(["Tough"]);
    } else {
      elAdjToughness.innerHTML = (sta === null ? "Absent CON" : `CON (${sta}) + Def Roll (${defRoll}) + Protection (${protOnly})${enhToughStr}${toughNote}`) + enhToughTag + enhConTag + generateCombatTags(["Defensive Roll", "Uncanny Dodge"]);
    }
  }

  const elAdjFort = document.getElementById("adjFort");
  if (elAdjFort) {
    if (char.isMecha) {
      elAdjFort.innerHTML = "<span style='color: #10b981; font-weight: 600;'>Immune to Fortitude Effects (Construct / Machine)</span>";
    } else {
      const gfRanks = (char.effectiveFeats || char.feats)["Great Fortitude"] || 0;
      const gfStr = gfRanks > 0 ? ` + Great Fortitude (+${gfRanks * 2})` : "";
      const enhFortStr = enhFort > 0 ? ` + Enhanced (${enhFort})` : "";
      const enhFortTag = enhFort > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced Fortitude +${enhFort}]</span>` : "";
      const enhConTag = enhCon > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced CON +${enhCon}]</span>` : "";
      elAdjFort.innerHTML = (sta === null ? "Absent CON" : `CON (${sta}) + Bought (${char.purchasedResistances.Fortitude || 0})${enhFortStr}${gfStr}`) + enhFortTag + enhConTag + generateCombatTags(["Endurance", "Diehard", "Great Fortitude"]);
    }
  }

  const elAdjWill = document.getElementById("adjWill");
  if (elAdjWill) {
    if (char.isMecha && !char.hasAI) {
      elAdjWill.innerHTML = "<span style='color: #10b981; font-weight: 600;'>Immune to Mental & Interaction Effects (Mindless / Pilot Will)</span>";
    } else {
      const iwRanks = (char.effectiveFeats || char.feats)["Iron Will"] || 0;
      const iwStr = iwRanks > 0 ? ` + Iron Will (+${iwRanks * 2})` : "";
      const enhWillStr = enhWill > 0 ? ` + Enhanced (${enhWill})` : "";
      const enhWillTag = enhWill > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced Will +${enhWill}]</span>` : "";
      const enhWisTag = enhWis > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced WIS +${enhWis}]</span>` : "";
      elAdjWill.innerHTML = (awe === null ? "Absent WIS" : `WIS (${awe}) + Bought (${char.purchasedResistances.Will || 0})${enhWillStr}${iwStr}`) + enhWillTag + enhWisTag + generateCombatTags(["Fearless", "Iron Will", "Trance"]);
    }
  }

  const elAdjTotalDef = document.getElementById("adjTotalDef");
  if (elAdjTotalDef) {
    const enhDefStr = enhDef > 0 ? ` + Enhanced DEF (${enhDef})` : "";
    const enhDefTag = enhDef > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced DEF +${enhDef}]</span>` : "";
    elAdjTotalDef.innerHTML = `DEF (${baseDef})${enhDefStr} + Dodge Focus (${dodgeFocusRanks})` + enhDefTag + generateCombatTags(["Dodge Focus", "Elusive Target", "Improved Defense", "Defensive Attack", "Favored Environment"]);
  }

  const elAdjFlatFootedDef = document.getElementById("adjFlatFootedDef");
  if (elAdjFlatFootedDef) {
    const enhDefStr = enhDef > 0 ? ` + Enhanced DEF (${enhDef})` : "";
    const enhDefTag = enhDef > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced DEF +${enhDef}]</span>` : "";
    if (derived.hasUncannyDodge) {
      elAdjFlatFootedDef.innerHTML = `DEF (${baseDef})${enhDefStr} + Dodge Focus (${dodgeFocusRanks}) [Retained via Uncanny Dodge]` + enhDefTag + generateCombatTags(["Uncanny Dodge"]);
    } else {
      elAdjFlatFootedDef.innerHTML = `DEF (${baseDef})${enhDefStr} [No Dodge bonus]` + enhDefTag + generateCombatTags(["Uncanny Dodge"]);
    }
  }

  const elAdjCloseDef = document.getElementById("adjCloseDef");
  if (elAdjCloseDef) elAdjCloseDef.innerHTML = `DEF (${defRank}) + Dodge Focus (${dodgeFocusRanks})` + generateCombatTags(["Dodge Focus", "Favored Environment"]);

  const elAdjRangedDef = document.getElementById("adjRangedDef");
  if (elAdjRangedDef) elAdjRangedDef.innerHTML = `DEF (${defRank}) [No Dodge bonus]`;

  const elResInit = document.getElementById("resInitiative");
  if (elResInit) elResInit.textContent = derived.initiative;
  const elAdjInit = document.getElementById("adjInitiative");
  if (elAdjInit) {
    const enhDexTag = enhDex > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced DEX +${enhDex}]</span>` : "";
    elAdjInit.innerHTML = `DEX (${dexRank}) + Imp Initiative (+${impInit * 4})` + enhDexTag + generateCombatTags(["Improved Initiative", "Seize the Initiative"]);
  }

  if (typeof CharacterModel !== 'undefined') {
    const groundDist = CharacterModel.getSpeedDistance(derived.groundSpeed);
    const elGround = document.getElementById("resGroundSpeed");
    if (elGround) elGround.textContent = derived.groundSpeed ? `Rank ${derived.groundSpeed} (${groundDist})` : `(${groundDist})`;
    
    const elAir = document.getElementById("resAirSpeed");
    if (elAir) {
      if (derived.airSpeed !== null && derived.airSpeed > 0) {
        const airDist = CharacterModel.getSpeedDistance(derived.airSpeed);
        elAir.textContent = `Rank ${derived.airSpeed} (${airDist})`;
      } else {
        elAir.textContent = "—";
      }
    }

    const elWater = document.getElementById("resWaterSpeed");
    if (elWater) {
      if (derived.waterSpeed !== null && derived.waterSpeed > 0) {
        const waterDist = CharacterModel.getSpeedDistance(derived.waterSpeed);
        elWater.textContent = `Rank ${derived.waterSpeed} (${waterDist})`;
      } else {
        elWater.textContent = "—";
      }
    }
    
    const elSpace = document.getElementById("resSpaceSpeed");
    if (elSpace) elSpace.textContent = "—";
    
    const strScore = char.getAbilityScore("STR");
    const totalLiftRank = (strScore === null ? 0 : strScore) + (pMods.extraLifting * 5);
    const liftDist = CharacterModel.getCarryingCapacity(totalLiftRank);
    const elLift = document.getElementById("resMaxLifting");
    if (elLift) elLift.textContent = `Rank ${totalLiftRank} (${liftDist})`;
  }
  const elSpaces = document.getElementById("resSpacesReach");
  if (elSpaces) elSpaces.textContent = `${derived.spaces} / ${derived.reach}`;

  const combatAdvListContainer = document.getElementById("combatAdvList");
  let activeCombatAdvHTML = "";

  const combatSkills = [
    { name: "Acrobatics", action: "Stand from prone as free action (DC 20), Tumble through enemies (DC 15), Acrobatic Bluff" },
    { name: "Bluff", action: "Feint in combat (opposed by Sense Motive/Bluff, denies dodge bonus)" },
    { name: "Escape Artist", action: "Escape a grapple or pin (Standard action, opposed by grapple check)" },
    { name: "Intimidate", action: "Demoralize (opposed by Will/Sense Motive/Intimidate, shaken for 1 round)" },
    { name: "Sense Motive", action: "Assess opponent's PL, Resist Feint and Demoralize" },
    { name: "Stealth", action: "Hide from opponents (requires cover/concealment or Hide in Plain Sight)" }
  ];

  const hideUnranked = document.getElementById("chkFilterUnrankedSkills") && document.getElementById("chkFilterUnrankedSkills").checked;

  combatSkills.forEach(cs => {
    if (hideUnranked && (!char.skills[cs.name] || char.skills[cs.name] === 0)) return;
    activeCombatAdvHTML += `
      <div class="combat-conditional-row">
        <span class="combat-conditional-name">
          <button type="button" class="row-title-btn" onclick="window.rollSkillCheck('${cs.name}')" style="cursor: pointer; padding: 1px 4px; font-weight: bold;" title="Roll 1d20 + Skill Bonus">
            <span>🎲</span>
            <span>${cs.name}</span>
          </button>
          <button type="button" class="btn-info-circle" onclick="showSkillInfo('${cs.name}')" title="View Skill Rules" style="margin-left: 2px;">?</button>
        </span>
        <span class="combat-conditional-desc">${cs.action}</span>
      </div>
    `;
  });

  if (typeof ADVANTAGES_LIST !== 'undefined') {
    const effFeats = char.effectiveFeats || char.feats || {};
    Object.keys(effFeats).forEach(featKey => {
      const ranks = effFeats[featKey] || 0;
      if (ranks > 0) {
        const baseName = featKey.includes(" (") ? featKey.split(" (")[0].trim() : featKey.trim();
        const adv = ADVANTAGES_LIST.find(a => a.name.toLowerCase() === baseName.toLowerCase() || a.name.toLowerCase() === featKey.toLowerCase());
        if (adv && (adv.category === "Combat" || (adv.types && adv.types.includes("Combat"))) && (adv.conditionalSummary || adv.description)) {
          const detail = char.featDetails && char.featDetails[featKey] ? ` (${char.featDetails[featKey]})` : "";
          const rankLabel = adv.ranked ? ` [Rank ${ranks}]` : "";
          const desc = adv.conditionalSummary || adv.description;
          activeCombatAdvHTML += `
            <div class="combat-conditional-row">
              <span class="combat-conditional-name">
                ${featKey}${rankLabel}${detail}
                <button type="button" class="btn-info-circle" onclick="window.showAdvantageInfo('${adv.name.replace(/'/g, "\\'")}')" title="View Feat Rules" style="margin-left: 2px;">?</button>
              </span>
              <span class="combat-conditional-desc">${desc}</span>
            </div>
          `;
        }
      }
    });
  }

  if (combatAdvListContainer) {
    combatAdvListContainer.innerHTML = activeCombatAdvHTML;
  }

  const abilityRelatedFeats = {
    "STR": [],
    "DEX": [],
    "CON": [],
    "INT": [],
    "WIS": [],
    "CHA": []
  };

  ["STR", "CON", "DEX", "INT", "WIS", "CHA"].forEach(k => {
    const val = char.getAbilityRank(k);
    const score = (typeof char.getAbilityScore === "function") ? char.getAbilityScore(k) : null;
    const enhVal = (char.enhancedTraits && char.enhancedTraits.abilities[k]) ? char.enhancedTraits.abilities[k] : 0;
    const totalElem = document.getElementById(`total_rank_${k}`);
    const adjElem = document.getElementById(`adj_${k}`);

    if (val === null || score === null) {
      if (totalElem) totalElem.textContent = "—";
      if (adjElem) {
        if (char.isMecha && k === "CON") {
          adjElem.innerHTML = "<span style='color:#0284c7; font-weight:600;'>Absent (Construct chassis)</span>";
        } else if (char.isMecha && (k === "INT" || k === "WIS" || k === "CHA") && !char.hasAI) {
          adjElem.innerHTML = "<span style='color:#0284c7; font-weight:600;'>Absent (Unconscious machine)</span>";
        } else {
          adjElem.innerHTML = "<span style='color:#ef4444;'>Absent / Disabled</span>";
        }
      }
    } else {
      const sign = val >= 0 ? `+${val}` : `${val}`;
      const baseScore = (typeof char.getBaseAbilityScore === "function") ? char.getBaseAbilityScore(k) : (char.abilities?.[k] ?? 10);
      if (totalElem) {
        if (enhVal > 0) {
          totalElem.innerHTML = `<span style="color: #059669; font-weight: 800;" title="Base Score ${baseScore} + ${enhVal} Enhanced = Total Score ${score} (Modifier ${sign})">${score} (${sign})</span>`;
        } else {
          totalElem.textContent = `${score} (${sign})`;
          totalElem.title = `Total Ability Score ${score} (Modifier ${sign})`;
        }
      }
      const stepperInp = document.getElementById(`input_${k}`);
      if (stepperInp) {
        stepperInp.title = enhVal > 0 
          ? `Base Purchased Score: ${baseScore} (Effective total is ${score} with +${enhVal} Enhanced Trait from powers/devices)`
          : `Base Ability Score: ${score} (1 PP per point over 10)`;
      }
      if (adjElem) {
        let adjHTML = "";
        const effFeats = char.effectiveFeats || char.feats;
        const activeFeats = (abilityRelatedFeats[k] || []).filter(advName => (effFeats[advName] || 0) > 0);
        const tags = [];
        const boostVal = (char.enhancedTraits && char.enhancedTraits.boostAbilities && char.enhancedTraits.boostAbilities[k]) ? char.enhancedTraits.boostAbilities[k] : 0;
        const nonBoostEnh = enhVal - boostVal;
        if (nonBoostEnh > 0) {
          tags.push(`<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;" title="Enhanced Trait">+${nonBoostEnh} Enhanced Trait</span>`);
        }
        if (boostVal > 0) {
          tags.push(`<span class="skill-adv-tag active-adv-tag" style="background: rgba(14, 165, 233, 0.15); border-color: #0ea5e9; color: #0ea5e9; font-weight: 600;" title="Active Boost Effect">+${boostVal} Boost</span>`);
        }
        if (activeFeats.length > 0) {
          activeFeats.forEach(advName => {
            const advRanks = effFeats[advName] || 0;
            const rankText = (advRanks > 0 && typeof ADVANTAGES_LIST !== 'undefined' && ADVANTAGES_LIST.find(a => a.name === advName)?.ranked) ? ` (${advRanks})` : "";
            tags.push(`
              <span class="skill-adv-tag active-adv-tag" style="cursor: pointer; display: inline-flex; align-items: center; gap: 4px;" onclick="window.showAdvantageInfo('${advName}')" title="View description">
                ${advName}${rankText}
              </span>
            `);
          });
        }
        if (tags.length > 0) {
          adjHTML = tags.join(" ");
        } else {
          adjHTML = "<em>Base points only</em>";
        }
        adjElem.innerHTML = adjHTML;
      }
    }
  });

  const allActiveSkills = new Set([
    ...Object.keys(char.skills || {}),
    ...Object.keys((char.enhancedTraits && char.enhancedTraits.skills) || {})
  ]);
  const maxSkillCap = char.powerLevel + 10;
  allActiveSkills.forEach(skillName => {
    const idSafe = skillName.replace(/[^a-zA-Z0-9]/g, "_");
    const meta = getSkillMetadata(skillName);
    let base = 0;
    if (meta.ability === "None") {
      base = 0;
    } else if (meta.ability === "ATK") {
      base = char.getCombatRank("ATK");
    } else {
      const val = char.getAbilityRank(meta.ability);
      base = val === null ? -5 : val;
    }

    const bought = char.skills[skillName] || 0;
    const enhancedSkill = (char.enhancedTraits && char.enhancedTraits.skills && char.enhancedTraits.skills[skillName]) ? char.enhancedTraits.skills[skillName] : 0;
    const total = base + bought + enhancedSkill;

    const baseElem = document.getElementById(`skill_base_${idSafe}`);
    const totalElem = document.getElementById(`skill_total_${idSafe}`);
    if (baseElem) baseElem.textContent = (base >= 0 ? "+" : "") + base;
    if (totalElem) {
      totalElem.textContent = (total >= 0 ? "+" : "") + total;
      if (total > maxSkillCap) {
        totalElem.style.color = "#ef4444";
        totalElem.title = `Exceeds PL Cap (${maxSkillCap})`;
      } else {
        totalElem.style.color = "inherit";
        totalElem.title = "";
      }
    }
  });
}

/* ==========================================================================
   TOAST NOTIFICATION ENGINE
   ========================================================================== */

function showToast(message, type = "info", durationMs = 3500) {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast-message toast-${type}`;
  
  let icon = "ℹ️";
  if (type === "success") icon = "✅";
  else if (type === "error") icon = "⚠️";

  toast.innerHTML = `<span style="font-size: var(--font-size-labels);">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  const raf = (typeof requestAnimationFrame === 'function') ? requestAnimationFrame : ((fn) => setTimeout(fn, 16));
  raf(() => {
    toast.classList.add("toast-visible");
  });

  setTimeout(() => {
    toast.classList.remove("toast-visible");
    toast.classList.add("toast-hiding");
    setTimeout(() => {
      if (toast && typeof toast.remove === 'function') toast.remove();
    }, 300);
  }, durationMs);
}
window.showToast = showToast;

/* ==========================================================================
   BACKGROUND & IDENTITY HANDLERS
   ========================================================================== */

function setupBackgroundHandlers() {
  const bgId = document.getElementById("bgIdentity");
  const bgTitles = document.getElementById("bgTitles");
  const bgSex = document.getElementById("bgSex");
  const bgAppearance = document.getElementById("bgAppearance");
  const bgMot = document.getElementById("bgMotivation");
  const bgComp = document.getElementById("bgComplications");
  const bgHist = document.getElementById("bgHistory");

  const notifyDirty = () => {
    if (!window.isCharacterLoading && typeof FileManager !== 'undefined' && FileManager.markDirty) {
      FileManager.markDirty();
    }
  };

  if (bgId) bgId.addEventListener("input", (e) => { char.identity = e.target.value.slice(0, 45); notifyDirty(); });
  if (bgTitles) bgTitles.addEventListener("input", (e) => { char.titles = e.target.value.slice(0, 45); notifyDirty(); });
  if (bgSex) bgSex.addEventListener("input", (e) => { char.sex = e.target.value.slice(0, 45); notifyDirty(); });
  if (bgAppearance) bgAppearance.addEventListener("input", (e) => { char.appearance = e.target.value; notifyDirty(); });
  if (bgMot) bgMot.addEventListener("input", (e) => { char.motivation = e.target.value; notifyDirty(); });
  if (bgComp) bgComp.addEventListener("input", (e) => { char.complications = e.target.value; notifyDirty(); });
  if (bgHist) bgHist.addEventListener("input", (e) => { char.history = e.target.value; notifyDirty(); });
}

/* ==========================================================================
   PERSISTENT FOLDER SETTINGS (IndexedDB)
   ========================================================================== */

const FolderStore = {
  dbName: "MM2E_App_Settings",
  storeName: "folder_settings",

  init: function() {
    return new Promise((resolve) => {
      if (typeof indexedDB === 'undefined') return resolve(null);
      const req = indexedDB.open(this.dbName, 1);
      req.onerror = () => resolve(null);
      req.onsuccess = () => resolve(req.result);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  },

  getSavedFolder: async function() {
    try {
      const db = await this.init();
      if (!db) return null;
      return new Promise((resolve) => {
        const tx = db.transaction(this.storeName, "readonly");
        const store = tx.objectStore(this.storeName);
        const req = store.get("default_folder");
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    } catch (e) {
      console.warn("Could not retrieve saved folder handle:", e);
      return null;
    }
  },

  saveFolder: async function(handle, name) {
    try {
      const db = await this.init();
      if (!db) return;
      const tx = db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);
      store.put({ handle, name }, "default_folder");
    } catch (e) {
      console.warn("Could not persist folder handle:", e);
    }
  },

  clearFolder: async function() {
    try {
      const db = await this.init();
      if (!db) return;
      const tx = db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);
      store.delete("default_folder");
    } catch (e) {
      console.warn("Could not clear folder handle:", e);
    }
  }
};

window.openFirefoxSettings = function() {
  let opened = false;
  try {
    const w = window.open("about:preferences#general", "_blank");
    if (w) opened = true;
  } catch (err) {
    opened = false;
  }
  showToast(
    opened
      ? "Attempting to open Firefox Settings... If blocked by browser security, go to Menu button (☰) > Settings > Downloads."
      : "Firefox blocked opening Settings automatically. Please go to Menu button (☰) > Settings > Downloads (or Tools > Settings > Downloads).",
    opened ? "info" : "warning",
    7000
  );
};

/* ==========================================================================
   LOCAL FILE MANAGER (.mm2e) WITH FILE SYSTEM ACCESS API & FALLBACKS
   ========================================================================== */


var FileManager = {
  currentFileHandle: null,
  currentFileName: null,
  activeDirectoryHandle: null,
  activeDirectoryName: null,
  isDirty: false,

  markDirty: function() {
    if (!this.isDirty) {
      this.isDirty = true;
      this.updateFileStatusUI();
    }
  },

  clearDirty: function() {
    this.isDirty = false;
    this.updateFileStatusUI();
  },

  init: async function() {
    const saved = await FolderStore.getSavedFolder();
    if (saved && saved.handle) {
      this.activeDirectoryHandle = saved.handle;
      this.activeDirectoryName = saved.name || saved.handle.name || "Custom Folder";
    }
    this.updateFolderUI();
    this.updateFileStatusUI();
  },

  updateFolderUI: function() {
    const folderLbl = document.getElementById("lblActiveFolder");
    const ffNotice = document.getElementById("boxFirefoxNotice");

    if (ffNotice) {
      const isFF = typeof navigator !== 'undefined' && (/firefox/i.test(navigator.userAgent) || !window.showDirectoryPicker);
      ffNotice.style.display = isFF ? "block" : "none";
    }

    if (!folderLbl) return;
    if (this.activeDirectoryName) {
      folderLbl.textContent = this.activeDirectoryName;
      folderLbl.title = `Current Default Folder: ${this.activeDirectoryName}`;
    } else if (this.activeDirectoryHandle && this.activeDirectoryHandle.name) {
      folderLbl.textContent = this.activeDirectoryHandle.name;
      folderLbl.title = `Current Default Folder: ${this.activeDirectoryHandle.name}`;
    } else if (!window.showDirectoryPicker) {
      folderLbl.textContent = "[Firefox Downloads]";
      folderLbl.title = "Managed via Firefox Settings > Downloads";
    } else {
      folderLbl.textContent = "[Project Default]";
      folderLbl.title = "Project Default Folder";
    }
  },

  updateFileStatusUI: function() {
    const badge = document.getElementById("lblCurrentFile");
    const indicator = document.getElementById("lblUnsavedIndicator");
    const nameText = document.getElementById("lblCurrentFileNameText");
    if (!badge) return;

    let displayFile = this.currentFileName;
    if (displayFile && displayFile.length > 45) {
      displayFile = displayFile.slice(0, 45);
    }
    const baseText = displayFile ? `[${displayFile}]` : `[Unsaved Character]`;

    if (nameText) {
      nameText.textContent = baseText;
    } else {
      badge.textContent = baseText;
    }

    if (this.isDirty) {
      if (indicator) indicator.style.display = "inline-block";
      badge.classList.add("has-unsaved");
      badge.title = `${displayFile || 'Unsaved Character'} (Unsaved changes)`;
    } else {
      if (indicator) indicator.style.display = "none";
      badge.classList.remove("has-unsaved");
      badge.title = displayFile ? `Active File: ${displayFile}` : `Unsaved Character`;
    }
  },

  getPickerOptions: function(suggestedName = null, isSave = false) {
    if (isSave) {
      const options = {
        types: [{
          description: "Mutants & Masterminds 2E Character File (*.mm2e)",
          accept: { "application/json": [".mm2e", ".json"] }
        }]
      };
      if (suggestedName) options.suggestedName = suggestedName;
      if (this.activeDirectoryHandle) options.startIn = this.activeDirectoryHandle;
      else if (this.currentFileHandle) options.startIn = this.currentFileHandle;
      else options.id = "mm2e_character_folder";
      return options;
    }

    const options = {
      types: [
        {
          description: "Mutants & Masterminds Character File (*.mm2e, *.por, *.json)",
          accept: {
            "application/json": [".mm2e", ".json", ".mm4e"],
            "application/octet-stream": [".por", ".mm2e"],
            "application/zip": [".por"]
          }
        },
        {
          description: "Hero Lab Portfolio (*.por)",
          accept: {
            "application/octet-stream": [".por"],
            "application/zip": [".por"]
          }
        },
        {
          description: "All Supported Files (*.mm2e, *.por, *.json)",
          accept: { "*/*": [] }
        }
      ]
    };
    if (suggestedName) {
      options.suggestedName = suggestedName;
    }

    if (this.activeDirectoryHandle) {
      options.startIn = this.activeDirectoryHandle;
    } else if (this.currentFileHandle) {
      options.startIn = this.currentFileHandle;
    } else {
      options.id = "mm2e_character_folder";
    }
    return options;
  },

  // Save As: Opens native OS save dialog to choose any directory/filename, or downloads
  saveHeroAs: async function() {
    if (typeof syncActiveCompanionIfActive === 'function') syncActiveCompanionIfActive();
    const heroToSave = window.primaryHero || char;
    let safeHeroName = heroToSave.name ? heroToSave.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : "hero";
    if (safeHeroName.length > 40) safeHeroName = safeHeroName.slice(0, 40);
    const defaultFileName = `${safeHeroName}.mm2e`.slice(0, 45);
    const payload = JSON.stringify(heroToSave.serialize(), null, 2);

    if (window.showSaveFilePicker) {
      try {
        const pickerOptions = this.getPickerOptions(defaultFileName, true);
        const handle = await window.showSaveFilePicker(pickerOptions);
        const writable = await handle.createWritable();
        await writable.write(payload);
        await writable.close();

        this.currentFileHandle = handle;
        this.currentFileName = handle.name ? handle.name.slice(0, 45) : defaultFileName;
        // Last used save location becomes the starting point for further loads and saves
        if (!this.activeDirectoryName) {
          this.activeDirectoryHandle = handle;
        }
        this.clearDirty();
        showToast(`Saved "${handle.name}" successfully!`, "success");
        return true;
      } catch (err) {
        if (err.name === "AbortError") {
          return false;
        }
        console.warn("showSaveFilePicker error, falling back to download:", err);
      }
    }

    // Fallback download
    this.fallbackDownload(payload, defaultFileName);
    this.currentFileName = defaultFileName;
    this.clearDirty();

    const isFF = typeof navigator !== 'undefined' && (/firefox/i.test(navigator.userAgent) || !window.showSaveFilePicker);
    if (isFF) {
      showToast(`Saving "${defaultFileName}"... Click "OK / Save File" in Firefox to choose your save folder.`, "info", 5000);
    } else {
      showToast(`Saved "${defaultFileName}" to downloads!`, "success");
    }
    return true;
  },

  // Save: Writes directly to the active file handle in-place, or prompts Save As
  saveHero: async function() {
    if (!this.currentFileHandle) {
      return this.saveHeroAs();
    }

    if (typeof syncActiveCompanionIfActive === 'function') syncActiveCompanionIfActive();
    const heroToSave = window.primaryHero || char;
    const payload = JSON.stringify(heroToSave.serialize(), null, 2);
    try {
      const writable = await this.currentFileHandle.createWritable();
      await writable.write(payload);
      await writable.close();
      this.clearDirty();
      showToast(`Saved "${this.currentFileName}" successfully!`, "success");
      return true;
    } catch (err) {
      console.warn("Direct file save failed, reverting to Save As prompt:", err);
      return this.saveHeroAs();
    }
  },

  // Load: Opens native OS open dialog starting in active/last used folder, or opens file input
  loadHero: async function() {
    if (typeof window.showOpenFilePicker === 'function' && window.isSecureContext) {
      try {
        const pickerOptions = this.getPickerOptions();
        pickerOptions.multiple = false;
        let handle;
        try {
          [handle] = await window.showOpenFilePicker(pickerOptions);
        } catch (startInErr) {
          if (startInErr.name !== "AbortError" && (pickerOptions.startIn || pickerOptions.id)) {
            const fallbackOptions = {
              types: [
                {
                  description: "Mutants & Masterminds 2E Character File (*.mm2e, *.json)",
                  accept: {
                    "application/json": [".mm2e", ".json", ".mm4e"],
                    "text/plain": [".mm2e", ".json"],
                    "application/octet-stream": [".mm2e"]
                  }
                },
                {
                  description: "All Files (*.*)",
                  accept: { "*/*": [] }
                }
              ],
              multiple: false
            };
            [handle] = await window.showOpenFilePicker(fallbackOptions);
          } else {
            throw startInErr;
          }
        }

        const file = await handle.getFile();
        if (file.name.toLowerCase().endsWith('.por')) {
          if (window.handlePorImport) {
            await window.handlePorImport(file);
          } else {
            showToast("POR Importer not loaded.", "error");
          }
          this.currentFileHandle = null;
          this.currentFileName = file.name ? file.name.slice(0, 45) : "hero.por";
          this.clearDirty();
          return true;
        }

        const text = await file.text();
        const parsed = JSON.parse(text);

        this.currentFileHandle = handle;
        this.currentFileName = handle.name ? handle.name.slice(0, 45) : "hero.mm2e";
        if (!this.activeDirectoryName) {
          this.activeDirectoryHandle = handle;
        }

        applyLoadedCharacter(parsed);
        this.clearDirty();
        showToast(`Loaded "${handle.name}" successfully!`, "success");
        return true;
      } catch (err) {
        if (err.name === "AbortError") {
          return false;
        }
        console.warn("showOpenFilePicker error, falling back to file input:", err);
      }
    }

    const fileInput = document.getElementById("fileLoadHero");
    if (fileInput) {
      fileInput.click();
    }
  },

  // Explicitly choose a default folder from options
  setCustomFolder: async function() {
    if (window.showDirectoryPicker) {
      try {
        const dirHandle = await window.showDirectoryPicker({
          id: "mm2e_character_folder",
          mode: "readwrite"
        });
        if (dirHandle) {
          this.activeDirectoryHandle = dirHandle;
          this.activeDirectoryName = dirHandle.name;
          await FolderStore.saveFolder(dirHandle, dirHandle.name);
          this.updateFolderUI();
          showToast(`Default folder set to "${dirHandle.name}".`, "success");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.warn("showDirectoryPicker error:", err);
          showToast("Could not access selected folder.", "error");
        }
      }
    } else {
      const modal = document.getElementById("ruleInfoModal");
      const titleEl = document.getElementById("modalRuleTitle");
      const bodyEl = document.getElementById("modalRuleBody");

      if (modal && titleEl && bodyEl) {
        titleEl.textContent = "Folder Settings in Firefox";
        bodyEl.innerHTML = `
          <div style="white-space: normal; line-height: 1.4; font-size: var(--font-size-controls); display: flex; flex-direction: column; gap: 10px;">
            <p style="margin: 0;">Firefox security restricts web pages from directly browsing or changing local computer folders.</p>
            
            <div style="display: flex; gap: 8px;">
              <button type="button" class="btn" style="flex: 1; font-weight: bold; padding: 8px 12px; font-size: var(--font-size-labels); display: flex; align-items: center; justify-content: center; gap: 8px;" onclick="window.openFirefoxSettings()">
                ⚙ Open Firefox Settings (Downloads)
              </button>
            </div>

            <div style="padding: 10px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; display: flex; flex-direction: column; gap: 8px;">
              <div style="font-weight: 600; font-size: var(--font-size-labels); color: var(--accent-primary);">
                How to set your save folder in Firefox:
              </div>
              <ol style="margin: 0 0 0 18px; padding: 0; display: flex; flex-direction: column; gap: 6px; font-size: var(--font-size-secondary);">
                <li>
                  Click the button above to open Settings. If the button doesn't work, open Settings directly from Firefox's menu:
                  <div style="margin: 4px 0; padding: 6px 10px; background: var(--bg-panel); border-radius: 4px; border: 1px solid var(--border-color); font-weight: 600;">
                    👉 Menu button (☰) &gt; Settings &gt; Downloads<br>
                    <span style="font-weight: normal; color: var(--text-muted); font-size: var(--font-size-fine-print);">(or Tools &gt; Settings &gt; Downloads from the top menu)</span>
                  </div>
                </li>
                <li>Under <strong>Files and Applications &gt; Downloads</strong>, check <strong>"Always ask you where to save files"</strong> (or click <strong>Browse...</strong> to set your default folder).</li>
                <li>When saving characters in this app, click <strong>OK / Save File</strong> on Firefox's download prompt to choose your save folder and filename.</li>
              </ol>

              <div style="border-top: 1px dashed var(--border-color); margin-top: 6px; padding-top: 6px;">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <span style="font-weight: 600; font-size: var(--font-size-fine-print); color: var(--text-muted);">Fallback: Manual "About:" Command</span>
                  <button type="button" class="btn btn-secondary" style="font-size: var(--font-size-fine-print); padding: 1px 6px;" onclick="navigator.clipboard.writeText('about:preferences#general').then(() => { this.textContent = '✓ Copied!'; setTimeout(() => this.textContent = '📋 Copy Address', 2000); })">📋 Copy Address</button>
                </div>
                <div style="font-family: ui-monospace, monospace; background: var(--bg-panel); padding: 3px 6px; border-radius: 4px; border: 1px solid var(--border-color); font-size: var(--font-size-fine-print);">
                  <code style="font-weight: bold; color: var(--accent-primary); user-select: all;">about:preferences#general</code>
                </div>
                <div style="font-size: var(--font-size-fine-print); color: var(--text-muted); margin-top: 3px;">Paste into a new tab's address bar as an alternate way to reach Firefox Settings.</div>
              </div>
            </div>

            <p style="margin: 0; color: var(--text-muted); font-size: var(--font-size-secondary);">Tip: Chromium browsers (Chrome, Edge) support direct folder selection through the File System Access API without download prompts.</p>
          </div>
        `;
        modal.classList.add("active");
      } else {
        showToast("Firefox manages save folders in Menu (☰) > Settings > Downloads.", "info");
      }
    }
  },

  // Reset folder location back to project default
  resetFolderToDefault: async function() {
    this.activeDirectoryHandle = null;
    this.activeDirectoryName = null;
    this.currentFileHandle = null;
    await FolderStore.clearFolder();
    this.updateFolderUI();
    showToast("Folder location reset to project default.", "info");
  },

  // New Character: Resets model and UI to clean slate
  newHero: function() {
    const isUnsaved = !this.currentFileName;
    const msg = isUnsaved 
      ? "Create a new hero? Any unsaved changes will be lost." 
      : `Create a new hero? Current file "${this.currentFileName}" will be closed.`;

    if (confirm(msg)) {
      window.isCharacterLoading = true;
      if (window.primaryHero) {
        char = window.primaryHero;
        window.char = char;
        window.primaryHero = null;
        window.activeCompanionId = null;
      }
      window.activeEditorNpcId = null;
      if (typeof window.updateGMEditorStateUI === 'function') window.updateGMEditorStateUI();
      char.reset();
      const btnAudit = document.getElementById("btnOpenImportAudit");
      if (btnAudit) btnAudit.style.display = "none";
      this.currentFileHandle = null;
      this.currentFileName = null;
      populateUIFromCharacter();
      window.isCharacterLoading = false;
      this.clearDirty();
      if (typeof updateCharacterSelectorUI === 'function') updateCharacterSelectorUI();
      showToast("New hero sheet created.", "info");
    }
  },

  fallbackDownload: function(content, filename) {
    // Using octet-stream data URI forces Firefox to trigger the OS Save As picker dialog
    const dataUri = 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(content);
    const a = document.createElement("a");
    a.href = dataUri;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
    }, 1000);
  }
};
window.FileManager = FileManager;

/* ==========================================================================
   ABOUT / README MODAL CONTROLLER
   ========================================================================== */

const DEFAULT_README_TEXT = `# Mutants & Masterminds 2nd Edition Character Editor

A modern, comprehensive, and responsive web-based character editor and sheet manager for the **Mutants & Masterminds 2nd Edition** tabletop roleplaying game.

🌐 **Live Application:** [https://captainload.github.io/mm2e-character-editor/](https://captainload.github.io/mm2e-character-editor/)

---

## Features

### 🦸‍♂️ Complete Point-Buy Calculator
- Live tracking of Power Points spent across **Abilities**, **Combat**, **Saves / Defenses**, **Skills**, **Feats**, and **Powers**.
- Automatic calculation of derived stats (Attack DC, Total Defense, Flat-Footed Defense, Toughness, Flat-Footed Toughness, Knockback, Initiative, Carrying Capacity).
- Accurate rules implementation for combat feats such as **Uncanny Dodge** (retaining Dodge Focus bonuses and Defensive Roll while flat-footed).

### ⚡ Power Construction Engine
- **Full 2E Effect Library**: Browse and configure standard M&M 2E powers (Damage, Blast, Protection, Super-Senses, Movement, Morph, Enhanced Trait, etc.).
- **Dynamic Profile Options**:
  - **Super-Senses**: Visual, Auditory, Olfactory, Tactile, Radio, Mental, and Exotic senses with accurate trait detection.
  - **Movement**: Dimensional Travel, Space Travel, Environmental Adaptation, Permeate, Wall-Crawling, Water-Walking, and more.
  - **Enhanced / Reduced Traits**: Enhanced abilities, feats, skills, and defense modifiers.
- **Modifiers Engine**:
  - Add **Extras**, **Flaws**, and **Power Feats** directly to any effect.
  - Full support for **Progression** modifiers (\`Progression\`, \`Progression (Area)\`, \`Progression (Duration)\`, \`Progression (Mass)\`, \`Progression (Range)\`, \`Progression (Targets)\`) available in both Extras and Feats menus.
  - Steppers with live rank scaling up to 20 ranks and precise cost calculation (+1 flat PP per rank).
- **Power History & Undo/Redo**:
  - Unified history tracking with master **Undo** (\`↶\`) and **Redo** (\`↷\`) buttons.
  - Coalesces rapid stepper clicks into single logical steps with 800ms debounce.
  - Persists up to 100 history states in \`localStorage\` across page refreshes.

### 🎨 User Interface & Accessibility
- **Persistent Top Header**: Sticky top navigation bar containing character summary points and tabs, with an optional toggle under Options to disable if preferred.
- **Theme & Typography**: Curated dark and light color themes, adjustable font sizes, and sleek glassmorphic design elements.
- **Print Optimization**: Clean print stylesheet specifically formatted for paper character sheets (\`Ctrl + P\`).
- **Hero Lab (.por) Importer**: Import existing characters directly from Hero Lab \`.por\` save files.
- **PWA / Offline Support**: Integrated Service Worker for offline functionality and desktop installability.

---

## Getting Started

### Run in Browser (No Installation Required)
Simply visit [https://captainload.github.io/mm2e-character-editor/](https://captainload.github.io/mm2e-character-editor/).

### Run Locally
Because this application is built with standard HTML5, Vanilla CSS, and JavaScript, it requires **zero build tools or dependencies**:
1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/captainload/mm2e-character-editor.git
   \`\`\`
2. Open \`index.html\` in any modern web browser, or double-click \`Launch Hero Builder.bat\` on Windows.

---

## File Structure

- \`index.html\` - Main application markup and modal dialogs.
- \`styles.css\` - Responsive styling, themes, and \`@media print\` rules.
- \`app.js\` - UI controller, event bindings, and Power Construction Engine.
- \`character_model.js\` - Character data model and Point calculation rules engine.
- \`data_powers_effects.js\` - 2nd Edition powers and effect definitions.
- \`data_powers_modifiers.js\` - Extras, Flaws, and Power Feats catalog.
- \`data_feats.js\` - Standard feats list and prerequisite rules.
- \`data_skills.js\` - Skills catalog and attribute linkages.
- \`data_equipment.js\` - Weapons, armor, vehicles, and equipment.
- \`data_tables.js\` & \`data_measurements.js\` - Progression tables and measurement conversions.
- \`por_importer.js\` - Hero Lab \`.por\` file parser.
- \`print.js\` - Character sheet export and print view formatting.
- \`sw.js\` - Service Worker cache manager.

---

## License & Disclaimer
This is an unofficial fan-made project created for educational and personal gaming use. *Mutants & Masterminds* and related marks are trademarks or registered trademarks of Green Ronin Publishing, LLC.`;

function renderReadmeMarkdown(md) {
  if (!md) return '';
  const lines = md.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  let html = '';
  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockContent = [];
  let inUl = false;
  let inOl = false;

  function closeLists() {
    if (inUl) { html += '</ul>\n'; inUl = false; }
    if (inOl) { html += '</ol>\n'; inOl = false; }
  }

  function formatInline(text) {
    let s = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    s = s.replace(/`([^`]+)`/g, '<code class="about-inline-code">$1</code>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="about-link">$1</a>');
    return s;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        html += '<pre class="about-code-block"><code>' + escapeHtml(codeBlockContent.join('\n')) + '</code></pre>\n';
        inCodeBlock = false;
        codeBlockContent = [];
      } else {
        closeLists();
        inCodeBlock = true;
        codeBlockLang = line.trim().slice(3).trim();
        codeBlockContent = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    if (/^(\s*[-*_]\s*){3,}$/.test(line.trim())) {
      closeLists();
      html += '<hr class="about-hr">\n';
      continue;
    }

    const h1Match = line.match(/^#\s+(.+)$/);
    if (h1Match) {
      closeLists();
      html += '<h1 class="about-h1">' + formatInline(h1Match[1]) + '</h1>\n';
      continue;
    }
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      closeLists();
      html += '<h2 class="about-h2">' + formatInline(h2Match[1]) + '</h2>\n';
      continue;
    }
    const h3Match = line.match(/^###\s+(.+)$/);
    if (h3Match) {
      closeLists();
      html += '<h3 class="about-h3">' + formatInline(h3Match[1]) + '</h3>\n';
      continue;
    }

    const ulMatch = line.match(/^(\s*)([-*])\s+(.+)$/);
    if (ulMatch) {
      if (inOl) { html += '</ol>\n'; inOl = false; }
      if (!inUl) { html += '<ul class="about-ul">\n'; inUl = true; }
      const indent = ulMatch[1].length;
      const subClass = indent >= 2 ? ' class="about-li-nested"' : '';
      html += '<li' + subClass + '>' + formatInline(ulMatch[3]) + '</li>\n';
      continue;
    }

    const olMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/);
    if (olMatch) {
      if (inUl) { html += '</ul>\n'; inUl = false; }
      if (!inOl) { html += '<ol start="' + olMatch[2] + '" class="about-ol">\n'; inOl = true; }
      html += '<li>' + formatInline(olMatch[3]) + '</li>\n';
      continue;
    }

    if (!line.trim()) {
      closeLists();
      continue;
    }

    closeLists();
    html += '<p class="about-p">' + formatInline(line) + '</p>\n';
  }

  closeLists();
  if (inCodeBlock) {
    html += '<pre class="about-code-block"><code>' + escapeHtml(codeBlockContent.join('\n')) + '</code></pre>\n';
  }

  return html;
}
window.renderReadmeMarkdown = renderReadmeMarkdown;

window.openAboutModal = async function() {
  const modal = document.getElementById("aboutModal");
  if (!modal) return;
  const bodyEl = document.getElementById("aboutModalBody");
  if (bodyEl && (!bodyEl.innerHTML.trim() || bodyEl.getAttribute("data-loaded") !== "true")) {
    bodyEl.innerHTML = renderReadmeMarkdown(DEFAULT_README_TEXT);
    bodyEl.setAttribute("data-loaded", "true");
  }
  modal.classList.add("active");

  // Only attempt live fetch when running over HTTP / HTTPS (prevents browser CORS errors on file:/// protocol)
  if (window.location && typeof window.location.protocol === 'string' && window.location.protocol.startsWith('http')) {
    try {
      const res = await fetch("README.md");
      if (res.ok) {
        const freshText = await res.text();
        if (freshText && freshText.trim() && bodyEl) {
          bodyEl.innerHTML = renderReadmeMarkdown(freshText);
        }
      }
    } catch (err) {
      // Ignore network errors when offline
    }
  }
};

window.closeAboutModal = function() {
  const modal = document.getElementById("aboutModal");
  if (modal) modal.classList.remove("active");
};

/* ==========================================================================
   FILE & TOOLBAR BUTTON BINDINGS
   ========================================================================== */

function setupFileHandlers() {
  const btnNew = document.getElementById("btnNewHero");
  const btnSave = document.getElementById("btnSaveHero");
  const btnSaveAs = document.getElementById("btnSaveAsHero");
  const btnLoad = document.getElementById("btnLoadHero");
  const fileInput = document.getElementById("fileLoadHero");
  const btnSetFolder = document.getElementById("btnSetCustomFolder");
  const btnResetFolder = document.getElementById("btnResetFolder");

  const btnFileMenu = document.getElementById("btnFileMenu");
  const fileDropdown = document.getElementById("fileDropdownMenu");

  if (btnFileMenu && fileDropdown) {
    btnFileMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      const opts = document.getElementById("optionsModal");
      if (opts) opts.classList.remove("show");
      const isVisible = fileDropdown.style.display === "flex";
      fileDropdown.style.display = isVisible ? "none" : "flex";
    });

    fileDropdown.addEventListener("click", (e) => {
      if (e.target.closest(".file-menu-item")) {
        fileDropdown.style.display = "none";
      }
      e.stopPropagation();
    });

    document.addEventListener("click", () => {
      fileDropdown.style.display = "none";
    });
  }

  const btnAbout = document.getElementById("btnAboutApp");
  if (btnAbout) {
    btnAbout.addEventListener("click", () => {
      if (typeof window.openAboutModal === 'function') {
        window.openAboutModal();
      }
    });
  }

  const btnCloseAbout = document.getElementById("btnCloseAbout");
  const modalAboutClose = document.getElementById("modalAboutClose");
  if (btnCloseAbout) btnCloseAbout.addEventListener("click", () => window.closeAboutModal());
  if (modalAboutClose) modalAboutClose.addEventListener("click", () => window.closeAboutModal());

  const btnPrint = document.getElementById("btnPrintHero");
  if (btnPrint) {
    btnPrint.addEventListener("click", () => {
      if (typeof window.openPrintPreview === 'function') {
        window.openPrintPreview();
      } else if (typeof window.generatePrintSheet === 'function') {
        window.generatePrintSheet();
        window.print();
      } else {
        window.print();
      }
    });
  }

  const btnClosePrintPreview = document.getElementById("btnClosePrintPreview");
  const modalPrintPreviewClose = document.getElementById("modalPrintPreviewClose");
  if (btnClosePrintPreview) btnClosePrintPreview.addEventListener("click", () => {
    if (typeof window.closePrintPreview === 'function') window.closePrintPreview();
  });
  if (modalPrintPreviewClose) modalPrintPreviewClose.addEventListener("click", () => {
    if (typeof window.closePrintPreview === 'function') window.closePrintPreview();
  });

  if (btnNew) btnNew.addEventListener("click", () => FileManager.newHero());
  if (btnSave) btnSave.addEventListener("click", () => FileManager.saveHero());
  if (btnSaveAs) btnSaveAs.addEventListener("click", () => FileManager.saveHeroAs());
  if (btnLoad) {
    btnLoad.addEventListener("click", () => {
      if (!window.isSecureContext || typeof window.showOpenFilePicker !== 'function') {
        const fileInput = document.getElementById("fileLoadHero");
        if (fileInput) {
          fileInput.click();
          return;
        }
      }
      FileManager.loadHero();
    });
  }
  if (btnSetFolder) btnSetFolder.addEventListener("click", () => FileManager.setCustomFolder());
  if (btnResetFolder) btnResetFolder.addEventListener("click", () => FileManager.resetFolderToDefault());

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (file.name.toLowerCase().endsWith('.por')) {
        if (window.handlePorImport) {
          window.handlePorImport(file);
        } else {
          showToast("POR Importer not loaded.", "error");
        }
        fileInput.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        try {
          const loadedData = JSON.parse(uploadEvent.target.result);
          if (window.primaryHero) {
            char = window.primaryHero;
            window.char = char;
            window.primaryHero = null;
            window.activeCompanionId = null;
          }
          window.activeEditorNpcId = null;
          if (typeof window.updateGMEditorStateUI === 'function') window.updateGMEditorStateUI();
          FileManager.currentFileHandle = null;
          FileManager.currentFileName = file.name ? file.name.slice(0, 45) : "hero.mm2e";
          applyLoadedCharacter(loadedData);
          const btnAudit = document.getElementById("btnOpenImportAudit");
          if (btnAudit) btnAudit.style.display = "none";
          FileManager.clearDirty();
          showToast(`Loaded "${file.name}" successfully!`, "success");
        } catch (err) {
          console.error("File load error:", err);
          showToast("Invalid character file format.", "error");
        }
      };
      reader.readAsText(file);
      fileInput.value = "";
    });
  }
}

/* ==========================================================================
   COMPANIONS, MINIONS & ALTERNATE FORMS ENGINE
   ========================================================================== */

function syncActiveCompanionIfActive() {
  if (window.primaryHero && window.activeCompanionId) {
    const companion = (window.primaryHero.companions || []).find(c => c.id === window.activeCompanionId);
    if (companion) {
      companion.name = char.name;
      companion.powerLevel = char.powerLevel;
      companion.totalPointsAllowed = char.totalPointsAllowed;
      companion.characterData = char.serialize().character;
    }
  }
}
window.syncActiveCompanionIfActive = syncActiveCompanionIfActive;

function updateCharacterSelectorUI() {
  const sel = document.getElementById("selActiveCharacterContext");
  const heroRoot = window.primaryHero || char;
  const companions = heroRoot.companions || [];

  if (sel) {
    const isNPC = !!window.activeEditorNpcId;
    const mainIcon = isNPC ? "👤 NPC: " : "🦸 Main Hero: ";
    let optionsHtml = `<option value="main">${mainIcon}${heroRoot.name || (isNPC ? "NPC" : "New Hero")} (PL ${heroRoot.powerLevel})</option>`;
    
    if (companions.length > 0) {
      const typeLabels = {
        sidekick: "🤝 Sidekicks",
        minion: "👥 Minions",
        summon: "👥 Summoned Creatures",
        duplicate: "👥 Duplicates",
        metamorph: "🔄 Alternate Forms / Metamorph",
        mecha: "🤖 Mecha"
      };
      
      const groups = {};
      companions.forEach(c => {
        const t = c.type || "sidekick";
        if (!groups[t]) groups[t] = [];
        groups[t].push(c);
      });

      for (const [t, list] of Object.entries(groups)) {
        const groupLabel = typeLabels[t] || "Companions";
        optionsHtml += `<optgroup label="${groupLabel}">`;
        list.forEach(c => {
          let spent = 0;
          let isMechaComp = (c.type === "mecha");
          if (window.activeCompanionId === c.id) {
            spent = char.powerPointsSummary.totalSpent;
            isMechaComp = char.isMecha;
          } else if (c.characterData) {
            const tempModel = new CharacterModel();
            tempModel.deserialize(c.characterData);
            spent = tempModel.powerPointsSummary.totalSpent;
            isMechaComp = tempModel.isMecha || (c.type === "mecha");
          }
          const unit = isMechaComp ? "MP" : "PP";
          const compName = (c.name && c.name.trim()) ? c.name : getGenericCompanionName(c, heroRoot);
          optionsHtml += `<option value="${c.id}">${compName} (PL ${c.powerLevel} - ${spent}/${c.totalPointsAllowed} ${unit})</option>`;
        });
        optionsHtml += `</optgroup>`;
      }
    }
    optionsHtml += `
      <optgroup label="➕ Add Character / Form">
        <option value="__new_hero__">✨ + New Hero (Fresh Sheet)...</option>
        <option value="__add_alt_form__">🔄 + New Alternate Form (Metamorph)...</option>
        <option value="__add_mecha__">🤖 + New Mecha Form...</option>
        <option value="__add_sidekick__">🤝 + New Sidekick...</option>
        <option value="__add_minion__">👥 + New Minion...</option>
        <option value="__add_summon__">👥 + New Summoned Creature...</option>
        <option value="__add_duplicate__">👥 + New Duplicate...</option>
      </optgroup>
    `;
    sel.innerHTML = optionsHtml;
    sel.value = window.activeCompanionId || "main";

    const lblRole = document.getElementById("lblContextRole");
    if (lblRole) {
      lblRole.textContent = "Character/Form:";
    }
  }

  // Update Sticky Companion Active Banner
  const banner = document.getElementById("companionActiveBanner");
  const bannerTitle = document.getElementById("lblCompanionBannerTitle");
  const bannerBudget = document.getElementById("lblCompanionBannerBudget");
  const btnReturnToHero = document.getElementById("btnReturnToPrimaryHero");

  if (banner) {
    if (window.activeCompanionId && window.primaryHero) {
      banner.style.display = "flex";
      const comp = (window.primaryHero.companions || []).find(c => c.id === window.activeCompanionId);
      const isMecha = (comp && comp.type === "mecha") || char.isMecha;
      const cType = comp ? (comp.type === "mecha" ? "Mecha" : (comp.type.charAt(0).toUpperCase() + comp.type.slice(1))) : "Companion";
      const unit = isMecha ? "MP" : "PP";

      if (isMecha) {
        banner.style.background = "linear-gradient(90deg, #0284c7 0%, #1e40af 100%)";
      } else {
        banner.style.background = "#0284c7";
      }

      if (bannerTitle) {
        const displayCompName = (char.name && char.name.trim()) || (comp ? getGenericCompanionName(comp, window.primaryHero) : "Companion");
        bannerTitle.textContent = `${isMecha ? '🤖' : '👥'} Editing ${cType}: ${displayCompName} (PL ${char.powerLevel})`;
      }
      if (bannerBudget) {
        const spent = char.powerPointsSummary.totalSpent;
        const total = char.totalPointsAllowed;
        const isOver = spent > total;
        bannerBudget.textContent = `${spent} / ${total} ${unit} ${isOver ? '⚠️ (Over Budget)' : '✓'}`;
        bannerBudget.style.background = isOver ? "#ef4444" : "rgba(255,255,255,0.25)";
      }
      if (btnReturnToHero) {
        btnReturnToHero.textContent = isMecha ? "⬅ Return to Pilot" : "⬅ Return to Main Hero";
      }
    } else {
      banner.style.display = "none";
    }
  }

  // If currently on tab-companions, re-render it
  const companionsTab = document.getElementById("tab-companions");
  if (companionsTab && companionsTab.classList.contains("active")) {
    buildCompanionsUI();
  }
}
window.updateCharacterSelectorUI = updateCharacterSelectorUI;

function buildCompanionsUI() {
  syncActiveCompanionIfActive();
  const container = document.getElementById("companionsContainer");
  if (!container) return;

  const rootHero = window.primaryHero || char;
  const companions = rootHero.companions || [];

  if (companions.length === 0) {
    container.innerHTML = `
      <div style="padding: 32px 16px; text-align: center; background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: 8px; color: var(--text-muted); margin-top: 10px;">
        <div style="font-size: 36px; margin-bottom: 8px;">👥</div>
        <h3 style="font-size: var(--font-size-labels); margin-bottom: 6px; color: var(--text-main);">No Companions, Minions, or Alternate Forms Added Yet</h3>
        <p style="font-size: var(--font-size-controls); max-width: 600px; margin: 0 auto 16px auto; line-height: 1.5;">
          You can create loyal sidekicks (5 PP/rank), expendable minions (15 PP/rank), summoned creatures, duplicate clones, or alternate metamorph forms with full character sheets.
        </p>
        <button type="button" class="btn" onclick="openCreateCompanionModal()" style="font-size: var(--font-size-controls); padding: 8px 16px;">
          + Add Companion or Form
        </button>
      </div>
    `;
    return;
  }

  let html = `<div style="display: flex; flex-direction: column; gap: 14px; margin-top: 12px;">`;

  companions.forEach((comp) => {
    const isCurrentlyActive = (window.activeCompanionId === comp.id);
    let compModel;
    if (isCurrentlyActive) {
      compModel = char;
    } else if (comp.characterData) {
      compModel = new CharacterModel();
      compModel.deserialize(comp.characterData);
    } else {
      compModel = new CharacterModel();
      compModel.name = comp.name;
      compModel.powerLevel = comp.powerLevel;
      compModel.totalPointsAllowed = comp.totalPointsAllowed;
    }

    const spent = compModel.powerPointsSummary.totalSpent;
    const totalAllowed = comp.totalPointsAllowed || (comp.powerLevel * 15);
    const isOver = spent > totalAllowed;
    const typeLabel = {
      sidekick: "🤝 Sidekick",
      minion: "👥 Minion",
      summon: "👥 Summoned Creature",
      duplicate: "👥 Duplicate Minion",
      metamorph: "🔄 Alternate Form / Metamorph",
      mecha: "🤖 Mecha"
    }[comp.type] || "Companion";

    const typeBadgeBg = {
      sidekick: "#0284c7",
      minion: "#f59e0b",
      summon: "#ea580c",
      duplicate: "#6366f1",
      metamorph: "#8b5cf6",
      mecha: "#0284c7"
    }[comp.type] || "#475569";

    const isMechaComp = (comp.type === "mecha") || compModel.isMecha;
    const unit = isMechaComp ? "MP" : "PP";

    const ppSummary = compModel.powerPointsSummary;
    const topPowers = (compModel.powers || []).slice(0, 4).map(p => p.name).join(", ");
    const topFeats = Object.keys(compModel.feats || {}).slice(0, 4).join(", ");

    html += `
      <div class="panel" style="padding: 14px; border: 2px solid ${isCurrentlyActive ? '#0284c7' : 'var(--border-color)'}; background: var(--bg-panel); border-radius: 8px; box-shadow: ${isCurrentlyActive ? '0 0 10px rgba(2,132,199,0.3)' : 'none'};">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span class="badge" style="background: ${typeBadgeBg}; color: #ffffff; font-weight: bold; font-size: var(--font-size-tags); text-transform: uppercase;">${typeLabel}</span>
              <h3 style="font-size: var(--font-size-labels); margin: 0; color: var(--text-main); font-weight: bold;">${(comp.name && comp.name.trim()) || (compModel.name && compModel.name.trim()) || getGenericCompanionName(comp, rootHero)}</h3>
              <span class="badge" style="background: var(--bg-card); color: var(--text-main); font-size: var(--font-size-tags); border: 1px solid var(--border-color);">PL ${comp.powerLevel}</span>
              ${isCurrentlyActive ? `<span class="badge" style="background: #10b981; color: #fff; font-weight: bold; font-size: var(--font-size-tags);">⚡ Currently Active Sheet</span>` : ''}
            </div>
            <div style="margin-top: 6px; font-size: var(--font-size-secondary); color: var(--text-muted);">
              Abilities: STR ${compModel.getAbilityRank("STR") ?? '—'}, DEX ${compModel.getAbilityRank("DEX") ?? '—'}, CON ${compModel.getAbilityRank("CON") ?? '—'}, INT ${compModel.getAbilityRank("INT") ?? '—'}, WIS ${compModel.getAbilityRank("WIS") ?? '—'}, CHA ${compModel.getAbilityRank("CHA") ?? '—'}
              | Combat: ATK +${compModel.getCombatRank("ATK")}, DEF +${compModel.getCombatRank("DEF")}
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <div style="text-align: right; margin-right: 6px;">
              <span style="font-size: var(--font-size-secondary); display: block; color: var(--text-muted);">Budget:</span>
              <span class="badge" style="background: ${isOver ? '#ef4444' : 'rgba(16, 185, 129, 0.15)'}; color: ${isOver ? '#fff' : '#10b981'}; font-weight: bold; font-size: var(--font-size-tags); border: 1px solid ${isOver ? '#ef4444' : '#10b981'};">
                ${spent} / ${totalAllowed} ${unit} ${isOver ? '⚠️ (Over Budget)' : '✓'}
              </span>
            </div>

            ${isCurrentlyActive ? `
              <button type="button" class="btn" style="background: #0284c7; font-weight: bold;" onclick="returnToPrimaryHero()">${isMechaComp ? '⬅ Return to Pilot' : '⬅ Back to Hero'}</button>
            ` : `
              <button type="button" class="btn" style="background: var(--accent-primary); font-weight: bold;" onclick="switchToCompanion('${comp.id}')">✏️ Edit Sheet</button>
            `}

            <button type="button" class="btn btn-secondary" style="font-size: var(--font-size-minor-controls);" onclick="exportCompanionStandalone('${comp.id}')" title="Export as standalone .mm2e file">💾 Export</button>
            <button type="button" class="btn-delete-power" style="margin-left: 4px;" onclick="deleteCompanion('${comp.id}')" title="Delete this companion">✕</button>
          </div>
        </div>

        <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed var(--border-color); display: flex; flex-wrap: wrap; gap: 12px; font-size: var(--font-size-secondary);">
          <div><strong style="color: var(--text-main);">Points:</strong> Abil: ${ppSummary.abilities} ${unit}, Combat: ${ppSummary.combat} ${unit}, Saves: ${ppSummary.resistances} ${unit}, Skills: ${ppSummary.skills} ${unit}, Feats: ${ppSummary.feats} ${unit}, Powers: ${ppSummary.powers} ${unit}</div>
          ${topPowers ? `<div><strong style="color: var(--text-main);">Powers:</strong> ${topPowers}</div>` : ''}
          ${topFeats ? `<div><strong style="color: var(--text-main);">Feats:</strong> ${topFeats}</div>` : ''}
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}
window.buildCompanionsUI = buildCompanionsUI;

function updateCompanionModalDefaults(prefillSource) {
  const rootHero = window.primaryHero || char;
  const selType = document.getElementById("selCompanionType");
  const txtName = document.getElementById("txtCompanionName");
  const numPL = document.getElementById("numCompanionPL");
  const numBudget = document.getElementById("numCompanionBudget");
  const boxHint = document.getElementById("boxCompanionHint");
  if (!selType) return;

  const type = selType.value;
  let defaultName = "New Sidekick";
  let pl = rootHero.powerLevel;
  let budget = 50;
  let hint = "";

  if (type === "sidekick") {
    const sidekickRanks = (rootHero.feats && rootHero.feats["Sidekick"]) ? rootHero.feats["Sidekick"] : 10;
    budget = sidekickRanks * 5;
    pl = Math.min(rootHero.powerLevel, Math.floor(budget / 15) || rootHero.powerLevel);
    defaultName = `${rootHero.name}'s Sidekick`;
    hint = `<strong>Sidekick Rules:</strong> Sidekicks receive <strong>5 PP per rank</strong> of the Sidekick feat (Current: Rank ${sidekickRanks} = ${budget} PP). A sidekick's Power Level cannot exceed the hero's PL (${rootHero.powerLevel}).`;
  } else if (type === "minion") {
    const minionRanks = (rootHero.feats && rootHero.feats["Minions"]) ? rootHero.feats["Minions"] : 5;
    budget = minionRanks * 15;
    pl = Math.min(rootHero.powerLevel, minionRanks);
    defaultName = "Minion";
    hint = `<strong>Minion Rules:</strong> Minions receive <strong>15 PP per rank</strong> of the Minions feat (Current: Rank ${minionRanks} = ${budget} PP). Minions are subject to the standard minion rules (failing a save renders them incapacitated).`;
  } else if (type === "summon") {
    let summonRank = 8;
    if (prefillSource && prefillSource.pIdx !== undefined && prefillSource.eIdx !== undefined) {
      const eff = rootHero.activePowers[prefillSource.pIdx]?.effects[prefillSource.eIdx];
      if (eff && eff.rank) summonRank = parseInt(eff.rank) || 8;
    }
    pl = summonRank;
    budget = summonRank * 15;
    defaultName = "Summoned Minion";
    hint = `<strong>Summon Rules:</strong> Summoned creatures receive <strong>15 PP per rank</strong> of the Summon power (Current: Rank ${summonRank} = ${budget} PP). Max Power Level cannot exceed the Summon rank (${summonRank}).`;
  } else if (type === "duplicate") {
    pl = rootHero.powerLevel;
    budget = rootHero.totalPointsAllowed;
    defaultName = `${rootHero.name} (Duplicate)`;
    hint = `<strong>Duplication Rules:</strong> A duplicate is an identical copy of the hero (with Duplication removed), treated as a minion. Starts with full hero traits and budget (${budget} PP).`;
  } else if (type === "metamorph") {
    pl = rootHero.powerLevel;
    budget = rootHero.totalPointsAllowed;
    defaultName = `${rootHero.name} (Alternate Form)`;
    hint = `<strong>Metamorph Rules:</strong> Metamorph grants an entirely distinct character sheet with the same total Power Points budget (${budget} PP) and campaign Power Level (${pl}).`;
  } else if (type === "mecha") {
    const eqRanks = (rootHero.feats && rootHero.feats["Equipment"]) ? rootHero.feats["Equipment"] : 0;
    const eqBudget = eqRanks * 5;
    budget = eqBudget > 0 ? eqBudget : (rootHero.powerLevel * 15);
    pl = rootHero.powerLevel;
    defaultName = `${rootHero.name}'s Mecha`;
    hint = `<strong>Mecha Rules (Mecha & Manga / Core):</strong> Mecha are piloted machine constructs. Standard mecha have Strength and Dexterity, but no Constitution, and no mental abilities unless equipped with an Onboard AI. In Mecha campaigns or when built independently, budget uses Mecha Points (MP) based on PL (${rootHero.powerLevel * 15} MP for PL ${rootHero.powerLevel}), or 5 MP per rank of the Equipment feat.`;
  }

  const lblBudgetTitle = document.getElementById("lblCompanionBudgetTitle");
  if (lblBudgetTitle) {
    lblBudgetTitle.textContent = type === "mecha" ? "Mecha Points Budget (MP):" : "PP Budget Allowed:";
  }

  const allowAltFormVariablePL = (char && char.houseRules && char.houseRules.allowAltFormVariablePL) || (localStorage.getItem("mm2e_houserule_alt_form_variable_pl") === "true");

  if (txtName) {
    txtName.value = "";
  }
  if (numPL) {
    numPL.value = pl;
    if (type === "metamorph" && !allowAltFormVariablePL) {
      numPL.disabled = true;
      numPL.title = "Alternate Forms must share the primary hero's Power Level. Enable variable PL in Options to change.";
    } else {
      numPL.disabled = false;
      numPL.title = "";
    }
  }
  if (numBudget) numBudget.value = budget;
  if (boxHint) boxHint.innerHTML = hint;

  const chkOverride = document.getElementById("chkOverrideCompanionPL");
  if (chkOverride && numBudget) {
    const isStandard = (budget === pl * 15);
    chkOverride.checked = !isStandard;
    numBudget.readOnly = !chkOverride.checked;
    numBudget.style.background = chkOverride.checked ? "var(--bg-panel)" : "var(--bg-app)";
  }
}

function createAndSwitchToCompanion(type, customName) {
  syncActiveCompanionIfActive();
  const rootHero = window.primaryHero || char;
  
  const existingCount = (rootHero.companions || []).filter(c => c.type === type).length;
  const nextIdx = existingCount + 1;
  const genericPlaceholder = getGenericCompanionNameByType(type, nextIdx);

  const chosenName = (customName && typeof customName === 'string') ? customName.trim() : "";
  const nameForComp = chosenName;
  const charModelName = chosenName;

  const pl = rootHero.powerLevel || 10;
  let budget = pl * 15;
  if (type === "metamorph") {
    budget = rootHero.totalPointsAllowed || (pl * 15);
  }

  const newComp = {
    id: "comp_" + Math.random().toString(36).substr(2, 9),
    type: type,
    name: nameForComp,
    powerLevel: pl,
    totalPointsAllowed: budget,
    characterData: null
  };

  const temp = new CharacterModel();
  if (type === "duplicate") {
    const heroCopy = JSON.parse(JSON.stringify(rootHero.serialize().character));
    heroCopy.name = charModelName;
    if (heroCopy.powers && Array.isArray(heroCopy.powers)) {
      heroCopy.powers = heroCopy.powers.filter(c => {
        if (!c.effects) return true;
        return !c.effects.some(e => e.effectName === "Duplication");
      });
    }
    temp.deserialize(heroCopy);
    temp.powerLevel = pl;
    temp.totalPointsAllowed = budget;
  } else if (type === "mecha") {
    temp.name = charModelName;
    temp.powerLevel = pl;
    temp.totalPointsAllowed = budget;
    temp.sizeCategory = "Huge";
    temp.setMechaMode(true, false);
  } else {
    temp.name = charModelName;
    temp.powerLevel = pl;
    temp.totalPointsAllowed = budget;
  }
  newComp.characterData = temp.serialize().character;

  if (!rootHero.companions) rootHero.companions = [];
  rootHero.companions.push(newComp);

  const modal = document.getElementById("companionCreateModal");
  if (modal) modal.classList.remove("active");

  switchToCompanion(newComp.id);

  const tabBtn = (typeof document !== 'undefined' && typeof document.querySelector === 'function')
    ? document.querySelector('.tab-btn[data-tab="tab-basics"]')
    : null;
  if (tabBtn && typeof tabBtn.click === 'function') tabBtn.click();
  const nameInput = document.getElementById("heroNameInput");
  if (nameInput) {
    nameInput.placeholder = genericPlaceholder;
    nameInput.value = chosenName;
    if (typeof nameInput.focus === 'function') nameInput.focus();
    if (chosenName && typeof nameInput.select === 'function') nameInput.select();
  }

  const toastLabel = chosenName || genericPlaceholder;
  showToast(`Created new ${toastLabel.toLowerCase()}! Now editing sheet.`, "success");
  return newComp;
}
window.createAndSwitchToCompanion = createAndSwitchToCompanion;

function openCreateCompanionModal(prefillType, prefillSource) {
  const selType = document.getElementById("selCompanionType");
  if (selType && prefillType) {
    selType.value = prefillType;
  }
  updateCompanionModalDefaults(prefillSource);
  const txtName = document.getElementById("txtCompanionName");
  if (txtName) {
    txtName.value = "";
    if (typeof txtName.focus === 'function') txtName.focus();
  }
  return createAndSwitchToCompanion(prefillType || "sidekick");
}
window.openCreateCompanionModal = openCreateCompanionModal;

function handleConfirmCreateCompanion() {
  const rootHero = window.primaryHero || char;
  const selType = document.getElementById("selCompanionType");
  const txtName = document.getElementById("txtCompanionName");
  const numPL = document.getElementById("numCompanionPL");
  const numBudget = document.getElementById("numCompanionBudget");
  const modal = document.getElementById("companionCreateModal");

  const type = selType ? selType.value : "sidekick";
  let fallbackName = "New Companion";
  if (type === "mecha") fallbackName = "New Mecha";
  else if (type === "metamorph") fallbackName = "New Alternate Form";
  else if (type === "duplicate") fallbackName = "New Duplicate";
  else if (type === "sidekick") fallbackName = "New Sidekick";
  else if (type === "minion") fallbackName = "New Minion";
  else if (type === "summon") fallbackName = "New Summon";

  const name = (txtName && txtName.value.trim()) ? txtName.value.trim() : "";
  const pl = numPL ? (parseInt(numPL.value) || 10) : 10;
  const budget = numBudget ? (parseInt(numBudget.value) || (pl * 15)) : (pl * 15);

  const newComp = {
    id: "comp_" + Math.random().toString(36).substr(2, 9),
    type: type,
    name: name,
    powerLevel: pl,
    totalPointsAllowed: budget,
    characterData: null
  };

  const temp = new CharacterModel();
  if (type === "duplicate") {
    const heroCopy = JSON.parse(JSON.stringify(rootHero.serialize().character));
    heroCopy.name = name;
    if (heroCopy.powers && Array.isArray(heroCopy.powers)) {
      heroCopy.powers = heroCopy.powers.filter(c => {
        if (!c.effects) return true;
        return !c.effects.some(e => e.effectName === "Duplication");
      });
    }
    temp.deserialize(heroCopy);
    temp.powerLevel = pl;
    temp.totalPointsAllowed = budget;
  } else if (type === "mecha") {
    temp.name = name;
    temp.powerLevel = pl;
    temp.totalPointsAllowed = budget;
    temp.sizeCategory = "Huge"; // 30 ft tall canonical starting mecha size
    temp.setMechaMode(true, false);
  } else {
    temp.name = name;
    temp.powerLevel = pl;
    temp.totalPointsAllowed = budget;
  }
  newComp.characterData = temp.serialize().character;

  if (!rootHero.companions) rootHero.companions = [];
  rootHero.companions.push(newComp);

  if (modal) modal.classList.remove("active");
  switchToCompanion(newComp.id);
  const typeLabel = (type === "mecha") ? "mecha" : (type === "metamorph") ? "alternate form" : (type || "companion");
  showToast(`Created ${newComp.name}! Now editing ${typeLabel} sheet.`, "success");
}

function setupCompanionModalHandlers() {
  const modal = document.getElementById("companionCreateModal");
  const btnOpen = document.getElementById("btnOpenAddCompanionModal");
  const btnClose = document.getElementById("modalCompanionClose");
  const btnCancel = document.getElementById("btnCancelCompanionModal");
  const btnConfirm = document.getElementById("btnConfirmCreateCompanion");
  const selType = document.getElementById("selCompanionType");
  const btnImport = document.getElementById("btnImportCompanion");
  const fileImport = document.getElementById("fileImportCompanion");

  if (btnOpen) {
    btnOpen.addEventListener("click", () => openCreateCompanionModal());
  }

  if (btnClose) {
    btnClose.addEventListener("click", () => {
      if (modal) modal.classList.remove("active");
    });
  }

  if (btnCancel) {
    btnCancel.addEventListener("click", () => {
      if (modal) modal.classList.remove("active");
    });
  }

  if (selType) {
    selType.addEventListener("change", () => updateCompanionModalDefaults());
  }

  if (btnConfirm) {
    btnConfirm.addEventListener("click", () => handleConfirmCreateCompanion());
  }

  const numPL = document.getElementById("numCompanionPL");
  const numBudget = document.getElementById("numCompanionBudget");
  const chkOverride = document.getElementById("chkOverrideCompanionPL");

  if (numPL) {
    const syncBudgetWithPL = () => {
      const isOverridden = chkOverride && chkOverride.checked;
      if (!isOverridden && numBudget) {
        const plVal = parseInt(numPL.value) || 0;
        numBudget.value = Math.max(0, plVal * 15);
      }
    };
    numPL.addEventListener("input", syncBudgetWithPL);
    numPL.addEventListener("change", syncBudgetWithPL);
  }

  if (chkOverride) {
    chkOverride.addEventListener("change", (e) => {
      if (numBudget) {
        numBudget.readOnly = !e.target.checked;
        numBudget.style.background = e.target.checked ? "var(--bg-panel)" : "var(--bg-app)";
        if (!e.target.checked && numPL) {
          const plVal = parseInt(numPL.value) || 0;
          numBudget.value = Math.max(0, plVal * 15);
        } else if (e.target.checked) {
          if (typeof numBudget.focus === 'function') numBudget.focus();
        }
      }
    });
  }

  if (btnImport && fileImport) {
    btnImport.addEventListener("click", () => fileImport.click());
    fileImport.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target.result);
          const temp = new CharacterModel();
          temp.deserialize(parsed);
          const rootHero = window.primaryHero || char;
          if (!rootHero.companions) rootHero.companions = [];
          const newComp = {
            id: "comp_" + Math.random().toString(36).substr(2, 9),
            type: "sidekick",
            name: temp.name || "Imported Companion",
            powerLevel: temp.powerLevel || 10,
            totalPointsAllowed: temp.totalPointsAllowed || (temp.powerLevel * 15),
            characterData: temp.serialize().character
          };
          rootHero.companions.push(newComp);
          updateCharacterSelectorUI();
          buildCompanionsUI();
          showToast(`Imported "${newComp.name}" into Companions!`, "success");
        } catch (err) {
          console.error("Companion import error:", err);
          showToast("Failed to import companion file.", "error");
        }
      };
      reader.readAsText(file);
      fileImport.value = "";
    });
  }
}
window.setupCompanionModalHandlers = setupCompanionModalHandlers;

window.buildOrEditCompanionForSource = function(type, pIdx, eIdx) {
  syncActiveCompanionIfActive();
  const rootHero = window.primaryHero || char;
  const companions = rootHero.companions || [];
  let matches = companions.filter(c => c.type === type);

  // Fallback matching: summon <-> minion, duplicate <-> minion
  if (matches.length === 0) {
    if (type === 'summon' || type === 'duplicate') {
      matches = companions.filter(c => c.type === type || c.type === 'minion');
    } else if (type === 'minion') {
      matches = companions.filter(c => c.type === 'minion' || c.type === 'summon' || c.type === 'duplicate');
    }
  }

  if (matches.length === 0) {
    openCreateCompanionModal(type, { pIdx, eIdx });
  } else if (matches.length === 1) {
    switchToCompanion(matches[0].id);
  } else {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
    const compTabBtn = document.querySelector('.tab-btn[data-tab="tab-companions"]');
    if (compTabBtn) compTabBtn.classList.add("active");
    const compTabContent = document.getElementById("tab-companions");
    if (compTabContent) compTabContent.classList.add("active");
    buildCompanionsUI();
  }
};

function switchToCompanion(companionId) {
  syncActiveCompanionIfActive();
  if (!window.primaryHero) {
    window.primaryHero = char;
  }
  const rootHero = window.primaryHero;
  const companion = (rootHero.companions || []).find(c => c.id === companionId);
  if (!companion) return;

  window.activeCompanionId = companionId;
  char = new CharacterModel();
  window.char = char;

  if (companion.characterData) {
    char.deserialize(companion.characterData);
  } else {
    char.name = companion.name;
    char.powerLevel = companion.powerLevel;
    char.totalPointsAllowed = companion.totalPointsAllowed;
    if (companion.type === "mecha") {
      char.sizeCategory = "Huge";
      char.setMechaMode(true, false);
    }
  }
  char.powerLevel = companion.powerLevel;
  char.totalPointsAllowed = companion.totalPointsAllowed;
  if (companion.type === "mecha") {
    char.isMecha = true;
  }

  populateUIFromCharacter();
  updateCharacterSelectorUI();
  const typeMsg = companion.type === "mecha" ? "🤖 Editing Mecha:" : "Editing";
  showToast(`${typeMsg} ${companion.name}.`, "info");
}
window.switchToCompanion = switchToCompanion;

function returnToPrimaryHero() {
  if (!window.primaryHero) return;
  syncActiveCompanionIfActive();
  char = window.primaryHero;
  window.char = char;
  window.primaryHero = null;
  window.activeCompanionId = null;

  populateUIFromCharacter();
  updateCharacterSelectorUI();
  showToast(`Returned to ${char.name}.`, "info");
}
window.returnToPrimaryHero = returnToPrimaryHero;

window.deleteCompanion = function(companionId) {
  if (!confirm("Delete this companion/form? This cannot be undone.")) return;
  if (window.activeCompanionId === companionId) {
    returnToPrimaryHero();
  }
  const rootHero = window.primaryHero || char;
  rootHero.companions = (rootHero.companions || []).filter(c => c.id !== companionId);
  updateCharacterSelectorUI();
  buildCompanionsUI();
  showToast("Companion removed.", "info");
};

window.exportCompanionStandalone = function(companionId) {
  syncActiveCompanionIfActive();
  const rootHero = window.primaryHero || char;
  const companion = (rootHero.companions || []).find(c => c.id === companionId);
  if (!companion) return;

  let compModel;
  if (window.activeCompanionId === companionId) {
    compModel = char;
  } else if (companion.characterData) {
    compModel = new CharacterModel();
    compModel.deserialize(companion.characterData);
  } else {
    compModel = new CharacterModel();
    compModel.name = companion.name;
    compModel.powerLevel = companion.powerLevel;
    compModel.totalPointsAllowed = companion.totalPointsAllowed;
  }

  const payload = JSON.stringify(compModel.serialize(), null, 2);
  const safeName = (compModel.name || "companion").replace(/[^a-z0-9]/gi, '_').toLowerCase();
  FileManager.fallbackDownload(payload, `${safeName}.mm2e`);
  showToast(`Exported "${compModel.name}" as standalone .mm2e file!`, "success");
};

window.toggleMechaMode = function(explicitVal) {
  // Case 1: If currently editing/piloting a mecha companion/form, switch back to pilot
  if (window.activeCompanionId && window.primaryHero) {
    const comp = (window.primaryHero.companions || []).find(c => c.id === window.activeCompanionId);
    if (comp && comp.type === "mecha") {
      returnToPrimaryHero();
      return;
    }
  }

  const rootHero = window.primaryHero || char;
  const mechaForms = (rootHero.companions || []).filter(c => c.type === "mecha");

  // Case 2: If root hero is already a standalone mecha sheet (loaded from standalone file)
  if (char.isMecha && !window.primaryHero && mechaForms.length === 0) {
    const newMode = (explicitVal !== undefined) ? !!explicitVal : !char.isMecha;
    char.setMechaMode(newMode, char.hasAI);
    populateUIFromCharacter();
    updateCharacterSelectorUI();
    showToast(newMode ? "🤖 Mecha Mode Enabled" : "Mecha Mode Disabled", "info");
    return;
  }

  // Case 3: If on Pilot and mecha forms exist, board the mecha!
  if (mechaForms.length > 0) {
    switchToCompanion(mechaForms[0].id);
    return;
  }

  // Case 4: No mecha form added yet -> Prevent switching pilot to mecha mode!
  showToast("No Mecha form found. Please add a Mecha form for this character first!", "warning");
  openCreateCompanionModal("mecha");
};

