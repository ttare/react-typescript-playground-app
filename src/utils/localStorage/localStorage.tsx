import { LocalStorageKey } from '../../types/localStorage/localStorage';

class LocalStorage {
  static getItem<T>(key: LocalStorageKey): T | null {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value) as T;
    }
    return null;
  }

  static setItem<T = any>(key: LocalStorageKey, value: T | null): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  static removeItem(key: LocalStorageKey): void {
    window.localStorage.removeItem(key);
  }
}

export default LocalStorage;
