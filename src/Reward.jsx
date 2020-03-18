import React from 'react';
import "./component/reward.css"


class Reward extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <h1> CONSTELLATION.IO  </h1>
          <p>
            you've spent {this.props.minutes} minutes studying!
          </p>
          <button class= "newsesh">NEW SESSION</button>

      </div>
    );
  }
}

export default Reward;
