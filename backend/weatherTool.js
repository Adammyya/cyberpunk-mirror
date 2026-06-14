import axios from "axios";

export async function getWeather() {
  const response = await axios.get(
    "https://api.open-meteo.com/v1/forecast",
    {
      params: {
        latitude: 22.57,
        longitude: 88.36,
        current_weather: true,
      },
    }
  );

  return response.data.current_weather;
}