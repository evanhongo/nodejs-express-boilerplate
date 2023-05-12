import { injectable } from "inversify";

import { DollQuery, DollModel } from "@/model/doll";
import { PaginationInfo } from "@/model/paginationInfo";
import IDollRepo from "./interface";

@injectable()
export default class DollRepo implements IDollRepo {
  async find(query: DollQuery, paginationInfo: PaginationInfo) {
    const { first, last, after, before } = paginationInfo;
    const where = {
      ...(query.type ? { type: query.type } : {}),
      ...(query.level ? { level: query.level } : {}),
      ...(query.name
        ? { name: { $regex: `.*${query.name}.*`, $options: "i" } }
        : {}),
      ...(query.tags?.length ? { tags: { $all: query.tags } } : {}),
      number: first
        ? { $gt: after ? after : 0 }
        : { $lt: before ? before : 9999 }
    };

    return DollModel.find(where)
      .limit(first ?? last)
      .sort({ number: first ? "asc" : "desc" });
  }

  async findOne(query: DollQuery) {
    return DollModel.findOne(query);
  }
}
