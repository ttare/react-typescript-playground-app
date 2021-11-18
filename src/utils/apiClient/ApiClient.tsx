import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Response } from 'types/response';
import AuthHelper from '../authHelper/AuthHelper';
import { SetAuthState } from '../../types/auth';

const baseURL = process.env.REACT_APP_BASE_URL;

class ApiClient {
  static client: AxiosInstance;
  static setAuthState: SetAuthState;

  static init(): void {
    const client = axios.create({
      baseURL: baseURL,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const handleError = (error: AxiosError) => {
      if (error.response && 401 === error.response.status) {
        ApiClient.setAuthState && ApiClient.setAuthState(undefined);
      }
      const errorData = error.response?.data || error?.toJSON();
      return Promise.reject(errorData);
    };

    client.interceptors.request.use(config => {
      const token = AuthHelper.getAccessToken();
      if (token && config?.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    }, handleError);

    client.interceptors.response.use(config => config, handleError);

    ApiClient.client = client;
  }

  static get<T = undefined>(url: string, params?: unknown, config?: AxiosRequestConfig): Promise<Response<T>> {
    return ApiClient.client.get<unknown, Response<T>>(url, { ...config, params });
  }

  static post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<Response<T>> {
    console.log('url', url);
    return ApiClient.client.post<unknown, Response<T>>(url, data, config);
  }

  static put<T = unknown>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<Response<T>> {
    return ApiClient.client.put<unknown, Response<T>>(url, data, config);
  }

  static delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<Response<T>> {
    return ApiClient.client.delete<unknown, Response<T>>(url, config);
  }

  static download(url: string): Promise<void> {
    return new Promise(resolve => {
      window.open(ApiClient.client.defaults.baseURL + url);
      return resolve();
    });
  }

  static upload<T = unknown>(formData: FormData, onUploadProgress?: (e: ProgressEvent) => void): Promise<Response<T>> {
    const config = {
      onUploadProgress,
    };
    return ApiClient.post<T>('/files/upload', formData, config);
  }
}

export default ApiClient;
