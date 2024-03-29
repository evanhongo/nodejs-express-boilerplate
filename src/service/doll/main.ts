import "reflect-metadata";

import { injectable, inject } from "inversify";

import { DollQuery } from "@/model/doll";
import { PaginationInfo } from "@/model/paginationInfo";
import IDollRepo from "@/repository/doll/interface";
import IDollService from "./interface";

@injectable()
export default class DollService implements IDollService {
  constructor(@inject("IDollRepo") private dollRepo: IDollRepo) {}

  async find(query: DollQuery, paginationInfo: PaginationInfo) {
    return this.dollRepo.find(query, paginationInfo);
  }

  async findOne(query: DollQuery) {
    return this.dollRepo.findOne(query);
  }
}
