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
  const STORAGE_AUTOSAVE_DATA_KEY = 'mm2e_campaign_autosave_data';
  const STORAGE_AUTOSAVE_META_KEY = 'mm2e_campaign_autosave_meta';
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
    const camp = data.campaigns.find(c => c.id === data.activeCampaignId) || null;
    if (camp) {
      if (!camp.gmPlayerId) camp.gmPlayerId = 'local_player';
      if (!camp.gmUserName) camp.gmUserName = 'GM';
      if (!Array.isArray(camp.authorizedUsers)) camp.authorizedUsers = [];
      if (!Array.isArray(camp.fileOperationsLog)) camp.fileOperationsLog = [];
    }
    return camp;
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

  function createCampaign(name, customCode = null, creatorPlayerId = 'local_player', gmUserName = 'GM') {
    const data = getStorageData();
    const campName = (name && name.trim()) ? name.trim() : 'New Campaign';
    const code = customCode ? customCode.trim().toLowerCase() : generateSlug(campName);

    const newCamp = {
      id: 'camp_' + Math.random().toString(36).substring(2, 9),
      name: campName,
      code: code,
      createdAt: new Date().toISOString(),
      gmPlayerId: creatorPlayerId || 'local_player',
      gmUserName: gmUserName || 'GM',
      npcs: [],
      acceptedPlayers: [],
      authorizedUsers: [],
      pendingRequests: [],
      forcedModes: {
        forceSilentParty: false,
        forceSilentPlayers: {}
      },
      sessionLog: [],
      fileOperationsLog: [
        {
          id: 'flog_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
          timestamp: new Date().toISOString(),
          message: `Campaign "${campName}" created. Designated GM: ${creatorPlayerId || 'local_player'}.`,
          type: 'info'
        }
      ],
      combatState: {
        round: 1,
        activeTurnId: null,
        initiativeOrder: []
      }
    };

    data.campaigns.push(newCamp);
    data.activeCampaignId = newCamp.id;
    saveStorageData(data);
    saveAutoBackup(false);
    return newCamp;
  }

  function updateActiveCampaign(patch) {
    const data = getStorageData();
    const camp = data.campaigns.find(c => c.id === data.activeCampaignId);
    if (!camp) return null;

    Object.assign(camp, patch);
    saveStorageData(data);
    saveAutoBackup(true);
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
      currentBruises: (characterData.trackerState?.conditions?.Bruised) || (characterData.currentBruises) || 0,
      currentInjured: (characterData.trackerState?.conditions?.Injured) || (characterData.currentInjured) || 0,
      conditions: characterData.trackerState?.conditions ? { ...characterData.trackerState.conditions } : (characterData.conditions ? { ...characterData.conditions } : {}),
      heroPoints: typeof characterData.heroPoints === 'number' ? characterData.heroPoints : (typeof characterData.heroPointsInput === 'number' ? characterData.heroPointsInput : 0),
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
    if (!Array.isArray(camp.authorizedUsers)) camp.authorizedUsers = [];
    if (!Array.isArray(camp.acceptedPlayers)) camp.acceptedPlayers = [];

    const pName = (playerInfo.playerName || '').trim();
    const normalizedPlayerName = pName.toLowerCase();

    // 1. Check if user is pre-authorized by GM in authorizedUsers whitelist
    const authEntry = camp.authorizedUsers.find(u => (u.userName || '').trim().toLowerCase() === normalizedPlayerName);
    if (authEntry) {
      authEntry.lastLogin = new Date().toISOString();
      authEntry.lastCharacter = playerInfo.characterName || 'Hero';

      let playerRecord = camp.acceptedPlayers.find(p => (p.playerName || '').trim().toLowerCase() === normalizedPlayerName);
      if (!playerRecord) {
        playerRecord = {
          id: playerInfo.id || 'peer_' + Math.random().toString(36).substring(2, 7),
          playerName: pName,
          characterName: playerInfo.characterName || 'Hero',
          characterSummary: playerInfo.characterSummary || {},
          approvedAt: new Date().toISOString(),
          forceSilent: false
        };
        camp.acceptedPlayers.push(playerRecord);
      } else {
        playerRecord.id = playerInfo.id || playerRecord.id;
        playerRecord.characterName = playerInfo.characterName || playerRecord.characterName;
        playerRecord.characterSummary = playerInfo.characterSummary || playerRecord.characterSummary;
      }

      camp.pendingRequests = camp.pendingRequests.filter(r => r.id !== playerInfo.id && (r.playerName || '').trim().toLowerCase() !== normalizedPlayerName);

      updateActiveCampaign({
        authorizedUsers: camp.authorizedUsers,
        acceptedPlayers: camp.acceptedPlayers,
        pendingRequests: camp.pendingRequests
      });

      addFileOperationLog(`Authorized user "${pName}" logged into campaign "${camp.name}" with character "${playerInfo.characterName || 'Hero'}".`, 'user_login');
      return { status: 'already_accepted' };
    }

    // 2. Check if already accepted previously
    const alreadyAccepted = camp.acceptedPlayers.some(p => p.id === playerInfo.id || (p.playerName && p.playerName.trim().toLowerCase() === normalizedPlayerName && p.characterName === playerInfo.characterName));
    if (alreadyAccepted) return { status: 'already_accepted' };

    // 3. Queue as pending join request
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

  // --- Authorized Campaign Users Management ---
  function getAuthorizedUsers() {
    const camp = getActiveCampaign();
    if (!camp) return [];
    if (!Array.isArray(camp.authorizedUsers)) camp.authorizedUsers = [];
    return camp.authorizedUsers;
  }

  function addAuthorizedUser(userName, notes = '') {
    const camp = getActiveCampaign();
    if (!camp) return { success: false, error: 'No active campaign' };
    if (!userName || !userName.trim()) return { success: false, error: 'User name cannot be empty' };

    const trimmed = userName.trim();
    if (!Array.isArray(camp.authorizedUsers)) camp.authorizedUsers = [];

    const exists = camp.authorizedUsers.some(u => (u.userName || '').trim().toLowerCase() === trimmed.toLowerCase());
    if (exists) return { success: false, error: `User "${trimmed}" is already authorized for this campaign.` };

    const newUser = {
      id: 'usr_' + Math.random().toString(36).substring(2, 8),
      userName: trimmed,
      addedAt: new Date().toISOString(),
      notes: notes || '',
      lastLogin: null,
      lastCharacter: null
    };

    camp.authorizedUsers.push(newUser);
    updateActiveCampaign({ authorizedUsers: camp.authorizedUsers });
    addFileOperationLog(`Added authorized user "${trimmed}" to campaign "${camp.name}".`, 'user_whitelist');
    return { success: true, user: newUser };
  }

  function removeAuthorizedUser(userName) {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.authorizedUsers)) return false;

    const trimmed = (userName || '').trim().toLowerCase();
    const initialLen = camp.authorizedUsers.length;
    camp.authorizedUsers = camp.authorizedUsers.filter(u => (u.userName || '').trim().toLowerCase() !== trimmed && u.id !== userName);

    if (camp.authorizedUsers.length !== initialLen) {
      updateActiveCampaign({ authorizedUsers: camp.authorizedUsers });
      addFileOperationLog(`Removed authorized user "${userName}" from campaign "${camp.name}".`, 'user_whitelist');
      return true;
    }
    return false;
  }

  function isUserAuthorized(userName) {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.authorizedUsers) || camp.authorizedUsers.length === 0) return true; // Open if no list defined
    const trimmed = (userName || '').trim().toLowerCase();
    return camp.authorizedUsers.some(u => (u.userName || '').trim().toLowerCase() === trimmed);
  }

  function setGMUserName(name) {
    const camp = getActiveCampaign();
    if (!camp) return false;
    const cleanName = (name && name.trim()) ? name.trim() : 'GM';
    camp.gmUserName = cleanName;
    updateActiveCampaign({ gmUserName: cleanName });
    addFileOperationLog(`GM user name set to "${cleanName}" for campaign "${camp.name}".`, 'gm_identity');
    return true;
  }

  function getGMUserName() {
    const camp = getActiveCampaign();
    return camp?.gmUserName || 'GM';
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

  // --- Campaign File Operations Log ---
  function addFileOperationLog(message, type = 'info') {
    const camp = getActiveCampaign();
    if (!camp) return null;
    if (!Array.isArray(camp.fileOperationsLog)) camp.fileOperationsLog = [];

    const entry = {
      id: 'flog_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      message: String(message || ''),
      type: type || 'info'
    };

    camp.fileOperationsLog.push(entry);
    if (camp.fileOperationsLog.length > 200) {
      camp.fileOperationsLog = camp.fileOperationsLog.slice(-200);
    }

    const data = getStorageData();
    const c = data.campaigns.find(x => x.id === camp.id);
    if (c) c.fileOperationsLog = camp.fileOperationsLog;
    saveStorageData(data);
    return entry;
  }

  function getFileOperationsLog() {
    const camp = getActiveCampaign();
    return camp && Array.isArray(camp.fileOperationsLog) ? [...camp.fileOperationsLog] : [];
  }

  function clearFileOperationsLog() {
    const camp = getActiveCampaign();
    if (!camp) return;
    camp.fileOperationsLog = [];
    const data = getStorageData();
    const c = data.campaigns.find(x => x.id === camp.id);
    if (c) c.fileOperationsLog = [];
    saveStorageData(data);
  }

  // --- Designated GM & GM Transfer ---
  function getGMPlayerId() {
    const camp = getActiveCampaign();
    return camp ? (camp.gmPlayerId || 'local_player') : 'local_player';
  }

  function isDesignatedGM(playerId) {
    const camp = getActiveCampaign();
    if (!camp) return false;
    const currentGM = camp.gmPlayerId || 'local_player';
    return currentGM === playerId || (currentGM === 'local_player' && (!playerId || playerId === 'local_player'));
  }

  function transferGM(newGmPlayerId, previousGmPlayerId = null) {
    const camp = getActiveCampaign();
    if (!camp) return false;

    const prev = previousGmPlayerId || camp.gmPlayerId || 'local_player';
    const player = (camp.acceptedPlayers || []).find(p => p.id === newGmPlayerId);
    const targetLabel = player ? `${player.playerName} (${player.characterName})` : newGmPlayerId;

    updateActiveCampaign({ gmPlayerId: newGmPlayerId });
    addFileOperationLog(`GM status transferred from ${prev} to ${targetLabel}.`, 'gm_transfer');
    return true;
  }

  // --- Remote Character Sheet Ingestion & Revision History ---
  function ingestCharacterSheet(playerId, sheetData, playerName = null, characterName = null) {
    const camp = getActiveCampaign();
    if (!camp) return null;
    if (!Array.isArray(camp.acceptedPlayers)) camp.acceptedPlayers = [];

    let player = camp.acceptedPlayers.find(p => p.id === playerId);
    if (!player && characterName) {
      player = camp.acceptedPlayers.find(p => p.characterName === characterName);
    }
    if (!player) return null;

    if (!Array.isArray(player.sheetHistory)) player.sheetHistory = [];

    const nextVer = player.sheetHistory.length > 0 ? (player.sheetHistory[player.sheetHistory.length - 1].version + 1) : 1;
    const heroName = characterName || sheetData?.character?.name || player.characterName || 'Hero';
    const pl = sheetData?.character?.powerLevel || player.characterSummary?.powerLevel || 10;

    const revision = {
      version: nextVer,
      timestamp: new Date().toISOString(),
      characterName: heroName,
      powerLevel: pl,
      sheet: JSON.parse(JSON.stringify(sheetData))
    };

    player.characterSheet = JSON.parse(JSON.stringify(sheetData));
    player.sheetHistory.push(revision);
    if (player.sheetHistory.length > 20) {
      player.sheetHistory = player.sheetHistory.slice(-20);
    }

    if (playerName) player.playerName = playerName;
    if (characterName) player.characterName = characterName;

    updateActiveCampaign({ acceptedPlayers: camp.acceptedPlayers });
    addFileOperationLog(`Received character sheet for "${heroName}" from ${playerName || player.playerName} (v${nextVer}).`, 'sheet_receive');
    return revision;
  }

  function getCharacterSheetHistory(playerId) {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.acceptedPlayers)) return [];
    const player = camp.acceptedPlayers.find(p => p.id === playerId || p.characterName === playerId);
    return player && Array.isArray(player.sheetHistory) ? [...player.sheetHistory] : [];
  }

  // --- Campaign Auto-Backup & Crash Recovery ---
  function saveAutoBackup(isDirty = true) {
    try {
      const camp = getActiveCampaign();
      if (!camp) return;

      const snapshot = JSON.stringify(camp);
      const meta = {
        campaignId: camp.id,
        campaignName: camp.name,
        code: camp.code,
        savedAt: new Date().toISOString(),
        isDirty: !!isDirty
      };

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_AUTOSAVE_DATA_KEY, snapshot);
        localStorage.setItem(STORAGE_AUTOSAVE_META_KEY, JSON.stringify(meta));
      }
    } catch (e) {
      console.warn('CampaignManager: saveAutoBackup error', e);
    }
  }

  function getAutoBackupMeta() {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(STORAGE_AUTOSAVE_META_KEY);
        if (raw) return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('CampaignManager: getAutoBackupMeta error', e);
    }
    return null;
  }

  function isAutoBackupDirty() {
    const meta = getAutoBackupMeta();
    return !!(meta && meta.isDirty);
  }

  function clearAutoBackupDirty() {
    try {
      const meta = getAutoBackupMeta();
      if (meta && typeof localStorage !== 'undefined') {
        meta.isDirty = false;
        localStorage.setItem(STORAGE_AUTOSAVE_META_KEY, JSON.stringify(meta));
      }
    } catch (e) {
      console.warn('CampaignManager: clearAutoBackupDirty error', e);
    }
  }

  function restoreAutoBackup() {
    try {
      if (typeof localStorage === 'undefined') return null;
      const raw = localStorage.getItem(STORAGE_AUTOSAVE_DATA_KEY);
      if (!raw) return null;

      const restoredCamp = JSON.parse(raw);
      if (!restoredCamp || !restoredCamp.id || !restoredCamp.name) return null;

      const data = getStorageData();
      const existingIdx = data.campaigns.findIndex(c => c.id === restoredCamp.id);
      if (existingIdx >= 0) {
        data.campaigns[existingIdx] = restoredCamp;
      } else {
        data.campaigns.push(restoredCamp);
      }
      data.activeCampaignId = restoredCamp.id;
      saveStorageData(data);

      addFileOperationLog(`Restored campaign session from autosave snapshot (${restoredCamp.name}).`, 'restore');
      clearAutoBackupDirty();
      return restoredCamp;
    } catch (e) {
      console.error('CampaignManager: restoreAutoBackup error', e);
      return null;
    }
  }

  // --- Export & Import ---
  function exportCampaign(id = null) {
    const data = getStorageData();
    const targetId = id || data.activeCampaignId;
    const camp = data.campaigns.find(c => c.id === targetId);
    if (!camp) return null;

    clearAutoBackupDirty();
    addFileOperationLog(`Manual backup exported as JSON (${camp.name}).`, 'backup');

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
      if (!campData.gmPlayerId) campData.gmPlayerId = 'local_player';
      if (!campData.gmUserName) campData.gmUserName = 'GM';
      if (!Array.isArray(campData.authorizedUsers)) campData.authorizedUsers = [];
      if (!Array.isArray(campData.fileOperationsLog)) campData.fileOperationsLog = [];

      campData.fileOperationsLog.push({
        id: 'flog_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        timestamp: new Date().toISOString(),
        message: `Campaign imported from JSON file.`,
        type: 'restore'
      });

      data.campaigns.push(campData);
      data.activeCampaignId = campData.id;
      saveStorageData(data);
      saveAutoBackup(false);
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
    importCampaign,
    addFileOperationLog,
    getFileOperationsLog,
    clearFileOperationsLog,
    getGMPlayerId,
    isDesignatedGM,
    transferGM,
    ingestCharacterSheet,
    getCharacterSheetHistory,
    saveAutoBackup,
    getAutoBackupMeta,
    isAutoBackupDirty,
    clearAutoBackupDirty,
    restoreAutoBackup,
    getAuthorizedUsers,
    addAuthorizedUser,
    removeAuthorizedUser,
    isUserAuthorized,
    setGMUserName,
    getGMUserName
  };
}));
