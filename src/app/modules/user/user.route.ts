import express from 'express';
import { UserController } from './user.controller';

import { studentValidation } from '../student/student.validation';
import requestValidator from '../../middlewares/requestValidator';

const router = express.Router();

router.post(
  '/create-student',
  requestValidator(studentValidation.createStudentValidationSchema), //request validation middleware
  UserController.createStudent,
);

export const UserRoutes = router;
