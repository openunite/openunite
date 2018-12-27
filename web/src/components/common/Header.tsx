import React, { Component } from "react";
import { Navbar, Popover, Menu, Button } from "@blueprintjs/core";
import {
  Link,
  withRouter,
  RouteComponentProps,
  NavLink
} from "react-router-dom";
import UserService from "../../services/user";
import "./Header.scss";

class Header extends Component<RouteComponentProps<any>> {
  state = {
    user: {
      name: ""
    }
  };

  componentDidMount() {
    const user = UserService.getUser();

    if (user) {
      this.setState({ user });
    }
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
            {this.state.user.name
              ? [
                  <Link
                    key="button"
                    to="/schedule"
                    className="bp3-button bp3-intent-primary"
                  >
                    Schedule an event
                  </Link>,
                  <Navbar.Divider key="divider" />
                ]
              : ""}

            <NavLink
              to="/events"
              className="bp3-button bp3-minimal"
              activeClassName="bp3-active"
            >
              Upcoming Events
            </NavLink>
            <NavLink
              to="/past-events"
              className="bp3-button bp3-minimal"
              activeClassName="bp3-active"
            >
              Past Events
            </NavLink>

            <Navbar.Divider />

            {this.state.user.name ? (
              <Popover>
                <Button minimal icon="user">
                  {this.state.user.name}
                </Button>
                <Menu key="menu">
                  <Link to="/logout" className="bp3-menu-item">
                    Logout
                  </Link>
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

export default withRouter(Header);
