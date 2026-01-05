export class Storage {
  static get<T>(key: string, defaultValue: T | null = null) {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      try {
        return JSON.parse(item) as T;
      } catch {
        return item as T;
      }
    } catch {
      return defaultValue;
    }
  }

  static set<T>(key: string, value: T) {
    try {
      if (typeof value === 'string') {
        localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Failed to save to localStorage key "${key}":`, error);
    }
  }

 static remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove from localStorage key "${key}":`, error);
    }
  }
}
