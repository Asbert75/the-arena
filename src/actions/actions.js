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

let setClass = (selectedClass, spells, name, accountId) => {
    return {
        type: "SET_CLASS",
        selectedClass,
        spells,
        name,
        accountId
    }
}

let giveLoot = (experience, coins, accountId) => {
    return {
        type: "GIVE_LOOT",
        experience,
        coins,
        accountId
    }
}

let upgradeSpell = (spellIndex, cost, newSpell, accountId) => {
    return {
        type: "UPGRADE_SPELL",
        spellIndex,
        cost,
        newSpell,
        accountId
    }
}

let purchaseItem = (item, accountId) => {
    return {
        type: "PURCHASE_ITEM",
        item,
        accountId
    }
}

let loadCharacter = (character, cached) => {
    return {
        type: "LOAD_CHARACTER",
        character,
        cached
    }
}

let resetCharacter = () => {
    return {
        type: "RESET_CHARACTER"
    }
}

let setAccountId = (accountId = null) => {
    return {
        type: "SET_ACCOUNT_ID",
        accountId
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
    loadCharacter,
    resetCharacter,
    setAccountId
};