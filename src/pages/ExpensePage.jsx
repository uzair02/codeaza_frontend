
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './css/ExpensePage.css';
import { IoMdDownload, IoIosAdd } from "react-icons/io";
import { Helmet } from "react-helmet-async";
import { FaFilter } from "react-icons/fa";
import { CgSortAz } from "react-icons/cg";
import { BsThreeDots } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { getExpenses } from '../api';

// Define a list of distinct dark colors
const colorPalette = [
    '#FF5733', // Dark Red
    '#33FF57', // Dark Green
    '#3357FF', // Dark Blue
    '#F1C40F', // Dark Yellow
    '#9B59B6', // Dark Purple
    '#E67E22', // Dark Orange
    '#1ABC9C', // Dark Teal
];

// Generate a color index based on the index of the expense
const getColorIndex = (index) => {
    return index % colorPalette.length;
};

const ExpensesPage = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(7);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const params = {
                    page: currentPage,
                    size: pageSize,
                    search: searchTerm,
                    sort_order: sortOrder
                };
                const data = await getExpenses(params);
                setExpenses(data.items);
                setTotalPages(Math.ceil(data.total / pageSize));
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchExpenses();
    }, [searchTerm, sortOrder, currentPage, pageSize]);

    const handleSortToggle = () => {
        setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc');
    };

    const handleFilterToggle = () => {
        setFilterVisible(prevVisible => !prevVisible);
    };
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (event) => {
        const newSize = Number(event.target.value);
        setPageSize(newSize);
        setCurrentPage(1);  // Reset to first page when changing page size
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading expenses</p>;

    return (
        <div className="expenses-page-container">
            <Helmet>
                <title>Expense | Codeaza Technologies</title>
            </Helmet>
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
                                <button className="filter-btn" onClick={handleFilterToggle}>
                                    <FaFilter className='icon' />
                                </button>
                                <button className="options-btn" onClick={handleSortToggle}>
                                    <CgSortAz className='icon' />
                                </button>
                                <button className="more-btn">
                                    <BsThreeDots className='icon' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {filterVisible && (
                    <div className="search-bar-container">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search expenses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                )}
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
                        {expenses.map((expense, index) => {
                            const color = colorPalette[getColorIndex(index)];

                            return (
                                <tr key={expense.expenses_id}>
                                    <td className='checkbox'><input type="checkbox" /></td>
                                    <td>
                                        <div className="category-container">
                                            <span className="category-icon" style={{ backgroundColor: color }}></span>
                                            <div className="text-container">
                                                <span className="date">{expense.expense_date}</span>
                                                <span className="category-name">{expense.subject}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{expense.description}</td>
                                    <td>{expense.amount}</td>
                                    <td>{expense.expense_date}</td>
                                    <td><span className={`year-badge year-${new Date(expense.expense_date).getFullYear()}`}>{new Date(expense.expense_date).getFullYear()}</span></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="pagination-controls">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                    <select
                        value={pageSize}
                        onChange={handlePageSizeChange}
                    >
                        <option value="7">7 per page</option>
                        <option value="14">14 per page</option>
                        <option value="21">21 per page</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ExpensesPage;


