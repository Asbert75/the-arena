import React, { Component } from "react";
import { connect } from "react-redux";

import "./character.css";

import settings from "../../states/settings";

class Character extends Component {
  render() {
    return (
        <div id="character">
            <div className="class">
                <h3>{this.props.character.champion && "Beastslayer "}{this.props.character.name}</h3>
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
                    <p>{Math.round(this.props.character.equipment.reduce((previous, current) => previous * current.healthModifier, 1) * this.props.character.class.healthModifier * settings.baseHealthPerLevel[this.props.character.level-1])}</p>
                </div>
                <div>
                    <h5>{this.props.character.class.resourceType}</h5>
                    <p>{Math.round(this.props.character.equipment.reduce((previous, current) => previous * current.resourceModifier, 1) * this.props.character.class.resourceModifier * settings.baseResourcesPerLevel[this.props.character.level-1])}</p>
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
                            {spell.secondaryDescription && <p className="secondaryDescription">{spell.secondaryDescription}</p>}
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
    accountId: state.accountId
  };
};

export default connect(mapStateToProps)(Character);
