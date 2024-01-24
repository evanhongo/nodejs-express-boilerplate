import express, { Express, Router } from "express";

import logger from "@/pkg/logger";

export default class WebServer {
  port: number;
  private app: Express;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.app
      //Removes the X-Powered-By header, which is set by default in some frameworks
      .disable("x-powered-by")
      // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
      // see https://expressjs.com/en/guide/behind-proxies.html
      .set("trust proxy", 1);
  }

  getServer() {
    return this.app;
  }

  registerRouter(router: Router) {
    this.app.use("/", router);
  }

  start() {
    const server = this.app.listen(this.port, () =>
      logger.info(
        `Server ready at http://localhost:${this.port}, Graphql playground at http://localhost:${this.port}/graphql`
      )
    );

    process.once("SIGINT", function () {
      logger.warn("Caught SIGINT, shutting down.");
      server.close((err) => {
        if (err) {
          logger.error("There is something wrong when shutting down");
          process.exit(1);
        }
        logger.info("Gracefully shut down!");
        process.exit(0);
      });
    });
  }
}
