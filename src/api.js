
const BaseUrl = 'http://localhost:8000';

export async function fetchLast5MonthsSummary() {
  try {
    const response = await axios.get(`${BASE_URL}/expenses/last-5-months-summary`); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    console.error('Error fetching last 5 months summary:', error);
    throw error;
  }
}
