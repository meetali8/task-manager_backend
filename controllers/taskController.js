const { getAllTasks, addTask, deleteTask } = require('../models/taskModel');
const { validationResult } = require('express-validator');

const getTasks = async (req, res) => {
	try {
		const tasks = await getAllTasks();
		res.status(200).json({ statusCode: 200, message: 'Tasks fetched successfully.', tasks });
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

const createTask = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorMessages = errors.array().map((error) => error.msg);
		return res
			.status(400)
			.json({ statusCode: 400, message: errorMessages});
	}
	const { title, description } = req.body;
	try {
		const task = await addTask(title, description);
		res.status(201).json({ statusCode: 200, message: 'Task created successfully', task });
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

const removeTask = async (req, res) => {
	const { id } = req.params;
	try {
		await deleteTask(id);
		res.status(200).json({ statusCode: 200, message: 'Task deleted successfully' });
	} catch (err) {
		res.status(404).json({ statusCode: 404, message: 'Task does not exist.' });
	}
};

module.exports = { getTasks, createTask, removeTask };
