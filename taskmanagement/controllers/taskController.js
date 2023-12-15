const Task = require('../models/taskModel');

const getAllTasks = async (req, res) => {
  try {
    const sortValue = req.body.sortValue || 1; // Default to ascending order if not provided
    const search = req.body.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex

    const tasks = await Task.find({ $or: [{ taskName: searchRegex }, { description: searchRegex }] })
      .sort({ dueDate: parseInt(sortValue) });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      res.status(404).json({ message: 'Cannot find any task' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTasksByUserId = async (req, res) => {
  try {
    const { userId, sortValue, searchValue } = req.body;

    const searchRegex = new RegExp(searchValue || '', 'i'); // Case-insensitive search regex

    const tasks = await Task.find({
      userId: userId,
      $or: [{ taskName: searchRegex }, { description: searchRegex }],
    }).sort({ dueDate: parseInt(sortValue) || 1 }); // Default to ascending order if not provided
console.log("tasks",tasks);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json({ message: 'Task added successfully'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });

    if (!task) {
      res.status(404).json({ message: 'Cannot find any task' });
    }

    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      res.status(404).json({ message: 'Cannot find any task' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  getTasksByUserId,
  addTask,
  updateTask,
  deleteTask,
};
