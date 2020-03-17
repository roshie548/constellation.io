import React from 'react';
import './component/timer.css'; 

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_time: 10,
      elapsed_time: 0,
      active: false
    }
    //this.startTimer.bind(this);
  }

  // startTimer() {
  //   this.active = true
  //   return;
  // }

  // resetTimer() {
  //   this.active = false
  //   return;
  // }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { start_time, elapsed_time, active } = this.state

      if (elapsed_time < start_time) {
        this.setState(({ elapsed_time }) => ({
          elapsed_time: elapsed_time + 1
        }))
      }
      

      else {
        clearInterval(this.myInterval)
      }
      
    }
    , 1000)
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }

  

  render() {
    return (
      <div>

          {this.state.elapsed_time}
          {this.state.start_time}
          <button onClick={this.startTimer} > START </button>
          <button onClick={this.resetTimer} > RESET </button>

      </div>
    );
  }
}

export default Timer;
