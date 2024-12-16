import React, { useState, useEffect } from "react";
import axios from "axios";
import Filters from "./Filters";
import ClientList from "./ClientList";
import ClientForm from "./ClientForm";
import IncomeSummary from "./IncomeSummary";

const API_URL = "TestOsh.pythonanywhere.com/api/clients";

const ManagerApp = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [activeTab, setActiveTab] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    sport: "Все виды спорта",
    payment: "Статус оплаты", // Добавлен фильтр по статусу оплаты
    trainer: "Все тренеры",
    year: "Все годы",
    month: "Все месяцы",
    day: "Все дни",
  });

  // Загружаем список клиентов при монтировании
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setClients(res.data))
      .catch(() => console.error("Ошибка при загрузке данных"));
  }, []);

  // Применяем фильтры к клиентам
  useEffect(() => {
    const filtered = clients.filter((client) => {
      const matchesSport =
        filters.sport === "Все виды спорта" || client.sport_category === filters.sport;
      const matchesTrainer =
        filters.trainer === "Все тренеры" || client.trainer === filters.trainer;
      const matchesYear =
        filters.year === "Все годы" || client.year === filters.year;
      const matchesMonth =
        filters.month === "Все месяцы" || client.month === filters.month;
        const matchesDay =
        filters.day === "Все дни" || client.day === filters.day;
        const matchesPayment =
        filters.payment === "Статус оплаты" || client.payment === filters.payment;
      const matchesSearch = client.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesSport && matchesTrainer && matchesYear && matchesMonth && matchesDay && matchesPayment && matchesSearch;
    });

    setFilteredClients(filtered);
  }, [clients, filters, searchTerm]);

  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <div className="manager">
      <div className="manager__tabs">
        {["list", "add", "income",].map((tab) => (
          <button key={tab} onClick={() => handleTabChange(tab)}>
            {tab === "list" && "Список клиентов"}
            {tab === "add" && "Добавить клиента"}
            {tab === "income" && "Анализ Дохода"}
          </button>
        ))}
      </div>

      {activeTab === "list" && (
        <>
          <Filters filters={filters} setFilters={setFilters} setSearchTerm={setSearchTerm} />
          <ClientList clients={filteredClients} />
        </>
      )}

      {activeTab === "add" && <ClientForm setClients={setClients} />}
      {activeTab === "income" && (
        <>
        <Filters filters={filters} setFilters={setFilters} setSearchTerm={setSearchTerm} />
        <IncomeSummary clients={filteredClients} />
        </>
      ) }

    </div>
  );
};
export default ManagerApp;
