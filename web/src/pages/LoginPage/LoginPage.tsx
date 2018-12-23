import React, { Component } from "react";
import { Button, Label } from "@blueprintjs/core";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import UserService from "../../services/user";
import { withRouter, RouteComponentProps } from "react-router-dom";
import "./LoginPage.scss";

class LoginPage extends Component<RouteComponentProps<any>> {
  state = {
    form: {
      email: "",
      password: ""
    },
    error: ""
  };

  constructor(props: any) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event: any) {
    event.preventDefault();
    this.state.error = "";

    try {
      const result = await UserService.login(this.state.form);

      if (result.error) {
        const state: any = this.state;
        state.error = result.error;
        this.setState(state);
      } else {
        this.props.history.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  }

  handleChange(event: any) {
    const state: any = this.state;
    state.form[event.target.name] = event.target.value;
    this.setState(state);
  }

  render() {
    return (
      <div>
        <header>
          <Header />
        </header>

        <div className="flexContainer wrapper">
          <form className="login" onSubmit={this.handleSubmit}>
            <h2>Log in</h2>
            {this.state.error ? (
              <p className="error">Error: {this.state.error}</p>
            ) : (
              ""
            )}
            <p>
              <Label htmlFor="email">Email</Label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={this.handleChange}
              />
            </p>
            <p>
              <Label htmlFor="password">Password</Label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={this.handleChange}
              />
            </p>
            <p className="action">
              <Button type="submit" intent="primary" large>
                Log in
              </Button>
            </p>
          </form>
        </div>

        <Footer />
      </div>
    );
  }
}

export default withRouter(LoginPage);
