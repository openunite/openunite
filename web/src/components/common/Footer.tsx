import React, { Component } from 'react';
import { ButtonGroup, Divider} from '@blueprintjs/core';
import { Link } from 'react-router-dom';

import './Footer.scss';

class Header extends Component {
  render() {
    return (
      <footer>
        <ButtonGroup>
          <Link to="/help" className="bp3-button bp3-minimal">Help</Link>
          <Link to="/about" className="bp3-button bp3-minimal">About OpenUnite</Link>
          <Link to="/developers/contribute" className="bp3-button bp3-minimal">Contribute to the project</Link>
          <Link to="/developers" className="bp3-button bp3-minimal">Developers</Link>
          <Divider />
          <Link to="/terms" className="bp3-button bp3-minimal">Terms</Link>
          <Link to="/privacy" className="bp3-button bp3-minimal">Privacy</Link>
        </ButtonGroup>
        <p>Powered by <a href="http://openunite.org" target="_blank">OpenUnite</a></p>
      </footer>
    );
  }
}

export default Header;
