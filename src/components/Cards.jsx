import React, { useState } from 'react';
import { CreditCard, Lock, Unlock, ShieldCheck } from 'lucide-react';

const Cards = () => {
  const [cards, setCards] = useState([
    { id: '1', type: 'Credit', name: 'Platinum Visa', number: '•••• •••• •••• 4281', expiry: '12/28', locked: false, color: '#0f172a' },
    { id: '2', type: 'Debit', name: 'Checking Debit', number: '•••• •••• •••• 9842', expiry: '08/27', locked: false, color: '#0a4b9c' }
  ]);

  const toggleLock = (id) => {
    setCards(cards.map(c => c.id === id ? { ...c, locked: !c.locked } : c));
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '2rem' }}>
      <h2 className="text-2xl font-bold mb-6">Card Management</h2>
      <div className="grid grid-cols-2 gap-6">
        {cards.map(card => (
          <div key={card.id} className="glass-panel" style={{ backgroundColor: 'var(--bg-surface)' }}>
            <div style={{
              background: card.color,
              borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
              padding: '1.5rem',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {card.locked && (
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                  <span className="badge badge-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '1rem' }}>
                    <Lock size={16} /> CARD LOCKED
                  </span>
                </div>
              )}
              <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', transform: 'translate(30%, -30%)' }}></div>
              <div className="flex justify-between items-start mb-6 position-relative">
                <ShieldCheck size={28} opacity={0.8} />
                <span className="font-semibold">{card.type}</span>
              </div>
              <p className="account-number text-xl mb-2 tracking-widest">{card.number}</p>
              <div className="flex justify-between items-center text-sm opacity-80">
                <span>{card.name}</span>
                <span>Exp: {card.expiry}</span>
              </div>
            </div>
            
            <div className="p-4 flex justify-between items-center" style={{ borderTop: '1px solid var(--border-color)' }}>
              <span className="text-sm font-semibold text-secondary">Status: {card.locked ? <span className="text-danger">Frozen</span> : <span className="text-success">Active</span>}</span>
              <button 
                onClick={() => toggleLock(card.id)} 
                className={`btn ${card.locked ? 'btn-primary' : 'btn-outline'}`}
                style={card.locked ? {} : { color: 'var(--danger)', borderColor: 'var(--danger)' }}
              >
                {card.locked ? <><Unlock size={16} /> Unlock Card</> : <><Lock size={16} /> Freeze Card</>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
