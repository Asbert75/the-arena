import React, { Component } from "react";
import { connect } from "react-redux";

import "./navigation.css";

import { showCharacterCreation, showChampions, showArena, showStore, showCharacter } from "../../actions/actions";

class Navigation extends Component {
  render() {
    return (
      <div id="navigation">
        <img className="logo" src={"/images/arena2.png"} alt="" />
        <ul>
          <li className={ this.props.navigation.showCharacterCreation ? "active" : null }>
            <button onClick={() => this.props.dispatch(showCharacterCreation())}>Characters</button>
          </li>
          <li className={ this.props.navigation.showCharacter ? "active" : null }>
            <button onClick={() => this.props.dispatch(showCharacter())} disabled={this.props.characterClass === null}>My Character</button>
          </li>
          <li className={ this.props.navigation.showArena ? "active" : null }>
            <button onClick={() => this.props.dispatch(showArena())} disabled={this.props.characterClass === null}>THE Arena</button>
          </li>
          <li className={ this.props.navigation.showChampions ? "active" : null }>
            <button onClick={() => this.props.dispatch(showChampions())}>Hall of Fame</button>
          </li>
          <li className={ this.props.navigation.showStore ? "active" : null }>
            <button onClick={() => this.props.dispatch(showStore())} disabled={this.props.characterClass === null}>Store</button>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation,
    characterClass: state.character.class
  };
};

export default connect(mapStateToProps)(Navigation);
