import axiosInstance from '@/api/axiosInstance';
import { CODE_URL } from '@/modules/Auth/constants/services.constants';
import { CONSUMER } from '@/utils/constants/config';

export const validateCode = ({
  email,
  code,
  checkVerificationCodeMode,
}: {
  email: string;
  code: string;
  checkVerificationCodeMode: 'password-recovery';
}) =>
  axiosInstance.post(`${CODE_URL}/validate`, {
    email,
    verificationCodeHash: code,
    checkVerificationCodeMode,
  });

export const sendCode = ({
  email,
  checkVerificationCodeMode,
}: {
  email: string;
  checkVerificationCodeMode: 'password-recovery';
}) =>
  axiosInstance.patch(`${CODE_URL}/send`, {
    email,
    checkVerificationCodeMode,
    consumer: CONSUMER,
  });
