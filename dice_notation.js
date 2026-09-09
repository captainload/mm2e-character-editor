/**
 * dice_notation.js - Dice Notation Parser & Roller for MM2CG
 * Supports standard dice expressions: XdY + Z, XdY - Z, d20, shorthand +5 / -2 (infers 1d20)
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.DiceNotation = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  function rollDie(sides) {
    return Math.floor(Math.random() * sides) + 1;
  }

  /**
   * Parses and rolls a dice notation string.
   * @param {string} input - The dice notation expression, e.g. "1d20+5", "2d6+3", "+4", "d20-2"
   * @param {number} defaultSides - Default die sides if not specified (default 20)
   * @returns {object} { valid, expression, total, rolls, modifier, breakdown, isNat20, isNat1 }
   */
  function roll(input, defaultSides = 20) {
    if (!input || typeof input !== 'string') {
      input = `1d${defaultSides}`;
    }

    let cleaned = input.trim().toLowerCase().replace(/\s+/g, '');

    // Handle shorthand "+5" or "-2" -> "1d20+5"
    if (/^[+-]\d+$/.test(cleaned)) {
      cleaned = `1d${defaultSides}${cleaned}`;
    } else if (/^\d+$/.test(cleaned)) {
      // Just a raw number e.g. "5" -> treat as modifier "+5"
      cleaned = `1d${defaultSides}+${cleaned}`;
    }

    // Tokenize terms: e.g. "1d20+2d6-3" or "d20+5"
    const termRegex = /([+-]?)(?:(\d*)d(\d+)|(\d+))/g;
    let match;
    let total = 0;
    const rolls = [];
    const breakdownParts = [];
    let matchedAny = false;
    let singleD20Roll = null;

    while ((match = termRegex.exec(cleaned)) !== null) {
      if (match[0] === '') continue;
      matchedAny = true;
      const sign = match[1] === '-' ? -1 : 1;
      const signSymbol = match[1] === '-' ? ' - ' : ' + ';

      if (match[3] !== undefined) {
        // Dice term: [count]d[sides]
        const count = match[2] ? Math.min(100, Math.max(1, parseInt(match[2], 10))) : 1;
        const sides = Math.min(1000, Math.max(1, parseInt(match[3], 10)));
        const termRolls = [];
        let termTotal = 0;

        for (let i = 0; i < count; i++) {
          const r = rollDie(sides);
          termRolls.push(r);
          termTotal += r;
          if (sides === 20 && count === 1) {
            singleD20Roll = r;
          }
        }

        total += sign * termTotal;
        rolls.push(...termRolls);

        const rollStr = `[${termRolls.join(', ')}]`;
        if (breakdownParts.length === 0) {
          breakdownParts.push(sign === -1 ? `-${rollStr}` : rollStr);
        } else {
          breakdownParts.push(`${signSymbol}${rollStr}`);
        }
      } else if (match[4] !== undefined) {
        // Flat modifier
        const mod = parseInt(match[4], 10);
        total += sign * mod;
        if (breakdownParts.length === 0) {
          breakdownParts.push(sign === -1 ? `-${mod}` : `${mod}`);
        } else {
          breakdownParts.push(`${signSymbol}${mod}`);
        }
      }
    }

    if (!matchedAny) {
      const d20 = rollDie(defaultSides);
      return {
        valid: true,
        expression: `1d${defaultSides}`,
        total: d20,
        rolls: [d20],
        modifier: 0,
        breakdown: `[${d20}] = ${d20}`,
        isNat20: defaultSides === 20 && d20 === 20,
        isNat1: defaultSides === 20 && d20 === 1
      };
    }

    const breakdown = `${breakdownParts.join('')} = ${total}`;
    return {
      valid: true,
      expression: cleaned,
      total,
      rolls,
      breakdown,
      isNat20: singleD20Roll === 20,
      isNat1: singleD20Roll === 1
    };
  }

  return {
    rollDie,
    roll
  };
}));
