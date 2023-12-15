const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({

  
  taskName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  assignee: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  userId:{
    type: String,

  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
