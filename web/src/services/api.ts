import UserService from "./user";

export default class ApiService {
  headers: any = { "Content-Type": "application/json" };

  constructor() {
    const accessToken = UserService.getAccessToken();

    if (accessToken !== null) {
      this.headers.Authentication = `Bearer ${accessToken}`;
    }
  }

  getApiUrl() {
    // FIXME
    return "http://localhost:8000";
  }

  get(endpoint: string, params: string[][] = []): Promise<any> {
    let url = new URL(`${this.getApiUrl()}/${endpoint}`);

    if (params.length > 0) {
      url.search = new URLSearchParams(params).toString();
    }

    return fetch(url.toString(), {
      method: "GET",
      headers: this.headers
    }).then(response => response.json());
  }

  post(endpoint: string, body: any = {}): Promise<any> {
    return fetch(`${this.getApiUrl()}/${endpoint}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body)
    }).then(response => response.json());
  }
}
