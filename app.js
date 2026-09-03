const char = new CharacterModel();
window.char = char;
char.powers = [];

let skillSort = { col: "name", asc: true };
let advSort = { col: "name", asc: true };

let skillsDisplayList = typeof SKILLS_LIST !== 'undefined' ? [...SKILLS_LIST] : [];
let advantagesDisplayList = typeof ADVANTAGES_LIST !== 'undefined' ? [...ADVANTAGES_LIST] : [];


// --- EFFECT TYPE TO ALLOWED MODIFIERS FILTER ---
const PROGRESSION_EXTRAS = [
  "Progression", "Progression (Area)", "Progression (Duration)", "Progression (Mass)", "Progression (Range)", "Progression (Targets)"
];

const UNIVERSAL_FEATS = [
  "Innate", "Precise", "Reversible", "Slow Fade", "Subtle", "Transmutation", "Triggered", "Variable Descriptor"
];

const MODIFIER_CATEGORY_MAP = {
  Attack: [
    "Action (Extra)", "Action (Flaw)", "Affects Corporeal", "Affects Insubstantial", "Affects Objects", "Alternate Save", "Area", "Aura", "Autofire", "Contagious", "Disease", "Duration (Extra)", "Duration (Flaw)", "Linked", "No Saving Throw", "Penetrating", "Poison", "Range (Extra)", "Range (Flaw)", "Reaction", "Secondary Effect", "Selective Attack", "Sleep", "Targeted", "Vampiric", "Continuous", "Sustained",
    "Check Required", "Concentration", "Distracting", "Fades", "Feedback", "Full Power", "Grab-Based", "Inaccurate", "Limited", "Noticeable", "Permanent", "Personal", "Require Material", "Resistible", "Sense-Dependent", "Side-Effect", "Tiring", "Touch", "Unreliable",
    "Accurate", "Dimensional", "Extended Reach", "Homing", "Improved Critical", "Improved Range", "Incurable", "Indirect", "Mighty", "Ricochet", "Sedation", "Split Attack", "Tether", "Thrown",
    ...PROGRESSION_EXTRAS,
    ...UNIVERSAL_FEATS
  ],
  Defense: [
    "Action (Extra)", "Action (Flaw)", "Affects Others", "Area", "Continuous", "Duration (Extra)", "Duration (Flaw)", "Independent", "Linked", "Reaction", "Sustained", "Total Fade",
    "Check Required", "Concentration", "Distracting", "Fades", "Limited", "Noticeable", "Permanent", "Personal", "Require Material", "Sense-Dependent", "Side-Effect", "Tiring", "Unreliable",
    "Affects Insubstantial", "Dimensional",
    ...PROGRESSION_EXTRAS,
    ...UNIVERSAL_FEATS
  ],
  Movement: [
    "Action (Extra)", "Action (Flaw)", "Affects Others", "Area", "Continuous", "Duration (Extra)", "Duration (Flaw)", "Independent", "Linked", "Reaction", "Sustained", "Targeted", "Total Fade",
    "Check Required", "Concentration", "Distracting", "Fades", "Limited", "Noticeable", "Permanent", "Require Material", "Sense-Dependent", "Side-Effect", "Tiring", "Unreliable",
    "Dimensional", "Extended Reach", "Terminal Velocity",
    ...PROGRESSION_EXTRAS,
    ...UNIVERSAL_FEATS
  ],
  Sensory: [
    "Action (Extra)", "Action (Flaw)", "Affects Others", "Area", "Continuous", "Duration (Extra)", "Duration (Flaw)", "Independent", "Linked", "Range (Extra)", "Range (Flaw)", "Reaction", "Sustained", "Targeted", "Total Fade",
    "Check Required", "Concentration", "Distracting", "Fades", "Limited", "Noticeable", "Permanent", "Require Material", "Sense-Dependent", "Side-Effect", "Tiring", "Unreliable",
    "Dimensional", "Extended Reach",
    ...PROGRESSION_EXTRAS,
    ...UNIVERSAL_FEATS
  ],
  Control: [
    "Action (Extra)", "Action (Flaw)", "Affects Corporeal", "Affects Insubstantial", "Affects Objects", "Area", "Continuous", "Duration (Extra)", "Duration (Flaw)", "Independent", "Linked", "Range (Extra)", "Range (Flaw)", "Reaction", "Secondary Effect", "Selective Attack", "Sustained", "Targeted", "Total Fade",
    "Check Required", "Concentration", "Distracting", "Fades", "Feedback", "Limited", "Noticeable", "Permanent", "Require Material", "Resistible", "Sense-Dependent", "Side-Effect", "Tiring", "Touch", "Unreliable",
    "Accurate", "Dimensional", "Extended Reach", "Homing", "Improved Range", "Indirect", "Ricochet", "Split Attack", "Tether",
    ...PROGRESSION_EXTRAS,
    ...UNIVERSAL_FEATS
  ],
  Alteration: [
    "Action (Extra)", "Action (Flaw)", "Affects Corporeal", "Affects Others", "Area", "Continuous", "Duration (Extra)", "Duration (Flaw)", "Independent", "Linked", "Reaction", "Sustained", "Total Fade",
    "Check Required", "Concentration", "Distracting", "Fades", "Feedback", "Limited", "Noticeable", "Permanent", "Personal", "Require Material", "Resistible", "Sense-Dependent", "Side-Effect", "Tiring", "Touch", "Unreliable",
    "Affects Insubstantial", "Dimensional", "Extended Reach", "Incurable", "Mighty",
    ...PROGRESSION_EXTRAS,
    ...UNIVERSAL_FEATS
  ],
  General: [
    "Action (Extra)", "Action (Flaw)", "Check Required", "Continuous", "Distracting", "Duration (Extra)", "Duration (Flaw)", "Fades", "Independent", "Linked", "Noticeable", "Permanent", "Personal", "Reaction", "Require Material", "Sense-Dependent", "Side-Effect", "Sustained", "Tiring", "Total Fade", "Touch", "Unreliable", "Limited",
    "Affects Insubstantial", "Dimensional", "Extended Reach", "Homing", "Improved Critical", "Improved Range", "Incurable", "Indirect", "Mighty", "Ricochet", "Sedation", "Split Attack", "Terminal Velocity", "Tether", "Thrown",
    ...PROGRESSION_EXTRAS,
    ...UNIVERSAL_FEATS
  ]
};


const SENSE_TYPE_MAP = {
  "Normal Sight": "Visual", "Normal Vision": "Visual", "Darkvision": "Visual", "Dark-Vision": "Visual", "Infravision": "Visual", "Infra-Vision": "Visual", 
  "Low-Light Vision": "Visual", "Microscopic Vision": "Visual", "Ultravision": "Visual", "Ultra-Vision": "Visual", "X-Ray Vision": "Visual",
  "Normal Hearing": "Auditory", "Ultra-Hearing": "Auditory",
  "Normal Smell": "Olfactory", "Normal Scent": "Olfactory", "Normal Taste": "Olfactory", "Scent": "Olfactory", "Tracking": "Olfactory",
  "Normal Touch": "Tactile", "Tremorsense": "Tactile",
  "Normal Radio": "Radio", "Radio": "Radio",
  "Normal Mental": "Mental", "Awareness": "Mental", "Danger Sense": "Mental", "Postcognition": "Mental", "Precognition": "Mental", "Time Sense": "Mental", "Communication Link": "Mental"
};


window.generateSmartModifiers = function(effect) {
    if (!effect || !effect.effectName) return { extras: [], flaws: [] };
    let effectData = typeof POWER_EFFECTS_LIST !== 'undefined' ? POWER_EFFECTS_LIST.find(e => e.name === effect.effectName) : null;
    if (!effectData) return { extras: [], flaws: [] };
    
    let extras = [];
    let flaws = [];
    
    let baseRange = effectData.range || "Close";
    let baseDur = effectData.duration || "Instant";
    let baseAct = effectData.action || "Standard";

    const DURATION_TIERS = { "Instant": 1, "Concentration": 2, "Sustained": 3, "Continuous": 4, "Permanent": 5 };
    const ACTION_TIERS = { "Full": 1, "Standard": 2, "Move": 3, "Free": 4, "Reaction": 5, "None": 6 };

    // RANGE
    if (baseRange === "Personal") {
        extras.push({ name: "Increased Range", cost: 1, costType: "per_rank", hasRanks: true, maxRanks: 2, category: "extra" });
    } else if (baseRange === "Close") {
        extras.push({ name: "Increased Range", cost: 1, costType: "per_rank", hasRanks: true, maxRanks: 2, category: "extra" });
        extras.push({ name: "Ranged", cost: 1, costType: "per_rank", hasRanks: false, category: "extra" });
        extras.push({ name: "Perception Range", cost: 2, costType: "per_rank", hasRanks: false, category: "extra" });
        extras.push({ name: "Reach", cost: 1, costType: "flat", hasRanks: true, maxRanks: 20, category: "extra" });
    } else if (baseRange === "Ranged") {
        extras.push({ name: "Increased Range", cost: 1, costType: "per_rank", hasRanks: false, category: "extra" });
        extras.push({ name: "Perception Range", cost: 1, costType: "per_rank", hasRanks: false, category: "extra" });
        extras.push({ name: "Extended Range", cost: 1, costType: "flat", hasRanks: true, maxRanks: 10, category: "extra" });
        flaws.push({ name: "Reduced Range", cost: 1, costType: "per_rank", hasRanks: false, category: "flaw" });
        flaws.push({ name: "Close", cost: 1, costType: "per_rank", hasRanks: false, category: "flaw" });
        flaws.push({ name: "Diminished Range", cost: 1, costType: "flat", hasRanks: true, maxRanks: 3, category: "flaw" });
    } else if (baseRange === "Perception") {
        flaws.push({ name: "Reduced Range", cost: 1, costType: "per_rank", hasRanks: true, maxRanks: 2, category: "flaw" });
        flaws.push({ name: "Close", cost: 2, costType: "per_rank", hasRanks: false, category: "flaw" });
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

// --- GET FILTERED MODIFIERS FOR EFFECT ---
function getFilteredModifiersForEffect(effectType, effectOrSub) {
  const allowedNames = MODIFIER_CATEGORY_MAP[effectType] || MODIFIER_CATEGORY_MAP["General"];
  let available = [];

  if (typeof POWER_MODIFIERS_LIST !== 'undefined') {
    available = POWER_MODIFIERS_LIST.filter(m => {
      if (m.name.includes("Alternate Effect")) return false;
      // Universal Power Feats are always allowed on all powers
      if (m.category === "feat" && (m.name.startsWith("Progression") || m.name === "Subtle" || m.name === "Innate" || m.name === "Precise" || m.name === "Reversible" || m.name === "Slow Fade" || m.name === "Variable Descriptor" || m.name === "Triggered" || m.name === "Transmutation")) {
        return true;
      }
      return allowedNames.includes(m.name);
    });
  }

  const effName = effectOrSub ? (effectOrSub.effectName || effectOrSub.name) : "";
  const effectData = effName ? ((typeof POWER_EFFECTS_LIST !== 'undefined') ? POWER_EFFECTS_LIST.find(e => e.name === effName) : null) : null;
  const isAttack = effectOrSub ? (
    effectType === "Attack" ||
    (effectData && (effectData.type === "Attack" || effectData.check === "Attack" || effectData.check === "Melee Attack" || effectData.check === "Ranged Attack")) ||
    ["Strike", "Blast", "Damage", "Snare", "Stun", "Nauseate", "Suffocate", "Trip", "Paralyze", "Corrosion", "Disintegrate", "Drain"].includes(effName) ||
    (effectOrSub.modifiers && effectOrSub.modifiers.some(m => m.name === "Attack"))
  ) : (effectType === "Attack");

  if (!isAttack) {
    available = available.filter(m => m.name !== "Accurate");
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
  const isComposite = ["Enhanced Senses", "Enhanced Movement", "Enhanced Trait", "Comprehend", "Feature", "Immunity", "Super-Senses"].includes(effect.effectName);

  if (isComposite) {
    let totalRank = 0;
    let totalSubCost = 0;

    if (effect.subPowers && effect.subPowers.length > 0) {
      effect.subPowers.forEach(sub => {
        let sRank = parseInt(sub.rank) || 1;
        totalRank += sRank;

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
        if (netSubRate < 1 && cType === "per_rank") netSubRate = 1;

        let sCost = 0;
        if (cType === "per_rank") {
            sCost = (netSubRate * sRank) + sFlatMod;
        } else {
            sCost = sBaseCost + (sPerRankMod * sRank) + sFlatMod;
        }

        if (sRemovableTiers > 0) {
            let discount = Math.floor(sCost / 5) * sRemovableTiers;
            sCost -= discount;
        }

        if (sCost < 1) sCost = 1;
        
        if (sub.isReduced) {
            sCost = -sCost;
        }
        
        totalSubCost += sCost;
      });
    } else {
      totalRank = 1; 
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

    let finalCost = totalSubCost + (pPerRank * effect.rank) + pFlat;
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
    if(netRate < 1) netRate = 1;
    let finalCost = (netRate * (parseInt(effect.rank)||1)) + pFlat;
    if(pRemovable > 0) finalCost -= Math.floor(finalCost / 5) * pRemovable;
    return finalCost < 1 ? 1 : finalCost;
  }
};

char.calculateTotalPowerCost = function(powerContainer) {
  return CharacterModel.prototype.calculateTotalPowerCost.call(char, powerContainer);
};
char.calculatePowerCost = char.calculateTotalPowerCost;

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

     if (type.includes("Dimensional Travel") || type.includes("Space Travel")) return 20; 
     if (type.includes("Permeate")) return 6;
     if (type.includes("Wall-Crawling")) return 4;
     if (type.includes("Water-Walking") || type.includes("Swinging")) return 2;
     
     if (type.includes("Microscopic Vision")) return 4;
     if (type.includes("Dimensional")) return 3;
     
     if (effect.effectName === "Immunity") {
         if (type.includes("Custom Immunity")) return 30;
         const rMatch = type.match(/\[(\d+)\s*ranks?\]/i) || (subPower.name && subPower.name.match(/\[(\d+)\s*ranks?\]/i));
         if (rMatch) return parseInt(rMatch[1]);
         return 30;
     }

     if (type.includes("Custom Sense")) return 20;

     if (type.includes("Communication")) return 5;
     if (type.includes("Languages")) return 4;
     if (type.includes("Animals") || type.includes("Computers") || type.includes("Objects") || type.includes("Plants") || type.includes("Spirits")) return 2;
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

  if (effect.subPowers && effect.subPowers.length > 0) {
     let highest = 0;
     let hasUncapped = false;
     effect.subPowers.forEach(sub => {
         let cap = window.getMaxPowerRank(effect, sub);
         if (cap === 20) hasUncapped = true;
         if (cap > highest) highest = cap;
     });
     if (hasUncapped) return 20;
     return highest > 0 ? highest : 20;
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

window.showAdvantageInfo = function(advName) {
  const adv = ADVANTAGES_LIST.find(a => a.name === advName);
  if (!adv) return;
  document.getElementById("modalRuleTitle").textContent = adv.name + ` [${adv.category}]`;
  document.getElementById("modalRuleBody").innerHTML = adv.fullText || adv.description;
  document.getElementById("ruleInfoModal").classList.add("active");
};

window.showSkillInfo = function(skillName) {
  const skill = SKILLS_LIST.find(s => s.name === skillName);
  if (!skill) return;
  document.getElementById("modalRuleTitle").textContent = skill.name + ` (${skill.ability})`;
  document.getElementById("modalRuleBody").innerHTML = skill.fullText;
  document.getElementById("ruleInfoModal").classList.add("active");
};

let COMPLETE_FULL_TEXT_MAP = {};

window.showPowerEffectInfo = function(effectName) {
  const effect = POWER_EFFECTS_LIST.find(e => e.name === effectName);
  if (!effect) return;
  
  document.getElementById("modalRuleTitle").textContent = `${effect.name} [${effect.type}]`;
  const textToDisplay = effect.fullText || effect.shortDesc || "No description available.";

  const modalBody = document.getElementById("modalRuleBody");
  if (modalBody) {
      modalBody.innerHTML = textToDisplay.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
  }
  
  const modalElement = document.getElementById("ruleInfoModal");
  if (modalElement) {
      modalElement.classList.add("active");
  }
};

window.showModifierInfo = function(modName) {
  if (!modName) return;
  let mod = null;
  const clean = modName.replace(/\s*\[.*?\]/g, '').trim();
  const baseName = clean.replace(/\s*\([+–-]?\d+[^)]*\)/g, '').trim();
  const normalize = (s) => (s || "").toLowerCase().replace(/[–—]/g, '-').replace(/[^a-z0-9]/g, '');
  const normTarget = normalize(baseName);

  if (typeof POWER_MODIFIERS_LIST !== 'undefined') {
    mod = POWER_MODIFIERS_LIST.find(m => m.name === modName || m.name === baseName || m.name === clean || normalize(m.name) === normTarget);
  }
  if (!mod && typeof POWER_EFFECTS_LIST !== 'undefined') {
    for (const eff of POWER_EFFECTS_LIST) {
      if (eff.uniqueModifiers) {
        mod = eff.uniqueModifiers.find(m => m.name === modName || m.name === baseName || m.name === clean || normalize(m.name) === normTarget);
        if (mod) break;
      }
      if (eff.specificExtras) {
        mod = eff.specificExtras.find(m => m.name === modName || m.name === baseName || m.name === clean || normalize(m.name) === normTarget);
        if (mod) break;
      }
      if (eff.specificFlaws) {
        mod = eff.specificFlaws.find(m => m.name === modName || m.name === baseName || m.name === clean || normalize(m.name) === normTarget);
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
            banner.style.fontSize = "14px";
            banner.style.fontWeight = "bold";
            banner.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
            banner.innerHTML = `⚠️ Your screen width is less than 1080px. For the best builder experience, please use a wider screen or switch your device to landscape mode. <button id="dismissResWarning" style="margin-left:12px; background:rgba(0,0,0,0.2); border:1px solid #fff; color:white; padding:4px 8px; cursor:pointer; border-radius:4px; font-size:12px;">Dismiss</button>`;
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
    
    .power-card { border: 2px solid var(--border-color) !important; }
    
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

  buildAbilitiesUI();
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
  setupSortingHeaders();
  setupDefenseSteppers();
  setupPowerHandlers();
  setupEquipmentHandlers();
  buildEquipmentUI();
  FileManager.init();
  refreshUI();
});

function setupTabs() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
      
      // Update power context for shared UI logic
      if (btn.dataset.tab === "tab-blueprints") {
          window.activePowerContext = 'blueprints';
          buildPowersUI();
      } else if (btn.dataset.tab === "tab-powers") {
          window.activePowerContext = 'powers';
          buildPowersUI();
      }
    });
  });
}

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
  const modalContent = modal ? modal.querySelector(".modal-content") || modal : null;

  if (modalContent && !document.getElementById("chkDisableWarnings")) {
      const warningsDiv = document.createElement("div");
      warningsDiv.style.marginTop = "16px";
      warningsDiv.style.paddingTop = "16px";
      warningsDiv.style.borderTop = "1px solid var(--border-color)";
      
      const isChecked = (localStorage.getItem("mm2e_disable_warnings") ?? localStorage.getItem("mm4e_disable_warnings")) === "true";
      const isResWarningDisabled = (localStorage.getItem("mm2e_disable_res_warning") ?? localStorage.getItem("mm4e_disable_res_warning")) === "true";
      const isDeleteWarningDisabled = (localStorage.getItem("mm2e_disable_delete_warning") ?? localStorage.getItem("mm4e_disable_delete_warning")) === "true";

      warningsDiv.innerHTML = `
          <label style="display: flex; align-items: center; gap: 8px; font-size: var(--font-size-labels); cursor: pointer; margin-bottom: 8px;">
              <input type="checkbox" id="chkDisableWarnings" ${isChecked ? "checked" : ""}>
              Disable non-critical power option alerts
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-size: var(--font-size-labels); cursor: pointer; margin-bottom: 8px;">
              <input type="checkbox" id="chkDisableDeleteWarning" ${isDeleteWarningDisabled ? "checked" : ""}>
              Disable power container deletion warnings
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-size: var(--font-size-labels); cursor: pointer;">
              <input type="checkbox" id="chkDisableResWarning" ${isResWarningDisabled ? "checked" : ""}>
              Disable screen resolution warning
          </label>
      `;
      modalContent.appendChild(warningsDiv);

      document.getElementById("chkDisableWarnings").addEventListener("change", (e) => {
          localStorage.setItem("mm2e_disable_warnings", e.target.checked);
      });
      document.getElementById("chkDisableDeleteWarning").addEventListener("change", (e) => {
          localStorage.setItem("mm2e_disable_delete_warning", e.target.checked);
      });
      document.getElementById("chkDisableResWarning").addEventListener("change", (e) => {
          localStorage.setItem("mm2e_disable_res_warning", e.target.checked);
          window.checkScreenResolution(); 
      });
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
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

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
    }
  });
}

function setupThemeAndFontControls() {
  const root = document.documentElement;
  const btnTheme = document.getElementById("btnThemeToggle");
  const sliderLabel = document.getElementById("sliderLabelFont");
  const sliderControl = document.getElementById("sliderControlFont");
  const sliderLink = document.getElementById("sliderLinkFont");
  const sliderSecondary = document.getElementById("sliderSecondaryFont");
  const sliderMinorControl = document.getElementById("sliderMinorControlFont");

  const themes = ["light", "dark", "kitty", "parchment"];
  const themeNames = { light: "Light", dark: "Dark", kitty: "Kitty", parchment: "Parchment" };

  const savedTheme = localStorage.getItem("mm2e_theme") || "light";
  const savedLabelFont = localStorage.getItem("mm2e_font_labels") || localStorage.getItem("mm4e_font_labels") || "16";
  const savedControlFont = localStorage.getItem("mm2e_font_controls") || localStorage.getItem("mm4e_font_controls") || "14";
  const savedLinkFont = localStorage.getItem("mm2e_font_links") || localStorage.getItem("mm4e_font_links") || "14";
  const savedSecondaryFont = localStorage.getItem("mm2e_font_secondary") || localStorage.getItem("mm4e_font_secondary") || "14";
  const savedMinorControlFont = localStorage.getItem("mm2e_font_minor_controls") || localStorage.getItem("mm4e_font_minor_controls") || "14";
  
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
  sliderLabel.value = savedLabelFont;
  document.getElementById("valLabelFont").textContent = savedLabelFont + "px";

  root.style.setProperty("--font-size-controls", savedControlFont + "px");
  sliderControl.value = savedControlFont;
  document.getElementById("valControlFont").textContent = savedControlFont + "px";

  root.style.setProperty("--font-size-links", savedLinkFont + "px");
  sliderLink.value = savedLinkFont;
  document.getElementById("valLinkFont").textContent = savedLinkFont + "px";

  root.style.setProperty("--font-size-secondary", savedSecondaryFont + "px");
  sliderSecondary.value = savedSecondaryFont;
  document.getElementById("valSecondaryFont").textContent = savedSecondaryFont + "px";

  root.style.setProperty("--font-size-minor-controls", savedMinorControlFont + "px");
  sliderMinorControl.value = savedMinorControlFont;
  document.getElementById("valMinorControlFont").textContent = savedMinorControlFont + "px";



  btnTheme.addEventListener("click", (e) => {
    e.stopPropagation();
    const currentTheme = root.getAttribute("data-theme");
    let currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    root.setAttribute("data-theme", nextTheme);
    updateThemeBtnUI(nextTheme);
    localStorage.setItem("mm2e_theme", nextTheme);
  });

  sliderLabel.addEventListener("input", (e) => {
    root.style.setProperty("--font-size-labels", e.target.value + "px");
    document.getElementById("valLabelFont").textContent = e.target.value + "px";
    localStorage.setItem("mm2e_font_labels", e.target.value);
  });
  sliderControl.addEventListener("input", (e) => {
    root.style.setProperty("--font-size-controls", e.target.value + "px");
    document.getElementById("valControlFont").textContent = e.target.value + "px";
    localStorage.setItem("mm2e_font_controls", e.target.value);
  });
  sliderLink.addEventListener("input", (e) => {
    root.style.setProperty("--font-size-links", e.target.value + "px");
    document.getElementById("valLinkFont").textContent = e.target.value + "px";
    localStorage.setItem("mm2e_font_links", e.target.value);
  });
  sliderSecondary.addEventListener("input", (e) => {
    root.style.setProperty("--font-size-secondary", e.target.value + "px");
    document.getElementById("valSecondaryFont").textContent = e.target.value + "px";
    localStorage.setItem("mm2e_font_secondary", e.target.value);
  });
  sliderMinorControl.addEventListener("input", (e) => {
    root.style.setProperty("--font-size-minor-controls", e.target.value + "px");
    document.getElementById("valMinorControlFont").textContent = e.target.value + "px";
    localStorage.setItem("mm2e_font_minor_controls", e.target.value);
  });

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
  let cssVar = "";
  let lsKey = "";
  if (type === 'Label') { cssVar = "--font-size-labels"; lsKey = "mm2e_font_labels"; }
  else if (type === 'Control') { cssVar = "--font-size-controls"; lsKey = "mm2e_font_controls"; }
  else if (type === 'Link') { cssVar = "--font-size-links"; lsKey = "mm2e_font_links"; }
  else if (type === 'Secondary') { cssVar = "--font-size-secondary"; lsKey = "mm2e_font_secondary"; }
  else if (type === 'MinorControl') { cssVar = "--font-size-minor-controls"; lsKey = "mm2e_font_minor_controls"; }

  if (cssVar) {
    root.style.setProperty(cssVar, defaultSize + "px");
    document.getElementById("slider" + type + "Font").value = defaultSize;
    document.getElementById("val" + type + "Font").textContent = defaultSize + "px";
    localStorage.setItem(lsKey, defaultSize);
  }
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

  container.innerHTML = list.map(abil => `
    <div class="list-row">
      <input type="checkbox" class="row-enable-toggle" id="enable_${abil.id}" checked title="Enable / Disable Trait">
      <span class="row-title">${abil.name} (${abil.id})</span>
      
      <div class="stepper-group">
        <button type="button" class="stepper-btn stepper-dec" id="dec_${abil.id}" onclick="stepVal('input_${abil.id}', -1, -5, 20)">−</button>
        <input type="number" id="input_${abil.id}" class="stepper-input" min="-5" max="20" value="0">
        <button type="button" class="stepper-btn stepper-inc" id="inc_${abil.id}" onclick="stepVal('input_${abil.id}', 1, -5, 20)">+</button>
      </div>

      <div class="row-adjustments" id="adj_${abil.id}">
        <em>Base points only</em>
      </div>

      <div class="ability-total-col" id="total_rank_${abil.id}">0</div>
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
      refreshUI();
    });
  });

  document.getElementById("heroNameInput").addEventListener("input", (e) => {
    char.name = e.target.value;
    refreshUI();
  });
  document.getElementById("playerNameInput").addEventListener("input", (e) => {
    char.playerName = e.target.value;
  });
  document.getElementById("heroPLInput").addEventListener("input", (e) => {
    char.powerLevel = parseInt(e.target.value) || 10;
    char.totalPointsAllowed = char.powerLevel * 15;
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

function buildSkillsUI() {
  const tbody = document.querySelector("#skillsTable tbody");
  if (!tbody) return;
  tbody.innerHTML = skillsDisplayList.map(skill => {
    const idSafe = skill.name.replace(/[^a-zA-Z0-9]/g, "_");
    const val = char.skills[skill.name] || 0;
    const focusVal = char.skillDetails ? (char.skillDetails[skill.name] || "") : "";

    const skillNameStyle = val > 0 ? 'color: #f59e0b;' : '';

    let featsArray = skill.relatedFeats ? [...skill.relatedFeats] : [];
    
    // Skill Mastery check
    const smRanks = char.feats["Skill Mastery"] || 0;
    if (smRanks > 0) {
      try {
        const mastered = JSON.parse(char.featDetails["Skill Mastery"] || "[]");
        if (mastered.includes(skill.name) && !featsArray.includes("Skill Mastery")) {
          featsArray.push("Skill Mastery");
        }
      } catch(e) {}
    }

    // Favored Opponent applies to Sense Motive
    if (skill.name === "Sense Motive" && !featsArray.includes("Favored Opponent")) {
      featsArray.push("Favored Opponent");
    }

    let advTagsHtml = "";
    const enhSkill = (char.enhancedTraits && char.enhancedTraits.skills && char.enhancedTraits.skills[skill.name]) ? char.enhancedTraits.skills[skill.name] : 0;
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

    return `
      <tr>
        <td><strong style="${skillNameStyle}">${skill.name}</strong></td>
        <td>${skill.ability}</td>
        <td>${skill.untrained ? `<span style="color:#10b981; font-weight:600;">Yes</span>` : `<span style="color:#f59e0b; font-weight:600;">Trained Only</span>`}</td>
        <td id="skill_base_${idSafe}">0</td>
        <td>
          <div class="stepper-group">
            <button type="button" class="stepper-btn stepper-dec" onclick="stepVal('skill_input_${idSafe}', -1, 0, 20)">−</button>
            <input type="number" id="skill_input_${idSafe}" class="stepper-input" min="0" max="20" value="${val}" data-skill="${skill.name}">
            <button type="button" class="stepper-btn stepper-inc" onclick="stepVal('skill_input_${idSafe}', 1, 0, 20)">+</button>
          </div>
        </td>
        <td id="skill_total_${idSafe}"><strong>+0</strong></td>
        <td>
          ${skill.focused ? `<input type="text" class="skill-focus-input" data-skill="${skill.name}" value="${focusVal}" placeholder="e.g. ${skill.focuses ? skill.focuses.slice(0, 3).join(', ') : 'Specialization'}..." style="width: 100%; min-width: 130px;">` : `<span class="secondary-text">${skill.specializations ? skill.specializations.slice(0, 2).join(', ') : '—'}</span>`}
        </td>
        <td>${advTagsHtml}</td>
        <td style="text-align: center;">
          <button type="button" class="btn-info-circle" onclick="showSkillInfo('${skill.name}')" title="View Full Skill Rules">?</button>
        </td>
      </tr>
    `;
  }).join("");

  tbody.querySelectorAll("input.stepper-input").forEach(input => {
    input.addEventListener("input", (e) => {
      char.skills[e.target.dataset.skill] = parseInt(e.target.value) || 0;
      buildSkillsUI();
      refreshUI();
    });
  });

  tbody.querySelectorAll("input.skill-focus-input").forEach(input => {
    input.addEventListener("input", (e) => {
      if (!char.skillDetails) char.skillDetails = {};
      char.skillDetails[e.target.dataset.skill] = e.target.value;
    });
  });
}

function buildAdvantagesUI() {
  const tbody = document.querySelector("#advantagesTable tbody");
  if (!tbody) return;
  tbody.innerHTML = advantagesDisplayList.map(adv => {
    const idSafe = adv.name.replace(/[^a-zA-Z0-9]/g, "_");
    const val = char.feats[adv.name] || 0;
    const enhFeat = (char.enhancedTraits && char.enhancedTraits.feats && char.enhancedTraits.feats[adv.name]) ? char.enhancedTraits.feats[adv.name] : 0;
    const effVal = val + enhFeat;
    const maxRank = char.getAdvantageMaxRank(adv);
    const detailVal = char.featDetails[adv.name] || "";

    const advNameStyle = effVal > 0 ? 'color: #f59e0b;' : '';
    const enhBadge = enhFeat > 0 ? ` <span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600; font-size: 0.85em; padding: 1px 5px;" title="Enhanced Trait">[+${enhFeat} Enhanced]</span>` : '';

    let detailCellHTML = `<span class="secondary-text">-</span>`;
    if (adv.name === "Skill Mastery" && val > 0) {
      let selectedArr = [];
      try { selectedArr = JSON.parse(detailVal || "[]"); } catch(e) {}
      const selectedCount = selectedArr.length;
      const displayStr = selectedCount > 0 ? selectedArr.join(", ") : "<em>No skills</em>";
      detailCellHTML = `
        <div style="display:flex; flex-direction:column; gap:4px; max-width: 160px;">
          <span class="secondary-text" style="font-size: 0.85em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${selectedCount > 0 ? selectedArr.join(", ") : ""}">
            ${displayStr}
          </span>
          <button type="button" class="btn btn-sm" onclick="window.configureSkillMastery()">Configure (${selectedCount} / ${val * 4})</button>
        </div>
      `;
    } else if (adv.focused) {
      detailCellHTML = `<input type="text" class="adv-detail-input" data-adv="${adv.name}" value="${detailVal}" placeholder="Specify focus / detail..." style="width: 100%; min-width: 140px;">`;
    }

    return `
      <tr>
        <td><strong style="${advNameStyle}">${adv.name}</strong>${enhBadge}</td>
        <td class="secondary-text">${adv.types ? adv.types.join(", ") : adv.category}</td>
        <td>
          <div class="stepper-group">
            <button type="button" class="stepper-btn stepper-dec" onclick="stepVal('adv_input_${idSafe}', -1, 0, ${maxRank})">−</button>
            <input type="number" id="adv_input_${idSafe}" class="stepper-input" min="0" max="${maxRank}" value="${val}" data-adv="${adv.name}">
            <button type="button" class="stepper-btn stepper-inc" onclick="stepVal('adv_input_${idSafe}', 1, 0, ${maxRank})">+</button>
          </div>
        </td>
        <td>
          ${detailCellHTML}
        </td>
        <td class="secondary-text">${adv.description}</td>
        <td style="text-align: center;">
          <button type="button" class="btn-info-circle" onclick="showAdvantageInfo('${adv.name}')" title="View Full Description">?</button>
        </td>
      </tr>
    `;
  }).join("");

  tbody.querySelectorAll("input.stepper-input").forEach(input => {
    input.addEventListener("input", (e) => {
      const val = parseInt(e.target.value) || 0;
      char.feats[e.target.dataset.adv] = val;
      if (e.target.dataset.adv === "Skill Mastery") {
        let selected = [];
        try { selected = JSON.parse(char.featDetails["Skill Mastery"] || "[]"); } catch (ex) {}
        if (selected.length > val * 4) {
          window.configureSkillMastery();
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
      char.featDetails[e.target.dataset.adv] = e.target.value;
    });
  });
}

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
}

window.applyEffectProfile = function(pIdx, eIdx, profileName, skipHistory = false) {
  if (!char.activePowers[pIdx] || !char.activePowers[pIdx].effects[eIdx]) return;
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

  for (const eff of POWER_EFFECTS_LIST) {
    if (eff.profiles) {
      config = eff.profiles.find(c => c.name === targetProfile);
      if (config) {
        targetEffectName = eff.name;
        break;
      }
    }
  }
  
  if (!config) return;

  effect.effectName = config.effectName || targetEffectName;
  effect.name = config.name;
  effect.isProfileExplicitlySelected = true;
  effect.descriptors = "";
  
  if (config.rank !== undefined) {
    effect.rank = config.rank;
  } else {
    effect.rank = 1;
  }
  
  effect.options = config.options ? JSON.parse(JSON.stringify(config.options)) : {};
  effect.modifiers = config.modifiers ? JSON.parse(JSON.stringify(config.modifiers)) : [];
  effect.subPowers = config.subPowers ? JSON.parse(JSON.stringify(config.subPowers)) : [];
  effect.notes = config.notes ? config.notes : "";

  const isComposite = ["Enhanced Senses", "Enhanced Movement", "Enhanced Trait", "Comprehend", "Feature", "Immunity", "Super-Senses"].includes(effect.effectName);
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
      char.activePowers[pIdx].effects[eIdx].linkedTo = val || null;
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

  const rangeSteps = ["Personal", "Touch", "Ranged", "Perception"];
  let currentIdx = rangeSteps.indexOf(effectiveRange);
  if (currentIdx === -1) currentIdx = 1;

  effect.modifiers.forEach(m => {
    const ranks = parseInt(m.ranks) || 1;
    if (m.name === "Range (Extra)") {
      currentIdx = Math.min(3, currentIdx + ranks);
    } else if (m.name === "Range (Flaw)") {
      currentIdx = Math.max(1, currentIdx - ranks); // Can't reduce Personal below Touch usually
    } else if (m.name === "Affects Others" || m.name === "Affects Corporeal") {
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
    
  let pAction = baseData?.action || "Standard";
  let pRange = baseData?.range || "Touch";
  let pDuration = baseData?.duration || "Instant";
  let pCheck = baseData?.check || "None";

  if (baseData && baseData.profiles && effect.name) {
    const profile = baseData.profiles.find(p => p.name === effect.name);
    if (profile) {
      if (profile.action) pAction = profile.action;
      if (profile.range) pRange = profile.range;
      if (profile.duration) pDuration = profile.duration;
      if (profile.check) pCheck = profile.check;
    }
  }

  let action = pAction;
  let range = calculateEffectiveRange(effect, pRange);
  let duration = pDuration;
  let check = pCheck;
  
  if (Array.isArray(effect.modifiers)) {
    const actionSteps = ["Reaction", "Free", "Move", "Standard", "Full-Round"];
    let actionIdx = actionSteps.indexOf(action);
    if (actionIdx === -1) actionIdx = 3;

    const durationSteps = ["Instant", "Concentration", "Sustained", "Continuous", "Permanent"];
    let durationIdx = durationSteps.indexOf(duration);
    if (durationIdx === -1) durationIdx = 0;

    effect.modifiers.forEach(m => {
      const ranks = parseInt(m.ranks) || 1;
      
      if (m.name === "Action (Extra)") {
         actionIdx = Math.max(0, actionIdx - ranks);
      } else if (m.name === "Action (Flaw)") {
         actionIdx = Math.min(4, actionIdx + ranks);
      }
      
      if (m.name === "Duration (Extra)") {
         durationIdx = Math.min(3, durationIdx + ranks); // Continuous is max for active
      } else if (m.name === "Duration (Flaw)") {
         durationIdx = Math.max(0, durationIdx - ranks);
      } else if (m.name === "Concentration") {
         durationIdx = 1;
      } else if (m.name === "Independent") {
         durationIdx = 2;
      }
    });

    action = actionSteps[actionIdx];
    duration = durationSteps[durationIdx];
  }
  
  return { action, range, duration, check };
}
window.getEffectiveEffectTraits = getEffectiveEffectTraits;

window.updatePowerContainerName = function(pIdx, val) {
  if (char.activePowers[pIdx]) {
      char.activePowers[pIdx].name = val;
      const headerTitle = document.getElementById(`powerContainerName_${pIdx}`);
      if (headerTitle) headerTitle.value = val;
  }
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

function buildPowersUI() {
  const containerId = (window.activePowerContext === 'blueprints') ? "blueprintsContainer" : "powersContainer";
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!char.activePowers || char.activePowers.length === 0) {
    container.innerHTML = `<p class="secondary-text" style="padding: 12px 0;">No powers constructed yet. Click <strong>+ Add New Power Container</strong> above to build a power container.</p>`;
    return;
  }

  container.innerHTML = char.activePowers.map((powerContainer, pIdx) => {
    const containerCost = char.calculateTotalPowerCost(powerContainer);
    const isCollapsed = powerContainer.collapsed ? 'collapsed' : '';
    const summaryText = powerContainer.effects.map(e => `${e.effectName || 'No Effect'} ${e.rank}`).join(" | ");

    let effectsHtml = powerContainer.effects.map((effect, eIdx) => {
        const isComposite = ["Enhanced Senses", "Enhanced Movement", "Enhanced Trait", "Comprehend", "Feature", "Immunity", "Super-Senses"].includes(effect.effectName);
        
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
            shortDescText = (effectData.fullText.length <= 300) ? effectData.fullText : (effectData.fullText.substring(0, 280) + "...");
          }
        }

        const baseRange = effectData ? (effectData.range || "Close") : "Close";
        const effectiveRange = calculateEffectiveRange(effect, baseRange);
        const rankNum = Math.max(1, parseInt(effect.rank) || 1);

        const PROGRESSION_VALUES = [
          1, 2, 5, 10, 25, 50, 100, 250, 500, 1000,
          2500, 5000, 10000, 25000, 50000, 100000,
          250000, 500000, 1000000, 2500000, 5000000,
          10000000, 25000000, 50000000, 100000000
        ];
        const getProgMult = (r) => PROGRESSION_VALUES[Math.min(Math.max(0, r), PROGRESSION_VALUES.length - 1)] || 1;

        const hasAreaMod = effect.modifiers ? effect.modifiers.some(m => m.name === "Area" || m.name.startsWith("Area (") || m.name.includes("Area")) : false;
        const hasPortalMod = effect.modifiers ? effect.modifiers.some(m => m.name === "Portal") : false;

        const progAreaMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Progression (Area)" || (m.name === "Progression" && (hasAreaMod || hasPortalMod || effect.effectName === "Environmental Control" || effect.effectName === "Obscure" || effect.effectName === "Illusion"))) : null;
        const progAreaRanks = progAreaMod ? (parseInt(progAreaMod.ranks) || 1) : 0;

        const progRangeMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Progression (Range)" || (m.name === "Progression" && (effectiveRange === "Ranged" || effect.effectName === "Teleport" || (effectData && effectData.type === "Movement")))) : null;
        const progRangeRanks = progRangeMod ? (parseInt(progRangeMod.ranks) || 1) : 0;

        const progMassMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Progression (Mass)" || (m.name === "Progression" && ["Teleport", "Dimensional Pocket", "Super-Movement", "Move Object", "Super-Strength"].includes(effect.effectName))) : null;
        const progMassRanks = progMassMod ? (parseInt(progMassMod.ranks) || 1) : 0;

        const progTargetsMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Progression (Targets)" || (m.name === "Progression" && ((effect.modifiers && effect.modifiers.some(x => x.name === "Affects Others" || x.name === "Split Attack")) || ["Summon", "Duplication", "Animate Objects"].includes(effect.effectName)))) : null;
        const progTargetsRanks = progTargetsMod ? (parseInt(progTargetsMod.ranks) || 1) : 0;

        const progDurMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Progression (Duration)") : null;
        const progDurRanks = progDurMod ? (parseInt(progDurMod.ranks) || 1) : 0;

        let reachRanks = 0;
        const reachMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Reach") : null;
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
        } else if (effectiveRange === "Rank") {
          let effRank = Math.max(-5, rankNum + rangeShift);
          let dist = (typeof MEASUREMENT_TABLE !== 'undefined' && MEASUREMENT_TABLE[effRank.toString()]) ? MEASUREMENT_TABLE[effRank.toString()].dist_imp : "Special";
          rangeDisplay = `Rank ${effRank} (${dist})`;
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
        if (effect.effectName === "Teleport" || effect.effectName === "Dimensional Pocket" || (effect.modifiers && effect.modifiers.some(m => m.name.startsWith("Progression (Mass)"))) || (effect.effectName === "Super-Movement" && (effect.descriptors || "").includes("Dimensional"))) {
          massDisplay = MASS_STEPS[Math.min(progMassRanks, MASS_STEPS.length - 1)] || `${MASS_STEPS[MASS_STEPS.length - 1]}+`;
        }

        // Targets
        let targetsDisplay = "";
        if (progTargetsRanks > 0 || (effect.modifiers && effect.modifiers.some(m => m.name === "Affects Others" || m.name === "Split Attack")) || ["Summon", "Duplication", "Animate Objects"].includes(effect.effectName)) {
          const tCount = getProgMult(progTargetsRanks);
          targetsDisplay = `${tCount.toLocaleString()} subject${tCount > 1 ? 's' : ''}`;
        }

        // Save DC / Check
        let saveDcDisplay = effectiveTraits.check || "None";
        if (effect.effectName === "Teleport") {
          saveDcDisplay = `Reflex DC ${10 + rankNum} (unwilling passenger)`;
        } else if (["Strike", "Blast", "Damage", "Corrosion", "Disintegrate"].includes(effect.effectName)) {
          saveDcDisplay = `Toughness DC ${15 + rankNum}`;
        } else if (["Snare", "Trip"].includes(effect.effectName)) {
          saveDcDisplay = `Reflex DC ${10 + rankNum}`;
        } else if (["Stun", "Nauseate", "Suffocate", "Drain", "Fatigue"].includes(effect.effectName)) {
          saveDcDisplay = `Fortitude DC ${10 + rankNum}`;
        } else if (["Paralyze", "Mind Control", "Mind Reading", "Emotion Control", "Illusion", "Confuse"].includes(effect.effectName)) {
          saveDcDisplay = `Will DC ${10 + rankNum}`;
        } else if (effectData && effectData.type === "Attack") {
          saveDcDisplay = `DC ${10 + rankNum} ${effectiveTraits.check && effectiveTraits.check !== 'None' ? effectiveTraits.check : 'Save'}`;
        }

        let measurementHtml = "";
        if (typeof MEASUREMENT_TABLE !== 'undefined') {
          const effRankStr = Math.min(30, Math.max(1, rankNum + progDurRanks)).toString();
          const mData = MEASUREMENT_TABLE[effRankStr] || MEASUREMENT_TABLE["20"];
          
          let effMassRank = rankNum + progMassRanks;
          const massData = MEASUREMENT_TABLE[Math.min(30, Math.max(1, effMassRank)).toString()] || MEASUREMENT_TABLE["20"];

          let effDistRank = rankNum + progRangeRanks;
          if (effectiveRange === "Rank") {
              effDistRank = Math.max(-5, effDistRank + rangeShift);
          }
          if (hasAreaMod || hasPortalMod) {
             effDistRank = rankNum + progAreaRanks;
          }
          
          const distData = MEASUREMENT_TABLE[Math.min(30, Math.max(1, effDistRank)).toString()] || MEASUREMENT_TABLE["20"];

          if (mData && effect.effectName) {
            const showDist = (effectiveRange === "Rank" || hasAreaMod || hasPortalMod || (effectData && effectData.type === "Movement") || effect.effectName === "Teleport");
            const showMass = (massDisplay !== "" || ["Move Object", "Super-Strength"].includes(effect.effectName));
            const showTable = showDist || showMass || ["Move Object", "Create", "Insubstantial"].includes(effect.effectName);
            
            if (showTable && effect.effectName !== "Enhanced Movement") {
                measurementHtml = `
                  <div style="margin-top: 6px; padding-top: 6px; border-top: 1px dashed var(--border-color); display: flex; gap: 16px; flex-wrap: wrap; font-size: calc(var(--font-size-secondary) * 0.95); font-family: monospace;">
                    <strong style="color: var(--accent-primary);">Table Equivalents:</strong>
                    ${showDist ? `<span><strong>Dist:</strong> ${distData ? distData.dist_imp : 'Special'}</span>` : ''}
                    ${showMass ? `<span><strong>Mass:</strong> ${massData ? massData.dist_imp : 'Special'}</span>` : ''}
                    <span><strong>Time:</strong> ${mData ? mData.time : 'Special'}</span>
                  </div>
                `;
            }
          }
        }

        let allTemplates = [];
        if (typeof POWER_EFFECTS_LIST !== 'undefined') {
            POWER_EFFECTS_LIST.forEach(eff => {
              if (eff.profiles) {
                eff.profiles.forEach(cfg => {
                  allTemplates.push({ ...cfg, effectName: cfg.effectName || eff.name });
                });
              }
            });
            allTemplates.sort((a, b) => a.name.localeCompare(b.name));
        }

        const showAll = effect.showAllProfiles;
        const availableTemplates = showAll ? allTemplates : (effectData.profiles || []);
        const isCustomProfile = effect.isProfileExplicitlySelected || (effect.name && effect.name !== 'New Effect' && effect.name !== effect.effectName);

        let templateDropdownHtml = `
          <div style="display: flex; align-items: center; gap: 6px;">
            <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Profile:</label>
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
            let mySenseType = isSenseTypeOpt ? (sType.includes(" - ") ? sType.split(" - ")[1] : sType.replace("Sense Type ", "")) : (SENSE_TYPE_MAP[sType] || "Unknown");

            let isVisual = mySenseType === "Visual" || /Sight|Visual|vision/i.test(sType);
            let isAuditory = mySenseType === "Auditory" || /Hearing|Auditory/i.test(sType);
            let isTactile = mySenseType === "Tactile" || /Touch|Tactile/i.test(sType);

            let defaults = [];
            if (isVisual) { defaults.push("Accurate", "Acute"); }
            if (isAuditory) { defaults.push("Acute"); }
            if (isTactile) { defaults.push("Accurate"); }

            let defaultText = defaults.length > 0 ? `<div style="margin-top: 2px; color: var(--accent-primary);"><strong>Default Traits:</strong> ${defaults.join(", ")}</div>` : "";

            if (sType.includes("Dimensional Travel")) {
                let dest = "Home dimension and one other (Base 2 ranks)";
                let baseDestRank = 2;
                if (sRank >= 6) { dest = "Any dimension known to you (Base 6 ranks)"; baseDestRank = 6; }
                else if (sRank >= 4) { dest = "A related group of dimensions (Base 4 ranks)"; baseDestRank = 4; }
                let massIncrease = Math.max(0, sRank - baseDestRank);
                
                const incMassMod = sub.modifiers ? sub.modifiers.find(m => m.name === "Increased Mass") : null;
                if (incMassMod) massIncrease += parseInt(incMassMod.ranks) || 1;

                let massStr = "50 lbs (Rank 0)";
                if (typeof CharacterModel !== 'undefined') {
                    massStr = CharacterModel.formatWeight(CharacterModel.getProgressionValue(massIncrease) * 5) + " (Rank " + massIncrease + ")";
                }
                if (sRank < 2) dynDesc = `<span style="color: #ef4444;">Requires at least 2 ranks.</span>`;
                else dynDesc = `<strong>Destination Tier:</strong> ${dest}. <br><strong>Mass Capacity:</strong> ${massStr}.`;
            } else if (sType.includes("Space Travel")) {
                let dest = "Solar System / Other planets (Base 2 ranks)";
                let baseDestRank = 2;
                if (sRank >= 6) { dest = "Intergalactic / Distant star systems (Base 6 ranks)"; baseDestRank = 6; }
                else if (sRank >= 4) { dest = "Interstellar / Other star systems (Base 4 ranks)"; baseDestRank = 4; }
                if (sRank < 2) dynDesc = `<span style="color: #ef4444;">Requires at least 2 ranks.</span>`;
                else dynDesc = `<strong>Destination Tier:</strong> ${dest}.`; 
            } else if (sType.includes("Environmental Adaptation")) {
                placeholderText = "Specify adapted environment(s) (e.g. Underwater, Zero-G)...";
                dynDesc = `Provides normal movement and action in ${sRank} specific hazardous environment(s).`;
            } else if (sType.includes("Permeate")) {
                let spd = "Speed rank 0";
                let baseRank = 2;
                if (sRank >= 6) { spd = "Normal ground speed"; baseRank = 6; }
                else if (sRank >= 4) { spd = "Speed rank 1"; baseRank = 4; }
                if (sRank < 2) {
                    dynDesc = `<span style="color: #ef4444;">Requires at least 2 ranks.</span>`;
                } else {
                    dynDesc = `<strong>Permeate Speed:</strong> ${spd} through obstacles (Base ${baseRank} ranks).`;
                }
            } else if (sType.includes("Wall-Crawling")) {
                dynDesc = sRank >= 4 ? "Full ground speed rank, not Vulnerable" : "Ground speed rank -1, Vulnerable while climbing";
            } else if (sType.includes("Water-Walking")) {
                dynDesc = sRank >= 2 ? "Can stand, move, and lie Prone on liquid surfaces" : "Can stand or move across liquid surfaces (sinks if Prone)";
            } else if (sType.includes("Safe Fall")) {
                dynDesc = "Fall any reasonable distance without harm.";
            } else if (sType.includes("Slithering")) {
                dynDesc = "Move at normal ground speed while Prone.";
            } else if (sType.includes("Swinging")) {
                dynDesc = sRank < 2 ? `<span style="color: #ef4444;">Requires 2 ranks.</span>` : "Swing through the air at speed rank 2.";
            } else if (sType.includes("Stable")) {
                placeholderText = "Specify unstable movement mode(s)...";
                dynDesc = `Ignore movement penalties for ${sRank} unstable movement mode(s).`;
            } else if (sType.includes("Trackless")) {
                placeholderText = "Specify sense type(s)...";
                dynDesc = `Leave no trail and cannot be tracked using ${sRank} sense type(s).`;
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
              else if (sType.includes("Computers")) dynDesc = sRank === 1 ? "Communicate to OR receive from digital devices." : "Communicate to AND comprehend digital devices.";
              else if (sType.includes("Languages")) {
                if (sRank === 1) dynDesc = "Communicate in OR understand any language.";
                else if (sRank === 2) dynDesc = "Communicate in AND understand any language.";
                else if (sRank === 3) dynDesc = "Communicate in multiple languages at once.";
                else dynDesc = "Communicate in any language and gain physical ability to do so.";
              } else if (sType.includes("Objects")) dynDesc = sRank >= 2 ? "Communicate with inanimate objects." : "Requires 2 ranks to function.";
              else if (sType.includes("Plants")) dynDesc = sRank >= 2 ? "Communicate to and comprehend plants." : "Requires 2 ranks to function.";
              else if (sType.includes("Spirits")) dynDesc = sRank === 1 ? "Comprehend spirits." : "Comprehend spirits and be understood by them.";
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
                let parentSenseTypeSub = effect.subPowers.find(sp => sp.type.includes(mySenseType) && sp.type.includes("Sense Type"));
                if (parentSenseTypeSub && parentSenseTypeSub.modifiers) {
                    let parentMetaNames = parentSenseTypeSub.modifiers.map(pm => pm.name.split(" (")[0]);
                    sub.modifiers = sub.modifiers.filter(sm => {
                        let coreName = sm.name.split(" (")[0];
                        return !parentMetaNames.includes(coreName);
                    });
                }
            }

            if (sub.modifiers && sub.modifiers.length > 0) {
              sub.modifiers.forEach((sMod, smIdx) => {
                if (sMod.isMeta) {
                  let mDescText = "";
                  let m = sMod.name;
                  let smRank = parseInt(sMod.ranks) || 1;
                  
                  if (m.includes("Extended")) {
                      let mult = Math.pow(10, smRank).toLocaleString();
                      mDescText = `x${mult} distance`;
                  } else if (m.includes("Rapid")) {
                      let mult = Math.pow(10, smRank).toLocaleString();
                      mDescText = `x${mult} perception speed`;
                  } else if (m.includes("Counters Illusion")) {
                      mDescText = "Ignores Illusion effects";
                  } else if (m.includes("Penetrates Concealment")) {
                      mDescText = "Ignores solid barriers and obstacles";
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
                    <div class="modifier-chip" style="background: rgba(59, 130, 246, 0.1); border-color: var(--accent-primary);">
                      <span><strong>${m.split(" [+")[0]}</strong></span>
                      ${stepperHtml}
                      <button type="button" style="background: none; border: none; color: #ef4444; font-weight: bold; cursor: pointer; padding: 0 4px; margin-left: 4px;" onclick="removeSubPowerModifier(${pIdx}, ${eIdx}, ${sIdx}, ${smIdx})" title="Remove Meta-Option">✕</button>
                      ${mDescText ? `<div style="font-size: 10px; width: 100%; color: var(--text-muted); margin-top: 2px;">${mDescText}</div>` : ''}
                    </div>
                  `;
                } else {
                  let mRanks = parseInt(sMod.ranks) || 1;
                  let mCostType = sMod.costType === "flat" ? " flat" : "/r";
                  let mCost = sMod.cost !== undefined ? sMod.cost : 1;
                  let isEx = sMod.category === 'extra' ? '+' : '-';
                  
                  subModsHtml += `
                    <div class="modifier-chip" style="font-size: calc(var(--font-size-minor-controls) * 0.9);">
                      <span><strong>${sMod.name.split(" [")[0]}</strong> (${isEx}${mCost}${mCostType})</span>
                      <div class="modifier-stepper-group" style="margin-left: 6px;">
                        <button type="button" class="modifier-stepper-btn" onclick="stepSubPowerModifierRank(${pIdx}, ${eIdx}, ${sIdx}, ${smIdx}, -1, 1, 20)">−</button>
                        <span class="modifier-stepper-val">${mRanks}</span>
                        <button type="button" class="modifier-stepper-btn" onclick="stepSubPowerModifierRank(${pIdx}, ${eIdx}, ${sIdx}, ${smIdx}, 1, 1, 20)">+</button>
                      </div>
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
                "Extended (Single Sense) [+1 pt/r]", "Extended (Sense Type) [+2 pts/r]", 
                "Penetrates Concealment [+4 pts]",
                "Radius (Single Sense) [+1 pt]", "Radius (Sense Type) [+2 pts]", 
                "Ranged (Single Sense) [+1 pt]", "Ranged (Sense Type) [+2 pts]",
                "Rapid (Single Sense) [+1 pt/r]", "Rapid (Sense Type) [+2 pts/r]", 
                "Tracking (Half Speed) [+1 pt]", "Tracking (Full Speed) [+2 pts]"
              ];

              if (isSenseTypeOpt) {
                  metaChoices = metaChoices.filter(c => !c.includes("(Single Sense)"));
              } else {
                  metaChoices = metaChoices.filter(c => !c.includes("(Sense Type)"));
              }

              if (!isSenseTypeOpt && mySenseType !== "Unknown") {
                  let parentSenseTypeSub = effect.subPowers.find(sp => sp.type.includes(mySenseType) && sp.type.includes("Sense Type"));
                  if (parentSenseTypeSub && parentSenseTypeSub.modifiers) {
                      parentSenseTypeSub.modifiers.forEach(pm => {
                          let coreMeta = pm.name.split(" (")[0]; 
                          metaChoices = metaChoices.filter(c => !c.startsWith(coreMeta));
                      });
                  }
              }

              if (isVisual) metaChoices = metaChoices.filter(c => !c.includes("Accurate") && !c.includes("Acute"));
              if (isAuditory) metaChoices = metaChoices.filter(c => !c.includes("Acute"));
              if (isTactile) metaChoices = metaChoices.filter(c => !c.includes("Accurate"));

              if (sub.modifiers && sub.modifiers.some(m => m.name.includes("Counters Concealment (All)"))) {
                  metaChoices = metaChoices.filter(c => !c.includes("Counters Concealment (One Descriptor)"));
              }

              metaPickerHtml = `
                <select id="selSubMeta_${pIdx}_${eIdx}_${sIdx}" class="minor-control" style="font-size: 11px; max-width: 200px;">
                  ${metaChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <button type="button" class="btn minor-control-btn" style="font-size: 11px; padding: 2px 6px;" onclick="addSubPowerMeta(${pIdx}, ${eIdx}, ${sIdx}, 'selSubMeta_${pIdx}_${eIdx}_${sIdx}')">+ Add Modifier</button>
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
              metaPickerHtml = `
                <select id="selSubMeta_${pIdx}_${eIdx}_${sIdx}" class="minor-control" style="font-size: 11px; max-width: 200px;">
                  ${metaChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <button type="button" class="btn minor-control-btn" style="font-size: 11px; padding: 2px 6px;" onclick="addSubPowerMeta(${pIdx}, ${eIdx}, ${sIdx}, 'selSubMeta_${pIdx}_${eIdx}_${sIdx}')">+ Add Modifier</button>
                <div style="display: inline-flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                  ${subModsHtml}
                </div>
              `;
            }

            let isImmunityLocked = effect.effectName === "Immunity" && !sType.includes("Custom");
            let isFlatAdvantage = effect.effectName === "Enhanced Trait" && typeof ADVANTAGES_LIST !== 'undefined' && ADVANTAGES_LIST.some(a => a.name === sType && !(a.hasRanks || a.ranked));
            let allowsRanks = (sub.costType === "per_rank") || (effect.effectName === "Enhanced Trait" && !isFlatAdvantage);

            let stepperControls = subMaxR > 1 && allowsRanks && !isImmunityLocked ? `
              <button type="button" class="stepper-btn stepper-dec" style="width: 26px !important; min-width: 26px !important;" onclick="stepSubPowerRank(${pIdx}, ${eIdx}, ${sIdx}, -1, 1, ${subMaxR})">−</button>
              <input type="number" class="stepper-input" style="width: 38px !important; min-width: 38px !important; font-size: var(--font-size-minor-controls);" value="${sRank}" min="1" max="${subMaxR}" readonly>
              <button type="button" class="stepper-btn stepper-inc" style="width: 26px !important; min-width: 26px !important;" onclick="stepSubPowerRank(${pIdx}, ${eIdx}, ${sIdx}, 1, 1, ${subMaxR})">+</button>
            ` : `
              <input type="number" class="stepper-input" style="width: 50px !important; min-width: 50px !important; font-size: var(--font-size-minor-controls); background: transparent; border: none;" value="${sRank}" readonly title="${isImmunityLocked ? 'Rank Locked by Tier' : (isFlatAdvantage ? 'Rank 1 (Standard Feat)' : 'Rank Locked')}">
            `;

            let cardStyle = "background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; padding: 8px 10px;";
            if (effect.effectName === "Enhanced Trait") {
                cardStyle += " flex: 1; min-width: calc(50% - 10px);";
            } else {
                cardStyle += " width: 100%;";
            }
            
            let arrowIcon = "";
            if (effect.effectName === "Enhanced Trait") {
                arrowIcon = sub.isReduced ? '<span style="color: #ef4444; font-size: 14px;" title="Reduced Trait">▼</span> ' : '<span style="color: #10b981; font-size: 14px;" title="Enhanced Trait">▲</span> ';
            }

            return `
              <div class="sub-power-card" style="${cardStyle}">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
                  <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
                    <strong style="font-size: var(--font-size-controls); color: var(--accent-primary); white-space: nowrap;">
                      ${arrowIcon}${sub.name.split(" [")[0] || sub.type}
                      ${dynDesc ? `<button type="button" class="btn-info-circle" style="min-width: 16px; min-height: 16px; font-size: 10px; margin-left: 4px; vertical-align: middle;" onclick="showOptionInfo('${(sub.name.split(" [")[0] || sub.type).replace(/'/g, "\\'")}', '${dynDesc.replace(/'/g, "\\'").replace(/"/g, "&quot;")}')" title="View Option Info">?</button>` : ''}
                    </strong>
                    <span class="badge effect-cost-badge" style="font-size: 11px; white-space: nowrap;">${sub.baseCost || 1} ${sub.costType === 'per_rank' ? 'PP/r' : 'PP'}</span>
                    ${effect.effectName !== "Enhanced Trait" && effect.effectName !== "Super-Senses" ? `
                        <input type="text" class="minor-control" placeholder="${placeholderText}" value="${sub.details || ''}" oninput="updateSubPowerDetails(${pIdx}, ${eIdx}, ${sIdx}, this.value)" style="flex: 1; min-width: 80px; border: 1px solid var(--border-color); background: var(--bg-panel); color: var(--text-main); font-size: 12px; padding: 2px 6px; margin-left: 4px; height: 24px;">
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
                    <button type="button" class="btn-delete-power" style="padding: 2px 6px; font-size: 11px;" onclick="removeSubPower(${pIdx}, ${eIdx}, ${sIdx})" title="Delete Option">Delete</button>
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
          optionPickersHtml = `
            <div class="power-options-row" style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end; background: var(--bg-panel); padding: 8px; border: 1px solid var(--border-color); border-radius: 4px; margin-top: 4px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">${effect.effectName} Option:</label>
                <select id="selOptionChoice_${pIdx}_${eIdx}" class="minor-control" style="width: 250px;">
                  <option value="">- Select Option -</option>
                  ${effectData.options.map(opt => `<option value="${opt.name} [${opt.cost} ${opt.costType === 'flat' ? 'pts' : 'pts/r'}]">${opt.name} [${opt.cost} ${opt.costType === 'flat' ? 'pts' : 'pts/r'}]</option>`).join('')}
                </select>
                <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selOptionChoice_${pIdx}_${eIdx}')">+ Add Option</button>
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

        let smartMods = window.generateSmartModifiers(effect);
        smartMods.extras.forEach(sm => {
            if (!existingModNames.includes(sm.name) && !genericIsShadowed(sm.name, specificModNames) && !availableRootExtras.some(m => m.name === sm.name)) {
                availableRootExtras.push(sm);
            }
        });
        smartMods.flaws.forEach(sm => {
            if (!existingModNames.includes(sm.name) && !genericIsShadowed(sm.name, specificModNames) && !availableRootFlaws.some(m => m.name === sm.name)) {
                availableRootFlaws.push(sm);
            }
        });
        
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
            if (typeof POWER_MODIFIERS_LIST !== 'undefined') {
              modData = POWER_MODIFIERS_LIST.find(m => m.name === mod.name);
            }
            if (!modData && effectData && effectData.uniqueModifiers) modData = effectData.uniqueModifiers.find(m => m.name === mod.name);
            if (!modData && effectData && effectData.specificExtras) modData = effectData.specificExtras.find(m => m.name === mod.name);
            if (!modData && effectData && effectData.specificFlaws) modData = effectData.specificFlaws.find(m => m.name === mod.name);
            if (!modData) modData = { name: mod.name, cost: mod.cost !== undefined ? mod.cost : 1, costType: mod.costType || "flat", category: mod.category || "extra", hasRanks: false };

            modData = JSON.parse(JSON.stringify(modData));
            const isPositive = (modData.category === "extra" || modData.category === "feat" || (effectData && effectData.specificExtras && effectData.specificExtras.some(e => e.name === mod.name)) || (effectData && effectData.specificFeats && effectData.specificFeats.some(e => e.name === mod.name)));
            const rateStr = modData.costType === 'per_rank' ? '/r' : (modData.costType === 'removable' ? '/5 PP' : ' flat');
            const needsRanks = (modData.hasRanks === true || modData.costType === 'per_rank' || modData.costType === 'removable');
            let maxR = modData.maxRanks || Math.max(Number(effect.rank) || 1, 1);
            if (mod.name === "Penetrating") maxR = Math.max(Number(effect.rank) || 20, 20); // Penetrating can theoretically exceed, but let's cap at power rank or 20
            const currentRanks = Math.min(maxR, Math.max(1, Number(mod.ranks) || 1));
            return `
              <div class="modifier-chip">
                <span><strong>${mod.name}</strong> (${isPositive ? '+' : '-'}${modData.cost}${rateStr})</span>
                ${needsRanks ? `
                  <div class="modifier-stepper-group">
                    <button type="button" class="modifier-stepper-btn" onclick="stepModifierRank(${pIdx}, ${eIdx}, ${mIdx}, -1, 1, ${maxR})">−</button>
                    <span class="modifier-stepper-val">${currentRanks}</span>
                    <button type="button" class="modifier-stepper-btn" onclick="stepModifierRank(${pIdx}, ${eIdx}, ${mIdx}, 1, 1, ${maxR})">+</button>
                  </div>
                ` : ''}
                <button type="button" class="btn-info-circle" style="min-width: 18px; min-height: 18px; font-size: calc(var(--font-size-minor-controls) * 0.85);" onclick="showModifierInfo('${mod.name}')" title="View Modifier Rule">?</button>
                <button type="button" style="background: none; border: none; color: #ef4444; font-weight: bold; cursor: pointer; padding: 0 2px;" onclick="removeModifier(${pIdx}, ${eIdx}, ${mIdx})" title="Remove Modifier">✕</button>
              </div>
            `;
          }).join(" ");
        } else {
          rootModifiersHtml = `<span class="secondary-text minor-control">No modifiers attached.</span>`;
        }

        let rankStepperHtml = "";
        if (effect.effectName === "") {
            rankStepperHtml = `<span class="secondary-text">Select an effect first</span>`;
        } else if (isComposite) {
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

        // Build list of potential link targets (previous effect + other effects across containers)
        let linkOptions = `<option value="">🔗 Not Linked</option>`;
        if (eIdx > 0) {
          const prevEff = powerContainer.effects[eIdx - 1];
          const prevName = prevEff.name || prevEff.effectName || ("Effect " + eIdx);
          linkOptions += `<option value="previous" ${effect.linkedTo === 'previous' ? 'selected' : ''}>🔗 Link to Previous (${prevName})</option>`;
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

            if (currTraits.action !== connTraits.action && currTraits.action !== "None" && connTraits.action !== "None") {
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

        return `
          <div class="effect-card ${isLinkedCard ? 'is-linked' : ''}" style="margin-top: 12px; padding-top: 12px; border-top: 2px dashed var(--text-muted);">
            
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    
                    <select onchange="updateEffectAssociation(${pIdx}, ${eIdx}, this.value)" class="minor-control" style="width: 135px; background: var(--bg-app);" title="Slot Role in Array">
                        <option value="" ${!effect.association || effect.association === '' ? 'selected' : ''}>- Select Array Role -</option>
                        <option value="primary" ${effect.association === 'primary' ? 'selected' : ''}>Primary Slot</option>
                        <option value="alternate" ${effect.association === 'alternate' ? 'selected' : ''} ${powerContainer.effects.length === 1 ? 'disabled style="color: var(--text-muted);"' : ''}>Alternate (1 PP)</option>
                        <option value="dynamic" ${effect.association === 'dynamic' ? 'selected' : ''} ${powerContainer.effects.length === 1 ? 'disabled style="color: var(--text-muted);"' : ''}>Dynamic (2 PP)</option>
                    </select>

                    <select onchange="updateEffectLink(${pIdx}, ${eIdx}, this.value)" class="minor-control" style="max-width: 175px; background: var(--bg-app);" title="Link this effect to another effect">
                        ${linkOptions}
                    </select>
                    
                    <select onchange="updateEffectDirect(${pIdx}, ${eIdx}, this.value)" class="minor-control" style="min-width: 160px; color: var(--accent-primary); font-weight: bold;">
                      <option value="" ${effect.effectName === "" ? "selected" : ""} style="color: var(--text-main); font-weight: normal;">- Select Effect -</option>
                      ${POWER_EFFECTS_LIST.filter(e => e.name !== "Pre-built Powers").map(eff => `<option value="${eff.name}" ${eff.name === effect.effectName ? 'selected' : ''} style="color: var(--text-main); font-weight: normal;">${eff.name} (${eff.baseCost} PP/r)</option>`).join('')}
                    </select>
                    ${effectData && effect.effectName !== "" ? `<button type="button" class="btn-info-circle" onclick="showPowerEffectInfo('${effect.effectName}')" title="View Effect Rules">?</button>` : ''}
                </div>
                
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <label>Rank:</label>
                    ${rankStepperHtml}
                    <span class="badge effect-cost-badge" style="margin-left: 8px; font-size: 11px;" title="Base Cost: ${rawEffectCost} PP">${effectCostDisplay}</span>
                    <button type="button" class="btn" style="padding: 2px 6px; font-size: 11px; margin-left: 8px;" onclick="resetEffect(${pIdx}, ${eIdx})" title="Reset Effect Profile">Reset</button>
                    <button type="button" class="btn-delete-power" style="padding: 2px 6px; font-size: 11px; margin-left: 4px;" onclick="deleteEffect(${pIdx}, ${eIdx})" title="Delete Effect">Delete</button>
                </div>
            </div>

            ${linkBannerHtml}

            <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 6px;">
                <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap; flex: 1;">
                  ${templateDropdownHtml}
                  <div style="display: flex; align-items: center; gap: 6px; flex: 1; min-width: 200px;">
                    <label style="font-size: var(--font-size-secondary); color: var(--text-muted); font-weight: 600; white-space: nowrap;">Descriptors:</label>
                    <input type="text" value="${effect.descriptors || ''}" placeholder="e.g. Fire, Magic, Technology, Piercing" style="flex: 1; min-width: 140px; font-size: var(--font-size-secondary); padding: 4px 8px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-panel); color: var(--text-main);" oninput="updateEffectDescriptorsDirect(${pIdx}, ${eIdx}, this.value)" onblur="if(window.PowerHistoryManager) window.PowerHistoryManager.recordChange('descriptors');">
                  </div>
                </div>
            </div>

            ${optionPickersHtml}

            ${subPowersHtml ? `<div style="margin-top: 8px;"><strong style="font-size: var(--font-size-secondary); color: var(--text-main);">Profile Options:</strong><div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px;">${subPowersHtml}</div></div>` : ''}

            ${effect.effectName !== "" ? `
            <div class="power-modifiers-row" style="margin-top: 8px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <select id="selRootExtra_${pIdx}_${eIdx}" class="minor-control" style="max-width: 170px;">
                  <option value="">+ Add Extra...</option>
                  ${availableSpecificExtras.length > 0 ? `<optgroup label="Effect-Specific Extras">${availableSpecificExtras.map(e => `<option value="${e.name}">${e.name} (+${e.cost || 1}${e.costType === 'flat' ? ' flat' : '/r'})${e.hasRanks && e.maxRanks && e.maxRanks < 20 ? ` (Max rank: ${e.maxRanks})` : ''}</option>`).join('')}</optgroup>` : ''}
                  <optgroup label="Universal Extras">
                    ${availableRootExtras.map(e => `<option value="${e.name}">${e.name} (+${e.cost}${e.costType === 'flat' ? ' flat' : '/r'})${e.hasRanks && e.maxRanks && e.maxRanks < 20 ? ` (Max rank: ${e.maxRanks})` : ''}</option>`).join('')}
                  </optgroup>
                </select>
                <button type="button" class="btn-info-circle" style="min-width: 18px; min-height: 18px; font-size: calc(var(--font-size-minor-controls) * 0.85); margin-left: -2px; margin-right: 2px;" onclick="const val = document.getElementById('selRootExtra_${pIdx}_${eIdx}').value; if(val) showModifierInfo(val);" title="View Info for Selected Extra">?</button>
                <button type="button" class="btn minor-control-btn" onclick="addModifierToEffect(${pIdx}, ${eIdx}, 'selRootExtra_${pIdx}_${eIdx}')">+ Extra</button>
              </div>

              <div style="display: flex; align-items: center; gap: 6px;">
                <select id="selRootFeat_${pIdx}_${eIdx}" class="minor-control" style="max-width: 170px;">
                  <option value="">+ Add Power Feat...</option>
                  ${availableSpecificFeats.length > 0 ? `<optgroup label="Effect-Specific Feats">${availableSpecificFeats.map(f => `<option value="${f.name}">${f.name} (+${f.cost || 1}${f.costType === 'flat' ? ' flat' : '/r'})${f.hasRanks && f.maxRanks && f.maxRanks < 20 ? ` (Max rank: ${f.maxRanks})` : ''}</option>`).join('')}</optgroup>` : ''}
                  <optgroup label="Universal Feats">
                    ${availableRootFeats.map(f => `<option value="${f.name}">${f.name} (+${f.cost} flat)${f.hasRanks && f.maxRanks && f.maxRanks < 20 ? ` (Max rank: ${f.maxRanks})` : ''}</option>`).join('')}
                  </optgroup>
                </select>
                <button type="button" class="btn-info-circle" style="min-width: 18px; min-height: 18px; font-size: calc(var(--font-size-minor-controls) * 0.85); margin-left: -2px; margin-right: 2px;" onclick="const val = document.getElementById('selRootFeat_${pIdx}_${eIdx}').value; if(val) showModifierInfo(val);" title="View Info for Selected Power Feat">?</button>
                <button type="button" class="btn minor-control-btn" onclick="addModifierToEffect(${pIdx}, ${eIdx}, 'selRootFeat_${pIdx}_${eIdx}')">+ Feat</button>
              </div>

              <div style="display: flex; align-items: center; gap: 6px;">
                <select id="selRootFlaw_${pIdx}_${eIdx}" class="minor-control" style="max-width: 170px;">
                  <option value="">+ Add Flaw...</option>
                  ${availableSpecificFlaws.length > 0 ? `<optgroup label="Effect-Specific Flaws">${availableSpecificFlaws.map(f => `<option value="${f.name}">${f.name} (-${Math.abs(f.cost || -1)}${f.costType === 'flat' ? ' flat' : '/r'})${f.hasRanks && f.maxRanks && f.maxRanks < 20 ? ` (Max rank: ${f.maxRanks})` : ''}</option>`).join('')}</optgroup>` : ''}
                  <optgroup label="Universal Flaws">
                    ${availableRootFlaws.map(f => `<option value="${f.name}">${f.name} (-${Math.abs(f.cost)}${f.costType === 'flat' ? ' flat' : '/r'})${f.hasRanks && f.maxRanks && f.maxRanks < 20 ? ` (Max rank: ${f.maxRanks})` : ''}</option>`).join('')}
                  </optgroup>
                </select>
                <button type="button" class="btn-info-circle" style="min-width: 18px; min-height: 18px; font-size: calc(var(--font-size-minor-controls) * 0.85); margin-left: -2px; margin-right: 2px;" onclick="const val = document.getElementById('selRootFlaw_${pIdx}_${eIdx}').value; if(val) showModifierInfo(val);" title="View Info for Selected Flaw">?</button>
                <button type="button" class="btn btn-secondary minor-control-btn" onclick="addModifierToEffect(${pIdx}, ${eIdx}, 'selRootFlaw_${pIdx}_${eIdx}')">+ Flaw</button>
              </div>

              <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; flex: 1; margin-top: 4px;">
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
            </div>

            <div class="power-notes-row" style="margin-top: 8px;">
              <label style="min-width: 80px;">Notes:</label>
              <textarea rows="1" placeholder="Details, limits, or custom sense descriptions..." oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'; updateEffectNotesDirect(${pIdx}, ${eIdx}, this.value)" onblur="if(window.PowerHistoryManager) window.PowerHistoryManager.recordChange('notes');">${effect.notes || ''}</textarea>
            </div>
          </div>
        `;
    }).join("");

    return `
      <div class="power-card ${isCollapsed}" id="powerCard_${pIdx}" style="border: 2px solid var(--border-color);">
        <div class="power-card-header" onclick="togglePowerCollapse(${pIdx})">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span id="powerCollapseIcon_${pIdx}" style="font-size: var(--font-size-secondary);">${powerContainer.collapsed ? '▶' : '▼'}</span>
            <input type="text" id="powerContainerName_${pIdx}" value="${powerContainer.name}" placeholder="Power Container Name" style="font-weight: bold; font-size: var(--font-size-labels); width: 200px; background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 6px; color: var(--text-main);" onclick="event.stopPropagation();" oninput="updatePowerContainerName(${pIdx}, this.value)" onblur="if(window.PowerHistoryManager) window.PowerHistoryManager.recordChange('container_name');">
            <span class="secondary-text" style="font-weight: normal; font-size: 13px;">(${summaryText})</span>
          </div>

          <div style="display: flex; align-items: center; gap: 12px;" onclick="event.stopPropagation();">
            ${window.activePowerContext === 'blueprints' ? `
              <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 4px; padding: 2px 8px; font-size: 11px; color: var(--accent-success); display: flex; flex-direction: column; align-items: center; line-height: 1.1; margin-right: 8px;">
                <strong>Check DC: ${10 + containerCost}</strong>
                <span>Normal: ${containerCost * 4} hrs | Fast: ${containerCost * 10} min</span>
              </div>
            ` : ''}
            <span class="badge" id="powerCostBadge_${pIdx}" style="font-size: var(--font-size-labels); font-weight: normal;">${containerCost} PP</span>
            <button type="button" id="btnPowerCollapse_${pIdx}" class="btn" style="padding: 4px 8px;" onclick="togglePowerCollapse(${pIdx})" title="${powerContainer.collapsed ? 'Edit Power Container' : 'Save and Collapse'}">${powerContainer.collapsed ? 'Edit' : 'Save'}</button>
            <button type="button" class="btn-delete-power" onclick="deletePowerContainer(${pIdx})" title="Delete Entire Container">Delete Container</button>
          </div>
        </div>

        <div class="power-card-body">
            ${effectsHtml}
            <div style="margin-top: 16px; padding-top: 8px; border-top: 2px solid var(--border-color); display: flex; justify-content: flex-end;">
                <button type="button" class="btn" onclick="addEffectToPower(${pIdx})">+ Add New Effect</button>
            </div>
        </div>
      </div>
    `;
  }).join("");

  if (window.PowerHistoryManager) {
    window.PowerHistoryManager.updateButtons();
  }
}

window.addOptionSubPower = function(pIdx, eIdx, selectId, isReduced = false) {
  const sel = document.getElementById(selectId);
  if (!sel || !sel.value || sel.value.startsWith("- Select")) return;
  const optChoice = sel.value;
  const effect = char.activePowers[pIdx].effects[eIdx];

  if (!effect.subPowers) effect.subPowers = [];
  
  let bCost = 1;
  let cType = "per_rank";
  let r = 1;

  if (effect.effectName === "Flight" || effect.effectName === "Teleport" || effect.effectName === "Move Object" || effect.effectName === "Create") bCost = 2;
  else if (effect.effectName === "Insubstantial") bCost = 10;
  else if (effect.effectName === "Comprehend") bCost = 2;

  if (optChoice.includes("[") && optChoice.includes("pts")) {
     const match = optChoice.match(/\[(\+?\d+)\+?\s*pts?(?:\/r)?\]/i) || optChoice.match(/\[(\+?\d+)\s*pt/i);
     if (match) {
         bCost = parseInt(match[1].replace('+', ''));
         if (optChoice.includes("/r") || optChoice.toLowerCase().includes("per rank") || optChoice.toLowerCase().includes("ranks")) {
             cType = "per_rank";
         } else {
             cType = "flat";
         }
     }
     if (optChoice.includes("Microscopic") || optChoice.includes("Extended Sense")) {
         bCost = 1; cType = "per_rank";
     }
  }

  let cleanName = optChoice.split(" [")[0];
  let coreName = cleanName.split(" (")[0]; 
  
  if (effect.effectName === "Immunity" || effect.effectName === "Enhanced Trait") {
      coreName = cleanName;
  } else {
      if (cleanName.includes("Dimensional Travel")) coreName = "Dimensional Travel";
      else if (cleanName.includes("Space Travel")) coreName = "Space Travel";
      else if (cleanName.includes("Permeate")) coreName = "Permeate";
      else if (cleanName.includes("Wall-Crawling")) coreName = "Wall-Crawling";
      else if (cleanName.includes("Water-Walking")) coreName = "Water-Walking";
  }

  if (effect.subPowers.some(sub => sub.type === coreName || sub.name === cleanName || (sub.name && sub.name.split(" [")[0] === cleanName))) {
      let warningsDisabled = (localStorage.getItem("mm2e_disable_warnings") ?? localStorage.getItem("mm4e_disable_warnings")) === "true";
      if (!warningsDisabled) {
          alert(coreName + " has already been added to this power. Increase its rank instead.");
      }
      return;
  }

  if (effect.effectName === "Immunity") {
      const rankMatch = optChoice.match(/\[(\d+)\s*ranks?\]/i);
      if (rankMatch) {
          r = parseInt(rankMatch[1]);
      }
      if (optChoice.includes("Custom Immunity")) {
          r = 1;
      }
  } else {
      if (cleanName.includes("Dimensional Travel (1 other)") || cleanName.includes("Space Travel (Solar system)") || cleanName.includes("Wall-Crawling (Speed -1)") || cleanName.includes("Permeate (Speed 0)") || cleanName === "Swinging") r = 2;
      if (cleanName.includes("Dimensional Travel (Related group)") || cleanName.includes("Space Travel (Interstellar)") || cleanName.includes("Permeate (Speed 1)") || cleanName.includes("Wall-Crawling (Full Speed)")) r = 4;
      if (cleanName.includes("Dimensional Travel (Any)") || cleanName.includes("Space Travel (Intergalactic)") || cleanName.includes("Permeate (Normal Speed)") || cleanName === "Microscopic Vision") r = 6;
      if (cleanName === "Microscopic Vision") r = 4; 
      if (cleanName.includes("Water-Walking (Prone)")) r = 2;
  }

  effect.subPowers.push({
    name: optChoice,
    type: coreName,
    rank: r,
    baseCost: bCost,
    costType: cType,
    details: "",
    modifiers: [],
    isReduced: isReduced
  });

  sel.selectedIndex = 0;
  buildPowersUI();
  refreshUI();
};

window.addSubPowerMeta = function(pIdx, eIdx, subIdx, selectId) {
  const sel = document.getElementById(selectId);
  if (!sel || !sel.value || sel.value.startsWith("- Select") || sel.value.startsWith("- None")) return;
  const metaName = sel.value;
  const effect = char.activePowers[pIdx].effects[eIdx];

  if (effect && effect.subPowers && effect.subPowers[subIdx]) {
    let sub = effect.subPowers[subIdx];
    if (!sub.modifiers) sub.modifiers = [];
    
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

    const isSenseMeta = effect.effectName === "Super-Senses";

    sub.modifiers.push({
      name: metaName,
      ranks: 1,
      cost: mCost, 
      costType: mType,
      category: mCategory,
      isMeta: isSenseMeta
    });
    
    let addedMetaCore = metaName.split(" (")[0];
    let subType = sub.type || sub.name;
    
    if (subType.includes("Sense Type") && metaName.includes("(Sense Type)")) {
        let mySenseCategory = subType.split(" - ")[0].replace(" Senses", "");
        effect.subPowers.forEach(otherSub => {
            let oType = otherSub.type || otherSub.name;
            if (!oType.includes("Sense Type") && SENSE_TYPE_MAP[oType] === mySenseCategory) {
                if (otherSub.modifiers) {
                    otherSub.modifiers = otherSub.modifiers.filter(m => !m.name.startsWith(addedMetaCore));
                }
            }
        });
    }

    sel.selectedIndex = 0;
    buildPowersUI();
    refreshUI();
  }
};

window.removeSubPower = function(pIdx, eIdx, subIdx) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx] && char.activePowers[pIdx].effects[eIdx].subPowers) {
    char.activePowers[pIdx].effects[eIdx].subPowers.splice(subIdx, 1);
    
    let maxR = window.getMaxPowerRank(char.activePowers[pIdx].effects[eIdx]);
    if (char.activePowers[pIdx].effects[eIdx].rank > maxR) {
        char.activePowers[pIdx].effects[eIdx].rank = maxR;
    }

    if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("remove_subpower");
    buildPowersUI();
    refreshUI();
  }
};

window.stepSubPowerRank = function(pIdx, eIdx, subIdx, delta, minVal, maxVal) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx] && char.activePowers[pIdx].effects[eIdx].subPowers && char.activePowers[pIdx].effects[eIdx].subPowers[subIdx]) {
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
    char.activePowers[pIdx].effects[eIdx].subPowers[subIdx].modifiers.splice(modIdx, 1);
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("remove_submod");
    buildPowersUI();
    refreshUI();
  }
};

window.addAfflictionCondition = function(pIdx, eIdx, degKey, selectId) {
    const sel = document.getElementById(selectId);
    if(!sel || !sel.value || sel.value.startsWith("-")) return;
    if(!char.activePowers[pIdx].effects[eIdx].options) char.activePowers[pIdx].effects[eIdx].options = {};
    char.activePowers[pIdx].effects[eIdx].options[degKey] = sel.value;
    sel.selectedIndex = 0;
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("add_affliction");
    buildPowersUI();
    refreshUI();
};

window.removeAfflictionCondition = function(pIdx, eIdx, degKey) {
    if(char.activePowers[pIdx].effects[eIdx].options) {
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
      name: "New Power Container",
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
    const card = document.getElementById(`powerCard_${index}`);
    const icon = document.getElementById(`powerCollapseIcon_${index}`);
    const btn = document.getElementById(`btnPowerCollapse_${index}`);
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

    effect.effectName = value;
    effect.isProfileExplicitlySelected = false;

    if (value && effect.effectCache[value]) {
        let cache = effect.effectCache[value];
        effect.options = JSON.parse(JSON.stringify(cache.options));
        effect.subPowers = JSON.parse(JSON.stringify(cache.subPowers));
        effect.modifiers = JSON.parse(JSON.stringify(cache.modifiers));
        effect.rank = cache.rank;
        effect.name = cache.name || value;
    } else {
        effect.options = {}; 
        effect.subPowers = [];
        effect.modifiers = [];
        effect.rank = 1;
        effect.name = value || "New Effect"; 
    }
    
    let maxR = window.getMaxPowerRank(effect);
    if (effect.rank > maxR) {
        effect.rank = maxR;
    }

    buildPowersUI();
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("update_effect");
    refreshUI();
  }
};

window.updatePowerProp = function(pIdx, eIdx, prop, value) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
    if (prop === 'rank') {
      let val = parseInt(value) || 1;
      let effect = char.activePowers[pIdx].effects[eIdx];
      let maxRank = window.getMaxPowerRank(effect);
      if (val > maxRank) val = maxRank;
      if (val < 1) val = 1;
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
    let effect = char.activePowers[pIdx].effects[eIdx];
    let maxRank = window.getMaxPowerRank(effect);
    
    let val = (parseInt(effect.rank) || 1) + delta;
    if (val < 1) val = 1;
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
    char.activePowers.splice(index, 1);
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("delete_container");
    buildPowersUI();
    refreshUI();
  }
};

window.deleteEffect = function(pIdx, eIdx) {
    if (char.activePowers[pIdx] && char.activePowers[pIdx].effects) {
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

window.addModifierToEffect = function(pIdx, eIdx, selectElemId) {
  const sel = document.getElementById(selectElemId);
  if (!sel || !sel.value) return;
  const modName = sel.value;
  const effect = char.activePowers[pIdx].effects[eIdx];

  let effName = effect.effectName;
  let effData = POWER_EFFECTS_LIST.find(e => e.name === effName);
  let modData = null;

  if (typeof POWER_MODIFIERS_LIST !== 'undefined') {
      modData = POWER_MODIFIERS_LIST.find(m => m.name === modName);
  }
  if (!modData && effData) {
      if (effData.uniqueModifiers) modData = effData.uniqueModifiers.find(m => m.name === modName);
      if (!modData && effData.specificExtras) modData = effData.specificExtras.find(m => m.name === modName);
      if (!modData && effData.specificFlaws) modData = effData.specificFlaws.find(m => m.name === modName);
  }
  if (!modData) {
      let smartMods = window.generateSmartModifiers(effect);
      modData = smartMods.extras.find(m => m.name === modName) || smartMods.flaws.find(m => m.name === modName);
  }
  if (!modData) modData = { name: modName, cost: 1, costType: "flat", category: "extra" };

  if (!effect.modifiers) effect.modifiers = [];
  const chosenCategory = selectElemId.includes("Extra") ? "extra" : (selectElemId.includes("Flaw") ? "flaw" : "feat");
  effect.modifiers.push({
    name: modName,
    ranks: 1,
    cost: modData.cost !== undefined ? modData.cost : 1,
    costType: modData.costType || "flat",
    category: chosenCategory
  });
  sel.value = "";
  if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("add_modifier");
  buildPowersUI();
  refreshUI();
};

window.stepModifierRank = function(pIdx, eIdx, modIdx, delta, minVal, maxVal) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx] && char.activePowers[pIdx].effects[eIdx].modifiers && char.activePowers[pIdx].effects[eIdx].modifiers[modIdx]) {
    let val = (parseInt(char.activePowers[pIdx].effects[eIdx].modifiers[modIdx].ranks) || 1) + delta;
    if (minVal !== undefined && val < minVal) val = minVal;
    if (maxVal !== undefined && val > maxVal) val = maxVal;
    char.activePowers[pIdx].effects[eIdx].modifiers[modIdx].ranks = val;
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordStepperChange(`mod_rank_${pIdx}_${eIdx}_${modIdx}`);
    buildPowersUI();
    refreshUI();
  }
};

window.removeModifier = function(pIdx, eIdx, modIdx) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx] && char.activePowers[pIdx].effects[eIdx].modifiers) {
    char.activePowers[pIdx].effects[eIdx].modifiers.splice(modIdx, 1);
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("remove_modifier");
    buildPowersUI();
    refreshUI();
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
        if (EXTRACTED_MODIFIERS["Shrinking"] && !EXTRACTED_MODIFIERS["Shrinking"].extras.some(e => e.name === "Atomic")) {
            EXTRACTED_MODIFIERS["Shrinking"].extras.push({name: "Atomic", cost: 1, costType: "flat"});
            EXTRACTED_MODIFIERS["Shrinking"].extras.push({name: "Microscopic", cost: 1, costType: "flat"});
            EXTRACTED_MODIFIERS["Shrinking"].extras.push({name: "Normal Speed", cost: 1, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Summon"] && !EXTRACTED_MODIFIERS["Summon"].extras.some(e => e.name === "Memory Merge")) {
            EXTRACTED_MODIFIERS["Summon"].extras.push({name: "Memory Merge", cost: 1, costType: "flat"});
            EXTRACTED_MODIFIERS["Summon"].extras.push({name: "Sacrifice", cost: 1, costType: "flat"});
        }
        if (EXTRACTED_MODIFIERS["Teleport"] && !EXTRACTED_MODIFIERS["Teleport"].extras.some(e => e.name === "Change Direction")) {
            EXTRACTED_MODIFIERS["Teleport"].extras.push({name: "Change Direction", cost: 1, costType: "flat"});
            EXTRACTED_MODIFIERS["Teleport"].extras.push({name: "Change Velocity", cost: 1, costType: "flat"});
            EXTRACTED_MODIFIERS["Teleport"].extras.push({name: "Easy", cost: 1, costType: "per_rank"});
            EXTRACTED_MODIFIERS["Teleport"].extras.push({name: "Known Location", cost: 1, costType: "flat"});
            EXTRACTED_MODIFIERS["Teleport"].extras.push({name: "Turnabout", cost: 1, costType: "flat"});
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
                    <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap; font-size: 12px; color: var(--text-muted);">
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
                    <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap; font-size: 12px; color: var(--text-muted);">
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

function populateUIFromCharacter() {
  if (document.getElementById("heroNameInput")) document.getElementById("heroNameInput").value = char.name || "New Hero";
  if (document.getElementById("playerNameInput")) document.getElementById("playerNameInput").value = char.playerName || "";
  if (document.getElementById("heroPLInput")) document.getElementById("heroPLInput").value = char.powerLevel || 10;
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
      if (el) el.value = v;
    }
  }
  if (char.absentAbilities) {
    for (const [k, v] of Object.entries(char.absentAbilities)) {
      const chk = document.getElementById(`enable_${k}`);
      const input = document.getElementById(`input_${k}`);
      const dec = document.getElementById(`dec_${k}`);
      const inc = document.getElementById(`inc_${k}`);
      if (chk) chk.checked = !v;
      if (input) input.disabled = v;
      if (dec) dec.disabled = v;
      if (inc) inc.disabled = v;
    }
  }

  if (document.getElementById("bgIdentity")) document.getElementById("bgIdentity").value = char.identity || "";
  if (document.getElementById("bgMotivation")) document.getElementById("bgMotivation").value = char.motivation || "";
  if (document.getElementById("bgComplications")) document.getElementById("bgComplications").value = char.complications || "";
  if (document.getElementById("bgHistory")) document.getElementById("bgHistory").value = char.history || "";

  buildSkillsUI();
  buildAdvantagesUI();
  buildPowersUI();
  buildEquipmentUI();
  refreshUI();
}

function applyLoadedCharacter(loaded) {
  if (!loaded) return;
  char.deserialize(loaded);
  populateUIFromCharacter();
}

function refreshUI() {
  document.getElementById("lblHeroName").textContent = char.name;
  document.getElementById("lblPL").textContent = char.powerLevel;

  const massRank = char.massRank !== null ? char.massRank : 3;
  const massLbs = typeof CharacterModel !== 'undefined' ? CharacterModel.getProgressionValue(massRank) * 5 : 200;
  document.getElementById("lblHeroMassVal").textContent = typeof CharacterModel !== 'undefined' ? `(${CharacterModel.formatWeight(massLbs)})` : "";

  const pp = char.powerPointsSummary;
  document.getElementById("lblAbilPP").textContent = `${pp.abilities} PP`;
  document.getElementById("lblCombatPP").textContent = `${pp.combat} PP`;
  document.getElementById("lblResistPP").textContent = `${pp.resistances} PP`;
  document.getElementById("lblSkillPP").textContent = `${pp.skills} PP`;
  document.getElementById("lblAdvPP").textContent = `${pp.feats} PP`;
  document.getElementById("lblPowerPP").textContent = `${pp.powers} PP`;
  document.getElementById("lblTotalPP").textContent = `${pp.totalSpent} / ${char.totalPointsAllowed} PP`;

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
      return `<span class="skill-adv-tag active-adv-tag" style="cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-size: 0.9em; padding: 2px 6px;" onclick="${clickFn}" title="${isEnhanced ? 'Enhanced Feat' : 'View description'}">
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
  if (elFortitude) elFortitude.textContent = derived.fortitude === null ? "—" : derived.fortitude;
  const elWill = document.getElementById("resWill");
  if (elWill) elWill.textContent = derived.will === null ? "—" : derived.will;

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
    elAdjToughness.innerHTML = (sta === null ? "Absent CON" : `CON (${sta}) + Def Roll (${defRoll}) + Protection (${protOnly})${enhToughStr}${toughNote}`) + enhToughTag + enhConTag + generateCombatTags(["Defensive Roll", "Uncanny Dodge"]);
  }

  const elAdjFort = document.getElementById("adjFort");
  if (elAdjFort) {
    const gfRanks = (char.effectiveFeats || char.feats)["Great Fortitude"] || 0;
    const gfStr = gfRanks > 0 ? ` + Great Fortitude (+${gfRanks * 2})` : "";
    const enhFortStr = enhFort > 0 ? ` + Enhanced (${enhFort})` : "";
    const enhFortTag = enhFort > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced Fortitude +${enhFort}]</span>` : "";
    const enhConTag = enhCon > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced CON +${enhCon}]</span>` : "";
    elAdjFort.innerHTML = (sta === null ? "Absent CON" : `CON (${sta}) + Bought (${char.purchasedResistances.Fortitude || 0})${enhFortStr}${gfStr}`) + enhFortTag + enhConTag + generateCombatTags(["Endurance", "Diehard", "Great Fortitude"]);
  }

  const elAdjWill = document.getElementById("adjWill");
  if (elAdjWill) {
    const iwRanks = (char.effectiveFeats || char.feats)["Iron Will"] || 0;
    const iwStr = iwRanks > 0 ? ` + Iron Will (+${iwRanks * 2})` : "";
    const enhWillStr = enhWill > 0 ? ` + Enhanced (${enhWill})` : "";
    const enhWillTag = enhWill > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced Will +${enhWill}]</span>` : "";
    const enhWisTag = enhWis > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced WIS +${enhWis}]</span>` : "";
    elAdjWill.innerHTML = (awe === null ? "Absent WIS" : `WIS (${awe}) + Bought (${char.purchasedResistances.Will || 0})${enhWillStr}${iwStr}`) + enhWillTag + enhWisTag + generateCombatTags(["Fearless", "Iron Will", "Trance"]);
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

  document.getElementById("resInitiative").textContent = derived.initiative;
  const elAdjInit = document.getElementById("adjInitiative");
  if (elAdjInit) {
    const enhDexTag = enhDex > 0 ? `&nbsp;<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;">[Enhanced DEX +${enhDex}]</span>` : "";
    elAdjInit.innerHTML = `DEX (${dexRank}) + Imp Initiative (+${impInit * 4})` + enhDexTag + generateCombatTags(["Improved Initiative", "Seize the Initiative"]);
  }

  if (typeof CharacterModel !== 'undefined') {
    const groundDist = CharacterModel.getSpeedDistance(derived.groundSpeed);
    document.getElementById("resGroundSpeed").textContent = derived.groundSpeed ? `Rank ${derived.groundSpeed} (${groundDist})` : `(${groundDist})`;
    
    if (derived.airSpeed !== null && derived.airSpeed > 0) {
      const airDist = CharacterModel.getSpeedDistance(derived.airSpeed);
      document.getElementById("resAirSpeed").textContent = `Rank ${derived.airSpeed} (${airDist})`;
    } else {
      document.getElementById("resAirSpeed").textContent = "—";
    }

    if (derived.waterSpeed !== null && derived.waterSpeed > 0) {
      const waterDist = CharacterModel.getSpeedDistance(derived.waterSpeed);
      document.getElementById("resWaterSpeed").textContent = `Rank ${derived.waterSpeed} (${waterDist})`;
    } else {
      document.getElementById("resWaterSpeed").textContent = "—";
    }
    
    document.getElementById("resSpaceSpeed").textContent = "—";
    
    const strRank = char.getAbilityRank("STR");
    const totalLiftRank = (strRank === null ? -5 : strRank) + pMods.extraLifting;
    const liftDist = CharacterModel.getCarryingCapacity(totalLiftRank);
    document.getElementById("resMaxLifting").textContent = `Rank ${totalLiftRank} (${liftDist})`;
  }
  document.getElementById("resSpacesReach").textContent = `${derived.spaces} / ${derived.reach}`;

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
          ${cs.name}
          <button type="button" class="btn-info-circle" onclick="showSkillInfo('${cs.name}')" title="View Skill Rules">?</button>
        </span>
        <span class="combat-conditional-desc">${cs.action}</span>
      </div>
    `;
  });

  if (typeof ADVANTAGES_LIST !== 'undefined') {
    ADVANTAGES_LIST.forEach(adv => {
      if ((adv.category === "Combat" || (adv.types && adv.types.includes("Combat"))) && adv.conditionalSummary) {
        const ranks = (char.effectiveFeats || char.feats)[adv.name] || 0;
        if (ranks > 0) {
          const detail = char.featDetails[adv.name] ? ` (${char.featDetails[adv.name]})` : "";
          const rankLabel = adv.ranked ? ` [Rank ${ranks}]` : "";
          activeCombatAdvHTML += `
            <div class="combat-conditional-row">
              <span class="combat-conditional-name">
                ${adv.name}${rankLabel}${detail}
                <button type="button" class="btn-info-circle" onclick="showAdvantageInfo('${adv.name}')" title="View Feat Rules">?</button>
              </span>
              <span class="combat-conditional-desc">${adv.conditionalSummary}</span>
            </div>
          `;
        }
      }
    });
  }

  combatAdvListContainer.innerHTML = activeCombatAdvHTML;

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
    const enhVal = (char.enhancedTraits && char.enhancedTraits.abilities[k]) ? char.enhancedTraits.abilities[k] : 0;
    const totalElem = document.getElementById(`total_rank_${k}`);
    const adjElem = document.getElementById(`adj_${k}`);

    if (val === null) {
      if (totalElem) totalElem.textContent = "—";
      if (adjElem) adjElem.innerHTML = "<span style='color:#ef4444;'>Absent / Disabled</span>";
    } else {
      if (totalElem) totalElem.textContent = val;
      if (adjElem) {
        let adjHTML = "";
        const effFeats = char.effectiveFeats || char.feats;
        const activeFeats = (abilityRelatedFeats[k] || []).filter(advName => (effFeats[advName] || 0) > 0);
        const tags = [];
        if (enhVal > 0) {
          tags.push(`<span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600;" title="Enhanced Trait">+${enhVal} Enhanced Trait</span>`);
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

  if (typeof SKILLS_LIST !== 'undefined') {
    const maxSkillCap = char.powerLevel + 10;
    SKILLS_LIST.forEach(skill => {
      const idSafe = skill.name.replace(/[^a-zA-Z0-9]/g, "_");
      let base = 0;
      if (skill.ability === "ATK") {
        base = char.getCombatRank("ATK");
      } else {
        const val = char.getAbilityRank(skill.ability);
        base = val === null ? -5 : val;
      }

      const bought = char.skills[skill.name] || 0;
      const enhancedSkill = (char.enhancedTraits && char.enhancedTraits.skills && char.enhancedTraits.skills[skill.name]) ? char.enhancedTraits.skills[skill.name] : 0;
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

  toast.innerHTML = `<span style="font-size:16px;">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("toast-visible");
  });

  setTimeout(() => {
    toast.classList.remove("toast-visible");
    toast.classList.add("toast-hiding");
    setTimeout(() => toast.remove(), 300);
  }, durationMs);
}

/* ==========================================================================
   BACKGROUND & IDENTITY HANDLERS
   ========================================================================== */

function setupBackgroundHandlers() {
  const bgId = document.getElementById("bgIdentity");
  const bgMot = document.getElementById("bgMotivation");
  const bgComp = document.getElementById("bgComplications");
  const bgHist = document.getElementById("bgHistory");

  if (bgId) bgId.addEventListener("input", (e) => { char.identity = e.target.value; });
  if (bgMot) bgMot.addEventListener("input", (e) => { char.motivation = e.target.value; });
  if (bgComp) bgComp.addEventListener("input", (e) => { char.complications = e.target.value; });
  if (bgHist) bgHist.addEventListener("input", (e) => { char.history = e.target.value; });
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

/* ==========================================================================
   LOCAL FILE MANAGER (.mm2e) WITH FILE SYSTEM ACCESS API & FALLBACKS
   ========================================================================== */

const FileManager = {
  currentFileHandle: null,
  currentFileName: null,
  activeDirectoryHandle: null,
  activeDirectoryName: null,

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
    if (!badge) return;
    if (this.currentFileName) {
      badge.textContent = `[${this.currentFileName}]`;
      badge.title = `Active File: ${this.currentFileName}`;
    } else {
      badge.textContent = `[Unsaved Character]`;
      badge.title = `Unsaved Character`;
    }
  },

  getPickerOptions: function(suggestedName = null) {
    const options = {
      types: [{
        description: "Mutants & Masterminds 2E Character File (*.mm2e)",
        accept: { "application/json": [".mm2e", ".json", ".mm4e"] }
      }]
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
    const safeHeroName = char.name ? char.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : "hero";
    const defaultFileName = `${safeHeroName}.mm2e`;
    const payload = JSON.stringify(char.serialize(), null, 2);

    if (window.showSaveFilePicker) {
      try {
        const pickerOptions = this.getPickerOptions(defaultFileName);
        const handle = await window.showSaveFilePicker(pickerOptions);
        const writable = await handle.createWritable();
        await writable.write(payload);
        await writable.close();

        this.currentFileHandle = handle;
        this.currentFileName = handle.name;
        // Last used save location becomes the starting point for further loads and saves
        if (!this.activeDirectoryName) {
          this.activeDirectoryHandle = handle;
        }
        this.updateFileStatusUI();
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
    this.updateFileStatusUI();

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

    const payload = JSON.stringify(char.serialize(), null, 2);
    try {
      const writable = await this.currentFileHandle.createWritable();
      await writable.write(payload);
      await writable.close();
      this.updateFileStatusUI();
      showToast(`Saved "${this.currentFileName}" successfully!`, "success");
      return true;
    } catch (err) {
      console.warn("Direct file save failed, reverting to Save As prompt:", err);
      return this.saveHeroAs();
    }
  },

  // Load: Opens native OS open dialog starting in active/last used folder, or opens file input
  loadHero: async function() {
    if (window.showOpenFilePicker) {
      try {
        const pickerOptions = this.getPickerOptions();
        pickerOptions.multiple = false;
        const [handle] = await window.showOpenFilePicker(pickerOptions);
        const file = await handle.getFile();
        const text = await file.text();
        const parsed = JSON.parse(text);

        applyLoadedCharacter(parsed);
        this.currentFileHandle = handle;
        this.currentFileName = handle.name;
        // Last used location becomes the default starting point for further operations
        if (!this.activeDirectoryName) {
          this.activeDirectoryHandle = handle;
        }
        this.updateFileStatusUI();
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
          <div style="line-height: 1.6; font-size: var(--font-size-controls);">
            <p style="margin-bottom: 8px;"><strong>Why this happens:</strong> For security, browsers prevent websites from directly opening internal configuration pages (like <code>about:preferences</code>) or modifying folder paths via scripts.</p>
            <p style="margin-bottom: 8px;">To set your save folder in Firefox:</p>
            
            <div style="margin: 10px 0 14px 0; padding: 8px 12px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <div>
                <span style="color: var(--text-muted); font-size: var(--font-size-secondary);">Firefox Address:</span>
                <code style="font-weight: bold; color: var(--accent-primary); margin-left: 6px;">about:preferences</code>
              </div>
              <button type="button" class="btn btn-secondary" style="font-size: var(--font-size-minor-controls); padding: 4px 10px;" onclick="navigator.clipboard.writeText('about:preferences').then(() => { this.textContent = '✓ Copied!'; setTimeout(() => this.textContent = '📋 Copy Address', 2000); })">📋 Copy Address</button>
            </div>

            <ol style="margin-left: 20px; margin-bottom: 12px; display: flex; flex-direction: column; gap: 8px;">
              <li>Open a new tab in Firefox and paste or enter <code>about:preferences</code> in the address bar.</li>
              <li>Under <strong>General &gt; Files and Applications &gt; Downloads</strong>:
                <ul style="margin-left: 16px; margin-top: 4px; display: flex; flex-direction: column; gap: 4px;">
                  <li><strong>Recommended:</strong> Check <em>"Always ask you where to save files"</em>.</li>
                  <li>Or click <strong>"Browse..."</strong> next to <em>Save files to</em> to choose a default folder.</li>
                </ul>
              </li>
              <li><strong>How Saving Works in Firefox:</strong> When you click <em>Save Character</em> or <em>Save As</em>, Firefox will show its confirmation prompt (<em>"Open with / Save File"</em>). Click <strong>OK</strong> and the standard Windows "Save As" file explorer dialog will immediately open so you can choose any directory or file name!</li>
            </ol>
            <p style="color: var(--text-muted); font-size: var(--font-size-secondary);">Tip: In Chromium browsers (Chrome, Edge, Opera, Brave), direct folder selection works via the File System Access API without the browser prompt step.</p>
          </div>
        `;
        modal.classList.add("active");
      } else {
        showToast("Firefox manages save folders in Settings > Downloads.", "info");
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
      char.reset();
      this.currentFileHandle = null;
      this.currentFileName = null;
      this.updateFileStatusUI();
      populateUIFromCharacter();
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

  if (btnNew) btnNew.addEventListener("click", () => FileManager.newHero());
  if (btnSave) btnSave.addEventListener("click", () => FileManager.saveHero());
  if (btnSaveAs) btnSaveAs.addEventListener("click", () => FileManager.saveHeroAs());
  if (btnLoad) btnLoad.addEventListener("click", () => FileManager.loadHero());
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
          applyLoadedCharacter(loadedData);
          FileManager.currentFileHandle = null;
          FileManager.currentFileName = file.name;
          FileManager.updateFileStatusUI();
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
