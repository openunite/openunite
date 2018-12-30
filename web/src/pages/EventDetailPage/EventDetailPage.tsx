import React, { Component } from "react";
import { EventService } from "../../services/event";
import EventDetail from "../../components/event/EventDetail";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import EventCalendar from "../../components/event/EventCalendar";
import { withRouter, RouteComponentProps } from "react-router-dom";
import "./EventDetailPage.scss";

class EventDetailPage extends Component<RouteComponentProps<any>> {
  state = {
    event: null
  };

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    const eventService = new EventService();
    const event = await eventService.getEventBySlug(
      this.props.match.params.slug
    );

    this.setState({ event });
  }

  render() {
    return (
      <div className="event-detail-page">
        <header>
          <Header />
        </header>

        <div className="flex-container wrapper">
          <main>
            <EventDetail event={this.state.event} />
          </main>

          <aside>
            <EventCalendar event={this.state.event} />
          </aside>
        </div>

        <Footer />
      </div>
    );
  }
}

export default withRouter(EventDetailPage);
