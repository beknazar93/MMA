// src/components/TaskItem.js
import React from 'react';

const TaskItem = ({ task, onToggleCompletion, onDelete }) => {
  return (
    <li
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}
    >
      <div>
        <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div>
        <button onClick={() => onToggleCompletion(task.id)}>
          {task.completed ? 'Выполнено' : 'Не выполнено'}
        </button>
        <button onClick={() => onDelete(task.id)} style={{ marginLeft: '10px' }}>
          Удалить
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
