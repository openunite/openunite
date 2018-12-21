import React, { Component } from "react";
import { EventService } from "../../services/event";
import EventList from "../../components/event/EventList";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import EventCalendar from "../../components/event/EventCalendar";
import "./EventListPage.scss";

class EventListPage extends Component {
  state = {
    pastEvents: [],
    futureEvents: []
  };

  async componentDidMount() {
    const eventService = new EventService();
    const pastEvents = await eventService.getEvents();
    const futureEvents = await eventService.getEvents();

    this.setState({ pastEvents, futureEvents });
  }

  render() {
    return (
      <div className="eventListPage">
        <header>
          <Header />
        </header>

        <div className="flexContainer wrapper">
          <main>
            <h2>Next Events</h2>
            <EventList events={this.state.futureEvents} />
            <h2>Past Events</h2>
            <EventList events={this.state.pastEvents} />
          </main>

          <aside>
            <EventCalendar />
          </aside>
        </div>

        <Footer />
      </div>
    );
  }
}

export default EventListPage;
