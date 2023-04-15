import Knex from "knex";
import mysql from "mysql2";

const db = Knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
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
