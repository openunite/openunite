import ApiService from "./api";
import moment from 'moment';

const EventService = {
  async getEvents() {
    const api = new ApiService();

    let events;
    try {
      events = await api.get("events");
    } catch (err) {
      console.log(err);
      return;
    }

    return events.map((event: any) => ({
      ...event,
      date: moment(event.date)
    }))

  }
};

export default EventService;
