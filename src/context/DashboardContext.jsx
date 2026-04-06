import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';

const DashboardContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [role, setRole] = useState('Admin');
  const [theme, setTheme] = useState('light');
  const [globalSearch, setGlobalSearch] = useState('');
  const [chartTimeRange, setChartTimeRange] = useState('6M');

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

  const totalIncome = transactions.filter(t => t.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.amount < 0).reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
  const totalBalance = totalIncome - totalExpense;

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
