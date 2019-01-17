import classes from "./classes";
import enemies from "./enemies";
import spells from "./spells";
import equipment from "./equipment";

const initialState = {
    showIntroduction: true,
    showCharacterCreation: false,
    showCredits: false,
    showStore: false,
    showArena: false,
    showCharacter: false,
    ...enemies,
    ...classes,
    ...spells,
    ...equipment,
    gameSettings: {
        baseHealthPerLevel: [100, 120, 200, 250, 300, 400, 475, 550, 700, 900, 1200, 1350, 1500, 1650],
        baseResourcesPerLevel: [200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330],
        requiredExperience: [100, 200, 400, 700, 1000, 1400, 1900, 2500, 2900, 3700, 4600, 5500, 7250, 9000]
    },
    character: {
        class: null,
        coins: 0,
        level: 1,
        experience: 0,
        spells: [],
        equipment: [],
        name: ""
    }
}

export default initialState;