import { AxiosResponse } from 'axios';

export type ServerError = any;

export interface Response<T = unknown> extends AxiosResponse<T> {
  error?: ServerError;
}

export interface ResponseError extends AxiosResponse<ServerError> {}

export interface Created {
  id: string;
}
