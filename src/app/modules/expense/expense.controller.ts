import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { ExpenseService } from './expense.service';
import sendEmail from '../../utilities/sendEmail';
import { TUser } from '../user/user-interface';
import { EmailTemplates } from '../../mailTemplate';
import User from '../user/user-model';

const createExpense = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const expenseData = { ...req.body, addedBy: user?.id };
  
  const result = await ExpenseService.createExpense(expenseData);

  // Send emails to all partners
  try {
    const allPartners = await User.find({ role: 'partner' });
    const emailPromises = allPartners.map((partner: TUser) => 
      sendEmail({
        email: partner.email, 
        subject: 'New Business Expense Added', 
        html: EmailTemplates.newExpense(result.title, result.amount, user?.name || 'A Partner')
      })
    );
    await Promise.all(emailPromises);
  } catch (err) {
    console.log('Email notification failed', err);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expense created successfully',
    data: result,
  });
});

const updateExpense = catchAsync(async (req: Request, res: Response) => {
  const result = await ExpenseService.updateExpense(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expense updated successfully',
    data: result,
  });
});

const deleteExpense = catchAsync(async (req: Request, res: Response) => {
  const expenseId = req.params.id as string;
  const user = req.user;
  
  // Get expense details before deleting for the email
  const expense = await ExpenseService.getAllExpenses({ _id: expenseId });
  const expenseTitle = expense[0]?.title || 'An Expense';

  const result = await ExpenseService.deleteExpense(expenseId);

  // Notify partners about deletion
  try {
    const allPartners = await User.find({ role: 'partner' });
    const emailPromises = allPartners.map((partner: TUser) => 
      sendEmail({
        email: partner.email, 
        subject: 'Expense Record Deleted - Hisab Nikash Pro', 
        html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #ef4444;">Expense Deleted</h2>
          <p>An expense record has been removed from the portal.</p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Title:</strong> ${expenseTitle}</p>
            <p style="margin: 5px 0;"><strong>Deleted By:</strong> ${user?.name || 'A Partner'}</p>
          </div>
          <p style="color: #888; font-size: 12px;">This is an automated security notification.</p>
        </div>
        `
      })
    );
    await Promise.all(emailPromises);
  } catch (err) {
    console.log('Delete notification failed', err);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expense deleted successfully',
    data: result,
  });
});

const getAllExpenses = catchAsync(async (req: Request, res: Response) => {
  const result = await ExpenseService.getAllExpenses(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expenses retrieved successfully',
    data: result,
  });
});

const getStats = catchAsync(async (req: Request, res: Response) => {
  const result = await ExpenseService.getStats();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Stats retrieved successfully',
    data: result,
  });
});

const getPartnerStats = catchAsync(async (req: Request, res: Response) => {
  const result = await ExpenseService.getPartnerStats();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Partner stats retrieved successfully',
    data: result,
  });
});

export const ExpenseController = {
  createExpense,
  updateExpense,
  deleteExpense,
  getAllExpenses,
  getStats,
  getPartnerStats,
};
