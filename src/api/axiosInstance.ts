import axios from 'axios';
import { BASE_API_URL } from '@/utils/constants/config';
import { useAuthStore } from '@/modules/Auth/state/auth';

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const transformAxiosErrorToCustomErrors = (error: any) => {
  if (error.response && error.response.data) {
    const response = error.response;
    const problem = response.data.errorCode ?? 'UNKNOWN_ERROR';

    return Promise.reject({ ...error, problem });
  }

  return Promise.reject({ ...error, problem: 'UNKNOWN_ERROR' });
};

axiosInstance.interceptors.response.use(
  (response) => response,
  transformAxiosErrorToCustomErrors
);

export default axiosInstance;
