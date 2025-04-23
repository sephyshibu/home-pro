import axios,{AxiosError,InternalAxiosRequestConfig} from 'axios';
import { store } from './app/store';
import { addtoken } from './features/tokenSlice';
// Axios instance
const axiosInstanceadmin = axios.create({
    baseURL: import.meta.env.VITE_ADMin_PORT,
    withCredentials: true,
  });

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
  }
  axiosInstanceadmin.interceptors.request.use(
    (config: CustomAxiosRequestConfig) => {
      const state = store.getState();
      const token = state.token?.token;

  
      
      console.log("axios token", token);
      console.log("state", state);
  
      if (typeof token !== 'string') {
        console.error("Token is not a string:", token);
      }
  
      if (token) {
        console.log("if(token)", token);
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
)

// Response Interceptor
axiosInstanceadmin.interceptors.response.use(
    (response) => response, // Forward successful responses
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;
  
      if (error.response?.status === 401 && !originalRequest._retry) {
        console.log('401 error detected:', error.response);
        originalRequest._retry = true;
  
        try {
          const response = await axiosInstanceadmin.post<{ token: string }>('/refresh', {}, { withCredentials: true });
          const { token } = response.data;
  
          console.log("response axios ", token);
          store.dispatch(addtoken({ token })); // Update Redux with new token
  
          axiosInstanceadmin.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
  
          return axiosInstanceadmin(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // store.dispatch(logoutuser());
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  export default axiosInstanceadmin