import ApiService from "./api";
import moment from "moment";

export class EventService {
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

  async create(newEvent: any) {
    const api = new ApiService();

    let result;
    try {
      result = await api.post("events", newEvent);
    } catch (err) {
      console.log(err);
      return;
    }

    return result;
  }
}
