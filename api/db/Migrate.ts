import { createDb, migrate as postgresMigrate } from "postgres-migrations";
import path from "path";

const config = {
  logger: (log: String) => console.log(log) // eslint-disable-line no-console
};

const db = createDb(
  "openunitedb",
  {
    defaultDatabase: "openunitedb",
    user: "openunite_pg_master",
    password: "admin",
    host: "localhost",
    port: 5432
  },
  config
);
export function migrate() {
  const migrationsPath = path.resolve(__dirname, "./migrations/");
  db.then(() => {
    return postgresMigrate(
      {
        database: "openunitedb",
        user: "openunite_pg_master",
        password: "admin",
        host: "localhost",
        port: 5432
      },
      migrationsPath,
      config
    );
  })
    .then(() => {
      console.log("openunitedb migrated finished"); // eslint-disable-line no-console
    })
    .catch((err) => {
      console.log(err); // eslint-disable-line no-console
    });
}

export function reset() {
  // TODO
}
