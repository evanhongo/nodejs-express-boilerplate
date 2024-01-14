import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

import mongooseInstance from "@/pkg/mongodb";

@ObjectType()
export class User {
  @Field((type) => ID)
  readonly _id: ObjectId;

  @Property({ type: () => String })
  facebookId: string;

  @Property({ type: () => String })
  lineId: string;

  @Field((type) => String)
  @Property({ type: () => String })
  email: string;

  @Field((type) => String)
  @Property({ type: () => String })
  name: string;

  @Property({ type: () => [ObjectId] })
  friendIds: ObjectId[];

  @Field((type) => [User])
  friends: User[];
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { collection: "user" },
  existingMongoose: mongooseInstance
});
