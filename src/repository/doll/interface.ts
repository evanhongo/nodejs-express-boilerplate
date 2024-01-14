import { Doll, DollQuery } from "@/model/doll";
import { PaginationInfo } from "@/model/paginationInfo";

export default interface IDollRepo {
  find(query: DollQuery, paginationInfo: PaginationInfo): Promise<Doll[]>;
  findOne(query: DollQuery): Promise<Doll>;
}
