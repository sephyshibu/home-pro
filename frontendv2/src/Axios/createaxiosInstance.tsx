import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { store } from '../app/store';
import toast from 'react-hot-toast';

interface Options {
  role: 'admin' | 'tech' | 'user';
  baseURL: string;
  tokenSelector: (state: any) => string | undefined;
  userSelector: (state: any) => { _id: string } | null | undefined;
  tokenAction: (payload: { token: string }) => any;
  clearUser: () => any;
  clearToken: () => any;
  idHeaderKey: string;
  localStorageKey: string;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const createAxiosInstance = (options: Options) => {
  const instance = axios.create({
    baseURL: options.baseURL,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config: CustomAxiosRequestConfig) => {
      const state = store.getState();
      const token = options.tokenSelector(state);
      const user = options.userSelector(state);

      if (typeof token === 'string') {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      if (user && user._id) {
        config.headers[options.idHeaderKey] = user._id;
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const res = await instance.post<{ token: string }>('/refresh', {}, { withCredentials: true });
          const { token } = res.data;

          store.dispatch(options.tokenAction({ token }));

          instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          originalRequest.headers['Authorization'] = `Bearer ${token}`;

          return instance(originalRequest);
        } catch (refreshError) {
          toast.error("Session expired. Please login again.");
          store.dispatch(options.clearUser());
          store.dispatch(options.clearToken());
          localStorage.removeItem(options.localStorageKey);
          window.location.href = '/';
          return Promise.reject(refreshError);
        }
      }

      if (error.response?.status === 403) {
        const data = error.response.data as { message: string; action?: string };

        if (data?.action === 'blocked') {
          toast.error(data.message || "You are blocked by admin!");
          store.dispatch(options.clearUser());
          store.dispatch(options.clearToken());
          localStorage.removeItem(options.localStorageKey);
          window.location.href = '/';
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
