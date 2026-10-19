# Mutants & Masterminds 2nd Edition Hero Builder & VTT Manager

A modern, comprehensive, and responsive web-based character editor and tabletop session manager for the **Mutants & Masterminds 2nd Edition** tabletop roleplaying game.

🌐 **Live Application:** [https://captainload.github.io/mm2e-character-editor/](https://captainload.github.io/mm2e-character-editor/)

---

## 🌟 Architecture & Workflow: Non-Disruptive Multi-Tasking

> **Key Design Principle: Never Lose Your Place!**
> Opening any modal pop-up (such as the **Combat Tracker**, **Reference Tables**, **GM Hub**, or **PP Breakdown**) **NEVER changes or switches your current active tab**. If you are deep in building a complex Dynamic Array on the **Powers** tab or fine-tuning skill ranks on the **Skills** tab, you can freely summon any floating tool, roll dice, check benchmarks, or manage campaign notes, and close the dialog to instantly resume right where you were without interruption or page resets.

### ↗ Detachable Pop-Out Windows (Multi-Monitor Workflow)
- **Detachable Floating Windows**: The **Status & Combat Tracker** (`⏱ Tracker`), **Reference Tables** (`📊 Tables`), **GM Campaign Hub** (`👑 GM`), and **Party Display** (`🛡️ Party`) feature a top-right `↗ Pop Out` button.
- **Dedicated Desktop Windows**: Clicking `↗ Pop Out` detaches the dialog into a standalone native browser window. This is ideal for dual-monitor or multi-monitor GM and player setups, allowing you to keep reference tables, dice rollers, or damage counters visible on a second screen while editing your hero on the main screen.
- **Bi-Directional Live Synchronization**: State changes made in a detached pop-out (such as rolling dice, advancing damage tracks, or checking conditions) synchronize instantly with the parent editor window.
- **Persistent Geometry & Coordinate Memory**: When you resize or move a pop-out window, its dimensions and screen coordinates are preserved across sessions and re-dock cycles.
- **Seamless Re-docking**: Clicking `⬅ Re-dock` in the pop-out window smoothly returns the tool back into the main editor modal without any page reload, state loss, or disruption to your active tab.

---

## 🧭 Header & Quick Access Bar

The top navigation header remains pinned at the top of the screen (or can scroll with the page if Sticky Header is toggled off in Options):

- **Active Form / Companion Switcher**:
  - Lets you instantly toggle between your primary character (`🦸 Main Hero`), alternate forms (`🔄 Metamorph / Alternate Forms`), vehicular units (`🤖 Mecha`), trusted allies (`🤝 Sidekicks`), and minion hordes (`👥 Minions`).
  - Switching forms loads that entity's dedicated sheet while keeping all parent links intact.
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
- **Theme Selector**: Choose between curated color schemes, including **Dark Modern** (default), **High Contrast**, **Midnight Blue**, **Slate**, **Retro Terminal**, **Light Paper**, and **Parchment**.
- **Sticky Header**: Keep the top status bar pinned while scrolling long sheets, or toggle off for maximum vertical space on small displays.
- **Font Size Scaling**: Live slider to scale overall application typography from compact (80%) to large print (130%).
- **Line Spacing**: Fine-tune vertical text density for optimal readability.

### Workspace, Storage & Integrations
- **Custom Save/Load Folder**: Utilizing the Chromium File System Access API, you can bind a default local folder on your computer for instantaneous one-click saving and loading without standard browser download prompts.
- **Autosave Timer**: Configurable background autosave intervals (e.g., every 60 seconds) with an unobtrusive dirty-state badge (`● Unsaved Changes`).
- **Sound Effects & Audio Cues**: Audible feedback for rolling d20s, critical hits, and condition status alerts.
- **Discord Webhook Integration**: Enter your Discord channel's webhook URL to automatically broadcast public dice rolls, attack checks, damage saves, and combat status updates directly to your gaming group's Discord server.

---

## 📁 Main Menu Operations

Clicking `📁 Main ▾` in the top header reveals file, print, and administrative tools:

- **📄 New Hero**: Resets the workspace to a blank character sheet with confirmation safeguards to prevent accidental data loss.
- **📂 Load Hero...**: Opens `.mm2e` JSON character saves or legacy Hero Lab portfolio files (`.por`).
- **💾 Save / Save As...**: Saves the current character file with all powers, devices, complications, and companion sheets bundled into a clean, portable `.mm2e` JSON file.
- **🖨️ Print & PDF Preview...**: Opens the WYSIWYG Print Preview modal with custom toggles to hide or display specific sections, format printer-friendly tables, and produce clean multi-page PDFs (`Ctrl + P`).
- **👤 Users & Whitelist...**: Configure peer-to-peer VTT permissions, host tokens, player handles, and authorized character IDs for multi-user sessions.
- **❓ Help & User Guide...**: Opens this complete user guide.

---

## 📑 Tab-by-Tab Feature Guide

The character builder organizes hero creation into 9 focused tabs:

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

### 9. 🎲 Session & Virtual Tabletop (VTT) Tab
- **Peer-to-Peer Networking (PeerJS)**:
  - Connect directly with your GM and party members without requiring external servers or third-party accounts.
- **Party Roster Table**:
  - View real-time vitals, defense values, active conditions, and wounds of every connected party member.
- **Remote Dice & Action Log**:
  - Shared rolling feed broadcasting attack checks, saving throws, damage outcomes, and chat messages in real time.

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
- **Pop-Out Support**: Click `↗ Pop Out` to run your entire game from a dedicated GM dashboard.

### 🛡️ Party Display Pop-Out
- **Dedicated HUD**:
  - Displays a clean, high-contrast dashboard of all player heroes, their Toughness, Defense, conditions, and wounds.
  - Perfect for projecting on a TV screen or positioning on a secondary GM monitor.

### ⚡ Power Points Breakdown Modal
- **Transparent Audit**:
  - Breaks down your character's total budget into Abilities, Combat, Saves, Skills, Feats, and Powers.
  - Highlights trade-offs and flags any over-budget discrepancies.

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
