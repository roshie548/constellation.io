import React from 'react';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      display: false,
      websites: []
    }
    this.displaySettings.bind(this);
  }

  displaySettings() {
    this.setState({display: true});
    return;
  }

  render() {
    return (
      <div>
          <button onClick={this.displaySettings}>SETTINGS</button>
      </div>
    );
  }
}

export default Settings;
