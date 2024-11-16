// components/Analytics/SalesChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";

const SalesChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar data={data} />;
};

export default SalesChart;
