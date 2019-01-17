import React, { Component } from "react";
import { connect } from "react-redux";

import "./navigation.css";

import { showCharacterCreation, showCredits, showArena, showStore, showCharacter } from "../../actions/actions";

class Navigation extends Component {
  render() {
    return (
      <div id="navigation">
        <img className="logo" src={"/images/arena.png"} alt="" />
        <ul>
          <li className={ this.props.showCharacterCreation ? "active" : null }>
            <button onClick={() => this.props.dispatch(showCharacterCreation())}>New Character</button>
          </li>
          <li className={ this.props.showCharacter ? "active" : null }>
            <button onClick={() => this.props.dispatch(showCharacter())} disabled={this.props.characterClass === null}>My Character</button>
          </li>
          <li className={ this.props.showArena ? "active" : null }>
            <button onClick={() => this.props.dispatch(showArena())} disabled={this.props.characterClass === null}>Into The Arena</button>
          </li>
          <li className={ this.props.showStore ? "active" : null }>
            <button onClick={() => this.props.dispatch(showStore())} disabled={this.props.characterClass === null}>Store</button>
          </li>
          <li className={ this.props.showCredits ? "active" : null }>
            <button onClick={() => this.props.dispatch(showCredits())}>Credits</button>
          </li>
        </ul>
        <div className="border" />
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
    characterClass: state.character.class
  };
};

export default connect(mapStateToProps)(Navigation);
