class Enemy {
    constructor(data, baseHealthPerLevel) {
        this.maxHealth = baseHealthPerLevel[data.level-1] * data.healthModifier;
        this.currentHealth = this.maxHealth;
        this.damageModifier = data.damageModifier;
        this.icon = data.icon;
        this.name = data.name;
        this.level = data.level;
    }

    attack() {
        let damage = Math.floor(50 * this.damageModifier * (Math.floor(Math.random() * 21) + 90) / 100);
        return [damage, 0];
    }

    receiveAttack(damage) {
        if(this.currentHealth - damage <= 0) {
            this.currentHealth = 0;
        } 
        else {
            this.currentHealth -= damage;
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

    get getName() {
        return this.name;
    }

    get getLevel() {
        return this.level;
    }

    get getIcon() {
        return this.icon;
    }
}

export default Enemy;