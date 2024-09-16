import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './css/ExpensePage.css';
import Swal from 'sweetalert2';
import { IoMdDownload, IoIosAdd } from "react-icons/io";
import { Helmet } from "react-helmet-async";
import { FaFilter } from "react-icons/fa";
import { CgSortAz } from "react-icons/cg";
import { BsThreeDots } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { fetchExpenses, fetchAllExpenses } from '../api';
import { saveAs } from 'file-saver';

const ExpensesPage = () => {
    const [expenses, setExpenses] = useState([]);
    const [allExpenses, setAllExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedExpenseIds, setSelectedExpenseIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const colors = ['#FF6347', '#4682B4', '#32CD32', '#FFD700', '#8A2BE2', '#FF69B4', '#FF4500'];

    useEffect(() => {
        const getExpenses = async () => {
            try {
                const response = await fetchExpenses();
                const assignedExpenses = response.items.map((expense, index) => ({
                    ...expense,
                    color: colors[index % colors.length]
                }));
                setExpenses(assignedExpenses);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            } finally {
                setLoading(false);
            }
        };
        getExpenses();
    }, []);

    useEffect(() => {
        const fetchAndSetAllExpenses = async () => {
            try {
                const allExpensesResponse = await fetchAllExpenses();
                const assignedExpenses = allExpensesResponse.map((expense, index) => ({
                    ...expense,
                    color: colors[index % colors.length]
                }));
                setAllExpenses(assignedExpenses);
            } catch (error) {
                console.error('Error fetching all expenses:', error);
            }
        };
        fetchAndSetAllExpenses();
    }, []);

    const handleCheckboxChange = (expenseId) => {
        setSelectedExpenseIds((prevSelected) => {
            const isSelected = prevSelected.includes(expenseId);
            if (isSelected) {
                return prevSelected.filter(id => id !== expenseId);
            } else {
                return [...prevSelected, expenseId];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedExpenseIds([]);
        } else {
            const allIds = allExpenses.map(expense => expense.expenses_id);
            setSelectedExpenseIds(allIds);
        }
        setSelectAll(!selectAll);
    };

    useEffect(() => {
        if (allExpenses.length === 0) return;
        
        const allIds = allExpenses.map(expense => expense.expenses_id);
        const isAllSelected = selectedExpenseIds.length === allIds.length;
        setSelectAll(isAllSelected);
    }, [selectedExpenseIds, allExpenses]);

    const handleExport = async () => {
        if (selectedExpenseIds.length === 0) {
            Swal.fire({
                title: 'No Records Selected',
                text: 'Please select some records before exporting.',
                icon: 'warning',
                confirmButtonText: 'OK',
                background: '#0b0b0b',
                color: '#d8fffb',
            });
            return;
        }

        try {
            setLoading(true);
            const selectedExpenses = allExpenses.filter(expense => selectedExpenseIds.includes(expense.expenses_id));
            const csvContent = [
                ["Subject", "Date", "Description", "Amount", "Reimbursable", "Employee", "Year"],
                ...selectedExpenses.map(expense => [
                    `"${expense.subject}"`,
                    `"${formatDate(expense.expense_date)}"`,
                    `"${expense.description}"`,
                    `"${expense.amount}"`,
                    `"${expense.reimbursable}"`,
                    `"${expense.employee}"`,
                    `"${new Date(expense.expense_date).getFullYear()}"`,
                ])
            ].map(e => e.join(",")).join("\n");

            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            saveAs(blob, "expenses.csv");
        } catch (error) {
            console.error('Error exporting expenses:', error);
            Swal.fire({
                title: 'Export Error',
                text: 'An error occurred while exporting expenses. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
                background: '#0b0b0b',
                color: '#d8fffb',
            });
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Invalid Date';
        
        const date = new Date(dateString);
        
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            timeZone: 'UTC'
        });
    };

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
                        <button className="export-btn" onClick={handleExport}>
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
                {loading ? (
                    <p>Loading expenses...</p>
                ) : (
                    <table className="expenses-table">
                        <thead>
                            <tr>
                                <th className='checkbox-header'>
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th>DETAILS</th>
                                <th>Description</th>
                                <th>AMOUNT</th>
                                <th>Date</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense) => (
                                <tr key={expense.expenses_id}>
                                    <td className='checkbox'>
                                        <input
                                            type="checkbox"
                                            checked={selectedExpenseIds.includes(expense.expenses_id)}
                                            onChange={() => handleCheckboxChange(expense.expenses_id)}
                                        />
                                    </td>
                                    <td>
                                        <div className="category-container">
                                            <span className="category-icon" style={{ backgroundColor: expense.color }}></span>
                                            <div className="text-container">
                                                <span className="date">{expense.expense_date}</span>
                                                <span className="category-name">{expense.subject}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{expense.description}</td>
                                    <td>Rs {expense.amount}</td>
                                    <td>{formatDate(expense.expense_date)}</td>
                                    <td>{new Date(expense.expense_date).getFullYear()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ExpensesPage;
