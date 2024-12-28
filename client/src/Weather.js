import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get('http://localhost:5001/preferences');
        setCity(response.data.city);
        setTemperatureUnit(response.data.temperatureUnit);
      } catch (err) {
        console.error('Error fetching preferences:', err);
      }
    };
    fetchPreferences();
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5001/weather?city=${city}`);
      setWeatherData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Could not fetch weather data');
      setWeatherData(null);
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    try {
      await axios.post('http://localhost:5001/preferences', { city, temperatureUnit });
      alert('Preferences saved!');
    } catch (err) {
      alert('Error saving preferences');
    }
  };

  const convertTemperature = (temp, unit) => {
    if (unit === 'Fahrenheit') {
      return ((temp * 9/5) + 32).toFixed(1);
    }
    return temp.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Weather Dashboard</h1>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 w-full rounded-l-lg border border-gray-300"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition"
          >
            Get Weather
          </button>
        </div>
        <div className="flex mb-4">
          <label className="mr-2">Temperature Unit: </label>
          <select
            value={temperatureUnit}
            onChange={(e) => setTemperatureUnit(e.target.value)}
            className="p-3 border rounded"
          >
            <option value="Celsius">Celsius</option>
            <option value="Fahrenheit">Fahrenheit</option>
          </select>
        </div>
        <button
          onClick={savePreferences}
          className="bg-green-500 text-white p-3 rounded mt-4 hover:bg-green-600 transition"
        >
          Save Preferences
        </button>
        {loading && (
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {weatherData && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800">{weatherData.city}, {weatherData.country}</h2>
            <div className="flex overflow-x-auto space-x-4 mt-4">
              {weatherData.forecasts.map((forecast, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md min-w-[200px]">
                  <p className="text-xl font-semibold">{new Date(forecast.date).toLocaleString()}</p>
                  <p>Temperature: {convertTemperature(forecast.temperature, temperatureUnit)}°{temperatureUnit === "Celsius" ? "C" : "F"}</p>
                  <p>Description: {forecast.description}</p>
                  <img
                    className="mx-auto"
                    src={`http://openweathermap.org/img/wn/${forecast.icon}.png`}
                    alt={forecast.description}
                  />
                  <p>Humidity: {forecast.humidity}%</p>
                  <p>Wind Speed: {forecast.windSpeed} m/s</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;