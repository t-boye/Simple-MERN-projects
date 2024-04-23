// APIService.js
import axios from "axios";

const API_KEY = "2083bb43493ab42b65516b9576afe6ef";

const APIService = {
  getWeatherData: async (location) => {
    try {
      const { lat, lon } = location;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q={Alabama}&appid={2083bb43493ab42b65516b9576afe6ef}`
      );

      https: return {
        city: response.data.timezone.split("/")[1],
        temperature: response.data.current.temp,
        humidity: response.data.current.humidity,
        windSpeed: response.data.current.wind_speed,
        condition: response.data.current.weather[0].description,
      };
    } catch (error) {
      throw new Error("Failed to fetch weather data");
    }
  },
};

export default APIService;
