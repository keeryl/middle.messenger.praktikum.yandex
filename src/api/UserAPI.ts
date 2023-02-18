import BaseAPI from './BaseAPI';

export interface AvatarData {

}

export interface ProfileData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface PasswordData {
  oldPassword: string;
  newPassword: string;
}

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  changeUserProfileData(data: ProfileData): Promise<unknown> {
    return this.http.put('/profile', data);
  }


  changeUserAvatar(data: AvatarData) {
    return this.http.put('/profile/avatar', data);
  }

  changeUserPassword(data: PasswordData) {
    return this.http.put('/profile/password', data);
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}

export default new UserAPI();
