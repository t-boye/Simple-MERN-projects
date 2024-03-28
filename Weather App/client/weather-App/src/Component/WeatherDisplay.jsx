import React from 'react';

const WeatherDisplay = ({ weather }) => {
  return (
    <div className="flex text-center">
      <h2 className="text-xl font-bold mb-4">Weather for {weather.city}</h2>
      <p className="text-lg">Temperature: {weather.temperature}°C</p>
      <p className="text-lg">Humidity: {weather.humidity}%</p>
      <p className="text-lg">Wind Speed: {weather.windSpeed} km/h</p>
      <p className="text-lg">Condition: {weather.condition}</p>
    </div>
  );
};

export default WeatherDisplay;
