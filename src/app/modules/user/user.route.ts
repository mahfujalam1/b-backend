import express from 'express';
import { UserController } from './user.controller';
import { UserControllers } from './user-controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user-constant';
import validateRequest from '../../middleware/validateRequest';
import userValidations from './user-validation';
import { uploadFile } from '../../helper/fileUploader';

const router = express.Router();

// Original routes from new-backend
router.post("/signup", validateRequest(userValidations.UserValidationSchema), UserControllers.createUser);

router.post(
    '/verify-code',
    validateRequest(userValidations.verifyCodeValidationSchema),
    UserControllers.verifyCode
);

router.post(
    '/resend-verify-code',
    validateRequest(userValidations.resendVerifyCodeSchema),
    UserControllers.resendVerifyCode
);

router.patch(
    '/update-profile',
    auth(USER_ROLE.admin, USER_ROLE.user),
    uploadFile(),
    UserControllers.updateProfile
);

router.get(
    '/get-my-profile',
    auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.partner),
    UserControllers.getMyProfile
);

router.patch('/block-user/:userId', 
    auth(USER_ROLE.admin), 
    UserControllers.blockUser
);

router.get(
    '/get-single-user/:id',
    auth(USER_ROLE.admin),
    UserControllers.getSingleUser,
);

router.get(
    '/get-all-users',
    auth(USER_ROLE.admin),
    UserControllers.getAllUser,
);

// Hisab Nikash Pro specific routes
router.post('/create-partner', auth(USER_ROLE.admin), UserController.createPartner);
router.get('/all-partners', auth(USER_ROLE.admin, USER_ROLE.partner), UserController.getAllUsers);
router.get('/', auth(USER_ROLE.admin), UserController.getAllUsers);
router.delete('/:id', auth(USER_ROLE.admin), UserController.deleteUser);

export const UserRoutes = router;
