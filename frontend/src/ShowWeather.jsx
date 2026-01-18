import React, { useEffect, useState } from "react";
import "./showWeather.css";

const ShowWeather = () => {
  const [today, setToday] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const CITY_ID = 1566083; // TP.HCM
  const API_KEY = "aed0c31b0217fdc85a1808a7652dbdfc";

  useEffect(() => {
    // Ngày tháng
    const now = new Date();
    setToday(
      now.toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    );

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&appid=${API_KEY}&units=metric&lang=vi`,
        );

        const data = await res.json();
        console.log("Weather:", data);

        if (!res.ok) {
          throw new Error(data.message);
        }

        setWeather(data);
      } catch (err) {
        setError("Không thể lấy dữ liệu thời tiết");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <p className="loading">Đang tải thời tiết...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="weather-page">
      <div className="weather-card">
        <h2>{weather.name}</h2>
        <p>{today}</p>

        {/* <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt="weather"
        /> */}
        {weather && weather.weather && weather.weather.length > 0 && (
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description || "Weather icon"}
            className="weather-icon"
          />
        )}

        <h1>{Math.round(weather.main.temp)}°C</h1>
        <p>{weather.weather[0].description}</p>

        <div className="weather-info">
          <div>💧 {weather.main.humidity}%</div>
          <div>🌬️ {weather.wind.speed} m/s</div>
          <div>🌡️ {Math.round(weather.main.feels_like)}°C</div>
        </div>
      </div>
    </div>
  );
};

export default ShowWeather;
