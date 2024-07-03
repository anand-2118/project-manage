const Task = require('../models/task');
const User = require('../models/user');

//function for checking the date is past date of current date
const isPastDate = (date) => {
    return new Date(date) < new Date();
}

const createTask = async (req, res) => {
    try {
        const { title, priority, dueDate, state = 0, shared = false, userId } = req.body;

        if (!title || !priority) {
            res.status(400).send("title and priority are requirted")
        }
        const task = new Task({
            title,
            priority,
            dueDate,
            state,
            shared,
            createdBy: userId, // Assuming req.user is set by middleware after JWT verification
        });

        await task.save();
        res.status(201).send(task);
    } catch (error) {
        console.log(req.body, error);
        res.status(500).send({ message: error.message });
    }
};

const getTask = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const allTasks = await Task.find({ createdBy: userId });
        res.status(200).send(allTasks);
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const updateTask = async (req, res) => {
  try {
      const { title, priority, dueDate, state, shared } = req.body;
      const { id } = req.params;
      const task = await Task.findByIdAndUpdate(id);

      if (!task) {
          return res.status(404).json({ message: 'Task not found' });
      }

      task.title = title || task.title;
      task.priority = priority || task.priority;
      task.dueDate = dueDate || task.dueDate;
      task.state = state || task.state;
      task.shared = shared !== undefined ? shared : task.shared;

      if (task.state === 'done') {
          task.dueDateColor = 'green';
      } else if (isPastDate(task.dueDate)) {
          task.dueDateColor = 'red';
      } else {
          task.dueDateColor = 'gray';
      }

      await task.save();
      res.status(200).json(task);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

  const deleteTask = async (req, res) => {
    try{
        const {id} = req.params
        await Task.findByIdAndDelete(id )

        res.json({
            status:'success',
            message : "user deleted successfully"
        })
    }
    catch(error){
        res.json({
            status:'failed',
            message:'something went wrong'
        })
    }
}
  



module.exports = { isPastDate, createTask ,getTask,deleteTask,updateTask}

