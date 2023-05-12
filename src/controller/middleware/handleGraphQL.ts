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

import { buildContext } from "@/controller/graphql";
import { Context } from "@/controller/graphql/context";
import getGraphqlSchema from "@/controller/graphql/getGraphqlSchema";
import { NODE_ENV } from "@/config";

const handleGraphQL = async (app: express.Express) => {
  const schema = await getGraphqlSchema();
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
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => buildContext({ req, res })
    })
  );

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
};

export default handleGraphQL;
