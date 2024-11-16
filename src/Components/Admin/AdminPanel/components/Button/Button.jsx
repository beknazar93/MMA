// src/components/Button/Button.jsx
import React from "react";
import styles from "./Button.module.css";

const Button = ({ onClick, children, variant = "primary" }) => (
  <button onClick={onClick} className={styles[variant]}>
    {children}
  </button>
);

export default Button;
