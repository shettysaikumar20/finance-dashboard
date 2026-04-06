import React from 'react';
import { LayoutDashboard, Receipt, PieChart, Wallet, Settings, Send, CreditCard } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

const Sidebar = () => {
  const { activeTab, setActiveTab } = useDashboard();
  
  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--primary)', // Navy blue sidebar
      borderRight: '1px solid var(--border-color)',
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 10,
      color: 'white' // White text on dark blue
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
        <div style={{
          backgroundColor: 'white',
          width: '36px', height: '36px', borderRadius: 'var(--radius-sm)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Wallet color="var(--primary)" size={20} />
        </div>
        <h1 className="text-xl font-bold" style={{ color: 'white' }}>
          National Bank
        </h1>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <SidebarItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
        <SidebarItem icon={<Receipt size={20} />} label="Account Activity" active={activeTab === 'Transactions'} onClick={() => setActiveTab('Transactions')} />
        <SidebarItem icon={<Send size={20} />} label="Transfers" active={activeTab === 'Transfers'} onClick={() => setActiveTab('Transfers')} />
        <SidebarItem icon={<CreditCard size={20} />} label="Cards" active={activeTab === 'Cards'} onClick={() => setActiveTab('Cards')} />
        <SidebarItem icon={<PieChart size={20} />} label="Analytics" active={activeTab === 'Analytics'} onClick={() => setActiveTab('Analytics')} />
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <SidebarItem icon={<Settings size={20} />} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <a href="#" onClick={(e) => { e.preventDefault(); if (onClick) onClick(); }} style={{
    display: 'flex', alignItems: 'center', gap: '1rem',
    padding: '0.875rem 1rem', borderRadius: 'var(--radius-sm)',
    color: active ? 'white' : 'rgba(255, 255, 255, 0.7)',
    backgroundColor: active ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
    textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem',
    transition: 'all var(--transition-fast)'
  }}
  onMouseEnter={(e) => {
    if (!active) {
      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      e.currentTarget.style.color = 'white';
    }
  }}
  onMouseLeave={(e) => {
    if (!active) {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
    }
  }}>
    {icon}
    {label}
  </a>
);

export default Sidebar;
