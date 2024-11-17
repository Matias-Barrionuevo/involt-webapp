import axiosInstance from '@/api/axiosInstance';
import { BASE_APP_URL } from '@/modules/Auth/constants/services.constants';

export const getCountries = async (params: { enabled: boolean }) =>
  axiosInstance.get(`${BASE_APP_URL}/countries`, { params });