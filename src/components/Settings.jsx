import React from 'react';
import "./Timer.css"
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.displaySettings.bind(this);
    this.state = {
      display: false,
      websites: ["facebook.com", "instagram.com"]
    }
  }

  //should add functions to add/delete websites

  displaySettings = () => { //if they click on the "SETTINGS"  button
    this.setState({display: true});
    return;
  }

  closeSettings = () => {
    this.setState({display: false});
    return;
  }

  render() {
    if (!this.state.display) { //display the settings button only
      return (
        <div>
            <button onClick={this.displaySettings}>SETTINGS</button>
        </div>
      );
    }

    else {
      return ( //open the display settings
        <div className="Settings">
            <button onClick={this.closeSettings}>close</button>
            <h3> Blocked Websites </h3>
            {this.state.websites} // need to figure out how to list them?
                                  // also how to add/delete websites
        </div>
      );
    }

  }
}

export default Settings;
