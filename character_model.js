// Mutants & Masterminds 2nd Edition Character Data Model & Logic Engine

class CharacterModel {
  constructor() {
    this.name = "";
    this.playerName = "";
    this.powerLevel = 10;
    this.totalPointsAllowed = 150;
    this.sizeCategory = "Medium";
    this.massRank = 3;
    this.isMecha = false;
    this.hasAI = false;

    // 6 Core Abilities
    this.abilities = { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 };
    this.absentAbilities = { STR: false, CON: false, DEX: false, INT: false, WIS: false, CHA: false };

    // Combat Abilities
    this.combat = { ATK: 0, DEF: 0 };

    // Purchased Resistance Ranks beyond ability scores
    this.purchasedResistances = { Toughness: 0, Fortitude: 0, Reflex: 0, Will: 0 };

    // Purchased Skills & Feats
    this.skills = {};
    this.skillDetails = {};
    this.feats = {};
    this.featDetails = {};

    // Constructed Powers Array with structured modifiers
    this.powers = [];

    // Improvised Effects / Blueprints
    this.blueprints = [];

    // Equipment & Installations
    this.gear = [];
    this.vehicles = [];
    this.installations = [];

    // Minions, Sidekicks & Alternate Forms
    this.companions = [];

    // Background & Identity
    this.identity = "";
    this.motivation = "";
    this.complications = "";
    this.history = "";

    // House Rules
    this.houseRules = {
      enhancedTraitBoostsEffects: false,
      allowAltFormVariablePL: false,
      boostAltersRanks: false,
      enableLegacyCoreModifiers: false,
      disablePerceptionRange: false
    };

    // Status Tracker State
    this.trackerState = {
      initiativeRoll: null,
      initiativeAdjustment: 0,
      generalD20Roll: null,
      generalD20Adj: 0,
      conditions: {},
      customPoints: [],
      fadeStates: {}
    };
  }

  reset() {
    this.name = "";
    this.playerName = "";
    this.powerLevel = 10;
    this.totalPointsAllowed = 150;
    this.sizeCategory = "Medium";
    this.massRank = 3;
    this.isMecha = false;
    this.hasAI = false;

    this.abilities = { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 };
    this.absentAbilities = { STR: false, CON: false, DEX: false, INT: false, WIS: false, CHA: false };

    this.combat = { ATK: 0, DEF: 0 };
    this.purchasedResistances = { Toughness: 0, Fortitude: 0, Reflex: 0, Will: 0 };

    this.skills = {};
    this.skillDetails = {};
    this.feats = {};
    this.featDetails = {};

    this.powers = [];
    this.blueprints = [];
    this.gear = [];
    this.vehicles = [];
    this.installations = [];
    this.companions = [];

    this.identity = "";
    this.motivation = "";
    this.complications = "";
    this.history = "";

    this.houseRules = {
      enhancedTraitBoostsEffects: false,
      allowAltFormVariablePL: false,
      boostAltersRanks: false,
      enableLegacyCoreModifiers: false,
      disablePerceptionRange: false
    };

    this.trackerState = {
      initiativeRoll: null,
      initiativeAdjustment: 0,
      generalD20Roll: null,
      generalD20Adj: 0,
      conditions: {},
      customPoints: [],
      fadeStates: {}
    };
  }

  serialize() {
    return {
      format: "MM2E_CHARACTER",
      version: "1.0",
      savedAt: new Date().toISOString(),
      character: {
        name: this.name,
        playerName: this.playerName,
        powerLevel: this.powerLevel,
        totalPointsAllowed: this.totalPointsAllowed,
        sizeCategory: this.sizeCategory,
        massRank: this.massRank,
        isMecha: this.isMecha || false,
        hasAI: this.hasAI || false,
        abilities: { ...this.abilities },
        absentAbilities: { ...this.absentAbilities },
        combat: { ...this.combat },
        purchasedResistances: { ...this.purchasedResistances },
        skills: { ...this.skills },
        skillDetails: { ...this.skillDetails },
        feats: { ...this.feats },
        featDetails: { ...this.featDetails },
        powers: JSON.parse(JSON.stringify(this.powers || [])),
        blueprints: JSON.parse(JSON.stringify(this.blueprints || [])),
        gear: JSON.parse(JSON.stringify(this.gear || [])),
        vehicles: JSON.parse(JSON.stringify(this.vehicles || [])),
        installations: JSON.parse(JSON.stringify(this.installations || [])),
        companions: JSON.parse(JSON.stringify(this.companions || [])),
        identity: this.identity || "",
        motivation: this.motivation || "",
        complications: this.complications || "",
        history: this.history || "",
        heroPoints: typeof this.heroPoints === "number" ? this.heroPoints : 1,
        heroPointsLocked: !!this.heroPointsLocked,
        houseRules: { ...this.houseRules },
        trackerState: JSON.parse(JSON.stringify(this.trackerState || {
          conditions: {},
          customPoints: [],
          fadeStates: {}
        }))
      }
    };
  }

  deserialize(raw) {
    if (!raw) return;
    const data = (raw.format === "MM2E_CHARACTER" && raw.character) ? raw.character : raw;

    this.name = (data.name && data.name !== "New Hero") ? data.name : "";
    this.playerName = data.playerName || "";
    this.powerLevel = typeof data.powerLevel === "number" ? data.powerLevel : (data.pl || 10);
    this.totalPointsAllowed = typeof data.totalPointsAllowed === "number" ? data.totalPointsAllowed : (this.powerLevel * 15);
    this.heroPoints = typeof data.heroPoints === "number" ? data.heroPoints : 1;
    this.heroPointsLocked = !!data.heroPointsLocked;
    this.sizeCategory = data.sizeCategory || data.size || "Medium";
    this.massRank = typeof data.massRank === "number" ? data.massRank : 3;
    this.isMecha = !!(data.isMecha || data.nature === "mecha" || data.type === "Mecha");
    this.hasAI = !!data.hasAI;

    // Abilities
    this.abilities = { STR: 0, CON: 0, DEX: 0, INT: 0, WIS: 0, CHA: 0, ...(data.abilities || {}) };
    this.absentAbilities = { STR: false, CON: false, DEX: false, INT: false, WIS: false, CHA: false, ...(data.absentAbilities || {}) };

    // Combat
    this.combat = {
      ATK: typeof data.combat?.ATK === "number" ? data.combat.ATK : (data.combat?.atk || 0),
      DEF: typeof data.combat?.DEF === "number" ? data.combat.DEF : (data.combat?.def || 0)
    };

    // Purchased Resistances
    this.purchasedResistances = {
      Reflex: typeof data.purchasedResistances?.Reflex === "number" ? data.purchasedResistances.Reflex : (data.combat?.reflex || 0),
      Fortitude: typeof data.purchasedResistances?.Fortitude === "number" ? data.purchasedResistances.Fortitude : (data.combat?.fort || 0),
      Will: typeof data.purchasedResistances?.Will === "number" ? data.purchasedResistances.Will : (data.combat?.will || 0)
    };

    // Skills & Feats
    this.skills = { ...(data.skills || {}) };
    this.skillDetails = { ...(data.skillDetails || {}) };
    this.feats = { ...(data.feats || {}) };
    this.featDetails = { ...(data.featDetails || {}) };

    // Powers - ensure container structure and effect metadata
    let loadedPowers = Array.isArray(data.powers) ? JSON.parse(JSON.stringify(data.powers)) : [];
    if (loadedPowers.length > 0 && !loadedPowers[0].effects) {
      loadedPowers = loadedPowers.map(oldEff => {
        const cName = oldEff.name || "Imported Power";
        const cCol = oldEff.collapsed || false;
        return {
          name: cName,
          collapsed: cCol,
          effects: [{ ...oldEff, id: oldEff.id || ("eff_" + Math.random().toString(36).substr(2, 9)), association: "primary", linkedTo: null, name: cName }]
        };
      });
    } else {
      // Ensure all effects in containers have unique IDs and migrated link data
      loadedPowers.forEach(container => {
        if (Array.isArray(container.effects)) {
          let prevAssoc = "primary";
          container.effects.forEach((eff, eIdx) => {
            if (!eff.id) eff.id = "eff_" + Math.random().toString(36).substr(2, 9) + "_" + eIdx;
            if (eff.rank === undefined && eff.ranks !== undefined) eff.rank = eff.ranks;
            
            // Legacy migration: association === 'linked'
            if (eff.association === "linked") {
              eff.linkedTo = "previous";
              eff.association = prevAssoc;
            } else {
              if (eff.linkedTo === undefined) eff.linkedTo = null;
              if (!eff.association) eff.association = "primary";
              prevAssoc = eff.association;
            }
            CharacterModel.normalizeEffectSubPowers(eff);
          });
        }
      });
    }
    this.powers = loadedPowers;

    // Blueprints
    let loadedBlueprints = Array.isArray(data.blueprints) ? JSON.parse(JSON.stringify(data.blueprints)) : [];
    if (loadedBlueprints.length > 0 && !loadedBlueprints[0].effects) {
      loadedBlueprints = loadedBlueprints.map(oldEff => {
        const cName = oldEff.name || "Imported Blueprint";
        const cCol = oldEff.collapsed || false;
        const eRank = oldEff.rank !== undefined ? oldEff.rank : (oldEff.ranks !== undefined ? oldEff.ranks : 1);
        const effObj = { ...oldEff, rank: eRank, ranks: eRank, id: oldEff.id || ("imp_" + Math.random().toString(36).substr(2, 9)), association: "primary", linkedTo: null, name: cName };
        CharacterModel.normalizeEffectSubPowers(effObj);
        return {
          name: cName,
          collapsed: cCol,
          effects: [effObj]
        };
      });
    } else {
      loadedBlueprints.forEach(container => {
        if (Array.isArray(container.effects)) {
          container.effects.forEach((eff, eIdx) => {
            if (!eff.id) eff.id = "imp_" + Math.random().toString(36).substr(2, 9) + "_" + eIdx;
            if (eff.rank === undefined && eff.ranks !== undefined) eff.rank = eff.ranks;
            CharacterModel.normalizeEffectSubPowers(eff);
          });
        }
      });
    }
    this.blueprints = loadedBlueprints;

    // Equipment
    this.gear = Array.isArray(data.gear) ? JSON.parse(JSON.stringify(data.gear)) : [];
    this.vehicles = Array.isArray(data.vehicles) ? JSON.parse(JSON.stringify(data.vehicles)) : [];
    this.installations = Array.isArray(data.installations) ? JSON.parse(JSON.stringify(data.installations)) : [];
    this.companions = Array.isArray(data.companions) ? JSON.parse(JSON.stringify(data.companions)) : [];

    // Background & Identity
    this.identity = data.identity || (data.background?.identity || "");
    this.motivation = data.motivation || (data.background?.motivation || "");
    this.complications = data.complications || (data.background?.complications || "");
    this.history = data.history || (data.background?.history || "");

    // House Rules
    this.houseRules = {
      enhancedTraitBoostsEffects: false,
      allowAltFormVariablePL: false,
      enableBoostEffect: false,
      boostAltersRanks: false,
      enableLegacyCoreModifiers: false,
      disablePerceptionRange: false,
      ...(data.houseRules || {})
    };

    // Status Tracker State
    this.trackerState = data.trackerState ? JSON.parse(JSON.stringify(data.trackerState)) : {
      initiativeRoll: null,
      initiativeAdjustment: 0,
      generalD20Roll: null,
      generalD20Adj: 0,
      conditions: {},
      customPoints: [],
      fadeStates: {}
    };
  }

  setMechaMode(enabled, hasAI = false) {
    this.isMecha = !!enabled;
    this.hasAI = !!hasAI;
    if (this.isMecha) {
      this.absentAbilities.CON = true;
      if (!this.hasAI) {
        this.absentAbilities.INT = true;
        this.absentAbilities.WIS = true;
        this.absentAbilities.CHA = true;
      } else {
        this.absentAbilities.INT = false;
        this.absentAbilities.WIS = false;
        this.absentAbilities.CHA = false;
      }
    } else {
      this.absentAbilities.CON = false;
      this.absentAbilities.INT = false;
      this.absentAbilities.WIS = false;
      this.absentAbilities.CHA = false;
    }
  }

  get activePowers() {
    return (typeof window !== 'undefined' && window.activePowerContext === 'blueprints') ? this.blueprints : this.powers;
  }

  findEffectById(effectId) {
    const list = this.activePowers || this.powers;
    if (!effectId || !Array.isArray(list)) return null;
    for (let pIdx = 0; pIdx < list.length; pIdx++) {
      const container = list[pIdx];
      if (Array.isArray(container.effects)) {
        for (let eIdx = 0; eIdx < container.effects.length; eIdx++) {
          if (container.effects[eIdx].id === effectId) {
            return { container, pIdx, effect: container.effects[eIdx], eIdx };
          }
        }
      }
    }
    return null;
  }

  get enhancedTraits() {
    const res = {
      abilities: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 },
      combat: { ATK: 0, DEF: 0 },
      saves: { Toughness: 0, Fortitude: 0, Reflex: 0, Will: 0 },
      skills: {},
      feats: {},
      powers: {},
      boostAbilities: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 }
    };

    const powerContainers = this.powers || [];
    powerContainers.forEach(container => {
      if (container.active === false) return;
      const effects = Array.isArray(container.effects) ? container.effects : [container];
      effects.forEach(eff => {
        if (eff.active === false) return;
        const applySub = (sub) => {
          const r = (parseInt(sub.rank) || 0) * (sub.isReduced ? -1 : 1);
          const raw = (sub.type || sub.name || "").trim();
          const clean = raw.replace(/\s*\[.*?\]/g, '').trim();

          if (/^Strength\b/i.test(clean) || clean === "STR" || clean.includes("(STR)")) {
            res.abilities.STR += r;
          } else if (/^Dexterity\b/i.test(clean) || clean === "DEX" || clean.includes("(DEX)")) {
            res.abilities.DEX += r;
          } else if (/^Constitution\b/i.test(clean) || clean === "CON" || clean.includes("(CON)")) {
            res.abilities.CON += r;
          } else if (/^Intelligence\b/i.test(clean) || clean === "INT" || clean.includes("(INT)")) {
            res.abilities.INT += r;
          } else if (/^Wisdom\b/i.test(clean) || clean === "WIS" || clean.includes("(WIS)")) {
            res.abilities.WIS += r;
          } else if (/^Charisma\b/i.test(clean) || clean === "CHA" || clean.includes("(CHA)")) {
            res.abilities.CHA += r;
          } else if (/^Attack\b/i.test(clean) || clean === "ATK") {
            res.combat.ATK += r;
          } else if (/^Defense\b/i.test(clean) || clean === "DEF") {
            res.combat.DEF += r;
          } else if (/^Toughness\b/i.test(clean)) {
            res.saves.Toughness += r;
          } else if (/^Fortitude\b/i.test(clean)) {
            res.saves.Fortitude += r;
          } else if (/^Reflex\b/i.test(clean)) {
            res.saves.Reflex += r;
          } else if (/^Will\b/i.test(clean)) {
            res.saves.Will += r;
          } else if (typeof SKILLS_LIST !== 'undefined' && SKILLS_LIST.some(s => s.name.toLowerCase() === clean.toLowerCase())) {
            const sk = SKILLS_LIST.find(s => s.name.toLowerCase() === clean.toLowerCase());
            const skName = sk ? sk.name : clean;
            res.skills[skName] = (res.skills[skName] || 0) + r;
          } else if (this.houseRules && this.houseRules.enhancedTraitBoostsEffects && typeof POWER_EFFECTS_LIST !== 'undefined' && POWER_EFFECTS_LIST.some(p => p.name.toLowerCase() === clean.toLowerCase())) {
            const pwr = POWER_EFFECTS_LIST.find(p => p.name.toLowerCase() === clean.toLowerCase());
            const pwrName = pwr ? pwr.name : clean;
            res.powers[pwrName] = (res.powers[pwrName] || 0) + r;
          } else {
            res.feats[clean] = (res.feats[clean] || 0) + r;
          }
        };

        if ((eff.effectName === "Enhanced Trait" || eff.effectName === "Enhance Trait") && eff.subPowers) {
          eff.subPowers.forEach(applySub);
        }

        if (eff.effectName === "Boost") {
          const isActive = (container.active !== false) && (eff.active !== false) && (eff.boostActive !== false) && (!eff.options || eff.options.boostActive !== false);
          if (isActive) {
            const target = (eff.options && eff.options.boostTarget) || eff.boostTarget;
            if (target) {
              const clean = target.replace(/\s*\[.*?\]/g, '').trim();
              const isAbility = /^(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma|STR|DEX|CON|INT|WIS|CHA)\b/i.test(clean);
              if (isAbility || (this.houseRules && this.houseRules.boostAltersRanks)) {
                let r = parseInt(eff.rank) || 1;
                const effId = eff.id;
                if (effId && this.trackerState && this.trackerState.fadeStates && this.trackerState.fadeStates[effId] !== undefined) {
                  r = this.trackerState.fadeStates[effId];
                }
                if (r > 0) {
                  applySub({ type: target, rank: r });
                  res.powers[target] = (res.powers[target] || 0) + r;
                  if (/^Strength\b/i.test(clean) || clean === "STR" || clean.includes("(STR)")) res.boostAbilities.STR += r;
                  else if (/^Dexterity\b/i.test(clean) || clean === "DEX" || clean.includes("(DEX)")) res.boostAbilities.DEX += r;
                  else if (/^Constitution\b/i.test(clean) || clean === "CON" || clean.includes("(CON)")) res.boostAbilities.CON += r;
                  else if (/^Intelligence\b/i.test(clean) || clean === "INT" || clean.includes("(INT)")) res.boostAbilities.INT += r;
                  else if (/^Wisdom\b/i.test(clean) || clean === "WIS" || clean.includes("(WIS)")) res.boostAbilities.WIS += r;
                  else if (/^Charisma\b/i.test(clean) || clean === "CHA" || clean.includes("(CHA)")) res.boostAbilities.CHA += r;
                }
              }
            }
          }
        }

        // Active Container / Battle Form contained traits
        if (CharacterModel.isContainerEffect(eff) && eff.formActive !== false && Array.isArray(eff.containedPowers)) {
          eff.containedPowers.forEach(cp => {
            if (cp.type === "trait" || cp.isTrait || (!cp.effectName && cp.name)) {
              applySub(cp);
            } else if (cp.effectName === "Enhanced Trait" && Array.isArray(cp.subPowers)) {
              cp.subPowers.forEach(applySub);
            } else if (cp.effectName === "Boost") {
              const isActive = (cp.active !== false) && (cp.boostActive !== false) && (!cp.options || cp.options.boostActive !== false);
              if (isActive) {
                const target = (cp.options && cp.options.boostTarget) || cp.boostTarget;
                if (target) {
                  const clean = target.replace(/\s*\[.*?\]/g, '').trim();
                  const isAbility = /^(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma|STR|DEX|CON|INT|WIS|CHA)\b/i.test(clean);
                  if (isAbility || (this.houseRules && this.houseRules.boostAltersRanks)) {
                    let r = parseInt(cp.rank) || 1;
                    const effId = cp.id;
                    if (effId && this.trackerState && this.trackerState.fadeStates && this.trackerState.fadeStates[effId] !== undefined) {
                      r = this.trackerState.fadeStates[effId];
                    }
                    if (r > 0) {
                      applySub({ type: target, rank: r });
                      res.powers[target] = (res.powers[target] || 0) + r;
                      if (/^Strength\b/i.test(clean) || clean === "STR" || clean.includes("(STR)")) res.boostAbilities.STR += r;
                      else if (/^Dexterity\b/i.test(clean) || clean === "DEX" || clean.includes("(DEX)")) res.boostAbilities.DEX += r;
                      else if (/^Constitution\b/i.test(clean) || clean === "CON" || clean.includes("(CON)")) res.boostAbilities.CON += r;
                      else if (/^Intelligence\b/i.test(clean) || clean === "INT" || clean.includes("(INT)")) res.boostAbilities.INT += r;
                      else if (/^Wisdom\b/i.test(clean) || clean === "WIS" || clean.includes("(WIS)")) res.boostAbilities.WIS += r;
                      else if (/^Charisma\b/i.test(clean) || clean === "CHA" || clean.includes("(CHA)")) res.boostAbilities.CHA += r;
                    }
                  }
                }
              }
            }
          });
        }
      });
    });

    return res;
  }

  get effectiveFeats() {
    const combined = { ...(this.feats || {}) };
    if (this.enhancedTraits && this.enhancedTraits.feats) {
      for (const [k, v] of Object.entries(this.enhancedTraits.feats)) {
        combined[k] = (combined[k] || 0) + v;
      }
    }
    return combined;
  }

  getBaseAbilityRank(key) {
    if (this.absentAbilities[key]) return null;
    return Number(this.abilities[key]) || 0;
  }

  getAbilityRank(key) {
    if (this.absentAbilities[key]) return null;
    const base = Number(this.abilities[key]) || 0;
    const enh = (this.enhancedTraits && this.enhancedTraits.abilities[key]) ? this.enhancedTraits.abilities[key] : 0;
    return base + enh;
  }

  getEffectiveAbilityRank(key) {
    return this.getAbilityRank(key);
  }

  getBaseCombatRank(key) {
    return Number(this.combat[key]) || 0;
  }

  getCombatRank(key) {
    const base = Number(this.combat[key]) || 0;
    const enh = (this.enhancedTraits && this.enhancedTraits.combat[key]) ? this.enhancedTraits.combat[key] : 0;
    return base + enh;
  }

  getFeatMaxRank(feat) {
    if (!feat) return 20;
    if (feat.ranked === false) return 1;
    if (feat.maxRanks === "pl") return this.powerLevel;
    if (feat.maxRanks === "plHalf") return Math.ceil(this.powerLevel / 2);
    return typeof feat.maxRanks === "number" ? feat.maxRanks : 20;
  }

  getAdvantageMaxRank(adv) {
    return this.getFeatMaxRank(adv);
  }

  removeFeat(featName) {
    if (this.feats && this.feats[featName] !== undefined) {
      delete this.feats[featName];
    }
    if (this.featDetails && this.featDetails[featName] !== undefined) {
      delete this.featDetails[featName];
    }
  }

  removeSkill(skillName) {
    if (this.skills && this.skills[skillName] !== undefined) {
      delete this.skills[skillName];
    }
    if (this.skillDetails && this.skillDetails[skillName] !== undefined) {
      delete this.skillDetails[skillName];
    }
  }

  get advantageLimitsCheck() {
    return {
      heroicSpent: 0,
      heroicMax: 999,
      heroicValid: true,
      commandSpent: 0,
      commandMax: 999,
      commandValid: true,
      commandAbility: "CHA"
    };
  }

  get activePowers() {
    return (typeof window !== 'undefined' && window.activePowerContext === 'blueprints') ? this.blueprints : this.powers;
  }

  static isContainerEffect(eff) {
    if (!eff) return false;
    const name = (eff.effectName || eff.name || "").trim();
    return name === "Battle Form" || name === "Container" || name.includes("Alternate Form") || !!eff.isContainer;
  }

  static getContainerPool(eff) {
    if (!eff) return 0;
    const rank = Math.max(1, parseInt(eff.rank) || 1);
    const name = (eff.effectName || eff.name || "").trim();
    if (name === "Battle Form") {
      let pool = rank * 5;
      if (eff.modifiers && eff.modifiers.some(m => m.name && m.name.includes("Second Stage"))) {
        pool += rank * 3;
      }
      return pool;
    }
    return rank * 5;
  }

  // --- 2nd Edition progression formulas ---
  static getProgressionValue(rank) {
    if (rank <= 0) return 1;
    const base = Math.floor((rank - 1) / 3);
    const mod = (rank - 1) % 3;
    const multipliers = [2.5, 5, 10];
    return Math.floor(multipliers[mod] * Math.pow(10, base));
  }

  static formatWeight(lbs) {
    if (lbs >= 2000) return (lbs / 2000).toFixed(1).replace(/\.0$/, '') + " tons";
    return Math.round(lbs).toLocaleString() + " lbs";
  }

  static formatDistance(ft) {
    if (ft >= 5280) return (ft / 5280).toFixed(1).replace(/\.0$/, '') + " miles";
    return Math.round(ft).toLocaleString() + " ft";
  }

  static getCarryingCapacity(strRank) {
    if (strRank === null) return "0 lbs";
    const heavyLoad = 100 * Math.pow(2, (strRank - 10) / 5);
    return this.formatWeight(heavyLoad);
  }

  static getSpeedDistance(speedRank) {
    if (!speedRank || speedRank < 1) return "30 ft";
    // Speed 1 = Rank 4 distance (100 ft)
    const distanceFt = this.getProgressionValue(speedRank + 2) * 10;
    return this.formatDistance(distanceFt);
  }

  static getAreaDistance(rank) {
    if (rank < 1) return "5 ft";
    return this.formatDistance(this.getProgressionValue(rank - 1) * 10);
  }

  // Calculate dynamic point cost of an individual effect using M&M 2E modifier math
  calculateEffectCost(effect) {
    if (!effect) return 0;
    const effectData = (typeof POWER_EFFECTS_LIST !== 'undefined') 
      ? POWER_EFFECTS_LIST.find(e => e.name === effect.effectName)
      : null;
      
    let pBaseCost = (effect.baseCost !== undefined) ? effect.baseCost : (effectData && effectData.baseCost !== undefined ? effectData.baseCost : 1);
    if (effectData && effectData.profiles && effect.name) {
      const profile = effectData.profiles.find(p => p.name === effect.name);
      if (profile && profile.baseCost !== undefined) {
        pBaseCost = profile.baseCost;
      }
    }

    if (effect.optionKey && effect.optionKey.startsWith("variable_")) {
      const selectedOption = effectData.options?.find(o => o.key === effect.optionKey);
      if (selectedOption && typeof selectedOption.cost === "number") {
        pBaseCost = selectedOption.cost;
      }
    }

    if (effect.subPowers && effect.subPowers.length > 0) {
      let totalSubCost = 0;
      let totalRank = 0;
      
      if (effect.effectName === "Summon" || effect.effectName === "Illusion" || effect.effectName === "Battle Form" || effect.effectName === "Container" || (effect.name && effect.name.includes("Alternate Form"))) {
        totalRank = parseInt(effect.rank) || 1;
        totalSubCost = (parseInt(effect.rank) || 1) * pBaseCost;
      } else if (effect.effectName === "Morph") {
        totalRank = parseInt(effect.rank) || 1;
        totalSubCost = (parseInt(effect.rank) || 1) * pBaseCost;
      } else if (effect.effectName === "Variable" || effect.effectName === "Enhanced Trait" || effect.effectName === "Enhance Trait" || effect.effectName === "Movement" || effect.effectName === "Enhanced Movement" || effect.effectName === "Immunity" || effect.effectName === "Senses" || effect.effectName === "Enhanced Senses" || effect.effectName === "Super-Senses" || effect.effectName === "Super-Movement" || effect.effectName === "Comprehend" || effect.effectName === "Feature" || effect.effectName === "Features") {
        effect.subPowers.forEach(sub => {
          let sRank = parseInt(sub.rank) || 1;
          let sBase = sub.baseCost !== undefined ? sub.baseCost : pBaseCost;
          let sPerRank = 0, sFlat = 0, sRemovable = 0;
          
          if (sub.modifiers && sub.modifiers.length > 0) {
              sub.modifiers.forEach(m => {
                  let mult = (m.category === 'extra' || m.category === 'feat') ? 1 : -1;
                  let rawCost = m.cost !== undefined ? Math.abs(m.cost) : 1;
                  let mC = rawCost * (parseInt(m.ranks)||1);
                  if (m.costType === 'per_rank') sPerRank += mult * mC;
                  else if (m.costType === 'flat') sFlat += mult * mC;
                  else if (m.costType === 'removable') sRemovable += parseInt(m.ranks)||1;
              });
          }
          let sRate = sBase + sPerRank;
          let sCost = 0;
          if (sRate >= 1 || effect.effectName === "Enhanced Trait" || effect.effectName === "Enhance Trait") {
            sCost = (sRate * sRank) + sFlat;
          } else {
            const ranksPerPoint = 2 - sRate;
            sCost = Math.ceil(sRank / (ranksPerPoint > 1 ? ranksPerPoint : 2)) + sFlat;
          }
          
          if (sRemovable > 0) {
              let discount = Math.floor(sCost / 5) * sRemovable;
              sCost -= discount;
          }

          if (sCost < 1 && effect.effectName !== "Enhanced Trait" && effect.effectName !== "Enhance Trait" && !sub.isSenseType && sub.baseCost !== 0) sCost = 1;
          totalSubCost += sCost;
          if (effect.effectName === "Super-Senses" || effect.effectName === "Senses" || effect.effectName === "Enhanced Senses") {
            totalRank += sCost;
          } else {
            totalRank += sRank;
          }
        });
        if (effect.effectName === "Enhanced Trait" || effect.effectName === "Enhance Trait") {
          totalSubCost = Math.ceil(totalSubCost);
        }
        let subTotalRank = totalRank;
        totalRank = Math.max(subTotalRank, parseInt(effect.rank) || 1);
        if (totalRank > subTotalRank) {
          totalSubCost += (totalRank - subTotalRank) * pBaseCost;
        }
      }
      
      effect.rank = totalRank || 1;

      let pPerRank = 0, pFlat = 0, pRemovable = 0;
      if (effect.modifiers && effect.modifiers.length > 0) {
          effect.modifiers.forEach(m => {
              let mult = (m.category === 'extra' || m.category === 'feat') ? 1 : -1;
              let rawCost = m.cost !== undefined ? Math.abs(m.cost) : 1;
              let mC = rawCost * (parseInt(m.ranks)||1);
              if (m.costType === 'per_rank') pPerRank += mult * mC;
              else if (m.costType === 'flat') pFlat += mult * mC;
              else if (m.costType === 'removable') pRemovable += parseInt(m.ranks)||1;
          });
      }

      let parentBaseRate = effect.rank > 0 ? (totalSubCost / effect.rank) : 1;
      let netParentRate = parentBaseRate + pPerRank;
      let finalCost = 0;
      if (netParentRate >= 1 || effect.effectName === "Enhanced Trait" || effect.effectName === "Enhance Trait") {
        finalCost = totalSubCost + (pPerRank * effect.rank) + pFlat;
      } else {
        const ranksPerPoint = 2 - Math.round(netParentRate);
        finalCost = Math.ceil(effect.rank / (ranksPerPoint > 1 ? ranksPerPoint : 2)) + pFlat;
      }
      if (pRemovable > 0) finalCost -= Math.floor(finalCost / 5) * pRemovable;
      return finalCost < 1 ? 1 : finalCost;

    } else {
      let pPerRank = 0, pFlat = 0, pRemovable = 0;
      if (effect.modifiers && effect.modifiers.length > 0) {
          effect.modifiers.forEach(m => {
              let mult = (m.category === 'extra' || m.category === 'feat') ? 1 : -1;
              let rawCost = m.cost !== undefined ? Math.abs(m.cost) : 1;
              let mC = rawCost * (parseInt(m.ranks)||1);
              if (m.costType === 'per_rank') pPerRank += mult * mC;
              else if (m.costType === 'flat') pFlat += mult * mC;
              else if (m.costType === 'removable') pRemovable += parseInt(m.ranks)||1;
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
      if (pRemovable > 0) finalCost -= Math.floor(finalCost / 5) * pRemovable;
      return finalCost < 1 ? 1 : finalCost;
    }
  }

  // Calculate container cost with compound linked primary slots and compound linked alternate/dynamic slots
  calculateTotalPowerCost(powerContainer) {
    if (!powerContainer || !powerContainer.effects || powerContainer.effects.length === 0) return 0;
    
    // If the container has an explicit declaredCost from Hero Lab, respect it
    if (powerContainer.declaredCost !== undefined && powerContainer.declaredCost !== null && !isNaN(powerContainer.declaredCost) && powerContainer.declaredCost >= 0) {
      return powerContainer.declaredCost;
    }

    let slots = [];
    let currentSlot = null;
    
    powerContainer.effects.forEach((eff) => {
      let c = this.calculateEffectCost(eff);
      let isLinked = eff.linkedTo === "previous" || (typeof eff.linkedTo === "string" && eff.linkedTo !== "") || eff.association === "linked";
      
      let slotRole = eff.association;
      if (slotRole === "linked" || !slotRole) {
        slotRole = currentSlot ? currentSlot.type : "primary";
      }

      if (isLinked && currentSlot) {
        // Compound link: Adds directly into the current slot's combined total
        currentSlot.combinedCost += c;
        currentSlot.effects.push(eff);
      } else {
        // Starts a new independent slot (Primary, Alternate, or Dynamic)
        if (slotRole === "primary" || slots.length === 0) {
          currentSlot = { type: "primary", baseCost: c, combinedCost: c, effects: [eff], alts: [] };
          slots.push(currentSlot);
        } else {
          // Alternate or Dynamic slot
          currentSlot = { type: slotRole, baseCost: c, combinedCost: c, effects: [eff] };
          if (slots.length > 0) {
            slots[0].alts.push(currentSlot);
          } else {
            currentSlot.type = "primary";
            currentSlot.alts = [];
            slots.push(currentSlot);
          }
        }
      }
    });

    let totalCost = 0;
    slots.forEach(slot => {
      let maxPrimaryCost = slot.combinedCost;
      let alts = slot.alts || [];
      
      if (maxPrimaryCost <= 0 && alts.length > 0) {
        alts.forEach(alt => {
          if (alt.combinedCost > maxPrimaryCost) {
            maxPrimaryCost = alt.combinedCost;
          }
        });
      }
      
      let slotTotal = maxPrimaryCost;
      alts.forEach(alt => {
        slotTotal += (alt.type === "dynamic" ? 2 : 1);
      });
      totalCost += slotTotal;
    });

    // Apply Boost PP subsidies if active and not altering ranks
    if (!this.houseRules || !this.houseRules.boostAltersRanks) {
      const { subsidies } = this.getBoostSubsidies();
      let containerSubsidy = 0;
      if (powerContainer.name && subsidies[powerContainer.name]) {
        containerSubsidy = Math.max(containerSubsidy, subsidies[powerContainer.name]);
      }
      if (powerContainer.effects) {
        powerContainer.effects.forEach(eff => {
          if (eff.id && subsidies[eff.id]) containerSubsidy = Math.max(containerSubsidy, subsidies[eff.id]);
          if (eff.name && subsidies[eff.name]) containerSubsidy = Math.max(containerSubsidy, subsidies[eff.name]);
          if (eff.effectName && subsidies[eff.effectName]) containerSubsidy = Math.max(containerSubsidy, subsidies[eff.effectName]);
        });
      }
      if (containerSubsidy > 0) {
        totalCost = Math.max(0, totalCost - containerSubsidy);
      }
    }
    
    return totalCost;
  }

  getBoostSubsidies() {
    const subsidies = {};
    const rankBonuses = {};
    const altersRanks = !!((this.houseRules && this.houseRules.boostAltersRanks) || (typeof localStorage !== 'undefined' && localStorage.getItem("mm2e_houserule_boost_alters_ranks") === "true"));
    const powers = this.powers || [];
    powers.forEach(p => {
      if (p.active === false) return;
      (p.effects || []).forEach(eff => {
        if (eff.effectName === "Boost") {
          const isActive = (p.active !== false) && (eff.active !== false) && (eff.boostActive !== false) && (!eff.options || eff.options.boostActive !== false);
          const target = (eff.options && eff.options.boostTarget) || eff.boostTarget;
          const r = parseInt(eff.rank) || 1;
          if (isActive && target) {
            let targetAliases = [target];
            for (const otherP of powers) {
              for (const otherEff of (otherP.effects || [])) {
                if (otherEff.id === target || otherEff.name === target || otherEff.effectName === target) {
                  targetAliases.push(otherEff.id, otherEff.name, otherEff.effectName, otherP.name);
                  break;
                }
              }
            }
            targetAliases = [...new Set(targetAliases.filter(Boolean))];
            targetAliases.forEach(alias => {
              if (altersRanks) {
                rankBonuses[alias] = (rankBonuses[alias] || 0) + r;
              } else {
                subsidies[alias] = (subsidies[alias] || 0) + r;
              }
            });
          }
        }
      });
    });
    return { subsidies, rankBonuses };
  }

  calculatePowerCost(power) {
    if (power && Array.isArray(power.effects)) {
      return this.calculateTotalPowerCost(power);
    }
    return this.calculateEffectCost(power);
  }

  calculateContainedCost(effect) {
    if (!effect || !Array.isArray(effect.containedPowers)) return 0;
    let total = 0;
    effect.containedPowers.forEach(cp => {
      if (cp.cost !== undefined && cp.cost !== null) {
        total += Number(cp.cost) || 0;
      } else if (cp.effectName) {
        total += this.calculateEffectCost(cp);
      } else {
        total += Number(cp.rank) || 1;
      }
    });
    return total;
  }

  // Aggregated benefits from active power effects
  get powerTraitModifiers() {
    let protectionToughness = 0;
    let speedBonus = 0;
    let flightRank = null;
    let swimRank = 0;
    let extraLifting = 0;

    const enhSaves = (this.enhancedTraits && this.enhancedTraits.saves) ? this.enhancedTraits.saves : { Toughness: 0, Fortitude: 0, Reflex: 0, Will: 0 };
    protectionToughness += (enhSaves.Toughness || 0);

    if (this.powers && Array.isArray(this.powers)) {
      this.powers.forEach(container => {
        if (container.active === false) return;
        const effects = Array.isArray(container.effects) ? container.effects : [container];
        effects.forEach(p => {
          if (p.active === false) return;
          const rank = Number(p.rank) || 0;
          if (p.effectName === "Protection") protectionToughness += rank;
          if (p.effectName === "Speed") speedBonus += rank;
          if (p.effectName === "Flight") flightRank = (flightRank === null ? rank : Math.max(flightRank, rank));
          if (p.effectName === "Swimming") swimRank += rank;
          if (p.effectName === "Lifting") extraLifting += rank;

          if (CharacterModel.isContainerEffect(p) && p.active !== false && p.formActive !== false && Array.isArray(p.containedPowers)) {
            p.containedPowers.forEach(cp => {
              const cRank = Number(cp.rank) || 0;
              const cpName = cp.effectName || cp.name;
              if (cpName === "Protection") protectionToughness += cRank;
              if (cpName === "Speed") speedBonus += cRank;
              if (cpName === "Flight") flightRank = (flightRank === null ? cRank : Math.max(flightRank, cRank));
              if (cpName === "Swimming") swimRank += cRank;
              if (cpName === "Lifting" || cpName === "Super-Strength") extraLifting += cRank;
            });
          }
        });
      });
    }

    return {
      protectionToughness,
      speedBonus,
      flightRank,
      swimRank,
      extraLifting,
      enhancedToughness: enhSaves.Toughness || 0,
      enhancedFortitude: enhSaves.Fortitude || 0,
      enhancedReflex: enhSaves.Reflex || 0,
      enhancedWill: enhSaves.Will || 0
    };
  }

  get derivedStats() {
    const sizeData = (typeof SIZE_TABLE !== 'undefined' && SIZE_TABLE[this.sizeCategory]) ? SIZE_TABLE[this.sizeCategory] : { spaces: "1", reach: "1", rank: 0, speed: 0, defense: 0, damage: 0, toughness: 0 };
    const str = this.getAbilityRank("STR");
    const con = this.getAbilityRank("CON");
    const dex = this.getAbilityRank("DEX");
    const int = this.getAbilityRank("INT");
    const wis = this.getAbilityRank("WIS");
    const cha = this.getAbilityRank("CHA");
    const atk = this.getCombatRank("ATK");
    const def = this.getCombatRank("DEF");

    const pMods = this.powerTraitModifiers;
    const effFeats = this.effectiveFeats || this.feats;

    const defensiveRollRanks = effFeats["Defensive Roll"] || 0;
    const dodgeFocusRanks = (effFeats["Dodge Focus"] || 0) +
      Object.keys(effFeats).reduce((sum, k) => (k.startsWith("Dodge Focus") && k !== "Dodge Focus") ? sum + (effFeats[k] || 0) : sum, 0);
    const improvedInitRanks = effFeats["Improved Initiative"] || 0;

    // 2E Uncanny Dodge feat: Retain dodge bonus (and Defensive Roll) when flat-footed
    const uncannyDodgeRanks = (effFeats["Uncanny Dodge"] || 0) +
      Object.keys(effFeats).reduce((sum, k) => (k.startsWith("Uncanny Dodge") && k !== "Uncanny Dodge") ? sum + (effFeats[k] || 0) : sum, 0);
    const hasUncannyDodge = uncannyDodgeRanks > 0;

    // 2E Attack Focus feats
    let meleeAtkFeat = (effFeats["Attack Focus (Melee)"] || 0) + (effFeats["Attack Focus (melee)"] || 0) + (effFeats["Close Attack"] || 0);
    let rangedAtkFeat = (effFeats["Attack Focus (Ranged)"] || 0) + (effFeats["Attack Focus (ranged)"] || 0) + (effFeats["Ranged Attack"] || 0);

    if (effFeats["Attack Focus"]) {
      const detail = (this.featDetails["Attack Focus"] || "").toLowerCase();
      if (detail.includes("melee") || detail.includes("close")) {
        meleeAtkFeat += effFeats["Attack Focus"];
      } else if (detail.includes("ranged")) {
        rangedAtkFeat += effFeats["Attack Focus"];
      }
    }

    Object.keys(effFeats).forEach(k => {
      const lower = k.toLowerCase();
      if (lower.startsWith("attack focus") && k !== "Attack Focus (Melee)" && k !== "Attack Focus (melee)" && k !== "Attack Focus (Ranged)" && k !== "Attack Focus (ranged)" && k !== "Attack Focus") {
        if (lower.includes("melee") || lower.includes("close")) {
          meleeAtkFeat += (effFeats[k] || 0);
        } else if (lower.includes("ranged")) {
          rangedAtkFeat += (effFeats[k] || 0);
        }
      }
    });

    const sizeDef = sizeData.defense || 0;
    const sizeAtk = sizeData.defense || 0; // In 2E, size attack modifier equals defense modifier

    // In 2E:
    // Total Defense = Base DEF + Dodge Focus ranks + Size modifier + Shield power
    // Flat-Footed Defense = Base DEF + Size modifier + Shield power (retains Dodge Focus if Uncanny Dodge)
    const totalDefense = def + dodgeFocusRanks + sizeDef + (pMods.shieldDefense || 0);
    const flatDodgeBonus = hasUncannyDodge ? dodgeFocusRanks : 0;
    const flatFootedDefense = def + flatDodgeBonus + sizeDef + (pMods.shieldDefense || 0);
    const defenseClass = 10 + totalDefense;
    const flatFootedDefenseClass = 10 + flatFootedDefense;

    const meleeAttack = atk + meleeAtkFeat + sizeAtk;
    const rangedAttack = atk + rangedAtkFeat + sizeAtk;

    const initiative = (dex === null ? -5 : dex) + (improvedInitRanks * 4);

    const lightningReflexesRanks = (effFeats["Lightning Reflexes"] || 0);
    const greatFortitudeRanks = (effFeats["Great Fortitude"] || 0);
    const ironWillRanks = (effFeats["Iron Will"] || 0);

    const reflex = (dex === null) ? null : (dex + (this.purchasedResistances.Reflex || 0) + (pMods.enhancedReflex || 0) + (lightningReflexesRanks * 2));
    const fortitude = (con === null) ? null : (con + (this.purchasedResistances.Fortitude || 0) + (pMods.enhancedFortitude || 0) + (greatFortitudeRanks * 2));
    
    // Defensive Roll is lost when flat-footed unless the character has Uncanny Dodge
    const flatDefensiveRoll = hasUncannyDodge ? defensiveRollRanks : 0;
    const baseConToughness = (con === null) ? (this.purchasedResistances.Toughness || 0) : con;
    const toughness = baseConToughness + defensiveRollRanks + (effFeats["Tough"] || 0) + (pMods.protectionToughness || 0) + (sizeData.toughness || 0);
    const flatFootedToughness = baseConToughness + flatDefensiveRoll + (effFeats["Tough"] || 0) + (pMods.protectionToughness || 0) + (sizeData.toughness || 0);

    const will = (wis === null) ? null : (wis + (this.purchasedResistances.Will || 0) + (pMods.enhancedWill || 0) + (ironWillRanks * 2));
    const knockback = -Math.floor(toughness / 2);

    const baseSpeed = (sizeData.speed || 0) + pMods.speedBonus;
    const liftRank = (str === null ? -5 : str) + pMods.extraLifting;

    return {
      defenseClass,
      flatFootedDefenseClass,
      totalDefense,
      flatFootedDefense,
      hasUncannyDodge,
      uncannyDodgeRanks,
      dodgeFocusRanks,
      closeDefense: totalDefense, // alias for backwards compatibility
      rangedDefense: totalDefense, // alias for backwards compatibility
      initiative,
      reflex,
      fortitude,
      toughness,
      flatFootedToughness,
      will,
      knockback,
      meleeAttack,
      rangedAttack,
      meleeAtkFeat,
      rangedAtkFeat,
      closeAttack: meleeAttack, // alias for backwards compatibility
      groundSpeed: baseSpeed,
      airSpeed: pMods.flightRank,
      waterSpeed: pMods.swimRank,
      spaces: sizeData.spaces,
      reach: sizeData.reach,
      sizeRank: sizeData.rank,
      maxLiftingMassRank: liftRank
    };
  }

  get powerPointsSummary() {
    let abilityPP = 0;
    if (this.isMecha) {
      // Mecha & Manga rules: Mecha only purchase STR and DEX (and mental scores if AI equipped)
      abilityPP += ((this.abilities.STR || 0) * 2) + ((this.abilities.DEX || 0) * 2);
      if (this.hasAI) {
        if (!this.absentAbilities.INT) abilityPP += ((this.abilities.INT || 0) * 2);
        if (!this.absentAbilities.WIS) abilityPP += ((this.abilities.WIS || 0) * 2);
        if (!this.absentAbilities.CHA) abilityPP += ((this.abilities.CHA || 0) * 2);
      }
    } else {
      for (const key of Object.keys(this.abilities)) {
        if (this.absentAbilities[key]) {
          abilityPP -= 10;
        } else {
          abilityPP += (this.abilities[key] * 2);
        }
      }
    }

    const combatPP = (this.combat.ATK * 2) + (this.combat.DEF * 2);

    const resistancePP = (this.purchasedResistances.Reflex || 0) +
                         (this.purchasedResistances.Fortitude || 0) +
                         (this.purchasedResistances.Will || 0) +
                         (this.purchasedResistances.Toughness || 0);

    let totalSkillRanks = 0;
    for (const rank of Object.values(this.skills)) {
      totalSkillRanks += Number(rank) || 0;
    }
    // In M&M 2E, 4 skill ranks cost 1 PP
    const skillsPP = Math.ceil(totalSkillRanks / 4);

    let featsPP = 0;
    for (const rank of Object.values(this.feats)) {
      featsPP += Number(rank) || 0;
    }

    let powersPP = 0;
    if (this.powers && Array.isArray(this.powers)) {
      this.powers.forEach(p => {
        powersPP += this.calculatePowerCost(p);
      });
    }

    const totalSpent = abilityPP + combatPP + resistancePP + skillsPP + featsPP + powersPP;
    const remaining = this.totalPointsAllowed - totalSpent;

    return {
      abilities: abilityPP,
      combat: combatPP,
      resistances: resistancePP,
      skills: skillsPP,
      feats: featsPP,
      powers: powersPP,
      totalSpent: totalSpent,
      remaining: remaining,
      pointUnit: this.isMecha ? "MP" : "PP"
    };
  }

  getAbilityPP() { return this.powerPointsSummary.abilities; }
  getCombatPP() { return this.powerPointsSummary.combat; }
  getResistancePP() { return this.powerPointsSummary.resistances; }
  getSkillPP() { return this.powerPointsSummary.skills; }
  getFeatsPP() { return this.powerPointsSummary.feats; }
  getAdvantagePP() { return this.powerPointsSummary.feats; }
  getPowersPP() { return this.powerPointsSummary.powers; }

  static normalizeEffectSubPowers(eff) {
    if (!eff) return;
    if (!eff.subPowers) eff.subPowers = [];
    if (!Array.isArray(eff.modifiers) || eff.modifiers.length === 0) return;

    // Migrate trait_boost modifiers (e.g. from older imports or legacy blueprints)
    const traitBoosts = eff.modifiers.filter(m => m.category === "trait_boost");
    if (traitBoosts.length > 0) {
      traitBoosts.forEach(tb => {
        const cleanLabel = (tb.name || "").replace(/^Enhanced\s+/i, '').replace(/\s*\+\d+$/, '').trim();
        const modRanks = parseInt(tb.ranks) || 1;
        const lower = cleanLabel.toLowerCase();
        let bCost = 1;
        let r = modRanks;
        const isAbility = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma", "str", "dex", "con", "int", "wis", "cha"].includes(lower);
        const isCombat = ["attack", "attack bonus", "defense", "defense bonus"].includes(lower);
        const isSkill = (typeof SKILLS_LIST !== 'undefined' && SKILLS_LIST.some(s => s.name.toLowerCase() === lower)) ||
                        lower.startsWith("craft") || lower.startsWith("knowledge") || lower.startsWith("perform") || lower.startsWith("profession") ||
                        ["gambling", "navigation"].includes(lower);

        if (isAbility) {
          bCost = 2;
          r = modRanks / 2;
        } else if (isCombat) {
          bCost = 2;
          r = modRanks;
        } else if (isSkill) {
          bCost = 0.25;
          r = modRanks;
        }

        if (!eff.subPowers.some(sp => (sp.type || sp.name || "").toLowerCase() === lower || (sp.type || sp.name || "").toLowerCase().includes(lower))) {
          eff.subPowers.push({
            name: `${cleanLabel} (+${modRanks})`,
            type: cleanLabel,
            rank: r,
            baseCost: bCost,
            costType: "per_rank",
            details: "",
            modifiers: [],
            isReduced: modRanks < 0
          });
        }
      });
      eff.modifiers = eff.modifiers.filter(m => m.category !== "trait_boost");
      if (eff.effectName === "Enhanced Trait") {
        eff.rank = Math.max(1, Math.round(eff.subPowers.reduce((sum, sp) => sum + (sp.rank * (sp.baseCost || 1)), 0)));
        eff.ranks = eff.rank;
      }
    }

    // Migrate option modifiers for composite option effects (Immunity, Super-Senses, etc.)
    const optMods = eff.modifiers.filter(m => m.category === "option");
    if (optMods.length > 0 && ["Immunity", "Super-Senses", "Super-Movement", "Comprehend", "Enhanced Movement"].includes(eff.effectName)) {
      optMods.forEach(om => {
        const oName = om.name;
        let r = 1;
        let bCost = 1;
        if (eff.effectName === "Immunity") {
          const immunityRankMap = {
            "aging": 1, "disease": 1, "poison": 1, "starvation and thirst": 1, "need for sleep": 1,
            "suffocation (all)": 2, "suffocation (one type)": 1, "critical hits": 2,
            "alteration effects": 5, "dazzle effects": 5, "emotion effects": 5, "entrapment": 5,
            "fatigue effects": 5, "interaction skills": 5, "trait effects": 5, "damage type": 5, "damage": 5,
            "life support": 9, "mental effects": 10,
            "rare descriptor": 1, "uncommon descriptor": 2, "common descriptor": 5, "very common descriptor": 10,
            "all nonlethal physical damage": 20, "all lethal physical damage": 20,
            "all nonlethal energy damage": 20, "all lethal energy damage": 20
          };
          r = immunityRankMap[oName.toLowerCase().trim()] || 1;
        } else if (eff.effectName === "Super-Senses") {
          const senseRankMap = { "darkvision": 2, "x-ray vision": 4, "tremorsense": 3, "blindsight": 4, "postcognition": 4, "precognition": 4, "accurate": 2 };
          r = senseRankMap[oName.toLowerCase().trim()] || 1;
        } else if (eff.effectName === "Super-Movement") {
          bCost = 2;
        } else if (eff.effectName === "Comprehend") {
          bCost = 2;
          r = (oName.toLowerCase().includes("languages") ? 1 : 2);
        }
        if (!eff.subPowers.some(sp => (sp.type || sp.name || "").toLowerCase() === oName.toLowerCase())) {
          eff.subPowers.push({
            name: oName,
            type: oName,
            rank: r,
            baseCost: bCost,
            costType: "per_rank",
            details: "",
            modifiers: [],
            isReduced: false
          });
        }
      });
      eff.modifiers = eff.modifiers.filter(m => m.category !== "option");
      if (["Immunity", "Super-Senses"].includes(eff.effectName)) {
        eff.rank = eff.subPowers.reduce((sum, sp) => sum + (sp.rank || 1), 0);
        eff.ranks = eff.rank;
      }
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = CharacterModel;
}