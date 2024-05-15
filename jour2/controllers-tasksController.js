const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '..', 'data.json');
function getAllTasks(req, res) {
  try {
    const tasks = JSON.parse(fs.readFileSync(dataFilePath));
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
function createTask(req, res) {
  try {
    const tasks = JSON.parse(fs.readFileSync(dataFilePath));
    const newTask = req.body;
    newTask.id = Date.now().toString();
    tasks.push(newTask);
    fs.writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2));
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
function updateTask(req, res) {
  try {
    const tasks = JSON.parse(fs.readFileSync(dataFilePath));
    const taskId = req.params.id;
    const updatedTaskData = req.body;
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTaskData };
    fs.writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2));
    res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
function deleteTask(req, res) {
  try {
    const tasks = JSON.parse(fs.readFileSync(dataFilePath));
    const taskId = req.params.id;
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    if (updatedTasks.length === tasks.length) {
      return res.status(404).json({ error: 'Task not found' });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(updatedTasks, null, 2));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};