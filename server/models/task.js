const mongoose  = require('mongoose');
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    priority:{
        type:String,
        required:true,
        enum:['low','medium','high']
    },
    dueDate:{
        type:Date
    },
    state: { 
        type: Number, 
        default: 0,
        enum: [0, 1, 2, 3]
     },
     shared: { 
        type: Boolean, 
        default: false 
    },
    checklist: [
    {
      item: {
        type: String,
        required: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    //required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },


})
const Task = mongoose.model('Task',taskSchema);
module.exports= Task;