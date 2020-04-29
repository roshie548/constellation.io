import React from 'react';
import "./component/reward.css"

//Peppa is worth X minutes, when we start 1 session and do 50 min. When you reach threshold youre finished, increments of 10.

class Reward extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: 0,
      images: ["peppa1.png", "peppa2.png", "peppa3.png","peppa4.png","peppa5.png","peppa6.png","peppa7.png", "peppa8.png"]
    }
  }

  render() {
      return (
        <div className = "rewards">
            <p><img src=   {require('./component/rewards/' + this.props.imageList[this.props.imageNum])} className = {"Peppapics"} /></p>
        </div>
      )
    
  }
}

export default Reward;
