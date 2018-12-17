import React, { Component } from 'react';
import { Navbar } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

import './Header.scss';

class Header extends Component {
  render() {
    return (
      <nav>
        <Navbar fixedToTop>
          <Navbar.Group>
            <Navbar.Heading>
              <Link to="/" className="logo">OpenUnite</Link>
            </Navbar.Heading>
          </Navbar.Group>
          
          <Navbar.Group align="right">
            <Link to="/schedule" className="bp3-button bp3-minimal" style={{ fontWeight: 'bold' }}>Schedule your event</Link>
            <Link to="/" className="bp3-button bp3-minimal">Explore events</Link>
            <Navbar.Divider />
            <Link to="/my-account" className="bp3-button bp3-minimal bp3-icon-user"></Link>
          </Navbar.Group>
        </Navbar>
      </nav>
    );
  }
}

export default Header;
