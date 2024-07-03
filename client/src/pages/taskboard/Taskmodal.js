import React,{useRef} from 'react';
import TaskForm from '../taskboard/TaskForm';
import styles from './Taskmodal.module.css';

const TaskModal = ({ isOpen, onClose, task, userId }) => {
  const modalRef = useRef();

  const closeModal = (e)=>{
    if(modalRef.current === e.target){
      onClose()
    }
  }
  return (
    isOpen && (
      <div ref={modalRef} onClick={closeModal} className={styles.modal}>
        <div className={styles.modalContent}>
          <TaskForm task={task} onClose={onClose} userId={userId} />
        </div>
      </div>
    )
  );
};

export default TaskModal;
