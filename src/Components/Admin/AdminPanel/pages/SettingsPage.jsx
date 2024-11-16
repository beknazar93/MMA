// pages/SettingsPage.jsx
import React, { useState, useEffect } from "react";

const SettingsPage = () => {
  const [theme, setTheme] = useState("light");
  const [brightness, setBrightness] = useState(100);

  // Функция для переключения темы
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Функция для изменения яркости
  const handleBrightnessChange = (e) => {
    setBrightness(e.target.value);
  };

  // Устанавливаем стили в зависимости от текущей темы и яркости
  useEffect(() => {
    const root = document.documentElement;

    // Устанавливаем фоновый цвет и яркость
    if (theme === "light") {
      root.style.setProperty("--background-color", "#ffffff");
      root.style.setProperty("--text-color", "#000000");
    } else {
      root.style.setProperty("--background-color", "#121212");
      root.style.setProperty("--text-color", "#ffffff");
    }

    // Применяем настройку яркости ко всему документу
    root.style.setProperty("--brightness", `${brightness}%`);

    // Сохраняем настройки в localStorage
    localStorage.setItem("theme", theme);
    localStorage.setItem("brightness", brightness);
  }, [theme, brightness]);

  // При загрузке страницы читаем настройки из localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedBrightness = localStorage.getItem("brightness");
    if (savedTheme) setTheme(savedTheme);
    if (savedBrightness) setBrightness(savedBrightness);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
        transition: "background-color 0.3s, color 0.3s",
        padding: "20px",
      }}
    >
      <h1>Settings</h1>
      <button onClick={toggleTheme} style={{ margin: "10px", padding: "10px" }}>
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </button>

      <div style={{ marginTop: "20px" }}>
        <label htmlFor="brightness">Brightness: </label>
        <input
          type="range"
          id="brightness"
          min="0"
          max="100"
          value={brightness}
          onChange={handleBrightnessChange}
          style={{ width: "200px" }}
        />
        <span>{brightness}%</span>
      </div>
    </div>
  );
};

export default SettingsPage;
