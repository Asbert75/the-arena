class Spell {
    constructor(id, name, icon, description, resourceCost, baseDamage, baseHealing, rank, rankModifier) {
        this._id = id;
        this._name = name;
        this._icon = icon;
        this._description = description;
        this._resourceCost = resourceCost;
        this._baseDamage = baseDamage;
        this._baseHealing = baseHealing;
        this._rank = rank;
        this._rankModifier = rankModifier;
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