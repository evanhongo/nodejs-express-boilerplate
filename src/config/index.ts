import dotenv from "dotenv";

dotenv.config(/*{path: path.resolve(process.cwd(),".env")}*/).parsed ?? {};
export const LOG_LEVEL = process.env.LOG_LEVEL ?? "debug";
export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const PORT = process.env.PORT ?? "4000";
export const DB_URL =
  process.env.DB_URL ?? "mongodb://localhost:27017/girls-frontline";
export const JWT_SECRET = process.env.JWT_SECRET ?? "just_some_secret";
export const APOLLO_GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === process.env.APOLLO_GRAPHQL_ENDPOINT ??
  `http://localhost:${PORT}/graphql`;
export const APOLLO_WEBSOCKET_ENDPOINT =
  process.env.APOLLO_WEBSOCKET_ENDPOINT ??
  `http://localhost:${PORT}/subscriptions`;
