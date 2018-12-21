import React, { Component } from "react";
import { Navbar, Popover, Menu, Button } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import UserService from "../../services/user";

import "./Header.scss";

class Header extends Component {
  state = {
    user: {
      name: ""
    }
  };

  componentDidMount() {
    const user = UserService.getUser();

    if (user) {
      this.setState({
        user
      });
    }
  }

  logout() {
    UserService.logout();
    window.location.href = "/";
  }

  render() {
    return (
      <nav>
        <Navbar fixedToTop>
          <Navbar.Group>
            <Navbar.Heading>
              <Link to="/" className="logo">
                OpenUnite
              </Link>
            </Navbar.Heading>
          </Navbar.Group>

          <Navbar.Group align="right">
            <Link
              to="/schedule"
              className="bp3-button bp3-minimal"
              style={{ fontWeight: "bold" }}
            >
              Schedule your event
            </Link>
            <Link to="/" className="bp3-button bp3-minimal">
              Explore events
            </Link>
            <Navbar.Divider />
            {this.state.user.name ? (
              <Popover>
                <Button minimal icon="user">
                  {this.state.user.name}
                </Button>
                <Menu key="menu">
                  <Menu.Item text="Logout" onClick={this.logout} />
                </Menu>
              </Popover>
            ) : (
              <Link to="/login" className="bp3-button bp3-minimal">
                Log in
              </Link>
            )}
          </Navbar.Group>
        </Navbar>
      </nav>
    );
  }
}

export default Header;
