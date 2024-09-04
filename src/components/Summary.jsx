import React, { useEffect, useState } from 'react';
import { FaRegClock, FaWallet } from 'react-icons/fa';
import { IoMdAirplane } from "react-icons/io";
import { MdShoppingCartCheckout } from "react-icons/md";
import { RiExchangeDollarFill } from "react-icons/ri";
import { fetchRecentExpenses } from "../api";
import './css/Summary.css';

function getCategoryClass(index) {
  const categoryClasses = [
      'category-1',
      'category-2',
      'category-3',
      'category-4'
  ];
  
  return categoryClasses[index % categoryClasses.length];
}

function Summary() {
  const [recentExpenses, setRecentExpenses] = useState([]);

  useEffect(() => {
      const loadRecentExpenses = async () => {
          try {
              const expenses = await fetchRecentExpenses();
              setRecentExpenses(expenses);
          } catch (error) {
              console.error('Error loading recent expenses:', error);
          }
      };

      loadRecentExpenses();
  }, []);
  
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
          {recentExpenses.map((expense, index) => (
                  <tr key={index}>
                      <td>{expense.subject}</td>
                      <td>{expense.added_by}</td>
                      <td className={`category-cell ${getCategoryClass(index)}`}>
                          {expense.category_name}
                      </td>
                      <td>PKR {expense.amount}</td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Summary;
