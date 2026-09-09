/**
 * session_network.js - Peer-to-Peer & BroadcastChannel Networking Engine for MM2CG
 * Manages player-to-GM connections, join request handshakes, roll sharing, silent mode, and pop-out window synchronization.
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SessionNetwork = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  const BROADCAST_CHANNEL_NAME = 'mm2e_session_channel';

  // Network State
  let role = 'NONE'; // 'NONE' | 'HOST' | 'CLIENT'
  let currentCode = null;
  let peerInstance = null;
  let hostConn = null; // Client's connection to GM
  const clientConns = new Map(); // GM's map of client connections (peerId -> conn)
  let broadcastChannel = null;

  let isSilentMode = false;
  let isForcedSilent = false;
  let connectionStatus = 'disconnected'; // 'disconnected' | 'connecting' | 'waiting_approval' | 'connected'
  let localPlayerInfo = { playerName: 'Player', characterName: 'Hero', characterSummary: {} };

  // Listeners
  const listeners = {
    onRoll: [],
    onConditionUpdate: [],
    onJoinRequest: [],
    onStatusChange: [],
    onForcedMode: [],
    onStateSync: [],
    onChat: [],
    onRosterUpdate: [],
    onRequestCharacterSheet: [],
    onCharacterSheetData: [],
    onGMPushCharacter: [],
    onGMTransfer: []
  };

  function initBroadcastChannel() {
    if (typeof BroadcastChannel !== 'undefined' && !broadcastChannel) {
      try {
        broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        broadcastChannel.onmessage = (event) => {
          handleIncomingPacket(event.data, 'broadcast');
        };
      } catch (e) {
        console.warn('SessionNetwork: BroadcastChannel unavailable', e);
      }
    }
  }

  function setStatus(status, detail = '') {
    connectionStatus = status;
    emit('onStatusChange', { status, detail, role, code: currentCode });
  }

  function emit(eventName, data) {
    if (listeners[eventName]) {
      listeners[eventName].forEach(fn => {
        try { fn(data); } catch (e) { console.error(`Error in listener ${eventName}:`, e); }
      });
    }
  }

  function addEventListener(eventName, fn) {
    if (listeners[eventName] && typeof fn === 'function') {
      listeners[eventName].push(fn);
    }
  }

  function removeEventListener(eventName, fn) {
    if (listeners[eventName]) {
      listeners[eventName] = listeners[eventName].filter(f => f !== fn);
    }
  }

  // --- Handling Incoming Packets ---
  function handleIncomingPacket(packet, source = 'p2p') {
    if (!packet || !packet.type) return;

    switch (packet.type) {
      case 'JOIN_REQUEST':
        if (role === 'HOST') {
          emit('onJoinRequest', packet);
        }
        break;

      case 'JOIN_ACCEPT':
        if (role === 'CLIENT') {
          setStatus('connected', 'Accepted by GM');
          if (packet.campaignState) {
            emit('onStateSync', packet.campaignState);
          }
        }
        break;

      case 'JOIN_REJECT':
        if (role === 'CLIENT') {
          setStatus('disconnected', packet.reason || 'Declined by GM');
          disconnect();
        }
        break;

      case 'ROLL':
        // If this roll was sent over broadcast channel to our pop-out window or from peer
        emit('onRoll', packet.roll);
        break;

      case 'CONDITION_UPDATE':
        emit('onConditionUpdate', packet);
        break;

      case 'GM_FORCE_MODE':
        if (packet.mode === 'silent') {
          const isTarget = packet.target === localPlayerInfo.playerName || packet.target === localPlayerInfo.characterName || (peerInstance && packet.target === peerInstance.id);
          if (isTarget) {
            isForcedSilent = !!packet.enabled;
            emit('onForcedMode', { mode: 'silent', enabled: isForcedSilent });
          }
        }
        break;

      case 'GM_STATUS_OVERRIDE':
        if (packet.playerId === peerInstance?.id || packet.targetCharacter === localPlayerInfo.characterName) {
          emit('onGMStatusOverride', packet);
        }
        break;

      case 'REQUEST_CHARACTER_SHEET':
        // GM requesting character sheet from client
        emit('onRequestCharacterSheet', packet);
        break;

      case 'CHARACTER_SHEET_DATA':
        // GM receiving character sheet from client
        if (role === 'HOST') {
          emit('onCharacterSheetData', packet);
        }
        break;

      case 'GM_PUSH_CHARACTER':
        // Client receiving pushed character sheet revision from GM
        if (role === 'CLIENT' || packet.targetPlayerId === (peerInstance?.id || localPlayerInfo.playerName)) {
          emit('onGMPushCharacter', packet);
        }
        break;

      case 'GM_TRANSFER':
        emit('onGMTransfer', packet);
        break;

      case 'POPOUT_DOCKED':
        emit('onPopoutDocked');
        break;

      case 'STATE_SYNC':
        emit('onStateSync', packet.state);
        break;

      case 'CHAT':
        emit('onChat', packet);
        break;

      case 'ROSTER_UPDATE':
        emit('onRosterUpdate', packet.roster);
        break;

      default:
        break;
    }
  }

  // --- Broadcasting Outgoing Packets ---
  function broadcastPacket(packet, allowP2P = true) {
    // Always relay via local BroadcastChannel so popped-out windows get it instantly
    if (broadcastChannel) {
      try {
        broadcastChannel.postMessage(packet);
      } catch (e) {
        console.warn('BroadcastChannel postMessage failed:', e);
      }
    }

    if (!allowP2P) return;

    // P2P transmission
    if (role === 'HOST') {
      clientConns.forEach((conn) => {
        if (conn && conn.open) {
          try { conn.send(packet); } catch (e) { console.error('Host send error', e); }
        }
      });
    } else if (role === 'CLIENT' && hostConn && hostConn.open) {
      try { hostConn.send(packet); } catch (e) { console.error('Client send error', e); }
    }
  }

  // --- PeerJS Host / Client Operations ---
  function getPeerConstructor() {
    if (typeof Peer !== 'undefined') return Peer;
    if (typeof window !== 'undefined' && window.Peer) return window.Peer;
    if (typeof global !== 'undefined' && global.Peer) return global.Peer;
    return null;
  }

  function startHost(campaignCode) {
    initBroadcastChannel();
    disconnect();
    role = 'HOST';
    currentCode = campaignCode.toLowerCase().trim();
    setStatus('connecting', 'Initializing GM Host switchboard...');

    const PeerClass = getPeerConstructor();
    if (!PeerClass) {
      setStatus('connected', 'Local mode active (PeerJS not loaded)');
      return;
    }

    const hostPeerId = `mm2e-host-${currentCode}`;
    try {
      peerInstance = new PeerClass(hostPeerId, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' }
          ]
        }
      });

      peerInstance.on('open', (id) => {
        setStatus('connected', `GM Host Online. Room: ${currentCode}`);
      });

      peerInstance.on('connection', (conn) => {
        clientConns.set(conn.peer, conn);
        conn.on('data', (data) => handleIncomingPacket(data, 'p2p'));
        conn.on('close', () => clientConns.delete(conn.peer));
        conn.on('error', () => clientConns.delete(conn.peer));
      });

      peerInstance.on('error', (err) => {
        console.warn('Host PeerJS notice:', err);
        // If ID is taken, host is already up or reconnected
        if (err.type === 'unavailable-id') {
          setStatus('connected', `GM Host session resumed. Room: ${currentCode}`);
        } else {
          setStatus('connected', `Host local channel active. (${err.type || 'P2P note'})`);
        }
      });
    } catch (e) {
      console.error('Failed to initialize Host Peer:', e);
      setStatus('connected', 'Local channel active');
    }
  }

  function joinHost(campaignCode, playerInfo = {}) {
    initBroadcastChannel();
    disconnect();
    role = 'CLIENT';
    currentCode = campaignCode.toLowerCase().trim();
    localPlayerInfo = {
      playerName: playerInfo.playerName || 'Player',
      characterName: playerInfo.characterName || 'Hero',
      characterSummary: playerInfo.characterSummary || {}
    };

    setStatus('connecting', `Connecting to campaign ${currentCode}...`);

    const PeerClass = getPeerConstructor();
    if (!PeerClass) {
      setStatus('connected', 'Local mode active (PeerJS not loaded)');
      return;
    }

    try {
      peerInstance = new PeerClass(undefined, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }
          ]
        }
      });

      peerInstance.on('open', (myId) => {
        const hostPeerId = `mm2e-host-${currentCode}`;
        hostConn = peerInstance.connect(hostPeerId, { reliable: true });

        hostConn.on('open', () => {
          setStatus('waiting_approval', 'Waiting for GM to accept join request...');
          // Send join request to GM
          hostConn.send({
            type: 'JOIN_REQUEST',
            id: myId,
            playerName: localPlayerInfo.playerName,
            characterName: localPlayerInfo.characterName,
            characterSummary: localPlayerInfo.characterSummary
          });
        });

        hostConn.on('data', (data) => handleIncomingPacket(data, 'p2p'));
        hostConn.on('close', () => {
          if (connectionStatus !== 'disconnected') {
            setStatus('disconnected', 'Disconnected from GM Host');
          }
        });
        hostConn.on('error', (err) => {
          console.warn('Client connection error:', err);
        });
      });

      peerInstance.on('error', (err) => {
        console.warn('Client PeerJS notice:', err);
        if (err.type === 'peer-unavailable') {
          setStatus('waiting_approval', 'GM is not currently online. Waiting for GM to join...');
        } else {
          setStatus('disconnected', err.message || 'Connection failed');
        }
      });
    } catch (e) {
      console.error('Failed to initialize Client Peer:', e);
      setStatus('disconnected', 'Network initialization failed');
    }
  }

  function acceptJoin(playerId, campaignState) {
    if (role !== 'HOST') return;
    const conn = clientConns.get(playerId);
    if (conn && conn.open) {
      conn.send({
        type: 'JOIN_ACCEPT',
        campaignState
      });
    }
  }

  function rejectJoin(playerId, reason = 'Declined by GM') {
    if (role !== 'HOST') return;
    const conn = clientConns.get(playerId);
    if (conn && conn.open) {
      conn.send({
        type: 'JOIN_REJECT',
        reason
      });
      conn.close();
    }
  }

  function disconnect() {
    if (hostConn) {
      try { hostConn.close(); } catch (e) {}
      hostConn = null;
    }
    clientConns.forEach((conn) => {
      try { conn.close(); } catch (e) {}
    });
    clientConns.clear();

    if (peerInstance) {
      try { peerInstance.destroy(); } catch (e) {}
      peerInstance = null;
    }
    role = 'NONE';
    setStatus('disconnected', 'Offline');
  }

  // --- High-Level Event Senders ---
  function sendRoll(rollData) {
    const isSilent = isSilentMode || isForcedSilent;
    const packet = {
      type: 'ROLL',
      roll: {
        id: 'r_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        timestamp: new Date().toISOString(),
        playerName: localPlayerInfo.playerName,
        characterName: rollData.characterName || localPlayerInfo.characterName,
        isNPC: !!rollData.isNPC,
        rollType: rollData.rollType || 'Check',
        expression: rollData.expression || '',
        total: rollData.total,
        rolls: rollData.rolls || [],
        modifier: rollData.modifier || 0,
        breakdown: rollData.breakdown || '',
        targetDc: rollData.targetDc || null,
        result: rollData.result || '',
        isNat20: !!rollData.isNat20,
        isNat1: !!rollData.isNat1,
        isSilent: isSilent
      }
    };

    // If silent, we send only to local BroadcastChannel (for pop-out window), NOT to other players over P2P!
    broadcastPacket(packet, !isSilent);
    // Also trigger onRoll locally for immediate display
    emit('onRoll', packet.roll);
    return packet.roll;
  }

  function sendConditionUpdate(updateData) {
    const isSilent = isSilentMode || isForcedSilent;
    const packet = {
      type: 'CONDITION_UPDATE',
      characterName: updateData.characterName || localPlayerInfo.characterName,
      bruises: updateData.bruises,
      conditions: updateData.conditions,
      heroPoints: updateData.heroPoints,
      isSilent: isSilent,
      timestamp: new Date().toISOString()
    };

    broadcastPacket(packet, !isSilent);
    emit('onConditionUpdate', packet);
  }

  function sendGMForceMode(mode, target, enabled) {
    if (role !== 'HOST') return;
    const packet = {
      type: 'GM_FORCE_MODE',
      mode,
      target, // 'all' or character/player name
      enabled: !!enabled
    };
    broadcastPacket(packet, true);
  }

  function sendChat(text) {
    const packet = {
      type: 'CHAT',
      author: localPlayerInfo.characterName ? `${localPlayerInfo.characterName} (${localPlayerInfo.playerName})` : localPlayerInfo.playerName,
      text,
      timestamp: new Date().toISOString()
    };
    broadcastPacket(packet, true);
    emit('onChat', packet);
  }

  function sendStateSync(state) {
    if (role !== 'HOST') return;
    const packet = {
      type: 'STATE_SYNC',
      state
    };
    broadcastPacket(packet, true);
  }

  function toggleSilentMode(val) {
    if (val !== undefined) isSilentMode = !!val;
    else isSilentMode = !isSilentMode;
    return isSilentMode;
  }

  function isSilent() {
    return isSilentMode || isForcedSilent;
  }

  function sendGMStatusOverride(playerId, statusData) {
    if (role !== 'HOST') return;
    const packet = {
      type: 'GM_STATUS_OVERRIDE',
      playerId,
      targetCharacter: statusData.characterName,
      bruises: statusData.bruises,
      injured: statusData.injured,
      conditions: statusData.conditions,
      heroPoints: statusData.heroPoints
    };
    broadcastPacket(packet, true);
  }

  function sendLocalBroadcast(packet) {
    if (broadcastChannel) {
      try { broadcastChannel.postMessage(packet); } catch (e) {}
    }
  }

  function requestCharacterSheets(targetPlayerId = null) {
    const packet = {
      type: 'REQUEST_CHARACTER_SHEET',
      targetPlayerId: targetPlayerId || 'all',
      requestedAt: new Date().toISOString()
    };
    if (targetPlayerId && clientConns.has(targetPlayerId)) {
      const conn = clientConns.get(targetPlayerId);
      if (conn && conn.open) {
        try { conn.send(packet); } catch (e) { console.error('Error sending sheet request:', e); }
      }
    } else {
      broadcastPacket(packet, true);
    }
  }

  function sendCharacterSheetData(sheet) {
    const packet = {
      type: 'CHARACTER_SHEET_DATA',
      playerId: peerInstance?.id || 'local_player',
      playerName: localPlayerInfo.playerName,
      characterName: localPlayerInfo.characterName,
      characterSummary: localPlayerInfo.characterSummary,
      sheet: sheet,
      timestamp: new Date().toISOString()
    };
    broadcastPacket(packet, true);
    return packet;
  }

  function sendPushCharacter(playerId, sheet, characterName, versionTimestamp, version) {
    if (role !== 'HOST') return false;
    const packet = {
      type: 'GM_PUSH_CHARACTER',
      targetPlayerId: playerId,
      characterName: characterName,
      version: version,
      versionTimestamp: versionTimestamp || new Date().toISOString(),
      sheet: sheet
    };
    if (playerId && clientConns.has(playerId)) {
      const conn = clientConns.get(playerId);
      if (conn && conn.open) {
        try {
          conn.send(packet);
          return true;
        } catch (e) {
          console.error('Error sending push character to client:', e);
        }
      }
    }
    broadcastPacket(packet, true);
    return true;
  }

  function sendGMTransfer(newGmPlayerId) {
    const packet = {
      type: 'GM_TRANSFER',
      newGmPlayerId: newGmPlayerId,
      previousGmPlayerId: peerInstance?.id || 'host',
      timestamp: new Date().toISOString()
    };
    broadcastPacket(packet, true);
    emit('onGMTransfer', packet);
  }

  function getClientConnections() {
    const list = [];
    clientConns.forEach((conn, peerId) => {
      if (conn && conn.open) {
        list.push({ peerId, open: true });
      }
    });
    return list;
  }

  function isPeerConnected(peerId) {
    if (role === 'HOST') {
      const conn = clientConns.get(peerId);
      return !!(conn && conn.open);
    } else if (role === 'CLIENT') {
      return !!(hostConn && hostConn.open);
    }
    return false;
  }

  return {
    initBroadcastChannel,
    startHost,
    joinHost,
    acceptJoin,
    rejectJoin,
    disconnect,
    sendRoll,
    sendConditionUpdate,
    sendGMForceMode,
    sendGMStatusOverride,
    sendLocalBroadcast,
    sendChat,
    sendStateSync,
    requestCharacterSheets,
    sendCharacterSheetData,
    sendPushCharacter,
    sendGMTransfer,
    getClientConnections,
    isPeerConnected,
    toggleSilentMode,
    isSilent,
    getStatus: () => ({ status: connectionStatus, role, code: currentCode, isSilent: isSilent(), isForcedSilent }),
    setPlayerInfo: (info) => { Object.assign(localPlayerInfo, info); },
    getPlayerInfo: () => ({ ...localPlayerInfo }),
    addEventListener,
    removeEventListener
  };
}));
