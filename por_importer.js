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
    "swim": "Swim"
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
      const player = node.getAttribute("playername") || "";
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

    await executeImport(zip, doc, leadNode, fileName, otherCharacters);
  }

  // ==========================================================================
  // RECURSIVE CHARACTER & XML INGESTION
  // ==========================================================================
  async function executeImport(zip, doc, rootCharNode, fileName, otherCharacters = []) {
    const resNode = getDirectChild(rootCharNode, "resources");
    const totalPpAttr = resNode?.getAttribute("totalpp");
    let totalAllowed = totalPpAttr ? parseInt(totalPpAttr) : null;
    if (!totalAllowed || isNaN(totalAllowed)) {
      const ppVal = parseInt(getDirectChild(rootCharNode, "powerpoints")?.getAttribute("value") || 0);
      const plVal = parseInt(getDirectChild(rootCharNode, "powerlevel")?.getAttribute("value") || 10);
      totalAllowed = ppVal > 0 ? ppVal : (plVal * 15);
    }

    const audit = {
      fileName: fileName,
      heroName: rootCharNode.getAttribute("name") || "Imported Hero",
      playerName: rootCharNode.getAttribute("playername") || "",
      powerLevel: parseInt(getDirectChild(rootCharNode, "powerlevel")?.getAttribute("value") || 10),
      heroLabTotalPP: totalAllowed,
      heroLabSpent: {},
      reconciledSpent: {},
      refunds: [],
      warnings: [],
      conversions: [],
      companions: [],
      installations: [],
      preservedNotes: [],
      unconvertibleTraits: [],
      unmappedDataPoints: [],
      otherCharactersInPortfolio: (otherCharacters || []).map(c => c.getAttribute("name")).filter(Boolean)
    };

    // Parse Hero Lab declared resource totals strictly from root resources
    if (resNode) {
      const rNodes = getDirectChildren(resNode, "resource");
      rNodes.forEach(r => {
        const rName = r.getAttribute("name");
        const spent = parseFloat(r.getAttribute("spent") || 0);
        audit.heroLabSpent[rName] = spent;
      });
    }

    // Parse primary character
    const primaryData = parseCharacterNode(rootCharNode, audit, true);

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
      const mName = mNode.getAttribute("name") || "Asset";

      if (nature === "headquarters" || type.startsWith("HQ:")) {
        // Convert to Headquarters / Installation
        const hqObj = parseHeadquartersNode(mNode, audit);
        primaryData.installations.push(hqObj);
        audit.installations.push(hqObj);
      } else {
        // Convert to Minion, Mecha, or Metamorph Form Companion
        const compChar = parseCharacterNode(mNode, audit, false);
        let compType = "minion";
        if (nature === "mecha" || type.toLowerCase() === "mecha" || compChar.isMecha) {
          compType = "mecha";
        } else if (mName.toLowerCase().includes("metamorph") || type.toLowerCase().includes("metamorph")) {
          compType = "metamorph";
        } else if (type.toLowerCase().includes("sidekick")) {
          compType = "sidekick";
        }

        const compEntry = {
          id: "comp_" + Math.random().toString(36).substr(2, 9),
          type: compType,
          name: compChar.name,
          powerLevel: compChar.powerLevel || primaryData.powerLevel,
          totalPointsAllowed: compChar.totalPointsAllowed || (compChar.powerLevel * 15),
          characterData: compChar
        };
        primaryData.companions.push(compEntry);
        audit.companions.push(compEntry);
      }
    });

    // Point Reconciliation Engine: Validate MM2CE model cost against declared Hero Lab costs
    reconcileCharacterPoints(primaryData, audit);

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
      FileManager.currentFileName = fileName;
      FileManager.updateFileStatusUI();
    }

    if (typeof refreshAllUI === 'function') {
      refreshAllUI();
    } else if (typeof refreshUI === 'function') {
      refreshUI();
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
  function parseCharacterNode(charNode, audit, isPrimary = true) {
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

    const charObj = {
      name: charNode.getAttribute("name") || (isPrimary ? "Imported Hero" : "Minion"),
      playerName: charNode.getAttribute("playername") || "",
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
      history: ""
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
            let rank = 0;
            if (!isNaN(costVal)) {
              rank = costVal / 2;
            } else if (isMecha) {
              rank = Math.round(baseVal / 2);
            } else {
              rank = (baseVal - 10) / 2;
            }
            charObj.abilities[key] = rank;
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
    const powersContainer = getDirectChild(charNode, "powers");
    if (powersContainer) {
      const allPowers = getDirectChildren(powersContainer, "power");
      allPowers.forEach(p => {
        const cfCont = getDirectChild(p, "chainedfeats");
        if (cfCont) {
          getDirectChildren(cfCont, "chainedfeat").forEach(cf => {
            const cfName = cf.getAttribute("name");
            if (cfName) chainedFeatNames.add(cfName.trim());
          });
        }
      });
    }

    const featsContainer = getDirectChild(charNode, "feats");
    if (featsContainer) {
      const featNodes = getDirectChildren(featsContainer, "feat");
      featNodes.forEach(f => {
        const rawFeatName = f.getAttribute("name");
        const ranksAttr = parseInt(f.getAttribute("ranks") || 1);
        const featCost = parseInt(getDirectChild(f, "cost")?.getAttribute("value") || ranksAttr);
        const featDesc = getDirectChild(f, "description")?.textContent.trim() || "";

        // Skip feats granted by powers
        if (chainedFeatNames.has(rawFeatName.trim())) {
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
        const container = parsePowerContainer(pNode, pIdx, audit);
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
  function parsePowerContainer(powerNode, index, audit) {
    const rawName = powerNode.getAttribute("name");
    const summary = powerNode.getAttribute("summary") || "";
    const declaredCost = parseInt(getDirectChild(powerNode, "cost")?.getAttribute("value") || 0);

    const deconstructed = deconstructHeroLabPowerName(rawName);
    const containerName = deconstructed.customName || deconstructed.hlBaseName;

    // Check if this is a Device
    const isDevice = deconstructed.hlBaseName.toLowerCase() === "device" || summary.includes("Hard to lose") || summary.includes("Easy to lose");
    const altContainer = getDirectChild(powerNode, "alternatepowers");
    const altNodes = altContainer ? getDirectChildren(altContainer, "power") : [];
    const isArray = altNodes.length > 0;

    let containerType = "normal";
    if (isDevice) {
      containerType = summary.includes("Easy to lose") ? "device_easy" : "device_hard";
    } else if (isArray) {
      containerType = "array";
    }

    const container = {
      id: "cont_" + Math.random().toString(36).substr(2, 9) + "_" + index,
      name: containerName,
      containerType: containerType,
      collapsed: false,
      declaredCost: declaredCost,
      effects: []
    };

    if (isDevice) {
      // In M&M 2E / UP: Easy to Lose = 3 PP/rank; Hard to Lose = 4 PP/rank
      const isEasyToLose = containerType === "device_easy" || summary.includes("Easy to lose");
      const deviceBaseCost = isEasyToLose ? 3 : 4;
      const deviceRank = Math.round(deconstructed.ranks || 1);

      // Parse modifiers directly on the device container (power feats, drawbacks)
      const deviceModifiers = parseModifiersFromNode(powerNode, audit, containerName);

      // Check summary for Restricted / Restricted use
      const restrictedMatch = summary.match(/Restricted(?: use)?(?:\s*\((.*?)\))?/i);
      if (restrictedMatch && !deviceModifiers.some(m => m.name.toLowerCase().startsWith("restricted"))) {
        deviceModifiers.push({
          name: "Restricted",
          category: "feat",
          cost: 1,
          costType: "flat",
          ranks: 1,
          details: restrictedMatch[1] || ""
        });
      }

      // Parse child effects inside Device (<otherpowers>)
      const otherContainer = getDirectChild(powerNode, "otherpowers");
      const otherPowers = otherContainer ? getDirectChildren(otherContainer, "power") : [];
      const containedPowersList = [];

      otherPowers.forEach((childPower, cIdx) => {
        const childRawName = childPower.getAttribute("name");
        const childDecon = deconstructHeroLabPowerName(childRawName);
        const childCost = parseInt(getDirectChild(childPower, "cost")?.getAttribute("value") || 0);
        const childRank = Math.round(childDecon.ranks || parseFloat(childPower.getAttribute("ranks") || 1));
        const childDesc = getDirectChild(childPower, "description")?.textContent.trim() || "";
        const childSummary = childPower.getAttribute("summary") || "";

        // Check if child power can be recognized/converted
        const childAlias = POWER_UP_ALIAS_MAP[childDecon.hlBaseName] ||
          Object.entries(POWER_UP_ALIAS_MAP).find(([k]) => k.toLowerCase() === childDecon.hlBaseName.toLowerCase())?.[1];
        const childBase = (typeof POWER_EFFECTS_LIST !== 'undefined')
          ? POWER_EFFECTS_LIST.find(e => e.name.toLowerCase() === childDecon.hlBaseName.toLowerCase())
          : null;
        const childProfile = (typeof POWER_PROFILES_LIST !== 'undefined')
          ? POWER_PROFILES_LIST.find(p => p.name.toLowerCase() === childDecon.hlBaseName.toLowerCase())
          : null;

        if (!childAlias && !childBase && !childProfile) {
          // Unconvertible child power inside device
          const reason = `Device power '${childDecon.hlBaseName}' is not recognized in canonical Ultimate Power base effects or profiles.`;
          const notesStr = [childDesc, childSummary].filter(Boolean).join(" | ");
          audit.unconvertibleTraits.push({
            name: `${childRawName} (in ${containerName})`,
            type: "Power",
            cost: childCost,
            reason: reason,
            notes: notesStr
          });
          audit.refunds.push(`Unconvertible Device Power '${childRawName}' in '${containerName}' (${childCost} PP inside device): ${reason} Points refunded to device capacity.`);
          if (notesStr) {
            audit.preservedNotes.push(`Preserved unconvertible device power notes for '${childRawName}': ${notesStr}`);
          }
          recordUnmappedDataPoint(audit, "Unconvertible Power", containerName, childRawName, `${childCost} PP (Device)`, "Refunded to Device", reason);
          return;
        }

        containedPowersList.push({
          id: "cp_" + Math.random().toString(36).substr(2, 9) + "_" + cIdx,
          name: childRawName,
          effectName: childAlias ? childAlias.effectName : (childProfile ? childProfile.effectName : childDecon.hlBaseName),
          rank: childRank,
          cost: childCost
        });
      });

      const deviceEffect = {
        id: "eff_" + Math.random().toString(36).substr(2, 9) + "_" + index,
        name: rawName,
        effectName: "Container",
        rank: deviceRank,
        baseCost: deviceBaseCost,
        action: "none",
        range: "personal",
        duration: "continuous",
        savingThrow: "none",
        association: "primary",
        linkedTo: null,
        descriptors: "Device",
        notes: `Device (${isEasyToLose ? "Easy to lose" : "Hard to lose"}, Rank ${deviceRank}). Contains ${containedPowersList.length} powers.`,
        modifiers: deviceModifiers,
        subPowers: [],
        isContainer: true,
        formActive: true,
        containedPowers: containedPowersList
      };

      container.effects.push(deviceEffect);
    } else {
      // Primary effect
      const primaryEff = parseSinglePowerEffect(powerNode, 0, audit, "primary");

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
        const altEff = parseSinglePowerEffect(altNode, aIdx + 1, audit, isDynamic ? "dynamic" : "alternate");
        if (altEff) {
          container.effects.push(altEff);
        }
      });
    }

    if (container.effects.length === 0) {
      return null;
    }

    return container;
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
  function parseSinglePowerEffect(pNode, index, audit, association = "primary") {
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
        const tmName = tm.getAttribute("name");
        const tmBonusStr = tm.getAttribute("bonus") || "+0";
        const tmBonus = parseInt(tmBonusStr.replace("+", "")) || 0;
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
          const abRank = tmBonus / 2;
          parsedSubPowers.push({
            name: `${abName} (+${tmBonus})`,
            type: abName,
            rank: abRank,
            baseCost: 2,
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
            if (skObj) matchedSkill = skObj.name;
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

    if (audit.companions.length > 0 || audit.installations.length > 0) {
      out += `=== ATTACHED ASSETS ===\n`;
      audit.companions.forEach(c => out += `* Companion: ${c.name} (${c.type}, PL ${c.powerLevel})\n`);
      audit.installations.forEach(h => out += `* HQ: ${h.name} (Cost: ${h.cost} PP)\n`);
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
