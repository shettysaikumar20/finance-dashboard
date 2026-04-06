import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Charts from './components/Charts';
import Insights from './components/Insights';
import Transfers from './components/Transfers';
import Cards from './components/Cards';
import Settings from './components/Settings';
import { ProtectedRoute, PublicRoute } from './context/AuthContext';

// The dashboard shell layout (sidebar + header + content)
const DashboardLayout = ({ children }) => (
  <div className="app-container" style={{ position: 'relative', backgroundColor: '#040d1a', color: 'white', minHeight: '100vh', overflow: 'hidden' }}>
    {/* Animated Background Elements */}
    <div className="home-grid-bg"></div>
    <div className="home-orb home-orb-1"></div>
    <div className="home-orb home-orb-2"></div>
    <div className="home-orb home-orb-3"></div>
    
    <div style={{ display: 'flex', position: 'relative', zIndex: 1, height: '100vh', width: '100%' }}>
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      {/* Public landing page */}
      <Route path="/" element={<Home />} />

      {/* Auth pages — redirect to dashboard if already logged in */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Protected dashboard routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <div className="animate-fade-in" style={{ height: 'calc(100vh - 120px)' }}>
                <Transactions />
              </div>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/transfers"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Transfers />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/cards"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Cards />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <div className="dashboard-grid animate-fade-in" style={{ height: 'calc(100vh - 120px)' }}>
                <div className="col-span-8 h-full"><Charts /></div>
                <div className="col-span-4 h-full"><Insights /></div>
              </div>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch-all: redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
