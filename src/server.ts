import app from "./app";
import "dotenv/config";

import { BACKEND_BASE_API_URL, PORT } from "./util/config";

process.on("uncaughtException", (err: Error) => {
  console.log("UNCAUGHT EXCEPTION! Shutting Down...");
  console.log(err.name, err.message);

  process.exit(1);
});


const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`\nServer running on ---> ${BACKEND_BASE_API_URL}\n`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION! Shutting Down...");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
