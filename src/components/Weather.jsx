import { useEffect, useState } from "react";

function Weather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current=temperature_2m,relative_humidity_2m"
        );

        const data = await response.json();

        setWeather({
          temperature: data.current.temperature_2m,
          humidity: data.current.relative_humidity_2m,
        });
      } catch (error) {
        console.error("Weather Error:", error);
      }
    }

    fetchWeather();
  }, []);

  if (!weather) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p className="text-4xl font-bold">
        {weather.temperature}°C
      </p>

      <p className="mt-3">
        Humidity: {weather.humidity}%
      </p>

      <p>Location: Your City</p>

      <p className="mt-4 text-sm opacity-70">
        Live Weather
      </p>
    </div>
  );
}

export default Weather;