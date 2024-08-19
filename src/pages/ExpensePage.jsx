import React from 'react';
import Sidebar from '../components/Sidebar';
import './css/ExpensePage.css';
import { IoMdDownload, IoIosAdd } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { CgSortAz } from "react-icons/cg";
import { BsThreeDots } from "react-icons/bs";
import { Link } from 'react-router-dom';

const ExpensesPage = () => {
    const expenses = [
        { id: 1, date: '29/11/2022', description: 'McFood McFoodMcFoodMcFoodMcFo', amount: 'PKR 250.00', category: 'Food Catering', year: '2024' },
        { id: 2, date: '29/11/2022', description: 'Officio', amount: 'PKR 150.00', category: 'Office Supplies', year: '2024' },
        { id: 3, date: '11/11/2022', description: 'Restaurant Restaurant Restaurant Restaurant', amount: 'PKR 75.50', category: 'Business Lunch', year: '2024' },
        { id: 4, date: '11/11/2022', description: 'Airlines Airlines Airlines', amount: 'PKR 450.25', category: 'Travel Expenses', year: '2023' },
        { id: 5, date: '12/11/2022', description: 'Bistro', amount: 'PKR 120.00', category: 'Client Dinner', year: '2024' },
        { id: 6, date: '8/11/2022', description: 'Hotel ***', amount: 'PKR 275.75', category: 'Accommodation', year: '2023' },
        { id: 7, date: '29/11/2022', description: 'NewsTimes', amount: 'PKR 30.00', category: 'News Subscription', year: '2024' },
    ];

    return (
        <div className="expenses-page-container">
            <Sidebar />
            <div className="expenses-content">
                <div className="expenses-header">
                    <h1 className="expenses-title">Expenses</h1>
                    <div className="header-buttons">
                        <button className="export-btn">
                            <IoMdDownload className='download-icon' />
                            Export
                        </button>
                        <div className="grouped-buttons">
                            <Link to="/expenses-form" className="new-expense-btn">
                                <IoIosAdd className='download-icon' />
                                New expense
                            </Link>
                            <div className="extra-buttons">
                                <button className="filter-btn">
                                    <FaFilter className='icon' />
                                </button>
                                <button className="options-btn">
                                    <CgSortAz className='icon' />
                                </button>
                                <button className="more-btn">
                                    <BsThreeDots className='icon' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="expenses-table">
                    <thead>
                        <tr>
                            <th className='checkbox-header'><input type="checkbox" /></th>
                            <th>DETAILS</th>
                            <th>Description</th>
                            <th>AMOUNT</th>
                            <th>Date</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td className='checkbox'><input type="checkbox" /></td>
                                <td>
                                    <div className="category-container">
                                        <span className={`category-icon ${expense.category.toLowerCase().replace(' ', '-')}`}></span>
                                        <div className="text-container">
                                            <span className="date">{expense.date}</span>
                                            <span className="category-name">{expense.category}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>{expense.description}</td>
                                <td>{expense.amount}</td>
                                <td>{expense.date}</td>
                                <td><span className={`year-badge year-${expense.year}`}>{expense.year}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </div>
    );
};

export default ExpensesPage;