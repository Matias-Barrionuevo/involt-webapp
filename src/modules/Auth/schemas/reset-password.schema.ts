import { z } from 'zod';

export const ResetPasswordSchema = z.object({
  email: z.string().min(1, 'This field is required').email('Invalid email'),
});
