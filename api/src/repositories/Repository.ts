abstract class Repository<K, V> {
  abstract save(value: V): Promise<V>;
  abstract get(k: K): Promise<V | undefined>;
  abstract delete(k: K): Promise<boolean>;
  abstract findOne(query: object): Promise<V | undefined>;
  abstract findAll(query: object): Promise<Array<V>>;
}

export default Repository;
