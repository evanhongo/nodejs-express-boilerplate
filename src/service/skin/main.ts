import { injectable, inject } from "inversify";

import { SkinQuery } from "@/model/skin";
import ISkinRepo from "@/repository/skin/interface";
import ISkinService from "./interface";

@injectable()
export default class SkinService implements ISkinService {
  constructor(@inject("ISkinRepo") private skinRepo: ISkinRepo) {}

  async find(query: SkinQuery) {
    return this.skinRepo.find(query);
  }

  async findOne(query: SkinQuery) {
    return this.skinRepo.findOne(query);
  }
}
