import { TUser } from './user-interface';
import { User } from './user-model';

const createUser = async (payload: TUser): Promise<TUser> => {
  const result = await User.create(payload);
  return result;
};

const getAllUsers = async () => {
  const result = await User.find({}).sort({ createdAt: -1 });
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  createUser,
  getAllUsers,
  deleteUser,
};
