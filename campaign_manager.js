/**
 * campaign_manager.js - Multi-Campaign & GM Tabletop State Manager for MM2CG
 * Manages campaigns, NPC attachments, player approval whitelists, log history, and backups.
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CampaignManager = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  const STORAGE_KEY = 'mm2e_campaigns_data';
  let memoryStore = { activeCampaignId: null, campaigns: [] };

  function generateSlug(name) {
    const base = (name || 'campaign')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const rand = Math.random().toString(36).substring(2, 6);
    return `${base || 'camp'}-${rand}`;
  }

  function getStorageData() {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
      } else {
        return memoryStore;
      }
    } catch (e) {
      console.warn('CampaignManager: error reading localStorage', e);
    }
    return memoryStore;
  }

  function saveStorageData(data) {
    memoryStore = data;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    } catch (e) {
      console.error('CampaignManager: error saving to localStorage', e);
    }
  }

  function getCampaigns() {
    return getStorageData().campaigns || [];
  }

  function getActiveCampaign() {
    const data = getStorageData();
    if (!data.activeCampaignId && data.campaigns.length > 0) {
      data.activeCampaignId = data.campaigns[0].id;
      saveStorageData(data);
    }
    return data.campaigns.find(c => c.id === data.activeCampaignId) || null;
  }

  function setActiveCampaign(id) {
    const data = getStorageData();
    const exists = data.campaigns.some(c => c.id === id);
    if (exists) {
      data.activeCampaignId = id;
      saveStorageData(data);
      return true;
    }
    return false;
  }

  function createCampaign(name, customCode = null) {
    const data = getStorageData();
    const campName = (name && name.trim()) ? name.trim() : 'New Campaign';
    const code = customCode ? customCode.trim().toLowerCase() : generateSlug(campName);

    const newCamp = {
      id: 'camp_' + Math.random().toString(36).substring(2, 9),
      name: campName,
      code: code,
      createdAt: new Date().toISOString(),
      npcs: [],
      acceptedPlayers: [],
      pendingRequests: [],
      forcedModes: {
        forceSilentParty: false,
        forceSilentPlayers: {}
      },
      sessionLog: [],
      combatState: {
        round: 1,
        activeTurnId: null,
        initiativeOrder: []
      }
    };

    data.campaigns.push(newCamp);
    data.activeCampaignId = newCamp.id;
    saveStorageData(data);
    return newCamp;
  }

  function updateActiveCampaign(patch) {
    const data = getStorageData();
    const camp = data.campaigns.find(c => c.id === data.activeCampaignId);
    if (!camp) return null;

    Object.assign(camp, patch);
    saveStorageData(data);
    return camp;
  }

  function deleteCampaign(id) {
    const data = getStorageData();
    data.campaigns = data.campaigns.filter(c => c.id !== id);
    if (data.activeCampaignId === id) {
      data.activeCampaignId = data.campaigns.length > 0 ? data.campaigns[0].id : null;
    }
    saveStorageData(data);
  }

  // --- NPC Management ---
  function attachNPC(characterData, customName = null, customPL = null) {
    const camp = getActiveCampaign();
    if (!camp) return null;

    const name = customName || characterData.name || 'Unnamed NPC';
    const pl = customPL !== null ? customPL : (characterData.powerLevel || 10);

    const npc = {
      id: 'npc_' + Math.random().toString(36).substring(2, 9),
      name,
      powerLevel: pl,
      characterData: JSON.parse(JSON.stringify(characterData)),
      currentBruises: 0,
      conditions: {},
      heroPoints: 0,
      attachedAt: new Date().toISOString()
    };

    if (!Array.isArray(camp.npcs)) camp.npcs = [];
    camp.npcs.push(npc);
    updateActiveCampaign({ npcs: camp.npcs });
    return npc;
  }

  function removeNPC(npcId) {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.npcs)) return;
    const filtered = camp.npcs.filter(n => n.id !== npcId);
    updateActiveCampaign({ npcs: filtered });
  }

  function updateNPCConditions(npcId, bruises, conditions, injured) {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.npcs)) return;
    const npc = camp.npcs.find(n => n.id === npcId);
    if (npc) {
      if (bruises !== undefined) npc.currentBruises = Math.max(0, Number(bruises) || 0);
      if (injured !== undefined) npc.currentInjured = Math.max(0, Number(injured) || 0);
      if (conditions !== undefined) npc.conditions = { ...conditions };
      updateActiveCampaign({ npcs: camp.npcs });
    }
  }

  function updatePlayerConditions(playerId, bruises, conditions, heroPoints, injured) {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.acceptedPlayers)) return;
    const player = camp.acceptedPlayers.find(p => p.id === playerId || p.characterName === playerId);
    if (player) {
      if (bruises !== undefined) player.currentBruises = Math.max(0, Number(bruises) || 0);
      if (injured !== undefined) player.currentInjured = Math.max(0, Number(injured) || 0);
      if (conditions !== undefined) player.conditions = { ...conditions };
      if (heroPoints !== undefined) player.heroPoints = Math.max(0, Number(heroPoints) || 0);
      updateActiveCampaign({ acceptedPlayers: camp.acceptedPlayers });
    }
  }

  // --- Player Join Requests & Whitelist ---
  function addPlayerRequest(playerInfo) {
    const camp = getActiveCampaign();
    if (!camp) return null;
    if (!Array.isArray(camp.pendingRequests)) camp.pendingRequests = [];

    const alreadyAccepted = (camp.acceptedPlayers || []).some(p => p.id === playerInfo.id || (p.playerName === playerInfo.playerName && p.characterName === playerInfo.characterName));
    if (alreadyAccepted) return { status: 'already_accepted' };

    const existingIdx = camp.pendingRequests.findIndex(r => r.id === playerInfo.id);
    const requestItem = {
      id: playerInfo.id || 'peer_' + Math.random().toString(36).substring(2, 7),
      playerName: playerInfo.playerName || 'Anonymous Player',
      characterName: playerInfo.characterName || 'Hero',
      characterSummary: playerInfo.characterSummary || {},
      requestedAt: new Date().toISOString()
    };

    if (existingIdx >= 0) {
      camp.pendingRequests[existingIdx] = requestItem;
    } else {
      camp.pendingRequests.push(requestItem);
    }

    updateActiveCampaign({ pendingRequests: camp.pendingRequests });
    return { status: 'pending', request: requestItem };
  }

  function approvePlayer(playerId) {
    const camp = getActiveCampaign();
    if (!camp) return false;

    const req = (camp.pendingRequests || []).find(r => r.id === playerId);
    if (!req) return false;

    if (!Array.isArray(camp.acceptedPlayers)) camp.acceptedPlayers = [];
    camp.acceptedPlayers.push({
      id: req.id,
      playerName: req.playerName,
      characterName: req.characterName,
      characterSummary: req.characterSummary,
      approvedAt: new Date().toISOString(),
      forceSilent: false
    });

    camp.pendingRequests = camp.pendingRequests.filter(r => r.id !== playerId);
    updateActiveCampaign({
      acceptedPlayers: camp.acceptedPlayers,
      pendingRequests: camp.pendingRequests
    });
    return true;
  }

  function rejectPlayer(playerId) {
    const camp = getActiveCampaign();
    if (!camp) return false;
    camp.pendingRequests = (camp.pendingRequests || []).filter(r => r.id !== playerId);
    updateActiveCampaign({ pendingRequests: camp.pendingRequests });
    return true;
  }

  function removePlayer(playerId) {
    const camp = getActiveCampaign();
    if (!camp) return;
    camp.acceptedPlayers = (camp.acceptedPlayers || []).filter(p => p.id !== playerId);
    updateActiveCampaign({ acceptedPlayers: camp.acceptedPlayers });
  }

  // --- Forced Modes (Silent, etc.) ---
  function setPlayerForcedMode(playerId, mode, val) {
    const camp = getActiveCampaign();
    if (!camp) return;
    if (!camp.forcedModes) camp.forcedModes = { forceSilentParty: false, forceSilentPlayers: {} };
    if (!camp.forcedModes.forceSilentPlayers) camp.forcedModes.forceSilentPlayers = {};

    if (mode === 'silent') {
      camp.forcedModes.forceSilentPlayers[playerId] = !!val;
    }
    updateActiveCampaign({ forcedModes: camp.forcedModes });
  }

  function setPartyForcedMode(mode, val) {
    // Retained for backward compatibility; status toggles are individual per character
  }

  function isCharacterSilent(characterOrPlayerId) {
    const camp = getActiveCampaign();
    if (!camp || !camp.forcedModes) return false;
    return !!(camp.forcedModes.forceSilentPlayers && camp.forcedModes.forceSilentPlayers[characterOrPlayerId]);
  }

  // --- Session Log History ---
  function addLogEntry(entry) {
    const camp = getActiveCampaign();
    if (!camp) return null;
    if (!Array.isArray(camp.sessionLog)) camp.sessionLog = [];

    const fullEntry = {
      id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      ...entry
    };

    camp.sessionLog.push(fullEntry);
    if (camp.sessionLog.length > 250) {
      camp.sessionLog = camp.sessionLog.slice(-250);
    }

    updateActiveCampaign({ sessionLog: camp.sessionLog });
    return fullEntry;
  }

  function clearLog() {
    const camp = getActiveCampaign();
    if (!camp) return;
    updateActiveCampaign({ sessionLog: [] });
  }

  // --- Export & Import ---
  function exportCampaign(id = null) {
    const data = getStorageData();
    const targetId = id || data.activeCampaignId;
    const camp = data.campaigns.find(c => c.id === targetId);
    if (!camp) return null;

    return JSON.stringify({
      format: 'MM2E_CAMPAIGN',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      campaign: camp
    }, null, 2);
  }

  function importCampaign(jsonString) {
    try {
      const parsed = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
      const campData = (parsed.format === 'MM2E_CAMPAIGN' && parsed.campaign) ? parsed.campaign : parsed;

      if (!campData || !campData.name) {
        throw new Error('Invalid campaign format: missing campaign name');
      }

      const data = getStorageData();
      campData.id = 'camp_' + Math.random().toString(36).substring(2, 9);
      if (!campData.code) campData.code = generateSlug(campData.name);

      data.campaigns.push(campData);
      data.activeCampaignId = campData.id;
      saveStorageData(data);
      return { success: true, campaign: campData };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  return {
    generateSlug,
    getCampaigns,
    getActiveCampaign,
    setActiveCampaign,
    createCampaign,
    updateActiveCampaign,
    deleteCampaign,
    attachNPC,
    removeNPC,
    updateNPCConditions,
    updatePlayerConditions,
    addPlayerRequest,
    approvePlayer,
    rejectPlayer,
    removePlayer,
    setPlayerForcedMode,
    setPartyForcedMode,
    isCharacterSilent,
    addLogEntry,
    clearLog,
    exportCampaign,
    importCampaign
  };
}));
