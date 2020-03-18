import React from 'react';
import './component/timer.css';

class Timer extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      // start_time_min: 10,
      // start_time_hr: 0,
      min: 10,
      hr: 1,
      active: false
    }
  }

  startTimer = () => {
    this.setState({active: true});
    this.props.block(true);
    return;
  }

  resetTimer = () => {
    this.setState({active: false, min: 0, hr: 0});
    this.props.block(false)
    return;
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { elapsed_time_min, elapsed_time_hr, active } = this.state


      if (min > 0 && this.state.active) {
        this.setState(({min}) => ({
          min: min - 1
        }))
        this.props.updateMinutes(1)

      }

      if (min === 0) {
        if (hr === 0) {
          clearInterval(this.myInterval)
        } else {
          this.setState(({hr}) => ({
            hr: hr - 1,
            min: 59

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
    const {min,hr} = this.state
    return (
      <div>
        {elapsed_time_min === 0 && elapsed_time_hr === 0
          ? <h1 className = "timesUp"> Times Up! </h1>
          : <h1 className = "timeRemaining" >Time Remaining: {elapsed_time_hr}:{elapsed_time_min < 10 ? `0${elapsed_time_min}` : elapsed_time_min}</h1>



          // <button onClick={this.startTimer} > START </button>
          // <button onClick={this.resetTimer} > RESET </button>
      }

      </div>
    );
  }
}

export default Timer;
