import ApiClient from 'utils/apiClient';
import { LoginFormValues } from 'types/auth';
import { Profile, Response, Roles } from 'types';
import AuthHelper from 'utils/authHelper/AuthHelper';
import UserService from '../UserService';

class AuthService {
  static login(credentials: LoginFormValues): Promise<Response<Profile>> {
    return ApiClient.post<Profile>('/auth/login', credentials);
  }

  static async loginAndProfile(credentials: LoginFormValues): Promise<Response<Profile>> {
    const login = await AuthService.login(credentials);
    AuthHelper.setToken(login.headers.authorization);
    const profile = await UserService.me();
    const user = profile.data as Profile;
    user.role = profile.data.roles.reduce(
      (mapper, role) => Object.assign(mapper, { [role.name]: true }),
      {} as Record<Roles, boolean>
    );
    AuthHelper.setUser(profile.data);
    return profile;
  }

  static verify(token: string): Promise<Response> {
    return ApiClient.post(`/token/${token}`);
  }
}

export default AuthService;
