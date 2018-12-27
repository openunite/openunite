import React, { Component } from "react";
import { EventService } from "../../services/event";
import EventList from "../../components/event/EventList";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import EventCalendar from "../../components/event/EventCalendar";
import { withRouter, RouteComponentProps } from "react-router-dom";
import "./EventListPage.scss";

class EventListPage extends Component<RouteComponentProps<any>> {
  state = {
    type: "upcoming",
    events: []
  };

  async componentDidMount() {
    this.fetch();
  }

  async componentDidUpdate() {
    if (
      this.props.match.params.type &&
      this.state.type !== this.props.match.params.type
    ) {
      this.fetch();
    }
  }

  async fetch() {
    const eventService = new EventService();
    const type = this.props.match.params.type || "upcoming";
    const events = await eventService.getEvents(type);
    this.setState({ events, type });
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  render() {
    return (
      <div className="event-list-page">
        <header>
          <Header />
        </header>

        <div className="flex-container wrapper">
          <main>
            {this.state.events.length > 0 ? (
              <div>
                <h1>{this.capitalizeFirstLetter(this.state.type)} Events</h1>
                <EventList events={this.state.events} />
              </div>
            ) : (
              ""
            )}
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

export default withRouter(EventListPage);
