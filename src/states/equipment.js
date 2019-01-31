const equipment = [
    {
        id: 0,
        name: "Scroll Of Knowledge",
        description: "Increases your max resources by [r]%.",
        icon: "icons/equipment/scroll_of_knowledge.png",
        healthModifier: 1,
        resourceModifier: 1.2,
        damageModifier: 1,
        healingModifier: 1,
        cost: 100,
        requiredLevel: 3,
        availableClasses: [3]
    }, {
        id: 1,
        name: "Robe of Wizardry",
        description: "Increases your damage by [d]%, healing by [h]% and health by [hp]%.",
        icon: "icons/equipment/robe_of_wizardry.png",
        healthModifier: 1.15,
        resourceModifier: 1,
        damageModifier: 1.175,
        healingModifier: 1.15,
        cost: 300,
        requiredLevel: 4,
        availableClasses: [1, 3]
    }, {
        id: 2,
        name: "Hat of Wizardry",
        description: "Increases your damage and healing by [d]%.",
        icon: "icons/equipment/hat_of_wizardry.png",
        healthModifier: 1,
        resourceModifier: 1,
        damageModifier: 1.25,
        healingModifier: 1.25,
        cost: 250,
        requiredLevel: 2,
        availableClasses: [1, 3]
    }, {
        id: 3,
        name: "Azariah's Chain of Vitality",
        description: "Increases your health by [hp]%.",
        icon: "icons/equipment/azariahs_chain_of_vitality.png",
        healthModifier: 1.35,
        resourceModifier: 1,
        damageModifier: 1,
        healingModifier: 1,
        cost: 200,
        requiredLevel: 4,
        availableClasses: [0, 1, 2]
    }, {
        id: 4,
        name: "Bulwark",
        description: "Increases your health by [hp]%.",
        icon: "icons/equipment/bulwark.png",
        healthModifier: 1.2,
        resourceModifier: 1,
        damageModifier: 1,
        healingModifier: 1,
        cost: 100,
        requiredLevel: 2,
        availableClasses: [0, 2]
    }, {
        id: 5,
        name: "Chainmail of Endurance",
        description: "Increases your damage by [d]% and health by [hp]%.",
        icon: "icons/equipment/chainmail_of_endurance.png",
        healthModifier: 1.5,
        resourceModifier: 1,
        damageModifier: 1.25,
        healingModifier: 1,
        cost: 400,
        requiredLevel: 6,
        availableClasses: [0, 2]
    }, {
        id: 6,
        name: "Elven Headguard",
        description: "Increases your damage, healing and health by [d]%.",
        icon: "icons/equipment/elven_headguard.png",
        healthModifier: 1.25,
        resourceModifier: 1,
        damageModifier: 1.25,
        healingModifier: 1.25,
        cost: 500,
        requiredLevel: 8,
        availableClasses: [1, 2]
    }, {
        id: 7,
        name: "Jeweled Chalice",
        description: "Increases your damage, healing and health by [d]%.",
        icon: "icons/equipment/jeweled_chalice.png",
        healthModifier: 1.25,
        resourceModifier: 1,
        damageModifier: 1.25,
        healingModifier: 1.25,
        cost: 500,
        requiredLevel: 8,
        availableClasses: [1, 2, 3]
    }, {
        id: 8,
        name: "Signet of Death",
        description: "Increases your damage by [d]%.",
        icon: "icons/equipment/signet_of_death.png",
        healthModifier: 1,
        resourceModifier: 1,
        damageModifier: 1.4,
        healingModifier: 1,
        cost: 700,
        requiredLevel: 10,
        availableClasses: [0, 1, 2]
    }, {
        id: 9,
        name: "Tribal Pendant",
        description: "Increases your healing by [h]%.",
        icon: "icons/equipment/tribal_pendant.png",
        healthModifier: 1,
        resourceModifier: 1,
        damageModifier: 1,
        healingModifier: 1.6,
        cost: 700,
        requiredLevel: 10,
        availableClasses: [0, 2]
    }
];

export default equipment;