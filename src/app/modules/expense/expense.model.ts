import { Schema, model } from 'mongoose';
import { IExpense } from './expense.interface';

const expenseSchema = new Schema<IExpense>(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    description: { type: String },
    note: { type: String },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

export const Expense = model<IExpense>('Expense', expenseSchema);
