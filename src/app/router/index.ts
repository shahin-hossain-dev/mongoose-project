import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

// all router define here for more scalability

const routerModules = [
  { path: '/students', route: StudentRoutes },
  { path: '/users', route: UserRoutes },
];

routerModules.forEach((item) => router.use(item.path, item.route));

export default router;
