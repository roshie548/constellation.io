import React from 'react';
import './component/nav.css'
class NavBar extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return(
        <nav id="menu">
          <a href="https://google.com" className="menu-links"> Home </a>
          <a href="https://google.com" className="menu-links"> Constellation </a>
          <a href="https://google.com" className="menu-links"> Timer </a>
          <a href="https://google.com" className="menu-links"> Settings </a>
        </nav>
      );


    }
}

export default NavBar;
