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
<<<<<<< HEAD
=======
          <Route path='/login' element={<LoginPage />} />
>>>>>>> 7f34442dde95cde20628db4b2958b6587fa5d542
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/expenses' element={<ExpensesPage />} />
          <Route path='/expenses-form' element={<ExpenseForm />} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App
