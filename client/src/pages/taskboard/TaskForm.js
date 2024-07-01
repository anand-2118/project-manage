import React, { useState, useContext,useRef} from 'react';
import { TaskContext } from '../context/taskContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash  } from '@fortawesome/free-solid-svg-icons';
import styles from './TaskForm.module.css'

const TaskForm = (task,onClose) => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [checklist, setChecklist] = useState([]);
  const dateInputRef = useRef(null);

  const handleButtonClick = () => {
    dateInputRef.current.showPicker();
  };

  const handleSave = async () => {
    addTask({ title, priority, dueDate, checklist });
    setTitle('');
    setPriority('medium');
    setDueDate('');
    setChecklist([{ item: '', completed: false }]);
  };

  

  const handleAddChecklistItem = () => {
    setChecklist([...checklist, { item: '', completed: false }]);
  };

  const handleDeleteChecklistItem = (id) => {
    setChecklist(checklist.filter((check) => check.id !== id));
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
      <label htmlFor="Checklist">Checklist*</label><br />
      {checklist.map((item, index) => (
          <div key={item.id} className={styles.checklistItem}>
          <input
            type="text"
            value={item.item}
            onChange={(e) =>
              setChecklist(
                checklist.map((check) =>
                  check.id === item.id ? { ...check, item: e.target.value } : check
                )
              )
            }
          />
          <FontAwesomeIcon icon={faTrash}  onClick={() => handleDeleteChecklistItem(item.id)}
            className={styles.deleteButton} />
          
        </div>
          
        ))}
        
        <button type="button" onClick={handleAddChecklistItem}>
          Add Item
        </button>
      </div>

      <button onClick={handleButtonClick}>Select Due Date</button>
      <input
        type="date"
        ref={dateInputRef}
        style={{ display: 'none' }}
        onChange={(e) => console.log(e.target.value)} 
      />
      
      <div className={styles.actions}>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>cancel</button>

      </div>
    </div>
  );
};

export default TaskForm;
