import React, { Component } from "react";
import { ButtonGroup, Button, Divider } from "@blueprintjs/core";
import { Link } from "react-router-dom";

import "./Footer.scss";

class Header extends Component {
  render() {
    return (
      <footer>
        <ButtonGroup>
          <a
            href="https://github.com/openunite/openunite/wiki/Help"
            target="_blank"
            className="bp3-button bp3-minimal"
          >
            Help
          </a>
          <a
            href="https://github.com/openunite/openunite/wiki/About"
            target="_blank"
            className="bp3-button bp3-minimal"
          >
            About
          </a>
          <a
            href="https://github.com/openunite/openunite/wiki/Contribute"
            target="_blank"
            className="bp3-button bp3-minimal"
          >
            Contribute
          </a>
          <a
            href="https://github.com/openunite/openunite"
            target="_blank"
            className="bp3-button bp3-minimal"
          >
            Developers
          </a>
          <Divider />
          <Button minimal disabled>
            Terms
          </Button>
          <Button minimal disabled>
            Privacy
          </Button>
        </ButtonGroup>
        <p>
          Powered by{" "}
          <a href="http://openunite.org" target="_blank">
            OpenUnite
          </a>
        </p>
      </footer>
    );
  }
}

export default Header;
