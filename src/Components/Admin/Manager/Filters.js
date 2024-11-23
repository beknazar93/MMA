import React from "react";

const Filters = ({ filters, setFilters, setSearchTerm }) => {
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const trainers = [
    "Все тренеры",
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
  ];

  const sports = [
    "Все виды спорта",
    "Бокс",
    "ММА",
    "Самбо",
    "Борьба",
    "Греко-римская-борьба",
    "Тхэквондо",
    "Дзюдо",
    "Кикбокс",
    "krossfit",
  ];

  const months = [
    "Все месяцы",
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
  ];

  const payment = [
    "Статус оплаты",
    "оплачено",
    "неоплачено",
  ];

  

  const years = ["Все годы", "2023", "2024", "2025"];

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  return (
    <div className="manager__filters">
      <input
        type="text"
        placeholder="Поиск клиента"
        className="manager__filters-search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={filters.sport}
        onChange={(e) => handleFilterChange("sport", e.target.value)}
        className="manager__filters-select"
      >
        {sports.map((sport) => (
          <option key={sport} value={sport}>
            {sport}
          </option>
        ))}
      </select>

      <select
        value={filters.trainer}
        onChange={(e) => handleFilterChange("trainer", e.target.value)}
        className="manager__filters-select"
      >
        {trainers.map((trainer) => (
          <option key={trainer} value={trainer}>
            {trainer}
          </option>
        ))}
      </select>

      <select
        value={filters.year}
        onChange={(e) => handleFilterChange("year", e.target.value)}
        className="manager__filters-select"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        value={filters.month}
        onChange={(e) => handleFilterChange("month", e.target.value)}
        className="manager__filters-select"
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      <select
        value={filters.day}
        onChange={(e) => handleFilterChange("day", e.target.value)}
        className="manager__filters-select"
      >
        <option value="Все дни">Все дни</option>
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>

      <select
        value={filters.payment}
        onChange={(e) => handleFilterChange("payment", e.target.value)}
        className="manager__filters-select"
      >
        {payment.map((payment) => (
          <option key={payment} value={payment}>
            {payment}
          </option>
        ))}
      </select>

    </div>
  );
};

export default Filters;
