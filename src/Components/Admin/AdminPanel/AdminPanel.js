import React, { useState, useEffect } from 'react';
import './AdminPanel.scss';
import { Routes, Route,  } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import DashboardPage from './pages/DashboardPage';
import ClientsPage from './pages/ClientsPage';
import DealsPage from './pages/DealsPage';
import TasksPage from './pages/TasksPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import './styles/global.css';
import { ClientsProvider } from './context/ClientsContext';
import './AdminPanel.css'
import { TasksProvider } from './context/TasksContext';

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
    
    <TasksProvider>
  <ClientsProvider>
      <div className="AdminPanel">
        <Sidebar />
         <Routes>
            <Route path="admin" element={<DashboardPage />} />
            <Route path="clients" element={<ClientsPage  />} />
            <Route path="deals" element={<DealsPage/>} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
           <Route path="settings" element={<SettingsPage />} />
          </Routes>
      
      </div>
      </ClientsProvider>
       </TasksProvider>
  )
};

export default AdminPanel;
