import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserService from "../../services/user";

class LogoutPage extends Component {
  componentDidMount() {
    UserService.logout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default LogoutPage;
