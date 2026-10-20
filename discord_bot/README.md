# 🤖 Mutants & Masterminds 2E VTT - Discord Relay Bot

The official two-way relay bridge between Discord channels and the **Mutants & Masterminds 2nd Edition Hero Builder & VTT**.

---

## 🌟 Features

- **Bi-Directional Chat Sync**:
  - Messages typed in Discord channels appear live in the Hero Builder's session chat feed.
  - In-character chat typed in the Hero Builder appears in Discord with the character codename and player handle.
- **Bi-Directional Dice Rolls**:
  - Rolls made from Hero Builder sheets, combat tracker, or dice modal post rich embeds to Discord (showing natural d20 rolls, crits, modifier breakdowns, and DC margin).
  - Dice rolled in Discord (`!mm roll 1d20+8 Toughness`) appear live in the Hero Builder's dice feed, combat log, and campaign timeline.
- **Session & Vitals Status (`!mm status`)**:
  - Discord players can query active campaign details, hero names, Power Levels, active conditions, and bruise tracks at any time.
- **Hero Points Monitor (`!mm hp`)**:
  - Check party Hero Point reserves directly from Discord.
- **Local WebSocket & HTTP Bridge**:
  - Connects locally to the Hero Builder on `ws://localhost:18820` with zero lag and zero complex port-forwarding.

---

## 🚀 Quick Start Guide

### Step 1: Install Node.js
If you don't already have Node.js installed, download and install **Node.js LTS (v18 or newer)** from [https://nodejs.org/](https://nodejs.org/).

### Step 2: Create a Discord Bot Application
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application** (top-right). Name it (e.g. `MM2E Hero Bot`) and click **Create**.
3. In the left sidebar, click **Bot**.
4. Click **Reset Token** (or **Copy Token**) to generate your Bot Token. Save this token for Step 4.
5. Scroll down to **Privileged Gateway Intents**:
   - Turn **ON** `Message Content Intent` (REQUIRED so the bot can read messages and dice roll commands).
   - Turn **ON** `Server Members Intent` (Optional).
6. Click **Save Changes**.

### Step 3: Invite the Bot to Your Discord Server
1. In the Developer Portal, go to **OAuth2** &rarr; **URL Generator**.
2. Under **Scopes**, select:
   - `bot`
3. Under **Bot Permissions**, select:
   - `Send Messages`
   - `Embed Links`
   - `Attach Files`
   - `Read Message History`
   - `Add Reactions`
4. Copy the generated URL at the bottom and paste it into your browser to invite the bot to your Discord server.

### Step 4: Configure the Bot
1. Open the bot folder.
2. Copy `.env.example` to `.env` (or edit `config.json`):
   ```env
   DISCORD_TOKEN=your_token_from_step_2_here
   CHANNEL_ID=your_discord_channel_id_here
   BRIDGE_PORT=18820
   PREFIX=!mm 
   ```
3. To find your **Channel ID**:
   - In Discord, go to **User Settings** &rarr; **Advanced** &rarr; Turn ON **Developer Mode**.
   - Right-click the channel you want the bot to use (e.g. `#vtt-session`) and click **Copy Channel ID**.
   - Paste this ID into `CHANNEL_ID`.

### Step 5: Launch the Bot
- **Windows**: Double-click `start_bot.bat`. It will automatically run `npm install` on first launch and start the bot.
- **macOS / Linux**: Run `chmod +x start_bot.sh && ./start_bot.sh` (or `npm install && npm start`).

When the bot starts, you will see:
```text
[MM2E Bot] Logged in as MM2E Hero Bot#1234
[MM2E Bot] Relay Channel: #vtt-session (ID: 123456789012345678)
[MM2E Bot] Local Bridge Server listening on port 18820
```

### Step 6: Connect with the Hero Builder
1. Open the [Mutants & Masterminds Hero Builder](https://captainload.github.io/mm2e-character-editor/).
2. In the **Session** tab or **GM Hub** (`👑 GM`), the bot status badge will illuminate green: **`🤖 Discord Bot: Connected`**.
3. You're ready to play!

---

## 🎲 Discord Commands Reference

| Command | Example | Description |
|---|---|---|
| `!mm roll <formula> [label]` | `!mm roll 1d20+12 Attack Check` | Roll dice with M&M 2E rules (Natural 20 Crit detection). Relays to Hero Builder session feed! |
| `!roll <formula> [label]` | `!roll 1d20+8 Toughness` | Shorthand roll command. |
| `!mm chat <message>` | `!mm chat "I take cover behind the pillar!"` | Send in-character speech to the Hero Builder chat feed. |
| `!mm status` | `!mm status` | Query active campaign details, hero roster, conditions, and bruises. |
| `!mm hp` | `!mm hp` | Display active party Hero Point reserves. |
| `!mm help` | `!mm help` | Display full command reference in Discord. |

---

## ⚙️ Advanced Configuration Options

In `.env` or `config.json`:
- `ROLLS_CHANNEL_ID`: Set a separate channel for dice rolls to keep chat uncluttered.
- `CHAT_CHANNEL_ID`: Set a separate channel for in-character dialogue.
- `ALLOW_ALL_CHANNELS=true`: Allow dice rolls and queries in any server channel the bot can see.
- `BRIDGE_PORT=18820`: Change the local port if 18820 is occupied by another application.
