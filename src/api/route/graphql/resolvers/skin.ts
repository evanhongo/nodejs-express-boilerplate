import { injectable, inject } from "inversify";
import { Resolver, Query, Arg, FieldResolver, Root } from "type-graphql";

import { Doll } from "@/model/doll";
import { Skin } from "@/model/skin";
import IDollService from "@/repository/doll/interface";
import ISkinService from "@/repository/skin/interface";

@injectable()
@Resolver((of) => Skin)
export class SkinResolver {
  constructor(
    @inject("IDollService") private dollService: IDollService,
    @inject("ISkinService") private skinService: ISkinService
  ) {}

  @FieldResolver((returns) => Doll)
  async owner(@Root() skin: Skin): Promise<Doll> {
    return this.dollService.findOne({ number: skin.dollNumber });
  }

  @Query((returns) => Skin, { nullable: true })
  async skin(@Arg("id", () => String) id: string) {
    return this.skinService.findOne({ id });
  }
}
