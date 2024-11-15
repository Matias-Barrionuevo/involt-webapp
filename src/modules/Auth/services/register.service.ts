import axiosInstance from '@/api/axiosInstance';
import { BASE_AUTH_URL } from '@/modules/Auth/constants/services.constants';
import { CONSUMER } from '@/utils/constants/config';

const consumer = CONSUMER;

export const registerUser = ({
  email,
  countryCode,
  refCode,
  kind,
  firstName,
  lastName,
}: {
  email: string;
  countryCode: string;
  refCode?: string;
  kind: 'person' | 'company';
  firstName: string;
  lastName: string;
}) =>
  axiosInstance.post(`${BASE_AUTH_URL}/international-register`, {
    email,
    countryCode,
    consumer,
    kind,
    firstName,
    lastName,
    ...(refCode && { refCode }),
  });
