let rootReducer = (state, action) => {
    let newState = {...state };

    let spells = [...newState.character.spells];
    let equipment = [...newState.character.equipment];
    let newCharacter = {...newState.character, spells, equipment};
    switch(action.type) {
        case "SHOW_CHARACTER_CREATION":
            newState.showCharacterCreation = true;
            newState.showCredits = false;
            newState.showArena = false;
            newState.showStore = false;
            newState.showCharacter = false;
            newState.showIntroduction = false;

            return newState;
        case "SHOW_CREDITS":
            newState.showCharacterCreation = false;
            newState.showCredits = true;
            newState.showArena = false;
            newState.showStore = false;
            newState.showCharacter = false;
            newState.showIntroduction = false;
            
            return newState;
        case "SHOW_ARENA":
            newState.showCharacterCreation = false;
            newState.showCredits = false;
            newState.showArena = true;
            newState.showStore = false;
            newState.showCharacter = false;
            newState.showIntroduction = false;
            
            return newState;
        case "SHOW_STORE":
            newState.showCharacterCreation = false;
            newState.showCredits = false;
            newState.showArena = false;
            newState.showStore = true;
            newState.showCharacter = false;
            newState.showIntroduction = false;
            
            return newState;
        case "SHOW_CHARACTER":
            newState.showCharacterCreation = false;
            newState.showCredits = false;
            newState.showArena = false;
            newState.showStore = false;
            newState.showCharacter = true;
            newState.showIntroduction = false;
            
            return newState;
        case "SET_CLASS":
            newState.showCharacterCreation = false;
            newState.showCredits = false;
            newState.showArena = false;
            newState.showStore = false;
            newState.showCharacter = true;
            newState.showIntroduction = false;

            newCharacter = {
                class: action.selectedClass,
                spells: action.spells,
                equipment: [],
                name: action.name,
                level: 1,
                coins: 0,
                experience: 0
            }

            newState.character = newCharacter;
           return newState;
        case "GIVE_LOOT":
            newCharacter.experience += action.experience;
            newCharacter.coins += action.coins;

            if(newCharacter.experience > newState.gameSettings.requiredExperience[newState.character.level-1]) {
                newCharacter.experience -= newState.gameSettings.requiredExperience[newState.character.level-1];
                newCharacter.level += 1;
            }

            newState.character = newCharacter;
            return newState;
        case "UPGRADE_SPELL":
            if(newCharacter.coins >= action.cost) {
                newCharacter.spells[action.spellIndex].rank = 1;
                newCharacter.coins -= action.cost;
            }
            newState.character = newCharacter;
            return newState;
        case "PURCHASE_ITEM":
            if(newCharacter.coins >= action.item.cost) {
                newCharacter.equipment.push(action.item);
                newCharacter.coins -= action.item.cost;
            }
            newState.character = newCharacter;
            return newState;
        default:
            return state;
    }
}

export default rootReducer;