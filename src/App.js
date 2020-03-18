/*global chrome*/

import React from 'react';
import logo from './logo.svg';
import Reward from './Reward.jsx'
import Settings from './Settings.jsx'
import Timer from './Timer.jsx'

import './App.css';

class App extends React.Component {
  constructor() {
  	super();
  	this.state = {
		    elapsedminutes: 0,
        block: false
	  }
	this.updateMinutes.bind(this);
  this.blockSites = this.blockSites.bind(this);
  this.block = this.block.bind(this);


  }
  updateMinutes = (minutes) => {
	this.setState({elapsedminutes: this.state.elapsedminutes + minutes})
	}

  //blockSites = (b) => {
  //  this.setState({block: b})
  //}
  
  blockSites = (details) => {
    return { redirectUrl: "https://www.coolmathgames.com"};
  }

  block() {
    console.log("test")
    chrome.webRequest.onBeforeRequest.addListener(
      this.blockSites,
      {urls: ["https://*/*"]},
      ["blocking"]);
  }
  

  render() {
  	return (
    <div className="App">
      <header className="App-header">
        <Reward minutes = {this.state.elapsedminutes}/>
        <Timer updateMinutes = {this.updateMinutes}/>
        <Settings />
        <button onClick={this.block}> BLOCK </button>
      </header>
    </div>
  );
  }
}


export default App;
