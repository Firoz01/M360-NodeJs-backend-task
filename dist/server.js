"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
const config_1 = require("./util/config");
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! Shutting Down...");
    console.log(err.name, err.message);
    process.exit(1);
});
const port = process.env.PORT || 5000;
const server = app_1.default.listen(port, () => {
    console.log(`\nServer running on ---> ${config_1.BACKEND_BASE_API_URL}\n`);
});
process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! Shutting Down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=server.js.map