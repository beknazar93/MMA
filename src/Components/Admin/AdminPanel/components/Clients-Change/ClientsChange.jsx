import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const EditClient = () => {
  // Состояния для хранения данных клиента и ошибки
  const [client, setClient] = useState({
    name: "",
    email: "",
    phone: "",
    stage: "",
    payment: "",
    price: "",
    sport_category: "",
    trainer: "",
    year: "",
    month: "",
    day: "",
    comment: "",
  });

  const [error, setError] = useState(null);
  const { id } = useParams(); // Получаем ID клиента из URL
  const history = useHistory(); // Для редиректа после успешного обновления

  // Загружаем данные клиента при монтировании компонента
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(
          `https://beknazarosh.pythonanywhere.com/api/clients/${id}/`
        );
        setClient(response.data);
      } catch (error) {
        setError("Ошибка при загрузке данных клиента");
      }
    };

    fetchClient();
  }, [id]);

  // Обработчик изменения данных в форме
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      [name]: value,
    });
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Отправляем обновленные данные клиента на сервер
      await axios.patch(
        `https://beknazarosh.pythonanywhere.com/api/clients/${id}/`,
        client
      );

      // Перенаправляем пользователя на страницу клиента после успешного обновления
      history.push(`/clients/${id}`);
    } catch (error) {
      setError("Ошибка при обновлении данных клиента");
    }
  };

  return (
    <div>
      <h1>Редактировать клиента</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input
            type="text"
            name="name"
            value={client.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={client.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Телефон:</label>
          <input
            type="text"
            name="phone"
            value={client.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Стадия:</label>
          <input
            type="text"
            name="stage"
            value={client.stage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            Оплата:
            <input
              type="text"
              name="payment"
              value={client.payment}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>Цена:</label>
          <input
            type="text"
            name="price"
            value={client.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Категория спорта:</label>
          <input
            type="text"
            name="sport_category"
            value={client.sport_category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Тренер:</label>
          <input
            type="text"
            name="trainer"
            value={client.trainer}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Год:</label>
          <input
            type="text"
            name="year"
            value={client.year}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Месяц:</label>
          <input
            type="text"
            name="month"
            value={client.month}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>День:</label>
          <input
            type="text"
            name="day"
            value={client.day}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Комментарий:</label>
          <textarea
            name="comment"
            value={client.comment}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Сохранить изменения</button>
      </form>
    </div>
  );
};

export default EditClient;
