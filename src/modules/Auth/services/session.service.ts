import axiosInstance from '@/api/axiosInstance';
import { CONSUMER } from '@/utils/constants/config';

const consumer = CONSUMER;
const BASE_AUTH_URL = `/settle/api/settleid/auth/user`;

export const loginUser = ({
  email,
  password,
  token,
}: {
  email: string;
  password: string;
  token?: string;
}) =>
  axiosInstance.post(`${BASE_AUTH_URL}/login`, {
    email,
    password,
    consumer,
    deviceType: 'web',
    ...(token && { token2FA: token }),
  });

export const logoutUser = ({ email }: { email: string }) =>
  axiosInstance.post(`${BASE_AUTH_URL}/logout`, {
    email,
    consumer,
  });
