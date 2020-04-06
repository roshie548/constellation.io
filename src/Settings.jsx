import React from 'react';
import "./component/settings.css"
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
        <li>{w}</li>) : null;
      return (
        <div className="Settings">
            <img src= 'https://image.flaticon.com/icons/svg/1827/1827870.svg' onClick={this.closeSettings}/>
            <h3> Blocked Websites </h3>
            <form onSubmit={this.handleSubmit}>
              <label>
                Add website:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
              </form>
            {webList}
            <button onClick={this.props.block}> BLOCK </button>
            <button onClick={this.props.unblock}> UNBLOCK </button>
        </div>
      );
    // }

  }
}

export default Settings;
