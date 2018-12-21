class StorageService {
  static exceptedValues: any[] = [
    undefined,
    Infinity,
    -Infinity,
  ];

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }

  set(key: string, value: any): boolean {
    const exceptedValues = StorageService.exceptedValues;

    if (
      typeof value === 'number' && isNaN(value)
      || typeof value === 'symbol'
      || exceptedValues.some(val => val === value)
    ) {
      return false;
    }

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
