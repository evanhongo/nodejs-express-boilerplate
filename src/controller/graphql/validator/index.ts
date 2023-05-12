import { createMethodDecorator } from "type-graphql";
import { schema } from "@/model/paginationInfo";

export const PaginationInfoValidator = () => {
  return createMethodDecorator(async ({ args }, next) => {
    try {
      await schema.parseAsync(args.paginationInfo);
      return next();
    } catch (err) {
      throw Error(err);
    }
  });
};
