import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { UserService } from './user.service';
import sendEmail from '../../utilities/sendEmail';
import { EmailTemplates } from '../../mailTemplate';

const createPartner = catchAsync(async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const initialPassword = 'your-initial-password-123456';
  
  const result = await UserService.createUser({
    name,
    email,
    password: initialPassword,
    role: 'partner',
    isBlocked: false,
    isDeleted: false,
    isVerified: true
  });

  try {
    await sendEmail({
      email, 
      subject: 'Your Partner Account Created - Hisab Nikash Pro', 
      html: EmailTemplates.welcome(name, email, initialPassword)
    });
  } catch (err) {
    console.log('Welcome email failed', err);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Partner created and notified successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUser(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const UserController = {
  createPartner,
  getAllUsers,
  deleteUser,
};
