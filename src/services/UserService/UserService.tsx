import ApiClient from 'utils/apiClient';
import { AxiosResponse } from 'axios';
import { Profile } from 'types/user';
import { Created, Response } from 'types';
import { ForgotPasswordValues, RegisterFormValues, ResetPasswordValues } from 'types/auth';

class UserService {
  static register(data: RegisterFormValues): Promise<Response<Profile>> {
    return ApiClient.post<Profile>('/users/register', data);
  }

  static forgotPassword(data: ForgotPasswordValues): Promise<Response<Created>> {
    return ApiClient.post<Created>('/users/forgot/password', data);
  }

  static updatePassword(data: ResetPasswordValues): Promise<Response> {
    return ApiClient.post('/users/forgot/password/update', data);
  }

  static me(): Promise<AxiosResponse<Profile>> {
    return ApiClient.get<Profile>('/users/me');
  }
}

export default UserService;
