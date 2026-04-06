import React, { useState } from 'react';
import { User, Bell, Palette, Shield, Key, Save } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { theme, toggleTheme, role, setRole } = useDashboard();
  const { currentUser } = useAuth();

  const nameParts = currentUser?.name?.split(' ') || ['', ''];
  const [firstName, setFirstName] = useState(nameParts[0] || '');
  const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') || '');
  const [email] = useState(currentUser?.email || '');
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    // Update stored user name
    const users = JSON.parse(localStorage.getItem('finance_users') || '[]');
    const updatedUsers = users.map(u =>
      u.email === currentUser.email ? { ...u, name: `${firstName} ${lastName}`.trim() } : u
    );
    localStorage.setItem('finance_users', JSON.stringify(updatedUsers));
    const storedUser = JSON.parse(localStorage.getItem('finance_user') || '{}');
    localStorage.setItem('finance_user', JSON.stringify({ ...storedUser, name: `${firstName} ${lastName}`.trim() }));
    setSavedMsg('Profile updated successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '2rem', maxWidth: '800px' }}>
      <h2 className="text-2xl font-bold" style={{ marginBottom: '1.75rem' }}>Account Settings</h2>

      {/* Profile Info */}
      <div className="glass-panel" style={{ backgroundColor: 'var(--bg-surface)', marginBottom: '1.25rem', padding: '1.5rem' }}>
        <div className="flex items-center gap-3" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <User color="var(--info)" size={20} />
          <h3 className="font-bold" style={{ fontSize: '1.05rem' }}>Profile Information</h3>
        </div>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSave}>
          <div>
            <label className="text-sm font-semibold" style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>First Name</label>
            <input
              type="text"
              className="input-field"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="First name"
            />
          </div>
          <div>
            <label className="text-sm font-semibold" style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Last Name</label>
            <input
              type="text"
              className="input-field"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder="Last name"
            />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label className="text-sm font-semibold" style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Email Address</label>
            <input type="email" className="input-field" value={email} readOnly style={{ opacity: 0.65, cursor: 'not-allowed' }} />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Save size={16} /> Save Changes
              </button>
              {savedMsg && <span style={{ color: 'var(--success)', fontSize: '0.875rem', fontWeight: 600 }}>✅ {savedMsg}</span>}
            </div>
          </div>
        </form>
      </div>

      {/* Appearance */}
      <div className="glass-panel" style={{ backgroundColor: 'var(--bg-surface)', marginBottom: '1.25rem', padding: '1.5rem' }}>
        <div className="flex items-center gap-3" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <Palette color="var(--primary)" size={20} />
          <h3 className="font-bold" style={{ fontSize: '1.05rem' }}>Appearance</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Theme Preference</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Switch between Light and Dark mode.</p>
          </div>
          <button className="btn btn-outline" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </div>

      {/* Roles */}
      <div className="glass-panel" style={{ backgroundColor: 'var(--bg-surface)', marginBottom: '1.25rem', padding: '1.5rem' }}>
        <div className="flex items-center gap-3" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <Shield color="var(--success)" size={20} />
          <h3 className="font-bold" style={{ fontSize: '1.05rem' }}>Permissions & Roles</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Dashboard Access Level</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Viewer mode restricts adding, transferring, and deleting.</p>
          </div>
          <select
            className="input-field"
            style={{ width: '150px' }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Viewer">Viewer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Account Info */}
      <div className="glass-panel" style={{ backgroundColor: 'var(--bg-surface)', padding: '1.5rem' }}>
        <div className="flex items-center gap-3" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <Key color="var(--warning)" size={20} />
          <h3 className="font-bold" style={{ fontSize: '1.05rem' }}>Account Information</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div style={{ background: 'var(--bg-surface-hover)', borderRadius: '8px', padding: '1rem' }}>
            <div className="text-sm" style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Account ID</div>
            <div className="font-semibold account-number">{currentUser?.id || 'N/A'}</div>
          </div>
          <div style={{ background: 'var(--bg-surface-hover)', borderRadius: '8px', padding: '1rem' }}>
            <div className="text-sm" style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Member Since</div>
            <div className="font-semibold">{currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}</div>
          </div>
        </div>
        <div style={{ marginTop: '1rem', padding: '0.875rem 1rem', background: 'var(--danger-bg)', borderRadius: '8px', border: '1px solid rgba(220,38,38,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p className="font-semibold" style={{ color: 'var(--danger)' }}>Delete Account</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)', marginTop: '0.2rem' }}>Permanently delete your account and all data.</p>
          </div>
          <button className="btn" style={{ background: 'var(--danger)', color: 'white', border: 'none' }} onClick={() => alert('Account deletion would require backend confirmation.')}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
