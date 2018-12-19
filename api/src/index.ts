import { createServer } from "./Server";

async function start() {
  const server = createServer();
  server.listen(8000);
}

start();
