import express from 'express';
import { AuthController } from './auth.controller';
import { AuthControllers } from './auth-controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user-constant';
import validateRequest from '../../middleware/validateRequest';
import { authValidations } from './auth-validation';

const router = express.Router();

// Original routes from new-backend
router.post("/signin", validateRequest(authValidations.loginValidation), AuthControllers.logInUser);

router.post(
    '/change-password-original',
    auth(USER_ROLE.user, USER_ROLE.admin),
    validateRequest(authValidations.changePasswordValidationSchema),
    AuthControllers.changePassword
);

router.post(
    '/forget-password-original',
    validateRequest(authValidations.forgetPasswordValidationSchema),
    AuthControllers.forgetPassword
);

router.post(
    '/reset-password-original',
    validateRequest(authValidations.resetPasswordValidationSchema),
    AuthControllers.resetPassword
);

router.post(
    '/verify-reset-otp',
    validateRequest(authValidations.verifyResetOtpValidationSchema),
    AuthControllers.verifyResetOtp
);

router.post(
    '/resend-reset-code',
    validateRequest(authValidations.resendResetCodeValidationSchema),
    AuthControllers.resendResetCode
);

router.delete('/delete-user', auth(USER_ROLE.user), AuthControllers.deleteUser);

// Hisab Nikash Pro specific routes
router.post('/login', AuthController.loginUser);
router.post('/change-password', auth(USER_ROLE.admin, USER_ROLE.partner), AuthController.changePassword);
router.post('/forgot-password', AuthController.forgotPassword);

export const AuthRoutes = router;
