import React from 'react';
import { NavLink } from 'react-router-dom';
import Dp from '../assets/profile.jpg';
import { FaHome, FaRegCreditCard  } from 'react-icons/fa';
import './css/Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="profile">
        <img src={Dp} alt="Mobeen Chandler" />
        <h2>Mobeen Chandler</h2>
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
