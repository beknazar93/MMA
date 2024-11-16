import React from "react";
import { useTasks } from "../context/TasksContext";
import TaskForm from "../components/TaskForm/TaskForm";
import TaskList from "../components/TaskForm/TaskList";

const TasksPage = () => {
  const { tasks, addTask, deleteTask, toggleTaskCompletion } = useTasks();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Список задач</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onToggleCompletion={toggleTaskCompletion}
        onDelete={deleteTask}
      />
    </div>
  );
};

export default TasksPage;
