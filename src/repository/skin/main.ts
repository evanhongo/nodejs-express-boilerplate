import { injectable } from "inversify";

import { SkinQuery, SkinModel } from "@/model/skin";
import ISkinRepo from "./interface";

@injectable()
export default class SkinRepo implements ISkinRepo {
  async findOne(query: SkinQuery) {
    return SkinModel.findOne(query);
  }

  async find(query: SkinQuery) {
    return SkinModel.find(query);
  }
}
