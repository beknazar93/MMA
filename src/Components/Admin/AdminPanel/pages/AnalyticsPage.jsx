import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AnalyticsPage = () => {
  const [monthlyData, setMonthlyData] = useState([]); // Данные доходов и активных клиентов
  const [clientDistribution, setClientDistribution] = useState([]); // Данные для распределения клиентов
  const [loading, setLoading] = useState(true); // Для отображения загрузки
  const [error, setError] = useState(null); // Для обработки ошибок

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://beknazarosh.pythonanywhere.com/api/clients/"
        );
        const data = response.data;

        // Группируем данные по месяцам
        const revenueByMonth = {};
        const sportDistribution = {};

        data.forEach((client) => {
          const { month, payment, price, sport_category } = client;

          // Суммируем доходы по месяцам
          if (payment === "оплачено") {
            if (!revenueByMonth[month]) {
              revenueByMonth[month] = { revenue: 0, activeClients: 0 };
            }
            revenueByMonth[month].revenue += parseFloat(price) || 0;
            revenueByMonth[month].activeClients += 1;
          }

          // Считаем распределение клиентов по категориям спорта
          if (sport_category) {
            sportDistribution[sport_category] =
              (sportDistribution[sport_category] || 0) + 1;
          }
        });

        // Сортировка месяцев от Января до Декабря
        const monthsOrder = [
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

        // Формируем данные для графиков
        const sortedMonthlyData = Object.keys(revenueByMonth)
          .sort((a, b) => monthsOrder.indexOf(a) - monthsOrder.indexOf(b))
          .map((month) => ({
            month,
            revenue: revenueByMonth[month].revenue,
            activeClients: revenueByMonth[month].activeClients,
          }));

        setMonthlyData(sortedMonthlyData);

        setClientDistribution(
          Object.keys(sportDistribution).map((category) => ({
            category,
            value: sportDistribution[category],
          }))
        );

        setLoading(false); // Отключаем загрузку
      } catch (err) {
        setError("Не удалось загрузить данные для аналитики.");
        setLoading(false); // Отключаем загрузку при ошибке
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Загрузка данных...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Аналитика</h1>
      <div
        className="kot"
        style={{
          display: "flex",

          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Графики для доходов и активных клиентов */}
        <div
          className="kot-analitic"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
          }}
        >
          {/* График доходов по месяцам */}
          <div style={{ width: "100%", maxWidth: "600px", height: "300px" }}>
            <h3>Доход по месяцам</h3>
            <ResponsiveContainer>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* График активных клиентов по месяцам */}
          <div style={{ width: "100%", maxWidth: "600px", height: "300px" }}>
            <h3>Активные клиенты по месяцам</h3>
            <ResponsiveContainer>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="activeClients" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Распределение клиентов по категориям */}
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "400px",
            flex: 1,
          }}
        >
          <h3>Распределение клиентов по категориям спорта</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={clientDistribution}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {clientDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
