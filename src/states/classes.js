const classes = [
    {
        id: 0,
        name: "Warrior",
        description: "A warrior is a brutal and tough class, warriors have a high health pool and moderate damage.",
        icon: "icons/classes/warrior.png",
        resourceType: "Energy",
        healthModifier: 1.9,
        resourceModifier: 1,
        damageModifier: 1.5,
        healingModifier: 1,
        spells: [0, 4, 5, 10]
    }, {
        id: 1,
        name: "ArcHEr",
        description: "An archer is an agile and fast-paced class, archers have a moderate health pool and damage.",
        icon: "icons/classes/archer.png",
        resourceType: "Mana",
        healthModifier: 1.5,
        resourceModifier: 1.3,
        damageModifier: 1.5,
        healingModifier: 1.5,
        spells: [0, 3, 2, 1]
    }, {
        id: 2,
        name: "Rogue",
        description: "A rogue is a silent but deadly class, rogues have a low health pool and high damage.",
        icon: "icons/classes/rogue.png",
        resourceType: "Energy",
        healthModifier: 1.3,
        resourceModifier: 1,
        damageModifier: 1.8,
        healingModifier: 1,
        spells: [0, 6, 7, 10]
    }, {
        id: 3,
        name: "Wizard",
        description: "A wizard is an extremely dangerous class, wizards have a very low health pool and extremely high damage.",
        icon: "icons/classes/wizard.png",
        resourceType: "Mana",
        healthModifier: 1,
        resourceModifier: 1.8,
        damageModifier: 2,
        healingModifier: 2,
        spells: [0, 8, 9, 1]
    }, 
];

export default classes;