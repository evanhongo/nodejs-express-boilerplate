import { IsNotEmpty } from "class-validator";
import { ObjectType, InputType, Field, ID, Int } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

import { Skin } from "./skin";
import mongooseInstance from "@/pkg/db";

@ObjectType()
class Skill {
  @Field((type) => String)
  @Property({ type: () => String })
  name: string;

  @Field((type) => Int)
  @Property({ type: () => Number })
  initialCD: number;

  @Field((type) => Int)
  @Property({ type: () => Number })
  cd: number;

  @Field((type) => String)
  @Property({ type: () => String })
  description: string;
}

@ObjectType()
class Attribute {
  @Field((type) => Int)
  @Property({ type: () => Number })
  life: number;

  @Field((type) => Int)
  @Property({ type: () => Number })
  damage: number;

  @Field((type) => Int)
  @Property({ type: () => Number })
  hit: number;

  @Field((type) => Int)
  @Property({ type: () => Number })
  flee: number;

  @Field((type) => Int)
  @Property({ type: () => Number })
  aspd: number;

  @Field((type) => Int)
  @Property({ type: () => Number })
  speed: number;
}

@ObjectType()
class Gift {
  @Field((type) => String)
  @Property({ type: () => String })
  range: string;

  @Field((type) => String)
  @Property({ type: () => String })
  description: string;
}

@ObjectType()
export class Doll {
  @Field((type) => ID)
  readonly _id: ObjectId;

  @Field((type) => Int)
  @Property({ type: () => Number })
  number: number;

  @IsNotEmpty()
  @Field((type) => String)
  @Property({ type: () => String })
  name: string;

  @Field((type) => String)
  @Property({ type: () => String })
  type: string;

  @Field((type) => String)
  @Property({ type: () => String })
  level: string;

  @Field((type) => String)
  @Property({ type: () => String })
  team: string;

  @Field((type) => [String])
  @Property({ type: () => [String] })
  tags: string[];

  @Field((type) => String)
  @Property({ type: () => String })
  buildTime: string;

  @Field((type) => String)
  @Property({ type: () => String })
  cv: string;

  @Field((type) => String, { nullable: true })
  @Property({ type: () => String })
  introduction: string;

  @Field((type) => String, { nullable: true })
  @Property({ type: () => String })
  confession: string;

  @Field((type) => String)
  @Property({ type: () => String })
  avatarUri: string;

  @Field((type) => [Skin])
  @Property({ type: () => [Skin], default: [] })
  skins: Skin[];

  @Field((type) => [Skill])
  @Property({ type: () => [Skill], default: [] })
  skills: Skill[];

  @Field((type) => Attribute)
  @Property({ type: () => Attribute })
  attribute: Attribute;

  @Field((type) => Gift)
  @Property({ type: () => Gift })
  gift: Gift;
}

@ObjectType()
class PageInfo {
  @Field((type) => Boolean)
  hasNextPage: boolean;

  @Field((type) => Boolean)
  hasPreviousPage: boolean;
}

@ObjectType()
class DollEdge {
  @Field((type) => Doll)
  node: Doll;

  @Field((type) => Int)
  cursor: number;
}

@ObjectType()
export class DollConnection {
  @Field((type) => [DollEdge])
  edges: DollEdge[];

  @Field((type) => PageInfo)
  pageInfo: PageInfo;
}

@InputType()
export class DollQuery {
  @Field((type) => Int, { nullable: true })
  number?: number;

  @Field((type) => String, { nullable: true })
  type?: string;

  @Field((type) => String, { nullable: true })
  level?: string;

  @Field((type) => String, { nullable: true })
  team?: string;

  @Field((type) => String, { nullable: true })
  name?: string;

  @Field((type) => [String], { nullable: true })
  tags?: string[];
}

export const DollModel = getModelForClass(Doll, {
  schemaOptions: { collection: "doll" },
  existingMongoose: mongooseInstance
});
