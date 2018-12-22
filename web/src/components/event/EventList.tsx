import React, { Component } from "react";
import { Card } from "@blueprintjs/core";
import { GroupEvent } from "./event-demo";

import "./EventList.scss";

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
