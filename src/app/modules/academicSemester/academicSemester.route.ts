import { Router } from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import requestValidator from '../../middlewares/requestValidator';
import { academicSemesterValidation } from './academicSemester.validation';

const router = Router();

router.post(
  '/create-academic-semester',
  requestValidator(
    academicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get(
  '/all-academic-semesters',
  AcademicSemesterControllers.getAllAcademicSemester,
);
router.get(
  '/single-academic-semester/:semesterId',
  AcademicSemesterControllers.getSingleSemester,
);

export const academicSemesterRoutes = router;
