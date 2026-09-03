function generatePrintSheet() {
    if (typeof char === 'undefined' || !char.powers) return;

    const container = document.getElementById("print-layout");
    if (!container) return;

    let html = "";

    // Wrap everything in a single flowing container
    html += `<div class="print-page">`;
    html += buildPrintHeader();

    // ----------------------------------------------------
    // 1. ABILITIES
    // ----------------------------------------------------
    html += `<div class="print-box">`;
    html += `<div class="print-box-title">Abilities</div>`;
    html += `<div class="print-col-header"><span>Ability</span><span>Rank</span></div>`;
    
    const abilities = [
        { key: 'STR', name: 'Strength' },
        { key: 'CON', name: 'Constitution' },
        { key: 'DEX', name: 'Dexterity' },
        { key: 'INT', name: 'Intelligence' },
        { key: 'WIS', name: 'Wisdom' },
        { key: 'CHA', name: 'Charisma' }
    ];
    abilities.forEach(ab => {
        let total = char.getAbilityRank ? char.getAbilityRank(ab.key) : (parseInt(char.abilities[ab.key]) || 0); 
        let enhVal = (char.enhancedTraits && char.enhancedTraits.abilities && char.enhancedTraits.abilities[ab.key]) || 0;
        let isAbsent = char.absentAbilities && char.absentAbilities[ab.key];
        let displayTotal = isAbsent ? "—" : total;
        let baseVal = char.getBaseAbilityRank ? char.getBaseAbilityRank(ab.key) : (parseInt(char.abilities[ab.key]) || 0);
        let breakdown = isAbsent ? "Absent / Disabled" : (enhVal > 0 ? `Base ${baseVal} + Enhanced ${enhVal}` : "Base points only");

        html += `
            <div class="print-row" style="padding: 4px 0;">
                <div style="display: flex; justify-content: space-between; width: 100%;">
                    <span><strong>${ab.name}</strong> <span class="print-muted" style="font-size: 11px; margin-left: 8px;">[${breakdown}]</span></span>
                    <span class="print-value">${displayTotal}</span>
                </div>
            </div>
        `;
    });
    html += `</div>`; // End Abilities

    // ----------------------------------------------------
    // 2. COMBAT & INITIATIVE
    // ----------------------------------------------------
    html += `<div class="print-box">`;
    html += `<div class="print-box-title">Combat & Initiative</div>`;
    
    const derived = char.derivedStats || {};
    const impInit = (char.effectiveFeats || char.feats)["Improved Initiative"] || 0;
    const dexRank = char.getAbilityRank ? (char.getAbilityRank("DEX") || 0) : (parseInt(char.abilities.DEX) || 0);
    let initTotal = derived.initiative !== undefined ? derived.initiative : (dexRank + (impInit * 4));
    let initBreakdown = `DEX (${dexRank}) + Imp Initiative (+${impInit * 4})`;

    html += `
        <div class="print-row" style="padding: 4px 0;">
            <div style="display: flex; justify-content: space-between; width: 100%;">
                <span><strong>Initiative</strong> <span class="print-muted" style="font-size: 11px; margin-left: 8px;">[${initBreakdown}]</span></span>
                <span class="print-value">${initTotal >= 0 ? '+' : ''}${initTotal}</span>
            </div>
        </div>
    `;
    
    html += `<div class="print-col-header" style="margin-top: 8px;"><span>Attack</span><span>Bonus</span></div>`;
    let baseAtk = char.getBaseCombatRank ? char.getBaseCombatRank("ATK") : (parseInt(char.combat.ATK) || 0);
    let enhAtk = (char.enhancedTraits && char.enhancedTraits.combat && char.enhancedTraits.combat.ATK) || 0;
    let atkMod = baseAtk + enhAtk;
    let meleeBonus = derived.meleeAttack !== undefined ? derived.meleeAttack : atkMod;
    let rangedBonus = derived.rangedAttack !== undefined ? derived.rangedAttack : atkMod;
    let meleeBreakdown = `ATK (${baseAtk}${enhAtk > 0 ? ` + Enhanced ${enhAtk}` : ''})` + (derived.meleeAtkFeat ? ` + Attack Focus: Melee (${derived.meleeAtkFeat})` : '');
    let rangedBreakdown = `ATK (${baseAtk}${enhAtk > 0 ? ` + Enhanced ${enhAtk}` : ''})` + (derived.rangedAtkFeat ? ` + Attack Focus: Ranged (${derived.rangedAtkFeat})` : '');

    html += `
        <div class="print-row" style="padding: 4px 0;">
            <div style="display: flex; justify-content: space-between; width: 100%;">
                <span><strong>Melee Attack</strong> <span class="print-muted" style="font-size: 11px; margin-left: 8px;">[${meleeBreakdown}]</span></span>
                <span class="print-value">${meleeBonus >= 0 ? '+' : ''}${meleeBonus}</span>
            </div>
        </div>
        <div class="print-row" style="padding: 4px 0;">
            <div style="display: flex; justify-content: space-between; width: 100%;">
                <span><strong>Ranged Attack</strong> <span class="print-muted" style="font-size: 11px; margin-left: 8px;">[${rangedBreakdown}]</span></span>
                <span class="print-value">${rangedBonus >= 0 ? '+' : ''}${rangedBonus}</span>
            </div>
        </div>
    `;
    
    // Add Combat Skills if present
    if (char.skills) {
        Object.keys(char.skills).forEach(skName => {
            if (skName.includes("Combat")) {
                let sR = parseInt(char.skills[skName]) || 0;
                let abMod = dexRank;
                let skBreakdown = `Skill (${sR}) + Base (${abMod}) + Combat Mod (${atkMod})`;
                html += `
                    <div class="print-row" style="padding: 4px 0;">
                        <div style="display: flex; justify-content: space-between; width: 100%;">
                            <span><strong>${skName} ${char.skillDetails[skName] ? `(${char.skillDetails[skName]})` : ''}</strong> <span class="print-muted" style="font-size: 11px; margin-left: 8px;">[${skBreakdown}]</span></span>
                            <span class="print-value">+${sR + abMod + atkMod}</span>
                        </div>
                    </div>
                `;
            }
        });
    }
    html += `</div>`; // End Combat

    // ----------------------------------------------------
    // 3. DEFENSES
    // ----------------------------------------------------
    html += `<div class="print-box">`;
    html += `<div class="print-box-title">Defenses</div>`;
    html += `<div class="print-col-header"><span>Defense</span><span>Total</span></div>`;
    
    const effFeats = char.effectiveFeats || char.feats || {};
    const pMods = char.powerTraitModifiers || { protectionToughness: 0 };
    const defRoll = effFeats["Defensive Roll"] || 0;
    const dodgeFocus = derived.dodgeFocusRanks || effFeats["Dodge Focus"] || 0;
    const baseDef = char.getBaseCombatRank ? char.getBaseCombatRank("DEF") : (char.combat.DEF || 0);
    const enhDef = (char.enhancedTraits && char.enhancedTraits.combat && char.enhancedTraits.combat.DEF) || 0;
    const defRank = baseDef + enhDef;

    let defClass = derived.defenseClass || (10 + defRank + dodgeFocus);
    let totalDef = derived.totalDefense !== undefined ? derived.totalDefense : (defRank + dodgeFocus);
    let flatDef = derived.flatFootedDefense !== undefined ? derived.flatFootedDefense : defRank;

    let conRank = char.getAbilityRank ? (char.getAbilityRank("CON") || 0) : (parseInt(char.abilities.CON) || 0);
    let wisRank = char.getAbilityRank ? (char.getAbilityRank("WIS") || 0) : (parseInt(char.abilities.WIS) || 0);
    let isAbsentCon = char.absentAbilities && char.absentAbilities.CON;
    let isAbsentWis = char.absentAbilities && char.absentAbilities.WIS;

    let fortBought = parseInt(char.purchasedResistances.Fortitude) || 0;
    let refBought = parseInt(char.purchasedResistances.Reflex) || 0;
    let willBought = parseInt(char.purchasedResistances.Will) || 0;

    let fortTotal = derived.fortitude !== undefined ? (derived.fortitude === null ? "—" : derived.fortitude) : (isAbsentCon ? "—" : (conRank + fortBought));
    let fortBreakdown = isAbsentCon ? "Absent CON" : `CON (${conRank}) + Bought (${fortBought})${pMods.enhancedFortitude ? ` + Enhanced (${pMods.enhancedFortitude})` : ''}`;

    let refTotal = derived.reflex !== undefined ? (derived.reflex === null ? "—" : derived.reflex) : (dexRank + refBought);
    let refBreakdown = `DEX (${dexRank}) + Bought (${refBought})${pMods.enhancedReflex ? ` + Enhanced (${pMods.enhancedReflex})` : ''}`;

    let willTotal = derived.will !== undefined ? (derived.will === null ? "—" : derived.will) : (isAbsentWis ? "—" : (wisRank + willBought));
    let willBreakdown = isAbsentWis ? "Absent WIS" : `WIS (${wisRank}) + Bought (${willBought})${pMods.enhancedWill ? ` + Enhanced (${pMods.enhancedWill})` : ''}`;

    const hasUncannyDodge = derived.hasUncannyDodge || effFeats["Uncanny Dodge"] > 0;
    let flatDefBreakdown = hasUncannyDodge 
        ? `DEF (${baseDef}${enhDef > 0 ? ` + Enh ${enhDef}` : ''}) + Dodge Focus (${dodgeFocus}) [Retained via Uncanny Dodge]` 
        : `DEF (${baseDef}${enhDef > 0 ? ` + Enh ${enhDef}` : ''}) [No Dodge bonus]`;

    let toughTotal = derived.toughness !== undefined ? derived.toughness : (isAbsentCon ? "—" : (conRank + defRoll + (pMods.protectionToughness || 0)));
    let defRollNote = defRoll > 0 ? (hasUncannyDodge ? " [Retained via Uncanny Dodge]" : "") : "";
    let toughBreakdown = isAbsentCon ? "Absent CON" : `CON (${conRank}) + Def Roll (${defRoll}${defRollNote}) + Protection (${pMods.protectionToughness || 0})`;

    const printDefenses = [
        { name: 'Defense Class', total: defClass, breakdown: `Base (10 + Total Defense ${totalDef}) [Flat-Footed: ${derived.flatFootedDefenseClass || (10 + flatDef)}]` },
        { name: 'Total Defense', total: totalDef, breakdown: `DEF (${baseDef}${enhDef > 0 ? ` + Enh ${enhDef}` : ''}) + Dodge Focus (${dodgeFocus})` },
        { name: 'Flat-Footed Defense', total: flatDef, breakdown: flatDefBreakdown },
        { name: 'Toughness', total: toughTotal, breakdown: toughBreakdown },
        { name: 'Fortitude', total: fortTotal, breakdown: fortBreakdown },
        { name: 'Reflex', total: refTotal, breakdown: refBreakdown },
        { name: 'Will', total: willTotal, breakdown: willBreakdown }
    ];

    printDefenses.forEach(def => {
        html += `
            <div class="print-row" style="padding: 4px 0;">
                <div style="display: flex; justify-content: space-between; width: 100%;">
                    <span><strong>${def.name}</strong> <span class="print-muted" style="font-size: 11px; margin-left: 8px;">[${def.breakdown}]</span></span>
                    <span class="print-value">${def.total}</span>
                </div>
            </div>
        `;
    });
    
    html += `</div>`; // End Defenses

    // ====================================================
    html += `<div class="print-page-break"></div>`;
    // ====================================================

    // ----------------------------------------------------
    // 4. FEATS
    // ----------------------------------------------------
    html += `<div class="print-box">`;
    html += `<div class="print-box-title">Feats</div>`;
    let advsHtml = "";
    const allPrintFeats = char.effectiveFeats || char.feats || {};
    if (allPrintFeats && Object.keys(allPrintFeats).length > 0) {
        Object.keys(allPrintFeats).forEach(advName => {
            let rank = parseInt(allPrintFeats[advName]) || 0;
            if (rank > 0) {
                let rankStr = rank > 1 ? ` <span class="print-value">Rank ${rank}</span>` : '';
                let isEnhanced = (char.enhancedTraits && char.enhancedTraits.feats && char.enhancedTraits.feats[advName]) > 0;
                let enhTag = isEnhanced ? ` <span style="color:#10b981; font-weight:bold;">[Enhanced]</span>` : '';
                let detail = char.featDetails[advName] ? ` - <span class="print-muted">${char.featDetails[advName]}</span>` : '';
                advsHtml += `
                    <div style="border-bottom: 1px dotted #ccc; padding: 4px 0; font-size: 13px; break-inside: avoid-column; page-break-inside: avoid;">
                        <strong>${advName}</strong>${rankStr}${enhTag}${detail}
                    </div>
                `;
            }
        });
    }
    if (advsHtml) {
        html += `<div style="column-count: 2; column-gap: 16px;">${advsHtml}</div>`;
    } else {
        html += `<div class="print-row print-muted">No feats.</div>`;
    }
    html += `</div>`; // End Feats

    // ----------------------------------------------------
    // 5. SKILLS
    // ----------------------------------------------------
    html += `<div class="print-box">`;
    html += `<div class="print-box-title">Skills</div>`;
    
    const abMap = {
        'Acrobatics':'DEX', 'Athletics':'STR', 'Climb':'STR', 'Concentration':'WIS',
        'Craft':'INT', 'Diplomacy':'CHA', 'Disable Device':'INT', 'Disguise':'CHA',
        'Drive':'DEX', 'Escape Artist':'DEX', 'Gather Information':'CHA', 'Handle Animal':'CHA',
        'Intimidate':'CHA', 'Investigate':'INT', 'Knowledge':'INT', 'Language':'INT',
        'Medicine':'WIS', 'Notice':'WIS', 'Perform':'CHA', 'Pilot':'DEX',
        'Profession':'WIS', 'Ride':'DEX', 'Search':'INT', 'Sense Motive':'WIS',
        'Sleight of Hand':'DEX', 'Stealth':'DEX', 'Survival':'WIS', 'Swim':'STR'
    };

    let skillsHtml = "";
    const allSkillsToCheck = new Set([...Object.keys(char.skills || {}), ...Object.keys((char.enhancedTraits && char.enhancedTraits.skills) || {})]);
    if (allSkillsToCheck.size > 0) {
        Array.from(allSkillsToCheck).sort().forEach(skName => {
            let sR = parseInt(char.skills[skName]) || 0;
            let enhSkill = (char.enhancedTraits && char.enhancedTraits.skills && char.enhancedTraits.skills[skName]) || 0;
            if (sR > 0 || enhSkill > 0) {
                let abKey = abMap[skName] || 'INT';
                let abMod = char.getAbilityRank ? (char.getAbilityRank(abKey) || 0) : (parseInt(char.abilities[abKey]) || 0);
                let total = sR + enhSkill + abMod;
                let displayName = skName + (char.skillDetails[skName] ? ` (${char.skillDetails[skName]})` : '');
                let enhStr = enhSkill > 0 ? ` + Enh ${enhSkill}` : '';
                let breakdown = `Base ${sR}${enhStr} + ${abKey} ${abMod}`;

                skillsHtml += `
                    <div class="print-row" style="padding: 4px 0; break-inside: avoid-column; page-break-inside: avoid;">
                        <div style="display: flex; justify-content: space-between; width: 100%;">
                            <span><strong>${displayName}</strong> <span class="print-muted" style="font-size: 11px; margin-left: 8px;">[${breakdown}]</span></span>
                            <span class="print-value">+${total}</span>
                        </div>
                    </div>
                `;
            }
        });
    } 
    if (skillsHtml) {
        html += `<div style="column-count: 2; column-gap: 16px;">${skillsHtml}</div>`;
    } else {
        html += `<div class="print-row print-muted">No skills trained.</div>`;
    }
    html += `</div>`; // End Skills

    // ----------------------------------------------------
    // 6. POWERS & OTHER EFFECTS
    // ----------------------------------------------------
    let hasExtraContent = false;

    if (char.powers && char.powers.length > 0) {
        hasExtraContent = true;
        html += `<div class="print-box" style="border: none; padding: 0;">`;
        html += `<div class="print-box-title" style="margin-left: 0; margin-right: 0;">Powers</div>`;
        
        char.powers.forEach(power => {
            html += `<div class="print-avoid-break print-box" style="margin-bottom: 8px;">`;
            html += `<div style="display: flex; justify-content: space-between; font-size: 15px; font-weight: bold; border-bottom: 1px solid black; padding-bottom: 4px; margin-bottom: 4px;">`;
            html += `<span>${power.name || 'Unnamed Power'} ${power.descriptors ? `<span class="print-muted" style="font-size: 12px; font-weight: normal;">[${power.descriptors}]</span>` : ''}</span>`;
            let ptCost = char.calculateTotalPowerCost ? char.calculateTotalPowerCost(power) : 0;
            html += `<span>${ptCost} PP</span>`;
            html += `</div>`;

            if (power.effects && power.effects.length > 0) {
                power.effects.forEach((eff) => {
                    let prefix = "";
                    if (eff.association === 'primary') prefix = "[Primary] ";
                    if (eff.association === 'alternate') prefix = "[Alt] ";
                    if (eff.association === 'dynamic') prefix = "[Dyn] ";

                    html += `<div style="padding-left: ${eff.association && eff.association !== 'primary' ? '12px' : '0'}; margin-bottom: 6px;">`;
                    html += `<div style="font-weight: bold; font-size: 14px;">${prefix}${eff.effectName || 'Effect'} <span class="print-value">Rank ${eff.rank || 1}</span></div>`;
                    
                    if (eff.descriptors) {
                        html += `<div style="padding-left: 12px; font-size: 13px; color: #4b5563; margin-top: 2px;"><i>Descriptors:</i> ${eff.descriptors}</div>`;
                    }
                    if (eff.options && Object.keys(eff.options).length > 0) {
                        let opts = [];
                        for (let k in eff.options) {
                            if (eff.options[k] && eff.options[k] !== "- Select Condition -" && eff.options[k] !== "- None -" && eff.options[k] !== "- Select Medium -") {
                                opts.push(`${eff.options[k]}`);
                            }
                        }
                        if (opts.length > 0) {
                            html += `<div style="padding-left: 12px; font-size: 13px; margin-top: 2px;"><i>Options:</i> ${opts.join(', ')}</div>`;
                        }
                    }
                    if (eff.notes) {
                        html += `<div style="padding-left: 12px; font-size: 13px; margin-top: 2px;"><i>Notes:</i> ${eff.notes}</div>`;
                    }

                    if (eff.subPowers && eff.subPowers.length > 0) {
                        html += `<div style="padding-left: 12px; font-size: 13px; margin-top: 2px;">`;
                        eff.subPowers.forEach(sub => {
                            let sR = sub.rank || 1;
                            html += `<div>• ${sub.name || sub.type} (Rank ${sR}) ${sub.details ? `- ${sub.details}` : ''}</div>`;
                        });
                        html += `</div>`;
                    }
                    
                    if (eff.modifiers && eff.modifiers.length > 0) {
                        let mods = eff.modifiers.map(m => {
                            let sign = m.category === 'extra' ? '+' : '-';
                            return `${m.name} (${sign}${m.cost || 1})`;
                        }).join(', ');
                        html += `<div style="padding-left: 12px; font-size: 12px; color: #4b5563; margin-top: 2px;">Modifiers: ${mods}</div>`;
                    }
                    html += `</div>`;
                });
            }
            html += `</div>`;
        });
        html += `</div>`;
    }

    if (char.blueprints && char.blueprints.length > 0) {
        hasExtraContent = true;
        html += `<div class="print-box-title" style="margin: 16px 0 8px 0;">Improvised Effects</div>`;
        char.blueprints.forEach(imp => {
            html += `<div class="print-avoid-break print-box" style="margin-bottom: 8px;">`;
            html += `<strong>${imp.name}</strong> (${imp.cost || 0} PP)<br>`;
            html += `<span class="print-muted">${imp.description || 'No description.'}</span>`;
            html += `</div>`;
        });
    }

    let hasEq = char.gear && char.gear.length > 0;
    let hasVeh = char.vehicles && char.vehicles.length > 0;
    let hasHq = char.installations && char.installations.length > 0;
    
    if (hasEq || hasVeh || hasHq) {
        hasExtraContent = true;
        html += `<div class="print-box-title" style="margin: 16px 0 8px 0;">Equipment, Vehicles & HQ</div>`;
        
        if (hasEq) {
            char.gear.forEach(eq => {
                html += `<div class="print-avoid-break print-box" style="margin-bottom: 8px; font-size: 13px;">`;
                html += `<strong>${eq.name || 'Gear'}</strong> (${eq.cost || 0} EP) ${eq.notes ? `<span class="print-muted">- ${eq.notes}</span>` : ''}`;
                html += `</div>`;
            });
        }
        
        if (hasVeh) {
            char.vehicles.forEach(vh => {
                html += `<div class="print-avoid-break print-box" style="margin-bottom: 8px; font-size: 13px;">`;
                html += `<strong>${vh.name || 'Vehicle'}</strong> (${vh.cost || 0} EP) ${vh.notes ? `<span class="print-muted">- ${vh.notes}</span>` : ''}`;
                html += `</div>`;
            });
        }
        
        if (hasHq) {
            char.installations.forEach(hq => {
                html += `<div class="print-avoid-break print-box" style="margin-bottom: 8px; font-size: 13px;">`;
                html += `<strong>${hq.name || 'HQ'}</strong> (${hq.cost || 0} EP) ${hq.notes ? `<span class="print-muted">- ${hq.notes}</span>` : ''}`;
                html += `</div>`;
            });
        }
    }

    let hasBg = char.history || char.identity || char.motivation || char.complications;
    if (hasBg) {
        hasExtraContent = true;
        html += `<div class="print-avoid-break" style="margin-top: 16px;">`;
        html += `<div class="print-box-title" style="margin: 0 0 8px 0;">Background & Notes</div>`;
        html += `<div class="print-box" style="font-size: 13px; white-space: pre-wrap;">`;
        if (char.identity) html += `<strong>Identity:</strong> ${char.identity}\n`;
        if (char.motivation) html += `<strong>Motivation:</strong> ${char.motivation}\n`;
        if (char.complications) html += `<strong>Complications:</strong> ${char.complications}\n`;
        if (char.history) html += `<strong>History:</strong> ${char.history}\n`;
        html += `</div></div>`;
    }

    if (!hasExtraContent) {
        html += `<div class="print-box" style="text-align: center; color: #6b7280; font-style: italic;">No powers, gear, or background configured yet.</div>`;
    }

    html += `</div>`; // End Page Container

    // Add Footer
    html += `<div style="position: fixed; bottom: 0; left: 0; width: 100%; text-align: center; font-size: 11px; padding: 4px; background: white; z-index: 999; font-style: italic;">Mutants & Masterminds 2nd Edition</div>`;

    container.innerHTML = html;
}

function buildPrintHeader() {
    let html = `<div class="print-header">`;
    let pName = char.playerName ? `<span class="player-name">Player: ${char.playerName}</span>` : '';
    html += `<h1>${char.name || 'Unnamed Hero'}${pName}</h1>`;
    html += `<div class="print-header-details">`;
    html += `<span><strong>Power Level:</strong> ${char.powerLevel || 10}</span>`;
    
    let totalPP = 0;
    if (char.powerPointsSummary) {
        totalPP = char.powerPointsSummary.totalSpent;
    } else {
        if (char.getAbilityPP) totalPP += char.getAbilityPP();
        if (char.getCombatPP) totalPP += char.getCombatPP();
        if (char.getResistancePP) totalPP += char.getResistancePP();
        if (char.getSkillPP) totalPP += char.getSkillPP();
        if (char.getFeatsPP) totalPP += char.getFeatsPP();
        if (char.powers) {
            char.powers.forEach(p => {
                if (char.calculateTotalPowerCost) totalPP += char.calculateTotalPowerCost(p);
            });
        }
    }

    let allowed = char.totalPointsAllowed || ((char.powerLevel || 10) * 15);
    html += `<span><strong>PP Used:</strong> ${totalPP} / ${allowed} Total</span>`;
    html += `</div>`;
    html += `</div>`;
    return html;
}

// Hook into native browser printing
window.addEventListener('beforeprint', generatePrintSheet);
