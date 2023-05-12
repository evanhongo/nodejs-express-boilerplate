import { NonEmptyArray } from "type-graphql";

import { DollResolver } from "./doll";
import { SkinResolver } from "./skin";
// import { UserResolver } from "./user";

const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  DollResolver,
  SkinResolver
  //UserResolver
];

export default resolvers;
