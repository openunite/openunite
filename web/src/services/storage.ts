class StorageService {
  get(key: string): any {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }

  set(key: string, value: any): boolean {
    localStorage.setItem(key, JSON.stringify(value));

    return true;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
};

export default StorageService;
