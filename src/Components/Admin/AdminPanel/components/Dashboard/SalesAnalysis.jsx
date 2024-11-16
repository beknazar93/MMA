// src/components/Dashboard/SalesAnalysis.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SalesAnalysis = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для получения данных с API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://beknazarosh.pythonanywhere.com/api/clients/"
        );
        const clientsData = response.data;

        // Группируем данные по месяцам и считаем доход
        const monthlyData = {};

        clientsData.forEach((client) => {
          const { month, price, payment } = client;
          if (payment === "оплачено") {
            if (!monthlyData[month]) {
              monthlyData[month] = 0;
            }
            monthlyData[month] += parseFloat(price) || 0;
          }
        });

        // Преобразуем данные для графика
        const formattedData = Object.keys(monthlyData).map((month) => ({
          month,
          revenue: monthlyData[month],
        }));

        setData(formattedData);
        setLoading(false);
      } catch (error) {
        setError("Не удалось загрузить данные.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Если данные еще загружаются, показываем индикатор загрузки
  if (loading) return <p>Загрузка данных...</p>;

  // Если произошла ошибка, показываем сообщение об ошибке
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesAnalysis;
