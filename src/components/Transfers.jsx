import React, { useState } from 'react';
import { Send, ArrowRight } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

const Transfers = () => {
  const { addTransaction, totalBalance } = useDashboard();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [success, setSuccess] = useState(false);

  const handleTransfer = (e) => {
    e.preventDefault();
    if (!amount || !recipient) return;
    
    // Simulate transaction delay
    setTimeout(() => {
      addTransaction({
        description: `Transfer to ${recipient}`,
        amount: -parseFloat(amount),
        category: 'Transfer',
        date: new Date().toISOString().split('T')[0],
        type: 'expense'
      });
      setSuccess(true);
      setAmount('');
      setRecipient('');
      
      setTimeout(() => setSuccess(false), 3000);
    }, 500);
  };

  return (
    <div className="glass-panel p-6 animate-fade-in" style={{ backgroundColor: 'var(--bg-surface)', maxWidth: '600px', margin: '0 auto' }}>
      <div className="flex items-center gap-3 mb-6">
        <div style={{ padding: '0.75rem', backgroundColor: 'var(--primary)', borderRadius: '50%' }}>
          <Send color="white" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Transfer Funds</h2>
          <p className="text-muted text-sm">Send money to accounts or contacts safely.</p>
        </div>
      </div>

      <div className="mb-6 p-4 rounded-md" style={{ backgroundColor: 'var(--bg-surface-hover)', border: '1px solid var(--border-color)' }}>
        <p className="text-sm font-semibold text-secondary">Available Checking Balance</p>
        <p className="text-2xl font-bold mt-1">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
      </div>

      {success && (
        <div className="badge-success p-3 mb-6 rounded-md flex items-center" style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success)', border: '1px solid rgba(5,150,105,0.2)' }}>
          Transfer successful!
        </div>
      )}

      <form onSubmit={handleTransfer} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-semibold text-secondary mb-1 block">Recipient Name or Account</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="e.g. John Doe or ending in 4821" 
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required 
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-secondary mb-1 block">Amount ($)</label>
          <input 
            type="number" 
            className="input-field" 
            placeholder="0.00" 
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required 
          />
        </div>
        
        <button type="submit" className="btn btn-primary mt-4" style={{ padding: '0.75rem', fontWeight: 600, width: '100%' }}>
          Send Transfer <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
};

export default Transfers;
