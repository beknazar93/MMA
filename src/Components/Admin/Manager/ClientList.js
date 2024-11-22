import React, { useState } from "react";

const ClientList = ({ clients }) => {
  const [expandedClient, setExpandedClient] = useState(null); // Состояние для раскрытия информации

  const handleToggleDetails = (clientId) => {
    // Переключение раскрытия подробностей
    setExpandedClient(expandedClient === clientId ? null : clientId);
  };

  return (
    <div className="manager__client-list">
      {clients.length ? (
        clients.map((c) => (
          <div key={c.id} className="manager__client-list-item">
            <div className="manager__client-list-item-header">
              <h3 className="manager__client-list-item-header-name">{c.name}</h3>
              <p
                className={`manager__client-list-item-header-payment ${c.payment === "оплачено" ? "manager__client-list-item-header-payment--paid" : "manager__client-list-item-header-payment--unpaid"}`}
              >
                Оплата: {c.payment}
              </p>
            </div>

            <button
              className="manager__client-list-item-toggle-button"
              onClick={() => handleToggleDetails(c.id)}
            >
              {expandedClient === c.id ? "Скрыть" : "Показать подробности"}
            </button>

            {expandedClient === c.id && (
              <div className="manager__client-list-item-details">
                <p className="manager__client-list-item-details-phone">Телефон: {c.phone}</p>
                <p className="manager__client-list-item-details-price">Цена: {c.price}</p>
                <p className="manager__client-list-item-details-sport-category">Категория спорта: {c.sport_category}</p>
                <p className="manager__client-list-item-details-trainer">Тренер: {c.trainer}</p>
                <p className="manager__client-list-item-details-comment">Комментарий: {c.comment}</p>
                <p className="manager__client-list-item-details-date">Дата: {c.day} {c.month} {c.year}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <li>Нет клиентов для отображения.</li>
      )}
    </div>

  );
};

export default ClientList;
