/**
 * Mutants & Masterminds 2nd Edition VTT - Discord Relay Bot
 * Provides two-way communication between Discord channels and the Hero Builder web app.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');

// Load environment variables (.env fallback)
try {
  require('dotenv').config();
} catch (e) {
  // If dotenv isn't installed, parse .env manually if it exists
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          const val = trimmed.slice(eqIdx + 1).trim();
          if (!process.env[key]) process.env[key] = val;
        }
      }
    });
  }
}

// Load config.json fallback
let fileConfig = {};
try {
  const cfgPath = path.join(__dirname, 'config.json');
  if (fs.existsSync(cfgPath)) {
    fileConfig = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  }
} catch (e) {}

// Configuration Values
const DISCORD_TOKEN = process.env.DISCORD_TOKEN || fileConfig.token || '';
const CHANNEL_ID = process.env.CHANNEL_ID || process.env.DISCORD_CHANNEL_ID || fileConfig.channelId || '';
const ROLLS_CHANNEL_ID = process.env.ROLLS_CHANNEL_ID || fileConfig.rollsChannelId || CHANNEL_ID;
const CHAT_CHANNEL_ID = process.env.CHAT_CHANNEL_ID || fileConfig.chatChannelId || CHANNEL_ID;
const BRIDGE_PORT = parseInt(process.env.BRIDGE_PORT || fileConfig.bridgePort || '18820', 10);
const CAMPAIGN_CODE = (process.env.CAMPAIGN_CODE || fileConfig.campaignCode || '').trim().toLowerCase();
const PREFIX = process.env.PREFIX || fileConfig.prefix || '!mm ';
const ALLOW_ALL_CHANNELS = (process.env.ALLOW_ALL_CHANNELS === 'true') || fileConfig.allowAllChannels === true;

// Dependency check for discord.js and ws
let Client, GatewayIntentBits, EmbedBuilder, WebSocketServer;
try {
  const djs = require('discord.js');
  Client = djs.Client;
  GatewayIntentBits = djs.GatewayIntentBits;
  EmbedBuilder = djs.EmbedBuilder;
} catch (err) {
  console.error('\n======================================================================');
  console.error(' [ERROR] "discord.js" module is missing!');
  console.error(' Please install dependencies by running:');
  console.error('     npm install');
  console.error(' or double-click "start_bot.bat" on Windows.');
  console.error('======================================================================\n');
  process.exit(1);
}

try {
  const wsPkg = require('ws');
  WebSocketServer = wsPkg.WebSocketServer || wsPkg.Server;
} catch (err) {
  console.error('\n======================================================================');
  console.error(' [ERROR] "ws" module is missing!');
  console.error(' Please install dependencies by running:');
  console.error('     npm install');
  console.error('======================================================================\n');
  process.exit(1);
}

// Validation
if (!DISCORD_TOKEN || DISCORD_TOKEN === 'your_bot_token_here') {
  console.error('\n======================================================================');
  console.error(' [ERROR] DISCORD_TOKEN is not configured!');
  console.error(' Please edit the .env or config.json file and set DISCORD_TOKEN.');
  console.error(' You can obtain a token from: https://discord.com/developers/applications');
  console.error('======================================================================\n');
  process.exit(1);
}

// Connected WebSocket clients (instances of Hero Builder web app)
const wsClients = new Set();
let cachedCampaignStatus = {
  campaignName: 'Active Campaign',
  campaignCode: CAMPAIGN_CODE || 'campaign-1',
  gmUserName: 'GM',
  sessionState: 'standby',
  roster: []
};

// Create Discord Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ]
});

// ============================================================================
// LOCAL BRIDGE SERVER (HTTP & WEBSOCKET)
// ============================================================================

const server = http.createServer((req, res) => {
  // CORS Headers for browser web app connection
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/' || url.pathname === '/status' || url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'online',
      botReady: client.isReady(),
      botTag: client.user ? client.user.tag : null,
      channelId: CHANNEL_ID,
      rollsChannelId: ROLLS_CHANNEL_ID,
      chatChannelId: CHAT_CHANNEL_ID,
      connectedClients: wsClients.size,
      campaignCode: CAMPAIGN_CODE || 'any',
      prefix: PREFIX,
      version: '1.74'
    }, null, 2));
    return;
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');

        if (url.pathname === '/api/roll') {
          await handleOutboundRoll(payload);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
          return;
        }

        if (url.pathname === '/api/chat') {
          await handleOutboundChat(payload);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
          return;
        }

        if (url.pathname === '/api/broadcast') {
          if (payload.type === 'ROLL') await handleOutboundRoll(payload);
          else if (payload.type === 'CHAT') await handleOutboundChat(payload);
          else if (payload.type === 'STATUS_UPDATE') handleStatusUpdate(payload);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
          return;
        }

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Endpoint not found' }));
      } catch (err) {
        console.error('[Bridge] Error handling POST request:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

// Setup WebSocket Server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {
  wsClients.add(ws);
  console.log(`[Bridge] Web app connected from ${req.socket.remoteAddress}. Active clients: ${wsClients.size}`);

  // Send greeting packet
  try {
    ws.send(JSON.stringify({
      type: 'BRIDGE_CONNECTED',
      botReady: client.isReady(),
      botTag: client.user ? client.user.tag : null,
      channelId: CHANNEL_ID,
      version: '1.74'
    }));
  } catch (e) {}

  ws.on('message', async (data) => {
    try {
      const packet = JSON.parse(data.toString());
      if (!packet || !packet.type) return;

      if (packet.type === 'HANDSHAKE') {
        if (packet.campaignCode) cachedCampaignStatus.campaignCode = packet.campaignCode;
        if (packet.campaignName) cachedCampaignStatus.campaignName = packet.campaignName;
        return;
      }

      if (packet.type === 'ROLL') {
        await handleOutboundRoll(packet);
      } else if (packet.type === 'CHAT') {
        await handleOutboundChat(packet);
      } else if (packet.type === 'STATUS_UPDATE') {
        handleStatusUpdate(packet);
      }
    } catch (err) {
      console.error('[Bridge] WebSocket packet error:', err);
    }
  });

  ws.on('close', () => {
    wsClients.delete(ws);
    console.log(`[Bridge] Web app client disconnected. Remaining: ${wsClients.size}`);
  });

  ws.on('error', (err) => {
    console.warn('[Bridge] WebSocket client error:', err.message);
    wsClients.delete(ws);
  });
});

// Broadcast a packet to all connected Hero Builder clients
function broadcastToHeroBuilder(packet) {
  if (wsClients.size === 0) return 0;
  const msg = JSON.stringify(packet);
  let count = 0;
  for (const clientSocket of wsClients) {
    if (clientSocket.readyState === 1) { // OPEN
      try {
        clientSocket.send(msg);
        count++;
      } catch (e) {
        wsClients.delete(clientSocket);
      }
    }
  }
  return count;
}

// ============================================================================
// OUTBOUND: HERO BUILDER -> DISCORD
// ============================================================================

const postedRollIds = new Set();
async function handleOutboundRoll(roll) {
  if (!client.isReady() || !roll) return;
  if (roll.isSilent) return;
  if (roll.source === 'discord') return; // Prevent echoing back to Discord

  if (roll.id && postedRollIds.has(roll.id)) return;
  if (roll.id) {
    postedRollIds.add(roll.id);
    if (postedRollIds.size > 200) {
      const first = postedRollIds.values().next().value;
      postedRollIds.delete(first);
    }
  }

  const targetChannelId = ROLLS_CHANNEL_ID || CHANNEL_ID;
  if (!targetChannelId) return;

  try {
    const channel = await client.channels.fetch(targetChannelId);
    if (!channel || !channel.isTextBased()) return;

    const heroName = (roll.characterName || 'Hero').trim();
    const playerName = (roll.playerName || '').trim();
    const rollTitle = (roll.rollType || roll.title || 'Check')
      .replace(/^🎲\s*/, '')
      .replace(/\s*\(\s*⚡\s*\+?\d*\s*HP\s*\)/gi, '')
      .replace(/\s*\(\s*⚡\s*HP\s*Reroll\s*\)/gi, '')
      .trim();

    const d20 = roll.d20 || roll.naturalRoll || (roll.total !== undefined ? roll.total - (roll.modifier || 0) : null);
    const mod = roll.modifier !== undefined ? roll.modifier : (roll.mod || 0);
    const total = roll.total !== undefined ? roll.total : ((d20 !== null ? d20 : 10) + mod);

    const isNat20 = (d20 === 20) || roll.isCrit;
    const isNat1 = (d20 === 1);
    const usedHP = !!(roll.heroPointSpent || roll.usedHeroPoint || roll.isReroll);

    // Color: Gold on Natural 20, Red on Natural 1, Indigo default
    const embedColor = isNat20 ? 0xf59e0b : (isNat1 ? 0xef4444 : 0x6366f1);

    let formulaText = `1d20${mod >= 0 ? '+' : ''}${mod}`;
    if (roll.formula) formulaText = roll.formula;

    const fields = [
      { name: '🎲 Formula', value: `\`${formulaText}\``, inline: true },
      { name: '🎯 Natural d20', value: `\`${d20 !== null ? d20 : '—'}\`${isNat20 ? ' **(NATURAL 20!)**' : (isNat1 ? ' *(Nat 1)*' : '')}`, inline: true },
      { name: '💥 Total Result', value: `**\`${total}\`**`, inline: true }
    ];

    if (roll.dc !== undefined && roll.dc !== null) {
      const diff = total - roll.dc;
      const success = diff >= 0;
      fields.push({
        name: `Target DC ${roll.dc}`,
        value: success ? `✅ **Success** (+${diff})` : `❌ **Failed** (${diff})`,
        inline: true
      });
    }

    if (usedHP) {
      fields.push({ name: '⚡ Hero Point', value: roll.hpEffect || 'Hero Point Reroll applied!', inline: true });
    }

    const embed = new EmbedBuilder()
      .setColor(embedColor)
      .setTitle(`🎲 ${heroName} — ${rollTitle}`)
      .addFields(fields)
      .setFooter({ text: `Mutants & Masterminds 2E • ${playerName || heroName}` })
      .setTimestamp(roll.timestamp ? new Date(roll.timestamp) : new Date());

    await channel.send({ embeds: [embed] });
  } catch (err) {
    console.error('[Discord] Failed to post outbound roll:', err.message);
  }
}

const postedChatIds = new Set();
async function handleOutboundChat(chatPacket) {
  if (!client.isReady() || !chatPacket) return;
  if (chatPacket.isPrivate || chatPacket.recipient) return; // Never echo private whispers
  if (chatPacket.source === 'discord') return; // Prevent echoing back to Discord

  if (chatPacket.id && postedChatIds.has(chatPacket.id)) return;
  if (chatPacket.id) {
    postedChatIds.add(chatPacket.id);
    if (postedChatIds.size > 200) {
      const first = postedChatIds.values().next().value;
      postedChatIds.delete(first);
    }
  }

  const targetChannelId = CHAT_CHANNEL_ID || CHANNEL_ID;
  if (!targetChannelId) return;

  try {
    const channel = await client.channels.fetch(targetChannelId);
    if (!channel || !channel.isTextBased()) return;

    const heroName = (chatPacket.authorCharacter || '').trim();
    const playerName = (chatPacket.authorPlayer || chatPacket.author || 'Player').trim();
    const authorLabel = (heroName && playerName && heroName !== playerName)
      ? `**${heroName}** (${playerName})`
      : `**${heroName || playerName}**`;

    const text = (chatPacket.text || '').trim();
    if (!text) return;

    await channel.send(`💬 ${authorLabel}: ${text}`);
  } catch (err) {
    console.error('[Discord] Failed to post outbound chat:', err.message);
  }
}

function handleStatusUpdate(packet) {
  if (!packet) return;
  if (packet.campaignName) cachedCampaignStatus.campaignName = packet.campaignName;
  if (packet.campaignCode) cachedCampaignStatus.campaignCode = packet.campaignCode;
  if (packet.gmUserName) cachedCampaignStatus.gmUserName = packet.gmUserName;
  if (packet.sessionState) cachedCampaignStatus.sessionState = packet.sessionState;
  if (Array.isArray(packet.roster)) cachedCampaignStatus.roster = packet.roster;
}

// ============================================================================
// INBOUND: DISCORD -> HERO BUILDER & COMMANDS
// ============================================================================

// Evaluate standard dice notations: e.g. 1d20+8, d20+12, 1d20-2, 2d6+4
function parseDiceExpression(expr) {
  const clean = expr.trim().toLowerCase().replace(/\s+/g, '');
  const match = clean.match(/^(\d*)d(\d+)([+-]\d+)?$/);
  if (!match) return null;

  const count = match[1] === '' ? 1 : parseInt(match[1], 10);
  const sides = parseInt(match[2], 10);
  const mod = match[3] ? parseInt(match[3], 10) : 0;

  if (count <= 0 || count > 50 || sides <= 0 || sides > 1000) return null;

  const rolls = [];
  let sum = 0;
  for (let i = 0; i < count; i++) {
    const r = Math.floor(Math.random() * sides) + 1;
    rolls.push(r);
    sum += r;
  }
  const total = sum + mod;
  return { count, sides, mod, rolls, sum, total };
}

client.on('messageCreate', async (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  const isConfiguredChannel = (
    message.channelId === CHANNEL_ID ||
    message.channelId === ROLLS_CHANNEL_ID ||
    message.channelId === CHAT_CHANNEL_ID
  );

  if (!ALLOW_ALL_CHANNELS && !isConfiguredChannel) return;

  const content = message.content.trim();
  const lower = content.toLowerCase();

  // 1. Command handling
  const isMmCmd = lower.startsWith(PREFIX.toLowerCase());
  const isShortRoll = lower.startsWith('!roll ') || lower.startsWith('/roll ');

  if (isMmCmd || isShortRoll) {
    let rawCmd = '';
    if (isMmCmd) rawCmd = content.slice(PREFIX.length).trim();
    else if (isShortRoll) rawCmd = 'roll ' + content.slice(6).trim();

    const parts = rawCmd.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (cmd === 'roll') {
      await handleDiscordRollCommand(message, args);
      return;
    }

    if (cmd === 'status') {
      await handleDiscordStatusCommand(message);
      return;
    }

    if (cmd === 'hp' || cmd === 'heropoints') {
      await handleDiscordHPCommand(message);
      return;
    }

    if (cmd === 'help') {
      await handleDiscordHelpCommand(message);
      return;
    }

    if (cmd === 'chat') {
      const chatText = args.join(' ');
      if (chatText) {
        relayDiscordChatToHeroBuilder(message, chatText);
        await message.react('✅').catch(() => {});
      }
      return;
    }
  }

  // 2. Regular message in designated chat channel (two-way chat relay)
  if (isConfiguredChannel && (message.channelId === CHAT_CHANNEL_ID || message.channelId === CHANNEL_ID)) {
    // Relay regular non-command chat messages into Hero Builder
    if (!content.startsWith('!') && !content.startsWith('/')) {
      relayDiscordChatToHeroBuilder(message, content);
    }
  }
});

// Relay Discord chat to Hero Builder session feed
function relayDiscordChatToHeroBuilder(message, text) {
  const authorName = message.member?.displayName || message.author.username;
  const chatPacket = {
    type: 'CHAT',
    id: 'disc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    author: authorName,
    authorPlayer: authorName,
    authorCharacter: authorName,
    text: text,
    timestamp: new Date().toISOString(),
    source: 'discord',
    discordUser: {
      id: message.author.id,
      username: message.author.username,
      avatar: message.author.displayAvatarURL()
    }
  };

  const delivered = broadcastToHeroBuilder(chatPacket);
  console.log(`[Relay] Discord -> Hero Builder: "${text}" from ${authorName} (sent to ${delivered} clients)`);
}

// Handle !mm roll <formula> [label]
async function handleDiscordRollCommand(message, args) {
  if (args.length === 0) {
    message.reply('Usage: `!mm roll <formula> [label]` (e.g. `!mm roll 1d20+8 Toughness Check`)');
    return;
  }

  const formulaArg = args[0];
  const labelArg = args.slice(1).join(' ') || 'Check';

  const result = parseDiceExpression(formulaArg);
  if (!result) {
    message.reply(`Invalid dice formula \`${formulaArg}\`. Use formats like \`1d20+8\`, \`d20+12\`, or \`2d6+4\`.`);
    return;
  }

  const authorName = message.member?.displayName || message.author.username;
  const isD20 = (result.count === 1 && result.sides === 20);
  const naturalD20 = isD20 ? result.rolls[0] : null;
  const isCrit = (naturalD20 === 20);
  const isNat1 = (naturalD20 === 1);

  // Format Discord Reply
  const embedColor = isCrit ? 0xf59e0b : (isNat1 ? 0xef4444 : 0x10b981);
  let rollBreakdown = `[${result.rolls.join(', ')}]`;
  if (result.mod !== 0) rollBreakdown += ` ${result.mod >= 0 ? '+' : ''}${result.mod}`;

  const embed = new EmbedBuilder()
    .setColor(embedColor)
    .setTitle(`🎲 ${authorName} — ${labelArg}`)
    .addFields([
      { name: 'Formula', value: `\`${formulaArg}\``, inline: true },
      { name: 'Dice Breakdown', value: `\`${rollBreakdown}\`${isCrit ? ' **(NATURAL 20 CRITICAL!)**' : (isNat1 ? ' *(Nat 1)*' : '')}`, inline: true },
      { name: 'Total', value: `**\`${result.total}\`**`, inline: true }
    ])
    .setFooter({ text: 'Mutants & Masterminds 2E • Discord Relay' })
    .setTimestamp();

  await message.reply({ embeds: [embed] });

  // Relay roll into Hero Builder session
  const rollPacket = {
    type: 'ROLL',
    id: 'disc_roll_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    rollType: labelArg,
    title: labelArg,
    characterName: authorName,
    playerName: authorName,
    formula: formulaArg,
    d20: naturalD20,
    modifier: result.mod,
    total: result.total,
    isCrit: isCrit,
    timestamp: new Date().toISOString(),
    source: 'discord'
  };

  const delivered = broadcastToHeroBuilder(rollPacket);
  console.log(`[Relay] Discord Roll -> Hero Builder: ${authorName} rolled ${result.total} (${formulaArg}) to ${delivered} clients`);
}

// Handle !mm status
async function handleDiscordStatusCommand(message) {
  const status = cachedCampaignStatus;
  const rosterItems = (status.roster && status.roster.length > 0)
    ? status.roster.map(r => {
        const bruises = r.bruises || (r.conditions?.Bruised) || 0;
        const conds = Object.keys(r.conditions || {}).filter(k => k !== 'Bruised' && r.conditions[k]);
        let condText = bruises > 0 ? `${bruises} Bruise${bruises > 1 ? 's' : ''}` : 'Healthy';
        if (conds.length > 0) condText += `, ${conds.join(', ')}`;
        return `• **${r.characterName || 'Hero'}** (PL ${r.powerLevel || 10}) — *${condText}*`;
      }).join('\n')
    : '• *No player characters currently connected.*';

  const embed = new EmbedBuilder()
    .setColor(0x0284c7)
    .setTitle(`🏰 Campaign: ${status.campaignName || 'Active Campaign'}`)
    .setDescription(`**Campaign Code:** \`${status.campaignCode || 'campaign-1'}\`\n**Game Master:** ${status.gmUserName || 'GM'}\n**Session Status:** ${status.sessionState || 'Standby'}`)
    .addFields([
      { name: '👥 Party Roster & Vitals', value: rosterItems }
    ])
    .setFooter({ text: 'Mutants & Masterminds 2E • Hero Builder VTT' })
    .setTimestamp();

  await message.reply({ embeds: [embed] });
}

// Handle !mm hp
async function handleDiscordHPCommand(message) {
  const status = cachedCampaignStatus;
  const hpItems = (status.roster && status.roster.length > 0)
    ? status.roster.map(r => `• **${r.characterName || 'Hero'}**: **${r.heroPoints !== undefined ? r.heroPoints : 1}** HP`).join('\n')
    : '• *No active party characters loaded.*';

  const embed = new EmbedBuilder()
    .setColor(0xeab308)
    .setTitle('⚡ Party Hero Points')
    .setDescription(hpItems)
    .setFooter({ text: 'Mutants & Masterminds 2E • Hero Points Tracker' })
    .setTimestamp();

  await message.reply({ embeds: [embed] });
}

// Handle !mm help
async function handleDiscordHelpCommand(message) {
  const embed = new EmbedBuilder()
    .setColor(0x6366f1)
    .setTitle('🤖 Mutants & Masterminds 2E Discord Relay Bot')
    .setDescription('Two-way live bridge between this Discord channel and the Hero Builder VTT.')
    .addFields([
      { name: '🎲 Dice Rolling', value: '`!mm roll <formula> [label]`\n`!roll 1d20+8 Toughness`\nRolls dice using 2E rules (Nat 20 Crits). Sends roll live to the VTT feed!' },
      { name: '💬 In-Character Chat', value: '`!mm chat <message>`\nRelays in-character dialogue to the live VTT session chat.' },
      { name: '🏰 Campaign Status', value: '`!mm status`\nDisplays active campaign, hero roster, bruises, and conditions.' },
      { name: '⚡ Hero Points', value: '`!mm hp`\nDisplays current Hero Point totals for party members.' },
      { name: '❓ Help', value: '`!mm help`\nDisplays this command guide.' }
    ])
    .setFooter({ text: 'Mutants & Masterminds 2nd Edition Hero Builder' });

  await message.reply({ embeds: [embed] });
}

// ============================================================================
// STARTUP & INITIALIZATION
// ============================================================================

client.once('ready', async () => {
  console.log('\n======================================================================');
  console.log(` [MM2E Bot] Logged in as: ${client.user.tag}`);
  console.log(` [MM2E Bot] Connected to Discord Gateway successfully!`);
  console.log(` [MM2E Bot] Prefix: "${PREFIX}"`);

  if (CHANNEL_ID) {
    try {
      const ch = await client.channels.fetch(CHANNEL_ID);
      console.log(` [MM2E Bot] Primary Channel: #${ch ? ch.name : CHANNEL_ID}`);
    } catch (e) {
      console.warn(` [MM2E Bot] Notice: Could not fetch CHANNEL_ID (${CHANNEL_ID}). Ensure Bot is invited to that server!`);
    }
  }

  console.log(` [MM2E Bot] Local Bridge Server: http://localhost:${BRIDGE_PORT} / ws://localhost:${BRIDGE_PORT}`);
  console.log('======================================================================\n');

  try {
    client.user.setActivity('Mutants & Masterminds 2E | !mm help');
  } catch (e) {}
});

// Start local HTTP & WebSocket Bridge Server
server.listen(BRIDGE_PORT, () => {
  console.log(`[Bridge] Local HTTP & WebSocket relay listening on port ${BRIDGE_PORT}...`);
  console.log(`[Bridge] Waiting for Hero Builder web app to connect...`);

  // Log in to Discord
  console.log('[Discord] Connecting to Discord Gateway...');
  client.login(DISCORD_TOKEN).catch(err => {
    console.error('\n[Discord] Login failed:', err.message);
    if (err.message.includes('TOKEN_INVALID') || err.message.includes('An invalid token')) {
      console.error('Please check your DISCORD_TOKEN in .env or config.json.');
    }
  });
});
