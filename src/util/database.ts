import Knex from "knex";
import { DATABASE, HOST, PASSWORD, USER } from "./config";

const db = Knex({
  client: "mysql2",
  connection: {
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
  },
  migrations: {
    directory: "./src/db/migrations",
  },
});

db.raw("SELECT 1")
  .then(() => {
    console.log("MySQL connected!");
  })
  .catch((err) => {
    console.error("MySQL connection failed:", err);
  });

export default db;
