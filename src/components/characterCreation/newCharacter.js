import React, { Component } from "react";
import "./newCharacter.css";

import { connect } from "react-redux";
import { setClass } from "../../actions/actions";

import spells from "../../states/spells";
import Spell from "../../classes/spell";

import classes from "../../states/classes";

class NewCharacter extends Component {
    constructor() {
        super();

        this.state = {
            selectedId: 0,
            characterName: "",
            nameError: false,
            spells: []
        }

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    componentDidMount() {
        let spellArray = spells.map(spell => new Spell(spell));
        this.setState({ spells: spellArray });
    }

    selectClass(selectedClass) {
        let spells = this.getAvailableSpells(selectedClass.spells);
        this.props.dispatch(setClass(selectedClass, spells, this.state.characterName, this.props.accountId));
    }

    handleNameChange(event) {
        let reg = /^[a-z]+$/i;
        let name = event.target.value;
        if(name.length < 2) {
            this.setState({ nameError: true});
        }
        else if(name.match(reg)) {
            this.setState({ characterName: name, nameError: false });
        }
        else {
            this.setState({ nameError: true });
        }
    }

    getAvailableSpells(spellList) {
        let availableSpells = [];

        spellList.forEach(availableSpell => {
            this.state.spells.forEach(spell => {
                if(spell.id === availableSpell) {
                    availableSpells.push(spell);
                }
            });
        });

        return availableSpells;
    }

  render() {
    return (
      <div id="newCharacter">
        <h3>ChOOse A Name</h3>
        <div className="characterName">
            <input maxLength="16" type="text" placeholder="Name" onChange={ this.handleNameChange } className={this.state.nameError ? "error" : null} />
            { this.state.nameError && <p className="nameError">Your name must be between 2 and 16 characters and contain only letters.</p> }
        </div>
        <h3 className="classesHeader">Select yOUr Class</h3>
        <div className="classes">
            {classes.map(currentClass => (
                <div key={currentClass.id} className={this.state.selectedId === currentClass.id ? "classframe selected hoverable" : "classframe hoverable"} onClick={() => this.setState({ selectedId: currentClass.id })}>
                    <img className="frame" src={"/images/classframe/classframe.png"} alt="" />
                    <img className="frame_active" src={"/images/classframe/classframe_active.png"} alt="" />
                    <img className="frame_icon" src={"/images/" + currentClass.icon} alt="" />
                </div>
            ))}
        </div>
        <div className="classList">
            {classes.map(currentClass => (
            <div className={ this.state.selectedId === currentClass.id ? "class selected" : "class"} key={currentClass.id}>
                <div className="header">
                <div className="classframe">
                    <img className="frame" src={"/images/classframe/classframe.png"} alt="" />
                    <img className="frame_active" src={"/images/classframe/classframe_active.png"} alt="" />
                    <img className="frame_icon" src={"/images/" + currentClass.icon} alt="" />
                </div>
                    <h3>{currentClass.name}</h3>
                </div>
                <p className="description">{currentClass.description}</p>
                <h4>Spells</h4>
                <div className="spells">
                {this.getAvailableSpells(currentClass.spells).map(spell => (
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
                                    { spell.resourceCost !== 0 && 
                                        <p className="resourceCost">{spell.resourceCost} {currentClass.resourceType.toLowerCase()}</p>
                                    }
                                </div>
                                <p>Rank {spell.rank}</p>
                            </div>
                            <p>{spell.description}</p>
                            {spell.secondaryDescription && <p className="secondaryDescription">{spell.secondaryDescription}</p>}
                        </div>
                    </div>
                ))}
                </div>
                <div className="selectBtnContainer">
                    <button className="selectBtn" onClick={() => this.selectClass(currentClass)} disabled={(this.state.nameError || this.state.characterName.length < 2)}></button>
                    {(this.state.nameError || this.state.characterName.length < 2) && <p className="nameError">You must choose a valid name to continue.</p>}
                </div>
            </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    accountId: state.accountId
  };
};

export default connect(mapStateToProps)(NewCharacter);
