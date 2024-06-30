import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/taskContext';
import styles from './TaskForm.module.css'

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [checklist, setChecklist] = useState([{ item: '', completed: false }]);

  const handleSave = () => {
    addTask({ title, priority, dueDate, checklist });
    setTitle('');
    setPriority('');
    setDueDate('');
    setChecklist([{ item: '', completed: false }]);
  };

  const handleAddChecklistItem = () => {
    setChecklist([...checklist, { item: '', completed: false }]);
  };

  return (
    <div className={styles.form}>
    <label htmlFor="">Title*</label><br />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={styles.priorityContainer}>
      <label htmlFor="">Select Priority*</label>
        <div className={styles.priorities}>
          <div className={styles.high}>HIGH PRIORITY</div>
          <div className={styles.medium}>MEDIUM PRIORITY</div>
          <div className={styles.low}>LOW PRIORITY</div>
        </div>
        </div>

      <div className={styles.checklist}>
        <h3>Checklist</h3>
        {checklist.map((item, index) => (
          <input
            key={index}
            type="text"
            value={item.item}
            onChange={(e) =>
              setChecklist(
                checklist.map((check, i) =>
                  i === index ? { ...check, item: e.target.value } : check
                )
              )
            }
          />
        ))}
        <button type="button" onClick={handleAddChecklistItem}>
          Add Item
        </button>
      </div>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      
      <div className={styles.actions}>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default TaskForm;
