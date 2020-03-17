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
	}
	this.updateMinutes.bind(this);
    

  }
  updateMinutes = (minutes) => {
	this.setState({elapsedminutes: this.state.elapsedminutes + minutes}) 
	}

  render() {
  	return (
    <div className="App">
      <header className="App-header">
        <Reward minutes = {this.state.elapsedminutes}/>
        <Settings />
        <Timer updateMinutes = {this.updateMinutes}/>
      </header>
    </div>
  );
  }
}


export default App;
