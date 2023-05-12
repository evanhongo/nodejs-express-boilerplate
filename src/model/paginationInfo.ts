import { Field, InputType, Int } from "type-graphql";
import { z } from "zod";

@InputType()
export class PaginationInfo {
  @Field((type) => Int, { nullable: true })
  first?: number;

  @Field((type) => Int, { nullable: true })
  last?: number;

  @Field((type) => Int, { nullable: true })
  after?: number;

  @Field((type) => Int, { nullable: true })
  before?: number;
}

export const schema = z.union([
  z
    .object({
      first: z.number(),
      after: z.number().optional()
    })
    .strict(),
  z
    .object({
      last: z.number(),
      before: z.number().optional()
    })
    .strict()
]);
