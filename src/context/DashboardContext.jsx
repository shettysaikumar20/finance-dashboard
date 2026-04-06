import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';

const DashboardContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [role, setRole] = useState('Viewer'); // 'Viewer' or 'Admin'
  const [theme, setTheme] = useState('light'); // Banking is usually light mode default
  const [activeTab, setActiveTab] = useState('Overview'); // 'Overview', 'Transactions', 'Analytics', 'Transfers', 'Cards', 'Settings'
  const [globalSearch, setGlobalSearch] = useState('');
  const [chartTimeRange, setChartTimeRange] = useState('6M'); // '6M' or '1Y'
  
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addTransaction = (transaction) => {
    if (role !== 'Admin') return;
    setTransactions(prev => [{
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
      amount: transaction.type === 'expense' ? -Math.abs(transaction.amount) : Math.abs(transaction.amount)
    }, ...prev]);
  };

  const deleteTransaction = (id) => {
    if (role !== 'Admin') return;
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Calculate totals
  const totalIncome = transactions.filter(t => t.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.amount < 0).reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
  const totalBalance = totalIncome - totalExpense;

  // Category breakdown for expenses
  const expenseByCategory = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Math.abs(curr.amount);
      return acc;
    }, {});

  const pieChartData = Object.keys(expenseByCategory).map(key => ({
    name: key,
    value: expenseByCategory[key]
  })).sort((a, b) => b.value - a.value);

  const highestSpendingCategory = pieChartData.length > 0 ? pieChartData[0] : null;

  return (
    <DashboardContext.Provider value={{
      role, setRole,
      theme, toggleTheme,
      activeTab, setActiveTab,
      globalSearch, setGlobalSearch,
      chartTimeRange, setChartTimeRange,
      transactions, addTransaction, deleteTransaction,
      totalIncome, totalExpense, totalBalance,
      pieChartData, highestSpendingCategory
    }}>
      {children}
    </DashboardContext.Provider>
  );
};
