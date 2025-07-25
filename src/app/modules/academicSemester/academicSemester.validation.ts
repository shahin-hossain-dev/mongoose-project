import { z } from 'zod';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Summer', 'Fall']),
    year: z.date(),
    code: z.enum(['01', '02', '03']),
  }),
});

export const academicSemesterValidation = {
  createAcademicSemesterValidationSchema,
};
