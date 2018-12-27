import React, { Component } from "react";
import { Card } from "@blueprintjs/core";
import { GroupEvent } from "./EventList";
import { withRouter, RouteComponentProps } from "react-router-dom";
import moment from "moment";

import "./EventDetail.scss";

interface EventDetailProps extends RouteComponentProps<any> {
  event: GroupEvent | null;
}

class EventDetail extends Component<EventDetailProps> {
  state = {
    event: {
      id: null,
      title: null,
      slug: null,
      date: moment(),
      attendees: null,
      description: null,
      group: {
        id: null,
        name: null
      }
    }
  };

  constructor(props: any) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    if (this.props.event) {
      this.setState({ event: this.props.event });
    }
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.event !== this.props.event) {
      this.setState({ event: this.props.event });
    }
  }

  goBack(e: any) {
    e.preventDefault();
    this.props.history.go(-2);
  }

  render() {
    return (
      <div className="event-detail-item">
        <h3>
          <a onClick={this.goBack}>&laquo; Events</a>
        </h3>
        <h1>{this.state.event.title}</h1>

        <Card>
          <span className="date">
            {this.state.event.date.format("dddd, MMMM D")}
          </span>
          <p>{this.state.event.description}</p>
        </Card>
      </div>
    );
  }
}

export default withRouter(EventDetail);
