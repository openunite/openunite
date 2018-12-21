import Koa from "koa";
import { EventService } from "../services/EventService";

class EventController {
  private eventService: EventService;

  constructor(eventService: any) {
    this.eventService = eventService;
  }

  async listAll(ctx: Koa.Context) {
    ctx.body = await this.eventService.findAll();
  }
}

export { EventController };
