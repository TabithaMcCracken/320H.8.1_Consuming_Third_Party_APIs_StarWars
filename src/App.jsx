// src/App.js

import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { getAllStarships } from './services/sw-api';

function App() {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStarships() {
      try {
        const starships = await getAllStarships();
        setStarships(starships);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchStarships();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App">
      <NavBar />
      <div className="starship-list">
        {starships.map((starship) => (
          <div key={starship.name} className="starship-card">
            <h2>{starship.name}</h2>
            <p>Model: {starship.model}</p>
            <p>Manufacturer: {starship.manufacturer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
