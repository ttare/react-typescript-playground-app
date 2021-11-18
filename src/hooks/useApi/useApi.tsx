import { useCallback, useEffect, useState } from 'react';
import { Response, ResponseError, ServerError } from 'types/response';

export type Params = any;
export type Body = any;

type Argument = any;

export type ApiCallType<T = unknown> = (...args: Argument[]) => Promise<Response<T>>;

export type ReturnType<T> = {
  data: T;
  error?: ServerError;
  isLoading: boolean;
  fetch: ApiCallType<T>;
  setData: (data?: T) => void;
};

type Config = {
  params?: Params;
  body?: Body;
  skipOnLoad?: boolean;
};

type State<T> = {
  isLoading: boolean;
  error?: ServerError;
  response?: Response<T>;
};

const useApi = <T extends unknown>(api: ApiCallType<T>, config: Config = {}): ReturnType<T> => {
  const { params, body, skipOnLoad } = config;

  const [state, setState] = useState<State<T>>({
    isLoading: !skipOnLoad,
    error: undefined,
    response: undefined,
  });

  const fetch = useCallback(
    (...args: Argument[]): Promise<Response<T>> => {
      setState(prevState => ({ ...prevState, isLoading: true, error: undefined }));
      return api(...args)
        .then((response: Response<T>) => {
          response.data = response.data || ({} as T);
          setState({ isLoading: false, error: undefined, response });
          return new Promise<Response<T>>(resolve => resolve(response));
        })
        .catch((error: ResponseError | ServerError) => {
          console.error(error);
          setState({ isLoading: false, error, response: undefined });
          return new Promise<Response<T>>(resolve =>
            resolve({
              error,
            } as Response<T>)
          );
        });
    },
    [api]
  );

  const setData = (data?: T): void =>
    setState(prevState => ({
      ...prevState,
      response: { ...prevState.response, data: data ? data : undefined } as Response<T>,
    }));

  useEffect(() => {
    if (!skipOnLoad) {
      fetch(params, body);
    }
  }, [params, body, skipOnLoad]);

  const { response, error, isLoading } = state;
  const data = response?.data || undefined;
  return {
    data: data as T,
    error,
    isLoading,
    fetch,
    setData,
  };
};

export default useApi;
