import { buildSchema } from "type-graphql";

import resolvers from "@/controller/graphql/resolvers";
import { ErrorInterceptor } from "@/controller/graphql/middleware";
import container from "@/pkg/di/inversify.config";

export default async function getGraphqlSchema() {
  return await buildSchema({
    validate: { forbidUnknownValues: false },
    resolvers,
    globalMiddlewares: [ErrorInterceptor],
    container
    //emitSchemaFile: path.resolve(__dirname, "../schema", "schema.gql"),
  });
}
