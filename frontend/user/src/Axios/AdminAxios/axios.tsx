import axios,{AxiosError,InternalAxiosRequestConfig} from 'axios';
import { persistor, store } from '../../app/store';
import { addadmintoken } from '../../features/AdmintokenSlice';
import toast from 'react-hot-toast';
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
      const token = state.admintoken?.token;
      const admin=state.admin?.admin
      console.log("Token being sent in asdmin:", token);


  
      console.log("admin in axios", admin);
      console.log("admin axios token", token);
      console.log("admin state", state);
  
      if (typeof token !== 'string') {
        console.error("Token is not a string:", token);
      }
  
      if (token) {
        console.log("if(token)", token);
        config.headers['Authorization'] = `Bearer ${token}`;
      }

       if (admin && admin._id) {
        config.headers['admin-id'] = admin._id;
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
           console.log('Triggering token refresh...');
          const response = await axiosInstanceadmin.post<{ token: string }>('/refresh', {}, { withCredentials: true });
          const { token } = response.data;
  
          console.log("response axios ", token);
          store.dispatch(addadmintoken({ token })); // Update Redux with new token
  
          axiosInstanceadmin.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
  
          return axiosInstanceadmin(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // store.dispatch(logoutuser());
          toast.error("Session expired. Please login again.");
          await persistor.purge();
          localStorage.removeItem("techId");
          window.location.href = '/';
          return Promise.reject(refreshError);
        }
      }
       if (error.response?.status === 403) {
        const data = error.response.data as { message: string; action?: string };
        console.log("403 Error:", data); // 👈 Add this
        if (data?.action === 'blocked') {
          toast.error(data.message || "You are blocked by admin!");
          localStorage.removeItem('adminId')
          await persistor.purge()
          window.location.href = '/'

          // Optionally: You can logout the user or redirect to login page if needed
        }
      }
      return Promise.reject(error);
    }
  );

  export default axiosInstanceadmin