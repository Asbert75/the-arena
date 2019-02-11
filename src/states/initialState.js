const initialState = {
    navigation: {
        showIntroduction: true,
        showCharacterCreation: false,
        showChampions: false,
        showStore: false,
        showArena: false,
        showCharacter: false,
        refresh: false
    },
    character: {
        class: null,
        coins: 0,
        level: 1,
        experience: 0,
        spells: [],
        equipment: [],
        name: "",
        uid: null,
        champion: false
    },
    accountId: null
}

export default initialState;