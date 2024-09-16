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
const BASE_URL = 'http://localhost:8000';

export async function fetchAvailableYears() {
  try {
    const response = await api.get(`${BASE_URL}/expenses/available-years`);
    return response.data;
  } catch (error) {
    console.error('Error fetching available years:', error);
    throw error;
  }
}

export async function fetchGeneralSummary(year) {
  try {
    const response = await api.get(`${BASE_URL}/expenses/general-summary`, {
      params: { year },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching general summary:', error);
    throw error;
  }
}

export async function fetchExpensesByCategory(year) {
  try {
    const response = await api.get(`${BASE_URL}/expenses/by-category`, { params: { year } });
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses by category:', error);
    throw error;
  }
};

export const getExpenses = async (params) => {
  try {
    const response = await api.get('/expenses', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};


