import React, { useState } from 'react';
import { Sun, Moon, Bell, Search } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { theme, toggleTheme, globalSearch, setGlobalSearch } = useDashboard();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{
      height: '80px',
      background: 'rgba(4, 13, 26, 0.4)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 2.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 20,
    }}>
      <div style={{ position: 'relative', width: '380px' }}>
        <Search size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
        <input
          type="text"
          placeholder="Search for anything..."
          className="input-field"
          style={{ 
            width: '100%', 
            paddingLeft: '3rem', 
            borderRadius: '14px', 
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: '0.95rem'
          }}
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Theme toggle - Minimalist */}
        <button onClick={toggleTheme} className="btn-outline" style={{ 
          border: '1px solid rgba(255,255,255,0.1)', 
          padding: '0.6rem', 
          borderRadius: '12px',
          backgroundColor: 'rgba(255,255,255,0.03)',
          color: 'white',
          cursor: 'pointer'
        }}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            id="header-notifications-btn"
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            style={{ 
              border: '1px solid rgba(255,255,255,0.1)', 
              padding: '0.6rem', 
              borderRadius: '12px', 
              position: 'relative',
              backgroundColor: 'rgba(255,255,255,0.03)',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            <Bell size={20} />
            <span style={{
              position: 'absolute', top: '-2px', right: '-2px',
              width: '10px', height: '10px', backgroundColor: '#ef4444', 
              borderRadius: '50%', border: '2px solid #040d1a',
              boxShadow: '0 0 10px rgba(239,68,68,0.5)'
            }} />
          </button>

          {showNotifications && (
            <div className="glass-panel animate-fade-in" style={{
              position: 'absolute', top: 'calc(100% + 12px)', right: '0',
              width: '320px', backgroundColor: 'rgba(10, 20, 40, 0.95)', 
              padding: '1.25rem', zIndex: 100,
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
              <h4 className="font-bold" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem', marginBottom: '0.75rem', fontSize: '1rem' }}>Notifications</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {[
                  { title: "Monthly Statement", text: "Your March report is available.", time: "2h ago" },
                  { title: "Security Alert", text: "New login from San Francisco.", time: "5h ago" },
                  { title: "Transfer Complete", text: "You sent $1,200 to Sarah.", time: "Yesterday" }
                ].map((n, i) => (
                  <div key={i} style={{ padding: '0.75rem 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{n.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{n.text}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div style={{ position: 'relative' }}>
          <div
            id="header-profile-btn"
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            style={{
              width: '44px', height: '44px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
              padding: '2px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              width: '100%', height: '100%', borderRadius: '12px',
              backgroundColor: '#040d1a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, color: 'white', fontSize: '1rem',
            }}>
              {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>

          {showProfile && (
            <div className="glass-panel animate-fade-in" style={{
              position: 'absolute', top: 'calc(100% + 12px)', right: '0',
              width: '240px', backgroundColor: 'rgba(10, 20, 40, 0.95)', zIndex: 100, 
              overflow: 'hidden', borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
              <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{currentUser?.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>{currentUser?.email}</div>
              </div>
              <button
                onClick={() => { navigate('/settings'); setShowProfile(false); }}
                style={{ 
                  width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '1rem 1.25rem', background: 'transparent', color: 'rgba(255,255,255,0.8)', 
                  border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem'
                }}
              >
                <span>⚙️</span> Settings & Profile
              </button>
              <button
                id="header-logout-btn"
                onClick={handleLogout}
                style={{ 
                  width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '1rem 1.25rem', background: 'transparent', color: '#f87171', 
                  border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem'
                }}
              >
                <span>🚪</span> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
