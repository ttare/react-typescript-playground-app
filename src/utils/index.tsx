export {};

export function updateObject<T>(source: T, object: Partial<T>): T {
  return Object.assign({}, source, object);
}

export function updateItemInArray<T extends { id: number }>(array: T[], objOrCallback: any): T[] {
  return array.map(item => {
    if (typeof objOrCallback === 'function') {
      return objOrCallback(item) as T;
    }
    if ((objOrCallback as T).id === item.id) return objOrCallback;
    return item;
  });
}
