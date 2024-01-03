

import React, { useState, useEffect } from 'react'
import './App.css';
const api = {
  key: "4ee5ae46cdd6d48017324408dd550ccb",
  base: "https://api.openweathermap.org/data/2.5/",
}

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  }
  useEffect(() => {
    const fetchWeather = async () => {
      if (!searchCity) return;
      setLoading(true);
      //Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(`${data.name}, ${data.sys.country} ${data.weather[0].description}, ${data.main.temp}`);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message)
        }

      } catch (error) {
        setErrorMessage(error.message)
      }
      setLoading(false);
    }
    fetchWeather();

  }, [searchCity])

  return (
    <>
      <header className="app-header">Weather App</header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button>Search</button>
      </form>

      {loading ? (<div>Loading...</div>) : (
        <>
          {errorMessage ? (<div style={{ color: "red" }}>{errorMessage}</div>) : (<div>{weatherInfo}</div>)}
        </>
      )}

    </>
  );
}

export default App;
