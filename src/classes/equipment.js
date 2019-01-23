class Equipment {
    constructor(equipment) {
        this._id = equipment.id;
        this._name = equipment.name;
        this._icon = equipment.icon;
        this._description = equipment.description;
        this._healthModifier = equipment.healthModifier;
        this._resourceModifier = equipment.resourceModifier;
        this._damageModifier = equipment.damageModifier;
        this._healingModifier = equipment.healingModifier;
        this._cost = equipment.cost;
        this._requiredLevel = equipment.requiredLevel;
        this._availableClasses = equipment.availableClasses;
    }

    get properties() {
        return {
            id: this._id,
            name: this._name,
            icon: this._icon,
            description: this._description,
            healthModifier: this._healthModifier,
            resourceModifier: this._resourceModifier,
            damageModifier: this._damageModifier,
            healingModifier: this._healingModifier,
            cost: this._cost,
            requiredLevel: this._requiredLevel,
            availableClasses: [...this._availableClasses]
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

    get description() {
        let description = this._description;
        description = description.replace(/\[r\]/g, Math.floor(this.resourceModifier * 100) - 100);
        description = description.replace(/\[hp\]/g, Math.floor(this.healthModifier * 100) - 100);
        description = description.replace(/\[d\]/g, Math.floor(this.damageModifier * 100) - 100);
        description = description.replace(/\[h\]/g, Math.floor(this.healingModifier * 100) - 100);
        return description;
    }

    get healthModifier() {
        return this._healthModifier;
    }

    get resourceModifier() {
        return this._resourceModifier;
    }

    get damageModifier() {
        return this._damageModifier;
    }

    get healingModifier() {
        return this._healingModifier;
    }

    get cost() {
        return this._cost;
    }

    get requiredLevel() {
        return this._requiredLevel;
    }

    get availableClasses() {
        return this._availableClasses; 
    }
}

export default Equipment;