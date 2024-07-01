import React from 'react';
import styles from './Task.module.css';

const Task = ({ task, moveTask }) => {
  return (
    <div className={styles.task}>
      <h3>{task.title}</h3>
      <p>Priority: {task.priority}</p>
      <p>Due Date: {task.dueDate}</p>
      <div className={styles.actions}>
        {task.state !== '1' && (
          <button onClick={() => moveTask(task._id, 1)}>Backlog</button>
        )}
        {task.state !== 0 && (
          <button onClick={() => moveTask(task._id, 0)}>To Do</button>
        )}
        {task.state !== 2 && (
          <button onClick={() => moveTask(task._id, 2)}>In Progress</button>
        )}
        {task.state !== 3 && (
          <button onClick={() => moveTask(task._id, 3)}>Done</button>
        )}
      </div>
    </div>
  );
};

export default Task;
