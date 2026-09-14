/**
 * por_importer.js - Hero Lab Mutants & Masterminds 2E Portfolio (.por) Importer
 * 
 * Rebuilt to support:
 * 1. Full Portfolio & Profile Ingestion: Leads, Minions, Alternate Forms, Mecha, and Headquarters.
 * 2. Canonical Ultimate Power (UP) Reconciliation: Translates Core 2E power naming to UP Base Effects & Profiles.
 * 3. Point Reconciliation & UP Refund Engine: Automatically recalculates UP costs, refunds obsolete traits,
 *    and balances character points.
 * 4. User Notes & Custom Modifiers Preservation: Guarantees zero data loss for freeform specs and notes.
 * 5. In-Editor Import Audit Report: Interactive modal and status shortcut for complete review.
 */

(function() {
  'use strict';

  // ==========================================================================
  // CANONICAL SKILL NORMALIZATION & REMAPPING
  // ==========================================================================
  const SKILL_NAME_NORMALIZATION_MAP = {
    "acrobatics": "Acrobatics",
    "bluff": "Bluff",
    "climb": "Climb",
    "computers": "Computers",
    "concentration": "Concentration",
    "craft (chemical)": "Craft (Chemical)",
    "craft (electronic)": "Craft (Electronic)",
    "craft (mechanical)": "Craft (Mechanical)",
    "craft (structural)": "Craft (Structural)",
    "craft (artistic)": "Craft (Artistic)",
    "diplomacy": "Diplomacy",
    "disable device": "Disable Device",
    "disguise": "Disguise",
    "drive": "Drive",
    "escape artist": "Escape Artist",
    "gather information": "Gather Information",
    "handle animal": "Handle Animal",
    "intimidate": "Intimidate",
    "investigate": "Investigate",
    "knowledge (arcane lore)": "Knowledge (Arcane Lore)",
    "knowledge (art)": "Knowledge (Art)",
    "knowledge (behavioral sciences)": "Knowledge (Behavioral Sciences)",
    "knowledge (business)": "Knowledge (Business)",
    "knowledge (civics)": "Knowledge (Civics)",
    "knowledge (current events)": "Knowledge (Current Events)",
    "knowledge (earth sciences)": "Knowledge (Earth Sciences)",
    "knowledge (history)": "Knowledge (History)",
    "knowledge (life sciences)": "Knowledge (Life Sciences)",
    "knowledge (physical sciences)": "Knowledge (Physical Sciences)",
    "knowledge (popular culture)": "Knowledge (Popular Culture)",
    "knowledge (streetwise)": "Knowledge (Streetwise)",
    "knowledge (tactics)": "Knowledge (Tactics)",
    "knowledge (technology)": "Knowledge (Technology)",
    "knowledge (theology & philosophy)": "Knowledge (Theology & Philosophy)",
    "language": "Language",
    "medicine": "Medicine",
    "notice": "Notice",
    "perform (acting)": "Perform (Acting)",
    "perform (comedy)": "Perform (Comedy)",
    "perform (dance)": "Perform (Dance)",
    "perform (keyboard)": "Perform (Keyboard)",
    "perform (singing)": "Perform (Singing)",
    "perform (strings)": "Perform (Strings)",
    "perform (wind)": "Perform (Wind)",
    "pilot": "Pilot",
    "profession": "Profession",
    "ride": "Ride",
    "search": "Search",
    "sense motive": "Sense Motive",
    "sleight of hand": "Sleight of Hand",
    "stealth": "Stealth",
    "survival": "Survival",
    "swim": "Swim",
    "gambling": "Gambling",
    "navigation": "Navigation"
  };

  // ==========================================================================
  // CANONICAL ULTIMATE POWER (UP) ALIAS & PROFILE MAP
  // ==========================================================================
  const POWER_UP_ALIAS_MAP = {
    // Core 2E Powers -> UP Base Effect, Profile Name, and Canonical Extras/Modifiers
    "Blast": {
      effectName: "Damage",
      profileName: "Blast",
      baseCost: 2,
      range: "ranged",
      action: "standard",
      duration: "instant",
      savingThrow: "Toughness",
      defaultModifiers: [
        { name: "Range (Ranged)", category: "extra", cost: 1, costType: "per_rank", ranks: 1, details: "Ranged" }
      ]
    },
    "Strike": {
      effectName: "Damage",
      profileName: "Strike",
      baseCost: 1,
      range: "touch",
      action: "standard",
      duration: "instant",
      savingThrow: "Toughness"
    },
    "Armor": {
      effectName: "Protection",
      profileName: "Armor",
      baseCost: 1,
      range: "personal",
      action: "none",
      duration: "permanent",
      savingThrow: "none"
    },
    "Force Field": {
      effectName: "Protection",
      profileName: "Force Field",
      baseCost: 1,
      range: "personal",
      action: "free",
      duration: "sustained",
      savingThrow: "none"
    },
    "Invisibility": {
      effectName: "Concealment",
      profileName: "Invisibility",
      baseCost: 4,
      range: "personal",
      action: "free",
      duration: "sustained",
      savingThrow: "none",
      options: { "Concealment Type": "Normal Visual (2 ranks)" }
    },
    "Banish": {
      effectName: "Super-Movement",
      profileName: "Banish",
      baseCost: 2,
      range: "ranged",
      action: "standard",
      duration: "instant",
      savingThrow: "Will",
      defaultModifiers: [
        { name: "Attack", category: "extra", cost: 1, costType: "per_rank", ranks: 1, details: "Will Save" },
        { name: "Range (Ranged)", category: "extra", cost: 1, costType: "per_rank", ranks: 1, details: "Ranged" },
        { name: "Limited", category: "flaw", cost: 1, costType: "per_rank", ranks: 1, details: "Specific extradimensional species" }
      ]
    },
    "Boost": {
      // Obsolete Core 2E Trait -> Converted to Enhanced Trait with Fades in UP
      effectName: "Enhanced Trait",
      profileName: "Boost (Obsolete Core 2E)",
      baseCost: 1,
      range: "personal",
      action: "free",
      duration: "sustained",
      savingThrow: "none",
      isObsoleteCore: true,
      defaultModifiers: [
        { name: "Fades", category: "flaw", cost: 1, costType: "per_rank", ranks: 1, details: "Fades at 1 PP/round" }
      ]
    },
    "Energy Aura": {
      effectName: "Damage",
      profileName: "Energy Aura",
      baseCost: 4,
      range: "touch",
      action: "reaction",
      duration: "sustained",
      savingThrow: "Toughness",
      defaultModifiers: [
        { name: "Aura", category: "extra", cost: 1, costType: "per_rank", ranks: 1, details: "Damages upon touch" },
        { name: "Action (Reaction)", category: "extra", cost: 2, costType: "per_rank", ranks: 1, details: "Reaction" }
      ]
    },
    "Corrosion": {
      effectName: "Damage",
      profileName: "Corrosion",
      baseCost: 3,
      range: "touch",
      action: "standard",
      duration: "instant",
      savingThrow: "Toughness",
      linkedEffects: [
        { name: "Drain Toughness", effectName: "Drain", baseCost: 1, range: "touch", action: "standard", duration: "instant", savingThrow: "Fortitude", options: { "Drain Trait": "Toughness" } }
      ]
    },
    "Disintegration": {
      effectName: "Damage",
      profileName: "Disintegration",
      baseCost: 4,
      range: "ranged",
      action: "standard",
      duration: "instant",
      savingThrow: "Toughness",
      defaultModifiers: [
        { name: "Range (Ranged)", category: "extra", cost: 1, costType: "per_rank", ranks: 1, details: "Ranged" }
      ],
      linkedEffects: [
        { name: "Drain Toughness (Ranged)", effectName: "Drain", baseCost: 2, range: "ranged", action: "standard", duration: "instant", savingThrow: "Fortitude", options: { "Drain Trait": "Toughness" } }
      ]
    },
    "Immortality": {
      effectName: "Regeneration",
      profileName: "Immortality",
      baseCost: 1,
      range: "personal",
      action: "none",
      duration: "permanent",
      savingThrow: "none"
    },
    "Telepathy": {
      effectName: "Mind Reading",
      profileName: "Telepathy",
      baseCost: 2,
      range: "ranged",
      action: "standard",
      duration: "sustained",
      savingThrow: "Will",
      linkedEffects: [
        { name: "Mental Communication", effectName: "Communication", baseCost: 1, range: "ranged", action: "free", duration: "sustained", savingThrow: "none" }
      ]
    },
    "Container, Active": {
      effectName: "Container",
      profileName: "Container (Active)",
      baseCost: 5,
      range: "personal",
      action: "free",
      duration: "sustained",
      savingThrow: "none",
      isContainer: true
    },
    "Container, Passive": {
      effectName: "Container",
      profileName: "Container (Passive)",
      baseCost: 4,
      range: "personal",
      action: "none",
      duration: "continuous",
      savingThrow: "none",
      isContainer: true
    },
    "Container": {
      effectName: "Container",
      profileName: "Container (Active)",
      baseCost: 5,
      range: "personal",
      action: "free",
      duration: "sustained",
      savingThrow: "none",
      isContainer: true
    },
    "Alternate Form": {
      effectName: "Container",
      profileName: "Alternate Form",
      baseCost: 5,
      range: "personal",
      action: "free",
      duration: "sustained",
      savingThrow: "none",
      isContainer: true
    },
    "Impervious Fortitude": {
      effectName: "Feature",
      profileName: "Impervious Fortitude",
      baseCost: 1,
      range: "personal",
      action: "none",
      duration: "continuous",
      savingThrow: "none"
    },
    "Impervious Reflex": {
      effectName: "Feature",
      profileName: "Impervious Reflex",
      baseCost: 1,
      range: "personal",
      action: "none",
      duration: "continuous",
      savingThrow: "none"
    },
    "Impervious Will": {
      effectName: "Feature",
      profileName: "Impervious Will",
      baseCost: 1,
      range: "personal",
      action: "none",
      duration: "continuous",
      savingThrow: "none"
    }
  };

  // Canonical Modifier Mapping
  const MODIFIER_NAME_MAP = {
    // Extras
    "action": { name: "Action", category: "extra", cost: 1, costType: "per_rank" },
    "action (reaction)": { name: "Action (Reaction)", category: "extra", cost: 1, costType: "per_rank" },
    "action (free)": { name: "Action (Free)", category: "extra", cost: 1, costType: "per_rank" },
    "action (move)": { name: "Action (Move)", category: "extra", cost: 1, costType: "per_rank" },
    "affects insubstantial": { name: "Affects Insubstantial", category: "feat", cost: 1, costType: "flat" },
    "affects others": { name: "Affects Others", category: "extra", cost: 1, costType: "per_rank" },
    "alternate save": { name: "Alternate Save", category: "extra", cost: 1, costType: "per_rank" },
    "area": { name: "Area (Burst)", category: "extra", cost: 1, costType: "per_rank" },
    "area (burst)": { name: "Area (Burst)", category: "extra", cost: 1, costType: "per_rank" },
    "burst area (30 ft. radius - general)": { name: "Area (Burst)", category: "extra", cost: 1, costType: "per_rank" },
    "burst area (15-75 ft. radius - general)": { name: "Area (Burst)", category: "extra", cost: 1, costType: "per_rank" },
    "burst area": { name: "Area (Burst)", category: "extra", cost: 1, costType: "per_rank" },
    "area (cone)": { name: "Area (Cone)", category: "extra", cost: 1, costType: "per_rank" },
    "area (line)": { name: "Area (Line)", category: "extra", cost: 1, costType: "per_rank" },
    "area (perception)": { name: "Area (Perception)", category: "extra", cost: 1, costType: "per_rank" },
    "attack": { name: "Attack", category: "extra", cost: 1, costType: "per_rank" },
    "aura": { name: "Aura", category: "extra", cost: 1, costType: "per_rank" },
    "autonomous": { name: "Autonomous", category: "extra", cost: 1, costType: "per_rank" },
    "continuous": { name: "Duration (Continuous)", category: "extra", cost: 1, costType: "per_rank" },
    "duration (continuous)": { name: "Duration (Continuous)", category: "extra", cost: 1, costType: "per_rank" },
    "duration (sustained)": { name: "Duration (Sustained)", category: "extra", cost: 1, costType: "per_rank" },
    "heroic": { name: "Heroic", category: "extra", cost: 1, costType: "per_rank" },
    "horde": { name: "Horde", category: "extra", cost: 1, costType: "per_rank" },
    "impervious": { name: "Impervious", category: "extra", cost: 1, costType: "per_rank" },
    "no saving throw": { name: "No Saving Throw", category: "extra", cost: 2, costType: "per_rank" },
    "penetrating": { name: "Penetrating", category: "extra", cost: 1, costType: "per_rank" },
    "range (ranged)": { name: "Range (Ranged)", category: "extra", cost: 1, costType: "per_rank" },
    "range (perception)": { name: "Range (Perception)", category: "extra", cost: 2, costType: "per_rank" },
    "restoration": { name: "Restoration", category: "extra", cost: 1, costType: "per_rank" },
    "resurrection": { name: "Resurrection", category: "extra", cost: 1, costType: "per_rank" },
    "secondary effect": { name: "Secondary Effect", category: "extra", cost: 1, costType: "per_rank" },
    "selective": { name: "Selective", category: "extra", cost: 1, costType: "per_rank" },
    "selective attack": { name: "Selective", category: "extra", cost: 1, costType: "per_rank" },
    "total": { name: "Total", category: "extra", cost: 1, costType: "per_rank" },
    "universal": { name: "Universal", category: "extra", cost: 1, costType: "per_rank" },
    "vampiric": { name: "Vampiric", category: "extra", cost: 1, costType: "per_rank" },

    // Flaws
    "action (flaw)": { name: "Action (Flaw)", category: "flaw", cost: 1, costType: "per_rank" },
    "check required": { name: "Check Required", category: "flaw", cost: 1, costType: "per_rank" },
    "distracting": { name: "Distracting", category: "flaw", cost: 1, costType: "per_rank" },
    "fades": { name: "Fades", category: "flaw", cost: 1, costType: "per_rank" },
    "feedback": { name: "Feedback", category: "flaw", cost: 1, costType: "per_rank" },
    "limited": { name: "Limited", category: "flaw", cost: 1, costType: "per_rank" },
    "noticeable": { name: "Noticeable", category: "flaw", cost: 1, costType: "flat" },
    "permanent": { name: "Permanent", category: "flaw", cost: 1, costType: "per_rank" },
    "personal": { name: "Personal", category: "flaw", cost: 1, costType: "per_rank" },
    "range (touch)": { name: "Range (Touch)", category: "flaw", cost: 1, costType: "per_rank" },
    "side effect": { name: "Side Effect", category: "flaw", cost: 1, costType: "per_rank" },
    "tiring": { name: "Tiring", category: "flaw", cost: 1, costType: "per_rank" },
    "unreliable": { name: "Unreliable", category: "flaw", cost: 1, costType: "per_rank" },

    // Power Feats
    "accurate": { name: "Accurate", category: "feat", cost: 1, costType: "flat" },
    "alternate power": { name: "Alternate Power", category: "feat", cost: 1, costType: "flat" },
    "alternate power (dynamic)": { name: "Alternate Power (Dynamic)", category: "feat", cost: 2, costType: "flat" },
    "dynamic": { name: "Alternate Power (Dynamic)", category: "feat", cost: 2, costType: "flat" },
    "dimensional": { name: "Dimensional", category: "feat", cost: 1, costType: "flat" },
    "extended range": { name: "Extended Range", category: "extra", cost: 1, costType: "flat" },
    "homing": { name: "Homing", category: "feat", cost: 1, costType: "flat" },
    "improved critical": { name: "Improved Critical", category: "feat", cost: 1, costType: "flat" },
    "improved range": { name: "Improved Range", category: "feat", cost: 1, costType: "flat" },
    "incurable": { name: "Incurable", category: "feat", cost: 1, costType: "flat" },
    "indestructible": { name: "Indestructible", category: "feat", cost: 1, costType: "flat" },
    "indirect": { name: "Indirect", category: "feat", cost: 1, costType: "flat" },
    "innate": { name: "Innate", category: "feat", cost: 1, costType: "flat" },
    "mental link": { name: "Mental Link", category: "feat", cost: 1, costType: "flat" },
    "metamorph": { name: "Metamorph", category: "feat", cost: 1, costType: "flat" },
    "mighty": { name: "Mighty", category: "feat", cost: 1, costType: "flat" },
    "persistent": { name: "Persistent", category: "feat", cost: 1, costType: "flat" },
    "precise": { name: "Precise", category: "feat", cost: 1, costType: "flat" },
    "progression": { name: "Progression", category: "extra", cost: 1, costType: "flat" },
    "progression, increase range": { name: "Progression (Range)", category: "feat", cost: 1, costType: "flat" },
    "progression, increase area": { name: "Progression (Area)", category: "feat", cost: 1, costType: "flat" },
    "progression, resurrection delay": { name: "Progression (Resurrection Delay)", category: "feat", cost: 1, costType: "flat" },
    "progression, affects others": { name: "Progression (Affects Others)", category: "feat", cost: 1, costType: "flat" },
    "reach": { name: "Reach", category: "feat", cost: 1, costType: "flat" },
    "regrowth": { name: "Regrowth", category: "feat", cost: 1, costType: "flat" },
    "restricted": { name: "Restricted", category: "feat", cost: 1, costType: "flat" },
    "restricted use": { name: "Restricted", category: "feat", cost: 1, costType: "flat" },
    "reversible": { name: "Reversible", category: "feat", cost: 1, costType: "flat" },
    "ricochet": { name: "Ricochet", category: "feat", cost: 1, costType: "flat" },
    "sedation": { name: "Sedation", category: "feat", cost: 1, costType: "flat" },
    "slow fade": { name: "Slow Fade", category: "feat", cost: 1, costType: "flat" },
    "split attack": { name: "Split Attack", category: "feat", cost: 1, costType: "flat" },
    "stabilize": { name: "Stabilize", category: "feat", cost: 1, costType: "flat" },
    "subtle": { name: "Subtle", category: "feat", cost: 1, costType: "flat" },
    "summonable": { name: "Summonable", category: "feat", cost: 1, costType: "flat" },
    "triggered": { name: "Triggered", category: "feat", cost: 1, costType: "flat" },
    "variable descriptor": { name: "Variable Descriptor", category: "feat", cost: 1, costType: "flat" }
  };

  // Obsolete Feats designated for full refund
  const OBSOLETE_FEATS_REFUND_MAP = {
    // Legacy / obsolete feats from early 2E that have no UP equivalent
  };

  // Obsolete Modifiers designated for full refund
  const OBSOLETE_MODIFIERS_REFUND_MAP = {
    // Legacy / obsolete modifiers from early 2E that have no UP equivalent
  };

  // ==========================================================================
  // SCOPED DOM NAVIGATION HELPERS (Prevents descendant leaking from nested minions)
  // ==========================================================================
  function getDirectChild(parent, tagName) {
    if (!parent || !parent.children) return null;
    const tag = tagName.toLowerCase();
    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i].tagName.toLowerCase() === tag) {
        return parent.children[i];
      }
    }
    return null;
  }

  function getDirectChildren(parent, tagName) {
    if (!parent || !parent.children) return [];
    const tag = tagName ? tagName.toLowerCase() : null;
    const res = [];
    for (let i = 0; i < parent.children.length; i++) {
      if (!tag || parent.children[i].tagName.toLowerCase() === tag) {
        res.push(parent.children[i]);
      }
    }
    return res;
  }

  function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // ==========================================================================
  // POWER NAME DECONSTRUCTOR
  // ==========================================================================
  function deconstructHeroLabPowerName(rawName) {
    let customName = rawName.trim();
    let hlBaseName = rawName.trim();
    let ranks = null;
    let subOption = null;

    // Pattern 1: e.g. "Enchanted Guise (Morph 4)" or "Invisibility (normal vision) (Invisibility 2)"
    // Outermost trailing parenthesis contains base name and optional rank
    const p1 = rawName.match(/^(.*?)(?:\s*\(([^()]+?)(?:\s+([\d.]+))?\))$/);
    if (p1) {
      customName = p1[1].trim();
      hlBaseName = p1[2].trim();
      if (p1[3]) ranks = parseFloat(p1[3]);

      // If customName contains an inner specification, e.g. "Invisibility (normal vision)"
      const innerMatch = customName.match(/^(.*?)(?:\s*\((.*?)\))$/);
      if (innerMatch) {
        subOption = innerMatch[2].trim();
      }

      return { customName, hlBaseName, ranks, subOption };
    }

    // Pattern 2: e.g. "Strike (Mighty) 4" or "Force Field (Impervious) 5"
    const p2 = rawName.match(/^(.*?)(?:\s*\((.*?)\))?\s+([\d.]+)$/);
    if (p2) {
      hlBaseName = p2[1].trim();
      subOption = p2[2] ? p2[2].trim() : null;
      ranks = parseFloat(p2[3]);
      customName = subOption ? `${hlBaseName} (${subOption})` : hlBaseName;
      return { customName, hlBaseName, ranks, subOption };
    }

    // Pattern 3: e.g. "Healing 6" or "Quickness 1"
    const p3 = rawName.match(/^(.*?)(?:\s+([\d.]+))$/);
    if (p3) {
      customName = p3[1].trim();
      hlBaseName = p3[1].trim();
      ranks = parseFloat(p3[2]);
      return { customName, hlBaseName, ranks, subOption: null };
    }

    return { customName, hlBaseName, ranks: 1, subOption: null };
  }

  function recordUnmappedDataPoint(audit, category, parent, label, value, disposition, reason) {
    if (!audit.unmappedDataPoints) audit.unmappedDataPoints = [];
    audit.unmappedDataPoints.push({
      category: category || "General",
      parent: parent || "Character",
      label: label || "Unknown Data Point",
      value: value !== undefined && value !== null ? String(value) : "",
      disposition: disposition || "Preserved in Notes",
      reason: reason || "No direct native MM2CE equivalent."
    });
  }

  // ==========================================================================
  // ZIP UTILITIES & INTENDED HERO DETECTION
  // ==========================================================================
  function findZipFile(zip, relativePath) {
    if (!relativePath) return null;
    if (zip.file(relativePath)) return zip.file(relativePath);

    const normPath = relativePath.replace(/\\/g, "/").toLowerCase();
    const baseName = normPath.split("/").pop();

    let found = null;
    zip.forEach((path, file) => {
      if (found) return;
      const p = path.replace(/\\/g, "/").toLowerCase();
      if (p === normPath || p.endsWith("/" + baseName) || p === baseName) {
        found = file;
      }
    });
    return found;
  }

  async function findIntendedLeadCharacter(zip, characters, fileName) {
    if (!characters || characters.length === 0) return null;
    if (characters.length === 1) return characters[0];

    // Normalize filename (strip extension and non-alphanumeric chars)
    const cleanFileName = (fileName || "")
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();

    // 1. Check if fileName matches any character name
    let nameMatchedChar = null;
    if (cleanFileName.length >= 3) {
      const nameMatches = characters.filter(c => {
        const cName = (c.getAttribute("name") || "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        return cName && (cleanFileName.includes(cName) || cName.includes(cleanFileName));
      });
      if (nameMatches.length === 1) {
        nameMatchedChar = nameMatches[0];
      }
    }

    // 2. Check herolab/portfolio.xml activehero attribute
    let portfolioActiveChar = null;
    try {
      const portFile = findZipFile(zip, "herolab/portfolio.xml") || findZipFile(zip, "portfolio.xml");
      if (portFile) {
        const portStr = await portFile.async("string");
        const portDoc = new DOMParser().parseFromString(portStr, "text/xml");
        const portEl = portDoc.querySelector("portfolio");
        if (portEl && portEl.getAttribute("activehero")) {
          const activeHeroIdx = portEl.getAttribute("activehero").trim();
          portfolioActiveChar = characters.find(c => c.getAttribute("herolableadindex") === activeHeroIdx) || null;
        }
      }
    } catch (e) {
      console.warn("Could not read portfolio.xml:", e);
    }

    // 3. Check statblocks_xml for character with active="yes"
    const activeXmlChars = [];
    for (const c of characters) {
      try {
        const xmlStatblock = c.querySelector('statblocks > statblock[format="xml"]');
        let xmlPath = xmlStatblock ? `${xmlStatblock.getAttribute("folder") || "statblocks_xml"}/${xmlStatblock.getAttribute("filename")}` : null;
        const fileInZip = xmlPath ? (zip.file(xmlPath) || findZipFile(zip, xmlPath)) : null;
        if (fileInZip) {
          const xmlStr = await fileInZip.async("string");
          const doc = new DOMParser().parseFromString(xmlStr, "text/xml");
          const rootC = doc.querySelector("character");
          if (rootC && (rootC.getAttribute("active") === "yes" || rootC.getAttribute("active") === "1")) {
            activeXmlChars.push(c);
          }
        }
      } catch (e) {
        console.warn("Error reading statblock XML active check:", e);
      }
    }
    const singleXmlActiveChar = activeXmlChars.length === 1 ? activeXmlChars[0] : null;

    // Decision Logic:
    // Priority 1: Filename matches AND (matches portfolio active or XML active) -> 100% certainty
    if (nameMatchedChar && (nameMatchedChar === portfolioActiveChar || nameMatchedChar === singleXmlActiveChar)) {
      return nameMatchedChar;
    }

    // Priority 2: Filename directly matches character
    if (nameMatchedChar) {
      return nameMatchedChar;
    }

    // Priority 3: portfolio.xml activehero matches statblock XML active="yes"
    if (portfolioActiveChar && portfolioActiveChar === singleXmlActiveChar) {
      return portfolioActiveChar;
    }

    // Priority 4: Single statblock XML has active="yes"
    if (singleXmlActiveChar) {
      return singleXmlActiveChar;
    }

    // Priority 5: Portfolio activehero match
    if (portfolioActiveChar) {
      return portfolioActiveChar;
    }

    return null;
  }

  // ==========================================================================
  // MAIN ENTRY POINT
  // ==========================================================================
  window.handlePorImport = async function(file) {
    try {
      if (typeof JSZip === 'undefined') {
        showToast("JSZip library not found. Cannot unzip POR file.", "error");
        return;
      }

      const zip = await JSZip.loadAsync(file);

      // Check for index.xml
      let indexFile = zip.file("index.xml");
      if (!indexFile) {
        // Fallback: search for any XML in statblocks_xml/
        let fallbackXml = null;
        zip.folder("statblocks_xml").forEach((rel, f) => {
          if (!fallbackXml && rel.endsWith(".xml")) fallbackXml = f;
        });

        if (!fallbackXml) {
          showToast("No character XML or index found in POR archive.", "error");
          return;
        }

        const xmlStr = await fallbackXml.async("string");
        const doc = new DOMParser().parseFromString(xmlStr, "text/xml");
        const leadNode = doc.querySelector("character");
        if (!leadNode) {
          showToast("Invalid character XML structure.", "error");
          return;
        }
        await executeImport(zip, doc, leadNode, file.name);
        return;
      }

      // Parse index.xml
      const indexStr = await indexFile.async("string");
      const indexDoc = new DOMParser().parseFromString(indexStr, "text/xml");

      const characters = Array.from(indexDoc.querySelectorAll("characters > character"));
      if (characters.length === 0) {
        showToast("No characters listed in portfolio manifest.", "error");
        return;
      }

      // Check for designated/intended lead character
      let selectedCharacterNode = null;
      if (characters.length === 1) {
        selectedCharacterNode = characters[0];
      } else {
        selectedCharacterNode = await findIntendedLeadCharacter(zip, characters, file.name);
      }

      if (selectedCharacterNode) {
        // Auto-load intended lead; pass other characters for transparent audit reporting
        const otherChars = characters.filter(c => c !== selectedCharacterNode);
        await loadAndImportCharacterFromIndex(zip, selectedCharacterNode, file.name, otherChars);
      } else {
        // Truly ambiguous (e.g. party portfolio with no designated active hero): prompt user
        promptPortfolioCharacterSelection(zip, characters, file.name);
      }

    } catch (err) {
      console.error("POR Import Exception:", err);
      showToast("Error processing POR file: " + err.message, "error");
    }
  };

  /**
   * Directly extracts the primary character data model from a .por portfolio file
   * without applying it to the active editor sheet or triggering editor UI updates.
   * Ideal for campaign NPC and encounter enemy ingestion.
   */
  window.loadCharacterDataFromPor = async function(file) {
    if (typeof JSZip === 'undefined') {
      throw new Error("JSZip library not found. Cannot unzip POR file.");
    }

    const zip = await JSZip.loadAsync(file);

    // Check for index.xml
    let indexFile = zip.file("index.xml");
    if (!indexFile) {
      let fallbackXml = null;
      zip.folder("statblocks_xml").forEach((rel, f) => {
        if (!fallbackXml && rel.endsWith(".xml")) fallbackXml = f;
      });

      if (!fallbackXml) {
        throw new Error("No character XML or index found in POR archive.");
      }

      const xmlStr = await fallbackXml.async("string");
      const doc = new DOMParser().parseFromString(xmlStr, "text/xml");
      const leadNode = doc.querySelector("character");
      if (!leadNode) {
        throw new Error("Invalid character XML structure.");
      }
      const { character, audit } = await parsePorCharacterData(zip, doc, leadNode, file.name);
      return { character, name: character.name, powerLevel: character.powerLevel, audit };
    }

    // Parse index.xml
    const indexStr = await indexFile.async("string");
    const indexDoc = new DOMParser().parseFromString(indexStr, "text/xml");

    const characters = Array.from(indexDoc.querySelectorAll("characters > character"));
    if (characters.length === 0) {
      throw new Error("No characters listed in portfolio manifest.");
    }

    let selectedCharacterNode = null;
    if (characters.length === 1) {
      selectedCharacterNode = characters[0];
    } else {
      selectedCharacterNode = await findIntendedLeadCharacter(zip, characters, file.name);
    }
    if (!selectedCharacterNode) {
      selectedCharacterNode = characters[0];
    }

    const xmlStatblock = selectedCharacterNode.querySelector('statblocks > statblock[format="xml"]');
    let xmlPath = null;
    if (xmlStatblock) {
      const folder = xmlStatblock.getAttribute("folder") || "statblocks_xml";
      const filename = xmlStatblock.getAttribute("filename");
      xmlPath = `${folder}/${filename}`;
    }

    let fileInZip = xmlPath ? (zip.file(xmlPath) || findZipFile(zip, xmlPath)) : null;
    if (!fileInZip) {
      fileInZip = findZipFile(zip, "statblocks_xml");
    }

    if (!fileInZip) {
      throw new Error("Could not locate XML statblock for " + selectedCharacterNode.getAttribute("name"));
    }

    const xmlStr = await fileInZip.async("string");
    const doc = new DOMParser().parseFromString(xmlStr, "text/xml");
    const leadNode = doc.querySelector("character");
    if (!leadNode) {
      throw new Error("Invalid character XML structure.");
    }

    const leadIdx = selectedCharacterNode.getAttribute("herolableadindex") || "1";
    const otherChars = characters.filter(c => c !== selectedCharacterNode);
    const { character, audit } = await parsePorCharacterData(zip, doc, leadNode, file.name, otherChars, leadIdx);
    return { character, name: character.name, powerLevel: character.powerLevel, audit };
  };

  // ==========================================================================
  // MULTI-CHARACTER SELECTION MODAL
  // ==========================================================================
  function promptPortfolioCharacterSelection(zip, charNodes, fileName) {
    let modal = document.getElementById("porCharacterPickerModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "modal-overlay";
      modal.id = "porCharacterPickerModal";
      modal.innerHTML = `
        <div class="info-popup-box" style="width: 90%; max-width: 620px; max-height: 85vh; display: flex; flex-direction: column;">
          <div class="info-popup-header" style="padding: 10px 16px;">
            <h3>📂 Select Hero from Portfolio</h3>
            <button class="info-popup-close" id="modalPorPickerClose">✕</button>
          </div>
          <div class="info-popup-body" style="padding: 16px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto;">
            <p style="margin: 0; font-size: var(--font-size-secondary); color: var(--text-secondary);">
              This Hero Lab portfolio contains multiple hero profiles. Select which character you would like to load into the Character Editor:
            </p>
            <div id="porCharacterList" style="display: flex; flex-direction: column; gap: 10px;"></div>
          </div>
          <div class="modal-footer" style="padding: 10px 16px; display: flex; justify-content: flex-end; border-top: 1px solid var(--border-color); background: var(--bg-card);">
            <button type="button" class="btn btn-secondary" id="btnCancelPorPicker">Cancel</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    // Always attach event handlers unconditionally
    const closeBtn = modal.querySelector("#modalPorPickerClose");
    const cancelBtn = modal.querySelector("#btnCancelPorPicker");
    const closePicker = () => modal.classList.remove("active");
    if (closeBtn) closeBtn.onclick = closePicker;
    if (cancelBtn) cancelBtn.onclick = closePicker;
    modal.onclick = (e) => {
      if (e.target === modal) closePicker();
    };

    const listEl = modal.querySelector("#porCharacterList");
    listEl.innerHTML = "";

    charNodes.forEach((node, idx) => {
      const name = node.getAttribute("name") || `Character #${idx + 1}`;
      const summary = node.getAttribute("summary") || "Hero";
      const player = (node.getAttribute("playername") || "").replace(/\s*\(\s*PL\s*#?\d*\s*\)\*?/gi, '').trim();
      const minionNodes = Array.from(node.querySelectorAll("minions > character"));
      const minionNames = minionNodes.map(m => m.getAttribute("name")).filter(Boolean);

      const card = document.createElement("div");
      card.style.cssText = `
        padding: 12px 14px;
        background: var(--bg-card);
        border: 1.5px solid var(--border-color);
        border-radius: 6px;
        cursor: pointer;
        transition: border-color 0.2s, transform 0.15s, background 0.2s;
        display: flex;
        flex-direction: column;
        gap: 4px;
      `;
      card.onmouseenter = () => {
        card.style.borderColor = "var(--accent-primary)";
        card.style.transform = "translateY(-1px)";
      };
      card.onmouseleave = () => {
        card.style.borderColor = "var(--border-color)";
        card.style.transform = "none";
      };

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="font-size: var(--font-size-labels); color: var(--accent-primary);">${name}</strong>
          <span class="audit-badge audit-info">${summary}</span>
        </div>
        ${player ? `<div style="font-size: var(--font-size-secondary); color: var(--text-secondary);">Player: ${player}</div>` : ""}
        ${minionNames.length > 0 ? `
          <div style="font-size: var(--font-size-secondary); color: var(--text-secondary); margin-top: 4px;">
            🔗 <em>Attached Assets (${minionNames.length}):</em> ${minionNames.join(", ")}
          </div>
        ` : ""}
      `;

      card.onclick = async () => {
        modal.classList.remove("active");
        const otherChars = charNodes.filter(c => c !== node);
        await loadAndImportCharacterFromIndex(zip, node, fileName, otherChars);
      };

      listEl.appendChild(card);
    });

    modal.classList.add("active");
  }

  async function loadAndImportCharacterFromIndex(zip, charIndexNode, fileName, otherCharacters = []) {
    const xmlStatblock = charIndexNode.querySelector('statblocks > statblock[format="xml"]');
    let xmlPath = null;
    if (xmlStatblock) {
      const folder = xmlStatblock.getAttribute("folder") || "statblocks_xml";
      const filename = xmlStatblock.getAttribute("filename");
      xmlPath = `${folder}/${filename}`;
    }

    let fileInZip = xmlPath ? (zip.file(xmlPath) || findZipFile(zip, xmlPath)) : null;
    if (!fileInZip) {
      fileInZip = findZipFile(zip, "statblocks_xml");
    }

    if (!fileInZip) {
      showToast("Could not locate XML statblock for " + charIndexNode.getAttribute("name"), "error");
      return;
    }

    const xmlStr = await fileInZip.async("string");
    const doc = new DOMParser().parseFromString(xmlStr, "text/xml");
    const leadNode = doc.querySelector("character");
    if (!leadNode) {
      showToast("Invalid character XML structure.", "error");
      return;
    }

    const leadIdx = charIndexNode.getAttribute("herolableadindex") || "1";
    await executeImport(zip, doc, leadNode, fileName, otherCharacters, leadIdx);
  }

  // ==========================================================================
  // CUSTOM USER-CREATED SKILL NAME EXTRACTOR FROM LEAD XML (e.g. Profession)
  // ==========================================================================
  function extractCustomSkillMapFromLead(leadXmlStr) {
    const map = {
      byCacheIndex: {},
      byThing: {},
      allCustomSkills: [],
      traitModSkillMap: []
    };
    if (!leadXmlStr) return map;
    const pickRegex = /<pick\b[^>]*\bthing="(sk[a-zA-Z0-9_]+)"[^>]*\bindex="(\d+)"[^>]*>([\s\S]*?)<\/pick>/g;
    let m;
    while ((m = pickRegex.exec(leadXmlStr)) !== null) {
      const thing = m[1];
      const idx = m[2];
      const inner = m[3];
      const userMatch = inner.match(/<field\b[^>]*id="skUserName"[^>]*text="([^"]+)"/i);
      if (userMatch && userMatch[1]) {
        const userText = userMatch[1].trim();
        let baseCategory = "Profession";
        if (thing.startsWith("skProf")) baseCategory = "Profession";
        else if (thing.startsWith("skCraf")) baseCategory = "Craft";
        else if (thing.startsWith("skKnow")) baseCategory = "Knowledge";
        else if (thing.startsWith("skPerf")) baseCategory = "Perform";

        const fullSkillName = `${baseCategory} (${userText})`;
        map.byCacheIndex[idx] = fullSkillName;
        map.byThing[thing] = fullSkillName;

        const baseMatch = inner.match(/<field\b[^>]*id="Base"[^>]*user="([\d.]+)"/i);
        const userRanks = baseMatch ? Math.round(parseFloat(baseMatch[1])) : null;

        map.allCustomSkills.push({
          baseCategory,
          userText,
          fullSkillName,
          index: idx,
          thing,
          userRanks
        });
      }
    }

    const traitModRegex = /<pick\b[^>]*\bthing="TraitMod"[^>]*>([\s\S]*?)<\/pick>/g;
    let tmM;
    while ((tmM = traitModRegex.exec(leadXmlStr)) !== null) {
      const inner = tmM[1];
      const rMatch = inner.match(/<field\b[^>]*id="modRanks"[^>]*user="([\d.]+)"/i);
      const cMatch = inner.match(/<field\b[^>]*id="modChosen"[^>]*cacheindex="(\d+)"/i);
      const ranks = rMatch ? parseFloat(rMatch[1]) : null;
      const cacheIdx = cMatch ? cMatch[1] : null;
      if (cacheIdx && map.byCacheIndex[cacheIdx]) {
        map.traitModSkillMap.push({
          cacheIndex: cacheIdx,
          fullSkillName: map.byCacheIndex[cacheIdx],
          ranks: ranks
        });
      }
    }

    return map;
  }

  // ==========================================================================
  // RECURSIVE CHARACTER & XML INGESTION
  // ==========================================================================
  async function parsePorCharacterData(zip, doc, rootCharNode, fileName, otherCharacters = [], leadIndex = "1") {
    const resNode = getDirectChild(rootCharNode, "resources");
    const totalPpAttr = resNode?.getAttribute("totalpp");
    let totalAllowed = totalPpAttr ? parseInt(totalPpAttr) : null;
    if (!totalAllowed || isNaN(totalAllowed)) {
      const ppVal = parseInt(getDirectChild(rootCharNode, "powerpoints")?.getAttribute("value") || 0);
      const plVal = parseInt(getDirectChild(rootCharNode, "powerlevel")?.getAttribute("value") || 10);
      totalAllowed = ppVal > 0 ? ppVal : (plVal * 15);
    }

    const rawPlayerName = rootCharNode.getAttribute("playername") || "";
    const cleanPlayerName = rawPlayerName.replace(/\s*\(\s*PL\s*#?\d*\s*\)\*?/gi, '').trim();

    const audit = {
      fileName: fileName,
      heroName: rootCharNode.getAttribute("name") || "Imported Hero",
      playerName: cleanPlayerName,
      powerLevel: parseInt(getDirectChild(rootCharNode, "powerlevel")?.getAttribute("value") || 10),
      heroLabTotalPP: totalAllowed,
      heroLabSpent: {},
      reconciledSpent: {},
      refunds: [],
      warnings: [],
      conversions: [],
      companions: [],
      installations: [],
      libraryPlans: [],
      preservedNotes: [],
      heroPointsImported: null,
      conditionsImported: null,
      unconvertibleTraits: [],
      unmappedDataPoints: [],
      heroLabValidationAlerts: [],
      complianceAlerts: [],
      costingComparison: [],
      otherCharactersInPortfolio: (otherCharacters || []).map(c => c.getAttribute("name")).filter(Boolean)
    };

    // Ingest Hero Lab native validation report
    const valNode = getDirectChild(rootCharNode, "validation");
    const valReportNode = valNode ? getDirectChild(valNode, "report") : null;
    const rawValReport = valReportNode?.textContent?.trim() || "";
    if (rawValReport) {
      audit.heroLabValidationAlerts = rawValReport.split(";").map(s => s.trim()).filter(Boolean);
    }

    // Parse Hero Lab declared resource totals strictly from root resources
    if (resNode) {
      const rNodes = getDirectChildren(resNode, "resource");
      rNodes.forEach(r => {
        const rName = r.getAttribute("name");
        const spent = parseFloat(r.getAttribute("spent") || 0);
        audit.heroLabSpent[rName] = spent;
      });
    }

    // Build index.xml characterindex -> name map for companion name resolution
    const minionIndexNameMap = {};
    if (zip) {
      try {
        const idxFile = zip.file("index.xml") || findZipFile(zip, "index.xml");
        if (idxFile) {
          const idxStr = await idxFile.async("string");
          if (idxStr) {
            const idxDoc = new DOMParser().parseFromString(idxStr, "text/xml");
            const allIndexChars = Array.from(idxDoc.querySelectorAll("character"));
            allIndexChars.forEach(cNode => {
              const cIdx = cNode.getAttribute("characterindex");
              const cName = cNode.getAttribute("name");
              if (cIdx && cName && cName.trim() && cName.toLowerCase() !== "minion" && cName.toLowerCase() !== "asset") {
                minionIndexNameMap[cIdx] = cName.trim();
              }
            });
          }
        }
      } catch (idxErr) {
        console.warn("Could not parse index.xml for minion names:", idxErr);
      }
    }

    // Ingest lead XML for custom user-created skills (e.g. Profession, Craft) and library
    let leadXmlStr = "";
    if (zip) {
      try {
        let leadXmlFile = zip.file(`herolab/lead${leadIndex}.xml`) || findZipFile(zip, `herolab/lead${leadIndex}.xml`);
        if (!leadXmlFile) {
          leadXmlFile = zip.file("herolab/lead1.xml") || findZipFile(zip, "herolab/lead1.xml");
        }
        if (leadXmlFile) {
          leadXmlStr = await leadXmlFile.async("string");
        }
      } catch (leadErr) {
        console.warn("Could not load lead XML for custom skills:", leadErr);
      }
    }
    const customSkillMap = extractCustomSkillMapFromLead(leadXmlStr);

    // Parse primary character
    const primaryData = parseCharacterNode(rootCharNode, audit, true, minionIndexNameMap, customSkillMap);

    // Recursively collect companion character nodes without DOM bleeding
    function collectCompanionsRecursively(parentCharNode) {
      const list = [];
      const minionsNode = getDirectChild(parentCharNode, "minions");
      if (!minionsNode) return list;
      const childChars = getDirectChildren(minionsNode, "character");
      childChars.forEach(mNode => {
        list.push(mNode);
        list.push(...collectCompanionsRecursively(mNode));
      });
      return list;
    }

    const companionNodes = collectCompanionsRecursively(rootCharNode);
    companionNodes.forEach(mNode => {
      const nature = mNode.getAttribute("nature") || "";
      const type = mNode.getAttribute("type") || "";
      let mName = mNode.getAttribute("name") ||
                  mNode.getAttribute("heroname") ||
                  mNode.getAttribute("charname") ||
                  getDirectChild(mNode, "personal")?.getAttribute("charname") ||
                  getDirectChild(mNode, "personal")?.getAttribute("name") ||
                  "";
      const mIdxAttr = mNode.getAttribute("characterindex");
      if ((!mName || mName.toLowerCase() === "minion" || mName.toLowerCase() === "asset") && mIdxAttr && minionIndexNameMap[mIdxAttr]) {
        mName = minionIndexNameMap[mIdxAttr];
      }
      if (!mName) mName = "Asset";

      if (nature === "headquarters" || type.startsWith("HQ:")) {
        // Convert to Headquarters / Installation
        const hqObj = parseHeadquartersNode(mNode, audit);
        primaryData.installations.push(hqObj);
        audit.installations.push(hqObj);
      } else {
        // Convert to Minion, Mecha, Duplicate, Summon, or Metamorph Form Companion
        const compChar = parseCharacterNode(mNode, audit, false, minionIndexNameMap, customSkillMap);
        let compType = "minion";
        const rawTypeLower = (type || "").toLowerCase();
        const rawNatureLower = (nature || "").toLowerCase();
        const mNameLower = (mName || "").toLowerCase();

        if (rawNatureLower === "mecha" || rawTypeLower === "mecha" || compChar.isMecha) {
          compType = "mecha";
        } else if (mNameLower.includes("metamorph") || rawTypeLower.includes("metamorph")) {
          compType = "metamorph";
        } else if (rawTypeLower.includes("sidekick") || mNameLower.includes("sidekick")) {
          compType = "sidekick";
        } else if (rawTypeLower.includes("duplicate") || mNameLower.includes("duplicate") || mNameLower.includes("clone")) {
          compType = "duplicate";
        } else if (rawTypeLower.includes("summon") || mNameLower.includes("summon")) {
          compType = "summon";
        } else {
          // Check if parent hero has a matching Summon or Duplication power
          const summonPower = primaryData.powers.find(p => {
            const pName = (p.name || "").toLowerCase();
            return pName.includes("summon") || (p.effects && p.effects.some(e => e.effectName === "Summon"));
          });
          const dupPower = primaryData.powers.find(p => {
            const pName = (p.name || "").toLowerCase();
            return pName.includes("duplication") || pName.includes("clone") || (p.effects && p.effects.some(e => e.effectName === "Duplication"));
          });
          const hasMinionsFeat = primaryData.feats && (primaryData.feats["Minions"] || primaryData.feats["Minion"]);

          if (summonPower && (!hasMinionsFeat || mNameLower.includes(summonPower.name.toLowerCase().split("(")[0].trim().toLowerCase()))) {
            compType = "summon";
          } else if (dupPower && (!hasMinionsFeat || mNameLower.includes("dup") || mNameLower.includes("clone"))) {
            compType = "duplicate";
          }
        }

        const resolvedName = (mName && mName !== "Minion" && mName !== "Asset")
          ? mName
          : (compChar.name && compChar.name !== "Minion" && compChar.name !== "Asset" ? compChar.name : `${primaryData.name}'s ${capitalizeFirstLetter(compType)}`);

        const compEntry = {
          id: "comp_" + Math.random().toString(36).substr(2, 9),
          type: compType,
          name: resolvedName,
          powerLevel: compChar.powerLevel || primaryData.powerLevel,
          totalPointsAllowed: compChar.totalPointsAllowed || (compChar.powerLevel * 15),
          characterData: compChar
        };
        primaryData.companions.push(compEntry);
        audit.companions.push(compEntry);
      }
    });

    // Ingest Hero Lab Library Table into Blueprints / Plans
    try {
      if (leadXmlStr) {
        ingestHeroLabLibrary(leadXmlStr, primaryData, audit, customSkillMap);
        ingestHeroLabInPlayState(leadXmlStr, primaryData, audit);
      }
    } catch (libErr) {
      console.warn("Failed to parse Hero Lab library table:", libErr);
    }

    // Point Reconciliation Engine: Validate MM2CE model cost against declared Hero Lab costs
    reconcileCharacterPoints(primaryData, audit);

    return { character: primaryData, audit };
  }

  async function executeImport(zip, doc, rootCharNode, fileName, otherCharacters = [], leadIndex = "1") {
    const { character: primaryData, audit } = await parsePorCharacterData(zip, doc, rootCharNode, fileName, otherCharacters, leadIndex);

    // Apply primary hero to active sheet
    if (window.primaryHero) {
      window.primaryHero = null;
      window.activeCompanionId = null;
    }

    if (window.applyLoadedCharacter) {
      window.applyLoadedCharacter({
        format: "MM2E_CHARACTER",
        version: "1.0",
        character: primaryData
      });
    }

    if (typeof FileManager !== 'undefined') {
      FileManager.currentFileHandle = null;
      FileManager.currentFileName = (fileName || "").slice(0, 45);
      FileManager.updateFileStatusUI();
    }

    if (typeof refreshAllUI === 'function') {
      refreshAllUI();
    } else if (typeof refreshUI === 'function') {
      refreshUI();
    }
    if (typeof FileManager !== 'undefined' && FileManager.clearDirty) {
      FileManager.clearDirty();
    }

    // Store audit report globally
    window.lastImportAuditReport = audit;

    // Reveal toolbar button if present
    const btnAudit = document.getElementById("btnOpenImportAudit");
    if (btnAudit) {
      btnAudit.style.display = "inline-flex";
      btnAudit.onclick = () => showImportAuditModal(audit);
    }

    // Automatically display the Audit Report Modal
    showImportAuditModal(audit);

    showToast(`Successfully imported ${primaryData.name} from Hero Lab with UP reconciliation!`, "success");
  }

  // ==========================================================================
  // GRANULAR UNMAPPED / ADAPTED DATA POINT RECORDER
  // ==========================================================================
  function recordUnmappedDataPoint(audit, category, parent, label, value, disposition, reason) {
    if (!audit) return;
    if (!audit.unmappedDataPoints) audit.unmappedDataPoints = [];
    audit.unmappedDataPoints.push({
      category: category || "General",
      parent: parent || "Character",
      label: label || "",
      value: value || "",
      disposition: disposition || "Noted",
      reason: reason || ""
    });
  }

  // ==========================================================================
  // PARSE SINGLE CHARACTER XML NODE (Primary Hero, Minion, or Form)
  // ==========================================================================
  function parseCharacterNode(charNode, audit, isPrimary = true, minionIndexNameMap = {}, customSkillMap = null) {
    const rawNature = charNode.getAttribute("nature") || "";
    const rawType = charNode.getAttribute("type") || "";
    const isMecha = rawNature === "mecha" || rawType.toLowerCase() === "mecha";

    const resNode = getDirectChild(charNode, "resources");
    const totalPpAttr = resNode?.getAttribute("totalpp");
    let totalAllowed = totalPpAttr ? parseInt(totalPpAttr) : null;
    if (!totalAllowed || isNaN(totalAllowed)) {
      const ppVal = parseInt(getDirectChild(charNode, "powerpoints")?.getAttribute("value") || 0);
      const plVal = parseInt(getDirectChild(charNode, "powerlevel")?.getAttribute("value") || 10);
      totalAllowed = ppVal > 0 ? ppVal : (plVal * 15);
    }

    let resolvedCharName = charNode.getAttribute("name") ||
                           charNode.getAttribute("heroname") ||
                           charNode.getAttribute("charname") ||
                           getDirectChild(charNode, "personal")?.getAttribute("charname") ||
                           getDirectChild(charNode, "personal")?.getAttribute("name") ||
                           "";
    const charIdx = charNode.getAttribute("characterindex");
    if ((!resolvedCharName || resolvedCharName.toLowerCase() === "minion" || resolvedCharName.toLowerCase() === "asset") && charIdx && minionIndexNameMap && minionIndexNameMap[charIdx]) {
      resolvedCharName = minionIndexNameMap[charIdx];
    }
    if (!resolvedCharName) {
      resolvedCharName = isPrimary ? "Imported Hero" : "Minion";
    }

    const charObj = {
      name: resolvedCharName,
      playerName: (charNode.getAttribute("playername") || "").replace(/\s*\(\s*PL\s*#?\d*\s*\)\*?/gi, '').trim(),
      powerLevel: parseInt(getDirectChild(charNode, "powerlevel")?.getAttribute("value") || 10),
      totalPointsAllowed: totalAllowed,
      sizeCategory: getDirectChild(charNode, "size")?.getAttribute("name") || "Medium",
      massRank: 3,
      isMecha: isMecha,
      hasAI: false,
      abilities: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 },
      absentAbilities: { STR: false, CON: false, DEX: false, INT: false, WIS: false, CHA: false },
      combat: { ATK: 0, DEF: 0 },
      purchasedResistances: { Toughness: 0, Fortitude: 0, Reflex: 0, Will: 0 },
      skills: {},
      skillDetails: {},
      feats: {},
      featDetails: {},
      powers: [],
      blueprints: [],
      gear: [],
      vehicles: [],
      installations: [],
      companions: [],
      identity: "",
      motivation: "",
      complications: "",
      history: "",
      heroPoints: 1,
      trackerState: { conditions: {}, customPoints: [], fadeStates: {} }
    };

    // 1. Personal & Background Information
    const personalNode = getDirectChild(charNode, "personal");
    if (personalNode) {
      const descNode = getDirectChild(personalNode, "description");
      if (descNode && descNode.textContent.trim()) {
        charObj.history = descNode.textContent.trim();
      }
    }
    const compNode = getDirectChild(charNode, "complications");
    if (compNode && compNode.textContent.trim()) {
      charObj.complications = compNode.textContent.trim();
    }

    // 2. Abilities (Converting Hero Lab score/cost to MM2CE ranks above 10)
    const attrContainer = getDirectChild(charNode, "attributes");
    if (attrContainer) {
      const attrNodes = getDirectChildren(attrContainer, "attribute");
      attrNodes.forEach(attr => {
        const aName = attr.getAttribute("name");
        const valNode = getDirectChild(attr, "attrvalue");
        const costNode = getDirectChild(attr, "cost");
        const valText = valNode?.getAttribute("text") || "";
        const baseVal = parseInt(valNode?.getAttribute("base") || 10);
        const costVal = costNode ? parseFloat(costNode.getAttribute("value")) : NaN;

        // Detect absent abilities for constructs / mecha
        const isAbsent = valText === "-" || (valNode?.getAttribute("base") === "0" && valText === "-");

        let key = null;
        if (aName === "Strength") key = "STR";
        else if (aName === "Dexterity") key = "DEX";
        else if (aName === "Constitution") key = "CON";
        else if (aName === "Intelligence") key = "INT";
        else if (aName === "Wisdom") key = "WIS";
        else if (aName === "Charisma") key = "CHA";

        if (key) {
          if (isAbsent || (isMecha && (key === "CON" || (!charObj.hasAI && (key === "INT" || key === "WIS" || key === "CHA"))))) {
            charObj.absentAbilities[key] = true;
            charObj.abilities[key] = 0;
          } else {
            let score = 10;
            if (!isNaN(baseVal)) {
              score = baseVal;
            } else if (!isNaN(costVal)) {
              score = 10 + costVal;
            }
            charObj.abilities[key] = score;

            // Calculate modifier rank for audit tracking and validation
            const rank = Math.floor((baseVal - 10) / 2);
          }
        }
      });
    }

    // 3. Combat & Purchased Resistances
    const attacksNode = getDirectChild(charNode, "attacks");
    const defNode = getDirectChild(charNode, "defense");
    if (attacksNode) {
      const atkCost = parseInt(getDirectChild(attacksNode, "cost")?.getAttribute("value") || 0);
      charObj.combat.ATK = Math.floor(atkCost / 2);
    }
    if (defNode) {
      const defCost = parseInt(getDirectChild(defNode, "cost")?.getAttribute("value") || 0);
      charObj.combat.DEF = Math.floor(defCost / 2);
    }

    const savesContainer = getDirectChild(charNode, "saves");
    if (savesContainer) {
      const saveNodes = getDirectChildren(savesContainer, "save");
      saveNodes.forEach(s => {
        const sName = s.getAttribute("name");
        const cost = parseInt(getDirectChild(s, "cost")?.getAttribute("value") || 0);
        if (sName === "Toughness") charObj.purchasedResistances.Toughness = cost;
        else if (sName === "Fortitude") charObj.purchasedResistances.Fortitude = cost;
        else if (sName === "Reflex") charObj.purchasedResistances.Reflex = cost;
        else if (sName === "Will") charObj.purchasedResistances.Will = cost;
      });
    }

    // Character Drawbacks Container (<drawbacks>)
    const drawbacksContainer = getDirectChild(charNode, "drawbacks");
    if (drawbacksContainer) {
      const drawbackNodes = getDirectChildren(drawbacksContainer, "drawback");
      drawbackNodes.forEach(d => {
        const dName = d.getAttribute("name");
        const dCost = parseInt(getDirectChild(d, "cost")?.getAttribute("value") || 0);
        const dDesc = getDirectChild(d, "description")?.textContent.trim() || "";
        const note = `Drawback: ${dName} (${dCost} PP)${dDesc ? ` - ${dDesc}` : ""}`;
        charObj.complications = charObj.complications ? `${charObj.complications}\n${note}` : note;
        audit.refunds.push(`Character Drawback '${dName}' (${dCost} PP): Recorded in Complications & Notes.`);
        recordUnmappedDataPoint(audit, "Character Drawback", charObj.name, dName, `${dCost} PP`, "Preserved in Complications", dDesc || "Character-level drawback preserved in Complications.");
      });
    }

    // 4. Skills (Purchased Ranks from 'user' attribute)
    const skillsContainer = getDirectChild(charNode, "skills");
    if (skillsContainer) {
      const skillNodes = getDirectChildren(skillsContainer, "skill");
      skillNodes.forEach(sk => {
        const rawSkName = sk.getAttribute("name");
        const userStr = sk.getAttribute("user") || "+0";
        const userRanks = parseInt(userStr.replace("+", "")) || 0;

        if (userRanks > 0) {
          const lowerName = rawSkName.toLowerCase();
          let canonicalName = SKILL_NAME_NORMALIZATION_MAP[lowerName] || rawSkName;

          // Match specialized user-created skill name (e.g. Profession (Archeologist))
          if (customSkillMap && customSkillMap.allCustomSkills && customSkillMap.allCustomSkills.length > 0) {
            const matchingCustom = customSkillMap.allCustomSkills.filter(cs =>
              cs.baseCategory.toLowerCase() === lowerName ||
              cs.baseCategory.toLowerCase() === canonicalName.toLowerCase()
            );
            if (matchingCustom.length === 1) {
              canonicalName = matchingCustom[0].fullSkillName;
            } else if (matchingCustom.length > 1) {
              const rankMatch = matchingCustom.find(cs => cs.userRanks === userRanks && !charObj.skills[cs.fullSkillName]);
              if (rankMatch) {
                canonicalName = rankMatch.fullSkillName;
              } else {
                const unassigned = matchingCustom.find(cs => !charObj.skills[cs.fullSkillName]);
                if (unassigned) canonicalName = unassigned.fullSkillName;
              }
            }
          }

          // Remap legacy / non-canonical skills
          if (lowerName === "gamble") {
            canonicalName = "Profession (Gambler)";
            audit.conversions.push(`Mapped legacy skill 'Gamble' (${userRanks} ranks) to '${canonicalName}'.`);
            recordUnmappedDataPoint(audit, "Skill Remapped", charObj.name, rawSkName, `${userRanks} ranks`, "Remapped to Profession (Gambler)", "Legacy Core 2E Gamble mapped to canonical Profession skill.");
          } else if (lowerName === "navigate") {
            canonicalName = "Survival";
            charObj.skillDetails["Survival"] = "Navigation specialization";
            audit.conversions.push(`Mapped legacy skill 'Navigate' (${userRanks} ranks) to 'Survival (Navigation)'.`);
            recordUnmappedDataPoint(audit, "Skill Remapped", charObj.name, rawSkName, `${userRanks} ranks`, "Remapped to Survival (Navigation)", "Legacy Core 2E Navigate mapped to canonical Survival skill with specification.");
          }

          charObj.skills[canonicalName] = (charObj.skills[canonicalName] || 0) + userRanks;
        }
      });
    }

    // 5. Feats (Excluding feats chained from powers to prevent double-charging)
    const chainedFeatNames = new Set();
    function scanChainedFeatsRecursively(p) {
      const cfCont = getDirectChild(p, "chainedfeats");
      if (cfCont) {
        getDirectChildren(cfCont, "chainedfeat").forEach(cf => {
          const cfName = cf.getAttribute("name");
          if (cfName) chainedFeatNames.add(cfName.trim());
        });
      }
      const otherContainer = getDirectChild(p, "otherpowers");
      if (otherContainer) {
        getDirectChildren(otherContainer, "power").forEach(scanChainedFeatsRecursively);
      }
      const altContainer = getDirectChild(p, "alternatepowers");
      if (altContainer) {
        getDirectChildren(altContainer, "power").forEach(scanChainedFeatsRecursively);
      }
    }
    const powersContainer = getDirectChild(charNode, "powers");
    if (powersContainer) {
      getDirectChildren(powersContainer, "power").forEach(scanChainedFeatsRecursively);
    }

    const featsContainer = getDirectChild(charNode, "feats");
    if (featsContainer) {
      const featNodes = getDirectChildren(featsContainer, "feat");
      featNodes.forEach(f => {
        const rawFeatName = f.getAttribute("name");
        const ranksAttr = parseInt(f.getAttribute("ranks") || 1);
        const costValAttr = getDirectChild(f, "cost")?.getAttribute("value");
        const featCost = (costValAttr !== null && costValAttr !== undefined) ? parseInt(costValAttr, 10) : ranksAttr;
        const featDesc = getDirectChild(f, "description")?.textContent.trim() || "";
        const featCategory = (f.getAttribute("categorytext") || "").trim();

        // Skip feats granted by powers
        if (chainedFeatNames.has(rawFeatName.trim())) {
          return;
        }

        // Skip 0 PP combo / fighting style package headers (component feats are purchased individually)
        const catNodes = getDirectChildren(f, "featcategory");
        const isCombo = featCategory.toLowerCase().includes("combo") ||
                        catNodes.some(cn => cn.textContent.trim().toLowerCase() === "combo");
        if (featCost === 0 || isCombo) {
          audit.preservedNotes.push(`Fighting Style / Combo Feat '${rawFeatName}' (0 PP): Package header noted. Individual component feats are purchased and accounted for.`);
          recordUnmappedDataPoint(audit, "Combo Feat / Fighting Style", charObj.name, rawFeatName, "0 PP", "Package Header Noted", `Fighting style package header (${featDesc || rawFeatName}). Component feats are individually accounted for without double-charging.`);
          return;
        }

        const parsedFeat = deconstructFeatName(rawFeatName, ranksAttr);

        // Check if feat is an obsolete feat designated for refund
        if (OBSOLETE_FEATS_REFUND_MAP[parsedFeat.name.toLowerCase()]) {
          const obs = OBSOLETE_FEATS_REFUND_MAP[parsedFeat.name.toLowerCase()];
          const reason = obs.reason || "Obsolete feat refunded under canonical 2E rules.";
          audit.unconvertibleTraits.push({
            name: rawFeatName,
            type: "Feat",
            cost: featCost,
            reason: reason,
            notes: featDesc
          });
          audit.refunds.push(`Unconvertible Feat '${rawFeatName}' (${featCost} PP): ${reason} Cost refunded in full to your available points pool.`);
          if (featDesc) {
            audit.preservedNotes.push(`Preserved unconvertible feat notes for '${rawFeatName}': ${featDesc}`);
          }
          recordUnmappedDataPoint(audit, "Unconvertible Feat", charObj.name, rawFeatName, `${featCost} PP`, "Refunded in Full", reason);
          return;
        }

        charObj.feats[parsedFeat.name] = parsedFeat.ranks;
        if (parsedFeat.spec) {
          charObj.featDetails[parsedFeat.name] = parsedFeat.spec;
          recordUnmappedDataPoint(audit, "Feat Specification", charObj.name, parsedFeat.name, parsedFeat.spec, "Preserved in Feat Details", "Sub-option or specialty mapped to feat specification.");
        }
      });
    }

    // 6. Gear / Equipment
    const gearContainer = getDirectChild(charNode, "gear");
    if (gearContainer) {
      const gearNodes = getDirectChildren(gearContainer, "item");
      gearNodes.forEach(g => {
        const gName = g.getAttribute("name");
        const gCost = parseInt(getDirectChild(g, "cost")?.getAttribute("value") || 0);
        const gDesc = getDirectChild(g, "description")?.textContent || "";
        charObj.gear.push({
          name: gName,
          cost: gCost,
          notes: gDesc.trim()
        });
      });
    }

    // 7. Powers Engine & UP Canonical Translation
    if (powersContainer) {
      const rootPowers = getDirectChildren(powersContainer, "power");
      rootPowers.forEach((pNode, pIdx) => {
        const container = parsePowerContainer(pNode, pIdx, audit, customSkillMap);
        if (container && container.effects && container.effects.length > 0) {
          charObj.powers.push(container);
        }
      });
    }

    return charObj;
  }

  // ==========================================================================
  // FEAT NAME DECONSTRUCTOR
  // ==========================================================================
  function deconstructFeatName(rawName, fallbackRanks) {
    let name = rawName.trim();
    let ranks = fallbackRanks || 1;
    let spec = "";

    // Pattern: e.g. "Benefit 9 (Wealth (Wealthy 17))" or "Attack Focus (ranged) 4"
    const match = rawName.match(/^([^(]+?)(?:\s+(\d+))?(?:\s*\((.*?)\))?$/);
    if (match) {
      name = match[1].trim();
      if (match[2]) ranks = parseInt(match[2]);
      if (match[3]) spec = match[3].trim();
    }

    // Capitalization fix for common sub-specs
    if (spec.toLowerCase() === "melee") spec = "Melee";
    if (spec.toLowerCase() === "ranged") spec = "Ranged";

    return { name, ranks, spec };
  }

  // ==========================================================================
  // POWER CONTAINER & CANONICAL UP MAPPING
  // ==========================================================================
  function parsePowerContainer(powerNode, index, audit, customSkillMap = null) {
    const rawName = powerNode.getAttribute("name");
    const summary = powerNode.getAttribute("summary") || "";
    const declaredCost = parseInt(getDirectChild(powerNode, "cost")?.getAttribute("value") || 0);

    const deconstructed = deconstructHeroLabPowerName(rawName);
    const containerName = deconstructed.customName || deconstructed.hlBaseName;

    // Check if this is a Device or Container
    const isDevice = deconstructed.hlBaseName.toLowerCase() === "device" || summary.includes("Hard to lose") || summary.includes("Easy to lose");
    const otherContainer = getDirectChild(powerNode, "otherpowers");
    const otherPowers = otherContainer ? getDirectChildren(otherContainer, "power") : [];
    const isGeneralContainer = !isDevice && (
      otherPowers.length > 0 ||
      deconstructed.hlBaseName.toLowerCase().startsWith("container") ||
      deconstructed.hlBaseName.toLowerCase().includes("alternate form")
    );
    const altContainer = getDirectChild(powerNode, "alternatepowers");
    const altNodes = altContainer ? getDirectChildren(altContainer, "power") : [];
    const isArray = altNodes.length > 0;

    let containerType = "normal";
    if (isDevice) {
      containerType = summary.includes("Easy to lose") ? "device_easy" : "device_hard";
    } else if (isGeneralContainer) {
      containerType = "container";
    } else if (isArray) {
      containerType = "array";
    }

    const container = {
      id: "cont_" + Math.random().toString(36).substr(2, 9) + "_" + index,
      name: containerName,
      containerType: containerType,
      collapsed: false,
      active: powerNode.getAttribute("active") !== "no",
      declaredCost: declaredCost,
      effects: []
    };

    if (isDevice || isGeneralContainer) {
      const isEasyToLose = containerType === "device_easy" || summary.includes("Easy to lose");
      const isPassive = !deconstructed.hlBaseName.toLowerCase().includes("active") && (
        deconstructed.hlBaseName.toLowerCase().includes("passive") ||
        (summary.toLowerCase().includes("continuous") && !summary.toLowerCase().includes("duration (continuous)"))
      );
      
      let containerBaseCost = 5;
      let containerAction = "free";
      let containerDuration = "sustained";
      let containerDescriptors = "Container";

      if (isDevice) {
        containerBaseCost = isEasyToLose ? 3 : 4;
        containerAction = "none";
        containerDuration = "continuous";
        containerDescriptors = "Device";
      } else if (isPassive) {
        containerBaseCost = 4;
        containerAction = "none";
        containerDuration = "continuous";
      } else if (deconstructed.hlBaseName.toLowerCase().includes("alternate form")) {
        containerDescriptors = "Alternate Form";
      }

      const containerRank = Math.round(deconstructed.ranks || parseFloat(powerNode.getAttribute("ranks") || 1));

      // Parse modifiers directly on the container (power feats, drawbacks, extras)
      const containerModifiers = parseModifiersFromNode(powerNode, audit, containerName);

      if (isDevice) {
        const restrictedMatch = summary.match(/Restricted(?: use)?(?:\s*\((.*?)\))?/i);
        if (restrictedMatch && !containerModifiers.some(m => m.name.toLowerCase().startsWith("restricted"))) {
          containerModifiers.push({
            name: "Restricted",
            category: "feat",
            cost: 1,
            costType: "flat",
            ranks: 1,
            details: restrictedMatch[1] || ""
          });
        }
      }

      if (otherPowers.length > 0) {
        container.deviceRank = containerRank;
        container.deviceModifiers = containerModifiers;
        otherPowers.forEach((childPower, cIdx) => {
          const childEff = parseSinglePowerEffect(childPower, cIdx, audit, "primary", customSkillMap);
          if (childEff) {
            container.effects.push(childEff);
          }
          const childAltContainer = getDirectChild(childPower, "alternatepowers");
          const childAltNodes = childAltContainer ? getDirectChildren(childAltContainer, "power") : [];
          childAltNodes.forEach((altNode, aIdx) => {
            const featsContainer = getDirectChild(altNode, "powerfeats");
            const altFeats = featsContainer ? getDirectChildren(featsContainer, "powerfeat") : [];
            const isDynamic = altFeats.some(pf => pf.getAttribute("name") === "Dynamic");
            const altEff = parseSinglePowerEffect(altNode, aIdx + 1, audit, isDynamic ? "dynamic" : "alternate", customSkillMap);
            if (altEff) {
              container.effects.push(altEff);
            }
          });
        });
      } else {
        const notePrefix = isDevice ? `Device (${isEasyToLose ? "Easy to lose" : "Hard to lose"}, Rank ${containerRank})` : `${deconstructed.hlBaseName} (Rank ${containerRank})`;
        const containerEffect = {
          id: "eff_" + Math.random().toString(36).substr(2, 9) + "_" + index,
          name: rawName,
          effectName: "Container",
          rank: containerRank,
          baseCost: containerBaseCost,
          action: containerAction,
          range: "personal",
          duration: containerDuration,
          savingThrow: "none",
          association: "primary",
          linkedTo: null,
          descriptors: containerDescriptors,
          notes: `${notePrefix}.`,
          modifiers: containerModifiers,
          subPowers: [],
          active: true
        };
        container.effects.push(containerEffect);
      }

      // Also parse alternate powers if attached
      altNodes.forEach((altNode, aIdx) => {
        const featsContainer = getDirectChild(altNode, "powerfeats");
        const altFeats = featsContainer ? getDirectChildren(featsContainer, "powerfeat") : [];
        const isDynamic = altFeats.some(pf => pf.getAttribute("name") === "Dynamic");
        const altEff = parseSinglePowerEffect(altNode, aIdx + 1, audit, isDynamic ? "dynamic" : "alternate", customSkillMap);
        if (altEff) {
          container.effects.push(altEff);
        }
      });
    } else {
      // Determine default power for Array if specified in elements or summary
      let defaultPowerName = "";
      if (isArray) {
        const elementsContainer = getDirectChild(powerNode, "elements");
        if (elementsContainer) {
          const elemNodes = getDirectChildren(elementsContainer, "element");
          const defElem = elemNodes.find(el => el.getAttribute("name") === "Default Power");
          if (defElem) defaultPowerName = defElem.getAttribute("info") || "";
        }
        if (!defaultPowerName && summary) {
          const defMatch = summary.match(/Default Power:\s*([^;,]+)/i);
          if (defMatch) defaultPowerName = defMatch[1].trim();
        }
        if (!defaultPowerName && summary) {
          const optMatch = summary.match(/Other Power\s*\(([^)]+)\)/i);
          if (optMatch) defaultPowerName = optMatch[1].trim();
        }
      }

      // Primary effect
      const primaryEff = parseSinglePowerEffect(powerNode, 0, audit, "primary", customSkillMap);

      if (primaryEff) {
        // For non-device arrays with declared cost (like Enhanced Trait 13.25):
        // Calibrate primary effect rank so that primaryRank + altNodes.length equals declaredCost
        if (isArray && declaredCost > 0 && altNodes.length > 0) {
          const targetPrimaryCost = declaredCost - altNodes.length;
          if (targetPrimaryCost > 0 && primaryEff.baseCost === 1 && (!primaryEff.modifiers || primaryEff.modifiers.length === 0)) {
            primaryEff.rank = targetPrimaryCost;
          }
        }
        container.effects.push(primaryEff);
      }

      // Alternate powers (Array slots)
      altNodes.forEach((altNode, aIdx) => {
        const featsContainer = getDirectChild(altNode, "powerfeats");
        const altFeats = featsContainer ? getDirectChildren(featsContainer, "powerfeat") : [];
        const isDynamic = altFeats.some(pf => pf.getAttribute("name") === "Dynamic");
        const altEff = parseSinglePowerEffect(altNode, aIdx + 1, audit, isDynamic ? "dynamic" : "alternate", customSkillMap);
        if (altEff) {
          container.effects.push(altEff);
        }
      });

      if (isArray) {
        let matchedDefault = false;
        const hasExplicitActiveAlt = container.effects.slice(1).some(e => e.association === "alternate" && e.active);
        if (defaultPowerName) {
          const matchTarget = defaultPowerName.toLowerCase();
          for (let i = 1; i < container.effects.length; i++) {
            const eff = container.effects[i];
            const effName = (eff.name || "").toLowerCase();
            const effType = (eff.effectName || "").toLowerCase();
            if (effName === matchTarget || effType === matchTarget || effName.includes(matchTarget) || matchTarget.includes(effName)) {
              eff.isDefaultPower = true;
              if (!hasExplicitActiveAlt) {
                eff.active = (primaryEff ? primaryEff.active !== false : true);
              } else {
                eff.active = false;
              }
              matchedDefault = true;
              break;
            }
          }
        }
        // If primary effect is a dummy "Array" card and no alternate power was activated, activate the first alternate power if array is active
        if (!matchedDefault && !hasExplicitActiveAlt && primaryEff && primaryEff.effectName === "Array" && primaryEff.active !== false && container.effects.length > 1) {
          container.effects[1].active = true;
          container.effects[1].isDefaultPower = true;
        }
      }
    }

    if (container.effects.length === 0) {
      return null;
    }

    return container;
  }

  // ==========================================================================
  // HERO LAB LIBRARY TABLE INGESTION -> BLUEPRINTS / PLANS
  // ==========================================================================
  const HL_LIB_POWER_MAP = {
    pwBlast: "Blast",
    pwBoost: "Boost",
    pwBurrow: "Burrowing",
    pwComm: "Communication",
    pwCompre: "Comprehend",
    pwConceal: "Concealment",
    pwCreaObj: "Create Object",
    pwDarkCon: "Darkness Control",
    pwDensity: "Density",
    pwDevice: "Device",
    pwDimPock: "Dimensional Pocket",
    pwDupli: "Duplication",
    pwESP: "ESP",
    pwEmotCon: "Emotion Control",
    pwEnhTrait: "Enhanced Trait",
    pwFField: "Force Field",
    pwFlight: "Flight",
    pwGrowth: "Growth",
    pwHeal: "Healing",
    pwIllusn: "Illusion",
    pwImmov: "Immovable",
    pwImmune: "Immunity",
    pwInsubst: "Insubstantial",
    pwInvis: "Concealment",
    pwMagic: "Magic",
    pwMgBanish: "Nullify",
    pwMgSeal: "Nullify",
    pwMgShadCl: "Duplication",
    pwMindCon: "Mind Control",
    pwMindRea: "Mind Reading",
    pwMorph: "Morph",
    pwNemesis: "Nemesis",
    pwNullify: "Nullify",
    pwProtect: "Protection",
    pwQuick: "Quickness",
    pwShrink: "Shrinking",
    pwSnare: "Snare",
    pwStrike: "Strike",
    pwStun: "Stun",
    pwSummon: "Summon",
    pwSuperSe: "Super-Senses",
    pwSuperSt: "Super-Strength",
    pwTeleprt: "Teleport",
    pwTpathy: "Telepathy",
    pwUPArray: "Array",
    pwUPClvoya: "Clairvoyance",
    pwUPContAc: "Container",
    pwUPDamage: "Damage",
    pwUPEarCon: "Earth Control",
    pwUPExorci: "Exorcism",
    pwUPFeatur: "Features",
    pwUPForceC: "Force Constructs",
    pwUPGadget: "Device",
    pwUPHypnos: "Hypnosis",
    pwUPImFort: "Immunity",
    pwUPImmort: "Immortality",
    pwUPMoveOb: "Move Object",
    pwUPRefFld: "Reflective Field",
    pwUPShpMat: "Shape Matter",
    pwUPSleep: "Sleep",
    pwUPSpiCon: "Mind Control",
    pwUPTelelo: "Telelocation",
    pwUPWard: "Ward"
  };

  const HL_LIB_FEAT_MAP = {
    pfAfOProg: "Progression (Affects Others)",
    pfAffectIn: "Affects Insubstantial",
    pfCrOProg: "Progression (Objects)",
    pfCustom: "Custom Feat",
    pfDimen: "Dimensional",
    pfDupMLnk: "Mental Link",
    pfDupSac: "Sacrifice",
    pfHeaProg: "Progression (Healing)",
    pfHealPers: "Persistent",
    pfHealRegr: "Regrowth",
    pfIllProg: "Progression (Area)",
    pfImpRng: "Improved Range",
    pfIndir: "Indirect",
    pfInnate: "Innate",
    pfMgDevSum: "Device Summon",
    pfMgDimPro: "Progression (Dimensional)",
    pfMgSeaTmS: "Time Sense",
    pfMorMeta: "Metamorph",
    pfPrecise: "Precise",
    pfProgArea: "Progression (Area)",
    pfProgRng: "Progression (Range)",
    pfProgress: "Progression",
    pfReverse: "Reversible",
    pfSSGround: "Grounding",
    pfSedation: "Sedation",
    pfSelAura: "Selective Aura",
    pfSelect: "Selective",
    pfShCProg: "Progression",
    pfSlowFade: "Slow Fade",
    pfStrMghty: "Mighty",
    pfSubtle: "Subtle",
    pfSummMLnk: "Mental Link",
    pfTprtCDir: "Change Direction",
    pfTprtCVel: "Change Velocity",
    pfTprtProg: "Progression",
    pfTprtTurn: "Turnabout",
    pfUPDamMig: "Mighty",
    pfUPDevInd: "Indestructible",
    pfUPHeaSta: "Stabilizing",
    pfUPVarDsc: "Variable Descriptor"
  };

  const HL_LIB_EXTRA_MAP = {
    pxAction: "Action (Free)",
    pxAffOthO: "Affects Others Only",
    pxAffOthrs: "Affects Others",
    pxAreaBrst: "Area (Burst)",
    pxCommArea: "Area",
    pxCrObjMov: "Movable",
    pxCustom: "Custom Extra",
    pxDupHero: "Heroic",
    pxDupSurv: "Survival",
    pxDuration: "Continuous",
    pxHealRes: "Restoration",
    pxHealTot: "Total",
    pxLinkedTo: "Linked",
    pxMConCons: "Conscious",
    pxMgAuton: "Autonomous",
    pxMgBanUni: "Universal",
    pxMgDimPor: "Portal",
    pxMgSeaIne: "Inescapable",
    pxMgShCHor: "Horde",
    pxPenet: "Penetrating",
    pxRange: "Range (Perception)",
    pxSelAtt: "Selective Attack",
    pxSnaRegen: "Regenerating",
    pxSummHero: "Heroic",
    pxSummTypN: "Broad Type",
    pxTPrtAcc: "Accurate",
    pxTPrtPrt: "Portal",
    pxTotalFad: "Total Fade",
    pxUPArPer: "Area (Perception)",
    pxUPCrOImp: "Impervious",
    pxUPHeaRst: "Restorative",
    pxUPIllSel: "Selective",
    pxUPMnCEff: "Effortless",
    pxUPMvODam: "Damaging",
    pxUPNoSave: "No Saving Throw",
    pxUPRfFAut: "Autonomous",
    pxUPTelCas: "Castling"
  };

  const HL_LIB_FLAW_MAP = {
    plAction: "Action (Full)",
    plBstPers: "Personal",
    plConcPas: "Passive",
    plCustom: "Custom Flaw",
    plDistract: "Distracting",
    plDuration: "Concentration",
    plESPMedi: "Medium",
    plFFlBro: "Ablative",
    plFades: "Fades",
    plFliGlide: "Gliding",
    plImmLim: "Limited",
    plLimited: "Limited",
    plMCComm: "Sense-Dependent",
    plRange: "Range (Touch)",
    plSnareEnt: "Entangle",
    plTprtLng: "Long-Range Only",
    plTprtMed: "Medium",
    plTprtShrt: "Short-Range Only",
    plUPChkReq: "Check Required",
    plUPDupSeq: "Sequential",
    plUPEmCLim: "Limited",
    plUPFliPla: "Platform",
    plUPGadEas: "Easy to Lose",
    plUPMnRLmP: "Limited",
    plUPSnaMed: "Medium",
    plUPTelAnc: "Anchor",
    plWWCursed: "Cursed"
  };

  const HL_LIB_DRAWBACK_MAP = {
    pdActAlt: "Action",
    pdCustom: "Custom Drawback",
    pdFullPow: "Full Power",
    pdMgDevCnO: "Cannot Operate",
    pdMgDimAnc: "Dimensional Anchor",
    pdNotice: "Noticeable",
    pdUPArrDst: "Distracting",
    pdUPDamLet: "Lethal",
    pdUPFliLow: "Low Ceiling"
  };

  const HL_LIB_DESCRIPTOR_MAP = {
    pdsBio: "Biological",
    pdsDark: "Darkness",
    pdsDimen: "Dimensional",
    pdsDivine: "Divine",
    pdsEarth: "Earth",
    pdsGood: "Good",
    pdsMagic: "Magic",
    pdsMind: "Mental",
    pdsMystic: "Mystic",
    pdsOther: "Other",
    pdsPsychic: "Psychic",
    pdsSonic: "Sonic",
    pdsSpace: "Spatial",
    pdsUPExtra: "Extraordinary"
  };

  const HL_LIB_OPTION_MAP = {
    poComLnRd: "Read Languages",
    poComLnSpk: "Speak Languages",
    poComLnUnd: "Understand Languages",
    poConAAur: "Auditory Concealment",
    poConAOlf: "Olfactory Concealment",
    poConAVis: "Visual Concealment",
    poConOther: "Concealment (Other)",
    poImmAging: "Aging",
    poImmAlter: "Alteration Effects",
    poImmDis: "Disease",
    poImmDmg: "Damage",
    poImmEnvCA: "Environmental Cold/Heat",
    poImmFatig: "Fatigue",
    poImmLife: "Life Support",
    poImmLifeS: "Life Support",
    poImmMent: "Mental Effects",
    poImmPois: "Poison",
    poImmRare: "Rare Descriptor",
    poImmUncom: "Uncommon Descriptor",
    poMagFogFr: "Fog/Freezing",
    poMagLight: "Light",
    poMagOther: "Magic (Other)",
    poSenAcc: "Accurate",
    poSenAcu: "Acute",
    poSenAware: "Awareness",
    poSenDark: "Darkvision",
    poSenDet: "Detect",
    poSenExt: "Extended",
    poSenXray: "X-Ray Vision",
    poUPMagDis: "Dimensional Shift",
    poUPSSnAna: "Analytical",
    poUPSSnCOA: "Counters Obscure/All",
    poUPSSnCoC: "Counters Concealment",
    poUPSSnTre: "Tracking"
  };

  const HL_LIB_TRAIT_MOD_MAP = {
    // Abilities
    aSTR: "Strength",
    aDEX: "Dexterity",
    aCON: "Constitution",
    aINT: "Intelligence",
    aWIS: "Wisdom",
    aCHA: "Charisma",
    attrStr: "Strength",
    attrDex: "Dexterity",
    attrCon: "Constitution",
    attrInt: "Intelligence",
    attrWis: "Wisdom",
    attrCha: "Charisma",

    // Combat & Saves
    AtkBonus: "Attack Bonus",
    Defense: "Defense",
    svFort: "Fortitude",
    svRef: "Reflex",
    svWill: "Will",
    svTough: "Toughness",
    saveFort: "Fortitude",
    saveRef: "Reflex",
    saveWill: "Will",
    saveTough: "Toughness",

    // Skills - Standard & Short IDs
    skAcrobat: "Acrobatics",
    skAcro: "Acrobatics",
    skBluff: "Bluff",
    skClimb: "Climb",
    skComput: "Computers",
    skComputer: "Computers",
    skConcent: "Concentration",
    skConc: "Concentration",
    skDiplo: "Diplomacy",
    skDiplom: "Diplomacy",
    skDisable: "Disable Device",
    skDisab: "Disable Device",
    skDisguise: "Disguise",
    skDisg: "Disguise",
    skDrive: "Drive",
    skEscape: "Escape Artist",
    skEscA: "Escape Artist",
    skGather: "Gather Information",
    skGath: "Gather Information",
    skHandle: "Handle Animal",
    skHand: "Handle Animal",
    skIntim: "Intimidate",
    skInvest: "Investigate",
    skInves: "Investigate",
    skLanguage: "Languages",
    skLang: "Languages",
    skMedicine: "Medicine",
    skMed: "Medicine",
    skMMGamble: "Gambling",
    skGamble: "Gambling",
    skMMNavig: "Navigation",
    skNavig: "Navigation",
    skNotice: "Notice",
    skPilot: "Pilot",
    skRide: "Ride",
    skSearch: "Search",
    skSense: "Sense Motive",
    skSenseM: "Sense Motive",
    skSleight: "Sleight of Hand",
    skSleightH: "Sleight of Hand",
    skStealth: "Stealth",
    skSurvival: "Survival",
    skSurv: "Survival",
    skSwim: "Swim",

    // Craft
    skCraft: "Craft",
    skCrafArt: "Craft (Artistic)",
    skCrafArti: "Craft (Artistic)",
    skCrafChem: "Craft (Chemical)",
    skCrafElec: "Craft (Electronic)",
    skCrafMech: "Craft (Mechanical)",
    skCrafStr: "Craft (Structural)",
    skCrafStru: "Craft (Structural)",

    // Knowledge
    skKnowledg: "Knowledge",
    skKnowledge: "Knowledge",
    skKnowArc: "Knowledge (Arcane Lore)",
    skKnowArt: "Knowledge (Art)",
    skKnowBeh: "Knowledge (Behavioral Sciences)",
    skKnowBehv: "Knowledge (Behavioral Sciences)",
    skKnowBus: "Knowledge (Business)",
    skKnowCiv: "Knowledge (Civics)",
    skKnowCur: "Knowledge (Current Events)",
    skKnowCurr: "Knowledge (Current Events)",
    skKnowEar: "Knowledge (Earth Sciences)",
    skKnowEart: "Knowledge (Earth Sciences)",
    skKnowHist: "Knowledge (History)",
    skKnowLife: "Knowledge (Life Sciences)",
    skKnowLif: "Knowledge (Life Sciences)",
    skKnowPhy: "Knowledge (Physical Sciences)",
    skKnowPhys: "Knowledge (Physical Sciences)",
    skKnowPop: "Knowledge (Popular Culture)",
    skKnowCult: "Knowledge (Popular Culture)",
    skKnowStr: "Knowledge (Streetwise)",
    skKnowStrt: "Knowledge (Streetwise)",
    skKnowTac: "Knowledge (Tactics)",
    skKnowTact: "Knowledge (Tactics)",
    skKnowTec: "Knowledge (Technology)",
    skKnowTech: "Knowledge (Technology)",
    skKnowTheo: "Knowledge (Theology & Philosophy)",
    skKnowThe: "Knowledge (Theology & Philosophy)",

    // Perform
    skPerform: "Perform",
    skPerf: "Perform",
    skPerfAct: "Perform (Acting)",
    skPerfCom: "Perform (Comedy)",
    skPerfDan: "Perform (Dance)",
    skPerfKey: "Perform (Keyboard)",
    skPerfOrat: "Perform (Oratory)",
    skPerfPerc: "Perform (Percussion)",
    skPerfSing: "Perform (Singing)",
    skPerfStri: "Perform (Stringed Instruments)",
    skPerfStr: "Perform (Stringed Instruments)",
    skPerfWind: "Perform (Wind Instruments)",

    // Profession
    skProf: "Profession",
    skProfOth: "Profession",
    skProfession: "Profession"
  };

  function resolveHlTraitModLabel(menuThing, customSkillMap = null, cacheIndex = null) {
    if (cacheIndex && customSkillMap && customSkillMap.byCacheIndex && customSkillMap.byCacheIndex[cacheIndex]) {
      return customSkillMap.byCacheIndex[cacheIndex];
    }
    if (menuThing && customSkillMap && customSkillMap.byThing && customSkillMap.byThing[menuThing]) {
      return customSkillMap.byThing[menuThing];
    }
    if (!menuThing) return "Trait";
    if (HL_LIB_TRAIT_MOD_MAP[menuThing]) {
      return HL_LIB_TRAIT_MOD_MAP[menuThing];
    }
    const lower = menuThing.toLowerCase();
    if (typeof SKILL_NAME_NORMALIZATION_MAP !== 'undefined' && SKILL_NAME_NORMALIZATION_MAP[lower]) {
      return SKILL_NAME_NORMALIZATION_MAP[lower];
    }
    const stripped = menuThing.replace(/^skMM|^sk|^sv|^attr|^a/, "");
    if (typeof SKILL_NAME_NORMALIZATION_MAP !== 'undefined' && SKILL_NAME_NORMALIZATION_MAP[stripped.toLowerCase()]) {
      return SKILL_NAME_NORMALIZATION_MAP[stripped.toLowerCase()];
    }
    let formatted = stripped.replace(/([a-z])([A-Z])/g, '$1 $2').trim();
    if (formatted.startsWith("Know ")) {
      formatted = `Knowledge (${formatted.replace(/^Know /, "")})`;
    } else if (formatted.startsWith("Craf ")) {
      formatted = `Craft (${formatted.replace(/^Craf /, "")})`;
    } else if (formatted.startsWith("Perf ")) {
      formatted = `Perform (${formatted.replace(/^Perf /, "")})`;
    }
    return formatted || menuThing;
  }

  function parseHeroLabSingleEffectPick(powerPick, baseThing, customSkillMap = null) {
    let canonicalName = HL_LIB_POWER_MAP[baseThing] || "Power";
    if (canonicalName === "Feature") canonicalName = "Features";
    if (canonicalName === "Duplicate") canonicalName = "Duplication";

    let matchedProfileName = "";
    if (typeof POWER_EFFECTS_LIST !== 'undefined' && !POWER_EFFECTS_LIST.some(e => e.name === canonicalName)) {
      if (typeof POWER_PROFILES_LIST !== 'undefined') {
        const matchedProfile = POWER_PROFILES_LIST.find(p => p.name.toLowerCase() === canonicalName.toLowerCase());
        if (matchedProfile && matchedProfile.effectName) {
          matchedProfileName = canonicalName;
          canonicalName = matchedProfile.effectName;
        }
      }
    }

    let customName = matchedProfileName || canonicalName;
    let ranks = 1;
    let isEasyToLose = false;
    let restrictedTo = "";
    let notes = "";

    const children = Array.from(powerPick.children || []);
    const gizmo = children.find(c => c.tagName.toLowerCase() === "gizmo");
    const container = gizmo ? Array.from(gizmo.children || []).find(c => c.tagName.toLowerCase() === "container") : null;
    const childPicks = container ? Array.from(container.children || []).filter(c => c.tagName.toLowerCase() === "pick") : [];

    const modifiers = [];
    const descriptors = [];
    const drawbacks = [];
    const nestedPowerEffects = [];
    const subPowers = [];

    // Find PowerHelp pick
    const powerHelp = childPicks.find(p => p.getAttribute("thing") === "PowerHelp");
    if (powerHelp) {
      const fields = Array.from(powerHelp.getElementsByTagName ? powerHelp.getElementsByTagName("field") : (powerHelp.children || []).filter(c => c.tagName.toLowerCase() === "field"));
      const nameField = fields.find(f => f.getAttribute("id") === "pwhName");
      if (nameField && nameField.getAttribute("text")) customName = nameField.getAttribute("text");

      const notesField = fields.find(f => f.getAttribute("id") === "pwhNotes");
      if (notesField && notesField.getAttribute("text")) notes = notesField.getAttribute("text");

      const rankField = fields.find(f => f.getAttribute("id") === "pwhRankUsr" || f.getAttribute("id") === "pwhRank");
      if (rankField) {
        const rVal = parseFloat(rankField.getAttribute("user") || rankField.getAttribute("value") || "1");
        if (!isNaN(rVal) && rVal > 0) ranks = Math.round(rVal);
      }

      const easyField = fields.find(f => f.getAttribute("id") === "dvhEasyLos");
      if (easyField && (easyField.getAttribute("user") === "1." || easyField.getAttribute("value") === "1.")) isEasyToLose = true;

      const restrCondField = fields.find(f => f.getAttribute("id") === "dvhResCond");
      if (restrCondField && restrCondField.getAttribute("text")) restrictedTo = restrCondField.getAttribute("text");
    }

    // Iterate sibling picks
    for (const cp of childPicks) {
      const th = cp.getAttribute("thing");
      if (th === "PowerHelp") continue;

      // Nested power inside varSet (e.g. Gadgets / powVarSet)
      if (th === "powVarSet" || th.startsWith("pwVar") || th.startsWith("var")) {
        const varGizmo = Array.from(cp.children || []).find(c => c.tagName.toLowerCase() === "gizmo");
        const varContainer = varGizmo ? Array.from(varGizmo.children || []).find(c => c.tagName.toLowerCase() === "container") : null;
        const varChildPicks = varContainer ? Array.from(varContainer.children || []).filter(c => c.tagName.toLowerCase() === "pick") : [];
        for (const vp of varChildPicks) {
          const vth = vp.getAttribute("thing");
          if (vth && vth.startsWith("pw") && vth !== "pwMods" && vth !== "pwDescs" && vth !== "pwOptions") {
            const nestedEff = parseHeroLabSingleEffectPick(vp, vth, customSkillMap);
            if (nestedEff) nestedPowerEffects.push(nestedEff);
          }
        }
        continue;
      }

      // Nested power inside device
      if (th.startsWith("pw") && th !== "pwMods" && th !== "pwDescs" && th !== "pwOptions") {
        const nestedEff = parseHeroLabSingleEffectPick(cp, th, customSkillMap);
        if (nestedEff) nestedPowerEffects.push(nestedEff);
        continue;
      }

      const cpFields = Array.from(cp.getElementsByTagName ? cp.getElementsByTagName("field") : (cp.children || []).filter(c => c.tagName.toLowerCase() === "field"));

      // TraitMod (Enhanced Trait)
      if (th === "TraitMod") {
        const rField = cpFields.find(f => f.getAttribute("id") === "modRanks");
        const cField = cpFields.find(f => f.getAttribute("id") === "modChosen");
        const modRanks = rField ? parseFloat(rField.getAttribute("user") || rField.getAttribute("value") || "1") : 1;
        const menuThing = cField ? cField.getAttribute("menuthing") : "";
        const cacheIndex = cField ? cField.getAttribute("cacheindex") : "";
        const label = resolveHlTraitModLabel(menuThing, customSkillMap, cacheIndex);

        const lowerName = label.toLowerCase().trim();
        const abilityMap = {
          "strength": "Strength", "dexterity": "Dexterity", "constitution": "Constitution",
          "intelligence": "Intelligence", "wisdom": "Wisdom", "charisma": "Charisma",
          "str": "Strength", "dex": "Dexterity", "con": "Constitution",
          "int": "Intelligence", "wis": "Wisdom", "cha": "Charisma"
        };
        const saveMap = {
          "toughness": "Toughness", "fortitude": "Fortitude", "reflex": "Reflex", "will": "Will"
        };
        const combatMap = {
          "attack": "Attack", "attack bonus": "Attack Bonus", "defense": "Defense", "defense bonus": "Defense"
        };

        if (abilityMap[lowerName]) {
          const abName = abilityMap[lowerName];
          subPowers.push({
            name: `${abName} (+${modRanks})`,
            type: abName,
            rank: modRanks / 2,
            baseCost: 2,
            costType: "per_rank",
            details: "",
            modifiers: [],
            isReduced: modRanks < 0
          });
        } else if (saveMap[lowerName]) {
          const sName = saveMap[lowerName];
          subPowers.push({
            name: `${sName} (+${modRanks})`,
            type: sName,
            rank: Math.abs(modRanks),
            baseCost: 1,
            costType: "per_rank",
            details: "",
            modifiers: [],
            isReduced: modRanks < 0
          });
        } else if (combatMap[lowerName]) {
          const cName = combatMap[lowerName];
          subPowers.push({
            name: `${cName} (+${modRanks})`,
            type: cName,
            rank: Math.abs(modRanks),
            baseCost: 2,
            costType: "per_rank",
            details: "",
            modifiers: [],
            isReduced: modRanks < 0
          });
        } else {
          // Check Skill
          const normSkill = (typeof SKILL_NAME_NORMALIZATION_MAP !== 'undefined') ? SKILL_NAME_NORMALIZATION_MAP[lowerName] : null;
          let matchedSkill = null;
          if (normSkill) {
            matchedSkill = normSkill;
          } else if (typeof SKILLS_LIST !== 'undefined') {
            const skObj = SKILLS_LIST.find(s => s.name.toLowerCase() === lowerName || lowerName.startsWith(s.name.toLowerCase()));
            if (skObj) {
              matchedSkill = label.includes(" (") ? label : skObj.name;
            }
          } else if (label.includes(" (")) {
            matchedSkill = label;
          }
          if (matchedSkill) {
            subPowers.push({
              name: `${matchedSkill} (+${modRanks})`,
              type: matchedSkill,
              rank: Math.abs(modRanks),
              baseCost: 0.25,
              costType: "per_rank",
              details: "",
              modifiers: [],
              isReduced: modRanks < 0
            });
          } else {
            // Check Feat
            let matchedFeat = null;
            if (typeof FEATS_LIST !== 'undefined') {
              const fObj = FEATS_LIST.find(f => f.name.toLowerCase() === lowerName || lowerName.startsWith(f.name.toLowerCase()));
              if (fObj) matchedFeat = fObj.name;
            }
            if (matchedFeat) {
              subPowers.push({
                name: `${matchedFeat} (${modRanks})`,
                type: matchedFeat,
                rank: Math.abs(modRanks),
                baseCost: 1,
                costType: "per_rank",
                details: "",
                modifiers: [],
                isReduced: modRanks < 0
              });
            } else {
              subPowers.push({
                name: `${label} (+${modRanks})`,
                type: label,
                rank: Math.abs(modRanks),
                baseCost: 1,
                costType: "per_rank",
                details: "",
                modifiers: [],
                isReduced: modRanks < 0
              });
            }
          }
        }
        continue;
      }

      // Descriptors
      if (th.startsWith("pds")) {
        const dName = HL_LIB_DESCRIPTOR_MAP[th] || th.replace(/^pds/, "");
        if (!descriptors.includes(dName)) descriptors.push(dName);
        continue;
      }

      // Power Options
      if (th.startsWith("po")) {
        const oName = HL_LIB_OPTION_MAP[th] || th.replace(/^po/, "");
        if (["Immunity", "Super-Senses", "Super-Movement", "Comprehend", "Enhanced Movement"].includes(canonicalName)) {
          let r = 1;
          let bCost = 1;
          let cType = "per_rank";
          if (canonicalName === "Immunity") {
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
            bCost = 1;
          } else if (canonicalName === "Super-Senses") {
            const senseRankMap = {
              "darkvision": 2, "x-ray vision": 4, "tremorsense": 3,
              "blindsight": 4, "postcognition": 4, "precognition": 4, "accurate": 2
            };
            r = senseRankMap[oName.toLowerCase().trim()] || 1;
            bCost = 1;
          } else if (canonicalName === "Super-Movement") {
            bCost = 2;
            r = 1;
          } else if (canonicalName === "Comprehend") {
            bCost = 2;
            r = (oName.toLowerCase().includes("languages") ? 1 : 2);
          }
          subPowers.push({
            name: oName,
            type: oName,
            rank: r,
            baseCost: bCost,
            costType: cType,
            details: "",
            modifiers: [],
            isReduced: false
          });
        } else {
          modifiers.push({
            name: oName,
            category: "option",
            cost: 0
          });
        }
        continue;
      }

      // Power Feats
      if (th.startsWith("pf")) {
        let fName = HL_LIB_FEAT_MAP[th] || th.replace(/^pf/, "");
        const uField = cpFields.find(f => f.getAttribute("id") === "pwmUserTxt");
        const rField = cpFields.find(f => f.getAttribute("id") === "pwmRanks");
        const uTxt = uField ? uField.getAttribute("text") : "";
        const rVal = rField ? parseFloat(rField.getAttribute("user") || rField.getAttribute("value") || "1") : 1;
        if (uTxt) fName += ` (${uTxt})`;
        modifiers.push({
          name: fName,
          ranks: rVal,
          category: "feat",
          cost: 1
        });
        continue;
      }

      // Extras
      if (th.startsWith("px")) {
        let xName = HL_LIB_EXTRA_MAP[th] || th.replace(/^px/, "");
        const uField = cpFields.find(f => f.getAttribute("id") === "pwmUserTxt");
        const rField = cpFields.find(f => f.getAttribute("id") === "pwmRankUsr" || f.getAttribute("id") === "pwmRanks");
        const uTxt = uField ? uField.getAttribute("text") : "";
        const rVal = rField ? parseFloat(rField.getAttribute("user") || rField.getAttribute("value") || "1") : 1;
        if (uTxt) xName += ` (${uTxt})`;
        modifiers.push({
          name: xName,
          ranks: rVal,
          category: "extra",
          cost: 1,
          costType: "per_rank"
        });
        continue;
      }

      // Flaws
      if (th.startsWith("pl")) {
        let lName = HL_LIB_FLAW_MAP[th] || th.replace(/^pl/, "");
        const uField = cpFields.find(f => f.getAttribute("id") === "pwmUserTxt");
        const rField = cpFields.find(f => f.getAttribute("id") === "pwmRankUsr" || f.getAttribute("id") === "pwmRanks");
        const uTxt = uField ? uField.getAttribute("text") : "";
        const rVal = rField ? parseFloat(rField.getAttribute("user") || rField.getAttribute("value") || "1") : 1;
        if (uTxt) lName += ` (${uTxt})`;
        modifiers.push({
          name: lName,
          ranks: rVal,
          category: "flaw",
          cost: -1,
          costType: "per_rank"
        });
        continue;
      }

      // Drawbacks
      if (th.startsWith("pd")) {
        let dName = HL_LIB_DRAWBACK_MAP[th] || th.replace(/^pd/, "");
        const uField = cpFields.find(f => f.getAttribute("id") === "pwmUserTxt");
        const rField = cpFields.find(f => f.getAttribute("id") === "pwmRanks");
        const uTxt = uField ? uField.getAttribute("text") : "";
        const rVal = rField ? parseFloat(rField.getAttribute("user") || rField.getAttribute("value") || "1") : 1;
        if (uTxt) dName += `: ${uTxt}`;
        drawbacks.push({
          name: dName,
          ranks: rVal,
          points: rVal,
          category: "drawback"
        });
        continue;
      }
    }

    const isDevice = (canonicalName === "Device" || baseThing === "pwDevice" || baseThing === "pwUPGadget");
    if (isDevice) {
      if (isEasyToLose) {
        modifiers.unshift({
          name: "Easy to Lose",
          cost: -1,
          costType: "per_rank",
          category: "flaw"
        });
      } else {
        modifiers.unshift({
          name: "Hard to Lose",
          cost: 0,
          costType: "flat",
          category: "extra"
        });
      }
      if (restrictedTo) {
        modifiers.push({
          name: `Restricted (${restrictedTo})`,
          cost: 1,
          costType: "flat",
          category: "feat"
        });
      }
    }

    const baseData = (typeof POWER_EFFECTS_LIST !== 'undefined') ? POWER_EFFECTS_LIST.find(e => e.name === canonicalName) : null;
    let finalRank = ranks;
    if (canonicalName === "Enhanced Trait" && subPowers.length > 0) {
      finalRank = Math.max(1, Math.round(subPowers.reduce((sum, sp) => sum + (sp.rank * (sp.baseCost || 1)), 0)));
    } else if ((canonicalName === "Immunity" || canonicalName === "Super-Senses") && subPowers.length > 0) {
      finalRank = subPowers.reduce((sum, sp) => sum + (sp.rank || 1), 0);
    }

    const primaryEffect = {
      id: "eff_" + Math.random().toString(36).substr(2, 9),
      name: customName || canonicalName,
      effectName: canonicalName,
      profile: matchedProfileName || "",
      rank: finalRank,
      ranks: finalRank,
      baseCost: baseData ? baseData.baseCost : 1,
      action: baseData ? baseData.action : "Standard",
      range: baseData ? baseData.range : "Touch",
      duration: baseData ? baseData.duration : "Instant",
      savingThrow: baseData ? (baseData.savingThrow || baseData.check || "None") : "None",
      modifiers: modifiers,
      subPowers: subPowers,
      descriptors: descriptors,
      drawbacks: drawbacks,
      details: notes || ""
    };

    return {
      isDevice,
      isEasyToLose,
      primaryEffect,
      nestedPowerEffects
    };
  }

  function ingestHeroLabLibrary(leadXmlStr, primaryData, audit, customSkillMap = null) {
    if (!leadXmlStr) return;
    const doc = (typeof DOMParser !== 'undefined') ? new DOMParser().parseFromString(leadXmlStr, "text/xml") : null;
    if (!doc) return;

    let libPicks = [];
    try {
      libPicks = Array.from(doc.querySelectorAll('pick[source="libTable"]'));
    } catch(e) {}
    if (libPicks.length === 0 && doc.getElementsByTagName) {
      const allPicks = Array.from(doc.getElementsByTagName("pick"));
      libPicks = allPicks.filter(p => p.getAttribute("source") === "libTable");
    }
    if (libPicks.length === 0) return;

    if (!primaryData.blueprints) primaryData.blueprints = [];
    if (!audit.libraryPlans) audit.libraryPlans = [];

    libPicks.forEach((p, pIdx) => {
      const baseThing = p.getAttribute("thing");
      const pFields = Array.from(p.getElementsByTagName ? p.getElementsByTagName("field") : (p.children || []).filter(c => c.tagName.toLowerCase() === "field"));
      const activeField = pFields.find(f => f.getAttribute("id") === "pwActive");
      const isActive = (activeField && (activeField.getAttribute("user") === "1." || activeField.getAttribute("value") === "1.")) || p.getAttribute("default") !== "yes";

      const parsed = parseHeroLabSingleEffectPick(p, baseThing, customSkillMap);
      if (!parsed) return;

      let containerType = "normal";
      const effects = [parsed.primaryEffect];

      if (parsed.isDevice) {
        containerType = parsed.isEasyToLose ? "device_easy" : "device_hard";
        if (parsed.nestedPowerEffects && parsed.nestedPowerEffects.length > 0) {
          parsed.nestedPowerEffects.forEach(n => {
            if (n.primaryEffect) {
              if (n.primaryEffect.rank === undefined && n.primaryEffect.ranks !== undefined) {
                n.primaryEffect.rank = n.primaryEffect.ranks;
              }
              effects.push(n.primaryEffect);
            }
          });
        }
      }

      // Infer plan type (invention, ritual, device)
      let planType = "invention";
      const charFeats = primaryData.feats || {};
      const featNames = Array.isArray(charFeats) ? charFeats.map(f => (typeof f === 'string' ? f : (f.name || ""))) : Object.keys(charFeats);
      const hasRitualist = featNames.some(f => f.includes("Ritualist"));
      const hasInventor = featNames.some(f => f.includes("Inventor"));
      const isMagicOrRitual = (parsed.primaryEffect.descriptors && /magic|arcane|ritual|divine|demonic/i.test(parsed.primaryEffect.descriptors)) ||
                              /ritual|spell|enchant/i.test(parsed.primaryEffect.name) ||
                              (hasRitualist && !hasInventor && !parsed.isDevice);
      if (parsed.isDevice || baseThing === "pwDevice" || baseThing === "pwUPGadget") {
        planType = "device";
      } else if (isMagicOrRitual) {
        planType = "ritual";
      }

      const container = {
        id: "bp_" + Math.random().toString(36).substr(2, 9) + "_" + pIdx,
        name: parsed.primaryEffect.name,
        containerType: containerType,
        planType: planType,
        collapsed: false,
        active: isActive,
        effects: effects
      };

      primaryData.blueprints.push(container);
      audit.libraryPlans.push({
        name: container.name,
        type: container.containerType === "device_easy" ? "Device (Easy to Lose)" : (container.containerType === "device_hard" ? "Device (Hard to Lose)" : (planType === "ritual" ? "Ritual" : "Invention")),
        active: container.active,
        effectsSummary: container.effects.map(e => `${e.effectName} ${e.rank !== undefined ? e.rank : e.ranks}`).join(", ")
      });
    });
  }

  // ==========================================================================
  // INGEST HERO LAB IN-PLAY STATE (Hero Points & Active Conditions)
  // ==========================================================================
  function ingestHeroLabInPlayState(leadXmlStr, primaryData, audit) {
    if (!leadXmlStr || !primaryData) return;

    if (!primaryData.trackerState) {
      primaryData.trackerState = { conditions: {}, customPoints: [], fadeStates: {} };
    }
    if (!primaryData.trackerState.conditions) {
      primaryData.trackerState.conditions = {};
    }

    // 1. Ingest Hero Points from usagepool
    const hpMatch = leadXmlStr.match(/<usagepool [^>]*id="HeroPoints"[^>]*quantity="([^"]+)"/i) ||
                    leadXmlStr.match(/<usagepool [^>]*quantity="([^"]+)"[^>]*id="HeroPoints"/i);
    if (hpMatch) {
      const qty = parseFloat(hpMatch[1]);
      if (!isNaN(qty)) {
        const parsedHP = Math.max(0, Math.round(qty));
        primaryData.heroPoints = parsedHP;
        if (audit) {
          audit.heroPointsImported = parsedHP;
          recordUnmappedDataPoint(audit, "In-Play Tracker", "Hero Points", "Hero Points", parsedHP, "Imported", `Imported ${parsedHP} Hero Points from Hero Lab In-Play tracker.`);
        }
      }
    }

    // 2. Ingest Active Conditions from condition picks
    const HL_CONDITION_MAP = {
      "conBruised": "Bruised",
      "conInjured": "Injured",
      "conStagger": "Staggered",
      "conDisable": "Disabled",
      "conUncons": "Unconscious",
      "conDying": "Dying",
      "conDead": "Dead",
      "conFatigue": "Fatigued",
      "conExhaust": "Exhausted",
      "conParalyz": "Paralyzed",
      "conBlinded": "Blind",
      "conDeaf": "Deaf",
      "conProne": "Prone",
      "conPinned": "Pinned",
      "conEntang": "Entangled",
      "conDazed": "Dazed",
      "conStunned": "Stunned",
      "conHelpls": "Helpless",
      "conFlatft": "Flat-Footed",
      "conNausea": "Nauseated",
      "conPanic": "Panicked",
      "conShaken": "Shaken",
      "conFascin": "Fascinated",
      "conSlowed": "Hindered",
      "conSick": "Sickened",
      "conFright": "Shaken",
      "conInvis": "Invisible",
      "conStable": "Stable",
      "conTotDef": "Total Defense"
    };

    const pickRegex = /<pick [^>]*thing="(con[A-Za-z0-9_]+)"[^>]*>([\s\S]*?)<\/pick>/g;
    let pMatch;
    const importedConds = {};
    while ((pMatch = pickRegex.exec(leadXmlStr)) !== null) {
      const thing = pMatch[1];
      const inner = pMatch[2];
      const mapped = HL_CONDITION_MAP[thing];
      if (!mapped) continue;

      const isOnMatch = inner.match(/<field [^>]*id="adjIsOn"[^>]*user="([^"]+)"/i) ||
                        inner.match(/<field [^>]*id="adjIsOn"[^>]*value="([^"]+)"/i);
      const countMatch = inner.match(/<field [^>]*id="(?:adjUser|adjCount)"[^>]*user="([^"]+)"/i) ||
                         inner.match(/<field [^>]*id="(?:adjUser|adjCount)"[^>]*value="([^"]+)"/i);

      const isOnVal = isOnMatch ? parseFloat(isOnMatch[1]) : 0;
      const countVal = countMatch ? parseFloat(countMatch[1]) : 0;

      if (isOnVal > 0 || countVal > 0) {
        if (mapped === "Bruised" || mapped === "Injured") {
          const count = Math.max(1, Math.round(countVal > 0 ? countVal : isOnVal));
          primaryData.trackerState.conditions[mapped] = count;
          importedConds[mapped] = count;
        } else {
          primaryData.trackerState.conditions[mapped] = true;
          importedConds[mapped] = true;
        }
      }
    }

    if (audit && Object.keys(importedConds).length > 0) {
      audit.conditionsImported = { ...importedConds };
      const condSummary = Object.entries(importedConds).map(([k, v]) => typeof v === 'number' ? `${k} ×${v}` : k).join(", ");
      recordUnmappedDataPoint(audit, "In-Play Tracker", "Active Conditions", condSummary, "", "Imported", "Active in-play conditions imported from Hero Lab.");
    }
  }

  // ==========================================================================
  // PARSE MODIFIERS HELPER (Extras, Flaws, Power Feats, Drawbacks)
  // ==========================================================================
  function parseModifiersFromNode(pNode, audit, effectLabel) {
    const modifiers = [];

    // Extras
    const extrasContainer = getDirectChild(pNode, "extras");
    if (extrasContainer) {
      const extraNodes = getDirectChildren(extrasContainer, "extra");
      extraNodes.forEach(ex => {
        const eName = ex.getAttribute("name") || "";
        const eInfo = ex.getAttribute("info") || "";
        const eRanks = parseInt(ex.getAttribute("extraranks") || ex.getAttribute("ranks") || 1);

        if (eName === "Custom") {
          modifiers.push({
            name: `Custom Extra: ${eInfo || "Special"}`,
            category: "extra",
            cost: 1,
            costType: "per_rank",
            ranks: eRanks,
            details: eInfo
          });
          audit.preservedNotes.push(`Preserved custom extra on '${effectLabel}': ${eInfo}`);
          recordUnmappedDataPoint(audit, "Custom Extra", effectLabel, eName, eInfo, "Preserved as Extra & Notes", "Custom extra preserved with 1 PP/rank cost and original text.");
          return;
        }

        const mapped = MODIFIER_NAME_MAP[(eName + " (" + eInfo + ")").toLowerCase()] || MODIFIER_NAME_MAP[eName.toLowerCase()];
        if (mapped) {
          modifiers.push({
            name: mapped.name,
            category: "extra",
            cost: mapped.cost !== undefined ? mapped.cost : 1,
            costType: mapped.costType || "per_rank",
            ranks: eRanks,
            details: eInfo
          });
        } else {
          modifiers.push({
            name: eName,
            category: "extra",
            cost: 1,
            costType: "per_rank",
            ranks: eRanks,
            details: eInfo
          });
          recordUnmappedDataPoint(audit, "Custom Extra", effectLabel, eName, eInfo, "Preserved as 1 PP/rank Extra", "Non-standard extra preserved as generic 1 PP/rank extra.");
        }
      });
    }

    // Flaws
    const flawsContainer = getDirectChild(pNode, "flaws");
    if (flawsContainer) {
      const flawNodes = getDirectChildren(flawsContainer, "flaw");
      flawNodes.forEach(fl => {
        const fName = fl.getAttribute("name") || "";
        const fInfo = fl.getAttribute("info") || "";
        const fRanks = parseInt(fl.getAttribute("flawranks") || fl.getAttribute("ranks") || 1);

        const mapped = MODIFIER_NAME_MAP[(fName + " (" + fInfo + ")").toLowerCase()] || MODIFIER_NAME_MAP[fName.toLowerCase()];
        if (mapped) {
          modifiers.push({
            name: mapped.name,
            category: "flaw",
            cost: mapped.cost !== undefined ? mapped.cost : 1,
            costType: mapped.costType || "per_rank",
            ranks: fRanks,
            details: fInfo
          });
        } else {
          modifiers.push({
            name: fName,
            category: "flaw",
            cost: 1,
            costType: "per_rank",
            ranks: fRanks,
            details: fInfo
          });
          recordUnmappedDataPoint(audit, "Custom Flaw", effectLabel, fName, fInfo, "Preserved as -1 PP/rank Flaw", "Non-standard flaw preserved as generic -1 PP/rank flaw.");
        }
      });
    }

    // Power Feats
    const featsContainer = getDirectChild(pNode, "powerfeats");
    if (featsContainer) {
      const featNodes = getDirectChildren(featsContainer, "powerfeat");
      featNodes.forEach(pf => {
        const pfName = pf.getAttribute("name") || "";
        const pfInfo = pf.getAttribute("info") || "";
        const pfRanks = parseInt(pf.getAttribute("ranks") || 1);

        if (pfName === "Custom") {
          modifiers.push({
            name: `Custom Feat: ${pfInfo || "Special"}`,
            category: "feat",
            cost: 1,
            costType: "flat",
            ranks: pfRanks,
            details: pfInfo
          });
          audit.preservedNotes.push(`Preserved custom feat on '${effectLabel}': ${pfInfo}`);
          recordUnmappedDataPoint(audit, "Custom Power Feat", effectLabel, pfName, pfInfo, "Preserved as Feat & Notes", "Custom power feat preserved with 1 PP flat cost.");
          return;
        }

        const lookup = pfName.toLowerCase().startsWith("progression") ? (MODIFIER_NAME_MAP[pfName.toLowerCase()] ? pfName.toLowerCase() : "progression") : pfName.toLowerCase();
        const mapped = MODIFIER_NAME_MAP[(pfName + " (" + pfInfo + ")").toLowerCase()] || MODIFIER_NAME_MAP[lookup];
        if (mapped) {
          modifiers.push({
            name: mapped.name,
            category: "feat",
            cost: mapped.cost !== undefined ? mapped.cost : 1,
            costType: "flat",
            ranks: pfRanks,
            details: pfInfo
          });
        } else {
          modifiers.push({
            name: pfName,
            category: "feat",
            cost: 1,
            costType: "flat",
            ranks: pfRanks,
            details: pfInfo
          });
          recordUnmappedDataPoint(audit, "Power Feat", effectLabel, pfName, pfInfo, "Preserved as 1 PP Flat Feat", "Non-standard power feat preserved as flat 1 PP feat.");
        }
      });
    }

    // Power Drawbacks
    const drawbacksContainer = getDirectChild(pNode, "powerdrawbacks");
    if (drawbacksContainer) {
      const drawbackNodes = getDirectChildren(drawbacksContainer, "powerdrawback");
      drawbackNodes.forEach(pd => {
        const pdName = pd.getAttribute("name") || "";
        const pdInfo = pd.getAttribute("info") || "";
        const pdRanks = parseInt(pd.getAttribute("ranks") || 1);

        modifiers.push({
          name: `Drawback: ${pdName}`,
          category: "flaw",
          cost: 1,
          costType: "flat",
          ranks: pdRanks,
          details: pdInfo
        });
        recordUnmappedDataPoint(audit, "Power Drawback", effectLabel, pdName, pdInfo, "Preserved as Flat Flaw", "Power drawback converted to flat flaw modifier.");
      });
    }

    return modifiers;
  }

  // ==========================================================================
  // PARSE SINGLE EFFECT & MODIFIERS
  // ==========================================================================
  function parseSinglePowerEffect(pNode, index, audit, association = "primary", customSkillMap = null) {
    const rawName = pNode.getAttribute("name");
    const rawRanks = parseFloat(pNode.getAttribute("ranks") || 1);
    const summary = pNode.getAttribute("summary") || "";
    const declaredCost = parseInt(getDirectChild(pNode, "cost")?.getAttribute("value") || 0);

    const deconstructed = deconstructHeroLabPowerName(rawName);
    const effectLabel = deconstructed.customName;
    const hlBaseName = deconstructed.hlBaseName;
    const finalRank = deconstructed.ranks || rawRanks || 1;

    // Descriptors
    let descriptors = "";
    const descContainer = getDirectChild(pNode, "descriptors");
    if (descContainer) {
      const descNodes = getDirectChildren(descContainer, "descriptor");
      descriptors = descNodes.map(d => d.getAttribute("name")).join(", ");
    }

    // User Notes and Full Description
    const userNotesNode = getDirectChild(pNode, "usernotes");
    let userNotes = userNotesNode ? userNotesNode.textContent.trim() : "";
    const descNode = getDirectChild(pNode, "description");
    const descText = descNode ? descNode.textContent.trim() : "";

    const parsedSubPowers = [];
    const parsedOptions = {};

    // Trait Modifications (e.g. Enhanced Trait)
    const traitContainer = getDirectChild(pNode, "traitmods");
    if (traitContainer) {
      const traitModNodes = getDirectChildren(traitContainer, "traitmod");
      let traitNotes = [];
      traitModNodes.forEach(tm => {
        let tmName = tm.getAttribute("name");
        const tmBonusStr = tm.getAttribute("bonus") || "+0";
        const tmBonus = parseInt(tmBonusStr.replace("+", "")) || 0;

        if (customSkillMap) {
          const lowerTm = tmName.toLowerCase().trim();
          if (customSkillMap.traitModSkillMap && customSkillMap.traitModSkillMap.length > 0) {
            const tmMatch = customSkillMap.traitModSkillMap.find(m =>
              m.ranks === Math.abs(tmBonus) &&
              m.fullSkillName.toLowerCase().startsWith(lowerTm)
            );
            if (tmMatch) {
              tmName = tmMatch.fullSkillName;
            }
          }
          if (tmName === tm.getAttribute("name") && customSkillMap.allCustomSkills) {
            const catMatches = customSkillMap.allCustomSkills.filter(cs => cs.baseCategory.toLowerCase() === lowerTm);
            if (catMatches.length === 1) {
              tmName = catMatches[0].fullSkillName;
            }
          }
        }

        traitNotes.push(`${tmName} ${tmBonusStr}`);

        const lowerName = tmName.toLowerCase().trim();
        const abilityMap = {
          "strength": "Strength",
          "dexterity": "Dexterity",
          "constitution": "Constitution",
          "intelligence": "Intelligence",
          "wisdom": "Wisdom",
          "charisma": "Charisma",
          "str": "Strength",
          "dex": "Dexterity",
          "con": "Constitution",
          "int": "Intelligence",
          "wis": "Wisdom",
          "cha": "Charisma"
        };
        const saveMap = {
          "toughness": "Toughness",
          "fortitude": "Fortitude",
          "reflex": "Reflex",
          "will": "Will"
        };
        const combatMap = {
          "attack": "Attack",
          "attack bonus": "Attack",
          "defense": "Defense",
          "defense bonus": "Defense"
        };

        if (abilityMap[lowerName]) {
          const abName = abilityMap[lowerName];
          // In M&M 2E Enhanced Trait, 1 rank = +1 ability score, costing 1 PP per rank
          const abRank = Math.abs(tmBonus);
          parsedSubPowers.push({
            name: `${abName} (+${tmBonus})`,
            type: abName,
            rank: abRank,
            baseCost: 1,
            costType: "per_rank",
            details: "",
            modifiers: [],
            isReduced: tmBonus < 0
          });
        } else if (saveMap[lowerName]) {
          const sName = saveMap[lowerName];
          parsedSubPowers.push({
            name: `${sName} (+${tmBonus})`,
            type: sName,
            rank: Math.abs(tmBonus),
            baseCost: 1,
            costType: "per_rank",
            details: "",
            modifiers: [],
            isReduced: tmBonus < 0
          });
        } else if (combatMap[lowerName]) {
          const cName = combatMap[lowerName];
          parsedSubPowers.push({
            name: `${cName} (+${tmBonus})`,
            type: cName,
            rank: Math.abs(tmBonus),
            baseCost: 2,
            costType: "per_rank",
            details: "",
            modifiers: [],
            isReduced: tmBonus < 0
          });
        } else {
          // Check Skill
          const normSkill = (typeof SKILL_NAME_NORMALIZATION_MAP !== 'undefined') ? SKILL_NAME_NORMALIZATION_MAP[lowerName] : null;
          let matchedSkill = null;
          if (normSkill) {
            matchedSkill = normSkill;
          } else if (typeof SKILLS_LIST !== 'undefined') {
            const skObj = SKILLS_LIST.find(s => s.name.toLowerCase() === lowerName || lowerName.startsWith(s.name.toLowerCase()));
            if (skObj) {
              matchedSkill = tmName.includes(" (") ? tmName : skObj.name;
            }
          } else if (tmName.includes(" (")) {
            matchedSkill = tmName;
          }

          if (matchedSkill) {
            parsedSubPowers.push({
              name: `${matchedSkill} (+${tmBonus})`,
              type: matchedSkill,
              rank: Math.abs(tmBonus),
              baseCost: 0.25,
              costType: "per_rank",
              details: "",
              modifiers: [],
              isReduced: tmBonus < 0
            });
          } else {
            // Check Feat
            let matchedFeat = null;
            if (typeof FEATS_LIST !== 'undefined') {
              const fObj = FEATS_LIST.find(f => f.name.toLowerCase() === lowerName || lowerName.startsWith(f.name.toLowerCase()));
              if (fObj) matchedFeat = fObj.name;
            }
            if (matchedFeat) {
              parsedSubPowers.push({
                name: `${matchedFeat} (${tmBonus})`,
                type: matchedFeat,
                rank: Math.abs(tmBonus),
                baseCost: 1,
                costType: "per_rank",
                details: "",
                modifiers: [],
                isReduced: tmBonus < 0
              });
            } else {
              recordUnmappedDataPoint(audit, "Trait Modification", effectLabel, tmName, tmBonusStr, "Preserved in Notes", "Non-standard or custom trait modification; preserved in notes.");
            }
          }
        }
      });
      if (traitNotes.length > 0) {
        const traitSummary = "Enhanced: " + traitNotes.join(", ");
        userNotes = userNotes ? `${userNotes} | ${traitSummary}` : traitSummary;
      }
    }

    // Chained Feats (e.g. Feats granted by Enhanced Trait or Powers)
    const chainedContainer = getDirectChild(pNode, "chainedfeats");
    if (chainedContainer) {
      const chainedFeatNodes = getDirectChildren(chainedContainer, "chainedfeat");
      chainedFeatNodes.forEach(cf => {
        const cfName = cf.getAttribute("name");
        if (cfName) {
          const parsedCf = deconstructFeatName(cfName, 1);
          parsedSubPowers.push({
            name: `${parsedCf.name} (${parsedCf.ranks})`,
            type: parsedCf.name,
            rank: parsedCf.ranks,
            baseCost: 1,
            costType: "per_rank",
            details: "",
            modifiers: [],
            isReduced: false
          });
          const note = `Feats: ${cfName}`;
          userNotes = userNotes ? `${userNotes} | ${note}` : note;
        }
      });
    }

    // UP Alias Translation
    const alias = POWER_UP_ALIAS_MAP[hlBaseName] ||
                  POWER_UP_ALIAS_MAP[hlBaseName.toLowerCase()] ||
                  Object.entries(POWER_UP_ALIAS_MAP).find(([k]) => k.toLowerCase() === hlBaseName.toLowerCase())?.[1];

    let canonicalEffect = hlBaseName;
    let baseCost = 1;
    let range = "personal";
    let action = "standard";
    let duration = "instant";
    let savingThrow = "none";
    let defaultMods = [];

    // Check if alias is explicitly designated as an unconvertible / refund-only obsolete trait
    if (alias && alias.isUnconvertibleRefund) {
      const reason = alias.reason || `Obsolete Core 2E power '${hlBaseName}' cannot be converted to canonical Ultimate Power structures.`;
      const combinedNotes = [userNotes, descText, summary].filter(Boolean).join(" | ");

      audit.unconvertibleTraits.push({
        name: rawName,
        type: "Power",
        cost: declaredCost,
        reason: reason,
        notes: combinedNotes
      });
      audit.refunds.push(`Unconvertible Power '${rawName}' (${declaredCost} PP): ${reason} Cost refunded in full to your available points pool.`);
      if (combinedNotes) {
        audit.preservedNotes.push(`Preserved unconvertible power text for '${rawName}': ${combinedNotes}`);
      }
      recordUnmappedDataPoint(audit, "Unconvertible Power", effectLabel, rawName, `${declaredCost} PP`, "Refunded in Full", reason);
      return null;
    }

    if (alias) {
      canonicalEffect = alias.effectName;
      baseCost = alias.baseCost;
      range = alias.range;
      action = alias.action;
      duration = alias.duration;
      savingThrow = alias.savingThrow;
      defaultMods = JSON.parse(JSON.stringify(alias.defaultModifiers || []));

      audit.conversions.push(`Translated Core 2E power '${hlBaseName}' to UP Base Effect '${canonicalEffect}' (Profile: ${alias.profileName}).`);
      if (alias.isObsoleteCore) {
        audit.refunds.push(`Obsolete Core 2E power '${hlBaseName}' converted to '${canonicalEffect}' with Fades flaw.`);
      }
    } else {
      // Lookup canonical base effect in POWER_EFFECTS_LIST
      const upBase = (typeof POWER_EFFECTS_LIST !== 'undefined') ? POWER_EFFECTS_LIST.find(e => e.name.toLowerCase() === hlBaseName.toLowerCase()) : null;
      if (upBase) {
        canonicalEffect = upBase.name;
        baseCost = upBase.baseCost || 1;
        range = upBase.range?.toLowerCase() || "personal";
        action = upBase.action?.toLowerCase() || "standard";
        duration = upBase.duration?.toLowerCase() || "instant";
        savingThrow = upBase.savingThrow || "none";
      } else {
        // Lookup canonical prebuilt profile in POWER_PROFILES_LIST
        const upProfile = (typeof POWER_PROFILES_LIST !== 'undefined') ? POWER_PROFILES_LIST.find(p => p.name.toLowerCase() === hlBaseName.toLowerCase()) : null;
        if (upProfile) {
          canonicalEffect = upProfile.effectName;
          baseCost = upProfile.baseCost || 1;
          range = upProfile.range ? upProfile.range.toLowerCase() : "personal";
          action = upProfile.action ? upProfile.action.toLowerCase() : "standard";
          duration = upProfile.duration ? upProfile.duration.toLowerCase() : "instant";
          savingThrow = upProfile.savingThrow || "none";
          defaultMods = JSON.parse(JSON.stringify(upProfile.modifiers || []));
          audit.conversions.push(`Translated Core 2E profile '${hlBaseName}' to canonical UP Base Effect '${canonicalEffect}' (${upProfile.name} profile).`);
        } else {
          // Genuinely unconvertible trait!
          const reason = `Power '${hlBaseName}' is not recognized in canonical Ultimate Power base effects or prebuilt profiles.`;
          const combinedNotes = [userNotes, descText, summary].filter(Boolean).join(" | ");

          audit.unconvertibleTraits.push({
            name: rawName,
            type: "Power",
            cost: declaredCost,
            reason: reason,
            notes: combinedNotes
          });
          audit.refunds.push(`Unconvertible Power '${rawName}' (${declaredCost} PP): ${reason} Cost refunded in full to your available points pool.`);
          if (combinedNotes) {
            audit.preservedNotes.push(`Preserved unconvertible power text for '${rawName}': ${combinedNotes}`);
          }
          recordUnmappedDataPoint(audit, "Unconvertible Power", effectLabel, rawName, `${declaredCost} PP`, "Refunded in Full", reason);
          return null;
        }
      }
    }

    // Parse Options Container (<options>)
    const optContainer = getDirectChild(pNode, "options");
    if (optContainer) {
      const optNodes = getDirectChildren(optContainer, "option");
      optNodes.forEach(opt => {
        const oName = opt.getAttribute("name");
        const oSelection = opt.getAttribute("selection") || "";
        const oInfo = opt.getAttribute("info") || "";
        const oRanks = parseInt(opt.getAttribute("ranks") || 0);

        if (canonicalEffect === "Immunity") {
          const immunityRankMap = {
            "life support": 9,
            "aging": 1,
            "disease": 1,
            "poison": 1,
            "critical hits": 1,
            "suffocation": 2,
            "starvation and thirst": 1,
            "sleep": 1,
            "uncommon descriptor": 2,
            "common descriptor": 5,
            "rare descriptor": 1,
            "damage type": 5,
            "interaction effects": 5,
            "entrapment": 5,
            "fatigue effects": 5,
            "all fortitude effects": 30,
            "all will effects": 30,
            "all lethal physical damage": 20,
            "all lethal energy damage": 20
          };
          const oLower = oName.toLowerCase().trim();
          let r = oRanks || immunityRankMap[oLower] || 1;
          const display = oSelection ? `${oName} (${oSelection})` : oName;
          parsedSubPowers.push({
            name: display,
            type: oName,
            rank: r,
            baseCost: 1,
            costType: "per_rank",
            details: oSelection || oInfo || "",
            modifiers: [],
            isReduced: false
          });
        } else if (canonicalEffect === "Super-Senses") {
          const senseRankMap = {
            "darkvision": 2,
            "x-ray vision": 4,
            "tremorsense": 3,
            "blindsight": 4,
            "postcognition": 4,
            "precognition": 4,
            "accurate": 2
          };
          const oLower = oName.toLowerCase().trim();
          let r = oRanks || senseRankMap[oLower] || 1;
          const display = oSelection ? `${oName} (${oSelection})` : (oInfo ? `${oName} (${oInfo})` : oName);
          parsedSubPowers.push({
            name: display,
            type: oName,
            rank: r,
            baseCost: 1,
            costType: "per_rank",
            details: oSelection || oInfo || "",
            modifiers: [],
            isReduced: false
          });
        } else if (canonicalEffect === "Super-Movement") {
          let r = oRanks || 1;
          const display = oSelection ? `${oName} (${oSelection})` : (oInfo ? `${oName} (${oInfo})` : oName);
          parsedSubPowers.push({
            name: display,
            type: oName,
            rank: r,
            baseCost: 2,
            costType: "per_rank",
            details: oSelection || oInfo || "",
            modifiers: [],
            isReduced: false
          });
        } else if (canonicalEffect === "Comprehend") {
          let r = oRanks || (oName.startsWith("Languages") ? 1 : 2);
          const display = oSelection ? `${oName} (${oSelection})` : oName;
          parsedSubPowers.push({
            name: display,
            type: oName,
            rank: r,
            baseCost: 2,
            costType: "per_rank",
            details: oSelection || oInfo || "",
            modifiers: [],
            isReduced: false
          });
        } else {
          parsedOptions[oName] = oSelection || oInfo || "Yes";
          const optVal = [oSelection, oInfo].filter(Boolean).join(" ");
          if (optVal) {
            userNotes = userNotes ? `${userNotes} | ${oName}: ${optVal}` : `${oName}: ${optVal}`;
          }
          recordUnmappedDataPoint(audit, "Power Option", effectLabel, oName, optVal || "Yes", "Preserved in Options & Notes", "Power option captured in options object and preserved in notes.");
        }
      });
    }

    // Parse Elements Container (<elements>)
    const elemContainer = getDirectChild(pNode, "elements");
    if (elemContainer) {
      const elemNodes = getDirectChildren(elemContainer, "element");
      elemNodes.forEach(el => {
        const elName = el.getAttribute("name");
        const elInfo = el.getAttribute("info") || "";
        parsedOptions[elName] = elInfo || "Yes";

        if (elInfo) {
          userNotes = userNotes ? `${userNotes} | ${elName}: ${elInfo}` : `${elName}: ${elInfo}`;
        }
        recordUnmappedDataPoint(audit, "Sub-Element", effectLabel, elName, elInfo, "Preserved in Options & Notes", "Hero Lab sub-element configured in options object and notes.");
      });
    }

    // Parse Modifiers (Extras, Flaws, Power Feats, Drawbacks)
    const parsedModifiers = parseModifiersFromNode(pNode, audit, effectLabel);
    const modifiers = [...defaultMods, ...parsedModifiers];

    let effectRank = finalRank;
    if (canonicalEffect === "Enhanced Trait" || canonicalEffect === "Enhance Trait") {
      if (parsedSubPowers.length > 0) {
        effectRank = Math.max(1, Math.round(parsedSubPowers.reduce((sum, sp) => sum + (sp.rank * (sp.baseCost || 1)), 0)));
      }
    } else if (canonicalEffect === "Immunity" && parsedSubPowers.length > 0) {
      effectRank = parsedSubPowers.reduce((sum, sp) => sum + (sp.rank || 1), 0);
    } else if (canonicalEffect === "Super-Senses" && parsedSubPowers.length > 0) {
      effectRank = parsedSubPowers.reduce((sum, sp) => sum + (sp.rank || 1), 0);
    }

    const effectObj = {
      id: "eff_" + Math.random().toString(36).substr(2, 9) + "_" + index,
      name: effectLabel,
      effectName: canonicalEffect,
      rank: Math.round(effectRank),
      baseCost: baseCost,
      action: action,
      range: range,
      duration: duration,
      savingThrow: savingThrow,
      association: association,
      linkedTo: null,
      descriptors: descriptors,
      notes: userNotes,
      active: pNode.getAttribute("active") === "no" ? false : (association === "alternate" ? (pNode.getAttribute("active") === "yes") : (pNode.getAttribute("active") !== "no")),
      declaredCost: parseInt(getDirectChild(pNode, "cost")?.getAttribute("value") || 0),
      modifiers: modifiers,
      subPowers: parsedSubPowers,
      options: parsedOptions
    };

    return effectObj;
  }

  // ==========================================================================
  // PARSE HEADQUARTERS
  // ==========================================================================
  function parseHeadquartersNode(hqNode, audit) {
    const hqName = hqNode.getAttribute("name") || "Headquarters";
    const sizeName = getDirectChild(hqNode, "size")?.getAttribute("name") || "Huge";
    const resContainer = getDirectChild(hqNode, "resources");
    let spentFeatures = 0;
    if (resContainer) {
      const featRes = getDirectChildren(resContainer, "resource").find(r => r.getAttribute("name") === "Features");
      if (featRes) spentFeatures = parseInt(featRes.getAttribute("spent") || 0);
    }
    const totalCost = parseInt(getDirectChild(hqNode, "powerpoints")?.getAttribute("value") || 0);

    let sizeVal = 5;
    if (sizeName === "Large") sizeVal = 4;
    else if (sizeName === "Huge") sizeVal = 5;
    else if (sizeName === "Gargantuan") sizeVal = 6;
    else if (sizeName === "Colossal") sizeVal = 7;

    return {
      name: hqName,
      size: sizeVal,
      toughness: 10,
      cost: totalCost,
      features: `${spentFeatures} Features (Imported from Hero Lab)`
    };
  }

  // Helper to safely escape HTML in audit report
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ==========================================================================
  // POINT RECONCILIATION & UP REFUND ENGINE
  // ==========================================================================
  function reconcileCharacterPoints(charData, audit) {
    if (typeof CharacterModel === 'undefined') return;

    const tempChar = new CharacterModel();
    tempChar.deserialize(charData);

    const summary = tempChar.powerPointsSummary;
    audit.reconciledSpent = summary;

    const hlPowers = audit.heroLabSpent["Powers"] || 0;
    const upPowers = summary.powers || 0;
    const unconvPowerCost = (audit.unconvertibleTraits || [])
      .filter(t => t.type === "Power")
      .reduce((sum, t) => sum + (t.cost || 0), 0);

    const convertedHlPowers = Math.max(0, hlPowers - unconvPowerCost);

    // Individual power pricing variance audit
    if (charData.powers && Array.isArray(charData.powers)) {
      charData.powers.forEach(c => {
        const calcCost = tempChar.calculateTotalPowerCost(c);
        if (c.declaredCost !== undefined && c.declaredCost > 0 && calcCost !== c.declaredCost) {
          const diff = c.declaredCost - calcCost;
          audit.warnings.push(`Power '${c.name}' pricing variance: Hero Lab declared ${c.declaredCost} PP vs. MM2CE evaluated ${calcCost} PP (diff: ${diff > 0 ? '-' : '+'}${Math.abs(diff)} PP).`);
          recordUnmappedDataPoint(audit, "Power Pricing Variance", charData.name, c.name, `HL: ${c.declaredCost} PP / MM2CE: ${calcCost} PP`, diff > 0 ? "Under-evaluated" : "Over-evaluated", `Variance of ${Math.abs(diff)} PP in calculated power cost.`);
        }
      });
    }

    if (convertedHlPowers > 0 && upPowers !== convertedHlPowers) {
      if (upPowers < convertedHlPowers) {
        const refundAmount = convertedHlPowers - upPowers;
        audit.refunds.push(`Ultimate Power optimization: Converted powers cost ${upPowers} PP vs. Hero Lab's ${convertedHlPowers} PP. ${refundAmount} PP refunded to your available points pool.`);
      } else if (upPowers > convertedHlPowers) {
        const extraRequired = upPowers - convertedHlPowers;
        audit.warnings.push(`UP Canonical Pricing: Converted powers evaluate to ${upPowers} PP (+${extraRequired} PP adjustment from Hero Lab's ${convertedHlPowers} PP).`);
      }
    }

    // Feats audit
    const hlFeats = audit.heroLabSpent["Feats"] || 0;
    const unconvFeatsCost = (audit.unconvertibleTraits || [])
      .filter(t => t.type === "Feat")
      .reduce((sum, t) => sum + (t.cost || 0), 0);
    const convertedHlFeats = Math.max(0, hlFeats - unconvFeatsCost);

    if (convertedHlFeats > 0 && summary.feats !== convertedHlFeats) {
      audit.conversions.push(`Feat points re-tallied: ${summary.feats} PP in MM2CE vs. ${convertedHlFeats} PP in Hero Lab.`);
    }

    // Abilities audit & Enhanced Trait breakdown
    ["STR", "DEX", "CON", "INT", "WIS", "CHA"].forEach(k => {
      const enh = tempChar.enhancedTraits?.abilities?.[k] || 0;
      if (enh > 0) {
        const base = tempChar.getBaseAbilityScore(k);
        const total = tempChar.getAbilityScore(k);
        const rank = tempChar.getAbilityRank(k);
        const sign = rank >= 0 ? `+${rank}` : `${rank}`;
        const nameMap = { STR: "Strength", DEX: "Dexterity", CON: "Constitution", INT: "Intelligence", WIS: "Wisdom", CHA: "Charisma" };
        const aName = nameMap[k] || k;
        audit.conversions.push(`${aName} Enhanced Trait: Base purchased score ${base} (${Math.max(0, base - 10)} PP) + ${enh} Enhanced Trait from powers/devices = Total effective score ${total} (${sign} modifier).`);
      }
    });

    // Execute comprehensive Rule Compliance & Costing / Bundling Audit
    auditRuleComplianceAndCosting(charData, audit, tempChar);
  }

  // ==========================================================================
  // RULE COMPLIANCE & COSTING / IMPROPER BUNDLING AUDIT ENGINE
  // ==========================================================================
  function auditRuleComplianceAndCosting(charData, audit, tempChar) {
    const hlSpent = audit.heroLabSpent || {};
    const summary = tempChar.powerPointsSummary;
    const pl = tempChar.powerLevel || 10;
    const totalAllowed = tempChar.totalPointsAllowed || (pl * 15);

    if (!audit.complianceAlerts) audit.complianceAlerts = [];
    if (!audit.costingComparison) audit.costingComparison = [];

    // 1. Comprehensive Costing Cross-Check Table
    const categoriesToCheck = [
      { key: "Abilities", label: "Abilities", hl: hlSpent["Abilities"], app: summary.abilities },
      { key: "Combat", label: "Combat (Attack / Defense)", hl: hlSpent["Combat"], app: summary.combat },
      { key: "Saves", label: "Resistances (Saves)", hl: hlSpent["Saves"], app: summary.resistances },
      { key: "Skills", label: "Skills", hl: hlSpent["Skills"], app: summary.skills },
      { key: "Feats", label: "Feats", hl: hlSpent["Feats"], app: summary.feats },
      { key: "Powers", label: "Powers", hl: hlSpent["Powers"], app: summary.powers }
    ];

    if (hlSpent["Drawbacks"] !== undefined && hlSpent["Drawbacks"] !== 0) {
      categoriesToCheck.push({ key: "Drawbacks", label: "Drawbacks", hl: hlSpent["Drawbacks"], app: summary.drawbacks || 0 });
    }

    let totalHlSpent = 0;
    let hasHlSpent = false;

    categoriesToCheck.forEach(cat => {
      const hlVal = typeof cat.hl === "number" ? cat.hl : null;
      if (hlVal !== null) {
        totalHlSpent += hlVal;
        hasHlSpent = true;
      }
      const appVal = cat.app || 0;
      const diff = hlVal !== null ? (appVal - hlVal) : 0;
      const status = hlVal === null ? "unspecified" : (diff === 0 ? "match" : (diff > 0 ? "variance_over" : "variance_under"));
      audit.costingComparison.push({
        category: cat.label,
        hl: hlVal !== null ? hlVal : "-",
        app: appVal,
        diff: hlVal !== null ? diff : "-",
        status: status
      });

      if (diff !== 0 && hlVal !== null) {
        let explanation = "";
        if (cat.key === "Feats") {
          explanation = "Check for combo feat package headers (e.g. Fighting Styles) or power-granted feats.";
        } else if (cat.key === "Powers") {
          explanation = "Powers evaluated under canonical Ultimate Power pricing rules.";
        } else if (cat.key === "Skills") {
          explanation = "Skills evaluated at 1 PP per 4 ranks (standard M&M 2E rule).";
        }
        audit.complianceAlerts.push({
          type: "Costing Variance",
          severity: "warning",
          category: cat.label,
          message: `${cat.label} point variance: Hero Lab spent ${hlVal} PP vs. MM2CE evaluated ${appVal} PP (diff: ${diff > 0 ? `+${diff}` : diff} PP). ${explanation}`
        });
      }
    });

    // Total Spent Cross-Check
    const totalDiff = hasHlSpent ? (summary.totalSpent - totalHlSpent) : 0;
    audit.costingComparison.push({
      category: "Total Points Spent",
      hl: hasHlSpent ? totalHlSpent : "-",
      app: summary.totalSpent,
      diff: hasHlSpent ? totalDiff : "-",
      status: (!hasHlSpent || totalDiff === 0) ? "match" : (totalDiff > 0 ? "variance_over" : "variance_under")
    });

    // 2. Budget Limits Check
    if (summary.totalSpent > totalAllowed) {
      audit.complianceAlerts.push({
        type: "Budget Exceeded",
        severity: "error",
        category: "Points Budget",
        message: `Character spent ${summary.totalSpent} PP, exceeding the campaign allowance of ${totalAllowed} PP by ${summary.totalSpent - totalAllowed} PP.`
      });
    }

    // 3. Improper Bundling Check: Device & Container Capacity
    if (charData.powers && Array.isArray(charData.powers)) {
      charData.powers.forEach(c => {
        const isContainer = c.containerType === "device_easy" || c.containerType === "device_hard" || c.containerType === "container";
        if (isContainer && c.effects && c.effects.length > 0) {
          const rank = parseInt(c.deviceRank) || parseInt(c.effects[0].rank) || 1;
          const capacity = rank * 5;

          let totalContained = 0;
          if (c.effects.length > 1 || (c.effects.length === 1 && !c.effects[0].containedPowers)) {
            totalContained = c.effects.reduce((sum, eff) => {
              const effCost = tempChar.calculateEffectCost ? tempChar.calculateEffectCost(eff) : (eff.declaredCost || (eff.rank * (eff.baseCost || 1)));
              return sum + (effCost || 0);
            }, 0);
          } else if (Array.isArray(c.effects[0].containedPowers) && c.effects[0].containedPowers.length > 0) {
            totalContained = c.effects[0].containedPowers.reduce((sum, p) => sum + (parseFloat(p.cost) || 0), 0);
          }

          if (totalContained > capacity) {
            audit.complianceAlerts.push({
              type: "Improper Bundling",
              severity: "error",
              category: "Container Capacity",
              trait: c.name,
              message: `Container '${c.name}' (Rank ${rank}, capacity: ${capacity} PP) holds ${totalContained} PP of traits, exceeding its written rule limit by ${totalContained - capacity} PP.`
            });
          }
        }

        // 4. Improper Bundling Check: Array Alternate Powers
        if (c.containerType === "array" && c.effects && c.effects.length > 1) {
          const baseEff = c.effects[0];
          const baseCost = tempChar.calculateEffectCost ? tempChar.calculateEffectCost(baseEff) : (baseEff.rank * (baseEff.baseCost || 1));
          const isMagic = baseEff.effectName === "Magic" || baseEff.name.toLowerCase().includes("magic") || (baseEff.descriptors && baseEff.descriptors.toLowerCase().includes("magic"));
          const arrayBudget = isMagic ? Math.max(baseCost, (baseEff.rank || 1) * 2) : Math.max(baseCost, c.declaredCost || 0);
          
          let activeNonDynamicCount = 0;
          const activeAltNames = [];

          if (baseEff.active && baseEff.effectName !== "Array") {
            activeNonDynamicCount++;
            activeAltNames.push(baseEff.name);
          }

          c.effects.slice(1).forEach(altEff => {
            const altCost = tempChar.calculateEffectCost ? tempChar.calculateEffectCost(altEff) : (altEff.rank * (altEff.baseCost || 1));
            if (altCost > arrayBudget) {
              audit.complianceAlerts.push({
                type: "Improper Bundling",
                severity: "error",
                category: "Array Alternate Power",
                trait: c.name,
                message: `Alternate Power '${altEff.name}' in array '${c.name}' evaluates to ${altCost} PP, exceeding the array budget (${arrayBudget} PP). Under M&M 2E rules, an Alternate Power cannot cost more than the array budget.`
              });
            }

            if (altEff.active && altEff.association !== "dynamic") {
              activeNonDynamicCount++;
              activeAltNames.push(altEff.name);
            }
          });

          if (activeNonDynamicCount > 1) {
            audit.complianceAlerts.push({
              type: "Improper Activation",
              severity: "warning",
              category: "Array Alternate Power",
              trait: c.name,
              message: `Array '${c.name}' has multiple non-dynamic alternate powers active simultaneously (${activeAltNames.join(", ")}). Under written rules (Core p. 108), only one non-dynamic alternate power can be active at a time.`
            });
          }
        }
      });
    }

    // 5. Written Rules & Power Level (PL) Caps
    // Defense + Toughness Cap <= 2 * PL
    const baseDef = tempChar.combat?.DEF || 0;
    const dodgeFocusRanks = (tempChar.feats && (tempChar.feats["Dodge Focus"] || tempChar.feats["(Combat) Dodge Focus"])) || 0;
    const totalDef = baseDef + dodgeFocusRanks;
    const baseCon = tempChar.abilities?.CON || 0;
    const purchasedTough = tempChar.purchasedResistances?.Toughness || 0;
    let powerProtection = 0;
    if (charData.powers) {
      charData.powers.forEach(c => {
        (c.effects || []).forEach(e => {
          if (e.effectName === "Protection" || e.name === "Force Field" || e.name === "Armor") {
            powerProtection += parseInt(e.rank) || 0;
          }
        });
      });
    }
    const totalTough = baseCon + purchasedTough + powerProtection;
    if ((totalDef + totalTough) > (2 * pl)) {
      audit.complianceAlerts.push({
        type: "PL Cap Exceeded",
        severity: "warning",
        category: "Defense & Toughness",
        message: `Defense + Toughness trade-off (+${totalDef} Defense, +${totalTough} Toughness = ${totalDef + totalTough}) exceeds the PL ${pl} cap of ${2 * pl} by ${(totalDef + totalTough) - (2 * pl)}.`
      });
    }

    // Skill Bonus Cap <= PL + 10
    if (charData.skills) {
      for (const [skName, skRanks] of Object.entries(charData.skills)) {
        const skBonus = (parseInt(skRanks) || 0);
        if (skBonus > (pl + 10)) {
          audit.complianceAlerts.push({
            type: "PL Cap Exceeded",
            severity: "warning",
            category: "Skill Cap",
            message: `Skill '${skName}' (${skBonus} ranks) exceeds the maximum bonus limit (+${pl + 10}) for PL ${pl}.`
          });
        }
      }
    }

    // 6. Include Hero Lab native validation reports
    if (audit.heroLabValidationAlerts && audit.heroLabValidationAlerts.length > 0) {
      audit.heroLabValidationAlerts.forEach(valMsg => {
        audit.complianceAlerts.push({
          type: "Hero Lab Rule Alert",
          severity: "warning",
          category: "Validation",
          message: valMsg
        });
      });
    }
  }

  // ==========================================================================
  // IMPORT AUDIT REPORT MODAL & RENDERER
  // ==========================================================================
  function showImportAuditModal(audit) {
    let modal = document.getElementById("importAuditModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "modal-overlay";
      modal.id = "importAuditModal";
      modal.innerHTML = `
        <div class="info-popup-box" style="width: 92%; max-width: 900px; max-height: 88vh; display: flex; flex-direction: column;">
          <div class="info-popup-header" style="padding: 10px 16px;">
            <h3 id="importAuditTitle">📋 Hero Lab Import Audit Report</h3>
            <button class="info-popup-close" id="modalImportAuditClose">✕</button>
          </div>
          <div class="info-popup-body" id="importAuditBody" style="flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 16px;"></div>
          <div class="modal-footer" style="padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); background: var(--bg-card);">
            <button type="button" class="btn btn-secondary" id="btnCopyImportAudit">📋 Copy Audit Log</button>
            <button type="button" class="btn" id="btnCloseImportAudit">Close &amp; Review Sheet</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    // Always attach event handlers unconditionally (ensures close & copy always work)
    const closeBtn = modal.querySelector("#modalImportAuditClose");
    const btnClose = modal.querySelector("#btnCloseImportAudit");
    const btnCopy = modal.querySelector("#btnCopyImportAudit");

    const closeModal = () => modal.classList.remove("active");
    if (closeBtn) closeBtn.onclick = closeModal;
    if (btnClose) btnClose.onclick = closeModal;
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };

    if (btnCopy) {
      btnCopy.onclick = () => {
        const txt = generatePlaintextAudit(audit);
        navigator.clipboard.writeText(txt).then(() => {
          showToast("Audit log copied to clipboard!", "success");
        }).catch(() => {
          showToast("Could not copy log automatically.", "warning");
        });
      };
    }

    const bodyEl = modal.querySelector("#importAuditBody");
    if (bodyEl) {
      bodyEl.innerHTML = renderAuditHtml(audit);
    }

    modal.classList.add("active");
  }

  function renderAuditHtml(audit) {
    const hlSpent = audit.heroLabSpent || {};
    const recSpent = audit.reconciledSpent || {};
    const unconvTraits = audit.unconvertibleTraits || [];
    const totalRefundedTraitsPP = unconvTraits.reduce((sum, t) => sum + (t.cost || 0), 0);

    return `
      <!-- Header Summary Card -->
      <div style="background: rgba(2, 132, 199, 0.08); border: 1.5px solid rgba(2, 132, 199, 0.3); border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="margin: 0; font-size: 1.25rem; color: var(--accent-primary);">${escapeHtml(audit.heroName)}</h2>
          <div style="font-size: var(--font-size-secondary); color: var(--text-secondary); margin-top: 2px;">
            Power Level ${audit.powerLevel} • Hero Lab File: <strong>${escapeHtml(audit.fileName)}</strong> ${audit.playerName ? `• Player: ${escapeHtml(audit.playerName)}` : ""}
          </div>
        </div>
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <span class="audit-badge audit-info">Hero Lab: ${audit.heroLabTotalPP} PP</span>
          <span class="audit-badge audit-refund">Reconciled: ${recSpent.totalSpent || audit.heroLabTotalPP} PP</span>
          ${totalRefundedTraitsPP > 0 ? `<span class="audit-badge" style="background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); font-weight: 600;">+${totalRefundedTraitsPP} PP Unconvertible Refund</span>` : ""}
        </div>
      </div>

      <!-- Portfolio Lead Auto-Detection Notice -->
      ${(audit.otherCharactersInPortfolio && audit.otherCharactersInPortfolio.length > 0) ? `
        <div style="background: rgba(2, 132, 199, 0.05); border: 1px solid rgba(2, 132, 199, 0.25); border-radius: 6px; padding: 10px 14px; font-size: var(--font-size-secondary);">
          ℹ️ <strong>Lead Hero Selected:</strong> Successfully loaded designated hero <strong>${escapeHtml(audit.heroName)}</strong>.
          <div style="color: var(--text-secondary); margin-top: 4px;">
            Background profiles also stored in this portfolio archive: <em>${escapeHtml(audit.otherCharactersInPortfolio.join(", "))}</em>.
          </div>
        </div>
      ` : ""}

      <!-- Rule Compliance & Costing Verification Section -->
      <div style="background: var(--bg-card); border: 1.5px solid ${audit.complianceAlerts && audit.complianceAlerts.length > 0 ? 'rgba(234, 179, 8, 0.4)' : 'rgba(16, 185, 129, 0.4)'}; border-radius: 6px; padding: 14px 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
          <h4 style="margin: 0; color: ${audit.complianceAlerts && audit.complianceAlerts.length > 0 ? '#eab308' : '#10b981'}; display: flex; align-items: center; gap: 8px; font-size: 1rem;">
            <span>${audit.complianceAlerts && audit.complianceAlerts.length > 0 ? '⚖️' : '🛡️'}</span>
            <span>Rule Compliance &amp; Costing Verification</span>
          </h4>
          <span class="audit-badge" style="background: ${audit.complianceAlerts && audit.complianceAlerts.length > 0 ? 'rgba(234, 179, 8, 0.15)' : 'rgba(16, 185, 129, 0.15)'}; color: ${audit.complianceAlerts && audit.complianceAlerts.length > 0 ? '#eab308' : '#10b981'}; border: 1px solid ${audit.complianceAlerts && audit.complianceAlerts.length > 0 ? 'rgba(234, 179, 8, 0.3)' : 'rgba(16, 185, 129, 0.3)'}; font-weight: 600;">
            ${audit.complianceAlerts && audit.complianceAlerts.length > 0 ? `${audit.complianceAlerts.length} Rule Alert${audit.complianceAlerts.length > 1 ? 's' : ''}` : '✓ 100% Rules Compliant'}
          </span>
        </div>
        <p style="margin: 0 0 12px 0; font-size: var(--font-size-secondary); color: var(--text-secondary); line-height: 1.4;">
          Automatic cross-check comparing Hero Lab declared resource spending against canonical Mutants &amp; Masterminds 2E / Ultimate Power rules, auditing for improper bundling, container over-capacity, and power level caps:
        </p>

        <!-- Costing Comparison Table -->
        ${(audit.costingComparison && audit.costingComparison.length > 0) ? `
          <div style="margin-bottom: 12px; border: 1px solid var(--border-color); border-radius: 4px; overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
              <thead>
                <tr style="background: rgba(0,0,0,0.15); border-bottom: 1.5px solid var(--border-color);">
                  <th style="padding: 6px 10px;">Trait Category</th>
                  <th style="padding: 6px 10px; text-align: center;">Hero Lab Declared</th>
                  <th style="padding: 6px 10px; text-align: center;">MM2CE Evaluated</th>
                  <th style="padding: 6px 10px; text-align: center;">Variance</th>
                  <th style="padding: 6px 10px; text-align: right;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${audit.costingComparison.map(row => {
                  const isMatch = row.status === "match";
                  const isTotal = row.category === "Total Points Spent";
                  return `
                    <tr style="border-bottom: 1px solid var(--border-color); ${isTotal ? 'font-weight: 600; background: rgba(2, 132, 199, 0.05);' : ''}">
                      <td style="padding: 6px 10px;">${escapeHtml(row.category)}</td>
                      <td style="padding: 6px 10px; text-align: center;">${row.hl}${typeof row.hl === 'number' ? ' PP' : ''}</td>
                      <td style="padding: 6px 10px; text-align: center;">${row.app} PP</td>
                      <td style="padding: 6px 10px; text-align: center; color: ${isMatch ? 'var(--text-secondary)' : (row.diff > 0 ? '#ef4444' : '#10b981')};">
                        ${typeof row.diff === 'number' ? (row.diff === 0 ? '0 PP' : (row.diff > 0 ? `+${row.diff} PP` : `${row.diff} PP`)) : row.diff}
                      </td>
                      <td style="padding: 6px 10px; text-align: right;">
                        <span class="audit-badge" style="background: ${isMatch ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; color: ${isMatch ? '#10b981' : '#f87171'}; border: 1px solid ${isMatch ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}; font-size: 0.75rem;">
                          ${isMatch ? '✓ Match' : (row.diff > 0 ? '⚠️ Over' : '⚠️ Under')}
                        </span>
                      </td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        ` : ''}

        <!-- Rule Compliance & Improper Bundling Alerts -->
        ${(audit.complianceAlerts && audit.complianceAlerts.length > 0) ? `
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${audit.complianceAlerts.map(a => `
              <div style="background: ${a.severity === 'error' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(234, 179, 8, 0.08)'}; border: 1px solid ${a.severity === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(234, 179, 8, 0.3)'}; border-radius: 4px; padding: 8px 12px; display: flex; flex-direction: column; gap: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
                  <strong style="color: ${a.severity === 'error' ? '#ef4444' : '#eab308'}; font-size: 0.85rem;">
                    ${a.severity === 'error' ? '❌' : '⚠️'} ${escapeHtml(a.type)}${a.category ? `: ${escapeHtml(a.category)}` : ''}
                  </strong>
                  ${a.trait ? `<span class="audit-badge audit-info" style="font-size: 0.75rem;">${escapeHtml(a.trait)}</span>` : ''}
                </div>
                <div style="font-size: var(--font-size-secondary); color: var(--text-primary); line-height: 1.35;">
                  ${escapeHtml(a.message)}
                </div>
              </div>
            `).join("")}
          </div>
        ` : `
          <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 4px; padding: 8px 12px; font-size: var(--font-size-secondary); color: #10b981; display: flex; align-items: center; gap: 8px;">
            <span>✓</span>
            <span>Zero improper bundling or written rule violations detected.</span>
          </div>
        `}
      </div>

      <!-- Unconvertible Traits & Full Point Refunds Section -->
      ${unconvTraits.length > 0 ? `
        <div style="background: rgba(239, 68, 68, 0.08); border: 1.5px solid rgba(239, 68, 68, 0.4); border-radius: 6px; padding: 14px 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
            <h4 style="margin: 0; color: #ef4444; display: flex; align-items: center; gap: 8px; font-size: 1rem;">
              <span>⚠️</span>
              <span>Unconvertible Traits &amp; Full Point Refunds (${unconvTraits.length})</span>
            </h4>
            <span class="audit-badge" style="background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); font-weight: 600;">
              Total Refunded: ${totalRefundedTraitsPP} PP
            </span>
          </div>
          <p style="margin: 0 0 12px 0; font-size: var(--font-size-secondary); color: var(--text-secondary); line-height: 1.4;">
            The following traits from Hero Lab could not be automatically converted to canonical Ultimate Power or MM2CE structures. Their declared Power Point costs have been refunded in full to your character's available points pool, and all original descriptions have been preserved below for manual review or re-allocation:
          </p>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${unconvTraits.map(t => `
              <div style="background: var(--bg-card); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 6px; padding: 10px 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; margin-bottom: 4px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-weight: 600; color: var(--text-primary); font-size: 0.95rem;">${escapeHtml(t.name)}</span>
                    <span class="audit-badge" style="background: rgba(2, 132, 199, 0.15); color: var(--accent-primary); font-size: 0.75rem;">${escapeHtml(t.type || "Trait")}</span>
                  </div>
                  <span class="audit-badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 600;">
                    💰 +${t.cost || 0} PP Refunded
                  </span>
                </div>
                <div style="font-size: var(--font-size-secondary); color: #f87171; margin-bottom: ${t.notes ? '6px' : '0'};">
                  <strong>Reason:</strong> ${escapeHtml(t.reason)}
                </div>
                ${t.notes ? `
                  <div style="font-size: 0.8rem; color: var(--text-secondary); background: rgba(0,0,0,0.15); border-left: 3px solid var(--border-color); padding: 4px 8px; border-radius: 0 4px 4px 0; margin-top: 4px;">
                    <em>Preserved Specs / Notes:</em> ${escapeHtml(t.notes)}
                  </div>
                ` : ""}
              </div>
            `).join("")}
          </div>
        </div>
      ` : `
        <div style="background: rgba(16, 185, 129, 0.08); border: 1.5px solid rgba(16, 185, 129, 0.35); border-radius: 6px; padding: 10px 14px; display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.2rem; color: #10b981;">✓</span>
          <div style="font-size: var(--font-size-secondary); color: var(--text-primary);">
            <strong>Clean Canonical Conversion:</strong> All traits were successfully converted to canonical Ultimate Power / MM2CE structures. No unconvertible traits were refunded.
          </div>
        </div>
      `}

      <!-- Granular HL Data Points & Translation Audit -->
      ${(audit.unmappedDataPoints && audit.unmappedDataPoints.length > 0) ? `
        <div style="background: var(--bg-card); border: 1.5px solid rgba(2, 132, 199, 0.4); border-radius: 6px; padding: 14px 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
            <h4 style="margin: 0; color: var(--accent-primary); display: flex; align-items: center; gap: 8px; font-size: 1rem;">
              <span>🔍</span>
              <span>Granular HL Data Points &amp; Translation Audit (${audit.unmappedDataPoints.length})</span>
            </h4>
            <span class="audit-badge audit-info">
              Itemized HL Traits &amp; Adaptations
            </span>
          </div>
          <p style="margin: 0 0 12px 0; font-size: var(--font-size-secondary); color: var(--text-secondary); line-height: 1.4;">
            Itemized record of every specific Hero Lab data point, custom modifier, sub-element, or option evaluated during import and how it was translated, adapted, or refunded into native MM2CE structures:
          </p>
          <div style="max-height: 360px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: 4px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
              <thead>
                <tr style="position: sticky; top: 0; background: var(--bg-card); border-bottom: 1.5px solid var(--border-color); z-index: 1;">
                  <th style="padding: 6px 8px; border-bottom: 1.5px solid var(--border-color);">Category</th>
                  <th style="padding: 6px 8px; border-bottom: 1.5px solid var(--border-color);">Parent Trait</th>
                  <th style="padding: 6px 8px; border-bottom: 1.5px solid var(--border-color);">HL Data Point</th>
                  <th style="padding: 6px 8px; border-bottom: 1.5px solid var(--border-color);">Value / Spec</th>
                  <th style="padding: 6px 8px; border-bottom: 1.5px solid var(--border-color);">Disposition</th>
                  <th style="padding: 6px 8px; border-bottom: 1.5px solid var(--border-color);">Details / Notes</th>
                </tr>
              </thead>
              <tbody>
                ${audit.unmappedDataPoints.map(dp => {
                  let dispColor = "#10b981";
                  let dispBg = "rgba(16, 185, 129, 0.15)";
                  let dispBorder = "rgba(16, 185, 129, 0.3)";
                  const dLow = (dp.disposition || "").toLowerCase();
                  if (dLow.includes("refund")) {
                    dispColor = "#f87171";
                    dispBg = "rgba(239, 68, 68, 0.15)";
                    dispBorder = "rgba(239, 68, 68, 0.3)";
                  } else if (dLow.includes("generic") || dLow.includes("noted")) {
                    dispColor = "#eab308";
                    dispBg = "rgba(234, 179, 8, 0.15)";
                    dispBorder = "rgba(234, 179, 8, 0.3)";
                  } else if (dLow.includes("preserved")) {
                    dispColor = "var(--accent-primary)";
                    dispBg = "rgba(2, 132, 199, 0.15)";
                    dispBorder = "rgba(2, 132, 199, 0.3)";
                  }
                  return `
                    <tr style="border-bottom: 1px solid var(--border-color);">
                      <td style="padding: 6px 8px; font-weight: 600; color: var(--text-primary); white-space: nowrap;">
                        <span class="audit-badge" style="background: rgba(2, 132, 199, 0.12); color: var(--accent-primary); font-size: 0.75rem;">
                          ${escapeHtml(dp.category)}
                        </span>
                      </td>
                      <td style="padding: 6px 8px; color: var(--text-primary); font-weight: 500;">${escapeHtml(dp.parent)}</td>
                      <td style="padding: 6px 8px; font-weight: 600;">${escapeHtml(dp.label)}</td>
                      <td style="padding: 6px 8px; color: var(--text-secondary); font-family: monospace;">${escapeHtml(dp.value || "—")}</td>
                      <td style="padding: 6px 8px; white-space: nowrap;">
                        <span class="audit-badge" style="background: ${dispBg}; color: ${dispColor}; border: 1px solid ${dispBorder}; font-size: 0.75rem; font-weight: 600;">
                          ${escapeHtml(dp.disposition)}
                        </span>
                      </td>
                      <td style="padding: 6px 8px; color: var(--text-secondary); font-size: 0.8rem;">${escapeHtml(dp.reason)}</td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        </div>
      ` : ""}

      <!-- Point Refunds & Reconciliation -->
      ${audit.refunds.length > 0 ? `
        <div style="background: rgba(16, 185, 129, 0.08); border: 1.5px solid rgba(16, 185, 129, 0.4); border-radius: 6px; padding: 12px 14px;">
          <h4 style="margin: 0 0 8px 0; color: #10b981; display: flex; align-items: center; gap: 6px;">
            💰 Ultimate Power Refunds &amp; Savings (${audit.refunds.length})
          </h4>
          <ul style="margin: 0; padding-left: 20px; font-size: var(--font-size-secondary); line-height: 1.45;">
            ${audit.refunds.map(r => `<li>${escapeHtml(r)}</li>`).join("")}
          </ul>
        </div>
      ` : ""}

      <!-- Canonical UP Translations & Conversions -->
      ${audit.conversions.length > 0 ? `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px 14px;">
          <h4 style="margin: 0 0 8px 0; color: var(--accent-primary); display: flex; align-items: center; gap: 6px;">
            ⚡ Ultimate Power Base Effect &amp; Profile Mapping (${audit.conversions.length})
          </h4>
          <ul style="margin: 0; padding-left: 20px; font-size: var(--font-size-secondary); line-height: 1.45;">
            ${audit.conversions.map(c => `<li>${escapeHtml(c)}</li>`).join("")}
          </ul>
        </div>
      ` : ""}

      <!-- Imported Library Plans -->
      ${(audit.libraryPlans && audit.libraryPlans.length > 0) ? `
        <div style="background: var(--bg-card); border: 1.5px solid rgba(139, 92, 246, 0.4); border-radius: 6px; padding: 14px 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
            <h4 style="margin: 0; color: #a78bfa; display: flex; align-items: center; gap: 8px; font-size: 1rem;">
              <span>📜</span>
              <span>Imported Library Plans (${audit.libraryPlans.length} items converted to Plans)</span>
            </h4>
            <span class="audit-badge" style="background: rgba(139, 92, 246, 0.15); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.3); font-weight: 600;">
              Ready in Plans Tab (0 PP Cost)
            </span>
          </div>
          <p style="margin: 0 0 10px 0; font-size: var(--font-size-secondary); color: var(--text-secondary); line-height: 1.4;">
            Powers, devices, rituals, and inventions stored on Hero Lab's Library tab have been converted into modular blueprints on your <strong>Plans</strong> tab. As unbudgeted blueprints, they do not consume character Power Points.
          </p>
          <div style="display: flex; flex-direction: column; gap: 6px; font-size: var(--font-size-secondary); max-height: 240px; overflow-y: auto;">
            ${audit.libraryPlans.map(p => `
              <div style="padding: 6px 10px; background: rgba(139, 92, 246, 0.06); border-radius: 4px; display: flex; justify-content: space-between; align-items: center; gap: 8px;">
                <span><strong>${escapeHtml(p.name)}</strong> (${escapeHtml(p.type)} • ${escapeHtml(p.effectsSummary)})</span>
                <span class="audit-badge ${p.active ? 'audit-success' : 'audit-info'}" style="font-size: 0.75rem;">${p.active ? 'Active' : 'Archived'}</span>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <!-- Attached Companions, Mecha & Headquarters -->
      ${(audit.companions.length > 0 || audit.installations.length > 0) ? `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px 14px;">
          <h4 style="margin: 0 0 8px 0; color: var(--accent-primary); display: flex; align-items: center; gap: 6px;">
            🤖 Attached Portfolio Assets (${audit.companions.length + audit.installations.length})
          </h4>
          <div style="display: flex; flex-direction: column; gap: 6px; font-size: var(--font-size-secondary);">
            ${audit.companions.map(c => `
              <div style="padding: 6px 10px; background: rgba(2, 132, 199, 0.05); border-radius: 4px; display: flex; justify-content: space-between;">
                <span><strong>${escapeHtml(c.name)}</strong> (${escapeHtml(c.type.toUpperCase())} • PL ${c.powerLevel})</span>
                <span class="audit-badge audit-info">Ready in Companions Tab</span>
              </div>
            `).join("")}
            ${audit.installations.map(h => `
              <div style="padding: 6px 10px; background: rgba(2, 132, 199, 0.05); border-radius: 4px; display: flex; justify-content: space-between;">
                <span><strong>${escapeHtml(h.name)}</strong> (Headquarters • Cost: ${h.cost} PP)</span>
                <span class="audit-badge audit-info">Ready in Installations Tab</span>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <!-- In-Play Hero Points & Active Conditions -->
      ${(audit.heroPointsImported !== null || (audit.conditionsImported && Object.keys(audit.conditionsImported).length > 0)) ? `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px 14px;">
          <h4 style="margin: 0 0 8px 0; color: #0284c7; display: flex; align-items: center; gap: 6px;">
            🛡️ In-Play Status &amp; Conditions (Hero Lab In-Play Tab)
          </h4>
          <div style="display: flex; flex-direction: column; gap: 6px; font-size: var(--font-size-secondary);">
            <div style="padding: 6px 10px; background: rgba(2, 132, 199, 0.05); border-radius: 4px; display: flex; justify-content: space-between;">
              <span><strong>Hero Points:</strong> ${audit.heroPointsImported !== null ? audit.heroPointsImported : 1} available</span>
              <span class="audit-badge audit-info">In-Play Pool</span>
            </div>
            ${audit.conditionsImported && Object.keys(audit.conditionsImported).length > 0 ? `
              <div style="padding: 6px 10px; background: rgba(245, 158, 11, 0.08); border-radius: 4px;">
                <strong>Active Conditions:</strong> ${Object.entries(audit.conditionsImported).map(([k, v]) => typeof v === 'number' ? `${k} ×${v}` : k).join(", ")}
              </div>
            ` : `
              <div style="padding: 6px 10px; background: rgba(16, 185, 129, 0.05); border-radius: 4px; color: var(--text-muted);">
                Active Conditions: Normal / Unhindered
              </div>
            `}
          </div>
        </div>
      ` : ""}

      <!-- Preserved Custom Notes & Specs -->
      ${audit.preservedNotes.length > 0 ? `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px 14px;">
          <h4 style="margin: 0 0 8px 0; color: var(--text-secondary); display: flex; align-items: center; gap: 6px;">
            📝 Preserved User Notes &amp; Custom Specs (${audit.preservedNotes.length})
          </h4>
          <ul style="margin: 0; padding-left: 20px; font-size: var(--font-size-secondary); line-height: 1.45; color: var(--text-secondary);">
            ${audit.preservedNotes.map(n => `<li>${escapeHtml(n)}</li>`).join("")}
          </ul>
        </div>
      ` : ""}
    `;
  }

  function generatePlaintextAudit(audit) {
    let out = `HERO LAB IMPORT AUDIT REPORT: ${audit.heroName}\n`;
    out += `File: ${audit.fileName} | PL: ${audit.powerLevel} | Total PP: ${audit.heroLabTotalPP}\n`;
    if (audit.otherCharactersInPortfolio && audit.otherCharactersInPortfolio.length > 0) {
      out += `Other Portfolio Characters: ${audit.otherCharactersInPortfolio.join(", ")}\n`;
    }
    out += `\n`;

    if (audit.costingComparison && audit.costingComparison.length > 0) {
      out += `=== RULE COMPLIANCE & COSTING VERIFICATION ===\n`;
      out += `Category                              | Hero Lab | MM2CE   | Variance | Status\n`;
      out += `--------------------------------------------------------------------------------\n`;
      audit.costingComparison.forEach(row => {
        const cat = String(row.category).padEnd(37, ' ');
        const hl = String(row.hl + (typeof row.hl === 'number' ? ' PP' : '')).padEnd(8, ' ');
        const app = String(row.app + ' PP').padEnd(7, ' ');
        const diffStr = typeof row.diff === 'number' ? (row.diff === 0 ? '0 PP' : (row.diff > 0 ? `+${row.diff} PP` : `${row.diff} PP`)) : String(row.diff);
        const diff = diffStr.padEnd(8, ' ');
        const status = row.status === 'match' ? 'Match' : (row.diff > 0 ? 'Over' : 'Under');
        out += `${cat} | ${hl} | ${app} | ${diff} | ${status}\n`;
      });
      out += `\n`;
    }

    if (audit.complianceAlerts && audit.complianceAlerts.length > 0) {
      out += `=== RULE COMPLIANCE & IMPROPER BUNDLING ALERTS (${audit.complianceAlerts.length}) ===\n`;
      audit.complianceAlerts.forEach(a => {
        out += `* [${a.type}] ${a.category ? `${a.category}: ` : ''}${a.trait ? `(${a.trait}) ` : ''}${a.message}\n`;
      });
      out += `\n`;
    }

    out += `=== UNCONVERTIBLE TRAITS & FULL POINT REFUNDS ===\n`;
    if (audit.unconvertibleTraits && audit.unconvertibleTraits.length > 0) {
      audit.unconvertibleTraits.forEach(t => {
        out += `* [${t.type}] ${t.name} (+${t.cost || 0} PP Refunded)\n`;
        out += `  Reason: ${t.reason}\n`;
        if (t.notes) out += `  Preserved Notes: ${t.notes}\n`;
      });
    } else {
      out += `* None. All traits were cleanly converted to canonical Ultimate Power / MM2CE structures.\n`;
    }
    out += `\n`;

    if (audit.unmappedDataPoints && audit.unmappedDataPoints.length > 0) {
      out += `=== GRANULAR HL DATA POINTS & TRANSLATION AUDIT (${audit.unmappedDataPoints.length}) ===\n`;
      audit.unmappedDataPoints.forEach(dp => {
        out += `* [${dp.category}] ${dp.parent} -> ${dp.label}${dp.value ? ` (${dp.value})` : ""}\n`;
        out += `  Disposition: ${dp.disposition}\n`;
        if (dp.reason) out += `  Details: ${dp.reason}\n`;
      });
      out += `\n`;
    }

    if (audit.refunds.length > 0) {
      out += `=== ULTIMATE POWER REFUNDS & SAVINGS ===\n`;
      audit.refunds.forEach(r => out += `* ${r}\n`);
      out += `\n`;
    }

    if (audit.conversions.length > 0) {
      out += `=== CANONICAL UP TRANSLATIONS ===\n`;
      audit.conversions.forEach(c => out += `* ${c}\n`);
      out += `\n`;
    }

    if (audit.libraryPlans && audit.libraryPlans.length > 0) {
      out += `=== IMPORTED LIBRARY PLANS (${audit.libraryPlans.length}) ===\n`;
      audit.libraryPlans.forEach(p => {
        out += `* ${p.name} [${p.type}] (${p.effectsSummary}) - ${p.active ? 'Active' : 'Archived'} (0 PP Cost, Ready in Plans Tab)\n`;
      });
      out += `\n`;
    }

    if (audit.companions.length > 0 || audit.installations.length > 0) {
      out += `=== ATTACHED ASSETS ===\n`;
      audit.companions.forEach(c => out += `* Companion: ${c.name} (${c.type}, PL ${c.powerLevel})\n`);
      audit.installations.forEach(h => out += `* HQ: ${h.name} (Cost: ${h.cost} PP)\n`);
      out += `\n`;
    }

    if (audit.heroPointsImported !== null || (audit.conditionsImported && Object.keys(audit.conditionsImported).length > 0)) {
      out += `=== IN-PLAY STATUS & CONDITIONS ===\n`;
      out += `* Hero Points: ${audit.heroPointsImported !== null ? audit.heroPointsImported : 1}\n`;
      if (audit.conditionsImported && Object.keys(audit.conditionsImported).length > 0) {
        const condStr = Object.entries(audit.conditionsImported).map(([k, v]) => typeof v === 'number' ? `${k} x${v}` : k).join(", ");
        out += `* Active Conditions: ${condStr}\n`;
      } else {
        out += `* Active Conditions: Normal / Unhindered\n`;
      }
      out += `\n`;
    }

    if (audit.preservedNotes.length > 0) {
      out += `=== PRESERVED CUSTOM NOTES ===\n`;
      audit.preservedNotes.forEach(n => out += `* ${n}\n`);
      out += `\n`;
    }

    return out;
  }

  // Global Escape key listener to dismiss active POR importer modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const auditModal = document.getElementById("importAuditModal");
      if (auditModal && auditModal.classList.contains("active")) {
        auditModal.classList.remove("active");
      }
      const pickerModal = document.getElementById("porCharacterPickerModal");
      if (pickerModal && pickerModal.classList.contains("active")) {
        pickerModal.classList.remove("active");
      }
    }
  });

})();
