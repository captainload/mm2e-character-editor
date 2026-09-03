window.handlePorImport = async function(file) {
  try {
    const zip = await JSZip.loadAsync(file);
    
    // Find the first XML in statblocks_xml/
    let statblockXmlPath = null;
    zip.folder("statblocks_xml").forEach((relativePath, file) => {
      if (!statblockXmlPath && relativePath.endsWith(".xml")) {
        statblockXmlPath = file.name;
      }
    });

    if (!statblockXmlPath) {
      showToast("No character XML found in POR file.", "error");
      return;
    }

    const xmlData = await zip.file(statblockXmlPath).async("string");
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "text/xml");

    const charNode = xmlDoc.querySelector("character");
    if (!charNode) {
      showToast("Invalid character XML structure.", "error");
      return;
    }

    const loadedData = {
      format: "MM2E_CHARACTER",
      version: "1.0",
      character: {
        name: charNode.getAttribute("name") || "Imported Hero",
        playerName: charNode.getAttribute("playername") || "",
        powerLevel: parseInt(charNode.querySelector("powerlevel")?.getAttribute("value") || 10),
        totalPointsAllowed: parseInt(charNode.querySelector("powerpoints")?.getAttribute("value") || 150),
        sizeCategory: charNode.querySelector("size")?.getAttribute("name") || "Medium",
        abilities: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
        purchasedResistances: { Toughness: 0, Fortitude: 0, Reflex: 0, Will: 0 },
        combat: { ATK: 0, DEF: 0 },
        skills: {},
        skillDetails: {},
        feats: {},
        featDetails: {},
        powers: []
      }
    };

    // Abilities
    const attrNodes = charNode.querySelectorAll("attributes > attribute");
    attrNodes.forEach(attr => {
      const name = attr.getAttribute("name");
      const base = parseInt(attr.querySelector("attrvalue")?.getAttribute("base") || 10);
      if (name === "Strength") loadedData.character.abilities.STR = base;
      if (name === "Dexterity") loadedData.character.abilities.DEX = base;
      if (name === "Constitution") loadedData.character.abilities.CON = base;
      if (name === "Intelligence") loadedData.character.abilities.INT = base;
      if (name === "Wisdom") loadedData.character.abilities.WIS = base;
      if (name === "Charisma") loadedData.character.abilities.CHA = base;
    });

    // Saves (purchased)
    const saveNodes = charNode.querySelectorAll("saves > save");
    saveNodes.forEach(save => {
      const name = save.getAttribute("name");
      const cost = parseInt(save.querySelector("cost")?.getAttribute("value") || 0);
      if (name === "Toughness") loadedData.character.purchasedResistances.Toughness = cost;
      if (name === "Fortitude") loadedData.character.purchasedResistances.Fortitude = cost;
      if (name === "Reflex") loadedData.character.purchasedResistances.Reflex = cost;
      if (name === "Will") loadedData.character.purchasedResistances.Will = cost;
    });

    // Combat (Cost mapping is tricky, assume base attack/def based on cost)
    // In M&M 2e, Attack is 2 PP per rank, Defense is 2 PP per rank.
    const attacksNode = charNode.querySelector("attacks");
    const defNode = charNode.querySelector("defense");
    if (attacksNode) {
      const atkCost = parseInt(attacksNode.querySelector("cost")?.getAttribute("value") || 0);
      loadedData.character.combat.ATK = Math.floor(atkCost / 2);
    }
    if (defNode) {
      const defCost = parseInt(defNode.querySelector("cost")?.getAttribute("value") || 0);
      loadedData.character.combat.DEF = Math.floor(defCost / 2);
    }

    // Skills
    const skillNodes = charNode.querySelectorAll("skills > skill");
    skillNodes.forEach(skill => {
      const name = skill.getAttribute("name");
      const cost = parseFloat(skill.querySelector("cost")?.getAttribute("value") || 0);
      if (cost > 0) {
        loadedData.character.skills[name] = Math.floor(cost * 4); // 4 ranks per 1 PP
      }
    });

    // Feats
    const featNodes = charNode.querySelectorAll("feats > feat");
    featNodes.forEach(feat => {
      const name = feat.getAttribute("name");
      const ranks = parseInt(feat.getAttribute("ranks") || 1);
      loadedData.character.feats[name] = ranks;
    });

    // Powers (Basic import as blueprints or raw powers)
    const powerNodes = charNode.querySelectorAll("powers > power");
    powerNodes.forEach((power, idx) => {
      const name = power.getAttribute("name");
      const ranks = parseInt(power.getAttribute("ranks") || 1);
      const cost = parseInt(power.querySelector("cost")?.getAttribute("value") || 0);
      const desc = power.getAttribute("summary") || power.querySelector("description")?.textContent || "";
      
      loadedData.character.powers.push({
        id: "imported_power_" + idx,
        name: name,
        effectName: "Imported Power",
        baseCost: 0,
        ranks: ranks,
        totalCostOverride: cost,
        description: desc,
        modifiers: []
      });
    });

    // Apply the imported character
    if (window.applyLoadedCharacter) {
      window.applyLoadedCharacter(loadedData);
      
      // Attempt to refresh the UI
      if (window.refreshAllUI) window.refreshAllUI();
      
      if (window.showToast) {
        window.showToast(`Imported ${loadedData.character.name} from Hero Lab successfully!`, "success");
      } else {
        alert("Character imported successfully!");
      }
    } else {
      console.error("applyLoadedCharacter function not found.");
    }

  } catch (err) {
    console.error("POR Import Error:", err);
    if (window.showToast) {
      showToast("Error importing POR file.", "error");
    } else {
      alert("Error importing POR file.");
    }
  }
};
