import { Profile } from '../../types/user';
import LocalStorage from '../localStorage/localStorage';
import { LocalStorageKey } from '../../types/localStorage/localStorage';

class AuthHelper {
  private static user: Profile | null = null;

  static getUser(): Profile | null {
    const user = AuthHelper.user;
    if (!user) {
      AuthHelper.user = LocalStorage.getItem<Profile>(LocalStorageKey.USER);
    }
    return AuthHelper.user;
  }

  static setUser(user?: Profile): void {
    if (!user) {
      LocalStorage.removeItem(LocalStorageKey.USER);
      AuthHelper.user = null;
      return;
    }

    LocalStorage.setItem(LocalStorageKey.USER, { ...AuthHelper.user, ...user });
    AuthHelper.user = { ...AuthHelper.user, ...user };
  }

  static getAccessToken(): string {
    const user = AuthHelper.getUser();
    if (user) {
      return user.access_token;
    }
    return '';
  }

  static setToken(access_token: string): void {
    AuthHelper.user = {
      ...AuthHelper.user,
      access_token,
    } as Profile;
  }
}

export default AuthHelper;
