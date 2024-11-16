// src/context/TasksContext.js
import React, { createContext, useContext, useState } from 'react';

// Создаем контекст
const TasksContext = createContext();

// Создаем провайдер для TasksContext
export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Функция для добавления задачи
  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Функция для удаления задачи по id
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Функция для переключения статуса выполнения задачи
  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Контекст, который передается дочерним компонентам
  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, toggleTaskCompletion }}>
      {children}
    </TasksContext.Provider>
  );
};

// Хук для использования TasksContext
export const useTasks = () => useContext(TasksContext);
