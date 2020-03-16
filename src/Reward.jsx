import React from 'react';
import "./component/reward.css"

class Reward extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
          <h1> CONSTELLATION.IO  </h1>
          <p>
            you've spent 100 minutes studying!
          </p>
          <button>NEW SESSION</button>

      </div>
    );
  }
}

export default Reward;
