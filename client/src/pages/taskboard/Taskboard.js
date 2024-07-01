import React, { useContext,useState, useEffect } from 'react';
import { TaskContext } from '../context/taskContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import Task from '../taskboard/Task';
import TaskModal from '../taskboard/Taskmodal'; // Ensure this import path is correct
import styles from '../taskboard/Taskboard.module.css'

// 0 -> todo, 1 -> backlog, 2 -> in-progress, 3 -> done 
const Taskboard = () => {
  const { tasks, updateTask, getAllTasks } = useContext(TaskContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllTasks();
    console.log('getting all tasks');
  }, []);
  const moveTask = (taskId, newState) => {
    const task = tasks.find(task => task._id === taskId);
    updateTask(taskId, { ...task, state: newState });
  };

  const renderTasks = (state) => {
    console.log(tasks);
    return tasks
      .filter(task => task.state === state)
      .map(task => (
        <Task key={task._id} task={task} moveTask={moveTask} />
      ));
  };

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.taskboards}>
      <div className={styles.column}>
        <h2>Backlog</h2>
        {renderTasks(1)}
      </div>
      <div className={styles.column}>
      <div className={styles.todoHead}>
        <div>
          <h2>Todo</h2>
        </div>
        <div className={styles.icons}>
          <FontAwesomeIcon icon={faPlus} onClick={handleOpenModal} />
          <FontAwesomeIcon icon={isCollapsed ? faAngleUp : faAngleDown} onClick={handleCollapse} />
        </div>
      </div>
        {renderTasks(0)}
      </div>
      <div className={styles.column}>
        <h2>In Progress</h2>
        {renderTasks(2)}
      </div>
      <div className={styles.column}>
        <h2>Done</h2>
        {renderTasks(3)}
      </div>
      <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} task={null} />
    </div>
  );
};

export default Taskboard;
