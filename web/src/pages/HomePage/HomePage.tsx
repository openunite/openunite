import React, { Component } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import EventSearch from "../../components/event/EventSearch";
import EventList from "../../components/event/EventList";
import EventCalendar from "../../components/event/EventCalendar";
import { EventService } from "../../services/event";

import "./HomePage.scss";

class HomePage extends Component {
  state = {
    events: []
  };

  async componentDidMount() {
    const eventService = new EventService();
    const events = await eventService.getEvents();

    if (events) {
      this.setState({ events });
    }
  }

  render() {
    return (
      <div>
        <header>
          <Header />
          
          <div className="hero">
            <div className="wrapper">
              <h1>Explore events nearby</h1>
              <EventSearch />
            </div>
          </div>
        </header>

        <div className="flexContainer wrapper">
          <main>
            <EventList events={this.state.events} />
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

export default HomePage;
