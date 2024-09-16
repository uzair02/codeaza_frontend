import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export async function fetchLast5MonthsSummary(year) {
    try {
        const response = await api.get(`/expenses/last_5_months/${year}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching last 5 months summary:', error);
        throw error;
    }
}

export const fetchRecentExpenses = async () => {
    try {
        const response = await api.get(`/expenses/recent`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recent expenses:', error);
        throw error;
    }
};

export const fetchCategories = async () => {
    try {
        const response = await api.get(`/categories/active`);
        const data = response.data;
        if (Array.isArray(data)) {
            return data;
        } else {
            throw new Error('Response data is not an array');
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const createExpense = async (expenseData, invoiceImage) => {
    try {
        const formData = new FormData();
        formData.append('expense', JSON.stringify(expenseData));

        if (invoiceImage) {
            formData.append('invoice_image', invoiceImage);
        }


        const response = await api.post('/expenses', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating expense:', error);
        throw error;
    }
};


export const fetchExpenses = async (page = 1, size = 7, subject = '', expenseDate = '', reimbursable = '', employee = '', sortOrder = 'desc') => {
    try {
        const response = await api.get('/expenses', {
            params: {
                page,
                size,
                subject: subject || undefined,
                expense_date: expenseDate || undefined,
                reimbursable: reimbursable === '' ? undefined : reimbursable,
                employee: employee || undefined,
                sort_order: sortOrder,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;
    }
};

export async function fetchAllExpenses() {
    const response = await api.get('/expenses/all');
  
    const data = await response.data;
    return data;
  }

