import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { ExpenseRoutes } from '../modules/expense/expense.route';
import { notificationRoutes } from '../modules/notification/notification.routes';
import { metaRoutes } from '../modules/meta/meta.routes';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/expense',
    route: ExpenseRoutes,
  },
  {
    path: '/meta',
    route: metaRoutes,
  },
  {
    path: '/notification',
    route: notificationRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
