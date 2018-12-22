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

  async getDetail(ctx: Koa.Context) {
    const event = await this.eventService.findOne(ctx.params.slug);

    if (!event) {
      ctx.status = 404;
      ctx.body = { error: "Event not found" };
      return;
    }

    ctx.body = event;
  }
}

export { EventController };
