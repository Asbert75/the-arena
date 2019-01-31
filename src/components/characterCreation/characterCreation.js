import React, { Component } from "react";
import "./characterCreation.css";

import { connect } from "react-redux";

import NewCharacter from "./newCharacter";
import LoadCharacter from "./loadCharacter";

class CharacterCreation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            view: "",
            refresh: this.props.refresh
        }
    }

    componentWillUpdate(nextProps) {
        // Forcing update when clicking "New Character" in navigation to refresh and set view to 0 again
        if(nextProps.refresh !== this.props.refresh) {
            this.setState({ view: "" });
        }
    }

    render() {
        return (
            <div id="characterCreation">
                {this.state.view === "" && 
                <div className="select">
                <div onClick={() => this.setState({ view: "CREATE" })}><h3>Create New</h3></div>
                <div className="or"><h1>OR</h1></div>
                <div onClick={() => this.setState({ view: "SAVED" })}><h3>Load Existing</h3></div>
                </div>
                }
                {this.state.view === "CREATE" && <NewCharacter />}
                {this.state.view === "SAVED" && <LoadCharacter />}
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    classes: state.classes,
    spells: state.spells,
    refresh: state.navigation.refresh,
  };
};

export default connect(mapStateToProps)(CharacterCreation);
