const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Require the Preference model
const Preference = require('./models/Preference');

// Preferences Routes
app.get('/preferences', async (req, res) => {
  try {
    const preferences = await Preference.findOne();
    res.json(preferences || { city: 'Mumbai', temperatureUnit: 'Celsius' });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch preferences" });
  }
});

app.post('/preferences', async (req, res) => {
  const { city, temperatureUnit } = req.body;
  try {
    const preferences = await Preference.findOneAndUpdate(
      {},
      { city, temperatureUnit },
      { new: true, upsert: true }
    );
    res.json(preferences);
  } catch (err) {
    res.status(500).json({ error: "Failed to save preferences" });
  }
});

// Weather Route (GET /weather)
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const weatherData = {
      city: data.city.name,
      country: data.city.country,
      forecasts: data.list.slice(0, 5).map(forecast => ({
        date: forecast.dt_txt,
        temperature: forecast.main.temp,
        description: forecast.weather[0].description,
        icon: forecast.weather[0].icon,
        humidity: forecast.main.humidity,
        windSpeed: forecast.wind.speed,
      })),
    };

    res.json(weatherData);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});