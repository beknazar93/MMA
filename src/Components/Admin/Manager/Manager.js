import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Manager = () => {
  const SHEETDB_URL = 'https://beknazarosh.pythonanywhere.com/api/clients/?format=json'; // Замените на ваш URL
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

  // Получаем клиентов из Google Sheets
  const fetchClients = async () => {
    try {
      const response = await axios.get(SHEETDB_URL);
      setClients(response.data);
    } catch (error) {
      console.error('Ошибка при получении клиентов:', error);
    }
    // axios('https://beknazarosh.pythonanywhere.com/api/clients/?format=json')
    // .then(({data})=> setClients(data)).catch(error=> console.log(error))
  };

  useEffect(() => {
    fetchClients(); // Получаем клиентов при монтировании компонента
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({ ...prevClient, [name]: value }));
  };

  const handleAddClient = async () => {
    if (newClient.name && newClient.phone && newClient.price) {
      try {
        await axios.post('https://beknazarosh.pythonanywhere.com/api/clients/', {
          data: newClient,
        });
        fetchClients(); // Обновляем список клиентов

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

  // Фильтруем клиентов по выбранным категориям
  // const filteredClients = clients.filter((client) => {
  //   return (
  //     (selectedSport === 'Все виды спорта' || client.sportCategory === selectedSport) &&
  //     (selectedTrainer === 'Все тренеры' || client.trainer === selectedTrainer) &&
  //     (selectedYear === 'Все годы' || client.year === selectedYear) &&
  //     (selectedMonth === 'Все месяцы' || client.month === selectedMonth) &&
  //     (selectedDay === 'Все дни' || client.day === selectedDay)
  //   );
  // });
  const filteredClients = Array.isArray(clients) ? clients.filter((client) => {
    return (
      (selectedSport === 'Все виды спорта' || client.sportCategory === selectedSport) &&
      (selectedTrainer === 'Все тренеры' || client.trainer === selectedTrainer) &&
      (selectedYear === 'Все годы' || client.year === selectedYear) &&
      (selectedMonth === 'Все месяцы' || client.month === selectedMonth) &&
      (selectedDay === 'Все дни' || client.day === selectedDay)
    );
  }) : [];

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
            </div>

            {filteredClients.map((client, index) => (
              <div key={index} className="manager__client-card">
                <h3 className="manager__client-name">{client.name}</h3>
                <p className="manager__client-phone">Телефон: {client.phone}</p>
                <p
                  className={`manager__client-payment manager__client-payment--${client.payment === 'Оплачено' ? 'paid' : 'unpaid'}`}
                >
                  Оплата: {client.payment}
                </p>
                <p className="manager__client-price">Цена: {client.price} ₽</p>
                <p className="manager__client-sport">Спорт: {client.sportCategory}</p>
                <p className="manager__client-trainer">Тренер: {client.trainer}</p>
                <p className="manager__client-comment">Комментарий: {client.comment}</p>
                <p className="manager__client-date">Дата: {client.day} {client.month} {client.year}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'add' && (
          <div className="manager__add-client">
            <input
              type="text"
              name="name"
              placeholder="Имя"
              className="manager__input"
              value={newClient.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Телефон"
              className="manager__input"
              value={newClient.phone}
              onChange={handleChange}
            />
            <select
              name="sportCategory"
              className="manager__select"
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
              className="manager__select"
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
            <select name="year" className="manager__select" value={newClient.year} onChange={handleChange}>
              <option value="Все годы">Все годы</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            <select name="month" className="manager__select" value={newClient.month} onChange={handleChange}>
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
            <select name="day" className="manager__select" value={newClient.day} onChange={handleChange}>
              <option value="Все дни">Все дни</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <input
              type="number"
              name="price"
              placeholder="Цена"
              className="manager__input"
              value={newClient.price}
              onChange={handleChange}
            />
            <select
              name="payment"
              className="manager__select"
              value={newClient.payment}
              onChange={handleChange}
            >
              <option value="Оплачено">Оплачено</option>
              <option value="Не оплачено">Не оплачено</option>
            </select>
            <textarea
              name="comment"
              placeholder="Комментарий"
              className="manager__textarea"
              value={newClient.comment}
              onChange={handleChange}
            />
            <button className="manager__add-button" onClick={handleAddClient}>{addButtonText}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manager;

