import { Request, Response, NextFunction } from "express";
import { NODE_ENV } from "../util/config";
import AppError from "../util/appError";

const handleDuplicateFieldsDB = (err: any) => {
  const value = [...err];
  console.log(value);
  const message = `Duplicate fields value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const sendErrorDev = (err: any, req: Request, res: Response) => {
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

const sendErrorProd = (err: any, req: Request, res: Response) => {
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

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("error controller");
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (NODE_ENV === "development") {
    console.log("Node env", NODE_ENV);
    sendErrorDev(err, req, res);
  } else if (NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    if (err.code === "ER_DUP_ENTRY") error = handleDuplicateFieldsDB(err);

    sendErrorProd(error, req, res);
  }
};

export default errorHandler;
