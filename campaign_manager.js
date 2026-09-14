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
      if (!Array.isArray(camp.timeline)) camp.timeline = [];
      if (camp.autoBackupCharacters === undefined) camp.autoBackupCharacters = true;
      if (!Array.isArray(camp.encounterEnemies)) camp.encounterEnemies = [];
      if (!Array.isArray(camp.partyCharacterIds)) camp.partyCharacterIds = [];
      if (!Array.isArray(camp.savedCharacters)) camp.savedCharacters = [];
      if (!camp.sessionState) {
        camp.sessionState = {
          status: 'ended',
          sessionNumber: 1,
          startedAt: null,
          pausedAt: null,
          totalElapsedMs: 0,
          sessionHistory: []
        };
      }
    }
    return camp;
  }

  function setActiveCampaign(id) {
    const data = getStorageData();
    const camp = data.campaigns.find(c => c.id === id);
    if (camp) {
      data.activeCampaignId = id;
      saveStorageData(data);
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem("mm2e_include_gm_char_in_party", String(!!camp.includeGmCharInParty));
        }
      } catch (e) {}
      return true;
    }
    return false;
  }

  function createCampaign(name, customCode = null, creatorPlayerId = 'local_player', gmUserName = 'GM') {
    const data = getStorageData();
    const campName = (name && name.trim()) ? name.trim() : 'New Campaign';
    const code = customCode ? customCode.trim().toLowerCase() : generateSlug(campName);

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem("mm2e_include_gm_char_in_party", "false");
      }
    } catch (e) {}

    let effectiveGMName = (gmUserName && gmUserName.trim() && gmUserName.trim() !== 'GM') ? gmUserName.trim() : null;
    if (!effectiveGMName) {
      try {
        const userAcc = getUserAccount();
        if (userAcc && userAcc.userName && userAcc.userName.trim() && userAcc.userName.trim() !== 'GM') {
          effectiveGMName = userAcc.userName.trim();
        } else if (typeof localStorage !== 'undefined') {
          const localName = localStorage.getItem('mm2e_player_name');
          if (localName && localName.trim() && localName.trim() !== 'GM') {
            effectiveGMName = localName.trim();
          }
        }
      } catch (e) {}
    }
    if (!effectiveGMName) effectiveGMName = 'GM';

    const newCamp = {
      id: 'camp_' + Math.random().toString(36).substring(2, 9),
      name: campName,
      code: code,
      createdAt: new Date().toISOString(),
      gmPlayerId: creatorPlayerId || 'local_player',
      gmUserName: effectiveGMName,
      npcs: [],
      encounterEnemies: [],
      acceptedPlayers: [],
      authorizedUsers: [],
      partyCharacterIds: [],
      savedCharacters: [],
      pendingRequests: [],
      timeline: [],
      autoBackupCharacters: true,
      includeGmCharInParty: false,
      sessionState: {
        status: 'ended',
        sessionNumber: 1,
        startedAt: null,
        pausedAt: null,
        totalElapsedMs: 0,
        sessionHistory: []
      },
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
  function enumerateNPCName(incomingName, existingList) {
    if (!incomingName) incomingName = 'NPC';
    const cleanBase = incomingName.replace(/\s*#\d+$/, '').trim();
    
    // Find all items in existingList that share this base name
    const matches = (existingList || []).filter(item => {
      const itemName = (item.name || '').trim();
      const itemBase = itemName.replace(/\s*#\d+$/, '').trim();
      return itemBase.toLowerCase() === cleanBase.toLowerCase();
    });

    if (matches.length === 0) {
      return incomingName;
    }

    // If there is exactly 1 match and it doesn't have a # suffix, rename it to #1
    if (matches.length === 1) {
      const single = matches[0];
      if (!/\s*#\d+$/.test(single.name)) {
        single.name = `${cleanBase} #1`;
        if (single.characterData && single.characterData.name) {
          single.characterData.name = single.name;
        }
      }
    }

    // Find the highest existing number
    let maxNum = 1;
    matches.forEach(item => {
      const m = (item.name || '').match(/\s*#(\d+)$/);
      if (m) {
        const n = parseInt(m[1], 10);
        if (n > maxNum) maxNum = n;
      }
    });

    return `${cleanBase} #${maxNum + 1}`;
  }

  function attachNPC(characterData, customName = null, customPL = null) {
    const camp = getActiveCampaign();
    if (!camp) return null;

    if (!Array.isArray(camp.npcs)) camp.npcs = [];

    const rawName = customName || characterData?.name || 'Unnamed NPC';
    const name = enumerateNPCName(rawName, camp.npcs);
    const pl = customPL !== null ? customPL : (characterData?.powerLevel || 10);

    const cData = characterData ? JSON.parse(JSON.stringify(characterData)) : {};
    cData.name = name;

    const npc = {
      id: 'npc_' + Math.random().toString(36).substring(2, 9),
      name,
      powerLevel: pl,
      characterData: cData,
      currentBruises: (characterData?.trackerState?.conditions?.Bruised) || (characterData?.currentBruises) || 0,
      currentInjured: (characterData?.trackerState?.conditions?.Injured) || (characterData?.currentInjured) || 0,
      conditions: characterData?.trackerState?.conditions ? { ...characterData.trackerState.conditions } : (characterData?.conditions ? { ...characterData.conditions } : {}),
      heroPoints: typeof characterData?.heroPoints === 'number' ? characterData.heroPoints : (typeof characterData?.heroPointsInput === 'number' ? characterData.heroPointsInput : 0),
      attachedAt: new Date().toISOString()
    };

    camp.npcs.push(npc);
    updateActiveCampaign({ npcs: camp.npcs });
    addFileOperationLog(`Attached party NPC "${name}" (PL ${pl}) to campaign.`, 'npc');
    return npc;
  }

  function updateNPCCharacterData(npcId, characterData) {
    const camp = getActiveCampaign();
    if (!camp) return false;
    let found = false;
    if (Array.isArray(camp.npcs)) {
      const npc = camp.npcs.find(n => n.id === npcId);
      if (npc) {
        npc.characterData = JSON.parse(JSON.stringify(characterData));
        if (characterData.name) npc.name = characterData.name;
        if (typeof characterData.powerLevel === 'number') npc.powerLevel = characterData.powerLevel;
        found = true;
      }
    }
    if (!found && Array.isArray(camp.encounterEnemies)) {
      const enemy = camp.encounterEnemies.find(e => e.id === npcId);
      if (enemy) {
        enemy.characterData = JSON.parse(JSON.stringify(characterData));
        if (characterData.name) enemy.name = characterData.name;
        if (typeof characterData.powerLevel === 'number') enemy.powerLevel = characterData.powerLevel;
        found = true;
      }
    }
    if (found) {
      updateActiveCampaign({ npcs: camp.npcs, encounterEnemies: camp.encounterEnemies });
      return true;
    }
    return false;
  }

  function duplicateNPC(npcId) {
    const camp = getActiveCampaign();
    if (!camp) return null;
    const npc = (camp.npcs || []).find(n => n.id === npcId);
    if (npc) {
      const cloned = attachNPC(npc.characterData, npc.name, npc.powerLevel);
      return cloned;
    }
    const enemy = (camp.encounterEnemies || []).find(e => e.id === npcId);
    if (enemy) {
      const cloned = addEncounterEnemy(enemy.characterData, enemy.name, enemy.powerLevel);
      return cloned;
    }
    return null;
  }

  function removeNPC(npcId) {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.npcs)) return;
    const filtered = camp.npcs.filter(n => n.id !== npcId);
    updateActiveCampaign({ npcs: filtered });
  }

  function updateNPCConditions(npcId, bruises, conditions, arg4, arg5) {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.npcs)) return;
    const npc = camp.npcs.find(n => n.id === npcId);
    if (!npc) return;

    let heroPoints = undefined;
    let injured = undefined;

    if (arg5 !== undefined) {
      // 5 args style: (npcId, bruises, conditions, heroPoints, injured)
      heroPoints = arg4;
      injured = arg5;
    } else if (arg4 !== undefined) {
      // 4 args style: (npcId, bruises, conditions, injured)
      injured = arg4;
    }

    if (bruises !== undefined) npc.currentBruises = Math.max(0, Number(bruises) || 0);
    if (conditions !== undefined) npc.conditions = { ...conditions };
    if (injured !== undefined) npc.currentInjured = Math.max(0, Number(injured) || 0);
    if (heroPoints !== undefined) {
      npc.heroPoints = Math.max(0, Number(heroPoints) || 0);
      if (npc.characterData) npc.characterData.heroPoints = npc.heroPoints;
    }
    updateActiveCampaign({ npcs: camp.npcs });
  }

  function updateNPCHeroPoints(npcId, hp) {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.npcs)) return;
    const npc = camp.npcs.find(n => n.id === npcId);
    if (npc) {
      npc.heroPoints = Math.max(0, Number(hp) || 0);
      if (npc.characterData) npc.characterData.heroPoints = npc.heroPoints;
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

    const pName = (playerInfo.playerName || '').replace(/\s*\(\s*PL\s*#?\d*\s*\)\*?/gi, '').trim();
    const normalizedPlayerName = pName.toLowerCase();
    const incomingToken = (playerInfo.userToken || '').trim();

    // 1. Check if user is pre-authorized by GM in authorizedUsers whitelist
    const authEntry = camp.authorizedUsers.find(u => (u.userName || '').trim().toLowerCase() === normalizedPlayerName);
    if (authEntry) {
      if (!Array.isArray(authEntry.userTokens)) {
        authEntry.userTokens = (authEntry.userToken && authEntry.userToken.trim()) ? [authEntry.userToken.trim()] : [];
      }

      // Scenario A: Unclaimed / initial login
      if (authEntry.userTokens.length === 0) {
        if (incomingToken) {
          authEntry.userTokens.push(incomingToken);
          authEntry.userToken = incomingToken;
          addFileOperationLog(`Authorized user "${pName}" bound account key (${incomingToken.substring(0, 8)}...) to campaign "${camp.name}".`, 'auth_token_bind');
        }
        authEntry.lastLogin = new Date().toISOString();
        authEntry.lastCharacter = playerInfo.characterName || 'Hero';

        const incomingCharName = (playerInfo.characterName || 'Hero').trim().toLowerCase();
        let playerRecord = camp.acceptedPlayers.find(p => p.id === playerInfo.id || ((p.playerName || '').trim().toLowerCase() === normalizedPlayerName && (p.characterName || '').trim().toLowerCase() === incomingCharName));
        if (!playerRecord) {
          playerRecord = {
            id: playerInfo.id || 'peer_' + Math.random().toString(36).substring(2, 7),
            playerName: pName,
            characterName: playerInfo.characterName || 'Hero',
            characterSummary: playerInfo.characterSummary || {},
            userToken: incomingToken || null,
            approvedAt: new Date().toISOString(),
            forceSilent: false
          };
          camp.acceptedPlayers.push(playerRecord);
        } else {
          playerRecord.id = playerInfo.id || playerRecord.id;
          playerRecord.characterName = playerInfo.characterName || playerRecord.characterName;
          playerRecord.characterSummary = playerInfo.characterSummary || playerRecord.characterSummary;
          if (incomingToken) playerRecord.userToken = incomingToken;
        }

        camp.pendingRequests = camp.pendingRequests.filter(r => r.id !== playerInfo.id && !((r.playerName || '').trim().toLowerCase() === normalizedPlayerName && (r.characterName || '').trim().toLowerCase() === incomingCharName));

        updateActiveCampaign({
          authorizedUsers: camp.authorizedUsers,
          acceptedPlayers: camp.acceptedPlayers,
          pendingRequests: camp.pendingRequests
        });

        addFileOperationLog(`Authorized user "${pName}" logged into campaign "${camp.name}" with character "${playerInfo.characterName || 'Hero'}".`, 'user_login');
        return { status: 'already_accepted', tokenMismatch: false, authEntry };
      }

      // Scenario B: Recognized device key in userTokens
      if (incomingToken && authEntry.userTokens.includes(incomingToken)) {
        authEntry.userToken = incomingToken;
        authEntry.lastLogin = new Date().toISOString();
        authEntry.lastCharacter = playerInfo.characterName || 'Hero';

        const incomingCharName = (playerInfo.characterName || 'Hero').trim().toLowerCase();
        let playerRecord = camp.acceptedPlayers.find(p => p.id === playerInfo.id || ((p.playerName || '').trim().toLowerCase() === normalizedPlayerName && (p.characterName || '').trim().toLowerCase() === incomingCharName));
        if (!playerRecord) {
          playerRecord = {
            id: playerInfo.id || 'peer_' + Math.random().toString(36).substring(2, 7),
            playerName: pName,
            characterName: playerInfo.characterName || 'Hero',
            characterSummary: playerInfo.characterSummary || {},
            userToken: incomingToken,
            approvedAt: new Date().toISOString(),
            forceSilent: false
          };
          camp.acceptedPlayers.push(playerRecord);
        } else {
          playerRecord.id = playerInfo.id || playerRecord.id;
          playerRecord.characterName = playerInfo.characterName || playerRecord.characterName;
          playerRecord.characterSummary = playerInfo.characterSummary || playerRecord.characterSummary;
          playerRecord.userToken = incomingToken;
        }

        camp.pendingRequests = camp.pendingRequests.filter(r => r.id !== playerInfo.id && !((r.playerName || '').trim().toLowerCase() === normalizedPlayerName && (r.characterName || '').trim().toLowerCase() === incomingCharName));

        updateActiveCampaign({
          authorizedUsers: camp.authorizedUsers,
          acceptedPlayers: camp.acceptedPlayers,
          pendingRequests: camp.pendingRequests
        });

        addFileOperationLog(`Authorized user "${pName}" recognized from trusted device (${incomingToken.substring(0, 8)}...) logged into "${camp.name}".`, 'user_login');
        return { status: 'already_accepted', tokenMismatch: false, authEntry };
      }

      // Scenario C: Unrecognized device key for authorized user
      addFileOperationLog(`AUTHENTICATION NOTICE: Authorized user "${pName}" requested connection from an unrecognized device key (${incomingToken ? incomingToken.substring(0, 8) + '...' : 'none'}). Awaiting GM device trust approval.`, 'auth_mismatch');

      const existingIdx = camp.pendingRequests.findIndex(r => r.id === playerInfo.id);
      const requestItem = {
        id: playerInfo.id || 'peer_' + Math.random().toString(36).substring(2, 7),
        playerName: pName,
        characterName: playerInfo.characterName || 'Hero',
        characterSummary: playerInfo.characterSummary || {},
        userToken: incomingToken || null,
        isNewDevice: true,
        existingKeyCount: authEntry.userTokens.length,
        requestedAt: new Date().toISOString()
      };

      if (existingIdx >= 0) {
        camp.pendingRequests[existingIdx] = requestItem;
      } else {
        camp.pendingRequests.push(requestItem);
      }

      updateActiveCampaign({ pendingRequests: camp.pendingRequests });
      return { status: 'pending_device_approval', tokenMismatch: true, isNewDevice: true, authEntry, request: requestItem };
    }

    // 2. Check if already accepted previously
    const alreadyAccepted = camp.acceptedPlayers.some(p => p.id === playerInfo.id || (p.playerName && p.playerName.trim().toLowerCase() === normalizedPlayerName && p.characterName === playerInfo.characterName));
    if (alreadyAccepted) return { status: 'already_accepted', tokenMismatch: false };

    // 3. Queue as pending join request
    const existingIdx = camp.pendingRequests.findIndex(r => r.id === playerInfo.id);
    const requestItem = {
      id: playerInfo.id || 'peer_' + Math.random().toString(36).substring(2, 7),
      playerName: pName || 'Anonymous Player',
      characterName: playerInfo.characterName || 'Hero',
      characterSummary: playerInfo.characterSummary || {},
      userToken: incomingToken || null,
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
      playerName: (req.playerName || '').replace(/\s*\(\s*PL\s*#?\d*\s*\)\*?/gi, '').trim(),
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

  // --- Local User Identity & Peer-to-Peer Account ---
  function generateUniqueToken() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return 'usr_' + crypto.randomUUID().replace(/-/g, '').substring(0, 16);
    }
    const randPart = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    return 'usr_' + randPart;
  }

  function getUserAccount() {
    try {
      if (typeof localStorage === 'undefined') {
        return { userName: '', userToken: generateUniqueToken(), createdAt: new Date().toISOString() };
      }
      const raw = localStorage.getItem('mm2e_user_account');
      if (raw) {
        const acc = JSON.parse(raw);
        if (acc && acc.userToken) {
          if (!acc.userName) {
            acc.userName = localStorage.getItem('mm2e_player_name') || '';
          }
          return acc;
        }
      }
      // Initialize fresh account
      const fresh = {
        userName: localStorage.getItem('mm2e_player_name') || '',
        userToken: generateUniqueToken(),
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('mm2e_user_account', JSON.stringify(fresh));
      return fresh;
    } catch (e) {
      return { userName: '', userToken: generateUniqueToken(), createdAt: new Date().toISOString() };
    }
  }

  function setUserAccount(userName, customToken = null) {
    try {
      const current = getUserAccount();
      const updated = {
        userName: (userName !== undefined && userName !== null) ? String(userName).trim() : current.userName,
        userToken: (customToken && customToken.trim()) ? customToken.trim() : (current.userToken || generateUniqueToken()),
        createdAt: current.createdAt || new Date().toISOString()
      };
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm2e_user_account', JSON.stringify(updated));
        if (updated.userName) {
          localStorage.setItem('mm2e_player_name', updated.userName);
        }
      }
      if (typeof SessionNetwork !== 'undefined' && SessionNetwork.setPlayerInfo) {
        SessionNetwork.setPlayerInfo({ playerName: updated.userName, userToken: updated.userToken });
      }
      return updated;
    } catch (e) {
      console.warn('CampaignManager: setUserAccount error', e);
      return null;
    }
  }

  // --- Authorized Campaign Users Management ---
  function getAuthorizedUsers() {
    const camp = getActiveCampaign();
    if (!camp) return [];
    if (!Array.isArray(camp.authorizedUsers)) camp.authorizedUsers = [];
    return camp.authorizedUsers;
  }

  function addAuthorizedUser(userName, notes = '', customToken = null) {
    const camp = getActiveCampaign();
    if (!camp) return { success: false, error: 'No active campaign' };
    if (!userName || !userName.trim()) return { success: false, error: 'User name cannot be empty' };

    const trimmed = userName.trim();
    if (!Array.isArray(camp.authorizedUsers)) camp.authorizedUsers = [];

    const exists = camp.authorizedUsers.some(u => (u.userName || '').trim().toLowerCase() === trimmed.toLowerCase());
    if (exists) return { success: false, error: `User "${trimmed}" is already authorized for this campaign.` };

    const cleanCustom = (customToken && customToken.trim()) ? customToken.trim() : null;
    const newUser = {
      id: 'usr_' + Math.random().toString(36).substring(2, 8),
      userName: trimmed,
      userToken: cleanCustom,
      userTokens: cleanCustom ? [cleanCustom] : [],
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

  function trustAuthorizedUserToken(userName, token) {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.authorizedUsers)) return false;
    const trimmed = (userName || '').trim().toLowerCase();
    const user = camp.authorizedUsers.find(u => (u.userName || '').trim().toLowerCase() === trimmed || u.id === userName);
    if (user) {
      if (!Array.isArray(user.userTokens)) {
        user.userTokens = (user.userToken && user.userToken.trim()) ? [user.userToken.trim()] : [];
      }
      const cleanTok = (token || '').trim();
      if (cleanTok && !user.userTokens.includes(cleanTok)) {
        user.userTokens.push(cleanTok);
      }
      user.userToken = cleanTok || user.userToken;
      updateActiveCampaign({ authorizedUsers: camp.authorizedUsers });
      addFileOperationLog(`Added trusted device key (${(cleanTok || '').substring(0, 8)}...) for authorized user "${user.userName}". Total trusted devices: ${user.userTokens.length}.`, 'auth_token_trust');
      return true;
    }
    return false;
  }

  function resetAuthorizedUserToken(userName) {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.authorizedUsers)) return false;
    const trimmed = (userName || '').trim().toLowerCase();
    const user = camp.authorizedUsers.find(u => (u.userName || '').trim().toLowerCase() === trimmed || u.id === userName);
    if (user) {
      user.userToken = null;
      user.userTokens = [];
      updateActiveCampaign({ authorizedUsers: camp.authorizedUsers });
      addFileOperationLog(`Reset all device keys for authorized user "${user.userName}". Player may now bind a new device/browser.`, 'auth_token_reset');
      return true;
    }
    return false;
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
    if (camp && camp.gmUserName && camp.gmUserName.trim() && camp.gmUserName.trim() !== 'GM') {
      return camp.gmUserName.trim();
    }
    try {
      const userAcc = getUserAccount();
      if (userAcc && userAcc.userName && userAcc.userName.trim() && userAcc.userName.trim() !== 'GM') {
        return userAcc.userName.trim();
      }
      if (typeof localStorage !== 'undefined') {
        const localName = localStorage.getItem('mm2e_player_name');
        if (localName && localName.trim() && localName.trim() !== 'GM') {
          return localName.trim();
        }
      }
    } catch (e) {}
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

  // --- GM Sheet Inclusion in Party Display ---
  function isGmCharIncludedInParty() {
    const camp = getActiveCampaign();
    const lsVal = (typeof localStorage !== 'undefined') && localStorage.getItem("mm2e_include_gm_char_in_party") === "true";
    if (!camp) {
      return lsVal;
    }
    return !!camp.includeGmCharInParty || lsVal;
  }

  function setGmCharIncludedInParty(included) {
    const val = !!included;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem("mm2e_include_gm_char_in_party", val ? "true" : "false");
      }
    } catch (e) {}
    const camp = getActiveCampaign();
    if (!camp) return;
    camp.includeGmCharInParty = val;
    updateActiveCampaign({ includeGmCharInParty: val });
    addFileOperationLog(`GM active editor sheet ${val ? 'included in' : 'excluded from'} party roster.`, 'config');
  }

  // --- Saved Campaign Characters & Party Membership Management ---
  function saveCampaignCharacter(sheetData, playerName = null, ownerPlayerId = null) {
    const camp = getActiveCampaign();
    if (!camp) return null;
    if (!Array.isArray(camp.savedCharacters)) camp.savedCharacters = [];
    if (!Array.isArray(camp.partyCharacterIds)) camp.partyCharacterIds = [];

    const heroName = sheetData?.character?.name || sheetData?.name || sheetData?.heroName || 'Hero';
    const pName = (playerName || sheetData?.character?.playerName || sheetData?.playerName || 'Player').replace(/\s*\(\s*PL\s*#?\d*\s*\)\*?/gi, '').trim();
    const pl = sheetData?.character?.powerLevel || sheetData?.powerLevel || 10;
    const ownerId = ownerPlayerId || sheetData?.ownerId || 'local_player';

    let existing = camp.savedCharacters.find(c => (ownerId !== 'local_player' && c.ownerPlayerId === ownerId) || (c.characterName === heroName && c.playerName === pName));

    let charId;
    if (existing) {
      charId = existing.id;
      existing.characterName = heroName;
      existing.playerName = pName;
      existing.powerLevel = pl;
      existing.characterData = JSON.parse(JSON.stringify(sheetData));
      existing.updatedAt = new Date().toISOString();
    } else {
      charId = 'sc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
      camp.savedCharacters.push({
        id: charId,
        characterName: heroName,
        playerName: pName,
        ownerPlayerId: ownerId,
        powerLevel: pl,
        characterData: JSON.parse(JSON.stringify(sheetData)),
        savedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    if (ownerId && ownerId !== 'local_player') {
      ingestCharacterSheet(ownerId, sheetData, pName, heroName);
    }

    updateActiveCampaign({ savedCharacters: camp.savedCharacters });
    addFileOperationLog(`Saved character "${heroName}" for ${pName} in campaign characters.`, 'sheet_receive');
    return charId;
  }

  function getSavedCharacters() {
    const camp = getActiveCampaign();
    return (camp && Array.isArray(camp.savedCharacters)) ? [...camp.savedCharacters] : [];
  }

  function deleteSavedCharacter(charId) {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.savedCharacters)) return false;
    const charObj = camp.savedCharacters.find(c => c.id === charId);
    camp.savedCharacters = camp.savedCharacters.filter(c => c.id !== charId);
    if (Array.isArray(camp.partyCharacterIds)) {
      camp.partyCharacterIds = camp.partyCharacterIds.filter(id => id !== charId && (charObj ? id !== charObj.characterName : true));
    }
    updateActiveCampaign({ savedCharacters: camp.savedCharacters, partyCharacterIds: camp.partyCharacterIds });
    addFileOperationLog(`Deleted saved character ${charObj ? `"${charObj.characterName}"` : charId} from campaign.`, 'sheet_delete');
    return true;
  }

  function getPartyCharacterIds() {
    const camp = getActiveCampaign();
    return (camp && Array.isArray(camp.partyCharacterIds)) ? [...camp.partyCharacterIds] : [];
  }

  function isCharacterInParty(charId) {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.partyCharacterIds)) return false;
    return camp.partyCharacterIds.includes(charId);
  }

  function addCharacterToParty(charId) {
    const camp = getActiveCampaign();
    if (!camp) return false;
    if (!Array.isArray(camp.partyCharacterIds)) camp.partyCharacterIds = [];
    if (!camp.partyCharacterIds.includes(charId)) {
      camp.partyCharacterIds.push(charId);
      if (charId === 'local_hero') {
        setGmCharIncludedInParty(true);
      }
      updateActiveCampaign({ partyCharacterIds: camp.partyCharacterIds });
      addFileOperationLog(`Character "${charId}" added to active party roster.`, 'party_add');
      return true;
    }
    return false;
  }

  function removeCharacterFromParty(charId) {
    const camp = getActiveCampaign();
    if (!camp) return false;
    if (!Array.isArray(camp.partyCharacterIds)) camp.partyCharacterIds = [];
    camp.partyCharacterIds = camp.partyCharacterIds.filter(id => id !== charId);
    if (charId === 'local_hero') {
      setGmCharIncludedInParty(false);
    }
    updateActiveCampaign({ partyCharacterIds: camp.partyCharacterIds });
    addFileOperationLog(`Character "${charId}" removed from active party roster.`, 'party_remove');
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

    if (playerName) player.playerName = playerName.replace(/\s*\(\s*PL\s*#?\d*\s*\)\*?/gi, '').trim();
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

  // --- Campaign Save Point Timeline & Character Extraction ---
  function createSnapshot(label = null, customState = null) {
    const camp = getActiveCampaign();
    if (!camp) return null;
    if (!Array.isArray(camp.timeline)) camp.timeline = [];

    const snapId = 'snap_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const timeStr = new Date().toISOString();
    const snapLabel = (label && label.trim()) ? label.trim() : `Save Point - ${new Date().toLocaleTimeString()}`;

    const snapshotData = customState ? JSON.parse(JSON.stringify(customState)) : {
      acceptedPlayers: JSON.parse(JSON.stringify(camp.acceptedPlayers || [])),
      npcs: JSON.parse(JSON.stringify(camp.npcs || [])),
      encounterEnemies: JSON.parse(JSON.stringify(camp.encounterEnemies || [])),
      combatState: JSON.parse(JSON.stringify(camp.combatState || {})),
      forcedModes: JSON.parse(JSON.stringify(camp.forcedModes || {})),
      sessionLogLength: (camp.sessionLog || []).length
    };

    const snapshot = {
      id: snapId,
      timestamp: timeStr,
      label: snapLabel,
      state: snapshotData,
      characterCount: (snapshotData.acceptedPlayers?.length || 0) + (snapshotData.npcs?.length || 0) + (snapshotData.encounterEnemies?.length || 0)
    };

    camp.timeline.unshift(snapshot);
    if (camp.timeline.length > 50) {
      camp.timeline = camp.timeline.slice(0, 50);
    }

    updateActiveCampaign({ timeline: camp.timeline });
    addFileOperationLog(`Created Save Point "${snapLabel}" (${snapshot.characterCount} characters tracked).`, 'save_point');
    return snapshot;
  }

  function rollbackToSnapshot(snapshotId) {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.timeline)) return { success: false, error: 'No active campaign or timeline' };

    const snap = camp.timeline.find(s => s.id === snapshotId);
    if (!snap || !snap.state) return { success: false, error: 'Snapshot not found' };

    // Auto-create a pre-rollback checkpoint so changes since last save point are never lost
    const preRollbackId = 'snap_pre_' + Date.now();
    camp.timeline.unshift({
      id: preRollbackId,
      timestamp: new Date().toISOString(),
      label: `Pre-Rollback Safety Checkpoint (before "${snap.label}")`,
      state: {
        acceptedPlayers: JSON.parse(JSON.stringify(camp.acceptedPlayers || [])),
        npcs: JSON.parse(JSON.stringify(camp.npcs || [])),
        encounterEnemies: JSON.parse(JSON.stringify(camp.encounterEnemies || [])),
        combatState: JSON.parse(JSON.stringify(camp.combatState || {})),
        forcedModes: JSON.parse(JSON.stringify(camp.forcedModes || {})),
        sessionLogLength: (camp.sessionLog || []).length
      },
      characterCount: (camp.acceptedPlayers?.length || 0) + (camp.npcs?.length || 0) + (camp.encounterEnemies?.length || 0)
    });

    camp.acceptedPlayers = JSON.parse(JSON.stringify(snap.state.acceptedPlayers || []));
    camp.npcs = JSON.parse(JSON.stringify(snap.state.npcs || []));
    camp.encounterEnemies = JSON.parse(JSON.stringify(snap.state.encounterEnemies || []));
    if (snap.state.combatState) camp.combatState = JSON.parse(JSON.stringify(snap.state.combatState));
    if (snap.state.forcedModes) camp.forcedModes = JSON.parse(JSON.stringify(snap.state.forcedModes));

    updateActiveCampaign({
      acceptedPlayers: camp.acceptedPlayers,
      npcs: camp.npcs,
      encounterEnemies: camp.encounterEnemies,
      combatState: camp.combatState,
      forcedModes: camp.forcedModes,
      timeline: camp.timeline
    });

    addFileOperationLog(`Rolled back campaign state to Save Point "${snap.label}" (created ${new Date(snap.timestamp).toLocaleString()}).`, 'rollback');
    return { success: true, snapshot: snap };
  }

  function getSnapshotTimeline() {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.timeline)) return [];
    return [...camp.timeline];
  }

  function deleteSnapshot(snapshotId) {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.timeline)) return false;
    const initialLen = camp.timeline.length;
    camp.timeline = camp.timeline.filter(s => s.id !== snapshotId);
    if (camp.timeline.length !== initialLen) {
      updateActiveCampaign({ timeline: camp.timeline });
      addFileOperationLog(`Deleted Save Point snapshot from timeline.`, 'timeline_delete');
      return true;
    }
    return false;
  }

  function extractCharacterFromSnapshot(snapshotId, charIdOrName) {
    const camp = getActiveCampaign();
    if (!camp) return null;

    let sourceObj = null;
    let snapLabel = 'Current State';

    if (snapshotId) {
      const snap = (camp.timeline || []).find(s => s.id === snapshotId);
      if (snap && snap.state) {
        sourceObj = snap.state;
        snapLabel = snap.label;
      }
    } else {
      sourceObj = camp;
    }

    if (!sourceObj) return null;

    const normalizedTarget = (charIdOrName || '').toLowerCase().trim();

    // 1. Search acceptedPlayers
    const player = (sourceObj.acceptedPlayers || []).find(p =>
      (p.id && p.id.toLowerCase() === normalizedTarget) ||
      (p.characterName && p.characterName.toLowerCase() === normalizedTarget) ||
      (p.playerName && p.playerName.toLowerCase() === normalizedTarget)
    );

    if (player) {
      let sheetData = player.characterSheet;
      if (!sheetData && Array.isArray(player.sheetHistory) && player.sheetHistory.length > 0) {
        sheetData = player.sheetHistory[player.sheetHistory.length - 1].sheet;
      }
      return {
        id: player.id,
        characterName: player.characterName || 'Hero',
        playerName: player.playerName,
        powerLevel: player.characterSummary?.powerLevel || (sheetData?.character?.powerLevel) || 10,
        sheet: sheetData || null,
        isNPC: false,
        isEnemy: false,
        source: snapLabel,
        rawRecord: player
      };
    }

    // 2. Search npcs
    const npc = (sourceObj.npcs || []).find(n =>
      (n.id && n.id.toLowerCase() === normalizedTarget) ||
      (n.name && n.name.toLowerCase() === normalizedTarget)
    );

    if (npc) {
      return {
        id: npc.id,
        characterName: npc.name || 'NPC',
        playerName: 'GM (Party NPC)',
        powerLevel: npc.powerLevel || (npc.characterData?.powerLevel) || 10,
        sheet: npc.characterData ? { format: 'MM2E_CHARACTER', version: '1.0', character: npc.characterData } : null,
        isNPC: true,
        isEnemy: false,
        source: snapLabel,
        rawRecord: npc
      };
    }

    // 3. Search encounterEnemies
    const enemy = (sourceObj.encounterEnemies || []).find(e =>
      (e.id && e.id.toLowerCase() === normalizedTarget) ||
      (e.name && e.name.toLowerCase() === normalizedTarget)
    );

    if (enemy) {
      return {
        id: enemy.id,
        characterName: enemy.name || 'Adversary',
        playerName: 'GM (Enemy)',
        powerLevel: enemy.powerLevel || (enemy.characterData?.powerLevel) || 10,
        sheet: enemy.characterData ? { format: 'MM2E_CHARACTER', version: '1.0', character: enemy.characterData } : null,
        isNPC: true,
        isEnemy: true,
        source: snapLabel,
        rawRecord: enemy
      };
    }

    return null;
  }

  function setAutoBackupCharacters(enabled) {
    const camp = getActiveCampaign();
    if (!camp) return;
    camp.autoBackupCharacters = !!enabled;
    updateActiveCampaign({ autoBackupCharacters: !!enabled });
    addFileOperationLog(`Character auto-backup set to ${!!enabled ? 'Enabled' : 'Disabled'}.`, 'config');
  }

  function isAutoBackupCharactersEnabled() {
    const camp = getActiveCampaign();
    if (!camp) return true;
    return camp.autoBackupCharacters !== false;
  }

  // --- Encounter Enemies / Adversaries Management ---
  function addEncounterEnemy(characterData, customName = null, customPL = null) {
    const camp = getActiveCampaign();
    if (!camp) return null;

    if (!Array.isArray(camp.encounterEnemies)) camp.encounterEnemies = [];

    const rawName = customName || characterData?.name || 'Encounter Adversary';
    const name = enumerateNPCName(rawName, camp.encounterEnemies);
    const pl = customPL !== null ? customPL : (characterData?.powerLevel || 10);

    const cData = characterData ? JSON.parse(JSON.stringify(characterData)) : {};
    if (cData.name) cData.name = name;

    const enemy = {
      id: 'enemy_' + Math.random().toString(36).substring(2, 9),
      name,
      powerLevel: pl,
      characterData: cData,
      currentBruises: (characterData?.trackerState?.conditions?.Bruised) || (characterData?.currentBruises) || 0,
      currentInjured: (characterData?.trackerState?.conditions?.Injured) || (characterData?.currentInjured) || 0,
      conditions: characterData?.trackerState?.conditions ? { ...characterData.trackerState.conditions } : (characterData?.conditions ? { ...characterData.conditions } : {}),
      heroPoints: 0,
      attachedAt: new Date().toISOString()
    };

    camp.encounterEnemies.push(enemy);
    updateActiveCampaign({ encounterEnemies: camp.encounterEnemies });
    addFileOperationLog(`Added encounter adversary "${name}" (PL ${pl}) to campaign.`, 'encounter');
    return enemy;
  }

  function removeEncounterEnemy(enemyId) {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.encounterEnemies)) return;
    const filtered = camp.encounterEnemies.filter(e => e.id !== enemyId);
    updateActiveCampaign({ encounterEnemies: filtered });
    addFileOperationLog(`Removed encounter adversary from campaign.`, 'encounter');
  }

  function updateEncounterEnemyConditions(enemyId, bruises, conditions, injured) {
    const camp = getActiveCampaign();
    if (!camp || !Array.isArray(camp.encounterEnemies)) return;
    const enemy = camp.encounterEnemies.find(e => e.id === enemyId);
    if (enemy) {
      if (bruises !== undefined) enemy.currentBruises = Math.max(0, Number(bruises) || 0);
      if (injured !== undefined) enemy.currentInjured = Math.max(0, Number(injured) || 0);
      if (conditions !== undefined) enemy.conditions = { ...conditions };
      updateActiveCampaign({ encounterEnemies: camp.encounterEnemies });
    }
  }

  function getEncounterEnemies() {
    const camp = getActiveCampaign();
    return camp && Array.isArray(camp.encounterEnemies) ? [...camp.encounterEnemies] : [];
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
      version: '1.1',
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
      if (!Array.isArray(campData.timeline)) campData.timeline = [];
      if (campData.autoBackupCharacters === undefined) campData.autoBackupCharacters = true;
      if (campData.includeGmCharInParty === undefined) campData.includeGmCharInParty = false;
      if (!Array.isArray(campData.encounterEnemies)) campData.encounterEnemies = [];
      if (!Array.isArray(campData.partyCharacterIds)) campData.partyCharacterIds = [];
      if (!Array.isArray(campData.savedCharacters)) campData.savedCharacters = [];
      if (!campData.sessionState) {
        campData.sessionState = {
          status: 'ended',
          sessionNumber: 1,
          startedAt: null,
          pausedAt: null,
          totalElapsedMs: 0,
          sessionHistory: []
        };
      }

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

  // --- Game Session Management (Start, Pause, End) ---
  function getSessionState() {
    const camp = getActiveCampaign();
    if (!camp) {
      return {
        status: 'ended',
        sessionNumber: 1,
        startedAt: null,
        pausedAt: null,
        totalElapsedMs: 0,
        sessionHistory: []
      };
    }
    if (!camp.sessionState) {
      camp.sessionState = {
        status: 'ended',
        sessionNumber: 1,
        startedAt: null,
        pausedAt: null,
        totalElapsedMs: 0,
        sessionHistory: []
      };
    }
    return camp.sessionState;
  }

  function startSession() {
    const camp = getActiveCampaign();
    if (!camp) return null;
    if (!camp.sessionState) {
      camp.sessionState = {
        status: 'ended',
        sessionNumber: 1,
        startedAt: null,
        pausedAt: null,
        totalElapsedMs: 0,
        sessionHistory: []
      };
    }

    const prevStatus = camp.sessionState.status;
    const now = Date.now();
    if (prevStatus === 'paused') {
      // Resuming from pause
      camp.sessionState.status = 'active';
      camp.sessionState.startedAt = now;
      camp.sessionState.pausedAt = null;
    } else {
      // Starting new session
      camp.sessionState.status = 'active';
      camp.sessionState.startedAt = now;
      camp.sessionState.sessionStartedAt = now;
      camp.sessionState.pausedAt = null;
      camp.sessionState.totalElapsedMs = 0;
    }

    updateActiveCampaign({ sessionState: camp.sessionState });
    return camp.sessionState;
  }

  function pauseSession() {
    const camp = getActiveCampaign();
    if (!camp || !camp.sessionState) return null;
    if (camp.sessionState.status !== 'active') return camp.sessionState;

    const now = Date.now();
    const activeChunk = camp.sessionState.startedAt ? (now - camp.sessionState.startedAt) : 0;
    camp.sessionState.totalElapsedMs = (camp.sessionState.totalElapsedMs || 0) + activeChunk;
    camp.sessionState.status = 'paused';
    camp.sessionState.pausedAt = now;
    camp.sessionState.startedAt = null;

    updateActiveCampaign({ sessionState: camp.sessionState });
    return camp.sessionState;
  }

  function endSession() {
    const camp = getActiveCampaign();
    if (!camp) return null;
    if (!camp.sessionState) {
      camp.sessionState = {
        status: 'ended',
        sessionNumber: 1,
        startedAt: null,
        pausedAt: null,
        totalElapsedMs: 0,
        sessionHistory: []
      };
    }

    if (camp.sessionState.status === 'active' && camp.sessionState.startedAt) {
      const now = Date.now();
      const activeChunk = now - camp.sessionState.startedAt;
      camp.sessionState.totalElapsedMs = (camp.sessionState.totalElapsedMs || 0) + activeChunk;
    }

    const durationMs = camp.sessionState.totalElapsedMs || 0;
    const sessionNum = camp.sessionState.sessionNumber || 1;

    camp.sessionState.status = 'ended';
    camp.sessionState.startedAt = null;
    camp.sessionState.pausedAt = null;
    camp.sessionState.sessionStartedAt = null;

    if (!Array.isArray(camp.sessionState.sessionHistory)) {
      camp.sessionState.sessionHistory = [];
    }

    let savePointId = null;
    if (camp.autoBackupCharacters) {
      const sp = createSnapshot(`End of Session #${sessionNum}`);
      if (sp) savePointId = sp.id;
    }

    camp.sessionState.sessionHistory.push({
      sessionNumber: sessionNum,
      durationMs: durationMs,
      endedAt: new Date().toISOString(),
      savePointId: savePointId
    });

    camp.sessionState.sessionNumber = sessionNum + 1;
    camp.sessionState.totalElapsedMs = 0;

    updateActiveCampaign({ sessionState: camp.sessionState });
    return { sessionState: camp.sessionState, durationMs, sessionNum, savePointId };
  }

  function cancelSession() {
    const camp = getActiveCampaign();
    if (!camp || !camp.sessionState) return null;
    if (camp.sessionState.status === 'ended') return null;

    const sessionNum = camp.sessionState.sessionNumber || 1;
    let sessionStartedAt = camp.sessionState.sessionStartedAt;
    if (!sessionStartedAt) {
      if (camp.sessionState.startedAt) {
        sessionStartedAt = camp.sessionState.startedAt - (camp.sessionState.totalElapsedMs || 0);
      } else {
        sessionStartedAt = Date.now() - (camp.sessionState.totalElapsedMs || 0);
      }
    }

    camp.sessionState.status = 'ended';
    camp.sessionState.startedAt = null;
    camp.sessionState.pausedAt = null;
    camp.sessionState.sessionStartedAt = null;
    camp.sessionState.totalElapsedMs = 0;

    // Delete messages and rolls posted during this session from camp.sessionLog (and camp.log if present)
    const cutoff = sessionStartedAt ? (sessionStartedAt - 50) : Date.now();
    if (Array.isArray(camp.sessionLog)) {
      camp.sessionLog = camp.sessionLog.filter(entry => {
        if (!entry.timestamp) return false;
        const entryTime = new Date(entry.timestamp).getTime();
        return !isNaN(entryTime) && entryTime < cutoff;
      });
    }
    if (Array.isArray(camp.log)) {
      camp.log = camp.log.filter(entry => {
        if (!entry.timestamp) return false;
        const entryTime = new Date(entry.timestamp).getTime();
        return !isNaN(entryTime) && entryTime < cutoff;
      });
    }

    updateActiveCampaign({ sessionState: camp.sessionState, sessionLog: camp.sessionLog, log: camp.log });
    addFileOperationLog(`Game Session #${sessionNum} was canceled without saving. Session entries discarded.`, 'session_cancel');
    return { sessionState: camp.sessionState, sessionNum, sessionStartedAt: cutoff };
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
    updateNPCHeroPoints,
    updateNPCCharacterData,
    duplicateNPC,
    enumerateNPCName,
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
    getUserAccount,
    setUserAccount,
    getAuthorizedUsers,
    addAuthorizedUser,
    removeAuthorizedUser,
    resetAuthorizedUserToken,
    trustAuthorizedUserToken,
    isUserAuthorized,
    setGMUserName,
    getGMUserName,
    createSnapshot,
    rollbackToSnapshot,
    getSnapshotTimeline,
    deleteSnapshot,
    extractCharacterFromSnapshot,
    setAutoBackupCharacters,
    isAutoBackupCharactersEnabled,
    isGmCharIncludedInParty,
    setGmCharIncludedInParty,
    saveCampaignCharacter,
    getSavedCharacters,
    deleteSavedCharacter,
    getPartyCharacterIds,
    isCharacterInParty,
    addCharacterToParty,
    removeCharacterFromParty,
    addEncounterEnemy,
    removeEncounterEnemy,
    updateEncounterEnemyConditions,
    getEncounterEnemies,
    getSessionState,
    startSession,
    pauseSession,
    endSession,
    cancelSession
  };
}));
