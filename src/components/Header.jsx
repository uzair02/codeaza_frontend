import React, { useEffect } from 'react';
import './css/Header.css';
import axios from 'axios';

function Header({ selectedYear, onYearChange }) {
  const [years, setYears] = React.useState([]);

  const handleYearChange = (event) => {
    onYearChange(parseInt(event.target.value)); // Notify parent of the selected year
  };

  useEffect(() => {
    const fetchAvailableYears = async () => {
      try {
        const response = await axios.get('http://localhost:8000/expenses/available-years');
        if (Array.isArray(response.data)) {
          setYears(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching available years:", error);
      }
    };

    fetchAvailableYears();
  }, []);

  return (
    <header className="content-header">
      <select className="year-dropdown" value={selectedYear || ''} onChange={handleYearChange}>
        <option value="">Year</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </header>
  );
}

export default Header;
