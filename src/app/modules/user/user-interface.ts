import { Model, Types } from 'mongoose';

export type TUserRole = 'admin' | 'partner' | 'user';

export interface IOtherData {
  fullName: string;
  email: string;
  profileImage?: string;
  role: TUserRole;
}

export type TUser = {
  _id?: Types.ObjectId;
  name: string;
  fullName?: string; // Support existing code
  email: string;
  password: string;
  role: TUserRole;
  profileImage?: string; // Support existing code
  profession?: string; // Support existing code
  licenseNo?: string; // Support existing code
  country?: string; // Support existing code
  city?: string; // Support existing code
  notificationSettings?: {
    emailAlerts: boolean;
    monthlyReports: boolean;
  };
  isBlocked: boolean;
  isDeleted: boolean;
  isVerified: boolean;
  isResetVerified?: boolean; // Support existing code
  isActive?: boolean; // Support existing code
  playerIds?: string[]; // Support existing code
  verifyCode?: number; // Support existing code
  resetCode?: number; // Support existing code
  codeExpireIn?: Date; // Support existing code
  passwordChangedAt?: Date; // Support existing code
  passwordResetToken?: string;
  passwordResetExpires?: Date;
};

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser | null>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}
