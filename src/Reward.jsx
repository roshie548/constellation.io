import React from 'react';
import "./component/reward.css"



class Reward extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: 7,
      images: ["peppa1.png", "peppa2.png", "peppa3.png","peppa4.png","peppa5.png","peppa6.png","peppa7.png", "peppa8.png"]
    }
  }

  render() {
      return (
        <div>
            <p>
              you've spent {this.props.minutes} minutes studying!
            </p>
            <p><img src={require('./component/rewards/' + this.state.images[this.state.interval])}/></p>
        </div>
      )
    
  }
}

export default Reward;
