import React, { useState } from 'react';
import axios from 'axios';

const Main = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState('');
  
  const key = process.env.REACT_APP_WEATHER_API_KEY;


  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    
    try {
      const response = await axios.get(url);
      const w = response.data;
      const description = w.weather[0].description.toLowerCase(); 
      let o;
      
      if (w.main.temp > 35) {
        o = 's1';  
      } else if (w.main.temp > 30) {
        o = 'cs1';  
      } else if (w.main.temp > 20) {
        o = 'rain'; 
      } else if (w.main.temp > 15) {
        o = 'rain2';  
      } else {
        o = 'mist';  
      }

      setWeather(w);
      setImage(o);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('City not found');
      setWeather(null);
      setImage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-gray-800 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-bold text-center mb-4">Weather Search</h1>
          <div className="flex items-center w-full">
            <i className="fa-solid fa-location-dot text-blue-400"></i>
            <input
              type="text"
              name="city"
              id="box"
              placeholder="Enter location"
              className="ml-2 p-2 rounded border w-full bg-gray-700 text-white"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">Search</button>
        </form>

        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {weather && (
          <div className="mt-6 w-full slide-down">
            <div className="text-center">
              <img src={`img/${image}.png`} className="mx-auto" alt="Weather Icon" />
              <h4 className="text-blue-400 text-xl">{weather.weather[0].description}</h4>
              <p className="text-3xl text-gray-100">{weather.main.temp} °C</p>
            </div>

            <div className="flex justify-around mt-6 text-gray-400">
              <div className="text-center">
                <i className="fa-solid fa-wind text-gray-500"></i>
                <p className="text-lg">{weather.wind.speed} Km/hr</p>
                <h6 className="text-sm">Wind Speed</h6>
              </div>
              <div className="text-center">
                <i className="bi bi-droplet-fill text-blue-400"></i>
                <p className="text-lg">{weather.main.humidity} %</p>
                <h6 className="text-sm">Humidity</h6>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
