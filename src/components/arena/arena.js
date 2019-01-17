import React, { Component } from "react";
import { connect } from "react-redux";

import Player from "./player";
import Enemy from "./enemy";

import "./arena.css";
import { giveLoot } from "../../actions/actions";

class Arena extends Component {
    constructor() {
        super();

        this.state = {
            arenaLevel: 1,
            playerTurn: true,
            latestAction: "Your Venomous Vial hit Enemy for 40 damage.",
            showLatestAction: false,
            player: null,
            enemy: null,
            status: "WAITING", // WINNER, LOSER, INPROGRESS, WAITING
            loot: {
                experience: 0,
                coins: 0
            }
        };
    }

    componentDidMount() {
        this.addSpellEventListeners();
    }

    startArena() {
        let enemy = new Enemy(this.props.enemies[this.state.arenaLevel-1], this.props.gameSettings.baseHealthPerLevel);
        let player = new Player(this.props.character, this.props.gameSettings.baseHealthPerLevel, 
            this.props.gameSettings.baseResourcesPerLevel, this.props.gameSettings.requiredExperience[this.props.character.level-1]);
        this.setState({ enemy, player}, () => {
            this.setState({ status: "INPROGRESS" });
        });
    }

    checkForWinner() {
        if(this.state.enemy.getRemainingHealth <= 0) {
            this.distributeLoot();
            return true;
        }
        else if(this.state.player.getRemainingHealth <= 0) {
            this.setState({ status: "LOSER" });
            return true;
        }

        return false;
    }

    distributeLoot() {
        let experience = Math.floor(this.state.enemy.getLevel * 50 * ((Math.floor(Math.random() * 50) + 75) / 100));
        let coins = this.state.enemy.getLevel * 10;
        this.setState({ winnings: { experience, coins }, status: "WINNER" }, () => {
            this.props.dispatch(giveLoot(experience, coins));
        });
    }

    resetArena() {
        this.setState({ playerTurn: true, showLatestAction: false, arenaLevel: 1 }, () => {
            this.startArena();
        });
    }

    startNextLevel() {
        if(this.state.arenaLevel === this.props.enemies.length) {
            console.log("Last level defeated");
        }
        let nextLevel = this.state.arenaLevel + 1;
        this.setState({ playerTurn: true, showLatestAction: false, arenaLevel: nextLevel }, () => {
            this.startArena();
        });
    }

    handlePlayerAttack(index) {
        if(this.checkForWinner()) {
            return;
        }
        else if(this.state.status === "INPROGRESS") {
            if(!this.state.playerTurn) {
                return
            }

            let values = this.state.player.attack(index);
            let damage = values[0];
            let healing = values[1];
            let actionText;

            if(damage > 0 && healing > 0) {
                actionText = `Your ${this.state.player.getSpells[index].name} hit ${this.state.enemy.getName} ${damage} damage and restored 
                ${healing} health points to you.`;
                
            }
            else if(damage > 0) {
                actionText = `Your ${this.state.player.getSpells[index].name} hit ${this.state.enemy.getName} ${damage} damage.`;
            }
            else if(healing > 0) {
                actionText = `Your ${this.state.player.getSpells[index].name} healed you ${healing} health points.`;
            }
            else {
                return;
            }

            this.setState({ playerTurn: false });
            this.state.enemy.receiveAttack(damage);
            this.state.player.receiveHeal(healing);

            this.setState({ showLatestAction: true, latestAction: actionText });
            window.setTimeout(() => {
                this.setState({ showLatestAction: false });
                this.handleEnemyAttack();
            }, 2000);
        }
    }

    handleEnemyAttack() {
        if(this.checkForWinner()) {
            return;
        }
        else if(this.state.status === "INPROGRESS") {
            let damage = this.state.enemy.attack()[0];
            let actionText = `${this.state.enemy.getName} hit you for ${damage} damage.`;

            this.state.player.receiveAttack(damage);

            this.setState({ showLatestAction: true, latestAction: actionText });
            window.setTimeout(() => {
                this.setState({ showLatestAction: false, playerTurn: true });
                this.checkForWinner();
            }, 2000);
        }
    }

    addSpellEventListeners() {
        window.addEventListener("keydown", event => {
            let container = document.getElementById("spells"); 

            if(event.key === "1") {
                let spell = container.children[0].children[0];
                if(spell.classList.contains("disabled")) return; 
                spell.classList.add("clicked");
            } else if(event.key === "2") {
                let spell = container.children[1].children[0];
                if(spell.classList.contains("disabled")) return; 
                spell.classList.add("clicked");
            } else if(event.key === "3") {
                let spell = container.children[2].children[0];
                if(spell.classList.contains("disabled")) return; 
                spell.classList.add("clicked");
            } else if(event.key === "4") {
                let spell = container.children[3].children[0];
                if(spell.classList.contains("disabled")) return; 
                spell.classList.add("clicked");
            }
        });

        window.addEventListener("keyup", event => {
            let container = document.getElementById("spells");

            if(event.key === "1") {
                let spell = container.children[0].children[0];
                if(spell.classList.contains("disabled")) return;
                spell.classList.remove("clicked");
                this.handlePlayerAttack(0);
            } else if(event.key === "2") {
                let spell = container.children[1].children[0];
                if(spell.classList.contains("disabled")) return;
                spell.classList.remove("clicked");
                this.handlePlayerAttack(1);
            } else if(event.key === "3") {
                let spell = container.children[2].children[0];
                if(spell.classList.contains("disabled")) return;
                spell.classList.remove("clicked");
                this.handlePlayerAttack(2);
            } else if(event.key === "4") {
                let spell = container.children[3].children[0];
                if(spell.classList.contains("disabled")) return;
                spell.classList.remove("clicked");
                this.handlePlayerAttack(3);
            }
        });
    }

    render() {
        return (
            <div id="arena">
                { this.state.status === "WAITING" && 
                    <div className="introduction">
                        <h2>The Arena</h2>
                        <p>Welcome, {this.props.character.name}. 
                        <br/>
                        The arena consists of 6 stages. For each stage you complete you will be facing a tougher enemy. 
                        Should an enemy prove too difficult of a challenge, spell and armor upgrades can be bought in the shop.
                        Beat the 6th and final enemy to prove your worth.
                        <br/>
                        <br/>
                        Whenever you're ready, hit the button below to fight your first enemy.
                        </p>
                        <div>
                            <button className="startBtn" onClick={() => this.startArena()}></button>
                        </div>
                    </div>
                }
                { this.state.status !== "WAITING" && <React.Fragment>
                    <div className="enemyFrame">
                        <div className="enemy">
                            <div className="enemyProfile">
                                <div className="enemyUnitFrame">
                                    <img className="frame" src={"/images/classframe/classframe_active.png"} alt="" />
                                    <img className="frame_icon" src={"/images/" + this.state.enemy.getIcon} alt="" />
                                </div>
                                <h3 className="enemyName">{this.state.enemy.getName}</h3>
                            </div>
                            <div className="levelIndicatorFrame">
                                <img className="container" src={"/images/level_indicator_container.png"} alt="" />
                                {[0, 1, 2, 3, 4,5 ].map(n => {
                                    let left = (n * 32) + 3 + "px";
                                    let indicatorStyle = {
                                        left 
                                    }
                                    return (<img key={n} style={indicatorStyle} className={this.state.arenaLevel > n ? "indicator" : "indicator hidden"} src={"/images/level_indicator.png"} alt="" />)
                                })}
                            </div>
                        </div>
                        <div className="resourcebar">
                            <p className="level">Level {this.state.enemy.getLevel}</p>
                            <p className="health">{Math.floor(this.state.enemy.getRemainingHealth)}/{Math.floor(this.state.enemy.getMaxHealth)} HP</p>
                            <img className="frame" src={"/images/resourceframe/bar_frame.png"} alt="" />
                            <div style={{width: (this.state.enemy.getRemainingHealthPercentage * 4.94) + "px"}} className="frame_filler_health"></div>
                        </div>
                    </div>
                    <div className="statusFrame">
                        {!this.state.showLatestAction && this.state.status === "INPROGRESS" && <h3>It Is Your Turn!</h3>}
                        {this.state.showLatestAction && this.state.status === "INPROGRESS" && <h4>{this.state.latestAction}</h4>}
                        {this.state.status === "WINNER" && 
                            <div>
                                <h2>Victory</h2>
                                <div className="loot">
                                    <h5>Rewards</h5>
                                    <p className="expGain">+{this.state.winnings.experience} experience</p>
                                    <p className="coinGain">+{this.state.winnings.coins} coins</p>
                                </div>
                                <button className="continueBtn" onClick={() => this.startNextLevel()}></button>
                            </div>
                        }
                        {this.state.status === "LOSER" && 
                            <div>
                                <h2>Defeat</h2>
                                <button className="restartBtn" onClick={() => this.resetArena()}></button>
                            </div>
                        }
                    </div>
                    <div className="playerFrame">
                        <div id="spells">
                            { this.state.player.getSpells.map( (spell, index) =>
                            <div key={spell.id} className="spell" onClick={() => this.handlePlayerAttack(index)}>
                                <div className={this.state.playerTurn && (this.state.player.getRemainingResources >= spell.resourceCost) ? "spellframe clickable" : "spellframe disabled"}>
                                    <p className="bind">{index+1}</p>
                                    <img className="frame" src={"/images/spellframe/spellframe.png"} alt="" />
                                    <img className="frame_hover" src={"/images/spellframe/spellframe_hover.png"} alt="" />
                                    <img className="frame_clicked" src={"/images/spellframe/spellframe_clicked.png"} alt="" />
                                    <img className="frame_icon" src={"/images/" + spell.icon} alt="" />
                                </div>
                                <div className="spellDescription">
                                    <div>
                                        <div>
                                            <p className="spellName">{spell.name}</p>
                                            { spell.resourceCost !== 0 && <p className={spell.resourceCost > this.state.player.getRemainingResources ? "resourceCost lowMana" : "resourceCost"}>{spell.resourceCost} {this.state.player.getResourceType}</p>}
                                        </div>
                                        <p>Rank {spell.rank}</p>
                                    </div>
                                    <p>{spell.description}</p>
                                </div>
                            </div>
                            )}
                        </div>
                        <div className="resourcebar">
                            <div className="playerInfo">
                                <h4>{this.state.player.getName}</h4>
                                <div>
                                    <p>Level {this.state.player.getLevel} <span>{this.state.player.getClass}</span></p>
                                    <p>{Math.floor(this.state.player.getRemainingHealth)}/{Math.floor(this.state.player.getMaxHealth)} HP</p>
                                    <p>{Math.floor(this.state.player.getRemainingResources)}/{Math.floor(this.state.player.getMaxResources)} {this.state.player.getResourceType}</p>
                                </div>
                            </div>
                            <img className="frame" src={"/images/resourceframe/bar_frame.png"} alt="" />
                            <div style={{width: (this.state.player.getRemainingHealthPercentage * 4.94) + "px"}} className="frame_filler_health"></div>
                        </div>
                        <div className="resourcebar">
                            <img className="frame" src={"/images/resourceframe/bar_frame.png"} alt="" />
                            <div style={{width: (this.state.player.getRemainingResourcesPercentage * 4.94) + "px"}} className={"frame_filler_" + this.state.player.getResourceType.toLowerCase()}></div>
                        </div>
                        <div className="resourcebar">
                            <div className="playerExp">
                                <p>{this.state.player.getExperience}/{this.state.player.getExperienceToNextLevel} Experience</p>
                                <p>{this.state.player.getExperienceToNextLevel - this.state.player.getExperience} exp to level {this.state.player.getLevel + 1}</p>
                            </div>
                            <img className="frame" src={"/images/resourceframe/bar_frame.png"} alt="" />
                            <div style={{width: ((this.state.player.getExperience/this.props.gameSettings.requiredExperience[this.state.player.getLevel-1]) * 494) + "px"}} className="frame_filler_experience"></div>
                        </div>
                    </div>
                </React.Fragment>}
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    character: state.character,
    gameSettings: state.gameSettings,
    enemies: state.enemies,
    state: state
  };
};

export default connect(mapStateToProps)(Arena);