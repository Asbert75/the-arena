import Spell from "../classes/spell";
import Equipment from "../classes/equipment";
const uuid = require('uuid/v4');

function saveToLocalStorage(character) {
    let local = {
        class: character.class,
        name: character.name,
        level: character.level,
        coins: character.coins,
        experience: character.experience,
        uid: character.uid
    }

    local.spells = character.spells.map(spell => spell.properties);
    local.equipment = character.equipment.map(equipment => equipment.properties);
    localStorage.setItem("character", JSON.stringify(local));
}

let rootReducer = (state, action) => {
    let newState = {...state };
    let spells = [], equipment = [];

    if(newState.character.spells.length !== 0) {
        spells = newState.character.spells.map(spell => new Spell(spell));
    }
    if(newState.character.equipment.length !== 0) {
        equipment = newState.character.equipment.map(equipment => new Equipment(equipment));
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
            newCharacter.spells = action.spells;
            newCharacter.equipment = [];
            newCharacter.name = action.name;
            newCharacter.level = 1;
            newCharacter.coins = 0;
            newCharacter.experience = 0;
            newCharacter.uid = uuid();

            saveToLocalStorage(newCharacter);

            newState.character = newCharacter;
            return newState;
        case "GIVE_LOOT":
            newCharacter.experience += action.experience;
            newCharacter.coins += action.coins;

            if(newCharacter.level === 15) {
                newCharacter.experience = 0;
            }
            else if(newCharacter.experience > newState.settings.requiredExperience[newState.character.level-1]) {
                newCharacter.level += 1;
                if(newCharacter.level === 15) {
                    newCharacter.experience = 0;
                }
                newCharacter.experience -= newState.settings.requiredExperience[newState.character.level-1];
            }

            saveToLocalStorage(newCharacter);
            newState.character = newCharacter;
            return newState;
        case "UPGRADE_SPELL":
            if(newCharacter.coins >= action.cost) {
                newCharacter.spells[action.spellIndex] = new Spell(action.newSpell);
                newCharacter.coins -= action.cost;
            }
            
            saveToLocalStorage(newCharacter);
            newState.character = newCharacter;
            return newState;
        case "PURCHASE_ITEM":
            if(newCharacter.coins >= action.item.cost) {
                newCharacter.equipment.push(action.item);
                newCharacter.coins -= action.item.cost;
            }

            saveToLocalStorage(newCharacter);
            newState.character = newCharacter;
            return newState;
        case "LOAD_CHARACTER":
            if(action.cached !== true) {
                saveToLocalStorage(action.character);
            }
            
            newState.showCharacterCreation = false;
            newState.showCredits = false;
            newState.showArena = false;
            newState.showStore = false;
            newState.showCharacter = true;
            newState.showIntroduction = false;

            newCharacter = action.character;
            newState.character = newCharacter;
            return newState;
        default:
            return state;
    }
}

export default rootReducer;