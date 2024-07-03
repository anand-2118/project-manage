import React,{useState} from 'react';
import styles from './Task.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const Task = ({ task, moveTask }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={styles.task}>
      <div className={styles.taskHead}>
        <p>Priority: {task.priority}</p>
        <div className={styles.dropdown}>
      <p className={styles.dropdowntoggle} onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </p>
      {isOpen && (
        <div className={styles.dropdownmenu}>
         <div>edit</div>
         <div>share</div>
         <div>delete</div>
        </div>
      )}
    </div>
      </div>
      <div className={styles.title}><h3>{task.title}</h3></div>
      <div className={styles.taskfooter}>
        <div className={styles.dueDate}><button>select sueDate:{task.dueDate}</button></div>
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
      </div>
      );
};

      export default Task;
