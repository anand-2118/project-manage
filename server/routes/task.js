const express = require('express');
const router = express.Router();
const { createTask, getTask, deleteTask, updateTask } = require('../controllers/task');

router.post('/tasks',  createTask);
router.get('/alltasks',  getTask);
router.patch('/updatetask/:jobNumber',  updateTask);
router.delete('/deletetask/:id', deleteTask);

module.exports = router;
