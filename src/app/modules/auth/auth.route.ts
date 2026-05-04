import express from 'express';
import { AuthController } from './auth.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user-constant';

const router = express.Router();

router.post('/login', AuthController.loginUser);
router.post('/change-password', auth(USER_ROLE.admin, USER_ROLE.partner), AuthController.changePassword);
router.post('/forgot-password', AuthController.forgotPassword);

export const AuthRoutes = router;
