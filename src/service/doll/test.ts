import { stubInterface } from "ts-sinon";
import { ObjectId } from "mongodb";

import DollService from "./main";
import { Doll, DollQuery } from "@/model/doll";
import IDollRepo from "@/repository/doll/interface";

describe("Test for DollService", () => {
  const mockedDollRepo = stubInterface<IDollRepo>();
  const svc = new DollService(mockedDollRepo);

  test("it should return the doll given the query {name: 'M4A1'}", async () => {
    const query: DollQuery = { name: "M4A1" };
    const expected: Doll = {
      _id: new ObjectId("5f17f09ad1966ce0496f1234"),
      number: 55,
      name: "M4A1",
      type: "AR",
      level: "4",
      tags: [],
      buildTime: "",
      cv: "test",
      introduction: "test",
      confession: "test",
      avatarUri: "http://example.com/image/01.jpg"
    };
    mockedDollRepo.findOne.resolves(expected);
    const result = await svc.findOne(query);
    expect(result).toMatchObject(expected);
  });
});
