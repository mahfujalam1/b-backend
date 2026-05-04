import { Model, Types } from 'mongoose';

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'partner';
  notificationSettings?: {
    emailAlerts: boolean;
    monthlyReports: boolean;
  };
  isBlocked: boolean;
  isDeleted: boolean;
  isVerified: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
};

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser | null>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}
