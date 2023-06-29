import http from "http";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} from "@apollo/server/plugin/landingPage/default";
import { graphqlUploadExpress } from "graphql-upload";

import buildContext from "./buildContext";
import { Context } from "./context";
import getGraphqlSchema from "./getGraphqlSchema";
import { NODE_ENV } from "@/config";

const createRouter = async () => {
  const schema = await getGraphqlSchema();
  const router = express.Router();
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer<Context>({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault({
            graphRef: "my-graph-id@my-graph-variant",
            footer: false
          })
        : ApolloServerPluginLandingPageLocalDefault({ footer: false })
    ],
    persistedQueries: false
  });

  await apolloServer.start();
  app.use(
    "/",
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => buildContext({ req, res })
    })
  );

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  router.use("/graphql", app);
  return router;
};

export default createRouter;
