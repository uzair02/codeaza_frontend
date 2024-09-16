import './css/ExpenseForm.css';
import Sidebar from '../components/Sidebar';
import { Helmet } from "react-helmet-async";
import { useState, useEffect,useRef  } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories, createExpense } from '../api';
import Swal from 'sweetalert2';

function ExpenseForm() {
    const [isReimbursable, setIsReimbursable] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [formData, setFormData] = useState({
        subject: '',
        date: '',
        amount: '',
        description: '',
        employee: '',
    });
    const [invoiceImage, setInvoiceImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categoryData = await fetchCategories();
                setCategories(categoryData);
            } catch (error) {
                console.error('Failed to load categories:', error);
                setCategories([]);
            }
        };

        loadCategories();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const expenseData = {
            category_id: selectedCategory,
            subject: formData.subject,
            expense_date: formData.date,
            amount: parseFloat(formData.amount),
            reimbursable: isReimbursable,
            description: formData.description || '',
            employee: formData.employee || '',
        };
    
        try {
            await createExpense(expenseData, invoiceImage);
    
            Swal.fire({
                title: 'Expense Created!',
                text: 'Your expense has been saved successfully.',
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                background: '#1b1b1b',
                color: '#d8fffb',
                customClass: {
                    title: 'swal2-title',
                    popup: 'swal2-popup',
                    timerProgressBar: 'green-progress-bar',
                },
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });
    
            setFormData({
                subject: '',
                date: '',
                amount: '',
                description: '',
                employee: '',
            });
            setSelectedCategory('');
            setIsReimbursable(false);
            setInvoiceImage(null);
            setImagePreviewUrl(null);
    
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
    
        } catch (error) {
            console.error('Failed to create expense:', error);
    
            let errorMessage = 'An unknown error occurred';
            let validationErrors = {};
    
            if (error.response && error.response.data && error.response.data.detail) {
                const errorDetail = error.response.data.detail;
                
                if (typeof errorDetail === 'object' && errorDetail.detail) {
                    errorMessage = errorDetail.detail;
                    
                    const errorLines = errorDetail.detail.split('\n');
                    let currentField = '';
                    
                    errorLines.forEach(line => {
                        if (line.includes('validation errors for ExpenseCreate')) {
                            return;
                        }
                        if (!line.startsWith(' ')) {
                            currentField = line.trim();
                        } else if (currentField && line.includes('[type=')) {
                            const cleanedErrorMessage = line.split('[')[0].trim();
                            validationErrors[currentField] = cleanedErrorMessage;
                        }
                    });
                } else {
                    errorMessage = errorDetail;
                }
            }

            setErrors(validationErrors);

            setTimeout(() => {
                setErrors({});
            }, 10000);
    
            Swal.fire({
                title: Object.keys(validationErrors).length > 0 ? 'Validation Error' : 'Error',
                text: "Failed to create expense. Please try again.",
                icon: 'error',
                toast: true,
                timer: 5000,
                timerProgressBar: true,
                position: 'top-end',
                showConfirmButton: false,
                background: '#1b1b1b',
                color: '#d8fffb',
                customClass: {
                    title: 'swal2-title',
                    popup: 'swal2-popup',
                    timerProgressBar: 'red-progress-bar',
                },
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
        }
    };
    
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setInvoiceImage(file);
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };


    return (
        <div className="expenses-form-container">
        <Helmet>
            <title>Expense Form | Codeaza Technologies</title>
        </Helmet>
            <Sidebar />
            <div className='expenses-form-content'>
                <div className="expense-form-header">
                    <h1 className="new-expenses-title">New expense</h1>
                    <Link to="/dashboard" className="close-button-nav" >
                        <button className="close-button">×</button>
                    </Link>
                </div>
                <div className="expense-form-layout">
                    <form className="expense-form"  onSubmit={handleSubmit}>
                        <div className="form-row">
                            <label htmlFor="subject">Subject*</label>
                            <input
                                type="text"
                                id="subject"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className={errors.subject ? 'is-invalid' : ''}
                            />
                            {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                        </div>
                        <div className="form-row">
                            <label htmlFor="date">Date*</label>
                            <input
                                type="date"
                                id="date"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className={errors.date ? 'is-invalid' : ''}
                            />
                            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                        </div>
                        <div className="form-row">
                            <label htmlFor="amount">Total*</label>
                            <div className="total-input">
                                <input
                                    className={errors.amount ? 'total-input-input is-invalid' : 'total-input-input'}
                                    type="number"
                                    id="amount"
                                    required
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                />
                                {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
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
                            <select
                                id="category"
                                required
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className={errors.category ? 'is-invalid' : ''}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.category_id} value={cat.category_id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                        </div>
                        <div className="form-row">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                rows="3"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className={errors.description ? 'is-invalid' : ''}
                            ></textarea>
                            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                        </div>
                        <div className="form-row">
                            <label htmlFor="employee">Employee</label>
                            <input
                                type="text"
                                id="employee"
                                value={formData.employee}
                                onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
                                className={errors.employee ? 'is-invalid' : ''}
                            />
                            {errors.employee && <div className="invalid-feedback">{errors.employee}</div>}
                        </div>
                        <div className="form-actions">
                            <button type="button" className="save-draft">Save draft</button>
                            <button type="submit" className="save">Save</button>
                        </div>
                    </form>
                    <div className="upload-area" onClick={triggerFileInput}>
                        {imagePreviewUrl ? (
                            <img
                                src={imagePreviewUrl}
                                alt="Invoice Preview"
                                className="invoice-preview"
                            />
                        ) : (
                            <>
                                <div className="upload-icon">+</div>
                                <p>Upload an invoice</p>
                            </>
                        )}
                        <input
                            type="file"
                            id="invoice_image"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ExpenseForm;