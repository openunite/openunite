import React, { Component } from 'react';
import HomePage from './pages/HomePage/HomePage';
import ScheduleEventPage from './pages/ScheduleEventPage/ScheduleEventPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/schedule" component={ScheduleEventPage} />
          <Route exact path="/my-account" component={ScheduleEventPage} />
          <Route exact path="/help" component={ScheduleEventPage} />
          <Route exact path="/about" component={ScheduleEventPage} />
          <Route exact path="/developers" component={ScheduleEventPage} />
          <Route exact path="/developers/contribute" component={ScheduleEventPage} />
          <Route exact path="/terms" component={ScheduleEventPage} />
          <Route exact path="/privacy" component={ScheduleEventPage} />
        </div>
      </Router>
    );
  }
}

export default App;
