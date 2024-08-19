import React from 'react';
import { FaRegClock, FaWallet } from 'react-icons/fa';
import { IoMdAirplane } from "react-icons/io";
import { MdShoppingCartCheckout } from "react-icons/md";
import { RiExchangeDollarFill } from "react-icons/ri";
import './css/Summary.css';

function getCategoryClass(category) {
    switch (category) {
        case 'Marketing':
            return 'marketing-category';
        case 'Sales':
            return 'sales-category';
        case 'Operations':
            return 'operations-category';
        case 'Finance':
            return 'finance-category';
        default:
            return '';
    }
}

function Summary() {
  return (
    <section className="summary">
      <div className="general-summary">
        <h3>General Summary</h3>
        <ul>
          <li>
            <FaRegClock className="summary-icon me-3" />
            <span className="text">Total Spending:</span> 
            <span className="amount">PKR 1.2 Million</span>
          </li>
          <li>
            <IoMdAirplane className="summary-icon me-3" />
            <span className="text">This Month:</span> 
            <span className="amount">PKR 212.4K</span>
          </li>
          <li>
            <FaWallet className="summary-icon me-3" />
            <span className="text">Last Month:</span> 
            <span className="amount">PKR 202K</span>
          </li>
          <li>
            <MdShoppingCartCheckout className="summary-icon me-3" />
            <span className="text">This Quarter:</span> 
            <span className="amount">PKR 2312.3K</span>
          </li>
          <li>
            <RiExchangeDollarFill className="summary-icon me-3" />
            <span className="text">Last Quarter:</span> 
            <span className="amount">PKR 20K</span>
          </li>
        </ul>
      </div>
      <div className="recent-expenses">
        <h3>Recent Expenses</h3>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Added By</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Office Supplies</td>
              <td>John Smith</td>
              <td className={`category-cell ${getCategoryClass('Marketing')}`}>Marketing</td>
              <td>€150.00</td>
            </tr>
            <tr>
              <td>Office Supplies</td>
              <td>John Smith</td>
              <td className={`category-cell ${getCategoryClass('Sales')}`}>Sales</td>
              <td>€150.00</td>
            </tr>
            <tr>
              <td>Office Supplies</td>
              <td>John Smith</td>
              <td className={`category-cell ${getCategoryClass('Operations')}`}>Operations</td>
              <td>€150.00</td>
            </tr>
            <tr>
              <td>Office Supplies</td>
              <td>John Smith</td>
              <td className={`category-cell ${getCategoryClass('Marketing')}`}>Marketing</td>
              <td>€150.00</td>
            </tr>
            <tr>
              <td>Office Supplies</td>
              <td>John Smith</td>
              <td className={`category-cell ${getCategoryClass('Finance')}`}>Finance</td>
              <td>€150.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Summary;
