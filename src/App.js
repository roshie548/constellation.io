/*global chrome*/

import React from 'react';
import logo from './logo.svg';
import Reward from './Reward.jsx'
import Settings from './Settings.jsx'
import Timer from './Timer.jsx'
import SignInScreen from './signin.jsx'
import NavBar from './NavBar.jsx'
import uiConfig from './firebase.js'
import * as firebase from "firebase";
import './component/nav.css';

import ReactDOM from 'react-dom';
import ReactFullpage from '@fullpage/react-fullpage';

import './App.scss';

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
      test.updatePhoto(test.state.elapsedminutes);
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
        <ReactFullpage
          licenseKey = {'D623699B-0CFC4ADE-866A8A39-F381BF3A'}
          scrollingSpeed = {1000}
          navigation
          navigationTooltips = {['Home', 'Rewards', 'Timer', 'Settings']}


          render={({state, fullpageAPI}) => {
            return (
              <ReactFullpage.Wrapper className = "App">
              <nav>
                <a href="#Home" className="menu-links" data-menuanchor="Home"> Home </a>
                <a href="#Rewards" className="menu-links" data-menuanchor="Rewards"> Constellation </a>
                <a href="#Timer" className="menu-links" data-menuanchor="Timer"> Timer </a>
                <a href="#Settings" className="menu-links" data-menuanchor="Settings"> Settings </a>
              </nav>

                <div className = "section">
                    <div id= "small-star"></div>
                    <div id= "medium-star"></div>
                    <div id= "big-star" ></div>
                  <header className="App-header">
                    <h1> constellation.io  </h1>

                    <h2> Welcome {this.state.name}! You have studied for {this.state.elapsedminutes} minutes. </h2>
                  </header>
                </div>

                <div className="section">
                  <Reward minutes = {this.state.elapsedminutes}
                          startMin = {this.state.startMin}
                          startHour = {this.state.startHour}
                          peppapic = {this.state.peppapic}/>
                </div>

                <div className="section">
                  <Timer updateMinutes = {this.updateMinutes}
                          activateTimer = {this.activateTimer}
                          deactivateTimer = {this.deactivateTimer}
                          setHour = {this.setHour}
                          setMin = {this.setMin}
                          startMin = {this.state.startMin}
                          startHour = {this.state.startHour}/>
                </div>

                <div className="section">
                  <Settings websites = {this.state.websites}
                          deleteWebsite = {this.deleteWebsite}
                          addWebsite={this.addWebsite}
                          setHour = {this.setHour}
                          setMin = {this.setMin}
                          startMin = {this.state.startMin}
                          startHour = {this.state.startHour}/>
                </div>
              </ReactFullpage.Wrapper>

            );
          }}
        />
      );

    } else {
        return (
          <div className="App">
            <header className="App-header">
              <div id= "small-star"></div>
              <div id= "medium-star"></div>
              <div id= "big-star" ></div>
              <h1> constellation.io  </h1>
              <SignInScreen signIn = {this.signIn}/>
            </header>
          </div>
        );
    }


  }
}



export default App;
