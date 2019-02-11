import React, { Component } from "react";
import { connect } from "react-redux";

import "./champions.css";

class Champions extends Component {
    constructor() {
        super();

        this.state = {
            champions: [],
            sorting: "date"
        }
    }

    componentDidMount() {
        fetch("http://localhost:4000/champions", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "get"
        })
        .then(res => {
            res.json().then(champions => {
                let champs = champions.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
                this.setState({ champions: champs});
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    sort(type) {
        if(this.state.champions.length > 0 && this.state.sorting !== type) {
            let champions = this.state.champions;
            switch(type) {
                case "date":
                    champions.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
                    break;
                case "class":
                    champions.sort((a, b) => (a.class > b.class) ? 1 : ((b.class > a.class) ? -1 : 0));
                    break;
                case "level":
                    champions.sort((a, b) => (a.level > b.level) ? 1 : ((b.level > a.level) ? -1 : 0));
                    break;
                default:
                    break;
            }
            this.setState({ sorting: type });
        }
    }

    render() {
        return (
        <div id="champions">
            <div className="header">
                <h2>Hall of Fame</h2>
                <p>Every once in a while, a hero brave and strong enough to defeat The Beast enters the Arena. Anyone who manages to defeat The Beast will be granted a spot in the Hall of Fame.</p>
            </div>
            <div className="sorting">
                <h4>Sort by</h4>
                <button className={this.state.sorting === "date" ? "active" : null} onClick={() => this.sort("date")}>Kill Date</button>
                <button className={this.state.sorting === "class" ? "active" : null} onClick={() => this.sort("class")}>Class</button>
                <button className={this.state.sorting === "level" ? "active" : null} onClick={() => this.sort("level")}>Level</button>
            </div>
            <ul className="championList">
                <li>
                    <p>Rank</p>
                    <p>Kill Date</p>
                </li>
                {this.state.champions.map((champion, index) => (
                    <li key={index}>
                        <div>
                            <h2 className={index === 0 ? "rank rankOne" : index === 1 ? "rank rankTwo" : index === 2 ? "rank rankThree" : "rank"}>{index+1}</h2>
                            <h4>{champion.name}</h4>
                            {champion.accountId === this.props.accountId && <h4 className="you">(you)</h4>}
                        </div>
                        <div className="secondary">
                            <p>Level {champion.level} <span>{champion.class}</span></p>
                            <p>{champion.date.slice(0, 10)} <span className="divider">/</span> {champion.date.slice(11)}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      accountId: state.accountId
    };
  };
  
  export default connect(mapStateToProps)(Champions);
  
