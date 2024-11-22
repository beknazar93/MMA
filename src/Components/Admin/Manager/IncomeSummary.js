import React, { useState } from "react";

const IncomeSummary = ({ clients }) => {
  const [showIncome, setShowIncome] = useState(false);

  // Расчёт общего дохода
  const totalIncome = clients
    ? clients.reduce((sum, c) => sum + (parseFloat(c.price) || 0), 0)
    : 0;

  // Форматируем число для отображения с разделителями тысяч
  const formatNumber = (number) => {
    return number.toLocaleString("ru-RU"); // Используем российский локаль для разделителей
  };

  // Расчёт 40% и 60% от общей суммы
  const fortyPercent = (totalIncome * 0.4).toFixed(2);
  const sixtyPercent = (totalIncome * 0.6).toFixed(2);

  const handleButtonClick = () => {
    setShowIncome((prev) => !prev);
  };

  return (
    <div className="manager__income-summary">
      <button onClick={handleButtonClick}>
        {showIncome ? "Скрыть доход" : "Показать доход"}
      </button>
      {showIncome && (
        <div>
          <p className="manager__total-income">
            Выберите дату:
          </p>
          <p className="manager__forty-percent">
            40%: {formatNumber(fortyPercent)} сом
          </p>
          <p className="manager__sixty-percent">
            60%: {formatNumber(sixtyPercent)} сом
          </p>
        </div>
      )}
    </div>
  );
};

export default IncomeSummary;
