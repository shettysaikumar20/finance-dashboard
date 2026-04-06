import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Receipt, PieChart, Wallet, Settings, Send, CreditCard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', to: '/dashboard' },
    { icon: <Receipt size={20} />, label: 'Account Activity', to: '/transactions' },
    { icon: <Send size={20} />, label: 'Transfers', to: '/transfers' },
    { icon: <CreditCard size={20} />, label: 'Cards', to: '/cards' },
    { icon: <PieChart size={20} />, label: 'Analytics', to: '/analytics' },
  ];

  return (
    <aside style={{
      width: '280px',
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '2.5rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 10,
      color: 'white',
      height: '100vh',
      position: 'relative',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '3rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
          width: '42px', height: '42px', borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
        }}>
          <Wallet color="white" size={24} />
        </div>
        <h1 className="text-xl font-bold" style={{ 
          background: 'linear-gradient(135deg, #fff, #93c5fd)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '1.4rem',
          letterSpacing: '-0.02em'
        }}>
          NexaBank
        </h1>
      </div>

      {/* User info pill */}
      {currentUser && (
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '1rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
        }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: '1rem', color: 'white', flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            {currentUser.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentUser.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentUser.email}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '1.15rem',
              padding: '0.9rem 1.25rem',
              borderRadius: '12px',
              color: isActive ? 'white' : 'rgba(255, 255, 255, 0.55)',
              backgroundColor: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: isActive ? '0 4px 15px rgba(0,0,0,0.2)' : 'none',
            })}
          >
            <span style={{ transition: 'transform 0.3s' }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <NavLink
          to="/settings"
          style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '1.15rem',
            padding: '0.9rem 1.25rem', borderRadius: '12px',
            color: isActive ? 'white' : 'rgba(255, 255, 255, 0.55)',
            backgroundColor: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
            border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
            textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.3s ease',
          })}
        >
          <Settings size={20} />
          Settings
        </NavLink>

        <button
          id="sidebar-logout-btn"
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '1.15rem',
            padding: '0.9rem 1.25rem', borderRadius: '12px',
            color: '#f87171',
            backgroundColor: 'transparent',
            border: '1px solid transparent', 
            width: '100%', cursor: 'pointer',
            fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.3s ease',
            fontFamily: 'inherit'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.1)';
            e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
