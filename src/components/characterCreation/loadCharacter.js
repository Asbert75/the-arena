import React, { Component } from "react";
import "./loadCharacter.css";

import { connect } from "react-redux";
import { loadCharacter } from "../../actions/actions";

import Spell from "../../classes/spell";
import Equipment from "../../classes/equipment";

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
        fetch("http://localhost:4000/characters/get", {
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
                    this.setState({ errorOccured: true });
                }
            });
        })
        .catch(err => {
            this.setState({ errorOccured: true });
        });
    }

    selectCharacter(character) {
        this.props.dispatch(loadCharacter(character));
    }

    render() {
        return (
            <div id="loadCharacter">
                {!this.state.loadingFinished && !this.state.errorOccured && <p>Loading characters...</p>}
                {this.state.errorOccured && <p>An error occured while loading characters...</p>}
                {this.state.characters.length > 0 && this.state.characters.map(character => {
                    return (
                        <div key={character.uid} onClick={() => this.selectCharacter(character)}>
                            <p>{character.name} L{character.level} {character.coins}C {character.experience} exp</p>
                            <p>{character.class.name}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    character: state.character
  };
};

export default connect(mapStateToProps)(LoadCharacter);
