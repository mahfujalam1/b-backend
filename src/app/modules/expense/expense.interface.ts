import { Types } from 'mongoose';

export type IExpense = {
  title: string;
  amount: number;
  date: Date;
  category: string;
  description?: string;
  note?: string;
  addedBy: Types.ObjectId;
};
