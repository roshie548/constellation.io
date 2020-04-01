/*global chrome*/

import React from 'react';
import logo from './logo.svg';
import Reward from './Reward.jsx'
import Settings from './Settings.jsx'
import Timer from './Timer.jsx'
import SignInScreen from './signin.jsx'
import uiConfig from './firebase.js'
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
  this.unblock = this.unblock.bind(this);


  }
  updateMinutes = (minutes) => {
	this.setState({elapsedminutes: this.state.elapsedminutes + minutes})
  }

  blockSites = (details) => {
    //return { redirectUrl: "https://www.coolmathgames.com"};
    return { redirectUrl: chrome.runtime.getURL("blocked.html") };
  }

  block() {
    chrome.webRequest.onBeforeRequest.addListener(
      this.blockSites,
      {urls: ["https://*/*"]},
      ["blocking"]);
  }

  unblock() {
    chrome.webRequest.onBeforeRequest.removeListener(this.blockSites);
  }


  render() {
  	return (
    <div className="App">
      <header className="App-header">
      <h1> CONSTELLATION.IO  </h1>

      <SignInScreen />
        <Reward minutes = {this.state.elapsedminutes}/>
        <Timer updateMinutes = {this.updateMinutes}/>
        <Settings />
        <button onClick={this.block}> BLOCK </button>
        <button onClick={this.unblock}> UNBLOCK </button>
      </header>
    </div>
  );
  }
}


export default App;
