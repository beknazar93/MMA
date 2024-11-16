// src/components/TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleCompletion, onDelete }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleCompletion={onToggleCompletion}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
