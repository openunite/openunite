import React, { Component } from 'react';
import { DatePicker } from '@blueprintjs/datetime';

class EventCalendar extends Component {
  state = {
    today: new Date(),
  }

  render() {
    return (
      <DatePicker showActionsBar minDate={this.state.today} defaultValue={this.state.today} />
    );
  }
}

export default EventCalendar;
