import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

const router = Router();

// all router define here for more scalability

const routerModules = [
  { path: '/students', route: StudentRoutes },
  { path: '/users', route: UserRoutes },
  { path: '/academic-semesters', route: academicSemesterRoutes },
];

routerModules.forEach((item) => router.use(item.path, item.route));

export default router;
