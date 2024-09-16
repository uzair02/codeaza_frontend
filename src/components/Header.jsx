import React, { useEffect, useState } from 'react';
import './css/Header.css';
import { fetchAvailableYears } from '../api';

function Header({ selectedYear, onYearChange }) {
  const [years, setYears] = useState([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const availableYears = await fetchAvailableYears();
        if (Array.isArray(availableYears) && availableYears.length > 0) {
          setYears(availableYears);

          // Set the initial selected year to the first year in the list if not initialized
          if (!initialized) {
            onYearChange(availableYears[0]);
            setInitialized(true);
          }
        } else {
          console.error("Unexpected response format:", availableYears);
        }
      } catch (error) {
        console.error("Error fetching available years:", error);
      }
    };

    fetchYears();
  }, [initialized, onYearChange]);

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value);
    onYearChange(newYear); // Notify parent of the selected year
  };

  return (
    <header className="content-header">
      <select
        className="year-dropdown"
        value={selectedYear || ''}
        onChange={handleYearChange}
      >
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </header>
  );
}

export default Header;
