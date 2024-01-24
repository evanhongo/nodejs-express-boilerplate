import { z } from "zod";

import ISchema from "@/pkg/schema/interface";

export class PingRequestSchema implements ISchema {
  private schema = z.object({
    hello: z.string().min(1)
  });

  constructor() {
    this.parse = this.parse.bind(this);
  }

  parse(data: unknown = {}) {
    return this.schema.parse(data);
  }
}
