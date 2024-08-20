import React from 'react';
import './css/QuickAccess.css';
import { FaRegCreditCard } from 'react-icons/fa';
import { PiNotepadBold } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import { IoMdAirplane } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function QuickAccess() {
  const navigate = useNavigate();

  return (
    <section className="quick-access">
      <h3>Quick Access</h3>
      <div className="buttons">
        <button onClick={() => navigate('/expenses-form')}>
          <div className="icon-container icon1">
            <FaRegCreditCard className="icon" />
          </div>
          + New Expense
        </button>
        <button onClick={() => navigate('/create-team')}>
          <div className="icon-container icon2">
            <PiNotepadBold className="icon" />
          </div>
          + Create Team
        </button>
        <button onClick={() => navigate('/create-category')}>
          <div className="icon-container icon3">
            <IoDocumentText className="icon" />
          </div>
          + Create Category
        </button>
        <button onClick={() => navigate('/create-team')}>
          <div className="icon-container icon4">
            <IoMdAirplane className="icon" />
          </div>
          + Create Team
        </button>
      </div>
    </section>
  );
}

export default QuickAccess;
