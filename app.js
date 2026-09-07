let char = new CharacterModel();
window.char = char;
window.primaryHero = null;
window.activeCompanionId = null;
char.powers = [];

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
    } else if (baseRange === "Ranged") {
        extras.push({ name: "Extended Range", cost: 1, costType: "flat", hasRanks: true, maxRanks: 10, category: "extra" });
        extras.push({ name: "Increased Range", cost: 1, costType: "per_rank", hasRanks: false, category: "extra" });
        extras.push({ name: "Perception Range", cost: 1, costType: "per_rank", hasRanks: false, category: "extra" });
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
      // Universal Extras and Feats always allowed
      if (m.name.startsWith("Progression")) return true;
      if (m.category === "feat" && (m.name === "Subtle" || m.name === "Innate" || m.name === "Precise" || m.name === "Reversible" || m.name === "Slow Fade" || m.name === "Variable Descriptor" || m.name === "Triggered" || m.name === "Transmutation")) {
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
  const isComposite = ["Enhanced Senses", "Enhanced Movement", "Enhanced Trait", "Comprehend", "Feature", "Immunity", "Super-Senses", "Super-Movement", "Senses", "Movement"].includes(effect.effectName);

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

        if (sCost < 1 && effect.effectName !== "Enhanced Trait") sCost = 1;
        
        if (sub.isReduced) {
            sCost = -sCost;
        }
        
        totalSubCost += sCost;
      });
      if (effect.effectName === "Enhanced Trait") {
        totalSubCost = Math.ceil(totalSubCost);
      }
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
  setupCompanionModalHandlers();
  setupSortingHeaders();
  setupDefenseSteppers();
  setupPowerHandlers();
  setupEquipmentHandlers();
  buildEquipmentUI();
  FileManager.init();
  refreshUI();
});

function setupTabs() {
  let previousActiveTab = "tab-basics";

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
      btn.classList.add("active");
      const targetContent = document.getElementById(btn.dataset.tab);
      if (targetContent) targetContent.classList.add("active");

      // Hide back button when any normal tab is clicked
      const btnBack = document.getElementById("btnBackFromTables");
      if (btnBack) btnBack.style.display = "none";
      
      // Update power context for shared UI logic
      if (btn.dataset.tab === "tab-blueprints") {
          window.activePowerContext = 'blueprints';
          buildPowersUI();
      } else if (btn.dataset.tab === "tab-powers") {
          window.activePowerContext = 'powers';
          buildPowersUI();
      } else if (btn.dataset.tab === "tab-companions") {
          buildCompanionsUI();
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
      if (tablesContent) tablesContent.classList.add("active");

      if (btnBackFromTables) {
        btnBackFromTables.style.display = "inline-flex";
        const prevBtn = document.querySelector(`.tab-btn[data-tab="${previousActiveTab}"]`);
        const prevName = prevBtn ? prevBtn.textContent.trim() : "Previous View";
        btnBackFromTables.title = `Return to ${prevName}`;
      }
    });
  }

  if (btnBackFromTables) {
    btnBackFromTables.addEventListener("click", () => {
      const targetTab = previousActiveTab || "tab-basics";
      const targetBtn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
      if (targetBtn) {
        targetBtn.click();
      } else {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
        const targetContent = document.getElementById(targetTab);
        if (targetContent) targetContent.classList.add("active");
        btnBackFromTables.style.display = "none";
      }
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
      if (e.target.value === "__add_new__") {
        openCreateCompanionModal();
        e.target.value = window.activeCompanionId || "main";
      } else if (e.target.value === "main") {
        returnToPrimaryHero();
      } else {
        switchToCompanion(e.target.value);
      }
    });
  }
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
  const savedLabelFont = Math.max(14, parseInt(localStorage.getItem("mm2e_font_labels") || localStorage.getItem("mm4e_font_labels") || "16", 10));
  const savedControlFont = Math.max(12, parseInt(localStorage.getItem("mm2e_font_controls") || localStorage.getItem("mm4e_font_controls") || "14", 10));
  const savedLinkFont = Math.max(11, parseInt(localStorage.getItem("mm2e_font_links") || localStorage.getItem("mm4e_font_links") || "14", 10));
  const savedSecondaryFont = Math.max(12, parseInt(localStorage.getItem("mm2e_font_secondary") || localStorage.getItem("mm4e_font_secondary") || "14", 10));
  const savedMinorControlFont = Math.max(12, parseInt(localStorage.getItem("mm2e_font_minor_controls") || localStorage.getItem("mm4e_font_minor_controls") || "14", 10));
  
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
    char.name = e.target.value;
    refreshUI();
  });
  document.getElementById("playerNameInput").addEventListener("input", (e) => {
    char.playerName = e.target.value;
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
    const skillNameStyle = val > 0 ? 'color: #f59e0b;' : '';

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
        <td><strong style="${skillNameStyle}">${item.name}</strong></td>
        <td>${item.ability}</td>
        <td>${item.untrained ? `<span style="color:#10b981; font-weight:600;">Yes</span>` : `<span style="color:#f59e0b; font-weight:600;">Trained Only</span>`}</td>
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
          <button type="button" class="btn-info-circle" onclick="window.showSkillInfo('${item.name.replace(/'/g, "\\'")}')" title="View Skill Rules">?</button>
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

const MECHA_SUBOPTIONS_MAP = {
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

window.MECHA_SUBOPTIONS_MAP = MECHA_SUBOPTIONS_MAP;

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
  } else if (typeof MECHA_SUBOPTIONS_MAP !== 'undefined' && MECHA_SUBOPTIONS_MAP[baseKey]) {
    neededSlots = Math.max(1, r);
  }

  let mapOpts = (typeof MECHA_SUBOPTIONS_MAP !== 'undefined' && MECHA_SUBOPTIONS_MAP[baseKey]) ? MECHA_SUBOPTIONS_MAP[baseKey] : [];
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

window.updateMechaSubOptionSlot = function(featKey, slotIdx, newSubOption) {
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

window.updateMechaSubOption = function(featKey, newSubOption) {
  window.updateMechaSubOptionSlot(featKey, 0, newSubOption);
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
        <td colspan="7" style="text-align: center; padding: 24px; color: var(--text-muted);">
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

    const advNameStyle = effVal > 0 ? 'color: #f59e0b;' : '';
    const enhBadge = enhFeat > 0 ? ` <span class="skill-adv-tag active-adv-tag" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; font-weight: 600; font-size: 0.85em; padding: 1px 5px;" title="Enhanced Trait">[+${enhFeat} Enhanced]</span>` : '';

    let detailCellHTML = `<span class="secondary-text">—</span>`;
    if (adv.name === "Skill Mastery" && effVal > 0) {
      let selectedArr = [];
      try { selectedArr = JSON.parse(detailVal || "[]"); } catch(e) {}
      const selectedCount = selectedArr.length;
      const displayStr = selectedCount > 0 ? selectedArr.join(", ") : "<em>No skills</em>";
      detailCellHTML = `
        <div style="display:flex; flex-direction:column; gap:4px; max-width: 160px;">
          <span class="secondary-text" style="font-size: 0.85em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${selectedCount > 0 ? selectedArr.join(", ") : ""}">
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
        <div style="display:flex; flex-direction:column; gap:4px; max-width: 190px;">
          <span class="secondary-text" style="font-size: 0.85em;">Budget: <strong>${budget} PP</strong> (Max PL ${rootHero.powerLevel})</span>
          ${comps.map(c => `<button type="button" class="btn btn-sm" onclick="switchToCompanion('${c.id}')" title="Edit companion sheet">🤝 Edit "${c.name}"</button>`).join('')}
          <button type="button" class="btn btn-sm btn-secondary" onclick="buildOrEditCompanionForSource('sidekick')">+ Build Sidekick</button>
        </div>
      `;
    } else if (adv.name === "Minions" && effVal > 0) {
      const budget = effVal * 15;
      const rootHero = window.primaryHero || char;
      const comps = (rootHero.companions || []).filter(c => c.type === "minion");
      detailCellHTML = `
        <div style="display:flex; flex-direction:column; gap:4px; max-width: 190px;">
          <span class="secondary-text" style="font-size: 0.85em;">Budget: <strong>${budget} PP</strong></span>
          ${comps.map(c => `<button type="button" class="btn btn-sm" onclick="switchToCompanion('${c.id}')" title="Edit minion sheet">👥 Edit "${c.name}"</button>`).join('')}
          <button type="button" class="btn btn-sm btn-secondary" onclick="buildOrEditCompanionForSource('minion')">+ Build Minion</button>
        </div>
      `;
    } else if (typeof MECHA_SUBOPTIONS_MAP !== 'undefined' && (MECHA_SUBOPTIONS_MAP[baseKey] || baseKey === "Electromagnetic Seal" || baseKey === "Ejector Seat")) {
      const opts = MECHA_SUBOPTIONS_MAP[baseKey] || [];
      const slots = window.getFeatSubOptionsList(adv.name, effVal);

      const makeOptionsHTML = (currentVal, optionsList) => {
        const hasVal = currentVal && optionsList.some(o => o.value === currentVal);
        const listToRender = (currentVal && !hasVal) ? [...optionsList, { value: currentVal }] : optionsList;
        return listToRender.map(o => `<option value="${o.value.replace(/"/g, '&quot;')}" ${o.value === currentVal ? 'selected' : ''}>${o.value}</option>`).join('');
      };

      if (baseKey === "Electromagnetic Seal") {
        const upgradeOpts = opts.filter(o => !o.value.startsWith("Base Seal"));
        detailCellHTML = `
          <div style="display: flex; flex-direction: column; gap: 4px; max-width: 320px;">
            <div style="font-size: 11px; padding: 2px 6px; background: rgba(2, 132, 199, 0.12); border-radius: 4px; color: #0284c7; font-weight: 600;">
              🛡️ Base Radiation &amp; Cosmic Ray Seal (Rank 1)
            </div>
            ${slots.map((slotVal, sIdx) => `
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: 11px; font-weight: 700; color: #0284c7; min-width: 72px;">Upgrade #${sIdx + 1}:</span>
                <select class="adv-suboption-select" onchange="window.updateMechaSubOptionSlot('${adv.name.replace(/'/g, "\\'")}', ${sIdx}, this.value)" style="font-size: var(--font-size-controls); padding: 2px 6px; width: 100%; border-radius: 4px; border: 1.5px solid #0284c7; background: var(--bg-card); color: var(--text-main); font-weight: 500; cursor: pointer;">
                  ${makeOptionsHTML(slotVal, upgradeOpts)}
                </select>
              </div>
            `).join('')}
          </div>
        `;
      } else if (baseKey === "Ejector Seat") {
        const upgradeOpts = opts.filter(o => o.value !== "Leaping 5 Launch Distance");
        detailCellHTML = `
          <div style="display: flex; flex-direction: column; gap: 4px; max-width: 320px;">
            <div style="font-size: 11px; padding: 2px 6px; background: rgba(2, 132, 199, 0.12); border-radius: 4px; color: #0284c7; font-weight: 600;">
              🚀 Base Leaping 5 Escape Launch (Rank 1)
            </div>
            ${slots.map((slotVal, sIdx) => `
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: 11px; font-weight: 700; color: #0284c7; min-width: 72px;">Upgrade #${sIdx + 1}:</span>
                <select class="adv-suboption-select" onchange="window.updateMechaSubOptionSlot('${adv.name.replace(/'/g, "\\'")}', ${sIdx}, this.value)" style="font-size: var(--font-size-controls); padding: 2px 6px; width: 100%; border-radius: 4px; border: 1.5px solid #0284c7; background: var(--bg-card); color: var(--text-main); font-weight: 500; cursor: pointer;">
                  ${makeOptionsHTML(slotVal, upgradeOpts)}
                </select>
              </div>
            `).join('')}
          </div>
        `;
      } else if (baseKey === "Environmental Seal") {
        const dur = window.getEnvSealDuration(effVal);
        const currentDetail = slots[0] || (opts[0] ? opts[0].value : "Vacuum & Deep Space");
        detailCellHTML = `
          <div style="display: flex; flex-direction: column; gap: 4px; max-width: 280px;">
            <div style="font-size: 11px; padding: 2px 6px; background: rgba(2, 132, 199, 0.12); border-radius: 4px; color: #0284c7; font-weight: 600;">
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
          <div style="display: flex; flex-direction: column; gap: 4px; max-width: 320px;">
            <div style="font-size: 11px; padding: 2px 6px; background: rgba(2, 132, 199, 0.12); border-radius: 4px; color: #0284c7; font-weight: 600;">
              🔧 ${grade}
            </div>
            ${slots.map((slotVal, sIdx) => `
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: 11px; font-weight: 700; color: #0284c7; min-width: 65px;">Mount #${sIdx + 1}:</span>
                <select class="adv-suboption-select" onchange="window.updateMechaSubOptionSlot('${adv.name.replace(/'/g, "\\'")}', ${sIdx}, this.value)" style="font-size: var(--font-size-controls); padding: 2px 6px; width: 100%; border-radius: 4px; border: 1.5px solid #0284c7; background: var(--bg-card); color: var(--text-main); font-weight: 500; cursor: pointer;">
                  ${makeOptionsHTML(slotVal, opts)}
                </select>
              </div>
            `).join('')}
          </div>
        `;
      } else if (slots.length <= 1) {
        const currentDetail = slots[0] || (opts[0] ? opts[0].value : "");
        detailCellHTML = `
          <div style="display: flex; align-items: center; gap: 4px;">
            <select class="adv-suboption-select" onchange="window.updateMechaSubOptionSlot('${adv.name.replace(/'/g, "\\'")}', 0, this.value)" style="font-size: var(--font-size-controls); padding: 3px 6px; width: 100%; max-width: 260px; border-radius: 4px; border: 1.5px solid #0284c7; background: var(--bg-card); color: var(--text-main); font-weight: 500; cursor: pointer;">
              ${makeOptionsHTML(currentDetail, opts)}
            </select>
          </div>
        `;
      } else {
        detailCellHTML = `
          <div style="display: flex; flex-direction: column; gap: 4px; max-width: 320px;">
            ${slots.map((slotVal, sIdx) => `
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: 11px; font-weight: 700; color: #0284c7; min-width: 32px;">#${sIdx + 1}:</span>
                <select class="adv-suboption-select" onchange="window.updateMechaSubOptionSlot('${adv.name.replace(/'/g, "\\'")}', ${sIdx}, this.value)" style="font-size: var(--font-size-controls); padding: 2px 6px; width: 100%; border-radius: 4px; border: 1.5px solid #0284c7; background: var(--bg-card); color: var(--text-main); font-weight: 500; cursor: pointer;">
                  ${makeOptionsHTML(slotVal, opts)}
                </select>
              </div>
            `).join('')}
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

    const removeBtnHtml = isEnhancedOnly 
      ? `<button type="button" class="btn btn-sm btn-secondary" style="padding: 2px 6px; opacity: 0.5; cursor: not-allowed;" title="Granted by active power or alternate form" disabled>✕</button>`
      : `<button type="button" class="btn btn-sm" style="padding: 2px 6px; color: #ef4444; border-color: rgba(239, 68, 68, 0.4);" onclick="window.removeFeat('${adv.name.replace(/'/g, "\\'")}')" title="Remove this feat">✕</button>`;

    const stepperHtml = isEnhancedOnly
      ? `<span class="secondary-text" style="font-size: 0.9em;">0 (Power)</span>`
      : `<div class="stepper-group">
          <button type="button" class="stepper-btn stepper-dec" onclick="stepVal('adv_input_${idSafe}', -1, 0, ${maxRank})">−</button>
          <input type="number" id="adv_input_${idSafe}" class="stepper-input" min="0" max="${maxRank}" value="${val}" data-adv="${adv.name}">
          <button type="button" class="stepper-btn stepper-inc" onclick="stepVal('adv_input_${idSafe}', 1, 0, ${maxRank})">+</button>
        </div>`;

    return `
      <tr>
        <td><strong style="${advNameStyle}">${adv.name}</strong>${enhBadge}</td>
        <td class="secondary-text">${adv.category}</td>
        <td>${stepperHtml}</td>
        <td><strong>${effVal}</strong></td>
        <td>${detailCellHTML}</td>
        <td class="secondary-text">${adv.description || adv.baseFeat.description || ""}</td>
        <td style="text-align: center; white-space: nowrap;">
          <button type="button" class="btn-info-circle" onclick="window.showAdvantageInfo('${adv.baseName.replace(/'/g, "\\'")}')" title="View Full Description">?</button>
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
        if (typeof MECHA_SUBOPTIONS_MAP !== 'undefined' && (MECHA_SUBOPTIONS_MAP[baseKey] || baseKey === "Electromagnetic Seal" || baseKey === "Ejector Seat")) {
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

window.openAddFeatModal = function(defaultCategory) {
  const modal = document.getElementById("addFeatModal");
  if (!modal) return;
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
  if (numRank && !numRank._hasMechaRankListener) {
    numRank._hasMechaRankListener = true;
    numRank.addEventListener("input", () => {
      const selChoice = document.getElementById("selFeatChoice");
      if (!selChoice) return;
      const isMechaFeat = typeof MECHA_SUBOPTIONS_MAP !== 'undefined' && !!MECHA_SUBOPTIONS_MAP[selChoice.value];
      const rankSensitive = ["Electromagnetic Seal", "Environmental Seal", "Ejector Seat", "Equipment Mount"];
      if (rankSensitive.includes(selChoice.value) || isMechaFeat) {
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

  if (adv.name === "Attack Focus") {
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
    boxSpec.innerHTML = `
      <label style="font-weight: 600; font-size: var(--font-size-labels); display: block; margin-bottom: 4px;">Choose Specific Attack or Weapon (+2 attack bonus / rank):</label>
      <select id="selFeatSpecOption" style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; margin-bottom: 6px;" onchange="window.onFeatSpecOptionChange()">
        <option value="Unarmed">Unarmed Combat</option>
        <option value="Swords">Swords / Blades</option>
        <option value="Bows">Bows / Archery</option>
        <option value="Pistols">Pistols / Sidearms</option>
        <option value="Rifles">Rifles / Longarms</option>
        <option value="Blast Power">Blast Power</option>
        <option value="Strike Power">Strike Power</option>
        <option value="Throwing">Throwing Weapons</option>
        <option value="Claws">Claws / Natural Weapons</option>
        <option value="__custom__">Custom Weapon / Attack...</option>
      </select>
      <input type="text" id="txtFeatCustomSpec" placeholder="Enter weapon or attack power name..." style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; display: none;">
      <div class="secondary-text" style="font-size: var(--font-size-secondary);">
        <em>Can be taken multiple times for different weapons or attacks.</em>
      </div>
    `;
  } else if (adv.name === "Favored Environment") {
    boxSpec.style.display = "block";
    boxSpec.innerHTML = `
      <label style="font-weight: 600; font-size: var(--font-size-labels); display: block; margin-bottom: 4px;">Choose Environment (+1 attack or dodge bonus in environment):</label>
      <select id="selFeatSpecOption" style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; margin-bottom: 6px;" onchange="window.onFeatSpecOptionChange()">
        <option value="Airborne">Airborne / In Flight</option>
        <option value="Aquatic">Aquatic / Underwater</option>
        <option value="Space / Zero-G">Space / Zero-G</option>
        <option value="Urban">Urban / Rooftops</option>
        <option value="Forest / Jungle">Forest / Jungle</option>
        <option value="Arctic">Arctic / Extreme Cold</option>
        <option value="Underground">Underground / Caves</option>
        <option value="__custom__">Custom Environment...</option>
      </select>
      <input type="text" id="txtFeatCustomSpec" placeholder="Enter environment name..." style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; display: none;">
    `;
  } else if (adv.name === "Favored Opponent") {
    boxSpec.style.display = "block";
    boxSpec.innerHTML = `
      <label style="font-weight: 600; font-size: var(--font-size-labels); display: block; margin-bottom: 4px;">Choose Opponent Type (+1 damage &amp; interaction bonus):</label>
      <select id="selFeatSpecOption" style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; margin-bottom: 6px;" onchange="window.onFeatSpecOptionChange()">
        <option value="Aliens">Aliens / Extraterrestrials</option>
        <option value="Animals">Animals / Beasts</option>
        <option value="Criminals">Criminals / Underworld</option>
        <option value="Demons / Fiends">Demons / Fiends</option>
        <option value="Mutants">Mutants</option>
        <option value="Psionics">Psionics / Mentalists</option>
        <option value="Robots / Machines">Robots / Artificial Intelligences</option>
        <option value="Spellcasters">Spellcasters / Sorcerers</option>
        <option value="Undead">Undead / Vampires / Zombies</option>
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
    boxSpec.innerHTML = `
      <label style="font-weight: 600; font-size: var(--font-size-labels); display: block; margin-bottom: 4px;">Choose Environment (Ignore operating penalties):</label>
      <select id="selFeatSpecOption" style="width: 100%; font-size: var(--font-size-controls); padding: 4px 8px; margin-bottom: 6px;" onchange="window.onFeatSpecOptionChange()">
        <option value="Underwater">Underwater / Aquatic</option>
        <option value="Zero-G">Zero-G / Weightlessness</option>
        <option value="Heavy Gravity">Heavy Gravity</option>
        <option value="High Altitude">High Altitude / Thin Atmosphere</option>
        <option value="Extreme Cold">Extreme Cold</option>
        <option value="Extreme Heat">Extreme Heat</option>
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
        <span class="badge" id="lblEMSealBadge" style="background: var(--accent-primary); font-size: 11px;">Rank ${r}</span>
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
        <span class="badge" id="lblEjectorBadge" style="background: var(--accent-primary); font-size: 11px;">Rank ${r}</span>
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
        <span class="badge" id="lblEnvSealBadge" style="background: var(--accent-primary); font-size: 11px;">Rank ${r}</span>
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
            <span class="badge" id="lblMountBadge" style="background: var(--accent-primary); font-size: 11px;">Rank 1</span>
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
            <span class="badge" id="lblMountBadge" style="background: var(--accent-primary); font-size: 11px;">Rank ${r}</span>
          </div>
          <div style="margin-bottom: 4px;">
            <span style="font-weight: 600; font-size: var(--font-size-labels);">Mount Capability:</span>
            <span id="lblMountGrade" style="font-size: var(--font-size-secondary); color: var(--accent-primary); font-weight: 600;">${gradeText}</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px; max-height: 160px; overflow-y: auto; padding-right: 4px;">
            ${Array.from({ length: r }).map((_, idx) => {
              const slotVal = prevValues[idx] || (opts[idx % opts.length] ? opts[idx % opts.length].value : opts[0].value);
              return `
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 11px; font-weight: 700; color: #0284c7; min-width: 65px;">Mount #${idx + 1}:</span>
                <select class="modal-mecha-slot-select" data-slot="${idx}" style="flex: 1; font-size: var(--font-size-controls); padding: 3px 6px;">
                  ${opts.map(o => `<option value="${o.value.replace(/"/g, '&quot;')}" ${o.value === slotVal ? 'selected' : ''}>${o.value}</option>`).join('')}
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
          <span class="badge" style="background: var(--accent-primary); font-size: 11px;">Rank 1</span>
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
          <span class="badge" style="background: var(--accent-primary); font-size: 11px;">Rank ${r}</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px; max-height: 160px; overflow-y: auto; padding-right: 4px;">
          ${Array.from({ length: r }).map((_, idx) => {
            const slotVal = prevValues[idx] || (opts[idx % opts.length] ? opts[idx % opts.length].value : opts[0].value);
            return `
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 11px; font-weight: 700; color: #0284c7; min-width: 50px;">Slot #${idx + 1}:</span>
              <select class="modal-mecha-slot-select" data-slot="${idx}" style="flex: 1; font-size: var(--font-size-controls); padding: 3px 6px;">
                ${opts.map(o => `<option value="${o.value.replace(/"/g, '&quot;')}" ${o.value === slotVal ? 'selected' : ''}>${o.value}</option>`).join('')}
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
  if (!sel || !txt) return;
  if (sel.value === "__custom__") {
    txt.style.display = "block";
    txt.focus();
  } else {
    txt.style.display = "none";
  }
};

window.extractFeatSpecification = function(adv, ranksToAdd) {
  let finalName = adv.name;
  let specDetail = "";
  let finalRanks = ranksToAdd;

  if (adv.name === "Attack Focus") {
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
  } else if (typeof MECHA_SUBOPTIONS_MAP !== 'undefined' && MECHA_SUBOPTIONS_MAP[adv.name]) {
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
    if (!chosen && MECHA_SUBOPTIONS_MAP[adv.name][0]) {
      chosen = MECHA_SUBOPTIONS_MAP[adv.name][0].value;
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
    "Equipment Mount": "Right Shoulder Hardpoint"
  };
  let spec = defaults[adv.name];
  if (!spec && typeof MECHA_SUBOPTIONS_MAP !== 'undefined' && MECHA_SUBOPTIONS_MAP[adv.name] && MECHA_SUBOPTIONS_MAP[adv.name][0]) {
    spec = MECHA_SUBOPTIONS_MAP[adv.name][0].value;
  }
  const isMecha = adv.category === "Mecha" || (typeof MECHA_SUBOPTIONS_MAP !== 'undefined' && !!MECHA_SUBOPTIONS_MAP[adv.name]);
  if (isMecha) {
    return {
      finalName: adv.name,
      specDetail: spec ? [spec] : [],
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
      if (typeof MECHA_SUBOPTIONS_MAP !== 'undefined' && (MECHA_SUBOPTIONS_MAP[bKey] || bKey === "Electromagnetic Seal" || bKey === "Ejector Seat")) {
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
  if (typeof MECHA_SUBOPTIONS_MAP !== 'undefined' && (MECHA_SUBOPTIONS_MAP[baseKey] || baseKey === "Electromagnetic Seal" || baseKey === "Ejector Seat")) {
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
}

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
  effect.name = config.name;
  effect.isProfileExplicitlySelected = true;
  effect.descriptors = config.descriptors || "";

  if (!char.activePowers[pIdx].name || char.activePowers[pIdx].name === "New Power Container") {
    char.activePowers[pIdx].name = config.name;
    const headerTitle = document.getElementById(`powerContainerName_${pIdx}`);
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
  const hasRangeMod = effect.modifiers.some(m => m.name === "Range (Extra)" || m.name === "Range (Flaw)");
  if ((effectiveRange === "Extended" || effectiveRange === "Rank") && !hasRangeMod) {
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
          if (effectiveRange === "Rank" || effectiveRange === "Extended") {
              effDistRank = Math.max(1, effDistRank + rangeShift);
          }
          if (hasAreaMod || hasPortalMod) {
             effDistRank = rankNum + progAreaRanks;
          }
          
          const distData = MEASUREMENT_TABLE[Math.min(30, Math.max(1, effDistRank)).toString()] || MEASUREMENT_TABLE["20"];

          if (mData && effect.effectName) {
            const showDist = (effectiveRange === "Rank" || effectiveRange === "Extended" || hasAreaMod || hasPortalMod || (effectData && effectData.type === "Movement") || effect.effectName === "Teleport" || effect.effectName === "Elongation" || effect.name === "Elasticity");
            const showMass = (massDisplay !== "" || ["Move Object", "Super-Strength", "Transform"].includes(effect.effectName) || isDimPocket || isAnimateObjects);
            const showTable = showDist || showMass || ["Move Object", "Create Object", "Insubstantial"].includes(effect.effectName);
            
            if (showTable && effect.effectName !== "Enhanced Movement") {
                measurementHtml = `
                  <div style="margin-top: 6px; padding-top: 6px; border-top: 1px dashed var(--border-color); display: flex; gap: 16px; flex-wrap: wrap; font-size: calc(var(--font-size-secondary) * 0.95); font-family: monospace;">
                    <strong style="color: var(--accent-primary);">Table Equivalents:</strong>
                    ${showDist ? `<span><strong>Dist:</strong> ${distData ? distData.dist_imp : 'Special'}</span>` : ''}
                    ${showMass ? `<span><strong>Mass:</strong> ${massData && massData.mass_imp ? massData.mass_imp : (massDisplay || 'Special')}</span>` : ''}
                    <span><strong>Time:</strong> ${mData ? mData.time : 'Special'}</span>
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
                <button type="button" class="btn-info-circle" style="min-width: 18px; min-height: 18px; font-size: calc(var(--font-size-minor-controls) * 0.85);" onclick="showModifierInfo('${mod.name}', '${(effect.effectName || effect.name || '').replace(/'/g, "\\'")}')" title="View Modifier Rule">?</button>
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

        // Container Powers (Battle Form, Alternate Form, Container)
        let containerPowersHtml = "";
        const isContainer = (typeof CharacterModel !== 'undefined' && CharacterModel.isContainerEffect) ? CharacterModel.isContainerEffect(effect) : (effect.effectName === "Battle Form" || effect.effectName === "Container");
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
                <strong>${cpName}</strong> <span class="badge" style="background: var(--bg-panel); color: var(--text-main); font-size: 11px;">Rank ${cpRank} (${cpCost} PP)</span>
                <button type="button" class="stepper-btn" style="width: 20px !important; height: 20px; font-size: 11px; border-radius: 2px;" onclick="stepContainedPowerRank(${pIdx}, ${eIdx}, ${cpIdx}, -1)">−</button>
                <button type="button" class="stepper-btn" style="width: 20px !important; height: 20px; font-size: 11px; border-radius: 2px;" onclick="stepContainedPowerRank(${pIdx}, ${eIdx}, ${cpIdx}, 1)">+</button>
                <button type="button" style="background: none; border: none; color: #ef4444; font-weight: bold; cursor: pointer; padding: 0 4px;" onclick="removeContainedPower(${pIdx}, ${eIdx}, ${cpIdx})" title="Remove from form">✕</button>
              </div>
            `;
          }).join('');

          containerPowersHtml = `
            <div style="margin-top: 8px; padding: 10px; background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 6px; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-weight: 600; font-size: var(--font-size-labels); color: var(--text-main);">Contained Traits &amp; Powers:</span>
                  <span class="badge" style="background: ${isOver ? '#ef4444' : 'rgba(16, 185, 129, 0.2)'}; color: ${isOver ? '#ffffff' : '#10b981'}; font-weight: bold; font-size: 12px; border: 1px solid ${isOver ? '#ef4444' : '#10b981'};">
                    Pool: ${spent} / ${pool} PP ${isOver ? '⚠️ (Over Budget)' : '✓'}
                  </span>
                </div>
                <button type="button" class="btn minor-control-btn" style="font-weight: bold; background: ${isFormActive ? '#10b981' : 'var(--bg-card)'}; color: ${isFormActive ? '#ffffff' : 'var(--text-main)'}; border: 1px solid ${isFormActive ? '#10b981' : 'var(--border-color)'};" onclick="toggleContainerFormActive(${pIdx}, ${eIdx})" title="Toggle whether these traits are applied to the active character sheet">
                  ${isFormActive ? '⚡ Form Active (Traits Applied)' : '⚪ Form Inactive (Base Stats)'}
                </button>
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
        const isDupEff = effect.effectName === "Duplication" || (effect.name && effect.name.includes("Duplication"));
        const hasMetamorphEff = effect.effectName === "Morph" && effect.modifiers && effect.modifiers.some(m => m.name && m.name.includes("Metamorph"));

        if (isSummonEff) {
          const budget = rankNum * 15;
          companionButtonHtml = `
            <div style="margin-top: 8px; padding: 8px 10px; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 4px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
              <span style="font-size: var(--font-size-secondary);">Summoned Creature (Rank ${rankNum}): <strong>${budget} PP Budget</strong> (Max PL ${rankNum})</span>
              <button type="button" class="btn minor-control-btn" style="font-weight: bold;" onclick="buildOrEditCompanionForSource('summon', ${pIdx}, ${eIdx})">👥 Build / Edit Summoned Creature</button>
            </div>
          `;
        } else if (isDupEff) {
          companionButtonHtml = `
            <div style="margin-top: 8px; padding: 8px 10px; background: rgba(2, 132, 199, 0.1); border: 1px solid rgba(2, 132, 199, 0.3); border-radius: 4px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
              <span style="font-size: var(--font-size-secondary);">Duplicate Minion: <strong>Full Hero Traits</strong></span>
              <button type="button" class="btn minor-control-btn" style="font-weight: bold;" onclick="buildOrEditCompanionForSource('duplicate', ${pIdx}, ${eIdx})">👥 Generate / Edit Duplicate Sheet</button>
            </div>
          `;
        } else if (hasMetamorphEff) {
          companionButtonHtml = `
            <div style="margin-top: 8px; padding: 8px 10px; background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 4px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
              <span style="font-size: var(--font-size-secondary);">Alternate Form (Metamorph): <strong>${char.totalPointsAllowed} PP Budget</strong></span>
              <button type="button" class="btn minor-control-btn" style="font-weight: bold;" onclick="buildOrEditCompanionForSource('metamorph', ${pIdx}, ${eIdx})">🔄 Build / Edit Alternate Form</button>
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
                      ${POWER_EFFECTS_LIST.filter(e => !e.effectName && e.name !== "Pre-built Powers").map(eff => `<option value="${eff.name}" ${eff.name === effect.effectName ? 'selected' : ''} style="color: var(--text-main); font-weight: normal;">${eff.name} (${eff.baseCost} PP/r)</option>`).join('')}
                    </select>
                    ${effectData && effect.effectName !== "" ? `<button type="button" class="btn-info-circle" onclick="showPowerEffectInfo('${effect.effectName}', '${(effect.name && effect.name !== 'New Effect' && effect.name !== effect.effectName) ? effect.name : ''}')" title="View Effect Rules">?</button>` : ''}
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

            ${containerPowersHtml}

            ${companionButtonHtml}

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
                <button type="button" class="btn-info-circle" style="min-width: 18px; min-height: 18px; font-size: calc(var(--font-size-minor-controls) * 0.85); margin-left: -2px; margin-right: 2px;" onclick="const val = document.getElementById('selRootExtra_${pIdx}_${eIdx}').value; if(val) showModifierInfo(val, '${(effect.effectName || effect.name || '').replace(/'/g, "\\'")}');" title="View Info for Selected Extra">?</button>
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
                <button type="button" class="btn-info-circle" style="min-width: 18px; min-height: 18px; font-size: calc(var(--font-size-minor-controls) * 0.85); margin-left: -2px; margin-right: 2px;" onclick="const val = document.getElementById('selRootFeat_${pIdx}_${eIdx}').value; if(val) showModifierInfo(val, '${(effect.effectName || effect.name || '').replace(/'/g, "\\'")}');" title="View Info for Selected Power Feat">?</button>
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
                <button type="button" class="btn-info-circle" style="min-width: 18px; min-height: 18px; font-size: calc(var(--font-size-minor-controls) * 0.85); margin-left: -2px; margin-right: 2px;" onclick="const val = document.getElementById('selRootFlaw_${pIdx}_${eIdx}').value; if(val) showModifierInfo(val, '${(effect.effectName || effect.name || '').replace(/'/g, "\\'")}');" title="View Info for Selected Flaw">?</button>
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
  window.invalidateContainerDeclaredCost(pIdx);
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
    window.invalidateContainerDeclaredCost(pIdx);
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
    window.invalidateContainerDeclaredCost(pIdx);
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
    window.invalidateContainerDeclaredCost(pIdx);
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
        window.invalidateContainerDeclaredCost(pIdx);
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
  window.invalidateContainerDeclaredCost(pIdx);
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
      if (!modData && effData.specificFeats) modData = effData.specificFeats.find(m => m.name === modName);
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
    window.invalidateContainerDeclaredCost(pIdx);
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
    window.invalidateContainerDeclaredCost(pIdx);
    char.activePowers[pIdx].effects[eIdx].modifiers.splice(modIdx, 1);
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("remove_modifier");
    buildPowersUI();
    refreshUI();
  }
};

/* ==========================================================================
   CONTAINER POWERS (BATTLE FORM / ALTERNATE FORM / CONTAINER)
   ========================================================================== */

window.toggleContainerFormActive = function(pIdx, eIdx) {
  if (char.activePowers && char.activePowers[pIdx] && char.activePowers[pIdx].effects && char.activePowers[pIdx].effects[eIdx]) {
    const effect = char.activePowers[pIdx].effects[eIdx];
    effect.formActive = effect.formActive === false ? true : false;
    if (window.PowerHistoryManager) window.PowerHistoryManager.recordChange("toggle_form_active");
    buildPowersUI();
    refreshUI();
    if (typeof showToast === 'function') {
      showToast(effect.formActive ? "Form activated: contained traits applied." : "Form deactivated: base traits restored.", "info");
    }
  }
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

  const chkMechaAI = document.getElementById("chkMechaHasAI");
  if (chkMechaAI) chkMechaAI.checked = !!char.hasAI;

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
  if (typeof updateCharacterSelectorUI === 'function') updateCharacterSelectorUI();

  document.getElementById("lblHeroName").textContent = char.name;
  document.getElementById("lblPL").textContent = char.powerLevel;

  const massRank = char.massRank !== null ? char.massRank : 3;
  const massLbs = typeof CharacterModel !== 'undefined' ? CharacterModel.getProgressionValue(massRank) * 5 : 200;
  document.getElementById("lblHeroMassVal").textContent = typeof CharacterModel !== 'undefined' ? `(${CharacterModel.formatWeight(massLbs)})` : "";

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
    abilPanelTitle.textContent = char.isMecha ? `Core Abilities (Construct Chassis - Base 0 ${unit})` : `Abilities (2 PP per Rank)`;
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
                <button type="button" class="btn-info-circle" onclick="window.showAdvantageInfo('${adv.name}')" title="View Feat Rules">?</button>
              </span>
              <span class="combat-conditional-desc">${desc}</span>
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
    if (typeof syncActiveCompanionIfActive === 'function') syncActiveCompanionIfActive();
    const heroToSave = window.primaryHero || char;
    const safeHeroName = heroToSave.name ? heroToSave.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : "hero";
    const defaultFileName = `${safeHeroName}.mm2e`;
    const payload = JSON.stringify(heroToSave.serialize(), null, 2);

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

    if (typeof syncActiveCompanionIfActive === 'function') syncActiveCompanionIfActive();
    const heroToSave = window.primaryHero || char;
    const payload = JSON.stringify(heroToSave.serialize(), null, 2);
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

        if (window.primaryHero) {
          char = window.primaryHero;
          window.char = char;
          window.primaryHero = null;
          window.activeCompanionId = null;
        }
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
          <div style="white-space: normal; line-height: 1.3; font-size: var(--font-size-controls);">
            <p style="margin: 0 0 6px 0;">Firefox security restricts web pages from directly browsing or changing system folders.</p>
            <div style="margin: 4px 0 6px 0; padding: 4px 8px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <div>
                <span style="color: var(--text-muted); font-size: var(--font-size-secondary);">Firefox Address:</span>
                <code style="font-weight: bold; color: var(--accent-primary); margin-left: 6px;">about:preferences</code>
              </div>
              <button type="button" class="btn btn-secondary" style="font-size: var(--font-size-minor-controls); padding: 2px 8px;" onclick="navigator.clipboard.writeText('about:preferences').then(() => { this.textContent = '✓ Copied!'; setTimeout(() => this.textContent = '📋 Copy Address', 2000); })">📋 Copy Address</button>
            </div>
            <ol style="margin: 0 0 6px 16px; padding: 0; display: flex; flex-direction: column; gap: 3px;">
              <li>Open a new tab and go to <code>about:preferences</code>.</li>
              <li>Under <strong>Downloads</strong>, check <em>"Always ask you where to save files"</em> (or click <strong>Browse...</strong> to set a default folder).</li>
              <li>When saving in this app, click <strong>OK / Save File</strong> on Firefox's download prompt to choose any directory or filename.</li>
            </ol>
            <p style="margin: 0; color: var(--text-muted); font-size: var(--font-size-secondary);">Tip: Chromium browsers (Chrome, Edge) support direct folder selection without download prompts.</p>
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
      if (window.primaryHero) {
        char = window.primaryHero;
        window.char = char;
        window.primaryHero = null;
        window.activeCompanionId = null;
      }
      char.reset();
      const btnAudit = document.getElementById("btnOpenImportAudit");
      if (btnAudit) btnAudit.style.display = "none";
      this.currentFileHandle = null;
      this.currentFileName = null;
      this.updateFileStatusUI();
      populateUIFromCharacter();
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
          if (window.primaryHero) {
            char = window.primaryHero;
            window.char = char;
            window.primaryHero = null;
            window.activeCompanionId = null;
          }
          applyLoadedCharacter(loadedData);
          const btnAudit = document.getElementById("btnOpenImportAudit");
          if (btnAudit) btnAudit.style.display = "none";
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
    let optionsHtml = `<option value="main">🦸 Main Hero: ${heroRoot.name || "Hero"} (PL ${heroRoot.powerLevel})</option>`;
    
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
          optionsHtml += `<option value="${c.id}">${c.name || "Unnamed"} (PL ${c.powerLevel} - ${spent}/${c.totalPointsAllowed} ${unit})</option>`;
        });
        optionsHtml += `</optgroup>`;
      }
    }
    optionsHtml += `<option value="__add_new__">➕ Add New Companion / Form...</option>`;
    sel.innerHTML = optionsHtml;
    sel.value = window.activeCompanionId || "main";
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
        bannerTitle.textContent = `${isMecha ? '🤖' : '👥'} Editing ${cType}: ${char.name} (PL ${char.powerLevel})`;
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
              <span class="badge" style="background: ${typeBadgeBg}; color: #ffffff; font-weight: bold; font-size: 11px; text-transform: uppercase;">${typeLabel}</span>
              <h3 style="font-size: 16px; margin: 0; color: var(--text-main); font-weight: bold;">${comp.name || compModel.name}</h3>
              <span class="badge" style="background: var(--bg-card); color: var(--text-main); font-size: 12px; border: 1px solid var(--border-color);">PL ${comp.powerLevel}</span>
              ${isCurrentlyActive ? `<span class="badge" style="background: #10b981; color: #fff; font-weight: bold; font-size: 11px;">⚡ Currently Active Sheet</span>` : ''}
            </div>
            <div style="margin-top: 6px; font-size: var(--font-size-secondary); color: var(--text-muted);">
              Abilities: STR ${compModel.getAbilityRank("STR") ?? '—'}, DEX ${compModel.getAbilityRank("DEX") ?? '—'}, CON ${compModel.getAbilityRank("CON") ?? '—'}, INT ${compModel.getAbilityRank("INT") ?? '—'}, WIS ${compModel.getAbilityRank("WIS") ?? '—'}, CHA ${compModel.getAbilityRank("CHA") ?? '—'}
              | Combat: ATK +${compModel.getCombatRank("ATK")}, DEF +${compModel.getCombatRank("DEF")}
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <div style="text-align: right; margin-right: 6px;">
              <span style="font-size: var(--font-size-secondary); display: block; color: var(--text-muted);">Budget:</span>
              <span class="badge" style="background: ${isOver ? '#ef4444' : 'rgba(16, 185, 129, 0.15)'}; color: ${isOver ? '#fff' : '#10b981'}; font-weight: bold; font-size: 13px; border: 1px solid ${isOver ? '#ef4444' : '#10b981'};">
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

  if (txtName) {
    txtName.value = defaultName;
  }
  if (numPL) numPL.value = pl;
  if (numBudget) numBudget.value = budget;
  if (boxHint) boxHint.innerHTML = hint;
}

function openCreateCompanionModal(prefillType, prefillSource) {
  const modal = document.getElementById("companionCreateModal");
  if (!modal) return;
  const selType = document.getElementById("selCompanionType");
  if (selType && prefillType) {
    selType.value = prefillType;
  }
  updateCompanionModalDefaults(prefillSource);
  modal.classList.add("active");
  const txtName = document.getElementById("txtCompanionName");
  if (txtName) {
    txtName.focus();
    txtName.select();
  }
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
  const name = (txtName && txtName.value.trim()) ? txtName.value.trim() : (type === "mecha" ? "New Mecha" : "New Companion");
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
  showToast(`Created ${newComp.name}! Now editing mecha sheet.`, "success");
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
  const matches = companions.filter(c => c.type === type);

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

window.switchToCompanion = function(companionId) {
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
};

window.returnToPrimaryHero = function() {
  if (!window.primaryHero) return;
  syncActiveCompanionIfActive();
  char = window.primaryHero;
  window.char = char;
  window.primaryHero = null;
  window.activeCompanionId = null;

  populateUIFromCharacter();
  updateCharacterSelectorUI();
  showToast(`Returned to ${char.name}.`, "info");
};

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

