import React from 'react';
import "./component/settings.css"
import "./component/weblist.css"

class WebList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div>
        <img className = "X" src={require("./component/delete.png")} onClick={() => this.props.deleteWebsite(this.props.url)} /> {this.props.url}
      </div>
    );
  }



}

export default WebList;
