import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
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

const BASE_URL  = 'http://localhost:8000';

export async function fetchLast5MonthsSummary(year) {
    try {
        const response = await axios.get(`${BASE_URL}/expenses/last_5_months/${year}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching last 5 months summary:', error);
        throw error;
    }
}


export const fetchRecentExpenses = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/expenses/recent`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recent expenses:', error);
        throw error;
    }
};