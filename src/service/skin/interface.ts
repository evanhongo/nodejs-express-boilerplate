import { Skin, SkinQuery } from "@/model/skin";

export default interface ISkinService {
  find(query: SkinQuery): Promise<Skin[]>;
  findOne(query: SkinQuery): Promise<Skin>;
}
