import ICache from "@/pkg/cache/interface";

const createCache =
  (_cache: ICache) =>
  (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (key: string) {
      let result = _cache.get(key);
      if (result) return result;

      result = await originalMethod.apply(this, key);
      _cache.set(key, result);

      return result;
    };

    return descriptor;
  };

export default createCache;
