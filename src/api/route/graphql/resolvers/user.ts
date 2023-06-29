import {
  Resolver,
  FieldResolver,
  UseMiddleware,
  Query,
  Mutation,
  Root,
  Arg,
  Ctx,
  ID
} from "type-graphql";
import { User } from "@/model/user";
import { Context } from "../context";
import { Authenticater } from "../middleware";
@Resolver((of) => User)
export class UserResolver {
  // @FieldResolver((returns) => [User])
  // async friends(
  //   @Root() user: User,
  //   @Ctx() { dataloader }: Context
  // ): Promise<User[]> {
  //   return; //dataloader.userDataloader.loadMany(user.friendIds);
  // }

  @Query((returns) => User, { nullable: true })
  me(@Ctx() { req }: Context) {
    return req.session["user"];
  }

  // @Query((returns) => User, { nullable: true })
  // async user(
  //   @Arg("id", (type) => ID) id: ObjectID,
  //   @Ctx() { dataloader }: Context
  // ) {

  // }

  @Mutation((returns) => Boolean)
  async login(
    //@Arg("email", (type) => String) email: string,
    //@Arg("password", (type) => String) password: string,
    @Ctx() { req, res }: Context
  ) {
    req.session["user"] = {
      id: "5f33e7e26e2eafa438baf35f",
      name: "Evan",
      email: "123@gmail.com"
    };
    return true;
  }

  @Mutation((returns) => Boolean)
  async logout(@Ctx() { req, res }: Context) {
    req.session.destroy(() => {});
    return true;
  }
}
