const spells = {
    spells: [
        {
            id: 0,
            name: "Attack",
            icon: "icons/spells/attack.png",
            _description: "Attack your enemy for [d] damage.",
            get description() {
                let description = this._description;
                description = description.replace(/\[d\]/g, this.damage);
                description = description.replace(/\[h\]/g, this.healing);
                return description;
            },
            get damage() {
                return Math.floor(this.baseDamage * this.rankModifier[this.rank-1]);
            },
            get healing() {
                return Math.floor(this.baseHealing * this.rankModifier[this.rank-1]);
            },
            get rank() {
                return this._rank;
            },
            set rank(n) {
                this._rank += n;
            },
            resourceCost: 0,
            baseDamage: 15,
            baseHealing: 0,
            _rank: 1,
            rankModifier: [1, 2, 4]
        }, {
            id: 1,
            name: "Heal",
            icon: "icons/spells/heal.png",
            _description: "Cast a heal on yourself, restoring [h] health points.",
            get description() {
                let description = this._description;
                description = description.replace(/\[d\]/g, this.damage);
                description = description.replace(/\[h\]/g, this.healing);
                return description;
            },
            get damage() {
                return Math.floor(this.baseDamage * this.rankModifier[this.rank-1]);
            },
            get healing() {
                return Math.floor(this.baseHealing * this.rankModifier[this.rank-1]);
            },
            get rank() {
                return this._rank;
            },
            set rank(n) {
                this._rank += n;
            },
            resourceCost: 15,
            baseDamage: 0,
            baseHealing: 30,
            _rank: 1,
            rankModifier: [1, 2, 3.5]
        }, {
            id: 2,
            name: "Charged Arrow",
            icon: "icons/spells/charged_arrow.png",
            _description: "Launches a charged arrow at your enemy, dealing [d] damage.",
            get description() {
                let description = this._description;
                description = description.replace(/\[d\]/g, this.damage);
                description = description.replace(/\[h\]/g, this.healing);
                return description;
            },
            get damage() {
                return Math.floor(this.baseDamage * this.rankModifier[this.rank-1]);
            },
            get healing() {
                return Math.floor(this.baseHealing * this.rankModifier[this.rank-1]);
            },
            get rank() {
                return this._rank;
            },
            set rank(n) {
                this._rank += n;
            },
            resourceCost: 30,
            baseDamage: 35,
            baseHealing: 0,
            _rank: 1,
            rankModifier: [1, 1.5, 2.5]
        }, {
            id: 3,
            name: "Piercing Shot",
            icon: "icons/spells/piercing_shot.png",
            _description: "An extremely strong arrow pierces your enemy, instantly dealing [d] damage.",
            get description() {
                let description = this._description;
                description = description.replace(/\[d\]/g, this.damage);
                description = description.replace(/\[h\]/g, this.healing);
                return description;
            },
            get damage() {
                return Math.floor(this.baseDamage * this.rankModifier[this.rank-1]);
            },
            get healing() {
                return Math.floor(this.baseHealing * this.rankModifier[this.rank-1]);
            },
            get rank() {
                return this._rank;
            },
            set rank(n) {
                this._rank += n;
            },
            resourceCost: 10,
            baseDamage: 25,
            baseHealing: 0,
            _rank: 1,
            rankModifier: [1, 1.5, 2.15]
        }, {
            id: 4,
            name: "Quick Strike",
            icon: "icons/spells/quick_strike.png",
            _description: "A quick attack that deals [d] damage.",
            get description() {
                let description = this._description;
                description = description.replace(/\[d\]/g, this.damage);
                description = description.replace(/\[h\]/g, this.healing);
                return description;
            },
            get damage() {
                return Math.floor(this.baseDamage * this.rankModifier[this.rank-1]);
            },
            get healing() {
                return Math.floor(this.baseHealing * this.rankModifier[this.rank-1]);
            },
            get rank() {
                return this._rank;
            },
            set rank(n) {
                this._rank += n;
            },
            resourceCost: 10,
            baseDamage: 20,
            baseHealing: 0,
            _rank: 1,
            rankModifier: [1, 1.55, 2.15]
        }, {
            id: 5,
            name: "Skull Bash",
            icon: "icons/spells/skull_bash.png",
            _description: "A brutal slam that deals [d] damage.",
            get description() {
                let description = this._description;
                description = description.replace(/\[d\]/g, this.damage);
                description = description.replace(/\[h\]/g, this.healing);
                return description;
            },
            get damage() {
                return Math.floor(this.baseDamage * this.rankModifier[this.rank-1]);
            },
            get healing() {
                return Math.floor(this.baseHealing * this.rankModifier[this.rank-1]);
            },
            get rank() {
                return this._rank;
            },
            set rank(n) {
                this._rank += n;
            },
            resourceCost: 35,
            baseDamage: 30,
            baseHealing: 0,
            _rank: 1,
            rankModifier: [1, 1.65, 2.5]
        }, {
            id: 6,
            name: "Ambush",
            icon: "icons/spells/ambush.png",
            _description: "Stab your target from behind, dealing [d] damage.",
            get description() {
                let description = this._description;
                description = description.replace(/\[d\]/g, this.damage);
                description = description.replace(/\[h\]/g, this.healing);
                return description;
            },
            get damage() {
                return Math.floor(this.baseDamage * this.rankModifier[this.rank-1]);
            },
            get healing() {
                return Math.floor(this.baseHealing * this.rankModifier[this.rank-1]);
            },
            get rank() {
                return this._rank;
            },
            set rank(n) {
                this._rank += n;
            },
            resourceCost: 15,
            baseDamage: 25,
            baseHealing: 0,
            _rank: 1,
            rankModifier: [1, 1.75, 2.15]
        }, {
            id: 7,
            name: "Venomous Vial",
            icon: "icons/spells/venomous_vial.png",
            _description: "Throw a vial of poison at your target, dealing [d] damage.",
            get description() {
                let description = this._description;
                description = description.replace(/\[d\]/g, this.damage);
                description = description.replace(/\[h\]/g, this.healing);
                return description;
            },
            get damage() {
                return Math.floor(this.baseDamage * this.rankModifier[this.rank-1]);
            },
            get healing() {
                return Math.floor(this.baseHealing * this.rankModifier[this.rank-1]);
            },
            get rank() {
                return this._rank;
            },
            set rank(n) {
                this._rank += n;
            },
            resourceCost: 25,
            baseDamage: 30,
            baseHealing: 0,
            _rank: 1,
            rankModifier: [1, 1.55, 1.85]
        }, {
            id: 8,
            name: "Incinerate",
            icon: "icons/spells/incinerate.png",
            _description: "Set your target ablaze, dealing [d] damage.",
            get description() {
                let description = this._description;
                description = description.replace(/\[d\]/g, this.damage);
                description = description.replace(/\[h\]/g, this.healing);
                return description;
            },
            get damage() {
                return Math.floor(this.baseDamage * this.rankModifier[this.rank-1]);
            },
            get healing() {
                return Math.floor(this.baseHealing * this.rankModifier[this.rank-1]);
            },
            get rank() {
                return this._rank;
            },
            set rank(n) {
                this._rank += n;
            },
            resourceCost: 20,
            baseDamage: 30,
            baseHealing: 0,
            _rank: 1,
            rankModifier: [1, 1.55, 2.25]
        }, {
            id: 9,
            name: "Transfusion",
            icon: "icons/spells/transfusion.png",
            _description: "Fuse your energy with the enemy, dealing [d] damage, and restoring [h] health points to you.",
            get description() {
                let description = this._description;
                description = description.replace(/\[d\]/g, this.damage);
                description = description.replace(/\[h\]/g, this.healing);
                return description;
            },
            get damage() {
                return Math.floor(this.baseDamage * this.rankModifier[this.rank-1]);
            },
            get healing() {
                return Math.floor(this.baseHealing * this.rankModifier[this.rank-1]);
            },
            get rank() {
                return this._rank;
            },
            set rank(n) {
                this._rank += n;
            },
            resourceCost: 60,
            baseDamage: 20,
            baseHealing: 20,
            _rank: 1,
            rankModifier: [1, 1.55, 2.25]
        }, {
            id: 10,
            name: "Health Potion",
            icon: "icons/spells/health_potion.png",
            _description: "Drink a health potion, restoring [h] health points.",
            get description() {
                let description = this._description;
                description = description.replace(/\[d\]/g, this.damage);
                description = description.replace(/\[h\]/g, this.healing);
                return description;
            },
            get damage() {
                return Math.floor(this.baseDamage * this.rankModifier[this.rank-1]);
            },
            get healing() {
                return Math.floor(this.baseHealing * this.rankModifier[this.rank-1]);
            },
            get rank() {
                return this._rank;
            },
            set rank(n) {
                this._rank += n;
            },
            resourceCost: 0,
            baseDamage: 0,
            baseHealing: 20,
            _rank: 1,
            rankModifier: [1, 2.5, 4.5]
        }
    ]
}

export default spells;