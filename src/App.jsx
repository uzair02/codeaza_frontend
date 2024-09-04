import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext'; // Adjust path as needed
import { Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/LoginPage';
import ExpensesPage from './pages/ExpensePage';
import ExpenseForm from './pages/ExpenseForm';
import { useAuth } from './context/AuthContext';

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

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/dashboard' element={<PrivateRoute element={Dashboard} />} />
            <Route path='/expenses' element={<PrivateRoute element={ExpensesPage} />} />
            <Route path='/expenses-form' element={<PrivateRoute element={ExpenseForm} />} />
          </Routes>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
