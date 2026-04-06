import React, { useState } from 'react';
import { Sun, Moon, Bell, Search, User } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

const Header = () => {
  const { role, setRole, theme, toggleTheme, globalSearch, setGlobalSearch, setActiveTab } = useDashboard();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header style={{
      height: '70px',
      backgroundColor: 'var(--bg-base)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 2rem'
    }}>
      <div style={{ position: 'relative', width: '300px' }}>
        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search transactions..." 
          className="input-field"
          style={{ width: '100%', paddingLeft: '2.5rem', borderRadius: '99px', backgroundColor: 'var(--bg-surface)' }}
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="text-sm font-semibold text-muted">Role:</span>
          <select 
            className="input-field" 
            style={{ borderRadius: '99px', padding: '0.25rem 2rem 0.25rem 1rem' }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Viewer">Viewer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button onClick={toggleTheme} className="btn btn-outline" style={{ border: 'none', padding: '0.5rem', borderRadius: '50%' }}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowNotifications(!showNotifications)} className="btn btn-outline" style={{ border: 'none', padding: '0.5rem', borderRadius: '50%', position: 'relative' }}>
            <Bell size={20} />
            <span style={{
              position: 'absolute', top: '2px', right: '4px',
              width: '8px', height: '8px', backgroundColor: 'var(--danger)', borderRadius: '50%'
            }}></span>
          </button>
          
          {showNotifications && (
            <div className="glass-panel animate-fade-in" style={{ position: 'absolute', top: '100%', right: '0', width: '250px', backgroundColor: 'var(--bg-surface)', padding: '1rem', zIndex: 50, marginTop: '0.5rem' }}>
              <h4 className="font-bold border-b pb-2 mb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>Notifications</h4>
              <p className="text-sm text-secondary py-2 border-b" style={{ borderBottom: '1px solid var(--border-color)' }}>Your statement is ready.</p>
              <p className="text-sm text-secondary py-2">Security alert: New sign in.</p>
            </div>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <div onClick={() => setShowProfile(!showProfile)} style={{ 
            width: '40px', height: '40px', borderRadius: '50%', 
            backgroundColor: 'var(--bg-surface-hover)', 
            border: '2px solid var(--primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <User size={20} color="var(--primary)" />
          </div>
          
          {showProfile && (
            <div className="glass-panel animate-fade-in" style={{ position: 'absolute', top: '100%', right: '0', width: '200px', backgroundColor: 'var(--bg-surface)', zIndex: 50, marginTop: '0.5rem', overflow: 'hidden' }}>
              <button 
                onClick={() => { setActiveTab('Settings'); setShowProfile(false); }} 
                className="btn" 
                style={{ width: '100%', textAlign: 'left', display: 'block', padding: '0.75rem 1rem', background: 'transparent', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)' }}
              >
                Settings & Profile
              </button>
              <button className="btn" style={{ width: '100%', textAlign: 'left', display: 'block', padding: '0.75rem 1rem', background: 'transparent', color: 'var(--danger)' }}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
