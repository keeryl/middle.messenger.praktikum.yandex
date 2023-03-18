import BaseAPI from './BaseAPI';

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


  changeUserAvatar(data: FormData): Promise<unknown> {
    return this.http.put('/profile/avatar', data);
  }

  changeUserPassword(data: PasswordData): Promise<unknown> {
    return this.http.put('/password', data);
  }

  findUser(data: { login: string }): Promise<unknown> {
    return this.http.post('/search', data);
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}

export default new UserAPI();
