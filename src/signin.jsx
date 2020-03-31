/*global chrome*/

import React from 'react';
import uiConfig from './firebase.js'
import * as firebase from "firebase";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import './App.css';

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
    docRef.set({
      username: this.state.value
    });
    console.log(this.state.value);
      event.preventDefault();

  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>

          <input type="submit" value="Submit" />
          </form>

      </div>
    );
  }
}

export default SignInScreen;
