import { z } from 'zod';

export const CountrySchema = z.object({
  countryCode: z.string().min(1, 'This field is required'),
});

export const AccountSchema = z.object({
  email: z
    .string()
    .min(1, 'This field is required')
    .email('Invalid email address'),
  firstName: z.string().min(1, 'This field is required'),
  lastName: z.string().min(1, 'This field is required'),
});
