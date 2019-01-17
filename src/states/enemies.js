const enemies = {
    enemies: [
        {
            id: 0,
            name: "Evil Imp",
            icon: "icons/enemies/evil_imp.png",
            level: 1,
            requiredLevel: 1,
            healthModifier: 0.8,
            damageModifier: 1
        }, {
            id: 1,
            name: "Twin Hydras",
            icon: "icons/enemies/twin_hydras.png",
            level: 2,
            requiredLevel: 0,
            healthModifier: 0.95,
            damageModifier: 0.85
        },{
            id: 2,
            name: "Gnarly Goblin",
            icon: "icons/enemies/gnarly_goblin.png",
            level: 4,
            requiredLevel: 2,
            healthModifier: 1.5,
            damageModifier: 0.7
        }, {
            id: 3,
            name: "Spark Spirit",
            icon: "icons/enemies/spark_spirit.png",
            level: 6,
            requiredLevel: 3,
            healthModifier: 1,
            damageModifier: 1.8
        }, {
            id: 4,
            name: "Greater Demon",
            icon: "icons/enemies/greater_demon.png",
            level: 8,
            requiredLevel: 5,
            healthModifier: 1.9,
            damageModifier: 1.5
        }, {
            id: 5,
            name: "The Beast",
            icon: "icons/enemies/the_beast.png",
            level: 10,
            requiredLevel: 7,
            healthModifier: 2.2,
            damageModifier: 2
        }
    ]
}

export default enemies;