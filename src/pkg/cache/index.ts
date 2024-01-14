import ICache from "./interface";

class LocalCache implements ICache {
  private cache: Map<string, string>;

  constructor() {
    this.cache = new Map<string, string>();
  }

  get(key: string): string {
    return this.cache.get(key);
  }

  set(key: string, value: string): void {
    this.cache.set(key, value);
  }
}

export default LocalCache;
