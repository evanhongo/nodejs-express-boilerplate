import { injectable, inject } from "inversify";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root
} from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";

import { Doll, DollConnection, DollQuery } from "@/model/doll";
import { Skin } from "@/model/skin";
import { PaginationInfo } from "@/model/paginationInfo";
import IDollService from "@/service/doll/interface";
import ISkinService from "@/service/skin/interface";
import { PaginationInfoValidator } from "../validator";

@injectable()
@Resolver((of) => Doll)
export class DollResolver {
  constructor(
    @inject("IDollService") private dollService: IDollService,
    @inject("ISkinService") private skinService: ISkinService
  ) {}

  @FieldResolver((returns) => [Skin])
  async skins(@Root() doll: Doll) {
    return this.skinService.find({ dollNumber: doll.number });
  }

  @Query((returns) => Doll, { nullable: true })
  async doll(@Arg("name", () => String) name: string): Promise<Doll> {
    return this.dollService.findOne({ name });
  }

  @PaginationInfoValidator()
  @Query((returns) => DollConnection, { nullable: true })
  async dolls(
    @Arg("query", () => DollQuery, { nullable: true }) query: DollQuery = {},
    @Arg("paginationInfo", () => PaginationInfo) paginationInfo: PaginationInfo
  ): Promise<DollConnection> {
    let { first, last, after, before } = paginationInfo;
    let res: Doll[];
    if (first)
      res = await this.dollService.find(query, {
        ...paginationInfo,
        first: first + 1
      });
    else
      res = await this.dollService.find(query, {
        ...paginationInfo,
        last: last + 1
      });

    let dollEdges = res.map((doll) => ({ node: doll, cursor: doll.number }));
    const hasPreviousPage = first
      ? after
        ? true
        : false
      : dollEdges.length > last;
    const hasNextPage = first
      ? dollEdges.length > first
      : before
      ? true
      : false;
    dollEdges = first
      ? hasNextPage
        ? dollEdges.slice(0, dollEdges.length - 1)
        : dollEdges
      : hasPreviousPage
      ? dollEdges.reverse().slice(1)
      : dollEdges.reverse();

    return {
      edges: dollEdges,
      pageInfo: {
        hasPreviousPage,
        hasNextPage
      }
    };
  }

  @Mutation((returns) => Boolean, { nullable: true })
  async createDoll(
    @Arg("avatarFile", () => GraphQLUpload, { nullable: true })
    avatarFile: FileUpload
  ) {}
}
