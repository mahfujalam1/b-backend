export const EmailTemplates = {
  welcome: (name: string, email: string, pass: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #2563eb;">Welcome to Hisab Nikash Pro</h2>
      <p>Hello ${name},</p>
      <p>Your partner account has been created successfully. You can now access the expense portal.</p>
      <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
        <p style="margin: 5px 0;"><strong>Password:</strong> ${pass}</p>
      </div>
      <a href="https://hisab-nikash.vercel.app/login" style="background: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">Login to Portal</a>
      <p style="margin-top: 20px; color: #888; font-size: 12px;">Please change your password after logging in for the first time.</p>
    </div>
  `,
  newExpense: (title: string, amount: number, addedBy: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #059669;">New Expense Added</h2>
      <p>A new business expense has been recorded in the system.</p>
      <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Title:</strong> ${title}</p>
        <p style="margin: 5px 0;"><strong>Amount:</strong> ৳ ${amount}</p>
        <p style="margin: 5px 0;"><strong>Added By:</strong> ${addedBy}</p>
      </div>
      <a href="https://hisab-nikash.vercel.app/dashboard" style="background: #059669; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">View in Dashboard</a>
    </div>
  `
};
