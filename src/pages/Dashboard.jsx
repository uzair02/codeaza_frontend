import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Summary from '../components/Summary';
import QuickAccess from '../components/QuickAccess';
import Insights from '../components/Insights';
import './css/Dashboard.css';

function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(null);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className="dashboard-container">
      <Helmet>
        <title>Dashboard | Codeaza Technologies</title>
      </Helmet>
      <Sidebar />
      <main className="dashboard-content">
        <Header selectedYear={selectedYear} onYearChange={handleYearChange} />
        <div className="component-summary">
          <Summary year={selectedYear} />
        </div>
        <div className="component-quickaccess">
          <QuickAccess />
        </div>
        <div className="component-insights">
          <Insights year={selectedYear} />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
