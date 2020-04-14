/*global chrome*/

import React from 'react';
import logo from './logo.svg';
import Reward from './Reward.jsx'
import Settings from './Settings.jsx'
import Timer from './Timer.jsx'
import SignInScreen from './signin.jsx'
import uiConfig from './firebase.js'
import * as firebase from "firebase";

import './App.css';

class App extends React.Component {
  constructor() {
  	super();
  	this.state = {
        name: "",
		    elapsedminutes: 0,
        block: false,
        signedIn: false,
        websites: [],
        timerStart: false,
        startMin: 0,
        startHour: 0,
        peppapic: 0
	  }

	this.updateMinutes.bind(this);
  this.blockSites = this.blockSites.bind(this);
  this.block = this.block.bind(this);
  this.unblock = this.unblock.bind(this);

  }

  updateMinutes = (minutes) => {
    console.log("called updatemin" + minutes);
    
  	this.setState({elapsedminutes: this.state.elapsedminutes + minutes}, () => {
      var db = firebase.firestore();
      var docRef = db.collection("users").doc(firebase.auth().currentUser.email)
      docRef.update({
        minutesStudied: this.state.elapsedminutes
      });
      this.updatePhoto(this.state.elapsedminutes);
    });

  }
  

  blockSites = (details) => {
    //return { redirectUrl: "https://www.coolmathgames.com"};
    return { redirectUrl: chrome.runtime.getURL("blocked.html") };
  }

  signIn = () => {
    var db = firebase.firestore();
    var docRef = db.collection("users").doc(firebase.auth().currentUser.email)
    // var userData = db.collection("users").doc(firebase.auth().currentUser.email).data();
    var test = this;
    docRef.get().then(function(doc) {
      test.setState({name: doc.data().name,
                    signedIn: true,
                     elapsedminutes: Number(doc.data().minutesStudied), //i think the data returns it as a string...
                     websites: doc.data().websites});
    });

  }

  activateTimer = () => {
    this.setState({timerStart: true});
    this.block()
  }

  deactivateTimer = () => {
    this.setState({timerStart: false});
    this.unblock()
  }

  removeElementFromList(list,elem) {
      var i = list.indexOf(elem);
      if (i != -1) {
        list.splice(i,1);
      }
      return list;
  };


  deleteWebsite = (w) => {
    this.setState({websites: this.removeElementFromList(this.state.websites, w)}, () => {



    var db = firebase.firestore();
    var docRef = db.collection("users").doc(firebase.auth().currentUser.email)
    docRef.update({
      websites: firebase.firestore.FieldValue.arrayRemove(w)
    });
      }
    );
  }

  block() {
    console.log(this.state.websites);
    chrome.webRequest.onBeforeRequest.addListener(
      this.blockSites,
      {urls: this.makeSiteList()},
      ["blocking"]);
  }
  makeSiteList() {
    const finalList = ["*://*.boogle.com/*"]
    for (const link of this.state.websites) {
      finalList.push("*://*."+link+"/*")
    }

    return finalList;
  }
  unblock() {
    chrome.webRequest.onBeforeRequest.removeListener(this.blockSites);
  }

  addWebsite = (website) => {
    this.setState({websites: this.state.websites.concat([website])}, () =>
      {
        var db = firebase.firestore();
        var docRef = db.collection("users").doc(firebase.auth().currentUser.email)
        console.log(this.state.websites);
        docRef.update({
          websites: this.state.websites
          // websites: firebase.firestore.FieldValue.arrayUnion(website)
        });
      });

  }

  setHour = (startHour) => {
    this.setState({startHour: parseInt(startHour)})
  }

  setMin = (startMin) => {
    this.setState({startMin: parseInt(startMin)})
  }

  setTotalTime = (sessionTime) => { 
    this.setState({totalTimeStudied: this.state.totalTimeStudied + sessionTime}) 
  }


  updatePhoto = (elapsedminutes) => {
    var whichphoto = Math.floor(elapsedminutes / 10);
    if (whichphoto > 7) {
      whichphoto = 7;
    }
    this.setState({peppapic: whichphoto});

  };


  render() {

    if (this.state.signedIn) {
      return (
      <div className="App">
        <header className="App-header">
        <h1> CONSTELLATION.IO  </h1>
          <h2> Welcome {this.state.name}! You have studied for {this.state.elapsedminutes} minutes. </h2>
          <Reward minutes = {this.state.elapsedminutes}
                  startMin = {this.state.startMin}   
                  startHour = {this.state.startHour}
                  peppapic = {this.state.peppapic}/>
          <Timer updateMinutes = {this.updateMinutes}
                  activateTimer = {this.activateTimer}
                  deactivateTimer = {this.deactivateTimer}
                  setHour = {this.setHour}
                  setMin = {this.setMin}
                  startMin = {this.state.startMin}
                  startHour = {this.state.startHour}/>
          <Settings websites = {this.state.websites}
                  deleteWebsite = {this.deleteWebsite}
                  addWebsite={this.addWebsite}
                  setHour = {this.setHour}
                  setMin = {this.setMin}
                  startMin = {this.state.startMin}
                  startHour = {this.state.startHour}/>

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
