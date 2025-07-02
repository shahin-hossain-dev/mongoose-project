import { z } from 'zod';

const userValidationSchema = z.object({
  // id: z.string(), এটা backend থেকে handle হবে
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .min(6, { message: 'Minimum password length is 6' })
    .max(20, { message: 'Maximum password length is 20' }),
  // needsPasswordChange: z.boolean().optional().default(true), //auto generate by backend
  // role: z.enum(['student', 'faculty', 'admin']), // auto generate by backend using endpoint
  // status: z.enum(['in-progress', 'blocked']),
  // isDeleted: z.boolean().optional().default(false),
});

export const UserValidation = {
  userValidationSchema,
};
