import axiosInstance from '@/api/axiosInstance';
import { PASSWORD_URL } from '@/modules/Auth/constants/services.constants';
import { CONSUMER } from '@/utils/constants/config';

const consumer = CONSUMER;

export const recoverPassword = ({ email }: { email: string }) =>
  axiosInstance.patch(`${PASSWORD_URL}/recover`, {
    email,
    consumer,
  });

export const setPassword = ({
  email,
  password,
  verificationCodeHash,
  changePasswordMode,
}: {
  email: string;
  password: string;
  verificationCodeHash: string;
  changePasswordMode: 'password-recovery' | 'sign-up';
}) =>
  axiosInstance.patch(`${PASSWORD_URL}/set`, {
    email,
    password,
    verificationCodeHash,
    changePasswordMode,
    consumer,
  });
