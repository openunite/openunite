import React, { Component } from "react";
import { Card } from "@blueprintjs/core";
import { GroupEvent } from "./event-demo";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router-dom";

import "./EventList.scss";

type EventListProps = RouteComponentProps<any> & {
  events: GroupEvent[];
};

class EventList extends Component<EventListProps> {
  constructor(props: any) {
    super(props);
    this.goToEvent = this.goToEvent.bind(this);
  }

  goToEvent(slug: string) {
    this.props.history.push(`/events/${slug}`);
  }

  render() {
    return (
      <div>
        {this.props.events.map((event: GroupEvent) => {
          return (
            <Card
              key={event.id}
              className="eventItem"
              onClick={e => this.goToEvent(event.slug)}
            >
              <span className="date">{event.date.format("dddd, MMMM D")}</span>
              <h5>{event.group.name}</h5>
              <h2>
                <Link to={`/events/${event.slug}`}>{event.title}</Link>
              </h2>
              <p>{event.description}</p>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default withRouter(EventList);
