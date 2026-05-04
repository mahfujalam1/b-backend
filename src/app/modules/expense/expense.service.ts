import User from '../user/user-model';
import { IExpense } from './expense.interface';
import { Expense } from './expense.model';

const createExpense = async (payload: IExpense): Promise<IExpense> => {
  const result = await Expense.create(payload);
  return result;
};

const updateExpense = async (id: string, payload: Partial<IExpense>) => {
  const result = await Expense.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteExpense = async (id: string) => {
  const result = await Expense.findByIdAndDelete(id);
  return result;
};

const getAllExpenses = async (query: any) => {
  const { limit, page, ...filter } = query;
  
  const limitValue = Number(limit) || 0;
  const pageValue = Number(page) || 1;
  const skip = (pageValue - 1) * limitValue;

  const result = await Expense.find(filter)
    .populate('addedBy', 'name email')
    .sort({ date: -1 })
    .skip(skip)
    .limit(limitValue);
    
  return result;
};

const getStats = async () => {
  const expenses = await Expense.find();
  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  
  const monthlyStats = await Expense.aggregate([
    {
      $group: {
        _id: { $month: '$date' },
        total: { $sum: '$amount' },
      },
    },
    { $sort: { '_id': 1 } }
  ]);

  const categoryStats = await Expense.aggregate([
    {
      $group: {
        _id: '$category',
        total: { $sum: '$amount' },
      },
    },
  ]);

  return {
    totalExpense,
    monthlyStats,
    categoryStats,
  };
};

const getPartnerStats = async () => {
  const users = await User.find({}, { name: 1, email: 1 });
  const userCount = users.length;
  
  const expenses = await Expense.find();
  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const perPersonCost = userCount > 0 ? totalExpense / userCount : 0;

  const partnerCosts = await Expense.aggregate([
    {
      $group: {
        _id: '$addedBy',
        totalPaid: { $sum: '$amount' },
      },
    },
  ]);

  const partnerDetails = users.map(user => {
    const costData = partnerCosts.find(c => c._id.toString() === user._id.toString());
    const totalPaid = costData ? costData.totalPaid : 0;
    const balance = totalPaid - perPersonCost;
    
    return {
      userId: user._id,
      name: user.name,
      email: user.email,
      totalPaid,
      balance,
    };
  });

  return {
    totalExpense,
    perPersonCost,
    partnerDetails,
  };
};

export const ExpenseService = {
  createExpense,
  updateExpense,
  deleteExpense,
  getAllExpenses,
  getStats,
  getPartnerStats,
};
