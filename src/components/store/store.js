import React, { Component } from "react";
import { connect } from "react-redux";

import "./store.css";

import { upgradeSpell, purchaseItem } from "../../actions/actions";

import equipment from "../../states/equipment";
import Equipment from "../../classes/equipment";
import Spell from "../../classes/spell";

class Store extends Component {
    constructor(props) {
        super(props);

        this.state = {
            view: "equipment",
            equipment: []
        }
    }

    componentDidMount() {
        let equipmentArray;
        equipmentArray = equipment.map(equipment => new Equipment(equipment));

        this.setState({ equipment: equipmentArray });
    }

    characterHasItem(itemId) {
        return this.props.character.equipment.find(item => item.id === itemId);
    }

    render() {
        return (
            <div id="store">
            <div className="sidebar">
                <h3>Shop {this.state.view === "spells" ? "Spells" : "Equipment"}</h3>
                <div>
                    <img className="coin" src="/images/icons/coin.png" alt=""/>
                    <p>{this.props.character.coins}</p>
                </div>
                <button className={this.state.view === "equipment" ? "active equipmentBtn" : "equipmentBtn"} onClick={() => { this.setState({ view: "equipment" })}}></button>
                <button className={this.state.view === "spells" ? "active spellsBtn" : "spellsBtn"} onClick={() => { this.setState({ view: "spells"})}}></button>
            </div>
            { this.state.view === "equipment" && <div className="items">
                {this.state.equipment.sort((a, b) => (a.requiredLevel > b.requiredLevel) ? 1 : ((b.requiredLevel > a.requiredLevel) ? -1 : 0)).map(item => {
                    if(item.availableClasses.includes(this.props.character.class.id)) {
                        return (<div key={item.id} className={this.characterHasItem(item.id) ? "itemContainer owned" : "itemContainer"}>
                            <div>
                                <div className="header">
                                    <div className="spellframe">
                                        <img className="frame" src={"/images/spellframe/spellframe.png"} alt="" />
                                        <img className="frame_hover" src={"/images/spellframe/spellframe_hover.png"} alt="" />
                                        <img className="frame_clicked" src={"/images/spellframe/spellframe_clicked.png"} alt="" />
                                        <img className="frame_icon" src={"/images/" + item.icon} alt="" />
                                    </div>
                                    <h4>{item.name}</h4>
                                </div>
                                <p className="description">{this.characterHasItem(item.id) ? "You already own this item." : item.description}</p>
                            </div>
                            <div className={this.props.character.level < item.requiredLevel || this.props.character.coins < item.cost ? "buyItem disabled" : "buyItem"}>
                                <div className="itemInfo">
                                    <p className={this.props.character.level < item.requiredLevel ? "lowLevel" : null}>Level {item.requiredLevel}+</p>
                                    <h5 className="coinContainer">Cost: <img className="coin" src="/images/icons/coin.png" alt=""/> <span className={this.props.character.coins < item.cost ? "lowCoins" : null}>{item.cost}</span></h5>
                                </div>
                                <button className="buyBtn" onClick={() => {
                                    if(!this.characterHasItem(item)) {
                                        this.props.dispatch(purchaseItem(item, this.props.accountId));
                                }}}></button>
                            </div>
                        </div>)
                    } else {
                        return null;
                    }
                })}
            </div>}
            { this.state.view === "spells" && <div className="spells">
                {this.props.character.spells.map((spell, index) => {
                    let storeSpell = new Spell(spell.properties);

                    if(storeSpell.rank < 3) {
                        storeSpell.rank = (storeSpell.rank + 1);
                    }

                    return (
                        <div key={storeSpell.id} className={spell.rank === 3 ? "spellContainer owned" : "spellContainer"}>
                            <div>
                                <div className="header">
                                    <div className="spellframe">
                                        <img className="frame" src={"/images/spellframe/spellframe.png"} alt="" />
                                        <img className="frame_hover" src={"/images/spellframe/spellframe_hover.png"} alt="" />
                                        <img className="frame_clicked" src={"/images/spellframe/spellframe_clicked.png"} alt="" />
                                        <img className="frame_icon" src={"/images/" + storeSpell.icon} alt="" />
                                    </div>
                                    <h4>{storeSpell.name}</h4>
                                </div>
                                <p className="description">{spell.rank === 3 ? "You have already upgraded this spell to the highest rank.": storeSpell.description}</p>
                                {storeSpell.secondaryDescription && <p className="secondaryDescription">{storeSpell.secondaryDescription}</p>}
                            </div>
                            <div className={this.props.character.coins < (100*storeSpell.rank) ? "buyItem disabled" : "buyItem"}>
                                <div className="itemInfo">
                                    { spell.rank === 3 ? <p>Max Rank</p> : <p>Buy Rank {storeSpell.rank} / 3</p> }
                                    <h5 className="coinContainer">Cost: <img className="coin" src="/images/icons/coin.png" alt=""/> <span className={this.props.character.coins < (100*storeSpell.rank) ? "lowCoins" : null}>{100*(storeSpell.rank)}</span></h5>
                                </div>
                                <button className="upgradeBtn" onClick={() => {
                                    if(spell.rank < 3) {
                                        this.props.dispatch(upgradeSpell(index, (100*storeSpell.rank), storeSpell.properties, this.props.accountId));
                                    }
                                }}></button>
                            </div>
                        </div>
                    )
                })}
            </div>}
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    character: state.character,
    equipment: state.equipment,
    spells: state.spells,
    accountId: state.accountId
  };
};

export default connect(mapStateToProps)(Store);
