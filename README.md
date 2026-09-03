# Mutants & Masterminds 2nd Edition Character Editor

A modern, comprehensive, and responsive web-based character editor and sheet manager for the **Mutants & Masterminds 2nd Edition** tabletop roleplaying game.

🌐 **Live Application:** [https://captainload.github.io/mm2e-character-editor/](https://captainload.github.io/mm2e-character-editor/)

---

## Features

### 🦸‍♂️ Complete Point-Buy Calculator
- Live tracking of Power Points spent across **Abilities**, **Combat**, **Saves / Defenses**, **Skills**, **Feats**, and **Powers**.
- Automatic calculation of derived stats (Attack DC, Total Defense, Flat-Footed Defense, Toughness, Flat-Footed Toughness, Knockback, Initiative, Carrying Capacity).
- Accurate rules implementation for combat feats such as **Uncanny Dodge** (retaining Dodge Focus bonuses and Defensive Roll while flat-footed).

### ⚡ Power Construction Engine
- **Full 2E Effect Library**: Browse and configure standard M&M 2E powers (Damage, Blast, Protection, Super-Senses, Movement, Morph, Enhanced Trait, etc.).
- **Dynamic Profile Options**:
  - **Super-Senses**: Visual, Auditory, Olfactory, Tactile, Radio, Mental, and Exotic senses with accurate trait detection.
  - **Movement**: Dimensional Travel, Space Travel, Environmental Adaptation, Permeate, Wall-Crawling, Water-Walking, and more.
  - **Enhanced / Reduced Traits**: Enhanced abilities, feats, skills, and defense modifiers.
- **Modifiers Engine**:
  - Add **Extras**, **Flaws**, and **Power Feats** directly to any effect.
  - Full support for **Progression** modifiers (`Progression`, `Progression (Area)`, `Progression (Duration)`, `Progression (Mass)`, `Progression (Range)`, `Progression (Targets)`) available in both Extras and Feats menus.
  - Steppers with live rank scaling up to 20 ranks and precise cost calculation (+1 flat PP per rank).
- **Power History & Undo/Redo**:
  - Unified history tracking with master **Undo** (`↶`) and **Redo** (`↷`) buttons.
  - Coalesces rapid stepper clicks into single logical steps with 800ms debounce.
  - Persists up to 100 history states in `localStorage` across page refreshes.

### 🎨 User Interface & Accessibility
- **Persistent Top Header**: Sticky top navigation bar containing character summary points and tabs, with an optional toggle under Options to disable if preferred.
- **Theme & Typography**: Curated dark and light color themes, adjustable font sizes, and sleek glassmorphic design elements.
- **Print Optimization**: Clean print stylesheet specifically formatted for paper character sheets (`Ctrl + P`).
- **Hero Lab (.por) Importer**: Import existing characters directly from Hero Lab `.por` save files.
- **PWA / Offline Support**: Integrated Service Worker for offline functionality and desktop installability.

---

## Getting Started

### Run in Browser (No Installation Required)
Simply visit [https://captainload.github.io/mm2e-character-editor/](https://captainload.github.io/mm2e-character-editor/).

### Run Locally
Because this application is built with standard HTML5, Vanilla CSS, and JavaScript, it requires **zero build tools or dependencies**:
1. Clone the repository:
   ```bash
   git clone https://github.com/captainload/mm2e-character-editor.git
   ```
2. Open `index.html` in any modern web browser, or double-click `Launch Hero Builder.bat` on Windows.

---

## File Structure

- `index.html` - Main application markup and modal dialogs.
- `styles.css` - Responsive styling, themes, and `@media print` rules.
- `app.js` - UI controller, event bindings, and Power Construction Engine.
- `character_model.js` - Character data model and Point calculation rules engine.
- `data_powers_effects.js` - 2nd Edition powers and effect definitions.
- `data_powers_modifiers.js` - Extras, Flaws, and Power Feats catalog.
- `data_feats.js` - Standard feats list and prerequisite rules.
- `data_skills.js` - Skills catalog and attribute linkages.
- `data_equipment.js` - Weapons, armor, vehicles, and equipment.
- `data_tables.js` & `data_measurements.js` - Progression tables and measurement conversions.
- `por_importer.js` - Hero Lab `.por` file parser.
- `print.js` - Character sheet export and print view formatting.
- `sw.js` - Service Worker cache manager.

---

## License & Disclaimer
This is an unofficial fan-made project created for educational and personal gaming use. *Mutants & Masterminds* and related marks are trademarks or registered trademarks of Green Ronin Publishing, LLC.
