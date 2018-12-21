import { createServer } from "./Server";
import { createRouter } from "./Router";
import { AuthController } from "./controllers/AuthController";
import { AuthService } from "./services/AuthService";
import { EventService } from "./services/EventService";
import { EventController } from "./controllers/EventController";

async function start() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@localhost";
  const adminPassword = process.env.ADMIN_PASSWORD || "password";
  const privateKey = process.env.PRIVATE_KEY || "secret";

  const credentials = {
    email: adminEmail,
    password: adminPassword
  };

  const authService = new AuthService(credentials, privateKey);
  const authController = new AuthController(authService);

  const eventService = new EventService();
  const eventController = new EventController(eventService);

  const router = createRouter(authController, eventController);
  const server = createServer(router);
  server.listen(8000);
}

start();
