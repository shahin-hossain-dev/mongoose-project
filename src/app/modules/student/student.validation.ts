import { z } from 'zod';

// 🔹 Helper: Title Case validator
const titleCase = (val: string) => {
  const formatted = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
  return val === formatted;
};

// 🔹 User Name Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(15, 'First name max length is 15')
    .refine((val) => titleCase(val), {
      message: 'First name must be in Title Case',
    }),

  middleName: z
    .string()
    .trim()
    .max(15, 'Middle name max length is 15')
    .optional(),

  lastName: z
    .string()
    .trim()
    .max(15, 'Last name max length is 15')
    .refine((val) => /^[A-Za-z]+$/.test(val), {
      message: 'Last name must contain only alphabets',
    }),
});

// 🔹 Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().trim(),
  fatherContactNo: z.string().trim(),
  fatherOccupation: z.string().trim(),
  motherName: z.string().trim(),
  motherContactNo: z.string().trim(),
  motherOccupation: z.string().trim(),
});

// 🔹 Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().trim(),
  contactNo: z.string().trim(),
  occupation: z.string().trim(),
  address: z.string().trim(),
});

// 🔹 Main Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    // id: z.string().min(1, 'Student ID is required'),
    student: z.object({
      name: userNameValidationSchema,
      password: z.string().max(20),

      email: z.string().email('Email must be valid'),

      gender: z.enum(['male', 'female'], {
        errorMap: () => ({ message: 'Gender must be male or female' }),
      }),

      dateOfBirth: z.string().optional(),

      contactNo: z.string().min(1, 'Contact number is required').trim(),

      emergencyContactNo: z.string().optional(),

      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),

      presentAddress: z.string().min(1, 'Present address is required'),

      permanentAddress: z.string().min(1, 'Permanent address is required'),

      guardian: guardianValidationSchema,

      localGuardian: localGuardianValidationSchema,

      profileImg: z.string().optional(),
      // isActive: z.enum(['active', 'blocked']).default('active'),
      // isDeleted: z.boolean().default(false),
    }),
  }),
});

export const studentValidation = { createStudentValidationSchema };
