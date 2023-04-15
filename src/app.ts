import express, { Request, Response, NextFunction } from "express";

import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import categoryRouter from "./router/categoryRouter";
import productRouter from "./router/productRouter";
import attributeRouter from "./router/attributeRouter";
import errorHandler from "./controller/errorController";
import AppError from "./util/appError";
import { NODE_ENV } from "./util/config";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (NODE_ENV === "development") {
  app.use(morgan(':date[clf] ":method :url"'));
}

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Success" });
});

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/attributes", attributeRouter);
app.use("/api/v1/products", productRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

export default app;
