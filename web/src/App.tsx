import React, { Component } from "react";
import ScheduleEventPage from "./pages/ScheduleEventPage/ScheduleEventPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import EventListPage from "./pages/EventListPage/EventListPage";
import EventDetailPage from "./pages/EventDetailPage/EventDetailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
          <Switch>
            <Route exact path="/" component={EventListPage} />
            <Route exact path="/schedule" component={ScheduleEventPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route path="/events/:type" component={EventListPage} />
            <Route exact path="/events" component={EventListPage} />
            <Route path="/events/:slug" component={EventDetailPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
