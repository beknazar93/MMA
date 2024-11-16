import React, { useState } from "react";
import "../AdminPanel.css"; // Подключаем файл с CSS стилями

function DealsPage() {
  const [deal, setDeal] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    discount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeal((prevDeal) => ({
      ...prevDeal,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Специальное предложение отправлено:", deal);
  };

  return (
    <div className="deals-page">
      <h2>Создать специальное предложение</h2>
      <form className="deals-form" onSubmit={handleSubmit}>
        <div>
          <label>
            Название предложения:
            <input
              type="text"
              name="title"
              value={deal.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Описание:
            <textarea
              name="description"
              value={deal.description}
              onChange={handleChange}
              required
              className="text-area"
            />
          </label>
        </div>
        <div>
          <label>
            Дата начала:
            <input
              type="date"
              name="startDate"
              value={deal.startDate}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Дата окончания:
            <input
              type="date"
              name="endDate"
              value={deal.endDate}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Скидка (%):
            <input
              type="number"
              name="discount"
              value={deal.discount}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Создать предложение</button>
      </form>
    </div>
  );
}

export default DealsPage;
