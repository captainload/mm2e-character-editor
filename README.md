# Mutants & Masterminds 2nd Edition Hero Builder & VTT Manager

The complete, responsive, and non-disruptive character builder, rules reference, and virtual tabletop companion for the **Mutants & Masterminds 2nd Edition** tabletop roleplaying game.

🌐 **Live Web Application:** [https://captainload.github.io/mm2e-character-editor/](https://captainload.github.io/mm2e-character-editor/)

---

## 🌟 Architecture & Workflow: Non-Disruptive Multi-Tasking

> **Core Design Principle: Never Lose Your Place!**
> Opening any modal pop-up (such as the **Status & Combat Tracker**, **Reference Tables**, **GM Campaign Hub**, or **Power Points Breakdown**) **NEVER changes, resets, or disrupts your current active tab**. If you are deep in building a complex Dynamic Array on the **Powers** tab, calibrating skills on the **Skills** tab, or checking feats on the **Feats** tab, you can freely summon any floating tool, roll dice, reference benchmark tables, or manage campaign logs, and close the dialog to instantly resume right where you were without interruption.

### ↗ Detachable Pop-Out Windows (Multi-Monitor Workflow)
- **Detachable Floating Windows**: The **Status & Combat Tracker** (`⏱ Tracker`), **Reference Tables** (`📊 Tables`), **GM Campaign Hub** (`👑 GM`), and **Party Display** (`🛡️ Party`) feature a dedicated top-right `↗ Pop Out` button.
- **Dedicated Desktop Windows**: Clicking `↗ Pop Out` detaches the tool into a standalone native browser window. This is ideal for dual-monitor or multi-monitor GM and player setups, allowing you to keep reference tables, dice rollers, party vitals, or combat counters visible on a second screen while editing your hero on the main screen.
- **Bi-Directional Live Synchronization**: State changes made in a detached pop-out (such as rolling dice, advancing damage tracks, or toggling conditions) synchronize instantaneously with the parent editor window and all connected peers.
- **Persistent Geometry & Coordinate Memory**: When you resize or move a pop-out window, its dimensions and screen coordinates are preserved across sessions and re-dock cycles.
- **Seamless Re-docking**: Clicking `⬅ Re-dock` in the pop-out window smoothly returns the tool back into the main editor modal without any page reload, state loss, or disruption to your active tab.

---

## 🧭 Header & Persistent Quick Access Bar

The top navigation header remains pinned at the top of the screen (or can scroll with the page if Sticky Header is toggled off in Options):

- **Active Form & Character Switcher with Deletion Controls**:
  - Instantly switch the active workspace between your primary hero (`🦸 Main Hero`), campaign NPCs, saved campaign heroes, alternate forms (`🔄 Metamorph / Alternate Forms`), vehicular units (`🤖 Mecha`), trusted allies (`🤝 Sidekicks`), summonable creatures, and minion hordes (`👥 Minions`).
  - Switching forms loads that entity's dedicated sheet while keeping all parent links intact.
  - **Inline Delete Buttons (`🗑`)**: Every character, campaign NPC, saved roster hero, and attached alternate form features a dedicated inline `🗑` delete button directly inside the dropdown menu.
  - **Active Form Banner Delete**: When editing any alternate form or companion, a prominent `🗑 Delete This Form` button appears in the persistent top banner.
  - **Deletion Warning & Confirmation Safeguards**: Deleting any hero, NPC, or alternate form triggers a dedicated confirmation modal with color-coded badges, character names, and consequence warnings. No character or form is ever deleted accidentally without an explicit confirmation.
- **Hero Name & Identity**: Quick-edit field for the active hero's codename or true identity.
- **Power Level (PL) Badge & Cap Indicator**:
  - Displays current campaign Power Level (e.g., PL 10) and automatically enforces standard 2E trade-off limits: Attack + Damage <= 2 x PL, Defense + Toughness <= 2 x PL, and Save Caps.
- **Power Points Counter**:
  - Real-time indicator displaying **Points Spent** / **Points Allowed** / **Points Remaining** (e.g., `150 / 150 PP (0 Remaining)`).
  - Turns warning red if you exceed your allocated Power Point budget.
- **⚡ PP Breakdown Button**:
  - One-click floating audit modal displaying exact point expenditures across all six core categories: **Abilities**, **Combat**, **Saves / Defenses**, **Skills**, **Feats**, and **Powers**.
- **Quick Action Buttons**:
  - `⏱ Tracker`: Opens the live Status & Combat Tracker.
  - `📊 Tables`: Opens the Reference Tables and Measurements Benchmark catalog.
  - `👑 GM`: Opens the GM Campaign Hub and Encounter Manager.
  - `⚙ Options`: Opens application settings, display themes, and house rule toggles.
  - `❓ Help`: Opens this comprehensive Help & User Guide manual.
  - `📁 Main ▾`: Access file management, imports, printing, and user whitelisting.

---

## ⚙ Options & House Rules

Clicking `⚙ Options` in the top header opens the preferences and house rules configuration panel:

### House Rules
- **Enhanced Trait Boost**: When enabled, allows Enhanced Trait powers to boost power effect ranks beyond natural ability score limits.
- **Boost Alters Ranks**: Adjusts the Boost power mechanism to directly alter base power ranks rather than applying temporary floating modifiers.
- **Variable Power Level**: Decouples character Power Level caps from the standard 15 PP per PL rule, allowing high-point street-level heroes or low-point cosmic beings.
- **Perception Range Disabled**: Disables automatic Perception range cap exemptions for games enforcing strict attack/defense limits across all attack types.

### Legacy Modifiers (Core 2E vs. Ultimate Power)
- Toggles whether modifiers strictly follow the original 2005 Core Rulebook definitions or the expanded, balanced standards from *Ultimate Power*.

### Appearance, Layout & Typography
- **Theme Selector**: Choose between 4 distinct visual themes:
  - **Light**: High-clarity, crisp daytime theme with clean borders and sharp daytime contrast.
  - **Dark**: Low-eyestrain dark modern slate theme designed for extended evening sessions.
  - **Kitty**: Playful pastel theme featuring delightful rose-pink accents, soft violet cards, and cat-themed styling.
  - **Parchment**: Classic tabletop warm parchment styling evoking golden-age superhero sourcebooks and weathered paper character folios.
- **Menus on Left UI Option**: Traditional UX placement option that moves the action buttons (`📁 Main ▾`, `⚙ Options`, `❓ Help`) to the left side of the top header and reverses their order for standard desktop operating system familiarity.
- **Sticky Header**: Keep the top status bar pinned while scrolling long sheets, or toggle off for maximum vertical space on small displays.
- **Font Size Scaling**: Live slider to scale overall application typography across headers, body, fine print, controls, sub-controls, and badges.
- **Freeze Options Dialog Size**: Keeps the options dropdown at a readable standard size while testing typography sliders.
- **Widened & Centered Options Pop-Up**: The Options dialog spans 75% of browser width (`75vw`) and is centered horizontally on the screen, with options organized into balanced responsive cards and sub-grids to significantly reduce vertical scrolling.

### Workspace, Storage & Integrations
- **Custom Save/Load Folder**: Utilizing the Chromium File System Access API, you can bind a default local folder on your computer for instantaneous one-click saving and loading without standard browser download prompts.
- **Autosave Timer**: Configurable background autosave intervals (e.g., every 60 seconds) with an unobtrusive dirty-state badge (`● Unsaved Changes`).
- **Sound Effects & Audio Cues**: Audible feedback for rolling d20s, critical hits, and condition status alerts.
- **Per-Campaign Webhooks**: Dedicated broadcast pipelines for dice rolls and session chat supporting Discord, Slack, Guilded, and Mattermost (detailed below).

---

## 📁 Main Menu Operations

Clicking `📁 Main ▾` in the top header reveals file, print, and administrative tools:

- **📄 New Hero**: Resets the workspace to a blank character sheet with confirmation safeguards to prevent accidental data loss.
- **📂 Load Hero...**: Opens `.mm2e` JSON character saves or legacy Hero Lab portfolio files (`.por`).
- **💾 Save / Save As...**: Saves the current character file with all powers, devices, complications, and companion sheets bundled into a clean, portable `.mm2e` JSON file.
- **🖨️ Print & PDF Preview...**: Opens the WYSIWYG Print Preview modal with custom toggles to hide or display specific sections, format printer-friendly tables, and produce clean multi-page PDFs (`Ctrl + P`).
- **👤 Users & Whitelist...**: Configure peer-to-peer VTT permissions, host tokens, player handles, and authorized character IDs for multi-user sessions.
- **🔄 Check for Updates...**: Queries GitHub Pages in real time to detect new builds. If a newer version is deployed, the update modal displays the current build, latest build, and a one-click `🔄 Reload & Update` button that flushes browser caches and loads the fresh build immediately.
- **❓ Help & User Guide...**: Opens this complete user guide.

---

## 📑 Comprehensive Tab-by-Tab Feature Guide

The character builder organizes hero creation and tabletop gameplay into 9 focused tabs:

### 1. Main Stats Tab (Abilities, Saves & Combat)
- **Ability Scores**:
  - Full support for Strength (STR), Dexterity (DEX), Constitution (CON), Intelligence (INT), Wisdom (WIS), and Charisma (CHA).
  - Automatically calculates ability modifiers, derived carrying capacity, and Power Point costs (2 PP per ability point above 10).
  - Handles non-standard scores (e.g., Absent/Inanimate Constitution for constructs, undead, and robots).
- **Saving Throws / Defenses**:
  - Tracks Toughness, Fortitude, Reflex, and Will saves.
  - Automatically factors in base ability modifiers, feat bonuses (e.g., *Defensive Roll*, *Great Fortitude*, *Iron Will*, *Lightning Reflexes*), and active power bonuses (e.g., *Protection*, *Force Field*).
  - Highlights trade-off compliance: Defense + Toughness cannot exceed 2 x PL.
- **Combat Totals**:
  - **Base Attack Bonus (BAB)** & **Base Defense Bonus (BDB)** with accurate 2 PP per rank cost calculation.
  - Derived Melee and Ranged Attack totals including *Attack Focus* and *Attack Specialization* feats.
  - **Total Defense** and **Flat-Footed Defense**: Accurately handles *Dodge Focus* and *Uncanny Dodge* (retaining dodge bonuses while flat-footed).
  - **Flat-Footed Toughness**: Distinguishes natural Toughness from *Defensive Roll*, automatically stripping defensive roll bonuses when caught flat-footed unless protected by *Uncanny Dodge*.
- **Derived Statistics**:
  - **Knockback Modifier**: Calculated automatically from total Toughness, Impervious Protection, and Size modifiers.
  - **Initiative**: DEX modifier plus *Improved Initiative* feats.
  - **Carrying Capacity**: Calculates Light, Medium, Heavy, Maximum, Push/Drag, and Overhead lift limits in pounds and tons according to M&M 2E carrying tables and *Super-Strength* ranks.
  - **Hero Points**: Base pool tracking with quick-increment buttons.

### 2. Skills Tab
- **Standard 2E Skills Catalog**:
  - Acrobatics, Bluff, Climb, Computers, Concentration, Craft, Diplomacy, Disable Device, Disguise, Drive, Escape Artist, Gather Information, Handle Animal, Intimidate, Investigate, Knowledge, Notice, Perform, Pilot, Profession, Ride, Search, Sense Motive, Sleight of Hand, Stealth, Survival, and Swim.
- **Untrained Rules Enforcement**:
  - Clearly flags skills that cannot be used untrained according to 2E rules (e.g., Disable Device, Sleight of Hand).
- **Point-Buy Calculation**:
  - Automatically applies the standard 4 skill ranks per 1 Power Point cost ratio.
- **Interactive d20 Roller**:
  - Each skill row includes a `🎲` roll button that rolls 1d20 + Total Modifier and displays the result with breakdown in the chat/dice log.
- **Custom Skills**:
  - Add user-defined skills with custom names and selectable key abilities (STR, DEX, CON, INT, WIS, CHA).

### 3. Feats Tab
- **Comprehensive Feats Catalog**:
  - Contains all standard feats from the M&M 2nd Edition core rules and master sourcebooks.
- **Ranked Feats & Steppers**:
  - Feats with multiple ranks (such as *Attack Focus*, *Attack Specialization*, *Dodge Focus*, *Defensive Roll*, *Equipment*, *Minions*, *Sidekick*, *Super-Strength*, *Tough*) feature intuitive `+` / `-` rank steppers.
- **Prerequisite Validation**:
  - Warns when selecting feats whose ability, base attack, or prerequisite feat requirements are not yet met.
- **Detailed Rules Tooltips**:
  - Hover over or tap any feat name to review its exact book description, mechanics, and usage restrictions.

### 4. Powers Construction Engine Tab
The heart of the editor is a robust, modular power creation engine:

- **Complete 2E Effect Library**:
  - Browse dozens of standard effects: *Blast*, *Damage*, *Protection*, *Force Field*, *Flight*, *Super-Speed*, *Teleport*, *Super-Senses*, *Mind Control*, *Illusion*, *Healing*, *Morph*, *Nullify*, *Regeneration*, *Strike*, and more.
- **Power Containers & Structures**:
  - **Regular Containers**: Group multiple thematic powers under a single parent power.
  - **Devices**: Build *Hard to Lose* (4 PP per 5 PP of effects) or *Easy to Lose* (3 PP per 5 PP of effects) technological or mystical gadgets.
  - **Alternate Forms**: Construct Solid, Liquid, Gaseous, Energy, or Shadow forms with bundled innate traits.
  - **Dynamic Arrays & Alternate Effects**: Create main power slots with Alternate Powers (AP, +1 flat PP) or Dynamic Alternate Powers (DAP, +2 flat PP) with live point-pool budget enforcement.
- **Dynamic Profile Inspectors**:
  - **Super-Senses**: Dedicated interactive selector for Visual, Auditory, Olfactory, Tactile, Radio, Mental, and Exotic sense groups with precise enhancements (Accurate, Acute, Analytical, Extended, Microscopic, Penetrates Concealment, Radius, Rapid, Tracking, Time Sense, Counters Concealment/Illusion).
  - **Movement Modes**: Specialized controls for Flight, Swimming, Burrowing, Super-Speed, Permeate, Wall-Crawling, Water-Walking, Space Travel, and Dimensional Movement.
  - **Enhanced Traits**: Selectively enhance Ability scores, Feats, Skills, or Defenses with full point-cost reconciliation.
- **Modifiers Engine (Extras, Flaws & Power Feats)**:
  - Add Extras (increases cost per rank), Flaws (decreases cost per rank), and flat Power Feats (e.g., *Affects Insubstantial*, *Homing*, *Indirect*, *Split Attack*, *Reversible*, *Subtle*, *Triggered*).
  - Full support for **Progression** steppers across all variants (*Area*, *Duration*, *Mass*, *Range*, *Targets*) scaling up to 20 ranks.
- **100-State Undo & Redo**:
  - Master `↶ Undo` and `↷ Redo` buttons.
  - Rapid adjustments are debounced into single logical undo states.
  - History is preserved in browser storage across sessions.

### 5. Equipment & Headquarters Tab
- **Equipment Points (EP) Pool**:
  - Derived directly from ranks in the *Equipment* feat (5 EP per rank). Tracks spent vs. remaining EP with over-budget alerts.
- **Weapons & Tactical Gear**:
  - Melee, ranged, and thrown weaponry with damage bonuses, critical hit ranges, and range increments.
- **Protective Gear & Armor**:
  - Body armor, undercover vests, and shields with Toughness and Defense bonuses.
- **Vehicles Catalog**:
  - Pre-built and custom vehicles (Motorcycle, Sports Car, Armored Car, Jet, Helicopter, Submarine, Starship) with Size, Strength, Speed, Defense, and Toughness stats.
- **Headquarters Builder**:
  - Configure secret hideouts, superhero bases, and orbital stations.
  - Select size categories, toughness ratings, and specialized facilities (Computer, Defense System, Infirmary, Holding Cells, Laboratory, Workshop, Teleport, Living Space, Power System).

### 6. Background, Complications & Drawbacks Tab
- **Identity & Biography**:
  - Real Name, Hero Codename, Secret/Public Identity, Age, Gender, Height, Weight, Eyes, Hair, and rich text fields for Appearance, Personality, and Origin Story.
- **Complications**:
  - Document motivations, personal liabilities, nemeses, phobias, honor codes, secret identities, and prejudices that reward Hero Points during play.
- **Drawbacks Rebate Engine**:
  - Add mechanical drawbacks (e.g., Vulnerability, Weakness, Action Loss, Disability).
  - Automatically calculates Power Point rebates based on frequency (Uncommon, Common, Very Common) and severity (Minor, Moderate, Major), adding refunded points back to your available budget.

### 7. Plans Tab (Inventions, Blueprints & Rituals)
- **Invention Crafting Engine**:
  - Design temporary gadgets and one-off devices according to official 2E Inventing rules.
  - Calculates Design Check DC (10 + PP), Design Time, Construction Check DC (10 + PP), and Construction Time based on Knowledge and Craft skills.
- **Arcane Rituals & Blueprints**:
  - Create occult rituals, mystical wards, or experimental alchemical formulas with required skill checks and activation rituals.

### 8. Companions & Alternate Forms Tab
- **Sidekicks**:
  - Allocate points from the *Sidekick* feat (5 PP per rank).
  - Grants a complete, independent character sheet with standard 15 PP per PL progression.
- **Minions & Fanatics**:
  - Build hordes of loyal followers and minions (15 PP per rank from the *Minions* feat).
- **Summons & Duplicates**:
  - Configure summonable creatures and clones.
- **Alternate Forms / Metamorph**:
  - Create radically different character sheets (e.g., Dr. Jekyll & Mr. Hyde, shapeshifters, alien transformations) that switch instantaneously.
- **Form Management & Safe Deletion**:
  - Each companion entry features controls to edit the sheet, export as a standalone `.mm2e` file, or delete. Deletion always prompts a confirmation modal to safeguard your build data.

---

## 🎲 The Session Tab: Virtual Tabletop (VTT) & Party Command Center

The **Session** tab transforms the editor into a complete, real-time Virtual Tabletop companion that links the Game Master and all players together seamlessly.

### 🌐 How the Session Tab Connects Players & GM Together
- **Serverless Peer-to-Peer WebRTC (PeerJS)**:
  - MM2CG does NOT require external hosting accounts, third-party server signups, or subscription fees.
  - All communication occurs directly between browsers over encrypted WebRTC data channels.
  - The GM acts as the Host by starting a campaign session. A unique **Campaign Code** and invite URL (`📋 Copy Link`) are generated.
  - Players enter the campaign link or code to connect directly to the GM's session in milliseconds.
- **Access Control & Whitelisting**:
  - The GM retains full administrative control via the **Users & Whitelist** panel.
  - When new players attempt to join, the GM receives a clear banner notification with options to approve or decline access.
  - Approved players can be granted trusted tokens so they can reconnect across sessions automatically.
- **1-Click Sheet Submission (`📤 Submit Sheet to GM`)**:
  - Connected players can send their complete, live character sheet directly to the GM's campaign file with one click.
  - The GM can inspect, backup, or roll back player sheets at any point during the campaign.

### 🛡️ How to Monitor the Whole Party in Real Time
The top section of the Session tab features the **Party Roster Table**, designed as a live tactical command center for both players and GMs:

- **Vitals & Damage Counters**:
  - Continuously synchronizes **Bruised** and **Injured** counters across every connected hero.
  - Automatically computes the cumulative Toughness save penalty (-1 per Bruise/Injury) so players and GM always know exact defensive values.
- **Combat Totals & Hero Points**:
  - Displays Total Defense, Flat-Footed Defense, Toughness, Flat-Footed Toughness, and Knockback modifiers.
  - Tracks each hero's available **Hero Points** pool in real time, broadcasting instant updates when points are expended or rerolls are triggered.
- **Active Conditions Manager**:
  - Real-time condition badges for *Bruised*, *Injured*, *Dazed*, *Staggered*, *Disabled*, *Unconscious*, *Dying*, *Entangled*, *Exhausted*, *Fatigued*, *Helpless*, *Prone*, and *Stunned*.
  - When a hero suffers a condition, it appears on the party table instantly for everyone.
- **Initiative Order**:
  - Lists characters sorted by combat initiative to streamline turns.
- **GM Status Overrides**:
  - The GM can click into any player row to directly adjust wounds, toggle conditions, or award Hero Points.
- **Detachable Party Display (`↗ Pop Out`)**:
  - Click `↗ Pop Out` on the Party Tracker to detach the entire roster into a dedicated floating HUD.
  - Perfect for multi-monitor GM screens or projecting onto a living-room TV display while keeping your main screen free for character editing.

### ⚔️ Roll20 & Discord Features Included

The Session tab combines the best tabletop capabilities found on platforms like **Roll20** and **Discord**:

#### Roll20-Style Tabletop Mechanics:
- **Party HUD & Health Monitoring**: Live roster of all player characters and party NPCs with synchronized wound and condition states.
- **Interactive d20 Dice Engine**:
  - Roll directly from character sheets (Abilities, Skills, Feats, Attacks, Saving Throws) or use the interactive sidebar roller.
  - Full support for standard dice notation (`1d20+12`, `+5`, `-2`, `+1d4`).
  - Quick adjustment chips (`+1`, `+2`, `+5`, `+10`, `-1`, `-2`, `-5`).
  - Automatic failure grade calculations (Pass, Bruised, Staggered, Unconscious).
  - Built-in Hero Point reroll handling (rolls 1-10 receive a +10 bonus).
- **GM Broadcast & Silent Mode (`📡 Broadcast Output`)**:
  - GMs can toggle silent rolling mode on or off. In silent mode, rolls remain strictly private to the GM's screen and do not broadcast to players.
- **Tabletop Slash Commands**:
  - `/r 1d20+X` or `/roll 1d20+X [Label]`: Execute arbitrary dice rolls.
  - `/hp` or `✨`: Spend a Hero Point and announce rerolls.
  - `/w [Player] [Message]` or `/whisper [Character] [Message]`: Secret private messages.
  - `/ooc [Message]` or `(( Message ))`: Out-of-character table chat.
  - `/desc [Text]` or `/gm [Text]`: Narrative descriptions and scene framing.

#### Discord-Style Communication Features:
- **Continuous Single-Line Chat Feed**: Fast, auto-scrolling activity stream presenting dice rolls, combat saves, and player dialogue in clean chronological order.
- **Responsive Feed Filter Chips**:
  - Instantly isolate feed entries by clicking `All`, `Atk` (Attacks), `Save` (Saving Throws), `Check` (Skill/Ability checks), `HP` (Hero Point rolls), `Chat` (Public messages), or `Whisper` (Private communications).
- **Full-Text Feed Search**:
  - Search entire session histories with phrase matching (`"exact phrase"`), term exclusion (`-miss`), and type filters (`type:check`).
- **@Mention Autocomplete Popover**:
  - Typing `@` inside the chat bar opens an instant popover listing all connected players and the GM, allowing rapid secret whispers without memorizing handles.
- **Sound Effects & Cues**:
  - Audible alerts for dice rolls, critical hits, and condition alerts.
- **🏰 Campaigns Button & Synced Logs**:
  - Direct access from the top control row on the Session tab.
  - **Browse Synced Campaigns**: Switch between campaigns you've participated in and inspect metadata.
  - **Most Recently Synced Session Log**: Inspect past rolls and chat messages from any campaign, complete with timestamps, author badges, roll breakdowns, and outcomes.
  - **Real-Time Log Search & Filter**: Filter history entries by keyword, hero name, or roll type.
  - **Export Session Log**: Download the complete campaign log as a formatted `.txt` file with one click.
  - **Per-Campaign Webhooks**: Configure independent Dice Rolls and Session Chat webhooks for that specific campaign.
- **Dual Webhooks Mirroring**:
  - Stream session activity out to external channels in real time.

---

## 💬 Multi-Service Webhook Integration (Discord, Slack, Guilded & Mattermost)

MM2CG features deep, automated webhook integration, allowing tabletop sessions to bridge in-game action directly into your group's community chat servers.

### 🌐 Universal Service Compatibility: Discord, Slack, Guilded & Mattermost
MM2CG webhook payloads are transmitted with multi-service compatibility attributes:
- `content`: Read by **Discord** and **Guilded** (standard Markdown text formatting).
- `text`: Read by **Slack**, **Mattermost**, **Google Chat**, and custom HTTP webhooks.
- `username`: Displays the character and player name as the webhook sender.
Because both fields are transmitted simultaneously in the JSON payload, you can paste webhook URLs from Discord, Slack, Guilded, or Mattermost directly into MM2CG without requiring third-party bot proxies!

### 📡 Outbound Webhook Architecture & Why It Is One-Way
- **How Webhooks Work**:
  - Incoming webhooks are secure HTTP POST endpoints generated by your chat platform (e.g., `https://discord.com/api/webhooks/...` or `https://hooks.slack.com/services/...`) that accept push messages into a channel.
  - **Why Webhooks Do Not Read Messages**: Standard incoming webhooks are strictly **one-way (outbound only)**. They allow applications to publish messages into a chat channel, but web browsers cannot read incoming chat messages from that channel through a webhook endpoint without running a privileged bot application with gateway intents.
  - **The MM2CG Tabletop Solution**: MM2CG uses its built-in, encrypted **Peer-to-Peer VTT** for real-time two-way synchronization between players and GM, while using webhooks as an external broadcast mirror to publish public rolls and table chatter directly into your community servers!

### 🎲 Two Webhooks per Game: Dice Rolls & Session Chat
Each campaign can configure **TWO separate webhooks**:
1. **Dice Rolls Webhook (`🎲 Rolls`)**:
   - Dedicated channel for all attack checks, damage saves, skill checks, initiative, and hero point rerolls.
   - Formats clean summaries: Character name, roll type, formula breakdown with bold totals, and outcome tags (e.g., `Superman — Toughness Save: 1d20+15 = **28** (Pass)`).
2. **Session Chat Webhook (`💬 Chat`)**:
   - Dedicated channel for in-character dialogue, table talk, and GM scene descriptions.
   - Formats messages with the character and player name as the message author.
3. **Same Webhook for Both (`🔗 Both`)**:
   - Check the **"Use same webhook for both Rolls and Chat"** box if your group prefers routing all table activity into a single channel (e.g., `#game-table`).

### 🏰 Configured Per Campaign
- **Independent Routing**: Webhooks are configured individually per campaign in the **🏰 Campaigns** hub on the **Session** tab (or in the GM Hub). GMs and groups running multiple campaigns (e.g., *Freedom League* vs. *Doom City*) can route each game to its own dedicated server channels without cross-contamination.

### 🔒 Confidentiality & Whisper Protection
- **Zero Leakage**: Secret GM-to-player whispers (`/w`, `/whisper`, `@recipient`) and GM silent rolls are **STRICTLY EXCLUDED** from webhook broadcasts. Only public rolls and public chat are ever transmitted to external webhooks, safeguarding GM secrets and tactical maneuvers.

### 📋 Step-by-Step Webhook Setup Guide
1. **In Discord, Slack, Guilded, or Mattermost**:
   - **Discord**: Channel Settings -> Integrations -> Webhooks -> New Webhook -> Copy Webhook URL.
   - **Slack**: Apps -> Incoming WebHooks -> Add to Slack -> Choose Channel -> Copy Webhook URL.
   - **Guilded**: Server Settings -> Integrations -> Webhooks -> Create Webhook -> Copy URL.
   - **Mattermost**: Integrations -> Incoming Webhooks -> Add Incoming Webhook -> Copy URL.
2. **In MM2CG**:
   - Go to the **Session** tab and click **🏰 Campaigns** (or click `⚙ Options > 🏰 Configure Campaign Webhooks...`).
   - Switch to the **💬 Webhook Integrations** tab.
   - Paste the URLs into the **🎲 Dice Rolls Webhook** and/or **💬 Session Chat Webhook** fields (or check "Use same webhook for both").
   - Click `🎲 Test Roll Ping` or `💬 Test Chat Ping` to confirm receipt!
   - Click **💾 Save Campaign Webhooks**.

---

## 🪟 Pop-Up & Pop-Out Windows Detailed Guide

> **Remember:** Opening any of these windows—or detaching them to a second monitor with `↗ Pop Out`—**does not disrupt, reset, or switch your active tab** in the character editor!

### ⏱ Status & Combat Tracker
- **Damage & Wound Tracking**:
  - Increment Bruise and Injury counters.
  - Automatically computes the cumulative -1 penalty to subsequent Toughness saves.
- **Conditions Manager**:
  - One-click toggles for standard 2E conditions: *Bruised*, *Injured*, *Dazed*, *Staggered*, *Disabled*, *Unconscious*, *Dying*, *Entangled*, *Exhausted*, *Fatigued*, *Helpless*, *Prone*, *Stunned*.
- **Fade Counter**:
  - Manage rounds remaining for sustained powers, Boost effects, and fading traits.
- **Integrated Combat Roller**:
  - Quick-roll Toughness saves against incoming damage DCs with automatic failure grade calculation (Pass, Bruised, Staggered, Unconscious).
- **Pop-Out Support**: Click `↗ Pop Out` to park your combat status on an auxiliary screen.

### 📊 Reference Tables & Benchmarks
- **Measurements Table**:
  - Complete 2E progression table mapping ranks (-5 to 30+) to exact values for **Time**, **Distance**, **Mass / Weight**, **Volume**, and **Carrying Capacity**.
- **Difficulty Classes (DCs) Guide**:
  - Standard benchmarks for skill checks: Routine (DC 10), Moderate (DC 15), Hard (DC 20), Superhuman (DC 30), and Cosmic (DC 40+).
- **Combat Maneuvers Cheat Sheet**:
  - Immediate rules lookup for All-Out Attack, Power Attack, Accurate Attack, Defensive Attack, Charge, Flanking, Grappling, Feint, Trip, Disarm, Cover, and Concealment.
- **Pop-Out Support**: Click `↗ Pop Out` for a permanent rules reference window at your game table.

### 👑 GM Campaign Hub
- **Campaign Timeline & Session Notes**:
  - Chronicle game sessions, track in-game dates, and record key plot milestones.
- **NPC Roster & Quick Switcher**:
  - Attach full NPC villain and ally sheets directly to your campaign file.
  - Switch between viewing/editing NPCs and your player character without overwriting either file.
- **Encounter Combat Roster**:
  - Track initiative order, player/NPC wounds, and active conditions across entire combat scenes.
- **Save Points & Instant Rollback**:
  - Create full campaign state snapshots and roll back to previous save points at any time.
- **Pop-Out Support**: Click `↗ Pop Out` to run your entire game from a dedicated GM dashboard.

### 🛡️ Party Display Pop-Out
- **Dedicated HUD**:
  - Displays a clean, high-contrast dashboard of all player heroes, their Toughness, Defense, conditions, and wounds.
  - Perfect for projecting on a TV screen or positioning on a secondary GM monitor.

### ⚡ Power Points Breakdown Modal
- **Transparent Audit**:
  - Breaks down your character's total budget into Abilities, Combat, Saves, Skills, Feats, and Powers.
  - Highlights trade-offs and flags any over-budget discrepancies.

### 🗑️ Character & Form Deletion Confirmation Modal
- **Accidental Deletion Protection**:
  - Displays the exact target type (Primary Hero, Alternate Form, Mecha, Sidekick, Minion, Summon, Duplicate, Campaign NPC, or Campaign Character) and name.
  - Explains the specific consequences of deletion (e.g., clearing the active sheet, resetting to a fresh hero, discarding companion forms, or unlinking from campaign roster).
  - Requires explicit confirmation via a prominent `🗑 Yes, Delete` action before any changes are committed.

### 🔄 Application Update Check Modal
- **Real-Time Remote Build Detection**:
  - Live query to GitHub Pages to check for newly published versions.
  - Displays current running version vs. latest available version.
  - One-click `🔄 Reload & Update` button automatically flushes browser caches and unregisters Service Workers to load the latest build immediately.

### 🏰 Campaign Hub & Synced Logs Modal
- **Campaign Archive & Log Viewer**:
  - View all campaigns you have created or joined, including active status, GM handle, and session counts.
  - Browse complete session logs with timestamps, roll formulas, and dialogue entries.
  - Real-time text search and filter across campaign logs.
  - Download complete logs to formatted `.txt` files with one click.
  - Configure per-campaign Dice Rolls and Session Chat webhooks.

### ❓ Help & User Guide Modal
- **Comprehensive Offline Manual**:
  - Full tab-by-tab documentation of every editor control, house rule, and tabletop feature.
  - **Live Search Bar**: Search topics in real time with keyword highlighting (`<mark>`) and `Enter`/`Shift+Enter` result cycling.
  - Accessible at any time via `❓ Help` without disrupting your active character sheet.

### 📋 Hero Lab Import Audit Report
- **Portfolio Reconciliation**:
  - When importing a Hero Lab `.por` file, this audit dialog automatically generates a line-by-line report detailing converted traits, recognized modifiers, and any proprietary Hero Lab tags flagged for user review.

### 🖨️ Print & PDF Preview Modal
- **WYSIWYG Sheet Preview**:
  - Full preview of your printable character sheet with responsive column formatting.
  - Checkbox controls to toggle Background, Inventions, Equipment, or Full Power Descriptors.
  - One-click trigger for system print dialog or Save to PDF (`Ctrl + P`).

---

## 🚀 Getting Started & Local Offline Use

### Run in Any Modern Web Browser
Visit the live hosted web app: [https://captainload.github.io/mm2e-character-editor/](https://captainload.github.io/mm2e-character-editor/)

### Run Locally (100% Offline & Private)
The application is built with standard HTML5, Vanilla JavaScript, and modern CSS—**zero Node.js dependencies, zero build steps, and zero internet connection required**:
1. Clone or download the repository:
   ```bash
   git clone https://github.com/captainload/mm2e-character-editor.git
   ```
2. Double-click `Launch Hero Builder.bat` on Windows, or simply open `index.html` in Chrome, Edge, Firefox, or Safari.

---

## 📄 License & Disclaimer

This is an unofficial, fan-made open source utility created for personal and tabletop gaming use. *Mutants & Masterminds*, the *Mutants & Masterminds* logo, and Green Ronin are trademarks or registered trademarks of Green Ronin Publishing, LLC. All original mechanics and game systems are copyright Green Ronin Publishing.
