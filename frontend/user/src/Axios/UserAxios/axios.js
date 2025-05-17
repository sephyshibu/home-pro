import axios from 'axios';
import { persistor, store } from '../../app/store';
import { addtoken } from '../../features/tokenSlice';
import { toast } from 'react-toastify';
// Axios instance
const axiosInstanceuser = axios.create({
    baseURL: import.meta.env.VITE_PORT,
    withCredentials: true,
});
axiosInstanceuser.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.usertoken?.token;
    const user = state.user?.user;
    console.log("user in axios", user);
    console.log("axios token", token);
    console.log("state", state);
    if (typeof token !== 'string') {
        console.error("Token is not a string:", token);
    }
    if (token) {
        console.log("if(token)", token);
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (user && user._id) {
        config.headers['user-id'] = user._id; // 👈 Set userId in headers
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// Response Interceptor
axiosInstanceuser.interceptors.response.use((response) => response, // Forward successful responses
async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
        console.log('401 error detected:', error.response);
        originalRequest._retry = true;
        try {
            console.log('Triggering token refresh...');
            const response = await axiosInstanceuser.post('/refresh', {}, { withCredentials: true });
            const { token } = response.data;
            console.log("response axios ", token);
            store.dispatch(addtoken({ token })); // Update Redux with new token
            axiosInstanceuser.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axiosInstanceuser(originalRequest);
        }
        catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            // store.dispatch(logoutuser());
            toast.error("Session expired. Please login again.");
            await persistor.purge();
            localStorage.removeItem("userId");
            window.location.href = "/login";
            return Promise.reject(refreshError);
        }
    }
    if (error.response?.status === 403) {
        const data = error.response.data;
        console.log("403 Error:", data); // 👈 Add this
        if (data?.action === 'blocked') {
            toast.error(data.message || "You are blocked by admin!");
            localStorage.removeItem('userId');
            await persistor.purge();
            window.location.href = '/login';
            // Optionally: You can logout the user or redirect to login page if needed
        }
    }
    return Promise.reject(error);
});
export default axiosInstanceuser;
