import moment from "moment";
import React, { Component } from "react";
import { Button, Label } from "@blueprintjs/core";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { EventService } from "../../services/event";
import "./ScheduleEventPage.scss";

type EventForm = {
  title: string;
  description: string;
  date?: moment.Moment;
};

class ScheduleEventPage extends Component {
  state = {
    form: {
      title: "",
      description: ""
    } as EventForm,
    error: ""
  };

  constructor(props: any) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event: any) {
    event.preventDefault();

    const eventService = new EventService();

    this.state.error = "";

    try {
      const date = this.state.form.date
        ? moment(this.state.form.date)
        : undefined;

      const newEvent = {
        ...this.state.form,
        date: date !== undefined ? date.valueOf() : undefined
      };

      const result = await eventService.create(newEvent);

      this.state.error = result.error || "";

      if (!result.error) {
        // FIXME
        window.location.href = `/events/${result.slug}`;
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.setState(this.state);
    }
  }

  handleChange(event: any) {
    const state: any = this.state;
    state.form[event.target.name] = event.target.value;
    this.setState(state);
  }

  render() {
    return (
      <div>
        <header>
          <Header />
        </header>

        <div className="flex-container wrapper">
          <form className="new-event" onSubmit={this.handleSubmit}>
            <h2>Schedule an event</h2>
            {this.state.error ? (
              <p className="error">Error: {this.state.error}</p>
            ) : (
              ""
            )}
            <p>
              <Label htmlFor="title">Title</Label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={this.handleChange}
                autoFocus
              />
            </p>
            <p>
              <Label htmlFor="date">Date</Label>
              <input
                type="date"
                name="date"
                id="date"
                onChange={this.handleChange}
              />
            </p>
            <p>
              <Label htmlFor="description">Description</Label>
              <input
                type="description"
                name="description"
                id="description"
                onChange={this.handleChange}
              />
            </p>
            <p className="action">
              <Button type="submit" intent="primary" large>
                Create event
              </Button>
            </p>
          </form>
        </div>

        <Footer />
      </div>
    );
  }
}

export default ScheduleEventPage;
