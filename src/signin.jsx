/*global chrome*/

import React from 'react';
import uiConfig from './firebase.js'
import * as firebase from "firebase";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import './App.scss';

var db = firebase.firestore();
const docRef = db.doc("users/username");


class SignInScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    }


  handleChange(event) {
      this.setState({value: event.target.value});
    }

  handleSubmit(event) {
    const entry = this.state.value
    const userDoc = db.collection("users").doc(firebase.auth().currentUser.email)
    userDoc.get()
      .then(docSnapshot => {
        if (!(docSnapshot.exists)) {
          userDoc.set({
            name: entry,
            websites: ["facebook.com"],
            minutesStudied: 0
          });
        }
      });
    this.props.signIn();
    console.log(this.state.value);
    this.setState({value: ""});

    event.preventDefault();


  }
  render() {
    return (
      <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>

        <form className = "nameForm" onSubmit={this.handleSubmit}>

          {/* <label>

            Name:

            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label> */}
          <input type="submit" value="Are You Ready to Study!" />
          </form>

      </div>
    );
  }
}

export default SignInScreen;
