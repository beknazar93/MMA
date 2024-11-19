import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://beknazarosh.pythonanywhere.com/api/clients/";

function ClientForm({ client, onSubmit }) {
  const [clientData, setClientData] = useState({
    name: "",
    stage: "",
    price: "",
    phone: "",
    payment: "",
    sport_category: "",
    trainer: "",
    comment: "",
    year: "",
    month: "",
    day: "",
  });
  const [error, setError] = useState("");
  const [clients, setClients] = useState([]);
  // Состояние для поиска
  const [searchTerm, setSearchTerm] = useState("");

  // Загружаем список клиентов при монтировании компонента
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setClients(res.data))
      .catch(() => setError("Ошибка при загрузке списка клиентов."));
  }, []);

  // Устанавливаем данные клиента при их изменении
  useEffect(() => {
    if (client) {
      setClientData({
        name: client.name,
        stage: client.stage,
        price: client.price,
        phone: client.phone,
        payment: client.payment,
        sport_category: client.sport_category,
        trainer: client.trainer,
        comment: client.comment,
        year: client.year || "",
        month: client.month || "",
        day: client.day || "",
      });
    } else {
      setClientData({
        name: "",
        stage: "",
        price: "",
        phone: "",
        payment: "",
        sport_category: "",
        trainer: "",
        comment: "",
        year: "",
        month: "",
        day: "",
      });
    }
  }, [client]);

  const handleChange = (e) =>
    setClientData({ ...clientData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (client) {
        // Обновляем существующего клиента
        response = await axios.put(`${API_URL}${client.id}/`, clientData);
      } else {
        // Добавляем нового клиента
        response = await axios.post(API_URL, clientData);
      }

      // Обновляем список клиентов после успешного запроса
      setClients((prev) =>
        client
          ? prev.map((c) => (c.id === client.id ? response.data : c))
          : [...prev, response.data]
      );

      // Сбрасываем данные формы
      setClientData({
        name: "",
        stage: "",
        price: "",
        phone: "",
        payment: "",
        sport_category: "",
        trainer: "",
        comment: "",
        year: "",
        month: "",
        day: "",
      });
      setError("");
      if (onSubmit) onSubmit(response.data); // Вызов onSubmit для внешних действий
    } catch (err) {
      console.error(err);
      setError("Произошла ошибка при сохранении клиента.");
    }
  };

  const [activeTab, setActiveTab] = useState("list");

  const [selectedSport, setSelectedSport] = useState("Все виды спорта");
  const [selectedTrainer, setSelectedTrainer] = useState("Все тренеры");
  const [selectedYear, setSelectedYear] = useState("Все годы");
  const [selectedMonth, setSelectedMonth] = useState("Все месяцы");
  const [selectedDay, setSelectedDay] = useState("Все дни");
  const [totalIncome, setTotalIncome] = useState(0);
  const [filteredIncome, setFilteredIncome] = useState(0);
  const [unpaidIncome, setUnpaidIncome] = useState(0);
  const [PaidIncome, setPaidIncome] = useState(0);

  const filteredClients = clients.filter((client) => {
    return (
      (selectedSport === "Все виды спорта" ||
        client.sport_category === selectedSport) &&
      (selectedTrainer === "Все тренеры" ||
        client.trainer === selectedTrainer) &&
      (selectedYear === "Все годы" || client.year === selectedYear) &&
      (selectedMonth === "Все месяцы" || client.month === selectedMonth) &&
      (selectedDay === "Все дни" || client.day === Number(selectedDay)) &&
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const calculateIncome = (
    clientsList,
    day = "Все дни",
    month = "Все месяцы",
    year = "Все годы",
    trainer = "Все тренеры"
  ) => {
    return clientsList.reduce((acc, client) => {
      const isDayMatch = day === "Все дни" || client.day === Number(day);
      const isMonthMatch = month === "Все месяцы" || client.month === month;
      const isYearMatch = year === "Все годы" || client.year === year;
      const isTrainer = year === "Все тренеры" || client.trainer === trainer;

      if (isDayMatch && isMonthMatch && isYearMatch) {
        return acc + (parseFloat(client.price) || 0);
      }
      return acc;
    }, 0);
  };

  useEffect(() => {
    setTotalIncome(calculateIncome(clients));
    setFilteredIncome(
      calculateIncome(filteredClients, selectedDay, selectedMonth, selectedYear)
    );
  }, [
    clients,
    filteredClients,
    selectedDay,
    selectedMonth,
    selectedYear,
    selectedTrainer,
  ]);

  useEffect(() => {
    setTotalIncome(calculateIncome(clients)); // Общий доход
    setFilteredIncome(
      calculateIncome(
        filteredClients,
        selectedDay,
        selectedMonth,
        selectedYear,
        selectedTrainer
      )
    ); // Доход по фильтрам

    // Доход по фильтрам для неоплаченных клиентов
    setUnpaidIncome(
      filteredClients
        .filter((client) => client.payment === "неоплачено") // Фильтруем только по статусу "неоплачено"
        .reduce((acc, client) => acc + (parseFloat(client.price) || 0), 0) // Суммируем доход по этим клиентам
    );
    setPaidIncome(
      filteredClients
        .filter((client) => client.payment === "оплачено") // Фильтруем только по статусу "неоплачено"
        .reduce((acc, client) => acc + (parseFloat(client.price) || 0), 0) // Суммируем доход по этим клиентам
    );
  }, [
    clients,
    filteredClients,
    selectedDay,
    selectedMonth,
    selectedYear,
    selectedTrainer,
  ]);

  const [expandedClient, setExpandedClient] = useState(null); // Состояние для раскрытия информации

  const handleToggleDetails = (clientId) => {
    // Переключение раскрытия подробностей
    setExpandedClient(expandedClient === clientId ? null : clientId);
  };

  return (
    <div className="manager">
      <div className="manager__tabs">
        <button className="manager__tab" onClick={() => setActiveTab("list")}>
          Список клиентов
        </button>
        <button className="manager__tab" onClick={() => setActiveTab("add")}>
          Добавить клиента
        </button>
        <button className="manager__tab" onClick={() => setActiveTab("paid")}>
          Оплаченные
        </button>
        <button className="manager__tab" onClick={() => setActiveTab("unpaid")}>
          Неоплаченные
        </button>
      </div>

      <div className="manager__contents">
        {activeTab === "list" && (
          <div className="manager__clients-list">
            <div className="manager__filters">
              <input
                type="text"
                placeholder="Поиск клиента"
                className="manager__search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                className="manager__filter"
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
              >
               <option value="Все виды спорта">Все виды спорта</option>
                <option value="Бокс">Бокс</option>
                <option value="ММА">ММА</option>
                <option value="Sambo">Самбо</option>
                <option value="Boryba">Борьба</option>
                <option value="taekwondo">тхэквандо</option>
                <option value="Judo">Дзюдо</option>
                <option value="kickboxing">Кикбокс</option>
                <option value="krossfit">Кроссфит</option>
              </select>

              <select
                className="manager__filter"
                value={selectedTrainer}
                onChange={(e) => setSelectedTrainer(e.target.value)}
              >
                <option value="Все тренеры">Все тренеры</option>
                <option value="Машрапов Тилек">Машрапов Тилек</option>
                <option value="Минбаев Сулайман">Минбаев Сулайман</option>
                <option value="Мойдунов Мирлан">Мойдунов Мирлан</option>
                <option value="Асанбоев Эрлан">Асанбоев Эрлан</option>
                <option value="Сатаров Канат">Сатаров Канат</option>
                <option value="Онарбоев Акжол">Онарбоев Акжол</option>
                <option value="Абдуманаб уулу Илим">Абдуманаб уулу Илим</option>
                <option value="Калмамат уулу Акай">Калмамат уулу Акай</option>
                <option value="Маматжанов Марлен">Маматжанов Марлен</option>
                <option value="Азизбек уулу Баяман">Азизбек уулу Баяман</option>
                <option value="Тургунов Ислам">Тургунов Ислам</option>
                <option value="Медербек уулу Саформурад">
                  Медербек уулу Саформурад
                </option>
                <option value="Лукас Крабб">Лукас Крабб</option>
              </select>

              <select
                className="manager__filter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="Все годы">Все годы</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2022">2025</option>
              </select>

              <select
                className="manager__filter"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="Все месяцы">Все месяцы</option>
                <option value="Январь">Январь</option>
                <option value="Февраль">Февраль</option>
                <option value="Март">Март</option>
                <option value="Апрель">Апрель</option>
                <option value="Май">Май</option>
                <option value="Июнь">Июнь</option>
                <option value="Июль">Июль</option>
                <option value="Август">Август</option>
                <option value="Сентябрь">Сентябрь</option>
                <option value="Октябрь">Октябрь</option>
                <option value="Ноябрь">Ноябрь</option>
                <option value="Декабрь">Декабрь</option>
              </select>

              <select
                className="manager__filter"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                <option value="Все дни">Все дни</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="manager__income">
              <p>Общий доход: {totalIncome}</p>
              <p>Доход по фильтрам: {filteredIncome}</p>
            </div>

            {filteredClients.length ? (
              filteredClients.map((c) => (
                <div key={c.id} className="manager__client-card">
                  <div className="manager__client-header">
                    <h3 className="manager__client-name">{c.name}</h3>

                    {/* Статус оплаты с цветом, с анимацией для плавного изменения цвета */}
                    <p
                      className={`manager__client-payment ${
                        c.payment === "оплачено" ? "paid" : "unpaid"
                      }`}
                    >
                      Оплата: {c.payment}
                    </p>
                  </div>

                  {/* Кнопка для раскрытия подробностей */}
                  <button
                    onClick={() => handleToggleDetails(c.id)}
                    className="manager__toggle-details-button"
                  >
                    {expandedClient === c.id
                      ? "Скрыть"
                      : "Показать подробности"}
                  </button>

                  {/* Если клиент раскрыт, показываем всю информацию */}
                  {expandedClient === c.id && (
                    <div className="manager__client-details">
                      <p className="manager__client-phone">
                        Телефон: {c.phone}
                      </p>
                      <p className="manager__client-price">Цена: {c.price}</p>
                      <p className="manager__client-sport-category">
                        Категория спорта: {c.sport_category}
                      </p>
                      <p className="manager__client-trainer">
                        Тренер: {c.trainer}
                      </p>
                      <p className="manager__client-comment">
                        Комментарий: {c.comment}
                      </p>
                      <p className="manager__client-date">
                        Дата: {c.day} {c.month} {c.year}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <li>Нет клиентов для отображения.</li>
            )}
          </div>
        )}

        {activeTab === "add" && (
          <form onSubmit={handleSubmit} className="manager__add-client">
            <h2>
              {clientData.id
                ? "Редактировать клиента"
                : "Добавить нового клиента"}
            </h2>
            {error && <div className="error">{error}</div>}
            <div className="form-row">
              {[
                "name",
                "phone",
                "price",
                "payment",
                "trainer",
                "sport_category",
                "year",
                "month",
                "day",
                "stage",
                "comment",
              ].map((field) => (
                <div key={field} className="form-group">
                  <label>
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </label>
                  {field === "payment" ? (
                    <select
                      name={field}
                      value={clientData[field]}
                      onChange={handleChange}
                      className="manager__input"
                      required
                    >
                      <option value="статус оплаты">Статус оплаты</option>
                      <option value="оплачено">оплачено</option>
                      <option value="неоплачено">неоплачено</option>
                    </select>
                  ) : field === "trainer" ? (
                    <select
                      name={field}
                      value={clientData[field]}
                      onChange={handleChange}
                      className="manager__input"
                      required
                    >
                      <option value="Все тренеры">Все тренеры</option>
                      <option value="Машрапов Тилек">Машрапов Тилек</option>
                    <option value="Минбаев Сулайман">Минбаев Сулайман</option>
                      <option value="Мойдунов Мирлан">Мойдунов Мирлан</option>
                      <option value="Асанбоев Эрлан">Асанбоев Эрлан</option>
                      <option value="Сатаров Канат">Сатаров Канат</option>
                      <option value="Онарбоев Акжол">Онарбоев Акжол</option>
                      <option value="Абдуманаб уулу Илим">
                        Абдуманаб уулу Илим
                      </option>
                      <option value="Калмамат уулу Акай">
                        Калмамат уулу Акай
                      </option>
                      <option value="Маматжанов Марлен">
                        Маматжанов Марлен
                      </option>
                      <option value="Азизбек уулу Баяман">
                        Азизбек уулу Баяман
                      </option>
                      <option value="Тургунов Ислам">Тургунов Ислам</option>
                      <option value="Медербек уулу Саформурад">
                        Медербек уулу Саформурад
                      </option>
                      <option value="Лукас Крабб">Лукас Крабб</option>
                    </select>
                  ) : field === "sport_category" ? (
                    <select
                      name={field}
                      value={clientData[field]}
                      onChange={handleChange}
                      className="manager__input"
                      required
                    >
                     <option value="Все виды спорта">Все виды спорта</option>
                <option value="Бокс">Бокс</option>
                <option value="ММА">ММА</option>
                <option value="Sambo">Самбо</option>
                <option value="Boryba">Борьба</option>
                <option value="taekwondo">тхэквандо</option>
                <option value="Judo">Дзюдо</option>
                <option value="kickboxing">Кикбокс</option>
                <option value="krossfit">Кроссфит</option>
                    </select>
                  ) : field === "year" ? (
                    <select
                      name={field}
                      value={clientData[field]}
                      onChange={handleChange}
                      className="manager__input"
                      required
                    >
                      <option value="Все годы">Все годы</option>
                      {Array.from({ length: 3 }, (_, i) => 2023 + i).map(
                        (year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        )
                      )}
                    </select>
                  ) : field === "month" ? (
                    <select
                      name={field}
                      value={clientData[field]}
                      onChange={handleChange}
                      className="manager__input"
                      required
                    >
                      <option value="Все месяцы">Все месяцы</option>
                      <option value="Январь">Январь</option>
                      <option value="Февраль">Февраль</option>
                      <option value="Март">Март</option>
                      <option value="Апрель">Апрель</option>
                      <option value="Май">Май</option>
                      <option value="Июнь">Июнь</option>
                      <option value="Июль">Июль</option>
                      <option value="Август">Август</option>
                      <option value="Сентябрь">Сентябрь</option>
                      <option value="Октябрь">Октябрь</option>
                      <option value="Ноябрь">Ноябрь</option>
                      <option value="Декабрь">Декабрь</option>
                    </select>
                  ) : field === "day" ? (
                    <select
                      name={field}
                      value={clientData[field]}
                      onChange={handleChange}
                      className="manager__input"
                      required
                    >
                      <option value="Все дни">Все дни</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={clientData[field]}
                      onChange={handleChange}
                      className="manager__input"
                      required
                    />
                  )}
                </div>
              ))}
            </div>
            <button type="submit">
              {clientData.id ? "Обновить" : "Добавить"} клиента
            </button>
          </form>
        )}

        {activeTab === "paid" && (
          <div className="manager__clients-list">
            <div className="manager__filters">
              <input
                type="text"
                placeholder="Поиск клиента"
                className="manager__search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                className="manager__filter"
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
              >
                <option value="Все виды спорта">Все виды спорта</option>
                <option value="Бокс">Бокс</option>
                <option value="ММА">ММА</option>
                <option value="Sambo">Самбо</option>
                <option value="Boryba">Борьба</option>
                <option value="taekwondo">тхэквандо</option>
                <option value="Judo">Дзюдо</option>
                <option value="kickboxing">Кикбокс</option>
                <option value="krossfit">Кроссфит</option>
              </select>

              <select
                className="manager__filter"
                value={selectedTrainer}
                onChange={(e) => setSelectedTrainer(e.target.value)}
              >
                <option value="Все тренеры">Все тренеры</option>
                <option value="Машрапов Тилек">Машрапов Тилек</option>
                <option value="Минбаев Сулайман">Минбаев Сулайман</option>
                <option value="Мойдунов Мирлан">Мойдунов Мирлан</option>
                <option value="Асанбоев Эрлан">Асанбоев Эрлан</option>
                <option value="Сатаров Канат">Сатаров Канат</option>
                <option value="Онарбоев Акжол">Онарбоев Акжол</option>
                <option value="Абдуманаб уулу Илим">Абдуманаб уулу Илим</option>
                <option value="Калмамат уулу Акай">Калмамат уулу Акай</option>
                <option value="Маматжанов Марлен">Маматжанов Марлен</option>
                <option value="Азизбек уулу Баяман">Азизбек уулу Баяман</option>
                <option value="Тургунов Ислам">Тургунов Ислам</option>
                <option value="Медербек уулу Саформурад">
                  Медербек уулу Саформурад
                </option>
                <option value="Лукас Крабб">Лукас Крабб</option>
              </select>

              <select
                className="manager__filter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="Все годы">Все годы</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2022">2025</option>
              </select>

              <select
                className="manager__filter"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="Все месяцы">Все месяцы</option>
                <option value="Январь">Январь</option>
                <option value="Февраль">Февраль</option>
                <option value="Март">Март</option>
                <option value="Апрель">Апрель</option>
                <option value="Май">Май</option>
                <option value="Июнь">Июнь</option>
                <option value="Июль">Июль</option>
                <option value="Август">Август</option>
                <option value="Сентябрь">Сентябрь</option>
                <option value="Октябрь">Октябрь</option>
                <option value="Ноябрь">Ноябрь</option>
                <option value="Декабрь">Декабрь</option>
              </select>

              <select
                className="manager__filter"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                <option value="Все дни">Все дни</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="manager__income">
              <p>Доход по фильтрам (оплачено): {PaidIncome}</p>
            </div>

            {/* Фильтрация клиентов с оплаченной оплатой */}
            {filteredClients.length ? (
              filteredClients
                .filter((c) => c.payment === "оплачено") // Фильтрация по полю оплаты
                .map((c) => (
                  <div key={c.id} className="manager__client-card">
                    <div className="manager__client-header">
                      <h3 className="manager__client-name">{c.name}</h3>

                      {/* Статус оплаты с цветом, с анимацией для плавного изменения цвета */}
                      <p
                        className={`manager__client-payment ${
                          c.payment === "оплачено" ? "paid" : "unpaid"
                        }`}
                      >
                        Оплата: {c.payment}
                      </p>
                    </div>

                    {/* Кнопка для раскрытия подробностей */}
                    <button
                      onClick={() => handleToggleDetails(c.id)}
                      className="manager__toggle-details-button"
                    >
                      {expandedClient === c.id
                        ? "Скрыть"
                        : "Показать подробности"}
                    </button>

                    {/* Если клиент раскрыт, показываем всю информацию */}
                    {expandedClient === c.id && (
                      <div className="manager__client-details">
                        <p className="manager__client-phone">
                          Телефон: {c.phone}
                        </p>
                        <p className="manager__client-price">Цена: {c.price}</p>
                        <p className="manager__client-sport-category">
                          Категория спорта: {c.sport_category}
                        </p>
                        <p className="manager__client-trainer">
                          Тренер: {c.trainer}
                        </p>
                        <p className="manager__client-comment">
                          Комментарий: {c.comment}
                        </p>
                        <p className="manager__client-date">
                          Дата: {c.day} {c.month} {c.year}
                        </p>
                      </div>
                    )}
                  </div>
                ))
            ) : (
              <li>Нет оплаченных клиентов для отображения.</li>
            )}
          </div>
        )}

        {activeTab === "unpaid" && (
          <div className="manager__clients-list">
            <div className="manager__filters">
              <input
                type="text"
                placeholder="Поиск клиента"
                className="manager__search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                className="manager__filter"
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
              >
                <option value="Все виды спорта">Все виды спорта</option>
                <option value="Бокс">Бокс</option>
                <option value="ММА">ММА</option>
                <option value="Sambo">Самбо</option>
                <option value="Boryba">Борьба</option>
                <option value="taekwondo">тхэквандо</option>
                <option value="Judo">Дзюдо</option>
                <option value="kickboxing">Кикбокс</option>
                <option value="krossfit">Кроссфит</option>
              </select>

              <select
                className="manager__filter"
                value={selectedTrainer}
                onChange={(e) => setSelectedTrainer(e.target.value)}
              >
                <option value="Все тренеры">Все тренеры</option>
                <option value="Машрапов Тилек">Машрапов Тилек</option>
                  <option value="Минбаев Сулайман">Минбаев Сулайман</option>
                <option value="Мойдунов Мирлан">Мойдунов Мирлан</option>
                <option value="Асанбоев Эрлан">Асанбоев Эрлан</option>
                <option value="Сатаров Канат">Сатаров Канат</option>
                <option value="Онарбоев Акжол">Онарбоев Акжол</option>
                <option value="Абдуманаб уулу Илим">Абдуманаб уулу Илим</option>
                <option value="Калмамат уулу Акай">Калмамат уулу Акай</option>
                <option value="Маматжанов Марлен">Маматжанов Марлен</option>
                <option value="Азизбек уулу Баяман">Азизбек уулу Баяман</option>
                <option value="Тургунов Ислам">Тургунов Ислам</option>
                <option value="Медербек уулу Саформурад">
                  Медербек уулу Саформурад
                </option>
                <option value="Лукас Крабб">Лукас Крабб</option>
              </select>

              <select
                className="manager__filter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="Все годы">Все годы</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>

              <select
                className="manager__filter"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="Все месяцы">Все месяцы</option>
                <option value="Январь">Январь</option>
                <option value="Февраль">Февраль</option>
                <option value="Март">Март</option>
                <option value="Апрель">Апрель</option>
                <option value="Май">Май</option>
                <option value="Июнь">Июнь</option>
                <option value="Июль">Июль</option>
                <option value="Август">Август</option>
                <option value="Сентябрь">Сентябрь</option>
                <option value="Октябрь">Октябрь</option>
                <option value="Ноябрь">Ноябрь</option>
                <option value="Декабрь">Декабрь</option>
              </select>

              <select
                className="manager__filter"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                <option value="Все дни">Все дни</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="manager__income">
              <p>Доход по фильтрам (неоплачено): {unpaidIncome}</p>
            </div>

            {/* Фильтрация клиентов с неоплаченной оплатой */}
            {filteredClients.length ? (
              filteredClients
                .filter((c) => c.payment === "неоплачено") // Фильтрация по полю оплаты
                .map((c) => (
                  <div key={c.id} className="manager__client-card">
                    <div className="manager__client-header">
                      <h3 className="manager__client-name">{c.name}</h3>

                      {/* Статус оплаты с цветом, с анимацией для плавного изменения цвета */}
                      <p
                        className={`manager__client-payment ${
                          c.payment === "оплачено" ? "paid" : "unpaid"
                        }`}
                      >
                        Оплата: {c.payment}
                      </p>
                    </div>

                    {/* Кнопка для раскрытия подробностей */}
                    <button
                      onClick={() => handleToggleDetails(c.id)}
                      className="manager__toggle-details-button"
                    >
                      {expandedClient === c.id
                        ? "Скрыть"
                        : "Показать подробности"}
                    </button>

                    {/* Если клиент раскрыт, показываем всю информацию */}
                    {expandedClient === c.id && (
                      <div className="manager__client-details">
                        <p className="manager__client-phone">
                          Телефон: {c.phone}
                        </p>
                        <p className="manager__client-price">Цена: {c.price}</p>
                        <p className="manager__client-sport-category">
                          Категория спорта: {c.sport_category}
                        </p>
                        <p className="manager__client-trainer">
                          Тренер: {c.trainer}
                        </p>
                        <p className="manager__client-comment">
                          Комментарий: {c.comment}
                        </p>
                        <p className="manager__client-date">
                          Дата: {c.day} {c.month} {c.year}
                        </p>
                      </div>
                    )}
                  </div>
                ))
            ) : (
              <li>Нет клиентов для отображения.</li>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientForm;


