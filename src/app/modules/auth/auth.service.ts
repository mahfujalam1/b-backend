import config from '../../config';
import { User } from '../user/user-model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import jwt, { Secret } from 'jsonwebtoken';
import AppError from '../../error/appError';
import httpStatus from 'http-status';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;
  
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted');
  }

  if (isUserExist.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  const isPasswordMatched = await User.isPasswordMatched(password, isUserExist.password);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password does not match');
  }

  const jwtPayload = {
    id: isUserExist._id,
    role: isUserExist.role,
    email: isUserExist.email,
    name: isUserExist.name
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secret as Secret,
    { expiresIn: config.jwt_access_expires_in as any }
  );

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as Secret,
    { expiresIn: config.jwt_refresh_expires_in as any }
  );

  return { accessToken, refreshToken };
};

const changePassword = async (userId: string, oldPass: string, newPass: string) => {
  const user = await User.findById(userId).select('+password');
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  const isMatched = await User.isPasswordMatched(oldPass, user.password);
  if (!isMatched) throw new AppError(httpStatus.UNAUTHORIZED, 'Old password does not match');

  user.password = newPass;
  await user.save();
};

export const AuthService = {
  loginUser,
  changePassword,
};
