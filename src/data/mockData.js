export const initialTransactions = [
  { id: '1', date: '2026-04-01', amount: 3500.00, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: '2', date: '2026-04-02', amount: -1500.00, category: 'Housing', type: 'expense', description: 'Rent Payment' },
  { id: '3', date: '2026-04-03', amount: -65.50, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: '4', date: '2026-04-04', amount: -120.00, category: 'Utilities', type: 'expense', description: 'Electricity Bill' },
  { id: '5', date: '2026-04-05', amount: -45.00, category: 'Entertainment', type: 'expense', description: 'Movie Tickets' },
  { id: '6', date: '2026-04-06', amount: 250.00, category: 'Investment', type: 'income', description: 'Dividend' },
  { id: '7', date: '2026-04-07', amount: -85.20, category: 'Food', type: 'expense', description: 'Dinner out' },
  { id: '8', date: '2026-04-08', amount: -50.00, category: 'Transportation', type: 'expense', description: 'Gas' },
  { id: '9', date: '2026-04-09', amount: -200.00, category: 'Shopping', type: 'expense', description: 'New Shoes' },
  { id: '10', date: '2026-04-10', amount: -35.00, category: 'Subscriptions', type: 'expense', description: 'Streaming Services' }
];

export const incomeData = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3800 },
  { name: 'Mar', amount: 4200 },
  { name: 'Apr', amount: 4000 },
  { name: 'May', amount: 4500 },
  { name: 'Jun', amount: 4800 },
];

export const expenseData = [
  { name: 'Jan', amount: 2400 },
  { name: 'Feb', amount: 2100 },
  { name: 'Mar', amount: 2600 },
  { name: 'Apr', amount: 2200 },
  { name: 'May', amount: 2800 },
  { name: 'Jun', amount: 2500 },
];

export const categories = [
  'Housing', 'Food', 'Utilities', 'Transportation', 'Entertainment', 'Shopping', 'Subscriptions', 'Salary', 'Investment', 'Other'
];
