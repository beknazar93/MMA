// src/components/TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title && newTask.description) {
      onAddTask({ ...newTask, id: Date.now(), completed: false });
      setNewTask({ title: '', description: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        name="title"
        placeholder="Название задачи"
        value={newTask.title}
        onChange={handleInputChange}
        style={{ marginRight: '10px' }}
      />
      <input
        type="text"
        name="description"
        placeholder="Описание задачи"
        value={newTask.description}
        onChange={handleInputChange}
        style={{ marginRight: '10px' }}
      />
      <button type="submit">Добавить задачу</button>
    </form>
  );
};

export default TaskForm;
