



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

export default api;

// export async function fetchLast5MonthsSummary() {
//     try {
//       const response = await axios.get(`${BASE_URL}/expenses/last-5-months-summary`); // Adjust the endpoint as necessary
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching last 5 months summary:', error);
//       throw error;
//     }
//   }