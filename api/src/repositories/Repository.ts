interface Repository<K, V> {
  save(value: V): Promise<V>;
  get(k: K): Promise<V | undefined>;
  delete(k: K): Promise<boolean>;
  findOne(query: object): Promise<V | undefined>;
  findAll(query: object): Promise<Array<V>>;
}

export default Repository;
