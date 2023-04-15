"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const db = (0, knex_1.default)({
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
exports.default = db;
//# sourceMappingURL=database.js.map