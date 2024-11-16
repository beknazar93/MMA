// src/components/Dashboard/SalesFunnel.jsx
import React from "react";
import { FunnelChart, Funnel, Tooltip, Legend } from "recharts";

const SalesFunnel = () => {
  const data = [
    { stage: "Лиды", value: 100 },
    { stage: "Контакты", value: 80 },
    { stage: "Переговоры", value: 60 },
    { stage: "Сделки", value: 30 },
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <FunnelChart width={500} height={300}>
        <Funnel dataKey="value" data={data} isAnimationActive>
          <Tooltip />
        </Funnel>
        <Legend />
      </FunnelChart>
    </div>
  );
};

export default SalesFunnel;
