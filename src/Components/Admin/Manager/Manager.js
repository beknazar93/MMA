import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Manager = () => {
  const SHEETDB_URL = 'https://beknazarosh.pythonanywhere.com/api/clients'; // Замените на ваш URL
  const [activeTab, setActiveTab] = useState('list');
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: '',
    phone: '',
    payment: 'Оплачено',
    price: '',
    sportCategory: 'Бокс',
    trainer: 'Надиров Арап',
    comment: '',
    year: '',
    month: '',
    day: '',
  });
  const [addButtonText, setAddButtonText] = useState('Добавить');

  const [selectedSport, setSelectedSport] = useState('Все виды спорта');
  const [selectedTrainer, setSelectedTrainer] = useState('Все тренеры');
  const [selectedYear, setSelectedYear] = useState('Все годы');
  const [selectedMonth, setSelectedMonth] = useState('Все месяцы');
  const [selectedDay, setSelectedDay] = useState('Все дни');
  const [selectedPayment, setSelectedPayment] = useState('Все оплаты');

  const [items, setItems] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0); // Состояние для общего дохода
  const [filteredIncome, setFilteredIncome] = useState(0); // Состояние для дохода по фильтрам

  // Состояние для поиска
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://beknazarosh.pythonanywhere.com/api/clients');
        setItems(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('https://beknazarosh.pythonanywhere.com/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Ошибка при получении клиентов:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({ ...prevClient, [name]: value }));
  };

  const handleAddClient = async () => {
    if (newClient.name && newClient.phone && newClient.price) {
      try {
        await axios.post(SHEETDB_URL, {
          data: newClient,
        });
        fetchClients();

        setNewClient({
          name: '',
          phone: '',
          payment: 'Оплачено',
          price: '',
          sportCategory: 'Бокс',
          trainer: 'Надиров Арап',
          comment: '',
          year: 'Все годы',
          month: 'Все месяцы',
          day: 'Все дни',
        });
        setAddButtonText('Добавлено');

        setTimeout(() => {
          setAddButtonText('Добавить');
        }, 2000);
      } catch (error) {
        console.error('Ошибка при добавлении клиента:', error);
      }
    }
  };

  const [expandedClients, setExpandedClients] = useState({});

  const handleClientClick = (index) => {
    setExpandedClients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const calculateIncome = (clientsList) => {
    return clientsList.reduce((acc, client) => {
      return acc + (parseFloat(client.price) || 0); // Суммируем цену клиента
    }, 0);
  };

  // Фильтрация клиентов
  const filteredClients = clients.filter((client) => {
    return (
      (selectedSport === 'Все виды спорта' || client.sportCategory === selectedSport) &&
      (selectedTrainer === 'Все тренеры' || client.trainer === selectedTrainer) &&
      (selectedYear === 'Все годы' || client.year === selectedYear) &&
      (selectedMonth === 'Все месяцы' || client.month === selectedMonth) &&
      (selectedDay === 'Все дни' || client.day === selectedDay) &&
      (selectedPayment === 'Все оплаты' || client.payment === selectedPayment) &&
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) // Поиск по имени клиента
    );
  });

  // Обновляем доходы при изменении списка клиентов или фильтров
  useEffect(() => {
    setTotalIncome(calculateIncome(clients)); // Общее количество дохода
    setFilteredIncome(calculateIncome(filteredClients)); // Доход по фильтрам
  }, [clients, filteredClients]);

  return (
    <div className="manager">
      <div className="manager__tabs">
        <button className="manager__tab" onClick={() => setActiveTab('list')}>
          Список клиентов
        </button>
        <button className="manager__tab" onClick={() => setActiveTab('add')}>
          Добавить клиента
        </button>
      </div>

      <div className="manager__contents">
        {activeTab === 'list' && (
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
                <option value="Дзюдо">Дзюдо</option>
                <option value="Самбо">Самбо</option>
                <option value="Борьба">Борьба</option>
                <option value="Тхэквандо">Тхэквандо</option>
                <option value="Греко-римская борьба">Греко-римская борьба</option>
              </select>

              <select
                className="manager__filter"
                value={selectedTrainer}
                onChange={(e) => setSelectedTrainer(e.target.value)}
              >
                <option value="Все тренеры">Все тренеры</option>
                <option value="Надиров Арап">Надиров Арап</option>
                <option value="Минбаев Сулейман">Минбаев Сулейман</option>
                <option value="Саттаров Канатбек">Саттаров Канатбек</option>
                <option value="Абдуманап Уулу Илим">Абдуманап Уулу Илим</option>
                <option value="Онарбоев Акжол">Онарбоев Акжол</option>
                <option value="Айдар Уулу Эржигит">Айдар Уулу Эржигит</option>
              </select>

              <select
                className="manager__filter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="Все годы">Все годы</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
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
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>

              <select
                className="manager__filter"
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
              >
                <option value="Все оплаты">Все оплаты</option>
                <option value="Оплачено">Оплачено</option>
                <option value="Не оплачено">Не оплачено</option>
              </select>
            </div>

            <div className="manager__income">
              <p>Общий доход: {totalIncome} сом</p>
              <p>Фильтрованный доход: {filteredIncome} сом</p>
            </div>

            <div className="manager__client-cards">
              {filteredClients.map((client, index) => (
                <div key={index} className="manager__client-card" onClick={() => handleClientClick(index)}>
                  <h3 className="manager__client-name">{client.name}</h3>
                  <p className={`manager__client-payment manager__client-payment--${client.payment === 'Оплачено' ? 'paid' : 'unpaid'}`}>
                    Оплата: {client.payment}
                  </p>
                  {/* Show additional info only if the client card is expanded */}
                  {expandedClients[index] && (
                    <>
                      <p className="manager__client-price">Цена: {client.price} ₽</p>
                      <p className="manager__client-sport">Спорт: {client.sportCategory}</p>
                      <p className="manager__client-trainer">Тренер: {client.trainer}</p>
                      <p className="manager__client-comment">Дата: {client.day} {client.month} {client.year}</p>
                      <p className="manager__client-comment">Комментарий: {client.comment}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* {activeTab === 'add' && (
          <div className="manager__add-client">
            <h2>Добавить клиента</h2>
            <input
              type="text"
              name="name"
              placeholder="Имя клиента"
              value={newClient.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Телефон клиента"
              value={newClient.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="price"
              placeholder="Цена"
              value={newClient.price}
              onChange={handleChange}
            />
            <select
              name="sportCategory"
              value={newClient.sportCategory}
              onChange={handleChange}
            >
              <option value="Бокс">Бокс</option>
              <option value="ММА">ММА</option>
              <option value="Дзюдо">Дзюдо</option>
              <option value="Самбо">Самбо</option>
              <option value="Борьба">Борьба</option>
              <option value="Тхэквандо">Тхэквандо</option>
              <option value="Греко-римская борьба">Греко-римская борьба</option>
            </select>
            <select
              name="trainer"
              value={newClient.trainer}
              onChange={handleChange}
            >
              <option value="Надиров Арап">Надиров Арап</option>
              <option value="Минбаев Сулейман">Минбаев Сулейман</option>
              <option value="Саттаров Канатбек">Саттаров Канатбек</option>
              <option value="Абдуманап Уулу Илим">Абдуманап Уулу Илим</option>
              <option value="Онарбоев Акжол">Онарбоев Акжол</option>
              <option value="Айдар Уулу Эржигит">Айдар Уулу Эржигит</option>
            </select>
            <select
              name="payment"
              value={newClient.payment}
              onChange={handleChange}
            >
              <option value="Оплачено">Оплачено</option>
              <option value="Не оплачено">Не оплачено</option>
            </select>
            <textarea
              name="comment"
              placeholder="Комментарий"
              value={newClient.comment}
              onChange={handleChange}
            />
            <select name="year" value={newClient.year} onChange={handleChange}>
              <option value="Все годы">Все годы</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            <select name="month" value={newClient.month} onChange={handleChange}>
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
            <select name="day" value={newClient.day} onChange={handleChange}>
              <option value="Все дни">Все дни</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            <button className="manager__add-button" onClick={handleAddClient}>
              {addButtonText}
            </button>
          </div>
        )} */}

        {activeTab === 'add' && (
          <div className="manager__add-client">
            <h2 className="manager__add-client-title">Добавить клиента</h2>
            <input
              className="manager__add-client-input"
              type="text"
              name="name"
              placeholder="Имя клиента"
              value={newClient.name}
              onChange={handleChange}
            />
            <input
              className="manager__add-client-input"
              type="text"
              name="phone"
              placeholder="Телефон клиента"
              value={newClient.phone}
              onChange={handleChange}
            />
            <select
              className="manager__add-client-select"
              name="sportCategory"
              value={newClient.sportCategory}
              onChange={handleChange}
            >
              <option value="Бокс">Бокс</option>
              <option value="ММА">ММА</option>
              <option value="Дзюдо">Дзюдо</option>
              <option value="Самбо">Самбо</option>
              <option value="Борьба">Борьба</option>
              <option value="Тхэквандо">Тхэквандо</option>
              <option value="Греко-римская борьба">Греко-римская борьба</option>
            </select>
            <select
              className="manager__add-client-select"
              name="trainer"
              value={newClient.trainer}
              onChange={handleChange}
            >
              <option value="Надиров Арап">Надиров Арап</option>
              <option value="Минбаев Сулейман">Минбаев Сулейман</option>
              <option value="Саттаров Канатбек">Саттаров Канатбек</option>
              <option value="Абдуманап Уулу Илим">Абдуманап Уулу Илим</option>
              <option value="Онарбоев Акжол">Онарбоев Акжол</option>
              <option value="Айдар Уулу Эржигит">Айдар Уулу Эржигит</option>
            </select>
            <select
              className="manager__add-client-select"
              name="year"
              value={newClient.year}
              onChange={handleChange}
            >
              <option value="Все годы">Все годы</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            <select
              className="manager__add-client-select"
              name="month"
              value={newClient.month}
              onChange={handleChange}
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
              className="manager__add-client-select"
              name="day"
              value={newClient.day}
              onChange={handleChange}
            >
              <option value="Все дни">Все дни</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <input
              className="manager__add-client-input"
              type="text"
              name="price"
              placeholder="Цена"
              value={newClient.price}
              onChange={handleChange}
            />
            <select
              className="manager__add-client-select"
              name="payment"
              value={newClient.payment}
              onChange={handleChange}
            >
              <option value="Оплачено">Оплачено</option>
              <option value="Не оплачено">Не оплачено</option>
            </select>
            <textarea
              className="manager__add-client-textarea"
              name="comment"
              placeholder="Комментарий"
              value={newClient.comment}
              onChange={handleChange}
            />
            <button className="manager__add-client-button" onClick={handleAddClient}>
              {addButtonText}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
export default Manager;
