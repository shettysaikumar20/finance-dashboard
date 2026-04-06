import React, { useState } from 'react';
import { Filter, Plus, Trash2 } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { categories } from '../data/mockData';

const Transactions = () => {
  const { transactions, role, deleteTransaction, addTransaction, globalSearch } = useDashboard();
  const [filter, setFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // New Transaction State
  const [newTx, setNewTx] = useState({ description: '', amount: '', category: categories[0], type: 'expense', date: new Date().toISOString().split('T')[0] });

  const filteredTransactions = transactions.filter(t => {
    // Check type filter
    const matchesFilter = filter === 'All' || t.type === filter.toLowerCase();
    
    // Check search term
    const searchLower = globalSearch.toLowerCase();
    const matchesSearch = !globalSearch || 
      t.description.toLowerCase().includes(searchLower) ||
      t.category.toLowerCase().includes(searchLower);

    return matchesFilter && matchesSearch;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTx.description || !newTx.amount) return;
    addTransaction({
      ...newTx,
      amount: parseFloat(newTx.amount)
    });
    setNewTx({ description: '', amount: '', category: categories[0], type: 'expense', date: new Date().toISOString().split('T')[0] });
    setShowAddForm(false);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--bg-surface)' }}>
      <div className="p-6 border-b" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Account Activity</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 rounded-sm" style={{ backgroundColor: 'var(--bg-surface-hover)' }}>
              {['All', 'Income', 'Expense'].map(f => (
                <button
                  key={f}
                  className={`btn ${filter === f ? 'btn-primary' : ''}`}
                  style={filter !== f ? { background: 'transparent', color: 'var(--text-secondary)' } : {}}
                  onClick={() => setFilter(f)}
                >
                  {f === 'Expense' ? 'Debits' : f === 'Income' ? 'Credits' : 'All'}
                </button>
              ))}
            </div>
            {role === 'Admin' && (
              <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
                <Plus size={16} /> Add
              </button>
            )}
          </div>
        </div>

        {showAddForm && role === 'Admin' && (
          <form onSubmit={handleAdd} className="grid grid-cols-4 gap-4 p-4 mb-4 rounded-lg bg-surface-hover" style={{ backgroundColor: 'rgba(0,0,0,0.1)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
            <input className="input-field" placeholder="Description" value={newTx.description} onChange={e => setNewTx({...newTx, description: e.target.value})} required />
            <input className="input-field" type="number" placeholder="Amount" value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})} required />
            <select className="input-field" value={newTx.type} onChange={e => setNewTx({...newTx, type: e.target.value})}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <select className="input-field" value={newTx.category} onChange={e => setNewTx({...newTx, category: e.target.value})}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button type="submit" className="btn btn-primary col-span-4 mt-2">Save Transaction</button>
          </form>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.5rem 1.5rem 1.5rem' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Category</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              {role === 'Admin' && <th style={{ textAlign: 'right', width: '60px' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? filteredTransactions.map(tx => (
              <tr key={tx.id}>
                <td>
                  <div className="font-semibold">{tx.description}</div>
                </td>
                <td>
                  <span className="badge badge-primary">{tx.category}</span>
                </td>
                <td className="text-muted text-sm">{tx.date}</td>
                <td style={{ textAlign: 'right', fontWeight: 600, color: tx.amount > 0 ? 'var(--success)' : 'var(--text-primary)' }}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </td>
                {role === 'Admin' && (
                  <td style={{ textAlign: 'right' }}>
                    <button onClick={() => deleteTransaction(tx.id)} className="btn btn-outline" style={{ padding: '0.25rem', border: 'none', color: 'var(--danger)' }}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            )) : (
              <tr>
                <td colSpan={role === 'Admin' ? 5 : 4} style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
