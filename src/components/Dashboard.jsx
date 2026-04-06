import React from 'react';
import SummaryCards from './SummaryCards';
import Charts from './Charts';
import Transactions from './Transactions';
import Insights from './Insights';
import { useDashboard } from '../context/DashboardContext';

const Dashboard = () => {
  const { role } = useDashboard();

  return (
    <div style={{ paddingBottom: '2rem' }}>
      <div className="flex justify-between items-center mb-6 animate-fade-in">
        <div>
          <h2 className="text-2xl font-bold">Accounts & Activity</h2>
          <p className="text-muted text-sm mt-1">Primary Checking Account Dashboard</p>
        </div>
        
        <div className="flex gap-4">
          <div className="badge badge-primary gap-2 p-2">
            <span style={{ 
              width: '8px', height: '8px', borderRadius: '50%', 
              backgroundColor: role === 'Admin' ? 'var(--warning)' : 'var(--primary)' 
            }}></span>
            {role} Privileges
          </div>
        </div>
      </div>

      <SummaryCards />

      <div className="dashboard-grid">
        <div className="col-span-8">
          <Charts />
        </div>
        <div className="col-span-4">
          <Insights />
        </div>
        
        <div className="col-span-12 mt-4" style={{ height: '500px' }}>
          <Transactions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
