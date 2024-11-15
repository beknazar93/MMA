import React, { useState, useEffect } from 'react';
import './AdminPanel.scss';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [clients, setClients] = useState([]);
  const [expandedClient, setExpandedClient] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [editedClientData, setEditedClientData] = useState({
    name: '',
    phone: '',
    price: '',
    sport_category: '',
    trainer: '',
    comment: '',
  });
  const [searchQuery, setSearchQuery] = useState(''); // состояние для поиска

  const API_URL = 'https://beknazarosh.pythonanywhere.com/api/clients/';

  // Получаем данные о клиентах
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Ошибка при получении данных о клиентах:', error);
      }
    };
    fetchClients();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleToggleDetails = (id) => {
    setExpandedClient(expandedClient === id ? null : id);
  };

  const handleEditClick = (client) => {
    setEditingClient(client.id);
    setEditedClientData({
      name: client.name,
      phone: client.phone,
      price: client.price,
      sport_category: client.sport_category,
      trainer: client.trainer,
      comment: client.comment,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Проверка перед отправкой данных
      console.log('Отправляемые данные:', editedClientData);

      // Обновление данных клиента через API
      const response = await fetch(`${API_URL}${editingClient}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedClientData), // Передаем данные в теле запроса
      });

      if (!response.ok) {
        throw new Error('Не удалось обновить клиента');
      }

      const updatedClient = await response.json();
      console.log('Обновленный клиент:', updatedClient);

      // Обновляем состояние с новым клиентом
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === editingClient ? updatedClient : client
        )
      );

      // Скрываем форму редактирования после успешного обновления
      setEditingClient(null);
    } catch (error) {
      console.error('Ошибка при обновлении клиента:', error);
      alert('Произошла ошибка при обновлении данных клиента');
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await fetch(`${API_URL}${id}/`, {
        method: 'DELETE',
      });
      setClients((prevClients) => prevClients.filter((client) => client.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении клиента:', error);
    }
  };

  // Фильтрация клиентов по имени
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-panel">
      <aside className="admin-panel__sidebar">
        <div className="admin-panel__logo">CRM система</div>
        <nav className="admin-panel__menu">
          <button
            className={`admin-panel__menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleTabClick('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`admin-panel__menu-item ${activeTab === 'clients' ? 'active' : ''}`}
            onClick={() => handleTabClick('clients')}
          >
            Клиенты
          </button>
          <button
            className={`admin-panel__menu-item ${activeTab === 'offers' ? 'active' : ''}`}
            onClick={() => handleTabClick('offers')}
          >
            Специальные предложения
          </button>
          <button
            className={`admin-panel__menu-item ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => handleTabClick('tasks')}
          >
            Задачи
          </button>
          <button
            className={`admin-panel__menu-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => handleTabClick('analytics')}
          >
            Аналитика
          </button>
          <button
            className={`admin-panel__menu-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => handleTabClick('settings')}
          >
            Настройки
          </button>
        </nav>
      </aside>

      <main className="admin-panel__content">
        <h1>{activeTab}</h1>

        {activeTab === 'clients' && (
          <div className="admin__client-list">
            {/* Поле для поиска */}
            <input
              type="text"
              placeholder="Поиск по имени"
              className="admin__search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {filteredClients.length ? (
              filteredClients.map((c) => (
                <div key={c.id} className="admin__client-card">
                  <div className="admin__client-header">
                    <h3 className="admin__client-name">{c.name}</h3>
                    <p
                      className={`admin__client-payment ${c.payment === 'оплачено' ? 'paid' : 'unpaid'}`}
                    >
                      Оплата: {c.payment}
                    </p>
                  </div>

                  <button
                    onClick={() => handleToggleDetails(c.id)}
                    className="admin__toggle-details-button"
                  >
                    {expandedClient === c.id ? 'Скрыть подробности' : 'Показать подробности'}
                  </button>

                  {expandedClient === c.id && (
                    <div className="admin__client-details">
                      <p className="admin__client-phone">Телефон: {c.phone}</p>
                      <p className="admin__client-price">Цена: {c.price}</p>
                      <p className="admin__client-sport-category">Категория спорта: {c.sport_category}</p>
                      <p className="admin__client-trainer">Тренер: {c.trainer}</p>
                      <p className="admin__client-comment">Комментарий: {c.comment}</p>
                      <p className="admin__client-date">Дата: {c.day} {c.month} {c.year}</p>
                    </div>
                  )}

                  <button onClick={() => handleEditClick(c)} className="admin__edit-button">
                    Редактировать
                  </button>
                  <button onClick={() => handleDeleteClient(c.id)} className="admin__delete-button">
                    Удалить
                  </button>
                </div>
              ))
            ) : (
              <p>Нет клиентов для отображения.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
