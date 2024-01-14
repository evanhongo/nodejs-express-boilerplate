import { ObjectType, InputType, Field, ID, Int } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

import { Doll } from "./doll";
import mongooseInstance from "@/pkg/mongodb";

@ObjectType()
export class Skin {
  @Field((type) => ID)
  readonly _id: ObjectId;

  @Property({ type: () => Number })
  dollNumber: number;

  @Field((type) => Doll)
  owner: Doll;

  @Field((type) => String)
  @Property({ type: () => String })
  name: string;

  @Field((type) => [String])
  @Property({ type: () => String })
  tachieUri: string[];

  @Field((type) => String, { nullable: true })
  @Property({ type: () => String })
  themeName: string;
}

@InputType()
export class SkinQuery {
  @Field((type) => String, { nullable: true })
  id?: string;

  @Field((type) => Int, { nullable: true })
  dollNumber?: number;
}

export const SkinModel = getModelForClass(Skin, {
  schemaOptions: { collection: "skin" },
  existingMongoose: mongooseInstance
});
