import React, { Component } from "react";
import "./loadCharacter.css";

import { connect } from "react-redux";
import { loadCharacter, resetCharacter } from "../../actions/actions";

import Spell from "../../classes/spell";
import Equipment from "../../classes/equipment";

import settings from "../../states/settings";

class LoadCharacter extends Component {
    constructor() {
        super();

        this.state = {
            characters: [],
            loadingFinished: false,
            errorOccured: false
        }
    }

    componentDidMount() {
        fetch("http://localhost:4000/characters/get/" + this.props.accountId, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "get"
        })
        .then(res => {
            res.json().then(characters => {
                characters = characters.map(character => {
                    character.spells = character.spells.map(spell => {
                        return new Spell(spell);
                    });
                    character.equipment = character.equipment.map(equipment => {
                        return new Equipment(equipment);
                    });
                    return character;
                });

                if(characters.length > 0) {
                    this.setState({ characters, loadingFinished: true, errorOccured: false });
                }
                else {
                    this.setState({ status: "No characters found...", loadingFinished: true, errorOccured: false });
                }
            });
        })
        .catch(err => {
            this.setState({ errorOccured: true });
        });
    }

    deleteFromDatabase(uid, index) {
        fetch("http://localhost:4000/characters/delete/" + uid, {
            method: "delete"
        })
        .then(res => {
            res.json()
            .then(res => {
                if(uid === this.props.character.uid) {
                    this.props.dispatch(resetCharacter());
                }
                else {
                    let newCharacters = [...this.state.characters];
                    newCharacters.splice(index, 1);
                    this.setState({ characters: newCharacters });
                }
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
            <div id="loadCharacter">
                {!this.state.loadingFinished && !this.state.errorOccured && <p>Loading characters...</p>}
                {this.state.errorOccured && <p>An error occured while loading characters...</p>}
                {this.state.status && <p>{this.state.status}</p>}
                {this.state.characters.length > 0 && 
                    <div className="characters">
                        {this.state.characters.map((character, index) => {
                            return (
                                <div className="character" key={character.uid}>
                                    <div>
                                        <div className="classframe">
                                            <img className="frame" src={"/images/classframe/classframe.png"} alt="" />
                                            <img className="frame_active" src={"/images/classframe/classframe_active.png"} alt="" />
                                            <img className="frame_icon" src={"/images/" + character.class.icon} alt="" />
                                        </div>
                                        <div className="name">
                                            <h4>{character.name}</h4>
                                            <p>Level {character.level} <span>{character.class.name}</span></p>
                                        </div>
                                    </div>
                                    <div className="info">
                                        <div className="stats">
                                            <div>
                                                <h5>Health</h5>
                                                <p>{Math.round(character.equipment.reduce((previous, current) => previous * current.healthModifier, 1) * character.class.healthModifier * settings.baseHealthPerLevel[character.level-1])}</p>
                                            </div>
                                            <div>
                                                <h5>{character.class.resourceType}</h5>
                                                <p>{Math.round(character.equipment.reduce((previous, current) => previous * current.resourceModifier, 1) * character.class.resourceModifier * settings.baseResourcesPerLevel[character.level-1])}</p>
                                            </div>
                                            <div>
                                                <h5>Damage</h5>
                                                <p>{(character.equipment.reduce((previous, current) => previous * current.damageModifier, 1) * character.class.damageModifier).toFixed(2)}x</p>
                                            </div>
                                            <div>
                                                <h5>Healing</h5>
                                                <p>{(character.equipment.reduce((previous, current) => previous * current.healingModifier, 1) * character.class.healingModifier).toFixed(2)}x</p>
                                            </div>
                                        </div>
                                        <div className="spells">
                                            {character.spells.map(spell => {
                                                return (
                                                    <div key={spell.id}>
                                                        <h5>{spell.name}</h5>
                                                        <div className="spellRanks">
                                                            {spell.rankModifier.map((modifier, index) => <div key={index} className={spell.rank > index ? "learned": "notLearned"}></div>)}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="actionButtons">
                                        <button className="load" onClick={() => this.props.dispatch(loadCharacter(character))}></button>
                                        <button className="delete" onClick={() => this.deleteFromDatabase(character.uid, index)}></button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    character: state.character,
    accountId: state.accountId
  };
};

export default connect(mapStateToProps)(LoadCharacter);
