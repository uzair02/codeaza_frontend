import React from 'react';
import './css/Header.css';

function Header() {
  return (
    <header className="content-header">
      <select className="year-dropdown">
        <option value="year" selected>Year</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
      </select>
    </header>
  );
}

export default Header;
