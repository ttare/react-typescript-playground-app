import { Profile } from '../user';

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface RegisterFormValues extends LoginFormValues {
  name: string;
  email: string;
  verifyPassword: string;
}

export type ForgotPasswordValues = {
  email: string;
};

export type ResetPasswordValues = {
  password: string;
  verifyPassword: string;
  token: string;
};

export interface Token {
  access_token: string;
}

export type SetAuthState = (user?: Profile) => void;

export type AuthState = {
  user: Profile;
  setAuthState: SetAuthState;
};
