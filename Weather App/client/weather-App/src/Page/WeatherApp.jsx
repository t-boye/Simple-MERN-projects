import React, { useState } from "react";
import InputForm from "../Component/InputForm";
import WeatherDisplay from "../Component/WeatherDisplay";
import ErrorComponent from "../Component/ErrorComponent";
import LoadingSpinner from "../Component/LoadingSpinner";
import APIService from "../Component/APIService";

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError(null);
    try {
      const data = await APIService.getWeatherData(location);
      setWeather(data);
    } catch (error) {
      setError("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (location) => {
    await fetchWeatherData(location);
  };

  return (
    <div className="container mx-auto px-4 py-2">
      {" "}
      {/* Add spacing for content */}
      <h1 className="text-3xl font-bold  py-4 text-center mb-6">Weather App</h1>
      <InputForm
        onSubmit={handleSubmit}
        className="mt-4 bg-white p-4 rounded-lg shadow-md"
      />
      {loading && (
        <LoadingSpinner className="w-full h-screen fixed inset-0 z-50 bg-white opacity-75 flex justify-center items-center" />
      )}
      {error && (
        <ErrorComponent
          message={error}
          className="mt-4 bg-red-100 p-4 rounded-lg shadow-md text-red-500"
        />
      )}
      {weather && (
        <WeatherDisplay
          weather={weather}
          className="mt-4 bg-white p-4 rounded-lg shadow-md"
        />
      )}
    </div>
  );
};

export default WeatherApp;
