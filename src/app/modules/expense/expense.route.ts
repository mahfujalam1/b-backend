import express from 'express';
import { ExpenseController } from './expense.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user-constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.partner),
  ExpenseController.createExpense
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.partner),
  ExpenseController.getAllExpenses
);

router.get(
  '/stats',
  auth(USER_ROLE.admin, USER_ROLE.partner),
  ExpenseController.getStats
);

router.get(
  '/partner-stats',
  auth(USER_ROLE.admin, USER_ROLE.partner),
  ExpenseController.getPartnerStats
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.partner),
  ExpenseController.updateExpense
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.partner),
  ExpenseController.deleteExpense
);

export const ExpenseRoutes = router;
