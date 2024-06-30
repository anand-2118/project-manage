import React, { createContext, useState, useEffect } from 'react';
import taskService from '../services/taskServices';

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    taskService.getTasks().then(setTasks);
  }, []);

  const addTask = (task) => {
    taskService.createTask(task).then((newTask) => {
      setTasks([...tasks, newTask]);
    });
  };

  const updateTask = (taskId, updatedTask) => {
    taskService.updateTask(taskId, updatedTask).then(() => {
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
    });
  };

  const deleteTask = (taskId) => {
    taskService.deleteTask(taskId).then(() => {
      setTasks(tasks.filter((task) => task._id !== taskId));
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
