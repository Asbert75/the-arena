const uuid = require('uuid/v4');

let rootReducer = (state, action) => {
    let newState = {...state };
    let spells = [], equipment = [];

    if(newState.character.spells.length !== 0) {
        spells = [...newState.character.spells];
    }
    if(newState.character.equipment.length !== 0) {
        equipment = [...newState.character.equipment];
    }
    let newCharacter = {...newState.character, spells, equipment};

    switch(action.type) {
        case "SHOW_CHARACTER_CREATION":
            newState.showCharacterCreation = true;
            newState.showCredits = false;
            newState.showArena = false;
            newState.showStore = false;
            newState.showCharacter = false;
            newState.showIntroduction = false;

            newState.refresh = !newState.refresh;

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

            newCharacter.class = action.selectedClass;
            newCharacter.spells = action.spells.map(spell => ({...spell}));
            newCharacter.equipment = [];
            newCharacter.name = action.name;
            newCharacter.level = 1;
            newCharacter.coins = 0;
            newCharacter.experience = 0;
            newCharacter.uid = uuid();

            localStorage.setItem("character", JSON.stringify(newCharacter));
            newState.character = newCharacter;
            return newState;
        case "GIVE_LOOT":
            newCharacter.experience += action.experience;
            newCharacter.coins += action.coins;

            if(newCharacter.level === 15) {
                newCharacter.experience = 0;
            }
            else if(newCharacter.experience > newState.gameSettings.requiredExperience[newState.character.level-1]) {
                newCharacter.level += 1;
                if(newCharacter.level === 15) {
                    newCharacter.experience = 0;
                }
                newCharacter.experience -= newState.gameSettings.requiredExperience[newState.character.level-1];
            }

            localStorage.setItem("character", JSON.stringify(newCharacter));
            newState.character = newCharacter;
            return newState;
        case "UPGRADE_SPELL":
            if(newCharacter.coins >= action.cost) {
                newCharacter.spells[action.spellIndex].rank = action.newRank;
                newCharacter.coins -= action.cost;
            }
            
            localStorage.setItem("character", JSON.stringify(newCharacter));
            newState.character = newCharacter;
            console.log(newState);
            return newState;
        case "PURCHASE_ITEM":
            if(newCharacter.coins >= action.item.cost) {
                newCharacter.equipment.push(action.item);
                newCharacter.coins -= action.item.cost;
            }

            localStorage.setItem("character", JSON.stringify(newCharacter));
            newState.character = newCharacter;
            return newState;
        case "LOAD_CHARACTER":
            if(action.cached !== true) {
                localStorage.setItem("character", JSON.stringify(action.character));
            }
            
            newState.showCharacterCreation = false;
            newState.showCredits = false;
            newState.showArena = false;
            newState.showStore = false;
            newState.showCharacter = true;
            newState.showIntroduction = false;

            newCharacter = action.character;
            newState.character = newCharacter;
            console.log(newState);
            return newState;
        default:
            return state;
    }
}

export default rootReducer;