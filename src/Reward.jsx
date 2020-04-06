import React from 'react';
import "./component/reward.css"



class Reward extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.minutes <= this.props.startMin) {
      return (
        <div>
            <p>
              you've spent {this.props.minutes} minutes studying!
            </p>
            <p><img src={require('./component/reward.png')}/></p>

        </div>
      )

    }
    return (
      <div>
          <p>
            you've spent {this.props.minutes} minutes studying!
          </p>

      </div>
    );
  }
}

export default Reward;
