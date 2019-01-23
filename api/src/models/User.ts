enum Role {
  Owner,
  User,
  Anonymous
}
interface UserProfile {
  name: string;
  gender?: string;
  location?: string;
  pictureURL?: string;
  bio?: string;
}
interface User {
  id?: number;
  email: string;
  password: string;
  passwordSalt?: string;
  role: Role;
  profile: UserProfile;
  createdAt: Date;
}

export { User, UserProfile, Role };
