import './css/ExpenseForm.css';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function ExpenseForm() {
    const [isReimbursable, setIsReimbursable] = useState(false);

    return (
        <div className="expenses-form-container">
            <Sidebar />
            <div className='expenses-form-content'>
                <div className="expense-form-header">
                    <h1 className="new-expenses-title">New expense</h1>
                    <Link to="/dashboard" className="close-button-nav" >
                        <button className="close-button">×</button>
                    </Link>
                </div>
                <div className="expense-form-layout">
                    <form className="expense-form">
                        <div className="form-row">
                            <label htmlFor="subject">Subject*</label>
                            <input type="text" id="subject" required />
                        </div>
                        <div className="form-row">
                            <label htmlFor="date">Date*</label>
                            <input type="date" id="date" required />
                        </div>
                        <div className="form-row">
                            <label htmlFor="total">Total*</label>
                            <div className="total-input">
                                <input className='total-input-input' type="number" id="total" required />
                            </div>
                        </div>
                        <div className="form-row checkbox-row">
                            <label htmlFor="reimbursable">
                                <input
                                    type="checkbox"
                                    id="reimbursable"
                                    checked={isReimbursable}
                                    onChange={(e) => setIsReimbursable(e.target.checked)}
                                />
                                Reimbursable
                            </label>
                        </div>
                        <div className="form-row">
                            <label htmlFor="category">Category*</label>
                            <select id="category" required>
                                <option value="">Type</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" rows="3"></textarea>
                        </div>
                        <div className="form-row">
                            <label htmlFor="employee">Employee</label>
                            <input type="text" id="employee" />
                        </div>
                    </form>
                    <div className="upload-area">
                        <div className="upload-icon">+</div>
                        <p>Upload an invoice</p>
                    </div>
                </div>
                <div className="form-actions">
                    <button type="button" className="save-draft">Save draft</button>
                    <button type="submit" className="save">Save</button>
                </div>
            </div>
        </div>
    );
}

export default ExpenseForm;
