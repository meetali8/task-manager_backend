const express = require('express');
const { getTasks, createTask, removeTask } = require('../controllers/taskController');
const { body } = require('express-validator');

const router = express.Router();

router.get('/tasks', getTasks);

router.post(
	'/tasks',
	[
		body('title').notEmpty().withMessage('Task title is required'),
		body('description').notEmpty().withMessage('Task description is required'),
	],
	createTask
);

router.delete('/tasks/:id', removeTask);

module.exports = router;
