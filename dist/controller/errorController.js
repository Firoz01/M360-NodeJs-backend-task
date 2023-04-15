"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../util/config");
const appError_1 = __importDefault(require("../util/appError"));
const handleDuplicateFieldsDB = (err) => {
    const value = [...err];
    console.log(value);
    const message = `Duplicate fields value: ${value}. Please use another value!`;
    return new appError_1.default(message, 400);
};
const sendErrorDev = (err, req, res) => {
    // A) API
    if (req.originalUrl.startsWith("/api")) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            name: err.name,
            stack: err.stack,
        });
    }
};
const sendErrorProd = (err, req, res) => {
    // A) API
    if (req.originalUrl.startsWith("/api")) {
        // a) Operational, trusted error: send message to client
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
        // b) Programming or other unknown error: don't leak error details
        // 1) Log Error
        console.error("ERROR 🔥", err);
        // 2) Send generic message
        return res.status(500).json({
            status: err.status,
            message: err.message,
        });
    }
};
const errorHandler = (err, req, res, next) => {
    console.log("error controller");
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (config_1.NODE_ENV === "development") {
        console.log("Node env", config_1.NODE_ENV);
        sendErrorDev(err, req, res);
    }
    else if (config_1.NODE_ENV === "production") {
        let error = { ...err };
        error.message = err.message;
        if (err.code === "ER_DUP_ENTRY")
            error = handleDuplicateFieldsDB(err);
        sendErrorProd(error, req, res);
    }
};
exports.default = errorHandler;
//# sourceMappingURL=errorController.js.map