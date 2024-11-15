import { z } from 'zod';

const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*#.!@$%^&(){}[\]:;<>,.?\\/~_+\-=|]).{10,32}$/;

export const setPasswordSchema = z
  .object({
    email: z
      .string({ required_error: 'This field is required' })
      .email('Invalid email'),
    changePasswordMode: z.enum(['password-recovery', 'sign-up']),
    verificationCodeHash: z.string(),
    password: z
      .string()
      .min(10, 'Password must be at least 10 characters long')
      .max(32, 'Password must be at most 32 characters long')
      .regex(passwordRegex, 'Check your password'),
    newPassword: z
      .string()
      .min(10, 'Password must be at least 10 characters long')
      .max(32, 'Password must be at most 32 characters long')
      .regex(passwordRegex, 'Check your password'),
  })
  .refine((data) => data.newPassword === data.password, {
    path: ['newPassword'],
    message: 'Passwords do not match',
  });
