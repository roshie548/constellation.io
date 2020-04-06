import React from 'react';
import './component/timer.css';

class Timer extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      startMin: 0,
      startHour: 0,
      min: 0,
      hr: 0,
      active: false,
      myInterval: 0,
      timeSet: false
    }
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  startTimer() {
    this.setState({active: true})
    this.props.activateTimer();
    return;
  }

  resetTimer() {
    const { active, min, hr, timeSet } = this.state
    this.setState(({active, min, hr, timeSet}) => ({
     active: false,
     min: 0,
     hr: 0,
     timeSet: false
   }))

    clearInterval(this.myInterval);
    this.props.deactivateTimer();

    return;
  }



  componentDidMount() {
    console.log(this.state.active);
    this.myInterval = setInterval(() => {
      const { min, hr, active } = this.state
      if (this.state.active) {
        if (min > 0) {
          this.setState(({min}) => ({
            min: min - 1
          }))
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
      }



      // if (min < start_time) {
      //   this.setState(({ min }) => ({
      //     min: min + 1
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


  handleChangeHr = (event) => {
      this.setState({
        
        hr: event.target.value});
      this.props.setHour(event.target.value);
    }
  handleChangeMin = (event) => {
      this.setState({
        
        min: event.target.value});
      this.props.setMin(event.target.value);
    }

  handleSubmit = (event) => {
    this.setState({timeSet: true});
  }

  render() {
    const {min,hr} = this.state;
    if (min===0 && hr===0) {
      this.props.deactivateTimer();
    }
    return (

      <div className="Timer">
      {this.state.timeSet ?

          <div>
            {min === 0 && hr === 0
              ? <h1 className = "time"> Times Up! </h1>
              : <div><h1 className = "time" >Time Remaining:{"\n"}</h1>
              <h1 className="Time">
              {hr}:{min < 10 ? `0${min}` : min} </h1></div>}

              <button onClick = {this.startTimer}> START </button>

              <button onClick = {this.resetTimer}> RESTART </button>
            </div>

        :

        <div>
        <h1> New session</h1>
        <form onSubmit={this.handleSubmit}>
          hr:
           <input type="text" value={this.state.hr} onChange={this.handleChangeHr} />
          min:
          <input type="text" value={this.state.min} onChange={this.handleChangeMin} />
          <input type="submit" value="Submit" />
        </form>
        </div>
      }
        </div>
    );
  }

}

export default Timer;
