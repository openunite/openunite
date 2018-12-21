import React, { Component } from 'react';
import { Card } from '@blueprintjs/core';
import EventService from "../../services/event";
import { GroupEvent } from './event-demo';

import './EventList.scss';

class EventList extends Component {
  state = {
    events: [],
  }

  async componentDidMount() {
    const events = await EventService.getEvents();

    console.log(events);
    if (events) {
      this.setState({ events });
    }
  }

  render() {
    return (
      <div>
        {this.state.events.map((event: GroupEvent) => {
          return (
            <Card key={event.id} className="eventItem">
              <span className="date">{event.date.format('dddd, MMMM M ')}</span>
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
