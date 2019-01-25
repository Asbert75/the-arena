import React, { Component } from "react";
import { connect } from "react-redux";

import "./character.css";

import { resetCharacter } from "../../actions/actions";

class Character extends Component {
    constructor() {
        super();

        this.state = {
            saved: false
        }
    }
    saveToDatabase(character) {
        let saveableCharacter = {
            ...character,
            accountId: this.props.accountId
        }

        saveableCharacter.spells = character.spells.map(spell => spell.properties);
        saveableCharacter.equipment = character.equipment.map(equipment => equipment.properties);

        fetch("/characters/save", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(saveableCharacter)
        }).then(res => {
            res.json()
            .then(res => {
                // localStorage.setItem("character", saveableCharacter);
                this.setState({ saved: true }, () => setTimeout(() => { this.setState({ saved: false })}, 3000));
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    deleteFromDatabase(uid) {
        fetch("/characters/delete/" + uid, {
            method: "delete"
        })
        .then(res => {
            res.json()
            .then(res => {
                this.props.dispatch(resetCharacter());
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

  render() {
    return (
        <div id="character">
            {this.state.saved && <h5 className="saved">Character data saved!</h5>}
            <div className="btns">
                <button className="save" onClick={() => this.saveToDatabase(this.props.character)}></button>
                <button className="delete" onClick={() => this.deleteFromDatabase(this.props.character.uid)}></button>
            </div>
            <div className="class">
                <h3>{this.props.character.name}</h3>
                <div className="classframe">
                    <img className="frame" src={"/images/classframe/classframe.png"} alt="" />
                    <img className="frame_active" src={"/images/classframe/classframe_active.png"} alt="" />
                    <img className="frame_icon" src={"/images/" + this.props.character.class.icon} alt="" />
                </div>
                <h3>Level {this.props.character.level}</h3>
            </div>
            <h4 className="className">{this.props.character.class.name}</h4>
            <div className="stats">
                <div>
                    <h5>Health</h5>
                    <p>{Math.round(this.props.character.equipment.reduce((previous, current) => previous * current.healthModifier, 1) * this.props.character.class.healthModifier * this.props.settings.baseHealthPerLevel[this.props.character.level-1])}</p>
                </div>
                <div>
                    <h5>{this.props.character.class.resourceType}</h5>
                    <p>{Math.round(this.props.character.equipment.reduce((previous, current) => previous * current.resourceModifier, 1) * this.props.character.class.resourceModifier * this.props.settings.baseResourcesPerLevel[this.props.character.level-1])}</p>
                </div>
                <div>
                    <h5>Damage</h5>
                    <p>{(this.props.character.equipment.reduce((previous, current) => previous * current.damageModifier, 1) * this.props.character.class.damageModifier).toFixed(2)}x</p>
                </div>
                <div>
                    <h5>Healing</h5>
                    <p>{(this.props.character.equipment.reduce((previous, current) => previous * current.healingModifier, 1) * this.props.character.class.healingModifier).toFixed(2)}x</p>
                </div>
            </div>
            <h4 className="spellsHeader">Spells</h4>
            <div className="spells">{this.props.character.spells.map(spell => (
                    <div key={spell.id} className="spell">
                        <div className="spellframe">
                            <img className="frame" src={"/images/spellframe/spellframe.png"} alt="" />
                            <img className="frame_hover" src={"/images/spellframe/spellframe_hover.png"} alt="" />
                            <img className="frame_clicked" src={"/images/spellframe/spellframe_clicked.png"} alt="" />
                            <img className="frame_icon" src={"/images/" + spell.icon} alt="" />
                        </div>
                        <div className="spellDescription">
                            <div>
                                <div>
                                    <p className="spellName">{spell.name}</p>
                                    { spell.resourceCost !== 0 && <p className="resourceCost">{spell.resourceCost} {this.props.character.class.resourceType.toLowerCase()}</p>}
                                </div>
                                <p>Rank {spell.rank}</p>
                            </div>
                            <p>{spell.description}</p>
                        </div>
                        <div className="spellRanks">
                            {spell.rankModifier.map((modifier, index) => <div key={index} className={spell.rank > index ? "learned": "notLearned"}></div>)}
                        </div>
                    </div>
                ))}
            </div>
            <h4 className="equipmentHeader">Equipment</h4>
            <div className="equipment">
                {this.props.character.equipment.length === 0 
                    ? <p>You have not purchased any equipment.</p> 
                    : this.props.character.equipment.map(item => (
                        <div key={item.id} className="item">
                            <div className="header">
                                <div className="spellframe">
                                    <img className="frame" src={"/images/spellframe/spellframe.png"} alt="" />
                                    <img className="frame_hover" src={"/images/spellframe/spellframe_hover.png"} alt="" />
                                    <img className="frame_clicked" src={"/images/spellframe/spellframe_clicked.png"} alt="" />
                                    <img className="frame_icon" src={"/images/" + item.icon} alt="" />
                                </div>
                                <h4>{item.name}</h4>
                            </div>
                            <p className="description">{item.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    character: state.character,
    settings: state.settings,
    accountId: state.accountId
  };
};

export default connect(mapStateToProps)(Character);
