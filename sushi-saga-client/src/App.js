import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      sushis: [],
      sushiIndex: 0,
      eatenSushi: [],
      money: 100
    }
  }

  componentDidMount(){
      fetch(API)
      .then(resp => resp.json())
      .then(sushi => {
        this.setState({
          sushis: sushi
        })
      })
  }

  renderSushi = () => this.state.sushis.slice(this.state.sushiIndex, this.state.sushiIndex + 4)

  moreSushi = () => {
    this.setState({
      sushiIndex: this.state.sushiIndex + 4
    })
  }

  eatSushi = (sushiObj) => {
    if(this.state.money >= sushiObj.price){
      this.setState({
      eatenSushi: [...this.state.eatenSushi, sushiObj],
      money: this.state.money - sushiObj.price
      })
    }
    else{
      alert("You have no more money!")
    }
    }

  render() {
    return (
      <div className="app">
        <SushiContainer 
          sushis={this.renderSushi()}
          moreSushi={this.moreSushi}
          eatSushi={this.eatSushi}
          eatenSushi={this.state.eatenSushi}
        />
        <Table eatenSushi={this.state.eatenSushi} money={this.state.money}/>
      </div>
    );
  }
}

export default App;