import React from 'react';
import "./component/reward.css"



class Reward extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.minutes >= 10) {
      return (
        <div>
            <p>
              you've spent {this.props.minutes} minutes studying!
            </p>
            <img src={require('./component/reward.png')}/>

            <button class= "newsesh">NEW SESSION</button>

        </div>
      )

    }
    return (
      <div>
          <p>
            you've spent {this.props.minutes} minutes studying!
          </p>
          <button class= "newsesh">NEW SESSION</button>

      </div>
    );
  }
}

export default Reward;
