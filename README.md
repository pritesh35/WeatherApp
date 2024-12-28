# Weather Dashboard

A weather dashboard application built with React and Node.js. It fetches weather data from the OpenWeatherMap API and allows users to save their preferences for city and temperature unit. The backend is powered by Express and MongoDB.

## Features

- Fetches weather data for a specified city
- Displays weather forecasts including temperature, description, humidity, and wind speed
- Allows users to save their preferences for city and temperature unit
- Uses MongoDB to store user preferences

## Prerequisites

- Node.js
- MongoDB
- OpenWeatherMap API key

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/pritesh35/WeatherApp.git
   cd weather-dashboard

2. Install server dependencies:
npm install

3. Install client dependencies:
cd client
npm install
cd ..

4. Create a .env file in the root directory and add your MongoDB URI and OpenWeatherMap API key:
MONGODB_URI=mongodb://localhost:27017/weatherapp
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key

## Usage
1. Start the MongoDB server:
   mongod
2. start the backend server:
   npm start
3. Start the React development server:
   cd client
   npm start

Open your browser and go to http://localhost:3000 to see the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.
