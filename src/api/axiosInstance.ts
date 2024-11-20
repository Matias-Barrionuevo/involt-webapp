import axios, { AxiosError, AxiosResponse } from 'axios';
import { BASE_API_URL } from '@/utils/constants/config';
import { useAuthStore } from '@/modules/Auth/state/auth';

export interface CustomError extends AxiosError {
  problem?: string;
}

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
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const transformAxiosErrorToCustomErrors = (error: AxiosError): CustomError => {
  const customError: CustomError = error;

  if (error.response) {
    const { setToken } = useAuthStore.getState();
    const response = error.response as AxiosResponse;
    customError.problem = response.data.errorCode ?? 'UNKNOWN_ERROR';

    if (response.status === 401) {
      setToken(null);
    }
  } else {
    customError.problem = 'UNKNOWN_ERROR';
  }

  return customError;
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const customError = transformAxiosErrorToCustomErrors(error);
    return Promise.reject(customError);
  }
);

export default axiosInstance;
