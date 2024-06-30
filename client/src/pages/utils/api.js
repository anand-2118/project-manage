import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/', // Change this to your API base URL
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
