import Koa from "koa";
import Joi from "joi";
import { EventService } from "../services/EventService";

const EventSchema = Joi.object()
  .options({ presence: "required" })
  .keys({
    slug: Joi.string()
      .optional()
      .regex(/[a-zA-Z0-9-]{6}/),
    title: Joi.string().max(100),
    date: Joi.date()
      .timestamp()
      .min(1514764800000),
    description: Joi.string()
  });

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

  async create(ctx: Koa.Context) {
    try {
      await Joi.validate(ctx.request.body, EventSchema);
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        error:
          (error.details && error.details[0] && error.details[0].message) ||
          error.message
      };
      return;
    }

    const result = await this.eventService.insert(ctx.request.body);

    ctx.body = result;
    ctx.status = 201;
  }
}

export { EventController };
