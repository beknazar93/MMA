
import axios from 'axios';

const API_URL = 'https://beknazarosh.pythonanywhere.com/api/clients'; // Убедитесь, что URL правильный

// Настройка axios для обработки ошибок и CORS
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Получить список клиентов
const clientData = [
  {
    "id": 55,
    "name": "Абытов Дияр",
    "email": "primer@gmail.com",
    "phone": "0701 11 15 44",
    "time_create": "2024-11-14T05:25:21.256609Z",
    "time_update": "2024-11-14T05:25:21.256647Z",
    "stage": "Упол эже",
    "payment": "оплачено",
    "price": "2200",
    "sport_category": "Sambo",
    "trainer": "Мирлан",
    "year": "2024",
    "month": "Октябрь",
    "day": "17",
    "comment": "я люблю себя"
  }
]


export const fetchClients = async () => {
  
   try {
        const result = await addClient(clientData);
        console.log("Данные успешно отправлены:", result);
      } catch (error) {
        console.error("Ошибка отправки данных:", error);
      }
};

// Добавить клиента
export const addClient = async (clientData) => {
  try {
    const response = await axiosInstance.post('/', clientData);
    return response.data;
  } catch (error) {
    console.error('Error adding client:', error);
    throw error; // Бросаем ошибку для дальнейшей обработки
  }
};

// Обновить клиента
export const updateClient = async (clientId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/${clientId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating client:', error);
    throw error; // Бросаем ошибку для дальнейшей обработки
  }
};

// Удалить клиента
export const deleteClient = async (clientId) => {
  try {
    await axiosInstance.delete(`/${clientId}`);
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error; // Бросаем ошибку для дальнейшей обработки
  }
};
