import StorageService from "./storage";
import jwtDecode from "jwt-decode";
import ApiService from "./api";

interface Credentials {
  email: string;
  password: string;
}

interface User {
  name: string;
  accessToken: string;
}

const storageService = new StorageService();

const UserService = {
  setUser(user: User) {
    storageService.set("user", user);
  },

  getUser(): User | null {
    return storageService.get("user");
  },

  getAccessToken(): string | null {
    const user = this.getUser();

    if (user) {
      return user.accessToken;
    }

    return null;
  },

  setAccessToken(token: string) {
    const result: any = jwtDecode(token);
    const user: User = {
      name: result.name,
      accessToken: token
    };

    this.setUser(user);
  },

  async login(credentials: Credentials) {
    const api = new ApiService();

    try {
      const result = await api.post("login", credentials);

      if (result.token) {
        this.setAccessToken(result.token);
      }

      return result;
    } catch (err) {
      console.log(err);
    }
  },

  logout() {
    storageService.remove("user");
  }
};

export default UserService;
