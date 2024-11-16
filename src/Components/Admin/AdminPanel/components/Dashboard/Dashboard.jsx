// src/components/Dashboard/Dashboard.jsx
import React from "react";
import styles from "./Dashboard.module.css";
import Tasks from "../../pages/TasksPage";
import SalesFunnel from "./SalesFunnel";
import SalesAnalysis from "./SalesAnalysis";

const Dashboard = () => (
  <div className={styles.dashboard}>
    <div className={styles.widget}>
      <h3>Задачи</h3>
      <Tasks />
    </div>
    <div className={styles.widget}>
      <h3>Анализ продаж</h3>
      <SalesAnalysis />
    </div>
    <div className={styles.widget}>
      <h3>Ход сделок</h3>
      <SalesFunnel />
    </div>
  </div>
);

export default Dashboard;
