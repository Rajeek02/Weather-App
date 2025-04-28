import { useState } from 'react';
import cloud from './images/cloud.jpg';
import logo from './images/logo.png';

import axios from 'axios';

function App() {
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [hum, setHum] = useState("");
  const [wind, setWind] = useState("");
  const [degree, setDegree] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState(false);  // For "City not found"

  function handleCity(evt) {
    setCity(evt.target.value);
  }

  async function handleWeather() {
    if (city === "") return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bd4e8a260debbf50184a00b685d7a88a&units=metric`
      );

      setDegree(Math.round(response.data.main.temp));
      setLat(response.data.coord.lat);
      setLon(response.data.coord.lon);
      setHum(response.data.main.humidity);
      setWind((response.data.wind.speed * 3.6).toFixed(2));
      setCountry(response.data.name);
      setError(false); // City found, no error

    } catch (error) {
      console.error("Error fetching weather:", error);
      setError(true);  // City not found
      setDegree("");
      setLat("");
      setLon("");
      setHum("");
      setWind("");
      setCountry("");
    }
    setCity(""); // Clear input after search
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleWeather();
    }
  }

  return (
    <div className="relative w-full h-screen">
      {/* Background */}
      <img
        src={cloud}
        alt="Background"
        className="absolute w-full h-full object-cover"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center pt-10">

        {/* Search Bar with "Search" button */}
        <div className="flex items-center bg-transparent border-4 border-blue-500 rounded-full px-4 py-2">
          <input
            value={city}
            onChange={handleCity}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Enter city name"
            className="bg-transparent text-xl text-blue-900 font-bold placeholder-blue-800 focus:outline-none w-64"
          />
          <button
            onClick={handleWeather}
            className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full focus:outline-none transition-all duration-300"
          >
            Search
          </button>
        </div>

        {/* Error or Weather Info */}
        {error ? (
          <h1 className="text-3xl font-bold text-black mt-10">City not found</h1>
        ) : (
          <>
            {/* Weather Icon */}
            <img src={logo} alt="Weather Icon" className="w-28 h-28 mt-8" />

            {/* Temperature and Country */}
            <div className="text-center mt-4">
              <h1 className="text-4xl font-bold text-black">{degree && `${degree}°C`}</h1>
              <h2 className="text-3xl font-bold text-yellow-500">{country.toUpperCase()}</h2>
            </div>

            {/* Latitude and Longitude */}
            <div className="flex space-x-16 mt-8">
              <div className="text-center">
                <h3 className="text-black font-bold">Latitude</h3>
                <p className="text-2xl font-bold">{lat}</p>
              </div>
              <div className="text-center">
                <h3 className="text-black font-bold">Longitude</h3>
                <p className="text-2xl font-bold">{lon}</p>
              </div>
            </div>

            {/* Humidity and Wind */}
            <div className="flex space-x-20 mt-8">
              <div className="flex flex-col items-center">
                <i className="fa-solid fa-water text-4xl text-black mb-2"></i>
                <h3 className="text-2xl font-bold">{hum}%</h3>
                <p className="text-black font-semibold">Humidity</p>
              </div>
              <div className="flex flex-col items-center">
                <i className="fa-solid fa-wind text-4xl text-black mb-2"></i>
                <h3 className="text-2xl font-bold">{wind} km/h</h3>
                <p className="text-black font-semibold">Wind Speed</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
