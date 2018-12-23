import Repository from "./Repository";
import { User } from "../models/User";
import { Connection } from "typeorm/connection/Connection";
import { Repository as PGRepository } from "typeorm/repository/Repository";
import { UserDao } from "./entities/UserDao";

abstract class UserRepository extends Repository<string, User> {}

class PGUserRepository implements UserRepository {
  private repository: PGRepository<UserDao>;
  constructor(connection: Connection) {
    this.repository = connection.manager.getRepository(UserDao);
  }
  async save(user: User): Promise<User> {
    let savedUser = await this.repository.save(UserDao.fromUser(user));
    return savedUser.toUser();
  }
  async get(email: string): Promise<User | undefined> {
    return this.findOne({ email });
  }
  async delete(email: string): Promise<boolean> {
    let user = await this.get(email);
    if (!user) {
      return false;
    } else {
      if (!user.id) {
        return false;
      } else {
        let result = await this.repository.delete(user.id);
        return result.affected == 1;
      }
    }
  }

  async findOne(query: object): Promise<User | undefined> {
    let userFoundDao = await this.repository.findOne({ where: query });
    if (!userFoundDao) return undefined;
    else return userFoundDao.toUser();
  }
  async findAll(query: object): Promise<Array<User>> {
    let userDaos = await this.repository.find({ where: query });
    return userDaos.map((userDao) => userDao.toUser());
  }
}

export { UserRepository, PGUserRepository };
