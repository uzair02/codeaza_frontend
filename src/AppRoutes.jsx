import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/LoginPage';
import ExpensesPage from './pages/ExpensePage';
import ExpenseForm from './pages/ExpenseForm';
import useIdleTimeout from './hooks/useIdleTimeout';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

const AppRoutes = () => {
  useIdleTimeout();

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
      <Route path="/expenses" element={<PrivateRoute element={ExpensesPage} />} />
      <Route path="/expenses-form" element={<PrivateRoute element={ExpenseForm} />} />
    </Routes>
  );
};

export default AppRoutes;
