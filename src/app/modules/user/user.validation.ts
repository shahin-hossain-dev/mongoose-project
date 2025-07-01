import { z } from 'zod';

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .min(6, { message: 'Minimum password length is 6' })
    .max(20, { message: 'Maximum password length is 20' }),
  needsPasswordChange: z.boolean().optional().default(true),
  role: z.enum(['student', 'faculty', 'enum']),
  status: z.enum(['in-progress', 'blocked']),
  isDeleted: z.boolean().optional().default(false),
});

export const UserValidation = {
  userValidationSchema,
};
