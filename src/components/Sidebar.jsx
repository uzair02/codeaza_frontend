import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Dp from '../assets/profile.jpg';
import { FaHome, FaRegCreditCard  } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import './css/Sidebar.css';

function Sidebar() {
  const [ username, setUsername ] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.sub) {
          setUsername(decodedToken.sub);
        } else {
          console.error('Subject (sub) not found in decoded token');
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    } else {
      console.error('No token found in localStorage');
    }
  }, []);

  return (
    <aside className="sidebar">
      <div className="profile">
        <img src={Dp} alt={username || 'Mobeen Chandler'} />
        <h2>{username || 'Admin'}</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}
            >
              <FaHome className="icon" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/expenses" 
              className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}
            >
              <FaRegCreditCard  className="icon" /> Expenses
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="brand">
        <h3>CODEAZA</h3>
      </div>
    </aside>
  );
}

export default Sidebar;
