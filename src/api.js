import axios from 'axios';

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
