import "dotenv/config";
export const BACKEND_BASE_API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_API_URL
    : process.env.LOCAL_HOST_API_URL;

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const HOST = process.env.HOST;
export const USER = process.env.USER;
export const PASSWORD = process.env.PASSWORD;
export const DATABASE = process.env.DATABASE;
