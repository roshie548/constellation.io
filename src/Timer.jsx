import React from 'react';
import './component/timer.css'; 

class Timer extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      // start_time_min: 10,
      // start_time_hr: 0,
      elapsed_time_min: 10,
      elapsed_time_hr: 1,
      active: false,
      myInterval: 0
    }
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  startTimer() {
    this.active = true
    return;
  }

  resetTimer() {
    const { active, elapsed_time_min, elapsed_time_hr } = this.state
    this.setState(({active, elapsed_time_min, elapsed_time_hr}) => ({
     active: false,
     elapsed_time_min: 0,
     elapsed_time_hr: 0
   }))
   
    clearInterval(this.myInterval)
    return;
  }

  

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { elapsed_time_min, elapsed_time_hr, active } = this.state
    

      if (elapsed_time_min > 0) {
        this.setState(({elapsed_time_min}) => ({
          elapsed_time_min: elapsed_time_min - 1
        }))
      }

      if (elapsed_time_min === 0) {
        if (elapsed_time_hr === 0) {
          clearInterval(this.myInterval)
        } else {
          this.setState(({elapsed_time_hr}) => ({
            elapsed_time_hr: elapsed_time_hr - 1,
            elapsed_time_min: 59

          }))
        }
      }
      this.props.updateMinutes(1)

      // if (elapsed_time_min < start_time) {
      //   this.setState(({ elapsed_time_min }) => ({
      //     elapsed_time_min: elapsed_time_min + 1
      //   }))
      // }
      
      // else {
      //   clearInterval(this.myInterval)
      // }
      
    }
    , 1000)
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }

  

  render() {
    const {elapsed_time_min,elapsed_time_hr} = this.state
    return (
      <div>
        <button onClick = {this.resetTimer}> CLEAR </button>
        {elapsed_time_min === 0 && elapsed_time_hr === 0 
          ? <h1 className = "time"> Times Up! </h1>
          : <h1 className = "time" >Time Remaining: {elapsed_time_hr}:{elapsed_time_min < 10 ? `0${elapsed_time_min}` : elapsed_time_min}</h1>
          
          
          
          // <button onClick={this.startTimer} > START </button>
          // <button onClick={this.resetTimer} > RESET </button>
      }

      </div>
    );
  }
}

export default Timer;

