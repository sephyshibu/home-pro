import axios,{AxiosError,InternalAxiosRequestConfig} from 'axios';
import { store,persistor } from './componenst/app/store';
import { addtoken } from './componenst/features/TokenSlice';
// Axios instance
const axiosInstancetech = axios.create({
    baseURL: import.meta.env.VITE_TECH_PORT,
    withCredentials: true,
  });

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
  }
  axiosInstancetech.interceptors.request.use(
    (config: CustomAxiosRequestConfig) => {
      const state = store.getState();
      const token = state.token?.token;
      const tech = state.tech?.tech;
  
      console.log("tech in axios", tech);
      console.log("axios token", token);
      console.log("state", state);
  
      if (typeof token !== 'string') {
        console.error("Token is not a string:", token);
      }
  
      if (token) {
        console.log("if(token)", token);
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      if (tech && tech._id) {
        config.headers['tech-id'] = tech._id;
      } else {
        const techId = localStorage.getItem("techId");
        if (techId) {
          config.headers['tech-id'] = techId; // Fallback to localStorage if Redux state is empty
        }
      }
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
)

// Response Interceptor
axiosInstancetech.interceptors.response.use(
    (response) => response, // Forward successful responses
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;
  
      if (error.response?.status === 401 && !originalRequest._retry) {
        console.log('401 error detected:', error.response);
        originalRequest._retry = true;
  
        try {
          const response = await axiosInstancetech.post<{ token: string }>('/refresh', {}, { withCredentials: true });
          const { token } = response.data;
  
          console.log("response axios ", token);
          store.dispatch(addtoken({ token })); // Update Redux with new token
  
          axiosInstancetech.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
  
          return axiosInstancetech(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // store.dispatch(logoutuser());
          return Promise.reject(refreshError);
        }
      }
      if (error.response?.status === 403) {
        const data = error.response.data as { message: string; action?: string };
        console.log("403 Error:", data); // 👈 Add this
        if (data?.action === 'blocked') {
         
          localStorage.removeItem('techId')
          await persistor.purge()
          window.location.href = '/'

          // Optionally: You can logout the user or redirect to login page if needed
        }
      }
      return Promise.reject(error);
    }
  );

  export default axiosInstancetech