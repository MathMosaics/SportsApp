/**
 * A simple, reusable service for interacting with localStorage with a TTL (Time-To-Live).
 */
interface CacheItem<T> {
  data: T;
  expires: number;
}

const set = <T>(key: string, data: T, ttlMs: number): void => {
  try {
    const item: CacheItem<T> = {
      data,
      expires: Date.now() + ttlMs,
    };
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error(`Error saving to cache [${key}]:`, error);
  }
};

const get = <T>(key: string): T | null => {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item: CacheItem<T> = JSON.parse(itemStr);
    if (Date.now() > item.expires) {
      localStorage.removeItem(key);
      return null;
    }
    return item.data;
  } catch (error) {
    console.error(`Error reading from cache [${key}]:`, error);
    return null;
  }
};

const remove = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from cache [${key}]:`, error);
  }
};

export const cacheService = {
  set,
  get,
  remove,
};
