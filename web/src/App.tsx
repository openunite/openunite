import React, { Component } from "react";
import HomePage from "./pages/HomePage/HomePage";
import ScheduleEventPage from "./pages/ScheduleEventPage/ScheduleEventPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import EventPage from "./pages/EventPage/EventPage";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/schedule" component={ScheduleEventPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/events" component={EventPage} />
        </div>
      </Router>
    );
  }
}

export default App;
