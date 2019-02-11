const spells = [
    {
        id: 0,
        name: "Attack",
        icon: "icons/spells/attack.png",
        description: "Attack your enemy for [d] damage.",
        secondaryDescription: "Also restores 10% of your maximum energy/mana.",
        resourceCost: 0,
        baseDamage: 15,
        baseHealing: 0,
        rank: 1,
        rankModifier: [1, 2, 3]
    }, {
        id: 1,
        name: "Heal",
        icon: "icons/spells/heal.png",
        description: "Cast a heal on yourself, restoring [h] health points.",
        secondaryDescription: null,
        resourceCost: 15,
        baseDamage: 0,
        baseHealing: 30,
        rank: 1,
        rankModifier: [1, 2, 3.5]
    }, {
        id: 2,
        name: "Charged Arrow",
        icon: "icons/spells/charged_arrow.png",
        description: "Launches a charged arrow at your enemy, dealing [d] damage.",
        secondaryDescription: null,
        resourceCost: 25,
        baseDamage: 35,
        baseHealing: 0,
        rank: 1,
        rankModifier: [1, 1.5, 2.5]
    }, {
        id: 3,
        name: "Piercing Shot",
        icon: "icons/spells/piercing_shot.png",
        description: "An extremely strong arrow pierces your enemy, instantly dealing [d] damage.",
        secondaryDescription: "Has a 20% chance to deal 100% increased damage.",
        resourceCost: 15,
        baseDamage: 25,
        baseHealing: 0,
        rank: 1,
        rankModifier: [1, 1.5, 2.15]
    }, {
        id: 4,
        name: "Quick Strike",
        icon: "icons/spells/quick_strike.png",
        description: "A quick attack that deals [d] damage.",
        secondaryDescription: "Has a 20% chance to deal 100% increased damage.",
        resourceCost: 15,
        baseDamage: 20,
        baseHealing: 0,
        rank: 1,
        rankModifier: [1, 2.1, 3.15]
    }, {
        id: 5,
        name: "Skull Bash",
        icon: "icons/spells/skull_bash.png",
        description: "A brutal slam that deals [d] damage.",
        secondaryDescription: null,
        resourceCost: 30,
        baseDamage: 30,
        baseHealing: 0,
        rank: 1,
        rankModifier: [1, 2, 2.95]
    }, {
        id: 6,
        name: "Ambush",
        icon: "icons/spells/ambush.png",
        description: "Stab your target from behind, dealing [d] damage.",
        secondaryDescription: "Has a 20% chance to deal 100% increased damage.",
        resourceCost: 15,
        baseDamage: 25,
        baseHealing: 0,
        rank: 1,
        rankModifier: [1, 1.75, 2.15]
    }, {
        id: 7,
        name: "Venomous Vial",
        icon: "icons/spells/venomous_vial.png",
        description: "Throw a vial of poison at your target, dealing [d] damage.",
        secondaryDescription: null,
        resourceCost: 25,
        baseDamage: 30,
        baseHealing: 0,
        rank: 1,
        rankModifier: [1, 1.55, 2.25]
    }, {
        id: 8,
        name: "Incinerate",
        icon: "icons/spells/incinerate.png",
        description: "Set your target ablaze, dealing [d] damage.",
        secondaryDescription: "Has a 20% chance to deal 100% increased damage.",
        resourceCost: 20,
        baseDamage: 25,
        baseHealing: 0,
        rank: 1,
        rankModifier: [1, 1.55, 2.25]
    }, {
        id: 9,
        name: "Transfusion",
        icon: "icons/spells/transfusion.png",
        description: "Fuse your energy with the enemy, dealing [d] damage, and restoring [h] health points to you.",
        secondaryDescription: null,
        resourceCost: 60,
        baseDamage: 20,
        baseHealing: 15,
        rank: 1,
        rankModifier: [1, 1.55, 2.25]
    }, {
        id: 10,
        name: "Health Potion",
        icon: "icons/spells/health_potion.png",
        description: "Drink a health potion, restoring [h] health points.",
        secondaryDescription: null,
        resourceCost: 0,
        baseDamage: 0,
        baseHealing: 20,
        rank: 1,
        rankModifier: [1, 2.5, 3.5]
    }
];

export default spells;