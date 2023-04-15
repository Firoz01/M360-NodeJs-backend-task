"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE = exports.PASSWORD = exports.USER = exports.HOST = exports.PORT = exports.NODE_ENV = exports.BACKEND_BASE_API_URL = void 0;
require("dotenv/config");
exports.BACKEND_BASE_API_URL = process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_API_URL
    : process.env.LOCAL_HOST_API_URL;
exports.NODE_ENV = process.env.NODE_ENV;
exports.PORT = process.env.PORT;
exports.HOST = process.env.HOST;
exports.USER = process.env.USER;
exports.PASSWORD = process.env.PASSWORD;
exports.DATABASE = process.env.DATABASE;
//# sourceMappingURL=config.js.map