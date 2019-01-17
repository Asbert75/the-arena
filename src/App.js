import React, { Component } from "react";

import Navigation from "./components/navigation/navigation";
import CharacterCreation from "./components/characterCreation/characterCreation";
import Credits from "./components/credits/credits";
import Character from "./components/character/character";
import Arena from "./components/arena/arena";
import Store from "./components/store/store";
import "./App.css";

import { connect } from "react-redux";

import { showCharacterCreation } from "./actions/actions";

class App extends Component {
  render() {
    return (
      <div id="app">
        <Navigation />
        { this.props.showIntroduction && (
          <div className="introduction">
            <h2>Welcome, adventurer!</h2>
            <p>
              This is the arena. A web-based duel system where you can create a
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
        { this.props.showCharacterCreation && <CharacterCreation /> }
        { this.props.showCredits && <Credits /> }
        { this.props.showCharacter && <Character /> }
        { this.props.showArena && <Arena /> }
        { this.props.showStore && <Store /> }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showCharacterCreation: state.showCharacterCreation,
    showCredits: state.showCredits,
    showArena: state.showArena,
    showStore: state.showStore,
    showCharacter: state.showCharacter,
    showIntroduction: state.showIntroduction
  };
};

export default connect(mapStateToProps)(App);
