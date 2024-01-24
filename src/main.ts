import "reflect-metadata";

import WebServer from "@/api/main";
import createRouter from "@/api/route";
import { initializeDatabase } from "@/pkg/mongodb";
import logger from "@/pkg/logger";
import { PORT } from "@/config";

const main = async () => {
  try {
    await initializeDatabase();
    logger.info("Database connected");
  } catch (err) {
    logger.error(err.toString());
    process.exit();
  }

  const server = new WebServer(parseInt(PORT));
  const router = await createRouter();
  server.registerRouter(router);
  server.start();
};

main();
