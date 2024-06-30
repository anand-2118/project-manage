import api from '../utils/api';

const getTasks = () => {
  return api.get('/tasks').then((res) => res.data);
};

const createTask = (task) => {
  return api.post('/tasks', task).then((res) => res.data);
};

const updateTask = (taskId, updatedTask) => {
  return api.put(`/tasks/${taskId}`, updatedTask).then((res) => res.data);
};

const deleteTask = (taskId) => {
  return api.delete(`/tasks/${taskId}`).then((res) => res.data);
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
