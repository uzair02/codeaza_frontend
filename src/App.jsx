import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/LoginPage';
import ExpensesPage from './pages/ExpensePage';
import ExpenseForm from './pages/ExpenseForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/expenses' element={<ExpensesPage />} />
        <Route path='/expenses-form' element={<ExpenseForm />} />
      </Routes>
    </Router>
  )
}

export default App
