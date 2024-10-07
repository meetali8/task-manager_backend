const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTasks = async () => {
	try {
		return await prisma.task.findMany();
	} catch (error) {
		throw new Error('There is an error retrieving all the tasks. Please try again after sometime');
	}
};

const addTask = async (title, description) => {
	try {
		return await prisma.task.create({
			data: { title, description },
		});
	} catch (error) {
		throw new Error('There is an error creating the task. Please try again after sometime');
	}
};

const deleteTask = async (id) => {
	try {
		return await prisma.task.delete({
			where: { id: parseInt(id) },
		});
	} catch (error) {
		if (error.code === 'P2025') {
			throw new Error('Task does not exist.');
		}
		throw new Error('There is an error deleting the task. Please try again after sometime');
	}
};

module.exports = { getAllTasks, addTask, deleteTask };
