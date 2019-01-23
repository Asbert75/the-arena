class Spell {
    constructor(spell) {
        this._id = spell.id;
        this._name = spell.name;
        this._icon = spell.icon;
        this._description = spell.description;
        this._resourceCost = spell.resourceCost;
        this._baseDamage = spell.baseDamage;
        this._baseHealing = spell.baseHealing;
        this._rank = spell.rank;
        this._rankModifier = spell.rankModifier;
    }

    get properties() {
        return {
            id: this._id,
            name: this._name,
            icon: this._icon,
            description: this._description,
            resourceCost: this._resourceCost,
            baseDamage: this._baseDamage,
            baseHealing: this._baseHealing,
            rank: this._rank,
            rankModifier: [...this._rankModifier]
        };
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get icon() {
        return this._icon;
    }

    get resourceCost() {
        return this._resourceCost;
    }

    get rankModifier() {
        return this._rankModifier;
    }

    get description() {
        let description = this._description;
        description = description.replace(/\[d\]/g, `${Math.floor(this.damage*0.9)}-${Math.floor(this.damage*1.1)}`);
        description = description.replace(/\[h\]/g, `${Math.floor(this.healing*0.9)}-${Math.floor(this.healing*1.1)}`);
        return description;
    }

    get damage() {
        return Math.floor(this._baseDamage * this.rankModifier[this._rank-1]);
    }

    get healing() {
        return Math.floor(this._baseHealing * this.rankModifier[this._rank-1]);
    }

    get rank() {
        return this._rank;
    }

    set rank(newRank) {
        this._rank = newRank;
    }
}

export default Spell;