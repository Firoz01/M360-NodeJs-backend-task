import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../config.env") });

export const BACKEND_BASE_API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_API_URL
    : process.env.LOCAL_HOST_API_URL;

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
