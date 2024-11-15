import { z } from 'zod';

export const VerifyEmailSchema = z.object({
  code: z.string().min(4, 'this field is required'),
  checkVerificationCodeMode: z.enum(['password-recovery', 'sign-up']),
  email: z.string(),
});
