let showCharacterCreation = () => {
    return {
        type: "SHOW_CHARACTER_CREATION"
    }
}

let showCredits = () => {
    return {
        type: "SHOW_CREDITS"
    }
}

let showArena = () => {
    return {
        type: "SHOW_ARENA"
    }
}

let showStore = () => {
    return {
        type: "SHOW_STORE"
    }
}

let showCharacter = () => {
    return {
        type: "SHOW_CHARACTER"
    }
}

let setClass = (selectedClass, spells, name) => {
    return {
        type: "SET_CLASS",
        selectedClass,
        spells,
        name
    }
}

let giveLoot = (experience, coins) => {
    return {
        type: "GIVE_LOOT",
        experience,
        coins
    }
}

let upgradeSpell = (spellIndex, cost, newSpell) => {
    return {
        type: "UPGRADE_SPELL",
        spellIndex,
        cost,
        newSpell
    }
}

let purchaseItem = (item) => {
    return {
        type: "PURCHASE_ITEM",
        item
    }
}

let loadCharacter = (character, cached) => {
    return {
        type: "LOAD_CHARACTER",
        character,
        cached
    }
}

export {
    showCharacterCreation,
    showCredits,
    showArena,
    showStore,
    showCharacter,
    setClass,
    giveLoot,
    upgradeSpell,
    purchaseItem,
    loadCharacter
};