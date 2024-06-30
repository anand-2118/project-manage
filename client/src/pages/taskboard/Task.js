import React from 'react';
import styles from './Task.module.css';

const Task = ({ task, moveTask }) => {
  return (
    <div className={styles.task}>
      <h3>{task.title}</h3>
      <p>Priority: {task.priority}</p>
      <p>Due Date: {task.dueDate}</p>
      <div className={styles.actions}>
        {task.state !== 'backlog' && (
          <button onClick={() => moveTask(task._id, 'backlog')}>Backlog</button>
        )}
        {task.state !== 'todo' && (
          <button onClick={() => moveTask(task._id, 'todo')}>To Do</button>
        )}
        {task.state !== 'in-progress' && (
          <button onClick={() => moveTask(task._id, 'in-progress')}>In Progress</button>
        )}
        {task.state !== 'done' && (
          <button onClick={() => moveTask(task._id, 'done')}>Done</button>
        )}
      </div>
    </div>
  );
};

export default Task;
