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
        block: false,
        signedIn: false,
        websites: [],
        startMin: 0,
        startHour: 0,
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
    return { redirectUrl: chrome.runtime.getURL("blocked.html") };
  }

  signIn = () => {
    this.setState({signedIn: true});
  }

  block() {
    chrome.webRequest.onBeforeRequest.addListener(
      this.blockSites,
      {urls: this.makeSiteList()},
      ["blocking"]);
  }
  makeSiteList() {
    const finalList = []
    const webList = ["facebook.com", "poptropica.com", "neopets.com"]
    for (const link of webList) {
      finalList.push("*://*."+link+"/*")
    }
    
    return finalList;
  }

  unblock() {
    chrome.webRequest.onBeforeRequest.removeListener(this.blockSites);
  }

  addWebsite = (website) => {
    this.setState({websites: this.state.websites.concat([website])});
  }

  setHour = (startHour) => {
    this.setState({startHour: startHour})
  }

  setMin = (startMin) => {
    this.setState({startMin: startMin})
  }


  render() {
    if (this.state.signedIn) {
      return (
      <div className="App">
        <header className="App-header">
        <h1> CONSTELLATION.IO  </h1>

          <Reward minutes = {this.state.elapsedminutes}
                  startMin = {this.state.startMin}
                  startHour = {this.state.startHour}/>{"\n"}
          <Timer updateMinutes = {this.updateMinutes}
                  setHour = {this.setHour}
                  setMin = {this.setMin}
                  startMin = {this.state.startMin}
                  startHour = {this.state.startHour}/>
          <Settings addWebsite={this.addWebsite}
                    block={this.block}
                    unblock={this.unblock}/>

        </header>
      </div>
    );
  } else {
    return  (
    <div className="App">
      <header className="App-header">
      <h1> CONSTELLATION.IO  </h1>
      <SignInScreen signIn = {this.signIn}/>
      </header>
    </div>
  );
  }


  }
}


export default App;
