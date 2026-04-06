import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

const SummaryCards = () => {
  const { totalBalance, totalIncome, totalExpense } = useDashboard();

  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <Card 
        title="Checking Account Balance" 
        amount={`$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
        icon={<Wallet size={20} color="var(--primary)" />}
        account="•••• 4821"
      />
      <Card 
        title="Total Income (YTD)" 
        amount={`$${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
        icon={<ArrowUpRight size={20} color="var(--success)" />}
        account="All Accounts"
      />
      <Card 
        title="Total Debits (MTD)" 
        amount={`$${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
        icon={<ArrowDownRight size={20} color="var(--danger)" />}
        account="All Accounts"
      />
    </div>
  );
};

const Card = ({ title, amount, icon, account }) => (
  <div className="glass-panel p-6 animate-fade-in" style={{ backgroundColor: 'var(--bg-surface)' }}>
    <div className="flex justify-between items-center mb-6">
      <div>
        <h3 className="text-secondary font-semibold text-sm">{title}</h3>
        <p className="account-number text-xs mt-1">{account}</p>
      </div>
      <div style={{
        padding: '0.5rem',
        backgroundColor: 'var(--bg-surface-hover)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-sm)',
      }}>
        {icon}
      </div>
    </div>
    <div className="flex items-end justify-between">
      <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{amount}</h2>
    </div>
  </div>
);

export default SummaryCards;
