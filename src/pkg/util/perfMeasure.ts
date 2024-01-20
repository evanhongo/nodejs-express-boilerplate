import { performance } from "perf_hooks";

import logger from "@/pkg/logger";

const perfMeasure =
  (indicator: string) =>
  (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      const start = performance.now();
      const result = await originalMethod.apply(this, args);
      const end = performance.now();
      logger.debug(`perf-${indicator} ${end - start}ms`);
      return result;
    };

    return descriptor;
  };

export default perfMeasure;
