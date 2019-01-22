class Player {
    constructor(data, baseHealthPerLevel, baseResourcesPerLevel, experienceToNextLevel) {
        this.maxHealth = baseHealthPerLevel[data.level-1] * data.class.healthModifier;
        this.maxResources = baseResourcesPerLevel[data.level-1] * data.class.resourceModifier;
        this.damageModifier = data.class.damageModifier;
        this.healingModifier = data.class.healingModifier;
        this.icon = data.class.icon;
        this.name = data.name;
        this.spells = data.spells;
        this.equipment = data.equipment;
        this.resourceType = data.class.resourceType;
        this.className = data.class.name;
        this.experience = data.experience;
        this.experienceToNextLevel = experienceToNextLevel;
        this.level = data.level;

        data.equipment.forEach(item => {
            this.damageModifier *= item.damageModifier;
            this.healingModifier *= item.healingModifier;
            this.maxHealth *= item.healthModifier;
            this.maxResources *= item.resourceModifier;
        });

        this.currentHealth = this.maxHealth;
        this.currentResources = this.maxResources;
    }

    attack(spellIndex) {
        let spell = this.spells[spellIndex];
        let randomizer = (Math.floor(Math.random() * 21) + 90)/100;

        if(this.currentResources >= spell.resourceCost) {
            this.currentResources -= spell.resourceCost;
            
            let damage = Math.floor(spell.damage * this.damageModifier * randomizer);
            let healing = Math.floor(spell.healing * this.healingModifier * randomizer);
            return [damage, healing];
        }
        return [0, 0];
    }

    receiveAttack(damage) {
        if(this.currentHealth - damage <= 0) {
            this.currentHealth = 0;
        } 
        else {
            this.currentHealth -= damage;
        }
    }

    receiveHeal(healing) {
        if(this.currentHealth + healing >= this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }
        else {
            this.currentHealth += healing;
        }
    }

    get getMaxHealth() {
        return this.maxHealth;
    }

    get getRemainingHealth() {
        return this.currentHealth;
    }

    get getRemainingHealthPercentage() {
        return (this.currentHealth / this.maxHealth) * 100;
    }

    get getMaxResources() {
        return this.maxResources;
    }

    get getRemainingResources() {
        return this.currentResources;
    }

    get getRemainingResourcesPercentage() {
        return (this.currentResources / this.maxResources) * 100;
    }

    get getName() {
        return this.name;
    }

    get getLevel() {
        return this.level;
    }

    get getIcon() {
        return this.icon;
    }

    get getResourceType() {
        return this.resourceType;
    }

    get getClass() {
        return this.className;
    }

    get getExperience() {
        return this.experience;
    }

    get getExperienceToNextLevel() {
        return this.experienceToNextLevel;
    }

    get getSpells() {
        return this.spells;
    }
}

export default Player;