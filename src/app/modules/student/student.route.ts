// route file handle only router functionalities
import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.post('/create-student', StudentControllers.createStudent);
router.get('/allStudents', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.delete('/:studentId', StudentControllers.deleteStudent);
router.patch('/:studentId', StudentControllers.updateStudent);

export const StudentRoutes = router;
