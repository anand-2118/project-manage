import React, { useState } from 'react';
import styles from '../dashboard/Dashboard.module.css'
import Taskboard from '../taskboard/Taskboard';
import Settings from '../../sidebar/Settings';
//import TaskForm from '../taskboard/TaskForm';

const Dashboard = () => {
  const [filter, setFilter] = useState('this week');

  return (
    <div className={styles.dashboard}>
      <div className={styles.sidebar}>
        <ul>
          <li>Board</li>
          <li>Analytics</li>
          <li><Settings/></li>
        </ul>
      </div>
      <div className={styles.right}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <h1>Task Dashboard</h1>
            </div>
            <div className={styles.filter}>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="today">Today</option>
                <option value="this week">This Week</option>
                <option value="this month">This Month</option>
              </select>
            </div>
          </div>

        <div className={styles.taskBoardArea}>
        <Taskboard />
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
