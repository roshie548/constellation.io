import React from 'react';
import './component/timer.css'; 

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_time: 0,
      elapsed_time: 0
    }
    this.startTimer.bind(this);
  }

  startTimer() {
    return;
  }
  resetTimer() {
    return;
  }

  render() {
    return (
      <div>
          {this.state.start_time}
          <button onClick={this.startTimer} > START </button>
          <button onClick={this.resetTimer} > RESET </button>

      </div>
    );
  }
}

export default Timer;
