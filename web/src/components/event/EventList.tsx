import React, { Component } from "react";
import { Card } from "@blueprintjs/core";
import "./EventList.scss";

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
  group: Group;
}

interface EventListProps {
  events: GroupEvent[];
}

class EventList extends Component<EventListProps> {
  render() {
    return (
      <div>
        {this.props.events.map((event: GroupEvent) => {
          return (
            <Card key={event.id} className="eventItem">
              <span className="date">{event.date.format("dddd, MMMM M ")}</span>
              <h5>{event.group.name}</h5>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default EventList;
