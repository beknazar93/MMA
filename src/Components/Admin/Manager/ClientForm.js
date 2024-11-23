import React, { useState } from "react";
import axios from "axios";

const ClientForm = ({ setClients, client, onSubmit }) => {
  const API_URL = "https://beknazarosh.pythonanywhere.com/api/clients/";

  // Начальное состояние формы
  const [formData, setFormData] = useState({
    name: client ? client.name : "",
    phone: client ? client.phone : "",
    price: client ? client.price : "",
    payment: client ? client.payment : "неоплачено",
    trainer: client ? client.trainer : "Все тренеры",
    sport_category: client ? client.sport_category : "Все виды спорта",
    year: client ? client.year : "Все годы",
    month: client ? client.month : "Все месяцы",
    day: client ? client.day : "Все дни",
    stage: client ? client.stage : "",
    comment: client ? client.comment : "",
  });

  const [error, setError] = useState("");

  // Обработчик изменения данных в форме
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (client) {
        // Обновление существующего клиента
        response = await axios.put(`${API_URL}${client.id}/`, formData, {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        // Добавление нового клиента
        response = await axios.post(API_URL, formData, {
          headers: { "Content-Type": "application/json" },
        });
      }

      // Обновляем список клиентов
      setClients((prev) =>
        client
          ? prev.map((c) => (c.id === client.id ? response.data : c))
          : [...prev, response.data]
      );

      // Сбрасываем данные формы
      setFormData({
        name: "",
        phone: "",
        price: "",
        payment: "неоплачено",
        trainer: "Все тренеры",
        sport_category: "Все виды спорта",
        year: "Все годы",
        month: "Все месяцы",
        day: "Все дни",
        stage: "",
        comment: "",
      });

      setError("");
      if (onSubmit) onSubmit(response.data); // Вызываем внешнюю функцию, если задана
    } catch (err) {
      console.error("Ошибка при сохранении клиента:", err);
      setError(
        err.response?.data?.detail ||
        "Произошла ошибка. Проверьте введённые данные."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="manager__form">
        <div className="manager__form-row">


          <div className="manager__form-group">
            <label className="manager__form-label">Фамилия Имя:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="manager__form-input"
              required
            />
          </div>

          <div className="manager__form-group">
            <label className="manager__form-label">Телефон:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="manager__form-input"
              required
            />
          </div>

          <div className="manager__form-group">
            <label className="manager__form-label">Цена:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="manager__form-input"
              required
            />
          </div>

          <div className="manager__form-group">
            <label className="manager__form-label">Статус оплаты:</label>
            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              className="manager__form-select"
              required
            >
              <option value="неоплачено">Неоплачено</option>
              <option value="оплачено">Оплачено</option>
            </select>
          </div>





          <div className="manager__form-group">
            <label className="manager__form-label">Тренер:</label>
            <select
              name="trainer"
              value={formData.trainer}
              onChange={handleChange}
              className="manager__form-select"
              required
            >
              <option value="Все тренеры">Все тренеры</option>
              {[
                "Машрапов Тилек",
                "Минбаев Сулайман",
                "Мойдунов Мирлан",
                "Асанбоев Эрлан",
                "Сатаров Канат",
                "Онарбоев Акжол",
                "Абдуманаб уулу Илим",
                "Калмамат уулу Акай",
                "Маматжанов Марлен",
                "Азизбек уулу Баяман",
                "Тургунов Ислам",
                "Медербек уулу Саформурад",
                "Лукас Крабб",
              ].map((trainer) => (
                <option key={trainer} value={trainer}>
                  {trainer}
                </option>
              ))}
            </select>
          </div>

          <div className="manager__form-group">
            <label className="manager__form-label">Категория спорта:</label>
            <select
              name="sport_category"
              value={formData.sport_category}
              onChange={handleChange}
              className="manager__form-select"
              required
            >
              <option value="Все виды спорта">Все виды спорта</option>
              {[
                "Бокс",
                "ММА",
                "Самбо",
                "Борьба",
                "Греко-римская-борьба",
                "Тхэквондо",
                "Дзюдо",
                "Кикбокс",
                "krossfit",
              ].map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>

          <div className="manager__form-group">
            <label className="manager__form-label">Год:</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="manager__form-select"
              required
            >
              <option value="Все годы">Все годы</option>
              {["2023", "2024", "2025"].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="manager__form-group">
            <label className="manager__form-label">Месяц:</label>
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="manager__form-select"
              required
            >
              <option value="Все месяцы">Все месяцы</option>
              {[
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь",
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="manager__form-group">
            <label className="manager__form-label">День:</label>
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="manager__form-select"
              required
            >
              <option value="Все дни">Все дни</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="manager__form-group">
            <label className="manager__form-label">Этап:</label>
            <input
              type="text"
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              className="manager__form-input"
              required
            />
          </div>

       

        </div>
   <div className="manager__form-group">
            <label className="manager__form-label">Комментарий:</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className="manager__form-textarea"
              required
            />
          </div>
        </div>

        <div className="manager__form-group">
          <label className="manager__form-label">Комментарий:</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="manager__form-textarea"
            required
          />
        </div>

        <button className="manager__form-submit-button" type="submit">
          {client ? "Обновить" : "Добавить"} клиента
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
