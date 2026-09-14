/**
 * Mutants & Masterminds 2nd Edition Character Editor - Print Sheet & PDF Generator
 * Complete Tactical Dossier Architecture:
 *  Page 1: Tactical Combat Sheet (Header, Point Summary, Hero Points, Abilities, Defenses, Offense, Attacks Table, Feats, Skills)
 *  Page 2: Powers, Devices, Equipment, Vehicles & Headquarters
 *  Page 3: Plans & Blueprints (Inventions, Rituals), Drawbacks, Complications, Motivation & Character Dossier
 * Enforces strict typography floor: no text smaller than 8pt (10.67px).
 */

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const ATTACK_EFFECT_NAMES = new Set([
  'Damage', 'Blast', 'Strike', 'Corrosion', 'Disintegrate', 'Hellfire',
  'Drain', 'Snare', 'Stun', 'Nauseate', 'Suffocate', 'Paralyze',
  'Mind Control', 'Mind Reading', 'Emotion Control', 'Illusion', 'Confuse',
  'Nullify', 'Transform', 'Trip', 'Dazzle', 'Fatigue'
]);

function calculateEffectSaveDc(eff, effectiveRank = null) {
  if (!eff || !eff.effectName) return null;
  const effName = eff.effectName;
  const rank = parseInt(effectiveRank || eff.rank || eff.ranks || 1) || 1;

  // Check Alternate Save
  let altSave = null;
  if (Array.isArray(eff.modifiers)) {
    const altMod = eff.modifiers.find(m => m.name && m.name.includes("Alternate Save"));
    if (altMod) {
      const match = altMod.name.match(/Alternate Save\s*\(([^)]+)\)/i);
      if (match) altSave = match[1];
    }
  }

  if (['Damage', 'Blast', 'Strike', 'Corrosion', 'Disintegrate', 'Hellfire'].includes(effName)) {
    return `${altSave || "Toughness"} DC ${15 + rank}`;
  }
  if (['Snare', 'Trip', 'Dazzle'].includes(effName)) {
    return `${altSave || "Reflex"} DC ${10 + rank}`;
  }
  if (['Stun', 'Nauseate', 'Suffocate', 'Drain', 'Fatigue', 'Transform'].includes(effName)) {
    return `${altSave || "Fortitude"} DC ${10 + rank}`;
  }
  if (['Paralyze', 'Mind Control', 'Mind Reading', 'Emotion Control', 'Illusion', 'Confuse'].includes(effName)) {
    return `${altSave || "Will"} DC ${10 + rank}`;
  }
  if (effName === 'Nullify') {
    return `Opposed Check (+${rank}) vs Will/Power`;
  }
  if (effName === 'Teleport') {
    return null;
  }
  if (eff.savingThrow && eff.savingThrow.toLowerCase() !== 'none' && eff.savingThrow.toLowerCase() !== 'harmless') {
    return `${altSave || eff.savingThrow} DC ${10 + rank}`;
  }
  return null;
}

function isDevicePower(power) {
  if (!power) return false;
  if (power.containerType === 'device_hard' || power.containerType === 'device_easy' || power.planType === 'device' || power.isDevice) return true;
  if (power.descriptors && (power.descriptors === 'Device' || power.descriptors.includes('Device'))) return true;
  if (Array.isArray(power.effects) && power.effects.some(e => e && (e.effectName === 'Device' || e.name === 'Device' || e.isDevice))) return true;
  return false;
}

function extractHeroAttacks(char) {
  const attacks = [];
  const derived = char.derivedStats || {};
  const effFeats = char.effectiveFeats || char.feats || {};
  const baseAtk = char.getBaseCombatRank ? char.getBaseCombatRank("ATK") : (parseInt(char.combat.ATK) || 0);
  const enhAtk = (char.enhancedTraits && char.enhancedTraits.combat && char.enhancedTraits.combat.ATK) || 0;
  const atkMod = baseAtk + enhAtk;
  const meleeBonus = derived.meleeAttack !== undefined ? derived.meleeAttack : (atkMod + (effFeats["Attack Focus (Melee)"] || effFeats["Attack Focus"] || 0));
  const rangedBonus = derived.rangedAttack !== undefined ? derived.rangedAttack : (atkMod + (effFeats["Attack Focus (Ranged)"] || 0));
  const strRank = char.getAbilityRank ? (char.getAbilityRank("STR") || 0) : (parseInt(char.abilities.STR) || 0);

  // 1. Unarmed Strike
  attacks.push({
    name: "👊 Unarmed Strike",
    bonus: meleeBonus >= 0 ? `+${meleeBonus}` : `${meleeBonus}`,
    range: "Touch",
    saveDc: `Toughness DC ${15 + strRank}`,
    notes: "Bludgeoning (Non-lethal) • Crit 20 • Staged"
  });

  // 2. Equipment / Gear Weapons
  const gearItems = char.gear || char.equipment || [];
  gearItems.forEach(item => {
    if (item.damage || (item.type && (item.type.includes("Weapon") || item.type.includes("Melee") || item.type.includes("Ranged")))) {
      const isRanged = item.type && item.type.includes("Ranged");
      const bonus = isRanged ? rangedBonus : meleeBonus;
      const dmg = parseInt(item.damage) || 0;
      const crit = item.crit || "20";
      attacks.push({
        name: `⚔️ ${item.name || "Weapon"}`,
        bonus: bonus >= 0 ? `+${bonus}` : `${bonus}`,
        range: item.range || (isRanged ? "Ranged" : "Touch"),
        saveDc: `Toughness DC ${15 + dmg}`,
        notes: `${item.damageType || "Physical"} • Crit ${crit} • ${item.notes || ''}`
      });
    }
  });

  // 3. Powers with Attack Effects
  (char.powers || []).forEach(power => {
    const isDev = isDevicePower(power);
    const pIcon = isDev ? '⚙️ ' : '⚡ ';
    (power.effects || []).forEach(eff => {
      const effName = eff.effectName || "";
      const isAttack = ATTACK_EFFECT_NAMES.has(effName) || eff.isAttack;
      const saveDc = calculateEffectSaveDc(eff);

      if (isAttack || saveDc) {
        const rank = parseInt(eff.rank || eff.ranks || 1) || 1;
        const rangeStr = (eff.range || "").toLowerCase();
        const isPerception = rangeStr.includes("perception");
        const isArea = rangeStr.includes("area") || (eff.modifiers || []).some(m => (m.name || '').includes("Area"));
        const isRanged = rangeStr.includes("ranged");

        let atkStr = "";
        if (isPerception) {
          atkStr = "Perception (No roll)";
        } else if (isArea) {
          atkStr = "Area (Reflex for half)";
        } else if (isRanged) {
          atkStr = rangedBonus >= 0 ? `+${rangedBonus}` : `${rangedBonus}`;
        } else {
          atkStr = meleeBonus >= 0 ? `+${meleeBonus}` : `${meleeBonus}`;
        }

        const lethal = (eff.modifiers || []).some(m => (m.name || '').toLowerCase().includes("lethal"));
        const descParts = [];
        if (eff.descriptors) {
          descParts.push(Array.isArray(eff.descriptors) ? eff.descriptors.join(', ') : eff.descriptors);
        }
        if (lethal) descParts.push("Lethal");
        descParts.push("Crit 20");

        const isAlt = eff.association === 'alternate';
        const displayName = (eff.name && eff.name !== "New Effect" && eff.name !== effName)
          ? `${pIcon}${eff.name} [${effName} ${rank}]`
          : `${pIcon}${power.name || effName} [Rank ${rank}]`;

        attacks.push({
          name: isAlt ? `${displayName} (Alt)` : displayName,
          bonus: atkStr,
          range: eff.range || (isRanged ? "Ranged" : "Touch"),
          saveDc: saveDc || "—",
          notes: descParts.join(" • ")
        });
      }
    });
  });

  return attacks;
}

function buildPrintHeader(char) {
  let html = `<div class="print-header">`;
  const pName = char.playerName ? `<span class="player-name">${char.isMecha ? 'Pilot / Creator' : 'Player'}: ${escapeHtml(char.playerName)}</span>` : '';
  const mechaTag = char.isMecha ? ` <span style="font-size: 9.5pt; color: #0284c7; font-weight: bold; margin-left: 8px;">[🤖 CONSTRUCT MECHA]</span>` : '';
  const identityStr = char.identity ? ` <span class="print-muted" style="font-size: 9.5pt; font-weight: normal; margin-left: 6px;">(${escapeHtml(char.identity)})</span>` : '';

  html += `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
      <div>
        <h1 style="margin: 0; font-size: 16pt; font-weight: 800; text-transform: uppercase; color: #0f172a;">
          ${escapeHtml(char.name || 'Unnamed Hero')}${identityStr}${mechaTag}
        </h1>
        <div style="font-size: 8.5pt; color: #475569; margin-top: 2px;">
          ${pName ? `${pName} • ` : ''}<strong>Power Level:</strong> ${char.powerLevel || 10}
        </div>
      </div>
      <div class="print-hp-box">
        <span style="font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #334155;">HERO POINTS</span>
        <div style="display: flex; gap: 5px; margin-top: 3px;">
          <span class="print-hp-check"></span>
          <span class="print-hp-check"></span>
          <span class="print-hp-check"></span>
          <span class="print-hp-check"></span>
          <span class="print-hp-check"></span>
        </div>
      </div>
    </div>
  `;

  // Point Budget Breakdown Ribbon
  const unit = char.pointUnit || (char.isMecha ? "MP" : "PP");
  const abilPP = char.getAbilityPP ? char.getAbilityPP() : 0;
  const combatPP = char.getCombatPP ? char.getCombatPP() : 0;
  const savesPP = char.getResistancePP ? char.getResistancePP() : 0;
  const skillsPP = char.getSkillPP ? char.getSkillPP() : 0;
  const featsPP = char.getFeatsPP ? char.getFeatsPP() : 0;
  let powersPP = 0;
  (char.powers || []).forEach(p => {
    if (char.calculateTotalPowerCost) powersPP += char.calculateTotalPowerCost(p);
  });
  let drawbacksPP = 0;
  (char.drawbacks || []).forEach(d => {
    drawbacksPP += parseInt(d.points || d.cost || 0) || 0;
  });
  const totalSpent = (char.powerPointsSummary && char.powerPointsSummary.totalSpent) || (abilPP + combatPP + savesPP + skillsPP + featsPP + powersPP - drawbacksPP);
  const allowed = char.totalPointsAllowed || ((char.powerLevel || 10) * 15);

  html += `
    <div class="print-header-details">
      <span><strong>${unit} Summary:</strong> Abilities ${abilPP} • Combat ${combatPP} • Saves ${savesPP} • Skills ${skillsPP} • Feats ${featsPP} • Powers ${powersPP}${drawbacksPP > 0 ? ` • Drawbacks -${drawbacksPP}` : ''} = <strong>${totalSpent} / ${allowed} ${unit}</strong></span>
    </div>
  `;

  // Physical Traits Ribbon if available
  const bio = [];
  if (char.sex) bio.push(`<strong>Gender:</strong> ${escapeHtml(char.sex)}`);
  if (char.age) bio.push(`<strong>Age:</strong> ${escapeHtml(char.age)}`);
  if (char.height) bio.push(`<strong>Height:</strong> ${escapeHtml(char.height)}`);
  if (char.weight) bio.push(`<strong>Weight:</strong> ${escapeHtml(char.weight)}`);
  if (char.eyes) bio.push(`<strong>Eyes:</strong> ${escapeHtml(char.eyes)}`);
  if (char.hair) bio.push(`<strong>Hair:</strong> ${escapeHtml(char.hair)}`);
  if (char.sizeCategory && char.sizeCategory !== 'Medium') bio.push(`<strong>Size:</strong> ${escapeHtml(char.sizeCategory)}`);
  if (char.titles) bio.push(`<strong>Titles:</strong> ${escapeHtml(char.titles)}`);

  if (bio.length > 0) {
    html += `
      <div style="font-size: 8pt; color: #475569; margin-top: 3px; padding-top: 3px; border-top: 1px dotted #cbd5e1; display: flex; flex-wrap: wrap; gap: 4px 12px;">
        ${bio.join(" • ")}
      </div>
    `;
  }

  html += `</div>`;
  return html;
}

const DEFAULT_PRINT_OPTIONS = {
  detailedHq: true,
  detailedVehicles: true,
  detailedPlans: false
};

function getPrintOptions() {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = localStorage.getItem('mm2e_print_options');
      if (stored) {
        return Object.assign({}, DEFAULT_PRINT_OPTIONS, JSON.parse(stored));
      }
    } catch (e) {
      // ignore JSON parse error
    }
  }
  return Object.assign({}, DEFAULT_PRINT_OPTIONS);
}

function setPrintOptions(opts) {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem('mm2e_print_options', JSON.stringify(opts));
    } catch (e) {
      // ignore
    }
  }
}

function syncPrintOptionControls() {
  const opts = getPrintOptions();
  const chkHq = document.getElementById("chkPrintDetailedHq");
  const chkVeh = document.getElementById("chkPrintDetailedVehicles");
  const chkPlans = document.getElementById("chkPrintDetailedPlans");

  if (chkHq) chkHq.checked = !!opts.detailedHq;
  if (chkVeh) chkVeh.checked = !!opts.detailedVehicles;
  if (chkPlans) chkPlans.checked = !!opts.detailedPlans;
}

function updatePrintOptions() {
  const opts = getPrintOptions();
  const chkHq = document.getElementById("chkPrintDetailedHq");
  const chkVeh = document.getElementById("chkPrintDetailedVehicles");
  const chkPlans = document.getElementById("chkPrintDetailedPlans");

  if (chkHq) opts.detailedHq = chkHq.checked;
  if (chkVeh) opts.detailedVehicles = chkVeh.checked;
  if (chkPlans) opts.detailedPlans = chkPlans.checked;

  setPrintOptions(opts);
  generatePrintSheet();
}

function formatHqSize(size) {
  if (typeof size === 'string' && isNaN(parseInt(size))) return size;
  const num = parseInt(size);
  if (isNaN(num)) return 'Medium';
  if (num <= -2) return 'Diminutive';
  if (num === -1) return 'Small';
  if (num === 0) return 'Medium';
  if (num === 1) return 'Large';
  if (num === 2) return 'Huge';
  if (num === 3) return 'Gargantuan';
  if (num === 4) return 'Colossal';
  return 'Awesome';
}

function formatVehicleSize(size) {
  if (typeof size === 'string' && isNaN(parseInt(size))) return size;
  const num = parseInt(size);
  if (isNaN(num)) return 'Medium';
  if (num <= -2) return 'Diminutive';
  if (num === -1) return 'Small';
  if (num === 0) return 'Medium';
  if (num === 1) return 'Large';
  if (num === 2) return 'Huge';
  if (num === 3) return 'Gargantuan';
  if (num === 4) return 'Colossal';
  return 'Awesome';
}

function calculateVehicleMph(spd) {
  const s = parseInt(spd);
  if (isNaN(s) || s <= 0) return '';
  const mph = Math.round(Math.pow(2, s - 1) * 10);
  return ` (${mph} MPH)`;
}

function buildDetailedHqCard(hq) {
  const sizeName = formatHqSize(hq.size);
  const rawFeats = (hq.features || "").split(/[,;]\s*/).map(s => s.trim()).filter(Boolean);
  let featsHtml = '';
  if (rawFeats.length > 0) {
    featsHtml = `
      <div style="margin-top: 6px;">
        <span class="print-muted" style="font-size: 8pt; font-weight: 700; text-transform: uppercase;">Features &amp; Facilities:</span>
        <div class="print-hq-features-grid">
          ${rawFeats.map(f => `<span class="print-feature-pill">${escapeHtml(f)}</span>`).join('')}
        </div>
      </div>
    `;
  }
  return `
    <div class="print-hq-card print-avoid-break">
      <div class="print-hq-header">
        <div>
          <span class="print-hq-title">🏰 ${escapeHtml(hq.name || 'Headquarters')}</span>
          <span class="print-muted" style="font-size: 8.5pt; margin-left: 8px;">
            Size: <strong>${escapeHtml(sizeName)}</strong> • Toughness: <strong>${hq.toughness || 10}</strong>
          </span>
        </div>
        <span class="print-value" style="font-size: 9pt;">${hq.cost || 0} EP</span>
      </div>
      <div class="print-row-group" style="font-size: 8.5pt;">
        <div class="print-row">
          <span><strong>Structure Dimensions &amp; Scale</strong></span>
          <span class="print-value print-muted">${escapeHtml(sizeName)} Scale (Toughness ${hq.toughness || 10})</span>
        </div>
        ${featsHtml}
      </div>
    </div>
  `;
}

function buildDetailedVehicleCard(vh) {
  const sizeName = formatVehicleSize(vh.size);
  const mphStr = calculateVehicleMph(vh.speed);
  const strVal = parseInt(vh.strength) || 0;
  const strMod = Math.floor((strVal - 10) / 2);
  const rawFeats = (vh.features || "").split(/[,;]\s*/).map(s => s.trim()).filter(Boolean);
  let featsHtml = '';
  if (rawFeats.length > 0) {
    featsHtml = `
      <div style="margin-top: 6px;">
        <span class="print-muted" style="font-size: 8pt; font-weight: 700; text-transform: uppercase;">Features &amp; Systems:</span>
        <div class="print-hq-features-grid">
          ${rawFeats.map(f => `<span class="print-feature-pill">${escapeHtml(f)}</span>`).join('')}
        </div>
      </div>
    `;
  }
  return `
    <div class="print-vehicle-card print-avoid-break">
      <div class="print-vehicle-header">
        <div>
          <span class="print-vehicle-title">🏎️ ${escapeHtml(vh.name || 'Vehicle')}</span>
          <span class="print-muted" style="font-size: 8.5pt; margin-left: 8px;">
            Size: <strong>${escapeHtml(sizeName)}</strong>
          </span>
        </div>
        <span class="print-value" style="font-size: 9pt;">${vh.cost || 0} EP</span>
      </div>
      <div class="print-stat-badges" style="margin-bottom: 6px;">
        <div class="print-badge-item">
          <div class="print-badge-label">STRENGTH</div>
          <div class="print-badge-value">${strVal}</div>
          <div class="print-badge-sub">Mod: ${strMod >= 0 ? '+' : ''}${strMod}</div>
        </div>
        <div class="print-badge-item">
          <div class="print-badge-label">SPEED</div>
          <div class="print-badge-value">${vh.speed || 0}</div>
          <div class="print-badge-sub">${mphStr || 'Ground'}</div>
        </div>
        <div class="print-badge-item">
          <div class="print-badge-label">DEFENSE</div>
          <div class="print-badge-value">${vh.defense || 10}</div>
          <div class="print-badge-sub">Maneuver</div>
        </div>
        <div class="print-badge-item">
          <div class="print-badge-label">TOUGHNESS</div>
          <div class="print-badge-value">+${vh.toughness || 0}</div>
          <div class="print-badge-sub">Armor</div>
        </div>
      </div>
      ${featsHtml}
    </div>
  `;
}

function buildDetailedBlueprintCard(char, imp) {
  const cost = (char.calculateTotalPowerCost) ? char.calculateTotalPowerCost(imp) : (imp.cost || 0);
  const planTypeStr = imp.planType === 'ritual' ? 'Ritual' : (imp.planType === 'invention' ? 'Invention' : 'Blueprint');
  
  let effsHtml = '';
  (imp.effects || []).forEach(eff => {
    const r = eff.rank !== undefined ? eff.rank : (eff.ranks || 1);
    const dc = calculateEffectSaveDc(eff);
    const dcBadge = dc ? ` <span class="print-dc-badge">${escapeHtml(dc)}</span>` : '';
    const nameStr = eff.name && eff.name !== eff.effectName ? `${eff.name} [${eff.effectName}]` : (eff.effectName || 'Effect');
    const params = [];
    if (eff.action) params.push(`Action: ${eff.action}`);
    if (eff.range) params.push(`Range: ${eff.range}`);
    if (eff.duration) params.push(`Duration: ${eff.duration}`);
    if (eff.savingThrow && eff.savingThrow.toLowerCase() !== 'none' && !dc) params.push(`Save: ${eff.savingThrow}`);

    let modsHtml = '';
    if (Array.isArray(eff.modifiers) && eff.modifiers.length > 0) {
      const modList = eff.modifiers.map(m => {
        const cat = m.category ? `[${m.category}] ` : '';
        const rank = (m.ranks && m.ranks > 1) ? ` ${m.ranks}` : '';
        return `${cat}${m.name}${rank}`;
      }).join(' • ');
      modsHtml = `<div class="print-effect-details" style="margin-top: 2px;"><strong>Modifiers:</strong> ${escapeHtml(modList)}</div>`;
    }

    effsHtml += `
      <div class="print-blueprint-eff-item">
        <div><strong>${escapeHtml(nameStr)} ${r}</strong>${dcBadge} <span class="print-muted" style="font-size: 8pt;">(${params.join(' • ')})</span></div>
        ${modsHtml}
      </div>
    `;
  });

  return `
    <div class="print-blueprint-card print-avoid-break">
      <div class="print-blueprint-header">
        <div>
          <span class="print-blueprint-title">${escapeHtml(imp.name || 'Plan')}</span>
          <span class="print-muted" style="font-size: 8pt; margin-left: 6px;">[${planTypeStr}]</span>
        </div>
        <span class="print-value" style="font-size: 8.5pt;">${cost} PP</span>
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px; margin-bottom: 4px; font-size: 8pt; color: #334155; display: flex; flex-wrap: wrap; gap: 4px 12px;">
        <span><strong>Design:</strong> DC ${10 + cost} (${cost}h)</span>
        <span><strong>Construction:</strong> DC ${10 + cost} (${cost * 4}h)</span>
        <span><strong>Performance / Use:</strong> DC ${10 + cost} (${cost * 10}m)</span>
      </div>
      <div class="print-blueprint-effects">
        ${effsHtml || '<div class="print-muted" style="font-size: 8pt;">No active effects defined.</div>'}
      </div>
    </div>
  `;
}

function generatePrintSheetHtml(customOptions = null) {
  if (typeof char === 'undefined' || !char.powers) return '';
  const printOpts = customOptions || getPrintOptions();

  let html = '<div class="print-page">';

  // =========================================================================
  // PAGE 1: TACTICAL COMBAT DASHBOARD & CORE CAPABILITIES
  // =========================================================================
  html += '<div class="print-page-sheet print-tactical-page">';
  html += buildPrintHeader(char);

  // -------------------------------------------------------------------------
  // 1. ABILITIES, MOVEMENT & CARRYING CAPACITY BAR
  // -------------------------------------------------------------------------
  html += `<div class="print-box print-avoid-break" style="margin-bottom: 8px;">`;
  html += `<div class="print-box-title">Abilities &amp; Attributes</div>`;
  html += `<div class="print-abilities-table">`;

  const abilities = [
    { key: 'STR', name: 'Strength' },
    { key: 'DEX', name: 'Dexterity' },
    { key: 'CON', name: 'Constitution' },
    { key: 'INT', name: 'Intelligence' },
    { key: 'WIS', name: 'Wisdom' },
    { key: 'CHA', name: 'Charisma' }
  ];

  abilities.forEach(ab => {
    const totalRank = char.getAbilityRank ? char.getAbilityRank(ab.key) : 0;
    const totalScore = char.getAbilityScore ? char.getAbilityScore(ab.key) : (parseInt(char.abilities[ab.key]) || 10);
    const enhVal = (char.enhancedTraits && char.enhancedTraits.abilities && char.enhancedTraits.abilities[ab.key]) || 0;
    const isAbsent = char.absentAbilities && char.absentAbilities[ab.key];
    const sign = totalRank !== null && totalRank >= 0 ? `+${totalRank}` : `${totalRank}`;
    const displayMod = isAbsent ? '—' : `(${sign})`;
    const displayScore = isAbsent ? '—' : totalScore;
    const enhTag = enhVal > 0 ? ` <span class="print-muted" style="font-size: 8pt;">[+${enhVal} enh]</span>` : '';

    html += `
      <div class="print-ab-col">
        <div class="print-ab-name">${ab.key}</div>
        <div class="print-ab-score">${displayScore}</div>
        <div class="print-ab-mod">${displayMod}${enhTag}</div>
      </div>
    `;
  });
  html += `</div>`; // End Abilities Table

  // Movement & Carrying Row
  const speedModes = [`Normal Ground: 30 ft (3 MPH)`];
  (char.powers || []).forEach(p => {
    (p.effects || []).forEach(e => {
      const r = parseInt(e.rank) || 1;
      if (e.effectName === "Flight") {
        const ft = Math.round(Math.pow(2, r - 1) * 10);
        const mph = Math.round(Math.pow(2, r - 1) * 10 / 10);
        speedModes.push(`Flight ${r} (${ft} ft/move, ${mph * 10} MPH)`);
      } else if (e.effectName === "Speed") {
        const ft = Math.round(Math.pow(2, r - 1) * 10);
        const mph = Math.round(Math.pow(2, r - 1) * 10 / 10);
        speedModes.push(`Ground Speed ${r} (${ft} ft/move, ${mph * 10} MPH)`);
      } else if (e.effectName === "Swimming") {
        speedModes.push(`Swimming ${r}`);
      } else if (e.effectName === "Burrowing") {
        speedModes.push(`Burrowing ${r}`);
      } else if (e.effectName === "Leaping") {
        speedModes.push(`Leaping ${r}`);
      } else if (e.effectName === "Teleport") {
        speedModes.push(`Teleport ${r}`);
      }
    });
  });

  const strRank = char.getAbilityRank ? (char.getAbilityRank("STR") || 0) : (parseInt(char.abilities.STR) || 0);
  const superStr = (char.powers || []).reduce((acc, p) => {
    (p.effects || []).forEach(e => {
      if (e.effectName === "Super-Strength") acc += (parseInt(e.rank) || 0);
    });
    return acc;
  }, 0);
  const effStr = strRank + superStr;
  const heavyLbs = (typeof CharacterModel !== 'undefined' && CharacterModel.getCarryingCapacity)
    ? CharacterModel.getCarryingCapacity(effStr > 0 ? (effStr * 2 + 10) : 10)
    : '—';

  html += `
    <div style="margin-top: 6px; padding-top: 4px; border-top: 1px dotted #cbd5e1; font-size: 8pt; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px 12px; color: #334155;">
      <div><strong>Movement:</strong> ${escapeHtml(speedModes.join(" • "))}</div>
      <div><strong>Carrying (STR ${char.abilities.STR || 10}${superStr > 0 ? ` + ${superStr} Super-STR` : ''}):</strong> Heavy/Max: ${heavyLbs} • Light: &le; 33% • Push/Drag: 5× Max</div>
    </div>
  `;
  html += `</div>`; // End Abilities Box

  // -------------------------------------------------------------------------
  // 2. VITAL COMBAT DASHBOARD (Balanced 2-Column: Defenses Left, Offense Right)
  // -------------------------------------------------------------------------
  html += '<div class="print-combat-grid print-avoid-break">';

  // 2A. DEFENSES & TOUGHNESS (LEFT)
  const derived = char.derivedStats || {};
  const effFeats = char.effectiveFeats || char.feats || {};
  const dodgeFocus = derived.dodgeFocusRanks !== undefined ? derived.dodgeFocusRanks : (effFeats["Dodge Focus"] || 0);
  const defRoll = effFeats["Defensive Roll"] || 0;
  const baseDef = char.getBaseCombatRank ? char.getBaseCombatRank("DEF") : (parseInt(char.combat.DEF) || 0);
  const enhDef = (char.enhancedTraits && char.enhancedTraits.combat && char.enhancedTraits.combat.DEF) || 0;
  const defMod = baseDef + enhDef;
  const totalDef = derived.totalDefense !== undefined ? derived.totalDefense : (defMod + dodgeFocus);
  const flatDef = derived.flatFootedDefense !== undefined ? derived.flatFootedDefense : defMod;
  const defClass = derived.defenseClass !== undefined ? derived.defenseClass : (10 + totalDef);
  const flatDefClass = derived.flatFootedDefenseClass !== undefined ? derived.flatFootedDefenseClass : (10 + flatDef);

  const pMods = char.powerTraitModifiers || { protectionToughness: 0, enhancedFortitude: 0, enhancedReflex: 0, enhancedWill: 0 };
  const conRank = char.getAbilityRank ? (char.getAbilityRank("CON") || 0) : (parseInt(char.abilities.CON) || 0);
  const dexRank = char.getAbilityRank ? (char.getAbilityRank("DEX") || 0) : (parseInt(char.abilities.DEX) || 0);
  const wisRank = char.getAbilityRank ? (char.getAbilityRank("WIS") || 0) : (parseInt(char.abilities.WIS) || 0);
  const isAbsentCon = char.absentAbilities && char.absentAbilities.CON;
  const isAbsentWis = char.absentAbilities && char.absentAbilities.WIS;

  const fortBought = parseInt(char.purchasedResistances.Fortitude) || 0;
  const refBought = parseInt(char.purchasedResistances.Reflex) || 0;
  const willBought = parseInt(char.purchasedResistances.Will) || 0;

  const fortTotal = char.isMecha ? "Immune" : (derived.fortitude !== undefined ? (derived.fortitude === null ? "—" : derived.fortitude) : (isAbsentCon ? "—" : (conRank + fortBought)));
  const fortBreakdown = char.isMecha ? "Construct (Immune)" : (isAbsentCon ? "Absent CON" : `CON (${conRank}) + Bought (${fortBought})${pMods.enhancedFortitude ? ` + Enh (${pMods.enhancedFortitude})` : ''}`);

  const refTotal = derived.reflex !== undefined ? (derived.reflex === null ? "—" : derived.reflex) : (dexRank + refBought);
  const refBreakdown = `DEX (${dexRank}) + Bought (${refBought})${pMods.enhancedReflex ? ` + Enh (${pMods.enhancedReflex})` : ''}`;

  const willTotal = (char.isMecha && !char.hasAI) ? "Immune" : (derived.will !== undefined ? (derived.will === null ? "—" : derived.will) : (isAbsentWis ? "—" : (wisRank + willBought)));
  const willBreakdown = (char.isMecha && !char.hasAI) ? "Mindless (Immune)" : (isAbsentWis ? "Absent WIS" : `WIS (${wisRank}) + Bought (${willBought})${pMods.enhancedWill ? ` + Enh (${pMods.enhancedWill})` : ''}`);

  const hasUncannyDodge = derived.hasUncannyDodge || (effFeats["Uncanny Dodge"] || 0) > 0;
  const defRollNote = defRoll > 0 ? (hasUncannyDodge ? " [Retained via Uncanny Dodge]" : "") : "";
  const toughTotal = derived.toughness !== undefined ? derived.toughness : (isAbsentCon ? (char.purchasedResistances.Toughness || 0) : (conRank + defRoll + (pMods.protectionToughness || 0)));
  const flatTough = derived.flatFootedToughness !== undefined ? derived.flatFootedToughness : (toughTotal - (hasUncannyDodge ? 0 : defRoll));
  const toughBreakdown = (char.isMecha || isAbsentCon)
    ? `Armor (${char.purchasedResistances.Toughness || 0}) + Protection (${pMods.protectionToughness || 0})`
    : `CON (${conRank}) + Def Roll (${defRoll}${defRollNote}) + Protection (${pMods.protectionToughness || 0})`;
  const knockbackTotal = derived.knockback !== undefined ? derived.knockback : Math.floor(-toughTotal / 2);

  html += `
    <div class="print-box">
      <div class="print-box-title">🛡️ Defenses &amp; Toughness</div>

      <div class="print-stat-badges">
        <div class="print-badge-item">
          <div class="print-badge-label">DEFENSE CLASS</div>
          <div class="print-badge-value">${defClass}</div>
          <div class="print-badge-sub">Flat-Footed: ${flatDefClass}</div>
        </div>
        <div class="print-badge-item">
          <div class="print-badge-label">TOTAL TOUGHNESS</div>
          <div class="print-badge-value">${toughTotal >= 0 ? '+' : ''}${toughTotal}</div>
          <div class="print-badge-sub">Flat-Footed: ${flatTough >= 0 ? '+' : ''}${flatTough}</div>
        </div>
        <div class="print-badge-item">
          <div class="print-badge-label">KNOCKBACK</div>
          <div class="print-badge-value">${knockbackTotal}</div>
          <div class="print-badge-sub">Modifier</div>
        </div>
      </div>

      <div class="print-row-group">
        <div class="print-row">
          <span><strong>Total Defense</strong> <span class="print-muted">[Base ${baseDef}${enhDef > 0 ? ` + Enh ${enhDef}` : ''} + Dodge Focus ${dodgeFocus}]</span></span>
          <span class="print-value">${totalDef >= 0 ? '+' : ''}${totalDef}</span>
        </div>
        <div class="print-row">
          <span><strong>Flat-Footed Defense</strong> <span class="print-muted">[${hasUncannyDodge ? 'Retained via Uncanny Dodge' : 'No Dodge bonus'}]</span></span>
          <span class="print-value">${flatDef >= 0 ? '+' : ''}${flatDef}</span>
        </div>
        <div class="print-row">
          <span><strong>Toughness Save</strong> <span class="print-muted">[${toughBreakdown}]</span></span>
          <span class="print-value">${toughTotal >= 0 ? '+' : ''}${toughTotal}</span>
        </div>
        <div class="print-row">
          <span><strong>Fortitude Save</strong> <span class="print-muted">[${fortBreakdown}]</span></span>
          <span class="print-value">${fortTotal >= 0 ? '+' : ''}${fortTotal}</span>
        </div>
        <div class="print-row">
          <span><strong>Reflex Save</strong> <span class="print-muted">[${refBreakdown}]</span></span>
          <span class="print-value">${refTotal >= 0 ? '+' : ''}${refTotal}</span>
        </div>
        <div class="print-row">
          <span><strong>Will Save</strong> <span class="print-muted">[${willBreakdown}]</span></span>
          <span class="print-value">${willTotal >= 0 ? '+' : ''}${willTotal}</span>
        </div>
      </div>
    </div>
  `;

  // 2B. OFFENSE & COMBAT MANEUVERS (RIGHT)
  const impInit = (effFeats["Improved Initiative"] || 0);
  const initTotal = derived.initiative !== undefined ? derived.initiative : (dexRank + (impInit * 4));
  const initBreakdown = `DEX (${dexRank}) + Imp Init (${impInit * 4})`;

  const baseAtk = char.getBaseCombatRank ? char.getBaseCombatRank("ATK") : (parseInt(char.combat.ATK) || 0);
  const enhAtk = (char.enhancedTraits && char.enhancedTraits.combat && char.enhancedTraits.combat.ATK) || 0;
  const atkMod = baseAtk + enhAtk;
  const meleeBonus = derived.meleeAttack !== undefined ? derived.meleeAttack : atkMod;
  const rangedBonus = derived.rangedAttack !== undefined ? derived.rangedAttack : atkMod;
  const grappleBonus = meleeBonus + strRank + superStr;

  // Combat maneuvers / feats present
  const maneuvers = [];
  if (effFeats["Power Attack"]) maneuvers.push(`Power Attack (-5 Atk / +5 Dmg)`);
  if (effFeats["All-Out Attack"]) maneuvers.push(`All-Out Attack (-5 Def / +5 Atk)`);
  if (effFeats["Accurate Attack"]) maneuvers.push(`Accurate Attack (-5 Dmg / +5 Atk)`);
  if (effFeats["Defensive Attack"]) maneuvers.push(`Defensive Attack (-5 Atk / +5 Def)`);
  if (effFeats["(Attack) Flurry"]) maneuvers.push(`Flurry (Rapid Strike)`);

  html += `
    <div class="print-box">
      <div class="print-box-title">⚔️ Offense &amp; Initiative</div>

      <div class="print-stat-badges">
        <div class="print-badge-item">
          <div class="print-badge-label">INITIATIVE</div>
          <div class="print-badge-value">${initTotal >= 0 ? '+' : ''}${initTotal}</div>
          <div class="print-badge-sub">Modifier</div>
        </div>
        <div class="print-badge-item">
          <div class="print-badge-label">MELEE ATTACK</div>
          <div class="print-badge-value">${meleeBonus >= 0 ? '+' : ''}${meleeBonus}</div>
          <div class="print-badge-sub">Base Atk: ${atkMod}</div>
        </div>
        <div class="print-badge-item">
          <div class="print-badge-label">RANGED ATTACK</div>
          <div class="print-badge-value">${rangedBonus >= 0 ? '+' : ''}${rangedBonus}</div>
          <div class="print-badge-sub">Base Atk: ${atkMod}</div>
        </div>
        <div class="print-badge-item">
          <div class="print-badge-label">GRAPPLE BONUS</div>
          <div class="print-badge-value">${grappleBonus >= 0 ? '+' : ''}${grappleBonus}</div>
          <div class="print-badge-sub">Atk + STR</div>
        </div>
      </div>

      <div class="print-row-group">
        <div class="print-row">
          <span><strong>Initiative Formula</strong></span>
          <span class="print-value print-muted">${initBreakdown}</span>
        </div>
        <div class="print-row">
          <span><strong>Base Attack Bonus</strong></span>
          <span class="print-value">Base: ${baseAtk}${enhAtk > 0 ? ` + Enh: ${enhAtk}` : ''}</span>
        </div>
        <div class="print-row">
          <span><strong>Grapple Calculation</strong></span>
          <span class="print-value print-muted">Atk (${meleeBonus}) + STR (${strRank})${superStr > 0 ? ` + Super-STR (${superStr})` : ''}</span>
        </div>
        <div class="print-row">
          <span><strong>Combat Maneuvers</strong></span>
          <span class="print-value" style="font-size: 8pt; font-weight: normal; color: #475569;">
            ${maneuvers.length > 0 ? maneuvers.join(" • ") : "Standard Maneuvers"}
          </span>
        </div>
      </div>
    </div>
  `;
  html += `</div>`; // End print-combat-grid

  // -------------------------------------------------------------------------
  // 3. FULL-WIDTH TACTICAL ATTACKS TABLE
  // -------------------------------------------------------------------------
  const heroAttacks = extractHeroAttacks(char);
  html += `
    <div class="print-box print-avoid-break">
      <div class="print-box-title">🎯 Attacks &amp; Combat Actions</div>
      <table class="print-attack-table">
        <thead>
          <tr>
            <th style="width: 28%; text-align: left;">ATTACK / POWER</th>
            <th style="width: 14%; text-align: center;">ATTACK ROLL</th>
            <th style="width: 16%; text-align: left;">RANGE</th>
            <th style="width: 20%; text-align: left;">SAVE DC &amp; EFFECT</th>
            <th style="width: 22%; text-align: left;">TYPE / CRIT / NOTES</th>
          </tr>
        </thead>
        <tbody>
  `;

  heroAttacks.forEach((atk, idx) => {
    const zebra = idx % 2 === 1 ? 'class="print-zebra"' : '';
    html += `
      <tr ${zebra}>
        <td><strong>${escapeHtml(atk.name)}</strong></td>
        <td style="text-align: center;" class="print-value">${escapeHtml(atk.bonus)}</td>
        <td>${escapeHtml(atk.range)}</td>
        <td><span class="print-dc-badge">${escapeHtml(atk.saveDc)}</span></td>
        <td class="print-muted" style="font-size: 8pt;">${escapeHtml(atk.notes)}</td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  // -------------------------------------------------------------------------
  // 4. FEATS (Compact 3-Column Grid)
  // -------------------------------------------------------------------------
  html += `
    <div class="print-box print-avoid-break">
      <div class="print-box-title">🎖️ Feats</div>
  `;

  const allPrintFeats = char.effectiveFeats || char.feats || {};
  let featsCount = 0;
  let featsHtml = '';

  if (allPrintFeats && Object.keys(allPrintFeats).length > 0) {
    Object.keys(allPrintFeats).sort().forEach(featName => {
      const rank = parseInt(allPrintFeats[featName]) || 0;
      if (rank > 0) {
        featsCount++;
        const rankStr = rank > 1 ? ` <span class="print-value">Rank ${rank}</span>` : '';
        const isEnhanced = (char.enhancedTraits && char.enhancedTraits.feats && char.enhancedTraits.feats[featName]) > 0;
        const enhTag = isEnhanced ? ` <span class="print-muted" style="font-size: 8pt;">[Enhanced]</span>` : '';
        const rawDetail = char.featDetails && char.featDetails[featName] ? char.featDetails[featName] : '';
        const detailStr = Array.isArray(rawDetail) ? rawDetail.join("; ") : rawDetail;
        const detail = detailStr ? ` - <span class="print-muted" style="font-size: 8pt;">${escapeHtml(detailStr)}</span>` : '';

        featsHtml += `
          <div class="print-col-item">
            <strong>${escapeHtml(featName)}</strong>${rankStr}${enhTag}${detail}
          </div>
        `;
      }
    });
  }

  if (featsCount > 0) {
    html += `<div class="print-multi-col print-cols-3">${featsHtml}</div>`;
  } else {
    html += `<div class="print-row print-muted">No feats trained.</div>`;
  }
  html += `</div>`; // End Feats Box

  // -------------------------------------------------------------------------
  // 5. SKILLS (Compact 3-Column Table)
  // -------------------------------------------------------------------------
  html += `
    <div class="print-box print-avoid-break">
      <div class="print-box-title">📖 Skills</div>
  `;

  const abMap = {
    'Acrobatics':'DEX', 'Athletics':'STR', 'Climb':'STR', 'Concentration':'WIS',
    'Craft':'INT', 'Diplomacy':'CHA', 'Disable Device':'INT', 'Disguise':'CHA',
    'Drive':'DEX', 'Escape Artist':'DEX', 'Gather Information':'CHA', 'Handle Animal':'CHA',
    'Intimidate':'CHA', 'Investigate':'INT', 'Knowledge':'INT', 'Language':'INT',
    'Medicine':'WIS', 'Notice':'WIS', 'Perform':'CHA', 'Pilot':'DEX',
    'Profession':'WIS', 'Ride':'DEX', 'Search':'INT', 'Sense Motive':'WIS',
    'Sleight of Hand':'DEX', 'Stealth':'DEX', 'Survival':'WIS', 'Swim':'STR'
  };

  const allSkillsToCheck = new Set([
    ...Object.keys(char.skills || {}),
    ...Object.keys((char.enhancedTraits && char.enhancedTraits.skills) || {})
  ]);

  let skillsCount = 0;
  let skillsHtml = '';

  if (allSkillsToCheck.size > 0) {
    Array.from(allSkillsToCheck).sort().forEach(skName => {
      const sR = parseInt(char.skills[skName]) || 0;
      const enhSkill = (char.enhancedTraits && char.enhancedTraits.skills && char.enhancedTraits.skills[skName]) || 0;
      if (sR > 0 || enhSkill > 0) {
        skillsCount++;
        const baseKey = skName.includes(" (") ? skName.split(" (")[0].trim() : skName.trim();
        const abKey = abMap[skName] || abMap[baseKey] || 'INT';
        const abMod = char.getAbilityRank ? (char.getAbilityRank(abKey) || 0) : (parseInt(char.abilities[abKey]) || 0);
        const total = sR + enhSkill + abMod;
        const detail = char.skillDetails && char.skillDetails[skName];
        const displayName = (detail && !skName.toLowerCase().includes(`(${detail.toLowerCase()})`)) ? `${skName} (${detail})` : skName;
        const enhStr = enhSkill > 0 ? ` + Enh ${enhSkill}` : '';
        const breakdown = `Ranks ${sR}${enhStr} + ${abKey} ${abMod >= 0 ? '+' : ''}${abMod}`;

        skillsHtml += `
          <div class="print-col-item" style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px dotted #cbd5e1; padding: 2px 4px;">
            <span><strong>${escapeHtml(displayName)}</strong> <span class="print-muted" style="font-size: 8pt;">(${abKey})</span></span>
            <span class="print-value" style="margin-left: 6px;">${total >= 0 ? '+' : ''}${total}</span>
          </div>
        `;
      }
    });
  }

  if (skillsCount > 0) {
    html += `<div class="print-multi-col print-cols-3">${skillsHtml}</div>`;
  } else {
    html += `<div class="print-row print-muted">No skills trained.</div>`;
  }
  html += `</div>`; // End Skills Box
  html += `</div>`; // End Page 1 Tactical Sheet

  // =========================================================================
  // PAGE 2: POWERS, DEVICES & GEAR
  // =========================================================================
  const hasPowers = char.powers && char.powers.length > 0;
  const hasEq = char.gear && char.gear.length > 0;
  const hasVeh = char.vehicles && char.vehicles.length > 0;
  const hasHq = char.installations && char.installations.length > 0;

  if (hasPowers || hasEq || hasVeh || hasHq) {
    html += `<div class="print-page-break"></div>`;
    html += `<div class="print-page-sheet print-powers-page">`;

    if (hasPowers) {
      html += `
        <div class="print-box">
          <div class="print-box-title">⚡ Powers &amp; Devices</div>
          <div class="print-powers-container">
      `;

      char.powers.forEach(power => {
        const ptCost = char.calculateTotalPowerCost ? char.calculateTotalPowerCost(power) : (power.cost || 0);
        const descr = power.descriptors ? `<span class="print-muted" style="font-weight: normal; font-size: 8pt;"> [${escapeHtml(power.descriptors)}]</span>` : '';
        const isDevice = isDevicePower(power);
        const cardIcon = isDevice ? '⚙️' : '⚡';
        const cardTypeTitle = isDevice ? 'Device' : 'Superpower';

        let containerLabel = "";
        if (power.containerType === 'array') containerLabel = "Array";
        else if (power.containerType === 'device_hard') containerLabel = "Device (Hard to Lose)";
        else if (power.containerType === 'device_easy') containerLabel = "Device (Easy to Lose)";
        else if (isDevice) containerLabel = "Device";

        html += `
          <div class="print-power-card print-avoid-break">
            <div class="print-power-card-header">
              <span>
                <span class="print-power-icon" style="margin-right: 3px;" title="${cardTypeTitle}">${cardIcon}</span>
                <strong>${escapeHtml(power.name || (isDevice ? 'Unnamed Device' : 'Unnamed Power'))}</strong>
                ${descr}
                ${containerLabel ? ` <span class="print-badge-type">[${containerLabel}]</span>` : ''}
              </span>
              <span class="print-value">${ptCost} PP</span>
            </div>
            <div class="print-power-card-body">
        `;

        if (power.effects && power.effects.length > 0) {
          power.effects.forEach((eff, idx) => {
            const isPrimary = eff.association === 'primary' || idx === 0;
            const isAlt = eff.association === 'alternate';
            const effRank = parseInt(eff.rank || eff.ranks || 1) || 1;
            const effName = eff.effectName || 'Effect';
            const customName = (eff.name && eff.name !== 'New Effect' && eff.name !== effName) ? eff.name : '';
            const saveDc = calculateEffectSaveDc(eff);
            const dcBadge = saveDc ? `<span class="print-dc-badge">${escapeHtml(saveDc)}</span>` : '';
            const effIcon = isDevice ? '⚙️' : '⚡';

            html += `
              <div class="print-power-effect-row ${isAlt ? 'print-power-alt' : 'print-power-primary'}">
                <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px;">
                  <span>
                    ${isAlt ? '<span class="print-alt-bullet">• Alt:</span> ' : ''}
                    <span class="print-effect-icon" style="font-size: 8pt; margin-right: 2px;">${effIcon}</span>
                    <strong>${escapeHtml(customName || effName)}</strong>
                    ${customName ? ` <span class="print-muted" style="font-size: 8pt;">(${escapeHtml(effName)} ${effRank})</span>` : ` (Rank ${effRank})`}
                    <span class="print-muted" style="font-size: 8pt;">— Action: ${escapeHtml(eff.action || 'Standard')}, Range: ${escapeHtml(eff.range || 'Touch')}</span>
                  </span>
                  ${dcBadge}
                </div>
            `;

            // Modifiers & Features list
            const details = [];
            if (eff.modifiers && eff.modifiers.length > 0) {
              const mods = eff.modifiers.map(m => {
                const sign = m.category === 'extra' ? '+' : (m.cost < 0 ? '' : '-');
                return `${escapeHtml(m.name)}${m.cost ? ` (${sign}${m.cost})` : ''}`;
              }).join(', ');
              details.push(`<strong>Modifiers:</strong> ${mods}`);
            }

            if (eff.subPowers && eff.subPowers.length > 0) {
              const subList = eff.subPowers.map(s => `${escapeHtml(s.name || s.type)} +${s.rank || 1}${s.details ? ` (${escapeHtml(s.details)})` : ''}`).join(', ');
              details.push(`<strong>Grants:</strong> ${subList}`);
            }

            if (eff.notes) {
              details.push(`<strong>Notes:</strong> ${escapeHtml(eff.notes)}`);
            }

            if (details.length > 0) {
              html += `<div class="print-effect-details">${details.join(" • ")}</div>`;
            }

            html += `</div>`; // End Effect Row
          });
        }

        html += `</div></div>`; // End Power Card
      });

      html += `</div></div>`; // End Powers Box
    }

    // Equipment & Gear (Deduplicated against HQ)
    if (hasEq || hasVeh || hasHq) {
      html += `
        <div class="print-box print-avoid-break">
          <div class="print-box-title">🎒 Equipment, Weapons, Vehicles &amp; HQ</div>
      `;

      if (hasEq) {
        char.gear.forEach(eq => {
          if (eq.name && eq.name.startsWith("HQ:") && hasHq) return;
          html += `
            <div class="print-row" style="font-size: 8.5pt;">
              <span><strong>${escapeHtml(eq.name || 'Gear')}</strong> ${eq.notes ? `<span class="print-muted">- ${escapeHtml(eq.notes)}</span>` : ''}</span>
              <span class="print-value">${eq.cost || 0} EP</span>
            </div>
          `;
        });
      }

      if (hasVeh) {
        if (!printOpts.detailedVehicles) {
          char.vehicles.forEach(vh => {
            html += `
              <div class="print-row" style="font-size: 8.5pt;">
                <span><strong>Vehicle: ${escapeHtml(vh.name || 'Vehicle')}</strong> (Size: ${escapeHtml(formatVehicleSize(vh.size))}, STR: ${vh.strength || 0}, Speed: ${vh.speed || 0}, Def: ${vh.defense || 10}, Tou: ${vh.toughness || 0}) ${vh.features ? `<span class="print-muted">- ${escapeHtml(vh.features)}</span>` : ''}</span>
                <span class="print-value">${vh.cost || 0} EP</span>
              </div>
            `;
          });
        }
      }

      if (hasHq) {
        if (!printOpts.detailedHq) {
          char.installations.forEach(hq => {
            html += `
              <div class="print-row" style="font-size: 8.5pt;">
                <span><strong>HQ: ${escapeHtml(hq.name || 'Installation')}</strong> (Size: ${escapeHtml(formatHqSize(hq.size))}, Tou: ${hq.toughness || 10}) ${hq.features ? `<span class="print-muted">- ${escapeHtml(hq.features)}</span>` : ''}</span>
                <span class="print-value">${hq.cost || 0} EP</span>
              </div>
            `;
          });
        }
      }

      html += `</div>`; // End Equipment Box

      // If detailed vehicles are enabled, render dedicated vehicle cards
      if (hasVeh && printOpts.detailedVehicles) {
        char.vehicles.forEach(vh => {
          html += buildDetailedVehicleCard(vh);
        });
      }

      // If detailed HQ are enabled, render dedicated HQ cards
      if (hasHq && printOpts.detailedHq) {
        char.installations.forEach(hq => {
          html += buildDetailedHqCard(hq);
        });
      }
    }

    html += `</div>`; // End Page 2 Powers & Gear
  }

  // =========================================================================
  // PAGE 3: BLUEPRINTS, COMPLICATIONS, MOTIVATION & DOSSIER
  // =========================================================================
  const hasBlueprints = char.blueprints && char.blueprints.length > 0;
  const hasDrawbacks = char.drawbacks && char.drawbacks.length > 0;
  const hasComp = !!char.complications;
  const hasMot = !!char.motivation;
  const hasBio = char.identity || char.titles || char.sex || char.appearance || char.history;

  if (hasBlueprints || hasDrawbacks || hasComp || hasMot || hasBio) {
    html += `<div class="print-page-break"></div>`;
    html += `<div class="print-page-sheet print-dossier-page">`;

    // 1. PLANS & BLUEPRINTS (Compact Table or Detailed Cards)
    if (hasBlueprints) {
      if (printOpts.detailedPlans) {
        html += `
          <div class="print-box print-avoid-break">
            <div class="print-box-title">📐 Plans &amp; Blueprints (Inventions, Rituals, Devices) [${char.blueprints.length} Items - Full Detail]</div>
            <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 4px;">
              ${char.blueprints.map(bp => buildDetailedBlueprintCard(char, bp)).join('')}
            </div>
          </div>
        `;
      } else {
        html += `
          <div class="print-box print-avoid-break">
            <div class="print-box-title">📐 Plans &amp; Blueprints (Inventions, Rituals, Devices) [${char.blueprints.length} Items]</div>
            <table class="print-attack-table print-blueprints-table">
              <thead>
                <tr>
                  <th style="width: 25%; text-align: left;">PLAN / RITUAL NAME</th>
                  <th style="width: 8%; text-align: center;">COST</th>
                  <th style="width: 32%; text-align: left;">EFFECT(S)</th>
                  <th style="width: 35%; text-align: left;">DIFFICULTY &amp; TIME</th>
                </tr>
              </thead>
              <tbody>
        `;

        char.blueprints.forEach((imp, idx) => {
          const cost = (char.calculateTotalPowerCost) ? char.calculateTotalPowerCost(imp) : (imp.cost || 0);
          const effSummary = Array.isArray(imp.effects) ? imp.effects.map(e => {
            const r = e.rank !== undefined ? e.rank : (e.ranks || 1);
            const dc = calculateEffectSaveDc(e);
            const dcBadge = dc ? ` [${dc}]` : "";
            return `${escapeHtml(e.effectName || e.name || 'Effect')} ${r}${dcBadge}`;
          }).join(', ') : '';

          const zebra = idx % 2 === 1 ? 'class="print-zebra"' : '';
          html += `
            <tr ${zebra}>
              <td><strong>${escapeHtml(imp.name)}</strong></td>
              <td style="text-align: center;" class="print-value">${cost} PP</td>
              <td>${effSummary || '—'}</td>
              <td class="print-muted" style="font-size: 8pt;">
                Design DC ${10 + cost} (${cost}h) • Const DC ${10 + cost} (${cost * 4}h) • Perf DC ${10 + cost} (${cost * 10}m)
              </td>
            </tr>
          `;
        });

        html += `
              </tbody>
            </table>
          </div>
        `;
      }
    }

    // 2. DRAWBACKS (if any)
    if (hasDrawbacks) {
      html += `
        <div class="print-box print-avoid-break">
          <div class="print-box-title">⚠️ Drawbacks</div>
      `;
      char.drawbacks.forEach(d => {
        html += `
          <div class="print-row" style="font-size: 8.5pt;">
            <span><strong>${escapeHtml(d.name)}</strong> ${d.description ? `<span class="print-muted">- ${escapeHtml(d.description)}</span>` : ''}</span>
            <span class="print-value">-${d.points || d.cost || 0} PP</span>
          </div>
        `;
      });
      html += `</div>`;
    }

    // 3. COMPLICATIONS & MOTIVATION
    if (hasComp || hasMot) {
      html += `
        <div class="print-box print-avoid-break">
          <div class="print-box-title">🎭 Complications &amp; Motivation</div>
      `;

      if (hasComp) {
        html += `
          <div style="margin-bottom: 8px; font-size: 8.5pt;">
            <strong style="color: #b45309;">⚡ Complications (Hero Point Triggers):</strong>
            <div style="padding-left: 8px; margin-top: 2px; line-height: 1.45; white-space: pre-wrap;">${escapeHtml(char.complications)}</div>
          </div>
        `;
      }

      if (hasMot) {
        html += `
          <div style="font-size: 8.5pt; margin-top: 4px;">
            <strong style="color: #0369a1;">🎯 Motivation:</strong>
            <div style="padding-left: 8px; margin-top: 2px; line-height: 1.45;">${escapeHtml(char.motivation)}</div>
          </div>
        `;
      }

      html += `</div>`;
    }

    // 4. CHARACTER DOSSIER & BACKGROUND
    if (hasBio) {
      html += `
        <div class="print-box print-avoid-break">
          <div class="print-box-title">📜 Character Dossier &amp; Background</div>
      `;

      if (char.identity || char.titles || char.sex || char.appearance) {
        const bioParts = [];
        if (char.identity) bioParts.push(`<strong>Identity:</strong> ${escapeHtml(char.identity)}`);
        if (char.titles) bioParts.push(`<strong>Titles:</strong> ${escapeHtml(char.titles)}`);
        if (char.sex) bioParts.push(`<strong>Sex:</strong> ${escapeHtml(char.sex)}`);
        if (char.appearance) bioParts.push(`<strong>Appearance:</strong> ${escapeHtml(char.appearance)}`);
        html += `
          <div style="margin-bottom: 6px; font-size: 8.5pt; line-height: 1.45;">
            ${bioParts.join(" • ")}
          </div>
        `;
      }

      if (char.history) {
        html += `
          <div style="font-size: 8.5pt; margin-top: 4px;">
            <strong>Background History:</strong>
            <div style="padding-left: 8px; margin-top: 2px; line-height: 1.45; white-space: pre-wrap;">${escapeHtml(char.history)}</div>
          </div>
        `;
      }

      html += `</div>`;
    }

    html += `</div>`; // End Page 3 Dossier
  }

  html += `</div>`; // End print-page
  return html;
}

function generatePrintSheet() {
  if (typeof char === 'undefined' || !char.powers) return;

  const container = document.getElementById("print-layout");
  if (!container) return;

  const html = generatePrintSheetHtml();
  container.innerHTML = html;

  const previewContent = document.getElementById("printPreviewContent");
  if (previewContent) {
    previewContent.innerHTML = html;
  }
}

function openPrintPreview() {
  syncPrintOptionControls();
  generatePrintSheet();
  const modal = document.getElementById("printPreviewModal");
  if (modal) {
    const titleEl = document.getElementById("printPreviewTitle");
    if (titleEl && typeof char !== 'undefined') {
      titleEl.innerHTML = `<span>🖨️</span> Print &amp; PDF Preview - ${escapeHtml(char.name || 'Hero')}`;
    }
    modal.classList.add("active");
  }
}

function closePrintPreview() {
  const modal = document.getElementById("printPreviewModal");
  if (modal) {
    modal.classList.remove("active");
  }
}

if (typeof window !== 'undefined') {
  window.DEFAULT_PRINT_OPTIONS = DEFAULT_PRINT_OPTIONS;
  window.getPrintOptions = getPrintOptions;
  window.setPrintOptions = setPrintOptions;
  window.syncPrintOptionControls = syncPrintOptionControls;
  window.updatePrintOptions = updatePrintOptions;
  window.generatePrintSheet = generatePrintSheet;
  window.generatePrintSheetHtml = generatePrintSheetHtml;
  window.buildPrintHeader = buildPrintHeader;
  window.extractHeroAttacks = extractHeroAttacks;
  window.calculateEffectSaveDc = calculateEffectSaveDc;
  window.openPrintPreview = openPrintPreview;
  window.closePrintPreview = closePrintPreview;

  if (typeof window.addEventListener === 'function') {
    window.addEventListener('beforeprint', generatePrintSheet);
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    DEFAULT_PRINT_OPTIONS,
    getPrintOptions,
    setPrintOptions,
    syncPrintOptionControls,
    updatePrintOptions,
    generatePrintSheet,
    generatePrintSheetHtml,
    buildPrintHeader,
    extractHeroAttacks,
    calculateEffectSaveDc,
    openPrintPreview,
    closePrintPreview
  };
}
