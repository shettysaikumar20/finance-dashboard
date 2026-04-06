import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Charts from './components/Charts';
import Insights from './components/Insights';
import Transfers from './components/Transfers';
import Cards from './components/Cards';
import Settings from './components/Settings';
import { useDashboard } from './context/DashboardContext';

function App() {
  const { activeTab } = useDashboard();

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <Dashboard />;
      case 'Transactions':
        return (
          <div className="animate-fade-in" style={{ height: 'calc(100vh - 120px)' }}>
            <Transactions />
          </div>
        );
      case 'Analytics':
        return (
          <div className="dashboard-grid animate-fade-in" style={{ height: 'calc(100vh - 120px)' }}>
            <div className="col-span-8 h-full">
              <Charts />
            </div>
            <div className="col-span-4 h-full">
              <Insights />
            </div>
          </div>
        );
      case 'Transfers':
        return <Transfers />;
      case 'Cards':
        return <Cards />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="page-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
