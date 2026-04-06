import React from 'react';
import { User, Bell, Palette, Shield } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

const Settings = () => {
  const { theme, toggleTheme, role, setRole } = useDashboard();

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '2rem', maxWidth: '800px' }}>
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
      
      <div className="glass-panel p-6 mb-6" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="flex items-center gap-3 mb-4 border-b pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <Palette color="var(--primary)" />
          <h3 className="font-bold text-lg">Appearance</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Theme Preference</p>
            <p className="text-sm text-muted">Switch between Light and Dark mode for comfort.</p>
          </div>
          <button className="btn btn-outline" onClick={toggleTheme}>
            Current: {theme.charAt(0).toUpperCase() + theme.slice(1)} Mode
          </button>
        </div>
      </div>

      <div className="glass-panel p-6 mb-6" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="flex items-center gap-3 mb-4 border-b pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <Shield color="var(--success)" />
          <h3 className="font-bold text-lg">Permissions & Roles</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Dashboard Access</p>
            <p className="text-sm text-muted">Viewer mode restricts Adding/Transferring/Deleting.</p>
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

      <div className="glass-panel p-6" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="flex items-center gap-3 mb-4 border-b pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <User color="var(--info)" />
          <h3 className="font-bold text-lg">Profile Information</h3>
        </div>
        <form className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-secondary mb-1 block">First Name</label>
            <input type="text" className="input-field" defaultValue="John" />
          </div>
          <div>
            <label className="text-sm font-semibold text-secondary mb-1 block">Last Name</label>
            <input type="text" className="input-field" defaultValue="Doe" />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-semibold text-secondary mb-1 block">Email Address</label>
            <input type="email" className="input-field" defaultValue="john.doe@nationalbank.com" />
          </div>
          <div className="col-span-2 mt-2">
            <button type="button" className="btn btn-primary">Save Profile Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
