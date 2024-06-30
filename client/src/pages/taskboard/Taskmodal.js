import React from 'react';
import TaskForm from '../taskboard/TaskForm';
import styles from './Taskmodal.module.css';

const TaskModal = ({ isOpen, onClose, task }) => {
  return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <TaskForm task={task} onClose={onClose} />
        </div>
      </div>
    )
  );
};

export default TaskModal;
