import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';

class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
      return this.api.signin(data);
  }

  async signup(data: SignupData) {
    return this.api.signup(data);
  }

  async fetchUser() {
    const user = await this.api.read();
    store.set('user', user);
  }

  async logout() {
    try {
      await this.api.logout();
      router.go('/signin');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
