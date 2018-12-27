import {
  createDb,
  migrate as postgresMigrate,
  MigrateDBConfig
} from "postgres-migrations";
import path from "path";

const config = {
  logger: (log: String) => console.log(log) // eslint-disable-line no-console
};

const defaultDbProperties = {
  database: "openunitedb",
  user: "openunite_pg_master",
  password: "admin",
  host: "localhost",
  port: 5432
};
export async function migrate(
  connectionProps: MigrateDBConfig = defaultDbProperties
): Promise<void> {
  try {
    await createDb("openunitedb", connectionProps, config);
    const migrationsPath = path.resolve(__dirname, "./migrations/");
    await postgresMigrate(connectionProps, migrationsPath, config);
    return console.log("openunitedb migrated finished"); // eslint-disable-line no-console
  } catch (err) {
    console.log("migration failed"); // eslint-disable-line no-console
    console.error(err); // eslint-disable-line no-console
  }
}

export function reset() {
  // TODO
}
