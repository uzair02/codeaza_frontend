import React, { useState } from 'react';
import './css/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function LoginPage() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    
    e.preventDefault();
    navigate('/dashboard');
    };

  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center text-light">
    <Helmet>
        <title>Login | Codeaza Technologies</title>
    </Helmet>
      <div className="mb-3 text-info" style={{ fontSize: '2rem' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="42" viewBox="0 0 24 24">
        <path 
          fill="#00dac6" 
          stroke="#00dac6" 
          strokeWidth="0.6" 
          d="M7.308 19L4 15.692l3.308-3.307l.713.707l-2.1 2.1h6.29v1h-6.29l2.095 2.1zm7.5-2.711q-.252 0-.424-.172q-.172-.17-.172-.424q0-.253.17-.425q.172-.172.425-.172t.425.171t.172.424t-.171.425t-.424.172m3.192 0q-.253 0-.425-.17q-.172-.172-.172-.425t.171-.425t.424-.172t.425.171t.172.424t-.171.425t-.424.172m-1.309-4.673l-.713-.688l2.119-2.12h-6.31v-1h6.29l-2.093-2.1l.707-.707L20 8.308zM6.001 8.904q-.253 0-.425-.171t-.172-.424t.171-.425t.424-.172t.425.17t.172.425t-.171.425t-.424.172m3.192 0q-.252 0-.425-.171q-.172-.171-.172-.424t.171-.425t.424-.172t.425.17t.172.425t-.17.425t-.425.172"/>
      </svg>
      </div>
      <h1 className="mb-5 heading">
        <span>Codeaza</span>
        <span>Technologies</span>
      </h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="mb-3 mt-3">
          <label htmlFor="password" className="form-label label" style={{ fontSize: '0.875rem' }}>Enter password</label>
          <input 
            type="password" 
            className="form-control bg-dark text-light border-0 mb-4"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-1">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
