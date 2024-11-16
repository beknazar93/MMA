// src/components/Sidebar/Sidebar.jsx
import React from "react";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import logo from "./img/mlogo.png";
const Sidebar = () => (
  <div className={styles.sidebar}>
    <div className={styles.logo}>
      <img className="logo" src={logo} alt="logo" /> <p>CRM система</p>
    </div>
    <ul className={styles.navList}>
      <li className={styles.navItem}>
        <Link className="link" to="admin">
          Dashboard
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link className="link" to="clients">
          Клиенты
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link className="link" to="deals">
          Специальные предложения
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link className="link" to="tasks">
          Задачи
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link className="link" to="analytics">
          Аналитика
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link className="link" to="settings">
          Настройки
        </Link>
      </li>
    </ul>
  </div>
);

export default Sidebar;
