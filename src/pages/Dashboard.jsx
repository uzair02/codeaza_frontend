import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Summary from '../components/Summary';
import QuickAccess from '../components/QuickAccess';
import Insights from '../components/Insights';
import './css/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-content">
        <Header />
        <div className="component-summary">
          <Summary />
        </div>
        <div className="component-quickaccess">
          <QuickAccess />
        </div>
        <div className="component-insights">
          <Insights />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
