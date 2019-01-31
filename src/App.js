import React, { Component } from "react";

import Navigation from "./components/navigation/navigation";
import CharacterCreation from "./components/characterCreation/characterCreation";
import Credits from "./components/credits/credits";
import Character from "./components/character/character";
import Arena from "./components/arena/arena";
import Store from "./components/store/store";
import "./App.css";

import { connect } from "react-redux";

import { showCharacterCreation, loadCharacter, setAccountId } from "./actions/actions";
import Spell from "./classes/spell";
import Equipment from "./classes/equipment";

class App extends Component {
    storageAvailable(type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage.length !== 0;
        }
    }

    getCachedCharacter() {
        let cachedCharacter = JSON.parse(localStorage.getItem("character"));
        if(cachedCharacter) {
            cachedCharacter.spells = cachedCharacter.spells.map(spell => new Spell(spell));
            cachedCharacter.equipment = cachedCharacter.equipment.map(equipment => new Equipment(equipment));
            this.props.dispatch(loadCharacter(cachedCharacter, true));
        }
    }

    componentDidMount() {
        if(this.storageAvailable('localStorage')) {
            this.getCachedCharacter();

            let accountId = localStorage.getItem("accountId");
            if(!accountId) {
                this.props.dispatch(setAccountId());
            }
            else {
                this.props.dispatch(setAccountId(accountId));
            }
        }
    }

    render() {
        return (
            <div id="app">
                <Navigation />
                { this.props.navigation.showIntroduction && (
                    <div className="introduction">
                        <h2>Welcome, adventurer!</h2>
                        <p>
                        This is the arena. A web-based fighting game where you can create a
                        character and use it to fight enemies in one-versus-one combat. Shall
                        you win, you will be rewarded with experience points as well as
                        coins, which you can use to purchase upgraded spells and
                        abilities.
                        <br />
                        <br />
                        Ready to create your character? 
                        </p>
                        <div>
                            <button className="createBtn" onClick={() => this.props.dispatch(showCharacterCreation())}></button>
                        </div>
                    </div>
                )}
                { this.props.navigation.showCharacterCreation && <CharacterCreation /> }
                { this.props.navigation.showCredits && <Credits /> }
                { this.props.navigation.showCharacter && <Character /> }
                { this.props.navigation.showArena && <Arena /> }
                { this.props.navigation.showStore && <Store /> }
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation,
    character: state.character
  };
};

export default connect(mapStateToProps)(App);
