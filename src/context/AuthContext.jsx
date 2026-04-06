import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('finance_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Register: store user in localStorage (list of users)
  const register = (name, email, password) => {
    setAuthError('');
    const users = JSON.parse(localStorage.getItem('finance_users') || '[]');
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      setAuthError('An account with this email already exists.');
      return false;
    }
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password, // In production this would be hashed
      createdAt: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      role: 'Admin',
      balance: 50000.00,
      accountNumber: `****${Math.floor(1000 + Math.random() * 9000)}`,
    };
    users.push(newUser);
    localStorage.setItem('finance_users', JSON.stringify(users));
    const { password: _, ...safeUser } = newUser;
    setCurrentUser(safeUser);
    localStorage.setItem('finance_user', JSON.stringify(safeUser));
    return true;
  };

  // Login: verify credentials from localStorage
  const login = (email, password) => {
    setAuthError('');
    const users = JSON.parse(localStorage.getItem('finance_users') || '[]');
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      setAuthError('Invalid email or password. Please try again.');
      return false;
    }
    const { password: _, ...safeUser } = user;
    setCurrentUser(safeUser);
    localStorage.setItem('finance_user', JSON.stringify(safeUser));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('finance_user');
  };

  const clearError = () => setAuthError('');

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, loading, authError, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route component
export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Public Route - redirect to dashboard if already logged in
export const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};
