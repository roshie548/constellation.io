import React from 'react';
import logo from './logo.svg';
import Reward from './components/Reward.jsx'
import Settings from './components/Settings.jsx'
import Timer from './components/Timer.jsx'

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Reward />
        <Settings /> 
      </header>
      <Timer />
    </div>
  );
}

export default App;
