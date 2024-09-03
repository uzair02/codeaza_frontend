import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/LoginPage';
import ExpensesPage from './pages/ExpensePage';
import ExpenseForm from './pages/ExpenseForm';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/expenses' element={<ExpensesPage />} />
          <Route path='/expenses-form' element={<ExpenseForm />} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App
