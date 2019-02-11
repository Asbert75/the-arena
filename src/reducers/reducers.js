import {combineReducers} from 'redux';
import Spell from "../classes/spell";
import settings from "../states/settings";
// import Equipment from "../classes/equipment";
const uuid = require('uuid/v4');

function saveToLocalStorage(character) {
    let local = {
        class: character.class,
        name: character.name,
        level: character.level,
        coins: character.coins,
        experience: character.experience,
        uid: character.uid,
        champion: character.champion
    }

    local.spells = character.spells.map(spell => spell.properties);
    local.equipment = character.equipment.map(equipment => equipment.properties);
    localStorage.setItem("character", JSON.stringify(local));
}

function removeFromLocalStorage() {
    localStorage.removeItem("character");
}

function saveToDatabase(character, accountId) {
    let saveableCharacter = {
        ...character,
        accountId
    }

    saveableCharacter.spells = character.spells.map(spell => spell.properties);
    saveableCharacter.equipment = character.equipment.map(equipment => equipment.properties);

    fetch("http://localhost:4000/characters/save", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify(saveableCharacter)
    }).then(res => {
        res.json()
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        });
    })
    .catch(err => {
        console.log(err);
    });
}

function saveChampion(character, accountId) {
    let saveableCharacter = {
        class: character.class.name,
        level: character.level,
        name: character.name,
        uid: character.uid,
        accountId
    }

    fetch("http://localhost:4000/champions/save", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify(saveableCharacter)
    }).then(res => {
        res.json()
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        });
    })
    .catch(err => {
        console.log(err);
    });
}

let characterReducer = (state={}, action) => {
    let newState = {...state};

    switch(action.type) {
        case "SET_CLASS":
            newState.class = action.selectedClass;
            newState.spells = action.spells;
            newState.equipment = [];
            newState.name = action.name;
            newState.level = 14;
            newState.coins = 10000;
            newState.experience = 8500;
            newState.champion = false;
            newState.uid = uuid();

            saveToLocalStorage(newState);
            saveToDatabase(newState, action.accountId);
            return newState;
        case "GIVE_LOOT":
            newState.experience += action.experience;
            newState.coins += action.coins;

            if(newState.level === 15) {
                newState.experience = 0;
            }
            else if(newState.experience > settings.requiredExperience[newState.level-1]) {
                newState.level += 1;
                if(newState.level === 15) {
                    newState.experience = 0;
                }
                newState.experience -= settings.requiredExperience[newState.level-2];
            }

            saveToLocalStorage(newState);
            saveToDatabase(newState, action.accountId);
            return newState;
        case "UPGRADE_SPELL":
            if(newState.coins >= action.cost) {
                newState.spells[action.spellIndex] = new Spell(action.newSpell);
                newState.coins -= action.cost;
            }
            
            saveToLocalStorage(newState);
            saveToDatabase(newState, action.accountId);
            return newState;
        case "PURCHASE_ITEM":
            if(newState.coins >= action.item.cost) {
                newState.equipment.push(action.item);
                newState.coins -= action.item.cost;
            }

            saveToLocalStorage(newState);
            saveToDatabase(newState, action.accountId);
            return newState;
        case "LOAD_CHARACTER":
            if(action.cached !== true) {
                saveToLocalStorage(action.character);
            }

            newState = action.character;
            return newState;
        case "RESET_CHARACTER":
            newState = {
                class: null,
                coins: 0,
                level: 1,
                experience: 0,
                spells: [],
                equipment: [],
                name: "",
                uid: null,
                champion: false
            }

            removeFromLocalStorage();
            return newState;
        case "SET_CHAMPION":
            newState.champion = true;
            saveToLocalStorage(newState);
            saveToDatabase(newState, action.accountId);
            saveChampion(newState, action.accountId);
            return newState;
        default:
            return state;
    }
}

let navigationReducer = (state={}, action) => {
    let newState = {
        showCharacterCreation: false,
        showChampions: false,
        showArena: false,
        showCharacter: false,
        showIntroduction: false,
        refresh: !state.refresh
    };

    switch(action.type) {
        case "SHOW_CHARACTER_CREATION":
            newState.showCharacterCreation = true;
            return newState;
        case "SHOW_CHAMPIONS":
            newState.showChampions = true;
            return newState;
        case "SHOW_ARENA":
            newState.showArena = true;        
            return newState;
        case "SHOW_STORE":
            newState.showStore = true;      
            return newState;
        case "SHOW_CHARACTER":
            newState.showCharacter = true;            
            return newState;
        case "RESET_CHARACTER":
            newState.showIntroduction = true;
            return newState;
        case "LOAD_CHARACTER":
            newState.showCharacter = true;
            return newState;
        case "SET_CLASS":
            newState.showCharacter = true;
            return newState;
        default:
            return state;
    }
}

let accountReducer = (state="", action) => {
    switch(action.type) {
        case "SET_ACCOUNT_ID":
            if(action.accountId) {
                state = action.accountId;
            }
            else {
                state = uuid();
                localStorage.setItem("accountId", state);
            }
            return state;
        default:
            return state;
    }
}

let rootReducer = combineReducers({
    character: characterReducer,
    navigation: navigationReducer,
    accountId: accountReducer
});

export default rootReducer;