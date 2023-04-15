"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.NODE_ENV = exports.BACKEND_BASE_API_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../config.env") });
exports.BACKEND_BASE_API_URL = process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_API_URL
    : process.env.LOCAL_HOST_API_URL;
exports.NODE_ENV = process.env.NODE_ENV;
exports.PORT = process.env.PORT;
//# sourceMappingURL=config.js.map