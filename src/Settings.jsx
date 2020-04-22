import React from 'react';
import "./component/settings.css"
import WebList from "./WebList.jsx"
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.displaySettings.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      display: false,
      type_box: ''
    }
  }

  handleChange(event) {
      this.setState({type_box: event.target.value});
    }

  handleSubmit(event) {
      this.props.addWebsite(this.state.type_box);
      event.preventDefault();

  }

  displaySettings = () => { //if they click on the "SETTINGS"  button
    this.setState({display: true});
    return;
  }

  closeSettings = () => {
    this.setState({display: false});
    return;
  }

  render() {
      var webList = this.props.websites ? this.props.websites.map((w) =>
        <WebList deleteWebsite={this.props.deleteWebsite}
                 url={w} />) : null;
      return (
        <div className="Settings">

            <div class = "settingForm">

                <h3> BLOCKED WEBSITES </h3>

                <form className = "websiteForm" onSubmit={this.handleSubmit}>
                  <label>
                  Add website:
                  <input className = "websiteInput" type="text" value={this.state.value} onChange={this.handleChange} />
                  </label>
                <input className = "websiteSubmit" type="submit" value="Submit" />
                </form>

                <div className = "websiteList">
                  {webList}
                </div>

                
            </div>

        </div>
      );
    // }

  }
}

export default Settings;
