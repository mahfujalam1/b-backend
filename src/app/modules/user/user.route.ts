import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user-constant';

const router = express.Router();

router.post('/create-partner', auth(USER_ROLE.admin), UserController.createPartner);
router.get('/', auth(USER_ROLE.admin, USER_ROLE.partner), UserController.getAllUsers);
router.delete('/:id', auth(USER_ROLE.admin), UserController.deleteUser);

export const UserRoutes = router;
