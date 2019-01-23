import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User, Role } from "../../models/User";

@Entity({ name: "openunite.users" })
export class UserDao {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  email!: string;
  @Column()
  password!: string;
  @Column()
  password_salt?: string;
  @Column()
  role!: string;
  @Column()
  created_at!: Date;
  @Column()
  profile_name!: string;
  @Column()
  profile_gender?: string;
  @Column()
  profile_location?: string;
  @Column()
  profile_picture_url?: string;
  @Column()
  profile_bio?: string;

  toUser(): User {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      passwordSalt: this.password_salt,
      role: (<any>Role)[this.role],
      createdAt: this.created_at,
      profile: {
        name: this.profile_name,
        gender: this.profile_gender,
        location: this.profile_location,
        pictureURL: this.profile_picture_url,
        bio: this.profile_bio
      }
    };
  }

  static fromUser(user: User): UserDao {
    let userDao = new UserDao();
    userDao.id = user.id;
    userDao.email = user.email;
    userDao.created_at = user.createdAt;
    userDao.password = user.password;
    userDao.password_salt = user.passwordSalt;
    userDao.role = Role[user.role];
    userDao.profile_name = user.profile.name;
    userDao.profile_location = user.profile.location;
    userDao.profile_gender = user.profile.gender;
    userDao.profile_picture_url = user.profile.pictureURL;
    userDao.profile_bio = user.profile.bio;
    return userDao;
  }
}
