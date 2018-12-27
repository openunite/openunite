import React, { Component } from "react";
import { Card } from "@blueprintjs/core";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import "./EventList.scss";

interface EventListProps extends RouteComponentProps<any> {
  events: GroupEvent[];
}

export interface Group {
  id: number;
  name: string;
}

export interface GroupEvent {
  id: number;
  title: string;
  date: any;
  attendees: number;
  description: string;
  slug: string;
  group: Group;
}

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
