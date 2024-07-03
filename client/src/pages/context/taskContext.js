import React, { createContext, useState, useEffect } from 'react';
import taskService from '../services/taskServices';

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const getAllTasks = (userId) => {
    console.log(userId);
    taskService.getAllTasks(userId).then((tasks) => {
      setTasks(tasks);
    });
  }
  const addTask = (task) => {
    taskService.createTask(task).then((newTask) => {
      console.log('newTask', newTask);
      setTasks([...tasks, newTask]);
    })
  }

  const updateTask = (taskId, updatedTask) => {
    taskService.upDateTask(taskId, updatedTask).then(() => {
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
    });
  };

  const deleteTask = (taskId) => {
    taskService.deleteTask(taskId).then(() => {
      setTasks(tasks.filter((task) => task._id !== taskId));
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, getAllTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
