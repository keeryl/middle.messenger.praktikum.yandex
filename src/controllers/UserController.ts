import API, { UserAPI, AvatarData, PasswordData, ProfileData } from '../api/UserAPI';
import store from '../utils/Store';
import router from '../utils/Router';

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  async changeUserProfileData(data: ProfileData) {
    return this.api.changeUserProfileData(data)
      .then(data => {
        if (data) {
          console.log('Successful', data)
          store.set('user', data);
          return data;
        }
      });
  }

  async changeUserAvatar(data: AvatarData) {
    try {
      const res = await this.api.changeUserAvatar(data);
      console.log(res)
      // store.set('user.avatar', data);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async changeUserPassword(data: PasswordData) {
    try {
      const res = await this.api.changeUserPassword(data);
      console.log(res)

    } catch (e: any) {
      console.error(e.message);
    }
  }

}

export default new UserController();
