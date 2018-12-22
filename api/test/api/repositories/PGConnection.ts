import { createConnection } from "typeorm";
export const pgConnection = createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "openunite_pg_master",
  password: "admin",
  database: "openunitedb",
  entities: [__dirname + "/repositories/entities/*.ts"]
});
