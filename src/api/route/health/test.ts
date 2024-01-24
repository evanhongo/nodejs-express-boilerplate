import request from "supertest";
import { Express } from "express";

import WebServer from "@/api/main";
import createRouter from "@/api/route";

describe("POST /health/ping", () => {
  let app: Express;
  beforeAll(async () => {
    const server = new WebServer(6666);
    const router = await createRouter();
    server.registerRouter(router);
    app = server.getServer();
  });

  it("should be status code 200 when passing validation", async () => {
    const res = await request(app)
      .post("/health/ping")
      .send({ hello: "world" });
    expect(res.status).toBe(200);
  });

  it("should be status code 400 when not passing validation(empty string)", async () => {
    const res = await request(app).post("/health/ping").send({ hello: "" });
    expect(res.status).toBe(400);
  });

  it("should be status code 400 when not passing validation(type error)", async () => {
    const res = await request(app).post("/health/ping").send({ hello: 123 });
    expect(res.status).toBe(400);
  });
});
