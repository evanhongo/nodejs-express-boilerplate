import { Skin, SkinQuery } from "@/model/skin";

export default interface ISkinRepo {
  find(query: SkinQuery): Promise<Skin[]>;
  findOne(query: SkinQuery): Promise<Skin>;
}
