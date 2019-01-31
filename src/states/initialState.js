const initialState = {
    navigation: {
        showIntroduction: true,
        showCharacterCreation: false,
        showCredits: false,
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
        uid: null
    },
    accountId: null
}

export default initialState;