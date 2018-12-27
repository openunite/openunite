import React, { Component } from "react";
import { DatePicker } from "@blueprintjs/datetime";
import { GroupEvent } from "./EventList";
import moment from "moment";

type EventCalendarProps = {
  event?: GroupEvent | null;
};

class EventCalendar extends Component<EventCalendarProps> {
  state = {
    defaultDate: moment(),
    minDate: moment(),
    maxDate: null,
    showActionsBar: true
  };

  componentDidUpdate(prevProps: any) {
    if (this.props.event && prevProps.event !== this.props.event) {
      this.setState({
        defaultDate: this.props.event.date,
        minDate: this.props.event.date,
        maxDate: this.props.event.date,
        showActionsBar: false
      });
    }
  }

  toDate(momentDate: any) {
    if (momentDate) {
      return momentDate.toDate();
    }
  }

  render() {
    return (
      <DatePicker
        showActionsBar={this.state.showActionsBar}
        minDate={this.toDate(this.state.minDate)}
        maxDate={this.toDate(this.state.maxDate)}
        value={this.toDate(this.state.defaultDate)}
      />
    );
  }
}

export default EventCalendar;
