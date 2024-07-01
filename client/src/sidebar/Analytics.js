import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import styles from './Analytics.module.css';

const Analytics = () => {
    const { tasks } = useContext(AppContext);

    const getCountByState = (state) => {
        return tasks.filter(task => task.state === state).length;
    };

    const getCountByPriority = (priority) => {
        return tasks.filter(task => task.priority === priority).length;
    };

    const getDueDateStatus = (dueDate) => {
        const today = new Date();
        const taskDate = new Date(dueDate);
        if (taskDate < today) {
            return 'overdue';
        } else if (taskDate.toDateString() === today.toDateString()) {
            return 'due today';
        } else {
            return 'upcoming';
        }
    };

    return (
        <div className={styles.analytics}>
            <h2>Analytics</h2>
            <div className={styles.section}>
                <h3>Tasks by State</h3>
                <ul>
                    <li>Backlog: {getCountByState('backlog')}</li>
                    <li>Todo: {getCountByState('todo')}</li>
                    <li>In Progress: {getCountByState('progress')}</li>
                    <li>Done: {getCountByState('done')}</li>
                </ul>
            </div>
            <div className={styles.section}>
                <h3>Tasks by Priority</h3>
                <ul>
                    <li>Low: {getCountByPriority('Low')}</li>
                    <li>Medium: {getCountByPriority('Medium')}</li>
                    <li>High: {getCountByPriority('High')}</li>
                    <li>Overdue: {getCountByDueDateStatus('overdue')}</li>
                </ul>
            </div>
        </div>
    );
};

export default Analytics;
