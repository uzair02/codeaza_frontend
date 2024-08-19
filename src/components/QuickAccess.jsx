import React from 'react';
import './css/QuickAccess.css';
import { FaRegCreditCard } from 'react-icons/fa';
import { PiNotepadBold } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import { IoMdAirplane } from "react-icons/io";
import { Link } from 'react-router-dom';

function QuickAccess() {
  return (
    <section className="quick-access">
      <h3>Quick Access</h3>
      <div className="buttons">
        <Link to="/expenses-form" className='new-expense'>
          <button>
            <div className="icon-container icon1">
              <FaRegCreditCard className="icon" />
            </div>
            + New Expense
          </button>
        </Link>
        <button>
          <div className="icon-container icon2">
            <PiNotepadBold className="icon" />
          </div>
          + Create Team
        </button>
        <button>
          <div className="icon-container icon3">
            <IoDocumentText className="icon" />
          </div>
          + Create Category
        </button>
        <button>
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
