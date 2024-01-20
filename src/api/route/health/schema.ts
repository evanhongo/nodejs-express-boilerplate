import { z } from "zod";

import ISchema from "@/pkg/schema/interface";

export class MetricsRequestSchema implements ISchema {
  private schema = z.object({
    id: z.string()
  });

  constructor() {
    this.parse = this.parse.bind(this);
  }

  parse(data: unknown = {}) {
    return this.schema.parse(data);
  }
}
