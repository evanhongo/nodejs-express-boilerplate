import { z, ZodInvalidTypeIssue } from "zod";

import ISchema from "@/pkg/schema/interface";

export class PingRequestSchema implements ISchema {
  private schema = z.object({
    hello: z.string().min(1)
  });

  constructor() {
    this.parse = this.parse.bind(this);
  }

  parse(data: unknown = {}) {
    try {
      return this.schema.parse(data);
    } catch (err) {
      const msg = JSON.parse(err.message)
        .map(
          (elem: ZodInvalidTypeIssue) =>
            `${elem.path.join(",")}:${elem.message}`
        )
        .join("\n");
      throw Error(msg);
    }
  }
}
