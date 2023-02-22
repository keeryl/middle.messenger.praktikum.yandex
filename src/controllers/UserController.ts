import API, { UserAPI, PasswordData, ProfileData } from '../api/UserAPI';
import store from '../utils/Store';

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  async changeUserProfileData(data: ProfileData) {
    return this.api.changeUserProfileData(data)
      .then(data => {
        if (data) {
          store.set('user', data);
          return data;
        }
      });
  }

  async changeUserAvatar(data: FormData) {
    return this.api.changeUserAvatar(data)
    .then(data => {
      if (data) {
        store.set('user', data);
        return data;
      }
    });
  }

  async changeUserPassword(data: PasswordData) {
    return this.api.changeUserPassword(data);
  }

}

export default new UserController();
