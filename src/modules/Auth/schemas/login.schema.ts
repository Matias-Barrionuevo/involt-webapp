import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string({ required_error: 'This field is required' })
    .email('Invalid email'),
  password: z.string().min(1, 'This field is required'),
});
